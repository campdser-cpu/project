/**
 * ReviewCard — displays a single customer review with star rating,
 * reviewer avatar (initials), name, country flag, quote, and tour.
 *
 * Extracted from the inline markup in the home page so it can be reused
 * across the site (e.g. about page, tour detail "why travelers choose us").
 *
 * The star rating defaults to 5 (all five-review showcase), but a numeric
 * `rating` prop can be passed for partial ratings.
 */
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export type ReviewCardProps = {
  /** Reviewer display name (used to compute avatar initials). */
  name: string;
  /** Country flag emoji rendered next to the name. */
  country?: string;
  /** The review body text. */
  quote: string;
  /** Name of the tour the reviewer booked. */
  tour: string;
  /** Star rating 1–5 (default 5). */
  rating?: number;
  /** Optional index for animation stagger. */
  index?: number;
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewCard({
  name,
  country = '',
  quote,
  tour,
  rating = 5,
  index = 0,
}: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-background/60 backdrop-blur-sm border border-border p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative"
    >
      {/* Decorative star accent in the corner */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 text-primary/20" aria-hidden="true">
        <Star className="w-10 h-10 md:w-12 md:h-12 fill-current" />
      </div>

      {/* Reviewer header: avatar + name + stars */}
      <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 relative z-10">
        <div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/15 text-primary font-serif text-lg md:text-xl font-bold flex items-center justify-center border-2 border-primary/20 shrink-0"
          aria-hidden="true"
        >
          {getInitials(name)}
        </div>
        <div>
          <h4 className="font-bold text-foreground text-base md:text-lg">
            {name} <span className="text-sm md:text-base text-muted-foreground">{country}</span>
          </h4>
          <div className="flex text-primary gap-0.5 mt-1">
            {Array.from({ length: 5 }, (_, s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${s < rating ? 'fill-current' : 'opacity-30'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review quote */}
      <p className="text-muted-foreground italic mb-5 md:mb-6 relative z-10 text-sm leading-relaxed">
        "{quote}"
      </p>

      {/* Tour badge */}
      <div className="text-xs font-bold text-primary tracking-wide uppercase border-t border-border pt-4 relative z-10">
        {tour}
      </div>
    </motion.div>
  );
}