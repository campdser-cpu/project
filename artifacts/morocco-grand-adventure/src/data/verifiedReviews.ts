export type ReviewImage = { src: string; alt: string; width: number; height: number };

export type VerifiedGoogleReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
  relativeDate?: string;
  source: 'Google';
  sourceUrl: string;
  translationNote?: string;
  images: ReviewImage[];
};

/**
 * Authentic customer reviews transcribed from the Google review screenshots
 * supplied for this site. Review wording is intentionally not translated,
 * rewritten, or SEO-optimized.
 */
export const verifiedGoogleReviews: VerifiedGoogleReview[] = [
  {
    id: 'google-nina-branderhorst',
    name: 'Nina Branderhorst',
    rating: 5,
    relativeDate: 'a day ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    text: "Mohamed was recommended as a guide by a friend and feel lucky for the wonderful experience I’ve had exploring Merzouga and the Sahara. Not only does he speak many languages, he is knowledgeable and happy to share about the culture, customs and the history of the Amazight and gives you the local experience. He goes out of his way to provide a tailor made trip that is just to your wishes. I would definitely encourage everyone to visit the desert at least once in their life because this has been an amazing and unforgettable journey for me!",
    images: [
      { src: '/images/reviews/nina-branderhorst-01-reviewtext-sunset.svg', alt: 'Google review screenshot from Nina Branderhorst with Sahara sunset photo', width: 600, height: 1299 },
      { src: '/images/reviews/nina-branderhorst-02-camels.svg', alt: 'Customer photo from Nina Branderhorst review showing camels in the Sahara', width: 600, height: 1299 },
      { src: '/images/reviews/nina-branderhorst-03-dunewalker.svg', alt: 'Customer photo from Nina Branderhorst review showing a traveler walking on Sahara dunes', width: 600, height: 1299 },
      { src: '/images/reviews/nina-branderhorst-04-sandboarder.svg', alt: 'Customer photo from Nina Branderhorst review showing sandboarding in the Sahara', width: 600, height: 1299 },
    ],
  },
  {
    id: 'google-alessandra-raspini',
    name: 'Alessandra Raspini',
    rating: 5,
    relativeDate: '5 days ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    text: 'We booked this Quad Tour on the dunes and it was fantastic. All staff was kind and polite and took us around the desert. It was a lot of fun! Highly recommended.',
    images: [
      { src: '/images/reviews/alessandra-raspini-reviewtext.svg', alt: 'Google review screenshot from Alessandra Raspini about a quad tour on the dunes', width: 600, height: 1299 },
    ],
  },
  {
    id: 'google-natalia-cuadrado',
    name: 'Natalia Cuadrado',
    rating: 5,
    relativeDate: '3 days ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    text: 'Mohamed es muy buen guía. Sabe mucho de Marruecos y tiene mucho que enseñar. Recomiendo muchísimo dejarte llevar en tu viaje por él, es maravilloso.',
    images: [
      { src: '/images/reviews/natalia-daniela-cora-reviewtext.svg', alt: 'Google review screenshot from Natalia Cuadrado in Spanish', width: 600, height: 1299 },
    ],
  },
  {
    id: 'google-cora-ciampolini',
    name: 'Cora Ciampolini',
    rating: 5,
    relativeDate: '6 days ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    translationNote: 'The screenshot displays Google’s English translation of the original Italian review.',
    text: 'We returned to Morocco after a long time and relied on Morocco Grand Adventure for this new experience and I must say that we were truly surprised and amazed by the accuracy, professionalism and kindness with which they followed and accompanied us on this truly fantastic tour!!',
    images: [
      { src: '/images/reviews/cora-ciampolini-01-reviewphotos.svg', alt: 'Customer photo collage from Cora Ciampolini Google review', width: 600, height: 1299 },
    ],
  },
  {
    id: 'google-m-dr',
    name: 'M DR',
    rating: 5,
    relativeDate: '3 days ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    text: 'I will love forever this enchanting land: colours, traditions, history and landscapes; everything is like a treasure that I have to protect in my mind. Or maybe I need to visit Marocco again and for sure Marocco Grand Adventure will be my choise. Thank you so much!',
    images: [
      { src: '/images/reviews/m-dr-reviewtext.svg', alt: 'Google review screenshot from M DR', width: 600, height: 1299 },
    ],
  },
  {
    id: 'google-kresimir-mikic',
    name: 'Krešimir Mikić',
    rating: 5,
    relativeDate: '4 days ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    text: 'Mohamed was a excellent tour guide!',
    images: [
      { src: '/images/reviews/kresimir-mikic-01-overview.svg', alt: 'Google review screenshot and review overview from Krešimir Mikić', width: 600, height: 1299 },
      { src: '/images/reviews/kresimir-mikic-02-whiterobe.svg', alt: 'Customer photo from Krešimir Mikić review showing a traveler in white clothing', width: 600, height: 1299 },
      { src: '/images/reviews/kresimir-mikic-03-onbus.svg', alt: 'Customer photo from Krešimir Mikić review taken on the tour vehicle', width: 600, height: 1299 },
      { src: '/images/reviews/kresimir-mikic-04-mountainview.svg', alt: 'Customer photo from Krešimir Mikić review showing a mountain landscape', width: 600, height: 1299 },
      { src: '/images/reviews/kresimir-mikic-05-groupselfie.svg', alt: 'Customer group selfie from Krešimir Mikić Google review', width: 600, height: 1299 },
      { src: '/images/reviews/kresimir-mikic-06-bluerobe.svg', alt: 'Customer photo from Krešimir Mikić review showing a traveler in blue clothing', width: 600, height: 1299 },
    ],
  },
];
