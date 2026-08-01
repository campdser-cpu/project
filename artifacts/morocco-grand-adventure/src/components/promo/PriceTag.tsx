import { discountedPrice } from '@/lib/promo';
import { usePromoActive } from './PromoProvider';

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
const OLD: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
  xl: 'text-xl',
};

/** Shows the discounted price with the original struck through (while promo active). */
export function PriceTag({ price, size = 'md', tone = 'default', className = '' }: Props) {
  const active = usePromoActive();
  const orig = typeof price === 'string' ? parseInt(price.replace(/[^\d.]/g, ''), 10) : price;
  const disc = discountedPrice(orig);
  const strike = tone === 'onDark' ? 'text-white/60' : 'text-muted-foreground';
  const plain = tone === 'onDark' ? 'text-white' : 'text-foreground';

  if (!active) {
    return <span className={`font-serif font-bold ${plain} ${NUM[size]} ${className}`}>${orig}</span>;
  }
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`font-medium line-through ${strike} ${OLD[size]}`}>${orig}</span>
      <span className={`font-serif font-bold text-primary ${NUM[size]}`}>${disc}</span>
    </span>
  );
}
