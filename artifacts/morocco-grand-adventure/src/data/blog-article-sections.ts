/**
 * Authored long-form article bodies for priority blog guides.
 *
 * Shared by the runtime blog page (src/pages/blog/[slug].tsx) and the static
 * prerenderer (scripts/prerender.ts) so crawlers and users always see the same
 * content. English is the canonical authored copy; locales without an
 * authored overlay fall back to it (never machine-invented translations).
 *
 * Facts are grounded in the site's own data (src/data/content.ts): camp
 * location at the Erg Chebbi dunes near Merzouga, en-suite private tents,
 * Berber music evenings, camel trekking, 4x4 drives, and the Oct–Apr best
 * season carried by the destination data.
 *
 * Content rule — a supporting article must earn its existence: it must not
 * simply reproduce a conclusion already answered by its matching tour's FAQ,
 * that tour's `practicalInfo`, or an existing guide/blog article covering the
 * same route. Before authoring a new article here, check (1) its search
 * intent, (2) what the matching tour page already answers, (3) what an
 * existing guide or blog article already answers, and (4) the genuinely new
 * information — pacing, prioritization, landscape texture, who it suits —
 * the new article will add on top of that. If the honest answer to (4) is
 * "nothing," the article is not ready to write.
 */
export type BlogSection = {
  heading: string;
  /**
   * Plain prose, one entry per paragraph. A paragraph may embed a single
   * internal link using `[label](/path)` (the only inline markup supported —
   * deliberately not a general rich-text format). `/path` must be a real,
   * existing site route; both the runtime page and the prerenderer parse the
   * same syntax via `parseParagraph` below, so a plain paragraph with no
   * `[...](...)` renders exactly as before.
   */
  paragraphs: string[];
  /** Optional real site image for this section — never localized, never invented. */
  image?: { src: string; alt: string };
};

/** One piece of a parsed paragraph: plain text, or a `[label](/path)` link. */
export type ParagraphPart = { type: 'text'; value: string } | { type: 'link'; label: string; href: string };

// Matches [label](/internal/path) — the href must start with "/" so this can
// only ever produce an internal, same-origin link, never an external one.
const INLINE_LINK_RE = /\[([^\]]+)\]\((\/[^\s)]+)\)/g;

/**
 * Split a paragraph string into plain-text and link parts. Shared by the
 * React page (which renders real `<Link>` elements) and the prerenderer
 * (which renders real `<a>` tags) so both sides stay in sync from one parse.
 */
export function parseParagraph(text: string): ParagraphPart[] {
  const parts: ParagraphPart[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_LINK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push({ type: 'text', value: text.slice(last, idx) });
    parts.push({ type: 'link', label: m[1], href: m[2] });
    last = idx + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export const BLOG_ARTICLE_SECTIONS: Record<string, BlogSection[]> = {
  'merzouga-luxury-desert-camp-guide': [
    {
      heading: 'What Is a Luxury Desert Camp in Merzouga?',
      paragraphs: [
        'A luxury desert camp in Merzouga is a permanent or semi-permanent camp set among the dunes of Erg Chebbi, built for travellers who want the Sahara without giving up comfort. Instead of a basic bivouac, you sleep in a private tent with a real bed, warm bedding and, in most upscale camps, an en-suite bathroom.',
        'Camps range from boutique-style luxury tents to larger family layouts, and most are designed so the silence of the desert — not furniture — is the main feature. Electricity is usually available in the evenings, and the dining tent becomes the social heart of the camp after dark.',
      ],
    },
    {
      heading: 'Where the Camps Stand: the Erg Chebbi Dunes',
      paragraphs: [
        'Merzouga is a small town on the edge of Erg Chebbi, one of Morocco\'s two great sand seas. The erg stretches roughly 22km long and 5km wide, with dunes that rise well over 100 metres and change colour from orange to gold to crimson as the light shifts through the day.',
        'Luxury camps are positioned in and around these dunes, a short camel or 4x4 ride from the village. That is the practical relationship travellers should know: you reach Merzouga by road, and the camp experience begins where the tarmac ends.',
      ],
    },
    {
      heading: 'What a Night in the Sahara Includes',
      paragraphs: [
        'A typical luxury camp stay starts in the late afternoon, when you arrive at the dunes in time for sunset. Dinner is usually a multi-course Moroccan meal served in the dining tent, and many camps finish the evening around a fire with Berber drumming and music under the stars.',
        'Mornings are for the desert\'s quietest hour: sunrise over the dunes, breakfast at the camp, and then your return to Merzouga by camel or 4x4. Stargazing needs no planning — the Sahara\'s night sky is one of the darkest you will ever see.',
      ],
    },
    {
      heading: 'Camel Treks, 4x4 Transfers and How You Arrive',
      paragraphs: [
        'The classic way in is a sunset camel trek from the edge of Merzouga to the camp, led by local camel guides. If you prefer not to ride, or you are travelling with young children or limited mobility, most camps are also reachable by 4x4.',
        'Camel trekking is easier than it looks — the camels walk slowly and steadily, and guides handle the animals for you. Bring a scarf or buy one in Merzouga to keep sand and sun off your face.',
      ],
    },
    {
      heading: 'The Best Time of Year for a Desert Camp Stay',
      paragraphs: [
        'The most comfortable months for a Merzouga camp stay run from October to April, when daytime temperatures are pleasant and nights are cold but manageable. Summer nights are milder than the scorching days, but midday heat can be extreme.',
        'Whatever the season, pack layers: a desert night can drop sharply after sunset, even following a warm day. A light jacket, closed shoes and sun protection cover most needs.',
      ],
    },
    {
      heading: 'How to Choose the Right Merzouga Camp',
      paragraphs: [
        'Judge camps on the things that actually shape the night: tent size and bedding, whether bathrooms are private and en-suite, the quality of dinner, how far the camp sits from the village, and whether music evenings feel authentic or staged.',
        'On a private Morocco tour, the camp night is folded into a longer route — for example a three-day Sahara tour from Marrakech or a seven-day grand journey through the imperial cities and Erg Chebbi — so the camp, the trek and the drive all fit one seamless plan rather than a one-off excursion.',
      ],
    },
  ],

  'best-time-to-visit-morocco-sahara': [
    {
      heading: 'The Short Answer',
      paragraphs: [
        'Roughly October to April is the comfortable window for the Sahara around Merzouga — warm-to-mild days and cool nights. Summer (June to August) brings extreme daytime heat that makes dune walking and camel trekking unpleasant; winter (December to February) gives mild, clear days but genuinely cold desert nights.',
        'There is no single "best" month so much as a trade-off between crowds and comfort: October and April hit the sweet spot of warm days and manageable nights, which is exactly why they are also the busiest.',
      ],
    },
    {
      heading: 'Why the Desert Runs Hot and Cold in the Same Day',
      paragraphs: [
        'Sand has almost no capacity to hold heat, so it loses warmth fast once the sun drops. That is why a Sahara day can swing from a hot afternoon to a genuinely cold evening within a few hours — the single biggest planning factor for what to wear and when to trek.',
      ],
    },
    {
      heading: 'Spring and Autumn: the Easiest Months',
      paragraphs: [
        'March to May and September to November are the shoulder seasons most local guides recommend first. Days warm quickly without becoming extreme, nights stay cool rather than cold, and camel treks work well at almost any hour. Book ahead for these months — European and North American travellers favour them for the same reasons.',
      ],
    },
    {
      heading: 'Can You Visit the Sahara in Summer?',
      paragraphs: [
        "You can, but daytime dune temperatures regularly pass 40°C (104°F), and most of the activity — trekking, 4x4 drives — shifts to early morning or sunset to avoid the worst of it. Summer only makes sense if your dates are fixed or you specifically want to experience the desert at its most extreme, and even then expect adjusted schedules around the heat.",
      ],
    },
    {
      heading: 'What About Winter?',
      paragraphs: [
        'December to February gives the clearest skies of the year — excellent for stargazing — and mild, walkable days. The trade-off is the nights: temperatures on the open sand can approach freezing, so a camp with real heating or thick blankets, and a traveller who packed a proper warm layer, matters more in winter than in any other season.',
      ],
    },
    {
      heading: 'Does Ramadan Change Anything?',
      paragraphs: [
        'Ramadan shifts with the lunar calendar, so it falls in a different month each year. Tours run normally throughout, though fewer town cafés open during daylight hours. Desert camps keep their usual evening programme — dinner, music, the fire — after sunset.',
      ],
    },
  ],

  'camel-trekking-etiquette-morocco': [
    {
      heading: 'What Actually Happens on a Camel Trek',
      paragraphs: [
        'Most treks into Erg Chebbi leave about an hour before sunset, crossing open gravel before climbing the first dune ridge as the light turns orange. The ride from the edge of the dunes to a desert camp typically takes 50 to 70 minutes each way, at a slow, steady pace with stops for photos.',
        'You ride a dromedary — a one-humped camel — led on foot by a local Berber cameleer from the Merzouga area, who handles the animal throughout. First-time riders are usually surprised by how unhurried it feels.',
      ],
    },
    {
      heading: 'Mounting and Riding: What First-Timers Should Know',
      paragraphs: [
        "The camel kneels to let you mount and dismount — lean back as it rises to its back legs first, and forward again as it stands on its front legs, since the motion is more pronounced than getting on a horse. Once moving, hold the front of the saddle rather than gripping tightly with your legs; the gait is a gentle side-to-side sway, not a bounce.",
        "You do not steer — the cameleer leads the animal on a rope, and the camels usually walk in a line, nose to tail. There is nothing to actively do beyond sitting comfortably and enjoying the ride.",
      ],
    },
    {
      heading: 'Is It Safe for Children or Nervous Riders?',
      paragraphs: [
        "Children typically ride with an adult or on a shorter lead camel, and nervous riders can simply say so — cameleers are used to first-timers and will walk more slowly or stay closer to your animal if asked. Anyone unable or unwilling to ride can usually join the camp by 4x4 instead; ask when you book.",
      ],
    },
    {
      heading: 'What to Wear for the Ride',
      paragraphs: [
        'Loose, breathable layers work best — the climb to the dune camp is in warm daylight, but the temperature drops fast once the sun sets. Closed shoes are easier to mount in than sandals, and a scarf or headwrap (bought locally in Merzouga is fine) keeps blown sand off your face.',
      ],
    },
    {
      heading: 'Respecting the Cameleers and the Animals',
      paragraphs: [
        "The cameleers are local Berber guides whose families have worked this stretch of dunes for generations — follow their lead on pacing and photo stops, and ask before feeding or touching an animal that is not your own. A tip for the cameleer at the end of a trek is customary and appreciated, though never required.",
      ],
    },
    {
      heading: 'Sunset or Sunrise — Which Should You Choose?',
      paragraphs: [
        'The sunset trek is the classic choice: warm light, long shadows across the dunes, and a direct route into the evening camp programme. The sunrise ride out the next morning is quieter and cooler, often the most photogenic part of the whole stay. Most overnight camp stays include both as a matter of course.',
      ],
    },
  ],

  'marrakech-to-merzouga-roadtrip': [
    {
      heading: 'The Route in One Paragraph',
      paragraphs: [
        "Marrakech and Merzouga are connected by a single practical corridor: south over the High Atlas on the Tizi n'Tichka pass road, down to Aït Ben Haddou and Ouarzazate, east through the Dades Valley, past the Todra Gorge and the Rissani/Tafilalet area, and on to Merzouga at the foot of the Erg Chebbi dunes. It is a genuine overland journey — the road is part of the experience, not just a transfer between two points.",
      ],
    },
    {
      heading: 'Crossing the High Atlas',
      paragraphs: [
        "Leaving Marrakech, the road climbs quickly into the High Atlas on the Tizi n'Tichka pass, with Berber villages terraced into the slopes and viewpoints worth a stop. This is the first sign that the landscape — and the climate — is about to change completely.",
      ],
    },
    {
      heading: 'Aït Ben Haddou: the Journey\'s First Landmark',
      paragraphs: [
        "On the far side of the pass sits Aït Ben Haddou, a UNESCO World Heritage earthen ksar and one of southern Morocco's most striking sights — the moment the route turns unmistakably pre-Saharan. Ouarzazate, just beyond it, is Morocco's film-studio capital and usually a lunch stop rather than an overnight.",
      ],
    },
    {
      heading: 'Dades Valley and Todra Gorge',
      paragraphs: [
        'The road continues through the Dades Valley — kasbahs, rose-growing villages and switchback mountain roads — a natural place to break the journey with an overnight. The Todra Gorge, with its towering rock walls and walkable canyon floor, follows the next day on the way toward Merzouga.',
      ],
    },
    {
      heading: 'Arriving in Merzouga: the Desert Day',
      paragraphs: [
        'The final stretch runs through Rissani and the Tafilalet, the historic heart of Morocco\'s desert trade routes, before reaching Merzouga itself. From here the day follows a classic pattern: meet the camel team at the dune line in the afternoon, trek into Erg Chebbi for sunset, and spend the night at a desert camp between the dunes before a sunrise return the next morning.',
      ],
    },
    {
      heading: '3 Days or 4? Choosing Your Pace',
      paragraphs: [
        'Three days is the shortest format we consider genuinely practical: day one over the Atlas to the Dades area, day two through Todra Gorge to the dunes for the sunset trek and camp night, day three the return to Marrakech. It works, but it is an honestly full schedule.',
        'Four days changes the character of the trip — the return stops being a marathon, and there is room for a proper half-day around Merzouga itself before heading back. If your dates allow it, this is the version most travellers end up preferring.',
      ],
    },
  ],

  'morocco-packing-list-desert': [
    {
      heading: 'Pack for Two Climates in One Day',
      paragraphs: [
        "A Sahara day trip or camp night covers hot sun on the dunes and a cool — sometimes cold — desert evening, often within the same few hours. The packing list below is built around that swing, not a generic warm-country list.",
      ],
    },
    {
      heading: 'Clothing: the Layering Rule',
      paragraphs: [
        'A breathable top and loose trousers handle the daytime heat; a warm fleece or light down layer is the single most useful item once the sun goes down, especially October to March when desert nights drop well below daytime comfort. Pack a sun hat for the day and a warmer hat for the evening.',
      ],
    },
    {
      heading: 'Footwear and Sun Protection',
      paragraphs: [
        'Closed, comfortable shoes beat sandals on hot sand and when climbing dunes — a pair with reasonable grip helps on the loose slopes. Sunglasses (wrap-around styles cut down on blown dust) and SPF 30+ matter even when the air feels cool.',
      ],
    },
    {
      heading: 'What to Bring for the Camel Trek and Camp Night',
      paragraphs: [
        'Only a small bag travels with you on the camel trek — main luggage usually stays with the vehicle. A headlamp or small flashlight is genuinely useful since camps turn off lights after midnight, and a charged power bank matters more than any extra camera gear.',
      ],
    },
    {
      heading: 'What NOT to Pack',
      paragraphs: [
        'Heavy suitcases, valuable jewellery and anything that depends on a power outlet during the trek itself — you will be away from the vehicle for the camp night, so a headlamp and power bank are the safer bet. Keep what goes on the camel to one light overnight bag.',
      ],
    },
  ],

  'fes-chefchaouen-blue-city-guide': [
    {
      heading: 'Why Travellers Pair Fes with Chefchaouen',
      paragraphs: [
        "Fes is Morocco's cultural and spiritual capital — home to Al-Qarawiyyin, the world's oldest continuously operating university, and Fes el-Bali, one of the largest living medieval medinas on earth. Chefchaouen, a blue-washed mountain town in the Rif, is a genuinely different register: slower, cooler and built for wandering rather than sightseeing by checklist. The two sit naturally in the same northern Morocco itinerary rather than a Sahara-focused one.",
      ],
    },
    {
      heading: 'A Full Day in Fes el-Bali',
      paragraphs: [
        "Fes el-Bali's thousands of alleys are genuinely easy to get lost in, which is why a local guide earns their keep here. The Chouara Tannery's dye pits, the carved cedar of the Medersa Bou Inania, and the monumental Bab Bou Jeloud gate are the anchors most itineraries build around.",
      ],
    },
    {
      heading: "What to See in Chefchaouen's Blue Medina",
      paragraphs: [
        'The appeal is the whole medina, not one landmark — every lane and stairwell washed in shades of blue from powder to indigo. Plaza Uta el-Hammam is the natural centre for a rooftop lunch, and the climb to the Spanish Mosque viewpoint at sunset is the classic way to see the blue town from above.',
      ],
    },
    {
      heading: 'Beyond the Blue Streets: Akchour',
      paragraphs: [
        "For travellers with an extra half or full day, the Akchour valley outside Chefchaouen adds river pools, forested gorges and a hike to the natural stone arch known as God's Bridge — a cooler, wilder contrast to the medina.",
      ],
    },
    {
      heading: 'How This Fits a Private Morocco Itinerary',
      paragraphs: [
        "Chefchaouen sits on the northern route between Tangier, Fes and the coast, so it pairs naturally with imperial-cities travel rather than a desert route. Several of our private itineraries already link the two — the 5-day Imperial Cities route visits Fes before continuing toward Chefchaouen, and our Casablanca-departure routes can include a Chefchaouen night as part of a longer northern loop.",
      ],
    },
  ],
  'marrakech-to-merzouga-3-day-sahara-tour': [
    {
      heading: "Why This Is Morocco's Classic Sahara Route",
      paragraphs: [
        "Ask any Morocco guide which route defines a Sahara trip and most will name the same one: Marrakech to Merzouga. It isn't the only way into the desert, but it's the most complete — one road that climbs a mountain range, drops into kasbah country, runs the length of two valleys, and ends at the base of Morocco's tallest dunes. The 3-day version is the shortest format that still covers all of it, which is also why it's the most frequently booked Sahara tour from Marrakech.",
        "What makes the route work isn't any single landmark — it's the sequence. Each day changes the scenery completely, so the desert at the end doesn't feel like an add-on; it feels like the payoff the whole drive was building toward. It suits first-time visitors to Morocco especially well, since in three days you see mountains, kasbah country and the Sahara without needing a second trip to cover the basics.",
      ],
    },
    {
      heading: 'Day One: Leaving the Red City Behind',
      paragraphs: [
        "The tour leaves Marrakech in the morning and climbs straight into the High Atlas on the Tizi n'Tichka Pass, the highest road pass in North Africa. Villages here are built into the slopes rather than beside them, and the switchback views back toward Marrakech are worth the first photo stop of the trip.",
        "On the far side of the pass, the landscape changes again at Aït Ben Haddou — a UNESCO World Heritage earthen ksar and, by most accounts, the best-preserved fortified village in southern Morocco. Climb to the hilltop granary above the ksar; the walk takes about twenty minutes and the view over the Ounila valley is the real reason to stop here rather than just photograph the walls from the road. From there the road continues through Ouarzazate — known internationally as a film-industry hub, with its studios and kasbahs usually seen as a brief stop rather than a destination on this particular format — before the first night in the Dades Valley.",
      ],
    },
    {
      heading: 'The Middle Stretch: Dades and Todra',
      paragraphs: [
        "The second day runs through two very different landscapes back to back. The Dades Valley is kasbah country — mudbrick villages, terraced fields and a valley road known for its switchbacks — while the Todra Gorge, a little further east, narrows into a canyon with rock walls that rise for hundreds of metres on either side. Both are brief stops on a 3-day itinerary rather than full days in themselves, but they mark the point where southern Morocco stops looking like the Atlas foothills and starts looking like the edge of the Sahara.",
        "Todra in particular rewards getting out of the vehicle rather than photographing it from the road — the canyon floor stays in shade for much of the day even when the clifftops are blazing, and the short walk along the riverbed gives a sense of scale no photo quite captures.",
      ],
      image: { src: '/images/curated/todra-gorge-river-canyon-high-atlas.webp', alt: 'The Todra Gorge canyon walls between the Dades Valley and Merzouga' },
    },
    {
      heading: 'Arriving in the Dunes: What the Second Night Feels Like',
      paragraphs: [
        "By late afternoon on day two, the tour reaches Merzouga and the Erg Chebbi dunes — Morocco's tallest, and the reason most people book this route in the first place. From here the day follows the pattern every Sahara tour from Marrakech shares: a camel trek into the dunes timed for sunset, dinner at a desert camp, and a night under a sky with none of the light pollution a city gives you. If you haven't ridden a camel before, or want to know what to wear and how a trek actually works, [our camel trekking guide](/merzouga-guide/camel-trekking) covers that in more depth than fits here.",
        "What stands out on this particular route isn't the camp itself — it's the contrast. You spend two full days watching the landscape change through a vehicle window, then step onto sand for the first time right as the light turns gold. Guests consistently say that shift, more than any single stop along the way, is what they remember.",
        "The third day starts with sunrise over the dunes before the long return drive to Marrakech — the longest single day of driving on the route, which is worth knowing in advance rather than discovering at hour six.",
      ],
      image: { src: '/images/curated/berber-guide-camel-sahara-desert-merzouga.webp', alt: 'A Berber guide leading a camel across the Erg Chebbi dunes near Merzouga' },
    },
    {
      heading: 'What the Pace Actually Feels Like',
      paragraphs: [
        "The three days aren't evenly weighted, and knowing the shape in advance changes how you experience it. Day one is mostly transit with one real stop — the Atlas crossing and Aït Ben Haddou — so the energy of the day goes into that single stretch rather than several equal ones. Day two is the fullest day: Todra Gorge, the run to Merzouga and the sunset camel trek all land within a few hours of each other, which is where the trip actually feels busy. Day three is the opposite — a quiet sunrise, then a long, mostly uninterrupted drive back with nothing scheduled beyond the return itself.",
        "If something has to give within this pace, protect the desert night rather than any one roadside stop. Aït Ben Haddou and Todra already have their moment earlier in this guide; the rest of the driving is genuinely scenery rather than a series of attractions each asking for separate time, so there's little lost by treating it that way.",
        "This shape tends to suit travelers fitting Morocco into a longer trip with fixed dates on either side — a stop on a wider itinerary rather than the only thing on the calendar. If Morocco is the whole trip and your dates are flexible, the extra time on the [4-day version](/tours/4-day-marrakech-merzouga-sahara) or the [5-day Great South route](/tours/5-day-great-south-morocco) buys you exactly what this pace doesn't have: room to slow down at the stops that already stood out on day one and two, instead of moving past them on schedule.",
        "A private driver-guide also changes what the pace can realistically include, compared with a rental car or shared minibus — stops are timed around light and crowds rather than a fixed schedule, so the rhythm above adjusts a little around your own group rather than being fixed in advance.",
      ],
    },
  ],

  'fes-to-merzouga-sahara-desert-tour': [
    {
      heading: 'A Different Door Into the Sahara',
      paragraphs: [
        "Travelers who reach the Sahara from Fes notice something the Marrakech route doesn't offer: the desert doesn't arrive after one dramatic mountain crossing, it arrives in stages, with no single iconic stop anchoring the drive the way Aït Ben Haddou anchors the Marrakech route. The drama here is cumulative rather than a postcard moment — which changes what the drive feels like more than it changes how long it takes.",
        "That shape makes it a natural fit for travelers who are already building a northern Morocco itinerary — Fes itself, or a stop in Chefchaouen beforehand — and want the desert folded into that trip rather than treated as a separate journey through Marrakech. Because the route doesn't pass the well-known southern landmarks, it rewards travelers who are drawn to the landscape change itself and the desert at the end of it, not to a checklist of famous stops along the way.",
      ],
    },
    {
      heading: 'Through the Middle Atlas: Ifrane and the Cedar Forest',
      paragraphs: [
        "The first stretch out of Fes climbs into the Middle Atlas to Ifrane, a town travelers are rarely prepared for — sloped slate roofs and pine forest give it a distinctly alpine feel, a look that dates back to the French-built town of the 1930s. The cedar forests around nearby Azrou are home to wild Barbary macaques, and a short stop here is a quick reminder of how much Morocco's landscapes shift in a single day — mountain forest in the morning, desert by the following afternoon.",
        "In winter the same stretch can carry snow on the roadside near Ifrane and the Mischliffen slopes, which surprises travelers who pictured only desert for a Morocco trip — one more reason this route feels like two countries in one drive rather than a single climate the whole way.",
      ],
      image: { src: '/images/dest/ifrane.webp', alt: "Ifrane's alpine-style architecture and cedar forest in the Middle Atlas" },
    },
    {
      heading: 'The Ziz Valley: Where the Desert Begins',
      paragraphs: [
        "South of Midelt, the road follows the Ziz Valley, where a ribbon of palm groves and villages runs along the river through an increasingly dry, open landscape. This is the stretch where the mountains finally give way to the pre-Sahara — the vegetation thins, the colors shift to ochre and rust, and the towns start to look built for heat rather than altitude. The valley floor itself stays green for a surprisingly long stretch, a reminder that this whole corridor exists because of the river rather than in spite of the desert around it.",
        "By the time the road reaches Erfoud and Rissani, the historic market town at the edge of the Tafilalt, you're unmistakably in desert country. Rissani's historic weekly market still draws villages from across the area — if the tour's timing lines up with a market day, it's a worthwhile stop before the final approach to Merzouga.",
      ],
    },
    {
      heading: 'Reaching Erg Chebbi',
      paragraphs: [
        "The dunes appear at the end of the second day's drive, and from here the route folds into the same desert experience every Merzouga tour shares: a camel transfer into Erg Chebbi timed for sunset, dinner at a desert camp, and a night in the dunes. If camel trekking is new to you, [our dedicated guide](/merzouga-guide/camel-trekking) covers mounting, pacing and what to wear in more depth than fits into a route overview.",
        "What's worth noting about arriving this way, from the north, is the contrast — you've spent a day and a half watching forest and farmland give way to open valley, so the dunes themselves land harder than they might after a shorter southern approach.",
        "Sunrise the next morning is the quieter counterpart to the previous evening's trek — fewer camps are up and moving, and the light on the dune crests tends to last longer before the heat of the day sets in.",
      ],
      image: { src: '/images/dest/erg-chebbi.webp', alt: 'The dunes of Erg Chebbi near Merzouga at the end of the Fes to Merzouga route' },
    },
    {
      heading: 'Who Benefits From Approaching This Way',
      paragraphs: [
        "This direction suits travelers whose Morocco trip starts in the north rather than Marrakech — arriving into Fes, or combining the desert with Chefchaouen and the Rif beforehand — more than it suits anyone comparing routes purely on distance. Expect two full driving days with the landscape doing most of the work rather than a string of scheduled stops; the reward is in what passes outside the window as much as in where the vehicle parks.",
        "It also suits travelers who don't need the route to double as a greatest-hits tour of southern Morocco. Aït Ben Haddou, the Dades Valley and Todra Gorge aren't on this itinerary — if seeing them matters as much as reaching the dunes, [the 4-day Fes to Marrakech route](/tours/4-day-fes-marrakech-via-merzouga) adds them on the way south instead of backtracking to Fes, trading the northern approach for a one-way journey across the whole country.",
      ],
    },
  ],

  'marrakech-ouarzazate-merzouga-great-south-morocco': [
    {
      heading: "What 'The Great South' Actually Means",
      paragraphs: [
        "Morocco Grand Adventure borrowed the name for this itinerary from the region itself — the string of valleys, kasbah towns and desert country that run south and east of the High Atlas, beyond what most 3-day Sahara tours have time to cover. It follows the same corridor used by the quicker desert routes, but the 5-day format builds in more time there instead of pushing straight through to Merzouga and back.",
        "If you've already read about the classic 3-day Marrakech-to-Merzouga route, think of this as its slower, more complete cousin: the same opening days, then a genuinely different return. It tends to suit travelers who have already spent a few days in Marrakech itself and are looking for the fuller southern Morocco trip rather than the fastest way to see a dune.",
      ],
    },
    {
      heading: 'Ouarzazate and the Kasbah Road',
      paragraphs: [
        "The route follows the same opening as the shorter Sahara tours — the Tizi n'Tichka Pass, then Aït Ben Haddou — before reaching Ouarzazate, known locally and internationally as Morocco's film capital. Lawrence of Arabia, Gladiator and Game of Thrones have all used its studios and surrounding desert light, and the Taourirt Kasbah in town is worth a stop in its own right. On a 5-day itinerary, Ouarzazate gets treated as what it actually is — a waypoint with its own things worth seeing — rather than a lunch stop on the way to somewhere else.",
        "The Atlas Film Studios sit just outside town and, light schedules allowing, make an easy add-on to the kasbah visit — a reminder of why this stretch of desert light drew filmmakers here in the first place, long before it became a tour route.",
      ],
    },
    {
      heading: 'Dades and Todra, at a Slower Pace',
      paragraphs: [
        "The route continues through the Dades Valley and Todra Gorge much as the 3-day version does — the kasbah country, the switchback road, the canyon walls — but with an overnight built around the Dades Valley rather than a brief pass-through. The difference here is pacing rather than destination; travelers who want the fuller description of this stretch will find it in our guide to the 3-day Marrakech–Merzouga tour.",
        "That extra time matters most at Todra, where a short walk into the canyon floor — rather than a photo stop from the roadside — is the difference between seeing the gorge and actually feeling the scale of its rock walls.",
      ],
    },
    {
      heading: 'Merzouga and a Slower Sahara Day',
      paragraphs: [
        "Where the 3-day tour reaches Merzouga for a single overnight, the 5-day route holds a full day around Erg Chebbi — room for dune viewpoints beyond the standard camel-trek corridor, a visit to Rissani and its historic market, and time around the small communities that live at the edge of the erg. Khamlia, a small village south of Merzouga known for its Gnawa music evenings, is sometimes included on this slower day when timing allows — a cultural stop that a 3-day schedule rarely has room for. It's still the same desert experience at its core, a sunset camel trek and a night at camp, but without the next morning's long drive hanging over it.",
      ],
      image: { src: '/images/dest/merzouga.webp', alt: "Merzouga at the edge of Erg Chebbi, Morocco's Sahara gateway" },
    },
    {
      heading: 'The Return Less Traveled: Draa Valley and Nkob',
      paragraphs: [
        "This is where the Great South route genuinely diverges from a standard Sahara tour. Instead of retracing the Dades road back to Marrakech, the route heads west from Merzouga through Alnif and Nkob — a remote village known locally as the village of kasbahs, tucked into the foothills of the Jbel Saghro — before joining the Draa Valley, Morocco's longest river valley and its greatest stretch of continuous palm oasis.",
        "The Draa road runs past ancient ksour and working palm groves for well over a hundred kilometres before rejoining the route toward Ouarzazate and back over the Atlas to Marrakech. Few 3-day itineraries touch this stretch at all — it's a quieter, more agricultural landscape than the dune country, and for travelers who want to see rural, working southern Morocco rather than only its landmark stops, it's the most distinctive part of the trip.",
      ],
      image: { src: '/images/catalog/draa-valley-oasis-palm-grove.webp', alt: "Palm groves along the Draa Valley on the return leg of the Great South route" },
    },
    {
      heading: 'Why Five Days Instead of Three',
      paragraphs: [
        "The honest comparison: the 3-day tour covers the essential Sahara route efficiently and suits a tight schedule. The 5-day Great South adds a slower Sahara day, a genuinely different return corridor through the Draa Valley and Nkob, and noticeably less time spent purely in transit each day. If your main goal is simply to reach the dunes and back within a short window, three days does the job. If you have the extra two days and want southern Morocco to feel like a region you explored rather than a road you drove, this is the version worth choosing — and as a private itinerary, the exact balance between kasbah time, desert time and valley time can still be adjusted around what your group actually wants to see.",
      ],
    },
  ],

  'morocco-first-time-visitor-mistakes': [
    {
      heading: 'Not Agreeing on a Taxi Fare Before You Get In',
      paragraphs: [
        "Petit taxis in Moroccan cities often run without a working meter, or the meter stays conveniently \"broken\" once a tourist gets in. The fix is simple: ask the approximate fare, or agree on a price, before the car moves — not after you arrive. Locals do this as a matter of course; it isn't rude, it's normal.",
        "If a driver won't agree on a number upfront, it's easier to wait for the next taxi than to argue over the price at your destination. For a fuller picture of taxis, trains and inter-city transport, see our [guide to getting around Morocco](/travel-info/getting-around-morocco).",
      ],
    },
    {
      heading: 'Expecting Fixed Prices in the Souks',
      paragraphs: [
        "Prices in Marrakech's and Fes's souks are a starting point for negotiation, not a fixed number — this applies to rugs, lanterns, leather goods and most handicrafts, though not to fixed-price shops or modern stores. Visitors who pay the first number offered, or who feel too awkward to negotiate at all, routinely pay well above what a Moroccan shopper would.",
        "Bargaining is a normal, expected part of the exchange rather than a confrontation — a smile and a counter-offer go further than silence. Our [souks and shopping guide](/travel-info/moroccan-souks-shopping-guide) walks through how the back-and-forth actually works.",
      ],
      image: { src: '/images/personal/marrakech-souk-textiles.webp', alt: 'A Marrakech medina alley lined with textiles and handicraft stalls' },
    },
    {
      heading: 'Underestimating How Long Journeys Between Cities Take',
      paragraphs: [
        "Morocco looks compact on a map, but mountain passes, single-lane roads and desert distances mean journeys take longer than the straight-line distance suggests. A route that looks like a two-hour drive on paper can comfortably take four or five once the High Atlas is involved.",
        "Build slack into the itinerary rather than stacking back-to-back stops on the same day — our [Marrakech to Merzouga road trip guide](/blog/marrakech-to-merzouga-roadtrip) shows how the classic desert route is usually paced over several days rather than driven in one push.",
      ],
    },
    {
      heading: 'Packing Only for Daytime Heat, Not Desert and Mountain Nights',
      paragraphs: [
        "Morocco's daytime heat — especially in summer — leads many first-time visitors to pack only light clothing. But desert and mountain nights drop sharply once the sun sets, even after a hot day, and a sudden cold evening in the Sahara or the Atlas catches people out every season.",
        "A warm layer, closed shoes and a scarf cover most of what catches people off guard. See our [Morocco packing guide](/travel-info/what-to-pack-morocco) or the more detailed [desert packing list](/blog/morocco-packing-list-desert) for a full breakdown.",
      ],
    },
    {
      heading: 'Dressing in a Way That Draws Unwanted Attention',
      paragraphs: [
        "Morocco is more relaxed about dress than visitors sometimes expect, especially in Marrakech and coastal cities, but shoulders and knees covered is still the more comfortable choice in medinas, smaller towns and rural areas, for any gender. It isn't about strict rules — it's about blending in rather than standing out.",
        "Modest, breathable layers also happen to be the most practical option in the heat, so there's rarely a real trade-off between comfort and dressing sensibly.",
      ],
    },
    {
      heading: "Not Saving Your Riad's Exact Directions Before You Arrive",
      paragraphs: [
        "Most riads sit inside a medina's narrow alleys, which have no street address a taxi or GPS can simply drive to. Arriving late in the evening without a saved phone number, a pickup arranged, or at least a description of the nearest landmark turns a tired first night into unnecessary stress.",
        "Save your riad's contact number and exact arrival instructions in your phone before you travel, not after you land.",
      ],
    },
    {
      heading: 'Treating Every Offer of Help as a Scam',
      paragraphs: [
        "Guidebooks warn so heavily about unofficial guides and street hustlers that some first-time visitors end up refusing every friendly interaction, which can come across as rude and makes the trip more guarded than it needs to be. Most people who say hello in the medina are simply being friendly.",
        "A polite, firm \"no, thank you\" handles unwanted offers without hostility. Our [Morocco travel safety guide](/travel-info/morocco-travel-safety) and [Marrakech safety guide](/travel-info/marrakech-safety-guide) cover what's actually worth watching for, and what isn't.",
      ],
    },
    {
      heading: 'Photographing People Without Asking',
      paragraphs: [
        "A striking doorway or a market stall is fair game, but photographing a person — especially in smaller towns — without asking first is a common first-time misstep. Some people are happy to be photographed; others clearly aren't, and it isn't always obvious which from a distance.",
        "A quick gesture or a smiling \"may I?\" before raising the camera is a small habit that avoids an awkward moment. Our [guide to Amazigh and Berber culture](/travel-info/amazigh-berber-culture) has more on the traditions behind what you'll see.",
      ],
    },
    {
      heading: 'Not Checking Opening Hours Around Friday',
      paragraphs: [
        "Friday is the main day of communal prayer, and in smaller towns some shops and restaurants close or pause around midday as a result — a detail that rarely shows up in opening-hours listings. It's far less noticeable in Marrakech or Casablanca than in a small Atlas or desert town.",
        "It's rarely a problem once you know to expect it — our [Morocco basics guide](/travel-info/morocco-basics) covers this alongside the other everyday practicalities worth knowing before you go.",
      ],
    },
    {
      heading: 'Assuming Tap Water Is Fine Everywhere',
      paragraphs: [
        "Tap water in Morocco's main cities is treated, but most visitors' stomachs aren't used to the local mineral content, and the safer default is bottled or filtered water throughout the trip, including for brushing teeth in smaller towns.",
        "It's a minor habit, not a reason to worry — bottled water is sold everywhere. Our [guide to Moroccan food and cuisine](/travel-info/moroccan-food-and-cuisine) covers more of what to expect at the table.",
      ],
    },
  ],
};

/** Contextual CTA for articles that have a body. Rendered with links by each consumer. */
export type BlogCta = { text: string; links: { to: string; label: string }[] };

export const BLOG_ARTICLE_CTA: Record<string, BlogCta> = {
  'merzouga-luxury-desert-camp-guide': {
    text: 'Ready to spend a night among the dunes? Explore our Sahara desert tours, luxury camp experiences and camel trekking, or start with a classic route:',
    links: [
      { to: '/desert-tours', label: 'Sahara Desert Tours' },
      { to: '/luxury-camp', label: 'Luxury Desert Camp' },
      { to: '/camel-trekking', label: 'Camel Trekking' },
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Sahara Tour from Marrakech' },
    ],
  },
  'best-time-to-visit-morocco-sahara': {
    text: 'For the full month-by-month breakdown, or to plan a trip around the right season, explore our Sahara guides and tours:',
    links: [
      { to: '/merzouga-guide/best-time-to-visit', label: 'Full Month-by-Month Merzouga Guide' },
      { to: '/desert-tours', label: 'Sahara Desert Tours' },
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Sahara Tour from Marrakech' },
    ],
  },
  'camel-trekking-etiquette-morocco': {
    text: 'Ready to try it yourself? Read our full camel trekking guide or explore the Sahara tours that include a sunset trek and camp night:',
    links: [
      { to: '/merzouga-guide/camel-trekking', label: 'Full Camel Trekking Guide' },
      { to: '/camel-trekking', label: 'Camel Trekking' },
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Sahara Tour from Marrakech' },
    ],
  },
  'marrakech-to-merzouga-roadtrip': {
    text: 'Explore the full route guide, or choose the itinerary that fits your dates:',
    links: [
      { to: '/merzouga-guide/marrakech-to-merzouga', label: 'Full Marrakech–Merzouga Route Guide' },
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Sahara Tour from Marrakech' },
      { to: '/tours/4-day-marrakech-merzouga-sahara', label: '4-Day Marrakech to Merzouga Tour' },
    ],
  },
  'morocco-packing-list-desert': {
    text: 'For the complete item-by-item list, or to start planning your Sahara trip:',
    links: [
      { to: '/merzouga-guide/what-to-pack', label: 'Full Merzouga Packing List' },
      { to: '/desert-tours', label: 'Sahara Desert Tours' },
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Sahara Tour from Marrakech' },
    ],
  },
  'fes-chefchaouen-blue-city-guide': {
    text: 'Explore Fes and Chefchaouen in more depth, or see the private itineraries that connect them:',
    links: [
      { to: '/destinations/fes', label: 'Fes Destination Guide' },
      { to: '/destinations/chefchaouen', label: 'Chefchaouen Destination Guide' },
      { to: '/tours/5-day-imperial-cities', label: '5-Day Imperial Cities & Desert Tour' },
    ],
  },
  'marrakech-to-merzouga-3-day-sahara-tour': {
    text: 'Planning this route? Explore the private 3-day Marrakech to Merzouga tour and request a personalized quote, or compare it with the 4-day version if you would rather take it slower:',
    links: [
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Marrakech to Merzouga Sahara Tour' },
      { to: '/tours/4-day-marrakech-merzouga-sahara', label: '4-Day Marrakech to Merzouga Tour' },
      { to: '/merzouga-guide/marrakech-to-merzouga', label: 'Full Marrakech–Merzouga Route Guide' },
    ],
  },
  'fes-to-merzouga-sahara-desert-tour': {
    text: 'Planning this route? Explore the private Fes to Merzouga tour and request a personalized quote, or see the one-way version to Marrakech if you would rather finish the trip in the south:',
    links: [
      { to: '/tours/3-day-fes-merzouga-sahara', label: 'Fes to Merzouga Sahara Tour' },
      { to: '/tours/4-day-fes-marrakech-via-merzouga', label: '4-Day Fes to Marrakech via Merzouga' },
      { to: '/merzouga-guide/fes-to-merzouga', label: 'Full Fes–Merzouga Route Guide' },
    ],
  },
  'marrakech-ouarzazate-merzouga-great-south-morocco': {
    text: 'Planning this route? Explore the private 5-day Great South Morocco tour and request a personalized quote, or compare it with the shorter 3-day Marrakech to Merzouga route:',
    links: [
      { to: '/tours/5-day-great-south-morocco', label: '5-Day Great South Morocco Tour' },
      { to: '/tours/3-day-sahara-marrakech', label: '3-Day Marrakech to Merzouga Sahara Tour' },
      { to: '/destinations/draa-valley', label: 'Draa Valley Destination Guide' },
    ],
  },
  'morocco-first-time-visitor-mistakes': {
    text: 'Want the fuller picture before you go? Our practical Morocco travel guides cover each of these in more depth, or start planning your own route:',
    links: [
      { to: '/travel-info/moroccan-souks-shopping-guide', label: 'Souks & Bargaining Guide' },
      { to: '/travel-info/getting-around-morocco', label: 'Getting Around Morocco' },
      { to: '/travel-info/morocco-travel-safety', label: 'Morocco Travel Safety' },
      { to: '/trip-builder', label: 'Plan Your Trip' },
    ],
  },
};