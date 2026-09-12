import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { 
  Package, 
  MessageSquare, 
  IndianRupee, 
  TrendingUp, 
  Camera, 
  Mic, 
  Image as ImageIcon, 
  Briefcase, 
  BarChart2, 
  Store, 
  QrCode, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Eye,
  Plus,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { DEMO_DATASET, getArtisanProducts, getArtisanInquiries } from '@/demoData';

// Types for Detail Modals
type MetricModalType = 'listings' | 'inquiries' | 'revenue' | 'margin' | null;

export default function Dashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const isHi = state.language === 'hi';
  const [dashboardQr, setDashboardQr] = useState<string>('');

  // Interactive Modal state for the 4 cards
  const [activeModal, setActiveModal] = useState<MetricModalType>(null);
  const [listingFilter, setListingFilter] = useState<'all' | 'in_stock' | 'made_to_order'>('all');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'negotiating' | 'confirmed'>('all');

  useEffect(() => {
    const url = `${window.location.origin}/seller/${state.artisan.id || 'artisan-001'}`;
    QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 140,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setDashboardQr).catch(console.error);
  }, [state.artisan.id]);

  // Data for Active Listings dynamically bound to active artisan
  const activeListingsData = React.useMemo(() => {
    const prods = getArtisanProducts(state.artisan.id);
    const sourceProds = prods.length > 0 ? prods : (state.products && state.products.length > 0 ? state.products : DEMO_DATASET.products.slice(0, 3));
    return sourceProds.map((p: any, idx: number) => ({
      id: p.id || `l-${idx + 1}`,
      titleEn: p.titleEn || p.name || 'Handcrafted Product',
      titleHi: p.titleHi || p.name || 'हस्तनिर्मित उत्पाद',
      category: p.category || p.craftType || state.artisan.craft,
      price: p.price || p.pricing?.price || 2500,
      stock: (p.capacity ? parseInt(String(p.capacity), 10) : 10) || 8,
      materials: p.materials || p.material || 'Authentic Regional Materials',
      laborHours: p.costBreakdown?.labourHours || 16,
      status: idx % 3 === 2 ? 'made_to_order' : 'in_stock',
      giTagged: true,
      imageUrl: p.imageUrl || (p.images && p.images[0]) || (p.enhancedImage) || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    }));
  }, [state.artisan.id, state.products, state.artisan.craft]);

  // Data for Inquiries dynamically bound to active artisan
  const inquiriesData = React.useMemo(() => {
    const inqs = getArtisanInquiries(state.artisan.id);
    const sourceInqs = inqs.length > 0 ? inqs : DEMO_DATASET.inquiries.slice(0, 3);
    return sourceInqs.map((i: any, idx: number) => {
      const rawStatus = (i.status || 'New').toLowerCase();
      const status = rawStatus.includes('confirm') ? 'confirmed' : rawStatus.includes('neg') ? 'negotiating' : 'new';
      return {
        id: i.id || `inq-${idx + 1}`,
        buyerName: i.buyerName || 'B2B Verified Buyer',
        buyerOrg: i.buyerOrg || 'Heritage Retail Hub',
        location: i.buyerCity ? `${i.buyerCity}, ${i.buyerState || 'India'}` : 'India',
        productName: i.productName || (activeListingsData[0]?.titleEn) || 'Handcrafted Artisan Product',
        quantity: i.quantity || 20,
        estValue: i.totalAmount || (i.quantity ? i.quantity * (i.unitPrice || 2500) : 50000),
        date: i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Active',
        status,
        timeline: i.timeline || 'Delivery in 2-3 weeks',
        notes: i.notes || 'Wholesale inquiry for export & boutique retail.'
      };
    });
  }, [state.artisan.id, activeListingsData]);

  const filteredListings = activeListingsData.filter(item => {
    if (listingFilter === 'in_stock') return item.status === 'in_stock';
    if (listingFilter === 'made_to_order') return item.status === 'made_to_order';
    return true;
  });

  const filteredInquiries = inquiriesData.filter(item => {
    if (inquiryFilter === 'new') return item.status === 'new';
    if (inquiryFilter === 'negotiating') return item.status === 'negotiating';
    if (inquiryFilter === 'confirmed') return item.status === 'confirmed';
    return true;
  });

  return (
    <div className="pb-20">
      <Header title={isHi ? 'डैशबोर्ड' : 'Dashboard'} />
      <div className="p-4 space-y-4">
        {/* SIH Demonstration Ecosystem Bar */}
        <div 
          onClick={() => navigate('/demo-hub')}
          className="bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-emerald-500/15 border border-amber-400/40 rounded-2xl p-3.5 flex items-center justify-between gap-2 cursor-pointer hover:border-amber-400 transition-all shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl shrink-0">🇮🇳</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-900">SIH 2026 Demo Ecosystem</span>
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  10 Scenarios
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                52 Artisans • 104 Products • 32 Buyers • 382 Matches • ₹24.8L GMV
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-0.5 shrink-0">
            Open Hub <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Verified Digital Artisan ID & Scannable QR Card */}
        <div 
          onClick={() => navigate(`/seller/${state.artisan.id || 'artisan-1'}`)}
          className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 text-white shadow-lg border border-slate-800 cursor-pointer hover:border-indigo-500 transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            {dashboardQr ? (
              <div className="bg-white p-1 rounded-xl shrink-0 shadow-md">
                <img src={dashboardQr} alt="Seller QR" className="w-16 h-16 object-contain" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                <QrCode className="w-8 h-8 text-amber-400" />
              </div>
            )}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {isHi ? 'प्रमाणित डिजिटल पहचान' : 'Verified Artisan Digital ID'}
              </div>
              <h3 className="font-bold text-sm truncate text-white">
                {state.artisan.name} • {state.artisan.craft}
              </h3>
              <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                <span>{isHi ? 'स्कैन करें व पूर्ण प्रोफाइल देखें' : 'Scan or tap to view full ID profile'}</span>
                <ExternalLink className="w-2.5 h-2.5 text-indigo-400" />
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>

        {/* ========================================================= */}
        {/* THE FOUR INTERACTIVE METRIC CARDS                        */}
        {/* Clicking any card opens its detailed modal                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 gap-4">
          {/* 1. Active Listings Card */}
          <Card 
            onClick={() => setActiveModal('listings')}
            className="border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all active:scale-[0.98] group relative"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium group-hover:text-blue-600 transition-colors">
                    {isHi ? 'सक्रिय लिस्टिंग' : 'Active Listings'}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{state.artisan.activeListings || 12}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                <span>{isHi ? 'सभी देखें' : 'View all'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* 2. Inquiries Card */}
          <Card 
            onClick={() => setActiveModal('inquiries')}
            className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all active:scale-[0.98] group relative"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium group-hover:text-green-600 transition-colors">
                    {isHi ? 'पूछताछ' : 'Inquiries'}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{state.artisan.inquiriesReceived || 18}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <MessageSquare className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-green-600 font-semibold">
                <span>{isHi ? 'विवरण खोलें' : 'Open details'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* 3. Monthly Revenue Card */}
          <Card 
            onClick={() => setActiveModal('revenue')}
            className="border-l-4 border-l-orange-500 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all active:scale-[0.98] group relative"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium group-hover:text-orange-600 transition-colors">
                    {isHi ? 'मासिक आय' : 'Monthly Revenue'}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{formatCurrency(state.artisan.monthlyRevenue || 48600)}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                  <IndianRupee className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-orange-600 font-semibold">
                <span>{isHi ? 'आय विवरण' : 'Earnings details'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </CardContent>
          </Card>

          {/* 4. Profit Margin Card */}
          <Card 
            onClick={() => setActiveModal('margin')}
            className="border-l-4 border-l-purple-500 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all active:scale-[0.98] group relative"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium group-hover:text-purple-600 transition-colors">
                    {isHi ? 'लाभ मार्जिन' : 'Profit Margin'}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{state.artisan.profitMargin || 35.8}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-purple-600 font-semibold">
                <span>{isHi ? 'मार्जिन विश्लेषण' : 'Margin analysis'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Product Button */}
        <Button 
          className="w-full h-16 text-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white shadow-lg flex items-center justify-center gap-2"
          onClick={() => navigate('/add-product')}
        >
          <Camera size={24} />
          <Mic size={24} />
          <span>{isHi ? '🎙️ नया प्रोडक्ट जोड़ें' : '🎙️ Add New Product'}</span>
        </Button>

        {/* Recent Products */}
        <div>
          <h2 className="text-xl font-semibold mb-3">{isHi ? 'हाल के प्रोडक्ट' : 'Recent Products'}</h2>
          <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
            {state.products?.map((product: any, idx: number) => (
              <Card key={idx} className="min-w-[160px] flex-shrink-0">
                <div className="w-full h-32 bg-gradient-to-br from-orange-200 to-amber-100 rounded-t-lg flex items-center justify-center">
                  <span className="text-sm text-orange-800 font-medium px-2 text-center">{isHi ? product.titleHi : product.titleEn}</span>
                </div>
                <CardContent className="p-2">
                  <p className="font-semibold truncate text-sm">{isHi ? product.titleHi : product.titleEn}</p>
                  <p className="text-sm text-gray-600">{formatCurrency(product.pricing?.price || 0)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-3">{isHi ? 'त्वरित कार्रवाई' : 'Quick Actions'}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/studio')}>
              <ImageIcon className="text-blue-500" />
              <span>AI Studio</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/economics')}>
              <BarChart2 className="text-green-500" />
              <span>Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/market-match')}>
              <Briefcase className="text-purple-500" />
              <span>Market Match</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigate('/buyer-marketplace')}>
              <Store className="text-orange-500" />
              <span>Marketplace</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. DETAIL MODAL: ACTIVE LISTINGS (8 ITEMS)                */}
      {/* ========================================================= */}
      <Dialog open={activeModal === 'listings'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4">
          <DialogHeader className="text-left flex flex-col items-start border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-slate-900">
                    {isHi ? `सक्रिय उत्पाद लिस्टिंग (${activeListingsData.length})` : `Active Catalog Listings (${activeListingsData.length})`}
                  </DialogTitle>
                  <p className="text-xs text-slate-500">
                    {isHi ? 'सत्यापित हस्तशिल्प इन्वेंटरी और थोक मूल्य' : 'Verified Artisan B2B Inventory & Pricing'}
                  </p>
                </div>
              </div>
              <DialogClose onClick={() => setActiveModal(null)} />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 mt-3 pt-2">
              <button 
                onClick={() => setListingFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${listingFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All ({activeListingsData.length})
              </button>
              <button 
                onClick={() => setListingFilter('in_stock')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${listingFilter === 'in_stock' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                In Stock ({activeListingsData.filter(x => x.status === 'in_stock').length})
              </button>
              <button 
                onClick={() => setListingFilter('made_to_order')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${listingFilter === 'made_to_order' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Made to Order ({activeListingsData.filter(x => x.status === 'made_to_order').length})
              </button>
            </div>
          </DialogHeader>

          {/* Listings Items */}
          <div className="space-y-3">
            {filteredListings.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 transition-all flex gap-3 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                  <img src={item.imageUrl} alt={item.titleEn} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                    {item.giTagged && (
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        GI Tagged
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 truncate leading-snug">
                    {isHi ? item.titleHi : item.titleEn}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>{item.materials}</span>
                    <span>•</span>
                    <span>{item.laborHours}h labor</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.status === 'in_stock' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {item.status === 'in_stock' ? `In Stock: ${item.stock}` : 'Made to Order'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
              onClick={() => {
                setActiveModal(null);
                navigate('/add-product');
              }}
            >
              <Plus className="w-4 h-4" /> Add New Listing
            </Button>
            <Button 
              variant="outline"
              className="flex-1 rounded-xl text-xs font-semibold py-2.5 border-slate-200"
              onClick={() => {
                setActiveModal(null);
                navigate('/catalog');
              }}
            >
              <Eye className="w-4 h-4" /> Open Full Catalog
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 2. DETAIL MODAL: INQUIRIES (14 INQUIRIES)                  */}
      {/* ========================================================= */}
      <Dialog open={activeModal === 'inquiries'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4">
          <DialogHeader className="text-left flex flex-col items-start border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-slate-900">
                    {isHi ? `खरीदार पूछताछ (${inquiriesData.length})` : `B2B Inquiries & Leads (${inquiriesData.length})`}
                  </DialogTitle>
                  <p className="text-xs text-slate-500">
                    {isHi ? 'थोक खरीदारों और बुटीक से सीधे ऑर्डर प्रस्ताव' : 'Direct Wholesale & Boutique Purchasing Requests'}
                  </p>
                </div>
              </div>
              <DialogClose onClick={() => setActiveModal(null)} />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 mt-3 pt-2">
              <button 
                onClick={() => setInquiryFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${inquiryFilter === 'all' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All ({inquiriesData.length})
              </button>
              <button 
                onClick={() => setInquiryFilter('new')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${inquiryFilter === 'new' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                New Action ({inquiriesData.filter(x => x.status === 'new').length})
              </button>
              <button 
                onClick={() => setInquiryFilter('negotiating')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${inquiryFilter === 'negotiating' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                In Discussion ({inquiriesData.filter(x => x.status === 'negotiating').length})
              </button>
              <button 
                onClick={() => setInquiryFilter('confirmed')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${inquiryFilter === 'confirmed' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Confirmed PO ({inquiriesData.filter(x => x.status === 'confirmed').length})
              </button>
            </div>
          </DialogHeader>

          {/* Pipeline Total Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Estimated Pipeline Value</span>
              <div className="text-lg font-black text-emerald-950">₹{inquiriesData.reduce((sum, i) => sum + i.estValue, 0).toLocaleString('en-IN')}</div>
            </div>
            <div className="text-right">
              <span className="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                100% Direct to Artisan
              </span>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="space-y-3">
            {filteredInquiries.map((inq) => (
              <div key={inq.id} className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-slate-900">{inq.buyerName}</h4>
                      <span className="text-[10px] text-slate-400">• {inq.location}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {inq.buyerOrg}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inq.status === 'new' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : inq.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {inq.status === 'new' ? 'New Inquiry' : inq.status === 'confirmed' ? 'Confirmed PO' : 'In Discussion'}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="text-[10px] text-slate-400">Product Inquired</div>
                    <div className="font-semibold text-slate-800 truncate">{inq.productName}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-400">{inq.quantity} units</div>
                    <div className="font-bold text-slate-900">₹{inq.estValue.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 italic bg-slate-100/50 p-2 rounded-lg border border-slate-200/50">
                  "{inq.notes}"
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inq.timeline}</span>
                  <button 
                    onClick={() => {
                      setActiveModal(null);
                      navigate('/buyer-marketplace');
                    }}
                    className="text-green-700 font-bold hover:underline flex items-center gap-0.5"
                  >
                    Respond to Buyer <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
              onClick={() => {
                setActiveModal(null);
                navigate('/market-match');
              }}
            >
              <Briefcase className="w-4 h-4" /> Open Full B2B Marketplace
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 3. DETAIL MODAL: MONTHLY REVENUE (₹42,500)                 */}
      {/* ========================================================= */}
      <Dialog open={activeModal === 'revenue'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4">
          <DialogHeader className="text-left flex flex-col items-start border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-slate-900">
                    {isHi ? `मासिक आय विवरण (${formatCurrency(state.artisan.monthlyRevenue || 48600)})` : `Monthly Revenue Breakdown (${formatCurrency(state.artisan.monthlyRevenue || 48600)})`}
                  </DialogTitle>
                  <p className="text-xs text-slate-500">
                    {isHi ? 'सितंबर 2026 • सीधा बैंक खाता हस्तांतरण (DBT)' : 'September 2026 • Direct Artisan Bank Transfer'}
                  </p>
                </div>
              </div>
              <DialogClose onClick={() => setActiveModal(null)} />
            </div>
          </DialogHeader>

          {/* Hero Revenue Card */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-4 text-white shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-orange-100">Total Net Payout Received</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-200" /> +54.2% Growth
              </span>
            </div>
            <div className="text-3xl font-black">{formatCurrency(state.artisan.monthlyRevenue || 48600)}</div>
            <div className="pt-2 border-t border-white/20 text-xs text-orange-100 flex items-center justify-between">
              <span>Production Cost: {formatCurrency(Math.round((state.artisan.monthlyRevenue || 48600) * (1 - (state.artisan.profitMargin || 35.8) / 100)))}</span>
              <span className="font-bold text-emerald-200">Net Profit: {formatCurrency(Math.round((state.artisan.monthlyRevenue || 48600) * ((state.artisan.profitMargin || 35.8) / 100)))} ({state.artisan.profitMargin || 35.8}%)</span>
            </div>
          </div>

          {/* Breakdown By Product */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Revenue Sources This Month:
            </h4>
            <div className="space-y-2">
              {activeListingsData.slice(0, 2).map((item, idx) => {
                const count = idx === 0 ? 12 : 5;
                const pct = idx === 0 ? 75 : 20;
                const rev = Math.round((state.artisan.monthlyRevenue || 48600) * (pct / 100));
                return (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{count} × {isHi ? item.titleHi : item.titleEn}</div>
                      <div className="text-[10px] text-slate-500">B2B Wholesale ({idx === 0 ? 'Heritage Wholesale Buyer' : 'Boutique Collection'})</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{formatCurrency(rev)}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">{pct}% share</div>
                    </div>
                  </div>
                );
              })}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Custom Sampling & Craft Consultation</div>
                  <div className="text-[10px] text-slate-500">Regional Craft Verification Hub</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{formatCurrency(Math.round((state.artisan.monthlyRevenue || 48600) * 0.05))}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">5% share</div>
                </div>
              </div>
            </div>
          </div>

          {/* Month Trend Mini-Table */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="font-bold text-slate-800 text-[11px] mb-1">6 Months Consistent Growth:</div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-[10px] text-slate-600">
              <div className="p-1.5 bg-white rounded border text-center">Apr: ₹18.5k</div>
              <div className="p-1.5 bg-white rounded border text-center">May: ₹22k</div>
              <div className="p-1.5 bg-white rounded border text-center">Jun: ₹19.5k</div>
              <div className="p-1.5 bg-white rounded border text-center">Jul: ₹27k</div>
              <div className="p-1.5 bg-white rounded border text-center">Aug: ₹31.5k</div>
              <div className="p-1.5 bg-orange-50 text-orange-700 font-bold rounded border border-orange-200 text-center">Sep: ₹48.6k</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
              onClick={() => {
                setActiveModal(null);
                navigate('/economics');
              }}
            >
              <BarChart2 className="w-4 h-4" /> View Full Economics & P&L Statement
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 4. DETAIL MODAL: PROFIT MARGIN (35.8%)                     */}
      {/* ========================================================= */}
      <Dialog open={activeModal === 'margin'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4">
          <DialogHeader className="text-left flex flex-col items-start border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-base font-bold text-slate-900">
                    {isHi ? 'लाभ मार्जिन विश्लेषण (35.8%)' : 'Profit Margin Economics (35.8%)'}
                  </DialogTitle>
                  <p className="text-xs text-slate-500">
                    {isHi ? 'पारदर्शी आर्थिक लाभ व लागत वितरण' : 'Direct Fair-Wage Margin & Cost Breakdown'}
                  </p>
                </div>
              </div>
              <DialogClose onClick={() => setActiveModal(null)} />
            </div>
          </DialogHeader>

          {/* Visual Margin Bar */}
          <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-md space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-purple-300 font-semibold">Economic Distribution of Selling Price</span>
              <span className="font-bold text-lg text-emerald-400">35.8% Net Profit</span>
            </div>

            {/* Segmented Bar */}
            <div className="h-4 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: '40%' }} className="bg-amber-400" title="Raw Materials (40%)"></div>
              <div style={{ width: '24.2%' }} className="bg-blue-400" title="Artisan Labor Wages (24.2%)"></div>
              <div style={{ width: '35.8%' }} className="bg-emerald-400" title="Net Artisan Profit (35.8%)"></div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-300 pt-1">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span>Materials (40%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Fair Labor (24.2%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Net Margin (35.8%)</span>
              </div>
            </div>
          </div>

          {/* Comparison Card: Middlemen vs KarigarSetu Direct */}
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2.5 text-xs">
            <div className="font-bold text-purple-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Direct B2B vs Middlemen Comparison
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-white rounded-xl border border-rose-200">
                <div className="text-rose-600 font-bold">Traditional Middlemen</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">8% - 12%</div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Traders take 55-65% markups; weaver barely recovers yarn costs.
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-200">
                <div className="text-emerald-700 font-bold">KarigarSetu Direct B2B</div>
                <div className="text-xl font-black text-emerald-600 mt-0.5">34% Profit</div>
                <div className="text-[10px] text-slate-400 mt-1">
                  + ₹150/hr labor wage protected. Zero commission taken from artisan.
                </div>
              </div>
            </div>
          </div>

          {/* Key Drivers */}
          <div className="space-y-2 text-xs text-slate-700">
            <div className="font-bold text-slate-800 text-[11px]">Why You Earn 34% Margins:</div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>AI Dynamic Pricing Engine:</strong> Formulates true B2B market rates rather than undercutting fair wages.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>GI Certification Premium:</strong> Verified authentic handloom products command 20-25% higher B2B price realization.</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
              onClick={() => {
                setActiveModal(null);
                navigate('/pricing');
              }}
            >
              <TrendingUp className="w-4 h-4" /> Recalculate Pricing
            </Button>
            <Button 
              variant="outline"
              className="flex-1 rounded-xl text-xs font-semibold py-2.5 border-slate-200"
              onClick={() => {
                setActiveModal(null);
                navigate('/economics');
              }}
            >
              <BarChart2 className="w-4 h-4" /> View Economics
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
