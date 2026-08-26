const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// Sitemap generation — derives the complete, multilingual sitemap from the
// actual prerendered output in dist/. Every URL is a real, generated page.
// Overwrites public/sitemap.xml and dist/sitemap.xml so the result can never
// drift from the pages that are actually built.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = 'https://www.moroccograndadventure.com';
const LANGS = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];
const LAST_MOD = '2026-08-23';

/** Walk a directory recursively, returning relative `.html` file paths. */
function collectHtml(dir, base, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtml(full, base, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(path.relative(base, full).split(path.sep).join('/'));
    }
  }
  return out;
}

/**
 * Turn a prerendered file path (relative to dist/, e.g. "en/blog/x.html" or
 * "en/tours/index.html") into a canonical URL path (e.g. "/en/blog/x").
 * `index.html` files map to their directory path.
 */
function fileToPath(rel) {
  if (rel.endsWith('/index.html')) {
    return '/' + rel.slice(0, -'/index.html'.length);
  }
  return '/' + rel.replace(/\.html$/, '');
}

/** Rest path (after the language prefix) used to build hreflang alternates. */
function restOf(urlPath, lang) {
  const rest = urlPath.slice(`/${lang}`.length);
  return rest === '' ? '/' : rest;
}

function buildHreflangs(urlPath, lang) {
  const rest = restOf(urlPath, lang);
  const links = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${rest}" />`,
  ).join('\n');
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${rest}" />`;
  return `${links}\n${xDefault}`;
}

function priorityFor(urlPath, lang) {
  const rest = restOf(urlPath, lang);
  if (rest === '/') return '1.0';
  if (rest.startsWith('/tours/') || rest.startsWith('/destinations/')) return '0.8';
  if (rest.startsWith('/blog/')) return '0.7';
  return '0.6';
}

function buildUrlBlock(urlPath) {
  const lang = urlPath.split('/')[1];
  const rest = restOf(urlPath, lang);
  const loc = `${SITE_URL}${urlPath}`;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${LAST_MOD}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priorityFor(urlPath, lang)}</priority>`,
    buildHreflangs(urlPath, lang),
    '  </url>',
  ].join('\n');
}

function generateSitemap(distDir) {
  const urls = [];

  // Only crawl routes under a valid language directory (skips the root
  // redirect `dist/index.html` and root-level files like the Google
  // verification page). Home for each language is `<lang>/index.html`.
  for (const lang of LANGS) {
    const langDir = path.join(distDir, lang);
    if (!fs.existsSync(langDir) || !fs.statSync(langDir).isDirectory()) continue;
    const relFiles = collectHtml(langDir, distDir, []);
    for (const rel of relFiles.sort()) {
      const urlPath = fileToPath(rel);
      // Sanity: the path must start with the language prefix.
      if (!urlPath.startsWith(`/${lang}`)) continue;
      urls.push(urlPath);
    }
  }

  // Deduplicate (shouldn't happen when deriving from files, but be safe).
  const unique = [...new Set(urls)].sort();

  const body = unique.map(buildUrlBlock).join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n' +
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    '\n' +
    '  <!--\n' +
    '       Morocco Grand Adventure — Sitemap\n' +
    '       Generated from the actual prerendered build output.\n' +
    `       Languages: ${LANGS.join(', ')}\n` +
    '  -->\n' +
    '\n' +
    body +
    '\n</urlset>\n'
  );
}

const distDir = path.resolve('dist');
if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('Sitemap: dist/ not found or empty. Run `pnpm run build` first.');
  process.exit(1);
}

const sitemapXml = generateSitemap(distDir);
const locCount = (sitemapXml.match(/<loc>/g) || []).length;

for (const outPath of [path.resolve('public/sitemap.xml'), path.join(distDir, 'sitemap.xml')]) {
  fs.writeFileSync(outPath, sitemapXml, 'utf-8');
  console.log(`Sitemap: ${outPath}`);
}
console.log(`Sitemap: generated ${locCount} URLs (${LANGS.length} languages) from prerendered output.`);

