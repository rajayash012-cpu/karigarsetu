/**
 * CENTRAL ARTISAN DATASET — SINGLE SOURCE OF TRUTH
 * KarigarSetu Platform Architecture
 * 
 * Every artisan has:
 * - Unique ID (artisan-001, artisan-002, etc.)
 * - Code (ART-001, ART-002, etc.)
 * - Legacy ID (artisan-1, artisan-2, etc.)
 * - Pehchan ID (Govt of India Ministry of Textiles)
 * - Dedicated photo asset (never shared or fallback to another artisan)
 * - Distinct verification, analytics, products, and economics
 */

export interface CentralArtisan {
  id: string;
  legacyId: string;
  code: string;
  pehchanId: string;
  giRegistrationNo: string;
  name: string;
  photo: string;
  avatarUrl: string;
  craft: string;
  category: string;
  location: string;
  state: string;
  district: string;
  cluster: string;
  specialization: string;
  experience: string;
  experienceYears: number;
  capacity: string;
  capacityPerMonth: number;
  fulfillmentDays: number;
  averageFulfillmentDays: number;
  phone: string;
  email: string;
  bio: string;
  skills: string[];
  certifications: string[];
  giCertified: boolean;
  shgMember: boolean;
  shgName?: string;
  verification: {
    identity: string;
    craft: string;
    organization: string;
    gi: string;
    giStatus: string;
    shgStatus: string;
    kycStatus: string;
    fairWageStatus: string;
    details: string;
  };
  analytics: {
    monthlyRevenue: number;
    monthlyCost: number;
    monthlyProfit: number;
    profitMargin: number;
    activeListings: number;
    inquiriesReceived: number;
    ordersConverted: number;
    conversionRate: number;
    trustScore: number;
    rating: number;
    reviewCount: number;
    topProduct: string;
  };
  products: {
    id: string;
    name: string;
    price: number;
    materials: string;
    dimensions: string;
    craftCategory: string;
    imageUrl: string;
    description: string;
  }[];
  economics: {
    monthlyRevenue: number;
    monthlyExpenses: number;
    monthlyProfit: number;
    margin: number;
    materialCost: number;
    labourHours: number;
    labourRate: number;
  };
  isDemoData: boolean;
}

export const CENTRAL_ARTISANS: CentralArtisan[] = [
  {
    "id": "artisan-001",
    "legacyId": "artisan-1",
    "code": "ART-001",
    "pehchanId": "BR-MAD-PNT-4402",
    "giRegistrationNo": "GI-AU-2018-8421",
    "name": "Savita Devi",
    "photo": "/images/savita_devi.jpg",
    "avatarUrl": "/images/savita_devi.jpg",
    "craft": "Madhubani Painting",
    "category": "Painting & Wall Art",
    "location": "Ranti Village, Madhubani, Bihar",
    "state": "Bihar",
    "district": "Madhubani",
    "cluster": "Mithila Painting Megacluster",
    "specialization": "Kohbar & Aripan motifs with natural organic pigments",
    "experience": "18 Years of Traditional Painting",
    "experienceYears": 18,
    "capacity": "40 pieces/month",
    "capacityPerMonth": 40,
    "fulfillmentDays": 7,
    "averageFulfillmentDays": 7,
    "phone": "+91 94312 XXXXX",
    "email": "savita.devi@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Mithila Mahila Vikas Samiti",
    "bio": "State-awarded Mithila folk artist with 18 years dedicated to Kohbar and Aripan motifs on handmade paper and tussar silk using natural pigments made from leaves and flowers.",
    "skills": [
      "Kachni Linework",
      "Bharni Color Filling",
      "Natural Pigment Extraction",
      "Tussar Silk Painting"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2018-8421)",
      "Ministry of Textiles Pehchan Card",
      "Bihar State Handicrafts Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2018-8421)",
      "shgStatus": "Active (Mithila Mahila Vikas Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar & Bank KYC)",
      "fairWageStatus": "Verified (₹165/hr Fair Wage Compliance)",
      "details": "Official Ministry of Textiles Pehchan ID & CGPDTM GI Tag Registry Verified"
    },
    "analytics": {
      "monthlyRevenue": 48600,
      "monthlyCost": 27200,
      "monthlyProfit": 21400,
      "profitMargin": 44,
      "activeListings": 3,
      "inquiriesReceived": 18,
      "ordersConverted": 7,
      "conversionRate": 38.8,
      "trustScore": 94,
      "rating": 4.9,
      "reviewCount": 96,
      "topProduct": "Hand-painted Madhubani Wall Art"
    },
    "economics": {
      "monthlyRevenue": 48600,
      "monthlyExpenses": 27200,
      "monthlyProfit": 21400,
      "margin": 44,
      "materialCost": 350,
      "labourHours": 12,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p1",
        "name": "Hand-painted Madhubani Wall Art",
        "price": 3150,
        "materials": "Handmade Bamboo Paper, Natural Plant Pigments",
        "dimensions": "22 x 30 inches (Unframed)",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "description": "Authentic handmade Madhubani painting depicting the sacred Tree of Life and harmonious forest fauna."
      },
      {
        "id": "p2",
        "name": "Madhubani Kohbar Nuptial Painting on Tussar Silk",
        "price": 6800,
        "materials": "Pure Tussar Silk, Organic Madder & Indigo",
        "dimensions": "36 x 24 inches",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional Mithila nuptial Kohbar design symbolizing fertility and blessings painted on hand-loomed Tussar silk."
      },
      {
        "id": "p3",
        "name": "Madhubani Greeting Folio & Bookmarks Set (Box of 10)",
        "price": 850,
        "materials": "Recycled Handmade Cotton Rag Paper",
        "dimensions": "A5 Folio Pack",
        "craftCategory": "Stationery & Prints",
        "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 10 miniature hand-painted Madhubani art cards and bookmarks with silk tassels."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-002",
    "legacyId": "artisan-2",
    "code": "ART-002",
    "pehchanId": "JH-RAN-MET-6105",
    "giRegistrationNo": "GI-AU-2019-3312",
    "name": "Meena Kumari",
    "photo": "/images/meena_kumari.jpg",
    "avatarUrl": "/images/meena_kumari.jpg",
    "craft": "Dokra Metal Craft",
    "category": "Metal Craft",
    "location": "Torpa, Khunti, Jharkhand",
    "state": "Jharkhand",
    "district": "Khunti",
    "cluster": "Chotanagpur Tribal Metal Cluster",
    "specialization": "Non-ferrous lost-wax bell metal casting of figurines and diya oil lamps",
    "experience": "15 Years of Lost-Wax Metal Casting",
    "experienceYears": 15,
    "capacity": "50 pieces/month",
    "capacityPerMonth": 50,
    "fulfillmentDays": 10,
    "averageFulfillmentDays": 10,
    "phone": "+91 98351 XXXXX",
    "email": "meena.kumari@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Birsa Munda Karigar Samiti",
    "bio": "Hereditary Dokra metalsmith handcrafting beeswax thread models over clay cores and casting in recycled brass bell metal using indigenous charcoal pit kilns.",
    "skills": [
      "Beeswax Thread Drawing",
      "Clay Core Moulding",
      "Brass Melting & Pouring",
      "Antique Patina Finishing"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2019-3312)",
      "TRIFED Empaneled Tribal Artisan",
      "Pehchan Ministry of Textiles Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2019-3312)",
      "shgStatus": "Verified (Birsa Munda Karigar Samiti)",
      "kycStatus": "Verified (PFMS Tribal Bank KYC)",
      "fairWageStatus": "Verified (₹155/hr Fair Wage Compliance)",
      "details": "Certified GI Tagged Tribal Metal Artisan under Development Commissioner (Handicrafts)"
    },
    "analytics": {
      "monthlyRevenue": 52000,
      "monthlyCost": 32100,
      "monthlyProfit": 19900,
      "profitMargin": 38.2,
      "activeListings": 3,
      "inquiriesReceived": 24,
      "ordersConverted": 9,
      "conversionRate": 37.5,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 78,
      "topProduct": "Tribal Dokra Brass Elephant Figurine"
    },
    "economics": {
      "monthlyRevenue": 52000,
      "monthlyExpenses": 32100,
      "monthlyProfit": 19900,
      "margin": 38.2,
      "materialCost": 620,
      "labourHours": 9,
      "labourRate": 155
    },
    "products": [
      {
        "id": "p8",
        "name": "Tribal Dokra Brass Elephant Figurine",
        "price": 2450,
        "materials": "Dhokra Bell Metal Alloy, Recycled Brass",
        "dimensions": "8 x 6 x 4 inches",
        "craftCategory": "Lost-Wax Metalwork",
        "imageUrl": "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80",
        "description": "Hollow-cast traditional Dokra brass elephant figurine with intricate wire filigree detailing created via the 4000-year-old lost-wax technique."
      },
      {
        "id": "p9",
        "name": "Dokra Tribal Musician Quintet",
        "price": 4200,
        "materials": "Recycled Bell Metal",
        "dimensions": "5 Figures (6 inches height each)",
        "craftCategory": "Lost-Wax Metalwork",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 5 traditional tribal musicians playing dhol, nagada, bansuri, and shehnai with rustic antique patina."
      },
      {
        "id": "p10",
        "name": "Dokra Brass Tribal Sun Keychain & Diya",
        "price": 920,
        "materials": "Cast Bell Metal",
        "dimensions": "4 x 4 inches",
        "craftCategory": "Home Decor",
        "imageUrl": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        "description": "Auspicious sun emblem handcrafted in authentic non-ferrous lost-wax metal alloy."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-003",
    "legacyId": "artisan-3",
    "code": "ART-003",
    "pehchanId": "UP-BRS-MRD-7811",
    "giRegistrationNo": "GI-AU-2016-1044",
    "name": "Ramesh Kumar",
    "photo": "/images/ramesh_kumar.svg",
    "avatarUrl": "/images/ramesh_kumar.svg",
    "craft": "Brass Handicraft",
    "category": "Metal Craft",
    "location": "Peetal Nagri, Moradabad, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "district": "Moradabad",
    "cluster": "Moradabad Peetal Nagri Megacluster",
    "specialization": "Hand-turned brass diya lamps, ceremonial urlis, and engraved home accents",
    "experience": "22 Years of Master Brass Art",
    "experienceYears": 22,
    "capacity": "75 pieces/month",
    "capacityPerMonth": 75,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 94121 XXXXX",
    "email": "ramesh.kumar@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Peetal Udyog Samiti",
    "bio": "Third-generation master metalsmith specializing in traditional hand-turned and engraved pure brass festive oil lamps, decorative urlis, and heirloom artefacts in Moradabad.",
    "skills": [
      "Hand Turning (Kharad)",
      "Champlevé Metal Engraving",
      "Mirror Brass Polishing",
      "Protective Lacquer Coating"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2016-1044)",
      "Ministry of Textiles Pehchan Card",
      "Moradabad Craft Guild Master"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2016-1044)",
      "shgStatus": "Verified (Peetal Udyog Samiti)",
      "kycStatus": "Verified (PFMS MSME Bank KYC)",
      "fairWageStatus": "Verified (₹175/hr Fair Wage Compliance)",
      "details": "State Handicrafts Department Registered Master Metal Craftsperson"
    },
    "analytics": {
      "monthlyRevenue": 78500,
      "monthlyCost": 46200,
      "monthlyProfit": 32300,
      "profitMargin": 41.1,
      "activeListings": 3,
      "inquiriesReceived": 32,
      "ordersConverted": 14,
      "conversionRate": 43.7,
      "trustScore": 95,
      "rating": 4.9,
      "reviewCount": 112,
      "topProduct": "Moradabadi Handcrafted Brass Peacock Diya Set"
    },
    "economics": {
      "monthlyRevenue": 78500,
      "monthlyExpenses": 46200,
      "monthlyProfit": 32300,
      "margin": 41.1,
      "materialCost": 580,
      "labourHours": 7,
      "labourRate": 175
    },
    "products": [
      {
        "id": "p55",
        "name": "Moradabadi Handcrafted Brass Peacock Diya Set",
        "price": 2150,
        "materials": "Pure Heavy Brass Alloy",
        "dimensions": "10 x 5 inches, 850 grams",
        "craftCategory": "Brassware",
        "imageUrl": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        "description": "Handcrafted traditional Moradabadi multi-tier brass oil lamp crowned with a sculpted Mayura peacock motif."
      },
      {
        "id": "p56",
        "name": "Antique Engraved Brass Decorative Urli Bowl",
        "price": 3800,
        "materials": "Hammered Sheet Brass with Lacquer",
        "dimensions": "14 inches diameter, 1.4 kg",
        "craftCategory": "Brassware",
        "imageUrl": "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=800&q=80",
        "description": "Floral hand-hammered decorative floating flower urli bowl with scalloped border and durable lacquer finish."
      },
      {
        "id": "p57",
        "name": "Royal Hand-Carved Brass Elephant Figurine",
        "price": 1650,
        "materials": "Solid Cast Brass",
        "dimensions": "6 x 5 x 3 inches, 650 grams",
        "craftCategory": "Brassware",
        "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "description": "Intricately carved Indian royal elephant figure symbolizing prosperity and good fortune."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-004",
    "legacyId": "artisan-4",
    "code": "ART-004",
    "pehchanId": "WB-TER-PAN-1140",
    "giRegistrationNo": "GI-AU-2018-2234",
    "name": "Mohan Das",
    "photo": "/images/mohan_das.svg",
    "avatarUrl": "/images/mohan_das.svg",
    "craft": "Terracotta Craft",
    "category": "Pottery & Ceramics",
    "location": "Panchmura, Bankura, West Bengal",
    "state": "West Bengal",
    "district": "Bankura",
    "cluster": "Bankura Terracotta Cluster",
    "specialization": "Bankura Horses, decorative pottery, and architectural terracotta plaques",
    "experience": "15 Years of Traditional Terracotta",
    "experienceYears": 15,
    "capacity": "80 pieces/month",
    "capacityPerMonth": 80,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 97321 XXXXX",
    "email": "mohan.das@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Panchmura Terracotta Samiti",
    "bio": "Master Kumbhakar potter hand-shaping distinctive Bankura horses with erect ears and hollow symmetrical terracotta vessels fired in traditional open wood kilns in Panchmura village.",
    "skills": [
      "Terracotta Throwing",
      "Hollow Body Joining",
      "Natural Clay Firing",
      "Traditional Filigree Tooling"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2018-2234)",
      "Pehchan Ministry of Textiles Card",
      "Panchmura Guild Certificate"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2018-2234)",
      "shgStatus": "Verified (Panchmura Terracotta Samiti)",
      "kycStatus": "Verified (PFMS Rural Bank KYC)",
      "fairWageStatus": "Verified (₹150/hr Fair Wage Compliance)",
      "details": "Panchmura Kumbhakar Society Master Craftsman with Active PFMS e-KYC"
    },
    "analytics": {
      "monthlyRevenue": 41200,
      "monthlyCost": 22500,
      "monthlyProfit": 18700,
      "profitMargin": 45.4,
      "activeListings": 2,
      "inquiriesReceived": 19,
      "ordersConverted": 8,
      "conversionRate": 42.1,
      "trustScore": 91,
      "rating": 4.8,
      "reviewCount": 64,
      "topProduct": "Bankura Long-Neck Terracotta Horse"
    },
    "economics": {
      "monthlyRevenue": 41200,
      "monthlyExpenses": 22500,
      "monthlyProfit": 18700,
      "margin": 45.4,
      "materialCost": 220,
      "labourHours": 6,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p13",
        "name": "Bankura Long-Neck Terracotta Horse",
        "price": 1850,
        "materials": "Fired Bankura Earthen Alluvial Clay",
        "dimensions": "16 x 10 x 5 inches",
        "craftCategory": "Terracotta Pottery",
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "description": "Renowned Bankura terracotta horse crafted in separate hollow parts on the potter's wheel and joined before kiln-firing in rich natural burnt umber tones."
      },
      {
        "id": "p14",
        "name": "Clay Terracotta Chai Kulhad Set (Pack of 12)",
        "price": 480,
        "materials": "Unglazed Natural Red Clay",
        "dimensions": "150 ml per kulhad",
        "craftCategory": "Terracotta Tableware",
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "description": "Eco-friendly, 100% biodegradable unglazed terracotta tea kulhads adding an earthy aroma to Indian masala chai."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-005",
    "legacyId": "artisan-5",
    "code": "ART-005",
    "pehchanId": "BR-DAR-SIK-1029",
    "giRegistrationNo": "GI-AU-2020-5512",
    "name": "Sanjay Prasad",
    "photo": "/images/avatars/artisan-2.svg",
    "avatarUrl": "/images/avatars/artisan-2.svg",
    "craft": "Sikki Grass Craft",
    "category": "Basketry & Natural Fiber",
    "location": "Raiyam, Darbhanga, Bihar",
    "state": "Bihar",
    "district": "Darbhanga",
    "cluster": "North Bihar Sikki Craft Cluster",
    "specialization": "Golden grass boxes, storage baskets, and decorative toys",
    "experience": "14 Years of Golden Grass Weaving",
    "experienceYears": 14,
    "capacity": "60 pieces/month",
    "capacityPerMonth": 60,
    "fulfillmentDays": 10,
    "averageFulfillmentDays": 10,
    "phone": "+91 94301 XXXXX",
    "email": "sanjay.prasad@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Kalyani Gramin SHG",
    "bio": "Weaves lightweight, sturdy natural home accents from moisture-resistant golden Sikki grass collected along riverside wetlands.",
    "skills": [
      "Grass Splitting",
      "Coiling Technique",
      "Natural Dyeing",
      "Structural Reinforcement"
    ],
    "certifications": [
      "Sikki Grass GI Registered Artisan",
      "Development Commissioner (Handicrafts) Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2020-5512)",
      "shgStatus": "Active (Kalyani Gramin SHG)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 34000,
      "monthlyCost": 20400,
      "monthlyProfit": 13600,
      "profitMargin": 42,
      "activeListings": 2,
      "inquiriesReceived": 12,
      "ordersConverted": 5,
      "conversionRate": 40,
      "trustScore": 90,
      "rating": 4.8,
      "reviewCount": 42,
      "topProduct": "Golden Sikki Grass Decorative Pauti Box"
    },
    "economics": {
      "monthlyRevenue": 34000,
      "monthlyExpenses": 20400,
      "monthlyProfit": 13600,
      "margin": 42,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p4",
        "name": "Golden Sikki Grass Decorative Pauti Box",
        "price": 1250,
        "materials": "Sikki Golden Grass, Munj Grass",
        "dimensions": "8 x 8 x 6 inches",
        "craftCategory": "Natural Fibre & Grass",
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional golden grass keepsake lidded box known as Pauti, dyed with organic madder and turmeric accents. Sturdy, moisture resistant, and naturally golden."
      },
      {
        "id": "p5",
        "name": "Sikki Grass Round Coasters Set with Holder",
        "price": 480,
        "materials": "100% Biodegradable Sikki Grass",
        "dimensions": "4.5 inches diameter each",
        "craftCategory": "Natural Fibre & Grass",
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "description": "Heat-resistant dining coasters hand-braided from wetland golden grass with vibrant coloured concentric rings. Comes with a matching woven holder."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-006",
    "legacyId": "artisan-6",
    "code": "ART-006",
    "pehchanId": "BR-PAT-APP-3319",
    "giRegistrationNo": "GI-AU-2017-9011",
    "name": "Geeta Kumari",
    "photo": "/images/avatars/artisan-3.svg",
    "avatarUrl": "/images/avatars/artisan-3.svg",
    "craft": "Khatwa Applique Craft",
    "category": "Hand Embroidery",
    "location": "Danapur, Patna, Bihar",
    "state": "Bihar",
    "district": "Patna",
    "cluster": "Magadh Textile Craft Cluster",
    "specialization": "Cut-work fabric applique panels and festive wall hangings",
    "experience": "11 Years of Applique Work",
    "experienceYears": 11,
    "capacity": "50 pieces/month",
    "capacityPerMonth": 50,
    "fulfillmentDays": 12,
    "averageFulfillmentDays": 12,
    "phone": "+91 94314 XXXXX",
    "email": "geeta.kumari@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Ujala Mahila Mandal",
    "bio": "Pioneering contemporary Khatwa cut-work motifs blended with organic cotton textiles for boutique interiors.",
    "skills": [
      "Precision Fabric Cutting",
      "Concealed Hemming",
      "Geometric Patterning",
      "Contrast Layering"
    ],
    "certifications": [
      "Applique Craftmark Certified",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2017-9011)",
      "shgStatus": "Active (Ujala Mahila Mandal)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 28500,
      "monthlyCost": 17100,
      "monthlyProfit": 11400,
      "profitMargin": 38.5,
      "activeListings": 2,
      "inquiriesReceived": 10,
      "ordersConverted": 4,
      "conversionRate": 40,
      "trustScore": 88,
      "rating": 4.7,
      "reviewCount": 35,
      "topProduct": "Khatwa Applique Hand-Stitched Cushion Covers"
    },
    "economics": {
      "monthlyRevenue": 28500,
      "monthlyExpenses": 17100,
      "monthlyProfit": 11400,
      "margin": 38.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p6",
        "name": "Khatwa Applique Hand-Stitched Cushion Covers",
        "price": 1450,
        "materials": "Handloom Cotton Fabric",
        "dimensions": "16 x 16 inches (Pair)",
        "craftCategory": "Applique & Quilting",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Geometric and elephant motif applique cushion covers hand-stitched by rural women artisans. Features concealed YKK zipper closure and pre-shrunk cotton fabric."
      },
      {
        "id": "p7",
        "name": "Khatwa Patchwork Bed Runner",
        "price": 3200,
        "materials": "Cotton Slub, Natural Indigo Dyes",
        "dimensions": "18 x 90 inches",
        "craftCategory": "Applique & Quilting",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Artisanal bed runner featuring heritage tree-of-life cutout silhouettes layered over raw handloom cotton. Designed for luxury hotel suites and boutique bedrooms."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-007",
    "legacyId": "artisan-7",
    "code": "ART-007",
    "pehchanId": "JH-HAZ-MUR-7721",
    "giRegistrationNo": "GI-AU-2020-8844",
    "name": "Budhram Soren",
    "photo": "/images/avatars/artisan-5.svg",
    "avatarUrl": "/images/avatars/artisan-5.svg",
    "craft": "Sohrai & Khovar Painting",
    "category": "Painting & Wall Art",
    "location": "Bhelwara, Hazaribagh, Jharkhand",
    "state": "Jharkhand",
    "district": "Hazaribagh",
    "cluster": "Hazaribagh Indigenous Art Cluster",
    "specialization": "Comb-cut and finger-drawn forest wildlife and tribal marriage murals",
    "experience": "20 Years of Murals & Canvas Art",
    "experienceYears": 20,
    "capacity": "25 pieces/month",
    "capacityPerMonth": 25,
    "fulfillmentDays": 9,
    "averageFulfillmentDays": 9,
    "phone": "+91 98356 XXXXX",
    "email": "budhram.soren@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Creating Sohrai paintings with sacred clay gathered from river gullies, using twigs and cloth rags to depict birds, animals, and harvest fertility.",
    "skills": [
      "Natural Clay Mixing",
      "Comb Cutting",
      "Animal Motif Geometry",
      "Canvas Stretched Murals"
    ],
    "certifications": [
      "Sohrai-Khovar GI Authorized User",
      "National Tribal Craft Awardee"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2020-8844)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 38000,
      "monthlyCost": 22800,
      "monthlyProfit": 15200,
      "profitMargin": 44,
      "activeListings": 2,
      "inquiriesReceived": 14,
      "ordersConverted": 6,
      "conversionRate": 40,
      "trustScore": 91,
      "rating": 4.9,
      "reviewCount": 46,
      "topProduct": "Sohrai Tribal Art Canvas"
    },
    "economics": {
      "monthlyRevenue": 38000,
      "monthlyExpenses": 22800,
      "monthlyProfit": 15200,
      "margin": 44,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p11",
        "name": "Sohrai Tribal Art Canvas",
        "price": 3800,
        "materials": "Belgian Linen, Clay Ocher Pigments",
        "dimensions": "24 x 36 inches",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "description": "GI-recognized Sohrai mural depicting horned sacred bulls, peacocks, and flowering lotus buds. Rendered in mineral red, black manganese, and creamy kaolin clay pigments."
      },
      {
        "id": "p12",
        "name": "Khovar Nuptial Wall Plaque",
        "price": 1850,
        "materials": "Kaolin Clay, Charcoal Mud, Teak Wood",
        "dimensions": "14 x 14 inches framed",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional bridal chamber art carved by combing away white kaolin paste over wet charcoal-mud ground. Protected behind anti-glare museum acrylic."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-008",
    "legacyId": "artisan-8",
    "code": "ART-008",
    "pehchanId": "WB-BIR-KAN-8802",
    "giRegistrationNo": "GI-AU-2016-4401",
    "name": "Anjali Ghosh",
    "photo": "/images/avatars/artisan-7.svg",
    "avatarUrl": "/images/avatars/artisan-7.svg",
    "craft": "Kantha Embroidery",
    "category": "Hand Embroidery",
    "location": "Bolpur, Birbhum, West Bengal",
    "state": "West Bengal",
    "district": "Birbhum",
    "cluster": "Santiniketan Kantha Cluster",
    "specialization": "Silk & tussar shawls, dupattas, and wall tapestries with Nakshi Kantha",
    "experience": "16 Years of Running-Stitch Needlecraft",
    "experienceYears": 16,
    "capacity": "35 pieces/month",
    "capacityPerMonth": 35,
    "fulfillmentDays": 14,
    "averageFulfillmentDays": 14,
    "phone": "+91 97324 XXXXX",
    "email": "anjali.ghosh@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Tagore Memorial Crafts Society",
    "bio": "Leads a group of 30 village women in Birbhum stitching intricate folklore themes and floral jaals using pure silk threads on handloom tussar.",
    "skills": [
      "Nakshi Kantha",
      "Running Stitch Grading",
      "Motif Tracing",
      "Tussar Edge Finishing"
    ],
    "certifications": [
      "GI Tag Certified Kantha Artisan",
      "Craftmark Authenticated"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2016-4401)",
      "shgStatus": "Active (Tagore Memorial Crafts Society)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 47000,
      "monthlyCost": 28200,
      "monthlyProfit": 18800,
      "profitMargin": 41.5,
      "activeListings": 2,
      "inquiriesReceived": 19,
      "ordersConverted": 8,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.9,
      "reviewCount": 65,
      "topProduct": "Kantha Stitch Tussar Silk Stole"
    },
    "economics": {
      "monthlyRevenue": 47000,
      "monthlyExpenses": 28200,
      "monthlyProfit": 18800,
      "margin": 41.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p15",
        "name": "Kantha Stitch Tussar Silk Stole",
        "price": 4200,
        "materials": "Tussar Silk, Mulberry Silk Floss",
        "dimensions": "28 x 80 inches",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Exquisite handcrafted stole adorned with authentic rural Bengal Nakshi Kantha running stitch motifs created over 3 weeks by rural women artisans."
      },
      {
        "id": "p16",
        "name": "Nakshi Kantha Hand-Stitched Quilt Dohar",
        "price": 9800,
        "materials": "100% Mulmul Cotton, Cotton Threads",
        "dimensions": "90 x 108 inches (King Size)",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Double-bed artisanal Dohar layered with soft unbleached cotton mulmul and stitched edge-to-edge with traditional village pastoral scenes and geometric borders."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-009",
    "legacyId": "artisan-9",
    "code": "ART-009",
    "pehchanId": "OD-PURI-PAT-3310",
    "giRegistrationNo": "GI-AU-2008-1120",
    "name": "Dushasan Mohapatra",
    "photo": "/images/avatars/artisan-8.svg",
    "avatarUrl": "/images/avatars/artisan-8.svg",
    "craft": "Pattachitra Painting",
    "category": "Painting & Wall Art",
    "location": "Raghurajpur Heritage Village, Puri, Odisha",
    "state": "Odisha",
    "district": "Puri",
    "cluster": "Raghurajpur Heritage Crafts Village",
    "specialization": "Lord Jagannath tales, Gita Govinda, and tree of life on treated cotton canvas",
    "experience": "26 Years of Cloth Scroll Painting",
    "experienceYears": 26,
    "capacity": "20 pieces/month",
    "capacityPerMonth": 20,
    "fulfillmentDays": 15,
    "averageFulfillmentDays": 15,
    "phone": "+91 94370 XXXXX",
    "email": "dushasan.m@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Hereditary Chitrakar preparing cotton canvas with tamarind seed glue and chalk stone, rendering hair-thin linework with mineral colors.",
    "skills": [
      "Patti Preparation",
      "Kajal & Hingula Ink",
      "Fine Squirrel Hair Brushwork",
      "Lacquering & Sealing"
    ],
    "certifications": [
      "Odisha Pattachitra GI Certified Master",
      "National Handicrafts Master Craftsman"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2008-1120)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 78000,
      "monthlyCost": 46800,
      "monthlyProfit": 31200,
      "profitMargin": 46,
      "activeListings": 2,
      "inquiriesReceived": 26,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 97,
      "rating": 5,
      "reviewCount": 140,
      "topProduct": "Raghurajpur Pattachitra Dasavatara Scroll"
    },
    "economics": {
      "monthlyRevenue": 78000,
      "monthlyExpenses": 46800,
      "monthlyProfit": 31200,
      "margin": 46,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p17",
        "name": "Raghurajpur Pattachitra Dasavatara Scroll",
        "price": 18500,
        "materials": "Patta Canvas, Conch Shell & Mineral Dyes",
        "dimensions": "20 x 45 inches (Rolled Scroll with Silk Ribbon)",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "description": "Masterwork scroll painting portraying the ten incarnations of Lord Vishnu in classical Odissi temple iconography. Rendered using white conch shell powder, lamp black, and cinnabar red."
      },
      {
        "id": "p18",
        "name": "Hand-Painted Palm Leaf Engraving (Talapatra Chitra)",
        "price": 2400,
        "materials": "Cured Palm Leaf, Charcoal Pigment",
        "dimensions": "12 x 16 inches open",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "description": "Delicately stitched palm leaf slats incised with iron stylus needles depicting scenes from the Gita Govinda. Folding accordion structure supported by a natural wood easel."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-010",
    "legacyId": "artisan-10",
    "code": "ART-010",
    "pehchanId": "OD-BAR-IKT-5511",
    "giRegistrationNo": "GI-AU-2010-3329",
    "name": "Subhashree Meher",
    "photo": "/images/avatars/artisan-9.svg",
    "avatarUrl": "/images/avatars/artisan-9.svg",
    "craft": "Sambalpuri Handloom",
    "category": "Handloom Textiles",
    "location": "Barpali, Bargarh, Odisha",
    "state": "Odisha",
    "district": "Bargarh",
    "cluster": "Western Odisha Handloom Cluster",
    "specialization": "Double-ikat tie & dye cotton stoles, sarees, and home textiles",
    "experience": "19 Years of Bandhakala Ikat Weaving",
    "experienceYears": 19,
    "capacity": "45 pieces/month",
    "capacityPerMonth": 45,
    "fulfillmentDays": 12,
    "averageFulfillmentDays": 12,
    "phone": "+91 94372 XXXXX",
    "email": "subhashree.meher@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Bapuji Bunkar Sahayog Samiti",
    "bio": "Specializes in the mathematics of warp and weft tie-dyeing, creating curlicue motifs like conch shells, fish, and temple spires in rich fast colors.",
    "skills": [
      "Bandha Warp Tie-Dye",
      "Frame Loom Setting",
      "Temple Border Weaving",
      "Fast Vat Dyeing"
    ],
    "certifications": [
      "Sambalpuri Ikat GI Tag Registered User",
      "Handloom Mark Registered Weavers Co-op"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2010-3329)",
      "shgStatus": "Active (Bapuji Bunkar Sahayog Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 59000,
      "monthlyCost": 35400,
      "monthlyProfit": 23600,
      "profitMargin": 35,
      "activeListings": 2,
      "inquiriesReceived": 28,
      "ordersConverted": 11,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.8,
      "reviewCount": 88,
      "topProduct": "Sambalpuri Bandha Ikat Pure Silk Saree"
    },
    "economics": {
      "monthlyRevenue": 59000,
      "monthlyExpenses": 35400,
      "monthlyProfit": 23600,
      "margin": 35,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p19",
        "name": "Sambalpuri Bandha Ikat Pure Silk Saree",
        "price": 12800,
        "materials": "Pure Mulberry Silk",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Sambalpuri Bandha saree featuring intricate Pasapalli chess-board patterns, conch shell (Shankha), and fish (Matsya) motifs woven over 10 days."
      },
      {
        "id": "p20",
        "name": "Sambalpuri Handloom Cotton Ikat Dupatta",
        "price": 1650,
        "materials": "100% Combed Cotton",
        "dimensions": "36 x 96 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Breathable handwoven cotton dupatta showcasing traditional Rudraksha temple border and fish bandha motifs. Perfect for daily ethnic elegance."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-011",
    "legacyId": "artisan-11",
    "code": "ART-011",
    "pehchanId": "OD-CUT-TAR-9012",
    "giRegistrationNo": "GI-AU-2022-7718",
    "name": "Kalandi Sahoo",
    "photo": "/images/avatars/artisan-10.svg",
    "avatarUrl": "/images/avatars/artisan-10.svg",
    "craft": "Silver Filigree (Tarkasi)",
    "category": "Tribal Jewellery & Silver",
    "location": "Nayasarak, Cuttack, Odisha",
    "state": "Odisha",
    "district": "Cuttack",
    "cluster": "Cuttack Tarkasi Megacluster",
    "specialization": "Pure silver gossamer jewelry, miniature chariot models, and heirloom brooches",
    "experience": "24 Years of Wire Filigree",
    "experienceYears": 24,
    "capacity": "30 pieces/month",
    "capacityPerMonth": 30,
    "fulfillmentDays": 14,
    "averageFulfillmentDays": 14,
    "phone": "+91 94374 XXXXX",
    "email": "kalandi.sahoo@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Draws 99.9% pure silver into threads thinner than hair and weaves them by hand into lace-like jewelry and cultural gift centerpieces.",
    "skills": [
      "Silver Wire Drawing",
      "Micro Soldering",
      "Lace Wire Flattening",
      "Rhodium Polish"
    ],
    "certifications": [
      "Cuttack Rupa Tarkasi GI User",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2022-7718)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 85000,
      "monthlyCost": 51000,
      "monthlyProfit": 34000,
      "profitMargin": 33,
      "activeListings": 2,
      "inquiriesReceived": 16,
      "ordersConverted": 6,
      "conversionRate": 40,
      "trustScore": 95,
      "rating": 4.9,
      "reviewCount": 62,
      "topProduct": "Cuttack Tarkasi Pure Silver Konark Wheel Brooch"
    },
    "economics": {
      "monthlyRevenue": 85000,
      "monthlyExpenses": 51000,
      "monthlyProfit": 34000,
      "margin": 33,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p21",
        "name": "Cuttack Tarkasi Pure Silver Konark Wheel Brooch",
        "price": 3850,
        "materials": "Pure 92.5 Sterling Silver Wire",
        "dimensions": "2.2 inches diameter",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Cuttack Tarkasi brooch sculpted with gossamer-thin 0.2mm pure silver wires shaped into the 24 spokes of the Sun Temple Konark Wheel."
      },
      {
        "id": "p22",
        "name": "Tarkasi Pure Silver Peacock Diya Stand",
        "price": 24500,
        "materials": "Certified 92.5 Fine Silver",
        "dimensions": "7.5 inches height x 4 inches base",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "description": "Magnificent ritual diya stand crowned with an ornate filigree peacock with flared tail plumes. Heirloom wedding and festive showpiece certified for purity."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-012",
    "legacyId": "artisan-12",
    "code": "ART-012",
    "pehchanId": "RJ-JAI-BLK-8820",
    "giRegistrationNo": "GI-AU-2016-7731",
    "name": "Laxmi Bai",
    "photo": "/images/avatars/artisan-11.svg",
    "avatarUrl": "/images/avatars/artisan-11.svg",
    "craft": "Hand Block Printing",
    "category": "Hand Block Printing",
    "location": "Bagru, Jaipur, Rajasthan",
    "state": "Rajasthan",
    "district": "Jaipur",
    "cluster": "Bagru Natural Dye Printing Cluster",
    "specialization": "Dabu mud-resist and Syahi-Begar natural vegetable dye textiles",
    "experience": "14 Years of Bagru & Sanganer Printing",
    "experienceYears": 14,
    "capacity": "120 pieces/month",
    "capacityPerMonth": 120,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 98290 XXXXX",
    "email": "laxmi.bai@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Surya Mahila Bunkar Samiti",
    "bio": "Carrying forward 5 generations of Chippa community heritage, using hand-carved teakwood blocks and natural indigo/iron resist pastes on organic cotton.",
    "skills": [
      "Dabu Mud-Resist Printing",
      "Teakwood Block Alignment",
      "Natural Indigo Vat Dyeing",
      "Color Fastness Treatment"
    ],
    "certifications": [
      "Sanganeri & Bagru Hand Block GI Tag Holder",
      "Craftmark Certified Artisan"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2016-7731)",
      "shgStatus": "Active (Surya Mahila Bunkar Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 72000,
      "monthlyCost": 43200,
      "monthlyProfit": 28800,
      "profitMargin": 36.5,
      "activeListings": 2,
      "inquiriesReceived": 34,
      "ordersConverted": 14,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 105,
      "topProduct": "Bagru Dabu Mud-Resist Cotton Saree"
    },
    "economics": {
      "monthlyRevenue": 72000,
      "monthlyExpenses": 43200,
      "monthlyProfit": 28800,
      "margin": 36.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p23",
        "name": "Bagru Dabu Mud-Resist Cotton Saree",
        "price": 2650,
        "materials": "Chanderi Cotton, Vegetable Dyes",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "craftCategory": "Block Printing",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Eco-friendly hand-block printed saree created using traditional Dabu mud paste and fermented natural indigo vats. Features classic buta motifs and broad pallu."
      },
      {
        "id": "p24",
        "name": "Sanganeri Floral Block Printed Table Linen Set",
        "price": 1450,
        "materials": "100% Cotton Duck Fabric",
        "dimensions": "Runner 14 x 72 inches, 6 Mats 12 x 18 inches",
        "craftCategory": "Block Printing",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Dining set containing 1 long table runner and 6 matching placemats decorated with crisp Rajasthani floral jaals and cypress tree borders."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-013",
    "legacyId": "artisan-13",
    "code": "ART-013",
    "pehchanId": "RJ-JAI-POT-1102",
    "giRegistrationNo": "GI-AU-2009-4410",
    "name": "Ramswaroop Sharma",
    "photo": "/images/avatars/artisan-12.svg",
    "avatarUrl": "/images/avatars/artisan-12.svg",
    "craft": "Blue Pottery",
    "category": "Pottery & Ceramics",
    "location": "Kot Jewar, Jaipur, Rajasthan",
    "state": "Rajasthan",
    "district": "Jaipur",
    "cluster": "Jaipur Blue Pottery Cluster",
    "specialization": "Clay-free quartz pottery tiles, plates, soap dishes, and vases",
    "experience": "25 Years of Ceramic Art",
    "experienceYears": 25,
    "capacity": "90 pieces/month",
    "capacityPerMonth": 90,
    "fulfillmentDays": 9,
    "averageFulfillmentDays": 9,
    "phone": "+91 98291 XXXXX",
    "email": "ramswaroop.sharma@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Shapes unique dough of quartz stone powder, Fuller's earth, and glass into luminous turquoise blue ceramic wares decorated with Persian floral arabesques.",
    "skills": [
      "Quartz Dough Moulding",
      "Cobalt & Copper Oxide Painting",
      "Glass Frit Glaze",
      "Low Fire Frit Kiln"
    ],
    "certifications": [
      "Jaipur Blue Pottery GI Authorized Artisan",
      "State Merit Crafts Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2009-4410)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 68000,
      "monthlyCost": 40800,
      "monthlyProfit": 27200,
      "profitMargin": 40,
      "activeListings": 3,
      "inquiriesReceived": 32,
      "ordersConverted": 13,
      "conversionRate": 40,
      "trustScore": 94,
      "rating": 4.9,
      "reviewCount": 94,
      "topProduct": "Jaipur Blue Pottery Decorative Wall Plate"
    },
    "economics": {
      "monthlyRevenue": 68000,
      "monthlyExpenses": 40800,
      "monthlyProfit": 27200,
      "margin": 40,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p25",
        "name": "Jaipur Blue Pottery Decorative Wall Plate",
        "price": 1650,
        "materials": "Quartz, Glass & Oxide Pigments (Clay-Free)",
        "dimensions": "10 inches diameter x 1.2 inches rim",
        "craftCategory": "Pottery",
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "description": "Clay-free heritage Blue Pottery plate featuring intricate Persian floral motifs in brilliant cobalt blue and turquoise. Pre-fitted with a brass wall hook."
      },
      {
        "id": "p26",
        "name": "Blue Pottery Handcrafted Ceramic Drawer Knobs",
        "price": 680,
        "materials": "Handmade Ceramic, Brass Rod",
        "dimensions": "1.5 inches diameter x 2.5 inches length each",
        "craftCategory": "Pottery",
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 8 hand-painted floral cabinet knobs with anti-rust brass fitting rods. Ideal for refurbishing chests, kitchen cabinets, and credenzas."
      },
      {
        "id": "p27",
        "name": "Blue Pottery Cylindrical Flower Vase",
        "price": 2200,
        "materials": "Lead-Free Ceramic Glaze",
        "dimensions": "5 inches diameter x 12 inches height",
        "craftCategory": "Pottery",
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "description": "Vibrant turquoise vase with cascading Mughal vine patterns. Water-resistant glazed interior suitable for fresh floral arrangements."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-014",
    "legacyId": "artisan-14",
    "code": "ART-014",
    "pehchanId": "RJ-UDA-MIN-4419",
    "giRegistrationNo": "GI-AU-2015-8833",
    "name": "Nandlal Jangid",
    "photo": "/images/avatars/artisan-13.svg",
    "avatarUrl": "/images/avatars/artisan-13.svg",
    "craft": "Miniature Painting",
    "category": "Painting & Wall Art",
    "location": "Old City, Udaipur, Rajasthan",
    "state": "Rajasthan",
    "district": "Udaipur",
    "cluster": "Mewar Miniature Painting Cluster",
    "specialization": "Intricate courtly hunting and royal durbar scenes with genuine gold leaf detailing",
    "experience": "21 Years of Mewar Court Painting",
    "experienceYears": 21,
    "capacity": "15 pieces/month",
    "capacityPerMonth": 15,
    "fulfillmentDays": 16,
    "averageFulfillmentDays": 16,
    "phone": "+91 98294 XXXXX",
    "email": "nandlal.jangid@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Uses fine single-hair brushes to paint classical Mewar miniatures on vintage handmade wasli paper using crushed lapis lazuli and malachite.",
    "skills": [
      "Wasli Paper Treatment",
      "Gold Foil Hilkari",
      "Micro Detail Brushwork",
      "Stone Pigment Grinding"
    ],
    "certifications": [
      "Rajasthan Craft Council Master Artist",
      "Pehchan Ministry Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2015-8833)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 54000,
      "monthlyCost": 32400,
      "monthlyProfit": 21600,
      "profitMargin": 48,
      "activeListings": 2,
      "inquiriesReceived": 15,
      "ordersConverted": 6,
      "conversionRate": 40,
      "trustScore": 91,
      "rating": 4.9,
      "reviewCount": 48,
      "topProduct": "Kishangarh Bani Thani Miniature on Silk"
    },
    "economics": {
      "monthlyRevenue": 54000,
      "monthlyExpenses": 32400,
      "monthlyProfit": 21600,
      "margin": 48,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p28",
        "name": "Kishangarh Bani Thani Miniature on Silk",
        "price": 6500,
        "materials": "Silk Canvas, 24K Gold Leaf, Stone Pigments",
        "dimensions": "16 x 22 inches framed with raw silk mat",
        "craftCategory": "Fine Art",
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "description": "Celebrated as India's Mona Lisa. Depicts Princess Bani Thani with elongated eyes, arched eyebrows, and translucent gold-dusted odhani."
      },
      {
        "id": "p29",
        "name": "Rajasthani Royal Procession Miniature Desk Plaque",
        "price": 1950,
        "materials": "Marble Dust Tile, Natural Colors",
        "dimensions": "6 x 8 inches with folding wooden stand",
        "craftCategory": "Fine Art",
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "description": "Intricate desktop keepsake portraying a maharaja atop an ornamented royal tusker accompanied by retainers carrying royal umbrellas."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-015",
    "legacyId": "artisan-15",
    "code": "ART-015",
    "pehchanId": "RJ-JOD-LEA-7711",
    "giRegistrationNo": "GI-AU-2021-3390",
    "name": "Karni Singh",
    "photo": "/images/avatars/artisan-14.svg",
    "avatarUrl": "/images/avatars/artisan-14.svg",
    "craft": "Leather Mojari",
    "category": "Leather Craft",
    "location": "Mandore, Jodhpur, Rajasthan",
    "state": "Rajasthan",
    "district": "Jodhpur",
    "cluster": "Marwar Leather Crafts Cluster",
    "specialization": "Hand-stitched camel leather mojaris with silk and zari thread embroidery",
    "experience": "17 Years of Footwear Crafting",
    "experienceYears": 17,
    "capacity": "75 pairs/month",
    "capacityPerMonth": 75,
    "fulfillmentDays": 7,
    "averageFulfillmentDays": 7,
    "phone": "+91 98295 XXXXX",
    "email": "karni.singh@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Marudhar Bunkar Samiti",
    "bio": "Produces ergonomic and resilient ethnic footwear using vegetable-tanned leather, hand-stitched with cotton cord without synthetic adhesives.",
    "skills": [
      "Vegetable Leather Tanning",
      "Cord Sole Stitching",
      "Zari Embroidery",
      "Curled Toe Shaping"
    ],
    "certifications": [
      "Footwear Design & Development Certified",
      "Pehchan Identity Holder"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2021-3390)",
      "shgStatus": "Active (Marudhar Bunkar Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 49000,
      "monthlyCost": 29400,
      "monthlyProfit": 19600,
      "profitMargin": 37,
      "activeListings": 2,
      "inquiriesReceived": 22,
      "ordersConverted": 9,
      "conversionRate": 40,
      "trustScore": 89,
      "rating": 4.7,
      "reviewCount": 71,
      "topProduct": "Camel Leather Embroidered Mojari Jutti"
    },
    "economics": {
      "monthlyRevenue": 49000,
      "monthlyExpenses": 29400,
      "monthlyProfit": 19600,
      "margin": 37,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p30",
        "name": "Camel Leather Embroidered Mojari Jutti",
        "price": 1650,
        "materials": "Genuine Camel Leather, Silk Thread",
        "dimensions": "Available in Sizes 6 to 11 UK/India",
        "craftCategory": "Leather Craft",
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "description": "Authentic Jodhpuri mojari stitched using vegetable-cured camel hide that softens and molds naturally to the wearer's foot without bites."
      },
      {
        "id": "p31",
        "name": "Hand-Tooled Raw Leather Slip-On Mules",
        "price": 2100,
        "materials": "Full Grain Leather, Latex Foam",
        "dimensions": "Sizes 5 to 11 Unisex",
        "craftCategory": "Leather Craft",
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "description": "Contemporary open-back leather mules designed for resortwear and urban lifestyle boutiques, combining traditional cobbling with modern ergonomics."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-016",
    "legacyId": "artisan-16",
    "code": "ART-016",
    "pehchanId": "GJ-KUT-ROG-9901",
    "giRegistrationNo": "GI-AU-2014-1188",
    "name": "Farida Begum",
    "photo": "/images/avatars/artisan-15.svg",
    "avatarUrl": "/images/avatars/artisan-15.svg",
    "craft": "Rogan Art",
    "category": "Painting & Wall Art",
    "location": "Nirona, Kutch, Gujarat",
    "state": "Gujarat",
    "district": "Kutch",
    "cluster": "Kutch Rogan Heritage Cluster",
    "specialization": "Freehand castor oil pigment painting on silk and tussar fabrics",
    "experience": "16 Years of Castor Oil Painting",
    "experienceYears": 16,
    "capacity": "20 pieces/month",
    "capacityPerMonth": 20,
    "fulfillmentDays": 14,
    "averageFulfillmentDays": 14,
    "phone": "+91 98250 XXXXX",
    "email": "farida.begum@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "One of only a few practicing families of 400-year-old Rogan art, boiling castor oil into thick paste and guiding threads with a metal stylus to mirror-pattern silks.",
    "skills": [
      "Castor Paste Preparation",
      "Stylus Thread Manipulation",
      "Mirror Printing",
      "Natural Earth Pigments"
    ],
    "certifications": [
      "Rogan Art GI Tag Certified",
      "National Handicrafts Awardee"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2014-1188)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 62000,
      "monthlyCost": 37200,
      "monthlyProfit": 24800,
      "profitMargin": 49,
      "activeListings": 2,
      "inquiriesReceived": 21,
      "ordersConverted": 8,
      "conversionRate": 40,
      "trustScore": 96,
      "rating": 5,
      "reviewCount": 82,
      "topProduct": "Nirona Rogan Castor-Oil Painted Stole"
    },
    "economics": {
      "monthlyRevenue": 62000,
      "monthlyExpenses": 37200,
      "monthlyProfit": 24800,
      "margin": 49,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p32",
        "name": "Nirona Rogan Castor-Oil Painted Stole",
        "price": 7400,
        "materials": "Raw Silk, Castor Oil Paste",
        "dimensions": "26 x 78 inches",
        "craftCategory": "Textile Painting",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Rare GI-tagged craft surviving in only a few Kutchi artisan families. Castor oil jelly trailed through a metal stylus onto silk without ever touching the fabric."
      },
      {
        "id": "p33",
        "name": "Framed Rogan Tree of Life Wall Art",
        "price": 16200,
        "materials": "Khadi Canvas, Natural Pigments",
        "dimensions": "28 x 40 inches framed in dark rosewood",
        "craftCategory": "Fine Art",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "description": "Museum-grade framed artwork identical to the presentation gift given by India's Prime Minister to world leaders. Flawless symmetry of peacocks and flowering branches."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-017",
    "legacyId": "artisan-17",
    "code": "ART-017",
    "pehchanId": "GJ-BHU-WVE-3320",
    "giRegistrationNo": "GI-AU-2018-5544",
    "name": "Devjibhai Vankar",
    "photo": "/images/avatars/artisan-16.svg",
    "avatarUrl": "/images/avatars/artisan-16.svg",
    "craft": "Bhujodi Handloom",
    "category": "Handloom Textiles",
    "location": "Bhujodi, Kutch, Gujarat",
    "state": "Gujarat",
    "district": "Kutch",
    "cluster": "Vankar Weaver Megacluster",
    "specialization": "Extra-weft handwoven shawls, throws, and Kala cotton stoles",
    "experience": "23 Years of Kala Cotton & Wool Weaving",
    "experienceYears": 23,
    "capacity": "60 pieces/month",
    "capacityPerMonth": 60,
    "fulfillmentDays": 10,
    "averageFulfillmentDays": 10,
    "phone": "+91 98252 XXXXX",
    "email": "devjibhai.vankar@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Kutch Weavers Collective",
    "bio": "Weaves rain-fed organic Kala cotton and indigenous sheep wool on traditional pit looms, inserting geometric extra-weft motifs without graph sheets.",
    "skills": [
      "Pit Loom Operation",
      "Extra Weft Insertion",
      "Organic Kala Cotton Spinning",
      "Natural Indigo Dyeing"
    ],
    "certifications": [
      "Kutch Shawl GI Tag Registered User",
      "UNESCO Seal of Excellence"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2018-5544)",
      "shgStatus": "Active (Kutch Weavers Collective)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 76000,
      "monthlyCost": 45600,
      "monthlyProfit": 30400,
      "profitMargin": 38,
      "activeListings": 2,
      "inquiriesReceived": 31,
      "ordersConverted": 12,
      "conversionRate": 40,
      "trustScore": 95,
      "rating": 4.9,
      "reviewCount": 114,
      "topProduct": "Bhujodi Kala Cotton Handwoven Shawl"
    },
    "economics": {
      "monthlyRevenue": 76000,
      "monthlyExpenses": 45600,
      "monthlyProfit": 30400,
      "margin": 38,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p34",
        "name": "Bhujodi Kala Cotton Handwoven Shawl",
        "price": 4800,
        "materials": "Organic Kala Cotton Yarn",
        "dimensions": "34 x 84 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Woven by Vankar master weavers using non-hybrid indigenous Kala cotton. Textured handle with geometric tribal medallions along the pallu edges."
      },
      {
        "id": "p35",
        "name": "Kutch Merino Wool Handwoven Throw Blanket",
        "price": 8900,
        "materials": "Hand-Spun Pure Wool",
        "dimensions": "50 x 70 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Heirloom-weight sofa throw designed to bring warmth and authentic rustic artisanal character to modern interior spaces."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-018",
    "legacyId": "artisan-18",
    "code": "ART-018",
    "pehchanId": "GJ-JAM-BAN-7714",
    "giRegistrationNo": "GI-AU-2019-8802",
    "name": "Jayshreeben Patel",
    "photo": "/images/avatars/artisan-17.svg",
    "avatarUrl": "/images/avatars/artisan-17.svg",
    "craft": "Bandhani Tie-Dye",
    "category": "Handloom Textiles",
    "location": "Khambhalia, Jamnagar, Gujarat",
    "state": "Gujarat",
    "district": "Jamnagar",
    "cluster": "Saurashtra Bandhani Cluster",
    "specialization": "Shikari, Jaaldar, and Gharchola superfine micro-knot tie-dye sarees",
    "experience": "15 Years of Micro-Knotting",
    "experienceYears": 15,
    "capacity": "40 pieces/month",
    "capacityPerMonth": 40,
    "fulfillmentDays": 12,
    "averageFulfillmentDays": 12,
    "phone": "+91 98254 XXXXX",
    "email": "jayshree.patel@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Shreeji Mahila Sahyog",
    "bio": "Pioneering pinpoint micro-knotting with natural nails and silk threads, resulting in crisp non-bleeding dotted geometric mandalas.",
    "skills": [
      "Tying with Pointed Finger Ring",
      "Sequential Color Dipping",
      "Silk Georgette Handling",
      "Crepe Steaming"
    ],
    "certifications": [
      "Jamnagar Bandhani GI Certified",
      "Craftmark Verified"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2019-8802)",
      "shgStatus": "Active (Shreeji Mahila Sahyog)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 58000,
      "monthlyCost": 34800,
      "monthlyProfit": 23200,
      "profitMargin": 36,
      "activeListings": 2,
      "inquiriesReceived": 27,
      "ordersConverted": 11,
      "conversionRate": 40,
      "trustScore": 91,
      "rating": 4.8,
      "reviewCount": 76,
      "topProduct": "Jamnagar Pure Georgette Bandhani Dupatta"
    },
    "economics": {
      "monthlyRevenue": 58000,
      "monthlyExpenses": 34800,
      "monthlyProfit": 23200,
      "margin": 36,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p36",
        "name": "Jamnagar Pure Georgette Bandhani Dupatta",
        "price": 3600,
        "materials": "Pure Georgette, Silk Threads",
        "dimensions": "36 x 96 inches",
        "craftCategory": "Tie & Dye",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Exquisite Jamnagar Bandhani featuring over 8,000 individually hand-tied knots forming concentric circular chakras and traditional Shikari hunting scenes."
      },
      {
        "id": "p37",
        "name": "Gharchola Bridal Dupatta with Zari Grid",
        "price": 11500,
        "materials": "Gaji Silk, Gold Zari",
        "dimensions": "42 x 100 inches",
        "craftCategory": "Tie & Dye",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Sacred Gujarati wedding heirloom. 52 distinct square checks (Chowkadi) filled with elephants, peacocks, and lotuses hand-knotted in fine Bandhej."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-019",
    "legacyId": "artisan-19",
    "code": "ART-019",
    "pehchanId": "GJ-KHA-AGA-2201",
    "giRegistrationNo": "GI-AU-2016-3399",
    "name": "Bharatbhai Soni",
    "photo": "/images/avatars/artisan-18.svg",
    "avatarUrl": "/images/avatars/artisan-18.svg",
    "craft": "Agate Stone Craft",
    "category": "Stone Craft",
    "location": "Khambhat, Anand, Gujarat",
    "state": "Gujarat",
    "district": "Anand",
    "cluster": "Khambhat Lapidary Cluster",
    "specialization": "Polished carnelian, moss agate bowls, coasters, and healing gemstones",
    "experience": "27 Years of Semi-Precious Lapidary",
    "experienceYears": 27,
    "capacity": "100 pieces/month",
    "capacityPerMonth": 100,
    "fulfillmentDays": 7,
    "averageFulfillmentDays": 7,
    "phone": "+91 98256 XXXXX",
    "email": "bharat.soni@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Baking raw riverbed agates in earthen pots under the summer sun before faceting and high-luster diamond wheel polishing.",
    "skills": [
      "Sun-Baking Color Activation",
      "Chipping & Shaping",
      "Bead Drilling",
      "Emery Polishing"
    ],
    "certifications": [
      "Khambhat Agate GI Tag User",
      "Export Promotion Council for Handicrafts Member"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2016-3399)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 51000,
      "monthlyCost": 30600,
      "monthlyProfit": 20400,
      "profitMargin": 42,
      "activeListings": 2,
      "inquiriesReceived": 18,
      "ordersConverted": 7,
      "conversionRate": 40,
      "trustScore": 90,
      "rating": 4.8,
      "reviewCount": 53,
      "topProduct": "Polished Cambay Moss Agate Coaster Set"
    },
    "economics": {
      "monthlyRevenue": 51000,
      "monthlyExpenses": 30600,
      "monthlyProfit": 20400,
      "margin": 42,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p38",
        "name": "Polished Cambay Moss Agate Coaster Set",
        "price": 1450,
        "materials": "Semi-Precious Agate Stone, Brass",
        "dimensions": "4 inches diameter each",
        "craftCategory": "Stone Carving",
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Khambhat agate stone sliced into natural cross-sections with visible green dendritic moss inclusions. Sealed with protective food-safe buffer."
      },
      {
        "id": "p39",
        "name": "Hand-Carved Agate Stone Desk Paperweight",
        "price": 850,
        "materials": "Semi-Precious Carnelian Agate",
        "dimensions": "3.5 x 2.8 x 2 inches",
        "craftCategory": "Stone Carving",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Hand-polished organic crystalline paperweight with a precision card-slit top. Displays mesmerising volcanic rock striations and carnelian bands."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-020",
    "legacyId": "artisan-20",
    "code": "ART-020",
    "pehchanId": "MP-ASH-TX-9901",
    "giRegistrationNo": "GI-AU-2015-1102",
    "name": "Poonam Sahu",
    "photo": "/images/avatars/artisan-19.svg",
    "avatarUrl": "/images/avatars/artisan-19.svg",
    "craft": "Chanderi Weaving",
    "category": "Handloom Textiles",
    "location": "Pranpur Village, Chanderi, Ashoknagar, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "district": "Ashoknagar",
    "cluster": "Chanderi Handloom Weaving Cluster",
    "specialization": "Sheer silk-cotton sarees with zari booti and peacock border motifs",
    "experience": "16 Years of Sheer Fabric Weaving",
    "experienceYears": 16,
    "capacity": "40 pieces/month",
    "capacityPerMonth": 40,
    "fulfillmentDays": 11,
    "averageFulfillmentDays": 11,
    "phone": "+91 94251 XXXXX",
    "email": "poonam.sahu@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Bunkar Vikas Mahila Samiti",
    "bio": "Master weaver specializing in gossamer lightweight Chanderi textiles with pure gold zari borders, carrying on the Scindia royal patronage tradition.",
    "skills": [
      "Silk-Cotton Blend Warp",
      "Dobby Booti Jacquard Weaving",
      "Zari Border Finishing",
      "Degumming Treatment"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2015-1102)",
      "Handloom Mark Registered User",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2015-1102)",
      "shgStatus": "Active (Bunkar Vikas Mahila Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 61000,
      "monthlyCost": 36600,
      "monthlyProfit": 24400,
      "profitMargin": 37.5,
      "activeListings": 2,
      "inquiriesReceived": 29,
      "ordersConverted": 12,
      "conversionRate": 40,
      "trustScore": 95,
      "rating": 4.9,
      "reviewCount": 92,
      "topProduct": "Chanderi Silk-Cotton Saree with Ashavali Border"
    },
    "economics": {
      "monthlyRevenue": 61000,
      "monthlyExpenses": 36600,
      "monthlyProfit": 24400,
      "margin": 37.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p40",
        "name": "Chanderi Silk-Cotton Saree with Ashavali Border",
        "price": 7800,
        "materials": "Silk-Cotton Blend, Tested Zari",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Sheer and feather-light GI-tagged Chanderi saree woven with pure silk warp and delicate cotton weft. Features shimmering gold coin (Ashrafi) motifs."
      },
      {
        "id": "p41",
        "name": "Chanderi Cotton Dupatta with Hand-Spun Buttis",
        "price": 2100,
        "materials": "Fine Cotton, Zari Yarn",
        "dimensions": "36 x 96 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Gossamer translucent cotton dupatta with subtle gold-woven coin motifs and double contrast selvedges. Elegant accent for ethnic kurtas."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-021",
    "legacyId": "artisan-21",
    "code": "ART-021",
    "pehchanId": "MP-DHA-BAG-4411",
    "giRegistrationNo": "GI-AU-2017-7720",
    "name": "Rameshwar Baghel",
    "photo": "/images/avatars/artisan-20.svg",
    "avatarUrl": "/images/avatars/artisan-20.svg",
    "craft": "Bagh Print",
    "category": "Hand Block Printing",
    "location": "Bagh, Dhar, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "district": "Dhar",
    "cluster": "Bagh River Artisan Cluster",
    "specialization": "Vegetable dye hand block prints washed in the mineral-rich Bagh river",
    "experience": "20 Years of Riverbed Block Printing",
    "experienceYears": 20,
    "capacity": "110 pieces/month",
    "capacityPerMonth": 110,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 94253 XXXXX",
    "email": "rameshwar.baghel@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Khatri Karigar Sahayog",
    "bio": "Applies red alum and black iron mordants using century-old teak blocks, followed by boiling with Dhavda flowers in copper vats.",
    "skills": [
      "River Water Washing",
      "Teak Block Stamping",
      "Copper Vat Boiling",
      "Alum-Iron Mordanting"
    ],
    "certifications": [
      "Bagh Print GI Registered User",
      "National Merit Awardee"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2017-7720)",
      "shgStatus": "Active (Khatri Karigar Sahayog)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 65000,
      "monthlyCost": 39000,
      "monthlyProfit": 26000,
      "profitMargin": 36,
      "activeListings": 2,
      "inquiriesReceived": 25,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.8,
      "reviewCount": 84,
      "topProduct": "Authentic Bagh Hand-Block Printed Cotton Bedcover"
    },
    "economics": {
      "monthlyRevenue": 65000,
      "monthlyExpenses": 39000,
      "monthlyProfit": 26000,
      "margin": 36,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p42",
        "name": "Authentic Bagh Hand-Block Printed Cotton Bedcover",
        "price": 2850,
        "materials": "Organic Cotton, Natural Bagh Dyes",
        "dimensions": "90 x 108 inches with 2 Pillow Covers (18 x 28 inches)",
        "craftCategory": "Block Printing",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Bagh print bedcover washed in the mineral-rich waters of the Baghini river. Striking contrast of deep alizarin red and jet black."
      },
      {
        "id": "p43",
        "name": "Bagh Printed Chanderi Silk Stole",
        "price": 1550,
        "materials": "Chanderi Silk, Vegetable Inks",
        "dimensions": "24 x 80 inches",
        "craftCategory": "Block Printing",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Lightweight sheer Chanderi stole printed with rhythmic Bagh floral bootas. Features zari selvedge and raw fringed ends."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-022",
    "legacyId": "artisan-22",
    "code": "ART-022",
    "pehchanId": "MP-DIN-GON-8812",
    "giRegistrationNo": "GI-AU-2021-9933",
    "name": "Munnalal Uikey",
    "photo": "/images/avatars/artisan-21.svg",
    "avatarUrl": "/images/avatars/artisan-21.svg",
    "craft": "Gond Tribal Painting",
    "category": "Painting & Wall Art",
    "location": "Patangarh, Dindori, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "district": "Dindori",
    "cluster": "Central India Gond Art Cluster",
    "specialization": "Vibrant storytelling paintings filled with intricate patterned dots and strokes",
    "experience": "17 Years of Dot-and-Line Folk Art",
    "experienceYears": 17,
    "capacity": "30 pieces/month",
    "capacityPerMonth": 30,
    "fulfillmentDays": 9,
    "averageFulfillmentDays": 9,
    "phone": "+91 94255 XXXXX",
    "email": "munnalal.uikey@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Expresses ancient tribal folklore of trees, deer, and river spirits with signature geometric fill patterns on handmade canvas.",
    "skills": [
      "Micro Dot Filling",
      "Line Hatching",
      "Animal Anatomy Geometry",
      "Natural Acrylic Preservation"
    ],
    "certifications": [
      "Gond Painting GI User",
      "Tribal Cooperative Marketing Development Federation (TRIFED) Member"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2021-9933)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 49000,
      "monthlyCost": 29400,
      "monthlyProfit": 19600,
      "profitMargin": 45,
      "activeListings": 2,
      "inquiriesReceived": 23,
      "ordersConverted": 9,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.9,
      "reviewCount": 68,
      "topProduct": "Gond Hand-Painted Canvas — Birds in Mahua Tree"
    },
    "economics": {
      "monthlyRevenue": 49000,
      "monthlyExpenses": 29400,
      "monthlyProfit": 19600,
      "margin": 45,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p44",
        "name": "Gond Hand-Painted Canvas — Birds in Mahua Tree",
        "price": 5400,
        "materials": "Cotton Canvas, Acrylic Emulsion",
        "dimensions": "30 x 40 inches (Stretched on Pine Stretcher)",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "description": "Original tribal painting by Pardhan Gond artist capturing the sacred Mahua tree surrounded by dancing birds, deer, and river spirits."
      },
      {
        "id": "p45",
        "name": "Gond Art Bookmark & Postcard Folio",
        "price": 350,
        "materials": "Recycled Board, Eco Inks",
        "dimensions": "2 x 6 inches (Bookmarks), 4 x 6 inches (Cards)",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 8 collectible art cards and bookmarks printed with authentic Gond totemic animal motifs. Packaged in a handmade lokta paper sleeve."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-023",
    "legacyId": "artisan-23",
    "code": "ART-023",
    "pehchanId": "MP-TIK-BEL-5501",
    "giRegistrationNo": "GI-AU-2019-2211",
    "name": "Kamla Bai",
    "photo": "/images/avatars/artisan-22.svg",
    "avatarUrl": "/images/avatars/artisan-22.svg",
    "craft": "Bell Metal Craft",
    "category": "Metal Craft",
    "location": "Tikamgarh, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "district": "Tikamgarh",
    "cluster": "Bundelkhand Bell Metal Cluster",
    "specialization": "Cire perdue brass and bronze animal sculptures, lamps, and temple utensils",
    "experience": "13 Years of Bundelkhand Casting",
    "experienceYears": 13,
    "capacity": "45 pieces/month",
    "capacityPerMonth": 45,
    "fulfillmentDays": 11,
    "averageFulfillmentDays": 11,
    "phone": "+91 94257 XXXXX",
    "email": "kamla.bai@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Bundeli Karigar SHG",
    "bio": "Castings inspired by medieval Bundelkhand royal iconography, cast in rich golden bell metal alloys.",
    "skills": [
      "Wax Rolling",
      "Clay Mould Baking",
      "Hot Metal Pouring",
      "Chisel Buffing"
    ],
    "certifications": [
      "Tikamgarh Bell Metal GI Registered",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2019-2211)",
      "shgStatus": "Active (Bundeli Karigar SHG)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 41000,
      "monthlyCost": 24600,
      "monthlyProfit": 16400,
      "profitMargin": 39,
      "activeListings": 2,
      "inquiriesReceived": 17,
      "ordersConverted": 7,
      "conversionRate": 40,
      "trustScore": 88,
      "rating": 4.7,
      "reviewCount": 39,
      "topProduct": "Tikamgarh Bell Metal Gauri-Shankar Diya"
    },
    "economics": {
      "monthlyRevenue": 41000,
      "monthlyExpenses": 24600,
      "monthlyProfit": 16400,
      "margin": 39,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p46",
        "name": "Tikamgarh Bell Metal Gauri-Shankar Diya",
        "price": 2750,
        "materials": "Pure Kansa / Bell Metal",
        "dimensions": "7 inches height x 4.5 inches diameter",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional acoustic bell metal oil lamp known for its golden resonance and rust-free durability. Features engraved lotus petals and flared base."
      },
      {
        "id": "p47",
        "name": "Cast Bell Metal Traditional Singing Bowl",
        "price": 1850,
        "materials": "7-Metal Bronze Alloy, Hardwood",
        "dimensions": "5.5 inches diameter x 3.2 inches depth",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "description": "Produces a rich, sustained acoustic hum when circled with the wooden striker. Ideal for meditation spaces, spa centers, and mindful living."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-024",
    "legacyId": "artisan-24",
    "code": "ART-024",
    "pehchanId": "UP-VAR-WEAV-8841",
    "giRegistrationNo": "GI-AU-2016-1182",
    "name": "Rameshwar Devi",
    "photo": "/images/avatars/artisan-23.svg",
    "avatarUrl": "/images/avatars/artisan-23.svg",
    "craft": "Banarasi Handloom Weaving",
    "category": "Handloom Textiles",
    "location": "Kotwa Village, Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "cluster": "Varanasi Handloom Megacluster",
    "specialization": "Pure Katan Silk with Kadwa Floral Boota and gold zari brocade",
    "experience": "24 Years of Traditional Silk Weaving",
    "experienceYears": 24,
    "capacity": "45 pieces/month",
    "capacityPerMonth": 45,
    "fulfillmentDays": 20,
    "averageFulfillmentDays": 20,
    "phone": "+91 98391 XXXXX",
    "email": "rameshwar.devi@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Ganga Jamuna Bunkar Mahila SHG",
    "bio": "Master weaver with over 24 years of dedication to heritage Varanasi pit-loom weaving. Specializes in 100% pure Katan Silk, real gold & silver Zari kadwa floral boota, and traditional bridal brocades.",
    "skills": [
      "Pure Katan Silk Weaving",
      "Kadwa Floral Boota",
      "Real Zari Threadwork",
      "Pit Loom Master",
      "Natural Vegetable Dyeing"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2016-1182)",
      "Ministry of Textiles Pehchan Card",
      "NABARD SHG Master Artisan Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2016-1182)",
      "shgStatus": "Active (Ganga Jamuna Bunkar Mahila SHG)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 86000,
      "monthlyCost": 51600,
      "monthlyProfit": 34400,
      "profitMargin": 34.5,
      "activeListings": 3,
      "inquiriesReceived": 38,
      "ordersConverted": 15,
      "conversionRate": 40,
      "trustScore": 98,
      "rating": 4.9,
      "reviewCount": 135,
      "topProduct": "Pure Katan Silk Banarasi Saree with Kadwa Zari"
    },
    "economics": {
      "monthlyRevenue": 86000,
      "monthlyExpenses": 51600,
      "monthlyProfit": 34400,
      "margin": 34.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p48",
        "name": "Pure Katan Silk Banarasi Saree with Kadwa Zari",
        "price": 28500,
        "materials": "Pure Katan Silk, Gold Zari",
        "dimensions": "5.5 meters saree + 0.8 meter unstitched blouse",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified masterwork Banarasi saree woven over 12 days on traditional pit looms. Features pure Katan silk with hand-engraved Kadwa floral boota that feels flush on both sides."
      },
      {
        "id": "p49",
        "name": "Banarasi Silk Brocade Tanchoi Dupatta",
        "price": 8900,
        "materials": "100% Mulberry Silk",
        "dimensions": "36 x 98 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Sumptuous reversible silk dupatta woven using the heritage Tanchoi satin brocade method. Features miniature blooming ambi paisleys with zero float threads."
      },
      {
        "id": "p50",
        "name": "Banarasi Brocade Cushion Covers Pair",
        "price": 1950,
        "materials": "Silk Brocade, Cotton Lining",
        "dimensions": "16 x 16 inches (Pair)",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Pair of opulent accent pillow covers woven on Varanasi handlooms. Brings royal Mughal dining and drawing room grandeur to contemporary living spaces."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-025",
    "legacyId": "artisan-25",
    "code": "ART-025",
    "pehchanId": "UP-LUK-CHK-5521",
    "giRegistrationNo": "GI-AU-2008-8831",
    "name": "Mohammad Aslam",
    "photo": "/images/avatars/artisan-25.svg",
    "avatarUrl": "/images/avatars/artisan-25.svg",
    "craft": "Chikankari Embroidery",
    "category": "Hand Embroidery",
    "location": "Chowk, Lucknow, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "cluster": "Awadh Chikankari Megacluster",
    "specialization": "Bakhiya shadow work, Tepchi, and Phanda stitches on mulmul and georgette",
    "experience": "22 Years of Shadow-Work Needlecraft",
    "experienceYears": 22,
    "capacity": "65 pieces/month",
    "capacityPerMonth": 65,
    "fulfillmentDays": 14,
    "averageFulfillmentDays": 14,
    "phone": "+91 98394 XXXXX",
    "email": "mohammad.aslam@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Noor Bano Dastkari Sanstha",
    "bio": "Coordinates 45 female artisans executing 32 distinct historical Chikankari stitches, celebrated for subtle tonal white-on-white embroidery.",
    "skills": [
      "Bakhiya Shadow Stitch",
      "Phanda French Knots",
      "Murri Rice Stitches",
      "Jali Openwork"
    ],
    "certifications": [
      "Lucknow Chikan Craft GI Tag User",
      "Master Craftsman Textiles Council"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2008-8831)",
      "shgStatus": "Active (Noor Bano Dastkari Sanstha)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 71000,
      "monthlyCost": 42600,
      "monthlyProfit": 28400,
      "profitMargin": 40,
      "activeListings": 2,
      "inquiriesReceived": 35,
      "ordersConverted": 14,
      "conversionRate": 40,
      "trustScore": 94,
      "rating": 4.9,
      "reviewCount": 104,
      "topProduct": "Lucknowi Hand-Embroidered Mulmul Kurta"
    },
    "economics": {
      "monthlyRevenue": 71000,
      "monthlyExpenses": 42600,
      "monthlyProfit": 28400,
      "margin": 40,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p53",
        "name": "Lucknowi Hand-Embroidered Mulmul Kurta",
        "price": 3450,
        "materials": "Pure Mulmul Cotton",
        "dimensions": "Sizes 38, 40, 42, 44, 46 (Chest Inches)",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Airy and pristine white-on-white men's/unisex kurta hand-embroidered by Awadh karigars over 10 days. Features intricate lattice jaali work on the placket."
      },
      {
        "id": "p54",
        "name": "Chikankari Hand-Crafted Georgette Anarkali Dupatta",
        "price": 5900,
        "materials": "Viscose Georgette, Cotton Floss",
        "dimensions": "40 x 98 inches",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Luxurious wedding dupatta densely filled with delicate Chikankari floral vines and scalloped hand-stitched borders. Dyeable into any pastel shade."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-026",
    "legacyId": "artisan-26",
    "code": "ART-026",
    "pehchanId": "UP-MOR-BRS-7701",
    "giRegistrationNo": "GI-AU-2014-9912",
    "name": "Vijay Kumar Rastogi",
    "photo": "/images/avatars/artisan-26.svg",
    "avatarUrl": "/images/avatars/artisan-26.svg",
    "craft": "Brass Engraving",
    "category": "Brass Craft",
    "location": "Peetal Nagri, Moradabad, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "district": "Moradabad",
    "cluster": "Moradabad Brassware Megacluster",
    "specialization": "Kalamkari fine hand engraving on solid brass planters, bowls, and temple bells",
    "experience": "28 Years of Metal Etching",
    "experienceYears": 28,
    "capacity": "120 pieces/month",
    "capacityPerMonth": 120,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 98396 XXXXX",
    "email": "vijay.rastogi@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Chisels delicate floral jaals into solid brass wares using tempered steel burins, lacquering with food-grade protective coatings.",
    "skills": [
      "Sand Casting Metal Base",
      "Kalam Chisel Engraving",
      "Black Lacquer Infilling",
      "High Buff Polish"
    ],
    "certifications": [
      "Moradabad Metal Craft GI Tag User",
      "EPCH Lifetime Member"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2014-9912)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 84000,
      "monthlyCost": 50400,
      "monthlyProfit": 33600,
      "profitMargin": 35,
      "activeListings": 2,
      "inquiriesReceived": 33,
      "ordersConverted": 13,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.8,
      "reviewCount": 98,
      "topProduct": "Moradabadi Handcrafted Brass Peacock Diya Set"
    },
    "economics": {
      "monthlyRevenue": 84000,
      "monthlyExpenses": 50400,
      "monthlyProfit": 33600,
      "margin": 35,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p55",
        "name": "Moradabadi Handcrafted Brass Peacock Diya Set",
        "price": 2350,
        "materials": "Pure Brass Alloy",
        "dimensions": "8 inches height each",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "description": "Pair of traditional Moradabadi brass diyas with sculpted peacock crests and deep oil bowls. Ideal for festive gifting, corporate orders, and luxury Indian home decor."
      },
      {
        "id": "p56",
        "name": "Hand-Etched Brass Serving Tray with Antique Finish",
        "price": 3100,
        "materials": "Solid Brass Sheet",
        "dimensions": "16 x 11 x 1.5 inches",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "description": "Heavy ornamental brass tray featuring arabesque Persian foliate borders and dual sculpted handles. Finished in warm antique bronze patina."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-027",
    "legacyId": "artisan-27",
    "code": "ART-027",
    "pehchanId": "UP-SAH-CAR-3318",
    "giRegistrationNo": "GI-AU-2015-6604",
    "name": "Ram Dayal",
    "photo": "/images/avatars/artisan-27.svg",
    "avatarUrl": "/images/avatars/artisan-27.svg",
    "craft": "Wood Carving",
    "category": "Wood Carving",
    "location": "Saharanpur, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "district": "Saharanpur",
    "cluster": "Saharanpur Wood Carving Megacluster",
    "specialization": "Intricate perforated jali screens, decorative boxes, and coffee table panels",
    "experience": "25 Years of Sheesham Carving",
    "experienceYears": 25,
    "capacity": "70 pieces/month",
    "capacityPerMonth": 70,
    "fulfillmentDays": 12,
    "averageFulfillmentDays": 12,
    "phone": "+91 98398 XXXXX",
    "email": "ram.dayal@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Vishwa Karma Woodworkers Union",
    "bio": "Carves seasoned Sheesham and mango wood with botanical fretwork and brass wire inlays for export-grade furniture accents.",
    "skills": [
      "Loom Fretsaw Jali Cutting",
      "Relief Floral Carving",
      "Brass Tarkashi Inlay",
      "Beeswax Hand Buffing"
    ],
    "certifications": [
      "Saharanpur Wood Craft GI Holder",
      "FSC Certified Sustainably Sourced Wood"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2015-6604)",
      "shgStatus": "Active (Vishwa Karma Woodworkers Union)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 77000,
      "monthlyCost": 46200,
      "monthlyProfit": 30800,
      "profitMargin": 38,
      "activeListings": 2,
      "inquiriesReceived": 29,
      "ordersConverted": 12,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 86,
      "topProduct": "Saharanpur Sheesham Wood Folding Screen"
    },
    "economics": {
      "monthlyRevenue": 77000,
      "monthlyExpenses": 46200,
      "monthlyProfit": 30800,
      "margin": 38,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p57",
        "name": "Saharanpur Sheesham Wood Folding Screen",
        "price": 14500,
        "materials": "100% Solid Sheesham Wood",
        "dimensions": "72 inches height x 60 inches width (3 Panels of 20 inches)",
        "craftCategory": "Woodcraft",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Masterwork 3-panel folding screen hand-carved with delicate floral jaali patterns. Solid brass hinges allowing two-way folding. Finished in warm natural walnut polish."
      },
      {
        "id": "p58",
        "name": "Sheesham Wood Jali Coaster Set with Holder",
        "price": 450,
        "materials": "Seasoned Sheesham Wood",
        "dimensions": "4 x 4 inches each coaster",
        "craftCategory": "Woodcraft",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 6 geometric latticework coasters housed in a custom-slotted caddy box. Heat resistant and moisture protected with organic wax."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-028",
    "legacyId": "artisan-28",
    "code": "ART-028",
    "pehchanId": "UK-ALM-AIP-1109",
    "giRegistrationNo": "GI-AU-2021-4401",
    "name": "Sunita Negi",
    "photo": "/images/avatars/artisan-28.svg",
    "avatarUrl": "/images/avatars/artisan-28.svg",
    "craft": "Aipan Folk Art",
    "category": "Painting & Wall Art",
    "location": "Almora, Uttarakhand",
    "state": "Uttarakhand",
    "district": "Almora",
    "cluster": "Kumaon Aipan Cluster",
    "specialization": "Rice paste geometric motifs on red ochre (Geru) wooden boards and textiles",
    "experience": "13 Years of Ritual Folk Painting",
    "experienceYears": 13,
    "capacity": "40 pieces/month",
    "capacityPerMonth": 40,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 94120 XXXXX",
    "email": "sunita.negi@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Kumaoni Mahila Kala Kendra",
    "bio": "Transfers spiritual Himalayan door-threshold Aipan blessings into contemporary wooden coasters, wall panels, and silk stoles.",
    "skills": [
      "Geru Ochre Base Coating",
      "Freehand Rice Paste Drawing",
      "Chowki Mandala Symmetry",
      "Eco Acrylic Sealing"
    ],
    "certifications": [
      "Uttarakhand Aipan GI Tag User",
      "Himalayan Handicrafts Registered"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2021-4401)",
      "shgStatus": "Active (Kumaoni Mahila Kala Kendra)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 32000,
      "monthlyCost": 19200,
      "monthlyProfit": 12800,
      "profitMargin": 44,
      "activeListings": 2,
      "inquiriesReceived": 14,
      "ordersConverted": 6,
      "conversionRate": 40,
      "trustScore": 90,
      "rating": 4.8,
      "reviewCount": 41,
      "topProduct": "Kumaoni Traditional Aipan Art Wooden Pooja Chowki"
    },
    "economics": {
      "monthlyRevenue": 32000,
      "monthlyExpenses": 19200,
      "monthlyProfit": 12800,
      "margin": 44,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p59",
        "name": "Kumaoni Traditional Aipan Art Wooden Pooja Chowki",
        "price": 1750,
        "materials": "Pine Wood, Geru & Rice Pigment",
        "dimensions": "12 x 12 x 3.5 inches",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified sacred ritual low stool from the Kumaon hills. Painted with vermilion geru background and white rice paste geometric motifs symbolizing divine blessings."
      },
      {
        "id": "p60",
        "name": "Aipan Hand-Painted Terracotta Diya Plate & Thali Set",
        "price": 780,
        "materials": "Earthen Clay, Eco Acrylic Colors",
        "dimensions": "9.5 inches diameter thali with 4 matching diyas",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "description": "Festive pooja set adorned with sacred Kumaoni motifs. Durable water-resistant sealant protects colors during ceremonial aarti washes."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-029",
    "legacyId": "artisan-29",
    "code": "ART-029",
    "pehchanId": "HP-KUL-SHA-8819",
    "giRegistrationNo": "GI-AU-2006-1108",
    "name": "Prem Chand",
    "photo": "/images/avatars/artisan-29.svg",
    "avatarUrl": "/images/avatars/artisan-29.svg",
    "craft": "Kullu Handwoven Shawls",
    "category": "Handloom Textiles",
    "location": "Shamshi, Kullu, Himachal Pradesh",
    "state": "Himachal Pradesh",
    "district": "Kullu",
    "cluster": "Kullu Valley Weavers Megacluster",
    "specialization": "Pure Merino and Angora wool shawls with vibrant geometric border bands",
    "experience": "21 Years of Woolen Looms",
    "experienceYears": 21,
    "capacity": "50 pieces/month",
    "capacityPerMonth": 50,
    "fulfillmentDays": 11,
    "averageFulfillmentDays": 11,
    "phone": "+91 94180 XXXXX",
    "email": "prem.chand@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Bhutti Weavers Co-op Society",
    "bio": "Weaves lightweight, warm Himalayan wool shawls featuring 8-colored dovetailed tapestry borders influenced by Central Asian migration.",
    "skills": [
      "Fly Shuttle Frame Loom",
      "Dovetail Tapestry Weave",
      "Angora Blend Finishing",
      "Pure Wool Grading"
    ],
    "certifications": [
      "Kullu Shawl GI Tag Registered User",
      "Woolmark Certified",
      "Handloom Mark"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2006-1108)",
      "shgStatus": "Active (Bhutti Weavers Co-op Society)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 69000,
      "monthlyCost": 41400,
      "monthlyProfit": 27600,
      "profitMargin": 37,
      "activeListings": 2,
      "inquiriesReceived": 26,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 94,
      "rating": 4.9,
      "reviewCount": 89,
      "topProduct": "Kullu Pure Merino Wool Shawl"
    },
    "economics": {
      "monthlyRevenue": 69000,
      "monthlyExpenses": 41400,
      "monthlyProfit": 27600,
      "margin": 37,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p61",
        "name": "Kullu Pure Merino Wool Shawl",
        "price": 3600,
        "materials": "Pure Merino Wool",
        "dimensions": "40 x 84 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Authentic GI-tagged Kullu shawl woven on handloom with traditional geometric patterned borders inspired by snow peaks, pine trees, and Himalayan rivers."
      },
      {
        "id": "p62",
        "name": "Kullu Hand-Knitted Angora Wool Muffler & Beanie Set",
        "price": 1350,
        "materials": "Angora & Lambswool Blend",
        "dimensions": "Muffler: 10 x 65 inches, Beanie: Free Size Stretch",
        "craftCategory": "Hand Knitting",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Ultra-soft, cloud-like winter set knitted by Himalayan women cooperatives. Incredible thermal warmth with lightweight feel."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-030",
    "legacyId": "artisan-30",
    "code": "ART-030",
    "pehchanId": "JK-SRI-CARV-7711",
    "giRegistrationNo": "GI-AU-2018-9921",
    "name": "Abdul Rahman",
    "photo": "/images/avatars/artisan-30.svg",
    "avatarUrl": "/images/avatars/artisan-30.svg",
    "craft": "Walnut Wood Carving",
    "category": "Wood Carving",
    "location": "Downtown Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "district": "Srinagar",
    "cluster": "Kashmir Walnut Wood Carving Cluster",
    "specialization": "Deep relief floral undercut work on seasoned walnut root wood boxes and screens",
    "experience": "27 Years of Master Woodcraft",
    "experienceYears": 27,
    "capacity": "35 pieces/month",
    "capacityPerMonth": 35,
    "fulfillmentDays": 18,
    "averageFulfillmentDays": 18,
    "phone": "+91 94190 XXXXX",
    "email": "abdul.rahman@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Carves natural fallen Juglans Regia walnut wood seasoned for 3 years, sculpting grapevines, chinar leaves, and dragon motifs with 30 varieties of steel gouges.",
    "skills": [
      "Sun-Relief Carving",
      "Undercutting Technique",
      "Root Grain Selection",
      "Agate Stone Dry Friction Buffing"
    ],
    "certifications": [
      "GI Tag Certified (GI-AU-2018-9921)",
      "J&K Directorate of Handicrafts Master Craftsman"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2018-9921)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 89000,
      "monthlyCost": 53400,
      "monthlyProfit": 35600,
      "profitMargin": 42.5,
      "activeListings": 2,
      "inquiriesReceived": 27,
      "ordersConverted": 11,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.9,
      "reviewCount": 88,
      "topProduct": "Kashmiri Hand-Carved Walnut Wood Box"
    },
    "economics": {
      "monthlyRevenue": 89000,
      "monthlyExpenses": 53400,
      "monthlyProfit": 35600,
      "margin": 42.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p63",
        "name": "Kashmiri Hand-Carved Walnut Wood Box",
        "price": 4650,
        "materials": "100% Solid Walnut Wood",
        "dimensions": "9 x 6 x 3.5 inches",
        "craftCategory": "Woodcraft",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Finely sculpted keepsake box made from 30-year seasoned Kashmiri walnut wood with velvet lining. Features traditional multi-layered Chinar leaf relief work buffed with natural beeswax."
      },
      {
        "id": "p64",
        "name": "Sculpted Kashmiri Walnut Wood Fruit Bowl",
        "price": 6200,
        "materials": "Solid Walnut Root Wood",
        "dimensions": "12 inches diameter x 5 inches depth",
        "craftCategory": "Woodcraft",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Carved from a single log piece without glued joints. Interlaced blooming roses, grapes, and dragon relief work with a scalloped pedestal base."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-031",
    "legacyId": "artisan-31",
    "code": "ART-031",
    "pehchanId": "JK-SRI-PAS-1120",
    "giRegistrationNo": "GI-AU-2009-4412",
    "name": "Ghulam Rasool Mir",
    "photo": "/images/avatars/artisan-31.svg",
    "avatarUrl": "/images/avatars/artisan-31.svg",
    "craft": "Pashmina & Sozni Embroidery",
    "category": "Hand Embroidery",
    "location": "Hawal, Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "district": "Srinagar",
    "cluster": "Old Srinagar Shawl Weaving Cluster",
    "specialization": "Pure Changthangi pashmina shawls with double-sided Jamawar Sozni needlecraft",
    "experience": "30 Years of Needlework",
    "experienceYears": 30,
    "capacity": "12 pieces/month",
    "capacityPerMonth": 12,
    "fulfillmentDays": 28,
    "averageFulfillmentDays": 28,
    "phone": "+91 94192 XXXXX",
    "email": "ghulam.mir@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Spins and weaves certified 12-14 micron cashmere wool on delicate wooden looms, embroidered with microscopic needle stitches.",
    "skills": [
      "Cashmere Dehairing",
      "Hand Spinning on Yinder",
      "Sozni Needlepoint",
      "Hand-Twisted Fringe Fraying"
    ],
    "certifications": [
      "Kashmir Pashmina GI Tagged with Microchip Secure Label",
      "National Master Artisan"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2009-4412)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 125000,
      "monthlyCost": 75000,
      "monthlyProfit": 50000,
      "profitMargin": 45,
      "activeListings": 2,
      "inquiriesReceived": 24,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 98,
      "rating": 5,
      "reviewCount": 96,
      "topProduct": "Pure Kashmiri Pashmina Shawl with Sozni Needlework"
    },
    "economics": {
      "monthlyRevenue": 125000,
      "monthlyExpenses": 75000,
      "monthlyProfit": 50000,
      "margin": 45,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p65",
        "name": "Pure Kashmiri Pashmina Shawl with Sozni Needlework",
        "price": 26500,
        "materials": "GI Certified Changthangi Pashmina",
        "dimensions": "40 x 80 inches",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified pure Kashmiri Pashmina shawl passing through the traditional ring test. Hand-embroidered with minute single-needle Sozni floral border over 2 months."
      },
      {
        "id": "p66",
        "name": "Semi-Pashmina Fine Wool Stole with Floral Sozni",
        "price": 7200,
        "materials": "Pashmina-Merino Wool Blend",
        "dimensions": "28 x 80 inches",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Soft and lightweight stole featuring all-around Badam paisleys and floral vines embroidered by Srinagar needlecraft masters."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-032",
    "legacyId": "artisan-32",
    "code": "ART-032",
    "pehchanId": "JK-BUD-PAP-4491",
    "giRegistrationNo": "GI-AU-2011-3310",
    "name": "Bashir Ahmad Wani",
    "photo": "/images/avatars/artisan-32.svg",
    "avatarUrl": "/images/avatars/artisan-32.svg",
    "craft": "Paper Mache Art",
    "category": "Decorative Crafts",
    "location": "Zadibal, Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "district": "Srinagar",
    "cluster": "Kashmir Paper Mache Cluster",
    "specialization": "Handcrafted pulp boxes, baubles, and vases painted with gold dust and miniature floral jaals",
    "experience": "22 Years of Sakhtsazi & Naqashi",
    "experienceYears": 22,
    "capacity": "80 pieces/month",
    "capacityPerMonth": 80,
    "fulfillmentDays": 10,
    "averageFulfillmentDays": 10,
    "phone": "+91 94194 XXXXX",
    "email": "bashir.wani@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Kashmir Craftsman Guild",
    "bio": "Moulds recycled wastepaper and rice glue into smooth lightweight bases, then paints Gul-i-Vilayat flora in pure gold and vibrant gouache.",
    "skills": [
      "Pulp Moulding (Sakhtsazi)",
      "Gesso Priming",
      "Gold Leaf Dusting",
      "Clear Copal Varnishing"
    ],
    "certifications": [
      "Kashmir Paper Mache GI Tag Registry",
      "Craftmark Verified"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2011-3310)",
      "shgStatus": "Active (Kashmir Craftsman Guild)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 53000,
      "monthlyCost": 31800,
      "monthlyProfit": 21200,
      "profitMargin": 44,
      "activeListings": 2,
      "inquiriesReceived": 21,
      "ordersConverted": 8,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 67,
      "topProduct": "Kashmiri Papier-Mâché Trinket Box with 24K Gold"
    },
    "economics": {
      "monthlyRevenue": 53000,
      "monthlyExpenses": 31800,
      "monthlyProfit": 21200,
      "margin": 44,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p67",
        "name": "Kashmiri Papier-Mâché Trinket Box with 24K Gold",
        "price": 1850,
        "materials": "Recycled Paper Pulp, Mineral Colors, Gold Leaf",
        "dimensions": "6 x 4 x 2.8 inches",
        "craftCategory": "Papier-Mache",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Handmade papier-mâché jewelry box layered with Persian Gul-andar-Gul (flowers within flowers) motifs in lapis lazuli, turquoise, and pure 24K gold foil."
      },
      {
        "id": "p68",
        "name": "Kashmiri Papier-Mâché Christmas Bauble Ornaments",
        "price": 1200,
        "materials": "Pulp Core, Metallic Inks",
        "dimensions": "3 inches diameter each (Set of 6)",
        "craftCategory": "Papier-Mache",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Pack of 6 shatterproof hanging ornaments popular worldwide for Christmas trees, festive garlands, and luxury gift wrapping."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-033",
    "legacyId": "artisan-33",
    "code": "ART-033",
    "pehchanId": "PB-PAT-PHU-6610",
    "giRegistrationNo": "GI-AU-2011-8899",
    "name": "Harpreet Kaur",
    "photo": "/images/avatars/artisan-33.svg",
    "avatarUrl": "/images/avatars/artisan-33.svg",
    "craft": "Phulkari Hand Embroidery",
    "category": "Hand Embroidery",
    "location": "Nabha, Patiala, Punjab",
    "state": "Punjab",
    "district": "Patiala",
    "cluster": "Malwa Phulkari Cluster",
    "specialization": "Bagh and Chope heavy silk floss embroidery on coarse hand-spun Khaddar",
    "experience": "15 Years of Darn-Stitch Embroidery",
    "experienceYears": 15,
    "capacity": "35 pieces/month",
    "capacityPerMonth": 35,
    "fulfillmentDays": 15,
    "averageFulfillmentDays": 15,
    "phone": "+91 98140 XXXXX",
    "email": "harpreet.kaur@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Sanjhi Virasat Mahila Samiti",
    "bio": "Stitches from the reverse side of handloom khaddar using untwisted silk floss (Pat), counting every single thread to create seamless geometric baghs.",
    "skills": [
      "Counted Thread Darn Stitch",
      "Silk Pat Handling",
      "Khaddar Fabric Prep",
      "Mirror Accenting"
    ],
    "certifications": [
      "Phulkari GI Tag Registered Artisan",
      "Punjab State Handicraft Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2011-8899)",
      "shgStatus": "Active (Sanjhi Virasat Mahila Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 46000,
      "monthlyCost": 27600,
      "monthlyProfit": 18400,
      "profitMargin": 39,
      "activeListings": 2,
      "inquiriesReceived": 18,
      "ordersConverted": 7,
      "conversionRate": 40,
      "trustScore": 91,
      "rating": 4.8,
      "reviewCount": 58,
      "topProduct": "Traditional Bagh Phulkari Georgette Dupatta"
    },
    "economics": {
      "monthlyRevenue": 46000,
      "monthlyExpenses": 27600,
      "monthlyProfit": 18400,
      "margin": 39,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p69",
        "name": "Traditional Bagh Phulkari Georgette Dupatta",
        "price": 4800,
        "materials": "Georgette, Untwisted Pat Silk",
        "dimensions": "42 x 96 inches",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified 'Bagh' (garden) style Phulkari where embroidery completely covers the base cloth in radiant gold, magenta, and peacock blue geometric motifs."
      },
      {
        "id": "p70",
        "name": "Hand-Embroidered Phulkari Clutch Purse",
        "price": 1450,
        "materials": "Raw Silk, Metal Clasp",
        "dimensions": "8 x 5 x 2.5 inches",
        "craftCategory": "Embroidery",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Statement evening clutch bag featuring vivid geometric Phulkari needlework. Complete with detachable antique gold link chain."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-034",
    "legacyId": "artisan-34",
    "code": "ART-034",
    "pehchanId": "HR-JHA-POT-2210",
    "giRegistrationNo": "GI-AU-2022-1109",
    "name": "Satish Kumar",
    "photo": "/images/avatars/artisan-34.svg",
    "avatarUrl": "/images/avatars/artisan-34.svg",
    "craft": "Terracotta Clay Pottery",
    "category": "Pottery & Ceramics",
    "location": "Beri, Jhajjar, Haryana",
    "state": "Haryana",
    "district": "Jhajjar",
    "cluster": "Haryana Rural Pottery Cluster",
    "specialization": "Porous water matkas, eco-friendly curd handis, and unglazed tawa plates",
    "experience": "18 Years of Clay Wheel Craft",
    "experienceYears": 18,
    "capacity": "200 pieces/month",
    "capacityPerMonth": 200,
    "fulfillmentDays": 6,
    "averageFulfillmentDays": 6,
    "phone": "+91 98120 XXXXX",
    "email": "satish.kumar@karigarsetu.in",
    "giCertified": false,
    "shgMember": true,
    "shgName": "Mati Kala Sahayog",
    "bio": "Shapes healthy unglazed clay cookware using purified clay mined from local rain ponds, naturally cooling water and food without electricity.",
    "skills": [
      "Heavy Wheel Throwing",
      "Paddle Beating for Thinness",
      "Red Slip Burnishing",
      "Open Pit Firing"
    ],
    "certifications": [
      "Central Mati Kala Board Empaneled",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "not applicable",
      "giStatus": "Standard Artisan Cluster Registered",
      "shgStatus": "Active (Mati Kala Sahayog)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 37000,
      "monthlyCost": 22200,
      "monthlyProfit": 14800,
      "profitMargin": 35,
      "activeListings": 2,
      "inquiriesReceived": 15,
      "ordersConverted": 6,
      "conversionRate": 40,
      "trustScore": 82,
      "rating": 4.7,
      "reviewCount": 44,
      "topProduct": "Hand-Thrown Earthen Water Matka with Brass Spigot"
    },
    "economics": {
      "monthlyRevenue": 37000,
      "monthlyExpenses": 22200,
      "monthlyProfit": 14800,
      "margin": 35,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p71",
        "name": "Hand-Thrown Earthen Water Matka with Brass Spigot",
        "price": 850,
        "materials": "Natural Earthen Clay, Brass Tap",
        "dimensions": "11 inches diameter x 13 inches height (8-Litre Capacity)",
        "craftCategory": "Clay Pottery",
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "description": "Naturally cools drinking water by up to 5 degrees Celsius via evaporation. Fitted with a food-grade solid brass leak-proof spigot and clay saucer stand."
      },
      {
        "id": "p72",
        "name": "Terracotta Indoor Herb Planters Trio",
        "price": 620,
        "materials": "Porous Clay",
        "dimensions": "4.5 inches height x 4.5 inches diameter each",
        "craftCategory": "Clay Pottery",
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "description": "Breathable clay plant pots that promote healthy root aeration and prevent root rot. Comes with a matching oval clay drip tray for windowsill gardening."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-035",
    "legacyId": "artisan-35",
    "code": "ART-035",
    "pehchanId": "MH-PAL-WAR-3301",
    "giRegistrationNo": "GI-AU-2014-6621",
    "name": "Nirmala Patil",
    "photo": "/images/avatars/artisan-35.svg",
    "avatarUrl": "/images/avatars/artisan-35.svg",
    "craft": "Warli Folk Art",
    "category": "Painting & Wall Art",
    "location": "Dahanu, Palghar, Maharashtra",
    "state": "Maharashtra",
    "district": "Palghar",
    "cluster": "North Konkan Warli Tribal Cluster",
    "specialization": "Rice paste circular Tarpa dance, harvest, and sacred mother goddess motifs",
    "experience": "16 Years of Tribal Mural Art",
    "experienceYears": 16,
    "capacity": "45 pieces/month",
    "capacityPerMonth": 45,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 98200 XXXXX",
    "email": "nirmala.patil@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Adivasi Ekta Mahila Mandal",
    "bio": "Paints the sacred geometry of circle, triangle, and square on cow-dung and geru-plastered surfaces using bamboo sticks and rice paste.",
    "skills": [
      "Rice Paste Formulation",
      "Chewed Bamboo Brushwork",
      "Tarpa Dance Spiral Geometry",
      "Canvas Stretched Murals"
    ],
    "certifications": [
      "Warli Painting GI Tag Authorized Artisan",
      "Maharashtra State Tribal Art Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2014-6621)",
      "shgStatus": "Active (Adivasi Ekta Mahila Mandal)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 51000,
      "monthlyCost": 30600,
      "monthlyProfit": 20400,
      "profitMargin": 46,
      "activeListings": 2,
      "inquiriesReceived": 26,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.9,
      "reviewCount": 77,
      "topProduct": "Warli Tarpa Dance Folk Painting on Canvas"
    },
    "economics": {
      "monthlyRevenue": 51000,
      "monthlyExpenses": 30600,
      "monthlyProfit": 20400,
      "margin": 46,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p73",
        "name": "Warli Tarpa Dance Folk Painting on Canvas",
        "price": 2900,
        "materials": "Canvas, Geru Earth, Rice Paste",
        "dimensions": "20 x 28 inches (Stretched Canvas)",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Warli tribal art illustrating the spiral Tarpa dance where villagers hold hands in unity around the village horn player. Pure geometric folk harmony."
      },
      {
        "id": "p74",
        "name": "Warli Hand-Painted Terracotta Vase",
        "price": 890,
        "materials": "Earthenware Clay, Eco White Paint",
        "dimensions": "5.5 inches diameter x 10 inches height",
        "craftCategory": "Folk Painting",
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "description": "Elegant accent vase featuring musicians, farmers, and deer running across the terracotta body. Clear matte protective varnish."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-036",
    "legacyId": "artisan-36",
    "code": "ART-036",
    "pehchanId": "MH-KOL-LEA-8814",
    "giRegistrationNo": "GI-AU-2019-1140",
    "name": "Tukaram Shinde",
    "photo": "/images/avatars/artisan-36.svg",
    "avatarUrl": "/images/avatars/artisan-36.svg",
    "craft": "Kolhapuri Chappal",
    "category": "Leather Craft",
    "location": "Subhashnagar, Kolhapur, Maharashtra",
    "state": "Maharashtra",
    "district": "Kolhapur",
    "cluster": "Kolhapur Leather Cluster",
    "specialization": "Authentic braid-woven buffalo leather chappals with natural dye and wooden pegs",
    "experience": "24 Years of Vegetable Leather Craft",
    "experienceYears": 24,
    "capacity": "85 pairs/month",
    "capacityPerMonth": 85,
    "fulfillmentDays": 7,
    "averageFulfillmentDays": 7,
    "phone": "+91 98202 XXXXX",
    "email": "tukaram.shinde@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Kolhapur Charmakar Audyogik Sanstha",
    "bio": "Hardens natural bag-tanned leather with babul bark extracts and braids straps without nails or metal fasteners for lifetime durability.",
    "skills": [
      "Babul Bark Leather Curing",
      "Hand Braided Straps",
      "Leather Sole Cord Stitching",
      "Mustard Oil Polishing"
    ],
    "certifications": [
      "Kolhapuri Chappal GI Tagged User",
      "LIDCOM Certified Master Artisan"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2019-1140)",
      "shgStatus": "Active (Kolhapur Charmakar Audyogik Sanstha)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 57000,
      "monthlyCost": 34200,
      "monthlyProfit": 22800,
      "profitMargin": 36,
      "activeListings": 2,
      "inquiriesReceived": 25,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 91,
      "topProduct": "Vegetable-Tanned Leather Kolhapuri Chappal"
    },
    "economics": {
      "monthlyRevenue": 57000,
      "monthlyExpenses": 34200,
      "monthlyProfit": 22800,
      "margin": 36,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p75",
        "name": "Vegetable-Tanned Leather Kolhapuri Chappal",
        "price": 1750,
        "materials": "100% Genuine Leather",
        "dimensions": "Available in UK/India Sizes 6 to 11 (Men/Unisex)",
        "craftCategory": "Leather Craft",
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "description": "GI-tagged artisanal Kolhapuri sandal made with hand-plaited braided straps and signature toe-ring. Naturally tanned without chromium chemicals."
      },
      {
        "id": "p76",
        "name": "Braided Leather Festive Kolhapuri with Zari Pompom",
        "price": 2350,
        "materials": "Buff Leather, Zari Pompom",
        "dimensions": "Sizes 5 to 11 Unisex",
        "craftCategory": "Leather Craft",
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "description": "Wedding and festive edition Kolhapuri with soft cushioned insole and traditional hand-twirled golden zari tassel over the instep band."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-037",
    "legacyId": "artisan-37",
    "code": "ART-037",
    "pehchanId": "MH-PAI-SLK-5520",
    "giRegistrationNo": "GI-AU-2010-7711",
    "name": "Eknathrao Kulkarni",
    "photo": "/images/avatars/artisan-37.svg",
    "avatarUrl": "/images/avatars/artisan-37.svg",
    "craft": "Paithani Silk Weaving",
    "category": "Handloom Textiles",
    "location": "Paithan, Chhatrapati Sambhaji Nagar, Maharashtra",
    "state": "Maharashtra",
    "district": "Chhatrapati Sambhaji Nagar",
    "cluster": "Paithan Heritage Handloom Cluster",
    "specialization": "Mor-bangadi (peacock in bangle) and Asawali pure gold zari tapestry pallus",
    "experience": "26 Years of Royal Tapestry Weaving",
    "experienceYears": 26,
    "capacity": "15 pieces/month",
    "capacityPerMonth": 15,
    "fulfillmentDays": 24,
    "averageFulfillmentDays": 24,
    "phone": "+91 98204 XXXXX",
    "email": "eknath.kulkarni@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Known as the 'Queen of Sarees', weaving fine mulberry silk with solid gold zari pallus using interlocking tapestry shuttle technique.",
    "skills": [
      "Interlocking Tapestry Weave",
      "Real Gold Zari Pallu",
      "Peacock Medallion Geometry",
      "Oblique Border Interlock"
    ],
    "certifications": [
      "Paithani Saree GI Tag Holder",
      "Sant Kabir National Handloom Awardee"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2010-7711)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 98000,
      "monthlyCost": 58800,
      "monthlyProfit": 39200,
      "profitMargin": 38,
      "activeListings": 2,
      "inquiriesReceived": 19,
      "ordersConverted": 8,
      "conversionRate": 40,
      "trustScore": 96,
      "rating": 5,
      "reviewCount": 80,
      "topProduct": "Yeola Pure Silk Paithani Saree with Mor Pallu"
    },
    "economics": {
      "monthlyRevenue": 98000,
      "monthlyExpenses": 58800,
      "monthlyProfit": 39200,
      "margin": 38,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p77",
        "name": "Yeola Pure Silk Paithani Saree with Mor Pallu",
        "price": 24000,
        "materials": "Pure Silk, Gold Plated Zari",
        "dimensions": "5.5 meters saree + 0.8 meter blouse piece",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "The Queen of Silks. GI-certified Paithani saree handwoven over 20 days. Features opulent oblique square border and magnificent multi-colored dancing peacocks (Mor) on the solid gold tissue pallu."
      },
      {
        "id": "p78",
        "name": "Pure Silk Paithani Stole with Peacock Motifs",
        "price": 6800,
        "materials": "Mulberry Silk, Zari",
        "dimensions": "28 x 82 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Contemporary luxury stole carrying the regal heritage of the Peshwas. Features shimmering gold tissue ends with woven singing birds and peacocks."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-038",
    "legacyId": "artisan-38",
    "code": "ART-038",
    "pehchanId": "GA-SAL-COC-4401",
    "giRegistrationNo": "GI-AU-2022-5509",
    "name": "Francis Fernandes",
    "photo": "/images/avatars/artisan-38.svg",
    "avatarUrl": "/images/avatars/artisan-38.svg",
    "craft": "Coconut Shell & Coir Craft",
    "category": "Decorative Crafts",
    "location": "Benaulim, Salcete, Goa",
    "state": "Goa",
    "district": "South Goa",
    "cluster": "Goa Coastal Shell Craft Cluster",
    "specialization": "Carved coconut shell bowls, cutlery, pendant lamps, and coir planters",
    "experience": "14 Years of Eco-Shell Carving",
    "experienceYears": 14,
    "capacity": "90 pieces/month",
    "capacityPerMonth": 90,
    "fulfillmentDays": 7,
    "averageFulfillmentDays": 7,
    "phone": "+91 98220 XXXXX",
    "email": "francis.f@karigarsetu.in",
    "giCertified": false,
    "shgMember": true,
    "shgName": "Mandovi Eco Crafts Guild",
    "bio": "Upcycles discarded hard coconut shells into sleek zero-waste tableware finished with food-grade virgin coconut oil.",
    "skills": [
      "Shell Deseaming & Sanding",
      "Fretsaw Piercing",
      "Wood Base Fitting",
      "Natural Coconut Oil Buffing"
    ],
    "certifications": [
      "Goa Handicrafts Development Corporation Empaneled",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "not applicable",
      "giStatus": "Standard Artisan Cluster Registered",
      "shgStatus": "Active (Mandovi Eco Crafts Guild)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 39000,
      "monthlyCost": 23400,
      "monthlyProfit": 15600,
      "profitMargin": 45,
      "activeListings": 2,
      "inquiriesReceived": 16,
      "ordersConverted": 6,
      "conversionRate": 40,
      "trustScore": 84,
      "rating": 4.7,
      "reviewCount": 52,
      "topProduct": "Polished Coconut Shell Breakfast Bowls Set"
    },
    "economics": {
      "monthlyRevenue": 39000,
      "monthlyExpenses": 23400,
      "monthlyProfit": 15600,
      "margin": 45,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p79",
        "name": "Polished Coconut Shell Breakfast Bowls Set",
        "price": 720,
        "materials": "100% Upcycled Coconut Shell, Neem Wood",
        "dimensions": "5.5 inches diameter x 3 inches height each (Set of 4)",
        "craftCategory": "Eco Craft",
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "description": "Zero-waste smoothie and salad bowls handcrafted from reclaimed Goan coconut shells. 100% food-safe, organic, and free of artificial lacquers."
      },
      {
        "id": "p80",
        "name": "Hand-Braided Coir & Coconut Shell Table Runner",
        "price": 950,
        "materials": "Coir Rope, Coconut Shell",
        "dimensions": "14 x 54 inches",
        "craftCategory": "Eco Craft",
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "description": "Heat-insulating dining runner woven with durable golden coir yarns and adorned with lustrous polished coconut disc buttons."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-039",
    "legacyId": "artisan-39",
    "code": "ART-039",
    "pehchanId": "KA-MYS-INL-8822",
    "giRegistrationNo": "GI-AU-2005-1102",
    "name": "Lingarajacharya",
    "photo": "/images/avatars/artisan-39.svg",
    "avatarUrl": "/images/avatars/artisan-39.svg",
    "craft": "Rosewood Inlay",
    "category": "Wood Carving",
    "location": "Mandi Mohalla, Mysore, Karnataka",
    "state": "Karnataka",
    "district": "Mysore",
    "cluster": "Mysore Rosewood Inlay Cluster",
    "specialization": "Floral, landscape, and Mysore Dasara procession inlays on seasoned rosewood",
    "experience": "29 Years of Inlay Craft",
    "experienceYears": 29,
    "capacity": "40 pieces/month",
    "capacityPerMonth": 40,
    "fulfillmentDays": 14,
    "averageFulfillmentDays": 14,
    "phone": "+91 98450 XXXXX",
    "email": "lingaraj.acharya@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Inlaying natural colored woods like jackfruit, silver oak, and rubberwood into seasoned rosewood furniture panels without synthetic pigments.",
    "skills": [
      "Relief Wood Inlay Chiseling",
      "Multi-Wood Tone Profiling",
      "Bone-Substitute Cutting",
      "French Spirit Polishing"
    ],
    "certifications": [
      "Mysore Rosewood Inlay GI Authorized User",
      "Karnataka State Crafts Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2005-1102)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 82000,
      "monthlyCost": 49200,
      "monthlyProfit": 32800,
      "profitMargin": 41,
      "activeListings": 2,
      "inquiriesReceived": 28,
      "ordersConverted": 11,
      "conversionRate": 40,
      "trustScore": 95,
      "rating": 4.9,
      "reviewCount": 95,
      "topProduct": "Mysore Rosewood Inlay Wall Art Panel"
    },
    "economics": {
      "monthlyRevenue": 82000,
      "monthlyExpenses": 49200,
      "monthlyProfit": 32800,
      "margin": 41,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p81",
        "name": "Mysore Rosewood Inlay Wall Art Panel",
        "price": 8600,
        "materials": "Pure Rosewood, Natural Colored Wood Veneers",
        "dimensions": "24 x 36 inches framed in solid rosewood border",
        "craftCategory": "Wood Inlay",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Mysore Rosewood Inlay depicting the world-famous Dasara procession with the golden howdah atop the royal elephant. Created using 12 natural shades of wood with zero chemical dyes."
      },
      {
        "id": "p82",
        "name": "Rosewood Inlaid Keepsake Coaster Set",
        "price": 1650,
        "materials": "Rosewood, Hardwood Inlays",
        "dimensions": "4.2 inches diameter each with solid caddy",
        "craftCategory": "Wood Inlay",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Luxury wooden coaster set featuring delicate dancing peacocks and blooming jasmine buds flush-inlaid into dark rosewood discs."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-040",
    "legacyId": "artisan-40",
    "code": "ART-040",
    "pehchanId": "KA-KOP-KIN-3391",
    "giRegistrationNo": "GI-AU-2012-7710",
    "name": "Basavaraj Badiger",
    "photo": "/images/avatars/artisan-40.svg",
    "avatarUrl": "/images/avatars/artisan-40.svg",
    "craft": "Kinhal Wooden Toys",
    "category": "Traditional & Wooden Toys",
    "location": "Kinhal, Koppal, Karnataka",
    "state": "Karnataka",
    "district": "Koppal",
    "cluster": "Kinhal Heritage Toy Cluster",
    "specialization": "Lightweight Ponki wood idols, animals, and decorative palanquin birds",
    "experience": "19 Years of Chitragar Woodcraft",
    "experienceYears": 19,
    "capacity": "60 pieces/month",
    "capacityPerMonth": 60,
    "fulfillmentDays": 10,
    "averageFulfillmentDays": 10,
    "phone": "+91 98452 XXXXX",
    "email": "basavaraj.badiger@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Chitragar Karigar Sahakari",
    "bio": "Carves Ponki timber coated with a paste of tamarind seeds and jute fiber (Kitta), gilded with real silver foil and colored lacquers.",
    "skills": [
      "Softwood Jointing",
      "Kitta Paste Sculpting",
      "Silver Foil Sticking (Varak)",
      "Luminous Varnish Finishing"
    ],
    "certifications": [
      "Kinhal Toys GI Tag User",
      "Development Commissioner Handicrafts Certified"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2012-7710)",
      "shgStatus": "Active (Chitragar Karigar Sahakari)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 48000,
      "monthlyCost": 28800,
      "monthlyProfit": 19200,
      "profitMargin": 43,
      "activeListings": 2,
      "inquiriesReceived": 21,
      "ordersConverted": 8,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 64,
      "topProduct": "Handcrafted Kinhal Painted Wooden Cow & Calf"
    },
    "economics": {
      "monthlyRevenue": 48000,
      "monthlyExpenses": 28800,
      "monthlyProfit": 19200,
      "margin": 43,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p83",
        "name": "Handcrafted Kinhal Painted Wooden Cow & Calf",
        "price": 2100,
        "materials": "Polki Wood, Liquid Gold Paint",
        "dimensions": "8 x 5 x 7.5 inches",
        "craftCategory": "Toy & Doll Making",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified heritage craft originating from Vijayanagara empire artisans. Portrays sacred Kamadhenu with magnificent embossed relief blankets and gold accents."
      },
      {
        "id": "p84",
        "name": "Kinhal Traditional Lacquered Nesting Dolls",
        "price": 1350,
        "materials": "Polki Softwood, Non-Toxic Inks",
        "dimensions": "6 inches largest down to 1.5 inches smallest",
        "craftCategory": "Toy & Doll Making",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 5 nesting wooden figurines depicting traditional Karnataka royal court figures. Smooth non-toxic surfaces safe for display and family collections."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-041",
    "legacyId": "artisan-41",
    "code": "ART-041",
    "pehchanId": "KL-PAT-ARA-1101",
    "giRegistrationNo": "GI-AU-2003-1101",
    "name": "Sadasivan Achari",
    "photo": "/images/avatars/artisan-41.svg",
    "avatarUrl": "/images/avatars/artisan-41.svg",
    "craft": "Aranmula Metal Mirror",
    "category": "Metal Craft",
    "location": "Aranmula, Pathanamthitta, Kerala",
    "state": "Kerala",
    "district": "Pathanamthitta",
    "cluster": "Aranmula Heritage Bell Metal Cluster",
    "specialization": "Front-surface reflecting metal alloy mirrors mounted in brass filigree frames",
    "experience": "31 Years of Secret Alloy Casting",
    "experienceYears": 31,
    "capacity": "18 pieces/month",
    "capacityPerMonth": 18,
    "fulfillmentDays": 21,
    "averageFulfillmentDays": 21,
    "phone": "+91 98470 XXXXX",
    "email": "sadasivan.achari@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Casting the miraculous 100% distortion-free front-reflecting metal mirror using a family-secret copper and tin alloy, polished by hand with velvet cloth for days.",
    "skills": [
      "Secret Alloy Metallurgy",
      "Flat Mirror Disc Casting",
      "Velvet Emery Hand Polishing",
      "Brass Frame Casting"
    ],
    "certifications": [
      "India's 1st GI Tag Holder (GI-AU-2003-1101)",
      "Presidential Handicrafts Award"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2003-1101)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 95000,
      "monthlyCost": 57000,
      "monthlyProfit": 38000,
      "profitMargin": 48,
      "activeListings": 2,
      "inquiriesReceived": 20,
      "ordersConverted": 8,
      "conversionRate": 40,
      "trustScore": 98,
      "rating": 5,
      "reviewCount": 112,
      "topProduct": "Authentic Aranmula Kannadi Handcrafted Metal Mirror"
    },
    "economics": {
      "monthlyRevenue": 95000,
      "monthlyExpenses": 57000,
      "monthlyProfit": 38000,
      "margin": 48,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p85",
        "name": "Authentic Aranmula Kannadi Handcrafted Metal Mirror",
        "price": 21500,
        "materials": "Speculum Bell Metal Alloy, Cast Brass",
        "dimensions": "Mirror: 3 inches oval, Frame: 6 x 10 inches with Stand",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "description": "World-famous GI-tagged front-surface reflection mirror made entirely of metallurgical bell alloy without mercury or glass backing. Zero secondary refraction."
      },
      {
        "id": "p86",
        "name": "Aranmula Brass Desk Bell with Mirror-Alloy Crest",
        "price": 3400,
        "materials": "Cast Brass & Bell Metal",
        "dimensions": "4 inches diameter base x 8 inches height",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "description": "Acoustic temple ritual desk bell crowned with a hand-polished speculum metal reflective disc. Pure sacred ringing tone."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-042",
    "legacyId": "artisan-42",
    "code": "ART-042",
    "pehchanId": "KL-TRV-KAS-7740",
    "giRegistrationNo": "GI-AU-2010-8822",
    "name": "Madhavi Amma",
    "photo": "/images/avatars/artisan-42.svg",
    "avatarUrl": "/images/avatars/artisan-42.svg",
    "craft": "Kasavu Handloom Weaving",
    "category": "Handloom Textiles",
    "location": "Balaramapuram, Thiruvananthapuram, Kerala",
    "state": "Kerala",
    "district": "Thiruvananthapuram",
    "cluster": "Balaramapuram Handloom Weavers Cluster",
    "specialization": "Unbleached natural cotton Mundu, Neriyathu, and Kasavu sarees with gold zari border",
    "experience": "24 Years of Fine Cotton Weaving",
    "experienceYears": 24,
    "capacity": "50 pieces/month",
    "capacityPerMonth": 50,
    "fulfillmentDays": 9,
    "averageFulfillmentDays": 9,
    "phone": "+91 98472 XXXXX",
    "email": "madhavi.amma@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Balaramapuram Neythu Samiti",
    "bio": "Weaves cream-white unbleached fine count cotton on traditional throw-shuttle pit looms with pure gold and copper zari borders.",
    "skills": [
      "Superfine Cotton Sizing",
      "Jacquard Border Setting",
      "Throw Shuttle Operation",
      "Kerala Kasavu Finishing"
    ],
    "certifications": [
      "Balaramapuram Sarees GI Tag Registered",
      "Handloom Mark",
      "India Handloom Brand"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2010-8822)",
      "shgStatus": "Active (Balaramapuram Neythu Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 54000,
      "monthlyCost": 32400,
      "monthlyProfit": 21600,
      "profitMargin": 36,
      "activeListings": 2,
      "inquiriesReceived": 27,
      "ordersConverted": 11,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.8,
      "reviewCount": 78,
      "topProduct": "Balaramapuram Kasavu Cotton Saree Gold Zari"
    },
    "economics": {
      "monthlyRevenue": 54000,
      "monthlyExpenses": 32400,
      "monthlyProfit": 21600,
      "margin": 36,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p87",
        "name": "Balaramapuram Kasavu Cotton Saree Gold Zari",
        "price": 3200,
        "materials": "Organic Kora Cotton, Gold Zari",
        "dimensions": "6.25 meters including blouse piece",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified traditional Kerala off-white Kasavu saree woven with superfine 100s combed unbleached cotton and gleaming golden zari temple borders."
      },
      {
        "id": "p88",
        "name": "Kerala Kasavu Handloom Mundu & Neriyathu Set",
        "price": 1850,
        "materials": "Pure Handloom Cotton, Gold Zari",
        "dimensions": "Mundu: 2 x 4 meters, Neriyathu: 1 x 2.8 meters",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Classic 2-piece Set Mundu worn for Onam festivals, temple ceremonies, and classical Kathakali/Mohiniyattam performances."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-043",
    "legacyId": "artisan-43",
    "code": "ART-043",
    "pehchanId": "TN-KAN-SLK-9912",
    "giRegistrationNo": "GI-AU-2006-2210",
    "name": "K. Parthasarathy",
    "photo": "/images/avatars/artisan-43.svg",
    "avatarUrl": "/images/avatars/artisan-43.svg",
    "craft": "Kanchipuram Silk Weaving",
    "category": "Handloom Textiles",
    "location": "Pillaiyarpalayam, Kanchipuram, Tamil Nadu",
    "state": "Tamil Nadu",
    "district": "Kanchipuram",
    "cluster": "Kanchipuram Silk Saree Megacluster",
    "specialization": "Heavy mulberry silk bridal sarees with Korvai temple borders and pure silver-gilt zari",
    "experience": "28 Years of Temple Border Weaving",
    "experienceYears": 28,
    "capacity": "25 pieces/month",
    "capacityPerMonth": 25,
    "fulfillmentDays": 22,
    "averageFulfillmentDays": 22,
    "phone": "+91 98400 XXXXX",
    "email": "k.parthasarathy@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Kanchi Kamakshi Bunkar Sangam",
    "bio": "Requires two weavers to operate the loom simultaneously for the interlocking Korvai technique, joining heavy contrasting borders seamlessly with real silver zari.",
    "skills": [
      "Korvai Border Interlocking",
      "Petni Body Joining",
      "Heavy 3-Ply Silk Reeling",
      "Mukkotti Temple Point Weaving"
    ],
    "certifications": [
      "Kanchipuram Silk GI Tag User",
      "Silk Mark India Certified",
      "National Master Craftsman"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2006-2210)",
      "shgStatus": "Active (Kanchi Kamakshi Bunkar Sangam)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 115000,
      "monthlyCost": 69000,
      "monthlyProfit": 46000,
      "profitMargin": 35.5,
      "activeListings": 2,
      "inquiriesReceived": 36,
      "ordersConverted": 14,
      "conversionRate": 40,
      "trustScore": 97,
      "rating": 4.9,
      "reviewCount": 145,
      "topProduct": "Heirloom Pure Silk Kanchipuram Saree with Pure Zari"
    },
    "economics": {
      "monthlyRevenue": 115000,
      "monthlyExpenses": 69000,
      "monthlyProfit": 46000,
      "margin": 35.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p89",
        "name": "Heirloom Pure Silk Kanchipuram Saree with Pure Zari",
        "price": 32000,
        "materials": "100% Pure Mulberry Silk, Pure Zari",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "World-renowned GI-certified South Indian bridal saree. Triple-ply pure silk with Korvai temple borders woven using three shuttles. Weighty, lustrous, and lasting generations."
      },
      {
        "id": "p90",
        "name": "Kanchipuram Silk Brocade Stole with Temple Border",
        "price": 9400,
        "materials": "3-Ply Silk, Zari",
        "dimensions": "30 x 84 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Regal ceremonial silk stole featuring rich temple tower (Gopuram) borders and elephant medallions. Perfect for dignitary honors and weddings."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-044",
    "legacyId": "artisan-44",
    "code": "ART-044",
    "pehchanId": "TN-THA-BRZ-5509",
    "giRegistrationNo": "GI-AU-2007-3318",
    "name": "M. Sundararajan",
    "photo": "/images/avatars/artisan-44.svg",
    "avatarUrl": "/images/avatars/artisan-44.svg",
    "craft": "Swamimalai Bronze Icons",
    "category": "Metal Craft",
    "location": "Swamimalai, Thanjavur, Tamil Nadu",
    "state": "Tamil Nadu",
    "district": "Thanjavur",
    "cluster": "Swamimalai Bronze Casting Cluster",
    "specialization": "Panchaloha bronze icons of Nataraja and divine pantheons matching Shilpa Shastras",
    "experience": "25 Years of Chola Lost-Wax Bronze",
    "experienceYears": 25,
    "capacity": "15 pieces/month",
    "capacityPerMonth": 15,
    "fulfillmentDays": 25,
    "averageFulfillmentDays": 25,
    "phone": "+91 98402 XXXXX",
    "email": "m.sundararajan@karigarsetu.in",
    "giCertified": true,
    "shgMember": false,
    "bio": "Hereditary Sthapathi sculpting solid bronze icons based on the ancient Dhyana Shlokas and Tala measurement canons using beeswax models.",
    "skills": [
      "Ashtadhatu & Panchaloha Pouring",
      "Shilpa Shastra Proportions",
      "Beeswax Anatomy Sculpting",
      "Hand Chisel Finishing"
    ],
    "certifications": [
      "Swamimalai Bronze Icons GI Registered User",
      "State Sthapathi Kalaimamani Awardee"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2007-3318)",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 98000,
      "monthlyCost": 58800,
      "monthlyProfit": 39200,
      "profitMargin": 40,
      "activeListings": 2,
      "inquiriesReceived": 22,
      "ordersConverted": 9,
      "conversionRate": 40,
      "trustScore": 96,
      "rating": 5,
      "reviewCount": 88,
      "topProduct": "Swamimalai Bronze Nataraja Icon (15-inch, Panchaloha)"
    },
    "economics": {
      "monthlyRevenue": 98000,
      "monthlyExpenses": 58800,
      "monthlyProfit": 39200,
      "margin": 40,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p91",
        "name": "Swamimalai Bronze Nataraja Icon (15-inch, Panchaloha)",
        "price": 36000,
        "materials": "Certified Panchaloha Bronze",
        "dimensions": "15 inches height x 12 inches width x 4.5 inches pedestal",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified bronze Nataraja cast in strict adherence to ancient Chola dynasty Shilpa Shastras. Depicts the cosmic dance of Lord Shiva within the aureole ring of fire (Prabhavali)."
      },
      {
        "id": "p92",
        "name": "Hand-Cast Bronze Hanging Pooja Deepam with Chain",
        "price": 5800,
        "materials": "Solid Cast Bronze",
        "dimensions": "8 inches diameter bowl x 11 inches lamp height + 30-inch chain",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "description": "Classical South Indian hanging temple lamp (Thooku Vilakku) surmounted by an auspicious mythical Annapakshi bird and 30-inch heavy linked chain."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-045",
    "legacyId": "artisan-45",
    "code": "ART-045",
    "pehchanId": "AP-KRI-KAL-4412",
    "giRegistrationNo": "GI-AU-2008-5520",
    "name": "Venkateshwarlu",
    "photo": "/images/avatars/artisan-45.svg",
    "avatarUrl": "/images/avatars/artisan-45.svg",
    "craft": "Machilipatnam Kalamkari",
    "category": "Hand Block Printing",
    "location": "Pedana, Krishna, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "district": "Krishna",
    "cluster": "Machilipatnam Kalamkari Cluster",
    "specialization": "Hand block printed tree of life, Mughal creepers, and myrobalan dyed furnishings",
    "experience": "21 Years of Natural Dye Printing",
    "experienceYears": 21,
    "capacity": "100 pieces/month",
    "capacityPerMonth": 100,
    "fulfillmentDays": 9,
    "averageFulfillmentDays": 9,
    "phone": "+91 98480 XXXXX",
    "email": "venkateshwarlu.k@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Pedana Kalamkari Weavers Society",
    "bio": "Treats pure cotton cloth with buffalo milk and Karakkaya (myrobalan), then blocks with natural fermented jaggery and alum inks.",
    "skills": [
      "Buffalo Milk Fabric Sizing",
      "Iron-Jaggery Fermentation",
      "Karakkaya Mordanting",
      "Canal Water Washing"
    ],
    "certifications": [
      "Machilipatnam Kalamkari GI Tag User",
      "Craftmark Certified"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2008-5520)",
      "shgStatus": "Active (Pedana Kalamkari Weavers Society)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 67000,
      "monthlyCost": 40200,
      "monthlyProfit": 26800,
      "profitMargin": 37,
      "activeListings": 2,
      "inquiriesReceived": 32,
      "ordersConverted": 13,
      "conversionRate": 40,
      "trustScore": 93,
      "rating": 4.8,
      "reviewCount": 102,
      "topProduct": "Block Printed Kalamkari Cotton Bedspread"
    },
    "economics": {
      "monthlyRevenue": 67000,
      "monthlyExpenses": 40200,
      "monthlyProfit": 26800,
      "margin": 37,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p93",
        "name": "Block Printed Kalamkari Cotton Bedspread",
        "price": 2750,
        "materials": "Pure Cotton, Organic Dyes",
        "dimensions": "90 x 108 inches (King Size)",
        "craftCategory": "Block Printing",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified Machilipatnam Kalamkari double bedspread crafted through the historic 23-stage process using river Krishna canal waters and vegetable mordants."
      },
      {
        "id": "p94",
        "name": "Natural Vegetable-Dye Kalamkari Table Runner",
        "price": 750,
        "materials": "Cotton Slub, Herbal Inks",
        "dimensions": "14 x 72 inches",
        "craftCategory": "Block Printing",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Earthy dining runner featuring flowing deer and blooming creepers stamped with hand-carved wooden blocks in warm turmeric and indigo tones."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-046",
    "legacyId": "artisan-46",
    "code": "ART-046",
    "pehchanId": "AP-VIS-ETI-8801",
    "giRegistrationNo": "GI-AU-2017-3312",
    "name": "S. Satyanarayana",
    "photo": "/images/avatars/artisan-46.svg",
    "avatarUrl": "/images/avatars/artisan-46.svg",
    "craft": "Etikoppaka Lacquered Toys",
    "category": "Traditional & Wooden Toys",
    "location": "Etikoppaka, Visakhapatnam, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "district": "Visakhapatnam",
    "cluster": "Varaha River Wood Toy Cluster",
    "specialization": "Non-toxic organic lacquered turned wooden toys, spinning tops, and vermilion boxes",
    "experience": "18 Years of Turned Wood Craft",
    "experienceYears": 18,
    "capacity": "140 pieces/month",
    "capacityPerMonth": 140,
    "fulfillmentDays": 7,
    "averageFulfillmentDays": 7,
    "phone": "+91 98482 XXXXX",
    "email": "s.satyanarayana@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Etikoppaka Vruksha Kala Sangham",
    "bio": "Turns soft Ankudu wood on lathes, applying heated natural button lac mixed with turmeric, seeds, and indigo without chemical varnishes.",
    "skills": [
      "Lathe Turning",
      "Natural Lac Color Mixing",
      "Mogali Leaf Friction Polish",
      "Lead-Free Child Safe Toy Crafting"
    ],
    "certifications": [
      "Etikoppaka Toys GI Tag User",
      "Child-Safe Non-Toxic EN71 Compliant"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2017-3312)",
      "shgStatus": "Active (Etikoppaka Vruksha Kala Sangham)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 52000,
      "monthlyCost": 31200,
      "monthlyProfit": 20800,
      "profitMargin": 44,
      "activeListings": 2,
      "inquiriesReceived": 29,
      "ordersConverted": 12,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 75,
      "topProduct": "Etikoppaka Non-Toxic Lacquered Wooden Spinning Tops Set"
    },
    "economics": {
      "monthlyRevenue": 52000,
      "monthlyExpenses": 31200,
      "monthlyProfit": 20800,
      "margin": 44,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p95",
        "name": "Etikoppaka Non-Toxic Lacquered Wooden Spinning Tops Set",
        "price": 380,
        "materials": "Ankudu Softwood, Natural Lac Resin",
        "dimensions": "2.8 inches height x 2.2 inches diameter each",
        "craftCategory": "Toy & Doll Making",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "description": "GI-certified eco toys made from medicinal Ankudu wood. Polished using natural vegetable-dyed tree lacquer melted by lathe friction. 100% safe for infants and toddlers."
      },
      {
        "id": "p96",
        "name": "Hand-Turned Ankudu Wood Vermilion Sindoor Box",
        "price": 420,
        "materials": "Ankudu Wood, Herbal Lac",
        "dimensions": "2.5 inches diameter x 3.5 inches height",
        "craftCategory": "Toy & Doll Making",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional pooja kumkum box finished to a mirror sheen with natural Mogali (screw-pine) leaf friction buffing. Moisture-resistant and auspicious."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-047",
    "legacyId": "artisan-47",
    "code": "ART-047",
    "pehchanId": "TS-NAL-POC-1190",
    "giRegistrationNo": "GI-AU-2005-4422",
    "name": "Chintakindi Mallesham",
    "photo": "/images/avatars/artisan-47.svg",
    "avatarUrl": "/images/avatars/artisan-47.svg",
    "craft": "Pochampally Ikat",
    "category": "Handloom Textiles",
    "location": "Bhoodan Pochampally, Yadadri Bhuvanagiri, Telangana",
    "state": "Telangana",
    "district": "Yadadri Bhuvanagiri",
    "cluster": "Pochampally Handloom Park Cluster",
    "specialization": "Precision geometric double ikat silk sarees, stoles, and yardage",
    "experience": "25 Years of Geometric Double Ikat",
    "experienceYears": 25,
    "capacity": "55 pieces/month",
    "capacityPerMonth": 55,
    "fulfillmentDays": 12,
    "averageFulfillmentDays": 12,
    "phone": "+91 98490 XXXXX",
    "email": "c.mallesham@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Pochampally Handloom Weavers Co-op",
    "bio": "Pioneering Asu weaving innovation, weaving complex checkered and diamond double-ikat patterns where both warp and weft are tie-dyed.",
    "skills": [
      "Asu Winding Machine Operation",
      "Double Ikat Grid Layout",
      "Warp-Weft Color Matching",
      "Silk Loom Tension Control"
    ],
    "certifications": [
      "Pochampally Ikat GI Tag User",
      "Padma Shri Awarded Cluster Innovator"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2005-4422)",
      "shgStatus": "Active (Pochampally Handloom Weavers Co-op)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 79000,
      "monthlyCost": 47400,
      "monthlyProfit": 31600,
      "profitMargin": 36.5,
      "activeListings": 2,
      "inquiriesReceived": 35,
      "ordersConverted": 14,
      "conversionRate": 40,
      "trustScore": 96,
      "rating": 4.9,
      "reviewCount": 118,
      "topProduct": "Pochampally Double Ikat Silk Saree"
    },
    "economics": {
      "monthlyRevenue": 79000,
      "monthlyExpenses": 47400,
      "monthlyProfit": 31600,
      "margin": 36.5,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p97",
        "name": "Pochampally Double Ikat Silk Saree",
        "price": 13500,
        "materials": "Pure Silk Yarn",
        "dimensions": "5.5 meters saree + 0.8 meter blouse",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "GI-recognized Pochampally saree woven on traditional frame looms using the revolutionary Asu machine process. Complex geometric chevrons and diamond lozenges."
      },
      {
        "id": "p98",
        "name": "Pochampally Ikat Cotton Table Mats Set",
        "price": 1450,
        "materials": "Mercerized Cotton",
        "dimensions": "6 Mats (12 x 18 inches), 6 Napkins (14 x 14 inches)",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Set of 6 modern geometric dining mats with matching napkins. Durable, absorbent, and machine washable."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-048",
    "legacyId": "artisan-48",
    "code": "ART-048",
    "pehchanId": "AS-KAM-MUG-3310",
    "giRegistrationNo": "GI-AU-2007-8890",
    "name": "Jiten Kalita",
    "photo": "/images/avatars/artisan-48.svg",
    "avatarUrl": "/images/avatars/artisan-48.svg",
    "craft": "Assam Muga Silk",
    "category": "Handloom Textiles",
    "location": "Sualkuchi, Kamrup, Assam",
    "state": "Assam",
    "district": "Kamrup",
    "cluster": "Sualkuchi Silk Village Megacluster",
    "specialization": "Golden Muga and Eri silk Mekhela Chador with red Kingkhap motifs",
    "experience": "22 Years of Golden Silk Weaving",
    "experienceYears": 22,
    "capacity": "35 pieces/month",
    "capacityPerMonth": 35,
    "fulfillmentDays": 16,
    "averageFulfillmentDays": 16,
    "phone": "+91 94350 XXXXX",
    "email": "jiten.kalita@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Brahmaputra Silk Weavers Samiti",
    "bio": "Weaves the rare golden Muga silk endemic to Assam, celebrated for natural shimmer that brightens with every wash, ornamented with tribal floral jaapi motifs.",
    "skills": [
      "Wild Muga Reeling",
      "Throw Shuttle Mekhela Weaving",
      "Kingkhap Extra Weft",
      "Ahom Royal Motif Integration"
    ],
    "certifications": [
      "Muga Silk of Assam GI Tag User",
      "Silk Mark Certified"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2007-8890)",
      "shgStatus": "Active (Brahmaputra Silk Weavers Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 94000,
      "monthlyCost": 56400,
      "monthlyProfit": 37600,
      "profitMargin": 38,
      "activeListings": 2,
      "inquiriesReceived": 31,
      "ordersConverted": 12,
      "conversionRate": 40,
      "trustScore": 95,
      "rating": 4.9,
      "reviewCount": 110,
      "topProduct": "Assam Golden Muga Silk Mekhela Chador"
    },
    "economics": {
      "monthlyRevenue": 94000,
      "monthlyExpenses": 56400,
      "monthlyProfit": 37600,
      "margin": 38,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p99",
        "name": "Assam Golden Muga Silk Mekhela Chador",
        "price": 29500,
        "materials": "Pure Wild Muga Silk",
        "dimensions": "Chador: 2.8 meters x 1 meter, Mekhela: 2.4 meters x 1 meter, Blouse: 0.8 meter",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "The Golden Silk of Assam. GI-certified Muga silk found nowhere else in the world. Naturally golden with shimmering luster that increases with every wash. Lasts over 50 years."
      },
      {
        "id": "p100",
        "name": "Assam Eri Peace Silk Handwoven Throw Scarf",
        "price": 4600,
        "materials": "Cruelty-Free Eri Silk Yarn",
        "dimensions": "32 x 84 inches",
        "craftCategory": "Handloom Weaving",
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "description": "Cruelty-free Ahimsa silk where silkworms leave the cocoon unharmed before spinning. Wool-like thermal warmth with soft cotton-like breathability."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-049",
    "legacyId": "artisan-49",
    "code": "ART-049",
    "pehchanId": "TR-WTR-BAM-6611",
    "giRegistrationNo": "GI-AU-2020-1199",
    "name": "Debashish Tripura",
    "photo": "/images/avatars/artisan-49.svg",
    "avatarUrl": "/images/avatars/artisan-49.svg",
    "craft": "Bamboo Craft",
    "category": "Basketry & Natural Fiber",
    "location": "Gandhigram, West Tripura, Tripura",
    "state": "Tripura",
    "district": "West Tripura",
    "cluster": "Agartala Bamboo Crafts Megacluster",
    "specialization": "Fine bamboo table mats, lampshades, partition screens, and fruit trays",
    "experience": "15 Years of Cane & Bamboo Weaving",
    "experienceYears": 15,
    "capacity": "120 pieces/month",
    "capacityPerMonth": 120,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 94361 XXXXX",
    "email": "debashish.tripura@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Tripura Bamboo Artisans Co-op",
    "bio": "Splits local Barak bamboo into micro-thin pliable slivers, weaving resilient water-resistant modern home decor and acoustic hanging lamps.",
    "skills": [
      "Bamboo Splitting & Shaving",
      "Anti-Fungal Boiling Treatment",
      "Intricate Twill Weaving",
      "Non-Toxic Lacquer Spray"
    ],
    "certifications": [
      "Tripura Bamboo Craftmark",
      "Development Commissioner Handicrafts Certified"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2020-1199)",
      "shgStatus": "Active (Tripura Bamboo Artisans Co-op)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 43000,
      "monthlyCost": 25800,
      "monthlyProfit": 17200,
      "profitMargin": 42,
      "activeListings": 2,
      "inquiriesReceived": 24,
      "ordersConverted": 10,
      "conversionRate": 40,
      "trustScore": 90,
      "rating": 4.8,
      "reviewCount": 63,
      "topProduct": "Tripura Bamboo Fine-Weave Fruit Basket"
    },
    "economics": {
      "monthlyRevenue": 43000,
      "monthlyExpenses": 25800,
      "monthlyProfit": 17200,
      "margin": 42,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p101",
        "name": "Tripura Bamboo Fine-Weave Fruit Basket",
        "price": 620,
        "materials": "Natural Muli Bamboo",
        "dimensions": "11 inches diameter x 4 inches height",
        "craftCategory": "Bamboo & Cane",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "description": "GI-recognized Tripura bamboo craft. Hand-woven with razor-thin flexible bamboo splints treated against borers. Light as a feather and naturally durable."
      },
      {
        "id": "p102",
        "name": "Treated Bamboo Desktop Stationery Organizer",
        "price": 420,
        "materials": "Natural Bamboo Stem",
        "dimensions": "5.5 x 4 x 4.5 inches",
        "craftCategory": "Bamboo & Cane",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "description": "Multi-compartment desk caddy made from seasoned bamboo stems. Holds pens, business cards, and scissors with eco-friendly elegance."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-050",
    "legacyId": "artisan-50",
    "code": "ART-050",
    "pehchanId": "MN-IMP-KAU-8819",
    "giRegistrationNo": "GI-AU-2021-6602",
    "name": "Ibemhal Devi",
    "photo": "/images/avatars/artisan-50.svg",
    "avatarUrl": "/images/avatars/artisan-50.svg",
    "craft": "Kauna Reed Basketry",
    "category": "Basketry & Natural Fiber",
    "location": "Khangabok, Thoubal, Manipur",
    "state": "Manipur",
    "district": "Thoubal",
    "cluster": "Manipur Wetland Kauna Cluster",
    "specialization": "Eco-friendly Kauna reed yoga mats, laundry baskets, and structured bags",
    "experience": "17 Years of Water Reed Weaving",
    "experienceYears": 17,
    "capacity": "80 pieces/month",
    "capacityPerMonth": 80,
    "fulfillmentDays": 9,
    "averageFulfillmentDays": 9,
    "phone": "+91 94363 XXXXX",
    "email": "ibemhal.devi@karigarsetu.in",
    "giCertified": false,
    "shgMember": true,
    "shgName": "Meira Paibi Craft Self Help Group",
    "bio": "Harvests marsh water reed (Kauna) and plaits lightweight, durable, 100% biodegradable lifestyle accessories for European and domestic eco-stores.",
    "skills": [
      "Water Reed Curing & Sun Drying",
      "Braided Plaiting",
      "Stitched Bottom Structure",
      "Natural Smoked Golden Finish"
    ],
    "certifications": [
      "Manipur Handloom & Handicrafts Council Registered",
      "Pehchan Identity Card"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "not applicable",
      "giStatus": "Standard Artisan Cluster Registered",
      "shgStatus": "Active (Meira Paibi Craft Self Help Group)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 46000,
      "monthlyCost": 27600,
      "monthlyProfit": 18400,
      "profitMargin": 45,
      "activeListings": 2,
      "inquiriesReceived": 22,
      "ordersConverted": 9,
      "conversionRate": 40,
      "trustScore": 89,
      "rating": 4.8,
      "reviewCount": 54,
      "topProduct": "Hand-Braided Kauna Water Reed Picnic Tote Bag"
    },
    "economics": {
      "monthlyRevenue": 46000,
      "monthlyExpenses": 27600,
      "monthlyProfit": 18400,
      "margin": 45,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p103",
        "name": "Hand-Braided Kauna Water Reed Picnic Tote Bag",
        "price": 1250,
        "materials": "Kauna Reed, Leather",
        "dimensions": "14 inches width x 11 inches height x 5 inches depth",
        "craftCategory": "Natural Fibre & Grass",
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "description": "GI-recognized wetland grass handbag celebrated for its natural insulation, soft sponge-like texture, and beach/farmers market durability."
      },
      {
        "id": "p104",
        "name": "Kauna Reed Circular Floor Cushion / Meditation Mat",
        "price": 890,
        "materials": "100% Biodegradable Kauna Reed",
        "dimensions": "20 inches diameter x 3 inches thickness",
        "craftCategory": "Natural Fibre & Grass",
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "description": "Firm yet springy natural floor pouf cushion. Thermal insulating properties shield the body from cold tiled or marble floors during meditation."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-051",
    "legacyId": "artisan-51",
    "code": "ART-051",
    "pehchanId": "NL-KOH-CAR-9021",
    "giRegistrationNo": "GI-AU-2020-7711",
    "name": "Kevilezo Angami",
    "photo": "/images/avatars/artisan-51.svg",
    "avatarUrl": "/images/avatars/artisan-51.svg",
    "craft": "Naga Wood Carving & Spear Craft",
    "category": "Wood Carving",
    "location": "Khonoma Eco Village, Kohima, Nagaland",
    "state": "Nagaland",
    "district": "Kohima",
    "cluster": "Angami Tribal Crafts Cluster",
    "specialization": "Hornbill motifs, ceremonial wooden platters, Naga warrior figurines, and tribal spears",
    "experience": "19 Years of Clan Heritage Carving",
    "experienceYears": 19,
    "capacity": "25 pieces/month",
    "capacityPerMonth": 25,
    "fulfillmentDays": 15,
    "averageFulfillmentDays": 15,
    "phone": "+91 94365 XXXXX",
    "email": "kevilezo.angami@karigarsetu.in",
    "giCertified": false,
    "shgMember": false,
    "bio": "Carves single blocks of local Alder wood into traditional Angami feast bowls and warrior shields detailed with natural charcoal and tree resin.",
    "skills": [
      "Chisel Adze Carving",
      "Hornbill Iconography",
      "Resin Blackening",
      "Alder Timber Seasoning"
    ],
    "certifications": [
      "Nagaland Handloom & Handicrafts Development Empaneled"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "pending",
      "gi": "not applicable",
      "giStatus": "Standard Artisan Cluster Registered",
      "shgStatus": "Independent Producer",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 36000,
      "monthlyCost": 21600,
      "monthlyProfit": 14400,
      "profitMargin": 41,
      "activeListings": 2,
      "inquiriesReceived": 12,
      "ordersConverted": 5,
      "conversionRate": 40,
      "trustScore": 78,
      "rating": 4.7,
      "reviewCount": 31,
      "topProduct": "Hand-Carved Naga Hardwood Ceremonial Horn Cup"
    },
    "economics": {
      "monthlyRevenue": 36000,
      "monthlyExpenses": 21600,
      "monthlyProfit": 14400,
      "margin": 41,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p105",
        "name": "Hand-Carved Naga Hardwood Ceremonial Horn Cup",
        "price": 1750,
        "materials": "Solid Hardwood",
        "dimensions": "4 inches diameter x 8 inches height",
        "craftCategory": "Woodcraft",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional Angami warrior ceremonial drinking goblet sculpted from dense mountain timber. Flanked by stylized horns of the sacred Mithun bison."
      },
      {
        "id": "p106",
        "name": "Naga Warrior Shield Wall Hanging (Chiseled Wood)",
        "price": 4800,
        "materials": "Mountain Timber, Goat Hair, Cowrie Shells",
        "dimensions": "12 inches width x 32 inches height",
        "craftCategory": "Woodcraft",
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "description": "Authentic ceremonial warrior shield depicting ancestral guardian human faces and sun motifs. Flanked by fiery scarlet dyed goat hair plumes."
      }
    ],
    "isDemoData": true
  },
  {
    "id": "artisan-052",
    "legacyId": "artisan-52",
    "code": "ART-052",
    "pehchanId": "CG-BAS-IRO-7719",
    "giRegistrationNo": "GI-AU-2016-5544",
    "name": "Dhaniram Kashyap",
    "photo": "/images/avatars/artisan-52.svg",
    "avatarUrl": "/images/avatars/artisan-52.svg",
    "craft": "Bastar Wrought Iron (Loha Shilp)",
    "category": "Metal Craft",
    "location": "Kondagaon, Bastar, Chhattisgarh",
    "state": "Chhattisgarh",
    "district": "Bastar",
    "cluster": "Bastar Tribal Blacksmith Megacluster",
    "specialization": "Hand-forged scrap iron candle stands, deer, tribal musicians, and wall decor",
    "experience": "23 Years of Blacksmithing",
    "experienceYears": 23,
    "capacity": "90 pieces/month",
    "capacityPerMonth": 90,
    "fulfillmentDays": 8,
    "averageFulfillmentDays": 8,
    "phone": "+91 94250 XXXXX",
    "email": "dhaniram.kashyap@karigarsetu.in",
    "giCertified": true,
    "shgMember": true,
    "shgName": "Bastar Adivasi Shilp Samiti",
    "bio": "Recycles discard iron by heating in charcoal hearths, hammering red-hot metal without welding into expressive kinetic animal and tribal human forms.",
    "skills": [
      "Charcoal Forge Heating",
      "Anvil Hammer Pounding",
      "Rivet Jointing",
      "Rust-Resistant Varnish Treatment"
    ],
    "certifications": [
      "Bastar Iron Craft GI Tag User",
      "National Tribal Handicrafts Awardee"
    ],
    "verification": {
      "identity": "verified",
      "craft": "verified",
      "organization": "verified",
      "gi": "relevant",
      "giStatus": "GI Registry Tagged (GI-AU-2016-5544)",
      "shgStatus": "Active (Bastar Adivasi Shilp Samiti)",
      "kycStatus": "Verified (PFMS Aadhaar KYC)",
      "fairWageStatus": "Verified (₹150+/hr Fair Wage)",
      "details": "Registered artisan under Development Commissioner (Handicrafts), Govt of India."
    },
    "analytics": {
      "monthlyRevenue": 63000,
      "monthlyCost": 37800,
      "monthlyProfit": 25200,
      "profitMargin": 38,
      "activeListings": 2,
      "inquiriesReceived": 31,
      "ordersConverted": 12,
      "conversionRate": 40,
      "trustScore": 92,
      "rating": 4.8,
      "reviewCount": 95,
      "topProduct": "Bastar Hand-Forged Wrought Iron Deer Figurine"
    },
    "economics": {
      "monthlyRevenue": 63000,
      "monthlyExpenses": 37800,
      "monthlyProfit": 25200,
      "margin": 38,
      "materialCost": 400,
      "labourHours": 8,
      "labourRate": 150
    },
    "products": [
      {
        "id": "p107",
        "name": "Bastar Hand-Forged Wrought Iron Deer Figurine",
        "price": 2150,
        "materials": "Wrought Iron (Recycled)",
        "dimensions": "9 x 3 x 10 inches each (Pair)",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "description": "GI-recognized tribal black metal craft. Forged using heated scrap iron rods beaten on an anvil without casting moulds or welding. Depicts alert antelopes with curved antlers."
      },
      {
        "id": "p108",
        "name": "Bastar Wrought Iron Hanging Wall T-Lite Diya",
        "price": 1450,
        "materials": "Wrought Iron Sheet & Rods",
        "dimensions": "14 x 3 x 20 inches",
        "craftCategory": "Metal Art",
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "description": "Architectural tribal wall sconce representing a stylized tree branch with five curled leaf holders for tea-light candles. Dramatic shadowplay on walls."
      }
    ],
    "isDemoData": true
  }
];

/**
 * Universal Artisan Finder
 * Resolves by:
 * - ID: "artisan-001", "artisan-1"
 * - Code: "ART-001"
 * - Pehchan ID: "BR-MAD-PNT-4402"
 * Returns undefined if not found. NEVER fallbacks to Savita Devi.
 */
export function findArtisan(query?: string | null): CentralArtisan | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  
  return CENTRAL_ARTISANS.find(a => {
    if (a.id.toLowerCase() === q) return true;
    if (a.legacyId.toLowerCase() === q) return true;
    if (a.code.toLowerCase() === q) return true;
    if (a.pehchanId.toLowerCase() === q) return true;
    
    // Normalization e.g. "artisan-1" <-> "artisan-001"
    const numPart = q.replace(/^artisan-|^art-/, '');
    const aNumPart = a.id.replace('artisan-', '');
    if (parseInt(numPart, 10) === parseInt(aNumPart, 10)) return true;

    return false;
  });
}
