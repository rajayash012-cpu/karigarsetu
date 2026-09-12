import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Info, 
  Upload, 
  FileCode2, 
  Copy, 
  Check, 
  Loader2, 
  Calculator, 
  Sliders, 
  Palette, 
  AlertTriangle, 
  Sparkles, 
  Award, 
  Scale, 
  Save, 
  Volume2, 
  VolumeX, 
  Layers, 
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Package
} from 'lucide-react';
import { 
  analyzePricingImage, 
  calculateDetailedPricing, 
  explainPricing, 
  savePriceRecommendation 
} from '@/lib/api';
import { BackButton } from '@/components/BackButton';
import { useApp } from '@/context/AppContext';

export default function Pricing() {
  const { state } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to detect default craft key from active artisan
  const getDefaultCraftKey = (): 'madhubani' | 'dokra' | 'walnut' | 'brass' | 'banarasi' => {
    const c = (state.artisan?.craft || '').toLowerCase();
    if (c.includes('madhubani') || c.includes('mithila')) return 'madhubani';
    if (c.includes('dokra') || c.includes('dhokra')) return 'dokra';
    if (c.includes('walnut') || c.includes('wood')) return 'walnut';
    if (c.includes('brass') || c.includes('metal') || c.includes('diya')) return 'brass';
    if (c.includes('banarasi') || c.includes('silk') || c.includes('weav') || c.includes('saree')) return 'banarasi';
    return 'madhubani';
  };

  // Flow Step: 1 = Upload, 2 = Analysis & Costs, 3 = Pricing Result & Explanation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Image & Backdrop
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedBackdrop, setSelectedBackdrop] = useState<'dark_slate' | 'clean_white'>('dark_slate');

  // AI Vision Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [attributes, setAttributes] = useState<any>({
    product_category: "Paintings & Folk Art",
    craft_type: "Madhubani Painting",
    technique: "Nib & bamboo reed Kachni linework",
    material: "Handmade paper and natural pigments",
    pattern_complexity: 4,
    detail_level: 5,
    finish_quality: 4,
    handmade_indicators: true,
    design_complexity: 4,
    workmanship_level: "High",
    visual_confidence: 0.90,
    observations: [
      "Double-line Kachni geometric border outlining the central motif",
      "Dense flora-fauna filler elements characteristic of Mithila region",
      "Organic natural pigment gradients indicating hand extraction"
    ]
  });
  const [showEditAttributes, setShowEditAttributes] = useState(false);
  const [resolvedDisagreements, setResolvedDisagreements] = useState<Record<string, string>>({});

  // Cost & B2B Parameters State
  const [materialCost, setMaterialCost] = useState<number>(350);
  const [labourHours, setLabourHours] = useState<number>(12);
  const [labourRate, setLabourRate] = useState<number>(150);
  const [packagingCost, setPackagingCost] = useState<number>(90);
  const [transportCost, setTransportCost] = useState<number>(80);
  const [otherCost, setOtherCost] = useState<number>(50);
  const [quantity, setQuantity] = useState<number>(10);
  const [minimumAcceptablePrice, setMinimumAcceptablePrice] = useState<number>(2500);
  const [targetMargin, setTargetMargin] = useState<number>(30); // in percent
  const [buyerType, setBuyerType] = useState<string>('wholesale_distributor');
  const [season, setSeason] = useState<string>('normal');

  // Calculation Result & Market Comparables
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculation, setCalculation] = useState<any>(null);
  const [marketBenchmark, setMarketBenchmark] = useState<any>(null);

  // AI Explanation State
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<any>(null);
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Final Price Override & Saving State
  const [editableFinalPrice, setEditableFinalPrice] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // JSON Inspector
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial load: trigger craft sample matching active artisan
  useEffect(() => {
    selectCraftSample(getDefaultCraftKey());
  }, [state.artisan?.id]);

  // Handle Image Upload & Trigger AI Vision
  const handleImageUpload = async (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await analyzePricingImage(file);
      if (res.success) {
        setAnalysisResult(res);
        setAttributes(res.attributes);
        setCurrentStep(2);
        // Automatically re-run calculation with AI attributes
        await runCalculation(res.attributes);
      } else {
        throw new Error(res.message || "Failed to analyze image");
      }
    } catch (err: any) {
      console.error("Image analysis error:", err);
      setErrorMessage(err.message || "Could not analyze image. Loaded default artisan sample.");
      setCurrentStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run Deterministic Calculation on Backend
  const runCalculation = async (activeAttributes = attributes, costOverrides?: any) => {
    setIsCalculating(true);
    setErrorMessage(null);

    try {
      const res = await calculateDetailedPricing({
        materialCost: costOverrides?.materialCost !== undefined ? Number(costOverrides.materialCost) : materialCost,
        labourHours: costOverrides?.labourHours !== undefined ? Number(costOverrides.labourHours) : labourHours,
        labourRate: costOverrides?.labourRate !== undefined ? Number(costOverrides.labourRate) : labourRate,
        packagingCost: costOverrides?.packagingCost !== undefined ? Number(costOverrides.packagingCost) : packagingCost,
        transportCost: costOverrides?.transportCost !== undefined ? Number(costOverrides.transportCost) : transportCost,
        otherCost: costOverrides?.otherCost !== undefined ? Number(costOverrides.otherCost) : otherCost,
        quantity,
        minimumAcceptablePrice: costOverrides?.minPrice !== undefined ? Number(costOverrides.minPrice) : minimumAcceptablePrice,
        targetMargin: (costOverrides?.targetMargin !== undefined ? Number(costOverrides.targetMargin) : targetMargin) / 100,
        buyerType,
        season,
        attributes: activeAttributes
      });

      if (res.success) {
        setCalculation(res.calculation);
        setMarketBenchmark(res.market);
        setEditableFinalPrice(res.calculation.recommendation.suggestedPrice);

        // Fetch AI Explanation in parallel
        triggerExplanation(res.calculation, activeAttributes, res.market);
      }
    } catch (err: any) {
      console.error("Pricing calculation error:", err);
      setErrorMessage(err.message || "Failed to calculate deterministic price.");
    } finally {
      setIsCalculating(false);
    }
  };

  // Fetch AI Explanation
  const triggerExplanation = async (calc: any, attr: any, market: any) => {
    setIsExplaining(true);
    try {
      const res = await explainPricing(calc, attr, market);
      if (res.success) {
        setExplanation(res);
      }
    } catch (err) {
      console.warn("Could not fetch AI explanation:", err);
    } finally {
      setIsExplaining(false);
    }
  };

  // Save Final Price Recommendation
  const handleSaveRecommendation = async () => {
    if (!calculation) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await savePriceRecommendation({
        productId: 'p1',
        materialCost,
        labourHours,
        labourRate,
        packagingCost,
        transportCost,
        otherCost,
        totalCost: calculation.costBreakdown.totalCost,
        quantity,
        buyerType,
        marketLow: marketBenchmark?.priceRange?.low || 0,
        marketHigh: marketBenchmark?.priceRange?.high || 0,
        recommendedLow: calculation.recommendation.minimumPrice,
        recommendedHigh: calculation.recommendation.maximumPrice,
        suggestedPrice: editableFinalPrice,
        minimumAcceptablePrice,
        aiVisualAttributes: attributes,
        aiConfidence: analysisResult?.confidence || attributes.visual_confidence || 0.88,
        pricingFactors: calculation.multipliersApplied,
        formulaVersion: calculation.formulaVersion
      });

      if (res.success) {
        setSaveSuccess(true);
        // Also update local storage for catalog synchronization
        const stored = localStorage.getItem('processedProduct');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            parsed.pricing = {
              ...parsed.pricing,
              finalPrice: editableFinalPrice,
              bulkPrice: Math.round(editableFinalPrice * 0.9),
              festivalPrice: Math.round(editableFinalPrice * 1.15)
            };
            localStorage.setItem('processedProduct', JSON.stringify(parsed));
          } catch (e) {}
        }

        setTimeout(() => {
          setSaveSuccess(false);
          navigate('/catalog');
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save price recommendation.");
    } finally {
      setIsSaving(false);
    }
  };

  // Audio Speech Synthesis Toggle
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window) || !explanation) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = lang === 'hi' 
      ? explanation.explanationHi 
      : explanation.explanationEn;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const selectCraftSample = (craft: 'dokra' | 'madhubani' | 'walnut' | 'banarasi') => {
    let preset: any = {};
    if (craft === 'dokra') {
      preset = {
        materialCost: 420,
        labourHours: 6,
        labourRate: 220,
        packagingCost: 70,
        transportCost: 60,
        otherCost: 40,
        minPrice: 2000,
        targetMargin: 30,
        imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
        attrs: {
          product_category: "Metal Handicrafts",
          craft_type: "Dokra",
          technique: "Lost-wax casting",
          material: "Dhokra metal",
          pattern_complexity: 4,
          detail_level: 4,
          finish_quality: 4,
          handmade_indicators: true,
          design_complexity: 4,
          workmanship_level: "High",
          visual_confidence: 0.88,
          observations: [
            "Authentic beeswax coil filigree pattern across ears and trunk",
            "Earthen mould seam markings characteristic of ancient lost-wax casting",
            "Genuine solid bell metal weight and tactile artisan texture"
          ]
        }
      };
    } else if (craft === 'madhubani') {
      preset = {
        materialCost: 350,
        labourHours: 12,
        labourRate: 150,
        packagingCost: 90,
        transportCost: 80,
        otherCost: 50,
        minPrice: 2500,
        targetMargin: 30,
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        attrs: {
          product_category: "Paintings & Folk Art",
          craft_type: "Madhubani Painting",
          technique: "Nib & bamboo reed Kachni linework",
          material: "Handmade paper and canvas",
          pattern_complexity: 4,
          detail_level: 5,
          finish_quality: 4,
          handmade_indicators: true,
          design_complexity: 4,
          workmanship_level: "High",
          visual_confidence: 0.90,
          observations: [
            "Double-line Kachni geometric border outlining the central motif",
            "Dense flora-fauna filler elements characteristic of Mithila region",
            "Organic natural pigment gradients indicating hand extraction"
          ]
        }
      };
    } else if (craft === 'walnut') {
      preset = {
        materialCost: 900,
        labourHours: 16,
        labourRate: 260,
        packagingCost: 180,
        transportCost: 150,
        otherCost: 90,
        minPrice: 3200,
        targetMargin: 32,
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        attrs: {
          product_category: "Woodcraft & Furniture",
          craft_type: "Walnut Wood Carving",
          technique: "Deep relief hand chiseling",
          material: "Seasoned Kashmiri Walnut Wood",
          pattern_complexity: 4,
          detail_level: 5,
          finish_quality: 5,
          handmade_indicators: true,
          design_complexity: 5,
          workmanship_level: "Master",
          visual_confidence: 0.92,
          observations: [
            "Multi-tiered Chinar leaf relief work carved from single block",
            "Velvet-smooth beeswax hand buffing with natural wood grain highlights",
            "Subtle hand-tool gouge marks visible on interior undercuts"
          ]
        }
      };
    } else if (craft === 'brass') {
      preset = {
        materialCost: 650,
        labourHours: 14,
        labourRate: 180,
        packagingCost: 120,
        transportCost: 90,
        otherCost: 60,
        minPrice: 3000,
        targetMargin: 32,
        imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
        attrs: {
          product_category: "Metal Handicrafts",
          craft_type: "Brass Handicraft",
          technique: "Sand casting & hand engraving",
          material: "Solid Brass Alloy",
          pattern_complexity: 4,
          detail_level: 5,
          finish_quality: 5,
          handmade_indicators: true,
          design_complexity: 4,
          workmanship_level: "High",
          visual_confidence: 0.91,
          observations: [
            "Hand-chiseled floral and peacock relief on heavy brass casting",
            "Natural antique hand patina with protective clear lacquering",
            "Solid non-magnetic virgin brass composition"
          ]
        }
      };
    } else {
      preset = {
        materialCost: 4200,
        labourHours: 96,
        labourRate: 150,
        packagingCost: 150,
        transportCost: 200,
        otherCost: 100,
        minPrice: 20000,
        targetMargin: 30,
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        attrs: {
          product_category: "Heritage Handloom Textile",
          craft_type: "Banarasi Kadwa Weaving",
          technique: "Traditional Pit-loom Kadwa Zari Weaving",
          material: "Pure Katan Silk with Fine Gold & Silver Zari",
          pattern_complexity: 4,
          detail_level: 5,
          finish_quality: 4,
          handmade_indicators: true,
          design_complexity: 4,
          workmanship_level: "High",
          visual_confidence: 0.88,
          observations: [
            "Dense Kadwa floral boota hand-interspersed across weft",
            "Handloom selvage markings confirm pit-loom origin",
            "Genuine dual-tone gold and silver zari threadwork"
          ]
        }
      };
    }

    setMaterialCost(preset.materialCost);
    setLabourHours(preset.labourHours);
    setLabourRate(preset.labourRate);
    setPackagingCost(preset.packagingCost);
    setTransportCost(preset.transportCost);
    setOtherCost(preset.otherCost);
    setMinimumAcceptablePrice(preset.minPrice);
    setTargetMargin(preset.targetMargin);
    setPreviewUrl(preset.imageUrl);
    setAttributes(preset.attrs);
    setAnalysisResult({
      provider: 'demo',
      attributes: preset.attrs,
      confidence: preset.attrs.visual_confidence,
      isDemoMode: true
    });
    setCurrentStep(2);
    runCalculation(preset.attrs, preset);
  };

  const loadSampleData = async () => {
    selectCraftSample(getDefaultCraftKey());
  };

  const handleCopyJson = () => {
    if (calculation) {
      navigator.clipboard.writeText(JSON.stringify({ calculation, attributes, marketBenchmark }, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Cost Stacked Bar Calculations
  const totalCostVal = calculation?.costBreakdown?.totalCost || 1;
  const laborPct = Math.round(((calculation?.costBreakdown?.labourCost || 0) / totalCostVal) * 100);
  const materialPct = Math.round(((calculation?.costBreakdown?.materialCost || 0) / totalCostVal) * 100);
  const overheadPct = Math.max(0, 100 - laborPct - materialPct);

  return (
    <div className="min-h-screen bg-slate-50 pb-36 text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <BackButton />
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              उचित मूल्य निर्धारक
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                <Calculator className="w-3 h-3 text-indigo-600" /> Dynamic Pricing Assistant
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">
              {analysisResult && !analysisResult.isDemoMode 
                ? "Claude + OpenAI Vision & Deterministic Fair Math Engine" 
                : "Demo Vision Analysis & Deterministic Fair Math Engine"}
            </p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Error Notice */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl flex items-start gap-2.5 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
            <button onClick={() => setErrorMessage(null)} className="text-rose-500 hover:text-rose-700 font-bold">×</button>
          </div>
        )}

        {/* =======================================================
            SECTION 1: PRODUCT IMAGE UPLOAD & VISION ANALYSIS
            ======================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                1. Product Image & Vision Inspection
              </h2>
            </div>
            {analysisResult && !analysisResult.isDemoMode ? (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Claude + GPT-4o Vision
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-600" /> Demo Vision Analysis
              </span>
            )}
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            accept="image/*" 
            className="hidden" 
          />

          <div 
            onClick={() => !isAnalyzing && fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <div className="flex flex-col items-center gap-2 text-xs text-indigo-600 font-semibold py-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>
                  {analysisResult && !analysisResult.isDemoMode 
                    ? "Sending to Claude 3.5 & GPT-4o Vision..." 
                    : "Processing Demo Vision Analysis..."}
                </span>
              </div>
            ) : previewUrl ? (
              <div className="flex items-center gap-3 w-full">
                <img src={previewUrl} alt="Product" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                <div className="text-left flex-1">
                  <div className="text-xs font-bold text-slate-800">Product Photo Uploaded</div>
                  <div className="text-[11px] text-slate-500">Click to upload another photo for re-inspection</div>
                </div>
                <span className="text-xs font-semibold text-indigo-600 hover:underline">Change</span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-indigo-500" />
                <span className="text-xs font-semibold text-slate-700">
                  {analysisResult && !analysisResult.isDemoMode 
                    ? "Upload / Take photo for Claude & OpenAI Vision Assessment" 
                    : "Upload / Take photo for Demo Vision Analysis"}
                </span>
                <span className="text-[10px] text-slate-400">Supports JPEG, PNG, WebP up to 15MB</span>
              </>
            )}
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-700 block">Quick Demo Craft Presets (SIH Judges):</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              <button 
                type="button"
                disabled={isAnalyzing}
                onClick={() => selectCraftSample('dokra')}
                className="px-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-[11px] font-semibold transition-colors text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>🐘</span>
                <span className="truncate">Dokra Metal</span>
              </button>
              <button 
                type="button"
                disabled={isAnalyzing}
                onClick={() => selectCraftSample('madhubani')}
                className="px-2 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 rounded-lg text-[11px] font-semibold transition-colors text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>🎨</span>
                <span className="truncate">Madhubani Art</span>
              </button>
              <button 
                type="button"
                disabled={isAnalyzing}
                onClick={() => selectCraftSample('brass')}
                className="px-2 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-900 border border-yellow-200 rounded-lg text-[11px] font-semibold transition-colors text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>🪔</span>
                <span className="truncate">Brass Craft</span>
              </button>
              <button 
                type="button"
                disabled={isAnalyzing}
                onClick={() => selectCraftSample('walnut')}
                className="px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-[11px] font-semibold transition-colors text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>🪵</span>
                <span className="truncate">Walnut Wood</span>
              </button>
              <button 
                type="button"
                disabled={isAnalyzing}
                onClick={() => selectCraftSample('banarasi')}
                className="px-2 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-lg text-[11px] font-semibold transition-colors text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>🥻</span>
                <span className="truncate">Banarasi Silk</span>
              </button>
            </div>
          </div>
        </div>

        {/* =======================================================
            SECTION 2: AI VISUAL ASSESSMENT & ATTRIBUTE CONFIRMATION
            ======================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                2. {analysisResult && !analysisResult.isDemoMode ? "AI Visual Assessment" : "Demo Vision Analysis"} (शिल्प मूल्यांकन)
              </h3>
            </div>
            <button
              onClick={() => setShowEditAttributes(!showEditAttributes)}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              {showEditAttributes ? "Done Editing" : "Confirm / Edit"}
            </button>
          </div>

          {/* Disagreement Resolution Card */}
          {analysisResult?.disagreements && analysisResult.disagreements.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Model Disagreement Detected (Claude vs OpenAI)</span>
              </div>
              <p className="text-[11px] text-amber-800">
                The models identified differing attributes. Please select the correct attribute for your handcrafted item:
              </p>
              {analysisResult.disagreements.map((dis: any, idx: number) => (
                <div key={idx} className="bg-white p-2.5 rounded-lg border border-amber-200 space-y-1.5">
                  <div className="font-semibold text-slate-800 capitalize">{dis.field.replace('_', ' ')}:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...attributes, [dis.field]: dis.claudeValue };
                        setAttributes(updated);
                        setResolvedDisagreements({ ...resolvedDisagreements, [dis.field]: dis.claudeValue });
                        runCalculation(updated);
                      }}
                      className={`p-2 rounded border text-left cursor-pointer transition-all ${
                        attributes[dis.field] === dis.claudeValue 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[9px] block text-slate-400 font-normal">Claude 3.5:</span>
                      {dis.claudeValue}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...attributes, [dis.field]: dis.openAiValue };
                        setAttributes(updated);
                        setResolvedDisagreements({ ...resolvedDisagreements, [dis.field]: dis.openAiValue });
                        runCalculation(updated);
                      }}
                      className={`p-2 rounded border text-left cursor-pointer transition-all ${
                        attributes[dis.field] === dis.openAiValue 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[9px] block text-slate-400 font-normal">OpenAI GPT-4o:</span>
                      {dis.openAiValue}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visual Assessment Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Craft Type</span>
              <span className="font-bold text-slate-900">{attributes.craft_type}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Material</span>
              <span className="font-bold text-slate-900">{attributes.material}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Complexity</span>
              <span className="font-bold text-indigo-600">{attributes.pattern_complexity}/5 (Score)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Confidence</span>
              <span className="font-bold text-emerald-600">
                {Math.round((attributes.visual_confidence || 0.88) * 100)}%
              </span>
            </div>
          </div>

          {/* Editable Attributes Accordion */}
          {showEditAttributes && (
            <div className="bg-slate-50 p-3.5 rounded-xl border border-indigo-200 space-y-3 animate-in fade-in text-xs">
              <div className="font-bold text-slate-800">कारीगर द्वारा सुधार (Artisan Attribute Correction)</div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Craft Type</label>
                  <input 
                    type="text" 
                    value={attributes.craft_type}
                    onChange={(e) => {
                      const updated = { ...attributes, craft_type: e.target.value };
                      setAttributes(updated);
                      runCalculation(updated);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Material</label>
                  <input 
                    type="text" 
                    value={attributes.material}
                    onChange={(e) => {
                      const updated = { ...attributes, material: e.target.value };
                      setAttributes(updated);
                      runCalculation(updated);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Pattern Complexity (1-5)</label>
                  <select
                    value={attributes.pattern_complexity}
                    onChange={(e) => {
                      const updated = { ...attributes, pattern_complexity: Number(e.target.value) };
                      setAttributes(updated);
                      runCalculation(updated);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}/5</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Finish Quality (1-5)</label>
                  <select
                    value={attributes.finish_quality}
                    onChange={(e) => {
                      const updated = { ...attributes, finish_quality: Number(e.target.value) };
                      setAttributes(updated);
                      runCalculation(updated);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}/5</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Workmanship Level</label>
                  <select
                    value={attributes.workmanship_level}
                    onChange={(e) => {
                      const updated = { ...attributes, workmanship_level: e.target.value };
                      setAttributes(updated);
                      runCalculation(updated);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    {['Low', 'Medium', 'High', 'Master'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =======================================================
            SECTION 3: DETERMINISTIC ARTISAN COST & B2B PARAMETERS
            ======================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                3. Cost & B2B Parameters (उत्पादन लागत व थोक इनपुट)
              </h3>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              100% Deterministic Math
            </span>
          </div>

          {/* Cost Inputs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {/* Material Cost */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">कच्चा माल (Material Cost)</label>
              <div className="relative">
                <input 
                  type="number"
                  min="0"
                  step="50"
                  value={materialCost}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setMaterialCost(val);
                  }}
                  onBlur={() => runCalculation()}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold pr-8 text-slate-900"
                />
                <span className="absolute right-3 top-2 text-slate-400">₹</span>
              </div>
            </div>

            {/* Labour Hours */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">श्रम समय (Labour Hours)</label>
              <div className="relative">
                <input 
                  type="number"
                  min="1"
                  value={labourHours}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setLabourHours(val);
                  }}
                  onBlur={() => runCalculation()}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold pr-10 text-slate-900"
                />
                <span className="absolute right-3 top-2 text-slate-400">hrs</span>
              </div>
            </div>

            {/* Labour Rate */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">मजदूरी दर (Labour Rate)</label>
              <div className="relative">
                <input 
                  type="number"
                  min="50"
                  step="10"
                  value={labourRate}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setLabourRate(val);
                  }}
                  onBlur={() => runCalculation()}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold pr-12 text-slate-900"
                />
                <span className="absolute right-3 top-2 text-slate-400">₹/hr</span>
              </div>
            </div>

            {/* Packaging Cost */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">पैकेजिंग (Packaging)</label>
              <div className="relative">
                <input 
                  type="number"
                  min="0"
                  value={packagingCost}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setPackagingCost(val);
                  }}
                  onBlur={() => runCalculation()}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold pr-8 text-slate-900"
                />
                <span className="absolute right-3 top-2 text-slate-400">₹</span>
              </div>
            </div>

            {/* Transport Cost */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">परिवहन (Transport)</label>
              <div className="relative">
                <input 
                  type="number"
                  min="0"
                  value={transportCost}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setTransportCost(val);
                  }}
                  onBlur={() => runCalculation()}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold pr-8 text-slate-900"
                />
                <span className="absolute right-3 top-2 text-slate-400">₹</span>
              </div>
            </div>

            {/* Other Cost */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">अन्य खर्च (Other Cost)</label>
              <div className="relative">
                <input 
                  type="number"
                  min="0"
                  value={otherCost}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setOtherCost(val);
                  }}
                  onBlur={() => runCalculation()}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold pr-8 text-slate-900"
                />
                <span className="absolute right-3 top-2 text-slate-400">₹</span>
              </div>
            </div>
          </div>

          {/* Minimum Acceptable Price (Floor Protection) */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                न्यूनतम स्वीकार्य मूल्य (Minimum Acceptable Floor Price)
              </span>
              <span className="font-bold text-slate-900 text-sm">₹{minimumAcceptablePrice.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Discounts or volume pricing can NEVER push the price below your production cost or this threshold.
            </p>
            <input 
              type="range"
              min={materialCost + (labourHours * labourRate)}
              max={50000}
              step={500}
              value={minimumAcceptablePrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMinimumAcceptablePrice(val);
              }}
              onMouseUp={() => runCalculation()}
              onTouchEnd={() => runCalculation()}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg mt-1"
            />
          </div>

          {/* B2B Quantity Tiers */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-indigo-600" />
                B2B ऑर्डर मात्रा (Order Quantity)
              </span>
              <span className="font-bold text-indigo-600">{quantity} units</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "1–9 pcs", qty: 5, discount: "0%" },
                { label: "10–49 pcs", qty: 15, discount: "10%" },
                { label: "50–99 pcs", qty: 50, discount: "16%" },
                { label: "100+ pcs", qty: 100, discount: "22%" }
              ].map((tier, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuantity(tier.qty);
                    runCalculation();
                  }}
                  className={`py-2 px-1 text-center rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                    (tier.qty === 5 && quantity < 10) ||
                    (tier.qty === 15 && quantity >= 10 && quantity < 50) ||
                    (tier.qty === 50 && quantity >= 50 && quantity < 100) ||
                    (tier.qty === 100 && quantity >= 100)
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tier.label}
                  <span className="block text-[9px] opacity-80">{tier.discount} disc</span>
                </button>
              ))}
            </div>
          </div>

          {/* Buyer Type & Target Margin */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">खरीदार प्रकार (Buyer Type)</label>
              <select
                value={buyerType}
                onChange={(e) => {
                  setBuyerType(e.target.value);
                  runCalculation();
                }}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs text-slate-900"
              >
                <option value="wholesale_distributor">Wholesale Distributor (थोक विक्रेता)</option>
                <option value="retail_boutique">Retail Boutique (बुटीक खरीदार +5%)</option>
                <option value="export_house">Export House (विदेशी निर्यातक)</option>
                <option value="government_gem">Government GeM Portal (सरकारी खरीद)</option>
                <option value="general">General B2B Partner</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">लक्ष्य मार्जिन (Target Margin)</label>
                <span className="font-bold text-indigo-600">{targetMargin}%</span>
              </div>
              <input 
                type="range"
                min="15"
                max="50"
                step="1"
                value={targetMargin}
                onChange={(e) => {
                  setTargetMargin(Number(e.target.value));
                }}
                onMouseUp={() => runCalculation()}
                onTouchEnd={() => runCalculation()}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg mt-2"
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            SECTION 4: DETERMINISTIC PRICING RESULTS & BREAKDOWN
            ======================================================= */}
        {calculation && (
          <div className="space-y-4 animate-in fade-in">
            {/* Hero Price & Recommended Range Banner */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Deterministic Pricing Output
                </span>
                <span className="text-[11px] text-slate-400">
                  {quantity} units batch
                </span>
              </div>

              {/* Price Range & Suggested */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <div className="text-slate-400 text-xs">सुझाया गया मूल्य (Suggested B2B Price)</div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ₹{calculation.recommendation.suggestedPrice.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-400 ml-2">/ unit</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">अनुशंसित मूल्य दायरा (Recommended Range)</div>
                  <div className="text-lg font-bold text-emerald-400">
                    ₹{calculation.recommendation.minimumPrice.toLocaleString('en-IN')} – ₹{calculation.recommendation.maximumPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Floor Protection Alert */}
              {calculation.floorProtection.isFloorTriggered && (
                <div className="bg-amber-900/40 border border-amber-700/60 p-2.5 rounded-xl text-amber-200 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Floor Protection active: Price clamped to ₹{calculation.floorProtection.effectivePriceFloor.toLocaleString('en-IN')} to prevent loss.</span>
                </div>
              )}

              {/* Sanity Check Badge */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Price Sanity Verified:</strong> Suggested price covers 100% of material & labor costs with floor guarantee (Cost: ₹{calculation.costBreakdown.totalCost.toLocaleString('en-IN')}).
                </span>
              </div>

              {/* Quick Summary Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">Total Unit Cost</div>
                  <div className="font-bold text-slate-200">₹{calculation.costBreakdown.totalCost.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Effective Margin</div>
                  <div className="font-bold text-emerald-400">{calculation.marginAnalysis.effectiveMarginPercent}%</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Total Order Value</div>
                  <div className="font-bold text-indigo-300">₹{calculation.recommendation.totalOrderValue.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Visual Cost Distribution Stacked Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  लागत वितरण (Cost Distribution)
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Total Cost: ₹{calculation.costBreakdown.totalCost.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300" 
                  style={{ width: `${laborPct}%` }} 
                  title={`Labor: ${laborPct}%`}
                />
                <div 
                  className="bg-amber-500 h-full transition-all duration-300" 
                  style={{ width: `${materialPct}%` }} 
                  title={`Materials: ${materialPct}%`}
                />
                <div 
                  className="bg-slate-400 h-full transition-all duration-300" 
                  style={{ width: `${overheadPct}%` }} 
                  title={`Overhead: ${overheadPct}%`}
                />
              </div>

              <div className="flex justify-between text-[11px] pt-1 text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                  Labour: <b>₹{calculation.costBreakdown.labourCost.toLocaleString('en-IN')}</b> ({laborPct}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  Materials: <b>₹{calculation.costBreakdown.materialCost.toLocaleString('en-IN')}</b> ({materialPct}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                  Overheads: <b>₹{(calculation.costBreakdown.packagingCost + calculation.costBreakdown.transportCost + calculation.costBreakdown.otherCost).toLocaleString('en-IN')}</b>
                </span>
              </div>
            </div>

            {/* Market Comparables Benchmarking Card */}
            {marketBenchmark && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    <span>बाजार तुलना (Market Comparables)</span>
                  </div>
                  <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {marketBenchmark.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Cluster Median Benchmark</span>
                    <span className="font-bold text-slate-900 text-sm">₹{marketBenchmark.medianPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Cluster Price Range</span>
                    <span className="font-bold text-slate-900 text-sm">
                      ₹{marketBenchmark.priceRange.low.toLocaleString('en-IN')} – ₹{marketBenchmark.priceRange.high.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed">
                  Based on {marketBenchmark.sampleCount} verified handicraft benchmarks in Varanasi & Lucknow clusters. Single extreme outliers have been automatically filtered.
                </div>
              </div>
            )}

            {/* =======================================================
                SECTION 5: AI EXPLANATION & BILINGUAL AUDIO
                ======================================================= */}
            <div className="bg-white rounded-2xl border border-indigo-100 p-4 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-bold text-slate-800">
                    AI मूल्य औचित्य विवरण (Pricing Rationale)
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                    className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold transition-colors cursor-pointer"
                  >
                    {lang === 'hi' ? '🇬🇧 English' : '🇮🇳 हिन्दी'}
                  </button>
                  <button
                    onClick={toggleSpeech}
                    className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                      isSpeaking 
                        ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                        : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    {isSpeaking ? 'रुकें' : 'सुनें'}
                  </button>
                </div>
              </div>

              {isExplaining ? (
                <div className="flex items-center gap-2 text-indigo-600 py-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating comprehensive bilingual rationale...</span>
                </div>
              ) : explanation ? (
                <div className="space-y-3">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {lang === 'hi' ? explanation.explanationHi : explanation.explanationEn}
                  </p>

                  {explanation.keyDrivers && explanation.keyDrivers.length > 0 && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-800 text-[11px]">प्रमुख कारक (Key Drivers):</div>
                      <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5">
                        {explanation.keyDrivers.map((d: string, idx: number) => <li key={idx}>{d}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400">
                    Generated by {explanation.provider} based strictly on deterministic calculation.
                  </div>
                </div>
              ) : (
                <p className="text-slate-600">{calculation.explanationSummary}</p>
              )}
            </div>

            {/* Editable Final Price Input (Artisan keeps ultimate control) */}
            <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-indigo-950 block">कारीगर का अंतिम निर्णय (Your Final Price)</span>
                <span className="text-[11px] text-indigo-700">You can adjust the suggested price before applying to catalog</span>
              </div>

              <div className="relative w-full sm:w-48">
                <input 
                  type="number"
                  value={editableFinalPrice}
                  onChange={(e) => setEditableFinalPrice(Number(e.target.value) || 0)}
                  className="w-full p-2.5 bg-white border border-indigo-300 rounded-xl font-black text-indigo-950 text-base pr-8 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2.5 font-bold text-indigo-500">₹</span>
              </div>
            </div>

            {/* Collapsible JSON Inspector */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <button 
                onClick={() => setShowJson(!showJson)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-indigo-600" />
                  <span>Area 3 Pricing Audit JSON Payload</span>
                </div>
                <span className="text-[11px] font-normal text-indigo-600">
                  {showJson ? 'Hide JSON ▲' : 'Inspect JSON ▼'}
                </span>
              </button>

              {showJson && (
                <div className="p-3 bg-slate-950 text-slate-100 font-mono text-[11px] relative overflow-x-auto max-h-96">
                  <button 
                    onClick={handleCopyJson}
                    className="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-sans flex items-center gap-1 border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy JSON'}
                  </button>
                  <pre className="pr-16 leading-relaxed">
                    {JSON.stringify({ calculation, attributes, marketBenchmark }, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handleSaveRecommendation}
            disabled={isSaving || !calculation}
            className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-300" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Save className="w-4 h-4 text-indigo-400" />
            )}
            <span>
              {isSaving ? "सुरक्षित हो रहा है..." : saveSuccess ? "मूल्य सुरक्षित हो गया!" : `Save Price Recommendation (₹${editableFinalPrice.toLocaleString('en-IN')})`}
            </span>
          </button>

          <button
            onClick={() => navigate('/market-match')}
            className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-[0.99] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>खरीदार खोजें</span>
          </button>
        </div>
      </div>
    </div>
  );
}