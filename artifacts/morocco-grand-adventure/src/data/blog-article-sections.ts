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
 */
export type BlogSection = { heading: string; paragraphs: string[] };

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
};