import type { ThingsCopy } from './types';

// English original. Every entry describes something the photograph beside it
// actually shows, on a route Morocco Grand Adventure drives. No prices, no
// opening hours, no superlatives we cannot stand behind.
const en: ThingsCopy = {
  heading: '25 Things to Do in Morocco',
  intro:
    'Morocco rewards travellers who choose a handful of things and do them properly. These twenty-five are the ones our guides come back to — the dune you climb before sunrise, the alley that smells of cedar and mint, the gorge where the road runs out. Each one says where it is and what it is really like, so you can build a route that fits the time you have.',
  kicker: 'A guide from the people who drive these roads',
  ctaTitle: 'Build your own version of this list',
  ctaText:
    'Tell us which of these you want and how many days you have. We will lay them out in an order that works on the map, and send a quote for your dates and group.',
  ctaButton: 'Plan my journey',
  groups: {
    sahara: 'The Sahara',
    marrakech: 'Marrakech',
    fes: 'Fes',
    south: 'The road south',
    coast: 'The north and the coast',
    culture: 'Culture and the table',
  },
  links: {
    guide: 'Read the guide',
    experience: 'See the experience',
    tours: 'See tours',
    destination: 'Explore the destination',
    about: 'Meet the team',
  },
  items: {
    'camel-trek': {
      title: 'Ride a camel into the Erg Chebbi dunes',
      body: 'The caravan leaves Merzouga in the late afternoon and walks into the sand while the light turns from gold to rose. It is slower than you expect, and quieter: after ten minutes the only sounds are the padding of feet and the wind on the crests.',
      tip: 'Wear long trousers and bring a scarf — it cools fast once the sun drops.',
    },
    'desert-camp': {
      title: 'Sleep in a camp between the dunes',
      body: 'Camps sit in the hollows of the erg, out of sight of the village, with carpets underfoot and dinner served under a canvas roof. After the plates are cleared, the fire and the drums carry the evening until the cold sends everyone to bed.',
      tip: 'Nights are cold from November to February. A fleece is worth the suitcase space.',
    },
    'dune-sunrise': {
      title: 'Climb a dune for sunrise',
      body: 'Sunrise is the reason to wake in the dark. Walking a dune is slow work in soft sand, but from the crest the erg goes on in ridges, and the colour changes minute by minute as the sun clears the horizon.',
      tip: 'Start about forty minutes before sunrise and climb barefoot; boots fill with sand.',
    },
    stargazing: {
      title: 'Watch the Sahara sky after dinner',
      body: 'Away from towns, the desert sky is the evening entertainment. Camp lounges are lit by lanterns rather than floodlights, and once your eyes adjust the stars come out thick from one horizon to the other.',
      tip: 'Let your eyes adapt for fifteen minutes and keep phone screens off.',
    },
    'dune-driving': {
      title: 'Cross the dunes by 4x4',
      body: 'A 4x4 covers ground a camel cannot: the flat hammada, the black volcanic rock, the villages at the edge of the sand. Dune driving itself is short, sharp fun — a few minutes of climbing and sliding with the engine working hard.',
      tip: 'Ask for the morning run if you are prone to motion sickness; the air is cooler and calmer.',
    },
    'quad-biking': {
      title: 'Take a quad out onto the erg',
      body: 'Quads are the loud counterpoint to the camels, and the easiest way to feel how big Erg Chebbi is. Routes run along the firm sand at the base of the dunes with a guide riding ahead.',
      tip: 'Bring sunglasses and a scarf for your face — the sand travels with you.',
    },
    'jemaa-el-fna': {
      title: 'Eat dinner on Jemaa el-Fna',
      body: 'Marrakech’s main square turns into an open-air kitchen every evening: numbered stalls, steam, benches shared with strangers. It is noisy and theatrical, and it is still where the city eats.',
      tip: 'Walk a full lap before choosing, and agree what you have ordered before it arrives.',
    },
    'marrakech-souks': {
      title: 'Get lost in the Marrakech souks',
      body: 'North of the square the medina closes over your head — leather tunnels, lamp shops, dyers’ alleys. Getting lost is part of it; the lanes eventually spit you back out onto a street you recognise.',
      tip: 'Set a landmark and a time to be back out, then wander without a map.',
    },
    'ben-youssef': {
      title: 'Stand in the courtyard of Ben Youssef Madrasa',
      body: 'The old Quranic school is the calmest room in Marrakech: carved cedar, stucco and zellige around a still pool. Visit early and you may have the courtyard almost to yourself.',
      tip: 'Mornings are quietest, and the light on the tilework is best then.',
    },
    'amazigh-music': {
      title: 'Sit in on an Amazigh music evening',
      body: 'Bendir drums, hand-clapping and call-and-response singing are how evenings pass in the south. Played outdoors around a fire, it is less performance than conversation, and guests are pulled into the circle soon enough.',
      tip: 'Say yes when someone hands you a drum. Nobody is judging your rhythm.',
    },
    'fes-medina': {
      title: 'Walk the lanes of Fes el-Bali',
      body: 'Fes is the medina that still works: donkeys carrying goods, workshops behind every doorway, streets too narrow for anything with an engine. A morning here shows how a medieval city runs today.',
      tip: 'Take a local guide for the first half-day; the lanes are genuinely confusing.',
    },
    tanneries: {
      title: 'Look down on the Chouara tanneries',
      body: 'The stone dye pits of Fes have been worked by hand for centuries, and the viewing terraces above them belong to the leather shops. The smell is real, the colours are extraordinary, and the work below is hard.',
      tip: 'You will be handed mint to hold under your nose. Take it.',
    },
    'medina-crafts': {
      title: 'Watch a craftsman at work',
      body: 'Behind the shopfronts the medina is a workshop: blacksmiths at the forge, cedar turners, coppersmiths, weavers. Stopping to watch — and buying from the person who made the thing — is the best souvenir there is.',
      tip: 'Ask before photographing anyone at work; most will say yes.',
    },
    'tichka-road': {
      title: 'Cross the High Atlas on the Tizi n’Tichka',
      body: 'The road from Marrakech to Ouarzazate climbs through walnut villages and switchbacks to the pass, then drops into red kasbah country. The drive is the attraction, so the stops matter more than the clock.',
      tip: 'Stop at the viewpoints on the way up; the light is better before midday.',
    },
    'ait-ben-haddou': {
      title: 'Climb the ksar of Aït Ben Haddou',
      body: 'The earthen towers above the Ounila river are a UNESCO World Heritage Site and a film set many times over. Cross the river, walk up through the alleys and climb to the granary for the view back over the valley.',
      tip: 'It is about thirty minutes from Ouarzazate — go early or late to avoid the harshest light.',
    },
    'todra-gorge': {
      title: 'Walk into the Todra Gorge',
      body: 'The limestone walls close to a corridor barely wider than the road, with a stream running along the bottom. Walk in past the hotels and the noise drops away; climbers hang off the rock overhead.',
      tip: 'Late afternoon light hits the upper walls and the crowds have thinned.',
    },
    'dades-valley': {
      title: 'Follow the Dades Valley road',
      body: 'Between Ouarzazate and the desert, the Dades runs through a ribbon of oasis with kasbahs on the slopes above. The famous switchbacks are worth the stop, but the villages either side are the real reason to slow down.',
      tip: 'Break the drive here rather than pushing straight through to Merzouga.',
    },
    'draa-palms': {
      title: 'Drive the palm groves of the Draa',
      body: 'South of Ouarzazate the road follows Morocco’s longest river through a corridor of date palms and mud-brick villages toward Zagora. It is the greenest desert you will ever see.',
      tip: 'Dates are harvested in autumn — stalls at the roadside sell them fresh.',
    },
    chefchaouen: {
      title: 'Wander the blue medina of Chefchaouen',
      body: 'A town painted in a hundred shades of blue, stacked on a hillside in the Rif. Half a day of alleys and staircases is enough, and the viewpoint above the town is worth the climb for the evening light.',
      tip: 'Shopkeepers live here — ask before photographing doorways and people.',
    },
    essaouira: {
      title: 'Walk the ramparts at Essaouira',
      body: 'The Atlantic wind keeps Essaouira cool when the interior is baking. The Sqala ramparts face the sea with cannons still in their emplacements, and the port below smells of fish and fresh paint.',
      tip: 'Bring a jacket even in summer; the wind is constant.',
    },
    surfing: {
      title: 'Surf the Atlantic coast',
      body: 'North of Agadir the coast is a run of points and beach breaks with surf schools in every village. Beginners get long, forgiving waves; the reefs work for everyone else when the swell arrives.',
      tip: 'Winter has the biggest swell. Summer is gentler and better for learning.',
    },
    'agadir-beach': {
      title: 'Meet the camels on Agadir beach',
      body: 'Agadir’s bay is a long curve of sand with a promenade behind it, and camels waiting at the water’s edge for the end-of-day walk. It is the easiest soft landing in Morocco after a flight.',
      tip: 'Agree the ride and the price before you climb on.',
    },
    'hassan-ii': {
      title: 'See the Hassan II Mosque on the ocean',
      body: 'Casablanca’s great mosque is built out over the Atlantic, and its scale only registers when you are standing beneath the minaret with the swell breaking below. Non-Muslim visitors can go inside on guided visits.',
      tip: 'Check the visit times on the day; they change around prayers.',
    },
    'mint-tea': {
      title: 'Drink tea the way it is poured here',
      body: 'Green tea, fresh mint, sugar, poured from a height to raise the foam, and never just one glass. It is offered everywhere — in shops, camps and homes — and it is how a conversation starts.',
      tip: 'Accepting the second glass is normal. Refusing all three is not.',
    },
    'moroccan-table': {
      title: 'Eat a proper Moroccan table',
      body: 'A tagine cooked slowly over coals, cooked salads to start, couscous on Friday, bread instead of cutlery. Ask your guide where they eat and you will do better than any list.',
      tip: 'Tell us about allergies or a vegetarian diet when you book; kitchens plan ahead.',
    },
  },
};

export default en;
