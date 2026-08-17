const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// Sitemap generation — appends blog article URLs to the existing sitemap.xml
// during prerender so that every generated blog article page is discoverable.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = 'https://www.moroccograndadventure.com';
const LANGS = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

const BLOG_META = {
  'merzouga-luxury-desert-camp-guide': {
    title: 'Luxury Desert Camps in Merzouga — Ultimate Guide to Sahara Glamping',
    description: 'From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — everything you need to know about luxury glamping in the Merzouga Sahara.',
    image: '/images/personal/luxury-camp-dusk.jpg',
  },
  'best-time-to-visit-morocco-sahara': {
    title: 'Best Time to Visit the Sahara Desert — Month-by-Month Guide',
    description: 'When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and ideal conditions month by month.',
    image: '/images/dest/merzouga.jpg',
  },
  'camel-trekking-etiquette-morocco': {
    title: 'Camel Trekking in Morocco — What to Expect and How to Prepare',
    description: 'Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.',
    image: '/images/personal/dunes-camels-poster.jpg',
  },
  'marrakech-to-merzouga-roadtrip': {
    title: 'Marrakech to Merzouga — Ultimate Sahara Road Trip Itinerary',
    description: 'Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.',
    image: '/images/dest/ait-ben-haddou.jpg',
  },
  'morocco-packing-list-desert': {
    title: 'Morocco Desert Packing List — What to Bring for Sahara Tours',
    description: 'What to pack for the Sahara — breathable layers, sun protection, and the essentials that make a desert night unforgettable.',
    image: '/images/hero/desert-pano.jpg',
  },
  'fes-chefchaouen-blue-city-guide': {
    title: 'Fes to Chefchaouen — Exploring Morocco Blue City',
    description: 'The journey from Morocco cultural heart to the famous blue medina — what to see, where to stay, and how to make the most of it.',
    image: '/images/dest/chefchaouen.jpg',
  },
};

function buildHreflangs(lang, slug) {
  let links = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/blog/${slug}" />`
  ).join('\n');
  links += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/blog/${slug}" />`;
  return links;
}

function buildImage(meta) {
  return `    <image:image>
      <image:loc>${SITE_URL}${meta.image}</image:loc>
      <image:title>${meta.title}</image:title>
    </image:image>`;
}

function buildBlogArticleUrlBlock(slug, meta, lang) {
  const loc = `${SITE_URL}/${lang}/blog/${slug}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>2026-08-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${buildHreflangs(lang, slug)}
${buildImage(meta)}
  </url>`;
}

function updateSitemap(sitemapPath) {
  const sm = fs.readFileSync(sitemapPath, 'utf-8');

  // Check if blog articles are already in the sitemap
  if (sm.includes('/blog/merzouga-luxury-desert-camp-guide')) {
    console.log(`Sitemap already contains blog articles: ${sitemapPath}`);
    return;
  }

  // Insert blog article URLs before the closing </urlset>
  const blogEntries = Object.entries(BLOG_META).map(([slug, meta]) =>
    buildBlogArticleUrlBlock(slug, meta, 'en')
  ).join('\n');

  const updated = sm.replace(
    /<\/urlset>/,
    blogEntries + '\n</urlset>'
  );

  fs.writeFileSync(sitemapPath, updated, 'utf-8');
  const locCount = (updated.match(/<loc>/gi) || []).length;
  console.log(`Sitemap: ${sitemapPath}`);
  console.log(`  URL count after fix: ${locCount}`);
}

// Update both public and dist sitemaps
for (const sitemapPath of [
  path.resolve('public/sitemap.xml'),
  path.resolve('dist/sitemap.xml'),
]) {
  if (fs.existsSync(sitemapPath)) {
    updateSitemap(sitemapPath);
  } else {
    console.log(`Sitemap not found: ${sitemapPath}`);
  }
}

console.log('Sitemap updated with blog articles!');
