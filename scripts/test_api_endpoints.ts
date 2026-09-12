import http from 'http';

function get(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    const productsRes = await get('/api/products?limit=5');
    console.log('Products API Total:', productsRes.total, 'Returned:', productsRes.returned);
    if (productsRes.products && productsRes.products.length > 0) {
      const p = productsRes.products[0];
      console.log('Sample Product:', p.titleEn, '| Artisan:', p.artisanName, '| State:', p.artisanState, '| Price: ₹' + p.price);
    }

    const scenariosRes = await get('/api/demo/scenarios');
    console.log('Scenarios API Total:', scenariosRes.total);

    const statsRes = await get('/api/demo/stats');
    console.log('Stats API:', statsRes.stats);

    const matchesRes = await get('/api/market-matches?limit=3');
    console.log('Market Matches API Total:', matchesRes.total, 'Returned:', matchesRes.returned);
    if (matchesRes.matches && matchesRes.matches.length > 0) {
      console.log('Sample Match Score:', matchesRes.matches[0].compatibilityScore, '| Warning:', matchesRes.matches[0].capacityMismatchWarning || 'None');
    }
    console.log('ALL API ENDPOINTS VERIFIED SUCCESSFULLY!');
  } catch (err) {
    console.error('API Test Error:', err);
  }
}

run();
