/** Per-route SEO metadata. Keep this file as the single source of truth for runtime/prerendered route metadata. */
export type RouteMeta = { title: string; description: string; ogImage?: string };

// Import the catalog's canonical alt text so OG image alt descriptions stay in
// sync with the actual subject of every shared image (catalog photos included).
import { catalogImage } from '@/data/imageCatalog';
import { destinations } from '@/data/content';
import { PHOTO_LIBRARY } from '@/data/photoLibrary';
import { BOOK_COPY } from '@/data/book-copy';
import { THINGS_COPY } from '@/data/things-to-do/all';

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
  ogImage: '/images/og/morocco-grand-adventure-sahara.jpg',
};
export const FR_HOME_META: RouteMeta = {
  title: 'Voyage sur mesure au Maroc — Circuits privés & Sahara',
  description: "Créez votre circuit privé au Maroc avec une agence locale : Merzouga, dunes d'Erg Chebbi, camp de luxe, Marrakech, Fès et l'Atlas. Devis personnalisé.",
  ogImage: '/images/og/morocco-grand-adventure-sahara.jpg',
};

const TOUR_META: Record<string, RouteMeta> = {
  '3-day-sahara-marrakech': { title: '3-Day Luxury Sahara Tour from Marrakech', description: "Cross the High Atlas to Aït Ben Haddou, the Dades and Todra gorges, then a sunset camel trek into Erg Chebbi for a night in a luxury desert camp under the stars.", ogImage: '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp' },
  '3-day-sahara-agadir': { title: '3-Day Private Sahara Tour from Agadir to Merzouga | Morocco', description: 'A private three-day route from Agadir to the Sahara at Merzouga, via southern Morocco and Ouarzazate. Route and desert night confirmed with your dates.', ogImage: '/images/catalog/luxury-desert-camp-sunset-merzouga.webp' },
  '5-day-imperial-cities': { title: '5-Day Imperial Cities & Desert Morocco Tour', description: 'Explore Marrakech, Meknès, Fes and Chefchaouen before a night in the Sahara on a private Morocco tour.', ogImage: '/images/tours/ait-ben-haddou-ounila-reflection.jpg' },
  '7-day-imperial-cities-sahara-escape': { title: '7-Day Imperial Cities & Sahara Escape — Grand Morocco Tour', description: 'Seven private days from Marrakech to the Sahara and back — Aït Ben Haddou, the Dades and Todra gorges, two nights at Erg Chebbi, then imperial Fes.', ogImage: '/images/curated/ait-ben-haddou-bridge-town-unesco-morocco.webp' },
  'honeymoon-morocco': { title: 'Romantic Morocco Honeymoon — 10 Day Luxury Private Tour', description: 'A romantic private Morocco journey combining cities, desert experiences and time designed for couples.', ogImage: '/images/tours/couple-sunset-erg-chebbi.jpg' },
  '8-day-marrakech-essaouira-agadir-sahara': { title: '8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure', description: 'Eight private days from Marrakech to Essaouira and Agadir, across the Atlas to Aït Ben Haddou and Erg Chebbi — camel trek and a night in a desert camp.', ogImage: '/images/curated/todra-gorge-river-canyon-high-atlas.webp' },
  'family-morocco-adventure': { title: 'Family Morocco Adventure — 9-Day Private & Kid-Friendly Tour', description: 'A 9-day private family tour of Morocco — Marrakech, an Atlas mule ride, a Sahara camel trek and kasbahs, with a relaxed pace designed for kids and parents.', ogImage: '/images/curated/cascading-waterfall-todra-gorge.webp' },
  '2-day-zagora-desert-marrakech': { title: '2-Day Zagora Desert Tour from Marrakech | Morocco', description: 'A private two-day route from Marrakech through Aït Ben Haddou, Ouarzazate and the Draa Valley to Zagora.', ogImage: '/images/catalog/draa-valley-oasis-palm-grove.webp' },
  '4-day-marrakech-merzouga-sahara': { title: '4-Day Marrakech to Merzouga Sahara Tour | Morocco', description: 'Take four days from Marrakech to Merzouga via Aït Ben Haddou, Dades and Todra, with more time around Erg Chebbi.', ogImage: '/images/tours/dune-walk-erg-chebbi.jpg' },
  '5-day-great-south-morocco': { title: '5-Day Great South Morocco Tour | Private Desert Journey', description: 'Explore Aït Ben Haddou, Dades, Todra, Merzouga and the Draa Valley on a private five-day southern Morocco route.', ogImage: '/images/dest/draa-valley.webp' },
  '3-day-fes-merzouga-sahara': { title: '3-Day Private Fes to Merzouga Desert Tour | Morocco', description: "Travel privately from Fes through Ifrane's cedar forest and the Ziz Valley to Merzouga, for a sunset Sahara experience and a night at Erg Chebbi.", ogImage: '/images/catalog/sahara-bivouac-stars-merzouga.webp' },
  '4-day-fes-marrakech-via-merzouga': { title: '4-Day Fes to Marrakech via Merzouga | Morocco Tour', description: 'A private one-way journey from Fes to Marrakech via Merzouga, Todra Gorge, Dades Valley and Aït Ben Haddou.', ogImage: '/images/tours/land-cruiser-todra-gorge.jpg' },
  'fes-4-day': { title: '4-Day Fes to Merzouga Sahara Route', description: 'A private round trip from Fes to the Sahara across the Middle Atlas, the Ziz Valley and the dunes of Erg Chebbi.', ogImage: '/images/curated/tannery-workers-dyeing-pits-fes.webp' },
  'fes-5-day': { title: '5-Day Fes to Marrakech via Merzouga, Dades & the Atlas', description: 'A one-way private route from Fes to Marrakech through the Sahara, the gorges and the High Atlas.', ogImage: '/images/dest/dades-valley.webp' },
  'fes-8-day': { title: '8-Day Fes Imperial Cities & Sahara Grand Tour', description: 'A private eight-day journey from Fes through Meknès, Volubilis and the Sahara to a guided day in Marrakech.', ogImage: '/images/curated/leather-tanning-vats-fes-medina.webp' },
  'agadir-4-day': { title: '4-Day Agadir to Marrakech via Taroudant & the Atlas', description: 'A private route from Agadir to Marrakech through Taroudant, Ouarzazate and Aït Ben Haddou, with time to enjoy Marrakech.', ogImage: '/images/tours/ait-ben-haddou-rooftop-view.jpg' },
  'agadir-5-day': { title: '5-Day Agadir to Marrakech via Ouarzazate & Merzouga', description: 'A one-way private route from Agadir to Marrakech through the kasbahs, the gorges and the Erg Chebbi Sahara.', ogImage: '/images/catalog/berber-camel-guide-sahara-merzouga.webp' },
  'agadir-8-day': { title: '8-Day Agadir Southern Morocco Grand Circuit', description: 'A private eight-day loop from Agadir through Taroudant, Ouarzazate, the Sahara, the Draa Valley and Marrakech.', ogImage: '/images/dest/agadir.webp' },
  'marrakech-4-day': { title: '4-Day Marrakech to Merzouga Sahara Explorer', description: 'A private four-day loop from Marrakech to the Sahara, visiting Aït Ben Haddou, the Dades and Todra gorges and a night in the Erg Chebbi dunes.', ogImage: '/images/tours/guided-walk-todra-gorge.jpg' },
  'casablanca-3-day': { title: '3-Day Private Tour: Casablanca to Fes via Chefchaouen', description: 'A private route from Casablanca to Fes, with a night in blue-washed Chefchaouen, imperial Meknès, Roman Volubilis and a guided day in the Fes medina.', ogImage: '/images/curated/hassan-tower-mohammed-v-mausoleum-rabat.webp' },
  'casablanca-4-day': { title: '4-Day Casablanca to Fes via the Atlantic Coast & Chefchaouen', description: 'A relaxed private route from Casablanca to Fes along the Atlantic coast with Chefchaouen, Meknès and Volubilis.', ogImage: '/images/curated/hassan-ii-mosque-ornate-bronze-door-casablanca.webp' },
  'casablanca-5-day': { title: '5-Day Casablanca to Merzouga & Fes Desert Route', description: 'A private route from Casablanca to Fes and the Sahara, with a night in the Erg Chebbi dunes and a sunset camel trek.', ogImage: '/images/tours/camel-trek-sunset-erg-chebbi.jpg' },
  'casablanca-8-day': { title: '8-Day Casablanca Grand Morocco Circuit (Imperial Cities & Sahara)', description: 'A private eight-day loop from Casablanca through Rabat, Chefchaouen, Fes, the Sahara, the gorges and Marrakech.', ogImage: '/images/curated/hassan-ii-mosque-exterior-arches-golden-hour-casablanca.webp' },
  'tangier-3-day': { title: '3-Day Tangier, Chefchaouen & Tétouan North Morocco Tour', description: 'A private round trip from Tangier through Tétouan, the blue city of Chefchaouen and the Akchour valley waterfalls.', ogImage: '/images/dest/chefchaouen.webp' },
  'tangier-5-day': { title: '5-Day Tangier to Fes via Chefchaouen & the Rif', description: 'A one-way private route from Tangier through Tétouan, Chefchaouen, the Akchour valley and the Middle Atlas to Fes.', ogImage: '/images/dest/akchour.webp' },
  'marrakech-essaouira-2-day': { title: '2-Day Marrakech to Essaouira Atlantic Coast Tour', description: 'A private two-day escape from Marrakech to the Atlantic coast at Essaouira — UNESCO medina, ramparts and the harbour.', ogImage: '/images/catalog/essaouira-sqala-du-port-atlantic.webp' },
  '14-day-grand-morocco-journey': { title: '14-Day Grand Morocco Tour — Coast, Sahara, Imperial Cities & North', description: 'The complete private Morocco circuit: Marrakech, the Atlantic coast, the south, two nights at Erg Chebbi, Fes, Meknès, Chefchaouen and a finish in Casablanca.', ogImage: '/images/curated/panoramic-view-chefchaouen-rif-mountains.webp' },
  // ── Day Trips (first batch — 2026, Product Expansion Audit) ──────────────────
  'marrakech-ourika-valley-day-trip': { title: 'Marrakech to Ourika Valley Day Trip', description: 'A private day trip from Marrakech into the Ourika Valley — Berber villages, the Setti Fatma waterfalls and an argan oil cooperative, under an hour from the city.', ogImage: '/images/dest/ourika-valley.webp' },
  'marrakech-ouzoud-waterfalls-day-trip': { title: 'Marrakech to Ouzoud Waterfalls Day Trip', description: "A private day trip from Marrakech to the Ouzoud Falls — Morocco's best-known waterfalls, about 150 km from the city, with riverside paths and Barbary macaques.", ogImage: '/images/dest/ouzoud.webp' },
  'marrakech-imlil-day-trip': { title: 'Marrakech to Imlil Day Trip', description: 'A private day trip from Marrakech into the High Atlas to Imlil, the Toubkal trailhead village, about 90 minutes from the city.', ogImage: '/images/dest/imlil.webp' },
  'agadir-taghazout-day-trip': { title: 'Agadir to Taghazout Day Trip', description: "A private day trip from Agadir to Taghazout, the Atlantic surf village 20 minutes up the coast — a working harbour, Anchor Point's surf break and seafront cafés.", ogImage: '/images/dest/taghazout.webp' },
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
  meknes:{title:'Meknès — Morocco Tours & Travel Guide',description:'Discover Meknès, an imperial city with historic gates, medina and nearby Volubilis.',ogImage:'/images/og/morocco-grand-adventure-sahara.jpg'},
  casablanca:{title:'Casablanca — Morocco Tours & Travel Guide',description:'Explore Casablanca, Hassan II Mosque and Morocco’s Atlantic gateway.',ogImage:'/images/dest/casablanca.jpg'},
  rabat:{title:'Rabat — Morocco Tours & Travel Guide',description:'Discover Rabat, Morocco’s capital, the Kasbah of the Oudayas and Hassan Tower.',ogImage:'/images/dest/rabat.jpg'},
  merzouga:{title:'Merzouga — Sahara Desert Tours & Travel Guide',description:'The village at the edge of Erg Chebbi — how to reach Merzouga from Marrakech or Fes, what the desert camps are like, and how long to stay in the dunes.',ogImage:'/images/dest/merzouga.jpg'},
  'erg-chebbi':{title:'Erg Chebbi — Sahara Desert Tours & Travel Guide',description:"The tallest dunes in Morocco, right beside Merzouga — how high Erg Chebbi rises, when the light is best, and what a sunset camel trek and camp night involve.",ogImage:'/images/dest/erg-chebbi.jpg'},
  ouarzazate:{title:'Ouarzazate — Morocco Tours & Travel Guide',description:'Explore Ouarzazate, kasbahs, film heritage and the gateway to southern Morocco.',ogImage:'/images/dest/ouarzazate.jpg'},
  'ait-ben-haddou':{title:'Aït Ben Haddou — UNESCO Morocco Tours Guide',description:'The earthen ksar above the Ounila river and a UNESCO World Heritage site — what to see climbing to the granary, and where it sits on a Sahara route.',ogImage:'/images/dest/ait-ben-haddou.jpg'},
  zagora:{title:'Zagora — Sahara Desert Tours & Travel Guide',description:'The Draa valley town where the Sahara begins — how Zagora compares with Erg Chebbi, and what a two-day desert trip from Marrakech actually covers.',ogImage:'/images/dest/zagora.jpg'},
  'dades-valley':{title:'Dades Valley — Valley of a Thousand Kasbahs, Travel Guide',description:'Terraced gardens, canyon walls and kasbahs on every bend, with the famous switchbacks above Boulmane Dades — a classic overnight on the Marrakech–Merzouga route.',ogImage:'/images/dest/dades-valley.jpg'},
  'todra-gorge':{title:'Todra Gorge — Morocco\'s Great Canyon, Travel Guide',description:'300-metre limestone walls narrowing to a 10-metre corridor — rock climbing, riverside walks and the classic stop on every Marrakech–Merzouga route.',ogImage:'/images/dest/todra-gorge.jpg'},
  skoura:{title:'Skoura Oasis — 1,000-Year-Old Palm Grove, Travel Guide',description:'A vast palm oasis on the Road of a Thousand Kasbahs, home to the restored Amridil Kasbah — quieter kasbah culture without the Aït Ben Haddou crowds.',ogImage:'/images/dest/skoura.jpg'},
  'roses-valley':{title:'Valley of Roses — Morocco Tours & Travel Guide',description:'Discover Morocco’s Valley of Roses and its oasis landscapes.',ogImage:'/images/dest/roses-valley.jpg'},
  'draa-valley':{title:'Draa Valley — Morocco Tours & Travel Guide',description:"The longest river valley in Morocco — palm groves, earthen kasbahs and the road south through Agdz and Zagora, with the stops worth making along the way.",ogImage:'/images/dest/draa-valley.jpg'},
  chefchaouen:{title:'Chefchaouen — Morocco Tours & Travel Guide',description:'Discover Chefchaouen, the blue medina in Morocco’s Rif Mountains.',ogImage:'/images/dest/chefchaouen.jpg'},
  imlil:{title:'Imlil — Atlas Mountains Tours & Travel Guide',description:'Explore Imlil and the Atlas Mountains, Berber villages and trekking routes.',ogImage:'/images/dest/imlil.jpg'},
  'ourika-valley':{title:'Ourika Valley — Morocco Tours & Travel Guide',description:'Discover Ourika Valley, mountain landscapes and Berber villages near Marrakech.',ogImage:'/images/dest/ourika-valley.jpg'},
  ouzoud:{title:'Ouzoud Waterfalls — Morocco Tours & Travel Guide',description:'Visit Ouzoud Waterfalls and explore the surrounding Middle Atlas landscapes.',ogImage:'/images/dest/ouzoud.jpg'},
  ifrane:{title:'Ifrane & Cedar Forest — Morocco Tours & Travel Guide',description:'Discover Ifrane and the cedar forests of Morocco’s Middle Atlas.',ogImage:'/images/og/morocco-grand-adventure-sahara.jpg'},
  essaouira:{title:'Essaouira — Morocco Tours & Travel Guide',description:'Explore Essaouira, its Atlantic medina, harbour and coastal atmosphere.',ogImage:'/images/dest/essaouira.jpg'},
  agadir:{title:'Agadir — Morocco Tours & Travel Guide',description:'Discover Agadir, its Atlantic coast and beaches in southern Morocco.',ogImage:'/images/dest/agadir.jpg'},
  taghazout:{title:'Taghazout — Morocco Surf Tours & Travel Guide',description:'Explore Taghazout and Morocco’s Atlantic surf coast.',ogImage:'/images/dest/taghazout.jpg'},
  legzira:{title:'Legzira Beach — Morocco Tours & Travel Guide',description:'Discover Legzira and its dramatic Atlantic coastline.',ogImage:'/images/dest/legzira.jpg'},
  'el-jadida':{title:'El Jadida — Portuguese Citadel on the Atlantic, Travel Guide',description:'The former Portuguese Mazagan — a UNESCO-listed 16th-century fortress with its famous cistern, ramparts walks and grilled fish by the old port.',ogImage:'/images/dest/el-jadida.jpg'},
  tangier:{title:'Tangier — Morocco\'s Gateway to Europe, Travel Guide',description:'Where the Atlantic meets the Mediterranean — the Kasbah, the Caves of Hercules, a past as an international zone, and under an hour by ferry from Spain.',ogImage:'/images/dest/tangier.jpg'},
  tetouan:{title:'Tétouan — Morocco Tours & Travel Guide',description:'Explore Tétouan and its historic white medina in northern Morocco.',ogImage:'/images/dest/tetouan.jpg'},
  akchour:{title:'Akchour & God’s Bridge — Morocco Tours & Travel Guide',description:"Waterfalls and blue-green pools in the Rif above Chefchaouen — the walk up to the cascades and God's Bridge, how long it takes and what the trail is like.",ogImage:'/images/dest/akchour.jpg'},
  nkob:{title:'Nkob — The Village of 45 Kasbahs, Travel Guide',description:'A remote village in the Jbel Saghro foothills known for its 45 historic kasbahs, dark-sky stargazing and treks that avoid the Toubkal crowds.',ogImage:'/images/dest/nkob.jpg'},
  mirleft:{title:'Mirleft — Wild Atlantic Surf Village, Travel Guide',description:'An unspoilt surf and fishing village between Tiznit and Sidi Ifni — cliff-top sunsets, the Marabout surf break and quiet coves away from the crowds.',ogImage:'/images/dest/mirleft.jpg'},
};

export const routeMetadata: Record<string, RouteMeta> = {
  '/':HOME_META,
  // City-tour landing hubs — previously fell through to HOME_META, which made
  // these routes duplicate the homepage title in all 11 locales (SEO Phase 1).
  '/agadir-tours':{title:'Agadir, Morocco — Private Sahara Tours & Day Trips',description:'Private tours from Agadir to the Sahara, Paradise Valley and the Atlantic coast — flexible itineraries with local guides and transparent pricing.',ogImage:'/images/dest/agadir.jpg'},
  '/casablanca-tours':{title:'Casablanca, Morocco — Tours to Fes, Rabat & Sahara',description:'Private tours from Casablanca to Fes, Rabat, Chefchaouen and the Sahara — airport pickup, flexible pacing and local expert guides.',ogImage:'/images/dest/casablanca.jpg'},
  '/destinations':{title:'Morocco Destinations — Sahara, Imperial Cities, Atlas Mountains',description:'Explore Morocco’s top destinations including Marrakech, Fes, Merzouga, Chefchaouen, the Atlas Mountains and Atlantic coast.',ogImage:'/images/dest/merzouga.jpg'},
  '/tours':{title:'Morocco Tours & Private Itineraries — 2 to 14 Day Adventures',description:'Browse private Morocco tours, Sahara journeys, imperial cities, family adventures and honeymoon itineraries.',ogImage:'/images/library/camel-caravan-erg-chebbi-day-morocco-mga-024.jpg'},
  '/trip-finder':{title:'Find Your Morocco Trip — Trip Finder',description:'Answer three quick questions and find real Morocco tours that match your dates, starting city and interests — no invented prices or fake availability.',ogImage:'/images/library/camel-caravan-erg-chebbi-day-morocco-mga-024.jpg'},
  '/tours/from-marrakech':{title:'Tours From Marrakech — Private Sahara & Morocco Tours',description:'Private Morocco tours departing Marrakech, including Sahara and southern Morocco routes.',ogImage:'/images/dest/marrakech.jpg'},
  '/tours/from-casablanca':{title:'Tours From Casablanca — Private Morocco Itineraries',description:'Plan a private Morocco itinerary starting in Casablanca.',ogImage:'/images/dest/casablanca.jpg'},
  '/tours/from-fes':{title:'Tours From Fes — Private Morocco & Sahara Tours',description:'Private tours from Fes including imperial cities, Chefchaouen and Sahara routes.',ogImage:'/images/dest/fes.jpg'},
  '/tours/from-agadir':{title:'Tours From Agadir — Coast & Sahara Private Tours',description:'Private Morocco journeys starting in Agadir and exploring the Atlantic coast and south.',ogImage:'/images/dest/agadir.jpg'},
  // The Tangier hub already gets a localized title/description from the
  // hub_tangier_title/hub_tangier_intro path in getLocalizedRouteMeta, which
  // takes priority over this flat entry — so this entry doesn't change
  // title/description. What was actually missing here was explicit route
  // metadata for this hub, and specifically a Tangier ogImage: without it,
  // social shares fell back to the generic homepage Sahara photo instead of
  // a Tangier-specific image.
  '/tours/from-tangier':{title:'Tours From Tangier — Private Rif & Chefchaouen Tours',description:'Private Morocco tours departing Tangier — Chefchaouen, Tétouan and the Rif Mountains, with a one-way route on to Fes.',ogImage:'/images/dest/tangier.jpg'},
  '/tours/from-marrakech/3-days':{title:'3-Day Tours From Marrakech — Sahara Desert & Merzouga',description:'Explore the High Atlas, Aït Ben Haddou, Dades Valley and Merzouga on a three-day route.',ogImage:'/images/dest/marrakech.jpg'},
  '/gallery':{title:'Morocco Photo & Video Gallery — Sahara & Morocco',description:'Photos and videos from Morocco’s Sahara, medinas, mountains and desert camps.',ogImage:'/images/hero/atlas-pano.jpg'},
  '/trip-builder':{title:'Build Your Morocco Itinerary — Private & Custom Trip Planner',description:'Design a private Morocco trip in minutes — pick your dates, departure city, length and interests, then get a real personalised quote from our local Sahara team.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/build-your-day-trip':{title:'Build Your Day Trip in Morocco — One-Day Experiences',description:'Plan a personalized one-day Morocco experience with same-day return. Choose your departure, destination, date and preferences.',ogImage:'/images/dest/ouzoud.jpg'},
  // Student Tours: title trimmed to 55 chars so it clears the 70-char SEO audit
  // rule while keeping the primary keyword ("student tours Morocco") in front.
  '/student-tours/3-day-morocco-student-tour':{title:"3-Day Morocco Student Tour | Marrakech, Atlas & Sahara",description:"A three-day student route from Marrakech over the High Atlas to Aït Ben Haddou and the Erg Chebbi dunes at Merzouga. For university and student groups.",ogImage:'/images/student-tours/og-student-tours.jpg'},
  '/student-tours/4-day-morocco-student-tour':{title:"4-Day Morocco Student Tour | Atlas, Oasis Valleys & Sahara",description:"A four-day student route from Marrakech to Aït Ben Haddou, the Dades and Todra valleys and two nights in the Erg Chebbi desert. For university and student groups.",ogImage:'/images/student-tours/og-student-tours.jpg'},
  '/student-tours/5-day-morocco-student-tour':{title:"5-Day Morocco Student Tour | Marrakech, Sahara & Merzouga",description:"A five-day student route from Marrakech over the High Atlas to Aït Ben Haddou and two nights in the Erg Chebbi desert at Merzouga. For university and student groups.",ogImage:'/images/student-tours/og-student-tours.jpg'},
  '/student-tours/10-day-morocco-student-tour':{title:"10-Day Morocco Student Tour | Imperial Cities, Rif & Sahara",description:"A ten-day student route linking Marrakech, Aït Ben Haddou, the Erg Chebbi Sahara, Fes and Chefchaouen. For university and student groups.",ogImage:'/images/student-tours/og-student-tours.jpg'},
  '/student-tours/university-groups':{title:'University Group Travel Morocco | Student Tours',description:'How group size, lead time and logistics shape a Moroccan student programme \u2014 from small groups to larger groups considered with advance planning.',ogImage:'/images/student-tours/og-student-tours.jpg'},
  '/student-tours':{title:'Student Trips to Morocco | University & Group Travel',description:'Small-group student trips to Morocco for university and school groups — Marrakech, Aït Ben Haddou and a night in the Sahara at Merzouga. New dates released weekly.',ogImage:'/images/student-tours/og-student-tours.jpg'},
  '/about':{title:'About Us | Morocco, Beyond the Journey',description:'Meet Morocco Grand Adventure — desert guides from Merzouga sharing the whole of Morocco through private, locally-designed journeys.',ogImage:'/images/about/about-dune-1600.webp'},
  '/contact':{title:'Contact Morocco Grand Adventure — Plan Your Morocco Journey',description:'Contact Morocco Grand Adventure by WhatsApp, email or phone to plan your Morocco journey.',ogImage:'/images/dest/merzouga.jpg'},
  '/desert-tours':{title:'Sahara Desert Tours in Morocco — Private Trips to Merzouga',description:'Private Sahara desert tours in Morocco — from Marrakech, Fes, Casablanca or Agadir, 2 to 14 days, camel trekking at Erg Chebbi and a night at a Merzouga desert camp.',ogImage:'/images/dest/merzouga.jpg'},
  '/luxury-camp':{title:'Luxury Desert Camp Morocco — Sahara Glamping',description:'What a luxury desert camp near Merzouga includes — private tents with real beds, en-suite bathrooms, camp dinners under the stars and how to book a night.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/camel-trekking':{title:'Camel Trekking Merzouga — Sahara Camel Rides',description:'Ride camels across the golden dunes of Erg Chebbi with local guides — what a sunset trek involves, what to wear, and how the camp night that follows works.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  '/4x4-tours':{title:'4x4 Desert Tours Morocco — Sahara Off-Road Adventures',description:'Explore Erg Chebbi and the Sahara by 4x4 with local guides — dune driving, oasis and nomad stops around Merzouga, and what a half- or full-day tour covers.',ogImage:'/images/dest/erg-chebbi.jpg'},
  '/marrakech-tours':{title:'Marrakech Tours — Private Day Trips & Morocco Tours',description:'Private tours from Marrakech — day trips to the Atlas, Aït Ben Haddou and Ouzoud, plus multi-day journeys south to Merzouga and the Sahara dunes.',ogImage:'/images/dest/marrakech.jpg'},
  '/fes-tours':{title:'Fes Tours — Private Guided Morocco Tours',description:'Explore Fes, Chefchaouen and northern Morocco with local guides — Middle Atlas crossings, Ziz Valley drives and private routes from Fes toward Merzouga.',ogImage:'/images/dest/fes.jpg'},
  '/day-trips':{title:'Morocco Day Trips — Personalized One-Day Experiences',description:'Explore Morocco on a one-day experience with same-day return. Request a personalized route and quote.',ogImage:'/images/dest/ouzoud.jpg'},
  '/merzouga-guide':{title:'Merzouga Travel Guide — Sahara Desert & Erg Chebbi',description:'A practical guide to the Merzouga Sahara — getting there, when to go, camel trekking, what the desert camps are like, how many days you need and what to pack.',ogImage:'/images/library/erg-chebbi-dunes-blue-hour-morocco-mga-033.jpg'},
  '/travel-info':{title:'Morocco Travel Information — Practical Guides from Locals',description:'Practical Morocco travel information from a local team — when to go, what to pack and how to get around.',ogImage:'/images/catalog/draa-valley-oasis-palm-grove.webp'},
  '/travel-info/best-time-to-visit-morocco':{title:'Best Time to Visit Morocco — Season-by-Season Guide',description:'When to visit Morocco: spring and autumn for most regions, how summer and winter differ between the coast, mountains and Sahara.',ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/travel-info/what-to-pack-morocco':{title:'What to Pack for Morocco — Practical Packing List',description:'A realistic Morocco packing list: layers for cold desert nights, sun protection, footwear for medinas and dunes.',ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/travel-info/getting-around-morocco':{title:'Getting Around Morocco — Transport Options Explained',description:'Trains, buses and private drivers in Morocco — realistic driving times between Marrakech, Fes and the Sahara.',ogImage:'/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp'},
  '/travel-info/morocco-basics':{title:'Morocco Basics — Where It Is, Language, Currency & Government Explained',description:'The essential facts for a first-time visitor: where Morocco is, which languages are spoken, the currency and visa basics, and how the country is organized by region.',ogImage:'/images/dest/marrakech.webp'},
  '/travel-info/atlas-mountains-guide':{title:'Atlas Mountains Morocco — High Atlas, Imlil, Toubkal & Ourika Guide',description:'The Atlas Mountains explained for travelers — High Atlas, Middle Atlas and Anti-Atlas, Toubkal and Imlil, the Ourika Valley, and how a mountain day fits into a Marrakech trip.',ogImage:'/images/hero/atlas-pano.webp'},
  '/travel-info/amazigh-berber-culture':{title:'Amazigh (Berber) Culture in Morocco — A Traveler\'s Introduction',description:'An introduction to Amazigh (Berber) culture in Morocco for travelers — language, where communities live, kasbah architecture, crafts, music and how to visit respectfully.',ogImage:'/images/library/dades-valley-village-atlas-morocco-mga-036.jpg'},
  '/travel-info/morocco-travel-safety':{title:'Is Morocco Safe? A Practical Morocco Travel Safety Guide',description:'An honest, practical Morocco safety guide — common scams and how to avoid them, solo and women travelers, the 2023 earthquake explained, heat safety in summer and August, and real emergency numbers.',ogImage:'/images/personal/guide-guest-tea.webp'},
  '/travel-info/moroccan-food-and-cuisine':{title:'Moroccan Food Guide — Tagine, Couscous, Mint Tea & What to Eat',description:'A traveler\'s guide to Moroccan food — tagine and couscous explained, the mint tea ritual, street food and spices, sweets and Ramadan dishes, and how to eat well on a Morocco trip.',ogImage:'/images/catalog/moroccan-mezze-couscous-tagine.webp'},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Moroccan Souks Guide — Shopping, Bargaining & What to Buy',description:'A practical guide to Morocco\'s souks — how Marrakech\'s and Fes\'s market quarters are laid out, how bargaining actually works, and what to buy (and from whom) for something that lasts.',ogImage:'/images/library/marrakech-souk-aerial-view-mga-009.jpg'},
  '/travel-info/morocco-airports-guide':{title:'Which Morocco Airport Should You Fly Into? — Travel Guide',description:'Marrakech, Casablanca, Fes, Tangier or Agadir — which Morocco airport to fly into for the Sahara, the Atlas, the imperial cities or northern Morocco, and why it matters.',ogImage:'/images/library/jemaa-el-fna-day-marrakech-mga-018.jpg'},
  '/travel-info/marrakech-safety-guide':{title:'Is Marrakech Safe? A Practical Marrakech Travel Safety Guide',description:'Is Marrakech safe? An honest, practical guide to Medina navigation, Jemaa el-Fna, common scams, taxis, solo travelers and what to know before your trip.',ogImage:'/images/library/jemaa-el-fna-day-marrakech-mga-018.jpg'},
  '/things-to-do-in-morocco':{title:'25 Things to Do in Morocco — A Local Guide',description:'Twenty-five things worth doing in Morocco — Erg Chebbi, the Fes medina, the Todra Gorge, the Atlantic coast — with where each one is and what it is like.',ogImage:'/images/library/jemaa-el-fna-day-marrakech-mga-018.jpg'},
  '/book':{title:'Book a Morocco Tour — Request Your Dates, Pay Later',description:'Send your dates, group size and route to Morocco Grand Adventure. We confirm the itinerary and your quote first; payment terms are agreed before you pay.',ogImage:'/images/personal/guests-van.jpg'},
  '/faq':{title:'Morocco Travel FAQ — Questions About Tours & Travel',description:'Answers to common Morocco travel, desert tour, packing and booking questions.',ogImage:'/images/dest/merzouga.jpg'},
    '/blog':{title:'Morocco Travel Blog — Guides, Tips & Inspiration',description:'Morocco travel guides and practical advice from local Sahara specialists.',ogImage:'/images/og/morocco-grand-adventure-sahara.jpg'},
  '/merzouga-guide/camel-trekking':{title:'Camel Trekking in Merzouga — What to Expect at Erg Chebbi',description:"What a camel trek near Merzouga is really like — timing, what to wear, mounting tips, and what happens at camp afterward.",ogImage:'/images/library/camel-caravan-erg-chebbi-day-morocco-mga-024.jpg'},
  '/merzouga-guide/desert-camps':{title:'Merzouga Desert Camps — Standard vs Luxury Guide',description:"Choose a desert camp in the Erg Chebbi dunes — tents, bathrooms, meals and what a night in camp includes.",ogImage:'/images/library/date-palm-desert-camp-erg-chebbi-morocco-mga-034.jpg'},
  '/merzouga-guide/luxury-desert-camps':{title:'Luxury Desert Camps Merzouga — What You Get',description:"Real look at luxury Sahara camps near Merzouga — en-suite tents, real beds, hot showers and what makes the step up worthwhile.",ogImage:'/images/library/luxury-desert-camp-entrance-erg-chebbi-mga-005.jpg'},
  '/merzouga-guide/best-time-to-visit':{title:'Best Time to Visit Merzouga — Month-by-Month Guide',description:"When to visit Merzouga for the Sahara — temperatures, crowds and the best months for camel trekking and camps.",ogImage:'/images/library/erg-chebbi-dunes-golden-hour-morocco-mga-029.jpg'},
  '/merzouga-guide/how-to-get-there':{title:'How to Get to Merzouga — From Marrakech & Fes',description:"Realistic driving times and transport options from Marrakech, Fes, Ouarzazate and Agadir to Merzouga and Erg Chebbi.",ogImage:'/images/library/private-fleet-dunes-merzouga-morocco-mga-041.jpg'},
  '/merzouga-guide/erg-chebbi':{title:'Erg Chebbi Dunes — How Tall They Are & What to Do',description:"Morocco’s tallest Sahara dunes, right by Merzouga — how high Erg Chebbi rises, the best time for the light, and what a sunset camel trek and camp night involve.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/merzouga-guide/what-to-pack':{title:'What to Pack for Merzouga — Sahara Packing List',description:"Practical packing list for a Merzouga desert night — layers, sun protection, footwear and what NOT to bring.",ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/merzouga-guide/faq':{title:'Merzouga FAQ — Sahara Questions Answered',description:"Straight answers to the most common Merzouga and Sahara questions — planning, getting there and camp nights.",ogImage:'/images/dest/merzouga.webp'},
  '/merzouga-guide/quad-biking':{title:'Quad Biking Merzouga — Sahara Quad Bike Tours at Erg Chebbi',description:"What quad biking in Merzouga is really like — the Erg Chebbi terrain, what to wear, when to ride and how a session fits around camel trekking and a camp night.",ogImage:'/images/student-tours/sahara-moonrise-vertical.jpg'},
  '/merzouga-guide/4x4-desert-tour':{title:'Merzouga 4x4 Desert Tour — Dune Driving at Erg Chebbi',description:"What a 4x4 desert tour around Merzouga and Erg Chebbi involves — dune driving, the landscapes beyond the village, cultural stops and practical expectations.",ogImage:'/images/library/4x4-dune-bashing-sahara-morocco-mga-006.jpg'},
  '/merzouga-guide/things-to-do':{title:'Things to Do in Merzouga — Camel Treks, Quads, 4x4s & Camps',description:"All the things to do in Merzouga in one place — camel trekking on Erg Chebbi, quad biking, 4x4 tours, luxury camps, sunrise spots and how to combine them.",ogImage:'/images/library/land-cruiser-camel-caravan-erg-chebbi-mga-042.jpg'},
  '/merzouga-guide/marrakech-to-merzouga':{title:'Marrakech to Merzouga — Route, Stops & How Many Days',description:"The real route from Marrakech to Merzouga — the High Atlas, Aït Ben Haddou, the Dades and Todra valleys, and whether to do it in 3 or 4 days.",ogImage:'/images/library/ait-ben-haddou-rooftop-view-morocco-mga-037.jpg'},
  '/merzouga-guide/fes-to-merzouga':{title:'Fes to Merzouga — Route Guide & Desert Itinerary',description:"Fes to Merzouga route guide — Ifrane, the Middle Atlas cedar forests, Midelt, the Ziz Valley and Erg Chebbi, with realistic planning.",ogImage:'/images/dest/ifrane.webp'},
  '/merzouga-guide/how-many-days':{title:'How Many Days in the Sahara? — Merzouga Trip Length Guide',description:"How many days you need in the Sahara and Merzouga — an honest comparison of 1, 2, 3 and 4+ day desert trips and what each length realistically covers.",ogImage:'/images/personal/sahara-dunes-golden.jpg'},
  '/merzouga-guide/sahara-desert-guide':{title:'Sahara Desert Travel Guide — Morocco Desert Trips & Erg Chebbi',description:"The complete Morocco Sahara guide — Erg Chebbi, Merzouga, camel trekking, desert camps, quad and 4x4 experiences, and how Marrakech and Fes reach the dunes.",ogImage:'/images/library/erg-chebbi-camel-trekking-sunset-morocco-mga-001.jpg'},
  '/merzouga-guide/erg-chebbi-sunrise-sunset':{title:'Erg Chebbi Sunrise & Sunset — Best Light on the Sahara Dunes',description:"When and where to see the best sunrise and sunset at Erg Chebbi near Merzouga — seasonal timings, photography notes and how treks and camp nights fit the light.",ogImage:'/images/library/couple-sunset-erg-chebbi-morocco-mga-031.jpg'},
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
  'morocco-packing-list-desert':{title:'Morocco Desert Packing List — What to Bring',description:'Practical essentials to pack for a Morocco Sahara trip — layers for cold desert nights, sun protection, dune-ready footwear, and what not to bring to camp.',ogImage:'/images/personal/guests-sunset-trimmed.jpg'},
  'fes-chefchaouen-blue-city-guide':{title:'Fes to Chefchaouen — Morocco Blue City Guide',description:'Plan a journey from Fes to Chefchaouen and explore Morocco’s blue medina.',ogImage:'/images/dest/chefchaouen.jpg'},
  'marrakech-to-merzouga-3-day-sahara-tour':{title:'Marrakech to Merzouga — What the 3-Day Sahara Tour Is Like',description:'The High Atlas, Aït Ben Haddou, the Dades and Todra valleys, then a night in the Erg Chebbi dunes — what the 3-day Marrakech to Merzouga tour is actually like.',ogImage:'/images/curated/ait-ben-haddou-footbridge-ounila-river.webp'},
  'fes-to-merzouga-sahara-desert-tour':{title:'Fes to Merzouga — The Sahara Tour Through the Middle Atlas',description:'Cedar forests, Ifrane and the Ziz Valley — how the Fes to Merzouga route offers a shorter, different way into the Sahara than the Marrakech crossing.',ogImage:'/images/dest/fes.jpg'},
  'marrakech-ouarzazate-merzouga-great-south-morocco':{title:'Marrakech, Ouarzazate & Merzouga — Morocco’s Great South',description:'Ouarzazate, the Dades and Todra valleys, a slower Sahara day, then a return through the Draa Valley and Nkob — the fuller 5-day version of Morocco’s Sahara route.',ogImage:'/images/dest/ouarzazate.jpg'},
  'morocco-first-time-visitor-mistakes':{title:'10 Mistakes First-Time Visitors Make in Morocco',description:'The practical mistakes that catch first-time visitors out in Morocco — taxi fares, souk bargaining, medina directions, dress and more — and how to avoid each one.',ogImage:'/images/personal/marrakech-souk-minaret.jpg'},
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
/** Share images whose filename alone would describe them poorly (alt follows the photo's own record). */
const OG_IMAGE_ALTS: Record<string, string> = {
  '/images/og/morocco-grand-adventure-sahara.jpg': 'Berber guide leading a camel caravan across the Erg Chebbi dunes at dusk',
  '/images/tours/camel-trek-sunset-erg-chebbi.jpg': 'Berber guide leading a camel caravan across the Erg Chebbi dunes at dusk',
  '/images/tours/couple-sunset-erg-chebbi.jpg': 'Silhouette of a couple watching the sunset from an Erg Chebbi dune',
  '/images/tours/dune-walk-erg-chebbi.jpg': 'Woman in a teal dress on the rippled Erg Chebbi dunes at golden hour',
  '/images/tours/camels-beach-agadir.jpg': 'Camels resting on a wide Atlantic beach in Agadir',
  '/images/tours/ait-ben-haddou-ounila-reflection.jpg': 'The Aït Ben Haddou ksar reflected in the Ounila river',
  '/images/tours/ait-ben-haddou-rooftop-view.jpg': 'Traveller in a striped robe overlooking the Aït Ben Haddou ksar from a rooftop',
  '/images/tours/land-cruiser-todra-gorge.jpg': 'Black Land Cruiser at the entrance to the Todra Gorge',
  '/images/tours/guided-walk-todra-gorge.jpg': 'A Berber guide leading a group of travellers through the Todra Gorge',
  '/images/hero/atlas-pano.jpg': 'Moroccan kasbah gateway on a desert road with the snow-capped High Atlas behind',
  '/images/personal/guests-sunset-trimmed.jpg': 'A local guide and two travellers in desert headscarves and sunglasses on the Sahara dunes at sunset',
};
export function ogImageAlt(ogImage?: string): string {
  if (!ogImage) return 'Morocco Grand Adventure — private journeys through Morocco';
  if (OG_IMAGE_ALTS[ogImage]) return OG_IMAGE_ALTS[ogImage];
  const dest = ogImage.match(/\/images\/dest\/([a-z-]+)\.(?:jpg|webp)$/);
  if (dest) {
    const place = destinations.find((d) => d.id === dest[1]);
    // Neither a placeholder nor an unverified photograph may name the place.
    if (place && !place.imageDecorative && !place.imageUnverified) return `${place.name}, Morocco — ${place.shortDesc}`;
  }
  if (ogImage.includes('/images/library/')) {
    const photo = Object.values(PHOTO_LIBRARY).find((a) => a.src === ogImage);
    if (photo) return photo.alt;
  }
  if (ogImage.includes('/images/catalog/')) {
    const id = (ogImage.split('/').pop() || '').replace(/\.webp$/i, '');
    const img = catalogImage(id);
    if (img) return img.alt;
  }
  return humanizeAlt(ogImage);
}

const AR_ROUTE_META: Record<string,RouteMeta> = {
  "/gallery":{title:"صور وفيديوهات من المغرب — الصحراء والمدن العتيقة",description:"صور ومقاطع من الصحراء والمدن العتيقة والجبال ومخيمات الصحراء في المغرب."},
  "/travel-info":{title:"معلومات عملية للسفر إلى المغرب — من فريق محلي",description:"معلومات عملية للسفر في المغرب: متى تزور، وماذا تحزم، وكيف تتنقل."},
  '/student-tours/university-groups':{title:"سفر المجموعات الجامعية إلى المغرب | رحلات طلابية",description:"كيف يؤثر حجم المجموعة والمهلة الزمنية واللوجستيات على برنامج طلابي في المغرب — من مجموعات صغيرة إلى مجموعات أكبر بتخطيط مسبق."},
  '/student-tours':{title:"رحلات طلابية إلى المغرب | سفر جامعي وتعليمي",description:"برامج سفر طلابية وجامعية في المغرب — ثقافة وتاريخ والصحراء ومغامرة، تُنظَّم لمجموعات طلابية وجامعية."},
  '/':{title:'رحلات المغرب — جولات الصحراء ومراكش',description:'رحلات خاصة في المغرب تشمل مرزوكة والصحراء ومراكش وفاس والمدن الإمبراطورية مع خبراء محليين.'},
  '/tours':{title:'جولات المغرب — رحلات الصحراء والمدن الإمبراطورية',description:'تصفح جولات المغرب الخاصة ورحلات الصحراء من مراكش ومرزوكة والمدن الإمبراطورية.'},
  '/trip-finder':{title:'ابحث عن رحلتك إلى المغرب',description:'أجب عن ثلاثة أسئلة سريعة واعثر على جولات مغربية حقيقية تناسب تواريخك ومدينة انطلاقك واهتماماتك.'},
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
  '/agadir-tours':{title:'جولات أغادير — رحلات خاصة في المغرب',description:'اكتشف أغادير والرحلات الخاصة إلى الساحل الأطلسي والصحراء.'},
  '/casablanca-tours':{title:'جولات الدار البيضاء — رحلات خاصة في المغرب',description:'اكتشف الدار البيضاء والرحلات الخاصة إلى فاس والرباط والصحراء.'},
  '/4x4-tours':{title:'جولات الصحراء بسيارات 4x4 في المغرب',description:'استكشف إيرج شبي والصحراء بسيارات 4x4 مع مرشدين محليين حول مرزوكة.'},
  '/contact':{title:'اتصل بنا — حجز رحلات المغرب',description:'تواصل معنا عبر واتساب أو البريد لتخطيط رحلتك الخاصة في المغرب.'},
  '/about':{title:'من نحن | المغرب، ما وراء الرحلة',description:'تعرّف على فريق Morocco Grand Adventure — مرشدون صحراويون من مرزوكة يصممون رحلات خاصة عبر المغرب.'},
  '/faq':{title:'أسئلة شائعة عن السفر إلى المغرب',description:'إجابات عن أسئلة السفر والجولات الصحراوية والحجز في المغرب.'},
  '/blog':{title:'مدونة السفر في المغرب — أدلة ونصائح',description:'أدلة ونصائح عملية للسفر في المغرب من خبراء محليين.'},
  '/tours/3-day-sahara-marrakech':{title:'جولة فاخرة لمدة 3 أيام إلى صحراء مرزوكة من مراكش',description:'عبور جبال الأطلس الكبير إلى آيت بن حدو، ووادي دادس ووادي تودرا، ثم ركوب الجمال عند الغروب في إيرج شبي مع ليلة في مخيم صحراوي فاخر.'},
  '/tours/3-day-sahara-agadir':{title:'جولة خاصة لمدة 3 أيام إلى صحراء مرزوكة من أغادير',description:'رحلة خاصة لمدة ثلاثة أيام من أغادير إلى صحراء مرزوكة عبر جنوب المغرب وورزازات، مع تأكيد المسار والمبيت في الصحراء حسب تواريخ رحلتك.'},
  '/tours/5-day-imperial-cities':{title:'جولة 5 أيام: المدن الإمبراطورية وصحراء المغرب',description:'اكتشف مراكش ومكناس وفاس وشفشاون قبل ليلة في الصحراء، في رحلة خاصة عبر المغرب.'},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'جولة 7 أيام: المدن الإمبراطورية والصحراء',description:'سبعة أيام في رحلة خاصة من مراكش إلى الصحراء وعودة — آيت بن حدو، وادي دادس ووادي تودرا، ليلتان في إيرج شبي، ومدينة فاس الإمبراطورية.'},
  '/tours/honeymoon-morocco':{title:'شهر عسل رومانسي في المغرب — جولة خاصة فاخرة لمدة 10 أيام',description:'رحلة خاصة رومانسية في المغرب تجمع بين المدن وتجارب الصحراء ولحظات مخصصة للزوجين.'},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'جولة 8 أيام: مراكش والصويرة وأغادير والصحراء',description:'ثمانية أيام في رحلة خاصة من مراكش إلى الصويرة وأغادير، عبر جبال الأطلس إلى آيت بن حدو وإيرج شبي — ركوب جمال وليلة في الصحراء.'},
  '/tours/family-morocco-adventure':{title:'رحلة عائلية إلى المغرب — جولة خاصة لمدة 9 أيام للأطفال',description:'جولة عائلية خاصة لمدة 9 أيام في المغرب — مراكش، وركوب البغال في الأطلس، والجمال في الصحراء، والقصبات، بوتيرة تناسب الأطفال والوالدين.'},
  '/tours/2-day-zagora-desert-marrakech':{title:'جولة 2 أيام إلى صحراء زاكورة من مراكش',description:'رحلة خاصة لمدة يومين من مراكش عبر آيت بن حدو وورزازات ووادي درعة إلى زاكورة.'},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'جولة 4 أيام من مراكش إلى صحراء مرزوكة',description:'أربعة أيام من مراكش إلى مرزوكة عبر آيت بن حدو ووادي دادس وتودرا، مع وقت أطول في كثبان إيرج شبي.'},
  '/tours/5-day-great-south-morocco':{title:'جولة 5 أيام في الجنوب المغربي الكبير',description:'اكتشف آيت بن حدو ووادي دادس وتودرا ومرزوكة ووادي درعة في رحلة خاصة لمدة خمسة أيام في جنوب المغرب.'},
  '/tours/3-day-fes-merzouga-sahara':{title:'جولة خاصة لمدة 3 أيام من فاس إلى صحراء مرزوكة',description:'سافر في رحلة خاصة من فاس عبر غابة الأرز في إيفران ووادي زيز إلى مرزوكة، لمشاهدة غروب الشمس في الصحراء وليلة في إيرج شبي.'},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'جولة 4 أيام من فاس إلى مراكش عبر مرزوكة',description:'رحلة خاصة في اتجاه واحد من فاس إلى مراكش عبر مرزوكة، ووادي تودرا، ووادي دادس، وآيت بن حدو.'},
  '/tours/fes-4-day':{title:'مسار 4 أيام من فاس إلى صحراء مرزوكة',description:'رحلة خاصة ذهابًا وعودة من فاس إلى الصحراء، عبر الأطلس المتوسط ووادي زيز وكثبان إيرج شبي.'},
  '/tours/fes-5-day':{title:'5 أيام من فاس إلى مراكش عبر مرزوكة ودادس والأطلس',description:'رحلة خاصة في اتجاه واحد من فاس إلى مراكش عبر الصحراء والوديان وجبال الأطلس الكبير.'},
  '/tours/fes-8-day':{title:'جولة كبرى 8 أيام: المدن الإمبراطورية من فاس والصحراء',description:'رحلة خاصة لمدة ثمانية أيام من فاس عبر مكناس ووليلي والصحراء، مع يوم بمرشد في مراكش.'},
  '/tours/agadir-4-day':{title:'4 أيام من أغادير إلى مراكش عبر تارودانت والأطلس',description:'رحلة خاصة من أغادير إلى مراكش عبر تارودانت وورزازات وآيت بن حدو، مع وقت للاستمتاع بمراكش.'},
  '/tours/agadir-5-day':{title:'5 أيام من أغادير إلى مراكش عبر ورزازات ومرزوكة',description:'رحلة خاصة في اتجاه واحد من أغادير إلى مراكش عبر القصبات والوديان وصحراء إيرج شبي.'},
  '/tours/agadir-8-day':{title:'جولة كبرى 8 أيام في جنوب المغرب من أغادير',description:'رحلة خاصة لمدة ثمانية أيام من أغادير عبر تارودانت وورزازات والصحراء ووادي درعة ومراكش.'},
  '/tours/marrakech-4-day':{title:'جولة استكشافية 4 أيام: من مراكش إلى صحراء مرزوكة',description:'رحلة خاصة لمدة أربعة أيام من مراكش إلى الصحراء، مع آيت بن حدو ووادي دادس وتودرا وليلة في كثبان إيرج شبي.'},
  '/tours/casablanca-3-day':{title:'جولة خاصة 3 أيام: من الدار البيضاء إلى فاس عبر شفشاون',description:'رحلة خاصة من الدار البيضاء إلى فاس، مع ليلة في مدينة شفشاون الزرقاء، ومكناس الإمبراطورية، ووليلي الرومانية، ويوم بمرشد في مدينة فاس القديمة.'},
  '/tours/casablanca-4-day':{title:'4 أيام من الدار البيضاء إلى فاس عبر الساحل الأطلسي وشفشاون',description:'رحلة خاصة هادئة من الدار البيضاء إلى فاس على طول الساحل الأطلسي، مع شفشاون ومكناس ووليلي.'},
  '/tours/casablanca-5-day':{title:'5 أيام: مسار صحراوي من الدار البيضاء إلى مرزوكة وفاس',description:'رحلة خاصة من الدار البيضاء إلى فاس والصحراء، مع ليلة في كثبان إيرج شبي وركوب جمال عند الغروب.'},
  '/tours/casablanca-8-day':{title:'جولة كبرى 8 أيام في المغرب من الدار البيضاء',description:'رحلة خاصة لمدة ثمانية أيام من الدار البيضاء عبر الرباط وشفشاون وفاس والصحراء والوديان ومراكش.'},
  '/tours/tangier-3-day':{title:'جولة 3 أيام: طنجة وشفشاون وتطوان في الشمال',description:'رحلة خاصة ذهابًا وعودة من طنجة عبر تطوان ومدينة شفشاون الزرقاء وشلالات وادي أكشور.'},
  '/tours/tangier-5-day':{title:'5 أيام من طنجة إلى فاس عبر شفشاون والريف',description:'رحلة خاصة في اتجاه واحد من طنجة عبر تطوان وشفشاون ووادي أكشور والأطلس المتوسط إلى فاس.'},
  '/tours/marrakech-essaouira-2-day':{title:'جولة يومين من مراكش إلى الصويرة — الساحل الأطلسي',description:'رحلة خاصة لمدة يومين من مراكش إلى مدينة الصويرة الساحلية — مدينة قديمة مسجلة في التراث العالمي وأسوار وميناء.'},
  '/tours/14-day-grand-morocco-journey':{title:'جولة كبرى 14 يومًا في المغرب — الساحل والصحراء والشمال',description:'الرحلة الخاصة الكاملة في المغرب: مراكش، والساحل الأطلسي، والجنوب، وليلتان في إيرج شبي، وفاس، ومكناس، وشفشاون، والدار البيضاء.'},
  '/tours/marrakech-ourika-valley-day-trip':{title:'رحلة يومية من مراكش إلى وادي أوريكا',description:'رحلة خاصة ليوم واحد من مراكش إلى وادي أوريكا — قرى أمازيغية، وشلالات سيتي فاطمة، وتعاونية لزيت الأركان، على أقل من ساعة من المدينة.'},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'رحلة يومية من مراكش إلى شلالات أوزود',description:'رحلة خاصة ليوم واحد من مراكش إلى أشهر شلالات في المغرب، على مسافة حوالي 150 كم، مع ممرات على ضفاف النهر وقرود مكاك بربرية.'},
  '/tours/marrakech-imlil-day-trip':{title:'رحلة يومية من مراكش إلى إمليل',description:'رحلة خاصة ليوم واحد من مراكش إلى جبال الأطلس الكبير وصولًا إلى إمليل، قرية انطلاق جبل توبقال، على حوالي 90 دقيقة من المدينة.'},
  '/tours/agadir-taghazout-day-trip':{title:'رحلة يومية من أغادير إلى تاغازوت',description:'رحلة خاصة ليوم واحد من أغادير إلى تاغازوت، قرية ركوب الأمواج على الساحل الأطلسي على 20 دقيقة — ميناء الصيد، وموج أنكور بوينت، ومقاهي على البحر.'},
  '/destinations/marrakech':{title:'مراكش — جولات ودليل السفر في المغرب',description:'اكتشف مراكش ومدينتها القديمة وأسواقها ومعالمها الثقافية الرئيسية. خطط لرحلتك إلى المغرب مع خبراء محليين.'},
  '/destinations/fes':{title:'فاس — جولات ودليل السفر في المغرب',description:'اكتشف فاس، القلب الثقافي للمغرب ومدينتها القديمة التاريخية. خطط لرحلتك إلى فاس مع خبراء محليين.'},
  '/destinations/meknes':{title:'مكناس — جولات ودليل السفر في المغرب',description:'اكتشف مكناس، المدينة الإمبراطورية ذات الأبواب التاريخية، ومدينتها القديمة وموقع وليلي القريب.'},
  '/destinations/casablanca':{title:'الدار البيضاء — جولات ودليل السفر في المغرب',description:'اكتشف الدار البيضاء ومسجد الحسن الثاني، بوابة المغرب على المحيط الأطلسي.'},
  '/destinations/rabat':{title:'الرباط — جولات ودليل السفر في المغرب',description:'اكتشف الرباط، عاصمة المغرب، وقصبة أوداية، وصومعة حسان.'},
  '/destinations/merzouga':{title:'مرزوكة — جولات صحراوية ودليل السفر',description:'القرية الواقعة على حافة إيرج شبي — كيف تصل إلى مرزوكة من مراكش أو فاس، وكيف تبدو مخيمات الصحراء، وكم يُنصح بالبقاء بين الكثبان.'},
  '/destinations/erg-chebbi':{title:'إيرج شبي — جولات صحراوية ودليل السفر',description:'أعلى كثبان في المغرب، على مقربة من مرزوكة — ارتفاعها، وأفضل الأوقات للمشاهدة، وما تتضمنه رحلة ركوب الجمال عند الغروب مع المبيت في المخيم الصحراوي.'},
  '/destinations/ouarzazate':{title:'ورزازات — جولات ودليل السفر في المغرب',description:'اكتشف ورزازات وقصباتها وتاريخها السينمائي وبوابتها إلى جنوب المغرب.'},
  '/destinations/ait-ben-haddou':{title:'آيت بن حدو — دليل الجولات في موقع يونسكو بالمغرب',description:'القصر الطيني المرتفع فوق وادي ونيلة، المسجل في قائمة التراث العالمي لليونسكو — ما يمكن رؤيته عند الصعود إلى المخزن، وموقعه على طريق الصحراء.'},
  '/destinations/zagora':{title:'زاكورة — جولات صحراوية ودليل السفر',description:'مدينة في وادي درعة حيث تبدأ الصحراء — كيف تختلف زاكورة عن إيرج شبي، وما تتضمنه فعليًا جولة الصحراء لمدة يومين من مراكش.'},
  '/destinations/dades-valley':{title:'وادي دادس — وادي الألف قصبة، دليل السفر',description:'حدائق مدرّجة وجدران أودية وقصبات عند كل منعطف، مع المنعطفات الشهيرة فوق بولمان دادس — محطة ليلية كلاسيكية على طريق مراكش-مرزوكة.'},
  '/destinations/todra-gorge':{title:'مضيق تودرا — الوادي العظيم في المغرب، دليل السفر',description:'جدران حجر جيري ارتفاعها 300 متر تضيق إلى ممر بعرض 10 أمتار فقط — تسلق الصخور، مسارات على ضفاف النهر، ومحطة كلاسيكية على طريق مراكش-مرزوكة.'},
  '/destinations/skoura':{title:'واحة سكورة — بستان نخيل عمره ألف عام، دليل السفر',description:'واحة نخيل شاسعة على طريق الألف قصبة، موطن قصبة أمريضيل المُرممة — ثقافة القصبات بهدوء بعيدًا عن ازدحام آيت بن حدو.'},
  '/destinations/roses-valley':{title:'وادي الورود — جولات ودليل السفر في المغرب',description:'اكتشف وادي الورود في المغرب ومناظره الطبيعية الواحية.'},
  '/destinations/draa-valley':{title:'وادي درعة — جولات ودليل السفر في المغرب',description:'أطول وادي نهري في المغرب — بساتين النخيل والقصبات الطينية والطريق جنوبًا عبر أكدز وزاكورة، مع المحطات التي تستحق التوقف.'},
  '/destinations/chefchaouen':{title:'شفشاون — جولات ودليل السفر في المغرب',description:'اكتشف شفشاون، المدينة الزرقاء في جبال الريف المغربية.'},
  '/destinations/imlil':{title:'إمليل — جولات الأطلس ودليل السفر',description:'اكتشف إمليل وجبال الأطلس والقرى الأمازيغية ومسارات المشي.'},
  '/destinations/ourika-valley':{title:'وادي أوريكا — جولات ودليل السفر في المغرب',description:'اكتشف وادي أوريكا ومناظره الجبلية وقراه الأمازيغية القريبة من مراكش.'},
  '/destinations/ouzoud':{title:'شلالات أوزود — جولات ودليل السفر في المغرب',description:'زُر شلالات أوزود واكتشف المناظر الطبيعية المحيطة في الأطلس المتوسط.'},
  '/destinations/ifrane':{title:'إيفران وغابة الأرز — جولات ودليل السفر',description:'اكتشف إيفران وغابات الأرز في الأطلس المتوسط المغربي.'},
  '/destinations/essaouira':{title:'الصويرة — جولات ودليل السفر في المغرب',description:'اكتشف الصويرة، مدينتها القديمة الأطلسية وميناءها وأجواءها الساحلية.'},
  '/destinations/agadir':{title:'أغادير — جولات ودليل السفر في المغرب',description:'اكتشف أغادير وساحلها الأطلسي وشواطئها في جنوب المغرب.'},
  '/destinations/taghazout':{title:'تاغازوت — جولات ركوب الأمواج ودليل السفر في المغرب',description:'اكتشف تاغازوت وساحل ركوب الأمواج الأطلسي في المغرب.'},
  '/destinations/legzira':{title:'شاطئ لكزيرة — جولات ودليل السفر في المغرب',description:'اكتشف لكزيرة وساحلها الأطلسي الخلاب.'},
  '/destinations/el-jadida':{title:'الجديدة — القلعة البرتغالية على الأطلسي، دليل السفر',description:'مدينة مازاغان البرتغالية سابقًا — حصن من القرن السادس عشر مُدرج في قائمة اليونسكو، بصهريجه الشهير وأسواره وأسماكه المشوية في الميناء القديم.'},
  '/destinations/tangier':{title:'طنجة — بوابة المغرب إلى أوروبا، دليل السفر',description:'حيث يلتقي المحيط الأطلسي بالبحر المتوسط — القصبة، مغارات هرقل، تاريخها كمنطقة دولية، وأقل من ساعة بالعبّارة من إسبانيا.'},
  '/destinations/tetouan':{title:'تطوان — جولات ودليل السفر في المغرب',description:'اكتشف تطوان ومدينتها القديمة البيضاء التاريخية في شمال المغرب.'},
  '/destinations/akchour':{title:'أكشور وجسر الرب — جولات ودليل السفر',description:'شلالات وبرك مائية زرقاء خضراء في جبال الريف فوق شفشاون — مسافة المشي إلى الشلالات وجسر الرب، ومدتها، وحالة المسار.'},
  '/destinations/nkob':{title:'نكوب — قرية الخمسة والأربعين قصبة، دليل السفر',description:'قرية نائية عند سفوح جبل صاغرو تشتهر بقصباتها التاريخية الخمس والأربعين، ومراقبة النجوم بعيدًا عن الأضواء، ومسارات تتجنب ازدحام توبقال.'},
  '/destinations/mirleft':{title:'ميرلفت — قرية ركوب أمواج أطلسية برية، دليل السفر',description:'قرية صيد وركوب أمواج بكر بين تيزنيت وسيدي إفني — غروب الشمس فوق المنحدرات، موجة مرابوط، وخلجان هادئة بعيدًا عن الزحام.'},
  '/travel-info/morocco-basics':{title:'أساسيات المغرب — الموقع، اللغة، العملة والحكومة',description:'المعلومات الأساسية لأول زيارة: أين يقع المغرب، ما هي اللغات المستخدمة، العملة وأساسيات التأشيرة، وكيف يُقسَّم البلد إلى مناطق.'},
  '/travel-info/atlas-mountains-guide':{title:'جبال الأطلس في المغرب — دليل الأطلس الكبير وإمليل وتوبقال وأوريكا',description:'جبال الأطلس موضحة للمسافرين — الأطلس الكبير والأطلس المتوسط والأطلس الصغير، جبل توبقال وإمليل، وادي أوريكا، وكيف يمكن إدراج يوم جبلي في رحلة إلى مراكش.'},
  '/travel-info/amazigh-berber-culture':{title:'الثقافة الأمازيغية في المغرب — مقدمة للمسافرين',description:'مقدمة للمسافرين عن الثقافة الأمازيغية في المغرب — اللغة، أماكن استقرار المجتمعات، عمارة القصبات، الحِرف، الموسيقى، وكيفية الزيارة باحترام.'},
  '/travel-info/best-time-to-visit-morocco':{title:'أفضل وقت لزيارة المغرب — دليل حسب الفصول',description:'متى تزور المغرب: الربيع والخريف مناسبان لمعظم المناطق، وكيف يختلف الصيف والشتاء بين الساحل والجبال والصحراء، وكيفية اختيار تواريخ رحلة إلى الصحراء.'},
  '/travel-info/getting-around-morocco':{title:'التنقل في المغرب — خيارات النقل موضحة',description:'كيفية التنقل في المغرب: متى يكون السائق الخاص أفضل من القطار والحافلة، ومدة الطريق الحقيقية بين مراكش وفاس والصحراء، وكيفية التحقق من الجداول الحالية.'},
  '/travel-info/moroccan-food-and-cuisine':{title:'دليل المأكولات المغربية — الطاجين والكسكس وأتاي',description:'دليل للمسافرين عن المأكولات المغربية — الطاجين والكسكس موضحان، طقوس أتاي، الأكل في الشارع والتوابل، الحلويات وأطباق رمضان، وكيفية الأكل الجيد خلال رحلة إلى المغرب.'},
  '/travel-info/moroccan-souks-shopping-guide':{title:'دليل الأسواق المغربية — التسوق والتفاوض على السعر',description:'دليل عملي لأسواق المغرب — كيف تُنظَّم أحياء السوق في مراكش وفاس، وكيف تجري عملية التفاوض على السعر فعليًا، وماذا تشتري (ومن مَن) لشيء يدوم.'},
  '/travel-info/morocco-travel-safety':{title:'هل المغرب آمن؟ دليل عملي لسلامة السفر في المغرب',description:'دليل صادق لسلامة السفر في المغرب — عمليات الاحتيال الشائعة، المسافرون بمفردهم والمسافرات، زلزال 2023، الحر في الصيف وأغسطس، وأرقام الطوارئ الحقيقية.'},
  '/travel-info/what-to-pack-morocco':{title:'ماذا تحزم لرحلة المغرب — قائمة عملية للحقيبة',description:'قائمة واقعية لتحضير حقيبة رحلة إلى المغرب: طبقات من الملابس لليالي الصحراء الباردة، الحماية من الشمس، أحذية مناسبة للمدن القديمة والكثبان، وما يُفضَّل تركه في المنزل.'},
  '/student-tours/3-day-morocco-student-tour':{title:'رحلة طلابية إلى المغرب لمدة 3 أيام | مراكش والأطلس والصحراء',description:'مسار طلابي لمدة ثلاثة أيام من مراكش عبر الأطلس الكبير إلى آيت بن حدو وكثبان إيرج شبي في مرزوكة. لمجموعات جامعية وطلابية.'},
  '/student-tours/4-day-morocco-student-tour':{title:'رحلة طلابية إلى المغرب لمدة 4 أيام | الأطلس ووديان الواحات والصحراء',description:'مسار طلابي لمدة أربعة أيام من مراكش إلى آيت بن حدو، وادي دادس ووادي تودرا، مع ليلتين في صحراء إيرج شبي. لمجموعات جامعية وطلابية.'},
  '/student-tours/5-day-morocco-student-tour':{title:'رحلة طلابية إلى المغرب لمدة 5 أيام | مراكش والصحراء ومرزوكة',description:'مسار طلابي لمدة خمسة أيام من مراكش عبر الأطلس الكبير إلى آيت بن حدو، مع ليلتين في صحراء إيرج شبي بمرزوكة. لمجموعات جامعية وطلابية.'},
  '/student-tours/10-day-morocco-student-tour':{title:'رحلة طلابية بالمغرب لمدة 10 أيام | مدن إمبراطورية وصحراء',description:'مسار طلابي لمدة عشرة أيام يربط بين مراكش وآيت بن حدو وصحراء إيرج شبي وفاس وشفشاون. لمجموعات جامعية وطلابية.'},
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
  "/destinations":{title:"Destinations au Maroc — Sahara, villes impériales, Atlas",description:"Découvrez les grandes destinations du Maroc : Marrakech, Fès, Merzouga, Chefchaouen, l’Atlas et la côte atlantique."},
  "/gallery":{title:"Photos et vidéos du Maroc — Sahara, médinas et montagnes",description:"Photos et vidéos prises au Sahara, dans les médinas, les montagnes et les campements du désert marocain."},
  "/about":{title:"À propos | Le Maroc, au-delà du voyage",description:"Morocco Grand Adventure : des guides du désert de Merzouga qui font découvrir tout le Maroc en voyages privés conçus sur place."},
  "/contact":{title:"Contact — préparez votre voyage au Maroc",description:"Contactez Morocco Grand Adventure par WhatsApp, e-mail ou téléphone pour préparer votre voyage au Maroc."},
  "/travel-info":{title:"Infos pratiques Maroc — guides d’une équipe locale",description:"Informations pratiques pour voyager au Maroc : quand partir, quoi emporter et comment se déplacer."},
  "/faq":{title:"FAQ voyage au Maroc — questions fréquentes",description:"Réponses aux questions courantes sur les circuits, le désert, les bagages et la réservation au Maroc."},
  '/student-tours/university-groups':{title:"Voyages de groupes universitaires au Maroc",description:"Comment la taille du groupe, les délais et la logistique façonnent un programme étudiant au Maroc — de petits groupes aux grands groupes planifiés à l’avance."},
  '/student-tours':{title:"Voyages étudiants au Maroc | Séjours universitaires",description:"Programmes de voyage étudiants et universitaires au Maroc : culture, histoire, Sahara et aventure, organisés pour des groupes d’étudiants et d’université."},
  '/tours':{title:'Circuits privés au Maroc — Itinéraires sur mesure',description:"Tous nos circuits privés au Maroc : désert de Merzouga, Villes Impériales et côte atlantique, au départ de Marrakech, Fès, Casablanca et Agadir."},
  '/trip-finder':{title:'Trouvez votre voyage au Maroc — Trouver mon voyage',description:"Répondez à trois questions rapides pour trouver de vrais circuits au Maroc adaptés à vos dates, votre ville de départ et vos centres d'intérêt."},
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
  '/tours/3-day-sahara-marrakech':{title:'Circuit de Luxe de 3 Jours dans le Sahara depuis Marrakech',description:"Traversez le Haut Atlas jusqu'à Aït Ben Haddou, les vallées du Dadès et du Todra, puis une balade à dos de dromadaire au coucher du soleil à Erg Chebbi avec une nuit en bivouac de luxe."},
  '/tours/3-day-sahara-agadir':{title:'Circuit Privé de 3 Jours dans le Sahara depuis Agadir vers Merzouga',description:"Itinéraire privé de trois jours depuis Agadir jusqu'au Sahara à Merzouga, via le sud du Maroc et Ouarzazate. Parcours et nuit dans le désert confirmés selon vos dates."},
  '/tours/5-day-imperial-cities':{title:'Circuit de 5 Jours : Villes Impériales et Désert du Maroc',description:"Découvrez Marrakech, Meknès, Fès et Chefchaouen avant une nuit dans le Sahara, lors d'un circuit privé au Maroc."},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'Circuit de 7 Jours : Villes Impériales et Échappée au Sahara',description:"Sept jours privés de Marrakech au Sahara et retour — Aït Ben Haddou, les gorges du Dadès et du Todra, deux nuits à Erg Chebbi et l'impériale Fès."},
  '/tours/honeymoon-morocco':{title:'Lune de Miel Romantique au Maroc — Circuit Privé de Luxe de 10 Jours',description:"Un voyage privé et romantique au Maroc alliant villes, expériences dans le désert et moments pensés pour les couples."},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'Circuit de 8 Jours : Marrakech, Essaouira, Agadir et le Sahara',description:"Huit jours privés de Marrakech à Essaouira et Agadir, à travers l'Atlas jusqu'à Aït Ben Haddou et Erg Chebbi — balade à dos de dromadaire et nuit dans le désert."},
  '/tours/family-morocco-adventure':{title:'Aventure Familiale au Maroc — Circuit Privé de 9 Jours pour Enfants',description:"Un circuit familial privé de 9 jours au Maroc — Marrakech, une balade à dos de mulet dans l'Atlas, des dromadaires dans le Sahara et des kasbahs, à un rythme pensé pour les enfants et les parents."},
  '/tours/2-day-zagora-desert-marrakech':{title:'Circuit de 2 Jours au Désert de Zagora depuis Marrakech',description:"Itinéraire privé de deux jours depuis Marrakech, via Aït Ben Haddou, Ouarzazate et la vallée du Drâa jusqu'à Zagora."},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'Circuit de 4 Jours de Marrakech à Merzouga dans le Sahara',description:"Quatre jours de Marrakech à Merzouga via Aït Ben Haddou, le Dadès et le Todra, avec plus de temps dans les dunes d'Erg Chebbi."},
  '/tours/5-day-great-south-morocco':{title:'Circuit de 5 Jours dans le Grand Sud Marocain',description:"Découvrez Aït Ben Haddou, le Dadès, le Todra, Merzouga et la vallée du Drâa lors d'un itinéraire privé de cinq jours dans le sud du Maroc."},
  '/tours/3-day-fes-merzouga-sahara':{title:'Circuit Privé de 3 Jours de Fès à Merzouga dans le Sahara',description:"Voyagez en privé depuis Fès à travers la forêt de cèdres d'Ifrane et la vallée du Ziz jusqu'à Merzouga, pour un coucher de soleil dans le Sahara et une nuit à Erg Chebbi."},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'Circuit de 4 Jours de Fès à Marrakech via Merzouga',description:"Un voyage privé en sens unique de Fès à Marrakech via Merzouga, les gorges du Todra, la vallée du Dadès et Aït Ben Haddou."},
  '/tours/fes-4-day':{title:'Itinéraire de 4 Jours de Fès au Sahara à Merzouga',description:"Un circuit privé aller-retour depuis Fès jusqu'au Sahara, à travers le Moyen Atlas, la vallée du Ziz et les dunes d'Erg Chebbi."},
  '/tours/fes-5-day':{title:"5 Jours de Fès à Marrakech via Merzouga, le Dadès et l'Atlas",description:"Un itinéraire privé en sens unique de Fès à Marrakech à travers le Sahara, les gorges et le Haut Atlas."},
  '/tours/fes-8-day':{title:'Grand Circuit de 8 Jours : Villes Impériales depuis Fès et le Sahara',description:"Un voyage privé de huit jours depuis Fès via Meknès, Volubilis et le Sahara, avec une journée guidée à Marrakech."},
  '/tours/agadir-4-day':{title:"4 Jours d'Agadir à Marrakech via Taroudant et l'Atlas",description:"Un itinéraire privé d'Agadir à Marrakech via Taroudant, Ouarzazate et Aït Ben Haddou, avec du temps pour profiter de Marrakech."},
  '/tours/agadir-5-day':{title:"5 Jours d'Agadir à Marrakech via Ouarzazate et Merzouga",description:"Un itinéraire privé en sens unique d'Agadir à Marrakech à travers les kasbahs, les gorges et le Sahara d'Erg Chebbi."},
  '/tours/agadir-8-day':{title:'Grand Circuit de 8 Jours dans le Sud du Maroc depuis Agadir',description:"Un circuit privé de huit jours depuis Agadir via Taroudant, Ouarzazate, le Sahara, la vallée du Drâa et Marrakech."},
  '/tours/marrakech-4-day':{title:'Explorateur de 4 Jours : de Marrakech au Sahara de Merzouga',description:"Un circuit privé de quatre jours depuis Marrakech vers le Sahara, avec Aït Ben Haddou, les gorges du Dadès et du Todra et une nuit dans les dunes d'Erg Chebbi."},
  '/tours/casablanca-3-day':{title:'Circuit Privé de 3 Jours : Casablanca à Fès via Chefchaouen',description:"Un itinéraire privé de Casablanca à Fès, avec une nuit dans la ville bleue de Chefchaouen, l'impériale Meknès, la romaine Volubilis et une journée guidée dans la médina de Fès."},
  '/tours/casablanca-4-day':{title:'4 Jours de Casablanca à Fès par la Côte Atlantique et Chefchaouen',description:"Un itinéraire privé et détendu de Casablanca à Fès le long de la côte atlantique, avec Chefchaouen, Meknès et Volubilis."},
  '/tours/casablanca-5-day':{title:'5 Jours : Itinéraire Désertique de Casablanca à Merzouga et Fès',description:"Un itinéraire privé de Casablanca à Fès et au Sahara, avec une nuit dans les dunes d'Erg Chebbi et une balade à dos de dromadaire au coucher du soleil."},
  '/tours/casablanca-8-day':{title:'Grand Circuit de 8 Jours au Maroc depuis Casablanca',description:"Un circuit privé de huit jours depuis Casablanca via Rabat, Chefchaouen, Fès, le Sahara, les gorges et Marrakech."},
  '/tours/tangier-3-day':{title:'Circuit de 3 Jours : Tanger, Chefchaouen et Tétouan dans le Nord',description:"Un circuit privé aller-retour depuis Tanger via Tétouan, la ville bleue de Chefchaouen et les cascades de la vallée d'Akchour."},
  '/tours/tangier-5-day':{title:'5 Jours de Tanger à Fès via Chefchaouen et le Rif',description:"Un itinéraire privé en sens unique depuis Tanger via Tétouan, Chefchaouen, la vallée d'Akchour et le Moyen Atlas jusqu'à Fès."},
  '/tours/marrakech-essaouira-2-day':{title:'Circuit de 2 Jours de Marrakech à Essaouira — Côte Atlantique',description:"Une escapade privée de deux jours depuis Marrakech vers la côte atlantique d'Essaouira — médina classée au patrimoine mondial, remparts et port."},
  '/tours/14-day-grand-morocco-journey':{title:'Grand Circuit de 14 Jours au Maroc — Côte, Sahara et Nord',description:"Le circuit privé complet du Maroc : Marrakech, la côte atlantique, le sud, deux nuits à Erg Chebbi, Fès, Meknès, Chefchaouen et Casablanca."},
  '/tours/marrakech-ourika-valley-day-trip':{title:"Excursion d'une Journée de Marrakech à la Vallée de l'Ourika",description:"Une excursion privée d'une journée depuis Marrakech vers la vallée de l'Ourika — villages berbères, les cascades de Setti Fatma et une coopérative d'huile d'argan, à moins d'une heure de la ville."},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:"Excursion d'une Journée de Marrakech aux Cascades d'Ouzoud",description:"Une excursion privée d'une journée depuis Marrakech vers les cascades d'Ouzoud, les plus connues du Maroc, à environ 150 km de la ville, avec des sentiers au bord de la rivière et des magots de Barbarie."},
  '/tours/marrakech-imlil-day-trip':{title:"Excursion d'une Journée de Marrakech à Imlil",description:"Une excursion privée d'une journée depuis Marrakech vers le Haut Atlas, jusqu'à Imlil, le village de départ pour le Toubkal, à environ 90 minutes de la ville."},
  '/tours/agadir-taghazout-day-trip':{title:"Excursion d'une Journée d'Agadir à Taghazout",description:"Une excursion privée d'une journée depuis Agadir vers Taghazout, le village de surf de la côte atlantique à 20 minutes — port de pêcheurs, la vague d'Anchor Point et cafés en bord de mer."},
  '/destinations/marrakech':{title:'Marrakech — Circuits et Guide de Voyage au Maroc',description:"Découvrez Marrakech, sa médina, ses souks et ses principaux sites culturels. Préparez votre voyage au Maroc avec des experts locaux."},
  '/destinations/fes':{title:'Fès — Circuits et Guide de Voyage au Maroc',description:"Explorez Fès, le cœur culturel du Maroc et sa médina historique. Préparez votre voyage à Fès avec des experts locaux."},
  '/destinations/meknes':{title:'Meknès — Circuits et Guide de Voyage au Maroc',description:"Découvrez Meknès, ville impériale aux portes historiques, sa médina et la proche Volubilis."},
  '/destinations/casablanca':{title:'Casablanca — Circuits et Guide de Voyage au Maroc',description:"Explorez Casablanca, la mosquée Hassan II et la porte atlantique du Maroc."},
  '/destinations/rabat':{title:'Rabat — Circuits et Guide de Voyage au Maroc',description:"Découvrez Rabat, capitale du Maroc, la Kasbah des Oudayas et la tour Hassan."},
  '/destinations/merzouga':{title:'Merzouga — Circuits dans le Désert du Sahara et Guide de Voyage',description:"Le village au bord d'Erg Chebbi — comment rejoindre Merzouga depuis Marrakech ou Fès, à quoi ressemblent les bivouacs et combien de temps rester dans les dunes."},
  '/destinations/erg-chebbi':{title:'Erg Chebbi — Circuits dans le Désert du Sahara et Guide de Voyage',description:"Les plus hautes dunes du Maroc, près de Merzouga — leur hauteur, les meilleurs moments pour la lumière, et ce que comprend une nuit en bivouac avec dromadaire."},
  '/destinations/ouarzazate':{title:'Ouarzazate — Circuits et Guide de Voyage au Maroc',description:"Explorez Ouarzazate, ses kasbahs, son patrimoine cinématographique et la porte du sud marocain."},
  '/destinations/ait-ben-haddou':{title:'Aït Ben Haddou — Guide des Circuits UNESCO au Maroc',description:"Le ksar de terre au-dessus de l'oued Ounila, site du patrimoine mondial de l'UNESCO — ce qu'il faut voir en montant jusqu'au grenier, et sa place sur une route vers le Sahara."},
  '/destinations/zagora':{title:'Zagora — Circuits dans le Désert du Sahara et Guide de Voyage',description:"La ville du Drâa où commence le Sahara — comment Zagora se compare à Erg Chebbi, et ce que couvre un circuit de deux jours dans le désert depuis Marrakech."},
  '/destinations/dades-valley':{title:'Vallée du Dadès — Vallée des Mille Kasbahs, Guide',description:"Jardins en terrasses, parois de canyon et kasbahs à chaque virage, avec les lacets au-dessus de Boulmane Dadès — étape classique de la route Marrakech–Merzouga."},
  '/destinations/todra-gorge':{title:'Gorges du Todra — Le Grand Canyon du Maroc, Guide',description:"Des parois calcaires de 300 mètres se resserrant en un corridor de 10 mètres — escalade, marches au bord de la rivière, étape classique sur la route Marrakech–Merzouga."},
  '/destinations/skoura':{title:'Oasis de Skoura — Palmeraie Millénaire, Guide de Voyage',description:"Une vaste palmeraie sur la Route des Mille Kasbahs, abritant la Kasbah Amridil restaurée — l'authenticité des kasbahs sans la foule d'Aït Ben Haddou."},
  '/destinations/roses-valley':{title:'Vallée des Roses — Circuits et Guide de Voyage au Maroc',description:"Découvrez la Vallée des Roses du Maroc et ses paysages d'oasis."},
  '/destinations/draa-valley':{title:'Vallée du Drâa — Circuits et Guide de Voyage au Maroc',description:"La plus longue vallée fluviale du Maroc — palmeraies, kasbahs de terre et la route vers le sud via Agdz et Zagora, avec les étapes qui en valent la peine."},
  '/destinations/chefchaouen':{title:'Chefchaouen — Circuits et Guide de Voyage au Maroc',description:"Découvrez Chefchaouen, la médina bleue dans les montagnes du Rif marocain."},
  '/destinations/imlil':{title:"Imlil — Circuits dans l'Atlas et Guide de Voyage",description:"Explorez Imlil et l'Atlas, les villages berbères et les sentiers de randonnée."},
  '/destinations/ourika-valley':{title:"Vallée de l'Ourika — Circuits et Guide de Voyage au Maroc",description:"Découvrez la vallée de l'Ourika, ses paysages de montagne et ses villages berbères près de Marrakech."},
  '/destinations/ouzoud':{title:"Cascades d'Ouzoud — Circuits et Guide de Voyage au Maroc",description:"Visitez les cascades d'Ouzoud et explorez les paysages environnants du Moyen Atlas."},
  '/destinations/ifrane':{title:'Ifrane et la Forêt de Cèdres — Circuits et Guide de Voyage',description:"Découvrez Ifrane et les forêts de cèdres du Moyen Atlas marocain."},
  '/destinations/essaouira':{title:'Essaouira — Circuits et Guide de Voyage au Maroc',description:"Explorez Essaouira, sa médina atlantique, son port et son ambiance côtière."},
  '/destinations/agadir':{title:'Agadir — Circuits et Guide de Voyage au Maroc',description:"Découvrez Agadir, sa côte atlantique et ses plages dans le sud du Maroc."},
  '/destinations/taghazout':{title:'Taghazout — Circuits de Surf et Guide de Voyage au Maroc',description:"Explorez Taghazout et la côte atlantique du surf marocain."},
  '/destinations/legzira':{title:'Plage de Legzira — Circuits et Guide de Voyage au Maroc',description:"Découvrez Legzira et sa côte atlantique spectaculaire."},
  '/destinations/el-jadida':{title:'El Jadida — Citadelle Portugaise sur l\'Atlantique, Guide',description:"L'ancienne Mazagan portugaise — une forteresse du XVIe siècle classée UNESCO, sa célèbre citerne, ses remparts et son poisson grillé au vieux port."},
  '/destinations/tangier':{title:'Tanger — La Porte du Maroc vers l\'Europe, Guide',description:"Là où l'Atlantique rencontre la Méditerranée — la Kasbah, les Grottes d'Hercule, son passé de zone internationale, à moins d'une heure de ferry de l'Espagne."},
  '/destinations/tetouan':{title:'Tétouan — Circuits et Guide de Voyage au Maroc',description:"Explorez Tétouan et sa médina blanche historique dans le nord du Maroc."},
  '/destinations/akchour':{title:'Akchour et le Pont de Dieu — Circuits et Guide de Voyage',description:"Cascades et vasques bleu-vert dans le Rif au-dessus de Chefchaouen — la marche jusqu'aux cascades et au Pont de Dieu, sa durée et l'état du sentier."},
  '/destinations/nkob':{title:'Nkob — Le Village aux 45 Kasbahs, Guide de Voyage',description:"Un village reculé au pied du Jbel Saghro, connu pour ses 45 kasbahs historiques, l'observation des étoiles et des randonnées sans la foule du Toubkal."},
  '/destinations/mirleft':{title:'Mirleft — Village de Surf Atlantique Sauvage, Guide',description:"Un village de surf et de pêche préservé entre Tiznit et Sidi Ifni — couchers de soleil sur les falaises, spot de surf de Marabout, criques tranquilles."},
  '/travel-info/morocco-basics':{title:'Les Bases du Maroc — Situation, Langues, Monnaie et Gouvernement',description:"Informations essentielles pour un premier voyage au Maroc : situation, langues, monnaie, bases du visa et organisation du pays par région."},
  '/travel-info/atlas-mountains-guide':{title:'Atlas Maroc — Guide du Haut Atlas, Imlil, Toubkal et Ourika',description:"Les montagnes de l'Atlas expliquées aux voyageurs — Haut Atlas, Moyen Atlas et Anti-Atlas, le Toubkal et Imlil, la vallée de l'Ourika, et comment intégrer une journée en montagne à un séjour à Marrakech."},
  '/travel-info/amazigh-berber-culture':{title:'Culture Amazighe (Berbère) au Maroc — Introduction pour Voyageurs',description:"La culture amazighe (berbère) au Maroc pour voyageurs — langue, communautés, architecture des kasbahs, artisanat, musique et comment visiter dans le respect."},
  '/travel-info/best-time-to-visit-morocco':{title:'Meilleure Période pour Visiter le Maroc — Guide Saison par Saison',description:"Quand visiter le Maroc : printemps et automne pour la plupart des régions, les différences entre côte, montagnes et Sahara, et comment choisir ses dates pour le désert."},
  '/travel-info/getting-around-morocco':{title:'Se Déplacer au Maroc — Les Options de Transport Expliquées',description:"Comment se déplacer au Maroc : quand un chauffeur privé vaut mieux que le train ou le bus, les temps de route entre Marrakech, Fès et le Sahara, et les horaires."},
  '/travel-info/moroccan-food-and-cuisine':{title:'Guide de la Cuisine Marocaine — Tajine, Couscous, Thé à la Menthe',description:"Guide de la cuisine marocaine — tajine et couscous, le rituel du thé à la menthe, street food et épices, douceurs et plats du ramadan, et comment bien manger au Maroc."},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Guide des Souks Marocains — Shopping et Négociation',description:"Guide pratique des souks marocains — organisation des quartiers marchands de Marrakech et de Fès, comment fonctionne la négociation, et quoi acheter pour durer."},
  '/travel-info/morocco-travel-safety':{title:'Le Maroc est-il Sûr ? Guide Pratique de Sécurité pour Voyageurs',description:"Guide honnête sur la sécurité au Maroc — arnaques courantes, voyageuses et voyageurs solo, le séisme de 2023, la chaleur en été, et les vrais numéros d'urgence."},
  '/travel-info/what-to-pack-morocco':{title:'Que Mettre dans sa Valise pour le Maroc — Liste Pratique',description:"Liste réaliste pour sa valise au Maroc : couches pour les nuits froides du désert, protection solaire, chaussures pour médinas et dunes, et ce qu'on laisse chez soi."},
  '/student-tours/3-day-morocco-student-tour':{title:'Voyage Étudiant au Maroc de 3 Jours | Marrakech, Atlas et Sahara',description:"Itinéraire étudiant de trois jours depuis Marrakech, par le Haut Atlas jusqu'à Aït Ben Haddou et les dunes d'Erg Chebbi à Merzouga. Pour groupes scolaires."},
  '/student-tours/4-day-morocco-student-tour':{title:'Voyage Étudiant au Maroc de 4 Jours | Atlas, Vallées et Sahara',description:"Itinéraire étudiant de quatre jours de Marrakech à Aït Ben Haddou, les vallées du Dadès et du Todra, avec deux nuits dans le désert d'Erg Chebbi. Pour groupes scolaires."},
  '/student-tours/5-day-morocco-student-tour':{title:'Voyage Étudiant au Maroc de 5 Jours | Marrakech, Sahara et Merzouga',description:"Itinéraire étudiant de cinq jours depuis Marrakech, par le Haut Atlas jusqu'à Aït Ben Haddou, avec deux nuits dans le désert d'Erg Chebbi. Pour groupes scolaires."},
  '/student-tours/10-day-morocco-student-tour':{title:'Voyage Étudiant Maroc 10 Jours | Villes Impériales, Rif et Sahara',description:"Un itinéraire étudiant de dix jours reliant Marrakech, Aït Ben Haddou, le Sahara d'Erg Chebbi, Fès et Chefchaouen. Pour groupes universitaires et étudiants."},
};

// Spanish — vocabulary per Sahara Viajes / ES-market usage (tours por el
// desierto, circuitos, excursiones de un día, campamento, paseo en camello).
const ES_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"Destinos en Marruecos — Sáhara, ciudades imperiales y Atlas",description:"Descubre los grandes destinos de Marruecos: Marrakech, Fez, Merzouga, Chauen, el Atlas y la costa atlántica."},
  "/gallery":{title:"Fotos y vídeos de Marruecos — Sáhara, medinas y montañas",description:"Fotografías y vídeos del Sáhara, las medinas, las montañas y los campamentos del desierto marroquí."},
  "/about":{title:"Quiénes somos | Marruecos, más allá del viaje",description:"Morocco Grand Adventure: guías del desierto de Merzouga que muestran todo Marruecos en viajes privados diseñados sobre el terreno."},
  "/contact":{title:"Contacto — planifica tu viaje a Marruecos",description:"Contacta con Morocco Grand Adventure por WhatsApp, correo o teléfono para planificar tu viaje a Marruecos."},
  "/travel-info":{title:"Información práctica de Marruecos — guías locales",description:"Información práctica para viajar a Marruecos: cuándo ir, qué llevar y cómo moverse."},
  "/faq":{title:"Preguntas frecuentes sobre viajar a Marruecos",description:"Respuestas a las dudas más comunes sobre circuitos, desierto, equipaje y reservas en Marruecos."},
  '/student-tours/university-groups':{title:"Viajes de grupos universitarios a Marruecos",description:"Cómo el tamaño del grupo, la antelación y la logística definen un programa estudiantil en Marruecos: desde grupos pequeños hasta grupos grandes con planificación previa."},
  '/student-tours':{title:"Viajes de estudiantes a Marruecos | Viajes universitarios",description:"Programas de viaje para estudiantes y universidades en Marruecos: cultura, historia, Sáhara y aventura, para grupos organizados de estudiantes y universidades."},
  '/':{title:'Viajes a Marruecos — Tours privados y desierto de Merzouga',description:"Agencia local del desierto: tours privados por Marruecos a medida — Erg Chebbi, ciudades imperiales y Atlas, con guía local. Pide tu presupuesto."},
  '/tours':{title:'Tours por Marruecos — Circuitos privados a medida',description:"Catálogo de circuitos privados por Marruecos: rutas del desierto, ciudades imperiales y costa atlántica desde Marrakech, Fez, Casablanca y Agadir."},
  '/trip-finder':{title:'Encuentra tu viaje a Marruecos — Buscador de viajes',description:"Responde tres preguntas rápidas y encuentra tours reales por Marruecos que se ajusten a tus fechas, ciudad de salida e intereses."},
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
  // Individual tour pages — natural Spanish, not a mechanical translation of
  // TOUR_META above: same real route/duration facts, phrased the way a
  // Spain-based traveler actually searches and reads (circuito/ruta privada,
  // Alto Atlas, dunas de Erg Chebbi, excursión de un día).
  '/tours/3-day-sahara-marrakech':{title:'Tour de 3 Días por el Sahara desde Marrakech — Lujo',description:'Cruza el Alto Atlas hasta Aït Ben Haddou, los valles de Dades y Todra, y vive un paseo en camello al atardecer en Erg Chebbi con noche en un campamento de lujo.'},
  '/tours/3-day-sahara-agadir':{title:'Tour Privado de 3 Días por el Sahara desde Agadir a Merzouga',description:'Ruta privada de tres días desde Agadir hasta el Sahara en Merzouga, por el sur de Marruecos y Ouarzazate. Ruta y noche en el desierto según tus fechas.'},
  '/tours/5-day-imperial-cities':{title:'Tour de 5 Días: Ciudades Imperiales y Desierto de Marruecos',description:'Descubre Marrakech, Mequinez, Fez y Chefchaouen antes de una noche en el Sahara, en un tour privado por Marruecos.'},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'Tour de 7 Días: Ciudades Imperiales y Escapada al Sahara',description:'Siete días privados desde Marrakech hasta el Sahara y vuelta — Aït Ben Haddou, los valles de Dades y Todra, dos noches en Erg Chebbi y la imperial Fez.'},
  '/tours/honeymoon-morocco':{title:'Luna de Miel Romántica en Marruecos — Tour Privado de Lujo de 10 Días',description:'Un viaje privado y romántico por Marruecos que combina ciudades, experiencias en el desierto y tiempo pensado para parejas.'},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'Tour de 8 Días: Marrakech, Essaouira, Agadir y el Sahara',description:'Ocho días privados desde Marrakech hasta Essaouira y Agadir, cruzando el Atlas hasta Aït Ben Haddou y Erg Chebbi — paseo en camello y noche en el desierto.'},
  '/tours/family-morocco-adventure':{title:'Aventura Familiar en Marruecos — Tour Privado de 9 Días para Niños',description:'Un tour familiar privado de 9 días por Marruecos — Marrakech, paseo en mula por el Atlas, camellos en el Sahara y kasbahs, a un ritmo pensado para niños y padres.'},
  '/tours/2-day-zagora-desert-marrakech':{title:'Tour de 2 Días al Desierto de Zagora desde Marrakech',description:'Ruta privada de dos días desde Marrakech, pasando por Aït Ben Haddou, Ouarzazate y el valle del Draa hasta Zagora.'},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'Tour de 4 Días de Marrakech a Merzouga por el Sahara',description:'Cuatro días desde Marrakech hasta Merzouga vía Aït Ben Haddou, Dades y Todra, con más tiempo en las dunas de Erg Chebbi.'},
  '/tours/5-day-great-south-morocco':{title:'Tour de 5 Días por el Gran Sur de Marruecos',description:'Descubre Aït Ben Haddou, Dades, Todra, Merzouga y el valle del Draa en una ruta privada de cinco días por el sur de Marruecos.'},
  '/tours/3-day-fes-merzouga-sahara':{title:'Tour Privado de 3 Días de Fez a Merzouga por el Sahara',description:'Viaja en privado desde Fez a través del bosque de cedros de Ifrane y el valle del Ziz hasta Merzouga, para una puesta de sol en el Sahara y una noche en Erg Chebbi.'},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'Tour de 4 Días de Fez a Marrakech vía Merzouga',description:'Un viaje privado de ida desde Fez a Marrakech pasando por Merzouga, la garganta del Todra, el valle del Dades y Aït Ben Haddou.'},
  '/tours/fes-4-day':{title:'Ruta de 4 Días de Fez al Sahara en Merzouga',description:'Un circuito privado de ida y vuelta desde Fez hasta el Sahara, cruzando el Atlas Medio, el valle del Ziz y las dunas de Erg Chebbi.'},
  '/tours/fes-5-day':{title:'5 Días de Fez a Marrakech vía Merzouga, Dades y el Atlas',description:'Una ruta privada de ida desde Fez a Marrakech a través del Sahara, las gargantas y el Alto Atlas.'},
  '/tours/fes-8-day':{title:'Gran Tour de 8 Días: Ciudades Imperiales desde Fez y el Sahara',description:'Un viaje privado de ocho días desde Fez por Mequinez, Volubilis y el Sahara, con un día guiado en Marrakech.'},
  '/tours/agadir-4-day':{title:'4 Días de Agadir a Marrakech vía Taroudant y el Atlas',description:'Una ruta privada desde Agadir a Marrakech pasando por Taroudant, Ouarzazate y Aït Ben Haddou, con tiempo para disfrutar Marrakech.'},
  '/tours/agadir-5-day':{title:'5 Días de Agadir a Marrakech vía Ouarzazate y Merzouga',description:'Una ruta privada de ida desde Agadir a Marrakech a través de las kasbahs, las gargantas y el Sahara de Erg Chebbi.'},
  '/tours/agadir-8-day':{title:'Gran Circuito de 8 Días por el Sur de Marruecos desde Agadir',description:'Un circuito privado de ocho días desde Agadir por Taroudant, Ouarzazate, el Sahara, el valle del Draa y Marrakech.'},
  '/tours/marrakech-4-day':{title:'Explorador de 4 Días: Marrakech al Sahara de Merzouga',description:'Un circuito privado de cuatro días desde Marrakech al Sahara, visitando Aït Ben Haddou, las gargantas de Dades y Todra y una noche en las dunas de Erg Chebbi.'},
  '/tours/casablanca-3-day':{title:'Tour Privado de 3 Días: Casablanca a Fez vía Chefchaouen',description:'Una ruta privada desde Casablanca a Fez, con una noche en la ciudad azul de Chefchaouen, la imperial Mequinez, Volubilis romana y un día guiado en la medina de Fez.'},
  '/tours/casablanca-4-day':{title:'4 Días de Casablanca a Fez por la Costa Atlántica y Chefchaouen',description:'Una ruta privada y relajada desde Casablanca a Fez por la costa atlántica, con Chefchaouen, Mequinez y Volubilis.'},
  '/tours/casablanca-5-day':{title:'5 Días: Ruta del Desierto de Casablanca a Merzouga y Fez',description:'Una ruta privada desde Casablanca a Fez y el Sahara, con una noche en las dunas de Erg Chebbi y un paseo en camello al atardecer.'},
  '/tours/casablanca-8-day':{title:'Gran Circuito de 8 Días por Marruecos desde Casablanca',description:'Un circuito privado de ocho días desde Casablanca por Rabat, Chefchaouen, Fez, el Sahara, las gargantas y Marrakech.'},
  '/tours/tangier-3-day':{title:'Tour de 3 Días: Tánger, Chefchaouen y Tetuán en el Norte',description:'Un circuito privado de ida y vuelta desde Tánger por Tetuán, la ciudad azul de Chefchaouen y las cascadas del valle de Akchour.'},
  '/tours/tangier-5-day':{title:'5 Días de Tánger a Fez vía Chefchaouen y el Rif',description:'Una ruta privada de ida desde Tánger por Tetuán, Chefchaouen, el valle de Akchour y el Atlas Medio hasta Fez.'},
  '/tours/marrakech-essaouira-2-day':{title:'Tour de 2 Días de Marrakech a Essaouira — Costa Atlántica',description:'Una escapada privada de dos días desde Marrakech a la costa atlántica de Essaouira — medina declarada Patrimonio Mundial, murallas y puerto.'},
  '/tours/14-day-grand-morocco-journey':{title:'Gran Tour de 14 Días por Marruecos — Costa, Sahara y Norte',description:'El circuito privado completo por Marruecos: Marrakech, la costa atlántica, el sur, dos noches en Erg Chebbi, Fez, Mequinez, Chefchaouen y Casablanca.'},
  '/tours/marrakech-ourika-valley-day-trip':{title:'Excursión de un Día de Marrakech al Valle de Ourika',description:'Excursión privada de un día desde Marrakech al valle de Ourika — pueblos bereberes, las cascadas de Setti Fatma y una cooperativa de aceite de argán, a menos de una hora.'},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'Excursión de un Día de Marrakech a las Cascadas de Ouzoud',description:'Excursión privada de un día desde Marrakech a las cascadas de Ouzoud, las más conocidas de Marruecos, a unos 150 km, con senderos junto al río y monos de Berbería.'},
  '/tours/marrakech-imlil-day-trip':{title:'Excursión de un Día de Marrakech a Imlil',description:'Una excursión privada de un día desde Marrakech al Alto Atlas, hasta Imlil, el pueblo base del Toubkal, a unos 90 minutos de la ciudad.'},
  '/tours/agadir-taghazout-day-trip':{title:'Excursión de un Día de Agadir a Taghazout',description:'Excursión privada de un día desde Agadir a Taghazout, pueblo surfero de la costa atlántica a 20 minutos — puerto pesquero, la ola de Anchor Point y cafés frente al mar.'},
  // Destination pages — same pattern as the tour entries above: natural
  // Spanish, same real facts as DESTINATION_META (English).
  '/destinations/marrakech':{title:'Marrakech — Tours y Guía de Viaje por Marruecos',description:'Descubre Marrakech, su medina, los zocos y los principales lugares culturales. Planifica tu viaje a Marruecos con expertos locales.'},
  '/destinations/fes':{title:'Fez — Tours y Guía de Viaje por Marruecos',description:'Explora Fez, el corazón cultural de Marruecos y su medina histórica. Planifica tu viaje a Fez con expertos locales.'},
  '/destinations/meknes':{title:'Mequinez — Tours y Guía de Viaje por Marruecos',description:'Descubre Mequinez, una ciudad imperial con puertas históricas, medina y la cercana Volubilis.'},
  '/destinations/casablanca':{title:'Casablanca — Tours y Guía de Viaje por Marruecos',description:'Explora Casablanca, la Mezquita Hassan II y la puerta atlántica de Marruecos.'},
  '/destinations/rabat':{title:'Rabat — Tours y Guía de Viaje por Marruecos',description:'Descubre Rabat, la capital de Marruecos, la Kasbah de los Oudayas y la Torre Hassan.'},
  '/destinations/merzouga':{title:'Merzouga — Tours por el Desierto del Sahara y Guía de Viaje',description:'El pueblo al borde de Erg Chebbi — cómo llegar a Merzouga desde Marrakech o Fez, cómo son los campamentos del desierto y cuánto tiempo quedarse en las dunas.'},
  '/destinations/erg-chebbi':{title:'Erg Chebbi — Tours por el Desierto del Sahara y Guía de Viaje',description:'Las dunas más altas de Marruecos, junto a Merzouga — su altura, cuándo es mejor la luz, y en qué consisten un paseo en camello al atardecer y una noche de campamento.'},
  '/destinations/ouarzazate':{title:'Ouarzazate — Tours y Guía de Viaje por Marruecos',description:'Explora Ouarzazate, sus kasbahs, el patrimonio cinematográfico y la puerta al sur de Marruecos.'},
  '/destinations/ait-ben-haddou':{title:'Aït Ben Haddou — Guía de Tours UNESCO en Marruecos',description:'El ksar de tierra sobre el río Ounila, Patrimonio de la Humanidad por la UNESCO — qué ver al subir al granero y su lugar en una ruta al Sahara.'},
  '/destinations/zagora':{title:'Zagora — Tours por el Desierto del Sahara y Guía de Viaje',description:'Localidad del valle del Draa donde comienza el Sahara — cómo se compara con Erg Chebbi, y qué incluye un viaje de dos días al desierto desde Marrakech.'},
  '/destinations/dades-valley':{title:'Valle del Dades — Valle de las Mil Kasbahs, Guía',description:'Jardines escalonados, paredes de cañón y kasbahs en cada curva, con las famosas curvas sobre Boulmane Dades — parada clásica en la ruta Marrakech–Merzouga.'},
  '/destinations/todra-gorge':{title:'Garganta del Todra — El Gran Cañón de Marruecos, Guía',description:'Paredes calizas de 300 metros que se estrechan a un pasillo de 10 metros — escalada, paseos junto al río, parada clásica en la ruta Marrakech–Merzouga.'},
  '/destinations/skoura':{title:'Oasis de Skoura — Palmeral Milenario, Guía de Viaje',description:'Un vasto oasis de palmeras en la Ruta de las Mil Kasbahs, hogar de la restaurada Kasbah Amridil — cultura de kasbahs sin las multitudes de Aït Ben Haddou.'},
  '/destinations/roses-valley':{title:'Valle de las Rosas — Tours y Guía de Viaje por Marruecos',description:'Descubre el Valle de las Rosas de Marruecos y sus paisajes de oasis.'},
  '/destinations/draa-valley':{title:'Valle del Draa — Tours y Guía de Viaje por Marruecos',description:'El valle fluvial más largo de Marruecos — palmerales, kasbahs de tierra y la carretera hacia el sur por Agdz y Zagora, con las paradas que merece la pena hacer.'},
  '/destinations/chefchaouen':{title:'Chefchaouen — Tours y Guía de Viaje por Marruecos',description:'Descubre Chefchaouen, la medina azul en las montañas del Rif de Marruecos.'},
  '/destinations/imlil':{title:'Imlil — Tours por el Atlas y Guía de Viaje',description:'Explora Imlil y el Atlas, los pueblos bereberes y las rutas de senderismo.'},
  '/destinations/ourika-valley':{title:'Valle de Ourika — Tours y Guía de Viaje por Marruecos',description:'Descubre el valle de Ourika, paisajes de montaña y pueblos bereberes cerca de Marrakech.'},
  '/destinations/ouzoud':{title:'Cascadas de Ouzoud — Tours y Guía de Viaje por Marruecos',description:'Visita las cascadas de Ouzoud y explora los paisajes del Atlas Medio que las rodean.'},
  '/destinations/ifrane':{title:'Ifrane y el Bosque de Cedros — Tours y Guía de Viaje',description:'Descubre Ifrane y los bosques de cedros del Atlas Medio de Marruecos.'},
  '/destinations/essaouira':{title:'Essaouira — Tours y Guía de Viaje por Marruecos',description:'Explora Essaouira, su medina atlántica, el puerto y su ambiente costero.'},
  '/destinations/agadir':{title:'Agadir — Tours y Guía de Viaje por Marruecos',description:'Descubre Agadir, su costa atlántica y sus playas en el sur de Marruecos.'},
  '/destinations/taghazout':{title:'Taghazout — Tours de Surf y Guía de Viaje por Marruecos',description:'Explora Taghazout y la costa atlántica de surf de Marruecos.'},
  '/destinations/legzira':{title:'Playa de Legzira — Tours y Guía de Viaje por Marruecos',description:'Descubre Legzira y su espectacular costa atlántica.'},
  '/destinations/el-jadida':{title:'El Jadida — Ciudadela Portuguesa en el Atlántico, Guía',description:'La antigua Mazagán portuguesa — una fortaleza del siglo XVI declarada Patrimonio de la UNESCO, su famosa cisterna, murallas y pescado a la parrilla en el puerto viejo.'},
  '/destinations/tangier':{title:'Tánger — La Puerta de Marruecos a Europa, Guía',description:'Donde el Atlántico se encuentra con el Mediterráneo — la Kasbah, las Cuevas de Hércules, su pasado como zona internacional, a menos de una hora en ferry desde España.'},
  '/destinations/tetouan':{title:'Tetuán — Tours y Guía de Viaje por Marruecos',description:'Explora Tetuán y su histórica medina blanca en el norte de Marruecos.'},
  '/destinations/akchour':{title:'Akchour y el Puente de Dios — Tours y Guía de Viaje',description:"Cascadas y pozas azul-verdosas en el Rif, sobre Chefchaouen — la caminata hasta las cascadas y el Puente de Dios, su duración y cómo es el sendero."},
  '/destinations/nkob':{title:'Nkob — El Pueblo de las 45 Kasbahs, Guía de Viaje',description:'Un pueblo remoto en las estribaciones del Jbel Saghro, conocido por sus 45 kasbahs históricas, observación de estrellas y rutas sin las multitudes del Toubkal.'},
  '/destinations/mirleft':{title:'Mirleft — Pueblo de Surf Atlántico Salvaje, Guía',description:'Un pueblo de surf y pesca virgen entre Tiznit y Sidi Ifni — atardeceres en los acantilados, la ola de Marabout y calas tranquilas lejos de las multitudes.'},
  '/travel-info/morocco-basics':{title:'Lo Básico de Marruecos — Ubicación, Idioma, Moneda y Gobierno',description:"Información esencial para un primer viaje: dónde está Marruecos, qué idiomas se hablan, la moneda, datos básicos del visado y cómo se organiza el país por regiones."},
  '/travel-info/atlas-mountains-guide':{title:'Atlas Marruecos — Guía del Alto Atlas, Imlil, Toubkal y Ourika',description:'Las montañas del Atlas para viajeros — Alto Atlas, Atlas Medio y Antiatlas, el Toubkal e Imlil, el valle de Ourika, y un día de montaña en un viaje a Marrakech.'},
  '/travel-info/amazigh-berber-culture':{title:'Cultura Amazigh (Berber) en Marruecos — Introducción para Viajeros',description:'Cultura amazigh (berber) en Marruecos para viajeros — lengua, comunidades, arquitectura de las kasbahs, artesanía, música y cómo visitar con respeto.'},
  '/travel-info/best-time-to-visit-morocco':{title:'Mejor Época para Visitar Marruecos — Guía Estación por Estación',description:'Cuándo visitar Marruecos: primavera y otoño en la mayoría de regiones, verano e invierno entre costa, montañas y Sahara, y cómo elegir fechas para el desierto.'},
  '/travel-info/getting-around-morocco':{title:'Cómo Moverse por Marruecos — Opciones de Transporte Explicadas',description:'Cómo viajar por Marruecos: cuándo un conductor privado es mejor que el tren o autobús, tiempos de trayecto reales entre Marrakech, Fez y el Sahara, y horarios.'},
  '/travel-info/moroccan-food-and-cuisine':{title:'Guía de la Cocina Marroquí — Tajín, Cuscús y Té de Menta',description:'Guía de la cocina marroquí para viajeros — tajín y cuscús, el ritual del té de menta, comida de calle y especias, dulces y platos de ramadán, y cómo comer bien.'},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Guía de los Zocos Marroquíes — Compras y Negociación',description:'Guía práctica de los zocos de Marruecos — cómo están organizados los barrios comerciales de Marrakech y Fez, cómo funciona el regateo, y qué comprar para algo que dure.'},
  '/travel-info/morocco-travel-safety':{title:'¿Es Seguro Marruecos? Guía Práctica de Seguridad para Viajeros',description:'Guía honesta sobre la seguridad en Marruecos — estafas comunes, viajeras y viajeros en solitario, el terremoto de 2023, el calor en verano, y números de emergencia.'},
  '/travel-info/what-to-pack-morocco':{title:'Qué Llevar en la Maleta para Marruecos — Lista Práctica',description:'Lista realista para la maleta en Marruecos: capas de ropa para noches frías del desierto, protección solar, calzado para medinas y dunas, y qué dejar en casa.'},
  '/student-tours/3-day-morocco-student-tour':{title:'Viaje de Estudiantes a Marruecos de 3 Días | Marrakech, Atlas y Sáhara',description:'Ruta de tres días para estudiantes desde Marrakech, cruzando el Alto Atlas hasta Aït Ben Haddou y las dunas de Erg Chebbi en Merzouga. Para grupos escolares.'},
  '/student-tours/4-day-morocco-student-tour':{title:'Viaje de Estudiantes a Marruecos de 4 Días | Atlas, Valles y Sáhara',description:'Ruta de cuatro días para estudiantes de Marrakech a Aït Ben Haddou, los valles de Dades y Todra, con dos noches en el desierto de Erg Chebbi. Para grupos escolares.'},
  '/student-tours/5-day-morocco-student-tour':{title:'Viaje de Estudiantes Marruecos 5 Días | Marrakech, Sáhara y Merzouga',description:'Ruta de cinco días para estudiantes desde Marrakech, cruzando el Alto Atlas hasta Aït Ben Haddou, con dos noches en el desierto de Erg Chebbi. Para grupos escolares.'},
  '/student-tours/10-day-morocco-student-tour':{title:'Viaje Estudiantes Marruecos 10 Días | Ciudades Imperiales y Sáhara',description:'Una ruta de diez días para estudiantes que une Marrakech, Aït Ben Haddou, el Sáhara de Erg Chebbi, Fez y Chefchaouen. Para grupos universitarios y estudiantiles.'},
};

// Italian — vocabulary per ONMT-it / IT-market usage (viaggio, vacanza nel
// deserto, Città imperiali, escursione in cammello, gite di un giorno).
const IT_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"Destinazioni in Marocco — Sahara, città imperiali e Atlante",description:"Scopri le principali destinazioni del Marocco: Marrakech, Fes, Merzouga, Chefchaouen, l’Atlante e la costa atlantica."},
  "/gallery":{title:"Foto e video del Marocco — Sahara, medine e montagne",description:"Fotografie e video dal Sahara, dalle medine, dalle montagne e dai campi tendati del deserto marocchino."},
  "/about":{title:"Chi siamo | Marocco, oltre il viaggio",description:"Morocco Grand Adventure: guide del deserto di Merzouga che raccontano tutto il Marocco con viaggi privati costruiti sul posto."},
  "/contact":{title:"Contatti — organizza il tuo viaggio in Marocco",description:"Contatta Morocco Grand Adventure via WhatsApp, e-mail o telefono per organizzare il tuo viaggio in Marocco."},
  "/travel-info":{title:"Informazioni pratiche sul Marocco — da un team locale",description:"Informazioni pratiche per viaggiare in Marocco: quando andare, cosa mettere in valigia e come spostarsi."},
  "/faq":{title:"FAQ viaggio in Marocco — domande frequenti",description:"Risposte alle domande più comuni su tour, deserto, bagagli e prenotazioni in Marocco."},
  '/student-tours/university-groups':{title:"Viaggi di gruppi universitari in Marocco",description:"Come dimensione del gruppo, tempi e logistica definiscono un programma studentesco in Marocco: da piccoli gruppi a gruppi più grandi con pianificazione anticipata."},
  '/student-tours':{title:"Viaggi studenteschi in Marocco | Viaggi universitari",description:"Programmi di viaggio per studenti e università in Marocco: cultura, storia, Sahara e avventura, organizzati per gruppi di studenti e università."},
  '/':{title:'Viaggio in Marocco — Tour privati e deserto di Merzouga',description:"Agenzia locale del deserto: tour privati in Marocco su misura — Erg Chebbi, città imperiali e Atlas, con guida locale. Richiedi un preventivo."},
  '/tours':{title:'Tour in Marocco — Viaggi privati su misura',description:"Tutti i tour privati in Marocco: itinerari nel deserto, città imperiali e costa atlantica da Marrakech, Fes, Casablanca e Agadir."},
  '/trip-finder':{title:'Trova il tuo viaggio in Marocco — Trova il tuo viaggio',description:"Rispondi a tre semplici domande e trova tour reali in Marocco adatti alle tue date, città di partenza e interessi."},
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
  // Individual tour pages — natural Italian, not a mechanical translation of
  // TOUR_META above: same real route/duration facts, phrased the way an
  // Italy-based traveler actually searches and reads (tour/viaggio privato,
  // Alto Atlante, dune di Erg Chebbi, gita di un giorno).
  '/tours/3-day-sahara-marrakech':{title:'Tour di Lusso di 3 Giorni nel Sahara da Marrakech',description:"Attraversa l'Alto Atlante fino ad Aït Ben Haddou, le valli del Dades e del Todra, poi un trekking in cammello al tramonto a Erg Chebbi con una notte in campo tendato di lusso."},
  '/tours/3-day-sahara-agadir':{title:'Tour Privato di 3 Giorni nel Sahara da Agadir a Merzouga',description:'Itinerario privato di tre giorni da Agadir al Sahara di Merzouga, attraverso il sud del Marocco e Ouarzazate. Percorso e notte nel deserto secondo le tue date.'},
  '/tours/5-day-imperial-cities':{title:'Tour di 5 Giorni: Città Imperiali e Deserto del Marocco',description:'Scopri Marrakech, Meknes, Fes e Chefchaouen prima di una notte nel Sahara, in un tour privato in Marocco.'},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'Tour di 7 Giorni: Città Imperiali e Fuga nel Sahara',description:"Sette giorni privati da Marrakech al Sahara e ritorno — Aït Ben Haddou, le gole del Dades e del Todra, due notti a Erg Chebbi e l'imperiale Fes."},
  '/tours/honeymoon-morocco':{title:'Luna di Miele Romantica in Marocco — Tour Privato di Lusso 10 Giorni',description:'Un viaggio privato e romantico in Marocco che unisce città, esperienze nel deserto e momenti pensati per le coppie.'},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'Tour di 8 Giorni: Marrakech, Essaouira, Agadir e il Sahara',description:"Otto giorni privati da Marrakech a Essaouira e Agadir, attraverso l'Atlante fino ad Aït Ben Haddou ed Erg Chebbi — trekking in cammello e notte nel deserto."},
  '/tours/family-morocco-adventure':{title:'Avventura in Famiglia in Marocco — Tour Privato 9 Giorni per Bambini',description:"Un tour familiare privato di 9 giorni in Marocco — Marrakech, un giro in mulo sull'Atlante, cammelli nel Sahara e kasbah, con un ritmo pensato per bambini e genitori."},
  '/tours/2-day-zagora-desert-marrakech':{title:'Tour di 2 Giorni nel Deserto di Zagora da Marrakech',description:'Un itinerario privato di due giorni da Marrakech, passando per Aït Ben Haddou, Ouarzazate e la valle del Draa fino a Zagora.'},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'Tour di 4 Giorni da Marrakech a Merzouga nel Sahara',description:'Quattro giorni da Marrakech a Merzouga via Aït Ben Haddou, Dades e Todra, con più tempo tra le dune di Erg Chebbi.'},
  '/tours/5-day-great-south-morocco':{title:'Tour di 5 Giorni nel Grande Sud del Marocco',description:'Scopri Aït Ben Haddou, Dades, Todra, Merzouga e la valle del Draa in un itinerario privato di cinque giorni nel sud del Marocco.'},
  '/tours/3-day-fes-merzouga-sahara':{title:'Tour Privato di 3 Giorni da Fes a Merzouga nel Sahara',description:'Viaggia in privato da Fes attraverso la foresta di cedri di Ifrane e la valle dello Ziz fino a Merzouga, per un tramonto nel Sahara e una notte a Erg Chebbi.'},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'Tour di 4 Giorni da Fes a Marrakech via Merzouga',description:"Un viaggio privato di sola andata da Fes a Marrakech passando per Merzouga, le gole del Todra, la valle del Dades e Aït Ben Haddou."},
  '/tours/fes-4-day':{title:'Percorso di 4 Giorni da Fes al Sahara di Merzouga',description:'Un tour privato andata e ritorno da Fes al Sahara, attraverso il Medio Atlante, la valle dello Ziz e le dune di Erg Chebbi.'},
  '/tours/fes-5-day':{title:"5 Giorni da Fes a Marrakech via Merzouga, Dades e l'Atlante",description:"Un itinerario privato di sola andata da Fes a Marrakech attraverso il Sahara, le gole e l'Alto Atlante."},
  '/tours/fes-8-day':{title:'Grand Tour di 8 Giorni: Città Imperiali da Fes e il Sahara',description:'Un viaggio privato di otto giorni da Fes attraverso Meknes, Volubilis e il Sahara, con una giornata guidata a Marrakech.'},
  '/tours/agadir-4-day':{title:"4 Giorni da Agadir a Marrakech via Taroudant e l'Atlante",description:"Un itinerario privato da Agadir a Marrakech passando per Taroudant, Ouarzazate e Aït Ben Haddou, con tempo per godersi Marrakech."},
  '/tours/agadir-5-day':{title:'5 Giorni da Agadir a Marrakech via Ouarzazate e Merzouga',description:'Un itinerario privato di sola andata da Agadir a Marrakech tra le kasbah, le gole e il Sahara di Erg Chebbi.'},
  '/tours/agadir-8-day':{title:'Grande Circuito di 8 Giorni nel Sud del Marocco da Agadir',description:'Un circuito privato di otto giorni da Agadir attraverso Taroudant, Ouarzazate, il Sahara, la valle del Draa e Marrakech.'},
  '/tours/marrakech-4-day':{title:'Esploratore di 4 Giorni: da Marrakech al Sahara di Merzouga',description:'Un circuito privato di quattro giorni da Marrakech al Sahara, con Aït Ben Haddou, le gole del Dades e del Todra e una notte tra le dune di Erg Chebbi.'},
  '/tours/casablanca-3-day':{title:'Tour Privato di 3 Giorni: Casablanca a Fes via Chefchaouen',description:"Un itinerario privato da Casablanca a Fes, con una notte nella città blu di Chefchaouen, l'imperiale Meknes, la romana Volubilis e una giornata guidata nella medina di Fes."},
  '/tours/casablanca-4-day':{title:'4 Giorni da Casablanca a Fes lungo la Costa Atlantica e Chefchaouen',description:'Un itinerario privato e rilassato da Casablanca a Fes lungo la costa atlantica, con Chefchaouen, Meknes e Volubilis.'},
  '/tours/casablanca-5-day':{title:'5 Giorni: Percorso nel Deserto da Casablanca a Merzouga e Fes',description:'Un itinerario privato da Casablanca a Fes e al Sahara, con una notte tra le dune di Erg Chebbi e un trekking in cammello al tramonto.'},
  '/tours/casablanca-8-day':{title:'Grande Circuito di 8 Giorni in Marocco da Casablanca',description:'Un circuito privato di otto giorni da Casablanca attraverso Rabat, Chefchaouen, Fes, il Sahara, le gole e Marrakech.'},
  '/tours/tangier-3-day':{title:'Tour di 3 Giorni: Tangeri, Chefchaouen e Tetouan nel Nord',description:'Un circuito privato andata e ritorno da Tangeri attraverso Tetouan, la città blu di Chefchaouen e le cascate della valle di Akchour.'},
  '/tours/tangier-5-day':{title:"5 Giorni da Tangeri a Fes via Chefchaouen e il Rif",description:'Un itinerario privato di sola andata da Tangeri attraverso Tetouan, Chefchaouen, la valle di Akchour e il Medio Atlante fino a Fes.'},
  '/tours/marrakech-essaouira-2-day':{title:'Tour di 2 Giorni da Marrakech a Essaouira — Costa Atlantica',description:'Una fuga privata di due giorni da Marrakech alla costa atlantica di Essaouira — medina patrimonio UNESCO, bastioni e porto.'},
  '/tours/14-day-grand-morocco-journey':{title:'Grand Tour di 14 Giorni in Marocco — Costa, Sahara e Nord',description:'Il circuito privato completo del Marocco: Marrakech, la costa atlantica, il sud, due notti a Erg Chebbi, Fes, Meknes, Chefchaouen e Casablanca.'},
  '/tours/marrakech-ourika-valley-day-trip':{title:"Gita di un Giorno da Marrakech alla Valle dell'Ourika",description:"Una gita privata di un giorno da Marrakech alla valle dell'Ourika — villaggi berberi, le cascate di Setti Fatma e una cooperativa di olio di argan, a meno di un'ora dalla città."},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'Gita di un Giorno da Marrakech alle Cascate di Ouzoud',description:'Una gita privata di un giorno da Marrakech alle cascate di Ouzoud, le più famose del Marocco, a circa 150 km dalla città, con sentieri lungo il fiume e macachi magot.'},
  '/tours/marrakech-imlil-day-trip':{title:'Gita di un Giorno da Marrakech a Imlil',description:'Una gita privata di un giorno da Marrakech sull\'Alto Atlante fino a Imlil, il villaggio di partenza per il Toubkal, a circa 90 minuti dalla città.'},
  '/tours/agadir-taghazout-day-trip':{title:'Gita di un Giorno da Agadir a Taghazout',description:'Una gita privata di un giorno da Agadir a Taghazout, il villaggio di surf sulla costa atlantica a 20 minuti — porto di pescatori, l\'onda di Anchor Point e caffè sul mare.'},
  // Destination pages — same pattern as the tour entries above: natural
  // Italian, same real facts as DESTINATION_META (English).
  '/destinations/marrakech':{title:'Marrakech — Tour e Guida di Viaggio in Marocco',description:'Scopri Marrakech, la sua medina, i souk e i principali luoghi culturali. Pianifica il tuo viaggio in Marocco con esperti locali.'},
  '/destinations/fes':{title:'Fes — Tour e Guida di Viaggio in Marocco',description:'Esplora Fes, il cuore culturale del Marocco e la sua medina storica. Pianifica il tuo viaggio a Fes con esperti locali.'},
  '/destinations/meknes':{title:'Meknes — Tour e Guida di Viaggio in Marocco',description:'Scopri Meknes, città imperiale con porte storiche, medina e la vicina Volubilis.'},
  '/destinations/casablanca':{title:'Casablanca — Tour e Guida di Viaggio in Marocco',description:'Esplora Casablanca, la Moschea Hassan II e la porta atlantica del Marocco.'},
  '/destinations/rabat':{title:'Rabat — Tour e Guida di Viaggio in Marocco',description:'Scopri Rabat, la capitale del Marocco, la Kasbah degli Oudaya e la Torre Hassan.'},
  '/destinations/merzouga':{title:'Merzouga — Tour nel Deserto del Sahara e Guida di Viaggio',description:'Il villaggio ai margini di Erg Chebbi — come raggiungere Merzouga da Marrakech o Fes, come sono i campi nel deserto e quanto tempo restare tra le dune.'},
  '/destinations/erg-chebbi':{title:'Erg Chebbi — Tour nel Deserto del Sahara e Guida di Viaggio',description:'Le dune più alte del Marocco, accanto a Merzouga — quanto sono alte, quando la luce è migliore, e come si svolge un trekking in cammello al tramonto con notte in campo.'},
  '/destinations/ouarzazate':{title:'Ouarzazate — Tour e Guida di Viaggio in Marocco',description:'Esplora Ouarzazate, le kasbah, il patrimonio cinematografico e la porta del sud del Marocco.'},
  '/destinations/ait-ben-haddou':{title:"Aït Ben Haddou — Guida ai Tour UNESCO in Marocco",description:"Il ksar di terra sul fiume Ounila, Patrimonio dell'Umanità UNESCO — cosa vedere salendo al granaio e la sua posizione lungo una rotta verso il Sahara."},
  '/destinations/zagora':{title:'Zagora — Tour nel Deserto del Sahara e Guida di Viaggio',description:'La città della valle del Draa dove inizia il Sahara — come si confronta Zagora con Erg Chebbi, e cosa include davvero un viaggio di due giorni nel deserto da Marrakech.'},
  '/destinations/dades-valley':{title:'Valle del Dades — Valle delle Mille Kasbah, Guida',description:'Giardini terrazzati, pareti di canyon e kasbah a ogni curva, con i famosi tornanti sopra Boulmane Dades — tappa classica sulla rotta Marrakech–Merzouga.'},
  '/destinations/todra-gorge':{title:'Gole del Todra — Il Grande Canyon del Marocco, Guida',description:'Pareti calcaree di 300 metri che si restringono in un corridoio di 10 metri — arrampicata, passeggiate lungo il fiume, tappa classica sulla rotta Marrakech–Merzouga.'},
  '/destinations/skoura':{title:'Oasi di Skoura — Palmeto Millenario, Guida di Viaggio',description:"Una vasta oasi di palme sulla Strada delle Mille Kasbah, sede della restaurata Kasbah Amridil — cultura delle kasbah senza la folla di Aït Ben Haddou."},
  '/destinations/roses-valley':{title:'Valle delle Rose — Tour e Guida di Viaggio in Marocco',description:'Scopri la Valle delle Rose del Marocco e i suoi paesaggi d\'oasi.'},
  '/destinations/draa-valley':{title:'Valle del Draa — Tour e Guida di Viaggio in Marocco',description:'La valle fluviale più lunga del Marocco — palmeti, kasbah di terra e la strada verso sud attraverso Agdz e Zagora, con le soste che vale la pena fare.'},
  '/destinations/chefchaouen':{title:'Chefchaouen — Tour e Guida di Viaggio in Marocco',description:'Scopri Chefchaouen, la medina blu tra le montagne del Rif marocchino.'},
  '/destinations/imlil':{title:"Imlil — Tour sull'Atlante e Guida di Viaggio",description:'Esplora Imlil e l\'Atlante, i villaggi berberi e i sentieri di trekking.'},
  '/destinations/ourika-valley':{title:"Valle dell'Ourika — Tour e Guida di Viaggio in Marocco",description:"Scopri la valle dell'Ourika, i paesaggi di montagna e i villaggi berberi vicino a Marrakech."},
  '/destinations/ouzoud':{title:'Cascate di Ouzoud — Tour e Guida di Viaggio in Marocco',description:'Visita le cascate di Ouzoud ed esplora i paesaggi circostanti del Medio Atlante.'},
  '/destinations/ifrane':{title:'Ifrane e la Foresta di Cedri — Tour e Guida di Viaggio',description:'Scopri Ifrane e le foreste di cedri del Medio Atlante marocchino.'},
  '/destinations/essaouira':{title:'Essaouira — Tour e Guida di Viaggio in Marocco',description:"Esplora Essaouira, la sua medina atlantica, il porto e l'atmosfera costiera."},
  '/destinations/agadir':{title:'Agadir — Tour e Guida di Viaggio in Marocco',description:'Scopri Agadir, la sua costa atlantica e le spiagge nel sud del Marocco.'},
  '/destinations/taghazout':{title:'Taghazout — Tour di Surf e Guida di Viaggio in Marocco',description:'Esplora Taghazout e la costa atlantica del surf in Marocco.'},
  '/destinations/legzira':{title:'Spiaggia di Legzira — Tour e Guida di Viaggio in Marocco',description:'Scopri Legzira e la sua spettacolare costa atlantica.'},
  '/destinations/el-jadida':{title:'El Jadida — Cittadella Portoghese sull\'Atlantico, Guida',description:"L'ex Mazagan portoghese — una fortezza del XVI secolo patrimonio UNESCO, con la sua celebre cisterna, le mura e il pesce alla griglia nel porto vecchio."},
  '/destinations/tangier':{title:'Tangeri — La Porta del Marocco verso l\'Europa, Guida',description:"Dove l'Atlantico incontra il Mediterraneo — la Kasbah, le Grotte di Ercole, il passato come zona internazionale, a meno di un'ora di traghetto dalla Spagna."},
  '/destinations/tetouan':{title:'Tetouan — Tour e Guida di Viaggio in Marocco',description:'Esplora Tetouan e la sua storica medina bianca nel nord del Marocco.'},
  '/destinations/akchour':{title:'Akchour e il Ponte di Dio — Tour e Guida di Viaggio',description:"Cascate e pozze blu-verdi nel Rif sopra Chefchaouen — la camminata fino alle cascate e al Ponte di Dio, quanto dura e com'è il sentiero."},
  '/destinations/nkob':{title:'Nkob — Il Villaggio delle 45 Kasbah, Guida di Viaggio',description:'Un villaggio remoto ai piedi del Jbel Saghro, noto per le sue 45 kasbah storiche, osservazione delle stelle e trekking senza la folla del Toubkal.'},
  '/destinations/mirleft':{title:'Mirleft — Villaggio Surf sull\'Atlantico Selvaggio, Guida',description:'Un villaggio di surf e pesca incontaminato tra Tiznit e Sidi Ifni — tramonti sulle scogliere, l\'onda di Marabout e calette tranquille lontane dalla folla.'},
  '/travel-info/morocco-basics':{title:'Le Basi del Marocco — Posizione, Lingua, Valuta e Governo',description:"Informazioni essenziali per chi viaggia per la prima volta: dove si trova il Marocco, lingue parlate, valuta, requisiti del visto e organizzazione del paese per regioni."},
  '/travel-info/atlas-mountains-guide':{title:"Atlante Marocco — Guida all'Alto Atlante, Imlil, Toubkal e Ourika",description:"Le montagne dell'Atlante spiegate ai viaggiatori — Alto Atlante, Atlante Medio e Anti-Atlante, il Toubkal e Imlil, la valle dell'Ourika, e come inserire una giornata in montagna in un viaggio a Marrakech."},
  '/travel-info/amazigh-berber-culture':{title:'Cultura Amazigh (Berbera) in Marocco — Introduzione per Viaggiatori',description:"Un'introduzione alla cultura amazigh (berbera) in Marocco per i viaggiatori — lingua, dove vivono le comunità, architettura delle kasbah, artigianato, musica e come visitare con rispetto."},
  '/travel-info/best-time-to-visit-morocco':{title:'Periodo Migliore per Visitare il Marocco — Guida Stagione per Stagione',description:'Quando visitare il Marocco: primavera e autunno per la maggior parte delle regioni, come variano estate e inverno tra costa, montagne e Sahara, e come scegliere le date.'},
  '/travel-info/getting-around-morocco':{title:'Come Spostarsi in Marocco — Le Opzioni di Trasporto Spiegate',description:"Come viaggiare in Marocco: quando un conducente privato è meglio del treno o dell'autobus, quali sono i tempi di percorrenza reali tra Marrakech, Fes e il Sahara, e come consultare gli orari attuali."},
  '/travel-info/moroccan-food-and-cuisine':{title:'Guida alla Cucina Marocchina — Tajine, Couscous e Tè alla Menta',description:'Guida alla cucina marocchina per i viaggiatori — tajine e couscous, il rituale del tè alla menta, street food e spezie, dolci e piatti del Ramadan, e come mangiare bene.'},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Guida ai Souk Marocchini — Shopping e Contrattazione',description:'Guida pratica ai souk del Marocco — come sono organizzati i quartieri del mercato a Marrakech e Fes, come funziona la contrattazione, e cosa comprare per durare.'},
  '/travel-info/morocco-travel-safety':{title:'Il Marocco è Sicuro? Guida Pratica alla Sicurezza per Viaggiatori',description:"Guida onesta sulla sicurezza in Marocco — truffe comuni, viaggiatrici e viaggiatori solitari, il terremoto del 2023, il caldo d'estate, e i veri numeri di emergenza."},
  '/travel-info/what-to-pack-morocco':{title:'Cosa Mettere in Valigia per il Marocco — Lista Pratica',description:'Lista realistica per la valigia per il Marocco: strati per le notti fredde nel deserto, protezione solare, scarpe per le medine e le dune, e cosa lasciare a casa.'},
  '/student-tours/3-day-morocco-student-tour':{title:'Viaggio Studentesco Marocco 3 Giorni | Marrakech, Atlante e Sahara',description:"Itinerario di tre giorni per studenti da Marrakech, attraverso l'Alto Atlante fino ad Aït Ben Haddou e le dune di Erg Chebbi a Merzouga. Per gruppi scolastici."},
  '/student-tours/4-day-morocco-student-tour':{title:'Viaggio Studentesco in Marocco di 4 Giorni | Atlante, Valli e Sahara',description:'Itinerario di quattro giorni per studenti da Marrakech ad Aït Ben Haddou, le valli del Dades e del Todra, con due notti nel deserto di Erg Chebbi. Per gruppi scolastici.'},
  '/student-tours/5-day-morocco-student-tour':{title:'Viaggio Studentesco Marocco 5 Giorni | Marrakech, Sahara e Merzouga',description:"Itinerario di cinque giorni per studenti da Marrakech, attraverso l'Alto Atlante fino ad Aït Ben Haddou, con due notti nel deserto di Erg Chebbi. Per gruppi scolastici."},
  '/student-tours/10-day-morocco-student-tour':{title:'Viaggio Studentesco Marocco 10 Giorni | Città Imperiali e Sahara',description:'Un itinerario di dieci giorni per studenti che collega Marrakech, Aït Ben Haddou, il Sahara di Erg Chebbi, Fes e Chefchaouen. Per gruppi universitari e studenteschi.'},
};

// German — vocabulary per ONMT-de / DE-market usage (Rundreise, Wüstentour,
// Kaiserstädte, Kasbah-Straße, Wüstencamp, Kameltrekking).
const DE_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"Reiseziele in Marokko — Sahara, Königsstädte, Atlas",description:"Entdecken Sie Marokkos wichtigste Reiseziele: Marrakesch, Fès, Merzouga, Chefchaouen, den Atlas und die Atlantikküste."},
  "/gallery":{title:"Marokko in Bildern und Videos — Sahara, Medinas, Berge",description:"Fotos und Videos aus der Sahara, den Medinas, den Bergen und den Wüstencamps Marokkos."},
  "/about":{title:"Über uns | Marokko, jenseits der Reise",description:"Morocco Grand Adventure: Wüstenguides aus Merzouga, die ganz Marokko in privat geplanten Reisen zeigen."},
  "/contact":{title:"Kontakt — planen Sie Ihre Marokko-Reise",description:"Kontaktieren Sie Morocco Grand Adventure per WhatsApp, E-Mail oder Telefon, um Ihre Marokko-Reise zu planen."},
  "/travel-info":{title:"Praktische Marokko-Infos — von einem lokalen Team",description:"Praktische Informationen für Marokko: beste Reisezeit, Packliste und wie man vor Ort unterwegs ist."},
  "/faq":{title:"Marokko-FAQ — häufige Fragen zu Reisen und Touren",description:"Antworten auf häufige Fragen zu Marokko-Reisen, Wüstentouren, Gepäck und Buchung."},
  '/student-tours/university-groups':{title:"Universitätsgruppenreisen in Marokko",description:"Wie Gruppengröße, Vorlaufzeit und Logistik ein Studienprogramm in Marokko prägen — von kleinen Gruppen bis zu größeren Gruppen mit früher Planung."},
  '/student-tours':{title:"Studienreisen Marokko | Universitäts- & Bildungsreisen",description:"Studien- und Universitätsreisen in Marokko: Kultur, Geschichte, Sahara und Abenteuer — organisiert für Studierenden- und Universitätsgruppen."},
  '/':{title:'Marokko Rundreisen — Private Wüstentouren nach Maß',description:"Private Marokko-Rundreisen mit lokalen Sahara-Guides: Merzouga & Erg Chebbi, Kaiserstädte und Atlas — individuell ab Marrakesch oder Fes."},
  '/tours':{title:'Marokko Touren — Private Rundreisen im Überblick',description:"Alle privaten Marokko-Rundreisen: Wüstentouren, Kaiserstädte und Atlantikküste ab Marrakesch, Fes, Casablanca und Agadir."},
  '/trip-finder':{title:'Finden Sie Ihre Marokkoreise — Reisefinder',description:"Beantworten Sie drei kurze Fragen und finden Sie echte Marokko-Touren passend zu Ihren Terminen, Ihrer Abreisestadt und Ihren Interessen."},
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
  '/travel-info/morocco-basics':{title:'Marokko Basiswissen — Lage, Sprache, Währung und Regierung',description:"Die wichtigsten Fakten für Erstbesucher: wo Marokko liegt, welche Sprachen gesprochen werden, Währung und Visa-Grundlagen, und wie das Land in Regionen gegliedert ist."},
  '/travel-info/atlas-mountains-guide':{title:'Atlasgebirge Marokko — Hoher Atlas, Imlil, Toubkal und Ourika',description:"Das Atlasgebirge für Reisende erklärt — Hoher und Mittlerer Atlas, der Toubkal und Imlil, das Ourika-Tal, und wie ein Bergtag in eine Marrakesch-Reise passt."},
  '/travel-info/amazigh-berber-culture':{title:'Amazigh- (Berber-) Kultur in Marokko — Eine Einführung für Reisende',description:"Amazigh- (Berber-) Kultur in Marokko für Reisende — Sprache, Siedlungsgebiete, Kasbah-Architektur, Handwerk, Musik und respektvolles Besuchen."},
  '/travel-info/best-time-to-visit-morocco':{title:'Beste Reisezeit für Marokko — Saison für Saison erklärt',description:"Beste Reisezeit für Marokko: Frühling und Herbst für die meisten Regionen, Sommer und Winter zwischen Küste, Bergen und Sahara, und wie man Reisedaten wählt."},
  '/travel-info/getting-around-morocco':{title:'Fortbewegung in Marokko — Verkehrsmittel im Überblick',description:"Wie man sich in Marokko fortbewegt: wann ein privater Fahrer besser ist als Zug oder Bus, Fahrzeiten zwischen Marrakesch, Fes und der Sahara, und wie man Fahrpläne prüft."},
  '/travel-info/moroccan-food-and-cuisine':{title:'Marokkanische Küche — Tajine, Couscous und Pfefferminztee',description:"Reiseführer zur marokkanischen Küche — Tajine und Couscous, das Pfefferminztee-Ritual, Street Food und Gewürze, Süßspeisen und Ramadan-Gerichte, und wie man gut isst."},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Marokkanische Souks — Einkaufs- und Verhandlungsguide',description:"Leitfaden zu Marokkos Souks — wie die Marktviertel in Marrakesch und Fes aufgebaut sind, wie das Verhandeln wirklich funktioniert, und was man für etwas Bleibendes kauft."},
  '/travel-info/morocco-travel-safety':{title:'Ist Marokko Sicher? Praktischer Sicherheitsratgeber für Reisende',description:"Ehrlicher Sicherheitsratgeber für Marokko — häufige Betrugsversuche, Alleinreisende und Frauen, das Erdbeben von 2023, Hitze im Sommer, und echte Notrufnummern."},
  '/travel-info/what-to-pack-morocco':{title:'Was man für Marokko einpacken sollte — Praktische Packliste',description:"Eine realistische Packliste für Marokko: Schichten für kalte Wüstennächte, Sonnenschutz, Schuhe für Medinas und Dünen, und was man besser zu Hause lässt."},
  '/student-tours/3-day-morocco-student-tour':{title:'3-Tägige Marokko-Studienreise | Marrakesch, Atlas und Sahara',description:"Dreitägige Studienreise ab Marrakesch über den Hohen Atlas nach Aït Ben Haddou und zu den Dünen von Erg Chebbi bei Merzouga. Für Schülergruppen."},
  '/student-tours/4-day-morocco-student-tour':{title:'4-Tägige Marokko-Studienreise | Atlas, Oasentäler und Sahara',description:"Viertägige Studienreise von Marrakesch nach Aït Ben Haddou, durch das Dadès- und Todra-Tal, mit zwei Nächten in der Wüste von Erg Chebbi. Für Schülergruppen."},
  '/student-tours/5-day-morocco-student-tour':{title:'5-Tägige Marokko-Studienreise | Marrakesch, Sahara und Merzouga',description:"Fünftägige Studienreise ab Marrakesch über den Hohen Atlas nach Aït Ben Haddou, mit zwei Nächten in der Wüste von Erg Chebbi bei Merzouga. Für Schülergruppen."},
  '/student-tours/10-day-morocco-student-tour':{title:'10-Tägige Marokko-Studienreise | Kaiserstädte, Rif und Sahara',description:"Eine zehntägige Studienreise, die Marrakesch, Aït Ben Haddou, die Sahara von Erg Chebbi, Fes und Chefchaouen verbindet. Für Universitäts- und Studierendengruppen."},
  '/tours/3-day-sahara-marrakech':{title:'3-tägige Luxus-Wüstentour ab Marrakesch in die Sahara',description:"Über den Hohen Atlas nach Aït Ben Haddou, durch das Dadès- und Todra-Tal, dann Kameltrekking bei Sonnenuntergang in Erg Chebbi mit Übernachtung im Luxus-Wüstencamp."},
  '/tours/3-day-sahara-agadir':{title:'3-tägige private Wüstentour ab Agadir nach Merzouga',description:"Private dreitägige Reise ab Agadir in die Sahara bei Merzouga, über den Süden Marokkos und Ouarzazate. Route und Wüstenübernachtung je nach Reisedatum bestätigt."},
  '/tours/5-day-imperial-cities':{title:'5-tägige Rundreise: Kaiserstädte und Wüste Marokkos',description:"Entdecken Sie Marrakesch, Meknes, Fes und Chefchaouen vor einer Nacht in der Sahara — eine private Marokko-Rundreise."},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'7-tägige Rundreise: Kaiserstädte und Sahara-Erlebnis',description:"Sieben private Tage von Marrakesch in die Sahara und zurück — Aït Ben Haddou, Dadès- und Todra-Schlucht, zwei Nächte in Erg Chebbi und die Kaiserstadt Fes."},
  '/tours/honeymoon-morocco':{title:'Romantische Flitterwochen in Marokko — 10-tägige private Luxusreise',description:"Eine private, romantische Marokko-Reise mit Städten, Wüstenerlebnissen und Momenten für Paare."},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'8-tägige Rundreise: Marrakesch, Essaouira, Agadir und die Sahara',description:"Acht private Tage von Marrakesch nach Essaouira und Agadir, über den Atlas nach Aït Ben Haddou und Erg Chebbi — Kameltrekking und Nacht in der Wüste."},
  '/tours/family-morocco-adventure':{title:'Familienabenteuer Marokko — 9-tägige private Reise für Kinder',description:"Eine private 9-tägige Familienreise durch Marokko — Marrakesch, Maultierritt im Atlas, Kamele in der Sahara und Kasbahs, im Tempo für Kinder und Eltern."},
  '/tours/2-day-zagora-desert-marrakech':{title:'2-tägige Wüstentour nach Zagora ab Marrakesch',description:"Private zweitägige Reise ab Marrakesch über Aït Ben Haddou, Ouarzazate und das Draa-Tal nach Zagora."},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'4-tägige Rundreise von Marrakesch nach Merzouga in die Sahara',description:"Vier Tage von Marrakesch nach Merzouga über Aït Ben Haddou, Dadès und Todra, mit mehr Zeit in den Dünen von Erg Chebbi."},
  '/tours/5-day-great-south-morocco':{title:'5-tägige Rundreise durch den Großen Süden Marokkos',description:"Entdecken Sie Aït Ben Haddou, Dadès, Todra, Merzouga und das Draa-Tal auf einer privaten fünftägigen Reise durch Südmarokko."},
  '/tours/3-day-fes-merzouga-sahara':{title:'3-tägige private Wüstentour von Fes nach Merzouga',description:"Private Reise ab Fes durch den Zedernwald von Ifrane und das Ziz-Tal nach Merzouga — Sonnenuntergang in der Sahara und Nacht in Erg Chebbi."},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'4-tägige Rundreise von Fes nach Marrakesch über Merzouga',description:"Private Reise in eine Richtung von Fes nach Marrakesch über Merzouga, die Todra-Schlucht, das Dadès-Tal und Aït Ben Haddou."},
  '/tours/fes-4-day':{title:'4-tägige Route von Fes in die Sahara nach Merzouga',description:"Private Hin- und Rückreise ab Fes in die Sahara, durch den Mittleren Atlas, das Ziz-Tal und die Dünen von Erg Chebbi."},
  '/tours/fes-5-day':{title:'5 Tage von Fes nach Marrakesch über Merzouga, Dadès und Atlas',description:"Private Reise in eine Richtung von Fes nach Marrakesch durch die Sahara, die Schluchten und den Hohen Atlas."},
  '/tours/fes-8-day':{title:'Große 8-tägige Rundreise: Kaiserstädte ab Fes und Sahara',description:"Private achttägige Reise ab Fes über Meknes, Volubilis und die Sahara, mit einem geführten Tag in Marrakesch."},
  '/tours/agadir-4-day':{title:'4 Tage von Agadir nach Marrakesch über Taroudant und Atlas',description:"Private Reise von Agadir nach Marrakesch über Taroudant, Ouarzazate und Aït Ben Haddou, mit Zeit für Marrakesch."},
  '/tours/agadir-5-day':{title:'5 Tage von Agadir nach Marrakesch über Ouarzazate und Merzouga',description:"Private Reise in eine Richtung von Agadir nach Marrakesch durch Kasbahs, Schluchten und die Sahara bei Erg Chebbi."},
  '/tours/agadir-8-day':{title:'Große 8-tägige Rundreise durch Südmarokko ab Agadir',description:"Private achttägige Reise ab Agadir über Taroudant, Ouarzazate, die Sahara, das Draa-Tal und Marrakesch."},
  '/tours/marrakech-4-day':{title:'4-tägige Entdeckertour: von Marrakesch in die Sahara nach Merzouga',description:"Private viertägige Reise ab Marrakesch in die Sahara, mit Aït Ben Haddou, Dadès- und Todra-Schlucht und einer Nacht in den Dünen von Erg Chebbi."},
  '/tours/casablanca-3-day':{title:'3-tägige private Reise: Casablanca nach Fes über Chefchaouen',description:"Private Reise von Casablanca nach Fes, mit einer Nacht in Chefchaouen, der Kaiserstadt Meknes, dem römischen Volubilis und einem geführten Tag in der Medina von Fes."},
  '/tours/casablanca-4-day':{title:'4 Tage Casablanca–Fes entlang der Atlantikküste und Chefchaouen',description:"Entspannte private Reise von Casablanca nach Fes entlang der Atlantikküste, mit Chefchaouen, Meknes und Volubilis."},
  '/tours/casablanca-5-day':{title:'5 Tage: Wüstenroute von Casablanca nach Merzouga und Fes',description:"Private Reise von Casablanca nach Fes und in die Sahara, mit einer Nacht in den Dünen von Erg Chebbi und Kameltrekking bei Sonnenuntergang."},
  '/tours/casablanca-8-day':{title:'Große 8-tägige Marokko-Rundreise ab Casablanca',description:"Private achttägige Reise ab Casablanca über Rabat, Chefchaouen, Fes, die Sahara, die Schluchten und Marrakesch."},
  '/tours/tangier-3-day':{title:'3-tägige Tour: Tanger, Chefchaouen und Tetouan im Norden',description:"Private Hin- und Rückreise ab Tanger über Tetouan, die blaue Stadt Chefchaouen und die Wasserfälle im Akchour-Tal."},
  '/tours/tangier-5-day':{title:'5 Tage von Tanger nach Fes über Chefchaouen und den Rif',description:"Private Reise in eine Richtung ab Tanger über Tetouan, Chefchaouen, das Akchour-Tal und den Mittleren Atlas nach Fes."},
  '/tours/marrakech-essaouira-2-day':{title:'2-tägiger Ausflug von Marrakesch nach Essaouira — Atlantikküste',description:"Private zweitägige Reise ab Marrakesch an die Atlantikküste nach Essaouira — UNESCO-Medina, Stadtmauern und Hafen."},
  '/tours/14-day-grand-morocco-journey':{title:'Große 14-tägige Marokko-Rundreise — Küste, Sahara und Norden',description:"Die komplette private Marokko-Reise: Marrakesch, die Atlantikküste, der Süden, zwei Nächte in Erg Chebbi, Fes, Meknes, Chefchaouen und Casablanca."},
  '/tours/marrakech-ourika-valley-day-trip':{title:'Tagesausflug von Marrakesch ins Ourika-Tal',description:"Tagesausflug ab Marrakesch ins Ourika-Tal — Berberdörfer, die Wasserfälle von Setti Fatma und eine Arganöl-Kooperative, weniger als eine Stunde entfernt."},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'Tagesausflug von Marrakesch zu den Ouzoud-Wasserfällen',description:"Privater Tagesausflug ab Marrakesch zu den bekanntesten Wasserfällen Marokkos, etwa 150 km von der Stadt entfernt, mit Flussuferwegen und Berberaffen."},
  '/tours/marrakech-imlil-day-trip':{title:'Tagesausflug von Marrakesch nach Imlil',description:"Privater Tagesausflug ab Marrakesch in den Hohen Atlas nach Imlil, dem Ausgangsdorf für den Toubkal, etwa 90 Minuten von der Stadt entfernt."},
  '/tours/agadir-taghazout-day-trip':{title:'Tagesausflug von Agadir nach Taghazout',description:"Privater Tagesausflug ab Agadir nach Taghazout, dem Surferdorf an der Atlantikküste, 20 Minuten entfernt — Fischerhafen, die Welle von Anchor Point und Cafés am Meer."},
  '/destinations/marrakech':{title:'Marrakesch — Touren und Reiseführer Marokko',description:"Entdecken Sie Marrakesch, seine Medina, die Souks und die wichtigsten kulturellen Sehenswürdigkeiten. Planen Sie Ihre Marokko-Reise mit lokalen Experten."},
  '/destinations/fes':{title:'Fes — Touren und Reiseführer Marokko',description:"Entdecken Sie Fes, das kulturelle Herz Marokkos und seine historische Medina. Planen Sie Ihre Reise nach Fes mit lokalen Experten."},
  '/destinations/meknes':{title:'Meknes — Touren und Reiseführer Marokko',description:"Entdecken Sie Meknes, eine Kaiserstadt mit historischen Toren, ihrer Medina und dem nahen Volubilis."},
  '/destinations/casablanca':{title:'Casablanca — Touren und Reiseführer Marokko',description:"Entdecken Sie Casablanca, die Hassan-II-Moschee und Marokkos Tor zum Atlantik."},
  '/destinations/rabat':{title:'Rabat — Touren und Reiseführer Marokko',description:"Entdecken Sie Rabat, die Hauptstadt Marokkos, die Kasbah der Oudayas und den Hassan-Turm."},
  '/destinations/merzouga':{title:'Merzouga — Wüstentouren Sahara und Reiseführer',description:"Das Dorf am Rand von Erg Chebbi — wie Sie Merzouga ab Marrakesch oder Fes erreichen, wie die Wüstencamps aussehen und wie lange Sie in den Dünen bleiben sollten."},
  '/destinations/erg-chebbi':{title:'Erg Chebbi — Wüstentouren Sahara und Reiseführer',description:"Die höchsten Dünen Marokkos, direkt bei Merzouga — ihre Höhe, die beste Zeit für Licht und Fotos, und was ein Kameltrekking bei Sonnenuntergang mit Wüstencamp beinhaltet."},
  '/destinations/ouarzazate':{title:'Ouarzazate — Touren und Reiseführer Marokko',description:"Entdecken Sie Ouarzazate, seine Kasbahs, das Filmerbe und das Tor zum Süden Marokkos."},
  '/destinations/ait-ben-haddou':{title:'Aït Ben Haddou — UNESCO-Touren Reiseführer Marokko',description:"Die Lehmstadt oberhalb des Oued Ounila, UNESCO-Weltkulturerbe — was Sie beim Aufstieg zum Kasbah-Speicher sehen und wie sie in eine Route zur Sahara passt."},
  '/destinations/zagora':{title:'Zagora — Wüstentouren Sahara und Reiseführer',description:"Die Stadt im Draa-Tal, wo die Sahara beginnt — wie sich Zagora von Erg Chebbi unterscheidet und was eine zweitägige Wüstentour ab Marrakesch wirklich umfasst."},
  '/destinations/dades-valley':{title:'Dadès-Tal — Tal der Tausend Kasbahs, Reiseführer',description:"Terrassengärten, Canyonwände und Kasbahs an jeder Kurve, mit den berühmten Serpentinen über Boulmane Dadès — klassische Übernachtung auf der Route Marrakesch–Merzouga."},
  '/destinations/todra-gorge':{title:'Todra-Schlucht — Marokkos großer Canyon, Reiseführer',description:"300 Meter hohe Kalksteinwände, die sich zu einem 10 Meter breiten Korridor verengen — Klettern, Wanderungen am Fluss, klassischer Stopp auf der Route Marrakesch–Merzouga."},
  '/destinations/skoura':{title:'Oase Skoura — 1.000 Jahre alter Palmenhain, Reiseführer',description:"Eine weite Palmenoase an der Straße der Tausend Kasbahs, Heimat der restaurierten Kasbah Amridil — Kasbah-Kultur ohne das Gedränge von Aït Ben Haddou."},
  '/destinations/roses-valley':{title:'Rosental — Touren und Reiseführer Marokko',description:"Entdecken Sie Marokkos Rosental und seine Oasenlandschaft."},
  '/destinations/draa-valley':{title:'Draa-Tal — Touren und Reiseführer Marokko',description:"Marokkos längstes Flusstal — Palmenhaine, Lehmkasbahs und die Route in den Süden über Agdz und Zagora, mit den lohnenswerten Stopps."},
  '/destinations/chefchaouen':{title:'Chefchaouen — Touren und Reiseführer Marokko',description:"Entdecken Sie Chefchaouen, die blaue Medina in den Rif-Bergen Marokkos."},
  '/destinations/imlil':{title:'Imlil — Atlas-Touren und Reiseführer',description:"Entdecken Sie Imlil und den Atlas, Berberdörfer und Wanderwege."},
  '/destinations/ourika-valley':{title:'Ourika-Tal — Touren und Reiseführer Marokko',description:"Entdecken Sie das Ourika-Tal, seine Berglandschaft und Berberdörfer nahe Marrakesch."},
  '/destinations/ouzoud':{title:'Ouzoud-Wasserfälle — Touren und Reiseführer Marokko',description:"Besuchen Sie die Ouzoud-Wasserfälle und entdecken Sie die umliegende Landschaft des Mittleren Atlas."},
  '/destinations/ifrane':{title:'Ifrane und der Zedernwald — Touren und Reiseführer',description:"Entdecken Sie Ifrane und die Zedernwälder des Mittleren Atlas in Marokko."},
  '/destinations/essaouira':{title:'Essaouira — Touren und Reiseführer Marokko',description:"Entdecken Sie Essaouira, seine Atlantik-Medina, den Hafen und die Küstenatmosphäre."},
  '/destinations/agadir':{title:'Agadir — Touren und Reiseführer Marokko',description:"Entdecken Sie Agadir, seine Atlantikküste und Strände im Süden Marokkos."},
  '/destinations/taghazout':{title:'Taghazout — Surftouren und Reiseführer Marokko',description:"Entdecken Sie Taghazout und Marokkos Atlantik-Surfküste."},
  '/destinations/legzira':{title:'Legzira-Strand — Touren und Reiseführer Marokko',description:"Entdecken Sie Legzira und seine spektakuläre Atlantikküste."},
  '/destinations/el-jadida':{title:'El Jadida — Portugiesische Zitadelle am Atlantik',description:"Das frühere portugiesische Mazagan — eine UNESCO-Festung aus dem 16. Jahrhundert mit berühmter Zisterne, Wehrmauern und gegrilltem Fisch im alten Hafen."},
  '/destinations/tangier':{title:'Tanger — Marokkos Tor nach Europa, Reiseführer',description:"Wo der Atlantik auf das Mittelmeer trifft — die Kasbah, die Herkulesgrotten, die Vergangenheit als internationale Zone, keine Stunde Fähre von Spanien entfernt."},
  '/destinations/tetouan':{title:'Tetouan — Touren und Reiseführer Marokko',description:"Entdecken Sie Tetouan und seine historische weiße Medina im Norden Marokkos."},
  '/destinations/akchour':{title:'Akchour und die Gottesbrücke — Touren und Reiseführer',description:"Wasserfälle und blaugrüne Becken im Rif oberhalb von Chefchaouen — die Wanderung zu den Wasserfällen und zur Gottesbrücke, ihre Dauer und der Zustand des Wegs."},
  '/destinations/nkob':{title:'Nkob — Das Dorf der 45 Kasbahs, Reiseführer',description:"Ein abgelegenes Dorf am Fuß des Jbel Saghro, bekannt für 45 historische Kasbahs, Sternbeobachtung fernab der Lichter und Wanderungen ohne Toubkal-Gedränge."},
  '/destinations/mirleft':{title:'Mirleft — Wildes Surfdorf am Atlantik, Reiseführer',description:"Ein unberührtes Surf- und Fischerdorf zwischen Tiznit und Sidi Ifni — Sonnenuntergänge an den Klippen, der Marabout-Surfspot und stille Buchten abseits der Massen."},
};
// Dutch — vocabulary per ONMT-nl / NL-market usage (rondreis, privéreis,
// woestijnreis, Keizerlijke Steden, Kasbahroute).
const NL_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"Bestemmingen in Marokko — Sahara, koningssteden, Atlas",description:"Ontdek de belangrijkste bestemmingen van Marokko: Marrakech, Fez, Merzouga, Chefchaouen, de Atlas en de Atlantische kust."},
  "/gallery":{title:"Marokko in foto’s en video’s — Sahara, medina’s, bergen",description:"Foto’s en video’s uit de Sahara, de medina’s, de bergen en de woestijnkampen van Marokko."},
  "/about":{title:"Over ons | Marokko, voorbij de reis",description:"Morocco Grand Adventure: woestijngidsen uit Merzouga die heel Marokko laten zien met privéreizen die ter plekke worden ontworpen."},
  "/contact":{title:"Contact — plan je reis door Marokko",description:"Neem contact op met Morocco Grand Adventure via WhatsApp, e-mail of telefoon om je reis door Marokko te plannen."},
  "/travel-info":{title:"Praktische reisinfo Marokko — van een lokaal team",description:"Praktische informatie voor Marokko: wanneer te gaan, wat mee te nemen en hoe je je verplaatst."},
  "/faq":{title:"Veelgestelde vragen over reizen in Marokko",description:"Antwoorden op veelgestelde vragen over rondreizen, de woestijn, bagage en boeken in Marokko."},
  '/student-tours/university-groups':{title:"Universitaire groepsreizen in Marokko",description:"Hoe groepsgrootte, doorlooptijd en logistiek een studentenprogramma in Marokko bepalen — van kleine groepen tot grotere groepen met vroege planning."},
  '/student-tours':{title:"Studiereizen Marokko | Universitaire & educatieve reizen",description:"Studie- en universiteitsreizen in Marokko: cultuur, geschiedenis, Sahara en avontuur, georganiseerd voor studenten- en universiteitsgroepen."},
  '/':{title:'Rondreis Marokko — Privéreizen & woestijn van Merzouga',description:"Lokale Sahara-gidsen organiseren uw privérondreis Marokko: Erg Chebbi, Keizerlijke Steden en Atlas — op maat vanaf Marrakech of Fez."},
  '/tours':{title:'Rondreis Marokko — Alle privéreizen op een rij',description:"Alle privérondreisen door Marokko: woestijnreizen, Keizerlijke Steden en Atlantische kust vanuit Marrakech, Fez, Casablanca en Agadir."},
  '/trip-finder':{title:'Vind uw Marokko-reis — Reisfinder',description:"Beantwoord drie korte vragen en vind echte Marokko-rondreizen die passen bij uw data, vertrekstad en interesses."},
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
  '/travel-info/morocco-basics':{title:'Marokko Basisinformatie — Ligging, Taal, Munt en Bestuur',description:"Belangrijkste feiten voor een eerste reis naar Marokko: ligging, gesproken talen, munteenheid, visumbasis en de indeling van het land in regio's."},
  '/travel-info/atlas-mountains-guide':{title:'Atlasgebergte Marokko — Gids voor Hoge Atlas, Imlil, Toubkal en Ourika',description:"Het Atlasgebergte uitgelegd — Hoge en Midden-Atlas, de Toubkal en Imlil, de Ourika-vallei, en hoe een bergdag past in een reis naar Marrakech."},
  '/travel-info/amazigh-berber-culture':{title:'Amazigh- (Berber-) Cultuur in Marokko — Introductie voor Reizigers',description:"Amazigh- (Berber-) cultuur in Marokko voor reizigers — taal, gemeenschappen, kasbah-architectuur, ambacht, muziek en hoe je respectvol op bezoek gaat."},
  '/travel-info/best-time-to-visit-morocco':{title:'Beste Tijd om Marokko te Bezoeken — Seizoensgids',description:"Wanneer Marokko te bezoeken: voorjaar en najaar voor de meeste regio's, hoe zomer en winter verschillen tussen kust, bergen en Sahara, en hoe u data kiest voor een woestijnreis."},
  '/travel-info/getting-around-morocco':{title:'Vervoer in Marokko — De Mogelijkheden Uitgelegd',description:"Hoe u door Marokko reist: wanneer een privéchauffeur beter is dan de trein of bus, de reistijden tussen Marrakech, Fez en de Sahara, en de dienstregelingen."},
  '/travel-info/moroccan-food-and-cuisine':{title:'Marokkaanse Keuken Gids — Tajine, Couscous en Muntthee',description:"Reisgids over de Marokkaanse keuken — tajine en couscous, het muntthee-ritueel, straatvoedsel en specerijen, zoetigheden en ramadangerechten, en hoe u goed eet."},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Marokkaanse Soeks — Gids voor Winkelen en Onderhandelen',description:"Praktische gids over de soeks van Marokko — hoe de marktwijken van Marrakech en Fez zijn opgebouwd, hoe onderhandelen werkt, en wat u koopt voor iets duurzaams."},
  '/travel-info/morocco-travel-safety':{title:'Is Marokko Veilig? Praktische Veiligheidsgids voor Reizigers',description:"Eerlijke veiligheidsgids voor Marokko — oplichting en hoe u die vermijdt, solo- en vrouwelijke reizigers, de aardbeving van 2023, hitte in de zomer, en alarmnummers."},
  '/travel-info/what-to-pack-morocco':{title:'Wat Mee te Nemen naar Marokko — Praktische Paklijst',description:"Een realistische paklijst voor Marokko: laagjes kleding voor koude woestijnnachten, zonbescherming, schoeisel voor de medina's en de duinen, en wat u beter thuis laat."},
  '/student-tours/3-day-morocco-student-tour':{title:'3-Daagse Marokko Studiereis | Marrakech, Atlas en Sahara',description:"Een driedaagse studentenroute vanuit Marrakech over de Hoge Atlas naar Aït Ben Haddou en de duinen van Erg Chebbi bij Merzouga. Voor universitaire en studentengroepen."},
  '/student-tours/4-day-morocco-student-tour':{title:'4-Daagse Marokko Studiereis | Atlas, Oasevalleien en Sahara',description:"Vierdaagse studentenroute van Marrakech naar Aït Ben Haddou, de Dadès- en Todravallei, met twee nachten in de woestijn van Erg Chebbi. Voor schoolgroepen."},
  '/student-tours/5-day-morocco-student-tour':{title:'5-Daagse Marokko Studiereis | Marrakech, Sahara en Merzouga',description:"Vijfdaagse studentenroute vanuit Marrakech over de Hoge Atlas naar Aït Ben Haddou, met twee nachten in de woestijn van Erg Chebbi bij Merzouga. Voor schoolgroepen."},
  '/student-tours/10-day-morocco-student-tour':{title:'10-Daagse Marokko Studiereis | Keizerlijke Steden, Rif en Sahara',description:"Een tiendaagse studentenroute die Marrakech, Aït Ben Haddou, de Sahara van Erg Chebbi, Fez en Chefchaouen verbindt. Voor universitaire en studentengroepen."},
  '/tours/3-day-sahara-marrakech':{title:'3-daagse Luxe Woestijnreis vanuit Marrakech naar de Sahara',description:"Via de Hoge Atlas naar Aït Ben Haddou, door de Dadès- en Todravallei, en een kamelentocht bij zonsondergang in Erg Chebbi met een overnachting in een luxe woestijnkamp."},
  '/tours/3-day-sahara-agadir':{title:'3-daagse privé woestijnreis vanuit Agadir naar Merzouga',description:"Privérondreis van drie dagen vanuit Agadir naar de Sahara bij Merzouga, via het zuiden van Marokko en Ouarzazate. Route en overnachting op basis van uw data."},
  '/tours/5-day-imperial-cities':{title:'5-daagse Rondreis: Keizerlijke Steden en Woestijn van Marokko',description:"Ontdek Marrakech, Meknes, Fez en Chefchaouen, gevolgd door een nacht in de Sahara — een privérondreis door Marokko."},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'7-daagse Rondreis: Keizerlijke Steden en een Sahara-ontsnapping',description:"Zeven privédagen van Marrakech naar de Sahara en terug — Aït Ben Haddou, de Dadès- en Todravallei, twee nachten in Erg Chebbi en het keizerlijke Fez."},
  '/tours/honeymoon-morocco':{title:'Romantische Huwelijksreis naar Marokko — 10-daagse Privé Luxereis',description:"Een privé, romantische reis door Marokko met steden, woestijnervaringen en momenten voor koppels."},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'8-daagse Rondreis: Marrakech, Essaouira, Agadir en de Sahara',description:"Acht privédagen van Marrakech naar Essaouira en Agadir, via de Atlas naar Aït Ben Haddou en Erg Chebbi — kamelentocht en een nacht in de woestijn."},
  '/tours/family-morocco-adventure':{title:'Familieavontuur Marokko — 9-daagse Privéreis voor Kinderen',description:"Een privé 9-daagse familiereis door Marokko — Marrakech, een ezeltocht in de Atlas, kamelen in de Sahara en kasbahs, in een tempo dat past bij kinderen en ouders."},
  '/tours/2-day-zagora-desert-marrakech':{title:'2-daagse Woestijnreis naar Zagora vanuit Marrakech',description:"Privérondreis van twee dagen vanuit Marrakech, via Aït Ben Haddou, Ouarzazate en de Draavallei naar Zagora."},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'4-daagse Rondreis van Marrakech naar Merzouga in de Sahara',description:"Vier dagen van Marrakech naar Merzouga via Aït Ben Haddou, Dadès en Todra, met meer tijd tussen de duinen van Erg Chebbi."},
  '/tours/5-day-great-south-morocco':{title:'5-daagse Rondreis door het Grote Zuiden van Marokko',description:"Ontdek Aït Ben Haddou, Dadès, Todra, Merzouga en de Draavallei op een privérondreis van vijf dagen door Zuid-Marokko."},
  '/tours/3-day-fes-merzouga-sahara':{title:'3-daagse Privé Woestijnreis van Fez naar Merzouga',description:"Reis privé vanuit Fez door het cederbos van Ifrane en de Ziz-vallei naar Merzouga, voor een zonsondergang in de Sahara en een nacht in Erg Chebbi."},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'4-daagse Rondreis van Fez naar Marrakech via Merzouga',description:"Privéreis in één richting van Fez naar Marrakech via Merzouga, de Todra-vallei, de Dadèsvallei en Aït Ben Haddou."},
  '/tours/fes-4-day':{title:'4-daagse Route van Fez naar de Sahara bij Merzouga',description:"Privé retourreis vanuit Fez naar de Sahara, via de Midden-Atlas, de Ziz-vallei en de duinen van Erg Chebbi."},
  '/tours/fes-5-day':{title:'5 Dagen van Fez naar Marrakech via Merzouga, Dadès en de Atlas',description:"Privéreis in één richting van Fez naar Marrakech, door de Sahara, de valleien en de Hoge Atlas."},
  '/tours/fes-8-day':{title:'Grote 8-daagse Rondreis: Keizerlijke Steden vanuit Fez en de Sahara',description:"Privéreis van acht dagen vanuit Fez via Meknes, Volubilis en de Sahara, met een begeleide dag in Marrakech."},
  '/tours/agadir-4-day':{title:'4 Dagen van Agadir naar Marrakech via Taroudant en de Atlas',description:"Privéreis van Agadir naar Marrakech via Taroudant, Ouarzazate en Aït Ben Haddou, met tijd om van Marrakech te genieten."},
  '/tours/agadir-5-day':{title:'5 Dagen van Agadir naar Marrakech via Ouarzazate en Merzouga',description:"Privéreis in één richting van Agadir naar Marrakech, door kasbahs, valleien en de Sahara bij Erg Chebbi."},
  '/tours/agadir-8-day':{title:'Grote 8-daagse Rondreis door Zuid-Marokko vanuit Agadir',description:"Privéreis van acht dagen vanuit Agadir via Taroudant, Ouarzazate, de Sahara, de Draavallei en Marrakech."},
  '/tours/marrakech-4-day':{title:'4-daagse Ontdekkingsreis: van Marrakech naar de Sahara bij Merzouga',description:"Privérondreis van vier dagen vanuit Marrakech naar de Sahara, met Aït Ben Haddou, de Dadès- en Todravallei en een nacht tussen de duinen van Erg Chebbi."},
  '/tours/casablanca-3-day':{title:'3-daagse Privéreis: Casablanca naar Fez via Chefchaouen',description:"Privéreis van Casablanca naar Fez, met een nacht in de blauwe stad Chefchaouen, het keizerlijke Meknes, het Romeinse Volubilis en een begeleide dag in de medina van Fez."},
  '/tours/casablanca-4-day':{title:'4 Dagen Casablanca naar Fez langs de Atlantische Kust en Chefchaouen',description:"Ontspannen privéreis van Casablanca naar Fez langs de Atlantische kust, met Chefchaouen, Meknes en Volubilis."},
  '/tours/casablanca-5-day':{title:'5 Dagen: Woestijnroute van Casablanca naar Merzouga en Fez',description:"Privéreis van Casablanca naar Fez en de Sahara, met een nacht tussen de duinen van Erg Chebbi en een kamelentocht bij zonsondergang."},
  '/tours/casablanca-8-day':{title:'Grote 8-daagse Rondreis door Marokko vanuit Casablanca',description:"Privéreis van acht dagen vanuit Casablanca via Rabat, Chefchaouen, Fez, de Sahara, de valleien en Marrakech."},
  '/tours/tangier-3-day':{title:'3-daagse Reis: Tanger, Chefchaouen en Tétouan in het Noorden',description:"Privé retourreis vanuit Tanger via Tétouan, de blauwe stad Chefchaouen en de watervallen in de Akchour-vallei."},
  '/tours/tangier-5-day':{title:'5 Dagen van Tanger naar Fez via Chefchaouen en de Rif',description:"Privéreis in één richting vanuit Tanger via Tétouan, Chefchaouen, de Akchour-vallei en de Midden-Atlas naar Fez."},
  '/tours/marrakech-essaouira-2-day':{title:'2-daagse Reis van Marrakech naar Essaouira — Atlantische Kust',description:"Privé tweedaagse reis vanuit Marrakech naar de Atlantische kuststad Essaouira — medina op de Werelderfgoedlijst, stadsmuren en haven."},
  '/tours/14-day-grand-morocco-journey':{title:'Grote 14-daagse Rondreis door Marokko — Kust, Sahara en Noorden',description:"De complete privéreis door Marokko: Marrakech, de Atlantische kust, het zuiden, twee nachten in Erg Chebbi, Fez, Meknes, Chefchaouen en Casablanca."},
  '/tours/marrakech-ourika-valley-day-trip':{title:'Dagexcursie van Marrakech naar de Ourika-vallei',description:"Privé dagexcursie vanuit Marrakech naar de Ourika-vallei — Berberdorpen, de watervallen van Setti Fatma en een arganolie-coöperatie, op minder dan een uur van de stad."},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'Dagexcursie van Marrakech naar de Ouzoud-watervallen',description:"Privé dagexcursie vanuit Marrakech naar de bekendste watervallen van Marokko, op ongeveer 150 km van de stad, met paden langs de rivier en Berber-apen."},
  '/tours/marrakech-imlil-day-trip':{title:'Dagexcursie van Marrakech naar Imlil',description:"Privé dagexcursie vanuit Marrakech naar de Hoge Atlas, naar Imlil, het startpunt voor de Toubkal, op ongeveer 90 minuten van de stad."},
  '/tours/agadir-taghazout-day-trip':{title:'Dagexcursie van Agadir naar Taghazout',description:"Privé dagexcursie vanuit Agadir naar Taghazout, het surfdorp aan de Atlantische kust op 20 minuten — vissershaven, de golf van Anchor Point en cafés aan de zee."},
  '/destinations/marrakech':{title:'Marrakech — Rondreizen en Reisgids Marokko',description:"Ontdek Marrakech, de medina, de soeks en de belangrijkste culturele bezienswaardigheden. Plan uw reis door Marokko met lokale experts."},
  '/destinations/fes':{title:'Fez — Rondreizen en Reisgids Marokko',description:"Ontdek Fez, het culturele hart van Marokko en de historische medina. Plan uw reis naar Fez met lokale experts."},
  '/destinations/meknes':{title:'Meknes — Rondreizen en Reisgids Marokko',description:"Ontdek Meknes, een keizerstad met historische poorten, haar medina en het nabijgelegen Volubilis."},
  '/destinations/casablanca':{title:'Casablanca — Rondreizen en Reisgids Marokko',description:"Ontdek Casablanca, de Hassan II-moskee en de Atlantische poort van Marokko."},
  '/destinations/rabat':{title:'Rabat — Rondreizen en Reisgids Marokko',description:"Ontdek Rabat, de hoofdstad van Marokko, de Kasbah van de Oudaya's en de Hassantoren."},
  '/destinations/merzouga':{title:'Merzouga — Woestijnreizen Sahara en Reisgids',description:"Het dorp aan de rand van Erg Chebbi — hoe u Merzouga vanuit Marrakech of Fez bereikt, hoe de woestijnkampen eruitzien en hoelang u in de duinen moet blijven."},
  '/destinations/erg-chebbi':{title:'Erg Chebbi — Woestijnreizen Sahara en Reisgids',description:"De hoogste duinen van Marokko, naast Merzouga — hun hoogte, de beste momenten voor licht, en wat een kamelentocht bij zonsondergang met woestijnkamp inhoudt."},
  '/destinations/ouarzazate':{title:'Ouarzazate — Rondreizen en Reisgids Marokko',description:"Ontdek Ouarzazate, de kasbahs, het filmerfgoed en de poort naar Zuid-Marokko."},
  '/destinations/ait-ben-haddou':{title:'Aït Ben Haddou — UNESCO Rondreizen Reisgids Marokko',description:"De lemen stad boven de Oued Ounila, UNESCO Werelderfgoed — wat u ziet bij de beklimming naar de graanschuur, en haar plaats op een route naar de Sahara."},
  '/destinations/zagora':{title:'Zagora — Woestijnreizen Sahara en Reisgids',description:"De stad in de Draavallei waar de Sahara begint — hoe Zagora zich verhoudt tot Erg Chebbi, en wat een tweedaagse woestijnreis vanuit Marrakech werkelijk omvat."},
  '/destinations/dades-valley':{title:'Dadèsvallei — Vallei van Duizend Kasbahs, Reisgids',description:"Terrastuinen, kloofwanden en kasbahs bij elke bocht, met de beroemde haarspeldbochten boven Boulmane Dadès — een klassieke overnachting op de route Marrakech–Merzouga."},
  '/destinations/todra-gorge':{title:'Todra-kloof — Marokko\'s Grote Canyon, Reisgids',description:"300 meter hoge kalkstenen wanden die vernauwen tot een 10 meter brede doorgang — klimmen, wandelingen langs de rivier, klassieke stop op de route Marrakech–Merzouga."},
  '/destinations/skoura':{title:'Oase van Skoura — 1000 Jaar Oude Palmentuin, Reisgids',description:"Een uitgestrekte palmoase aan de Weg van Duizend Kasbahs, met de gerestaureerde Kasbah Amridil — kasbahcultuur zonder de drukte van Aït Ben Haddou."},
  '/destinations/roses-valley':{title:'Rozenvallei — Rondreizen en Reisgids Marokko',description:"Ontdek de Rozenvallei van Marokko en haar oaselandschap."},
  '/destinations/draa-valley':{title:'Draavallei — Rondreizen en Reisgids Marokko',description:"Marokko's langste riviervallei — palmbossen, lemen kasbahs en de route naar het zuiden via Agdz en Zagora, met de stops die de moeite waard zijn."},
  '/destinations/chefchaouen':{title:'Chefchaouen — Rondreizen en Reisgids Marokko',description:"Ontdek Chefchaouen, de blauwe medina in de Rif-bergen van Marokko."},
  '/destinations/imlil':{title:'Imlil — Atlas Rondreizen en Reisgids',description:"Ontdek Imlil en de Atlas, Berberdorpen en wandelpaden."},
  '/destinations/ourika-valley':{title:'Ourika-vallei — Rondreizen en Reisgids Marokko',description:"Ontdek de Ourika-vallei, het berglandschap en de Berberdorpen nabij Marrakech."},
  '/destinations/ouzoud':{title:'Ouzoud-watervallen — Rondreizen en Reisgids Marokko',description:"Bezoek de Ouzoud-watervallen en ontdek het omliggende landschap van de Midden-Atlas."},
  '/destinations/ifrane':{title:'Ifrane en het Cederbos — Rondreizen en Reisgids',description:"Ontdek Ifrane en de cederbossen van de Midden-Atlas in Marokko."},
  '/destinations/essaouira':{title:'Essaouira — Rondreizen en Reisgids Marokko',description:"Ontdek Essaouira, de Atlantische medina, de haven en de kustsfeer."},
  '/destinations/agadir':{title:'Agadir — Rondreizen en Reisgids Marokko',description:"Ontdek Agadir, de Atlantische kust en de stranden in Zuid-Marokko."},
  '/destinations/taghazout':{title:'Taghazout — Surfreizen en Reisgids Marokko',description:"Ontdek Taghazout en de Atlantische surfkust van Marokko."},
  '/destinations/legzira':{title:'Legzira-strand — Rondreizen en Reisgids Marokko',description:"Ontdek Legzira en de spectaculaire Atlantische kust."},
  '/destinations/el-jadida':{title:'El Jadida — Portugese Citadel aan de Atlantische Kust',description:"Het voormalige Portugese Mazagan — een 16e-eeuws fort op de UNESCO-lijst, met zijn beroemde cisterne, vestingmuren en gegrilde vis bij de oude haven."},
  '/destinations/tangier':{title:'Tanger — Marokko\'s Poort naar Europa, Reisgids',description:"Waar de Atlantische Oceaan de Middellandse Zee ontmoet — de Kasbah, de Grotten van Hercules, en nog geen uur per veerboot vanuit Spanje."},
  '/destinations/tetouan':{title:'Tétouan — Rondreizen en Reisgids Marokko',description:"Ontdek Tétouan en de historische witte medina in Noord-Marokko."},
  '/destinations/akchour':{title:'Akchour en de Godsbrug — Rondreizen en Reisgids',description:"Watervallen en blauwgroene poelen in de Rif boven Chefchaouen — de wandeling naar de watervallen en de Godsbrug, de duur en de staat van het pad."},
  '/destinations/nkob':{title:'Nkob — Het Dorp van 45 Kasbahs, Reisgids',description:"Een afgelegen dorp aan de voet van de Jbel Saghro, bekend om zijn 45 historische kasbahs, sterrenkijken ver van de lichten en wandelingen zonder de drukte van Toubkal."},
  '/destinations/mirleft':{title:'Mirleft — Wild Surfdorp aan de Atlantische Kust',description:"Een ongerept surf- en vissersdorp tussen Tiznit en Sidi Ifni — zonsondergangen op de kliffen, de Marabout-surfspot en rustige baaien, ver van de drukte."},
};

// Portuguese — PT-PT anchored per ONMT-pt usage (Marraquexe, Cidades
// Imperiais, circuito privado, passeio de camelo, acampamento).
const PT_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"Destinos em Marrocos — Sara, cidades imperiais e Atlas",description:"Descubra os principais destinos de Marrocos: Marraquexe, Fez, Merzouga, Chefchaouen, o Atlas e a costa atlântica."},
  "/gallery":{title:"Marrocos em fotos e vídeos — Sara, medinas e montanhas",description:"Fotografias e vídeos do Sara, das medinas, das montanhas e dos acampamentos do deserto marroquino."},
  "/about":{title:"Quem somos | Marrocos, para além da viagem",description:"Morocco Grand Adventure: guias do deserto de Merzouga que mostram todo o Marrocos em viagens privadas desenhadas no terreno."},
  "/contact":{title:"Contacto — planeie a sua viagem a Marrocos",description:"Contacte a Morocco Grand Adventure por WhatsApp, e-mail ou telefone para planear a sua viagem a Marrocos."},
  "/travel-info":{title:"Informações práticas sobre Marrocos — equipa local",description:"Informações práticas para viajar em Marrocos: quando ir, o que levar e como circular."},
  "/faq":{title:"Perguntas frequentes sobre viajar em Marrocos",description:"Respostas às dúvidas mais comuns sobre circuitos, deserto, bagagem e reservas em Marrocos."},
  '/student-tours/university-groups':{title:"Viagens de grupos universitários em Marrocos",description:"Como a dimensão do grupo, a antecedência e a logística moldam um programa de estudantes em Marrocos — de grupos pequenos a grupos maiores com planeamento antecipado."},
  '/student-tours':{title:"Viagens de estudantes em Marrocos | Viagens universitárias",description:"Programas de viagem para estudantes e universidades em Marrocos: cultura, história, Saara e aventura, para grupos organizados de estudantes e universidades."},
  '/':{title:'Viagens a Marrocos — Circuitos privados e deserto de Merzouga',description:"Agência local do deserto: circuitos privados a Marrocos à medida — Erg Chebbi, Cidades Imperiais e Atlas, com guia local. Peça o seu orçamento."},
  '/tours':{title:'Viagens a Marrocos — Circuitos privados à medida',description:"Todos os circuitos privados a Marrocos: rotas do deserto, Cidades Imperiais e costa atlântica a partir de Marraquexe, Fez, Casablanca e Agadir."},
  '/trip-finder':{title:'Encontre a sua viagem a Marrocos — Localizador de viagens',description:"Responda a três perguntas rápidas e encontre circuitos reais por Marrocos que combinem com as suas datas, cidade de partida e interesses."},
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
  '/travel-info/morocco-basics':{title:'O Essencial sobre Marrocos — Localização, Língua, Moeda e Governo',description:"Informação essencial para quem viaja a Marrocos por primeira vez: localização, línguas faladas, moeda, aspectos básicos do visto e organização do país por regiões."},
  '/travel-info/atlas-mountains-guide':{title:'Atlas Marrocos — Guia do Alto Atlas, Imlil, Toubkal e Ourika',description:"As montanhas do Atlas para viajantes — Alto Atlas, Atlas Médio e Anti-Atlas, o Toubkal e Imlil, o vale de Ourika, e um dia de montanha numa viagem a Marraquexe."},
  '/travel-info/amazigh-berber-culture':{title:'Cultura Amazigh (Berbere) em Marrocos — Introdução para Viajantes',description:"Cultura amazigh (berbere) em Marrocos para viajantes — língua, comunidades, arquitetura das kasbahs, artesanato, música e como visitar com respeito."},
  '/travel-info/best-time-to-visit-morocco':{title:'Melhor Época para Visitar Marrocos — Guia Estação a Estação',description:"Quando visitar Marrocos: primavera e outono para a maioria das regiões, como variam verão e inverno entre costa, montanhas e Saara, e como escolher as datas."},
  '/travel-info/getting-around-morocco':{title:'Como Circular em Marrocos — As Opções de Transporte Explicadas',description:"Como viajar por Marrocos: quando um motorista privado é melhor do que o comboio ou autocarro, os trajetos entre Marraquexe, Fez e o Saara, e os horários."},
  '/travel-info/moroccan-food-and-cuisine':{title:'Guia da Cozinha Marroquina — Tagine, Cuscuz e Chá de Menta',description:"Guia da cozinha marroquina para viajantes — o tagine e o cuscuz, o ritual do chá de menta, comida de rua e especiarias, doces e pratos do ramadão, e como comer bem."},
  '/travel-info/moroccan-souks-shopping-guide':{title:'Guia dos Souks Marroquinos — Compras e Negociação',description:"Guia prático sobre os souks de Marrocos — como estão organizados os bairros comerciais de Marraquexe e Fez, como funciona a negociação, e o que comprar para durar."},
  '/travel-info/morocco-travel-safety':{title:'Marrocos é Seguro? Guia Prático de Segurança para Viajantes',description:"Guia honesto sobre segurança em Marrocos — golpes comuns, viajantes solo e mulheres, o terramoto de 2023, o calor no verão e em agosto, e números de emergência."},
  '/travel-info/what-to-pack-morocco':{title:'O que Levar para Marrocos — Lista Prática de Bagagem',description:"Lista realista para fazer as malas para Marrocos: camadas de roupa para noites frias no deserto, protecção solar, calçado para medinas e dunas, e o que deixar em casa."},
  '/student-tours/3-day-morocco-student-tour':{title:'Viagem de Estudantes a Marrocos de 3 Dias | Marraquexe, Atlas e Saara',description:"Percurso de três dias para estudantes a partir de Marraquexe, atravessando o Alto Atlas até Aït Ben Haddou e as dunas de Erg Chebbi em Merzouga. Para grupos escolares."},
  '/student-tours/4-day-morocco-student-tour':{title:'Viagem de Estudantes a Marrocos de 4 Dias | Atlas, Vales e Saara',description:"Percurso de quatro dias para estudantes de Marraquexe a Aït Ben Haddou, os vales do Dadès e do Todra, com duas noites no deserto de Erg Chebbi. Para grupos escolares."},
  '/student-tours/5-day-morocco-student-tour':{title:'Viagem Estudantes Marrocos 5 Dias | Marraquexe, Saara e Merzouga',description:"Percurso de cinco dias para estudantes desde Marraquexe, atravessando o Alto Atlas até Aït Ben Haddou, com duas noites no deserto de Erg Chebbi. Para grupos escolares."},
  '/student-tours/10-day-morocco-student-tour':{title:'Viagem Estudantes Marrocos 10 Dias | Cidades Imperiais e Saara',description:"Um percurso de dez dias para estudantes que liga Marraquexe, Aït Ben Haddou, o Saara de Erg Chebbi, Fez e Chefchaouen. Para grupos universitários e estudantis."},
  '/tours/3-day-sahara-marrakech':{title:'Circuito de Luxo de 3 Dias no Saara a partir de Marraquexe',description:"Atravesse o Alto Atlas até Aït Ben Haddou, os vales do Dadès e do Todra, e depois um passeio de camelo ao pôr do sol em Erg Chebbi com uma noite num acampamento de luxo."},
  '/tours/3-day-sahara-agadir':{title:'Circuito Privado de 3 Dias no Saara a partir de Agadir até Merzouga',description:"Viagem privada de três dias a partir de Agadir até ao Saara em Merzouga, pelo sul de Marrocos e Ouarzazate. Percurso e noite no deserto conforme as suas datas."},
  '/tours/5-day-imperial-cities':{title:'Circuito de 5 Dias: Cidades Imperiais e Deserto de Marrocos',description:"Descubra Marraquexe, Meknes, Fez e Chefchaouen antes de uma noite no Saara, numa viagem privada por Marrocos."},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'Circuito de 7 Dias: Cidades Imperiais e Escapada ao Saara',description:"Sete dias privados de Marraquexe até ao Saara e de volta — Aït Ben Haddou, os vales do Dadès e do Todra, duas noites em Erg Chebbi e a imperial Fez."},
  '/tours/honeymoon-morocco':{title:'Lua de Mel Romântica em Marrocos — Circuito Privado de Luxo de 10 Dias',description:"Uma viagem privada e romântica por Marrocos que combina cidades, experiências no deserto e momentos pensados para casais."},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'Circuito de 8 Dias: Marraquexe, Essaouira, Agadir e o Saara',description:"Oito dias privados de Marraquexe a Essaouira e Agadir, atravessando o Atlas até Aït Ben Haddou e Erg Chebbi — passeio de camelo e noite no deserto."},
  '/tours/family-morocco-adventure':{title:'Aventura em Família em Marrocos — Circuito Privado de 9 Dias',description:"Um circuito familiar privado de 9 dias por Marrocos — Marraquexe, um passeio de mula no Atlas, camelos no Saara e kasbahs, num ritmo pensado para crianças e pais."},
  '/tours/2-day-zagora-desert-marrakech':{title:'Circuito de 2 Dias ao Deserto de Zagora a partir de Marraquexe',description:"Viagem privada de dois dias a partir de Marraquexe, por Aït Ben Haddou, Ouarzazate e o vale do Draa até Zagora."},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'Circuito de 4 Dias de Marraquexe a Merzouga no Saara',description:"Quatro dias de Marraquexe a Merzouga via Aït Ben Haddou, Dadès e Todra, com mais tempo nas dunas de Erg Chebbi."},
  '/tours/5-day-great-south-morocco':{title:'Circuito de 5 Dias pelo Grande Sul de Marrocos',description:"Descubra Aït Ben Haddou, Dadès, Todra, Merzouga e o vale do Draa numa viagem privada de cinco dias pelo sul de Marrocos."},
  '/tours/3-day-fes-merzouga-sahara':{title:'Circuito Privado de 3 Dias de Fez a Merzouga no Saara',description:"Viaje em privado a partir de Fez através da floresta de cedros de Ifrane e do vale do Ziz até Merzouga, para um pôr do sol no Saara e uma noite em Erg Chebbi."},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'Circuito de 4 Dias de Fez a Marraquexe via Merzouga',description:"Viagem privada num só sentido de Fez a Marraquexe via Merzouga, o vale do Todra, o vale do Dadès e Aït Ben Haddou."},
  '/tours/fes-4-day':{title:'Itinerário de 4 Dias de Fez ao Saara em Merzouga',description:"Circuito privado de ida e volta a partir de Fez até ao Saara, atravessando o Médio Atlas, o vale do Ziz e as dunas de Erg Chebbi."},
  '/tours/fes-5-day':{title:'5 Dias de Fez a Marraquexe via Merzouga, Dadès e o Atlas',description:"Viagem privada num só sentido de Fez a Marraquexe, atravessando o Saara, os vales e o Alto Atlas."},
  '/tours/fes-8-day':{title:'Grande Circuito de 8 Dias: Cidades Imperiais a partir de Fez e o Saara',description:"Viagem privada de oito dias a partir de Fez via Meknes, Volubilis e o Saara, com um dia guiado em Marraquexe."},
  '/tours/agadir-4-day':{title:'4 Dias de Agadir a Marraquexe via Taroudant e o Atlas',description:"Viagem privada de Agadir a Marraquexe via Taroudant, Ouarzazate e Aït Ben Haddou, com tempo para desfrutar de Marraquexe."},
  '/tours/agadir-5-day':{title:'5 Dias de Agadir a Marraquexe via Ouarzazate e Merzouga',description:"Viagem privada num só sentido de Agadir a Marraquexe, atravessando kasbahs, vales e o Saara junto a Erg Chebbi."},
  '/tours/agadir-8-day':{title:'Grande Circuito de 8 Dias pelo Sul de Marrocos a partir de Agadir',description:"Viagem privada de oito dias a partir de Agadir via Taroudant, Ouarzazate, o Saara, o vale do Draa e Marraquexe."},
  '/tours/marrakech-4-day':{title:'Explorador de 4 Dias: de Marraquexe ao Saara em Merzouga',description:"Circuito privado de quatro dias a partir de Marraquexe até ao Saara, com Aït Ben Haddou, os vales do Dadès e do Todra e uma noite nas dunas de Erg Chebbi."},
  '/tours/casablanca-3-day':{title:'Circuito Privado de 3 Dias: Casablanca a Fez via Chefchaouen',description:"Viagem privada de Casablanca a Fez, com uma noite na cidade azul de Chefchaouen, a imperial Meknes, a romana Volubilis e um dia guiado na medina de Fez."},
  '/tours/casablanca-4-day':{title:'4 Dias de Casablanca a Fez pela Costa Atlântica e Chefchaouen',description:"Viagem privada e tranquila de Casablanca a Fez ao longo da costa atlântica, com Chefchaouen, Meknes e Volubilis."},
  '/tours/casablanca-5-day':{title:'5 Dias: Itinerário Desértico de Casablanca a Merzouga e Fez',description:"Viagem privada de Casablanca a Fez e ao Saara, com uma noite nas dunas de Erg Chebbi e um passeio de camelo ao pôr do sol."},
  '/tours/casablanca-8-day':{title:'Grande Circuito de 8 Dias por Marrocos a partir de Casablanca',description:"Viagem privada de oito dias a partir de Casablanca via Rabat, Chefchaouen, Fez, o Saara, os vales e Marraquexe."},
  '/tours/tangier-3-day':{title:'Circuito de 3 Dias: Tânger, Chefchaouen e Tetuão no Norte',description:"Viagem privada de ida e volta a partir de Tânger via Tetuão, a cidade azul de Chefchaouen e as cascatas do vale de Akchour."},
  '/tours/tangier-5-day':{title:'5 Dias de Tânger a Fez via Chefchaouen e o Rife',description:"Viagem privada num só sentido a partir de Tânger via Tetuão, Chefchaouen, o vale de Akchour e o Médio Atlas até Fez."},
  '/tours/marrakech-essaouira-2-day':{title:'Circuito de 2 Dias de Marraquexe a Essaouira — Costa Atlântica',description:"Escapadela privada de dois dias a partir de Marraquexe até à cidade costeira de Essaouira — medina Património Mundial, muralhas e porto."},
  '/tours/14-day-grand-morocco-journey':{title:'Grande Circuito de 14 Dias por Marrocos — Costa, Saara e Norte',description:"A viagem privada completa por Marrocos: Marraquexe, a costa atlântica, o sul, duas noites em Erg Chebbi, Fez, Meknes, Chefchaouen e Casablanca."},
  '/tours/marrakech-ourika-valley-day-trip':{title:'Excursão de Um Dia de Marraquexe ao Vale de Ourika',description:"Excursão privada de um dia a partir de Marraquexe ao vale de Ourika — aldeias berberes, cascatas de Setti Fatma e uma cooperativa de óleo de argan, a menos de uma hora."},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'Excursão de Um Dia de Marraquexe às Cascatas de Ouzoud',description:"Excursão privada de um dia a partir de Marraquexe às cascatas mais conhecidas de Marrocos, a cerca de 150 km, com trilhos junto ao rio e macacos-de-berbéria."},
  '/tours/marrakech-imlil-day-trip':{title:'Excursão de Um Dia de Marraquexe a Imlil',description:"Excursão privada de um dia a partir de Marraquexe até ao Alto Atlas, a Imlil, a aldeia de partida para o Toubkal, a cerca de 90 minutos da cidade."},
  '/tours/agadir-taghazout-day-trip':{title:'Excursão de Um Dia de Agadir a Taghazout',description:"Excursão privada de um dia a partir de Agadir até Taghazout, aldeia de surf na costa atlântica a 20 minutos — porto de pesca, a onda de Anchor Point e cafés junto ao mar."},
  '/destinations/marrakech':{title:'Marraquexe — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Marraquexe, a sua medina, os souks e os principais locais culturais. Planeie a sua viagem a Marrocos com especialistas locais."},
  '/destinations/fes':{title:'Fez — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Fez, o coração cultural de Marrocos e a sua medina histórica. Planeie a sua viagem a Fez com especialistas locais."},
  '/destinations/meknes':{title:'Meknes — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Meknes, uma cidade imperial com portões históricos, a sua medina e a vizinha Volubilis."},
  '/destinations/casablanca':{title:'Casablanca — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Casablanca, a mesquita Hassan II e a porta atlântica de Marrocos."},
  '/destinations/rabat':{title:'Rabat — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Rabat, a capital de Marrocos, a Kasbah dos Oudayas e a torre Hassan."},
  '/destinations/merzouga':{title:'Merzouga — Circuitos no Deserto do Saara e Guia de Viagem',description:"A aldeia junto a Erg Chebbi — como chegar a Merzouga a partir de Marraquexe ou Fez, como são os acampamentos e quanto tempo ficar nas dunas."},
  '/destinations/erg-chebbi':{title:'Erg Chebbi — Circuitos no Deserto do Saara e Guia de Viagem',description:"As dunas mais altas de Marrocos, junto a Merzouga — a sua altura, os melhores momentos para a luz, e o que inclui um passeio de camelo ao pôr do sol com acampamento."},
  '/destinations/ouarzazate':{title:'Ouarzazate — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Ouarzazate, as suas kasbahs, o património cinematográfico e a porta para o sul de Marrocos."},
  '/destinations/ait-ben-haddou':{title:'Aït Ben Haddou — Guia de Circuitos UNESCO em Marrocos',description:"A cidade de terra batida sobre o rio Ounila, Património Mundial da UNESCO — o que ver ao subir até ao celeiro, e o seu lugar numa rota até ao Saara."},
  '/destinations/zagora':{title:'Zagora — Circuitos no Deserto do Saara e Guia de Viagem',description:"A cidade no vale do Draa onde começa o Saara — como Zagora se compara a Erg Chebbi, e o que realmente inclui um circuito de dois dias ao deserto a partir de Marraquexe."},
  '/destinations/dades-valley':{title:'Vale do Dadès — Vale das Mil Kasbahs, Guia de Viagem',description:"Jardins em socalcos, paredes de canhão e kasbahs a cada curva, com as famosas curvas acima de Boulmane Dadès — paragem clássica na rota Marraquexe–Merzouga."},
  '/destinations/todra-gorge':{title:'Gargantas do Todra — O Grande Canhão de Marrocos',description:"Paredes calcárias de 300 metros que se estreitam para um corredor de 10 metros — escalada, caminhadas junto ao rio, paragem clássica na rota Marraquexe–Merzouga."},
  '/destinations/skoura':{title:'Oásis de Skoura — Palmeiral Milenar, Guia de Viagem',description:"Um vasto oásis de palmeiras na Rota das Mil Kasbahs, com a restaurada Kasbah Amridil — cultura de kasbahs sem as multidões de Aït Ben Haddou."},
  '/destinations/roses-valley':{title:'Vale das Rosas — Circuitos e Guia de Viagem a Marrocos',description:"Descubra o Vale das Rosas de Marrocos e a sua paisagem de oásis."},
  '/destinations/draa-valley':{title:'Vale do Draa — Circuitos e Guia de Viagem a Marrocos',description:"O vale fluvial mais longo de Marrocos — palmeirais, kasbahs de terra batida e a rota para o sul via Agdz e Zagora, com as paragens que valem a pena."},
  '/destinations/chefchaouen':{title:'Chefchaouen — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Chefchaouen, a medina azul nas montanhas do Rife marroquino."},
  '/destinations/imlil':{title:'Imlil — Circuitos no Atlas e Guia de Viagem',description:"Descubra Imlil e o Atlas, aldeias berberes e trilhos de caminhada."},
  '/destinations/ourika-valley':{title:'Vale de Ourika — Circuitos e Guia de Viagem a Marrocos',description:"Descubra o vale de Ourika, a sua paisagem de montanha e aldeias berberes perto de Marraquexe."},
  '/destinations/ouzoud':{title:'Cascatas de Ouzoud — Circuitos e Guia de Viagem a Marrocos',description:"Visite as cascatas de Ouzoud e descubra a paisagem envolvente do Médio Atlas."},
  '/destinations/ifrane':{title:'Ifrane e a Floresta de Cedros — Circuitos e Guia de Viagem',description:"Descubra Ifrane e as florestas de cedros do Médio Atlas marroquino."},
  '/destinations/essaouira':{title:'Essaouira — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Essaouira, a sua medina atlântica, o porto e o ambiente costeiro."},
  '/destinations/agadir':{title:'Agadir — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Agadir, a sua costa atlântica e praias no sul de Marrocos."},
  '/destinations/taghazout':{title:'Taghazout — Circuitos de Surf e Guia de Viagem a Marrocos',description:"Descubra Taghazout e a costa atlântica de surf de Marrocos."},
  '/destinations/legzira':{title:'Praia de Legzira — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Legzira e a sua espetacular costa atlântica."},
  '/destinations/el-jadida':{title:'El Jadida — Cidadela Portuguesa no Atlântico, Guia',description:"A antiga Mazagão portuguesa — uma fortaleza do século XVI classificada pela UNESCO, com a sua famosa cisterna, muralhas e peixe grelhado no porto antigo."},
  '/destinations/tangier':{title:'Tânger — A Porta de Marrocos para a Europa, Guia',description:"Onde o Atlântico encontra o Mediterrâneo — a Kasbah, as Grutas de Hércules, o passado como zona internacional, a menos de uma hora de ferry de Espanha."},
  '/destinations/tetouan':{title:'Tetuão — Circuitos e Guia de Viagem a Marrocos',description:"Descubra Tetuão e a sua histórica medina branca no norte de Marrocos."},
  '/destinations/akchour':{title:'Akchour e a Ponte de Deus — Circuitos e Guia de Viagem',description:"Cascatas e poços azul-turquesa no Rife, acima de Chefchaouen — a caminhada até às cascatas e à Ponte de Deus, a sua duração e o estado do trilho."},
  '/destinations/nkob':{title:'Nkob — A Aldeia das 45 Kasbahs, Guia de Viagem',description:"Uma aldeia remota no sopé do Jbel Saghro, conhecida pelas suas 45 kasbahs históricas, observação de estrelas longe das luzes e trilhos sem as multidões do Toubkal."},
  '/destinations/mirleft':{title:'Mirleft — Aldeia Selvagem de Surf no Atlântico, Guia',description:"Uma aldeia intacta de surf e pesca entre Tiznit e Sidi Ifni — pores do sol nas falésias, o break de surf de Marabout e enseadas tranquilas longe das multidões."},
};
// Chinese — per CN-market usage (AMC Voyages et al.): 私人定制游, 撒哈拉沙漠
// 之旅, 沙漠帐篷营地, 一日游; entity names 梅尔祖卡/厄尔格切比/舍夫沙万.
const ZH_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"摩洛哥目的地 — 撒哈拉、皇城与阿特拉斯",description:"探索摩洛哥的主要目的地：马拉喀什、非斯、梅尔祖卡、舍夫沙万、阿特拉斯山脉与大西洋海岸。"},
  "/gallery":{title:"摩洛哥照片与视频 — 撒哈拉、麦地那与山区",description:"来自撒哈拉、麦地那、山区与沙漠营地的照片和视频。"},
  "/about":{title:"关于我们 | 摩洛哥，不止于旅程",description:"Morocco Grand Adventure：来自梅尔祖卡的沙漠向导，用本地设计的私人行程带您走遍摩洛哥。"},
  "/contact":{title:"联系我们 — 规划您的摩洛哥之旅",description:"通过 WhatsApp、邮件或电话联系 Morocco Grand Adventure，一起规划您的摩洛哥行程。"},
  "/travel-info":{title:"摩洛哥实用信息 — 来自本地团队的指南",description:"摩洛哥旅行的实用信息：何时前往、如何打包、怎样出行。"},
  "/faq":{title:"摩洛哥旅行常见问题",description:"关于摩洛哥行程、沙漠之旅、行李与预订的常见问题解答。"},
  '/student-tours/university-groups':{title:"摩洛哥大学团队旅行 | 学生游学",description:"团队规模、筹备时间与后勤如何影响摩洛哥学生项目——从小团队到大团队均可安排，大团队需提前规划。"},
  '/student-tours':{title:"摩洛哥学生游学 | 大学团队与教育旅行",description:"摩洛哥学生与大学游学项目：文化、历史、撒哈拉与探险体验，为学生与大学团队统筹安排。"},
  '/':{title:'摩洛哥旅游 — 私人定制游与撒哈拉沙漠之旅',description:"本地沙漠向导为您定制摩洛哥私人行程：梅尔祖卡厄尔格切比沙丘、皇城、阿特拉斯山脉，从马拉喀什或菲斯出发。"},
  '/tours':{title:'摩洛哥旅游线路 — 全部私人定制行程',description:"浏览全部摩洛哥私人行程：沙漠之旅、皇城与大西洋海岸，从马拉喀什、菲斯、卡萨布兰卡和阿加迪尔出发。"},
  '/trip-finder':{title:'找到您的摩洛哥之旅 — 行程查找器',description:"回答三个简单问题，找到符合您的日期、出发城市和兴趣的真实摩洛哥旅行团。"},
  '/desert-tours':{title:'摩洛哥撒哈拉沙漠之旅 — 梅尔祖卡与厄尔格切比',description:"前往梅尔祖卡的私人沙漠行程：日落骆驼骑行、厄尔格切比星空下的沙漠帐篷营地，以及四驱沙丘越野。"},
  '/marrakech-tours':{title:'马拉喀什出发的摩洛哥行程 — 沙漠与阿特拉斯',description:"从马拉喀什出发的私人行程：穿越高阿特拉斯山脉、艾本哈杜和达德斯峡谷，直达梅尔祖卡沙丘——也可选择一日游。"},
  '/fes-tours':{title:'菲斯出发的摩洛哥行程 — 梅尔祖卡与舍夫沙万',description:"从菲斯出发的私人行程：途经中阿特拉斯山脉和济兹河谷前往梅尔祖卡——或前往蓝色之城舍夫沙万。"},
  '/casablanca-tours':{title:'卡萨布兰卡出发的摩洛哥环线之旅',description:"从卡萨布兰卡出发的私人行程：皇城、沃吕比利斯与撒哈拉沙漠一次走完——天数和路线灵活安排。"},
  '/agadir-tours':{title:'阿加迪尔出发的摩洛哥行程 — 大西洋海岸与撒哈拉',description:"从阿加迪尔出发的私人行程：经索维拉和马拉喀什，或经瓦尔扎扎特前往厄尔格切比沙丘——按需定制。"},
  '/luxury-camp':{title:'梅尔祖卡豪华沙漠帐篷营地 — 撒哈拉之夜',description:"梅尔祖卡私人豪华沙漠营地：在厄尔格切比沙丘之间享受舒适住宿——设施、餐饮与预订说明。"},
  '/camel-trekking':{title:'厄尔格切比沙丘骆驼骑行体验',description:"梅尔祖卡骆驼骑行：体验内容、穿着准备，以及厄尔格切比沙丘日落骑行的完整过程。"},
  '/4x4-tours':{title:'摩洛哥沙漠四驱越野之旅 — 沙丘、绿洲与游牧人家',description:"从梅尔祖卡出发的私人四驱越野：沙丘、绿洲、Khamlia 村与游牧家庭——半日、全天或更长行程。"},
  '/trip-builder':{title:'摩洛哥行程定制 — 打造您的私人路线',description:"定制您的摩洛哥私人旅行：天数、出发城市、节奏和兴趣——当地撒哈拉向导为您提供方案报价。"},
  '/merzouga-guide':{title:'梅尔祖卡旅游攻略 — 沙丘、营地与实用建议',description:"梅尔祖卡实用攻略：厄尔格切比、最佳旅行季节、沙漠营地、骆驼骑行与活动——由当地向导撰写。"},
  '/day-trips':{title:'摩洛哥一日游 — 当天往返的私人行程',description:"从马拉喀什、菲斯和阿加迪尔出发的私人一日游：Ourika、Ouzoud 瀑布、索维拉、舍夫沙万——当天往返。"},
  '/travel-info/morocco-basics':{title:'摩洛哥基本信息 — 地理位置、语言、货币与政府',description:"首次前往摩洛哥旅行者的基本信息：摩洛哥的地理位置、所使用的语言、货币与签证须知，以及该国按地区划分的方式。"},
  '/travel-info/atlas-mountains-guide':{title:'摩洛哥阿特拉斯山脉 — 高阿特拉斯、伊姆利勒、托布卡尔与欧里卡指南',description:"为旅行者讲解阿特拉斯山脉——高阿特拉斯、中阿特拉斯和反阿特拉斯，托布卡尔峰与伊姆利勒，欧里卡河谷，以及如何把一天的山区行程安排进马拉喀什之旅。"},
  '/travel-info/amazigh-berber-culture':{title:'摩洛哥阿马齐格（柏柏尔）文化 — 旅行者入门指南',description:"为旅行者介绍摩洛哥阿马齐格（柏柏尔）文化——语言、社区分布、卡斯巴建筑、手工艺、音乐，以及如何以尊重的方式参观。"},
  '/travel-info/best-time-to-visit-morocco':{title:'摩洛哥最佳旅行季节 — 逐季指南',description:"何时前往摩洛哥：大多数地区适合春秋两季出行，沿海、山区与撒哈拉沙漠在夏季和冬季的差异，以及如何为沙漠之旅选择合适的出行日期。"},
  '/travel-info/getting-around-morocco':{title:'摩洛哥交通指南 — 各类出行方式解析',description:"如何在摩洛哥出行：何时选择私人司机比火车和巴士更合适，马拉喀什、菲斯与撒哈拉之间的实际车程，以及如何查询最新时间表。"},
  '/travel-info/moroccan-food-and-cuisine':{title:'摩洛哥美食指南 — 塔吉锅、库斯库斯与薄荷茶',description:"为旅行者介绍摩洛哥美食——塔吉锅和库斯库斯的由来、薄荷茶仪式、街头小吃与香料、甜点与斋月食品，以及如何在摩洛哥之旅中吃得尽兴。"},
  '/travel-info/moroccan-souks-shopping-guide':{title:'摩洛哥露天市场指南 — 购物与议价',description:"一份实用的摩洛哥市场指南——马拉喀什和菲斯的集市区域是如何布局的，议价究竟如何进行，以及该买什么、该向谁买才能买到经久耐用的东西。"},
  '/travel-info/morocco-travel-safety':{title:'摩洛哥安全吗？实用的摩洛哥旅行安全指南',description:"一份诚实而实用的摩洛哥安全指南——常见骗局及如何避免，单独出行和女性旅行者须知，2023年地震情况说明，夏季及8月的高温安全提示，以及真实有效的紧急电话号码。"},
  '/travel-info/what-to-pack-morocco':{title:'摩洛哥行李打包清单 — 实用指南',description:"一份实用的摩洛哥行李清单：应对沙漠寒夜的分层穿衣法、防晒用品、适合麦地那和沙丘的鞋子，以及哪些东西最好留在家里。"},
  '/student-tours/3-day-morocco-student-tour':{title:'摩洛哥3天学生之旅 | 马拉喀什、阿特拉斯与撒哈拉',description:"一条为期三天的学生路线，从马拉喀什穿越高阿特拉斯山脉到达艾本哈杜，再到梅尔祖卡的厄尔格切比沙丘。适合大学与学生团体。"},
  '/student-tours/4-day-morocco-student-tour':{title:'摩洛哥4天学生之旅 | 阿特拉斯、绿洲河谷与撒哈拉',description:"一条为期四天的学生路线，从马拉喀什到艾本哈杜，经达德斯和托德拉河谷，并在厄尔格切比沙漠连住两晚。适合大学与学生团体。"},
  '/student-tours/5-day-morocco-student-tour':{title:'摩洛哥5天学生之旅 | 马拉喀什、撒哈拉与梅尔祖卡',description:"一条为期五天的学生路线，从马拉喀什穿越高阿特拉斯山脉到达艾本哈杜，并在梅尔祖卡的厄尔格切比沙漠连住两晚。适合大学与学生团体。"},
  '/student-tours/10-day-morocco-student-tour':{title:'摩洛哥10天学生之旅 | 皇城、里夫与撒哈拉',description:"一条为期十天的学生路线，串联马拉喀什、艾本哈杜、厄尔格切比撒哈拉沙漠、菲斯与舍夫沙万。适合大学与学生团体。"},
  '/tours/3-day-sahara-marrakech':{title:'马拉喀什出发3天豪华撒哈拉沙漠之旅',description:"穿越高阿特拉斯山脉，经艾本哈杜、达德斯峡谷和托德拉峡谷，日落时分在厄尔格切比骑骆驼穿越沙丘，入住豪华沙漠帐篷营地。"},
  '/tours/3-day-sahara-agadir':{title:'阿加迪尔出发3天私人撒哈拉沙漠之旅至梅尔祖卡',description:"从阿加迪尔出发的3天私人行程，经摩洛哥南部和瓦尔扎扎特前往梅尔祖卡撒哈拉沙漠，行程和沙漠住宿按您的出行日期确认。"},
  '/tours/5-day-imperial-cities':{title:'5天摩洛哥皇城与沙漠之旅',description:"探访马拉喀什、梅克内斯、菲斯和舍夫沙万，随后在撒哈拉沙漠住一晚——私人定制摩洛哥行程。"},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'7天摩洛哥皇城与撒哈拉沙漠之旅',description:"7天私人行程，从马拉喀什前往撒哈拉沙漠再返回——艾本哈杜、达德斯峡谷和托德拉峡谷、厄尔格切比连住两晚，以及皇城菲斯。"},
  '/tours/honeymoon-morocco':{title:'摩洛哥浪漫蜜月之旅 — 10天私人豪华行程',description:"专为新婚夫妇设计的摩洛哥私人浪漫之旅，融合城市观光、沙漠体验与专属时刻。"},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'8天摩洛哥之旅：马拉喀什、索维拉、阿加迪尔与撒哈拉沙漠',description:"8天私人行程，从马拉喀什前往索维拉和阿加迪尔，穿越阿特拉斯山脉至艾本哈杜和厄尔格切比——骑骆驼并在沙漠住一晚。"},
  '/tours/family-morocco-adventure':{title:'摩洛哥亲子家庭之旅 — 9天私人行程',description:"专为家庭设计的9天摩洛哥私人行程——马拉喀什、阿特拉斯山脉骑骡子、撒哈拉沙漠骑骆驼与卡斯巴古堡，节奏适合孩子和家长。"},
  '/tours/2-day-zagora-desert-marrakech':{title:'马拉喀什出发2天扎戈拉沙漠之旅',description:"从马拉喀什出发的2天私人行程，经艾本哈杜、瓦尔扎扎特和德拉河谷前往扎戈拉。"},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'马拉喀什至梅尔祖卡撒哈拉沙漠4天之旅',description:"4天行程从马拉喀什前往梅尔祖卡，途经艾本哈杜、达德斯峡谷和托德拉峡谷，并在厄尔格切比沙丘停留更长时间。"},
  '/tours/5-day-great-south-morocco':{title:'摩洛哥南部大环线5天之旅',description:"5天私人行程探访艾本哈杜、达德斯峡谷、托德拉峡谷、梅尔祖卡和德拉河谷，深入摩洛哥南部。"},
  '/tours/3-day-fes-merzouga-sahara':{title:'菲斯出发3天私人撒哈拉沙漠之旅至梅尔祖卡',description:"从菲斯出发，穿越伊夫兰雪松林和济兹河谷前往梅尔祖卡，在撒哈拉沙漠看日落，并在厄尔格切比住一晚。"},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'菲斯至马拉喀什4天之旅（经梅尔祖卡）',description:"单程私人行程，从菲斯经梅尔祖卡、托德拉峡谷、达德斯峡谷和艾本哈杜前往马拉喀什。"},
  '/tours/fes-4-day':{title:'菲斯至撒哈拉沙漠梅尔祖卡4天行程',description:"从菲斯出发往返的私人行程，穿越中阿特拉斯山脉和济兹河谷直达厄尔格切比沙丘。"},
  '/tours/fes-5-day':{title:'菲斯至马拉喀什5天之旅（经梅尔祖卡、达德斯与阿特拉斯）',description:"单程私人行程，从菲斯穿越撒哈拉沙漠、峡谷地带和高阿特拉斯山脉前往马拉喀什。"},
  '/tours/fes-8-day':{title:'菲斯出发8天摩洛哥皇城与撒哈拉沙漠大环线',description:"8天私人行程，从菲斯经梅克内斯、沃吕比利斯和撒哈拉沙漠，并在马拉喀什安排一天向导游览。"},
  '/tours/agadir-4-day':{title:'阿加迪尔至马拉喀什4天之旅（经塔鲁丹特与阿特拉斯）',description:"从阿加迪尔经塔鲁丹特、瓦尔扎扎特和艾本哈杜前往马拉喀什，并留有时间游览马拉喀什。"},
  '/tours/agadir-5-day':{title:'阿加迪尔至马拉喀什5天之旅（经瓦尔扎扎特与梅尔祖卡）',description:"单程私人行程，从阿加迪尔经卡斯巴古堡、峡谷地带和厄尔格切比撒哈拉沙漠前往马拉喀什。"},
  '/tours/agadir-8-day':{title:'阿加迪尔出发摩洛哥南部8天大环线',description:"8天私人行程，从阿加迪尔经塔鲁丹特、瓦尔扎扎特、撒哈拉沙漠、德拉河谷至马拉喀什。"},
  '/tours/marrakech-4-day':{title:'马拉喀什至梅尔祖卡撒哈拉沙漠4天探索之旅',description:"4天私人行程从马拉喀什前往撒哈拉沙漠，含艾本哈杜、达德斯峡谷和托德拉峡谷，并在厄尔格切比沙丘住一晚。"},
  '/tours/casablanca-3-day':{title:'卡萨布兰卡至菲斯3天私人之旅（经舍夫沙万）',description:"从卡萨布兰卡至菲斯的私人行程，在蓝色之城舍夫沙万住一晚，游览皇城梅克内斯、古罗马遗址沃吕比利斯，并在菲斯麦地那安排一天向导游览。"},
  '/tours/casablanca-4-day':{title:'卡萨布兰卡至菲斯4天之旅（沿大西洋海岸经舍夫沙万）',description:"轻松的私人行程，从卡萨布兰卡沿大西洋海岸前往菲斯，途经舍夫沙万、梅克内斯和沃吕比利斯。"},
  '/tours/casablanca-5-day':{title:'卡萨布兰卡至梅尔祖卡与菲斯5天沙漠之旅',description:"从卡萨布兰卡前往菲斯和撒哈拉沙漠的私人行程，在厄尔格切比沙丘住一晚，并体验日落骑骆驼。"},
  '/tours/casablanca-8-day':{title:'卡萨布兰卡出发摩洛哥8天大环线',description:"8天私人行程，从卡萨布兰卡经拉巴特、舍夫沙万、菲斯、撒哈拉沙漠、峡谷地带至马拉喀什。"},
  '/tours/tangier-3-day':{title:'丹吉尔3天之旅：舍夫沙万与得土安（北部环线）',description:"从丹吉尔出发往返的私人行程，经得土安、蓝色之城舍夫沙万和阿克苏尔峡谷瀑布。"},
  '/tours/tangier-5-day':{title:'丹吉尔至菲斯5天之旅（经舍夫沙万与里夫山区）',description:"单程私人行程，从丹吉尔经得土安、舍夫沙万、阿克苏尔峡谷和中阿特拉斯山脉前往菲斯。"},
  '/tours/marrakech-essaouira-2-day':{title:'马拉喀什至索维拉2天之旅 — 大西洋海岸',description:"从马拉喀什前往大西洋海岸城市索维拉的2天私人行程——世界遗产麦地那、城墙与港口。"},
  '/tours/14-day-grand-morocco-journey':{title:'摩洛哥14天深度大环线：海岸、撒哈拉与北部',description:"完整的摩洛哥私人行程：马拉喀什、大西洋海岸、南部地区，在厄尔格切比连住两晚，再到菲斯、梅克内斯、舍夫沙万和卡萨布兰卡。"},
  '/tours/marrakech-ourika-valley-day-trip':{title:'马拉喀什出发欧里卡河谷一日游',description:"从马拉喀什出发的私人一日游，前往欧里卡河谷——柏柏尔村庄、塞蒂法特玛瀑布和一家阿甘油合作社，车程不到一小时。"},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'马拉喀什出发乌祖德瀑布一日游',description:"从马拉喀什前往摩洛哥最著名的乌祖德瀑布的私人一日游，车程约150公里，沿河步道还能看到巴巴利猕猴。"},
  '/tours/marrakech-imlil-day-trip':{title:'马拉喀什出发伊姆利勒一日游',description:"从马拉喀什前往高阿特拉斯山区伊姆利勒的私人一日游，这里是攀登托布卡尔峰的起点村庄，车程约90分钟。"},
  '/tours/agadir-taghazout-day-trip':{title:'阿加迪尔出发塔哈扎特一日游',description:"从阿加迪尔前往大西洋海岸冲浪小镇塔哈扎特的私人一日游，车程约20分钟——渔港、Anchor Point冲浪点和海边咖啡馆。"},
  '/destinations/marrakech':{title:'马拉喀什 — 摩洛哥旅游与旅行指南',description:"探索马拉喀什的麦地那、集市与主要文化景点，与本地专家一起规划您的摩洛哥之旅。"},
  '/destinations/fes':{title:'菲斯 — 摩洛哥旅游与旅行指南',description:"探索菲斯——摩洛哥的文化中心及其历史悠久的麦地那，与本地专家一起规划您的菲斯之旅。"},
  '/destinations/meknes':{title:'梅克内斯 — 摩洛哥旅游与旅行指南',description:"探索梅克内斯，这座拥有历史城门的皇城，以及它的麦地那和附近的沃吕比利斯遗址。"},
  '/destinations/casablanca':{title:'卡萨布兰卡 — 摩洛哥旅游与旅行指南',description:"探索卡萨布兰卡的哈桑二世清真寺，这里是摩洛哥通往大西洋的门户。"},
  '/destinations/rabat':{title:'拉巴特 — 摩洛哥旅游与旅行指南',description:"探索摩洛哥首都拉巴特，乌达亚堡与哈桑塔。"},
  '/destinations/merzouga':{title:'梅尔祖卡 — 撒哈拉沙漠之旅与旅行指南',description:"厄尔格切比沙丘边的村庄——如何从马拉喀什或菲斯前往梅尔祖卡，沙漠营地是什么样子，以及在沙丘停留多久合适。"},
  '/destinations/erg-chebbi':{title:'厄尔格切比 — 撒哈拉沙漠之旅与旅行指南',description:"摩洛哥最高的沙丘，紧邻梅尔祖卡——沙丘高度、最佳观景时段，以及日落骑骆驼加沙漠营地过夜的完整体验。"},
  '/destinations/ouarzazate':{title:'瓦尔扎扎特 — 摩洛哥旅游与旅行指南',description:"探索瓦尔扎扎特的卡斯巴古堡、电影拍摄历史，以及通往摩洛哥南部的门户。"},
  '/destinations/ait-ben-haddou':{title:'艾本哈杜 — 摩洛哥世界遗产旅游指南',description:"矗立在乌尼拉河畔的土质古堡群，联合国教科文组织世界遗产——登顶谷仓时能看到什么，以及它在通往撒哈拉沙漠路线中的位置。"},
  '/destinations/zagora':{title:'扎戈拉 — 撒哈拉沙漠之旅与旅行指南',description:"德拉河谷中撒哈拉沙漠的起点城市——扎戈拉与厄尔格切比有何不同，以及从马拉喀什出发的2天沙漠之旅究竟包含什么。"},
  '/destinations/dades-valley':{title:'达德斯峡谷 — 千座卡斯巴古堡之谷，旅行指南',description:"梯田花园、峡谷崖壁与随处可见的卡斯巴古堡，布勒曼达德斯上方著名的发夹弯道——马拉喀什至梅尔祖卡路线上的经典过夜地点。"},
  '/destinations/todra-gorge':{title:'托德拉峡谷 — 摩洛哥大峡谷，旅行指南',description:"300米高的石灰岩崖壁收窄至仅10米宽的通道——攀岩、沿河步道，马拉喀什至梅尔祖卡路线上的经典停留点。"},
  '/destinations/skoura':{title:'斯库拉绿洲 — 千年棕榈林，旅行指南',description:"位于千座卡斯巴古堡之路上的广阔棕榈绿洲，坐拥修复后的阿姆里迪勒古堡——远离艾本哈杜人群的宁静古堡文化体验。"},
  '/destinations/roses-valley':{title:'玫瑰谷 — 摩洛哥旅游与旅行指南',description:"探索摩洛哥的玫瑰谷及其绿洲景观。"},
  '/destinations/draa-valley':{title:'德拉河谷 — 摩洛哥旅游与旅行指南',description:"摩洛哥最长的河谷——棕榈林、土质卡斯巴古堡，以及经阿格达兹和扎戈拉通往南部的路线与值得停靠的地方。"},
  '/destinations/chefchaouen':{title:'舍夫沙万 — 摩洛哥旅游与旅行指南',description:"探索舍夫沙万，摩洛哥里夫山区中的蓝色麦地那。"},
  '/destinations/imlil':{title:'伊姆利勒 — 阿特拉斯山区旅游与旅行指南',description:"探索伊姆利勒与阿特拉斯山区的柏柏尔村庄和徒步路线。"},
  '/destinations/ourika-valley':{title:'欧里卡河谷 — 摩洛哥旅游与旅行指南',description:"探索欧里卡河谷的山区景观与马拉喀什附近的柏柏尔村庄。"},
  '/destinations/ouzoud':{title:'乌祖德瀑布 — 摩洛哥旅游与旅行指南',description:"游览乌祖德瀑布，探索中阿特拉斯山区周边的景色。"},
  '/destinations/ifrane':{title:'伊夫兰与雪松林 — 摩洛哥旅游与旅行指南',description:"探索伊夫兰与摩洛哥中阿特拉斯山区的雪松林。"},
  '/destinations/essaouira':{title:'索维拉 — 摩洛哥旅游与旅行指南',description:"探索索维拉的大西洋麦地那、港口与海滨氛围。"},
  '/destinations/agadir':{title:'阿加迪尔 — 摩洛哥旅游与旅行指南',description:"探索阿加迪尔的大西洋海岸与摩洛哥南部的海滩。"},
  '/destinations/taghazout':{title:'塔哈扎特 — 冲浪旅游与摩洛哥旅行指南',description:"探索塔哈扎特与摩洛哥大西洋冲浪海岸。"},
  '/destinations/legzira':{title:'莱格济拉海滩 — 摩洛哥旅游与旅行指南',description:"探索莱格济拉壮观的大西洋海岸线。"},
  '/destinations/el-jadida':{title:'杰迪达 — 大西洋畔的葡萄牙城堡，旅行指南',description:"昔日葡萄牙人的马扎甘——联合国教科文组织列名的16世纪要塞，以其著名蓄水池、城墙漫步和老港口的烤鱼闻名。"},
  '/destinations/tangier':{title:'丹吉尔 — 摩洛哥通往欧洲的门户，旅行指南',description:"大西洋与地中海交汇之处——古堡区、赫拉克勒斯洞穴、曾作为国际区的历史，从西班牙乘渡轮不到一小时即达。"},
  '/destinations/tetouan':{title:'得土安 — 摩洛哥旅游与旅行指南',description:"探索得土安及摩洛哥北部历史悠久的白色麦地那。"},
  '/destinations/akchour':{title:'阿克苏尔与神之桥 — 摩洛哥旅游与旅行指南',description:"舍夫沙万上方里夫山区的瀑布与蓝绿色水潭——前往瀑布和神之桥的徒步路程、所需时间与步道状况。"},
  '/destinations/nkob':{title:'恩科布 — 四十五座古堡之村，旅行指南',description:"萨格鲁山麓的偏远村落，以45座历史悠久的卡斯巴古堡闻名，远离灯光的观星胜地，徒步路线无需与托布卡勒的人群争道。"},
  '/destinations/mirleft':{title:'米尔莱夫特 — 狂野大西洋冲浪村，旅行指南',description:"坐落于提兹尼特与西迪伊夫尼之间的原生态冲浪渔村——悬崖日落、马拉布特冲浪点，以及远离人群的宁静海湾。"},
};

// Japanese — natural katakana entity naming per ja sources (マラケシ発, サハラ
// 砂漠ツアー, メルズーガ, エルグ・シェビー, プライベートツアー, 日帰り).
const JA_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"モロッコの目的地 — サハラ、帝都、アトラス",description:"マラケシュ、フェズ、メルズーガ、シャウエン、アトラス山脈、大西洋岸まで、モロッコの主要な目的地をご紹介します。"},
  "/gallery":{title:"モロッコの写真と動画 — サハラ、メディナ、山",description:"サハラ、メディナ、山々、砂漠のキャンプで撮影した写真と動画。"},
  "/about":{title:"私たちについて | モロッコ、旅のその先へ",description:"Morocco Grand Adventure はメルズーガの砂漠ガイド。現地で組み立てるプライベートな旅で、モロッコ全土をご案内します。"},
  "/contact":{title:"お問い合わせ — モロッコの旅のご相談",description:"WhatsApp、メール、電話で Morocco Grand Adventure へ。モロッコの旅を一緒に組み立てます。"},
  "/travel-info":{title:"モロッコ旅行の実用情報 — 現地チームの案内",description:"モロッコ旅行の実用情報：いつ行くか、何を持っていくか、どう移動するか。"},
  "/faq":{title:"モロッコ旅行のよくある質問",description:"ツアー、砂漠、持ち物、予約について、よくいただく質問への回答。"},
  '/student-tours/university-groups':{title:"モロッコ大学団体旅行 | 学生ツアー",description:"グループ規模・準備期間・ロジスティクスがモロッコの学生プログラムに与える影響。少人数から大人数まで対応、大人数は事前計画が必要です。"},
  '/student-tours':{title:"モロッコ学生ツアー | 大学・教育旅行プログラム",description:"モロッコの学生・大学向け旅行プログラム。文化、歴史、サハラ、アドベンチャーを学生・大学グループ向けに手配します。"},
  '/':{title:'モロッコ ツアー — 専用車で巡るプライベート旅行',description:"現地サハラガイドが案内するモロッコのプライベートツアー：メルズーガのエルグ・シェビー、王道の皇城、アトラス山脈。マラケシやフェズ発で日程は自由設計。"},
  '/tours':{title:'モロッコ ツアー一覧 — プライベート周遊プラン',description:"モロッコのプライベートツアー一覧：砂漠ツアー、皇城の周遊、大西洋岸。マラケシ、フェズ、カサブランカ、アガディール発。"},
  '/trip-finder':{title:'あなたのモロッコ旅行を見つける — トリップファインダー',description:"3つの簡単な質問に答えて、日程・出発都市・興味に合った実際のモロッコツアーを見つけましょう。"},
  '/desert-tours':{title:'モロッコ サハラ砂漠ツアー — メルズーガとエルグ・シェビー',description:"メルズーガへのプライベート砂漠ツアー：夕日のラクダ乗り、エルグ・シェビーの星空下サハラキャンプ、4WDでの砂丘観光。"},
  '/marrakech-tours':{title:'マラケシ発のモロッコ砂漠ツアー — アトラス山脈経由',description:"マラケシ発のプライベートツアー：高アトラス、アイト・ベン・ハドゥ、ダデス渓谷を経てメルズーガの砂丘へ。日帰りプランもご相談ください。"},
  '/fes-tours':{title:'フェズ発のモロッコ旅 — メルズーガとシェフシャウエン',description:"フェズ発のプライベートツアー：中アトラスとジズ渓谷を抜けてメルズーガへ。または青い街シェフシャウエン方面へ。"},
  '/casablanca-tours':{title:'カサブランカ発のモロッコ周遊プラン',description:"カサブランカ発のプライベート周遊：皇城とヴォルビリス遺跡、サハラ砂漠を一つの旅で。日程とルートは相談可能。"},
  '/agadir-tours':{title:'アガディール発 — 大西洋岸とサハラ砂漠の旅',description:"アガディール発のプライベートツアー：エッサウィラとマラケシ経由、またはワルザザート経由でエルグ・シェビーの砂丘へ。"},
  '/luxury-camp':{title:'メルズーガの豪華砂漠キャンプ — サハラでの一夜',description:"メルズーガ近郊のプライベート豪華キャンプ：エルグ・シェビーの砂丘の間での快適な宿泊。設備・食事・予約の案内。"},
  '/camel-trekking':{title:'エルグ・シェビーの砂丘ラクダ乗り体験',description:"メルズーガのラクダ乗り：当日の流れ、服装の準備、エルグ・シェビーの砂丘で夕日を楽しむ体験の様子をご紹介。"},
  '/4x4-tours':{title:'モロッコ砂漠の4WDツアー — 砂丘・オアシス・遊牧民',description:"メルズーガ発のプライベート4WDツアー：砂丘、オアシス、ハムリア村、遊牧民の家族を訪問。半日・終日から選べます。"},
  '/trip-builder':{title:'モロッコ旅行のオーダーメイド — あなただけの旅程づくり',description:"モロッコのプライベート旅行を設計：日数、出発地、ペース、興味に合わせて。現地サハラガイドがお見積りします。"},
  '/merzouga-guide':{title:'メルズーガ旅行ガイド — 砂丘・キャンプ・旅のヒント',description:"メルズーガの実用ガイド：エルグ・シェビー、ベストシーズン、砂漠キャンプ、ラクダ乗りとアクティビティ。現地ガイドが解説。"},
  '/day-trips':{title:'モロッコ日帰りツアー — マラケシ発など当日帰着',description:"マラケシ、フェズ、アガディール発の日帰りツアー：ウリカ渓谷、ウズードの滝、エッサウィラ、シェフシャウエン。当日帰着。"},
  '/travel-info/morocco-basics':{title:'モロッコの基本情報 — 位置、言語、通貨、政治体制',description:"初めてモロッコを訪れる方に向けた基本情報：モロッコの位置、話されている言語、通貨とビザの基礎知識、地域ごとの国の構成について。"},
  '/travel-info/atlas-mountains-guide':{title:'モロッコ アトラス山脈ガイド — 高アトラス、イムリル、トゥブカル、ウリカ',description:"旅行者のためのアトラス山脈解説——高アトラス、中アトラス、アンチアトラス、トゥブカルとイムリル、ウリカ渓谷、そして山での1日をマラケシュ旅行にどう組み込むか。"},
  '/travel-info/amazigh-berber-culture':{title:'モロッコのアマジグ（ベルベル）文化 — 旅行者向け入門',description:"旅行者のためのアマジグ（ベルベル）文化入門——言語、コミュニティが暮らす地域、カスバ建築、工芸、音楽、そして敬意を持って訪れる方法について。"},
  '/travel-info/best-time-to-visit-morocco':{title:'モロッコ旅行の最適な時期 — 季節ごとのガイド',description:"モロッコを訪れるのに適した時期：多くの地域では春と秋がおすすめ、海岸・山岳・サハラ砂漠で夏と冬がどう異なるか、そして砂漠旅行の日程の選び方について。"},
  '/travel-info/getting-around-morocco':{title:'モロッコ国内の移動方法 — 交通手段ガイド',description:"モロッコ国内の移動方法：電車やバスよりプライベートドライバーが適している場合、マラケシ、フェズ、サハラ間の実際の所要時間、そして最新の時刻表の確認方法について。"},
  '/travel-info/moroccan-food-and-cuisine':{title:'モロッコ料理ガイド — タジン、クスクス、ミントティー',description:"旅行者のためのモロッコ料理ガイド——タジンとクスクスの解説、ミントティーの作法、屋台料理とスパイス、お菓子とラマダンの料理、モロッコ旅行でおいしく食事をするコツ。"},
  '/travel-info/moroccan-souks-shopping-guide':{title:'モロッコのスーク（市場）ガイド — ショッピングと値段交渉',description:"モロッコのスークについての実用ガイド——マラケシュとフェズの市場街の構造、値段交渉の実際のやり方、そして長く使えるものを誰から買うべきかについて。"},
  '/travel-info/morocco-travel-safety':{title:'モロッコは安全？実用的なモロッコ旅行安全ガイド',description:"モロッコの安全について正直かつ実用的に解説するガイド——よくある詐欺とその対策、ひとり旅・女性旅行者について、2023年の地震の説明、夏と8月の暑さ対策、実際に使える緊急連絡先。"},
  '/travel-info/what-to-pack-morocco':{title:'モロッコ旅行の持ち物リスト — 実用的なパッキングガイド',description:"現実的なモロッコ旅行の持ち物リスト：砂漠の寒い夜に対応する重ね着、日焼け対策、メディナや砂丘に適した靴、そして持って行かなくてよいものについて。"},
  '/student-tours/3-day-morocco-student-tour':{title:'モロッコ学生ツアー3日間 | マラケシュ、アトラス、サハラ',description:"マラケシュから高アトラスを越えてアイト・ベン・ハドゥ、メルズーガのエルグ・シェビー砂丘へ向かう3日間の学生向けルート。大学・学生グループ向け。"},
  '/student-tours/4-day-morocco-student-tour':{title:'モロッコ学生ツアー4日間 | アトラス、オアシスの谷、サハラ',description:"マラケシュからアイト・ベン・ハドゥ、ダデスとトドラの谷を経て、エルグ・シェビー砂漠で2連泊する4日間の学生向けルート。大学・学生グループ向け。"},
  '/student-tours/5-day-morocco-student-tour':{title:'モロッコ学生ツアー5日間 | マラケシュ、サハラ、メルズーガ',description:"マラケシュから高アトラスを越えてアイト・ベン・ハドゥへ、メルズーガのエルグ・シェビー砂漠で2連泊する5日間の学生向けルート。大学・学生グループ向け。"},
  '/student-tours/10-day-morocco-student-tour':{title:'モロッコ学生ツアー10日間 | 皇城、リフ、サハラ',description:"マラケシュ、アイト・ベン・ハドゥ、エルグ・シェビーのサハラ砂漠、フェズ、シャウエンを結ぶ10日間の学生向けルート。大学・学生グループ向け。"},
  '/tours/3-day-sahara-marrakech':{title:'マラケシ発3日間 豪華サハラ砂漠ツアー',description:"高アトラス山脈を越えてアイト・ベン・ハドゥへ、ダデス渓谷とトドラ渓谷を経て、エルグ・シェビーで夕日のラクダ乗りと豪華砂漠キャンプでの一夜。"},
  '/tours/3-day-sahara-agadir':{title:'アガディール発3日間 プライベートサハラ砂漠ツアー（メルズーガ方面）',description:"アガディール発の3日間プライベート旅行。モロッコ南部とワルザザートを経てメルズーガのサハラ砂漠へ。ルートと砂漠での宿泊は旅行日程に応じて確定します。"},
  '/tours/5-day-imperial-cities':{title:'モロッコ皇城と砂漠 5日間ツアー',description:"マラケシュ、メクネス、フェズ、シャウエンを巡り、最後にサハラ砂漠で一夜を過ごすプライベートツアー。"},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'モロッコ皇城とサハラ砂漠 7日間ツアー',description:"マラケシからサハラ砂漠まで往復する7日間のプライベート旅。アイト・ベン・ハドゥ、ダデス渓谷とトドラ渓谷、エルグ・シェビーで2連泊、そして皇都フェズを巡ります。"},
  '/tours/honeymoon-morocco':{title:'モロッコ ロマンチックハネムーン — 10日間プライベート贅沢旅',description:"カップルのための特別な時間を織り込んだ、都市観光と砂漠体験を組み合わせたプライベートなロマンチック旅行。"},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'モロッコ8日間ツアー：マラケシ、エッサウィラ、アガディール、サハラ砂漠',description:"マラケシからエッサウィラとアガディールへ、アトラス山脈を越えてアイト・ベン・ハドゥとエルグ・シェビーへ向かう8日間のプライベート旅。ラクダ乗りと砂漠での一夜を含みます。"},
  '/tours/family-morocco-adventure':{title:'モロッコ家族旅行 — 子供と楽しむ9日間プライベートツアー',description:"マラケシ、アトラス山脈でのラバ乗り、サハラ砂漠でのラクダ乗り、カスバ巡りを、子供と両親に合わせたペースで楽しむ9日間のプライベート家族旅行。"},
  '/tours/2-day-zagora-desert-marrakech':{title:'マラケシ発2日間 ザゴラ砂漠ツアー',description:"マラケシ発の2日間プライベート旅行。アイト・ベン・ハドゥ、ワルザザート、ドラア渓谷を経てザゴラへ。"},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'マラケシからメルズーガ サハラ砂漠4日間ツアー',description:"マラケシからメルズーガへ、アイト・ベン・ハドゥ、ダデスとトドラを経由する4日間の旅。エルグ・シェビーの砂丘でより長く過ごせます。"},
  '/tours/5-day-great-south-morocco':{title:'モロッコ グレートサウス 5日間ツアー',description:"アイト・ベン・ハドゥ、ダデス、トドラ、メルズーガ、ドラア渓谷を巡る、モロッコ南部をめぐる5日間のプライベート旅。"},
  '/tours/3-day-fes-merzouga-sahara':{title:'フェズ発3日間 プライベートサハラ砂漠ツアー（メルズーガ方面）',description:"フェズからイフランの杉林とジズ渓谷を抜けてメルズーガへ。サハラ砂漠での夕日とエルグ・シェビーでの一夜を楽しむプライベート旅。"},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'フェズ発マラケシ着4日間ツアー（メルズーガ経由）',description:"フェズからメルズーガ、トドラ渓谷、ダデス渓谷、アイト・ベン・ハドゥを経てマラケシへ向かう片道プライベート旅。"},
  '/tours/fes-4-day':{title:'フェズ発サハラ砂漠（メルズーガ）4日間ツアー',description:"フェズから中アトラス、ジズ渓谷を抜けてエルグ・シェビーの砂丘まで往復するプライベート旅。"},
  '/tours/fes-5-day':{title:'フェズ発マラケシ着5日間ツアー（メルズーガ、ダデス、アトラス経由）',description:"フェズからサハラ砂漠、渓谷地帯、高アトラスを抜けてマラケシへ向かう片道プライベート旅。"},
  '/tours/fes-8-day':{title:'フェズ発 モロッコ皇城とサハラ砂漠8日間ツアー',description:"フェズからメクネス、ヴォルビリス、サハラ砂漠を経て、マラケシでガイド付き観光日を含む8日間のプライベート旅。"},
  '/tours/agadir-4-day':{title:'アガディール発マラケシ着4日間ツアー（タルーダント、アトラス経由）',description:"アガディールからタルーダント、ワルザザート、アイト・ベン・ハドゥを経てマラケシへ。マラケシを楽しむ時間も確保。"},
  '/tours/agadir-5-day':{title:'アガディール発マラケシ着5日間ツアー（ワルザザート、メルズーガ経由）',description:"アガディールからカスバ群、渓谷地帯、エルグ・シェビーのサハラ砂漠を経てマラケシへ向かう片道プライベート旅。"},
  '/tours/agadir-8-day':{title:'アガディール発 モロッコ南部8日間ツアー',description:"アガディールからタルーダント、ワルザザート、サハラ砂漠、ドラア渓谷を経てマラケシへ向かう8日間のプライベート旅。"},
  '/tours/marrakech-4-day':{title:'マラケシからサハラ砂漠（メルズーガ）4日間探訪ツアー',description:"マラケシからサハラ砂漠へ向かう4日間のプライベート旅。アイト・ベン・ハドゥ、ダデスとトドラ渓谷を経て、エルグ・シェビーの砂丘で一夜を過ごします。"},
  '/tours/casablanca-3-day':{title:'カサブランカ発フェズ着3日間ツアー（シャウエン経由）',description:"カサブランカからフェズへ向かうプライベート旅。青い街シャウエンでの一夜、皇都メクネス、ローマ遺跡ヴォルビリス、フェズのメディナでのガイド付き観光日を含みます。"},
  '/tours/casablanca-4-day':{title:'カサブランカ発フェズ着4日間ツアー（大西洋岸とシャウエン経由）',description:"大西洋沿いをゆったり進む、カサブランカからフェズへのプライベート旅。シャウエン、メクネス、ヴォルビリスを訪れます。"},
  '/tours/casablanca-5-day':{title:'カサブランカ発5日間 砂漠ルートツアー（メルズーガ、フェズ経由）',description:"カサブランカからフェズとサハラ砂漠へ向かうプライベート旅。エルグ・シェビーの砂丘での一夜と、夕日のラクダ乗りを含みます。"},
  '/tours/casablanca-8-day':{title:'カサブランカ発 モロッコ8日間ツアー',description:"カサブランカからラバト、シャウエン、フェズ、サハラ砂漠、渓谷地帯を経てマラケシへ向かう8日間のプライベート旅。"},
  '/tours/tangier-3-day':{title:'タンジェ発3日間ツアー：シャウエンとテトゥアン（モロッコ北部）',description:"タンジェから往復するプライベート旅。テトゥアン、青い街シャウエン、アクシュール渓谷の滝を巡ります。"},
  '/tours/tangier-5-day':{title:'タンジェ発フェズ着5日間ツアー（シャウエン、リフ地方経由）',description:"タンジェからテトゥアン、シャウエン、アクシュール渓谷、中アトラスを経てフェズへ向かう片道プライベート旅。"},
  '/tours/marrakech-essaouira-2-day':{title:'マラケシ発エッサウィラ2日間ツアー — 大西洋岸',description:"マラケシから大西洋岸の街エッサウィラへ向かう2日間のプライベート旅。世界遺産のメディナ、城壁、港を訪れます。"},
  '/tours/14-day-grand-morocco-journey':{title:'モロッコ グランドジャーニー14日間ツアー — 海岸、サハラ砂漠、北部',description:"マラケシ、大西洋岸、南部地方、エルグ・シェビーでの2連泊、フェズ、メクネス、シャウエン、カサブランカを巡る、モロッコを網羅するプライベート旅。"},
  '/tours/marrakech-ourika-valley-day-trip':{title:'マラケシ発 ウリカ渓谷日帰りツアー',description:"マラケシから車で1時間以内のウリカ渓谷へ向かう日帰りプライベートツアー。ベルベル人の村、セティ・ファトマの滝、アルガンオイルの協同組合を訪れます。"},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'マラケシ発 ウズードの滝 日帰りツアー',description:"マラケシから約150km、モロッコで最も有名なウズードの滝へ向かう日帰りプライベートツアー。川沿いの遊歩道とバーバリーマカクに出会えます。"},
  '/tours/marrakech-imlil-day-trip':{title:'マラケシ発 イムリル日帰りツアー',description:"マラケシから高アトラス山脈のイムリルへ向かう日帰りプライベートツアー。トゥブカル登山の起点の村で、所要時間は約90分です。"},
  '/tours/agadir-taghazout-day-trip':{title:'アガディール発 タグハズート日帰りツアー',description:"アガディールから約20分、大西洋岸のサーフタウン、タグハズートへ向かう日帰りプライベートツアー。漁港、アンカーポイントの波、海沿いのカフェを巡ります。"},
  '/destinations/marrakech':{title:'マラケシュ — モロッコ旅行とツアーガイド',description:"マラケシュのメディナ、スーク、主要な文化スポットを探訪。現地の専門家とモロッコ旅行を計画しましょう。"},
  '/destinations/fes':{title:'フェズ — モロッコ旅行とツアーガイド',description:"モロッコの文化的中心地フェズと、その歴史的なメディナを探訪。現地専門家とフェズ旅行を計画しましょう。"},
  '/destinations/meknes':{title:'メクネス — モロッコ旅行とツアーガイド',description:"歴史的な城門を持つ皇都メクネスとそのメディナ、近隣のヴォルビリス遺跡を探訪。"},
  '/destinations/casablanca':{title:'カサブランカ — モロッコ旅行とツアーガイド',description:"カサブランカのハッサン2世モスクと、モロッコの大西洋への玄関口を探訪。"},
  '/destinations/rabat':{title:'ラバト — モロッコ旅行とツアーガイド',description:"モロッコの首都ラバト、ウダイヤのカスバ、ハッサンの塔を探訪。"},
  '/destinations/merzouga':{title:'メルズーガ — サハラ砂漠ツアーと旅行ガイド',description:"エルグ・シェビーのほとりにある村。マラケシやフェズからの行き方、砂漠キャンプの様子、砂丘での滞在日数について。"},
  '/destinations/erg-chebbi':{title:'エルグ・シェビー — サハラ砂漠ツアーと旅行ガイド',description:"メルズーガのすぐそばにある、モロッコで最も高い砂丘。その高さ、写真に最適な時間帯、夕日のラクダ乗りと砂漠キャンプでの一夜に含まれる内容について。"},
  '/destinations/ouarzazate':{title:'ワルザザート — モロッコ旅行とツアーガイド',description:"ワルザザートのカスバ、映画の歴史、モロッコ南部への玄関口を探訪。"},
  '/destinations/ait-ben-haddou':{title:'アイト・ベン・ハドゥ — 土造りの世界遺産を歩く',description:"ウニラ川沿いに建つ土造りの集落、ユネスコ世界遺産。屋上の穀物倉まで登って見える景色と、サハラ砂漠へのルート上での位置づけについて。"},
  '/destinations/zagora':{title:'ザゴラ — サハラ砂漠ツアーと旅行ガイド',description:"ドラア渓谷にあるサハラ砂漠の玄関口の町。エルグ・シェビーとの違いや、マラケシ発の2日間砂漠ツアーの実際の内容について。"},
  '/destinations/dades-valley':{title:'ダデス渓谷 — 千のカスバの谷、旅行ガイド',description:"曲がり角ごとに現れる段々畑、渓谷の崖、カスバ。ブルマン・ダデス上部の有名なヘアピンカーブ——マラケシ・メルズーガ間の定番の宿泊地。"},
  '/destinations/todra-gorge':{title:'トドラ渓谷 — モロッコの大渓谷、旅行ガイド',description:"幅わずか10メートルの回廊へと狭まる高さ300メートルの石灰岩の壁。ロッククライミング、川沿いの散策、マラケシ・メルズーガ間の定番の立ち寄り地。"},
  '/destinations/skoura':{title:'スクーラのオアシス — 千年のナツメヤシ林、旅行ガイド',description:"千のカスバ街道沿いに広がるナツメヤシのオアシス。修復されたアムリディル・カスバがあり、アイト・ベン・ハドゥの混雑を避けた静かなカスバ文化を楽しめる。"},
  '/destinations/roses-valley':{title:'バラの谷 — モロッコ旅行とツアーガイド',description:"モロッコのバラの谷とそのオアシスの景観を探訪。"},
  '/destinations/draa-valley':{title:'ドラア渓谷 — モロッコ旅行とツアーガイド',description:"モロッコで最も長い川の渓谷。ナツメヤシの林、土造りのカスバ、アグダスやザゴラを経て南へ向かうルートと、立ち寄る価値のあるポイントについて。"},
  '/destinations/chefchaouen':{title:'シャウエン — モロッコ旅行とツアーガイド',description:"モロッコのリフ山地にある青い街、シャウエンを探訪。"},
  '/destinations/imlil':{title:'イムリル — アトラスツアーと旅行ガイド',description:"イムリルとアトラス山脈、ベルベル人の村、ハイキングコースを探訪。"},
  '/destinations/ourika-valley':{title:'ウリカ渓谷 — モロッコ旅行とツアーガイド',description:"マラケシ近郊にあるウリカ渓谷の山間の景観とベルベル人の村を探訪。"},
  '/destinations/ouzoud':{title:'ウズードの滝 — モロッコ旅行とツアーガイド',description:"ウズードの滝を訪れ、中アトラス山地の周辺の景観を探訪。"},
  '/destinations/ifrane':{title:'イフランと杉林 — モロッコツアーと旅行ガイド',description:"モロッコ中アトラス山地にあるイフランと杉の森を探訪。"},
  '/destinations/essaouira':{title:'エッサウィラ — モロッコ旅行とツアーガイド',description:"エッサウィラの大西洋沿いのメディナ、港、海辺の雰囲気を探訪。"},
  '/destinations/agadir':{title:'アガディール — モロッコ旅行とツアーガイド',description:"モロッコ南部、アガディールの大西洋岸とビーチを探訪。"},
  '/destinations/taghazout':{title:'タグハズート — サーフツアーと旅行ガイド モロッコ',description:"タグハズートとモロッコの大西洋サーフコーストを探訪。"},
  '/destinations/legzira':{title:'レグジラビーチ — モロッコ旅行とツアーガイド',description:"レグジラの壮大な大西洋岸を探訪。"},
  '/destinations/el-jadida':{title:'エル・ジャディダ — 大西洋岸のポルトガル要塞、旅行ガイド',description:"かつてのポルトガル領マザガン。ユネスコ世界遺産の16世紀の要塞、有名な貯水槽、城壁沿いの散策、旧港での焼き魚が楽しめる。"},
  '/destinations/tangier':{title:'タンジェ — モロッコからヨーロッパへの玄関口、旅行ガイド',description:"大西洋と地中海が出会う場所。カスバ、ヘラクレスの洞窟、国際管理地区だった歴史、スペインからフェリーで1時間足らず。"},
  '/destinations/tetouan':{title:'テトゥアン — モロッコ旅行とツアーガイド',description:"モロッコ北部、歴史的な白いメディナを持つテトゥアンを探訪。"},
  '/destinations/akchour':{title:'アクシュールと神の橋 — モロッコツアーと旅行ガイド',description:"シャウエンの上流、リフ山地にある滝と青緑色の水たまり。滝と神の橋までのハイキング時間や道の状態について。"},
  '/destinations/nkob':{title:'ンコブ — 45のカスバの村、旅行ガイド',description:"ジュベル・サグロ山麓の辺境の村。45の歴史的カスバ、街の明かりから離れた満天の星空観察、トゥブカルの混雑を避けたトレッキングで知られる。"},
  '/destinations/mirleft':{title:'ミルレフト — 大西洋の秘境サーフ村、旅行ガイド',description:"ティズニトとシディ・イフニの間にある素朴なサーフ＆漁村。崖の上からの夕日、マラブーのサーフポイント、人混みを離れた静かな入り江。"},
};

// Korean — per KR-market usage and MGA's existing Korean organic visibility
// (모로코 여행, 사막 투어, 메르주가, 에르그 셰비, 마라케시 출발).
const KO_ROUTE_META: Record<string,RouteMeta> = {
  "/destinations":{title:"모로코 여행지 — 사하라, 제국 도시, 아틀라스",description:"마라케시, 페스, 메르주가, 셰프샤우엔, 아틀라스산맥과 대서양 해안까지 모로코의 주요 여행지를 살펴보세요."},
  "/gallery":{title:"모로코 사진과 영상 — 사하라, 메디나, 산",description:"사하라와 메디나, 산과 사막 캠프에서 찍은 사진과 영상."},
  "/about":{title:"소개 | 모로코, 여행 그 너머",description:"Morocco Grand Adventure는 메르주가의 사막 가이드입니다. 현지에서 짜는 프라이빗 여정으로 모로코 전역을 안내합니다."},
  "/contact":{title:"문의 — 모로코 여행 계획하기",description:"WhatsApp, 이메일, 전화로 Morocco Grand Adventure에 문의해 모로코 여행을 함께 계획하세요."},
  "/travel-info":{title:"모로코 여행 실용 정보 — 현지 팀의 안내",description:"모로코 여행 실용 정보: 언제 갈지, 무엇을 챙길지, 어떻게 이동할지."},
  "/faq":{title:"모로코 여행 자주 묻는 질문",description:"투어와 사막 여행, 짐, 예약에 대해 자주 묻는 질문과 답변."},
  '/student-tours/university-groups':{title:"모로코 대학 단체 여행 | 학생 투어",description:"단체 규모, 준비 기간, 물류가 모로코 학생 프로그램에 미치는 영향 — 소규모부터 대규모까지, 대규모는 사전 계획이 필요합니다."},
  '/student-tours':{title:"모로코 학생 투어 | 대학·교육 여행 프로그램",description:"모로코 학생 및 대학 여행 프로그램 — 문화, 역사, 사하라, 액티비티를 학생 및 대학 단체를 위해 준비합니다."},
  '/':{title:'모로코 여행 — 프라이빗 맞춤 투어와 사하라 사막',description:"현지 사하라 가이드와 함께하는 모로코 프라이빗 여행: 메르주가 에르그 셰비, 왕도 도시, 아틀라스 산맥. 마라케시·페스 출발 맞춤 일정."},
  '/tours':{title:'모로코 투어 — 프라이빗 일정 전체 보기',description:"모로코 프라이빗 투어 전체 목록: 사막 투어, 왕도 도시 일주, 대서양 연안. 마라케시, 페스, 카사블랑카, 아가디르 출발."},
  '/trip-finder':{title:'나에게 맞는 모로코 여행 찾기 — 여행 찾기',description:"세 가지 간단한 질문에 답하고 날짜, 출발 도시, 관심사에 맞는 실제 모로코 투어를 찾아보세요."},
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
  '/travel-info/morocco-basics':{title:'모로코 기본 정보 — 위치, 언어, 화폐, 정부',description:"모로코를 처음 방문하는 여행자를 위한 핵심 정보 — 모로코의 위치, 사용 언어, 화폐와 비자 기본 사항, 지역별 국가 구성에 대해."},
  '/travel-info/atlas-mountains-guide':{title:'모로코 아틀라스 산맥 — 높은 아틀라스, 이믈릴, 투브카를, 우리카 가이드',description:"여행자를 위한 아틀라스 산맥 안내 — 높은 아틀라스, 중부 아틀라스, 안티 아틀라스, 투브카를과 이믈릴, 우리카 계곡, 그리고 마라케시 여행에 산악 하루를 포함하는 방법."},
  '/travel-info/amazigh-berber-culture':{title:'모로코의 아마지그(베르베르) 문화 — 여행자를 위한 소개',description:"여행자를 위한 모로코 아마지그(베르베르) 문화 소개 — 언어, 공동체가 사는 곳, 카스바 건축, 공예, 음악, 그리고 예의를 갖추고 방문하는 방법."},
  '/travel-info/best-time-to-visit-morocco':{title:'모로코 여행 최적의 시기 — 계절별 가이드',description:"모로코를 방문하기 좋은 시기 — 대부분 지역은 봄과 가을이 적기이며, 해안·산악·사하라 사막에서 여름과 겨울이 어떻게 다른지, 그리고 사막 여행 날짜를 정하는 방법에 대해."},
  '/travel-info/getting-around-morocco':{title:'모로코 교통편 안내 — 이동 수단 총정리',description:"모로코에서 이동하는 방법 — 기차나 버스보다 프라이빗 드라이버가 나은 경우, 마라케시·페스·사하라 간 실제 이동 시간, 최신 운행 일정을 확인하는 방법."},
  '/travel-info/moroccan-food-and-cuisine':{title:'모로코 음식 가이드 — 타진, 쿠스쿠스, 민트티',description:"여행자를 위한 모로코 음식 가이드 — 타진과 쿠스쿠스 설명, 민트티 의식, 길거리 음식과 향신료, 디저트와 라마단 음식, 그리고 모로코 여행에서 잘 먹는 방법."},
  '/travel-info/moroccan-souks-shopping-guide':{title:'모로코 수크(시장) 가이드 — 쇼핑과 가격 흥정',description:"모로코 수크에 대한 실용적인 가이드 — 마라케시와 페스의 시장 구역이 어떻게 구성되어 있는지, 가격 흥정이 실제로 어떻게 이루어지는지, 그리고 오래 쓸 수 있는 물건을 무엇을, 누구에게서 사야 하는지."},
  '/travel-info/morocco-travel-safety':{title:'모로코는 안전한가요? 실용적인 모로코 여행 안전 가이드',description:"모로코 안전에 대한 솔직하고 실용적인 가이드 — 흔한 사기 수법과 피하는 방법, 혼자 여행하는 사람과 여성 여행자를 위한 정보, 2023년 지진에 대한 설명, 여름과 8월의 더위 대처법, 실제 응급 전화번호."},
  '/travel-info/what-to-pack-morocco':{title:'모로코 여행 짐 싸기 — 실용적인 패킹 리스트',description:"현실적인 모로코 짐 싸기 리스트: 추운 사막 밤을 위한 겹쳐 입기, 자외선 차단, 메디나와 모래언덕에 적합한 신발, 그리고 집에 두고 가는 것이 나은 물건들."},
  '/student-tours/3-day-morocco-student-tour':{title:'모로코 학생 투어 3일 | 마라케시, 아틀라스, 사하라',description:"마라케시에서 높은 아틀라스를 넘어 아이트 벤 하두, 메르주가의 에르그 셰비 모래언덕까지 이어지는 3일 학생 여행 코스. 대학 및 학생 단체를 위한 프로그램."},
  '/student-tours/4-day-morocco-student-tour':{title:'모로코 학생 투어 4일 | 아틀라스, 오아시스 계곡, 사하라',description:"마라케시에서 아이트 벤 하두, 다데스와 토드라 계곡을 지나 에르그 셰비 사막에서 2박을 보내는 4일 학생 여행 코스. 대학 및 학생 단체를 위한 프로그램."},
  '/student-tours/5-day-morocco-student-tour':{title:'모로코 학생 투어 5일 | 마라케시, 사하라, 메르주가',description:"마라케시에서 높은 아틀라스를 넘어 아이트 벤 하두로, 메르주가의 에르그 셰비 사막에서 2박을 보내는 5일 학생 여행 코스. 대학 및 학생 단체를 위한 프로그램."},
  '/student-tours/10-day-morocco-student-tour':{title:'모로코 학생 투어 10일 | 왕도 도시, 리프, 사하라',description:"마라케시, 아이트 벤 하두, 에르그 셰비 사하라 사막, 페스, 셰프샤우엔을 연결하는 10일 학생 여행 코스. 대학 및 학생 단체를 위한 프로그램."},
  '/tours/3-day-sahara-marrakech':{title:'마라케시 출발 3일 럭셔리 사하라 사막 투어',description:"아틀라스 산맥을 넘어 아이트 벤 하두, 다데스 계곡과 토드라 계곡을 지나 에르그 셰비에서 일몰 낙타 트레킹을 하고 럭셔리 사막 캠프에서 하룻밤을 보냅니다."},
  '/tours/3-day-sahara-agadir':{title:'아가디르 출발 3일 프라이빗 사하라 사막 투어 (메르주가)',description:"아가디르에서 모로코 남부와 와르자자트를 지나 메르주가 사하라 사막까지 가는 3일 프라이빗 여행. 경로와 사막 숙박은 여행 일정에 따라 확정됩니다."},
  '/tours/5-day-imperial-cities':{title:'모로코 왕도 도시와 사막 5일 투어',description:"마라케시, 메크네스, 페스, 셰프샤우엔을 둘러보고 사하라 사막에서 하룻밤을 보내는 프라이빗 모로코 투어."},
  '/tours/7-day-imperial-cities-sahara-escape':{title:'모로코 왕도 도시와 사하라 사막 7일 투어',description:"마라케시에서 사하라 사막까지 왕복하는 7일 프라이빗 투어. 아이트 벤 하두, 다데스와 토드라 계곡, 에르그 셰비에서 2박, 그리고 왕도 페스를 방문합니다."},
  '/tours/honeymoon-morocco':{title:'모로코 로맨틱 허니문 — 10일 프라이빗 럭셔리 투어',description:"도시 여행과 사막 체험을 결합하고 커플을 위한 특별한 순간을 담은 프라이빗 로맨틱 모로코 여행."},
  '/tours/8-day-marrakech-essaouira-agadir-sahara':{title:'모로코 8일 투어: 마라케시, 에사우이라, 아가디르, 사하라 사막',description:"마라케시에서 에사우이라와 아가디르로, 아틀라스 산맥을 넘어 아이트 벤 하두와 에르그 셰비까지 가는 8일 프라이빗 투어. 낙타 트레킹과 사막에서의 하룻밤을 포함합니다."},
  '/tours/family-morocco-adventure':{title:'모로코 가족 여행 — 아이와 함께하는 9일 프라이빗 투어',description:"마라케시, 아틀라스 산맥에서의 노새 타기, 사하라 사막에서의 낙타 타기, 카스바 탐방을 아이와 부모 모두에게 맞는 속도로 즐기는 9일 프라이빗 가족 여행."},
  '/tours/2-day-zagora-desert-marrakech':{title:'마라케시 출발 2일 자고라 사막 투어',description:"마라케시에서 아이트 벤 하두, 와르자자트, 드라아 계곡을 지나 자고라까지 가는 2일 프라이빗 투어."},
  '/tours/4-day-marrakech-merzouga-sahara':{title:'마라케시에서 메르주가 사하라 사막 4일 투어',description:"마라케시에서 아이트 벤 하두, 다데스와 토드라를 지나 메르주가까지 가는 4일 여행. 에르그 셰비 모래언덕에서 더 오래 머무릅니다."},
  '/tours/5-day-great-south-morocco':{title:'모로코 그레이트 사우스 5일 투어',description:"아이트 벤 하두, 다데스, 토드라, 메르주가, 드라아 계곡을 둘러보는 모로코 남부 5일 프라이빗 투어."},
  '/tours/3-day-fes-merzouga-sahara':{title:'페스 출발 3일 프라이빗 사하라 사막 투어 (메르주가)',description:"페스에서 이프란의 삼나무 숲과 지즈 계곡을 지나 메르주가까지. 사하라 사막의 일몰과 에르그 셰비에서의 하룻밤을 즐기는 프라이빗 여행."},
  '/tours/4-day-fes-marrakech-via-merzouga':{title:'페스 출발 마라케시 도착 4일 투어 (메르주가 경유)',description:"페스에서 메르주가, 토드라 계곡, 다데스 계곡, 아이트 벤 하두를 지나 마라케시로 가는 편도 프라이빗 여행."},
  '/tours/fes-4-day':{title:'페스 출발 사하라 사막(메르주가) 4일 투어',description:"페스에서 중부 아틀라스와 지즈 계곡을 지나 에르그 셰비 모래언덕까지 왕복하는 프라이빗 투어."},
  '/tours/fes-5-day':{title:'페스 출발 마라케시 도착 5일 투어 (메르주가, 다데스, 아틀라스 경유)',description:"페스에서 사하라 사막, 계곡 지대, 높은 아틀라스를 지나 마라케시로 가는 편도 프라이빗 여행."},
  '/tours/fes-8-day':{title:'페스 출발 모로코 왕도 도시와 사하라 사막 8일 투어',description:"페스에서 메크네스, 볼루빌리스, 사하라 사막을 지나고 마라케시에서 가이드 투어 하루를 포함하는 8일 프라이빗 여행."},
  '/tours/agadir-4-day':{title:'아가디르 출발 마라케시 도착 4일 투어 (타루단트, 아틀라스 경유)',description:"아가디르에서 타루단트, 와르자자트, 아이트 벤 하두를 지나 마라케시로. 마라케시를 즐길 시간도 포함됩니다."},
  '/tours/agadir-5-day':{title:'아가디르 출발 마라케시 도착 5일 투어 (와르자자트, 메르주가 경유)',description:"아가디르에서 카스바, 계곡 지대, 에르그 셰비의 사하라 사막을 지나 마라케시로 가는 편도 프라이빗 여행."},
  '/tours/agadir-8-day':{title:'아가디르 출발 모로코 남부 8일 투어',description:"아가디르에서 타루단트, 와르자자트, 사하라 사막, 드라아 계곡을 지나 마라케시까지 가는 8일 프라이빗 여행."},
  '/tours/marrakech-4-day':{title:'마라케시에서 사하라 사막(메르주가) 4일 탐험 투어',description:"마라케시에서 사하라 사막까지 가는 4일 프라이빗 투어. 아이트 벤 하두, 다데스와 토드라 계곡을 지나 에르그 셰비 모래언덕에서 하룻밤을 보냅니다."},
  '/tours/casablanca-3-day':{title:'카사블랑카 출발 페스 도착 3일 투어 (셰프샤우엔 경유)',description:"카사블랑카에서 페스로 가는 프라이빗 여행. 푸른 도시 셰프샤우엔에서의 하룻밤, 왕도 메크네스, 로마 유적 볼루빌리스, 페스 메디나에서의 가이드 투어 하루를 포함합니다."},
  '/tours/casablanca-4-day':{title:'카사블랑카 출발 페스 도착 4일 투어 (대서양 해안과 셰프샤우엔 경유)',description:"대서양 해안을 따라 여유롭게 이동하는 카사블랑카에서 페스까지의 프라이빗 여행. 셰프샤우엔, 메크네스, 볼루빌리스를 방문합니다."},
  '/tours/casablanca-5-day':{title:'카사블랑카 출발 5일 사막 루트 투어 (메르주가, 페스 경유)',description:"카사블랑카에서 페스와 사하라 사막으로 가는 프라이빗 여행. 에르그 셰비 모래언덕에서의 하룻밤과 일몰 낙타 트레킹을 포함합니다."},
  '/tours/casablanca-8-day':{title:'카사블랑카 출발 모로코 8일 투어',description:"카사블랑카에서 라바트, 셰프샤우엔, 페스, 사하라 사막, 계곡 지대를 지나 마라케시까지 가는 8일 프라이빗 여행."},
  '/tours/tangier-3-day':{title:'탕헤르 출발 3일 투어: 셰프샤우엔과 테투안 (모로코 북부)',description:"탕헤르에서 왕복하는 프라이빗 여행. 테투안, 푸른 도시 셰프샤우엔, 아크슈르 계곡의 폭포를 둘러봅니다."},
  '/tours/tangier-5-day':{title:'탕헤르 출발 페스 도착 5일 투어 (셰프샤우엔, 리프 지역 경유)',description:"탕헤르에서 테투안, 셰프샤우엔, 아크슈르 계곡, 중부 아틀라스를 지나 페스로 가는 편도 프라이빗 여행."},
  '/tours/marrakech-essaouira-2-day':{title:'마라케시 출발 에사우이라 2일 투어 — 대서양 해안',description:"마라케시에서 대서양 해안 도시 에사우이라로 가는 2일 프라이빗 여행. 세계문화유산 메디나, 성벽, 항구를 방문합니다."},
  '/tours/14-day-grand-morocco-journey':{title:'모로코 그랜드 저니 14일 투어 — 해안, 사하라 사막, 북부',description:"마라케시, 대서양 해안, 남부 지역, 에르그 셰비에서의 2박, 페스, 메크네스, 셰프샤우엔, 카사블랑카를 아우르는 완전한 모로코 프라이빗 여행."},
  '/tours/marrakech-ourika-valley-day-trip':{title:'마라케시 출발 우리카 계곡 당일 투어',description:"마라케시에서 차로 한 시간도 걸리지 않는 우리카 계곡으로 가는 프라이빗 당일 투어. 베르베르 마을, 세티 파트마 폭포, 아르간 오일 협동조합을 방문합니다."},
  '/tours/marrakech-ouzoud-waterfalls-day-trip':{title:'마라케시 출발 우주드 폭포 당일 투어',description:"마라케시에서 약 150km 거리, 모로코에서 가장 유명한 우주드 폭포로 가는 프라이빗 당일 투어. 강변 산책로와 바바리마카크를 만날 수 있습니다."},
  '/tours/marrakech-imlil-day-trip':{title:'마라케시 출발 이믈릴 당일 투어',description:"마라케시에서 높은 아틀라스 산맥에 위치한 이믈릴로 가는 프라이빗 당일 투어. 투브카를 등반의 출발 마을로, 소요 시간은 약 90분입니다."},
  '/tours/agadir-taghazout-day-trip':{title:'아가디르 출발 타가주트 당일 투어',description:"아가디르에서 약 20분 거리, 대서양 해안의 서핑 마을 타가주트로 가는 프라이빗 당일 투어. 어항, 앵커 포인트의 파도, 해변 카페를 둘러봅니다."},
  '/destinations/marrakech':{title:'마라케시 — 모로코 투어와 여행 가이드',description:"마라케시의 메디나, 수크, 주요 문화 명소를 둘러보세요. 현지 전문가와 함께 모로코 여행을 계획하세요."},
  '/destinations/fes':{title:'페스 — 모로코 투어와 여행 가이드',description:"모로코의 문화 중심지 페스와 그 역사적인 메디나를 둘러보세요. 현지 전문가와 함께 페스 여행을 계획하세요."},
  '/destinations/meknes':{title:'메크네스 — 모로코 투어와 여행 가이드',description:"역사적인 성문을 가진 왕도 메크네스와 그 메디나, 인근 볼루빌리스를 둘러보세요."},
  '/destinations/casablanca':{title:'카사블랑카 — 모로코 투어와 여행 가이드',description:"카사블랑카의 하산 2세 모스크와 모로코의 대서양 관문을 둘러보세요."},
  '/destinations/rabat':{title:'라바트 — 모로코 투어와 여행 가이드',description:"모로코의 수도 라바트, 우다야 카스바와 하산 타워를 둘러보세요."},
  '/destinations/merzouga':{title:'메르주가 — 사하라 사막 투어와 여행 가이드',description:"에르그 셰비 가장자리에 있는 마을 — 마라케시나 페스에서 메르주가까지 가는 방법, 사막 캠프의 모습, 모래언덕에 머무를 적정 기간에 대해."},
  '/destinations/erg-chebbi':{title:'에르그 셰비 — 사하라 사막 투어와 여행 가이드',description:"메르주가 바로 옆에 있는 모로코에서 가장 높은 모래언덕 — 그 높이, 사진 찍기 좋은 시간대, 그리고 일몰 낙타 트레킹과 사막 캠프 숙박에 포함되는 내용."},
  '/destinations/ouarzazate':{title:'와르자자트 — 모로코 투어와 여행 가이드',description:"와르자자트의 카스바, 영화 촬영 역사, 모로코 남부로 가는 관문을 둘러보세요."},
  '/destinations/ait-ben-haddou':{title:'아이트 벤 하두 — 유네스코 투어 가이드 모로코',description:"우니라강 위에 세워진 흙으로 지은 마을, 유네스코 세계문화유산 — 곡물 창고까지 오르며 보이는 풍경과 사하라 사막으로 가는 경로에서의 위치."},
  '/destinations/zagora':{title:'자고라 — 사하라 사막 투어와 여행 가이드',description:"드라아 계곡에 있는 사하라 사막의 관문 도시 — 자고라가 에르그 셰비와 어떻게 다른지, 마라케시 출발 2일 사막 투어가 실제로 포함하는 내용."},
  '/destinations/dades-valley':{title:'다데스 계곡 — 천 개의 카스바 계곡, 여행 가이드',description:"굽이마다 펼쳐지는 계단식 정원, 협곡 절벽, 카스바. 불만 다데스 위의 유명한 헤어핀 커브 — 마라케시-메르주가 루트의 대표적인 숙박지."},
  '/destinations/todra-gorge':{title:'토드라 계곡 — 모로코의 대협곡, 여행 가이드',description:"폭 10미터의 통로로 좁아지는 높이 300미터의 석회암 절벽 — 암벽등반, 강변 산책, 마라케시-메르주가 루트의 대표적인 경유지."},
  '/destinations/skoura':{title:'스쿠라 오아시스 — 천년 된 야자수 숲, 여행 가이드',description:"천 개의 카스바 길에 자리한 광활한 야자수 오아시스, 복원된 아므리딜 카스바가 있는 곳 — 아이트 벤 하두의 인파 없이 즐기는 카스바 문화."},
  '/destinations/roses-valley':{title:'장미 계곡 — 모로코 투어와 여행 가이드',description:"모로코의 장미 계곡과 그 오아시스 풍경을 둘러보세요."},
  '/destinations/draa-valley':{title:'드라아 계곡 — 모로코 투어와 여행 가이드',description:"모로코에서 가장 긴 강 계곡 — 야자수 숲, 흙으로 지은 카스바, 아그다즈와 자고라를 지나 남쪽으로 가는 경로와 들를 만한 곳들."},
  '/destinations/chefchaouen':{title:'셰프샤우엔 — 모로코 투어와 여행 가이드',description:"모로코 리프 산맥에 있는 푸른 메디나, 셰프샤우엔을 둘러보세요."},
  '/destinations/imlil':{title:'이믈릴 — 아틀라스 투어와 여행 가이드',description:"이믈릴과 아틀라스 산맥, 베르베르 마을과 하이킹 코스를 둘러보세요."},
  '/destinations/ourika-valley':{title:'우리카 계곡 — 모로코 투어와 여행 가이드',description:"마라케시 인근에 있는 우리카 계곡의 산악 풍경과 베르베르 마을을 둘러보세요."},
  '/destinations/ouzoud':{title:'우주드 폭포 — 모로코 투어와 여행 가이드',description:"우주드 폭포를 방문하고 중부 아틀라스 주변 풍경을 둘러보세요."},
  '/destinations/ifrane':{title:'이프란과 삼나무 숲 — 모로코 투어와 여행 가이드',description:"모로코 중부 아틀라스에 있는 이프란과 삼나무 숲을 둘러보세요."},
  '/destinations/essaouira':{title:'에사우이라 — 모로코 투어와 여행 가이드',description:"에사우이라의 대서양 메디나, 항구, 해변 분위기를 둘러보세요."},
  '/destinations/agadir':{title:'아가디르 — 모로코 투어와 여행 가이드',description:"모로코 남부에 있는 아가디르의 대서양 해안과 해변을 둘러보세요."},
  '/destinations/taghazout':{title:'타가주트 — 서핑 투어와 모로코 여행 가이드',description:"타가주트와 모로코의 대서양 서핑 해안을 둘러보세요."},
  '/destinations/legzira':{title:'레그지라 해변 — 모로코 투어와 여행 가이드',description:"레그지라의 멋진 대서양 해안을 둘러보세요."},
  '/destinations/el-jadida':{title:'엘자디다 — 대서양의 포르투갈 요새, 여행 가이드',description:"과거 포르투갈령 마자강 — 유네스코에 등재된 16세기 요새로, 유명한 저수조와 성벽 산책로, 구항구의 생선구이로 알려져 있다."},
  '/destinations/tangier':{title:'탕헤르 — 유럽으로 가는 모로코의 관문, 여행 가이드',description:"대서양과 지중해가 만나는 곳 — 카스바, 헤라클레스 동굴, 국제 지대였던 역사, 스페인에서 페리로 한 시간도 채 걸리지 않는 거리."},
  '/destinations/tetouan':{title:'테투안 — 모로코 투어와 여행 가이드',description:"모로코 북부에 있는 역사적인 흰색 메디나, 테투안을 둘러보세요."},
  '/destinations/akchour':{title:'아크슈르와 신의 다리 — 모로코 투어와 여행 가이드',description:"셰프샤우엔 위쪽 리프 산맥에 있는 폭포와 청록색 물웅덩이 — 폭포와 신의 다리까지의 하이킹 시간과 길 상태."},
  '/destinations/nkob':{title:'은코브 — 45개 카스바의 마을, 여행 가이드',description:"제벨 사그로 산기슭의 외딴 마을로, 45개의 역사적인 카스바와 불빛에서 벗어난 별 관측, 토브칼의 인파를 피한 트레킹으로 알려져 있다."},
  '/destinations/mirleft':{title:'미를레프트 — 거친 대서양 서핑 마을, 여행 가이드',description:"티즈니트와 시디 이프니 사이에 자리한 때 묻지 않은 서핑 겸 어촌 마을 — 절벽 위 노을, 마라부 서핑 포인트, 인파를 피한 고요한 만."},
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
import { localizedComparisonMeta } from '@/data/comparison-meta-i18n';
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

/** Blog slugs in the order their localized copy is keyed (blog_post_<n>_*). */
const BLOG_POST_INDEX: Record<string, number> = {
  'merzouga-luxury-desert-camp-guide': 1,
  'best-time-to-visit-morocco-sahara': 2,
  'camel-trekking-etiquette-morocco': 3,
  'marrakech-to-merzouga-roadtrip': 4,
  'morocco-packing-list-desert': 5,
  'fes-chefchaouen-blue-city-guide': 6,
};

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

  // 2.4 /book — the booking-request page authors its own copy per language
  //     (src/data/book-copy.ts), so the SERP snippet matches what the page says.
  if (normalized === '/book' && lang !== 'en') {
    const c = BOOK_COPY[lang];
    if (c) return { title: c.title, description: truncate(`${c.subtitle} ${c.promise}`), ogImage: getRouteMeta('/book').ogImage };
  }

  // 2.4a The blog: every post's title and excerpt are authored per language
  //      (blog_post_<n>_*), so the SERP snippet matches the page.
  const blogPost = normalized.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogPost && lang !== 'en') {
    const n = BLOG_POST_INDEX[blogPost[1]];
    if (n) {
      const title = translate(lang, `blog_post_${n}_title`);
      const excerpt = translate(lang, `blog_post_${n}_excerpt`);
      if (title !== `blog_post_${n}_title` && excerpt !== `blog_post_${n}_excerpt`) {
        return { title, description: truncate(excerpt), ogImage: BLOG_META[blogPost[1]]?.ogImage };
      }
    }
  }
  if (normalized === '/blog' && lang !== 'en') {
    const title = translate(lang, 'blog_title');
    const subtitle = translate(lang, 'blog_subtitle');
    if (title !== 'blog_title' && subtitle !== 'blog_subtitle') {
      return { title, description: truncate(subtitle), ogImage: getRouteMeta('/blog').ogImage };
    }
  }

  // 2.4b Duration hubs (/tours/from-<city>/<n>-days) are formulaic, so they are
  //      built from a localized template rather than served in English.
  const durHub = normalized.match(/^\/tours\/from-([a-z]+)\/(\d+)-days$/);
  if (durHub && lang !== 'en') {
    const titleTpl = translate(lang, 'hub_dur_meta_title');
    const descTpl = translate(lang, 'hub_dur_meta_desc');
    const cityName = translate(lang, `hub_${durHub[1]}_name`);
    if (titleTpl !== 'hub_dur_meta_title' && cityName !== `hub_${durHub[1]}_name`) {
      const n = Number(durHub[2]);
      // Arabic counts two differently from three and up.
      const days = lang === 'ar' ? (n === 2 ? 'يومين' : `${n} أيام`) : String(n);
      const fill = (tpl: string) => tpl.split('{days}').join(days).split('{city}').join(cityName);
      return { title: fill(titleTpl), description: truncate(fill(descTpl)), ogImage: getRouteMeta(normalized).ogImage };
    }
  }

  // 2.45 The twenty-five things — the page authors its own heading and lead
  //      per language (src/data/things-to-do/<lang>.ts).
  if (normalized === '/things-to-do-in-morocco' && lang !== 'en') {
    const c = THINGS_COPY[lang];
    if (c) return { title: c.heading, description: truncate(c.intro), ogImage: getRouteMeta('/things-to-do-in-morocco').ogImage };
  }

  // 2.5 Comparison pages — authored localized title/description per locale
  //     (src/data/comparison-meta-i18n.ts). Feeds <title>/<meta description>/OG
  //     so the SERP snippet matches the localized H1. Falls back to the canonical
  //     English route metadata when no authored entry exists.
  const compMatch = normalized.match(/^\/comparisons\/([^/]+)$/);
  if (compMatch) {
    const lm = localizedComparisonMeta(compMatch[1], lang);
    if (lm) return { title: lm.pageTitle, description: truncate(lm.description), ogImage: getRouteMeta(rest).ogImage };
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
      // Same share image as the English page (a JPEG with an authored alt).
      return { title, description: truncate(t.description), ogImage: TOUR_META[TOUR_ALIASES[t.id] ?? t.id]?.ogImage ?? t.image };
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
      return { title, description: truncate(d.description || d.shortDesc), ogImage: d.imageDecorative || d.imageUnverified ? getRouteMeta(rest).ogImage : d.image };
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

