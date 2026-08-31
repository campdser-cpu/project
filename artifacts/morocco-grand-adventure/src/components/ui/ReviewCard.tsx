/**
 * ReviewCard — renders one verified Google customer review.
 * Traveler photos are published only when the supplied material supports a
 * confident customer-to-photo association; otherwise the card remains text-only.
 */
import { useEffect, useState } from 'react';
import { ExternalLink, Star, X } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const featuredImage = review.images[0];

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-background shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
      {featuredImage && (
        <div className="relative border-b border-border/70 bg-muted/30 p-2 md:p-3">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group/photo relative block w-full overflow-hidden rounded-[1.5rem] bg-background/70 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`Open traveler photo for ${review.name}`}
          >
            <img
              src={featuredImage.src}
              alt={featuredImage.alt}
              width={featuredImage.width}
              height={featuredImage.height}
              loading="lazy"
              decoding="async"
              className="mx-auto block max-h-[32rem] w-full object-contain transition-transform duration-700 group-hover/photo:scale-[1.015]"
              style={{ aspectRatio: `${featuredImage.width} / ${featuredImage.height}` }}
            />
            <span className="pointer-events-none absolute inset-x-3 bottom-3 rounded-full bg-black/45 px-3 py-2 text-center text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/photo:opacity-100 md:inset-x-auto md:right-4 md:w-auto">
              View photo
            </span>
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-semibold leading-tight text-foreground md:text-2xl">{review.name}</h3>
            <div className="mt-3 flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${s < review.rating ? 'fill-current text-primary' : 'text-muted-foreground/40'}`}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">{review.rating} out of 5 stars</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <SiGoogle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Google Review</span>
          </div>
        </div>

        <blockquote className="mb-6 text-[0.98rem] leading-7 text-muted-foreground md:text-base">
          <span aria-hidden="true" className="font-serif text-2xl leading-none text-primary/70">“</span>
          {review.text}
          <span aria-hidden="true" className="font-serif text-2xl leading-none text-primary/70">”</span>
        </blockquote>

        {review.translationNote && (
          <p className="mb-5 rounded-xl bg-muted/50 px-4 py-3 text-xs leading-5 text-muted-foreground">
            {review.translationNote}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/80">Source:</span> Google
            {review.relativeDate ? <span> · {review.relativeDate}</span> : null}
          </div>

          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/40 px-4 py-2.5 text-sm font-bold text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`Read ${review.name}'s review on Google`}
          >
            Read on Google <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {lightboxOpen && featuredImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${review.name} traveler photo`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close traveler photo"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img
            src={featuredImage.src}
            alt={featuredImage.alt}
            width={featuredImage.width}
            height={featuredImage.height}
            decoding="async"
            className="max-h-[90vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </article>
  );
}
