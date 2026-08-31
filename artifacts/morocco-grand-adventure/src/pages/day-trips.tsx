import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
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
    />
  );
}
