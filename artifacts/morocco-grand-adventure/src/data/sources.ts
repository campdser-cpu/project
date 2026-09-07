// ─────────────────────────────────────────────────────────────────────────────
// Sources — internal editorial fact database.
//
// Maps key factual claims on the site to the strongest available source, per
// the source hierarchy: official/primary sources first (UNESCO, ONMT), then
// reputable editorial sources. This file is editorial infrastructure: it does
// NOT render on every page. Pages cite a source only when the citation
// genuinely helps the traveler (descriptive anchor, normal HTML link).
//
// `lastVerified` prevents stale facts: any claim tied to a source here must be
// re-checked against that source before the date is rolled forward.
// ─────────────────────────────────────────────────────────────────────────────

export type SourceType = 'official-tourism' | 'unesco' | 'editorial' | 'institution' | 'transport-operator';

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: SourceType;
  /** When we last verified facts cited to this source. */
  lastVerified: string; // e.g. 'September 2026'
  topics: string[];
};

export const SOURCES: Record<string, Source> = {
  'unesco-whc': {
    id: 'unesco-whc',
    title: 'UNESCO World Heritage List — Morocco',
    publisher: 'UNESCO World Heritage Centre',
    url: 'https://whc.unesco.org/en/statesparties/ma',
    sourceType: 'unesco',
    lastVerified: 'September 2026',
    topics: ['ait-ben-haddou', 'marrakech', 'fes', 'essaouira', 'rabat', 'meknes', 'tetouan', 'volubilis', 'el-jadida', 'world-heritage'],
  },
  'unesco-ait-ben-haddou': {
    id: 'unesco-ait-ben-haddou',
    title: 'Ksar of Aït-Ben-Haddou — UNESCO World Heritage Centre',
    publisher: 'UNESCO World Heritage Centre',
    url: 'https://whc.unesco.org/en/list/444',
    sourceType: 'unesco',
    lastVerified: 'September 2026',
    topics: ['ait-ben-haddou', 'ouarzazate', 'kasbahs'],
  },
  'unesco-marrakech-medina': {
    id: 'unesco-marrakech-medina',
    title: 'Medina of Marrakesh — UNESCO World Heritage Centre',
    publisher: 'UNESCO World Heritage Centre',
    url: 'https://whc.unesco.org/en/list/331',
    sourceType: 'unesco',
    lastVerified: 'September 2026',
    topics: ['marrakech', 'jemaa-el-fna', 'medina'],
  },
  'unesco-essaouira': {
    id: 'unesco-essaouira',
    title: 'Medina of Essaouira (formerly Mogador) — UNESCO World Heritage Centre',
    publisher: 'UNESCO World Heritage Centre',
    url: 'https://whc.unesco.org/en/list/753',
    sourceType: 'unesco',
    lastVerified: 'September 2026',
    topics: ['essaouira', 'medina'],
  },
  'onmt': {
    id: 'onmt',
    title: 'Visit Morocco — official website of the Moroccan National Tourist Office',
    publisher: 'ONMT (Moroccan National Tourist Office)',
    url: 'https://www.visitmorocco.com/',
    sourceType: 'official-tourism',
    lastVerified: 'September 2026',
    topics: ['morocco-general', 'destinations', 'culture', 'gastronomy', 'transport'],
  },
  'onmt-merzouga-region': {
    id: 'onmt-merzouga-region',
    title: 'Visit Morocco — Errachidia–Midelt–Merzouga region',
    publisher: 'ONMT (Moroccan National Tourist Office)',
    url: 'https://www.visitmorocco.com/en/trip/regions/errachidia-midelt-merzouga',
    sourceType: 'official-tourism',
    lastVerified: 'September 2026',
    topics: ['merzouga', 'erg-chebbi', 'sahara'],
  },
  'lonely-planet-morocco': {
    id: 'lonely-planet-morocco',
    title: 'Lonely Planet — Morocco travel guide',
    publisher: 'Lonely Planet',
    url: 'https://www.lonelyplanet.com/morocco',
    sourceType: 'editorial',
    lastVerified: 'September 2026',
    topics: ['morocco-general', 'planning', 'best-time'],
  },
  'natgeo-travel': {
    id: 'natgeo-travel',
    title: 'National Geographic Travel',
    publisher: 'National Geographic',
    url: 'https://www.nationalgeographic.com/travel',
    sourceType: 'editorial',
    lastVerified: 'September 2026',
    topics: ['morocco-general', 'responsible-travel', 'culture'],
  },
};

/** Pick sources relevant to a topic string (for page citation blocks). */
export function sourcesForTopics(...topics: string[]): Source[] {
  return Object.values(SOURCES).filter((s) => topics.some((t) => s.topics.includes(t)));
}

/**
 * Sources for destination ids — maps a destination to its strongest reference.
 * Only destinations with a genuinely authoritative primary source are listed;
 * we never attach a citation that is weaker than the claim it supports.
 */
export const DESTINATION_SOURCES: Record<string, string[]> = {
  'ait-ben-haddou': ['unesco-ait-ben-haddou'],
  marrakech: ['unesco-marrakech-medina'],
  essaouira: ['unesco-essaouira'],
  merzouga: ['onmt-merzouga-region'],
  'erg-chebbi': ['onmt-merzouga-region'],
};
