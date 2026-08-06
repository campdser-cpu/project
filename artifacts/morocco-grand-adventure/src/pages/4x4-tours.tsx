import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FourByFourTours() {
  const { t } = useLanguage();
  const features = [
    { title: t('f4_f1_title'), description: t('f4_f1_desc'), image: "/images/dest/erg-chebbi.jpg" },
    { title: t('f4_f2_title'), description: t('f4_f2_desc') },
    { title: t('f4_f3_title'), description: t('f4_f3_desc') },
    { title: t('f4_f4_title'), description: t('f4_f4_desc') },
    { title: t('f4_f5_title'), description: t('f4_f5_desc') },
    { title: t('f4_f6_title'), description: t('f4_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="4x4-tours"
      heroImage="/images/dest/erg-chebbi.jpg"
      heroAlt={t('f4_hero_alt')}
      breadcrumbName={t('f4_breadcrumb')}
      title={t('f4_title')}
      subtitle={t('f4_subtitle')}
      ctaText={t('f4_cta')}
      ctaLink="/trip-builder"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('f4_faq1_q'), answer: t('f4_faq1_a') },
        { question: t('f4_faq2_q'), answer: t('f4_faq2_a') },
        { question: t('f4_faq3_q'), answer: t('f4_faq3_a') },
        { question: t('f4_faq4_q'), answer: t('f4_faq4_a') },
        { question: t('f4_faq5_q'), answer: t('f4_faq5_a') },
      ]}
    />
  );
}
