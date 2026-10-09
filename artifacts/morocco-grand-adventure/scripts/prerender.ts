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
//   /en/faq                → dist/en/faq/index.html
//   /en/blog                → dist/en/blog/index.html
//   /en/tours/:id           → dist/en/tours/<id>.html  (6 major tour routes)
// ─────────────────────────────────────────────────────────────────────────────
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { destinations, contactInfo, reviews, type Review, type Tour, type Destination } from '../src/data/content';
import { BLOG_ARTICLE_SECTIONS, type BlogSection, parseParagraph } from '../src/data/blog-article-sections';
import { CITY_HUBS, TOUR_DEPARTURE_CITY, CITY_HUB_DURATIONS, tourIdsForCity, tourDurationDays, DAY_TRIP_PRODUCT_IDS, FEATURED_TOUR_IDS, SAHARA_CROSSING_TOUR_IDS } from '../src/data/tour-hierarchy';
import { MERZOUGA_GUIDES, COMPARISONS, TRAVEL_INFO, type HubPage } from '../src/data/seoHub';
import { localizedComparisonMeta } from '../src/data/comparison-meta-i18n';
import { getLocalizedTourDepth } from '../src/i18n/content';
import { catalogImage, imagesForDestination, DEST_FOOD_IMAGE, type CatalogImage } from '../src/data/imageCatalog';
import { SOURCES } from '../src/data/sources';
import { BOOK_COPY } from '../src/data/book-copy';
import { THINGS_COPY } from '../src/data/things-to-do/all';
import { THINGS, type GroupKey } from '../src/data/things-to-do/types';
import { publishablePhotosForContexts, publishableLibraryPhotos, photoSrcSet, type PhotoAsset } from '../src/data/photoLibrary';
import { languages, t as translate } from '../src/i18n/index';
import type { Lang } from '../src/i18n/index';
import {
  getLocalizedTour,
  getLocalizedTours,
  getLocalizedDestination,
  getLocalizedDestinations,
  getLocalizedFaq,
  getLocalizedBlogSections,
  getLocalizedBlogCta,
  getRelatedBlogPosts,
  getLocalizedStudentTour,
  blogPosts,
  type BlogPost,
} from '../src/i18n/content';
import { getRouteMeta, getLocalizedRouteMeta, BLOG_META, HOME_META, FR_HOME_META, ogImageAlt, withBrandSuffix, type RouteMeta } from '../src/components/seo/route-metadata';
import { getLocalizedGuide, guideImageAlt, guideCrumb } from '../src/i18n/guides';
import { buildTourSchema, buildDestinationSchema, buildBlogPostSchema, buildReviewSchema, buildFaqSchema, buildBreadcrumb } from '../src/components/seo/StructuredData';
import { getStudentTour, studentTours as studentTourList, studentTourSizes } from '../src/data/student-tours';
import { departuresForTour, seatsAvailable, isFull } from '../src/data/student-group-departures';
// Data-driven index list (1, 2, 3, ...) for the st_11_r{n}_* card-copy keys and
// the hub's TouristTrip schema loop — derives its length from the actual
// Student Tours data, so adding a tour only means authoring its st_11_r{n}_*
// keys, not also updating a separate literal [1,2,3] list in two places.
const JOURNEY_INDEXES = studentTourList.map((_, i) => i + 1);
import { MERZOUGA_HUB_COPY } from '../src/data/merzouga-hub/all';
import {
  MG_BASICS, MG_CHOOSE, MG_COMPARISON, MG_FEATURED_GUIDES, MG_GUIDE_GROUPS, MG_IMAGES,
  MG_PACK_GUIDES, MG_SIZES, MG_STORY, MG_TOURS, type MgImage,
} from '../src/data/merzouga-hub/types';
import { registerAllTranslations } from '../src/i18n/locales';
import { registerAllContentOverlays } from '../src/i18n/content/overlays';
import { registerAllGuideOverlays } from '../src/i18n/guides/overlays';
import { registerAllExperienceOverlays } from '../src/i18n/experiences/overlays';
import { tours as canonicalTours } from '../src/data/content';
import { deriveTourExperiences, type DerivedExperience } from '../src/data/tour-experiences';
import { localizeExperience } from '../src/i18n/experiences';

import { deriveTourInclusions, type InclusionItem, type InclusionKind, type MealRow } from '../src/data/tour-inclusions';
import { deriveTourStartEnd } from '../src/data/tour-quick-facts';

/** Mirrors src/components/tours/TourInclusions.tsx's GROUP_ORDER/GROUP_KEY exactly. */
const INC_GROUP_ORDER: InclusionKind[] = ['transport', 'stay', 'meal', 'experience', 'landscape', 'service', 'other'];
const INC_GROUP_KEY: Record<InclusionKind, string> = {
  transport: 'jx_inc_cat_transport',
  stay: 'jx_inc_cat_stay',
  meal: 'jx_inc_cat_meal',
  experience: 'jx_inc_cat_experience',
  landscape: 'jx_inc_cat_landscape',
  service: 'jx_inc_cat_service',
  other: 'jx_inc_cat_other',
};

// ── Constants ────────────────────────────────────────────────────────────────
const BRAND = 'Morocco Grand Adventure';
const SITE_URL = 'https://www.moroccograndadventure.com';

/** Replace `{var}` placeholders in a translated template (mirrors tours/intl.tsx). */
function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m,
  );
}

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
  // '/about' intentionally omitted: /about uses full route metadata
  // ("Morocco, Beyond the Journey") instead of the short nav label.
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
  '3-day-sahara-agadir',
  'marrakech-4-day',
  'casablanca-3-day',
  'casablanca-4-day',
  'casablanca-5-day',
  'casablanca-8-day',
  'fes-4-day',
  'fes-5-day',
  'fes-8-day',
  'agadir-4-day',
  'agadir-5-day',
  'agadir-8-day',
  '2-day-zagora-desert-marrakech',
  '4-day-marrakech-merzouga-sahara',
  '5-day-great-south-morocco',
  '3-day-fes-merzouga-sahara',
  '4-day-fes-marrakech-via-merzouga',
  'tangier-3-day',
  'tangier-5-day',
  'marrakech-essaouira-2-day',
  '14-day-grand-morocco-journey',
  'marrakech-ourika-valley-day-trip',
  'marrakech-ouzoud-waterfalls-day-trip',
  'marrakech-imlil-day-trip',
  'agadir-taghazout-day-trip',
];

// MGA_THREE_DAY_PRERENDER_V1

// ── Helpers ──────────────────────────────────────────────────────────────────
const NL = String.fromCharCode(10);
const AMP = String.fromCharCode(38); // '&'
const ENT = AMP;

/**
 * Intrinsic size of a public/ image, read straight from the file header
 * (JPEG SOF, PNG IHDR, WebP VP8/VP8L/VP8X) and cached per path. Share images
 * are not all 1200x630, and telling a crawler the wrong size is worse than
 * saying nothing.
 */
function readImageSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') {
      const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
      const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
      return { width: w, height: h };
    }
    return null;
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      const isSof = (marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf);
      if (isSof) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

const ogSizeCache = new Map<string, { width: number; height: number } | null>();
function ogImageSize(url: string): { width: number; height: number } | null {
  if (!ogSizeCache.has(url)) {
    try {
      ogSizeCache.set(url, readImageSize(fs.readFileSync(path.join(scriptDir, '..', 'public', decodeURI(url)))));
    } catch {
      ogSizeCache.set(url, null);
    }
  }
  return ogSizeCache.get(url) ?? null;
}

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
function h3(text: string): string {
  return `    <h3>${escapeHtml(text)}</h3>\n`;
}

function h2Link(url: string, text: string): string {
  return `    <h2>${link(url, text)}</h2>\n`;
}
function paragraph(text: string): string {
  return `    <p>${escapeHtml(text)}</p>\n`;
}
/** Paragraph whose contents are already-safe inline HTML (e.g. <a> links). */
function rawParagraph(html: string): string {
  return `    <p>${html}</p>\n`;
}
function ul(items: string[]): string {
  if (items.length === 0) return '';
  const lis = items.map((item) => `      <li>${escapeHtml(item)}</li>`).join('\n');
  return `    <ul>\n${lis}\n    </ul>\n`;
}
/** List whose items are already-safe inline HTML (e.g. an experience + its link). */
function rawUl(items: string[]): string {
  if (items.length === 0) return '';
  const lis = items.map((item) => `      <li>${item}</li>`).join('\n');
  return `    <ul>\n${lis}\n    </ul>\n`;
}
function faqBlock(faqs: { question: string; answer: string }[]): string {
  if (faqs.length === 0) return '';
  const items = faqs
    .map((f) => `      <li>\n        <h3>${escapeHtml(f.question)}</h3>\n        <p>${escapeHtml(f.answer)}</p>\n      </li>`)
    .join('\n');
  return `    <ul class="prerendered-faq">\n${items}\n    </ul>\n`;
}
// Curated-image figure used by destination galleries and experience pages.
// Alt text is natural/descriptive (never keyword-stuffed) per the Image-SEO pack.
function figureImg(src: string, alt: string, caption: string, size?: { width: number; height: number }): string {
  const dims = size ? ` width="${size.width}" height="${size.height}"` : '';
  return `    <figure>\n      <img src="${src}" alt="${escapeHtml(alt)}"${dims} loading="lazy" decoding="async" class="w-full h-72 md:h-96 object-cover" />\n      <figcaption>${escapeHtml(caption)}</figcaption>\n    </figure>\n`;
}
/**
 * Responsive catalog figure — mirrors the runtime CatalogPhoto / Local Food <img>
 * exactly (same srcset, sizes, intrinsic dimensions, lazy loading) so the
 * prerendered destination content carries the same image + alt + caption and
 * causes no layout shift on hydration.
 */
function catalogFigure(img: CatalogImage, sizes: string): string {
  const src = img.src;
  const srcset = `${src.replace('.webp', '-480w.webp')} 480w, ${src.replace('.webp', '-768w.webp')} 768w, ${src} ${img.width}w`;
  return `    <figure>\n      <img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${escapeHtml(img.alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async" />\n      <figcaption>${escapeHtml(img.caption)}</figcaption>\n    </figure>\n`;
}
/**
 * Official photo-library figure — renders the ACTUAL PDF-derived photograph
 * (one JPEG per Asset ID under /images/library/). Mirrors LibraryPhotoGrid on the
 * client: same src, alt, dimensions, loading="lazy". Restricted assets never
 * reach here (publishablePhotosForContexts / publishableLibraryPhotos filter them).
 */
function libraryPhotoFigure(photo: PhotoAsset): string {
  if (!photo.src) return '';
  const w = photo.width ? ' width="' + photo.width + '"' : '';
  const h = photo.height ? ' height="' + photo.height + '"' : '';
  const srcset = photoSrcSet(photo);
  const ss = srcset ? ' srcset="' + srcset + '" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"' : '';
  // `ss` already begins with ' srcset="' and ends with a closing quote, so the
  // src attribute must be closed BEFORE it is appended. Closing it afterwards
  // made src swallow the whole srcset/sizes run (src="…jpg srcset="…"), which
  // left every gallery image with an unusable src and no parsed srcset.
  return '    <figure>\n      <img src="' + photo.src + '"' + ss + ' alt="' + escapeHtml(photo.alt) + '"' + w + h + ' loading="lazy" decoding="async" class="w-full h-full object-cover" />\n      <figcaption>' + escapeHtml(photo.description) + '</figcaption>\n    </figure>\n';
}
function hrefsFor(rest: string): string {
  const clean = rest === '/' ? '' : rest;
  const links = languages.map((l) => `    <link rel="alternate" hreflang="${l.code}" href="${SITE_URL}/${l.code}${clean}" />`).join('\n');
  const xDefault = `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${clean}" />`;
  return `${links}\n${xDefault}`;
}
const OG_LOCALE: Record<string, string> = {
  en: 'en_US', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', de: 'de_DE',
  nl: 'nl_NL', pt: 'pt_PT', zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', ar: 'ar_AR',
};

// ── Content builders (pulled from the app's own data — no invented facts) ────
function buildHomeContent(lang: Lang): string {
  const destNames = getLocalizedDestinations(lang).slice(0, 8).map((d) => `      <li>${link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name)}</li>`).join('\n');
  // Mirrors the runtime homepage's curated "Featured Tours" (FEATURED_TOUR_IDS,
  // src/data/tour-hierarchy.ts) — not the full 31-tour catalogue, which is
  // what /tours and the departure-city hubs below already link to in full.
  const tourNames = FEATURED_TOUR_IDS.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name)}</li>`).join('\n');
  // Departure-city tour hubs — mirrors the runtime homepage "Departure from"
  // city-selector + product grid, so crawlers see the same City → Tours
  // hierarchy users navigate, including each city's real tour count.
  const hubLinks = CITY_HUBS.map((hub) => {
    const count = tourIdsForCity(hub.id).length;
    const label = count > 0 ? `${tr(lang, `hub_${hub.id}_title`)} (${fmt(tr(lang, 'home_depart_tour_count'), { n: count })})` : tr(lang, `hub_${hub.id}_title`);
    return `      <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}`, label)}</li>`;
  }).join('\n');
  const hubBlock = h2(tr(lang, 'home_depart_heading') || 'Departure from') + paragraph(tr(lang, 'home_depart_sub') || 'Choose a starting city and explore the Sahara routes, imperial cities and coastal escapes we tailor for it.') + `    <ul class="prerendered-city-hubs">\n${hubLinks}\n    </ul>\n`;
  // Mirrors the runtime homepage's "Popular Sahara Itineraries" section
  // (SAHARA_CROSSING_TOUR_IDS, src/data/tour-hierarchy.ts) — deliberately
  // excludes any tour already in FEATURED_TOUR_IDS above, same as the
  // runtime page, so no link is duplicated within this one prerendered page.
  const saharaNames = SAHARA_CROSSING_TOUR_IDS.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name)}</li>`).join('\n');
  const saharaBlock = h2(tr(lang, 'home_sahara_heading')) + `    <ul>\n${saharaNames}\n    </ul>\n`;
  // Mirrors the runtime homepage's "Day Trips & Experiences" section
  // (DAY_TRIP_PRODUCT_IDS) — the same four real day-trip products shown on
  // /day-trips itself.
  const dayTripNames = DAY_TRIP_PRODUCT_IDS.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name)}</li>`).join('\n');
  const dayTripBlock = h2(tr(lang, 'home_daytrips_heading')) + `    <ul>\n${dayTripNames}\n    </ul>\n`;
  // Mirrors the runtime homepage's "How Booking Works" section
  // (HowBookingWorks component) — same jx_hbw_* keys, so wording can never
  // drift between the live page and this crawlable snapshot.
  const bookingStepsBlock = h2(tr(lang, 'jx_hbw_title')) + [1, 2, 3, 4].map((n) => `    <h3>${escapeHtml(tr(lang, `jx_hbw_${n}_t`))}</h3><p>${escapeHtml(tr(lang, `jx_hbw_${n}_d`))}</p>`).join('\n');
  // Mirrors the runtime homepage's FAQ section — the same fixed-index subset
  // of getLocalizedFaq(lang) as HOME_FAQ_INDICES in src/pages/home.tsx.
  const homeFaqs = [0, 2, 4, 6, 8, 1].map((i) => getLocalizedFaq(lang)[i]).filter((f): f is NonNullable<typeof f> => Boolean(f));
  const homeFaqBlock = h2(tr(lang, 'home_faq_heading')) + faqBlock(homeFaqs);
  const reviewBlocks = reviews.map((r) => {
    const name = tr(lang, r.nameKey);
    const quote = tr(lang, r.quoteKey);
    const tourName = tr(lang, r.tourKey);
    return (`<div class="prerendered-review">\n          <h3 class="prerendered-review-author">${escapeHtml(name)}</h3>\n          <p class="prerendered-review-text">${escapeHtml(quote)}</p>\n          <p class="prerendered-review-tour">${escapeHtml(tourName)}</p>\n        </div>`);
  }).join('\n');
  // LCP parity: the runtime hero heading is `{hero_heading1}<br/>{hero_heading2}`
  // (src/pages/home.tsx). The prerendered <h1> must contain the identical text
  // AND line break — otherwise Chrome paints the smaller truncated heading
  // first, React grows it on mount, and the larger paint re-records the LCP
  // entry at hydration time. Text is escaped per-part; the <br/> is injected
  // raw. Safe fallback keeps a complete heading if either key is ever missing.
  const heroH1Parts = [tr(lang, 'hero_heading1'), tr(lang, 'hero_heading2')].filter(Boolean).map(escapeHtml);
  const heroH1 = heroH1Parts.length ? heroH1Parts.join('<br/>') : 'Discover the Soul of Morocco';
  const heroH1Block = heroH1Parts.length ? `    <h1>${heroH1}</h1>\n` : h1('Discover the Soul of Morocco');
  // LCP poster: place the hero background image in the FIRST rendered HTML so the
  // browser begins the fetch immediately, in parallel with CSS/JS, instead of
  // waiting for React hydration to mount it. Positioned absolutely via
  // .prerendered-lcp-poster so it paints as the hero backdrop (never a layout
  // shift / content jump for crawlers or users). React clears it on hydrate and
  // re-renders the identical poster — by then it is cache-warm, so the LCP
  // candidate paints almost instantly.
  const lcpPoster = `<picture>\n      <source media="(min-width: 1024px)" type="image/webp" srcset="/images/hero/sahara-caravan-desktop-1280w.webp 1280w, /images/hero/sahara-caravan-desktop-1920w.webp 1920w" sizes="100vw" />\n      <img class="prerendered-lcp-poster" src="/images/hero/sahara-camel-riders-poster.webp" alt="" aria-hidden="true" width="720" height="1280" fetchpriority="high" />\n    </picture>\n`;
  // Where to start: the same eight primary paths the page shows, so the
  // crawlable snapshot links into tours, the Trip Finder, destinations, day
  // trips, the Sahara, custom trips, student travel and the travel guide.
  const discovery = [
    { rest: '/tours', label: 'nav_tours' },
    { rest: '/trip-finder', label: 'tf_badge' },
    { rest: '/destinations', label: 'nav_destinations' },
    { rest: '/day-trips', label: 'nav_day_trips' },
    { rest: '/desert-tours', label: 'nav_sahara_desert_tours' },
    { rest: '/trip-builder', label: 'nav_build_journey' },
    { rest: '/student-tours', label: 'st_tours_label' },
    { rest: '/travel-info', label: 'dest_travel_info' },
  ].map((d) => link(`${SITE_URL}/${lang}${d.rest}`, tr(lang, d.label)));
  const discoveryBlock = h2(tr(lang, 'home_start_title')) + paragraph(tr(lang, 'home_start_sub')) + ul(discovery);
  return lcpPoster + heroH1Block + paragraph(tr(lang, 'hero_subtext')) + discoveryBlock + h2(tr(lang, 'section_destinations') || 'Top Destinations') + `    <ul>\n${destNames}\n    </ul>\n` + h2(tr(lang, 'section_tours') || 'Featured Tours') + `    <ul>\n${tourNames}\n    </ul>\n` + saharaBlock + hubBlock + dayTripBlock + bookingStepsBlock + homeFaqBlock + h2(tr(lang, 'section_reviews') || 'Traveler Stories') + `<div class="prerendered-reviews-container">\n${reviewBlocks}\n    </div>\n`;
}
function buildHomeSchemas(lang: Lang): Record<string, unknown>[] {
  const reviewData = reviews.map((r) => ({ name: tr(lang, r.nameKey), text: tr(lang, r.quoteKey), rating: r.rating }));
  return [buildReviewSchema(reviewData, 'Morocco Grand Adventure — Traveler Reviews', `${SITE_URL}/${lang}`)];
}
function buildToursContent(lang: Lang): string {
  const blocks = getLocalizedTours(lang).map((t) => h2(t.name) + paragraph(t.description ?? '') + paragraph(`${tr(lang, 'search_duration')}: ${t.duration}`) + ul(t.highlights)).join('');
  // Departure-city hubs — mirrors the "Tours by departure city" section on the
  // live /tours page so crawlers and users see the same Tours tree.
  // Departure-city hubs — mirrors the "Tours by departure city" section on the
  // live /tours page so crawlers and users see the same Tours tree.
  const cityLinks = CITY_HUBS
    .map((hub) => {
      const durationLinks = (CITY_HUB_DURATIONS[hub.id] ?? [])
        .map((days) => `        <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}/${days}-days`, fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) }))}</li>`)
        .join('\n');
      return `      <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}`, tr(lang, `hub_${hub.id}_title`))}\n      <ul class="prerendered-duration-hubs">\n${durationLinks}\n      </ul>\n      </li>`;
    })
    .join('\n');
  // Was tr(lang, 'section_tours') ("Featured Tours") — a stale key left over
  // from before this became its own builder, which meant the crawlable H1
  // never matched what a real visitor sees on /tours (tours_heading). Using
  // the same key the live page renders keeps the two in sync, per this
  // file's own convention elsewhere (see the buildExperienceContent comment
  // on the static/hydrated heading needing to match).
  // Mirrors the contextual /desert-tours link added directly under the H1 on
  // the live page — same intent, same target, same label (nav_sahara_desert_tours).
  const desertToursLink = paragraph(link(`${SITE_URL}/${lang}/desert-tours`, tr(lang, 'nav_sahara_desert_tours')));
  // Mirrors the live-page FAQ accordion (tours_faq_q1..4/a1..4) — same
  // question/answer copy, same heading key (td_faq_title), same convention
  // already used by the university-groups FAQ above.
  const toursFaq = `\n    <h2>${escapeHtml(tr(lang, 'td_faq_title'))}</h2>\n`
    + [1, 2, 3, 4].map((n) => `    <h3>${escapeHtml(tr(lang, `tours_faq_q${n}`))}</h3><p>${escapeHtml(tr(lang, `tours_faq_a${n}`))}</p>`).join('\n');
  // Mirrors the live page's filter-pill bar (city/duration/style, wired to
  // the same ?city=/?duration=/?style= contract the live page reads). robots.txt
  // already disallows crawling those query variants, so this is purely for
  // pre-hydration content parity, not a new indexable surface.
  const filterCityLinks = CITY_HUBS
    .map((hub) => `        <li>${link(`${SITE_URL}/${lang}/tours?city=${hub.id}`, tr(lang, `hub_${hub.id}_name`))}</li>`)
    .join('\n');
  const filterDurationLinks = (['1-2', '3-4', '5-7', '8-14'] as const)
    .map((range) => `        <li>${link(`${SITE_URL}/${lang}/tours?duration=${range}`, tr(lang, `tours_dur_${range.replace('-', '_')}`))}</li>`)
    .join('\n');
  const filterStyleLinks = (['desert', 'imperial', 'mountains', 'coastal'] as const)
    .map((style) => `        <li>${link(`${SITE_URL}/${lang}/tours?style=${style}`, tr(lang, `tours_style_${style}`))}</li>`)
    .join('\n');
  const filterBar = `    <h2>${escapeHtml(tr(lang, 'tours_filter_duration'))}</h2>\n    <ul class="prerendered-tour-filters">\n${filterDurationLinks}\n    </ul>\n`
    + `    <h2>${escapeHtml(tr(lang, 'tours_filter_style'))}</h2>\n    <ul class="prerendered-tour-filters">\n${filterStyleLinks}\n    </ul>\n`;
  return h1(tr(lang, 'tours_heading') || 'Our Tours')
    + paragraph(tr(lang, 'tours_sub'))
    + desertToursLink
    + h2(tr(lang, 'hub_by_departure_city'))
    + `    <ul class="prerendered-city-hubs">\n${cityLinks}\n    </ul>\n`
    + `    <ul class="prerendered-tour-filters">\n${filterCityLinks}\n    </ul>\n`
    + filterBar
    + blocks
    + toursFaq;
}

/**
 * Merzouga Travel Guide hub. Mirrors src/pages/merzouga-guide.tsx from the same
 * data (src/data/merzouga-hub): the locale's own copy, the same photographs
 * with the same srcset/sizes (only the hero is eager), and absolute
 * /{lang}/merzouga-guide/{slug} links to every guide. The runtime page renders
 * with createRoot, so this markup is replaced rather than hydrated.
 */
export function buildMerzougaHubHtml(lang: Lang): string {
  const c = MERZOUGA_HUB_COPY[lang] ?? MERZOUGA_HUB_COPY.en;
  const esc = escapeHtml;
  const img = (i: MgImage, alt: string, sizes: string, eager = false) =>
    `    <figure><img src="${i.src}" srcset="${i.srcSet}" sizes="${sizes}" alt="${esc(alt)}" width="${i.w}" height="${i.h}"`
    + ` loading="${eager ? 'eager' : 'lazy'}" decoding="${eager ? 'sync' : 'async'}"${eager ? ' fetchpriority="high"' : ''} /></figure>\n`;
  const guideOf = (slug: string) => getLocalizedGuide(slug, lang) ?? MERZOUGA_GUIDES.find((p) => p.slug === slug);
  const url = (slug: string) => `${SITE_URL}/${lang}/merzouga-guide/${slug}`;
  const read = tr(lang, 'pwig_read');
  const list = (items: string[]) => `    <ul>\n${items.map((x) => `      <li>${x}</li>`).join('\n')}\n    </ul>\n`;
  const guideLinks = (slugs: string[]) => list(slugs.map((s) => `<a href="${url(s)}">${esc(`${read}: ${guideOf(s)?.title ?? s}`)}</a>`));

  let out = h1(c.hero.title) + img(MG_IMAGES.hero, c.hero.alt, MG_SIZES.hero, true) + paragraph(c.hero.lead);
  out += `    <dl>\n${c.facts.map((f) => `      <dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`).join('\n')}\n    </dl>\n`;
  for (const { id, guides } of MG_STORY) {
    const s = c.story[id];
    out += h2(s.heading) + s.paragraphs.map((p) => paragraph(p)).join('') + img(MG_IMAGES[id], s.alt, MG_SIZES.story) + guideLinks(guides);
  }
  out += h2(c.pack.heading) + paragraph(c.pack.intro);
  for (const g of c.pack.groups) out += `    <h3>${esc(g.title)}</h3>\n` + list(g.items.map(esc));
  out += img(MG_IMAGES.pack, c.pack.alt, MG_SIZES.side) + guideLinks(MG_PACK_GUIDES);
  out += h2(c.basics.heading);
  for (const { id, guides } of MG_BASICS) out += `    <h3>${esc(c.basics.items[id].title)}</h3>\n` + paragraph(c.basics.items[id].body) + guideLinks(guides);
  out += h2(c.mistakes.heading) + `    <ol>\n${c.mistakes.items.map((m) => `      <li><strong>${esc(m.title)}</strong> — ${esc(m.body)}</li>`).join('\n')}\n    </ol>\n`;
  out += h2(c.choose.heading);
  for (const { id, guide } of MG_CHOOSE) out += `    <h3>${esc(c.choose.items[id].title)}</h3>\n` + paragraph(c.choose.items[id].body) + guideLinks([guide]);
  out += rawParagraph(`<a href="${SITE_URL}/${lang}/comparisons/${MG_COMPARISON}">${esc(c.choose.compare)}</a>`);
  out += h2(tr(lang, 'pwig_heading')) + paragraph(tr(lang, 'pwig_sub'));
  for (const slug of MG_FEATURED_GUIDES) {
    const g = guideOf(slug);
    if (!g) continue;
    out += `    <article class="prerendered-guide-card">\n      <h3><a href="${url(slug)}">${esc(g.title)}</a></h3>\n      <p>${esc(g.intro)}</p>\n`
      + `      <p><a href="${url(slug)}" aria-label="${esc(g.title)} — ${esc(read)}">${esc(read)}</a></p>\n    </article>\n`;
  }
  out += `    <h3>${esc(c.guides.allHeading)}</h3>\n`;
  for (const group of MG_GUIDE_GROUPS) {
    out += `    <h4>${esc(c.guides.groups[group.id])}</h4>\n` + list(group.slugs.map((s) => `<a href="${url(s)}">${esc(guideOf(s)?.title ?? s)}</a>`));
  }
  const tours = MG_TOURS.map((id) => getLocalizedTour(id, lang)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  if (tours.length) {
    out += h2(c.tours.heading);
    for (const t of tours) out += `    <h3><a href="${SITE_URL}/${lang}/tours/${t.id}">${esc(t.name)}</a></h3>\n` + paragraph(`${t.duration} — ${t.description ?? ''}`);
  }
  out += h2(tr(lang, 'exp_faq_title')) + faqBlock([1, 2, 3, 4].map((n) => ({ question: tr(lang, `mg_faq${n}_q`), answer: tr(lang, `mg_faq${n}_a`) })));
  out += h2(tr(lang, 'guide_cta_heading'));
  out += rawParagraph(`${esc(tr(lang, 'guide_cta_sub'))} <a href="${SITE_URL}/${lang}/trip-builder">${esc(tr(lang, 'guide_cta_build'))}</a> · <a href="${contactInfo.whatsapp}">${esc(tr(lang, 'guide_cta_whatsapp'))}</a>.`);
  return out;
}

/** Prerendered markup for a departure-city hub (mirrors <TourCityHub>). */
function buildCityHubContent(slug: string, lang: Lang): string {
  const hub = CITY_HUBS.find((h) => h.slug === slug);
  if (!hub) return h1('Not Found') + paragraph('This departure hub could not be found.');
  const all = getLocalizedTours(lang);
  const cityTours = tourIdsForCity(hub.id)
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .sort((a, b) => tourDurationDays(a.duration) - tourDurationDays(b.duration));

  let tourBlocks = '';
  for (const t of cityTours) {
    tourBlocks += h2(t.name)
      + paragraph(t.description ?? '')
      + paragraph(`${tr(lang, 'search_duration')}: ${t.duration} · ${tr(lang, 'price_tailored')}`)
      + '<ul>' + t.highlights.map((x) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, x)}</li>`).join('\n') + '    </ul>'
      + rawParagraph(link(`${SITE_URL}/${lang}/tours/${t.id}`, tr(lang, 'tours_view') + ' ' + escapeHtml(t.name)));
  }

  const destinationsForLang = getLocalizedDestinations(lang)
    .filter((d) => hub.destinationIds.includes(d.id))
    .map((d) => `<li>${link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name)} - ${escapeHtml(d.shortDesc)}</li>`)
    .join('\n');

  const toursSection = tourBlocks ? h2(fmt(tr(lang, 'hub_private_title'), { city: tr(lang, `hub_${hub.id}_name`) })) + tourBlocks : '';
  const destinationsSection = destinationsForLang ? h2(fmt(tr(lang, 'hub_explore_region'), { city: tr(lang, `hub_${hub.id}_name`) })) + `    <ul>\n${destinationsForLang}\n    </ul>\n` : '';

  // Duration-hub tree: every /tours/from-<city>/<N>-days route for this city is
  // linked here so crawlers can traverse City → Duration → Tour from the hub.
  const durationLinks = (CITY_HUB_DURATIONS[hub.id] ?? [])
    .map((days) => `      <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}/${days}-days`, fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) }))}</li>`)
    .join('\n');
  const durationsSection = h2(tr(lang, 'hub_by_departure_city') || 'Available Durations')
    + `    <ul class="prerendered-duration-hubs">\n${durationLinks}\n    </ul>\n`;

  return h1(tr(lang, `hub_${hub.id}_title`))
    + paragraph(tr(lang, `hub_${hub.id}_intro`))
    // Product discovery first — the real tours for this city appear directly
    // after the hero/intro, matching the live page's section order.
    + toursSection
    + paragraph(tr(lang, `hub_${hub.id}_body`))
    + (hub.hasDurationDrive
        ? h2(fmt(tr(lang, 'hub_dur_crumb'), { days: 3, city: tr(lang, `hub_${hub.id}_name`) })) + rawParagraph(link(`${SITE_URL}/${lang}/tours/from-${hub.slug}/3-days`, fmt(tr(lang, 'hub_browse_3day'), { city: tr(lang, `hub_${hub.id}_name`) })))
        : '')
    + durationsSection
    + destinationsSection
    + h2(tr(lang, 'nav_build_journey')) + rawParagraph(link(`${SITE_URL}/${lang}/trip-builder`, tr(lang, 'nav_build_journey')));
}

/** Prerendered markup for a departure-city duration hub (mirrors <TourDurationHub>). */
function buildDurationHubContent(slug: string, days: number, lang: Lang): string {
  const hub = CITY_HUBS.find((h) => h.slug === slug);
  if (!hub) return h1('Not Found') + paragraph('This page could not be found.');
  const all = getLocalizedTours(lang);
  const matching = tourIdsForCity(hub.id)
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .filter((t) => tourDurationDays(t.duration) === days);

  const siblingIds = tourIdsForCity(hub.id)
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .filter((t) => tourDurationDays(t.duration) !== days);

  let tourBlocks = '';
  for (const t of matching) {
    tourBlocks += h2(t.name)
      + paragraph(t.description ?? '')
      + paragraph(`${tr(lang, 'price_tailored')} · ${t.duration}`)
      + rawParagraph(link(`${SITE_URL}/${lang}/tours/${t.id}`, tr(lang, 'tours_view') + ' ' + escapeHtml(t.name)));
  }

  const siblingLinks = siblingIds.length
    ? '<ul>' + siblingIds.map((t) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, `${t.name} (${t.duration})`)}</li>`).join('\n') + '    </ul>\n'
    : '';

  const durCrumbLabel = fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) });
  const breadcrumbLinks = [
    { label: tr(lang, 'nav_home'), url: `${SITE_URL}/${lang}` },
    { label: tr(lang, 'nav_tours'), url: `${SITE_URL}/${lang}/tours` },
    { label: tr(lang, `hub_${hub.id}_title`), url: `${SITE_URL}/${lang}/tours/from-${hub.slug}` },
    { label: durCrumbLabel },
  ].map((c) => c.url ? link(c.url, c.label) : `<strong>${escapeHtml(c.label)}</strong>`).join(' › ');

  const cityName = tr(lang, `hub_${hub.id}_name`);
  const intro = days === 3
    ? fmt(tr(lang, 'hub_dur_intro_3'), { days, city: cityName })
    : fmt(tr(lang, 'hub_dur_intro_default'), { days, city: cityName });
  const highlights = matching[0]?.highlights ?? [];
  const highlightsBlock = highlights.length ? h2(tr(lang, 'hub_dur_highlights')) + ul(highlights) : '';
  const ctaBlock = h2(fmt(tr(lang, 'hub_dur_cta_title'), { days, city: cityName }))
    + paragraph(tr(lang, 'hub_dur_cta_sub'))
    + rawParagraph(link(`${SITE_URL}/${lang}/trip-builder`, tr(lang, 'nav_build_journey')));

  return h1(fmt(tr(lang, 'hub_dur_h1'), { days, city: cityName }))
    + `<p class="prerendered-breadcrumb">${breadcrumbLinks}</p>\n`
    + (matching.length ? paragraph(intro) : '')
    + (matching.length
        ? paragraph(fmt(tr(lang, 'hub_dur_dept_title'), { days, city: cityName })) + tourBlocks
        : paragraph(fmt(tr(lang, 'hub_dur_none_body'), { days, city: cityName })) + rawParagraph(link(`${SITE_URL}/${lang}/trip-builder`, tr(lang, 'nav_build_journey'))))
    + highlightsBlock
    + (matching.length ? ctaBlock : '')
    + (siblingLinks ? h2(fmt(tr(lang, 'hub_dur_other'), { city: cityName })) + siblingLinks : '');
}

const RELATED_DESTINATION_IDS: Record<string, string[]> = {
  marrakech: ['ourika-valley', 'ait-ben-haddou', 'dades-valley'],
  fes: ['chefchaouen', 'ifrane', 'marrakech'],
  'ait-ben-haddou': ['marrakech', 'dades-valley', 'merzouga'],
  'dades-valley': ['ait-ben-haddou', 'todra-gorge', 'merzouga'],
  merzouga: ['erg-chebbi', 'dades-valley', 'todra-gorge'],
  'erg-chebbi': ['merzouga', 'dades-valley', 'ait-ben-haddou'],
  'todra-gorge': ['dades-valley', 'merzouga', 'ait-ben-haddou'],
  // Mirrors src/components/seo/TopicalLinks.tsx exactly.
  ouarzazate: ['ait-ben-haddou', 'dades-valley', 'merzouga'],
  zagora: ['draa-valley', 'ouarzazate', 'ait-ben-haddou'],
  'draa-valley': ['zagora', 'ouarzazate', 'ait-ben-haddou'],
};

// Sahara destinations additionally link to the desert-experience pages so the
// dune pages connect to camel trekking, camps and Sahara tours contextually.
const DESTINATION_EXPERIENCE_LINKS: Record<string, string[]> = {
  'erg-chebbi': ['/desert-tours', '/camel-trekking', '/luxury-camp', '/merzouga-guide'],
  merzouga: ['/desert-tours', '/camel-trekking', '/luxury-camp', '/merzouga-guide'],
};

/**
 * Static equivalent of the React TopicalLinks component. The prerenderer does
 * not execute Layout/React, so these anchors must be generated here to keep
 * crawlers and users on the same contextual internal-link graph.
 */
function buildTopicalLinksContent(options: { destinationId?: string; tourId?: string }, lang: Lang): string {
  const destinationsForLang = getLocalizedDestinations(lang);
  const toursForLang = getLocalizedTours(lang);

  if (options.destinationId) {
    const relatedDestinations = (RELATED_DESTINATION_IDS[options.destinationId] ?? [])
      .map((id) => destinationsForLang.find((destination) => destination.id === id))
      .filter(Boolean);
    const relatedTours = toursForLang
      .filter((tour) => tour.id !== options.tourId && tour.routeIds?.includes(options.destinationId!))
      .slice(0, 3);

    if (relatedDestinations.length === 0 && relatedTours.length === 0) return '';

    const destinationLinks = relatedDestinations.length > 0
      ? `<div>\n        ${h2(tr(lang, 'dest_nearby')).trim()}\n        <div class="topical-link-list">${relatedDestinations.map((destination) => ` ${link(`/${lang}/destinations/${destination!.id}`, destination!.name)}`).join('')}</div>\n      </div>`
      : '';
    const currentName = destinationsForLang.find((destination) => destination.id === options.destinationId)?.name ?? '';
    const tourLinks = relatedTours.length > 0
      ? `<div>\n        ${h2(`${tr(lang, 'dest_tours')} ${currentName}`).trim()}\n        <div class="topical-link-list">${relatedTours.map((tour) => ` ${link(`/${lang}/tours/${tour.id}`, tour.name)}`).join('')}</div>\n      </div>`
      : '';
    const experienceLinks = (DESTINATION_EXPERIENCE_LINKS[options.destinationId] ?? [])
      .map((rest) => ` ${link(`/${lang}${rest}`, experienceLabel(rest, lang))}`)
      .join('');
    const experienceBlock = experienceLinks
      ? `<div>\n        ${h2(tr(lang, 'nav_experiences') || 'Experiences').trim()}\n        <div class="topical-link-list">${experienceLinks}</div>\n      </div>`
      : '';

    return `<section class="border-t border-border bg-muted/40 py-12" aria-label="${escapeHtml(tr(lang, 'dest_nearby'))}">\n  <div class="container mx-auto px-4 max-w-6xl">\n    <div class="grid gap-8 md:grid-cols-2">\n      ${destinationLinks}\n      ${tourLinks}\n      ${experienceBlock}\n    </div>\n  </div>\n</section>\n`;
  }

  if (options.tourId) {
    const tour = toursForLang.find((item) => item.id === options.tourId);
    if (!tour) return '';

    const routeDestinations = (tour.routeIds ?? [])
      .map((id) => destinationsForLang.find((destination) => destination.id === id))
      .filter(Boolean);
    const priorityIds = ['marrakech', 'ourika-valley', 'ait-ben-haddou', 'dades-valley', 'merzouga', 'erg-chebbi', 'fes'];
    const priorityStops = priorityIds
      .map((id) => routeDestinations.find((destination) => destination?.id === id))
      .filter(Boolean);
    const routeStops = [...priorityStops, ...routeDestinations]
      .filter((destination, index, items) => destination && items.findIndex((item) => item?.id === destination.id) === index)
      .slice(0, 7);
    const routeIdSet = new Set(tour.routeIds ?? []);
    const relatedTours = toursForLang
      .filter((item) => item.id !== tour.id)
      .map((item) => ({ tour: item, overlap: (item.routeIds ?? []).filter((id) => routeIdSet.has(id)).length }))
      .filter((item) => item.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 2)
      .map((item) => item.tour);

    if (routeStops.length === 0 && relatedTours.length === 0) return '';

    const routeLinks = routeStops.length > 0
      ? `<div>\n        ${h2(tr(lang, 'td_your_route')).trim()}\n        <div class="topical-link-list">${routeStops.map((destination) => ` ${link(`/${lang}/destinations/${destination!.id}`, destination!.name)}`).join('')}</div>\n      </div>`
      : '';
    const relatedTourLinks = relatedTours.length > 0
      ? `<div>\n        ${h2(tr(lang, 'tour_related')).trim()}\n        <div class="topical-link-list">${relatedTours.map((relatedTour) => ` ${link(`/${lang}/tours/${relatedTour.id}`, relatedTour.name)}`).join('')}</div>\n      </div>`
      : '';

    const comparison = COMPARISONS.find((page) => page.slug === 'private-vs-shared-tour');
    const compareLinks = comparison
      ? `<div>\n        ${h2(tr(lang, 'compare_before_title')).trim()}\n        <div class="topical-link-list"> ${link(`/${lang}/comparisons/${comparison.slug}`, getLocalizedGuide(comparison.slug, lang)?.title ?? comparison.title)}</div>\n      </div>`
      : '';

    return `<section class="border-t border-border bg-muted/40 py-12" aria-label="${escapeHtml(tr(lang, 'td_your_route'))}">\n  <div class="container mx-auto px-4 max-w-6xl">\n    <div class="grid gap-8 md:grid-cols-3">\n      ${routeLinks}\n      ${relatedTourLinks}\n      ${compareLinks}\n    </div>\n  </div>\n</section>\n`;
  }

  return '';
}

/**
 * Experience list for the prerendered tour page.
 *
 * Derived from the CANONICAL English itinerary (the stop → experience map is
 * keyed on English stop text) and then localized through the overlay, exactly
 * as the React component does — so crawler and client see the same list.
 */
function experienceItems(items: DerivedExperience[], lang: Lang): string[] {
  return items.map((item) => {
    const e = localizeExperience(item, lang);
    const status = item.status === 'confirmed' ? ` (${escapeHtml(tr(lang, 'jx_exp_confirmed'))})` : '';
    const dest = e.destinationId
      ? ` ${link(`${SITE_URL}/${lang}/destinations/${e.destinationId}`, fmt(tr(lang, 'jx_exp_explore'), { n: getLocalizedDestinations(lang).find((d) => d.id === e.destinationId)?.name ?? e.label }))}`
      : '';
    return `<strong>${escapeHtml(e.label)}</strong>${status} — ${escapeHtml(e.blurb)}${dest}`;
  });
}

/** The four booking steps, stated once in the gap layer and rendered here. */
function bookingStepsBlock(lang: Lang): string {
  const steps = [1, 2, 3, 4].map(
    (n) => `${escapeHtml(tr(lang, `jx_hbw_${n}_t`))}: ${escapeHtml(tr(lang, `jx_hbw_${n}_d`))}`,
  );
  return h2(tr(lang, 'jx_hbw_title')) + ul(steps) + paragraph(tr(lang, 'jx_hbw_cancel'));
}

function tourInclusionsBlock(canonical: Tour, localized: Tour, lang: Lang): string {
  const inc = deriveTourInclusions(canonical, localized);
  if (!inc.included.length && !inc.notIncluded.length) return '';
  const destMap = Object.fromEntries(getLocalizedDestinations(lang).map((d) => [d.id, d.name]));
  const itemText = (it: InclusionItem) => {
    if (it.label) return it.label;
    const s = it.key ? tr(lang, it.key) : '';
    return it.nights ? s.split('{n}').join(String(it.nights)) : s;
  };
  const fmt = (s: string, values: Record<string, string | number>) => Object.entries(values).reduce((out, [k, v]) => out.split(`{${k}}`).join(String(v)), s);
  const itemHtml = (it: InclusionItem) => {
    const status = it.status === 'confirmed' ? ` (${escapeHtml(tr(lang, 'jx_exp_confirmed'))})` : '';
    return `<strong>${escapeHtml(itemText(it))}</strong>${status}`;
  };
  const placeOf = (row: { place: string; placeId?: string }): string => {
    const dest = (row.placeId && destMap[row.placeId]) || '';
    return dest && row.place && row.place.toLowerCase().includes(dest.toLowerCase()) ? row.place : row.place || dest;
  };
  // Same place text as TourInclusions.tsx's `placeLink` — linked to that
  // destination's own page when this site has one, plain text otherwise.
  const placeHtml = (row: { place: string; placeId?: string }): string => {
    const name = placeOf(row);
    return row.placeId && name ? link(`/${lang}/destinations/${row.placeId}`, name) : escapeHtml(name);
  };
  /** Template text with a `{place}` token spliced with raw (already-safe) place HTML. */
  const fmtPlaceHtml = (template: string, row: { place: string; placeId?: string }): string => {
    const [before = '', after = ''] = template.split('{place}');
    return `${escapeHtml(before)}${placeHtml(row)}${escapeHtml(after)}`;
  };
  // Grouped by commercial category — mirrors TourInclusions.tsx exactly, so the
  // crawlable HTML matches what a browser visitor sees after hydration.
  const groupedIncBlocks = INC_GROUP_ORDER.map((kind) => {
    const items = inc.included.filter((it) => it.kind === kind).map(itemHtml);
    return items.length ? h3(tr(lang, INC_GROUP_KEY[kind])) + rawUl(items) : '';
  }).join('');
  const breakfastCount = inc.meals.filter((m) => m.breakfast === 'included').length;
  const breakfastLine = breakfastCount > 0
    ? rawParagraph(`<strong>${escapeHtml(fmt(tr(lang, 'jx_inc_breakfasts_count'), { n: breakfastCount }))}</strong>`)
    : '';
  const dinnerLine = inc.dinnerSummary.count > 0
    ? (() => {
        const lines = inc.dinnerSummary.nights.map((row) => `<strong>${fmtPlaceHtml(tr(lang, 'jx_inc_dinner_at'), row)}</strong>`);
        return rawParagraph(`<strong>${escapeHtml(fmt(tr(lang, 'jx_inc_dinners_count'), { n: inc.dinnerSummary.count }))}</strong> ${lines.join(', ')}`);
      })()
    : '';
  // Mirrors TourInclusions.tsx's "Meals included" summary heading unifying
  // the breakfast/dinner counts above — same 1 new i18n key, same wording.
  const mealsSummaryBlock = breakfastCount > 0 || inc.dinnerSummary.count > 0 ? h3(tr(lang, 'jx_inc_meals_summary_title')) + breakfastLine + dinnerLine : '';
  const excItems = [
    ...inc.notIncluded.map((it) => escapeHtml(itemText(it))),
    ...inc.cityDinnersExcluded.map((group) => fmtPlaceHtml(tr(lang, 'jx_inc_dinner_in'), group)),
  ];
  const mealItems = inc.meals.map((m) => {
    const b = m.breakfast === 'included' ? tr(lang, 'jx_inc_meal_included') : m.breakfast === 'confirmed' ? tr(lang, 'jx_exp_confirmed') : m.breakfast === 'not_included' ? tr(lang, 'jx_inc_meal_not_included') : tr(lang, 'jx_inc_meal_unspecified');
    const d = m.dinner === 'included' ? tr(lang, 'jx_inc_meal_included') : m.dinner === 'confirmed' ? tr(lang, 'jx_exp_confirmed') : m.dinner === 'not_included' ? tr(lang, 'jx_inc_meal_not_included') : tr(lang, 'jx_inc_meal_unspecified');
    return `${escapeHtml(tr(lang, 'jx_inc_night').split('{n}').join(String(m.night)))}: ${placeHtml(m)} — ${escapeHtml(tr(lang, 'jx_inc_meal_breakfast'))}: ${escapeHtml(b)} | ${escapeHtml(tr(lang, 'jx_inc_meal_dinner'))}: ${escapeHtml(d)}`;
  });
  return (
    h2(tr(lang, 'tour_included')) +
    paragraph(tr(lang, 'jx_inc_lead')) +
    (inc.hasConfirmed ? paragraph(tr(lang, 'jx_inc_confirmed_note')) : '') +
    groupedIncBlocks +
    mealsSummaryBlock +
    (mealItems.length ? h3(tr(lang, 'jx_inc_meals_title')) + paragraph(tr(lang, 'jx_inc_meals_lead')) + rawUl(mealItems) : '') +
    (excItems.length ? h2(tr(lang, 'tour_not_included')) + rawUl(excItems) : '')
  );
}

function buildTourDetailContent(id: string, lang: Lang): string {
  const tour = getLocalizedTour(id, lang);
  if (!tour) return h1('Tour Not Found') + paragraph('This tour could not be found.');
  const itinerary = tour.itineraryDays ?? [];
  const included = tour.included ?? [];
  const excluded = tour.excluded ?? [];
  const faqs = tour.faq ?? [];
  // Departure-city breadcrumb link, mirroring the visible breadcrumb bar so
  // crawlers see the same Tours → City → Tour hierarchy users navigate.
  const departCity = TOUR_DEPARTURE_CITY[tour.id];
  const departHub = departCity ? CITY_HUBS.find((h) => h.id === departCity) : undefined;
  // Insert the duration-hub node (Home › Tours › City › N Days › Tour) whenever
  // the tour's real duration has a dedicated /tours/from-<city>/<N>-days page.
  const tourDays = tourDurationDays(tour.duration);
  const hasDurationHub = Boolean(departCity && (CITY_HUB_DURATIONS[departCity] ?? []).includes(tourDays));
  // Tour depth blocks (src/data/tourDepth.ts): authored why-choose / best-for
  // copy plus contextual guide links resolved against all hub pages.
  const depth = getLocalizedTourDepth(tour.id, lang);
  const derived = deriveTourExperiences(canonicalTours.find((x) => x.id === tour.id) ?? {});
  const experiencesBlock = derived.included.length
    ? h2(tr(lang, 'jx_exp_title')) +
      paragraph(tr(lang, 'jx_exp_lead')) +
      (derived.included.some((e) => e.status === 'confirmed') ? paragraph(tr(lang, 'jx_exp_confirmed_note')) : '') +
      rawUl(experienceItems(derived.included, lang))
    : '';
  const optionalBlock = derived.optional.length
    ? h2(tr(lang, 'jx_opt_title')) + paragraph(tr(lang, 'jx_opt_lead')) + rawUl(experienceItems(derived.optional, lang))
    : '';
  const whyChooseBlock = depth.whyChoose.length ? h2(tr(lang, 'jx_why_choose')) + ul(depth.whyChoose) : '';
  const bestForBlock = depth.bestFor ? h2(tr(lang, 'jx_best_for')) + paragraph(depth.bestFor) : '';
  const allHubsForDepth = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO];
  const guideLinkItems = depth.guideLinks
    .map((slug) => allHubsForDepth.find((q) => q.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => link(`${SITE_URL}/${lang}${hubPathFor(p)}`, getLocalizedGuide(p.slug, lang)?.title ?? p.title));
  const guideLinksBlock = guideLinkItems.length
    ? h2(tr(lang, 'pwig_heading')) + rawUl(guideLinkItems) + paragraph(tr(lang, 'pwig_sub'))
    : '';
  const durationHubCrumb = departHub && hasDurationHub
    ? ` › ${link(`${SITE_URL}/${lang}/tours/from-${departHub.slug}/${tourDays}-days`, fmt(tr(lang, 'hub_dur_crumb'), { days: tourDays, city: tr(lang, `hub_${departHub.id}_name`) }))}`
    : '';
  const breadcrumb = departHub
    ? `<p class="prerendered-breadcrumb">${link(`${SITE_URL}/${lang}`, tr(lang, 'nav_home'))} › ${link(`${SITE_URL}/${lang}/tours`, tr(lang, 'nav_tours'))} › ${link(`${SITE_URL}/${lang}/tours/from-${departHub.slug}`, tr(lang, `hub_${departHub.id}_title`))}${durationHubCrumb} › ${escapeHtml(tour.name)}</p>\n`
    : '';
  const canonical = canonicalTours.find((x) => x.id === tour.id) ?? tour;
  const inclusionsHtml = tourInclusionsBlock(canonical, tour, lang);
  const practicalInfoBlock = tour.practicalInfo && tour.practicalInfo.length > 0
    ? h2(tr(lang, 'tour_practical_info')) + ul(tour.practicalInfo)
    : '';
  // Day Trip products (duration "1 Day", one itinerary day): a chronological
  // "what your day looks like" block instead of the multi-day day-by-day list
  // below — mirrors the client's DayTripFlow component exactly, same labels
  // (never an invented clock time), same stop order.
  const isDayTrip = itinerary.length === 1 && tourDurationDays(tour.duration) === 1;
  const dayFlowBlock = isDayTrip
    ? h2(tr(lang, 'jx_day_flow_heading')) + rawUl(
        (itinerary[0].stopDetails ?? []).map((stop) => {
          const timePart = stop.time ? `<strong>${escapeHtml(stop.time)}</strong> — ` : '';
          const descPart = stop.desc ? `: ${escapeHtml(stop.desc)}` : '';
          return `${timePart}${escapeHtml(stop.title)}${descPart}`;
        }),
      )
    : '';
  // Multi-day itinerary: mirrors the client's day-by-day timeline exactly —
  // the real per-day narrative (`desc`), the real day photo when one exists
  // (`image`), and the real stop-by-stop breakdown (`stopDetails`, falling
  // back to the plain `stops` list) — not just a day-title bullet. Previously
  // this block only rendered "Day N: <title>", so the actual itinerary prose
  // was invisible to crawlers even though it was fully visible to users.
  const multiDayItineraryBlock = !isDayTrip && itinerary.length > 0
    ? h2(tr(lang, 'tour_itinerary')) + itinerary.map((d) => {
        const dayHeading = `    <h3>${escapeHtml(tr(lang, 'tour_day'))} ${d.day}: ${escapeHtml(d.title)}</h3>\n`;
        const dayImage = d.image ? figureImg(d.image.src, d.image.alt, d.title) : '';
        const dayDesc = paragraph(d.desc);
        const stopsList = d.stopDetails && d.stopDetails.length > 0
          ? rawUl(d.stopDetails.map((s) => {
              const timePart = s.time ? `<strong>${escapeHtml(s.time)}</strong> — ` : '';
              const descPart = s.desc ? `: ${escapeHtml(s.desc)}` : '';
              return `${timePart}${escapeHtml(s.title)}${descPart}`;
            }))
          : (d.stops && d.stops.length > 0 ? ul(d.stops) : '');
        return dayHeading + dayImage + dayDesc + stopsList;
      }).join('')
    : '';
  const suitableForBlock = tour.suitableFor && tour.suitableFor.length > 0
    ? h2(tr(lang, 'jx_suitable_for_heading')) + ul(tour.suitableFor)
    : '';
  // Photo gallery: mirrors the client's fallback (tour-detail.tsx) so a tour
  // without an authored `gallery` still shows the same three generic shots
  // crawlers would otherwise never see, since this section was not prerendered at all before.
  const galleryImages = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [
    { src: '/images/dest/merzouga.webp', caption: 'Sahara dunes at Merzouga' },
    { src: '/images/dest/erg-chebbi.webp', caption: 'Golden sands of Erg Chebbi' },
    { src: '/images/dest/ait-ben-haddou.webp', caption: 'Aït Benhaddou ksar' },
  ];
  const galleryBlock = h2(tr(lang, 'tour_gallery')) + galleryImages.map((g) => figureImg(g.src, g.caption, g.caption)).join('');
  // Quick Facts: mirrors the client's "at a glance" panel in tour-detail.tsx —
  // same verified start/end derivation (tour-quick-facts.ts) and the same
  // per-night "where you'll sleep" summary reused from the meals data below,
  // so the crawlable HTML states nothing the visible page doesn't.
  const startEnd = deriveTourStartEnd(canonical, destinations);
  const qfDestMap = Object.fromEntries(getLocalizedDestinations(lang).map((d) => [d.id, d.name]));
  const qfStartName = startEnd ? qfDestMap[startEnd.startId] : undefined;
  const qfEndName = startEnd?.endId ? qfDestMap[startEnd.endId] : undefined;
  const qfInclusions = deriveTourInclusions(canonical, tour);
  const qfNightPlace = (row: MealRow): string => {
    const dest = row.placeId ? qfDestMap[row.placeId] : undefined;
    if (dest && row.place && row.place.toLowerCase().includes(dest.toLowerCase())) return row.place;
    return row.place || dest || '';
  };
  const qfSleepPlaces: string[] = [];
  for (const row of qfInclusions.meals) {
    const label = qfNightPlace(row);
    if (label && qfSleepPlaces[qfSleepPlaces.length - 1] !== label) qfSleepPlaces.push(label);
  }
  const qfSleepSummary = qfSleepPlaces.join(' · ');
  // A day trip has no overnight by definition — state that plainly (as the
  // client's Quick Facts panel does) rather than silently omitting the
  // accommodation row, so the crawlable HTML doesn't look like a data gap.
  const qfAccommodation = qfSleepSummary || (isDayTrip ? tr(lang, 'jx_day_trip_no_overnight') : '');
  const quickFactsBlock = (qfStartName || qfEndName || qfAccommodation)
    ? `\n    <h2>${escapeHtml(tr(lang, 'jx_qf_heading'))}</h2>\n    <dl class="prerendered-quick-facts">\n`
      + `      <dt>${escapeHtml(tr(lang, 'search_duration'))}</dt><dd>${escapeHtml(tour.duration)}</dd>\n`
      + (qfStartName ? `      <dt>${escapeHtml(tr(lang, 'jx_qf_starts'))}</dt><dd>${escapeHtml(qfStartName)}</dd>\n` : '')
      + (qfEndName ? `      <dt>${escapeHtml(tr(lang, 'jx_qf_ends'))}</dt><dd>${escapeHtml(qfEndName)}${startEnd?.isRoundTrip ? ` (${escapeHtml(tr(lang, 'jx_qf_round_trip'))})` : ''}</dd>\n` : '')
      + (qfAccommodation ? `      <dt>${escapeHtml(tr(lang, 'jx_grp_stay'))}</dt><dd>${escapeHtml(qfAccommodation)}</dd>\n` : '')
      + `    </dl>\n`
    : '';
  return breadcrumb + h1(tour.name) + paragraph(tour.description ?? '') + paragraph(`${tr(lang, 'search_duration')}: ${tour.duration}`) + quickFactsBlock + h2(tr(lang, 'tour_why_love')) + ul(tour.highlights) + suitableForBlock + whyChooseBlock + (isDayTrip ? dayFlowBlock : multiDayItineraryBlock) + practicalInfoBlock + experiencesBlock + optionalBlock + inclusionsHtml + bookingStepsBlock(lang) + galleryBlock + (faqs.length > 0 ? h2(tr(lang, 'nav_faq')) + faqBlock(faqs) : '') + (departHub ? h2(fmt(tr(lang, 'hub_related_title'), { city: tr(lang, `hub_${departHub.id}_name`) })) + paragraph(link(`${SITE_URL}/${lang}/tours/from-${departHub.slug}`, fmt(tr(lang, 'hub_related_browse'), { city: tr(lang, `hub_${departHub.id}_name`) }))) : '') + bestForBlock + guideLinksBlock + rawParagraph(link(`${SITE_URL}/${lang}/book`, tr(lang, 'book_form_cta'))) + buildTopicalLinksContent({ tourId: tour.id }, lang);
}
function buildDestinationsContent(lang: Lang): string {
  // Mirror the live /destinations page structure: localized H1 + intro, each
  // destination linked to its detail page, and the priority tour cross-links.
  const blocks = getLocalizedDestinations(lang).map((d) => h2Link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name) + paragraph(d.shortDesc) + ul(d.highlights)).join('');
  const priorityTours = ['3-day-sahara-marrakech', '5-day-imperial-cities', '7-day-imperial-cities-sahara-escape']
    .map((id) => getLocalizedTour(id, lang))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((t) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, `${t.name} (${t.duration})`)}</li>`)
    .join('\n');
  return h1(tr(lang, 'dest_discover')) + paragraph(tr(lang, 'dest_find'))
    + blocks
    + h2(tr(lang, 'section_tours')) + `    <ul>\n${priorityTours}\n    </ul>\n`;
}
function buildDestinationDetailContent(destId: string, lang: Lang): string {
  const d = getLocalizedDestination(destId, lang);
  if (!d) return h1('Not Found') + paragraph('This destination could not be found.');
  const gallery = (d.gallery ?? []).map((p) => figureImg(p.src, p.alt, p.caption)).join('\n');
  // Mirror the runtime destination page: every catalog photo reinforced for this
  // destination under a "through our lens" heading, followed by the culinary food
  // photograph. No cap so every mapped catalog image is discoverable.
  const catalog = imagesForDestination(destId);
  const catalogBlock = catalog.length
    ? h2(`${d.name} ${tr(lang, 'dest_through_lens')}`) + catalog.map((img) => catalogFigure(img, '(max-width: 640px) 100vw, 50vw')).join('\n')
    : '';
  const food = catalogImage(DEST_FOOD_IMAGE[d.id] ?? '');
  const foodBlock = food
    ? h2(`${tr(lang, 'dest_local_food')} ${d.name}`) + catalogFigure(food, '(max-width: 768px) 100vw, 50vw')
    : '';
  // Mirrors the runtime page's "Tours {name}" grid — only tours whose real
  // route (Tour.routeIds) actually passes through this destination, never a
  // generic/unrelated list. Omitted entirely when no tour genuinely visits
  // this destination, same as the runtime page.
  const relevantTours = getLocalizedTours(lang).filter((tr_) => tr_.routeIds?.includes(destId));
  const toursBlock = relevantTours.length
    ? h2(`${tr(lang, 'dest_tours')} ${d.name}`) + rawUl(relevantTours.map((t) => link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name)))
    : '';
  // Merzouga topical cluster: contextual links from the destination pages into
  // the Merzouga guide hubs (same block the runtime DestinationDetail renders).
  const merzougaGuideLinks = (destId === 'merzouga' || destId === 'erg-chebbi')
    ? h2(tr(lang, 'dest_plan_experience')) + rawUl(
        MERZOUGA_GUIDES
          .filter((p) => ['things-to-do', 'camel-trekking', 'quad-biking', '4x4-desert-tour', 'luxury-desert-camps', 'best-time-to-visit'].includes(p.slug))
          .map((p) => link(`${SITE_URL}/${lang}/merzouga-guide/${p.slug}`, p.title))
      )
    : '';
  // Departure-city product discovery — mirrors <DeparturePlanSection> in
  // src/pages/destination-detail.tsx exactly: only the 5 real departure
  // cities, only links to real inventory (day trips if the city has any,
  // the city's own tour hub, duration-filtered /tours views).
  const hub = CITY_HUBS.find((h) => h.id === destId);
  const departurePlanLinks = hub ? (() => {
    const dayTripCount = DAY_TRIP_PRODUCT_IDS.filter((id) => TOUR_DEPARTURE_CITY[id] === destId).length;
    const cityTourCount = canonicalTours.filter((t) => TOUR_DEPARTURE_CITY[t.id] === destId).length;
    const items = [
      ...(dayTripCount > 0 ? [link(`${SITE_URL}/${lang}/tours?city=${destId}&duration=1`, `${tr(lang, 'nav_day_trips')} (${dayTripCount})`)] : []),
      link(`${SITE_URL}/${lang}/tours?city=${destId}&style=desert`, tr(lang, 'tours_style_desert')),
      link(`${SITE_URL}/${lang}/tours?city=${destId}&duration=2-3`, tr(lang, 'tours_dur_2_3')),
      link(`${SITE_URL}/${lang}/tours?city=${destId}&duration=4-6`, tr(lang, 'tours_dur_4_6')),
      link(`${SITE_URL}/${lang}/tours/from-${hub.slug}`, tr(lang, 'tours_view_all')),
      link(`${SITE_URL}/${lang}/trip-builder`, tr(lang, 'tf_custom_cta')),
    ];
    return h2(tr(lang, 'hub_private_title').replace('{city}', tr(lang, `hub_${destId}_name`)))
      + paragraph(`${cityTourCount} ${cityTourCount === 1 ? tr(lang, 'tours_tour') : tr(lang, 'tours_tours')}`)
      + rawUl(items);
  })() : '';
  return h1(d.name) + paragraph(d.shortDesc) + paragraph(d.description) + h2(tr(lang, 'dest_about')) + ul(d.highlights)
    + (gallery ? h2(`${d.name} ${tr(lang, 'dest_pictures_title')}`) + gallery : '')
    + catalogBlock
    + foodBlock
    + toursBlock
    + rawParagraph(link(`${SITE_URL}/${lang}/things-to-do-in-morocco`, tr(lang, 'ttd_footer_link')))
    + departurePlanLinks
    + merzougaGuideLinks
    + buildTopicalLinksContent({ destinationId: d.id }, lang);
}
function buildAboutContent(lang: Lang): string {
  // Mirrors the live /about layout (PremiumAboutSection): every string comes
  // from the same abt_* translations the SPA renders, so the crawlable H1 and
  // body match the client content exactly — no separate or invented copy.
  const grewTitles = [1, 2, 3, 4, 5, 6].map((n) => tr(lang, `abt_grown_${n}_t` as any)).filter(Boolean);
  const whyTitles = [1, 2, 3, 4, 5, 6].map((n) => tr(lang, `abt_why_${n}_t` as any)).filter(Boolean);
  const GEO_SLUGS = ['merzouga', 'erg-chebbi', 'dades-valley', 'todra-gorge', 'ait-ben-haddou', 'ouarzazate', 'marrakech', 'fes', 'essaouira', 'agadir', 'chefchaouen'];
  const geoLinks = GEO_SLUGS
    .map((slug) => {
      const d = getLocalizedDestination(slug as any, lang);
      return d ? `      <li>${link(`${SITE_URL}/${lang}/destinations/${slug}`, d.name)}</li>` : '';
    })
    .filter(Boolean)
    .join('\n');
  // Our Private Fleet: official photo library MGA-041…045 (real PDF photographs)
  const fleet = publishablePhotosForContexts(['fleet']);
  const fleetFigs = fleet.map((p) => libraryPhotoFigure(p)).join('\n');
  return h1(tr(lang, 'abt_hero_h1') || tr(lang, 'nav_about'))
    + paragraph(tr(lang, 'abt_hero_sub'))
    + h2(tr(lang, 'abt_story_h2'))
    + paragraph(tr(lang, 'abt_story_p1'))
    + paragraph(tr(lang, 'abt_story_p2'))
    + paragraph(tr(lang, 'abt_story_p3'))
    + h2(tr(lang, 'abt_grown_h2'))
    + ul(grewTitles)
    + h2(tr(lang, 'abt_geo_h2'))
    + paragraph(tr(lang, 'abt_geo_p'))
    + (geoLinks ? `    <ul>\n${geoLinks}\n    </ul>\n` : '')
    + h2(tr(lang, 'abt_fleet_h2'))
    + paragraph(tr(lang, 'abt_fleet_p'))
    + (fleetFigs ? `    <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">\n${fleetFigs}    </div>\n` : '')
    + paragraph(tr(lang, 'abt_fleet_cap'))
    + h2(tr(lang, 'abt_why_h2'))
    + ul(whyTitles)
    + h2(tr(lang, 'abt_promise_h2'))
    + paragraph(tr(lang, 'abt_promise_p'))
    + paragraph(tr(lang, 'abt_promise_line'));
}
function buildContactContent(lang: Lang): string {
  const li = (s: string): string => `      <li>${s}</li>`;
  const contactItems = [
    li(`${escapeHtml(tr(lang, 'contact_whatsapp_label') || 'WhatsApp')}: ${link(contactInfo.whatsapp, `${contactInfo.whatsappNumber} (WhatsApp)`)}`),
    li(`${escapeHtml(tr(lang, 'contact_email_label') || 'Email')}: ${link(`mailto:${contactInfo.email}`, contactInfo.email)}`),
    li(`${escapeHtml(tr(lang, 'contact_address') || 'Address')}: ${escapeHtml(contactInfo.address)}`),
    li(`Google Maps: ${link(CONTACT_MAPS_URL, 'View Morocco Grand Adventure on Google Maps')}`),
  ];
  const socialItems = CONTACT_SOCIAL_LINKS.map((s) => li(link(s.url, s.label))).join('\n');
  return h1(tr(lang, 'nav_contact')) + `    <ul>\n${contactItems.join('\n')}\n    </ul>\n` + h2(tr(lang, 'contact_socials_label') || 'Official Social Profiles') + `    <ul>\n${socialItems}\n    </ul>\n`;
}
/**
 * /book — the booking-request page. The snapshot carries the same promise the
 * form makes (a request now, payment only after the trip is confirmed) so the
 * page reads correctly for crawlers and without JavaScript.
 */
function buildBookContent(lang: Lang): string {
  const c = BOOK_COPY[lang] ?? BOOK_COPY.en;
  return h1(c.title)
    + paragraph(c.subtitle)
    + paragraph(c.promise)
    + h2(c.payLaterTitle)
    + ul(c.trust)
    // The four-step sequence, from the same strings the component renders, so
    // the crawlable /book page states the policy exactly as the page does.
    + bookingStepsBlock(lang)
    + rawParagraph(link(contactInfo.whatsapp, `${c.whatsapp} — ${contactInfo.whatsappNumber}`))
    + rawParagraph(link(`${SITE_URL}/${lang}/tours`, tr(lang, 'nav_tours')))
    + rawParagraph(link(`${SITE_URL}/${lang}/contact`, tr(lang, 'nav_contact')));
}
/**
 * /things-to-do-in-morocco — the editorial list. The snapshot carries every
 * entry (heading, photograph, two sentences, the practical line) and both of
 * its onward links, so the page is complete without JavaScript and the
 * destination tree gains twenty-five contextual links per language.
 */
function buildThingsToDoContent(lang: Lang): string {
  const copy = THINGS_COPY[lang] ?? THINGS_COPY.en;
  const order: GroupKey[] = ['sahara', 'marrakech', 'fes', 'south', 'coast', 'culture'];
  let n = 0;
  let out = h1(copy.heading) + paragraph(copy.intro);
  for (const group of order) {
    const entries = THINGS.filter((thing) => thing.group === group);
    if (entries.length === 0) continue;
    out += h2(copy.groups[group]);
    for (const thing of entries) {
      const item = copy.items[thing.id];
      if (!item) continue;
      n += 1;
      const place = getLocalizedDestination(thing.destination, lang);
      const img = thing.image;
      out += `    <h3>${n}. ${escapeHtml(item.title)}</h3>\n`;
      out += `    <figure>\n      <img src="${img.src}" srcset="${img.srcSet}" sizes="(min-width: 768px) 46vw, 100vw" alt="${escapeHtml(img.alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async" />\n    </figure>\n`;
      out += paragraph(item.body) + paragraph(item.tip);
      const links: string[] = [];
      if (place) links.push(link(`${SITE_URL}/${lang}/destinations/${thing.destination}`, place.name));
      links.push(link(`${SITE_URL}/${lang}${thing.link}`, copy.links[thing.linkKey]));
      out += rawUl(links);
    }
  }
  const keepReading = [
    { rest: '/merzouga-guide', label: 'footer_merzouga_guide' },
    { rest: '/travel-info', label: 'dest_travel_info' },
    { rest: '/blog', label: 'footer_travel_blog' },
    { rest: '/faq', label: 'footer_faq' },
  ].map((r) => link(`${SITE_URL}/${lang}${r.rest}`, tr(lang, r.label)));
  out += rawUl(keepReading);
  out += h2(copy.ctaTitle) + paragraph(copy.ctaText)
    + rawParagraph(link(`${SITE_URL}/${lang}/trip-builder`, copy.ctaButton))
    + rawParagraph(link(`${SITE_URL}/${lang}/tours`, tr(lang, 'nav_tours')));
  return out;
}
function buildFaqContent(lang: Lang): string { return h1(tr(lang, 'nav_faq')) + faqBlock(getLocalizedFaq(lang)); }

const BLOG_SLUG_INDEX: Record<string, number> = {
  'merzouga-luxury-desert-camp-guide': 1,
  'best-time-to-visit-morocco-sahara': 2,
  'camel-trekking-etiquette-morocco': 3,
  'marrakech-to-merzouga-roadtrip': 4,
  'morocco-packing-list-desert': 5,
  'fes-chefchaouen-blue-city-guide': 6,
  'marrakech-to-merzouga-3-day-sahara-tour': 7,
  'fes-to-merzouga-sahara-desert-tour': 8,
  'marrakech-ouarzazate-merzouga-great-south-morocco': 9,
};
function buildBlogContent(lang: Lang): string {
  // Localized titles/excerpts/categories come from the same blog_post_N_* keys the
  // runtime blog page renders (tr() returns the authored overlay when present and
  // falls back to the English authored copy otherwise).
  const blocks = blogPosts.map((post) => {
    const n = BLOG_SLUG_INDEX[post.slug];
    const title = n ? tr(lang, `blog_post_${n}_title`) || post.title : post.title;
    const cat = n ? tr(lang, `blog_post_${n}_cat`) || (post.category ?? '') : (post.category ?? '');
    const date = n ? tr(lang, `blog_post_${n}_date`) || (post.date ?? '') : (post.date ?? '');
    const excerpt = n ? tr(lang, `blog_post_${n}_excerpt`) || post.excerpt : post.excerpt;
    return `<h2>${link(`${SITE_URL}/${lang}/blog/${post.slug}`, title)}</h2>`
      + `<p><strong>${escapeHtml(cat)}</strong> · ${escapeHtml(date)}</p>\n` + paragraph(excerpt);
  }).join('');
  return h1(tr(lang, 'nav_blog')) + blocks;
}

const ARTICLE_RELATIONS: Record<string, { tours: string[]; destinations: string[] }> = {
  'merzouga-luxury-desert-camp-guide': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  'best-time-to-visit-morocco-sahara': { tours: ['3-day-sahara-marrakech', '5-day-imperial-cities'], destinations: ['merzouga', 'erg-chebbi'] },
  'camel-trekking-etiquette-morocco': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi'] },
  'marrakech-to-merzouga-roadtrip': { tours: ['3-day-sahara-marrakech', '8-day-marrakech-essaouira-agadir-sahara'], destinations: ['marrakech', 'ait-ben-haddou', 'dades-valley', 'merzouga'] },
  'morocco-packing-list-desert': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  'fes-chefchaouen-blue-city-guide': { tours: ['5-day-imperial-cities'], destinations: ['fes', 'chefchaouen'] },
  'marrakech-to-merzouga-3-day-sahara-tour': { tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara'], destinations: ['ait-ben-haddou', 'dades-valley', 'todra-gorge', 'merzouga'] },
  'fes-to-merzouga-sahara-desert-tour': { tours: ['3-day-fes-merzouga-sahara', '4-day-fes-marrakech-via-merzouga'], destinations: ['fes', 'ifrane', 'merzouga'] },
  'marrakech-ouarzazate-merzouga-great-south-morocco': { tours: ['5-day-great-south-morocco', '3-day-sahara-marrakech'], destinations: ['ait-ben-haddou', 'draa-valley', 'nkob', 'merzouga'] },
};

function link(url: string, text: string): string { return `<a href="${url}">${escapeHtml(text)}</a>`; }

// Localized labels for the "Experiences" nav/footer items. These routes' English
// route-metadata titles were leaking into the prerendered nav/footer for every
// locale; map each route to its existing localized translation key instead.
const EXPERIENCE_LABEL_KEYS: Record<string, string> = {
  '/desert-tours': 'nav_sahara_desert_tours',
  '/luxury-camp': 'nav_luxury_desert_camp',
  '/camel-trekking': 'nav_camel_trekking',
  '/4x4-tours': 'nav_4x4_desert_tours',
  '/day-trips': 'nav_day_trips',
  '/marrakech-tours': 'hub_marrakech_title',
  '/fes-tours': 'hub_fes_title',
  '/agadir-tours': 'hub_agadir_title',
  '/casablanca-tours': 'hub_casablanca_title',
  '/merzouga-guide': 'footer_merzouga_guide',
  '/gallery': 'nav_gallery',
  '/trip-builder': 'nav_build_journey',
};
function experienceLabel(rest: string, lang: Lang): string {
  const key = EXPERIENCE_LABEL_KEYS[rest];
  if (key) {
    const localized = tr(lang, key);
    if (localized) return localized;
  }
  const title = getRouteMeta(rest).title.replace(/\s*—.*$/, '').trim();
  return title || rest;
}

// ── Crawlable site tree: static nav + footer injected into EVERY prerendered
// page so the Home → Tours → City → Duration → Tour tree (and the rest of the
// site graph) is traversable by crawlers without executing JavaScript. Mirrors
// the runtime Navbar/Footer and is built from the same registries.
function buildNavTreeContent(lang: Lang): string {
  const cityItems = CITY_HUBS.map((hub) => {
    const durationLinks = (CITY_HUB_DURATIONS[hub.id] ?? [])
      .map((days) => `        <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}/${days}-days`, fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) }))}</li>`)
      .join('\n');
    return `      <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}`, tr(lang, `hub_${hub.id}_title`))}\n      <ul>\n${durationLinks}\n      </ul>\n      </li>`;
  }).join('\n');
  const experienceItems = Object.keys(EXPERIENCE_PAGE_ROUTES)
    .map((rest) => `      <li>${link(`${SITE_URL}/${lang}${rest}`, experienceLabel(rest, lang))}</li>`)
    .join('\n');
  return `<nav aria-label="Site tree" class="prerendered-site-tree">\n  <ul>\n    <li>${link(`${SITE_URL}/${lang}`, tr(lang, 'nav_home'))}</li>\n    <li>${link(`${SITE_URL}/${lang}/tours`, tr(lang, 'nav_tours'))}\n    <ul>\n${cityItems}\n    </ul>\n    </li>\n    <li>${link(`${SITE_URL}/${lang}/destinations`, tr(lang, 'nav_destinations') || 'Destinations')}</li>\n    <li>${tr(lang, 'nav_experiences') || 'Experiences'}\n    <ul>\n${experienceItems}\n    </ul>\n    </li>\n    <li>${link(`${SITE_URL}/${lang}/about`, tr(lang, 'nav_about'))}</li>\n    <li>${link(`${SITE_URL}/${lang}/blog`, tr(lang, 'nav_blog'))}</li>\n    <li>${link(`${SITE_URL}/${lang}/faq`, tr(lang, 'nav_faq'))}</li>\n    <li>${link(`${SITE_URL}/${lang}/contact`, tr(lang, 'nav_contact'))}</li>\n  </ul>\n</nav>\n`;
}

function buildFooterContent(lang: Lang, rest: string): string {
  const cityItems = CITY_HUBS.map((hub) => {
    const durationLinks = (CITY_HUB_DURATIONS[hub.id] ?? [])
      .map((days) => `        <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}/${days}-days`, fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) }))}</li>`)
      .join('\n');
    return `      <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}`, tr(lang, `hub_${hub.id}_title`))}\n      <ul>\n${durationLinks}\n      </ul>\n      </li>`;
  }).join('\n');
  const destinationItems = getLocalizedDestinations(lang)
    .map((d) => `      <li>${link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name)}</li>`)
    .join('\n');
  // Plan-your-trip group: the itinerary builder, Things To Do, and contact.
  // (The quote CTA and the itinerary builder both lead to /trip-builder —
  // production permanently redirects /book there, see vercel.json.)
  const planItems = [
    { rest: '/trip-builder', label: tr(lang, 'book_quote_title') },
    { rest: '/things-to-do-in-morocco', label: tr(lang, 'ttd_footer_link') },
    { rest: '/trip-builder', label: tr(lang, 'nav_build_journey') },
    { rest: '/contact', label: tr(lang, 'nav_contact') },
  ].map((x) => `      <li>${link(`${SITE_URL}/${lang}${x.rest}`, x.label)}</li>`).join(NL);
  const experienceItems = Object.keys(EXPERIENCE_PAGE_ROUTES)
    .map((rest) => `      <li>${link(`${SITE_URL}/${lang}${rest}`, experienceLabel(rest, lang))}</li>`)
    .join('\n');
  return `<footer class="prerendered-site-footer">\n  <div>\n  <h2>${escapeHtml(tr(lang, 'nav_tours'))}</h2>\n  <ul>\n${cityItems}\n  </ul>\n  </div>\n  <div>\n  <h2>${escapeHtml(tr(lang, 'nav_destinations') || 'Destinations')}</h2>\n  <ul>\n${destinationItems}\n  </ul>\n  </div>\n  <div>\n  <h2>${escapeHtml(tr(lang, 'nav_experiences') || 'Experiences')}</h2>\n  <ul>\n${experienceItems}\n  </ul>\n  </div>\n  <div>\n  <h2>${escapeHtml(tr(lang, 'footer_plan_title'))}</h2>\n  <ul>\n${planItems}\n  </ul>\n  </div>\n${buildLanguageNav(rest)}</footer>\n`;
}

// Crawlable language-version links for the current page. The hrefs are exactly
// the same URLs emitted as hreflang alternates, so crawlers get internal links
// that agree with the canonical/hreflang graph instead of JS-only switching.
function buildLanguageNav(rest: string): string {
  const clean = rest === '/' ? '' : rest;
  const items = languages
    .map((l) => `    <li>${link(`${SITE_URL}/${l.code}${clean}`, l.nativeLabel)}</li>`)
    .join('\n');
  return `<nav aria-label="Language versions" class="prerendered-lang-nav">\n  <h2>Language versions</h2>\n  <ul>\n${items}\n  </ul>\n</nav>\n`;
}
function blogPostField(slug: string, field: 'title'|'excerpt'|'cat'|'date'|'read', lang: Lang, fallback: string): string {
  const n = BLOG_SLUG_INDEX[slug];
  if (!n) return fallback;
  return tr(lang, `blog_post_${n}_${field}`) || fallback;
}
function buildBlogToursBlock(slug: string, lang: Lang): string {
  const ids = ARTICLE_RELATIONS[slug]?.tours ?? [];
  const items = ids.map((id) => { const t = getLocalizedTour(id, lang); return t ? `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name)} — ${escapeHtml(t.duration)}</li>` : ''; }).filter(Boolean);
  if (items.length === 0) return '';
  return h2(tr(lang, 'related_tours')) + `<ul>\n${items.join('\n')}\n    </ul>\n`;
}
function buildBlogDestinationsBlock(slug: string, lang: Lang): string {
  const ids = ARTICLE_RELATIONS[slug]?.destinations ?? [];
  const items = ids.map((id) => { const d = getLocalizedDestination(id, lang); return d ? `      <li>${link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name)} — ${escapeHtml(d.shortDesc)}</li>` : ''; }).filter(Boolean);
  if (items.length === 0) return '';
  return h2(tr(lang, 'related_destinations')) + `<ul>\n${items.join('\n')}\n    </ul>\n`;
}
function buildBlogRelatedArticles(slug: string, lang: Lang): string {
  // Same category-first selection as the runtime page (src/pages/blog/[slug].tsx),
  // via the shared getRelatedBlogPosts — keeps prerendered and hydrated output aligned.
  const others = getRelatedBlogPosts(slug, lang);
  const items = others.map((p) => `      <li>${link(`${SITE_URL}/${lang}/blog/${p.slug}`, blogPostField(p.slug, 'title', lang, p.title))}</li>`).join('\n');
  return h2(tr(lang, 'related_articles')) + `<ul>\n${items}\n    </ul>\n`;
}
function buildBlogArticleContent(slug: string, lang: Lang): string {
  const posts: Record<string, { title: string; excerpt: string; date: string; read: string; cat: string; image: string }> = {
    'merzouga-luxury-desert-camp-guide': { title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga', excerpt: "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.", date: 'August 2026', read: '8 min read', cat: 'Sahara Desert', image: '/images/personal/luxury-camp-dusk.webp' },
    'best-time-to-visit-morocco-sahara': { title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide', excerpt: "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.", date: 'July 2026', read: '6 min read', cat: 'Travel Planning', image: '/images/dest/merzouga.webp' },
    'camel-trekking-etiquette-morocco': { title: 'Camel Trekking in Morocco: What to Expect and How to Prepare', excerpt: "Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.", date: 'June 2026', read: '7 min read', cat: 'Camel Trekking', image: '/images/personal/dunes-camels-poster.webp' },
    'marrakech-to-merzouga-roadtrip': { title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary', excerpt: "Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.", date: 'May 2026', read: '10 min read', cat: 'Road Trips', image: '/images/dest/ait-ben-haddou.webp' },
    'morocco-packing-list-desert': { title: 'The Perfect Morocco Packing List for Desert Tours (2026)', excerpt: "What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.", date: 'April 2026', read: '5 min read', cat: 'Packing', image: '/images/personal/guests-sunset-trimmed.webp' },
    'fes-chefchaouen-blue-city-guide': { title: "Fes to Chefchaouen: Exploring Morocco's Blue Pearl", excerpt: "The journey from Morocco's cultural heart to the Instagram-famous blue medina — what to see, where to stay, and how to make the most of it.", date: 'March 2026', read: '9 min read', cat: 'Imperial Cities', image: '/images/dest/chefchaouen.webp' },
    'marrakech-to-merzouga-3-day-sahara-tour': { title: 'Marrakech to Merzouga: What the 3-Day Sahara Tour Is Actually Like', excerpt: "The High Atlas, Aït Ben Haddou, the Dades and Todra valleys, then a night in the Erg Chebbi dunes — what three days on Morocco's classic Sahara route really involves, and who it suits.", date: 'September 2026', read: '5 min read', cat: 'Sahara Desert', image: '/images/curated/ait-ben-haddou-footbridge-ounila-river.webp' },
    'fes-to-merzouga-sahara-desert-tour': { title: 'Fes to Merzouga: The Sahara Tour Through the Middle Atlas', excerpt: "Cedar forests, Ifrane's alpine streets and the Ziz Valley — how the Fes to Merzouga route offers a shorter, different way into the Sahara than the classic Marrakech crossing.", date: 'September 2026', read: '4 min read', cat: 'Sahara Desert', image: '/images/dest/fes.webp' },
    'marrakech-ouarzazate-merzouga-great-south-morocco': { title: 'Marrakech to Ouarzazate and Merzouga: Exploring the Great South', excerpt: "Ouarzazate, the Dades and Todra valleys, a slower Sahara day at Merzouga, then a quiet return through the Draa Valley and Nkob — the fuller version of Morocco's Sahara route.", date: 'September 2026', read: '4 min read', cat: 'Sahara Desert', image: '/images/dest/ouarzazate.webp' },
    'morocco-first-time-visitor-mistakes': { title: '10 Mistakes First-Time Visitors Make in Morocco (and How to Avoid Them)', excerpt: 'From taxi fares to souk bargaining and medina directions — the small, practical mistakes that catch first-time visitors off guard in Morocco, and how to avoid every one of them.', date: 'October 2026', read: '7 min read', cat: 'Travel Planning', image: '/images/personal/marrakech-souk-minaret.webp' },
  };
  const post = posts[slug];
  if (!post) return h1('Blog Post Not Found') + paragraph('This blog post could not be found.');
  const metaPost = blogPosts.find((p) => p.slug === slug);
  const imgAlt = metaPost?.alt ?? post.title;
  const title = blogPostField(slug, 'title', lang, post.title);
  const cat = blogPostField(slug, 'cat', lang, post.cat);
  const date = blogPostField(slug, 'date', lang, post.date);
  const read = blogPostField(slug, 'read', lang, post.read);
  const excerpt = blogPostField(slug, 'excerpt', lang, post.excerpt);
  return h1(title) + `<p><strong>${escapeHtml(cat)}</strong> · ${escapeHtml(date)} · ${escapeHtml(read)}</p>\n` + `<img src="${post.image}" alt="${escapeHtml(imgAlt)}" loading="lazy" decoding="async" class="w-full h-48 md:h-64 object-cover mb-8 rounded-md" />\n` + paragraph(excerpt) + buildBlogArticleBody(slug, lang) + buildBlogToursBlock(slug, lang) + buildBlogDestinationsBlock(slug, lang) + buildBlogRelatedArticles(slug, lang);
}

/**
 * Authored long-form body for priority guides (shared with the runtime blog
 * page via src/data/blog-article-sections.ts). Articles without authored
 * sections keep their existing excerpt-only layout. The closing CTA paragraph
 * links to the matching experience pages and tour — all real site routes.
 */
/** Render a paragraph that may contain a `[label](/path)` inline link (see
 *  BlogSection.paragraphs) as safe, already-escaped HTML — the same syntax
 *  and the same parser the runtime page uses, so prerendered and hydrated
 *  output match exactly. */
function paragraphHtml(text: string, lang: Lang): string {
  const html = parseParagraph(text)
    .map((part) => (part.type === 'link' ? link(`${SITE_URL}/${lang}${part.href}`, part.label) : escapeHtml(part.value)))
    .join('');
  return rawParagraph(html);
}
function buildBlogArticleBody(slug: string, lang: Lang): string {
  if (!BLOG_ARTICLE_SECTIONS[slug]) return '';
  const sections = getLocalizedBlogSections(slug, lang);
  const sectionImage = (s: BlogSection) => s.image
    ? `<img src="${s.image.src}" alt="${escapeHtml(s.image.alt)}" loading="lazy" decoding="async" class="w-full h-48 md:h-64 object-cover mb-4 rounded-md" />\n`
    : '';
  const body = sections.map((s) => h2(s.heading) + sectionImage(s) + s.paragraphs.map((p) => paragraphHtml(p, lang)).join('')).join('');
  const cta = getLocalizedBlogCta(slug, lang);
  const ctaBlock = cta
    ? paragraph(cta.text) + `<div class="topical-link-list">${cta.links.map((l) => ` ${link(`${SITE_URL}/${lang}${l.to}`, l.label)}`).join('')}</div>\n`
    : '';
  return body + ctaBlock;
}

const EXPERIENCE_PAGE_ROUTES: Record<string, { tours: string[]; destinations: string[] }> = {
  // Student Tours — a standalone university-travel experience, not a 25th tour.
  '/student-tours/university-groups': { tours: [], destinations: [] },
  // Journey cards now point at the dedicated Student Tour products, so the hub
  // no longer injects private-tour blocks. Destinations stay: they are
  // contextual place links, not competing tour products.
  '/student-tours': { tours: [], destinations: ['marrakech', 'ait-ben-haddou', 'merzouga', 'erg-chebbi', 'fes'] },
  '/desert-tours': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  '/luxury-camp': { tours: ['7-day-imperial-cities-sahara-escape', 'honeymoon-morocco'], destinations: ['merzouga', 'erg-chebbi'] },
  '/camel-trekking': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi'] },
  '/4x4-tours': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi', 'ouarzazate', 'dades-valley'] },
  '/marrakech-tours': { tours: ['3-day-sahara-marrakech', '8-day-marrakech-essaouira-agadir-sahara'], destinations: ['marrakech', 'essaouira', 'ait-ben-haddou', 'ouzoud'] },
  '/fes-tours': { tours: ['5-day-imperial-cities', '7-day-imperial-cities-sahara-escape'], destinations: ['fes', 'meknes', 'chefchaouen', 'merzouga'] },
  '/agadir-tours': { tours: ['3-day-sahara-marrakech'], destinations: ['agadir', 'taghazout', 'essaouira', 'ait-ben-haddou', 'merzouga'] },
  '/casablanca-tours': { tours: ['3-day-sahara-marrakech'], destinations: ['casablanca', 'marrakech', 'rabat', 'fes', 'merzouga'] },
  '/day-trips': { tours: [], destinations: ['marrakech', 'essaouira', 'ouzoud', 'ourika-valley', 'imlil'] },
  '/merzouga-guide': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi', 'zagora', 'todra-gorge'] },
  '/gallery': { tours: [], destinations: ['marrakech', 'chefchaouen', 'merzouga', 'fes'] },
  '/trip-builder': { tours: ['3-day-sahara-marrakech', '5-day-imperial-cities', '7-day-imperial-cities-sahara-escape', 'family-morocco-adventure', 'honeymoon-morocco'], destinations: ['marrakech', 'fes', 'merzouga', 'erg-chebbi', 'ait-ben-haddou'] },
  '/trip-finder': { tours: ['marrakech-imlil-day-trip', '3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape', '14-day-grand-morocco-journey'], destinations: ['marrakech', 'fes', 'agadir', 'merzouga'] },
};
// Register the dedicated Student Tour product routes from the actual Student
// Tours data, rather than a separately-maintained literal list — adding a new
// Student Tour (src/data/student-tours.ts) is then enough on its own to make
// this loop discover and prerender its page. Empty tours/destinations keeps
// the generic experience-hub builder from injecting private-tour blocks —
// these pages emit their own itinerary content (see studentTourDetail below).
for (const slug of studentTourList.map((s) => s.slug)) {
  EXPERIENCE_PAGE_ROUTES[`/student-tours/${slug}`] = { tours: [], destinations: [] };
}
function buildExperienceContent(rest: string, lang: Lang): string {
  // Reuse the single localized-metadata mechanism (same source as <LocalizedHead>
  // and metaFor above) so the crawlable H1/intro match the localized <title>
  // instead of leaking the English route title on non-English hubs. Falls back
  // to the canonical English meta when no authored translation exists — copy is
  // never invented.
  const meta = getLocalizedRouteMeta(rest, lang);
  const cfg = EXPERIENCE_PAGE_ROUTES[rest] ?? { tours: [], destinations: [] };
  // Student Tours authors a real editorial H1; every other experience hub
  // derives its H1 from the localized meta title. Keeping the static H1 equal to
  // the hydrated one avoids an SPA/prerender heading mismatch.
  const rawStProduct = getStudentTour(rest.replace('/student-tours/', ''));
  const stProduct = rawStProduct ? getLocalizedStudentTour(rawStProduct, lang) : rawStProduct;
  // The Merzouga guide hub emits its own full editorial body (H1 included).
  const isMerzougaHub = rest === '/merzouga-guide';
  const heading = isMerzougaHub
    ? buildMerzougaHubHtml(lang)
    : rest === '/student-tours'
    ? h1(tr(lang, 'st_h1'))
    : rest === '/student-tours/university-groups'
    ? h1(tr(lang, 'ug_h1'))
    : stProduct
    ? h1(stProduct.title)
    : h1(meta.title.replace(/\s*—.*$/, '').trim() || meta.title);
  const intro = isMerzougaHub ? '' : paragraph(meta.description);
  // The hub lists its tours itself, under its own heading.
  const tBlocks = isMerzougaHub ? '' : cfg.tours.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => h2Link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name) + paragraph(t.description ?? '') + paragraph(`${tr(lang, 'search_duration')}: ${t.duration}`) + ul(t.highlights)).join('');
  const dBlocks = cfg.destinations.map((id) => getLocalizedDestination(id, lang)).filter((d): d is NonNullable<typeof d> => Boolean(d)).map((d) => h2Link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name) + paragraph(d.shortDesc)).join('');
  // Curated Sahara imagery for the desert-tours hub (Image-SEO pack).
  const desertMoments = rest === '/desert-tours' ? `\n    <h2>${escapeHtml(tr(lang, 'dt2_moments_title'))}</h2>\n    <p>${escapeHtml(tr(lang, 'dt2_moments_sub'))}</p>\n    <div class="grid gap-6 md:grid-cols-3">\n${[
    ['/images/library/srcset/erg-chebbi-dune-sea-morocco-mga-028-768w.webp', 'Tourist in a colourful Moroccan djellaba facing the Erg Chebbi dune sea near Merzouga', tr(lang, 'dt2_moments_cap1'), 768, 520],
    ['/images/library/srcset/erg-chebbi-camel-trekking-sunset-morocco-mga-001-768w.webp', 'Berber guide leading a camel caravan across Erg Chebbi at dusk', tr(lang, 'dt2_moments_cap2'), 768, 512],
    ['/images/library/srcset/couple-sunset-erg-chebbi-morocco-mga-031-768w.webp', 'Silhouette of a couple watching sunset from an Erg Chebbi dune', tr(lang, 'dt2_moments_cap3'), 768, 512],
  ].map(([s, a, c, w, h]) => `      ${figureImg(s as string, a as string, c as string, { width: w as number, height: h as number })}`).join('\n')}\n    </div>\n` : '';
  // Mirrors the live-page FAQ accordion added to src/pages/desert-tours.tsx
  // (dt2_faq_q1..4/a1..4) — same heading key (td_faq_title) and convention
  // already used for the Merzouga guide / student-tours FAQs elsewhere here.
  const desertFaq = rest === '/desert-tours'
    ? `\n    <h2>${escapeHtml(tr(lang, 'td_faq_title'))}</h2>\n` + [1, 2, 3, 4].map((n) => `    <h3>${escapeHtml(tr(lang, `dt2_faq_q${n}`))}</h3><p>${escapeHtml(tr(lang, `dt2_faq_a${n}`))}</p>`).join('\n')
    : '';
  // Official photo library: render the ACTUAL PDF-derived photographs on the gallery page
  const galleryLibPhotos = rest === '/gallery' ? publishableLibraryPhotos().map((p) => libraryPhotoFigure(p)).join('\n') : '';
  // Day Trips: the real, bookable day-trip products, rendered first and
  // clearly separate from the "more ideas" section below — mirrors
  // <RealDayTripProducts> in src/pages/day-trips.tsx exactly (same 4 ids,
  // same fields) so the crawlable HTML matches what a browser visitor sees.
  const dayTripProducts = rest === '/day-trips' ? `
    <h2>${escapeHtml(tr(lang, 'dt_products_title'))}</h2>
    <p>${escapeHtml(tr(lang, 'dt_products_sub'))}</p>
    ${DAY_TRIP_PRODUCT_IDS.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => h2Link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name) + paragraph(`${tr(lang, 'search_duration')}: ${t.duration}`)).join('')}` : '';
  // Trip Builder: render a descriptive heading + WhatsApp CTA so the prerendered
  // page is crawlable and functional (the SPA hydrates the interactive form).
  const tripBuilderCta = rest === '/trip-builder' ? `
    <h2>${escapeHtml(tr(lang, 'nav_build_journey'))}</h2>
    <p>${escapeHtml(tr(lang, 'tb_sub'))}</p>
    <p>${escapeHtml(tr(lang, 'tb_quote_note'))}</p>
    <p><a href="${contactInfo.whatsapp}?text=${encodeURIComponent(tr(lang, 'tb_sub'))}">${escapeHtml(tr(lang, 'nav_book_whatsapp'))}</a></p>` : '';
  // Contextual Student Tours backlink on the five most relevant hubs, so the
  // hub is not an orphan in the internal-link graph.
  const ST_BACKLINK_ROUTES = ['/desert-tours', '/merzouga-guide', '/marrakech-tours', '/fes-tours', '/destinations'];
  const studentBacklink = ST_BACKLINK_ROUTES.includes(rest)
    ? `\n    <p>${escapeHtml(tr(lang, 'st_backlink'))} ${link(`${SITE_URL}/${lang}/student-tours`, tr(lang, 'st_tours_label'))}</p>\n`
    : '';
  // Student Tours: emit the positioning that matters for crawlers and for a
  // coordinator landing from search — group size, single-coordinator booking,
  // large-group caveat, learning themes and the FAQ. en+pt are authored; the
  // other locales resolve these keys to English by design.
  // University Groups child page — coordinator/logistics intent. Distinct from
  // the hub: group-size bands, what size affects, process and a dedicated FAQ.
  const ugPage = rest === '/student-tours/university-groups' ? `
    <p>${escapeHtml(tr(lang, 'ug_sub'))}</p>
    <p>${escapeHtml(tr(lang, 'ug_intro'))}</p>
    <h2>${escapeHtml(tr(lang, 'ug_sizes_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'ug_sizes_intro'))}</p>
    ${ul([1, 2, 3, 4, 5].map((n) => `${tr(lang, `ug_s${n}_t`)} — ${tr(lang, `ug_s${n}_d`)}`))}
    <h2>${escapeHtml(tr(lang, 'ug_factors_h2'))}</h2>
    ${ul([1, 2, 3, 4, 5, 6].map((n) => `${tr(lang, `ug_f${n}_t`)} — ${tr(lang, `ug_f${n}_d`)}`))}
    <h2>${escapeHtml(tr(lang, 'ug_coord_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'ug_coord_p'))}</p>
    <h2>${escapeHtml(tr(lang, 'ug_process_h2'))}</h2>
    ${ul([1, 2, 3, 4, 5, 6, 7].map((n) => `${tr(lang, `ug_p${n}_t`)} — ${tr(lang, `ug_p${n}_d`)}`))}
    <h2>${escapeHtml(tr(lang, 'ug_faq_h2'))}</h2>
    ${[1, 2, 3, 4, 5, 6, 7].map((n) => `<h3>${escapeHtml(tr(lang, `ug_q${n}`))}</h3><p>${escapeHtml(tr(lang, `ug_a${n}`))}</p>`).join('\n    ')}
    <h2>${escapeHtml(tr(lang, 'ug_cta_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'ug_cta_p'))}</p>
    <p>${link(`${SITE_URL}/${lang}/student-tours`, tr(lang, 'ug_back'))}</p>` : '';
  // Journey Ideas bridge to the EXISTING canonical tours (no new products).
  // Journey cards link to the dedicated Student Tour products, not the private
  // /tours/* catalogue — same behaviour as the hydrated hub.
  const JOURNEY_TOURS = studentTourList.map((s) => s.slug);
  const studentTours = rest === '/student-tours' ? `
    <p>${escapeHtml(tr(lang, 'st_groupsize'))}</p>
    <p>${escapeHtml(tr(lang, 'st_groupsize_large'))}</p>
    <p>${escapeHtml(tr(lang, 'st_coordinator'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_02_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_02_p1'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_03_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_03_line'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_04_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_04_intro'))}</p>
    ${ul([1, 2, 3, 4, 5, 6, 7, 8].map((n) => `${tr(lang, `st_04_s${n}_label`)} — ${tr(lang, `st_04_s${n}_body`)}`))}
    <p>${escapeHtml(tr(lang, 'st_04_places_p'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_05_h2'))}</h2>
    ${ul([1, 2, 3, 4, 5, 6, 7].map((n) => `${tr(lang, `st_05_n${n}`)} — ${tr(lang, `st_05_t${n}`)}: ${tr(lang, `st_05_x${n}`)}`))}
    <p>${escapeHtml(tr(lang, 'st_05_caption'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_wt_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_wt_intro'))}</p>
    ${ul([1, 2, 3, 4, 5, 6].map((n) => `${tr(lang, `st_wt_${n}_place`)} (${tr(lang, `st_wt_${n}_subject`)}) — ${tr(lang, `st_wt_${n}_exp`)} ${tr(lang, `st_wt_${n}_mean`)}`))}
    <p>${link(`${SITE_URL}/${lang}/student-tours/university-groups`, tr(lang, 'ug_h1'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_07_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_07_body'))}</p>
    ${ul([1, 2, 3, 4, 5, 6].map((n) => tr(lang, `st_07_th${n}`)))}
    <h2>${escapeHtml(tr(lang, 'st_09_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_09_body'))}</p>
    ${ul([1, 2, 3, 4, 5, 6, 7, 8].map((n) => tr(lang, `st_09_e${n}`)))}
    <p>${escapeHtml(tr(lang, 'st_09_note'))}</p>
    <p>${escapeHtml(tr(lang, 'st_09_groups_p'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_11_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_11_intro'))}</p>
    ${JOURNEY_INDEXES.map((n) => `<h3>${escapeHtml(`${tr(lang, `st_11_r${n}_days`)} ${tr(lang, `st_11_r${n}_unit`)} — ${tr(lang, `st_11_r${n}_title`)}`)}</h3><p>${escapeHtml(tr(lang, `st_11_r${n}_route`))} (${escapeHtml(tr(lang, `st_11_r${n}_themes`))})</p><p>${escapeHtml(tr(lang, `st_11_r${n}_desc`))}</p><p>${escapeHtml(tr(lang, 'st_11_note'))}</p><p>${link(`${SITE_URL}/${lang}/student-tours/${JOURNEY_TOURS[n - 1]}`, `${tr(lang, 'st_11_cta')}: ${tr(lang, `st_11_r${n}_title`)}`)}</p>`).join('\n    ')}
    <p>${escapeHtml(tr(lang, 'st_11_band_items'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_13_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_13_line'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_14_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_14_honesty'))}</p>
    <h2>${escapeHtml(tr(lang, 'st_15_faq_h2'))}</h2>
    ${Array.from({ length: 16 }, (_, i) => `<h3>${escapeHtml(tr(lang, `st_15_q${i + 1}`))}</h3><p>${escapeHtml(tr(lang, `st_15_a${i + 1}`))}</p>`).join('\n    ')}
    <h2>${escapeHtml(tr(lang, 'st_16_h2'))}</h2>
    <p>${escapeHtml(tr(lang, 'st_16_body'))}</p>
    <p><a href="${contactInfo.whatsapp}?text=${encodeURIComponent(tr(lang, 'st_16_cta'))}">${escapeHtml(tr(lang, 'st_16_cta'))}</a></p>` : '';

  // Dedicated Student Tour product pages: the full itinerary is emitted as
  // crawlable HTML so the route carries real content without JavaScript.
  // `stProduct` above is already run through getLocalizedStudentTour(), so this
  // body reflects whichever locales have an authored overlay in
  // src/i18n/content/generated/{lang}.json and falls back to English per-field
  // for any locale (or any field) that doesn't have one yet.
  // Emits one authentic Student Tours photograph into the crawlable HTML.
  //
  // This MIRRORS src/pages/student-tour-detail.tsx <Photo> exactly — same
  // srcset candidates, same `sizes`, same intrinsic width/height, same
  // loading/decoding — so the browser resolves to the identical file and the
  // React render reuses the cached response instead of downloading a second
  // copy. `#root` is rendered with createRoot (not hydrateRoot), so React
  // replaces this markup wholesale and no hydration mismatch is possible.
  //
  // Only the hero is eager: discovering it in raw HTML lets the preload scanner
  // start it before the JS bundle parses. Every other photograph stays lazy, so
  // below-the-fold imagery is not pulled into the critical path.
  const stFigure = (img: { name: string; alt: string; w: number; h: number; widths: number[]; jpg?: boolean; position?: string }, sizes: string, eager = false): string => {
    const fallback = `/images/${img.name}.${img.jpg ? 'jpg' : 'webp'}`;
    const srcset = img.widths.map((w) => `/images/${img.name}-${w}w.webp ${w}w`).join(', ');
    return `<img src="${fallback}" srcset="${srcset}" sizes="${sizes}" alt="${escapeHtml(img.alt)}"`
      + ` width="${img.w}" height="${img.h}" loading="${eager ? 'eager' : 'lazy'}"`
      + ` decoding="${eager ? 'sync' : 'async'}"${eager ? ' fetchpriority="high"' : ''} />`;
  };

  // Keep the initial HTML light: the hero plus the FIRST photograph of the first
  // three illustrated days. Pairs, the group photo and the day-in-the-journey
  // photo are hydrated-only and lazy, so the prerendered image count stays at 4.
  const stPrerenderDays = new Set(
    (stProduct?.itinerary ?? []).filter((d) => d.images?.length).slice(0, 3).map((d) => d.day),
  );
  const studentTourDetail = stProduct ? `
    ${stFigure(stProduct.hero, studentTourSizes.hero, true)}
    <p>${escapeHtml(stProduct.heroLead)}</p>
    <h2>${escapeHtml(tr(lang, 'td_overview'))}</h2>
    ${ul([
      `${tr(lang, 'st_sd_duration')}: ${stProduct.duration}`,
      `${tr(lang, 'st_sd_starts')}: ${stProduct.overview.start}`,
      `${tr(lang, 'st_sd_ends')}: ${stProduct.overview.end}`,
      `${tr(lang, 'st_sd_regions')}: ${stProduct.overview.regions}`,
      `${tr(lang, 'st_sd_style')}: ${stProduct.overview.style}`,
      `${tr(lang, 'st_sd_fact_groups')}: ${stProduct.overview.groups}`,
    ])}
    <h2>${escapeHtml(tr(lang, 'st_sd_why_h2'))}</h2>
    ${stProduct.whyStudents.map((p) => paragraph(p)).join('')}
    <h2>${escapeHtml(tr(lang, 'st_sd_itinerary_eyebrow'))}</h2>
    ${stProduct.itinerary.map((d) => `${d.chapter ? `<h3>${escapeHtml(d.chapter)}</h3>` : ''}<h3>${escapeHtml(`${fmt(tr(lang, 'st_sd_day_n'), { n: d.day.replace(/\D/g, '') })} — ${d.title}`)}</h3>${d.body.map((p) => paragraph(p)).join('')}${stPrerenderDays.has(d.day) && d.images?.[0] ? stFigure(d.images[0], studentTourSizes.day(d.images)) : ''}${d.notes && d.notes.length ? ul(d.notes) : ''}`).join('\n    ')}
    <h2>${escapeHtml(tr(lang, 'st_sd_experience_h2'))}</h2>
    ${ul(stProduct.experiences.map((e) => `${e.title} — ${e.body}`))}
    <h2>${escapeHtml(tr(lang, 'st_sd_learning_h2'))}</h2>
    ${ul(stProduct.learning.map((l) => `${l.subject} — ${l.body}`))}
    <h2>${escapeHtml(tr(lang, 'st_sd_included_h3'))}</h2>
    ${ul(stProduct.included)}
    <h2>${escapeHtml(tr(lang, 'st_sd_notincluded_h3'))}</h2>
    ${ul(stProduct.notIncluded)}
    <h2>${escapeHtml(tr(lang, 'st_sd_practical_h2'))}</h2>
    ${stProduct.practical.map((p) => `<h3>${escapeHtml(p.title)}</h3>${paragraph(p.body)}`).join('\n    ')}
    <h2>${escapeHtml(tr(lang, 'st_sd_support_h2'))}</h2>
    ${ul(stProduct.support)}
    <h2>${escapeHtml(tr(lang, 'st_sd_faq_h2'))}</h2>
    ${stProduct.faqs.map((f) => `<h3>${escapeHtml(f.q)}</h3>${paragraph(f.a)}`).join('\n    ')}
    ${(() => {
      // Mirrors the client's "Upcoming Group Departures" section — real
      // scheduled departures only, or the same honest empty state when none
      // exist yet (see src/data/student-group-departures.ts).
      const deps = departuresForTour(stProduct.slug);
      const heading = h2(tr(lang, 'sgd_heading') || 'Upcoming Group Departures') + paragraph(tr(lang, 'sgd_intro') || '');
      if (deps.length === 0) {
        return heading + paragraph(tr(lang, 'sgd_empty_title') || '') + paragraph(tr(lang, 'sgd_empty_cta') || '');
      }
      return heading + deps.map((d) => {
        const full = isFull(d);
        const status = full ? (tr(lang, 'sgd_full') || 'Fully booked') : (tr(lang, 'sgd_seats_available') || '{n} seats available').replace('{n}', String(seatsAvailable(d)));
        return paragraph(`${escapeHtml(d.startDate)} – ${escapeHtml(d.endDate)} · ${escapeHtml(d.departureCity)} · ${escapeHtml(status)}`);
      }).join('');
    })()}
    <p>${link(`${SITE_URL}/${lang}/student-tours`, tr(lang, 'st_tours_label'))}</p>
    ${studentTourList.filter((s) => s.slug !== stProduct.slug).map((s) => `<p>${link(`${SITE_URL}/${lang}/student-tours/${s.slug}`, getLocalizedStudentTour(s, lang).title)}</p>`).join('\n    ')}
    ${stProduct.related.map((r) => `<p>${link(`${SITE_URL}/${lang}${r.to}`, r.label)}</p>`).join('\n    ')}` : '';

  return heading + intro + dayTripProducts + studentTours + studentTourDetail + ugPage + studentBacklink + desertMoments + galleryLibPhotos + tBlocks + dBlocks + tripBuilderCta + desertFaq;
}

// ── Data-driven hub / comparison pages (Merzouga guide + comparisons) ───────────
// Single source of truth: src/data/seoHub.ts is consumed by BOTH the runtime SPA
// and this prerenderer, so the static HTML matches what users see exactly.
function hubPathFor(page: HubPage): string {
  if (page.kind === 'merzouga') return `/merzouga-guide/${page.slug}`;
  if (page.kind === 'comparison') return `/comparisons/${page.slug}`;
  return `/travel-info/${page.slug}`;
}

function allHubsTitle(slug: string): string {
  return [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO].find((q) => q.slug === slug)?.title ?? slug;
}

function imageAltFor(slug: string, imageId: string, lang: Lang, fallback: string): string {
  return guideImageAlt(lang, slug, imageId, fallback);
}

function buildHubPageContent(page: HubPage, lang: Lang): string {
  const localized = page.kind === 'merzouga' ? (getLocalizedGuide(page.slug, lang) ?? page) : page;
  // Comparison pages: authored localized H1 (title) per locale; body copy stays
  // canonical English. Mirrors the runtime SeoHubPage behavior.
  const compMeta = page.kind === 'comparison' ? localizedComparisonMeta(page.slug, lang) : undefined;
  const linkTitle = (s: string) =>
    page.kind === 'merzouga' ? (getLocalizedGuide(s, lang)?.title ?? allHubsTitle(s)) : allHubsTitle(s);
  let out = h1(compMeta?.title ?? localized.title) + paragraph(localized.intro);
  const figureAfter = new Map<number, string>();
  (localized.inlineImages ?? []).forEach((ii) => figureAfter.set(ii.after, ii.imageId));
  for (let i = 0; i < localized.sections.length; i++) {
    const sec = localized.sections[i];
    out += h2(sec.heading);
    for (const p of sec.paragraphs) out += paragraph(p);
    if (sec.bullets && sec.bullets.length) out += ul(sec.bullets);
    const imgId = figureAfter.get(i);
    if (imgId) {
      const img = catalogImage(imgId);
      if (img) {
        out += `    <figure>\n      <img src="${img.src}" srcset="${img.src.replace('.webp', '-480w.webp')} 480w, ${img.src.replace('.webp', '-768w.webp')} 768w, ${img.src} ${img.width}w" sizes="(max-width: 768px) 100vw, 768px" alt="${escapeHtml(imageAltFor(page.slug, imgId, lang, img.alt))}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async">\n      <figcaption>${escapeHtml(img.caption)}</figcaption>\n    </figure>\n`;
      }
    }
  }
  if (page.comparisonRows && page.comparisonRows.length) {
    out += h2(tr(lang, 'seohub_at_a_glance'));
    let table = `    <table class="comparison-table">\n      <thead><tr><th>${escapeHtml(tr(lang, 'seohub_feature'))}</th><th>${escapeHtml(tr(lang, 'seohub_option_a'))}</th><th>${escapeHtml(tr(lang, 'seohub_option_b'))}</th></tr></thead>\n      <tbody>\n`;
    for (const [label, a, b] of page.comparisonRows) {
      table += `        <tr><td>${escapeHtml(label)}</td><td>${escapeHtml(a)}</td><td>${escapeHtml(b)}</td></tr>\n`;
    }
    table += '      </tbody>\n    </table>\n';
    out += `    <div class="table-wrap">\n${table}    </div>\n`;
  }
  const relatedTours = localized.tours.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => h2Link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name) + paragraph(t.description ?? '')).join('');
  if (relatedTours) out += h2(tr(lang, 'related_tours')) + relatedTours;
  const relatedDests = localized.destinations.map((id) => getLocalizedDestination(id, lang)).filter((d): d is NonNullable<typeof d> => Boolean(d)).map((d) => h2Link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name) + paragraph(d.shortDesc)).join('');
  if (relatedDests) out += h2(tr(lang, 'related_destinations')) + relatedDests;
    const allHubs = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO];
  const relatedGuideItems = localized.relatedGuides.map((s) => {
    const p = allHubs.find((q) => q.slug === s);
    return p ? link(`${SITE_URL}/${lang}${hubPathFor(p)}`, linkTitle(s)) : '';
  });
  if (relatedGuideItems.length) out += h2(tr(lang, 'guide_keep_planning')) + rawUl(relatedGuideItems);
  const faqs = faqBlock(localized.faqs);
  if (faqs) out += h2(tr(lang, 'guide_faq_heading')) + faqs;
  const pageSources = (localized.sources ?? []).map((sid) => SOURCES[sid]).filter(Boolean);
  if (pageSources.length) {
    out += h2(tr(lang, 'guide_sources_heading'));
    // Named, not linked: the source stays visible so the claim is checkable,
    // but the page does not emit an outbound link to an external tourism site.
    // (This also removes the escaped-anchor artefact these lines produced —
    // ul() escapes its input, so the old markup rendered as literal text.)
    out += ul(pageSources.map((s) => `${s.title} — ${s.publisher}`));
  }
  out += h2(tr(lang, 'guide_cta_heading'));
  out += rawParagraph(`${escapeHtml(tr(lang, 'guide_cta_sub'))} <a href="${SITE_URL}/${lang}/trip-builder">${escapeHtml(tr(lang, 'guide_cta_build'))}</a> · <a href="${contactInfo.whatsapp}">${escapeHtml(tr(lang, 'guide_cta_whatsapp'))}</a>.`);
  return out;
}

type RouteEntry = { rest: string; outFile: string; content: () => string; meta: ReturnType<typeof getRouteMeta>; lang: string; schemas: Record<string, unknown>[]; rtl: boolean };
function metaFor(rest: string, lang: Lang): ReturnType<typeof getRouteMeta> {
  // Homepage: mirror LocalizedHead exactly. At runtime the homepage title and
  // description come from the localized hero tagline/subtext (French uses a
  // dedicated SERP proposition). Prerender must emit the same value so crawlers
  // and browsers agree — previously every non-FR/AR homepage showed the English
  // description while the localized one was only applied in the browser.
  if (rest === '/' || rest === '') {
    if (lang === 'fr') {
      return { title: FR_HOME_META.title, description: FR_HOME_META.description, ogImage: FR_HOME_META.ogImage };
    }
    return { title: tr(lang, 'hero_tagline'), description: tr(lang, 'hero_subtext'), ogImage: HOME_META.ogImage };
  }
        const en = getRouteMeta(rest);
  // Localized metadata for ALL languages (shared single source of truth with the
  // runtime LocalizedHead). Previously only `ar` was consulted here, so every
  // non-Arabic locale inherited English SEO title/description even when a
  // translated tour/destination overlay existed.
  const loc = getLocalizedRouteMeta(rest, lang);
  const key = STATIC_TITLE_KEYS[rest];
  // Only override canonical English meta when the localized meta genuinely
  // differs (an authored translation exists for this locale/route). Static hub
  // pages whose title comes from a localized UI key (STATIC_TITLE_KEYS) keep
  // that title; their English description is preserved only when no translation
  // was authored — no copy is ever invented.
  const hasLocalization =
    loc.title !== en.title ||
    loc.description !== en.description ||
    (loc.ogImage ?? '') !== (en.ogImage ?? '');
  if (hasLocalization) {
    return { title: loc.title, description: loc.description, ogImage: loc.ogImage ?? en.ogImage };
  }
  // No authored localization for this route/language: keep the canonical route
  // metadata (English source) unchanged. This preserves the original English
  // behavior — the localized entity-data fallback below is handled by
  // getLocalizedRouteMeta, so we must not re-derive it here (it would override
  // TOUR_META/DESTINATION_META for English).
  return { title: key ? tr(lang, key) || en.title : en.title, description: en.description, ogImage: en.ogImage };
}
function buildRoutes(lang: Lang): RouteEntry[] {
  const routes: RouteEntry[] = []; const rtl = lang === 'ar';
  const add = (rest: string, outFile: string, content: () => string, schemas: Record<string, unknown>[] = []) => { routes.push({ rest, outFile, content, meta: metaFor(rest, lang), lang, schemas, rtl }); };
  add('/', `${lang}/index.html`, () => buildHomeContent(lang), buildHomeSchemas(lang));
  add('/tours', `${lang}/tours/index.html`, () => buildToursContent(lang), [
    buildFaqSchema([1, 2, 3, 4].map((n) => ({ question: tr(lang, `tours_faq_q${n}`), answer: tr(lang, `tours_faq_a${n}`) }))),
  ]);
  add('/destinations', `${lang}/destinations/index.html`, () => buildDestinationsContent(lang));
  add('/about', `${lang}/about/index.html`, () => buildAboutContent(lang));
  add('/contact', `${lang}/contact/index.html`, () => buildContactContent(lang));
  add('/book', `${lang}/book/index.html`, () => buildBookContent(lang));
  add('/things-to-do-in-morocco', `${lang}/things-to-do-in-morocco/index.html`, () => buildThingsToDoContent(lang), [
    buildBreadcrumb([
      { name: tr(lang, 'nav_home'), path: '/' },
      { name: (THINGS_COPY[lang] ?? THINGS_COPY.en).heading, path: '/things-to-do-in-morocco' },
    ], lang) as Record<string, unknown>,
  ]);
  add('/faq', `${lang}/faq/index.html`, () => buildFaqContent(lang));
  add('/blog', `${lang}/blog/index.html`, () => buildBlogContent(lang));
  for (const post of blogPosts) {
    const meta = BLOG_META[post.slug];
    add(`/blog/${post.slug}`, `${lang}/blog/${post.slug}.html`, () => buildBlogArticleContent(post.slug, lang), meta ? (buildBlogPostSchema({ slug: post.slug, title: meta.title, description: meta.description, date: post.date, image: post.image }, lang) as Record<string, unknown>[]) : []);
  }
    for (const rest of Object.keys(EXPERIENCE_PAGE_ROUTES)) {
      // Student Tours carries Breadcrumb + FAQ + three example TouristTrips.
      // No second Organization node: the site-wide TravelAgency entity already
      // ships in the shared head and is referenced by @id here.
      if (rest === '/student-tours/university-groups') {
        const ugSchemas: Record<string, unknown>[] = [
          buildBreadcrumb([
            { name: tr(lang, 'nav_home'), path: '/' },
            { name: tr(lang, 'nav_tours'), path: '/tours' },
            { name: tr(lang, 'st_breadcrumb'), path: '/student-tours' },
            { name: tr(lang, 'ug_breadcrumb'), path: rest },
          ], lang) as unknown as Record<string, unknown>,
          buildFaqSchema([1, 2, 3, 4, 5, 6, 7].map((n) => ({
            question: tr(lang, `ug_q${n}`), answer: tr(lang, `ug_a${n}`),
          }))) as unknown as Record<string, unknown>,
        ];
        add(rest, `${lang}${rest}/index.html`, () => buildExperienceContent(rest, lang), ugSchemas);
        continue;
      }
      // Dedicated Student Tour products: Breadcrumb + FAQPage + a TouristTrip
      // whose itinerary mirrors the day-by-day on the page. No second
      // Organization node — the site-wide TravelAgency entity is referenced by @id.
      const rawStp = getStudentTour(rest.replace('/student-tours/', ''));
      const stp = rawStp ? getLocalizedStudentTour(rawStp, lang) : rawStp;
      if (stp) {
        const stpSchemas: Record<string, unknown>[] = [
          buildBreadcrumb([
            { name: tr(lang, 'nav_home'), path: '/' },
            { name: tr(lang, 'nav_tours'), path: '/tours' },
            { name: tr(lang, 'st_breadcrumb'), path: '/student-tours' },
            { name: stp.title, path: rest },
          ], lang) as unknown as Record<string, unknown>,
          buildFaqSchema(stp.faqs.map((f) => ({ question: f.q, answer: f.a }))) as unknown as Record<string, unknown>,
          {
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            '@id': `${SITE_URL}/${lang}${rest}#trip`,
            name: stp.title,
            description: stp.metaDescription,
            url: `${SITE_URL}/${lang}${rest}`,
            touristType: tr(lang, 'st_sd_touristtype'),
            provider: { '@id': `${SITE_URL}/#organization` },
            itinerary: {
              '@type': 'ItemList',
              numberOfItems: stp.itinerary.length,
              itemListElement: stp.itinerary.map((d, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: `${fmt(tr(lang, 'st_sd_day_n'), { n: d.day.replace(/\D/g, '') })} — ${d.title}`,
              })),
            },
          },
        ];
        add(rest, `${lang}${rest}/index.html`, () => buildExperienceContent(rest, lang), stpSchemas);
        continue;
      }
      const schemas: Record<string, unknown>[] = rest === '/student-tours'
        ? ([
            buildBreadcrumb([
              { name: tr(lang, 'nav_home'), path: '/' },
              { name: tr(lang, 'nav_tours'), path: '/tours' },
              { name: tr(lang, 'st_breadcrumb'), path: rest },
            ], lang) as unknown as Record<string, unknown>,
            buildFaqSchema(Array.from({ length: 16 }, (_, i) => ({
              question: tr(lang, `st_15_q${i + 1}`), answer: tr(lang, `st_15_a${i + 1}`),
            }))) as unknown as Record<string, unknown>,
            ...JOURNEY_INDEXES.map((n) => ({
              '@context': 'https://schema.org',
              '@type': 'TouristTrip',
              name: `${tr(lang, `st_11_r${n}_days`)} ${tr(lang, `st_11_r${n}_unit`)} — ${tr(lang, `st_11_r${n}_title`)}`,
              description: `${tr(lang, `st_11_r${n}_route`)} · ${tr(lang, `st_11_r${n}_themes`)}`,
              touristType: tr(lang, 'st_sd_touristtype'),
              itinerary: {
                '@type': 'ItemList',
                itemListElement: tr(lang, `st_11_r${n}_route`).split('·').map((p, i) => ({
                  '@type': 'ListItem', position: i + 1, name: p.trim(),
                })),
              },
              provider: { '@type': 'TravelAgency', '@id': `${SITE_URL}/#organization`, name: 'Morocco Grand Adventure' },
            })),
          ])
        : rest === '/desert-tours'
        // Mirrors the live-page FAQ accordion (dt2_faq_q1..4/a1..4) added to
        // src/pages/desert-tours.tsx — desert-specific questions, distinct
        // from the /tours FAQ above.
        ? [buildFaqSchema([1, 2, 3, 4].map((n) => ({
            question: tr(lang, `dt2_faq_q${n}`), answer: tr(lang, `dt2_faq_a${n}`),
          }))) as unknown as Record<string, unknown>]
        : [];
      add(rest, `${lang}${rest}/index.html`, () => buildExperienceContent(rest, lang), schemas);
    }
  // Merzouga authority sub-pages + comparison pages (hub copy localized via
  // guide overlays; comparisons/travel-info stay canonical English).
  for (const page of MERZOUGA_GUIDES) {
    const rest = `/merzouga-guide/${page.slug}`;
    add(rest, `${lang}${rest}/index.html`, () => buildHubPageContent(page, lang), (() => {
      const localized = getLocalizedGuide(page.slug, lang) ?? page;
      return [
        buildBreadcrumb([
          { name: tr(lang, 'nav_home'), path: '/' },
          { name: guideCrumb(lang, page.slug, tr(lang, 'mg_breadcrumb')), path: '/merzouga-guide' },
          { name: localized.title, path: rest },
        ], lang) as unknown as Record<string, unknown>,
        buildFaqSchema(localized.faqs) as unknown as Record<string, unknown>,
      ];
    })());
  }
  for (const page of COMPARISONS) {
    const rest = `/comparisons/${page.slug}`;
    add(rest, `${lang}${rest}/index.html`, () => buildHubPageContent(page, lang), [
      buildBreadcrumb([
        { name: tr(lang, 'nav_home'), path: '/' },
        { name: tr(lang, 'seohub_comparisons_breadcrumb'), path: '/' },
        { name: localizedComparisonMeta(page.slug, lang)?.title ?? page.title, path: rest },
      ], lang) as unknown as Record<string, unknown>,
      page.faqs.length ? (buildFaqSchema(page.faqs) as unknown as Record<string, unknown>) : null,
    ].filter(Boolean) as Record<string, unknown>[]);
  }
  for (const page of TRAVEL_INFO) {
    const rest = `/travel-info/${page.slug}`;
    add(rest, `${lang}${rest}/index.html`, () => buildHubPageContent(page, lang), [
      buildBreadcrumb([
        { name: tr(lang, 'nav_home'), path: '/' },
        { name: tr(lang, 'seohub_travel_info_breadcrumb'), path: '/travel-info' },
        { name: page.title, path: rest },
      ], lang) as unknown as Record<string, unknown>,
      page.faqs.length ? (buildFaqSchema(page.faqs) as unknown as Record<string, unknown>) : null,
    ].filter(Boolean) as Record<string, unknown>[]);
  }
  add('/travel-info', `${lang}/travel-info/index.html`, () => {
    const items = TRAVEL_INFO.map((p) => {
      const img = catalogImage(
        p.slug === 'getting-around-morocco' ? 'draa-valley-oasis-palm-grove'
        : p.slug === 'what-to-pack-morocco' ? 'moroccan-riad-breakfast'
        : 'sahara-dune-trekking-merzouga');
      const imgHtml = img ? `      <img src="${img.src}" alt="${escapeHtml(img.alt)}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async">\n` : '';
      return `    <li>\n${imgHtml}      <h2><a href="${SITE_URL}/${lang}/travel-info/${p.slug}">${escapeHtml(p.title)}</a></h2>\n      <p>${escapeHtml(p.description)}</p>\n    </li>`;
    }).join('\n');
    return h1(tr(lang, 'travel_info_hub_title'))
      + rawParagraph(tr(lang, 'travel_info_hub_sub'))
      + `    <ul class="travel-info-list">\n${items}\n    </ul>\n`;
  }, [
    buildBreadcrumb([
      { name: tr(lang, 'nav_home'), path: '/' },
      { name: tr(lang, 'seohub_travel_info_breadcrumb'), path: '/travel-info' },
    ], lang) as unknown as Record<string, unknown>,
  ]);
  // truth in CITY_HUB_DURATIONS). Routes whose city has no canned tour of that
  // length still render an intentional page that funnels to the custom trip flow.
  for (const hub of CITY_HUBS) {
    add(`/tours/from-${hub.slug}`, `${lang}/tours/from-${hub.slug}/index.html`, () => buildCityHubContent(hub.slug, lang), [
      buildBreadcrumb([
        { name: tr(lang, 'nav_home'), path: '/' },
        { name: tr(lang, 'nav_tours'), path: '/tours' },
        { name: tr(lang, `hub_${hub.id}_title`), path: `/tours/from-${hub.slug}` },
      ], lang) as Record<string, unknown>,
    ]);
    for (const days of CITY_HUB_DURATIONS[hub.id] ?? []) {
      add(`/tours/from-${hub.slug}/${days}-days`, `${lang}/tours/from-${hub.slug}/${days}-days/index.html`, () => buildDurationHubContent(hub.slug, days, lang), [
        buildBreadcrumb([
          { name: tr(lang, 'nav_home'), path: '/' },
          { name: tr(lang, 'nav_tours'), path: '/tours' },
          { name: tr(lang, `hub_${hub.id}_title`), path: `/tours/from-${hub.slug}` },
          { name: fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) }), path: `/tours/from-${hub.slug}/${days}-days` },
        ], lang) as Record<string, unknown>,
      ]);
    }
  }
  // Every tour page carries the same schema set: the TouristTrip itself (its
  // Offer appears only when a real price is published), the localized
  // breadcrumb down from the departure-city hub, and the tour's FAQ.
  for (const id of TOUR_ROUTES) { const t = getLocalizedTour(id, lang); add(`/tours/${id}`, `${lang}/tours/${id}.html`, () => buildTourDetailContent(id, lang), t ? (
        ([
          ...(buildTourSchema(t, id, lang).slice(0, 1) as Record<string, unknown>[]),
          buildBreadcrumb((() => {
            const city = TOUR_DEPARTURE_CITY[id];
            const hub = city ? CITY_HUBS.find((h) => h.id === city) : undefined;
            const days = tourDurationDays(t.duration);
            const hasDurHub = Boolean(city && (CITY_HUB_DURATIONS[city] ?? []).includes(days));
            const crumbs: { name: string; path: string }[] = [
              { name: tr(lang, 'nav_home'), path: '/' },
              { name: tr(lang, 'nav_tours'), path: '/tours' },
            ];
            if (hub) {
              crumbs.push({ name: tr(lang, `hub_${hub.id}_title`), path: `/tours/from-${hub.slug}` });
              if (hasDurHub) crumbs.push({ name: fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) }), path: `/tours/from-${hub.slug}/${days}-days` });
            }
            crumbs.push({ name: t.name, path: '/tours/' + id });
            return crumbs;
          })(), lang),
          ...(t.faq && t.faq.length ? [buildFaqSchema(t.faq)] : []),
        ] as Record<string, unknown>[]))
    : [] /* MGA_THREE_DAY_SCHEMA_V1 */); }
  for (const dest of destinations) { const d = getLocalizedDestination(dest.id, lang); add(`/destinations/${dest.id}`, `${lang}/destinations/${dest.id}.html`, () => buildDestinationDetailContent(dest.id, lang), d ? (buildDestinationSchema(d, lang) as Record<string, unknown>[]) : []); }
  return routes;
}
function injectHead(html: string, meta: RouteEntry['meta'], rest: string, lang: string): string {
  const clean = rest === '/' ? '' : rest; const currentUrl = `${SITE_URL}/${lang}${clean}`;
  // Avoid redundant brand suffixes; append only when there is room.
  const fullTitle = withBrandSuffix(meta.title);
  const ogUrl = currentUrl; const hreflangLinks = hrefsFor(rest);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${ogUrl}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${ogUrl}"`);
  html = html.replace(/<meta property="og:locale" content="[^"]*"/, `<meta property="og:locale" content="${OG_LOCALE[lang] ?? 'en_US'}"`);
  // OG title/description must match the page title/description exactly as the
  // runtime LocalizedHead sets them — otherwise social crawlers (and the
  // prerender/runtime parity contract) see the base English homepage copy.
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${fullTitle.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${fullTitle.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${meta.description.replace(/"/g, '&quot;')}"`);
  if (meta.ogImage) {
    html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${SITE_URL}${meta.ogImage}"`);
    html = html.replace(/<meta property="og:image:alt" content="[^"]*"/, `<meta property="og:image:alt" content="${escapeHtml(ogImageAlt(meta.ogImage))}"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${SITE_URL}${meta.ogImage}"`);
    html = html.replace(/<meta name="twitter:image:alt" content="[^"]*"/, `<meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt(meta.ogImage))}"`);
    const ogSize = ogImageSize(meta.ogImage);
    if (ogSize) {
      html = html.replace(/<meta property="og:image:width" content="[^"]*"/, `<meta property="og:image:width" content="${ogSize.width}"`);
      html = html.replace(/<meta property="og:image:height" content="[^"]*"/, `<meta property="og:image:height" content="${ogSize.height}"`);
    } else {
      html = html.replace(/[ \t]*<meta property="og:image:(?:width|height)" content="[^"]*"[^>]*>\n?/g, '');
    }
  }
  html = html.replace(/<!-- Hreflang alternates[\s\S]*?<!-- Open Graph -->/, `<!-- Hreflang alternates (prerendered route-specific set) -->\n${hreflangLinks}\n\n    <!-- Open Graph -->`);
  return html;
}
function injectBody(html: string, bodyHtml: string): string { return html.replace('<div id="root"></div>', `<div id="root">\n<div class="prerendered-static">\n${bodyHtml}\n</div>\n  </div>`); }
function injectLang(html: string, code: string, rtl: boolean): string { const attrs = rtl ? ` lang="${code}" dir="rtl"` : ` lang="${code}"`; return html.replace(/<html[^>]*>/, `<html${attrs}>`); }
function injectStructuredData(html: string, schemas: Record<string, unknown>[]): string { if (!schemas.length) return html; const tags = schemas.map((s) => `    <script type="application/ld+json" data-prerendered="1">\n${JSON.stringify(s).replace(/</g, '\\u003c')}\n    </script>`).join('\n'); return html.replace('</head>', `${tags}\n\n  </head>`); }
// index.html ships a homepage-only BreadcrumbList (single "Home" crumb) in its
// static head. On every non-home route it would sit next to the route-specific
// breadcrumb, producing two conflicting BreadcrumbLists on the same page.
// Strip it everywhere except the homepage.
function stripGlobalHomeBreadcrumb(html: string): string {
  return html.replace(/[ \t]*<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "BreadcrumbList",\s*"itemListElement": \[\s*\{\s*"@type": "ListItem",\s*"position": 1,\s*"name": "Home",\s*"item": "https:\/\/www\.moroccograndadventure\.com\/"\s*\}\s*\]\s*\}\s*<\/script>\s*/, '');
}
// The homepage LCP preload (hero image) is only correct on the homepage; on
// every other route it forces an eager download of an image the page never
// paints (wasted bandwidth on ~1,500 pages). Strip it from non-home routes.
function stripHomeHeroPreload(html: string): string {
  // Both hero preloads (the phone poster and the desktop frame) belong to the
  // homepage only; elsewhere they would fetch an image the page never paints.
  return html.replace(/[ \t]*<link rel="preload" as="image" href="\/images\/hero\/sahara-(?:camel-riders-poster|caravan-desktop-1920w)\.webp"[^>]*>\s*/g, '');
}

function main() {
  registerAllTranslations();
  registerAllContentOverlays();
  registerAllGuideOverlays();
  registerAllExperienceOverlays();
  if (!fs.existsSync(indexHtmlPath)) throw new Error(`[prerender] dist/index.html not found at ${indexHtmlPath}. Run \`pnpm run build\` (Vite build) before prerendering.`);
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  let written = 0;
  for (const lang of languages) {
    const routes = buildRoutes(lang.code);
    for (const route of routes) {
      const langMarked = injectLang(baseHtml, route.lang, route.rtl);
      const deDuped = route.rest === '/' || route.rest === '' ? langMarked : stripHomeHeroPreload(stripGlobalHomeBreadcrumb(langMarked));
      const htmlWithHead = injectHead(deDuped, route.meta, route.rest, lang.code);
      const html = injectStructuredData(injectBody(htmlWithHead, buildNavTreeContent(lang.code) + route.content() + buildFooterContent(lang.code, route.rest)), route.schemas);
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
