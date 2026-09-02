/** Per-route SEO metadata. Keep this file as the single source of truth for runtime/prerendered route metadata. */
import { t as translate, type Lang } from '@/i18n/index';
import { getLocalizedTour, getLocalizedDestination } from '@/i18n/content';
export type RouteMeta = { title: string; description: string; ogImage?: string };

const BRAND = 'Morocco Grand Adventure';
export const HOME_META: RouteMeta = {
  title: 'Luxury Desert Tours & Private Morocco Experiences',
  description: 'Morocco Grand Adventure offers luxury private tours across Morocco — Sahara Desert camel trekking, Marrakech medinas, Chefchaouen, Fes, Atlas Mountains & more. Book with local experts.',
  ogImage: '/images/hero/desert-pano.jpg',
};
export const FR_HOME_META: RouteMeta = {
  title: 'Voyage sur mesure au Maroc — Circuits privés & Sahara',
  description: "Créez votre circuit privé au Maroc avec une agence locale : désert de Merzouga, camp de luxe, Marrakech, Fès et l'Atlas. Devis personnalisé.",
  ogImage: '/images/hero/desert-pano.jpg',
};

const TOUR_META: Record<string, RouteMeta> = {
  '3-day-sahara-marrakech': { title: '3-Day Luxury Sahara Tour from Marrakech', description: "Cross the Atlas Mountains, explore Aït Ben Haddou and sleep under Saharan stars in a luxury desert camp.", ogImage: '/images/tours/3-day-sahara-marrakech.jpg' },
  '3-day-sahara-fes': { title: '3-Day Private Sahara Route from Fes | Morocco', description: 'A quote-only three-day private route from Fes toward Merzouga and Erg Chebbi, with transparent travel expectations and no invented price.', ogImage: '/images/dest/merzouga.jpg' },
  '3-day-sahara-agadir': { title: '3-Day Private Sahara Route from Agadir | Morocco', description: 'A quote-only three-day private route from Agadir toward Merzouga and Erg Chebbi, with transparent itinerary planning and confirmed payment terms.', ogImage: '/images/dest/agadir.jpg' },
  '5-day-imperial-cities': { title: '5-Day Imperial Cities & Desert Morocco Tour', description: 'Explore Marrakech, Meknès, Fes and Chefchaouen before a night in the Sahara on a private Morocco tour.', ogImage: '/images/tours/5-day-imperial-cities.jpg' },
  '7-day-imperial-cities-sahara-escape': { title: '7-Day Imperial Cities & Sahara Escape — Grand Morocco Tour', description: 'A private Morocco journey through the High Atlas, Aït Ben Haddou, Dades Valley, Erg Chebbi and imperial Fes.', ogImage: '/images/tours/7-day-grand-morocco.jpg' },
  'honeymoon-morocco': { title: 'Romantic Morocco Honeymoon — 10 Day Luxury Private Tour', description: 'A romantic private Morocco journey combining cities, desert experiences and time designed for couples.', ogImage: '/images/tours/honeymoon-morocco.jpg' },
  '8-day-marrakech-essaouira-agadir-sahara': { title: '8-Day Marrakech, Essaouira, Agadir & Sahara Desert Adventure', description: 'A private southern Morocco route from Marrakech through Essaouira and Agadir to the Sahara.', ogImage: '/images/dest/merzouga.jpg' },
  'family-morocco-adventure': { title: 'Family Morocco Adventure — 9 Day Private Tour', description: 'A private family Morocco journey combining cultural discoveries, desert experiences and memorable activities.', ogImage: '/images/tours/family-morocco-adventure.jpg' },
};
const TOUR_ALIASES: Record<string,string> = {
  '3-days-marrakech-to-merzouga-desert-tour':'3-day-sahara-marrakech',
  '3-days-fes-to-marrakech-desert-tour':'5-day-imperial-cities',
  'merzouga-desert-tour':'3-day-sahara-marrakech',
  'morocco-desert-tour':'7-day-imperial-cities-sahara-escape',
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
  ouirgane:{title:'Ouirgane — High Atlas Village & Travel Guide',description:'Discover Ouirgane, a quiet High Atlas valley village south of Marrakech with olive groves, trails and Toubkal National Park scenery.',ogImage:'/images/hero/atlas-pano.jpg'},
};

export const routeMetadata: Record<string, RouteMeta> = {
  '/':HOME_META,
  '/destinations':{title:'Morocco Destinations — Sahara, Imperial Cities, Atlas Mountains',description:'Explore Morocco’s top destinations including Marrakech, Fes, Merzouga, Chefchaouen, the Atlas Mountains and Atlantic coast.',ogImage:'/images/dest/merzouga.jpg'},
  '/tours':{title:'Morocco Tours & Private Itineraries — 3 to 10 Day Adventures',description:'Browse private Morocco tours, Sahara journeys, imperial cities, family adventures and honeymoon itineraries.',ogImage:'/images/tours/7-day-grand-morocco.jpg'},
  '/tours/from-marrakech':{title:'Tours From Marrakech — Private Sahara & Morocco Tours',description:'Private Morocco tours departing Marrakech, including Sahara and southern Morocco routes.',ogImage:'/images/dest/marrakech.jpg'},
  '/tours/from-casablanca':{title:'Tours From Casablanca — Private Morocco Itineraries',description:'Plan a private Morocco itinerary starting in Casablanca.',ogImage:'/images/dest/casablanca.jpg'},
  '/tours/from-fes':{title:'Tours From Fes — Private Morocco & Sahara Tours',description:'Private tours from Fes including imperial cities, Chefchaouen and Sahara routes.',ogImage:'/images/dest/fes.jpg'},
  '/tours/from-agadir':{title:'Tours From Agadir — Coast & Sahara Private Tours',description:'Private Morocco journeys starting in Agadir and exploring the Atlantic coast and south.',ogImage:'/images/dest/agadir.jpg'},
  '/tours/from-marrakech/3-days':{title:'3-Day Tours From Marrakech — Sahara Desert & Merzouga',description:'Explore the High Atlas, Aït Ben Haddou, Dades Valley and Merzouga on a three-day route.',ogImage:'/images/dest/merzouga.jpg'},
  '/gallery':{title:'Morocco Photo & Video Gallery — Sahara & Morocco',description:'Photos and videos from Morocco’s Sahara, medinas, mountains and desert camps.',ogImage:'/images/hero/medina-pano.jpg'},
  '/trip-builder':{title:'Create a Custom Morocco Itinerary — Private Trip Planner',description:'Design a bespoke multi-day Morocco itinerary with destinations, duration and interests.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/build-your-day-trip':{title:'Build Your Day Trip in Morocco — One-Day Experiences',description:'Plan a personalized one-day Morocco experience with same-day return. Choose your departure, destination, date and preferences.',ogImage:'/images/dest/ouzoud.jpg'},
  '/about':{title:'About Us — Morocco Grand Adventure',description:'Meet the local team behind Morocco Grand Adventure and discover our approach to Morocco travel.',ogImage:'/images/hero/medina-pano.jpg'},
  '/contact':{title:'Contact Morocco Grand Adventure — Plan Your Morocco Journey',description:'Contact Morocco Grand Adventure by WhatsApp, email or phone to plan your Morocco journey.',ogImage:'/images/dest/merzouga.jpg'},
  '/desert-tours':{title:'Sahara Desert Tours — Merzouga, Erg Chebbi & Camps',description:'Explore the Sahara with Merzouga desert tours, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  '/luxury-camp':{title:'Luxury Desert Camp Morocco — Sahara Glamping',description:'Discover luxury desert camp experiences near Merzouga.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  '/camel-trekking':{title:'Camel Trekking Merzouga — Sahara Camel Rides',description:'Ride camels across the golden dunes of Erg Chebbi with local guides.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  '/4x4-tours':{title:'4x4 Desert Tours Morocco — Sahara Off-Road Adventures',description:'Explore Erg Chebbi and the Sahara by 4x4 with local guides.',ogImage:'/images/dest/erg-chebbi.jpg'},
  '/marrakech-tours':{title:'Marrakech Tours — Private Day Trips & Morocco Tours',description:'Discover Marrakech and private journeys into the Atlas and southern Morocco.',ogImage:'/images/dest/marrakech.jpg'},
  '/fes-tours':{title:'Fes Tours — Private Guided Morocco Tours',description:'Explore Fes, Chefchaouen and northern Morocco with local guides.',ogImage:'/images/dest/fes.jpg'},
  '/agadir-tours':{title:'Agadir Tours — Atlantic Coast & Sahara Private Journeys',description:'Explore Agadir and the Atlantic coast, or journey inland toward the Sahara — private tours starting in Morocco\u2019s sunniest resort.',ogImage:'/images/dest/agadir.jpg'},
  '/casablanca-tours':{title:'Casablanca Tours — Private Morocco Itineraries',description:'Plan a private Morocco itinerary starting in Casablanca — Hassan II Mosque, the Atlantic coast, imperial cities and Sahara routes.',ogImage:'/images/dest/casablanca.jpg'},
  '/day-trips':{title:'Morocco Day Trips — Personalized One-Day Experiences',description:'Explore Morocco on a one-day experience with same-day return. Request a personalized route and quote.',ogImage:'/images/dest/ouzoud.jpg'},
  '/merzouga-guide':{title:'Merzouga Travel Guide — Sahara Desert & Erg Chebbi',description:'A practical guide to Merzouga, Erg Chebbi, camel trekking and desert camp experiences.',ogImage:'/images/dest/merzouga.jpg'},
  '/faq':{title:'Morocco Travel FAQ — Questions About Tours & Travel',description:'Answers to common Morocco travel, desert tour, packing and booking questions.',ogImage:'/images/dest/merzouga.jpg'},
  '/blog':{title:'Morocco Travel Blog — Guides, Tips & Inspiration',description:'Morocco travel guides and practical advice from local Sahara specialists.',ogImage:'/images/hero/desert-pano.jpg'},
};

export const BLOG_META: Record<string,RouteMeta> = {
  'merzouga-luxury-desert-camp-guide':{title:'Luxury Desert Camps in Merzouga — Ultimate Guide',description:'A practical guide to luxury desert camps and Sahara stays in Merzouga.',ogImage:'/images/personal/luxury-camp-dusk.jpg'},
  'best-time-to-visit-morocco-sahara':{title:'Best Time to Visit the Sahara Desert — Guide',description:'Planning guide for choosing a time to visit the Moroccan Sahara.',ogImage:'/images/dest/merzouga.jpg'},
  'camel-trekking-etiquette-morocco':{title:'Camel Trekking in Morocco — What to Expect',description:'What first-time travelers should know before a camel trek in Morocco.',ogImage:'/images/personal/dunes-camels-poster.jpg'},
  'marrakech-to-merzouga-roadtrip':{title:'Marrakech to Merzouga — Sahara Road Trip Guide',description:'A practical guide to the Marrakech to Merzouga route, stops and travel planning.',ogImage:'/images/dest/ait-ben-haddou.jpg'},
  'morocco-packing-list-desert':{title:'Morocco Desert Packing List — What to Bring',description:'Practical essentials to pack for a Morocco Sahara trip.',ogImage:'/images/hero/desert-pano.jpg'},
  'fes-chefchaouen-blue-city-guide':{title:'Fes to Chefchaouen — Morocco Blue City Guide',description:'Plan a journey from Fes to Chefchaouen and explore Morocco’s blue medina.',ogImage:'/images/dest/chefchaouen.jpg'},
};

export function getRouteMeta(rest:string):RouteMeta {
  const normalized = rest === '' || rest === '/' ? '/' : rest.replace(/\/$/,'');
  if (routeMetadata[normalized]) return routeMetadata[normalized];
  const duration = normalized.match(/^\/tours\/from-([^/]+)\/(\d+)-?days?$/);
  if (duration) {
    const cityLabel = duration[1][0].toUpperCase() + duration[1].slice(1);
    const daysLabel = `${duration[2]}-Day`;
    return { title:`${daysLabel} Tours From ${cityLabel} — Private Morocco Itineraries`, description:`Private ${duration[2]}-day Morocco tours from ${cityLabel} — the Sahara, imperial cities and the Atlas. Pick your pace and plan a tailored departure with local experts.`, ogImage:'/images/dest/merzouga.jpg' };
  }
  const tour = normalized.match(/^\/tours\/([^/]+)$/);
  if (tour) { const meta=TOUR_META[TOUR_ALIASES[tour[1]] ?? tour[1]]; if(meta) return meta; }
  const dest = normalized.match(/^\/destinations\/([^/]+)$/); if(dest && DESTINATION_META[dest[1]]) return DESTINATION_META[dest[1]];
  const blog = normalized.match(/^\/blog\/([^/]+)$/); if(blog && BLOG_META[blog[1]]) return BLOG_META[blog[1]];
  return HOME_META;
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
  '/agadir-tours':{title:'جولات أكادير — رحلات خاصة على الساحل الأطلسي',description:'استكشف أكادير والساحل الأطلسي أو انطلق نحو الصحراء — جولات خاصة تبدأ من أكثر سواحل المغرب إشراقًا.'},
  '/casablanca-tours':{title:'جولات الدار البيضاء — رحلات خاصة في المغرب',description:'خطط لرحلتك الخاصة في المغرب انطلاقًا من الدار البيضاء — مسجد الحسن الثاني والمدن الإمبراطورية والطرق نحو الصحراء.'},
  '/4x4-tours':{title:'جولات الدفع الرباعي في الصحراء المغربية',description:'استكشف الصحراء بعيدًا عن الكثبان بمغامرات خاصة بالدفع الرباعي — واحات ومخيمات الرُحّل وجمال إيرج شبي.'},
  '/gallery':{title:'معرض صور وفيديو المغرب — الصحراء والمدن',description:'صور وفيديوهات أصلية من رحلات المغرب — الكثبان والمدن والجبال والمخيمات الصحراوية.'},
  '/contact':{title:'اتصل بنا — حجز رحلات المغرب',description:'تواصل معنا عبر واتساب أو البريد لتخطيط رحلتك الخاصة في المغرب.'},
  '/about':{title:'من نحن — Morocco Grand Adventure',description:'تعرّف على فريق Morocco Grand Adventure وخبرتنا المحلية في رحلات المغرب.'},
  '/faq':{title:'أسئلة شائعة عن السفر إلى المغرب',description:'إجابات عن أسئلة السفر والجولات الصحراوية والحجز في المغرب.'},
  '/blog':{title:'مدونة السفر في المغرب — أدلة ونصائح',description:'أدلة ونصائح عملية للسفر في المغرب من خبراء محليين.'},
};
// ── Helpers ────────────────────────────────────────────────────────────────
function truncate(text: string | undefined, max = 158): string {
  const s = (text ?? '').toString().replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

/** Replace `{var}` placeholders in a translated template. */
function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m,
  );
}

// Localized descriptions derived from already-translated page content.
// A static page whose translation exists in the active locale gets a genuine
// localized meta description instead of leaking the English one. When the key
// is untranslated, t() returns the raw key — detected and treated as no override.
function fromTranslated(lang: Lang | undefined, key: string, max = 158): string | undefined {
  if (!lang || lang === 'en') return undefined;
  const raw = translate(lang, key);
  if (!raw || raw === key) return undefined;
  const s = raw.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

// ── Static page translation keys ──────────────────────────────────────────
// Title keys: navigation-style titles used in the <title> tag (kept short).
const STATIC_TITLE_KEYS: Record<string, string> = {
  '/tours': 'nav_tours',
  '/destinations': 'nav_destinations',
  '/about': 'nav_about',
  '/contact': 'nav_contact',
  '/faq': 'faq_title',
  '/blog': 'blog_title',
  '/gallery': 'nav_gallery',
  '/trip-builder': 'nav_build_journey',
  '/build-your-day-trip': 'nav_build_journey',
  '/day-trips': 'dt_title',
  '/desert-tours': 'dt2_title',
  '/luxury-camp': 'lc_title',
  '/camel-trekking': 'ct_title',
  '/4x4-tours': 'f4_title',
  '/merzouga-guide': 'mg_title',
  '/marrakech-tours': 'mk_title',
  '/fes-tours': 'mt_title',
  '/agadir-tours': 'ag_title',
  '/casablanca-tours': 'ca_title',
};

// Description keys: natural description-grade sentences for meta description.
// Each experience/tour hub uses its own localized subtitle key so the meta
// description is page-specific (distinct snippets + no keyword cannibalization)
// instead of every tours page sharing the generic "Curated Itineraries" copy.
const STATIC_DESC_KEYS: Record<string, string> = {
  '/tours': 'section_tours_sub',
  '/destinations': 'section_destinations_sub',
  '/about': 'about_story_p1',
  '/contact': 'footer_tagline_alt',
  '/faq': 'faq_subtitle',
  '/blog': 'blog_subtitle',
  '/gallery': 'nav_gallery',
  '/trip-builder': 'section_planner_sub',
  '/build-your-day-trip': 'section_planner_sub',
  '/day-trips': 'dt_subtitle',
  '/desert-tours': 'dt2_subtitle',
  '/luxury-camp': 'lc_subtitle',
  '/camel-trekking': 'ct_subtitle',
  '/4x4-tours': 'f4_subtitle',
  '/merzouga-guide': 'mg_subtitle',
  '/marrakech-tours': 'mk_subtitle',
  '/fes-tours': 'mt_subtitle',
  '/agadir-tours': 'ag_subtitle',
  '/casablanca-tours': 'ca_subtitle',
};

// ── Core localized metadata resolver ──────────────────────────────────────
// Single source of truth for both runtime (LocalizedHead) and build-time
// (prerender metaFor). Handles every route type across all 11 languages:
//   1. Tour detail pages  → localized entity data (name/desc/image overlay)
//   2. Destination detail → localized entity data
//   3. City hub pages     → hub_${city}_title / hub_${city}_sub translation keys
//   4. Duration hub pages → hub_dur_h1 (formatted) / hub_dur_intro_* keys
//   5. Arabic static      → AR_ROUTE_META dedicated table
//   6. Other static pages → STATIC_TITLE_KEYS + STATIC_DESC_KEYS
export function getLocalizedRouteMeta(rest: string, lang?: Lang): RouteMeta {
  const clean = rest === '' || rest === '/' ? '/' : rest.replace(/\/$/, '');
  const l: Lang = lang ?? 'en';

  // 1. Tour detail pages — localized entity data (the core metaFor fix).
  const tourMatch = clean.match(/^\/tours\/([^/]+)$/);
  if (tourMatch) {
    const t = getLocalizedTour(tourMatch[1], l);
    if (t) return { title: t.name, description: truncate(t.description), ogImage: t.image };
  }

  // 2. Destination detail pages — localized entity data.
  const destMatch = clean.match(/^\/destinations\/([^/]+)$/);
  if (destMatch) {
    const d = getLocalizedDestination(destMatch[1], l);
    if (d) return { title: d.name, description: truncate(d.shortDesc || d.description), ogImage: d.image };
  }

  // 3. City hub pages — localized translation keys.
  const cityMatch = clean.match(/^\/tours\/from-([^/]+)$/);
  if (cityMatch) {
    const city = cityMatch[1];
    const base = getRouteMeta(clean);
    const title = l !== 'en' ? translate(l, `hub_${city}_title`) || base.title : base.title;
    const sub = fromTranslated(l, `hub_${city}_sub`);
    return { title, description: sub || base.description, ogImage: base.ogImage };
  }

  // 4. Duration hub pages — localized translation keys (formatted).
  const durMatch = clean.match(/^\/tours\/from-([^/]+)\/(\d+)-days$/);
  if (durMatch) {
    const city = durMatch[1];
    const days = durMatch[2];
    const base = getRouteMeta(clean);
    const titleTemplate = translate(l, 'hub_dur_h1');
    const cityName = translate(l, `hub_${city}_name`) || city;
    const title = l !== 'en' && titleTemplate && titleTemplate !== 'hub_dur_h1'
      ? fmt(titleTemplate, { days, city: cityName })
      : base.title;
    const introKey = days === '3' ? 'hub_dur_intro_3' : 'hub_dur_intro_default';
    const intro = fromTranslated(l, introKey);
    return { title, description: intro || base.description, ogImage: base.ogImage };
  }

  // 5. Arabic — dedicated route metadata table.
  if (l === 'ar') {
    return AR_ROUTE_META[clean] ?? getRouteMeta(clean);
  }

  // 6. Other static pages — translation keys for title + description.
  const base = getRouteMeta(clean);
  const titleKey = STATIC_TITLE_KEYS[clean];
  const descKey = STATIC_DESC_KEYS[clean];
  const title = titleKey && l !== 'en' ? translate(l, titleKey) || base.title : base.title;
  const description = descKey ? fromTranslated(l, descKey) || base.description : base.description;
  return { title, description, ogImage: base.ogImage };
}
