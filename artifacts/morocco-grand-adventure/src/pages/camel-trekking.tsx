import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CamelTrekking() {
  const { t } = useLanguage();
  const features = [
    { title: t('ct_f1_title'), description: t('ct_f1_desc'), image: "/images/personal/dunes-camels-poster.jpg" },
    { title: t('ct_f2_title'), description: t('ct_f2_desc') },
    { title: t('ct_f3_title'), description: t('ct_f3_desc') },
    { title: t('ct_f4_title'), description: t('ct_f4_desc') },
    { title: t('ct_f5_title'), description: t('ct_f5_desc') },
    { title: t('ct_f6_title'), description: t('ct_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="camel-trekking"
      heroImage="/images/personal/dunes-camels-poster.jpg"
      heroAlt={t('ct_hero_alt')}
      breadcrumbName={t('ct_breadcrumb')}
      title={t('ct_title')}
      subtitle={t('ct_subtitle')}
      ctaText={t('ct_cta')}
      ctaLink="/tours"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('ct_faq1_q'), answer: t('ct_faq1_a') },
        { question: t('ct_faq2_q'), answer: t('ct_faq2_a') },
        { question: t('ct_faq3_q'), answer: t('ct_faq3_a') },
        { question: t('ct_faq4_q'), answer: t('ct_faq4_a') },
        { question: t('ct_faq5_q'), answer: t('ct_faq5_a') },
      ]}
    />
  );
}
