import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  to,
  label,
  className = '',
  compact = false
}) => {
  const navigate = useNavigate();
  const { state } = useApp();
  const isHi = state.language === 'hi';

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (to) {
      navigate(to);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const defaultLabel = isHi ? 'वापस' : 'Back';
  const displayLabel = label ?? (compact ? defaultLabel : 'वापस / Back');

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors border border-slate-200/80 shrink-0 shadow-xs ${className}`}
      title={isHi ? 'पीछे जाएं' : 'Go back'}
      aria-label="Back"
    >
      <ArrowLeft className="w-3.5 h-3.5 text-slate-600 shrink-0" />
      <span>{displayLabel}</span>
    </button>
  );
};

export default BackButton;
