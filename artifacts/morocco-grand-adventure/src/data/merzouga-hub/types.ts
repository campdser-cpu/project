// ─────────────────────────────────────────────────────────────────────────────
// Merzouga Travel Guide hub — language-neutral structure.
//
// The page copy lives in one module per locale (./en.ts … ./ar.ts), written
// natively for each language rather than machine-translated from English. The
// runtime loads only the active locale (./index.ts); the prerenderer imports
// all of them (./all.ts). Structure — which photograph goes where and which
// guide each section links to — is shared here so every locale tells the same
// story in the same order.
//
// Photographs: every image below was opened and checked before use. None
// carries a watermark, a third-party logo or baked-in text, and each alt text
// in the locale modules describes what is actually visible. Library assets
// (MGA-0xx) come from the official Morocco Grand Adventure photo library.
// ─────────────────────────────────────────────────────────────────────────────

export type MgImage = {
  /** Fallback URL (JPEG master where one exists). */
  src: string;
  /** WebP candidates that exist on disk. */
  srcSet: string;
  w: number;
  h: number;
  /** CSS object-position when the frame is cropped. */
  position?: string;
};

const LIB_WIDTHS = [480, 768, 1280, 1920];
const lib = (name: string, w: number, h: number, widths = LIB_WIDTHS): MgImage => ({
  src: `/images/library/${name}.jpg`,
  srcSet: widths.map((x) => `/images/library/srcset/${name}-${x}w.webp ${x}w`).join(', '),
  w,
  h,
});
const local = (base: string, w: number, h: number, widths: number[], fallback = `${base}.jpg`): MgImage => ({
  src: fallback,
  srcSet: [...widths.map((x) => `${base}-${x}w.webp ${x}w`), `${base}.webp ${w}w`].join(', '),
  w,
  h,
});

export const MG_IMAGES = {
  /** MGA-033 — Erg Chebbi dunes at blue hour. */
  hero: { ...lib('erg-chebbi-dunes-blue-hour-morocco-mga-033', 1920, 1280), position: 'center 72%' },
  /** MGA-028 — traveller facing the Erg Chebbi dune sea from the road. */
  erg: lib('erg-chebbi-dune-sea-morocco-mga-028', 1920, 1299),
  /** MGA-001 — guide leading a camel caravan across Erg Chebbi at dusk. */
  camel: lib('erg-chebbi-camel-trekking-sunset-morocco-mga-001', 1920, 1280),
  /** Morocco Grand Adventure's luxury desert camp at dusk. */
  camp: local('/images/personal/luxury-camp-dusk', 1200, 1200, [480, 768]),
  /** MGA-006 — 4x4 driving across the dunes. */
  fourByFour: lib('4x4-dune-bashing-sahara-morocco-mga-006', 1920, 1280),
  /** A Morocco Grand Adventure guide sharing tea with a guest in the dunes. */
  people: local('/images/personal/guide-guest-tea', 1200, 901, [480, 768]),
  /** A guide and guests wrapped against sun and sand at sunset (frame strip
   *  trimmed by scripts/build-merzouga-guide-images.mjs). */
  pack: { ...local('/images/personal/guests-sunset-trimmed', 658, 1200, [480], '/images/personal/guests-sunset-trimmed.webp'), position: 'center 35%' },
} satisfies Record<string, MgImage>;

/** `sizes` per slot. Shared by src/pages/merzouga-guide.tsx and
 *  scripts/prerender.ts so the static and hydrated pages pick the same file.
 *  Widths follow the page grid (container 992 / 1248 / 1504px at lg / xl / 2xl). */
export const MG_SIZES = {
  hero: '100vw',
  story: '(min-width: 1536px) 840px, (min-width: 1280px) 690px, (min-width: 1024px) 540px, 100vw',
  side: '(min-width: 1536px) 600px, (min-width: 1280px) 490px, (min-width: 1024px) 390px, 100vw',
  card: '(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw',
};

export type MgStoryId = 'erg' | 'camel' | 'camp' | 'fourByFour' | 'people';

/** Story order and the guide(s) each chapter hands over to. */
export const MG_STORY: { id: MgStoryId; guides: string[]; dark?: boolean }[] = [
  { id: 'erg', guides: ['erg-chebbi'] },
  { id: 'camel', guides: ['camel-trekking', 'erg-chebbi-sunrise-sunset'] },
  { id: 'camp', guides: ['desert-camps', 'luxury-desert-camps'], dark: true },
  { id: 'fourByFour', guides: ['4x4-desert-tour', 'quad-biking'] },
  { id: 'people', guides: ['things-to-do'] },
];

export const MG_PACK_GUIDES = ['what-to-pack'];
export type MgBasicsId = 'when' | 'stay' | 'getting';
export const MG_BASICS: { id: MgBasicsId; guides: string[] }[] = [
  { id: 'when', guides: ['best-time-to-visit'] },
  { id: 'stay', guides: ['how-many-days'] },
  { id: 'getting', guides: ['how-to-get-there', 'marrakech-to-merzouga', 'fes-to-merzouga'] },
];
export type MgChooseId = 'standard' | 'luxury' | 'active';
export const MG_CHOOSE: { id: MgChooseId; guide: string }[] = [
  { id: 'standard', guide: 'desert-camps' },
  { id: 'luxury', guide: 'luxury-desert-camps' },
  { id: 'active', guide: '4x4-desert-tour' },
];
export const MG_COMPARISON = 'luxury-camp-vs-standard-camp';

/** The four "Read the guide" cards, shown with each guide's own hero. */
export const MG_FEATURED_GUIDES = ['how-many-days', 'camel-trekking', 'best-time-to-visit', 'what-to-pack'];

/** Every Merzouga guide, grouped for the index. */
export type MgGuideGroupId = 'experiences' | 'planning' | 'places';
export const MG_GUIDE_GROUPS: { id: MgGuideGroupId; slugs: string[] }[] = [
  { id: 'experiences', slugs: ['camel-trekking', 'erg-chebbi-sunrise-sunset', 'desert-camps', 'luxury-desert-camps', '4x4-desert-tour', 'quad-biking', 'things-to-do'] },
  { id: 'planning', slugs: ['how-many-days', 'best-time-to-visit', 'what-to-pack', 'how-to-get-there', 'faq'] },
  { id: 'places', slugs: ['erg-chebbi', 'marrakech-to-merzouga', 'fes-to-merzouga', 'sahara-desert-guide'] },
];

/** Tours that include a night in Merzouga (same list the prerender uses). */
export const MG_TOURS = ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'];
/** Intrinsic sizes of those tours' card images (checked on disk). */
export const MG_TOUR_IMAGE_SIZE: Record<string, [number, number]> = {
  '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp': [1051, 1400],
  '/images/curated/ait-ben-haddou-bridge-town-unesco-morocco.webp': [933, 1400],
};

export type MgStory = { eyebrow: string; heading: string; paragraphs: string[]; alt: string };

export type MgHubCopy = {
  hero: { eyebrow: string; title: string; lead: string; alt: string };
  facts: { label: string; value: string }[];
  /** Labels for the in-page chapter links, in order: camel, camp, 4x4, pack, basics, guides. */
  nav: { label: string; items: [string, string, string, string, string, string] };
  story: Record<MgStoryId, MgStory>;
  pack: {
    eyebrow: string;
    heading: string;
    intro: string;
    groups: { title: string; items: string[] }[];
    alt: string;
  };
  basics: { eyebrow: string; heading: string; items: Record<MgBasicsId, { title: string; body: string }> };
  mistakes: { eyebrow: string; heading: string; items: { title: string; body: string }[] };
  choose: { eyebrow: string; heading: string; items: Record<MgChooseId, { title: string; body: string }>; compare: string };
  guides: { groups: Record<MgGuideGroupId, string>; inEnglish: string; allHeading: string };
  tours: { heading: string };
  /** Accessible label for the list of guide links under a chapter. */
  moreLabel: string;
};
