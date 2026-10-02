// ─────────────────────────────────────────────────────────────────────────────
// "What Your Day Looks Like" — the chronological flow of a single Day Trip
// product (duration "1 Day", one itineraryDay entry).
//
// This is deliberately NOT the multi-day zigzag timeline further down this
// page: a single day doesn't need a day-number badge or alternating layout,
// it needs a plain, scannable, top-to-bottom sequence. The data is the exact
// same ItineraryDay.stopDetails already used by the multi-day timeline —
// `time` is a label ("Morning", "Midday"), never an invented clock time, per
// the type's own documentation in src/data/content.ts.
// ─────────────────────────────────────────────────────────────────────────────
import { Clock, MapPin, Check, X } from 'lucide-react';
import type { ItineraryDay } from '@/data/content';

type DayTripFlowProps = {
  day: ItineraryDay;
  heading: string;
  lunchIncludedLabel: string;
  lunchNotIncludedLabel: string;
  className?: string;
};

export function DayTripFlow({ day, heading, lunchIncludedLabel, lunchNotIncludedLabel, className = '' }: DayTripFlowProps) {
  const stops = day.stopDetails && day.stopDetails.length > 0 ? day.stopDetails : undefined;

  return (
    <div className={className}>
      <h2 className="font-serif text-4xl text-foreground mb-10">{heading}</h2>
      {stops ? (
        <ol className="relative space-y-8 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary/40 before:via-primary/20 before:to-transparent">
          {stops.map((stop, i) => (
            <li key={i} className="relative flex gap-5 pl-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shrink-0 shadow-lg z-10">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 bg-card border border-border rounded-2xl p-6 flex-1 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
                  {stop.time && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {stop.time}
                    </span>
                  )}
                  <span className="font-serif text-xl text-foreground">{stop.title}</span>
                </div>
                {stop.desc && <p className="text-muted-foreground leading-relaxed">{stop.desc}</p>}
                {stop.lunch && (
                  <span
                    className={`inline-flex items-center gap-1.5 mt-3 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      stop.lunch === 'included'
                        ? 'border-green-500/25 bg-green-500/10 text-green-700'
                        : 'border-border bg-muted text-foreground/70'
                    }`}
                  >
                    {stop.lunch === 'included' ? <Check className="w-3 h-3 shrink-0" /> : <X className="w-3 h-3 shrink-0" />}
                    {stop.lunch === 'included' ? lunchIncludedLabel : lunchNotIncludedLabel}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-muted-foreground leading-relaxed">{day.desc}</p>
      )}
    </div>
  );
}
