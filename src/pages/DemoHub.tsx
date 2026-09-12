import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Filter, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Package, 
  TrendingUp, 
  Users, 
  Layers, 
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  FileCheck,
  Check,
  Info,
  Award
} from 'lucide-react';
import { DEMO_DATASET, findArtisan, getArtisanImage, DemoArtisan } from '@/demoData';
import { useApp } from '@/context/AppContext';
import { BackButton } from '@/components/BackButton';

export default function DemoHub() {
  const navigate = useNavigate();
  const { state, addToast, reloadArtisanProfile } = useApp();
  const isHi = state.language === 'hi';

  const [activeTab, setActiveTab] = useState<'artisans' | 'scenarios' | 'buyers'>('artisans');
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Female' | 'Male'>('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [craftFilter, setCraftFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'trust' | 'capacity' | 'experience' | 'name'>('trust');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [switchingArtisanId, setSwitchingArtisanId] = useState<string | null>(null);

  // States & Crafts list
  const uniqueStates = useMemo(() => {
    const set = new Set(DEMO_DATASET.artisans.map(a => a.state));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const uniqueCrafts = useMemo(() => {
    const set = new Set(DEMO_DATASET.artisans.map(a => a.craft));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered & Sorted Artisans
  const filteredArtisans = useMemo(() => {
    return DEMO_DATASET.artisans.filter(artisan => {
      if (genderFilter !== 'All' && artisan.gender !== genderFilter) return false;
      if (stateFilter !== 'All' && artisan.state !== stateFilter) return false;
      if (craftFilter !== 'All' && artisan.craft !== craftFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = artisan.name.toLowerCase().includes(q);
        const matchesCraft = artisan.craft.toLowerCase().includes(q);
        const matchesLocation = artisan.location.toLowerCase().includes(q);
        const matchesState = artisan.state.toLowerCase().includes(q);
        const matchesPehchan = (artisan.pehchanId || '').toLowerCase().includes(q);
        const matchesId = artisan.id.toLowerCase().includes(q) || (artisan.legacyId || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCraft && !matchesLocation && !matchesState && !matchesPehchan && !matchesId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trust') return (b.trustScore || 0) - (a.trustScore || 0);
      if (sortBy === 'capacity') return (b.capacityPerMonth || 0) - (a.capacityPerMonth || 0);
      if (sortBy === 'experience') return (b.experienceYears || 0) - (a.experienceYears || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [genderFilter, stateFilter, craftFilter, searchQuery, sortBy]);

  // 1-Click Switch Active Artisan
  const handleSwitchArtisan = async (artisan: DemoArtisan) => {
    setSwitchingArtisanId(artisan.id);
    try {
      await fetch('/api/demo/switch-artisan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artisanId: artisan.id })
      });
      await reloadArtisanProfile();
      addToast({
        message: `Switched active platform artisan to ${artisan.name} (${artisan.craft})`,
        type: 'success'
      });
    } catch (e) {
      console.warn('Switch artisan failed:', e);
      addToast({
        message: `Active artisan set to ${artisan.name}`,
        type: 'info'
      });
    } finally {
      setSwitchingArtisanId(null);
    }
  };

  // 1-Click Launch Scenario
  const handleLaunchScenario = async (scenario: any) => {
    setActiveScenarioId(scenario.id);
    try {
      await fetch('/api/demo/switch-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: scenario.id })
      });
      await reloadArtisanProfile();
      addToast({
        message: `Loaded scenario: "${scenario.title}" with ${scenario.artisanName}`,
        type: 'celebration'
      });
      navigate(`/seller/${scenario.artisanId}`);
    } catch (e) {
      console.warn('Launch scenario fallback:', e);
      navigate(`/seller/${scenario.artisanId}`);
    } finally {
      setActiveScenarioId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  SIH 2026 Demonstration Hub
                </h1>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-amber-300">
                  SIH 26090
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Complete Indian Artisan & B2B Ecosystem Simulation • Problem Statement 26090
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* DEMO MODE DISCLAIMER BANNER */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-200/80 rounded-xl text-amber-900 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  ⚡ SIH Evaluation Demo Environment
                </span>
                <span className="bg-amber-300/80 text-amber-950 text-[10px] px-2 py-0.2 rounded-full font-bold">
                  DEMO DATASET
                </span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                All 52 artisan identities, 104 products, 32 B2B buyers, GSTIN/PAN records, and transaction histories shown here are realistic fictional demonstration models curated specifically for Smart India Hackathon 2026. Real identity credentials, Aadhaar biometric data, and live government registries are safeguarded according to official data protection norms.
              </p>
            </div>
          </div>
        </div>

        {/* OVERVIEW METRICS KPI GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total Artisans</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.totalArtisans}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">50/50 Gender Parity</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-pink-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-pink-600">Female Artisans</div>
            <div className="text-xl font-black text-pink-700 mt-0.5">{DEMO_DATASET.stats.femaleArtisans}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">SHG & Cooperatives</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-blue-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-blue-600">Male Artisans</div>
            <div className="text-xl font-black text-blue-700 mt-0.5">{DEMO_DATASET.stats.maleArtisans}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Master Craftsmen</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">States Covered</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.statesCovered}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Pan-India Reach</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Craft Traditions</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.craftsCovered}</div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">GI-Tag Clusters</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Handcrafted SKUs</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.totalProducts}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">2 SKUs per Artisan</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Verified Buyers</div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{DEMO_DATASET.stats.totalBuyers}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Across 18 Cities</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs text-center">
            <div className="text-[10px] uppercase font-bold text-amber-700">Platform GMV</div>
            <div className="text-base font-black text-amber-900 mt-1">{DEMO_DATASET.stats.platformGMV}</div>
            <div className="text-[10px] text-amber-700 font-medium mt-0.5">Simulated Flow</div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('artisans')}
            className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'artisans'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>52 Master Artisans ({DEMO_DATASET.artisans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'scenarios'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>10 Curated Presentation Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('buyers')}
            className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'buyers'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>32 Verified B2B Buyers</span>
          </button>
        </div>

        {/* TAB 1: 52 MASTER ARTISANS */}
        {activeTab === 'artisans' && (
          <div className="space-y-5">
            {/* Search, Filter & Sort Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by artisan name, craft (Dokra, Madhubani, Terracotta), state, or Pehchan ID..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              {/* Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                {/* Gender Filter Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500 mr-1">Gender:</span>
                  <button
                    onClick={() => setGenderFilter('All')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      genderFilter === 'All'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({DEMO_DATASET.artisans.length})
                  </button>
                  <button
                    onClick={() => setGenderFilter('Female')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      genderFilter === 'Female'
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
                    }`}
                  >
                    ♀ Female ({DEMO_DATASET.stats.femaleArtisans})
                  </button>
                  <button
                    onClick={() => setGenderFilter('Male')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      genderFilter === 'Male'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    ♂ Male ({DEMO_DATASET.stats.maleArtisans})
                  </button>
                </div>

                {/* State & Craft Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="All">All 26 States/UTs</option>
                    {uniqueStates.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <select
                    value={craftFilter}
                    onChange={(e) => setCraftFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="All">All 32 Crafts</option>
                    {uniqueCrafts.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="trust">Sort: Trust Score</option>
                    <option value="capacity">Sort: Monthly Capacity</option>
                    <option value="experience">Sort: Experience</option>
                    <option value="name">Sort: Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing <strong>{filteredArtisans.length}</strong> of <strong>{DEMO_DATASET.artisans.length}</strong> certified Indian master artisans</span>
              {(genderFilter !== 'All' || stateFilter !== 'All' || craftFilter !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setGenderFilter('All');
                    setStateFilter('All');
                    setCraftFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Artisan Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArtisans.map((artisan) => {
                const isSelected = state.artisan.id === artisan.id || state.artisan.id === artisan.legacyId;
                const imgSrc = getArtisanImage(artisan);

                return (
                  <div
                    key={artisan.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden ${
                      isSelected 
                        ? 'border-amber-400 ring-2 ring-amber-300/60 shadow-sm' 
                        : 'border-slate-200'
                    }`}
                  >
                    {/* Top Row: Portrait + Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex gap-3.5 items-start">
                        {/* Distinct Portrait / Dedicated Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                            <img
                              src={imgSrc}
                              alt={artisan.name}
                              className="w-full h-full object-cover"
                              onError={(e: any) => {
                                e.currentTarget.src = `/images/avatars/${artisan.id}.svg`;
                              }}
                            />
                          </div>
                          <span 
                            className={`absolute -bottom-1 -right-1 text-[9px] font-black px-1.5 py-0.2 rounded-full border shadow-xs ${
                              artisan.gender === 'Female' 
                                ? 'bg-pink-100 text-pink-800 border-pink-300' 
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                            }`}
                          >
                            {artisan.gender === 'Female' ? '♀ F' : '♂ M'}
                          </span>
                        </div>

                        {/* Name, Craft, Location */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="text-sm font-black text-slate-900 truncate">
                              {artisan.name}
                            </h3>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-md shrink-0">
                              {artisan.trustScore}/100
                            </span>
                          </div>
                          <p className="text-xs font-bold text-amber-700 truncate mt-0.5">
                            {artisan.craft}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                            <span className="truncate">{artisan.location}, {artisan.state}</span>
                          </p>
                        </div>
                      </div>

                      {/* Pehchan ID & GI Tags */}
                      <div className="flex flex-wrap gap-1.5 text-[10px]">
                        <span className="bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded-md font-semibold">
                          ID: {artisan.pehchanId}
                        </span>
                        {artisan.giCertified && (
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>GI Certified</span>
                          </span>
                        )}
                        {artisan.shgMember && (
                          <span className="bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded-md border border-indigo-200">
                            SHG Active
                          </span>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Monthly Capacity</span>
                          <span className="font-bold text-slate-800">{artisan.capacity || `${artisan.capacityPerMonth} pcs/mo`}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Experience</span>
                          <span className="font-bold text-slate-800">{artisan.experienceYears} Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleSwitchArtisan(artisan)}
                        disabled={switchingArtisanId === artisan.id}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
                        }`}
                        title="Set as active platform session artisan"
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <span>Set Active</span>
                        )}
                      </button>

                      <button
                        onClick={() => navigate(`/seller/${artisan.id}`)}
                        className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all flex items-center gap-1 shadow-2xs group cursor-pointer"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 10 CURATED SCENARIOS */}
        {activeTab === 'scenarios' && (
          <div className="space-y-4">
            <div className="bg-indigo-900 text-white p-4 sm:p-5 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h2 className="text-base font-black tracking-tight">
                  10 Curated Presentation Scenarios for SIH Judges
                </h2>
              </div>
              <p className="text-xs text-indigo-200">
                Click any scenario below to immediately configure the platform state, load matching B2B inquiries, bind the artisan profile, and demonstrate deterministic pricing protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_DATASET.scenarios.map((scenario, index) => {
                const artisan = findArtisan(scenario.artisanId);
                const imgSrc = artisan ? getArtisanImage(artisan) : '/images/savita_devi.jpg';

                return (
                  <div
                    key={scenario.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-indigo-200">
                            Scenario {index + 1}
                          </span>
                          <h3 className="text-sm font-black text-slate-900 mt-1">
                            {scenario.title}
                          </h3>
                        </div>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono shrink-0">
                          {scenario.state}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-700">
                        {scenario.subtitle}
                      </p>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {scenario.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img src={imgSrc} alt={scenario.artisanName} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-900 block leading-tight">{scenario.artisanName}</span>
                          <span className="text-[10px] text-amber-700 block leading-tight">{scenario.craft}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchScenario(scenario)}
                        disabled={activeScenarioId === scenario.id}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Run Demo</span>
                        <ChevronRight className="w-3 h-3 text-amber-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 32 VERIFIED B2B BUYERS */}
        {activeTab === 'buyers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">32 Verified Pan-India B2B Buyers</h2>
                <p className="text-xs text-slate-500 mt-0.5">Corporate gifting, boutique retailers, hotel chains, and export houses</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                100% GSTIN Simulated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DEMO_DATASET.buyers.map((buyer) => (
                <div key={buyer.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-black text-slate-900 truncate">{buyer.companyName}</h3>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0">
                      {buyer.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{buyer.authorizedPerson} • {buyer.city}, {buyer.state}</span>
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] flex justify-between items-center text-slate-500">
                    <span>Typical: <strong>{buyer.typicalOrder}</strong></span>
                    <span className="text-emerald-700 font-bold">Trust: {buyer.trustScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
