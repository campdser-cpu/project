// ─────────────────────────────────────────────────────────────────────────────
// Departure Calendar — the filterable, data-driven departure browser for the
// Student Tours hub. Reads only from src/data/student-group-departures.ts
// (the single source of truth, recurring weekly schedule + any manually
// confirmed override) joined against src/data/student-tours.ts for each
// tour's title/route/slug. No date, price or seat count is ever invented
// here: with zero departures the honest empty state renders, and every
// auto-generated weekly slot is clearly labelled "Request to Join" rather
// than implying a guaranteed, staffed departure (see departureDisplayStatus).
//
// Duration filter chips are built from the real tour catalog (not hard-coded
// 3/4/5), so a new product appears automatically. Departures are grouped by
// calendar month with Prev/Next navigation rather than one long scrolling
// list, since the weekly schedule can produce ~150 cards across a year.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { StudentTour } from '@/data/student-tours';
import {
  type StudentGroupDeparture,
  seatsAvailable,
  departureDisplayStatus,
  isJoinable,
  type DepartureDisplayStatus,
} from '@/data/student-group-departures';
import { trackEvent } from '@/lib/analytics';

type Props = {
  departures: StudentGroupDeparture[];
  tours: StudentTour[];
  lang: string;
  t: (key: string) => string;
  onJoinNow: (tourSlug: string, departureId: string) => void;
};

const STATUS_STYLE: Record<DepartureDisplayStatus, { key: string; cls: string }> = {
  request: { key: 'st_dc_status_request', cls: 'border-primary/40 bg-primary/10 text-primary' },
  available: { key: 'st_dc_status_available', cls: 'border-primary/40 bg-primary/10 text-primary' },
  'almost-full': { key: 'st_dc_status_almost_full', cls: 'border-amber-500/40 bg-amber-500/10 text-amber-700' },
  full: { key: 'st_dc_status_full', cls: 'border-muted-foreground/30 bg-muted text-muted-foreground' },
  'sold-out': { key: 'st_dc_status_sold_out', cls: 'border-muted-foreground/30 bg-muted text-muted-foreground' },
  closed: { key: 'st_dc_status_closed', cls: 'border-muted-foreground/30 bg-muted text-muted-foreground' },
};

function formatRange(start: string, end: string, lang: string): string {
  const s = new Date(`${start}T00:00:00`);
  const e = new Date(`${end}T00:00:00`);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString(lang, opts)} → ${e.toLocaleDateString(lang, opts)}`;
}

function formatMoney(amount: number, currency: string, lang: string): string {
  try {
    return new Intl.NumberFormat(lang, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function formatMonthLabel(monthKey: string, lang: string): string {
  const [y, m] = monthKey.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1, 1, 12, 0, 0));
  return d.toLocaleDateString(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function DepartureCalendar({ departures, tours, lang, t, onJoinNow }: Props) {
  const tourBySlug = useMemo(() => new Map(tours.map((tr) => [tr.slug, tr])), [tours]);
  const durations = useMemo(() => [...new Set(tours.map((tr) => tr.duration))].sort((a, b) => parseInt(a) - parseInt(b)), [tours]);
  const [filter, setFilter] = useState<string>('all');
  const [monthIndex, setMonthIndex] = useState(0);

  const filtered = useMemo(() => {
    if (filter === 'all') return departures;
    return departures.filter((d) => tourBySlug.get(d.tourSlug)?.duration === filter);
  }, [departures, filter, tourBySlug]);

  // Real calendar months that actually contain a departure for the current
  // filter, in order — never a fixed "12 tiles" list, since a filter can
  // leave some months empty.
  const months = useMemo(() => [...new Set(filtered.map((d) => d.startDate.slice(0, 7)))].sort(), [filtered]);

  // Re-anchor to the nearest upcoming month whenever the filter changes, so
  // switching from "All" to "5-day" never strands the visitor on a now-empty month.
  useEffect(() => { setMonthIndex(0); }, [filter]);

  const currentMonthKey = months[monthIndex];
  const monthDepartures = useMemo(
    () => (currentMonthKey ? filtered.filter((d) => d.startDate.startsWith(currentMonthKey)) : []),
    [filtered, currentMonthKey],
  );

  const setFilterTracked = (value: string) => {
    setFilter(value);
    trackEvent('departure_filter', { filter: value });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('st_dc_filter_label')}>
        <button
          type="button"
          onClick={() => setFilterTracked('all')}
          aria-pressed={filter === 'all'}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary/50'}`}
        >
          {t('st_dc_filter_all')}
        </button>
        {durations.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setFilterTracked(d)}
            aria-pressed={filter === d}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === d ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary/50'}`}
          >
            {d}
          </button>
        ))}
      </div>

      {months.length > 0 && (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
            disabled={monthIndex === 0}
            aria-label={t('st_dc_prev_month')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="font-serif text-lg text-foreground" aria-live="polite">{formatMonthLabel(currentMonthKey, lang)}</p>
          <button
            type="button"
            onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
            disabled={monthIndex >= months.length - 1}
            aria-label={t('st_dc_next_month')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {monthDepartures.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {monthDepartures.map((d) => {
            const tour = tourBySlug.get(d.tourSlug);
            if (!tour) return null;
            const status = departureDisplayStatus(d);
            const seats = seatsAvailable(d);
            const style = STATUS_STYLE[status];
            const joinable = isJoinable(d);
            return (
              <div key={d.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" /> {formatRange(d.startDate, d.endDate, lang)}
                </p>
                <h3 className="mt-2 font-serif text-xl text-foreground">{tour.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {tour.overview.start} → {tour.overview.end}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-foreground">
                    {d.pricePerPerson ? formatMoney(d.pricePerPerson, d.currency ?? 'EUR', lang) : t('st_dc_price_on_request')}
                  </span>
                  {d.pricePerPerson && <span className="text-xs text-muted-foreground">{t('st_dc_per_person')}</span>}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${style.cls}`}>
                    {t(style.key)}
                  </span>
                  {(status === 'available' || status === 'almost-full') && (
                    <span className="text-xs text-muted-foreground">{seats} {t('st_jn_seats_left')}</span>
                  )}
                </div>
                {status === 'request' && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t('st_dc_request_note')}</p>
                )}
                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/student-tours/${tour.slug}`}
                    onClick={() => trackEvent('departure_view', { tour_slug: tour.slug, departure_id: d.id })}
                    className="flex-1 rounded-xl border-2 border-foreground py-2.5 text-center text-sm font-bold text-foreground hover:bg-foreground hover:text-background"
                  >
                    {t('st_dc_read_tour')}
                  </Link>
                  {joinable && (
                    <button
                      type="button"
                      onClick={() => { trackEvent('join_now_click', { tour_slug: tour.slug, departure_id: d.id, source: 'calendar' }); onJoinNow(tour.slug, d.id); }}
                      className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
                    >
                      {t('st_dc_join_now')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-serif text-xl text-foreground">{t('st_dc_empty_title')}</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{t('st_dc_empty_text')}</p>
        </div>
      )}
    </div>
  );
}
