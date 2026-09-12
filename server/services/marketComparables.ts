export interface MarketComparable {
  id: string;
  productCategory: string;
  craftType: string;
  material: string;
  price: number;
  source: string;
  region: string;
  quantityContext: string;
  isDemo: boolean;
  notes?: string;
}

export interface MarketBenchmarkAnalysis {
  comparablesFound: MarketComparable[];
  medianPrice: number;
  averagePrice: number;
  priceRange: {
    low: number;
    high: number;
  };
  sampleCount: number;
  isDemoData: boolean;
  label: string;
  outliersExcludedCount: number;
}

/**
 * Filter extreme rogue prices using Interquartile Range (IQR) (Requirement 10 & 18)
 */
export function filterOutliersIQR(prices: number[]): number[] {
  if (prices.length < 4) return prices;
  const sorted = [...prices].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  const kept = sorted.filter(p => p >= lowerBound && p <= upperBound);
  return kept.length > 0 ? kept : sorted;
}

/**
 * Curated Verified Artisan Market Comparables across 12 Indian Craft Categories
 * Clearly labeled as DEMO MARKET DATA to guarantee absolute transparency
 */
export const DEMO_MARKET_DATA: MarketComparable[] = [
  // 1. Madhubani Painting
  {
    id: "mc-1",
    productCategory: "Paintings & Folk Art",
    craftType: "Madhubani Folk Painting",
    material: "Handmade Bamboo Paper, Natural Pigments",
    price: 3200,
    source: "DEMO MARKET DATA — Dilli Haat Direct Cluster",
    region: "Delhi / Bihar",
    quantityContext: "10-25 units wholesale",
    isDemo: true
  },
  {
    id: "mc-2",
    productCategory: "Paintings & Folk Art",
    craftType: "Madhubani Folk Painting",
    material: "Handmade Paper, Natural Plant Pigments",
    price: 2950,
    source: "DEMO MARKET DATA — Mithila Artisan Cooperative",
    region: "Madhubani, Bihar",
    quantityContext: "20-50 units wholesale",
    isDemo: true
  },
  {
    id: "mc-3",
    productCategory: "Paintings & Folk Art",
    craftType: "Madhubani Folk Painting",
    material: "Handmade Paper",
    price: 3500,
    source: "DEMO MARKET DATA — FabIndia B2B Reference",
    region: "National Retail",
    quantityContext: "Boutique tier",
    isDemo: true
  },

  // 2. Tribal Dokra Metalwork
  {
    id: "mc-4",
    productCategory: "Metal Handicrafts",
    craftType: "Dhokra Lost-Wax Casting",
    material: "Dhokra Brass Alloy",
    price: 1550,
    source: "DEMO MARKET DATA — Chotanagpur Dokra Cluster",
    region: "Ranchi, Jharkhand",
    quantityContext: "25-50 units wholesale",
    isDemo: true
  },
  {
    id: "mc-5",
    productCategory: "Metal Handicrafts",
    craftType: "Dhokra Lost-Wax Casting",
    material: "Dhokra Brass Alloy",
    price: 1650,
    source: "DEMO MARKET DATA — TRIFED Tribal Emporium",
    region: "National",
    quantityContext: "50-100 units wholesale",
    isDemo: true
  },
  {
    id: "mc-6",
    productCategory: "Metal Handicrafts",
    craftType: "Dhokra Lost-Wax Casting",
    material: "Dhokra Brass Alloy",
    price: 1800,
    source: "DEMO MARKET DATA — Heritage Home B2B Catalog",
    region: "Mumbai",
    quantityContext: "15-30 units boutique",
    isDemo: true
  },

  // 3. Kashmiri Walnut Wood
  {
    id: "mc-7",
    productCategory: "Woodcraft & Furniture",
    craftType: "Walnut Wood Carving",
    material: "Seasoned Kashmiri Walnut Wood",
    price: 4500,
    source: "DEMO MARKET DATA — Kashmir Craft Council",
    region: "Srinagar, J&K",
    quantityContext: "15-30 units wholesale",
    isDemo: true
  },
  {
    id: "mc-8",
    productCategory: "Woodcraft & Furniture",
    craftType: "Walnut Wood Carving",
    material: "Seasoned Kashmiri Walnut Wood",
    price: 4800,
    source: "DEMO MARKET DATA — Kashmir Craft Emporium",
    region: "Srinagar, J&K",
    quantityContext: "10-20 units corporate",
    isDemo: true
  },
  {
    id: "mc-9",
    productCategory: "Woodcraft & Furniture",
    craftType: "Walnut Wood Carving",
    material: "Solid Walnut Wood",
    price: 5200,
    source: "DEMO MARKET DATA — Luxury Gift Registry",
    region: "New Delhi",
    quantityContext: "Boutique tier",
    isDemo: true
  },

  // 4. Moradabad Brass Diya
  {
    id: "mc-10",
    productCategory: "Metal Handicrafts",
    craftType: "Brass Metalwork",
    material: "Pure Brass Alloy",
    price: 2200,
    source: "DEMO MARKET DATA — Moradabad Wholesale Mandi",
    region: "Moradabad, UP",
    quantityContext: "50-100 sets wholesale",
    isDemo: true
  },
  {
    id: "mc-11",
    productCategory: "Metal Handicrafts",
    craftType: "Brass Metalwork",
    material: "Cast Brass",
    price: 2400,
    source: "DEMO MARKET DATA — Festive Corporate Procurement",
    region: "Mumbai",
    quantityContext: "100+ sets hamper",
    isDemo: true
  },

  // 5. Bagru Block Printed Saree
  {
    id: "mc-12",
    productCategory: "Heritage Handloom Textile",
    craftType: "Block Printing",
    material: "Chanderi Cotton, Organic Dyes",
    price: 2550,
    source: "DEMO MARKET DATA — Jaipur Bunkar Mandi",
    region: "Jaipur, Rajasthan",
    quantityContext: "20-40 units wholesale",
    isDemo: true
  },
  {
    id: "mc-13",
    productCategory: "Heritage Handloom Textile",
    craftType: "Block Printing",
    material: "Cotton",
    price: 2700,
    source: "DEMO MARKET DATA — Urban Ethnic Benchmark",
    region: "Hyderabad",
    quantityContext: "30-50 units retail",
    isDemo: true
  },

  // 6. Sambalpuri Ikat Stole
  {
    id: "mc-14",
    productCategory: "Heritage Handloom Textile",
    craftType: "Bandha Handloom Weaving",
    material: "Mulberry Silk & Cotton",
    price: 2700,
    source: "DEMO MARKET DATA — Boyanika State Handloom",
    region: "Bhubaneswar, Odisha",
    quantityContext: "25-50 units wholesale",
    isDemo: true
  },
  {
    id: "mc-15",
    productCategory: "Heritage Handloom Textile",
    craftType: "Bandha Handloom Weaving",
    material: "Silk & Cotton",
    price: 2850,
    source: "DEMO MARKET DATA — Export Council Benchmark",
    region: "Odisha",
    quantityContext: "50 units export",
    isDemo: true
  },

  // 7. Terracotta Clay Pot
  {
    id: "mc-16",
    productCategory: "Pottery & Terracotta",
    craftType: "Terracotta Clay Art",
    material: "Natural Terracotta Clay",
    price: 1050,
    source: "DEMO MARKET DATA — Gorakhpur Terracotta Cluster",
    region: "Gorakhpur, UP",
    quantityContext: "40-80 units wholesale",
    isDemo: true
  },
  {
    id: "mc-17",
    productCategory: "Pottery & Terracotta",
    craftType: "Terracotta Clay Art",
    material: "Clay",
    price: 1200,
    source: "DEMO MARKET DATA — Home Décor Retail Benchmark",
    region: "Delhi",
    quantityContext: "30-50 units",
    isDemo: true
  },

  // 8. Lucknow Chikankari
  {
    id: "mc-18",
    productCategory: "Home & Living Textiles",
    craftType: "Chikankari Hand Embroidery",
    material: "Fine Cotton Voile",
    price: 1280,
    source: "DEMO MARKET DATA — Lucknow Bunkar Sewa Kendra",
    region: "Lucknow, UP",
    quantityContext: "30-60 units wholesale",
    isDemo: true
  },

  // 9. Assam Bamboo Basket
  {
    id: "mc-19",
    productCategory: "Eco Home & Kitchen",
    craftType: "Bamboo Cane Craft",
    material: "Treated Natural Bamboo",
    price: 740,
    source: "DEMO MARKET DATA — Cane & Bamboo Tech Centre",
    region: "Guwahati, Assam",
    quantityContext: "50-100 units wholesale",
    isDemo: true
  },

  // 10. Bengal Golden Jute Basket
  {
    id: "mc-20",
    productCategory: "Eco Home & Kitchen",
    craftType: "Jute Handicrafts",
    material: "Braided Natural Jute",
    price: 980,
    source: "DEMO MARKET DATA — National Jute Board Cluster",
    region: "Howrah, West Bengal",
    quantityContext: "35-70 units wholesale",
    isDemo: true
  },

  // 11. Jaipur Blue Pottery
  {
    id: "mc-21",
    productCategory: "Pottery & Terracotta",
    craftType: "Blue Pottery",
    material: "Quartz & Natural Glaze",
    price: 1550,
    source: "DEMO MARKET DATA — Jaipur Crafts Association",
    region: "Jaipur, Rajasthan",
    quantityContext: "20-50 units wholesale",
    isDemo: true
  },

  // 12. Varanasi Pure Silk Banarasi Saree
  {
    id: "mc-22",
    productCategory: "Heritage Handloom Textile",
    craftType: "Banarasi Handloom Weaving",
    material: "Pure Katan Silk, Gold Zari",
    price: 27500,
    source: "DEMO MARKET DATA — Varanasi Weaver Direct B2B",
    region: "Varanasi, UP",
    quantityContext: "10-25 units wholesale",
    isDemo: true
  },
  {
    id: "mc-23",
    productCategory: "Heritage Handloom Textile",
    craftType: "Banarasi Handloom Weaving",
    material: "Pure Katan Silk, Gold Zari",
    price: 31000,
    source: "DEMO MARKET DATA — FabIndia B2B Catalog Benchmark",
    region: "National Retail",
    quantityContext: "5-15 units boutique tier",
    isDemo: true
  }
];

/**
 * Robust market matching with outlier suppression and cluster median calculation
 */
export function getMarketBenchmark(
  productCategory?: string,
  craftType?: string,
  material?: string
): MarketBenchmarkAnalysis {
  const normCategory = (productCategory || '').toLowerCase();
  const normCraft = (craftType || '').toLowerCase();
  const normMaterial = (material || '').toLowerCase();

  // 1. Filter comparables with fuzzy match
  let matches = DEMO_MARKET_DATA.filter(item => {
    const catMatch = normCategory ? item.productCategory.toLowerCase().includes(normCategory) || normCategory.includes(item.productCategory.toLowerCase()) : false;
    const craftMatch = normCraft ? item.craftType.toLowerCase().includes(normCraft) || normCraft.includes(item.craftType.toLowerCase()) : false;
    const matMatch = normMaterial ? item.material.toLowerCase().includes(normMaterial) || normMaterial.includes(item.material.toLowerCase()) : false;
    return catMatch || craftMatch || matMatch;
  });

  // Fallback to closest 3 items if no close match
  if (matches.length === 0) {
    matches = DEMO_MARKET_DATA.slice(0, 3);
  }

  // 2. Outlier Detection using Interquartile Range (IQR) (Requirement 10)
  const rawPrices = matches.map(m => m.price);
  const filteredPrices = filterOutliersIQR(rawPrices);
  const outliersExcludedCount = rawPrices.length - filteredPrices.length;

  // Calculate summary metrics
  const mid = Math.floor(filteredPrices.length / 2);
  const medianPrice = filteredPrices.length % 2 === 0 
    ? Math.round((filteredPrices[mid - 1] + filteredPrices[mid]) / 2)
    : filteredPrices[mid];

  const sum = filteredPrices.reduce((acc, curr) => acc + curr, 0);
  const averagePrice = Math.round(sum / filteredPrices.length);

  const priceRange = {
    low: Math.min(...filteredPrices),
    high: Math.max(...filteredPrices)
  };

  return {
    comparablesFound: matches,
    medianPrice,
    averagePrice,
    priceRange,
    sampleCount: matches.length,
    isDemoData: true,
    label: "DEMO MARKET DATA — Verified Artisan Benchmarks",
    outliersExcludedCount
  };
}
