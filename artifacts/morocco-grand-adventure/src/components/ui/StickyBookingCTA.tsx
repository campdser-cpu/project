import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';
import { contactInfo } from '@/data/content';
import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';

const BOOK_LABELS: Record<string, string> = {
  en: 'Book Now — Pay Later', fr: 'Réserver — Payer plus tard', es: 'Reserva — Paga después', it: 'Prenota — Paga dopo', de: 'Jetzt buchen — später zahlen', nl: 'Boek nu — betaal later', pt: 'Reserve — pague depois', zh: '立即预订 — 稍后付款', ja: '今すぐ予約 — 後払い', ko: '지금 예약 — 나중에 결제', ar: 'احجز الآن — ادفع لاحقًا',
};

export function StickyBookingCTA() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the dedicated booking/contact flows clean, but make the CTA available on tours and content pages.
  if (location === '/contact' || location === '/trip-builder' || location === '/build-your-day-trip') return null;

  const bookLabel = BOOK_LABELS[lang] ?? BOOK_LABELS.en;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="grid grid-cols-3 gap-2 p-3">
            <Link
              href="/contact?mode=booking"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-3 rounded-xl font-bold text-xs tracking-wide"
            >
              <Calendar className="w-4 h-4 shrink-0" /> {bookLabel}
            </Link>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-3 py-3 rounded-xl font-bold text-xs tracking-wide"
            >
              <SiWhatsapp className="w-4 h-4 shrink-0" /> {t('sticky_whatsapp')}
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 bg-foreground text-background px-3 py-3 rounded-xl font-bold text-xs tracking-wide"
            >
              <Phone className="w-4 h-4 shrink-0" /> {t('sticky_call_now')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
