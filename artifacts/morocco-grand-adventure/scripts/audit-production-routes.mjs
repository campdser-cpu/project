const base = (process.argv[2] || 'https://www.moroccograndadventure.com').replace(/\/$/, '');
const sitemapUrl = `${base}/sitemap.xml`;
const concurrency = Number(process.env.ROUTE_AUDIT_CONCURRENCY || 12);

const importantPaths = [
  '/', '/en', '/en/tours', '/en/contact', '/en/book', '/en/trip-builder',
  '/en/day-trips', '/en/destinations', '/en/about',
  '/en/tours/2-day-zagora-desert-marrakech',
  '/en/tours/3-day-sahara-marrakech',
  '/en/tours/4-day-marrakech-merzouga-sahara',
  '/en/tours/5-day-great-south-morocco',
  '/en/tours/3-day-fes-merzouga-sahara',
  '/en/tours/4-day-fes-marrakech-via-merzouga',
];

async function fetchText(url, options = {}) {
  const res = await fetch(url, { redirect: 'manual', ...options });
  return { res, text: await res.text() };
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1].trim());
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    return { url, status: res.status, location: res.headers.get('location') };
  } catch (error) {
    return { url, status: 0, error: String(error) };
  }
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const sitemap = await fetchText(sitemapUrl);
if (!sitemap.res.ok) {
  console.error(`Sitemap failed: HTTP ${sitemap.res.status} ${sitemapUrl}`);
  process.exit(1);
}

const sitemapUrls = extractSitemapUrls(sitemap.text);
const urls = [...new Set([...sitemapUrls, ...importantPaths.map((p) => `${base}${p}`)])];
console.log(`Production route audit: ${base}`);
console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`Unique URLs checked: ${urls.length}`);

const results = await mapLimit(urls, concurrency, checkUrl);
const counts = results.reduce((acc, r) => {
  const key = r.status >= 200 && r.status < 300 ? '2xx' : r.status >= 300 && r.status < 400 ? '3xx' : r.status >= 400 && r.status < 500 ? '4xx' : r.status >= 500 ? '5xx' : 'network';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

for (const key of ['2xx', '3xx', '4xx', '5xx', 'network']) console.log(`${key}: ${counts[key] || 0}`);

const failures = results.filter((r) => r.status < 200 || r.status >= 400);
if (failures.length) {
  console.log('\nNon-2xx results:');
  for (const r of failures) console.log(`${r.status} ${r.url}${r.location ? ` -> ${r.location}` : ''}${r.error ? ` (${r.error})` : ''}`);
  process.exitCode = 1;
} else {
  console.log('\nAll production sitemap/customer-facing URLs returned 2xx.');
}
