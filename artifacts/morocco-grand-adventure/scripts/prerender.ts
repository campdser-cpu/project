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
import { CITY_HUBS, TOUR_DEPARTURE_CITY, CITY_HUB_DURATIONS, tourIdsForCity, tourDurationDays } from '../src/data/tour-hierarchy';
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
import { getRouteMeta, getLocalizedRouteMeta, BLOG_META, HOME_META, FR_HOME_META } from '../src/components/seo/route-metadata';
import { buildTourSchema, buildDestinationSchema, buildBlogPostSchema, buildReviewSchema, buildFaqSchema, buildBreadcrumb } from '../src/components/seo/StructuredData';
import { registerAllTranslations } from '../src/i18n/locales';
import { registerAllContentOverlays } from '../src/i18n/content/overlays';

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
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const AMP = String.fromCharCode(38); // '&'
const ENT = AMP;

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
function faqBlock(faqs: { question: string; answer: string }[]): string {
  if (faqs.length === 0) return '';
  const items = faqs
    .map((f) => `      <li>\n        <h3>${escapeHtml(f.question)}</h3>\n        <p>${escapeHtml(f.answer)}</p>\n      </li>`)
    .join('\n');
  return `    <ul class="prerendered-faq">\n${items}\n    </ul>\n`;
}
// Curated-image figure used by destination galleries and experience pages.
// Alt text is natural/descriptive (never keyword-stuffed) per the Image-SEO pack.
function figureImg(src: string, alt: string, caption: string): string {
  return `    <figure>\n      <img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" class="w-full h-72 md:h-96 object-cover" />\n      <figcaption>${escapeHtml(caption)}</figcaption>\n    </figure>\n`;
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
  const destNames = getLocalizedDestinations(lang).slice(0, 8).map((d) => d.name);
  const tourNames = getLocalizedTours(lang).map((t) => t.name);
  const reviewBlocks = reviews.map((r) => {
    const name = tr(lang, r.nameKey);
    const quote = tr(lang, r.quoteKey);
    const tourName = tr(lang, r.tourKey);
    return (`<div class="prerendered-review">\n          <h3 class="prerendered-review-author">${escapeHtml(name)}</h3>\n          <p class="prerendered-review-text">${escapeHtml(quote)}</p>\n          <p class="prerendered-review-tour">${escapeHtml(tourName)}</p>\n        </div>`);
  }).join('\n');
  return h1(tr(lang, 'hero_heading1') || 'Discover the Soul of Morocco') + paragraph(tr(lang, 'hero_subtext')) + h2(tr(lang, 'section_destinations') || 'Top Destinations') + ul(destNames) + h2(tr(lang, 'section_tours') || 'Featured Tours') + ul(tourNames) + h2(tr(lang, 'section_reviews') || 'Traveler Stories') + `<div class="prerendered-reviews-container">\n${reviewBlocks}\n    </div>\n`;
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
    .map((hub) => `      <li>${link(`${SITE_URL}/${lang}/tours/from-${hub.slug}`, tr(lang, `hub_${hub.id}_title`))}</li>`)
    .join('\n');
  const threeDayLink = `      <li>${link(`${SITE_URL}/${lang}/tours/from-marrakech/3-days`, fmt(tr(lang, 'hub_dur_crumb'), { days: 3, city: tr(lang, 'hub_marrakech_name') }))}</li>`;
  return h1(tr(lang, 'section_tours') || 'Our Tours')
    + h2(tr(lang, 'hub_by_departure_city'))
    + `    <ul>\n${cityLinks}\n${threeDayLink}\n    </ul>\n`
    + blocks;
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
      + paragraph(`${tr(lang, 'search_duration')}: ${t.duration} · ${tr(lang, 'from')} ${t.quoteOnly ? t.price : '€' + t.price}`)
      + '<ul>' + t.highlights.map((x) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, x)}</li>`).join('\n') + '    </ul>'
      + rawParagraph(link(`${SITE_URL}/${lang}/tours/${t.id}`, tr(lang, 'tours_view') + ' ' + escapeHtml(t.name)));
  }

  const destinationsForLang = getLocalizedDestinations(lang)
    .filter((d) => hub.destinationIds.includes(d.id))
    .map((d) => `<li>${link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name)} - ${escapeHtml(d.shortDesc)}</li>`)
    .join('\n');

  const toursSection = tourBlocks ? h2(fmt(tr(lang, 'hub_private_title'), { city: tr(lang, `hub_${hub.id}_name`) })) + tourBlocks : '';
  const destinationsSection = destinationsForLang ? h2(fmt(tr(lang, 'hub_explore_region'), { city: tr(lang, `hub_${hub.id}_name`) })) + `    <ul>\n${destinationsForLang}\n    </ul>\n` : '';

  return h1(tr(lang, `hub_${hub.id}_title`))
    + paragraph(tr(lang, `hub_${hub.id}_intro`))
    + paragraph(tr(lang, `hub_${hub.id}_body`))
    + (hub.hasDurationDrive
        ? h2(fmt(tr(lang, 'hub_dur_crumb'), { days: 3, city: tr(lang, `hub_${hub.id}_name`) })) + rawParagraph(link(`${SITE_URL}/${lang}/tours/from-${hub.slug}/3-days`, fmt(tr(lang, 'hub_browse_3day'), { city: tr(lang, `hub_${hub.id}_name`) })))
        : '')
    + toursSection
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
      + paragraph(`${tr(lang, 'from')} ${t.quoteOnly ? t.price : '€' + t.price} · ${t.duration}`)
      + rawParagraph(link(`${SITE_URL}/${lang}/tours/${t.id}`, tr(lang, 'tours_view') + ' ' + escapeHtml(t.name)));
  }

  const siblingLinks = siblingIds.length
    ? '<ul>' + siblingIds.map((t) => `      <li>${link(`${SITE_URL}/${lang}/tours/${t.id}`, `${t.name} (${t.duration})`)}</li>`).join('\n') + '    </ul>\n'
    : '';

  const crumb = `${tr(lang, 'nav_home')} › ${tr(lang, 'nav_tours')} › ${tr(lang, `hub_${hub.id}_title`)} › ${fmt(tr(lang, 'hub_dur_crumb'), { days, city: tr(lang, `hub_${hub.id}_name`) })}`;

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
    + `<p><strong>${escapeHtml(crumb)}</strong></p>\n`
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

    return `<section class="border-t border-border bg-muted/40 py-12" aria-label="${escapeHtml(tr(lang, 'dest_nearby'))}">\n  <div class="container mx-auto px-4 max-w-6xl">\n    <div class="grid gap-8 md:grid-cols-2">\n      ${destinationLinks}\n      ${tourLinks}\n    </div>\n  </div>\n</section>\n`;
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

    return `<section class="border-t border-border bg-muted/40 py-12" aria-label="${escapeHtml(tr(lang, 'td_your_route'))}">\n  <div class="container mx-auto px-4 max-w-6xl">\n    <div class="grid gap-8 md:grid-cols-2">\n      ${routeLinks}\n      ${relatedTourLinks}\n    </div>\n  </div>\n</section>\n`;
  }

  return '';
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
  const breadcrumb = departHub
    ? `<p class="prerendered-breadcrumb">${link(`${SITE_URL}/${lang}/`, tr(lang, 'nav_home'))} › ${link(`${SITE_URL}/${lang}/tours`, tr(lang, 'nav_tours'))} › ${link(`${SITE_URL}/${lang}/tours/from-${departHub.slug}`, tr(lang, `hub_${departHub.id}_title`))} › ${escapeHtml(tour.name)}</p>\n`
    : '';
  return breadcrumb + h1(tour.name) + paragraph(tour.description ?? '') + paragraph(`${tr(lang, 'search_duration')}: ${tour.duration}`) + h2(tr(lang, 'tour_why_love')) + ul(tour.highlights) + (itinerary.length > 0 ? h2(tr(lang, 'tour_itinerary')) + ul(itinerary.map((d) => `${tr(lang, 'tour_day')} ${d.day}: ${d.title}`)) : '') + (included.length > 0 ? h2(tr(lang, 'tour_included')) + ul(included) : '') + (excluded.length > 0 ? h2(tr(lang, 'tour_not_included')) + ul(excluded) : '') + (faqs.length > 0 ? h2(tr(lang, 'nav_faq')) + faqBlock(faqs) : '') + (departHub ? h2(fmt(tr(lang, 'hub_related_title'), { city: tr(lang, `hub_${departHub.id}_name`) })) + paragraph(link(`${SITE_URL}/${lang}/tours/from-${departHub.slug}`, fmt(tr(lang, 'hub_related_browse'), { city: tr(lang, `hub_${departHub.id}_name`) }))) : '') + buildTopicalLinksContent({ tourId: tour.id }, lang);
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
  return h1(d.name) + paragraph(d.shortDesc) + paragraph(d.description) + h2(tr(lang, 'dest_about')) + ul(d.highlights) + (gallery ? h2(`${d.name} ${tr(lang, 'dest_pictures_title')}`) + gallery : '') + buildTopicalLinksContent({ destinationId: d.id }, lang);
}
function buildAboutContent(lang: Lang): string {
  return h1(tr(lang, 'nav_about')) + paragraph(tr(lang, 'about_story_p1')) + paragraph(tr(lang, 'about_story_p2')) + h2(tr(lang, 'nav_tours')) + paragraph(tr(lang, 'about_philosophy_quote'));
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
function buildFaqContent(lang: Lang): string { return h1(tr(lang, 'nav_faq')) + faqBlock(getLocalizedFaq(lang)); }

function buildBlogContent(lang: Lang): string {
  const posts = [
    { title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga', excerpt: "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.", date: 'August 2026', read: '8 min read', cat: 'Sahara Desert' },
    { title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide', excerpt: "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.", date: 'July 2026', read: '6 min read', cat: 'Travel Planning' },
    { title: 'Camel Trekking in Morocco: What to Expect and How to Prepare', excerpt: "Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.", date: 'June 2026', read: '7 min read', cat: 'Camel Trekking' },
    { title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary', excerpt: "Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.", date: 'May 2026', read: '10 min read', cat: 'Road Trips' },
    { title: 'The Perfect Morocco Packing List for Desert Tours (2026)', excerpt: "What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.", date: 'April 2026', read: '5 min read', cat: 'Packing' },
    { title: "Fes to Chefchaouen: Exploring Morocco's Blue Pearl", excerpt: "The journey from Morocco's cultural heart to the Instagram-famous blue medina — what to see, where to stay, and how to make the most of it.", date: 'March 2026', read: '9 min read', cat: 'Imperial Cities' },
  ];
  const blocks = posts.map((post) => h2(post.title) + `<p><strong>${escapeHtml(post.cat)}</strong> · ${escapeHtml(post.date)} · ${escapeHtml(post.read)}</p>\n` + paragraph(post.excerpt)).join('');
  return h1(tr(lang, 'nav_blog')) + blocks;
}

const ARTICLE_RELATIONS: Record<string, { tours: string[]; destinations: string[] }> = {
  'merzouga-luxury-desert-camp-guide': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  'best-time-to-visit-morocco-sahara': { tours: ['3-day-sahara-marrakech', '5-day-imperial-cities'], destinations: ['merzouga', 'erg-chebbi'] },
  'camel-trekking-etiquette-morocco': { tours: ['3-day-sahara-marrakech'], destinations: ['merzouga', 'erg-chebbi'] },
  'marrakech-to-merzouga-roadtrip': { tours: ['3-day-sahara-marrakech', '8-day-marrakech-essaouira-agadir-sahara'], destinations: ['marrakech', 'ait-ben-haddou', 'dades-valley', 'merzouga'] },
  'morocco-packing-list-desert': { tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'], destinations: ['merzouga', 'erg-chebbi'] },
  'fes-chefchaouen-blue-city-guide': { tours: ['5-day-imperial-cities'], destinations: ['fes', 'chefchaouen'] },
};

function link(url: string, text: string): string { return `<a href="${url}">${escapeHtml(text)}</a>`; }
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
  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 4);
  const items = others.map((p) => `      <li>${link(`${SITE_URL}/${lang}/blog/${p.slug}`, p.title)}</li>`).join('\n');
  return h2(tr(lang, 'related_articles')) + `<ul>\n${items}\n    </ul>\n`;
}
function buildBlogArticleContent(slug: string, lang: Lang): string {
  const posts: Record<string, { title: string; excerpt: string; date: string; read: string; cat: string; image: string }> = {
    'merzouga-luxury-desert-camp-guide': { title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga', excerpt: "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.", date: 'August 2026', read: '8 min read', cat: 'Sahara Desert', image: '/images/personal/luxury-camp-dusk.webp' },
    'best-time-to-visit-morocco-sahara': { title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide', excerpt: "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.", date: 'July 2026', read: '6 min read', cat: 'Travel Planning', image: '/images/dest/merzouga.webp' },
    'camel-trekking-etiquette-morocco': { title: 'Camel Trekking in Morocco: What to Expect and How to Prepare', excerpt: "Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.", date: 'June 2026', read: '7 min read', cat: 'Camel Trekking', image: '/images/personal/dunes-camels-poster.webp' },
    'marrakech-to-merzouga-roadtrip': { title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary', excerpt: "Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.", date: 'May 2026', read: '10 min read', cat: 'Road Trips', image: '/images/dest/ait-ben-haddou.webp' },
    'morocco-packing-list-desert': { title: 'The Perfect Morocco Packing List for Desert Tours (2026)', excerpt: "What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.", date: 'April 2026', read: '5 min read', cat: 'Packing', image: '/images/hero/desert-pano.webp' },
    'fes-chefchaouen-blue-city-guide': { title: "Fes to Chefchaouen: Exploring Morocco's Blue Pearl", excerpt: "The journey from Morocco's cultural heart to the Instagram-famous blue medina — what to see, where to stay, and how to make the most of it.", date: 'March 2026', read: '9 min read', cat: 'Imperial Cities', image: '/images/dest/chefchaouen.webp' },
  };
  const post = posts[slug];
  if (!post) return h1('Blog Post Not Found') + paragraph('This blog post could not be found.');
  const metaPost = blogPosts.find((p) => p.slug === slug);
  const imgAlt = metaPost?.alt ?? post.title;
  return h1(post.title) + `<p><strong>${escapeHtml(post.cat)}</strong> · ${escapeHtml(post.date)} · ${escapeHtml(post.read)}</p>\n` + `<img src="${post.image}" alt="${escapeHtml(imgAlt)}" loading="lazy" decoding="async" class="w-full h-48 md:h-64 object-cover mb-8 rounded-md" />\n` + paragraph(post.excerpt) + buildBlogToursBlock(slug, lang) + buildBlogDestinationsBlock(slug, lang) + buildBlogRelatedArticles(slug, lang);
}

const EXPERIENCE_PAGE_ROUTES: Record<string, { tours: string[]; destinations: string[] }> = {
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
};
function buildExperienceContent(rest: string, lang: Lang): string {
  const meta = getRouteMeta(rest);
  const cfg = EXPERIENCE_PAGE_ROUTES[rest] ?? { tours: [], destinations: [] };
  const heading = h1(meta.title.replace(/\s*—.*$/, '').trim() || meta.title);
  const intro = paragraph(meta.description);
  const tBlocks = cfg.tours.map((id) => getLocalizedTour(id, lang)).filter((t): t is NonNullable<typeof t> => Boolean(t)).map((t) => h2Link(`${SITE_URL}/${lang}/tours/${t.id}`, t.name) + paragraph(t.description ?? '') + paragraph(`${tr(lang, 'search_duration')}: ${t.duration}`) + ul(t.highlights)).join('');
  const dBlocks = cfg.destinations.map((id) => getLocalizedDestination(id, lang)).filter((d): d is NonNullable<typeof d> => Boolean(d)).map((d) => h2Link(`${SITE_URL}/${lang}/destinations/${d.id}`, d.name) + paragraph(d.shortDesc)).join('');
  // Curated Sahara imagery for the desert-tours hub (Image-SEO pack).
  const desertMoments = rest === '/desert-tours' ? `\n    <h2>${escapeHtml(tr(lang, 'dt2_moments_title'))}</h2>\n    <p>${escapeHtml(tr(lang, 'dt2_moments_sub'))}</p>\n    <div class="grid gap-6 md:grid-cols-3">\n${[
    ['/images/curated/sahara-desert-dunes-couple-sunset-merzouga.webp', 'Couple sitting on top of a golden dune admiring the endless Sahara desert at sunset near Merzouga', tr(lang, 'dt2_moments_cap1')],
    ['/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp', 'Silhouette of a Berber guide leading two camels along a dune ridge at sunset in the Sahara', tr(lang, 'dt2_moments_cap2')],
    ['/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp', 'Silhouette of a woman with arms outstretched on a dune crest against a giant setting sun in the Sahara', tr(lang, 'dt2_moments_cap3')],
  ].map(([s, a, c]) => `      ${figureImg(s, a, c)}`).join('\n')}\n    </div>\n` : '';
  return heading + intro + desertMoments + tBlocks + dBlocks;
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
  const ar = lang === 'ar' ? getLocalizedRouteMeta(rest, lang) : undefined;
  const key = STATIC_TITLE_KEYS[rest];
  // Routes with dedicated SEO metadata (all static pages + tours/destinations
  // present in TOUR_META/DESTINATION_META). Keeping prerender parity with the
  // runtime head is essential — Google indexes the prerendered HTML.
  if (en !== HOME_META) {
    return { title: ar?.title ?? (key ? tr(lang, key) || en.title : en.title), description: ar?.description ?? en.description, ogImage: ar?.ogImage ?? en.ogImage };
  }
  // Fallback for routes without dedicated metadata: use the localized entity data.
  let m = rest.match(/^\/tours\/([^/]+)$/);
  if (m) { const t = getLocalizedTour(m[1], lang); if (t) return { title: t.name, description: truncate(t.description), ogImage: t.image }; }
  m = rest.match(/^\/destinations\/([^/]+)$/);
  if (m) { const d = getLocalizedDestination(m[1], lang); if (d) return { title: d.name, description: truncate(d.shortDesc || d.description), ogImage: d.image }; }
  return { title: ar?.title ?? (key ? tr(lang, key) || en.title : en.title), description: ar?.description ?? en.description, ogImage: ar?.ogImage ?? en.ogImage };
}
function buildRoutes(lang: Lang): RouteEntry[] {
  const routes: RouteEntry[] = []; const rtl = lang === 'ar';
  const add = (rest: string, outFile: string, content: () => string, schemas: Record<string, unknown>[] = []) => { routes.push({ rest, outFile, content, meta: metaFor(rest, lang), lang, schemas, rtl }); };
  add('/', `${lang}/index.html`, () => buildHomeContent(lang), buildHomeSchemas(lang));
  add('/tours', `${lang}/tours/index.html`, () => buildToursContent(lang));
  add('/destinations', `${lang}/destinations/index.html`, () => buildDestinationsContent(lang));
  add('/about', `${lang}/about/index.html`, () => buildAboutContent(lang));
  add('/contact', `${lang}/contact/index.html`, () => buildContactContent(lang));
  add('/faq', `${lang}/faq/index.html`, () => buildFaqContent(lang));
  add('/blog', `${lang}/blog/index.html`, () => buildBlogContent(lang));
  for (const post of blogPosts) {
    const meta = BLOG_META[post.slug];
    add(`/blog/${post.slug}`, `${lang}/blog/${post.slug}.html`, () => buildBlogArticleContent(post.slug, lang), meta ? (buildBlogPostSchema({ slug: post.slug, title: meta.title, description: meta.description, date: post.date, image: post.image }, lang) as Record<string, unknown>[]) : []);
  }
  for (const rest of Object.keys(EXPERIENCE_PAGE_ROUTES)) add(rest, `${lang}${rest}/index.html`, () => buildExperienceContent(rest, lang));
  // Tours departure-city hubs + every meaningful duration hub (single source of
  // truth in CITY_HUB_DURATIONS). Routes whose city has no canned tour of that
  // length still render an intentional page that funnels to the custom trip flow.
  for (const hub of CITY_HUBS) {
    add(`/tours/from-${hub.slug}`, `${lang}/tours/from-${hub.slug}/index.html`, () => buildCityHubContent(hub.slug, lang));
    for (const days of CITY_HUB_DURATIONS[hub.id] ?? []) {
      add(`/tours/from-${hub.slug}/${days}-days`, `${lang}/tours/from-${hub.slug}/${days}-days/index.html`, () => buildDurationHubContent(hub.slug, days, lang));
    }
  }
  for (const id of TOUR_ROUTES) { const t = getLocalizedTour(id, lang); add(`/tours/${id}`, `${lang}/tours/${id}.html`, () => buildTourDetailContent(id, lang), t ? (t.quoteOnly
      ? ([
          buildBreadcrumb([{ name: 'Home', path: '/' }, { name: 'Tours', path: '/tours' }, { name: t.name, path: '/tours/' + id }], lang),
          ...(t.faq && t.faq.length ? [buildFaqSchema(t.faq)] : []),
        ] as Record<string, unknown>[])
      : (buildTourSchema(t, id, lang) as Record<string, unknown>[]))
    : [] /* MGA_THREE_DAY_SCHEMA_V1 */); }
  for (const dest of destinations) { const d = getLocalizedDestination(dest.id, lang); add(`/destinations/${dest.id}`, `${lang}/destinations/${dest.id}.html`, () => buildDestinationDetailContent(dest.id, lang), d ? (buildDestinationSchema(d, lang) as Record<string, unknown>[]) : []); }
  return routes;
}
function injectHead(html: string, meta: RouteEntry['meta'], rest: string, lang: string): string {
  const clean = rest === '/' ? '' : rest; const currentUrl = `${SITE_URL}/${lang}${clean}`; const fullTitle = `${meta.title} — ${BRAND}`; const ogUrl = currentUrl; const hreflangLinks = hrefsFor(rest);
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
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${SITE_URL}${meta.ogImage}"`);
  }
  html = html.replace(/<!-- Hreflang alternates[\s\S]*?<!-- Open Graph -->/, `<!-- Hreflang alternates (prerendered route-specific set) -->\n${hreflangLinks}\n\n    <!-- Open Graph -->`);
  return html;
}
function injectBody(html: string, bodyHtml: string): string { return html.replace('<div id="root"></div>', `<div id="root">\n${bodyHtml}\n  </div>`); }
function injectLang(html: string, code: string, rtl: boolean): string { const attrs = rtl ? ` lang="${code}" dir="rtl"` : ` lang="${code}"`; return html.replace(/<html[^>]*>/, `<html${attrs}>`); }
function injectStructuredData(html: string, schemas: Record<string, unknown>[]): string { if (!schemas.length) return html; const tags = schemas.map((s) => `    <script type="application/ld+json" data-prerendered="1">\n${JSON.stringify(s).replace(/</g, '\\u003c')}\n    </script>`).join('\n'); return html.replace('</head>', `${tags}\n\n  </head>`); }

function main() {
  registerAllTranslations();
  registerAllContentOverlays();
  if (!fs.existsSync(indexHtmlPath)) throw new Error(`[prerender] dist/index.html not found at ${indexHtmlPath}. Run \`pnpm run build\` (Vite build) before prerendering.`);
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  let written = 0;
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
