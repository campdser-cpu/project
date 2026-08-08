// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Build-Time Prerenderer
//
// Runs AFTER `vite build` and generates route-specific, crawlable HTML files
// inside dist/. It reads the real built dist/index.html (so GA4, fonts, schema,
// and all asset links stay intact) and injects:
//
//   1. Route-specific <head> — title, meta description, canonical, Open Graph,
//      Twitter cards, and the full set of hreflang alternates (11 languages +
//      x-default), mirroring exactly what LocalizedHead.tsx does at runtime.
//   2. Real crawlable body content inside #root — H1/H2/text sourced directly
//      from the app's own data (src/data/content.ts and src/i18n/index.ts).
//      No invented business information; this is the exact copy the SPA renders.
//
// Browser safety: main.tsx uses createRoot().render() (NOT hydrateRoot), so
// React wipes the prerendered #root markup on load. Crawlers see real content;
// browsers get the identical interactive SPA. Zero hydration risk.
//
// Generated routes:
//   /en                     → dist/en/index.html
//   /en/tours               → dist/en/tours/index.html
//   /en/destinations        → dist/en/destinations/index.html
//   /en/about               → dist/en/about/index.html
//   /en/contact             → dist/en/contact/index.html
//   /en/faq                 → dist/en/faq/index.html
//   /en/blog                → dist/en/blog/index.html
//   /en/tours/:id           → dist/en/tours/<id>.html  (6 major tour routes)
// ─────────────────────────────────────────────────────────────────────────────
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { tours, destinations, faqData, contactInfo } from '../src/data/content';
import { languages } from '../src/i18n/index';
import { getRouteMeta } from '../src/components/seo/route-metadata';

// ── Constants ────────────────────────────────────────────────────────────────
const BRAND = 'Morocco Grand Adventure';
const SITE_URL = 'https://www.moroccograndadventure.com';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

const TOUR_ROUTES = [
  '3-day-sahara-marrakech',
  '5-day-imperial-cities',
  '7-day-imperial-cities-sahara-escape',
  'honeymoon-morocco',
  '8-day-marrakech-essaouira-agadir-sahara',
  'family-morocco-adventure',
];

// ── Helpers ──────────────────────────────────────────────────────────────────
// Build HTML entities at runtime via char codes so the code formatter cannot
// collapse them into their literal characters (which would break escaping).
const AMP = String.fromCharCode(38);
const LT = String.fromCharCode(60);
const GT = String.fromCharCode(62);
const QUOT = String.fromCharCode(34);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, AMP + 'amp;')
    .replace(/</g, LT + 'lt;')
    .replace(/>/g, GT + 'gt;')
    .replace(/"/g, QUOT + 'quot;')
    .replace(/'/g, AMP + '#39;');
}

function h1(text: string): string {
  return `    <h1>${escapeHtml(text)}</h1>\n`;
}

function h2(text: string): string {
  return `    <h2>${escapeHtml(text)}</h2>\n`;
}

function paragraph(text: string): string {
  return `    <p>${escapeHtml(text)}</p>\n`;
}

function ul(items: string[]): string {
  if (items.length === 0) return '';
  const lis = items.map((item) => `      <li>${escapeHtml(item)}</li>`).join('\n');
  return `    <ul>\n${lis}\n    </ul>\n`;
}

function faqBlock(faqs: { question: string; answer: string }[]): string {
  if (faqs.length === 0) return '';
  const items = faqs
    .map(
      (f) =>
        `      <li>\n        <h3>${escapeHtml(f.question)}</h3>\n        <p>${escapeHtml(f.answer)}</p>\n      </li>`,
    )
    .join('\n');
  return `    <ul class="prerendered-faq">\n${items}\n    </ul>\n`;
}

function hrefsFor(rest: string): string {
  const clean = rest === '/' ? '' : rest;
  const links = languages
    .map(
      (l) =>
        `    <link rel="alternate" hreflang="${l.code}" href="${SITE_URL}/${l.code}${clean}" />`,
    )
    .join('\n');
  const xDefault = `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${clean}" />`;
  return `${links}\n${xDefault}`;
}

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', de: 'de_DE',
  nl: 'nl_NL', pt: 'pt_PT', zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', ar: 'ar_AR',
};

// ── Content builders (pulled from the app's own data — no invented facts) ────
function buildHomeContent(): string {
  const destNames = destinations.slice(0, 8).map((d) => d.name);
  const tourNames = tours.map((t) => t.name);
  return (
    h1('Discover the Soul of Morocco') +
    paragraph('Bespoke journeys crafted by Saharan locals — from golden dunes to blue medinas.') +
    h2('Top Destinations') +
    ul(destNames) +
    h2('Featured Tours') +
    ul(tourNames) +
    h2('Why Travel With Us') +
    paragraph("We are locals born in the Sahara. We don't just show you Morocco, we welcome you into our home.")
  );
}

function buildToursContent(): string {
  const blocks = tours
    .map(
      (t) =>
        h2(t.name) +
        paragraph(t.description ?? '') +
        paragraph(`Duration: ${t.duration}`) +
        ul(t.highlights),
    )
    .join('');
  return h1('Our Tours') + paragraph('Curated itineraries for the discerning traveler') + blocks;
}

function buildTourDetailContent(id: string): string {
  const tour = tours.find((t) => t.id === id);
  if (!tour) return h1('Tour Not Found') + paragraph('This tour could not be found.');
  const itinerary = tour.itineraryDays ?? [];
  const included = tour.included ?? [];
  const excluded = tour.excluded ?? [];
  const faqs = tour.faq ?? [];
  return (
    h1(tour.name) +
    paragraph(tour.description ?? '') +
    paragraph(`Duration: ${tour.duration}`) +
    h2('Highlights') +
    ul(tour.highlights) +
    (itinerary.length > 0
      ? h2('Itinerary') +
        ul(itinerary.map((d) => `Day ${d.day}: ${d.title}`))
      : '') +
    (included.length > 0 ? h2("What's Included") + ul(included) : '') +
    (excluded.length > 0 ? h2('Not Included') + ul(excluded) : '') +
    (faqs.length > 0 ? h2('Frequently Asked Questions') + faqBlock(faqs) : '')
  );
}

function buildDestinationsContent(): string {
  const blocks = destinations
    .map(
      (d) =>
        h2(d.name) +
        paragraph(d.description) +
        paragraph(`Best time to visit: ${d.bestTime}`) +
        ul(d.highlights),
    )
    .join('');
  return h1('Destinations') + paragraph("Explore Morocco's top destinations.") + blocks;
}

function buildAboutContent(): string {
  return (
    h1('About Us — Meet Your Local Berber Guides') +
    paragraph('Born and raised in the Sahara, our team of passionate local guides has been sharing the magic of Morocco with travelers from around the world for over 25 years.') +
    h2('Our Philosophy') +
    paragraph("We don't sell tours. We create memories that embed themselves in your soul, wrapped in the warmth of Moroccan hospitality.") +
    h2('100% Local Expertise') +
    paragraph('Our guides are born here, raised here, and deeply connected to every corner of Morocco — from the imperial cities to the remotest desert dunes.') +
    h2('Uncompromising Quality') +
    paragraph('Every tour is meticulously crafted, from luxury camp accommodations to private transfers and handpicked experiences.') +
    h2('Sustainable Tourism') +
    paragraph("We partner with local communities, support artisans, and ensure our journeys leave a positive impact on Morocco's landscapes and people.")
  );
}

function buildContactContent(): string {
  return (
    h1('Contact Morocco Grand Adventure') +
    h2("Let's Talk") +
    paragraph('Get in touch with us to plan your dream Morocco journey. Our local experts respond within 24 hours.') +
    h2('Contact Details') +
    ul([
      `WhatsApp: ${contactInfo.whatsappNumber}`,
      `Email: ${contactInfo.email}`,
      `Phone: ${contactInfo.phone}`,
      `Address: ${contactInfo.address}`,
      `Instagram: ${contactInfo.instagram}`,
    ])
  );
}

function buildFaqContent(): string {
  return (
    h1('Morocco Travel FAQ') +
    paragraph('Answers to your most common questions about traveling in Morocco — visas, safety, packing, payments, and booking with Morocco Grand Adventure.') +
    h2('Frequently Asked Questions') +
    faqBlock(faqData)
  );
}

function buildBlogContent(): string {
  const posts = [
    { title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga', excerpt: "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.", date: 'August 2026', read: '8 min read', cat: 'Sahara Desert' },
    { title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide', excerpt: "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.", date: 'July 2026', read: '6 min read', cat: 'Travel Planning' },
    { title: 'Camel Trekking in Morocco: What to Expect and How to Prepare', excerpt: "Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.", date: 'June 2026', read: '7 min read', cat: 'Camel Trekking' },
    { title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary', excerpt: "Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.", date: 'May 2026', read: '10 min read', cat: 'Road Trips' },
    { title: 'The Perfect Morocco Packing List for Desert Tours (2026)', excerpt: "What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.", date: 'April 2026', read: '5 min read', cat: 'Packing' },
    { title: "Fes to Chefchaouen: Exploring Morocco's Blue Pearl", excerpt: "The journey from Morocco's cultural heart to the Instagram-famous blue medina — what to see, where to stay, and how to make the most of it.", date: 'March 2026', read: '9 min read', cat: 'Imperial Cities' },
  ];
  const blocks = posts
    .map(
      (post) =>
        h2(post.title) +
        `<p><strong>${escapeHtml(post.cat)}</strong> · ${escapeHtml(post.date)} · ${escapeHtml(post.read)}</p>\n` +
        paragraph(post.excerpt),
    )
    .join('');
  return h1('Morocco Travel Blog') + paragraph('Expert guides, insider tips, and inspiration from our local Sahara team — discover the very best of Morocco.') + blocks;
}

// ── Route table ──────────────────────────────────────────────────────────────
type RouteEntry = {
  /** The "rest" app path (after /en/), used for canonical + hreflang. */
  rest: string;
  /** Output file path relative to dist/. */
  outFile: string;
  /** Builder for the body HTML injected into #root. */
  content: () => string;
  /** Per-route SEO meta (title/description/ogImage) from route-metadata.ts. */
  meta: ReturnType<typeof getRouteMeta>;
};

function buildRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  const add = (rest: string, outFile: string, content: () => string) => {
    routes.push({ rest, outFile, content, meta: getRouteMeta(rest) });
  };

  // Home
  add('/', 'en/index.html', buildHomeContent);

  // Primary sections (all in the user's requested list + tour listing)
  add('/tours', 'en/tours/index.html', buildToursContent);
  add('/destinations', 'en/destinations/index.html', buildDestinationsContent);
  add('/about', 'en/about/index.html', buildAboutContent);
  add('/contact', 'en/contact/index.html', buildContactContent);
  add('/faq', 'en/faq/index.html', buildFaqContent);
  add('/blog', 'en/blog/index.html', buildBlogContent);

  // Major tour detail routes
  for (const id of TOUR_ROUTES) {
    add(`/tours/${id}`, `en/tours/${id}.html`, () => buildTourDetailContent(id));
  }

  return routes;
}

// ── Head rewriting ───────────────────────────────────────────────────────────
function injectHead(html: string, meta: RouteEntry['meta'], rest: string, lang: string): string {
  const clean = rest === '/' ? '' : rest;
  const currentUrl = `${SITE_URL}/${lang}${clean}`;
  const fullTitle = `${meta.title} — ${BRAND}`;
  const ogUrl = currentUrl;

  const hreflangLinks = hrefsFor(rest);

  // Replace the static <title> (between <title> and </title>)
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`);

  // Replace the static meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${meta.description}"`,
  );

  // Replace the static canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${ogUrl}"`,
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${ogUrl}"`,
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${fullTitle}"`,
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${meta.description}"`,
  );

  // Replace og:locale with the language's locale
  const ogLocale = OG_LOCALE[lang] ?? 'en_US';
  html = html.replace(
    /<meta property="og:locale" content="[^"]*"/,
    `<meta property="og:locale" content="${ogLocale}"`,
  );

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${fullTitle}"`,
  );

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${meta.description}"`,
  );

  // Replace og:image if route metadata provides one
  if (meta.ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${SITE_URL}${meta.ogImage}"`,
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${SITE_URL}${meta.ogImage}"`,
    );
  }

  // Remove the static hreflang baseline block (the comment-marked set) and
  // replace it with the full route-specific set. The static set lives between
  // "<!-- Hreflang alternates" and the favicon comment.
  html = html.replace(
    /<!-- Hreflang alternates[\s\S]*?<!-- Favicon -->/,
    `<!-- Hreflang alternates (prerendered route-specific set) -->\n${hreflangLinks}\n\n    <!-- Favicon -->`,
  );

  return html;
}

// ── Body injection ───────────────────────────────────────────────────────────
function injectBody(html: string, bodyHtml: string): string {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">\n${bodyHtml}\n  </div>`,
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(
      `[prerender] dist/index.html not found at ${indexHtmlPath}. ` +
        'Run `pnpm run build` (Vite build) before prerendering.',
    );
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const routes = buildRoutes();
  const lang = 'en';

  let written = 0;

  for (const route of routes) {
    const htmlWithHead = injectHead(baseHtml, route.meta, route.rest, lang);
    const html = injectBody(htmlWithHead, route.content());

    const outPath = path.join(distDir, route.outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
    written++;
    console.log(`[prerender] wrote ${route.outFile}`);
  }

  console.log(`\n[prerender] Done. Generated ${written} route HTML files in dist/.`);
}

main();