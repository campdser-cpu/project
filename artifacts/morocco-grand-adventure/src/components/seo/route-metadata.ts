/**
 * Per-route SEO metadata configuration.
 *
 * Each entry maps an app path (without the language prefix) to a unique
 * title template and meta description.  The LocalizedHead component reads
 * this map at runtime to emit unique, page-specific <title> and meta
 * description tags for every route — essential for Google indexing.
 *
 * Titles follow the pattern:  "<Page-specific title> — Morocco Grand Adventure"
 * Descriptions are kept under 160 characters for optimal SERP display.
 */

export type RouteMeta = {
  /** Page-specific title (brand appended automatically). */
  title: string;
  /** Meta description (≤ 160 chars). */
  description: string;
  /** OG/Twitter image override (absolute or root-relative). */
  ogImage?: string;
};

/** Homepage meta is used as the fallback for unknown routes. */
export const HOME_META: RouteMeta = {
  title: "Luxury Desert Tours & Private Morocco Experiences",
  description:
    "Morocco Grand Adventure offers luxury private tours across Morocco — Sahara Desert camel trekking, Marrakech medinas, Chefchaouen blue city, Fes, Atlas Mountains & more. Book with local experts.",
  ogImage: "/images/hero/desert-pano.jpg",
};

/** Common tour metadata by tour id (used by tour-detail pages). */
const TOUR_META: Record<string, RouteMeta> = {
  "3-day-sahara-marrakech": {
    title: "3-Day Luxury Sahara Tour from Marrakech",
    description:
      "The classic Morocco adventure compressed into three unforgettable days. Cross the Atlas Mountains, explore Aït Ben Haddou, and sleep under Saharan stars in a luxury desert camp.",
    ogImage: "/images/tours/3-day-sahara-marrakech.jpg",
  },
  "5-day-imperial-cities": {
    title: "5-Day Imperial Cities & Desert Morocco Tour",
    description:
      "Explore Marrakech, Meknès, Fes, and the Blue City of Chefchaouen before a night in the Sahara. Five days of imperial history on this private Morocco tour.",
    ogImage: "/images/tours/5-day-imperial-cities.jpg",
  },
  "7-day-imperial-cities-sahara-escape": {
    title: "7-Day Imperial Cities & Sahara Escape — Grand Morocco Tour",
    description:
      "The very best of Morocco — cross the High Atlas, explore Aït Ben Haddou, the Dades Valley, Erg Chebbi luxury camp, and imperial Fes. A grand 7-day private tour.",
    ogImage: "/images/tours/7-day-grand-morocco.jpg",
  },
  "honeymoon-morocco": {
    title: "Romantic Morocco Honeymoon — 10 Day Luxury Private Tour",
    description:
      "Designed exclusively for couples — private riad suites, a candlelit dinner in the Sahara, hot air balloon flight, and hamam ritual for two. The ultimate Morocco honeymoon.",
    ogImage: "/images/tours/honeymoon-morocco.jpg",
  },
  "8-day-marrakech-essaouira-agadir-sahara": {
    title: "8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure",
    description:
      "A grand loop of southern Morocco — from Marrakech's palaces to Essaouira's Atlantic medina, the surf coast, and a night under the Sahara stars. Luxury private 8-day tour.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "family-morocco-adventure": {
    title: "Family Morocco Adventure — 9 Day Private Tour",
    description:
      "Morocco captivates children and adults alike. Camel rides in the Sahara, ancient kasbahs, street food in the medina, and crafts with Berber artisans. A family-friendly 9-day tour.",
    ogImage: "/images/tours/family-morocco-adventure.jpg",
  },
};

/** Common destination metadata by destination id (used by destination-detail pages). */
const DESTINATION_META: Record<string, RouteMeta> = {
  marrakech: { title: "Marrakech — Morocco Tours & Travel Guide", description: "Discover Marrakech — the Red City with ancient souks, Jemaa el-Fnaa, luxury riads, and world-class restaurants. Plan your Marrakech tour with Morocco Grand Adventure.", ogImage: "/images/dest/marrakech.jpg" },
  fes: { title: "Fes — Morocco Tours & Travel Guide", description: "Explore Fes — Morocco's cultural heart with the world's oldest university and a UNESCO-listed medieval medina. Plan your Fes tour with Morocco Grand Adventure.", ogImage: "/images/dest/fes.jpg" },
  meknes: { title: "Meknès — Morocco Tours & Travel Guide", description: "Discover Meknès — the forgotten imperial city with grand gates, atmospheric medina, and Roman ruins at Volubilis. Plan your Meknès tour with Morocco Grand Adventure.", ogImage: "/images/dest/meknes.jpg" },
  casablanca: { title: "Casablanca — Morocco Tours & Travel Guide", description: "Explore Casablanca — Morocco's cosmopolitan capital with the stunning Hassan II Mosque and art deco streets. Plan your Casablanca tour with Morocco Grand Adventure.", ogImage: "/images/dest/casablanca.jpg" },
  rabat: { title: "Rabat — Morocco Tours & Travel Guide", description: "Discover Rabat — Morocco's calm, regal capital with the Kasbah of Oudayas and Hassan Tower. Plan your Rabat tour with Morocco Grand Adventure.", ogImage: "/images/dest/rabat.jpg" },
  merzouga: { title: "Merzouga — Sahara Desert Tours & Travel Guide", description: "Explore Merzouga — gateway to the dramatic Erg Chebbi dunes with camel trekking, luxury desert camps, and unforgettable stargazing. Plan your Sahara tour with Morocco Grand Adventure.", ogImage: "/images/dest/merzouga.jpg" },
  "erg-chebbi": { title: "Erg Chebbi — Sahara Desert Tours & Travel Guide", description: "Discover Erg Chebbi — Morocco's most iconic sand sea with soaring dunes, sunrise camel treks, and luxury desert camp experiences. Plan your Sahara adventure.", ogImage: "/images/dest/erg-chebbi.jpg" },
  ouarzazate: { title: "Ouarzazate — Sahara Desert Tours & Travel Guide", description: "Explore Ouarzazate — the 'Hollywood of Africa' with film studios, the Taourirt Kasbah, and desert landscapes. Plan your Ouarzazate tour with Morocco Grand Adventure.", ogImage: "/images/dest/ouarzazate.jpg" },
  "ait-ben-haddou": { title: "Aït Ben Haddou — UNESCO Morocco Tours Guide", description: "Visit Aït Ben Haddou — a UNESCO World Heritage fortified village and Morocco's most photographed kasbah. Plan your Aït Ben Haddou tour with Morocco Grand Adventure.", ogImage: "/images/dest/ait-ben-haddou.jpg" },
  zagora: { title: "Zagora — Sahara Desert Tours & Travel Guide", description: "Discover Zagora — gateway to Erg Chigaga and the ancient Draa Valley. Experience wild desert dunes and Berber camps. Plan your Zagora tour.", ogImage: "/images/dest/zagora.jpg" },
  "dades-valley": { title: "Dades Valley — Morocco Tours & Travel Guide", description: "Explore the Valley of a Thousand Kasbahs — dramatic gorges, winding roads, and the famous Rose Festival. Plan your Dades Valley tour with Morocco Grand Adventure.", ogImage: "/images/dest/dades-valley.jpg" },
  "todra-gorge": { title: "Todra Gorge — Morocco Tours & Travel Guide", description: "Discover Todra Gorge — towering 300m canyon walls and a rock-climbing paradise. Plan your Todra Gorge tour with Morocco Grand Adventure.", ogImage: "/images/dest/todra-gorge.jpg" },
  skoura: { title: "Skoura Oasis — Morocco Tours & Travel Guide", description: "Explore the 1,000-year-old Skoura Oasis — Morocco's most beautiful palm grove with ancient kasbahs. Plan your Skoura visit with Morocco Grand Adventure.", ogImage: "/images/dest/skoura.jpg" },
  "roses-valley": { title: "Valley of Roses — Morocco Tours & Travel Guide", description: "Discover Morocco's most fragrant valley — blooming every April and May with the annual Rose Festival. Plan your Valley of Roses tour.", ogImage: "/images/dest/roses-valley.jpg" },
  "draa-valley": { title: "Draa Valley — Morocco Tours & Travel Guide", description: "Explore the Draa Valley — Morocco's longest river valley with date palms, kasbahs, and ancient trade routes. Plan your Draa Valley tour.", ogImage: "/images/dest/draa-valley.jpg" },
  chefchaouen: { title: "Chefchaouen — Morocco Tours & Travel Guide", description: "Discover the Blue Pearl of Morocco — the Instagram-famous blue medina nestled in the Rif Mountains. Plan your Chefchaouen tour with Morocco Grand Adventure.", ogImage: "/images/dest/chefchaouen.jpg" },
  imlil: { title: "Imlil — Atlas Mountains Tours & Travel Guide", description: "Explore Imlil — gateway to Mount Toubkal with Berber villages, trekking routes, and mountain hospitality. Plan your Imlil tour with Morocco Grand Adventure.", ogImage: "/images/dest/imlil.jpg" },
  "ourika-valley": { title: "Ourika Valley — Morocco Tours & Travel Guide", description: "Discover the lush Ourika Valley — waterfalls, Berber markets, and argan cooperatives just one hour from Marrakech. Plan your Ourika Valley day trip.", ogImage: "/images/dest/ourika-valley.jpg" },
  ouzoud: { title: "Ouzoud Waterfalls — Morocco Tours & Travel Guide", description: "Visit Ouzoud Falls — North Africa's most spectacular waterfalls with Barbary macaques and rainbows. Plan your Ouzoud tour with Morocco Grand Adventure.", ogImage: "/images/dest/ouzoud.jpg" },
  ifrane: { title: "Ifrane & Cedar Forest — Morocco Tours & Travel Guide", description: "Discover 'Little Switzerland' — pine forests, wild Barbary macaques, and chalet-style architecture in the Middle Atlas. Plan your Ifrane visit.", ogImage: "/images/dest/ifrane.jpg" },
  essaouira: { title: "Essaouira — Morocco Tours & Travel Guide", description: "Explore the windswept coastal gem of Essaouira — blue boats, fresh seafood, and the famous Gnawa Music Festival. Plan your Essaouira tour.", ogImage: "/images/dest/essaouira.jpg" },
  agadir: { title: "Agadir — Morocco Tours & Travel Guide", description: "Discover Agadir — Morocco's beach resort with 8km of golden sands and year-round sunshine. Plan your Agadir tour with Morocco Grand Adventure.", ogImage: "/images/dest/agadir.jpg" },
  taghazout: { title: "Taghazout — Morocco Surf Tours & Travel Guide", description: "Explore Taghazout — Africa's surf mecca with world-class breaks, yoga retreats, and bohemian vibes. Plan your Taghazout surf trip.", ogImage: "/images/dest/taghazout.jpg" },
  legzira: { title: "Legzira Beach — Morocco Tours & Travel Guide", description: "Discover Legzira's dramatic red rock arches rising from the Atlantic — one of Africa's most beautiful beaches. Plan your Legzira visit.", ogImage: "/images/dest/legzira.jpg" },
  "el-jadida": { title: "El Jadida — Morocco Tours & Travel Guide", description: "Explore El Jadida's UNESCO-listed Portuguese Citadel and the extraordinary underground cistern on the Atlantic coast. Plan your El Jadida visit.", ogImage: "/images/dest/el-jadida.jpg" },
  tangier: { title: "Tangier — Morocco Tours & Travel Guide", description: "Discover the gateway between Africa and Europe — the Strait of Gibraltar, art, and intrigue. Plan your Tangier tour with Morocco Grand Adventure.", ogImage: "/images/dest/tangier.jpg" },
  tetouan: { title: "Tétouan — Morocco Tours & Travel Guide", description: "Explore Tétouan's UNESCO-listed white medina — Spain's Andalusian heritage in Morocco. Plan your Tétouan tour with Morocco Grand Adventure.", ogImage: "/images/dest/tetouan.jpg" },
  akchour: { title: "Akchour & God's Bridge — Morocco Tours & Travel Guide", description: "Discover wild gorges, turquoise pools, and a natural stone bridge near Chefchaouen. Plan your Akchour hiking adventure.", ogImage: "/images/dest/akchour.jpg" },
  nkob: { title: "Nkob — Morocco Tours & Travel Guide", description: "Explore the village of 45 kasbahs — remote, unspoiled, and spectacularly beautiful in the Jbel Saghro. Plan your Nkob adventure.", ogImage: "/images/dest/nkob.jpg" },
  mirleft: { title: "Mirleft — Morocco Surf Tours & Travel Guide", description: "Discover the unspoilt surf village between Tiznit and Sidi Ifni — wild Atlantic beaches and cliff-top sunsets. Plan your Mirleft visit.", ogImage: "/images/dest/mirleft.jpg" },
};

/**
 * Map of app-path → RouteMeta.
 * Keys are the "rest" portion of the URL (after the /lang/ prefix),
 * normalised to start with "/" and without trailing slashes.
 */
export const routeMetadata: Record<string, RouteMeta> = {
  "/": HOME_META,

  // ── Listing pages ──────────────────────────────────────────────────────
  "/destinations": {
    title: "Morocco Destinations — Sahara, Imperial Cities, Atlas Mountains",
    description:
      "Explore Morocco's top destinations — Merzouga Sahara dunes, Marrakech medina, Chefchaouen blue city, Fes, Atlas Mountains, Essaouira coast & more. Plan your journey with local experts.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/tours": {
    title: "Morocco Tours & Private Itineraries — 3 to 10 Day Adventures",
    description:
      "Browse private Morocco tours — 3-day Sahara desert tours, 5-day imperial cities, 7-day grand Morocco, family adventures, luxury honeymoons. Private guides, luxury camps, camel trekking.",
    ogImage: "/images/tours/7-day-grand-morocco.jpg",
  },
  "/gallery": {
    title: "Morocco Photo & Video Gallery — Sahara, Medinas, Atlas Mountains",
    description:
      "Stunning photos and videos from Morocco — Sahara desert sunsets, Marrakech souks, Chefchaouen blue streets, Atlas Mountains, luxury desert camps. See the journey before you book.",
    ogImage: "/images/hero/medina-pano.jpg",
  },
  "/trip-builder": {
    title: "Custom Morocco Trip Builder — Design Your Bespoke Itinerary",
    description:
      "Build your perfect Morocco trip step by step. Choose destinations, interests, budget and travel dates — our local experts craft a personalised itinerary just for you.",
    ogImage: "/images/personal/luxury-camp-dusk.jpg",
  },
  "/about": {
    title: "About Morocco Grand Adventure — Local Sahara Experts Since 2000",
    description:
      "Born and raised in the Sahara, our team of local guides has been crafting authentic Morocco journeys for 25+ years. Learn our story, philosophy, and commitment to sustainable tourism.",
    ogImage: "/images/personal/guide-guest-tea.jpg",
  },
  "/contact": {
    title: "Contact Morocco Grand Adventure — Plan Your Morocco Journey",
    description:
      "Contact Morocco Grand Adventure via WhatsApp, email, or phone. Our local experts in Merzouga respond within 24 hours to help plan your dream Morocco journey.",
    ogImage: "/images/dest/merzouga.jpg",
  },

  // ── New dedicated experience pages ─────────────────────────────────────
  "/desert-tours": {
    title: "Sahara Desert Tours — Merzouga, Erg Chebbi & Luxury Camps",
    description:
      "Experience the Sahara with Morocco's leading desert tour experts. Private Merzouga desert tours, Erg Chebbi camel treks, luxury desert camps & 4x4 adventures. Book direct.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/luxury-camp": {
    title: "Luxury Desert Camp Morocco — Exclusive Sahara Glamping",
    description:
      "Sleep under a canopy of stars in our exclusive luxury desert camp near Merzouga. Private tents, fine dining, en-suite bathrooms & unforgettable Sahara nights.",
    ogImage: "/images/personal/luxury-camp-dusk.jpg",
  },
  "/camel-trekking": {
    title: "Camel Trekking Merzouga — Sahara Camel Rides & Sunset Treks",
    description:
      "Ride camels across the golden dunes of Erg Chebbi at sunset. Authentic Merzouga camel trekking experiences with expert Berber guides. Book your Sahara camel ride today.",
    ogImage: "/images/personal/dunes-camels-poster.jpg",
  },
  "/4x4-tours": {
    title: "4x4 Desert Tours Morocco — Sahara Off-Road Adventures",
    description:
      "Explore the Sahara in style with private 4x4 desert tours. Erg Chebbi dunes, nomad camps, fossil beds & hidden oases. Luxury off-road adventures from Merzouga.",
    ogImage: "/images/dest/erg-chebbi.jpg",
  },
  "/marrakech-tours": {
    title: "Marrakech Tours — Private Day Trips & Multi-Day Morocco Tours",
    description:
      "Discover Marrakech with private guided tours. Explore the medina, Jemaa el-Fnaa, Majorelle Garden & beyond. Day trips to the Sahara, Atlas Mountains & coastal Essaouira.",
    ogImage: "/images/dest/marrakech.jpg",
  },
  "/fes-tours": {
    title: "Fes Tours — Private Guided Tours of Morocco's Cultural Capital",
    description:
      "Explore Fes with expert local guides. Discover the medieval medina, Chouara Tannery, Al-Qarawiyyin University & the Blue City of Chefchaouen. Private Fes tours & day trips.",
    ogImage: "/images/dest/fes.jpg",
  },
  "/day-trips": {
    title: "Morocco Day Trips — From Marrakech, Fes & Merzouga",
    description:
      "Discover Morocco's highlights on unforgettable day trips. From Marrakech to the Sahara, Atlas Mountains & coastal gems. Private guided day tours with local experts.",
    ogImage: "/images/dest/ouzoud.jpg",
  },
  "/merzouga-guide": {
    title: "Merzouga Travel Guide — Sahara Desert, Erg Chebbi & Luxury Camps",
    description:
      "The ultimate Merzouga travel guide. Discover Erg Chebbi dunes, luxury desert camps, camel trekking, stargazing & everything you need to plan your Sahara adventure.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/faq": {
    title: "Morocco Travel FAQ — Visa, Safety, Packing & Booking Questions",
    description:
      "Answers to your Morocco travel questions — visas, safety, best time to visit, packing tips, desert tours, payments & more. Expert advice from local Morocco specialists.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/blog": {
    title: "Morocco Travel Blog — Guides, Tips & Inspiration",
    description:
      "Expert Morocco travel guides, insider tips, and inspiration from local Sahara experts. Discover the best of Morocco — from desert adventures to imperial cities.",
    ogImage: "/images/hero/desert-pano.jpg",
  },
};

/**
 * Resolve the RouteMeta for a given app path.
 * Handles dynamic /tours/:id and /destinations/:id routes via the
 * TOUR_META and DESTINATION_META maps, falling back to the homepage meta.
 */
export function getRouteMeta(rest: string): RouteMeta {
  const normalised = rest === "" || rest === "/" ? "/" : rest.replace(/\/$/, "");
  if (routeMetadata[normalised]) return routeMetadata[normalised];

  // Dynamic tour route: /tours/:id
  const tourMatch = normalised.match(/^\/tours\/([^/]+)$/);
  if (tourMatch) {
    const meta = TOUR_META[tourMatch[1]];
    if (meta) return meta;
  }

  // Dynamic destination route: /destinations/:id
  const destMatch = normalised.match(/^\/destinations\/([^/]+)$/);
  if (destMatch) {
    const meta = DESTINATION_META[destMatch[1]];
    if (meta) return meta;
  }

  return HOME_META;
}