import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  processImage, 
  BackdropType, 
  enhanceStudioProduct, 
  composeThemeImage, 
  ThemeName 
} from '../services/imageProcessor.js';
import { analyzeProduct } from '../services/geminiVision.js';
import { calculatePrice } from '../services/pricingEngine.js';
import { handleAssistantMessage } from '../services/assistantService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Multer memory storage configuration for direct buffer streaming
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are allowed'));
    }
  }
});

/**
 * Core Full-Stack Pipeline:
 * 1. Area 1: Background removal & Studio Backdrop Composition
 * 2. Area 2: Gemini 1.5 Flash Vision Master Authenticity & Cataloging
 * 3. Area 3: Deterministic Dynamic Pricing Calculation
 */
router.post('/process-product', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'No image file uploaded. Please provide an image.' 
      });
    }

    const { voiceTranscript, season, volumeTier, tier, giCertified } = req.body;
    const backdrop: BackdropType = (req.body.backdrop === 'clean_white' ? 'clean_white' : 'dark_slate');
    const customWage = req.body.baseWage ? Number(req.body.baseWage) : undefined;

    // Area 1: Cinematic Image Enhancement (Background removal + Studio backdrop)
    const enhancement = await processImage(
      req.file.buffer, 
      req.file.originalname, 
      backdrop
    );

    // Area 2 & Area 3 (Physical variables): Gemini Vision Analysis
    const analysis = await analyzeProduct(req.file.buffer, voiceTranscript);

    // Area 2: Authenticity Gate
    if (!analysis.is_artisan_made) {
      return res.json({
        status: 'rejected',
        reason: analysis.rejection_reason || 'Product rejected: Failed artisanal authenticity standards.',
        enhancement: {
          rawUrl: enhancement.rawUrl,
          enhancedUrl: enhancement.enhancedUrl,
          improvements: enhancement.improvements
        },
        analysis
      });
    }

    // Area 3: Deterministic Dynamic Pricing Math
    // (Estimated Hours * Base Artisan Wage) + Estimated Material Cost = Base Cost
    // 30% B2B margin + GI Tag premium, adjusted dynamically for Season & Volume Tier
    const pricing = calculatePrice(
      analysis.laborComplexity,
      analysis.estimatedLaborHours,
      analysis.estimatedMaterialCostINR,
      {
        customBaseWage: customWage,
        giCertified: typeof giCertified === 'boolean' ? giCertified : true,
        season: (season === 'festive' || season === 'wedding' ? season : 'normal'),
        volumeTier: (tier === 'wholesale' || volumeTier === 'wholesale' ? 'wholesale' : (tier === 'bulk' || volumeTier === 'bulk' ? 'bulk' : 'single'))
      }
    );

    // Return unified multimodal payload
    res.json({
      status: 'success',
      enhancement: {
        rawUrl: enhancement.rawUrl,
        enhancedUrl: enhancement.enhancedUrl,
        improvements: enhancement.improvements
      },
      analysis,
      pricing
    });

  } catch (error: any) {
    console.error('Error in /process-product pipeline:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message || 'Internal server error processing product' 
    });
  }
});

/**
 * Standalone Area 1 Enhancement endpoint
 */
router.post('/enhance-image', upload.single('image'), async (req, res) => {
  try {
    const backdrop: BackdropType = (req.body.backdrop === 'clean_white' ? 'clean_white' : 'dark_slate');

    if (req.file) {
      const enhancement = await processImage(req.file.buffer, req.file.originalname, backdrop);
      return res.json({
        status: 'completed',
        originalUrl: enhancement.rawUrl,
        enhancedUrl: enhancement.enhancedUrl,
        improvements: enhancement.improvements
      });
    }

    // Fallback simulation if no file passed
    const { imageUrl } = req.body;
    res.json({
      status: 'completed',
      originalUrl: imageUrl || '/sample.jpg',
      enhancedUrl: imageUrl || '/sample.jpg',
      improvements: [
        'Automated background removal',
        'Cinematic studio backdrop applied',
        'Color balanced & sharpened'
      ]
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Full AI Product Studio Image Enhancer
 * - Background removal & edge isolation
 * - 7 theme environments (Clean White, Premium Studio, Indian Heritage, Festive, Natural Craft, Minimal Luxury, B2B Catalogue)
 * - Realistic contact shadow generation
 * - Product color & texture preservation
 * - Quality score computation
 * POST /api/ai/enhance-studio
 */
router.post('/enhance-studio', upload.single('image'), async (req, res) => {
  try {
    let buffer: Buffer | null = null;
    let originalName = 'product.jpg';
    const theme: ThemeName = (req.body.theme || req.body.selectedTheme || 'clean_white') as ThemeName;

    if (req.file) {
      buffer = req.file.buffer;
      originalName = req.file.originalname;
    } else if (req.body.imageUrl) {
      const imgUrl = req.body.imageUrl;
      if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
        const resp = await fetch(imgUrl);
        const arr = await resp.arrayBuffer();
        buffer = Buffer.from(arr);
        originalName = path.basename(imgUrl.split('?')[0]) || 'artisan_product.jpg';
      } else if (imgUrl.startsWith('/uploads/')) {
        const localPath = path.join(__dirname, '..', imgUrl);
        if (fs.existsSync(localPath)) {
          buffer = fs.readFileSync(localPath);
          originalName = path.basename(localPath);
        }
      }
    }

    if (!buffer) {
      // High-quality fallback sample buffer if no input supplied
      const sharp = (await import('sharp')).default;
      buffer = await sharp({
        create: { 
          width: 800, 
          height: 800, 
          channels: 4, 
          background: { r: 180, g: 85, b: 45, alpha: 1 } 
        }
      }).png().toBuffer();
      originalName = 'sample_craft_art.png';
    }

    const result = await enhanceStudioProduct(buffer, originalName, theme);
    res.json({
      status: 'success',
      ...result
    });
  } catch (err: any) {
    console.error('Error in /enhance-studio:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Recompose existing cutout onto a new theme
 * POST /api/ai/recompose-theme
 */
router.post('/recompose-theme', async (req, res) => {
  try {
    const { cutoutUrl, theme } = req.body;
    if (!cutoutUrl || !theme) {
      return res.status(400).json({ status: 'error', message: 'cutoutUrl and theme are required' });
    }

    const sharp = (await import('sharp')).default;
    let cutoutBuffer: Buffer | null = null;

    if (cutoutUrl.startsWith('/uploads/')) {
      const localPath = path.join(__dirname, '..', cutoutUrl);
      if (fs.existsSync(localPath)) {
        cutoutBuffer = fs.readFileSync(localPath);
      }
    } else if (cutoutUrl.startsWith('http://') || cutoutUrl.startsWith('https://')) {
      const resp = await fetch(cutoutUrl);
      const arr = await resp.arrayBuffer();
      cutoutBuffer = Buffer.from(arr);
    }

    if (!cutoutBuffer) {
      return res.status(404).json({ status: 'error', message: 'Cutout file not found' });
    }

    const compositeBuffer = await composeThemeImage(cutoutBuffer, theme as ThemeName, 1000, 1000);
    const enhancedDir = path.join(__dirname, '../uploads/enhanced');
    if (!fs.existsSync(enhancedDir)) {
      fs.mkdirSync(enhancedDir, { recursive: true });
    }

    const timestamp = Date.now();
    const filename = `recomposed_${theme}_${timestamp}.jpg`;
    const outputPath = path.join(enhancedDir, filename);
    await sharp(compositeBuffer).toFile(outputPath);

    res.json({
      status: 'success',
      theme,
      enhancedUrl: `/uploads/enhanced/${filename}`
    });
  } catch (err: any) {
    console.error('Error in /recompose-theme:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Standalone Area 3 Recalculate Pricing endpoint
 */
router.post('/recalculate-pricing', (req, res) => {
  try {
    const { 
      laborComplexity, 
      estimatedLaborHours, 
      estimatedMaterialCostINR, 
      baseWage, 
      customBaseWage,
      season, 
      volumeTier, 
      tier, 
      giCertified 
    } = req.body;

    const wage = baseWage ? Number(baseWage) : (customBaseWage ? Number(customBaseWage) : undefined);
    const activeSeason = (season === 'festive' || season === 'wedding' ? season : 'normal');
    const activeTier = (tier === 'wholesale' || volumeTier === 'wholesale' ? 'wholesale' : (tier === 'bulk' || volumeTier === 'bulk' ? 'bulk' : 'single'));
    const isGi = typeof giCertified === 'boolean' ? giCertified : true;

    const pricing = calculatePrice(
      Number(laborComplexity) || 5,
      Number(estimatedLaborHours) || 8,
      Number(estimatedMaterialCostINR) || 500,
      {
        customBaseWage: wage,
        giCertified: isGi,
        season: activeSeason,
        volumeTier: activeTier
      }
    );
    res.json({ status: 'success', pricing });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Backward compatibility endpoints
 */
router.post('/catalog', (req, res) => {
  const { voiceTranscript, rawAttributes } = req.body;
  res.json({
    titleEn: "Handcrafted Pure Katan Silk Banarasi Saree with Zari Floral Boota",
    titleHi: "हस्तनिर्मित शुद्ध कतान सिल्क बनारसी साड़ी - ज़री फ्लोरल बूटा",
    descriptionEn: "Experience the rich heritage of Varanasi with this handcrafted Pure Katan Silk Banarasi Saree. Featuring intricate Zari floral boota work woven by master artisans, this timeless piece beautifully represents centuries of tradition.",
    descriptionHi: "इस हस्तनिर्मित शुद्ध कतान सिल्क बनारसी साड़ी के साथ वाराणसी की समृद्ध विरासत का अनुभव करें। मास्टर कारीगरों द्वारा बुने गए जटिल ज़री फ्लोरल बूटा कार्य की विशेषता।",
    attributes: {
      material: "Pure Katan Silk",
      craftTime: "12 Days",
      dimensions: "5.5m + 1m blouse",
      color: "Red/Gold",
      giTagStatus: "Certified",
      region: "Varanasi",
      washCare: "Dry Clean Only",
      ...rawAttributes
    },
    tags: ["Banarasi", "Katan Silk", "Handloom", "Zari", "GI Tagged", "Wedding Collection"]
  });
});

router.post('/dynamic-pricing', (req, res) => {
  const { materialCost = 0, craftDays = 0 } = req.body;
  const estimatedLaborHours = craftDays * 8;
  const pricing = calculatePrice(7, estimatedLaborHours, materialCost);
  res.json({
    costBreakdown: {
      materialCost,
      laborCost: pricing.costBreakdown.laborCost,
      overhead: 0,
      baseProduction: pricing.costBreakdown.baseCost
    },
    recommendedRange: [pricing.bulkPrice, pricing.festivalPrice],
    suggestedPrice: pricing.finalPrice,
    bulkPrice: pricing.bulkPrice,
    marketComparable: pricing.marketComparable,
    explanation: pricing.explanation
  });
});

/**
 * Karigar Saathi AI Business Assistant Endpoint
 * Connects to live artisan store context, Gemini LLM (when configured), and NLU fallback engine
 */
router.post('/assistant', async (req, res) => {
  try {
    const { message, language = 'hi', userId, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: "NO_MESSAGE",
        message: "Please provide a message for the assistant."
      });
    }

    const result = await handleAssistantMessage({
      message: message.trim(),
      language,
      userId,
      conversationHistory
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Error in /api/ai/assistant:', error);
    res.status(500).json({
      success: false,
      response: "Karigar Saathi अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर कोशिश करें।",
      intent: "ERROR",
      action: null,
      isDemoMode: true
    });
  }
});

export default router;
