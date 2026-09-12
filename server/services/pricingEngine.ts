export type SeasonType = 'normal' | 'festive' | 'wedding';
export type VolumeTier = 'single' | 'wholesale' | 'bulk';

export interface PricingOptions {
  customBaseWage?: number;
  giCertified?: boolean;
  season?: SeasonType;
  volumeTier?: VolumeTier;
}

export interface PricingResult {
  costBreakdown: {
    materialCost: number;
    laborCost: number;
    baseCost: number;
    baseArtisanWage: number;
    estimatedLaborHours: number;
    laborComplexity: number;
    b2bMarginPercent: number;
    b2bMarginAmount: number;
    giPremiumPercent: number;
    giPremiumAmount: number;
    seasonMultiplier: number;
    seasonAdjustmentAmount: number;
    volumeDiscountPercent: number;
    volumeDiscountAmount: number;
  };
  baseUnitPrice: number;
  finalPrice: number;
  bulkPrice: number;
  institutionalPrice: number;
  festivalPrice: number;
  weddingPrice: number;
  marketComparable: number;
  laborComplexity: number;
  estimatedHours: number;
  activeSeason: SeasonType;
  activeTier: VolumeTier;
  giCertified: boolean;
  formula: string;
  explanation: string;
  explanationHi: string;
}

/**
 * Deterministic Dynamic Pricing Algorithm
 * 
 * Formula:
 * (Estimated Hours * Base Artisan Wage) + Estimated Material Cost = Base Cost
 * Apply 30% B2B margin + optional GI Tag authenticity premium.
 * Dynamically adjust for Season (Festive/Wedding) and Volume Tiers (10+, 50+ units).
 * 
 * Note: AI provides purely physical estimates (laborComplexity, estimatedLaborHours, estimatedMaterialCostINR).
 * The backend calculates all monetary values deterministically — zero hallucinated prices.
 */
export function calculatePrice(
  laborComplexity: number, 
  estimatedLaborHours: number, 
  estimatedMaterialCostINR: number,
  optionsOrWage?: number | PricingOptions
): PricingResult {
  // Extract options (support both number for backward-compat and PricingOptions object)
  let customBaseWage: number | undefined;
  let giCertified: boolean = true; // Default to true for certified artisan platform
  let season: SeasonType = 'normal';
  let volumeTier: VolumeTier = 'single';

  if (typeof optionsOrWage === 'number') {
    customBaseWage = optionsOrWage;
  } else if (optionsOrWage && typeof optionsOrWage === 'object') {
    customBaseWage = optionsOrWage.customBaseWage;
    if (typeof optionsOrWage.giCertified === 'boolean') giCertified = optionsOrWage.giCertified;
    if (optionsOrWage.season) season = optionsOrWage.season;
    if (optionsOrWage.volumeTier) volumeTier = optionsOrWage.volumeTier;
  }

  // Base hourly artisan wage (default ₹150/hr, configurable via environment or client)
  const defaultWage = Number(process.env.BASE_ARTISAN_WAGE) || 150;
  const baseArtisanWage = customBaseWage && customBaseWage > 0 ? customBaseWage : defaultWage;

  const laborCost = Math.round(estimatedLaborHours * baseArtisanWage);
  const materialCost = Math.max(0, Math.round(estimatedMaterialCostINR));
  
  // Deterministic Base Production Cost: (Estimated Hours * Base Artisan Wage) + Estimated Material Cost
  const baseCost = laborCost + materialCost;

  // Strict 30% B2B Margin
  const B2B_MARGIN_RATE = 0.30;
  const b2bMarginAmount = Math.round(baseCost * B2B_MARGIN_RATE);

  // GI Tag Authenticity Premium: 5% heritage protection for certified items
  const giPremiumPercent = giCertified ? 5 : 0;
  const giPremiumAmount = Math.round(baseCost * (giPremiumPercent / 100));

  // Baseline Single Unit Price before seasonal or volume dynamics
  const baseUnitPrice = baseCost + b2bMarginAmount + giPremiumAmount;

  // Dynamic Season Multiplier
  let seasonMultiplier = 1.0;
  if (season === 'festive') seasonMultiplier = 1.15; // +15% festive peak demand
  if (season === 'wedding') seasonMultiplier = 1.20; // +20% wedding bridal season demand

  const seasonAdjustedPrice = Math.round(baseUnitPrice * seasonMultiplier);
  const seasonAdjustmentAmount = seasonAdjustedPrice - baseUnitPrice;

  // Dynamic Volume Tier Discount
  let volumeDiscountPercent = 0;
  if (volumeTier === 'wholesale') volumeDiscountPercent = 12; // 10-49 pcs: 12% wholesale rebate
  if (volumeTier === 'bulk') volumeDiscountPercent = 20;      // 50+ pcs: 20% institutional export rebate

  const volumeDiscountAmount = Math.round(seasonAdjustedPrice * (volumeDiscountPercent / 100));
  const finalPrice = Math.max(baseCost, seasonAdjustedPrice - volumeDiscountAmount);

  // Standard Tiers & Benchmarks for comparative view
  const bulkPrice = Math.round(baseUnitPrice * 0.88);          // -12% standard bulk
  const institutionalPrice = Math.round(baseUnitPrice * 0.80); // -20% standard export
  const festivalPrice = Math.round(baseUnitPrice * 1.15);      // +15% festive
  const weddingPrice = Math.round(baseUnitPrice * 1.20);       // +20% wedding
  const marketComparable = Math.round(finalPrice * 1.42);      // Showroom retail middleman benchmark (+42%)

  const giTagStr = giCertified ? ` + 5% GI Tag (₹${giPremiumAmount})` : '';
  const formula = `(${estimatedLaborHours} hrs × ₹${baseArtisanWage}/hr) + ₹${materialCost} materials = ₹${baseCost} Base Cost → +30% B2B Margin (₹${b2bMarginAmount})${giTagStr} → Final Price: ₹${finalPrice}`;

  const explanation = `Artisan wage is guaranteed at ₹${baseArtisanWage}/hr for ${estimatedLaborHours} hours of skilled labor (Complexity ${laborComplexity}/10), providing ₹${laborCost.toLocaleString('en-IN')} in direct artisan income. Certified raw materials account for ₹${materialCost.toLocaleString('en-IN')}, establishing a base production cost of ₹${baseCost.toLocaleString('en-IN')}. With an ethical 30% B2B margin (+₹${b2bMarginAmount.toLocaleString('en-IN')})${giCertified ? ' and 5% GI authenticity value protection' : ''}, the fair B2B price is established at ₹${finalPrice.toLocaleString('en-IN')}.`;

  const explanationHi = `कारीगर मजदूरी ₹${baseArtisanWage}/घंटा की दर से ${estimatedLaborHours} घंटों के कुशल कार्य (जटिलता ${laborComplexity}/10) के लिए ₹${laborCost.toLocaleString('en-IN')} सुरक्षित की गई है। ₹${materialCost.toLocaleString('en-IN')} कच्चा माल जोड़कर कुल उत्पादन लागत ₹${baseCost.toLocaleString('en-IN')} है। 30% सुरक्षित B2B लाभ (+₹${b2bMarginAmount.toLocaleString('en-IN')})${giCertified ? ' और 5% जीआई प्रमाणन मूल्य' : ''} के साथ निष्पक्ष मूल्य ₹${finalPrice.toLocaleString('en-IN')} निर्धारित किया गया है।`;

  return {
    costBreakdown: {
      materialCost,
      laborCost,
      baseCost,
      baseArtisanWage,
      estimatedLaborHours,
      laborComplexity,
      b2bMarginPercent: 30,
      b2bMarginAmount,
      giPremiumPercent,
      giPremiumAmount,
      seasonMultiplier,
      seasonAdjustmentAmount,
      volumeDiscountPercent,
      volumeDiscountAmount
    },
    baseUnitPrice,
    finalPrice,
    bulkPrice,
    institutionalPrice,
    festivalPrice,
    weddingPrice,
    marketComparable,
    laborComplexity,
    estimatedHours: estimatedLaborHours,
    activeSeason: season,
    activeTier: volumeTier,
    giCertified,
    formula,
    explanation,
    explanationHi
  };
}
