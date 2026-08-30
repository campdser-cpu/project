import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedFaq } from '@/i18n/content';
import { StructuredData, buildFaqSchema } from '../components/seo/StructuredData';

export default function Faq() {
  const { t, lang } = useLanguage();
  const allFaqs = getLocalizedFaq(lang);

  return (
    <ExperiencePage
      id="faq"
      heroImage="/images/dest/marrakech.webp"
      heroAlt={t('faq_hero_alt')}
      breadcrumbName={t('faq_breadcrumb')}
      title={t('faq_title')}
      subtitle={t('faq_subtitle')}
      ctaText={t('faq_cta')}
      ctaLink="/contact"
      trustBadges={defaultTrustBadges()}
      faqs={allFaqs}
    >
      {/* FAQPage structured data */}
      <StructuredData
        id="faq"
        data={buildFaqSchema(allFaqs)}
      />
    </ExperiencePage>
  );
}
