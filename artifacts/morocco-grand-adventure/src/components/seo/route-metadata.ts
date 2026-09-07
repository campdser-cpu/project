/** Per-route SEO metadata. Keep this file as the single source of truth for runtime/prerendered route metadata. */
export type RouteMeta = { title: string; description: string; ogImage?: string };

// Import the catalog's canonical alt text so OG image alt descriptions stay in
// sync with the actual subject of every shared image (catalog photos included).
import { catalogImage } from '@/data/imageCatalog';

const BRAND = 'Morocco Grand Adventure';
export const HOME_META: RouteMeta = {
  title: 'Morocco Tours & Private Sahara Desert Trips',
  description: 'Tailored private Morocco tours by local Sahara guides â€” desert trips from Marrakech and Fes, Merzouga luxury camps, imperial cities and the Atlas.',
  ogImage: '/images/hero/desert-pano.jpg',
};
export const FR_HOME_META: RouteMeta = {
  title: 'Voyage sur mesure au Maroc â€” Circuits privÃ©s & Sahara',
  description: "CrÃ©ez votre circuit privÃ© au Maroc avec une agence locale : dÃ©sert de Merzouga, camp de luxe, Marrakech, FÃ¨s et l'Atlas. Devis personnalisÃ©.",
  ogImage: '/images/hero/desert-pano.jpg',
};

const TOUR_META: Record<string, RouteMeta> = {
  '3-day-sahara-marrakech': { title: '3-Day Luxury Sahara Tour from Marrakech', description: "Cross the Atlas Mountains, explore AÃ¯t Ben Haddou and sleep under Saharan stars in a luxury desert camp.", ogImage: '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp' },
  '3-day-sahara-fes': { title: '3-Day Private Sahara Route from Fes | Morocco', description: 'A quote-only three-day private route from Fes toward Merzouga and Erg Chebbi, with transparent travel expectations and no invented price.', ogImage: '/images/dest/erg-chebbi.webp' },
  '3-day-sahara-agadir': { title: '3-Day Private Sahara Route from Agadir | Morocco', description: 'A quote-only three-day private route from Agadir toward Merzouga and Erg Chebbi, with transparent itinerary planning and confirmed payment terms.', ogImage: '/images/dest/agadir.webp' },
  '5-day-imperial-cities': { title: '5-Day Imperial Cities & Desert Morocco Tour', description: 'Explore Marrakech, MeknÃ¨s, Fes and Chefchaouen before a night in the Sahara on a private Morocco tour.', ogImage: '/images/curated/ait-ben-haddou-kasbah-sunrise-ouarzazate.webp' },
  '7-day-imperial-cities-sahara-escape': { title: '7-Day Imperial Cities & Sahara Escape â€” Grand Morocco Tour', description: 'A private Morocco journey through the High Atlas, AÃ¯t Ben Haddou, Dades Valley, Erg Chebbi and imperial Fes.', ogImage: '/images/curated/ait-ben-haddou-bridge-town-unesco-morocco.webp' },
  'honeymoon-morocco': { title: 'Romantic Morocco Honeymoon â€” 10 Day Luxury Private Tour', description: 'A romantic private Morocco journey combining cities, desert experiences and time designed for couples.', ogImage: '/images/curated/couple-blue-steps-chefchaouen-medina.webp' },
  '8-day-marrakech-essaouira-agadir-sahara': { title: '8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure', description: 'Eight private days from Marrakech to Essaouira and Agadir, across the Atlas to AÃ¯t Ben Haddou and Erg Chebbi â€” camel trek and a night in a desert camp.', ogImage: '/images/curated/todra-gorge-river-canyon-high-atlas.webp' },
  'family-morocco-adventure': { title: 'Family Morocco Adventure â€” 9 Day Private Tour', description: 'A 9-day private family tour of Morocco â€” Marrakech, an Atlas mule ride, a Sahara camel trek and kasbahs, paced for kids and parents alike.', ogImage: '/images/curated/cascading-waterfall-todra-gorge.webp' },
  '2-day-zagora-desert-marrakech': { title: '2-Day Zagora Desert Tour from Marrakech | Morocco', description: 'A private two-day route from Marrakech through AÃ¯t Ben Haddou, Ouarzazate and the Draa Valley to Zagora.', ogImage: '/images/curated/ancient-water-channels-olive-groves-morocco.webp' },
  '4-day-marrakech-merzouga-sahara': { title: '4-Day Marrakech to Merzouga Sahara Tour | Morocco', description: 'Take four days from Marrakech to Merzouga via AÃ¯t Ben Haddou, Dades and Todra, with more time around Erg Chebbi.', ogImage: '/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp' },
  '5-day-great-south-morocco': { title: '5-Day Great South Morocco Tour | Private Desert Journey', description: 'Explore AÃ¯t Ben Haddou, Dades, Todra, Merzouga and the Draa Valley on a private five-day southern Morocco route.', ogImage: '/images/dest/draa-valley.webp' },
  '3-day-fes-merzouga-sahara': { title: '3-Day Fes to Merzouga Sahara Desert Tour | Morocco', description: 'Travel privately from Fes through the Middle Atlas and Ziz Valley to Merzouga and Erg Chebbi.', ogImage: '/images/catalog/sahara-bivouac-stars-merzouga.webp' },
  '4-day-fes-marrakech-via-merzouga': { title: '4-Day Fes to Marrakech via Merzouga | Morocco Tour', description: 'A private one-way journey from Fes to Marrakech via Merzouga, Todra Gorge, Dades Valley and AÃ¯t Ben Haddou.', ogImage: '/images/dest/ait-ben-haddou.webp' },
  'fes-4-day': { title: '4-Day Fes to Merzouga Sahara Route', description: 'A private round trip from Fes to the Sahara across the Middle Atlas, the Ziz Valley and the dunes of Erg Chebbi.', ogImage: '/images/curated/tannery-workers-dyeing-pits-fes.webp' },
  'fes-5-day': { title: '5-Day Fes to Marrakech via Merzouga, Dades & the Atlas', description: 'A one-way private route from Fes to Marrakech through the Sahara, the gorges and the High Atlas.', ogImage: '/images/dest/dades-valley.webp' },
  'fes-8-day': { title: '8-Day Fes Imperial Cities & Sahara Grand Tour', description: 'A private eight-day journey from Fes through MeknÃ¨s, Volubilis and the Sahara to a guided day in Marrakech.', ogImage: '/images/curated/chouara-tannery-overhead-fes-el-bali.webp' },
  'agadir-4-day': { title: '4-Day Agadir to Marrakech via Taroudant & the Atlas', description: 'A private route from Agadir to Marrakech through Taroudant, Ouarzazate and AÃ¯t Ben Haddou, with time to enjoy Marrakech.', ogImage: '/images/dest/agadir.webp' },
  'agadir-5-day': { title: '5-Day Agadir to Marrakech via Ouarzazate & Merzouga', description: 'A one-way private route from Agadir to Marrakech through the kasbahs, the gorges and the Erg Chebbi Sahara.', ogImage: '/images/catalog/berber-camel-guide-sahara-merzouga.webp' },
  'agadir-8-day': { title: '8-Day Agadir Southern Morocco Grand Circuit', description: 'A private eight-day loop from Agadir through Taroudant, Ouarzazate, the Sahara, the Draa Valley and Marrakech.', ogImage: '/images/dest/agadir.webp' },
  'marrakech-4-day': { title: '4-Day Marrakech to Merzouga Sahara Explorer', description: 'A private four-day loop from Marrakech to the Sahara, visiting AÃ¯t Ben Haddou, the Dades and Todra gorges and a night in the Erg Chebbi dunes.', ogImage: '/images/curated/tin-mal-mosque-pointed-arches-high-atlas.webp' },
  'casablanca-3-day': { title: '3-Day Casablanca to Fes via Rabat, MeknÃ¨s & Volubilis', description: 'A private route from Casablanca through Rabat, the imperial city of MeknÃ¨s, the Roman ruins of Volubilis and a guided day in Fes.', ogImage: '/images/curated/hassan-tower-mohammed-v-mausoleum-rabat.webp' },
  'casablanca-4-day': { title: '4-Day Casablanca to Fes via the Atlantic Coast & Chefchaouen', description: 'A relaxed private route from Casablanca to Fes along the Atlantic coast with Chefchaouen, MeknÃ¨s and Volubilis.', ogImage: '/images/curated/hassan-ii-mosque-ornate-bronze-door-casablanca.webp' },
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
  marrakech:{title:'Marrakech â€” Morocco Tours & Travel Guide',description:'Discover Marrakech, its medina, souks and major cultural sights. Plan your Morocco journey with local experts.',ogImage:'/images/dest/marrakech.jpg'},
  fes:{title:'Fes â€” Morocco Tours & Travel Guide',description:"Explore Fes, Morocco's cultural heart and its historic medina. Plan your Fes journey with local experts.",ogImage:'/images/dest/fes.jpg'},
  meknes:{title:'MeknÃ¨s â€” Morocco Tours & Travel Guide',description:'Discover MeknÃ¨s, an imperial city with historic gates, medina and nearby Volubilis.',ogImage:'/images/dest/meknes.jpg'},
  casablanca:{title:'Casablanca â€” Morocco Tours & Travel Guide',description:'Explore Casablanca, Hassan II Mosque and Moroccoâ€™s Atlantic gateway.',ogImage:'/images/dest/casablanca.jpg'},
  rabat:{title:'Rabat â€” Morocco Tours & Travel Guide',description:'Discover Rabat, Moroccoâ€™s capital, the Kasbah of the Oudayas and Hassan Tower.',ogImage:'/images/dest/rabat.jpg'},
  merzouga:{title:'Merzouga â€” Sahara Desert Tours & Travel Guide',description:'Explore Merzouga, gateway to Erg Chebbi, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  'erg-chebbi':{title:'Erg Chebbi â€” Sahara Desert Tours & Travel Guide',description:'Discover the Erg Chebbi dunes, camel trekking and desert experiences near Merzouga.',ogImage:'/images/dest/erg-chebbi.jpg'},
  ouarzazate:{title:'Ouarzazate â€” Morocco Tours & Travel Guide',description:'Explore Ouarzazate, kasbahs, film heritage and the gateway to southern Morocco.',ogImage:'/images/dest/ouarzazate.jpg'},
  'ait-ben-haddou':{title:'AÃ¯t Ben Haddou â€” UNESCO Morocco Tours Guide',description:'Visit AÃ¯t Ben Haddou, the historic earthen ksar and UNESCO World Heritage property.',ogImage:'/images/dest/ait-ben-haddou.jpg'},
  zagora:{title:'Zagora â€” Sahara Desert Tours & Travel Guide',description:'Discover Zagora and the Draa Valley in southern Morocco.',ogImage:'/images/dest/zagora.jpg'},
  'dades-valley':{title:'Dades Valley â€” Morocco Tours & Travel Guide',description:'Explore the Dades Valley, dramatic landscapes, kasbahs and mountain roads.',ogImage:'/images/dest/dades-valley.jpg'},
  'todra-gorge':{title:'Todra Gorge â€” Morocco Tours & Travel Guide',description:'Discover Todra Gorge and its dramatic canyon landscapes in southern Morocco.',ogImage:'/images/dest/todra-gorge.jpg'},
  skoura:{title:'Skoura Oasis â€” Morocco Tours & Travel Guide',description:'Explore the Skoura Oasis and its palm groves and historic kasbahs.',ogImage:'/images/dest/skoura.jpg'},
  'roses-valley':{title:'Valley of Roses â€” Morocco Tours & Travel Guide',description:'Discover Moroccoâ€™s Valley of Roses and its oasis landscapes.',ogImage:'/images/dest/roses-valley.jpg'},
  'draa-valley':{title:'Draa Valley â€” Morocco Tours & Travel Guide',description:'Explore the Draa Valley, palm groves, kasbahs and historic southern routes.',ogImage:'/images/dest/draa-valley.jpg'},
  chefchaouen:{title:'Chefchaouen â€” Morocco Tours & Travel Guide',description:'Discover Chefchaouen, the blue medina in Moroccoâ€™s Rif Mountains.',ogImage:'/images/dest/chefchaouen.jpg'},
  imlil:{title:'Imlil â€” Atlas Mountains Tours & Travel Guide',description:'Explore Imlil and the Atlas Mountains, Berber villages and trekking routes.',ogImage:'/images/dest/imlil.jpg'},
  'ourika-valley':{title:'Ourika Valley â€” Morocco Tours & Travel Guide',description:'Discover Ourika Valley, mountain landscapes and Berber villages near Marrakech.',ogImage:'/images/dest/ourika-valley.jpg'},
  ouzoud:{title:'Ouzoud Waterfalls â€” Morocco Tours & Travel Guide',description:'Visit Ouzoud Waterfalls and explore the surrounding Middle Atlas landscapes.',ogImage:'/images/dest/ouzoud.jpg'},
  ifrane:{title:'Ifrane & Cedar Forest â€” Morocco Tours & Travel Guide',description:'Discover Ifrane and the cedar forests of Moroccoâ€™s Middle Atlas.',ogImage:'/images/dest/ifrane.jpg'},
  essaouira:{title:'Essaouira â€” Morocco Tours & Travel Guide',description:'Explore Essaouira, its Atlantic medina, harbour and coastal atmosphere.',ogImage:'/images/dest/essaouira.jpg'},
  agadir:{title:'Agadir â€” Morocco Tours & Travel Guide',description:'Discover Agadir, its Atlantic coast and beaches in southern Morocco.',ogImage:'/images/dest/agadir.jpg'},
  taghazout:{title:'Taghazout â€” Morocco Surf Tours & Travel Guide',description:'Explore Taghazout and Moroccoâ€™s Atlantic surf coast.',ogImage:'/images/dest/taghazout.jpg'},
  legzira:{title:'Legzira Beach â€” Morocco Tours & Travel Guide',description:'Discover Legzira and its dramatic Atlantic coastline.',ogImage:'/images/dest/legzira.jpg'},
  'el-jadida':{title:'El Jadida â€” Morocco Tours & Travel Guide',description:'Explore El Jadida and its historic Portuguese heritage on the Atlantic coast.',ogImage:'/images/dest/el-jadida.jpg'},
  tangier:{title:'Tangier â€” Morocco Tours & Travel Guide',description:'Discover Tangier, Moroccoâ€™s northern gateway between the Atlantic and Mediterranean.',ogImage:'/images/dest/tangier.jpg'},
  tetouan:{title:'TÃ©touan â€” Morocco Tours & Travel Guide',description:'Explore TÃ©touan and its historic white medina in northern Morocco.',ogImage:'/images/dest/tetouan.jpg'},
  akchour:{title:'Akchour & Godâ€™s Bridge â€” Morocco Tours & Travel Guide',description:'Discover Akchourâ€™s waterfalls, pools and mountain landscapes near Chefchaouen.',ogImage:'/images/dest/akchour.jpg'},
  nkob:{title:'Nkob â€” Morocco Tours & Travel Guide',description:'Explore Nkob and the kasbah landscapes of the Jbel Saghro.',ogImage:'/images/dest/nkob.jpg'},
  mirleft:{title:'Mirleft â€” Morocco Surf Tours & Travel Guide',description:'Discover Mirleft and Moroccoâ€™s wild Atlantic coastline.',ogImage:'/images/dest/mirleft.jpg'},
};

export const routeMetadata: Record<string, RouteMeta> = {
  '/':HOME_META,
  '/destinations':{title:'Morocco Destinations â€” Sahara, Imperial Cities, Atlas Mountains',description:'Explore Moroccoâ€™s top destinations including Marrakech, Fes, Merzouga, Chefchaouen, the Atlas Mountains and Atlantic coast.',ogImage:'/images/dest/merzouga.jpg'},
  '/tours':{title:'Morocco Tours & Private Itineraries â€” 3 to 10 Day Adventures',description:'Browse private Morocco tours, Sahara journeys, imperial cities, family adventures and honeymoon itineraries.',ogImage:'/images/tours/7-day-grand-morocco.jpg'},
  '/tours/from-marrakech':{title:'Tours From Marrakech â€” Private Sahara & Morocco Tours',description:'Private Morocco tours departing Marrakech, including Sahara and southern Morocco routes.',ogImage:'/images/dest/marrakech.jpg'},
  '/tours/from-casablanca':{title:'Tours From Casablanca â€” Private Morocco Itineraries',description:'Plan a private Morocco itinerary starting in Casablanca.',ogImage:'/images/dest/casablanca.jpg'},
  '/tours/from-fes':{title:'Tours From Fes â€” Private Morocco & Sahara Tours',description:'Private tours from Fes including imperial cities, Chefchaouen and Sahara routes.',ogImage:'/images/dest/fes.jpg'},
  '/tours/from-agadir':{title:'Tours From Agadir â€” Coast & Sahara Private Tours',description:'Private Morocco journeys starting in Agadir and exploring the Atlantic coast and south.',ogImage:'/images/dest/agadir.jpg'},
  '/tours/from-marrakech/3-days':{title:'3-Day Tours From Marrakech â€” Sahara Desert & Merzouga',description:'Explore the High Atlas, AÃ¯t Ben Haddou, Dades Valley and Merzouga on a three-day route.',ogImage:'/images/dest/marrakech.jpg'},
  '/gallery':{title:'Morocco Photo & Video Gallery â€” Sahara & Morocco',description:'Photos and videos from Moroccoâ€™s Sahara, medinas, mountains and desert camps.',ogImage:'/images/hero/medina-pano.jpg'},
  '/trip-builder':{title:'Custom Morocco Itinerary Builder',description:'Choose your dates, route and travel style to build a custom Morocco itinerary â€” then request a personalised quote from our local team.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/build-your-day-trip':{title:'Build Your Day Trip in Morocco â€” One-Day Experiences',description:'Plan a personalized one-day Morocco experience with same-day return. Choose your departure, destination, date and preferences.',ogImage:'/images/dest/ouzoud.jpg'},
  '/about':{title:'About Us | Morocco, Beyond the Journey',description:'Meet Morocco Grand Adventure â€” desert guides from Merzouga sharing the whole of Morocco through private, locally-designed journeys.',ogImage:'/images/about/about-dune-1600.webp'},
  '/contact':{title:'Contact Morocco Grand Adventure â€” Plan Your Morocco Journey',description:'Contact Morocco Grand Adventure by WhatsApp, email or phone to plan your Morocco journey.',ogImage:'/images/dest/merzouga.jpg'},
  '/desert-tours':{title:'Sahara Desert Tours â€” Merzouga, Erg Chebbi & Camps',description:'Explore the Sahara with Merzouga desert tours, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  '/luxury-camp':{title:'Luxury Desert Camp Morocco â€” Sahara Glamping',description:'Discover luxury desert camp experiences near Merzouga.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/camel-trekking':{title:'Camel Trekking Merzouga â€” Sahara Camel Rides',description:'Ride camels across the golden dunes of Erg Chebbi with local guides.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  '/4x4-tours':{title:'4x4 Desert Tours Morocco â€” Sahara Off-Road Adventures',description:'Explore Erg Chebbi and the Sahara by 4x4 with local guides.',ogImage:'/images/dest/erg-chebbi.jpg'},
  '/marrakech-tours':{title:'Marrakech Tours â€” Private Day Trips & Morocco Tours',description:'Discover Marrakech and private journeys into the Atlas and southern Morocco.',ogImage:'/images/dest/marrakech.jpg'},
  '/fes-tours':{title:'Fes Tours â€” Private Guided Morocco Tours',description:'Explore Fes, Chefchaouen and northern Morocco with local guides.',ogImage:'/images/dest/fes.jpg'},
  '/day-trips':{title:'Morocco Day Trips â€” Personalized One-Day Experiences',description:'Explore Morocco on a one-day experience with same-day return. Request a personalized route and quote.',ogImage:'/images/dest/ouzoud.jpg'},
  '/merzouga-guide':{title:'Merzouga Travel Guide â€” Sahara Desert & Erg Chebbi',description:'A practical guide to Merzouga, Erg Chebbi, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  '/travel-info':{title:'Morocco Travel Information â€” Practical Guides from Locals',description:'Practical Morocco travel information from a local team â€” when to go, what to pack and how to get around.',ogImage:'/images/catalog/draa-valley-oasis-palm-grove.webp'},
  '/travel-info/best-time-to-visit-morocco':{title:'Best Time to Visit Morocco â€” Season-by-Season Guide',description:'When to visit Morocco: spring and autumn for most regions, how summer and winter differ between the coast, mountains and Sahara.',ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/travel-info/what-to-pack-morocco':{title:'What to Pack for Morocco â€” Practical Packing List',description:'A realistic Morocco packing list: layers for cold desert nights, sun protection, footwear for medinas and dunes.',ogImage:'/images/catalog/sahara-dune-trekking-merzouga.webp'},
  '/travel-info/getting-around-morocco':{title:'Getting Around Morocco â€” Transport Options Explained',description:'Trains, buses and private drivers in Morocco â€” realistic driving times between Marrakech, Fes and the Sahara.',ogImage:'/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp'},
  '/faq':{title:'Morocco Travel FAQ â€” Questions About Tours & Travel',description:'Answers to common Morocco travel, desert tour, packing and booking questions.',ogImage:'/images/dest/merzouga.jpg'},
    '/blog':{title:'Morocco Travel Blog â€” Guides, Tips & Inspiration',description:'Morocco travel guides and practical advice from local Sahara specialists.',ogImage:'/images/hero/desert-pano.jpg'},
  '/merzouga-guide/camel-trekking':{title:'Camel Trekking in Merzouga â€” Sahara Rides at Erg Chebbi',description:"What to expect on a camel trek near Merzouga â€” timing, what to wear, mounting tips and what happens at camp.",ogImage:'/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp'},
  '/merzouga-guide/desert-camps':{title:'Merzouga Desert Camps â€” Standard vs Luxury Guide',description:"Choose a desert camp in the Erg Chebbi dunes â€” tents, bathrooms, meals and what a night in camp includes.",ogImage:'/images/curated/sahara-desert-camp-starry-night-lantern-merzouga.webp'},
  '/merzouga-guide/luxury-desert-camps':{title:'Luxury Desert Camps Merzouga â€” What You Get',description:"Real look at luxury Sahara camps near Merzouga â€” en-suite tents, real beds, hot showers and what makes the step up worthwhile.",ogImage:'/images/personal/luxury-camp-dusk.webp'},
  '/merzouga-guide/best-time-to-visit':{title:'Best Time to Visit Merzouga â€” Month-by-Month Guide',description:"When to visit Merzouga for the Sahara â€” temperatures, crowds and the best months for camel trekking and camps.",ogImage:'/images/dest/merzouga.webp'},
  '/merzouga-guide/how-to-get-there':{title:'How to Get to Merzouga â€” From Marrakech & Fes',description:"Realistic driving times and transport options from Marrakech, Fes, Ouarzazate and Agadir to Merzouga and Erg Chebbi.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/merzouga-guide/erg-chebbi':{title:'Erg Chebbi Dunes â€” Moroccoâ€™s Tallest Sand Dunes',description:"About Erg Chebbi near Merzouga â€” why these dunes formed, how high they are and what to do on them.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/merzouga-guide/what-to-pack':{title:'What to Pack for Merzouga â€” Sahara Packing List',description:"Practical packing list for a Merzouga desert night â€” layers, sun protection, footwear and what NOT to bring.",ogImage:'/images/hero/desert-pano.webp'},
  '/merzouga-guide/faq':{title:'Merzouga FAQ â€” Sahara Questions Answered',description:"Straight answers to the most common Merzouga and Sahara questions â€” planning, getting there and camp nights.",ogImage:'/images/dest/merzouga.webp'},
  '/comparisons/merzouga-vs-zagora':{title:'Merzouga vs Zagora â€” Which Sahara Base to Choose?',description:"Dunes, access and crowd levels compared for the two main Sahara gateways â€” and which journey suits each.",ogImage:'/images/dest/zagora.webp'},
  '/comparisons/erg-chebbi-vs-erg-chigaga':{title:'Erg Chebbi vs Erg Chigaga â€” Which Sahara Dunes?',description:"Tall iconic dunes versus wider, quieter dunes â€” a factual comparison of Moroccoâ€™s two Sahara ergs.",ogImage:'/images/dest/erg-chebbi.webp'},
  '/comparisons/2-day-vs-3-day-sahara-tour':{title:'2-Day vs 3-Day Sahara Tour â€” Which Fits?',description:"What a 2-day and a 3-day Sahara tour cover, the realistic timing and which suits a tight or relaxed trip.",ogImage:'/images/dest/merzouga.webp'},
  '/comparisons/private-vs-shared-tour':{title:'Private vs Shared Morocco Tour â€” Trade-offs',description:"Price, schedule, group size and comfort compared so you can pick the right Morocco trip style.",ogImage:'/images/curated/berber-guide-camel-sahara-desert-merzouga.webp'},
  '/comparisons/luxury-camp-vs-standard-camp':{title:'Luxury Camp vs Standard Camp â€” Desert Night',description:"Same desert night, different tent and bathroom â€” how to choose the right Merzouga camp for your budget.",ogImage:'/images/personal/luxury-camp-dusk.webp'},
};

export const BLOG_META: Record<string,RouteMeta> = {
  'merzouga-luxury-desert-camp-guide':{title:'Merzouga Luxury Desert Camp Guide â€” Sahara Glamping',description:'Plan your Merzouga luxury desert camp stay: tent types, what a night includes, camel treks, best season and how to book your Sahara night.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  'best-time-to-visit-morocco-sahara':{title:'Best Time to Visit the Sahara Desert â€” Guide',description:'Planning guide for choosing a time to visit the Moroccan Sahara.',ogImage:'/images/dest/merzouga.jpg'},
  'camel-trekking-etiquette-morocco':{title:'Camel Trekking in Morocco â€” What to Expect',description:'What first-time travelers should know before a camel trek in Morocco.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  'marrakech-to-merzouga-roadtrip':{title:'Marrakech to Merzouga â€” Sahara Road Trip Guide',description:'A practical guide to the Marrakech to Merzouga route, stops and travel planning.',ogImage:'/images/dest/ait-ben-haddou.jpg'},
  'morocco-packing-list-desert':{title:'Morocco Desert Packing List â€” What to Bring',description:'Practical essentials to pack for a Morocco Sahara trip.',ogImage:'/images/hero/desert-pano.jpg'},
  'fes-chefchaouen-blue-city-guide':{title:'Fes to Chefchaouen â€” Morocco Blue City Guide',description:'Plan a journey from Fes to Chefchaouen and explore Moroccoâ€™s blue medina.',ogImage:'/images/dest/chefchaouen.jpg'},
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
    return { title:`${daysLabel} Tours From ${cityLabel} â€” Private Morocco Itineraries`, description:`Private ${duration[2]}-day Morocco tours from ${cityLabel} â€” the Sahara, imperial cities and the Atlas. Pick your pace and plan a tailored departure with local experts.`, ogImage: cityImage };
  }
  const tour = normalized.match(/^\/tours\/([^/]+)$/);
  if (tour) { const meta=TOUR_META[TOUR_ALIASES[tour[1]] ?? tour[1]]; if(meta) return meta; }
  const dest = normalized.match(/^\/destinations\/([^/]+)$/); if(dest && DESTINATION_META[dest[1]]) return DESTINATION_META[dest[1]];
  const blog = normalized.match(/^\/blog\/([^/]+)$/); if(blog && BLOG_META[blog[1]]) return BLOG_META[blog[1]];
  return HOME_META;
}

/** Humanize an image filename into a short, descriptive phrase (e.g. "hassan-tower-mohammed-v-mausoleum-rabat.webp" â†’ "Hassan Tower Mohammed V Mausoleum Rabat"). */
function humanizeAlt(url: string): string {
  const name = (url.split('/').pop() || '').replace(/\.(webp|jpg|jpeg|png|avif|gif)$/i, '');
  const tokens = name
    .split(/[-_]+/)
    .filter((tk) => !/^\d+w$/i.test(tk) && !/^\d+$/.test(tk) && !['photo', 'img', 'image', 'pic'].includes(tk.toLowerCase()))
    .map((tk) => (tk.length ? tk.charAt(0).toUpperCase() + tk.slice(1) : ''));
  return tokens.join(' ') || 'Morocco â€” a journey through the country';
}

/**
 * Resolve a natural, subject-accurate alt description for an Open Graph image.
 * Catalog photographs use the catalog's own canonical alt text; every other
 * shared image falls back to a humanized filename. This prevents the site from
 * attaching a single generic "Sahara camel caravan" description to every OG image.
 */
export function ogImageAlt(ogImage?: string): string {
  if (!ogImage) return 'Morocco Grand Adventure â€” private journeys through Morocco';
  if (ogImage.includes('/images/catalog/')) {
    const id = (ogImage.split('/').pop() || '').replace(/\.webp$/i, '');
    const img = catalogImage(id);
    if (img) return img.alt;
  }
  return humanizeAlt(ogImage);
}

const AR_ROUTE_META: Record<string,RouteMeta> = {
  '/':{title:'Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø¬ÙˆÙ„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆÙ…Ø±Ø§ÙƒØ´',description:'Ø±Ø­Ù„Ø§Øª Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ ØªØ´Ù…Ù„ Ù…Ø±Ø²ÙˆÙƒØ© ÙˆØ§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆÙ…Ø±Ø§ÙƒØ´ ÙˆÙØ§Ø³ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© Ù…Ø¹ Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø­Ù„ÙŠÙŠÙ†.'},
  '/tours':{title:'Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø±Ø­Ù„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©',description:'ØªØµÙØ­ Ø¬ÙˆÙ„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨ Ø§Ù„Ø®Ø§ØµØ© ÙˆØ±Ø­Ù„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ù…Ù† Ù…Ø±Ø§ÙƒØ´ ÙˆÙ…Ø±Ø²ÙˆÙƒØ© ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„Ø¥Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ©.'},
  '/destinations':{title:'ÙˆØ¬Ù‡Ø§Øª Ø§Ù„Ø³ÙŠØ§Ø­Ø© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø§Ù„Ù…Ø¯Ù† ÙˆØ§Ù„ØµØ­Ø±Ø§Ø¡',description:'Ø§ÙƒØªØ´Ù Ù…Ø±Ø§ÙƒØ´ ÙˆÙØ§Ø³ ÙˆÙ…Ø±Ø²ÙˆÙƒØ© ÙˆØ§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆØ¬Ø¨Ø§Ù„ Ø§Ù„Ø£Ø·Ù„Ø³ ÙˆØ³Ø§Ø­Ù„ Ø§Ù„Ù…ØºØ±Ø¨.'},
  '/trip-builder':{title:'Ù…Ø®Ø·Ø· Ø±Ø­Ù„Ø© Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø¬ÙˆÙ„Ø© Ù…Ø®ØµØµØ© Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø£ÙŠØ§Ù…',description:'ØµÙ…Ù‘Ù… Ø±Ø­Ù„Ø© Ø®Ø§ØµØ© Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø£ÙŠØ§Ù… ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ Ø­Ø³Ø¨ Ø§Ù„Ù…Ø¯Ø© ÙˆØ§Ù„ÙˆØ¬Ù‡Ø§Øª ÙˆØ§Ù„Ø§Ù‡ØªÙ…Ø§Ù…Ø§Øª.'},
  '/build-your-day-trip':{title:'ØµÙ…Ù‘Ù… Ø±Ø­Ù„ØªÙƒ Ø§Ù„ÙŠÙˆÙ…ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” ØªØ¬Ø±Ø¨Ø© Ù„ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯',description:'Ø®Ø·Ø· Ù„ØªØ¬Ø±Ø¨Ø© Ø®Ø§ØµØ© Ù„ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯ Ù…Ø¹ Ø§Ù„Ø¹ÙˆØ¯Ø© ÙÙŠ Ø§Ù„ÙŠÙˆÙ… Ù†ÙØ³Ù‡ ÙˆØ§Ø·Ù„Ø¨ Ø¹Ø±Ø¶ Ø³Ø¹Ø± Ù…Ø®ØµØµ.'},
  '/day-trips':{title:'Ø±Ø­Ù„Ø§Øª ÙŠÙˆÙ…ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” ØªØ¬Ø§Ø±Ø¨ Ù„ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯',description:'Ø§ÙƒØªØ´Ù Ø±Ø­Ù„Ø§Øª ÙŠÙˆÙ…ÙŠØ© Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ Ù…Ø¹ Ø§Ù„Ø¹ÙˆØ¯Ø© ÙÙŠ Ø§Ù„ÙŠÙˆÙ… Ù†ÙØ³Ù‡ ÙˆØ§Ø·Ù„Ø¨ Ø¹Ø±Ø¶ Ø³Ø¹Ø± Ù…Ø®ØµØµ.'},
  '/merzouga-guide':{title:'Ø¯Ù„ÙŠÙ„ Ù…Ø±Ø²ÙˆÙƒØ© â€” Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙˆØ¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠ',description:'Ø¯Ù„ÙŠÙ„ Ø¹Ù…Ù„ÙŠ Ù„Ù…Ø±Ø²ÙˆÙƒØ© ÙˆØ¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠ ÙˆØ±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ ÙˆØªØ¬Ø§Ø±Ø¨ Ø§Ù„Ù…Ø®ÙŠÙ… Ø§Ù„ØµØ­Ø±Ø§ÙˆÙŠ.'},
  '/desert-tours':{title:'Ø¬ÙˆÙ„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ù…Ø±Ø²ÙˆÙƒØ© ÙˆØ¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠ',description:'Ø±Ø­Ù„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§Ø¡ ÙÙŠ Ù…Ø±Ø²ÙˆÙƒØ© Ù…Ø¹ Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ ÙˆØ§Ù„Ù…Ø®ÙŠÙ…Ø§Øª ÙˆØ§Ù„ØªØ¬Ø§Ø±Ø¨ Ø§Ù„ØµØ­Ø±Ø§ÙˆÙŠØ©.'},
  '/luxury-camp':{title:'Ù…Ø®ÙŠÙ… ÙØ§Ø®Ø± ÙÙŠ Ù…Ø±Ø²ÙˆÙƒØ© â€” Ø¥Ù‚Ø§Ù…Ø© ÙÙŠ Ø§Ù„ØµØ­Ø±Ø§Ø¡',description:'Ø§ÙƒØªØ´Ù ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø®ÙŠÙ… Ø§Ù„ØµØ­Ø±Ø§ÙˆÙŠ Ø§Ù„ÙØ§Ø®Ø± ÙÙŠ Ù…Ù†Ø·Ù‚Ø© Ù…Ø±Ø²ÙˆÙƒØ©.'},
  '/camel-trekking':{title:'Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ ÙÙŠ ØµØ­Ø±Ø§Ø¡ Ù…Ø±Ø²ÙˆÙƒØ©',description:'ØªØ¬Ø±Ø¨Ø© Ø±ÙƒÙˆØ¨ Ø§Ù„Ø¬Ù…Ø§Ù„ ÙÙˆÙ‚ ÙƒØ«Ø¨Ø§Ù† Ø¥ÙŠØ±Ø¬ Ø´Ø¨ÙŠ Ù…Ø¹ Ù…Ø±Ø´Ø¯ÙŠÙ† Ù…Ø­Ù„ÙŠÙŠÙ†.'},
  '/marrakech-tours':{title:'Ø¬ÙˆÙ„Ø§Øª Ù…Ø±Ø§ÙƒØ´ â€” Ø±Ø­Ù„Ø§Øª Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨',description:'Ø§ÙƒØªØ´Ù Ù…Ø±Ø§ÙƒØ´ ÙˆØ§Ù„Ø±Ø­Ù„Ø§Øª Ø§Ù„Ø®Ø§ØµØ© Ø¥Ù„Ù‰ Ø§Ù„Ø£Ø·Ù„Ø³ ÙˆØ§Ù„Ø¬Ù†ÙˆØ¨ Ø§Ù„Ù…ØºØ±Ø¨ÙŠ.'},
  '/fes-tours':{title:'Ø¬ÙˆÙ„Ø§Øª ÙØ§Ø³ â€” Ø±Ø­Ù„Ø§Øª Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨',description:'Ø§Ø³ØªÙƒØ´Ù ÙØ§Ø³ ÙˆØ´ÙØ´Ø§ÙˆÙ† ÙˆØ´Ù…Ø§Ù„ Ø§Ù„Ù…ØºØ±Ø¨ Ù…Ø¹ Ù…Ø±Ø´Ø¯ÙŠÙ† Ù…Ø­Ù„ÙŠÙŠÙ†.'},
  '/contact':{title:'Ø§ØªØµÙ„ Ø¨Ù†Ø§ â€” Ø­Ø¬Ø² Ø±Ø­Ù„Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨',description:'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ø£Ùˆ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ù„ØªØ®Ø·ÙŠØ· Ø±Ø­Ù„ØªÙƒ Ø§Ù„Ø®Ø§ØµØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨.'},
  '/about':{title:'Ù…Ù† Ù†Ø­Ù† | Ø§Ù„Ù…ØºØ±Ø¨ØŒ Ù…Ø§ ÙˆØ±Ø§Ø¡ Ø§Ù„Ø±Ø­Ù„Ø©',description:'ØªØ¹Ø±Ù‘Ù Ø¹Ù„Ù‰ ÙØ±ÙŠÙ‚ Morocco Grand Adventure â€” Ù…Ø±Ø´Ø¯ÙˆÙ† ØµØ­Ø±Ø§ÙˆÙŠÙˆÙ† Ù…Ù† Ù…Ø±Ø²ÙˆÙƒØ© ÙŠØµÙ…Ù…ÙˆÙ† Ø±Ø­Ù„Ø§Øª Ø®Ø§ØµØ© Ø¹Ø¨Ø± Ø§Ù„Ù…ØºØ±Ø¨.'},
  '/faq':{title:'Ø£Ø³Ø¦Ù„Ø© Ø´Ø§Ø¦Ø¹Ø© Ø¹Ù† Ø§Ù„Ø³ÙØ± Ø¥Ù„Ù‰ Ø§Ù„Ù…ØºØ±Ø¨',description:'Ø¥Ø¬Ø§Ø¨Ø§Øª Ø¹Ù† Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø³ÙØ± ÙˆØ§Ù„Ø¬ÙˆÙ„Ø§Øª Ø§Ù„ØµØ­Ø±Ø§ÙˆÙŠØ© ÙˆØ§Ù„Ø­Ø¬Ø² ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨.'},
  '/blog':{title:'Ù…Ø¯ÙˆÙ†Ø© Ø§Ù„Ø³ÙØ± ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø£Ø¯Ù„Ø© ÙˆÙ†ØµØ§Ø¦Ø­',description:'Ø£Ø¯Ù„Ø© ÙˆÙ†ØµØ§Ø¦Ø­ Ø¹Ù…Ù„ÙŠØ© Ù„Ù„Ø³ÙØ± ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ Ù…Ù† Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø­Ù„ÙŠÙŠÙ†.'},
};
// â”€â”€ Localized route metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Single source of truth for per-page SEO title/description used by BOTH the
// runtime <LocalizedHead> and the static prerender (`scripts/prerender.ts`).
//
// Order of precedence:
//   1. Authoring-supplied per-language static overrides (currently Arabic only:
//      AR_ROUTE_META). These exist for languages whose authors translated the
//      static page copy.
//   2. Tour / destination DETAIL pages: when a content-translation overlay was
//      authored for the active language, surface the localized entity name +
//      description + image as the SEO title/description. This is how localized
//      tour metadata reaches the <title>/<meta description>/OG tags.
//   3. Otherwise fall back to the canonical English route metadata. No
//      translation is ever *invented* â€” a language without an authored overlay
//      keeps the English copy rather than receiving a machine-generated page.
import { getLocalizedTour, getLocalizedDestination, contentOverlayExists } from '@/i18n/content';
import { t as translate } from '@/i18n/index';
import type { Lang } from '@/i18n/index';

const DESCRIPTION_MAX = 158;
function truncate(text: string | undefined, max = DESCRIPTION_MAX): string {
  const s = (text ?? '').toString().replace(/\s+/g, ' ').trim();
  if (!s) return '';
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + 'â€¦';
}

export function getLocalizedRouteMeta(rest: string, lang: Lang = 'en'): RouteMeta {
  const normalized = rest === '' || rest === '/' ? '/' : rest.replace(/\/$/, '');

  // 1. Per-language static overrides (Arabic).
  if (lang === 'ar') {
    const ar = AR_ROUTE_META[normalized];
    if (ar) return ar;
  }

  // 2. Tour detail page â€” localized entity meta when an overlay exists.
  const tourMatch = normalized.match(/^\/tours\/([^/]+)$/);
  if (tourMatch) {
    const t = getLocalizedTour(tourMatch[1], lang);
    if (t && contentOverlayExists(lang, 'tours', t.id)) {
      return { title: t.name, description: truncate(t.description), ogImage: t.image };
    }
  }

  // 3. Destination detail page â€” localized entity meta when an overlay exists.
  //    Title is enriched with the authored localized region for search context
  //    (e.g. "Erg Chebbi | DÃ©sert du Sahara"), never invented â€” region comes
  //    from the same authored overlay as the name.
  const destMatch = normalized.match(/^\/destinations\/([^/]+)$/);
  if (destMatch) {
    const d = getLocalizedDestination(destMatch[1], lang);
    if (d && contentOverlayExists(lang, 'destinations', d.id)) {
      const regionSuffix = d.region && !d.name.includes(d.region) ? ` | ${d.region}` : '';
      return { title: `${d.name}${regionSuffix}`, description: truncate(d.shortDesc || d.description), ogImage: d.image };
    }
  }

  // 3.5 Tour hub pages â€” metadata built from the authored per-locale dictionary
  //     (hub_<city>_title / hub_<city>_intro / tours_heading / tours_sub).
  //     These keys are hand-authored in every locale file; if a locale lacks a
  //     key, t() falls back to English (never a literal key, never invented copy).
  if (normalized === '/tours') {
    const heading = translate(lang, 'tours_heading');
    if (heading && heading !== 'tours_heading') {
      const sub = translate(lang, 'tours_sub');
      const description = sub && sub !== 'tours_sub' ? truncate(`${heading} â€” ${sub}`) : truncate(heading);
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

