import { hasPublishedPrice } from '@/lib/promo';
import { useLanguage } from '@/contexts/LanguageContext';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Props = {
  price: number | string;
  size?: Size;
  tone?: 'default' | 'onDark';
  className?: string;
};

const NUM: Record<Size, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl md:text-5xl',
};
/**
 * Shows a tour's published price, or the tailored-quote line where there is none.
 *
 * The published price is shown plainly, with no struck-through "original" beside
 * it. The site-wide 10% promotion no longer applies to these prices: they are the
 * premium private rates the business publishes, and inventing a higher figure to
 * cross out would be a fake discount on a price that was never charged.
 */
export function PriceTag({ price, size = 'md', tone = 'default', className = '' }: Props) {
  const { t } = useLanguage();
  if (!hasPublishedPrice(price)) {
    const tone_ = tone === 'onDark' ? 'text-white' : 'text-foreground';
    return <span className={`font-semibold ${tone_} ${className}`}>{t('price_tailored')}</span>;
  }
  const amount = typeof price === 'string' ? parseInt(price.replace(/[^\d.]/g, ''), 10) : price;
  if (!Number.isFinite(amount) || amount <= 0) {
    const tone_ = tone === 'onDark' ? 'text-white' : 'text-foreground';
    return <span className={`font-semibold ${tone_} ${className}`}>{t('price_tailored')}</span>;
  }
  const plain = tone === 'onDark' ? 'text-white' : 'text-foreground';
  return <span className={`font-serif font-bold ${plain} ${NUM[size]} ${className}`}>€{amount}</span>;
}
