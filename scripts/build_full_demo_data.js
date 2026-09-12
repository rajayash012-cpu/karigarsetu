import fs from 'fs';
import path from 'path';
import { generateFemaleAvatar, generateMaleAvatar } from './create_unique_avatars.js';

const clientDemoDir = path.join(process.cwd(), 'src', 'demoData');
const serverDemoDir = path.join(process.cwd(), 'server', 'demoData');
const avatarsDir = path.join(process.cwd(), 'public', 'images', 'avatars');

if (!fs.existsSync(clientDemoDir)) fs.mkdirSync(clientDemoDir, { recursive: true });
if (!fs.existsSync(serverDemoDir)) fs.mkdirSync(serverDemoDir, { recursive: true });
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });

// 52 Master Artisans (26 Female, 26 Male) spanning 26 Indian States/UTs and 30+ distinct crafts
const ARTISANS = [
  // 1. Savita Devi (F) - Madhubani Painting - Bihar
  {
    id: "artisan-001",
    legacyId: "artisan-1",
    code: "ART-001",
    pehchanId: "BR-MAD-PNT-4402",
    giRegistrationNo: "GI-AU-2018-8421",
    name: "Savita Devi",
    gender: "Female",
    photo: "/images/savita_devi.jpg",
    craft: "Madhubani Painting",
    category: "Painting & Wall Art",
    location: "Ranti Village, Madhubani",
    state: "Bihar",
    district: "Madhubani",
    cluster: "Mithila Painting Megacluster",
    specialization: "Kohbar & Aripan motifs with natural organic pigments",
    experience: "18 Years of Traditional Painting",
    experienceYears: 18,
    capacity: "40 pieces/month",
    capacityPerMonth: 40,
    fulfillmentDays: 7,
    trustScore: 94,
    rating: 4.9,
    reviewCount: 96,
    giCertified: true,
    shgMember: true,
    shgName: "Mithila Mahila Vikas Samiti",
    phone: "+91 94312 XXXXX",
    email: "savita.devi@karigarsetu.in",
    bio: "State-awarded Mithila folk artist with 18 years dedicated to Kohbar and Aripan motifs on handmade paper and tussar silk using natural pigments made from leaves and flowers.",
    verificationStatus: "Sample Verified Profile"
  },

  // 2. Meena Kumari (F) - Dokra Metal Craft - Jharkhand
  {
    id: "artisan-002",
    legacyId: "artisan-2",
    code: "ART-002",
    pehchanId: "JH-RAN-MET-6105",
    giRegistrationNo: "GI-AU-2019-3312",
    name: "Meena Kumari",
    gender: "Female",
    photo: "/images/meena_kumari.jpg",
    craft: "Dokra Metal Craft",
    category: "Metal Craft",
    location: "Torpa, Khunti",
    state: "Jharkhand",
    district: "Khunti",
    cluster: "Chotanagpur Tribal Metal Cluster",
    specialization: "Non-ferrous lost-wax bell metal casting of figurines and diya oil lamps",
    experience: "15 Years of Lost-Wax Metal Casting",
    experienceYears: 15,
    capacity: "50 pieces/month",
    capacityPerMonth: 50,
    fulfillmentDays: 10,
    trustScore: 92,
    rating: 4.8,
    reviewCount: 78,
    giCertified: true,
    shgMember: true,
    shgName: "Birsa Munda Karigar Samiti",
    phone: "+91 98351 XXXXX",
    email: "meena.kumari@karigarsetu.in",
    bio: "Hereditary Dokra metalsmith handcrafting beeswax thread models over clay cores and casting in recycled brass bell metal using indigenous charcoal pit kilns.",
    verificationStatus: "Sample Verified Profile"
  },

  // 3. Ramesh Kumar (M) - Brass Handicraft - Uttar Pradesh
  {
    id: "artisan-003",
    legacyId: "artisan-3",
    code: "ART-003",
    pehchanId: "UP-BRS-MRD-7811",
    giRegistrationNo: "GI-AU-2016-1044",
    name: "Ramesh Kumar",
    gender: "Male",
    photo: "/images/ramesh_kumar.svg",
    craft: "Brass Handicraft",
    category: "Metal Craft",
    location: "Peetal Nagri, Moradabad",
    state: "Uttar Pradesh",
    district: "Moradabad",
    cluster: "Moradabad Peetal Nagri Megacluster",
    specialization: "Hand-turned brass diya lamps, ceremonial urlis, and engraved home accents",
    experience: "22 Years of Master Brass Art",
    experienceYears: 22,
    capacity: "75 pieces/month",
    capacityPerMonth: 75,
    fulfillmentDays: 8,
    trustScore: 95,
    rating: 4.9,
    reviewCount: 112,
    giCertified: true,
    shgMember: true,
    shgName: "Peetal Udyog Samiti",
    phone: "+91 94121 XXXXX",
    email: "ramesh.kumar@karigarsetu.in",
    bio: "Third-generation master metalsmith specializing in traditional hand-turned and engraved pure brass festive oil lamps, decorative urlis, and heirloom artefacts in Moradabad.",
    verificationStatus: "Sample Verified Profile"
  },

  // 4. Mohan Das (M) - Terracotta Craft - West Bengal
  {
    id: "artisan-004",
    legacyId: "artisan-4",
    code: "ART-004",
    pehchanId: "WB-TER-PAN-1140",
    giRegistrationNo: "GI-AU-2018-2234",
    name: "Mohan Das",
    gender: "Male",
    photo: "/images/mohan_das.svg",
    craft: "Terracotta Craft",
    category: "Pottery & Ceramics",
    location: "Panchmura, Bankura",
    state: "West Bengal",
    district: "Bankura",
    cluster: "Bankura Terracotta Cluster",
    specialization: "Bankura Horses, decorative pottery, and architectural terracotta plaques",
    experience: "15 Years of Traditional Terracotta",
    experienceYears: 15,
    capacity: "80 pieces/month",
    capacityPerMonth: 80,
    fulfillmentDays: 8,
    trustScore: 91,
    rating: 4.8,
    reviewCount: 64,
    giCertified: true,
    shgMember: true,
    shgName: "Panchmura Terracotta Samiti",
    phone: "+91 97321 XXXXX",
    email: "mohan.das@karigarsetu.in",
    bio: "Master Kumbhakar potter hand-shaping distinctive Bankura horses with erect ears and hollow symmetrical terracotta vessels fired in traditional open wood kilns in Panchmura village.",
    verificationStatus: "Sample Verified Profile"
  },

  // 5. Anjali Sahu (F) - Sambalpuri Handloom - Odisha
  {
    id: "artisan-005",
    legacyId: "artisan-5",
    code: "ART-005",
    pehchanId: "OD-BAR-IKT-5511",
    giRegistrationNo: "GI-AU-2017-4481",
    name: "Anjali Sahu",
    gender: "Female",
    photo: "/images/avatars/artisan-005.svg",
    craft: "Sambalpuri Textile",
    category: "Handloom & Textiles",
    location: "Bargarh",
    state: "Odisha",
    district: "Bargarh",
    cluster: "Western Odisha Handloom Cluster",
    specialization: "Tie-and-dye bandha weaving on pit looms using mercerized cotton",
    experience: "16 Years of Bandha Weaving",
    experienceYears: 16,
    capacity: "35 pieces/month",
    capacityPerMonth: 35,
    fulfillmentDays: 14,
    trustScore: 93,
    rating: 4.9,
    reviewCount: 88,
    giCertified: true,
    shgMember: true,
    shgName: "Maa Samaleswari Weavers Co-op",
    phone: "+91 94371 XXXXX",
    email: "anjali.sahu@karigarsetu.in",
    bio: "Hereditary Bhulia Meher master weaver crafting intricate ikat motifs representing traditional shankha, chakra, and flora without any printed chemical dyes.",
    verificationStatus: "Sample Verified Profile"
  },

  // 6. Arjun Sahu (M) - Pattachitra Painting - Odisha
  {
    id: "artisan-006",
    legacyId: "artisan-6",
    code: "ART-006",
    pehchanId: "OD-PURI-PAT-3310",
    giRegistrationNo: "GI-AU-2015-7712",
    name: "Arjun Sahu",
    gender: "Male",
    photo: "/images/avatars/artisan-006.svg",
    craft: "Pattachitra",
    category: "Painting & Wall Art",
    location: "Raghurajpur, Puri",
    state: "Odisha",
    district: "Puri",
    cluster: "Raghurajpur Heritage Craft Village",
    specialization: "Traditional cloth scroll painting depicting Jagannath & mythological themes",
    experience: "24 Years of Pattachitra",
    experienceYears: 24,
    capacity: "25 pieces/month",
    capacityPerMonth: 25,
    fulfillmentDays: 15,
    trustScore: 96,
    rating: 5.0,
    reviewCount: 120,
    giCertified: true,
    shgMember: true,
    shgName: "Chitrakar Mahasangha",
    phone: "+91 94378 XXXXX",
    email: "arjun.sahu@karigarsetu.in",
    bio: "Master chitrakar preparing cloth canvas with chalk and tamarind gum and painting with stone and conch shell pigments.",
    verificationStatus: "Sample Verified Profile"
  },

  // 7. Pooja Mahato (F) - Sikki Grass Craft - Bihar
  {
    id: "artisan-007",
    legacyId: "artisan-7",
    code: "ART-007",
    pehchanId: "BR-DAR-SIK-1029",
    giRegistrationNo: "GI-AU-2020-5512",
    name: "Pooja Mahato",
    gender: "Female",
    photo: "/images/avatars/artisan-007.svg",
    craft: "Bamboo & Cane Craft",
    category: "Natural Fibre Craft",
    location: "Raiyam, Darbhanga",
    state: "Bihar",
    district: "Darbhanga",
    cluster: "North Bihar Sikki Craft Cluster",
    specialization: "Golden grass decorative boxes, coasters, and storage bins",
    experience: "8 Years of Fiber Craft",
    experienceYears: 8,
    capacity: "60 pieces/month",
    capacityPerMonth: 60,
    fulfillmentDays: 7,
    trustScore: 89,
    rating: 4.7,
    reviewCount: 42,
    giCertified: true,
    shgMember: true,
    shgName: "Kalyani Gramin SHG",
    phone: "+91 94301 XXXXX",
    email: "pooja.mahato@karigarsetu.in",
    bio: "Young artisan co-operative leader transforming wetland wild grasses into moisture-resistant sustainable kitchenware and lifestyle baskets.",
    verificationStatus: "Sample Verified Profile"
  },

  // 8. Rajesh Mahato (M) - Bastar Iron Craft - Chhattisgarh
  {
    id: "artisan-008",
    legacyId: "artisan-8",
    code: "ART-008",
    pehchanId: "CG-BAS-IRO-4419",
    giRegistrationNo: "GI-AU-2018-9901",
    name: "Rajesh Mahato",
    gender: "Male",
    photo: "/images/avatars/artisan-008.svg",
    craft: "Wrought Iron Craft",
    category: "Metal Craft",
    location: "Kondagaon, Bastar",
    state: "Chhattisgarh",
    district: "Bastar",
    cluster: "Bastar Tribal Blacksmith Cluster",
    specialization: "Blacksmith forge metallurgy creating deer, candle stands, and tribal totems",
    experience: "19 Years of Forge Work",
    experienceYears: 19,
    capacity: "65 pieces/month",
    capacityPerMonth: 65,
    fulfillmentDays: 9,
    trustScore: 92,
    rating: 4.8,
    reviewCount: 67,
    giCertified: true,
    shgMember: true,
    shgName: "Ghadwa Iron Artisans Guild",
    phone: "+91 97521 XXXXX",
    email: "rajesh.mahato@karigarsetu.in",
    bio: "Uses traditional coal forges and hand tongs to shape scrap scrap iron into minimalist tribal animal sculptures with rust-resistant finishes.",
    verificationStatus: "Sample Verified Profile"
  },

  // 9. Rekha Kumari (F) - Kantha Embroidery - West Bengal
  {
    id: "artisan-009",
    legacyId: "artisan-9",
    code: "ART-009",
    pehchanId: "WB-BIR-KAN-8802",
    giRegistrationNo: "GI-AU-2016-3390",
    name: "Rekha Kumari",
    gender: "Female",
    photo: "/images/avatars/artisan-009.svg",
    craft: "Embroidery",
    category: "Handloom & Textiles",
    location: "Bolpur, Shantiniketan",
    state: "West Bengal",
    district: "Birbhum",
    cluster: "Shantiniketan Rural Craft Center",
    specialization: "Running stitch kantha embroidered silk dupattas and bedspreads",
    experience: "14 Years of Kantha",
    experienceYears: 14,
    capacity: "45 pieces/month",
    capacityPerMonth: 45,
    fulfillmentDays: 12,
    trustScore: 93,
    rating: 4.9,
    reviewCount: 82,
    giCertified: true,
    shgMember: true,
    shgName: "Bolpur Kantha Shilpa Samiti",
    phone: "+91 94340 XXXXX",
    email: "rekha.kumari@karigarsetu.in",
    bio: "Organizes a collective of 30 village women hand-stitching traditional folk motifs depicting rural Bengali pastoral life.",
    verificationStatus: "Sample Verified Profile"
  },

  // 10. Suresh Prasad (M) - Blue Pottery - Rajasthan
  {
    id: "artisan-010",
    legacyId: "artisan-10",
    code: "ART-010",
    pehchanId: "RJ-JAI-BLU-2291",
    giRegistrationNo: "GI-AU-2015-1102",
    name: "Suresh Prasad",
    gender: "Male",
    photo: "/images/avatars/artisan-010.svg",
    craft: "Blue Pottery",
    category: "Pottery & Ceramics",
    location: "Kot Jewar, Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    cluster: "Jaipur Traditional Blue Pottery Cluster",
    specialization: "Non-clay quartz powder glazed decorative plates, tiles, and door knobs",
    experience: "21 Years of Blue Pottery",
    experienceYears: 21,
    capacity: "90 pieces/month",
    capacityPerMonth: 90,
    fulfillmentDays: 8,
    trustScore: 95,
    rating: 4.9,
    reviewCount: 110,
    giCertified: true,
    shgMember: true,
    shgName: "Jaipur Ceramic Karigar Union",
    phone: "+91 94140 XXXXX",
    email: "suresh.prasad@karigarsetu.in",
    bio: "Formulates indigenous Egyptian paste made from quartz stone, glass, fullers earth, and gum with cobalt oxide blue glazes.",
    verificationStatus: "Sample Verified Profile"
  },

  // 11. Sunita Oraon (F) - Sohrai Painting - Jharkhand
  {
    id: "artisan-011",
    legacyId: "artisan-11",
    code: "ART-011",
    pehchanId: "JH-HAZ-MUR-7721",
    giRegistrationNo: "GI-AU-2020-8844",
    name: "Sunita Oraon",
    gender: "Female",
    photo: "/images/avatars/artisan-011.svg",
    craft: "Tribal Wall Art",
    category: "Painting & Wall Art",
    location: "Bhelwara, Hazaribagh",
    state: "Jharkhand",
    district: "Hazaribagh",
    cluster: "Hazaribagh Indigenous Art Cluster",
    specialization: "Mural paintings on mud and handmade paper celebrating crop harvest and animal deities",
    experience: "13 Years of Tribal Art",
    experienceYears: 13,
    capacity: "30 pieces/month",
    capacityPerMonth: 30,
    fulfillmentDays: 10,
    trustScore: 90,
    rating: 4.8,
    reviewCount: 51,
    giCertified: true,
    shgMember: true,
    shgName: "Hazaribagh Tribal Women Guild",
    phone: "+91 98356 XXXXX",
    email: "sunita.oraon@karigarsetu.in",
    bio: "Paints with natural earth pigments like yellow ocher, red iron stone, and charcoal using twigs and chewed rice straw.",
    verificationStatus: "Sample Verified Profile"
  },

  // 12. Deepak Oraon (M) - Channapatna Toys - Karnataka
  {
    id: "artisan-012",
    legacyId: "artisan-12",
    code: "ART-012",
    pehchanId: "KA-RAM-TOY-4411",
    giRegistrationNo: "GI-AU-2016-5520",
    name: "Deepak Oraon",
    gender: "Male",
    photo: "/images/avatars/artisan-012.svg",
    craft: "Handmade Toys",
    category: "Wood Carving",
    location: "Channapatna, Ramanagara",
    state: "Karnataka",
    district: "Ramanagara",
    cluster: "Channapatna Lacquer Toy Megacluster",
    specialization: "Turned Wrightia tinctoria (Aale mara) wood toys with non-toxic vegetable lacquer polish",
    experience: "17 Years of Lacquer Wood Craft",
    experienceYears: 17,
    capacity: "120 pieces/month",
    capacityPerMonth: 120,
    fulfillmentDays: 6,
    trustScore: 94,
    rating: 4.9,
    reviewCount: 95,
    giCertified: true,
    shgMember: true,
    shgName: "Gombegala Ooru Artisans Society",
    phone: "+91 98451 XXXXX",
    email: "deepak.oraon@karigarsetu.in",
    bio: "Creates child-safe smooth wooden stacking rings, pull-along animals, and educational Montessori toys using natural turmeric and indigo colors.",
    verificationStatus: "Sample Verified Profile"
  },

  // 13. Kavita Das (F) - Applique Craft - Bihar
  {
    id: "artisan-013",
    legacyId: "artisan-13",
    code: "ART-013",
    pehchanId: "BR-PAT-APP-3319",
    giRegistrationNo: "GI-AU-2017-9011",
    name: "Kavita Das",
    gender: "Female",
    photo: "/images/avatars/artisan-013.svg",
    craft: "Khatwa Applique Craft",
    category: "Handloom & Textiles",
    location: "Danapur, Patna",
    state: "Bihar",
    district: "Patna",
    cluster: "Magadh Textile Craft Cluster",
    specialization: "Cut-work fabric applique panels and festive wall hangings",
    experience: "11 Years of Applique Work",
    experienceYears: 11,
    capacity: "50 pieces/month",
    capacityPerMonth: 50,
    fulfillmentDays: 12,
    trustScore: 88,
    rating: 4.7,
    reviewCount: 35,
    giCertified: true,
    shgMember: true,
    shgName: "Ujala Mahila Mandal",
    phone: "+91 94314 XXXXX",
    email: "kavita.das@karigarsetu.in",
    bio: "Pioneering contemporary Khatwa cut-work motifs blended with organic cotton textiles for boutique interiors.",
    verificationStatus: "Sample Verified Profile"
  },

  // 14. Manoj Das (M) - Walnut Wood Carving - Jammu & Kashmir
  {
    id: "artisan-014",
    legacyId: "artisan-14",
    code: "ART-014",
    pehchanId: "JK-SRI-WOO-9912",
    giRegistrationNo: "GI-AU-2016-8819",
    name: "Manoj Das",
    gender: "Male",
    photo: "/images/avatars/artisan-014.svg",
    craft: "Wood Carving",
    category: "Wood Carving",
    location: "Zadibal, Srinagar",
    state: "Jammu & Kashmir",
    district: "Srinagar",
    cluster: "Old Srinagar Heritage Wood Carvers",
    specialization: "Relief wood carving on seasoned Kashmiri walnut root wood with chinar leaf motifs",
    experience: "26 Years of Master Wood Carving",
    experienceYears: 26,
    capacity: "30 pieces/month",
    capacityPerMonth: 30,
    fulfillmentDays: 15,
    trustScore: 97,
    rating: 5.0,
    reviewCount: 140,
    giCertified: true,
    shgMember: true,
    shgName: "Kashmir Walnut Wood Workers Society",
    phone: "+91 94190 XXXXX",
    email: "manoj.das@karigarsetu.in",
    bio: "Master woodworker carving seasoned root wood without any artificial chemical dyes or plastic lacquer.",
    verificationStatus: "Sample Verified Profile"
  },

  // 15. Laxmi Pradhan (F) - Silver Filigree - Odisha
  {
    id: "artisan-015",
    legacyId: "artisan-15",
    code: "ART-015",
    pehchanId: "OD-CUT-TAR-9012",
    giRegistrationNo: "GI-AU-2023-1190",
    name: "Laxmi Pradhan",
    gender: "Female",
    photo: "/images/avatars/artisan-015.svg",
    craft: "Tribal Jewellery",
    category: "Metal Craft",
    location: "Alisha Bazar, Cuttack",
    state: "Odisha",
    district: "Cuttack",
    cluster: "Cuttack Tarkasi Artisans Guild",
    specialization: "Delicate gossamer silver wire jewellery, vermillion boxes, and peacock brooches",
    experience: "16 Years of Tarkasi Filigree",
    experienceYears: 16,
    capacity: "40 pieces/month",
    capacityPerMonth: 40,
    fulfillmentDays: 10,
    trustScore: 94,
    rating: 4.9,
    reviewCount: 75,
    giCertified: true,
    shgMember: true,
    shgName: "Tarkasi Mahila Samiti",
    phone: "+91 94372 XXXXX",
    email: "laxmi.pradhan@karigarsetu.in",
    bio: "Draws 99% fine silver into hair-thin wires to shape lightweight gossamer floral jewellery and decorative peacock centerpieces.",
    verificationStatus: "Sample Verified Profile"
  },

  // 16. Bikash Pradhan (M) - Kashmiri Paper Mache - Jammu & Kashmir
  {
    id: "artisan-016",
    legacyId: "artisan-16",
    code: "ART-016",
    pehchanId: "JK-SRI-PAP-5501",
    giRegistrationNo: "GI-AU-2017-6621",
    name: "Bikash Pradhan",
    gender: "Male",
    photo: "/images/avatars/artisan-016.svg",
    craft: "Kashmiri Paper Mache",
    category: "Painting & Wall Art",
    location: "Alamgari Bazar, Srinagar",
    state: "Jammu & Kashmir",
    district: "Srinagar",
    cluster: "Downtown Srinagar Sakhtsazi Artisans",
    specialization: "Sakhtsazi molded pulp boxes with 24k gold leaf Naqashi brushwork",
    experience: "23 Years of Naqashi Art",
    experienceYears: 23,
    capacity: "60 pieces/month",
    capacityPerMonth: 60,
    fulfillmentDays: 9,
    trustScore: 95,
    rating: 4.9,
    reviewCount: 92,
    giCertified: true,
    shgMember: true,
    shgName: "Kashmir Naqashi Co-operative",
    phone: "+91 94191 XXXXX",
    email: "bikash.pradhan@karigarsetu.in",
    bio: "Pioneering sustainable home accents by soaking recycled paper pulp and coating with amber varnish and natural mineral paints.",
    verificationStatus: "Sample Verified Profile"
  },

  // 17. Rina Kumari (F) - Block Printing - Rajasthan
  {
    id: "artisan-017",
    legacyId: "artisan-17",
    code: "ART-017",
    pehchanId: "RJ-SNG-BLO-8812",
    giRegistrationNo: "GI-AU-2016-4409",
    name: "Rina Kumari",
    gender: "Female",
    photo: "/images/avatars/artisan-017.svg",
    craft: "Block Printing",
    category: "Handloom & Textiles",
    location: "Sanganer, Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    cluster: "Sanganer Hand Block Printing Cluster",
    specialization: "Natural indigo and madder root woodblock printing on mulmul cotton fabric",
    experience: "15 Years of Block Printing",
    experienceYears: 15,
    capacity: "100 pieces/month",
    capacityPerMonth: 100,
    fulfillmentDays: 6,
    trustScore: 93,
    rating: 4.8,
    reviewCount: 84,
    giCertified: true,
    shgMember: true,
    shgName: "Sanganeri Rangrez Mandal",
    phone: "+91 94142 XXXXX",
    email: "rina.kumari@karigarsetu.in",
    bio: "Hand-presses teak wood blocks with natural plant dyes onto organic cotton stoles, sarees, and yardage with precise pattern alignment.",
    verificationStatus: "Sample Verified Profile"
  },

  // 18. Amit Kumar (M) - Bamboo Craft - Assam
  {
    id: "artisan-018",
    legacyId: "artisan-18",
    code: "ART-018",
    pehchanId: "AS-BAR-BAM-3301",
    giRegistrationNo: "GI-AU-2019-7711",
    name: "Amit Kumar",
    gender: "Male",
    photo: "/images/avatars/artisan-018.svg",
    craft: "Bamboo Craft",
    category: "Natural Fibre Craft",
    location: "Sarthebari, Barpeta",
    state: "Assam",
    district: "Barpeta",
    cluster: "Lower Assam Bamboo & Cane Cluster",
    specialization: "Muga-treated seasoned bamboo lampshades, fruit trays, and modular screens",
    experience: "14 Years of Bamboo Work",
    experienceYears: 14,
    capacity: "85 pieces/month",
    capacityPerMonth: 85,
    fulfillmentDays: 7,
    trustScore: 91,
    rating: 4.8,
    reviewCount: 56,
    giCertified: true,
    shgMember: true,
    shgName: "Brahmaputra Bamboo Craft Co-op",
    phone: "+91 94350 XXXXX",
    email: "amit.kumar@karigarsetu.in",
    bio: "Splits indigenous Bambusa tulda into paper-thin flexible strips to weave contemporary eco-lighting and table accents.",
    verificationStatus: "Sample Verified Profile"
  },

  // 19. Shanti Devi (F) - Banarasi Brocade - Uttar Pradesh
  {
    id: "artisan-019",
    legacyId: "artisan-19",
    code: "ART-019",
    pehchanId: "UP-VAR-BAN-1002",
    giRegistrationNo: "GI-AU-2015-0012",
    name: "Shanti Devi",
    gender: "Female",
    photo: "/images/avatars/artisan-019.svg",
    craft: "Handloom Saree",
    category: "Handloom & Textiles",
    location: "Kotwa, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    cluster: "Varanasi Handloom Megacluster",
    specialization: "Kadwa zari pit-loom weaving on pure mulberry Katan silk",
    experience: "25 Years of Silk Weaving",
    experienceYears: 25,
    capacity: "20 pieces/month",
    capacityPerMonth: 20,
    fulfillmentDays: 18,
    trustScore: 97,
    rating: 5.0,
    reviewCount: 135,
    giCertified: true,
    shgMember: true,
    shgName: "Kashi Bunkar Sahkari Samiti",
    phone: "+91 94500 XXXXX",
    email: "shanti.devi@karigarsetu.in",
    bio: "Operates traditional wooden pit looms with her family, taking up to 3 weeks to weave each heirloom bridal saree with silver-gilt zari thread.",
    verificationStatus: "Sample Verified Profile"
  },

  // 20. Sanjay Verma (M) - Bell Metal Craft - Madhya Pradesh
  {
    id: "artisan-020",
    legacyId: "artisan-20",
    code: "ART-020",
    pehchanId: "MP-TIK-BEL-6612",
    giRegistrationNo: "GI-AU-2018-4410",
    name: "Sanjay Verma",
    gender: "Male",
    photo: "/images/avatars/artisan-020.svg",
    craft: "Bell Metal",
    category: "Metal Craft",
    location: "Tikamgarh",
    state: "Madhya Pradesh",
    district: "Tikamgarh",
    cluster: "Bundelkhand Bell Metal Center",
    specialization: "Resonant singing bell bowls, traditional bells, and ceremonial diyas",
    experience: "20 Years of Foundry Work",
    experienceYears: 20,
    capacity: "70 pieces/month",
    capacityPerMonth: 70,
    fulfillmentDays: 8,
    trustScore: 93,
    rating: 4.8,
    reviewCount: 72,
    giCertified: true,
    shgMember: true,
    shgName: "Bundelkhand Dhatu Shilp Sangh",
    phone: "+91 94250 XXXXX",
    email: "sanjay.verma@karigarsetu.in",
    bio: "Smelts 78% copper and 22% tin bronze alloy to create resonant, acoustically pure singing meditation bowls and temple bells.",
    verificationStatus: "Sample Verified Profile"
  },

  // 21. Poonam Sahu (F) - Chanderi Silk Weaving - Madhya Pradesh
  {
    id: "artisan-021",
    legacyId: "artisan-21",
    code: "ART-021",
    pehchanId: "MP-CHA-SIL-9901",
    giRegistrationNo: "GI-AU-2016-1188",
    name: "Poonam Sahu",
    gender: "Female",
    photo: "/images/avatars/artisan-021.svg",
    craft: "Handloom Saree",
    category: "Handloom & Textiles",
    location: "Pranpur, Chanderi",
    state: "Madhya Pradesh",
    district: "Ashoknagar",
    cluster: "Chanderi Handloom Heritage Park",
    specialization: "Sheer gossamer silk-cotton blend with gold zari booti motifs",
    experience: "16 Years of Chanderi Weaving",
    experienceYears: 16,
    capacity: "30 pieces/month",
    capacityPerMonth: 30,
    fulfillmentDays: 14,
    trustScore: 94,
    rating: 4.9,
    reviewCount: 89,
    giCertified: true,
    shgMember: true,
    shgName: "Pranpur Bunkar Mandal",
    phone: "+91 94251 XXXXX",
    email: "poonam.sahu@karigarsetu.in",
    bio: "Weaves lightweight, translucent Chanderi sarees with shimmering gold borders on throw-shuttle pit looms.",
    verificationStatus: "Sample Verified Profile"
  },

  // 22. Dhaniram Kashyap (M) - Dhokra Tribal Jewellery - Chhattisgarh
  {
    id: "artisan-022",
    legacyId: "artisan-22",
    code: "ART-022",
    pehchanId: "CG-JAG-DHO-7711",
    giRegistrationNo: "GI-AU-2018-3392",
    name: "Dhaniram Kashyap",
    gender: "Male",
    photo: "/images/avatars/artisan-022.svg",
    craft: "Dhokra Jewellery",
    category: "Tribal Jewellery",
    location: "Jagdalpur, Bastar",
    state: "Chhattisgarh",
    district: "Bastar",
    cluster: "Bastar Tribal Artisan Federation",
    specialization: "Beeswax-wire tribal neckpieces, coin chokers, and cuff bangles",
    experience: "18 Years of Lost-Wax Casting",
    experienceYears: 18,
    capacity: "55 pieces/month",
    capacityPerMonth: 55,
    fulfillmentDays: 9,
    trustScore: 92,
    rating: 4.8,
    reviewCount: 65,
    giCertified: true,
    shgMember: true,
    shgName: "Bastar Dhokra Society",
    phone: "+91 97524 XXXXX",
    email: "dhaniram.kashyap@karigarsetu.in",
    bio: "Crafts contemporary ethical brass jewellery inspired by ancient tribal body ornamentation of Bastar forests.",
    verificationStatus: "Sample Verified Profile"
  },

  // 23. Champa Ben (F) - Kutch Rogan & Embroidery - Gujarat
  {
    id: "artisan-023",
    legacyId: "artisan-23",
    code: "ART-023",
    pehchanId: "GJ-KUT-ROG-1122",
    giRegistrationNo: "GI-AU-2017-9912",
    name: "Champa Ben",
    gender: "Female",
    photo: "/images/avatars/artisan-023.svg",
    craft: "Embroidery",
    category: "Handloom & Textiles",
    location: "Nirona, Bhuj",
    state: "Gujarat",
    district: "Kutch",
    cluster: "Kutch Desert Craft Guild",
    specialization: "Boiled castor oil castor gel paint with iron stylus and Ahir embroidery",
    experience: "22 Years of Rogan Art",
    experienceYears: 22,
    capacity: "25 pieces/month",
    capacityPerMonth: 25,
    fulfillmentDays: 16,
    trustScore: 96,
    rating: 5.0,
    reviewCount: 115,
    giCertified: true,
    shgMember: true,
    shgName: "Nirona Women Craft Group",
    phone: "+91 98250 XXXXX",
    email: "champa.ben@karigarsetu.in",
    bio: "Preserves the 300-year-old Persian Rogan painting method of creating vibrant floral motifs on handloom khadi with castor paste.",
    verificationStatus: "Sample Verified Profile"
  },

  // 24. Prem Chand (M) - Kullu Handloom Shawls - Himachal Pradesh
  {
    id: "artisan-024",
    legacyId: "artisan-24",
    code: "ART-024",
    pehchanId: "HP-KUL-SHA-4402",
    giRegistrationNo: "GI-AU-2016-0044",
    name: "Prem Chand",
    gender: "Male",
    photo: "/images/avatars/artisan-024.svg",
    craft: "Handwoven Stoles",
    category: "Handloom & Textiles",
    location: "Naggar, Kullu",
    state: "Himachal Pradesh",
    district: "Kullu",
    cluster: "Kullu Valley Wool Weavers Co-operative",
    specialization: "Merino and Angora wool shawls with geometrical dovetail tapestry borders",
    experience: "20 Years of Wool Weaving",
    experienceYears: 20,
    capacity: "40 pieces/month",
    capacityPerMonth: 40,
    fulfillmentDays: 11,
    trustScore: 94,
    rating: 4.9,
    reviewCount: 98,
    giCertified: true,
    shgMember: true,
    shgName: "Himachal Woolcraft Federation",
    phone: "+91 94180 XXXXX",
    email: "prem.chand@karigarsetu.in",
    bio: "Spins and weaves certified pure Himalayan merino wool with traditional diamond pattern borders using wooden frame fly-shuttle looms.",
    verificationStatus: "Sample Verified Profile"
  },

  // 25. Sunita Negi (F) - Aipan Folk Art - Uttarakhand
  {
    id: "artisan-025",
    legacyId: "artisan-25",
    code: "ART-025",
    pehchanId: "UK-ALM-AIP-8821",
    giRegistrationNo: "GI-AU-2021-3310",
    name: "Sunita Negi",
    gender: "Female",
    photo: "/images/avatars/artisan-025.svg",
    craft: "Painting & Wall Art",
    category: "Painting & Wall Art",
    location: "Almora",
    state: "Uttarakhand",
    district: "Almora",
    cluster: "Kumaon Aipan Shilp Sansthan",
    specialization: "Geru red mud base with soaked rice flour paste (Biswar) linear floor art",
    experience: "12 Years of Aipan",
    experienceYears: 12,
    capacity: "50 pieces/month",
    capacityPerMonth: 50,
    fulfillmentDays: 8,
    trustScore: 91,
    rating: 4.8,
    reviewCount: 48,
    giCertified: true,
    shgMember: true,
    shgName: "Kumaoni Mahila Kala Manch",
    phone: "+91 94111 XXXXX",
    email: "sunita.negi@karigarsetu.in",
    bio: "Transforms ancient ritualistic Kumaon floor motifs onto wooden chowkis, terracotta plates, and decorative interior panels.",
    verificationStatus: "Sample Verified Profile"
  },

  // 26. Vijay Kumar Rastogi (M) - Brass Engraving - Uttar Pradesh
  {
    id: "artisan-026",
    legacyId: "artisan-26",
    code: "ART-026",
    pehchanId: "UP-MRD-ENG-9921",
    giRegistrationNo: "GI-AU-2016-1044",
    name: "Vijay Kumar Rastogi",
    gender: "Male",
    photo: "/images/avatars/artisan-026.svg",
    craft: "Brass Craft",
    category: "Metal Craft",
    location: "Moradabad",
    state: "Uttar Pradesh",
    district: "Moradabad",
    cluster: "Moradabad Brass City Cluster",
    specialization: "Deep champlevé engraving and antique nickel patina on brass planters and vases",
    experience: "25 Years of Metal Engraving",
    experienceYears: 25,
    capacity: "250 pieces/month",
    capacityPerMonth: 250,
    fulfillmentDays: 6,
    trustScore: 96,
    rating: 5.0,
    reviewCount: 150,
    giCertified: true,
    shgMember: true,
    shgName: "Moradabad Brass Exporters Guild",
    phone: "+91 94122 XXXXX",
    email: "vijay.rastogi@karigarsetu.in",
    bio: "Operates an ISO-compliant high-volume brass engraving workshop capable of catering to large corporate Diwali gifting and export orders.",
    verificationStatus: "Sample Verified Profile"
  }
];

// Generate 26 more to complete the 52 artisans (13 female, 13 male)
const additionalArtisans = [
  // Females
  { name: "Padmawati Amma", gender: "Female", state: "Tamil Nadu", location: "Thanjavur", craft: "Tanjore Gold Painting", exp: 28, cap: 20 },
  { name: "Nirmala Devi", gender: "Female", state: "Andhra Pradesh", location: "Kalamkari Town, Machilipatnam", craft: "Kalamkari Painting", exp: 17, cap: 45 },
  { name: "Radha Bai", gender: "Female", state: "Maharashtra", location: "Dahanu, Palghar", craft: "Warli Painting", exp: 14, cap: 60 },
  { name: "Lata Devi", gender: "Female", state: "Punjab", location: "Hoshiarpur", craft: "Phulkari Embroidery", exp: 19, cap: 35 },
  { name: "Sumitra Roy", gender: "Female", state: "Tripura", location: "Agartala", craft: "Cane Craft", exp: 12, cap: 70 },
  { name: "Kamala Das", gender: "Female", state: "Kerala", location: "Aranmula", craft: "Bell Metal", exp: 21, cap: 25 },
  { name: "Urmila Soni", gender: "Female", state: "Rajasthan", location: "Pratapgarh", craft: "Thewa Gold Jewelry", exp: 15, cap: 30 },
  { name: "Bimala Soren", gender: "Female", state: "Jharkhand", location: "Dumka", craft: "Jute Craft", exp: 11, cap: 80 },
  { name: "Shalini Reddy", gender: "Female", state: "Telangana", location: "Pochampally", craft: "Handloom Saree", exp: 18, cap: 40 },
  { name: "Devika Rani", gender: "Female", state: "Goa", location: "Bicholim", craft: "Ceramic Craft", exp: 10, cap: 65 },
  { name: "Hema Malini Sahu", gender: "Female", state: "Chhattisgarh", location: "Raigarh", craft: "Kosa Silk Weaving", exp: 16, cap: 30 },
  { name: "Pushpa Bai", gender: "Female", state: "Madhya Pradesh", location: "Bagh", craft: "Block Printing", exp: 22, cap: 90 },
  { name: "Geeta Ben", gender: "Female", state: "Gujarat", location: "Patan", craft: "Patan Patola", exp: 30, cap: 15 },

  // Males
  { name: "Gopal Krishna", gender: "Male", state: "Kerala", location: "Aranmula", craft: "Metal Craft", exp: 27, cap: 20 },
  { name: "Brij Mohan", gender: "Male", state: "Rajasthan", location: "Moulana, Udaipur", craft: "Leather Craft", exp: 16, cap: 80 },
  { name: "Tsering Dorje", gender: "Male", state: "Ladakh", location: "Leh", craft: "Thangka Painting", exp: 25, cap: 15 },
  { name: "Abdul Ghani", gender: "Male", state: "Jammu & Kashmir", location: "Srinagar", craft: "Pashmina Shawl", exp: 32, cap: 20 },
  { name: "Naveen Babu", gender: "Male", state: "Andhra Pradesh", location: "Kondapalli", craft: "Handmade Toys", exp: 15, cap: 100 },
  { name: "Krishnamurthy", gender: "Male", state: "Tamil Nadu", location: "Swamimalai", craft: "Bronze Casting", exp: 26, cap: 25 },
  { name: "Baldev Singh", gender: "Male", state: "Punjab", location: "Amritsar", craft: "Brass Craft", exp: 18, cap: 60 },
  { name: "Manabendra Nath", gender: "Male", state: "Assam", location: "Majuli", craft: "Handmade Masks", exp: 20, cap: 40 },
  { name: "Chenna Keshav", gender: "Male", state: "Karnataka", location: "Bidar", craft: "Bidriware", exp: 22, cap: 50 },
  { name: "Ratan Lal", gender: "Male", state: "Rajasthan", location: "Pokhran", craft: "Terracotta", exp: 17, cap: 85 },
  { name: "Harishankar", gender: "Male", state: "Uttar Pradesh", location: "Varanasi", craft: "Wooden Lacquer Toys", exp: 19, cap: 90 },
  { name: "Tenzin Norbu", gender: "Male", state: "Himachal Pradesh", location: "Dharamshala", craft: "Wood Carving", exp: 24, cap: 30 },
  { name: "Prakash Rao", gender: "Male", state: "Telangana", location: "Nirmal", craft: "Painting & Wall Art", exp: 21, cap: 45 }
];

additionalArtisans.forEach((item, index) => {
  const num = index + 27;
  const id = `artisan-${String(num).padStart(3, '0')}`;
  const legacyId = `artisan-${num}`;
  const code = `ART-${String(num).padStart(3, '0')}`;
  const pehchanId = `${item.state.slice(0, 2).toUpperCase()}-${item.location.slice(0, 3).toUpperCase()}-${item.craft.slice(0, 3).toUpperCase()}-${1000 + num}`;

  ARTISANS.push({
    id,
    legacyId,
    code,
    pehchanId,
    giRegistrationNo: `GI-AU-20${15 + (num % 8)}-${2000 + num}`,
    name: item.name,
    gender: item.gender,
    photo: `/images/avatars/${id}.svg`,
    craft: item.craft,
    category: item.craft.includes('Painting') ? 'Painting & Wall Art' : item.craft.includes('Metal') || item.craft.includes('Brass') ? 'Metal Craft' : item.craft.includes('Silk') || item.craft.includes('Shawl') || item.craft.includes('Embroidery') ? 'Handloom & Textiles' : 'Home & Living',
    location: item.location,
    state: item.state,
    district: item.location.split(',')[0],
    cluster: `${item.location} Craft Cluster`,
    specialization: `Authentic ${item.craft} heritage art`,
    experience: `${item.exp} Years of Traditional Art`,
    experienceYears: item.exp,
    capacity: `${item.cap} pieces/month`,
    capacityPerMonth: item.cap,
    fulfillmentDays: 8 + (num % 7),
    trustScore: 88 + (num % 10),
    rating: 4.8,
    reviewCount: 30 + (num * 2),
    giCertified: true,
    shgMember: true,
    shgName: `${item.location} Karigar Samiti`,
    phone: `+91 94${100 + num} XXXXX`,
    email: `${item.name.toLowerCase().replace(/\s+/g, '.')}@karigarsetu.in`,
    bio: `Dedicated master craftsperson with ${item.exp} years preserving authentic Indian ${item.craft} traditions.`,
    verificationStatus: "Sample Verified Profile"
  });
});

// Generate and write all avatars
let femaleCount = 0;
let maleCount = 0;
ARTISANS.forEach((artisan, i) => {
  if (artisan.photo.endsWith('.svg')) {
    let svg = '';
    if (artisan.gender === 'Female') {
      svg = generateFemaleAvatar(artisan.id, artisan.name, artisan.craft, femaleCount++);
    } else {
      svg = generateMaleAvatar(artisan.id, artisan.name, artisan.craft, maleCount++);
    }
    fs.writeFileSync(path.join(avatarsDir, `${artisan.id}.svg`), svg);
  } else {
    if (artisan.gender === 'Female') femaleCount++;
    else maleCount++;
  }
});

console.log(`Generated avatars for ${ARTISANS.length} artisans: ${femaleCount} Female, ${maleCount} Male.`);

// Generate products.ts (at least 2 products per artisan = 108 products)
const products = [];
let prodIdCounter = 1;

ARTISANS.forEach((artisan, aIdx) => {
  const p1Id = `product-${String(prodIdCounter).padStart(3, '0')}`;
  prodIdCounter++;
  const p2Id = `product-${String(prodIdCounter).padStart(3, '0')}`;
  prodIdCounter++;

  products.push({
    productId: p1Id,
    id: p1Id,
    artisanId: artisan.id,
    artisanName: artisan.name,
    productName: `${artisan.craft} Signature Masterpiece`,
    name: `${artisan.craft} Signature Masterpiece`,
    craft: artisan.craft,
    category: artisan.category,
    material: "Natural Eco-friendly Traditional Materials",
    description: `Authentic handcrafted ${artisan.craft} made by master artisan ${artisan.name} from ${artisan.location}, ${artisan.state}.`,
    price: 1800 + ((aIdx * 170) % 8000),
    b2bPrice: Math.round((1800 + ((aIdx * 170) % 8000)) * 0.8),
    moq: 10,
    productionCapacity: artisan.capacityPerMonth,
    leadTimeDays: artisan.fulfillmentDays,
    location: artisan.location,
    state: artisan.state,
    image: `https://images.unsplash.com/photo-${1579783900882 + (aIdx * 1000)}?auto=format&fit=crop&w=800&q=80`,
    imageUrl: `https://images.unsplash.com/photo-${1579783900882 + (aIdx * 1000)}?auto=format&fit=crop&w=800&q=80`,
    tags: [artisan.craft.toLowerCase(), artisan.state.toLowerCase(), "handcrafted", "gi tag"],
    verificationStatus: "Sample Verified Product"
  });

  products.push({
    productId: p2Id,
    id: p2Id,
    artisanId: artisan.id,
    artisanName: artisan.name,
    productName: `Handcrafted ${artisan.craft} Festive Edition`,
    name: `Handcrafted ${artisan.craft} Festive Edition`,
    craft: artisan.craft,
    category: artisan.category,
    material: "Traditional Heritage Raw Materials",
    description: `Seasonal festival edition handcrafted by ${artisan.name} using age-old techniques passed through generations.`,
    price: 950 + ((aIdx * 120) % 4000),
    b2bPrice: Math.round((950 + ((aIdx * 120) % 4000)) * 0.8),
    moq: 15,
    productionCapacity: artisan.capacityPerMonth,
    leadTimeDays: artisan.fulfillmentDays,
    location: artisan.location,
    state: artisan.state,
    image: `https://images.unsplash.com/photo-${1582562124811 + (aIdx * 1000)}?auto=format&fit=crop&w=800&q=80`,
    imageUrl: `https://images.unsplash.com/photo-${1582562124811 + (aIdx * 1000)}?auto=format&fit=crop&w=800&q=80`,
    tags: [artisan.craft.toLowerCase(), "festive", "wholesale ready"],
    verificationStatus: "Sample Verified Product"
  });
});

console.log(`Generated ${products.length} products for 52 artisans.`);

// Generate 32 B2B Buyers
const buyers = [
  { id: "buyer-001", businessName: "Heritage Home Collective", authorizedPerson: "Ananya Sharma", category: "Retail Boutique", location: "Connaught Place, New Delhi", buyerType: "Curated Luxury Home Decor", typicalMoq: 25, preferredCrafts: ["Madhubani Painting", "Terracotta Craft", "Blue Pottery"] },
  { id: "buyer-002", businessName: "Urban Craft Retail", authorizedPerson: "Vikram Malhotra", category: "Departmental Retail", location: "Bandra West, Mumbai", buyerType: "Modern Ethnic Lifestyle", typicalMoq: 50, preferredCrafts: ["Brass Handicraft", "Dokra Metal Craft"] },
  { id: "buyer-003", businessName: "Bharat Handloom House", authorizedPerson: "Kavita Nair", category: "Textile Sourcing", location: "Indiranagar, Bengaluru", buyerType: "Ethical Fashion Label", typicalMoq: 40, preferredCrafts: ["Sambalpuri Textile", "Block Printing", "Handloom Saree"] },
  { id: "buyer-004", businessName: "Earth & Loom Exports", authorizedPerson: "Gautam Mehta", category: "Export Consignment", location: "Ahmedabad, Gujarat", buyerType: "European Boutique Wholesaler", typicalMoq: 100, preferredCrafts: ["Kashmiri Paper Mache", "Wood Carving"] },
  { id: "buyer-005", businessName: "CraftBasket Wholesale", authorizedPerson: "Priya Sundaram", category: "E-Commerce Aggregator", location: "T. Nagar, Chennai", buyerType: "Pan-India Gift Distributor", typicalMoq: 75, preferredCrafts: ["Terracotta Craft", "Brass Handicraft"] },
  { id: "buyer-006", businessName: "FolkRoots Lifestyle", authorizedPerson: "Aditya Verma", category: "Hospitality Decor", location: "Civil Lines, Jaipur", buyerType: "Heritage Hotel Supply", typicalMoq: 60, preferredCrafts: ["Blue Pottery", "Wrought Iron Craft"] },
  { id: "buyer-007", businessName: "Studio Bharat Interio", authorizedPerson: "Rohan Mukherjee", category: "Interior Architecture", location: "Park Street, Kolkata", buyerType: "Commercial Space Styling", typicalMoq: 30, preferredCrafts: ["Pattachitra", "Dokra Metal Craft"] },
  { id: "buyer-008", businessName: "Artisan Avenue Corp", authorizedPerson: "Sneha Reddy", category: "Corporate Gifting", location: "Hitec City, Hyderabad", buyerType: "Festive Executive Gifting", typicalMoq: 120, preferredCrafts: ["Brass Handicraft", "Madhubani Painting"] },
  { id: "buyer-009", businessName: "Rural Luxe Global", authorizedPerson: "Kabir Sengupta", category: "Fair Trade Export", location: "Gurugram, Haryana", buyerType: "US & UK Fair Trade Network", typicalMoq: 150, preferredCrafts: ["Channapatna Toys", "Bamboo Craft"] },
  { id: "buyer-010", businessName: "Handmade Collective", authorizedPerson: "Nandita Joshi", category: "Design Studio", location: "FC Road, Pune", buyerType: "Artisan Accelerator", typicalMoq: 35, preferredCrafts: ["Khatwa Applique Craft", "Embroidery"] }
];

for (let i = 11; i <= 32; i++) {
  const bId = `buyer-${String(i).padStart(3, '0')}`;
  buyers.push({
    id: bId,
    businessName: `IndoCraft Enterprise #${i}`,
    authorizedPerson: `Partner ${i}`,
    category: i % 2 === 0 ? "Corporate Gifting" : "Hospitality Supplier",
    location: `Commercial District, Sector ${i}`,
    buyerType: "Wholesale B2B Buyer",
    typicalMoq: 30 + (i * 5),
    preferredCrafts: ["Handcrafted Masterpieces", "Regional Heritage"]
  });
}

// Generate 54 Inquiries
const inquiries = [];
for (let i = 1; i <= 54; i++) {
  const inqId = `inquiry-${String(i).padStart(3, '0')}`;
  const artisan = ARTISANS[(i - 1) % ARTISANS.length];
  const buyer = buyers[(i - 1) % buyers.length];
  const product = products[(i - 1) % products.length];
  const statuses = ['New', 'Viewed', 'Negotiating', 'Accepted', 'Rejected', 'Completed'];
  const status = statuses[i % statuses.length];

  inquiries.push({
    id: inqId,
    inquiryId: inqId,
    buyerId: buyer.id,
    buyerName: buyer.authorizedPerson,
    buyerOrg: buyer.businessName,
    artisanId: artisan.id,
    artisanName: artisan.name,
    productId: product.productId,
    productName: product.productName,
    quantity: 15 + (i * 3),
    totalAmount: (15 + (i * 3)) * product.b2bPrice,
    status,
    notes: `Wholesale inquiry for ${product.productName}. Requires delivery within ${product.leadTimeDays + 5} days.`,
    createdAt: "2026-09-08T10:00:00Z"
  });
}

// Generate 10 Curated Demo Scenarios
const scenarios = [
  { id: "scenario-001", title: "Female Artisan Showcase", subtitle: "Savita Devi (Mithila Art) ↔ Heritage Home Collective", artisanId: "artisan-001", artisanName: "Savita Devi", craft: "Madhubani Painting", state: "Bihar", productId: "product-001", buyerId: "buyer-001", description: "Demonstrates authentic GI-certified folk painting by woman master artisan with 40 units/mo capacity and deterministic floor protection." },
  { id: "scenario-002", title: "Male Artisan Showcase", subtitle: "Mohan Das (Terracotta) ↔ Bharat Handloom House", artisanId: "artisan-004", artisanName: "Mohan Das", craft: "Terracotta Craft", state: "West Bengal", productId: "product-007", buyerId: "buyer-003", description: "Centuries-old Bankura pottery traditions with 80 units/mo capacity and sustainable packaging." },
  { id: "scenario-003", title: "Master Artisan High Trust", subtitle: "Ramesh Kumar (Brass Art) ↔ Artisan Avenue Corp", artisanId: "artisan-003", artisanName: "Ramesh Kumar", craft: "Brass Handicraft", state: "Uttar Pradesh", productId: "product-005", buyerId: "buyer-008", description: "95/100 Trust score demonstration with 22 years of master craftsmanship and large corporate fulfillment." },
  { id: "scenario-004", title: "Emerging Female Artisan", subtitle: "Pooja Mahato (Sikki Grass) ↔ Urban Craft Retail", artisanId: "artisan-007", artisanName: "Pooja Mahato", craft: "Bamboo & Cane Craft", state: "Bihar", productId: "product-013", buyerId: "buyer-002", description: "Fast-growing young artisan cooperative fulfilling eco-friendly kitchenware orders." },
  { id: "scenario-005", title: "High-Capacity B2B Manufacturing", subtitle: "Vijay Kumar Rastogi (Brass) ↔ Rural Luxe Global", artisanId: "artisan-026", artisanName: "Vijay Kumar Rastogi", craft: "Brass Craft", state: "Uttar Pradesh", productId: "product-051", buyerId: "buyer-009", description: "High volume 250 units/month production capacity for international export consignments." },
  { id: "scenario-006", title: "B2B Bulk Volume Seller", subtitle: "Meena Kumari (Dokra Metal) ↔ CraftBasket Wholesale", artisanId: "artisan-002", artisanName: "Meena Kumari", craft: "Dokra Metal Craft", state: "Jharkhand", productId: "product-003", buyerId: "buyer-005", description: "Demonstrates capacity mismatch warnings when buyer requests 100 units exceeding 50 units/mo capacity." },
  { id: "scenario-007", title: "Premium Luxury Craft", subtitle: "Shanti Devi (Katan Silk Saree) ↔ Heritage Home Collective", artisanId: "artisan-019", artisanName: "Shanti Devi", craft: "Handloom Saree", state: "Uttar Pradesh", productId: "product-037", buyerId: "buyer-001", description: "Heirloom bridal handloom weaving priced at ₹24,000 with 100% genuine zari certification." },
  { id: "scenario-008", title: "Regional Heritage Craft", subtitle: "Manoj Das (Walnut Wood) ↔ FolkRoots Lifestyle", artisanId: "artisan-014", artisanName: "Manoj Das", craft: "Wood Carving", state: "Jammu & Kashmir", productId: "product-027", buyerId: "buyer-006", description: "Native Kashmiri seasoned walnut root wood carving with zero chemical stains." },
  { id: "scenario-009", title: "Low-MOQ Small Batch Artisan", subtitle: "Laxmi Pradhan (Silver Filigree) ↔ Studio Bharat Interio", artisanId: "artisan-015", artisanName: "Laxmi Pradhan", craft: "Tribal Jewellery", state: "Odisha", productId: "product-029", buyerId: "buyer-007", description: "Low MOQ of 5 units allowing boutique stores to test delicate silver gossamer jewellery." },
  { id: "scenario-010", title: "High-Demand Festive Product", subtitle: "Suresh Prasad (Blue Pottery) ↔ Earth & Loom Exports", artisanId: "artisan-010", artisanName: "Suresh Prasad", craft: "Blue Pottery", state: "Rajasthan", productId: "product-019", buyerId: "buyer-004", description: "Peak festive season demand with 90 units/month production and lead time tracking." }
];

// Enrich every artisan with avatarUrl, verification flags, and credentials
for (const a of ARTISANS) {
  a.avatarUrl = a.photo;
  a.aadhaarVerified = true;
  a.bankAccountVerified = true;
  if (!a.skills) {
    a.skills = [a.craft, "Cluster GI Certified", "Fair Wage Standard", "Traditional Crafting"];
  }
  if (!a.certifications) {
    a.certifications = [
      `GI Tag Certified (${a.giRegistrationNo})`,
      `Ministry of Textiles Pehchan Card (${a.pehchanId})`,
      "All India Handicrafts Board Registered"
    ];
  }
}

// Generate realistic Market Matches for all 52 artisans against 32 buyers
const marketMatches = [];
let matchCounter = 1;
for (const a of ARTISANS) {
  for (const b of buyers) {
    const craftMatch = (b.preferredCrafts || []).some(c => a.craft.toLowerCase().includes(c.toLowerCase()));
    const score = craftMatch ? Math.min(98, 80 + (a.trustScore % 18)) : Math.min(85, 65 + (a.trustScore % 12));
    if (craftMatch || score >= 74) {
      marketMatches.push({
        id: `match-${matchCounter++}`,
        artisanId: a.id,
        artisanName: a.name,
        craft: a.craft,
        location: a.location,
        state: a.state,
        capacityPerMonth: a.capacityPerMonth,
        buyerId: b.id,
        buyerName: b.authorizedPerson,
        buyerOrg: b.companyName,
        buyerCity: b.city,
        buyerState: b.state,
        typicalOrder: b.typicalOrder,
        minUnits: b.minUnits,
        maxUnits: b.maxUnits,
        compatibilityScore: score,
        craftMatch: !!craftMatch,
        volumeCompatible: b.minUnits <= a.capacityPerMonth,
        logisticsRoute: `${a.state} → ${b.city} Direct Fair Corridor`,
        recommendedAction: score >= 90 ? "Top Compatible Buyer — Proactively send swatch samples" : "Wholesale catalog inquiry",
        status: 'matched',
        isDemoData: true
      });
    }
  }
}

const DEMO_ECONOMICS = {
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

// Write all TS modules to src/demoData and server/demoData
function writeModule(filename, code) {
  fs.writeFileSync(path.join(clientDemoDir, filename), code);
  fs.writeFileSync(path.join(serverDemoDir, filename), code);
}

writeModule('artisans.ts', `export const DEMO_ARTISANS = ${JSON.stringify(ARTISANS, null, 2)};\nexport type DemoArtisan = typeof DEMO_ARTISANS[0];\n`);
writeModule('products.ts', `export const DEMO_PRODUCTS = ${JSON.stringify(products, null, 2)};\nexport type DemoProduct = typeof DEMO_PRODUCTS[0];\n`);
writeModule('buyers.ts', `export const DEMO_BUYERS = ${JSON.stringify(buyers, null, 2)};\nexport type DemoBuyer = typeof DEMO_BUYERS[0];\n`);
writeModule('inquiries.ts', `export const DEMO_INQUIRIES = ${JSON.stringify(inquiries, null, 2)};\nexport type DemoInquiry = typeof DEMO_INQUIRIES[0];\n`);
writeModule('scenarios.ts', `export const DEMO_SCENARIOS = ${JSON.stringify(scenarios, null, 2)};\nexport type DemoScenario = typeof DEMO_SCENARIOS[0];\n`);

// Also write unified server/data.json
const serverDataJson = {
  artisan: ARTISANS[0],
  artisans: ARTISANS,
  buyers: buyers,
  products: products,
  inquiries: inquiries,
  scenarios: scenarios,
  marketMatches: marketMatches,
  economics: DEMO_ECONOMICS,
  priceRecommendations: []
};
fs.writeFileSync(path.join(process.cwd(), 'server', 'data.json'), JSON.stringify(serverDataJson, null, 2));


// index.ts with unified accessors and helpers
const indexCode = `import { DEMO_ARTISANS, DemoArtisan } from './artisans';
import { DEMO_PRODUCTS, DemoProduct } from './products';
import { DEMO_BUYERS, DemoBuyer } from './buyers';
import { DEMO_INQUIRIES, DemoInquiry } from './inquiries';
import { DEMO_SCENARIOS, DemoScenario } from './scenarios';

export * from './artisans';
export * from './products';
export * from './buyers';
export * from './inquiries';
export * from './scenarios';

export const DEMO_DATASET = {
  artisans: DEMO_ARTISANS,
  products: DEMO_PRODUCTS,
  buyers: DEMO_BUYERS,
  inquiries: DEMO_INQUIRIES,
  scenarios: DEMO_SCENARIOS,
  stats: {
    totalArtisans: DEMO_ARTISANS.length,
    femaleArtisans: DEMO_ARTISANS.filter(a => a.gender === 'Female').length,
    maleArtisans: DEMO_ARTISANS.filter(a => a.gender === 'Male').length,
    totalProducts: DEMO_PRODUCTS.length,
    totalBuyers: DEMO_BUYERS.length,
    totalInquiries: DEMO_INQUIRIES.length,
    statesCovered: Array.from(new Set(DEMO_ARTISANS.map(a => a.state))).length,
    craftsCovered: Array.from(new Set(DEMO_ARTISANS.map(a => a.craft))).length,
    platformGMV: "₹24,80,000"
  },
  disclaimer: "All profiles, businesses, transactions and verification records shown here are fictional demonstration data for Smart India Hackathon (SIH 26090)."
};

/**
 * Universal Artisan Finder
 * Resolves by:
 * - ID: "artisan-001", "artisan-1"
 * - Code: "ART-001"
 * - Pehchan ID: "BR-MAD-PNT-4402"
 * Returns undefined if not found.
 */
export function findArtisan(idOrQuery?: string | null): DemoArtisan | undefined {
  if (!idOrQuery) return undefined;
  const q = idOrQuery.trim().toLowerCase();

  return DEMO_ARTISANS.find(a => {
    if (a.id.toLowerCase() === q) return true;
    if (a.legacyId && a.legacyId.toLowerCase() === q) return true;
    if (a.code && a.code.toLowerCase() === q) return true;
    if (a.pehchanId && a.pehchanId.toLowerCase() === q) return true;

    // Normalization: "artisan-1" <-> "artisan-001"
    const numPart = q.replace(/^artisan-|^art-/, '');
    const aNumPart = a.id.replace('artisan-', '');
    if (parseInt(numPart, 10) === parseInt(aNumPart, 10)) return true;

    return false;
  });
}

export function getArtisanProducts(artisanId: string): DemoProduct[] {
  const artisan = findArtisan(artisanId);
  if (!artisan) return [];
  return DEMO_PRODUCTS.filter(p => p.artisanId === artisan.id || p.artisanId === artisan.legacyId);
}

export function getArtisanImage(artisan?: DemoArtisan | null): string {
  if (!artisan) return '/images/savita_devi.jpg';
  return artisan.photo || \`/images/avatars/\${artisan.id}.svg\`;
}
`;

writeModule('index.ts', indexCode);

// Generate src/pages/DemoHub.tsx
const demoHubCode = `import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Filter, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Package, 
  TrendingUp, 
  Users, 
  Layers, 
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  FileCheck,
  Check,
  Info,
  Award
} from 'lucide-react';
import { DEMO_DATASET, findArtisan, getArtisanImage, DemoArtisan } from '@/demoData';
import { useApp } from '@/context/AppContext';
import { BackButton } from '@/components/BackButton';

export default function DemoHub() {
  const navigate = useNavigate();
  const { state, addToast, reloadArtisanProfile } = useApp();
  const isHi = state.language === 'hi';

  const [activeTab, setActiveTab] = useState<'artisans' | 'scenarios' | 'buyers'>('artisans');
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Female' | 'Male'>('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [craftFilter, setCraftFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'trust' | 'capacity' | 'experience' | 'name'>('trust');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [switchingArtisanId, setSwitchingArtisanId] = useState<string | null>(null);

  // States & Crafts list
  const uniqueStates = useMemo(() => {
    const set = new Set(DEMO_DATASET.artisans.map(a => a.state));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const uniqueCrafts = useMemo(() => {
    const set = new Set(DEMO_DATASET.artisans.map(a => a.craft));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered & Sorted Artisans
  const filteredArtisans = useMemo(() => {
    return DEMO_DATASET.artisans.filter(artisan => {
      if (genderFilter !== 'All' && artisan.gender !== genderFilter) return false;
      if (stateFilter !== 'All' && artisan.state !== stateFilter) return false;
      if (craftFilter !== 'All' && artisan.craft !== craftFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = artisan.name.toLowerCase().includes(q);
        const matchesCraft = artisan.craft.toLowerCase().includes(q);
        const matchesLocation = artisan.location.toLowerCase().includes(q);
        const matchesState = artisan.state.toLowerCase().includes(q);
        const matchesPehchan = (artisan.pehchanId || '').toLowerCase().includes(q);
        const matchesId = artisan.id.toLowerCase().includes(q) || (artisan.legacyId || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCraft && !matchesLocation && !matchesState && !matchesPehchan && !matchesId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trust') return (b.trustScore || 0) - (a.trustScore || 0);
      if (sortBy === 'capacity') return (b.capacityPerMonth || 0) - (a.capacityPerMonth || 0);
      if (sortBy === 'experience') return (b.experienceYears || 0) - (a.experienceYears || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [genderFilter, stateFilter, craftFilter, searchQuery, sortBy]);

  // 1-Click Switch Active Artisan
  const handleSwitchArtisan = async (artisan: DemoArtisan) => {
    setSwitchingArtisanId(artisan.id);
    try {
      await fetch('/api/demo/switch-artisan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artisanId: artisan.id })
      });
      await reloadArtisanProfile();
      addToast({
        message: \`Switched active platform artisan to \${artisan.name} (\${artisan.craft})\`,
        type: 'success'
      });
    } catch (e) {
      console.warn('Switch artisan failed:', e);
      addToast({
        message: \`Active artisan set to \${artisan.name}\`,
        type: 'info'
      });
    } finally {
      setSwitchingArtisanId(null);
    }
  };

  // 1-Click Launch Scenario
  const handleLaunchScenario = async (scenario: any) => {
    setActiveScenarioId(scenario.id);
    try {
      await fetch('/api/demo/switch-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: scenario.id })
      });
      await reloadArtisanProfile();
      addToast({
        message: \`Loaded scenario: "\${scenario.title}" with \${scenario.artisanName}\`,
        type: 'celebration'
      });
      navigate(\`/seller/\${scenario.artisanId}\`);
    } catch (e) {
      console.warn('Launch scenario fallback:', e);
      navigate(\`/seller/\${scenario.artisanId}\`);
    } finally {
      setActiveScenarioId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  SIH 2026 Demonstration Hub
                </h1>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-amber-300">
                  SIH 26090
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Complete Indian Artisan & B2B Ecosystem Simulation • Problem Statement 26090
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* DEMO MODE DISCLAIMER BANNER */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-200/80 rounded-xl text-amber-900 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  ⚡ SIH Evaluation Demo Environment
                </span>
                <span className="bg-amber-300/80 text-amber-950 text-[10px] px-2 py-0.2 rounded-full font-bold">
                  DEMO DATASET
                </span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                All 52 artisan identities, 104 products, 32 B2B buyers, GSTIN/PAN records, and transaction histories shown here are realistic fictional demonstration models curated specifically for Smart India Hackathon 2026. Real identity credentials, Aadhaar biometric data, and live government registries are safeguarded according to official data protection norms.
              </p>
            </div>
          </div>
        </div>

        {/* OVERVIEW METRICS KPI GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total Artisans</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.totalArtisans}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">50/50 Gender Parity</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-pink-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-pink-600">Female Artisans</div>
            <div className="text-xl font-black text-pink-700 mt-0.5">{DEMO_DATASET.stats.femaleArtisans}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">SHG & Cooperatives</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-blue-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-blue-600">Male Artisans</div>
            <div className="text-xl font-black text-blue-700 mt-0.5">{DEMO_DATASET.stats.maleArtisans}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Master Craftsmen</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">States Covered</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.statesCovered}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Pan-India Reach</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Craft Traditions</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.craftsCovered}</div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">GI-Tag Clusters</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Handcrafted SKUs</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.totalProducts}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">2 SKUs per Artisan</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Verified Buyers</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.totalBuyers}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Across 18 Cities</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-amber-700">Platform GMV</div>
            <div className="text-base font-black text-amber-900 mt-1">{DEMO_DATASET.stats.platformGMV}</div>
            <div className="text-[10px] text-amber-700 font-medium mt-0.5">Simulated Flow</div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('artisans')}
            className={\`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer \${
              activeTab === 'artisans'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }\`}
          >
            <Users className="w-4 h-4" />
            <span>52 Master Artisans ({DEMO_DATASET.artisans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={\`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer \${
              activeTab === 'scenarios'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }\`}
          >
            <Sparkles className="w-4 h-4" />
            <span>10 Curated Presentation Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('buyers')}
            className={\`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer \${
              activeTab === 'buyers'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }\`}
          >
            <Building2 className="w-4 h-4" />
            <span>32 Verified B2B Buyers</span>
          </button>
        </div>

        {/* TAB 1: 52 MASTER ARTISANS */}
        {activeTab === 'artisans' && (
          <div className="space-y-5">
            {/* Search, Filter & Sort Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by artisan name, craft (Dokra, Madhubani, Terracotta), state, or Pehchan ID..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                {/* Gender Filter Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500 mr-1">Gender:</span>
                  <button
                    onClick={() => setGenderFilter('All')}
                    className={\`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer \${
                      genderFilter === 'All'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }\`}
                  >
                    All ({DEMO_DATASET.artisans.length})
                  </button>
                  <button
                    onClick={() => setGenderFilter('Female')}
                    className={\`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer \${
                      genderFilter === 'Female'
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
                    }\`}
                  >
                    ♀ Female ({DEMO_DATASET.stats.femaleArtisans})
                  </button>
                  <button
                    onClick={() => setGenderFilter('Male')}
                    className={\`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer \${
                      genderFilter === 'Male'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }\`}
                  >
                    ♂ Male ({DEMO_DATASET.stats.maleArtisans})
                  </button>
                </div>

                {/* State & Craft Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="All">All 26 States/UTs</option>
                    {uniqueStates.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <select
                    value={craftFilter}
                    onChange={(e) => setCraftFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="All">All 32 Crafts</option>
                    {uniqueCrafts.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="trust">Sort: Trust Score</option>
                    <option value="capacity">Sort: Monthly Capacity</option>
                    <option value="experience">Sort: Experience</option>
                    <option value="name">Sort: Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing <strong>{filteredArtisans.length}</strong> of <strong>{DEMO_DATASET.artisans.length}</strong> certified Indian master artisans</span>
              {(genderFilter !== 'All' || stateFilter !== 'All' || craftFilter !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setGenderFilter('All');
                    setStateFilter('All');
                    setCraftFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Artisan Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArtisans.map((artisan) => {
                const isSelected = state.artisan.id === artisan.id || state.artisan.id === artisan.legacyId;
                const imgSrc = getArtisanImage(artisan);

                return (
                  <div
                    key={artisan.id}
                    className={\`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden \${
                      isSelected 
                        ? 'border-amber-400 ring-2 ring-amber-300/60 shadow-sm' 
                        : 'border-slate-200'
                    }\`}
                  >
                    {/* Top Row: Portrait + Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex gap-3.5 items-start">
                        {/* Distinct Portrait / Dedicated Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                            <img
                              src={imgSrc}
                              alt={artisan.name}
                              className="w-full h-full object-cover"
                              onError={(e: any) => {
                                e.currentTarget.src = \`/images/avatars/\${artisan.id}.svg\`;
                              }}
                            />
                          </div>
                          <span 
                            className={\`absolute -bottom-1 -right-1 text-[9px] font-black px-1.5 py-0.2 rounded-full border shadow-xs \${
                              artisan.gender === 'Female' 
                                ? 'bg-pink-100 text-pink-800 border-pink-300' 
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                            }\`}
                          >
                            {artisan.gender === 'Female' ? '♀ F' : '♂ M'}
                          </span>
                        </div>

                        {/* Name, Craft, Location */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="text-sm font-black text-slate-900 truncate">
                              {artisan.name}
                            </h3>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-md shrink-0">
                              {artisan.trustScore}/100
                            </span>
                          </div>
                          <p className="text-xs font-bold text-amber-700 truncate mt-0.5">
                            {artisan.craft}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                            <span className="truncate">{artisan.location}, {artisan.state}</span>
                          </p>
                        </div>
                      </div>

                      {/* Pehchan ID & GI Tags */}
                      <div className="flex flex-wrap gap-1.5 text-[10px]">
                        <span className="bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded-md font-semibold">
                          ID: {artisan.pehchanId}
                        </span>
                        {artisan.giCertified && (
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>GI Certified</span>
                          </span>
                        )}
                        {artisan.shgMember && (
                          <span className="bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded-md border border-indigo-200">
                            SHG Active
                          </span>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Monthly Capacity</span>
                          <span className="font-bold text-slate-800">{artisan.capacity || \`\${artisan.capacityPerMonth} pcs/mo\`}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Experience</span>
                          <span className="font-bold text-slate-800">{artisan.experienceYears} Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleSwitchArtisan(artisan)}
                        disabled={switchingArtisanId === artisan.id}
                        className={\`text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer \${
                          isSelected
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
                        }\`}
                        title="Set as active platform session artisan"
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <span>Set Active</span>
                        )}
                      </button>

                      <button
                        onClick={() => navigate(\`/seller/\${artisan.id}\`)}
                        className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all flex items-center gap-1 shadow-2xs group cursor-pointer"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 10 CURATED SCENARIOS */}
        {activeTab === 'scenarios' && (
          <div className="space-y-4">
            <div className="bg-indigo-900 text-white p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h2 className="text-base font-black tracking-tight">
                  10 Curated Presentation Scenarios for SIH Judges
                </h2>
              </div>
              <p className="text-xs text-indigo-200">
                Click any scenario below to immediately configure the platform state, load matching B2B inquiries, bind the artisan profile, and demonstrate deterministic pricing protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_DATASET.scenarios.map((scenario, index) => {
                const artisan = findArtisan(scenario.artisanId);
                const imgSrc = artisan ? getArtisanImage(artisan) : '/images/savita_devi.jpg';

                return (
                  <div
                    key={scenario.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-indigo-200">
                            Scenario {index + 1}
                          </span>
                          <h3 className="text-sm font-black text-slate-900 mt-1">
                            {scenario.title}
                          </h3>
                        </div>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono shrink-0">
                          {scenario.state}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-700">
                        {scenario.subtitle}
                      </p>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {scenario.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img src={imgSrc} alt={scenario.artisanName} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-900 block leading-tight">{scenario.artisanName}</span>
                          <span className="text-[10px] text-amber-700 block leading-tight">{scenario.craft}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchScenario(scenario)}
                        disabled={activeScenarioId === scenario.id}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Run Demo</span>
                        <ChevronRight className="w-3 h-3 text-amber-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 32 VERIFIED B2B BUYERS */}
        {activeTab === 'buyers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">32 Verified Pan-India B2B Buyers</h2>
                <p className="text-xs text-slate-500 mt-0.5">Corporate gifting, boutique retailers, hotel chains, and export houses</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                100% GSTIN Simulated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DEMO_DATASET.buyers.map((buyer) => (
                <div key={buyer.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-black text-slate-900 truncate">{buyer.companyName}</h3>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0">
                      {buyer.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{buyer.authorizedPerson} • {buyer.city}, {buyer.state}</span>
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] flex justify-between items-center text-slate-500">
                    <span>Typical: <strong>{buyer.typicalOrder}</strong></span>
                    <span className="text-emerald-700 font-bold">Trust: {buyer.trustScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'pages', 'DemoHub.tsx'), demoHubCode);
console.log("DemoHub page component generated successfully!");

console.log("Centralized deterministic demoData module created successfully!");

