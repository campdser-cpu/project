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
    relatedGuides: ['desert-camps', 'luxury-desert-camps', 'best-time-to-visit'],
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
    relatedGuides: ['luxury-desert-camps', 'camel-trekking', 'best-time-to-visit'],
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
    relatedGuides: ['desert-camps', 'camel-trekking', 'best-time-to-visit'],
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
    ],
    faqs: [
      { question: 'Is Merzouga good to visit in summer?', answer: 'Not for dune activity — daytime heat regularly exceeds 40 °C and camel trekking becomes unpleasant. Summer is only worth it if you have a specific reason to travel then and can tolerate sustained heat.' },
      { question: 'When is the best time for camel trekking in Merzouga?', answer: 'October to April, starting roughly one hour before sunset or at sunrise. The sand is comfortable and the light is best during those hours.' },
      { question: 'Are desert nights really cold in winter?', answer: 'Yes. In December–February nighttime temperatures on the open dunes can approach 0 °C. Luxury camps provide heating or extra blankets, but pack a warm layer regardless.' },
      { question: 'Does Ramadan affect tours in Merzouga?', answer: 'Tours still run normally, though some town services open later. Evening activities including the camp dinner and drumming are unaffected.' },
    ],
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['desert-camps', 'luxury-desert-camps', 'camel-trekking', 'what-to-pack'],
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
    relatedGuides: ['camel-trekking', 'best-time-to-visit', 'what-to-pack'],
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
    ],
    faqs: [
      { question: 'How high are the Erg Chebbi dunes?', answer: 'The dunes reach about 150 m at their highest crests — the tallest in Morocco. The field is roughly 28 km long and up to 9 km wide.' },
      { question: 'Is Erg Chebbi the Sahara desert?', answer: 'Erg Chebbi is a large dune field inside the Sahara, the part visitors experience from Merzouga. The Sahara itself is continent-wide; Erg Chebbi is its most accessible corner in Morocco.' },
      { question: 'Can you visit Erg Chebbi independently?', answer: 'Yes. The dunes are public land. Most people reach them on foot, by shared taxi or on a short camel trek from Merzouga village.' },
      { question: 'When is the best light for photos at Erg Chebbi?', answer: 'Sunrise and sunset. The dunes turn gold and then orange as the sun rises or sets, and the long shadows give the crests strong shape.' },
    ],
    tours: ['3-day-sahara-marrakech', '2-day-zagora-desert-marrakech', '4-day-marrakech-merzouga-sahara'],
    destinations: ['merzouga', 'erg-chebbi'],
    relatedGuides: ['camel-trekking', 'desert-camps', 'best-time-to-visit'],
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
    relatedGuides: ['camel-trekking', 'best-time-to-visit', 'desert-camps'],
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
    relatedGuides: ['camel-trekking', 'desert-camps', 'how-to-get-there', 'best-time-to-visit'],
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
    relatedGuides: ['how-to-get-there'],
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
    relatedGuides: ['merzouga-vs-zagora'],
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
    relatedGuides: [],
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
    relatedGuides: ['what-to-pack-morocco', 'getting-around-morocco'],
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
    relatedGuides: ['best-time-to-visit-morocco', 'desert-camps'],
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
    relatedGuides: ['best-time-to-visit-morocco', 'how-to-get-there'],
    sources: ['onmt', 'lonely-planet-morocco'],
  },
];
export const ALL_HUB_PAGES: HubPage[] = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO];
export function hubPageBySlug(slug: string, kind: HubKind): HubPage | undefined {
  const list = kind === 'merzouga' ? MERZOUGA_GUIDES : kind === 'comparison' ? COMPARISONS : TRAVEL_INFO;
    return list.find((p) => p.slug === slug);
}