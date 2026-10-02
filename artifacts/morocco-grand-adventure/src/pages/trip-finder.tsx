import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { MapPin, Calendar, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { tours } from '@/data/content';
import {
  CITY_HUBS,
  DURATION_BUCKETS,
  INTEREST_TAGS,
  durationInBucket,
  tourMatchesInterest,
  tourMatchesCity,
  type DepartureCity,
} from '@/data/tour-hierarchy';
import { trackEvent } from '@/lib/analytics';

/**
 * A guided entry point over the SAME deterministic filters /tours already
 * uses (src/data/tour-hierarchy.ts) — this page never computes its own match
 * set independently, so the live count shown here and the results shown
 * after clicking through to /tours can never drift apart. Submitting
 * navigates to /tours?city=&duration=&style= (query params only, already
 * excluded from indexing) rather than generating indexable URL combinations.
 */
export default function TripFinder() {
  const { t, lang } = useLanguage();
  const [city, setCity] = useState<DepartureCity | ''>('');
  const [duration, setDuration] = useState<string>('');
  const [interest, setInterest] = useState<string>('');

  useEffect(() => {
    trackEvent('trip_finder_open', { source_page: 'trip-finder' });
  }, []);

  const matchCount = useMemo(() => {
    return tours.filter((tour) => {
      if (city && !tourMatchesCity(tour.id, city)) return false;
      if (duration && !durationInBucket(tour.duration, duration)) return false;
      if (interest && !tourMatchesInterest(tour, interest)) return false;
      return true;
    }).length;
  }, [city, duration, interest]);

  function select(dimension: 'city' | 'duration' | 'interest', value: string) {
    trackEvent('trip_finder_filter', { filter: dimension, value });
    if (dimension === 'city') setCity((prev) => (prev === value ? '' : (value as DepartureCity)));
    if (dimension === 'duration') setDuration((prev) => (prev === value ? '' : value));
    if (dimension === 'interest') setInterest((prev) => (prev === value ? '' : value));
  }

  const resultsHref = useMemo(() => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (duration) params.set('duration', duration);
    if (interest) params.set('style', interest);
    const qs = params.toString();
    return qs ? `/tours?${qs}` : '/tours';
  }, [city, duration, interest]);

  const pillClass = (active: boolean) =>
    `rounded-2xl border px-5 py-3.5 text-sm font-semibold transition-all text-left ${
      active
        ? 'bg-primary text-primary-foreground border-primary shadow-md -translate-y-0.5'
        : 'bg-background border-border hover:border-primary/50 hover:shadow-sm'
    }`;

  return (
    <Layout>
      <div className="bg-background pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" aria-hidden="true" /> {t('tf_badge')}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-5">{t('tf_heading')}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('tf_sub')}</p>
          </div>

          <div className="bg-card border border-border rounded-[2rem] shadow-xl p-6 md:p-10 space-y-10">
            {/* Starting city */}
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl md:text-2xl text-foreground mb-5">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" /> {t('tf_step_city')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label={t('tf_step_city')}>
                {CITY_HUBS.map((hub) => (
                  <button key={hub.id} onClick={() => select('city', hub.id)} className={pillClass(city === hub.id)}>
                    {t(`hub_${hub.id}_name` as Parameters<typeof t>[0])}
                  </button>
                ))}
                <button onClick={() => select('city', '')} className={pillClass(city === '')}>
                  {t('tf_any')}
                </button>
              </div>
            </div>

            {/* Trip length */}
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl md:text-2xl text-foreground mb-5">
                <Calendar className="w-5 h-5 text-primary" aria-hidden="true" /> {t('tf_step_duration')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label={t('tf_step_duration')}>
                {DURATION_BUCKETS.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => select('duration', b.value)}
                    className={pillClass(duration === b.value)}
                  >
                    {t(`tours_dur_${b.value.replace('-', '_')}` as Parameters<typeof t>[0])}
                  </button>
                ))}
                <button onClick={() => select('duration', '')} className={pillClass(duration === '')}>
                  {t('tf_any')}
                </button>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl md:text-2xl text-foreground mb-5">
                <Heart className="w-5 h-5 text-primary" aria-hidden="true" /> {t('tf_step_interest')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label={t('tf_step_interest')}>
                {INTEREST_TAGS.map((tag) => (
                  <button key={tag} onClick={() => select('interest', tag)} className={pillClass(interest === tag)}>
                    {t(`tours_style_${tag}` as Parameters<typeof t>[0])}
                  </button>
                ))}
                <button onClick={() => select('interest', '')} className={pillClass(interest === '')}>
                  {t('tf_any')}
                </button>
              </div>
            </div>

            {/* Results CTA */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-5">
              <span className="text-foreground font-semibold">
                {matchCount} {matchCount === 1 ? t('tours_tour') : t('tours_tours')} {t('tours_matching')}
              </span>
              <Link
                href={resultsHref}
                onClick={() => trackEvent('trip_finder_result_click', { city, duration, interest, match_count: matchCount })}
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                {t('tf_see_matches')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Custom trip escape hatch — private-only business, so "shared vs
              private" is never offered as a filter; "custom" is a distinct
              path instead, matching how the rest of the site already routes
              bespoke requests to /trip-builder. */}
          <div className="mt-10 bg-muted/40 border border-border rounded-3xl p-8 text-center">
            <h3 className="font-serif text-2xl text-foreground mb-2">{t('tf_custom_heading')}</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t('tf_custom_body')}</p>
            <Link
              href="/trip-builder"
              className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-primary px-7 py-3.5 rounded-full font-bold transition-colors"
            >
              {t('tf_custom_cta')} <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Honest "not a product filter" paths — food interest and student
              travel are real, but neither is a genuine tour-matching
              dimension in the current catalog, so they are offered as their
              own links rather than a filter pill with thin or fake results. */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <span>{t('tf_other_paths')} </span>
            <Link href="/travel-info/moroccan-food-and-cuisine" className="font-semibold text-primary hover:underline">
              {t('tf_food_link')}
            </Link>
            <span> · </span>
            <Link href="/student-tours" className="font-semibold text-primary hover:underline">
              {t('tf_student_link')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
