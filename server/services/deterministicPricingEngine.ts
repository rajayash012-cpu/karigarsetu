import { ProductAttributes } from './visionPricingService.js';

export interface VolumeDiscountTier {
  min: number;
  max: number;
  discountPercent: number;
  label: string;
}

export interface PricingFactorsConfig {
  defaultTargetMargin: number;
  costWeight: number;
  marketWeight: number;
  complexityMultipliers: Record<number, number>;
  workmanshipMultipliers: Record<number, number>;
  qualityMultipliers: Record<number, number>;
  buyerTypeMultipliers: Record<string, number>;
  destinationMultipliers: Record<string, number>;
  seasonMultipliers: Record<string, number>;
  volumeTiers: VolumeDiscountTier[];
  craftLabourRates: {
    simple: { min: number; max: number; default: number };
    moderate: { min: number; max: number; default: number };
    complex: { min: number; max: number; default: number };
    specialized: { min: number; max: number; default: number };
  };
}

/**
 * Transparent, configurable multipliers object (Requirements 13–21)
 * Pure deterministic mathematics - zero LLM hallucinations
 */
export const PRICING_CONFIG: PricingFactorsConfig = {
  defaultTargetMargin: 0.30, // 30% default target margin
  costWeight: 0.70,          // 70% cost-based signal
  marketWeight: 0.30,        // 30% market comparable signal
  complexityMultipliers: {
    1: 0.95,
    2: 1.00,
    3: 1.05,
    4: 1.12,
    5: 1.20
  },
  workmanshipMultipliers: {
    1: 0.98,
    2: 1.00,
    3: 1.04,
    4: 1.08,
    5: 1.12
  },
  qualityMultipliers: {
    1: 0.95,
    2: 1.00,
    3: 1.05,
    4: 1.10,
    5: 1.15
  },
  buyerTypeMultipliers: {
    'retailer': 1.02,
    'boutique': 1.05,
    'retail_boutique': 1.05,
    'corporate_gifting': 1.03,
    'hotel_restaurant': 1.02,
    'distributor': 0.96,
    'wholesale_distributor': 0.96,
    'export_buyer': 1.04,
    'export_house': 1.04,
    'government_gem': 0.94,
    'general': 1.00
  },
  destinationMultipliers: {
    'local': 1.00,
    'nearby_state': 1.02,
    'national': 1.04,
    'export': 1.08,
    'export_oriented': 1.08
  },
  seasonMultipliers: {
    'normal': 1.00,
    'regular': 1.00,
    'festive': 1.15, // Diwali, Navratri, Durga Puja peak demand
    'wedding': 1.20  // Wedding / bridal season surge
  },
  volumeTiers: [
    { min: 1, max: 9, discountPercent: 0, label: '1–9 units (Single / Sampling: 0%)' },
    { min: 10, max: 24, discountPercent: 3, label: '10–24 units (Tier 1: 3% off)' },
    { min: 25, max: 49, discountPercent: 5, label: '25–49 units (Tier 2: 5% off)' },
    { min: 50, max: 99, discountPercent: 8, label: '50–99 units (Tier 3: 8% off)' },
    { min: 100, max: 249, discountPercent: 10, label: '100–249 units (Tier 4: 10% off)' },
    { min: 250, max: Infinity, discountPercent: 12, label: '250+ units (Tier 5: 12% off)' }
  ],
  craftLabourRates: {
    simple: { min: 80, max: 150, default: 120 },
    moderate: { min: 120, max: 250, default: 180 },
    complex: { min: 180, max: 400, default: 250 },
    specialized: { min: 250, max: 500, default: 350 }
  }
};

export interface PricingCalculationInputs {
  materialCost: number;
  labourHours: number;
  labourRate: number;
  packagingCost?: number;
  transportCost?: number;
  otherCost?: number;
  productComplexity?: number;
  workmanship?: number | string;
  finishQuality?: number;
  quantity?: number;
  minimumAcceptablePrice?: number;
  targetMargin?: number;
  buyerType?: string;
  destinationRegion?: string;
  marketComparablePrice?: number;
  marketReference?: number;
  costWeight?: number;
  marketWeight?: number;
  season?: string;
  attributes?: Partial<ProductAttributes>;
  aiConfidence?: number;
}

export interface PricingSanityCheck {
  isReviewRecommended: boolean;
  sanityStatus: 'verified' | 'review_recommended';
  flags: string[];
  summary: string;
}

export interface PricingCalculationResult {
  costBreakdown: {
    materialCost: number;
    labourCost: number;
    labourHours: number;
    labourRate: number;
    packagingCost: number;
    transportCost: number;
    otherCost: number;
    totalCost: number;
  };
  marginAnalysis: {
    targetMarginPercent: number;
    basePriceBeforeAdjustments: number;
    marginAmountBeforeAdjustments: number;
    effectiveMarginPercent: number;
    effectiveMarginAmount: number;
  };
  multipliersApplied: {
    complexityScore: number;
    complexityMultiplier: number;
    workmanshipScore: number;
    workmanshipLevel: string;
    workmanshipMultiplier: number;
    finishQualityScore: number;
    qualityMultiplier: number;
    buyerType: string;
    buyerMultiplier: number;
    destinationRegion: string;
    destinationMultiplier: number;
    season: string;
    seasonMultiplier: number;
    combinedFactor: number;
  };
  marketIntegration: {
    marketReference: number;
    costBasedPrice: number;
    blendedPrice: number;
    costWeight: number;
    marketWeight: number;
  };
  volumeAnalysis: {
    quantity: number;
    volumeTierLabel: string;
    discountPercent: number;
    discountAmount: number;
  };
  floorProtection: {
    minimumAcceptablePrice: number;
    totalCostFloor: number;
    effectivePriceFloor: number;
    isFloorTriggered: boolean;
  };
  recommendation: {
    minimumPrice: number;
    suggestedPrice: number;
    maximumPrice: number;
    unitPrice: number;
    totalOrderValue: number;
  };
  sanityCheck: PricingSanityCheck;
  formulaVersion: string;
  explanationSummary: string;
}

/**
 * Helper to convert textual workmanship to numeric 1-5
 */
function normalizeWorkmanship(val: any): { score: number; level: string } {
  if (typeof val === 'number') {
    const score = Math.min(5, Math.max(1, Math.round(val)));
    const levels = ['', 'Low', 'Medium', 'High', 'Master', 'Master'];
    return { score, level: levels[score] || 'Medium' };
  }
  const str = String(val || 'Medium').toLowerCase();
  if (str.includes('master') || str === '5') return { score: 5, level: 'Master' };
  if (str.includes('high') || str === '4') return { score: 4, level: 'High' };
  if (str.includes('med') || str === '3') return { score: 3, level: 'Medium' };
  if (str.includes('low') || str === '2' || str === '1') return { score: 2, level: 'Low' };
  return { score: 3, level: 'Medium' };
}

/**
 * Pure Deterministic 15-Variable Pricing Engine
 * (Zero LLM hallucination: all currency numbers are computed using pure mathematical formulas)
 */
export function calculateDeterministicPrice(inputs: PricingCalculationInputs): PricingCalculationResult {
  // 1. Sanitize numeric inputs (no negative numbers, safe minimums)
  const materialCost = Math.max(0, Number(inputs.materialCost) || 0);
  const labourHours = Math.max(0, Number(inputs.labourHours) || 0);
  const labourRate = Math.max(0, Number(inputs.labourRate) || 0);
  const packagingCost = Math.max(0, Number(inputs.packagingCost) || 0);
  const transportCost = Math.max(0, Number(inputs.transportCost) || 0);
  const otherCost = Math.max(0, Number(inputs.otherCost) || 0);
  const quantity = Math.max(1, Math.round(Number(inputs.quantity) || 1));
  const minimumAcceptablePrice = Math.max(0, Number(inputs.minimumAcceptablePrice) || 0);

  // 2. Base Production Cost (Requirement 12)
  const labourCost = Math.round(labourHours * labourRate);
  const totalCost = materialCost + labourCost + packagingCost + transportCost + otherCost;

  // 3. Target Margin Calculation (Formula: totalCost / (1 - targetMargin)) (Requirement 16)
  const rawTargetMargin = inputs.targetMargin !== undefined ? Number(inputs.targetMargin) : PRICING_CONFIG.defaultTargetMargin;
  const targetMargin = Math.min(0.85, Math.max(0.05, rawTargetMargin > 1 ? rawTargetMargin / 100 : rawTargetMargin));
  const targetMarginPercent = Math.round(targetMargin * 100);

  const basePriceBeforeAdjustments = totalCost > 0 ? Math.round(totalCost / (1 - targetMargin)) : 0;
  const marginAmountBeforeAdjustments = Math.max(0, basePriceBeforeAdjustments - totalCost);

  // 4. Retrieve Visual Attribute Multipliers (Requirements 14, 15)
  const rawComplexity = inputs.productComplexity !== undefined 
    ? inputs.productComplexity 
    : (inputs.attributes?.design_complexity || inputs.attributes?.pattern_complexity || 3);
  const complexityScore = Math.min(5, Math.max(1, Math.round(Number(rawComplexity) || 3)));
  const complexityMultiplier = PRICING_CONFIG.complexityMultipliers[complexityScore] || 1.0;

  const rawWorkmanship = inputs.workmanship !== undefined ? inputs.workmanship : inputs.attributes?.workmanship_level;
  const { score: workmanshipScore, level: workmanshipLevel } = normalizeWorkmanship(rawWorkmanship);
  const workmanshipMultiplier = PRICING_CONFIG.workmanshipMultipliers[workmanshipScore] || 1.0;

  const rawQuality = inputs.finishQuality !== undefined ? inputs.finishQuality : inputs.attributes?.finish_quality;
  const finishQualityScore = Math.min(5, Math.max(1, Math.round(Number(rawQuality) || 3)));
  const qualityMultiplier = PRICING_CONFIG.qualityMultipliers[finishQualityScore] || 1.0;

  // 5. Buyer Type Multiplier (Requirement 20)
  const buyerType = (inputs.buyerType || 'general').toLowerCase();
  const buyerMultiplier = PRICING_CONFIG.buyerTypeMultipliers[buyerType] || 1.0;

  // 6. Destination / Region Multiplier (Requirement 21)
  const destRegion = (inputs.destinationRegion || 'national').toLowerCase();
  const destinationMultiplier = PRICING_CONFIG.destinationMultipliers[destRegion] || 1.0;

  // 7. Season Multiplier (Requirement 11)
  const season = (inputs.season || 'normal').toLowerCase();
  const seasonMultiplier = PRICING_CONFIG.seasonMultipliers[season] || 1.0;

  // Combined Multiplier Factor
  const combinedFactor = Number((
    complexityMultiplier * 
    workmanshipMultiplier * 
    qualityMultiplier * 
    buyerMultiplier * 
    destinationMultiplier * 
    seasonMultiplier
  ).toFixed(4));

  const adjustedCostPrice = Math.round(basePriceBeforeAdjustments * combinedFactor);

  // 8. Dynamic Market Adjustment (Weighted 70% Cost + 30% Market) (Requirement 18)
  const marketRef = Math.max(0, Number(inputs.marketReference || inputs.marketComparablePrice) || 0);
  const costWeight = inputs.costWeight !== undefined ? Number(inputs.costWeight) : PRICING_CONFIG.costWeight;
  const marketWeight = inputs.marketWeight !== undefined ? Number(inputs.marketWeight) : PRICING_CONFIG.marketWeight;

  let blendedPrice = adjustedCostPrice;
  if (marketRef > 0 && totalCost > 0) {
    const totalW = costWeight + marketWeight;
    const normCostW = costWeight / totalW;
    const normMarketW = marketWeight / totalW;
    blendedPrice = Math.round((adjustedCostPrice * normCostW) + (marketRef * normMarketW));
  }

  // 9. B2B Volume Discount Tiers (Requirement 19)
  const matchedTier = PRICING_CONFIG.volumeTiers.find(tier => quantity >= tier.min && quantity <= tier.max)
    || PRICING_CONFIG.volumeTiers[PRICING_CONFIG.volumeTiers.length - 1];
  
  const discountPercent = matchedTier.discountPercent;
  const rawDiscountedPrice = Math.round(blendedPrice * (1 - (discountPercent / 100)));
  const discountAmount = Math.max(0, blendedPrice - rawDiscountedPrice);

  // 10. Floor Protection (Requirement 19)
  // Price MUST NOT fall below max(totalCost, minimumAcceptablePrice)
  const effectivePriceFloor = Math.max(totalCost, minimumAcceptablePrice);
  const isFloorTriggered = rawDiscountedPrice < effectivePriceFloor && totalCost > 0;
  const suggestedPrice = Math.max(effectivePriceFloor, rawDiscountedPrice);

  // 11. Price Range Recommendation (Suggested ± 8% to 12%)
  const minimumPrice = Math.max(effectivePriceFloor, Math.round(suggestedPrice * 0.92));
  const maximumPrice = Math.max(suggestedPrice, Math.round(suggestedPrice * 1.12));
  const totalOrderValue = suggestedPrice * quantity;

  // Effective Margin
  const effectiveMarginAmount = Math.max(0, suggestedPrice - totalCost);
  const effectiveMarginPercent = suggestedPrice > 0 ? Math.round((effectiveMarginAmount / suggestedPrice) * 100) : 0;

  // 12. Price Sanity Check (Requirement 37)
  const flags: string[] = [];
  if (totalCost > 0 && suggestedPrice < minimumAcceptablePrice) {
    flags.push("Price falls below your minimum acceptable floor.");
  }
  if (totalCost > 0 && suggestedPrice < totalCost) {
    flags.push("Price is below total production cost (operating at a loss).");
  }
  if (effectiveMarginPercent < 5 && totalCost > 0) {
    flags.push("Profit margin is critically low (< 5%).");
  }
  if (marketRef > 0) {
    if (suggestedPrice > marketRef * 2.5) {
      flags.push(`Price (₹${suggestedPrice}) is significantly higher than cluster market median (₹${marketRef}).`);
    } else if (suggestedPrice < marketRef * 0.4 && totalCost > 0) {
      flags.push(`Price (₹${suggestedPrice}) is unusually lower than cluster benchmark (₹${marketRef}).`);
    }
  } else {
    flags.push("No verified market benchmark found for this craft category.");
  }
  if (inputs.aiConfidence !== undefined && inputs.aiConfidence < 0.60) {
    flags.push("AI visual assessment confidence is below 60%. Manual attribute confirmation recommended.");
  }
  if (Number(inputs.quantity) < 1) {
    flags.push("Invalid order quantity provided (sanitized to 1).");
  }
  if (Number(inputs.materialCost) < 0 || Number(inputs.labourHours) < 0) {
    flags.push("Negative cost or labour inputs detected (sanitized to 0).");
  }

  const isReviewRecommended = flags.length > 0;
  const sanityCheck: PricingSanityCheck = {
    isReviewRecommended,
    sanityStatus: isReviewRecommended ? 'review_recommended' : 'verified',
    flags,
    summary: isReviewRecommended 
      ? `Review Recommended: ${flags.length} potential issue(s) flagged.` 
      : 'Verified Fair Price: All cost, margin, and market sanity checks passed.'
  };

  // Structured Summary Explanation
  const explanationSummary = `Recommended suggested B2B price is ₹${suggestedPrice.toLocaleString('en-IN')} (range: ₹${minimumPrice.toLocaleString('en-IN')}–₹${maximumPrice.toLocaleString('en-IN')}) for ${quantity} unit(s). Total production cost is ₹${totalCost.toLocaleString('en-IN')} with an effective artisan margin of ${effectiveMarginPercent}%. ${isFloorTriggered ? `Floor protection enforced at ₹${effectivePriceFloor.toLocaleString('en-IN')}.` : ''} ${discountPercent > 0 ? `Includes a ${discountPercent}% volume discount for ${matchedTier.label}.` : ''}`;

  return {
    costBreakdown: {
      materialCost,
      labourCost,
      labourHours,
      labourRate,
      packagingCost,
      transportCost,
      otherCost,
      totalCost
    },
    marginAnalysis: {
      targetMarginPercent,
      basePriceBeforeAdjustments,
      marginAmountBeforeAdjustments,
      effectiveMarginPercent,
      effectiveMarginAmount
    },
    multipliersApplied: {
      complexityScore,
      complexityMultiplier,
      workmanshipScore,
      workmanshipLevel,
      workmanshipMultiplier,
      finishQualityScore,
      qualityMultiplier,
      buyerType,
      buyerMultiplier,
      destinationRegion: destRegion,
      destinationMultiplier,
      season,
      seasonMultiplier,
      combinedFactor
    },
    marketIntegration: {
      marketReference: marketRef,
      costBasedPrice: adjustedCostPrice,
      blendedPrice,
      costWeight,
      marketWeight
    },
    volumeAnalysis: {
      quantity,
      volumeTierLabel: matchedTier.label,
      discountPercent,
      discountAmount
    },
    floorProtection: {
      minimumAcceptablePrice,
      totalCostFloor: totalCost,
      effectivePriceFloor,
      isFloorTriggered
    },
    recommendation: {
      minimumPrice,
      suggestedPrice,
      maximumPrice,
      unitPrice: suggestedPrice,
      totalOrderValue
    },
    sanityCheck,
    formulaVersion: "2.0.0-15var-deterministic",
    explanationSummary
  };
}
