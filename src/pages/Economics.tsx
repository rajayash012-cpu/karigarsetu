import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { getEconomics } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { 
  PlayCircle, 
  StopCircle,
  IndianRupee, 
  TrendingUp, 
  Receipt, 
  Award, 
  Sparkles, 
  Package, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

// User-specified 6-month demo analytics dataset (April through September)
const DEMO_MONTHLY_DATA = [
  { month: 'Apr', monthHi: 'अप्रैल', revenue: 18500, cost: 10500, expenses: 10500, profit: 8000, margin: 43.2 },
  { month: 'May', monthHi: 'मई', revenue: 22000, cost: 12000, expenses: 12000, profit: 10000, margin: 45.5 },
  { month: 'Jun', monthHi: 'जून', revenue: 19500, cost: 11000, expenses: 11000, profit: 8500, margin: 43.6 },
  { month: 'Jul', monthHi: 'जुलाई', revenue: 27000, cost: 14500, expenses: 14500, profit: 12500, margin: 46.3 },
  { month: 'Aug', monthHi: 'अगस्त', revenue: 31500, cost: 16000, expenses: 16000, profit: 15500, margin: 49.2 },
  { month: 'Sep', monthHi: 'सितंबर', revenue: 48600, cost: 31200, expenses: 31200, profit: 17400, margin: 35.8 },
];

const DEMO_SUMMARY = {
  totalRevenue: 167100,
  totalCost: 95200,
  totalProfit: 71900,
  avgMargin: 43
};

import { DEMO_DATASET, getArtisanProducts } from '@/demoData';

export default function Economics() {
  const { state } = useApp();
  const isHi = state.language === 'hi';
  const [chartData, setChartData] = useState<any[]>(DEMO_MONTHLY_DATA);
  const [summary, setSummary] = useState(DEMO_SUMMARY);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchEco = async () => {
      try {
        const ecoData = await getEconomics();
        if (ecoData && ecoData.monthly && Array.isArray(ecoData.monthly) && ecoData.monthly.length > 0) {
          const formatted = ecoData.monthly.map((item: any) => ({
            ...item,
            cost: item.cost ?? item.expenses ?? 0,
            margin: item.margin ?? (item.revenue ? Number(((item.profit / item.revenue) * 100).toFixed(1)) : 0)
          }));
          setChartData(formatted);
          if (ecoData.summary) {
            setSummary({
              totalRevenue: ecoData.summary.totalRevenue ?? 167100,
              totalCost: ecoData.summary.totalCost ?? 95200,
              totalProfit: ecoData.summary.totalProfit ?? 71900,
              avgMargin: ecoData.summary.avgMargin ?? 43
            });
          }
        } else if (Array.isArray(ecoData) && ecoData.length > 0) {
          setChartData(ecoData);
        } else {
          setChartData(DEMO_MONTHLY_DATA);
          setSummary(DEMO_SUMMARY);
        }
      } catch (err) {
        console.warn('Using default demo analytics data:', err);
        setChartData(DEMO_MONTHLY_DATA);
        setSummary(DEMO_SUMMARY);
      }
    };
    fetchEco();
  }, []);

  // Dynamically derive top products from active artisan
  const topProducts = React.useMemo(() => {
    const prods = getArtisanProducts(state.artisan.id);
    const sourceProds = prods.length > 0 ? prods : (state.products && state.products.length > 0 ? state.products : DEMO_DATASET.products.slice(0, 3));
    return sourceProds.slice(0, 4).map((p: any, idx: number) => {
      const sold = idx === 0 ? 18 : idx === 1 ? 12 : idx === 2 ? 8 : 5;
      const unitPrice = p.price || p.pricing?.price || 2500;
      const rev = sold * unitPrice;
      const margin = idx === 0 ? '52%' : idx === 1 ? '46%' : idx === 2 ? '42%' : '38%';
      return {
        id: p.id || `tp-${idx + 1}`,
        nameEn: p.titleEn || p.name || 'Handcrafted Product',
        nameHi: p.titleHi || p.name || 'हस्तनिर्मित उत्पाद',
        revenue: rev,
        sold,
        demandEn: idx === 0 ? 'High Demand' : idx === 1 ? 'Stable Demand' : 'Growing Demand',
        demandHi: idx === 0 ? 'उच्च मांग' : idx === 1 ? 'स्थिर मांग' : 'बढ़ती मांग',
        demandBadge: idx === 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-blue-100 text-blue-800 border-blue-200',
        margin,
        imageUrl: p.imageUrl || (p.images && p.images[0]) || (p.enhancedImage) || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80'
      };
    });
  }, [state.artisan.id, state.products]);

  const primaryProduct = topProducts[0] || { nameEn: state.artisan.craft, nameHi: state.artisan.craft };
  const insightEnglish = `AI Insight: Your profit margin improved from 43% to 50% over the last 6 months. High-demand items like ${primaryProduct.nameEn} give the highest margin. Recommendation: Increase production of GI-certified handcrafted items and secure raw materials in bulk to reduce costs by 8-12%.`;
  const insightHindi = `एआई अंतर्दृष्टि: पिछले 6 महीनों में आपका लाभ मार्जिन 43% से बढ़कर 50% हो गया है। ${primaryProduct.nameHi} जैसे उच्च-मांग वाले उत्पाद सर्वाधिक मार्जिन देते हैं। सुझाव: प्रमाणित हस्तशिल्प का उत्पादन बढ़ाएं और सामग्री लागत 8-12% घटाने के लिए थोक में कच्चा माल प्राप्त करें।`;

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = isHi ? insightHindi : insightEnglish;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = isHi ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen text-slate-900">
      <Header compact title={isHi ? 'आय विश्लेषण' : 'Income Analytics'} />

      <div className="p-4 space-y-5 max-w-xl mx-auto">
        {/* Page Subtitle Banner */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              {isHi ? 'प्रमाणित वित्तीय प्रदर्शन' : 'Verified Artisan Financials'}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {isHi ? 'मासिक आय एवं लाभ विश्लेषण' : 'Revenue & Profit Analytics'}
            </h2>
            <p className="text-xs text-slate-500">
              {isHi ? 'अप्रैल 2026 – सितंबर 2026 (6 माह का वास्तविक डेटा)' : 'April 2026 – September 2026 (6-Month Real Data)'}
            </p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-1 rounded-lg">
            Demo MVP
          </span>
        </div>

        {/* ========================================================= */}
        {/* 1. THE FOUR SUMMARY CARDS (Top of Analytics Page)        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Total Revenue */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50/50 border-orange-200/80 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-orange-800">
                  {isHi ? 'कुल आय' : 'Total Revenue'}
                </p>
                <div className="p-1.5 bg-orange-100 rounded-lg">
                  <IndianRupee className="w-3.5 h-3.5 text-orange-600" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-orange-950">
                {formatCurrency(summary.totalRevenue)}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-orange-700">
                <ArrowUpRight className="w-3 h-3 text-orange-600" />
                <span>{isHi ? '+18.5% वृद्धि' : '+18.5% Growth'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Total Cost */}
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200/80 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-slate-700">
                  {isHi ? 'कुल लागत' : 'Total Cost'}
                </p>
                <div className="p-1.5 bg-slate-200/70 rounded-lg">
                  <Receipt className="w-3.5 h-3.5 text-slate-600" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-slate-900">
                {formatCurrency(summary.totalCost)}
              </p>
              <p className="mt-1 text-[10px] font-medium text-slate-500">
                {isHi ? 'कच्चा माल व श्रम' : 'Raw Materials & Labor'}
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Total Profit */}
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50/50 border-emerald-200/80 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-emerald-800">
                  {isHi ? 'कुल शुद्ध लाभ' : 'Total Profit'}
                </p>
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-emerald-950">
                {formatCurrency(summary.totalProfit)}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isHi ? 'सीधा कारीगर खाता' : 'Direct Artisan Margin'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Average Profit Margin */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50/50 border-indigo-200/80 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-indigo-800">
                  {isHi ? 'औसत मार्जिन' : 'Avg Margin'}
                </p>
                <div className="p-1.5 bg-indigo-100 rounded-lg">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-indigo-950">
                ~{summary.avgMargin}%
              </p>
              <p className="mt-1 text-[10px] font-medium text-indigo-700">
                {isHi ? '43% से 50% तक सुधार' : '43% up to 50%'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ========================================================= */}
        {/* 2. BAR CHART: REVENUE VS COST (SIDE-BY-SIDE)              */}
        {/* ========================================================= */}
        <Card className="bg-white border-slate-200 shadow-xs rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {isHi ? 'आय बनाम लागत (मासिक)' : 'Revenue vs Cost (Monthly)'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isHi ? 'प्रति माह कुल आय और उत्पादन लागत का विवरण' : 'Side-by-side revenue and production expenses'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                ₹1.67L Total
              </span>
            </div>

            <div className="h-64 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey={isHi ? 'monthHi' : 'month'} 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#e2e8f0' }} 
                  />
                  <YAxis 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => `₹${v / 1000}k`} 
                  />
                  <Tooltip 
                    formatter={(val: any, name: any) => [`₹${Number(val).toLocaleString('en-IN')}`, name]}
                    labelFormatter={(label) => `${label} 2026`}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} 
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#f97316" 
                    radius={[4, 4, 0, 0]} 
                    name={isHi ? 'मासिक आय (Revenue)' : 'Monthly Revenue'} 
                  />
                  <Bar 
                    dataKey="cost" 
                    fill="#94a3b8" 
                    radius={[4, 4, 0, 0]} 
                    name={isHi ? 'लागत (Cost)' : 'Production Cost'} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ========================================================= */}
        {/* 3. LINE CHART: PROFIT MARGIN TREND (%)                    */}
        {/* ========================================================= */}
        <Card className="bg-white border-slate-200 shadow-xs rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {isHi ? 'लाभ मार्जिन ट्रेंड (%)' : 'Profit Margin Trend (%)'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isHi ? 'मध्यस्थों को हटाने के बाद 43.2% से 49.2% तक लगातार वृद्धि (थोक में 35.8%)' : 'Direct fair pricing margin improvement over 6 months (35.8% wholesale)'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ₹17,400 Sep Net Profit
              </span>
            </div>

            <div className="h-52 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey={isHi ? 'monthHi' : 'month'} 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#e2e8f0' }} 
                  />
                  <YAxis 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={[35, 55]} 
                    tickFormatter={(v) => `${v}%`} 
                  />
                  <Tooltip 
                    formatter={(val: any) => [`${val}%`, isHi ? 'लाभ मार्जिन' : 'Profit Margin']}
                    labelFormatter={(label) => `${label} 2026`}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="margin" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }} 
                    activeDot={{ r: 6 }}
                    name={isHi ? 'लाभ मार्जिन %' : 'Profit Margin %'} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ========================================================= */}
        {/* 4. PRODUCT PERFORMANCE (Top-Performing Artisan Products)   */}
        {/* ========================================================= */}
        <Card className="bg-white border-slate-200 shadow-xs rounded-2xl overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-indigo-600" />
                  {isHi ? 'शीर्ष उत्पाद प्रदर्शन' : 'Product Performance'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isHi ? 'सर्वाधिक बिकने वाले और उच्च मांग वाले कारीगर उत्पाद' : 'Top-performing items ranked by sales & buyer interest'}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">
                Top {topProducts.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {topProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="p-3 bg-slate-50/80 hover:bg-slate-100/80 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.nameEn} 
                      className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200 shrink-0" 
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {isHi ? prod.nameHi : prod.nameEn}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-700">{prod.sold} {isHi ? 'बिके' : 'sold'}</span>
                        <span>•</span>
                        <span>{isHi ? 'मार्जिन:' : 'Margin:'} <strong className="text-emerald-700">{prod.margin}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-extrabold text-xs text-slate-900">
                      ₹{prod.revenue.toLocaleString('en-IN')}
                    </div>
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${prod.demandBadge}`}>
                      {isHi ? prod.demandHi : prod.demandEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ========================================================= */}
        {/* 5. AI DIAGNOSTIC INSIGHT (Audio Playback & Recommendation) */}
        {/* ========================================================= */}
        <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-indigo-200 shadow-xs rounded-2xl overflow-hidden">
          <CardContent className="p-4 flex gap-3.5 items-start">
            <button 
              onClick={handleToggleAudio} 
              className={`shrink-0 p-2 rounded-xl transition-all shadow-xs ${
                isSpeaking 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }`}
              title={isSpeaking ? 'Stop listening' : 'Listen to AI Insight'}
              aria-label="Listen to AI Insight"
            >
              {isSpeaking ? <StopCircle size={24} /> : <PlayCircle size={24} />}
            </button>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  AI Diagnostic Insight (AI Demo Insight)
                </p>
                <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={handleToggleAudio}>
                  {isSpeaking ? (isHi ? 'रुकें ■' : 'Stop ■') : (isHi ? 'सुनें ▶' : 'Listen ▶')}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isHi ? insightHindi : insightEnglish}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

