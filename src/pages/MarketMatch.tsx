import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Mail, 
  FileText, 
  Send, 
  AlertTriangle, 
  Truck, 
  Layers, 
  Filter,
  CheckCircle2,
  Package
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { createInquiry } from '@/lib/api';

interface BuyerItem {
  id: string;
  companyName: string;
  authorizedPerson: string;
  phone: string;
  email: string;
  category: string;
  address: string;
  gstin: string;
  pan: string;
  typicalOrder: string;
  trustScore: number;
  notes: string;
}

interface MarketMatchItem {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanCraft: string;
  artisanLocation: string;
  buyerId: string;
  buyerName: string;
  buyerCategory: string;
  buyerCity: string;
  compatibilityScore: number;
  scoreBreakdown: {
    craftMatch: number;
    capacityCompatibility: number;
    priceAlignment: number;
    logisticsCorridor: number;
  };
  capacityMismatchWarning?: string;
  logisticsCorridor: {
    route: string;
    estimatedDays: number;
    freightBand: string;
  };
  recommendedInquiryQuantity: number;
  estimatedOrderValue: number;
}

export default function MarketMatch() {
  const { state, addProduct, addToast } = useApp();
  const navigate = useNavigate();
  const isHi = state.language === 'hi';

  const [matches, setMatches] = useState<MarketMatchItem[]>([]);
  const [buyersMap, setBuyersMap] = useState<Record<string, BuyerItem>>({});
  const [matchScope, setMatchScope] = useState<'active' | 'all'>('active');
  const [minScore, setMinScore] = useState<number>(70);
  const [loading, setLoading] = useState(false);

  // Modals
  const [selectedBuyerForProfile, setSelectedBuyerForProfile] = useState<BuyerItem | null>(null);
  const [selectedMatchForContact, setSelectedMatchForContact] = useState<MarketMatchItem | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [sampleOffered, setSampleOffered] = useState(true);
  const [contactSent, setContactSent] = useState(false);

  // Fetch Buyers Directory
  useEffect(() => {
    fetch('/api/buyers/all')
      .then(res => res.json())
      .then(data => {
        if (data.buyers && Array.isArray(data.buyers)) {
          const map: Record<string, BuyerItem> = {};
          data.buyers.forEach((b: any) => { map[b.id] = b; });
          setBuyersMap(map);
        }
      })
      .catch(console.warn);
  }, []);

  // Fetch Matches based on active artisan or all
  useEffect(() => {
    setLoading(true);
    const artisanParam = matchScope === 'active' ? `artisanId=${state.artisan.id}&` : '';
    const url = `/api/market-matches?${artisanParam}minScore=${minScore}&limit=40`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.matches && Array.isArray(data.matches)) {
          setMatches(data.matches);
        }
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [state.artisan.id, matchScope, minScore]);

  const handlePublish = () => {
    const newProd = {
      id: `p-${Date.now()}`,
      titleEn: state.currentProduct?.catalog?.en?.title || `${state.artisan.craft} Artisan Masterwork`,
      titleHi: state.currentProduct?.catalog?.hi?.title || `हस्तनिर्मित ${state.artisan.craft} उत्पाद`,
      descriptionEn: state.currentProduct?.catalog?.en?.description || `Authentic handcrafted ${state.artisan.craft} creation by ${state.artisan.name}`,
      descriptionHi: state.currentProduct?.catalog?.hi?.description || `${state.artisan.name} द्वारा हस्तनिर्मित प्रामाणिक ${state.artisan.craft}`,
      enhancedImage: state.currentProduct?.enhancedImage || state.products?.[0]?.enhancedImage || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      attributes: { craft: state.artisan.craft },
      tags: [state.artisan.craft.toLowerCase(), 'handcrafted', 'gi-certified', 'b2b'],
      pricing: state.currentProduct?.pricing || { price: state.products?.[0]?.pricing?.price || 3500 },
      status: 'active',
      createdAt: new Date().toISOString()
    };
    addProduct(newProd);
    addToast(isHi ? 'उत्पाद प्रकाशित किया गया!' : 'Product Published!');
    navigate('/buyer-marketplace');
  };

  const handleSendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchForContact) return;

    try {
      await createInquiry({
        productId: state.products[0]?.id || 'p1',
        buyerName: selectedMatchForContact.buyerName,
        buyerOrg: selectedMatchForContact.buyerName,
        quantity: selectedMatchForContact.recommendedInquiryQuantity || 25,
        timeline: `${selectedMatchForContact.logisticsCorridor?.estimatedDays || 3} to 5 days express`,
        notes: contactMessage || `Artisan proposal for ${selectedMatchForContact.artisanCraft}. Sample Offer: ${sampleOffered ? 'Free QC Swatch Included' : 'Standard Catalog'}`
      });
      setContactSent(true);
      addToast(isHi ? 'प्रस्ताव सफलतापूर्वक भेजा गया!' : 'Proposal Sent to Buyer!');
      setTimeout(() => {
        setSelectedMatchForContact(null);
        setContactSent(false);
        setContactMessage('');
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen text-slate-900">
      <Header compact title={isHi ? 'B2B खरीदार मैचिंग' : 'B2B Buyer Matching'} />
      <div className="p-4 space-y-4 max-w-xl mx-auto">
        
        {/* Active Product / Artisan Highlight Banner */}
        <Card className="flex overflow-hidden bg-white shadow-xs border-slate-200">
          <img 
            src={state.currentProduct?.enhancedImage || state.products[0]?.enhancedImage || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'} 
            alt="Product" 
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover bg-slate-100 shrink-0" 
          />
          <CardContent className="p-3 flex-1 flex flex-col justify-center min-w-0">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
              {isHi ? 'सक्रिय कारीगर संदर्भ' : 'Active Artisan Context'}
            </span>
            <h3 className="font-bold text-sm text-slate-900 truncate">
              {state.artisan.name} • {state.artisan.craft}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {state.artisan.location} • GI Tag Verified
            </p>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-Factor Compatibility Engine Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Filter Controls: Scope & Min Score */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              Match Scope & Scoring
            </span>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
              {matches.length} Matches Found
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMatchScope('active')}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                matchScope === 'active'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              For {state.artisan.name.split(' ')[0]}
            </button>
            <button
              type="button"
              onClick={() => setMatchScope('all')}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                matchScope === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Platform (382)
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-500 text-[11px]">Min Compatibility:</span>
            <div className="flex gap-1.5">
              {[70, 80, 90].map(score => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setMinScore(score)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                    minScore === score
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {score}%+
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-6 text-xs text-slate-500">
            Evaluating multi-factor compatibility scores...
          </div>
        )}

        {/* Matches List */}
        {!loading && (
          <div className="space-y-3">
            {matches.map((m) => {
              const fullBuyer = buyersMap[m.buyerId] || {
                id: m.buyerId,
                companyName: m.buyerName,
                authorizedPerson: 'Procurement Lead',
                phone: '+91 98110 XXXXX',
                email: 'sourcing@company.in',
                category: m.buyerCategory,
                address: m.buyerCity,
                gstin: '07AAACA1234F1Z8',
                pan: 'AAACA1234F',
                typicalOrder: `${m.recommendedInquiryQuantity} units`,
                trustScore: 94,
                notes: `Curates authentic ${m.artisanCraft} for wholesale distribution.`
              };

              const scoreColor = m.compatibilityScore >= 90
                ? 'border-l-emerald-500 bg-emerald-50 text-emerald-700 border-emerald-200'
                : m.compatibilityScore >= 80
                ? 'border-l-blue-500 bg-blue-50 text-blue-700 border-blue-200'
                : 'border-l-amber-500 bg-amber-50 text-amber-700 border-amber-200';

              return (
                <Card 
                  key={m.id} 
                  className={`border-l-4 ${m.compatibilityScore >= 90 ? 'border-l-emerald-500' : 'border-l-blue-500'} bg-white shadow-xs hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-4 space-y-3">
                    {/* Top Row: Buyer Name, City & Compatibility Score */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5 truncate">
                          <span>{m.buyerName}</span>
                          <span title="Verified B2B Buyer">
                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {m.buyerCategory} • {m.buyerCity}
                        </p>
                        {matchScope === 'all' && (
                          <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                            Artisan: {m.artisanName} ({m.artisanCraft}, {m.artisanLocation})
                          </p>
                        )}
                      </div>

                      <div className={`border font-black px-2.5 py-1 rounded-xl text-xs shrink-0 text-center ${scoreColor}`}>
                        <div className="text-[9px] uppercase font-semibold">Match</div>
                        <div>{m.compatibilityScore}%</div>
                      </div>
                    </div>

                    {/* Multi-Factor Score Breakdown */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Multi-Factor Scoring Breakdown:
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                        <div className="bg-white p-1 rounded-md border border-slate-200">
                          <div className="text-slate-400">Craft</div>
                          <div className="font-bold text-indigo-700">{m.scoreBreakdown.craftMatch}/35</div>
                        </div>
                        <div className="bg-white p-1 rounded-md border border-slate-200">
                          <div className="text-slate-400">Capacity</div>
                          <div className="font-bold text-emerald-700">{m.scoreBreakdown.capacityCompatibility}/25</div>
                        </div>
                        <div className="bg-white p-1 rounded-md border border-slate-200">
                          <div className="text-slate-400">Price</div>
                          <div className="font-bold text-blue-700">{m.scoreBreakdown.priceAlignment}/20</div>
                        </div>
                        <div className="bg-white p-1 rounded-md border border-slate-200">
                          <div className="text-slate-400">Logistics</div>
                          <div className="font-bold text-purple-700">{m.scoreBreakdown.logisticsCorridor}/20</div>
                        </div>
                      </div>
                    </div>

                    {/* Capacity Mismatch Early Warning (if applicable) */}
                    {m.capacityMismatchWarning && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2.5 text-[11px] flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-amber-950">Capacity Advisory: </strong>
                          {m.capacityMismatchWarning}
                        </div>
                      </div>
                    )}

                    {/* Logistics Corridor Route */}
                    {m.logisticsCorridor && (
                      <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                        <span className="flex items-center gap-1 truncate">
                          <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{m.logisticsCorridor.route}</span>
                        </span>
                        <span className="font-mono text-slate-500 shrink-0 font-medium">
                          {m.logisticsCorridor.estimatedDays} days
                        </span>
                      </div>
                    )}

                    {/* Suggested Batch & Estimated Value */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500">
                        Rec. Batch: <strong>{m.recommendedInquiryQuantity} pcs</strong>
                      </span>
                      <span className="font-mono font-bold text-indigo-700 text-xs">
                        Est. ₹{m.estimatedOrderValue?.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                        onClick={() => {
                          setSelectedMatchForContact(m);
                          setContactSent(false);
                        }}
                      >
                        <Send className="w-3 h-3" />
                        <span>{isHi ? 'प्रस्ताव भेजें' : 'Send Proposal'}</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-xl border-slate-200 cursor-pointer"
                        onClick={() => setSelectedBuyerForProfile(fullBuyer)}
                      >
                        <span>{isHi ? 'खरीदार प्रोफ़ाइल' : 'Buyer Profile'}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Button 
          className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer"
          onClick={handlePublish}
        >
          {isHi ? 'मार्केटप्लेस में प्रकाशित करें' : 'Publish to B2B Marketplace'}
        </Button>
      </div>

      {/* ========================================================= */}
      {/* 1. BUYER PROFILE MODAL                                     */}
      {/* ========================================================= */}
      <Dialog open={!!selectedBuyerForProfile} onOpenChange={(open) => !open && setSelectedBuyerForProfile(null)}>
        <DialogContent className="sm:max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {selectedBuyerForProfile && (
            <>
              <DialogHeader className="text-left border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{selectedBuyerForProfile.companyName}</span>
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </DialogTitle>
                      <DialogDescription className="text-xs text-slate-500">
                        {selectedBuyerForProfile.category} • Verified Sourcing Partner
                      </DialogDescription>
                    </div>
                  </div>
                  <DialogClose onClick={() => setSelectedBuyerForProfile(null)} />
                </div>
              </DialogHeader>

              {/* Status Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Buyer Trust Score: {selectedBuyerForProfile.trustScore}/100</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  Demo Verification
                </span>
              </div>

              {/* Verified Details */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Authorized Contact:</span>
                    <strong className="text-slate-900">{selectedBuyerForProfile.authorizedPerson}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Headquarters / Hub:</span>
                    <strong className="text-slate-900">{selectedBuyerForProfile.address}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Typical Order Size:</span>
                    <strong className="text-indigo-600">{selectedBuyerForProfile.typicalOrder}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verified GSTIN:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedBuyerForProfile.gstin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PAN Record:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedBuyerForProfile.pan}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Sourcing Mandate & Craft Notes:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{selectedBuyerForProfile.notes}"
                  </p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold py-2.5 cursor-pointer"
                  onClick={() => {
                    const foundMatch = matches.find(m => m.buyerId === selectedBuyerForProfile.id);
                    if (foundMatch) setSelectedMatchForContact(foundMatch);
                    setSelectedBuyerForProfile(null);
                  }}
                >
                  <Send className="w-3.5 h-3.5 mr-1" /> Send Quotation / Proposal
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-xl text-xs font-semibold px-4 border-slate-200 cursor-pointer"
                  onClick={() => setSelectedBuyerForProfile(null)}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ========================================================= */}
      {/* 2. CONTACT BUYER MODAL                                     */}
      {/* ========================================================= */}
      <Dialog open={!!selectedMatchForContact} onOpenChange={(open) => !open && setSelectedMatchForContact(null)}>
        <DialogContent className="sm:max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-5 space-y-4">
          {selectedMatchForContact && (
            <>
              <DialogHeader className="text-left border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <DialogTitle className="text-base font-bold text-slate-900">
                      {isHi ? 'खरीदार को प्रस्ताव भेजें' : 'Send B2B Proposal'}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500">
                      To: {selectedMatchForContact.buyerName} ({selectedMatchForContact.buyerCity})
                    </DialogDescription>
                  </div>
                  <DialogClose onClick={() => setSelectedMatchForContact(null)} />
                </div>
              </DialogHeader>

              {contactSent ? (
                <div className="py-8 text-center space-y-2">
                  <div className="text-4xl">🎉</div>
                  <h4 className="font-bold text-sm text-emerald-700">Proposal Transmitted!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Your wholesale quotation and sample availability have been transmitted to {selectedMatchForContact.buyerName}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendContact} className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Recommended Batch Size:
                    </label>
                    <Input 
                      defaultValue={`${selectedMatchForContact.recommendedInquiryQuantity} units (Compatible Volume)`} 
                      className="bg-slate-50 text-xs font-bold" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Estimated Order Value:
                    </label>
                    <Input 
                      defaultValue={`₹${selectedMatchForContact.estimatedOrderValue?.toLocaleString('en-IN')} (Floor Protected Wholesale)`} 
                      className="bg-slate-50 text-xs font-bold text-emerald-700" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Message / Special Customization Note:
                    </label>
                    <textarea 
                      rows={3} 
                      placeholder="e.g., We can provide GI-certified handloom weave in 4 colorways with custom packaging."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
                    <input 
                      type="checkbox" 
                      id="sampleChk" 
                      checked={sampleOffered} 
                      onChange={(e) => setSampleOffered(e.target.checked)}
                      className="rounded text-indigo-600" 
                    />
                    <label htmlFor="sampleChk" className="cursor-pointer font-medium">
                      Offer Free Fabric/Clay Swatch Sample for QC verification
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-2.5 shadow-sm cursor-pointer"
                  >
                    Submit Proposal to {selectedMatchForContact.buyerName}
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
