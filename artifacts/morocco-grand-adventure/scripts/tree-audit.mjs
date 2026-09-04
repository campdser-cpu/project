// ─────────────────────────────────────────────────────────────────────────────
// Tree Audit — click depth, orphans, broken links, sitemap/canonical mismatch.
// Runs against the PRERENDERED HTML in dist/ (what Googlebot sees), using the
// prerendered sitemap as URL inventory. Reports per URL: type, BFS click depth
// from the localized homepage, incoming/outgoing internal links, and flags:
// ORPHAN, UNREACHABLE-FROM-HOME, BROKEN links, SITEMAP-MISMATCH, CANONICAL-MISMATCH.
// Usage: node scripts/tree-audit.mjs [--lang en]
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, posix } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const LANG = process.argv.includes('--lang') ? process.argv[process.argv.indexOf('--lang') + 1] : 'en';
const SITE = 'https://www.moroccograndadventure.com';
const BASE = `${SITE}/${LANG}`;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.endsWith('.html')) out.push(p);
  }
  return out;
}
const files = walk(join(DIST, LANG));
function pathToRest(file) {
  let rel = posix.join(...relative(join(DIST, LANG), file).split('\\'));
  if (rel === 'index.html') return '/';
  rel = rel.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
  return '/' + rel;
}
const restToFile = new Map(files.map((f) => [pathToRest(f), f]));
const restSet = new Set(restToFile.keys());

const sitemapRaw = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapRaw.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapRest = new Set(sitemapUrls.map((u) => u.replace(`${SITE}/en`, '').replace(/\/$/, '') || '/'));
const langSitemap = sitemapUrls.filter((u) => u.startsWith(`${BASE}/`) || u === BASE);

function classify(rest) {
  if (rest === '/') return 'home';
  if (rest === '/tours') return 'tours-hub';
  if (/^\/tours\/from-[a-z]+$/.test(rest)) return 'city-hub';
  if (/^\/tours\/from-[a-z]+\/\d+-days$/.test(rest)) return 'duration-hub';
  if (/^\/tours\/[a-z0-9-]+$/.test(rest)) return 'tour-detail';
  if (rest === '/destinations') return 'destinations-hub';
  if (/^\/destinations\/[a-z0-9-]+$/.test(rest)) return 'destination-detail';
  if (/^\/blog\/[a-z0-9-]+$/.test(rest)) return 'blog-post';
  return 'other';
}

function extractLinks(html) {
  const urls = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map((m) => m[1]);
  const internal = [];
  for (const u of urls) {
    let rest = null;
    if (u.startsWith(`${BASE}/`)) rest = u.slice(BASE.length) || '/';
    else if (u.startsWith('/') && !u.startsWith('//') && !/\.[a-z0-9]+$/i.test(u.split('#')[0].split('?')[0])) {
      rest = u.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
      // Site-relative links may already carry the language prefix (/en/tours/...).
      if (rest.startsWith(`/${LANG}/`)) rest = rest.slice(LANG.length + 1) || '/';
    } else continue;
    if (rest.startsWith('/assets') || rest.startsWith('/fonts')) continue;
    internal.push(rest);
  }
  return internal;
}

function resolves(rest) {
  return restSet.has(rest) || restSet.has(rest.replace(/\/$/, ''));
}

const pages = new Map();
for (const [rest, file] of restToFile) {
  const html = readFileSync(file, 'utf8');
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1];
  const links = extractLinks(html);
  pages.set(rest, { outLinks: new Set(links), incoming: new Set(), type: classify(rest), canonical });
}

let broken = [];
for (const [rest, page] of pages) {
  for (const target of page.outLinks) {
    if (!resolves(target)) { broken.push({ from: rest, to: target }); continue; }
    if (pages.has(target)) pages.get(target).incoming.add(rest);
  }
}

// ── BFS click depth from homepage ─────────────────────────────────────────────
const depth = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length) {
  const cur = queue.shift();
  const page = pages.get(cur);
  if (!page) continue;
  for (const target of page.outLinks) {
    if (pages.has(target) && !depth.has(target)) {
      depth.set(target, depth.get(cur) + 1);
      queue.push(target);
    }
  }
}

// ── report ────────────────────────────────────────────────────────────────────
const rows = [...pages.entries()].map(([rest, p]) => ({
  url: `${BASE}${rest === '/' ? '' : rest}`,
  type: p.type,
  depth: depth.get(rest) ?? 'UNREACHABLE',
  incoming: p.incoming.size,
  outgoing: p.outLinks.size,
  flags: [
    p.incoming.size === 0 && rest !== '/' ? 'ORPHAN' : null,
    (depth.get(rest) ?? Infinity) === Infinity ? 'UNREACHABLE-FROM-HOME' : null,
    sitemapRest.has(rest) ? null : 'SITEMAP-MISMATCH',
    p.canonical && p.canonical !== `${BASE}${rest === '/' ? '' : rest}` ? `CANONICAL-MISMATCH:${p.canonical}` : null,
  ].filter(Boolean),
})).sort((a, b) => (a.depth === b.depth ? a.url.localeCompare(b.url) : (a.depth === 'UNREACHABLE' ? 1 : b.depth === 'UNREACHABLE' ? -1 : a.depth - b.depth)));

const tourRows = rows.filter((r) => r.type === 'tour-detail');
const durRows = rows.filter((r) => r.type === 'duration-hub');
const cityRows = rows.filter((r) => r.type === 'city-hub');
const tourDepths = tourRows.map((r) => r.depth).filter((d) => typeof d === 'number');

console.log(`TREE AUDIT — language: ${LANG}`);
console.log(`prerendered pages: ${pages.size} | sitemap URLs (all langs): ${sitemapUrls.length} (${langSitemap.length} for /${LANG}/)`);
console.log(`city hubs: ${cityRows.length} | duration hubs: ${durRows.length} | tour details: ${tourRows.length}`);
console.log(`broken internal links: ${broken.length}`);
const flagged = rows.filter((r) => r.flags.length);
console.log(`flagged pages: ${flagged.length}`);
if (broken.length) console.log('BROKEN:\n' + broken.slice(0, 20).map((b) => `  ${b.from} -> ${b.to}`).join('\n'));
for (const r of flagged.slice(0, 30)) console.log(`  [${r.flags.join(', ')}] ${r.url}`);

console.log(`\nTOUR CLICK DEPTH — min: ${Math.min(...tourDepths)} max: ${Math.max(...tourDepths)} avg: ${(tourDepths.reduce((a, b) => a + b, 0) / tourDepths.length).toFixed(2)}`);
console.log('\nURL | TYPE | DEPTH | IN | OUT');
for (const r of rows) console.log(`${r.url} | ${r.type} | ${r.depth} | ${r.incoming} | ${r.outgoing}${r.flags.length ? ' | ' + r.flags.join(',') : ''}`);

