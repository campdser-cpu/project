import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { RelatedExperiences } from '../components/ui/RelatedExperiences';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MerzougaGuide() {
  const { t } = useLanguage();
  const features = [
    { title: t('mg_f1_title'), description: t('mg_f1_desc'), image: "/images/dest/erg-chebbi.jpg" },
    { title: t('mg_f2_title'), description: t('mg_f2_desc') },
    { title: t('mg_f3_title'), description: t('mg_f3_desc') },
    { title: t('mg_f4_title'), description: t('mg_f4_desc') },
    { title: t('mg_f5_title'), description: t('mg_f5_desc') },
    { title: t('mg_f6_title'), description: t('mg_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="merzouga-guide"
      heroImage="/images/dest/merzouga.jpg"
      heroAlt={t('mg_hero_alt')}
      breadcrumbName={t('mg_breadcrumb')}
      title={t('mg_title')}
      subtitle={t('mg_subtitle')}
      ctaText={t('mg_cta')}
      ctaLink="/trip-builder"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('mg_faq1_q'), answer: t('mg_faq1_a') },
        { question: t('mg_faq2_q'), answer: t('mg_faq2_a') },
        { question: t('mg_faq3_q'), answer: t('mg_faq3_a') },
                { question: t('mg_faq4_q'), answer: t('mg_faq4_a') },
        { question: t('mg_faq5_q'), answer: t('mg_faq5_a') },
        { question: t('mg_faq6_q'), answer: t('mg_faq6_a') },
        { question: t('mg_faq7_q'), answer: t('mg_faq7_a') },
      ]}
    >
      <RelatedExperiences />
    </ExperiencePage>
  );
}
