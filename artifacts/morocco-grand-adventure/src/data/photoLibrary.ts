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
    assetId: 'MGA-001', file: "1000206114.jpg", src: null,
    alt: "Berber guide leading a camel caravan across Erg Chebbi at dusk",
    title: "Erg Chebbi camel trekking at sunset",
    description: "Berber guide leading camel caravan at dusk — Erg Chebbi, Merzouga",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "camel-trekking", verification: 'approved',
  },
  'MGA-002': {
    assetId: 'MGA-002', file: "1000206106.jpg", src: null,
    alt: "Female tourist with arms outstretched on a quad bike at sunset at Erg Chebbi",
    title: "Quad biking on the Erg Chebbi dunes at sunset",
    description: "Female tourist arms outstretched on quad bike at sunset — Erg Chebbi",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-003': {
    assetId: 'MGA-003', file: "1000206101.jpg", src: null,
    alt: "Snake charmer performing at Jemaa el-Fna square in Marrakech",
    title: "Snake charmer at Jemaa el-Fna, Marrakech",
    description: "Snake charmer performing at Jemaa el-Fna square — Marrakech",
    section: "Marrakech — Jemaa el-Fna",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-004': {
    assetId: 'MGA-004', file: "1000206117.jpg", src: null,
    alt: "Three traditional Moroccan Guerrab water sellers near Koutoubia Mosque",
    title: "Guerrab water sellers near Koutoubia Mosque, Marrakech",
    description: "Three traditional Moroccan Guerrab water sellers near Koutoubia Mosque",
    section: "Marrakech — Culture & Heritage",
    destination: "marrakech", context: "culture", verification: 'approved',
  },
  'MGA-005': {
    assetId: 'MGA-005', file: "1000206098.jpg", src: null,
    alt: "Tourist walking on a Moroccan rug lined with lanterns toward Erg Chebbi — luxury camp entrance",
    title: "Luxury desert camp entrance at Erg Chebbi",
    description: "Tourist walking on Moroccan rug lined with lanterns toward Erg Chebbi — luxury camp entrance",
    section: "Luxury Desert Camp",
    destination: "merzouga", context: "luxury-camp", verification: 'approved',
  },
  'MGA-006': {
    assetId: 'MGA-006', file: "1000206111.jpg", src: null,
    alt: "White 4x4 SUV performing dune bashing in the orange Sahara Desert",
    title: "4x4 dune bashing in the Sahara",
    description: "White 4x4 SUV performing dune bashing in the orange Sahara Desert",
    section: "Adventure — 4x4 Desert Drive",
    destination: undefined, context: "4x4-desert-drive", verification: 'approved',
  },
  'MGA-007': {
    assetId: 'MGA-007', file: "1000206113.webp", src: null,
    alt: "Aerial view of surfers in the Atlantic with a Moroccan flag in the foreground",
    title: "Surfing the Moroccan Atlantic coast",
    description: "Aerial view of surfers in the Atlantic with Moroccan flag in foreground",
    section: "Moroccan Coast — Beach & Surf",
    destination: "agadir", context: "destination", verification: 'approved',
  },
  'MGA-008': {
    assetId: 'MGA-008', file: "1000206105.jpg", src: null,
    alt: "GOES Terrox 400s quad bike parked on an Erg Chebbi dune at golden hour",
    title: "ATV on the Erg Chebbi dunes at golden hour",
    description: "GOES Terrox 400s quad bike parked on Erg Chebbi dune at golden hour",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-009': {
    assetId: 'MGA-009', file: "1000206100.jpg", src: null,
    alt: "Aerial rooftop view over the colourful Marrakech souk, with Carpet Central Market visible",
    title: "Marrakech souk from above",
    description: "Aerial rooftop view over the colourful Marrakech souk — Carpet Central Market visible",
    section: "Marrakech — Souks & Medina",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-010': {
    assetId: 'MGA-010', file: "1000206116.jpg", src: null,
    alt: "Two quad bikers crossing pale Sahara dunes",
    title: "Quad biking across the Sahara dunes",
    description: "Two quad bikers crossing pale Sahara dunes",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-011': {
    assetId: 'MGA-011', file: "1000206107.jpg", src: null,
    alt: "Joyful female tourist standing on a quad bike on the Erg Chebbi dunes",
    title: "Standing up on a quad bike at Erg Chebbi",
    description: "Joyful female tourist standing on quad bike — Erg Chebbi dunes",
    section: "Adventure — Quad Biking & ATV",
    destination: "merzouga", context: "quad-biking", verification: 'approved',
  },
  'MGA-012': {
    assetId: 'MGA-012', file: "1000206112.jpg", src: null,
    alt: "Three surfers on boards at golden hour with a Moroccan rocky cliff coast behind",
    title: "Surfers at golden hour on the Moroccan coast",
    description: "Three surfers on boards at golden hour with Moroccan rocky cliff coast behind",
    section: "Moroccan Coast — Beach & Surf",
    destination: "agadir", context: "destination", verification: 'approved',
  },
  'MGA-013': {
    assetId: 'MGA-013', file: "1000206104.webp", src: null,
    alt: "Tourists inside the ornate courtyard of Ben Youssef Madrasa in Marrakech",
    title: "Ben Youssef Madrasa courtyard, Marrakech",
    description: "Tourists inside the ornate courtyard of Ben Youssef Madrasa — Marrakech",
    section: "Marrakech — Culture & Heritage",
    destination: "marrakech", context: "heritage", verification: 'approved',
  },
  'MGA-014': {
    assetId: 'MGA-014', file: "1000206115.jpg", src: null,
    alt: "Traditional Moroccan mint tea in ornate gold-decorated glasses beside a silver teapot",
    title: "Moroccan mint tea",
    description: "Traditional Moroccan mint tea in ornate gold-decorated glasses beside a silver teapot",
    section: "Moroccan Culture — Food, Crafts & People",
    destination: undefined, context: "culture", verification: 'approved',
  },
  'MGA-015': {
    assetId: 'MGA-015', file: "1000206118.jpg", src: null,
    alt: "Moroccan blacksmith hammering hot metal with sparks flying — traditional medina forge",
    title: "Blacksmith at a traditional medina forge",
    description: "Moroccan blacksmith hammering hot metal with sparks flying — traditional medina forge",
    section: "Moroccan Culture — Food, Crafts & People",
    destination: undefined, context: "culture", verification: 'approved',
  },
  'MGA-016': {
    assetId: 'MGA-016', file: "1000206099.jpg", src: null,
    alt: "Moroccan kasbah gateway on a desert road with snow-capped High Atlas behind",
    title: "Kasbah gateway on the road to the High Atlas",
    description: "Moroccan kasbah gateway on desert road with snow-capped High Atlas behind",
    section: "Atlas Mountains & Road Trips",
    destination: undefined, context: "destination", verification: 'approved',
  },
  'MGA-017': {
    assetId: 'MGA-017', file: "1000206102.jpg", src: null,
    alt: "Aerial night view of Jemaa el-Fna packed with illuminated food stalls in Marrakech",
    title: "Jemaa el-Fna at night, Marrakech",
    description: "Aerial night view of Jemaa el-Fna packed with illuminated food stalls — Marrakech",
    section: "Marrakech — Jemaa el-Fna",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-018': {
    assetId: 'MGA-018', file: "1000206103.jpg", src: null,
    alt: "Daytime view of Jemaa el-Fna with vendors and terracotta buildings",
    title: "Jemaa el-Fna by day, Marrakech",
    description: "Daytime view of Jemaa el-Fna with vendors and terracotta buildings",
    section: "Marrakech — Jemaa el-Fna",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-019': {
    assetId: 'MGA-019', file: "1000206097.jpg", src: null,
    alt: "Tourist overlooking the iconic blue-painted buildings of Chefchaouen from above",
    title: "Chefchaouen, the Blue City, from above",
    description: "Tourist overlooking the iconic blue-painted buildings of Chefchaouen from above",
    section: "Chefchaouen — The Blue City",
    destination: "chefchaouen", context: "destination", verification: 'approved',
  },
  'MGA-020': {
    assetId: 'MGA-020', file: "1000206096.webp", src: null,
    alt: "Evocative arched leather souk tunnel in the Fes medina",
    title: "Leather souk archway in Fes medina",
    description: "Evocative arched leather souk tunnel — Fes medina",
    section: "Fes — Medina & Culture",
    destination: "fes", context: "destination", verification: 'approved',
  },
  'MGA-021': {
    assetId: 'MGA-021', file: "1000206092.jpg", src: null,
    alt: "Imposing mud-brick kasbah hotel fortress entrance with palm trees in Merzouga",
    title: "Kasbah hotel entrance in Merzouga",
    description: "Imposing mud-brick kasbah hotel fortress entrance with palm trees — Merzouga",
    section: "Merzouga — Accommodation & Architecture",
    destination: "merzouga", context: "destination", verification: 'approved',
  },
  'MGA-022': {
    assetId: 'MGA-022', file: "1000206094.jpg", src: null,
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
    assetId: 'MGA-024', file: "1000206075.jpg", src: null,
    alt: "Camel caravan crossing the Erg Chebbi dunes by day near Merzouga",
    title: "Camel caravan crossing Erg Chebbi by day",
    description: "Camel caravan crossing Erg Chebbi by day, Merzouga",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "camel-trekking", verification: 'approved',
  },
  'MGA-025': {
    assetId: 'MGA-025', file: "1000206073.jpg", src: null,
    alt: "Female tourist posing at an iconic blue studded door with a Moroccan flag in Essaouira",
    title: "Blue studded door in Essaouira",
    description: "Female tourist posing at iconic blue studded door with Moroccan flag — Essaouira",
    section: "Essaouira",
    destination: "essaouira", context: "destination", verification: 'approved',
  },
  'MGA-026': {
    assetId: 'MGA-026', file: "1000206084.jpg", src: null,
    alt: "Group of tourists walking through Todra Gorge with a Berber guide — red limestone cliffs",
    title: "Walking through Todra Gorge",
    description: "Group of tourists walking through Todra Gorge with Berber guide — red limestone cliffs",
    section: "Dades Valley & Todra Gorge",
    destination: "todra-gorge", context: "destination", verification: 'approved',
  },
  'MGA-027': {
    assetId: 'MGA-027', file: "1000206086.jpg", src: null,
    alt: "Atmospheric leather souk tunnel crammed with hanging bags in the Marrakech medina",
    title: "Leather souk tunnel in the Marrakech medina",
    description: "Atmospheric leather souk tunnel crammed with hanging bags — Marrakech medina",
    section: "Marrakech — Souks & Medina",
    destination: "marrakech", context: "destination", verification: 'approved',
  },
  'MGA-028': {
    assetId: 'MGA-028', file: "1000206081.jpg", src: null,
    alt: "Tourist in a colourful Moroccan djellaba facing the Erg Chebbi dune sea near Merzouga",
    title: "Facing the Erg Chebbi dune sea",
    description: "Tourist in colourful Moroccan djellaba facing the Erg Chebbi dune sea, Merzouga",
    section: "Erg Chebbi — Pure Landscape",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-029': {
    assetId: 'MGA-029', file: "1000206091.jpg", src: null,
    alt: "Woman in a teal dress on rippled Erg Chebbi dunes at golden hour",
    title: "Erg Chebbi dunes at golden hour",
    description: "Woman in teal dress on rippled Erg Chebbi dunes at golden hour",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-030': {
    assetId: 'MGA-030', file: "1000206083.jpg", src: null,
    alt: "Close-up portrait of a smiling Guerrab water seller in ceremonial costume",
    title: "Guerrab water seller portrait, Marrakech",
    description: "Close-up portrait of smiling Guerrab water seller in ceremonial costume",
    section: "Marrakech — Culture & Heritage",
    destination: "marrakech", context: "culture", verification: 'approved',
  },
  'MGA-031': {
    assetId: 'MGA-031', file: "1000206071.jpg", src: null,
    alt: "Silhouette of a couple watching sunset from an Erg Chebbi dune — romantic Sahara",
    title: "Couple watching sunset over Erg Chebbi",
    description: "Silhouette of couple watching sunset from Erg Chebbi dune — romantic Sahara",
    section: "Desert & Sahara — Camel Trekking",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-032': {
    assetId: 'MGA-032', file: "1000206088.jpg", src: null,
    alt: "Camels resting on a wide Atlantic beach in Agadir, Morocco",
    title: "Camels on the beach in Agadir",
    description: "Camels resting on wide Atlantic beach — Agadir, Morocco",
    section: "Moroccan Coast — Beach & Surf",
    destination: "agadir", context: "destination", verification: 'approved',
  },
  'MGA-033': {
    assetId: 'MGA-033', file: "1000206093.jpg", src: null,
    alt: "Erg Chebbi dunes at blue hour — deep blue sky above glowing orange sand",
    title: "Erg Chebbi dunes at blue hour",
    description: "Erg Chebbi dunes at blue hour — deep blue sky above glowing orange sand",
    section: "Erg Chebbi — Pure Landscape",
    destination: "merzouga", context: "sahara-landscape", verification: 'approved',
  },
  'MGA-034': {
    assetId: 'MGA-034', file: "1000206090.jpg", src: null,
    alt: "Solitary date palm with a desert camp and oasis in the background at Erg Chebbi",
    title: "Date palm and desert camp at Erg Chebbi",
    description: "Solitary date palm with desert camp and oasis in background — Erg Chebbi",
    section: "Luxury Desert Camp",
    destination: "merzouga", context: "luxury-camp", verification: 'approved',
  },
  'MGA-035': {
    assetId: 'MGA-035', file: "1000206085.jpg", src: null,
    alt: "Ait Ben Haddou ksar reflected in the Ounila river — UNESCO World Heritage Site",
    title: "Ait Ben Haddou reflected in the Ounila river",
    description: "Ait Ben Haddou ksar reflected in the Ounila river — UNESCO World Heritage Site",
    section: "Ait Ben Haddou — UNESCO Heritage",
    destination: "ait-ben-haddou", context: "heritage", verification: 'approved',
  },
  'MGA-036': {
    assetId: 'MGA-036', file: "1000206074.jpg", src: null,
    alt: "Panoramic view of a traditional village in Dades Valley with the Atlas Mountain backdrop",
    title: "Dades Valley village with the Atlas behind",
    description: "Panoramic view of traditional village in Dades Valley with Atlas Mountain backdrop",
    section: "Dades Valley & Todra Gorge",
    destination: "dades-valley", context: "destination", verification: 'approved',
  },
  'MGA-037': {
    assetId: 'MGA-037', file: "1000206080.jpg", src: null,
    alt: "Tourist in a striped robe overlooking the ancient Ait Ben Haddou ksar from a rooftop",
    title: "View over Ait Ben Haddou from a rooftop",
    description: "Tourist in striped robe overlooking the ancient Ait Ben Haddou ksar from a rooftop",
    section: "Ait Ben Haddou — UNESCO Heritage",
    destination: "ait-ben-haddou", context: "heritage", verification: 'approved',
  },
  'MGA-038': {
    assetId: 'MGA-038', file: "1000206087.jpg", src: null,
    alt: "Busy souk alley lined with craft shops in the Fes medina",
    title: "Souk alley in the Fes medina",
    description: "Busy souk alley lined with craft shops — Fes medina",
    section: "Fes — Medina & Culture",
    destination: "fes", context: "destination", verification: 'approved',
  },
  'MGA-039': {
    assetId: 'MGA-039', file: "1000206095.jpg", src: null,
    alt: "Madrasa courtyard at golden hour with ornate stucco and zellige tiles in Fes",
    title: "Madrasa courtyard at golden hour, Fes",
    description: "Madrasa courtyard at golden hour with ornate stucco and zellige tiles — Fes",
    section: "Fes — Medina & Culture",
    destination: "fes", context: "heritage", verification: 'approved',
  },
  'MGA-040': {
    assetId: 'MGA-040', file: "1000206082.jpg", src: null,
    alt: "Person in a djellaba with arms wide above the lush Dades Valley oasis from a viewpoint",
    title: "Overlooking the Dades Valley oasis",
    description: "Person in djellaba with arms wide above the lush Dades Valley oasis from a viewpoint",
    section: "Dades Valley & Todra Gorge",
    destination: "dades-valley", context: "destination", verification: 'approved',
  },
  'MGA-041': {
    assetId: 'MGA-041', file: "1000206216.jpg", src: null,
    alt: "Silver Toyota Land Cruiser on a Sahara dune crest — private fleet hero image",
    title: "Morocco Grand Adventure private fleet on the dunes",
    description: "Silver Toyota Land Cruiser on Sahara dune crest — private fleet hero image",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'approved',
  },
  'MGA-042': {
    assetId: 'MGA-042', file: "1000206220.jpg", src: null,
    alt: "Private Land Cruiser alongside a camel caravan — the ultimate Sahara combo, Erg Chebbi",
    title: "Land Cruiser and camel caravan at Erg Chebbi",
    description: "Private Land Cruiser alongside camel caravan — the ultimate Sahara combo, Erg Chebbi",
    section: "About Us — Our Private Transport Fleet",
    destination: "merzouga", context: "fleet", verification: 'approved',
  },
  'MGA-043': {
    assetId: 'MGA-043', file: "1000206225.jpg", src: null,
    alt: "Four female friends posing on a silver Land Cruiser hood — private desert road trip",
    title: "Friends on the Land Cruiser hood",
    description: "Four female friends posing on silver Land Cruiser hood — private desert road trip",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'approved',
  },
  'MGA-044': {
    assetId: 'MGA-044', file: "1000206229.jpg", src: null,
    alt: "Group loading into three private black minivans — Morocco Grand Adventure fleet",
    title: "Morocco Grand Adventure private minivans",
    description: "Group loading into three private black minivans — Morocco Grand Adventure fleet",
    section: "About Us — Our Private Transport Fleet",
    destination: undefined, context: "fleet", verification: 'approved',
  },
  'MGA-045': {
    assetId: 'MGA-045', file: "1000206218.jpg", src: null,
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

export function isPublishable(assetId: string): boolean {
  const a = PHOTO_LIBRARY[assetId];
  return !!a && !RESTRICTED_ASSETS[assetId] && a.verification === 'approved' && !!a.src;
}

export function photo(id: string): PhotoAsset | undefined {
  return PHOTO_LIBRARY[id];
}

export function photosForDestination(destId: string): PhotoAsset[] {
  return Object.values(PHOTO_LIBRARY).filter((a) => a.destination === destId);
}
