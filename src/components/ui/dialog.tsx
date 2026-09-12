import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DialogContextValue {
  onClose: () => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export const Dialog = ({ 
  open, 
  onOpenChange, 
  children 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <DialogContext.Provider value={{ onClose: () => onOpenChange(false) }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop click closes modal */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
          onClick={() => onOpenChange(false)} 
        />
        <div className="relative z-50 w-full max-w-lg flex items-center justify-center pointer-events-auto">
          {children}
        </div>
      </div>
    </DialogContext.Provider>,
    document.body
  );
};

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "bg-white p-5 sm:p-6 rounded-3xl shadow-2xl max-w-lg w-full relative max-h-[88vh] overflow-y-auto",
        className
      )} 
      onClick={(e) => e.stopPropagation()}
      {...props} 
    />
  )
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-left relative", className)} {...props} />
);

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-base sm:text-lg font-bold leading-none tracking-tight text-slate-900", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-slate-500", className)} {...props} />
  )
);
DialogDescription.displayName = "DialogDescription";

export const DialogClose = ({ 
  onClick, 
  children,
  className 
}: { 
  onClick?: () => void; 
  children?: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(DialogContext);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
    if (context?.onClose) {
      context.onClose();
    }
  };

  return (
    <button 
      type="button"
      onClick={handleClick} 
      className={cn(
        "absolute right-0 top-0 sm:right-1 sm:top-1 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 active:bg-slate-200 transition-colors z-30 cursor-pointer",
        className
      )}
      aria-label="Close dialog"
      title="Close"
    >
      {children || <X className="w-5 h-5 stroke-[2.5]" />}
    </button>
  );
};
