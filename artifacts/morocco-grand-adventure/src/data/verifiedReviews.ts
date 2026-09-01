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
 * Authentic customer reviews transcribed from the supplied Google review
 * screenshots. Review wording is intentionally not translated, rewritten, or
 * SEO-optimized. Traveler images are published only where the supplied
 * material provides a confident customer-to-photo association.
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
      {
        src: '/review-assets/images/nina-branderhorst-camel-trek.webp',
        alt: 'Traveler photo of Nina Branderhorst riding a camel in the Sahara dunes',
        width: 320,
        height: 428,
      },
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
    images: [],
  },
  {
    id: 'google-natalia-cuadrado',
    name: 'Natalia Cuadrado',
    rating: 5,
    relativeDate: '3 days ago',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/UK3MENd42bC16mME7',
    text: 'Mohamed es muy buen guía. Sabe mucho de Marruecos y tiene mucho que enseñar. Recomiendo muchísimo dejarte llevar en tu viaje por él, es maravilloso.',
    images: [],
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
      {
        src: '/review-assets/images/cora-ciampolini-desert-camp.webp',
        alt: 'Traveler photo of a desert camp tent from Cora Ciampolini’s Google review',
        width: 300,
        height: 189,
      },
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
    images: [],
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
      {
        src: '/review-assets/images/kresimir-mikic-traditional-robe.webp',
        alt: 'Traveler photo of Krešimir Mikić wearing a traditional Moroccan robe in the desert',
        width: 320,
        height: 516,
      },
    ],
  },
];