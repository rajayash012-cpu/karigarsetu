import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEED_ARTISANS } from '../server/data/artisansSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, '..', 'server', 'data', 'productsSeed.ts');

export interface B2BVolumeTier {
  min: number;
  max: number;
  discountPercent: number;
  price: number;
  label: string;
}

export interface ProductSeed {
  id: string;
  artisanId: string;
  name: string;
  productName: string;
  titleEn: string;
  titleHi: string;
  craftType: string;
  category: string;
  craftCategory: string;
  material: string;
  materials: string;
  technique: string;
  origin: string;
  description: string;
  descriptionHi: string;
  dimensions: string;
  weight: string;
  productionTime: string;
  capacity: string;
  minimumOrderQuantity: number;
  images: string[];
  imageUrl: string;
  costBreakdown: {
    materialCost: number;
    labourHours: number;
    labourRate: number;
    packagingCost: number;
    transportCost: number;
    otherCost: number;
    totalCost: number;
  };
  price: number;
  currentPrice: number;
  b2bPricingTiers: B2BVolumeTier[];
  marketComparables: Array<{
    source: string;
    price: number;
    region?: string;
  }>;
  stock: number;
  estimatedHours: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: 'active' | 'in_stock' | 'made_to_order';
  isDemoData: boolean;
}

interface Spec {
  name: string;
  titleEn: string;
  titleHi: string;
  craftType: string;
  category: string;
  craftCategory: string;
  material: string;
  materials: string;
  technique: string;
  description: string;
  descriptionHi: string;
  dimensions: string;
  weight: string;
  productionTime: string;
  capacity: string;
  moq: number;
  imageUrl: string;
  materialCost: number;
  labourHours: number;
  labourRate: number;
  packagingCost: number;
  transportCost: number;
  otherCost: number;
  price: number;
  stock: number;
  tags: string[];
  comparables: Array<{ source: string; price: number; region?: string }>;
}

const SPECS: Record<string, Spec[]> = {
  "artisan-1": [
    {
      name: "Hand-painted Madhubani Wall Art",
      titleEn: "Hand-Painted Madhubani Folk Art (Tree of Life)",
      titleHi: "हस्तनिर्मित मधुबनी लोक चित्रकला (जीवन का वृक्ष)",
      craftType: "Madhubani Painting", category: "Painting & Wall Art", craftCategory: "Folk Painting",
      material: "Handmade Bamboo Paper, Natural Pigments", materials: "Handmade Paper, Natural Plant Pigments",
      technique: "Nib & Bamboo Reed Kachni Linework",
      description: "Authentic handmade Madhubani painting depicting the sacred Tree of Life and harmonious forest fauna. Created using fine nib linework and natural pigments extracted from turmeric, indigo, and marigold.",
      descriptionHi: "प्राकृतिक रंगों और बांस की कलम से हस्तनिर्मित मधुबनी पेंटिंग। पारंपरिक जीवन वृक्ष और वन जीवों का सजीव चित्रण।",
      dimensions: "22 x 30 inches (Unframed)", weight: "220 grams", productionTime: "3 to 4 days", capacity: "40 units/month", moq: 10,
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      materialCost: 350, labourHours: 12, labourRate: 150, packagingCost: 90, transportCost: 80, otherCost: 50,
      price: 3150, stock: 25,
      tags: ["Madhubani", "Folk Art", "Tree of Life", "GI Tagged", "Natural Pigments", "Wall Decor"],
      comparables: [
        { source: "DEMO MARKET DATA — Dilli Haat Direct Cluster", price: 3200, region: "Delhi" },
        { source: "DEMO MARKET DATA — Mithila Artisan Cooperative", price: 2950, region: "Madhubani" },
        { source: "DEMO MARKET DATA — FabIndia B2B Reference", price: 3500, region: "Retail" }
      ]
    },
    {
      name: "Madhubani Kohbar Nuptial Painting on Tussar Silk",
      titleEn: "Madhubani Kohbar Nuptial Painting on Pure Tussar Silk",
      titleHi: "शुद्ध टसर सिल्क पर हस्तनिर्मित मधुबनी कोहबर पेंटिंग",
      craftType: "Madhubani Painting", category: "Painting & Wall Art", craftCategory: "Folk Painting",
      material: "Pure Bhagalpur Tussar Silk, Mineral & Plant Dyes", materials: "Tussar Silk, Organic Pigments",
      technique: "Bharni Color Fill & Fine Nib Kachni Outlines",
      description: "Museum-grade Kohbar nuptial painting rendered on pure Bhagalpur Tussar silk. Features auspicious lotus motifs, fish, and turtle symbols of fertility and prosperity.",
      descriptionHi: "भागलपुरी टसर सिल्क पर प्राकृतिक रंगों से चित्रित पारंपरिक कोहबर विवाह चित्रकला।",
      dimensions: "36 x 48 inches (Wall Hanging)", weight: "350 grams", productionTime: "7 to 8 days", capacity: "15 units/month", moq: 5,
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      materialCost: 1800, labourHours: 28, labourRate: 160, packagingCost: 200, transportCost: 150, otherCost: 120,
      price: 8500, stock: 12,
      tags: ["Madhubani", "Tussar Silk", "Kohbar", "GI Tagged", "Heritage Art", "Luxury Decor"],
      comparables: [
        { source: "DEMO MARKET DATA — Central Cottage Industries", price: 9200, region: "Delhi" },
        { source: "DEMO MARKET DATA — Mithila Craft Guild", price: 8200, region: "Patna" }
      ]
    },
    {
      name: "Madhubani Bookmark & Folio Set",
      titleEn: "Hand-Painted Madhubani Greeting Folio & Bookmarks (Set of 10)",
      titleHi: "हस्तनिर्मित मधुबनी बुकमार्क एवं ग्रीटिंग सेट (10 का सेट)",
      craftType: "Madhubani Painting", category: "Stationery & Gifting", craftCategory: "Folk Painting",
      material: "Handmade Recycled Cotton Paper, Natural Inks", materials: "Cotton Rag Paper, Vegetable Inks",
      technique: "Fine Nib Detailing with Silk Tassel",
      description: "Set of 10 exquisite bookmarks and miniature gift folios individually painted with sun, peacock, and floral motifs. Perfect for eco-friendly corporate and wedding gifting.",
      descriptionHi: "हाथ से बने रिसाइकिल पेपर पर प्राकृतिक स्याही से रचित 10 बुकमार्क का सुंदर सेट।",
      dimensions: "2.5 x 7 inches each", weight: "90 grams (set)", productionTime: "1 day", capacity: "200 sets/month", moq: 25,
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      materialCost: 90, labourHours: 1.5, labourRate: 120, packagingCost: 40, transportCost: 30, otherCost: 15,
      price: 450, stock: 80,
      tags: ["Madhubani", "Bookmarks", "Eco Friendly", "Corporate Gift", "Handmade Paper"],
      comparables: [
        { source: "DEMO MARKET DATA — Dilli Haat Souvenir Counter", price: 550, region: "Delhi" },
        { source: "DEMO MARKET DATA — Patna Book Emporium", price: 420, region: "Patna" }
      ]
    }
  ],

  "artisan-2": [
    {
      name: "Golden Sikki Grass Decorative Pauti Box",
      titleEn: "Handwoven Golden Sikki Grass Decorative Pauti Box",
      titleHi: "हस्तनिर्मित सुनहरी सिक्की घास की पारंपरिक पौती टोकरी",
      craftType: "Sikki Grass Craft", category: "Home Décor & Storage", craftCategory: "Natural Fibre & Grass",
      material: "Wild Sikki Grass (Golden Grass), Munj Rope, Organic Dyes", materials: "Sikki Golden Grass, Munj Grass",
      technique: "Needle Puncturing & Coiling Weave",
      description: "Traditional golden grass keepsake lidded box known as Pauti, dyed with organic madder and turmeric accents. Sturdy, moisture resistant, and naturally golden.",
      descriptionHi: "प्राकृतिक सुनहरी सिक्की घास से सुई द्वारा बुनी गई पारंपरिक ढक्कनदार पौती पेटी।",
      dimensions: "8 x 8 x 6 inches", weight: "320 grams", productionTime: "2 days", capacity: "60 units/month", moq: 20,
      imageUrl: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
      materialCost: 220, labourHours: 4.5, labourRate: 130, packagingCost: 60, transportCost: 50, otherCost: 30,
      price: 1250, stock: 35,
      tags: ["Sikki Grass", "Golden Grass", "GI Tagged", "Eco Decor", "Storage Box", "Handwoven"],
      comparables: [
        { source: "DEMO MARKET DATA — Upendra Maharathi Sansthan", price: 1350, region: "Patna" },
        { source: "DEMO MARKET DATA — Eco Living Bangalore", price: 1500, region: "Bengaluru" }
      ]
    },
    {
      name: "Sikki Grass Round Coasters Set",
      titleEn: "Natural Sikki Grass Round Coasters with Holder (Set of 6)",
      titleHi: "सिक्की घास के प्राकृतिक कोस्टर और स्टैंड (6 का सेट)",
      craftType: "Sikki Grass Craft", category: "Tableware & Dining", craftCategory: "Natural Fibre & Grass",
      material: "Wild Sikki Grass, Natural Vegetable Dyes", materials: "100% Biodegradable Sikki Grass",
      technique: "Tight Spiral Coiling with Contrast Borders",
      description: "Heat-resistant dining coasters hand-braided from wetland golden grass with vibrant coloured concentric rings. Comes with a matching woven holder.",
      descriptionHi: "डाइनिंग टेबल के लिए ऊष्मा प्रतिरोधी सिक्की घास के रंगीन कोस्टर सेट।",
      dimensions: "4.5 inches diameter each", weight: "180 grams (set)", productionTime: "1 day", capacity: "120 sets/month", moq: 30,
      imageUrl: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
      materialCost: 95, labourHours: 1.8, labourRate: 120, packagingCost: 40, transportCost: 30, otherCost: 15,
      price: 480, stock: 55,
      tags: ["Sikki", "Coasters", "Sustainable Dining", "Tableware", "Eco Friendly"],
      comparables: [
        { source: "DEMO MARKET DATA — Tribes India Portal", price: 520, region: "National" },
        { source: "DEMO MARKET DATA — CraftRoots Ahmedabad", price: 580, region: "Ahmedabad" }
      ]
    }
  ],

  "artisan-3": [
    {
      name: "Khatwa Applique Cushion Covers",
      titleEn: "Handcrafted Khatwa Applique Cotton Cushion Covers (Pair)",
      titleHi: "हस्तनिर्मित खटवा एप्लिक सूती कुशन कवर (जोड़ी)",
      craftType: "Khatwa Applique Craft", category: "Home Furnishing & Linen", craftCategory: "Applique & Quilting",
      material: "Pure Handloom Cotton, Contrast Muslin Patches", materials: "Handloom Cotton Fabric",
      technique: "Reverse Cutwork & Blind Hem Hand Stitching",
      description: "Geometric and elephant motif applique cushion covers hand-stitched by rural women artisans. Features concealed YKK zipper closure and pre-shrunk cotton fabric.",
      descriptionHi: "मुजफ्फरपुर की महिला कारीगरों द्वारा सुई-धागे से हाथ से सिली गई पारंपरिक खटवा कुशन कवर जोड़ी।",
      dimensions: "16 x 16 inches (Pair)", weight: "310 grams (pair)", productionTime: "2 days", capacity: "80 pairs/month", moq: 20,
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      materialCost: 280, labourHours: 5.5, labourRate: 130, packagingCost: 60, transportCost: 50, otherCost: 30,
      price: 1450, stock: 45,
      tags: ["Khatwa", "Applique", "Hand Stitched", "Cushion Covers", "Ethnic Decor"],
      comparables: [
        { source: "DEMO MARKET DATA — Dilli Haat Bihar Stall", price: 1550, region: "Delhi" },
        { source: "DEMO MARKET DATA — Jaypore B2B Benchmark", price: 1750, region: "Online" }
      ]
    },
    {
      name: "Khatwa Patchwork Bed Runner",
      titleEn: "Khatwa Hand-Applique Cotton Bed Runner with Kantha Stitch",
      titleHi: "खटवा एप्लिक एवं कांथा टांकों से सुसज्जित सूती बेड रनर",
      craftType: "Khatwa Applique Craft", category: "Home Furnishing & Linen", craftCategory: "Applique & Quilting",
      material: "Woven Cotton Slub, Vegetable Indigo & Madder Patches", materials: "Cotton Slub, Natural Indigo Dyes",
      technique: "Multi-Tiered Cutwork Applique & Running Stitch",
      description: "Artisanal bed runner featuring heritage tree-of-life cutout silhouettes layered over raw handloom cotton. Designed for luxury hotel suites and boutique bedrooms.",
      descriptionHi: "होटल व घरों के लिए विशेष रूप से तैयार हस्तनिर्मित खटवा बेड रनर।",
      dimensions: "18 x 90 inches", weight: "680 grams", productionTime: "4 days", capacity: "35 units/month", moq: 10,
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      materialCost: 650, labourHours: 12, labourRate: 135, packagingCost: 90, transportCost: 80, otherCost: 50,
      price: 3200, stock: 20,
      tags: ["Khatwa", "Bed Runner", "Hospitality Linen", "Handloom Cotton", "Applique"],
      comparables: [
        { source: "DEMO MARKET DATA — FabIndia Home Catalog", price: 3500, region: "National" },
        { source: "DEMO MARKET DATA — Bihar State Handloom Corp", price: 3100, region: "Patna" }
      ]
    }
  ],

  "artisan-4": [
    {
      name: "Tribal Dokra Brass Elephant Figurine",
      titleEn: "Tribal Dokra Brass Elephant Figurine (Lost-Wax Casting)",
      titleHi: "पारंपरिक ढोकरा पीतल हाथी शिल्प (खोई-मोम ढलाई)",
      craftType: "Dokra Metal Craft", category: "Metal Handicrafts", craftCategory: "Metal Art",
      material: "Recycled Bell Metal & Brass Alloy, Beeswax Core", materials: "Dhokra Brass Alloy",
      technique: "Ancient Lost-Wax (Cire Perdue) Metal Casting",
      description: "Handcrafted tribal brass elephant figurine featuring ornate coiled beeswax filigree detailing. Cast in durable non-ferrous brass alloy, each piece has unique hand-tooled tribal motifs.",
      descriptionHi: "झारखंड के जनजातीय शिल्पकारों द्वारा खोई-मोम ढलाई विधि से निर्मित पीतल का पारंपरिक हाथी।",
      dimensions: "6 x 4 x 7 inches", weight: "850 grams", productionTime: "2 days", capacity: "80 units/month", moq: 25,
      imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
      materialCost: 420, labourHours: 6.0, labourRate: 220, packagingCost: 70, transportCost: 60, otherCost: 40,
      price: 2450, stock: 40,
      tags: ["Dokra", "Dhokra", "Tribal Art", "Brass Decor", "Lost Wax Casting", "Elephant"],
      comparables: [
        { source: "DEMO MARKET DATA — TRIFED Tribal Emporium", price: 2600, region: "National" },
        { source: "DEMO MARKET DATA — Chotanagpur Metal Cluster", price: 2350, region: "Ranchi" },
        { source: "DEMO MARKET DATA — Heritage Home B2B Catalog", price: 2750, region: "Mumbai" }
      ]
    },
    {
      name: "Dokra Tribal Musician Quintet",
      titleEn: "Handcrafted Dokra Brass Tribal Musicians (Set of 5)",
      titleHi: "पारंपरिक ढोकरा पीतल जनजातीय वादक समूह (5 का सेट)",
      craftType: "Dokra Metal Craft", category: "Metal Handicrafts", craftCategory: "Metal Art",
      material: "Brass, Bronze Scrap Alloy, Natural Clay Mould", materials: "Cast Bell Metal Alloy",
      technique: "Lost-Wax Cire Perdue Hollow Casting",
      description: "Complete set of 5 tribal folk musicians playing traditional dholak, mandar, flute, kartal, and nagada. Celebrated heritage showpiece for corporate gifting and gallery collections.",
      descriptionHi: "मांदर, ढोलक और बांसुरी बजाते पांच जनजातीय लोक कलाकारों का दुर्लभ ढोकरा पीतल सेट।",
      dimensions: "8 inches height each", weight: "2.8 kg (set of 5)", productionTime: "5 days", capacity: "25 sets/month", moq: 8,
      imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
      materialCost: 1400, labourHours: 18, labourRate: 190, packagingCost: 220, transportCost: 180, otherCost: 100,
      price: 6800, stock: 15,
      tags: ["Dokra", "Brass Musicians", "Tribal Handicraft", "GI Tagged", "Corporate Trophy"],
      comparables: [
        { source: "DEMO MARKET DATA — Central Cottage Industries", price: 7400, region: "Delhi" },
        { source: "DEMO MARKET DATA — Jharkhand Jharcraft Emporium", price: 6500, region: "Ranchi" }
      ]
    },
    {
      name: "Dokra Brass Tribal Sun Keychain",
      titleEn: "Solid Cast Dokra Brass Sun God Keychain / Pocket Charm",
      titleHi: "ढोकरा पीतल सूर्य देवता की-चेन / पॉकेट चार्म",
      craftType: "Dokra Metal Craft", category: "Souvenirs & Accessories", craftCategory: "Metal Art",
      material: "Recycled Brass Alloy, Heavy Duty Brass Ring", materials: "Cast Brass with Natural Patina",
      technique: "Miniature Lost-Wax Wire Wrapping",
      description: "Durable handmade brass keychain featuring the ancient tribal solar deity symbol. Polished with natural mustard oil and beeswax.",
      descriptionHi: "जनजातीय सूर्य प्रतीक वाली ठोस ढोकरा पीतल की चाबी की छल्ली।",
      dimensions: "1.8 x 1.8 inches (Pendant)", weight: "45 grams", productionTime: "0.5 days", capacity: "300 units/month", moq: 50,
      imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
      materialCost: 55, labourHours: 0.8, labourRate: 120, packagingCost: 20, transportCost: 15, otherCost: 10,
      price: 280, stock: 120,
      tags: ["Dokra Keychain", "Brass Souvenir", "Budget Gift", "Tribal Motif", "Pocket Charm"],
      comparables: [
        { source: "DEMO MARKET DATA — Ranchi Souvenir Mart", price: 320, region: "Ranchi" },
        { source: "DEMO MARKET DATA — Dilli Haat Kiosk", price: 350, region: "Delhi" }
      ]
    }
  ],

  "artisan-5": [
    {
      name: "Sohrai Tribal Art Canvas",
      titleEn: "Authentic Sohrai Harvest Mural on Stretched Linen Canvas",
      titleHi: "कैनवास पर पारंपरिक सोहराई फसल उत्सव चित्रकला",
      craftType: "Sohrai & Khovar Painting", category: "Painting & Wall Art", craftCategory: "Folk Painting",
      material: "Raw Stretched Belgian Linen, Natural Earth Ochers", materials: "Belgian Linen, Clay Ocher Pigments",
      technique: "Fingertip Dabbing & Datun Chew-Stick Brushwork",
      description: "GI-recognized Sohrai mural depicting horned sacred bulls, peacocks, and flowering lotus buds. Rendered in mineral red, black manganese, and creamy kaolin clay pigments.",
      descriptionHi: "हजारीबाग की प्रसिद्ध सोहराई भित्ति चित्रकला। प्राकृतिक मिट्टी व मैंगनीज के रंगों से रचित।",
      dimensions: "24 x 36 inches", weight: "550 grams", productionTime: "3 days", capacity: "40 units/month", moq: 10,
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      materialCost: 650, labourHours: 12, labourRate: 150, packagingCost: 120, transportCost: 90, otherCost: 50,
      price: 3800, stock: 22,
      tags: ["Sohrai", "Khovar", "GI Tagged", "Tribal Canvas", "Earth Pigments", "Hazaribagh"],
      comparables: [
        { source: "DEMO MARKET DATA — Virasat Arts Gallery", price: 4200, region: "Kolkata" },
        { source: "DEMO MARKET DATA — Tribal Heritage Trust", price: 3600, region: "Ranchi" }
      ]
    },
    {
      name: "Khovar Nuptial Wall Plaque",
      titleEn: "Khovar Comb-Cut Mud Art Wall Plaque in Teak Wood Frame",
      titleHi: "सागौन फ्रेम में पारंपरिक खोवर कंघी-कटिंग वॉल प्लाक",
      craftType: "Sohrai & Khovar Painting", category: "Home Décor & Accents", craftCategory: "Folk Painting",
      material: "Hardboard Core with Multani Mitti & Dudhi Clay, Teakwood Frame", materials: "Kaolin Clay, Charcoal Mud, Teak Wood",
      technique: "Comb Sgraffito Cutting over Black Base",
      description: "Traditional bridal chamber art carved by combing away white kaolin paste over wet charcoal-mud ground. Protected behind anti-glare museum acrylic.",
      descriptionHi: "पारंपरिक विवाह गृह खोवर कला। कंघी से मिट्टी को कुरेदकर बनाई गई अनुपम ज्यामितीय आकृतियां।",
      dimensions: "14 x 14 inches framed", weight: "850 grams", productionTime: "2 days", capacity: "50 units/month", moq: 15,
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      materialCost: 350, labourHours: 6.0, labourRate: 140, packagingCost: 80, transportCost: 60, otherCost: 40,
      price: 1850, stock: 30,
      tags: ["Khovar Art", "Sgraffito", "Mud Art", "Framed Plaque", "Tribal Decor"],
      comparables: [
        { source: "DEMO MARKET DATA — Jharcraft State Outlet", price: 1950, region: "Ranchi" },
        { source: "DEMO MARKET DATA — CraftRoots Online", price: 2100, region: "National" }
      ]
    }
  ]
};

console.log("Ready to generate full 108 products...");
