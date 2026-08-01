import { useLanguage } from '@/contexts/LanguageContext';
import { waPromoLink } from '@/lib/promo';
import { usePromoActive } from './PromoProvider';

type Props = {
  /** Optional tour name appended to the WhatsApp message so the owner knows the context. */
  tourName?: string;
  size?: 'md' | 'lg';
  full?: boolean;
  className?: string;
};

/** WhatsApp call-to-action that opens a chat pre-filled with the promo message. */
export function PromoCta({ tourName, size = 'md', full = false, className = '' }: Props) {
  const { t } = useLanguage();
  const active = usePromoActive();
  if (!active) return null;
  const message = tourName ? `${t('promo_wa_message')}\n\n— ${tourName}` : t('promo_wa_message');
  return (
    <a
      href={waPromoLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-xl ${
        size === 'lg' ? 'px-8 py-4 text-base md:text-lg' : 'px-6 py-3 text-sm md:text-base'
      } ${full ? 'w-full' : ''} ${className}`}
    >
      <span className="text-lg leading-none">📲</span>
      <span>{t('promo_cta')}</span>
    </a>
  );
}
