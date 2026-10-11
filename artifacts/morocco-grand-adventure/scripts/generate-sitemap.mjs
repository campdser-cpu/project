import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = 'https://www.moroccograndadventure.com';
const langs = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];

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
  return `  <url>\n    <loc>${site}${pathname}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/en${rest}" />${imageBlock(images)}\n  </url>`;
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
