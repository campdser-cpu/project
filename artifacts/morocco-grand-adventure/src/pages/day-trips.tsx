import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const features = [
  { title: "From Marrakech: Ourika Valley", description: "Lush valleys, waterfalls, Berber markets, and argan cooperatives — just one hour from the Red City.", image: "/images/dest/ourika-valley.jpg" },
  { title: "From Marrakech: Ouzoud Falls", description: "North Africa's highest waterfalls — Barbary macaques, rainbows, and boat trips beneath the cascades." },
  { title: "From Marrakech: Essaouira", description: "The windswept Atlantic port — fresh seafood, blue boats, and the famous ramparts of the UNESCO medina." },
  { title: "From Fes: Chefchaouen", description: "The Blue Pearl of Morocco — Instagram-famous blue medina nestled in the Rif Mountains." },
  { title: "From Fes: Meknès & Volubilis", description: "Imperial gates, Roman ruins, and the grandest of Morocco's forgotten imperial cities." },
  { title: "From Merzouga: Desert Explorer", description: "Full-day 4x4 explorations covering the Black Desert, fossil beds, Khamlia village, and hidden oases." },
];

export default function DayTrips() {
  return (
    <ExperiencePage
      id="day-trips"
      heroImage="/images/dest/ouzoud.jpg"
      heroAlt="Ouzoud waterfalls cascading into a turquoise pool in Morocco"
      breadcrumbName="Morocco Day Trips"
      title="Morocco Day Trips"
      subtitle="Unforgettable guided day trips from Marrakech, Fes, and Merzouga — waterfalls, blue cities, imperial ruins, and hidden desert gems."
      ctaText="Plan Your Day Trip"
      ctaLink="/trip-builder"
      trustBadges={defaultTrustBadges}
      highlights={features}
      faqs={[
        { question: "Can you customise a day trip?", answer: "Absolutely — every day trip can be tailored to your interests, pace, and starting point. We'll design the perfect itinerary for your schedule." },
        { question: "What does a day trip include?", answer: "Private air-conditioned transport, a professional English-speaking driver/guide, and hotel pickup and drop-off. Entrance fees and lunch are typically not included." },
        { question: "What is the best day trip from Marrakech?", answer: "The Ourika Valley is our most popular choice for a relaxing day trip, while the Sahara 3-day tour is perfect if you have more time." },
        { question: "Are day trips suitable for families?", answer: "Yes — all our day trips are private and can be adapted for children of all ages. We'll suggest stops that keep everyone engaged." },
      ]}
    />
  );
}