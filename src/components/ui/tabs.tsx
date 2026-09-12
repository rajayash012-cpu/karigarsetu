import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext<{ value: string; onValueChange: (v: string) => void }>({ value: '', onValueChange: () => {} });

export const Tabs = ({ value, onValueChange, children, className }: { value: string, onValueChange: (v: string) => void, children: React.ReactNode, className?: string }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={cn("w-full", className)}>{children}</div>
  </TabsContext.Provider>
);

export const TabsList = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("flex items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500", className)}>{children}</div>
);

export const TabsTrigger = ({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = selectedValue === value;
  return (
    <button
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? "bg-white text-gray-900 shadow-sm border-b-2 border-orange-500" : "hover:text-gray-900",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) => {
  const { value: selectedValue } = useContext(TabsContext);
  if (selectedValue !== value) return null;
  return <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2", className)}>{children}</div>;
};
