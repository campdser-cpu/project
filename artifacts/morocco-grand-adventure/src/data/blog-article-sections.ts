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
};