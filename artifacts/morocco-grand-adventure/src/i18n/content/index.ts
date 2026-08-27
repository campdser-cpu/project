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

/** One authored content section inside a blog article body. */
export type BlogSection = {
  /** Optional sub-heading for the section. */
  heading?: string;
  /** Plain paragraphs. */
  paragraphs?: string[];
  /** Optional bullet list rendered under the paragraphs. */
  bullets?: string[];
};

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
  /**
   * Authored article body (canonical English). Sections render under the
   * excerpt; locales without an overlay fall back to these, mirroring how
   * `title`/`excerpt` behave across the site today.
   */
  body?: BlogSection[];
};

/** Canonical English blog posts — the source of truth for slugs and metadata. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'merzouga-luxury-desert-camp-guide',
    title: 'The Ultimate Guide to Luxury Desert Camps in Merzouga',
    excerpt: 'From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.',
    image: '/images/personal/luxury-camp-dusk.jpg',
    date: 'August 2026',
    readTime: '8 min read',
    category: 'Sahara Desert',
    canonicalTitle: 'Luxury Desert Camps in Merzouga — Ultimate Guide to Sahara Glamping',
    canonicalExcerpt: 'From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — everything you need to know about luxury glamping in the Merzouga Sahara.',
    alt: 'Luxury desert camp with private tents at sunset near Merzouga, Morocco',
    body: [
      {
        heading: "Erg Chebbi — and why travelers sleep out here",
        paragraphs: [
          "Merzouga sits at the foot of Erg Chebbi, a sand sea of rolling dunes that runs roughly twenty-two kilometres along the desert edge, with crests that rise up to about 150 metres. By late afternoon the sand shifts through gold and copper; after dark the same dunes go completely quiet.",
          "Sleeping out here is less about roughing it and more about trading town noise for dune silence — without giving up comfort if you choose the right camp.",
        ],
      },
      {
        heading: "Inside a private luxury tent",
        paragraphs: [
          "Our guests stay in Berber-style tents built around real king-size beds with premium linens — not mattresses on the floor. Each tent has its own en-suite bathroom with a hot shower, plus a shaded terrace facing the dunes.",
        ],
      },
      {
        heading: "An evening at camp",
        bullets: [
          "Arrive on a sunset camel trek of roughly forty-five minutes, or ride straight to camp in a 4x4 if you prefer wheels over hooves.",
          "Fresh mint tea on arrival while staff show you to your tent.",
          "A multi-course Moroccan dinner — tagines, couscous, grilled specialities — prepared by the camp chefs.",
          "Live Amazigh and Gnawa rhythms around the campfire, with time simply to sit under more stars than most visitors have ever seen.",
          "Breakfast served at first light, when the dunes are at their coolest and quietest.",
        ],
      },
      {
        heading: "When to go",
        paragraphs: [
          "October to April brings warm days and cool, comfortable nights; summer can push daytime heat inland to extremes, though camps start activities early. Nights are chilly year-round at this altitude and season — even in summer, bring a proper jacket and closed shoes for after dark.",
        ],
      },
      {
        heading: "Building a night here into a longer trip",
        paragraphs: [
          "A single camp night slots naturally into our three-day Sahara journey from Marrakech, or the seven-day imperial-cities-and-Sahara route. With an extra day in Merzouga you can add a 4x4 circuit across the Black Desert and fossil beds, tea with a nomad family, the Gnawa musicians of nearby Khamlia, or quad biking between the dunes.",
        ],
      },
    ],
  },
  {
    slug: 'best-time-to-visit-morocco-sahara',
    title: 'Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide',
    excerpt: 'When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.',
    image: '/images/dest/merzouga.jpg',
    date: 'July 2026',
    readTime: '6 min read',
    category: 'Travel Planning',
    canonicalTitle: 'Best Time to Visit the Sahara Desert — Month-by-Month Guide',
    canonicalExcerpt: 'When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and ideal conditions month by month.',
    alt: 'Erg Chebbi dunes at golden hour near Merzouga, Morocco',
    body: [
      {
        heading: "The short answer",
        paragraphs: [
          "For a Sahara trip based around Merzouga and Erg Chebbi, aim for October to April: warm, clear days and cool desert nights. April and October are the sweet spots — warm enough for t-shirt weather at midday, mild enough for evenings outside.",
        ],
      },
      {
        heading: "Season by season",
        bullets: [
          "March – May: spring across Morocco. Deserts are warming but manageable, and the mountains and valleys are green.",
          "June – August: seriously hot inland, especially mid-afternoon. Camps shift trekking to early morning and late afternoon; southern cities slow down mid-day.",
          "September – November: our favourite window — warm dunes by day, jackets-and-a-fire nights, and easier touring between Marrakech, Fes and the coast.",
          "December – February: bright, crisp desert days and genuinely cold nights; frost is possible after dark. Fewer crowds, dramatic light, big jumps between daytime and night-time temperatures.",
        ],
      },
      {
        heading: "Plan for the day-to-night swing",
        paragraphs: [
          "Whatever the month, desert temperatures swing hard between afternoon and midnight. Pack layers rather than one heavy coat, and save the sleeveless stuff for midday only. This single habit makes every season workable.",
        ],
      },
      {
        heading: "Timing your route",
        paragraphs: [
          "Merzouga sits roughly nine to ten road-hours from Marrakech and about seven from Fes, so almost every guest breaks the journey with overnight stops. In the cooler months those stops double as sightseeing days — Aït Ben Haddou, the Dades Valley and Todra Gorge from Marrakech; Ifrane's cedar forests and the Ziz valley coming down from Fes.",
        ],
      },
    ],
  },
  {
    slug: 'camel-trekking-etiquette-morocco',
    title: 'Camel Trekking in Morocco: What to Expect and How to Prepare',
    excerpt: 'Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.',
    image: '/images/personal/dunes-camels-poster.jpg',
    date: 'June 2026',
    readTime: '7 min read',
    category: 'Camel Trekking',
    canonicalTitle: 'Camel Trekking in Morocco — What to Expect and How to Prepare',
    canonicalExcerpt: 'Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.',
    alt: 'Camels walking across golden dunes at sunset during a trekking excursion',
    body: [
      {
        heading: "Ride or trek? Knowing the difference",
        paragraphs: [
          "A camel ride is the short, circle-the-paddock version you find at tourist spots. A trek is something else: you set off from the desert edge on a line of camels, cross open dunes with a guide leading, and finish somewhere real — most often a camp among the dunes of Erg Chebbi for the night.",
          "Our treks run from about forty-five minutes (the classic sunset trek to camp) to longer multi-day expeditions, and they are private to your party.",
        ],
      },
      {
        heading: "How mounting actually works",
        paragraphs: [
          "Your camel kneels while you settle into the padded saddle — there are no stirrups, so expect a rocking, front-to-back sway rather than a horse's side-to-side motion. The guide leads the nose-line the whole way; your job is to sit loose, grip the handle, and look toward the horizon rather than down at the sand.",
        ],
      },
      {
        heading: "What to wear",
        bullets: [
          "Long trousers — they protect against sun and saddle rub far better than shorts.",
          "Closed shoes or trainers; save sandals for walking barefoot on the dunes later.",
          "Breathable layers on top; a light scarf or shemagh against wind and sun.",
          "Sunglasses, sunscreen, and a brimmed hat for before the trek starts.",
        ],
      },
      {
        heading: "What to bring",
        bullets: [
          "Water and your camera — plus a charged battery or power bank, because cold evenings drain them fast.",
          "A small daypack for personal items; large luggage travels in the vehicle that meets you at camp.",
        ],
      },
      {
        heading: "Comfort, children and camera nerves",
        paragraphs: [
          "The pace is gentle and even first-time riders settle within minutes. Children ride alongside a guide or with a parent, and anyone worried about the motion can take the shorter ride — or meet the group at camp by 4x4 instead. For photographs, golden hour does the work for you; just ask before pointing your lens at any person, guide or nomad alike.",
        ],
      },
    ],
  },
  {
    slug: 'marrakech-to-merzouga-roadtrip',
    title: 'Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary',
    excerpt: 'Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.',
    image: '/images/dest/ait-ben-haddou.jpg',
    date: 'May 2026',
    readTime: '10 min read',
    category: 'Road Trips',
    canonicalTitle: 'Marrakech to Merzouga — Ultimate Sahara Road Trip Itinerary',
    canonicalExcerpt: 'Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.',
    alt: 'Aït Ben Haddou ksar at sunset, a UNESCO World Heritage site on the Marrakech-Merzouga route',
    body: [
      {
        heading: "The road in one sentence",
        paragraphs: [
          "Marrakech and Merzouga are roughly nine to ten driving hours apart, which is why almost nobody drives it straight through — the journey is broken by three of Morocco's great sights along the way.",
        ],
      },
      {
        heading: "Day one: over the High Atlas",
        paragraphs: [
          "Leaving Marrakech, the road climbs into the High Atlas through Berber villages and switchbacks toward the Tizi n'Tichka pass. The natural first stop is Aït Ben Haddou, around four hours out: a fortified ksar of packed red earth whose lanes have stood here for centuries and earned UNESCO World Heritage status.",
          "Beyond it lies Ouarzazate, the gateway town between mountains and desert, usually reached by late afternoon.",
        ],
      },
      {
        heading: "Day two: Dades, Todra and the dunes",
        paragraphs: [
          "The valley country begins east of Ouarzazate — the winding road up the Dades Gorge, then the towering walls of Todra Gorge where you can walk between rock faces on foot. From there the landscape opens: palm groves thin out, the asphalt runs to Erfoud, and Erg Chebbi's dune line appears on the horizon at Merzouga.",
          "End the day as guests always should: camel trekking into the dunes at sunset, dinner and a fire at camp, sunrise on the sand the next morning.",
        ],
      },
      {
        heading: "Practical notes",
        bullets: [
          "October to April is the comfortable window for this drive; midsummer demands early starts.",
          "A warm jacket matters more than a second t-shirt — desert nights are cold even after a hot day.",
          "Add one extra Merzouga day if you can: 4x4 circuits, Khamlia's Gnawa musicians, nomad tea and fossil beds all fit around camp.",
        ],
      },
    ],
  },
  {
    slug: 'morocco-packing-list-desert',
    title: 'The Perfect Morocco Packing List for Desert Tours (2026)',
    excerpt: 'What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.',
    image: '/images/hero/desert-pano.jpg',
    date: 'April 2026',
    readTime: '5 min read',
    category: 'Packing',
    canonicalTitle: 'Morocco Desert Packing List — What to Bring for Sahara Tours',
    canonicalExcerpt: 'What to pack for the Sahara — breathable layers, sun protection, and the essentials that make a desert night unforgettable.',
    alt: 'Desert panorama with distant dunes and clear sky — the ultimate Morocco packing reference',
    body: [
      {
        heading: "One rule before anything else",
        paragraphs: [
          "Morocco, and especially the Sahara, runs on temperature swings. A day that reaches t-shirt warmth can end in a jacket-and-hat evening around a campfire. Pack layers first; everything else on this list supports that.",
        ],
      },
      {
        heading: "Clothing",
        bullets: [
          "Breathable long-sleeve shirts and long trousers — sun protection by day, warmth by night.",
          "A warm jacket or fleece even for summer trips; desert nights turn cold fast.",
          "Closed walking shoes or trainers, plus sandals for time spent barefoot on the dunes.",
          "One modest outfit — covered shoulders and knees — for villages and family visits.",
        ],
      },
      {
        heading: "Sun, sand and dust",
        bullets: [
          "High-SPF sunscreen, sunglasses and a brimmed hat.",
          "A light scarf or shemagh: sun shade on the camel, wind cover when the dunes breathe.",
        ],
      },
      {
        heading: "After dark",
        bullets: [
          "A headlamp or small torch for moving between tents once the fire dies down.",
          "A power bank — cold evenings drain phone and camera batteries quickly.",
          "Any personal medication in your hand luggage, not the transfer vehicle.",
        ],
      },
      {
        heading: "Small things travelers thank themselves for",
        bullets: [
          "Dirhams in small notes for tips and souks (cards do not reach everywhere).",
          "A refillable water bottle.",
          "European Type C/E plug adapter.",
          "Lip balm and moisturiser — desert air is dry at every hour.",
        ],
      },
    ],
  },
  {
    slug: 'fes-chefchaouen-blue-city-guide',
    title: "Fes to Chefchaouen: Exploring Morocco's Blue City",
    excerpt: "The journey from Morocco's cultural heart to the famous blue medina — what to see, where to stay, and how to make the most of it.",
    image: '/images/dest/chefchaouen.jpg',
    date: 'March 2026',
    readTime: '9 min read',
    category: 'Imperial Cities',
    canonicalTitle: 'Fes to Chefchaouen — Exploring Morocco Blue City',
    canonicalExcerpt: 'The journey from Morocco cultural heart to the famous blue medina — what to see, where to stay, and how to make the most of it.',
    alt: 'Blue-washed buildings and alleyways of Chefchaouen medina, Morocco',
    body: [
      {
        heading: "Two cities, two completely different Moroccos",
        paragraphs: [
          "Fes is intensity: Fes el-Bali is one of the largest car-free urban areas on earth, home to Al-Qarawiyyin — among the oldest universities still operating — and the Chouara Tannery, where leather has been worked in stone vats for generations. Chefchaouen is the exhale: a small mountain town in the Rif whose lanes are washed in shades of blue.",
          "The contrast is exactly why so many travelers pair them.",
        ],
      },
      {
        heading: "Getting there",
        paragraphs: [
          "Chefchaouen sits roughly 200 kilometres north-west of Fes — about four hours of driving through farmland and hill country. With a private driver you leave after breakfast, stop where the view merits it, and walk into the blue medina by late afternoon, when the light softens and day visitors have thinned out.",
        ],
      },
      {
        heading: "Making the most of Chefchaouen",
        paragraphs: [
          "There is no monument checklist here — the town itself is the sight. Give yourself an unhurried morning to wander uphill lanes, then browse the weaving and craft work the region is known for. Early morning, before groups arrive, is when the alleys are at their quietest and most photogenic.",
        ],
      },
      {
        heading: "Turning it into a loop",
        paragraphs: [
          "West of Fes, Meknès and the Roman ruins of Volubilis sit practically on the route, and hikers can push further into the Rif toward Akchour's waterfalls and natural stone bridge. Travelers with five days often run Marrakech–Meknès–Fes–Chefchaouen as one imperial-and-mountains circuit.",
        ],
      },
      {
        heading: "Photography with respect",
        paragraphs: [
          "The blue walls are irresistible; residents' doorways are not backdrops. Ask before photographing people, keep volume low in residential lanes, and dress modestly outside purely tourist streets — the same courtesies you would want on your own doorstep.",
        ],
      },
    ],
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