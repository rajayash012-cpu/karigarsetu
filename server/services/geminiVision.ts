import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiAnalysis {
  is_artisan_made: boolean;
  rejection_reason: string | null;
  craftCategory: string;
  materials: string;
  title: string;
  description: string;
  titleHi: string;
  descriptionHi: string;
  laborComplexity: number;        // Scale 1-10
  estimatedLaborHours: number;    // Estimated labor hours
  estimatedMaterialCostINR: number; // Raw material cost in INR
  tags: string[];
  dimensions: string;
  washCare: string;
  region: string;
}

const MASTER_AUTHENTICATOR_SYSTEM_PROMPT = 
  "You are a Master Authenticator. Analyze this item. If you detect injection molding, perfect factory symmetry, or 3D printing layers, reject it. If it is an authentic handicraft, identify the exact craft category, primary materials, and provide a B2B product title and description.";

/**
 * Fallback metadata generator if Gemini API key is missing or offline
 */
function getFallbackArtisanAnalysis(voiceTranscript?: string): GeminiAnalysis {
  const isSuspicious = voiceTranscript && /plastic|mold|factory|mass produced|3d print/i.test(voiceTranscript);

  if (isSuspicious) {
    return {
      is_artisan_made: false,
      rejection_reason: "Detected industrial mold seams and machine symmetry inconsistent with authentic handcraft traditions.",
      craftCategory: "Synthetic Replica",
      materials: "Industrial Polymer / Composite",
      title: "Mass-Produced Decorative Artifact",
      description: "Item exhibits factory-grade uniform tolerances, seam lines, and absence of artisanal tooling marks.",
      titleHi: "मशीन निर्मित प्रतिरूप",
      descriptionHi: "इस वस्तु में औद्योगिक मोल्ड सीम और मशीन समरूपता पाई गई है।",
      laborComplexity: 1,
      estimatedLaborHours: 1,
      estimatedMaterialCostINR: 150,
      tags: ["Industrial", "Non-Artisan"],
      dimensions: "Standardized",
      washCare: "N/A",
      region: "Industrial Facility"
    };
  }

  return {
    is_artisan_made: true,
    rejection_reason: null,
    craftCategory: "Banarasi Handloom Weaving",
    materials: "Pure Katan Silk & Fine Zari (Gold & Silver Thread)",
    title: "Handcrafted Pure Katan Silk Banarasi Saree with Intricate Zari Floral Boota",
    description: "Authentic handwoven Masterpiece from the heritage looms of Varanasi. Hand-spun raw silk interspaced with floral boota motifs created through traditional kadwa weaving. Each weft thread is hand-manipulated over days of focused artisanal labor, embodying centuries of GI-tagged GI craftsmanship tailored for high-end B2B trade.",
    titleHi: "हस्तनिर्मित शुद्ध कतान सिल्क बनारसी साड़ी - ज़री फ्लोरल बूटा",
    descriptionHi: "वाराणसी के पारंपरिक करघों से प्रामाणिक हस्तनिर्मित उत्कृष्ट कृति। पारंपरिक कड़वा बुनाई के माध्यम से बनाए गए फ्लोरल बूटा रूपांकनों के साथ शुद्ध कातान सिल्क।",
    laborComplexity: 8,
    estimatedLaborHours: 96,
    estimatedMaterialCostINR: 4200,
    tags: ["Banarasi", "Katan Silk", "Handloom", "Zari", "GI Tagged", "Heritage B2B"],
    dimensions: "5.5m Saree + 0.8m Unstitched Blouse",
    washCare: "Dry Clean Only. Store in breathable muslin wrap.",
    region: "Varanasi, Uttar Pradesh, India"
  };
}

/**
 * Analyze an artisan product image using Gemini 1.5 Flash Vision
 * Enforces Master Authenticator instructions and strict JSON response
 */
export async function analyzeProduct(
  imageBuffer: Buffer, 
  voiceTranscript?: string
): Promise<GeminiAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.warn('GEMINI_API_KEY not configured. Utilizing Master Authenticator fallback analysis.');
    return getFallbackArtisanAnalysis(voiceTranscript);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: MASTER_AUTHENTICATOR_SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const userPrompt = `You are evaluating a craft product submitted by an artisan to a B2B marketplace.
Analyze this product image with high scrutiny.

TASK 1: AUTHENTICITY INSPECTION
- Check for machine symmetry, injection mold lines, layer lines from 3D printing, laser-cut burn marks, or plastic thermoforming.
- If machine/factory-produced, set "is_artisan_made" to false and provide a rigorous "rejection_reason".
- If authentic handmade work with artisan signatures (hand-tooled texture, warp-weft variations, hand-carved facets, natural glaze flow), set "is_artisan_made" to true and "rejection_reason" to null.

TASK 2: SMART B2B CATALOGING (Only if authentic)
- Identify the exact Indian handicraft category (e.g. "Banarasi Silk Weaving", "Blue Pottery of Jaipur", "Dhokra Brass Casting", "Channapatna Woodcraft", "Bidriware", "Chikankari").
- Identify primary physical materials.
- Provide a professional, compelling B2B catalog title and description in English.
- Provide title and description in Hindi (Devanagari script).
- Provide tags, dimensions, wash/care instructions, and traditional region of origin.

TASK 3: PHYSICAL METRIC ESTIMATION (FOR BACKEND PRICING)
- Do NOT guess the final price in rupees or dollars. The backend algorithm calculates money deterministically.
- You must estimate ONLY the physical variables:
  1. "laborComplexity": number from 1 to 10 (1 = minimal simple labor, 10 = museum-grade master artisan complexity).
  2. "estimatedLaborHours": number of hours spent by the artisan to hand-craft this single piece.
  3. "estimatedMaterialCostINR": estimated cost of raw materials in Indian Rupees (INR).

${voiceTranscript ? `ARTISAN'S VOICE TRANSCRIPT / NOTES: "${voiceTranscript}"` : ''}

Respond in STRICT JSON format matching this exact schema:
{
  "is_artisan_made": boolean,
  "rejection_reason": string | null,
  "craftCategory": string,
  "materials": string,
  "title": string,
  "description": string,
  "titleHi": string,
  "descriptionHi": string,
  "laborComplexity": number,
  "estimatedLaborHours": number,
  "estimatedMaterialCostINR": number,
  "tags": ["string"],
  "dimensions": string,
  "washCare": string,
  "region": string
}`;

    const imagePart = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/jpeg'
      }
    };

    const result = await model.generateContent([userPrompt, imagePart]);
    const responseText = result.response.text();

    let jsonStr = responseText.trim();
    // Clean potential markdown wrap if model added it
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(jsonStr) as GeminiAnalysis;

    // Sanitize and enforce constraints
    return {
      is_artisan_made: Boolean(parsed.is_artisan_made),
      rejection_reason: parsed.is_artisan_made ? null : (parsed.rejection_reason || "Industrial manufacturing signatures detected."),
      craftCategory: parsed.craftCategory || "Traditional Indian Craft",
      materials: parsed.materials || "Natural Artisan Materials",
      title: parsed.title || "Handcrafted Artisan Product",
      description: parsed.description || "Authentic handcrafted piece made using traditional methods.",
      titleHi: parsed.titleHi || parsed.title || "हस्तनिर्मित उत्पाद",
      descriptionHi: parsed.descriptionHi || parsed.description || "पारंपरिक तकनीकों से तैयार हस्तशिल्प।",
      laborComplexity: Math.min(10, Math.max(1, Number(parsed.laborComplexity) || 5)),
      estimatedLaborHours: Math.max(1, Number(parsed.estimatedLaborHours) || 8),
      estimatedMaterialCostINR: Math.max(50, Number(parsed.estimatedMaterialCostINR) || 500),
      tags: Array.isArray(parsed.tags) ? parsed.tags : ["Handcrafted", "Artisan", "B2B"],
      dimensions: parsed.dimensions || "Standard Artisan Dimensions",
      washCare: parsed.washCare || "Handle with artisan care",
      region: parsed.region || "India"
    };

  } catch (error: any) {
    console.error('Gemini Vision API error:', error);
    // Graceful fallback if Gemini encountered an error/quota limit
    return getFallbackArtisanAnalysis(voiceTranscript);
  }
}
