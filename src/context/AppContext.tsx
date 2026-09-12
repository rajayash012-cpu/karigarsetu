import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ArtisanProfile {
  id: string;
  name: string;
  craft: string;
  location: string;
  giCertified: boolean;
  shgMember: boolean;
  activeListings: number;
  inquiriesReceived: number;
  monthlyRevenue: number;
  profitMargin: number;
}

export interface Product {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  originalImage?: string;
  enhancedImage?: string;
  attributes: Record<string, any>;
  tags: string[];
  pricing: any;
  status: string;
  createdAt: string;
}

export interface CurrentProduct {
  step: 'capture' | 'studio' | 'catalog' | 'pricing' | 'match';
  rawImage?: string;
  enhancedImage?: string;
  voiceTranscript?: string;
  catalog?: any;
  pricing?: any;
}

export interface Inquiry {
  id: string;
  productId: string;
  buyerName: string;
  date: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'celebration';
}

export interface AppState {
  language: 'hi' | 'en';
  artisan: ArtisanProfile;
  products: Product[];
  inquiries: Inquiry[];
  currentProduct: CurrentProduct;
  toasts: Toast[];
}

interface AppContextType extends AppState {
  setLanguage: (lang: 'hi' | 'en') => void;
  setArtisan: (artisan: ArtisanProfile) => void;
  reloadArtisanProfile: () => Promise<void>;
  updateCurrentProduct: (updates: Partial<CurrentProduct>) => void;
  addProduct: (product: Product) => void;
  addInquiry: (inquiry: Inquiry) => void;
  addToast: (toast: string | Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  incrementInquiries: () => void;
}

const defaultArtisan: ArtisanProfile = {
  id: 'artisan-001',
  name: 'Savita Devi',
  craft: 'Madhubani Painting',
  location: 'Ranti Village, Madhubani, Bihar',
  giCertified: true,
  shgMember: true,
  activeListings: 12,
  inquiriesReceived: 18,
  monthlyRevenue: 48600,
  profitMargin: 35.8
};

const defaultProducts: Product[] = [
  {
    id: 'p1',
    titleEn: 'Hand-painted Madhubani Wall Art',
    titleHi: 'हस्तनिर्मित मधुबनी लोक चित्रकला',
    descriptionEn: 'GI-certified Madhubani folk art on handmade paper with natural pigments.',
    descriptionHi: 'प्राकृतिक रंगों से हस्तनिर्मित पेपर पर बनी पारंपरिक मधुबनी पेंटिंग।',
    attributes: { craft: 'Madhubani', material: 'Handmade Paper, Natural Pigments' },
    tags: ['madhubani', 'folk art', 'gi tag', 'handmade'],
    pricing: { price: 3150 },
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    titleEn: 'Madhubani Kohbar Nuptial Painting on Tussar Silk',
    titleHi: 'टसर सिल्क पर हस्तनिर्मित मधुबनी कोहबर पेंटिंग',
    descriptionEn: 'Sacred ceremonial Kohbar painting on handloom Tussar silk depicting lotus and fish motifs of prosperity.',
    descriptionHi: 'हाथकरघा टसर सिल्क पर कमल और मत्स्य प्रतीकों से सजी पवित्र कोहबर चित्रकला।',
    attributes: { craft: 'Madhubani', material: 'Tussar Silk, Natural Mineral Pigments' },
    tags: ['madhubani', 'kohbar', 'silk', 'gi tag'],
    pricing: { price: 5400 },
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [artisan, setArtisan] = useState<ArtisanProfile>(defaultArtisan);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [currentProduct, setCurrentProduct] = useState<CurrentProduct>({ step: 'capture' });
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Fetch live store artisan profile and products on initial load
  React.useEffect(() => {
    fetch('/api/artisan/profile')
      .then(res => res.json())
      .then(data => {
        if (data.artisan) {
          setArtisan({
            id: data.artisan.id || 'artisan-001',
            name: data.artisan.name || 'Savita Devi',
            craft: data.artisan.craft || 'Madhubani Painting',
            location: data.artisan.location || 'Madhubani, Bihar',
            giCertified: data.artisan.giCertified ?? true,
            shgMember: data.artisan.shgMember ?? true,
            activeListings: data.products?.length || data.artisan.activeListings || 12,
            inquiriesReceived: data.artisan.inquiriesReceived || 18,
            monthlyRevenue: data.artisan.monthlyRevenue || 48600,
            profitMargin: data.artisan.profitMargin || 35.8
          });
        }
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          const mappedProds: Product[] = data.products.map((p: any) => ({
            id: p.id,
            titleEn: p.titleEn || p.name || 'Handcrafted Product',
            titleHi: p.titleHi || p.name || 'हस्तशिल्प उत्पाद',
            descriptionEn: p.description || 'Authentic artisan handcrafted piece',
            descriptionHi: p.descriptionHi || p.description || 'प्रामाणिक हस्तनिर्मित उत्पाद',
            originalImage: p.imageUrl || p.images?.[0],
            enhancedImage: p.imageUrl || p.images?.[0],
            attributes: { material: p.materials || p.material, craft: p.craftType },
            tags: p.tags || ['handcrafted', 'gi tag', 'fair trade'],
            pricing: { price: p.price || 3150, b2bPricingTiers: p.b2bPricingTiers },
            status: 'active',
            createdAt: new Date().toISOString()
          }));
          setProducts(mappedProds);
        }
      })
      .catch(err => {
        console.warn('Using default context artisan profile:', err);
      });
  }, []);

  const reloadArtisanProfile = async () => {
    try {
      const res = await fetch('/api/artisan/profile');
      const data = await res.json();
      if (data.artisan) {
        setArtisan({
          id: data.artisan.id || 'artisan-001',
          name: data.artisan.name || 'Savita Devi',
          craft: data.artisan.craft || 'Madhubani Painting',
          location: data.artisan.location || 'Madhubani, Bihar',
          giCertified: data.artisan.giCertified ?? true,
          shgMember: data.artisan.shgMember ?? true,
          activeListings: data.products?.length || data.artisan.activeListings || 12,
          inquiriesReceived: data.artisan.inquiriesReceived || 18,
          monthlyRevenue: data.artisan.monthlyRevenue || 48600,
          profitMargin: data.artisan.profitMargin || 35.8
        });
      }
    } catch (err) {
      console.warn('Failed to reload artisan profile:', err);
    }
  };

  const updateCurrentProduct = (updates: Partial<CurrentProduct>) => {
    setCurrentProduct(prev => ({ ...prev, ...updates }));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const addInquiry = (inquiry: Inquiry) => {
    setInquiries(prev => [inquiry, ...prev]);
  };
  
  const addToast = (toast: string | Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const toastObj: Toast = typeof toast === 'string'
      ? { id, message: toast, type: 'success' }
      : { ...toast, id };
    setToasts(prev => [...prev, toastObj]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const incrementInquiries = () => {
    setArtisan(prev => ({ ...prev, inquiriesReceived: prev.inquiriesReceived + 1 }));
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      artisan, setArtisan, reloadArtisanProfile,
      products, addProduct,
      inquiries, addInquiry,
      currentProduct, updateCurrentProduct,
      toasts, addToast, removeToast,
      incrementInquiries
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

export const useApp = () => {
  const ctx = useAppContext();
  return {
    state: {
      language: ctx.language,
      artisan: ctx.artisan,
      products: ctx.products,
      inquiries: ctx.inquiries,
      currentProduct: ctx.currentProduct,
      toasts: ctx.toasts,
    },
    setLanguage: ctx.setLanguage,
    setArtisan: ctx.setArtisan,
    reloadArtisanProfile: ctx.reloadArtisanProfile,
    updateCurrentProduct: ctx.updateCurrentProduct,
    addProduct: ctx.addProduct,
    addInquiry: ctx.addInquiry,
    addToast: ctx.addToast,
    removeToast: ctx.removeToast,
    incrementInquiries: ctx.incrementInquiries,
  };
};

