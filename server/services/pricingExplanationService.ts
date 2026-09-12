import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { PricingCalculationResult } from './deterministicPricingEngine.js';
import { ProductAttributes, isDemoKey } from './visionPricingService.js';
import { MarketBenchmarkAnalysis } from './marketComparables.js';

export interface ExplanationResponse {
  explanationEn: string;
  explanationHi: string;
  keyDrivers: string[];
  recommendationTips: string[];
  provider: string;
}

const EXPLANATION_SYSTEM_PROMPT = `You are a Fair-Trade Artisan B2B Pricing Advisor on the KarigarSetu platform.
Your task is to explain a pre-calculated mathematical pricing recommendation to an artisan.

STRICT RULES:
1. You MUST NEVER modify, recalculate, or guess different prices. Every number provided in the context is FINAL.
2. Explain clearly in simple, respectful, and empowering terms:
   - Why this specific price range was generated
   - How labor hours, fair hourly wages, and materials drove the base cost
   - How visual craft complexity and workmanship influenced the adjustment
   - How B2B order quantity discount and floor protection safeguard the artisan
   - How demo market benchmarks compare
   - Tips on what could make the product command a higher price (e.g. GI certification, finer thread count, custom packaging)
3. Provide your explanation in BOTH English and Hindi (Devanagari script).

Return a valid JSON object:
{
  "explanationEn": "Comprehensive English explanation...",
  "explanationHi": "विस्तृत हिंदी स्पष्टीकरण...",
  "keyDrivers": ["Driver 1", "Driver 2", "Driver 3"],
  "recommendationTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

/**
 * Deterministic Template Fallback for offline or missing API keys
 */
function getTemplateExplanation(
  calc: PricingCalculationResult,
  attributes?: ProductAttributes,
  market?: MarketBenchmarkAnalysis
): ExplanationResponse {
  const { costBreakdown, marginAnalysis, recommendation, volumeAnalysis, floorProtection } = calc;

  const craft = attributes?.craft_type || 'पारंपरिक हस्तकला (Handicraft)';
  const material = attributes?.material || 'प्रामाणिक कच्चा माल (Certified Materials)';

  const explanationEn = `This B2B price range of ₹${recommendation.minimumPrice.toLocaleString('en-IN')} – ₹${recommendation.maximumPrice.toLocaleString('en-IN')} (Suggested: ₹${recommendation.suggestedPrice.toLocaleString('en-IN')}) is built on a transparent cost-plus-ethical-margin model. 

Key Determinants:
1. Skilled Labor: ${costBreakdown.labourHours} hours at ₹${costBreakdown.labourRate}/hr guarantee ₹${costBreakdown.labourCost.toLocaleString('en-IN')} in direct living wages.
2. Materials & Overheads: Certified materials (₹${costBreakdown.materialCost.toLocaleString('en-IN')}) and packaging/transport (₹${(costBreakdown.packagingCost + costBreakdown.transportCost + costBreakdown.otherCost).toLocaleString('en-IN')}) form a baseline production cost of ₹${costBreakdown.totalCost.toLocaleString('en-IN')}.
3. Craft Premium: The ${attributes?.workmanship_level || 'High'} workmanship score applies a factor of ${calc.multipliersApplied.combinedFactor}x to reward artisanal mastery.
4. B2B Volume: For ${volumeAnalysis.quantity} units (${volumeAnalysis.volumeTierLabel}), a ${volumeAnalysis.discountPercent}% bulk discount was accommodated while strictly respecting your price floor of ₹${floorProtection.effectivePriceFloor.toLocaleString('en-IN')}.
5. Market Alignment: Current verified market benchmarks range from ₹${market?.priceRange.low.toLocaleString('en-IN') || 'N/A'} to ₹${market?.priceRange.high.toLocaleString('en-IN') || 'N/A'}, positioning your offering competitively for wholesale buyers.`;

  const explanationHi = `यह अनुशंसित B2B मूल्य दायरा ₹${recommendation.minimumPrice.toLocaleString('en-IN')} से ₹${recommendation.maximumPrice.toLocaleString('en-IN')} (सुझाया गया मूल्य: ₹${recommendation.suggestedPrice.toLocaleString('en-IN')}) पूर्णतः पारदर्शी और निष्पक्ष आजीविका सुरक्षा मॉडल पर आधारित है।

प्रमुख आधार:
1. कुशल श्रम: ${costBreakdown.labourHours} घंटों के कुशल कार्य हेतु ₹${costBreakdown.labourRate}/घंटा की दर से ₹${costBreakdown.labourCost.toLocaleString('en-IN')} की मजदूरी पूर्णतः सुरक्षित है।
2. कच्चा माल व अतिरिक्त व्यय: प्रामाणिक कच्चा माल (₹${costBreakdown.materialCost.toLocaleString('en-IN')}) और पैकेजिंग/परिवहन व्यय जोड़कर कुल उत्पादन लागत ₹${costBreakdown.totalCost.toLocaleString('en-IN')} है।
3. शिल्प उत्कृष्टता: ${craft} की उच्च शिल्प गुणवत्ता को उचित महत्व देने हेतु ${calc.multipliersApplied.combinedFactor}x का गुणक लागू किया गया है।
4. थोक मात्रा लाभ: ${volumeAnalysis.quantity} इकाइयों के ऑर्डर पर ${volumeAnalysis.discountPercent}% की छूट देने के बाद भी आपका न्यूनतम स्वीकार्य मूल्य (₹${floorProtection.effectivePriceFloor.toLocaleString('en-IN')}) सुरक्षित रखा गया है।
5. बाजार तुलना: वर्तमान बाजार तुलना के अनुसार यह मूल्य B2B थोक खरीदारों के लिए अत्यंत प्रतिस्पर्धी और टिकाऊ है।`;

  return {
    explanationEn,
    explanationHi,
    keyDrivers: [
      `Ethical labor wage protected at ₹${costBreakdown.labourRate}/hr (${costBreakdown.labourHours} hours)`,
      `Direct artisan margin of ${marginAnalysis.effectiveMarginPercent}% (+₹${marginAnalysis.effectiveMarginAmount.toLocaleString('en-IN')})`,
      `Safe volume discount (${volumeAnalysis.discountPercent}%) with price floor protection at ₹${floorProtection.effectivePriceFloor.toLocaleString('en-IN')}`,
      `Craft multiplier (${calc.multipliersApplied.combinedFactor}x) for ${attributes?.workmanship_level || 'High'} workmanship`
    ],
    recommendationTips: [
      "Obtain or highlight GI Tag certification to unlock an additional 5-10% export premium.",
      "Offer sample swatch cards with bulk orders to accelerate corporate buyer approvals.",
      "Consider advance raw-material sourcing during off-peak season to save 8-12% on input costs."
    ],
    provider: "Demo Vision Analysis (Deterministic AI Advisor)"
  };
}

/**
 * Generate AI Explanation using Claude, OpenAI, or Gemini
 */
export async function generatePricingExplanation(
  calc: PricingCalculationResult,
  attributes?: ProductAttributes,
  market?: MarketBenchmarkAnalysis
): Promise<ExplanationResponse> {
  const contextData = {
    calculatedResults: {
      suggestedPrice: calc.recommendation.suggestedPrice,
      minimumPrice: calc.recommendation.minimumPrice,
      maximumPrice: calc.recommendation.maximumPrice,
      totalCost: calc.costBreakdown.totalCost,
      labourCost: calc.costBreakdown.labourCost,
      materialCost: calc.costBreakdown.materialCost,
      labourHours: calc.costBreakdown.labourHours,
      labourRate: calc.costBreakdown.labourRate,
      effectiveMarginPercent: calc.marginAnalysis.effectiveMarginPercent,
      quantity: calc.volumeAnalysis.quantity,
      volumeDiscountPercent: calc.volumeAnalysis.discountPercent,
      effectiveFloor: calc.floorProtection.effectivePriceFloor
    },
    visualAttributes: attributes,
    marketBenchmark: market ? {
      median: market.medianPrice,
      range: market.priceRange,
      label: market.label
    } : null
  };

  const userPrompt = `Here is the pre-calculated pricing result and context:
${JSON.stringify(contextData, null, 2)}

Provide the structured explanation in English and Hindi adhering strictly to the system instructions.`;

  // 1. Try Claude if real key available (never call with demo_* keys)
  if (!isDemoKey(process.env.ANTHROPIC_API_KEY)) {
    try {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
      const msg = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1200,
        system: EXPLANATION_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }]
      });
      const text = msg.content[0]?.type === 'text' ? msg.content[0].text : '';
      const cleanJson = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        explanationEn: parsed.explanationEn,
        explanationHi: parsed.explanationHi,
        keyDrivers: parsed.keyDrivers || [],
        recommendationTips: parsed.recommendationTips || [],
        provider: 'Claude 3.5 Sonnet'
      };
    } catch (e) {
      console.warn('Claude explanation failed, attempting alternative provider:', (e as any).message);
    }
  }

  // 2. Try OpenAI if real key available (never call with demo_* keys)
  if (!isDemoKey(process.env.OPENAI_API_KEY)) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: EXPLANATION_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ]
      });
      const text = completion.choices[0]?.message?.content || '{}';
      const parsed = JSON.parse(text);
      return {
        explanationEn: parsed.explanationEn,
        explanationHi: parsed.explanationHi,
        keyDrivers: parsed.keyDrivers || [],
        recommendationTips: parsed.recommendationTips || [],
        provider: 'OpenAI GPT-4o'
      };
    } catch (e) {
      console.warn('OpenAI explanation failed, attempting fallback:', (e as any).message);
    }
  }

  // 3. Try Gemini if real key available (never call with demo_* keys)
  if (!isDemoKey(process.env.GEMINI_API_KEY)) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: EXPLANATION_SYSTEM_PROMPT,
        generationConfig: { responseMimeType: 'application/json' }
      });
      const result = await model.generateContent(userPrompt);
      const text = result.response.text();
      const parsed = JSON.parse(text);
      return {
        explanationEn: parsed.explanationEn,
        explanationHi: parsed.explanationHi,
        keyDrivers: parsed.keyDrivers || [],
        recommendationTips: parsed.recommendationTips || [],
        provider: 'Google Gemini 1.5 Flash'
      };
    } catch (e) {
      console.warn('Gemini explanation failed, falling back to deterministic template:', (e as any).message);
    }
  }

  // 4. Deterministic template fallback
  return getTemplateExplanation(calc, attributes, market);
}
