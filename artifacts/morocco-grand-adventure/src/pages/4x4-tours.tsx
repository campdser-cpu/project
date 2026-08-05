import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const features = [
  { title: "Erg Chebbi Dune Driving", description: "Power across Morocco's most spectacular sand sea with professional drivers who've navigated these dunes for decades.", image: "/images/dest/erg-chebbi.jpg" },
  { title: "Nomad Family Visits", description: "Meet Saharan nomad families and share tea in their tents — a rare glimpse of life that has barely changed for centuries." },
  { title: "Hidden Oases & Fossil Beds", description: "Discover the Black Desert, fossil beds, and hidden oases that lie far beyond the reach of standard tourist routes." },
  { title: "Merzouga Lake & Khamlia", description: "Visit the seasonal Dayet Srji lake and the village of Khamlia, home to soulful Gnawa musicians." },
  { title: "Private 4x4 Vehicles", description: "Comfortable, air-conditioned 4x4 vehicles with experienced local drivers who know every dune and track." },
  { title: "Custom Off-Road Adventures", description: "From half-day explorations to multi-day Sahara expeditions — your 4x4 adventure is completely customisable." },
];

export default function FourByFourTours() {
  return (
    <ExperiencePage
      id="4x4-tours"
      heroImage="/images/dest/erg-chebbi.jpg"
      heroAlt="4x4 vehicle driving across the dramatic golden dunes of Erg Chebbi in the Sahara desert"
      breadcrumbName="4x4 Desert Tours"
      title="4x4 Desert Tours Morocco"
      subtitle="Explore the Sahara beyond the dunes with private 4x4 adventures — hidden oases, nomad camps, fossil beds, and the wild beauty of Erg Chebbi."
      ctaText="Book a 4x4 Adventure"
      ctaLink="/trip-builder"
      trustBadges={defaultTrustBadges}
      highlights={features}
      faqs={[
        { question: "Do I need driving experience?", answer: "No — your professional local driver handles everything. You sit back, enjoy the scenery, and focus on the adventure." },
        { question: "How long are the 4x4 tours?", answer: "We offer half-day, full-day, and multi-day 4x4 expeditions. The classic morning tour covers the Black Desert, fossil beds, and Khamlia village." },
        { question: "Is it safe?", answer: "Yes — our drivers are born in the desert and have decades of experience navigating the dunes. Vehicles are modern, comfortable, and well-maintained." },
        { question: "What should I bring?", answer: "Sunglasses, sunscreen, a light scarf for dust, and your camera! We provide bottled water in the vehicle." },
        { question: "Can we combine a 4x4 tour with a camel trek?", answer: "Absolutely — many guests ride camels to the camp at sunset, then use a 4x4 for exploration the next morning. We'll design the perfect combination." },
      ]}
    />
  );
}