import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = 'https://www.moroccograndadventure.com';
const langs = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}
function text(html, re) { return html.match(re)?.[1]?.replace(/\s+/g, ' ').trim() ?? ''; }
function urlFor(file) {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}
function pageFile(urlPath) {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return path.join(dist, 'index.html');
  const file = path.join(dist, clean + '.html');
  const index = path.join(dist, clean, 'index.html');
  return fs.existsSync(file) ? file : index;
}
function isInternal(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('data:')) return false;
  if (/^https?:\/\//i.test(href)) return href.startsWith(site + '/');
  return href.startsWith('/');
}

if (!fs.existsSync(dist)) {
  console.error('SEO content audit: dist/ does not exist. Run the build first.');
  process.exit(1);
}

// Audit only localized site pages. Root-level verification artifacts and the
// Vite shell are intentionally outside this SEO page contract.
const files = walk(dist).filter((f) => langs.includes(path.relative(dist, f).split(path.sep)[0]));
const titles = new Map();
const descriptions = new Map();
let checked = 0;
let internalLinks = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const url = urlFor(file);
  const title = text(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = text(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  checked++;

  if (!title) errors.push(`${url}: missing title`);
  if (!description) errors.push(`${url}: missing meta description`);
  if (h1s.length !== 1) errors.push(`${url}: expected exactly 1 H1, found ${h1s.length}`);
  if (title.length > 70) warnings.push(`${url}: title > 70 chars`);
  if (description.length > 170) warnings.push(`${url}: description > 170 chars`);

  const titleKey = title.toLowerCase();
  const descKey = description.toLowerCase();
  if (titleKey) titles.set(titleKey, (titles.get(titleKey) || 0) + 1);
  if (descKey) descriptions.set(descKey, (descriptions.get(descKey) || 0) + 1);

  for (const [, href] of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
    if (!isInternal(href)) continue;
    internalLinks++;
    const target = href.split('#')[0].split('?')[0];
    if (!target || target.startsWith('http')) continue;
    if (!pageFile(target)) errors.push(`${url}: broken internal link ${href}`);
  }
}

for (const [value, count] of titles) if (count > 1) warnings.push(`duplicate title (${count} pages): ${value.slice(0, 120)}`);
for (const [value, count] of descriptions) if (count > 1) warnings.push(`duplicate description (${count} pages): ${value.slice(0, 120)}`);

const sitemap = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sitemap)) errors.push('sitemap.xml missing from dist/');

console.log(`SEO content audit: checked ${checked} localized HTML pages and ${internalLinks} internal links.`);
if (warnings.length) console.log(`SEO warnings: ${warnings.length}`);
if (errors.length) {
  console.error(`SEO errors: ${errors.length}`);
  console.error(errors.slice(0, 100).join('\n'));
  process.exit(1);
}
console.log('SEO content audit: PASS');
