import type { MgHubCopy } from './types';

// English — the canonical wording. Facts cross-checked against the guide
// topics in src/data/seoHub.ts (timings, dune size) so the hub never
// contradicts the pages it links to.
const en: MgHubCopy = {
  hero: {
    eyebrow: 'Merzouga · Erg Chebbi · Sahara',
    title: 'Merzouga Travel Guide',
    lead: 'Merzouga is the village at the edge of Erg Chebbi, the best-known dune field in Morocco. This guide explains what the desert is really like, how to get there, how long to stay and how to choose between camel treks, camps and 4x4 trips — written by guides who live here.',
    alt: 'The Erg Chebbi dunes glowing orange under a deep blue evening sky',
  },
  facts: [
    { label: 'Where', value: 'South-east Morocco, about 50 km from the Algerian border' },
    { label: 'The dunes', value: 'Erg Chebbi: about 28 km long, up to roughly 150 m high' },
    { label: 'Getting there', value: '9–10 h by road from Marrakech, 7–8 h from Fes' },
    { label: 'Best months', value: 'October to April' },
    { label: 'How long', value: 'One night minimum, two if you can' },
  ],
  nav: {
    label: 'In this guide',
    items: ['Camel trekking', 'Desert camps', '4x4 and quads', 'What to pack', 'When to go', 'All guides'],
  },
  story: {
    erg: {
      eyebrow: 'Village and dunes',
      heading: 'Merzouga and Erg Chebbi are not the same thing',
      paragraphs: [
        'Merzouga is a small working village: one paved road, guesthouses, a few shops and cafés, and palm gardens on its edge. Erg Chebbi is the sand sea that rises straight behind it, a band of dunes about 28 km long that changes colour through the day, from pale gold at noon to deep orange at sunset.',
        'Most desert camps are set inside the dunes, a camel ride or a short 4x4 drive from the village. Around the erg lies the hamada, a flat, stony plain dotted with villages such as Hassilabied and Khamlia. So when people say they “went to Merzouga”, they usually mean they slept in Erg Chebbi.',
      ],
      alt: 'A traveller in a striped hooded djellaba raising both arms toward the Erg Chebbi dunes from the road near Merzouga',
    },
    camel: {
      eyebrow: 'The classic experience',
      heading: 'Camel trekking at sunset',
      paragraphs: [
        'Treks set off about an hour before sunset, once the sand has cooled. A guide walks ahead leading the camels on a rope, and the ride to camp usually takes 50 to 70 minutes at a slow, rocking pace. Most groups stop on a high ridge to watch the light turn orange before carrying on to camp.',
        'It is gentle rather than athletic, but the first steep descent surprises everyone: lean back and hold the handle. Wear long trousers and shoes that stay on your feet, and keep a scarf handy for wind-blown sand. Large bags stay in the vehicle, so bring only a small bag for the night.',
      ],
      alt: 'A guide in a blue robe leading a line of camels across the Erg Chebbi dunes at dusk',
    },
    camp: {
      eyebrow: 'Evening in the Sahara',
      heading: 'A night at a desert camp',
      paragraphs: [
        'Camps are clusters of tents around a courtyard of rugs, lanterns and low tables. After the trek there is mint tea, then dinner, often a tagine, and on many nights music around a fire. With no town lights nearby, a clear, moonless sky shows more stars than most visitors have ever seen.',
        'Standard camps have simple private tents with shared toilets and showers. Luxury camps, ours included, add proper beds, an en-suite bathroom with a warm shower, and more space. Both include dinner and breakfast. From November to March the nights are cold, so the heavy blankets are there for a reason.',
      ],
      alt: 'A lantern-lined carpet leading into a luxury desert camp at dusk, with tents and guests beyond',
    },
    fourByFour: {
      eyebrow: 'Beyond the dunes',
      heading: '4x4 trips, quads and buggies',
      paragraphs: [
        'A half-day 4x4 loop is the easiest way to see what surrounds the erg: Khamlia and its Gnawa musicians, nomad families living out on the hamada, old mine workings and, after a wet winter, a seasonal lake that draws birds. Inside the dunes, an experienced driver handles climbs and descents that look impossible from below.',
        'Quads and buggies are rented by the hour at the edge of the dunes. They are great fun but loud, so if you want a quiet sunset, book them for the morning. Choose a provider that gives you a helmet and sends a guide with you.',
      ],
      alt: 'A white 4x4 throwing up a spray of sand as it drives across orange dunes',
    },
    people: {
      eyebrow: 'Local life',
      heading: 'The people who live here',
      paragraphs: [
        'Merzouga is Amazigh country, and many families here have nomadic roots. Most visits start with a glass of mint tea, and accepting it is part of the welcome. Ask before you photograph anyone, and dress modestly in the village, with shoulders and knees covered.',
        'Khamlia, about 7 km south, is known for Gnawa music, whose roots lie in sub-Saharan Africa. Rissani, around 35 km north, is the historic market town of the Tafilalt and an easy stop on the way in or out. Keep some small change in dirhams for tips, tea and handmade crafts.',
      ],
      alt: 'A guide in a bright turban and a smiling guest sharing mint tea on a rug in the dunes',
    },
  },
  pack: {
    eyebrow: 'Practical',
    heading: 'What to pack for the Merzouga desert',
    intro: 'Pack for two climates in one day: strong sun on the sand, then a real drop in temperature after dark. Everything below fits in a small overnight bag.',
    groups: [
      {
        title: 'For the day',
        items: [
          'Loose, long-sleeved layers in light colours',
          'Sunglasses, a hat and SPF 30+ sunscreen',
          'A scarf or chèche against sun and blowing sand',
          'A refillable water bottle',
        ],
      },
      {
        title: 'For the night',
        items: [
          'A warm fleece or down jacket from October to April',
          'Warm socks and a hat for sunrise',
          'A headlamp or small torch',
          'A charged power bank',
        ],
      },
      {
        title: 'Good to know',
        items: [
          'Large luggage stays in the vehicle',
          'Carry cash in dirhams: cards are rarely accepted in the desert',
          'Closed shoes for the dunes, sandals for camp',
          'Leave the drone at home: Morocco does not allow them without a permit',
        ],
      },
    ],
    alt: 'A guide and two guests wrapped in scarves and wearing sunglasses, smiling on the dunes at sunset',
  },
  basics: {
    eyebrow: 'Plan the basics',
    heading: 'When to go, how long to stay and how to get there',
    items: {
      when: {
        title: 'When to go',
        body: 'October to April is the comfortable season: warm days and cool to cold nights, with December and January nights close to freezing. From June to August the daytime heat often passes 40 °C, so activities move to early morning and evening. Spring can bring strong winds and blowing sand.',
      },
      stay: {
        title: 'How long to stay',
        body: 'One night covers the essentials: a sunset trek, dinner at camp and sunrise. Two nights give you a full day for a 4x4 loop, Khamlia and a slower morning before the long drive out, and that is what we usually recommend.',
      },
      getting: {
        title: 'Getting there',
        body: 'Merzouga is about 9–10 hours by road from Marrakech and 7–8 hours from Fes, so most travellers break the journey with a night in the Dades or Todra valleys, or give the crossing of the Middle Atlas from Fes a full day. The nearest airport is Errachidia, roughly two hours away by car.',
      },
    },
  },
  mistakes: {
    eyebrow: 'Local advice',
    heading: 'Mistakes first-time visitors make',
    items: [
      { title: 'Arriving after dark', body: 'Leave early enough to reach the dunes by late afternoon, or you miss the sunset trek.' },
      { title: 'Packing only for heat', body: 'Even in spring, a night in the dunes can be cold.' },
      { title: 'Doing Marrakech–Merzouga–Marrakech in two days', body: 'It is possible, but you will spend most of it in a vehicle.' },
      { title: 'Bringing a big suitcase to camp', body: 'A small bag for the night is all you need.' },
      { title: 'Relying on cards', body: 'Take out enough cash before you reach the desert.' },
      { title: 'Counting on a strong signal in the dunes', body: 'Download maps, tickets and music before you go.' },
    ],
  },
  choose: {
    eyebrow: 'Choosing',
    heading: 'Which desert experience suits you?',
    items: {
      standard: {
        title: 'Standard camp and camel trek',
        body: 'The classic night: sunset ride, dinner, stars and sunrise, in a simple private tent with shared bathrooms. Right for you if the experience matters more than the comfort.',
      },
      luxury: {
        title: 'Luxury camp',
        body: 'The same dunes with a real bed, a private bathroom and more space. A good fit for couples, families and anyone who sleeps better in comfort.',
      },
      active: {
        title: 'Add a 4x4 or quad day',
        body: 'For travellers who want to see more than the dunes, or would like an active morning. It works best with two nights.',
      },
    },
    compare: 'Compare luxury and standard camps',
  },
  guides: {
    groups: { experiences: 'Experiences', planning: 'Planning', places: 'Routes and places' },
    inEnglish: 'In English',
    allHeading: 'All Merzouga guides',
  },
  tours: { heading: 'Tours with a night in Merzouga' },
  moreLabel: 'Related guides',
};

export default en;
