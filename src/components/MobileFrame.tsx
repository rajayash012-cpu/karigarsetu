import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { RoleSwitcher } from './RoleSwitcher';

export const MobileFrame = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 430);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || isFullWidth) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col relative">
        {!isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-xs shadow-md font-semibold text-xs border-slate-300"
            onClick={() => setIsFullWidth(false)}
          >
            Show Mobile Frame
          </Button>
        )}
        <RoleSwitcher />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-xs shadow-md font-semibold text-xs border-slate-300"
        onClick={() => setIsFullWidth(true)}
      >
        Full Width
      </Button>
      
      <div className="w-[410px] h-[864px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-[8px] border-gray-900 flex flex-col">
        {/* Status Bar */}
        <div className="h-7 w-full bg-white flex items-center justify-between px-6 text-[11px] font-medium z-50 absolute top-0">
          <span>9:41</span>
          <div className="w-32 h-6 bg-black rounded-b-3xl absolute left-1/2 -translate-x-1/2 top-0" />
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M1 9.5C0.447715 9.5 0 9.94772 0 10.5C0 11.0523 0.447715 11.5 1 11.5H3C3.55228 11.5 4 11.0523 4 10.5C4 9.94772 3.55228 9.5 3 9.5H1ZM6 6.5C5.44772 6.5 5 6.94772 5 7.5C5 8.05228 5.44772 8.5 6 8.5H8C8.55228 8.5 9 8.05228 9 7.5C9 6.94772 8.55228 6.5 8 6.5H6ZM11 3.5C10.4477 3.5 10 3.94772 10 4.5C10 5.05228 10.4477 5.5 11 5.5H13C13.5523 5.5 14 5.05228 14 4.5C14 3.94772 13.5523 3.5 13 3.5H11ZM16 0.5C15.4477 0.5 15 0.947715 15 1.5C15 2.05228 15.4477 2.5 16 2.5H18C18.5523 2.5 19 2.05228 19 1.5C19 0.947715 18.5523 0.5 18 0.5H16Z" transform="translate(0 0.5)"/></svg>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor"><path d="M0 6C0 2.68629 2.68629 0 6 0H8C11.3137 0 14 2.68629 14 6C14 9.31371 11.3137 12 8 12H6C2.68629 12 0 9.31371 0 6ZM6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10H8C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2H6Z" transform="translate(0 0.5)"/></svg>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="currentColor"><rect x="0.5" y="1.5" width="20" height="9" rx="2.5" stroke="currentColor"/><rect x="2" y="3" width="15" height="6" rx="1.5" fill="currentColor"/></svg>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-7 w-full flex flex-col relative bg-gray-50 pb-8">
          <RoleSwitcher />
          {children}
        </div>
        
        <div className="h-1 bg-black w-32 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none" />
      </div>
    </div>
  );
};
