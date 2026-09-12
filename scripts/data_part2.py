# scripts/data_part2.py
# Products for Artisans 27 to 52 (26 Artisans * 2 products = 52 products)

PART2_PRODUCTS = [
    # 27. UTTAR PRADESH - Ram Dayal (artisan-27) - Wood Carving
    {
        "artisanId": "artisan-27", "name": "Saharanpur Sheesham Wood Folding Screen",
        "titleEn": "Saharanpur Hand-Carved Sheesham Wood Jali Room Divider (3 Panels)", "titleHi": "सहारनपुर हस्त-नक्काशीदार शीशम की लकड़ी का जाली पार्टीशन (3 पैनल)",
        "craftType": "Wood Carving", "category": "Woodcraft & Furniture", "craftCategory": "Woodcraft",
        "material": "Kiln-Seasoned Sheesham Wood (Indian Rosewood), Wax Polish", "materials": "100% Solid Sheesham Wood",
        "technique": "Fretwork Jali Open Piercing & Relief Chisel Work", "origin": "Saharanpur, Uttar Pradesh",
        "description": "Masterwork 3-panel folding screen hand-carved with delicate floral jaali patterns. Solid brass hinges allowing two-way folding. Finished in warm natural walnut polish.",
        "descriptionHi": "सहारनपुर के प्रसिद्ध काष्ठ शिल्पकारों द्वारा शीशम पर जाली कटिंग से निर्मित 3 पैनल रूम डिवाइडर।",
        "dimensions": "72 inches height x 60 inches width (3 Panels of 20 inches)", "weight": "18.5 kg", "productionTime": "10 days", "capacity": "15 units/month", "moq": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 3800, "labourHours": 44, "labourRate": 160, "packagingCost": 450, "transportCost": 350, "otherCost": 200, "price": 14500, "stock": 8,
        "tags": ["Wood Carving", "Saharanpur", "GI Tagged", "Sheesham Wood", "Room Divider", "Jali Work"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Saharanpur Wood Mart", "price": 15200, "region": "Saharanpur"},
            {"source": "DEMO MARKET DATA — Urban Ladder Screens", "price": 17500, "region": "National"}
        ]
    },
    {
        "artisanId": "artisan-27", "name": "Sheesham Wood Jali Coaster Set with Holder",
        "titleEn": "Handcrafted Sheesham Wood Geometric Jali Coasters with Caddy (Set of 6)", "titleHi": "शीशम की लकड़ी के जालीदार कोस्टर और स्टैंड (6 का सेट)",
        "craftType": "Wood Carving", "category": "Tableware & Dining", "craftCategory": "Woodcraft",
        "material": "Solid Sheesham Wood, Anti-Scratch Felt Bottom Pads", "materials": "Seasoned Sheesham Wood",
        "technique": "Open Lattice Fretwork & Natural Beeswax Buff", "origin": "Saharanpur, Uttar Pradesh",
        "description": "Set of 6 geometric latticework coasters housed in a custom-slotted caddy box. Heat resistant and moisture protected with organic wax.",
        "descriptionHi": "डाइनिंग और स्टडी टेबल के लिए शीशम की लकड़ी के 6 कोस्टर और स्टैंड। प्राकृतिक वैक्स पॉलिश।",
        "dimensions": "4 x 4 inches each coaster", "weight": "340 grams (set)", "productionTime": "1 day", "capacity": "180 sets/month", "moq": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 90, "labourHours": 1.6, "labourRate": 120, "packagingCost": 35, "transportCost": 30, "otherCost": 15, "price": 450, "stock": 90,
        "tags": ["Coaster Set", "Sheesham Wood", "Jali Work", "Office Gift", "Table Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Dilli Haat Wood Souvenirs", "price": 500, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Saharanpur Gift Suppliers", "price": 420, "region": "Saharanpur"}
        ]
    },

    # 28. UTTARAKHAND - Sunita Negi (artisan-28) - Aipan Folk Art
    {
        "artisanId": "artisan-28", "name": "Kumaoni Traditional Aipan Art Wooden Pooja Chowki",
        "titleEn": "Kumaoni Traditional Aipan Hand-Painted Wooden Pooja Chowki (12x12)", "titleHi": "कुमाऊंनी पारंपरिक ऐपण हस्त-चित्रित लकड़ी की पूजा चौकी (12x12)",
        "craftType": "Aipan Folk Art", "category": "Pooja & Spiritual Decor", "craftCategory": "Folk Painting",
        "material": "Pinewood Chowki, Brick Red Geru Clay Base, Rice Paste (Biswar) Paint", "materials": "Pine Wood, Geru & Rice Pigment",
        "technique": "Finger Ring Linework with Auspicious Feet (Lakshmi Charan)", "origin": "Almora, Uttarakhand",
        "description": "GI-certified sacred ritual low stool from the Kumaon hills. Painted with vermilion geru background and white rice paste geometric motifs symbolizing divine blessings.",
        "descriptionHi": "अल्मोड़ा की प्रसिद्ध ऐपण कला से सुसज्जित पूजा चौकी। गेरू और पिसे हुए चावल के प्राकृतिक रंगों से हस्तनिर्मित।",
        "dimensions": "12 x 12 x 3.5 inches", "weight": "850 grams", "productionTime": "2 days", "capacity": "60 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "materialCost": 320, "labourHours": 5.5, "labourRate": 140, "packagingCost": 70, "transportCost": 60, "otherCost": 35, "price": 1750, "stock": 35,
        "tags": ["Aipan Art", "Kumaon", "Uttarakhand GI", "Pooja Chowki", "Geru Art", "Spiritual"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Almora Craft Emporium", "price": 1850, "region": "Almora"},
            {"source": "DEMO MARKET DATA — Dehradun Virasat Shop", "price": 1950, "region": "Dehradun"}
        ]
    },
    {
        "artisanId": "artisan-28", "name": "Aipan Hand-Painted Terracotta Diya Plate & Thali Set",
        "titleEn": "Aipan Hand-Painted Terracotta Festive Pooja Thali with 4 Diyas", "titleHi": "ऐपण हस्त-चित्रित टेराकोटा पूजा थाली एवं 4 दीये",
        "craftType": "Aipan Folk Art", "category": "Pooja & Spiritual Decor", "craftCategory": "Folk Painting",
        "material": "Kiln-Fired Clay Thali & Diyas, Acrylic Waterproof Sealant", "materials": "Earthen Clay, Eco Acrylic Colors",
        "technique": "Traditional Aipan Swastik & Lotus Finger Stippling", "origin": "Almora, Uttarakhand",
        "description": "Festive pooja set adorned with sacred Kumaoni motifs. Durable water-resistant sealant protects colors during ceremonial aarti washes.",
        "descriptionHi": "दीपावली और पूजा के लिए ऐपण शैली में सजी मिट्टी की थाली और दीये। जलरोधी कोटिंग।",
        "dimensions": "9.5 inches diameter thali with 4 matching diyas", "weight": "620 grams (set)", "productionTime": "1 day", "capacity": "120 sets/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "materialCost": 150, "labourHours": 2.6, "labourRate": 130, "packagingCost": 50, "transportCost": 40, "otherCost": 20, "price": 780, "stock": 60,
        "tags": ["Aipan Thali", "Pooja Decor", "Diwali Gifting", "Terracotta Diya", "Uttarakhand"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Rishikesh Temple Stalls", "price": 850, "region": "Haridwar"},
            {"source": "DEMO MARKET DATA — Dilli Haat Festive Hub", "price": 950, "region": "Delhi"}
        ]
    },

    # 29. HIMACHAL PRADESH - Prem Chand (artisan-29) - Kullu Handwoven Shawls
    {
        "artisanId": "artisan-29", "name": "Kullu Pure Merino Wool Shawl",
        "titleEn": "GI Certified Kullu Pure Merino Wool Shawl with Geometric Border", "titleHi": "जीआई प्रमाणित कुल्लू शुद्ध मेरिनो ऊन शॉल (पारंपरिक ज्यामितीय बॉर्डर)",
        "craftType": "Kullu Handwoven Shawls", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Pure Fine Merino Wool (Australian Origin), Fast Chrome Dyes", "materials": "Pure Merino Wool",
        "technique": "Twill Weave with Hand-Dovetailed Multi-Color Patterning", "origin": "Kullu Valley, Himachal Pradesh",
        "description": "Authentic GI-tagged Kullu shawl woven on handloom with traditional geometric patterned borders inspired by snow peaks, pine trees, and Himalayan rivers.",
        "descriptionHi": "कुल्लू घाटी के बुनकरों द्वारा हाथ के खड्डी पर तैयार मेरिनो ऊन शॉल। अत्यधिक गर्म और हल्की।",
        "dimensions": "40 x 84 inches", "weight": "360 grams", "productionTime": "4 days", "capacity": "45 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 950, "labourHours": 12, "labourRate": 140, "packagingCost": 80, "transportCost": 70, "otherCost": 40, "price": 3600, "stock": 25,
        "tags": ["Kullu Shawl", "Pure Wool", "Merino", "GI Tagged", "Himachal Handloom", "Winter Wear"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Bhuttico Weavers Society", "price": 3750, "region": "Kullu"},
            {"source": "DEMO MARKET DATA — Himgiri State Emporium", "price": 4100, "region": "Chandigarh"}
        ]
    },
    {
        "artisanId": "artisan-29", "name": "Kullu Hand-Knitted Angora Wool Muffler & Beanie Set",
        "titleEn": "Kullu Hand-Knitted Angora Blend Wool Muffler & Beanie Cap Set", "titleHi": "कुल्लू हाथ से बुना अंगोरा वुल मफलर एवं टोपी सेट",
        "craftType": "Kullu Handwoven Shawls", "category": "Apparel & Garments", "craftCategory": "Hand Knitting",
        "material": "60% Angora Rabbit Wool, 40% Soft Lambswool", "materials": "Angora & Lambswool Blend",
        "technique": "Needle Hand-Knitting with Ribbed Edges", "origin": "Kullu, Himachal Pradesh",
        "description": "Ultra-soft, cloud-like winter set knitted by Himalayan women cooperatives. Incredible thermal warmth with lightweight feel.",
        "descriptionHi": "अंगोरा खरगोश के कोमल ऊन से हाथ की सलाई से बुना मफलर और कैप का प्रीमियम सेट।",
        "dimensions": "Muffler: 10 x 65 inches, Beanie: Free Size Stretch", "weight": "210 grams (set)", "productionTime": "2 days", "capacity": "80 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 4.5, "labourRate": 130, "packagingCost": 50, "transportCost": 40, "otherCost": 25, "price": 1350, "stock": 40,
        "tags": ["Angora Wool", "Kullu Muffler", "Beanie Set", "Winter Accessories", "Himalayan Handknit"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Manali Mall Road Stalls", "price": 1450, "region": "Manali"},
            {"source": "DEMO MARKET DATA — Shimla Heritage Emporium", "price": 1600, "region": "Shimla"}
        ]
    },

    # 30. JAMMU & KASHMIR - Abdul Rahman (artisan-30) - Walnut Wood Carving
    {
        "artisanId": "artisan-30", "name": "Kashmiri Hand-Carved Walnut Wood Box",
        "titleEn": "Hand-Carved Kashmiri Walnut Wood Box with Chinar Relief", "titleHi": "कश्मीरी अखरोट की लकड़ी का नक्काशीदार बॉक्स (चिनार रिलीफ)",
        "craftType": "Walnut Wood Carving", "category": "Woodcraft & Furniture", "craftCategory": "Woodcraft",
        "material": "Seasoned Kashmiri Walnut Wood, Velvet Inner Lining", "materials": "100% Solid Walnut Wood",
        "technique": "Deep Relief Hand Carving with Chinar Leaf Motif", "origin": "Rainawari, Srinagar, Jammu & Kashmir",
        "description": "Finely sculpted keepsake box made from 30-year seasoned Kashmiri walnut wood with velvet lining. Features traditional multi-layered Chinar leaf relief work buffed with natural beeswax.",
        "descriptionHi": "श्रीनगर के मास्टर कारीगरों द्वारा चिनार की पत्तियों की जटिल नक्काशी से बना अखरोट का लकड़ी का बॉक्स।",
        "dimensions": "9 x 6 x 3.5 inches", "weight": "720 grams", "productionTime": "2 to 3 days", "capacity": "35 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 650, "labourHours": 10, "labourRate": 250, "packagingCost": 120, "transportCost": 90, "otherCost": 60, "price": 4650, "stock": 15,
        "tags": ["Walnut Wood", "Kashmir Handicrafts", "GI Tagged", "Corporate Gifting", "Jewelry Box"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kashmir Craft Emporium", "price": 4800, "region": "Srinagar"},
            {"source": "DEMO MARKET DATA — Delhi Luxury Gift Registry", "price": 5200, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Export Council Benchmark", "price": 4500, "region": "Export"}
        ]
    },
    {
        "artisanId": "artisan-30", "name": "Sculpted Kashmiri Walnut Wood Fruit Bowl",
        "titleEn": "Masterwork Kashmiri Walnut Wood Deep-Carved Fruit Bowl (12-inch)", "titleHi": "कश्मीरी नक्काशीदार अखरोट लकड़ी फ्रूट बाउल (12 इंच)",
        "craftType": "Walnut Wood Carving", "category": "Tableware & Dining", "craftCategory": "Woodcraft",
        "material": "Single Block of Seasoned Root Walnut Wood (Doon Kaath)", "materials": "Solid Walnut Root Wood",
        "technique": "Under-Cut Lattice Chiseled Carving (Jali & Floral)", "origin": "Srinagar, Jammu & Kashmir",
        "description": "Carved from a single log piece without glued joints. Interlaced blooming roses, grapes, and dragon relief work with a scalloped pedestal base.",
        "descriptionHi": "अखरोट के तने से बिना जोड़ के तराशा गया 12 इंच का फल कटोरा। गुलाब और अंगूर की 3D नक्काशी।",
        "dimensions": "12 inches diameter x 5 inches depth", "weight": "1.3 kg", "productionTime": "5 days", "capacity": "20 units/month", "moq": 6,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1200, "labourHours": 18, "labourRate": 240, "packagingCost": 180, "transportCost": 140, "otherCost": 80, "price": 6200, "stock": 12,
        "tags": ["Fruit Bowl", "Walnut Wood", "Srinagar GI", "Luxury Dining", "Single Block Wood"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Srinagar Boulevard Crafts", "price": 6500, "region": "Srinagar"},
            {"source": "DEMO MARKET DATA — Central Cottage Industries", "price": 7200, "region": "Delhi"}
        ]
    },

    # 31. JAMMU & KASHMIR - Ghulam Rasool Mir (artisan-31) - Pashmina & Sozni
    {
        "artisanId": "artisan-31", "name": "Pure Kashmiri Pashmina Shawl with Sozni Needlework",
        "titleEn": "Pure Kashmiri Pashmina Shawl with Hand Sozni Needlework (Hashi Border)", "titleHi": "शुद्ध कश्मीरी पश्मीना शॉल — हाथ की सोज़नी सुई कढ़ाई (हाशी बॉर्डर)",
        "craftType": "Pashmina & Sozni Embroidery", "category": "Heritage Handloom Textile", "craftCategory": "Embroidery",
        "material": "100% Pure Changthangi Pashmina Cashmere (Under 14 Micron), Fine Silk Threads", "materials": "GI Certified Changthangi Pashmina",
        "technique": "Charkha Hand-Spun, Handloom Woven, Single-Needle Sozni", "origin": "Downtown, Srinagar, Jammu & Kashmir",
        "description": "GI-certified pure Kashmiri Pashmina shawl passing through the traditional ring test. Hand-embroidered with minute single-needle Sozni floral border over 2 months.",
        "descriptionHi": "चांगथांग की बकरियों के पश्म से हाथ से काती और बुनी गई शुद्ध पश्मीना शॉल। सोज़नी सुई की महीन कढ़ाई। जीआई टैग युक्त।",
        "dimensions": "40 x 80 inches", "weight": "190 grams", "productionTime": "45 to 60 days", "capacity": "6 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 8500, "labourHours": 85, "labourRate": 180, "packagingCost": 400, "transportCost": 250, "otherCost": 150, "price": 26500, "stock": 4,
        "tags": ["Pashmina", "Cashmere", "Sozni", "GI Tagged", "Kashmir Heritage", "Luxury Shawl"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kashmir Government Arts Emporium", "price": 28500, "region": "Srinagar"},
            {"source": "DEMO MARKET DATA — Taj Palace Delhi Luxury Arcade", "price": 35000, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-31", "name": "Semi-Pashmina Fine Wool Stole with Floral Sozni",
        "titleEn": "Semi-Pashmina Fine Cashmere Wool Stole with Floral Sozni Border", "titleHi": "सेमी-पश्मीना फाइन वुल स्टोल (सोज़नी फ्लोरल बॉर्डर सहित)",
        "craftType": "Pashmina & Sozni Embroidery", "category": "Heritage Handloom Textile", "craftCategory": "Embroidery",
        "material": "Fine Merino & Pashmina Blend, Resham Silk Embroidery", "materials": "Pashmina-Merino Wool Blend",
        "technique": "Handloom Diamond Weave and Sozni Floral Vines", "origin": "Srinagar, Jammu & Kashmir",
        "description": "Soft and lightweight stole featuring all-around Badam paisleys and floral vines embroidered by Srinagar needlecraft masters.",
        "descriptionHi": "पश्मीना और फाइन मेरिनो ऊन के मिश्रण से तैयार स्टोल। चारों ओर बादामी कैरी और फूलों की सोज़नी कढ़ाई।",
        "dimensions": "28 x 80 inches", "weight": "160 grams", "productionTime": "14 days", "capacity": "20 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1800, "labourHours": 26, "labourRate": 160, "packagingCost": 150, "transportCost": 120, "otherCost": 70, "price": 7200, "stock": 12,
        "tags": ["Semi Pashmina", "Sozni Stole", "Srinagar", "Winter Luxury", "Cashmere Stole"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Srinagar Weavers Association", "price": 7500, "region": "Srinagar"},
            {"source": "DEMO MARKET DATA — FabIndia Luxury Woolens", "price": 8200, "region": "Retail"}
        ]
    },

    # 32. JAMMU & KASHMIR - Bashir Ahmad Wani (artisan-32) - Paper Mache Art
    {
        "artisanId": "artisan-32", "name": "Kashmiri Papier-Mâché Trinket Box with 24K Gold",
        "titleEn": "Kashmiri Papier-Mâché Oval Trinket Box with 24K Real Gold Dust", "titleHi": "कश्मीरी पेपर माशी अंडाकार ज्वेलरी बॉक्स (24K सोने की चमक सहित)",
        "craftType": "Paper Mache Art", "category": "Home Décor & Accents", "craftCategory": "Papier-Mache",
        "material": "Moulded Paper Pulp (Sakhtsazi), Natural Mineral Gums, 24K Gold Foil Leaf", "materials": "Recycled Paper Pulp, Mineral Colors, Gold Leaf",
        "technique": "Sakhtsazi Moulding and Naqashi Freehand Painting", "origin": "Zadibal, Srinagar, Jammu & Kashmir",
        "description": "Handmade papier-mâché jewelry box layered with Persian Gul-andar-Gul (flowers within flowers) motifs in lapis lazuli, turquoise, and pure 24K gold foil.",
        "descriptionHi": "श्रीनगर की सदियों पुरानी पेपर माशी कला। कागज के गूदे को सांचे में ढालकर प्राकृतिक खनिज रंगों और सोने के वर्क से सजाया गया।",
        "dimensions": "6 x 4 x 2.8 inches", "weight": "240 grams", "productionTime": "4 days", "capacity": "60 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 320, "labourHours": 6.5, "labourRate": 150, "packagingCost": 80, "transportCost": 60, "otherCost": 40, "price": 1850, "stock": 35,
        "tags": ["Paper Mache", "Srinagar GI", "Naqashi", "Gold Dust", "Jewelry Box", "Kashmir Souvenir"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Srinagar Dal Lake Artisan Stalls", "price": 1950, "region": "Srinagar"},
            {"source": "DEMO MARKET DATA — Dilli Haat Kashmir Stall", "price": 2200, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-32", "name": "Kashmiri Papier-Mâché Christmas Bauble Ornaments",
        "titleEn": "Hand-Painted Kashmiri Papier-Mâché Festive Bauble Ornaments (Set of 6)", "titleHi": "कश्मीरी पेपर माशी हस्त-चित्रित उत्सव बॉबल आभूषण (6 का सेट)",
        "craftType": "Paper Mache Art", "category": "Festive Décor & Ornaments", "craftCategory": "Papier-Mache",
        "material": "Lightweight Paper Pulp Spheres, Golden Hanging Loops, Non-Fading Lacquer", "materials": "Pulp Core, Metallic Inks",
        "technique": "Spherical Naqashi Paisley and Star Painting", "origin": "Srinagar, Jammu & Kashmir",
        "description": "Pack of 6 shatterproof hanging ornaments popular worldwide for Christmas trees, festive garlands, and luxury gift wrapping.",
        "descriptionHi": "क्रिसमस और त्योहारों की सजावट के लिए पेपर माशी बॉबल्स का 6-पीस सेट। अटूट और बेहद खूबसूरत।",
        "dimensions": "3 inches diameter each (Set of 6)", "weight": "220 grams (set)", "productionTime": "2 days", "capacity": "150 sets/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 210, "labourHours": 4.0, "labourRate": 140, "packagingCost": 70, "transportCost": 50, "otherCost": 30, "price": 1200, "stock": 65,
        "tags": ["Christmas Baubles", "Paper Mache", "Holiday Ornaments", "Export Decor", "Kashmir"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Export Promotion Council Kashmir", "price": 1350, "region": "Export"},
            {"source": "DEMO MARKET DATA — FabIndia Festive Decor", "price": 1500, "region": "National"}
        ]
    },

    # 33. PUNJAB - Harpreet Kaur (artisan-33) - Phulkari Hand Embroidery
    {
        "artisanId": "artisan-33", "name": "Traditional Bagh Phulkari Georgette Dupatta",
        "titleEn": "Traditional Heavy Bagh Phulkari Hand-Embroidered Georgette Dupatta", "titleHi": "पारंपरिक भारी बाग फुलकारी हस्त-कशीदाकारी जॉर्जेट दुपट्टा",
        "craftType": "Phulkari Hand Embroidery", "category": "Heritage Handloom Textile", "craftCategory": "Embroidery",
        "material": "Heavy Viscose Georgette Base, Untwisted Pure Pat Silk Floss", "materials": "Georgette, Untwisted Pat Silk",
        "technique": "Darning Stitch on Reverse Fabric creating Velvety Sheen", "origin": "Tripuri Town, Patiala, Punjab",
        "description": "GI-certified 'Bagh' (garden) style Phulkari where embroidery completely covers the base cloth in radiant gold, magenta, and peacock blue geometric motifs.",
        "descriptionHi": "पटियाला की महिला कारीगरों द्वारा बिना मुड़े रेशम के धागों (पट) से तैयार पारंपरिक बाग फुलकारी। बेस कपड़ा पूरी तरह कढ़ाई से ढका हुआ।",
        "dimensions": "42 x 96 inches", "weight": "540 grams", "productionTime": "20 days", "capacity": "12 units/month", "moq": 4,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1150, "labourHours": 22, "labourRate": 130, "packagingCost": 90, "transportCost": 70, "otherCost": 45, "price": 4800, "stock": 14,
        "tags": ["Phulkari", "Bagh Phulkari", "Patiala", "GI Tagged", "Pat Silk", "Bridal Dupatta"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Phulkari Punjab Emporium", "price": 5200, "region": "Chandigarh"},
            {"source": "DEMO MARKET DATA — Amritsar Cloth Market", "price": 4950, "region": "Amritsar"}
        ]
    },
    {
        "artisanId": "artisan-33", "name": "Hand-Embroidered Phulkari Clutch Purse",
        "titleEn": "Hand-Embroidered Phulkari Silk Clutch Purse with Metal Clasp", "titleHi": "हस्त-कशीदाकारी फुलकारी रेशमी क्लच पर्स (मेटल क्लैस्प सहित)",
        "craftType": "Phulkari Hand Embroidery", "category": "Bags & Purses", "craftCategory": "Embroidery",
        "material": "Raw Silk Base, Pat Silk Embroidery, Antique Gold Frame Clasp & Chain", "materials": "Raw Silk, Metal Clasp",
        "technique": "Dense Geometric Phulkari Medallion Stitching", "origin": "Patiala, Punjab",
        "description": "Statement evening clutch bag featuring vivid geometric Phulkari needlework. Complete with detachable antique gold link chain.",
        "descriptionHi": "उत्सवों और पार्टियों के लिए फुलकारी क्लच बैग। मेटल फ्रेम और हटाने योग्य चेन के साथ।",
        "dimensions": "8 x 5 x 2.5 inches", "weight": "280 grams", "productionTime": "2 days", "capacity": "75 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 280, "labourHours": 5.0, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1450, "stock": 35,
        "tags": ["Phulkari Clutch", "Ethnic Bag", "Evening Purse", "Patiala Craft", "Wedding Accessory"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Patiala Heritage Boutiques", "price": 1600, "region": "Patiala"},
            {"source": "DEMO MARKET DATA — Delhi Chandni Chowk Accessories", "price": 1750, "region": "Delhi"}
        ]
    },

    # 34. HARYANA - Satish Kumar (artisan-34) - Terracotta Clay Pottery
    {
        "artisanId": "artisan-34", "name": "Hand-Thrown Earthen Water Matka with Brass Spigot",
        "titleEn": "Hand-Thrown Earthen Water Matka with Brass Spigot & Lid (8-Litre)", "titleHi": "पारंपरिक हस्तनिर्मित मिट्टी का मटका — ब्रास नल सहित (8 लीटर)",
        "craftType": "Terracotta Clay Pottery", "category": "Tableware & Dining", "craftCategory": "Clay Pottery",
        "material": "Purified Porous Terracotta Clay, Sand & Cow-Dung Ash Fired, Solid Brass Tap", "materials": "Natural Earthen Clay, Brass Tap",
        "technique": "Kick-Wheel Throwing and Wooden Paddle Beating (Thapa)", "origin": "Jhajjar, Haryana",
        "description": "Naturally cools drinking water by up to 5 degrees Celsius via evaporation. Fitted with a food-grade solid brass leak-proof spigot and clay saucer stand.",
        "descriptionHi": "झज्जर के कुम्हारों द्वारा चाक पर बनाया गया प्राकृतिक जल शीतलक मटका। टिकाऊ ब्रास नल और ढक्कन के साथ।",
        "dimensions": "11 inches diameter x 13 inches height (8-Litre Capacity)", "weight": "3.6 kg", "productionTime": "2 days", "capacity": "90 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "materialCost": 180, "labourHours": 2.5, "labourRate": 120, "packagingCost": 90, "transportCost": 70, "otherCost": 35, "price": 850, "stock": 45,
        "tags": ["Water Matka", "Clay Pot", "Natural Cooling", "Eco Living", "Jhajjar Pottery"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Delhi Haat Clay Stalls", "price": 950, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Haryana Tourism Outlets", "price": 900, "region": "Gurugram"}
        ]
    },
    {
        "artisanId": "artisan-34", "name": "Terracotta Indoor Herb Planters Trio",
        "titleEn": "Terracotta Indoor Herb Planters with Drainage Tray (Set of 3)", "titleHi": "टेराकोटा इनडोर हर्ब गमले एवं ड्रेनेज ट्रे (3 का सेट)",
        "craftType": "Terracotta Clay Pottery", "category": "Garden & Outdoor", "craftCategory": "Clay Pottery",
        "material": "Breathable Terracotta Clay, Natural Mineral Wash", "materials": "Porous Clay",
        "technique": "Moulded Ribbed Flutes with Drainage Hole", "origin": "Jhajjar, Haryana",
        "description": "Breathable clay plant pots that promote healthy root aeration and prevent root rot. Comes with a matching oval clay drip tray for windowsill gardening.",
        "descriptionHi": "खिड़की और बालकनी के लिए 3 गमलों और ट्रे का सेट। पौधों की जड़ों को सांस लेने में सहायक।",
        "dimensions": "4.5 inches height x 4.5 inches diameter each", "weight": "1.4 kg (set)", "productionTime": "1 day", "capacity": "150 sets/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "materialCost": 110, "labourHours": 2.0, "labourRate": 120, "packagingCost": 60, "transportCost": 50, "otherCost": 20, "price": 620, "stock": 70,
        "tags": ["Clay Planters", "Terracotta Pots", "Gardening", "Eco Friendly", "Herb Garden"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Nursery Garden Suppliers", "price": 700, "region": "National"},
            {"source": "DEMO MARKET DATA — Dilli Haat Green Corner", "price": 750, "region": "Delhi"}
        ]
    },

    # 35. MAHARASHTRA - Nirmala Patil (artisan-35) - Warli Folk Art
    {
        "artisanId": "artisan-35", "name": "Warli Tarpa Dance Folk Painting on Canvas",
        "titleEn": "Warli Tarpa Dance Tribal Folk Painting on Ochre Mud Canvas", "titleHi": "पारंपरिक वारली तारपा नृत्य लोक चित्रकला (गेरू कैनवास पर)",
        "craftType": "Warli Folk Art", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Handmade Jute-Cotton Canvas, Geru Red Mud Wash, Rice Flour Paste & Gum", "materials": "Canvas, Geru Earth, Rice Paste",
        "technique": "Bamboo Toothpick Fine Point Illustration (Circle, Triangle, Square)", "origin": "Dahanu, Palghar, Maharashtra",
        "description": "GI-certified Warli tribal art illustrating the spiral Tarpa dance where villagers hold hands in unity around the village horn player. Pure geometric folk harmony.",
        "descriptionHi": "पालघर के वारली आदिवासियों द्वारा चावल के आटे से बनाया गया प्रसिद्ध तारपा नृत्य। एकता और प्रकृति प्रेम का प्रतीक।",
        "dimensions": "20 x 28 inches (Stretched Canvas)", "weight": "480 grams", "productionTime": "3 days", "capacity": "45 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "materialCost": 420, "labourHours": 9.5, "labourRate": 140, "packagingCost": 90, "transportCost": 75, "otherCost": 45, "price": 2900, "stock": 25,
        "tags": ["Warli Art", "Tarpa Dance", "GI Tagged", "Maharashtra Tribal", "Rice Paste Painting", "Wall Art"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Tribal Cooperative Dahanu", "price": 3100, "region": "Palghar"},
            {"source": "DEMO MARKET DATA — Mumbai Jehangir Art Gallery Shop", "price": 3400, "region": "Mumbai"}
        ]
    },
    {
        "artisanId": "artisan-35", "name": "Warli Hand-Painted Terracotta Vase",
        "titleEn": "Warli Hand-Painted Terracotta Amphora Vase (10-inch)", "titleHi": "वारली हस्त-चित्रित टेराकोटा फूलदान (10 इंच)",
        "craftType": "Warli Folk Art", "category": "Home Décor & Accents", "craftCategory": "Folk Painting",
        "material": "Red Terracotta Pottery, White Eco Enamel", "materials": "Earthenware Clay, Eco White Paint",
        "technique": "Hand-Thrown Clay Vase with Miniature Warli Hunting Vignettes", "origin": "Dahanu, Maharashtra",
        "description": "Elegant accent vase featuring musicians, farmers, and deer running across the terracotta body. Clear matte protective varnish.",
        "descriptionHi": "वारली आदिवासियों द्वारा हाथ से सजाया गया मिट्टी का फूलदान। मैट प्रोटेक्शन कोटिंग।",
        "dimensions": "5.5 inches diameter x 10 inches height", "weight": "750 grams", "productionTime": "1.5 days", "capacity": "80 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "materialCost": 180, "labourHours": 3.0, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 25, "price": 890, "stock": 50,
        "tags": ["Warli Vase", "Terracotta Decor", "Folk Craft", "Maharashtra", "Artisan Vase"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Pune Handicrafts Mandi", "price": 950, "region": "Pune"},
            {"source": "DEMO MARKET DATA — FabIndia Pottery", "price": 1100, "region": "Retail"}
        ]
    },

    # 36. MAHARASHTRA - Tukaram Shinde (artisan-36) - Kolhapuri Chappal
    {
        "artisanId": "artisan-36", "name": "Vegetable-Tanned Leather Kolhapuri Chappal",
        "titleEn": "Authentic Handcrafted Vegetable-Tanned Leather Kolhapuri Chappal", "titleHi": "पारंपरिक हस्तनिर्मित लेदर कोल्हापुरी चप्पल (शुद्ध बागलकोटि चमड़ा)",
        "craftType": "Kolhapuri Chappal", "category": "Footwear & Leather Goods", "craftCategory": "Leather Craft",
        "material": "Pure Vegetable-Tanned Buffalo & Calf Leather, Harada & Babul Bark Tannins", "materials": "100% Genuine Leather",
        "technique": "Hand Stitching with Leather Thongs (No Nails or Chemicals)", "origin": "Shirol, Kolhapur, Maharashtra",
        "description": "GI-tagged artisanal Kolhapuri sandal made with hand-plaited braided straps and signature toe-ring. Naturally tanned without chromium chemicals.",
        "descriptionHi": "कोल्हापुर के कुशल कारीगरों द्वारा बिना कील और बिना केमिकल के हाथ से सिली गई प्रसिद्ध कोल्हापुरी चप्पल। जीआई टैग प्रमाणित।",
        "dimensions": "Available in UK/India Sizes 6 to 11 (Men/Unisex)", "weight": "380 grams (pair)", "productionTime": "2 days", "capacity": "100 pairs/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "materialCost": 410, "labourHours": 5.0, "labourRate": 150, "packagingCost": 70, "transportCost": 60, "otherCost": 40, "price": 1750, "stock": 45,
        "tags": ["Kolhapuri", "Chappal", "GI Tagged", "Leather Sandal", "Handcrafted Footwear", "Maharashtra"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kolhapur Chappal Mandi", "price": 1650, "region": "Kolhapur"},
            {"source": "DEMO MARKET DATA — Mumbai Dadar Footwear Market", "price": 2100, "region": "Mumbai"}
        ]
    },
    {
        "artisanId": "artisan-36", "name": "Braided Leather Festive Kolhapuri with Zari Pompom",
        "titleEn": "Festive Braided Leather Kolhapuri Chappal with Golden Zari Pompom", "titleHi": "उत्सव स्पेशल ब्रेडेड लेदर कोल्हापुरी चप्पल (जरी पोमपोम सहित)",
        "craftType": "Kolhapuri Chappal", "category": "Footwear & Leather Goods", "craftCategory": "Leather Craft",
        "material": "Top-Grain Buff Leather, Silk & Gold Zari Thread Pompom, Mustard Oil Cured", "materials": "Buff Leather, Zari Pompom",
        "technique": "Multi-Strand Leather Braid Weaving (Gonda Design)", "origin": "Kolhapur, Maharashtra",
        "description": "Wedding and festive edition Kolhapuri with soft cushioned insole and traditional hand-twirled golden zari tassel over the instep band.",
        "descriptionHi": "विवाह और त्योहारों के लिए विशेष कोल्हापुरी चप्पल। जरी के पोमपोम और आरामदायक इनसोल के साथ।",
        "dimensions": "Sizes 5 to 11 Unisex", "weight": "420 grams", "productionTime": "2.5 days", "capacity": "70 pairs/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "materialCost": 580, "labourHours": 6.5, "labourRate": 150, "packagingCost": 80, "transportCost": 70, "otherCost": 45, "price": 2350, "stock": 30,
        "tags": ["Festive Kolhapuri", "Wedding Sandal", "Zari Pompom", "Ethnic Wear", "Kolhapur Leather"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Pune Laxmi Road Footwear", "price": 2500, "region": "Pune"},
            {"source": "DEMO MARKET DATA — Manyavar Wedding Partners", "price": 2850, "region": "National"}
        ]
    },

    # 37. MAHARASHTRA - Eknathrao Kulkarni (artisan-37) - Paithani Silk Weaving
    {
        "artisanId": "artisan-37", "name": "Yeola Pure Silk Paithani Saree with Mor Pallu",
        "titleEn": "Yeola Handloom Pure Silk Paithani Saree with Asawali Border & Peacock Pallu", "titleHi": "येवला हथकरघा शुद्ध रेशम पैठणी साड़ी (असावली बॉर्डर एवं मोर पल्लू)",
        "craftType": "Paithani Silk Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "Pure Mulberry Silk, Silver Zari Electrolated with 24K Gold", "materials": "Pure Silk, Gold Plated Zari",
        "technique": "Tapestry Interlocking Weave (Dhaap) with Zero Floats on Reverse", "origin": "Yeola, Nashik, Maharashtra",
        "description": "The Queen of Silks. GI-certified Paithani saree handwoven over 20 days. Features opulent oblique square border and magnificent multi-colored dancing peacocks (Mor) on the solid gold tissue pallu.",
        "descriptionHi": "महाराष्ट्र की महारानी साड़ी। येवला के मास्टर बुनकरों द्वारा 20 दिनों में तैयार शुद्ध रेशम और सोने की जरी की पैठणी साड़ी। जीआई प्रमाणित।",
        "dimensions": "5.5 meters saree + 0.8 meter blouse piece", "weight": "790 grams", "productionTime": "20 to 22 days", "capacity": "8 units/month", "moq": 3,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 6200, "labourHours": 80, "labourRate": 160, "packagingCost": 350, "transportCost": 220, "otherCost": 150, "price": 24000, "stock": 6,
        "tags": ["Paithani", "Yeola Paithani", "GI Tagged", "Pure Silk", "Bridal Heritage", "Maharashtra"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Yeola Paithani Weavers Guild", "price": 23500, "region": "Nashik"},
            {"source": "DEMO MARKET DATA — Mumbai Dadar Paithani Stores", "price": 27500, "region": "Mumbai"}
        ]
    },
    {
        "artisanId": "artisan-37", "name": "Pure Silk Paithani Stole with Peacock Motifs",
        "titleEn": "Pure Silk Handwoven Paithani Stole with Royal Mor Pallu Ends", "titleHi": "शुद्ध सिल्क हथकरघा पैठणी स्टोल (शाही मोर पल्लू छोर सहित)",
        "craftType": "Paithani Silk Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Mulberry Silk, Pure Gold Zari Weft", "materials": "Mulberry Silk, Zari",
        "technique": "Hand Interlocking Tapestry Weave", "origin": "Yeola, Maharashtra",
        "description": "Contemporary luxury stole carrying the regal heritage of the Peshwas. Features shimmering gold tissue ends with woven singing birds and peacocks.",
        "descriptionHi": "पेशवाई शान का आधुनिक रूप। शुद्ध रेशम और सुनहरी जरी से बुना गया पैठणी स्टोल।",
        "dimensions": "28 x 82 inches", "weight": "260 grams", "productionTime": "7 days", "capacity": "18 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1650, "labourHours": 24, "labourRate": 150, "packagingCost": 130, "transportCost": 100, "otherCost": 60, "price": 6800, "stock": 14,
        "tags": ["Paithani Stole", "Pure Silk", "Peshwai", "Luxury Stole", "Yeola"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Pune Paithani Emporium", "price": 7200, "region": "Pune"},
            {"source": "DEMO MARKET DATA — FabIndia Silk Collection", "price": 7900, "region": "Retail"}
        ]
    },

    # 38. GOA - Francis Fernandes (artisan-38) - Coconut Shell & Coir Craft
    {
        "artisanId": "artisan-38", "name": "Polished Coconut Shell Breakfast Bowls Set",
        "titleEn": "Natural Polished Coconut Shell Bowls with Wooden Spoons (Set of 4)", "titleHi": "प्राकृतिक पॉलिश नारियल शेल बाउल एवं चम्मच सेट (4 का सेट)",
        "craftType": "Coconut Shell & Coir Craft", "category": "Tableware & Dining", "craftCategory": "Eco Craft",
        "material": "Reclaimed Goa Coconut Shells, Coconut Oil Polish, Neem Wood Spoons", "materials": "100% Upcycled Coconut Shell, Neem Wood",
        "technique": "Hand Sanding, Carving, and Cold-Pressed Coconut Oil Seasoning", "origin": "Cuncolim, South Goa, Goa",
        "description": "Zero-waste smoothie and salad bowls handcrafted from reclaimed Goan coconut shells. 100% food-safe, organic, and free of artificial lacquers.",
        "descriptionHi": "गोवा के नारियल के खोल से हस्तनिर्मित पर्यावरण अनुकूल बाउल और चम्मच। स्मूदी, सलाद और स्नैक्स के लिए बेहतरीन।",
        "dimensions": "5.5 inches diameter x 3 inches height each (Set of 4)", "weight": "420 grams (set)", "productionTime": "1 day", "capacity": "160 sets/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "materialCost": 120, "labourHours": 2.2, "labourRate": 130, "packagingCost": 50, "transportCost": 40, "otherCost": 20, "price": 720, "stock": 80,
        "tags": ["Coconut Bowls", "Zero Waste", "Eco Friendly", "Goa Handicraft", "Sustainable Living"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Goa Eco Lifestyle Market", "price": 790, "region": "Goa"},
            {"source": "DEMO MARKET DATA — Organic B2B Sourcing", "price": 750, "region": "National"}
        ]
    },
    {
        "artisanId": "artisan-38", "name": "Hand-Braided Coir & Coconut Shell Table Runner",
        "titleEn": "Hand-Braided Natural Coir & Coconut Button Dining Table Runner", "titleHi": "हाथ से गुंथा नारियल जटा (कॉयर) एवं बटन टेबल रनर",
        "craftType": "Coconut Shell & Coir Craft", "category": "Home Furnishing & Linen", "craftCategory": "Eco Craft",
        "material": "Treated Golden Coconut Coir Fibre, Polished Shell Disc Buttons", "materials": "Coir Rope, Coconut Shell",
        "technique": "Loomed Coir Warp with Hand-Stitched Shell Button Accents", "origin": "Cuncolim, Goa",
        "description": "Heat-insulating dining runner woven with durable golden coir yarns and adorned with lustrous polished coconut disc buttons.",
        "descriptionHi": "डाइनिंग टेबल के लिए गर्म बर्तनों से सुरक्षा देने वाला प्राकृतिक कॉयर टेबल रनर।",
        "dimensions": "14 x 54 inches", "weight": "580 grams", "productionTime": "1.5 days", "capacity": "100 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "materialCost": 180, "labourHours": 3.0, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 25, "price": 950, "stock": 55,
        "tags": ["Coir Runner", "Coconut Craft", "Sustainable Dining", "Goa Souvenir", "Rustic Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Panaji Handicrafts Emporium", "price": 1050, "region": "Goa"},
            {"source": "DEMO MARKET DATA — Eco Table Decor Benchmark", "price": 1150, "region": "Mumbai"}
        ]
    },

    # 39. KARNATAKA - Lingarajacharya (artisan-39) - Rosewood Inlay
    {
        "artisanId": "artisan-39", "name": "Mysore Rosewood Inlay Wall Art Panel",
        "titleEn": "Mysore Rosewood Inlay Wall Art Panel — Royal Elephant March (24x36)", "titleHi": "मैसूर शीशम (रोज़वुड) इनले दीवार कला — शाही गजयात्रा (24x36)",
        "craftType": "Rosewood Inlay", "category": "Woodcraft & Furniture", "craftCategory": "Wood Inlay",
        "material": "Seasoned Mysore Rosewood (Dalbergia latifolia), Inlaid Wood Veneers (Teak, Jackfruit, Rubberwood)", "materials": "Pure Rosewood, Natural Colored Wood Veneers",
        "technique": "Precision Chisel Marquetry Inlaying & Beeswax Buffing", "origin": "Mandi Mohalla, Mysuru, Karnataka",
        "description": "GI-certified Mysore Rosewood Inlay depicting the world-famous Dasara procession with the golden howdah atop the royal elephant. Created using 12 natural shades of wood with zero chemical dyes.",
        "descriptionHi": "मैसूर की ऐतिहासिक रोज़वुड इनले कला। प्राकृतिक रंगों की 12 विभिन्न लकड़ियों को तराशकर बनाई गई मैसूर दशहरा शाही सवारी। जीआई प्रमाणित।",
        "dimensions": "24 x 36 inches framed in solid rosewood border", "weight": "5.4 kg", "productionTime": "12 days", "capacity": "15 units/month", "moq": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2400, "labourHours": 32, "labourRate": 160, "packagingCost": 250, "transportCost": 180, "otherCost": 100, "price": 8600, "stock": 8,
        "tags": ["Mysore Inlay", "Rosewood", "GI Tagged", "Dasara Elephant", "Marquetry", "Heritage Woodcraft"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Cauvery Karnataka Arts Emporium", "price": 9200, "region": "Bengaluru"},
            {"source": "DEMO MARKET DATA — Mysore Heritage Crafts Society", "price": 8800, "region": "Mysuru"}
        ]
    },
    {
        "artisanId": "artisan-39", "name": "Rosewood Inlaid Keepsake Coaster Set",
        "titleEn": "Mysore Rosewood Inlaid Floral Coasters with Holder (Set of 6)", "titleHi": "मैसूर रोज़वुड इनले फ्लोरल कोस्टर एवं स्टैंड (6 का सेट)",
        "craftType": "Rosewood Inlay", "category": "Tableware & Dining", "craftCategory": "Wood Inlay",
        "material": "Solid Mysore Rosewood, White Birch & Yellow Jackfruit Inlays", "materials": "Rosewood, Hardwood Inlays",
        "technique": "Fine Marquetry Flush Inlaying", "origin": "Mysuru, Karnataka",
        "description": "Luxury wooden coaster set featuring delicate dancing peacocks and blooming jasmine buds flush-inlaid into dark rosewood discs.",
        "descriptionHi": "डाइनिंग टेबल के लिए मैसूर रोज़वुड से बने 6 इनले कोस्टर और स्टैंड। प्राकृतिक लकड़ी का अनूठा संगम।",
        "dimensions": "4.2 inches diameter each with solid caddy", "weight": "460 grams (set)", "productionTime": "2 days", "capacity": "70 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 350, "labourHours": 5.0, "labourRate": 150, "packagingCost": 80, "transportCost": 60, "otherCost": 35, "price": 1650, "stock": 35,
        "tags": ["Rosewood Coasters", "Mysore Craft", "Wood Inlay", "Corporate Souvenir", "Karnataka"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Cauvery Emporium Bangalore", "price": 1800, "region": "Bengaluru"},
            {"source": "DEMO MARKET DATA — Mysore Palace Gift Shop", "price": 1950, "region": "Mysuru"}
        ]
    },

    # 40. KARNATAKA - Basavaraj Badiger (artisan-40) - Kinhal Wooden Toys
    {
        "artisanId": "artisan-40", "name": "Handcrafted Kinhal Painted Wooden Cow & Calf",
        "titleEn": "Kinhal GI-Tagged Handcrafted Wooden Kamadhenu Cow & Calf Figurine", "titleHi": "किन्हाल जीआई प्रमाणित लकड़ी की कामधेनु गाय-बछड़ा मूर्ति (हस्त-चित्रित)",
        "craftType": "Kinhal Wooden Toys", "category": "Home Décor & Accents", "craftCategory": "Toy & Doll Making",
        "material": "Lightweight Polki Wood, Tamarind Seed Paste (Kitta), Chalk Powder, Organic Colors", "materials": "Polki Wood, Liquid Gold Paint",
        "technique": "Hand Sculpting, Paste Layering (Kitta) & Miniature Painting", "origin": "Kinhal Village, Koppal, Karnataka",
        "description": "GI-certified heritage craft originating from Vijayanagara empire artisans. Portrays sacred Kamadhenu with magnificent embossed relief blankets and gold accents.",
        "descriptionHi": "विजयनगर साम्राज्य कालीन किन्हाल कला। हल्की पोल्की लकड़ी और इमली के बीज के पेस्ट से तैयार कामधेनु गाय व बछड़ा।",
        "dimensions": "8 x 5 x 7.5 inches", "weight": "520 grams", "productionTime": "3 days", "capacity": "50 units/month", "moq": 12,
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 6.5, "labourRate": 150, "packagingCost": 90, "transportCost": 75, "otherCost": 40, "price": 2100, "stock": 25,
        "tags": ["Kinhal Craft", "Kamadhenu", "GI Tagged", "Heritage Wooden Toy", "Vijayanagara", "Karnataka"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Cauvery Handicrafts Hub", "price": 2250, "region": "Bengaluru"},
            {"source": "DEMO MARKET DATA — Hampi Heritage Souvenirs", "price": 2400, "region": "Hampi"}
        ]
    },
    {
        "artisanId": "artisan-40", "name": "Kinhal Traditional Lacquered Nesting Dolls",
        "titleEn": "Kinhal Hand-Painted Wooden Traditional Nesting Dolls (Set of 5)", "titleHi": "किन्हाल हस्त-चित्रित लकड़ी की नेस्टिंग डॉल्स (5 का सेट)",
        "craftType": "Kinhal Wooden Toys", "category": "Toys & Kids", "craftCategory": "Toy & Doll Making",
        "material": "Seasoned Softwood, Vegetable-Dye Lacquer, Non-Toxic Finish", "materials": "Polki Softwood, Non-Toxic Inks",
        "technique": "Lathe Turning and Multi-Tier Freehand Portraiture", "origin": "Kinhal, Karnataka",
        "description": "Set of 5 nesting wooden figurines depicting traditional Karnataka royal court figures. Smooth non-toxic surfaces safe for display and family collections.",
        "descriptionHi": "एक के अंदर एक समाने वाली 5 पारंपरिक किन्हाल लकड़ी की गुड़िया। बच्चों और सजावट के लिए सुरक्षित।",
        "dimensions": "6 inches largest down to 1.5 inches smallest", "weight": "310 grams (set)", "productionTime": "2 days", "capacity": "90 sets/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "materialCost": 240, "labourHours": 4.5, "labourRate": 140, "packagingCost": 70, "transportCost": 55, "otherCost": 30, "price": 1350, "stock": 40,
        "tags": ["Nesting Dolls", "Kinhal Toys", "Wooden Dolls", "Non Toxic Toys", "Karnataka GI"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Koppal Artisan Guild", "price": 1450, "region": "Koppal"},
            {"source": "DEMO MARKET DATA — Bangalore Toy Collective", "price": 1600, "region": "Bengaluru"}
        ]
    },

    # 41. KERALA - Sadasivan Achari (artisan-41) - Aranmula Metal Mirror
    {
        "artisanId": "artisan-41", "name": "Authentic Aranmula Kannadi Handcrafted Metal Mirror",
        "titleEn": "Authentic Aranmula Kannadi Handcrafted Metal Mirror (GI Tagged, 3-inch Oval)", "titleHi": "प्रामाणिक आराणमुला कन्नाडी धातु दर्पण (जीआई प्रमाणित, 3 इंच ओवल)",
        "craftType": "Aranmula Metal Mirror", "category": "Home Décor & Accents", "craftCategory": "Metal Art",
        "material": "Secret Copper-Tin Speculum Metal Alloy (No Silvered Glass), Cast Brass Frame", "materials": "Speculum Bell Metal Alloy, Cast Brass",
        "technique": "Lost-Wax Hollow Alloy Casting & Days of Manual Velvet Polishing", "origin": "Aranmula, Pathanamthitta, Kerala",
        "description": "World-famous GI-tagged front-surface reflection mirror made entirely of metallurgical bell alloy without mercury or glass backing. Zero secondary refraction.",
        "descriptionHi": "केरल की गुप्त मिश्र धातु तकनीक से निर्मित फ्रंट-रिफ्लेक्शन धातु दर्पण। बिना कांच या पारे का असली आराणमुला कन्नाडी। जीआई टैग प्रमाणित।",
        "dimensions": "Mirror: 3 inches oval, Frame: 6 x 10 inches with Stand", "weight": "980 grams", "productionTime": "14 days", "capacity": "10 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "materialCost": 5800, "labourHours": 60, "labourRate": 210, "packagingCost": 350, "transportCost": 220, "otherCost": 150, "price": 21500, "stock": 4,
        "tags": ["Aranmula Kannadi", "Metal Mirror", "Kerala GI", "Vaalkannadi", "Masterwork", "Heritage Mirror"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Aranmula Metal Mirror Society", "price": 22500, "region": "Pathanamthitta"},
            {"source": "DEMO MARKET DATA — Kairali Kerala State Emporium", "price": 24000, "region": "Kochi"}
        ]
    },
    {
        "artisanId": "artisan-41", "name": "Aranmula Brass Desk Bell with Mirror-Alloy Crest",
        "titleEn": "Cast Brass Temple Handbell with Speculum Metal Mirror Crest", "titleHi": "पीतल पूजा घंटी — आराणमुला दर्पण धातु शिखा सहित",
        "craftType": "Aranmula Metal Mirror", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Cast Bell Brass, Speculum Metal Disc Finial", "materials": "Cast Brass & Bell Metal",
        "technique": "Sand Casting & Multi-Grit Velvet Lapping", "origin": "Aranmula, Kerala",
        "description": "Acoustic temple ritual desk bell crowned with a hand-polished speculum metal reflective disc. Pure sacred ringing tone.",
        "descriptionHi": "स्पष्ट और मधुर ध्वनि वाली पीतल घंटी। शीर्ष पर आराणमुला की धातु का चमकदार दर्पण।",
        "dimensions": "4 inches diameter base x 8 inches height", "weight": "820 grams", "productionTime": "3 days", "capacity": "40 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "materialCost": 850, "labourHours": 8.0, "labourRate": 180, "packagingCost": 120, "transportCost": 90, "otherCost": 50, "price": 3400, "stock": 20,
        "tags": ["Aranmula Bell", "Brass Pooja Bell", "Temple Bell", "Kerala Handicraft"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kairali Trivandrum", "price": 3650, "region": "Thiruvananthapuram"},
            {"source": "DEMO MARKET DATA — Cochin Heritage Shop", "price": 3800, "region": "Kochi"}
        ]
    },

    # 42. KERALA - Madhavi Amma (artisan-42) - Kasavu Handloom Weaving
    {
        "artisanId": "artisan-42", "name": "Balaramapuram Kasavu Cotton Saree Gold Zari",
        "titleEn": "Balaramapuram Kasavu Pure Cotton Handloom Saree (Pure Gold Zari)", "titleHi": "बलरामपुरम कसावु शुद्ध सूती हथकरघा साड़ी (शुद्ध सोने की जरी)",
        "craftType": "Kasavu Handloom Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100s Count Superfine Unbleached Cotton, Half-Fine Gold Zari", "materials": "Organic Kora Cotton, Gold Zari",
        "technique": "Pit Loom Plain Weave with Ribbed Temple (Puliyilakkara) Borders", "origin": "Balaramapuram, Thiruvananthapuram, Kerala",
        "description": "GI-certified traditional Kerala off-white Kasavu saree woven with superfine 100s combed unbleached cotton and gleaming golden zari temple borders.",
        "descriptionHi": "केरल का पारंपरिक सफेद एवं स्वर्णिम कसावु परिधान। बलरामपुरम के हथकरघों पर बुनी गई जीआई प्रमाणित सूती साड़ी।",
        "dimensions": "6.25 meters including blouse piece", "weight": "460 grams", "productionTime": "3 days", "capacity": "50 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 780, "labourHours": 10, "labourRate": 150, "packagingCost": 80, "transportCost": 70, "otherCost": 45, "price": 3200, "stock": 25,
        "tags": ["Kasavu", "Balaramapuram", "Kerala GI", "Onam Saree", "Pure Cotton", "Gold Zari"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Hantex Kerala Handlooms", "price": 3400, "region": "Thiruvananthapuram"},
            {"source": "DEMO MARKET DATA — Kasavukada Kochi", "price": 3600, "region": "Kochi"}
        ]
    },
    {
        "artisanId": "artisan-42", "name": "Kerala Kasavu Handloom Mundu & Neriyathu Set",
        "titleEn": "Traditional Kerala Kasavu Handloom Mundu & Neriyathu (Set Mundu)", "titleHi": "पारंपरिक केरल कसावु हथकरघा मुंडू एवं नेरियाथु (सेट मुंडू)",
        "craftType": "Kasavu Handloom Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "80s Count Pure Cotton, 2-inch Gold Zari Selvedge", "materials": "Pure Handloom Cotton, Gold Zari",
        "technique": "Double-Piece Kerala Traditional Weave", "origin": "Balaramapuram, Kerala",
        "description": "Classic 2-piece Set Mundu worn for Onam festivals, temple ceremonies, and classical Kathakali/Mohiniyattam performances.",
        "descriptionHi": "ओणम और पारंपरिक उत्सवों के लिए दो टुकड़ों वाला सेट मुंडू। 2 इंच चौड़ी सुनहरी जरी किनारी।",
        "dimensions": "Mundu: 2 x 4 meters, Neriyathu: 1 x 2.8 meters", "weight": "520 grams (set)", "productionTime": "2 days", "capacity": "70 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 450, "labourHours": 5.5, "labourRate": 140, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1850, "stock": 40,
        "tags": ["Set Mundu", "Mundu Neriyathu", "Kasavu", "Onam Attire", "Kerala Traditional"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Hanveev Kerala", "price": 1950, "region": "Kozhikode"},
            {"source": "DEMO MARKET DATA — South Indian Handloom Stores", "price": 2100, "region": "Chennai"}
        ]
    },

    # 43. TAMIL NADU - K. Parthasarathy (artisan-43) - Kanchipuram Silk Weaving
    {
        "artisanId": "artisan-43", "name": "Heirloom Pure Silk Kanchipuram Saree with Pure Zari",
        "titleEn": "Heirloom Pure Mulberry Silk Kanchipuram Saree (Muppagam Pure Zari)", "titleHi": "हेरिटेज शुद्ध रेशम कांचीपुरम साड़ी (मुप्पगम शुद्ध ज़री बॉर्डर)",
        "craftType": "Kanchipuram Silk Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "Pure Mulberry Silk (3-Ply Warp & Weft), Certified Pure Silver & Gold Zari", "materials": "100% Pure Mulberry Silk, Pure Zari",
        "technique": "Korvai Contrast Interlocking & Petni Pallu Join Weave", "origin": "Kanchipuram, Tamil Nadu",
        "description": "World-renowned GI-certified South Indian bridal saree. Triple-ply pure silk with Korvai temple borders woven using three shuttles. Weighty, lustrous, and lasting generations.",
        "descriptionHi": "कांजीवरम के मास्टर बुनकरों द्वारा तीन शटल की कोरवई तकनीक से तैयार शुद्ध रेशम साड़ी। शुद्ध चांदी व सोने की जरी। जीआई प्रमाणित।",
        "dimensions": "5.5 meters saree + 0.8 meter blouse", "weight": "890 grams", "productionTime": "15 to 18 days", "capacity": "8 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 8400, "labourHours": 90, "labourRate": 170, "packagingCost": 350, "transportCost": 220, "otherCost": 150, "price": 32000, "stock": 5,
        "tags": ["Kanchipuram", "Kanjivaram", "Pure Silk", "Korvai", "GI Tagged", "Bridal Heritage", "Pure Zari"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kanchipuram Murugan Weavers Society", "price": 31500, "region": "Kanchipuram"},
            {"source": "DEMO MARKET DATA — Nalli Silks Bridal Benchmark", "price": 38000, "region": "Chennai"}
        ]
    },
    {
        "artisanId": "artisan-43", "name": "Kanchipuram Silk Brocade Stole with Temple Border",
        "titleEn": "Kanchipuram Pure Silk Brocade Stole with Korvai Temple Border", "titleHi": "कांचीपुरम शुद्ध सिल्क ब्रोकेड स्टोल (कोरवई मंदिर बॉर्डर सहित)",
        "craftType": "Kanchipuram Silk Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "Pure Heavy Mulberry Silk, Pure Zari Pallu Highlights", "materials": "3-Ply Silk, Zari",
        "technique": "Pit Loom Korvai Weaving with Rudraksha Motifs", "origin": "Kanchipuram, Tamil Nadu",
        "description": "Regal ceremonial silk stole featuring rich temple tower (Gopuram) borders and elephant medallions. Perfect for dignitary honors and weddings.",
        "descriptionHi": "राजसी कांजीवरम रेशम से बुना हुआ स्टोल। गोपुरम मंदिर बॉर्डर और हाथी रूपांकन।",
        "dimensions": "30 x 84 inches", "weight": "320 grams", "productionTime": "8 days", "capacity": "15 units/month", "moq": 4,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2400, "labourHours": 30, "labourRate": 160, "packagingCost": 160, "transportCost": 120, "otherCost": 70, "price": 9400, "stock": 10,
        "tags": ["Kanjivaram Stole", "Pure Silk", "Temple Border", "Luxury Handloom", "Tamil Nadu"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Co-optex Tamil Nadu", "price": 9900, "region": "Chennai"},
            {"source": "DEMO MARKET DATA — Kanchipuram Silk Hub", "price": 9200, "region": "Kanchipuram"}
        ]
    },

    # 44. TAMIL NADU - M. Sundararajan (artisan-44) - Swamimalai Bronze Icons
    {
        "artisanId": "artisan-44", "name": "Swamimalai Bronze Nataraja Icon (15-inch, Panchaloha)",
        "titleEn": "Swamimalai Lost-Wax Bronze Nataraja Icon (15-inch, Panchaloha Alloy)", "titleHi": "स्वामिमलै खोई-मोम कांस्य नटराज मूर्ति (15 इंच, पंचलोहा मिश्र धातु)",
        "craftType": "Swamimalai Bronze Icons", "category": "Sculptures & Idols", "craftCategory": "Metal Art",
        "material": "Traditional Panchaloha 5-Metal Bronze Alloy (Copper, Zinc, Lead, Silver, Gold traces)", "materials": "Certified Panchaloha Bronze",
        "technique": "Chola-Style Lost Wax (Madhuchishta Vidhana) Shilpa Shastra Casting", "origin": "Swamimalai, Thanjavur, Tamil Nadu",
        "description": "GI-certified bronze Nataraja cast in strict adherence to ancient Chola dynasty Shilpa Shastras. Depicts the cosmic dance of Lord Shiva within the aureole ring of fire (Prabhavali).",
        "descriptionHi": "चोलकालीन शिल्प शास्त्रों के अनुसार स्वामिमलै के मास्टर स्थापतियों द्वारा खोई-मोम विधि से ढाली गई पंचलोहा नटराज मूर्ति। जीआई प्रमाणित।",
        "dimensions": "15 inches height x 12 inches width x 4.5 inches pedestal", "weight": "6.8 kg solid bronze", "productionTime": "24 days", "capacity": "6 units/month", "moq": 1,
        "imageUrl": "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80",
        "materialCost": 9500, "labourHours": 90, "labourRate": 210, "packagingCost": 550, "transportCost": 350, "otherCost": 200, "price": 36000, "stock": 3,
        "tags": ["Swamimalai Bronze", "Nataraja", "Panchaloha", "Chola Bronze", "GI Tagged", "Temple Sculpture"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Swamimalai Sthapathy Guild", "price": 38000, "region": "Thanjavur"},
            {"source": "DEMO MARKET DATA — Poompuhar Tamil Nadu Emporium", "price": 42000, "region": "Chennai"}
        ]
    },
    {
        "artisanId": "artisan-44", "name": "Hand-Cast Bronze Hanging Pooja Deepam with Chain",
        "titleEn": "Hand-Cast Swamimalai Bronze Hanging Thooku Vilakku with Chain", "titleHi": "स्वामिमलै हस्त-ढलाई कांस्य लटकता हुआ थूक्कू दीया (चेन सहित)",
        "craftType": "Swamimalai Bronze Icons", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Heavy Cast Bronze, Solid Brass Link Chain with Hansa Bird Finial", "materials": "Solid Cast Bronze",
        "technique": "Cire Perdue Lost-Wax Casting & High-Gloss Buff", "origin": "Swamimalai, Tamil Nadu",
        "description": "Classical South Indian hanging temple lamp (Thooku Vilakku) surmounted by an auspicious mythical Annapakshi bird and 30-inch heavy linked chain.",
        "descriptionHi": "मंदिरों और प्रवेश द्वारों के लिए स्वामिमलै का लटकता हुआ पारंपरिक कांस्य दीप। अन्नपक्षी शिखा युक्त।",
        "dimensions": "8 inches diameter bowl x 11 inches lamp height + 30-inch chain", "weight": "3.2 kg", "productionTime": "5 days", "capacity": "25 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1650, "labourHours": 15, "labourRate": 190, "packagingCost": 150, "transportCost": 120, "otherCost": 70, "price": 5800, "stock": 12,
        "tags": ["Thooku Vilakku", "Bronze Lamp", "Hanging Deepam", "Swamimalai", "South Indian Temple"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Thanjavur Temple Supply Mandi", "price": 6100, "region": "Thanjavur"},
            {"source": "DEMO MARKET DATA — Poompuhar Bronze Counter", "price": 6600, "region": "Chennai"}
        ]
    },

    # 45. ANDHRA PRADESH - Venkateshwarlu (artisan-45) - Machilipatnam Kalamkari
    {
        "artisanId": "artisan-45", "name": "Block Printed Kalamkari Cotton Bedspread",
        "titleEn": "Machilipatnam Hand-Block Printed Kalamkari Cotton Bedspread (Tree of Life)", "titleHi": "मछलीपट्टनम हस्त ब्लॉक प्रिंटेड कलमकारी सूती बेडस्प्रेड (जीवन का वृक्ष)",
        "craftType": "Machilipatnam Kalamkari", "category": "Home Furnishing & Linen", "craftCategory": "Block Printing",
        "material": "100% Pure 40s Sheeting Cotton, Natural Vegetable Extracts (Myrobalan, Alum, Madder, Indigo)", "materials": "Pure Cotton, Organic Dyes",
        "technique": "23-Step Traditional Kalamkari Washing, Mordanting, & Block Stamping", "origin": "Pedana, Machilipatnam, Krishna, Andhra Pradesh",
        "description": "GI-certified Machilipatnam Kalamkari double bedspread crafted through the historic 23-stage process using river Krishna canal waters and vegetable mordants.",
        "descriptionHi": "पेदाना के कारीगरों द्वारा 23 चरणों की ऐतिहासिक विधि से तैयार कलमकारी बेडशीट। 100% प्राकृतिक वनस्पति रंग। जीआई प्रमाणित।",
        "dimensions": "90 x 108 inches (King Size)", "weight": "1.1 kg", "productionTime": "4 days", "capacity": "75 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 680, "labourHours": 8.0, "labourRate": 140, "packagingCost": 90, "transportCost": 80, "otherCost": 45, "price": 2750, "stock": 30,
        "tags": ["Kalamkari", "Machilipatnam", "Pedana", "GI Tagged", "Tree of Life", "Natural Dyes"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Lepakshi AP Handicrafts", "price": 2900, "region": "Vijayawada"},
            {"source": "DEMO MARKET DATA — FabIndia Kalamkari Collection", "price": 3200, "region": "National"}
        ]
    },
    {
        "artisanId": "artisan-45", "name": "Natural Vegetable-Dye Kalamkari Table Runner",
        "titleEn": "Machilipatnam Kalamkari Hand-Blocked Cotton Table Runner", "titleHi": "मछलीपट्टनम कलमकारी प्राकृतिक रंगों से छपा सूती टेबल रनर",
        "craftType": "Machilipatnam Kalamkari", "category": "Tableware & Dining", "craftCategory": "Block Printing",
        "material": "Heavyweight Cotton Slub, Herbal Vegetable Dyes", "materials": "Cotton Slub, Herbal Inks",
        "technique": "Hand-Carved Teak Block Stamp with Foliage Borders", "origin": "Machilipatnam, Andhra Pradesh",
        "description": "Earthy dining runner featuring flowing deer and blooming creepers stamped with hand-carved wooden blocks in warm turmeric and indigo tones.",
        "descriptionHi": "प्राकृतिक रंगों की सुगंध से युक्त कलमकारी टेबल रनर। धोने में टिकाऊ और पर्यावरण-अनुकूल।",
        "dimensions": "14 x 72 inches", "weight": "260 grams", "productionTime": "1 day", "capacity": "140 units/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 150, "labourHours": 2.5, "labourRate": 130, "packagingCost": 45, "transportCost": 35, "otherCost": 20, "price": 750, "stock": 65,
        "tags": ["Kalamkari Runner", "Dining Decor", "Natural Dyes", "Pedana Craft", "Andhra Pradesh"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Lepakshi Hyderabad", "price": 820, "region": "Hyderabad"},
            {"source": "DEMO MARKET DATA — Dilli Haat Textile Bazaar", "price": 890, "region": "Delhi"}
        ]
    },

    # 46. ANDHRA PRADESH - S. Satyanarayana (artisan-46) - Etikoppaka Lacquered Toys
    {
        "artisanId": "artisan-46", "name": "Etikoppaka Non-Toxic Lacquered Wooden Spinning Tops Set",
        "titleEn": "Etikoppaka Non-Toxic Lacquered Wooden Spinning Tops (Set of 4)", "titleHi": "एतिकोप्पाका गैर-विषाक्त लाख-रंजित लकड़ी के लट्टू (4 का सेट)",
        "craftType": "Etikoppaka Lacquered Toys", "category": "Toys & Kids", "craftCategory": "Toy & Doll Making",
        "material": "Ankudu Softwood (Wrightia tinctoria), Natural Tree Lac Resin, Herbal Colors (Turmeric, Indigo, Kunkuma)", "materials": "Ankudu Softwood, Natural Lac Resin",
        "technique": "Hand Lathe Turning and Friction Lacquer Infusion", "origin": "Etikoppaka, Anakapalli, Andhra Pradesh",
        "description": "GI-certified eco toys made from medicinal Ankudu wood. Polished using natural vegetable-dyed tree lacquer melted by lathe friction. 100% safe for infants and toddlers.",
        "descriptionHi": "अंकुडु की औषधीय लकड़ी से बने एतिकोप्पाका लट्टू। प्राकृतिक लाख और हल्दी-कुमकुम के रंगों से रंगे। बच्चों के लिए पूरी तरह सुरक्षित। जीआई प्रमाणित।",
        "dimensions": "2.8 inches height x 2.2 inches diameter each", "weight": "240 grams (set of 4)", "productionTime": "1 day", "capacity": "200 sets/month", "moq": 30,
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "materialCost": 75, "labourHours": 1.4, "labourRate": 120, "packagingCost": 35, "transportCost": 25, "otherCost": 15, "price": 380, "stock": 110,
        "tags": ["Etikoppaka", "GI Tagged", "Non Toxic Toys", "Wooden Toys", "Eco Friendly Toys", "Andhra Pradesh"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Lepakshi Toys Counter", "price": 420, "region": "Visakhapatnam"},
            {"source": "DEMO MARKET DATA — Montessori Wooden Toy Shop", "price": 490, "region": "Bengaluru"}
        ]
    },
    {
        "artisanId": "artisan-46", "name": "Hand-Turned Ankudu Wood Vermilion Sindoor Box",
        "titleEn": "Etikoppaka Hand-Turned Ankudu Wood Vermilion Sindoor Box (Kumkum Bharani)", "titleHi": "एतिकोप्पाका अंकुडु लकड़ी कुमकुम भरणी / सिंदूर डिब्बी",
        "craftType": "Etikoppaka Lacquered Toys", "category": "Pooja & Spiritual Decor", "craftCategory": "Toy & Doll Making",
        "material": "Ankudu Wood, Natural Lacquer with Mogali Leaf Polishing", "materials": "Ankudu Wood, Herbal Lac",
        "technique": "Lathe Turned Miniature Container with Screw-Fit Lid", "origin": "Etikoppaka, Andhra Pradesh",
        "description": "Traditional pooja kumkum box finished to a mirror sheen with natural Mogali (screw-pine) leaf friction buffing. Moisture-resistant and auspicious.",
        "descriptionHi": "पारंपरिक पूजा के लिए लकड़ी की सिंदूर डिब्बी। मोगाली की पत्तियों से पॉलिश की गई प्राकृतिक चमक।",
        "dimensions": "2.5 inches diameter x 3.5 inches height", "weight": "90 grams", "productionTime": "0.5 days", "capacity": "220 units/month", "moq": 40,
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "materialCost": 80, "labourHours": 1.5, "labourRate": 120, "packagingCost": 35, "transportCost": 30, "otherCost": 15, "price": 420, "stock": 95,
        "tags": ["Kumkum Box", "Sindoor Bharani", "Etikoppaka", "Pooja Item", "Wooden Box"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Tirupati Pilgrim Crafts", "price": 480, "region": "Tirupati"},
            {"source": "DEMO MARKET DATA — Lepakshi Store", "price": 450, "region": "Vijayawada"}
        ]
    },

    # 47. TELANGANA - Chintakindi Mallesham (artisan-47) - Pochampally Ikat
    {
        "artisanId": "artisan-47", "name": "Pochampally Double Ikat Silk Saree",
        "titleEn": "Pochampally Handloom Pure Silk Double Ikat Saree with Geometric Weave", "titleHi": "पोचमपल्ली हथकरघा शुद्ध रेशम डबल इकत साड़ी (ज्यामितीय बुनाई)",
        "craftType": "Pochampally Ikat", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Pure Mulberry Silk, Fast Vat Dyestuffs", "materials": "Pure Silk Yarn",
        "technique": "Mathematical Tie-and-Dye Asu Processing & Double Ikat Weaving", "origin": "Bhoodan Pochampally, Yadadri Bhuvanagiri, Telangana",
        "description": "GI-recognized Pochampally saree woven on traditional frame looms using the revolutionary Asu machine process. Complex geometric chevrons and diamond lozenges.",
        "descriptionHi": "तेलंगाना के पोचमपल्ली की विश्वविख्यात डबल इकत सिल्क साड़ी। सटीक ज्यामितीय डिजाइन और रेशमी चमक। जीआई प्रमाणित।",
        "dimensions": "5.5 meters saree + 0.8 meter blouse", "weight": "640 grams", "productionTime": "10 days", "capacity": "15 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 3400, "labourHours": 42, "labourRate": 160, "packagingCost": 190, "transportCost": 140, "otherCost": 90, "price": 13500, "stock": 10,
        "tags": ["Pochampally", "Double Ikat", "Telangana Handloom", "GI Tagged", "Pure Silk", "Geometric Saree"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Pochampally Handloom Park", "price": 14200, "region": "Hyderabad"},
            {"source": "DEMO MARKET DATA — Golconda Handicrafts", "price": 14800, "region": "Hyderabad"}
        ]
    },
    {
        "artisanId": "artisan-47", "name": "Pochampally Ikat Cotton Table Mats Set",
        "titleEn": "Pochampally Mercerized Cotton Ikat Table Mats & Napkins (Set of 6)", "titleHi": "पोचमपल्ली कॉटन इकत टेबल मैट और नैपकिन सेट (6 का सेट)",
        "craftType": "Pochampally Ikat", "category": "Tableware & Dining", "craftCategory": "Handloom Weaving",
        "material": "100% Combed 2/40s Mercerized Cotton, Colorfast Dyes", "materials": "Mercerized Cotton",
        "technique": "Warp Ikat Loom Weaving with Fringed Borders", "origin": "Pochampally, Telangana",
        "description": "Set of 6 modern geometric dining mats with matching napkins. Durable, absorbent, and machine washable.",
        "descriptionHi": "डाइनिंग टेबल के लिए 6 पोचमपल्ली इकत मैट और नैपकिन। धोने में आसान और रंग पक्के।",
        "dimensions": "6 Mats (12 x 18 inches), 6 Napkins (14 x 14 inches)", "weight": "540 grams (set)", "productionTime": "1.5 days", "capacity": "90 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 320, "labourHours": 4.5, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1450, "stock": 40,
        "tags": ["Ikat Mats", "Pochampally Cotton", "Table Linen", "Dining Set", "Telangana"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Hyderabad Craft Council", "price": 1550, "region": "Hyderabad"},
            {"source": "DEMO MARKET DATA — Urban Ladder Dining", "price": 1750, "region": "National"}
        ]
    },

    # 48. ASSAM - Jiten Kalita (artisan-48) - Assam Muga Silk
    {
        "artisanId": "artisan-48", "name": "Assam Golden Muga Silk Mekhela Chador",
        "titleEn": "Assam Golden Muga Silk Mekhela Chador with Traditional Karbi Motifs", "titleHi": "असमिया गोल्डन मूंगा सिल्क मेखेला चादर (पारंपरिक कार्बी रूपांकन)",
        "craftType": "Assam Muga Silk", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Pure Endemic Assam Muga Silk (Antheraea assamensis), Red & Green Resham Threads", "materials": "Pure Wild Muga Silk",
        "technique": "Traditional Assamese Throw-Shuttle Tat Xal Handloom", "origin": "Sualkuchi, Kamrup, Assam",
        "description": "The Golden Silk of Assam. GI-certified Muga silk found nowhere else in the world. Naturally golden with shimmering luster that increases with every wash. Lasts over 50 years.",
        "descriptionHi": "सुआलकुची (असम का मैनचेस्टर) के बुनकरों द्वारा तैयार प्राकृतिक सुनहरी मूंगा सिल्क मेखेला चादर। जीआई प्रमाणित एवं 50 वर्षों से अधिक टिकाऊ।",
        "dimensions": "Chador: 2.8 meters x 1 meter, Mekhela: 2.4 meters x 1 meter, Blouse: 0.8 meter", "weight": "740 grams", "productionTime": "16 days", "capacity": "8 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 9200, "labourHours": 75, "labourRate": 170, "packagingCost": 350, "transportCost": 250, "otherCost": 150, "price": 29500, "stock": 4,
        "tags": ["Muga Silk", "Assam Golden Silk", "Mekhela Chador", "Sualkuchi", "GI Tagged", "Wild Silk"],
        "comparables": [
            {"source": "DEMO MARKET DATA — ARTFED Assam Apex Handloom", "price": 31000, "region": "Guwahati"},
            {"source": "DEMO MARKET DATA — Pragjyotika Assam Emporium", "price": 33500, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-48", "name": "Assam Eri Peace Silk Handwoven Throw Scarf",
        "titleEn": "Assam Eri (Ahimsa Peace Silk) Handwoven Textured Throw Scarf", "titleHi": "असमिया एरी (अहिंसा सिल्क) हथकरघा टेक्सचर्ड शॉल / दुपट्टा",
        "craftType": "Assam Muga Silk", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Organic Hand-Spun Eri Silk (Philosamia ricini - Cruelty Free)", "materials": "Cruelty-Free Eri Silk Yarn",
        "technique": "Takli Hand-Spun Yarn Woven on Loin / Throw-Shuttle Loom", "origin": "Sualkuchi, Assam",
        "description": "Cruelty-free Ahimsa silk where silkworms leave the cocoon unharmed before spinning. Wool-like thermal warmth with soft cotton-like breathability.",
        "descriptionHi": "बिना रेशम कीट को मारे तैयार किया गया अहिंसा एरी सिल्क। सर्दियों में गर्म और गर्मियों में ठंडा रहने वाला अनोखा वस्त्र।",
        "dimensions": "32 x 84 inches", "weight": "320 grams", "productionTime": "5 days", "capacity": "25 units/month", "moq": 8,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1200, "labourHours": 16, "labourRate": 140, "packagingCost": 90, "transportCost": 80, "otherCost": 45, "price": 4600, "stock": 18,
        "tags": ["Eri Silk", "Peace Silk", "Ahimsa Silk", "Assam Handloom", "Sustainable Fashion"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Guwahati Silk Exchange", "price": 4850, "region": "Guwahati"},
            {"source": "DEMO MARKET DATA — Raw Mango Sustainable Line", "price": 5500, "region": "National"}
        ]
    },

    # 49. TRIPURA - Debashish Tripura (artisan-49) - Bamboo Craft
    {
        "artisanId": "artisan-49", "name": "Tripura Bamboo Fine-Weave Fruit Basket",
        "titleEn": "Tripura Bamboo Fine-Weave Handcrafted Fruit Basket with Pedestal", "titleHi": "त्रिपुरा बांस महीन-बुनाई हस्तनिर्मित फल टोकरी (स्टैंड सहित)",
        "craftType": "Bamboo Craft", "category": "Home Décor & Storage", "craftCategory": "Bamboo & Cane",
        "material": "Seasoned Muli Bamboo (Melocanna baccifera), Smoked Cane Trim", "materials": "Natural Muli Bamboo",
        "technique": "Micro-Splitting (Kamthi) and Hexagonal Open Lattice Weave", "origin": "Agartala, West Tripura, Tripura",
        "description": "GI-recognized Tripura bamboo craft. Hand-woven with razor-thin flexible bamboo splints treated against borers. Light as a feather and naturally durable.",
        "descriptionHi": "त्रिपुरा के मुंगियाकामी बांस से बारीक बुनी गई सुरुचिपूर्ण फल टोकरी। फफूंद और दीमक रोधी उपचारित।",
        "dimensions": "11 inches diameter x 4 inches height", "weight": "210 grams", "productionTime": "1 day", "capacity": "180 units/month", "moq": 30,
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "materialCost": 120, "labourHours": 2.2, "labourRate": 120, "packagingCost": 45, "transportCost": 35, "otherCost": 20, "price": 620, "stock": 85,
        "tags": ["Bamboo Basket", "Tripura Bamboo", "GI Tagged", "Eco Dining", "Fruit Basket", "Northeast Craft"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Purbashree Tripura Emporium", "price": 680, "region": "Agartala"},
            {"source": "DEMO MARKET DATA — Dilli Haat Bamboo Stalls", "price": 750, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-49", "name": "Treated Bamboo Desktop Stationery Organizer",
        "titleEn": "Tripura Treated Bamboo Desktop Stationery Organizer & Pen Stand", "titleHi": "त्रिपुरा बांस डेस्कटॉप स्टेशनरी स्टैंड एवं पेन होल्डर",
        "craftType": "Bamboo Craft", "category": "Stationery & Gifting", "craftCategory": "Bamboo & Cane",
        "material": "Cylindrical Solid Pole Bamboo, Woven Mat Accents", "materials": "Natural Bamboo Stem",
        "technique": "Bamboo Lathe Finishing & Fine Mat Wrapping", "origin": "Agartala, Tripura",
        "description": "Multi-compartment desk caddy made from seasoned bamboo stems. Holds pens, business cards, and scissors with eco-friendly elegance.",
        "descriptionHi": "कार्यालय और अध्ययन कक्ष के लिए पर्यावरण अनुकूल बांस का पेन और स्टेशनरी स्टैंड।",
        "dimensions": "5.5 x 4 x 4.5 inches", "weight": "190 grams", "productionTime": "0.5 days", "capacity": "250 units/month", "moq": 40,
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        "materialCost": 80, "labourHours": 1.4, "labourRate": 120, "packagingCost": 35, "transportCost": 25, "otherCost": 15, "price": 420, "stock": 110,
        "tags": ["Pen Stand", "Bamboo Organizer", "Eco Corporate Gift", "Tripura", "Desk Caddy"],
        "comparables": [
            {"source": "DEMO MARKET DATA — NEHHDC Corporate Desk", "price": 480, "region": "Guwahati"},
            {"source": "DEMO MARKET DATA — Green Living Store", "price": 520, "region": "Bengaluru"}
        ]
    },

    # 50. MANIPUR - Ibemhal Devi (artisan-50) - Kauna Reed Basketry
    {
        "artisanId": "artisan-50", "name": "Hand-Braided Kauna Water Reed Picnic Tote Bag",
        "titleEn": "Hand-Braided Kauna Water Reed Picnic Tote Bag with Genuine Leather Straps", "titleHi": "मणिपुरी कौना वाटर-रीड हस्त-गुंथा पिकनिक टोट बैग (लेदर स्ट्रैप सहित)",
        "craftType": "Kauna Reed Basketry", "category": "Bags & Purses", "craftCategory": "Natural Fibre & Grass",
        "material": "Cultivated Kauna Water Reed (Schoenoplectus lacustris), Genuine Buffalo Leather Handles", "materials": "Kauna Reed, Leather",
        "technique": "Hand Twining & Braiding over Wooden Moulds", "origin": "Kakching, Thoubal Valley, Manipur",
        "description": "GI-recognized wetland grass handbag celebrated for its natural insulation, soft sponge-like texture, and beach/farmers market durability.",
        "descriptionHi": "मणिपुर के दलदली इलाकों में उगने वाली कौना घास से हाथ से बुना गया मजबूत बैग। लेदर हैंडल और प्राकृतिक फिनिश।",
        "dimensions": "14 inches width x 11 inches height x 5 inches depth", "weight": "460 grams", "productionTime": "2 days", "capacity": "90 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "materialCost": 260, "labourHours": 4.5, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1250, "stock": 45,
        "tags": ["Kauna Bag", "Water Reed", "Manipur GI", "Tote Bag", "Eco Fashion", "Beach Bag"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Imphal Ima Keithel Market", "price": 1350, "region": "Imphal"},
            {"source": "DEMO MARKET DATA — FabIndia Bags", "price": 1650, "region": "Retail"}
        ]
    },
    {
        "artisanId": "artisan-50", "name": "Kauna Reed Circular Floor Cushion / Meditation Mat",
        "titleEn": "Kauna Reed Circular Yoga & Floor Meditation Cushion (20-inch Zabuton)", "titleHi": "कौना रीड गोल योगा एवं ध्यान फ्लोर कुशन (20 इंच)",
        "craftType": "Kauna Reed Basketry", "category": "Home Furnishing & Linen", "craftCategory": "Natural Fibre & Grass",
        "material": "Sun-Dried Kauna Reed Core, Braided Outer Helix", "materials": "100% Biodegradable Kauna Reed",
        "technique": "Dense Concentric Radial Braiding", "origin": "Kakching, Manipur",
        "description": "Firm yet springy natural floor pouf cushion. Thermal insulating properties shield the body from cold tiled or marble floors during meditation.",
        "descriptionHi": "प्राकृतिक कौना घास से बुना हुआ गोल आसन। ध्यान, योग और बालकनी में बैठने के लिए आरामदायक।",
        "dimensions": "20 inches diameter x 3 inches thickness", "weight": "980 grams", "productionTime": "1.5 days", "capacity": "100 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "materialCost": 190, "labourHours": 3.0, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 25, "price": 890, "stock": 55,
        "tags": ["Meditation Cushion", "Kauna Mat", "Yoga Pouf", "Floor Seating", "Manipur Craft"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Manipur Handloom Development Corp", "price": 980, "region": "Imphal"},
            {"source": "DEMO MARKET DATA — Organic Living Bangalore", "price": 1150, "region": "Bengaluru"}
        ]
    },

    # 51. NAGALAND - Kevilezo Angami (artisan-51) - Naga Wood Carving & Spear Craft
    {
        "artisanId": "artisan-51", "name": "Hand-Carved Naga Hardwood Ceremonial Horn Cup",
        "titleEn": "Hand-Carved Naga Hardwood Ceremonial Drinking Cup with Mithun Horn Motif", "titleHi": "पारंपरिक नागा नक्काशीदार लकड़ी का कप (मिथुन सींग रूपांकन)",
        "craftType": "Naga Wood Carving & Spear Craft", "category": "Tableware & Dining", "craftCategory": "Woodcraft",
        "material": "Himalayan Gamari Hardwood, Organic Mustard Oil Finish", "materials": "Solid Hardwood",
        "technique": "Dao Axe Sculpting and Gouge Chisel Texture", "origin": "Khonoma Village, Kohima, Nagaland",
        "description": "Traditional Angami warrior ceremonial drinking goblet sculpted from dense mountain timber. Flanked by stylized horns of the sacred Mithun bison.",
        "descriptionHi": "नागालैंड के खोनोमा गांव के कारीगरों द्वारा कुल्हाड़ी और छेनी से तराशा गया लकड़ी का पारंपरिक कप। मिथुन सींग का प्रतीक।",
        "dimensions": "4 inches diameter x 8 inches height", "weight": "420 grams", "productionTime": "2 days", "capacity": "60 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 350, "labourHours": 5.5, "labourRate": 150, "packagingCost": 80, "transportCost": 65, "otherCost": 35, "price": 1750, "stock": 30,
        "tags": ["Naga Craft", "Mithun Horn", "Khonoma", "Warrior Cup", "Nagaland Woodcraft"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Nagaland Handloom & Handicrafts", "price": 1900, "region": "Kohima"},
            {"source": "DEMO MARKET DATA — Hornbill Festival Craft Arcade", "price": 2100, "region": "Kisama"}
        ]
    },
    {
        "artisanId": "artisan-51", "name": "Naga Warrior Shield Wall Hanging (Chiseled Wood)",
        "titleEn": "Naga Tribal Warrior Ceremonial Shield Wall Plaque with Dyed Goat Hair", "titleHi": "नागा जनजातीय योद्धा ढाल दीवार शिल्प (रंगे बकरी के बालों से सुसज्जित)",
        "craftType": "Naga Wood Carving & Spear Craft", "category": "Painting & Wall Art", "craftCategory": "Woodcraft",
        "material": "Single-Piece Wild Fig Wood, Red Dyed Mountain Goat Hair, Shell Cowries", "materials": "Mountain Timber, Goat Hair, Cowrie Shells",
        "technique": "Relief Facial Mask Carving & Hand-Inlaid Cowries", "origin": "Kohima, Nagaland",
        "description": "Authentic ceremonial warrior shield depicting ancestral guardian human faces and sun motifs. Flanked by fiery scarlet dyed goat hair plumes.",
        "descriptionHi": "नागा शौर्य परंपरा का प्रतीक। एक ही लकड़ी पर उकेरी गई पूर्वजों की रक्षाकारी मुखौटा ढाल।",
        "dimensions": "12 inches width x 32 inches height", "weight": "1.8 kg", "productionTime": "5 days", "capacity": "25 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 980, "labourHours": 16, "labourRate": 150, "packagingCost": 150, "transportCost": 120, "otherCost": 60, "price": 4800, "stock": 14,
        "tags": ["Naga Shield", "Tribal Wall Art", "Goat Hair", "Nagaland", "Warrior Artifact"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kohima State Museum Shop", "price": 5200, "region": "Kohima"},
            {"source": "DEMO MARKET DATA — Delhi Tribal Art Center", "price": 5600, "region": "Delhi"}
        ]
    },

    # 52. CHHATTISGARH - Dhaniram Kashyap (artisan-52) - Bastar Wrought Iron (Loha Shilp)
    {
        "artisanId": "artisan-52", "name": "Bastar Hand-Forged Wrought Iron Deer Figurine",
        "titleEn": "Bastar Hand-Forged Wrought Iron Deer Figurine (Pair, Loha Shilp)", "titleHi": "बस्तर हस्त-निर्मित पिटवां लोहा हिरण जोड़ी (लोहा शिल्प)",
        "craftType": "Bastar Wrought Iron (Loha Shilp)", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Recycled Scrap Iron, Natural Charcoal Furnace, Linseed Oil Dark Polish", "materials": "Wrought Iron (Recycled)",
        "technique": "Red-Hot Blacksmith Hand Beating with Anvil & Tongs", "origin": "Kondagaon, Bastar, Chhattisgarh",
        "description": "GI-recognized tribal black metal craft. Forged using heated scrap iron rods beaten on an anvil without casting moulds or welding. Depicts alert antelopes with curved antlers.",
        "descriptionHi": "बस्तर के लोहार कारीगरों द्वारा धधकती भट्टी में पीटकर बनाई गई लोहे के हिरण की जोड़ी। बिना वेल्डिंग का अनूठा आदिवासी शिल्प। जीआई टैग प्रमाणित।",
        "dimensions": "9 x 3 x 10 inches each (Pair)", "weight": "1.6 kg (pair)", "productionTime": "2 days", "capacity": "75 pairs/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "materialCost": 320, "labourHours": 6.5, "labourRate": 160, "packagingCost": 90, "transportCost": 80, "otherCost": 40, "price": 2150, "stock": 35,
        "tags": ["Loha Shilp", "Bastar Iron", "Wrought Iron", "GI Tagged", "Tribal Deer", "Black Metal"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Shabari Chhattisgarh Emporium", "price": 2300, "region": "Raipur"},
            {"source": "DEMO MARKET DATA — Dilli Haat Bastar Stall", "price": 2500, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-52", "name": "Bastar Wrought Iron Hanging Wall T-Lite Diya",
        "titleEn": "Bastar Handcrafted Wrought Iron Tree with 5 T-Lite Diyas (Wall Sconce)", "titleHi": "बस्तर हस्तशिल्प पिटवां लोहा दीवार वृक्ष दीया (5 टी-लाइट सहित)",
        "craftType": "Bastar Wrought Iron (Loha Shilp)", "category": "Lighting & Lamps", "craftCategory": "Metal Art",
        "material": "Forged Wrought Iron, Matte Black Rust-Resistant Coating", "materials": "Wrought Iron Sheet & Rods",
        "technique": "Hammer Flattening & Hot Twisting (Loha Shilp)", "origin": "Kondagaon, Chhattisgarh",
        "description": "Architectural tribal wall sconce representing a stylized tree branch with five curled leaf holders for tea-light candles. Dramatic shadowplay on walls.",
        "descriptionHi": "दीवार पर लगाने के लिए बस्तर का वृक्ष दीया स्टैंड। 5 टी-लाइट दीये रखने की व्यवस्था और सुंदर परछाई।",
        "dimensions": "14 x 3 x 20 inches", "weight": "1.2 kg", "productionTime": "1.5 days", "capacity": "90 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "materialCost": 220, "labourHours": 4.5, "labourRate": 150, "packagingCost": 80, "transportCost": 60, "otherCost": 35, "price": 1450, "stock": 45,
        "tags": ["Wall Sconce", "Bastar Craft", "Iron Tree", "T-Lite Diya", "Ambient Lighting"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kondagaon Artisan Society", "price": 1550, "region": "Bastar"},
            {"source": "DEMO MARKET DATA — Urban Living Sconces", "price": 1750, "region": "National"}
        ]
    }
]

print(f"Loaded Part 2: {len(PART2_PRODUCTS)} products for Artisans 27 to 52")
