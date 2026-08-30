/**
 * ReviewCard — renders one verified Google customer review.
 * Traveler photos are published only when the supplied material supports a
 * confident customer-to-photo association; otherwise the card remains text-only.
 */
import { ExternalLink, Star } from 'lucide-react';
import { verifiedGoogleReviews } from '@/data/verifiedReviews';

export type ReviewCardProps = {
  /** Kept for compatibility with the existing homepage API. */
  name?: string;
  country?: string;
  quote?: string;
  tour?: string;
  rating?: number;
  index?: number;
};

export function ReviewCard({ index = 0 }: ReviewCardProps) {
  const review = verifiedGoogleReviews[index % verifiedGoogleReviews.length];

  return (
    <article className="bg-background/60 backdrop-blur-sm border border-border p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
        <div>
          <h3 className="font-bold text-foreground text-base md:text-lg">{review.name}</h3>
          <div className="flex items-center gap-0.5 mt-2" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, s) => (
              <Star key={s} className={`w-4 h-4 ${s < review.rating ? 'fill-current text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
            ))}
          </div>
        </div>
        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Google Review</span>
      </div>

      <p className="text-muted-foreground mb-4 relative z-10 text-sm leading-relaxed">“{review.text}”</p>

      {review.translationNote && (
        <p className="text-xs text-muted-foreground mb-4 relative z-10">{review.translationNote}</p>
      )}

      {review.images.length > 0 && (
        <div className={`${review.images.length > 1 ? 'grid grid-cols-2' : 'grid grid-cols-1'} gap-2 mb-5 relative z-10`}>
          {review.images.slice(0, 2).map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-80 object-cover rounded-xl border border-border"
            />
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-border relative z-10">
        {review.relativeDate && (
          <p className="text-xs text-muted-foreground mb-3">Shown in supplied screenshot as: {review.relativeDate}</p>
        )}
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          aria-label={`View ${review.name} review on Google`}
        >
          See original review on Google <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
