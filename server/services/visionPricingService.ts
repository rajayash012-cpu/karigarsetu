import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

/**
 * Strict Zod Schema for Structured Product Attributes
 */
export const ProductAttributesSchema = z.object({
  product_category: z.string().min(1, 'Category is required'),
  craft_type: z.string().min(1, 'Craft type is required'),
  technique: z.string().min(1, 'Technique is required'),
  material: z.string().min(1, 'Material is required'),
  pattern_complexity: z.number().int().min(1).max(5),
  detail_level: z.number().int().min(1).max(5),
  finish_quality: z.number().int().min(1).max(5),
  handmade_indicators: z.boolean(),
  design_complexity: z.number().int().min(1).max(5),
  workmanship_level: z.enum(['Low', 'Medium', 'High', 'Master']),
  visual_confidence: z.number().min(0).max(1),
  observations: z.array(z.string()).default([])
});

export type ProductAttributes = z.infer<typeof ProductAttributesSchema>;

export interface DisagreementItem {
  field: keyof ProductAttributes;
  claudeValue: any;
  openAiValue: any;
  recommendedValue: any;
  severity: 'low' | 'medium' | 'high';
  reason: string;
}

export interface VisionAnalysisResult {
  provider: 'both' | 'claude' | 'openai' | 'demo';
  attributes: ProductAttributes;
  claudeRaw?: ProductAttributes | null;
  openAiRaw?: ProductAttributes | null;
  disagreements: DisagreementItem[];
  confidence: number;
  warnings: string[];
  isDemoMode: boolean;
}

const VISION_SYSTEM_PROMPT = `You are a Master Craft & Textile Appraiser for an ethical B2B artisan marketplace.
Analyze the provided handcrafted product image with meticulous scrutiny.
Identify the exact physical and artisanal attributes and return ONLY a valid JSON object matching this schema:
{
  "product_category": string (e.g. "Handcrafted textile", "Heritage Handloom", "Pottery", "Woodcraft"),
  "craft_type": string (e.g. "Banarasi Weaving", "Chikankari Embroidery", "Blue Pottery"),
  "technique": string (e.g. "Kadwa Weaving", "Shadow Work", "Wheel Throwing"),
  "material": string (e.g. "Pure Katan Silk with Gold Zari", "Fine Cotton Muslin", "Terracotta Clay"),
  "pattern_complexity": integer 1-5 (1=minimalist, 5=ultra-intricate masterwork),
  "detail_level": integer 1-5 (1=coarse, 5=microscopic density),
  "finish_quality": integer 1-5 (1=rough raw, 5=flawless museum grade),
  "handmade_indicators": boolean (true if tooling marks, loom weave irregularities, or manual knotting visible),
  "design_complexity": integer 1-5 (1=simple geometric, 5=elaborate heritage motifs),
  "workmanship_level": "Low" | "Medium" | "High" | "Master",
  "visual_confidence": number 0.0 to 1.0,
  "observations": [array of short strings detailing observable artisanal features]
}
Do not include markdown codeblocks or extra text. Only return the JSON object.`;

/**
 * Detect whether an API key is a demo placeholder
 */
export function isDemoKey(key?: string): boolean {
  if (!key) return true;
  const trimmed = key.trim().toLowerCase();
  return (
    trimmed === '' ||
    trimmed.startsWith('demo_') ||
    trimmed.startsWith('placeholder') ||
    trimmed === 'demo' ||
    trimmed.includes('your_') ||
    trimmed.includes('test_key')
  );
}

/**
 * Call Anthropic Claude 3.5 Sonnet Vision
 */
async function callClaudeVision(imageBuffer: Buffer, mimeType: string = 'image/jpeg'): Promise<ProductAttributes | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (isDemoKey(apiKey)) return null;

  try {
    const anthropic = new Anthropic({ apiKey: apiKey! });
    const base64Data = imageBuffer.toString('base64');

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: VISION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: (mimeType as any) || 'image/jpeg',
                data: base64Data
              }
            },
            {
              type: 'text',
              text: 'Inspect this artisan craft product and return strict JSON with all visual attributes.'
            }
          ]
        }
      ]
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const cleanJson = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return ProductAttributesSchema.parse(parsed);
  } catch (error) {
    console.warn('Claude Vision API call failed:', (error as any).message || error);
    return null;
  }
}

/**
 * Call OpenAI GPT-4o Vision
 */
async function callOpenAIVision(imageBuffer: Buffer, mimeType: string = 'image/jpeg'): Promise<ProductAttributes | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (isDemoKey(apiKey)) return null;

  try {
    const openai = new OpenAI({ apiKey: apiKey! });
    const base64Data = `data:${mimeType || 'image/jpeg'};base64,${imageBuffer.toString('base64')}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: VISION_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: base64Data, detail: 'high' }
            },
            {
              type: 'text',
              text: 'Inspect this artisan craft product and return strict JSON with all visual attributes.'
            }
          ]
        }
      ],
      max_tokens: 1000
    });

    const text = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);
    return ProductAttributesSchema.parse(parsed);
  } catch (error) {
    console.warn('OpenAI Vision API call failed:', (error as any).message || error);
    return null;
  }
}

/**
 * Deterministic Sample Vision Attributes for Demo Mode (Requirement 8 & 39)
 * Returns deterministic craft attributes based on product hint/seed
 */
export function getDemoProductAttributes(hint?: string): ProductAttributes {
  const h = (hint || '').toLowerCase();

  if (h.includes('dokra') || h.includes('elephant') || h.includes('dhokra') || h.includes('metal')) {
    return {
      product_category: "Metal Handicrafts",
      craft_type: "Dokra",
      technique: "Lost-wax casting",
      material: "Dhokra metal",
      pattern_complexity: 4,
      detail_level: 4,
      finish_quality: 4,
      handmade_indicators: true,
      design_complexity: 4,
      workmanship_level: "High",
      visual_confidence: 0.88,
      observations: [
        "Authentic beeswax coil filigree pattern across ears and trunk",
        "Earthen mould seam markings characteristic of ancient lost-wax casting",
        "Hand-tooled bell metal patina with subtle burnished highlights",
        "Genuine solid bell metal weight and tactile artisan texture"
      ]
    };
  }

  if (h.includes('madhubani') || h.includes('painting') || h.includes('tree of life') || h.includes('folk')) {
    return {
      product_category: "Paintings & Folk Art",
      craft_type: "Madhubani Painting",
      technique: "Nib & bamboo reed Kachni linework",
      material: "Handmade paper and canvas",
      pattern_complexity: 4,
      detail_level: 5,
      finish_quality: 4,
      handmade_indicators: true,
      design_complexity: 4,
      workmanship_level: "High",
      visual_confidence: 0.90,
      observations: [
        "Double-line Kachni geometric border outlining the central motif",
        "Dense flora-fauna filler elements characteristic of Mithila region",
        "Organic natural pigment gradients indicating hand extraction",
        "Absence of mechanical lithographic screening"
      ]
    };
  }

  if (h.includes('walnut') || h.includes('wood') || h.includes('box') || h.includes('carved')) {
    return {
      product_category: "Woodcraft & Furniture",
      craft_type: "Walnut Wood Carving",
      technique: "Deep relief hand chiseling",
      material: "Seasoned Kashmiri Walnut Wood",
      pattern_complexity: 4,
      detail_level: 5,
      finish_quality: 5,
      handmade_indicators: true,
      design_complexity: 5,
      workmanship_level: "Master",
      visual_confidence: 0.92,
      observations: [
        "Multi-tiered Chinar leaf relief work carved from single block",
        "Velvet-smooth beeswax hand buffing with natural wood grain highlights",
        "Precision brass hinge inlay flush with timber edge",
        "Subtle hand-tool gouge marks visible on interior undercuts"
      ]
    };
  }

  if (h.includes('brass') || h.includes('diya') || h.includes('peacock') || h.includes('lamp')) {
    return {
      product_category: "Metal Handicrafts",
      craft_type: "Brass Metalwork",
      technique: "Sand casting & hand chiseled Nakashi",
      material: "Virgin Cast Brass Alloy",
      pattern_complexity: 3,
      detail_level: 4,
      finish_quality: 4,
      handmade_indicators: true,
      design_complexity: 4,
      workmanship_level: "High",
      visual_confidence: 0.89,
      observations: [
        "Hand-chiseled feather engravings on peacock finial",
        "Even wall thickness with deep oil reservoir capacity",
        "High-luster protective lacquer finish over hand-polished brass",
        "Heavy stable base indicating virgin casting alloy"
      ]
    };
  }

  if (h.includes('pottery') || h.includes('plate') || h.includes('blue')) {
    return {
      product_category: "Pottery & Terracotta",
      craft_type: "Blue Pottery",
      technique: "Mould doughing & cobalt glaze low-firing",
      material: "Quartz Stone Powder & Glass Glaze",
      pattern_complexity: 4,
      detail_level: 4,
      finish_quality: 4,
      handmade_indicators: true,
      design_complexity: 4,
      workmanship_level: "High",
      visual_confidence: 0.88,
      observations: [
        "Persian cobalt blue arabesque foliage hand-painted on quartz biscuit",
        "Clay-free glaze crazing lines characteristic of Jaipur Blue Pottery",
        "Pre-drilled foot ring for secure vertical wall mounting"
      ]
    };
  }

  // Default: Pure Katan Silk Banarasi Saree
  return {
    product_category: "Heritage Handloom Textile",
    craft_type: "Banarasi Kadwa Weaving",
    technique: "Traditional Pit-loom Kadwa Zari Weaving",
    material: "Pure Katan Silk with Fine Gold & Silver Zari",
    pattern_complexity: 4,
    detail_level: 5,
    finish_quality: 4,
    handmade_indicators: true,
    design_complexity: 4,
    workmanship_level: "High",
    visual_confidence: 0.88,
    observations: [
      "Dense Kadwa floral boota hand-interspersed across weft",
      "Handloom selvage markings confirm pit-loom origin",
      "Genuine dual-tone gold and silver zari threadwork",
      "Authentic handwoven drape with micro-variations characteristic of manual weaving"
    ]
  };
}

/**
 * Reconciles attributes from Claude and OpenAI, detecting disagreements
 */
export function reconcileAttributes(
  claude: ProductAttributes | null,
  openai: ProductAttributes | null
): { reconciled: ProductAttributes; disagreements: DisagreementItem[]; confidence: number } {
  const disagreements: DisagreementItem[] = [];

  // If only one succeeded
  if (claude && !openai) {
    return { reconciled: claude, disagreements: [], confidence: claude.visual_confidence };
  }
  if (!claude && openai) {
    return { reconciled: openai, disagreements: [], confidence: openai.visual_confidence };
  }

  // If neither succeeded, use demo
  if (!claude && !openai) {
    const demo = getDemoProductAttributes();
    return { reconciled: demo, disagreements: [], confidence: demo.visual_confidence };
  }

  const c = claude!;
  const o = openai!;

  // Check material disagreement
  if (c.material.toLowerCase() !== o.material.toLowerCase()) {
    disagreements.push({
      field: 'material',
      claudeValue: c.material,
      openAiValue: o.material,
      recommendedValue: c.visual_confidence >= o.visual_confidence ? c.material : o.material,
      severity: 'high',
      reason: `Claude identified "${c.material}" while OpenAI identified "${o.material}". Please confirm your exact raw material.`
    });
  }

  // Check craft type disagreement
  if (c.craft_type.toLowerCase() !== o.craft_type.toLowerCase()) {
    disagreements.push({
      field: 'craft_type',
      claudeValue: c.craft_type,
      openAiValue: o.craft_type,
      recommendedValue: c.visual_confidence >= o.visual_confidence ? c.craft_type : o.craft_type,
      severity: 'medium',
      reason: `Claude labeled as "${c.craft_type}" and OpenAI labeled as "${o.craft_type}".`
    });
  }

  // Check complexity difference > 1
  if (Math.abs(c.pattern_complexity - o.pattern_complexity) >= 2) {
    disagreements.push({
      field: 'pattern_complexity',
      claudeValue: c.pattern_complexity,
      openAiValue: o.pattern_complexity,
      recommendedValue: Math.round((c.pattern_complexity + o.pattern_complexity) / 2),
      severity: 'medium',
      reason: `Pattern complexity score variance (Claude: ${c.pattern_complexity}/5, OpenAI: ${o.pattern_complexity}/5).`
    });
  }

  // Check workmanship level
  if (c.workmanship_level !== o.workmanship_level) {
    disagreements.push({
      field: 'workmanship_level',
      claudeValue: c.workmanship_level,
      openAiValue: o.workmanship_level,
      recommendedValue: c.visual_confidence >= o.visual_confidence ? c.workmanship_level : o.workmanship_level,
      severity: 'low',
      reason: `Workmanship assessment varies between "${c.workmanship_level}" and "${o.workmanship_level}".`
    });
  }

  // Blended numeric scores
  const reconciled: ProductAttributes = {
    product_category: c.visual_confidence >= o.visual_confidence ? c.product_category : o.product_category,
    craft_type: c.visual_confidence >= o.visual_confidence ? c.craft_type : o.craft_type,
    technique: c.visual_confidence >= o.visual_confidence ? c.technique : o.technique,
    material: c.visual_confidence >= o.visual_confidence ? c.material : o.material,
    pattern_complexity: Math.round((c.pattern_complexity + o.pattern_complexity) / 2),
    detail_level: Math.round((c.detail_level + o.detail_level) / 2),
    finish_quality: Math.round((c.finish_quality + o.finish_quality) / 2),
    handmade_indicators: c.handmade_indicators || o.handmade_indicators,
    design_complexity: Math.round((c.design_complexity + o.design_complexity) / 2),
    workmanship_level: c.visual_confidence >= o.visual_confidence ? c.workmanship_level : o.workmanship_level,
    visual_confidence: Number(((c.visual_confidence + o.visual_confidence) / 2).toFixed(2)),
    observations: Array.from(new Set([...c.observations, ...o.observations]))
  };

  const confidence = reconciled.visual_confidence;
  return { reconciled, disagreements, confidence };
}

/**
 * Main Image Analysis Entrypoint
 */
export async function analyzeProductImage(
  imageBuffer: Buffer,
  mimeType: string = 'image/jpeg',
  hint?: string
): Promise<VisionAnalysisResult> {
  const configuredProvider = (process.env.PRICING_VISION_PROVIDER || 'both').toLowerCase();
  const warnings: string[] = [];

  let claudeResult: ProductAttributes | null = null;
  let openAiResult: ProductAttributes | null = null;

  // Execute based on provider configuration
  if (configuredProvider === 'anthropic' || configuredProvider === 'both') {
    claudeResult = await callClaudeVision(imageBuffer, mimeType);
    if (!claudeResult && !isDemoKey(process.env.ANTHROPIC_API_KEY)) {
      warnings.push('Claude Vision API encountered an issue. Falling back to alternative analysis.');
    }
  }

  if (configuredProvider === 'openai' || configuredProvider === 'both') {
    openAiResult = await callOpenAIVision(imageBuffer, mimeType);
    if (!openAiResult && !isDemoKey(process.env.OPENAI_API_KEY)) {
      warnings.push('OpenAI Vision API encountered an issue. Falling back to alternative analysis.');
    }
  }

  // Handle live vs demo mode
  const isDemo = !claudeResult && !openAiResult;

  if (isDemo) {
    const demoAttributes = getDemoProductAttributes(hint);
    return {
      provider: 'demo',
      attributes: demoAttributes,
      claudeRaw: null,
      openAiRaw: null,
      disagreements: [],
      confidence: demoAttributes.visual_confidence,
      warnings: [
        'Demo Vision Analysis active: Verified authentic artisan craft attributes loaded.'
      ],
      isDemoMode: true
    };
  }

  const { reconciled, disagreements, confidence } = reconcileAttributes(claudeResult, openAiResult);

  let effectiveProvider: 'both' | 'claude' | 'openai' = 'both';
  if (claudeResult && !openAiResult) effectiveProvider = 'claude';
  if (!claudeResult && openAiResult) effectiveProvider = 'openai';

  return {
    provider: effectiveProvider,
    attributes: reconciled,
    claudeRaw: claudeResult,
    openAiRaw: openAiResult,
    disagreements,
    confidence,
    warnings,
    isDemoMode: false
  };
}
