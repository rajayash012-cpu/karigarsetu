import React, { useState, useRef, useEffect } from 'react';

export const ImageSlider = ({ original, enhanced }: { original?: string, enhanced?: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden select-none"
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* Original Image (Background) */}
      {original ? (
        <img src={original} alt="Original" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">No Image</div>
      )}
      <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Before</span>

      {/* Enhanced Image (Foreground) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        {enhanced ? (
          <img src={enhanced} alt="Enhanced" className="absolute inset-0 w-[400px] max-w-none h-full object-cover" style={{ width: containerRef.current?.offsetWidth || '100%' }} draggable={false} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 min-w-[300px] text-gray-500">No Enhanced</div>
        )}
        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded" style={{ right: `calc(100% - ${containerRef.current?.offsetWidth || 300}px + 8px)` }}>After</span>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center absolute">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 9L1.5 6L4.5 3M7.5 9L10.5 6L7.5 3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
