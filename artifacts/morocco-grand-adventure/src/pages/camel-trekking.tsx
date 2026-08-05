import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const features = [
  { title: "Sunset Camel Treks", description: "Ride across the golden dunes of Erg Chebbi as the sun paints the sky — the iconic Merzouga experience.", image: "/images/personal/dunes-camels-poster.jpg" },
  { title: "Sunrise Treks", description: "Wake before dawn to witness the desert come alive. Watch the first light catch the dunes in spectacular colour." },
  { title: "Private Caravans", description: "No shared camel trains here. Your trek is private, led by experienced Berber guides who know the dunes intimately." },
  { title: "Bedouin Tea Stops", description: "Pause in the dunes for sweet mint tea prepared over an open fire — the legendary hospitality of the Sahara." },
  { title: "Luxury Camp Nights", description: "Many treks end at our luxury desert camp, where a gourmet dinner and stargazing await beneath the Milky Way." },
  { title: "All Experience Levels", description: "Whether you're a first-time rider or an experienced traveler, our gentle, well-cared-for camels suit everyone." },
];

export default function CamelTrekking() {
  return (
    <ExperiencePage
      id="camel-trekking"
      heroImage="/images/personal/dunes-camels-poster.jpg"
      heroAlt="Camel caravan trekking across the golden dunes of Erg Chebbi at Merzouga"
      breadcrumbName="Camel Trekking"
      title="Camel Trekking Merzouga"
      subtitle="Ride the golden dunes of Erg Chebbi at sunset with expert Berber guides. Authentic, private, and unforgettable Sahara camel experiences."
      ctaText="Book a Camel Trek"
      ctaLink="/tours"
      trustBadges={defaultTrustBadges}
      highlights={features}
      faqs={[
        { question: "How long do the camel treks last?", answer: "We offer treks from 1-hour sunset rides to full multi-day expeditions. The most popular is the 45-minute sunset trek to our luxury desert camp, followed by breakfast at sunrise the next morning." },
        { question: "Is camel trekking safe?", answer: "Absolutely. Our camels are gentle, well-cared-for animals led by experienced Berber guides. You'll receive clear instructions before mounting, and the pace is always relaxed." },
        { question: "What should I wear?", answer: "Comfortable, loose-fitting clothing. Long trousers protect from the sun and the saddle. A scarf for the wind and sun, sunglasses, and sunscreen are also recommended." },
        { question: "Can children ride?", answer: "Yes — camel trekking is one of Morocco's most family-friendly experiences. Children ride with a guide or alongside their parents. We'll always prioritise safety and comfort." },
        { question: "What happens if I get motion sick?", answer: "The camels move at a gentle, swaying pace. If you're concerned, we recommend the shorter sunset trek, or you can ride a 4x4 to the camp instead." },
      ]}
    />
  );
}