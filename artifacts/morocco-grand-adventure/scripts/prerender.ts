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

import { destinations, contactInfo, destinationNearby, type Tour, type Destination } from '../src/data/content';
import { languages, t as translate } from '../src/i18n/index';
import type { Lang } from '../src/i18n/index';
import {
  getLocalizedTour,
  getLocalizedTours,
  getLocalizedDestination,
  getLocalizedDestinations,
  getLocalizedFaq,
  blogPosts,
  type BlogPost,
} from '../src/i18n/content';
import { getRouteMeta, getLocalizedRouteMeta, BLOG_META } from '../src/components/seo/route-metadata';
import { buildTourSchema, buildDestinationSchema, buildBlogPostSchema } from '../src/components/seo/StructuredData';
import { registerAllTranslations } from '../src/i18n/locales';
import { registerAllContentOverlays } from '../src/i18n/content/overlays';

// ── Constants ────────────────────────────────────────────────────────────────
const BRAND = 'Morocco Grand Adventure';
const SITE_URL = 'https://www.moroccograndadventure.com';

// Real, verified business contact links for the prerendered Contact page.
// Values mirror src/components/seo/StructuredData.tsx ORGANIZATION_SAME_AS and
// the verified Google Business Profile location. No invented data.
const CONTACT_MAPS_URL = 'https://maps.app.goo.gl/UK3MENd42bC16mME7';
const CONTACT_SOCIAL_LINKS: { label: string; url: string }[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/morocco_grand_adventure/' },
  { label: 'YouTube', url: 'https://youtube.com/@moroccograndadventure' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@morocco.grand.adv' },
  { label: 'Facebook', url: 'https://www.facebook.com/share/1DFzDX72P3/' },
];

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

// Experience/listing pages: dedicated UI keys for their crawlable H1 + intro
// (fully authored translations live in the i18n dictionaries/gaps).
const EXPERIENCE_TITLE_KEYS: Record<string, string> = {
  '/desert-tours': 'dt2_title',
  '/luxury-camp': 'lc_title',
  '/camel-trekking': 'ct_title',
  '/4x4-tours': 'f4_title',
  '/marrakech-tours': 'mk_title',
  '/fes-tours': 'mt_title',
  '/day-trips': 'dt_title',
  '/merzouga-guide': 'mg_title',
  '/gallery': 'gallery_hero_alt',
  '/trip-builder': 'nav_build_journey',
};

const EXPERIENCE_SUBTITLE_KEYS: Record<string, string> = {
  '/desert-tours': 'dt2_subtitle',
  '/luxury-camp': 'lc_subtitle',
  '/camel-trekking': 'ct_subtitle',
  '/4x4-tours': 'f4_subtitle',
  '/marrakech-tours': 'mk_subtitle',
  '/fes-tours': 'mt_subtitle',
  '/day-trips': 'dt_subtitle',
  '/merzouga-guide': 'mg_subtitle',
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
// IMPORTANT: every HTML entity begins with an ampersand (char 38). Using the
// literal '<' / '>' / '"' here would emit broken text like `<lt;` instead of
// the correct `&lt;`. AMP (char 38) is the single entity prefix for all of them.
const AMP = String.fromCharCode(38); // '&'
const ENT = AMP; // entity prefix — always the ampersand '&'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, ENT + 'amp;')
    .replace(/</g, ENT + 'lt;')
    .replace(/>/g, ENT + 'gt;')
    .replace(/"/g, ENT + 'quot;')
    .replace(/'/g, ENT + '#39;');
}

function h1(text: string): string {
  return `    <h1>${escapeHtml(text)}</h1>\n`;
}

function h2(text: string): string {
  return `    <h2>${escapeHtml(text)}</h2>\n`;
}

/**
 * Render an <h2> whose inner content is a real hyperlink. Unlike h2(), this
 * must NOT run escapeHtml() over the output of link() — doing so would turn the
 * real `<a href="...">` into escaped text like `&lt;a href=&quot;...&quot;&gt;`.
 * link() already escapes the visible text safely.
 */
function h2Link(url: string, text: string): string {
  return `    <h2>${link(url, text)}</h2>\n`;
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
    ul(tourNames) +
    h2(tr(lang, 'home_trust_title') || 'A family-run Morocco tour specialist') +
    paragraph(tr(lang, 'home_trust_sub')) +
    paragraph(tr(lang, 'home_trust_note'))
  );
}

/** Homepage emits no Review / AggregateRating schema — verified customer feedback lives on the Google Business Profile (see Master Package §29). */
function buildHomeSchemas(lang: Lang): Record<string, unknown>[] {
  // VideoObject structured data for the site's flagship tourism videos.
  // Injected only into the prerendered (crawlable) homepage so Google can surface
  // them in video rich results. Hosted-duration is intentionally omitted rather
  // than guessed; contentUrl/thumbnailUrl are real, verified site assets.
  const videoBase = SITE_URL;
  const makeVideo = (v: {
    name: string;
    description: string;
    file: string;
    thumb: string;
  }): Record<string, unknown> => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.name,
    description: v.description,
    thumbnailUrl: `${videoBase}${v.thumb}`,
    uploadDate: '2026-08-15',
    inLanguage: lang,
    contentUrl: `${videoBase}${v.file}`,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: BRAND,
      url: SITE_URL,
    },
  });

  return [
    makeVideo({
      name: 'Morocco — A Cinematic Sahara Journey',
      description:
        'Golden Erg Chebbi dunes, camel trekking and Moroccan landscapes — a cinematic preview of a private Morocco desert adventure with Morocco Grand Adventure.',
      file: '/videos/hero.mp4',
      thumb: '/images/hero/desert-pano.jpg',
    }),
    makeVideo({
      name: 'Experience the Sahara',
      description:
        "A luxury Sahara experience near Merzouga — luxury desert camp, camel trekking across Erg Chebbi and stargazing beneath the Milky Way.",
      file: '/videos/sahara-experience.mp4',
      thumb: '/images/personal/luxury-camp-dusk.jpg',
    }),
  ];
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
    const nearIds = destinationNearby[destId] ?? [];
  const nearItems = nearIds
    .map((id) => getLocalizedDestination(id, lang))
    .filter((nd): nd is NonNullable<typeof nd> => Boolean(nd))
    .map(
      (nd) =>
        `      <li>${link(`${SITE_URL}/${lang}/destinations/${nd.id}`, escapeHtml(nd.name))}</li>`,
    )
    .join('\n');
  const nearBlock = nearItems
    ? `\n      <h2>${escapeHtml(tr(lang, 'dest_nearby') || 'Related places')}</h2>\n      <ul>\n${nearItems}\n      </ul>`
    : '';
  return (
    h1(d.name) +
    paragraph(d.shortDesc) +
    paragraph(d.description) +
    h2(tr(lang, 'dest_about')) +
    ul(d.highlights) +
    nearBlock
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
  // Prerendered contact body with real, crawlable links (WhatsApp, email,
  // verified Google Maps location, and official social profiles). Built with
  // link() so anchors are real <a> elements (not escaped text), and plain text
  // runs through escapeHtml() so user-visible copy stays safely encoded.
  const li = (s: string): string => `      <li>${s}</li>`;
  const contactItems = [
    li(`${escapeHtml(tr(lang, 'contact_whatsapp_label') || 'WhatsApp')}: ${link(contactInfo.whatsapp, `${contactInfo.whatsappNumber} (WhatsApp)`)}`),
    li(`${escapeHtml(tr(lang, 'contact_email_label') || 'Email')}: ${link(`mailto:${contactInfo.email}`, contactInfo.email)}`),
    li(`${escapeHtml(tr(lang, 'contact_address') || 'Address')}: ${escapeHtml(contactInfo.address)}`),
    li(`Google Maps: ${link(CONTACT_MAPS_URL, 'View Morocco Grand Adventure on Google Maps')}`),
  ];
  const socialItems = CONTACT_SOCIAL_LINKS.map((s) => li(link(s.url, s.label))).join('\n');
  return (
    h1(tr(lang, 'nav_contact')) +
    `    <ul>\n${contactItems.join('\n')}\n    </ul>\n` +
    h2(tr(lang, 'contact_socials_label') || 'Official Social Profiles') +
    `    <ul>\n${socialItems}\n    </ul>\n`
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

// ── Blog article internal-link helpers (all links point to real site pages) ──
const ARTICLE_RELATIONS: Record<string, { tours: string[]; destinations: string[] }> = {
  'merzouga-luxury-desert-camp-guide': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  'best-time-to-visit-morocco-sahara': { tours: ['3-day-sahara-marrakech', '5-day-imperial-cities'], destinations: ['merzouga', 'erg-chebbi'] },
  'camel-trekking-etiquette-morocco': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi'] },
  'marrakech-to-merzouga-roadtrip': { tours: ['3-day-sahara-marrakech', '8-day-marrakech-essaouira-agadir-sahara'], destinations: ['marrakech', 'ait-ben-haddou', 'dades-valley', 'merzouga'] },
  'morocco-packing-list-desert': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  'fes-chefchaouen-blue-city-guide': { tours: ['5-day-imperial-cities'], destinations: ['fes', 'chefchaouen'] },
};

function link(url: string, text: string): string {
  return `<a href="${url}">${escapeHtml(text)}</a>`;
}

function buildBlogToursBlock(slug: string, lang: Lang): string {
  const ids = ARTICLE_RELATIONS[slug]?.tours ?? [];
  const items = ids
    .map((id) => {
      const t = getLocalizedTour(id, lang);
      return t
        ? `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name)} — ${escapeHtml(t.duration)}</li>`
        : '';
    })
    .filter(Boolean);
  if (items.length === 0) return '';
  return h2(tr(lang, 'related_tours')) + `<ul>\n${items.join('\n')}\n    </ul>\n`;
}

function buildBlogDestinationsBlock(slug: string, lang: Lang): string {
  const ids = ARTICLE_RELATIONS[slug]?.destinations ?? [];
  const items = ids
    .map((id) => {
      const d = getLocalizedDestination(id, lang);
      return d
        ? `      <li>${link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name)} — ${escapeHtml(d.shortDesc)}</li>`
        : '';
    })
    .filter(Boolean);
  if (items.length === 0) return '';
  return h2(tr(lang, 'related_destinations')) + `<ul>\n${items.join('\n')}\n    </ul>\n`;
}

function buildBlogRelatedArticles(slug: string, lang: Lang): string {
  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 4);
  const items = others
    .map((p) => `      <li>${link(`${SITE_URL}/${lang}/blog/${p.slug}`, p.title)}</li>`)
    .join('\n');
  return h2(tr(lang, 'related_articles')) + `<ul>\n${items}\n    </ul>\n`;
}

/** Mirror the authored article body sections (canonical English, like title/excerpt). */
function buildBlogBodyBlock(slug: string): string {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post?.body?.length) return '';
  return post.body
    .map((section) => {
      let out = '';
      if (section.heading) out += h2(section.heading);
      if (section.paragraphs?.length) out += section.paragraphs.map((para) => paragraph(para)).join('');
      if (section.bullets?.length) out += ul(section.bullets);
      return out;
    })
    .join('');
}

function buildBlogArticleContent(slug: string, lang: Lang): string {
  const posts: Record<string, { title: string; excerpt: string; date: string; read: string; cat: string; image: string }> = {
    'merzouga-luxury-desert-camp-guide': {
      title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga',
      excerpt: "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.",
      date: 'August 2026',
      read: '8 min read',
      cat: 'Sahara Desert',
      image: '/images/personal/luxury-camp-dusk.jpg',
    },
    'best-time-to-visit-morocco-sahara': {
      title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide',
      excerpt: "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.",
      date: 'July 2026',
      read: '6 min read',
      cat: 'Travel Planning',
      image: '/images/dest/merzouga.jpg',
    },
    'camel-trekking-etiquette-morocco': {
      title: 'Camel Trekking in Morocco: What to Expect and How to Prepare',
      excerpt: "Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.",
      date: 'June 2026',
      read: '7 min read',
      cat: 'Camel Trekking',
      image: '/images/personal/dunes-camels-poster.jpg',
    },
    'marrakech-to-merzouga-roadtrip': {
      title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary',
      excerpt: "Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.",
      date: 'May 2026',
      read: '10 min read',
      cat: 'Road Trips',
      image: '/images/dest/ait-ben-haddou.jpg',
    },
    'morocco-packing-list-desert': {
      title: 'The Perfect Morocco Packing List for Desert Tours (2026)',
      excerpt: "What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.",
      date: 'April 2026',
      read: '5 min read',
      cat: 'Packing',
      image: '/images/hero/desert-pano.jpg',
    },
    'fes-chefchaouen-blue-city-guide': {
      title: "Fes to Chefchaouen: Exploring Morocco's Blue Pearl",
      excerpt: "The journey from Morocco's cultural heart to the Instagram-famous blue medina — what to see, where to stay, and how to make the most of it.",
      date: 'March 2026',
      read: '9 min read',
      cat: 'Imperial Cities',
      image: '/images/dest/chefchaouen.jpg',
    },
  };

  const post = posts[slug];
  if (!post) return h1('Blog Post Not Found') + paragraph('This blog post could not be found.');

  const metaPost = blogPosts.find((p) => p.slug === slug);
  const imgAlt = metaPost?.alt ?? post.title;

  return (
    h1(post.title) +
    `<p><strong>${escapeHtml(post.cat)}</strong> · ${escapeHtml(post.date)} · ${escapeHtml(post.read)}</p>\n` +
    `<img src="${post.image}" alt="${escapeHtml(imgAlt)}" loading="lazy" decoding="async" class="w-full h-48 md:h-64 object-cover mb-8 rounded-md" />\n` +
        paragraph(post.excerpt) +
    buildBlogBodyBlock(slug) +
    buildBlogToursBlock(slug, lang) +
    buildBlogDestinationsBlock(slug, lang) +
    buildBlogRelatedArticles(slug, lang)
  );
}

// ── Static experience/listing page routes ───────────────────────────────────
// These are real, nav-linked, indexable pages that were only served by the SPA.
// Each maps to its related tours/destinations so the prerendered HTML is a
// genuinely useful, non-thin listing page (no invented facts — real data only).
const EXPERIENCE_PAGE_ROUTES: Record<string, { tours: string[]; destinations: string[] }> = {
  '/desert-tours': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  '/luxury-camp': { tours: ['7-day-imperial-cities-sahara-escape', 'honeymoon-morocco'], destinations: ['merzouga', 'erg-chebbi'] },
  '/camel-trekking': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi'] },
  '/4x4-tours': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi', 'ouarzazate', 'dades-valley'] },
  '/marrakech-tours': { tours: ['3-day-sahara-marrakech', '8-day-marrakech-essaouira-agadir-sahara'], destinations: ['marrakech', 'essaouira', 'ait-ben-haddou', 'ouzoud'] },
  '/fes-tours': { tours: ['5-day-imperial-cities', '7-day-imperial-cities-sahara-escape'], destinations: ['fes', 'meknes', 'chefchaouen', 'merzouga'] },
  '/day-trips': { tours: [], destinations: ['marrakech', 'essaouira', 'ouzoud', 'ourika-valley', 'imlil'] },
  '/merzouga-guide': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi', 'zagora', 'todra-gorge'] },
  '/gallery': { tours: [], destinations: ['marrakech', 'chefchaouen', 'merzouga', 'fes'] },
  '/trip-builder': { tours: ['3-day-sahara-marrakech', '5-day-imperial-cities', '7-day-imperial-cities-sahara-escape'], destinations: ['marrakech', 'fes', 'merzouga', 'chefchaouen'] },
};

function buildExperienceContent(rest: string, lang: Lang): string {
  const enMeta = getRouteMeta(rest);
  const cfg = EXPERIENCE_PAGE_ROUTES[rest] ?? { tours: [], destinations: [] };
  // Prefer the fully translated UI title/intro for the crawlable H1 + intro;
  // fall back to the canonical English route meta when a key is absent.
  const titleKey = EXPERIENCE_TITLE_KEYS[rest];
  const subtitleKey = EXPERIENCE_SUBTITLE_KEYS[rest];
  const localizedTitle = titleKey ? tr(lang, titleKey) : '';
  const localizedIntro = subtitleKey ? tr(lang, subtitleKey) : '';
  const heading = h1(localizedTitle || enMeta.title.replace(/\s*—.*$/, '').trim() || enMeta.title);
  const intro = paragraph(localizedIntro || enMeta.description);
  const tBlocks = cfg.tours
    .map((id) => getLocalizedTour(id, lang))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map(
      (t) =>
        h2Link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name) +
        paragraph(t.description ?? '') +
        paragraph(`${tr(lang, 'search_duration')}: ${t.duration}`) +
        ul(t.highlights),
    )
    .join('');
  const dBlocks = cfg.destinations
    .map((id) => getLocalizedDestination(id, lang))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => h2Link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name) + paragraph(d.shortDesc))
    .join('');
    const faqBlocks = buildExperienceFaqBlocks(rest, lang);
  return heading + intro + faqBlocks + tBlocks + dBlocks;
}

// ── Route table ──────────────────────────────────────────────────────────────
/**
 * Mirror the traveler FAQs that are visibly rendered on each experience page
 * (`ExperiencePage` faqs prop) into the crawlable body. Prefix/count must
 * match the props used by the corresponding page component in src/pages/*.
 */
const EXPERIENCE_FAQ_PAIRS: Record<string, { prefix: string; count: number }> = {
  '/camel-trekking': { prefix: 'ct_faq', count: 8 },
  '/luxury-camp': { prefix: 'lc_faq', count: 7 },
  '/merzouga-guide': { prefix: 'mg_faq', count: 7 },
  '/day-trips': { prefix: 'dt_faq', count: 6 },
  '/4x4-tours': { prefix: 'f4_faq', count: 5 },
};

function buildExperienceFaqBlocks(rest: string, lang: Lang): string {
  const spec = EXPERIENCE_FAQ_PAIRS[rest];
  if (!spec) return '';
  let out = '';
  for (let i = 1; i <= spec.count; i += 1) {
    const qKey = `${spec.prefix}${i}_q`;
    const aKey = `${spec.prefix}${i}_a`;
    const question = tr(lang, qKey);
    const answer = tr(lang, aKey);
    // Skip any pair whose translation is missing entirely (key-echo guard).
    if (!question || !answer || question === qKey || answer === aKey) continue;
    out += `<h3 class="prerendered-faq-question">${escapeHtml(question)}</h3><p class="prerendered-faq-answer">${escapeHtml(answer)}</p>`;
  }
  return out;
}

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
  // Arabic gets a dedicated keyword-rich Arabic title/description (AR_ROUTE_META);
  // all other locales keep the existing localized-nav-title + English-description.
  const en = getRouteMeta(rest);
  const ar = lang === 'ar' ? getLocalizedRouteMeta(rest, lang) : undefined;
  const key = STATIC_TITLE_KEYS[rest] ?? EXPERIENCE_TITLE_KEYS[rest];
  const title = ar ? ar.title : (key ? tr(lang, key) || en.title : en.title);
  const description = ar ? ar.description : en.description;
  return { title, description, ogImage: ar?.ogImage ?? en.ogImage };
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
  add('/', `${lang}/index.html`, () => buildHomeContent(lang), buildHomeSchemas(lang));
  add('/tours', `${lang}/tours/index.html`, () => buildToursContent(lang));
  add('/destinations', `${lang}/destinations/index.html`, () => buildDestinationsContent(lang));
  add('/about', `${lang}/about/index.html`, () => buildAboutContent(lang));
  add('/contact', `${lang}/contact/index.html`, () => buildContactContent(lang));
  add('/faq', `${lang}/faq/index.html`, () => buildFaqContent(lang));
    add('/blog', `${lang}/blog/index.html`, () => buildBlogContent(lang));

    // Individual blog article routes
  for (const post of blogPosts) {
    const meta = BLOG_META[post.slug];
    add(
      `/blog/${post.slug}`,
      `${lang}/blog/${post.slug}.html`,
      () => buildBlogArticleContent(post.slug, lang),
      meta ? (buildBlogPostSchema({
        slug: post.slug,
        title: meta.title,
        description: meta.description,
        date: post.date,
        image: post.image,
      }, lang) as Record<string, unknown>[]) : [],
    );
  }

  // Static experience/listing pages (real, nav-linked routes previously SPA-only)
  for (const rest of Object.keys(EXPERIENCE_PAGE_ROUTES)) {
    add(
      rest,
      `${lang}${rest}/index.html`,
      () => buildExperienceContent(rest, lang),
    );
  }

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

  // Per-route LCP preload: preload the page's own hero (WebP) when it has an
  // og:image; otherwise fall back to the default desert hero. This avoids
  // preloading irrelevant images and keeps Core Web Vitals LCP fast.
  const preloadSrc = meta.ogImage
    ? meta.ogImage.replace(/\.(jpe?g|png)$/i, '.webp')
    : '/images/hero/desert-pano.webp';
  html = html.replace(
    /<link rel="preload" as="image" href="[^"]*" fetchpriority="high" \/>/,
    `<link rel="preload" as="image" href="${preloadSrc}" fetchpriority="high" />`,
  );

  // Replace the static hreflang baseline with the full route-specific set.
  // Only the static alternate <link> tags are removed (the Open Graph and
  // schema.org blocks above must be preserved for social/SEO discoverability).
  html = html.replace(
    /\s*<!-- Hreflang alternates[\s\S]*?-->\s*/,
    `<!-- Hreflang alternates (prerendered route-specific set) -->\n${hreflangLinks}\n`,
  );
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*\/>\s*/g, '\n');

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