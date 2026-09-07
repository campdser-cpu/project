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
  'jemaa-el-fna-night-marrakech': {
    src: '/images/catalog/jemaa-el-fna-night-marrakech.webp', file: 'jemaa-el-fna-night-marrakech.webp',
    width: 1080, height: 1440,
    alt: 'Crowds and food stalls filling Jemaa el-Fna square in Marrakech at night, the Koutoubia minaret beyond',
    caption: 'Jemaa el-Fna at night — food stalls, music and crowds.',
    category: 'city', destinations: ['marrakech'],
  },
  'menara-gardens-pavilion-marrakech': {
    src: '/images/catalog/menara-gardens-pavilion-marrakech.webp', file: 'menara-gardens-pavilion-marrakech.webp',
    width: 1080, height: 1440,
    alt: 'The green-tiled Menara pavilion reflected in its basin with the Atlas behind, Marrakech',
    caption: 'The Menara pavilion and its reflecting pool, with the Atlas beyond.',
    category: 'heritage', destinations: ['marrakech'],
  },
  'tbourida-fantasia-marrakech': {
    src: '/images/catalog/tbourida-fantasia-marrakech.webp', file: 'tbourida-fantasia-marrakech.webp',
    width: 1200, height: 1800,
    alt: 'Tbourida rider in ceremonial dress on horseback with a raised musket, the Koutoubia minaret of Marrakech behind',
    caption: 'Tbourida — a ceremonial horseman with his musket, Marrakech.',
    category: 'culture', destinations: ['marrakech'],
  },
  'moroccan-palace-ceiling-muqarnas': {
    src: '/images/catalog/moroccan-palace-ceiling-muqarnas.webp', file: 'moroccan-palace-ceiling-muqarnas.webp',
    width: 1280, height: 1600,
    alt: 'Intricately carved muqarnas cedar ceiling of a Moroccan palace',
    caption: 'A muqarnas cedar ceiling — zellij and carved plaster around it.',
    category: 'heritage', destinations: ['marrakech', 'fes'],
  },
  'moroccan-night-spice-herb-market': {
    src: '/images/catalog/moroccan-night-spice-herb-market.webp', file: 'moroccan-night-spice-herb-market.webp',
    width: 1280, height: 853,
    alt: 'Spice and herb stall lit by warm lamps in a Moroccan market at night',
    caption: 'A spice and herb stall under the lamps of a night market.',
    category: 'food', destinations: ['marrakech'],
  },
  'moroccan-riad-breakfast': {
    src: '/images/catalog/moroccan-riad-breakfast.webp', file: 'moroccan-riad-breakfast.webp',
    width: 1200, height: 1800,
    alt: 'Riad breakfast table with msemen flatbread, hand-painted ceramic tagine servers and coffee',
    caption: 'A riad breakfast — msemen and painted ceramic tagine servers.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'moroccan-fine-dining-riad': {
    src: '/images/catalog/moroccan-fine-dining-riad.webp', file: 'moroccan-fine-dining-riad.webp',
    width: 1201, height: 1800,
    alt: 'Waiter in a green djellaba and red tarbouche presenting a full spread of Moroccan dishes on a round riad table',
    caption: 'Fine Moroccan dining — a full spread served in a riad.',
    category: 'food', destinations: ['marrakech'],
  },
  'moroccan-mint-tea-riad': {
    src: '/images/catalog/moroccan-mint-tea-riad.webp', file: 'moroccan-mint-tea-riad.webp',
    width: 1201, height: 1800,
    alt: 'Guests sharing a glass of mint tea across a richly laid riad dining table',
    caption: 'Sharing mint tea — the ritual of Moroccan hospitality.',
    category: 'food', destinations: ['marrakech'],
  },
  'moroccan-pastries-sweets': {
    src: '/images/catalog/moroccan-pastries-sweets.webp', file: 'moroccan-pastries-sweets.webp',
    width: 1200, height: 1800,
    alt: 'Woman holding a gift box of assorted Moroccan pastries — almond, coconut and sesame sweets',
    caption: 'A gift box of Moroccan pastries — almond, coconut and honey.',
    category: 'food', destinations: ['marrakech', 'fes'],
  },
  'olive-preserved-lemon-market-stall': {
    src: '/images/catalog/olive-preserved-lemon-market-stall.webp', file: 'olive-preserved-lemon-market-stall.webp',
    width: 1280, height: 853,
    alt: 'Baskets of olives and preserved lemons on a Moroccan market stall',
    caption: 'Olives and preserved lemons — staples of the Moroccan larder.',
    category: 'food', destinations: ['marrakech'],
  },
  'moroccan-vegetable-tagine': {
    src: '/images/catalog/moroccan-vegetable-tagine.webp', file: 'moroccan-vegetable-tagine.webp',
    width: 1280, height: 853,
    alt: 'Vegetable tagine steaming in its conical clay pot',
    caption: 'A vegetable tagine, cooked slowly in its conical pot.',
    category: 'food', destinations: ['marrakech'],
  },
  'moroccan-mezze-couscous-tagine': {
    src: '/images/catalog/moroccan-mezze-couscous-tagine.webp', file: 'moroccan-mezze-couscous-tagine.webp',
    width: 1280, height: 1600,
    alt: 'Moroccan mezze spread with dips, couscous and tagine dishes on a wooden table',
    caption: 'A mezze spread with couscous and tagine.',
    category: 'food', destinations: ['marrakech'],
  },
  'moroccan-tagine-salads-clay-bowls': {
    src: '/images/catalog/moroccan-tagine-salads-clay-bowls.webp', file: 'moroccan-tagine-salads-clay-bowls.webp',
    width: 1200, height: 1800,
    alt: 'Tagine and cooked salads served in small clay bowls on a Moroccan table',
    caption: 'Cooked salads and tagine served in clay bowls.',
    category: 'food', destinations: ['marrakech'],
  },
  'hassan-ii-mosque-casablanca': {
    src: '/images/catalog/hassan-ii-mosque-casablanca.webp', file: 'hassan-ii-mosque-casablanca.webp',
    width: 1080, height: 1440,
    alt: 'The Hassan II Mosque rising above the ocean front in Casablanca',
    caption: 'Hassan II Mosque, built partly over the Atlantic in Casablanca.',
    category: 'city', destinations: ['casablanca'],
  },
  'hassan-ii-mosque-doorway-casablanca': {
    src: '/images/catalog/hassan-ii-mosque-doorway-casablanca.webp', file: 'hassan-ii-mosque-doorway-casablanca.webp',
    width: 1280, height: 853,
    alt: 'Ornate pointed-arch doorway of the Hassan II Mosque in Casablanca — carved marble arabesques, geometric metalwork doors and zellige tilework',
    caption: 'Carved doorway detail, Hassan II Mosque.',
    category: 'heritage', destinations: ['casablanca'],
  },
  'chefchaouen-blue-city-rif': {
    src: '/images/catalog/chefchaouen-blue-city-rif.webp', file: 'chefchaouen-blue-city-rif.webp',
    width: 1200, height: 1800,
    alt: 'The blue-washed medina of Chefchaouen cascading down the hillside in the Rif Mountains',
    caption: 'The blue medina of Chefchaouen cascading down the hillside in the Rif Mountains.',
    category: 'city', destinations: ['chefchaouen'],
  },
  'grotte-assif-n-el-hed-river-cave': {
    src: '/images/catalog/grotte-assif-n-el-hed-river-cave.webp', file: 'grotte-assif-n-el-hed-river-cave.webp',
    width: 1080, height: 1350,
    alt: "Sunlight falling into the river gorge and cave of Grotte Assif n'El Hed",
    caption: "Inside the river cave of Grotte Assif n'El Hed.",
    category: 'heritage', destinations: ['chefchaouen', 'akchour'],
  },
  'essaouira-sqala-du-port-atlantic': {
    src: '/images/catalog/essaouira-sqala-du-port-atlantic.webp', file: 'essaouira-sqala-du-port-atlantic.webp',
    width: 1280, height: 1600,
    alt: 'Stone Sqala du Port ramparts and cannons facing the Atlantic in Essaouira',
    caption: "The Sqala du Port, watching over Essaouira's Atlantic harbour.",
    category: 'coast', destinations: ['essaouira'],
  },
  'medina-agadir-heritage': {
    src: '/images/catalog/medina-agadir-heritage.webp', file: 'medina-agadir-heritage.webp',
    width: 1080, height: 1350,
    alt: 'Rebuilt heritage medina walls and gateway in Agadir',
    caption: "The rebuilt heritage medina on Agadir's hillside.",
    category: 'coast', destinations: ['agadir'],
  },
  'ait-ben-haddou-ouarzazate-unesco': {
    src: '/images/catalog/ait-ben-haddou-ouarzazate-unesco.webp', file: 'ait-ben-haddou-ouarzazate-unesco.webp',
    width: 720, height: 1280,
    alt: 'Earthen ramparts and towers of the Ksar of Aït Ben Haddou near Ouarzazate',
    caption: 'The earthen walls of Aït Ben Haddou, a UNESCO World Heritage Site.',
    category: 'heritage', destinations: ['ait-ben-haddou', 'ouarzazate'],
  },
  'draa-valley-oasis-palm-grove': {
    src: '/images/catalog/draa-valley-oasis-palm-grove.webp', file: 'draa-valley-oasis-palm-grove.webp',
    width: 1280, height: 853,
    alt: 'Dense palm grove of the Draa Valley oasis stretching toward the mountains',
    caption: 'Palm groves of the Draa Valley oasis.',
    category: 'heritage', destinations: ['draa-valley', 'zagora'],
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
    category: 'heritage', destinations: ['nkob'],
  },
  'berber-camel-guide-sahara-merzouga': {
    src: '/images/catalog/berber-camel-guide-sahara-merzouga.webp', file: 'berber-camel-guide-sahara-merzouga.webp',
    width: 600, height: 900,
    alt: 'Berber camel guide in a blue djellaba leading a camel across the Sahara sand near Merzouga',
    caption: 'A local cameleer leads his camel across the sand near Merzouga.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'sahara-dune-trekking-merzouga': {
    src: '/images/catalog/sahara-dune-trekking-merzouga.webp', file: 'sahara-dune-trekking-merzouga.webp',
    width: 1280, height: 853,
    alt: 'Trekkers climbing the crest of a tall Sahara dune near Merzouga',
    caption: 'Climbing a dune crest on foot near Merzouga.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'luxury-desert-camp-sunset-merzouga': {
    src: '/images/catalog/luxury-desert-camp-sunset-merzouga.webp', file: 'luxury-desert-camp-sunset-merzouga.webp',
    width: 1080, height: 1440,
    alt: 'Luxury desert camp tents glowing at sunset among the dunes of Merzouga',
    caption: 'A luxury camp glowing at sunset in the Erg Chebbi dunes.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'sahara-bivouac-stars-merzouga': {
    src: '/images/catalog/sahara-bivouac-stars-merzouga.webp', file: 'sahara-bivouac-stars-merzouga.webp',
    width: 853, height: 853,
    alt: 'Saharan bivouac lounge with lanterns, carpets and a thatched canopy at dusk near Merzouga',
    caption: 'A lantern-lit bivouac in the Erg Chebbi sands at dusk.',
    category: 'desert', destinations: ['merzouga', 'erg-chebbi'],
  },
  'fennec-fox-sahara-wildlife': {
    src: '/images/catalog/fennec-fox-sahara-wildlife.webp', file: 'fennec-fox-sahara-wildlife.webp',
    width: 1080, height: 721,
    alt: 'Fennec fox with large ears standing alert on Sahara sand',
    caption: "The fennec fox — the Sahara's smallest wild resident.",
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
    alt: 'Amazigh woman wearing traditional amber and coral bead necklaces with silver jewellery and a striped headscarf',
    caption: 'Traditional Amazigh dress — amber and coral bead jewellery.',
    category: 'culture', destinations: ['merzouga'],
  },
  'amazigh-music-ceremony': {
    src: '/images/catalog/amazigh-music-ceremony.webp', file: 'amazigh-music-ceremony.webp',
    width: 1280, height: 850,
    alt: 'Amazigh musicians in white djellabas playing bendir drums at an outdoor ceremony',
    caption: 'Amazigh musicians at an outdoor celebration.',
    category: 'culture', destinations: ['merzouga'],
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

/** All catalog images that reinforce a given destination id, excluding the
 * destination's own Local Food photograph (it is rendered separately in the
 * food section, so it must not appear twice on the same page). */
export function imagesForDestination(id: string): CatalogImage[] {
  const foodId = DEST_FOOD_IMAGE[id];
  return Object.entries(IMAGE_CATALOG)
    .filter(([key, i]) => i.destinations.includes(id) && key !== foodId)
    .map(([, i]) => i);
}

/** Get one catalog image by id. */
export function catalogImage(id: string): CatalogImage | undefined {
  return IMAGE_CATALOG[id];
}
