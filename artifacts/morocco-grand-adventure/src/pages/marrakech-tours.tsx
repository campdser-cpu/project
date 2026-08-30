import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FesTours() {
  const { t } = useLanguage();
  const features = [
    { title: t('mt_f1_title'), description: t('mt_f1_desc'), image: "/images/dest/fes.webp" },
    { title: t('mt_f2_title'), description: t('mt_f2_desc') },
    { title: t('mt_f3_title'), description: t('mt_f3_desc') },
    { title: t('mt_f4_title'), description: t('mt_f4_desc') },
    { title: t('mt_f5_title'), description: t('mt_f5_desc') },
    { title: t('mt_f6_title'), description: t('mt_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="fes-tours"
      heroImage="/images/dest/fes.webp"
      heroAlt={t('mt_hero_alt')}
      breadcrumbName={t('mt_breadcrumb')}
      title={t('mt_title')}
      subtitle={t('mt_subtitle')}
      ctaText={t('mt_cta')}
      ctaLink="/tours"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('mt_faq1_q'), answer: t('mt_faq1_a') },
        { question: t('mt_faq2_q'), answer: t('mt_faq2_a') },
        { question: t('mt_faq3_q'), answer: t('mt_faq3_a') },
        { question: t('mt_faq4_q'), answer: t('mt_faq4_a') },
      ]}
    />
  );
}
