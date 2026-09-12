import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Package, 
  ShoppingBag, 
  Copy, 
  Check, 
  BadgeCheck, 
  Send,
  FileText,
  Bot,
  UserCheck,
  RefreshCw,
  Layers,
  Award
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';
import { BackButton } from '@/components/BackButton';
import { DEMO_DATASET, findArtisan, getArtisanImage, getArtisanProducts } from '@/demoData';

export default function SellerProfile() {
  const { id, artisanId: routeArtisanId } = useParams<{ id?: string; artisanId?: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const isHi = state.language === 'hi';

  const artisanId = id || routeArtisanId || 'artisan-001';

  const [profile, setProfile] = useState<any>(null);
  const [allArtisans, setAllArtisans] = useState<any[]>(DEMO_DATASET.artisans);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Demo Document Verification Modal State
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyDocType, setVerifyDocType] = useState('pehchan');
  const [verifyDocNumber, setVerifyDocNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>(null);

  // Full 3-Tier Verification Details Modal State
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Active Tab for 3-Tier Separation View: 'all' | 'verified' | 'artisan' | 'ai'
  const [activeTierTab, setActiveTierTab] = useState<'all' | 'verified' | 'artisan' | 'ai'>('all');

  // Form states for direct B2B inquiry
  const [buyerName, setBuyerName] = useState('');
  const [buyerOrg, setBuyerOrg] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [notes, setNotes] = useState('');

  // 1. Fetch all artisans for the top switcher
  useEffect(() => {
    fetch('/api/artisan/all')
      .then(res => res.json())
      .then(data => {
        if (data.artisans && Array.isArray(data.artisans) && data.artisans.length > 0) {
          setAllArtisans(data.artisans);
        }
      })
      .catch(err => {
        console.warn('Using demo dataset artisans list:', err);
      });
  }, []);

  // 2. Fetch specific artisan profile & generate QR
  useEffect(() => {
    setLoading(true);
    setVerifyResult(null);

    fetch(`/api/artisan/${artisanId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && data.artisan) {
          setProfile(data);
          setVerifyDocNumber(data.artisan?.pehchanId || '');
        } else {
          throw new Error('No artisan returned in payload');
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Resolving artisan profile from deterministic demoData:', err);
        const local = findArtisan(artisanId);
        if (local) {
          const prods = getArtisanProducts(local.id);
          const imgSrc = getArtisanImage(local);
          const fallbackProfile = {
            artisan: {
              ...local,
              photo: imgSrc,
              avatarUrl: imgSrc
            },
            products: prods,
            verification: {
              isVerified: true,
              status: "Active Verified Artisan",
              pehchanCardIssuedBy: "Development Commissioner (Handicrafts), Ministry of Textiles, Govt. of India",
              giRegistry: "Controller General of Patents, Designs and Trade Marks (CGPDTM)",
              blockchainHash: "0x89f2a7b1c3e4d567890123456789abcdef0123456789abcdef0123456789abcd",
              verifiedSince: "2018",
              isDemoData: true
            },
            tierSeparation: {
              verified: {
                pehchanId: local.pehchanId,
                giRegistrationNo: local.giRegistrationNo,
                giCertified: local.giCertified,
                cluster: local.cluster,
                aadhaarVerified: true,
                bankAccountVerified: true,
                issuingAuthority: "Ministry of Textiles / CGPDTM Registry",
                verificationDate: "14-Feb-2023",
                status: "VERIFIED_GOVT_RECORD"
              },
              artisanProvided: {
                name: local.name,
                craft: local.craft,
                experience: local.experience,
                location: local.location,
                bio: local.bio,
                skills: local.skills || [local.craft],
                shgMember: local.shgMember,
                shgName: local.shgName,
                phoneMasked: local.phone ? local.phone.slice(0, 6) + 'XXXXX' : '+91 98391 XXXXX'
              },
              aiSuggested: {
                recommendedCategories: [local.craft, "Handcrafted Sustainable Decor", "B2B Export Quality"],
                marketAlignmentScore: "94/100",
                demandForecast: "High domestic & corporate gifting demand for Q3/Q4 festival season",
                suggestedMinOrderQuantity: 10,
                qualityIndicators: ["100% Authentic Handcrafted", "Natural Materials", "Cluster GI Heritage"]
              }
            },
            trustScore: {
              total: local.trustScore || 92,
              max: 100,
              breakdown: [
                { label: "Govt Identity Verification", score: 25, max: 25, status: "Verified (Pehchan ID & Aadhaar KYC)" },
                { label: "Craft & GI Heritage Authenticity", score: 25, max: 25, status: "Verified (CGPDTM GI Tag Registry)" },
                { label: "Cluster & SHG Affiliation", score: 20, max: 20, status: "Verified (Registered Craft Cluster)" },
                { label: "B2B Fulfillment Reliability", score: 22, max: 30, status: "98% on-time sample & bulk order dispatch" }
              ]
            },
            isDemoData: true
          };
          setProfile(fallbackProfile);
          setVerifyDocNumber(local.pehchanId);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });

    // Fetch public-safe QR code
    fetch(`/api/artisan/${artisanId}/qr`)
      .then(res => res.json())
      .then(data => {
        if (data.qrDataUrl) {
          setQrDataUrl(data.qrDataUrl);
        }
      })
      .catch(() => {
        const fullUrl = window.location.href;
        QRCode.toDataURL(fullUrl, {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 480,
          color: { dark: '#0f172a', light: '#ffffff' }
        }).then(url => setQrDataUrl(url)).catch(() => {});
      });
  }, [artisanId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `KarigarSetu_ID_QR_${artisanId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Run simulated OCR document verification
  const handleVerifyDocument = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/artisan/verify-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: verifyDocType,
          documentNumber: verifyDocNumber || (verifyDocType === 'pehchan' ? profile?.artisan?.pehchanId : profile?.artisan?.giRegistrationNo)
        })
      });
      const data = await res.json();
      setVerifyResult(data);
    } catch (err) {
      setVerifyResult({
        success: true,
        documentType: verifyDocType,
        extractedData: {
          name: verifyDocType === 'pehchan' ? 'Ministry of Textiles Pehchan Card' : 'GI Tag Certificate',
          extractedId: verifyDocNumber || profile?.artisan?.pehchanId,
          holderName: profile?.artisan?.name,
          craft: profile?.artisan?.craft,
          issuingAuthority: 'Development Commissioner (Handicrafts), Govt of India',
          confidence: 0.98,
          status: 'VERIFIED'
        },
        status: 'Demo Verification Successful',
        verificationScore: 95,
        notice: 'DEMO VERIFICATION: Simulated OCR verification for SIH presentation. Does not connect to live government databases.',
        isDemoData: true
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !selectedProduct) return;

    try {
      await fetch('/api/inquiry/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          buyerName,
          buyerOrg,
          quantity: Number(quantity) || 1,
          notes
        })
      });
      setInquirySent(true);
      setTimeout(() => {
        setInquirySent(false);
        setSelectedProduct(null);
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center gap-3">
          <BackButton />
          <h1 className="text-sm font-bold text-slate-900">Artisan Digital Profile</h1>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-semibold text-slate-600">Loading Artisan Digital Identity...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile || !profile.artisan) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-sm font-bold text-slate-900">Artisan Profile</h1>
          </div>
          <button
            onClick={() => navigate('/demo-hub')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            ⚡ Demo Hub
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="text-3xl">🔍</div>
            <h2 className="text-base font-black text-slate-900">Artisan Not Found</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              No registered artisan was found matching ID <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{artisanId}</code>.
            </p>
            <button
              onClick={() => navigate('/demo-hub')}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Return to SIH Demo Hub (52 Master Artisans)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { artisan, products, tierSeparation, trustScore } = profile;

  // Fallback for trust score breakdown if not provided
  const trustScoreData = trustScore || {
    total: artisan.trustScore || 94,
    max: 100,
    breakdown: [
      { label: "Govt Identity Verification", score: 25, max: 25, status: "Verified (Pehchan ID & Aadhaar KYC)" },
      { label: "Craft & GI Heritage Authenticity", score: 25, max: 25, status: "Verified (CGPDTM GI Tag Registry)" },
      { label: "Cluster & SHG Affiliation", score: 20, max: 20, status: "Verified (Registered Craft Cluster)" },
      { label: "B2B Fulfillment Reliability", score: 24, max: 30, status: "98% on-time dispatch rate" }
    ]
  };

  const avatarSrc = artisan.photo || artisan.avatarUrl || `/images/avatars/${artisan.id}.svg`;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-32 text-slate-900 overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. CLEAN TOP NAVIGATION HEADER (No Crowded Buttons)      */}
      {/* ========================================================= */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-5 py-2.5 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <BackButton />
          <div className="hidden min-[380px]:block text-left">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block leading-none">
              {isHi ? 'प्रमाणित कारीगर' : 'Verified Artisan'}
            </span>
            <span className="text-xs font-bold text-slate-800 font-mono leading-tight">
              {artisan.pehchanId || 'BR-MAD-PNT-4402'}
            </span>
          </div>
        </div>

        {/* Clean, uncrowded right action buttons (Max 2 clean buttons) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button 
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 rounded-xl text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="View Scannable QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-semibold">QR</span>
          </button>

          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            title="Copy Profile Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] text-emerald-700 font-bold hidden min-[360px]:inline">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden min-[400px]:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. SIH DEMO: 52 MASTER ARTISAN SELECTOR CAROUSEL          */}
      {/* ========================================================= */}
      <nav aria-label="Demo artisan switcher" className="bg-slate-900 text-white px-3 sm:px-4 py-2 border-b border-slate-800 shadow-inner">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <span>🇮🇳</span> SIH DEMO • {allArtisans.length} Master Artisans
            </span>
            <button
              onClick={() => navigate('/demo-hub')}
              className="text-[10px] text-amber-300 hover:text-white font-bold underline cursor-pointer"
            >
              ⚡ View All in Demo Hub →
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {allArtisans.map((art) => {
              const isSelected = art.id === artisanId || art.legacyId === artisanId;
              const genderEmoji = art.gender === 'Female' ? '👩‍🎨' : '👨‍🎨';
              return (
                <button
                  key={art.id}
                  onClick={() => navigate(`/seller/${art.id}`)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md ring-2 ring-amber-300' 
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  <span className="text-xs">{genderEmoji}</span>
                  <span className="whitespace-nowrap">{art.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 3. MAIN PAGE CONTENT CONTAINER                            */}
      {/* ========================================================= */}
      <main className="p-3 sm:p-5 space-y-4 sm:space-y-5 max-w-2xl mx-auto">

        {/* PAGE TITLE & STATUS BANNER (Well-spaced, not cramped in header) */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-indigo-50/50 p-3.5 sm:p-4 rounded-2xl border border-amber-200/70 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              प्रमाणित कारीगर पहचान
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Verified Artisan Profile
            </h1>
            <p className="text-[11px] font-mono text-slate-600 mt-0.5">
              ID: {artisan.pehchanId || 'BR-MAD-PNT-4402'}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Profile</span>
            </span>
            <span className="block text-[10px] text-slate-500 mt-1 font-medium">
              Govt & GI Authenticated
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. SIMPLIFIED ARTISAN PROFILE CARD (Mobile-First, Clean)  */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4">
          
          {/* Main Info Row: Avatar + Details */}
          <div className="flex gap-3.5 sm:gap-5 items-start">
            {/* Friendly Authentic Indian Artisan Photo */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-amber-300 shadow-sm">
                <img 
                  src={avatarSrc} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.currentTarget.src = `/images/avatars/${artisan.id}.svg`;
                  }}
                />
              </div>
              <div 
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-md border-2 border-white"
                title="Verified Authentic Artisan"
              >
                <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Artisan Name, Craft, Location */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug truncate">
                  {artisan.name}
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-700 leading-snug">
                {artisan.craft}
              </p>
              
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 leading-none">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{artisan.location}</span>
              </p>

              {/* Badges: GI & Cluster */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>GI Certified</span>
                </span>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md font-medium">
                  {artisan.cluster ? 'Megacluster' : 'Direct Producer'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Button Row (Spacious & Clean Tap Targets) */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
            <button 
              onClick={() => setShowQrModal(true)}
              className="py-2.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">QR Profile</span>
            </button>

            <button 
              onClick={handleCopyLink}
              className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Share2 className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button 
              onClick={() => setShowVerifyModal(true)}
              className="py-2.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Verify Doc</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: CRAFT & PRODUCTION CAPACITY                    */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="text-base">🎨</span>
              Craft & Production Capacity
            </h3>
            <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              B2B Ready
            </span>
          </div>

          {/* 4-Item Grid (2 cols mobile, 4 cols desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Craft</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">{artisan.craft}</span>
            </div>

            <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Experience</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">{artisan.experience || '18 Years'}</span>
            </div>

            <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Monthly Capacity</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">{artisan.capacity || '40 pieces/mo'}</span>
            </div>

            <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Typical Delivery</span>
              <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">
                {artisan.averageFulfillmentDays ? `${artisan.averageFulfillmentDays} Days` : '7–10 Days'}
              </span>
            </div>
          </div>

          {/* Artisan Heritage & Story */}
          {artisan.bio && (
            <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-200/60 text-xs text-slate-700 leading-relaxed">
              <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">
                Artisan Story & Heritage:
              </span>
              <p>{artisan.bio}</p>
            </div>
          )}

          {/* Master Techniques Tags */}
          {artisan.skills && artisan.skills.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">
                Specialized Techniques:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {artisan.skills.map((skill: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200/80 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: VERIFICATION HIGHLIGHTS (Clean Checklist)      */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Official Credential Verification
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Verified under Ministry of Textiles & GI Registry guidelines
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Active Status
            </span>
          </div>

          {/* Compact, clean checklist */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-slate-800 block">Identity Documents Verified (Demo)</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Pehchan ID: {artisan.pehchanId} • Masked Aadhaar KYC
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-slate-800 block">Craft & Cluster Affiliation Verified</span>
                <span className="text-[11px] text-slate-500">
                  {artisan.cluster || 'Registered Indian Craft Megacluster'}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-slate-800 block">Geographical Indication (GI) Registered</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Certificate No: {artisan.giRegistrationNo} (CGPDTM Authenticated)
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-slate-800 block">Fair Living Wage Standard Verified</span>
                <span className="text-[11px] text-slate-500">
                  Compliant with ₹150+/hr minimum fair artisan wage standard
                </span>
              </div>
            </div>
          </div>

          {/* Zero Middlemen Guarantee Callout */}
          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-emerald-900 block">Zero Middlemen Guarantee:</strong>
              <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                Direct institutional connection. 100% of purchase proceeds credit directly to {artisan.name}'s verified bank account.
              </p>
            </div>
          </div>

          {/* Action Row: View 3-Tier Details & Run OCR */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setShowDetailsModal(true)}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>View 3-Tier Architecture Details</span>
            </button>
            <button
              onClick={() => setShowVerifyModal(true)}
              className="flex-1 py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Run Simulated Document OCR</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: 3-TIER DATA SEPARATION CARDS (Expandable/Tabs) */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                3-Tier Data Architecture
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Strict separation of verified govt records, artisan input, and AI analytics
              </p>
            </div>
          </div>

          {/* Tier Filter Pills (Responsive) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs">
            <button
              onClick={() => setActiveTierTab('all')}
              className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all ${
                activeTierTab === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setActiveTierTab('verified')}
              className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all ${
                activeTierTab === 'verified' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛡️ Tier 1: Govt
            </button>
            <button
              onClick={() => setActiveTierTab('artisan')}
              className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all ${
                activeTierTab === 'artisan' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✍️ Tier 2: Artisan
            </button>
            <button
              onClick={() => setActiveTierTab('ai')}
              className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all ${
                activeTierTab === 'ai' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🤖 Tier 3: AI
            </button>
          </div>

          {/* TIER 1: GOVT VERIFIED DATA */}
          {(activeTierTab === 'all' || activeTierTab === 'verified') && (
            <div className="bg-emerald-50/40 rounded-2xl border border-emerald-200/80 p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-600 text-white rounded-md flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Tier 1: Government Verified Data
                    </h4>
                    <span className="text-[10px] text-emerald-800">
                      Official Ministry of Textiles & CGPDTM Records
                    </span>
                  </div>
                </div>
                <span className="bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200/70">
                  <span className="text-[10px] text-slate-500 block">Pehchan Artisan ID</span>
                  <span className="font-mono font-bold text-emerald-900 text-xs">
                    {tierSeparation?.verified?.pehchanId || artisan.pehchanId}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200/70">
                  <span className="text-[10px] text-slate-500 block">GI Registration (CGPDTM)</span>
                  <span className="font-mono font-bold text-emerald-900 text-xs">
                    {tierSeparation?.verified?.giRegistrationNo || artisan.giRegistrationNo}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200/70">
                  <span className="text-[10px] text-slate-500 block">Cluster Affiliation</span>
                  <span className="font-semibold text-slate-800 text-xs truncate block">
                    {tierSeparation?.verified?.cluster || artisan.cluster}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200/70">
                  <span className="text-[10px] text-slate-500 block">PFMS Bank KYC Verification</span>
                  <span className="font-mono text-[11px] text-slate-700 font-medium truncate block">
                    Active PFMS Linked Bank Account
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TIER 2: ARTISAN PROVIDED DATA */}
          {(activeTierTab === 'all' || activeTierTab === 'artisan') && (
            <div className="bg-amber-50/40 rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-600 text-white rounded-md flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                      Tier 2: Artisan-Provided Information
                    </h4>
                    <span className="text-[10px] text-amber-800">
                      Self-Declared Craft Heritage & Production Capacity
                    </span>
                  </div>
                </div>
                <span className="bg-amber-200 text-amber-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  ARTISAN_INPUT
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="text-[10px] text-slate-500 block">Experience</span>
                    <span className="font-bold text-slate-800 text-xs">{artisan.experience}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="text-[10px] text-slate-500 block">Monthly Output</span>
                    <span className="font-bold text-slate-800 text-xs">{artisan.capacity || '40 pieces/mo'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block">Fulfillment SLA</span>
                    <span className="font-bold text-slate-800 text-xs">{artisan.averageFulfillmentDays || 7} Days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TIER 3: AI SUGGESTED MARKET INTELLIGENCE */}
          {(activeTierTab === 'all' || activeTierTab === 'ai') && (
            <div className="bg-indigo-50/40 rounded-2xl border border-indigo-200/80 p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-md flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-indigo-700" />
                      Tier 3: AI Market Intelligence
                    </h4>
                    <span className="text-[10px] text-indigo-800">
                      KarigarSetu Pricing Engine & Demand Predictions
                    </span>
                  </div>
                </div>
                <span className="bg-indigo-200 text-indigo-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  AI_SUGGESTION
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2.5 rounded-xl border border-indigo-200/70">
                    <span className="text-[10px] text-slate-500 block">Export Alignment</span>
                    <span className="font-black text-indigo-900 text-sm">94 / 100</span>
                    <span className="text-[9px] text-indigo-600 block">High B2B export suitability</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-indigo-200/70">
                    <span className="text-[10px] text-slate-500 block">Suggested B2B MOQ</span>
                    <span className="font-black text-indigo-900 text-sm">10 Units</span>
                    <span className="text-[9px] text-indigo-600 block">Optimal logistics batch</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-indigo-200/70">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Seasonal Demand Forecast:</span>
                  <p className="text-slate-700 text-xs leading-snug">
                    🔥 High domestic corporate gifting and European ethical lifestyle boutique demand for upcoming festive season.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: INSTITUTIONAL TRUST SCORE (Clean Progress Bars) */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  B2B Institutional Trust Score
                </h3>
                <p className="text-[11px] text-slate-500">
                  Verification index for corporate & institutional buyers
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base sm:text-lg font-black text-slate-900">
                {trustScoreData.total}<span className="text-xs font-normal text-slate-400">/100</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                A+ Exemplary
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {trustScoreData.breakdown?.map((item: any, idx: number) => {
              const pct = (item.score / item.max) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="font-mono font-bold text-slate-900">{item.score}/{item.max}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${pct === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{item.status}</span>
                    <span className="font-medium text-emerald-600">Verified</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verified Direct Contact */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400">Phone / WhatsApp</div>
                <div className="font-semibold text-slate-800 truncate">{artisan.phone || '+91 94312 XXXXX'}</div>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400">Portal Email</div>
                <div className="font-semibold text-slate-800 truncate">{artisan.email || 'contact@karigarsetu.in'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: ARTISAN'S VERIFIED PRODUCT CATALOG             */}
        {/* ========================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" />
              Verified Catalog Listings ({products?.length || 0})
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">B2B Wholesale Ready</span>
          </div>

          <div className="space-y-3">
            {products && products.length > 0 ? (
              products.map((prod: any) => (
                <div 
                  key={prod.id} 
                  className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs flex flex-col sm:flex-row gap-3.5 items-start sm:items-center"
                >
                  <div className="w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{prod.craftCategory || artisan.craft}</div>
                    <h4 className="font-bold text-sm text-slate-900 truncate leading-snug">{prod.name}</h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {prod.materials} • {prod.dimensions}
                    </div>
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-base font-black text-slate-900">₹{prod.price?.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-400 ml-1">/ unit</span>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(prod)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Inquire B2B</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-500 text-xs">
                No catalog items currently listed for this artisan.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* HIGH-RES SCANNABLE QR MODAL (Clean, Spacious, Tested)     */}
      {/* ========================================================= */}
      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent className="sm:max-w-md mx-auto p-5 sm:p-6 bg-white rounded-3xl shadow-2xl text-center space-y-4">
          <DialogHeader className="flex flex-col items-center">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-1.5">
              <QrCode className="w-5 h-5" />
            </div>
            <DialogTitle className="text-base sm:text-lg font-bold text-slate-900">
              Artisan Trust Badge QR Code
            </DialogTitle>
            <p className="text-xs text-slate-500 max-w-xs mt-0.5">
              Scan with any phone camera to view {artisan.name}'s official public verification profile.
            </p>
            <DialogClose onClick={() => setShowQrModal(false)} />
          </DialogHeader>

          {/* Crisp Scannable QR Container */}
          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-amber-400 shadow-lg inline-block mx-auto">
            {qrDataUrl ? (
              <img 
                src={qrDataUrl} 
                alt="Verified Artisan QR" 
                className="w-52 h-52 object-contain bg-white rounded-xl p-2 mx-auto" 
              />
            ) : (
              <div className="w-52 h-52 bg-slate-800 animate-pulse rounded-xl flex items-center justify-center">
                <span className="text-xs text-slate-400 font-mono">Generating QR...</span>
              </div>
            )}
            <div className="mt-2 text-[11px] font-mono text-amber-300 tracking-wider uppercase font-bold">
              ID: {artisan.pehchanId}
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-left">
            <div className="font-semibold text-slate-800 text-[11px] mb-0.5">Public Verification Destination:</div>
            <div className="font-mono text-[10px] text-indigo-600 break-all">{window.location.href}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={handleDownloadQr}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-4 h-4" /> Download QR
            </button>
            <button 
              onClick={handleCopyLink}
              className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* SIMULATED DOCUMENT OCR VERIFICATION MODAL                */}
      {/* ========================================================= */}
      <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent className="sm:max-w-md mx-auto p-5 sm:p-6 bg-white rounded-3xl shadow-2xl space-y-4">
          <DialogHeader>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-1">
              <FileText className="w-5 h-5" />
            </div>
            <DialogTitle className="text-base font-bold text-slate-900">
              Demo Document OCR Verification
            </DialogTitle>
            <p className="text-xs text-slate-500">
              Simulate instant government credential verification for {artisan.name}.
            </p>
            <DialogClose onClick={() => setShowVerifyModal(false)} />
          </DialogHeader>

          {/* Document Type Selector */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Document to Verify:</label>
              <select
                value={verifyDocType}
                onChange={(e) => {
                  setVerifyDocType(e.target.value);
                  setVerifyResult(null);
                  if (e.target.value === 'pehchan') setVerifyDocNumber(artisan.pehchanId);
                  else if (e.target.value === 'gi_certificate') setVerifyDocNumber(artisan.giRegistrationNo);
                  else if (e.target.value === 'aadhaar') setVerifyDocNumber('XXXXXXXX4821');
                  else setVerifyDocNumber('NABARD-SHG-2021-994');
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white font-medium"
              >
                <option value="pehchan">🇮🇳 Ministry of Textiles Pehchan Card</option>
                <option value="gi_certificate">📜 CGPDTM Geographical Indication (GI) Certificate</option>
                <option value="aadhaar">🆔 Masked Aadhaar e-KYC (UIDAI)</option>
                <option value="shg_certificate">🏘️ NABARD Self-Help Group (SHG) Certificate</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Document Identifier / Number:</label>
              <input
                type="text"
                value={verifyDocNumber}
                onChange={(e) => setVerifyDocNumber(e.target.value)}
                placeholder="e.g. BR-MAD-PNT-4402"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>

            <button
              onClick={handleVerifyDocument}
              disabled={isVerifying}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-xs flex items-center justify-center gap-2 text-xs transition-colors disabled:opacity-60"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Document OCR...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Run Simulated OCR Verification</span>
                </>
              )}
            </button>

            {/* OCR Verification Results Display */}
            {verifyResult && (
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {verifyResult.status || 'Verification Successful'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Score: {verifyResult.verificationScore || 95}%</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Document:</span>
                    <span className="font-semibold text-slate-200 text-right">{verifyResult.documentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Holder Name:</span>
                    <span className="font-bold text-amber-300">{verifyResult.extractedData?.holderName || artisan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Extracted ID:</span>
                    <span className="font-mono text-emerald-300">{verifyResult.extractedData?.extractedId || verifyDocNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Authority:</span>
                    <span className="text-slate-300 text-right truncate ml-2">{verifyResult.extractedData?.issuingAuthority}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-amber-300/80 leading-tight">
                  ⚠️ {verifyResult.notice}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 3-TIER VERIFICATION DETAILS FULL MODAL                    */}
      {/* ========================================================= */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-lg mx-auto p-5 sm:p-6 bg-white rounded-3xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-1">
              <Layers className="w-5 h-5" />
            </div>
            <DialogTitle className="text-base font-bold text-slate-900">
              Complete 3-Tier Verification Details
            </DialogTitle>
            <p className="text-xs text-slate-500">
              Separation of official records, artisan inputs, and platform AI analytics.
            </p>
            <DialogClose onClick={() => setShowDetailsModal(false)} />
          </DialogHeader>

          <div className="space-y-3 text-xs">
            {/* Tier 1 Govt */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Tier 1: Government Verified Records
              </div>
              <ul className="space-y-1 text-emerald-800 text-[11px]">
                <li>• Ministry of Textiles Pehchan ID: <strong>{artisan.pehchanId}</strong></li>
                <li>• Geographical Indication Tag: <strong>{artisan.giRegistrationNo}</strong></li>
                <li>• Cluster Affiliation: <strong>{artisan.cluster || 'Registered Megacluster'}</strong></li>
                <li>• PFMS Aadhaar KYC Status: <strong>Verified Active</strong></li>
              </ul>
            </div>

            {/* Tier 2 Artisan */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <UserCheck className="w-4 h-4 text-amber-600" />
                Tier 2: Artisan Self-Declared Data
              </div>
              <ul className="space-y-1 text-amber-800 text-[11px]">
                <li>• Experience: <strong>{artisan.experience}</strong></li>
                <li>• Production Capacity: <strong>{artisan.capacity || '40 pieces/month'}</strong></li>
                <li>• Average Fulfillment: <strong>{artisan.averageFulfillmentDays || 7} Days</strong></li>
              </ul>
            </div>

            {/* Tier 3 AI */}
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
              <div className="font-bold text-indigo-900 flex items-center gap-1.5 mb-1">
                <Bot className="w-4 h-4 text-indigo-600" />
                Tier 3: Platform AI Analytics & Insights
              </div>
              <ul className="space-y-1 text-indigo-800 text-[11px]">
                <li>• Institutional Trust Score: <strong>{trustScoreData.total} / 100</strong></li>
                <li>• B2B Minimum Order Quantity (MOQ): <strong>10 units</strong></li>
                <li>• Recommended Tagging: <strong>GI Certified, Bulk Ready, Zero Middlemen</strong></li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* DIRECT B2B WHOLESALE INQUIRY MODAL                       */}
      {/* ========================================================= */}
      {selectedProduct && (
        <Dialog open={Boolean(selectedProduct)} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-md mx-auto p-5 sm:p-6 bg-white rounded-3xl shadow-2xl space-y-4">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                B2B Wholesale Inquiry
              </DialogTitle>
              <p className="text-xs text-slate-500">
                Direct inquiry to <strong>{artisan.name}</strong> for <strong>{selectedProduct.name}</strong> (₹{selectedProduct.price?.toLocaleString('en-IN')})
              </p>
              <DialogClose onClick={() => setSelectedProduct(null)} />
            </DialogHeader>

            {inquirySent ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-slate-900">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-slate-500">
                  {artisan.name} and the co-operative have received your wholesale request.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name / Buyer Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={buyerName}
                    onChange={e => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company / Boutique / Organization</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Heritage Silks & Co."
                    value={buyerOrg}
                    onChange={e => setBuyerOrg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Order Quantity (Units)</label>
                  <input 
                    type="number" 
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customization / Timeline Notes</label>
                  <textarea 
                    rows={3}
                    placeholder="Specify color requirements, packaging, or delivery timeline..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs flex items-center justify-center gap-2 text-xs transition-colors mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Direct Inquiry to Artisan
                </button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
