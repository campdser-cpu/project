// ─────────────────────────────────────────────────────────────────────────────
// Tour Experiences — what a traveller actually sees and does on a journey.
//
// WHERE THIS COMES FROM
// Every experience below is derived from a stop that already appears in a
// tour's own `itineraryDays[].stops` in src/data/content.ts. Nothing here adds
// a place, an activity, a meal or an entrance ticket to any itinerary. If a
// tour does not stop somewhere, no card for it can appear: the catalogue is
// keyed by stop text, so an experience is only ever reachable through a stop
// the itinerary already published.
//
// THREE STATUSES, DERIVED — NEVER HAND-ASSIGNED
//   'optional'  the stop is written "(optional)" in the itinerary. These are
//               shown apart, under a heading that says they cost extra.
//   'confirmed' the itinerary day hedges the stop ("if included in the
//               confirmed itinerary", "can include", "when specified"). Three
//               quote-only routes are written that way on purpose; they must
//               not be presented as guaranteed.
//   'included'  everything else: the stop is stated plainly as part of the
//               route.
// See `deriveTourExperiences` for the rules; they read the tour's own text.
//
// IMAGES
// Only assets already verified in earlier phases are referenced — destination
// photographs under /images/dest, the official library under /images/library,
// and the approved catalogue under /images/catalog. Two destination images are
// deliberately absent: Meknès (decorative placeholder, no Meknès photograph
// exists in this project) and Ifrane (a real photograph whose location could
// not be verified). Experiences with no verified photograph render as text —
// that is intentional, not an omission to fill later with a stand-in.
//
// COPY
// English label/blurb live here; the other ten languages live in
// src/i18n/experiences/generated/<lang>.json and are merged by
// src/i18n/experiences/index.ts. A blurb describes only what the itinerary
// already claims, in plain language, and never promises a duration, a ticket,
// a meal or a guarantee the tour data does not state.
// ─────────────────────────────────────────────────────────────────────────────

export type ExperienceKind = 'landscape' | 'heritage' | 'city' | 'desert' | 'culture' | 'activity' | 'stay';

export type ExperienceDef = {
  /** Stable id — also the key used by the translation overlays. */
  id: string;
  kind: ExperienceKind;
  /** English label. */
  label: string;
  /** English one-line explanation, grounded in the itinerary. */
  blurb: string;
  /** Destination page id from src/data/content.ts, when MGA has one. */
  destinationId?: string;
  /** Guide hub slug from src/data/seoHub.ts, when MGA has one. */
  hubSlug?: string;
  /** Verified image path, or omitted when no verified photograph exists. */
  image?: string;
};

export const EXPERIENCES: Record<string, ExperienceDef> = {
  // ── Desert ────────────────────────────────────────────────────────────────
  'erg-chebbi': {
    id: 'erg-chebbi', kind: 'desert',
    label: 'Erg Chebbi dunes',
    blurb: 'The tall dune sea outside Merzouga — the Sahara most travellers picture, and the landscape this journey is built around.',
    destinationId: 'erg-chebbi', hubSlug: 'erg-chebbi',
    image: '/images/library/erg-chebbi-dune-sea-morocco-mga-028.jpg',
  },
  merzouga: {
    id: 'merzouga', kind: 'desert',
    label: 'Merzouga',
    blurb: 'The village at the edge of the dunes where the desert part of the trip begins, and where Morocco Grand Adventure is based.',
    destinationId: 'merzouga', hubSlug: 'sahara-desert-guide',
    image: '/images/dest/merzouga.webp',
  },
  'camel-trek': {
    id: 'camel-trek', kind: 'activity',
    label: 'Sunset camel trek',
    blurb: 'Ride into Erg Chebbi as the light drops, led on foot by a guide from the desert, and reach camp with the dunes still glowing.',
    hubSlug: 'camel-trekking',
    image: '/images/catalog/berber-camel-guide-sahara-merzouga.webp',
  },
  'desert-camp': {
    id: 'desert-camp', kind: 'desert',
    label: 'Night at a desert camp',
    blurb: 'Sleep between the dunes in a tented camp rather than driving back to a town for the night.',
    hubSlug: 'desert-camps',
    image: '/images/catalog/luxury-desert-camp-sunset-merzouga.webp',
  },
  'luxury-desert-camp': {
    id: 'luxury-desert-camp', kind: 'desert',
    label: 'Luxury desert camp',
    blurb: 'A camp with proper beds, private bathrooms and dinner served under the open sky, set among the dunes.',
    hubSlug: 'luxury-desert-camps',
    image: '/images/library/luxury-desert-camp-entrance-erg-chebbi-mga-005.jpg',
  },
  'desert-stars': {
    id: 'desert-stars', kind: 'desert',
    label: 'Dinner under the stars',
    blurb: 'Dinner at camp and an evening outside — there is no town light near Erg Chebbi to wash out the sky.',
    image: '/images/catalog/sahara-bivouac-stars-merzouga.webp',
  },
  'desert-sunrise': {
    id: 'desert-sunrise', kind: 'desert',
    label: 'Sunrise over the dunes',
    blurb: 'Wake early for first light on Erg Chebbi, when the sand changes colour and the ridges throw long shadows.',
    hubSlug: 'erg-chebbi-sunrise-sunset',
    image: '/images/library/erg-chebbi-dunes-golden-hour-morocco-mga-029.jpg',
  },
  sandboarding: {
    id: 'sandboarding', kind: 'activity',
    label: 'Sandboarding',
    blurb: 'Boards are available at the dunes for anyone who wants to try riding down a face of Erg Chebbi.',
    hubSlug: 'things-to-do',
  },
  '4x4-desert': {
    id: '4x4-desert', kind: 'activity',
    label: '4x4 desert drive',
    blurb: 'Cross the sand by four-wheel drive to reach parts of the desert the road does not go.',
    hubSlug: '4x4-desert-tour',
    image: '/images/library/4x4-dune-bashing-sahara-morocco-mga-006.jpg',
  },
  'khamlia-gnawa': {
    id: 'khamlia-gnawa', kind: 'culture',
    label: 'Khamlia and Gnawa music',
    blurb: 'A village south of Merzouga whose community plays Gnawa music — a tradition carried across the Sahara, still performed here.',
    image: '/images/catalog/amazigh-music-ceremony.webp',
  },
  'nomad-families': {
    id: 'nomad-families', kind: 'culture',
    label: 'Tea with nomad families',
    blurb: 'A stop with families still living in the desert outside Merzouga, over the mint tea that hospitality here is built on.',
  },
  rissani: {
    id: 'rissani', kind: 'culture',
    label: 'Rissani souk',
    blurb: 'The market town near Merzouga, and one of the least staged souks on the southern route — busiest on market days.',
  },
  erfoud: {
    id: 'erfoud', kind: 'heritage',
    label: 'Erfoud and its fossils',
    blurb: 'The town before Merzouga, known for the fossil-bearing stone quarried nearby and worked in its workshops.',
  },
  'black-desert': {
    id: 'black-desert', kind: 'landscape',
    label: 'The Black Desert',
    blurb: 'The dark, stony hamada on the way to the dunes — a reminder that most of the Sahara is not sand.',
  },

  // ── Mountains and valleys ─────────────────────────────────────────────────
  'high-atlas': {
    id: 'high-atlas', kind: 'landscape',
    label: 'High Atlas crossing',
    blurb: 'The road climbs over the High Atlas by the Tizi n\'Tichka pass, with time to stop where the view opens out.',
    image: '/images/library/kasbah-gateway-high-atlas-road-morocco-mga-016.jpg',
  },
  'middle-atlas': {
    id: 'middle-atlas', kind: 'landscape',
    label: 'Middle Atlas crossing',
    blurb: 'The greener range between Fes and the desert — upland pasture, lakes and stone towns.',
  },
  'cedar-forest': {
    id: 'cedar-forest', kind: 'landscape',
    label: 'Cedar forest',
    blurb: 'The cedar woodland of the Middle Atlas, where Barbary macaques live wild beside the road.',
  },
  'todra-gorge': {
    id: 'todra-gorge', kind: 'landscape',
    label: 'Todra Gorge',
    blurb: 'Walk into the canyon where the limestone walls close to a few hundred metres apart and rise straight up.',
    destinationId: 'todra-gorge',
    image: '/images/library/walking-todra-gorge-morocco-mga-026.jpg',
  },
  'dades-valley': {
    id: 'dades-valley', kind: 'landscape',
    label: 'Dades Valley',
    blurb: 'Red rock, palm gardens and earthen villages along the river — the classic overnight between the mountains and the desert.',
    destinationId: 'dades-valley',
    image: '/images/library/dades-valley-village-atlas-morocco-mga-036.jpg',
  },
  'draa-valley': {
    id: 'draa-valley', kind: 'landscape',
    label: 'Draa Valley',
    blurb: 'The long palm oasis that follows the river south, with kasbahs standing above the groves.',
    destinationId: 'draa-valley',
    image: '/images/catalog/draa-valley-oasis-palm-grove.webp',
  },
  'ziz-valley': {
    id: 'ziz-valley', kind: 'landscape',
    label: 'Ziz Valley',
    blurb: 'A wide palm valley cut into bare rock on the road south — the viewpoint above it is one of the best stops of the day.',
  },
  'valley-of-roses': {
    id: 'valley-of-roses', kind: 'landscape',
    label: 'Valley of Roses',
    blurb: 'The valley where damask roses are grown and distilled, harvested in late spring.',
    destinationId: 'roses-valley',
  },
  skoura: {
    id: 'skoura', kind: 'landscape',
    label: 'Skoura oasis',
    blurb: 'A working palm oasis of kasbahs and gardens rather than a viewpoint you look at from the road.',
    destinationId: 'skoura',
    image: '/images/dest/skoura.webp',
  },
  'anti-atlas': {
    id: 'anti-atlas', kind: 'landscape',
    label: 'Anti-Atlas',
    blurb: 'The older, drier range inland from the Atlantic, crossed on the southern routes.',
  },
  'rif-mountains': {
    id: 'rif-mountains', kind: 'landscape',
    label: 'Rif Mountains',
    blurb: 'The green northern range that Chefchaouen sits in.',
  },
  ifrane: {
    id: 'ifrane', kind: 'city',
    label: 'Ifrane',
    blurb: 'The Middle Atlas town of pitched roofs and gardens, built in the 1930s and unlike anywhere else on the route.',
    destinationId: 'ifrane',
  },
  midelt: {
    id: 'midelt', kind: 'city',
    label: 'Midelt',
    blurb: 'The high plateau town between the two Atlas ranges, and the usual break on the long Fes–Merzouga road.',
  },

  // ── Heritage ──────────────────────────────────────────────────────────────
  'ait-ben-haddou': {
    id: 'ait-ben-haddou', kind: 'heritage',
    label: 'Aït Ben Haddou',
    blurb: 'Walk up through the earthen ksar on the far side of the river — a UNESCO World Heritage site and the most striking stop on the road south.',
    destinationId: 'ait-ben-haddou',
    image: '/images/library/ait-ben-haddou-ounila-river-reflection-morocco-mga-035.jpg',
  },
  ouarzazate: {
    id: 'ouarzazate', kind: 'city',
    label: 'Ouarzazate',
    blurb: 'The town where the southern routes meet, with the Taourirt Kasbah on its edge and film studios on the outskirts.',
    destinationId: 'ouarzazate',
    image: '/images/dest/ouarzazate.webp',
  },
  'taourirt-kasbah': {
    id: 'taourirt-kasbah', kind: 'heritage',
    label: 'Taourirt Kasbah',
    blurb: 'The packed-earth kasbah in Ouarzazate, a warren of rooms and stairways behind a plain outer wall.',
  },
  'atlas-studios': {
    id: 'atlas-studios', kind: 'heritage',
    label: 'Atlas Studios',
    blurb: 'The film studios outside Ouarzazate, where sets from productions shot in southern Morocco are still standing.',
  },
  volubilis: {
    id: 'volubilis', kind: 'heritage',
    label: 'Volubilis',
    blurb: 'The Roman town near Meknès, a UNESCO World Heritage site, with mosaic floors still in place where the houses stood.',
  },
  meknes: {
    id: 'meknes', kind: 'city',
    label: 'Meknès',
    blurb: 'The imperial city of Moulay Ismail — the Bab Mansour gate, the mausoleum and the walls around the old granaries.',
    destinationId: 'meknes',
  },

  // ── Cities ────────────────────────────────────────────────────────────────
  marrakech: {
    id: 'marrakech', kind: 'city',
    label: 'Marrakech',
    blurb: 'The red city at the foot of the Atlas, and the usual start or finish of the southern routes.',
    destinationId: 'marrakech',
    image: '/images/dest/marrakech.webp',
  },
  'jemaa-el-fna': {
    id: 'jemaa-el-fna', kind: 'culture',
    label: 'Jemaa el-Fna',
    blurb: 'The main square of Marrakech, which fills after dark with food stalls, musicians and storytellers.',
    image: '/images/library/jemaa-el-fna-night-marrakech-mga-017.jpg',
  },
  'marrakech-souks': {
    id: 'marrakech-souks', kind: 'culture',
    label: 'Marrakech souks',
    blurb: 'The covered lanes north of the square, still sorted by trade — leather, metal, dyers, carpets.',
    image: '/images/library/marrakech-souk-aerial-view-mga-009.jpg',
  },
  koutoubia: {
    id: 'koutoubia', kind: 'heritage',
    label: 'Koutoubia Mosque',
    blurb: 'The twelfth-century minaret that every other tower in Marrakech is measured against.',
    image: '/images/library/guerrab-water-sellers-koutoubia-marrakech-mga-004.jpg',
  },
  'bahia-palace': {
    id: 'bahia-palace', kind: 'heritage',
    label: 'Bahia Palace',
    blurb: 'A nineteenth-century palace of painted cedar ceilings, courtyards and tiled rooms in the Marrakech medina.',
  },
  'saadian-tombs': {
    id: 'saadian-tombs', kind: 'heritage',
    label: 'Saadian Tombs',
    blurb: 'The sealed royal burial garden in Marrakech, reopened in the twentieth century and richly decorated inside.',
  },
  'majorelle-garden': {
    id: 'majorelle-garden', kind: 'heritage',
    label: 'Majorelle Garden',
    blurb: 'The cobalt-blue garden villa in Marrakech, planted with cactus and bamboo.',
  },
  fes: {
    id: 'fes', kind: 'city',
    label: 'Fes',
    blurb: 'The oldest of the imperial cities, and the start of the northern route to the desert.',
    destinationId: 'fes',
    image: '/images/dest/fes.webp',
  },
  'fes-el-bali': {
    id: 'fes-el-bali', kind: 'culture',
    label: 'Fes el-Bali medina',
    blurb: 'The walled old city, a UNESCO World Heritage site, where the lanes are too narrow for cars.',
    image: '/images/library/souk-alley-fes-medina-mga-038.jpg',
  },
  'chouara-tannery': {
    id: 'chouara-tannery', kind: 'culture',
    label: 'Chouara Tannery',
    blurb: 'The stone dye pits of the Fes tanneries, worked by hand much as they have been for centuries.',
    image: '/images/library/leather-souk-archway-fes-medina-mga-020.jpg',
  },
  'al-quaraouiyine': {
    id: 'al-quaraouiyine', kind: 'heritage',
    label: 'Al Quaraouiyine',
    blurb: 'Founded in Fes in 859 and generally described as the oldest continuously operating university in the world.',
  },
  chefchaouen: {
    id: 'chefchaouen', kind: 'city',
    label: 'Chefchaouen',
    blurb: 'The blue-washed town in the Rif, small enough to walk end to end and best seen early.',
    destinationId: 'chefchaouen',
    image: '/images/library/chefchaouen-blue-city-aerial-morocco-mga-019.jpg',
  },
  rabat: {
    id: 'rabat', kind: 'city',
    label: 'Rabat',
    blurb: 'The capital on the Atlantic — the Kasbah of the Udayas above the river and the Hassan Tower on the hill.',
    destinationId: 'rabat',
    image: '/images/dest/rabat.webp',
  },
  'hassan-ii-mosque': {
    id: 'hassan-ii-mosque', kind: 'heritage',
    label: 'Hassan II Mosque',
    blurb: 'The mosque built out over the Atlantic in Casablanca, with one of the tallest minarets in the world.',
    destinationId: 'casablanca',
    image: '/images/catalog/hassan-ii-mosque-casablanca.webp',
  },
  essaouira: {
    id: 'essaouira', kind: 'city',
    label: 'Essaouira',
    blurb: 'The walled Atlantic port — ramparts, a working fishing harbour and wind almost every day.',
    destinationId: 'essaouira',
    image: '/images/library/blue-studded-door-essaouira-morocco-mga-025.jpg',
  },
  agadir: {
    id: 'agadir', kind: 'city',
    label: 'Agadir',
    blurb: 'The Atlantic resort city rebuilt after 1960, with a long beach and a marina.',
    destinationId: 'agadir',
    image: '/images/library/camels-beach-agadir-morocco-mga-032.jpg',
  },
  taghazout: {
    id: 'taghazout', kind: 'city',
    label: 'Taghazout',
    blurb: 'The surf village north of Agadir, where the point breaks work best in winter.',
    destinationId: 'taghazout',
    image: '/images/dest/taghazout.webp',
  },
  zagora: {
    id: 'zagora', kind: 'desert',
    label: 'Zagora',
    blurb: 'The southern desert town at the end of the Draa — closer to Marrakech than Merzouga, with smaller dunes.',
    destinationId: 'zagora', hubSlug: 'merzouga-vs-zagora',
    image: '/images/dest/zagora.webp',
  },
  taroudant: {
    id: 'taroudant', kind: 'city',
    label: 'Taroudant',
    blurb: 'A walled market town inland from Agadir, ringed by earthen ramparts.',
  },
  asilah: {
    id: 'asilah', kind: 'city',
    label: 'Asilah',
    blurb: 'A small whitewashed town on the northern Atlantic coast, its medina walls painted with murals.',
  },
  nkob: {
    id: 'nkob', kind: 'city',
    label: 'Nkob',
    blurb: 'An oasis town on the southern road, known for the number of kasbahs standing around it.',
    destinationId: 'nkob',
  },

  // ── Culture and craft ─────────────────────────────────────────────────────
  'argan-cooperative': {
    id: 'argan-cooperative', kind: 'culture',
    label: 'Argan oil cooperative',
    blurb: 'A women\'s cooperative pressing argan oil by hand, on the road where the trees actually grow.',
  },
  'berber-hospitality': {
    id: 'berber-hospitality', kind: 'culture',
    label: 'Amazigh hospitality',
    blurb: 'Mint tea with the families along the route — the ordinary form that welcome takes in southern Morocco.',
    image: '/images/catalog/berber-child-baby-goat-village.webp',
  },
  'berber-music': {
    id: 'berber-music', kind: 'culture',
    label: 'Amazigh music',
    blurb: 'Drums and chant played live in the evening — not a stage show but the way music is made here.',
    image: '/images/catalog/amazigh-music-ceremony.webp',
  },
  'berber-villages': {
    id: 'berber-villages', kind: 'culture',
    label: 'Amazigh villages',
    blurb: 'Earthen villages in the valleys, built from the ground they stand on and still lived in.',
    image: '/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp',
  },
  crafts: {
    id: 'crafts', kind: 'culture',
    label: 'Souks and craft workshops',
    blurb: 'Workshops where the pottery, metal and leather sold in the souks is actually made.',
    image: '/images/library/blacksmith-traditional-medina-forge-morocco-mga-015.jpg',
  },
  'street-food': {
    id: 'street-food', kind: 'culture',
    label: 'Street food tasting',
    blurb: 'Eat where the queue is local — grills, soup stalls and pastry counters rather than a set menu.',
    image: '/images/catalog/moroccan-night-spice-herb-market.webp',
  },
  saffron: {
    id: 'saffron', kind: 'culture',
    label: 'Taliouine saffron country',
    blurb: 'The hills around Taliouine, where Morocco\'s saffron is grown and picked by hand in autumn.',
  },
  'atlas-mule-ride': {
    id: 'atlas-mule-ride', kind: 'activity',
    label: 'Atlas mule ride',
    blurb: 'A short ride on the mountain tracks above the valley, the way people here have always moved.',
  },

  // ── Optional, at extra cost ───────────────────────────────────────────────
  'quad-biking': {
    id: 'quad-biking', kind: 'activity',
    label: 'Quad biking',
    blurb: 'Quad bikes can be arranged at the dunes. Booked and paid separately.',
    hubSlug: 'quad-biking',
    image: '/images/library/quad-biking-sahara-dunes-morocco-mga-010.jpg',
  },
  hammam: {
    id: 'hammam', kind: 'activity',
    label: 'Hammam',
    blurb: 'A traditional steam bath and scrub, which can be booked on a free afternoon.',
  },
  'hot-air-balloon': {
    id: 'hot-air-balloon', kind: 'activity',
    label: 'Hot-air balloon at dawn',
    blurb: 'A dawn flight over the plain outside Marrakech, arranged with a local operator.',
  },
  'paradise-valley': {
    id: 'paradise-valley', kind: 'landscape',
    label: 'Paradise Valley',
    blurb: 'The palm gorge and rock pools in the hills behind Agadir.',
  },

  // ── Where you sleep ───────────────────────────────────────────────────────
  // Accommodation is part of what a traveller receives, so the itineraries'
  // own overnight stops are surfaced rather than hidden. Each of these comes
  // from a stop the tour already names; none promises a specific property,
  // because the tour data never names one.
  'riad-stay': {
    id: 'riad-stay', kind: 'stay',
    label: 'A night in a riad',
    blurb: 'A traditional house built around its own courtyard, inside the medina — quiet behind the walls, minutes from the square.',
    image: '/images/library/ornate-riad-courtyard-southern-morocco-mga-022.jpg',
  },
  'merzouga-hotel': {
    id: 'merzouga-hotel', kind: 'stay',
    label: 'A night by the dunes',
    blurb: 'A hotel on the edge of Merzouga rather than a camp — a bed, a shower and the dunes still on the doorstep.',
  },

  // ── Places the itineraries name that had no card yet ───────────────────────
  'royal-palace-fes': {
    id: 'royal-palace-fes', kind: 'heritage',
    label: 'The Royal Palace gates',
    blurb: 'The brass gates of Dar el-Makhzen in Fes — the palace itself is closed to visitors, but the gates are among the finest metalwork in Morocco.',
  },
  'mellah-fes': {
    id: 'mellah-fes', kind: 'heritage',
    label: 'The Mellah',
    blurb: 'The old Jewish quarter of Fes, with balconied houses that face the street — unlike the inward-looking homes of the medina.',
  },
  agdz: {
    id: 'agdz', kind: 'landscape',
    label: 'Agdz',
    blurb: 'The town where the Draa palm groves begin, under the flank of Jbel Kissane.',
  },
  alnif: {
    id: 'alnif', kind: 'landscape',
    label: 'Alnif',
    blurb: 'A small town on the desert road, known among collectors for the fossils found in the hills around it.',
  },
  'beni-mellal': {
    id: 'beni-mellal', kind: 'city',
    label: 'Beni Mellal',
    blurb: 'A market town below the Middle Atlas, surrounded by the orchards and olive groves of the Tadla plain.',
  },
  errachidia: {
    id: 'errachidia', kind: 'city',
    label: 'Errachidia',
    blurb: 'The administrative town of the Ziz, and the point where the road south turns properly into desert country.',
  },
  'atlantic-coast-drive': {
    id: 'atlantic-coast-drive', kind: 'landscape',
    label: 'The Atlantic coast road',
    blurb: 'The road along the ocean between Essaouira and Agadir — argan trees on one side, surf breaks on the other.',
  },
  'beach-sunset': {
    id: 'beach-sunset', kind: 'landscape',
    label: 'Sunset on the beach',
    blurb: 'The wide Atlantic beach at Essaouira at the end of the day, when the wind drops and the light goes long.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Stop text → experience. Keys are normalized by `normalizeStop` below, so a
// single entry covers every spelling used in the itineraries ("Tizi n'Tichka",
// "Tizi n'Tichka Pass", "High Atlas Mountains" …).
//
// Stops that are logistics rather than experiences (airport transfers, "End of
// tour", "Overnight: Marrakech") and stops too vague to describe honestly
// ("Southern Morocco", "Leisure morning") are deliberately absent: an
// unmapped stop produces no card.
// ─────────────────────────────────────────────────────────────────────────────
const STOP_ALIASES: Record<string, string> = {
  // desert
  'erg chebbi': 'erg-chebbi',
  'erg chebbi dunes': 'erg-chebbi',
  'erg chebbi dunes on the horizon': 'erg-chebbi',
  merzouga: 'merzouga',
  'arrive in merzouga': 'merzouga',
  'sunset camel trek': 'camel-trek',
  'erg chebbi camel trek': 'camel-trek',
  'camel trekking': 'camel-trek',
  'desert camp': 'desert-camp',
  'desert camp night': 'desert-camp',
  'erg chebbi desert camp': 'desert-camp',
  'luxury desert camp': 'luxury-desert-camp',
  'private luxury desert camp': 'luxury-desert-camp',
  'dinner under the stars': 'desert-stars',
  'star filled evening': 'desert-stars',
  'erg chebbi sunrise': 'desert-sunrise',
  'merzouga sunrise': 'desert-sunrise',
  'desert sunrise': 'desert-sunrise',
  'sunrise over the dunes': 'desert-sunrise',
  'sunrise over erg chebbi': 'desert-sunrise',
  'sunrise in the sahara': 'desert-sunrise',
  sandboarding: 'sandboarding',
  'sandboarding free time': 'sandboarding',
  '4x4 desert tour': '4x4-desert',
  'khamlia village gnawa music': 'khamlia-gnawa',
  'gnawa music': 'khamlia-gnawa',
  'nomad families': 'nomad-families',
  'tea with nomad families': 'nomad-families',
  rissani: 'rissani',
  'rissani souk': 'rissani',
  'rissani area': 'rissani',
  'rissani tafilalet area': 'rissani',
  erfoud: 'erfoud',
  'erfoud fossils': 'erfoud',
  'black desert fossils': 'black-desert',
  zagora: 'zagora',
  'zagora s desert gateway': 'zagora',
  'draa valley zagora': 'zagora',

  // mountains and valleys
  'high atlas': 'high-atlas',
  'high atlas mountains': 'high-atlas',
  'high atlas views': 'high-atlas',
  'tizi n tichka': 'high-atlas',
  'tizi n tichka pass': 'high-atlas',
  'middle atlas': 'middle-atlas',
  'middle atlas mountains': 'middle-atlas',
  'mid atlas towns': 'middle-atlas',
  'cedar forest': 'cedar-forest',
  'cedar forest barbary monkeys': 'cedar-forest',
  'middle atlas cedar forest': 'cedar-forest',
  'middle atlas cedar forests': 'cedar-forest',
  'forests lakes': 'cedar-forest',
  'forests lakes waterfalls': 'cedar-forest',
  'todra gorge': 'todra-gorge',
  'todra canyon': 'todra-gorge',
  'dades valley': 'dades-valley',
  'dades valley viewpoints': 'dades-valley',
  'dades gorge': 'dades-valley',
  'dades gorges': 'dades-valley',
  'draa valley': 'draa-valley',
  'draa valley oases': 'draa-valley',
  'ziz valley': 'ziz-valley',
  'ziz valley area': 'ziz-valley',
  'valley of roses': 'valley-of-roses',
  skoura: 'skoura',
  'skoura oasis': 'skoura',
  'anti atlas': 'anti-atlas',
  'anti atlas crossing': 'anti-atlas',
  'rif mountains': 'rif-mountains',
  ifrane: 'ifrane',
  midelt: 'midelt',
  'midelt errachidia region': 'midelt',

  // heritage
  'ait ben haddou': 'ait-ben-haddou',
  'ait ben haddou ksar': 'ait-ben-haddou',
  'unesco ait ben haddou': 'ait-ben-haddou',
  ouarzazate: 'ouarzazate',
  'ouarzazate area': 'ouarzazate',
  'taourirt kasbah': 'taourirt-kasbah',
  'kasbah taourirt': 'taourirt-kasbah',
  'atlas studios': 'atlas-studios',
  volubilis: 'volubilis',
  'volubilis roman ruins': 'volubilis',
  meknes: 'meknes',
  'bab mansour gate': 'meknes',
  'mausoleum of moulay ismail': 'meknes',

  // cities
  marrakech: 'marrakech',
  'marrakech arrival transfer': 'marrakech',
  'jemaa el fna': 'jemaa-el-fna',
  'jemaa el fnaa': 'jemaa-el-fna',
  'evening at jemaa el fnaa': 'jemaa-el-fna',
  'snake charmers storytellers': 'jemaa-el-fna',
  'marrakech souks': 'marrakech-souks',
  koutoubia: 'koutoubia',
  'koutoubia mosque': 'koutoubia',
  'bahia palace': 'bahia-palace',
  'saadian tombs': 'saadian-tombs',
  'majorelle garden': 'majorelle-garden',
  fes: 'fes',
  'fes el bali': 'fes-el-bali',
  'fes el bali medina': 'fes-el-bali',
  'fes medina sights': 'fes-el-bali',
  'medieval medina': 'fes-el-bali',
  'chouara tannery': 'chouara-tannery',
  tanneries: 'chouara-tannery',
  'tanneries souks': 'chouara-tannery',
  'al quaraouiyine': 'al-quaraouiyine',
  'al quaraouiyine university': 'al-quaraouiyine',
  chefchaouen: 'chefchaouen',
  'chefchaouen medina': 'chefchaouen',
  rabat: 'rabat',
  'rabat s udayas kasbah': 'rabat',
  'hassan tower': 'rabat',
  'hassan ii mosque': 'hassan-ii-mosque',
  casablanca: 'hassan-ii-mosque',
  'essaouira medina': 'essaouira',
  agadir: 'agadir',
  'agadir beach': 'agadir',
  'agadir marina': 'agadir',
  'agadir souk': 'agadir',
  'fishing port': 'agadir',
  taghazout: 'taghazout',
  taroudant: 'taroudant',
  'taroudant ramparts': 'taroudant',
  asilah: 'asilah',
  'asilah medina': 'asilah',
  nkob: 'nkob',

  // culture and craft
  'argan oil cooperative': 'argan-cooperative',
  'berber tea hospitality': 'berber-hospitality',
  'berber crafts hospitality': 'berber-hospitality',
  'local communities': 'berber-hospitality',
  'berber music': 'berber-music',
  'traditional berber music': 'berber-music',
  'berber villages': 'berber-villages',
  'palm groves berber villages': 'berber-villages',
  'souks crafts': 'crafts',
  'souks pottery workshops': 'crafts',
  'traditional souks': 'crafts',
  'medina souks': 'crafts',
  'street food tasting': 'street-food',
  'saffron fields': 'saffron',
  'taliouine saffron country': 'saffron',
  taliouine: 'saffron',
  'atlas mule ride': 'atlas-mule-ride',

  // optional
  'quad bike': 'quad-biking',
  'hammam for two': 'hammam',
  'kid friendly hammam': 'hammam',
  'hot air balloon at dawn': 'hot-air-balloon',
  'paradise valley': 'paradise-valley',

  // accommodation
  'private luxury riad': 'riad-stay',
  'traditional riad': 'riad-stay',
  'marrakech riad': 'riad-stay',
  'luxury hotel in merzouga': 'merzouga-hotel',
  'merzouga hotel': 'merzouga-hotel',

  // places the itineraries name
  'royal palace gates': 'royal-palace-fes',
  'royal palace': 'royal-palace-fes',
  'jewish quarter': 'mellah-fes',
  agdz: 'agdz',
  alnif: 'alnif',
  'beni mellal': 'beni-mellal',
  'errachidia region': 'errachidia',
  // Only genuinely coastal drives. The bare "Coastal road" stop belongs to the
  // Marrakech→Casablanca leg, which runs inland, so it stays unmapped rather
  // than promising an ocean road the traveller will not see.
  'atlantic coast': 'atlantic-coast-drive',
  'scenic coastal drive': 'atlantic-coast-drive',
  'coastal road north of agadir': 'atlantic-coast-drive',
  'sunset on the beach': 'beach-sunset',

  // wording variants of stops that already have a card
  'overnight in ouarzazate': 'ouarzazate',
  'merzouga area': 'merzouga',
  'second night in merzouga': 'merzouga',
  'midelt area': 'midelt',
};

/** Reduce an itinerary stop to its lookup key. */
export function normalizeStop(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\((unesco|optional|dinner & breakfast|breakfast)\)/g, '')
    .replace(/^(overnight|end|start)\s*:\s*/, '')
    .replace(/^(arrive in|arrival in|first evening in)\s+/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export type ExperienceStatus = 'included' | 'confirmed' | 'optional';
export type DerivedExperience = ExperienceDef & { status: ExperienceStatus; day: number };

/** A day whose own text refuses to guarantee its stops. */
const HEDGED_DAY = /\b(if included|can include|when included|when specified|where included|according to)\b/i;

type TourLike = {
  itineraryDays?: { day: number; desc: string; stops: string[] }[];
};

/**
 * Derive the experiences of a tour from its published itinerary.
 *
 * Reads only the tour's own `itineraryDays`. An experience appears once, at the
 * first day it occurs. Status comes from the itinerary text, never from a list
 * maintained by hand — see the header for the three rules.
 */
export function deriveTourExperiences(tour: TourLike): {
  included: DerivedExperience[];
  optional: DerivedExperience[];
} {
  const seen = new Map<string, DerivedExperience>();
  for (const day of tour.itineraryDays ?? []) {
    const hedged = HEDGED_DAY.test(day.desc ?? '');
    for (const stop of day.stops ?? []) {
      const def = EXPERIENCES[STOP_ALIASES[normalizeStop(stop)] ?? ''];
      if (!def) continue;
      const status: ExperienceStatus = /\(optional\)/i.test(stop)
        ? 'optional'
        : hedged
          ? 'confirmed'
          : 'included';
      const prior = seen.get(def.id);
      // A stop stated plainly on one day outranks a hedged or optional mention
      // on another: the journey does include it.
      if (prior && rank(prior.status) <= rank(status)) continue;
      seen.set(def.id, { ...def, status, day: day.day });
    }
  }
  const all = [...seen.values()];
  return {
    included: all.filter((e) => e.status !== 'optional').sort((a, b) => a.day - b.day),
    optional: all.filter((e) => e.status === 'optional').sort((a, b) => a.day - b.day),
  };
}

function rank(s: ExperienceStatus): number {
  return s === 'included' ? 0 : s === 'confirmed' ? 1 : 2;
}
