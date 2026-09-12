export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  artisanId: string;
  artisanName: string;
  craft: string;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  productId: string;
  productName: string;
  inquiryId: string;
  pitch: string;
  suggestedQuestions: string[];
  keyHighlights: string[];
}

export const SEED_SCENARIOS: DemoScenario[] = [
  {
    "id": "scenario-1",
    "title": "Mithila Heritage Folk Art — GI Certified",
    "subtitle": "Savita Devi (Madhubani, Bihar) ↔ Ananya Home Collective (Delhi)",
    "artisanId": "artisan-1",
    "artisanName": "Savita Devi",
    "craft": "Madhubani Painting",
    "buyerId": "buyer-1",
    "buyerName": "Ananya Sharma",
    "buyerOrg": "Ananya Home Collective",
    "productId": "p1",
    "productName": "Hand-Painted Madhubani Folk Art (Tree of Life)",
    "inquiryId": "inq-2",
    "pitch": "Demonstrates authentic GI-certified folk painting on handmade bamboo paper with natural plant pigments. Showcases deterministic pricing for 40 units/month capacity with volume discounts and buyer matching.",
    "suggestedQuestions": [
      "Savita Devi ki monthly capacity aur revenue kitna hai?",
      "Can I order 50 units of Madhubani wall art with wholesale pricing?",
      "What natural pigments are used in this painting?",
      "What is the floor price below which the artisan will lose money?"
    ],
    "keyHighlights": [
      "GI Tag: GI-AU-2018-8421 certified",
      "Pehchan ID: BR-MAD-PNT-4402 verified",
      "Deterministic cost breakdown: ₹2,370 total cost, ₹3,150 suggested price",
      "B2B Wholesale tiers protecting minimum profit floor of 25%"
    ]
  },
  {
    "id": "scenario-2",
    "title": "Jharkhand Tribal Lost-Wax Metallurgy",
    "subtitle": "Meena Kumari (Ranchi, Jharkhand) ↔ CraftBasket Retail (Bengaluru)",
    "artisanId": "artisan-4",
    "artisanName": "Meena Kumari",
    "craft": "Dokra Metal Craft",
    "buyerId": "buyer-3",
    "buyerName": "Karthik Ramanathan",
    "buyerOrg": "CraftBasket Retail Stores",
    "productId": "p8",
    "productName": "Tribal Dokra Brass Elephant Figurine",
    "inquiryId": "inq-1",
    "pitch": "Showcases 4,000-year-old Cire Perdue lost-wax hollow casting by tribal women in Jharkhand. Demonstrates capacity alerts when bulk buyer orders (100 units) test monthly artisan capacity (80 units).",
    "suggestedQuestions": [
      "Agar buyer 120 units ka order de toh artisan kitne din mein deliver karegi?",
      "Is Dokra metal craft GI tagged?",
      "Dokra elephant ka raw material cost aur profit margin kitna hai?",
      "How does Karigar Saathi advise phased fulfillment for high volume B2B orders?"
    ],
    "keyHighlights": [
      "Capacity mismatch detection with smart phased fulfillment warning",
      "Recycled bell metal alloy casting",
      "Pehchan ID: JH-RAN-MET-6105",
      "B2B tier pricing with volume discount capped at 12%"
    ]
  },
  {
    "id": "scenario-3",
    "title": "Moradabad High-Volume Brass Festive Gifting",
    "subtitle": "Vijay Kumar Rastogi (Moradabad, UP) ↔ Traditional India Corporate Gifts (Gurugram)",
    "artisanId": "artisan-26",
    "artisanName": "Vijay Kumar Rastogi",
    "craft": "Brass Engraving",
    "buyerId": "buyer-5",
    "buyerName": "Suresh Singhal",
    "buyerOrg": "Traditional India Corporate Gifts",
    "productId": "p55",
    "productName": "Moradabadi Handcrafted Brass Peacock Diya Set",
    "inquiryId": "inq-4",
    "pitch": "Demonstrates industrial-scale handicraft manufacturing in India's Brass City (Peetal Nagri) capable of fulfilling 250+ unit corporate Diwali orders with tiered B2B pricing and GST compliance.",
    "suggestedQuestions": [
      "Moradabad brass diya set ka bulk price for 250 units kya hoga?",
      "Is Vijay Kumar Rastogi's GSTIN and Bank account verified?",
      "Corporate gifting ke liye packaging aur custom branding support hai?",
      "How much profit does the artisan make on an order of 250 sets?"
    ],
    "keyHighlights": [
      "High monthly capacity: 250 sets/month",
      "Large corporate transaction: ₹5,12,500 total value",
      "Verified GSTIN: 09CCCPR8901L1Z8",
      "Deterministic 4-tier volume discount structure"
    ]
  },
  {
    "id": "scenario-4",
    "title": "Varanasi Bridal Heritage — Pure Katan Silk",
    "subtitle": "Rameshwar Devi (Varanasi, UP) ↔ Roots & Loom Global Exports (Gurugram)",
    "artisanId": "artisan-23",
    "artisanName": "Rameshwar Devi",
    "craft": "Banarasi Handloom Weaving",
    "buyerId": "buyer-12",
    "buyerName": "Rohit Malhotra",
    "buyerOrg": "Roots & Loom Global Exports",
    "productId": "p48",
    "productName": "Pure Katan Silk Banarasi Saree with Kadwa Zari",
    "inquiryId": "inq-3",
    "pitch": "Demonstrates luxury heirloom textile weaving involving 96 hours of pit-loom labor and pure gold/silver Kadwa zari. Sourced for international export exhibition in London.",
    "suggestedQuestions": [
      "Kadwa zari Banarasi saree banane mein kitne ghante lagte hain?",
      "What makes Kadwa weave superior to machine jacquard?",
      "What is the export pricing for 15 Banarasi sarees?",
      "Does Karigar Saathi provide provenance authenticity documentation?"
    ],
    "keyHighlights": [
      "Luxury Price Bracket: ₹28,500 suggested price",
      "96 hours of artisan handloom labor per piece",
      "Silk Mark and GI Tag: GI-AU-2015-1102 certified",
      "International export packaging standards"
    ]
  },
  {
    "id": "scenario-5",
    "title": "Jaipur Blue Pottery Heritage Décor",
    "subtitle": "Ramswaroop Sharma (Jaipur, Rajasthan) ↔ Ananya Home Collective (Delhi)",
    "artisanId": "artisan-12",
    "artisanName": "Ramswaroop Sharma",
    "craft": "Blue Pottery",
    "buyerId": "buyer-1",
    "buyerName": "Ananya Sharma",
    "buyerOrg": "Ananya Home Collective",
    "productId": "p25",
    "productName": "Jaipur Traditional Blue Pottery Decorative Wall Plate",
    "inquiryId": "inq-5",
    "pitch": "Showcases Jaipur's clay-free quartz pottery glazed in traditional Persian cobalt blue. Demonstrates AI Studio theme recomposition into modern minimalist luxury apartments.",
    "suggestedQuestions": [
      "Blue Pottery mein mitti (clay) kyun nahi use hoti?",
      "Can this plate be customized with corporate logos?",
      "What is the transit packaging method for fragile pottery?",
      "AI Studio mein is product ko Modern Minimalist theme mein kaise dekhein?"
    ],
    "keyHighlights": [
      "Unique clay-free quartz and glass powder recipe",
      "GI Tag: GI-AU-2016-5412 certified",
      "AI Studio 7-theme instant canvas recomposition",
      "Direct B2B compatibility match score: 96%"
    ]
  },
  {
    "id": "scenario-6",
    "title": "Kashmiri Hand-Carved Walnut Wood Boxes",
    "subtitle": "Abdul Rahman (Srinagar, J&K) ↔ Traditional India Corporate Gifts (Gurugram)",
    "artisanId": "artisan-30",
    "artisanName": "Abdul Rahman",
    "craft": "Walnut Wood Carving",
    "buyerId": "buyer-5",
    "buyerName": "Suresh Singhal",
    "buyerOrg": "Traditional India Corporate Gifts",
    "productId": "p63",
    "productName": "Hand-Carved Kashmiri Walnut Wood Box with Chinar Relief",
    "inquiryId": "inq-6",
    "pitch": "Demonstrates master deep-relief wood carving on seasoned Kashmiri walnut wood by master craftsmen from downtown Srinagar for luxury corporate keepsakes.",
    "suggestedQuestions": [
      "Kashmiri walnut wood carving ki speciality kya hai?",
      "How does Karigar Saathi calculate walnut wood seasoning and labour cost?",
      "What is the wholesale discount on 40 walnut wood boxes?",
      "Is the wood sustainably sourced and certified?"
    ],
    "keyHighlights": [
      "30-year seasoned native walnut timber",
      "Master relief carving taking 10 hours per piece",
      "Floor price protected at ₹3,470 total cost",
      "GI Tag: GI-AU-2017-9104 certified"
    ]
  },
  {
    "id": "scenario-7",
    "title": "Bastar Tribal Wrought Iron (Loha Shilp)",
    "subtitle": "Dhaniram Kashyap (Kondagaon, CG) ↔ Sanskriti Museum Shop (Kolkata)",
    "artisanId": "artisan-52",
    "artisanName": "Dhaniram Kashyap",
    "craft": "Bastar Wrought Iron (Loha Shilp)",
    "buyerId": "buyer-7",
    "buyerName": "Debashis Mukherjee",
    "buyerOrg": "Sanskriti Museum Shop",
    "productId": "p107",
    "productName": "Bastar Hand-Forged Wrought Iron Deer Figurine (Pair)",
    "inquiryId": "inq-7",
    "pitch": "Showcases authentic tribal metallurgy using heated scrap iron hand-forged without welds or castings into exquisite elongated animal sculptures.",
    "suggestedQuestions": [
      "Bastar Loha Shilp bina welding ke kaise banate hain?",
      "Can Bastar artisans scale up to supply museum shops across India?",
      "What is the rust-prevention treatment applied to the wrought iron?",
      "How does the compatibility match evaluate logistics from Bastar to Kolkata?"
    ],
    "keyHighlights": [
      "100% recycled scrap metal eco-metallurgy",
      "Ancient blacksmith forge technique",
      "GI Tag: GI-AU-2018-7201 certified",
      "Museum shop compatibility match score: 92%"
    ]
  },
  {
    "id": "scenario-8",
    "title": "Kullu Handwoven Pure Merino Wool Shawls",
    "subtitle": "Prem Chand (Kullu, HP) ↔ Himalayan Craft & Pine (Chandigarh)",
    "artisanId": "artisan-29",
    "artisanName": "Prem Chand",
    "craft": "Kullu Handwoven Shawls",
    "buyerId": "buyer-18",
    "buyerName": "Capt. Alok Bakshi",
    "buyerOrg": "Himalayan Craft & Pine",
    "productId": "p61",
    "productName": "Pure Merino Wool Kullu Shawl with Traditional Geometric Border",
    "inquiryId": "inq-8",
    "pitch": "Demonstrates certified cold-climate handloom weaving from Himachal Pradesh with traditional Himalayan geometric dovetail patterns for boutique resort stores.",
    "suggestedQuestions": [
      "Kullu shawl mein handloom mark aur GI certification kaise verify hoti hai?",
      "What is the lead time for a 60-unit pre-winter retail order?",
      "How does Karigar Saathi handle logistics costs from Kullu to Chandigarh?",
      "What are the profit margins for weavers in Kullu cooperatives?"
    ],
    "keyHighlights": [
      "Pure fine merino wool (Australian origin combed yarn)",
      "GI Tag: GI-AU-2014-4109 certified",
      "45 units/month cooperative capacity",
      "94% trust and compliance score"
    ]
  }
];
