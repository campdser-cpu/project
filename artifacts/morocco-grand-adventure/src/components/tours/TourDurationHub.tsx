import { Link } from 'wouter';
import { Clock, Route, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '../layout/Layout';
import { getLocalizedTours, getLocalizedDestinations, getLocalizedFaq } from '@/i18n/content';
import { StructuredData, buildBreadcrumb, buildFaqSchema } from '../seo/StructuredData';
import { TourCard } from './TourCard';
import { TourBreadcrumbs } from './TourBreadcrumbs';
import { CityHub, TOUR_DEPARTURE_CITY, tourDurationDays } from '@/data/tour-hierarchy';
import { fmtTemplate, renderWithLinks } from './intl';

type TourDurationHubProps = {
  hub: CityHub;
  durationDays: number;
};

const FALLBACK_IMG = '/images/dest/merzouga.webp';

/**
 * A focused duration hub (e.g. /tours/from-marrakech/3-days). Renders the real
 * tours from the central data source that depart from this city and match the
 * requested length, wrapped in useful, natural-language editorial content — never
 * a bare list of links.
 */
export function TourDurationHub({ hub, durationDays }: TourDurationHubProps) {
  const { t, lang } = useLanguage();
  const allTours = getLocalizedTours(lang);
  const tours = allTours
    .filter((tour) => TOUR_DEPARTURE_CITY[tour.id] === hub.id && tourDurationDays(tour.duration) === durationDays)
    .sort((a, b) => tourDurationDays(a.duration) - tourDurationDays(b.duration));

  // Other durations departing from the same city, for onward navigation.
  const siblings = allTours
    .filter((tour) => TOUR_DEPARTURE_CITY[tour.id] === hub.id && tourDurationDays(tour.duration) !== durationDays)
    .sort((a, b) => tourDurationDays(a.duration) - tourDurationDays(b.duration));

  const destinations = getLocalizedDestinations(lang).filter((d) => hub.destinationIds.includes(d.id));
  const faqs = getLocalizedFaq(lang).slice(0, 4);

  const cityName = t(`hub_${hub.id}_name`);
  const hubTitle = t(`hub_${hub.id}_title`);
  const crumbLabel = fmtTemplate(t('hub_dur_crumb'), { days: durationDays, city: cityName });
  const crumbs = [
    { label: t('nav_tours'), href: '/tours' },
    { label: hubTitle, href: `/tours/from-${hub.slug}` },
    { label: crumbLabel },
  ];

  const schemaCrumbs = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_tours'), path: '/tours' },
    { name: hubTitle, path: `/tours/from-${hub.slug}` },
    { name: crumbLabel, path: `/tours/from-${hub.slug}/${durationDays}-days` },
  ];

  return (
    <Layout>
      <StructuredData id={`hub-${hub.id}-${durationDays}d`} data={buildBreadcrumb(schemaCrumbs, lang)} />

      {/* Hero */}
      <section className="relative h-[48vh] w-full flex flex-col justify-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hub.heroImage}
            alt={fmtTemplate(t('hub_dur_hero_alt'), { days: durationDays, city: cityName })}
            width={1600}
            height={900}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-12">
          <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur border border-primary/30 text-white text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4">
            <Clock className="w-4 h-4" aria-hidden="true" /> {fmtTemplate(t('hub_dur_badge'), { days: durationDays, city: cityName })}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-5 drop-shadow-xl">
            {fmtTemplate(t('hub_dur_h1'), { days: durationDays, city: cityName })}
          </h1>
          <p className="text-white/85 text-base md:text-lg font-light max-w-3xl leading-relaxed">
            {durationDays === 3
              ? fmtTemplate(t('hub_dur_intro_3'), { days: durationDays, city: cityName })
              : fmtTemplate(t('hub_dur_intro_default'), { days: durationDays, city: cityName })}
          </p>
        </div>
      </section>

      {/* Breadcrumbs overlay strip */}
      <div className="bg-black/40 backdrop-blur border-b border-white/10">
        <TourBreadcrumbs items={crumbs} />
      </div>

      {/* Intro body — natural, keyword-relevant copy */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl text-muted-foreground leading-relaxed text-lg">
            {durationDays === 3 ? (
              <p>
                {renderWithLinks(
                  fmtTemplate(t('hub_dur_body_3_day'), { days: durationDays, city: cityName }),
                  [
                    { token: '{erg}', href: '/destinations/erg-chebbi', label: t('hub_dest_erg_chebbi') },
                    { token: '{ait}', href: '/destinations/ait-ben-haddou', label: t('hub_dest_ait_ben_haddou') },
                  ],
                )}
              </p>
            ) : (
              <p>
                {fmtTemplate(t('hub_dur_body_default'), { days: durationDays, city: cityName })}
              </p>
            )}
          </div>
        </div>
      </section>
{/* Matching tours */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            {fmtTemplate(t('hub_dur_dept_title'), { days: durationDays, city: cityName })}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {t('hub_dur_dept_sub')}
          </p>

          {tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-10 text-center">
              <Route className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-serif text-2xl text-foreground mb-3">
                {fmtTemplate(t('hub_dur_none_title'), { days: durationDays, city: cityName })}
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                {fmtTemplate(t('hub_dur_none_body'), { days: durationDays, city: cityName })}
              </p>
              <Link
                href="/trip-builder"
                className="inline-block bg-foreground text-background px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t('nav_build_journey')}
              </Link>
            </div>
          )}

          {/* Other durations from same city */}
          {siblings.length > 0 && (
            <div className="mt-14">
              <h3 className="font-serif text-2xl text-foreground mb-4">{fmtTemplate(t('hub_dur_other'), { city: cityName })}</h3>
              <ul className="flex flex-wrap gap-3">
                {siblings.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      href={`/tours/${tour.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                    >
                      <Clock className="w-4 h-4 text-primary" aria-hidden="true" /> {tour.duration}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
{/* Related destinations */}
      {destinations.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
              {t('hub_dur_highlights')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className="bg-primary/15 p-2.5 rounded-full text-primary shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                      {dest.name}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{dest.shortDesc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 bg-muted/40 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <StructuredData id={`hub-${hub.id}-${durationDays}d-faq`} data={buildFaqSchema(faqs)} />
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {fmtTemplate(t('hub_dur_faq_heading'), { days: durationDays, city: cityName })}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-card border border-border rounded-2xl p-6 open:shadow-lg transition-all">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground text-lg">
                    {faq.question}
                    <span className="text-primary group-open:rotate-90 transition-transform shrink-0 ml-4">›</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="text-center mt-8 text-sm text-muted-foreground">
              {t('hub_dur_faq_more')}{' '}
              <Link href="/faq" className="text-primary underline-offset-4 hover:underline">
                {t('hub_dur_faq_link')}
              </Link>
              . {t('hub_dur_faq_questions')}{' '}
              <a
                href="https://wa.me/message/QAFZ3RKJDNH4B1"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                {t('hub_dur_wa')}
              </a>
              .
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#102a1e] text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-4">
            {fmtTemplate(t('hub_dur_cta_title'), { days: durationDays, city: cityName })}
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            {t('hub_dur_cta_sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/trip-builder"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg"
            >
              {t('nav_build_journey')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 rounded-full font-bold tracking-wide hover:bg-white/10 transition-colors"
            >
              {t('book_customize')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}