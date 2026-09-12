import { SEED_ARTISANS } from '../server/data/artisansSeed.js';
import { SEED_BUYERS } from '../server/data/buyersSeed.js';
import { SEED_PRODUCTS } from '../server/data/productsSeed.js';
import { SEED_INQUIRIES } from '../server/data/inquiriesSeed.js';
import { SEED_SCENARIOS } from '../server/data/scenariosSeed.js';

console.log('=== VERIFYING KARIGARSETU SEEDS ===');
console.log('Artisans count:', SEED_ARTISANS.length);
console.log('Buyers count:', SEED_BUYERS.length);
console.log('Products count:', SEED_PRODUCTS.length);
console.log('Inquiries count:', SEED_INQUIRIES.length);
console.log('Scenarios count:', SEED_SCENARIOS.length);

if (SEED_ARTISANS.length >= 50 && SEED_BUYERS.length >= 30 && SEED_PRODUCTS.length >= 100 && SEED_INQUIRIES.length >= 50 && SEED_SCENARIOS.length === 8) {
  console.log('SUCCESS: All seed datasets meet or exceed targets!');
} else {
  console.error('FAILURE: Seed counts did not meet targets.');
  process.exit(1);
}
