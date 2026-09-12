import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { createInquiry } from '@/lib/api';
import { Search, ShieldCheck, ExternalLink, Sparkles, Package, Layers, CheckCircle2 } from 'lucide-react';

const DEFAULT_CRAFT_CATEGORIES = [
  'All Crafts',
  'Paintings & Folk Art',
  'Metal Handicrafts',
  'Woodcraft & Furniture',
  'Brass & Bell Metal',
  'Handloom Silk & Sarees',
  'Sambalpuri Ikat',
  'Block Print & Textiles',
  'Pottery & Ceramics',
  'Terracotta',
  'Pashmina & Woolens',
  'Leather Craft',
  'Bamboo & Cane',
  'Dhokra Metal Art'
];

const PRICE_BRACKETS = [
  { id: 'all', label: 'All Prices' },
  { id: '1', label: 'Under ₹1,000' },
  { id: '2', label: '₹1,000 – ₹5,000' },
  { id: '3', label: '₹5,000 – ₹15,000' },
  { id: '4', label: '₹15,000+' }
];

export default function BuyerMarketplace() {
  const { state, addToast, incrementInquiries } = useApp();
  const navigate = useNavigate();
  const isHi = state.language === 'hi';

  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedBracket, setSelectedBracket] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Form states
  const [buyerName, setBuyerName] = useState('Ananya Sharma');
  const [buyerOrg, setBuyerOrg] = useState('Ananya Home Collective');
  const [quantity, setQuantity] = useState('25');
  const [deliveryTimeline, setDeliveryTimeline] = useState('Delivery: 3 Weeks');
  const [requestSample, setRequestSample] = useState(true);
  const [notes, setNotes] = useState('Interested in 25 units wholesale batch. Please include material swatch with sample.');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(err => {
        console.warn('Using context products:', err);
      });
  }, []);

  const effectiveProducts = products.length > 0 ? products : state.products;

  // Extract unique states for filter
  const uniqueStates = ['All States', ...Array.from(new Set(effectiveProducts.map(p => p.artisanState || p.origin).filter(Boolean))).sort()];

  const filteredProducts = effectiveProducts.filter(prod => {
    const title = (prod.name || prod.titleEn || prod.title || '').toLowerCase();
    const craft = (prod.craftType || prod.craftCategory || prod.category || '').toLowerCase();
    const material = (prod.material || prod.materials || '').toLowerCase();
    const origin = (prod.artisanLocation || prod.origin || '').toLowerCase();
    const artName = (prod.artisanName || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesQuery = !query || title.includes(query) || craft.includes(query) || material.includes(query) || origin.includes(query) || artName.includes(query);
    
    const matchesCategory = selectedCategory === 'All Crafts' || 
      craft.includes(selectedCategory.toLowerCase()) || 
      title.includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Paintings & Folk Art' && (craft.includes('painting') || craft.includes('art'))) ||
      (selectedCategory === 'Metal Handicrafts' && (craft.includes('metal') || craft.includes('dokra') || craft.includes('brass') || craft.includes('iron'))) ||
      (selectedCategory === 'Woodcraft & Furniture' && craft.includes('wood')) ||
      (selectedCategory === 'Handloom Silk & Sarees' && (craft.includes('silk') || craft.includes('saree') || craft.includes('handloom') || craft.includes('brocade'))) ||
      (selectedCategory === 'Block Print & Textiles' && (craft.includes('print') || craft.includes('textile') || craft.includes('embroidery')));

    const matchesState = selectedState === 'All States' || 
      (prod.artisanState && prod.artisanState.toLowerCase() === selectedState.toLowerCase()) ||
      (prod.origin && prod.origin.toLowerCase().includes(selectedState.toLowerCase()));

    let matchesBracket = true;
    const price = prod.price || prod.pricing?.price || 0;
    if (selectedBracket === '1') matchesBracket = price < 1000;
    else if (selectedBracket === '2') matchesBracket = price >= 1000 && price <= 5000;
    else if (selectedBracket === '3') matchesBracket = price > 5000 && price <= 15000;
    else if (selectedBracket === '4') matchesBracket = price > 15000;

    return matchesQuery && matchesCategory && matchesState && matchesBracket;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await createInquiry({
        productId: selectedProduct.id,
        buyerName: buyerName || 'Direct B2B Buyer',
        buyerOrg: buyerOrg || 'Artisan Procurement Partner',
        quantity: parseInt(quantity) || 25,
        timeline: deliveryTimeline,
        notes: `${notes || 'Bulk wholesale inquiry'} ${requestSample ? '(QC Swatch Sample Requested)' : ''}`
      });
      incrementInquiries();
      setSuccess(true);
      addToast('🎉 Bulk Inquiry Transmitted to Artisan Workspace!');
      setTimeout(() => {
        setSelectedProduct(null);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-28 bg-slate-50 min-h-screen text-slate-900">
      <Header compact title={isHi ? 'B2B खरीदार मार्केटप्लेस' : 'B2B Buyer Marketplace'} />
      <div className="p-4 space-y-4 max-w-xl mx-auto">
        
        {/* Marketplace Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Direct-from-Artisan B2B Wholesale
            </span>
            <span className="bg-blue-500/30 text-blue-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-400/30">
              Zero Middlemen
            </span>
          </div>
          <h2 className="text-base font-bold text-white">
            Curated GI Handicrafts & Handlooms
          </h2>
          <p className="text-xs text-slate-300">
            Source authentic creations directly from verified clusters across India with fair-price transparency.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Dokra, Madhubani, Walnut Wood, Brass, Silk..." 
            className="bg-white pl-9 rounded-xl border-slate-200 text-xs shadow-xs" 
          />
        </div>

        {/* Filter Controls: State & Price Brackets */}
        <div className="flex items-center gap-2">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="flex-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs focus:outline-none"
          >
            {uniqueStates.map(st => (
              <option key={st} value={st}>{st === 'All States' ? 'All States (26)' : st}</option>
            ))}
          </select>

          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
            {PRICE_BRACKETS.map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBracket(b.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedBracket === b.id
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Craft Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {DEFAULT_CRAFT_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Count Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>
            Showing <strong>{Math.min(visibleCount, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> items ({products.length} in catalog)
          </span>
          {(selectedCategory !== 'All Crafts' || selectedState !== 'All States' || selectedBracket !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All Crafts');
                setSelectedState('All States');
                setSelectedBracket('all');
                setSearchQuery('');
              }}
              className="text-blue-600 hover:underline font-bold text-[10px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {filteredProducts.slice(0, visibleCount).map((prod: any, idx: number) => {
            const price = prod.price || prod.pricing?.finalPrice || prod.pricing?.price || 3150;
            const title = prod.name || prod.titleEn || prod.title || 'Artisan Craft';
            const img = prod.imageUrl || prod.images?.[0] || prod.enhancedImage || prod.originalImage || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
            const craft = prod.craftType || prod.category || 'Handicrafts';
            const artisanName = prod.artisanName || 'Master Artisan';
            const location = prod.artisanLocation || prod.origin || 'India';

            return (
              <Card 
                key={prod.id || idx} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all relative bg-white border-slate-200 group rounded-2xl flex flex-col justify-between"
                onClick={() => setSelectedProduct(prod)}
              >
                <div>
                  <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> GI Tagged
                    </span>
                    {prod.artisanState && (
                      <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-1.5 py-0.5 rounded-md">
                        {prod.artisanState}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-3 space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block truncate">
                      {craft}
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-1 leading-snug">{title}</h3>
                    <p className="text-[10px] text-slate-500 truncate">
                      by <strong>{artisanName}</strong>
                    </p>
                    <div className="flex items-baseline justify-between pt-0.5">
                      <span className="text-blue-700 font-black text-sm">{formatCurrency(price)}</span>
                      <span className="text-[10px] text-slate-400">wholesale</span>
                    </div>
                  </CardContent>
                </div>

                <div className="px-3 pb-3 pt-0">
                  <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span>MOQ: {prod.minimumOrderQuantity || 10} pcs</span>
                    <span className="text-emerald-600 font-semibold">Ready Batch</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center pt-2">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="w-full bg-white border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 py-2.5 rounded-xl shadow-xs"
            >
              Load More Products ({filteredProducts.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* B2B INQUIRY & DETAIL MODAL                                 */}
      {/* ========================================================= */}
      <Dialog open={!!selectedProduct} onOpenChange={(o) => !o && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md mx-auto w-[92%] rounded-3xl bg-white p-5 space-y-4 max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader className="text-left border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {selectedProduct.craftType || 'Artisan Handicraft'}
                    </span>
                    <DialogTitle className="text-base font-bold text-slate-900">
                      {selectedProduct.name || selectedProduct.titleEn || 'Handcrafted Product'}
                    </DialogTitle>
                  </div>
                  <DialogClose onClick={() => setSelectedProduct(null)} />
                </div>
              </DialogHeader>
              
              {/* Product Photo & Fast Details */}
              <div className="space-y-3">
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src={selectedProduct.imageUrl || selectedProduct.images?.[0] || selectedProduct.enhancedImage || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'} 
                    alt="Product" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Artisan Trust Link */}
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-bold text-slate-900">Artisan: {selectedProduct.artisanName || state.artisan.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {selectedProduct.artisanLocation || selectedProduct.origin || state.artisan.location} • Pehchan: {selectedProduct.artisanPehchanId || selectedProduct.artisanId || state.artisan.id}
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => navigate(`/seller/${selectedProduct.artisanId || state.artisan.id || 'artisan-1'}`)}
                    className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>ID Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Wholesale Pricing Tiers Table */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      Tiered Wholesale Pricing
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">Floor Protected</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                    {selectedProduct.b2bPricingTiers && selectedProduct.b2bPricingTiers.length >= 3 ? (
                      selectedProduct.b2bPricingTiers.slice(0, 3).map((tier: any, tIdx: number) => (
                        <div key={tIdx} className={`p-2 bg-white rounded-xl border ${tIdx === 2 ? 'border-emerald-200' : tIdx === 1 ? 'border-blue-200' : 'border-slate-200'}`}>
                          <div className="text-[10px] text-slate-500">{tier.label || `${tier.min}-${tier.max || '+'} pcs`}</div>
                          <div className={`font-bold ${tIdx === 2 ? 'text-emerald-700' : tIdx === 1 ? 'text-blue-700' : 'text-slate-900'}`}>
                            ₹{tier.price}
                          </div>
                          <div className="text-[9px] text-slate-400">
                            {tier.discountPercent ? `${tier.discountPercent}% off` : 'Base Tier'}
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-2 bg-white rounded-xl border border-slate-200">
                          <div className="text-[10px] text-slate-500">1–9 pcs</div>
                          <div className="font-bold text-slate-900">₹{selectedProduct.price || 3150}</div>
                          <div className="text-[9px] text-slate-400">Sample</div>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-blue-200">
                          <div className="text-[10px] text-blue-600 font-semibold">10–24 pcs</div>
                          <div className="font-bold text-blue-700">₹{Math.round((selectedProduct.price || 3150) * 0.95)}</div>
                          <div className="text-[9px] text-blue-500 font-semibold">5% off</div>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-emerald-200">
                          <div className="text-[10px] text-emerald-600 font-semibold">25+ pcs</div>
                          <div className="font-bold text-emerald-700">₹{Math.round((selectedProduct.price || 3150) * 0.88)}</div>
                          <div className="text-[9px] text-emerald-500 font-semibold">12% off</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {success ? (
                <div className="py-8 text-center space-y-2">
                  <div className="text-4xl">🎉</div>
                  <h4 className="font-bold text-base text-emerald-700">Bulk Inquiry Logged!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Your wholesale order requirement has been sent directly to {state.artisan.name}. You will receive batch confirmation within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Submit B2B Bulk Purchasing Request:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      required 
                      placeholder="Buyer Contact Name" 
                      value={buyerName} 
                      onChange={(e) => setBuyerName(e.target.value)} 
                      className="text-xs bg-slate-50"
                    />
                    <Input 
                      required 
                      placeholder="Company / Brand" 
                      value={buyerOrg} 
                      onChange={(e) => setBuyerOrg(e.target.value)} 
                      className="text-xs bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-0.5">Required Quantity:</label>
                      <Input 
                        required 
                        type="number" 
                        placeholder="Quantity (pcs)" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="text-xs bg-slate-50 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-0.5">Fulfillment Timeline:</label>
                      <select 
                        value={deliveryTimeline}
                        onChange={(e) => setDeliveryTimeline(e.target.value)}
                        className="w-full h-9 rounded-md border border-slate-200 bg-slate-50 px-2 text-xs"
                      >
                        <option>Delivery: 2 Weeks (Sample)</option>
                        <option>Delivery: 3 Weeks</option>
                        <option>Delivery: 1 Month</option>
                        <option>Delivery: 2 Months (Export)</option>
                      </select>
                    </div>
                  </div>

                  <textarea 
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white resize-none" 
                    placeholder="Specific requirements, packaging, or customization notes..." 
                    rows={2} 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />

                  <div className="flex items-center gap-2 p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950">
                    <input 
                      type="checkbox" 
                      id="qcSample" 
                      checked={requestSample}
                      onChange={(e) => setRequestSample(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <label htmlFor="qcSample" className="cursor-pointer text-[11px] font-medium">
                      Request Material Swatch / QC Pre-production Sample
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs py-2.5 shadow-md cursor-pointer">
                    {isHi ? 'थोक पूछताछ भेजें' : 'Send B2B Wholesale Inquiry'}
                  </Button>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

