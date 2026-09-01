import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname, '..');
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

const files = walk(dist).filter((f) => langs.some((l) => f.includes(path.join(l, ''))));
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
  if (title.length > 65) warnings.push(`${url}: title is ${title.length} chars`);
  if (description.length > 165) warnings.push(`${url}: description is ${description.length} chars`);
  if (description.length > 0 && description.length < 70) warnings.push(`${url}: description is only ${description.length} chars`);

  if (title) {
    const list = titles.get(title) ?? [];
    list.push(url);
    titles.set(title, list);
  }
  if (description) {
    const list = descriptions.get(description) ?? [];
    list.push(url);
    descriptions.set(description, list);
  }

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1].split('#')[0].split('?')[0];
    if (!isInternal(href)) continue;
    const urlPath = href.startsWith(site) ? new URL(href).pathname : href;
    if (!langs.includes(urlPath.split('/')[1])) continue;
    internalLinks++;
    if (!fs.existsSync(pageFile(urlPath))) errors.push(`${url}: broken internal link -> ${urlPath}`);
  }
}

for (const [title, urls] of titles) if (urls.length > 1) warnings.push(`duplicate title (${urls.length}): ${title.slice(0, 100)} :: ${urls.slice(0, 4).join(', ')}`);
for (const [description, urls] of descriptions) if (urls.length > 1) warnings.push(`duplicate description (${urls.length}): ${description.slice(0, 120)} :: ${urls.slice(0, 4).join(', ')}`);

const sitemap = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sitemap)) errors.push('missing dist/sitemap.xml');
else {
  const sitemapUrls = [...fs.readFileSync(sitemap, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const unique = new Set(sitemapUrls);
  if (unique.size !== sitemapUrls.length) errors.push('sitemap contains duplicate URLs');
  for (const p of unique) if (!fs.existsSync(pageFile(p))) errors.push(`sitemap URL has no generated HTML: ${p}`);
  const generated = new Set(files.map(urlFor));
  for (const p of generated) if (!unique.has(p)) warnings.push(`generated page missing from sitemap: ${p}`);
  console.log(`Sitemap: ${unique.size} URLs; generated localized pages: ${generated.size}`);
}

console.log(`SEO content audit: ${checked} HTML pages, ${internalLinks} internal links checked.`);
console.log(`Warnings: ${warnings.length}`);
for (const w of warnings.slice(0, 120)) console.log(`  ! ${w}`);
console.log(`Errors: ${errors.length}`);
for (const e of errors.slice(0, 120)) console.log(`  ✗ ${e}`);
if (errors.length) process.exit(1);
console.log('SEO content audit: PASS');
