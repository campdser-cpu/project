import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LuxuryCamp() {
  const { t } = useLanguage();
  const features = [
    { title: t('lc_f1_title'), description: t('lc_f1_desc'), image: "/images/personal/luxury-camp-dusk.jpg" },
    { title: t('lc_f2_title'), description: t('lc_f2_desc') },
    { title: t('lc_f3_title'), description: t('lc_f3_desc') },
    { title: t('lc_f4_title'), description: t('lc_f4_desc') },
    { title: t('lc_f5_title'), description: t('lc_f5_desc') },
    { title: t('lc_f6_title'), description: t('lc_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="luxury-camp"
      heroImage="/images/personal/luxury-camp-dusk.jpg"
      heroAlt={t('lc_hero_alt')}
      breadcrumbName={t('lc_breadcrumb')}
      title={t('lc_title')}
      subtitle={t('lc_subtitle')}
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('lc_faq1_q'), answer: t('lc_faq1_a') },
        { question: t('lc_faq2_q'), answer: t('lc_faq2_a') },
        { question: t('lc_faq3_q'), answer: t('lc_faq3_a') },
        { question: t('lc_faq4_q'), answer: t('lc_faq4_a') },
      ]}
    />
  );
}
