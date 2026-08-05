import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const faqs = [
  { question: "When is the best time to visit Morocco?", answer: "Spring (March–May) and autumn (September–November) offer the most pleasant temperatures. For the Sahara, October to April is ideal. Coastal areas are pleasant year-round." },
  { question: "Do I need a visa to enter Morocco?", answer: "Citizens of the US, Canada, UK, Australia, EU, and most Western countries do not need a visa for stays up to 90 days. Your passport must be valid for at least 6 months from arrival." },
  { question: "Is Morocco safe to travel?", answer: "Morocco is one of the safest destinations in Africa and the Arab world. Our local guides ensure you navigate the souks and desert routes with complete confidence and peace of mind." },
  { question: "Are your tours private or shared?", answer: "All our tours are completely private — you travel with your own dedicated driver/guide, no strangers joining your group. This gives you complete flexibility with your itinerary." },
  { question: "What should I pack for a desert tour?", answer: "Light layers (desert days are hot, nights are cool), a scarf for wind and sun, quality sunscreen, sunglasses, a torch, comfortable walking shoes, and a power bank." },
  { question: "What languages do your guides speak?", answer: "Our professional guides speak English, French, Spanish, Arabic, Berber, Italian, and Portuguese. Request your preferred language when booking." },
  { question: "How can I pay?", answer: "We accept bank transfer, PayPal, and cash (MAD/EUR/USD). A 20% deposit secures your reservation; the balance is due on arrival." },
  { question: "Can you accommodate dietary restrictions?", answer: "Absolutely — vegetarian, vegan, gluten-free, halal, and allergy-specific menus are all catered for. Please inform us at the time of booking." },
  { question: "What is your cancellation policy?", answer: "Free cancellation up to 30 days before your tour start date. Between 30 and 15 days, a 50% refund applies. Within 15 days, the deposit is non-refundable." },
  { question: "Do you offer airport transfers?", answer: "Yes — all tours include private airport pickup and drop-off. We can also arrange accommodation before and after your tour if needed." },
];

export default function Faq() {
  return (
    <ExperiencePage
      id="faq"
      heroImage="/images/dest/marrakech.jpg"
      heroAlt="Morocco travel FAQ - ancient medina of Marrakech"
      breadcrumbName="Travel FAQ"
      title="Morocco Travel FAQ"
      subtitle="Answers to your most common questions about traveling in Morocco — visas, safety, packing, payments, and booking with Morocco Grand Adventure."
      ctaText="Ask Us a Question"
      ctaLink="/contact"
      trustBadges={defaultTrustBadges}
      faqs={faqs}
    />
  );
}