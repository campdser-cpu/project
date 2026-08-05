import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const features = [
  { title: "Private Luxury Tents", description: "Spacious Berber-style tents with real king beds, premium linens, and private shaded terraces overlooking the dunes.", image: "/images/personal/luxury-camp-dusk.jpg" },
  { title: "En-Suite Bathrooms", description: "Modern private bathrooms with hot showers, flushing toilets, and premium Moroccan bath amenities." },
  { title: "Fine Desert Dining", description: "Multi-course Moroccan feasts prepared fresh by our camp chefs — tagines, couscous, and grilled delicacies." },
  { title: "Camp Connectivity", description: "Free WiFi in the common areas so you can share your Sahara moments with the world." },
  { title: "Stargazing Decks", description: "Dedicated stargazing areas with telescopes and Berber astronomy guides to read the night sky." },
  { title: "Live Berber Music", description: "Evenings around the campfire with traditional Gnawa rhythms and Amazigh songs under the stars." },
];

export default function LuxuryCamp() {
  return (
    <ExperiencePage
      id="luxury-camp"
      heroImage="/images/personal/luxury-camp-dusk.jpg"
      heroAlt="Luxury desert camp at dusk near Merzouga with lanterns glowing"
      breadcrumbName="Luxury Desert Camp"
      title="Luxury Desert Camp"
      subtitle="Exclusive Sahara glamping near Merzouga — private tents, fine dining, and nights beneath the brightest stars on earth."
      trustBadges={defaultTrustBadges}
      highlights={features}
      faqs={[
        { question: "What is included in a night at the luxury camp?", answer: "Your night includes a sunset camel trek to camp, a gourmet multi-course dinner, live Berber music around the fire, breakfast at sunrise, and your private luxury tent with en-suite bathroom." },
        { question: "Are there real beds in the tents?", answer: "Yes — every tent features a real king-size bed with premium linens, not sleeping bags on the floor. Private en-suite bathrooms include hot showers." },
        { question: "Is the camp private?", answer: "The camp is exclusive to Morocco Grand Adventure guests. Depending on the season, you may share the camp with a few other small private groups, but each tent is completely private." },
        { question: "How do I get to the camp?", answer: "Most guests arrive by camel trek at sunset (approximately 45 minutes). We can also arrange a 4x4 transfer directly to camp if you prefer." },
      ]}
    />
  );
}