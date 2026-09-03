const base = (process.argv[2] || 'https://www.moroccograndadventure.com').replace(/\/$/, '');
const concurrency = Number(process.env.ROUTE_AUDIT_CONCURRENCY || 12);
const timeoutMs = Number(process.env.ROUTE_AUDIT_TIMEOUT_MS || 15000);
const jsonOutput = process.argv.includes('--json') || process.env.ROUTE_AUDIT_JSON === '1';
const outputPath = process.env.ROUTE_AUDIT_OUTPUT || 'dist/production-route-audit.json';

const importantPaths = [
  '/', '/en', '/en/tours', '/en/contact', '/en/book', '/en/trip-builder', '/en/day-trips', '/en/destinations', '/en/about', '/en/reviews',
  '/en/tours/2-day-zagora-desert-marrakech', '/en/tours/3-day-sahara-marrakech', '/en/tours/4-day-marrakech-merzouga-sahara',
  '/en/tours/5-day-great-south-morocco', '/en/tours/3-day-fes-merzouga-sahara', '/en/tours/4-day-fes-marrakech-via-merzouga',
  '/fr/tours/3-day-sahara-marrakech', '/fr/contact', '/fr/trip-builder', '/fr/book',
];

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1].trim());
}

function htmlMeta(text) {
  const title = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
  const description = text.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || '';
  const canonical = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] || '';
  const robots = text.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] || '';
  const h1Count = [...text.matchAll(/<h1\b[^>]*>/gi)].length;
  const hreflang = [...text.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi)].map((m) => ({ lang: m[1], href: m[2] }));
  const jsonLdBlocks = [...text.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
  let validJsonLd = 0;
  for (const block of jsonLdBlocks) { try { JSON.parse(block); validJsonLd++; } catch {} }
  const visibleText = text.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return { title, description, canonical, robots, h1Count, hreflang, structuredDataBlocks: jsonLdBlocks.length, validStructuredDataBlocks: validJsonLd, meaningfulContentChars: visibleText.length };
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const text = await res.text();
    return { res, text, responseMs: Math.round(performance.now() - started) };
  } finally { clearTimeout(timer); }
}

async function follow(url) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop < 10; hop++) {
    try {
      const { res, text, responseMs } = await fetchWithTimeout(current, { redirect: 'manual' });
      const location = res.headers.get('location');
      chain.push({ url: current, status: res.status, location, responseMs });
      if (res.status < 300 || res.status >= 400 || !location) {
        return { url, finalUrl: current, finalStatus: res.status, redirectChain: chain, meta: res.status >= 200 && res.status < 300 ? htmlMeta(text) : null };
      }
      current = new URL(location, current).href;
    } catch (error) {
      chain.push({ url: current, status: 0, error: String(error) });
      return { url, finalUrl: current, finalStatus: 0, redirectChain: chain, meta: null };
    }
  }
  return { url, finalUrl: current, finalStatus: 0, redirectChain: chain, error: 'Too many redirects' };
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length); let next = 0;
  async function worker() { while (true) { const index = next++; if (index >= items.length) return; results[index] = await fn(items[index]); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const sitemapFetch = await fetchWithTimeout(`${base}/sitemap.xml`);
if (!sitemapFetch.res.ok) { console.error(`Sitemap failed: HTTP ${sitemapFetch.res.status}`); process.exit(1); }
const sitemapUrls = extractSitemapUrls(sitemapFetch.text);
const urls = [...new Set([...sitemapUrls, ...importantPaths.map((p) => `${base}${p}`)])];
const sitemapSet = new Set(sitemapUrls);

console.log(`Production route audit: ${base}`);
console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`Unique URLs checked: ${urls.length}`);
const results = await mapLimit(urls, concurrency, follow);

const summary = {
  checked: results.length,
  sitemapUrls: sitemapUrls.length,
  sitemapDuplicates: sitemapUrls.length - sitemapSet.size,
  success2xx: results.filter((r) => r.finalStatus >= 200 && r.finalStatus < 300).length,
  redirects: results.filter((r) => r.redirectChain.length > 1).length,
  failures: results.filter((r) => r.finalStatus < 200 || r.finalStatus >= 400).length,
  missingCanonical: results.filter((r) => r.meta && !r.meta.canonical).length,
  missingTitle: results.filter((r) => r.meta && !r.meta.title).length,
  missingDescription: results.filter((r) => r.meta && !r.meta.description).length,
  badH1Count: results.filter((r) => r.meta && r.meta.h1Count !== 1).length,
  invalidStructuredData: results.filter((r) => r.meta && r.meta.structuredDataBlocks !== r.meta.validStructuredDataBlocks).length,
  emptyContent: results.filter((r) => r.meta && r.meta.meaningfulContentChars < 500).length,
};

console.log(JSON.stringify(summary, null, 2));
const failures = results.filter((r) => r.finalStatus < 200 || r.finalStatus >= 400);
if (failures.length) { console.log('\nFailures:'); for (const r of failures) console.log(`${r.finalStatus} ${r.url} -> ${r.finalUrl}`); }

if (jsonOutput) {
  const fs = await import('node:fs/promises');
  await fs.mkdir(new URL('.', `file://${process.cwd()}/${outputPath}`), { recursive: true }).catch(() => {});
  await fs.writeFile(outputPath, JSON.stringify({ generatedAt: new Date().toISOString(), base, summary, results }, null, 2));
  console.log(`Machine-readable report: ${outputPath}`);
}

process.exitCode = failures.length ? 1 : 0;
