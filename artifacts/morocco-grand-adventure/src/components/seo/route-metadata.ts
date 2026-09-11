/** Per-route SEO metadata. Keep this file as the single source of truth for runtime/prerendered route metadata. */
export type RouteMeta = { title: string; description: string; ogImage?: string };

// Import the catalog's canonical alt text so OG image alt descriptions stay in
// sync with the actual subject of every shared image (catalog photos included).
import { catalogImage } from '@/data/imageCatalog';

const BRAND = 'Morocco Grand Adventure';

// Conservative conditional brand suffix (SEO Phase 1).
// "PRIMARY TOPIC → INTENT / LOCATION → BRAND when there is room":
// - append " — Morocco Grand Adventure" only when the core title is short
//   enough (≤ SUFFIX_CORE_BUDGET chars) that the suffixed title stays concise;
// - never append when the core already contains the brand or a locale
//   equivalent of "Morocco" (avoids "… Morocco — Morocco Grand Adventure");
// - never truncate or shorten a core title to force the brand in.
const MOROCCO_TERM = /morocco|maroc|marruecos|marokko|marrocos|摩洛哥|モロッコ|모로코|المغرب/i;
const SUFFIX_CORE_BUDGET = 35;
export function withBrandSuffix(core: string): string {
  const title = core.replace(/\s+/g, ' ').trim();
  if (!title) return BRAND;
  if (title.includes(BRAND)) return title;
  if (MOROCCO_TERM.test(title)) return title;
  if (title.length > SUFFIX_CORE_BUDGET) return title;
  return `${title} — ${BRAND}`;
}

export const HOME_META: RouteMeta = {
  title: 'Morocco Tours & Private Sahara Desert Trips',
  description: 'Tailored private Morocco tours by local Sahara guides — desert trips from Marrakech and Fes, Merzouga luxury camps, imperial cities and the Atlas.',
  ogImage: '/images/hero/desert-pano.jpg',
};
export const FR_HOME_META: RouteMeta = {
  title: 'Voyage sur mesure au Maroc — Circuits privés & Sahara',
  description: "Créez votre circuit privé au Maroc avec une agence locale : Merzouga, dunes d'Erg Chebbi, camp de luxe, Marrakech, Fès et l'Atlas. Devis personnalisé.",
  ogImage: '/images/hero/desert-pano.jpg',
};

const TOUR_META: Record<string, RouteMeta> = {
  '3-day-sahara-marrakech': { title: '3-Day Luxury Sahara Tour from Marrakech', description: "Cross the Atlas Mountains, explore Aït Ben Haddou and sleep under Saharan stars in a luxury desert camp.", ogImage: '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp' },
  '3-day-sahara-fes': { title: '3-Day Private Sahara Route from Fes | Morocco', description: 'A quote-only three-day private route from Fes toward Merzouga and Erg Chebbi, with transparent travel expectations and no invented price.', ogImage: '/images/dest/erg-chebbi.webp' },
  '3-day-sahara-agadir': { title: '3-Day Private Sahara Route from Agadir | Morocco', description: 'A quote-only three-day private route from Agadir toward Merzouga and Erg Chebbi, with transparent itinerary planning and confirmed payment terms.', ogImage: '/images/dest/agadir.webp' },
  '5-day-imperial-cities': { title: '5-Day Imperial Cities & Desert Morocco Tour', description: 'Explore Marrakech, Meknès, Fes and Chefchaouen before a night in the Sahara on a private Morocco tour.', ogImage: '/images/curated/ait-ben-haddou-kasbah-sunrise-ouarzazate.webp' },
  '7-day-imperial-cities-sahara-escape': { title: '7-Day Imperial Cities & Sahara Escape — Grand Morocco Tour', description: 'A private Morocco journey through the High Atlas, Aït Ben Haddou, Dades Valley, Erg Chebbi and imperial Fes.', ogImage: '/images/curated/ait-ben-haddou-bridge-town-unesco-morocco.webp' },
  'honeymoon-morocco': { title: 'Romantic Morocco Honeymoon — 10 Day Luxury Private Tour', description: 'A romantic private Morocco journey combining cities, desert experiences and time designed for couples.', ogImage: '/images/curated/couple-blue-steps-chefchaouen-medina.webp' },
  '8-day-marrakech-essaouira-agadir-sahara': { title: '8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure', description: 'Eight private days from Marrakech to Essaouira and Agadir, across the Atlas to Aït Ben Haddou and Erg Chebbi — camel trek and a night in a desert camp.', ogImage: '/images/curated/todra-gorge-river-canyon-high-atlas.webp' },
  'family-morocco-adventure': { title: 'Family Morocco Adventure — 9-Day Private & Kid-Friendly Tour', description: 'A 9-day private family tour of Morocco — Marrakech, an Atlas mule ride, a Sahara camel trek and kasbahs, with a relaxed pace designed for kids and parents.', ogImage: '/images/curated/cascading-waterfall-todra-gorge.webp' },
  '2-day-zagora-desert-marrakech': { title: '2-Day Zagora Desert Tour from Marrakech | Morocco', description: 'A private two-day route from Marrakech through Aït Ben Haddou, Ouarzazate and the Draa Valley to Zagora.', ogImage: '/images/curated/ancient-water-channels-olive-groves-morocco.webp' },
  '4-day-marrakech-merzouga-sahara': { title: '4-Day Marrakech to Merzouga Sahara Tour | Morocco', description: 'Take four days from Marrakech to Merzouga via Aït Ben Haddou, Dades and Todra, with more time around Erg Chebbi.', ogImage: '/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp' },
  '5-day-great-south-morocco': { title: '5-Day Great South Morocco Tour | Private Desert Journey', description: 'Explore Aït Ben Haddou, Dades, Todra, Merzouga and the Draa Valley on a private five-day southern Morocco route.', ogImage: '/images/dest/draa-valley.webp' },
  '3-day-fes-merzouga-sahara': { title: '3-Day Fes to Merzouga Sahara Desert Tour | Morocco', description: 'Travel privately from Fes through the Middle Atlas and Ziz Valley to Merzouga and Erg Chebbi.', ogImage: '/images/catalog/sahara-bivouac-stars-merzouga.webp' },
  '4-day-fes-marrakech-via-merzouga': { title: '4-Day Fes to Marrakech via Merzouga | Morocco Tour', description: 'A private one-way journey from Fes to Marrakech via Merzouga, Todra Gorge, Dades Valley and Aït Ben Haddou.', ogImage: '/images/dest/ait-ben-haddou.webp' },
  'fes-4-day': { title: '4-Day Fes to Merzouga Sahara Route', description: 'A private round trip from Fes to the Sahara across the Middle Atlas, the Ziz Valley and the dunes of Erg Chebbi.', ogImage: '/images/curated/tannery-workers-dyeing-pits-fes.webp' },
  'fes-5-day': { title: '5-Day Fes to Marrakech via Merzouga, Dades & the Atlas', description: 'A one-way private route from Fes to Marrakech through the Sahara, the gorges and the High Atlas.', ogImage: '/images/dest/dades-valley.webp' },
  'fes-8-day': { title: '8-Day Fes Imperial Cities & Sahara Grand Tour', description: 'A private eight-day journey from Fes through Meknès, Volubilis and the Sahara to a guided day in Marrakech.', ogImage: '/images/curated/chouara-tannery-overhead-fes-el-bali.webp' },
  'agadir-4-day': { title: '4-Day Agadir to Marrakech via Taroudant & the Atlas', description: 'A private route from Agadir to Marrakech through Taroudant, Ouarzazate and Aït Ben Haddou, with time to enjoy Marrakech.', ogImage: '/images/dest/agadir.webp' },
  'agadir-5-day': { title: '5-Day Agadir to Marrakech via Ouarzazate & Merzouga', description: 'A one-way private route from Agadir to Marrakech through the kasbahs, the gorges and the Erg Chebbi Sahara.', ogImage: '/images/catalog/berber-camel-guide-sahara-merzouga.webp' },
  'agadir-8-day': { title: '8-Day Agadir Southern Morocco Grand Circuit', description: 'A private eight-day loop from Agadir through Taroudant, Ouarzazate, the Sahara, the Draa Valley and Marrakech.', ogImage: '/images/dest/agadir.webp' },
  'marrakech-4-day': { title: '4-Day Marrakech to Merzouga Sahara Explorer', description: 'A private four-day loop from Marrakech to the Sahara, visiting Aït Ben Haddou, the Dades and Todra gorges and a night in the Erg Chebbi dunes.', ogImage: '/images/curated/tin-mal-mosque-pointed-arches-high-atlas.webp' },
  'casablanca-3-day': { title: '3-Day Casablanca to Fes via Rabat, Meknès & Volubilis', description: 'A private route from Casablanca through Rabat, the imperial city of Meknès, the Roman ruins of Volubilis and a guided day in Fes.', ogImage: '/images/curated/hassan-tower-mohammed-v-mausoleum-rabat.webp' },
  'casablanca-4-day': { title: '4-Day Casablanca to Fes via the Atlantic Coast & Chefchaouen', description: 'A relaxed private route from Casablanca to Fes along the Atlantic coast with Chefchaouen, Meknès and Volubilis.', ogImage: '/images/curated/hassan-ii-mosque-ornate-bronze-door-casablanca.webp' },
  'casablanca-5-day': { title: '5-Day Casablanca to Merzouga & Fes Desert Route', description: 'A private route from Casablanca to Fes and the Sahara, with a night in the Erg Chebbi dunes and a sunset camel trek.', ogImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp' },
  'casablanca-8-day': { title: '8-Day Casablanca Grand Morocco Circuit (Imperial Cities & Sahara)', description: 'A private eight-day loop from Casablanca through Rabat, Chefchaouen, Fes, the Sahara, the gorges and Marrakech.', ogImage: '/images/curated/hassan-ii-mosque-exterior-arches-golden-hour-casablanca.webp' },
};
const TOUR_ALIASES: Record<string,string> = {
  '3-days-marrakech-to-merzouga-desert-tour':'3-day-sahara-marrakech',
  '3-days-fes-to-marrakech-desert-tour':'5-day-imperial-cities',
  'merzouga-desert-tour':'3-day-sahara-marrakech',
  'morocco-desert-tour':'7-day-imperial-cities-sahara-escape',
  '2-days-marrakech-zagora-desert-tour':'2-day-zagora-desert-marrakech',
  '2-day-zagora-desert-tour':'2-day-zagora-desert-marrakech',
  '4-days-marrakech-to-merzouga-desert-tour':'4-day-marrakech-merzouga-sahara',
  '4-day-marrakech-merzouga-desert-tour':'4-day-marrakech-merzouga-sahara',
  '5-days-great-south-morocco-tour':'5-day-great-south-morocco',
  '5-day-great-south-morocco-tour':'5-day-great-south-morocco',
  '3-days-fes-to-merzouga-sahara-tour':'3-day-fes-merzouga-sahara',
  '3-day-fes-merzouga-desert-tour':'3-day-fes-merzouga-sahara',
  '4-days-fes-to-marrakech-via-merzouga':'4-day-fes-marrakech-via-merzouga',
  '4-day-fes-marrakech-merzouga-tour':'4-day-fes-marrakech-via-merzouga',
};

const DESTINATION_META: Record<string, RouteMeta> = {
  marrakech:{title:'Marrakech — Morocco Tours & Travel Guide',description:'Discover Marrakech, its medina, souks and major cultural sights. Plan your Morocco journey with local experts.',ogImage:'/images/dest/marrakech.jpg'},
  fes:{title:'Fes — Morocco Tours & Travel Guide',description:"Explore Fes, Morocco's cultural heart and its historic medina. Plan your Fes journey with local experts.",ogImage:'/images/dest/fes.jpg'},
  meknes:{title:'Meknès — Morocco Tours & Travel Guide',description:'Discover Meknès, an imperial city with historic gates, medina and nearby Volubilis.',ogImage:'/images/dest/meknes.jpg'},
  casablanca:{title:'Casablanca — Morocco Tours & Travel Guide',description:'Explore Casablanca, Hassan II Mosque and Morocco’s Atlantic gateway.',ogImage:'/images/dest/casablanca.jpg'},
  rabat:{title:'Rabat — Morocco Tours & Travel Guide',description:'Discover Rabat, Morocco’s capital, the Kasbah of the Oudayas and Hassan Tower.',ogImage:'/images/dest/rabat.jpg'},
  merzouga:{title:'Merzouga — Sahara Desert Tours & Travel Guide',description:'Explore Merzouga, gateway to Erg Chebbi, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  'erg-chebbi':{title:'Erg Chebbi — Sahara Desert Tours & Travel Guide',description:'Discover the Erg Chebbi dunes, camel trekking and desert experiences near Merzouga.',ogImage:'/images/dest/erg-chebbi.jpg'},
  ouarzazate:{title:'Ouarzazate — Morocco Tours & Travel Guide',description:'Explore Ouarzazate, kasbahs, film heritage and the gateway to southern Morocco.',ogImage:'/images/dest/ouarzazate.jpg'},
  'ait-ben-haddou':{title:'Aït Ben Haddou — UNESCO Morocco Tours Guide',description:'Visit Aït Ben Haddou, the historic earthen ksar and UNESCO World Heritage property.',ogImage:'/images/dest/ait-ben-haddou.jpg'},
  zagora:{title:'Zagora — Sahara Desert Tours & Travel Guide',description:'Discover Zagora and the Draa Valley in southern Morocco.',ogImage:'/images/dest/zagora.jpg'},
  'dades-valley':{title:'Dades Valley — Morocco Tours & Travel Guide',description:'Explore the Dades Valley, dramatic landscapes, kasbahs and mountain roads.',ogImage:'/images/dest/dades-valley.jpg'},
  'todra-gorge':{title:'Todra Gorge — Morocco Tours & Travel Guide',description:'Discover Todra Gorge and its dramatic canyon landscapes in southern Morocco.',ogImage:'/images/dest/todra-gorge.jpg'},
  skoura:{title:'Skoura Oasis — Morocco Tours & Travel Guide',description:'Explore the Skoura Oasis and its palm groves and historic kasbahs.',ogImage:'/images/dest/skoura.jpg'},
  'roses-valley':{title:'Valley of Roses — Morocco Tours & Travel Guide',description:'Discover Morocco’s Valley of Roses and its oasis landscapes.',ogImage:'/images/dest/roses-valley.jpg'},
  'draa-valley':{title:'Draa Valley — Morocco Tours & Travel Guide',description:'Explore the Draa Valley, palm groves, kasbahs and historic southern routes.',ogImage:'/images/dest/draa-valley.jpg'},
  chefchaouen:{title:'Chefchaouen — Morocco Tours & Travel Guide',description:'Discover Chefchaouen, the blue medina in Morocco’s Rif Mountains.',ogImage:'/images/dest/chefchaouen.jpg'},
  imlil:{title:'Imlil — Atlas Mountains Tours & Travel Guide',description:'Explore Imlil and the Atlas Mountains, Berber villages and trekking routes.',ogImage:'/images/dest/imlil.jpg'},
  'ourika-valley':{title:'Ourika Valley — Morocco Tours & Travel Guide',description:'Discover Ourika Valley, mountain landscapes and Berber villages near Marrakech.',ogImage:'/images/dest/ourika-valley.jpg'},
  ouzoud:{title:'Ouzoud Waterfalls — Morocco Tours & Travel Guide',description:'Visit Ouzoud Waterfalls and explore the surrounding Middle Atlas landscapes.',ogImage:'/images/dest/ouzoud.jpg'},
  ifrane:{title:'Ifrane & Cedar Forest — Morocco Tours & Travel Guide',description:'Discover Ifrane and the cedar forests of Morocco’s Middle Atlas.',ogImage:'/images/dest/ifrane.jpg'},
  essaouira:{title:'Essaouira — Morocco Tours & Travel Guide',description:'Explore Essaouira, its Atlantic medina, harbour and coastal atmosphere.',ogImage:'/images/dest/essaouira.jpg'},
  agadir:{title:'Agadir — Morocco Tours & Travel Guide',description:'Discover Agadir, its Atlantic coast and beaches in southern Morocco.',ogImage:'/images/dest/agadir.jpg'},
  taghazout:{title:'Taghazout — Morocco Surf Tours & Travel Guide',description:'Explore Taghazout and Morocco’s Atlantic surf coast.',ogImage:'/images/dest/taghazout.jpg'},
  legzira:{title:'Legzira Beach — Morocco Tours & Travel Guide',description:'Discover Legzira and its dramatic Atlantic coastline.',ogImage:'/images/dest/legzira.jpg'},
  'el-jadida':{title:'El Jadida — Morocco Tours & Travel Guide',description:'Explore El Jadida and its historic Portuguese heritage on the Atlantic coast.',ogImage:'/images/dest/el-jadida.jpg'},
  tangier:{title:'Tangier — Morocco Tours & Travel Guide',description:'Discover Tangier, Morocco’s northern gateway between the Atlantic and Mediterranean.',ogImage:'/images/dest/tangier.jpg'},
  tetouan:{title:'Tétouan — Morocco Tours & Travel Guide',description:'Explore Tétouan and its historic white medina in northern Morocco.',ogImage:'/images/dest/tetouan.jpg'},
  akchour:{title:'Akchour & God’s Bridge — Morocco Tours & Travel Guide',description:'Discover Akchour’s waterfalls, pools and mountain landscapes near Chefchaouen.',ogImage:'/images/dest/akchour.jpg'},
  nkob:{title:'Nkob — Morocco Tours & Travel Guide',description:'Explore Nkob and the kasbah landscapes of the Jbel Saghro.',ogImage:'/images/dest/nkob.jpg'},
  mirleft:{title:'Mirleft — Morocco Surf Tours & Travel Guide',description:'Discover Mirleft and Morocco’s wild Atlantic coastline.',ogImage:'/images/dest/mirleft.jpg'},
};

export const routeMetadata: Record<string, RouteMeta> = {
  '/':HOME_META,
  // City-tour landing hubs — previously fell through to HOME_META, which made
  // these routes duplicate the homepage title in all 11 locales (SEO Phase 1).
  '/agadir-tours':{title:'Agadir, Morocco — Private Sahara Tours & Day Trips',description:'Private tours from Agadir to the Sahara, Paradise Valley and the Atlantic coast — flexible itineraries with local guides and transparent pricing.',ogImage:'/images/dest/agadir.jpg'},
  '/casablanca-tours':{title:'Casablanca, Morocco — Tours to Fes, Rabat & Sahara',description:'Private tours from Casablanca to Fes, Rabat, Chefchaouen and the Sahara — airport pickup, flexible pacing and local expert guides.',ogImage:'/images/dest/casablanca.jpg'},
  '/destinations':{title:'Morocco Destinations — Sahara, Imperial Cities, Atlas Mountains',description:'Explore Morocco’s top destinations including Marrakech, Fes, Merzouga, Chefchaouen, the Atlas Mountains and Atlantic coast.',ogImage:'/images/dest/merzouga.jpg'},
  '/tours':{title:'Morocco Tours & Private Itineraries — 3 to 10 Day Adventures',description:'Browse private Morocco tours, Sahara journeys, imperial cities, family adventures and honeymoon itineraries.',ogImage:'/images/tours/7-day-grand-morocco.jpg'},
  '/tours/from-marrakech':{title:'Tours From Marrakech — Private Sahara & Morocco Tours',description:'Private Morocco tours departing Marrakech, including Sahara and southern Morocco routes.',ogImage:'/images/dest/marrakech.jpg'},
  '/tours/from-casablanca':{title:'Tours From Casablanca — Private Morocco Itineraries',description:'Plan a private Morocco itinerary starting in Casablanca.',ogImage:'/images/dest/casablanca.jpg'},
  '/tours/from-fes':{title:'Tours From Fes — Private Morocco & Sahara Tours',description:'Private tours from Fes including imperial cities, Chefchaouen and Sahara routes.',ogImage:'/images/dest/fes.jpg'},
  '/tours/from-agadir':{title:'Tours From Agadir — Coast & Sahara Private Tours',description:'Private Morocco journeys starting in Agadir and exploring the Atlantic coast and south.',ogImage:'/images/dest/agadir.jpg'},
  '/tours/from-marrakech/3-days':{title:'3-Day Tours From Marrakech — Sahara Desert & Merzouga',description:'Explore the High Atlas, Aït Ben Haddou, Dades Valley and Merzouga on a three-day route.',ogImage:'/images/dest/marrakech.jpg'},
  '/gallery':{title:'Morocco Photo & Video Gallery — Sahara & Morocco',description:'Photos and videos from Morocco’s Sahara, medinas, mountains and desert camps.',ogImage:'/images/hero/medina-pano.jpg'},
  '/trip-builder':{title:'Build Your Morocco Itinerary — Custom Trip Planner',description:'Plan a bespoke Morocco itinerary in minutes: pick your dates, departure city, trip length and interests, then request a personalised quote from our local team.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/build-your-day-trip':{title:'Build Your Day Trip in Morocco — One-Day Experiences',description:'Plan a personalized one-day Morocco experience with same-day return. Choose your departure, destination, date and preferences.',ogImage:'/images/dest/ouzoud.jpg'},
  '/about':{title:'About Us | Morocco, Beyond the Journey',description:'Meet Morocco Grand Adventure — desert guides from Merzouga sharing the whole of Morocco through private, locally-designed journeys.',ogImage:'/images/about/about-dune-1600.webp'},
  '/contact':{title:'Contact Morocco Grand Adventure — Plan Your Morocco Journey',description:'Contact Morocco Grand Adventure by WhatsApp, email or phone to plan your Morocco journey.',ogImage:'/images/dest/merzouga.jpg'},
  '/desert-tours':{title:'Sahara Desert Tours — Merzouga, Erg Chebbi & Camps',description:'Explore the Sahara with Merzouga desert tours, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  '/luxury-camp':{title:'Luxury Desert Camp Morocco — Sahara Glamping',description:'What a luxury desert camp near Merzouga includes — private tents with real beds, en-suite bathrooms, camp dinners under the stars and how to book a night.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/camel-trekking':{title:'Camel Trekking Merzouga — Sahara Camel Rides',description:'Ride camels across the golden dunes of Erg Chebbi with local guides — what a sunset trek involves, what to wear, and how the camp night that follows works.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  '/4x4-tours':{title:'4x4 Desert Tours Morocco — Sahara Off-Road Adventures',description:'Explore Erg Chebbi and the Sahara by 4x4 with local guides — dune driving, oasis and nomad stops around Merzouga, and what a half- or full-day tour covers.',ogImage:'/images/dest/erg-chebbi.jpg'},
  '/marrakech-tours':{title:'Marrakech Tours — Private Day Trips & Morocco Tours',description:'Discover Marrakech and private journeys into the Atlas and southern Morocco.',ogImage:'/images/dest/marrakech.jpg'},
  '/fes-tours':{title:'Fes Tours — Private Guided Morocco Tours',description:'Explore Fes, Chefchaouen and northern Morocco with local guides — Middle Atlas crossings, Ziz Valley drives and private routes from Fes toward Merzouga.',ogImage:'/images/dest/fes.jpg'},
  '/day-trips':{title:'Morocco Day Trips — Personalized One-Day Experiences',description:'Explore Morocco on a one-day experience with same-day return. Request a personalized route and quote.',ogImage:'/images/dest/ouzoud.jpg'},
  '/merzouga-guide':{title:'Merzouga Travel Guide — Sahara Desert & Erg Chebbi',description:'A practical guide to Merzouga, Erg Chebbi, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  '/travel-info':{title:'Morocco Travel Information — Practical Guides from Locals',description:'Practical Morocco travel information from a local team — when to go, what to pack and how to get around.',ogImage:'/images/catalog/draa-valley-oasis-palm-grove.webp'},
  '/travel-info/best-time-to-visit-morocco':{title:'Best Time to Visit Morocco — Season-by-Season Guide',description:'When to visit Morocco: spring and autumn for most regions, how summer and winter differ between the coast, mountains and Sahara.',ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/travel-info/what-to-pack-morocco':{title:'What to Pack for Morocco — Practical Packing List',description:'A realistic Morocco packing list: layers for cold desert nights, sun protection, footwear for medinas and dunes.',ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/travel-info/getting-around-morocco':{title:'Getting Around Morocco — Transport Options Explained',description:'Trains, buses and private drivers in Morocco — realistic driving times between Marrakech, Fes and the Sahara.',ogImage:'/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp'},
  '/faq':{title:'Morocco Travel FAQ — Questions About Tours & Travel',description:'Answers to common Morocco travel, desert tour, packing and booking questions.',ogImage:'/images/dest/merzouga.jpg'},
    '/blog':{title:'Morocco Travel Blog — Guides, Tips & Inspiration',description:'Morocco travel guides and practical advice from local Sahara specialists.',ogImage:'/images/hero/desert-pano.jpg'},
  '/merzouga-guide/camel-trekking':{title:'Camel Trekking in Merzouga — Sahara Rides at Erg Chebbi',description:"What to expect on a camel trek near Merzouga — timing, what to wear, mounting tips and what happens at camp.",ogImage:'/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp'},
  '/merzouga-guide/desert-camps':{title:'Merzouga Desert Camps — Standard vs Luxury Guide',description:"Choose a desert camp in the Erg Chebbi dunes — tents, bathrooms, meals and what a night in camp includes.",ogImage:'/images/curated/sahara-desert-camp-starry-night-lantern-merzouga.webp'},
  '/merzouga-guide/luxury-desert-camps':{title:'Luxury Desert Camps Merzouga — What You Get',description:"Real look at luxury Sahara camps near Merzouga — en-suite tents, real beds, hot showers and what makes the step up worthwhile.",ogImage:'/images/personal/luxury-camp-dusk.webp'},
  '/merzouga-guide/best-time-to-visit':{title:'Best Time to Visit Merzouga — Month-by-Month Guide',description:"When to visit Merzouga for the Sahara — temperatures, crowds and the best months for camel trekking and camps.",ogImage:'/images/dest/merzouga.webp'},
  '/merzouga-guide/how-to-get-there':{title:'How to Get to Merzouga — From Marrakech & Fes',description:"Realistic driving times and transport options from Marrakech, Fes, Ouarzazate and Agadir to Merzouga and Erg Chebbi.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/merzouga-guide/erg-chebbi':{title:'Erg Chebbi Dunes — Morocco’s Tallest Sand Dunes',description:"About Erg Chebbi near Merzouga — why these dunes formed, how high they are and what to do on them.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/merzouga-guide/what-to-pack':{title:'What to Pack for Merzouga — Sahara Packing List',description:"Practical packing list for a Merzouga desert night — layers, sun protection, footwear and what NOT to bring.",ogImage:'/images/hero/desert-pano.webp'},
  '/merzouga-guide/faq':{title:'Merzouga FAQ — Sahara Questions Answered',description:"Straight answers to the most common Merzouga and Sahara questions — planning, getting there and camp nights.",ogImage:'/images/dest/merzouga.webp'},
  '/merzouga-guide/quad-biking':{title:'Quad Biking Merzouga — Sahara Quad Bike Tours at Erg Chebbi',description:"What quad biking in Merzouga is really like — the Erg Chebbi terrain, what to wear, when to ride and how a session fits around camel trekking and a camp night.",ogImage:'/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp'},
  '/merzouga-guide/4x4-desert-tour':{title:'Merzouga 4x4 Desert Tour — Dune Driving at Erg Chebbi',description:"What a 4x4 desert tour around Merzouga and Erg Chebbi involves — dune driving, the landscapes beyond the village, cultural stops and practical expectations.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/merzouga-guide/things-to-do':{title:'Things to Do in Merzouga — Camel Treks, Quads, 4x4s & Camps',description:"All the things to do in Merzouga in one place — camel trekking on Erg Chebbi, quad biking, 4x4 tours, luxury camps, sunrise spots and how to combine them.",ogImage:'/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp'},
  '/merzouga-guide/marrakech-to-merzouga':{title:'Marrakech to Merzouga — Route, Stops & Itinerary Guide',description:"How to get from Marrakech to Merzouga — the High Atlas crossing, Aït Ben Haddou, Dades Valley, Todra Gorge and Erg Chebbi, with 3- and 4-day itinerary guidance.",ogImage:'/images/dest/ait-ben-haddou.webp'},
  '/merzouga-guide/fes-to-merzouga':{title:'Fes to Merzouga — Route Guide & Desert Itinerary',description:"Fes to Merzouga route guide — Ifrane, the Middle Atlas cedar forests, Midelt, the Ziz Valley and Erg Chebbi, with realistic planning.",ogImage:'/images/dest/ifrane.webp'},
  '/merzouga-guide/how-many-days':{title:'How Many Days in the Sahara? — Merzouga Trip Length Guide',description:"How many days you need in the Sahara and Merzouga — an honest comparison of 1, 2, 3 and 4+ day desert trips and what each length realistically covers.",ogImage:'/images/dest/merzouga.webp'},
  '/merzouga-guide/sahara-desert-guide':{title:'Sahara Desert Travel Guide — Morocco Desert Trips & Erg Chebbi',description:"The complete Morocco Sahara guide — Erg Chebbi, Merzouga, camel trekking, desert camps, quad and 4x4 experiences, and how Marrakech and Fes reach the dunes.",ogImage:'/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp'},
  '/merzouga-guide/erg-chebbi-sunrise-sunset':{title:'Erg Chebbi Sunrise & Sunset — Best Light on the Sahara Dunes',description:"When and where to see the best sunrise and sunset at Erg Chebbi near Merzouga — seasonal timings, photography notes and how treks and camp nights fit the light.",ogImage:'/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp'},
  '/comparisons/marrakech-vs-fes':{title:'Marrakech vs Fes — Which Is Better for a Sahara Desert Tour?',description:"Marrakech or Fes for your Sahara desert tour? Route character, landscapes, major stops and itinerary shapes compared honestly — choose by itinerary, not hype.",ogImage:'/images/dest/marrakech.webp'},
  '/comparisons/merzouga-vs-zagora':{title:'Merzouga vs Zagora — Which Sahara Base to Choose?',description:"Dunes, access and crowd levels compared for the two main Sahara gateways — and which journey suits each.",ogImage:'/images/dest/zagora.webp'},
  '/comparisons/erg-chebbi-vs-erg-chigaga':{title:'Erg Chebbi vs Erg Chigaga — Which Sahara Dunes?',description:"Tall iconic dunes versus wider, quieter dunes — a factual comparison of Morocco’s two Sahara ergs.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/comparisons/2-day-vs-3-day-sahara-tour':{title:'2-Day vs 3-Day Sahara Tour — Which Fits?',description:"What a 2-day and a 3-day Sahara tour cover, the realistic timing and which suits a tight or relaxed trip.",ogImage:'/images/dest/merzouga.webp'},
  '/comparisons/private-vs-shared-tour':{title:'Private vs Shared Morocco Tour — Trade-offs',description:"Price, schedule, group size and comfort compared so you can pick the right Morocco trip style.",ogImage:'/images/curated/berber-guide-camel-sahara-desert-merzouga.webp'},
  '/comparisons/luxury-camp-vs-standard-camp':{title:'Luxury Camp vs Standard Camp — Desert Night',description:"Same desert night, different tent and bathroom — how to choose the right Merzouga camp for your budget.",ogImage:'/images/personal/luxury-camp-dusk.webp'},
};

export const BLOG_META: Record<string,RouteMeta> = {
  'merzouga-luxury-desert-camp-guide':{title:'Merzouga Luxury Desert Camp Guide — Sahara Glamping',description:'Plan your Merzouga luxury desert camp stay: tent types, what a night includes, camel treks, best season and how to book your Sahara night.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  'best-time-to-visit-morocco-sahara':{title:'Best Time to Visit the Sahara Desert — Guide',description:'When to visit the Moroccan Sahara — month-by-month temperatures, crowds, sandstorm risk and the best months for camel trekking and camp nights.',ogImage:'/images/dest/merzouga.jpg'},
  'camel-trekking-etiquette-morocco':{title:'Camel Trekking in Morocco — What to Expect',description:'What first-time travelers should know before a camel trek in Morocco — mounting, pacing, what to wear and how to photograph without spooking the animals.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  'marrakech-to-merzouga-roadtrip':{title:'Marrakech to Merzouga — Sahara Road Trip Guide',description:'A practical guide to the Marrakech to Merzouga route, stops and travel planning.',ogImage:'/images/dest/ait-ben-haddou.jpg'},
  'morocco-packing-list-desert':{title:'Morocco Desert Packing List — What to Bring',description:'Practical essentials to pack for a Morocco Sahara trip — layers for cold desert nights, sun protection, dune-ready footwear, and what not to bring to camp.',ogImage:'/images/hero/desert-pano.jpg'},
  'fes-chefchaouen-blue-city-guide':{title:'Fes to Chefchaouen — Morocco Blue City Guide',description:'Plan a journey from Fes to Chefchaouen and explore Morocco’s blue medina.',ogImage:'/images/dest/chefchaouen.jpg'},
};

// MGA_MISSING_TOURS_V1

export function getRouteMeta(rest:string):RouteMeta {
  const normalized = rest === '' || rest === '/' ? '/' : rest.replace(/\/$/,'');
  if (routeMetadata[normalized]) return routeMetadata[normalized];
  const duration = normalized.match(/^\/tours\/from-([^/]+)\/(\d+)-?days?$/);
  if (duration) {
    const cityLabel = duration[1][0].toUpperCase() + duration[1].slice(1);
    const daysLabel = `${duration[2]}-Day`;
    // OG image must reflect the *departure city*, not a blanket Merzouga default.
    // Reuse each city's canonical destination image so a Casablanca departure
    // page never shows a Sahara stand-in (falls back to Merzouga only for an
    // unrecognised city).
    const cityImage = DESTINATION_META[duration[1]]?.ogImage ?? '/images/dest/merzouga.jpg';
    return { title:`${daysLabel} Tours From ${cityLabel} — Private Morocco Itineraries`, description:`Private ${duration[2]}-day Morocco tours from ${cityLabel} — the Sahara, imperial cities and the Atlas. Pick your pace and plan a tailored departure with local experts.`, ogImage: cityImage };
  }
  const tour = normalized.match(/^\/tours\/([^/]+)$/);
  if (tour) { const meta=TOUR_META[TOUR_ALIASES[tour[1]] ?? tour[1]]; if(meta) return meta; }
  const dest = normalized.match(/^\/destinations\/([^/]+)$/); if(dest && DESTINATION_META[dest[1]]) return DESTINATION_META[dest[1]];
  const blog = normalized.match(/^\/blog\/([^/]+)$/); if(blog && BLOG_META[blog[1]]) return BLOG_META[blog[1]];
  return HOME_META;
}

/** Humanize an image filename into a short, descriptive phrase (e.g. "hassan-tower-mohammed-v-mausoleum-rabat.webp" → "Hassan Tower Mohammed V Mausoleum Rabat"). */
function humanizeAlt(url: string): string {
  const name = (url.split('/').pop() || '').replace(/\.(webp|jpg|jpeg|png|avif|gif)$/i, '');
  const tokens = name
    .split(/[-_]+/)
    .filter((tk) => !/^\d+w$/i.test(tk) && !/^\d+$/.test(tk) && !['photo', 'img', 'image', 'pic'].includes(tk.toLowerCase()))
    .map((tk) => (tk.length ? tk.charAt(0).toUpperCase() + tk.slice(1) : ''));
  return tokens.join(' ') || 'Morocco — a journey through the country';
}

/**
 * Resolve a natural, subject-accurate alt description for an Open Graph image.
 * Catalog photographs use the catalog's own canonical alt text; every other
 * shared image falls back to a humanized filename. This prevents the site from
 * attaching a single generic "Sahara camel caravan" description to every OG image.
 */
export function ogImageAlt(ogImage?: string): string {
  if (!ogImage) return 'Morocco Grand Adventure — private journeys through Morocco';
  if (ogImage.includes('/images/catalog/')) {
    const id = (ogImage.split('/').pop() || '').replace(/\.webp$/i, '');
    const img = catalogImage(id);
    if (img) return img.alt;
  }
  return humanizeAlt(ogImage);
}

const AR_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'رحلات المغرب — جولات الصحراء ومراكش',description:'رحلات خاصة في المغرب تشمل مرزوكة والصحراء ومراكش وفاس والمدن الإمبراطورية مع خبراء محليين.'},
  '/tours':{title:'جولات المغرب — رحلات الصحراء والمدن الإمبراطورية',description:'تصفح جولات المغرب الخاصة ورحلات الصحراء من مراكش ومرزوكة والمدن الإمبراطورية.'},
  '/destinations':{title:'وجهات السياحة في المغرب — المدن والصحراء',description:'اكتشف مراكش وفاس ومرزوكة والصحراء وجبال الأطلس وساحل المغرب.'},
  '/trip-builder':{title:'مخطط رحلة المغرب — جولة مخصصة متعددة الأيام',description:'صمّم رحلة خاصة متعددة الأيام في المغرب حسب المدة والوجهات والاهتمامات.'},
  '/build-your-day-trip':{title:'صمّم رحلتك اليومية في المغرب — تجربة ليوم واحد',description:'خطط لتجربة خاصة ليوم واحد مع العودة في اليوم نفسه واطلب عرض سعر مخصص.'},
  '/day-trips':{title:'رحلات يومية في المغرب — تجارب ليوم واحد',description:'اكتشف رحلات يومية خاصة في المغرب مع العودة في اليوم نفسه واطلب عرض سعر مخصص.'},
  '/merzouga-guide':{title:'دليل مرزوكة — الصحراء وإيرج شبي',description:'دليل عملي لمرزوكة وإيرج شبي وركوب الجمال وتجارب المخيم الصحراوي.'},
  '/desert-tours':{title:'جولات الصحراء في المغرب — مرزوكة وإيرج شبي',description:'رحلات الصحراء في مرزوكة مع ركوب الجمال والمخيمات والتجارب الصحراوية.'},
  '/luxury-camp':{title:'مخيم فاخر في مرزوكة — إقامة في الصحراء',description:'اكتشف تجربة المخيم الصحراوي الفاخر في منطقة مرزوكة.'},
  '/camel-trekking':{title:'ركوب الجمال في صحراء مرزوكة',description:'تجربة ركوب الجمال فوق كثبان إيرج شبي مع مرشدين محليين.'},
  '/marrakech-tours':{title:'جولات مراكش — رحلات خاصة في المغرب',description:'اكتشف مراكش والرحلات الخاصة إلى الأطلس والجنوب المغربي.'},
  '/fes-tours':{title:'جولات فاس — رحلات خاصة في المغرب',description:'استكشف فاس وشفشاون وشمال المغرب مع مرشدين محليين.'},
  '/contact':{title:'اتصل بنا — حجز رحلات المغرب',description:'تواصل معنا عبر واتساب أو البريد لتخطيط رحلتك الخاصة في المغرب.'},
  '/about':{title:'من نحن | المغرب، ما وراء الرحلة',description:'تعرّف على فريق Morocco Grand Adventure — مرشدون صحراويون من مرزوكة يصممون رحلات خاصة عبر المغرب.'},
  '/faq':{title:'أسئلة شائعة عن السفر إلى المغرب',description:'إجابات عن أسئلة السفر والجولات الصحراوية والحجز في المغرب.'},
  '/blog':{title:'مدونة السفر في المغرب — أدلة ونصائح',description:'أدلة ونصائح عملية للسفر في المغرب من خبراء محليين.'},
};

// ── Per-locale static route metadata (multilingual SEO phase) ────────────────
// Authored per-language <title>/<meta description> for the commercial hub
// routes, based on per-locale market research
// (docs/seo/multilingual-seo-strategy.md). Each locale uses its own search
// terminology — this is NOT a translation of the English keyword strategy.
// Routes without an entry keep canonical English metadata (see
// getLocalizedRouteMeta). Facts are limited to real MGA services (private
// tours, local guides, Merzouga/Erg Chebbi, camps, camel trekking, 4x4, day
// trips, trip builder). No invented prices or claims.

// French — vocabulary per ONMT-fr and FR-market usage (circuit, bivouac,
// Villes Impériales, dromadaire). Home title already exists (FR_HOME_META).
const FR_ROUTE_META: Record<string,RouteMeta> = {
  '/tours':{title:'Circuits privés au Maroc — Itinéraires sur mesure',description:"Tous nos circuits privés au Maroc : désert de Merzouga, Villes Impériales et côte atlantique, au départ de Marrakech, Fès, Casablanca et Agadir."},
  '/desert-tours':{title:'Circuit désert Maroc — Merzouga & dunes d\u2019Erg Chebbi',description:"Circuits privés dans le désert marocain : dromadaires au coucher du soleil, nuit en bivouac sous les étoiles et excursion 4x4 dans les dunes d'Erg Chebbi."},
  '/marrakech-tours':{title:'Circuits au départ de Marrakech — Désert & Haut Atlas',description:"Circuits privés au départ de Marrakech : le Haut Atlas, Aït Ben Haddou et la vallée du Dadès jusqu'aux dunes de Merzouga — ou une excursion d'une journée."},
  '/fes-tours':{title:'Circuits au départ de Fès — Merzouga & Chefchaouen',description:"Circuits privés au départ de Fès : le Moyen Atlas, la vallée du Ziz et les dunes de Merzouga — ou la bleue Chefchaouen."},
  '/casablanca-tours':{title:'Circuits au départ de Casablanca — Grand tour du Maroc',description:"Circuits privés au départ de Casablanca : Villes Impériales, Volubilis et désert du Sahara en un seul voyage — durée et itinéraire à définir."},
  '/agadir-tours':{title:'Circuits au départ d\u2019Agadir — Côte atlantique & Sahara',description:"Circuits privés au départ d'Agadir : par Essaouira et Marrakech ou par Ouarzazate jusqu'aux dunes d'Erg Chebbi — itinéraire sur mesure."},
  '/luxury-camp':{title:'Bivouac de luxe à Merzouga — Nuit dans le désert',description:"Bivouac de luxe privé à Merzouga : le confort au cœur des dunes d'Erg Chebbi — équipement, repas et réservation en détail."},
  '/camel-trekking':{title:'Dromadaire à Merzouga — Balade dans les dunes d\u2019Erg Chebbi',description:"Balade à dos de dromadaire à Merzouga : ce qui vous attend, quoi porter et comment se déroule un coucher de soleil dans les dunes d'Erg Chebbi."},
  '/4x4-tours':{title:'Excursions 4x4 dans le désert marocain — Dunes & oasis',description:"Excursions privées en 4x4 autour de Merzouga : dunes, oasis, Khamlia et familles nomades — à la demi-journée, à la journée ou davantage."},
  '/trip-builder':{title:'Voyage sur mesure au Maroc — Créez votre circuit privé',description:"Composez votre voyage au Maroc : durée, ville de départ, rythme et envies — devis personnalisé de nos guides sahariens locaux."},
  '/merzouga-guide':{title:'Guide de Merzouga — Dunes, campements & conseils',description:"Guide pratique de Merzouga : Erg Chebbi, meilleure saison, campements, dromadaires et activités — par des guides locaux."},
  '/day-trips':{title:'Excursions d\u2019une journée au Maroc — Retour le soir',description:"Excursions privées à la journée depuis Marrakech, Fès et Agadir : Ourika, Ouzoud, Essaouira, Chefchaouen — retour le même jour."},
};

// Spanish — vocabulary per Sahara Viajes / ES-market usage (tours por el
// desierto, circuitos, excursiones de un día, campamento, paseo en camello).
const ES_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'Viajes a Marruecos — Tours privados y desierto de Merzouga',description:"Agencia local del desierto: tours privados por Marruecos a medida — Erg Chebbi, ciudades imperiales y Atlas, con guía local. Pide tu presupuesto."},
  '/tours':{title:'Tours por Marruecos — Circuitos privados a medida',description:"Catálogo de circuitos privados por Marruecos: rutas del desierto, ciudades imperiales y costa atlántica desde Marrakech, Fez, Casablanca y Agadir."},
  '/desert-tours':{title:'Tours por el desierto de Marruecos — Merzouga y Erg Chebbi',description:"Rutas privadas al desierto de Merzouga: camellos al atardecer, campamento bajo las estrellas de Erg Chebbi y excursiones en 4x4 por las dunas."},
  '/marrakech-tours':{title:'Tours desde Marrakech — Desierto, Atlas y rutas privadas',description:"Rutas privadas desde Marrakech: cruzar el Alto Atlas, Aït Ben Haddou y el valle del Dades hasta las dunas de Merzouga — o una excursión de un día."},
  '/fes-tours':{title:'Tours desde Fez — Merzouga y Chefchaouen',description:"Rutas privadas desde Fez: el Atlas Medio, el valle del Ziz y las dunas de Merzouga — o la ciudad azul de Chefchaouen."},
  '/casablanca-tours':{title:'Circuitos desde Casablanca — Gran tour de Marruecos',description:"Circuitos privados desde Casablanca: ciudades imperiales, Volubilis y el desierto de Merzouga en un solo viaje — duración flexible."},
  '/agadir-tours':{title:'Tours desde Agadir — Costa atlántica y desierto',description:"Rutas privadas desde Agadir: por Essaouira y Marrakech o por Ouarzazate hasta las dunas de Erg Chebbi — itinerario a medida."},
  '/luxury-camp':{title:'Campamento de lujo en Merzouga — Noche en el desierto',description:"Campamento privado de lujo en Merzouga: comodidad entre las dunas de Erg Chebbi — instalaciones, comidas y reserva, explicadas."},
  '/camel-trekking':{title:'Paseo en camello por las dunas de Erg Chebbi',description:"Paseo en camello en Merzouga: qué esperar, qué llevar y cómo transcurre un atardecer entre las dunas de Erg Chebbi."},
  '/4x4-tours':{title:'Excursiones en 4x4 por el desierto de Marruecos',description:"Excursiones privadas en 4x4 desde Merzouga: dunas, oasis, Khamlia y familias nómadas — de medio día, un día o más."},
  '/trip-builder':{title:'Viaje a medida por Marruecos — Diseña tu circuito',description:"Diseña tu viaje privado a Marruecos: duración, ciudad de salida, ritmo e intereses — presupuesto de guías locales del Sahara."},
  '/merzouga-guide':{title:'Guía de Merzouga — Dunas, campamentos y consejos',description:"Guía práctica de Merzouga: Erg Chebbi, mejor época, campamentos del desierto, camellos y actividades — por guías locales."},
  '/day-trips':{title:'Excursiones de un día en Marruecos — Vuelta el mismo día',description:"Excursiones privadas de un día desde Marrakech, Fez y Agadir: Ourika, Ouzoud, Essaouira, Chefchaouen — con regreso el mismo día."},
};

// Italian — vocabulary per ONMT-it / IT-market usage (viaggio, vacanza nel
// deserto, Città imperiali, escursione in cammello, gite di un giorno).
const IT_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'Viaggio in Marocco — Tour privati e deserto di Merzouga',description:"Agenzia locale del deserto: tour privati in Marocco su misura — Erg Chebbi, città imperiali e Atlas, con guida locale. Richiedi un preventivo."},
  '/tours':{title:'Tour in Marocco — Viaggi privati su misura',description:"Tutti i tour privati in Marocco: itinerari nel deserto, città imperiali e costa atlantica da Marrakech, Fes, Casablanca e Agadir."},
  '/desert-tours':{title:'Tour del deserto in Marocco — Merzouga ed Erg Chebbi',description:"Itinerari privati nel deserto di Merzouga: cammelli al tramonto, notte in campo tra le dune di Erg Chebbi ed escursioni in 4x4."},
  '/marrakech-tours':{title:'Tour da Marrakech — Deserto, Atlas e itinerari privati',description:"Itinerari privati da Marrakech: l'Alto Atlas, Aït Ben Haddou e la valle del Dadès fino alle dune di Merzouga — o una gita di un giorno."},
  '/fes-tours':{title:'Tour da Fes — Merzouga e Chefchaouen',description:"Itinerari privati da Fes: l'Atlas Medio, la valle dello Ziz e le dune di Merzouga — o la città blu di Chefchaouen."},
  '/casablanca-tours':{title:'Giro del Marocco da Casablanca — Itinerari privati',description:"Itinerari privati da Casablanca: città imperiali, Volubilis e il deserto del Sahara in un solo viaggio — durata flessibile."},
  '/agadir-tours':{title:'Tour da Agadir — Costa atlantica e deserto',description:"Itinerari privati da Agadir: via Essaouira e Marrakech o via Ouarzazate fino alle dune di Erg Chebbi — su misura."},
  '/luxury-camp':{title:'Campo nel deserto di lusso a Merzouga — Notte in Sahara',description:"Campo privato di lusso a Merzouga: comfort tra le dune di Erg Chebbi — servizi, pasti e prenotazione, spiegati."},
  '/camel-trekking':{title:'Escursione in cammello sulle dune di Erg Chebbi',description:"Escursione in cammello a Merzouga: cosa aspettarsi, cosa portare e come si svolge un tramonto tra le dune di Erg Chebbi."},
  '/4x4-tours':{title:'Escursioni in 4x4 nel deserto del Marocco',description:"Escursioni private in 4x4 da Merzouga: dune, oasi, Khamlia e famiglie nomadi — mezza giornata, un giorno o più."},
  '/trip-builder':{title:'Viaggio su misura in Marocco — Crea il tuo itinerario',description:"Crea il tuo viaggio privato in Marocco: durata, città di partenza, ritmo e interessi — preventivo delle nostre guide locali del Sahara."},
  '/merzouga-guide':{title:'Guida di Merzouga — Dune, campi e consigli',description:"Guida pratica di Merzouga: Erg Chebbi, periodo migliore, campi nel deserto, cammelli e attività — da guide locali."},
  '/day-trips':{title:'Gite di un Giorno in Marocco — Escursioni Private',description:"Escursioni giornaliere private in Marocco da Marrakech, Fes e Merzouga: cascate di Ouzoud, Chefchaouen, Essaouira, Meknès e il deserto. Ritorno in giornata."},
};

// German — vocabulary per ONMT-de / DE-market usage (Rundreise, Wüstentour,
// Kaiserstädte, Kasbah-Straße, Wüstencamp, Kameltrekking).
const DE_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'Marokko Rundreisen — Private Wüstentouren nach Maß',description:"Private Marokko-Rundreisen mit lokalen Sahara-Guides: Merzouga & Erg Chebbi, Kaiserstädte und Atlas — individuell ab Marrakesch oder Fes."},
  '/tours':{title:'Marokko Touren — Private Rundreisen im Überblick',description:"Alle privaten Marokko-Rundreisen: Wüstentouren, Kaiserstädte und Atlantikküste ab Marrakesch, Fes, Casablanca und Agadir."},
  '/desert-tours':{title:'Marokko Wüstentouren — Merzouga & Erg Chebbi',description:"Private Wüstentouren nach Merzouga: Kameltrekking im Sonnenuntergang, Nacht im Wüstencamp und 4x4-Excursionen über die Dünen von Erg Chebbi."},
  '/marrakech-tours':{title:'Touren ab Marrakesch — Wüste, Atlas & Kasbah-Straße',description:"Private Touren ab Marrakesch: über den Hohen Atlas und Aït Ben Haddou ins Dadès-Tal bis zu den Dünen von Merzouga — oder als Tagestour."},
  '/fes-tours':{title:'Touren ab Fes — Merzouga & Chefchaouen',description:"Private Touren ab Fes: durch den Mittleren Atlas und das Ziz-Tal nach Merzouga — oder zur blauen Stadt Chefchaouen."},
  '/casablanca-tours':{title:'Rundreisen ab Casablanca — Große Marokko-Reise',description:"Private Rundreisen ab Casablanca: Kaiserstädte, Volubilis und die Sahara in einer Marokko-Reise — Dauer und Route flexibel."},
  '/agadir-tours':{title:'Touren ab Agadir — Atlantikküste & Sahara',description:"Private Touren ab Agadir: über Essaouira und Marrakesch oder über Ouarzazate zu den Dünen von Erg Chebbi — individuell geplant."},
  '/luxury-camp':{title:'Luxus-Wüstencamp in Merzouga — Nacht in der Sahara',description:"Privates Luxus-Wüstencamp bei Merzouga: Komfort zwischen den Dünen von Erg Chebbi — Ausstattung, Verpflegung und Buchung im Überblick."},
  '/camel-trekking':{title:'Kameltrekking in Marokko — Dünen von Erg Chebbi',description:"Kameltrekking bei Merzouga: was Sie erwartet, passende Kleidung und der Ablauf einer Kameltour in den Dünen von Erg Chebbi."},
  '/4x4-tours':{title:'4x4-Wüstentouren in Marokko — Dünen, Oasen & Nomaden',description:"Private 4x4-Excursionen bei Merzouga: Dünen, Oasen, Khamlia und Nomadenfamilien — halbtags, ganztags oder länger."},
  '/trip-builder':{title:'Marokko Reise individuell — Private Rundreise planen',description:"Ihre private Marokko-Reise nach Maß: Dauer, Startort, Tempo und Interessen wählen — Angebot von lokalen Sahara-Guides."},
  '/merzouga-guide':{title:'Merzouga Guide — Dünen, Camps & Reisetipps',description:"Praktischer Merzouga-Guide: Erg Chebbi, beste Reisezeit, Wüstencamps, Kameltrekking und Aktivitäten — von lokalen Guides."},
  '/day-trips':{title:'Tagesausflüge in Marokko — Private Tagesausflüge',description:"Private Tagesausflüge ab Marrakesch, Fes und Agadir: Ourika, Ouzoud, Essaouira, Chefchaouen — mit Rückkehr am selben Tag."},
};
// Dutch — vocabulary per ONMT-nl / NL-market usage (rondreis, privéreis,
// woestijnreis, Keizerlijke Steden, Kasbahroute).
const NL_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'Rondreis Marokko — Privéreizen & woestijn van Merzouga',description:"Lokale Sahara-gidsen organiseren uw privérondreis Marokko: Erg Chebbi, Keizerlijke Steden en Atlas — op maat vanaf Marrakech of Fez."},
  '/tours':{title:'Rondreis Marokko — Alle privéreizen op een rij',description:"Alle privérondreisen door Marokko: woestijnreizen, Keizerlijke Steden en Atlantische kust vanuit Marrakech, Fez, Casablanca en Agadir."},
  '/desert-tours':{title:'Woestijnreis Marokko — Merzouga & Erg Chebbi',description:"Privéreizen naar de woestijn van Merzouga: kamelen bij zonsondergang, een nacht in een woestijnkamp en 4x4-excursies over de duinen van Erg Chebbi."},
  '/marrakech-tours':{title:'Rondreisen vanuit Marrakech — Woestijn, Atlas & Kasbahs',description:"Privérondreisen vanuit Marrakech: over de Hoge Atlas en langs Aït Ben Haddou naar de duinen van Merzouga — of als dagexcursie."},
  '/fes-tours':{title:'Rondreisen vanuit Fez — Merzouga & Chefchaouen',description:"Privérondreisen vanuit Fez: door de Midden-Atlas en het Ziz-dal naar Merzouga — of naar het blauwe Chefchaouen."},
  '/casablanca-tours':{title:'Rondreis Marokko vanuit Casablanca — Grote rondreis',description:"Privérondreisen vanuit Casablanca: Keizerlijke Steden, Volubilis en de Sahara in één reis — duur en route naar wens."},
  '/agadir-tours':{title:'Rondreisen vanuit Agadir — Atlantische kust & Sahara',description:"Privérondreisen vanuit Agadir: via Essaouira en Marrakech of via Ouarzazate naar de duinen van Erg Chebbi — op maat."},
  '/luxury-camp':{title:'Luxe woestijnkamp in Merzouga — Nacht in de Sahara',description:"Privé-luxueus woestijnkamp bij Merzouga: comfort tussen de duinen van Erg Chebbi — voorzieningen, maaltijden en boeking uitgelegd."},
  '/camel-trekking':{title:'Kamelen trektocht in Marokko — Duinen van Erg Chebbi',description:"Kamelen trektocht bij Merzouga: wat u kunt verwachten, wat u draagt en hoe een zonsondergang tussen de duinen verloopt."},
  '/4x4-tours':{title:'4x4 woestijnexcursies in Marokko — Duinen & oases',description:"Privé 4x4-excursies vanuit Merzouga: duinen, oases, Khamlia en nomadenfamilies — halve dag, hele dag of langer."},
  '/trip-builder':{title:'Rondreis Marokko op maat — Stel uw privéreis samen',description:"Stel uw privérondreis door Marokko samen: duur, startpunt, tempo en interesses — offerte van lokale Sahara-gidsen."},
  '/merzouga-guide':{title:'Merzouga gids — Duinen, kampen & reistips',description:"Praktische Merzouga-gids: Erg Chebbi, beste reistijd, woestijnkampen, kamelen en activiteiten — van lokale gidsen."},
  '/day-trips':{title:'Dagexcursies in Marokko — Terug dezelfde dag',description:"Privé dagexcursies vanuit Marrakech, Fez en Agadir: Ourika, Ouzoud, Essaouira, Chefchaouen — met terugkeer dezelfde dag."},
};

// Portuguese — PT-PT anchored per ONMT-pt usage (Marraquexe, Cidades
// Imperiais, circuito privado, passeio de camelo, acampamento).
const PT_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'Viagens a Marrocos — Circuitos privados e deserto de Merzouga',description:"Agência local do deserto: circuitos privados a Marrocos à medida — Erg Chebbi, Cidades Imperiais e Atlas, com guia local. Peça o seu orçamento."},
  '/tours':{title:'Viagens a Marrocos — Circuitos privados à medida',description:"Todos os circuitos privados a Marrocos: rotas do deserto, Cidades Imperiais e costa atlântica a partir de Marraquexe, Fez, Casablanca e Agadir."},
  '/desert-tours':{title:'Viagem ao deserto de Marrocos — Merzouga e Erg Chebbi',description:"Rotas privadas ao deserto de Merzouga: camelos ao pôr do sol, noite em acampamento sob as estrelas de Erg Chebbi e passeios de 4x4 nas dunas."},
  '/marrakech-tours':{title:'Circuitos a partir de Marraquexe — Deserto e Alto Atlas',description:"Circuitos privados a partir de Marraquexe: o Alto Atlas, Aït Ben Haddou e o vale do Dadès até às dunas de Merzouga — ou uma excursão de um dia."},
  '/fes-tours':{title:'Circuitos a partir de Fez — Merzouga e Chefchaouen',description:"Circuitos privados a partir de Fez: o Médio Atlas, o vale do Ziz e as dunas de Merzouga — ou a cidade azul de Chefchaouen."},
  '/casablanca-tours':{title:'Grande viagem a Marrocos a partir de Casablanca',description:"Circuitos privados a partir de Casablanca: Cidades Imperiais, Volubilis e o deserto do Saara numa só viagem — duração flexível."},
  '/agadir-tours':{title:'Circuitos a partir de Agadir — Costa atlântica e deserto',description:"Circuitos privados a partir de Agadir: por Essaouira e Marraquexe ou por Ouarzazate até às dunas de Erg Chebbi — à medida."},
  '/luxury-camp':{title:'Acampamento de luxo no deserto de Merzouga',description:"Acampamento privado de luxo em Merzouga: conforto entre as dunas de Erg Chebbi — instalações, refeições e reserva, explicados."},
  '/camel-trekking':{title:'Passeio de camelo nas dunas de Erg Chebbi',description:"Passeio de camelo em Merzouga: o que esperar, o que vestir e como decorre um pôr do sol entre as dunas de Erg Chebbi."},
  '/4x4-tours':{title:'Excursões de 4x4 pelo deserto de Marrocos',description:"Excursões privadas de 4x4 desde Merzouga: dunas, oásis, Khamlia e famílias nómadas — meia hora, um dia ou mais."},
  '/trip-builder':{title:'Viagem a Marrocos à medida — Crie o seu circuito',description:"Crie a sua viagem privada a Marrocos: duração, cidade de partida, ritmo e interesses — orçamento de guias locais do Saara."},
  '/merzouga-guide':{title:'Guia de Merzouga — Dunas, campos e dicas',description:"Guia prático de Merzouga: Erg Chebbi, melhor época, acampamentos no deserto, camelos e atividades — por guias locais."},
  '/day-trips':{title:'Excursões de um dia em Marrocos — Regreso no mesmo dia',description:"Excursões privadas de um dia a partir de Marraquexe, Fez e Agadir: Ourika, Ouzoud, Essaouira, Chefchaouen — com regresso no mesmo dia."},
};
// Chinese — per CN-market usage (AMC Voyages et al.): 私人定制游, 撒哈拉沙漠
// 之旅, 沙漠帐篷营地, 一日游; entity names 梅尔祖卡/艾尔格切比/舍夫沙万.
const ZH_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'摩洛哥旅游 — 私人定制游与撒哈拉沙漠之旅',description:"本地沙漠向导为您定制摩洛哥私人行程：梅尔祖卡艾尔格切比沙丘、皇城、阿特拉斯山脉，从马拉喀什或菲斯出发。"},
  '/tours':{title:'摩洛哥旅游线路 — 全部私人定制行程',description:"浏览全部摩洛哥私人行程：沙漠之旅、皇城与大西洋海岸，从马拉喀什、菲斯、卡萨布兰卡和阿加迪尔出发。"},
  '/desert-tours':{title:'摩洛哥撒哈拉沙漠之旅 — 梅尔祖卡与艾尔格切比',description:"前往梅尔祖卡的私人沙漠行程：日落骆驼骑行、艾尔格切比星空下的沙漠帐篷营地，以及四驱沙丘越野。"},
  '/marrakech-tours':{title:'马拉喀什出发的摩洛哥行程 — 沙漠与阿特拉斯',description:"从马拉喀什出发的私人行程：穿越高阿特拉斯山脉、艾本哈杜和达德斯峡谷，直达梅尔祖卡沙丘——也可选择一日游。"},
  '/fes-tours':{title:'菲斯出发的摩洛哥行程 — 梅尔祖卡与舍夫沙万',description:"从菲斯出发的私人行程：途经中阿特拉斯山脉和济兹河谷前往梅尔祖卡——或前往蓝色之城舍夫沙万。"},
  '/casablanca-tours':{title:'卡萨布兰卡出发的摩洛哥环线之旅',description:"从卡萨布兰卡出发的私人行程：皇城、沃吕比利斯与撒哈拉沙漠一次走完——天数和路线灵活安排。"},
  '/agadir-tours':{title:'阿加迪尔出发的摩洛哥行程 — 大西洋海岸与撒哈拉',description:"从阿加迪尔出发的私人行程：经索维拉和马拉喀什，或经瓦尔扎扎特前往艾尔格切比沙丘——按需定制。"},
  '/luxury-camp':{title:'梅尔祖卡豪华沙漠帐篷营地 — 撒哈拉之夜',description:"梅尔祖卡私人豪华沙漠营地：在艾尔格切比沙丘之间享受舒适住宿——设施、餐饮与预订说明。"},
  '/camel-trekking':{title:'艾尔格切比沙丘骆驼骑行体验',description:"梅尔祖卡骆驼骑行：体验内容、穿着准备，以及艾尔格切比沙丘日落骑行的完整过程。"},
  '/4x4-tours':{title:'摩洛哥沙漠四驱越野之旅 — 沙丘、绿洲与游牧人家',description:"从梅尔祖卡出发的私人四驱越野：沙丘、绿洲、Khamlia 村与游牧家庭——半日、全天或更长行程。"},
  '/trip-builder':{title:'摩洛哥行程定制 — 打造您的私人路线',description:"定制您的摩洛哥私人旅行：天数、出发城市、节奏和兴趣——当地撒哈拉向导为您提供方案报价。"},
  '/merzouga-guide':{title:'梅尔祖卡旅游攻略 — 沙丘、营地与实用建议',description:"梅尔祖卡实用攻略：艾尔格切比、最佳旅行季节、沙漠营地、骆驼骑行与活动——由当地向导撰写。"},
  '/day-trips':{title:'摩洛哥一日游 — 当天往返的私人行程',description:"从马拉喀什、菲斯和阿加迪尔出发的私人一日游：Ourika、Ouzoud 瀑布、索维拉、舍夫沙万——当天往返。"},
};

// Japanese — natural katakana entity naming per ja sources (マラケシ発, サハラ
// 砂漠ツアー, メルズーガ, エルグ・チェビ, プライベートツアー, 日帰り).
const JA_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'モロッコ ツアー — 専用車で巡るプライベート旅行',description:"現地サハラガイドが案内するモロッコのプライベートツアー：メルズーガのエルグ・チェビ、王道の皇城、アトラス山脈。マラケシやフェズ発で日程は自由設計。"},
  '/tours':{title:'モロッコ ツアー一覧 — プライベート周遊プラン',description:"モロッコのプライベートツアー一覧：砂漠ツアー、皇城の周遊、大西洋岸。マラケシ、フェズ、カサブランカ、アガディール発。"},
  '/desert-tours':{title:'モロッコ サハラ砂漠ツアー — メルズーガとエルグ・チェビ',description:"メルズーガへのプライベート砂漠ツアー：夕日のラクダ乗り、エルグ・チェビの星空下サハラキャンプ、4WDでの砂丘観光。"},
  '/marrakech-tours':{title:'マラケシ発のモロッコ砂漠ツアー — アトラス山脈経由',description:"マラケシ発のプライベートツアー：高アトラス、アイト・ベン・ハドゥ、ダデス渓谷を経てメルズーガの砂丘へ。日帰りプランもご相談ください。"},
  '/fes-tours':{title:'フェズ発のモロッコ旅 — メルズーガとシェフシャウエン',description:"フェズ発のプライベートツアー：中アトラスとジズ渓谷を抜けてメルズーガへ。または青い街シェフシャウエン方面へ。"},
  '/casablanca-tours':{title:'カサブランカ発のモロッコ周遊プラン',description:"カサブランカ発のプライベート周遊：皇城とヴォルビリス遺跡、サハラ砂漠を一つの旅で。日程とルートは相談可能。"},
  '/agadir-tours':{title:'アガディール発 — 大西洋岸とサハラ砂漠の旅',description:"アガディール発のプライベートツアー：エッサウィラとマラケシ経由、またはワルザザート経由でエルグ・チェビの砂丘へ。"},
  '/luxury-camp':{title:'メルズーガの豪華砂漠キャンプ — サハラでの一夜',description:"メルズーガ近郊のプライベート豪華キャンプ：エルグ・チェビの砂丘の間での快適な宿泊。設備・食事・予約の案内。"},
  '/camel-trekking':{title:'エルグ・チェビの砂丘ラクダ乗り体験',description:"メルズーガのラクダ乗り：当日の流れ、服装の準備、エルグ・チェビの砂丘で夕日を楽しむ体験の様子をご紹介。"},
  '/4x4-tours':{title:'モロッコ砂漠の4WDツアー — 砂丘・オアシス・遊牧民',description:"メルズーガ発のプライベート4WDツアー：砂丘、オアシス、ハムリア村、遊牧民の家族を訪問。半日・終日から選べます。"},
  '/trip-builder':{title:'モロッコ旅行のオーダーメイド — あなただけの旅程づくり',description:"モロッコのプライベート旅行を設計：日数、出発地、ペース、興味に合わせて。現地サハラガイドがお見積りします。"},
  '/merzouga-guide':{title:'メルズーガ旅行ガイド — 砂丘・キャンプ・旅のヒント',description:"メルズーガの実用ガイド：エルグ・チェビ、ベストシーズン、砂漠キャンプ、ラクダ乗りとアクティビティ。現地ガイドが解説。"},
  '/day-trips':{title:'モロッコ日帰りツアー — マラケシ発など当日帰着',description:"マラケシ、フェズ、アガディール発の日帰りツアー：ウリカ渓谷、ウズードの滝、エッサウィラ、シェフシャウエン。当日帰着。"},
};

// Korean — per KR-market usage and MGA's existing Korean organic visibility
// (모로코 여행, 사막 투어, 메르주가, 에르그 셰비, 마라케시 출발).
const KO_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'모로코 여행 — 프라이빗 맞춤 투어와 사하라 사막',description:"현지 사하라 가이드와 함께하는 모로코 프라이빗 여행: 메르주가 에르그 셰비, 왕도 도시, 아틀라스 산맥. 마라케시·페스 출발 맞춤 일정."},
  '/tours':{title:'모로코 투어 — 프라이빗 일정 전체 보기',description:"모로코 프라이빗 투어 전체 목록: 사막 투어, 왕도 도시 일주, 대서양 연안. 마라케시, 페스, 카사블랑카, 아가디르 출발."},
  '/desert-tours':{title:'모로코 사막 투어 — 메르주가와 에르그 셰비',description:"메르주가 프라이빗 사막 투어: 일몰 낙타 트레킹, 에르그 셰비 별빛 아래 사막 캠프, 4WD 모래언덕 탐험."},
  '/marrakech-tours':{title:'마라케시 출발 모로코 사막 투어 — 아틀라스 경유',description:"마라케시 출발 프라이빗 투어: 아틀라스 산맥과 아이트 벤 하두, 다데스 계곡을 지나 메르주가 모래언덕까지. 당일 투어도 가능."},
  '/fes-tours':{title:'페스 출발 모로코 여행 — 메르주가와 셰프샤우엔',description:"페스 출발 프라이빗 투어: 중부 아틀라스와 지즈 계곡을 지나 메르주가로 — 또는 푸른 도시 셰프샤우엔 방향으로."},
  '/casablanca-tours':{title:'카사블랑카 출발 모로코 일주 여행',description:"카사블랑카 출발 프라이빗 투어: 왕도 도시, 볼루빌리스, 사하라 사막을 한 번의 여행으로. 기간과 경로는 자유롭게."},
  '/agadir-tours':{title:'아가디르 출발 — 대서양 연안과 사하라 사막',description:"아가디르 출발 프라이빗 투어: 에사우이라와 마라케시 경유 또는 와르자자트 경유로 에르그 셰비 모래언덕까지 — 맞춤 일정."},
  '/luxury-camp':{title:'메르주가 럭셔리 사막 캠프 — 사하라의 밤',description:"메르주가 프라이빗 럭셔리 사막 캠프: 에르그 셰비 모래언덕 사이의 편안한 숙박 — 시설, 식사, 예약 안내."},
  '/camel-trekking':{title:'에르그 셰비 모래언덕 낙타 트레킹 체험',description:"메르주가 낙타 트레킹: 체험 내용, 준비물, 에르그 셰비 모래언덕에서의 일몰 라이딩 과정 소개."},
  '/4x4-tours':{title:'모로코 사막 4WD 투어 — 모래언덕, 오아시스, 유목민',description:"메르주가 출발 프라이빗 4WD 투어: 모래언덕, 오아시스, 함리아 마을, 유목민 가족 방문. 반일·종일 선택 가능."},
  '/trip-builder':{title:'모로코 맞춤 일정 만들기 — 나만의 프라이빗 코스',description:"모로코 프라이빗 여행 일정 설계: 기간, 출발 도시, 진행 속도, 관심사에 맞춰 현지 사하라 가이드가 견적을 제안합니다."},
  '/merzouga-guide':{title:'메르주가 여행 가이드 — 모래언덕, 캠프, 여행 팁',description:"메르주가 실용 가이드: 에르그 셰비, 여행 베스트 시즌, 사막 캠프, 낙타 트레킹과 액티비티 — 현지 가이드가 설명합니다."},
  '/day-trips':{title:'모로코 당일 투어 — 마라케시 출발 당일 귀국 코스',description:"마라케시, 페스, 아가디르 출발 프라이빗 당일 투어: 우리카 계곡, 우주드 폭포, 에사우이라, 셰프샤우엔 — 당일 복귀."},
};
// ── Localized route metadata ──────────────────────────────────────────────────
// Single source of truth for per-page SEO title/description used by BOTH the
// runtime <LocalizedHead> and the static prerender (`scripts/prerender.ts`).
//
// Order of precedence:
//   1. Authoring-supplied per-language static overrides (AR + FR + ES + IT +
//      DE + NL + PT + ZH + JA + KO dictionaries above). These exist for
//      languages whose market research justified authored native metadata.
//   2. Tour / destination DETAIL pages: when a content-translation overlay was
//      authored for the active language, surface the localized entity name +
//      description + image as the SEO title/description. This is how localized
//      tour metadata reaches the <title>/<meta description>/OG tags.
//   3. Otherwise fall back to the canonical English route metadata. No
//      translation is ever *invented* — a language without an authored overlay
//      keeps the English copy rather than receiving a machine-generated page.
import { getLocalizedTour, getLocalizedDestination, contentOverlayExists } from '@/i18n/content';
import { getLocalizedGuide, guideOverlayExists } from '@/i18n/guides';
import { t as translate } from '@/i18n/index';
import type { Lang } from '@/i18n/index';

/** Authored static route metadata per language (English = canonical, no entry). */
const LOCALIZED_ROUTE_META: Partial<Record<Lang, Record<string, RouteMeta>>> = {
  ar: AR_ROUTE_META,
  fr: FR_ROUTE_META,
  es: ES_ROUTE_META,
  it: IT_ROUTE_META,
  de: DE_ROUTE_META,
  nl: NL_ROUTE_META,
  pt: PT_ROUTE_META,
  zh: ZH_ROUTE_META,
  ja: JA_ROUTE_META,
  ko: KO_ROUTE_META,
};

const DESCRIPTION_MAX = 158;
function truncate(text: string | undefined, max = DESCRIPTION_MAX): string {
  const s = (text ?? '').toString().replace(/\s+/g, ' ').trim();
  if (!s) return '';
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd().replace(/[,;:—–-]+$/, '') + '…';
}

export function getLocalizedRouteMeta(rest: string, lang: Lang = 'en'): RouteMeta {
  const normalized = rest === '' || rest === '/' ? '/' : rest.replace(/\/$/, '');

  // 1. Per-language static overrides (authored native metadata per locale).
  const localized = LOCALIZED_ROUTE_META[lang]?.[normalized];
  if (localized) return localized;

  // 2. Merzouga guide page — localized SEO meta when a native guide overlay
  //    was authored for the active language. The overlay's native pageTitle +
  //    description feed the SEO tags, so SERP snippets agree with the page H1.
  //    The canonical ogImage is preserved (images are never localized by path).
  const guideMatch = normalized.match(/^\/merzouga-guide\/([^/]+)$/);
  if (guideMatch && guideOverlayExists(lang, guideMatch[1])) {
    const g = getLocalizedGuide(guideMatch[1], lang);
    if (g) {
      const base = getRouteMeta(rest);
      return { title: g.pageTitle, description: truncate(g.description), ogImage: base.ogImage };
    }
  }

  // 3. Tour detail page — localized entity meta when an overlay exists.
  const tourMatch = normalized.match(/^\/tours\/([^/]+)$/);
  if (tourMatch) {
    const t = getLocalizedTour(tourMatch[1], lang);
    if (t && contentOverlayExists(lang, 'tours', t.id)) {
      // Very short localized tour names (common in CJK/romance locales, e.g.
      // a 9-character Chinese name) get the authored duration appended so the
      // SERP title stays descriptive — duration is real authored data, not
      // invented copy.
      let title = t.name;
      if (title.length < 25 && t.duration) title = `${title} — ${t.duration}`;
      return { title, description: truncate(t.description), ogImage: t.image };
    }
  }

  // 3. Destination detail page — localized entity meta when an overlay exists.
  //    Title is enriched with the authored localized region for search context
  //    (e.g. "Erg Chebbi | Désert du Sahara"), never invented — region comes
  //    from the same authored overlay as the name. The full localized
  //    description (not the one-line shortDesc) feeds the meta description so
  //    SERP snippets are informative rather than a 60-character stub.
  const destMatch = normalized.match(/^\/destinations\/([^/]+)$/);
  if (destMatch) {
    const d = getLocalizedDestination(destMatch[1], lang);
    if (d && contentOverlayExists(lang, 'destinations', d.id)) {
      const regionSuffix = d.region && !d.name.includes(d.region) ? ` | ${d.region}` : '';
      let title = `${d.name}${regionSuffix}`;
      // Short localized titles (e.g. "Fès | Nord du Maroc") get the brand
      // appended explicitly — withBrandSuffix would otherwise skip it because
      // the region often contains "Maroc/Morocco".
      if (title.length < 45) title = `${title} — ${BRAND}`;
      return { title, description: truncate(d.description || d.shortDesc), ogImage: d.image };
    }
  }

  // 3.5 Tour hub pages — metadata built from the authored per-locale dictionary
  //     (hub_<city>_title / hub_<city>_intro / tours_heading / tours_sub).
  //     These keys are hand-authored in every locale file; if a locale lacks a
  //     key, t() falls back to English (never a literal key, never invented copy).
  if (normalized === '/tours') {
    const heading = translate(lang, 'tours_heading');
    if (heading && heading !== 'tours_heading') {
      const sub = translate(lang, 'tours_sub');
      const description = sub && sub !== 'tours_sub' ? truncate(`${heading} — ${sub}`) : truncate(heading);
      return { title: heading, description };
    }
  }
  const toursHub = normalized.match(/^\/tours\/from-([a-z]+)$/);
  if (toursHub) {
    const city = toursHub[1];
    const title = translate(lang, `hub_${city}_title`);
    if (title && title !== `hub_${city}_title`) {
      const intro = translate(lang, `hub_${city}_intro`);
      const fallback = getRouteMeta(rest).description;
      return { title, description: truncate(intro) || fallback };
    }
  }

  // 4. No authored translation for this route/language: English canonical meta.
  return getRouteMeta(rest);
}

