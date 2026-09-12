import { GoogleGenerativeAI } from '@google/generative-ai';
import { store } from '../store.js';

export interface AssistantAction {
  type: 'NAVIGATE' | 'CONFIRM_PRICE_CHANGE' | 'OPEN_MODAL';
  route?: string;
  label: string;
  payload?: any;
}

export interface AssistantResponse {
  response: string;
  intent: string;
  action: AssistantAction | null;
  data?: any;
  isDemoMode: boolean;
}

const SYSTEM_PROMPT = `You are Karigar Saathi, a helpful multilingual AI business assistant for artisans using the KarigarSetu platform.
Your job is to help artisans manage their digital business, products, pricing, buyers, orders/inquiries, and business performance.
Use simple, respectful, and encouraging language.
Prefer Hindi (Devanagari script) when the user speaks Hindi.
You can fluently understand Hindi, English, and Hinglish.
Never invent business data. Use ONLY the real artisan business context provided below.
If information is not available, clearly say that it is not available.
Do not claim an action was completed unless the application actually completed it.
Never make irreversible decisions without user confirmation.
Prices, product information, and business information must remain editable by the artisan.

You must respond in strict JSON matching this exact structure:
{
  "response": "Your spoken/written response to the artisan in their language (Hindi/English/Hinglish)",
  "intent": "SHOW_PRODUCTS | SHOW_PROFILE | SHOW_ANALYTICS | SHOW_PROFIT | SHOW_BUYERS | OPEN_ADD_PRODUCT | OPEN_PRICING | OPEN_MARKET_MATCH | OPEN_DIGITAL_IDENTITY | OPEN_QR | GENERATE_DESCRIPTION | PRICING_ASSISTANCE | GENERAL_ASSISTANCE",
  "action": {
    "type": "NAVIGATE",
    "route": "/catalog | /economics | /market-match | /buyer-marketplace | /add-product | /pricing | /studio | /seller/artisan-1",
    "label": "Button label for user"
  } or null,
  "data": null
}`;

/**
 * Builds dynamic business context from store to feed into Gemini or NLU engine
 */
function getBusinessContext() {
  const artisan = store.artisan;
  const products = store.products;
  const economics = store.economics;
  const inquiries = store.inquiries;
  const buyers = store.buyers;

  const totalProducts = products.length;
  const sepData = economics.monthly.find(m => m.month === 'Sep') || economics.monthly[economics.monthly.length - 1];
  const totalRev = economics.summary.totalRevenue;
  const totalCost = economics.summary.totalCost;
  const totalProfit = economics.summary.totalProfit;
  const avgMargin = economics.summary.avgMargin;
  const topProduct = economics.summary.topProduct;
  const weakProduct = economics.summary.weakProduct;
  const diagnosticInsight = economics.summary.diagnosticInsight;

  return {
    artisan: {
      name: artisan.name,
      craft: artisan.craft,
      location: artisan.location,
      experience: artisan.experience,
      giCertified: artisan.giCertified,
      giRegistrationNo: artisan.giRegistrationNo,
      pehchanId: artisan.pehchanId,
      activeListings: totalProducts,
      trustScore: artisan.trustScore,
      rating: artisan.rating
    },
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      craftCategory: p.craftCategory || p.category,
      price: p.price,
      stock: p.stock,
      materials: p.materials || p.material,
      laborHours: p.estimatedHours || p.costBreakdown?.labourHours
    })),
    economics: {
      currentMonth: 'September 2026',
      currentMonthRevenue: sepData.revenue,
      currentMonthCost: sepData.cost,
      currentMonthProfit: sepData.profit,
      currentMonthMargin: sepData.margin,
      sixMonthTotalRevenue: totalRev,
      sixMonthTotalCost: totalCost,
      sixMonthTotalProfit: totalProfit,
      averageProfitMargin: avgMargin,
      topProduct,
      weakProduct,
      diagnosticInsight
    },
    topPerformingProducts: [
      { name: "Hand-painted Madhubani Wall Art", sold: 18, revenue: 56700, demand: "High Demand", margin: "48%" },
      { name: "Tribal Dokra Elephant Figurine", sold: 14, revenue: 34300, demand: "High Demand", margin: "42%" },
      { name: "Pure Katan Silk Banarasi Saree", sold: 6, revenue: 111600, demand: "High Demand", margin: "45%" },
      { name: "Hand-carved Kashmiri Walnut Box", sold: 10, revenue: 38500, demand: "Stable Demand", margin: "46%" }
    ],
    weakPerformingProduct: {
      name: "Sambalpuri Handwoven Stole",
      inquiries: 22,
      ordersConverted: 2,
      conversionRate: "9%",
      diagnosticInsight: "High buyer curiosity with 22 inquiries, but lower conversion. Recommendation: Provide tiered wholesale discount (5% on 25+ pcs) and send weave sample swatches."
    },
    b2bLeads: {
      inquiriesCount: inquiries.length,
      pipelineValue: 485000,
      buyersCount: buyers.length,
      topBuyers: buyers.slice(0, 4).map(b => ({
        name: b.companyName || (b as any).name || "Verified Buyer",
        type: b.category || "B2B Buyer",
        location: b.address || (b as any).location || "India",
        requirement: b.notes || "Artisan cluster sourcing",
        match: `${b.trustScore || 90}%`
      }))
    }
  };
}

/**
 * High-accuracy fallback NLU engine based on live store data
 * Executes when GEMINI_API_KEY is not configured or fails
 */
function handleLocalNlu(message: string, isEnglish: boolean): AssistantResponse {
  const q = message.toLowerCase().trim();
  const ctx = getBusinessContext();

  // 1. Profit / मुनाफ़ा / Earnings query
  if (
    q.includes('profit') || 
    q.includes('मुनाफा') || 
    q.includes('मुनाफ़ा') || 
    q.includes('लाभ') || 
    q.includes('kamai') || 
    q.includes('कमाई') || 
    q.includes('income') || 
    q.includes('earning')
  ) {
    if (isEnglish) {
      return {
        response: `According to your verified business records, your net profit for September is ₹${ctx.economics.currentMonthProfit.toLocaleString('en-IN')} with a ${ctx.economics.currentMonthMargin}% profit margin. Over the last 6 months (April–September), your total cumulative profit is ₹${ctx.economics.sixMonthTotalProfit.toLocaleString('en-IN')} (Total Revenue: ₹${ctx.economics.sixMonthTotalRevenue.toLocaleString('en-IN')}).`,
        intent: 'SHOW_PROFIT',
        action: { type: 'NAVIGATE', route: '/economics', label: 'View Income Analytics' },
        data: ctx.economics,
        isDemoMode: true
      };
    }
    return {
      response: `आपके व्यावसायिक आंकड़ों के अनुसार, सितंबर महीने में आपका अनुमानित शुद्ध लाभ (Profit) ₹${ctx.economics.currentMonthProfit.toLocaleString('en-IN')} है (लाभ मार्जिन ${ctx.economics.currentMonthMargin}%)।\n\nपिछले 6 महीनों (अप्रैल–सितंबर) का कुल शुद्ध लाभ ₹${ctx.economics.sixMonthTotalProfit.toLocaleString('en-IN')} रहा है (कुल आय: ₹${ctx.economics.sixMonthTotalRevenue.toLocaleString('en-IN')})।`,
      intent: 'SHOW_PROFIT',
      action: { type: 'NAVIGATE', route: '/economics', label: 'आय विश्लेषण खोलें (View Analytics)' },
      data: ctx.economics,
      isDemoMode: true
    };
  }

  // 2. Product Count / कितने प्रोडक्ट्स
  if (
    (q.includes('kitne') || q.includes('कितने') || q.includes('how many') || q.includes('count')) && 
    (q.includes('product') || q.includes('उत्पाद') || q.includes('चीज') || q.includes('item') || q.includes('listing'))
  ) {
    if (isEnglish) {
      return {
        response: `You currently have ${ctx.products.length} active verified handcrafted product listings in your catalog across Madhubani, Dokra, Walnut Wood, Brass, Sambalpuri, and Block Print crafts.`,
        intent: 'SHOW_PRODUCTS',
        action: { type: 'NAVIGATE', route: '/catalog', label: 'Open Product Catalog' },
        data: { count: ctx.products.length, products: ctx.products },
        isDemoMode: true
      };
    }
    return {
      response: `आपके पास वर्तमान में कैटलॉग में कुल ${ctx.products.length} सक्रिय और सत्यापित हस्तशिल्प उत्पाद (Listings) हैं, जिनमें मधुबनी पेंटिंग, ढोकरा शिल्प, अखरोट की लकड़ी, और संबलपुरी वस्त्र शामिल हैं।`,
      intent: 'SHOW_PRODUCTS',
      action: { type: 'NAVIGATE', route: '/catalog', label: 'कैटलॉग देखें (Open Catalog)' },
      data: { count: ctx.products.length, products: ctx.products },
      isDemoMode: true
    };
  }

  // 3. Show Products / Catalog
  if (
    (q.includes('product') || q.includes('उत्पाद') || q.includes('कैटलॉग') || q.includes('catalog')) &&
    (q.includes('dikhao') || q.includes('दिखाओ') || q.includes('dekho') || q.includes('show') || q.includes('list') || q.includes('mere'))
  ) {
    if (isEnglish) {
      return {
        response: `Opening your live catalog. You have ${ctx.products.length} products listed. Your premier item is the '${ctx.products[0]?.name}' priced at ₹${ctx.products[0]?.price.toLocaleString('en-IN')}.`,
        intent: 'SHOW_PRODUCTS',
        action: { type: 'NAVIGATE', route: '/catalog', label: 'View Full Catalog' },
        data: ctx.products,
        isDemoMode: true
      };
    }
    return {
      response: `यहाँ आपकी सक्रिय उत्पाद सूची है। आपके कुल ${ctx.products.length} उत्पाद सूचीबद्ध हैं। आपकी प्रमुख वस्तु '${ctx.products[0]?.name}' (मूल्य ₹${ctx.products[0]?.price.toLocaleString('en-IN')}) है।`,
      intent: 'SHOW_PRODUCTS',
      action: { type: 'NAVIGATE', route: '/catalog', label: 'कैटलॉग देखें (Open Catalog)' },
      data: ctx.products,
      isDemoMode: true
    };
  }

  // 4. Analytics / Income Analytics
  if (
    q.includes('analytic') || 
    q.includes('एनालिटिक्स') || 
    q.includes('विश्लेषण') || 
    q.includes('chart') || 
    q.includes('graph') ||
    q.includes('revenue') ||
    q.includes('बिक्री')
  ) {
    if (isEnglish) {
      return {
        response: `Opening your Revenue & Income Analytics. September revenue reached ₹${ctx.economics.currentMonthRevenue.toLocaleString('en-IN')} (Cost: ₹${ctx.economics.currentMonthCost.toLocaleString('en-IN')}, Profit: ₹${ctx.economics.currentMonthProfit.toLocaleString('en-IN')}, Margin: ${ctx.economics.currentMonthMargin}%).`,
        intent: 'SHOW_ANALYTICS',
        action: { type: 'NAVIGATE', route: '/economics', label: 'Open Analytics Page' },
        data: ctx.economics,
        isDemoMode: true
      };
    }
    return {
      response: `मैं आपका आय विश्लेषण (Income Analytics) पृष्ठ खोल रहा हूँ। सितंबर में आपकी कुल आय ₹${ctx.economics.currentMonthRevenue.toLocaleString('en-IN')} रही (लागत: ₹${ctx.economics.currentMonthCost.toLocaleString('en-IN')}, शुद्ध लाभ: ₹${ctx.economics.currentMonthProfit.toLocaleString('en-IN')}, लाभ मार्जिन: ${ctx.economics.currentMonthMargin}%)।`,
      intent: 'SHOW_ANALYTICS',
      action: { type: 'NAVIGATE', route: '/economics', label: 'आय विश्लेषण खोलें (Open Analytics)' },
      data: ctx.economics,
      isDemoMode: true
    };
  }

  // 5. Buyers / खरीदार
  if (
    q.includes('buyer') || 
    q.includes('खरीदार') || 
    q.includes('kharidar') || 
    q.includes('grahak') || 
    q.includes('ग्राहक') || 
    q.includes('b2b') || 
    q.includes('lead')
  ) {
    if (isEnglish) {
      return {
        response: `You have ${ctx.b2bLeads.buyersCount} verified B2B wholesale buyers on the platform and ${ctx.b2bLeads.inquiriesCount} pending bulk inquiries. Top interested buyers include Ananya Home Collective, Heritage Living Studio, and CraftBasket Retail.`,
        intent: 'SHOW_BUYERS',
        action: { type: 'NAVIGATE', route: '/market-match', label: 'Open B2B Market Match' },
        data: ctx.b2bLeads,
        isDemoMode: true
      };
    }
    return {
      response: `मंच पर कुल ${ctx.b2bLeads.buyersCount} सत्यापित थोक B2B खरीदार और ${ctx.b2bLeads.inquiriesCount} सक्रिय थोक पूछताछ उपलब्ध हैं।\n\nप्रमुख खरीदार:\n1. Ananya Home Collective (बेंगलुरु, 94% ट्रस्ट)\n2. Heritage Living Studio (मुंबई, 91% ट्रस्ट)\n3. CraftBasket Retail (नई दिल्ली, 88% ट्रस्ट)`,
      intent: 'SHOW_BUYERS',
      action: { type: 'NAVIGATE', route: '/market-match', label: 'B2B खरीदार देखें (Open Market Match)' },
      data: ctx.b2bLeads,
      isDemoMode: true
    };
  }

  // 6. Weak Product / कौन सा प्रोडक्ट नहीं बिक रहा / Slow moving
  if (
    q.includes('nahi bik') || 
    q.includes('नहीं बिक') || 
    q.includes('kam bik') || 
    q.includes('कम बिक') || 
    q.includes('not selling') || 
    q.includes('slow') || 
    q.includes('kamzor') || 
    q.includes('कमजोर')
  ) {
    const weak = ctx.weakPerformingProduct;
    if (isEnglish) {
      return {
        response: `According to sales analytics, '${weak.name}' has the lowest order conversion despite generating ${weak.inquiries} buyer inquiries. AI Recommendation: ${weak.diagnosticInsight}`,
        intent: 'SHOW_ANALYTICS',
        action: { type: 'NAVIGATE', route: '/economics', label: 'View Analytics Diagnostic' },
        data: weak,
        isDemoMode: true
      };
    }
    return {
      response: `विश्लेषण के अनुसार, '${weak.name}' पर खरीदारों की 22 पूछताछ आई हैं लेकिन ऑर्डर रूपांतरण कम रहा है।\n\nसुझाव: खरीदारों को 25+ इकाइयों पर 5% का थोक डिस्काउंट दें और कपड़े के नमूने (Swatches) उपलब्ध कराएं।`,
      intent: 'SHOW_ANALYTICS',
      action: { type: 'NAVIGATE', route: '/economics', label: 'आय विश्लेषण में देखें (View Analytics)' },
      data: weak,
      isDemoMode: true
    };
  }

  // 7. Top Selling / Best Performing Product
  if (
    q.includes('sabse jyada') || 
    q.includes('sabse zyada') || 
    q.includes('सबसे ज्यादा') || 
    q.includes('सबसे ज़्यादा') || 
    q.includes('top selling') || 
    q.includes('best product') || 
    q.includes('achha chal') || 
    q.includes('top product') ||
    (q.includes('sabse') && (q.includes('bik') || q.includes('achha') || q.includes('zyada') || q.includes('jyada')))
  ) {
    const top = ctx.topPerformingProducts[0];
    if (isEnglish) {
      return {
        response: `Your top-performing product is '${top.name}'. It generated ₹${top.revenue.toLocaleString('en-IN')} in revenue with ${top.sold} units sold and enjoys high demand with a healthy ${top.margin} profit margin.`,
        intent: 'SHOW_ANALYTICS',
        action: { type: 'NAVIGATE', route: '/economics', label: 'View Product Performance' },
        data: top,
        isDemoMode: true
      };
    }
    return {
      response: `आपकी सबसे ज्यादा बिकने वाली वस्तु '${top.name}' है। इसने 18 इकाइयों की बिक्री के साथ ₹${top.revenue.toLocaleString('en-IN')} की आय अर्जित की है और इस पर B2B खरीदारों की उच्च मांग (High Demand) है। लाभ मार्जिन ${top.margin} है।`,
      intent: 'SHOW_ANALYTICS',
      action: { type: 'NAVIGATE', route: '/economics', label: 'उत्पाद प्रदर्शन देखें (View Performance)' },
      data: top,
      isDemoMode: true
    };
  }

  // 7. Add Product / नया प्रोडक्ट जोड़ना है
  if (
    q.includes('naya product') || 
    q.includes('नया product') || 
    q.includes('नया उत्पाद') || 
    q.includes('add product') || 
    q.includes('jodna') || 
    q.includes('जोड़ना') || 
    q.includes('upload')
  ) {
    if (isEnglish) {
      return {
        response: "Taking you to the Add New Product page. You can take a photo and use regional voice typing to list your creation in minutes.",
        intent: 'OPEN_ADD_PRODUCT',
        action: { type: 'NAVIGATE', route: '/add-product', label: 'Go to Add Product' },
        data: null,
        isDemoMode: true
      };
    }
    return {
      response: "चलिए नया उत्पाद जोड़ते हैं! मैं आपको 'नया उत्पाद जोड़ें' पृष्ठ पर ले जा रहा हूँ, जहाँ आप फोटो खींचकर बोलकर विवरण लिख सकते हैं।",
      intent: 'OPEN_ADD_PRODUCT',
      action: { type: 'NAVIGATE', route: '/add-product', label: 'नया उत्पाद जोड़ें (Add Product)' },
      data: null,
      isDemoMode: true
    };
  }

  // 8. Pricing / कीमत कितनी रखनी चाहिए
  if (
    q.includes('price') || 
    q.includes('कीमत') || 
    q.includes('kimat') || 
    q.includes('rate') || 
    q.includes('भाव') || 
    q.includes('मूल्य') || 
    q.includes('pricing')
  ) {
    // Check if user specifically requested modifying a price to a specific number
    const priceChangeMatch = q.match(/(?:badal|change|set|karke|rakho|kardo)\s*(?:to|kar)?\s*(\d{3,6})/i) || q.match(/(\d{3,6})\s*(?:kar do|kardo|karo|rakho)/i);
    if (priceChangeMatch) {
      const targetPrice = priceChangeMatch[1];
      return {
        response: isEnglish 
          ? `Do you want to confirm changing the final price of this product to ₹${Number(targetPrice).toLocaleString('en-IN')}?`
          : `क्या आप इस उत्पाद का अंतिम मूल्य बदलकर ₹${Number(targetPrice).toLocaleString('en-IN')} करना चाहते हैं?`,
        intent: 'PRICING_ASSISTANCE',
        action: {
          type: 'CONFIRM_PRICE_CHANGE',
          label: isEnglish ? `Confirm Price ₹${targetPrice}` : `पुष्टि करें: ₹${targetPrice}`,
          payload: { price: Number(targetPrice) }
        },
        isDemoMode: true
      };
    }

    if (isEnglish) {
      return {
        response: `For a Pure Katan Silk Handloom Saree (Raw Materials: ~₹4,000, 96 Labor Hours @ ₹150/hr wage, and a 30% direct B2B margin), the deterministic suggested price range is ₹16,500 – ₹19,500. The recommended wholesale B2B price is ₹18,600.`,
        intent: 'PRICING_ASSISTANCE',
        action: { type: 'NAVIGATE', route: '/pricing', label: 'Open Fair Pricing Engine' },
        data: { suggestedMin: 16500, suggestedMax: 19500, recommended: 18600 },
        isDemoMode: true
      };
    }
    return {
      response: `शुद्ध कतान सिल्क हथकरघा साड़ी (कच्चा माल: ~₹4,000, 96 घंटे का श्रम @ ₹150/घंटा कारीगर मानदेय, और 30% निष्पक्ष B2B मार्जिन) के आधार पर:\n\n• सुझाई गई मूल्य सीमा (Price Range): ₹16,500 – ₹19,500\n• अनुशंसित B2B थोक मूल्य: ₹18,600\n\nआप इस मूल्य को अपनी इच्छानुसार कभी भी बदल सकते हैं।`,
      intent: 'PRICING_ASSISTANCE',
      action: { type: 'NAVIGATE', route: '/pricing', label: 'उचित मूल्य निर्धारक खोलें (Pricing Engine)' },
      data: { suggestedMin: 16500, suggestedMax: 19500, recommended: 18600 },
      isDemoMode: true
    };
  }

  // 9. Profile / Pehchan Patra / डिजिटल पहचान
  if (
    q.includes('profile') || 
    q.includes('प्रोफाइल') || 
    q.includes('प्रोफ़ाइल') || 
    q.includes('pehchan') || 
    q.includes('पहचान') || 
    q.includes('qr') || 
    q.includes('क्यूआर') || 
    q.includes('card')
  ) {
    if (isEnglish) {
      return {
        response: `Opening your verified Artisan Pehchan Patra Profile. You are registered as '${ctx.artisan.name}' with GI Tag Registration ${ctx.artisan.giRegistrationNo} and Ministry of Textiles Pehchan Card ${ctx.artisan.pehchanId}.`,
        intent: 'SHOW_PROFILE',
        action: { type: 'NAVIGATE', route: '/seller/artisan-1', label: 'View Verified Digital ID' },
        data: ctx.artisan,
        isDemoMode: true
      };
    }
    return {
      response: `यह रहा आपका प्रमाणित कारीगर पहचान पत्र (Pehchan Patra)।\n• नाम: ${ctx.artisan.name}\n• शिल्प: ${ctx.artisan.craft}\n• GI पंजीकरण: ${ctx.artisan.giRegistrationNo}\n• पहचान पत्र संख्या: ${ctx.artisan.pehchanId}\n\nकोई भी खरीदार आपका QR कोड स्कैन करके आपका प्रामाणिक प्रोफ़ाइल देख सकता है।`,
      intent: 'SHOW_PROFILE',
      action: { type: 'NAVIGATE', route: '/seller/artisan-1', label: 'पहचान पत्र प्रोफाइल देखें (View Profile)' },
      data: ctx.artisan,
      isDemoMode: true
    };
  }

  // 10. Generate Description / विवरण बनाओ
  if (
    q.includes('description') || 
    q.includes('विवरण') || 
    q.includes('लिखो') || 
    q.includes('बनाओ') || 
    q.includes('banao')
  ) {
    if (isEnglish) {
      return {
        response: `Here is a sample handcrafted B2B product description draft:\n\n"Handcrafted Pure Katan Silk Banarasi Saree with Intricate Gold Zari Kadwa Boota. Woven by Master Artisans in Varanasi on traditional pit looms over 12 days. Certified authentic GI craft with exquisite drape and heritage craftsmanship."`,
        intent: 'GENERATE_DESCRIPTION',
        action: { type: 'NAVIGATE', route: '/add-product', label: 'Use in Add Product' },
        data: null,
        isDemoMode: true
      };
    }
    return {
      response: `यहाँ आपके उत्पाद के लिए B2B विवरण का प्रारूप है:\n\n"पारंपरिक हथकरघे पर 12 दिनों के गहन श्रम से तैयार शुद्ध कतान सिल्क बनारसी साड़ी। वाराणसी के मास्टर कारीगरों द्वारा हस्तनिर्मित जटिल स्वर्ण ज़री कड़वा बूटा बुनाई। भारत सरकार द्वारा प्रमाणित जीआई हस्तशिल्प।"\n\nक्या आप इसे नए उत्पाद में उपयोग करना चाहते हैं?`,
      intent: 'GENERATE_DESCRIPTION',
      action: { type: 'NAVIGATE', route: '/add-product', label: 'नया उत्पाद में उपयोग करें (Add Product)' },
      data: null,
      isDemoMode: true
    };
  }

  // 11. Image Studio / फोटो सुधारो
  if (
    q.includes('photo') || 
    q.includes('फोटो') || 
    q.includes('image') || 
    q.includes('studio') || 
    q.includes('स्टूडियो') || 
    q.includes('background')
  ) {
    if (isEnglish) {
      return {
        response: "Opening AI Product Studio. You can automatically remove raw workshop backgrounds, add studio backdrops, and verify craftsmanship authenticity.",
        intent: 'IMPROVE_PRODUCT_IMAGE',
        action: { type: 'NAVIGATE', route: '/studio', label: 'Open AI Studio' },
        data: null,
        isDemoMode: true
      };
    }
    return {
      response: "मैं AI उत्पाद स्टूडियो खोल रहा हूँ। यहाँ आप अपनी कच्ची फोटो का बैकग्राउंड हटाकर स्टूडियो जैसा बैकड्रॉप लगा सकते हैं।",
      intent: 'IMPROVE_PRODUCT_IMAGE',
      action: { type: 'NAVIGATE', route: '/studio', label: 'AI स्टूडियो खोलें (Open Studio)' },
      data: null,
      isDemoMode: true
    };
  }

  // 12. Ecosystem & Artisans Overview / कितने कारीगर / इकोसिस्टम
  if (
    q.includes('ecosystem') || 
    q.includes('इकोसिस्टम') || 
    q.includes('all artisan') || 
    q.includes('saare karigar') || 
    q.includes('सारे कारीगर') || 
    q.includes('total artisan') || 
    q.includes('states') || 
    q.includes('राज्य')
  ) {
    if (isEnglish) {
      return {
        response: `The KarigarSetu platform represents a verified pan-India artisan ecosystem spanning 52 master artisans across 26 states/UTs, 108 handcrafted products across 32 GI heritage crafts, 32 verified B2B buyers across 21 cities, and 382 compatibility matches with ₹24.8L platform GMV.`,
        intent: 'SHOW_PROFILE',
        action: { type: 'NAVIGATE', route: '/buyer-marketplace', label: 'Explore 108 Products' },
        data: null,
        isDemoMode: true
      };
    }
    return {
      response: `कारीगरसेतु मंच पूरे भारत के हस्तशिल्प इकोसिस्टम को जोड़ता है:\n\n• 52 सत्यापित मास्टर कारीगर (26 राज्यों व केंद्र शासित प्रदेशों से)\n• 108 हस्तनिर्मित उत्पाद (32 जीआई पंजीकृत शिल्प शैलियाँ)\n• 32 सत्यापित B2B थोक खरीदार (21 वाणिज्यिक शहर)\n• 382 अनुकूलता मैच एवं ₹24.8 लाख मंच व्यापार (GMV)।`,
      intent: 'SHOW_PROFILE',
      action: { type: 'NAVIGATE', route: '/buyer-marketplace', label: '108 उत्पाद देखें (Explore Marketplace)' },
      data: null,
      isDemoMode: true
    };
  }

  // 13. SIH Demo Scenarios / परिदृश्य
  if (
    q.includes('scenario') || 
    q.includes('scenarios') || 
    q.includes('sih') || 
    q.includes('demo') || 
    q.includes('हैकथॉन')
  ) {
    if (isEnglish) {
      return {
        response: `We have 8 curated SIH presentation scenarios demonstrating sample orders, volume tier floor protection, cluster aggregation, phased deliveries, and GI certification assurance across Madhubani, Dokra, Sambalpuri, Banarasi, Walnut Wood, Blue Pottery, Bastar Iron, and Muga Silk.`,
        intent: 'SHOW_PROFILE',
        action: { type: 'NAVIGATE', route: '/market-match', label: 'View 382 Market Matches' },
        data: null,
        isDemoMode: true
      };
    }
    return {
      response: `स्मार्ट इंडिया हैकथॉन (SIH 2026) के लिए हमारे पास 8 विशेष परिदृश्य (Presentation Scenarios) हैं:\n\n1. मधुबनी पेंटिंग (नमूना परीक्षण)\n2. ढोकरा शिल्प (लागत संरक्षण)\n3. संबलपुरी इकत (लक्जरी निर्यात)\n4. बनारसी ज़री (संग्रहालय उपहार)\n5. कश्मीरी अखरोट लकड़ी (प्रीमियम शिल्प)\n6. ब्लू पॉटरी (क्रमिक आपूर्ति)\n7. बस्तर लौह शिल्प (SHG क्लस्टर)\n8. असम मूंगा सिल्क (जीआई टैग प्रामाणिकता)।`,
      intent: 'SHOW_PROFILE',
      action: { type: 'NAVIGATE', route: '/market-match', label: '382 मार्केट मैच देखें (Open Market Match)' },
      data: null,
      isDemoMode: true
    };
  }

  // General Fallback
  if (isEnglish) {
    return {
      response: `I am Karigar Saathi, your AI Business Assistant. You can ask me about your profit, active products, B2B wholesale buyers, product pricing, or say "Open Analytics" or "Add New Product". How can I assist your business today?`,
      intent: 'GENERAL_ASSISTANCE',
      action: null,
      data: null,
      isDemoMode: true
    };
  }
  return {
    response: `नमस्ते! मैं कारीगर साथी हूँ। आप मुझसे अपने मुनाफ़े, सक्रिय उत्पादों, B2B खरीदारों, साड़ी की सही कीमत, या 'नया उत्पाद जोड़ना है' के बारे में पूछ सकते हैं। मैं आपकी क्या मदद करूँ?`,
    intent: 'GENERAL_ASSISTANCE',
    action: null,
    data: null,
    isDemoMode: true
  };
}

/**
 * Main handler for assistant queries
 */
export async function handleAssistantMessage(params: {
  message: string;
  language?: string;
  userId?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}): Promise<AssistantResponse> {
  const { message, language = 'hi', conversationHistory = [] } = params;
  const isEnglish = language === 'en' || /^[a-zA-Z0-9\s.,?!'"-]*$/.test(message) && (message.toLowerCase().includes('what') || message.toLowerCase().includes('how') || message.toLowerCase().includes('show') || message.toLowerCase().includes('my'));

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const businessContext = getBusinessContext();
      const prompt = `ARTISAN BUSINESS DATABASE CONTEXT:
${JSON.stringify(businessContext, null, 2)}

CONVERSATION HISTORY:
${JSON.stringify(conversationHistory.slice(-4), null, 2)}

USER'S INCOMING MESSAGE:
"${message}"

Language preference: ${language === 'hi' ? 'Hindi / Devanagari' : 'English / Hinglish'}.
Respond in STRICT JSON with fields: response, intent, action, data.`;

      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      if (text.startsWith('```json')) text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      else if (text.startsWith('```')) text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');

      const parsed = JSON.parse(text);
      return {
        response: parsed.response || "मैं आपकी क्या मदद कर सकती हूँ?",
        intent: parsed.intent || "GENERAL_ASSISTANCE",
        action: parsed.action || null,
        data: parsed.data || null,
        isDemoMode: false
      };
    } catch (err: any) {
      console.warn('[Assistant] Gemini call encountered error, gracefully switching to intelligent local NLU:', err.message);
    }
  }

  // Fallback to intelligent local NLU engine connected directly to live store data
  return handleLocalNlu(message, isEnglish);
}
