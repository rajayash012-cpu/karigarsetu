import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MobileFrame } from './components/MobileFrame';
import KarigarSaathi from './components/KarigarSaathi';
import DemoScenarioExplorer from './components/DemoScenarioExplorer';
import { ToastContainer } from './components/ui/toast';

import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import AIStudio from './pages/AIStudio';
import Catalog from './pages/Catalog';
import Pricing from './pages/Pricing';
import MarketMatch from './pages/MarketMatch';
import BuyerMarketplace from './pages/BuyerMarketplace';
import Economics from './pages/Economics';
import SellerProfile from './pages/SellerProfile';
import DemoHub from './pages/DemoHub';

function AppContent() {
  return (
    <MobileFrame>
      <div className="min-h-screen bg-white overflow-y-auto pb-24">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/demo-hub" element={<DemoHub />} />
          <Route path="/sih-demo-hub" element={<DemoHub />} />
          <Route path="/demo" element={<DemoHub />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/studio" element={<AIStudio />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/market-match" element={<MarketMatch />} />
          <Route path="/buyer-marketplace" element={<BuyerMarketplace />} />
          <Route path="/economics" element={<Economics />} />
          <Route path="/seller/:id" element={<SellerProfile />} />
          <Route path="/seller-profile" element={<SellerProfile />} />
          <Route path="/artisan/:id" element={<SellerProfile />} />
          <Route path="/artisan/:artisanId" element={<SellerProfile />} />
        </Routes>
      </div>
      <DemoScenarioExplorer />
      <KarigarSaathi />
      <ToastContainer />
    </MobileFrame>
  );
}

export default function App() {
  return <AppContent />;
}
