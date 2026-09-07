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
} else {
  chk(false, 'sitemap-missing');
}
console.log('total-pass=' + okGet + ' total-fail=' + failCount);
if (failCount > 0) {
  process.exitCode = 1;
}