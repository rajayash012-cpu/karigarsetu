import { store } from '../store.js';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failed++;
  }
}

async function runDataConsistencyTests() {
  console.log('====================================================');
  console.log('🧪 KARIGARSETU DATA INTEGRITY & CONSISTENCY TESTS');
  console.log('====================================================\n');

  // --- 1. ARTISANS TESTS ---
  console.log('--- 1. Artisans Seed Dataset Verification ---');
  const artisans = store.artisans;
  assert(artisans.length >= 50, `Artisans count >= 50 (Found: ${artisans.length})`);
  
  const states = new Set(artisans.map(a => a.state).filter(Boolean));
  assert(states.size >= 25, `States/UTs covered >= 25 (Found: ${states.size})`);

  let allArtisansValid = true;
  artisans.forEach(a => {
    if (!a.id || !a.name || !a.pehchanId || !a.craft || !a.state || a.trustScore < 70 || !a.isDemoData) {
      allArtisansValid = false;
    }
  });
  assert(allArtisansValid, 'All artisans have valid Pehchan ID, Craft, State, Trust Score, and isDemoData flag');

  // --- 2. PRODUCTS TESTS & FLOOR PROTECTION ---
  console.log('\n--- 2. Products Seed Dataset & Price Floor Protection ---');
  const products = store.products;
  assert(products.length >= 100, `Products count >= 100 (Found: ${products.length})`);

  const artisanIds = new Set(artisans.map(a => a.id));
  let allProductRefsValid = true;
  products.forEach(p => {
    if (!artisanIds.has(p.artisanId)) {
      allProductRefsValid = false;
    }
  });
  assert(allProductRefsValid, 'Every product references a valid Artisan ID');

  // Price brackets distribution
  const b1 = products.filter(p => p.price < 1000).length;
  const b2 = products.filter(p => p.price >= 1000 && p.price <= 5000).length;
  const b3 = products.filter(p => p.price > 5000 && p.price <= 15000).length;
  const b4 = products.filter(p => p.price > 15000).length;
  assert(b1 > 0 && b2 > 0 && b3 > 0 && b4 > 0, `All 4 price brackets populated (<1k: ${b1}, 1k-5k: ${b2}, 5k-15k: ${b3}, >15k: ${b4})`);

  // Floor Protection Guarantee
  let floorViolations = 0;
  let totalTiersChecked = 0;
  products.forEach(p => {
    const cost = p.costBreakdown?.totalCost || 0;
    if (p.price <= cost) {
      floorViolations++;
    }
    if (p.b2bPricingTiers && Array.isArray(p.b2bPricingTiers)) {
      p.b2bPricingTiers.forEach(tier => {
        totalTiersChecked++;
        if (tier.price <= cost) {
          floorViolations++;
        }
      });
    }
  });
  assert(floorViolations === 0, `Floor Protection Check: Zero price violations across base & ${totalTiersChecked} volume tiers (Violations: ${floorViolations})`);

  // --- 3. B2B BUYERS TESTS ---
  console.log('\n--- 3. B2B Buyers Seed Dataset Verification ---');
  const buyers = store.buyers;
  assert(buyers.length >= 30, `Buyers count >= 30 (Found: ${buyers.length})`);

  const buyerCities = new Set(buyers.map(b => b.city).filter(Boolean));
  assert(buyerCities.size >= 18, `Buyer Commercial Cities covered >= 18 (Found: ${buyerCities.size})`);

  let allBuyersValid = true;
  buyers.forEach(b => {
    if (!b.id || !b.companyName || !b.authorizedPerson || !b.gstin || !b.pan || b.trustScore < 70) {
      allBuyersValid = false;
    }
  });
  assert(allBuyersValid, 'All buyers have valid Company Name, Authorized Person, GSTIN, PAN, and Trust Score');

  // --- 4. B2B INQUIRIES TESTS ---
  console.log('\n--- 4. B2B Inquiries Referential Integrity & Lifecycle Stages ---');
  const inquiries = store.inquiries;
  assert(inquiries.length >= 50, `Inquiries count >= 50 (Found: ${inquiries.length})`);

  const buyerIds = new Set(buyers.map(b => b.id));
  let allInquiriesValid = true;
  inquiries.forEach(inq => {
    if (!artisanIds.has(inq.artisanId) || !buyerIds.has(inq.buyerId)) {
      allInquiriesValid = false;
    }
  });
  assert(allInquiriesValid, 'Every inquiry references a valid Artisan and valid Buyer');

  const lifecycleStages = new Set(inquiries.map(i => i.status));
  const expectedStages = ['New', 'Viewed', 'Responded', 'Negotiating', 'Accepted', 'Fulfilled', 'Closed'];
  const allStagesPresent = expectedStages.every(stage => lifecycleStages.has(stage));
  assert(allStagesPresent, `All 7 inquiry lifecycle stages represented (${Array.from(lifecycleStages).join(', ')})`);

  // --- 5. MULTI-FACTOR MARKET MATCHES TESTS ---
  console.log('\n--- 5. Multi-Factor Compatibility Matching Engine ---');
  const matches = store.marketMatches;
  assert(matches.length >= 200, `Market Matches count >= 200 (Found: ${matches.length})`);

  let allScoresValid = true;
  let matchesWithWarning = 0;
  matches.forEach(m => {
    if (m.compatibilityScore < 60 || m.compatibilityScore > 100) allScoresValid = false;
    if (m.capacityMismatchWarning) matchesWithWarning++;
  });
  assert(allScoresValid, 'All compatibility scores fall in valid range [60, 100]');
  assert(matchesWithWarning > 0, `Capacity Mismatch Warnings detected and generated (${matchesWithWarning} warnings)`);

  // --- 6. SIH DEMO PRESENTATION SCENARIOS ---
  console.log('\n--- 6. Curated SIH Demo Presentation Scenarios ---');
  const scenarios = store.scenarios;
  assert(scenarios.length === 8, `Exactly 8 curated SIH demo scenarios configured (Found: ${scenarios.length})`);

  let allScenariosValid = true;
  scenarios.forEach(sc => {
    if (!sc.id || !sc.artisanId || !sc.buyerId || !sc.productId || !sc.pitch || !sc.recommendedJudgeQuestion) {
      allScenariosValid = false;
    }
  });
  assert(allScenariosValid, 'All scenarios have valid artisan, buyer, product, pitch, and judge questions');

  // Summary
  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runDataConsistencyTests();
