// ─────────────────────────────────────────────────────────────────────────────
// Localized content resolver.
// Merges the canonical English content (src/data/content.ts) with per-language
// overlays, falling back to English for any missing string. `category` on
// destinations stays canonical-English (it is a logic key for filters/colors);
// use `categoryLabel()` for its localized display text.
//
// Locale code-splitting: the per-language overlay JSON for the active locale is
// loaded on demand via `loadContent(lang)` (browser bootstrap / language switch)
// or registered all-at-once by build tooling via `registerOverlay()` (see
// ./overlays.ts → registerAllContentOverlays for prerender/audit). English is
// the canonical source and therefore has no overlay. Any locale not yet loaded
// simply falls back to English — resolving instantly with no blank state.
// ─────────────────────────────────────────────────────────────────────────────
import {
  tours as toursEN,
  destinations as destinationsEN,
  faqData as faqEN,
  experiences as experiencesEN,
  type Tour,
  type Destination,
} from '@/data/content';
import type { Lang } from '@/i18n/index';
import type { ContentOverlay } from './types';

// ── Locale overlay registry ─────────────────────────────────────────────────
const overlayRegistry: Partial<Record<Lang, ContentOverlay>> = {};

export function registerOverlay(lang: Lang, data: ContentOverlay): void {
  overlayRegistry[lang] = data;
}

function getOverlay(lang: Lang): ContentOverlay | undefined {
  return overlayRegistry[lang];
}

/**
 * Lazy loaders, one split chunk per locale. English has no overlay (it is the
 * canonical source), so only the other 10 languages are loaded on demand.
 */
const OVERLAY_LOADERS: Partial<Record<Lang, () => Promise<{ default: ContentOverlay }>>> = {
  fr: () => import('./generated/fr.json'),
  es: () => import('./generated/es.json'),
  it: () => import('./generated/it.json'),
  de: () => import('./generated/de.json'),
  nl: () => import('./generated/nl.json'),
  pt: () => import('./generated/pt.json'),
  zh: () => import('./generated/zh.json'),
  ja: () => import('./generated/ja.json'),
  ko: () => import('./generated/ko.json'),
  ar: () => import('./generated/ar.json'),
};

/**
 * Load (and register) the content overlay for a single locale. English is the
 * base, so it resolves immediately. Idempotent — safe to call repeatedly.
 */
export async function loadContent(lang: Lang): Promise<void> {
  if (lang === 'en' || overlayRegistry[lang]) return;
  const loader = OVERLAY_LOADERS[lang];
  if (!loader) return;
  const mod = await loader();
  registerOverlay(lang, mod.default as ContentOverlay);
}

function pickText(base: string, over: string | undefined): string {
  return over != null && over !== '' ? over : base;
}

function pickArr(base: string[], over: (string | undefined)[] | undefined): string[] {
  if (!over) return base;
  return base.map((b, i) => pickText(b, over[i]));
}

export function localizeDestination(d: Destination, lang: Lang): Destination {
  const o = getOverlay(lang)?.destinations?.[d.id];
  if (!o) return d;
  return {
    ...d,
    name: pickText(d.name, o.name),
    shortDesc: pickText(d.shortDesc, o.shortDesc),
    description: pickText(d.description, o.description),
    bestTime: pickText(d.bestTime, o.bestTime),
    region: pickText(d.region, o.region),
    highlights: pickArr(d.highlights, o.highlights),
    // category intentionally left canonical (English) — it is a logic key
  };
}

export function localizeTour(tour: Tour, lang: Lang): Tour {
  const o = getOverlay(lang)?.tours?.[tour.id];
  if (!o) return tour;
  return {
    ...tour,
    name: pickText(tour.name, o.name),
    duration: pickText(tour.duration, o.duration),
    category: tour.category ? pickText(tour.category, o.category) : tour.category,
    description: tour.description ? pickText(tour.description, o.description) : tour.description,
    routeCaption: tour.routeCaption ? pickText(tour.routeCaption, o.routeCaption) : tour.routeCaption,
    highlights: pickArr(tour.highlights, o.highlights),
    included: tour.included ? pickArr(tour.included, o.included) : tour.included,
    excluded: tour.excluded ? pickArr(tour.excluded, o.excluded) : tour.excluded,
    itineraryDays: tour.itineraryDays?.map((day, i) => ({
      ...day,
      title: pickText(day.title, o.itineraryDays?.[i]?.title),
      desc: pickText(day.desc, o.itineraryDays?.[i]?.desc),
      stops: pickArr(day.stops, o.itineraryDays?.[i]?.stops),
    })),
    gallery: tour.gallery?.map((g, i) => ({
      ...g,
      caption: pickText(g.caption, o.gallery?.[i]?.caption),
    })),
    faq: tour.faq?.map((f, i) => ({
      question: pickText(f.question, o.faq?.[i]?.question),
      answer: pickText(f.answer, o.faq?.[i]?.answer),
    })),
  };
}

export function getLocalizedTours(lang: Lang): Tour[] {
  return toursEN.map((t) => localizeTour(t, lang));
}

export function getLocalizedTour(id: string, lang: Lang): Tour | undefined {
  const lookUp = id.trim().toLowerCase();
  const base = toursEN.find((t) => t.id === lookUp || t.aliases?.some((a) => a.toLowerCase() === lookUp));
  return base ? localizeTour(base, lang) : undefined;
}

export function getLocalizedDestinations(lang: Lang): Destination[] {
  return destinationsEN.map((d) => localizeDestination(d, lang));
}

export function getLocalizedDestination(id: string, lang: Lang): Destination | undefined {
  const base = destinationsEN.find((d) => d.id === id);
  return base ? localizeDestination(base, lang) : undefined;
}

export function getLocalizedFaq(lang: Lang): { question: string; answer: string }[] {
  const o = getOverlay(lang)?.faq;
  return faqEN.map((f, i) => ({
    question: pickText(f.question, o?.[i]?.question),
    answer: pickText(f.answer, o?.[i]?.answer),
  }));
}

export function getLocalizedExperiences(lang: Lang): string[] {
  return pickArr(experiencesEN, getOverlay(lang)?.experiences);
}

/** Localized display label for a canonical-English category key. */
export function categoryLabel(cat: string, lang: Lang): string {
  return getOverlay(lang)?.categories?.[cat] ?? cat;
}

// ── Blog articles ────────────────────────────────────────────────────────────
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  /** Canonical English title used for SEO title tag fallback. */
  canonicalTitle: string;
  /** Canonical English excerpt (fallback for untranslated overlays). */
  canonicalExcerpt: string;
  /** Featured image alt text (authored for accessibility). */
  alt: string;
};

/** Canonical English blog posts — the source of truth for slugs and metadata. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'merzouga-luxury-desert-camp-guide',
    title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga',
    excerpt: 'From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.',
    image: '/images/personal/luxury-camp-dusk.webp',
    date: 'August 2026',
    readTime: '8 min read',
    category: 'Sahara Desert',
    canonicalTitle: 'Luxury Desert Camps in Merzouga — Ultimate Guide to Sahara Glamping',
    canonicalExcerpt: 'From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — everything you need to know about luxury glamping in the Merzouga Sahara.',
    alt: 'Luxury desert camp with private tents at sunset near Merzouga, Morocco',
  },
  {
    slug: 'best-time-to-visit-morocco-sahara',
    title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide',
    excerpt: 'When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.',
    image: '/images/dest/merzouga.webp',
    date: 'July 2026',
    readTime: '6 min read',
    category: 'Travel Planning',
    canonicalTitle: 'Best Time to Visit the Sahara Desert — Month-by-Month Guide',
    canonicalExcerpt: 'When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and ideal conditions month by month.',
    alt: 'Erg Chebbi dunes at golden hour near Merzouga, Morocco',
  },
  {
    slug: 'camel-trekking-etiquette-morocco',
    title: 'Camel Trekking in Morocco: What to Expect and How to Prepare',
    excerpt: 'Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.',
    image: '/images/personal/dunes-camels-poster.webp',
    date: 'June 2026',
    readTime: '7 min read',
    category: 'Camel Trekking',
    canonicalTitle: 'Camel Trekking in Morocco — What to Expect and How to Prepare',
    canonicalExcerpt: 'Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.',
    alt: 'Camels walking across golden dunes at sunset during a trekking excursion',
  },
  {
    slug: 'marrakech-to-merzouga-roadtrip',
    title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary',
    excerpt: 'Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.',
    image: '/images/dest/ait-ben-haddou.webp',
    date: 'May 2026',
    readTime: '10 min read',
    category: 'Road Trips',
    canonicalTitle: 'Marrakech to Merzouga — Ultimate Sahara Road Trip Itinerary',
    canonicalExcerpt: 'Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.',
    alt: 'Aït Ben Haddou ksar at sunset, a UNESCO World Heritage site on the Marrakech-Merzouga route',
  },
  {
    slug: 'morocco-packing-list-desert',
    title: 'The Perfect Morocco Packing List for Desert Tours (2026)',
    excerpt: 'What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.',
    image: '/images/hero/desert-pano.webp',
    date: 'April 2026',
    readTime: '5 min read',
    category: 'Packing',
    canonicalTitle: 'Morocco Desert Packing List — What to Bring for Sahara Tours',
    canonicalExcerpt: 'What to pack for the Sahara — breathable layers, sun protection, and the essentials that make a desert night unforgettable.',
    alt: 'Desert panorama with distant dunes and clear sky — the ultimate Morocco packing reference',
  },
  {
    slug: 'fes-chefchaouen-blue-city-guide',
    title: "Fes to Chefchaouen: Exploring Morocco's Blue City",
    excerpt: "The journey from Morocco's cultural heart to the famous blue medina — what to see, where to stay, and how to make the most of it.",
    image: '/images/dest/chefchaouen.webp',
    date: 'March 2026',
    readTime: '9 min read',
    category: 'Imperial Cities',
    canonicalTitle: 'Fes to Chefchaouen — Exploring Morocco Blue City',
    canonicalExcerpt: 'The journey from Morocco cultural heart to the famous blue medina — what to see, where to stay, and how to make the most of it.',
    alt: 'Blue-washed buildings and alleyways of Chefchaouen medina, Morocco',
  },
];

/**
 * Get a localized blog post by slug, falling back to English for any
 * missing field. Currently titles and excerpts are authored in English and
 * fall back to English; the content overlay system can extend these later.
 */
export function getLocalizedBlogPost(slug: string, lang: Lang): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}