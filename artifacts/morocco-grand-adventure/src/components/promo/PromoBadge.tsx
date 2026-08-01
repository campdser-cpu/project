import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePromoActive } from './PromoProvider';

type Props = { compact?: boolean; className?: string };

/** Elegant animated gold badge: "2026 Special Offer · Save 10%". */
export function PromoBadge({ compact = false, className = '' }: Props) {
  const { t } = useLanguage();
  const active = usePromoActive();
  if (!active) return null;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#B8912F] via-[#F0D58B] to-[#B8912F] font-bold text-[#3a2c00] shadow-lg shadow-[#C9A84C]/40 ring-1 ring-[#f5e6b0]/60 ${
        compact ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/50 blur-sm animate-promo-shine" />
      <Sparkles className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} strokeWidth={2.5} />
      <span className="relative whitespace-nowrap tracking-wide">
        {compact ? t('promo_save10') : `${t('promo_badge')} · ${t('promo_save10')}`}
      </span>
    </motion.span>
  );
}
