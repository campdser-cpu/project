import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = 'https://www.moroccograndadventure.com';
const langs = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];

// ── lastmod ──────────────────────────────────────────────────────────────────
// A real, verifiable signal only: the git commit date of the actual source
// file(s) whose content drives that page. Never a fabricated or "now" date.
// Granularity is per page-KIND (e.g. every /tours/:id page points at
// content.ts), not a unique date invented per URL — that file genuinely is
// the last thing that changed that page's content, and git's commit date for
// it is real history, so this stays honest even though it is coarse.
const gitDateCache = new Map();
function gitLastMod(relFile) {
  if (gitDateCache.has(relFile)) return gitDateCache.get(relFile);
  let iso = null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', relFile], { cwd: root, encoding: 'utf8' }).trim();
    if (out) iso = out.slice(0, 10); // YYYY-MM-DD (W3C date, no fabricated time-of-day)
  } catch {
    iso = null; // no git history for this file (e.g. untracked) — omit lastmod rather than guess
  }
  gitDateCache.set(relFile, iso);
  return iso;
}
function latestLastMod(relFiles) {
  const dates = relFiles.map(gitLastMod).filter(Boolean);
  if (!dates.length) return null;
  return dates.reduce((a, b) => (a > b ? a : b));
}
// Ordered rules, most specific first; first match on the de-localized `rest`
// path wins. Static single-page routes map to their own page component;
// content-driven routes map to the data file that actually holds their text.
const LASTMOD_RULES = [
  [/^$/, ['src/pages/home.tsx']],
  [/^\/tours\/from-[^/]+\/[^/]+$/, ['src/pages/tours/from-city-duration.tsx', 'src/data/tour-hierarchy.ts']],
  [/^\/tours\/from-[^/]+$/, ['src/pages/tours/from-city.tsx', 'src/data/tour-hierarchy.ts']],
  [/^\/tours\/[^/]+$/, ['src/data/content.ts']],
  [/^\/tours$/, ['src/pages/tours.tsx']],
  [/^\/destinations\/[^/]+$/, ['src/data/content.ts']],
  [/^\/destinations$/, ['src/pages/destinations.tsx']],
  [/^\/merzouga-guide\/[^/]+$/, ['src/data/seoHub.ts']],
  [/^\/merzouga-guide$/, ['src/pages/merzouga-guide.tsx']],
  [/^\/comparisons\/[^/]+$/, ['src/data/seoHub.ts']],
  [/^\/travel-info\/[^/]+$/, ['src/data/seoHub.ts']],
  [/^\/travel-info$/, ['src/pages/travel-info.tsx']],
  [/^\/blog\/[^/]+$/, ['src/data/blog-article-sections.ts', 'src/i18n/content/index.ts']],
  [/^\/blog$/, ['src/pages/blog.tsx']],
  [/^\/student-tours\/university-groups$/, ['src/pages/student-tours-university-groups.tsx']],
  [/^\/student-tours\/[^/]+$/, ['src/pages/student-tour-detail.tsx', 'src/data/student-tours.ts']],
  [/^\/student-tours$/, ['src/pages/student-tours.tsx']],
  [/^\/about$/, ['src/pages/about.tsx']],
  [/^\/contact$/, ['src/pages/contact.tsx']],
  [/^\/gallery$/, ['src/pages/gallery.tsx']],
  [/^\/faq$/, ['src/pages/faq.tsx']],
  [/^\/things-to-do-in-morocco$/, ['src/pages/things-to-do.tsx']],
  [/^\/trip-builder$/, ['src/pages/trip-builder.tsx']],
  [/^\/trip-finder$/, ['src/pages/trip-finder.tsx']],
  [/^\/build-your-day-trip$/, ['src/pages/build-your-day-trip.tsx']],
  [/^\/desert-tours$/, ['src/pages/desert-tours.tsx']],
  [/^\/flights$/, ['src/pages/flights.tsx']],
  [/^\/luxury-camp$/, ['src/pages/luxury-camp.tsx']],
  [/^\/camel-trekking$/, ['src/pages/camel-trekking.tsx']],
  [/^\/4x4-tours$/, ['src/pages/4x4-tours.tsx']],
  [/^\/marrakech-tours$/, ['src/pages/marrakech-tours.tsx']],
  [/^\/fes-tours$/, ['src/pages/fes-tours.tsx']],
  [/^\/agadir-tours$/, ['src/pages/agadir-tours.tsx']],
  [/^\/casablanca-tours$/, ['src/pages/casablanca-tours.tsx']],
  [/^\/day-trips$/, ['src/pages/day-trips.tsx']],
];
function lastModFor(rest) {
  for (const [re, files] of LASTMOD_RULES) if (re.test(rest)) return latestLastMod(files);
  // Fallback for anything not matched above (e.g. legacy aliases): the shared
  // per-locale metadata file is still a real, truthful "last touched" signal.
  return latestLastMod(['src/components/seo/route-metadata.ts']);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}
function urlFor(file) {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}
function restFor(pathname, lang) {
  const rest = pathname.slice(`/${lang}`.length);
  // No trailing slash: on-page canonicals use "/en", so homepage hreflang
  // alternates must be "${site}/en" (not "${site}/en/").
  return !rest || rest === '/' ? '' : rest;
}
// Real images actually present in this exact prerendered file - extracted
// from the real <img> tags Google would see, never guessed from the data
// layer. Only genuine content images under /images/ are included (not the
// brand logo/favicon/OG assets, which carry no destination/experience value
// in Google Images and would just add noise to every single page).
function imagesIn(html) {
  const found = new Set();
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const src = m[1];
    if (src.startsWith('/images/')) found.add(`${site}${src}`);
  }
  return [...found];
}
// No current image filename contains XML-special characters (verified against
// the real build), but <image:loc> is XML text content like any other, so it
// must be escaped on principle rather than relying on today's filenames never
// containing one of these characters.
function escapeXml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function imageBlock(urls) {
  if (!urls.length) return '';
  return '\n' + urls.map((u) => `    <image:image>\n      <image:loc>${escapeXml(u)}</image:loc>\n    </image:image>`).join('\n');
}
// Static legacy-unicode redirect pages (see scripts/legacy-unicode-redirects.mjs)
// live in dist/ but must never enter the sitemap - keeps the URL count at 1,397.
const LEGACY_REDIRECT_PATHS = new Set([
  '/ko/투어/fes-5-day',
  '/zh/撒哈拉之旅',
  '/zh/梅尔祖卡指南',
  '/ko/메르주가가이드',
]);
// /book is prerendered for every locale, but vercel.json permanently redirects
// every /{lang}/book URL to /{lang}/trip-builder before it is ever served - so
// it must never enter the sitemap either (it would be a submitted URL that
// always redirects instead of returning 200).
function isUnreachableBookPath(pathname) {
  const lang = pathname.split('/')[1];
  return langs.includes(lang) && restFor(pathname, lang) === '/book';
}
function block(pathname, images) {
  const lang = pathname.split('/')[1];
  const rest = restFor(pathname, lang);
  const alternates = langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site}/${l}${rest}" />`).join('\n');
  const lastmod = lastModFor(rest);
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `  <url>\n    <loc>${site}${pathname}</loc>${lastmodTag}\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/en${rest}" />${imageBlock(images)}\n  </url>`;
}

if (!fs.existsSync(dist)) throw new Error('dist directory missing');
// Map each kept URL to the real file it was generated from, so its real <img>
// tags can be read back for the image-sitemap entries below.
const fileByPath = new Map();
for (const file of walk(dist)) {
  const p = urlFor(file);
  if (langs.includes(p.split('/')[1]) && !LEGACY_REDIRECT_PATHS.has(p) && !isUnreachableBookPath(p)) fileByPath.set(p, file);
}
const paths = [...fileByPath.keys()].sort();
let imageCount = 0;
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <!-- Generated only from prerendered, localized HTML pages. Image entries are\n       extracted from each page's own real <img> tags, never guessed. -->\n${paths.map((p) => {
  const images = imagesIn(fs.readFileSync(fileByPath.get(p), 'utf8'));
  imageCount += images.length;
  return block(p, images);
}).join('\n')}\n</urlset>\n`;
for (const target of [path.join(root, 'public', 'sitemap.xml'), path.join(dist, 'sitemap.xml')]) {
  fs.writeFileSync(target, xml, 'utf8');
}
console.log(`Sitemap generated from ${paths.length} real prerendered URLs (${imageCount} image entries).`);
