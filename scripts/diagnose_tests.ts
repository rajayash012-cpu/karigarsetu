import { store } from '../server/store.js';

console.log('--- Diagnosing Market Matches ---');
const scores = store.marketMatches.map(m => m.compatibilityScore);
console.log('Min score:', Math.min(...scores), 'Max score:', Math.max(...scores));
const invalidScores = store.marketMatches.filter(m => m.compatibilityScore < 60 || m.compatibilityScore > 100);
console.log('Invalid scores count:', invalidScores.length);
if (invalidScores.length > 0) {
  console.log('Sample invalid match:', invalidScores[0]);
}

console.log('\n--- Diagnosing Warnings ---');
const withWarn = store.marketMatches.filter(m => !!m.capacityMismatchWarning);
console.log('Matches with capacityMismatchWarning:', withWarn.length);
if (store.marketMatches.length > 0) {
  console.log('First 2 matches keys:', Object.keys(store.marketMatches[0]));
  console.log('First match sample:', store.marketMatches[0]);
}

console.log('\n--- Diagnosing Scenarios ---');
store.scenarios.forEach((sc, i) => {
  console.log(`Scenario ${i + 1}:`, {
    id: !!sc.id,
    artisanId: !!sc.artisanId,
    buyerId: !!sc.buyerId,
    productId: !!sc.productId,
    pitch: !!sc.pitch,
    recommendedJudgeQuestion: !!sc.recommendedJudgeQuestion,
    sc
  });
});
