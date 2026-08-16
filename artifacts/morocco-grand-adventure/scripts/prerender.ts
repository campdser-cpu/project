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
//   /en/destinations/:id    → dist/en/destinations/<id>.html  (destination detail pages)
//   /en/about               → dist/en/about/index.html
//   /en/contact             → dist/en/contact/index.html
//   /en/faq                 → dist/en/faq/index.html
//   /en/blog                → dist/en/blog/index.html
//   /en/tours/:id           → dist/en/tours/<id>.html  (6 major tour routes)
// ─────────────────────────────────────────────────────────────────────────────
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { destinations, contactInfo, type Tour, type Destination } from '../src/data/content';
import { languages, t as translate } from '../src/i18n/index';
import type { Lang } from '../src/i18n/index';
import {
  getLocalizedTour,
  getLocalizedTours,
  getLocalizedDestination,
  getLocalizedDestinations,
  getLocalizedFaq,
} from '../src/i18n/content';
import { getRouteMeta } from '../src/components/seo/route-metadata';
import { buildTourSchema, buildDestinationSchema } from '../src/components/seo/StructuredData';
import { registerAllTranslations } from '../src/i18n/locales';
import { registerAllContentOverlays } from '../src/i18n/content/overlays';

// ── Constants ────────────────────────────────────────────────────────────────
const BRAND = 'Morocco Grand Adventure';
const SITE_URL = 'https://www.moroccograndadventure.com';

// Localized UI label map — best-effort localized title fragments for static pages.
// Falls back to English route metadata when a language lacks a specific key.
const STATIC_TITLE_KEYS: Record<string, string> = {
  '/': 'hero_tagline',
  '/tours': 'nav_tours',
  '/destinations': 'nav_destinations',
  '/about': 'nav_about',
  '/contact': 'nav_contact',
  '/faq': 'nav_faq',
  '/blog': 'nav_blog',
};

function tr(lang: Lang, key: string): string {
  return translate(lang, key);
}

function truncate(text: string | undefined, max = 158): string {
  const s = (text ?? '').toString().replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

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
function buildHomeContent(lang: Lang): string {
  const destNames = getLocalizedDestinations(lang).slice(0, 8).map((d) => d.name);
  const tourNames = getLocalizedTours(lang).map((t) => t.name);
  return (
    h1(tr(lang, 'hero_heading1') || 'Discover the Soul of Morocco') +
    paragraph(tr(lang, 'hero_subtext')) +
    h2(tr(lang, 'section_destinations') || 'Top Destinations') +
    ul(destNames) +
    h2(tr(lang, 'section_tours') || 'Featured Tours') +
    ul(tourNames)
  );
}

function buildToursContent(lang: Lang): string {
  const blocks = getLocalizedTours(lang)
    .map(
      (t) =>
        h2(t.name) +
        paragraph(t.description ?? '') +
        paragraph(`${tr(lang, 'search_duration')}: ${t.duration}`) +
        ul(t.highlights),
    )
    .join('');
  return h1(tr(lang, 'section_tours') || 'Our Tours') + blocks;
}

function buildTourDetailContent(id: string, lang: Lang): string {
  const tour = getLocalizedTour(id, lang);
  if (!tour) return h1('Tour Not Found') + paragraph('This tour could not be found.');
  const itinerary = tour.itineraryDays ?? [];
  const included = tour.included ?? [];
  const excluded = tour.excluded ?? [];
  const faqs = tour.faq ?? [];
  return (
    h1(tour.name) +
    paragraph(tour.description ?? '') +
    paragraph(`${tr(lang, 'search_duration')}: ${tour.duration}`) +
    h2(tr(lang, 'tour_why_love')) +
    ul(tour.highlights) +
    (itinerary.length > 0
      ? h2(tr(lang, 'tour_itinerary')) +
        ul(itinerary.map((d) => `${tr(lang, 'tour_day')} ${d.day}: ${d.title}`))
      : '') +
    (included.length > 0 ? h2(tr(lang, 'tour_included')) + ul(included) : '') +
    (excluded.length > 0 ? h2(tr(lang, 'tour_not_included')) + ul(excluded) : '') +
    (faqs.length > 0 ? h2(tr(lang, 'nav_faq')) + faqBlock(faqs) : '')
  );
}

function buildDestinationsContent(lang: Lang): string {
  const blocks = getLocalizedDestinations(lang)
    .map((d) => h2(d.name) + paragraph(d.description) + ul(d.highlights))
    .join('');
  return h1('Morocco') + paragraph(tr(lang, 'section_destinations')) + blocks;
}

function buildDestinationDetailContent(destId: string, lang: Lang): string {
  const d = getLocalizedDestination(destId, lang);
  if (!d) return h1('Not Found') + paragraph('This destination could not be found.');
  return (
    h1(d.name) +
    paragraph(d.shortDesc) +
    paragraph(d.description) +
    h2(tr(lang, 'dest_about')) +
    ul(d.highlights)
  );
}

function buildAboutContent(lang: Lang): string {
  return (
    h1(tr(lang, 'nav_about')) +
    paragraph(tr(lang, 'about_story_p1')) +
    paragraph(tr(lang, 'about_story_p2')) +
    h2(tr(lang, 'nav_tours')) +
    paragraph(tr(lang, 'about_philosophy_quote'))
  );
}

function buildContactContent(lang: Lang): string {
  return (
    h1(tr(lang, 'nav_contact')) +
    ul([
      `${tr(lang, 'contact_whatsapp_label')}: ${contactInfo.whatsappNumber}`,
      `${tr(lang, 'contact_email_label')}: ${contactInfo.email}`,
      `${tr(lang, 'contact_address')}: ${contactInfo.address}`,
    ])
  );
}

function buildFaqContent(lang: Lang): string {
  return h1(tr(lang, 'nav_faq')) + faqBlock(getLocalizedFaq(lang));
}

function buildBlogContent(lang: Lang): string {
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
  return h1(tr(lang, 'nav_blog')) + blocks;
}

// ── Route table ──────────────────────────────────────────────────────────────
type RouteEntry = {
  /** The "rest" app path (after /en/), used for canonical + hreflang. */
  rest: string;
  /** Output file path relative to dist/. */
  outFile: string;
  /** Builder for the body HTML injected into #root. */
  content: () => string;
  /** Per-route SEO meta (title/description/ogImage), localized where possible. */
  meta: ReturnType<typeof getRouteMeta>;
  /** Language code for this route. */
  lang: string;
  /** Extra JSON-LD blocks (localized Tour / TouristAttraction schemas). */
  schemas: Record<string, unknown>[];
  /** RTL flag for the html dir attribute. */
  rtl: boolean;
};

/** Build the localized SEO meta for a route + language (title/description/ogImage). */
function metaFor(rest: string, lang: Lang): ReturnType<typeof getRouteMeta> {
  // Localized tour entity pages → genuinely translated title + description.
  let m = rest.match(/^\/tours\/([^/]+)$/);
  if (m) {
    const t = getLocalizedTour(m[1], lang);
    if (t) return { title: t.name, description: truncate(t.description), ogImage: t.image };
  }
  // Localized destination entity pages → genuinely translated title + description.
  m = rest.match(/^\/destinations\/([^/]+)$/);
  if (m) {
    const d = getLocalizedDestination(m[1], lang);
    if (d) return { title: d.name, description: truncate(d.shortDesc || d.description), ogImage: d.image };
  }
  // Static pages → localized title via the UI translation keys, English meta fallback.
  const en = getRouteMeta(rest);
  const key = STATIC_TITLE_KEYS[rest];
  const title = key ? tr(lang, key) || en.title : en.title;
  return { title, description: en.description, ogImage: en.ogImage };
}

function buildRoutes(lang: Lang): RouteEntry[] {
  const routes: RouteEntry[] = [];
  const rtl = lang === 'ar';

  const add = (
    rest: string,
    outFile: string,
    content: () => string,
    schemas: Record<string, unknown>[] = [],
  ) => {
    routes.push({ rest, outFile, content, meta: metaFor(rest, lang), lang, schemas, rtl });
  };

  // Home + primary sections
  add('/', `${lang}/index.html`, () => buildHomeContent(lang));
  add('/tours', `${lang}/tours/index.html`, () => buildToursContent(lang));
  add('/destinations', `${lang}/destinations/index.html`, () => buildDestinationsContent(lang));
  add('/about', `${lang}/about/index.html`, () => buildAboutContent(lang));
  add('/contact', `${lang}/contact/index.html`, () => buildContactContent(lang));
  add('/faq', `${lang}/faq/index.html`, () => buildFaqContent(lang));
  add('/blog', `${lang}/blog/index.html`, () => buildBlogContent(lang));

  // Major tour detail routes (with localized JSON-LD)
  for (const id of TOUR_ROUTES) {
    const t = getLocalizedTour(id, lang);
    add(
      `/tours/${id}`,
      `${lang}/tours/${id}.html`,
      () => buildTourDetailContent(id, lang),
      t ? (buildTourSchema(t, id, lang) as Record<string, unknown>[]) : [],
    );
  }

  // Destination detail pages (with localized JSON-LD)
  for (const dest of destinations) {
    const d = getLocalizedDestination(dest.id, lang);
    add(
      `/destinations/${dest.id}`,
      `${lang}/destinations/${dest.id}.html`,
      () => buildDestinationDetailContent(dest.id, lang),
      d ? (buildDestinationSchema(d, lang) as Record<string, unknown>[]) : [],
    );
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

// Set the localized <html lang> (+RTL for Arabic) on the prerendered document.
function injectLang(html: string, code: string, rtl: boolean): string {
  const attrs = rtl ? ` lang="${code}" dir="rtl"` : ` lang="${code}"`;
  return html.replace(/<html[^>]*>/, `<html${attrs}>`);
}

// Inject additional localized JSON-LD (Tour / TouristAttraction) into <head>.
function injectStructuredData(html: string, schemas: Record<string, unknown>[]): string {
  if (!schemas.length) return html;
  const tags = schemas
    .map(
      (s) => `    <script type="application/ld+json" data-prerendered="1">\n${JSON.stringify(s).replace(/</g, '\\u003c')}\n    </script>`,
    )
    .join('\n');
  return html.replace('</head>', `${tags}\n\n  </head>`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  // The split locale registries are populated at build time so every language
  // renders genuinely localized titles/text in the prerendered (crawlable) HTML.
  registerAllTranslations();
  registerAllContentOverlays();

  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(
      `[prerender] dist/index.html not found at ${indexHtmlPath}. ` +
        'Run `pnpm run build` (Vite build) before prerendering.',
    );
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  let written = 0;

  // Generate every supported language version of every route.
  for (const lang of languages) {
    const routes = buildRoutes(lang.code);
    for (const route of routes) {
      const langMarked = injectLang(baseHtml, route.lang, route.rtl);
      const htmlWithHead = injectHead(langMarked, route.meta, route.rest, lang.code);
      const html = injectStructuredData(injectBody(htmlWithHead, route.content()), route.schemas);

      const outPath = path.join(distDir, route.outFile);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, 'utf-8');
      written++;
      console.log(`[prerender] wrote ${route.outFile}`);
    }
  }

  console.log(`\n[prerender] Done. Generated ${written} route HTML files in dist/.`);
}

main();