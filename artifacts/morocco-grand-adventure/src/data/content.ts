// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Central Data
// Owner: Mohamed Bou Ghrara
// ─────────────────────────────────────────────────────────────────────────────

export const contactInfo = {
  whatsapp: "https://wa.me/message/QAFZ3RKJDNH4B1",
  whatsappNumber: "+212 699 846 818",
  phone: "+212 699 846 818",
  instagram: "https://www.instagram.com/morocco_grand_adventure/",
  email: "moroccograndadventure@gmail.com",
  website: "https://www.moroccograndadventure.com",
  paypal: "https://www.paypal.me/MohamedbouGhrara683",
  ownerName: "Mohamed Bou Ghrara",
  companyName: "Morocco Grand Adventure",
  address: "Merzouga, Errachidia Province, Morocco",
};

/**
 * Curated neighbouring destinations per id. Used by the destination detail
 * page instead of a blind "first three alphabetical" list, so each place links
 * to geographically or thematically genuine neighbours only. Any id not listed
 * falls back to the previous default behaviour.
 */
export const destinationNearby: Record<string, string[]> = {
  marrakech: ["ait-ben-haddou", "imlil", "ouarzazate"],
  fes: ["meknes", "ifrane", "chefchaouen"],
  merzouga: ["erg-chebbi", "ouarzazate"],
  "erg-chebbi": ["merzouga"],
  "ait-ben-haddou": ["ouarzazate", "marrakech"],
  "dades-valley": ["todra-gorge", "ait-ben-haddou", "skoura"],
  "todra-gorge": ["dades-valley", "ait-ben-haddou"],
};

export type Destination = {
  id: string;
  name: string;
  category: "Imperial Cities" | "Sahara Desert" | "Mountains" | "Beaches" | "Northern Morocco" | "Oases & Valleys";
  shortDesc: string;
  image: string;
  bestTime: string;
  description: string;
  highlights: string[];
  region: string;
  /** approximate GPS for interactive map */
  coords: { lat: number; lng: number };
};

export const destinations: Destination[] = [
  // ── Imperial Cities ────────────────────────────────────────────────────────
  {
    id: "marrakech",
    name: "Marrakech",
    category: "Imperial Cities",
    shortDesc: "The Red City — vibrant medinas, Jemaa el-Fnaa square, luxury riads.",
    image: "/images/dest/marrakech.jpg",
    bestTime: "Mar – May, Sep – Nov",
    description: "Marrakech is an intoxicating blend of ancient souks, world-class restaurants, and opulent riads. From the sensory chaos of Jemaa el-Fnaa to the tranquility of the Majorelle Garden, the Red City offers an experience that stays with you forever.",
    highlights: ["Jemaa el-Fnaa Square", "Majorelle Garden", "Bahia Palace", "Medina Souks", "Hammam & Spa"],
    region: "Central Morocco",
    coords: { lat: 31.6295, lng: -7.9811 },
  },
  {
    id: "fes",
    name: "Fes",
    category: "Imperial Cities",
    shortDesc: "The cultural heart — world's oldest university and medieval medina.",
    image: "/images/dest/fes.jpg",
    bestTime: "Mar – May, Sep – Nov",
    description: "Fes is Morocco's spiritual and intellectual capital. Its UNESCO-listed medina, Fes el-Bali, is one of the world's largest living medieval cities. The Chouara Tannery, Al-Qarawiyyin University, and labyrinthine alleys make it utterly unique.",
    highlights: ["Fes el-Bali Medina", "Chouara Tannery", "Al-Qarawiyyin University", "Medersa Bou Inania", "Bab Bou Jeloud"],
    region: "Northern Morocco",
    coords: { lat: 34.0181, lng: -5.0078 },
  },
  {
    id: "meknes",
    name: "Meknès",
    category: "Imperial Cities",
    shortDesc: "The forgotten imperial city — grand gates and Roman ruins nearby.",
    image: "/images/dest/meknes.jpg",
    bestTime: "Mar – May, Sep – Nov",
    description: "Often overlooked in favour of its more famous siblings, Meknès rewards the curious traveller with monumental Bab Mansour gate, the atmospheric medina, and easy access to the Roman ruins of Volubilis — a UNESCO World Heritage site.",
    highlights: ["Bab Mansour Gate", "Mausoleum of Moulay Ismail", "Volubilis Roman Ruins", "Heri es-Souani", "Medina"],
    region: "Northern Morocco",
    coords: { lat: 33.8935, lng: -5.5473 },
  },
  {
    id: "casablanca",
    name: "Casablanca",
    category: "Imperial Cities",
    shortDesc: "Morocco's cosmopolitan capital — Hassan II Mosque and art deco streets.",
    image: "/images/dest/casablanca.jpg",
    bestTime: "Year-round",
    description: "Morocco's largest city blends French art deco architecture with Islamic grandeur. The Hassan II Mosque — the world's third largest — rises magnificently above the Atlantic Ocean. The Corniche, Rick's Café, and vibrant nightlife make it a compelling stop.",
    highlights: ["Hassan II Mosque", "Corniche", "Art Deco Architecture", "Morocco Mall", "La Sqala"],
    region: "Atlantic Coast",
    coords: { lat: 33.5731, lng: -7.5898 },
  },
  {
    id: "rabat",
    name: "Rabat",
    category: "Imperial Cities",
    shortDesc: "Morocco's capital — the Kasbah of Oudayas and Hassan Tower.",
    image: "/images/dest/rabat.jpg",
    bestTime: "Mar – Jun, Sep – Nov",
    description: "Rabat, Morocco's capital, exudes a calm, regal elegance. The Kasbah of Oudayas, overlooking the Atlantic, and the unfinished Hassan Tower are must-sees. The modern city coexists beautifully with its ancient medina.",
    highlights: ["Kasbah des Oudayas", "Hassan Tower", "Mohammed V Mausoleum", "Chellah Necropolis", "Medina"],
    region: "Atlantic Coast",
    coords: { lat: 34.0209, lng: -6.8416 },
  },

  // ── Sahara Desert ──────────────────────────────────────────────────────────
  {
    id: "merzouga",
    name: "Merzouga",
    category: "Sahara Desert",
    shortDesc: "Gateway to Erg Chebbi — the most dramatic dunes in Morocco.",
    image: "/images/dest/merzouga.jpg",
    bestTime: "Oct – Apr",
    description: "Merzouga is the crown jewel of Morocco's desert experience. The village sits at the foot of Erg Chebbi, a sea of golden sand dunes reaching up to 150 metres high. Camel trekking, stargazing from luxury tented camps, and the silence of the Sahara create memories that last a lifetime.",
    highlights: ["Erg Chebbi Dunes", "Camel Trekking", "Luxury Desert Camps", "Stargazing", "Berber Villages"],
    region: "Sahara Desert",
    coords: { lat: 31.0988, lng: -4.0134 },
  },
  {
    id: "erg-chebbi",
    name: "Erg Chebbi",
    category: "Sahara Desert",
    shortDesc: "Morocco's most iconic sand sea — soaring dunes at sunrise.",
    image: "/images/dest/erg-chebbi.jpg",
    bestTime: "Oct – Apr",
    description: "Erg Chebbi is one of Morocco's two great ergs — large seas of sand dunes. Stretching 22km long and 5km wide, its dunes change colour from orange to gold to crimson with the shifting light. A sunrise here, mounted on a camel, is among the world's great travel experiences.",
    highlights: ["Sunrise Camel Trek", "Dune Boarding", "Berber Music Evenings", "4x4 Desert Drive", "Luxury Camp Dinner"],
    region: "Sahara Desert",
    coords: { lat: 31.1556, lng: -3.9739 },
  },
  {
    id: "ouarzazate",
    name: "Ouarzazate",
    category: "Sahara Desert",
    shortDesc: "The Hollywood of Africa — film sets, kasbahs, and desert landscapes.",
    image: "/images/dest/ouarzazate.jpg",
    bestTime: "Sep – May",
    description: "Known as the gateway to the Sahara, Ouarzazate has hosted blockbuster films including Lawrence of Arabia and Game of Thrones. Visit the Atlas Film Corporation studios, the iconic Taourirt Kasbah, and use it as a base for day trips to Aït Ben Haddou.",
    highlights: ["Atlas Film Studios", "Taourirt Kasbah", "Aït Ben Haddou (30min)", "Draa Valley", "Fint Oasis"],
    region: "Southern Morocco",
    coords: { lat: 30.9189, lng: -6.8934 },
  },
  {
    id: "ait-ben-haddou",
    name: "Aït Ben Haddou",
    category: "Sahara Desert",
    shortDesc: "UNESCO-listed fortified village — Morocco's most photographed kasbah.",
    image: "/images/dest/ait-ben-haddou.jpg",
    bestTime: "Sep – May",
    description: "This UNESCO World Heritage Site is a breath-taking example of southern Moroccan earthen-clay architecture. The labyrinthine ksar has appeared in dozens of Hollywood films. Crossing the river on stepping stones and climbing to the top granary for views over the valley is an unforgettable experience.",
    highlights: ["UNESCO Ksar", "Film Location Tour", "Sunrise Photography", "Berber Family Visits", "Pottery Workshops"],
    region: "Southern Morocco",
    coords: { lat: 31.0472, lng: -7.1291 },
  },
  {
    id: "zagora",
    name: "Zagora",
    category: "Sahara Desert",
    shortDesc: "Gateway to Erg Chigaga and the ancient Draa Valley.",
    image: "/images/dest/zagora.jpg",
    bestTime: "Oct – Mar",
    description: "Zagora marks the beginning of the real Saharan experience in the Draa Valley. The famous 'Timbuktu 52 Days by Camel' sign captures its spirit. From here, jeep excursions into the remote Erg Chigaga — far from tourist crowds — offer a truly wild desert experience.",
    highlights: ["Erg Chigaga Dunes", "Draa Valley Oases", "Berber Camps", "Camel Trekking", "Date Palm Groves"],
    region: "Southern Morocco",
    coords: { lat: 30.3295, lng: -5.8381 },
  },
  {
    id: "dades-valley",
    name: "Dades Valley",
    category: "Sahara Desert",
    shortDesc: "Spectacular gorges, ancient kasbahs, and rose-scented oases.",
    image: "/images/dest/dades-valley.jpg",
    bestTime: "Mar – Nov",
    description: "Known as the Valley of a Thousand Kasbahs, the Dades Valley offers dramatic cliff formations, winding mountain roads, and lush green oases. The Monkey Fingers rock formation is world-famous, and the valley hosts the annual Rose Festival each May.",
    highlights: ["Dades Gorge", "Monkey Fingers Rocks", "Rose Festival (May)", "Ancient Kasbahs", "Valley Trekking"],
    region: "Southern Morocco",
    coords: { lat: 31.4917, lng: -6.0166 },
  },
  {
    id: "todra-gorge",
    name: "Todra Gorge",
    category: "Sahara Desert",
    shortDesc: "Towering 300m canyon walls — rock climbing and trekking paradise.",
    image: "/images/dest/todra-gorge.jpg",
    bestTime: "Mar – Nov",
    description: "The Todra Gorge is one of Morocco's most dramatic natural wonders — sheer limestone walls soar 300 metres above a crystal-clear river. Rock climbers come from around the world, while walkers can follow the gorge deep into the High Atlas. Visiting at sunrise, when the light turns the walls gold, is magical.",
    highlights: ["Rock Climbing", "Canyon Walk", "Berber Guesthouses", "Photography", "Sunrise Views"],
    region: "Southern Morocco",
    coords: { lat: 31.5863, lng: -5.5822 },
  },
  {
    id: "skoura",
    name: "Skoura Oasis",
    category: "Oases & Valleys",
    shortDesc: "Morocco's most beautiful oasis — 1,000-year-old palm grove.",
    image: "/images/dest/skoura.jpg",
    bestTime: "Sep – May",
    description: "The Skoura oasis is a verdant miracle in the pre-Saharan landscape. Over a thousand years old, its dense palm grove hides ancient kasbahs including the magnificent Amerhidil. Horseback rides and bicycle tours through the palmeraie are among Morocco's most peaceful experiences.",
    highlights: ["Amerhidil Kasbah", "Palmeraie Cycling", "Horse Riding", "Bird Watching", "Berber Villages"],
    region: "Southern Morocco",
    coords: { lat: 31.0625, lng: -6.5572 },
  },
  {
    id: "roses-valley",
    name: "Valley of Roses",
    category: "Oases & Valleys",
    shortDesc: "Morocco's most fragrant valley — blooms every April and May.",
    image: "/images/dest/roses-valley.jpg",
    bestTime: "Apr – May (Rose Festival)",
    description: "Nestled between the High Atlas and Anti-Atlas, the Valley of Roses (Vallée des Roses) comes alive each spring when the Damask rose blooms. The annual Rose Festival in Kelaat M'Gouna is a joyful celebration of colour, music, and rose-water perfume.",
    highlights: ["Rose Festival", "Rose Water Distillery", "Kelaat M'Gouna Kasbah", "Valley Trekking", "Argan Oil Cooperatives"],
    region: "Southern Morocco",
    coords: { lat: 31.2354, lng: -6.1261 },
  },
  {
    id: "draa-valley",
    name: "Draa Valley",
    category: "Oases & Valleys",
    shortDesc: "Morocco's longest river valley — date palms, kasbahs, and ancient trade routes.",
    image: "/images/dest/draa-valley.jpg",
    bestTime: "Oct – Apr",
    description: "The Draa Valley stretches over 200km from Ouarzazate to the Saharan dunes near Zagora. Ancient caravans once carried gold and salt through this corridor of oases. The road follows a hypnotic rhythm of palm grove, kasbah, palm grove, punctuated by villages where time moves slowly.",
    highlights: ["Agdez Kasbah", "Tamegroute Green Pottery", "Palm Grove Walks", "Ancient Ksour", "Zagora Dunes"],
    region: "Southern Morocco",
    coords: { lat: 30.6904, lng: -6.3588 },
  },

  // ── Mountains ──────────────────────────────────────────────────────────────
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    category: "Mountains",
    shortDesc: "The Blue Pearl — Instagram-famous blue medina in the Rif Mountains.",
    image: "/images/dest/chefchaouen.jpg",
    bestTime: "Mar – May, Sep – Nov",
    description: "Nestled in the Rif Mountains, Chefchaouen is Morocco's most photogenic city. Every wall, staircase, and doorway is painted in countless shades of blue — an ocean-like calm that makes it one of the most peaceful places in the country. The nearby Akchour waterfalls and God's Bridge are spectacular day trips.",
    highlights: ["Blue Medina", "Plaza Uta el-Hammam", "Ras el-Ma Springs", "Akchour Waterfalls", "Rif Mountain Hikes"],
    region: "Northern Morocco",
    coords: { lat: 35.1688, lng: -5.2636 },
  },
  {
    id: "imlil",
    name: "Imlil",
    category: "Mountains",
    shortDesc: "Gateway to Toubkal — base camp for Morocco's highest peak trek.",
    image: "/images/dest/imlil.jpg",
    bestTime: "Apr – Oct",
    description: "Imlil is the starting point for treks up Jebel Toubkal (4,167m), North Africa's highest peak. The dramatic Berber village sits at 1,740m in the High Atlas and is surrounded by walnut groves, apple orchards, and traditional villages. The luxury Kasbah du Toubkal offers extraordinary mountain hospitality.",
    highlights: ["Toubkal Summit Trek", "Berber Village Stays", "Mule Trekking", "Setti Fatma Waterfalls", "Mountain Cooking Classes"],
    region: "High Atlas",
    coords: { lat: 31.1356, lng: -7.9161 },
  },
  {
    id: "ourika-valley",
    name: "Ourika Valley",
    category: "Mountains",
    shortDesc: "Lush valley one hour from Marrakech — waterfalls and Berber markets.",
    image: "/images/dest/ourika-valley.jpg",
    bestTime: "Year-round",
    description: "The Ourika Valley is the perfect day trip from Marrakech — just an hour by car yet a world away. Terraced gardens cascade down Atlas slopes, argan cooperatives offer tastings, and the Setti Fatma waterfall rewards a short hike. The Monday Berber market at Aghbalou is especially vibrant.",
    highlights: ["Setti Fatma Waterfalls", "Berber Market", "Argan Oil Cooperative", "Herb Gardens", "Lunch at Valley Restaurants"],
    region: "High Atlas",
    coords: { lat: 31.3714, lng: -7.7333 },
  },
  {
    id: "ouzoud",
    name: "Ouzoud Waterfalls",
    category: "Mountains",
    shortDesc: "Morocco's most spectacular waterfalls — Barbary macaques and rainbows.",
    image: "/images/dest/ouzoud.jpg",
    bestTime: "Mar – May, Sep – Nov",
    description: "The Ouzoud Falls are the highest in North Africa at 110 metres, plunging in a series of terraced tiers into a turquoise pool. Families of Barbary macaques play in the surrounding olive trees, and the mist creates perpetual rainbows. Local mills grind grain just as they have for centuries.",
    highlights: ["110m Waterfall", "Barbary Macaques", "Boat Tour below Falls", "Hammam", "Olive Oil Tasting"],
    region: "Middle Atlas",
    coords: { lat: 32.0167, lng: -6.7167 },
  },
  {
    id: "ifrane",
    name: "Ifrane & Cedar Forest",
    category: "Mountains",
    shortDesc: "Morocco's Switzerland — pine forests and wild Barbary macaques.",
    image: "/images/dest/ifrane.jpg",
    bestTime: "Apr – Oct (summer), Dec – Feb (snow)",
    description: "Dubbed 'Little Switzerland', Ifrane is a French-built mountain resort with chalet-style architecture and crisp mountain air. Nearby Azrou's cedar forest is home to hundreds of wild Barbary macaques that come right up to visitors. In winter, snow transforms the region into a ski destination.",
    highlights: ["Cedar Forest of Azrou", "Barbary Macaques", "Ifrane National Park", "Skiing at Mischliffen", "Lake Aaoua"],
    region: "Middle Atlas",
    coords: { lat: 33.5333, lng: -5.1167 },
  },

  // ── Atlantic Coast ─────────────────────────────────────────────────────────
  {
    id: "essaouira",
    name: "Essaouira",
    category: "Beaches",
    shortDesc: "Windswept coastal gem — blue boats, fresh seafood, and Gnawa music.",
    image: "/images/dest/essaouira.jpg",
    bestTime: "Year-round",
    description: "Essaouira is Morocco's most atmospheric port city. Its UNESCO-listed medina, swept by Atlantic trade winds, is a labyrinth of white and blue buildings. The famous Gnawa World Music Festival fills the streets with rhythm each June. The beach is world-class for kitesurfing.",
    highlights: ["Ramparts & Medina", "Gnawa Music", "Kitesurfing", "Seafood at the Port", "Mellah Jewish Quarter"],
    region: "Atlantic Coast",
    coords: { lat: 31.5085, lng: -9.7595 },
  },
  {
    id: "agadir",
    name: "Agadir",
    category: "Beaches",
    shortDesc: "Morocco's modern beach resort — golden sands and year-round sunshine.",
    image: "/images/dest/agadir.jpg",
    bestTime: "Year-round",
    description: "Agadir offers the classic beach holiday Morocco rarely advertises — 300 days of sunshine, a magnificent 8km crescent bay, and excellent resort hotels. Rebuilt after the 1960 earthquake, it has a modern European feel yet sits at the gateway to the wild Souss-Massa plain.",
    highlights: ["Agadir Beach", "Souk el Had", "Kasbah Ruins at Sunset", "Souss-Massa Bird Reserve", "Marina"],
    region: "Atlantic Coast",
    coords: { lat: 30.4278, lng: -9.5981 },
  },
  {
    id: "taghazout",
    name: "Taghazout",
    category: "Beaches",
    shortDesc: "World-class surf village — breaks, yoga retreats, and hippie vibes.",
    image: "/images/dest/taghazout.jpg",
    bestTime: "Oct – Apr (surf season)",
    description: "Once a quiet Amazigh fishing village, Taghazout has become Africa's surf mecca. Anchor Point, Killer Point, and Hash Point are legendary breaks drawing surf pilgrims year-round. The village retains a wonderfully laid-back bohemian atmosphere, with yoga retreats, fresh fish tagines, and vivid sunsets.",
    highlights: ["Anchor Point (surf)", "Killer Point (surf)", "Surf Lessons", "Yoga Retreats", "Sidi Kaouki Beach"],
    region: "Atlantic Coast",
    coords: { lat: 30.5435, lng: -9.7076 },
  },
  {
    id: "legzira",
    name: "Legzira Beach",
    category: "Beaches",
    shortDesc: "Dramatic red rock arches rising from the Atlantic — one of Africa's most beautiful beaches.",
    image: "/images/dest/legzira.jpg",
    bestTime: "Apr – Oct",
    description: "Legzira's extraordinary natural rock arches, carved by centuries of Atlantic erosion, frame one of Morocco's most dramatic beaches. The red cliffs glow pink and orange at sunset. The beach is remote, relatively undiscovered, and utterly spectacular — a photographer's dream.",
    highlights: ["Natural Rock Arches", "Sunset Photography", "Secluded Swimming", "Sidi Ifni Town (15min)", "Atlantic Cliffs Walk"],
    region: "Atlantic Coast",
    coords: { lat: 29.3719, lng: -10.1736 },
  },
  {
    id: "el-jadida",
    name: "El Jadida",
    category: "Beaches",
    shortDesc: "Portuguese citadel on the Atlantic — UNESCO-listed Citerne Portugaise.",
    image: "/images/dest/el-jadida.jpg",
    bestTime: "Year-round",
    description: "El Jadida's UNESCO-listed Portuguese Citadel is one of Morocco's most impressive coastal fortifications. The extraordinary underground cistern, built in 1514, features dramatic vaulted ceilings reflected in a shallow pool — it appeared in Orson Welles' Othello. The beach stretches for miles.",
    highlights: ["Portuguese Citadel", "Citerne Portugaise", "El Jadida Beach", "Sidi Bouzid Beach", "Mazagan Heritage"],
    region: "Atlantic Coast",
    coords: { lat: 33.2316, lng: -8.5007 },
  },

  // ── Northern Morocco ──────────────────────────────────────────────────────
  {
    id: "tangier",
    name: "Tangier",
    category: "Northern Morocco",
    shortDesc: "Gateway between Africa and Europe — Strait of Gibraltar, art, and intrigue.",
    image: "/images/dest/tangier.jpg",
    bestTime: "Mar – Oct",
    description: "Tangier has always been a city of intrigue — where Africa and Europe face each other across a narrow strip of water. Beat Generation writers, painters, and spies have all passed through. The medina, the Kasbah, and Café Hafa perched above the Strait make it irresistibly atmospheric.",
    highlights: ["Kasbah Museum", "Cap Spartel", "Hércules Caves", "Café Hafa", "Petit Socco"],
    region: "Northern Morocco",
    coords: { lat: 35.7595, lng: -5.8340 },
  },
  {
    id: "tetouan",
    name: "Tétouan",
    category: "Northern Morocco",
    shortDesc: "The little Jerusalem — Spain's whitest medina and Andalusian heritage.",
    image: "/images/dest/tetouan.jpg",
    bestTime: "Mar – Oct",
    description: "Tétouan's UNESCO-listed medina is perhaps the best-preserved in Morocco. Its strong Andalusian influence — brought by Moorish refugees expelled from Spain in 1492 — gives it a distinctly European feel. The Royal Palace, the Museum of Moroccan Arts, and the lively craftsmen quarter are unmissable.",
    highlights: ["UNESCO Medina", "Spanish Quarter", "Royal Palace Gardens", "Museum of Moroccan Arts", "Artisan Souks"],
    region: "Northern Morocco",
    coords: { lat: 35.5733, lng: -5.3709 },
  },
  {
    id: "akchour",
    name: "Akchour & God's Bridge",
    category: "Northern Morocco",
    shortDesc: "Wild gorges, turquoise pools, and a natural stone bridge near Chefchaouen.",
    image: "/images/dest/akchour.jpg",
    bestTime: "Apr – Oct",
    description: "Akchour is Chefchaouen's wild counterpart — a hidden valley of turquoise-green rivers, deep gorges, and the natural limestone arch called 'God's Bridge'. Two spectacular hikes lead to the small and large waterfalls through forests of cedar and holm oak. Often combined with a Chefchaouen visit.",
    highlights: ["God's Bridge Natural Arch", "Akchour Waterfalls", "Swimming in Gorge Pools", "Rif Forest Trek", "Berber Lunch"],
    region: "Northern Morocco",
    coords: { lat: 35.2333, lng: -5.2167 },
  },

  // ── Extra Southern Gems ────────────────────────────────────────────────────
  {
    id: "nkob",
    name: "Nkob",
    category: "Sahara Desert",
    shortDesc: "The village of 45 kasbahs — remote, unspoiled, and spectacularly beautiful.",
    image: "/images/dest/nkob.jpg",
    bestTime: "Sep – May",
    description: "Nkob is Morocco's secret — a remote village in the Jbel Saghro known as 'the village of 45 kasbahs'. Few tourists reach it, yet the landscape of volcanic rock, palm oases, and ancient fortresses is extraordinary. Nearby Jbel Saghro treks offer a dramatic alternative to the Sahara.",
    highlights: ["45 Kasbahs", "Jbel Saghro Trek", "Wild Camping", "Berber Traditions", "Dark Sky Stargazing"],
    region: "Southern Morocco",
    coords: { lat: 30.8617, lng: -5.8447 },
  },
  {
    id: "mirleft",
    name: "Mirleft",
    category: "Beaches",
    shortDesc: "Unspoilt surf village between Tiznit and Sidi Ifni — wild Atlantic coast.",
    image: "/images/dest/mirleft.jpg",
    bestTime: "Year-round",
    description: "Mirleft sits between Tiznit and Sidi Ifni on a rugged stretch of Atlantic coast that feels like the end of the world in the best possible way. A string of wild beaches — Marabout, Safarkhal, Sidi Mohammed Ben Abdallah — offer solitude, surf, and sunsets that ignite the sky.",
    highlights: ["Wild Atlantic Beaches", "Cliff-Top Sunsets", "Surf", "Snorkelling", "Argan Forest Walks"],
    region: "Atlantic Coast",
    coords: { lat: 29.5834, lng: -10.0474 },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tours
// ─────────────────────────────────────────────────────────────────────────────

export type PricingTier = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type ItineraryDay = {
  day: number;
  title: string;
  desc: string;
  stops: string[];
};

export type TourFaq = { question: string; answer: string };

export type TourGalleryImage = { src: string; caption: string };

export type Tour = {
  id: string;
  name: string;
  duration: string;
  highlights: string[];
  price: string;           // base price (2 persons) for display
  pricingTiers: PricingTier;
  image: string;
  category?: string;
  description?: string;
  aliases?: string[];
  // Optional rich content — when present, the tour detail page renders the full
  // premium layout (cinematic video, live route map, day-by-day timeline, gallery, FAQ).
  videoUrl?: string;
  videoPoster?: string;
  routeIds?: string[];
  routeCaption?: string;   // caption shown under the route map; falls back to a generic line
  itineraryDays?: ItineraryDay[];
  included?: string[];
  excluded?: string[];
  gallery?: TourGalleryImage[];
  faq?: TourFaq[];
};

export const tourSlugAliases: Record<string, string> = {
  '3-days-marrakech-to-merzouga-desert-tour': '3-day-sahara-marrakech',
  '3-days-fes-to-marrakech-desert-tour': '5-day-imperial-cities',
  'merzouga-desert-tour': '3-day-sahara-marrakech',
  'morocco-desert-tour': '7-day-imperial-cities-sahara-escape',
};

export const tours: Tour[] = [
  {
    id: "3-day-sahara-marrakech",
    name: "3-Day Luxury Sahara Tour from Marrakech",
    duration: "3 Days / 2 Nights",
    category: "Desert & Adventure",
    highlights: ["Atlas Mountains Crossing", "Aït Ben Haddou (UNESCO)", "Dades Valley", "Merzouga Luxury Camp", "Camel Trekking at Sunset"],
    price: "450",
    pricingTiers: { 1: 690, 2: 450, 3: 370, 4: 310, 5: 280 },
    image: "/images/pdf/img_1-optimized.jpg",
    aliases: ['3-days-marrakech-to-merzouga-desert-tour', 'merzouga-desert-tour'],
    description: "The classic Morocco adventure compressed into three unforgettable days. Cross the Atlas Mountains, explore the most photographed kasbah on Earth, sleep under Saharan stars in a luxury tented camp, and ride camels at sunset over the golden dunes of Erg Chebbi.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "skoura", "dades-valley", "todra-gorge", "merzouga"],
    routeCaption: "Cross the High Atlas to the kasbah of Aït Ben Haddou, wind through Ouarzazate and the Skoura oasis, then the Dades Valley and Todra Gorge on the way to the dunes of Erg Chebbi. Tap any numbered stop to explore it.",
    itineraryDays: [
      {
        day: 1,
        title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley",
        desc: "Meet your private driver in Marrakech and cross the High Atlas Mountains over the dramatic Tizi n'Tichka Pass, the highest road pass in North Africa. Pause at the UNESCO World Heritage ksar of Aït Ben Haddou, then continue through Ouarzazate and the Skoura Oasis before reaching the dramatic panorama of the Dades Valley for your first night.",
        stops: ["High Atlas Mountains", "Tizi n'Tichka Pass", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Skoura Oasis", "Overnight: Dades Valley (Dinner & Breakfast)"],
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Merzouga (Erg Chebbi)",
        desc: "Admire the winding switchback road and rock formations of the Dades Valley before driving to the towering Todra Gorge, a 300-metre-high canyon. Wind through palm groves and Berber villages to Merzouga on the edge of the Sahara, then ride camels across the golden dunes of Erg Chebbi at sunset to a luxury desert camp under the stars.",
        stops: ["Dades Valley viewpoints", "Todra Gorge", "Palm groves & Berber villages", "Sunset camel trek", "Luxury desert camp", "Berber music (Dinner & Breakfast)"],
      },
      {
        day: 3,
        title: "Merzouga → High Atlas → Marrakech",
        desc: "Wake for a spectacular sunrise over the dunes before breakfast and a camel ride back to Merzouga. After a short stop at Rissani's traditional souks, begin the long return journey across the Atlas Mountains on the scenic Tizi n'Tickna road, arriving back in Marrakech in the evening at the end of your desert adventure.",
        stops: ["Sunrise over the dunes", "Rissani market (optional)", "Ziz Valley", "High Atlas crossing", "Arrival: Marrakech"],
      },
    ],
    gallery: [
      { src: "/images/pdf/img_1-optimized.jpg", caption: "Luxury desert tours and authentic cultural experiences" },
    ],
  },
  {
    id: "5-day-imperial-cities",
    name: "5-Day Imperial Cities & Desert",
    duration: "5 Days / 4 Nights",
    category: "Cultural",
    highlights: ["Atlas Mountains Crossing", "Aït Ben Haddou (UNESCO)", "Erg Chebbi Sahara & Luxury Camp", "Fes el-Bali Medina", "Chefchaouen Blue City", "Meknès & Volubilis"],
    price: "780",
    pricingTiers: { 1: 1180, 2: 780, 3: 640, 4: 540, 5: 490 },
    image: "/images/pdf/img_2-optimized.jpg",
    aliases: ['3-days-fes-to-marrakech-desert-tour'],
    description: "From the ochre imperial capital of Marrakech to the blue-washed lanes of Chefchaouen, this five-day journey weaves together Morocco's greatest imperial cities and a night under the Sahara stars. Cross the High Atlas to the UNESCO ksar of Aït Ben Haddou, sleep in a luxury desert camp among the dunes of Erg Chebbi, explore the medieval labyrinth of Fes, and wander the Roman ruins of Volubilis.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "skoura", "dades-valley", "todra-gorge", "merzouga", "ifrane", "fes", "meknes", "chefchaouen"],
    routeCaption: "From Marrakech over the High Atlas to the dunes of Erg Chebbi, then north through the imperial cities of Fes and Meknès to the blue medina of Chefchaouen. Tap any numbered stop to explore it.",
    itineraryDays: [
      {
        day: 1,
        title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley",
        desc: "Depart Marrakech in the morning and cross the High Atlas over the Tizi n'Tichka Pass, the highest road pass in North Africa. Stop at the UNESCO-listed fortified village of Aït Ben Haddou, then continue through Ouarzazate and the Skoura Oasis to the dramatic Dades Valley for an overnight stay in a kasbah hotel or riad.",
        stops: ["High Atlas Mountains", "Tizi n'Tichka Pass", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Skoura Oasis", "Overnight: Dades Valley (Dinner & Breakfast)"],
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Merzouga (Erg Chebbi)",
        desc: "Admire the winding Dades Valley before driving to the towering Todra Gorge. Continue through Berber villages and palm oases to Merzouga at the edge of the Sahara, where you ride camels across the golden dunes of Erg Chebbi at sunset to a luxury desert camp — dinner, live Berber music and star-filled skies included.",
        stops: ["Dades Valley", "Todra Gorge", "Rissani (optional)", "Erg Chebbi dunes", "Sunset camel trek", "Luxury desert camp (Dinner & Breakfast)"],
      },
      {
        day: 3,
        title: "Merzouga → Ziz Valley → Midelt → Fes",
        desc: "Wake for sunrise over the dunes before breakfast in Merzouga. Head north through the Ziz Valley's endless palm oases, stopping in Midelt for lunch, then pass the cedar forests of the Middle Atlas and the mountain town of Ifrane before arriving at the imperial city of Fes.",
        stops: ["Sunrise over Erg Chebbi", "Ziz Valley", "Midelt", "Cedar forest & Barbary monkeys", "Ifrane", "Overnight: Fes (Breakfast)"],
      },
      {
        day: 4,
        title: "Guided Tour of Fes",
        desc: "Discover one of the world's oldest living cities with an official local guide. Explore the Royal Palace gates and the labyrinthine medieval medina of Fes el-Bali, home to Al Quaraouiyine University, the famous Chouara Tannery and bustling souks and artisan workshops. Your evening is free to savour Fes at your own pace.",
        stops: ["Royal Palace gates", "Fes el-Bali medina", "Al Quaraouiyine University", "Chouara Tannery", "Souks & pottery workshops"],
      },
      {
        day: 5,
        title: "Fes → Meknès → Volubilis → Chefchaouen",
        desc: "Travel to the imperial city of Meknès to admire the monumental Bab Mansour gate and the Mausoleum of Moulay Ismail, then wander the remarkably preserved Roman ruins of Volubilis. Continue on to the famous Blue City of Chefchaouen, where the afternoon and evening are free to explore the photogenic, blue-washed streets of the medina.",
        stops: ["Bab Mansour Gate", "Mausoleum of Moulay Ismail", "Volubilis Roman Ruins (UNESCO)", "Chefchaouen medina", "Overnight: Chefchaouen"],
      },
    ],
    gallery: [
      { src: "/images/pdf/img_2-optimized.jpg", caption: "Golden Sahara dunes and a luxury desert camp on the route to Merzouga" },
    ],
  },
  {
    id: "7-day-imperial-cities-sahara-escape",
    name: "7-Day Imperial Cities & Sahara Escape",
    duration: "7 Days / 6 Nights",
    category: "Grand Tour",
    highlights: [
      "High Atlas & Tizi n'Tichka Pass",
      "Aït Ben Haddou (UNESCO)",
      "Dades Valley & Todra Gorge",
      "Erg Chebbi Camel Trek at Sunset",
      "Luxury Desert Camp under the Stars",
      "Imperial Fes Guided Tour",
      "Cedar Forest & Barbary Monkeys",
    ],
    price: "1200",
    pricingTiers: { 1: 1820, 2: 1200, 3: 990, 4: 830, 5: 740 },
    image: "/images/tours/7-day-grand-morocco.jpg",
    aliases: ['morocco-desert-tour'],
    description:
      "Experience the very best of Morocco in seven unforgettable days. Cross the spectacular High Atlas Mountains over the Tizi n'Tichka Pass, explore the UNESCO kasbah of Aït Ben Haddou, wind through the Dades Valley and the towering Todra Gorge, then ride camels across the golden dunes of Erg Chebbi to a luxury desert camp beneath the stars. Journey north through the Ziz Valley and cedar forests to the medieval imperial city of Fes, before returning to Marrakech through some of the country's most breathtaking landscapes.",
    videoUrl: "/videos/dunes-camels.mp4",
    videoPoster: "/images/personal/dunes-camels-poster.jpg",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "ifrane", "fes"],
    routeCaption: "A grand loop that begins and ends in Marrakech — south over the High Atlas to Aït Ben Haddou and the Dades and Todra gorges, on to the golden dunes of Merzouga, then north through the cedar forests to imperial Fes before the scenic return. Tap any numbered stop to explore it.",
    itineraryDays: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Dades Valley",
        desc: "Meet your private driver in Marrakech and travel across the spectacular High Atlas Mountains via the Tizi n'Tichka Pass. Visit the UNESCO World Heritage site of Aït Ben Haddou, then continue to Ouarzazate, famous for its film studios. Drive through the Skoura Oasis and the Valley of Roses before arriving in the beautiful Dades Valley for the night.",
        stops: ["High Atlas Mountains", "Tizi n'Tichka Pass", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Skoura Oasis", "Valley of Roses", "Overnight: Dades Valley (Dinner & Breakfast)"],
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Merzouga Sahara",
        desc: "After breakfast, marvel at the magnificent Todra Gorge, then drive through palm groves and Berber villages toward Merzouga. Ride camels across the golden dunes of Erg Chebbi as the sun sets, then enjoy a traditional Moroccan dinner and live Berber music before sleeping under the stars in a luxury desert camp.",
        stops: ["Todra Gorge", "Palm groves & Berber villages", "Erg Chebbi dunes", "Sunset camel trek", "Berber music", "Overnight: Luxury Desert Camp (Dinner & Breakfast)"],
      },
      {
        day: 3,
        title: "A Full Day in the Sahara Desert",
        desc: "Wake for a spectacular sunrise over the dunes and spend a full day exploring the desert — visit the village of Khamlia for soulful Gnawa music, share tea with nomad families, and discover the Black Desert, fossil beds, and a hidden oasis. Optional quad bikes, buggies, and sandboarding fill the afternoon before another magical desert evening.",
        stops: ["Sunrise over the dunes", "Khamlia village & Gnawa music", "Tea with nomad families", "Black Desert & fossils", "Oasis", "Sandboarding", "Overnight: Merzouga Hotel (Dinner & Breakfast)"],
      },
      {
        day: 4,
        title: "Merzouga → Ziz Valley → Midelt → Ifrane → Fes",
        desc: "Travel north through the spectacular Ziz Valley and its endless palm oases, stopping in Midelt for lunch. Visit the cedar forest where Barbary monkeys roam, pass through Ifrane — the 'Switzerland of Morocco' — and arrive in the imperial city of Fes.",
        stops: ["Ziz Valley", "Midelt", "Cedar Forest & Barbary monkeys", "Ifrane", "Overnight: Fes (Breakfast)"],
      },
      {
        day: 5,
        title: "Guided Tour of Fes",
        desc: "Discover one of the world's oldest living cities with an official local guide. Explore the Royal Palace gates, the Jewish Quarter, and the labyrinthine medieval medina — home to Al Quaraouiyine University, the famous tanneries, bustling souks, and traditional pottery workshops. Your evening is free to explore at your own pace.",
        stops: ["Royal Palace", "Jewish Quarter", "Medieval Medina", "Al Quaraouiyine University", "Tanneries", "Souks & pottery workshops", "Overnight: Fes (Breakfast)"],
      },
      {
        day: 6,
        title: "Fes → Cedar Forest → Beni Mellal → Marrakech",
        desc: "Leave Fes and travel through the Middle Atlas Mountains, passing beautiful forests, lakes, waterfalls, and traditional Berber villages on the scenic road back to Marrakech, where the evening is yours to enjoy.",
        stops: ["Middle Atlas Mountains", "Forests, lakes & waterfalls", "Beni Mellal", "Overnight: Marrakech (Breakfast)"],
      },
      {
        day: 7,
        title: "Marrakech Guided Tour & Departure",
        desc: "Explore the Red City with a certified local guide, visiting the exquisite Bahia Palace, the towering Koutoubia Mosque, the Saadian Tombs, the vibrant Jemaa el-Fna square, and the traditional souks — with an optional stop at the Majorelle Garden. Transfer to your hotel or Marrakech Airport at the end of your journey.",
        stops: ["Bahia Palace", "Koutoubia Mosque", "Saadian Tombs", "Majorelle Garden (optional)", "Jemaa el-Fna", "Traditional souks", "Airport / hotel drop-off"],
      },
    ],
    included: [
      "Private air-conditioned vehicle",
      "Professional English-speaking driver",
      "Fuel",
      "Luxury desert camp",
      "Camel trek in Erg Chebbi",
      "Private rooms throughout",
      "Daily breakfasts",
      "Dinners as per itinerary",
      "Local guide in Fes",
      "Sandboarding",
      "Hotel pick-up & drop-off",
      "Free WiFi in most hotels",
    ],
    excluded: [
      "International flights",
      "Lunches",
      "Drinks",
      "Monument & museum entrance fees",
      "Tips & gratuities",
      "Personal expenses",
      "Optional quad bikes & buggies",
    ],
    gallery: [
      { src: "/images/dest/ait-ben-haddou.jpg", caption: "Aït Ben Haddou — UNESCO ksar" },
      { src: "/images/dest/ouarzazate.jpg", caption: "Ouarzazate — gateway to the desert" },
      { src: "/images/dest/dades-valley.jpg", caption: "The winding Dades Valley" },
      { src: "/images/dest/todra-gorge.jpg", caption: "The towering Todra Gorge" },
      { src: "/images/dest/merzouga.jpg", caption: "Erg Chebbi dunes at Merzouga" },
      { src: "/images/personal/luxury-camp-dusk.jpg", caption: "Our luxury desert camp at dusk" },
      { src: "/images/personal/sahara-dunes-golden.jpg", caption: "Golden dunes at sunrise" },
      { src: "/images/dest/ifrane.jpg", caption: "Ifrane — the Switzerland of Morocco" },
      { src: "/images/dest/fes.jpg", caption: "Fes — the medieval imperial city" },
      { src: "/images/dest/marrakech.jpg", caption: "Marrakech — the Red City" },
      { src: "/images/personal/guide-guest-tea.jpg", caption: "Sweet mint tea with our guests" },
      { src: "/images/personal/guests-sunset.webp", caption: "A Sahara sunset with our travelers" },
    ],
    faq: [
      {
        question: "Is this a private tour?",
        answer: "Yes — every departure is fully private for your party alone. You travel with your own dedicated English-speaking driver and set the pace together, with no strangers joining your group.",
      },
      {
        question: "What is the accommodation like?",
        answer: "Handpicked hotels and riads with private rooms throughout, plus one unforgettable night in a luxury tented camp on the dunes of Erg Chebbi, with real beds and en-suite bathrooms.",
      },
      {
        question: "How much time is spent in the Sahara?",
        answer: "Two nights near the dunes — the first in the luxury desert camp reached by camel, followed by a full day exploring Merzouga (nomad families, Gnawa music, sandboarding and more) with a second night at a desert hotel.",
      },
      {
        question: "When is the best time to take this tour?",
        answer: "It runs year-round. Spring (March–May) and autumn (September–November) are ideal, with warm days and comfortable desert nights. Winter is crisp and clear; summer is hot inland, so we start early and plan around the heat.",
      },
      {
        question: "How do I confirm my booking?",
        answer: "Message us on WhatsApp to lock in your dates and we'll tailor the details to you. A small deposit secures your tour, with the balance payable before or at the start of the trip.",
      },
    ],
  },
  {
    id: "honeymoon-morocco",
    name: "Romantic Morocco Honeymoon",
    duration: "10 Days / 9 Nights",
    category: "Honeymoon",
    highlights: ["Luxury Riads Only", "Private Desert Camp", "Hot Air Balloon over Marrakech", "Hammam & Spa", "Sunset Camel Trek"],
    price: "2500",
    pricingTiers: { 1: 2500, 2: 2500, 3: 2500, 4: 2500, 5: 2500 },
    image: "/images/tours/honeymoon-morocco.jpg",
    description: "Designed exclusively for couples, this honeymoon itinerary weaves romance into every moment. Private riad suites, a candlelit dinner in the Sahara, a hot air balloon flight over the Atlas at dawn, and a hamam ritual for two — Morocco has never been so intimate.",
  },
  {
    id: "8-day-marrakech-essaouira-agadir-sahara",
    name: "8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure",
    duration: "8 Days / 7 Nights",
    category: "Luxury Grand Tour",
    highlights: [
      "Imperial Marrakech & Bahia Palace",
      "Essaouira's Atlantic Medina",
      "Taghazout & Agadir Coastline",
      "UNESCO Aït Ben Haddou",
      "Todra Gorge & Dades Valley",
      "Erg Chebbi Camel Trek at Sunset",
      "Luxury Desert Camp under the Stars",
    ],
    price: "1390",
    pricingTiers: { 1: 1990, 2: 1390, 3: 1150, 4: 980, 5: 870 },
    image: "/images/dest/merzouga.jpg",
    description:
      "The ultimate grand loop of southern Morocco — from the palaces and souks of Marrakech to the windswept Atlantic port of Essaouira, down the surf coast through Taghazout and Agadir, then inland across saffron country to the UNESCO kasbah of Aït Ben Haddou, the dramatic Todra and Dades gorges, and finally the towering golden dunes of Erg Chebbi. Eight days of private travel, handpicked luxury riads and hotels, a night in a premium desert camp, and a camel trek beneath the Sahara stars.",
    videoUrl: "/videos/sahara-experience.mp4",
    videoPoster: "/images/personal/luxury-camp-dusk.jpg",
    routeIds: ["marrakech", "essaouira", "taghazout", "agadir", "ouarzazate", "ait-ben-haddou", "dades-valley", "todra-gorge", "merzouga"],
    routeCaption: "Follow the grand loop — from Marrakech out to the Atlantic coast, then across the High Atlas to the dunes of the Sahara, and back. Tap any numbered stop to explore it.",
    itineraryDays: [
      {
        day: 1,
        title: "Marrakech — Arrival & the Red City",
        desc: "Your private driver welcomes you at Marrakech airport and transfers you to a traditional riad in the heart of the medina. Settle in, then step into the theatre of Jemaa el-Fnaa, admire the soaring Koutoubia Mosque, and lose yourself in the exquisite mosaics of Bahia Palace as the city glows at dusk.",
        stops: ["Airport pickup", "Traditional riad", "Jemaa el-Fnaa", "Koutoubia Mosque", "Bahia Palace"],
      },
      {
        day: 2,
        title: "Marrakech → Essaouira",
        desc: "Drive west toward the Atlantic, pausing at a women's argan oil cooperative along the way. Reach the breezy port city of Essaouira and wander its UNESCO-listed medina and working fishing port, finishing with a golden sunset over the beach.",
        stops: ["Argan oil cooperative", "Atlantic coast", "Essaouira Medina", "Fishing port", "Sunset on the beach"],
      },
      {
        day: 3,
        title: "Essaouira → Agadir",
        desc: "Follow the scenic coastal road south through the laid-back surf village of Taghazout, with an optional detour to the palm-fringed pools of Paradise Valley, before arriving at Agadir's modern marina and its long, sun-soaked beach.",
        stops: ["Scenic coastal drive", "Taghazout", "Paradise Valley (optional)", "Agadir Marina", "Agadir Beach"],
      },
      {
        day: 4,
        title: "Agadir → Taroudant → Taliouine → Ouarzazate",
        desc: "Head inland to the walled town of Taroudant, the 'Grandmother of Marrakech', then on through Taliouine — Morocco's saffron capital — and its fragrant fields. Continue to Ouarzazate, gateway to the desert, visiting the mighty Kasbah Taourirt before your overnight stay.",
        stops: ["Taroudant", "Saffron fields", "Kasbah Taourirt", "Overnight in Ouarzazate"],
      },
      {
        day: 5,
        title: "Ouarzazate → Aït Ben Haddou → Dades Valley",
        desc: "Tour the famous Atlas Studios, then explore the UNESCO-listed ksar of Aït Ben Haddou, a fortified earthen city seen in countless films. Drive on through the Valley of Roses to the sculpted red rock formations of the Dades Gorges.",
        stops: ["Atlas Studios", "UNESCO Aït Ben Haddou", "Valley of Roses", "Dades Gorges"],
      },
      {
        day: 6,
        title: "Dades Valley → Todra Gorge → Merzouga",
        desc: "Marvel at the towering walls of the Todra Canyon and pass through traditional Berber villages on the way to the edge of the Sahara at Erg Chebbi. Trade the vehicle for camels and trek into the dunes to your luxury desert camp for dinner and live Berber music under the stars.",
        stops: ["Todra Canyon", "Berber villages", "Erg Chebbi dunes", "Camel trekking", "Luxury desert camp", "Traditional Berber music"],
      },
      {
        day: 7,
        title: "Merzouga — A Full Day in the Sahara",
        desc: "Wake for a spectacular sunrise over the dunes, then explore deeper by 4x4 — meeting nomad families and hearing soulful Gnawa music. Optional quad biking and sandboarding fill the afternoon before a final desert sunset and a night in a luxury hotel in Merzouga.",
        stops: ["Sunrise in the Sahara", "4x4 desert tour", "Nomad families", "Gnawa music", "Quad bike (optional)", "Sandboarding", "Sunset", "Luxury hotel in Merzouga"],
      },
      {
        day: 8,
        title: "Merzouga → Marrakech",
        desc: "Journey back across the roof of Morocco — through Alnif and the palm oases of the Draa Valley, then climbing the High Atlas Mountains over the dramatic Tizi n'Tichka Pass before arriving back in Marrakech.",
        stops: ["Alnif", "Draa Valley", "High Atlas Mountains", "Tizi n'Tichka Pass", "Arrival in Marrakech"],
      },
    ],
    included: [
      "Luxury accommodation throughout",
      "Daily breakfast",
      "Daily dinner",
      "Private, air-conditioned transportation",
      "Professional English-speaking driver",
      "Camel trekking in Erg Chebbi",
      "One night in a luxury desert camp",
      "Hotel & airport pickup",
      "Drop-off at the end of the tour",
      "Free WiFi in the vehicle",
      "Bottled mineral water daily",
    ],
    excluded: [
      "International flights",
      "Lunches",
      "Monument & museum entrance fees",
      "Travel insurance",
      "Optional activities (Paradise Valley, quad biking)",
      "Personal expenses & souvenirs",
      "Gratuities for driver & guides",
    ],
    gallery: [
      { src: "/images/dest/marrakech.jpg", caption: "Marrakech — the Red City" },
      { src: "/images/dest/essaouira.jpg", caption: "Essaouira — windswept Atlantic port" },
      { src: "/images/dest/taghazout.jpg", caption: "Taghazout — the surf coast" },
      { src: "/images/dest/agadir.jpg", caption: "Agadir — marina & beach" },
      { src: "/images/dest/ait-ben-haddou.jpg", caption: "Aït Ben Haddou — UNESCO ksar" },
      { src: "/images/dest/dades-valley.jpg", caption: "The winding Dades Valley" },
      { src: "/images/dest/todra-gorge.jpg", caption: "The towering Todra Gorge" },
      { src: "/images/dest/merzouga.jpg", caption: "Erg Chebbi dunes at Merzouga" },
      { src: "/images/personal/luxury-camp-dusk.jpg", caption: "Our luxury desert camp at dusk" },
      { src: "/images/personal/sahara-dunes-golden.jpg", caption: "Golden dunes at sunrise" },
      { src: "/images/personal/guide-guest-tea.jpg", caption: "Sweet mint tea with our guests" },
      { src: "/images/personal/guests-sunset.webp", caption: "A Sahara sunset with our travelers" },
    ],
    faq: [
      {
        question: "Is this a private tour?",
        answer: "Yes — every departure is fully private for your party alone. You travel with your own dedicated English-speaking driver and set the pace together, with no strangers joining your group.",
      },
      {
        question: "What level of accommodation is included?",
        answer: "Handpicked luxury riads and hotels throughout, plus one unforgettable night in a premium tented desert camp at Erg Chebbi with real beds and en-suite bathrooms.",
      },
      {
        question: "When is the best time to take this tour?",
        answer: "It runs year-round. Spring (March–May) and autumn (September–November) are ideal, with warm days and comfortable desert nights. Winter is crisp and clear; summer is hot inland but the Atlantic coast stays pleasant.",
      },
      {
        question: "Is the tour suitable for families and older travelers?",
        answer: "Absolutely. The itinerary is privately paced and easily adapted for children or a gentler rhythm. The camel trek is optional and short, and 4x4 transfers to the camp can be arranged if preferred.",
      },
      {
        question: "How do I confirm my booking?",
        answer: "Message us on WhatsApp to lock in your dates and we'll tailor the details to you. A small deposit secures your tour, with the balance payable before or at the start of the trip.",
      },
    ],
  },
  {
    id: "family-morocco-adventure",
    name: "Family Morocco Adventure",
    duration: "9 Days / 8 Nights",
    category: "Family",
    highlights: ["Marrakech Family Activities", "Atlas Mountain Mule Ride", "Desert Camel Trek", "Hammam for Kids", "Snake Charmers & Storytellers"],
    price: "950",
    pricingTiers: { 1: 1450, 2: 950, 3: 780, 4: 660, 5: 590 },
    image: "/images/tours/family-morocco-adventure.jpg",
    description: "Morocco captivates children and adults alike. This family itinerary is carefully paced with experiences that delight all ages — riding camels in the Sahara, exploring ancient kasbahs, tasting street food in the medina, and learning traditional crafts from Berber artisans.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Experiences (used on homepage grid)
// ─────────────────────────────────────────────────────────────────────────────
export const experiences = [
  "Sahara Desert Tours", "Luxury Desert Camps", "4×4 Adventures",
  "Camel Trekking", "Atlas Mountains", "Chefchaouen Blue City",
  "Imperial Cities", "Atlantic Surf Trips", "Surfing & Kitesurfing",
  "Moroccan Cuisine", "Cultural & Berber Experiences",
  "Photography Tours", "Honeymoon Packages", "Family Holidays"
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
export const faqData = [
  {
    question: "When is the best time to visit Morocco?",
    answer: "Spring (March–May) and autumn (September–November) offer the most pleasant temperatures. For the Sahara, October to April is ideal — less extreme heat. Coastal areas are pleasant year-round."
  },
  {
    question: "Do I need a visa to enter Morocco?",
    answer: "Citizens of the US, Canada, UK, Australia, EU, and most Western countries do not need a visa for stays up to 90 days. Please ensure your passport is valid for at least 6 months from arrival."
  },
  {
    question: "Is Morocco safe to travel?",
    answer: "Morocco is one of the safest destinations in Africa and the Arab world. Our local guides ensure you navigate the souks and desert routes with complete confidence and total peace of mind."
  },
  {
    question: "What should I pack for a desert tour?",
    answer: "Light layers (desert days are hot, nights are cold), a scarf for wind and sun, quality sunscreen, sunglasses, a torch, comfortable walking shoes, and a power bank. We supply sleeping bags for desert camps."
  },
  {
    question: "Are your tours private or group tours?",
    answer: "We specialise in private, bespoke tours tailored entirely to your schedule and preferences. We also offer small luxury group tours on select dates. Everything is negotiable."
  },
  {
    question: "What languages do your guides speak?",
    answer: "Our professional guides speak English, French, Spanish, Arabic, Berber, Italian, and Portuguese. Request your preferred language when booking."
  },
  {
    question: "How can I pay?",
    answer: "We accept bank transfer, PayPal, and cash (MAD/EUR/USD). A 20% deposit secures your reservation; the balance is due on arrival. WhatsApp us for a personalised quote."
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer: "Absolutely — vegetarian, vegan, gluten-free, halal, and allergy-specific menus are all catered for. Please inform us at the time of booking."
  },
  {
    question: "What is included in your desert tours?",
    answer: "All our desert tours include private air-conditioned transportation, an English-speaking driver, luxury accommodation, daily breakfast and dinner, camel trekking in Erg Chebbi, one night in a luxury desert camp, and hotel pickup/drop-off. International flights, lunches, and optional activities are typically excluded."
  },
  {
    question: "What should travelers bring to the Sahara desert camp?",
    answer: "Bring warm layers for cold desert nights, a scarf, sunscreen, sunglasses, a torch/flashlight, comfortable shoes, and a power bank. We provide sleeping bags for the desert camp. Swimwear is useful for some luxury camps with pools."
  },
  {
    question: "How do I get to Merzouga and the Sahara Desert?",
    answer: "The drive from Marrakech to Merzouga takes about 9–10 hours via the High Atlas Mountains. From Fes, it is roughly 7–8 hours. We arrange private transfers with comfortable stops. Flying into Marrakech or Fes is most common."
  },
  {
    question: "Is camel trekking suitable for beginners?",
    answer: "Yes — our camel treks are gentle and suitable for all abilities. The camels are well-trained and the treks are typically 1–2 hours at sunset. For those who prefer not to ride, 4x4 transfers to the camp can be arranged."
  },
  {
    question: "What are the desert camps like?",
    answer: "Our luxury desert camps feature real beds, en-suite bathrooms, and elegant Berber-style tents under the stars. Dinner is served around a campfire with live Berber music. It is a comfortable, authentic, and unforgettable experience."
  },
  {
    question: "Can you arrange a trip during Ramadan?",
    answer: "Yes — Morocco during Ramadan is a special cultural experience. Some restaurants may be closed during the day, but our guides navigate this gracefully. Evening feasts and vibrant night markets make it a unique time to visit."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Free cancellation up to 7 days before your tour for a full refund. Cancellations within 7 days may incur a 50% charge. No-shows are non-refundable. We recommend travel insurance for complete peace of mind."
  },
  {
    question: "Do I need travel insurance?",
    answer: "Travel insurance is strongly recommended for all Morocco trips. It should cover medical emergencies, trip cancellation, and lost luggage. We can help advise on suitable policies if needed."
  },
  {
    question: "Are the tours suitable for children and older travelers?",
    answer: "Absolutely. Our private tours are fully adaptable for families and older guests. The pace is flexible, camel treks are optional, and 4x4 transfers can replace walking sections. We have experience with all ages."
  },
  {
    question: "How far in advance should I book?",
    answer: "For peak seasons (March–May and September–November), we recommend booking at least 4–6 weeks in advance. For winter desert trips or special dates, 2–3 months ahead is ideal. Last-minute bookings are sometimes possible — just ask."
  },
  {
    question: "What type of vehicles do you use?",
    answer: "We use modern, air-conditioned vehicles ranging from sedans for 2–4 guests to spacious minivans for larger groups. All vehicles are well-maintained and driven by professional, licensed drivers."
  },
  {
    question: "Do you provide airport pickup and drop-off?",
    answer: "Yes — all our tours include complimentary airport or hotel pickup and drop-off in Marrakech, Fes, and other major cities. Your driver will meet you with a named sign and assist with luggage."
  },
];
 
