import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const features = [
  { title: "Fes el-Bali Medina Tours", description: "Explore the world's largest living medieval medina with an official local guide — tanneries, souks, and hidden courtyards.", image: "/images/dest/fes.jpg" },
  { title: "Chouara Tannery", description: "Witness the famous leather tanneries in action — a sensory experience unchanged for centuries." },
  { title: "Al-Qarawiyyin University", description: "Visit the world's oldest continuously operating university, founded in 859 AD by Fatima al-Fihri." },
  { title: "Chefchaouen Day Trip", description: "Drive to the Blue Pearl of Morocco — the Instagram-famous blue medina nestled in the Rif Mountains." },
  { title: "Meknès & Volubilis", description: "Explore the imperial city of Meknès and the spectacular Roman ruins of Volubilis — a UNESCO World Heritage site." },
  { title: "Sahara Desert Tours from Fes", description: "Start your Sahara adventure from Fes — cross the Middle Atlas to Merzouga and the golden dunes of Erg Chebbi." },
];

export default function FesTours() {
  return (
    <ExperiencePage
      id="fes-tours"
      heroImage="/images/dest/fes.jpg"
      heroAlt="Fes el-Bali medieval medina with the Chouara Tannery and ancient architecture"
      breadcrumbName="Fes Tours"
      title="Fes Tours"
      subtitle="Explore Morocco's cultural capital with expert local guides — the medieval medina, tanneries, imperial history, and unforgettable day trips."
      ctaText="Explore Fes Tours"
      ctaLink="/tours"
      trustBadges={defaultTrustBadges}
      highlights={features}
      faqs={[
        { question: "What is Fes famous for?", answer: "Fes is Morocco's spiritual and cultural heart — home to the world's oldest university, the famous Chouara Tannery, and one of the largest medieval medinas on earth." },
        { question: "How many days do I need in Fes?", answer: "We recommend 2 days to explore the medina and its highlights, plus a day trip to Chefchaouen or Meknès and Volubilis." },
        { question: "Do I need a guide for the Fes medina?", answer: "Yes — the medina is a labyrinth of over 9,000 streets. An official local guide ensures you see the highlights and don't get lost." },
        { question: "Can I start a Sahara tour from Fes?", answer: "Absolutely — many of our Sahara tours begin in Fes, crossing the Middle Atlas and cedar forests on the way to Merzouga." },
      ]}
    />
  );
}