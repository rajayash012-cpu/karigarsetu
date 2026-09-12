import { store } from '../server/store.js';

console.log('=== STORE STATUS ===');
console.log('Artisans in store:', store.artisans.length);
console.log('Buyers in store:', store.buyers.length);
console.log('Products in store:', store.products.length);
console.log('Inquiries in store:', store.inquiries.length);
console.log('Market Matches in store:', store.marketMatches.length);
console.log('Scenarios in store:', store.scenarios.length);
console.log('Active artisan:', store.artisan.name, `(${store.artisan.craft}, ${store.artisan.state})`);
