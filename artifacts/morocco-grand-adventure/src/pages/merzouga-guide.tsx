import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const features = [
  { title: "Erg Chebbi Dunes", description: "Marvel at Morocco's most iconic sand sea — 22km of golden dunes rising up to 150 metres, ever-changing with the light.", image: "/images/dest/erg-chebbi.jpg" },
  { title: "Camel Trekking at Sunset", description: "The essential Merzouga experience — ride a camel across the dunes as the sun sets and the desert turns to gold." },
  { title: "Luxury Desert Camps", description: "Sleep in real beds with en-suite bathrooms beneath the brightest stars on earth at our exclusive luxury camp." },
  { title: "Khamlia Gnawa Village", description: "Hear soulful Gnawa music in the 'village of the black people' — a cultural experience found nowhere else." },
  { title: "Nomad Family Visits", description: "Share mint tea with Saharan nomad families and glimpse a way of life that has endured for centuries." },
  { title: "Stargazing", description: "With zero light pollution, Erg Chebbi offers some of the best stargazing on the planet — the Milky Way in all its glory." },
];

export default function MerzougaGuide() {
  return (
    <ExperiencePage
      id="merzouga-guide"
      heroImage="/images/dest/merzouga.jpg"
      heroAlt="Golden dunes of Erg Chebbi at Merzouga with a camel caravan at sunset"
      breadcrumbName="Merzouga Travel Guide"
      title="Merzouga Travel Guide"
      subtitle="The ultimate guide to Merzouga — Erg Chebbi dunes, luxury camps, camel trekking, stargazing, and everything you need for the perfect Sahara adventure."
      ctaText="Plan Your Merzouga Trip"
      ctaLink="/trip-builder"
      trustBadges={defaultTrustBadges}
      highlights={features}
      faqs={[
        { question: "How do I get to Merzouga?", answer: "Most travelers arrive from Marrakech (about 9-10 hours by road) or Fes (about 7 hours). Your private driver-guide will handle everything, with stops at key sights along the way." },
        { question: "When is the best time to visit Merzouga?", answer: "October to April is ideal — warm days and cool, comfortable nights. Summer months (June-August) can be extremely hot during the day." },
        { question: "How many nights should I stay?", answer: "We recommend at least 2 nights — one night in the luxury camp and one in a desert hotel. This allows time for the camp experience, a 4x4 tour, and a sunrise over the dunes." },
        { question: "Is Merzouga safe?", answer: "Yes — Merzouga is a small, welcoming village where tourism is the main livelihood. Our local team ensures you experience it in complete safety and comfort." },
      ]}
    />
  );
}