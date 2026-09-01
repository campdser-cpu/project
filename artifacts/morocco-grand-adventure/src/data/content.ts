// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Central Data
// Owner: Mohamed BouGhrara
// ─────────────────────────────────────────────────────────────────────────────

export const contactInfo = {
  whatsapp: "https://wa.me/message/QAFZ3RKJDNH4B1",
  whatsappNumber: "+212 699 846 818",
  phone: "+212 699 846 818",
  instagram: "https://www.instagram.com/morocco_grand_adventure/",
  email: "moroccograndadventure@gmail.com",
  website: "https://www.moroccograndadventure.com",
  paypal: "https://www.paypal.me/MohamedbouGhrara683",
  ownerName: "Mohamed BouGhrara",
  companyName: "Morocco Grand Adventure",
  address: "Merzouga, Errachidia Province, Morocco",
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
  /**
   * Optional curated photo gallery (Image-SEO pack). Alt text is natural and
   * descriptive — never keyword-stuffed. Captions render under each image.
   */
  gallery?: DestinationGalleryImage[];
};

export type DestinationGalleryImage = { src: string; alt: string; caption: string };


export const destinations: Destination[] = [
  // ── Imperial Cities ────────────────────────────────────────────────────────
  {
    id: "marrakech",
    name: "Marrakech",
    category: "Imperial Cities",
    shortDesc: "The Red City — vibrant medinas, Jemaa el-Fnaa square, luxury riads.",
    image: "/images/dest/marrakech.webp",
    bestTime: "Mar – May, Sep – Nov",
    description: "Marrakech is an intoxicating blend of ancient souks, world-class restaurants, and opulent riads. From the sensory chaos of Jemaa el-Fnaa to the tranquility of the Majorelle Garden, the Red City offers an experience that stays with you forever.",
    highlights: ["Jemaa el-Fnaa Square", "Majorelle Garden", "Bahia Palace", "Medina Souks", "Hammam & Spa"],
    region: "Central Morocco",
    coords: { lat: 31.6295, lng: -7.9811 },
    gallery: [
      {
        src: "/images/curated/marrakech-souk-brass-lanterns-market.webp",
        alt: "Rows of glowing handcrafted brass and silver lanterns for sale in a traditional Marrakech souk",
        caption: "Handcrafted lanterns glow warmly in one of Marrakech's famous souks.",
      },
      {
        src: "/images/curated/marrakech-medina-street-life-locals-morocco.webp",
        alt: "Local life in the Marrakech medina — residents, cats, and a market vendor in narrow alleys",
        caption: "Authentic scenes of daily life in the winding alleys of the Marrakech medina.",
      },
      {
        src: "/images/curated/marrakech-medina-motorbike-archway-local-life.webp",
        alt: "Local man riding a motorbike through a stone archway in the old Marrakech medina",
        caption: "A local rider passes beneath a historic stone archway in the Marrakech medina.",
      },
    ],
  },
  {
    id: "fes",
    name: "Fes",
    category: "Imperial Cities",
    shortDesc: "The cultural heart — world's oldest university and medieval medina.",
    image: "/images/dest/fes.webp",
    bestTime: "Mar – May, Sep – Nov",
    description: "Fes is Morocco's spiritual and intellectual capital. Its UNESCO-listed medina, Fes el-Bali, is one of the world's largest living medieval cities. The Chouara Tannery, Al-Qarawiyyin University, and labyrinthine alleys make it utterly unique.",
    highlights: ["Fes el-Bali Medina", "Chouara Tannery", "Al-Qarawiyyin University", "Medersa Bou Inania", "Bab Bou Jeloud"],
    region: "Northern Morocco",
    coords: { lat: 34.0181, lng: -5.0078 },
    gallery: [
      {
        src: "/images/curated/fes-tannery-chouara-leather-dyeing-morocco.webp",
        alt: "Craftsman dyeing leather hides in the centuries-old Chouara Tannery, Fes, Morocco",
        caption: "A tanner works among the ancient stone dye pits of the Chouara Tannery in Fes.",
      },
    ],
  },
  {
    id: "meknes",
    name: "Meknès",
    category: "Imperial Cities",
    shortDesc: "The forgotten imperial city — grand gates and Roman ruins nearby.",
    image: "/images/dest/meknes.webp",
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
    image: "/images/dest/casablanca.webp",
    bestTime: "Year-round",
    description: "Morocco's largest city blends French art deco architecture with Islamic grandeur. The Hassan II Mosque — the world's third largest — rises magnificently above the Atlantic Ocean. The Corniche, Rick's Café, and vibrant nightlife make it a compelling stop.",
    highlights: ["Hassan II Mosque", "Corniche", "Art Deco Architecture", "Morocco Mall", "La Sqala"],
    region: "Atlantic Coast",
    coords: { lat: 33.5731, lng: -7.5898 },
    gallery: [
      {
        src: "/images/curated/hassan-ii-mosque-arched-corridor-casablanca.webp",
        alt: "Row of ornate horseshoe arches inside the Hassan II Mosque corridor in Casablanca, Morocco",
        caption: "A striking perspective of the horseshoe-arch corridor at the Hassan II Mosque.",
      },
      {
        src: "/images/curated/hassan-ii-mosque-ornate-bronze-door-casablanca.webp",
        alt: "Woman standing before the giant ornate bronze door and mosaic wall of the Hassan II Mosque, Casablanca",
        caption: "A visitor stands dwarfed by the giant ornate bronze door of the Hassan II Mosque.",
      },
    ],
  },
  {
    id: "rabat",
    name: "Rabat",
    category: "Imperial Cities",
    shortDesc: "Morocco's capital — the Kasbah of Oudayas and Hassan Tower.",
    image: "/images/dest/rabat.webp",
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
    image: "/images/dest/merzouga.webp",
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
    image: "/images/dest/erg-chebbi.webp",
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
    image: "/images/dest/ouarzazate.webp",
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
    image: "/images/dest/ait-ben-haddou.webp",
    bestTime: "Sep – May",
    description: "This UNESCO World Heritage Site is a breath-taking example of southern Moroccan earthen-clay architecture. The labyrinthine ksar has appeared in dozens of Hollywood films. Crossing the river on stepping stones and climbing to the top granary for views over the valley is an unforgettable experience.",
    highlights: ["UNESCO Ksar", "Film Location Tour", "Sunrise Photography", "Berber Family Visits", "Pottery Workshops"],
    region: "Southern Morocco",
    coords: { lat: 31.0472, lng: -7.1291 },
    gallery: [
      {
        src: "/images/curated/ait-benhaddou-kasbah-sunset-unesco-morocco.webp",
        alt: "Woman in a flowing yellow dress standing before the sunset-lit Ait Benhaddou kasbah reflected in the river",
        caption: "The UNESCO-listed kasbah of Ait Benhaddou glows under the golden light of sunset.",
      },
    ],
  },
  {
    id: "zagora",
    name: "Zagora",
    category: "Sahara Desert",
    shortDesc: "Gateway to Erg Chigaga and the ancient Draa Valley.",
    image: "/images/dest/zagora.webp",
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
    image: "/images/dest/dades-valley.webp",
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
    image: "/images/dest/todra-gorge.webp",
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
    image: "/images/dest/skoura.webp",
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
    image: "/images/dest/roses-valley.webp",
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
    image: "/images/dest/draa-valley.webp",
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
    image: "/images/dest/chefchaouen.webp",
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
    image: "/images/dest/imlil.webp",
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
    image: "/images/dest/ourika-valley.webp",
    bestTime: "Year-round",
    description: "The Ourika Valley is the perfect day trip from Marrakech — just an hour by car yet a world away. Terraced gardens cascade down Atlas slopes, argan cooperatives offer tastings, and the Setti Fatma waterfall rewards a short hike. The Monday Berber market at Aghbalou is especially vibrant.",
    highlights: ["Setti Fatma Waterfalls", "Berber Market", "Argan Oil Cooperative", "Herb Gardens", "Lunch at Valley Restaurants"],
    region: "High Atlas",
    coords: { lat: 31.3714, lng: -7.7333 },
  },
  {
    id: "ouirgane",
    name: "Ouirgane",
    category: "Mountains",
    shortDesc: "Quiet High Atlas valley village south of Marrakech — olive groves, reservoir and Berber trails.",
    image: "/images/hero/atlas-pano.webp",
    bestTime: "Mar – Jun, Sep – Nov",
    description: "Ouirgane is a small Berber village in the High Atlas foothills of Al Haouz Province, roughly 60 km (about a 1.5-hour drive) south of Marrakech on the road toward the Toubkal National Park and the Tizi n'Test pass. Set at around 1,000 m of elevation, it sits in a green valley of olive groves, walnut trees and terraced fields, with a small reservoir at its heart. Because it lies off the main tourist circuit, Ouirgane stays noticeably quieter than nearby Ourika or Imlil, which makes it a good choice for travellers who want mountain scenery without the crowds. It works well as a relaxed day trip from Marrakech — the road climbs gradually through the Asni valley and the air is noticeably cooler than the city — and a handful of small guesthouses and rural lodges also make an overnight stay possible for those who want to slow down. Days here are about the landscape rather than a checklist of sights: walking between Berber villages, following valley and hillside trails, and looking up at the peaks of the Toubkal massif, whose national park begins just to the south. Spring and autumn bring the most comfortable walking temperatures, wild flowers in April–May and clear golden light in October–November; summer days are warm but the elevation keeps evenings pleasant, while winter nights can be cold with occasional snow on the higher slopes. Sturdy walking shoes, sun protection and layers are worth packing at any time of year. The terrain and gentle pace make Ouirgane suitable for families with children and for older travellers alike, and it is an easy, natural fit for a private day trip arranged around your own timing rather than a fixed group schedule.",
    highlights: ["Toubkal National Park Gateway", "Ouirgane Valley Reservoir", "Olive Groves & Terraced Fields", "Berber Village Trails", "Quieter Alternative to Ourika & Imlil"],
    region: "High Atlas",
    coords: { lat: 31.0530, lng: -8.0860 },
  },
  {
    id: "ouzoud",
    name: "Ouzoud Waterfalls",
    category: "Mountains",
    shortDesc: "Morocco's most spectacular waterfalls — Barbary macaques and rainbows.",
    image: "/images/dest/ouzoud.webp",
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
    image: "/images/dest/ifrane.webp",
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
    image: "/images/dest/essaouira.webp",
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
    image: "/images/dest/agadir.webp",
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
    image: "/images/dest/taghazout.webp",
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
    image: "/images/dest/legzira.webp",
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
    image: "/images/dest/el-jadida.webp",
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
    image: "/images/dest/tangier.webp",
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
    image: "/images/dest/tetouan.webp",
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
    image: "/images/dest/akchour.webp",
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
    image: "/images/dest/nkob.webp",
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
    image: "/images/dest/mirleft.webp",
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
  quoteOnly?: boolean;      // inquiry-only route; no public price is implied
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

// ─────────────────────────────────────────────────────────────────────────────
// Reviews (localised via locale keys so every language shows real review text)
// ─────────────────────────────────────────────────────────────────────────────
export type Review = {
  /** Stable id used as a React key. */
  id: string;
  /** Translation key for the reviewer's display name. */
  nameKey: string;
  /** Country flag emoji shown beside the name. */
  country: string;
  /** Translation key for the review body text. */
  quoteKey: string;
  /** Translation key for the tour the reviewer booked. */
  tourKey: string;
  /** Star rating 1–5 (all showcase reviews are 5-star). */
  rating: number;
};

export const reviews: Review[] = [
  { id: 'rev1', nameKey: 'home_rev1_name', country: '🇬🇧', quoteKey: 'home_rev1_quote', tourKey: 'home_rev1_tour', rating: 5 },
  { id: 'rev2', nameKey: 'home_rev2_name', country: '🇺🇸', quoteKey: 'home_rev2_quote', tourKey: 'home_rev2_tour', rating: 5 },
  { id: 'rev3', nameKey: 'home_rev3_name', country: '🇨🇦', quoteKey: 'home_rev3_quote', tourKey: 'home_rev3_tour', rating: 5 },
  { id: 'rev4', nameKey: 'home_rev4_name', country: '🇩🇪', quoteKey: 'home_rev4_quote', tourKey: 'home_rev4_tour', rating: 5 },
  { id: 'rev5', nameKey: 'home_rev5_name', country: '🇦🇺', quoteKey: 'home_rev5_quote', tourKey: 'home_rev5_tour', rating: 5 },
  { id: 'rev6', nameKey: 'home_rev6_name', country: '🇪🇸', quoteKey: 'home_rev6_quote', tourKey: 'home_rev6_tour', rating: 5 },
];

export const tours: Tour[] = [
  {
    id: "3-day-sahara-marrakech",
    name: "3-Day Luxury Sahara Tour from Marrakech",
    duration: "3 Days / 2 Nights",
    category: "Desert & Adventure",
    highlights: [
      "Cross the High Atlas from Marrakech",
      "Aït Ben Haddou — UNESCO World Heritage site",
      "Dades Valley and Todra Gorge",
      "Sunset camel trek in Erg Chebbi",
      "Night in a Sahara desert camp",
    ],
    price: "450",
    pricingTiers: { 1: 690, 2: 450, 3: 370, 4: 310, 5: 280 },
    image: "/images/tours/3-day-sahara-marrakech.jpg",
    aliases: ['3-days-marrakech-to-merzouga-desert-tour', 'merzouga-desert-tour'],
    description: "A three-day private journey from Marrakech to the dunes of Merzouga, built for travelers who want a real Sahara experience without pretending the road is short. Cross the High Atlas, visit Aït Ben Haddou, travel through the Dades Valley and Todra Gorge, reach Merzouga and Erg Chebbi for a sunset camel trek and desert-camp night, then return to Marrakech through the changing landscapes of southern Morocco. Three days is the shortest practical format for this overland route; if you prefer slower travel or more time in the desert, ask us about a longer itinerary.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi"],
    routeCaption: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley → Todra Gorge → Merzouga & Erg Chebbi → Marrakech. The road is part of the experience, not just a transfer.",
    itineraryDays: [
      { day: 1, title: "Marrakech → High Atlas → Aït Ben Haddou → Dades Valley", desc: "Leave Marrakech in the morning and cross the High Atlas toward southern Morocco. Stop at Aït Ben Haddou, the historic earthen ksar and UNESCO World Heritage property, then continue through Ouarzazate and the changing landscapes of the Dades Valley for the first night.", stops: ["Marrakech", "High Atlas Mountains", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Dades Valley"] },
      { day: 2, title: "Dades Valley → Todra Gorge → Rissani → Merzouga", desc: "Continue east through the pre-Sahara, with time for Todra Gorge before heading toward Rissani and Merzouga. In the late afternoon, enter the Erg Chebbi dunes for the camel trek around sunset, then enjoy the desert camp experience and dinner under the open sky.", stops: ["Dades Valley", "Todra Gorge", "Rissani area", "Merzouga", "Erg Chebbi", "Sunset camel trek", "Desert camp"] },
      { day: 3, title: "Merzouga → Eastern Morocco → Middle Atlas → Marrakech", desc: "Wake for sunrise over the dunes, then begin the return journey to Marrakech. This is the longest road day, so the itinerary keeps the focus on a realistic return rather than promising a long list of rushed attractions. Travelers who want more time in Merzouga can extend the trip to four days or more.", stops: ["Merzouga sunrise", "Rissani / Tafilalet area", "Ziz Valley area", "Middle Atlas", "Marrakech"] },
    ],
    faq: [
      { question: "Is three days really enough for Marrakech to Merzouga?", answer: "Three days is the shortest practical format for this overland route. It works when you want the key southern stops and one Sahara camp night, but you should expect long travel days. If you want a slower pace or more time in the dunes, four days or more is the better choice." },
      { question: "How much driving should I expect?", answer: "This is a long road journey rather than a short transfer. The route crosses the High Atlas and southern valleys before reaching Merzouga, then returns to Marrakech. We prefer to explain that honestly so you can choose the right number of days for your travel style." },
      { question: "What is the Sahara part of the trip like?", answer: "You reach Merzouga and the Erg Chebbi dune area on the second day, then head into the dunes for the sunset camel experience and a night at the desert camp. The exact camp setup and activity details are confirmed with you before booking rather than assumed." },
      { question: "When is the best time for this Sahara tour?", answer: "Morocco's National Tourist Office highlights spring and autumn as especially suitable seasons for the southern Sahara. The tour can be planned year-round, but summer heat and winter nights are important considerations when choosing dates." },
      { question: "Can I book now and pay later?", answer: "Yes. The first step is to contact us with your preferred dates and group size so we can confirm the itinerary and payment terms. Do not send payment until the agreed booking details are clear. Any deposit or balance arrangement is confirmed with you before payment." },
      { question: "Are flights included?", answer: "International flights are not part of this tour price. There is no single month that guarantees the cheapest airfare for every traveler because prices depend on your departure country, airline and dates. Once your tour dates are chosen, we can help you think through the most practical arrival and departure plan." },
    ],
    // MGA_THREE_DAY_ENRICHED_V1
  },
  {
    id: "3-day-sahara-fes", name: "3-Day Private Sahara Route from Fes", duration: "3 Days / 2 Nights", category: "Private · Quote Only", quoteOnly: true,
    highlights: ["Fes and the Middle Atlas", "Ifrane and cedar-forest country", "Errachidia / Ziz Valley landscapes", "Merzouga and Erg Chebbi", "Sunset desert experience"],
    price: "Request a quote", pricingTiers: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, image: "/images/dest/merzouga.webp",
    description: "A quote-only private route for travelers starting in Fes who want to reach Merzouga and Erg Chebbi in three days. The Moroccan National Tourist Office confirms Fes as a gateway toward the Sahara and documents the Fes–Errachidia–Midelt–Merzouga connection. The current business source data does not publish a fixed Fes three-day price, accommodation list or guaranteed return schedule, so those details are confirmed before booking rather than invented.",
    routeIds: ["fes", "ifrane", "merzouga", "erg-chebbi"], routeCaption: "Fes → Middle Atlas / Ifrane → Errachidia–Midelt region → Merzouga & Erg Chebbi. Exact stops, nights and onward/return plan are confirmed around your dates.",
    itineraryDays: [
      { day: 1, title: "Fes → Middle Atlas → Errachidia region", desc: "Travel south from Fes through the Middle Atlas toward the Errachidia–Midelt–Merzouga region. The road is a major part of the experience, so the day is planned around realistic driving and selected stops.", stops: ["Fes", "Ifrane", "Middle Atlas", "Midelt / Errachidia region"] },
      { day: 2, title: "Errachidia region → Merzouga → Erg Chebbi", desc: "Continue toward Merzouga and the Erg Chebbi dunes. If included in the confirmed itinerary, the desert portion can include a sunset camel experience and a night near the dunes. Accommodation and meals are confirmed before payment.", stops: ["Ziz Valley area", "Merzouga", "Erg Chebbi", "Sunset desert experience"] },
      { day: 3, title: "Merzouga → onward journey", desc: "Begin with the desert morning, then continue to the destination agreed in your quote. A return to Fes or a one-way finish can be discussed; no fixed ending is claimed until confirmed.", stops: ["Merzouga sunrise", "Erg Chebbi", "Confirmed onward destination"] }
    ],
    included: ["Private itinerary planning", "Route confirmed around your dates", "Private transport when included in the confirmed quote", "Desert experience when included in the confirmed itinerary"],
    excluded: ["International flights", "Anything not explicitly included in the confirmed quote", "Personal expenses and gratuities unless agreed"],
    faq: [
      { question: "Is this a fixed-price Fes tour?", answer: "No. It is intentionally quote-only because the current project does not contain a verified public Fes three-day price or fixed accommodation package. The route and payment terms are confirmed before payment." },
      { question: "Is Fes connected to the Merzouga route?", answer: "Yes. The Moroccan National Tourist Office presents Fes as one of the cities leading toward the Sahara and lists the Fes to Errachidia–Midelt–Merzouga connection." },
      { question: "Can the trip end somewhere other than Fes?", answer: "An onward finish can be discussed in the private quote. We do not publish a fixed ending point until it is confirmed." },
      { question: "Can I book now and pay later?", answer: "Request the itinerary first. We confirm the route, inclusions and applicable payment terms before any payment is made." }
    ],
    // MGA_THREE_DAY_CITY_ROUTES_V1
  },
  {
    id: "3-day-sahara-agadir", name: "3-Day Private Sahara Route from Agadir", duration: "3 Days / 2 Nights", category: "Private · Quote Only", quoteOnly: true,
    highlights: ["Agadir Atlantic coast", "Southern Morocco landscapes", "Ouarzazate / pre-Sahara", "Merzouga and Erg Chebbi", "Private onward planning"],
    price: "Request a quote", pricingTiers: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, image: "/images/dest/agadir.webp",
    description: "A quote-only private three-day Sahara planning route starting in Agadir. The Moroccan National Tourist Office confirms Agadir as a gateway toward the Sahara and documents the southern Morocco connection toward the desert. The current business source data does not publish a fixed Agadir three-day price, accommodation package or guaranteed return schedule, so those commercial details are confirmed before booking.",
    routeIds: ["agadir", "ouarzazate", "merzouga", "erg-chebbi"], routeCaption: "Agadir → southern Morocco / Ouarzazate area → Merzouga & Erg Chebbi. Exact road stops, nights and final destination are confirmed in the private quote.",
    itineraryDays: [
      { day: 1, title: "Agadir → Southern Morocco → Ouarzazate area", desc: "Head inland from Agadir through southern Morocco. The day is designed around the practical road journey rather than a fabricated checklist of fixed stops.", stops: ["Agadir", "Southern Morocco", "Ouarzazate area"] },
      { day: 2, title: "Ouarzazate area → Merzouga → Erg Chebbi", desc: "Continue east toward Merzouga and Erg Chebbi. If included in the confirmed itinerary, the desert portion can include a sunset camel experience and a camp night. Accommodation and meals are agreed before payment.", stops: ["Ouarzazate area", "Merzouga", "Erg Chebbi", "Sunset desert experience"] },
      { day: 3, title: "Merzouga → onward journey", desc: "Enjoy the desert morning and continue to the destination agreed in your quote. Because three days from Agadir is a compact overland format, the final routing should be chosen around your dates and onward plans.", stops: ["Merzouga sunrise", "Erg Chebbi", "Confirmed onward destination"] }
    ],
    included: ["Private itinerary planning", "Route confirmed around your dates", "Private transport when included in the confirmed quote", "Desert experience when included in the confirmed itinerary"],
    excluded: ["International flights", "Anything not explicitly included in the confirmed quote", "Personal expenses and gratuities unless agreed"],
    faq: [
      { question: "Is this a fixed-price Agadir Sahara tour?", answer: "No. It is quote-only because the current project does not contain a verified public three-day Agadir price or fixed accommodation package. We confirm the actual itinerary and payment terms before payment." },
      { question: "Does Agadir lead toward the Sahara?", answer: "Yes. The Moroccan National Tourist Office identifies Agadir as one of the gateways toward the Sahara. The exact three-day routing depends on travel dates and where you need to finish." },
      { question: "Can the itinerary be one-way?", answer: "The onward destination can be discussed in the private quote. We avoid publishing a fixed return schedule until it is confirmed." },
      { question: "Can I book now and pay later?", answer: "Request the itinerary first. We confirm the route, inclusions and applicable payment terms before any payment is made." }
    ]
  },
  {
    id: "5-day-imperial-cities",
    name: "5-Day Imperial Cities & Desert",
    duration: "5 Days / 4 Nights",
    category: "Cultural",
    highlights: ["Atlas Mountains Crossing", "Aït Ben Haddou (UNESCO)", "Erg Chebbi Sahara & Luxury Camp", "Fes el-Bali Medina", "Chefchaouen Blue City", "Meknès & Volubilis"],
    price: "780",
    pricingTiers: { 1: 1180, 2: 780, 3: 640, 4: 540, 5: 490 },
    image: "/images/pdf/img_2-optimized.webp",
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
    included: [
      "Private air-conditioned vehicle",
      "Professional English-speaking driver",
      "Fuel",
      "Luxury desert camp",
      "Camel trek in Erg Chebbi",
      "Official local guide in Fes",
      "Riad/kasbah hotel nights as per itinerary (Dades Valley, Fes, Chefchaouen)",
      "1 night luxury desert camp",
      "Breakfasts daily",
      "Dinners as per itinerary",
      "Hotel pick-up & drop-off",
    ],
    excluded: [
      "International flights",
      "Lunches",
      "Drinks",
      "Monument & museum entrance fees",
      "Tips & gratuities",
      "Personal expenses",
    ],
    gallery: [
      { src: "/images/pdf/img_2-optimized.webp", caption: "Golden Sahara dunes and a luxury desert camp on the route to Merzouga" },
    ],
    faq: [
      {
        question: "Is this a private tour?",
        answer: "Yes — every departure is fully private for your party alone. You travel with your own dedicated English-speaking driver and set the pace together, with no strangers joining your group.",
      },
      {
        question: "What is the accommodation like?",
        answer: "Handpicked riads, kasbah hotels and city hotels with private rooms throughout — in the Dades Valley, Fes and Chefchaouen — plus one night in a luxury tented camp on the dunes of Erg Chebbi reached by camel, with dinner and live Berber music.",
      },
      {
        question: "Where does this tour end?",
        answer: "The tour ends in Chefchaouen, the Blue City, on day 5 after exploring Meknès and Volubilis. We can arrange transport onward — for example to Fes or back to Marrakech — when you book.",
      },
      {
        question: "How do I confirm my booking?",
        answer: "Message us on WhatsApp or through the contact form to lock in your dates and we'll tailor the details to you. A small deposit secures your tour, with the balance payable before or at the start of the trip.",
      },
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
    image: "/images/tours/7-day-grand-morocco.webp",
    aliases: ['morocco-desert-tour'],
    description:
      "Experience the very best of Morocco in seven unforgettable days. Cross the spectacular High Atlas Mountains over the Tizi n'Tichka Pass, explore the UNESCO kasbah of Aït Ben Haddou, wind through the Dades Valley and the towering Todra Gorge, then ride camels across the golden dunes of Erg Chebbi to a luxury desert camp beneath the stars. Journey north through the Ziz Valley and cedar forests to the medieval imperial city of Fes, before returning to Marrakech through some of the country's most breathtaking landscapes.",
    videoUrl: "/videos/dunes-camels.mp4",
    videoPoster: "/images/personal/dunes-camels-poster.webp",
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
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou — UNESCO ksar" },
      { src: "/images/dest/ouarzazate.webp", caption: "Ouarzazate — gateway to the desert" },
      { src: "/images/dest/dades-valley.webp", caption: "The winding Dades Valley" },
      { src: "/images/dest/todra-gorge.webp", caption: "The towering Todra Gorge" },
      { src: "/images/dest/merzouga.webp", caption: "Erg Chebbi dunes at Merzouga" },
      { src: "/images/personal/luxury-camp-dusk.webp", caption: "Our luxury desert camp at dusk" },
      { src: "/images/personal/sahara-dunes-golden.webp", caption: "Golden dunes at sunrise" },
      { src: "/images/dest/ifrane.webp", caption: "Ifrane — the Switzerland of Morocco" },
      { src: "/images/dest/fes.webp", caption: "Fes — the medieval imperial city" },
      { src: "/images/dest/marrakech.webp", caption: "Marrakech — the Red City" },
      { src: "/images/personal/guide-guest-tea.webp", caption: "Sweet mint tea with our guests" },
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
    image: "/images/tours/honeymoon-morocco.webp",
    description: "Designed exclusively for couples, this honeymoon itinerary weaves romance into every moment. Private riad suites, a candlelit dinner in the Sahara, a hot air balloon flight over the Atlas at dawn, and a hamam ritual for two — Morocco has never been so intimate.",
    routeIds: ["marrakech", "ait-ben-haddou", "ouarzazate", "dades-valley", "todra-gorge", "merzouga", "erg-chebbi", "fes"],
    routeCaption: "A romantic grand loop — from the riads and gardens of Marrakech, across the High Atlas to the kasbah of Aït Ben Haddou and the Dades and Todra gorges, then the golden dunes of Erg Chebbi at Merzouga, north to the imperial city of Fes, and back to Marrakech. Tap any numbered stop to explore it.",
    videoUrl: "/videos/sahara-experience.mp4",
    videoPoster: "/images/personal/luxury-camp-dusk.webp",
    itineraryDays: [
      {
        day: 1,
        title: "Arrive in Marrakech — Settle into the Red City",
        desc: "Meet your private driver at Marrakech airport and transfer to a traditional luxury riad in the heart of the medina. Settle in at your own pace, then step out into the atmosphere of Jemaa el-Fnaa and the candlelit maze of the souks for a gentle first evening in the Red City.",
        stops: ["Airport pick-up", "Private luxury riad", "Jemaa el-Fnaa", "First evening in the medina"],
      },
      {
        day: 2,
        title: "Marrakech for Two — Gardens, Palaces & the Souks",
        desc: "Begin the day with a private hot air balloon drift over the Atlas at dawn, then explore the cobalt-blue Majorelle Garden and the exquisite courtyards of Bahia Palace. Wander the medina's souks together before returning to your riad for a relaxed evening.",
        stops: ["Hot air balloon at dawn (optional)", "Majorelle Garden", "Bahia Palace", "Medina & souks", "Overnight: Marrakech"],
      },
      {
        day: 3,
        title: "High Atlas → Aït Ben Haddou → Dades Valley",
        desc: "Leave Marrakech and cross the High Atlas Mountains over the dramatic Tizi n'Tichka Pass, the highest road pass in North Africa. Stop at the UNESCO-listed fortified ksar of Aït Ben Haddou, continue through Ouarzazate and the Skoura oasis, and wind into the Dades Valley for your first night on the desert route.",
        stops: ["High Atlas Mountains", "Tizi n'Tichka Pass", "Aït Ben Haddou (UNESCO)", "Ouarzazate", "Overnight: Dades Valley"],
      },
      {
        day: 4,
        title: "Dades Valley → Todra Gorge → Merzouga",
        desc: "Admire the winding switchbacks and red-rock formations of the Dades Valley before driving to the towering Todra Gorge, a 300-metre-high canyon. Continue through palm groves and Berber villages to Merzouga on the edge of the Sahara, where the golden dunes of Erg Chebbi appear on the horizon.",
        stops: ["Dades Valley viewpoints", "Todra Gorge", "Palm groves & Berber villages", "Arrive in Merzouga"],
      },
      {
        day: 5,
        title: "Erg Chebbi — Sunset Camel Trek & a Night in the Dunes",
        desc: "Ride camels across the golden dunes of Erg Chebbi at sunset, when the sand glows amber and the desert goes quiet. Spend the night in a private luxury desert camp under a canopy of stars, with dinner served around the campfire — the romantic centrepiece of the honeymoon.",
        stops: ["Sunset camel trek", "Erg Chebbi dunes", "Private luxury desert camp", "Dinner under the stars"],
      },
      {
        day: 6,
        title: "A Slow Desert Morning in Merzouga",
        desc: "Wake for a spectacular sunrise over the dunes and enjoy a slow, unhurried morning at Erg Chebbi — watching the light move across the sand, or sharing mint tea with local Berbers. A relaxed second night near the dunes lets you savour the silence of the Sahara.",
        stops: ["Sunrise over the dunes", "Erg Chebbi", "Berber tea & hospitality", "Second night in Merzouga"],
      },
      {
        day: 7,
        title: "Merzouga → Ziz Valley → Fes",
        desc: "Head north through the Ziz Valley and its endless palm oases, stopping in Midelt for lunch before passing the cedar forests of the Middle Atlas and the mountain town of Ifrane. Arrive in the evening at the imperial city of Fes.",
        stops: ["Ziz Valley", "Midelt", "Middle Atlas & cedar forests", "Ifrane", "Overnight: Fes"],
      },
      {
        day: 8,
        title: "The Imperial City of Fes",
        desc: "Discover one of the world's oldest living cities with an official local guide. Explore the Royal Palace gates and the labyrinthine medieval medina of Fes el-Bali — Al Quaraouiyine University, the famous tanneries and bustling artisan souks — before an evening at your own pace.",
        stops: ["Royal Palace gates", "Fes el-Bali medina", "Al Quaraouiyine University", "Tanneries & souks", "Overnight: Fes"],
      },
      {
        day: 9,
        title: "Fes → Marrakech — The Scenic Return",
        desc: "Return to Marrakech through the Middle Atlas Mountains, passing forests, lakes and traditional Berber villages on the scenic road south. The evening is yours to enjoy a last wander through Jemaa el-Fnaa.",
        stops: ["Middle Atlas", "Forests & lakes", "Arrive in Marrakech", "Evening at Jemaa el-Fnaa"],
      },
      {
        day: 10,
        title: "Leisure in Marrakech & Departure",
        desc: "A relaxed final morning in the Red City — an optional hammam ritual for two, a last visit to the souks for gifts and mementoes — before your private driver transfers you to the airport for the journey home.",
        stops: ["Leisure morning", "Hammam for two (optional)", "Marrakech souks", "Airport / hotel transfer"],
      },
    ],
    included: [
      "Private luxury riads with private rooms throughout",
      "One night in a private luxury desert camp",
      "Private, air-conditioned transportation",
      "Professional English-speaking driver",
      "Camel trekking in Erg Chebbi",
      "Daily breakfasts",
      "Dinners as per itinerary",
      "Hotel & airport pickup / drop-off",
    ],
    excluded: [
      "International flights",
      "Lunches",
      "Monument & museum entrance fees",
      "Travel insurance",
      "Gratuities for driver & guides",
      "Optional activities (hot air balloon flight, spa & hammam treatments)",
      "Personal expenses & souvenirs",
    ],
    gallery: [
      { src: "/images/dest/marrakech.webp", caption: "Marrakech — the Red City" },
      { src: "/images/personal/riad-tea.webp", caption: "Sweet mint tea in a private riad" },
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou — UNESCO ksar" },
      { src: "/images/dest/ouarzazate.webp", caption: "Ouarzazate — gateway to the desert" },
      { src: "/images/dest/dades-valley.webp", caption: "The winding Dades Valley" },
      { src: "/images/dest/todra-gorge.webp", caption: "The towering Todra Gorge" },
      { src: "/images/dest/merzouga.webp", caption: "Erg Chebbi dunes at Merzouga" },
      { src: "/images/dest/erg-chebbi.webp", caption: "Golden sands of Erg Chebbi" },
      { src: "/images/personal/luxury-camp-dusk.webp", caption: "Our private luxury desert camp at dusk" },
      { src: "/images/personal/sahara-dunes-golden.webp", caption: "Golden dunes at sunrise" },
      { src: "/images/personal/guide-guest-tea.webp", caption: "Sweet mint tea with our travelers" },
      { src: "/images/personal/guests-sunset.webp", caption: "A Sahara sunset for two" },
      { src: "/images/dest/fes.webp", caption: "Fes — the medieval imperial city" },
    ],
    faq: [
      {
        question: "Is this a private honeymoon tour?",
        answer: "Yes — every departure is fully private for your party alone. You travel with your own dedicated English-speaking driver and guide, with no strangers joining your group, so the pace, stops and experiences are entirely yours to enjoy together.",
      },
      {
        question: "Can the itinerary be customised for our honeymoon?",
        answer: "Absolutely. The route is designed as a flexible honeymoon and can be tailored around your preferences — a longer stay by the dunes, extra time in Marrakech, or a gentler daily rhythm. Message us on WhatsApp and we'll shape the details around your dates.",
      },
      {
        question: "What level of accommodation is included?",
        answer: "Handpicked private luxury riads with private rooms throughout, plus one unforgettable night in a private premium desert camp at Erg Chebbi with real beds and en-suite bathrooms, reached by camel at sunset.",
      },
      {
        question: "When is the best time to travel?",
        answer: "The tour runs year-round. Spring (March–May) and autumn (September–November) are ideal, with warm days and comfortable desert nights. Winter is crisp and clear; summer is hot inland, so we start early and plan around the heat.",
      },
      {
        question: "How do I confirm my booking?",
        answer: "Message us on WhatsApp to lock in your dates and we'll tailor the details to you. A small deposit secures your tour, with the balance payable before or at the start of the trip.",
      },
    ],
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
    image: "/images/dest/merzouga.webp",
    description:
      "The ultimate grand loop of southern Morocco — from the palaces and souks of Marrakech to the windswept Atlantic port of Essaouira, down the surf coast through Taghazout and Agadir, then inland across saffron country to the UNESCO kasbah of Aït Ben Haddou, the dramatic Todra and Dades gorges, and finally the towering golden dunes of Erg Chebbi. Eight days of private travel, handpicked luxury riads and hotels, a night in a premium desert camp, and a camel trek beneath the Sahara stars.",
    videoUrl: "/videos/sahara-experience.mp4",
    videoPoster: "/images/personal/luxury-camp-dusk.webp",
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
      { src: "/images/dest/marrakech.webp", caption: "Marrakech — the Red City" },
      { src: "/images/dest/essaouira.webp", caption: "Essaouira — windswept Atlantic port" },
      { src: "/images/dest/taghazout.webp", caption: "Taghazout — the surf coast" },
      { src: "/images/dest/agadir.webp", caption: "Agadir — marina & beach" },
      { src: "/images/dest/ait-ben-haddou.webp", caption: "Aït Ben Haddou — UNESCO ksar" },
      { src: "/images/dest/dades-valley.webp", caption: "The winding Dades Valley" },
      { src: "/images/dest/todra-gorge.webp", caption: "The towering Todra Gorge" },
      { src: "/images/dest/merzouga.webp", caption: "Erg Chebbi dunes at Merzouga" },
      { src: "/images/personal/luxury-camp-dusk.webp", caption: "Our luxury desert camp at dusk" },
      { src: "/images/personal/sahara-dunes-golden.webp", caption: "Golden dunes at sunrise" },
      { src: "/images/personal/guide-guest-tea.webp", caption: "Sweet mint tea with our guests" },
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
    image: "/images/tours/family-morocco-adventure.webp",
    description: "Morocco captivates children and adults alike. This family itinerary is carefully paced with experiences that delight all ages — riding camels in the Sahara, exploring ancient kasbahs, tasting street food in the medina, and learning traditional crafts from Berber artisans.",
    routeIds: ["marrakech", "ait-ben-haddou", "dades-valley", "todra-gorge", "merzouga", "fes"],
    routeCaption: "From the squares of Marrakech across the High Atlas to the dune field of Erg Chebbi at Merzouga, then north through the mountain towns to the imperial city of Fes. The route is paced for families, with easy stops and time to explore. Tap any numbered stop to explore it.",
    itineraryDays: [
      {
        day: 1,
        title: "Arrive in Marrakech — First Taste of the Red City",
        desc: "Meet your private driver and settle into your family hotel or riad in Marrakech. This evening, take an easy first wander through the medina and try a few street-food bites — mint tea, fresh juices and Moroccan pastries — before an early night after the journey.",
        stops: ["Marrakech arrival & transfer", "Medina wander", "Street food tasting", "Overnight: Marrakech"],
      },
      {
        day: 2,
        title: "Marrakech Family Day — Squares, Crafts & Storytellers",
        desc: "A relaxed family day in the Red City. Watch the snake charmers, musicians and storytellers of Jemaa el-Fna, wander the colourful souks, and try traditional crafts with local artisans — the kind of hands-on experiences children remember long after the holiday.",
        stops: ["Jemaa el-Fna", "Snake charmers & storytellers", "Souks & crafts", "Kid-friendly hammam (optional)", "Overnight: Marrakech"],
      },
      {
        day: 3,
        title: "High Atlas Crossing & Mountain Mule Ride",
        desc: "Leave the city and climb into the High Atlas over the dramatic Tizi n'Tichka mountain pass. Today your family swaps the road for a gentle mule ride through the mountains, meeting the sights and sounds of Morocco's high country at an easy, family-friendly pace.",
        stops: ["High Atlas Mountains", "Tizi n'Tichka Pass", "Atlas mule ride", "Berber villages", "Overnight: Dades Valley"],
      },
      {
        day: 4,
        title: "Aït Ben Haddou & the Dades Valley",
        desc: "Stop at the famous UNESCO fortified village of Aït Ben Haddou, a centuries-old kasbah you may recognise from the cinema. Wander its clay lanes together, then follow the winding road through the Dades Valley, with its cliff-hugging turns and dramatic red rock landscape.",
        stops: ["Aït Ben Haddou (UNESCO)", "Kasbah exploration", "Dades Valley viewpoints", "Overnight: Dades Valley"],
      },
      {
        day: 5,
        title: "Todra Gorge & the Road to the Sahara",
        desc: "Pass through the towering Todra Gorge, one of Morocco's most dramatic canyons, then continue through palm groves and Berber villages towards the edge of the Sahara. Kids love watching the landscape open out as the golden dunes of Erg Chebbi appear on the horizon.",
        stops: ["Todra Gorge", "Palm groves & Berber villages", "Erg Chebbi dunes on the horizon", "Overnight: Merzouga"],
      },
      {
        day: 6,
        title: "Camel Trek at Sunset over Erg Chebbi",
        desc: "The highlight for many families — a gentle camel trek across the golden dunes of Erg Chebbi at sunset, when the sand glows amber and the desert goes quiet. Sleep near the dunes and wake to a sunrise over the Sahara your children will talk about for years.",
        stops: ["Erg Chebbi dunes", "Sunset camel trek", "Desert camp night", "Star-filled evening", "Overnight: Merzouga"],
      },
      {
        day: 7,
        title: "Family Day in Merzouga",
        desc: "A relaxed day to slow down: early sunrise over the sand, sandboarding and time on the dunes, visits with local families, and learning traditional crafts from Berber artisans. A gentle day that balances active fun with real connection to desert life.",
        stops: ["Sunrise over the dunes", "Sandboarding & free time", "Berber crafts & hospitality", "Overnight: Merzouga"],
      },
      {
        day: 8,
        title: "North to Fes Through the Mid-Atlas",
        desc: "Bid farewell to the desert and drive north through the mountain towns towards the imperial city of Fes. Break the journey with easy stops and a taste of the Middle Atlas highlands before arriving in Fes for the final night of the adventure.",
        stops: ["Journey north", "Mid-Atlas towns", "Arrival in Fes", "Overnight: Fes"],
      },
      {
        day: 9,
        title: "Morning in Fes & Departure",
        desc: "A short guided glimpse of Fes, Morocco's imperial cultural heart, catching the medina's atmosphere at its liveliest. After lunch your private driver transfers you to the airport or hotel for the journey home at the end of your family Morocco adventure.",
        stops: ["Fes medina & sights", "Fes highlights", "Airport / hotel transfer", "End of tour"],
      },
    ],
    included: [
      "Private air-conditioned vehicle",
      "Professional English-speaking driver",
      "Fuel",
      "Private accommodation throughout",
      "Desert camp night with camel trek",
      "Daily breakfasts",
      "Hotel & riad pick-up / drop-off",
      "Free WiFi in most hotels",
    ],
    excluded: [
      "International flights",
      "Lunches & drinks",
      "Monument & museum entrance fees",
      "Tips & gratuities",
      "Personal expenses",
    ],
    faq: [
      {
        question: "Is this tour suitable for children?",
        answer: "Yes — this itinerary is designed for families. It uses a private vehicle so you set the pace, keeps travel days manageable, and balances active highlights like the camel trek and Atlas mule ride with relaxed days exploring squares, souks and crafts that appeal to all ages.",
      },
      {
        question: "Is this a private tour?",
        answer: "Yes — every departure is fully private for your family alone. You travel with your own dedicated English-speaking driver and guide where needed, with no strangers joining your group, so you can stop when the children need a break.",
      },
      {
        question: "What is the accommodation like?",
        answer: "Handpicked family-friendly hotels and riads with private rooms throughout, plus an unforgettable night near the dunes of Erg Chebbi with real beds. Meals and board are arranged around your family's needs.",
      },
      {
        question: "What is the best time to travel with a family?",
        answer: "The tour runs year-round. Spring (March–May) and autumn (September–November) are ideal, with warm days and comfortable nights. Summer is hot inland, so we start early and plan around the heat; winter is crisp, clear and quieter.",
      },
      {
        question: "How do I confirm my booking?",
        answer: "Message us on WhatsApp to lock in your dates and we'll tailor the details to your family. A small deposit secures your tour, with the balance payable before or at the start of the trip.",
      },
    ],
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
 
