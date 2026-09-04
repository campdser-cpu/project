import { Link } from 'wouter';
import { Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PriceTag } from '../promo/PriceTag';
import { PromoBadge } from '../promo/PromoBadge';
import type { Tour } from '@/data/content';

type TourCardProps = {
  tour: Tour;
  /** Compact variant used inside related-tour grids. */
  compact?: boolean;
};

const FALLBACK_IMG = '/images/dest/merzouga.webp';

export function TourCard({ tour, compact = false }: TourCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/tours/${tour.id}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-500 h-full"
      aria-label={tour.name}
    >
      <div className={`${compact ? 'h-48' : 'h-60'} relative overflow-hidden`}>
        <img
          src={tour.image}
          srcSet={`${tour.image.replace(/\.webp$/, '-480w.webp')} 480w, ${tour.image.replace(/\.webp$/, '-768w.webp')} 768w, ${tour.image} 1200w`}
          sizes={compact ? '300px' : '(max-width: 768px) 100vw, 400px'}
          alt={tour.name}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMG;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {tour.duration}
        </div>
        <div className="absolute top-3 right-3">
          <PromoBadge compact />
        </div>
      </div>

      <div className={`${compact ? 'p-5' : 'p-7'} flex flex-col`}>
        <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">
          {tour.category ?? t('tour_private')}
        </span>
        <h3
          className={`font-serif text-foreground group-hover:text-primary transition-colors ${
            compact ? 'text-lg leading-snug' : 'text-2xl leading-tight'
          } mb-3`}
        >
          {tour.name}
        </h3>
        <p className={`text-muted-foreground line-clamp-2 ${compact ? 'text-sm' : ''} mb-5`}>
          {tour.highlights.slice(0, 3).join(' · ')}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider block">{t('from')}</span>
            <PriceTag price={tour.price} size={compact ? 'sm' : 'md'} />
          </div>
          <span className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
            {t('tours_view')} <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}