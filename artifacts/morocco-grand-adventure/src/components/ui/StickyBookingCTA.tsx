import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';
import { contactInfo } from '@/data/content';
import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';

export function StickyBookingCTA() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  // Show after scrolling 600px, hide on booking/contact pages
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide on pages where booking is the primary focus
  if (location === '/contact' || location === '/trip-builder' || location === '/tours' || location.startsWith('/tours/')) {
    return null;
  }

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
              href="/trip-builder"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-3 rounded-xl font-bold text-xs tracking-wide"
            >
              <Calendar className="w-4 h-4 shrink-0" /> {t('sticky_custom_trip')}
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