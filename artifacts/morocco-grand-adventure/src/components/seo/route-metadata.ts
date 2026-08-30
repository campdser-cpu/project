/**
 * Per-route SEO metadata configuration.
 *
 * Each entry maps an app path (without the language prefix) to a unique
 * title template and meta description.  The LocalizedHead component reads
 * this map at runtime to emit unique, page-specific <title> and meta
 * description tags for every route â€” essential for Google indexing.
 *
 * Titles follow the pattern:  "<Page-specific title> â€” Morocco Grand Adventure"
 * Descriptions are kept under 160 characters for optimal SERP display.
 */

export type RouteMeta = {
  /** Page-specific title (brand appended automatically). */
  title: string;
  /** Meta description (â‰¤ 160 chars). */
  description: string;
  /** OG/Twitter image override (absolute or root-relative). */
  ogImage?: string;
};

/** Homepage meta is used as the fallback for unknown routes. */
export const HOME_META: RouteMeta = {
  title: "Luxury Desert Tours & Private Morocco Experiences",
  description:
    "Morocco Grand Adventure offers luxury private tours across Morocco â€” Sahara Desert camel trekking, Marrakech medinas, Chefchaouen blue city, Fes, Atlas Mountains & more. Book with local experts.",
  ogImage: "/images/hero/desert-pano.jpg",
};

/**
 * French homepage SERP meta. Shared by LocalizedHead (runtime) and the
 * prerenderer so crawlers and browsers always see the same French proposition.
 * Written for French-speaking travelers â€” not mechanically translated.
 */
export const FR_HOME_META: RouteMeta = {
  title: "Voyage sur mesure au Maroc â€” Circuits privÃ©s & Sahara",
  description:
    "CrÃ©ez votre circuit privÃ© au Maroc avec une agence locale : dÃ©sert de Merzouga, nuit en camp de luxe, Marrakech, FÃ¨s et l'Atlas. Devis personnalisÃ© sous 24 h.",
  ogImage: "/images/hero/desert-pano.jpg",
};

const TOUR_SEO_ALIAS_TO_ID: Record<string, string> = {
  '3-days-marrakech-to-merzouga-desert-tour': '3-day-sahara-marrakech',
  '3-days-fes-to-marrakech-desert-tour': '5-day-imperial-cities',
  'merzouga-desert-tour': '3-day-sahara-marrakech',
  'morocco-desert-tour': '7-day-imperial-cities-sahara-escape',
};

/** Common tour metadata by tour id (used by tour-detail pages). */
const TOUR_META: Record<string, RouteMeta> = {
  "3-day-sahara-marrakech": {
    title: "3-Day Luxury Sahara Tour from Marrakech",
    description:
      "The classic Morocco adventure compressed into three unforgettable days. Cross the Atlas Mountains, explore AÃ¯t Ben Haddou, and sleep under Saharan stars in a luxury desert camp.",
    ogImage: "/images/tours/3-day-sahara-marrakech.jpg",
  },
  "5-day-imperial-cities": {
    title: "5-Day Imperial Cities & Desert Morocco Tour",
    description:
      "Explore Marrakech, MeknÃ¨s, Fes, and the Blue City of Chefchaouen before a night in the Sahara. Five days of imperial history on this private Morocco tour.",
    ogImage: "/images/tours/5-day-imperial-cities.jpg",
  },
  "7-day-imperial-cities-sahara-escape": {
    title: "7-Day Imperial Cities & Sahara Escape â€” Grand Morocco Tour",
    description:
      "The very best of Morocco â€” cross the High Atlas, explore AÃ¯t Ben Haddou, the Dades Valley, Erg Chebbi luxury camp, and imperial Fes. A grand 7-day private tour.",
    ogImage: "/images/tours/7-day-grand-morocco.jpg",
  },
  "honeymoon-morocco": {
    title: "Romantic Morocco Honeymoon â€” 10 Day Luxury Private Tour",
    description:
      "Designed exclusively for couples â€” private riad suites, a candlelit dinner in the Sahara, hot air balloon flight, and hamam ritual for two. The ultimate Morocco honeymoon.",
    ogImage: "/images/tours/honeymoon-morocco.jpg",
  },
  "8-day-marrakech-essaouira-agadir-sahara": {
    title: "8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure",
    description:
      "A grand loop of southern Morocco â€” from Marrakech's palaces to Essaouira's Atlantic medina, the surf coast, and a night under the Sahara stars. Luxury private 8-day tour.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "family-morocco-adventure": {
    title: "Family Morocco Adventure â€” 9 Day Private Tour",
    description:
      "Morocco captivates children and adults alike. Camel rides in the Sahara, ancient kasbahs, street food in the medina, and crafts with Berber artisans. A family-friendly 9-day tour.",
    ogImage: "/images/tours/family-morocco-adventure.jpg",
  },
};

/** Common destination metadata by destination id (used by destination-detail pages). */
const DESTINATION_META: Record<string, RouteMeta> = {
  marrakech: { title: "Marrakech â€” Morocco Tours & Travel Guide", description: "Discover Marrakech â€” the Red City with ancient souks, Jemaa el-Fnaa, luxury riads, and world-class restaurants. Plan your Marrakech tour with Morocco Grand Adventure.", ogImage: "/images/dest/marrakech.jpg" },
  fes: { title: "Fes â€” Morocco Tours & Travel Guide", description: "Explore Fes â€” Morocco's cultural heart with the world's oldest university and a UNESCO-listed medieval medina. Plan your Fes tour with Morocco Grand Adventure.", ogImage: "/images/dest/fes.jpg" },
  meknes: { title: "MeknÃ¨s â€” Morocco Tours & Travel Guide", description: "Discover MeknÃ¨s â€” the forgotten imperial city with grand gates, atmospheric medina, and Roman ruins at Volubilis. Plan your MeknÃ¨s tour with Morocco Grand Adventure.", ogImage: "/images/dest/meknes.jpg" },
  casablanca: { title: "Casablanca â€” Morocco Tours & Travel Guide", description: "Explore Casablanca â€” Morocco's cosmopolitan capital with the stunning Hassan II Mosque and art deco streets. Plan your Casablanca tour with Morocco Grand Adventure.", ogImage: "/images/dest/casablanca.jpg" },
  rabat: { title: "Rabat â€” Morocco Tours & Travel Guide", description: "Discover Rabat â€” Morocco's calm, regal capital with the Kasbah of Oudayas and Hassan Tower. Plan your Rabat tour with Morocco Grand Adventure.", ogImage: "/images/dest/rabat.jpg" },
  merzouga: { title: "Merzouga â€” Sahara Desert Tours & Travel Guide", description: "Explore Merzouga â€” gateway to the dramatic Erg Chebbi dunes with camel trekking, luxury desert camps, and unforgettable stargazing. Plan your Sahara tour with Morocco Grand Adventure.", ogImage: "/images/dest/merzouga.jpg" },
  "erg-chebbi": { title: "Erg Chebbi â€” Sahara Desert Tours & Travel Guide", description: "Discover Erg Chebbi â€” Morocco's most iconic sand sea with soaring dunes, sunrise camel treks, and luxury desert camp experiences. Plan your Sahara adventure.", ogImage: "/images/dest/erg-chebbi.jpg" },
  ouarzazate: { title: "Ouarzazate â€” Sahara Desert Tours & Travel Guide", description: "Explore Ouarzazate â€” the 'Hollywood of Africa' with film studios, the Taourirt Kasbah, and desert landscapes. Plan your Ouarzazate tour with Morocco Grand Adventure.", ogImage: "/images/dest/ouarzazate.jpg" },
  "ait-ben-haddou": { title: "AÃ¯t Ben Haddou â€” UNESCO Morocco Tours Guide", description: "Visit AÃ¯t Ben Haddou â€” a UNESCO World Heritage fortified village and Morocco's most photographed kasbah. Plan your AÃ¯t Ben Haddou tour with Morocco Grand Adventure.", ogImage: "/images/dest/ait-ben-haddou.jpg" },
  zagora: { title: "Zagora â€” Sahara Desert Tours & Travel Guide", description: "Discover Zagora â€” gateway to Erg Chigaga and the ancient Draa Valley. Experience wild desert dunes and Berber camps. Plan your Zagora tour.", ogImage: "/images/dest/zagora.jpg" },
  "dades-valley": { title: "Dades Valley â€” Morocco Tours & Travel Guide", description: "Explore the Valley of a Thousand Kasbahs â€” dramatic gorges, winding roads, and the famous Rose Festival. Plan your Dades Valley tour with Morocco Grand Adventure.", ogImage: "/images/dest/dades-valley.jpg" },
  "todra-gorge": { title: "Todra Gorge â€” Morocco Tours & Travel Guide", description: "Discover Todra Gorge â€” towering 300m canyon walls and a rock-climbing paradise. Plan your Todra Gorge tour with Morocco Grand Adventure.", ogImage: "/images/dest/todra-gorge.jpg" },
  skoura: { title: "Skoura Oasis â€” Morocco Tours & Travel Guide", description: "Explore the 1,000-year-old Skoura Oasis â€” Morocco's most beautiful palm grove with ancient kasbahs. Plan your Skoura visit with Morocco Grand Adventure.", ogImage: "/images/dest/skoura.jpg" },
  "roses-valley": { title: "Valley of Roses â€” Morocco Tours & Travel Guide", description: "Discover Morocco's most fragrant valley â€” blooming every April and May with the annual Rose Festival. Plan your Valley of Roses tour.", ogImage: "/images/dest/roses-valley.jpg" },
  "draa-valley": { title: "Draa Valley â€” Morocco Tours & Travel Guide", description: "Explore the Draa Valley â€” Morocco's longest river valley with date palms, kasbahs, and ancient trade routes. Plan your Draa Valley tour.", ogImage: "/images/dest/draa-valley.jpg" },
  chefchaouen: { title: "Chefchaouen â€” Morocco Tours & Travel Guide", description: "Discover the Blue Pearl of Morocco â€” the Instagram-famous blue medina nestled in the Rif Mountains. Plan your Chefchaouen tour with Morocco Grand Adventure.", ogImage: "/images/dest/chefchaouen.jpg" },
  imlil: { title: "Imlil â€” Atlas Mountains Tours & Travel Guide", description: "Explore Imlil â€” gateway to Mount Toubkal with Berber villages, trekking routes, and mountain hospitality. Plan your Imlil tour with Morocco Grand Adventure.", ogImage: "/images/dest/imlil.jpg" },
  "ourika-valley": { title: "Ourika Valley â€” Morocco Tours & Travel Guide", description: "Discover the lush Ourika Valley â€” waterfalls, Berber markets, and argan cooperatives just one hour from Marrakech. Plan your Ourika Valley day trip.", ogImage: "/images/dest/ourika-valley.jpg" },
  ouzoud: { title: "Ouzoud Waterfalls â€” Morocco Tours & Travel Guide", description: "Visit Ouzoud Falls â€” North Africa's most spectacular waterfalls with Barbary macaques and rainbows. Plan your Ouzoud tour with Morocco Grand Adventure.", ogImage: "/images/dest/ouzoud.jpg" },
  ifrane: { title: "Ifrane & Cedar Forest â€” Morocco Tours & Travel Guide", description: "Discover 'Little Switzerland' â€” pine forests, wild Barbary macaques, and chalet-style architecture in the Middle Atlas. Plan your Ifrane visit.", ogImage: "/images/dest/ifrane.jpg" },
  essaouira: { title: "Essaouira â€” Morocco Tours & Travel Guide", description: "Explore the windswept coastal gem of Essaouira â€” blue boats, fresh seafood, and the famous Gnawa Music Festival. Plan your Essaouira tour.", ogImage: "/images/dest/essaouira.jpg" },
  agadir: { title: "Agadir â€” Morocco Tours & Travel Guide", description: "Discover Agadir â€” Morocco's beach resort with 8km of golden sands and year-round sunshine. Plan your Agadir tour with Morocco Grand Adventure.", ogImage: "/images/dest/agadir.jpg" },
  taghazout: { title: "Taghazout â€” Morocco Surf Tours & Travel Guide", description: "Explore Taghazout â€” Africa's surf mecca with world-class breaks, yoga retreats, and bohemian vibes. Plan your Taghazout surf trip.", ogImage: "/images/dest/taghazout.jpg" },
  legzira: { title: "Legzira Beach â€” Morocco Tours & Travel Guide", description: "Discover Legzira's dramatic red rock arches rising from the Atlantic â€” one of Africa's most beautiful beaches. Plan your Legzira visit.", ogImage: "/images/dest/legzira.jpg" },
  "el-jadida": { title: "El Jadida â€” Morocco Tours & Travel Guide", description: "Explore El Jadida's UNESCO-listed Portuguese Citadel and the extraordinary underground cistern on the Atlantic coast. Plan your El Jadida visit.", ogImage: "/images/dest/el-jadida.jpg" },
  tangier: { title: "Tangier â€” Morocco Tours & Travel Guide", description: "Discover the gateway between Africa and Europe â€” the Strait of Gibraltar, art, and intrigue. Plan your Tangier tour with Morocco Grand Adventure.", ogImage: "/images/dest/tangier.jpg" },
  tetouan: { title: "TÃ©touan â€” Morocco Tours & Travel Guide", description: "Explore TÃ©touan's UNESCO-listed white medina â€” Spain's Andalusian heritage in Morocco. Plan your TÃ©touan tour with Morocco Grand Adventure.", ogImage: "/images/dest/tetouan.jpg" },
  akchour: { title: "Akchour & God's Bridge â€” Morocco Tours & Travel Guide", description: "Discover wild gorges, turquoise pools, and a natural stone bridge near Chefchaouen. Plan your Akchour hiking adventure.", ogImage: "/images/dest/akchour.jpg" },
  nkob: { title: "Nkob â€” Morocco Tours & Travel Guide", description: "Explore the village of 45 kasbahs â€” remote, unspoiled, and spectacularly beautiful in the Jbel Saghro. Plan your Nkob adventure.", ogImage: "/images/dest/nkob.jpg" },
  mirleft: { title: "Mirleft â€” Morocco Surf Tours & Travel Guide", description: "Discover the unspoilt surf village between Tiznit and Sidi Ifni â€” wild Atlantic beaches and cliff-top sunsets. Plan your Mirleft visit.", ogImage: "/images/dest/mirleft.jpg" },
};

/**
 * Map of app-path â†’ RouteMeta.
 * Keys are the "rest" portion of the URL (after the /lang/ prefix),
 * normalised to start with "/" and without trailing slashes.
 */
export const routeMetadata: Record<string, RouteMeta> = {
  "/": HOME_META,

  // â”€â”€ Listing pages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  "/destinations": {
    title: "Morocco Destinations â€” Sahara, Imperial Cities, Atlas Mountains",
    description:
      "Explore Morocco's top destinations â€” Merzouga Sahara dunes, Marrakech medina, Chefchaouen blue city, Fes, Atlas Mountains, Essaouira coast & more. Plan your journey with local experts.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/tours": {
    title: "Morocco Tours & Private Itineraries â€” 3 to 10 Day Adventures",
    description:
      "Browse private Morocco tours â€” 3-day Sahara desert tours, 5-day imperial cities, 7-day grand Morocco, family adventures, luxury honeymoons. Private guides, luxury camps, camel trekking.",
    ogImage: "/images/tours/7-day-grand-morocco.jpg",
  },
  "/gallery": {
    title: "Morocco Photo & Video Gallery â€” Sahara, Medinas, Atlas Mountains",
    description:
      "Stunning photos and videos from Morocco â€” Sahara desert sunsets, Marrakech souks, Chefchaouen blue streets, Atlas Mountains, luxury desert camps. See the journey before you book.",
    ogImage: "/images/hero/medina-pano.jpg",
  },
  "/trip-builder": {
    title: "Create a Custom Morocco Itinerary â€” Private Trip Planner",
    description:
      "Design your own private Morocco itinerary â€” dates, budget, Sahara camps in Merzouga, Fes and Marrakech. Local experts reply with a quote within 24 hours.",
    ogImage: "/images/personal/luxury-camp-dusk.jpg",
  },
  "/about": {
    title: "About Us â€” Meet Your Local Berber Guides | Morocco Grand Adventure",
    description:
      "Meet the Berber family behind Morocco Grand Adventure â€” native Sahara guides from Merzouga offering authentic camel treks and real Morocco travel experiences.",
    ogImage: "/images/hero/medina-pano.jpg",
  },
  "/contact": {
    title: "Contact Morocco Grand Adventure â€” Plan Your Morocco Journey",
    description:
      "Contact Morocco Grand Adventure via WhatsApp, email, or phone. Our local experts in Merzouga respond within 24 hours to help plan your dream Morocco journey.",
    ogImage: "/images/dest/merzouga.jpg",
  },

  // â”€â”€ New dedicated experience pages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  "/desert-tours": {
    title: "Sahara Desert Tours â€” Merzouga, Erg Chebbi & Luxury Camps",
    description:
      "Experience the Sahara with Morocco's leading desert tour experts. Private Merzouga desert tours, Erg Chebbi camel treks, luxury desert camps & 4x4 adventures. Book direct.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/luxury-camp": {
    title: "Luxury Desert Camp Morocco â€” Exclusive Sahara Glamping",
    description:
      "Sleep under a canopy of stars in our exclusive luxury desert camp near Merzouga. Private tents, fine dining, en-suite bathrooms & unforgettable Sahara nights.",
    ogImage: "/images/personal/luxury-camp-dusk.jpg",
  },
  "/camel-trekking": {
    title: "Camel Trekking Merzouga â€” Sahara Camel Rides & Sunset Treks",
    description:
      "Ride camels across the golden dunes of Erg Chebbi at sunset. Authentic Merzouga camel trekking experiences with expert Berber guides. Book your Sahara camel ride today.",
    ogImage: "/images/personal/dunes-camels-poster.jpg",
  },
  "/4x4-tours": {
    title: "4x4 Desert Tours Morocco â€” Sahara Off-Road Adventures",
    description:
      "Explore the Sahara in style with private 4x4 desert tours. Erg Chebbi dunes, nomad camps, fossil beds & hidden oases. Luxury off-road adventures from Merzouga.",
    ogImage: "/images/dest/erg-chebbi.jpg",
  },
  "/marrakech-tours": {
    title: "Marrakech Tours â€” Private Day Trips & Multi-Day Morocco Tours",
    description:
      "Discover Marrakech with private guided tours. Explore the medina, Jemaa el-Fnaa, Majorelle Garden & beyond. Day trips to the Sahara, Atlas Mountains & coastal Essaouira.",
    ogImage: "/images/dest/marrakech.jpg",
  },
  "/fes-tours": {
    title: "Fes Tours â€” Private Guided Tours of Morocco's Cultural Capital",
    description:
      "Explore Fes with expert local guides. Discover the medieval medina, Chouara Tannery, Al-Qarawiyyin University & the Blue City of Chefchaouen. Private Fes tours & day trips.",
    ogImage: "/images/dest/fes.jpg",
  },
  "/day-trips": {
    title: "Morocco Day Trips â€” From Marrakech, Fes & Merzouga",
    description:
      "Discover Morocco's highlights on unforgettable day trips. From Marrakech to the Sahara, Atlas Mountains & coastal gems. Private guided day tours with local experts.",
    ogImage: "/images/dest/ouzoud.jpg",
  },
  "/merzouga-guide": {
    title: "Merzouga Travel Guide â€” Sahara Desert, Erg Chebbi & Luxury Camps",
    description:
      "The ultimate Merzouga travel guide. Discover Erg Chebbi dunes, luxury desert camps, camel trekking, stargazing & everything you need to plan your Sahara adventure.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "/faq": {
    title: "Morocco Travel FAQ â€” Visa, Safety, Packing & Booking Questions",
    description:
      "Answers to your Morocco travel questions â€” visas, safety, best time to visit, packing tips, desert tours, payments & more. Expert advice from local Morocco specialists.",
    ogImage: "/images/dest/merzouga.jpg",
  },
    "/blog": {
    title: "Morocco Travel Blog â€” Guides, Tips & Inspiration",
    description:
      "Expert Morocco travel guides, insider tips, and inspiration from local Sahara experts. Discover the best of Morocco â€” from desert adventures to imperial cities.",
    ogImage: "/images/hero/desert-pano.jpg",
  },
};

/**
 * Per-article SEO metadata for every blog article.
 * Keys must match the slug strings used in src/pages/blog.tsx.
 */
export const BLOG_META: Record<string, RouteMeta> = {
  "merzouga-luxury-desert-camp-guide": {
    title: "Luxury Desert Camps in Merzouga â€” Ultimate Guide to Sahara Glamping",
    description:
      "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way â€” everything you need to know about luxury glamping in the Merzouga Sahara.",
    ogImage: "/images/personal/luxury-camp-dusk.jpg",
  },
  "best-time-to-visit-morocco-sahara": {
    title: "Best Time to Visit the Sahara Desert â€” Month-by-Month Guide",
    description:
      "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and ideal conditions month by month.",
    ogImage: "/images/dest/merzouga.jpg",
  },
  "camel-trekking-etiquette-morocco": {
    title: "Camel Trekking in Morocco â€” What to Expect and How to Prepare",
    description:
      "Everything first-time riders need to know â€” what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.",
    ogImage: "/images/personal/dunes-camels-poster.jpg",
  },
  "marrakech-to-merzouga-roadtrip": {
    title: "Marrakech to Merzouga â€” Ultimate Sahara Road Trip Itinerary",
    description:
      "Cross the High Atlas, explore AÃ¯t Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi â€” the complete route guide.",
    ogImage: "/images/dest/ait-ben-haddou.jpg",
  },
  "morocco-packing-list-desert": {
    title: "Morocco Desert Packing List â€” What to Bring for Sahara Tours",
    description:
      "What to pack for the Sahara â€” breathable layers, sun protection, and the essentials that make a desert night unforgettable.",
    ogImage: "/images/hero/desert-pano.jpg",
  },
  "fes-chefchaouen-blue-city-guide": {
    title: "Fes to Chefchaouen â€” Exploring Morocco's Blue Pearl",
    description:
      "The journey from Morocco's cultural heart to the famous blue medina â€” what to see, where to stay, and how to make the most of it.",
    ogImage: "/images/dest/chefchaouen.jpg",
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
    const requestedSlug = tourMatch[1];
    const canonicalTourId = TOUR_SEO_ALIAS_TO_ID[requestedSlug] ?? requestedSlug;
    const meta = TOUR_META[canonicalTourId];
    if (meta) return meta;
  }

    // Dynamic destination route: /destinations/:id
  const destMatch = normalised.match(/^\/destinations\/([^/]+)$/);
  if (destMatch) {
    const meta = DESTINATION_META[destMatch[1]];
    if (meta) return meta;
  }

  // Dynamic blog route: /blog/:slug
  const blogMatch = normalised.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const meta = BLOG_META[blogMatch[1]];
    if (meta) return meta;
  }

  return HOME_META;
}

// â”€â”€ Arabic (RTL) SEO metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Keyword-rich Arabic titles/descriptions for the /ar/ locale, so its pages
// carry genuinely Arabic, Morocco-travel-optimized meta in prerendered HTML
// and runtime SEO head. Falls back to English where not provided.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const arKey = (rest: string): string =>
  rest === "" || rest === "/" ? "/" : rest.replace(/\/+$/, "");

export const AR_ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø¬ÙˆÙ„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆÙ…Ø±Ø§ÙƒØ´",
    description:
      "Ø±Ø­Ù„Ø§Øª Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨: Ø¬ÙˆÙ„Ø§Øª ØµØ­Ø±Ø§ÙˆÙŠØ© ÙÙŠ Ù…Ø±Ø²ÙˆÙƒØ© Ø¹Ù„Ù‰ Ø¸Ù‡ÙˆØ± Ø§Ù„Ø¬Ù…Ø§Ù„ØŒ Ù…Ø±Ø§ÙƒØ´ØŒ ÙØ§Ø³ØŒ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©. Ø§Ø­Ø¬Ø² Ù…Ø¹ Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø­Ù„ÙŠÙŠÙ† Ù„ØªØ¬Ø±Ø¨Ø© Ø£ØµÙŠÙ„Ø©.",
  },
  "/tours": {
    title: "Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø±Ø­Ù„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©",
    description:
      "ØªØµÙØ­ Ø¬Ù…ÙŠØ¹ Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨: Ø±Ø­Ù„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ù…Ù† Ù…Ø±Ø§ÙƒØ´ØŒ Ù…Ø±Ø²ÙˆÙƒØ©ØŒ Ø§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© ÙˆØ¬Ø¨Ø§Ù„ Ø§Ù„Ø£Ø·Ù„Ø³. Ø¬ÙˆÙ„Ø§Øª Ø®Ø§ØµØ© Ù„Ù„Ø¹Ø§Ø¦Ù„Ø§Øª ÙˆØ´Ù‡Ø± Ø§Ù„Ø¹Ø³Ù„ Ø¨Ø£Ø³Ø¹Ø§Ø± Ø¹Ø§Ø¯Ù„Ø©.",
  },
  "/destinations": {
    title: "ÙˆØ¬Ù‡Ø§Øª Ø§Ù„Ø³ÙŠØ§Ø­Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ù…Ø¯Ù† ÙˆØµØ­Ø§Ø±Ù‰",
    description:
      "Ø¯Ù„ÙŠÙ„ ÙˆØ¬Ù‡Ø§Øª Ø§Ù„Ø³ÙŠØ§Ø­Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨: Ù…Ø±Ø§ÙƒØ´ØŒ Ù…Ø±Ø²ÙˆÙƒØ©ØŒ ÙØ§Ø³ØŒ Ø§Ù„ØµØ­Ø±Ø§Ø¡ØŒ ÙˆØ³Ø§Ø­Ù„ Ø§Ù„Ø£Ø·Ù„Ø³ÙŠ. Ø§ÙƒØªØ´Ù Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ø¯Ù† ÙˆØ§Ù„Ù…Ù†Ø§Ø¸Ø± Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ© Ù„Ø±Ø­Ù„ØªÙƒ Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©.",
  },
  "/about": {
    title: "Ù…Ù† Ù†Ø­Ù† â€” ÙˆÙƒØ§Ù„Ø© Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨",
    description:
      "ØªØ¹Ø±Ù‘Ù Ø¹Ù„Ù‰ ÙØ±ÙŠÙ‚ Morocco Grand Adventure: Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø­Ù„ÙŠÙˆÙ† ÙÙŠ Ø§Ù„Ø³ÙŠØ§Ø­Ø© Ø§Ù„ØµØ­Ø±Ø§ÙˆÙŠØ© ÙˆØ§Ù„Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ØŒ Ø¨Ø®Ø¯Ù…Ø© Ø´Ø®ØµÙŠØ©.",
  },
  "/contact": {
    title: "Ø§ØªØµÙ„ Ø¨Ù†Ø§ â€” Ø­Ø¬Ø² Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨",
    description:
      "ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ù„Ø­Ø¬Ø² Ø±Ø­Ù„ØªÙƒ ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ ÙˆØ§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ. Ø±Ø¯Ù‘ Ø³Ø±ÙŠØ¹ ÙˆÙ…Ø®Ø·Ø· Ù…Ø®ØµØµ Ù„Ù…ØºØ§Ù…Ø±Ø© ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆÙ…Ø±Ø§ÙƒØ´.",
  },
  "/faq": {
    title: "Ø£Ø³Ø¦Ù„Ø© Ø´Ø§Ø¦Ø¹Ø© Ø¹Ù† Ø§Ù„Ø³ÙŠØ§Ø­Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨",
    description:
      "Ø¥Ø¬Ø§Ø¨Ø§Øª Ø¹Ù† Ø£Ø³Ø¦Ù„ØªÙƒ Ø­ÙˆÙ„ Ø§Ù„Ø³ÙŠØ§Ø­Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨: Ø§Ù„ØªØ£Ø´ÙŠØ±Ø©ØŒ Ø§Ù„Ø£Ù…Ø§Ù†ØŒ Ø£ÙØ¶Ù„ ÙˆÙ‚Øª Ù„Ù„Ø²ÙŠØ§Ø±Ø©ØŒ Ù…Ø§Ø°Ø§ ØªØ­Ø²Ù…ØŒ Ø­Ø¬Ø² Ø§Ù„Ø¬ÙˆÙ„Ø§ØªØŒ ÙˆÙˆØ³Ø§Ø¦Ù„ Ø§Ù„Ø¯ÙØ¹.",
  },
  "/blog": {
    title: "Ù…Ø¯ÙˆÙ†Ø© Ø§Ù„Ø³ÙØ± Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ© â€” Ù†ØµØ§Ø¦Ø­ ÙˆØ£Ø¯Ù„Ø©",
    description:
      "Ø£Ø¯Ù„Ù‘Ø© Ø³ÙØ± ÙˆÙ†ØµØ§Ø¦Ø­ Ù…Ø­Ù„ÙŠØ© Ù…Ù† Ø®Ø¨Ø±Ø§Ø¡ Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©: Ù…Ø±Ø²ÙˆÙƒØ©ØŒ Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„ÙƒØ¨Ø±Ù‰ØŒ Ù…Ø±Ø§ÙƒØ´ØŒ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© Ù„Ø±Ø­Ù„ØªÙƒ Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©.",
  },
  "/gallery": {
    title: "Ù…Ø¹Ø±Ø¶ ØµÙˆØ± Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆÙ…Ø±Ø²ÙˆÙƒØ©",
    description:
      "Ù…Ø¹Ø±Ø¶ ØµÙˆØ± Ù…Ù† Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ©: Ø§Ù„ÙƒØ«Ø¨Ø§Ù† Ø§Ù„Ø±Ù…Ù„ÙŠØ©ØŒ Ø§Ù„Ø¬Ù…Ø§Ù„ØŒ Ù…Ø±Ø§ÙƒØ´ØŒ Ø§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©ØŒ ÙˆØ³Ø§Ø­Ù„ Ø§Ù„Ø£Ø·Ù„Ø³.",
  },
  "/luxury-camp": {
    title: "Ù…Ø®ÙŠÙ… ÙØ§Ø®Ø± ÙÙŠ Ù…Ø±Ø²ÙˆÙƒØ© â€” Ø¥Ù‚Ø§Ù…Ø© ÙÙŠ Ù‚Ù„Ø¨ Ø§Ù„ØµØ­Ø±Ø§Ø¡",
    description:
      "Ù…Ø®ÙŠÙ… ÙØ§Ø®Ø± Ø¹Ù„Ù‰ Ø§Ù„ÙƒØ«Ø¨Ø§Ù† Ø§Ù„Ø°Ù‡Ø¨ÙŠØ© ÙÙŠ Ù…Ø±Ø²ÙˆÙƒØ©: Ø®ÙŠØ§Ù… Ù…Ø±ÙŠØ­Ø©ØŒ Ø¹Ø´Ø§Ø¡ ØµØ­Ø±Ø§ÙˆÙŠØŒ ÙˆØ±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ Ø¹Ù†Ø¯ Ø§Ù„ÙØ¬Ø±. ØªØ¬Ø±Ø¨Ø© Ø³ÙŠØ§Ø­ÙŠØ© Ù…Ù…ÙŠØ²Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨.",
  },
  "/desert-tours": {
    title: "Ø¬ÙˆÙ„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø±Ø­Ù„Ø§Øª Ù…Ø±Ø²ÙˆÙƒØ©",
    description:
      "Ø¬ÙˆÙ„Ø§Øª ØµØ­Ø±Ø§ÙˆÙŠØ© Ù…Ù† Ù…Ø±Ø§ÙƒØ´ Ø¥Ù„Ù‰ Ù…Ø±Ø²ÙˆÙƒØ© ÙˆØ¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠ: Ø§Ù„ÙƒØ«Ø¨Ø§Ù† Ø§Ù„Ø±Ù…Ù„ÙŠØ©ØŒ Ø§Ù„Ù…Ø®ÙŠÙ…Ø§Øª Ø§Ù„ÙØ§Ø®Ø±Ø©ØŒ ÙˆØ±ØµØ¯ Ø§Ù„Ù†Ø¬ÙˆÙ… Ù…Ø¹ Ù…Ø±Ø´Ø¯ÙŠÙ† Ù…Ø­Ù„ÙŠÙŠÙ† Ù…Ø­ØªØ±ÙÙŠÙ†.",
  },
  "/camel-trekking": {
    title: "Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©",
    description:
      "ØªØ¬Ø±Ø¨Ø© Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ Ø¹Ø¨Ø± Ø§Ù„ÙƒØ«Ø¨Ø§Ù† Ø§Ù„Ø°Ù‡Ø¨ÙŠØ© ÙÙŠ Ù…Ø±Ø²ÙˆÙƒØ© ÙˆÙ‚Øª Ø§Ù„ØºØ±ÙˆØ¨ ÙˆØ§Ù„Ø¥Ø´Ø±Ø§Ù‚. Ø¬ÙˆÙ„Ø§Øª ØµØ­Ø±Ø§ÙˆÙŠØ© Ù…Ø±Ø´Ø¯Ø© Ù…Ù† Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø­Ù„ÙŠÙŠÙ†.",
  },
  "/4x4-tours": {
    title: "Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠ ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©",
    description:
      "Ù…ØºØ§Ù…Ø±Ø© Ø¨Ù…Ø±ÙƒØ¨Ø§Øª Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠ Ø¹Ø¨Ø± Ø§Ù„ÙƒØ«Ø¨Ø§Ù† ÙˆØ§Ù„Ù‚ØµØ¨Ø§Øª Ø§Ù„Ø¬Ø¨Ù„ÙŠØ© ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©. Ø¬ÙˆÙ„Ø© Ø³ÙŠØ§Ø­ÙŠØ© Ù…Ù…ÙŠØ²Ø© ÙÙŠ Ù‚Ù„Ø¨ Ø§Ù„ØµØ­Ø±Ø§Ø¡.",
  },
  "/marrakech-tours": {
    title: "Ø¬ÙˆÙ„Ø§Øª Ù…Ø±Ø§ÙƒØ´ â€” Ø±Ø­Ù„Ø§Øª ÙŠÙˆÙ…ÙŠØ© ÙˆØ¬ÙˆØ§Ù‡Ø±",
    description:
      "Ø§ÙƒØªØ´Ù Ù…Ø±Ø§ÙƒØ´: Ø§Ù„Ø£Ø³ÙˆØ§Ù‚ØŒ Ø§Ù„Ù‚ØµÙˆØ±ØŒ Ø§Ù„Ù‚ØµØ¨Ø§ØªØŒ Ø¬Ø¨Ø§Ù„ Ø§Ù„Ø£Ø·Ù„Ø³ØŒ ÙˆØ´Ù„Ø§Ù„Ø§Øª Ø£ÙˆØ²ÙˆØ¯. Ø¬ÙˆÙ„Ø§Øª Ø®Ø§ØµØ© Ø¨Ø£ÙŠØ¯ÙŠ Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø­Ù„ÙŠÙŠÙ† ÙÙŠ Ø§Ù„Ù…Ø¯ÙŠÙ†Ø© Ø§Ù„Ø­Ù…Ø±Ø§Ø¡.",
  },
  "/fes-tours": {
    title: "Ø¬ÙˆÙ„Ø§Øª ÙØ§Ø³ â€” Ø§Ù„Ù…Ø¯ÙŠÙ†Ø© Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©",
    description:
      "Ø§Ø³ØªÙƒØ´Ù ÙØ§Ø³ Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø©ØŒ Ù…ÙƒÙ†Ø§Ø³ØŒ ÙˆØ´ÙØ´Ø§ÙˆÙ† ÙÙŠ Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ Ø§Ù„ØªØ§Ø±ÙŠØ®ÙŠØ©. ØªØ¬Ø±Ø¨Ø© Ø£ØµÙŠÙ„Ø© ÙÙŠ Ø£Ø¹Ø±Ù‚ Ø§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨.",
  },
  "/day-trips": {
    title: "Ø±Ø­Ù„Ø§Øª ÙŠÙˆÙ…ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ù…Ø±Ø§ÙƒØ´ ÙˆÙØ§Ø³",
    description:
      "Ø±Ø­Ù„Ø§Øª ÙŠÙˆÙ…ÙŠØ© Ù‚ØµÙŠØ±Ø©: Ù…Ù† Ù…Ø±Ø§ÙƒØ´ Ø¥Ù„Ù‰ Ø´Ù„Ø§Ù„Ø§Øª Ø£ÙˆØ²ÙˆØ¯ ÙˆØ§Ù„Ø£Ø·Ù„Ø³ØŒ Ø£Ùˆ Ù…Ù† ÙØ§Ø³ Ø¥Ù„Ù‰ Ø§Ù„ØµØ­Ø±Ø§Ø¡. Ø¬ÙˆÙ„Ø§Øª Ø®Ø§ØµØ© Ø¨Ù…Ø±Ø´Ø¯ÙŠÙ† Ø®Ø¨Ø±Ø§Ø¡.",
  },
  "/merzouga-guide": {
    title: "Ø¯Ù„ÙŠÙ„ Ù…Ø±Ø²ÙˆÙƒØ© â€” Ø¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠ ÙˆÙ…Ø®ÙŠÙ…Ø§Øª ÙØ§Ø®Ø±Ø©",
    description:
      "Ø§Ù„Ù…Ø±Ø¬Ø¹ Ø§Ù„ÙƒØ§Ù…Ù„ Ù„Ù„Ø³ÙØ± Ø¥Ù„Ù‰ Ù…Ø±Ø²ÙˆÙƒØ©: ÙƒØ«Ø¨Ø§Ù† Ø¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠØŒ Ø§Ù„Ù…Ø®ÙŠÙ…Ø§Øª Ø§Ù„ÙØ§Ø®Ø±Ø©ØŒ Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ØŒ ÙˆØ±ØµØ¯ Ø§Ù„Ù†Ø¬ÙˆÙ… Ù„ØªØ®Ø·ÙŠØ· Ø±Ø­Ù„ØªÙƒ Ø§Ù„ØµØ­Ø±Ø§ÙˆÙŠØ©.",
  },
  "/trip-builder": {
    title: "Ù…Ø®Ø·Ø· Ø±Ø­Ù„Ø© Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø¬ÙˆÙ„Ø© Ù…Ø®ØµØµØ©",
    description:
      "ØµÙ…Ù‘Ù… Ø¬ÙˆÙ„ØªÙƒ Ø§Ù„Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨: Ù…Ø±Ø§ÙƒØ´ØŒ ÙØ§Ø³ØŒ Ù…Ø±Ø²ÙˆÙƒØ©ØŒ ÙˆØ¬Ø¨Ø§Ù„ Ø§Ù„Ø£Ø·Ù„Ø³. ØªØ®Ø·ÙŠØ· Ù…Ø®ØµØµ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ Ù…Ø¹ ÙØ±ÙŠÙ‚Ù†Ø§ Ø§Ù„Ù…Ø­Ù„ÙŠ Ø§Ù„Ø®Ø¨ÙŠØ±.",
  },
  "/tours/3-day-sahara-marrakech": {
    title: "Ø±Ø­Ù„Ø© 3 Ø£ÙŠØ§Ù… Ø¥Ù„Ù‰ Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ù…Ù† Ù…Ø±Ø§ÙƒØ´",
    description:
      "Ø£Ø¬Ù…Ù„ Ø±Ø­Ù„Ø© Ù…Ù† Ù…Ø±Ø§ÙƒØ´ Ø¥Ù„Ù‰ Ø§Ù„ØµØ­Ø±Ø§Ø¡: Ø¹Ø¨ÙˆØ± Ø¬Ø¨Ø§Ù„ Ø§Ù„Ø£Ø·Ù„Ø³ØŒ Ø¢ÙŠØª Ø¨Ù† Ø­Ø¯Ù‘ÙˆØŒ ÙˆØ§Ù„Ù…Ø¨ÙŠØª ÙÙŠ Ù…Ø®ÙŠÙ… ÙØ§Ø®Ø± ØªØ­Øª Ù†Ø¬ÙˆÙ… Ù…Ø±Ø²ÙˆÙƒØ©.",
  },
  "/tours/5-day-imperial-cities": {
    title: "Ø±Ø­Ù„Ø© 5 Ø£ÙŠØ§Ù… Ø¹Ø¨Ø± Ø§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© ÙˆØ§Ù„ØµØ­Ø±Ø§Ø¡",
    description:
      "Ø§Ø³ØªÙƒØ´Ù Ù…Ø±Ø§ÙƒØ´ØŒ Ù…ÙƒÙ†Ø§Ø³ØŒ ÙØ§Ø³ØŒ ÙˆØ´ÙØ´Ø§ÙˆÙ† Ù‚Ø¨Ù„ Ù„ÙŠÙ„Ø© ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡. Ù…Ø²ÙŠØ¬ Ù…Ù† Ø§Ù„ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠ ÙˆØ³Ø­Ø± Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙÙŠ 5 Ø£ÙŠØ§Ù….",
  },
  "/tours/7-day-imperial-cities-sahara-escape": {
    title: "Ø±Ø­Ù„Ø© 7 Ø£ÙŠØ§Ù… Ø¹Ø¨Ø± Ø§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© ÙˆØ§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©",
    description:
      "Ø£ÙØ¶Ù„ Ù…Ø§ ÙŠÙ‚Ø¯Ù…Ù‡ Ø§Ù„Ù…ØºØ±Ø¨: Ø¬Ø¨Ø§Ù„ Ø§Ù„Ø£Ø·Ù„Ø³ØŒ ÙˆØ§Ø¯ÙŠ Ø¯Ø§Ø¯Ø³ØŒ Ø¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠØŒ Ø§Ù„Ù…Ø®ÙŠÙ… Ø§Ù„ÙØ§Ø®Ø±ØŒ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© ÙÙŠ Ø¬ÙˆÙ„Ø© Ø®Ø§ØµØ© Ù„Ø£Ø³Ø¨ÙˆØ¹.",
  },
  "/tours/honeymoon-morocco": {
    title: "Ø´Ù‡Ø± Ø§Ù„Ø¹Ø³Ù„ ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø±Ø­Ù„Ø© ÙØ§Ø®Ø±Ø© 10 Ø£ÙŠØ§Ù…",
    description:
      "Ø´Ù‡Ø± Ø¹Ø³Ù„ Ø±Ø§Ù‚Ù: ØºØ±Ù ÙØ§Ø®Ø±Ø©ØŒ Ø¹Ø´Ø§Ø¡ Ø¹Ù„Ù‰ Ø¶ÙˆØ¡ Ø§Ù„Ø´Ù…ÙˆØ¹ ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡ØŒ ÙˆØ±Ø­Ù„Ø© Ù…Ù†Ø·Ø§Ø¯ Ø§Ù„Ù‡ÙˆØ§Ø¡ØŒ ÙˆØ­Ù…Ù‘Ø§Ù… ØªÙ‚Ù„ÙŠØ¯ÙŠ. ØªØ¬Ø±Ø¨Ø© Ù…Ù…ÙŠØ²Ø© Ù„Ù„Ø£Ø²ÙˆØ§Ø¬.",
  },
  "/tours/8-day-marrakech-essaouira-agadir-sahara": {
    title: "Ø±Ø­Ù„Ø© 8 Ø£ÙŠØ§Ù…: Ù…Ø±Ø§ÙƒØ´ ÙˆØ§Ù„ØµÙˆÙŠØ±Ø© ÙˆØ£ÙƒØ§Ø¯ÙŠØ± ÙˆØ§Ù„ØµØ­Ø±Ø§Ø¡",
    description:
      "Ø¬ÙˆÙ„Ø© ÙƒØ¨Ø±Ù‰ Ø¹Ø¨Ø± Ø¬Ù†ÙˆØ¨ Ø§Ù„Ù…ØºØ±Ø¨: Ù‚ØµÙˆØ± Ù…Ø±Ø§ÙƒØ´ØŒ Ø³Ø§Ø­Ù„ Ø§Ù„ØµÙˆÙŠØ±Ø©ØŒ Ø«Ù… Ù„ÙŠÙ„Ø© ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡. Ø±Ø­Ù„Ø© ÙØ§Ø®Ø±Ø© Ø´Ø§Ù…Ù„Ø© Ù„Ø£Ø¬Ù…Ù„ ÙˆØ¬Ù‡Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨.",
  },
  "/tours/family-morocco-adventure": {
    title: "Ù…ØºØ§Ù…Ø±Ø© Ø§Ù„Ø¹Ø§Ø¦Ù„Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø¬ÙˆÙ„Ø© 9 Ø£ÙŠØ§Ù…",
    description:
      "Ø§Ù„Ù…ØºØ±Ø¨ ÙŠØ£Ø³Ø± Ø§Ù„Ø£Ø·ÙØ§Ù„ ÙˆØ§Ù„ÙƒØ¨Ø§Ø±: Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡ØŒ ÙˆØ§Ù„Ù‚ØµØ¨Ø§ØªØŒ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©. Ø¬ÙˆÙ„Ø© Ø¹Ø§Ø¦Ù„ÙŠØ© Ù…Ù…ØªØ¹Ø© ÙˆØ¢Ù…Ù†Ø©.",
  },
};

/**
 * Resolve route meta for a specific language.
 * The Arabic (/ar) locale has dedicated, keyword-rich metadata
 * (AR_ROUTE_META). All other locales resolve the canonical English metadata
 * (translated UI copy lives in the i18n dictionaries, but page SEO titles and
 * meta descriptions intentionally stay English so they remain consistent with
 * the source-of-truth SEO content and are not machine-translated).
 */
export function getLocalizedRouteMeta(rest: string, lang?: string): RouteMeta {
  const en = getRouteMeta(rest);
  if (!lang || lang === "en" || lang !== "ar") return en;
  const key = arKey(rest);
  return AR_ROUTE_META[key] ?? en;
}