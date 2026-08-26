import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MarrakechTours() {
  const { t } = useLanguage();
  const features = [
    { title: t('mk_f1_title'), description: t('mk_f1_desc'), image: "/images/dest/marrakech.jpg" },
    { title: t('mk_f2_title'), description: t('mk_f2_desc') },
    { title: t('mk_f3_title'), description: t('mk_f3_desc') },
    { title: t('mk_f4_title'), description: t('mk_f4_desc') },
    { title: t('mk_f5_title'), description: t('mk_f5_desc') },
    { title: t('mk_f6_title'), description: t('mk_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="marrakech-tours"
      heroImage="/images/dest/marrakech.jpg"
      heroAlt={t('mk_hero_alt')}
      breadcrumbName={t('mk_breadcrumb')}
      title={t('mk_title')}
      subtitle={t('mk_subtitle')}
      ctaText={t('mk_cta')}
      ctaLink="/tours"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('mk_faq1_q'), answer: t('mk_faq1_a') },
        { question: t('mk_faq2_q'), answer: t('mk_faq2_a') },
        { question: t('mk_faq3_q'), answer: t('mk_faq3_a') },
        { question: t('mk_faq4_q'), answer: t('mk_faq4_a') },
      ]}
    />
  );
}
