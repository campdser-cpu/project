import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { TravelerDecisionGuide } from '../components/TravelerDecisionGuide';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DayTrips() {
  const { t } = useLanguage();
  const features = [
    { title: t('dt_f1_title'), description: t('dt_f1_desc'), image: "/images/dest/ourika-valley.webp" },
    { title: t('dt_f2_title'), description: t('dt_f2_desc') },
    { title: t('dt_f3_title'), description: t('dt_f3_desc') },
    { title: t('dt_f4_title'), description: t('dt_f4_desc') },
    { title: t('dt_f5_title'), description: t('dt_f5_desc') },
    { title: t('dt_f6_title'), description: t('dt_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="day-trips"
      heroImage="/images/dest/ouzoud.webp"
      heroAlt={t('dt_hero_alt')}
      breadcrumbName={t('dt_breadcrumb')}
      title={t('dt_title')}
      subtitle={t('dt_subtitle')}
      ctaText={t('dt_cta')}
      ctaLink="/build-your-day-trip"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('dt_faq1_q'), answer: t('dt_faq1_a') },
        { question: t('dt_faq2_q'), answer: t('dt_faq2_a') },
        { question: t('dt_faq3_q'), answer: t('dt_faq3_a') },
        { question: t('dt_faq4_q'), answer: t('dt_faq4_a') },
      ]}
    >
      <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-border/70 bg-card/60 p-6 md:p-10" aria-labelledby="day-trip-planning">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Plan the day, not just the destination</p>
          <h2 id="day-trip-planning" className="mt-3 font-serif text-3xl md:text-4xl text-foreground">
            What should a good Morocco day trip feel like?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            If this is your first time in Morocco, it is normal not to know which excursion makes sense from your city. A useful day trip is more than a place on a map: the route, time on the road, pace and return plan all matter.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold text-foreground">Start with your day</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Tell us where you are staying, when you want to go and how many people are travelling.</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold text-foreground">Choose the experience</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Prefer mountains, culture, food, photography, nature or a slower day? We use that to shape the request.</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold text-foreground">Confirm before you go</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">We confirm the practical route, timing and price with you rather than displaying made-up availability or automatic estimates.</p>
            </div>
          </div>
          <p className="mt-7 text-sm leading-6 text-muted-foreground">
            A day trip is designed to return you to your departure area the same day. If what you really want is the Sahara, several cities or a slower route with overnight stays, use our multi-day <strong className="text-foreground">Design Your Tour</strong> journey instead.
          </p>
        </div>
      </section>
      <TravelerDecisionGuide />
    </ExperiencePage>
  );
}
