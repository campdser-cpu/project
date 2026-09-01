import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname, '..');
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
  return rest || '/';
}
function block(pathname) {
  const lang = pathname.split('/')[1];
  const rest = restFor(pathname, lang);
  const alternates = langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site}/${l}${rest}" />`).join('\n');
  return `  <url>\n    <loc>${site}${pathname}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${site}/en${rest}" />\n  </url>`;
}

if (!fs.existsSync(dist)) throw new Error('dist directory missing');
const paths = [...new Set(walk(dist).map(urlFor).filter((p) => langs.includes(p.split('/')[1])))].sort();
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  <!-- Generated only from prerendered, localized HTML pages. -->\n${paths.map(block).join('\n')}\n</urlset>\n`;
for (const target of [path.join(root, 'public', 'sitemap.xml'), path.join(dist, 'sitemap.xml')]) {
  fs.writeFileSync(target, xml, 'utf8');
}
console.log(`Sitemap generated from ${paths.length} real prerendered URLs.`);
