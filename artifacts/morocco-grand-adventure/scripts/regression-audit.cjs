// Production regression audit - run AFTER pnpm build.
// CommonJS. Verifies: prerendered routes exist, the 17 GSC localized 404s are
// redirected (covered via routes that resolve), images present, sitemap contains only
// real prerendered pages.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
let okGet = 0;
let failCount = 0;
function chk(cond, label) {
  if (cond) {
    okGet = okGet + 1;
  } else {
    failCount = failCount + 1;
    console.log('FAIL ' + label);
  }
}
function walk(dir, out) {
  out = out || [];
  const names = fs.readdirSync(dir);
  for (const n of names) {
    const f = path.join(dir, n);
    const st = fs.statSync(f);
    if (st.isDirectory()) {
      walk(f, out);
    } else {
      out.push(f);
    }
  }
  return out;
}
function htmlExists(rel) {
  const d = path.join(dist, rel, 'index.html');
  if (fs.existsSync(d)) return true;
  const f = path.join(dist, rel + '.html');
  return fs.existsSync(f);
}
const REQUIRED = [
  'en', 'fr', 'es', 'it', 'de', 'nl', 'pt',
  'zh', 'ja', 'ko',
  'en/destinations', 'en/tours', 'en/desert-tours', 'en/trip-builder',
  'en/destinations/merzouga', 'en/destinations/erg-chebbi',
  'en/destinations/dades-valley', 'en/destinations/todra-gorge',
  'en/destinations/chefchaouen', 'en/destinations/casablanca',
  'en/tours/fes-5-day',
];
for (const r of REQUIRED) {
  chk(htmlExists(r), 'route ' + r);
}
console.log('routes-checked count=' + REQUIRED.length);
// 17 previously-reported GSC "Not found (404)" localized URLs.
// Each legacy/locale stem must be redirected by a vercel.json rule (semantic, same
// locale, to a real route) - never to the homepage. We verify a covering rule
// exists and the redirect destination prerenders.
const GSC_404S = [
  '/ko/투어/fes-5-day',
  '/zh/撒哈拉之旅',
  '/zh/梅尔祖卡指南',
  '/it/destinazioni/rabat',
  '/de/luxus-wuestencamp',
  '/ko/메르주가가이드',
  '/nl/rondreizen/3-day-sahara-agadir',
  '/nl/rondreizen/5-day-imperial-cities',
  '/nl/rondreizen/from-fes',
  '/nl/bestemmingen',
  '/it/destinazioni/erg-chebbi',
  '/nl/bestemmingen/rabat',
  '/it/destinazioni/chefchaouen',
  '/nl/merzouga-gids',
  '/nl/reis-plannen',
  '/it/campo-deserto-lusso',
  '/it/destinazioni/ait-ben-haddou',
];
function matchesSource(url, pat) {
  if (url === pat) return true;
  if (pat.slice(-6) === ':rest*') {
    const base = pat.slice(0, -6);
    return url === base || url.startsWith(base);
  }
  return false;
}
const VERCEL_PATH_LOCAL = path.join(root, 'vercel.json');
const VERCEL_PATH_REPO = path.join(root, '..', '..', 'vercel.json');
const VERCEL_PATH = fs.existsSync(VERCEL_PATH_LOCAL) ? VERCEL_PATH_LOCAL : VERCEL_PATH_REPO;
const redir = JSON.parse(fs.readFileSync(VERCEL_PATH, 'utf8'));
// These 4 legacy URLs use non-ASCII segments. Vercel's router matches redirect
// sources against the raw (percent-encoded) request path while decoding config
// sources once at parse time - literal Unicode sources NEVER match in production
// (verified live: 404 despite matching literal rules). The working form is a
// DOUBLE-ENCODED source. Regression: each of these must have a double-encoded
// covering rule whose destination prerenders.
const NON_ASCII_404S = GSC_404S.filter(function (u) { return /[^\x00-\x7F]/.test(u); });
// These 4 legacy URLs use non-ASCII (Korean/Chinese) segments. vercel.json redirect
// sources CANNOT match them in production (Vercel URL-decodes sources at ingest and
// never matches non-ASCII - verified live for literal, single- and double-encoded
// forms). The working mechanism is STATIC redirect pages emitted into dist/ by
// scripts/legacy-unicode-redirects.mjs: 0s meta refresh + canonical + JS replace.
// Regression: each legacy URL must have a static redirect page whose target prerenders.
const LEGACY_REDIRECT_DESTS = {
  '/ko/투어/fes-5-day': '/ko/tours/fes-5-day',
  '/zh/撒哈拉之旅': '/zh/desert-tours',
  '/zh/梅尔祖卡指南': '/zh/merzouga-guide',
  '/ko/메르주가가이드': '/ko/merzouga-guide',
};
for (const u of NON_ASCII_404S) {
  const rel = u.replace(/^\//, '');
  const f = path.join(dist, rel + '.html');
  const exists = fs.existsSync(f);
  chk(exists, 'nonascii-static-redirect-page ' + u);
  if (exists) {
    const t = fs.readFileSync(f, 'utf8');
    const dest = LEGACY_REDIRECT_DESTS[u];
    chk(t.indexOf('url=' + dest) !== -1, 'nonascii-redirect-target ' + u + ' -> ' + dest);
    chk(t.indexOf('rel="canonical"') !== -1, 'nonascii-redirect-canonical ' + u);
    chk(htmlExists(dest.replace(/^\//, '')), 'nonascii-redirect-dest-prerenders ' + dest);
  }
}
for (const u of GSC_404S) {
  let covered = false;
  let dest = null;
  if (redir.redirects) {
    for (const r of redir.redirects) {
      if (r.source === u || matchesSource(u, r.source)) {
        covered = true;
        dest = r.destination;
        break;
      }
    }
  }
  chk(covered, 'gsc-redirect-source ' + u);
  if (covered && dest) {
    const norm = dest.replace(/\/$/, '');
    const rel = norm.replace(/^\//, '').replace(':rest*', '');
    chk(htmlExists(rel), 'gsc-redirect-dest ' + dest);
  }
}
console.log('gsc-404-checked=' + GSC_404S.length);
// --- Image reference audit: every /images/... path referenced in src must exist on disk
const srcFiles = walk(path.join(root, 'src')).filter(function (f) {
  return /\.(ts|tsx)$/.test(f);
});
let imgRefs = 0;
for (const f of srcFiles) {
  const t = fs.readFileSync(f, 'utf8');
  const re = /\/images\/[A-Za-z0-9_\-./]+\.(?:webp|jpe?g|png|avif|svg)/g;
  let m = re.exec(t);
  while (m !== null) {
    imgRefs = imgRefs + 1;
    const disk = path.join(root, 'public', m[0].replace(/\//g, path.sep));
    if (!fs.existsSync(disk)) {
      chk(false, 'missing-img ' + m[0] + ' in ' + path.basename(f));
    }
    m = re.exec(t);
  }
}
chk(imgRefs > 0, 'no-image-refs-found');
console.log('img-refs=' + imgRefs);

// --- Sitemap audit: every sitemap URL must be a prerendered page (or asset)
const sitemapPath = path.join(dist, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [];
  const lre = /<loc>([^<]+)<\/loc>/g;
  let lm = lre.exec(xml);
  while (lm !== null) {
    locs.push(lm[1].trim());
    lm = lre.exec(xml);
  }
  let bad = 0;
  for (const u of locs) {
    const p = u.replace('https://www.moroccograndadventure.com', '');
    const rel = p.replace(/^\//, '').replace(/\/$/, '');
    if (rel === '') continue;
    if (!htmlExists(rel)) {
      bad = bad + 1;
      chk(false, 'sitemap-dead ' + u);
    }
  }
  console.log('sitemap-urls=' + locs.length + ' dead=' + bad);
  // Sitemap contract: exactly 1,397 localized URLs, no duplicates, and homepage
  // hreflang alternates without trailing slash (matches on-page canonical "/en").
  chk(locs.length === 1496, 'sitemap-count-1496 got ' + locs.length);
  chk(new Set(locs).size === locs.length, 'sitemap-no-duplicates');
  const homeBlock = xml.split('<url>').find(function (b) { return b.indexOf('<loc>' + 'https://www.moroccograndadventure.com/en<') !== -1; });
  chk(!!homeBlock, 'sitemap-homepage-block');
  if (homeBlock) {
    chk(homeBlock.indexOf('/en/"') === -1 && homeBlock.indexOf('/en"') !== -1, 'sitemap-homepage-hreflang-no-trailing-slash');
    const altCount = (homeBlock.match(/xhtml:link/g) || []).length;
    chk(altCount === 12, 'sitemap-homepage-12-alternates got ' + altCount);
  }
  // spot-check: every homepage block (all locales) uses no trailing slash
  const slashy = (xml.match(/hreflang="(?!x-default)"[^>]*href="https:\/\/www\.moroccograndadventure\.com\/[a-z]{2}\/"/g) || []).length;
  chk(slashy === 0, 'sitemap-no-trailing-slash-homepages got ' + slashy);
} else {
  chk(false, 'sitemap-missing');
}
// --- SEO metadata regression audit (Phase 1) ---
// Scans every prerendered localized page for metadata regressions.
const SITE_ORIGIN = 'https://www.moroccograndadventure.com';
const LANG_CODES = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];
const MOJI_PATTERNS = ['Ã©','Ã¨','Ã¯','Ã´','Ã¢','Ã»','Ã§','Ã','Â','â€','â€™','â€œ','â€\x9d','Ø±','Ø§','Ù…'];
function mojiHit(s) { return MOJI_PATTERNS.some(function (p) { return s.indexOf(p) !== -1; }); }
function decodeEnt(s) {
  return s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&mdash;/g, '—').replace(/&hellip;/g, '…').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
const metaPages = [];
function walkHtml(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(f);
    else if (e.name === 'index.html') metaPages.push(f);
  }
}
walkHtml(dist);
const titleByLocale = {};
let mojiPages = 0, suffixDup = 0, canonicalBad = 0, hreflangBad = 0;
for (const f of metaPages) {
  const rel = path.relative(dist, f).split(path.sep).join('/');
  const urlPath = '/' + rel.slice(0, -'/index.html'.length);
  const segs = urlPath.split('/').filter(Boolean);
  const locale = segs[0];
  if (!locale || LANG_CODES.indexOf(locale) === -1) continue; // skip legacy-redirect stubs etc.
  const rest = '/' + segs.slice(1).join('/');
  const html = fs.readFileSync(f, 'utf8');
  const title = decodeEnt((html.match(/<title>([^<]*)<\/title>/) || ['', ''])[1]);
  const desc = decodeEnt((html.match(/<meta name="description" content="([^"]*)"/) || ['', ''])[1]);
  if (mojiHit(title) || mojiHit(desc)) { mojiPages++; chk(false, 'mojibake-in-head ' + urlPath); }
  // brand suffix must never appear more than once (and never mid-title)
  if ((title.match(/Morocco Grand Adventure/g) || []).length > 1) { suffixDup++; chk(false, 'brand-suffix-duplicated ' + urlPath); }
  // canonical safety: must equal SITE_ORIGIN/<lang><rest> exactly
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || ['', ''])[1];
  const expectedCanonical = SITE_ORIGIN + urlPath;
  if (canonical !== expectedCanonical) { canonicalBad++; chk(false, 'canonical-changed ' + urlPath + ' got ' + canonical); }
  // hreflang safety: 12 alternates (11 locales + x-default), none with a locale trailing slash
  const alts = html.match(/<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/g) || [];
  const slashyAlt = alts.filter(function (a) { return /https:\/\/www\.moroccograndadventure\.com\/[a-z]{2}\/"/.test(a); }).length;
  if (alts.length !== 12 || slashyAlt !== 0) { hreflangBad++; chk(false, 'hreflang-changed ' + urlPath + ' n=' + alts.length + ' slashy=' + slashyAlt); }
  (titleByLocale[locale] = titleByLocale[locale] || []).push({ url: urlPath, title: title });
}
// duplicate titles within a locale
let dupTitles = 0;
for (const loc of Object.keys(titleByLocale)) {
  const seen = {};
  for (const p of titleByLocale[loc]) {
    if (seen[p.title]) { dupTitles++; chk(false, 'duplicate-title ' + loc + ' :: ' + p.title + ' :: ' + seen[p.title] + ' + ' + p.url); }
    else seen[p.title] = p.url;
  }
}
// homepage-fallback guard: /agadir-tours and /casablanca-tours must not use HOME_META
for (const loc of LANG_CODES) {
  const list = titleByLocale[loc] || [];
  const home = list.find(function (p) { return p.url === '/' + loc; });
  if (!home) continue;
  for (const cityRoute of ['/agadir-tours', '/casablanca-tours']) {
    const page = list.find(function (p) { return p.url === '/' + loc + cityRoute; });
    chk(!!page, 'city-page-exists ' + loc + cityRoute);
    if (page) chk(page.title !== home.title, 'city-page-not-home-meta ' + loc + cityRoute);
  }
}
console.log('seo-meta: pages=' + metaPages.length + ' mojibake=' + mojiPages + ' suffix-dup=' + suffixDup + ' dup-titles=' + dupTitles + ' canonical-bad=' + canonicalBad + ' hreflang-bad=' + hreflangBad);
console.log('total-pass=' + okGet + ' total-fail=' + failCount);
if (failCount > 0) {
  process.exitCode = 1;
}