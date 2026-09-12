import { SEED_ARTISANS } from '../server/data/artisansSeed.js';
import { SEED_BUYERS } from '../server/data/buyersSeed.js';

export function generateMarketMatches(artisans: any[], buyers: any[]) {
  const matches: any[] = [];
  let idCounter = 1;

  for (const artisan of artisans) {
    for (const buyer of buyers) {
      const craftLower = (artisan.craft || '').toLowerCase();
      const catLower = (artisan.category || '').toLowerCase();
      const preferred = (buyer.preferredCrafts || []).map((c: string) => c.toLowerCase());
      
      const exactCraftMatch = preferred.some((p: string) => craftLower.includes(p) || p.includes(craftLower));
      const categoryMatch = preferred.some((p: string) => catLower.includes(p) || p.includes(catLower));
      const isCraftMatch = exactCraftMatch || categoryMatch;

      const artisanCapacity = artisan.capacityPerMonth || 50;
      const buyerMin = buyer.minUnits || 20;
      const buyerMax = buyer.maxUnits || 100;
      
      let volumeScore = 0;
      let capacityWarning: string | undefined = undefined;
      const volumeCompatible = buyerMin <= artisanCapacity;

      if (buyerMax <= artisanCapacity) {
        volumeScore = 35;
      } else if (buyerMin <= artisanCapacity) {
        volumeScore = 25;
        capacityWarning = "High volume order — Recommend phased delivery over 2-3 months";
      } else {
        volumeScore = 10;
        capacityWarning = "Capacity mismatch — Artisan monthly capacity is below buyer minimum order";
      }

      const artState = artisan.state || 'India';
      const buyerCity = buyer.city || 'Delhi';
      const buyerState = buyer.state || 'Delhi';
      const sameState = artState.toLowerCase() === buyerState.toLowerCase();
      const logisticsScore = sameState ? 15 : 10;
      const logisticsRoute = sameState 
        ? `Intra-state direct cluster route (${artisan.district || artState} → ${buyerCity})` 
        : `Inter-state fair-trade freight corridor (${artState} → ${buyerCity})`;

      const trustScore = Math.round(((artisan.trustScore || 85) + (buyer.trustScore || 85)) / 2 * 0.15);

      let craftScore = exactCraftMatch ? 35 : (categoryMatch ? 25 : 10);
      let totalScore = Math.min(98, Math.max(55, craftScore + volumeScore + logisticsScore + trustScore));

      if (isCraftMatch || totalScore >= 66) {
        matches.push({
          id: `match-${idCounter++}`,
          artisanId: artisan.id,
          artisanName: artisan.name,
          craft: artisan.craft,
          location: artisan.location || `${artisan.district}, ${artisan.state}`,
          state: artisan.state || 'India',
          capacityPerMonth: artisanCapacity,
          buyerId: buyer.id,
          buyerName: buyer.authorizedPerson,
          buyerOrg: buyer.companyName,
          buyerCity: buyerCity,
          buyerState: buyerState,
          typicalOrder: buyer.typicalOrder || `${buyerMin}–${buyerMax} units`,
          minUnits: buyerMin,
          maxUnits: buyerMax,
          compatibilityScore: totalScore,
          craftMatch: isCraftMatch,
          volumeCompatible: volumeCompatible,
          capacityWarning: capacityWarning,
          logisticsRoute: logisticsRoute,
          recommendedAction: totalScore >= 90 ? "Top Compatible Buyer — Proactively send swatch samples" : totalScore >= 80 ? "High Compatibility — Initiate wholesale catalog inquiry" : "Moderate Compatibility — Explore seasonal requirements",
          status: 'matched',
          isDemoData: true
        });
      }
    }
  }

  return matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

const matches = generateMarketMatches(SEED_ARTISANS, SEED_BUYERS);
console.log('Total Generated Market Matches:', matches.length);
console.log('Top match sample:', matches[0]);
