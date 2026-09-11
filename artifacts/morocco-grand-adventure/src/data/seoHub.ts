// ─────────────────────────────────────────────────────────────────────────────
// SEO Hub — Merzouga authority guide pages + decision/comparison pages.
//
// Single source of truth consumed by BOTH the runtime SPA (src/pages) and the
// build-time prerenderer (scripts/prerender.ts), so the crawlable HTML always
// matches what users see.
//
// • English-authored copy (English-first phase). Non-English routes intentionally
//   fall back to this English copy rather than receiving machine translation.
// • Facts are grounded in the company's real, verified services and the official
//   Moroccan tourism narrative (ONMT «Errachidia–Midelt–Merzouga» region), not
//   invented. Indicative timing/prices are clearly labelled as such.
// ─────────────────────────────────────────────────────────────────────────────

export type HubFaq = { question: string; answer: string };
export type HubSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type HubKind = 'merzouga' | 'comparison' | 'travel-info';

export type HubPage = {
  kind: HubKind;
  slug: string;
  title: string;        // H1
  pageTitle: string;    // <title>
  description: string;  // meta description
  ogImage: string;
  heroImage: string;
  heroAlt: string;
  intro: string;
  sections: HubSection[];
  faqs: HubFaq[];
  /** Related tour ids (/tours/:id) */
  tours: string[];
  /** Related destination ids (/destinations/:id) */
  destinations: string[];
  /** Related hub slugs within this SEO hub (same kind). */
  relatedGuides: string[];
  /** Comparison tables: [label, colA, colB, note?] */
  comparisonRows?: [string, string, string, string?][];
  /**
   * Authoritative sources backing facts on this page (ids from data/sources.ts).
   * Rendered once at the end as descriptive normal links — never a bibliography.
   */
  sources?: string[];
  /** Inline catalog photographs: placed after the Nth section (0-based). */
  inlineImages?: { imageId: string; after: number }[];
};

export const MERZOUGA_GUIDES: HubPage[] = [
  {
    kind: 'merzouga',
    slug: 'camel-trekking',
    title: 'Camel Trekking in Merzouga — A Practical Guide',
    pageTitle: 'Camel Trekking in Merzouga — Sahara Camel Rides at Erg Chebbi',
    description: "Everything you need to know before riding a camel into the Erg Chebbi dunes near Merzouga — when to go, what to wear, what to bring and how a desert night actually works.",
    ogImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp',
    heroImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp',
    heroAlt: 'Silhouette of a Berber guide leading camels along a dune ridge at sunset in the Sahara',
    intro: 'A camel ride into the Erg Chebbi dunes is the heart of any Merzouga visit. This is what actually happens, how long it takes and how to prepare so your sunset trek feels relaxed, not rushed.',
    sections: [
      {
        heading: 'What a Merzouga camel trek involves',
        paragraphs: [
          'Most treks leave about an hour before sunset so you cross the open gravel between the village and the dunes and climb a high ridge as the light turns orange. From the edge of Erg Chebbi to a desert camp is typically a ride of around one hour, moving slowly and stopping for photo breaks. On the way back the next morning, the sunrise ride follows the same dunes in the calm early light.',
          'You ride a dromedary (one-humped camel) led by a local cameleer — a Berber guide from the Merzouga area. The animals walk in a line and follow the terrain at their own steady pace. First-time riders are normally surprised by how gentle and unhurried it is.',
        ],
        bullets: [
          'Ride duration to camp: roughly 50–70 minutes each way',
          'Daily rhythm: sunset ride in, sunrise ride out',
          'Pace: slow and steady, with photo stops on the dunes',
          'Who leads: a local Berber cameleer, not a tour agent',
        ],
      },
      {
        heading: 'When to ride — morning, sunset or full moon',
        paragraphs: [
          'The sunset trek is the classic choice because the light is warm and the dunes cast long shadows. The sunrise ride is quieter, cooler and often the most photogenic moment of the trip. A full-moon night between the two is spectacular, though a new moon is actually better for stargazing because the sky is darker.',
          'In summer the sand can be very hot, so most guides prefer the first hours of the morning or the late afternoon. Around midday the heat keeps most people off the open dunes.',
        ],
      },
      {
        heading: 'What to wear and what to bring',
        paragraphs: [
          'Comfort beats fashion on a camel trek. Loose, breathable layers protect you from both sun and the cool desert evening, and closed, comfortable shoes make mounting and dismounting easier. Sun protection — a hat, sunglasses and high-factor sunscreen — matters even in winter because the light is strong. A light scarf or shawl is useful against wind and dust.',
          'Bring only a small overnight bag (many trips carry the main luggage separately), plus water and your camera. Leave valuables behind. Nights in the desert are cold in winter, so pack a warm layer even if the day was hot.',
        ],
        bullets: [
          'Loose layers + a warm layer for the evening',
          'Comfortable closed shoes',
          'Hat, sunglasses and sunscreen',
          'Water and a small bag; camera at hand',
        ],
      },
      {
        heading: 'How to mount, dismount and ride comfortably',
        paragraphs: [
          'The camel kneels to let you mount with the help of the cameleer. Hold on, lean back slightly as it stands, and let your body go with the gentle rocking motion — stiff legs tire quickly. Follow your cameleer’s instructions and never stand directly behind an animal without warning it.',
          'If you are unsure about mobility, tell us before you book. We can arrange a shorter trek, a slower pace or, where appropriate, a 4x4 option into the dunes so everyone can still enjoy the sunset from the sand.',
        ],
      },
      {
        heading: 'Couples, families and older travellers',
        paragraphs: [
          'Camel trekking suits most visitors, but the motion, the mounting step and the time on the dunes are not for everyone. Families with children usually love it, and kids are often the most enthusiastic riders. For older travellers or anyone with a back, knee or balance concern, we can adjust the experience — a gentle short ride to the camp, or a 4x4 to a dune viewpoint instead of a long trek.',
          'Tell us honestly about your group when you request a quote and we will shape the day so the desert feels accessible, not intimidating.',
        ],
      },
    ],
    faqs: [
      { question: 'Is camel trekking safe for first-time riders?', answer: 'Yes. Dromedaries are calm and led by an experienced local cameleer. You are told exactly how to mount, dismount and sit. The main points are balance on the way up and listening to your guide.' },
      { question: 'How long is the camel trek to a desert camp?', answer: 'Typically about 50–70 minutes each way from the edge of Erg Chebbi near Merzouga to the camp, including photo stops. Shorter or longer routes can be arranged.' },
      { question: 'What should I wear on a sunset camel trek?', answer: 'Loose, breathable layers, comfortable closed shoes, a hat, sunglasses and sunscreen. Bring a warmer layer because desert nights get cold, especially in winter.' },
      { question: 'Can I bring my overnight luggage on the camel?', answer: 'Usually not the full bag. Most trips carry the main luggage separately by vehicle and you take only a small overnight bag on the trek.' },
      { question: 'What if I cannot ride a camel?', answer: 'We can arrange a shorter trek, a slower pace or a 4x4 route into the dunes so you can still enjoy sunset from the sand.' },
    ],
    tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape', '4-day-marrakech-merzouga-sahara'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['desert-camps', 'luxury-desert-camps', 'best-time-to-visit', 'things-to-do', 'how-many-days', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    inlineImages: [{ imageId: 'berber-camel-guide-sahara-merzouga', after: 0 }, { imageId: 'sahara-dune-trekking-merzouga', after: 2 }],
  },
  {
    kind: 'merzouga',
    slug: 'desert-camps',
    title: 'Merzouga Desert Camps — A Complete Guide',
    pageTitle: 'Merzouga Desert Camps — Standard & Luxury Camp Guide',
    description: "How to choose a desert camp in the Erg Chebbi dunes — standard versus luxury tents, what a night includes, bathrooms, meals, heating and how to book the right one.",
    ogImage: '/images/curated/sahara-desert-camp-starry-night-lantern-merzouga.webp',
    heroImage: '/images/curated/sahara-desert-camp-starry-night-lantern-merzouga.webp',
    heroAlt: 'A desert camp in the Sahara glowing with lanterns under a starry sky near Merzouga',
    intro: 'Sleeping inside the Erg Chebbi dunes is the highlight of a Merzouga trip. The main choice is between a simple Berber camp and a luxury tented camp — this guide compares them honestly so you pick the right night.',
    sections: [
      {
        heading: 'What a desert camp actually is',
        paragraphs: [
          'A desert camp is a small tented settlement tucked between the dunes, a 20-minute to hour-long camel ride from Merzouga village. You arrive on camel, watch the sunset, share a three-course Moroccan dinner, listen to Berber drumming around the fire and sleep under an extraordinary number of stars. In the morning you ride back out over the dunes as the sun rises.',
          'All reputable camps share this same rhythm. What differs — sometimes by a lot — is the tent, the bed, the bathroom and the level of comfort between you and the sand.',
        ],
      },
      {
        heading: 'Standard Berber camps',
        paragraphs: [
          'Standard camps are the classic desert experience: simple mattresses on platform beds, blankets and shared bathroom facilities. The tents are functional and cosy; the magic is the fire, the food and the sky rather than the fixtures. This is what most travellers picture when they imagine sleeping in the Sahara, and it suits those who want an authentic night without paying for luxury.',
        ],
      },
      {
        heading: 'Luxury desert camps',
        paragraphs: [
          'Luxury camps keep the same dunes and the same evening rhythm while upgrading the fixtures — larger tents, proper beds, soft linens, rugs and en-suite bathrooms with flushing toilets and warm showers. Some have heating for cold winter nights. For honeymooners, anyone who values comfort, or travellers who want the enchantment without the rough edges, luxury is often the better fit.',
        ],
      },
      {
        heading: 'How to decide between standard and luxury',
        paragraphs: [
          'Ask three questions. Will you mind walking to a shared bathroom at night? Do you need a guaranteed warm shower and private loo? Is comfort a priority over budget? If privacy and comfort matter, choose luxury. If you want the communal camp vibe and are happy with a shared bathroom, a standard camp gives you the same dunes for less.',
        ],
      },
      {
        heading: 'What a night in a camp includes',
        paragraphs: [
          'A typical night includes the camel trek each way, a three-course Moroccan dinner, a simple breakfast and often Berber music around the fire. Stargazing is free — there is almost no light pollution out on Erg Chebbi. Confirm the exact inclusions when you book, because they vary by camp.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between a standard and a luxury desert camp?', answer: 'The main difference is comfort — luxury camps have real beds, quality bedding and en-suite bathrooms with hot showers, while standard camps use platform beds with shared bathroom facilities. Both share the same dunes and evening programme.' },
      { question: 'Do luxury camps have hot showers and private bathrooms?', answer: 'Yes. Most luxury desert camps near Merzouga offer en-suite tents with a flushing toilet and heated shower.' },
      { question: 'Is the shower water really hot?', answer: 'In most luxury camps, yes — they run heated showers. In basic standard camps you may only have a simple cold wash, so plan accordingly.' },
      { question: 'Are nights in desert camps cold?', answer: 'Very likely, especially October–March when desert nights can approach freezing. Luxury tents usually include heating or extra blankets; in any camp, bring a warm layer.' },
      { question: 'Are meals and the camel trek included with a camp night?', answer: 'Usually yes — dinner, breakfast and the camel trek in and out are typically part of the package. Confirm the exact inclusions when you book.' },
    ],
    tours: ['3-day-sahara-marrakech', 'honeymoon-morocco', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['luxury-desert-camps', 'camel-trekking', 'best-time-to-visit', 'things-to-do', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    inlineImages: [{ imageId: 'sahara-bivouac-stars-merzouga', after: 0 }],
  },
  {
    kind: 'merzouga',
    slug: 'luxury-desert-camps',
    title: 'Luxury Desert Camps in Merzouga — What You Really Get',
    pageTitle: 'Luxury Desert Camps Merzouga — Sahara Glamping Guide',
    description: "A realistic look at luxury Sahara camps near Merzouga — en-suite tents, real beds, hot showers, private dinner and what separates luxury from standard glamping.",
    ogImage: '/images/personal/luxury-camp-dusk.webp',
    heroImage: '/images/personal/luxury-camp-dusk.webp',
    heroAlt: 'A luxury desert camp tent glowing warm in the dusk light among the dunes near Merzouga',
    intro: 'Luxury desert camps near Merzouga let you sleep inside the Erg Chebbi dunes without giving up a proper bed or a hot shower. Here is what the step up to luxury actually includes.',
    sections: [
      {
        heading: 'What makes a camp luxury',
        paragraphs: [
          'A luxury tent in Erg Chebbi is still a tented camp — you ride in on camel, dine under the stars and sleep on the sand. The difference is the fixtures: a solid bed with quality sheets, rugs and lamps, an en-suite bathroom with a flushing toilet and a warm shower, and often a private terrace or heating for cold nights.',
          'The dunes, the sunset, the drumming and the stargazing are identical to a standard camp. Luxury changes how comfortably you experience them, not the desert itself.',
        ],
      },
      {
        heading: 'The en-suite bathroom question',
        paragraphs: [
          'This is the detail that most separates luxury camps from standard ones. In a luxury tent you usually have a private, enclosed bathroom with hot water plumbed to the tent. In a standard camp you share facilities a short walk away. If a private, warm shower matters to you, luxury is the meaningful upgrade.',
        ],
      },
      {
        heading: 'Dinner, fire and the desert night',
        paragraphs: [
          'Luxury camps typically serve the same generous three-course Moroccan dinner as other camps, but often in a fuller dining setup with more choice. After dinner, drums and call-and-response Berber songs carry on around the fire, and the night sky over Erg Chebbi is a show of its own. In winter, camps light heaters and add blankets so the cold evening stays comfortable.',
        ],
      },
      {
        heading: 'Who luxury desert camps suit best',
        paragraphs: [
          'Luxury suits honeymooners, couples celebrating something, older travellers who want comfort and anyone who wants the romance of the Sahara without roughing it. If your priority is privacy, a warm shower and a genuinely comfortable bed, the extra cost is usually well spent for one unforgettable night.',
        ],
      },
    ],
    faqs: [
      { question: 'Do luxury desert camps really have hot showers?', answer: 'In most cases, yes — luxury camps near Merzouga plumb warm water to an en-suite bathroom in the tent. It is worth confirming when you book, as facilities vary between camps.' },
      { question: 'What is the bed like in a luxury Sahara camp?', answer: 'Luxury tents typically have a proper bed on a frame with quality sheets, blankets and pillows rather than a simple mattress on the floor or platform.' },
      { question: 'Are luxury desert camps expensive?', answer: 'They cost more than a standard camp but far less than you might expect for a full evening of camel, dinner, music and an en-suite tent. We quote exact prices for your dates when you request a journey.' },
      { question: 'Is a luxury camp worth it for one night?', answer: 'For many travellers, yes — one night is exactly the right length for a desert stay, and luxury makes that single night genuinely comfortable and memorable.' },
      { question: 'Do we still ride camels to a luxury camp?', answer: 'Yes. Most luxury camps are reached the same way — by camel at sunset and by camel again after sunrise — so you get both the glamping comfort and the classic trek.' },
    ],
    tours: ['honeymoon-morocco', '3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['desert-camps', 'camel-trekking', 'best-time-to-visit', 'things-to-do', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    inlineImages: [{ imageId: 'luxury-desert-camp-sunset-merzouga', after: 0 }],
  },
  {
    kind: 'merzouga',
    slug: 'best-time-to-visit',
    title: 'Best Time to Visit Merzouga — Month-by-Month Guide',
    pageTitle: 'Best Time to Visit Merzouga — When to See the Sahara (2026)',
    description: "Month-by-month when to visit Merzouga and Erg Chebbi — temperatures, crowds, sandstorms and the sweet spots for a Sahara desert night.",
    ogImage: '/images/dest/merzouga.webp',
    heroImage: '/images/dest/merzouga.webp',
    heroAlt: 'Early morning light on the Erg Chebbi dunes near Merzouga village',
    intro: 'The desert around Merzouga is open year round, but it is only truly comfortable to visit during the cooler months. Here is when each season feels like, so you can time your Sahara night right.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'The best months for Merzouga are roughly October to April, when days are warm-to-mild and nights are cool. Summer (June to August) brings extreme daytime heat that makes the dunes and camel trekking unpleasant; winter (December to February) is ideal for comfortable days but cold nights.',
          'For stargazing the whole year works, but for trekking and sleeping in a camp, Oct–Apr is the answer most local guides recommend.',
        ],
      },
      {
        heading: 'Spring shoulder (March–May)',
        paragraphs: [
          'Days warm quickly and wild almond and tamarisk bloom along the Ziz Valley. Nights are still cool enough for a campfire. Mid-afternoon sun is already strong, so camel treks are best early or late in the day. This is a popular window with European visitors, so book ahead.',
        ],
      },
      {
        heading: 'Summer (June–August) — avoid for trekking',
        paragraphs: [
          'Daytime temperatures on the dunes regularly exceed 40 °C (104 °F), sometimes higher. Most tours cancel midday activity, and even sunset camel treks can feel exhausting until the light fades. Overnight stays in a camp are possible but hot before dawn. We only recommend summer for travellers with a specific reason to visit and a high heat tolerance — and even then we adjust departure times and tent positions.',
        ],
      },
      {
        heading: 'Autumn shoulder (September–November)',
        paragraphs: [
          'September is the bridge month: the extreme heat breaks, but the desert is still very warm. By October the days are perfect and the nights need just a light layer. November edges toward winter, with cooler mornings. October and April are the busiest months for a reason — they are also the best balance of warm days and cool nights.',
        ],
      },
      {
        heading: 'Winter (December–February)',
        paragraphs: [
          'Days are mild and perfect for walking the dunes; nights get genuinely cold and can approach or dip below freezing on the open sand. Luxury camps add heating and thick blankets. The sky is clear and still, which makes for excellent stargazing. This is our favourite season for Merzouga.',
        ],
      },
      {
        heading: 'Ramadan'
        , paragraphs: [
          'Ramadan shifts the calendar each year. During daylight hours fewer cafes open and energy can feel quieter in town, though desert camps still serve their full evening programme after sunset. It does not stop tours, but ask if you need anything specific about timings and dining.',
        ],
      },
      {
        heading: 'Merzouga month by month',
        paragraphs: [
          'A qualitative picture of the year on the dunes — daytime feel, night-time cold, and what it means for trekking and camp nights. Exact temperatures vary year to year, so read these as tendencies, not forecasts.',
        ],
        bullets: [
          'January — Coldest nights, often near freezing on the open sand; crisp, clear days with superb light. Warm layers are essential after sunset.',
          'February — Nights still cold; afternoons turn milder. Almond blossom begins in the valleys on the route in. Excellent walking weather.',
          'March — Days warm up properly while nights stay cool. Windy spells are possible. One of the finest months for camel trekking.',
          'April — Warm days, cool nights, long light — a peak month for good reason. Camps fill up, so book ahead.',
          'May — Midday heat arrives; mornings and evenings stay pleasant. Treks shift to early or late in the day.',
          'June — The heat builds fast and midday dune activity stops. Only morning and sunset hours are comfortable.',
          'July — The hottest month: the dunes are fierce by day and camps adjust schedules around the heat. Only for travellers with high heat tolerance.',
          'August — Still extremely hot, easing only slightly late in the month. Sunrise treks and shaded midday rest are the rhythm.',
          'September — The extreme heat gradually breaks but the desert stays very warm. A quieter window before the autumn peak.',
          'October — The ideal balance returns: warm days, nights needing just a light layer. Busy — book ahead.',
          'November — Cooler mornings, mild days, clear still skies. Superb stargazing and comfortable trekking.',
          'December — Mild sunny days, nights that can dip near freezing. Luxury camps add heating and thick blankets; pack a warm layer regardless.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Merzouga good to visit in summer?', answer: 'Not for dune activity — daytime heat regularly exceeds 40 °C and camel trekking becomes unpleasant. Summer is only worth it if you have a specific reason to travel then and can tolerate sustained heat.' },
      { question: 'When is the best time for camel trekking in Merzouga?', answer: 'October to April, starting roughly one hour before sunset or at sunrise. The sand is comfortable and the light is best during those hours.' },
      { question: 'Are desert nights really cold in winter?', answer: 'Yes. In December–February nighttime temperatures on the open dunes can approach 0 °C. Luxury camps provide heating or extra blankets, but pack a warm layer regardless.' },
      { question: 'Does Ramadan affect tours in Merzouga?', answer: 'Tours still run normally, though some town services open later. Evening activities including the camp dinner and drumming are unaffected.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['desert-camps', 'luxury-desert-camps', 'camel-trekking', 'what-to-pack', 'things-to-do', 'how-many-days', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
  },
  {
    kind: 'merzouga',
    slug: 'how-to-get-there',
    title: 'How to Get to Merzouga — From Marrakech, Fes and Beyond',
    pageTitle: 'How to Get to Merzouga — Travel to Erg Chebbi from Marrakech & Fes',
    description: "How to reach Merzouga and Erg Chebbi — realistic driving times and public/bus options from Marrakech, Fes, Ouarzazate and Agadir.",
    ogImage: '/images/dest/erg-chebbi.webp',
    heroImage: '/images/dest/erg-chebbi.webp',
    heroAlt: 'The approach road climbing toward the Erg Chebbi dunes from Merzouga village',
    intro: 'Merzouga sits at the far eastern edge of Morocco, on the road to Errachidia and the Algerian border. Most visitors arrive by road from the main imperial cities — here are the realistic travel times and transport options.',
    sections: [
      {
        heading: 'From Marrakech',
        paragraphs: [
          'The drive from Marrakech to Merzouga is around 9–10 hours of driving without long stops — roughly 560 km. The route crosses the High Atlas over Tizi n’Tichka, drops through Ouarzazate and Aït Ben Haddou, runs the length of the Dades Valley and Todra Gorge, then follows the Ziz Valley past Errachidia and Midelt to Merzouga. Nearly every overnight stop on this route is worth a break.',
          'Most travellers do this as the first day of a multi-day tour, stopping at Aït Ben Haddou and one of the Dades/Todra gorges overnight.',
        ],
      },
      {
        heading: 'From Fes',
        paragraphs: [
          'From Fes to Merzouga is about 7–8 hours of driving — roughly 550 km. The road heads southeast through the Middle Atlas, past Ifrane (the cedar-forest town), then continues through Midelt and along the Ziz Valley — the palm-lined route the Moroccan National Tourist Office describes as the Fes–Errachidia–Midelt–Merzouga connection. The drive is more direct than the Marrakech route and the scenery opens from cedar forest to desert oasis.',
          'In winter this road can be affected by fog at higher altitudes in the Middle Atlas, so a private driver or tour is generally more reliable than public transport.',
        ],
      },
      {
        heading: 'From Ouarzazate',
        paragraphs: [
          'Ouarzazate to Merzouga is about 3–3.5 hours — roughly 230 km — via the Draa Valley and Tinzouline. It is a pleasant, mostly straightforward drive and a common leg on a southern Morocco loop.',
        ],
      },
      {
        heading: 'From Agadir',
        paragraphs: [
          'Agadir to Merzouga is around 6–7 hours of driving — roughly 500 km — crossing from the Atlantic to the desert via the Anti-Atlas and the Draa Valley. It is a long day behind the wheel, so plan an overnight stop.',
        ],
      },
      {
        heading: 'Public transport and self-drive',
        paragraphs: [
          'There is no direct passenger rail to Merzouga. The realistic public options are grand taxis and buses from Fes, Ouarzazate and Errachidia; services are infrequent and connections take longer than driving. A private driver or a private tour from your arrival city is by far the most comfortable and reliable way, and it lets you stop at Aït Ben Haddou or the Dades Valley without rushing.',
          'Self-drive is possible and the main N9/N13 roads are in reasonable condition, but fuel, navigation and long desert stretches mean a local driver is usually worth the flexibility and peace of mind.',
        ],
      },
    ],
    faqs: [
      { question: 'How long is the drive from Marrakech to Merzouga?', answer: 'About 9–10 hours of driving (560 km) without long stops. Most people do it as day one of a tour, stopping at Aït Ben Haddou and the Dades/Todra gorges overnight.' },
      { question: 'How long is the drive from Fes to Merzouga?', answer: 'About 7–8 hours (550 km), via the Middle Atlas, Ifrane, Midelt and the Ziz Valley. It is the more direct desert approach.' },
      { question: 'Does the train go to Merzouga?', answer: 'No direct passenger service. The closest rail access is at Ouarzazate or Fes; from there you continue by road (grand taxi/bus or private transfer).' },
      { question: 'Is the road to Merzouga paved and safe?', answer: 'The main N9/N13 are paved and driveable, though the last section across the gravel plain near the dunes is unsealed and fine for a standard hire car with care.' },
      { question: 'Can I get to Merzouga by bus?', answer: 'Yes, but infrequently and slower than the drive. Grand taxis run from Fes, Ouarzazate and Errachidia, with connections into Merzouga depending on the season and demand.' },
    ],
    tours: ['3-day-sahara-marrakech', '3-day-sahara-fes', '5-day-great-south-morocco'],
    destinations: ['merzouga', 'erg-chebbi', 'ait-ben-haddou', 'dades-valley', 'todra-gorge', 'ifrane'],
    relatedGuides: ['camel-trekking', 'best-time-to-visit', 'what-to-pack', 'things-to-do', 'marrakech-to-merzouga', 'fes-to-merzouga'],
  },
  {
    kind: 'merzouga',
    slug: 'erg-chebbi',
    title: 'Erg Chebbi — Morocco’s Tallest Sand Dunes',
    pageTitle: 'Erg Chebbi Dunes Merzouga — Sahara Desert Guide',
    description: "About Erg Chebbi near Merzouga — how the dune field formed, how high and long it is, what to do on the dunes and why it is the main Sahara access point.",
    ogImage: '/images/dest/erg-chebbi.webp',
    heroImage: '/images/dest/erg-chebbi.webp',
    heroAlt: 'The vast Erg Chebbi dune field rising to a high crest near Merzouga',
    intro: 'Erg Chebbi is the Saharan dune field that makes Merzouga the most accessible place in Morocco to stand on top of a sea of sand. This is what makes it distinctive and why it draws visitors year after year.',
    sections: [
      {
        heading: 'What Erg Chebbi is',
        paragraphs: [
          'Erg Chebbi is a dry, active sand sea roughly 28 km long and 9 km wide at its broadest point, just west of Merzouga. Its dunes climb to about 150 m at the highest crest — the tallest free-standing dunes in Morocco. The name means “the place of the sand” and the whole system is fed by wind blowing across a gravel plain that spreads out from the village.',
          'Unlike the small dunes around many Sahara gateways, the Erg Chebbi crests are large enough to walk and climb, and they are accessible without a 4x4 from the main valley road — which is why most Morocco Sahara tours end up here.',
        ],
      },
      {
        heading: 'How the dunes formed',
        paragraphs: [
          'Erg Chebbi exists because of the local climate and geology: the High Plateaus to the north and the Anti-Atlas foothills to the south channel prevailing winds toward the dunes, and the surrounding gravel plain supplies the sand. It is a living erg — the dunes shift slowly with each season, so the exact crests change, but the high ridges near Merzouga have stayed in place for decades.',
        ],
      },
      {
        heading: 'What to actually do on the dunes',
        paragraphs: [
          'Walk or climb a dune for sunrise, when the sand is cool and the shadows reach longest. Ride a camel along a dune ridge at sunset, when the whole field turns amber. Stay overnight in a camp tucked between the dunes for dinner by fire and stargazing, because there is virtually no light pollution out on the sand.',
          'Other common experiences are sandboarding and short 4x4 trips that climb the highest crests for photographs. The dunes also make the best sunrises and sunsets in Morocco, and the night sky here is some of the clearest in the country.',
        ],
      },
      {
        heading: 'Other Erg Chebbi practical notes',
        paragraphs: [
          'The dunes are public land and free to walk, though reaching the best viewpoints may require a short shared-taxi ride or a 4x4 from Merzouga. Wear closed shoes because hot sand burns in summer. Bring water, sun protection and a light layer for after sunset. Nights on the dunes are cool even in summer.',
          'Most visitors reach Erg Chebbi as part of a Merzouga tour; if you are driving yourself, a small off-road-capable vehicle makes it easier to access the highest crests, but a standard car reaches the main viewpoints.',
        ],
      },
      {
        heading: 'Sunrise and sunset on the dunes',
        paragraphs: [
          'Sunset is the social hour: the western faces of the erg turn from gold to deep red while camel lines trace the ridges below. Sunrise is the connoisseur\u2019s choice — the sand is cool underfoot, the village is still asleep, and the shadows on the eastern slopes run long and blue. Neither costs anything: walk up from Merzouga in under an hour, or time a camel trek or 4x4 outing to finish on a crest.',
          'For photographers, the hour after sunrise beats the sunset rush — fewer footprints, softer contrast and the dune field to yourself.',
        ],
      },
      {
        heading: 'How long you need on Erg Chebbi',
        paragraphs: [
          'One night on the dunes gives you the classic sequence — sunset camel trek, camp dinner, sunrise ride back. Two nights let you add the wider country around the erg by 4x4 or quad, visit Khamlia for Gnawa music, and keep the midday heat free. Anything beyond two days in Merzouga itself is for slow travellers; the Sahara rewards depth, but the rest of southern Morocco is close and worth the miles.',
        ],
      },
    ],
    faqs: [
      { question: 'How high are the Erg Chebbi dunes?', answer: 'The dunes reach about 150 m at their highest crests — the tallest in Morocco. The field is roughly 28 km long and up to 9 km wide.' },
      { question: 'Is Erg Chebbi the Sahara desert?', answer: 'Erg Chebbi is a large dune field inside the Sahara, the part visitors experience from Merzouga. The Sahara itself is continent-wide; Erg Chebbi is its most accessible corner in Morocco.' },
      { question: 'Can you visit Erg Chebbi independently?', answer: 'Yes. The dunes are public land. Most people reach them on foot, by shared taxi or on a short camel trek from Merzouga village.' },
      { question: 'When is the best light for photos at Erg Chebbi?', answer: 'Sunrise and sunset. The dunes turn gold and then orange as the sun rises or sets, and the long shadows give the crests strong shape.' },
    ],
    tours: ['3-day-sahara-marrakech', '2-day-zagora-desert-marrakech', '4-day-marrakech-merzouga-sahara'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['camel-trekking', 'desert-camps', 'best-time-to-visit', 'things-to-do', '4x4-desert-tour', 'quad-biking', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    sources: ['onmt-merzouga-region'],
  },
  {
    kind: 'merzouga',
    slug: 'what-to-pack',
    title: 'What to Pack for Merzouga — Desert Packing List',
    pageTitle: 'What to Pack for Merzouga Desert — Sahara Packing List',
    description: "A practical packing list for Merzouga and Erg Chebbi — layers, sun protection, footwear, camera gear and small luxuries for a desert night.",
    ogImage: '/images/hero/desert-pano.webp',
    heroImage: '/images/hero/desert-pano.webp',
    heroAlt: 'Panoramic view over the Erg Chebbi dunes under a bright sky',
    intro: 'Pack for two climates in one day: hot sun on the dunes and a cool (sometimes cold) desert night. Here is a realistic list, not a tourist cliché.',
    sections: [
      {
        heading: 'Clothing — layers are essential',
        paragraphs: [
          'Two-layer thinking: a breathable top and loose trousers for the day, plus a warmer layer for the evening and night. Desert cotton or linen works; avoid denim in the heat.',
          'A pair of thermals or a fleece is the single most useful item after sunset, especially October to March when desert nights drop well below comfort. Pack a hat for sun and, if you burn easily, long sleeves.',
        ],
        bullets: [
          'Breathable long-sleeve shirt + loose trousers',
          'Warm fleece or light down/sweater for the night',
          'Sun hat + a warmer hat for the evening',
        ],
      },
      {
        heading: 'Footwear and sun protection',
        paragraphs: [
          'Closed, comfortable shoes are better than sandals on hot sand and when climbing dunes. A pair of hiking shoes with grip helps on loose sand. Sunglasses and high-factor sunscreen matter even when it feels cool.',
        ],
        bullets: [
          'Closed hiking/sand shoes',
          'Sunglasses (wrap-around is good against dust)',
          'SPF 30+ and lip balm',
        ],
      },
      {
        heading: 'Camera and small luxuries',
        paragraphs: [
          'Bring a small day pack, a reusable water bottle and a power bank. For stargazing and sunrise, a headlamp or small flashlight is useful because camps turn lights off after midnight. A scarf protects against dust on the drive to the dunes.',
          'Most travellers overpack camera gear — a phone and one lightweight lens cover most moments. What you will actually value is a warm layer and a charged battery.',
        ],
      },
      {
        heading: 'What NOT to pack',
        paragraphs: [
          'Heavy luggage: if you are on a tour your main bags usually stay in the vehicle and you only carry a small overnight bag onto the dunes. Expensive jewellery, unnecessary valuables, and too many clothes — keep it simple. Also avoid anything that depends on a power outlet during the trek, since you will be away from the vehicle for the camp night. A headlamp and power bank are safer bets.',
        ],
      },
    ],
    faqs: [
      { question: 'What should I wear on a camel trek at sunset?', answer: 'Loose layers, a hat, sunglasses and sunscreen, plus a warmer layer for after the sun goes down. Comfortable closed shoes are easier for mounting than sandals.' },
      { question: 'Do I need a sleeping bag for the desert?', answer: 'Not usually — camps provide blankets and mattresses. A sleeping bag is overkill unless you are very cold-sensitive; a warm layer inside a sleeping bag liner is the lighter alternative.' },
      { question: 'How much luggage can I bring on the camel?', answer: 'Only a small overnight bag. Main luggage normally stays with the vehicle and is transferred separately, so pack the essentials for the night separately.' },
      { question: 'Is a scarf useful in the desert?', answer: 'Yes — against sun, dust and a sudden evening breeze on the dunes.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', 'family-morocco-adventure'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['camel-trekking', 'best-time-to-visit', 'desert-camps', 'things-to-do'],
  },
  {
    kind: 'merzouga',
    slug: 'faq',
    title: 'Merzouga FAQ — Sahara Questions Answered',
    pageTitle: 'Merzouga FAQ — Sahara Desert Questions Answered',
    description: "Practical answers to the most common questions about Merzouga and Erg Chebbi — when to go, how to get there, camps, camel treks and what to expect.",
    ogImage: '/images/dest/merzouga.webp',
    heroImage: '/images/dest/merzouga.webp',
    heroAlt: 'Merzouga village with the Erg Chebbi dunes rising behind it',
    intro: 'Straight answers to the questions travellers actually ask before a Merzouga and Sahara trip, gathered from our experience guiding the dunes.',
    sections: [
      {
        heading: 'Planning and booking',
        paragraphs: [
          'Most visitors reach Merzouga as part of a tour from Marrakech or Fes rather than on their own. We confirm exact inclusions, pickup, meals and accommodation before any payment, so there are never surprises at the dunes. Ask a few days ahead in peak season (October–November and February–April) for the smoother experience.',
        ],
      },
      {
        heading: 'Getting to Merzouga',
        paragraphs: [
          'The realistic approach is a private transfer or a tour, because the last section is across an open gravel plain and public transport to the dunes is limited. See our guide on how to get to Merzouga for realistic timings from each major city.',
        ],
      },
      {
        heading: 'What a night in the dunes is really like',
        paragraphs: [
          'You reach the camp on camel, watch the sun set from a dune, share a three-course dinner and a fire with Berber music, then sleep under one of the clearest skies in Morocco. The next morning you ride back out for sunrise before continuing your journey. Comfort depends on the camp type; we describe standard vs luxury honestly.',
        ],
      },
    ],
    faqs: [
      { question: 'How many days do you need in Merzouga?', answer: 'Two full days is the sensible minimum — one night in a camp and one sunrise ride — and three days if you also want to see nearby Dades Valley or Todra Gorge. One day is only enough for a long drive past the dunes.' },
      { question: 'What is the difference between Merzouga and Zagora?', answer: 'Merzouga gives access to Erg Chebbi, with dramatic dunes close to the village and the classic camel trek. Zagora is further south along the Draa Valley and is quieter, with a different desert character. See our Merzouga vs Zagora comparison for detail.' },
      { question: 'Can you go to Merzouga on a day trip from Marrakech?', answer: 'Not really — it is an 8–10 hour drive each way. Merzouga belongs to a two-night minimum itinerary so the dunes and a camp night are not rushed.' },
      { question: 'Do I need to book a desert camp in advance?', answer: 'In peak season, yes — the better camps and tours sell out days ahead. We recommend locking in your Merzouga night before you travel.' },
      { question: 'Is the Sahara very hot?', answer: 'It depends on the season. In summer the days are extreme, and we adjust activity to morning and evening. October to April is comfortable, with cool nights that need a warm layer.' },
      { question: 'Do women travel to Merzouga safely?', answer: 'Yes. The desert areas around Merzouga are peaceful and tourist-friendly; many of our groups are families and couples. We can advise on dress and behaviour so you feel comfortable and respectful.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '3-day-sahara-fes'],
    destinations: ['merzouga', 'erg-chebbi', 'zagora', 'todra-gorge'],
    relatedGuides: ['camel-trekking', 'desert-camps', 'how-to-get-there', 'best-time-to-visit', 'things-to-do', 'how-many-days'],
  },
  {
    kind: 'merzouga',
    slug: 'quad-biking',
    title: 'Quad Biking in Merzouga — Riding the Edge of Erg Chebbi',
    pageTitle: 'Quad Biking Merzouga — Sahara Quad Bike Tours at Erg Chebbi',
    description: "What quad biking in Merzouga is really like — the terrain around Erg Chebbi, what to wear, when to ride and how a quad session fits around camel trekking and a night in a desert camp.",
    ogImage: '/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp',
    heroImage: '/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp',
    heroAlt: 'Rider silhouette on a dune at sunset in the Sahara near Merzouga',
    intro: 'A quad bike lets you cover in an hour what takes a camel a full evening: the gravel flats, palm groves, dry lakes and the base of the great Erg Chebbi dunes around Merzouga. This guide explains the terrain, what a ride involves and how to prepare.',
    sections: [
      { heading: 'What quad biking in Merzouga is like', paragraphs: [
        'Quad biking around Merzouga is not dune-climbing on a machine — it is riding the varied country that surrounds the Erg Chebbi sand sea. You move across hard-packed gravel plains (called regs), through dusty palm groves, past nomad encampments and along the foot of the dunes, where the sand is firm enough to ride but soft enough to feel the terrain change under the wheels.',
        'The rhythm is simple: a short safety briefing, a practice loop near the village until everyone is comfortable with the throttle and brakes, then a guided run into the desert with the guide choosing the line. It feels adventurous without being technically demanding — most first-time riders are relaxed within ten minutes.',
      ] },
      { heading: 'The terrain around Erg Chebbi', paragraphs: [
        'The Merzouga area packs several very different landscapes into a small radius. West and south of the village are flat stony regs where you can ride fast and safely in a straight line. North of the dunes you cross the Dayet Srji, a seasonal salt lake that fills with water — and flamingos — after wet winters. Around Khamlia and the black-volcanic hills of Jerfoulf you ride gravel tracks between tiny Berber settlements.',
        'Right at the edge of Erg Chebbi the sand becomes softer and riding gets slower and rougher; this is the dramatic part, with 150-metre dunes towering over the track. Deep dune climbing on a quad is not part of a standard guided ride — the dunes are reserved for camels, on foot, and for the 4x4s that know the safe lines.',
      ] },
      { heading: 'What to expect from a typical session', paragraphs: [
        'A guided quad outing around Merzouga is usually measured in hours rather than days. You are given a helmet, shown how the machine works, and ride in a small group behind a local guide who knows where the flat ground, the photo stops and the soft patches are. Sessions are commonly scheduled for early morning or the couple of hours before sunset, when temperatures are pleasant and the light is at its best.',
        'Exact duration, route and group size vary by operator and season — we confirm the details for your dates when you enquire, and we only work with licensed local operators who maintain their machines and brief riders properly.',
      ] },
      { heading: 'Safety and practical considerations', paragraphs: [
        'Quads are straightforward but not toys. Listen to the briefing, keep a sensible gap from the rider in front, and do not race the guide — the desert is bigger than your throttle. Dust is constant, so sunglasses or goggles, a scarf or bandana for your face, and closed shoes matter more than you expect.',
        'Riders should be reasonably fit and comfortable controlling a vehicle; the machines have real weight and the terrain can be bumpy. Not sure it suits someone in your group? A pillion seat on the guide-driven option or a 4x4 desert drive is the calmer alternative with the same scenery.',
      ] },
      { heading: 'What to wear', paragraphs: [
        'Long trousers and closed shoes are non-negotiable — the exhaust and the sand both punish bare skin. A light long-sleeve shirt protects from sun and dust, and in summer a breathable layer beats a heavy jacket. Bring sunglasses, a scarf, sunscreen and water; a small backpack is fine, but keep it snug so it does not bounce around.',
        'In winter (November to February) mornings are genuinely cold — bring a fleece you can stash when the day warms up. After sunset, even in spring and autumn, you will want a warm layer.',
      ] },
      { heading: 'Best time of day to ride', paragraphs: [
        'Two windows stand out. Early morning offers cool air, empty desert and hard, predictable ground. The late-afternoon slot is the favourite for most travellers: you ride as the heat breaks, finish at the edge of the dunes in golden light, and can hand the quad straight back before walking to a sunset camel trek or heading to camp.',
      ] },
      { heading: 'Who quad biking suits', paragraphs: [
        'Quads are popular with couples wanting an active afternoon, with groups of friends, and with teenagers old enough to ride their own machine — families often split between quads and a support vehicle. If your priority is silence, starlight and the slow desert pace, the camel trek and a night in camp remain the heart of the trip; the quad is the high-energy counterpoint, not a replacement.',
      ] },
      { heading: 'How it fits with camel trekking and your camp night', paragraphs: [
        'The classic Merzouga day combines both worlds: quad in the late afternoon across the regs and nomad tracks, return to the village, then mount a camel at the dune line for the sunset climb to camp, dinner under the stars and a sunrise ride back. Because the two activities start and finish at different points around the village, they slot together naturally — tell us your dates and we sequence the day so you are never doubling back.',
      ] },
    ],
    faqs: [
      { question: 'Do I need experience to ride a quad in Merzouga?', answer: 'No. You get a briefing and a practice loop before leaving the village, and you ride behind a local guide who sets the pace. If you can ride a scooter or drive a car with gears, you will be fine.' },
      { question: 'Can children ride quads?', answer: 'Age minimums are set by the operator and depend on the machine size; younger children usually ride as passengers with a parent or the guide. Tell us the ages in your group and we will match the right setup.' },
      { question: 'Can quads climb the Erg Chebbi dunes?', answer: 'Standard guided rides stay on the firm ground around the dune field rather than climbing the tall crests. The dunes themselves are best experienced on foot or by camel — and driven safely only by the 4x4 drivers who know the lines.' },
      { question: 'Is quad biking included in your tours?', answer: 'It can be added to most itineraries that include a full day in Merzouga — such as the 3-day Sahara tour from Marrakech or the 4-day Marrakech–Merzouga route. Ask us and we build it into your day.' },
      { question: 'What happens if the sand is too soft or someone struggles?', answer: 'The guide chooses the route around soft patches, and any rider who is not comfortable can stop and continue by vehicle. Nobody is ever left to figure out the desert alone.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '3-day-sahara-fes'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['camel-trekking', '4x4-desert-tour', 'things-to-do', 'luxury-desert-camps', 'sahara-desert-guide'],
    sources: ['onmt'],
    inlineImages: [{ imageId: 'sahara-dune-trekking-merzouga', after: 1 }],
  },
  {
    kind: 'merzouga',
    slug: '4x4-desert-tour',
    title: 'Merzouga 4x4 Desert Tour — Dune Driving Around Erg Chebbi',
    pageTitle: 'Merzouga 4x4 Desert Tour — Dune Driving at Erg Chebbi',
    description: "What a 4x4 desert tour around Merzouga and Erg Chebbi involves — dune driving, the desert landscapes beyond the village, cultural stops and practical expectations before you book.",
    ogImage: '/images/dest/erg-chebbi.webp',
    heroImage: '/images/dest/erg-chebbi.webp',
    heroAlt: 'The Erg Chebbi dune field near Merzouga — classic 4x4 desert country',
    intro: 'A 4x4 is the only comfortable way to meet the Sahara on its own terms: over the crests of Erg Chebbi, out to the nomad settlements and the seasonal lake, and through the black-stone desert where the asphalt ends. Here is what a Merzouga 4x4 desert tour actually involves.',
    sections: [
      { heading: 'Why the desert needs a 4x4', paragraphs: [
        'The paved road ends at Merzouga village. Everything beyond it — the deep-sand corridors between the dunes, the stony hamada plain, the tracks to nomad families — is soft sand, gravel or rutted dirt. Regular cars stop at the viewpoints; a properly driven 4x4 with sand experience carries on into the middle of it.',
        'This is why the classic "tour of the dunes" around Merzouga has always been done by Land Rover-style 4x4s with local drivers who read the sand the way sailors read water: where the wind has firmed it, where a crest will pitch the nose down, where to deflate the tyres and where to keep momentum.',
      ] },
      { heading: 'Dune driving on Erg Chebbi', paragraphs: [
        'The signature part of any Merzouga 4x4 tour is driving onto the Erg Chebbi sand sea itself. Climbing a 150-metre dune from inside the vehicle feels steeper than any mountain road, then the crest breaks and the whole erg rolls out ahead of you. Drivers stop on the high ridges for photographs — the pattern of ripples and shadows changes by the hour.',
        'Good drivers never fight the sand: they pick lines between the crests, keep speed steady on the soft sections and avoid the steepest faces in the heat of the day. It is exciting without being reckless, which is exactly the balance you want with family on board.',
      ] },
      { heading: 'The landscapes beyond the dunes', paragraphs: [
        'The area around Merzouga is far more than sand. A half-day 4x4 loop typically takes in the Dayet Srji, a seasonal salt lake that draws flamingos after wet winters; the black volcanic stone desert of Jerfoulf, where films have been shot; fossil-rich ground where the Sahara was once a sea; and wide reg flats where you can stand with 360-degree horizon and hear nothing at all.',
        'Because distances are short, you can cross several of these worlds in an afternoon — dunes, lake bed, black stone and gravel — and still be back at the dune line for sunset.',
      ] },
      { heading: 'Cultural stops along the way', paragraphs: [
        'Where the itinerary allows, 4x4 tours around Merzouga pass through the small communities that live at the edge of the erg: Khamlia, known across Morocco for its Gnawa music, and the nomad families who still move with their herds across the plain. Visits are short and unhurried — a cup of mint tea, a little music, a conversation through your guide — and they are the reason many travellers call this drive the most memorable day of their Morocco trip.',
        'These stops depend on who is around on the day and how your guide knows the families; nothing is staged on demand. We keep it that way deliberately.',
      ] },
      { heading: 'Practical expectations: comfort, bumps and timing', paragraphs: [
        'Expect air-conditioning on the move, sand on the floor mats, and some jostling on soft sections — sit towards the middle if your back is sensitive. Half-day and full-day formats exist; whichever you choose, the best light for the dunes is early morning and the two hours before sunset, so well-planned tours build around those windows.',
        'Vehicles are typically older-generation 4x4s maintained by their drivers rather than fleet-new SUVs — that is part of the character. If you want a newer vehicle, say so when booking and we will match you accordingly.',
      ] },
      { heading: 'What to bring', paragraphs: [
        'Sun protection is the headline: sunscreen, sunglasses and a hat or scarf. Bring water, closed shoes for short walks on hot sand, and a warm layer for winter mornings and any stop after sunset. A camera with a charged battery — the light between dune crests is unlike anywhere else. A small bag is fine; leave hard suitcases at your riad or in the tour vehicle.',
      ] },
      { heading: 'Who a 4x4 desert tour suits', paragraphs: [
        'Almost everyone, which is its strength: families with young children, travellers who cannot or do not want to ride camels or quads, photographers chasing the big landscape, and older visitors who still want to stand on a 150-metre dune. It pairs naturally with a camel trek — drive the far country in the morning, ride the camel to camp in the late afternoon.',
      ] },
    ],
    faqs: [
      { question: 'Is the 4x4 tour safe for children?', answer: 'Yes — it is the most family-friendly way to reach the deep dunes, with seat belts and a professional driver. Very young children may need a booster; mention ages when booking.' },
      { question: 'Will we get stuck in the sand?', answer: 'Experienced drivers choose lines and tyre pressures that make getting stuck rare, and a second vehicle or shovel handles the occasional soft patch. It is part of the adventure, managed calmly.' },
      { question: 'How long does a Merzouga 4x4 tour take?', answer: 'Formats vary by operator and season — most visitors choose between a half-day dune-and-villages loop and a fuller day that adds Khamlia and the nomad area. We confirm exact timing for your dates when you enquire.' },
      { question: 'Can we combine the 4x4 tour with camel trekking and a night in camp?', answer: 'Yes, and it is the ideal combination: 4x4 in the morning or late afternoon, sunset camel trek to camp, dinner and stars, sunrise ride back. Tell us and we sequence the whole day.' },
      { question: 'Do we need to book in advance?', answer: 'In peak season (October to April), yes — vehicles and good drivers are limited. A few days ahead is usually enough outside the busiest weeks.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['camel-trekking', 'quad-biking', 'things-to-do', 'desert-camps', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    sources: ['onmt'],
    inlineImages: [{ imageId: 'luxury-desert-camp-sunset-merzouga', after: 4 }],
  },
  {
    kind: 'merzouga',
    slug: 'things-to-do',
    title: 'Things to Do in Merzouga — Every Desert Experience, Honestly Compared',
    pageTitle: 'Things to Do in Merzouga — Camel Treks, Quads, 4x4s & Camps',
    description: "All the things to do in Merzouga in one place — camel trekking on Erg Chebbi, quad biking, 4x4 desert tours, luxury camps, sunrise and sunset spots, music and culture — and how to combine them.",
    ogImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp',
    heroImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp',
    heroAlt: 'Camel caravan silhouetted against a sunset dune ridge near Merzouga',
    intro: 'Merzouga looks like a one-experience village from a distance — ride a camel, sleep in camp — but the reality is a whole menu of desert days. This is the honest overview: what each activity gives you, what it costs in time and effort, and how the pieces fit into one or two well-built days.',
    sections: [
      { heading: 'Camel trekking into Erg Chebbi', paragraphs: [
        'The classic, and still the thing Merzouga does best. A one-hour sunset ride from the dune line to a camp between the crests, dinner and drumming by the fire, then a short sunrise ride back across cool sand. It suits absolutely everyone, needs no fitness to speak of, and delivers the desert postcard without machinery.',
        'Read the full camel trekking guide for what actually happens, what to wear and how the camp night works.',
      ] },
      { heading: 'Quad biking around the dune field', paragraphs: [
        'The high-energy option. Quads ride the regs, palm groves and nomad tracks that surround Erg Chebbi, finishing at the base of the dunes in golden light. Briefing and practice loop included; no experience needed. Best slotted in the late afternoon, handing the machine back just in time for your camel.',
        'See the quad biking in Merzouga guide for terrain, safety and what to wear.',
      ] },
      { heading: '4x4 desert tours and dune driving', paragraphs: [
        'The way to reach the country you cannot walk to: over the high Erg Chebbi crests with an experienced dune driver, out to the seasonal Dayet Srji lake, the black-stone desert of Jerfoulf and fossil beds where the Sahara was once sea. The most family-friendly deep-desert option, and the one photographers love.',
        'Details, expectations and what to bring are in the Merzouga 4x4 desert tour guide.',
      ] },
      { heading: 'A night in a desert camp', paragraphs: [
        'Whether standard or luxury, the camp night is what turns a dune visit into a desert trip: tagine dinner, Gnawa drumming around the fire, and a sky so crowded with stars that identifying constellations stops being a hobby and starts being obvious. Camps range from simple bivouacs to king-bed suites with hot showers on the sand.',
        'Compare the options in our desert camps and luxury desert camps guides.',
      ] },
      { heading: 'Sunrise and sunset on the dunes', paragraphs: [
        'The two free shows, and genuinely two different experiences. Sunset warms the western faces of Erg Chebbi from gold to deep red and draws the camel lines along the ridges; sunrise is quieter, cooler and crisper, with long blue shadows on the lee side. You do not need an activity ticket for either — walk up from the village, or time your camel or 4x4 outing to finish on a crest.',
      ] },
      { heading: 'Culture: Khamlia, Gnawa music and village life', paragraphs: [
        'Merzouga is a living town, not a theme park. In Khamlia, a short drive south, the Gnawa community performs the hypnotic music their ancestors brought from sub-Saharan Africa — small, authentic and moving. Around the village you find bakeries, the date-palm oasis of Hassilabied, and nomad families on the plain beyond. Most 4x4 tours fold these in naturally; a quiet morning walk through the oasis is equally rewarding.',
      ] },
      { heading: 'Stargazing and the quiet hours', paragraphs: [
        'With the nearest town light miles away, the night sky over Erg Chebbi is among the clearest in Morocco. The best stargazing is simply lying on cool sand away from camp lights after the fire dies down — or in the deep darkness on the far side of a crest. Bring a red-light torch or use your phone at minimum brightness; your eyes need twenty minutes to adapt.',
      ] },
      { heading: 'How to combine it all: one perfect day, two relaxed days', paragraphs: [
        'With one full day: 4x4 desert loop in the morning, long lunch and pool time in the village, quad or sandboarding late afternoon, sunset camel to camp, dinner and stars. With two days, everything slows: add Khamlia and the oasis on the second morning, or a second camp night — many travellers say the second night, when the novelty fades and the silence sets in, is the better one.',
        'Our tours are built around exactly these rhythms — the 3-day Marrakech Sahara tour, the 4-day Marrakech–Merzouga route and the 7-day Imperial Cities escape all give Merzouga a proper full day rather than an overnight dash.',
      ] },
    ],
    faqs: [
      { question: 'How many days do I need in Merzouga?', answer: 'Two nights is the sweet spot: arrive in the evening, one full desert day, leave the next morning. One night works if your schedule is tight, but you compress everything into a single sunset-to-sunrise window.' },
      { question: 'What is the best activity in Merzouga for families?', answer: 'The 4x4 desert tour is the most forgiving with children, and the camel trek to camp works for almost every age. Quads suit teenagers; younger kids ride with a parent or the guide.' },
      { question: 'Is Merzouga worth it compared with Agafay or Zagora?', answer: 'If the big dunes are the point of your trip, yes — Erg Chebbi is the tallest dune field in Morocco and the best-supported by tours. Agafay is a stone desert near Marrakech; Zagora is quieter but its dunes are smaller.' },
      { question: 'Can I do everything in one day in Merzouga?', answer: 'Camel, quad, 4x4 and camp in one day is doable and common — the activities start and finish at different points around the village. But two days lets you keep the midday hours free, which matters in the warmer months.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '3-day-sahara-fes', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['camel-trekking', 'quad-biking', '4x4-desert-tour', 'desert-camps', 'luxury-desert-camps', 'best-time-to-visit', 'how-many-days', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    sources: ['onmt'],
    inlineImages: [
      { imageId: 'berber-camel-guide-sahara-merzouga', after: 0 },
      { imageId: 'sahara-bivouac-stars-merzouga', after: 5 },
    ],
  },
  {
    kind: 'merzouga',
    slug: 'marrakech-to-merzouga',
    title: 'Marrakech to Merzouga — The Complete Sahara Route Guide',
    pageTitle: 'Marrakech to Merzouga — Route, Stops & Itinerary Guide',
    description: "How to get from Marrakech to Merzouga — the High Atlas crossing, Aït Ben Haddou, Dades Valley, Todra Gorge and Erg Chebbi, with realistic 3-day and 4-day itinerary guidance.",
    ogImage: '/images/dest/ait-ben-haddou.webp',
    heroImage: '/images/dest/ait-ben-haddou.webp',
    heroAlt: 'Aït Ben Haddou ksar on the route from Marrakech to Merzouga',
    intro: 'Marrakech is Morocco\'s most popular starting point for the Sahara, and the road south to Merzouga is a journey in its own right: over the High Atlas, past the UNESCO-listed ksar of Aït Ben Haddou, through kasbah country and palm-filled valleys, along the Todra Gorge, and finally to the Erg Chebbi dunes. This guide explains how the route actually works so you can choose the right itinerary.',
    sections: [
      { heading: 'Route overview: what the journey involves', paragraphs: [
        'Marrakech and Merzouga are connected by a single practical corridor: south over the High Atlas mountains (the Tizi n\'Tichka pass road), down to Aït Ben Haddou and Ouarzazate, then east through the Dades Valley, past the Todra Gorge and the Rissani / Tafilalet area to Merzouga at the foot of Erg Chebbi. It is a serious overland route — this is why we say honestly that the road is part of the experience, not just a transfer.',
        'Because the distances are real, the number of days matters more than the vehicle. A rushed version tries to do everything in two days; three days is the shortest format we consider genuinely practical; four days or more lets the journey breathe.',
      ] },
      { heading: 'How the journey works with a private tour', paragraphs: [
        'On our private Marrakech Sahara itineraries you travel in your own air-conditioned vehicle with a professional driver-guide. The route is split into manageable driving days, with stops at the major sights along the corridor and an overnight in the Dades or Todra area before the desert day.',
        'The desert day itself follows the classic pattern: reach Merzouga by late afternoon, meet the camel team at the dune line, trek into Erg Chebbi for sunset, and sleep in a desert camp between the dunes. The next morning starts with sunrise over the sand before the onward or return journey.',
      ] },
      { heading: 'The major stops and what each adds', paragraphs: [
        'Aït Ben Haddou — the UNESCO World Heritage earthen ksar, one of southern Morocco\'s great sights and the moment the landscape turns unmistakably pre-Saharan.',
        'Ouarzazate — the film-studio capital and practical gateway to the south; usually a lunch or brief stop rather than an overnight.',
        'Dades Valley — kasbahs, rose-growing villages and switchback road country; our preferred first-night area because it splits the drive realistically.',
        'Todra Gorge — towering rock walls with a walkable gorge floor; a short, memorable stop on day two.',
        'Rissani and the Tafilalet area — the historic heart of Morocco\'s desert trade routes, close to Merzouga.',
        'Merzouga and Erg Chebbi — the destination itself: Morocco\'s tallest dunes, the camel trek, the camp night and the sunrise.',
      ] },
      { heading: '3-day vs 4-day: choosing the right itinerary', paragraphs: [
        'Three days is the shortest practical format: day one over the Atlas with Aït Ben Haddou and on to the Dades area, day two through Todra Gorge and Rissani to the dunes for the sunset camel trek and camp night, day three sunrise and the long return to Marrakech. It works, and it is honest about being a full schedule.',
        'Four days changes the character of the trip. The return leg stops being a marathon, and you can add a proper half-day around Merzouga itself — the 4x4 desert loop, Khamlia, the oasis — instead of driving straight back. If you have the time, this is the version we recommend most often.',
      ] },
      { heading: 'Private vs shared: what we offer and why', paragraphs: [
        'We run this route as a private journey — your own vehicle, your own driver, your own pace, and stops chosen around your party rather than a fixed coach timetable. This is how the itineraries in our tour pages are built and priced.',
        'Shared group tours do exist on this corridor and can be cheaper, but they mean fixed stops, fixed departure logic and accommodation chosen by the operator rather than by you. We are transparent that ours is the private option; if budget is the deciding factor, that trade-off is yours to make.',
      ] },
      { heading: 'Best time to travel the Marrakech–Merzouga route', paragraphs: [
        'Spring (March to May) and autumn (September to November) are the comfortable windows: pleasant days in the valleys, cold-tolerable nights in the desert. Summer works if you accept heat and plan the drives around mornings; winter brings genuinely cold desert nights but also the clearest skies and quietest dunes. Our month-by-month guide covers this in detail.',
      ] },
      { heading: 'What to pack for the road and the dunes', paragraphs: [
        'Layers are the rule: the trip crosses climates, from the Atlas passes to warm valleys to cold desert nights. Long trousers and closed shoes for the camel trek, a scarf for sand and sun, sunscreen, sunglasses, and a warm jacket for evenings in camp. Our Merzouga packing list goes item by item.',
      ] },
      { heading: 'Common mistakes travellers make on this route', paragraphs: [
        'Underestimating distances and booking two days when three is realistic; scheduling the desert night immediately after a late arrival in Marrakech; packing for hot days only and being cold at night in camp; and treating Aït Ben Haddou or the gorges as drive-by photo stops rather than short walks worth an hour. Every one of these is avoidable with a realistic itinerary — which is exactly what we build.',
      ] },
    ],
    faqs: [
      { question: 'How far is Merzouga from Marrakech?', answer: 'It is a long overland journey across the High Atlas and southern valleys — roughly a full driving day if pushed, which is why our itineraries split it over two comfortable travel days with an overnight in the Dades or Todra area.' },
      { question: 'Is the Marrakech to Merzouga road good?', answer: 'The route is fully paved and well travelled. The driving is long rather than difficult, with mountain sections and winding valley roads where a professional local driver adds real value.' },
      { question: 'Can you do Marrakech to Merzouga in 2 days?', answer: 'Technically yes, with one overnight stop, but it compresses both the Atlas crossing and the desert experience into very long days. Three days is the shortest format we recommend for the Merzouga route.' },
      { question: 'Does the tour return to Marrakech or continue one-way?', answer: 'Both formats exist. The 3-day and 4-day Marrakech routes return to Marrakech; one-way connections toward Fes or onward city plans can be discussed in your private quote.' },
      { question: 'What is included in a private Marrakech–Merzouga tour?', answer: 'Private air-conditioned transport with a professional driver, accommodation according to the selected package, and the desert experience described in the confirmed itinerary. Exact inclusions for your dates are confirmed before booking.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '2-day-zagora-desert-marrakech', '7-day-imperial-cities-sahara-escape'],
    destinations: ['marrakech', 'ait-ben-haddou', 'ouarzazate', 'dades-valley', 'todra-gorge', 'merzouga', 'erg-chebbi'],
    relatedGuides: ['how-many-days', 'camel-trekking', 'luxury-desert-camps', 'things-to-do', 'best-time-to-visit', 'what-to-pack', 'how-to-get-there', 'marrakech-vs-fes', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    sources: ['onmt'],
    inlineImages: [
      { imageId: 'ait-ben-haddou-ouarzazate-unesco', after: 2 },
      { imageId: 'ancient-berber-kasbah-ruins-southern-morocco', after: 3 },
    ],
  },
  {
    kind: 'merzouga',
    slug: 'fes-to-merzouga',
    title: 'Fes to Merzouga — The Middle Atlas Route to the Sahara',
    pageTitle: 'Fes to Merzouga — Route Guide & Desert Itinerary',
    description: "Fes to Merzouga route guide — Ifrane, the Middle Atlas cedar forests, Midelt, the Ziz Valley and Erg Chebbi, with realistic itinerary planning for a Fes Sahara trip.",
    ogImage: '/images/dest/ifrane.webp',
    heroImage: '/images/dest/ifrane.webp',
    heroAlt: 'Ifrane in the Middle Atlas on the route from Fes to Merzouga',
    intro: 'Fes is the natural Sahara gateway for travellers coming from Morocco\'s north. The route south to Merzouga climbs into the Middle Atlas, passes through Ifrane and cedar forest, crosses the high plateau country around Midelt, then descends the Ziz Valley — one long palm oasis — to Erfoud, Rissani and the Erg Chebbi dunes. It is the shortest of Morocco\'s great desert roads, and a spectacular one.',
    sections: [
      { heading: 'Route overview: why Fes works as a desert gateway', paragraphs: [
        'The Moroccan National Tourist Office lists the Fes–Errachidia–Midelt–Merzouga corridor as a leading route toward the Sahara, and for good reason: leaving Fes after breakfast, you can be in completely different country by afternoon — alpine-style Middle Atlas towns, cedar forests with Barbary macaques, then high arid plateaus before the Ziz Valley drops you into palm-grove oasis country.',
        'Compared with the Marrakech route, the Fes approach reaches the dunes with fewer forced overnight stops, which makes it ideal as the first leg of a one-way journey that continues on to the south — or as the start of a loop that finishes in Marrakech.',
      ] },
      { heading: 'The route, stage by stage', paragraphs: [
        'Fes to Ifrane — the climb into the Middle Atlas. Ifrane is an alpine-style town, and the surrounding cedar forest is home to wild Barbary macaques; a short stop works well here.',
        'Ifrane to Midelt — the high plateau crossing, apple-growing country and the transition from green mountains to pre-Saharan landscape.',
        'Midelt to the Ziz Valley — the descent along the Ziz river through one of Morocco\'s great palm oases, with kasbahs and gorge scenery.',
        'Ziz Valley to Erfoud and Rissani — the Tafilalet region, historic heart of the desert trade routes and the last towns before the sand.',
        'Rissani to Merzouga — the final stretch to the dune line, timed for the late-afternoon camel trek into Erg Chebbi and the night in camp.',
      ] },
      { heading: 'Itinerary logic: how many days the route needs', paragraphs: [
        'Fes to Merzouga is achievable as a one-day drive, but a one-day push means you see the dunes and nothing else. Our itineraries treat the journey as part of the trip: leave Fes in the morning, stop through Ifrane, the cedar forest and the Ziz Valley, and reach Merzouga in the late afternoon of day one — or split it with an overnight in the Ziz or Midelt area for a gentler pace.',
        'The classic formats are the 3-day Fes–Merzouga–Fes loop and the 4-day one-way journey Fes → Merzouga → Dades → Aït Ben Haddou → Marrakech, which avoids backtracking entirely and is the format we recommend when you are continuing south.',
      ] },
      { heading: 'Key landscapes: what makes this road different', paragraphs: [
        'The Fes route is a study in transitions. You leave a medieval imperial city, cross cool cedar forest where monkeys sit by the road, cross high plateau farmland, then watch the country turn progressively drier until the Ziz Valley opens into a ribbon of green palm trees between bare rock. By the time the first dunes of Erg Chebbi appear, you have crossed half of Morocco\'s ecological range in a day or two.',
      ] },
      { heading: 'Best time and what to pack', paragraphs: [
        'The same seasonal logic as the southern route applies: spring and autumn are the comfortable windows, summer needs heat management, and winter nights in the desert are genuinely cold. Pack layers, sun protection, closed shoes for the camel trek and a warm layer for camp evenings — our Merzouga packing list covers the details.',
      ] },
      { heading: 'Fes to Marrakech via Merzouga', paragraphs: [
        'Many travellers ask whether they can start in Fes and finish in Marrakech. Yes — and it is arguably the best-shaped Sahara itinerary in Morocco: the dunes sit naturally between the two cities, so a one-way private route (Fes → Middle Atlas → Merzouga → Todra Gorge → Dades Valley → Aït Ben Haddou → High Atlas → Marrakech) crosses the country without repeating a single road. Our 4-day Fes to Marrakech via Merzouga itinerary follows exactly this shape.',
      ] },
    ],
    faqs: [
      { question: 'How long does it take to get from Fes to Merzouga?', answer: 'It is roughly a full day\'s drive, usually split with stops through Ifrane, Midelt and the Ziz Valley. Our itineraries reach the dunes by late afternoon on day one, or split the journey with a Middle Atlas or Ziz overnight for a gentler pace.' },
      { question: 'Is Fes or Marrakech closer to Merzouga?', answer: 'The Fes approach is generally the shorter drive to the dunes, while the Marrakech route passes more of the southern sights (Aït Ben Haddou, Ouarzazate, Dades, Todra). Our Marrakech vs Fes comparison walks through the trade-offs.' },
      { question: 'Can I do a Fes to Merzouga day trip?', answer: 'No — the distances are too great for a same-day return, and a rushed trip would miss the camp night, which is the heart of the experience. Plan at least two days, ideally three or four.' },
      { question: 'Does the tour continue to Marrakech afterwards?', answer: 'It can. Our 4-day Fes to Marrakech via Merzouga route is a one-way journey ending in Marrakech; other end points can be discussed in your private quote.' },
      { question: 'What is there to see between Fes and Merzouga?', answer: 'Ifrane and the cedar forests, the Middle Atlas plateau, Midelt, the Ziz Valley palm oases, and the Rissani / Tafilalet area before the dunes. Each is a real stop, not a drive-by.' },
    ],
    tours: ['3-day-sahara-fes', '3-day-fes-merzouga-sahara', '4-day-fes-marrakech-via-merzouga', 'fes-5-day'],
    destinations: ['fes', 'ifrane', 'merzouga', 'erg-chebbi'],
    relatedGuides: ['how-many-days', 'camel-trekking', 'things-to-do', 'best-time-to-visit', 'what-to-pack', 'marrakech-vs-fes', 'how-to-get-there', 'sahara-desert-guide', 'erg-chebbi-sunrise-sunset'],
    sources: ['onmt'],
    inlineImages: [
      { imageId: 'draa-valley-oasis-palm-grove', after: 1 },
      { imageId: 'sahara-dune-trekking-merzouga', after: 3 },
    ],
  },
  {
    kind: 'merzouga',
    slug: 'how-many-days',
    title: 'How Many Days Do You Need in the Sahara?',
    pageTitle: 'How Many Days in the Sahara? — Merzouga Trip Length Guide',
    description: "How many days you need in the Sahara and Merzouga — an honest comparison of 1, 2, 3 and 4+ day desert trips, and what you can realistically experience at each length.",
    ogImage: '/images/dest/merzouga.webp',
    heroImage: '/images/dest/merzouga.webp',
    heroAlt: 'The dunes of Erg Chebbi near Merzouga — how many days does a Sahara trip need?',
    intro: 'Short answer: one night between the dunes is the minimum for the classic Sahara experience, and two nights is what we recommend most often. The longer answer depends on where you start, how much driving you accept per day, and what you want the desert to be — a highlight or the point of the trip. Here is the honest breakdown.',
    sections: [
      { heading: '1 day in the Sahara (one night between the dunes)', paragraphs: [
        'One night in camp gives you the essential sequence: arrive in the late afternoon, sunset camel trek into Erg Chebbi, dinner and drumming at camp, sunrise over the dunes, and back out by mid-morning. Nothing about it is rushed on the sand itself — the experience is compact but complete.',
        'The trade-off is the journey. From Marrakech, a one-night desert trip means very long driving days; from Fes it is more forgiving. One day is the right choice when the Sahara is a highlight of a wider Morocco itinerary and your schedule is genuinely tight.',
      ] },
      { heading: '2 days in the Sahara (two nights)', paragraphs: [
        'Two nights is the sweet spot for most travellers. The first evening and night deliver the classic sequence; the second day — free of arrival logistics — is when the desert opens up: the 4x4 loop through the black-stone desert and nomad country, Khamlia and its Gnawa music, the oasis, or simply unhurried time on the dunes. The second camp night, when the novelty fades and the silence sets in, is often the one people remember.',
        'If your Morocco itinerary can absorb it, this is the version we build most often.',
      ] },
      { heading: '3 days in the Sahara', paragraphs: [
        'Three days suits slow travellers, photographers and families who want the desert to be a chapter of the trip rather than a single evening. You add depth rather than new categories: longer 4x4 explorations, a second night in a different camp, sandboarding, stargazing without a schedule, and time in the village and oasis.',
        'Three days also pairs naturally with the wider southern route — the Dades Valley and Todra Gorge on the way in or out — making it the core of a well-paced 4- or 5-day desert journey.',
      ] },
      { heading: '4+ days (desert plus the route itself)', paragraphs: [
        'Beyond three days in Merzouga itself, additional time is usually better spent on the journey — the Atlas, Aït Ben Haddou, the gorges — or on a one-way Fes-to-Marrakech desert crossing that sees the whole country once instead of doubling back. If the Sahara itself is the entire purpose of your trip, multi-day camel treks into the deeper desert can be discussed in your private quote.',
      ] },
      { heading: 'The quick answer', paragraphs: [
        'One night: the classic, works from Fes, tight from Marrakech. Two nights: what we recommend most. Three nights: for slow travel and photography. Four or more: shift the extra days to the route, or talk to us about a deep-desert trek.',
      ] },
    ],
    faqs: [
      { question: 'Is one night in the Merzouga desert enough?', answer: 'For the essential experience — sunset camel trek, camp night, sunrise — yes. What one night cannot give you is a relaxed journey to the dunes or a full desert day. From Marrakech, plan at least a 3-day tour for one camp night.' },
      { question: 'How many days do you need from Marrakech to Merzouga?', answer: 'Three days is the shortest practical format: two travel days with an overnight in the Dades or Todra area, and one night between the dunes. Four days makes it comfortable.' },
      { question: 'How many days from Fes to Merzouga?', answer: 'The drive is shorter than from Marrakech — many itineraries reach the dunes on day one with scenic stops, making a 3-day Fes loop or a 4-day one-way Fes-to-Marrakech route very comfortable formats.' },
      { question: 'Can you spend too long in the desert?', answer: 'After about three nights in Merzouga itself, most travellers get more value from varying the trip — the gorges, the valleys, the imperial cities — than from additional nights in the same camp area.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '3-day-sahara-fes', '3-day-fes-merzouga-sahara', '4-day-fes-marrakech-via-merzouga'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['things-to-do', 'camel-trekking', 'marrakech-to-merzouga', 'fes-to-merzouga', 'best-time-to-visit', 'desert-camps', 'sahara-desert-guide'],
    sources: ['onmt'],
    inlineImages: [
      { imageId: 'sahara-dune-trekking-merzouga', after: 1 },
      { imageId: 'luxury-desert-camp-sunset-merzouga', after: 4 },
    ],
  },
  {
    kind: 'merzouga',
    slug: 'sahara-desert-guide',
    title: 'Sahara Desert Travel Guide — Morocco Desert Trips Explained',
    pageTitle: 'Sahara Desert Travel Guide — Morocco Desert Tours, Erg Chebbi & Merzouga',
    description: 'The complete Morocco Sahara guide — Erg Chebbi, Merzouga, camel trekking, desert camps, quad and 4x4 experiences, and how Marrakech and Fes connect to the dunes.',
    ogImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp',
    heroImage: '/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp',
    heroAlt: 'Camel caravan silhouetted on a Sahara dune ridge at sunset — the classic Morocco desert scene',
    intro: 'The Moroccan Sahara is not one uniform sea of sand — it is a sprawl of gravel plains, oases and a few distinct dune fields, the most accessible of which is Erg Chebbi at Merzouga. This guide ties the whole desert picture together: what it is, how to experience it and how Marrakech and Fes reach it.',
    sections: [
      {
        heading: 'Where the Sahara actually is in Morocco',
        paragraphs: [
          'The Sahara is the vast desert belt that runs across North Africa; only its far north-western fringe dips into Morocco. Travellers experience that fringe mainly as two dune fields (ergs): Erg Chebbi near Merzouga and the more remote Erg Chigaga beyond Zagora. Between them the terrain is largely gravel stony desert (known locally as reg) with scattered oases, plus the dramatic gorges and valleys of the southern High Atlas.',
          'What draws most visitors to Merzouga is Erg Chebbi — Morocco\'s tallest dunes, up to roughly 150 metres, and the easiest to reach because the road runs almost to their edge. If you want the true silence of the deep desert and do not mind more driving, Erg Chigaga is the quieter alternative.',
        ],
      },
      {
        heading: 'The core desert experiences',
        paragraphs: [
          'The rhythms of a Sahara visit repeat everywhere in the Moroccan desert. Late in the afternoon you leave the village and cross to the dunes; at sunset you ride a camel along the crest line; after dark you eat in a desert camp and lie under a sky dense with stars; at dawn you climb a dune for sunrise before riding back. Around that core, travellers add faster, higher-energy activities: quad biking on the firm ground around the dune field, or a 4x4 drive that reaches the highest crests and the wider desert beyond.',
          'None of these activities replaces the others — each suits a different mood and a different part of the day, and a well-planned Merzouga day often combines two of them.',
        ],
        bullets: [
          'Camel trekking — slow, and the classic way to reach a camp at sunset',
          'Desert camp night — dinner, music and stargazing between the dunes',
          'Quad biking — a high-energy afternoon on the flats around the erg',
          '4x4 drive — reaching the tall crests and the wider desert country',
          'Sunrise and sunset — free, and the two best hours on the dunes',
        ],
      },
      {
        heading: 'The classic route from Marrakech',
        paragraphs: [
          'Most first-time desert trips start in Marrakech. The drive climbs over the High Atlas at Tizi n’Tichka, passes the UNESCO-listed ksar of Aït Ben Haddou and the film-town of Ouarzazate, then winds through the Dades Valley and the Todra Gorge before turning southeast to Merzouga. It is roughly a 9–10 hour drive and is best spread over two travel days, with an overnight in the Dades or Todra area.',
          'Done over three to four days it becomes a loop that is also the most popular Sahara trip in Morocco — the Atlas, Aït Ben Haddou, the gorges and the dunes in one route. See the dedicated Marrakech-to-Merzouga route guide for the stops in detail.',
        ],
      },
      {
        heading: 'The classic route from Fes',
        paragraphs: [
          'A Fes-to-Merzouga trip is more direct. The road runs southeast through the Middle Atlas and the cedar town of Ifrane, over to Midelt, then down the long palm-lined Ziz Valley to Merzouga — roughly a 7–8 hour drive. Because it is shorter, a Fes departure can reach the dunes on the first day, which makes a 3-day Fes loop or a 4-day Fes-to-Marrakech one-way route very comfortable formats.',
          'The scenery changes from green highlands to oasis to desert more gradually than on the Marrakech road. The Fes-to-Merzouga route guide covers the stops.',
        ],
      },
{
        heading: 'Sunrise, sunset and the night sky',
        paragraphs: [
          'The two best hours on the dunes are the golden hours around sunrise and sunset, when the sand turns from pale to amber to deep orange and the long shadows give the crests strong shape. After dark, away from village lights, the stargazing is among the clearest in Morocco — the Milky Way is frequently visible to the naked eye in the cooler months.',
          'On our own Merzouga journeys the sequence is built from these hours: a sunset trek or 4x4 to catch the best light, a camp dinner under the stars, and a sunrise climb to begin the ride back. How the times shift through the seasons is covered in the dedicated sunrise and sunset guide.',
        ],
      },
      {
        heading: 'Culture on the desert fringe',
        paragraphs: [
          'The Sahara trip is not only dunes. South of Merzouga lies Khamlia, the Gnawa village whose music tradition draws visitors for late-afternoon performances. The weekly souk at Rissani, the historic trading town to the north, is a practical window into local life, and across the desert fringe you meet the nomad and semi-nomad communities who still live around the ergs. These cultural stops are optional but they genuinely round out the experience.',
          'We never promise a staged or romanticised version of nomadic life — what we can offer is a respectful look at how people actually live around the dunes, arranged through local families and guides.',
        ],
      },
      {
        heading: 'Best time and how long to plan',
        paragraphs: [
          'October to April is the comfortable window for trekking and camps; summer daytime heat on the dunes regularly exceeds 40 °C and makes midday activity unpleasant. One night between the dunes delivers the essential sunset-camp-sunrise sequence; a full extra day adds room for quad, 4x4 and cultural stops. The best-time and how-many-days guides go deeper into both of these.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between Erg Chebbi and Erg Chigaga?', answer: 'Erg Chebbi near Merzouga has Morocco\'s tallest dunes, is easy to reach, and is busy. Erg Chigaga beyond Zagora is more remote, has lower dunes, and is far quieter. Choose by whether you value convenience or solitude.' },
      { question: 'Is it worth doing both camel and quad or 4x4 in the desert?', answer: 'They serve different moments. The camel trek is the slow, iconic way to the camp at sunset; quad and 4x4 are faster, high-energy ways to cover the wider desert and reach the tall crests. A full day in Merzouga easily combines a sunset camel ride with a daytime 4x4 or quad.' },
      { question: 'How do Marrakech and Fes trips to the Sahara differ?', answer: 'Marrakech routes are longer (about 9–10 hours of driving) and pass the Atlas, Aït Ben Haddou, Ouarzazate and the Dades/Todra gorges. Fes routes are shorter (about 7–8 hours) via the Middle Atlas, Ifrane, Midelt and the Ziz Valley, and can reach the dunes by day one.' },
      { question: 'Is the Sahara safe for a first-time traveller to Morocco?', answer: 'Yes. Desert travel near Merzouga runs along established routes with local guides and drivers, and the camps are built for travellers. The main genuinely challenging factors are heat in summer and cold desert nights in winter, both of which are about packing and timing rather than safety.' },
      { question: 'Can I visit the Sahara without a tour?', answer: 'Yes — the dunes are public land and you can visit on foot or by shared transport from Merzouga. But a private driver or tour removes the logistics of the long desert approach and lets you stop at the gorges and valleys en route, which is why most travellers choose it.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '3-day-fes-merzouga-sahara', '4-day-fes-marrakech-via-merzouga', '3-day-sahara-agadir'],
    destinations: ['merzouga', 'erg-chebbi', 'ouarzazate', 'ait-ben-haddou', 'dades-valley'],
    relatedGuides: ['erg-chebbi', 'camel-trekking', 'desert-camps', 'quad-biking', '4x4-desert-tour', 'marrakech-to-merzouga', 'fes-to-merzouga', 'best-time-to-visit', 'how-many-days'],
    sources: ['onmt-merzouga-region', 'onmt', 'natgeo-travel'],
    inlineImages: [
      { imageId: 'berber-camel-guide-sahara-merzouga', after: 1 },
      { imageId: 'sahara-bivouac-stars-merzouga', after: 4 },
    ],
  },
{
    kind: 'merzouga',
    slug: 'erg-chebbi-sunrise-sunset',
    title: 'Erg Chebbi Sunrise & Sunset — Timing the Dunes',
    pageTitle: 'Erg Chebbi Sunrise & Sunset Guide — Best Light on the Dunes',
    description: 'When and where to see the best sunrise and sunset at Erg Chebbi near Merzouga — seasonal timings, photography notes and how camel treks and camp nights fit around the light.',
    ogImage: '/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp',
    heroImage: '/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp',
    heroAlt: 'Silhouette of a traveller on a Sahara dune at sunset near Erg Chebbi, Morocco',
    intro: 'The two hours that most people fly across the world for at Erg Chebbi are sunrise and sunset, when the dunes turn gold, orange and deep crimson. Here is what each one feels like, when the light falls through the year and how a Merzouga schedule is built around it.',
    sections: [
      {
        heading: 'Why the golden hours matter on the dunes',
        paragraphs: [
          'Sand has no colour of its own — it takes on the colour of the light. At midday the Erg Chebbi dunes sit flat and pale, but in the first and last hour of daylight the long, low sun rakes across the crests and throws deep shadows that give the ridges strong three-dimensional shape. That is why essentially every meaningful desert photograph, and every memorable moment on the sand, happens at sunrise or sunset.',
        ],
      },
      {
        heading: 'Sunset at Erg Chebbi',
        paragraphs: [
          'Sunset is the social hour. The western faces of the dunes turn from gold to deep red, camel lines trace the ridge tops below you, and the village-facing edge of the erg fills with trekkers and photographers. You reach it by walking up from Merzouga in under an hour, or by timing a camel trek so you crest the ridge as the light turns.',
          'Because everyone who wants a camp night arrives the same way, sunset at the dune line is lively rather than private. If you want the view more to yourself, rise early instead.',
        ],
        bullets: [
          'The classic arrival: camel trek timed to crest the dunes as the sun sets',
          'The western faces catch the last, reddest light of the day',
          'Busiest hour of the day on the dunes near the village',
        ],
      },
      {
        heading: 'Sunrise at Erg Chebbi',
        paragraphs: [
          'Sunrise is the connoisseur\u2019s choice. The sand is cool underfoot, the village is still waking up, and the eastern slopes catch a clear, soft light that builds fast. You have the crests largely to yourself, and the shadows run long and blue before the day flattens the colour out.',
          'If you are sleeping in a camp between the dunes, the classic morning is a short climb to a nearby crest for sunrise, then the camel ride back for breakfast in Merzouga. For photographers, the hour after sunrise usually beats the sunset rush — fewer footprints and softer contrast.',
        ],
      },
      {
        heading: 'How the timing shifts through the year',
        paragraphs: [
          'Trek and tour operators time departures to the light, so sunrise and sunset treks happen about an hour before the sun touches the horizon or just after it rises. Through the year the exact times swing with the seasons — roughly one hour either side depending on the month — but the golden-hour logic is the same every day of the year.',
          'We never publish a fixed schedule because the precise time depends on the season and the route; on booking we confirm exact departure times for your dates. For planning, know that late-afternoon departures happen in every season and are the most common choice, with sunrise available for early risers in the cooler months.',
        ],
      },
      {
        heading: 'Photographing the golden hours',
        paragraphs: [
          'The ingredients for good dune photographs are simple: be on a high crest with the sun low and behind you or raking across the sand. A wide lens and a steady hand (or small tripod) are enough for most people; phones with a raised contrast setting cope fine with the orange tones. If you stay in a camp, the evening light on the tents and lanterns at dusk is often just as photogenic as the dunes themselves.',
          'For a dark-sky shoot, the hour after astronomical twilight is the window for stargazing photography — the Milky Way is frequently visible to the naked eye in the cooler months, away from village lights.',
        ],
      },
      {
        heading: 'How the light fits a Merzouga day',
        paragraphs: [
          'The traveller\u2019s day is built around these two windows. Late afternoon: an optional quad on the flats or a 4x4 to the tall crests, then the sunset camel trek or drive onto the dune ridge. Dusk: camp dinner, music, and stargazing after the sky fully darkens. Dawn: a sunrise climb, then the ride or drive back for breakfast. Two golden hours, one camp night — that is the whole desert rhythm in a sentence.',
        ],
      },
    ],
faqs: [
      { question: 'Is sunrise or sunset better at Erg Chebbi?', answer: 'Both are spectacular; they are simply different. Sunset is warmer and more social but busier; sunrise is quieter, cooler and often better for photography because the light is softer and the field is less crowded. If you sleep in a camp you can have both in one night.' },
      { question: 'What time is sunset at Erg Chebbi?', answer: 'It changes with the season, but treks and drives are generally timed to reach the dune crest about an hour before sunset, throughout the year. Exact departure times are confirmed for your dates when you book.' },
      { question: 'Can I see the dunes light up without a tour?', answer: 'Yes — the dunes are public land and you can walk up from Merzouga in under an hour. Many people also book just the camel trek or a 4x4 ride to the crest without staying in a camp.' },
      { question: 'When is the best night for stargazing?', answer: 'The cooler, drier months (roughly October to April) are excellent for the night sky, and the hour after final twilight is the prime window. A camp night between the dunes puts you far from village lights.' },
      { question: 'What should I bring for the golden hours?', answer: 'A warm layer for after sunset, closed shoes for the sand, water, and a charged camera or phone. A headlamp is useful for the walk back to camp in darkness.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '2-day-zagora-desert-marrakech'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['erg-chebbi', 'camel-trekking', 'desert-camps', 'best-time-to-visit', 'sahara-desert-guide'],
    sources: ['onmt-merzouga-region'],
    inlineImages: [
      { imageId: 'sahara-dune-trekking-merzouga', after: 2 },
      { imageId: 'sahara-bivouac-stars-merzouga', after: 4 },
    ],
  },
  ];

// ── Decision / comparison content ─────────────────────────────────────────────
export const COMPARISONS: HubPage[] = [
  {
    kind: 'comparison',
    slug: 'merzouga-vs-zagora',
    title: 'Merzouga vs Zagora — Which Sahara Base to Choose?',
    pageTitle: 'Merzouga vs Zagora — Which Sahara Desert Base?',
    description: "Deciding between Merzouga and Zagora for your Sahara trip — dunes, access, crowd levels and the right journey for each.",
    ogImage: '/images/dest/zagora.webp',
    heroImage: '/images/dest/zagora.webp',
    heroAlt: 'Palm groves and the Draa Valley road approaching Zagora with the Anti-Atlas in the distance',
    intro: 'Both Merzouga and Zagora are desert gateways, but they give very different Sahara experiences. This comparison is meant to help you pick the right one for your trip, not to rank them.',
    sections: [
      { heading: 'Their deserts are different', paragraphs: [
        'Merzouga sits at the foot of Erg Chebbi — Morocco\'s tallest dunes, up to about 150 m, and the classic camel-trek sunset into a camp. The dunes are immediate and dramatic, and the village is built entirely to serve Sahara visitors.',
        'Zagora is further south along the Draa Valley, past Ouarzazate, at the edge of the less-accessible Erg Chigaga. The dunes there are wider and more remote, and the approach feels like a real crossing of the country rather than a single evening ride.',
      ] },
      { heading: 'How each is reached', paragraphs: [
        'Merzouga is the natural end of the Marrakech and Fes–via–Ziz Valley routes, supported by frequent tours and shared transfers. Getting there is straightforward.',
        'Zagora is reached along the Draa Valley, a longer, more rural drive from Ouarzazate or Agadir. Public connections are thinner and most visitors arrive as part of a longer southern loop.',
      ] },
      { heading: 'The right journey for each', paragraphs: [
        'Choose Merzouga if this is your first Sahara, you have 3–4 days from Marrakech or Fes, and you want the iconic camel trek with reliable support. It is the busiest Sahara gateway for a reason.',
        'Choose Zagora if you are doing a deep south loop, have more time, and want a quieter desert with the chance to see Erg Chigaga and the palm-fringed valley approach. It suits a 6-day-plus itinerary better.',
      ] },
      { heading: 'Crowds vs. quiet', paragraphs: [
        'Merzouga is busy in peak season and you will share popular viewpoints with other camps. Zagora is far quieter, and the experience there leans more toward solitude than spectacle.',
      ] },
    ],
    faqs: [
      { question: 'Is Zagora closer to the Sahara than Merzouga?', answer: 'Not really — both sit on the edge of a desert erg. Merzouga is reached overland from Marrakech/Fes via the Ziz Valley; Zagora is reached via the Draa Valley further south.' },
      { question: 'Which has better camel trekking?', answer: 'Erg Chebbi near Merzouga is the classic sunset-into-camp trek and the easier dune to walk. Erg Chigaga near Zagora is more remote and quieter, but the trek there is longer and less supported.' },
      { question: 'Can I do both on one trip?', answer: 'Yes, on a longer itinerary. It makes sense if you are crossing the south of Morocco anyway — but it is a lot of driving, so weigh time against depth.' },
    ],
    tours: ['3-day-sahara-marrakech', '2-day-zagora-desert-marrakech'],
    destinations: ['merzouga', 'zagora', 'erg-chebbi'],
    relatedGuides: ['how-to-get-there', 'erg-chebbi-vs-erg-chigaga', '2-day-vs-3-day-sahara-tour', 'marrakech-vs-fes'],
    comparisonRows: [
      ['Dunes', 'Erg Chebbi — tall (~150 m), close to the village', 'Erg Chigaga — wider, more remote, approached via Draa Valley'],
      ['Best for', 'First-time Sahara, Marrakech/Fes departures, classic camel trek', 'Deep-south loop, quiet desert, palm-valley scenery'],
      ['Access', 'Well served by tours and shared transfers', 'Best by private tour; thin public connections'],
            ['Crowds', 'Busy in peak season', 'Quiet'],
    ],
    // __COMPARISONS__
  },
  {
    kind: 'comparison',
    slug: 'erg-chebbi-vs-erg-chigaga',
    title: 'Erg Chebbi vs Erg Chigaga — Two Moroccan Sahara Deserts',
    pageTitle: 'Erg Chebbi vs Erg Chigaga — Which Sahara Dunes?',
    description: "Erg Chebbi near Merzouga compared with Erg Chigaga near Zagora — dune size, access, camps and what kind of desert each gives you.",
    ogImage: '/images/dest/erg-chebbi.webp',
    heroImage: '/images/dest/erg-chebbi.webp',
    heroAlt: 'Erg Chebbi dunes near Merzouga under a bright sky',
    intro: 'The two main Sahara ergs in Morocco are very different despite sharing the word "desert". This is a factual side-by-side, not a ranking.',
    sections: [
      { heading: 'Erg Chebbi (near Merzouga)', paragraphs: [
        'About 28 km long with dunes up to roughly 150 m, Erg Chebbi is the Sahara most visitors picture: tall, climbable dunes within an hour of a supported village, with camel treks straight into a desert camp at sunset.',
        'Because access is easy and there is infrastructure at the foot of the dunes, it is also the busiest. That means more tour options and more predictable support if the weather changes.',
      ] },
      { heading: 'Erg Chigaga (near Zagora)', paragraphs: [
        'Erg Chigaga is wider and lower than Erg Chebbi, spread over a large area near the southern end of the Draa Valley. It is reached over a long, rutted track and has far fewer camps — which is the point for many travellers.',
        'The dunes here are softer and shift more freely, the nights are darker and there is almost no light for miles. It suits travellers who want the Sahara without visitor infrastructure.',
      ] },
      { heading: 'When to pick each', paragraphs: [
        'Pick Erg Chebbi for a reliable first Sahara: a supported camp, a sunset camel trek and a sunrise ride out, best from October to April. Pick Erg Chigaga if you are crossing the south anyway, have time, and want a quieter, more remote desert night with fewer dependencies.',
      ] },
    ],
    faqs: [
      { question: 'Which dunes are higher, Erg Chebbi or Erg Chigaga?', answer: 'Erg Chebbi has the taller, more iconic dunes (up to about 150 m). Erg Chigaga is wider and lower but far less crowded.' },
      { question: 'Which is easier to reach?', answer: 'Erg Chebbi, by a long way — the dunes begin at the edge of Merzouga village and are served by frequent tours. Erg Chigaga needs a long drive down a rough track from Zagora, usually on a dedicated tour.' },
      { question: 'Do both have desert camps?', answer: 'Yes. Erg Chebbi has many camps from standard to luxury. Erg Chigaga has far fewer — usually one to two accessible on foot or by camel — which is why it feels remote.' },
    ],
    tours: [],
    destinations: ['erg-chebbi', 'zagora'],
    relatedGuides: ['merzouga-vs-zagora', 'desert-camps', 'camel-trekking'],
    comparisonRows: [
      ['Dune scale', 'Taller crests (~150 m); ~28 km long', 'Wider, lower; spread over a large area'],
      ['Access', 'Easy; on the edge of Merzouga village', 'Long, rough track from Zagora'],
      ['Camps', 'Many (standard to luxury)', 'One to two; basic'],
      ['Atmosphere', 'Iconic, supported, busier', 'Remote, wild, very quiet'],
            ['Best for', 'First-time Sahara, classic trek', 'Deep-south loops, off-grid night'],
    ],
    // __COMPARISONS__
  },
  {
    kind: 'comparison',
    slug: '2-day-vs-3-day-sahara-tour',
    title: '2-Day vs 3-Day Sahara Tour — Which Fits Your Trip?',
    pageTitle: '2-Day vs 3-Day Sahara Tour — Sahara Trip Length Guide',
    description: "2-day versus 3-day Sahara tour from Marrakech — what each covers, realistic timing and which suits a rushed or relaxed itinerary.",
    ogImage: '/images/dest/merzouga.webp',
    heroImage: '/images/dest/merzouga.webp',
    heroAlt: 'Desert road stretching toward the Erg Chebbi dunes under a late afternoon sky',
    intro: 'Two days is the minimum to sleep in a Sahara camp without rushing the journey from Marrakech. Three days slows the pace and adds a stop. Here is how the two compare so you pick the version that fits your real travel time.',
    sections: [
      { heading: 'What the 2-day version covers', paragraphs: [
        'A 2-day Sahara tour from Marrakech is essentially the High Atlas crossing plus Aït Ben Haddou and the Draa Valley to the dunes, with one night in a camp. Day one is a long drive with stops; the camel trek and night in the camp happen on day one too; day two is the sunrise ride back and the drive onward.',
        'That makes it intense: two full days in a vehicle with a tight schedule. It is realistic, but you get little time to breathe in the mountains or linger in Ouarzazate.',
      ] },
      { heading: 'What the 3-day version adds', paragraphs: [
        'With three days you keep the same desert core — one night in camp — but you gain time. A realistic 3-day Marrakech–Merzouga itinerary stops overnight somewhere like Aït Ben Haddou or Ouarzazate, splits the drive so day one is not exhausting, and leaves a clearer head for the camp night and the sunrise ride on day three.',
        'If you are combining with the imperial cities, three days is also the length that lines up with a Fes–Merzouga leg, so it slots into a longer loop more cleanly.',
      ] },
      { heading: 'Who should pick which', paragraphs: [
        'Pick 2 days only if your total Morocco time is extremely tight and you are willing to trade a long, fast drive for one night in the dunes. Pick 3 days whenever you can — the extra day is rarely wasted because the route itself (Atlas, Aït Ben Haddou, Dades/Todra) has plenty to offer if you allow it.',
      ] },
    ],
    faqs: [
      { question: 'Can you do a Sahara tour in 2 days from Marrakech?', answer: 'Yes. Day one covers the long drive to the dunes and includes your camel trek and camp night; day two is sunrise and the ride back. It works, but it is a very full two days.' },
      { question: 'Is 3 days worth the extra day from Marrakech?', answer: 'Most travellers say yes. The 3-day version avoids the exhausting single-push drive and lets you enjoy stops like Aït Ben Haddou or the Dades Valley instead of racing through them.' },
      { question: 'Does a longer tour mean more desert time?', answer: 'Not necessarily — both usually spend exactly one night in the camp. The longer tour buys you less driving per day and room to appreciate the journey.' },
      { question: 'Which is better for families?', answer: 'The 3-day version. Younger travellers handle long car days poorly, and the gentler pace means the desert and the stops feel like the trip, not a marathon.' },
    ],
        tours: ['2-day-zagora-desert-marrakech', '3-day-sahara-marrakech'],
    destinations: ['zagora', 'merzouga', 'erg-chebbi', 'ait-ben-haddou', 'dades-valley'],
    relatedGuides: ['merzouga-vs-zagora', 'how-many-days', 'how-to-get-there', 'marrakech-vs-fes'],
    comparisonRows: [
      ['Driving per day', 'Two very long days (8–10+ h day one)', 'Split into manageable days (~5–6 h average)'],
      ['Stops en route', 'Brief only: Aït Ben Haddou, Draa Valley', 'Overnight at Aït Ben Haddou / Ouarzazate / Dades region'],
      ['Desert core', 'One night in camp, sunrise ride back', 'Same — one night in camp, sunrise ride back'],
            ['Best for', 'Tight itineraries that must reach the dunes', 'First-time visitors who want the journey too'],
    ],
    // __COMPARISONS__
  },
  {
    kind: 'comparison',
    slug: 'private-vs-shared-tour',
    title: 'Private vs Shared Morocco Tour — The Real Trade-offs',
    pageTitle: 'Private vs Shared Morocco Tour — Trade-offs Compared',
    description: "Private versus shared Morocco tours — price, schedule, group dynamics, flexibility and who should choose which on a Morocco itinerary.",
    ogImage: '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp',
    heroImage: '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp',
    heroAlt: 'A local Berber guide with camels in the Sahara desert near Merzouga',
    intro: 'Shared group tours and private tours follow the same roads and stay in similar camps, but the experience of travelling is very different. This is not about "better" — it is about which kind of traveller you are.',
    sections: [
      { heading: 'What is included differs, but the route is often the same', paragraphs: [
        'Both private and shared tours usually cover the same core sights: the Atlas passes, Aït Ben Haddou, the Dades and Todra gorges, Merzouga and Erg Chebbi. The difference is who else is on the bus with you and how much of the rhythm you control.',
        'Shared tours include the same guides, meals and camp nights but on a fixed group schedule. Private tours give you your own vehicle, your own guide and the timing you choose — for a higher price.',
      ] },
      { heading: 'The schedule trade-off', paragraphs: [
        'Shared tours run on a published calendar and fixed pickup/drop-off points. If your flight lands early, you still wait; if it is late, you still join the group. A private tour starts and stops where you need it to, so a delayed arrival does not throw off the whole trip.',
        'If you like the idea of meeting other travellers and keeping to one plan, the shared timetable suits you. If your dates or energy don\'t line up with a group, private is the relief.',
      ] },
      { heading: 'Price and who pays', paragraphs: [
        'Shared tours have a clear, published price per person and you pay only your share. That makes the Sahara and the Atlas accessible on a tighter budget — but it usually means shared rooms or dorm beds at camps.',
        'Private tours cost more because you effectively buy the whole vehicle, but the total price can be reasonable when split between two or more travellers sharing a booking. If you are a group of three or more, a private tour often costs less per person than two single supplement slots on a shared tour.',
      ] },
      { heading: 'Group dynamics and comfort', paragraphs: [
        'Shared tours are social: you usually travel with 4–12 other people and the pace suits the middle of the group. That is great if you enjoy incidental conversation and group photos, and harder if you value space and your own schedule.',
        'Private tours are quiet by default. You can stop when you like, skip an optional walk, or spend longer at a place that catches you. It is better for families with children, photographers with gear, and anyone who has ever been rushed at the back of a group.',
      ] },
      { heading: 'Who should pick which', paragraphs: [
        'Pick shared if your dates are flexible, you are travelling solo and want good value and the company of fellow travellers. Pick private if your dates are fixed, you are travelling as a family or small group, you need a specific pickup point or you simply want the itinerary to bend around you.',
      ] },
    ],
    faqs: [
      { question: 'Is a private Morocco tour worth the extra cost?', answer: 'It is worth it when flexibility, timing, your group size or comfort with other travellers is a real constraint. For two or more sharing, the per-person cost is often comparable to shared options.' },
      { question: 'Can I book a private tour as two people?', answer: 'Yes. The per-person cost rises versus a shared group, but sharing a private vehicle is usually far cheaper than two single supplements on a fixed group tour.' },
      { question: 'Do shared tours go to the same places?', answer: 'Yes — shared tours visit the same core Sahara and Atlas sights. The difference is the group size, schedule and shared rooms at camp.' },
      { question: 'Can a solo traveller get a private tour?', answer: 'Yes, but at the full private-tour price. Many solo travellers instead join a shared group tour, which keeps the cost low and still reaches the same desert.' },
    ],
    tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'ait-ben-haddou', 'marrakech', 'fes'],
    relatedGuides: ['2-day-vs-3-day-sahara-tour', 'marrakech-vs-fes', 'luxury-camp-vs-standard-camp', 'how-many-days', 'how-to-get-there'],
    comparisonRows: [
      ['Price per person', 'Lower; published group price', 'Higher; you hire the vehicle'],
      ['Schedule', 'Fixed departure calendar', 'You set the dates and stops'],
      ['Group size', '4–12 travellers', 'Your group only'],
      ['Rooms at camp', 'Shared dorms or single supplement', 'Private room included in most quotes'],
      ['Pick-up points', 'Hotels or central points on the route', 'Usually any Marrakech/Fes address'],
            ['Best for', 'Solo travellers, flexible dates, tight budgets', 'Families, fixed dates, small groups, photographers'],
    ],
    // __COMPARISONS__
  },
  {
    kind: 'comparison',
    slug: 'luxury-camp-vs-standard-camp',
    title: 'Luxury Camp vs Standard Camp — Choose Your Desert Night',
    pageTitle: 'Luxury Camp vs Standard Camp — Merzouga Desert Night',
    description: "Luxury versus standard desert camp near Merzouga — tents, beds, bathrooms, meals and price to help you choose the right desert night for your budget.",
    ogImage: '/images/personal/luxury-camp-dusk.webp',
    heroImage: '/images/personal/luxury-camp-dusk.webp',
    heroAlt: 'A luxury desert camp tent glowing warm in the dusk light among the dunes near Merzouga',
    intro: 'A night in the Erg Chebbi dunes is unforgettable either way — the decision is how much comfort you want between the same sunset and sunrise. Here is how the two camp types actually differ.',
    sections: [
      { heading: 'The night is the same, the tent is not', paragraphs: [
        'Both camp types give you the same essential desert night: camel trek in at sunset, a fire, a shared three-course Moroccan dinner, Berber music and stargazing, then sunrise tea and a camel ride back. The dunes, the fire and the sky are identical.',
        'What changes is where you sleep and how private the facilities are. That is the entire decision.',
      ] },
      { heading: 'Standard camps', paragraphs: [
        'Standard Berber camps use single-layer tents on a platform bed with a foam or thin mattress and shared blankets. Bathroom is shared — usually a short walk away, often a simple toilet and a bucket or solar shower. It is the authentic, social, budget-friendly night in the desert.',
        'You sleep well and wake to mint tea on a dune. What you trade is privacy and a guaranteed hot shower.',
      ], bullets: [
        'Platform bed with shared blankets',
        'Shared bathroom facilities',
        'Communal atmosphere',
        'Lower nightly cost',
      ] },
      { heading: 'Luxury camps', paragraphs: [
        'Luxury camps use larger, sturdier tents with a proper bed, quality linen, rugs and — the key differentiator — an en-suite bathroom with a flushing toilet and a warm shower plumbed to the tent. Many add heating for winter nights and a private terrace.',
        'The premium is real but modest for most travellers, and the difference is most felt at the end of a long day on the dunes or in cold weather.',
      ], bullets: [
        'Real bed with quality bedding',
        'Private en-suite bathroom with hot shower',
        'Heating and often a private terrace',
        'Higher nightly cost',
      ] },
      { heading: 'Price and value', paragraphs: [
        'Standard camps are the lowest-cost way to spend a night in the dunes and still get the full camel-trek-and-fire experience. Luxury camps charge more, usually for the bed and bathroom — and the convenience of a warm shower and a private loo after a long drive.',
        'For a one-night splurge, luxury is worth it for couples, honeymooners or anyone cold-sensitive. For groups who just want the Sahara night, standard is the honest choice. We quote exact prices when you ask.',
      ] },
      { heading: 'Who should pick which', paragraphs: [
        'Pick standard if you are on a budget, travelling in a group, comfortable with shared facilities and value the Sahara experience over the fixtures. Pick luxury if comfort matters — a hot shower and private bathroom after the dunes — or if it is a special night worth treating yourself for.',
      ] },
    ],
    faqs: [
      { question: 'Is a luxury camp worth the extra money for one night?', answer: 'Only if comfort after a long drive or a cold night is a priority. The desert experience itself — fire, stars, camel ride — is the same in both.' },
      { question: 'Do luxury camps have real beds and real showers?', answer: 'Most do: a framed bed with proper bedding and an en-suite bathroom with a hot shower. Always confirm the exact facilities for the camp on your itinerary.' },
      { question: 'Are shared-bathroom camps clean and decent?', answer: 'Yes, when booked through a reputable local operator. Standard does not mean dirty — it means shared facilities rather than private ones.' },
      { question: 'How cold is a standard camp at night?', answer: 'Winter nights on the dunes can approach freezing whether you are in a standard or luxury tent. Luxury camps usually add heating; standard camps provide blankets. Pack a warm layer either way.' },
    ],
    tours: ['3-day-sahara-marrakech', 'honeymoon-morocco', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['desert-camps', 'luxury-desert-camps', 'best-time-to-visit'],
    comparisonRows: [
      ['Bed', 'Platform bed, thin mattress, shared blankets', 'Real bed, quality linen, rugs'],
      ['Bathroom', 'Shared, a short walk away', 'Private en-suite with hot shower'],
      ['Ambiance', 'Communal, authentic', 'Private terrace, warmer'],
      ['Best for', 'Budget-conscious groups, authentic night', 'Couples, comfort, cold-sensitive travellers'],
      ['Price', 'Lower', 'Higher — ask for exact quote by dates'],
    ],
    // __COMPARISONS__
  },
  {
    kind: 'comparison',
    slug: 'marrakech-vs-fes',
    title: 'Marrakech vs Fes — Which City for Your Sahara Trip?',
    pageTitle: 'Marrakech vs Fes — Which Is Better for a Sahara Desert Tour?',
    description: "Marrakech or Fes for your Sahara desert tour? Route character, landscapes, major stops and itinerary shapes compared honestly — so you choose by itinerary, not by hype.",
    ogImage: '/images/dest/marrakech.webp',
    heroImage: '/images/dest/marrakech.webp',
    heroAlt: 'Marrakech and Fes — choosing the right starting point for a Sahara desert tour',
    intro: 'Both Marrakech and Fes are genuine gateways to the Sahara — but they reach Merzouga by different roads, with different scenery, different journey lengths and different itinerary shapes. Neither is universally "better"; the right starting point depends on the rest of your Morocco plan. Here is the honest comparison.',
    sections: [
      { heading: 'The two routes are fundamentally different', paragraphs: [
        'The Marrakech route crosses the High Atlas and runs through southern Morocco\'s greatest hits: Aït Ben Haddou, Ouarzazate, the Dades Valley and Todra Gorge. It is the sight-rich road — but also the longer one, which is why three days is the shortest practical Marrakech format.',
        'The Fes route climbs into the Middle Atlas (Ifrane, cedar forest), crosses the plateau at Midelt and descends the Ziz Valley to the dunes. It is generally the shorter drive to Merzouga, greener and more mountain-quiet in character, with fewer headline stops but striking landscape transitions.',
      ] },
      { heading: 'Journey structure and length', paragraphs: [
        'From Marrakech: plan 3 days minimum for one camp night (two long travel days around it), 4 days for a comfortable pace with a real desert day. Most Marrakech tours return to Marrakech, retracing the corridor.',
        'From Fes: the dunes are closer, so a 3-day loop is more relaxed, and the standout option is the one-way Fes → Merzouga → Dades → Aït Ben Haddou → Marrakech route — a 4-day crossing that sees the country once and finishes in Marrakech. If your trip continues south, starting in Fes is structurally efficient.',
      ] },
      { heading: 'What you see along the way', paragraphs: [
        'Marrakech side: the High Atlas pass country, Aït Ben Haddou (UNESCO), Ouarzazate, kasbah valleys, the Dades switchbacks, Todra Gorge — five or six major stops, which is exactly why the journey needs days.',
        'Fes side: Ifrane and the cedar forests with Barbary macaques, the high plateau around Midelt, and the long Ziz Valley palm oasis down to Erfoud and Rissani. Fewer named sights, but a dramatic cross-section of Morocco\'s landscapes.',
      ] },
      { heading: 'Suitability: which traveller fits which city', paragraphs: [
        'Choose Marrakech when the southern sights matter to you, when your trip is centred on the Red City, or when you want the classic "greatest hits" desert road with time built in (4 days).',
        'Choose Fes when you are arriving from the north (Casablanca, Rabat, Meknes, Chefchaouen), when you want the shorter drive to the dunes, or when a one-way desert crossing finishing in Marrakech fits your onward plans.',
        'Doing both cities? The one-way crossing between them via Merzouga is the best-shaped Sahara itinerary in Morocco — you never drive the same road twice.',
      ] },
      { heading: 'Our honest recommendation', paragraphs: [
        'We do not rank the cities — we shape itineraries around them. Tell us where you land and where you need to finish, and we will tell you which route (or crossing) fits. The comparison table below summarises the trade-offs at a glance.',
      ] },
    ],
    faqs: [
      { question: 'Which is closer to the Sahara, Marrakech or Fes?', answer: 'Fes is generally the shorter drive to Merzouga. Marrakech compensates with the sight-rich southern route — Aït Ben Haddou, Ouarzazate, Dades and Todra — which is why its tours need a minimum of three days.' },
      { question: 'Can you visit the Sahara from both Marrakech and Fes in one trip?', answer: 'Yes — that is exactly what a one-way Fes-to-Marrakech (or Marrakech-to-Fes) desert crossing does: the dunes sit naturally between the two cities, and you see the country once instead of backtracking.' },
      { question: 'Is the Fes to Merzouga drive scenic?', answer: 'Very — but in a different register: alpine Middle Atlas towns, cedar forest, high plateau, then the long Ziz Valley palm oasis. The Marrakech route is more about kasbahs, gorges and UNESCO heritage stops.' },
      { question: 'Which city is better for a first visit to Morocco?', answer: 'Both are rewarding first bases. If medinas and culture lead your list, Fes is extraordinary; if markets, food and mountain excursions lead it, Marrakech. For the desert specifically, let your arrival airport and onward direction decide.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '3-day-sahara-fes', '3-day-fes-merzouga-sahara', '4-day-fes-marrakech-via-merzouga'],
    destinations: ['marrakech', 'fes', 'merzouga', 'erg-chebbi', 'ait-ben-haddou', 'ifrane'],
    relatedGuides: ['marrakech-to-merzouga', 'fes-to-merzouga', 'how-many-days', 'camel-trekking', 'luxury-desert-camps'],
    comparisonRows: [
      ['Drive to Merzouga', 'Longer — High Atlas + southern valleys', 'Shorter — Middle Atlas + Ziz Valley'],
      ['Major stops en route', 'Aït Ben Haddou, Ouarzazate, Dades, Todra Gorge', 'Ifrane, cedar forest, Midelt, Ziz Valley'],
      ['Minimum for one camp night', '3 days (4 comfortable)', '3 days, relaxed loop'],
      ['One-way option', 'Marrakech → Fes via dunes', 'Fes → Marrakech via dunes (most efficient)'],
      ['Route character', 'Sight-rich "greatest hits" road', 'Landscape-transition road, quieter stops'],
      ['Best when…', 'Southern sights matter; trip centred on Marrakech', 'Arriving from the north; continuing south afterwards'],
    ],
    sources: ['onmt'],
    inlineImages: [
      { imageId: 'jemaa-el-fna-night-marrakech', after: 0 },
      { imageId: 'moroccan-palace-ceiling-muqarnas', after: 2 },
    ],
  },
  // __COMPARISONS_END__
];

// ── Lookups ───────────────────────────────────────────────────────────────────
export const MERZOUGA_GUIDE_SLUGS = MERZOUGA_GUIDES.map((p) => p.slug);
export const COMPARISON_SLUGS = COMPARISONS.map((p) => p.slug);
// ─────────────────────────────────────────────────────────────────────────────
// Travel Information — practical, traveler-first pages.
//
// Original content grounded in ONMT / UNESCO / official-operator facts (see
// data/sources.ts). Facts that change often (prices, schedules, visa rules) are
// deliberately NOT hard-coded; pages point to the official source instead.
// ─────────────────────────────────────────────────────────────────────────────
export const TRAVEL_INFO: HubPage[] = [
  {
    kind: 'travel-info',
    slug: 'best-time-to-visit-morocco',
    title: 'Best Time to Visit Morocco — Season by Season',
    pageTitle: 'Best Time to Visit Morocco — Season-by-Season Guide',
    description: 'When to visit Morocco: spring and autumn for most regions, how summer and winter differ between the coast, mountains and Sahara, and how to choose dates for a desert trip.',
    ogImage: '/images/catalog/sahara-dune-trekking-merzouga.webp',
    heroImage: '/images/catalog/sahara-dune-trekking-merzouga.webp',
    heroAlt: 'Trekkers on a Sahara dune crest near Merzouga in soft morning light',
    intro: 'Morocco is a year-round destination, but the right month depends on where you are going. The coast, the mountains and the Sahara behave like different climates — here is how to match your dates to your trip.',
    sections: [
      {
        heading: 'The short answer: spring and autumn',
        paragraphs: [
          'For a first trip that mixes cities, the Atlas Mountains and the Sahara, late March to May and late September to early November are the most comfortable windows across the whole country. Days are warm rather than hot, nights are mild, and the light — which matters more in the desert than most people expect — is soft and long.',
          'These months also suit the longest drives. The Tizi n\'Tichka pass to Ouarzazate and the route out to Merzouga are at their most pleasant when the high Atlas is cool and the desert has not yet peaked.',
        ],
      },
      {
        heading: 'Summer: the coast, not the Sahara',
        paragraphs: [
          'From June to August the interior and the desert edge get very hot — in the Marrakech–Ouarzazate–Merzouga corridor, daytime temperatures commonly climb well above 40°C. Long desert journeys and camel treks shift to early morning and evening, and midday is genuinely restful time, not wasted time.',
          'The Atlantic coast is the summer reward: Essaouira and Agadir sit under a steady ocean breeze and stay noticeably cooler than Marrakech the same day. A summer itinerary that runs Marrakech → Atlas → coast works with the climate rather than against it.',
        ],
        bullets: [
          'Best for the desert: October–April (desert nights are cold in winter)',
          'Best for cities: spring and autumn',
          'Best for the coast: June–September',
          'Ramadan: dates shift each year — days stay tourist-friendly, rhythm changes',
        ],
      },
      {
        heading: 'Winter: clear desert days, cold nights',
        paragraphs: [
          'December to February is low season almost everywhere except the desert, and that is exactly its appeal. Sahara days are crisp and clear with superb visibility, but nights drop close to freezing in the dunes — camps provide blankets and heating, and a warm layer for the evening is essential rather than optional.',
          'The High Atlas passes can see snow and temporary closures after storms, so winter itineraries keep a little flexibility on mountain days. The imperial cities (Fes, Meknes, Rabat) are quiet and atmospheric in winter.',
        ],
      },
      {
        heading: 'What we tell travelers planning a Sahara trip',
        paragraphs: [
          'The honest local answer: the best desert month is the one where you accept the trade-offs. October and April give the best overall balance for Erg Chebbi. Winter gives you the starriest skies and quiet dunes if you pack warm. Summer works if your days are shaped around sunrise, siesta and sunset.',
          'Tell us your dates and we will tell you honestly what the conditions are likely to be — and what we would change about the itinerary.',
        ],
      },
    ],
    faqs: [
      { question: 'When is the best month for a Sahara desert tour?', answer: 'October and April are the sweet spot around Erg Chebbi: warm days, manageable nights. Winter works well too if you bring warm layers for evenings; summer trips are shaped around early mornings and evenings.' },
      { question: 'Is Morocco too hot in summer?', answer: 'The interior and desert edge regularly exceed 40°C, but the Atlantic coast (Essaouira, Agadir) stays mild under ocean winds. Summer itineraries work best when they favor the coast and pace desert time around sunrise and sunset.' },
      { question: 'Can you visit the desert in winter?', answer: 'Yes — winter is a popular time for Erg Chebbi. Days are clear and pleasant; nights are cold (often near freezing), and camps are prepared with blankets and heating. Bring a warm layer for evenings.' },
      { question: 'How does Ramadan affect travel?', answer: 'Tourist sites, hotels and tours operate, but the daily rhythm shifts: some smaller restaurants close by day and evenings are livelier. Check the dates for your year — they move about 11 days earlier annually.' },
    ],
    tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'essaouira', 'marrakech'],
    relatedGuides: ['what-to-pack-morocco', 'getting-around-morocco', 'best-time-to-visit', 'sahara-desert-guide'],
    sources: ['onmt', 'lonely-planet-morocco'],
  },
  {
    kind: 'travel-info',
    slug: 'what-to-pack-morocco',
    title: 'What to Pack for Morocco — A Practical List',
    pageTitle: 'What to Pack for Morocco — Practical Packing List',
    description: 'A realistic Morocco packing list: layers for cold desert nights, sun protection, footwear for medinas and dunes, and what to leave at home.',
    ogImage: '/images/catalog/sahara-dune-trekking-merzouga.webp',
    heroImage: '/images/catalog/sahara-dune-trekking-merzouga.webp',
    heroAlt: 'Trekkers climbing the crest of a tall Sahara dune near Merzouga',
    intro: 'Packing for Morocco is about layers and one good pair of shoes. Medinas, mountain passes and desert nights make different demands — this list covers all three without overpacking.',
    sections: [
      {
        heading: 'The rule: layers over bulk',
        paragraphs: [
          'Moroccan days are warm and evenings can be genuinely cool — the swing is biggest in the south and the desert, where a 20°C day-to-night difference is normal outside summer. Pack clothes you can add and remove: light long-sleeved shirts, a warm mid-layer, and one proper jacket between October and April.',
          'Long, loose clothing is more than cultural politeness — it is the most comfortable thing you can wear in the sun and the medina alike. Linen and cotton beat shorts and strappy tops for practical reasons as much as respectful ones.',
        ],
        bullets: [
          'Light long sleeves and long trousers (sun + medinas + evenings)',
          'A warm mid-layer and jacket for October–April nights',
          'Comfortable closed walking shoes — cobbles and dunes both',
          'Sandals for camp and riad downtime',
          'Scarf or shawl — sun, wind and dunes in one item',
        ],
      },
      {
        heading: 'Desert nights: what actually matters',
        paragraphs: [
          'For a night in an Erg Chebbi camp, the two things travelers under-pack are warm layers and a torch or headlamp. Camps supply thick blankets and, in most cases, heating — but the walk between tent and dining tent after dark is yours.',
          'Sun protection is the other essential: high-SPF sunscreen, sunglasses and a hat, because the Sahara sun is stronger than the temperature suggests, especially on a dune crest with a light wind.',
        ],
      },
      {
        heading: 'What to leave at home',
        paragraphs: [
          'You do not need a hair dryer (most riads have one), a drone (permits are strict — do not bring one without checking regulations first), or more than one week of clothing: laundry is cheap and fast nearly everywhere. Valuables are safer left behind than carried into the dunes on a camel trek — most trips send main luggage ahead by vehicle.',
          'Power banks are genuinely useful on travel days. Moroccan sockets are the European two-pin type (Type C/E), 220V — a simple adapter is enough for most devices.',
        ],
      },
    ],
    faqs: [
      { question: 'What shoes for Morocco?', answer: 'One pair of comfortable closed walking shoes for medinas, gorges and dunes, plus sandals for downtime. Break the walking shoes in before you travel — cobbles are unforgiving.' },
      { question: 'Do I need warm clothes for the desert in summer?', answer: 'Light layers, yes; heavy winter gear, no. Summer desert nights are warm. Between October and April a proper warm layer for evenings is essential.' },
      { question: 'Can women wear what they like in Morocco?', answer: 'Tourist areas are relaxed, and there is no dress-code enforcement for visitors. That said, most women travelers are more comfortable in loose clothing that covers shoulders and knees — it is also the most practical choice for sun and medinas.' },
      { question: 'What plug adapter do I need?', answer: 'Morocco uses European-style two-pin sockets (Type C/E), 220V. A basic European adapter covers almost everything.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara'],
    destinations: ['merzouga', 'marrakech'],
    relatedGuides: ['best-time-to-visit-morocco', 'desert-camps', 'what-to-pack', 'sahara-desert-guide'],
    sources: ['onmt', 'lonely-planet-morocco'],
  },
  {
    kind: 'travel-info',
    slug: 'getting-around-morocco',
    title: 'Getting Around Morocco — Transport, Realistically',
    pageTitle: 'Getting Around Morocco — Transport Options Explained',
    description: 'How to travel around Morocco: when a private driver beats the train and bus, what driving times really look like between Marrakech, Fes and the Sahara, and how to check current schedules.',
    ogImage: '/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp',
    heroImage: '/images/catalog/ancient-berber-kasbah-ruins-southern-morocco.webp',
    heroAlt: 'Old kasbah towers beside the road through southern Morocco',
    intro: 'Morocco is bigger than the map suggests, and the highways are only part of the story. Here is an honest picture of the options — and why so many travelers end up choosing a private route.',
    sections: [
      {
        heading: 'Distances: the numbers that surprise people',
        paragraphs: [
          'Marrakech to Merzouga is about 560 km, but the realistic drive time is 8–9 hours — the route crosses the High Atlas over the Tizi n\'Tichka pass before the road opens up past Ouarzazate. Fes to Merzouga is similar in time via the Middle Atlas and the Ziz Valley. This is why nearly every Sahara itinerary breaks the journey with stops in Aït Ben Haddou, the Dades or Todra gorges, or Midelt.',
          'The train network (ONCF) is good along the Atlantic axis — Casablanca, Rabat, Meknes, Fes, Marrakech — and does not reach the south-eastern desert regions at all.',
        ],
      },
      {
        heading: 'Trains, buses and shared taxis',
        paragraphs: [
          'ONCF trains are comfortable on the northern axis and affordable; long-distance buses (CTM, Supratours) reach most southern towns including Ouarzazate and Errachidia, and are the budget traveler\'s workhorse. Grand taxis — shared cars running fixed routes — are an experience every Morocco traveler should try once on a short hop.',
          'Schedules change with the season and by year, so we deliberately do not publish timetables here: check ONCF and the bus operators\' official sites for current times.',
        ],
      },
      {
        heading: 'When a private driver is worth it',
        paragraphs: [
          'A private route earns its price whenever your plan involves the mountain roads and the desert: you stop where the view is good rather than where the bus stops, villages and kasbahs fit between the main legs, and the drive itself becomes part of the trip instead of the price of it.',
          'It also changes what you can carry and when you move — sunrise at the dunes does not wait for a bus schedule.',
        ],
      },
    ],
    faqs: [
      { question: 'How long is the drive from Marrakech to Merzouga?', answer: 'Realistically 8–9 hours in one push over the Atlas. Most itineraries split it across two days with stops at Aït Ben Haddou, the Dades Valley or Todra Gorge — which is also the better trip.' },
      { question: 'Does the train go to the Sahara?', answer: 'No. ONCF trains cover the Atlantic axis (Casablanca, Rabat, Meknes, Fes, Marrakech). For the desert regions you continue by road — bus, grand taxi or private driver.' },
      { question: 'Is it safe to drive in Morocco yourself?', answer: 'Main highways are good, but mountain passes, occasional fog, and local driving habits make long self-drive days tiring. Many travelers mix: self-drive the north, private driver for the Atlas–Sahara loop.' },
      { question: 'Where do I check current train and bus times?', answer: "On the operators' official sites — ONCF for trains, CTM and Supratours for buses. Times shift seasonally, which is why we link rather than hard-code them." },
    ],
    tours: ['3-day-sahara-marrakech', '3-day-fes-merzouga-sahara', '5-day-great-south-morocco'],
    destinations: ['merzouga', 'ouarzazate', 'marrakech'],
    relatedGuides: ['best-time-to-visit-morocco', 'how-to-get-there', 'marrakech-to-merzouga', 'fes-to-merzouga'],
    sources: ['onmt', 'lonely-planet-morocco'],
  },
];
export const ALL_HUB_PAGES: HubPage[] = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO];
export function hubPageBySlug(slug: string, kind: HubKind): HubPage | undefined {
  const list = kind === 'merzouga' ? MERZOUGA_GUIDES : kind === 'comparison' ? COMPARISONS : TRAVEL_INFO;
    return list.find((p) => p.slug === slug);
}