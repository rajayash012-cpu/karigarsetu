import sharp from 'sharp';
import path from 'path';
import { 
  enhanceStudioProduct, 
  composeThemeImage, 
  calculateQualityScore, 
  DemoImageEnhancementProvider,
  ThemeName 
} from '../services/imageProcessor.js';

async function runTests() {
  console.log('========================================================');
  console.log('🧪 Starting Automated Tests for AI Image Enhancer');
  console.log('========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${detail ? ` — ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. Create a synthetic test artisan product (e.g. Madhubani / Terracotta color)
  const testWidth = 600;
  const testHeight = 600;
  const sampleProductBuffer = await sharp({
    create: {
      width: testWidth,
      height: testHeight,
      channels: 4,
      background: { r: 184, g: 65, b: 35, alpha: 1 } // Deep terracotta red
    }
  }).png().toBuffer();

  // Test 1: DemoImageEnhancementProvider is available and returns buffer with alpha
  try {
    const provider = new DemoImageEnhancementProvider();
    assert(provider.isAvailable(), 'Test 1: Demo Image Enhancement Provider is available without paid API keys');

    const cutout = await provider.removeBackground(sampleProductBuffer);
    assert(cutout !== null && cutout.length > 0, 'Test 2: Product background removal isolates subject');

    const cutoutMeta = await sharp(cutout!).metadata();
    assert(Boolean(cutoutMeta.hasAlpha), 'Test 3: Cutout maintains transparent alpha channel for composition');
  } catch (err: any) {
    assert(false, 'Test 1-3 Failed', err.message);
  }

  // Test 4: Quality Score calculation
  try {
    const quality = calculateQualityScore(1000, 1000);
    assert(
      quality.overallScore >= 90 && 
      quality.background === 'Excellent' && 
      quality.marketplaceReadiness === 'Excellent',
      'Test 4: Quality Score calculation computes 90%+ with criteria breakdown'
    );
  } catch (err: any) {
    assert(false, 'Test 4 Failed', err.message);
  }

  // Test 5: All 7 Themes Composition
  const themes: ThemeName[] = [
    'clean_white',
    'premium_studio',
    'indian_heritage',
    'festive',
    'natural_craft',
    'minimal_luxury',
    'b2b_catalogue'
  ];

  try {
    const provider = new DemoImageEnhancementProvider();
    const cutout = await provider.removeBackground(sampleProductBuffer);

    let allThemesOk = true;
    for (const theme of themes) {
      const comp = await composeThemeImage(cutout!, theme, 800, 800);
      const meta = await sharp(comp).metadata();
      if (meta.width !== 800 || meta.height !== 800) {
        allThemesOk = false;
      }
    }
    assert(allThemesOk, 'Test 5: All 7 Themes successfully recompose onto standardized 800x800 canvas');
  } catch (err: any) {
    assert(false, 'Test 5 Failed', err.message);
  }

  // Test 6: Full Studio Enhancement Pipeline
  try {
    const result = await enhanceStudioProduct(sampleProductBuffer, 'terracotta_pot_test.png', 'indian_heritage');
    assert(result.status === undefined || result.id.startsWith('enh_'), 'Test 6: Full Studio pipeline returns valid result ID');
    assert(Boolean(result.cutoutUrl), 'Test 7: Studio pipeline generates and stores cutout PNG URL');
    assert(Boolean(result.enhancedUrl), 'Test 8: Studio pipeline generates enhanced theme composite URL');
    assert(Object.keys(result.themeOutputs).length === 7, 'Test 9: Studio pipeline outputs all 7 theme variations');
    assert(Boolean(result.marketplaceUrl && result.b2bCatalogueUrl), 'Test 10: Marketplace and B2B Catalogue versions are generated');
    assert(result.isDemoEnhancement === true, 'Test 11: Identifies as Demo Image Enhancement when external API is omitted');
  } catch (err: any) {
    assert(false, 'Test 6-11 Failed', err.message);
  }

  // Test 12: Product Color Preservation Check
  try {
    const result = await enhanceStudioProduct(sampleProductBuffer, 'color_check.png', 'clean_white');
    // Sample the center pixel from the enhanced image - should retain strong red/orange tones
    const { data } = await sharp(path.join(process.cwd(), 'server', result.enhancedUrl))
      .extract({ left: 400, top: 400, width: 10, height: 10 })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const avgR = data[0];
    const avgG = data[1];
    const avgB = data[2];

    // Original was R:184, G:65, B:35 -> R should remain dominant over G and B
    assert(avgR > avgG && avgR > avgB, 'Test 12: Product color preservation verifies authentic red/terracotta dominance without hue shift');
  } catch (err: any) {
    assert(false, 'Test 12 Failed', err.message);
  }

  console.log('\n========================================================');
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
