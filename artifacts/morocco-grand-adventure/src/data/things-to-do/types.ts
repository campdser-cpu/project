// ─────────────────────────────────────────────────────────────────────────────
// "25 Things to Do in Morocco" — the editorial spine of the page.
//
// This file holds only what must never drift: which photograph illustrates each
// thing (and therefore its alt text and intrinsic size, taken from the image's
// own record), which destination it belongs to, and where a reader goes next.
// The words live in src/data/things-to-do/<lang>.ts, authored per language.
//
// Rules this file keeps:
//   • Every image is a verified photograph of the thing it illustrates —
//     official library (src/data/photoLibrary.ts) or catalog
//     (src/data/imageCatalog.ts), so the alt text comes from the record.
//   • Every entry links onward: a destination page plus a guide, experience or
//     departure-city hub. No entry is a dead end, and none invents a fact.
// ─────────────────────────────────────────────────────────────────────────────
import { PHOTO_LIBRARY, photoSrcSet } from '@/data/photoLibrary';
import { IMAGE_CATALOG } from '@/data/imageCatalog';

export type ThingImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
};

export type LinkKind = 'guide' | 'experience' | 'tours' | 'destination' | 'about';

export type GroupKey = 'sahara' | 'marrakech' | 'fes' | 'south' | 'coast' | 'culture';

export type Thing = {
  /** Stable id — the key the localized copy is written against. */
  id: string;
  /** Section of the page this entry belongs to. */
  group: GroupKey;
  /** Destination id in content.ts; its localized name is the "where" label. */
  destination: string;
  /** Onward link (guide, experience hub or departure-city hub). */
  link: string;
  /** Which localized label the onward link uses. */
  linkKey: LinkKind;
  image: ThingImage;
};

/** Library photograph as a responsive image (alt and size from its record). */
function fromLibrary(assetId: string): ThingImage {
  const a = PHOTO_LIBRARY[assetId];
  if (!a || !a.src) throw new Error(`things-to-do: ${assetId} is not published`);
  return {
    src: a.src,
    srcSet: photoSrcSet(a) ?? '',
    width: a.width ?? 1600,
    height: a.height ?? 1067,
    alt: a.alt,
  };
}

/** Catalog photograph, same contract (its own alt, width and height). */
function fromCatalog(id: string): ThingImage {
  const c = IMAGE_CATALOG[id];
  if (!c) throw new Error(`things-to-do: no catalog image ${id}`);
  return {
    src: c.src,
    srcSet: `${c.src.replace('.webp', '-480w.webp')} 480w, ${c.src.replace('.webp', '-768w.webp')} 768w, ${c.src} ${c.width}w`,
    width: c.width,
    height: c.height,
    alt: c.alt,
  };
}

/** A curated photograph with measured dimensions and authored alt text. */
function curated(name: string, width: number, height: number, alt: string): ThingImage {
  const src = `/images/curated/${name}.webp`;
  return {
    src,
    srcSet: `${src.replace('.webp', '-480w.webp')} 480w, ${src.replace('.webp', '-768w.webp')} 768w, ${src} ${width}w`,
    width,
    height,
    alt,
  };
}

/** The twenty-five, in the order the page tells them. */
export const THINGS: Thing[] = [
  // ── The Sahara ────────────────────────────────────────────────────────────
  { id: 'camel-trek', group: 'sahara', destination: 'merzouga', link: '/merzouga-guide/camel-trekking', linkKey: 'guide', image: fromLibrary('MGA-001') },
  { id: 'desert-camp', group: 'sahara', destination: 'merzouga', link: '/luxury-camp', linkKey: 'experience', image: fromCatalog('luxury-desert-camp-sunset-merzouga') },
  { id: 'dune-sunrise', group: 'sahara', destination: 'erg-chebbi', link: '/merzouga-guide/best-time-to-visit', linkKey: 'guide', image: fromLibrary('MGA-029') },
  { id: 'stargazing', group: 'sahara', destination: 'merzouga', link: '/merzouga-guide/things-to-do', linkKey: 'guide', image: fromCatalog('sahara-bivouac-stars-merzouga') },
  { id: 'dune-driving', group: 'sahara', destination: 'merzouga', link: '/4x4-tours', linkKey: 'experience', image: fromLibrary('MGA-006') },
  { id: 'quad-biking', group: 'sahara', destination: 'erg-chebbi', link: '/merzouga-guide/quad-biking', linkKey: 'guide', image: fromLibrary('MGA-002') },
  // ── Marrakech ─────────────────────────────────────────────────────────────
  { id: 'jemaa-el-fna', group: 'marrakech', destination: 'marrakech', link: '/marrakech-tours', linkKey: 'tours', image: fromLibrary('MGA-017') },
  { id: 'marrakech-souks', group: 'marrakech', destination: 'marrakech', link: '/destinations/marrakech', linkKey: 'destination', image: fromLibrary('MGA-027') },
  { id: 'ben-youssef', group: 'marrakech', destination: 'marrakech', link: '/destinations/marrakech', linkKey: 'destination', image: fromLibrary('MGA-013') },
  // ── Fes ───────────────────────────────────────────────────────────────────
  { id: 'fes-medina', group: 'fes', destination: 'fes', link: '/fes-tours', linkKey: 'tours', image: fromLibrary('MGA-038') },
  { id: 'tanneries', group: 'fes', destination: 'fes', link: '/destinations/fes', linkKey: 'destination', image: curated('tannery-workers-dyeing-pits-fes', 933, 1400, 'Workers treating leather hides among the dyeing pits of a traditional Fes tannery') },
  { id: 'medina-crafts', group: 'fes', destination: 'fes', link: '/destinations/fes', linkKey: 'destination', image: fromLibrary('MGA-015') },
  // ── The road south ────────────────────────────────────────────────────────
  { id: 'tichka-road', group: 'south', destination: 'ouarzazate', link: '/destinations/ouarzazate', linkKey: 'destination', image: fromLibrary('MGA-016') },
  { id: 'ait-ben-haddou', group: 'south', destination: 'ait-ben-haddou', link: '/destinations/ait-ben-haddou', linkKey: 'destination', image: fromLibrary('MGA-035') },
  { id: 'todra-gorge', group: 'south', destination: 'todra-gorge', link: '/destinations/todra-gorge', linkKey: 'destination', image: fromLibrary('MGA-026') },
  { id: 'dades-valley', group: 'south', destination: 'dades-valley', link: '/destinations/dades-valley', linkKey: 'destination', image: fromLibrary('MGA-040') },
  { id: 'draa-palms', group: 'south', destination: 'draa-valley', link: '/destinations/draa-valley', linkKey: 'destination', image: fromCatalog('draa-valley-oasis-palm-grove') },
  // ── North and coast ───────────────────────────────────────────────────────
  { id: 'chefchaouen', group: 'coast', destination: 'chefchaouen', link: '/destinations/chefchaouen', linkKey: 'destination', image: fromLibrary('MGA-019') },
  { id: 'essaouira', group: 'coast', destination: 'essaouira', link: '/destinations/essaouira', linkKey: 'destination', image: fromCatalog('essaouira-sqala-du-port-atlantic') },
  { id: 'surfing', group: 'coast', destination: 'taghazout', link: '/destinations/taghazout', linkKey: 'destination', image: fromLibrary('MGA-012') },
  { id: 'agadir-beach', group: 'coast', destination: 'agadir', link: '/agadir-tours', linkKey: 'tours', image: fromLibrary('MGA-032') },
  { id: 'hassan-ii', group: 'coast', destination: 'casablanca', link: '/casablanca-tours', linkKey: 'tours', image: fromCatalog('hassan-ii-mosque-casablanca') },
  // ── Culture and the table ─────────────────────────────────────────────────
  { id: 'amazigh-music', group: 'culture', destination: 'merzouga', link: '/destinations/merzouga', linkKey: 'destination', image: fromCatalog('amazigh-music-ceremony') },
  { id: 'mint-tea', group: 'culture', destination: 'merzouga', link: '/about', linkKey: 'about', image: fromLibrary('MGA-014') },
  { id: 'moroccan-table', group: 'culture', destination: 'fes', link: '/destinations/fes', linkKey: 'destination', image: fromCatalog('moroccan-mezze-couscous-tagine') },
];

/** Copy authored per language for the page and its twenty-five entries. */
export type ThingsCopy = {
  /** <h1> and the lead paragraph under it. */
  heading: string;
  intro: string;
  /** Short label above the list, e.g. "Where to start". */
  kicker: string;
  /** Closing invitation above the CTA. */
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  /** Label for the onward link under each entry. */
  links: Record<LinkKind, string>;
  /** Section headings, in page order. */
  groups: Record<GroupKey, string>;
  /** Per-entry copy, keyed by Thing.id. */
  items: Record<string, { title: string; body: string; tip: string }>;
};
