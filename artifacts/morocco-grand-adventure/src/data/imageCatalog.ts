// ─────────────────────────────────────────────────────────────────────────────
// Image Catalog — manifest of the 31 curated photographs from the official
// Morocco Grand Adventure photo catalog.
//
// Each entry is the single source of truth for filename, intrinsic dimensions,
// natural-language alt text and semantic placement.
//
// Alt text is written from the catalog's own descriptions — descriptive and
// unique per image, never keyword-stuffed.
// ─────────────────────────────────────────────────────────────────────────────

export type CatalogImage = {
  /** url of the full-size webp */
  src: string;
  file: string;
  width: number;
  height: number;
  /** natural alt text (unique per image) */
  alt: string;
  /** human caption shown under the figure */
  caption: string;
  category: 'desert' | 'heritage' | 'city' | 'coast' | 'food' | 'culture';
  /** destination ids these images reinforce (src/data/content.ts) */
  destinations: string[];
};

export const IMAGE_CATALOG: Record<string, CatalogImage> = {
  'berber-camel-guide-sahara-merzouga': {
    src: '/images/catalog/berber-camel-guide-sahara-merzouga.webp', file: 'berber-camel-guide-sahara-merzouga.webp',
    width: 600, height: 900,
    alt: 'Berber camel guide in a blue djellaba leading a camel across the Sahara sand near Merzouga',
    caption: 'A local cameleer leads his camel across the sand near Merzouga.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'berber-child-baby-goat-village': {
    src: '/images/catalog/berber-child-baby-goat-village.webp', file: 'berber-child-baby-goat-village.webp',
    width: 500, height: 678,
    alt: 'Berber child holding a baby goat outside a village house in southern Morocco',
    caption: 'Village life in southern Morocco — a child with a baby goat.',
    category: 'culture', destinations: ['merzouga', 'draa-valley'],
  },
  'amazigh-woman-berber-jewellery': {
    src: '/images/catalog/amazigh-woman-berber-jewellery.webp', file: 'amazigh-woman-berber-jewellery.webp',
    width: 1062, height: 1327,
    alt: 'Amazigh woman wearing traditional Berber silver jewellery and headpiece',
    caption: 'Traditional Amazigh silver jewellery, worn for celebrations.',
    category: 'culture', destinations: ['marrakech', 'merzouga'],
  },
  'ait-ben-haddou-ouarzazate-unesco': {
    src: '/images/catalog/ait-ben-haddou-ouarzazate-unesco.webp', file: 'ait-ben-haddou-ouarzazate-unesco.webp',
    width: 720, height: 1280,
    alt: 'Earthen ramparts and towers of the Ksar of Aït Ben Haddou near Ouarzazate',
    caption: 'The earthen walls of Aït Ben Haddou, a UNESCO World Heritage Site.',
    category: 'heritage', destinations: ['ait-ben-haddou', 'ouarzazate'],
  },
  'ancient-berber-kasbah-ruins-southern-morocco': {
    src: '/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp', file: 'ancient-berber-kasbah-ruins-southern-morocco.webp',
    width: 1280, height: 1707,
    alt: 'Weathered mud-brick towers of an ancient Berber kasbah in southern Morocco',
    caption: 'Ruins of an old Berber kasbah along the Route of the Kasbahs.',
    category: 'heritage', destinations: ['ouarzazate', 'skoura', 'draa-valley'],
  },
  'moroccan-cliff-dwellings-rock-cut': {
    src: '/images/catalog/moroccan-cliff-dwellings-rock-cut.webp', file: 'moroccan-cliff-dwellings-rock-cut.webp',
    width: 1280, height: 1707,
    alt: 'Historic dwellings built into a rocky cliff face in southern Morocco',
    caption: 'Dwellings carved into the rock, sheltered by the cliff face.',
    category: 'heritage', destinations: ['ouarzazate', 'nkob'],
  },
  'hassan-ii-mosque-casablanca': {
    src: '/images/catalog/hassan-ii-mosque-casablanca.webp', file: 'hassan-ii-mosque-casablanca.webp',
    width: 1080, height: 1440,
    alt: 'The Hassan II Mosque rising above the ocean front in Casablanca',
    caption: 'Hassan II Mosque, built partly over the Atlantic in Casablanca.',
    category: 'city', destinations: ['casablanca'],
  },
  'luxury-desert-camp-sunset-merzouga': {
    src: '/images/catalog/luxury-desert-camp-sunset-merzouga.webp', file: 'luxury-desert-camp-sunset-merzouga.webp',
    width: 1080, height: 1440,
    alt: 'Luxury desert camp tents glowing at sunset among the dunes of Merzouga',
    caption: 'A luxury camp glowing at sunset in the Erg Chebbi dunes.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'chefchaouen-blue-city-rif': {
    src: '/images/catalog/chefchaouen-blue-city-rif.webp', file: 'chefchaouen-blue-city-rif.webp',
    width: 1200, height: 1800,
    alt: 'Blue-washed lane winding uphill through the medina of Chefchaouen',
    caption: 'The famous blue lanes of Chefchaouen in the Rif Mountains.',
    category: 'city', destinations: ['chefchaouen'],
  },
  'moroccan-night-spice-herb-market': {
    src: '/images/catalog/moroccan-night-spice-herb-market.webp', file: 'moroccan-night-spice-herb-market.webp',
    width: 1280, height: 853,
    alt: 'Spice and herb stall lit by warm lamps in a Moroccan market at night',
    caption: 'A spice and herb stall under the lamps of a night market.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'jemaa-el-fna-night-marrakech': {
    src: '/images/catalog/jemaa-el-fna-night-marrakech.webp', file: 'jemaa-el-fna-night-marrakech.webp',
    width: 1080, height: 1440,
    alt: 'Crowds and food stalls filling Jemaa el-Fna square in Marrakech at night',
    caption: 'Jemaa el-Fna at night — food stalls, music and crowds.',
    category: 'city', destinations: ['marrakech'],
  },
  'sahara-dune-trekking-merzouga': {
    src: '/images/catalog/sahara-dune-trekking-merzouga.webp', file: 'sahara-dune-trekking-merzouga.webp',
    width: 1280, height: 853,
    alt: 'Trekkers climbing the crest of a tall Sahara dune near Merzouga',
    caption: 'Climbing a dune crest on foot near Merzouga.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'menara-gardens-pavilion-marrakech': {
    src: '/images/catalog/menara-gardens-pavilion-marrakech.webp', file: 'menara-gardens-pavilion-marrakech.webp',
    width: 1080, height: 1440,
    alt: 'The green-tiled Menara pavilion reflected in its basin with the Atlas behind, Marrakech',
    caption: 'The Menara pavilion and its reflecting pool, with the Atlas beyond.',
    category: 'heritage', destinations: ['marrakech'],
  },
  'hassan-ii-mosque-doorway-casablanca': {
    src: '/images/catalog/hassan-ii-mosque-doorway-casablanca.webp', file: 'hassan-ii-mosque-doorway-casablanca.webp',
    width: 1280, height: 853,
    alt: 'Ornately carved wooden doorway of the Hassan II Mosque in Casablanca',
    caption: 'Carved cedar doorway detail, Hassan II Mosque.',
    category: 'heritage', destinations: ['casablanca'],
  },
  'grotte-assif-n-el-hed-river-cave': {
    src: '/images/catalog/grotte-assif-n-el-hed-river-cave.webp', file: 'grotte-assif-n-el-hed-river-cave.webp',
    width: 1080, height: 1350,
    alt: "Visitor walking through the lit river cave of Grotte Assif n'El Hed",
    caption: "Inside the river cave of Grotte Assif n'El Hed.",
    category: 'heritage', destinations: ['chefchaouen', 'akchour'],
  },
  'draa-valley-oasis-palm-grove': {
    src: '/images/catalog/draa-valley-oasis-palm-grove.webp', file: 'draa-valley-oasis-palm-grove.webp',
    width: 1280, height: 853,
    alt: 'Dense palm grove of the Draa Valley oasis stretching toward the mountains',
    caption: 'Palm groves of the Draa Valley oasis.',
    category: 'heritage', destinations: ['draa-valley', 'agadir', 'zagora'],
  },
  'essaouira-sqala-du-port-atlantic': {
    src: '/images/catalog/essaouira-sqala-du-port-atlantic.webp', file: 'essaouira-sqala-du-port-atlantic.webp',
    width: 1280, height: 1600,
    alt: 'Stone Sqala du Port ramparts and cannons facing the Atlantic in Essaouira',
    caption: "The Sqala du Port, watching over Essaouira's Atlantic harbour.",
    category: 'coast', destinations: ['essaouira'],
  },
  'sahara-bivouac-stars-merzouga': {
    src: '/images/catalog/sahara-bivouac-stars-merzouga.webp', file: 'sahara-bivouac-stars-merzouga.webp',
    width: 853, height: 853,
    alt: 'Traditional Saharan bivouac under a sky full of stars near Merzouga',
    caption: 'A bivouac under the stars of the Erg Chebbi sky.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'medina-agadir-heritage': {
    src: '/images/catalog/medina-agadir-heritage.webp', file: 'medina-agadir-heritage.webp',
    width: 1080, height: 1350,
    alt: 'Rebuilt heritage medina walls and gateway in Agadir',
    caption: "The rebuilt heritage medina on Agadir's hillside.",
    category: 'coast', destinations: ['agadir'],
  },
  'fennec-fox-sahara-wildlife': {
    src: '/images/catalog/fennec-fox-sahara-wildlife.webp', file: 'fennec-fox-sahara-wildlife.webp',
    width: 1080, height: 721,
    alt: 'Fennec fox with large ears resting on Sahara sand',
    caption: "The fennec fox — the Sahara's smallest wild resident.",
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'olive-preserved-lemon-market-stall': {
    src: '/images/catalog/olive-preserved-lemon-market-stall.webp', file: 'olive-preserved-lemon-market-stall.webp',
    width: 1280, height: 853,
    alt: 'Baskets of olives and preserved lemons on a Moroccan market stall',
    caption: 'Olives and preserved lemons — staples of the Moroccan larder.',
    category: 'food', destinations: ['marrakech', 'fes', 'essaouira'],
  },
  'moroccan-vegetable-tagine': {
    src: '/images/catalog/moroccan-vegetable-tagine.webp', file: 'moroccan-vegetable-tagine.webp',
    width: 1280, height: 853,
    alt: 'Vegetable tagine steaming in its conical clay pot',
    caption: 'A vegetable tagine, cooked slowly in its conical pot.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'moroccan-mezze-couscous-tagine': {
    src: '/images/catalog/moroccan-mezze-couscous-tagine.webp', file: 'moroccan-mezze-couscous-tagine.webp',
    width: 1280, height: 1600,
    alt: 'Moroccan mezze spread with couscous and tagine dishes on a woven mat',
    caption: 'A mezze spread with couscous and tagine.',
    category: 'food', destinations: ['marrakech', 'fes', 'rabat', 'casablanca'],
  },
  'moroccan-tagine-salads-clay-bowls': {
    src: '/images/catalog/moroccan-tagine-salads-clay-bowls.webp', file: 'moroccan-tagine-salads-clay-bowls.webp',
    width: 1200, height: 1800,
    alt: 'Tagine and cooked salads served in small clay bowls on a Moroccan table',
    caption: 'Cooked salads and tagine served in clay bowls.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'tbourida-fantasia-marrakech': {
    src: '/images/catalog/tbourida-fantasia-marrakech.webp', file: 'tbourida-fantasia-marrakech.webp',
    width: 1200, height: 1800,
    alt: 'Horsemen in traditional dress firing muskets during a Tbourida fantasia performance',
    caption: "Tbourida — the horsemen's musket volley, a Moroccan tradition.",
    category: 'culture', destinations: ['marrakech'],
  },
  'moroccan-riad-breakfast': {
    src: '/images/catalog/moroccan-riad-breakfast.webp', file: 'moroccan-riad-breakfast.webp',
    width: 1200, height: 1800,
    alt: 'Moroccan riad breakfast with msemen, jams, olives and mint tea',
    caption: 'A riad breakfast — msemen, jams and mint tea.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'moroccan-fine-dining-riad': {
    src: '/images/catalog/moroccan-fine-dining-riad.webp', file: 'moroccan-fine-dining-riad.webp',
    width: 1201, height: 1800,
    alt: 'Fine Moroccan dining table set in a candle-lit riad courtyard',
    caption: 'Dinner by candlelight in a riad courtyard.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'moroccan-mint-tea-riad': {
    src: '/images/catalog/moroccan-mint-tea-riad.webp', file: 'moroccan-mint-tea-riad.webp',
    width: 1201, height: 1800,
    alt: 'Host pouring Moroccan mint tea from a silver teapot into small glasses in a riad',
    caption: 'Mint tea poured high — the ritual of Moroccan hospitality.',
    category: 'food', destinations: ['marrakech', 'merzouga'],
  },
  'moroccan-pastries-sweets': {
    src: '/images/catalog/moroccan-pastries-sweets.webp', file: 'moroccan-pastries-sweets.webp',
    width: 1200, height: 1800,
    alt: 'Tray of Moroccan pastries and sweets dusted with sesame and almond',
    caption: 'Pastries and sweets — almond, sesame and honey.',
    category: 'food', destinations: ['marrakech', 'fes', 'rabat'],
  },
  'amazigh-music-ceremony': {
    src: '/images/catalog/amazigh-music-ceremony.webp', file: 'amazigh-music-ceremony.webp',
    width: 1280, height: 850,
    alt: 'Amazigh musicians playing drums and strings at an outdoor ceremony',
    caption: 'Amazigh musicians at an outdoor celebration.',
    category: 'culture', destinations: ['merzouga', 'marrakech'],
  },
  'moroccan-palace-ceiling-muqarnas': {
    src: '/images/catalog/moroccan-palace-ceiling-muqarnas.webp', file: 'moroccan-palace-ceiling-muqarnas.webp',
    width: 1280, height: 1600,
    alt: 'Intricately carved muqarnas cedar ceiling of a Moroccan palace',
    caption: 'A muqarnas cedar ceiling — zellij and carved plaster around it.',
    category: 'heritage', destinations: ['marrakech', 'fes'],
  },
};

/** Stable list, catalog order. */
export const CATALOG_IDS = Object.keys(IMAGE_CATALOG);

/**
 * Canonical food photograph per destination, used by the Local Food section of
 * destination pages and the prerendered destination content. Values reference
 * catalog ids so image, destination, heading and alt stay in sync.
 */
export const DEST_FOOD_IMAGE: Record<string, string> = {
  marrakech: 'moroccan-night-spice-herb-market',
  fes: 'moroccan-vegetable-tagine',
  essaouira: 'olive-preserved-lemon-market-stall',
  rabat: 'moroccan-pastries-sweets',
  casablanca: 'moroccan-mezze-couscous-tagine',
  merzouga: 'moroccan-mint-tea-riad',
};

/** All catalog images that reinforce a given destination id. */
export function imagesForDestination(id: string): CatalogImage[] {
  return Object.values(IMAGE_CATALOG).filter((i) => i.destinations.includes(id));
}

/** Get one catalog image by id. */
export function catalogImage(id: string): CatalogImage | undefined {
  return IMAGE_CATALOG[id];
}
