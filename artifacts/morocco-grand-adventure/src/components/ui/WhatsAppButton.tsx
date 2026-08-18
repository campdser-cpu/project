import { motion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { contactInfo } from '@/data/content';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

type WhatsAppButtonContext = {
  tour?: {
    name: string;
    slug?: string;
  };
  destination?: {
    name: string;
  };
  article?: {
    title: string;
  };
  message?: string;
};

/**
 * Build a contextual WhatsApp intro message based on the current route
 * so travelers get a page-relevant message instead of a generic one.
 */
function defaultMessageForRoute(path: string): string {
  const base = (msg: string) =>
    `Hello Morocco Grand Adventure, ${msg} I'd like to travel around available dates for my group. Could you please send me the available options and details?`;

  if (path === '/' || path === '') {
    return 'Hello Morocco Grand Adventure, I’m interested in planning a Morocco trip with you. I’d like to travel around available dates for my group. Could you please send me the available options and details?';
  }
  if (/^\/desert-tours/.test(path)) return base('I’m interested in a Sahara desert trip.');
  if (/^\/camel-trekking/.test(path)) return base('I’m interested in camel trekking.');
  if (/^\/4x4-tours/.test(path)) return base('I’m interested in a 4x4 desert tour.');
  if (/^\/tours\/.+/.test(path)) return base('I’m interested in this tour — could you check availability for me?');
  if (/^\/blog\/.+/.test(path)) return base('I’m interested in this Morocco itinerary from your blog.');
  if (/^\/luxury-camp/.test(path)) return base('I’m interested in your luxury desert camp.');
  if (/^\/marrakech-tours/.test(path)) return base('I’m interested in a Marrakech tour.');
  if (/^\/fes-tours/.test(path)) return base('I’m interested in a Fès tour.');
  if (/^\/day-trips/.test(path)) return base('I’m interested in a day trip.');
  if (/^\/merzouga-guide/.test(path)) return base('I’m interested in a Merzouga desert trip.');
  if (/^\/destinations\/.+/.test(path)) return base('I’m interested in this destination.');
  if (/^\/destinations/.test(path)) return base('I’m interested in visiting Morocco.');
  if (/^\/trip-builder/.test(path)) base('I’d like help building a custom Morocco trip.');
  if (/^\/about/.test(path)) base('I’d like to learn more and plan a trip.');
  return base('I’m interested in your Morocco tours.');
}

export function WhatsAppButton({ tour, destination, article, message }: WhatsAppButtonContext = {}) {
  const { t } = useLanguage();
  const [location] = useLocation();

  // Priority: explicit message → per-page props → route-derived default.
  let whatsappMessage = message;
  if (!whatsappMessage) {
    if (tour?.name) {
      whatsappMessage = `Hello Morocco Grand Adventure, I'm interested in ${tour.name}. I'd like to travel around available dates for my group. Could you please send me the available options and details?`;
    } else if (destination?.name) {
      whatsappMessage = `Hello Morocco Grand Adventure, I'm interested in a ${destination.name} desert trip. I'd like to travel around available dates for my group. Could you please send me the available options and details?`;
    } else if (article?.title) {
      whatsappMessage = `Hello Morocco Grand Adventure, I'm interested in "${article.title}". I'd like to travel around available dates for my group. Could you please send me the available options and details?`;
    } else {
      whatsappMessage = defaultMessageForRoute(location);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <div className="hidden md:block mr-4 bg-white text-foreground px-4 py-2 rounded-xl shadow-lg border border-border opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none font-bold text-sm">
        {t('wa_book_now')}
      </div>
      <motion.a
        href={contactInfo.whatsapp + (whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : '')}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 transition-shadow"
        aria-label={t('wa_book_now')}
      >
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
        <SiWhatsapp className="w-7 h-7 relative z-10" />
      </motion.a>
    </div>
  );
}
