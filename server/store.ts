import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { SEED_ARTISANS, type ArtisanSeed } from './data/artisansSeed.js';
import { SEED_BUYERS, type BuyerSeed } from './data/buyersSeed.js';
import { SEED_PRODUCTS, type ProductSeed, type B2BVolumeTier } from './data/productsSeed.js';
import { SEED_INQUIRIES, type InquirySeed } from './data/inquiriesSeed.js';
import { SEED_SCENARIOS, type DemoScenario } from './data/scenariosSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data.json');

export type { B2BVolumeTier, DemoScenario };

export type ArtisanData = ArtisanSeed;
export type BuyerData = BuyerSeed;
export type ProductData = ProductSeed;
export type InquiryData = InquirySeed;

export interface PriceRecommendation {
  id: string;
  productId?: string;
  artisanId: string;
  materialCost: number;
  labourHours: number;
  labourRate: number;
  packagingCost: number;
  transportCost: number;
  otherCost: number;
  totalCost: number;
  quantity: number;
  buyerType: string;
  marketLow: number;
  marketHigh: number;
  recommendedLow: number;
  recommendedHigh: number;
  suggestedPrice: number;
  minimumAcceptablePrice: number;
  aiVisualAttributes: any;
  aiConfidence: number;
  pricingFactors: any;
  formulaVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketMatchData {
  id: string;
  artisanId: string;
  artisanName: string;
  craft: string;
  location: string;
  state: string;
  capacityPerMonth: number;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  buyerCity: string;
  buyerState: string;
  typicalOrder: string;
  minUnits: number;
  maxUnits: number;
  compatibilityScore: number;
  scoreBreakdown?: {
    craftMatch: number;
    capacityCompatibility: number;
    priceAlignment: number;
    logisticsCorridor: number;
  };
  craftMatch: boolean;
  volumeCompatible: boolean;
  capacityWarning?: string;
  capacityMismatchWarning?: string;
  logisticsRoute: string;
  logisticsCorridor?: {
    route: string;
    estimatedDays: number;
    freightBand: string;
  };
  recommendedInquiryQuantity?: number;
  estimatedOrderValue?: number;
  recommendedAction: string;
  status: 'matched' | 'inquired' | 'connected';
  isDemoData: boolean;
}

// Multi-Factor Compatibility Matching Engine
export function generateMarketMatches(artisans: any[], buyers: any[]): MarketMatchData[] {
  const matches: MarketMatchData[] = [];
  let idCounter = 1;

  for (const artisan of artisans) {
    for (const buyer of buyers) {
      const craftLower = (artisan.craft || '').toLowerCase();
      const catLower = (artisan.category || '').toLowerCase();
      const preferred = (buyer.preferredCrafts || []).map((c: string) => c.toLowerCase());
      
      const exactCraftMatch = preferred.some((p: string) => craftLower.includes(p) || p.includes(craftLower));
      const categoryMatch = preferred.some((p: string) => catLower.includes(p) || p.includes(catLower));
      const isCraftMatch = exactCraftMatch || categoryMatch;

      const artisanCapacity = artisan.capacityPerMonth || 50;
      const buyerMin = buyer.minUnits || 20;
      const buyerMax = buyer.maxUnits || 100;
      
      let volumeScore = 0;
      let capacityWarning: string | undefined = undefined;
      const volumeCompatible = buyerMin <= artisanCapacity;

      if (buyerMax <= artisanCapacity) {
        volumeScore = 35;
      } else if (buyerMin <= artisanCapacity) {
        volumeScore = 25;
        capacityWarning = "High volume order — Recommend phased delivery over 2-3 months";
      } else {
        volumeScore = 10;
        capacityWarning = "Capacity mismatch — Artisan monthly capacity is below buyer minimum order";
      }

      const artState = artisan.state || 'India';
      const buyerCity = buyer.city || 'Delhi';
      const buyerState = buyer.state || 'Delhi';
      const sameState = artState.toLowerCase() === buyerState.toLowerCase();
      const logisticsScore = sameState ? 15 : 10;
      const logisticsRoute = sameState 
        ? `Intra-state direct cluster route (${artisan.district || artState} → ${buyerCity})` 
        : `Inter-state fair-trade freight corridor (${artState} → ${buyerCity})`;

      const trustScore = Math.round(((artisan.trustScore || 85) + (buyer.trustScore || 85)) / 2 * 0.15);

      let craftScore = exactCraftMatch ? 35 : (categoryMatch ? 25 : 10);
      let totalScore = Math.min(98, Math.max(62, craftScore + volumeScore + logisticsScore + trustScore));

      if (isCraftMatch || totalScore >= 66) {
        matches.push({
          id: `match-${idCounter++}`,
          artisanId: artisan.id,
          artisanName: artisan.name,
          craft: artisan.craft,
          location: artisan.location || `${artisan.district}, ${artisan.state}`,
          state: artisan.state || 'India',
          capacityPerMonth: artisanCapacity,
          buyerId: buyer.id,
          buyerName: buyer.authorizedPerson,
          buyerOrg: buyer.companyName,
          buyerCity: buyerCity,
          buyerState: buyerState,
          typicalOrder: buyer.typicalOrder || `${buyerMin}–${buyerMax} units`,
          minUnits: buyerMin,
          maxUnits: buyerMax,
          compatibilityScore: totalScore,
          scoreBreakdown: {
            craftMatch: craftScore,
            capacityCompatibility: volumeScore,
            priceAlignment: trustScore,
            logisticsCorridor: logisticsScore
          },
          craftMatch: isCraftMatch,
          volumeCompatible: volumeCompatible,
          capacityWarning: capacityWarning,
          capacityMismatchWarning: capacityWarning,
          logisticsRoute: logisticsRoute,
          logisticsCorridor: {
            route: logisticsRoute,
            estimatedDays: sameState ? 2 : 4,
            freightBand: sameState ? "Intra-State Express" : "Inter-State Fair Freight"
          },
          recommendedInquiryQuantity: Math.min(artisanCapacity, buyerMax),
          estimatedOrderValue: Math.min(artisanCapacity, buyerMax) * 2200,
          recommendedAction: totalScore >= 90 ? "Top Compatible Buyer — Proactively send swatch samples" : totalScore >= 80 ? "High Compatibility — Initiate wholesale catalog inquiry" : "Moderate Compatibility — Explore seasonal requirements",
          status: 'matched',
          isDemoData: true
        });
      }
    }
  }

  return matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

const ENRICHED_SCENARIOS = SEED_SCENARIOS.map(s => ({
  ...s,
  name: s.title,
  recommendedJudgeQuestion: s.suggestedQuestions?.[0] || 'How does KarigarSetu ensure artisan floor pricing?'
}));

// Backward compatibility aliases
export const DEMO_ARTISANS = SEED_ARTISANS;
export const DEMO_BUYERS = SEED_BUYERS;
export const DEMO_PRODUCTS = SEED_PRODUCTS;
export const DEMO_INQUIRIES = SEED_INQUIRIES;
export const DEMO_SCENARIOS = ENRICHED_SCENARIOS;

export const DEMO_ECONOMICS = {
  monthly: [
    { month: "Apr", monthHi: "अप्रैल", revenue: 28500, cost: 16500, expenses: 16500, profit: 12000, margin: 42.1 },
    { month: "May", monthHi: "मई", revenue: 34000, cost: 19000, expenses: 19000, profit: 15000, margin: 44.1 },
    { month: "Jun", monthHi: "जून", revenue: 31500, cost: 17500, expenses: 17500, profit: 14000, margin: 44.4 },
    { month: "Jul", monthHi: "जुलाई", revenue: 42000, cost: 23500, expenses: 23500, profit: 18500, margin: 44.0 },
    { month: "Aug", monthHi: "अगस्त", revenue: 48500, cost: 26000, expenses: 26000, profit: 22500, margin: 46.4 },
    { month: "Sep", monthHi: "सितंबर", revenue: 64800, cost: 36200, expenses: 36200, profit: 28600, margin: 44.1 }
  ],
  summary: {
    currentMonthRevenue: 64800,
    currentMonthCost: 36200,
    currentMonthProfit: 28600,
    currentMonthMargin: 44.1,
    totalRevenue: 249300,
    totalCost: 138700,
    totalProfit: 110600,
    avgMargin: 44.2,
    productsSold: 76,
    inquiriesReceived: 54,
    ordersConverted: 19,
    conversionRate: 35.2,
    topProduct: "Hand-painted Madhubani Wall Art",
    weakProduct: "Sikki Grass Round Coasters Set",
    growthRate: 58.4,
    diagnosticInsight: "High demand across Dokra and Madhubani decor. Suggest offering tiered B2B wholesale pricing on 50+ units to capture corporate festive orders."
  }
};

const defaultData = {
  artisan: SEED_ARTISANS[0], // Savita Devi as default active artisan
  artisans: SEED_ARTISANS,
  buyers: SEED_BUYERS,
  products: SEED_PRODUCTS,
  inquiries: SEED_INQUIRIES,
  marketMatches: generateMarketMatches(SEED_ARTISANS, SEED_BUYERS),
  scenarios: ENRICHED_SCENARIOS,
  priceRecommendations: [] as PriceRecommendation[],
  economics: DEMO_ECONOMICS
};

export let store: typeof defaultData = { ...defaultData };

export function loadStore() {
  if (fs.existsSync(dataPath)) {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      const parsed = JSON.parse(data);
      if (parsed.artisans && Array.isArray(parsed.artisans) && parsed.artisans.length >= 50) {
        store = {
          ...defaultData,
          ...parsed,
          artisan: parsed.artisan || parsed.artisans[0],
          artisans: parsed.artisans,
          buyers: parsed.buyers || defaultData.buyers,
          products: parsed.products || defaultData.products,
          inquiries: parsed.inquiries || defaultData.inquiries,
          scenarios: parsed.scenarios || ENRICHED_SCENARIOS,
          marketMatches: (parsed.marketMatches && parsed.marketMatches.length > 0)
            ? parsed.marketMatches
            : generateMarketMatches(parsed.artisans, parsed.buyers || defaultData.buyers),
          economics: parsed.economics || defaultData.economics,
          priceRecommendations: parsed.priceRecommendations || []
        };
        return;
      }
    } catch (e) {
      console.error("Error reading data.json, falling back to default store", e);
    }
  }
  store = { ...defaultData };
  saveStore();
}

export function saveStore() {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(store, null, 2));
  } catch (e) {
    console.error("Error writing data.json:", e);
  }
}

// Initialize on startup
loadStore();
