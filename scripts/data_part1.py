# scripts/data_part1.py
# Products for Artisans 1 to 26 (Bihar, Jharkhand, West Bengal, Odisha, Rajasthan, Gujarat, Madhya Pradesh, Uttar Pradesh)

PART1_PRODUCTS = [
    # 1. BIHAR - Savita Devi (artisan-1) - Madhubani Painting (3 products)
    {
        "artisanId": "artisan-1", "name": "Hand-painted Madhubani Wall Art",
        "titleEn": "Hand-Painted Madhubani Folk Art (Tree of Life)", "titleHi": "हस्तनिर्मित मधुबनी लोक चित्रकला (जीवन का वृक्ष)",
        "craftType": "Madhubani Painting", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Handmade Bamboo Paper, Natural Pigments", "materials": "Handmade Paper, Natural Plant Pigments",
        "technique": "Nib & Bamboo Reed Kachni Linework", "origin": "Madhubani, Bihar",
        "description": "Authentic handmade Madhubani painting depicting the sacred Tree of Life and harmonious forest fauna. Created using fine nib linework and natural pigments extracted from turmeric, indigo, and marigold.",
        "descriptionHi": "प्राकृतिक रंगों और बांस की कलम से हस्तनिर्मित मधुबनी पेंटिंग। पारंपरिक जीवन वृक्ष और वन जीवों का सजीव चित्रण।",
        "dimensions": "22 x 30 inches (Unframed)", "weight": "220 grams", "productionTime": "3 to 4 days", "capacity": "40 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "materialCost": 350, "labourHours": 12, "labourRate": 150, "packagingCost": 90, "transportCost": 80, "otherCost": 50, "price": 3150, "stock": 25,
        "tags": ["Madhubani", "Folk Art", "Tree of Life", "GI Tagged", "Natural Pigments", "Wall Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Dilli Haat Direct Cluster", "price": 3200, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Mithila Artisan Cooperative", "price": 2950, "region": "Madhubani"},
            {"source": "DEMO MARKET DATA — FabIndia B2B Reference", "price": 3500, "region": "Retail"}
        ]
    },
    {
        "artisanId": "artisan-1", "name": "Madhubani Kohbar Nuptial Painting on Tussar Silk",
        "titleEn": "Madhubani Kohbar Nuptial Painting on Pure Tussar Silk", "titleHi": "शुद्ध टसर सिल्क पर हस्तनिर्मित मधुबनी कोहबर पेंटिंग",
        "craftType": "Madhubani Painting", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Pure Bhagalpur Tussar Silk, Mineral & Plant Dyes", "materials": "Tussar Silk, Organic Pigments",
        "technique": "Bharni Color Fill & Fine Nib Kachni Outlines", "origin": "Madhubani, Bihar",
        "description": "Museum-grade Kohbar nuptial painting rendered on pure Bhagalpur Tussar silk. Features auspicious lotus motifs, fish, and turtle symbols of fertility and prosperity.",
        "descriptionHi": "भागलपुरी टसर सिल्क पर प्राकृतिक रंगों से चित्रित पारंपरिक कोहबर विवाह चित्रकला।",
        "dimensions": "36 x 48 inches (Wall Hanging)", "weight": "350 grams", "productionTime": "7 to 8 days", "capacity": "15 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1800, "labourHours": 28, "labourRate": 160, "packagingCost": 200, "transportCost": 150, "otherCost": 120, "price": 8500, "stock": 12,
        "tags": ["Madhubani", "Tussar Silk", "Kohbar", "GI Tagged", "Heritage Art", "Luxury Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Central Cottage Industries", "price": 9200, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Mithila Craft Guild", "price": 8200, "region": "Patna"}
        ]
    },
    {
        "artisanId": "artisan-1", "name": "Madhubani Greeting Folio & Bookmarks Set",
        "titleEn": "Hand-Painted Madhubani Greeting Folio & Bookmarks (Set of 10)", "titleHi": "हस्तनिर्मित मधुबनी बुकमार्क एवं ग्रीटिंग सेट (10 का सेट)",
        "craftType": "Madhubani Painting", "category": "Stationery & Gifting", "craftCategory": "Folk Painting",
        "material": "Handmade Recycled Cotton Paper, Natural Inks", "materials": "Cotton Rag Paper, Vegetable Inks",
        "technique": "Fine Nib Detailing with Silk Tassel", "origin": "Madhubani, Bihar",
        "description": "Set of 10 exquisite bookmarks and miniature gift folios individually painted with sun, peacock, and floral motifs. Perfect for eco-friendly corporate and wedding gifting.",
        "descriptionHi": "हाथ से बने रिसाइकिल पेपर पर प्राकृतिक स्याही से रचित 10 बुकमार्क का सुंदर सेट।",
        "dimensions": "2.5 x 7 inches each", "weight": "90 grams (set)", "productionTime": "1 day", "capacity": "200 sets/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 90, "labourHours": 1.5, "labourRate": 120, "packagingCost": 40, "transportCost": 30, "otherCost": 15, "price": 450, "stock": 80,
        "tags": ["Madhubani", "Bookmarks", "Eco Friendly", "Corporate Gift", "Handmade Paper"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Dilli Haat Souvenir Counter", "price": 550, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Patna Book Emporium", "price": 420, "region": "Patna"}
        ]
    },

    # 2. BIHAR - Sanjay Prasad (artisan-2) - Sikki Grass Craft
    {
        "artisanId": "artisan-2", "name": "Golden Sikki Grass Decorative Pauti Box",
        "titleEn": "Handwoven Golden Sikki Grass Decorative Pauti Box", "titleHi": "हस्तनिर्मित सुनहरी सिक्की घास की पारंपरिक पौती टोकरी",
        "craftType": "Sikki Grass Craft", "category": "Home Décor & Storage", "craftCategory": "Natural Fibre & Grass",
        "material": "Wild Sikki Grass (Golden Grass), Munj Rope, Organic Dyes", "materials": "Sikki Golden Grass, Munj Grass",
        "technique": "Needle Puncturing & Coiling Weave", "origin": "Madhubani, Bihar",
        "description": "Traditional golden grass keepsake lidded box known as Pauti, dyed with organic madder and turmeric accents. Sturdy, moisture resistant, and naturally golden.",
        "descriptionHi": "प्राकृतिक सुनहरी सिक्की घास से सुई द्वारा बुनी गई पारंपरिक ढक्कनदार पौती पेटी।",
        "dimensions": "8 x 8 x 6 inches", "weight": "320 grams", "productionTime": "2 days", "capacity": "60 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "materialCost": 220, "labourHours": 4.5, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1250, "stock": 35,
        "tags": ["Sikki Grass", "Golden Grass", "GI Tagged", "Eco Decor", "Storage Box", "Handwoven"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Upendra Maharathi Sansthan", "price": 1350, "region": "Patna"},
            {"source": "DEMO MARKET DATA — Eco Living Bangalore", "price": 1500, "region": "Bengaluru"}
        ]
    },
    {
        "artisanId": "artisan-2", "name": "Sikki Grass Round Coasters Set with Holder",
        "titleEn": "Natural Sikki Grass Round Coasters with Holder (Set of 6)", "titleHi": "सिक्की घास के प्राकृतिक कोस्टर और स्टैंड (6 का सेट)",
        "craftType": "Sikki Grass Craft", "category": "Tableware & Dining", "craftCategory": "Natural Fibre & Grass",
        "material": "Wild Sikki Grass, Natural Vegetable Dyes", "materials": "100% Biodegradable Sikki Grass",
        "technique": "Tight Spiral Coiling with Contrast Borders", "origin": "Madhubani, Bihar",
        "description": "Heat-resistant dining coasters hand-braided from wetland golden grass with vibrant coloured concentric rings. Comes with a matching woven holder.",
        "descriptionHi": "डाइनिंग टेबल के लिए ऊष्मा प्रतिरोधी सिक्की घास के रंगीन कोस्टर सेट।",
        "dimensions": "4.5 inches diameter each", "weight": "180 grams (set)", "productionTime": "1 day", "capacity": "120 sets/month", "moq": 30,
        "imageUrl": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80",
        "materialCost": 95, "labourHours": 1.8, "labourRate": 120, "packagingCost": 40, "transportCost": 30, "otherCost": 15, "price": 480, "stock": 55,
        "tags": ["Sikki", "Coasters", "Sustainable Dining", "Tableware", "Eco Friendly"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Tribes India Portal", "price": 520, "region": "National"},
            {"source": "DEMO MARKET DATA — CraftRoots Ahmedabad", "price": 580, "region": "Ahmedabad"}
        ]
    },

    # 3. BIHAR - Geeta Kumari (artisan-3) - Khatwa Applique Craft
    {
        "artisanId": "artisan-3", "name": "Khatwa Applique Hand-Stitched Cushion Covers",
        "titleEn": "Handcrafted Khatwa Applique Cotton Cushion Covers (Pair)", "titleHi": "हस्तनिर्मित खटवा एप्लिक सूती कुशन कवर (जोड़ी)",
        "craftType": "Khatwa Applique Craft", "category": "Home Furnishing & Linen", "craftCategory": "Applique & Quilting",
        "material": "Pure Handloom Cotton, Contrast Muslin Patches", "materials": "Handloom Cotton Fabric",
        "technique": "Reverse Cutwork & Blind Hem Hand Stitching", "origin": "Muzaffarpur, Bihar",
        "description": "Geometric and elephant motif applique cushion covers hand-stitched by rural women artisans. Features concealed YKK zipper closure and pre-shrunk cotton fabric.",
        "descriptionHi": "मुजफ्फरपुर की महिला कारीगरों द्वारा सुई-धागे से हाथ से सिली गई पारंपरिक खटवा कुशन कवर जोड़ी।",
        "dimensions": "16 x 16 inches (Pair)", "weight": "310 grams (pair)", "productionTime": "2 days", "capacity": "80 pairs/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 280, "labourHours": 5.5, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1450, "stock": 45,
        "tags": ["Khatwa", "Applique", "Hand Stitched", "Cushion Covers", "Ethnic Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Dilli Haat Bihar Stall", "price": 1550, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Jaypore B2B Benchmark", "price": 1750, "region": "Online"}
        ]
    },
    {
        "artisanId": "artisan-3", "name": "Khatwa Patchwork Bed Runner",
        "titleEn": "Khatwa Hand-Applique Cotton Bed Runner with Kantha Stitch", "titleHi": "खटवा एप्लिक एवं कांथा टांकों से सुसज्जित सूती बेड रनर",
        "craftType": "Khatwa Applique Craft", "category": "Home Furnishing & Linen", "craftCategory": "Applique & Quilting",
        "material": "Woven Cotton Slub, Vegetable Indigo & Madder Patches", "materials": "Cotton Slub, Natural Indigo Dyes",
        "technique": "Multi-Tiered Cutwork Applique & Running Stitch", "origin": "Muzaffarpur, Bihar",
        "description": "Artisanal bed runner featuring heritage tree-of-life cutout silhouettes layered over raw handloom cotton. Designed for luxury hotel suites and boutique bedrooms.",
        "descriptionHi": "होटल व घरों के लिए विशेष रूप से तैयार हस्तनिर्मित खटवा बेड रनर।",
        "dimensions": "18 x 90 inches", "weight": "680 grams", "productionTime": "4 days", "capacity": "35 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 650, "labourHours": 12, "labourRate": 135, "packagingCost": 90, "transportCost": 80, "otherCost": 50, "price": 3200, "stock": 20,
        "tags": ["Khatwa", "Bed Runner", "Hospitality Linen", "Handloom Cotton", "Applique"],
        "comparables": [
            {"source": "DEMO MARKET DATA — FabIndia Home Catalog", "price": 3500, "region": "National"},
            {"source": "DEMO MARKET DATA — Bihar State Handloom Corp", "price": 3100, "region": "Patna"}
        ]
    },

    # 4. JHARKHAND - Meena Kumari (artisan-4) - Dokra Metal Craft (3 products)
    {
        "artisanId": "artisan-4", "name": "Tribal Dokra Brass Elephant Figurine",
        "titleEn": "Tribal Dokra Brass Elephant Figurine (Lost-Wax Casting)", "titleHi": "पारंपरिक ढोकरा पीतल हाथी शिल्प (खोई-मोम ढलाई)",
        "craftType": "Dokra Metal Craft", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Recycled Bell Metal & Brass Alloy, Beeswax Core", "materials": "Dhokra Brass Alloy",
        "technique": "Ancient Lost-Wax (Cire Perdue) Metal Casting", "origin": "Ranchi, Jharkhand",
        "description": "Handcrafted tribal brass elephant figurine featuring ornate coiled beeswax filigree detailing. Cast in durable non-ferrous brass alloy, each piece has unique hand-tooled tribal motifs.",
        "descriptionHi": "झारखंड के जनजातीय शिल्पकारों द्वारा खोई-मोम ढलाई विधि से निर्मित पीतल का पारंपरिक हाथी।",
        "dimensions": "6 x 4 x 7 inches", "weight": "850 grams", "productionTime": "2 days", "capacity": "80 units/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "materialCost": 420, "labourHours": 6.0, "labourRate": 220, "packagingCost": 70, "transportCost": 60, "otherCost": 40, "price": 2450, "stock": 40,
        "tags": ["Dokra", "Dhokra", "Tribal Art", "Brass Decor", "Lost Wax Casting", "Elephant"],
        "comparables": [
            {"source": "DEMO MARKET DATA — TRIFED Tribal Emporium", "price": 2600, "region": "National"},
            {"source": "DEMO MARKET DATA — Chotanagpur Metal Cluster", "price": 2350, "region": "Ranchi"},
            {"source": "DEMO MARKET DATA — Heritage Home B2B Catalog", "price": 2750, "region": "Mumbai"}
        ]
    },
    {
        "artisanId": "artisan-4", "name": "Dokra Tribal Musician Quintet",
        "titleEn": "Handcrafted Dokra Brass Tribal Musicians (Set of 5)", "titleHi": "पारंपरिक ढोकरा पीतल जनजातीय वादक समूह (5 का सेट)",
        "craftType": "Dokra Metal Craft", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Brass, Bronze Scrap Alloy, Natural Clay Mould", "materials": "Cast Bell Metal Alloy",
        "technique": "Lost-Wax Cire Perdue Hollow Casting", "origin": "Ranchi, Jharkhand",
        "description": "Complete set of 5 tribal folk musicians playing traditional dholak, mandar, flute, kartal, and nagada. Celebrated heritage showpiece for corporate gifting and gallery collections.",
        "descriptionHi": "मांदर, ढोलक और बांसुरी बजाते पांच जनजातीय लोक कलाकारों का दुर्लभ ढोकरा पीतल सेट।",
        "dimensions": "8 inches height each", "weight": "2.8 kg (set of 5)", "productionTime": "5 days", "capacity": "25 sets/month", "moq": 8,
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1400, "labourHours": 18, "labourRate": 190, "packagingCost": 220, "transportCost": 180, "otherCost": 100, "price": 6800, "stock": 15,
        "tags": ["Dokra", "Brass Musicians", "Tribal Handicraft", "GI Tagged", "Corporate Trophy"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Central Cottage Industries", "price": 7400, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Jharkhand Jharcraft Emporium", "price": 6500, "region": "Ranchi"}
        ]
    },
    {
        "artisanId": "artisan-4", "name": "Dokra Brass Tribal Sun Keychain",
        "titleEn": "Solid Cast Dokra Brass Sun God Keychain / Pocket Charm", "titleHi": "ढोकरा पीतल सूर्य देवता की-चेन / पॉकेट चार्म",
        "craftType": "Dokra Metal Craft", "category": "Souvenirs & Accessories", "craftCategory": "Metal Art",
        "material": "Recycled Brass Alloy, Heavy Duty Brass Ring", "materials": "Cast Brass with Natural Patina",
        "technique": "Miniature Lost-Wax Wire Wrapping", "origin": "Ranchi, Jharkhand",
        "description": "Durable handmade brass keychain featuring the ancient tribal solar deity symbol. Polished with natural mustard oil and beeswax.",
        "descriptionHi": "जनजातीय सूर्य प्रतीक वाली ठोस ढोकरा पीतल की चाबी की छल्ली।",
        "dimensions": "1.8 x 1.8 inches (Pendant)", "weight": "45 grams", "productionTime": "0.5 days", "capacity": "300 units/month", "moq": 50,
        "imageUrl": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
        "materialCost": 55, "labourHours": 0.8, "labourRate": 120, "packagingCost": 20, "transportCost": 15, "otherCost": 10, "price": 280, "stock": 120,
        "tags": ["Dokra Keychain", "Brass Souvenir", "Budget Gift", "Tribal Motif", "Pocket Charm"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Ranchi Souvenir Mart", "price": 320, "region": "Ranchi"},
            {"source": "DEMO MARKET DATA — Dilli Haat Kiosk", "price": 350, "region": "Delhi"}
        ]
    },

    # 5. JHARKHAND - Budhram Soren (artisan-5) - Sohrai & Khovar Painting
    {
        "artisanId": "artisan-5", "name": "Sohrai Tribal Art Canvas",
        "titleEn": "Authentic Sohrai Harvest Mural on Stretched Linen Canvas", "titleHi": "कैनवास पर पारंपरिक सोहराई फसल उत्सव चित्रकला",
        "craftType": "Sohrai & Khovar Painting", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Raw Stretched Belgian Linen, Natural Earth Ochers", "materials": "Belgian Linen, Clay Ocher Pigments",
        "technique": "Fingertip Dabbing & Datun Chew-Stick Brushwork", "origin": "Hazaribagh, Jharkhand",
        "description": "GI-recognized Sohrai mural depicting horned sacred bulls, peacocks, and flowering lotus buds. Rendered in mineral red, black manganese, and creamy kaolin clay pigments.",
        "descriptionHi": "हजारीबाग की प्रसिद्ध सोहराई भित्ति चित्रकला। प्राकृतिक मिट्टी व मैंगनीज के रंगों से रचित।",
        "dimensions": "24 x 36 inches", "weight": "550 grams", "productionTime": "3 days", "capacity": "40 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "materialCost": 650, "labourHours": 12, "labourRate": 150, "packagingCost": 120, "transportCost": 90, "otherCost": 50, "price": 3800, "stock": 22,
        "tags": ["Sohrai", "Khovar", "GI Tagged", "Tribal Canvas", "Earth Pigments", "Hazaribagh"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Virasat Arts Gallery", "price": 4200, "region": "Kolkata"},
            {"source": "DEMO MARKET DATA — Tribal Heritage Trust", "price": 3600, "region": "Ranchi"}
        ]
    },
    {
        "artisanId": "artisan-5", "name": "Khovar Nuptial Wall Plaque",
        "titleEn": "Khovar Comb-Cut Mud Art Wall Plaque in Teak Wood Frame", "titleHi": "सागौन फ्रेम में पारंपरिक खोवर कंघी-कटिंग वॉल प्लाक",
        "craftType": "Sohrai & Khovar Painting", "category": "Home Décor & Accents", "craftCategory": "Folk Painting",
        "material": "Hardboard Core with Multani Mitti & Dudhi Clay, Teakwood Frame", "materials": "Kaolin Clay, Charcoal Mud, Teak Wood",
        "technique": "Comb Sgraffito Cutting over Black Base", "origin": "Hazaribagh, Jharkhand",
        "description": "Traditional bridal chamber art carved by combing away white kaolin paste over wet charcoal-mud ground. Protected behind anti-glare museum acrylic.",
        "descriptionHi": "पारंपरिक विवाह गृह खोवर कला। कंघी से मिट्टी को कुरेदकर बनाई गई अनुपम ज्यामितीय आकृतियां।",
        "dimensions": "14 x 14 inches framed", "weight": "850 grams", "productionTime": "2 days", "capacity": "50 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "materialCost": 350, "labourHours": 6.0, "labourRate": 140, "packagingCost": 80, "transportCost": 60, "otherCost": 40, "price": 1850, "stock": 30,
        "tags": ["Khovar Art", "Sgraffito", "Mud Art", "Framed Plaque", "Tribal Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jharcraft State Outlet", "price": 1950, "region": "Ranchi"},
            {"source": "DEMO MARKET DATA — CraftRoots Online", "price": 2100, "region": "National"}
        ]
    },

    # 6. WEST BENGAL - Mohan Das (artisan-6) - Terracotta Craft
    {
        "artisanId": "artisan-6", "name": "Bankura Long-Neck Terracotta Horse",
        "titleEn": "Bankura Long-Neck Terracotta Horse (Pair, 14-inch)", "titleHi": "बांकुड़ा लंबी गर्दन वाला पारंपरिक टेराकोटा घोड़ा (जोड़ी, 14 इंच)",
        "craftType": "Terracotta Craft", "category": "Pottery & Terracotta", "craftCategory": "Clay Pottery",
        "material": "Alluvial Gangetic Clay, Natural Wood Fire Kiln", "materials": "Natural Terracotta Clay",
        "technique": "Wheel Throwing and Hand-Modelled Symmetry", "origin": "Panchmura, Bankura, West Bengal",
        "description": "The iconic symbol of Indian handicrafts. Hand-thrown on traditional wheels with majestic erect ears and symmetrical neck ornamentation.",
        "descriptionHi": "बांकुड़ा की प्रसिद्ध टेराकोटा कला का प्रतीक। पंचमुड़ा गांव के कुम्हारों द्वारा चाक पर निर्मित विशिष्ट सजावटी घोड़ा जोड़ी।",
        "dimensions": "14 x 6 x 4 inches each", "weight": "1.8 kg (pair)", "productionTime": "3 days", "capacity": "90 pairs/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "materialCost": 260, "labourHours": 6.5, "labourRate": 140, "packagingCost": 120, "transportCost": 90, "otherCost": 40, "price": 1950, "stock": 50,
        "tags": ["Bankura Horse", "Terracotta", "West Bengal", "GI Tagged", "Heritage Clay", "Home Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Biswa Bangla Emporium", "price": 2100, "region": "Kolkata"},
            {"source": "DEMO MARKET DATA — Dilli Haat Clay Market", "price": 2250, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-6", "name": "Clay Terracotta Chai Kulhad Set",
        "titleEn": "Natural Terracotta Chai Kulhad Set (Lead-Free, 12 Pcs)", "titleHi": "प्राकृतिक टेराकोटा चाय कुल्हड़ सेट (12 पीस)",
        "craftType": "Terracotta Craft", "category": "Tableware & Dining", "craftCategory": "Clay Pottery",
        "material": "Purified River Clay, Organic Rice Husk Fired", "materials": "100% Biodegradable Earthen Clay",
        "technique": "Potter's Wheel Hand-Throwing with Ribbed Rim", "origin": "Bankura, West Bengal",
        "description": "Traditional unglazed terracotta tea cups imparting an authentic earthy aroma. Fired to high vitrification for reuse or single-use eco catering.",
        "descriptionHi": "शुद्ध मिट्टी से हाथ से बने कुल्हड़ जो चाय के स्वाद को बढ़ाते हैं। पूरी तरह प्राकृतिक और सीसा-मुक्त।",
        "dimensions": "3 inches height, 150ml capacity each", "weight": "1.2 kg (set of 12)", "productionTime": "1 day", "capacity": "300 sets/month", "moq": 40,
        "imageUrl": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        "materialCost": 60, "labourHours": 1.4, "labourRate": 110, "packagingCost": 40, "transportCost": 35, "otherCost": 15, "price": 380, "stock": 140,
        "tags": ["Kulhad", "Clay Cups", "Eco Friendly", "Terracotta", "Chai Culture"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kolkata Clay Mart", "price": 420, "region": "Kolkata"},
            {"source": "DEMO MARKET DATA — Wholesale Chai Supplies", "price": 360, "region": "National"}
        ]
    },

    # 7. WEST BENGAL - Anjali Ghosh (artisan-7) - Kantha Embroidery
    {
        "artisanId": "artisan-7", "name": "Kantha Stitch Tussar Silk Stole",
        "titleEn": "Hand-Embroidered Kantha Stitch Pure Tussar Silk Stole", "titleHi": "हस्तनिर्मित कांथा कढ़ाई युक्त शुद्ध टसर सिल्क स्टोल",
        "craftType": "Kantha Embroidery", "category": "Heritage Handloom Textile", "craftCategory": "Embroidery",
        "material": "Pure Bhagalpur Tussar Silk, Resham Silk Threads", "materials": "Tussar Silk, Mulberry Silk Floss",
        "technique": "Intricate Running Kantha Needlework & Floral Boota", "origin": "Bolpur, Shantiniketan, West Bengal",
        "description": "Exquisite handcrafted stole adorned with authentic rural Bengal Nakshi Kantha running stitch motifs created over 3 weeks by rural women artisans.",
        "descriptionHi": "शांतिनिकेतन शैली की बारीक कांथा कढ़ाई से सजी शुद्ध टसर सिल्क की शॉल/स्टोल।",
        "dimensions": "28 x 80 inches", "weight": "240 grams", "productionTime": "14 days", "capacity": "25 units/month", "moq": 8,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1200, "labourHours": 16, "labourRate": 130, "packagingCost": 80, "transportCost": 70, "otherCost": 40, "price": 4200, "stock": 18,
        "tags": ["Kantha", "Nakshi Kantha", "Tussar Silk", "GI Tagged", "Shantiniketan", "Stole"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Biswa Bangla Shantiniketan", "price": 4500, "region": "Kolkata"},
            {"source": "DEMO MARKET DATA — FabIndia Silk Stoles", "price": 4800, "region": "Retail"}
        ]
    },
    {
        "artisanId": "artisan-7", "name": "Nakshi Kantha Hand-Stitched Quilt Dohar",
        "titleEn": "Heritage Nakshi Kantha Hand-Stitched Quilt / Dohar", "titleHi": "पारंपरिक नक़्शी कांथा हस्तनिर्मित दोहर / रजाई",
        "craftType": "Kantha Embroidery", "category": "Home Furnishing & Linen", "craftCategory": "Embroidery",
        "material": "Triple-Layer Pure Mulmul Cotton, Organic Cotton Floss", "materials": "100% Mulmul Cotton, Cotton Threads",
        "technique": "Dense Narrative Running Stitch & Paisleys", "origin": "Bolpur, West Bengal",
        "description": "Double-bed artisanal Dohar layered with soft unbleached cotton mulmul and stitched edge-to-edge with traditional village pastoral scenes and geometric borders.",
        "descriptionHi": "मलमल के तीन स्तरों पर हाथ से सिली गई नक़्शी कांथा रजाई। कोमल और टिकाऊ।",
        "dimensions": "90 x 108 inches (King Size)", "weight": "1.4 kg", "productionTime": "24 days", "capacity": "10 units/month", "moq": 4,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2200, "labourHours": 42, "labourRate": 130, "packagingCost": 180, "transportCost": 140, "otherCost": 80, "price": 9800, "stock": 8,
        "tags": ["Nakshi Kantha", "Quilt", "Dohar", "Mulmul Cotton", "Heritage Bedding"],
        "comparables": [
            {"source": "DEMO MARKET DATA — CCIC Heritage Bedding", "price": 10500, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Kolkata Guild", "price": 9400, "region": "Kolkata"}
        ]
    },

    # 8. ODISHA - Dushasan Mohapatra (artisan-8) - Pattachitra Painting
    {
        "artisanId": "artisan-8", "name": "Raghurajpur Pattachitra Dasavatara Scroll",
        "titleEn": "Raghurajpur Pattachitra Scroll — Dasavatara of Lord Vishnu", "titleHi": "रघुराजपुर पारंपरिक पट्टचित्र — भगवान विष्णु के दशावतार",
        "craftType": "Pattachitra Painting", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Handmade Cotton Tussar Cloth Canvas (Patta), Tamarind Gum, Stone Pigments", "materials": "Patta Canvas, Conch Shell & Mineral Dyes",
        "technique": "Fine Hair Brush Linework & Natural Stone Pigments", "origin": "Raghurajpur Heritage Crafts Village, Puri, Odisha",
        "description": "Masterwork scroll painting portraying the ten incarnations of Lord Vishnu in classical Odissi temple iconography. Rendered using white conch shell powder, lamp black, and cinnabar red.",
        "descriptionHi": "भगवान विष्णु के दस अवतारों को दर्शाने वाला मास्टरपीस पट्टचित्र। प्राकृतिक पत्थरों और शंख चूर्ण के रंगों से निर्मित।",
        "dimensions": "20 x 45 inches (Rolled Scroll with Silk Ribbon)", "weight": "420 grams", "productionTime": "18 days", "capacity": "8 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2800, "labourHours": 64, "labourRate": 180, "packagingCost": 350, "transportCost": 200, "otherCost": 150, "price": 18500, "stock": 6,
        "tags": ["Pattachitra", "Raghurajpur", "GI Tagged", "Dasavatara", "Masterwork", "Heritage Scroll"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Boyanika Heritage Gallery", "price": 19500, "region": "Bhubaneswar"},
            {"source": "DEMO MARKET DATA — Delhi Art Connoisseur Gallery", "price": 22000, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-8", "name": "Hand-Painted Palm Leaf Engraving (Talapatra Chitra)",
        "titleEn": "Hand-Carved Talapatra Chitra (Palm Leaf Engraving with Stand)", "titleHi": "पारंपरिक ताड़पत्र चित्र — हस्त उत्कीर्णन (स्टैंड सहित)",
        "craftType": "Pattachitra Painting", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Sun-Cured Palmyra Palm Leaves, Natural Lampblack Charcoal", "materials": "Cured Palm Leaf, Charcoal Pigment",
        "technique": "Iron Stylus (Lekhani) Incising and Charcoal Rubbing", "origin": "Raghurajpur, Puri, Odisha",
        "description": "Delicately stitched palm leaf slats incised with iron stylus needles depicting scenes from the Gita Govinda. Folding accordion structure supported by a natural wood easel.",
        "descriptionHi": "ताड़ के पत्तों पर लोहे की कलम से उकेरी गई भगवान कृष्ण की लीलाएं। काले काजल से रंगा गया पारंपरिक शिल्प।",
        "dimensions": "12 x 16 inches open", "weight": "260 grams", "productionTime": "4 days", "capacity": "40 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 8.5, "labourRate": 150, "packagingCost": 90, "transportCost": 70, "otherCost": 40, "price": 2400, "stock": 25,
        "tags": ["Talapatra", "Palm Leaf Art", "Pattachitra", "GI Tagged", "Odisha Craft"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Ekamra Haat Direct", "price": 2500, "region": "Bhubaneswar"},
            {"source": "DEMO MARKET DATA — TRIFED Sovereign Gifts", "price": 2700, "region": "National"}
        ]
    },

    # 9. ODISHA - Subhashree Meher (artisan-9) - Sambalpuri Handloom
    {
        "artisanId": "artisan-9", "name": "Sambalpuri Bandha Ikat Pure Silk Saree",
        "titleEn": "Sambalpuri Bandha Double Ikat Pure Mulberry Silk Saree", "titleHi": "संबलपुरी बांधा डबल इकत शुद्ध रेशम साड़ी (शंख चक्र बूटा)",
        "craftType": "Sambalpuri Handloom", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Pure Mulberry Silk, Natural Vat Dyes", "materials": "Pure Mulberry Silk",
        "technique": "Double Tie-and-Dye (Bandha Kala) on Frame Loom", "origin": "Bargarh, Odisha",
        "description": "GI-certified Sambalpuri Bandha saree featuring intricate Pasapalli chess-board patterns, conch shell (Shankha), and fish (Matsya) motifs woven over 10 days.",
        "descriptionHi": "बरगढ़ के मास्टर बुनकरों द्वारा डबल इकत तकनीक से तैयार संबलपुरी सिल्क साड़ी। जीआई प्रमाणित।",
        "dimensions": "5.5 meters saree + 0.8 meter blouse", "weight": "620 grams", "productionTime": "10 days", "capacity": "15 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 3200, "labourHours": 40, "labourRate": 160, "packagingCost": 180, "transportCost": 150, "otherCost": 100, "price": 12800, "stock": 10,
        "tags": ["Sambalpuri", "Bandha Ikat", "Pure Silk", "GI Tagged", "Pasapalli", "Bridal Saree"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Boyanika State Emporium", "price": 13500, "region": "Bhubaneswar"},
            {"source": "DEMO MARKET DATA — Handloom House Delhi", "price": 14200, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-9", "name": "Sambalpuri Handloom Cotton Ikat Dupatta",
        "titleEn": "Sambalpuri Handloom Cotton Ikat Dupatta / Stole", "titleHi": "संबलपुरी हथकरघा सूती इकत दुपट्टा / स्टोल",
        "craftType": "Sambalpuri Handloom", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "Mercerized 2/80s Combed Cotton, Fast Colors", "materials": "100% Combed Cotton",
        "technique": "Hand Tie-Dye Warp Ikat Weaving", "origin": "Bargarh, Odisha",
        "description": "Breathable handwoven cotton dupatta showcasing traditional Rudraksha temple border and fish bandha motifs. Perfect for daily ethnic elegance.",
        "descriptionHi": "बारीक सूती धागों से बुना गया संबलपुरी इकत दुपट्टा। मंदिर बॉर्डर और आकर्षक पल्लू।",
        "dimensions": "36 x 96 inches", "weight": "240 grams", "productionTime": "2 days", "capacity": "60 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 5.5, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1650, "stock": 35,
        "tags": ["Sambalpuri Cotton", "Ikat Dupatta", "Handloom", "Ethnic Wear", "Bargarh"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Bargarh Weavers Cooperative", "price": 1600, "region": "Bargarh"},
            {"source": "DEMO MARKET DATA — Urban Ethnic Stores", "price": 1850, "region": "Chennai"}
        ]
    },

    # 10. ODISHA - Kalandi Sahoo (artisan-10) - Silver Filigree (Tarkasi)
    {
        "artisanId": "artisan-10", "name": "Cuttack Tarkasi Pure Silver Konark Wheel Brooch",
        "titleEn": "Cuttack Tarkasi 92.5 Sterling Silver Konark Wheel Brooch", "titleHi": "कटक तारकशी शुद्ध चांदी कोणार्क चक्र ब्रोच / पिन",
        "craftType": "Silver Filigree (Tarkasi)", "category": "Jewelry & Precious Crafts", "craftCategory": "Metal Art",
        "material": "92.5 Sterling Silver, Anti-Tarnish Rhodium Polish", "materials": "Pure 92.5 Sterling Silver Wire",
        "technique": "Micro-Wire Twisting and Charcoal Solder Joining", "origin": "Naya Bazar, Cuttack, Odisha",
        "description": "GI-certified Cuttack Tarkasi brooch sculpted with gossamer-thin 0.2mm pure silver wires shaped into the 24 spokes of the Sun Temple Konark Wheel.",
        "descriptionHi": "बारीक चांदी के तारों को मोड़कर बनाया गया कोणार्क चक्र ब्रोच। कटक की विश्वप्रसिद्ध तारकशी कला।",
        "dimensions": "2.2 inches diameter", "weight": "24 grams", "productionTime": "2 days", "capacity": "50 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1650, "labourHours": 7.0, "labourRate": 220, "packagingCost": 120, "transportCost": 90, "otherCost": 60, "price": 3850, "stock": 20,
        "tags": ["Tarkasi", "Silver Filigree", "Cuttack", "GI Tagged", "925 Silver", "Brooch"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Utkalika Silver Counter", "price": 4100, "region": "Bhubaneswar"},
            {"source": "DEMO MARKET DATA — Cuttack Filigree Guild", "price": 3750, "region": "Cuttack"}
        ]
    },
    {
        "artisanId": "artisan-10", "name": "Tarkasi Pure Silver Peacock Diya Stand",
        "titleEn": "Tarkasi Heirloom Pure Silver Filigree Peacock Diya Stand", "titleHi": "तारकशी शुद्ध चांदी का पारंपरिक मयूर दीया स्टैंड (हेरिटेज)",
        "craftType": "Silver Filigree (Tarkasi)", "category": "Jewelry & Precious Crafts", "craftCategory": "Metal Art",
        "material": "92.5 Sterling Silver (140g silver weight)", "materials": "Certified 92.5 Fine Silver",
        "technique": "Hand-Drawn Filigree Lace Lattice & Soldering", "origin": "Cuttack, Odisha",
        "description": "Magnificent ritual diya stand crowned with an ornate filigree peacock with flared tail plumes. Heirloom wedding and festive showpiece certified for purity.",
        "descriptionHi": "140 ग्राम शुद्ध चांदी से निर्मित मयूर दीया स्टैंड। पीढ़ियों तक चलने वाला उत्कृष्ट हस्तशिल्प।",
        "dimensions": "7.5 inches height x 4 inches base", "weight": "140 grams pure silver", "productionTime": "12 days", "capacity": "8 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        "materialCost": 11500, "labourHours": 32, "labourRate": 240, "packagingCost": 450, "transportCost": 250, "otherCost": 200, "price": 24500, "stock": 5,
        "tags": ["Tarkasi", "Silver Diya", "Peacock", "GI Tagged", "Luxury Gift", "Heirloom Silver"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Tanishq Heritage Craft Benchmark", "price": 27500, "region": "National"},
            {"source": "DEMO MARKET DATA — Cuttack Tarkasi Association", "price": 23800, "region": "Cuttack"}
        ]
    },

    # 11. RAJASTHAN - Laxmi Bai (artisan-11) - Hand Block Printing
    {
        "artisanId": "artisan-11", "name": "Bagru Dabu Mud-Resist Cotton Saree",
        "titleEn": "Bagru Dabu Mud-Resist Hand Block Printed Cotton Saree", "titleHi": "बगरू दाबू मिट्टी-प्रतिरोध हस्त ब्लॉक प्रिंटेड सूती साड़ी",
        "craftType": "Hand Block Printing", "category": "Heritage Handloom Textile", "craftCategory": "Block Printing",
        "material": "100% Chanderi Cotton, Organic Indigo & Kashish Dyes", "materials": "Chanderi Cotton, Vegetable Dyes",
        "technique": "Hand Carved Sheesham Block Stamp & Clay Resist", "origin": "Bagru, Jaipur, Rajasthan",
        "description": "Eco-friendly hand-block printed saree created using traditional Dabu mud paste and fermented natural indigo vats. Features classic buta motifs and broad pallu.",
        "descriptionHi": "प्राकृतिक रंगों और दाबू मिट्टी तकनीक से बगरू में तैयार पारंपरिक हाथ की छपाई वाली साड़ी।",
        "dimensions": "5.5 meters saree + 0.8 meter blouse", "weight": "480 grams", "productionTime": "2 days", "capacity": "120 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 580, "labourHours": 8.0, "labourRate": 140, "packagingCost": 60, "transportCost": 60, "otherCost": 40, "price": 2650, "stock": 35,
        "tags": ["Bagru", "Block Print", "Dabu", "Natural Indigo", "GI Tagged", "Sustainable"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jaipur Bunkar Mandi", "price": 2550, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — Anokhi B2B Catalog", "price": 2950, "region": "Retail"}
        ]
    },
    {
        "artisanId": "artisan-11", "name": "Sanganeri Floral Block Printed Table Linen Set",
        "titleEn": "Sanganeri Hand Block Printed Cotton Table Runner & Mats (Set of 7)", "titleHi": "सांगानेरी हस्त ब्लॉक प्रिंटेड कॉटन टेबल रनर और मैट सेट (7 पीस)",
        "craftType": "Hand Block Printing", "category": "Home Furnishing & Linen", "craftCategory": "Block Printing",
        "material": "Heavyweight Cotton Duck, Non-Toxic Pigment Inks", "materials": "100% Cotton Duck Fabric",
        "technique": "Precision Sanganeri Block Alignment on White Ground", "origin": "Sanganer, Jaipur, Rajasthan",
        "description": "Dining set containing 1 long table runner and 6 matching placemats decorated with crisp Rajasthani floral jaals and cypress tree borders.",
        "descriptionHi": "डाइनिंग टेबल के लिए सांगानेरी प्रिंटेड रनर और 6 मैट का सेट। धोने में टिकाऊ और आकर्षक।",
        "dimensions": "Runner 14 x 72 inches, 6 Mats 12 x 18 inches", "weight": "620 grams", "productionTime": "1.5 days", "capacity": "90 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 320, "labourHours": 4.5, "labourRate": 130, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 1450, "stock": 40,
        "tags": ["Sanganeri", "Table Linen", "Block Print", "Jaipur", "Dining Set"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Sanganer Printers Guild", "price": 1400, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — FabIndia Table Decor", "price": 1750, "region": "Retail"}
        ]
    },

    # 12. RAJASTHAN - Ramswaroop Sharma (artisan-12) - Blue Pottery (3 products)
    {
        "artisanId": "artisan-12", "name": "Jaipur Blue Pottery Decorative Wall Plate",
        "titleEn": "Jaipur Traditional Blue Pottery Decorative Wall Plate (10-inch)", "titleHi": "जयपुर पारंपरिक ब्लू पॉटरी सजावटी दीवार प्लेट (10 इंच)",
        "craftType": "Blue Pottery", "category": "Pottery & Terracotta", "craftCategory": "Pottery",
        "material": "Quartz Stone Powder, Glass Powder, Natural Cobalt Glaze", "materials": "Quartz, Glass & Oxide Pigments (Clay-Free)",
        "technique": "Dough Moulding, Hand Painting & Low-Fire Kiln Glazing", "origin": "Kot Jewar, Jaipur, Rajasthan",
        "description": "Clay-free heritage Blue Pottery plate featuring intricate Persian floral motifs in brilliant cobalt blue and turquoise. Pre-fitted with a brass wall hook.",
        "descriptionHi": "जयपुर की प्रसिद्ध ब्लू पॉटरी कला से निर्मित सजावटी प्लेट। कोबाल्ट ब्लू और फिरोजी रंगों में पारंपरिक फारसी डिजाइन।",
        "dimensions": "10 inches diameter x 1.2 inches rim", "weight": "480 grams", "productionTime": "2 days", "capacity": "60 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "materialCost": 280, "labourHours": 4.0, "labourRate": 150, "packagingCost": 90, "transportCost": 70, "otherCost": 35, "price": 1650, "stock": 25,
        "tags": ["Blue Pottery", "Jaipur GI", "Wall Decor", "Cobalt Blue", "Hand Painted Plate"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jaipur Crafts Association", "price": 1600, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — Dilli Haat Artisan Benchmark", "price": 1850, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-12", "name": "Blue Pottery Handcrafted Ceramic Drawer Knobs",
        "titleEn": "Jaipur Blue Pottery Ceramic Drawer Knobs with Brass Screws (Set of 8)", "titleHi": "जयपुर ब्लू पॉटरी अलमारी नॉब्स सेट (8 पीस, ब्रास स्क्रू सहित)",
        "craftType": "Blue Pottery", "category": "Home Hardware & Fixtures", "craftCategory": "Pottery",
        "material": "Quartz Powder, Oxide Colors, Solid Brass Hardware", "materials": "Handmade Ceramic, Brass Rod",
        "technique": "Moulded Spherical Glaze & Miniature Painting", "origin": "Jaipur, Rajasthan",
        "description": "Set of 8 hand-painted floral cabinet knobs with anti-rust brass fitting rods. Ideal for refurbishing chests, kitchen cabinets, and credenzas.",
        "descriptionHi": "अलमारी और दराजों के लिए हाथ से रंगे ब्लू पॉटरी नॉब्स। ब्रास फिटिंग के साथ 8 का सेट।",
        "dimensions": "1.5 inches diameter x 2.5 inches length each", "weight": "360 grams (set)", "productionTime": "1 day", "capacity": "150 sets/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "materialCost": 120, "labourHours": 2.0, "labourRate": 130, "packagingCost": 50, "transportCost": 40, "otherCost": 20, "price": 680, "stock": 70,
        "tags": ["Drawer Knobs", "Blue Pottery", "Cabinet Hardware", "Jaipur", "Ceramic Knobs"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jaipur Export Hardware", "price": 750, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — Urban Ladder Accents", "price": 890, "region": "National"}
        ]
    },
    {
        "artisanId": "artisan-12", "name": "Blue Pottery Cylindrical Flower Vase",
        "titleEn": "Jaipur Blue Pottery Cylindrical Floral Vase (12-inch)", "titleHi": "जयपुर ब्लू पॉटरी बेलनाकार फूलदान (12 इंच)",
        "craftType": "Blue Pottery", "category": "Home Décor & Accents", "craftCategory": "Pottery",
        "material": "Quartz Sand, Fuller's Earth, Turquoise Glaze", "materials": "Lead-Free Ceramic Glaze",
        "technique": "Hand-Turned Cylinder with Arabesque Vines", "origin": "Jaipur, Rajasthan",
        "description": "Vibrant turquoise vase with cascading Mughal vine patterns. Water-resistant glazed interior suitable for fresh floral arrangements.",
        "descriptionHi": "मुगलकालीन लता-पत्तियों के डिजाइन वाला 12 इंच ऊंचा फूलदान। ताजे फूलों के लिए जलरोधी।",
        "dimensions": "5 inches diameter x 12 inches height", "weight": "950 grams", "productionTime": "3 days", "capacity": "45 units/month", "moq": 12,
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 5.5, "labourRate": 150, "packagingCost": 120, "transportCost": 90, "otherCost": 45, "price": 2200, "stock": 20,
        "tags": ["Flower Vase", "Blue Pottery", "Jaipur GI", "Turquoise", "Mughal Art"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Rajasthali State Outlet", "price": 2350, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — Dilli Haat Emporium", "price": 2500, "region": "Delhi"}
        ]
    },

    # 13. RAJASTHAN - Nandlal Jangid (artisan-13) - Miniature Painting
    {
        "artisanId": "artisan-13", "name": "Kishangarh Bani Thani Miniature on Silk",
        "titleEn": "Kishangarh Bani Thani Traditional Miniature Painting on Silk", "titleHi": "किशनगढ़ बनी-ठनी पारंपरिक लघु चित्रकला (शुद्ध रेशम पर)",
        "craftType": "Miniature Painting", "category": "Painting & Wall Art", "craftCategory": "Fine Art",
        "material": "Pure Raw Silk Canvas, Real Gold Leaf (Varq), Mineral Colors", "materials": "Silk Canvas, 24K Gold Leaf, Stone Pigments",
        "technique": "Single-Squirrel-Hair Brush Stroke Detailing", "origin": "Kishangarh, Ajmer, Rajasthan",
        "description": "Celebrated as India's Mona Lisa. Depicts Princess Bani Thani with elongated eyes, arched eyebrows, and translucent gold-dusted odhani.",
        "descriptionHi": "भारत की मोनालिसा कही जाने वाली किशनगढ़ शैली की बनी-ठनी पेंटिंग। असली 24K सोने के वर्क और खनिज रंगों से रचित।",
        "dimensions": "16 x 22 inches framed with raw silk mat", "weight": "650 grams", "productionTime": "7 days", "capacity": "18 units/month", "moq": 4,
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1250, "labourHours": 22, "labourRate": 160, "packagingCost": 160, "transportCost": 120, "otherCost": 80, "price": 6500, "stock": 14,
        "tags": ["Bani Thani", "Miniature Painting", "Kishangarh", "Gold Leaf", "Royal Rajasthan", "Fine Art"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jaipur City Palace Art Shop", "price": 7200, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — National Crafts Museum Store", "price": 6800, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-13", "name": "Rajasthani Royal Procession Miniature Desk Plaque",
        "titleEn": "Hand-Painted Royal Procession Miniature on Bone-China Plaque", "titleHi": "शाही सवारी लघु चित्रकला डेस्क प्लाक (हस्तनिर्मित)",
        "craftType": "Miniature Painting", "category": "Home Décor & Accents", "craftCategory": "Fine Art",
        "material": "Synthetic Ivory/Marble Dust Plaque, Mineral Inks", "materials": "Marble Dust Tile, Natural Colors",
        "technique": "Microscopic Brush Lining with Brass Easel", "origin": "Kishangarh, Rajasthan",
        "description": "Intricate desktop keepsake portraying a maharaja atop an ornamented royal tusker accompanied by retainers carrying royal umbrellas.",
        "descriptionHi": "मेजबानों और अधिकारियों के लिए टेबल पर रखने योग्य शाही सवारी का सुंदर लघु चित्र।",
        "dimensions": "6 x 8 inches with folding wooden stand", "weight": "380 grams", "productionTime": "2 days", "capacity": "50 units/month", "moq": 12,
        "imageUrl": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
        "materialCost": 350, "labourHours": 6.0, "labourRate": 140, "packagingCost": 80, "transportCost": 60, "otherCost": 40, "price": 1950, "stock": 25,
        "tags": ["Royal Procession", "Desk Decor", "Miniature", "Corporate Souvenir", "Rajasthan"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Rajasthali Emporium", "price": 2100, "region": "Jaipur"},
            {"source": "DEMO MARKET DATA — Heritage Gift Hub", "price": 2250, "region": "Gurugram"}
        ]
    },

    # 14. RAJASTHAN - Karni Singh (artisan-14) - Leather Mojari
    {
        "artisanId": "artisan-14", "name": "Camel Leather Embroidered Mojari Jutti",
        "titleEn": "Traditional Handcrafted Camel Leather Embroidered Mojari (Jutti)", "titleHi": "पारंपरिक हस्तनिर्मित ऊंट के चमड़े की कसीदाकारी मोजड़ी (जूती)",
        "craftType": "Leather Mojari", "category": "Footwear & Leather Goods", "craftCategory": "Leather Craft",
        "material": "Vegetable-Tanned Camel Leather, Resham & Zari Threads", "materials": "Genuine Camel Leather, Silk Thread",
        "technique": "Curved Turned-Toe Cobbling and Hand Kashidakari", "origin": "Jodhpur, Rajasthan",
        "description": "Authentic Jodhpuri mojari stitched using vegetable-cured camel hide that softens and molds naturally to the wearer's foot without bites.",
        "descriptionHi": "जोधपुर के मोचियों द्वारा हाथ से सिली गई आरामदायक मोजड़ी। जरी और रेशम की सुंदर कढ़ाई।",
        "dimensions": "Available in Sizes 6 to 11 UK/India", "weight": "420 grams (pair)", "productionTime": "2 days", "capacity": "100 pairs/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 5.0, "labourRate": 140, "packagingCost": 70, "transportCost": 60, "otherCost": 40, "price": 1650, "stock": 45,
        "tags": ["Mojari", "Jutti", "Camel Leather", "Jodhpur", "Ethnic Footwear", "Wedding Wear"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jodhpur Clock Tower Bazaar", "price": 1550, "region": "Jodhpur"},
            {"source": "DEMO MARKET DATA — Manyavar Footwear Partner", "price": 2100, "region": "National"}
        ]
    },
    {
        "artisanId": "artisan-14", "name": "Hand-Tooled Raw Leather Slip-On Mules",
        "titleEn": "Hand-Tooled Genuine Leather Moroccan-Style Mules", "titleHi": "हस्त-उकेरित चमड़े के आधुनिक स्लिप-ऑन म्यूल्स",
        "craftType": "Leather Mojari", "category": "Footwear & Leather Goods", "craftCategory": "Leather Craft",
        "material": "Vegetable-Tanned Buff Hide, Cushioned Leather Insole", "materials": "Full Grain Leather, Latex Foam",
        "technique": "Hand Stamping & Goodyear Welt Stitching", "origin": "Jodhpur, Rajasthan",
        "description": "Contemporary open-back leather mules designed for resortwear and urban lifestyle boutiques, combining traditional cobbling with modern ergonomics.",
        "descriptionHi": "पारंपरिक तकनीक और आधुनिक कम्फर्ट का मिश्रण। फुल ग्रेन लेदर से निर्मित बैकलेस म्यूल्स।",
        "dimensions": "Sizes 5 to 11 Unisex", "weight": "460 grams", "productionTime": "2 days", "capacity": "80 pairs/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        "materialCost": 520, "labourHours": 6.0, "labourRate": 140, "packagingCost": 80, "transportCost": 70, "otherCost": 40, "price": 2100, "stock": 30,
        "tags": ["Leather Mules", "Resortwear", "Handcrafted Shoes", "Artisan Leather", "Jodhpur"],
        "comparables": [
            {"source": "DEMO MARKET DATA — FabIndia Footwear", "price": 2400, "region": "Retail"},
            {"source": "DEMO MARKET DATA — Jaipur Design Collective", "price": 2250, "region": "Jaipur"}
        ]
    },

    # 15. GUJARAT - Farida Begum (artisan-15) - Rogan Art
    {
        "artisanId": "artisan-15", "name": "Nirona Rogan Castor-Oil Painted Stole",
        "titleEn": "Nirona Rogan Castor-Oil Freehand Painted Silk Stole", "titleHi": "निरोना रोगन अरंडी-तेल हस्तचित्रित सिल्क स्टोल",
        "craftType": "Rogan Art", "category": "Heritage Handloom Textile", "craftCategory": "Textile Painting",
        "material": "Pure Raw Tussar Silk, Boiled Castor Oil Paste, Natural Earth Pigments", "materials": "Raw Silk, Castor Oil Paste",
        "technique": "Freehand Metal Rod Air-Styling and Symmetrical Folding", "origin": "Nirona Village, Kutch, Gujarat",
        "description": "Rare GI-tagged craft surviving in only a few Kutchi artisan families. Castor oil jelly trailed through a metal stylus onto silk without ever touching the fabric.",
        "descriptionHi": "कच्छ के निरोना गांव की दुर्लभ रोगन कला। अरंडी के तेल से बने पेस्ट को लोहे की सलाई से सिल्क पर उकेरा जाता है।",
        "dimensions": "26 x 78 inches", "weight": "280 grams", "productionTime": "8 days", "capacity": "15 units/month", "moq": 4,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1500, "labourHours": 24, "labourRate": 160, "packagingCost": 140, "transportCost": 110, "otherCost": 70, "price": 7400, "stock": 10,
        "tags": ["Rogan Art", "Nirona", "GI Tagged", "Castor Oil Craft", "Kutch Heritage", "Silk Stole"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Gurjari Gujarat Emporium", "price": 8200, "region": "Ahmedabad"},
            {"source": "DEMO MARKET DATA — Master Craftsman Direct", "price": 7500, "region": "Bhuj"}
        ]
    },
    {
        "artisanId": "artisan-15", "name": "Framed Rogan Tree of Life Wall Art",
        "titleEn": "Masterwork Rogan Art 'Tree of Life' Framed Wall Panel", "titleHi": "मास्टरपीस रोगन आर्ट 'जीवन का वृक्ष' फ़्रेम्ड दीवार चित्र",
        "craftType": "Rogan Art", "category": "Painting & Wall Art", "craftCategory": "Fine Art",
        "material": "Heavyweight Black Cotton Khadi, Castor Oil Paste with 24K Gold Dust", "materials": "Khadi Canvas, Natural Pigments",
        "technique": "Precision Freehand Trailing and Mirror-Image Pressing", "origin": "Nirona, Kutch, Gujarat",
        "description": "Museum-grade framed artwork identical to the presentation gift given by India's Prime Minister to world leaders. Flawless symmetry of peacocks and flowering branches.",
        "descriptionHi": "राष्ट्रीय और अंतरराष्ट्रीय स्तर पर सम्मानित रोगन कला का उत्कृष्ट जीवन वृक्ष। काले खादी कैनवास पर सुनहरी छटा।",
        "dimensions": "28 x 40 inches framed in dark rosewood", "weight": "2.4 kg", "productionTime": "16 days", "capacity": "6 units/month", "moq": 2,
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2600, "labourHours": 52, "labourRate": 190, "packagingCost": 350, "transportCost": 220, "otherCost": 150, "price": 16200, "stock": 5,
        "tags": ["Rogan Tree of Life", "Museum Grade", "GI Tagged", "Kutch Art", "Presidential Gift"],
        "comparables": [
            {"source": "DEMO MARKET DATA — National Gallery of Modern Art Shop", "price": 18500, "region": "Delhi"},
            {"source": "DEMO MARKET DATA — Kutch Craft Heritage Collective", "price": 16500, "region": "Ahmedabad"}
        ]
    },

    # 16. GUJARAT - Devjibhai Vankar (artisan-16) - Bhujodi Handloom
    {
        "artisanId": "artisan-16", "name": "Bhujodi Kala Cotton Handwoven Shawl",
        "titleEn": "Bhujodi Organic Kala Cotton Handwoven Shawl with Extra-Weft", "titleHi": "भुजोड़ी जैविक काला कॉटन हस्तनिर्मित शॉल (एक्स्ट्रा-वेफ्ट डिजाइन)",
        "craftType": "Bhujodi Handloom", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Rainfed Indigenous Kala Cotton, Madder & Indigo Dyes", "materials": "Organic Kala Cotton Yarn",
        "technique": "Pit-Loom Extra-Weft Interlocking and Braided Tassels", "origin": "Bhujodi, Kutch, Gujarat",
        "description": "Woven by Vankar master weavers using non-hybrid indigenous Kala cotton. Textured handle with geometric tribal medallions along the pallu edges.",
        "descriptionHi": "कच्छ के मूल काला कॉटन से पारंपरिक गड्ढा-करघे पर बुनी गई शॉल। प्राकृतिक रंगों से रंजित।",
        "dimensions": "34 x 84 inches", "weight": "390 grams", "productionTime": "5 days", "capacity": "30 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1100, "labourHours": 18, "labourRate": 140, "packagingCost": 90, "transportCost": 80, "otherCost": 50, "price": 4800, "stock": 20,
        "tags": ["Bhujodi", "Kala Cotton", "Vankar Weave", "GI Tagged", "Kutch Shawl", "Sustainable Handloom"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Khamir Crafts Kutch", "price": 5200, "region": "Bhuj"},
            {"source": "DEMO MARKET DATA — Jaypore Handloom", "price": 5500, "region": "Retail"}
        ]
    },
    {
        "artisanId": "artisan-16", "name": "Kutch Merino Wool Handwoven Throw Blanket",
        "titleEn": "Kutch Desi & Merino Wool Handwoven Sofa Throw Blanket", "titleHi": "कच्छी देसी व मेरिनो ऊन हस्तनिर्मित सोफा थ्रो कंबल",
        "craftType": "Bhujodi Handloom", "category": "Home Furnishing & Linen", "craftCategory": "Handloom Weaving",
        "material": "Blend of Kutch Indigenous Sheep Wool & Fine Merino Wool", "materials": "Hand-Spun Pure Wool",
        "technique": "Heavy Double-Beam Handloom Weaving with Mirror Accents", "origin": "Bhujodi, Gujarat",
        "description": "Heirloom-weight sofa throw designed to bring warmth and authentic rustic artisanal character to modern interior spaces.",
        "descriptionHi": "घरों और रिसॉर्ट्स के लिए भारी ऊनी थ्रो कंबल। पारंपरिक कांच के टुकड़ों (आभाला) का सुंदर काम।",
        "dimensions": "50 x 70 inches", "weight": "1.1 kg", "productionTime": "8 days", "capacity": "15 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2400, "labourHours": 28, "labourRate": 150, "packagingCost": 150, "transportCost": 120, "otherCost": 70, "price": 8900, "stock": 10,
        "tags": ["Wool Throw", "Bhujodi", "Blanket", "Rustic Luxury", "Handwoven Wool"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Kutch Wool Cooperative", "price": 9500, "region": "Bhuj"},
            {"source": "DEMO MARKET DATA — Urban Living Bangalore", "price": 10200, "region": "Bengaluru"}
        ]
    },

    # 17. GUJARAT - Jayshreeben Patel (artisan-17) - Bandhani Tie-Dye
    {
        "artisanId": "artisan-17", "name": "Jamnagar Pure Georgette Bandhani Dupatta",
        "titleEn": "Jamnagar Hand-Knotted Pure Georgette Bandhani Dupatta", "titleHi": "जामनगर हस्त-गांठ शुद्ध जॉर्जेट बांधनी दुपट्टा",
        "craftType": "Bandhani Tie-Dye", "category": "Heritage Handloom Textile", "craftCategory": "Tie & Dye",
        "material": "Pure Viscose Georgette, Fast Azo-Free Acid Dyes", "materials": "Pure Georgette, Silk Threads",
        "technique": "Micro-Knotting (Bindi Bandhan) with Fingernail Thimbles", "origin": "Jamnagar, Gujarat",
        "description": "Exquisite Jamnagar Bandhani featuring over 8,000 individually hand-tied knots forming concentric circular chakras and traditional Shikari hunting scenes.",
        "descriptionHi": "जामनगर की प्रसिद्ध बारीक बांधनी। 8000 से अधिक हाथ से बांधी गई गांठों वाला लहरिया और चक्र दुपट्टा।",
        "dimensions": "36 x 96 inches", "weight": "220 grams", "productionTime": "6 days", "capacity": "35 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 900, "labourHours": 14, "labourRate": 135, "packagingCost": 70, "transportCost": 60, "otherCost": 40, "price": 3600, "stock": 25,
        "tags": ["Bandhani", "Jamnagar", "GI Tagged", "Georgette", "Tie and Dye", "Ethnic Wear"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Jamnagar Bandhani Mandi", "price": 3800, "region": "Jamnagar"},
            {"source": "DEMO MARKET DATA — Surat Silk Exchange", "price": 4100, "region": "Surat"}
        ]
    },
    {
        "artisanId": "artisan-17", "name": "Gharchola Bridal Dupatta with Zari Grid",
        "titleEn": "Traditional Gharchola Pure Gaji Silk Bridal Dupatta with Zari", "titleHi": "पारंपरिक घरचोला शुद्ध गजी सिल्क दुल्हन दुपट्टा (जरी ग्रिड सहित)",
        "craftType": "Bandhani Tie-Dye", "category": "Heritage Handloom Textile", "craftCategory": "Tie & Dye",
        "material": "Pure Gaji Silk, Real Tested Gold Zari Grid", "materials": "Gaji Silk, Gold Zari",
        "technique": "Square Zari Grid (Chowkadi) with Hand-Tied Dots", "origin": "Jamnagar, Gujarat",
        "description": "Sacred Gujarati wedding heirloom. 52 distinct square checks (Chowkadi) filled with elephants, peacocks, and lotuses hand-knotted in fine Bandhej.",
        "descriptionHi": "गुजराती शादियों का पारंपरिक घरचोला। 52 जरी के चौकों में सजी हाथ की बंधेज कला।",
        "dimensions": "42 x 100 inches", "weight": "490 grams", "productionTime": "18 days", "capacity": "12 units/month", "moq": 3,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 3400, "labourHours": 38, "labourRate": 150, "packagingCost": 180, "transportCost": 140, "otherCost": 80, "price": 11500, "stock": 8,
        "tags": ["Gharchola", "Bridal Bandhani", "Gaji Silk", "GI Tagged", "Wedding Heritage"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Ahmedabad Bridal Bazaar", "price": 12500, "region": "Ahmedabad"},
            {"source": "DEMO MARKET DATA — Mumbai Zaveri Bazaar Bridal", "price": 13800, "region": "Mumbai"}
        ]
    },

    # 18. GUJARAT - Bharatbhai Soni (artisan-18) - Agate Stone Craft
    {
        "artisanId": "artisan-18", "name": "Polished Cambay Moss Agate Coaster Set",
        "titleEn": "Polished Cambay Moss Agate Coaster Set with Brass Rim (4 Pcs)", "titleHi": "कैम्बे मॉस अगेट स्टोन कोस्टर सेट (4 पीस, ब्रास रिम सहित)",
        "craftType": "Agate Stone Craft", "category": "Tableware & Dining", "craftCategory": "Stone Carving",
        "material": "Natural Translucent Moss Agate Geodes, Hand-Buffed Brass Rim", "materials": "Semi-Precious Agate Stone, Brass",
        "technique": "Diamond Lapidary Slicing and Diamond Grit Polishing", "origin": "Khambhat (Cambay), Anand, Gujarat",
        "description": "GI-certified Khambhat agate stone sliced into natural cross-sections with visible green dendritic moss inclusions. Sealed with protective food-safe buffer.",
        "descriptionHi": "खंभात का प्रसिद्ध अगेट पत्थर। प्राकृतिक हरे क्रिस्टल पैटर्न से युक्त 4 कोस्टरों का प्रीमियम सेट।",
        "dimensions": "4 inches diameter each", "weight": "540 grams (set)", "productionTime": "2 days", "capacity": "75 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "materialCost": 380, "labourHours": 4.5, "labourRate": 150, "packagingCost": 80, "transportCost": 60, "otherCost": 35, "price": 1450, "stock": 35,
        "tags": ["Agate", "Cambay Stone", "GI Tagged", "Luxury Coasters", "Gemstone Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Khambhat Lapidary Guild", "price": 1500, "region": "Khambhat"},
            {"source": "DEMO MARKET DATA — Bombay Store Luxury Home", "price": 1850, "region": "Mumbai"}
        ]
    },
    {
        "artisanId": "artisan-18", "name": "Hand-Carved Agate Stone Desk Paperweight",
        "titleEn": "Sculpted Cambay Banded Agate Paperweight & Card Holder", "titleHi": "खंभात नक्काशीदार अगेट स्टोन पेपरवेट और कार्ड होल्डर",
        "craftType": "Agate Stone Craft", "category": "Stationery & Gifting", "craftCategory": "Stone Carving",
        "material": "Natural Red & Carnelian Banded Agate Rock", "materials": "Semi-Precious Carnelian Agate",
        "technique": "Lapidary Freeform Carving & High-Sheen Felt Buffing", "origin": "Khambhat, Gujarat",
        "description": "Hand-polished organic crystalline paperweight with a precision card-slit top. Displays mesmerising volcanic rock striations and carnelian bands.",
        "descriptionHi": "प्राकृतिक कार्नेलियन अगेट पत्थर का ठोस पेपरवेट। ऑफिस डेस्क और कॉर्पोरेट उपहार के लिए उपयुक्त।",
        "dimensions": "3.5 x 2.8 x 2 inches", "weight": "410 grams", "productionTime": "1 day", "capacity": "120 units/month", "moq": 25,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 190, "labourHours": 2.5, "labourRate": 140, "packagingCost": 50, "transportCost": 40, "otherCost": 20, "price": 850, "stock": 60,
        "tags": ["Agate Paperweight", "Desk Accessory", "Corporate Gift", "Carnelian", "Khambhat"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Ahmedabad Corporate Gifts", "price": 950, "region": "Ahmedabad"},
            {"source": "DEMO MARKET DATA — Dilli Haat Stone Craft", "price": 1100, "region": "Delhi"}
        ]
    },

    # 19. MADHYA PRADESH - Poonam Sahu (artisan-19) - Chanderi Weaving
    {
        "artisanId": "artisan-19", "name": "Chanderi Silk-Cotton Saree with Ashavali Border",
        "titleEn": "Chanderi Silk-Cotton Handloom Saree with Gold Ashavali Border", "titleHi": "चंदेरी सिल्क-कॉटन हथकरघा साड़ी (गोल्ड आशावली बॉर्डर सहित)",
        "craftType": "Chanderi Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "70% Degummed Mulberry Silk, 30% Fine Cotton Warp, Zari Weft", "materials": "Silk-Cotton Blend, Tested Zari",
        "technique": "Fly-Shuttle Traditional Pit Loom with Hand-Plucked Buttis", "origin": "Pranpur, Chanderi, Ashoknagar, Madhya Pradesh",
        "description": "Sheer and feather-light GI-tagged Chanderi saree woven with pure silk warp and delicate cotton weft. Features shimmering gold coin (Ashrafi) motifs.",
        "descriptionHi": "प्राणपुर के बुनकरों द्वारा तैयार चंदेरी सिल्क-कॉटन साड़ी। वजन में हल्की और शाही चमक से परिपूर्ण।",
        "dimensions": "5.5 meters saree + 0.8 meter blouse", "weight": "420 grams", "productionTime": "6 days", "capacity": "25 units/month", "moq": 6,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2100, "labourHours": 24, "labourRate": 150, "packagingCost": 120, "transportCost": 90, "otherCost": 60, "price": 7800, "stock": 16,
        "tags": ["Chanderi", "Silk Cotton", "Ashavali", "GI Tagged", "Festive Saree", "Pranpur"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Mrignayanee MP Emporium", "price": 8400, "region": "Bhopal"},
            {"source": "DEMO MARKET DATA — Chanderi Bunkar Union", "price": 7600, "region": "Chanderi"}
        ]
    },
    {
        "artisanId": "artisan-19", "name": "Chanderi Cotton Dupatta with Hand-Spun Buttis",
        "titleEn": "Chanderi Handloom Pure Cotton Dupatta with Zari Butti", "titleHi": "चंदेरी हथकरघा शुद्ध सूती दुपट्टा (जरी बूटी वर्क)",
        "craftType": "Chanderi Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "100% Fine Combed Chanderi Cotton, Golden Zari Accents", "materials": "Fine Cotton, Zari Yarn",
        "technique": "Hand-Picked Needle Weft Insertion", "origin": "Chanderi, Madhya Pradesh",
        "description": "Gossamer translucent cotton dupatta with subtle gold-woven coin motifs and double contrast selvedges. Elegant accent for ethnic kurtas.",
        "descriptionHi": "पारदर्शी और कोमल चंदेरी सूती दुपट्टा। हाथ से बुनी गई बारीक जरी बूटियां।",
        "dimensions": "36 x 96 inches", "weight": "160 grams", "productionTime": "2 days", "capacity": "60 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 480, "labourHours": 6.5, "labourRate": 135, "packagingCost": 60, "transportCost": 50, "otherCost": 30, "price": 2100, "stock": 35,
        "tags": ["Chanderi Dupatta", "Pure Cotton", "Handloom", "Ethnic Stole", "Chanderi"],
        "comparables": [
            {"source": "DEMO MARKET DATA — MP Hastashilp Vikas Nigam", "price": 2250, "region": "Indore"},
            {"source": "DEMO MARKET DATA — FabIndia Cotton Stoles", "price": 2450, "region": "Retail"}
        ]
    },

    # 20. MADHYA PRADESH - Rameshwar Baghel (artisan-20) - Bagh Print
    {
        "artisanId": "artisan-20", "name": "Authentic Bagh Hand-Block Printed Cotton Bedcover",
        "titleEn": "Authentic Bagh Hand-Block Printed Cotton Double Bedcover with Shams", "titleHi": "पारंपरिक बाघ हस्त ब्लॉक प्रिंटेड सूती बेडशीट सेट (तकिया कवर सहित)",
        "craftType": "Bagh Print", "category": "Home Furnishing & Linen", "craftCategory": "Block Printing",
        "material": "100% Pre-Washed Cotton Sheeting, Alizarin Red & Ferrous Sulfate Dyes", "materials": "Organic Cotton, Natural Bagh Dyes",
        "technique": "Bagh River Washing & Repeated Wooden Block Impression", "origin": "Bagh Village, Dhar, Madhya Pradesh",
        "description": "GI-certified Bagh print bedcover washed in the mineral-rich waters of the Baghini river. Striking contrast of deep alizarin red and jet black.",
        "descriptionHi": "बाघिनी नदी के खनिज युक्त पानी में धुली बाघ प्रिंटेड बेडशीट। प्राकृतिक लाल और काले रंगों की अनूठी चमक।",
        "dimensions": "90 x 108 inches with 2 Pillow Covers (18 x 28 inches)", "weight": "1.2 kg", "productionTime": "3 days", "capacity": "80 sets/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 720, "labourHours": 8.0, "labourRate": 140, "packagingCost": 90, "transportCost": 80, "otherCost": 50, "price": 2850, "stock": 30,
        "tags": ["Bagh Print", "GI Tagged", "Natural Red and Black", "Dhar", "Bedcover", "Hand Block"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Dhar Weavers Samiti", "price": 2950, "region": "Dhar"},
            {"source": "DEMO MARKET DATA — Mrignayanee Bhopal", "price": 3200, "region": "Bhopal"}
        ]
    },
    {
        "artisanId": "artisan-20", "name": "Bagh Printed Chanderi Silk Stole",
        "titleEn": "Bagh Hand-Block Printed Chanderi Silk Stole (Red & Black)", "titleHi": "बाघ प्रिंटेड चंदेरी सिल्क स्टोल (लाल एवं काला)",
        "craftType": "Bagh Print", "category": "Heritage Handloom Textile", "craftCategory": "Block Printing",
        "material": "Handwoven Chanderi Silk-Cotton Blend, Natural Plant Inks", "materials": "Chanderi Silk, Vegetable Inks",
        "technique": "Bagh Block Stamping & Sunlight Bleaching", "origin": "Bagh, Dhar, Madhya Pradesh",
        "description": "Lightweight sheer Chanderi stole printed with rhythmic Bagh floral bootas. Features zari selvedge and raw fringed ends.",
        "descriptionHi": "चंदेरी सिल्क पर पारंपरिक बाघ प्रिंट की छपाई। दोनों ऐतिहासिक कलाओं का सुंदर संगम।",
        "dimensions": "24 x 80 inches", "weight": "140 grams", "productionTime": "1.5 days", "capacity": "100 units/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 390, "labourHours": 4.0, "labourRate": 135, "packagingCost": 50, "transportCost": 45, "otherCost": 25, "price": 1550, "stock": 50,
        "tags": ["Bagh Stole", "Chanderi", "Hand Block", "Natural Dyes", "Ethnic Fashion"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Mrignayanee Indore", "price": 1650, "region": "Indore"},
            {"source": "DEMO MARKET DATA — CraftRoots Ahmedabad", "price": 1800, "region": "Ahmedabad"}
        ]
    },

    # 21. MADHYA PRADESH - Munnalal Uikey (artisan-21) - Gond Tribal Painting
    {
        "artisanId": "artisan-21", "name": "Gond Hand-Painted Canvas — Birds in Mahua Tree",
        "titleEn": "Gond Hand-Painted Acrylic Canvas — Birds in sacred Mahua Tree", "titleHi": "गोंड जनजातीय कैनवास चित्रकला — महुआ वृक्ष और पक्षी",
        "craftType": "Gond Tribal Painting", "category": "Painting & Wall Art", "craftCategory": "Folk Painting",
        "material": "Stretched Cotton Canvas, Vibrant Artists' Acrylics & Fine Pens", "materials": "Cotton Canvas, Acrylic Emulsion",
        "technique": "Signature Gond Dot-and-Line Pattern Texturing", "origin": "Patangarh, Dindori, Madhya Pradesh",
        "description": "Original tribal painting by Pardhan Gond artist capturing the sacred Mahua tree surrounded by dancing birds, deer, and river spirits.",
        "descriptionHi": "पाटनगढ़ के गोंड चित्रकारों द्वारा बारीक बिंदुओं और रेखाओं से रचित महुआ वृक्ष और वन जीवों की जीवंत चित्रकला।",
        "dimensions": "30 x 40 inches (Stretched on Pine Stretcher)", "weight": "950 grams", "productionTime": "6 days", "capacity": "20 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "materialCost": 980, "labourHours": 18, "labourRate": 150, "packagingCost": 150, "transportCost": 110, "otherCost": 60, "price": 5400, "stock": 15,
        "tags": ["Gond Art", "Tribal Canvas", "Patangarh", "Mahua Tree", "Contemporary Folk Art", "GI Tagged"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Bharat Bhavan Gallery Shop", "price": 5800, "region": "Bhopal"},
            {"source": "DEMO MARKET DATA — Delhi Tribal Art Center", "price": 6400, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-21", "name": "Gond Art Bookmark & Postcard Folio",
        "titleEn": "Gond Tribal Art Illustrated Bookmark & Art Cards (Set of 8)", "titleHi": "गोंड आदिवासी कला बुकमार्क एवं आर्ट कार्ड सेट (8 पीस)",
        "craftType": "Gond Tribal Painting", "category": "Stationery & Gifting", "craftCategory": "Folk Painting",
        "material": "350 GSM Textured Recycled Cardstock, Silk Tassels", "materials": "Recycled Board, Eco Inks",
        "technique": "Hand-Drawn Indigenous Graphic Motifs", "origin": "Dindori, Madhya Pradesh",
        "description": "Set of 8 collectible art cards and bookmarks printed with authentic Gond totemic animal motifs. Packaged in a handmade lokta paper sleeve.",
        "descriptionHi": "हाथ से बने कार्ड्स और बुकमार्क का सेट। हिरण, मोर और मछली के पारंपरिक गोंड रूपांकन।",
        "dimensions": "2 x 6 inches (Bookmarks), 4 x 6 inches (Cards)", "weight": "80 grams", "productionTime": "0.5 days", "capacity": "250 sets/month", "moq": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        "materialCost": 70, "labourHours": 1.2, "labourRate": 120, "packagingCost": 35, "transportCost": 25, "otherCost": 15, "price": 350, "stock": 100,
        "tags": ["Gond Stationery", "Bookmarks", "Art Cards", "Tribal Souvenir", "Budget Gift"],
        "comparables": [
            {"source": "DEMO MARKET DATA — TRIFED Retail Desk", "price": 400, "region": "National"},
            {"source": "DEMO MARKET DATA — Bhopal Museum Store", "price": 380, "region": "Bhopal"}
        ]
    },

    # 22. MADHYA PRADESH - Kamla Bai (artisan-22) - Bell Metal Craft
    {
        "artisanId": "artisan-22", "name": "Tikamgarh Bell Metal Gauri-Shankar Diya",
        "titleEn": "Tikamgarh Bell Metal Ritual Gauri-Shankar Oil Lamp (Diya)", "titleHi": "टीकमगढ़ घंटी धातु (बेल मेटल) गौरी-शंकर पारंपरिक दीया",
        "craftType": "Bell Metal Craft", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "High-Tin Bell Metal Bronze Alloy (78% Copper, 22% Tin)", "materials": "Pure Kansa / Bell Metal",
        "technique": "Open Crucible Casting and Hand Lathe Chiseling", "origin": "Tikamgarh, Bundelkhand, Madhya Pradesh",
        "description": "Traditional acoustic bell metal oil lamp known for its golden resonance and rust-free durability. Features engraved lotus petals and flared base.",
        "descriptionHi": "बुंदेलखंड के टीकमगढ़ की प्रसिद्ध कांस्य/घंटी धातु से बना दीया। मधुर ध्वनि और टिकाऊ गुणवत्ता।",
        "dimensions": "7 inches height x 4.5 inches diameter", "weight": "740 grams", "productionTime": "2 days", "capacity": "70 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "materialCost": 550, "labourHours": 7.0, "labourRate": 160, "packagingCost": 80, "transportCost": 70, "otherCost": 40, "price": 2750, "stock": 30,
        "tags": ["Bell Metal", "Tikamgarh", "GI Tagged", "Kansa Diya", "Bundelkhand", "Pooja Lamp"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Bundelkhand Metal Association", "price": 2900, "region": "Tikamgarh"},
            {"source": "DEMO MARKET DATA — Gwalior Handicrafts Center", "price": 3100, "region": "Gwalior"}
        ]
    },
    {
        "artisanId": "artisan-22", "name": "Cast Bell Metal Traditional Singing Bowl",
        "titleEn": "Hand-Hammered Bell Metal Meditation Singing Bowl with Wooden Mallet", "titleHi": "हस्तनिर्मित बेल मेटल ध्यान एवं गायन कटोरा (लकड़ी के मैलेट सहित)",
        "craftType": "Bell Metal Craft", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Virgin Kansa Bell Metal Alloy, Rosewood Striker", "materials": "7-Metal Bronze Alloy, Hardwood",
        "technique": "Hot Forging & Hand Beating into True Musical Pitch", "origin": "Tikamgarh, Madhya Pradesh",
        "description": "Produces a rich, sustained acoustic hum when circled with the wooden striker. Ideal for meditation spaces, spa centers, and mindful living.",
        "descriptionHi": "ध्यान और मानसिक शांति के लिए विशेष रूप से तैयार कांस्य कटोरा। दीर्घकालीन सुरीली गूंज।",
        "dimensions": "5.5 inches diameter x 3.2 inches depth", "weight": "620 grams", "productionTime": "1.5 days", "capacity": "60 units/month", "moq": 12,
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "materialCost": 420, "labourHours": 4.5, "labourRate": 160, "packagingCost": 70, "transportCost": 60, "otherCost": 35, "price": 1850, "stock": 25,
        "tags": ["Singing Bowl", "Bell Metal", "Meditation", "Sound Therapy", "Kansa"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Rishikesh Yoga Supplier", "price": 2100, "region": "Uttarakhand"},
            {"source": "DEMO MARKET DATA — MP Craft Emporium", "price": 1950, "region": "Indore"}
        ]
    },

    # 23. UTTAR PRADESH - Rameshwar Devi (artisan-23) - Banarasi Handloom (3 products)
    {
        "artisanId": "artisan-23", "name": "Pure Katan Silk Banarasi Saree with Kadwa Zari",
        "titleEn": "Handcrafted Pure Katan Silk Banarasi Saree with Kadwa Zari", "titleHi": "हस्तनिर्मित शुद्ध कतान सिल्क बनारसी साड़ी (कड़वा ज़री)",
        "craftType": "Banarasi Handloom Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "Pure Mulberry Katan Silk, Tested Gold & Silver Zari", "materials": "Pure Katan Silk, Gold Zari",
        "technique": "Pit-Loom Kadwa Weaving (No Loose Threads at Back)", "origin": "Varanasi, Uttar Pradesh",
        "description": "GI-certified masterwork Banarasi saree woven over 12 days on traditional pit looms. Features pure Katan silk with hand-engraved Kadwa floral boota that feels flush on both sides.",
        "descriptionHi": "वाराणसी के मास्टर बुनकर द्वारा 12 दिनों में तैयार की गई कड़वा बूटा युक्त शुद्ध कतान सिल्क बनारसी साड़ी। जीआई टैग प्रमाणित।",
        "dimensions": "5.5 meters saree + 0.8 meter unstitched blouse", "weight": "780 grams", "productionTime": "12 to 14 days", "capacity": "10 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 4200, "labourHours": 96, "labourRate": 150, "packagingCost": 250, "transportCost": 200, "otherCost": 150, "price": 28500, "stock": 5,
        "tags": ["Banarasi Saree", "Pure Katan Silk", "Kadwa Weave", "GI Tagged", "Bridal Heritage", "Handloom"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Varanasi Weaver Direct B2B", "price": 27500, "region": "Varanasi"},
            {"source": "DEMO MARKET DATA — FabIndia B2B Catalog Benchmark", "price": 34000, "region": "National"},
            {"source": "DEMO MARKET DATA — Handloom Export Promotion Council", "price": 29000, "region": "Export"}
        ]
    },
    {
        "artisanId": "artisan-23", "name": "Banarasi Silk Brocade Tanchoi Dupatta",
        "titleEn": "Banarasi Pure Silk Tanchoi Brocade Dupatta with Paisley Motifs", "titleHi": "बनारसी शुद्ध रेशम तंचोई ब्रोकेड दुपट्टा (पैसले रूपांकन)",
        "craftType": "Banarasi Handloom Weaving", "category": "Heritage Handloom Textile", "craftCategory": "Handloom Weaving",
        "material": "Pure Mulberry Silk, Dual-Toned Resham Weft", "materials": "100% Mulberry Silk",
        "technique": "Tanchoi Multi-Color Weft Weaving (Satin Ground)", "origin": "Varanasi, Uttar Pradesh",
        "description": "Sumptuous reversible silk dupatta woven using the heritage Tanchoi satin brocade method. Features miniature blooming ambi paisleys with zero float threads.",
        "descriptionHi": "रेशम के धागों से तंचोई तकनीक में बुना गया बनारसी दुपट्टा। दोनों ओर से मुलायम और चमकदार।",
        "dimensions": "36 x 98 inches", "weight": "340 grams", "productionTime": "7 days", "capacity": "20 units/month", "moq": 6,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 2100, "labourHours": 28, "labourRate": 150, "packagingCost": 140, "transportCost": 110, "otherCost": 70, "price": 8900, "stock": 14,
        "tags": ["Banarasi Dupatta", "Tanchoi", "Pure Silk", "GI Tagged", "Bridal Dupatta"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Chowk Varanasi Silk Mandi", "price": 9400, "region": "Varanasi"},
            {"source": "DEMO MARKET DATA — Delhi Bridal Emporium", "price": 10500, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-23", "name": "Banarasi Brocade Cushion Covers Pair",
        "titleEn": "Banarasi Zari Brocade Cushion Covers with Silk Flange (Pair)", "titleHi": "बनारसी ज़री ब्रोकेड कुशन कवर जोड़ी (रेशमी किनारी सहित)",
        "craftType": "Banarasi Handloom Weaving", "category": "Home Furnishing & Linen", "craftCategory": "Handloom Weaving",
        "material": "Banarasi Silk Brocade, Heavy Cotton Lining, Hidden YKK Zip", "materials": "Silk Brocade, Cotton Lining",
        "technique": "Jacquard Handloom Brocade with Zari Accents", "origin": "Varanasi, Uttar Pradesh",
        "description": "Pair of opulent accent pillow covers woven on Varanasi handlooms. Brings royal Mughal dining and drawing room grandeur to contemporary living spaces.",
        "descriptionHi": "लग्जरी घरों और होटलों के लिए बनारसी ब्रोकेड कुशन कवर की जोड़ी। टिकाऊ लाइनिंग और हिडन ज़िप।",
        "dimensions": "16 x 16 inches (Pair)", "weight": "380 grams (pair)", "productionTime": "2 days", "capacity": "60 pairs/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 480, "labourHours": 5.5, "labourRate": 140, "packagingCost": 70, "transportCost": 60, "otherCost": 35, "price": 1950, "stock": 35,
        "tags": ["Banarasi Brocade", "Cushion Covers", "Zari", "Home Decor", "Royal Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Good Earth Luxury Benchmark", "price": 2400, "region": "Retail"},
            {"source": "DEMO MARKET DATA — Varanasi Handloom Outlet", "price": 2050, "region": "Varanasi"}
        ]
    },

    # 24. UTTAR PRADESH - Ramesh Kumar (artisan-24) - Khurja Pottery
    {
        "artisanId": "artisan-24", "name": "Khurja Hand-Painted Ceramic Chai Cup & Saucer Set",
        "titleEn": "Khurja Hand-Painted Ceramic Chai Cup & Saucer Set (6 Pcs)", "titleHi": "खुर्जा हस्त-चित्रित सिरेमिक चाय कप एवं सॉसर सेट (6 का सेट)",
        "craftType": "Khurja Pottery", "category": "Tableware & Dining", "craftCategory": "Ceramics",
        "material": "High-Grade Porcelain Stoneware Clay, Food-Safe Gloss Glaze", "materials": "Stoneware Ceramic, Non-Toxic Glaze",
        "technique": "Wheel Throwing and Freehand Brush Painted Floral Vines", "origin": "Khurja, Bulandshahr, Uttar Pradesh",
        "description": "Microwave and dishwasher-safe handcrafted ceramic tea cups. Made by Khurja potters with authentic blue and ochre Mughal botanical motifs.",
        "descriptionHi": "माइक्रोवेव एवं डिशवॉशर सुरक्षित खुर्जा सिरेमिक चाय सेट। पारंपरिक मुगल फूलों की हाथ से पेंटिंग।",
        "dimensions": "Cup 180ml, Saucer 5.5 inches (6 Pairs)", "weight": "1.8 kg (set)", "productionTime": "2 days", "capacity": "100 sets/month", "moq": 20,
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "materialCost": 240, "labourHours": 3.0, "labourRate": 130, "packagingCost": 90, "transportCost": 70, "otherCost": 30, "price": 950, "stock": 50,
        "tags": ["Khurja Pottery", "Ceramic Cups", "Tableware", "Mughal Art", "GI Tagged", "Chai Set"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Khurja Potters Association", "price": 900, "region": "Khurja"},
            {"source": "DEMO MARKET DATA — FabIndia Dinnerware", "price": 1250, "region": "National"}
        ]
    },
    {
        "artisanId": "artisan-24", "name": "Khurja Glazed Ceramic Table Lamp Base",
        "titleEn": "Khurja Handcrafted Glazed Ceramic Table Lamp Base (14-inch)", "titleHi": "खुर्जा हस्तनिर्मित सिरेमिक टेबल लैंप बेस (14 इंच)",
        "craftType": "Khurja Pottery", "category": "Lighting & Lamps", "craftCategory": "Ceramics",
        "material": "Vitrified High-Fire Stoneware, Solid Brass Fixtures, E27 Holder", "materials": "Porcelain Clay, Brass Fitting",
        "technique": "Moulded Fluted Relief with Crackle Reactive Glaze", "origin": "Khurja, Uttar Pradesh",
        "description": "Artisan lamp base with gorgeous crackle glaze finish in deep teal. Complete with internal wire channel and CE-certified brass lamp socket.",
        "descriptionHi": "होटल एवं बेडरूम के लिए खुर्जा सिरेमिक लैंप बेस। डीप टील क्रैकल ग्लेज़ फिनिश।",
        "dimensions": "7 inches diameter x 14 inches height", "weight": "2.2 kg", "productionTime": "3 days", "capacity": "50 units/month", "moq": 12,
        "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        "materialCost": 580, "labourHours": 6.5, "labourRate": 150, "packagingCost": 150, "transportCost": 110, "otherCost": 50, "price": 2600, "stock": 25,
        "tags": ["Khurja Lamp", "Ceramic Lighting", "Table Lamp", "GI Tagged", "Crackle Glaze"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Home Centre Lighting", "price": 2950, "region": "National"},
            {"source": "DEMO MARKET DATA — Khurja Export Zone", "price": 2450, "region": "Khurja"}
        ]
    },

    # 25. UTTAR PRADESH - Mohammad Aslam (artisan-25) - Chikankari Embroidery
    {
        "artisanId": "artisan-25", "name": "Lucknowi Hand-Embroidered Mulmul Kurta",
        "titleEn": "Lucknowi Hand-Embroidered Pure Mulmul Kurta (Bakhiya & Phanda)", "titleHi": "लखनवी हस्त-कढ़ाई शुद्ध मलमल कुर्ता (बखिया एवं फंदा टांके)",
        "craftType": "Chikankari Embroidery", "category": "Apparel & Garments", "craftCategory": "Embroidery",
        "material": "100% Superfine Cotton Mulmul, Pure Cotton Skein Thread", "materials": "Pure Mulmul Cotton",
        "technique": "Master 6-Stitch Chikankari: Bakhiya, Phanda, Murri, Jaali", "origin": "Chowk, Lucknow, Uttar Pradesh",
        "description": "Airy and pristine white-on-white men's/unisex kurta hand-embroidered by Awadh karigars over 10 days. Features intricate lattice jaali work on the placket.",
        "descriptionHi": "लखनऊ के पारंपरिक कारीगरों द्वारा शुद्ध मलमल पर बखिया, फंदा और जाली टांकों से रचित क्लासिक चिकनकारी कुर्ता।",
        "dimensions": "Sizes 38, 40, 42, 44, 46 (Chest Inches)", "weight": "210 grams", "productionTime": "10 days", "capacity": "30 units/month", "moq": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 750, "labourHours": 15, "labourRate": 130, "packagingCost": 70, "transportCost": 60, "otherCost": 40, "price": 3450, "stock": 20,
        "tags": ["Chikankari", "Lucknow", "GI Tagged", "Mulmul Kurta", "Awadh Craft", "White on White"],
        "comparables": [
            {"source": "DEMO MARKET DATA — SEWA Lucknow Cooperative", "price": 3600, "region": "Lucknow"},
            {"source": "DEMO MARKET DATA — Janpath Craft Market", "price": 3800, "region": "Delhi"}
        ]
    },
    {
        "artisanId": "artisan-25", "name": "Chikankari Hand-Crafted Georgette Anarkali Dupatta",
        "titleEn": "Chikankari Hand-Embroidered Pure Viscose Georgette Dupatta", "titleHi": "चिकनकारी हस्तनिर्मित शुद्ध जॉर्जेट अनारकली दुपट्टा",
        "craftType": "Chikankari Embroidery", "category": "Heritage Handloom Textile", "craftCategory": "Embroidery",
        "material": "Pure Dyeable Viscose Georgette, Gota Patti Border Highlights", "materials": "Viscose Georgette, Cotton Floss",
        "technique": "All-Over Jaal Work with Murri and Keel Kangan", "origin": "Lucknow, Uttar Pradesh",
        "description": "Luxurious wedding dupatta densely filled with delicate Chikankari floral vines and scalloped hand-stitched borders. Dyeable into any pastel shade.",
        "descriptionHi": "विवाह और उत्सवों के लिए जॉर्जेट पर बारीक जाल चिकनकारी दुपट्टा। अपनी पसंद के रंग में रंगने योग्य।",
        "dimensions": "40 x 98 inches", "weight": "310 grams", "productionTime": "16 days", "capacity": "15 units/month", "moq": 5,
        "imageUrl": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "materialCost": 1350, "labourHours": 26, "labourRate": 135, "packagingCost": 110, "transportCost": 90, "otherCost": 50, "price": 5900, "stock": 12,
        "tags": ["Chikankari Dupatta", "Lucknow GI", "Georgette", "Wedding Wear", "Jaal Work"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Hazratganj Boutiques", "price": 6400, "region": "Lucknow"},
            {"source": "DEMO MARKET DATA — Meena Bazaar Delhi", "price": 6800, "region": "Delhi"}
        ]
    },

    # 26. UTTAR PRADESH - Vijay Kumar Rastogi (artisan-26) - Brass Engraving
    {
        "artisanId": "artisan-26", "name": "Moradabadi Handcrafted Brass Peacock Diya Set",
        "titleEn": "Moradabadi Handcrafted Brass Peacock Diya Set (Pair)", "titleHi": "मुरादाबादी हस्तनिर्मित पीतल मयूर दीया सेट (जोड़ी)",
        "craftType": "Brass Engraving", "category": "Metal Handicrafts", "craftCategory": "Metal Art",
        "material": "Virgin Cast Brass with Golden Lacquer", "materials": "Pure Brass Alloy",
        "technique": "Sand Casting & Hand Chiseled Nakashi", "origin": "Moradabad, Uttar Pradesh",
        "description": "Pair of traditional Moradabadi brass diyas with sculpted peacock crests and deep oil bowls. Ideal for festive gifting, corporate orders, and luxury Indian home decor.",
        "descriptionHi": "मुरादाबाद के प्रसिद्ध पीतल कारीगरों द्वारा तैयार किया गया मयूर दीया सेट। उत्कृष्ट पॉलिश और टिकाऊ बनावट।",
        "dimensions": "8 inches height each", "weight": "1.2 kg (set of 2)", "productionTime": "1 day", "capacity": "150 sets/month", "moq": 50,
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "materialCost": 550, "labourHours": 5.0, "labourRate": 180, "packagingCost": 90, "transportCost": 80, "otherCost": 40, "price": 2350, "stock": 80,
        "tags": ["Brass Diya", "Moradabad Brass", "Diwali Gifting", "Peacock Lamp", "Pooja Decor"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Moradabad Wholesale Mandi", "price": 2200, "region": "Moradabad"},
            {"source": "DEMO MARKET DATA — Amazon Business Benchmark", "price": 2600, "region": "National"},
            {"source": "DEMO MARKET DATA — Festive Corporate Procurement", "price": 2400, "region": "Mumbai"}
        ]
    },
    {
        "artisanId": "artisan-26", "name": "Hand-Etched Brass Serving Tray with Antique Finish",
        "titleEn": "Ornate Hand-Etched Brass Serving Tray with Antique Patina (16-inch)", "titleHi": "नक्काशीदार पीतल सर्विंग ट्रे (एंटीक फिनिश, 16 इंच)",
        "craftType": "Brass Engraving", "category": "Tableware & Dining", "craftCategory": "Metal Art",
        "material": "Heavy-Gauge Solid Brass, Tarnish-Resistant Sealant", "materials": "Solid Brass Sheet",
        "technique": "Fine Chisel Nakashi Etching & Scalloped Rim", "origin": "Moradabad, Uttar Pradesh",
        "description": "Heavy ornamental brass tray featuring arabesque Persian foliate borders and dual sculpted handles. Finished in warm antique bronze patina.",
        "descriptionHi": "शाही अंदाज की पीतल सर्विंग ट्रे। हाथ से उकेरी गई बारीक नक्काशी और टिकाऊ एंटीक कोटिंग।",
        "dimensions": "16 x 11 x 1.5 inches", "weight": "1.4 kg", "productionTime": "2 days", "capacity": "80 units/month", "moq": 15,
        "imageUrl": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        "materialCost": 780, "labourHours": 7.0, "labourRate": 180, "packagingCost": 110, "transportCost": 90, "otherCost": 50, "price": 3100, "stock": 35,
        "tags": ["Brass Tray", "Moradabad", "Antique Finish", "Luxury Hospitality", "Servingware"],
        "comparables": [
            {"source": "DEMO MARKET DATA — Moradabad Export Association", "price": 3200, "region": "Moradabad"},
            {"source": "DEMO MARKET DATA — Dilli Haat Metal Stalls", "price": 3500, "region": "Delhi"}
        ]
    }
]

print(f"Loaded Part 1: {len(PART1_PRODUCTS)} products for Artisans 1 to 26")
