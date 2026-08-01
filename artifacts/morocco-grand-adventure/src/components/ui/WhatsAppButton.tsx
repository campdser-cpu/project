import { motion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { contactInfo } from '@/data/content';

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <div className="hidden md:block mr-4 bg-white text-foreground px-4 py-2 rounded-xl shadow-lg border border-border opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none font-bold text-sm">
        Book Now
      </div>
      <motion.a
        href={contactInfo.whatsapp}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 transition-shadow"
      >
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
        <SiWhatsapp className="w-7 h-7 relative z-10" />
      </motion.a>
    </div>
  );
}
