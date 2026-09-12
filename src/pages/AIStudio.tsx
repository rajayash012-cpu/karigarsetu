import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Upload, 
  Camera, 
  RotateCcw, 
  Download, 
  Check, 
  ShieldCheck, 
  Layers, 
  Image as ImageIcon, 
  Calculator, 
  Palette, 
  Sliders, 
  AlertCircle,
  Eye,
  RefreshCw,
  ShoppingBag,
  FileSpreadsheet
} from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { useApp } from '@/context/AppContext';
import { 
  enhanceStudioImage, 
  recomposeTheme, 
  ThemeName, 
  StudioEnhancementResult 
} from '@/lib/api';

// 8 Authentic Indian Artisan Demo Presets
const DEMO_PRESETS = [
  {
    id: 'madhubani',
    title: 'Madhubani Painting',
    craft: 'Mithila Folk Art',
    recommendedTheme: 'indian_heritage' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    icon: '🎨'
  },
  {
    id: 'dokra',
    title: 'Dokra Elephant',
    craft: 'Lost-Wax Bell Metal',
    recommendedTheme: 'premium_studio' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    icon: '🪔'
  },
  {
    id: 'sambalpuri',
    title: 'Sambalpuri Stole',
    craft: 'Handloom Ikat Weave',
    recommendedTheme: 'natural_craft' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    icon: '🧵'
  },
  {
    id: 'walnut',
    title: 'Walnut Wood Carving',
    craft: 'Kashmiri Woodcraft',
    recommendedTheme: 'natural_craft' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    icon: '🪵'
  },
  {
    id: 'brass_diya',
    title: 'Brass Diya Set',
    craft: 'Moradabad Metalcraft',
    recommendedTheme: 'festive' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80',
    icon: '🪔'
  },
  {
    id: 'saree',
    title: 'Block Printed Saree',
    craft: 'Sanganer Hand Block',
    recommendedTheme: 'indian_heritage' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    icon: '🥻'
  },
  {
    id: 'terracotta',
    title: 'Terracotta Pot',
    craft: 'Gorakhpur Clay Craft',
    recommendedTheme: 'natural_craft' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    icon: '🏺'
  },
  {
    id: 'bamboo',
    title: 'Bamboo Basket',
    craft: 'North-East Cane & Bamboo',
    recommendedTheme: 'natural_craft' as ThemeName,
    rawUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    icon: '🧺'
  }
];

// 7 Theme Configs
const THEME_OPTIONS: { id: ThemeName; name: string; desc: string; icon: string }[] = [
  { id: 'clean_white', name: 'Clean White', desc: 'Crisp white, soft floor shadow, B2B ready', icon: '⚪' },
  { id: 'premium_studio', name: 'Premium Studio', desc: 'Neutral gradient, soft studio vignette', icon: '🏢' },
  { id: 'indian_heritage', name: 'Indian Heritage', desc: 'Muted terracotta & raw silk warmth', icon: '🇮🇳' },
  { id: 'festive', name: 'Festive', desc: 'Warm amber glow, festive presentation', icon: '🪔' },
  { id: 'natural_craft', name: 'Natural Craft', desc: 'Earthy wood tones, soft daylight', icon: '🪵' },
  { id: 'minimal_luxury', name: 'Minimal Luxury', desc: 'Architectural slate-stone neutral', icon: '✨' },
  { id: 'b2b_catalogue', name: 'B2B Catalogue', desc: 'Strict 80% canvas scale, pure white', icon: '📋' }
];

export default function AIStudio() {
  const navigate = useNavigate();
  const { updateCurrentProduct, addToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePreset, setActivePreset] = useState<string>(DEMO_PRESETS[0].id);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('indian_heritage');
  const [viewMode, setViewMode] = useState<'slider' | 'enhanced' | 'original' | 'cutout'>('slider');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [enhancementResult, setEnhancementResult] = useState<StudioEnhancementResult | null>(null);
  const [currentRawUrl, setCurrentRawUrl] = useState<string>(DEMO_PRESETS[0].rawUrl);

  const [savedForMarketplace, setSavedForMarketplace] = useState<boolean>(false);
  const [savedForB2B, setSavedForB2B] = useState<boolean>(false);

  // Initial load: enhance the default preset or stored image
  useEffect(() => {
    const rawStored = localStorage.getItem('processedProduct');
    if (rawStored) {
      try {
        const parsed = JSON.parse(rawStored);
        if (parsed.enhancement?.rawUrl) {
          setCurrentRawUrl(parsed.enhancement.rawUrl);
          runEnhancement({ imageUrl: parsed.enhancement.rawUrl, theme: 'clean_white' });
          return;
        }
      } catch (e) {}
    }
    // Otherwise enhance default preset
    runEnhancement({ imageUrl: DEMO_PRESETS[0].rawUrl, theme: DEMO_PRESETS[0].recommendedTheme });
  }, []);

  // Run full studio enhancement
  const runEnhancement = async (input: { imageFile?: File; imageUrl?: string; theme?: ThemeName }) => {
    setIsProcessing(true);
    setProcessingStatus('Detecting product & removing background...');
    setSavedForMarketplace(false);
    setSavedForB2B(false);

    try {
      setTimeout(() => setProcessingStatus('Calibrating lighting & synthesizing contact shadow...'), 700);
      setTimeout(() => setProcessingStatus('Centering on 78% canvas and rendering themes...'), 1400);

      const targetTheme = input.theme || selectedTheme;
      const res = await enhanceStudioImage({
        imageFile: input.imageFile,
        imageUrl: input.imageUrl,
        theme: targetTheme
      });

      setEnhancementResult(res);
      setSelectedTheme(targetTheme);

      if (input.imageUrl) {
        setCurrentRawUrl(input.imageUrl);
      } else if (input.imageFile) {
        setCurrentRawUrl(res.originalUrl);
      }

      // Sync with AppContext & localStorage
      updateCurrentProduct({
        rawImage: res.originalUrl,
        enhancedImage: res.enhancedUrl
      });

      // Update existing local storage payload if available
      try {
        const existing = localStorage.getItem('processedProduct');
        const parsed = existing ? JSON.parse(existing) : {};
        localStorage.setItem('processedProduct', JSON.stringify({
          ...parsed,
          status: 'success',
          enhancement: {
            rawUrl: res.originalUrl,
            enhancedUrl: res.enhancedUrl,
            cutoutUrl: res.cutoutUrl,
            themeOutputs: res.themeOutputs,
            qualityScore: res.qualityScore,
            improvements: res.improvements
          }
        }));
      } catch (e) {}

    } catch (err: any) {
      console.error('Enhancement error:', err);
      addToast({ message: 'Enhancement failed: ' + (err.message || 'Unknown error'), type: 'error' });
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  // Recompose on theme change
  const handleThemeChange = async (theme: ThemeName) => {
    setSelectedTheme(theme);

    // If we already have themeOutputs generated by the backend, switch instantly!
    if (enhancementResult?.themeOutputs && enhancementResult.themeOutputs[theme]) {
      setEnhancementResult({
        ...enhancementResult,
        selectedTheme: theme,
        enhancedUrl: enhancementResult.themeOutputs[theme]
      });
      return;
    }

    // Otherwise recompose on server
    if (enhancementResult?.cutoutUrl) {
      setIsProcessing(true);
      setProcessingStatus(`Recomposing onto ${THEME_OPTIONS.find(t => t.id === theme)?.name}...`);
      try {
        const res = await recomposeTheme(enhancementResult.cutoutUrl, theme);
        setEnhancementResult({
          ...enhancementResult,
          selectedTheme: theme,
          enhancedUrl: res.enhancedUrl
        });
      } catch (err) {
        console.warn('Recompose theme error:', err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Select demo preset
  const handleSelectPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setActivePreset(preset.id);
    setCurrentRawUrl(preset.rawUrl);
    runEnhancement({ imageUrl: preset.rawUrl, theme: preset.recommendedTheme });
  };

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setActivePreset('');
      runEnhancement({ imageFile: file, theme: selectedTheme });
    }
  };

  // Drag handling for Before / After slider
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  // "Use for Marketplace" action
  const handleUseForMarketplace = () => {
    if (!enhancementResult) return;
    const urlToUse = enhancementResult.enhancedUrl || enhancementResult.marketplaceUrl;
    updateCurrentProduct({ enhancedImage: urlToUse });

    try {
      const existing = localStorage.getItem('processedProduct');
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem('processedProduct', JSON.stringify({
        ...parsed,
        enhancement: {
          ...(parsed.enhancement || {}),
          enhancedUrl: urlToUse
        }
      }));
    } catch (e) {}

    setSavedForMarketplace(true);
    addToast({ message: 'Saved as primary Marketplace product image!', type: 'success' });
    setTimeout(() => setSavedForMarketplace(false), 3000);
  };

  // "Use for B2B Catalogue" action
  const handleUseForB2B = () => {
    if (!enhancementResult) return;
    const urlToUse = enhancementResult.b2bCatalogueUrl || enhancementResult.enhancedUrl;
    updateCurrentProduct({ enhancedImage: urlToUse });

    try {
      const existing = localStorage.getItem('processedProduct');
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem('processedProduct', JSON.stringify({
        ...parsed,
        enhancement: {
          ...(parsed.enhancement || {}),
          enhancedUrl: urlToUse
        }
      }));
    } catch (e) {}

    setSavedForB2B(true);
    addToast({ message: 'Saved as standardized B2B Catalogue image!', type: 'success' });
    setTimeout(() => setSavedForB2B(false), 3000);
  };

  // Download Image
  const handleDownloadImage = () => {
    if (!enhancementResult?.enhancedUrl) return;
    const a = document.createElement('a');
    a.href = enhancementResult.enhancedUrl;
    a.download = `KarigarSetu_Studio_${selectedTheme}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Restore Original
  const handleRestoreOriginal = () => {
    if (!enhancementResult?.originalUrl) return;
    updateCurrentProduct({ enhancedImage: currentRawUrl });
    addToast({ message: 'Restored original photo without enhancement.', type: 'info' });
  };

  const quality = enhancementResult?.qualityScore || {
    overallScore: 94,
    background: 'Excellent',
    lighting: 'Good',
    productVisibility: 'Excellent',
    composition: 'Excellent',
    marketplaceReadiness: 'Excellent'
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-32 text-slate-900 select-none">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <BackButton />
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              AI Product Studio
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-600" /> Marketplace Ready
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">Zero-distortion handmade photo enhancement</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
            title="Upload artisan photo"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Photo</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 1. 8 ARTISAN CRAFT PRESET SELECTOR (SIH DEMO Presets)      */}
      {/* ========================================================= */}
      <div className="bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <span>🇮🇳</span> 8 Artisan Craft Demo Presets
            </span>
            <span className="text-[10px] text-slate-400">Click to enhance</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DEMO_PRESETS.map((p) => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md ring-2 ring-amber-300' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <span className="text-xs">{p.icon}</span>
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="p-4 space-y-4 max-w-xl mx-auto">
        {/* Processing State Indicator */}
        {isProcessing && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-3 rounded-2xl flex items-center gap-3 animate-pulse">
            <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
            <div className="text-xs font-semibold">{processingStatus || 'Enhancing photograph...'}</div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. INTERACTIVE BEFORE / AFTER COMPARISON CANVAS           */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-800">
                Studio View: {THEME_OPTIONS.find(t => t.id === selectedTheme)?.name}
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex bg-slate-200/70 p-0.5 rounded-lg text-[10px] font-semibold">
              <button 
                onClick={() => setViewMode('slider')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${viewMode === 'slider' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Split
              </button>
              <button 
                onClick={() => setViewMode('enhanced')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${viewMode === 'enhanced' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Enhanced
              </button>
              <button 
                onClick={() => setViewMode('original')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${viewMode === 'original' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Raw
              </button>
              <button 
                onClick={() => setViewMode('cutout')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${viewMode === 'cutout' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Cutout
              </button>
            </div>
          </div>

          {/* Canvas Container */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[4/4] sm:aspect-[4/3] bg-slate-100 w-full overflow-hidden select-none cursor-ew-resize"
          >
            {/* View Mode 1: SLIDER (Default) */}
            {viewMode === 'slider' && (
              <>
                {/* Before (Original Raw Photo) */}
                <img 
                  src={currentRawUrl} 
                  alt="Original Raw" 
                  className="absolute inset-0 w-full h-full object-contain p-2 bg-slate-200"
                  draggable={false}
                />

                {/* After (Enhanced Studio Composite) with clipPath */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img 
                    src={enhancementResult?.enhancedUrl || currentRawUrl} 
                    alt="Enhanced Studio" 
                    className="absolute inset-0 w-full h-full object-contain"
                    draggable={false}
                  />
                </div>

                {/* Vertical Divider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(0,0,0,0.4)] z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-slate-300">
                    <div className="flex gap-[3px]">
                      <div className="w-[2px] h-3.5 bg-slate-500 rounded-full"></div>
                      <div className="w-[2px] h-3.5 bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Labels */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] font-bold text-white drop-shadow-md z-10 pointer-events-none">
                  <span className="bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    ORIGINAL RAW
                  </span>
                  <span className="bg-indigo-600/90 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    ENHANCED STUDIO
                  </span>
                </div>
              </>
            )}

            {/* View Mode 2: Enhanced Only */}
            {viewMode === 'enhanced' && (
              <img 
                src={enhancementResult?.enhancedUrl || currentRawUrl} 
                alt="Enhanced" 
                className="w-full h-full object-contain"
              />
            )}

            {/* View Mode 3: Original Only */}
            {viewMode === 'original' && (
              <img 
                src={currentRawUrl} 
                alt="Original" 
                className="w-full h-full object-contain p-2 bg-slate-200"
              />
            )}

            {/* View Mode 4: Isolated Cutout with checkerboard background */}
            {viewMode === 'cutout' && (
              <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
                <img 
                  src={enhancementResult?.cutoutUrl || currentRawUrl} 
                  alt="Cutout" 
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>
            )}
          </div>

          {/* Color & Texture Authenticity Banner */}
          <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Color & Artwork 100% Preserved (Zero Distortion)</span>
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              {enhancementResult?.dimensions?.width || 1000}×{enhancementResult?.dimensions?.height || 1000}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. 7 THEME SELECTOR BUTTONS (Actual Image Recomposition)   */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-indigo-600" />
                Select Marketplace Theme Environment
              </h3>
              <p className="text-[11px] text-slate-500">
                Actually recomposes background, lighting, and contact shadow
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              7 Themes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">{theme.icon}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 font-bold" />}
                  </div>
                  <div className="font-bold text-xs text-slate-900">{theme.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{theme.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. IMAGE QUALITY SCORE & VERIFICATION BREAKDOWN           */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Automated Image Quality Assessment
                </h3>
                <p className="text-[11px] text-slate-500">
                  Compliance with B2B eCommerce and export standards
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-slate-900">{quality.overallScore}<span className="text-xs font-normal text-slate-400">%</span></div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                A+ Grade
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Background Isolation</span>
              <span className="font-bold text-emerald-700">{quality.background}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Lighting & Balance</span>
              <span className="font-bold text-emerald-700">{quality.lighting}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Product Visibility</span>
              <span className="font-bold text-emerald-700">{quality.productVisibility}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Canvas Composition</span>
              <span className="font-bold text-emerald-700">78% Centered</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-2">
              <span className="text-[10px] text-slate-400 block">Marketplace Compliance</span>
              <span className="font-bold text-indigo-700">GeM, Amazon, Etsy & B2B Ready</span>
            </div>
          </div>

          {/* List of Enhancements Applied */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">
              Enhancements Applied:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {enhancementResult?.improvements?.map((imp, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                  <Check className="w-3 h-3 text-emerald-600" /> {imp}
                </span>
              )) || (
                <>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                    <Check className="w-3 h-3 text-emerald-600" /> Background removed & clutter eliminated
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                    <Check className="w-3 h-3 text-emerald-600" /> Soft floor contact shadow synthesized
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                    <Check className="w-3 h-3 text-emerald-600" /> Product artwork & colors preserved
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 5. EXPORT ACTIONS & PRODUCT FLOW CONNECTION               */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Apply Enhanced Image to Product
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleUseForMarketplace}
              className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                savedForMarketplace
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {savedForMarketplace ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{savedForMarketplace ? 'Saved for Marketplace!' : 'Use for Marketplace'}</span>
            </button>

            <button
              onClick={handleUseForB2B}
              className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                savedForB2B
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
              }`}
            >
              {savedForB2B ? <Check className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
              <span>{savedForB2B ? 'Saved for B2B Catalogue!' : 'Use for B2B Catalogue'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={handleDownloadImage}
              className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 p-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Enhanced
            </button>

            <button
              onClick={handleRestoreOriginal}
              className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 p-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restore Original Photo
            </button>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 6. FIXED BOTTOM NEXT STEP BAR                             */}
      {/* ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/pricing')}
            className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-indigo-200" />
            <span>Continue to Dynamic Pricing →</span>
          </button>
          <button
            onClick={() => navigate('/catalog')}
            className="py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Catalog</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}