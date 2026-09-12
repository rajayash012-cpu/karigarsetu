import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  Check, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Layers, 
  Package, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle, 
  Search, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_DATASET, findArtisan, getArtisanImage } from '@/demoData';

interface Scenario {
  id: string;
  name: string;
  artisanId: string;
  artisanName: string;
  craft: string;
  state: string;
  productId: string;
  productName: string;
  bracket: string;
  buyerId: string;
  buyerName: string;
  buyerCategory: string;
  buyerCity: string;
  inquiryId: string;
  inquiryStatus: string;
  orderQuantity: number;
  orderValue: number;
  pitch: string;
  keyHighlight: string;
  recommendedJudgeQuestion: string;
}

interface ArtisanItem {
  id: string;
  pehchanId: string;
  giRegistrationNo: string;
  name: string;
  gender?: string;
  photo?: string;
  craft: string;
  location: string;
  state: string;
  cluster: string;
  specialization: string;
  capacityPerMonth: number;
  giCertified: boolean;
  shgMember: boolean;
  trustScore: number;
  rating: number;
}

export default function DemoScenarioExplorer({ isOpenExternal, onCloseExternal }: { isOpenExternal?: boolean; onCloseExternal?: () => void }) {
  const navigate = useNavigate();
  const { state, addToast, reloadArtisanProfile } = useApp();
  const isHi = state.language === 'hi';

  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal;
  const setIsOpen = (val: boolean) => {
    if (onCloseExternal && !val) onCloseExternal();
    setIsOpenInternal(val);
  };

  const [activeTab, setActiveTab] = useState<'scenarios' | 'artisans' | 'stats'>('scenarios');
  const [scenarios, setScenarios] = useState<any[]>(DEMO_DATASET.scenarios);
  const [artisans, setArtisans] = useState<any[]>(DEMO_DATASET.artisans);
  const [stats, setStats] = useState<any>(DEMO_DATASET.stats);
  const [activeArtisanId, setActiveArtisanId] = useState<string>(state.artisan.id || 'artisan-001');
  const [loadingScenarioId, setLoadingScenarioId] = useState<string | null>(null);

  // Search & Filters for Artisans
  const [artisanSearch, setArtisanSearch] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');

  // Load initial data & listen for global open event
  useEffect(() => {
    const handleOpenHub = () => setIsOpen(true);
    window.addEventListener('open-sih-demo-hub', handleOpenHub);

    fetch('/api/demo/scenarios')
      .then(res => res.json())
      .then(data => {
        if (data.scenarios) setScenarios(data.scenarios);
        if (data.activeArtisanId) setActiveArtisanId(data.activeArtisanId);
      })
      .catch(err => console.warn('Scenarios load error:', err));

    fetch('/api/artisan/all')
      .then(res => res.json())
      .then(data => {
        if (data.artisans) setArtisans(data.artisans);
      })
      .catch(err => console.warn('Artisans load error:', err));

    fetch('/api/demo/stats')
      .then(res => res.json())
      .then(data => {
        if (data.stats) setStats(data.stats);
      })
      .catch(err => console.warn('Stats load error:', err));
    return () => window.removeEventListener('open-sih-demo-hub', handleOpenHub);
  }, [isOpen]);

  const handleSwitchScenario = async (scenario: Scenario) => {
    setLoadingScenarioId(scenario.id);
    try {
      const res = await fetch('/api/demo/switch-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: scenario.id })
      });
      const data = await res.json();
      if (data.success) {
        setActiveArtisanId(scenario.artisanId);
        await reloadArtisanProfile();
        addToast({
          message: `✨ Scenario Activated: ${scenario.name} (${scenario.artisanName})`,
          type: 'celebration'
        });
      }
    } catch (err) {
      console.error(err);
      addToast({ message: 'Failed to switch scenario', type: 'error' });
    } finally {
      setLoadingScenarioId(null);
    }
  };

  const handleSwitchArtisan = async (artisan: ArtisanItem) => {
    try {
      const res = await fetch('/api/demo/switch-artisan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artisanId: artisan.id })
      });
      const data = await res.json();
      if (data.success) {
        setActiveArtisanId(artisan.id);
        await reloadArtisanProfile();
        addToast({
          message: `👨‍🎨 Active Artisan: ${artisan.name} (${artisan.craft}, ${artisan.state})`,
          type: 'success'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uniqueStates = ['All', ...Array.from(new Set(artisans.map(a => a.state).filter(Boolean))).sort()];

  const filteredArtisans = artisans.filter(a => {
    const q = artisanSearch.toLowerCase();
    const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.craft.toLowerCase().includes(q) || a.state.toLowerCase().includes(q) || (a.cluster && a.cluster.toLowerCase().includes(q));
    const matchesState = selectedStateFilter === 'All' || a.state === selectedStateFilter;
    return matchesQuery && matchesState;
  });

  return (
    <>
      {/* Floating Trigger Button on Bottom-Left */}
      {isOpenExternal === undefined && (
        <div className="fixed bottom-6 left-4 z-40 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 active:scale-95 border border-amber-400/40 text-xs font-bold hover:border-amber-400 cursor-pointer"
            title="SIH 2026 Demo Hub — 10 Curated Scenarios & 52 Artisans"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-white font-extrabold tracking-wide">⚡ SIH Demo Hub</span>
            <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-black">
              10 Scenarios
            </span>
          </button>
        </div>
      )}

      {/* Main Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-5 border-b border-slate-800 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇮🇳</span>
                    <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                      KarigarSetu SIH Demonstration Hub
                    </h2>
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                      DEMO ECOSYSTEM
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Multi-artisan simulation spanning 26 Indian states, 32 craft traditions, 104 products, and 32 verified B2B buyers.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/demo-hub');
                    }}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                    title="Open Dedicated Full Page Demo Hub"
                  >
                    <span>Full Page Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Active Artisan Indicator Banner */}
              <div className="mt-3.5 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-slate-400">Current Active Artisan:</span>
                  <span className="text-amber-300 font-bold">
                    {state.artisan.name} ({state.artisan.craft})
                  </span>
                  <span className="text-slate-400">• {state.artisan.location}</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/seller/${state.artisan.id}`);
                  }}
                  className="text-indigo-300 hover:text-white font-medium text-[11px] flex items-center gap-1 underline underline-offset-2"
                >
                  View ID Card & QR <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mt-4 pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('scenarios')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'scenarios'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>⚡ 8 SIH Demo Scenarios</span>
                </button>
                <button
                  onClick={() => setActiveTab('artisans')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'artisans'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>👨‍🎨 52 Artisan Switcher ({artisans.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'stats'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>📊 Ecosystem Stats & KPIs</span>
                </button>
              </div>
            </div>

            {/* Tab 1: 8 Curated Scenarios */}
            {activeTab === 'scenarios' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
                <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                  <span>Select any scenario to configure the live artisan workspace, buyer context, and inquiry lifecycle stage:</span>
                  <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                    1-Click Workspace Setup
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scenarios.map((sc, idx) => {
                    const isActive = activeArtisanId === sc.artisanId;
                    return (
                      <div
                        key={sc.id}
                        className={`bg-white rounded-2xl border p-4 shadow-xs transition-all flex flex-col justify-between ${
                          isActive 
                            ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-indigo-50/20' 
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <div className="space-y-3">
                          {/* Top Row: Index, Name, Status Badge */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  #{idx + 1}
                                </span>
                                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                                  {sc.name}
                                </h4>
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {sc.craft} • {sc.state}
                              </p>
                            </div>

                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                              sc.inquiryStatus === 'Accepted'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : sc.inquiryStatus === 'Negotiating'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : 'bg-blue-50 text-blue-700 border-blue-300'
                            }`}>
                              {sc.inquiryStatus} ({sc.orderQuantity} pcs)
                            </span>
                          </div>

                          {/* Key Entities Row */}
                          <div className="bg-slate-50 rounded-xl p-2.5 text-xs space-y-1.5 border border-slate-100">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1">
                                👨‍🎨 Artisan:
                              </span>
                              <span className="font-semibold text-slate-800">{sc.artisanName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1">
                                🏢 Buyer:
                              </span>
                              <span className="font-semibold text-slate-800">{sc.buyerName} ({sc.buyerCity})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500 flex items-center gap-1">
                                📦 Product:
                              </span>
                              <span className="font-semibold text-slate-800 truncate max-w-[200px]" title={sc.productName}>
                                {sc.productName}
                              </span>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                              <span className="text-slate-500">Inquiry Value:</span>
                              <span className="font-mono font-bold text-indigo-700">₹{sc.orderValue.toLocaleString('en-IN')}</span>
                            </div>
                          </div>

                          {/* Pitch / Value Proposition */}
                          <div className="text-[11px] text-slate-600 bg-amber-50/60 rounded-xl p-2.5 border border-amber-200/60">
                            <span className="font-bold text-amber-900">💡 SIH Pitch: </span>
                            {sc.pitch}
                          </div>

                          {/* Recommended Judge Question */}
                          <div className="text-[11px] text-slate-600 bg-blue-50/60 rounded-xl p-2.5 border border-blue-200/60 flex items-start gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-blue-900">Prompt for Judges: </span>
                              "{sc.recommendedJudgeQuestion}"
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          {isActive ? (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-full justify-center">
                              <CheckCircle2 className="w-4 h-4" /> Active Scenario
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSwitchScenario(sc)}
                              disabled={loadingScenarioId === sc.id}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <span>⚡ Activate Scenario #{idx + 1}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: 52 Artisans Switcher */}
            {activeTab === 'artisans' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50 flex flex-col">
                {/* Search & State Filter Bar */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-2 shrink-0">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={artisanSearch}
                      onChange={(e) => setArtisanSearch(e.target.value)}
                      placeholder="Search by name, craft, district, or cluster..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={selectedStateFilter}
                      onChange={(e) => setSelectedStateFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium focus:outline-none"
                    >
                      {uniqueStates.map(st => (
                        <option key={st} value={st}>{st === 'All' ? 'All States (26)' : st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Artisan Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto">
                  {filteredArtisans.map((art) => {
                    const isSelected = art.id === activeArtisanId;
                    return (
                      <div
                        key={art.id}
                        className={`bg-white rounded-2xl border p-3.5 shadow-xs transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                <img
                                  src={getArtisanImage(art as any)}
                                  alt={art.name}
                                  className="w-full h-full object-cover"
                                  onError={(e: any) => {
                                    e.currentTarget.src = `/images/avatars/${art.id}.svg`;
                                  }}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-bold text-xs text-slate-900">{art.name}</h4>
                                  {art.giCertified && (
                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-1.5 py-0.2 rounded-md">
                                      GI Tag
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-medium text-slate-600">{art.craft}</p>
                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate">{art.location}</span>
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">
                                Trust {art.trustScore}/100
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1 font-mono">{art.pehchanId}</p>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-500 bg-slate-50 rounded-lg p-2 border border-slate-100 flex items-center justify-between">
                            <span>Cluster: <strong className="text-slate-700">{art.cluster || 'Artisan Cluster'}</strong></span>
                            <span>Cap: <strong className="text-slate-700">{art.capacityPerMonth} pcs/mo</strong></span>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              navigate(`/seller/${art.id}`);
                            }}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                          >
                            <span>Inspect ID</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>

                          {isSelected ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSwitchArtisan(art)}
                              className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              Set Active
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Ecosystem Stats & KPIs */}
            {activeTab === 'stats' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Verified Artisans</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats?.totalArtisans || 52}</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Across {stats?.statesCovered || 26} States & UTs</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Handcrafted Catalog</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats?.totalProducts || 108}</p>
                    <p className="text-[11px] text-indigo-600 font-medium mt-0.5">32 Craft Traditions</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Verified B2B Buyers</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats?.totalBuyers || 32}</p>
                    <p className="text-[11px] text-blue-600 font-medium mt-0.5">Across 21 Commercial Hubs</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Active Inquiries</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats?.totalInquiries || 54}</p>
                    <p className="text-[11px] text-amber-600 font-medium mt-0.5">7 Realistic Lifecycle Stages</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Compatibility Matches</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">{stats?.totalMarketMatches || 382}</p>
                    <p className="text-[11px] text-purple-600 font-medium mt-0.5">Multi-Factor Compatibility Score</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <p className="text-xs text-slate-500 font-medium">Demonstration GMV</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">{stats?.platformGMV || '₹24,80,000'}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">100% Floor Protected</p>
                  </div>
                </div>

                {/* Algorithmic Features Overview */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    Key Platform Innovations for SIH 2026 Evaluation:
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                    <li>
                      <strong>Deterministic Pricing Engine with Floor Protection:</strong> Evaluates 15 variables including raw materials, skilled hours, state minimum wage, packaging, and freight. Guarantees wholesale price always strictly exceeds artisan production cost.
                    </li>
                    <li>
                      <strong>Multi-Factor Compatibility Matching:</strong> Evaluates craft overlap (35%), monthly capacity vs. order volume (25%), price tier compatibility (20%), and logistics corridor efficiency (20%).
                    </li>
                    <li>
                      <strong>Capacity Mismatch Early Warning:</strong> Automatically flags when buyer volume exceeds cluster capacity and recommends phased delivery schedules to prevent artisan default.
                    </li>
                    <li>
                      <strong>3-Tier Public-Safe Identity Architecture:</strong> Cryptographically separates verified government records (Pehchan ID, GI Tag) from artisan claims and AI insights. Public QR code exposes zero private bank or phone details.
                    </li>
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>DEMO DATA NOTICE: </strong>
                    All artisan identities, B2B business names, GSTINs, and inquiry records are realistic fictional entities created solely for Smart India Hackathon evaluation. No real individual's private data or live government databases are accessed.
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="bg-white p-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span className="font-mono text-[11px]">
                Active: <strong>{state.artisan.name}</strong> • Pehchan: {state.artisan.id}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors cursor-pointer"
              >
                Close Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
