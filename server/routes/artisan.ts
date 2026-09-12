import { Router } from 'express';
import QRCode from 'qrcode';
import { store, saveStore } from '../store.js';

const router = Router();

export function matchesArtisanId(itemArtisanId?: string, queryArtisanId?: string, itemLegacyId?: string): boolean {
  if (!itemArtisanId || !queryArtisanId) return false;
  const q = String(queryArtisanId).trim().toLowerCase();
  const id1 = String(itemArtisanId).trim().toLowerCase();
  const id2 = itemLegacyId ? String(itemLegacyId).trim().toLowerCase() : '';
  if (id1 === q || id2 === q) return true;
  const numQ = parseInt(q.replace(/^artisan-|^art-/, ''), 10);
  const numId = parseInt(id1.replace(/^artisan-|^art-/, ''), 10);
  const numLegacy = id2 ? parseInt(id2.replace(/^artisan-|^art-/, ''), 10) : NaN;
  return (!isNaN(numQ) && !isNaN(numId) && numQ === numId) || (!isNaN(numQ) && !isNaN(numLegacy) && numQ === numLegacy);
}

/**
 * Get all Artisans with search/filtering
 * GET /api/artisan/all and GET /api/artisans
 */
const handleGetAllArtisans = (req: any, res: any) => {
  let list = store.artisans;
  const { search, craft, state: filterState, cluster } = req.query;

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.craft.toLowerCase().includes(q) ||
      (a.location && a.location.toLowerCase().includes(q)) ||
      (a.state && a.state.toLowerCase().includes(q)) ||
      (a.district && a.district.toLowerCase().includes(q))
    );
  }
  if (craft && typeof craft === 'string') {
    list = list.filter(a => a.craft.toLowerCase().includes(craft.toLowerCase()));
  }
  if (filterState && typeof filterState === 'string') {
    list = list.filter(a => a.state && a.state.toLowerCase().includes(filterState.toLowerCase()));
  }
  if (cluster && typeof cluster === 'string') {
    list = list.filter(a => a.cluster && a.cluster.toLowerCase().includes(cluster.toLowerCase()));
  }

  res.json({
    success: true,
    total: list.length,
    artisans: list,
    isDemoData: true
  });
};

router.get('/artisan/all', handleGetAllArtisans);
router.get('/artisans', handleGetAllArtisans);

/**
 * Get all Handcrafted Products with search, filtering, and artisan enrichment
 * GET /api/products
 */
router.get('/products', (req, res) => {
  let list = store.products;
  const { search, craft, category, state: filterState, bracket, minPrice, maxPrice, artisanId, page, limit } = req.query;

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(p =>
      (p.titleEn && p.titleEn.toLowerCase().includes(q)) ||
      (p.titleHi && p.titleHi.toLowerCase().includes(q)) ||
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.craftType && p.craftType.toLowerCase().includes(q)) ||
      (p.material && p.material.toLowerCase().includes(q)) ||
      (p.origin && p.origin.toLowerCase().includes(q))
    );
  }

  if (craft && typeof craft === 'string' && craft !== 'All Crafts') {
    const c = craft.toLowerCase();
    list = list.filter(p =>
      (p.craftType && p.craftType.toLowerCase().includes(c)) ||
      (p.craftCategory && p.craftCategory.toLowerCase().includes(c)) ||
      (p.category && p.category.toLowerCase().includes(c))
    );
  }

  if (category && typeof category === 'string' && category !== 'All Categories') {
    const cat = category.toLowerCase();
    list = list.filter(p =>
      (p.category && p.category.toLowerCase().includes(cat)) ||
      (p.craftCategory && p.craftCategory.toLowerCase().includes(cat))
    );
  }

  if (filterState && typeof filterState === 'string' && filterState !== 'All States') {
    const s = filterState.toLowerCase();
    list = list.filter(p => {
      const art = store.artisans.find(a => a.id === p.artisanId);
      return (art && art.state && art.state.toLowerCase().includes(s)) ||
             (p.origin && p.origin.toLowerCase().includes(s));
    });
  }

  if (bracket && typeof bracket === 'string') {
    if (bracket === '1') {
      list = list.filter(p => p.price < 1000);
    } else if (bracket === '2') {
      list = list.filter(p => p.price >= 1000 && p.price <= 5000);
    } else if (bracket === '3') {
      list = list.filter(p => p.price > 5000 && p.price <= 15000);
    } else if (bracket === '4') {
      list = list.filter(p => p.price > 15000);
    }
  }

  if (minPrice) {
    const min = Number(minPrice);
    if (!isNaN(min)) list = list.filter(p => p.price >= min);
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) list = list.filter(p => p.price <= max);
  }

  if (artisanId && typeof artisanId === 'string') {
    list = list.filter(p => matchesArtisanId(p.artisanId, artisanId, (p as any).legacyArtisanId));
  }

  // Enrich with artisan details & backward-compatible aliases
  const enriched = list.map(p => {
    const artisan = store.artisans.find(a => a.id === p.artisanId);
    return {
      ...p,
      pricing: { price: p.price },
      enhancedImage: p.imageUrl || (p.images && p.images[0]) || '',
      artisanName: artisan ? artisan.name : 'Master Artisan',
      artisanLocation: artisan ? artisan.location : p.origin,
      artisanState: artisan ? artisan.state : '',
      artisanCluster: artisan ? artisan.cluster : '',
      artisanPehchanId: artisan ? artisan.pehchanId : '',
      artisanGiCertified: artisan ? artisan.giCertified : true,
      artisanTrustScore: artisan ? artisan.trustScore : 92
    };
  });

  const total = enriched.length;
  let result = enriched;

  if (limit) {
    const lim = Number(limit);
    const pg = page ? Number(page) : 1;
    const offset = (pg - 1) * lim;
    result = enriched.slice(offset, offset + lim);
  }

  res.json({
    success: true,
    total,
    returned: result.length,
    page: page ? Number(page) : 1,
    products: result,
    isDemoData: true
  });
});

/**
 * Get Product by ID
 * GET /api/products/:id
 */
router.get('/products/:id', (req, res) => {
  const p = store.products.find(prod => prod.id === req.params.id);
  if (!p) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  const artisan = store.artisans.find(a => a.id === p.artisanId);
  res.json({
    success: true,
    product: {
      ...p,
      pricing: { price: p.price },
      enhancedImage: p.imageUrl || (p.images && p.images[0]) || '',
      artisanName: artisan ? artisan.name : 'Master Artisan',
      artisanLocation: artisan ? artisan.location : p.origin,
      artisanState: artisan ? artisan.state : '',
      artisanCluster: artisan ? artisan.cluster : '',
      artisanPehchanId: artisan ? artisan.pehchanId : '',
      artisanGiCertified: artisan ? artisan.giCertified : true,
      artisanTrustScore: artisan ? artisan.trustScore : 92
    },
    isDemoData: true
  });
});


/**
 * Get all B2B Buyers with search/filtering
 * GET /api/buyers/all
 */
router.get('/buyers/all', (req, res) => {
  let list = store.buyers;
  const { search, category, city, state: filterState } = req.query;

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(b =>
      b.companyName.toLowerCase().includes(q) ||
      b.authorizedPerson.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      (b.city && b.city.toLowerCase().includes(q))
    );
  }
  if (category && typeof category === 'string') {
    list = list.filter(b => b.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (city && typeof city === 'string') {
    list = list.filter(b => b.city && b.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (filterState && typeof filterState === 'string') {
    list = list.filter(b => b.state && b.state.toLowerCase().includes(filterState.toLowerCase()));
  }

  res.json({
    success: true,
    total: list.length,
    buyers: list,
    isDemoData: true
  });
});

/**
 * Get all B2B Inquiries with filtering
 * GET /api/inquiries
 */
router.get('/inquiries', (req, res) => {
  let list = store.inquiries;
  const { status, artisanId, buyerId } = req.query;

  if (status && typeof status === 'string') {
    list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  if (artisanId && typeof artisanId === 'string') {
    list = list.filter(i => matchesArtisanId(i.artisanId, artisanId, (i as any).legacyArtisanId));
  }
  if (buyerId && typeof buyerId === 'string') {
    list = list.filter(i => i.buyerId === buyerId);
  }

  res.json({
    success: true,
    total: list.length,
    inquiries: list,
    isDemoData: true
  });
});

/**
 * Get Multi-Factor Compatibility Market Matches
 * GET /api/market-matches
 */
router.get('/market-matches', (req, res) => {
  let matches = store.marketMatches || [];
  const { artisanId, buyerId, minScore, limit } = req.query;

  if (artisanId && typeof artisanId === 'string') {
    matches = matches.filter(m => matchesArtisanId(m.artisanId, artisanId, (m as any).legacyArtisanId));
  }
  if (buyerId && typeof buyerId === 'string') {
    matches = matches.filter(m => m.buyerId === buyerId);
  }
  if (minScore) {
    const min = Number(minScore);
    matches = matches.filter(m => m.compatibilityScore >= min);
  }

  const max = limit ? Number(limit) : matches.length;
  const sliced = matches.slice(0, max);

  res.json({
    success: true,
    total: matches.length,
    returned: sliced.length,
    matches: sliced,
    isDemoData: true
  });
});

/**
 * Get Curated SIH Demo Presentation Scenarios
 * GET /api/demo/scenarios
 */
router.get('/demo/scenarios', (req, res) => {
  res.json({
    success: true,
    total: store.scenarios.length,
    scenarios: store.scenarios,
    activeArtisanId: store.artisan.id,
    isDemoData: true
  });
});

/**
 * Helper to universally resolve artisan by id, legacyId, code, or pehchanId
 */
function findArtisanInStore(idOrQuery?: string | null): any {
  if (!idOrQuery) return undefined;
  const q = String(idOrQuery).trim().toLowerCase();

  return store.artisans.find((a: any) => {
    if (a.id && a.id.toLowerCase() === q) return true;
    if (a.legacyId && a.legacyId.toLowerCase() === q) return true;
    if (a.code && a.code.toLowerCase() === q) return true;
    if (a.pehchanId && a.pehchanId.toLowerCase() === q) return true;

    // Normalization: "artisan-1" <-> "artisan-001"
    const numPart = q.replace(/^artisan-|^art-/, '');
    const aNumPart = (a.id || '').replace(/^artisan-|^art-/, '');
    if (parseInt(numPart, 10) === parseInt(aNumPart, 10)) return true;

    return false;
  });
}

/**
 * 1-Click Switch Active Artisan
 * POST /api/demo/switch-artisan
 */
router.post('/demo/switch-artisan', (req, res) => {
  const { artisanId } = req.body;
  const found = findArtisanInStore(artisanId);
  if (!found) {
    return res.status(404).json({ success: false, error: "Artisan not found" });
  }

  store.artisan = found;
  saveStore();

  res.json({
    success: true,
    message: `Active artisan switched to ${found.name} (${found.craft}, ${found.state})`,
    activeArtisan: found,
    isDemoData: true
  });
});

/**
 * 1-Click Switch Demo Scenario
 * POST /api/demo/switch-scenario
 */
router.post('/demo/switch-scenario', (req, res) => {
  const { scenarioId } = req.body;
  const scenario = store.scenarios.find((s: any) => s.id === scenarioId);
  if (!scenario) {
    return res.status(404).json({ success: false, error: "Scenario not found" });
  }

  const artisan = findArtisanInStore(scenario.artisanId);
  if (artisan) {
    store.artisan = artisan;
  }
  saveStore();

  const product = store.products.find((p: any) => p.id === scenario.productId);
  const buyer = store.buyers.find((b: any) => b.id === scenario.buyerId);
  const inquiry = store.inquiries.find((i: any) => i.id === scenario.inquiryId);

  res.json({
    success: true,
    scenario,
    activeArtisan: store.artisan,
    product,
    buyer,
    inquiry,
    isDemoData: true
  });
});

/**
 * Comprehensive Ecosystem Statistics for SIH Judges
 * GET /api/demo/stats
 */
router.get('/demo/stats', (req, res) => {
  const statesSet = new Set(store.artisans.map(a => a.state).filter(Boolean));
  const craftsSet = new Set(store.artisans.map(a => a.craft).filter(Boolean));
  const citiesSet = new Set(store.buyers.map(b => b.city).filter(Boolean));
  
  res.json({
    success: true,
    stats: {
      totalArtisans: store.artisans.length,
      totalProducts: store.products.length,
      totalBuyers: store.buyers.length,
      totalInquiries: store.inquiries.length,
      totalMarketMatches: store.marketMatches ? store.marketMatches.length : 382,
      statesCovered: statesSet.size,
      craftsCovered: craftsSet.size,
      buyerCitiesCovered: citiesSet.size,
      platformGMV: "₹24,80,000",
      activeArtisan: {
        id: store.artisan.id,
        name: store.artisan.name,
        craft: store.artisan.craft,
        location: store.artisan.location,
        state: store.artisan.state
      }
    },
    isDemoData: true
  });
});

/**
 * Helper to build 3-tier profile
 */
function buildArtisanProfile(artisan: any) {
  const matchingProducts = store.products.filter((p: any) => 
    matchesArtisanId(p.artisanId, artisan.id, (p as any).legacyArtisanId || artisan.legacyId)
  );
  const productsToReturn = matchingProducts.length > 0 ? matchingProducts : store.products.slice(0, 3);
  const photo = artisan.photo || artisan.avatarUrl || `/images/avatars/${artisan.id}.svg`;
  const enrichedArtisan = {
    ...artisan,
    photo,
    avatarUrl: photo
  };

  return {
    artisan: enrichedArtisan,
    products: productsToReturn,
    verification: {
      isVerified: true,
      status: "Active Verified Artisan",
      pehchanCardIssuedBy: "Development Commissioner (Handicrafts), Ministry of Textiles, Govt. of India",
      giRegistry: "Controller General of Patents, Designs and Trade Marks (CGPDTM)",
      blockchainHash: "0x89f2a7b1c3e4d567890123456789abcdef0123456789abcdef0123456789abcd",
      verifiedSince: "2018",
      isDemoData: true
    },
    // 3-Tier Separation
    tierSeparation: {
      verified: {
        pehchanId: artisan.pehchanId,
        giRegistrationNo: artisan.giRegistrationNo,
        giCertified: artisan.giCertified,
        cluster: artisan.cluster,
        aadhaarVerified: artisan.aadhaarVerified,
        bankAccountVerified: artisan.bankAccountVerified,
        issuingAuthority: "Ministry of Textiles / CGPDTM Registry",
        verificationDate: "14-Feb-2023",
        status: "VERIFIED_GOVT_RECORD"
      },
      artisanProvided: {
        name: artisan.name,
        craft: artisan.craft,
        experience: artisan.experience,
        location: artisan.location,
        bio: artisan.bio,
        skills: artisan.skills,
        shgMember: artisan.shgMember,
        shgName: artisan.shgName,
        phoneMasked: artisan.phone ? artisan.phone.slice(0, 6) + 'XXXXX' : '+91 98391 XXXXX'
      },
      aiSuggested: {
        recommendedCategories: [artisan.craft, "Handcrafted Sustainable Decor", "B2B Export Quality"],
        marketAlignmentScore: "94/100",
        demandForecast: "High domestic & corporate gifting demand for Q3/Q4 festival season",
        suggestedMinOrderQuantity: 10,
        qualityIndicators: ["100% Authentic Handcrafted", "Natural Materials", "Cluster GI Heritage"]
      }
    },
    // Trust Score Breakdown (92/100)
    trustScore: {
      total: artisan.trustScore || 92,
      max: 100,
      breakdown: [
        { label: "Govt Identity Verification", score: 25, max: 25, status: "Verified (Pehchan ID & Aadhaar KYC)" },
        { label: "Craft & GI Heritage Authenticity", score: 25, max: 25, status: "Verified (CGPDTM GI Tag Registry)" },
        { label: "Cluster & SHG Affiliation", score: 20, max: 20, status: "Verified (Registered Craft Cluster)" },
        { label: "B2B Fulfillment Reliability", score: 22, max: 30, status: "98% on-time sample & bulk order dispatch" }
      ]
    },
    isDemoData: true
  };
}

/**
 * Get active artisan profile
 * GET /api/artisan/profile
 */
router.get('/artisan/profile', (req, res) => {
  res.json(buildArtisanProfile(store.artisan));
});

router.get('/artisan/economics', (req, res) => {
  res.json(store.economics);
});

/**
 * Get specific artisan profile by ID
 * GET /api/artisan/:id
 */
router.get('/artisan/:id', (req, res) => {
  const artisanId = req.params.id;
  const found = findArtisanInStore(artisanId);
  if (!found) {
    return res.status(404).json({ success: false, error: 'Artisan not found' });
  }
  res.json(buildArtisanProfile(found));
});

/**
 * Generate Real QR Code for a Seller with Public-Safe Profile Link
 * GET /api/artisan/:id/qr
 */
router.get('/artisan/:id/qr', async (req, res) => {
  try {
    const artisanId = req.params.id || 'artisan-001';
    const artisan = findArtisanInStore(artisanId) || store.artisan;
    // Always generate public web link targeting frontend port
    const frontendPort = process.env.VITE_PORT || '5173';
    const host = req.get('host')?.split(':')[0] || 'localhost';
    const profileUrl = `http://${host}:${frontendPort}/seller/${artisan.id}`;

    const qrDataUrl = await QRCode.toDataURL(profileUrl, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 400,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });

    res.json({
      artisanId,
      artisanName: artisan.name,
      craft: artisan.craft,
      profileUrl,
      qrDataUrl,
      // Public-safe profile data (no private phone, bank accounts, or unmasked KYC)
      publicSafeProfile: {
        id: artisan.id,
        name: artisan.name,
        craft: artisan.craft,
        location: artisan.location,
        giCertified: artisan.giCertified,
        giRegistrationNo: artisan.giRegistrationNo,
        pehchanId: artisan.pehchanId,
        trustScore: artisan.trustScore,
        rating: artisan.rating,
        reviewCount: artisan.reviewCount,
        verifiedSince: "2018"
      },
      isDemoData: true
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Demo Document Verification Simulation
 * POST /api/artisan/verify-document
 */
router.post('/artisan/verify-document', (req, res) => {
  const { documentType, documentNumber } = req.body;
  const artisan = store.artisan;

  const docTypes: Record<string, any> = {
    pehchan: {
      name: "Ministry of Textiles Pehchan Card",
      extractedId: documentNumber || artisan.pehchanId,
      holderName: artisan.name,
      craft: artisan.craft,
      issuingAuthority: "Development Commissioner (Handicrafts), Govt of India",
      confidence: 0.98,
      status: "VERIFIED"
    },
    gi_certificate: {
      name: "Geographical Indication (GI) Authorized User Certificate",
      extractedId: documentNumber || artisan.giRegistrationNo,
      holderName: artisan.name,
      craft: artisan.craft,
      issuingAuthority: "Controller General of Patents, Designs and Trade Marks (CGPDTM)",
      confidence: 0.96,
      status: "VERIFIED"
    },
    aadhaar: {
      name: "Aadhaar e-KYC (Masked Verification)",
      extractedId: "XXXXXXXX4821",
      holderName: artisan.name,
      issuingAuthority: "UIDAI e-Sign Verification",
      confidence: 0.99,
      status: "VERIFIED"
    },
    shg_certificate: {
      name: "NABARD Self-Help Group (SHG) Certification",
      extractedId: "NABARD-SHG-2021-994",
      holderName: artisan.shgName || "Ganga Jamuna Bunkar Mahila SHG",
      craft: artisan.craft,
      issuingAuthority: "NABARD District Development Office",
      confidence: 0.95,
      status: "VERIFIED"
    }
  };

  const selected = docTypes[documentType] || docTypes.pehchan;

  res.json({
    success: true,
    documentType: selected.name,
    extractedData: selected,
    status: "Demo Verification Successful",
    verificationScore: 95,
    timestamp: new Date().toISOString(),
    notice: "DEMO VERIFICATION: Simulated OCR verification for SIH presentation. Does not connect to live government databases.",
    isDemoData: true
  });
});

/**
 * Submit B2B Inquiry from Buyer
 * POST /api/inquiry/create
 */
router.post('/inquiry/create', (req, res) => {
  const { productId, buyerName, buyerOrg, quantity, timeline, notes } = req.body;
  
  const targetProduct = store.products.find(p => p.id === productId);

  const inquiry = {
    id: `inquiry-${Date.now()}`,
    productId: productId || (targetProduct ? targetProduct.id : "p1"),
    productName: targetProduct ? (targetProduct.titleEn || targetProduct.name) : "Handcrafted Artisan Product",
    buyerName: buyerName || "Verified B2B Buyer",
    buyerOrg: buyerOrg || "Heritage Retail Collective",
    quantity: Number(quantity) || 25,
    timeline: timeline || "3 to 4 weeks",
    notes: notes || "Interested in bulk procurement sample and wholesale pricing tier.",
    status: "received",
    createdAt: new Date().toISOString(),
    isDemoData: true
  };
  
  // Update state
  store.inquiries.unshift(inquiry);
  store.artisan.inquiriesReceived += 1;
  saveStore();
  
  res.status(201).json({
    success: true,
    inquiry,
    message: "B2B Inquiry successfully transmitted to artisan workspace."
  });
});

export default router;
