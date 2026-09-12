export type ThemeName = 
  | 'clean_white' 
  | 'premium_studio' 
  | 'indian_heritage' 
  | 'festive' 
  | 'natural_craft' 
  | 'minimal_luxury' 
  | 'b2b_catalogue';

export interface QualityMetrics {
  overallScore: number;
  background: 'Excellent' | 'Good' | 'Fair';
  lighting: 'Excellent' | 'Good' | 'Fair';
  productVisibility: 'Excellent' | 'Good' | 'Fair';
  composition: 'Excellent' | 'Good' | 'Fair';
  marketplaceReadiness: 'Excellent' | 'Good' | 'Fair';
  resolution: string;
  lightingImprovement: string;
}

export interface StudioEnhancementResult {
  id: string;
  originalUrl: string;
  cutoutUrl: string;
  enhancedUrl: string;
  selectedTheme: ThemeName;
  themeOutputs: Record<ThemeName, string>;
  marketplaceUrl: string;
  b2bCatalogueUrl: string;
  qualityScore: QualityMetrics;
  isDemoEnhancement: boolean;
  improvements: string[];
  dimensions: { width: number; height: number };
}

export interface InquiryData {
  productId: string;
  buyerName: string;
  buyerOrg?: string;
  quantity: number;
  timeline?: string;
  notes?: string;
}

export interface ProcessedProduct {
  status: 'success' | 'rejected';
  reason?: string | null;
  enhancement: {
    rawUrl: string;
    enhancedUrl: string;
    cutoutUrl?: string;
    themeOutputs?: Record<string, string>;
    qualityScore?: QualityMetrics;
    improvements: string[];
  };
  analysis: {
    is_artisan_made: boolean;
    rejection_reason: string | null;
    craftCategory: string;
    materials: string;
    title: string;
    description: string;
    titleHi: string;
    descriptionHi: string;
    laborComplexity: number;
    estimatedLaborHours: number;
    estimatedMaterialCostINR: number;
    tags: string[];
    dimensions: string;
    washCare: string;
    region: string;
  };
  pricing: {
    costBreakdown: { 
      materialCost: number; 
      laborCost: number; 
      baseCost: number;
      baseArtisanWage: number;
      estimatedLaborHours: number;
      laborComplexity: number;
      b2bMarginPercent: number;
      b2bMarginAmount: number;
      giPremiumPercent?: number;
      giPremiumAmount?: number;
      seasonMultiplier?: number;
      seasonAdjustmentAmount?: number;
      volumeDiscountPercent?: number;
      volumeDiscountAmount?: number;
    };
    baseUnitPrice?: number;
    finalPrice: number;
    bulkPrice: number;
    institutionalPrice?: number;
    festivalPrice: number;
    weddingPrice?: number;
    marketComparable: number;
    laborComplexity: number;
    estimatedHours: number;
    activeSeason?: 'normal' | 'festive' | 'wedding';
    activeTier?: 'single' | 'wholesale' | 'bulk';
    giCertified?: boolean;
    formula: string;
    explanation: string;
    explanationHi?: string;
  };
}

/**
 * Upload raw artisan image to backend pipeline:
 * 1. Area 1: Photoroom / Cloudinary background removal & studio backdrop composition
 * 2. Area 2: Gemini 1.5 Flash Vision Master Authenticator analysis
 * 3. Area 3: Deterministic Pricing Math ((Hours * Wage) + Material = Base Cost, + 30% B2B margin)
 */
export async function processProduct(
  imageFile: File, 
  voiceTranscript: string = '',
  backdrop: 'dark_slate' | 'clean_white' = 'dark_slate',
  baseWage?: number
): Promise<ProcessedProduct> {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('voiceTranscript', voiceTranscript);
  formData.append('backdrop', backdrop);
  if (baseWage) {
    formData.append('baseWage', baseWage.toString());
  }

  const res = await fetch('/api/ai/process-product', { 
    method: 'POST', 
    body: formData 
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API Error (${res.status}): ${errText || res.statusText}`);
  }

  return res.json();
}

/**
 * Recalculate deterministic pricing when labor hours, materials, wages, seasons, or volume tiers change
 */
export async function recalculatePricing(params: {
  laborComplexity: number;
  estimatedLaborHours: number;
  estimatedMaterialCostINR: number;
  baseWage?: number;
  customBaseWage?: number;
  season?: 'normal' | 'festive' | 'wedding';
  volumeTier?: 'single' | 'wholesale' | 'bulk';
  tier?: 'single' | 'wholesale' | 'bulk';
  giCertified?: boolean;
}): Promise<{ status: string; pricing: ProcessedProduct['pricing'] }> {
  const res = await fetch('/api/ai/recalculate-pricing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    throw new Error(`Pricing API Error: ${res.status}`);
  }

  return res.json();
}

// Backward compatibility methods
export const api = {
  voiceIntent: async (transcript: string, lang: string) => {
    const res = await fetch('/api/voice/intent', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ transcript, lang }) 
    });
    return res.json();
  },
  enhanceImage: async (imageFile: File, backdrop: string = 'dark_slate') => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('backdrop', backdrop);
    const res = await fetch('/api/ai/enhance-image', { 
      method: 'POST', 
      body: formData 
    });
    return res.json();
  },
  generateCatalog: async (voiceTranscript: string, rawAttributes: any) => {
    const res = await fetch('/api/ai/catalog', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ voiceTranscript, rawAttributes }) 
    });
    return res.json();
  },
  calculatePricing: async (materialCost: number, craftDays: number, craftType: string, region: string) => {
    const res = await fetch('/api/ai/dynamic-pricing', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ materialCost, craftDays, craftType, region }) 
    });
    return res.json();
  },
  createInquiry: async (data: InquiryData) => {
    const res = await fetch('/api/inquiry/create', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    });
    return res.json();
  },
  getEconomics: async () => {
    const res = await fetch('/api/artisan/economics');
    return res.json();
  },
  askAssistant: async (message: string, language: string = 'hi', conversationHistory: any[] = []) => {
    const res = await fetch('/api/ai/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, conversationHistory })
    });
    if (!res.ok) {
      throw new Error(`Assistant API error: ${res.statusText}`);
    }
    return res.json();
  },
  analyzePricingImage: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await fetch('/api/pricing/analyze-image', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Image Analysis Error: ${err || res.statusText}`);
    }
    return res.json();
  },
  calculateDetailedPricing: async (inputs: any) => {
    const res = await fetch('/api/pricing/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Pricing Calculation Error: ${err || res.statusText}`);
    }
    return res.json();
  },
  explainPricing: async (calculation: any, attributes?: any, market?: any) => {
    const res = await fetch('/api/pricing/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculation, attributes, market })
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Explanation Error: ${err || res.statusText}`);
    }
    return res.json();
  },
  savePriceRecommendation: async (data: any) => {
    const res = await fetch('/api/pricing/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Save Recommendation Error: ${err || res.statusText}`);
    }
    return res.json();
  },
  enhanceStudioImage: async (input: { imageFile?: File; imageUrl?: string; theme?: ThemeName }): Promise<StudioEnhancementResult> => {
    let res: Response;
    if (input.imageFile) {
      const formData = new FormData();
      formData.append('image', input.imageFile);
      if (input.theme) formData.append('theme', input.theme);
      res = await fetch('/api/ai/enhance-studio', {
        method: 'POST',
        body: formData
      });
    } else {
      res = await fetch('/api/ai/enhance-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: input.imageUrl,
          theme: input.theme || 'clean_white'
        })
      });
    }
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Studio Enhancement Error: ${err || res.statusText}`);
    }
    return res.json();
  },
  recomposeTheme: async (cutoutUrl: string, theme: ThemeName): Promise<{ status: string; theme: ThemeName; enhancedUrl: string }> => {
    const res = await fetch('/api/ai/recompose-theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cutoutUrl, theme })
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Recompose Error: ${err || res.statusText}`);
    }
    return res.json();
  }
};

export const voiceIntent = api.voiceIntent;
export const enhanceImage = api.enhanceImage;
export const generateCatalog = api.generateCatalog;
export const calculatePricing = api.calculatePricing;
export const createInquiry = api.createInquiry;
export const getEconomics = api.getEconomics;
export const askAssistant = api.askAssistant;
export const analyzePricingImage = api.analyzePricingImage;
export const calculateDetailedPricing = api.calculateDetailedPricing;
export const explainPricing = api.explainPricing;
export const savePriceRecommendation = api.savePriceRecommendation;
export const enhanceStudioImage = api.enhanceStudioImage;
export const recomposeTheme = api.recomposeTheme;

