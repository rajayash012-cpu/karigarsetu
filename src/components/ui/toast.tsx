import React, { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAppContext();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center p-4 space-y-2 pointer-events-none">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onRemove }: { toast: any, onRemove: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const variants = {
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-orange-500 text-white',
    error: 'bg-red-500 text-white',
    celebration: 'bg-gradient-to-r from-orange-400 to-pink-500 text-white'
  };

  return (
    <div className={cn("px-4 py-2 rounded-md shadow-lg pointer-events-auto flex items-center gap-2", variants[toast.type as keyof typeof variants] || variants.info)}>
      {toast.type === 'celebration' && <span className="animate-bounce">🎉</span>}
      {toast.message}
    </div>
  );
};
