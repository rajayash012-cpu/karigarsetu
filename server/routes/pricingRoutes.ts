import { Router, Request, Response } from 'express';
import multer from 'multer';
import { analyzeProductImage, ProductAttributesSchema } from '../services/visionPricingService.js';
import { calculateDeterministicPrice } from '../services/deterministicPricingEngine.js';
import { getMarketBenchmark } from '../services/marketComparables.js';
import { generatePricingExplanation } from '../services/pricingExplanationService.js';
import { store, saveStore, PriceRecommendation } from '../store.js';

const router = Router();

// Multer memory storage for raw image inspection
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

/**
 * 1. Image Analysis via Claude Vision + OpenAI Vision
 * POST /api/pricing/analyze-image
 */
router.post('/analyze-image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    let buffer: Buffer | null = null;
    let mimeType = 'image/jpeg';

    if (req.file && req.file.buffer) {
      buffer = req.file.buffer;
      mimeType = req.file.mimetype || 'image/jpeg';
    } else if (req.body && req.body.imageBase64) {
      const cleanBase64 = req.body.imageBase64.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(cleanBase64, 'base64');
      mimeType = req.body.mimeType || 'image/jpeg';
    }

    if (!buffer) {
      return res.status(400).json({
        success: false,
        error: "NO_IMAGE_FILE",
        message: "Please upload an image file or provide imageBase64 for AI vision analysis."
      });
    }

    const hint = req.body?.productHint || req.body?.craftType || req.body?.title || req.file?.originalname || '';
    const analysis = await analyzeProductImage(buffer, mimeType, hint);

    res.json({
      success: true,
      ...analysis
    });
  } catch (error: any) {
    console.error('Error in /api/pricing/analyze-image:', error);
    res.status(500).json({
      success: false,
      error: "ANALYSIS_FAILED",
      message: error.message || "Failed to analyze product image."
    });
  }
});

/**
 * 2. Deterministic Cost & Pricing Engine
 * POST /api/pricing/calculate
 */
router.post('/calculate', (req: Request, res: Response) => {
  try {
    const {
      materialCost,
      labourHours,
      labourRate,
      packagingCost,
      transportCost,
      otherCost,
      quantity,
      minimumAcceptablePrice,
      targetMargin,
      buyerType,
      season,
      attributes
    } = req.body;

    // Run deterministic calculation
    const calculation = calculateDeterministicPrice({
      materialCost: Number(materialCost) || 0,
      labourHours: Number(labourHours) || 0,
      labourRate: Number(labourRate) || 0,
      packagingCost: Number(packagingCost) || 0,
      transportCost: Number(transportCost) || 0,
      otherCost: Number(otherCost) || 0,
      quantity: Number(quantity) || 1,
      minimumAcceptablePrice: Number(minimumAcceptablePrice) || 0,
      targetMargin: targetMargin !== undefined ? Number(targetMargin) : undefined,
      buyerType: buyerType || 'general',
      season: season || 'normal',
      attributes
    });

    // Match with verified market comparables
    const market = getMarketBenchmark(
      attributes?.product_category,
      attributes?.craft_type,
      attributes?.material
    );

    res.json({
      success: true,
      calculation,
      market
    });
  } catch (error: any) {
    console.error('Error in /api/pricing/calculate:', error);
    res.status(500).json({
      success: false,
      error: "CALCULATION_FAILED",
      message: error.message || "Failed to calculate pricing."
    });
  }
});

/**
 * 3. Post-Calculation AI Explanation
 * POST /api/pricing/explain
 */
router.post('/explain', async (req: Request, res: Response) => {
  try {
    const { calculation, attributes, market } = req.body;

    if (!calculation || !calculation.recommendation) {
      return res.status(400).json({
        success: false,
        error: "INVALID_CALCULATION",
        message: "Valid calculation output is required to generate an explanation."
      });
    }

    const explanation = await generatePricingExplanation(calculation, attributes, market);

    res.json({
      success: true,
      ...explanation
    });
  } catch (error: any) {
    console.error('Error in /api/pricing/explain:', error);
    res.status(500).json({
      success: false,
      error: "EXPLANATION_FAILED",
      message: error.message || "Failed to generate explanation."
    });
  }
});

/**
 * 4. Audit & Save Price Recommendation
 * POST /api/pricing/save
 */
router.post('/save', (req: Request, res: Response) => {
  try {
    const {
      productId,
      artisanId,
      materialCost,
      labourHours,
      labourRate,
      packagingCost,
      transportCost,
      otherCost,
      totalCost,
      quantity,
      buyerType,
      marketLow,
      marketHigh,
      recommendedLow,
      recommendedHigh,
      suggestedPrice,
      minimumAcceptablePrice,
      aiVisualAttributes,
      aiConfidence,
      pricingFactors,
      formulaVersion
    } = req.body;

    const recommendationRecord: PriceRecommendation = {
      id: `prec-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      productId: productId || 'p1',
      artisanId: artisanId || store.artisan.id,
      materialCost: Number(materialCost) || 0,
      labourHours: Number(labourHours) || 0,
      labourRate: Number(labourRate) || 0,
      packagingCost: Number(packagingCost) || 0,
      transportCost: Number(transportCost) || 0,
      otherCost: Number(otherCost) || 0,
      totalCost: Number(totalCost) || 0,
      quantity: Number(quantity) || 1,
      buyerType: buyerType || 'general',
      marketLow: Number(marketLow) || 0,
      marketHigh: Number(marketHigh) || 0,
      recommendedLow: Number(recommendedLow) || 0,
      recommendedHigh: Number(recommendedHigh) || 0,
      suggestedPrice: Number(suggestedPrice) || 0,
      minimumAcceptablePrice: Number(minimumAcceptablePrice) || 0,
      aiVisualAttributes: aiVisualAttributes || {},
      aiConfidence: Number(aiConfidence) || 0,
      pricingFactors: pricingFactors || {},
      formulaVersion: formulaVersion || '1.2.0-deterministic',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!store.priceRecommendations) {
      store.priceRecommendations = [];
    }

    store.priceRecommendations.push(recommendationRecord);
    saveStore();

    res.status(201).json({
      success: true,
      savedRecord: recommendationRecord,
      recommendation: recommendationRecord,
      message: "Price recommendation saved successfully to database."
    });
  } catch (error: any) {
    console.error('Error in /api/pricing/save:', error);
    res.status(500).json({
      success: false,
      error: "SAVE_FAILED",
      message: error.message || "Failed to save price recommendation."
    });
  }
});

export default router;
