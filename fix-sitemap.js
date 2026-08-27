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

// Primary (indexable) image for a route, used to emit Google image sitemap
// entries so destination/tour/content images are discoverable in Google Images.
const ROUTE_IMAGES = {
  home: { src: '/images/hero/desert-pano.jpg', title: 'Sahara Desert dunes at sunset near Merzouga, Morocco' },
  '/destinations': { src: '/images/hero/atlas-pano.jpg', title: 'High Atlas Mountains, Morocco' },
  '/tours': { src: '/images/hero/desert-pano.jpg', title: 'Luxury Morocco desert tours' },
  '/gallery': { src: '/images/hero/desert-pano.jpg', title: 'Morocco photo gallery' },
  '/about': { src: '/images/hero/medina-pano.jpg', title: 'Morocco Grand Adventure — about our guides' },
  '/blog': { src: '/images/personal/luxury-camp-dusk.jpg', title: 'Morocco Grand Adventure travel blog' },
  '/luxury-camp': { src: '/images/personal/luxury-camp-dusk.jpg', title: 'Luxury Sahara desert camp near Merzouga' },
  '/desert-tours': { src: '/images/dest/erg-chebbi.jpg', title: 'Sahara desert tours — Erg Chebbi, Merzouga' },
  '/camel-trekking': { src: '/images/dest/merzouga.jpg', title: 'Camel trekking in the Sahara Desert, Morocco' },
  '/merzouga-guide': { src: '/images/dest/merzouga.jpg', title: 'Merzouga travel guide — Erg Chebbi dunes' },
};

// Tour id → primary cover image (matches data/content.ts).
const TOUR_IMAGES = {
  '3-day-sahara-marrakech': '/images/tours/3-day-sahara-marrakech.jpg',
  '5-day-imperial-cities': '/images/tours/5-day-imperial-cities.jpg',
  '7-day-imperial-cities-sahara-escape': '/images/tours/7-day-grand-morocco.jpg',
  'honeymoon-morocco': '/images/tours/honeymoon-morocco.jpg',
  '8-day-marrakech-essaouira-agadir-sahara': '/images/dest/merzouga.jpg',
  'family-morocco-adventure': '/images/tours/family-morocco-adventure.jpg',
};

// Blog slug → cover image (matches scripts/prerender.ts blogPosts).
// Blog article pages fall back to the /blog listing image below.

/** Look up a page's indexable image for the Google image sitemap extension. */
function imagesForRest(rest) {
  const entry =
    ROUTE_IMAGES[rest] ||
    (rest === '/' && ROUTE_IMAGES.home) ||
    (rest.startsWith('/destinations/') && {
      src: `/images/dest/${rest.split('/')[2]}.jpg`,
      title: `${rest.split('/')[2].replace(/-/g, ' ')} in Morocco`,
    }) ||
    (rest.startsWith('/tours/') && {
      src: TOUR_IMAGES[rest.split('/')[2]] || '/images/hero/desert-pano.jpg',
      title: 'Morocco Grand Adventure luxury desert tour',
    });
  if (!entry) return null;
  const abs = `${SITE_URL}${entry.src}`;
  return [
    '    <image:image>',
    `      <image:loc>${abs}</image:loc>`,
    `      <image:title>${entry.title}</image:title>`,
    '    </image:image>',
  ].join('\n');
}

function buildUrlBlock(urlPath) {
  const lang = urlPath.split('/')[1];
  const rest = restOf(urlPath, lang);
  const loc = `${SITE_URL}${urlPath}`;
  const imageXml = imagesForRest(rest);
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${LAST_MOD}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priorityFor(urlPath, lang)}</priority>`,
    buildHreflangs(urlPath, lang),
    imageXml ? `${imageXml}\n` : '',
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

