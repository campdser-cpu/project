import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Faq() {
  const { t } = useLanguage();
  const faqs = [
    { question: t('faq_q1'), answer: t('faq_a1') },
    { question: t('faq_q2'), answer: t('faq_a2') },
    { question: t('faq_q3'), answer: t('faq_a3') },
    { question: t('faq_q4'), answer: t('faq_a4') },
    { question: t('faq_q5'), answer: t('faq_a5') },
    { question: t('faq_q6'), answer: t('faq_a6') },
    { question: t('faq_q7'), answer: t('faq_a7') },
    { question: t('faq_q8'), answer: t('faq_a8') },
    { question: t('faq_q9'), answer: t('faq_a9') },
    { question: t('faq_q10'), answer: t('faq_a10') },
  ];

  return (
    <ExperiencePage
      id="faq"
      heroImage="/images/dest/marrakech.jpg"
      heroAlt={t('faq_hero_alt')}
      breadcrumbName={t('faq_breadcrumb')}
      title={t('faq_title')}
      subtitle={t('faq_subtitle')}
      ctaText={t('faq_cta')}
      ctaLink="/contact"
      trustBadges={defaultTrustBadges()}
      faqs={faqs}
    />
  );
}
