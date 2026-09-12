import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  Languages, 
  CheckCircle2, 
  Clock, 
  Upload, 
  AlertTriangle, 
  FileCode2, 
  Copy, 
  Check, 
  Loader2, 
  Palette,
  Eye,
  RefreshCw,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { processProduct, ProcessedProduct } from '@/lib/api';
import { BackButton } from '@/components/BackButton';

export default function Catalog() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<ProcessedProduct | null>(null);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedBackdrop, setSelectedBackdrop] = useState<'dark_slate' | 'clean_white'>('dark_slate');

  // Loading & Pipeline states
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStage, setActiveStage] = useState<'idle' | 'enhancing' | 'analyzing' | 'pricing'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // JSON viewer toggle & copy state
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('processedProduct');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setData(parsed);
        setTitle(parsed.analysis.title);
        setDesc(parsed.analysis.description);
      } catch (e) {
        console.error('Error loading stored product:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setTitle(lang === 'en' ? data.analysis.title : data.analysis.titleHi);
      setDesc(lang === 'en' ? data.analysis.description : data.analysis.descriptionHi);
    }
  }, [lang, data]);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setUploadError(null);
    setActiveStage('enhancing');

    // Visual progression of stages while the server-side pipeline executes
    const stage1Timer = setTimeout(() => {
      setActiveStage('analyzing');
    }, 1800);

    const stage2Timer = setTimeout(() => {
      setActiveStage('pricing');
    }, 3600);

    try {
      const result = await processProduct(file, 'Authentic artisan submission', selectedBackdrop);
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      setActiveStage('idle');
      setIsProcessing(false);

      setData(result);
      setTitle(result.analysis.title);
      setDesc(result.analysis.description);
      localStorage.setItem('processedProduct', JSON.stringify(result));
    } catch (err: any) {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      setIsProcessing(false);
      setActiveStage('idle');
      setUploadError(err.message || 'Failed to process product image');
    }
  };

  const loadSample = async (type: 'authentic' | 'counterfeit') => {
    try {
      setIsProcessing(true);
      setActiveStage('enhancing');
      
      const url = type === 'authentic' 
        ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';

      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], `${type}_sample.jpg`, { type: 'image/jpeg' });
      
      await handleFileUpload(file);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
      setActiveStage('idle');
    }
  };

  const handleCopyJson = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3.5 sticky top-0 z-20 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <BackButton />
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              स्मार्ट कैटलॉग
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-600" /> B2B Multimodal
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Upload & Re-processing Action Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              Upload & Multi-Modal Processing
            </h2>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <Palette className="w-3.5 h-3.5 text-slate-500 ml-1" />
              <button 
                onClick={() => setSelectedBackdrop('dark_slate')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${selectedBackdrop === 'dark_slate' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
              >
                Dark Slate
              </button>
              <button 
                onClick={() => setSelectedBackdrop('clean_white')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${selectedBackdrop === 'clean_white' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Clean White
              </button>
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept="image/*" 
            className="hidden" 
          />

          <div 
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
          >
            <Upload className="w-6 h-6 text-indigo-500" />
            <p className="text-xs font-semibold text-slate-700">
              Drop an artisan product photo here, or <span className="text-indigo-600 underline">browse</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Supports JPEG, PNG, WebP (Automatic background removal & Gemini vision)
            </p>
          </div>

          {/* Quick Demo Buttons */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="text-[11px]">Quick Test:</span>
            <div className="flex gap-2">
              <button 
                disabled={isProcessing}
                onClick={() => loadSample('authentic')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-medium transition-colors"
              >
                Sample Handloom Saree
              </button>
              <button 
                disabled={isProcessing}
                onClick={() => loadSample('counterfeit')}
                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md text-[11px] font-medium transition-colors"
              >
                Sample Machine Item
              </button>
            </div>
          </div>
        </div>

        {/* Loading Stepper (Enhancing -> Analyzing -> Pricing) */}
        {isProcessing && (
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-indigo-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Executing Full-Stack Multimodal Pipeline
              </h3>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                Live Backend
              </span>
            </div>

            <div className="space-y-3">
              {/* Stage 1: Enhancing */}
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  activeStage === 'enhancing' 
                    ? 'bg-indigo-500 text-white animate-pulse' 
                    : activeStage === 'analyzing' || activeStage === 'pricing'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                }`}>
                  {activeStage === 'analyzing' || activeStage === 'pricing' ? <Check className="w-3.5 h-3.5" /> : '1'}
                </div>
                <div className="text-xs">
                  <div className={`font-semibold ${activeStage === 'enhancing' ? 'text-indigo-300' : 'text-slate-300'}`}>
                    Area 1: Cinematic Image Enhancement
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Stripping raw background (Photoroom / Cloudinary API) & applying studio backdrop
                  </div>
                </div>
              </div>

              {/* Stage 2: Analyzing */}
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  activeStage === 'analyzing' 
                    ? 'bg-indigo-500 text-white animate-pulse' 
                    : activeStage === 'pricing'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                }`}>
                  {activeStage === 'pricing' ? <Check className="w-3.5 h-3.5" /> : '2'}
                </div>
                <div className="text-xs">
                  <div className={`font-semibold ${activeStage === 'analyzing' ? 'text-indigo-300' : 'text-slate-300'}`}>
                    Area 2: Gemini Vision Master Authenticity
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Checking injection molding/symmetry & generating B2B craft cataloging specs
                  </div>
                </div>
              </div>

              {/* Stage 3: Pricing */}
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  activeStage === 'pricing' 
                    ? 'bg-indigo-500 text-white animate-pulse' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  3
                </div>
                <div className="text-xs">
                  <div className={`font-semibold ${activeStage === 'pricing' ? 'text-indigo-300' : 'text-slate-300'}`}>
                    Area 3: Deterministic Dynamic Pricing
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Calculating (Estimated Hours × Wage) + Materials + 30% B2B margin
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-start gap-3 text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <div className="font-bold">Pipeline Error</div>
              <div className="mt-0.5 text-rose-700">{uploadError}</div>
            </div>
          </div>
        )}

        {/* Authenticity Gate Status Banner */}
        {data && data.status === 'rejected' && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center shrink-0 text-rose-600">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-rose-900">
                  Authenticity Verification Failed
                </h3>
                <p className="text-xs text-rose-700 leading-relaxed">
                  {data.reason || data.analysis.rejection_reason || 'Product rejected: Factory mass-production or 3D printing layers detected.'}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-1 bg-rose-200/60 text-rose-900 font-semibold rounded text-[11px]">
                    Area 2 Gate: Rejected by Master Authenticator
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {data && data.status === 'success' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  Artisan Handcraft Verified 
                  <span className="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-0.2 rounded-full font-semibold">
                    GI Standard
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700">
                  {data.analysis.craftCategory} • Handcraft Signatures Confirmed
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-600">Labor Score</div>
              <div className="text-sm font-black text-emerald-900">{data.analysis.laborComplexity}/10</div>
            </div>
          </div>
        )}

        {/* Render Product & Enhancement */}
        {data && (
          <>
            {/* Cinematic Image & Title Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="relative aspect-4/3 bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src={data.enhancement.enhancedUrl} 
                  alt={data.analysis.title} 
                  className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105" 
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide border border-white/10">
                  Studio Cinematic Backdrop
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                  Area 1 Enhanced
                </div>
              </div>

              {/* Improvements Applied Pill List */}
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
                {data.enhancement.improvements.map((imp, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {imp}
                  </span>
                ))}
              </div>

              {/* Editable Product Title */}
              <div className="p-4 space-y-2">
                <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  {data.analysis.craftCategory}
                </div>
                <textarea 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full font-bold text-base text-slate-900 bg-transparent border-none p-0 focus:ring-0 resize-none h-14 leading-snug"
                />
              </div>
            </div>

            {/* Editable Description */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>{lang === 'en' ? 'B2B Catalog Description' : 'उत्पाद विवरण'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Editable by Artisan</span>
              </div>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                className="w-full h-28 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none leading-relaxed"
              />
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Estimated Labor Hours
                </span>
                <span className="text-base font-bold text-slate-900">
                  {data.analysis.estimatedLaborHours} <span className="text-xs font-normal text-slate-500">hours</span>
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-medium mb-0.5 block">
                  Visual Labor Complexity
                </span>
                <span className="text-base font-bold text-slate-900">
                  {data.analysis.laborComplexity} <span className="text-xs font-normal text-slate-500">/ 10</span>
                </span>
              </div>
            </div>

            {/* Detailed Spec Sheet */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100 text-xs">
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500 font-medium">Materials</span>
                <span className="w-2/3 text-slate-900 font-semibold">{data.analysis.materials}</span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500 font-medium">Estimated Dimensions</span>
                <span className="w-2/3 text-slate-900 font-semibold">{data.analysis.dimensions}</span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500 font-medium">Wash & Care</span>
                <span className="w-2/3 text-slate-900 font-semibold">{data.analysis.washCare}</span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500 font-medium">GI / Origin Cluster</span>
                <span className="w-2/3 text-slate-900 font-semibold">{data.analysis.region}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {data.analysis.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-[11px] font-medium rounded-full shadow-xs">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Collapsible Raw JSON Payload Inspector */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <button 
                onClick={() => setShowJson(!showJson)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-indigo-600" />
                  <span>Final API JSON Payload (Area 1, 2, 3)</span>
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
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/pricing')}
          disabled={!data || data.status === 'rejected'}
          className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
            !data || data.status === 'rejected'
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.99]'
          }`}
        >
          View Dynamic Fair Pricing
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}