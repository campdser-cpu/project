// Generate sitemap.xml from the actual prerendered build output in dist/.
// Sole source of truth: every <loc> maps to a real generated HTML page.
// Each URL carries the full set of hreflang alternates (11 languages + x-default),
// in the no-trailing-slash canonical form that LocalizedHead emits at runtime.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];
const SITE_URL = 'https://www.moroccograndadventure.com';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

const routesPerLang = {};
for (const lang of LANGS) {
  const langDir = path.join(dist, lang);
  if (!await fs.stat(langDir).catch(() => null)) continue;
  const files = await walk(langDir);
  const routes = new Set();
  for (const f of files) {
    const rel = path.relative(langDir, f).split(path.sep).join('/');
    if (rel === 'index.html') { routes.add(''); continue; }
    if (rel.endsWith('/index.html')) { routes.add('/' + rel.slice(0,-'/index.html'.length)); continue; }
    if (rel.endsWith('.html')) { routes.add('/' + rel.slice(0,-'.html'.length)); }
  }
  routesPerLang[lang] = [...routes].sort();
}

const allRoutesSet = new Set();
for (const lang of LANGS) for (const r of (routesPerLang[lang] ?? [])) allRoutesSet.add(r);
const allRoutes = [...allRoutesSet].sort();

let out = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n';
out += '<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n';
out += '        xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n\n';
for (const rest of allRoutes) {
  for (const lang of LANGS) {
    if (!routesPerLang[lang] || !routesPerLang[lang].includes(rest)) continue;
    out += '  <url>\n';
    out += '    <loc>' + esc(SITE_URL + '/' + lang + rest) + '</loc>\n';
    for (const alt of LANGS) {
      if (!routesPerLang[alt] || !routesPerLang[alt].includes(rest)) continue;
      out += '    <xhtml:link rel=\"alternate\" hreflang=\"' + alt + '\" href=\"' + esc(SITE_URL + '/' + alt + rest) + '\" />\n';
    }
    out += '    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"' + esc(SITE_URL + '/en' + rest) + '\" />\n';
    out += '  </url>\n\n';
  }
}
out += '</urlset>\n';

await fs.writeFile(path.join(dist, 'sitemap.xml'), out, 'utf8');
console.log('[sitemap] Generated ' + allRoutes.length + ' canonical routes across ' + LANGS.length + ' languages -> dist/sitemap.xml');