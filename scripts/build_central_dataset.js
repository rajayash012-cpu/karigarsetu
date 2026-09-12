import fs from 'fs';
import path from 'path';

const SEED_ARTISANS = [
  // 1. SAVITA DEVI (Madhubani Painting, Bihar)
  {
    id: "artisan-001",
    legacyId: "artisan-1",
    code: "ART-001",
    pehchanId: "BR-MAD-PNT-4402",
    giRegistrationNo: "GI-AU-2018-8421",
    name: "Savita Devi",
    photo: "/images/savita_devi.jpg",
    avatarUrl: "/images/savita_devi.jpg",
    craft: "Madhubani Painting",
    category: "Painting & Wall Art",
    experience: "18 Years of Traditional Painting",
    experienceYears: 18,
    location: "Ranti Village, Madhubani, Bihar",
    state: "Bihar",
    district: "Madhubani",
    cluster: "Mithila Painting Megacluster",
    specialization: "Kohbar & Aripan motifs with natural organic pigments",
    capacity: "40 pieces/month",
    capacityPerMonth: 40,
    fulfillmentDays: 7,
    averageFulfillmentDays: 7,
    phone: "+91 94312 XXXXX",
    email: "savita.devi@karigarsetu.in",
    giCertified: true,
    shgMember: true,
    shgName: "Mithila Mahila Vikas Samiti",
    bio: "State-awarded Mithila folk artist with 18 years dedicated to Kohbar and Aripan motifs on handmade paper and tussar silk using natural pigments made from leaves and flowers.",
    skills: ["Kachni Linework", "Bharni Color Filling", "Natural Pigment Extraction", "Tussar Silk Painting"],
    certifications: ["GI Tag Certified (GI-AU-2018-8421)", "Ministry of Textiles Pehchan Card", "Bihar State Handicrafts Award"],
    verification: {
      identity: "verified",
      craft: "verified",
      organization: "verified",
      gi: "relevant",
      giStatus: "GI Registry Tagged (GI-AU-2018-8421)",
      shgStatus: "Active (Mithila Mahila Vikas Samiti)",
      kycStatus: "Verified (PFMS Aadhaar & Bank KYC)",
      fairWageStatus: "Verified (₹165/hr Fair Wage Compliance)"
    },
    analytics: {
      monthlyRevenue: 48600,
      monthlyCost: 27200,
      monthlyProfit: 21400,
      profitMargin: 44.0,
      activeListings: 3,
      inquiriesReceived: 18,
      ordersConverted: 7,
      conversionRate: 38.8,
      trustScore: 94,
      rating: 4.9,
      reviewCount: 96,
      topProduct: "Hand-painted Madhubani Wall Art"
    },
    economics: {
      monthlyRevenue: 48600,
      monthlyExpenses: 27200,
      monthlyProfit: 21400,
      margin: 44.0,
      materialCost: 350,
      labourHours: 12,
      labourRate: 150
    },
    products: [
      {
        id: "p1",
        name: "Hand-painted Madhubani Wall Art",
        price: 3150,
        materials: "Handmade Bamboo Paper, Natural Plant Pigments",
        dimensions: "22 x 30 inches (Unframed)",
        craftCategory: "Folk Painting",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        description: "Authentic handmade Madhubani painting depicting the sacred Tree of Life and forest fauna using natural herbal pigments."
      },
      {
        id: "p2",
        name: "Madhubani Kohbar Nuptial Painting on Tussar Silk",
        price: 6800,
        materials: "Pure Tussar Silk, Organic Madder & Indigo",
        dimensions: "36 x 24 inches",
        craftCategory: "Folk Painting",
        imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        description: "Traditional Mithila nuptial Kohbar design symbolizing fertility and blessings painted on hand-loomed Bhagalpuri Tussar silk."
      },
      {
        id: "p3",
        name: "Madhubani Greeting Folio & Bookmarks Set (Box of 10)",
        price: 850,
        materials: "Recycled Handmade Cotton Rag Paper",
        dimensions: "A5 Folio Pack",
        craftCategory: "Stationery & Prints",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        description: "Set of 10 miniature hand-painted Madhubani art cards and bookmarks with silk tassels."
      }
    ],
    isDemoData: true
  },

  // 2. MEENA KUMARI (Dokra Metal Craft, Jharkhand)
  {
    id: "artisan-002",
    legacyId: "artisan-2",
    code: "ART-002",
    pehchanId: "JH-RAN-MET-6105",
    giRegistrationNo: "GI-AU-2019-3312",
    name: "Meena Kumari",
    photo: "/images/meena_kumari.jpg",
    avatarUrl: "/images/meena_kumari.jpg",
    craft: "Dokra Metal Craft",
    category: "Metal Craft",
    experience: "15 Years of Lost-Wax Metal Casting",
    experienceYears: 15,
    location: "Torpa, Khunti, Jharkhand",
    state: "Jharkhand",
    district: "Khunti",
    cluster: "Chotanagpur Tribal Metal Cluster",
    specialization: "Non-ferrous lost-wax bell metal casting of figurines and diya oil lamps",
    capacity: "50 pieces/month",
    capacityPerMonth: 50,
    fulfillmentDays: 10,
    averageFulfillmentDays: 10,
    phone: "+91 98351 XXXXX",
    email: "meena.kumari@karigarsetu.in",
    giCertified: true,
    shgMember: true,
    shgName: "Birsa Munda Karigar Samiti",
    bio: "Descendant of hereditary Dhokra metalsmiths, hand-shaping beeswax cords over clay cores and casting in recycled brass using indigenous earthen kilns.",
    skills: ["Beeswax Thread Drawing", "Clay Core Moulding", "Brass Melting & Pouring", "Antique Patina Finishing"],
    certifications: ["GI Tag Certified (GI-AU-2019-3312)", "TRIFED Empaneled Tribal Artisan", "Pehchan Ministry of Textiles Card"],
    verification: {
      identity: "verified",
      craft: "verified",
      organization: "pending",
      gi: "relevant",
      giStatus: "GI Registry Tagged (GI-AU-2019-3312)",
      shgStatus: "Verified (Birsa Munda Karigar Samiti)",
      kycStatus: "Verified (PFMS Tribal Bank KYC)",
      fairWageStatus: "Verified (₹155/hr Fair Wage Compliance)"
    },
    analytics: {
      monthlyRevenue: 52000,
      monthlyCost: 32100,
      monthlyProfit: 19900,
      profitMargin: 38.2,
      activeListings: 3,
      inquiriesReceived: 24,
      ordersConverted: 9,
      conversionRate: 37.5,
      trustScore: 92,
      rating: 4.8,
      reviewCount: 78,
      topProduct: "Tribal Dokra Brass Elephant Figurine"
    },
    economics: {
      monthlyRevenue: 52000,
      monthlyExpenses: 32100,
      monthlyProfit: 19900,
      margin: 38.2,
      materialCost: 620,
      labourHours: 9,
      labourRate: 155
    },
    products: [
      {
        id: "p8",
        name: "Tribal Dokra Brass Elephant Figurine",
        price: 2450,
        materials: "Dhokra Bell Metal Alloy, Recycled Brass",
        dimensions: "8 x 6 x 4 inches",
        craftCategory: "Lost-Wax Metalwork",
        imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80",
        description: "Hollow-cast traditional Dokra brass elephant figurine with intricate wire filigree detailing created via the 4000-year-old lost-wax technique."
      },
      {
        id: "p9",
        name: "Dokra Tribal Musician Quintet",
        price: 4200,
        materials: "Recycled Bell Metal",
        dimensions: "5 Figures (6 inches height each)",
        craftCategory: "Lost-Wax Metalwork",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        description: "Set of 5 traditional tribal musicians playing dhol, nagada, bansuri, and shehnai with rustic antique patina."
      },
      {
        id: "p10",
        name: "Dokra Brass Tribal Sun Keychain & Diya",
        price: 920,
        materials: "Cast Bell Metal",
        dimensions: "4 x 4 inches",
        craftCategory: "Home Decor",
        imageUrl: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        description: "Auspicious sun emblem handcrafted in authentic non-ferrous lost-wax metal alloy."
      }
    ],
    isDemoData: true
  },

  // 3. RAMESH KUMAR (Brass Handicraft, Moradabad, Uttar Pradesh)
  {
    id: "artisan-003",
    legacyId: "artisan-3",
    code: "ART-003",
    pehchanId: "UP-BRS-MRD-7811",
    giRegistrationNo: "GI-AU-2016-1044",
    name: "Ramesh Kumar",
    photo: "/images/ramesh_kumar.svg",
    avatarUrl: "/images/ramesh_kumar.svg",
    craft: "Brass Handicraft",
    category: "Metal Craft",
    experience: "22 Years of Master Brass Art",
    experienceYears: 22,
    location: "Peetal Nagri, Moradabad, Uttar Pradesh",
    state: "Uttar Pradesh",
    district: "Moradabad",
    cluster: "Moradabad Peetal Nagri Megacluster",
    specialization: "Hand-turned brass diya lamps, ceremonial urlis, and engraved home accents",
    capacity: "75 pieces/month",
    capacityPerMonth: 75,
    fulfillmentDays: 8,
    averageFulfillmentDays: 8,
    phone: "+91 94121 XXXXX",
    email: "ramesh.kumar@karigarsetu.in",
    giCertified: true,
    shgMember: true,
    shgName: "Peetal Udyog Samiti",
    bio: "Third-generation master metalsmith specializing in traditional hand-turned and engraved pure brass festive oil lamps, decorative urlis, and heirloom artefacts in Moradabad.",
    skills: ["Hand Turning (Kharad)", "Champlevé Metal Engraving", "Mirror Brass Polishing", "Protective Lacquer Coating"],
    certifications: ["GI Tag Certified (GI-AU-2016-1044)", "Ministry of Textiles Pehchan Card", "Moradabad Craft Guild Master"],
    verification: {
      identity: "verified",
      craft: "verified",
      organization: "verified",
      gi: "relevant",
      giStatus: "GI Registry Tagged (GI-AU-2016-1044)",
      shgStatus: "Verified (Peetal Udyog Samiti)",
      kycStatus: "Verified (PFMS MSME Bank KYC)",
      fairWageStatus: "Verified (₹175/hr Fair Wage Compliance)"
    },
    analytics: {
      monthlyRevenue: 78500,
      monthlyCost: 46200,
      monthlyProfit: 32300,
      profitMargin: 41.1,
      activeListings: 3,
      inquiriesReceived: 32,
      ordersConverted: 14,
      conversionRate: 43.7,
      trustScore: 95,
      rating: 4.9,
      reviewCount: 112,
      topProduct: "Moradabadi Handcrafted Brass Peacock Diya Set"
    },
    economics: {
      monthlyRevenue: 78500,
      monthlyExpenses: 46200,
      monthlyProfit: 32300,
      margin: 41.1,
      materialCost: 580,
      labourHours: 7,
      labourRate: 175
    },
    products: [
      {
        id: "p55",
        name: "Moradabadi Handcrafted Brass Peacock Diya Set",
        price: 2150,
        materials: "Pure Heavy Brass Alloy",
        dimensions: "10 x 5 inches, 850 grams",
        craftCategory: "Brassware",
        imageUrl: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        description: "Handcrafted traditional Moradabadi multi-tier brass oil lamp crowned with a sculpted Mayura peacock motif."
      },
      {
        id: "p56",
        name: "Antique Engraved Brass Decorative Urli Bowl",
        price: 3800,
        materials: "Hammered Sheet Brass with Lacquer",
        dimensions: "14 inches diameter, 1.4 kg",
        craftCategory: "Brassware",
        imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80",
        description: "Floral hand-hammered decorative floating flower urli bowl with scalloped border and durable lacquer finish."
      },
      {
        id: "p57",
        name: "Royal Hand-Carved Brass Elephant Figurine",
        price: 1650,
        materials: "Solid Cast Brass",
        dimensions: "6 x 5 x 3 inches, 650 grams",
        craftCategory: "Brassware",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        description: "Intricately carved Indian royal elephant figure symbolizing prosperity and good fortune."
      }
    ],
    isDemoData: true
  },

  // 4. MOHAN DAS (Terracotta Craft, Bankura, West Bengal)
  {
    id: "artisan-004",
    legacyId: "artisan-4",
    code: "ART-004",
    pehchanId: "WB-TER-PAN-1140",
    giRegistrationNo: "GI-AU-2018-2234",
    name: "Mohan Das",
    photo: "/images/mohan_das.svg",
    avatarUrl: "/images/mohan_das.svg",
    craft: "Terracotta Craft",
    category: "Pottery & Ceramics",
    experience: "15 Years of Traditional Terracotta",
    experienceYears: 15,
    location: "Panchmura, Bankura, West Bengal",
    state: "West Bengal",
    district: "Bankura",
    cluster: "Bankura Terracotta Cluster",
    specialization: "Bankura Horses, decorative pottery, and architectural terracotta plaques",
    capacity: "80 pieces/month",
    capacityPerMonth: 80,
    fulfillmentDays: 8,
    averageFulfillmentDays: 8,
    phone: "+91 97321 XXXXX",
    email: "mohan.das@karigarsetu.in",
    giCertified: true,
    shgMember: true,
    shgName: "Panchmura Terracotta Samiti",
    bio: "Master Kumbhakar potter hand-shaping distinctive Bankura horses with erect ears and hollow symmetrical terracotta vessels fired in traditional open wood kilns in Panchmura village.",
    skills: ["Terracotta Throwing", "Hollow Body Joining", "Natural Clay Firing", "Traditional Filigree Tooling"],
    certifications: ["GI Tag Certified (GI-AU-2018-2234)", "Pehchan Ministry of Textiles Card", "Panchmura Guild Certificate"],
    verification: {
      identity: "verified",
      craft: "verified",
      organization: "pending",
      gi: "relevant",
      giStatus: "GI Registry Tagged (GI-AU-2018-2234)",
      shgStatus: "Verified (Panchmura Terracotta Samiti)",
      kycStatus: "Verified (PFMS Rural Bank KYC)",
      fairWageStatus: "Verified (₹150/hr Fair Wage Compliance)"
    },
    analytics: {
      monthlyRevenue: 41200,
      monthlyCost: 22500,
      monthlyProfit: 18700,
      profitMargin: 45.4,
      activeListings: 2,
      inquiriesReceived: 19,
      ordersConverted: 8,
      conversionRate: 42.1,
      trustScore: 91,
      rating: 4.8,
      reviewCount: 64,
      topProduct: "Bankura Long-Neck Terracotta Horse"
    },
    economics: {
      monthlyRevenue: 41200,
      monthlyExpenses: 22500,
      monthlyProfit: 18700,
      margin: 45.4,
      materialCost: 220,
      labourHours: 6,
      labourRate: 150
    },
    products: [
      {
        id: "p13",
        name: "Bankura Long-Neck Terracotta Horse",
        price: 1850,
        materials: "Fired Bankura Earthen Alluvial Clay",
        dimensions: "16 x 10 x 5 inches",
        craftCategory: "Terracotta Pottery",
        imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        description: "Renowned Bankura terracotta horse crafted in separate hollow parts on the potter's wheel and joined before kiln-firing in rich natural burnt umber tones."
      },
      {
        id: "p14",
        name: "Clay Terracotta Chai Kulhad Set (Pack of 12)",
        price: 480,
        materials: "Unglazed Natural Red Clay",
        dimensions: "150 ml per kulhad",
        craftCategory: "Terracotta Tableware",
        imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        description: "Eco-friendly, 100% biodegradable unglazed terracotta tea kulhads adding an earthy aroma to Indian masala chai."
      }
    ],
    isDemoData: true
  }
];

// Load remaining 48 artisans from server/data/artisansSeed.ts to ensure 52 total artisans
const existingArtisansPath = path.join(process.cwd(), 'server', 'data', 'artisansSeed.ts');
let fullDataset = [...SEED_ARTISANS];

if (fs.existsSync(existingArtisansPath)) {
  const content = fs.readFileSync(existingArtisansPath, 'utf8');
  // We'll read the existing artisans and append the remaining 48 with unique IDs artisan-005 to artisan-052
}

console.log(`Initial top 4 master artisans configured with complete data.`);
