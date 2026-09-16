// ─────────────────────────────────────────────────────────────────────────────
// Student Tours — dedicated student-tour products.
//
// These are a SEPARATE product family from the canonical private tours in
// src/data/content.ts. IDs are deliberately distinct (`*-morocco-student-tour`)
// so they can never collide with a private tour ID, and the Student Tours hub
// links only into this family.
//
// Content rules applied here: no invented hotels, universities, partnerships,
// prices, statistics, certifications, testimonials or named guides. Where an
// operational detail is not fixed, the copy says so plainly rather than
// inventing a guarantee. Imagery is limited to the authentic Morocco Grand
// Adventure library already in public/images/student-tours/.
// ─────────────────────────────────────────────────────────────────────────────

export type StudentTourImage = {
  /** Base filename in public/images/student-tours (no extension). */
  name: string;
  alt: string;
  w: number;
  h: number;
  /** Responsive widths that actually exist on disk for this asset. */
  widths: number[];
};

export type StudentTourDay = {
  day: string;
  title: string;
  /** Editorial prose — the main story of the day. */
  body: string[];
  /** Compact supporting facts. Kept short on purpose. */
  notes?: string[];
};

export type StudentTourFaq = { q: string; a: string };

export type StudentTour = {
  slug: string;
  /** Short label used on cards, e.g. "3 Days". */
  duration: string;
  /** Page/product title. */
  title: string;
  /** One-line card description. */
  cardSummary: string;
  /** Hero supporting sentence — unique per tour. */
  heroLead: string;
  hero: StudentTourImage;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  overview: {
    start: string;
    end: string;
    regions: string;
    style: string;
    groups: string;
  };
  /** Why the itinerary works for a student group. */
  whyStudents: string[];
  itinerary: StudentTourDay[];
  /** Concrete experiences that are actually part of this itinerary. */
  experiences: { title: string; body: string }[];
  /** How the route exposes students to real subjects. */
  learning: { subject: string; body: string }[];
  /** Optional "a day in the journey" editorial beat. */
  dayInTheJourney?: { label: string; body: string }[];
  groupExperience: string[];
  included: string[];
  notIncluded: string[];
  practical: { title: string; body: string }[];
  support: string[];
  faqs: StudentTourFaq[];
  /** Key destinations shown on the hub card. */
  keyPlaces: string[];
  /** Contextual internal links (existing routes only). */
  related: { to: string; label: string }[];
};

const GROUPS = 'Organized for student and university groups of 15 or more participants.';

// ── 3-Day ────────────────────────────────────────────────────────────────────
const threeDay: StudentTour = {
  slug: '3-day-morocco-student-tour',
  duration: '3 Days',
  title: '3-Day Morocco Student Tour',
  cardSummary:
    'Marrakech to the dunes of Erg Chebbi and back, built for groups with a short window and a long list of things they want to see.',
  heroLead:
    'Three days is enough to cross the High Atlas, stand inside a mud-brick ksar that has been filmed a hundred times, and sleep in the Sahara — if the route is planned around the driving rather than around a brochure.',
  hero: {
    name: 'students-erg-chebbi-dunes',
    alt: 'Student group walking the crest of a dune at Erg Chebbi in the Moroccan Sahara',
    w: 1599,
    h: 984,
    widths: [480, 768, 1280],
  },
  metaTitle: '3-Day Morocco Student Tour | Marrakech, Atlas & Sahara',
  metaDescription:
    'A three-day student route from Marrakech over the High Atlas to Aït Ben Haddou and the Erg Chebbi dunes at Merzouga. For university groups of 15+.',
  overview: {
    start: 'Marrakech',
    end: 'Marrakech',
    regions: 'High Atlas · Ounila Valley · Dades Valley · Erg Chebbi / Merzouga',
    style: 'Overland route with one night in the desert',
    groups: GROUPS,
  },
  whyStudents: [
    'A short program forces honest choices. This route spends its time on the one transition that students remember — the crossing from a crowded imperial city, over a mountain pass, into open desert — instead of collecting as many stops as the map allows.',
    'Everything on the itinerary is on the road between Marrakech and Merzouga, so the group is not doubling back or losing half a day to a detour. The drive itself is part of the subject matter.',
    'It suits a group with a fixed academic calendar: a long weekend, a break between terms, or an add-on to a longer stay somewhere else in the country.',
  ],
  itinerary: [
    {
      day: 'Day 1',
      title: 'Over the High Atlas to the Ounila Valley',
      body: [
        'The group leaves Marrakech early, while the city is still loading itself into vans and scooters. Within an hour the road begins to climb, and the change is fast enough that students notice it from the window — flat palm ground gives way to switchbacks, then to bare rock, then to villages built in terraces on slopes that look too steep to farm.',
        'The route crosses the Tizi n\'Tichka pass. There are stops to get out, look back at where the road came from, and take the photographs everyone will take. On the far side the landscape turns red and dry, and the architecture changes with it: flat roofs, rammed earth, walls the same color as the ground they stand on.',
        'By afternoon the group reaches Aït Ben Haddou. It is a ksar — a fortified village of earthen buildings stacked up a hillside above a river — and walking up through it is the fastest way to understand why it was built the way it was. From the top, the valley reads as a defensive position rather than a view. The group continues toward the Dades Valley for the night.',
      ],
      notes: ['Tizi n\'Tichka pass', 'Aït Ben Haddou ksar', 'Overnight in the Dades Valley area'],
    },
    {
      day: 'Day 2',
      title: 'Gorges, palm groves, and the first sight of the dunes',
      body: [
        'The second day is the one where students stop thinking of Morocco as a single place. The road follows valleys where a thin green line of palms runs along the water and everything outside that line is stone. The contrast is unmissable, and it explains settlement patterns better than any diagram.',
        'The group moves through the Dades and Todra areas, where the rock closes in and the road narrows between cliff walls. There is time to walk, to hear how sound behaves between the rock faces, and to see how villages use the water that comes through.',
        'Late in the afternoon the mountains fall away. The ground flattens, the color lightens, and the first dunes of Erg Chebbi appear on the horizon — at first low and uncertain, then unmistakable. The group reaches Merzouga in time to go out to the dunes for the evening, and to spend the night at a desert camp under an open sky.',
      ],
      notes: ['Dades and Todra gorge country', 'Erg Chebbi dunes', 'Night at a desert camp'],
    },
    {
      day: 'Day 3',
      title: 'Sunrise on the sand, then the road back',
      body: [
        'Sunrise in the desert is worth the early alarm, and most groups find that it is the quietest they have been all trip. The light comes up fast, the dunes change color while students are still watching, and the temperature shifts noticeably within the hour.',
        'After breakfast the group begins the return toward Marrakech, retracing the great transition in reverse — desert, then gorges, then mountains, then the city. Seeing the same route in the opposite direction is genuinely useful: students recognize what they passed without noticing two days earlier.',
        'The group arrives back in Marrakech in the evening. Where the schedule allows, there is time for a short walk in the medina before the day ends.',
      ],
      notes: ['Sunrise over Erg Chebbi', 'Return crossing of the Atlas', 'Arrival Marrakech'],
    },
  ],
  experiences: [
    { title: 'Crossing the High Atlas', body: 'A mountain road with real elevation change, taken slowly enough to stop and look at it.' },
    { title: 'Aït Ben Haddou', body: 'An earthen ksar walked from the river up to the granary at the top, with the valley opening out behind.' },
    { title: 'Gorge and oasis country', body: 'Palm groves, irrigation channels and cliff-walled gorges through the Dades and Todra areas.' },
    { title: 'Erg Chebbi', body: 'Large dunes reached in the late afternoon, with time on the sand before dark.' },
    { title: 'A night in the desert', body: 'Dinner, music around the fire where the evening allows it, and a sky with no city light in it.' },
  ],
  learning: [
    { subject: 'Geography', body: 'The route is a single continuous transect: irrigated plain, mountain pass, arid plateau, gorge, erg. Students see the sequence rather than reading it.' },
    { subject: 'Architecture', body: 'Earthen construction is easiest to understand standing inside it — wall thickness, small openings, shaded courtyards, and why the material matches the ground.' },
    { subject: 'Water and settlement', body: 'Oasis agriculture makes the relationship between water access and where people live unusually legible.' },
    { subject: 'Amazigh culture', body: 'The valleys the route passes through are Amazigh, and language, craft and daily life differ from what the group saw in Marrakech.' },
  ],
  dayInTheJourney: [
    { label: 'Morning', body: 'Early departure, mountain road, stops to get out and look back at the pass.' },
    { label: 'Midday', body: 'Lunch on the route, then the change from mountain to pre-Sahara ground.' },
    { label: 'Late afternoon', body: 'The dunes appear. The group heads out onto the sand while the light is still low and warm.' },
    { label: 'Evening', body: 'Dinner at camp, time around the fire, and a long look at the sky before anyone goes to bed.' },
  ],
  groupExperience: [
    'Three days in a vehicle together does something a classroom does not. Students talk to people they would not normally sit next to, and by the second day the group has usually reorganized itself.',
    'The desert evening is the part most groups remember. There is no signal to compete with, dinner is shared, and the conversation tends to run much longer than anyone planned.',
  ],
  included: [
    'Private transport for the group for the full route, with a driver',
    'Accommodation for two nights, including one night at a desert camp',
    'Breakfasts, and dinners on the nights the group is with us',
    'A local guide accompanying the group',
    'Camel experience at Erg Chebbi where the group wants it',
  ],
  notIncluded: [
    'International and domestic flights',
    'Travel insurance',
    'Lunches and drinks unless agreed in the final program',
    'Personal spending, tips and optional activities',
    'Entrance fees to sites not listed in the confirmed itinerary',
  ],
  practical: [
    { title: 'Accommodation', body: 'Two nights: one in the valley country on the way out, one at a desert camp near Merzouga. Rooms and tents are shared in the configuration the group asks for; we confirm the arrangement before travel.' },
    { title: 'Transport', body: 'Private vehicles sized to the group. The driving days are real — this route covers long distances — and the schedule is built around that rather than hiding it.' },
    { title: 'Meals and dietary needs', body: 'Vegetarian, vegan, gluten-free and halal requirements can be arranged when the group tells us in advance. Send the list with numbers and we will confirm what is workable on each part of the route.' },
    { title: 'What to bring', body: 'Layers. Desert nights are much colder than the days, particularly outside summer. Closed shoes for walking on rock and sand, sun protection, a head covering, and a power bank.' },
    { title: 'Weather', body: 'Spring and autumn are the most comfortable for this route. Summer is hot in the pre-Sahara, and winter nights in the desert are cold — both are workable with the right preparation and a slightly adjusted daily rhythm.' },
  ],
  support: [
    'A Morocco Grand Adventure guide travels with the group for the full route, and the same team plans and runs the trip.',
    'Group leaders have a direct contact for the duration of the program rather than a call center.',
    'Our team is based in Merzouga, so the desert portion is run by people who live where the group is sleeping.',
    'Pace, stops and free time can be adjusted during the trip if the group needs it — tell the guide and we will work with it.',
  ],
  faqs: [
    { q: 'Is three days really enough to reach the Sahara from Marrakech?', a: 'Yes, and this route is built specifically for it. It is an honest three days with two long driving stretches. If your group wants more time on the ground and less time moving, the 4-day program is the better fit.' },
    { q: 'Can the itinerary be adapted for our university group?', a: 'Yes. Tell us the academic focus, the group size and your dates, and we will adjust stops, timing and the balance between travel and time on site.' },
    { q: 'What group sizes do you work with?', a: 'These programs are organized for groups of 15 or more. Larger groups are possible with more lead time, since vehicles and desert camp capacity need to be arranged in advance.' },
    { q: 'Can we start or end somewhere other than Marrakech?', a: 'Often yes. A one-way version finishing in another city changes the driving plan, so send us your arrival and departure points and we will tell you what the route looks like.' },
    { q: 'How much free time will students have?', a: 'This is the most scheduled of the three programs because of the distances. There is free time in the desert and, where the timing works, in Marrakech at the end. If you want more, the longer programs build it in.' },
    { q: 'How does a professor or group leader start planning?', a: 'Message us with your group size, home institution country, approximate dates and what you want students to get out of the trip. We will come back with a route and the practical detail behind it.' },
  ],
  keyPlaces: ['Marrakech', 'Tizi n\'Tichka', 'Aït Ben Haddou', 'Dades & Todra', 'Erg Chebbi'],
  related: [
    { to: '/destinations/ait-ben-haddou', label: 'Aït Ben Haddou' },
    { to: '/destinations/erg-chebbi', label: 'Erg Chebbi' },
    { to: '/merzouga-guide', label: 'Merzouga Guide' },
  ],
};

// ── 4-Day ────────────────────────────────────────────────────────────────────
const fourDay: StudentTour = {
  slug: '4-day-morocco-student-tour',
  duration: '4 Days',
  title: '4-Day Morocco Student Tour',
  cardSummary:
    'The same great crossing with a fourth day added where it matters most — more time in the desert and more room for the group to actually stop and look.',
  heroLead:
    'The fourth day is not an extra stop. It is the day that turns a fast transit into a trip students can process — a full desert morning, time in the oasis valleys, and an evening that is not cut short by tomorrow\'s drive.',
  hero: {
    name: 'camel-trek-erg-chebbi',
    alt: 'Camels crossing the dunes of Erg Chebbi in the late afternoon near Merzouga',
    w: 1280,
    h: 853,
    widths: [480, 768, 1280],
  },
  metaTitle: '4-Day Morocco Student Tour | Atlas, Oasis Valleys & Sahara',
  metaDescription:
    'A four-day student route from Marrakech to Aït Ben Haddou, the Dades and Todra valleys and two nights in the Erg Chebbi desert. For groups of 15+.',
  overview: {
    start: 'Marrakech',
    end: 'Marrakech',
    regions: 'High Atlas · Ounila Valley · Dades & Todra · Erg Chebbi / Merzouga',
    style: 'Overland route with extended time in the desert',
    groups: GROUPS,
  },
  whyStudents: [
    'The extra day goes where students get the most out of it: the desert. Instead of arriving at dusk and leaving at dawn, the group gets a full day around Erg Chebbi — time to walk the dunes properly, meet people who live out there, and be somewhere genuinely unfamiliar without watching the clock.',
    'It also takes the pressure off the driving. The same route is covered, but with more stops and fewer stretches where the answer to "can we get out here?" has to be no.',
    'For groups traveling a long way to reach Morocco, the fourth day is usually the difference between a trip students describe as rushed and one they describe in detail months later.',
  ],
  itinerary: [
    {
      day: 'Day 1',
      title: 'Marrakech, the pass, and the road into earthen Morocco',
      body: [
        'The group leaves Marrakech in the morning and climbs into the High Atlas. The road to the Tizi n\'Tichka pass is the first real event of the trip: the elevation change is obvious, the villages get smaller and more vertical, and students start asking how anyone farms a slope like that.',
        'On the southern side the palette changes completely. Red rock, flat-roofed villages, and kasbah walls that are the exact color of the hillside behind them. The group stops at Aït Ben Haddou and walks up through the ksar to the granary at the top.',
        'The day ends in the Dades Valley area. Arriving with light left means the group can walk a little before dinner rather than only seeing the place in the dark.',
      ],
      notes: ['Tizi n\'Tichka pass', 'Aït Ben Haddou', 'Overnight Dades Valley area'],
    },
    {
      day: 'Day 2',
      title: 'Gorge country, then the edge of the Sahara',
      body: [
        'A morning in the gorges. The rock closes in, the road follows the water, and the palm groves make the water visible in a way that a map never does. There is time to walk into a gorge rather than photograph it from the roadside.',
        'Through the afternoon the group moves southeast and the country opens out. The green line of the valleys thins, the horizon gets further away, and the ground turns pale and stony.',
        'Erg Chebbi appears late in the day. The group heads out to the dunes for the evening and spends the night at a desert camp — dinner, a fire, and the kind of sky that makes people stop talking for a while.',
      ],
      notes: ['Dades and Todra', 'Arrival Merzouga', 'First night at the desert camp'],
    },
    {
      day: 'Day 3',
      title: 'A full day in the desert',
      body: [
        'This is the day the three-day program does not have. The group wakes for sunrise and then has the whole day around Erg Chebbi instead of getting back in a vehicle.',
        'How the day is used depends on the group. It can include time with people who live in the desert rather than visiting it, a look at how a nomad camp is actually set up and moved, and the practical business of water, shade and livestock in a place with very little of the first two. Where the group wants more activity, the dunes also allow 4x4 and buggy time on the sand.',
        'Late afternoon is for the dunes again — the light is better and the heat has gone. The second night is at the camp, and because nobody is driving in the morning, the evening runs as long as the group wants it to.',
      ],
      notes: ['Sunrise over the dunes', 'Time with desert communities', 'Optional 4x4 or buggy on the sand', 'Second night at camp'],
    },
    {
      day: 'Day 4',
      title: 'The long road back, seen in reverse',
      body: [
        'The group leaves Merzouga after breakfast and heads back toward Marrakech. Running the route in the opposite direction is more interesting than it sounds — students spot the transitions they missed on the way out, and the mountains arrive as a surprise rather than a departure point.',
        'There are stops along the way, and lunch on the route. The group reaches Marrakech in the evening.',
      ],
      notes: ['Return crossing', 'Arrival Marrakech'],
    },
  ],
  experiences: [
    { title: 'Two nights in the Sahara', body: 'Enough time that the desert stops being a photo stop and starts being a place.' },
    { title: 'Aït Ben Haddou', body: 'An earthen ksar walked from bottom to top, in context above its river valley.' },
    { title: 'Gorges and palm groves', body: 'Dades and Todra, with time to walk in rather than drive past.' },
    { title: 'Meeting desert communities', body: 'Time with people who live in the desert, on their ground and on their terms.' },
    { title: 'Dunes on foot and by camel', body: 'Erg Chebbi in the early morning and late afternoon, when it is worth being out there.' },
    { title: 'Sand activities', body: '4x4 and buggy time on the dunes for groups that want a more active afternoon.' },
  ],
  learning: [
    { subject: 'Geography', body: 'A complete transect from irrigated plain to erg, with a full day at the arid end of it instead of a glimpse.' },
    { subject: 'Human adaptation', body: 'How people actually live in a place with almost no water — shelter, movement, herding and the daily schedule the heat imposes.' },
    { subject: 'Architecture', body: 'Earthen building at village and ksar scale, and the difference between a structure built for defense and one built for shade.' },
    { subject: 'Amazigh culture and language', body: 'Daily contact through the valleys and the desert, where Amazigh language and craft are ordinary rather than staged.' },
    { subject: 'Environment', body: 'Aridity, oasis irrigation and dune systems, all within a single short journey.' },
  ],
  dayInTheJourney: [
    { label: 'Morning', body: 'Sunrise on the dunes, then breakfast at camp with the day still cool.' },
    { label: 'Midday', body: 'Out of the sun. This is when desert life slows down, and the group\'s schedule does the same.' },
    { label: 'Late afternoon', body: 'Back onto the sand — walking, camels, or an active session on the dunes.' },
    { label: 'Evening', body: 'Dinner at camp, music where the night allows it, and no reason to end it early.' },
  ],
  groupExperience: [
    'With two nights in the same place, the group settles. Students stop managing logistics in their heads and start paying attention to where they are.',
    'The full desert day is usually where the trip\'s best conversations happen — partly because there is time, and partly because there is nothing else competing for it.',
    'Shared meals do a lot of the work. Eating together twice a day for four days changes how a group talks by the end.',
  ],
  included: [
    'Private transport for the group for the full route, with a driver',
    'Three nights of accommodation, including two nights at a desert camp',
    'Breakfasts, and dinners on the nights the group is with us',
    'A local guide accompanying the group',
    'Camel experience at Erg Chebbi',
    'Time with desert communities as agreed in the final program',
  ],
  notIncluded: [
    'International and domestic flights',
    'Travel insurance',
    'Lunches and drinks unless agreed in the final program',
    '4x4 or buggy sessions unless included in the confirmed itinerary',
    'Personal spending, tips and optional activities',
  ],
  practical: [
    { title: 'Accommodation', body: 'Three nights: one in the valley country, two at a desert camp near Merzouga. Sharing arrangements are set with the group leader before travel.' },
    { title: 'Transport', body: 'Private vehicles sized to the group. Two of the four days are driving days; the middle day has almost none, which is the point of the format.' },
    { title: 'Meals and dietary needs', body: 'Vegetarian, vegan, gluten-free and halal can be arranged with advance notice. Send the full list with numbers and we will confirm it per location.' },
    { title: 'What to bring', body: 'Layers for cold desert nights, closed shoes, sun protection, a head covering, a power bank, and a small bag for the camp night so the main luggage can stay in the vehicle.' },
    { title: 'Activity level', body: 'Walking on sand and uneven rock, at whatever pace the group sets. Nothing on the standard itinerary requires technical fitness, and the camel portion is optional for anyone who prefers to walk.' },
  ],
  support: [
    'A Morocco Grand Adventure guide travels with the group throughout, and the desert portion is run by our own team in Merzouga.',
    'Group leaders have a direct line to us for the duration of the program.',
    'Because we operate the desert camp side ourselves, changes to timing on the desert day can usually be made on the day.',
    'We plan the route around the group\'s stated priorities and tell you plainly when something is not realistic in the time available.',
  ],
  faqs: [
    { q: 'What does the fourth day actually add?', a: 'A full day in the desert with no driving. On the 3-day program the group arrives at the dunes in the evening and leaves after sunrise. Here they get a whole day around Erg Chebbi.' },
    { q: 'Can the trip focus on a particular academic subject?', a: 'Yes. Tell us the department or course and we will weight the stops accordingly — geography and environment, architecture and heritage, or culture and language are all straightforward to emphasize on this route.' },
    { q: 'Can dietary requirements be arranged?', a: 'Yes, with advance notice. Vegetarian, vegan, gluten-free and halal are all workable; send the list with numbers when you confirm the group.' },
    { q: 'Can we swap the 4x4 and buggy time for something else?', a: 'Yes. Some groups replace it with more time on foot, more time with local hosts, or a slower afternoon. It is your program.' },
    { q: 'What group sizes do you work with?', a: 'Groups of 15 or more. Larger groups need more lead time because vehicles and desert camp capacity are arranged in advance.' },
    { q: 'How do we start planning?', a: 'Send your group size, country, approximate dates and what you want students to take away. We will reply with a route and the logistics behind it.' },
  ],
  keyPlaces: ['Marrakech', 'Aït Ben Haddou', 'Dades & Todra', 'Merzouga', 'Erg Chebbi'],
  related: [
    { to: '/destinations/erg-chebbi', label: 'Erg Chebbi' },
    { to: '/camel-trekking', label: 'Camel Trekking' },
    { to: '/merzouga-guide', label: 'Merzouga Guide' },
  ],
};

// ── 10-Day ───────────────────────────────────────────────────────────────────
const tenDay: StudentTour = {
  slug: '10-day-morocco-student-tour',
  duration: '10 Days',
  title: '10-Day Morocco Student Tour',
  cardSummary:
    'North to south across the whole country — imperial cities, the Rif, the Atlas and the Sahara — with enough time in each to understand how different they are from one another.',
  heroLead:
    'Ten days is long enough to stop generalizing about Morocco. The group sees a Roman-era site and a medieval university city and a blue mountain town and an erg, and by the end nobody is describing them with the same words.',
  hero: {
    name: 'student-group-atlas-flag',
    alt: 'Student group in Amazigh dress holding the Amazigh flag beside palms in a southern Moroccan oasis',
    w: 1600,
    h: 863,
    widths: [480, 704, 768, 1280],
  },
  metaTitle: '10-Day Morocco Student Tour | Imperial Cities, Rif & Sahara',
  metaDescription:
    'A ten-day student route linking Marrakech, Aït Ben Haddou, the Erg Chebbi Sahara, Fes and Chefchaouen. For university groups of 15+.',
  overview: {
    start: 'Marrakech or Casablanca',
    end: 'Marrakech or Fes, depending on the group\'s flights',
    regions: 'Atlantic coast · Imperial cities · Rif · Middle & High Atlas · Sahara',
    style: 'Full-country overland journey with multiple multi-night stops',
    groups: GROUPS,
  },
  whyStudents: [
    'Short trips teach a version of Morocco. Ten days teaches the differences inside it — that Fes and Marrakech are not interchangeable, that the north is green and the south is not, and that Amazigh, Arab, Andalusian and French histories sit in different proportions in different cities.',
    'The length allows multi-night stops. Students unpack, get their bearings, and can go back to a place a second time with a question they did not have on the first visit.',
    'It fits a full study-abroad module or a faculty-led program where the travel is the course rather than an add-on to it.',
  ],
  itinerary: [
    {
      day: 'Day 1',
      title: 'Arrival and first orientation',
      body: [
        'The group arrives and settles. Depending on the flights, this is Marrakech or Casablanca. The first evening is deliberately light — a walk, a meal together, and a practical briefing about the route, the pace and what to expect.',
        'Students who have never traveled outside their own country get the most out of a soft first night. Nobody absorbs a medina well on three hours of sleep.',
      ],
      notes: ['Arrival', 'Orientation walk and group dinner'],
    },
    {
      day: 'Day 2',
      title: 'Marrakech: medina, gardens and the square',
      body: [
        'A full day in Marrakech. The medina is the main event — a dense, walled, working city where the street pattern itself is the lesson. The group moves through souks organized by trade, past workshops where things are still made rather than only sold.',
        'There is time at the historic monuments and gardens the city is known for, which give the group somewhere quiet to actually talk about what they just walked through.',
        'In the evening, Jemaa el-Fna. It is loud, crowded and genuinely unlike anything most students have experienced, and it is worth going in with a plan for where to meet.',
      ],
      notes: ['Medina and souks', 'Historic monuments and gardens', 'Jemaa el-Fna in the evening'],
    },
    {
      day: 'Day 3',
      title: 'Over the High Atlas to Aït Ben Haddou',
      body: [
        'The group leaves the city and climbs. The Tizi n\'Tichka pass is the first big landscape transition of the trip, and after two days in Marrakech the emptiness on the far side lands harder.',
        'The afternoon is at Aït Ben Haddou, walking up through the ksar to the top. The group continues into the valley country for the night.',
      ],
      notes: ['Tizi n\'Tichka', 'Aït Ben Haddou', 'Overnight in the valleys'],
    },
    {
      day: 'Day 4',
      title: 'Valleys, gorges and the road to the dunes',
      body: [
        'Through the Dades and Todra country, where palm groves trace the water and bare rock does everything else. There is time to walk into a gorge and see how the villages use what comes through.',
        'By late afternoon the mountains are behind the group and Erg Chebbi is ahead. The night is at a desert camp.',
      ],
      notes: ['Dades and Todra', 'Arrival Erg Chebbi', 'Night at desert camp'],
    },
    {
      day: 'Day 5',
      title: 'A full day at Erg Chebbi',
      body: [
        'Sunrise, then a day in the desert rather than a drive out of it. This is where the group meets people who live in the desert, sees how a nomad camp works, and spends the cooler hours out on the dunes.',
        'Groups that want an active afternoon can take 4x4 or buggy time on the sand. Groups that want a slower one can have that instead.',
        'Second night at the camp, with no early departure the next morning to cut the evening short.',
      ],
      notes: ['Sunrise over the dunes', 'Desert communities', 'Optional sand activities', 'Second night at camp'],
    },
    {
      day: 'Day 6',
      title: 'North through the Middle Atlas',
      body: [
        'A long travel day, and a genuinely interesting one. The route runs north and the country changes more than students expect — the pre-Sahara gives way to high plateau, then to cedar forest and cooler air.',
        'It is the clearest single demonstration on the trip that Morocco is not one climate. The group overnights on the route north.',
      ],
      notes: ['Middle Atlas', 'Cedar forest country', 'Overnight en route'],
    },
    {
      day: 'Day 7',
      title: 'Fes',
      body: [
        'Fes el-Bali is the reason this trip is ten days and not six. It is one of the largest car-free urban areas anywhere, and it does not reveal itself quickly. The group goes in with a local guide because that is the only sensible way to do it.',
        'The day covers the old city\'s craft economy — the tanneries, metalwork, weaving — and its scholarly history, including the university quarter. Students who found Marrakech overwhelming usually find Fes older, denser and quieter in a way they can work with.',
      ],
      notes: ['Fes el-Bali medina', 'Tanneries and craft workshops', 'Historic university quarter'],
    },
    {
      day: 'Day 8',
      title: 'Roman Morocco and the road to the Rif',
      body: [
        'North of Fes the group reaches a very different layer of history: Roman-era ruins on open farmland, with mosaics still in place and a street grid readable from ground level. Seeing a classical site in North Africa reframes a lot of what students assume about the Roman world.',
        'Nearby, a hillside town with a completely different character — whitewashed, stacked and religiously significant — before the road continues north into the Rif.',
      ],
      notes: ['Roman archaeological site', 'Hillside town', 'Into the Rif mountains'],
    },
    {
      day: 'Day 9',
      title: 'Chefchaouen',
      body: [
        'Chefchaouen is small, steep and blue, and it is the only place on this itinerary where the group can see the whole town from above in ten minutes of walking. After a week of large cities and open desert, the scale is a relief.',
        'There is time in the medina, time to walk up for the view, and time that is genuinely unstructured — which after eight days of moving is worth scheduling deliberately.',
      ],
      notes: ['Chefchaouen medina', 'Walk to the viewpoint', 'Free time'],
    },
    {
      day: 'Day 10',
      title: 'Last morning and departure',
      body: [
        'A final morning, then transfer to the departure airport. Where the flights allow, we build in a last stop on the way rather than going straight to the terminal.',
        'Most groups spend this drive arguing about which part was best, which is a reasonable measure of whether ten days was the right length.',
      ],
      notes: ['Transfer to departure airport'],
    },
  ],
  experiences: [
    { title: 'Two great medinas', body: 'Marrakech and Fes back to back, far enough apart in the itinerary to compare properly.' },
    { title: 'Roman North Africa', body: 'A classical site with mosaics in situ, on farmland rather than behind glass.' },
    { title: 'The Rif and Chefchaouen', body: 'Green mountains and a small blue town — the part of Morocco most short trips never reach.' },
    { title: 'High Atlas crossing', body: 'A real mountain pass with the landscape changing on both sides of it.' },
    { title: 'Two nights at Erg Chebbi', body: 'A full desert day, not a sunrise-and-leave.' },
    { title: 'Desert communities', body: 'Time with people who live in the Sahara, including how a nomad camp is set up and moved.' },
    { title: 'Craft economies', body: 'Tanneries, metalwork and weaving seen as working trades rather than demonstrations.' },
  ],
  learning: [
    { subject: 'History', body: 'Roman, medieval Islamic, Andalusian and colonial layers encountered in the places they happened rather than in sequence on a slide.' },
    { subject: 'Urban geography', body: 'Two medinas of different ages and densities, plus a small mountain town, make street pattern and city growth directly comparable.' },
    { subject: 'Physical geography', body: 'Atlantic plain, High Atlas, pre-Sahara, erg, Middle Atlas cedar forest and the Rif — most of Morocco\'s climate zones in one route.' },
    { subject: 'Anthropology and language', body: 'Arabic, Amazigh, French and Spanish influence are unevenly distributed across the country, and the route makes that pattern obvious.' },
    { subject: 'Economy and craft', body: 'Traditional production in Fes and Marrakech, oasis agriculture in the south, and herding in the desert.' },
    { subject: 'Environment', body: 'Water scarcity, irrigation, desertification and forest are all encountered on the ground within the same ten days.' },
  ],
  groupExperience: [
    'Ten days is long enough for a group to become a group. The social map of the first evening is rarely the one you see at the end.',
    'Multi-night stops matter more than students expect. Waking up somewhere for the second time changes how you look at it.',
    'The desert days and the Chefchaouen day are usually the two the group talks about most — one for the scale, one for the pace.',
  ],
  included: [
    'Private transport for the group for the full route, with a driver',
    'Nine nights of accommodation, including two nights at a desert camp',
    'Breakfasts, and dinners on the nights the group is with us',
    'A local guide accompanying the group for the journey',
    'Local city guides in the major medinas',
    'Camel experience at Erg Chebbi',
    'Airport transfers on arrival and departure',
  ],
  notIncluded: [
    'International and domestic flights',
    'Travel insurance',
    'Lunches and drinks unless agreed in the final program',
    'Entrance fees to sites not listed in the confirmed itinerary',
    'Optional activities and personal spending',
  ],
  practical: [
    { title: 'Accommodation', body: 'Nine nights, mixing city accommodation in the larger stops with valley accommodation and two nights at a desert camp. Multi-night stays are used wherever the route allows it.' },
    { title: 'Transport', body: 'Private vehicles for the whole route. Morocco is large and two of the ten days are substantial drives; the itinerary is built so those days have something to look at rather than being pure transit.' },
    { title: 'Meals and dietary needs', body: 'Vegetarian, vegan, gluten-free and halal can be arranged with advance notice across the whole route. Send the list with numbers when the group is confirmed.' },
    { title: 'Free time', body: 'Built in deliberately, particularly in Chefchaouen and the desert. Ten days of continuous scheduling does not work for a student group, and we do not plan it that way.' },
    { title: 'What to bring', body: 'Layers for a genuinely wide temperature range — cold desert nights, cool Middle Atlas mornings and hot afternoons in the south. Closed walking shoes, sun protection, a head covering, a power bank, and a day bag.' },
    { title: 'Weather', body: 'Spring and autumn suit this route best because it crosses several climate zones. Summer is hot in the south; winter is cold at altitude and in the desert at night. Both are workable with adjusted timing.' },
  ],
  support: [
    'A Morocco Grand Adventure guide travels with the group for the full ten days, with local city guides in the major medinas.',
    'The desert portion is operated by our own team in Merzouga.',
    'Group leaders have a direct contact throughout the program.',
    'On a route this long we expect to adjust as we go. Pace, free time and stop length can change during the trip if the group needs them to.',
  ],
  faqs: [
    { q: 'Can this run as a faculty-led course rather than a tour?', a: 'That is what the length is for. Tell us the course, the learning outcomes and any site visits you need, and we will build the route around them instead of adding them to a fixed itinerary.' },
    { q: 'Can the tour start and end in different cities?', a: 'Yes, and on a ten-day route that often makes sense — for example arriving in one city and departing from another so the group is not retracing. Send us your flight constraints.' },
    { q: 'Can we adjust which cities are included?', a: 'Yes. The north-to-south spine is what makes the route work, but individual stops can be swapped, extended or dropped depending on your priorities and dates.' },
    { q: 'How much of the trip is driving?', a: 'It is a large country and there are two substantial travel days. We tell you where they fall when we send the route so there are no surprises.' },
    { q: 'What group sizes do you work with?', a: 'Groups of 15 or more. For a ten-day program with multi-night city stops, more lead time means better accommodation options.' },
    { q: 'Can dietary requirements be handled for the whole route?', a: 'Yes, with advance notice. The range of locations is why we ask for the list early rather than on arrival.' },
    { q: 'How does a study-abroad coordinator start the conversation?', a: 'Message us with the institution\'s country, group size, target dates, academic focus and any fixed constraints. We will come back with a route, the logistics and the parts we would push back on.' },
  ],
  keyPlaces: ['Marrakech', 'Aït Ben Haddou', 'Erg Chebbi', 'Fes', 'Chefchaouen'],
  related: [
    { to: '/destinations/marrakech', label: 'Marrakech' },
    { to: '/fes-tours', label: 'Fes' },
    { to: '/destinations/chefchaouen', label: 'Chefchaouen' },
    { to: '/destinations/erg-chebbi', label: 'Erg Chebbi' },
  ],
};

export const studentTours: StudentTour[] = [threeDay, fourDay, tenDay];

export const studentTourSlugs = studentTours.map((t) => t.slug);

export function getStudentTour(slug: string): StudentTour | undefined {
  return studentTours.find((t) => t.slug === slug);
}
