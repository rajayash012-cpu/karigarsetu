import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

export const RoleSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const isHi = state.language === 'hi';

  const isBuyer = location.pathname.startsWith('/buyer-marketplace');

  return (
    <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 z-50">
      <button 
        type="button"
        onClick={() => navigate('/demo-hub')}
        className="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono tracking-wide bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-amber-400/40 hover:border-amber-400 transition-colors cursor-pointer"
        title="Open SIH 2026 Presentation Hub (10 Scenarios, 52 Artisans, Ecosystem Stats)"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-bold">⚡ 10 Scenarios</span>
        <span className="hidden sm:inline text-slate-400">• SIH Demo Hub</span>
      </button>

      <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
            !isBuyer 
              ? 'bg-orange-600 text-white shadow-xs font-bold' 
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to Artisan Mode"
        >
          <span className="text-xs">👨‍🎨</span>
          <span>{isHi ? 'कारीगर (Artisan)' : 'Artisan'}</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/buyer-marketplace')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
            isBuyer 
              ? 'bg-blue-600 text-white shadow-xs font-bold' 
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to B2B Buyer Mode"
        >
          <span className="text-xs">🏢</span>
          <span>{isHi ? 'B2B खरीदार (Businessman)' : 'B2B Buyer'}</span>
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
