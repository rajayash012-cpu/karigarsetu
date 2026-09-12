import { DEMO_ARTISANS, DemoArtisan } from './artisans';
import { DEMO_PRODUCTS, DemoProduct } from './products';
import { DEMO_BUYERS, DemoBuyer } from './buyers';
import { DEMO_INQUIRIES, DemoInquiry } from './inquiries';
import { DEMO_SCENARIOS, DemoScenario } from './scenarios';

export * from './artisans';
export * from './products';
export * from './buyers';
export * from './inquiries';
export * from './scenarios';

export const DEMO_DATASET = {
  artisans: DEMO_ARTISANS,
  products: DEMO_PRODUCTS,
  buyers: DEMO_BUYERS,
  inquiries: DEMO_INQUIRIES,
  scenarios: DEMO_SCENARIOS,
  stats: {
    totalArtisans: DEMO_ARTISANS.length,
    femaleArtisans: DEMO_ARTISANS.filter(a => a.gender === 'Female').length,
    maleArtisans: DEMO_ARTISANS.filter(a => a.gender === 'Male').length,
    totalProducts: DEMO_PRODUCTS.length,
    totalBuyers: DEMO_BUYERS.length,
    totalInquiries: DEMO_INQUIRIES.length,
    statesCovered: Array.from(new Set(DEMO_ARTISANS.map(a => a.state))).length,
    craftsCovered: Array.from(new Set(DEMO_ARTISANS.map(a => a.craft))).length,
    platformGMV: "₹24,80,000"
  },
  disclaimer: "All profiles, businesses, transactions and verification records shown here are fictional demonstration data for Smart India Hackathon (SIH 26090)."
};

/**
 * Universal Artisan Finder
 * Resolves by:
 * - ID: "artisan-001", "artisan-1"
 * - Code: "ART-001"
 * - Pehchan ID: "BR-MAD-PNT-4402"
 * Returns undefined if not found.
 */
export function findArtisan(idOrQuery?: string | null): DemoArtisan | undefined {
  if (!idOrQuery) return undefined;
  const q = idOrQuery.trim().toLowerCase();

  return DEMO_ARTISANS.find(a => {
    if (a.id.toLowerCase() === q) return true;
    if (a.legacyId && a.legacyId.toLowerCase() === q) return true;
    if (a.code && a.code.toLowerCase() === q) return true;
    if (a.pehchanId && a.pehchanId.toLowerCase() === q) return true;

    // Normalization: "artisan-1" <-> "artisan-001"
    const numPart = q.replace(/^artisan-|^art-/, '');
    const aNumPart = a.id.replace('artisan-', '');
    if (parseInt(numPart, 10) === parseInt(aNumPart, 10)) return true;

    return false;
  });
}

export function getArtisanProducts(artisanId: string): DemoProduct[] {
  const artisan = findArtisan(artisanId);
  if (!artisan) return [];
  return DEMO_PRODUCTS.filter(p => p.artisanId === artisan.id || p.artisanId === artisan.legacyId);
}

export function getArtisanInquiries(artisanId: string): DemoInquiry[] {
  const artisan = findArtisan(artisanId);
  if (!artisan) return [];
  return DEMO_INQUIRIES.filter(i => i.artisanId === artisan.id || i.artisanId === artisan.legacyId);
}

export function getArtisanImage(artisan?: DemoArtisan | null): string {
  if (!artisan) return '/images/savita_devi.jpg';
  return artisan.photo || `/images/avatars/${artisan.id}.svg`;
}

