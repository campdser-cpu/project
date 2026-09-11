// ─────────────────────────────────────────────────────────────────────────────
// Official Photo Library — source of truth for the Morocco Grand Adventure
// photography, as documented in the official Photo Library PDF (46 images,
// 19 sections, 12 destinations).
//
// RULES (from the source-of-truth document):
//   • Asset IDs (MGA-001 … MGA-046) are NEVER changed.
//   • Original filenames (e.g. 1000206114.jpg) are NEVER renamed.
//     The file field is authoritative; responsive/WebP derivatives are separate assets.
//   • Descriptions are used verbatim as the basis for ALT/title/description.
//   • A destination is recorded ONLY when the library explicitly states one.
//   • MGA-023 is BLOCKED (unverified location). MGA-046 is BLOCKED until the
//     "TOURIS-ME" windscreen sticker is verified.
// This manifest is additive: it never re-points existing /images/** URLs.
// ─────────────────────────────────────────────────────────────────────────────

export type PhotoVerification =
  | 'approved'
  | 'unverified-location'
  | 'verify-sticker';

export interface PhotoAsset {
  /** Authoritative Asset ID. Never changed. */
  assetId: string;
  /** Original filename from the official library. Never renamed. */
  file: string;
  /** Resolved image URL once published; null before the binary is imported. */
  src: string | null;
  /**
   * Responsive WebP derivatives (480/768/1280/1920w, only widths ≤ intrinsic)
   * under /images/library/srcset/. Emitted as `srcSet`; `src` (web JPEG
   * master) stays the fallback for browsers without WebP.
   */
  webp?: { w: number; url: string }[];
  /** Natural alt text derived from the official description. */
  alt: string;
  /** Short title derived from the description. */
  title: string;
  /** Factual description — the official library description is the source. */
  description: string;
  /** Optional caption shown when useful. */
  caption?: string;
  /** Official library section. */
  section: string;
  /** Destination id (content.ts) ONLY when the library states one. */
  destination?: string;
  /** Intended website context from the library. */
  context: string;
  /** Publication gate. */
  verification: PhotoVerification;
  /** Human-readable note for blocked/unverified assets. */
  publishNote?: string;
  width?: number;
  height?: number;
}

export const RESTRICTED_ASSETS: Record<string, PhotoVerification> = {
  'MGA-023': 'unverified-location',
  'MGA-046': 'verify-sticker',
};

export const PHOTO_LIBRARY: Record<string, PhotoAsset> = {
  'MGA-001': {
    assetId: 'MGA-001', file: "1000206114.jpg", src: '/images/library/erg-chebbi-camel-trekking-sunset-morocco-mga-001.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/erg-chebbi-camel-trekking-sunset-morocco-mga-001-480w.webp' }, { w: 768, url: '/images/library/srcset/erg-chebbi-camel-trekking-sunset-morocco-mga-001-768w.webp' }, { w: 1280, url: '/images/library/srcset/erg-chebbi-camel-trekking-sunset-morocco-mga-001-1280w.webp' }, { w: 1920, url: '/images/library/srcset/erg-chebbi-camel-trekking-sunset-morocco-mga-001-1920w.webp' }], width: 1920, height: 1280,
    alt: "Berber guide leading a camel caravan across Erg Chebbi at dusk",
    title: "Erg Chebbi camel trekking at sunset",
    description: "Berber guide leading camel caravan at dusk — Erg Chebbi, Merzouga",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "camel-trekking", verification: 'approved',
  },
  'MGA-002': {
    assetId: 'MGA-002', file: "1000206106.jpg", src: '/images/library/quad-biking-erg-chebbi-dunes-sunset-morocco-mga-002.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/quad-biking-erg-chebbi-dunes-sunset-morocco-mga-002-480w.webp' }, { w: 768, url: '/images/library/srcset/quad-biking-erg-chebbi-dunes-sunset-morocco-mga-002-768w.webp' }], width: 1278, height: 1704,
    alt: "Female tourist with arms outstretched on a quad bike at sunset at Erg Chebbi",
    title: "Quad biking on the Erg Chebbi dunes at sunset",
    description: "Female tourist arms outstretched on quad bike at sunset — Erg Chebbi",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-003': {
    assetId: 'MGA-003', file: "1000206101.jpg", src: '/images/library/snake-charmer-jemaa-el-fna-marrakech-mga-003.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/snake-charmer-jemaa-el-fna-marrakech-mga-003-480w.webp' }, { w: 768, url: '/images/library/srcset/snake-charmer-jemaa-el-fna-marrakech-mga-003-768w.webp' }, { w: 1280, url: '/images/library/srcset/snake-charmer-jemaa-el-fna-marrakech-mga-003-1280w.webp' }, { w: 1920, url: '/images/library/srcset/snake-charmer-jemaa-el-fna-marrakech-mga-003-1920w.webp' }], width: 1920, height: 1282,
    alt: "Snake charmer performing at Jemaa el-Fna square in Marrakech",
    title: "Snake charmer at Jemaa el-Fna, Marrakech",
    description: "Snake charmer performing at Jemaa el-Fna square — Marrakech",
    section: "Marrakech — Jemaa el-Fna",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-004': {
    assetId: 'MGA-004', file: "1000206117.jpg", src: '/images/library/guerrab-water-sellers-koutoubia-marrakech-mga-004.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/guerrab-water-sellers-koutoubia-marrakech-mga-004-480w.webp' }, { w: 768, url: '/images/library/srcset/guerrab-water-sellers-koutoubia-marrakech-mga-004-768w.webp' }, { w: 1280, url: '/images/library/srcset/guerrab-water-sellers-koutoubia-marrakech-mga-004-1280w.webp' }, { w: 1920, url: '/images/library/srcset/guerrab-water-sellers-koutoubia-marrakech-mga-004-1920w.webp' }], width: 1920, height: 1277,
    alt: "Three traditional Moroccan Guerrab water sellers near Koutoubia Mosque",
    title: "Guerrab water sellers near Koutoubia Mosque, Marrakech",
    description: "Three traditional Moroccan Guerrab water sellers near Koutoubia Mosque",
    section: "Marrakech — Culture & Heritage",
    destination: "marrakech", context: "culture", verification: 'approved',
  },
  'MGA-005': {
    assetId: 'MGA-005', file: "1000206098.jpg", src: '/images/library/luxury-desert-camp-entrance-erg-chebbi-mga-005.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/luxury-desert-camp-entrance-erg-chebbi-mga-005-480w.webp' }, { w: 768, url: '/images/library/srcset/luxury-desert-camp-entrance-erg-chebbi-mga-005-768w.webp' }, { w: 1280, url: '/images/library/srcset/luxury-desert-camp-entrance-erg-chebbi-mga-005-1280w.webp' }, { w: 1920, url: '/images/library/srcset/luxury-desert-camp-entrance-erg-chebbi-mga-005-1920w.webp' }], width: 1707, height: 2560,
    alt: "Tourist walking on a Moroccan rug lined with lanterns toward Erg Chebbi — luxury camp entrance",
    title: "Luxury desert camp entrance at Erg Chebbi",
    description: "Tourist walking on Moroccan rug lined with lanterns toward Erg Chebbi — luxury camp entrance",
    section: "Luxury Desert Camp",
    destination: "merzouga", context: "luxury-camp", verification: 'approved',
  },
  'MGA-006': {
    assetId: 'MGA-006', file: "1000206111.jpg", src: '/images/library/4x4-dune-bashing-sahara-morocco-mga-006.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/4x4-dune-bashing-sahara-morocco-mga-006-480w.webp' }, { w: 768, url: '/images/library/srcset/4x4-dune-bashing-sahara-morocco-mga-006-768w.webp' }, { w: 1280, url: '/images/library/srcset/4x4-dune-bashing-sahara-morocco-mga-006-1280w.webp' }, { w: 1920, url: '/images/library/srcset/4x4-dune-bashing-sahara-morocco-mga-006-1920w.webp' }], width: 1920, height: 1280,
    alt: "White 4x4 SUV performing dune bashing in the orange Sahara Desert",
    title: "4x4 dune bashing in the Sahara",
    description: "White 4x4 SUV performing dune bashing in the orange Sahara Desert",
    section: "Adventure — 4x4 Desert Drive",
    destination: undefined, context: "4x4-desert-drive", verification: 'approved',
  },
  'MGA-007': {
    assetId: 'MGA-007', file: "1000206113.webp", src: '/images/library/surfing-moroccan-atlantic-coast-mga-007.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/surfing-moroccan-atlantic-coast-mga-007-480w.webp' }, { w: 768, url: '/images/library/srcset/surfing-moroccan-atlantic-coast-mga-007-768w.webp' }, { w: 1280, url: '/images/library/srcset/surfing-moroccan-atlantic-coast-mga-007-1280w.webp' }, { w: 1920, url: '/images/library/srcset/surfing-moroccan-atlantic-coast-mga-007-1920w.webp' }], width: 1920, height: 1280,
    alt: "Aerial view of surfers in the Atlantic with a Moroccan flag in the foreground",
    title: "Surfing the Moroccan Atlantic coast",
    description: "Aerial view of surfers in the Atlantic with Moroccan flag in foreground",
    section: "Moroccan Coast — Beach & Surf",
    destination: "agadir", context: "destination", verification: 'approved',
  },
  'MGA-008': {
    assetId: 'MGA-008', file: "1000206105.jpg", src: '/images/library/atv-erg-chebbi-dunes-golden-hour-morocco-mga-008.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/atv-erg-chebbi-dunes-golden-hour-morocco-mga-008-480w.webp' }, { w: 768, url: '/images/library/srcset/atv-erg-chebbi-dunes-golden-hour-morocco-mga-008-768w.webp' }], width: 1086, height: 1448,
    alt: "GOES Terrox 400s quad bike parked on an Erg Chebbi dune at golden hour",
    title: "ATV on the Erg Chebbi dunes at golden hour",
    description: "GOES Terrox 400s quad bike parked on Erg Chebbi dune at golden hour",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-009': {
    assetId: 'MGA-009', file: "1000206100.jpg", src: '/images/library/marrakech-souk-aerial-view-mga-009.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/marrakech-souk-aerial-view-mga-009-480w.webp' }, { w: 768, url: '/images/library/srcset/marrakech-souk-aerial-view-mga-009-768w.webp' }, { w: 1280, url: '/images/library/srcset/marrakech-souk-aerial-view-mga-009-1280w.webp' }, { w: 1920, url: '/images/library/srcset/marrakech-souk-aerial-view-mga-009-1920w.webp' }], width: 1707, height: 2560,
    alt: "Aerial rooftop view over the colourful Marrakech souk, with Carpet Central Market visible",
    title: "Marrakech souk from above",
    description: "Aerial rooftop view over the colourful Marrakech souk — Carpet Central Market visible",
    section: "Marrakech — Souks & Medina",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-010': {
    assetId: 'MGA-010', file: "1000206116.jpg", src: '/images/library/quad-biking-sahara-dunes-morocco-mga-010.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/quad-biking-sahara-dunes-morocco-mga-010-480w.webp' }, { w: 768, url: '/images/library/srcset/quad-biking-sahara-dunes-morocco-mga-010-768w.webp' }, { w: 1280, url: '/images/library/srcset/quad-biking-sahara-dunes-morocco-mga-010-1280w.webp' }, { w: 1920, url: '/images/library/srcset/quad-biking-sahara-dunes-morocco-mga-010-1920w.webp' }], width: 1920, height: 1277,
    alt: "Two quad bikers crossing pale Sahara dunes",
    title: "Quad biking across the Sahara dunes",
    description: "Two quad bikers crossing pale Sahara dunes",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-011': {
    assetId: 'MGA-011', file: "1000206107.jpg", src: '/images/library/quad-bike-standing-erg-chebbi-morocco-mga-011.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/quad-bike-standing-erg-chebbi-morocco-mga-011-480w.webp' }, { w: 768, url: '/images/library/srcset/quad-bike-standing-erg-chebbi-morocco-mga-011-768w.webp' }], width: 946, height: 1261,
    alt: "Joyful female tourist standing on a quad bike on the Erg Chebbi dunes",
    title: "Standing up on a quad bike at Erg Chebbi",
    description: "Joyful female tourist standing on quad bike — Erg Chebbi dunes",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-012': {
    assetId: 'MGA-012', file: "1000206112.jpg", src: '/images/library/surfers-golden-hour-moroccan-coast-mga-012.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/surfers-golden-hour-moroccan-coast-mga-012-480w.webp' }, { w: 768, url: '/images/library/srcset/surfers-golden-hour-moroccan-coast-mga-012-768w.webp' }, { w: 1280, url: '/images/library/srcset/surfers-golden-hour-moroccan-coast-mga-012-1280w.webp' }, { w: 1920, url: '/images/library/srcset/surfers-golden-hour-moroccan-coast-mga-012-1920w.webp' }], width: 1707, height: 2560,
    alt: "Three surfers on boards at golden hour with a Moroccan rocky cliff coast behind",
    title: "Surfers at golden hour on the Moroccan coast",
    description: "Three surfers on boards at golden hour with Moroccan rocky cliff coast behind",
    section: "Moroccan Coast — Beach & Surf",
    destination: "agadir", context: "destination", verification: 'approved',
  },
  'MGA-013': {
    assetId: 'MGA-013', file: "1000206104.webp", src: '/images/library/ben-youssef-madrasa-courtyard-marrakech-mga-013.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/ben-youssef-madrasa-courtyard-marrakech-mga-013-480w.webp' }, { w: 768, url: '/images/library/srcset/ben-youssef-madrasa-courtyard-marrakech-mga-013-768w.webp' }, { w: 1280, url: '/images/library/srcset/ben-youssef-madrasa-courtyard-marrakech-mga-013-1280w.webp' }, { w: 1920, url: '/images/library/srcset/ben-youssef-madrasa-courtyard-marrakech-mga-013-1920w.webp' }], width: 1920, height: 1419,
    alt: "Tourists inside the ornate courtyard of Ben Youssef Madrasa in Marrakech",
    title: "Ben Youssef Madrasa courtyard, Marrakech",
    description: "Tourists inside the ornate courtyard of Ben Youssef Madrasa — Marrakech",
    section: "Marrakech — Culture & Heritage",
    destination: "marrakech", context: "heritage", verification: 'approved',
  },
  'MGA-014': {
    assetId: 'MGA-014', file: "1000206115.jpg", src: '/images/library/moroccan-mint-tea-mga-014.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/moroccan-mint-tea-mga-014-480w.webp' }, { w: 768, url: '/images/library/srcset/moroccan-mint-tea-mga-014-768w.webp' }, { w: 1280, url: '/images/library/srcset/moroccan-mint-tea-mga-014-1280w.webp' }, { w: 1920, url: '/images/library/srcset/moroccan-mint-tea-mga-014-1920w.webp' }], width: 1702, height: 2560,
    alt: "Traditional Moroccan mint tea in ornate gold-decorated glasses beside a silver teapot",
    title: "Moroccan mint tea",
    description: "Traditional Moroccan mint tea in ornate gold-decorated glasses beside a silver teapot",
    section: "Moroccan Culture — Food, Crafts & People",
    destination: undefined, context: "culture", verification: 'approved',
  },
  'MGA-015': {
    assetId: 'MGA-015', file: "1000206118.jpg", src: '/images/library/blacksmith-traditional-medina-forge-morocco-mga-015.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/blacksmith-traditional-medina-forge-morocco-mga-015-480w.webp' }, { w: 768, url: '/images/library/srcset/blacksmith-traditional-medina-forge-morocco-mga-015-768w.webp' }, { w: 1280, url: '/images/library/srcset/blacksmith-traditional-medina-forge-morocco-mga-015-1280w.webp' }, { w: 1920, url: '/images/library/srcset/blacksmith-traditional-medina-forge-morocco-mga-015-1920w.webp' }], width: 1920, height: 1282,
    alt: "Moroccan blacksmith hammering hot metal with sparks flying — traditional medina forge",
    title: "Blacksmith at a traditional medina forge",
    description: "Moroccan blacksmith hammering hot metal with sparks flying — traditional medina forge",
    section: "Moroccan Culture — Food, Crafts & People",
    destination: undefined, context: "culture", verification: 'approved',
  },
  'MGA-016': {
    assetId: 'MGA-016', file: "1000206099.jpg", src: '/images/library/kasbah-gateway-high-atlas-road-morocco-mga-016.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/kasbah-gateway-high-atlas-road-morocco-mga-016-480w.webp' }, { w: 768, url: '/images/library/srcset/kasbah-gateway-high-atlas-road-morocco-mga-016-768w.webp' }, { w: 1280, url: '/images/library/srcset/kasbah-gateway-high-atlas-road-morocco-mga-016-1280w.webp' }, { w: 1920, url: '/images/library/srcset/kasbah-gateway-high-atlas-road-morocco-mga-016-1920w.webp' }], width: 1920, height: 1064,
    alt: "Moroccan kasbah gateway on a desert road with snow-capped High Atlas behind",
    title: "Kasbah gateway on the road to the High Atlas",
    description: "Moroccan kasbah gateway on desert road with snow-capped High Atlas behind",
    section: "Atlas Mountains & Road Trips",
    destination: undefined, context: "destination", verification: 'approved',
  },
  'MGA-017': {
    assetId: 'MGA-017', file: "1000206102.jpg", src: '/images/library/jemaa-el-fna-night-marrakech-mga-017.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/jemaa-el-fna-night-marrakech-mga-017-480w.webp' }, { w: 768, url: '/images/library/srcset/jemaa-el-fna-night-marrakech-mga-017-768w.webp' }, { w: 1280, url: '/images/library/srcset/jemaa-el-fna-night-marrakech-mga-017-1280w.webp' }, { w: 1920, url: '/images/library/srcset/jemaa-el-fna-night-marrakech-mga-017-1920w.webp' }], width: 1920, height: 1442,
    alt: "Aerial night view of Jemaa el-Fna packed with illuminated food stalls in Marrakech",
    title: "Jemaa el-Fna at night, Marrakech",
    description: "Aerial night view of Jemaa el-Fna packed with illuminated food stalls — Marrakech",
    section: "Marrakech — Jemaa el-Fna",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-018': {
    assetId: 'MGA-018', file: "1000206103.jpg", src: '/images/library/jemaa-el-fna-day-marrakech-mga-018.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-480w.webp' }, { w: 768, url: '/images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-768w.webp' }, { w: 1280, url: '/images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-1280w.webp' }, { w: 1920, url: '/images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-1920w.webp' }], width: 1920, height: 1280,
    alt: "Daytime view of Jemaa el-Fna with vendors and terracotta buildings",
    title: "Jemaa el-Fna by day, Marrakech",
    description: "Daytime view of Jemaa el-Fna with vendors and terracotta buildings",
    section: "Marrakech — Jemaa el-Fna",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-019': {
    assetId: 'MGA-019', file: "1000206097.jpg", src: '/images/library/chefchaouen-blue-city-aerial-morocco-mga-019.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/chefchaouen-blue-city-aerial-morocco-mga-019-480w.webp' }, { w: 768, url: '/images/library/srcset/chefchaouen-blue-city-aerial-morocco-mga-019-768w.webp' }, { w: 1280, url: '/images/library/srcset/chefchaouen-blue-city-aerial-morocco-mga-019-1280w.webp' }], width: 1376, height: 2133,
    alt: "Tourist overlooking the iconic blue-painted buildings of Chefchaouen from above",
    title: "Chefchaouen, the Blue City, from above",
    description: "Tourist overlooking the iconic blue-painted buildings of Chefchaouen from above",
    section: "Chefchaouen — The Blue City",
    destination: "chefchaouen", context: "destination", verification: 'approved',
  },
  'MGA-020': {
    assetId: 'MGA-020', file: "1000206096.webp", src: '/images/library/leather-souk-archway-fes-medina-mga-020.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/leather-souk-archway-fes-medina-mga-020-480w.webp' }, { w: 768, url: '/images/library/srcset/leather-souk-archway-fes-medina-mga-020-768w.webp' }, { w: 1280, url: '/images/library/srcset/leather-souk-archway-fes-medina-mga-020-1280w.webp' }, { w: 1920, url: '/images/library/srcset/leather-souk-archway-fes-medina-mga-020-1920w.webp' }], width: 1920, height: 1280,
    alt: "Evocative arched leather souk tunnel in the Fes medina",
    title: "Leather souk archway in Fes medina",
    description: "Evocative arched leather souk tunnel — Fes medina",
    section: "Fes — Medina & Culture",
    destination: "fes", context: "destination", verification: 'approved',
  },
  'MGA-021': {
    assetId: 'MGA-021', file: "1000206092.jpg", src: '/images/library/kasbah-hotel-entrance-merzouga-morocco-mga-021.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/kasbah-hotel-entrance-merzouga-morocco-mga-021-480w.webp' }, { w: 768, url: '/images/library/srcset/kasbah-hotel-entrance-merzouga-morocco-mga-021-768w.webp' }, { w: 1280, url: '/images/library/srcset/kasbah-hotel-entrance-merzouga-morocco-mga-021-1280w.webp' }, { w: 1920, url: '/images/library/srcset/kasbah-hotel-entrance-merzouga-morocco-mga-021-1920w.webp' }], width: 1707, height: 2560,
    alt: "Imposing mud-brick kasbah hotel fortress entrance with palm trees in Merzouga",
    title: "Kasbah hotel entrance in Merzouga",
    description: "Imposing mud-brick kasbah hotel fortress entrance with palm trees — Merzouga",
    section: "Merzouga — Accommodation & Architecture",
    destination: "merzouga", context: "destination", verification: 'approved',
  },
  'MGA-022': {
    assetId: 'MGA-022', file: "1000206094.jpg", src: '/images/library/ornate-riad-courtyard-southern-morocco-mga-022.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/ornate-riad-courtyard-southern-morocco-mga-022-480w.webp' }, { w: 768, url: '/images/library/srcset/ornate-riad-courtyard-southern-morocco-mga-022-768w.webp' }, { w: 1280, url: '/images/library/srcset/ornate-riad-courtyard-southern-morocco-mga-022-1280w.webp' }, { w: 1920, url: '/images/library/srcset/ornate-riad-courtyard-southern-morocco-mga-022-1920w.webp' }], width: 1920, height: 2560,
    alt: "Ornate Moroccan riad courtyard with carved stone facades in southern Morocco",
    title: "Ornate riad courtyard in southern Morocco",
    description: "Ornate Moroccan riad courtyard with carved stone facades — southern Morocco",
    section: "Merzouga — Accommodation & Architecture",
    destination: undefined, context: "destination", verification: 'approved',
  },
  'MGA-023': {
    assetId: 'MGA-023', file: "1000206089.jpg", src: null,
    alt: "Coastal bay with turquoise water",
    title: "Coastal bay",
    description: "Coastal bay with turquoise water — location uncertain (possibly NOT Morocco)",
    section: "Location Uncertain — Verify Before Use",
    destination: undefined, context: "unverified", verification: 'unverified-location',
    publishNote: "UNVERIFIED — DO NOT PUBLISH until location is independently verified as Morocco.",
  },
  'MGA-024': {
    assetId: 'MGA-024', file: "1000206075.jpg", src: '/images/library/camel-caravan-erg-chebbi-day-morocco-mga-024.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-480w.webp' }, { w: 768, url: '/images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-768w.webp' }, { w: 1280, url: '/images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-1280w.webp' }, { w: 1920, url: '/images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-1920w.webp' }], width: 1920, height: 1187,
    alt: "Camel caravan crossing the Erg Chebbi dunes by day near Merzouga",
    title: "Camel caravan crossing Erg Chebbi by day",
    description: "Camel caravan crossing Erg Chebbi by day, Merzouga",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "camel-trekking", verification: 'approved',
  },
  'MGA-025': {
    assetId: 'MGA-025', file: "1000206073.jpg", src: '/images/library/blue-studded-door-essaouira-morocco-mga-025.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/blue-studded-door-essaouira-morocco-mga-025-480w.webp' }, { w: 768, url: '/images/library/srcset/blue-studded-door-essaouira-morocco-mga-025-768w.webp' }, { w: 1280, url: '/images/library/srcset/blue-studded-door-essaouira-morocco-mga-025-1280w.webp' }, { w: 1920, url: '/images/library/srcset/blue-studded-door-essaouira-morocco-mga-025-1920w.webp' }], width: 1654, height: 2560,
    alt: "Female tourist posing at an iconic blue studded door with a Moroccan flag in Essaouira",
    title: "Blue studded door in Essaouira",
    description: "Female tourist posing at iconic blue studded door with Moroccan flag — Essaouira",
    section: "Essaouira",
    destination: "essaouira", context: "destination", verification: 'approved',
  },
  'MGA-026': {
    assetId: 'MGA-026', file: "1000206084.jpg", src: '/images/library/walking-todra-gorge-morocco-mga-026.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/walking-todra-gorge-morocco-mga-026-480w.webp' }, { w: 768, url: '/images/library/srcset/walking-todra-gorge-morocco-mga-026-768w.webp' }, { w: 1280, url: '/images/library/srcset/walking-todra-gorge-morocco-mga-026-1280w.webp' }], width: 1920, height: 2560,
    alt: "Group of tourists walking through Todra Gorge with a Berber guide — red limestone cliffs",
    title: "Walking through Todra Gorge",
    description: "Group of tourists walking through Todra Gorge with Berber guide — red limestone cliffs",
    section: "Dades Valley & Todra Gorge",
    destination: "todra-gorge", context: "destination", verification: 'approved',
  },
  'MGA-027': {
    assetId: 'MGA-027', file: "1000206086.jpg", src: '/images/library/leather-souk-tunnel-marrakech-medina-mga-027.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/leather-souk-tunnel-marrakech-medina-mga-027-480w.webp' }, { w: 768, url: '/images/library/srcset/leather-souk-tunnel-marrakech-medina-mga-027-768w.webp' }, { w: 1280, url: '/images/library/srcset/leather-souk-tunnel-marrakech-medina-mga-027-1280w.webp' }, { w: 1920, url: '/images/library/srcset/leather-souk-tunnel-marrakech-medina-mga-027-1920w.webp' }], width: 1920, height: 2560,
    alt: "Atmospheric leather souk tunnel crammed with hanging bags in the Marrakech medina",
    title: "Leather souk tunnel in the Marrakech medina",
    description: "Atmospheric leather souk tunnel crammed with hanging bags — Marrakech medina",
    section: "Marrakech — Souks & Medina",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-028': {
    assetId: 'MGA-028', file: "1000206081.jpg", src: '/images/library/erg-chebbi-dune-sea-morocco-mga-028.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/erg-chebbi-dune-sea-morocco-mga-028-480w.webp' }, { w: 768, url: '/images/library/srcset/erg-chebbi-dune-sea-morocco-mga-028-768w.webp' }, { w: 1280, url: '/images/library/srcset/erg-chebbi-dune-sea-morocco-mga-028-1280w.webp' }, { w: 1920, url: '/images/library/srcset/erg-chebbi-dune-sea-morocco-mga-028-1920w.webp' }], width: 1920, height: 1299,
    alt: "Tourist in a colourful Moroccan djellaba facing the Erg Chebbi dune sea near Merzouga",
    title: "Facing the Erg Chebbi dune sea",
    description: "Tourist in colourful Moroccan djellaba facing the Erg Chebbi dune sea, Merzouga",
    section: "Erg Chebbi — Pure Landscape",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-029': {
    assetId: 'MGA-029', file: "1000206091.jpg", src: '/images/library/erg-chebbi-dunes-golden-hour-morocco-mga-029.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/erg-chebbi-dunes-golden-hour-morocco-mga-029-480w.webp' }, { w: 768, url: '/images/library/srcset/erg-chebbi-dunes-golden-hour-morocco-mga-029-768w.webp' }, { w: 1280, url: '/images/library/srcset/erg-chebbi-dunes-golden-hour-morocco-mga-029-1280w.webp' }, { w: 1920, url: '/images/library/srcset/erg-chebbi-dunes-golden-hour-morocco-mga-029-1920w.webp' }], width: 1707, height: 2560,
    alt: "Woman in a teal dress on rippled Erg Chebbi dunes at golden hour",
    title: "Erg Chebbi dunes at golden hour",
    description: "Woman in teal dress on rippled Erg Chebbi dunes at golden hour",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-030': {
    assetId: 'MGA-030', file: "1000206083.jpg", src: '/images/library/guerrab-water-seller-portrait-marrakech-mga-030.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/guerrab-water-seller-portrait-marrakech-mga-030-480w.webp' }, { w: 768, url: '/images/library/srcset/guerrab-water-seller-portrait-marrakech-mga-030-768w.webp' }, { w: 1280, url: '/images/library/srcset/guerrab-water-seller-portrait-marrakech-mga-030-1280w.webp' }, { w: 1920, url: '/images/library/srcset/guerrab-water-seller-portrait-marrakech-mga-030-1920w.webp' }], width: 1707, height: 2560,
    alt: "Close-up portrait of a smiling Guerrab water seller in ceremonial costume",
    title: "Guerrab water seller portrait, Marrakech",
    description: "Close-up portrait of smiling Guerrab water seller in ceremonial costume",
    section: "Marrakech — Culture & Heritage",
    destination: "marrakech", context: "culture", verification: 'approved',
  },
  'MGA-031': {
    assetId: 'MGA-031', file: "1000206071.jpg", src: '/images/library/couple-sunset-erg-chebbi-morocco-mga-031.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/couple-sunset-erg-chebbi-morocco-mga-031-480w.webp' }, { w: 768, url: '/images/library/srcset/couple-sunset-erg-chebbi-morocco-mga-031-768w.webp' }, { w: 1280, url: '/images/library/srcset/couple-sunset-erg-chebbi-morocco-mga-031-1280w.webp' }, { w: 1920, url: '/images/library/srcset/couple-sunset-erg-chebbi-morocco-mga-031-1920w.webp' }], width: 1920, height: 1280,
    alt: "Silhouette of a couple watching sunset from an Erg Chebbi dune — romantic Sahara",
    title: "Couple watching sunset over Erg Chebbi",
    description: "Silhouette of couple watching sunset from Erg Chebbi dune — romantic Sahara",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-032': {
    assetId: 'MGA-032', file: "1000206088.jpg", src: '/images/library/camels-beach-agadir-morocco-mga-032.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/camels-beach-agadir-morocco-mga-032-480w.webp' }, { w: 768, url: '/images/library/srcset/camels-beach-agadir-morocco-mga-032-768w.webp' }, { w: 1280, url: '/images/library/srcset/camels-beach-agadir-morocco-mga-032-1280w.webp' }, { w: 1920, url: '/images/library/srcset/camels-beach-agadir-morocco-mga-032-1920w.webp' }], width: 1920, height: 1257,
    alt: "Camels resting on a wide Atlantic beach in Agadir, Morocco",
    title: "Camels on the beach in Agadir",
    description: "Camels resting on wide Atlantic beach — Agadir, Morocco",
    section: "Moroccan Coast — Beach & Surf",
    destination: "agadir", context: "destination", verification: 'approved',
  },
  'MGA-033': {
    assetId: 'MGA-033', file: "1000206093.jpg", src: '/images/library/erg-chebbi-dunes-blue-hour-morocco-mga-033.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/erg-chebbi-dunes-blue-hour-morocco-mga-033-480w.webp' }, { w: 768, url: '/images/library/srcset/erg-chebbi-dunes-blue-hour-morocco-mga-033-768w.webp' }, { w: 1280, url: '/images/library/srcset/erg-chebbi-dunes-blue-hour-morocco-mga-033-1280w.webp' }, { w: 1920, url: '/images/library/srcset/erg-chebbi-dunes-blue-hour-morocco-mga-033-1920w.webp' }], width: 1920, height: 1280,
    alt: "Erg Chebbi dunes at blue hour — deep blue sky above glowing orange sand",
    title: "Erg Chebbi dunes at blue hour",
    description: "Erg Chebbi dunes at blue hour — deep blue sky above glowing orange sand",
    section: "Erg Chebbi — Pure Landscape",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-034': {
    assetId: 'MGA-034', file: "1000206090.jpg", src: '/images/library/date-palm-desert-camp-erg-chebbi-morocco-mga-034.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/date-palm-desert-camp-erg-chebbi-morocco-mga-034-480w.webp' }, { w: 768, url: '/images/library/srcset/date-palm-desert-camp-erg-chebbi-morocco-mga-034-768w.webp' }, { w: 1280, url: '/images/library/srcset/date-palm-desert-camp-erg-chebbi-morocco-mga-034-1280w.webp' }, { w: 1920, url: '/images/library/srcset/date-palm-desert-camp-erg-chebbi-morocco-mga-034-1920w.webp' }], width: 1707, height: 2560,
    alt: "Solitary date palm with a desert camp and oasis in the background at Erg Chebbi",
    title: "Date palm and desert camp at Erg Chebbi",
    description: "Solitary date palm with desert camp and oasis in background — Erg Chebbi",
    section: "Luxury Desert Camp",
    destination: "merzouga", context: "luxury-camp", verification: 'approved',
  },
  'MGA-035': {
    assetId: 'MGA-035', file: "1000206085.jpg", src: '/images/library/ait-ben-haddou-ounila-river-reflection-morocco-mga-035.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/ait-ben-haddou-ounila-river-reflection-morocco-mga-035-480w.webp' }, { w: 768, url: '/images/library/srcset/ait-ben-haddou-ounila-river-reflection-morocco-mga-035-768w.webp' }, { w: 1280, url: '/images/library/srcset/ait-ben-haddou-ounila-river-reflection-morocco-mga-035-1280w.webp' }, { w: 1920, url: '/images/library/srcset/ait-ben-haddou-ounila-river-reflection-morocco-mga-035-1920w.webp' }], width: 1920, height: 2117,
    alt: "Ait Ben Haddou ksar reflected in the Ounila river — UNESCO World Heritage Site",
    title: "Ait Ben Haddou reflected in the Ounila river",
    description: "Ait Ben Haddou ksar reflected in the Ounila river — UNESCO World Heritage Site",
    section: "Ait Ben Haddou — UNESCO Heritage",
    destination: "ait-ben-haddou", context: "heritage", verification: 'approved',
  },
  'MGA-036': {
    assetId: 'MGA-036', file: "1000206074.jpg", src: '/images/library/dades-valley-village-atlas-morocco-mga-036.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/dades-valley-village-atlas-morocco-mga-036-480w.webp' }, { w: 768, url: '/images/library/srcset/dades-valley-village-atlas-morocco-mga-036-768w.webp' }, { w: 1280, url: '/images/library/srcset/dades-valley-village-atlas-morocco-mga-036-1280w.webp' }, { w: 1920, url: '/images/library/srcset/dades-valley-village-atlas-morocco-mga-036-1920w.webp' }], width: 1920, height: 2400,
    alt: "Panoramic view of a traditional village in Dades Valley with the Atlas Mountain backdrop",
    title: "Dades Valley village with the Atlas behind",
    description: "Panoramic view of traditional village in Dades Valley with Atlas Mountain backdrop",
    section: "Dades Valley & Todra Gorge",
    destination: "dades-valley", context: "destination", verification: 'approved',
  },
  'MGA-037': {
    assetId: 'MGA-037', file: "1000206080.jpg", src: '/images/library/ait-ben-haddou-rooftop-view-morocco-mga-037.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/ait-ben-haddou-rooftop-view-morocco-mga-037-480w.webp' }, { w: 768, url: '/images/library/srcset/ait-ben-haddou-rooftop-view-morocco-mga-037-768w.webp' }, { w: 1280, url: '/images/library/srcset/ait-ben-haddou-rooftop-view-morocco-mga-037-1280w.webp' }, { w: 1920, url: '/images/library/srcset/ait-ben-haddou-rooftop-view-morocco-mga-037-1920w.webp' }], width: 1707, height: 2560,
    alt: "Tourist in a striped robe overlooking the ancient Ait Ben Haddou ksar from a rooftop",
    title: "View over Ait Ben Haddou from a rooftop",
    description: "Tourist in striped robe overlooking the ancient Ait Ben Haddou ksar from a rooftop",
    section: "Ait Ben Haddou — UNESCO Heritage",
    destination: "ait-ben-haddou", context: "heritage", verification: 'approved',
  },
  'MGA-038': {
    assetId: 'MGA-038', file: "1000206087.jpg", src: '/images/library/souk-alley-fes-medina-mga-038.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/souk-alley-fes-medina-mga-038-480w.webp' }, { w: 768, url: '/images/library/srcset/souk-alley-fes-medina-mga-038-768w.webp' }, { w: 1280, url: '/images/library/srcset/souk-alley-fes-medina-mga-038-1280w.webp' }, { w: 1920, url: '/images/library/srcset/souk-alley-fes-medina-mga-038-1920w.webp' }], width: 1724, height: 2560,
    alt: "Busy souk alley lined with craft shops in the Fes medina",
    title: "Souk alley in the Fes medina",
    description: "Busy souk alley lined with craft shops — Fes medina",
    section: "Fes — Medina & Culture",
    destination: "fes", context: "destination", verification: 'approved',
  },
  'MGA-039': {
    assetId: 'MGA-039', file: "1000206095.jpg", src: '/images/library/madrasa-courtyard-golden-hour-fes-mga-039.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/madrasa-courtyard-golden-hour-fes-mga-039-480w.webp' }, { w: 768, url: '/images/library/srcset/madrasa-courtyard-golden-hour-fes-mga-039-768w.webp' }, { w: 1280, url: '/images/library/srcset/madrasa-courtyard-golden-hour-fes-mga-039-1280w.webp' }, { w: 1920, url: '/images/library/srcset/madrasa-courtyard-golden-hour-fes-mga-039-1920w.webp' }], width: 1707, height: 2560,
    alt: "Madrasa courtyard at golden hour with ornate stucco and zellige tiles in Fes",
    title: "Madrasa courtyard at golden hour, Fes",
    description: "Madrasa courtyard at golden hour with ornate stucco and zellige tiles — Fes",
    section: "Fes — Medina & Culture",
    destination: "fes", context: "heritage", verification: 'approved',
  },
  'MGA-040': {
    assetId: 'MGA-040', file: "1000206082.jpg", src: '/images/library/dades-valley-oasis-overlook-morocco-mga-040.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/dades-valley-oasis-overlook-morocco-mga-040-480w.webp' }, { w: 768, url: '/images/library/srcset/dades-valley-oasis-overlook-morocco-mga-040-768w.webp' }, { w: 1280, url: '/images/library/srcset/dades-valley-oasis-overlook-morocco-mga-040-1280w.webp' }, { w: 1920, url: '/images/library/srcset/dades-valley-oasis-overlook-morocco-mga-040-1920w.webp' }], width: 1920, height: 1343,
    alt: "Person in a djellaba with arms wide above the lush Dades Valley oasis from a viewpoint",
    title: "Overlooking the Dades Valley oasis",
    description: "Person in djellaba with arms wide above the lush Dades Valley oasis from a viewpoint",
    section: "Dades Valley & Todra Gorge",
    destination: "dades-valley", context: "destination", verification: 'approved',
  },
  'MGA-041': {
    assetId: 'MGA-041', file: "1000206216.jpg", src: '/images/library/private-fleet-dunes-merzouga-morocco-mga-041.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/private-fleet-dunes-merzouga-morocco-mga-041-480w.webp' }, { w: 768, url: '/images/library/srcset/private-fleet-dunes-merzouga-morocco-mga-041-768w.webp' }, { w: 1280, url: '/images/library/srcset/private-fleet-dunes-merzouga-morocco-mga-041-1280w.webp' }], width: 1440, height: 1800,
    alt: "Silver Toyota Land Cruiser on a Sahara dune crest — private fleet hero image",
    title: "Morocco Grand Adventure private fleet on the dunes",
    description: "Silver Toyota Land Cruiser on Sahara dune crest — private fleet hero image",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'approved',
  },
  'MGA-042': {
    assetId: 'MGA-042', file: "1000206220.jpg", src: '/images/library/land-cruiser-camel-caravan-erg-chebbi-mga-042.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/land-cruiser-camel-caravan-erg-chebbi-mga-042-480w.webp' }, { w: 768, url: '/images/library/srcset/land-cruiser-camel-caravan-erg-chebbi-mga-042-768w.webp' }], width: 1000, height: 453,
    alt: "Private Land Cruiser alongside a camel caravan — the ultimate Sahara combo, Erg Chebbi",
    title: "Land Cruiser and camel caravan at Erg Chebbi",
    description: "Private Land Cruiser alongside camel caravan — the ultimate Sahara combo, Erg Chebbi",
    section: "About Us — Our Private Transport Fleet",
    destination: "merzouga", context: "fleet", verification: 'approved',
  },
  'MGA-043': {
    assetId: 'MGA-043', file: "1000206225.jpg", src: '/images/library/friends-land-cruiser-hood-morocco-mga-043.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/friends-land-cruiser-hood-morocco-mga-043-480w.webp' }], width: 711, height: 711,
    alt: "Four female friends posing on a silver Land Cruiser hood — private desert road trip",
    title: "Friends on the Land Cruiser hood",
    description: "Four female friends posing on silver Land Cruiser hood — private desert road trip",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'approved',
  },
  'MGA-044': {
    assetId: 'MGA-044', file: "1000206229.jpg", src: '/images/library/private-minivans-morocco-mga-044.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/private-minivans-morocco-mga-044-480w.webp' }], width: 671, height: 446,
    alt: "Group loading into three private black minivans — Morocco Grand Adventure fleet",
    title: "Morocco Grand Adventure private minivans",
    description: "Group loading into three private black minivans — Morocco Grand Adventure fleet",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'approved',
  },
  'MGA-045': {
    assetId: 'MGA-045', file: "1000206218.jpg", src: '/images/library/land-cruiser-todra-gorge-entrance-mga-045.jpg',
    webp: [{ w: 480, url: '/images/library/srcset/land-cruiser-todra-gorge-entrance-mga-045-480w.webp' }, { w: 768, url: '/images/library/srcset/land-cruiser-todra-gorge-entrance-mga-045-768w.webp' }, { w: 1280, url: '/images/library/srcset/land-cruiser-todra-gorge-entrance-mga-045-1280w.webp' }], width: 1440, height: 1800,
    alt: "Black Land Cruiser at the entrance of Todra Gorge — private tour fleet at a heritage site",
    title: "Private Land Cruiser at Todra Gorge",
    description: "Black Land Cruiser at entrance of Todra Gorge — private tour fleet at heritage site",
    section: "About Us — Our Private Transport Fleet",
    destination: "todra-gorge", context: "fleet", verification: 'approved',
  },
  'MGA-046': {
    assetId: 'MGA-046', file: "1000206223.jpg", src: null,
    alt: "Five female tourists celebrating on a white Land Cruiser with Moroccan plates visible",
    title: "Celebrating on a white Land Cruiser",
    description: "Five female tourists celebrating on white Land Cruiser — Moroccan plates visible",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'verify-sticker',
    publishNote: "BLOCKED — verify the 'TOURIS-ME' windscreen sticker before publishing.",
  },
};

export const PUBLISHABLE_ASSET_IDS = Object.keys(PHOTO_LIBRARY)
  .filter((id) => !RESTRICTED_ASSETS[id]);

/**
 * Thematic stand-ins ONLY — NOT photographic identity.
 *
 * UPDATE: the original 46 binaries are still not in the repository, but the
 * official Photo Library PDF has been decoded (ASCII85+DCT) and the 44
 * publishable photographs are now imported as derivative assets under
 * /images/library/ (one JPEG per Asset ID — see PHOTO_LIBRARY[].src). Those are the ACTUAL
 * PDF photographs — each was verified byte-level (SOI/EOI), decoded with
 * sharp, and visually cross-checked against the PDF captions. The two
 * restricted assets (MGA-023, MGA-046) remain unpublished.
 *
 * The REPO_IMAGE_MATCHES block below is retained as a historical record of
 * the earlier stand-in strategy. Nothing imports it at runtime; the real
 * library photos are now used instead. Do not add new placements here.
 *
 * standInConfidence: 'close-subject' — different photo, same subject/place
 *                    'same-theme'    — same location/theme, different subject
 *                    'none'          — no corresponding repo image exists yet
 */
export type StandInConfidence = 'close-subject' | 'same-theme' | 'none';
export interface RepoImageMatch {
  image?: string;            // EXISTING repo stand-in path — a different photo, never an MGA original
  standInConfidence: StandInConfidence;
  placement?: string;        // where the matched image is implemented
  note?: string;
}
export const REPO_IMAGE_MATCHES: Record<string, RepoImageMatch> = {
/* eslint-disable */
// PRE-GENERATED THEMATIC STAND-IN PLACEMENTS (NOT photographic duplicates).
// Each entry maps an MGA Asset ID to an EXISTING repo image of the same
// subject/theme, used as a truthful stand-in until originals are supplied.
  // 1 — Desert & Sahara — camel trekking
  'MGA-001': { image: '/images/catalog/berber-camel-guide-sahara-merzouga.webp', standInConfidence: 'close-subject', placement: 'Merzouga destination gallery; camel-trekking hub' },
  'MGA-024': { image: '/images/curated/berber-guide-camels-sahara-desert-morocco.webp', standInConfidence: 'same-theme', note: 'caravan-by-day subject stand-in' },
  'MGA-029': { standInConfidence: 'none', note: 'no woman-in-teal-dune image in repo' },
  'MGA-031': { image: '/images/curated/sahara-desert-dunes-couple-sunset-merzouga.webp', standInConfidence: 'same-theme', placement: 'Merzouga destination gallery' },
  // 2 — Quad biking (no vehicle imagery in repo)
  'MGA-002': { standInConfidence: 'none', note: 'no quad image in repo; hub uses honest generic dune hero' },
  'MGA-008': { standInConfidence: 'none' },
  'MGA-011': { standInConfidence: 'none' },
  'MGA-010': { standInConfidence: 'none' },
  // 3 — 4x4 desert drive
  'MGA-006': { standInConfidence: 'none', note: 'no 4x4 vehicle image in repo' },
  // 4 — Luxury desert camp
  'MGA-005': { image: '/images/curated/sahara-desert-camp-starry-night-lantern-merzouga.webp', standInConfidence: 'same-theme', placement: 'Merzouga destination gallery; luxury camp hubs' },
  'MGA-034': { image: '/images/catalog/luxury-desert-camp-sunset-merzouga.webp', standInConfidence: 'same-theme', placement: 'Erg Chebbi destination gallery' },
  // 5 — Erg Chebbi pure landscape
  'MGA-033': { image: '/images/dest/erg-chebbi.webp', standInConfidence: 'same-theme', placement: 'Erg Chebbi hero + gallery' },
  'MGA-028': { image: '/images/catalog/sahara-dune-trekking-merzouga.webp', standInConfidence: 'same-theme', placement: 'camel/quad hubs' },
  // 6 — Marrakech Jemaa el-Fna
  'MGA-017': { image: '/images/catalog/jemaa-el-fna-night-marrakech.webp', standInConfidence: 'close-subject', placement: 'Marrakech destination gallery' },
  'MGA-003': { standInConfidence: 'none', note: 'no snake-charmer image in repo' },
  'MGA-018': { image: '/images/dest/marrakech.webp', standInConfidence: 'same-theme', placement: 'Marrakech hero' },
  // 7 — Marrakech culture & heritage
  'MGA-013': { image: '/images/catalog/moroccan-palace-ceiling-muqarnas.webp', standInConfidence: 'same-theme', placement: 'Fes destination gallery (heritage interior)' },
  'MGA-004': { image: '/images/catalog/tbourida-fantasia-marrakech.webp', standInConfidence: 'same-theme', note: 'ceremonial-dress culture shot near Koutoubia; not water sellers', placement: 'Marrakech destination gallery' },
  'MGA-030': { standInConfidence: 'none', note: 'no Guerrab portrait in repo' },
  // 8 — Marrakech souks & medina
  'MGA-009': { image: '/images/curated/marrakech-souk-brass-lanterns-market.webp', standInConfidence: 'same-theme', placement: 'Marrakech destination gallery' },
  'MGA-027': { image: '/images/curated/marrakech-medina-street-life-locals-morocco.webp', standInConfidence: 'same-theme', placement: 'Marrakech destination gallery' },
  // 9 — Fes medina & culture
  'MGA-020': { image: '/images/curated/fes-tannery-chouara-leather-dyeing-morocco.webp', standInConfidence: 'same-theme', note: 'leather-craft subject via Chouara tannery', placement: 'Fes destination gallery' },
  'MGA-039': { image: '/images/catalog/moroccan-palace-ceiling-muqarnas.webp', standInConfidence: 'same-theme', placement: 'Fes destination gallery' },
  'MGA-038': { image: '/images/curated/tannery-workers-dyeing-pits-fes.webp', standInConfidence: 'same-theme', placement: 'Fes destination gallery' },
  // 10 — Chefchaouen
  'MGA-019': { image: '/images/catalog/chefchaouen-blue-city-rif.webp', standInConfidence: 'close-subject', placement: 'Chefchaouen hero/gallery' },
  // 11 — Ait Ben Haddou
  'MGA-035': { image: '/images/curated/ait-ben-haddou-bridge-town-unesco-morocco.webp', standInConfidence: 'same-theme', note: 'river crossing + ksar', placement: 'Ait Ben Haddou destination gallery' },
  'MGA-037': { image: '/images/curated/ait-benhaddou-kasbah-sunset-unesco-morocco.webp', standInConfidence: 'same-theme', placement: 'Ait Ben Haddou destination gallery' },
  // 12 — Dades & Todra
  'MGA-026': { image: '/images/curated/todra-gorge-river-canyon-high-atlas.webp', standInConfidence: 'same-theme', placement: 'Todra Gorge destination gallery' },
  'MGA-036': { image: '/images/dest/dades-valley.webp', standInConfidence: 'same-theme', placement: 'Dades Valley hero' },
  'MGA-040': { standInConfidence: 'none', note: 'no viewpoint figure image for Dades' },
  // 13 — Atlas & road trips
  'MGA-016': { image: '/images/hero/atlas-pano.webp', standInConfidence: 'same-theme', note: 'High Atlas panorama', placement: 'Destinations index hero' },
  // 14 — Coast
  'MGA-007': { standInConfidence: 'none', note: 'no aerial surf image in repo' },
  'MGA-012': { standInConfidence: 'none', note: 'no surfer image in repo' },
  'MGA-032': { standInConfidence: 'none', note: 'no camels-on-beach image in repo' },
  // 15 — Essaouira
  'MGA-025': { image: '/images/catalog/essaouira-sqala-du-port-atlantic.webp', standInConfidence: 'same-theme', note: 'Essaouira ramparts rather than blue door', placement: 'Essaouira destination gallery' },
  // 16 — Merzouga accommodation & architecture
  'MGA-021': { image: '/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp', standInConfidence: 'same-theme', note: 'southern-Morocco kasbah architecture' },
  'MGA-022': { image: '/images/riad/courtyard.webp', standInConfidence: 'same-theme', placement: 'Merzouga destination gallery (accommodation)' },
  // 17 — Culture, food & crafts
  'MGA-014': { image: '/images/catalog/moroccan-mint-tea-riad.webp', standInConfidence: 'close-subject', placement: 'shared culture imagery' },
  'MGA-015': { standInConfidence: 'none', note: 'no blacksmith image in repo' },
  // 18 — Location uncertain — DO NOT PUBLISH
  'MGA-023': { standInConfidence: 'none', note: 'BLOCKED (unverified-location); never published, no derivatives' },
  // 19 — Private transport fleet
  'MGA-041': { standInConfidence: 'none', note: 'no Land Cruiser dune-crest image in repo' },
  'MGA-042': { standInConfidence: 'none' },
  'MGA-043': { image: '/images/personal/group-atlas.webp', standInConfidence: 'same-theme', note: 'private group road-trip subject', placement: 'About — Our cars & transport' },
  'MGA-044': { image: '/images/personal/guests-van.webp', standInConfidence: 'same-theme', note: 'guests with private minivan', placement: 'About — Our cars & transport' },
  'MGA-045': { image: '/images/personal/guests-sunset.webp', standInConfidence: 'same-theme', note: 'private desert journey experience', placement: 'About — Our cars & transport' },
  'MGA-046': { standInConfidence: 'none', note: 'BLOCKED (verify-sticker); never published until TOURIS-ME sticker verified' },
};
export function isPublishable(assetId: string): boolean {
  const a = PHOTO_LIBRARY[assetId];
  return !!a && !RESTRICTED_ASSETS[assetId] && a.verification === 'approved' && !!a.src;
}

/**
 * Responsive `srcSet` for an official-library photograph: WebP derivatives
 * (from the asset's own dimensions) + the JPEG master as the final fallback
 * candidate. Returns undefined when no derivatives exist.
 */
export function photoSrcSet(a: PhotoAsset): string | undefined {
  const variants = (a.webp ?? []).filter((v) => v.w > 0 && !!v.url);
  if (variants.length === 0) return undefined;
  const parts = variants.map((v) => `${v.url} ${v.w}w`);
  if (a.src) {
    const last = variants[variants.length - 1];
    parts.push(`${a.src} ${last.w}w`);
  }
  return parts.join(', ');
}

export function photo(id: string): PhotoAsset | undefined {
  return PHOTO_LIBRARY[id];
}

export function photosForDestination(destId: string): PhotoAsset[] {
  return Object.values(PHOTO_LIBRARY).filter((a) => a.destination === destId);
}

/** True when the asset is approved AND its binary is published. */
export function isPublished(a: PhotoAsset): boolean {
  return a.verification === 'approved' && !!a.src;
}

/** All published official-library photographs, sorted by Asset ID. */
export function publishableLibraryPhotos(): PhotoAsset[] {
  return Object.values(PHOTO_LIBRARY).filter(isPublished).sort((a, b) => a.assetId.localeCompare(b.assetId));
}

/** Published library photographs recorded for a destination, by Asset ID. */
export function publishablePhotosForDestination(destId: string): PhotoAsset[] {
  return photosForDestination(destId).filter(isPublished).sort((a, b) => a.assetId.localeCompare(b.assetId));
}

/** Published library photographs recorded for one or more contexts, by Asset ID. */
export function publishablePhotosForContexts(contexts: string[]): PhotoAsset[] {
  const set = new Set(contexts);
  return Object.values(PHOTO_LIBRARY)
    .filter((a) => isPublished(a) && !!a.context && set.has(a.context))
    .sort((a, b) => a.assetId.localeCompare(b.assetId));
}
