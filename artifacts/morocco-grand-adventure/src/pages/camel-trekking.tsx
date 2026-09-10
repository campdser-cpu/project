import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';
import LibraryPhotoGrid from '@/components/LibraryPhotoGrid';
import { publishablePhotosForContexts } from '@/data/photoLibrary';

export default function CamelTrekking() {
  const { t } = useLanguage();
  const features = [
    { title: t('ct_f1_title'), description: t('ct_f1_desc'), image: "/images/personal/dunes-camels-poster.webp" },
    { title: t('ct_f2_title'), description: t('ct_f2_desc') },
    { title: t('ct_f3_title'), description: t('ct_f3_desc') },
    { title: t('ct_f4_title'), description: t('ct_f4_desc') },
    { title: t('ct_f5_title'), description: t('ct_f5_desc') },
    { title: t('ct_f6_title'), description: t('ct_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="camel-trekking"
      heroImage="/images/personal/dunes-camels-poster.webp"
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
    >
      {/* Official photo library — actual PDF photographs (camel-trekking context) */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">{t('lib_h2')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">{t('lib_sub')}</p>
          </div>
          <LibraryPhotoGrid photos={publishablePhotosForContexts(['camel-trekking', 'sahara-landscape'])} aspect="h-60 md:h-72" />
          <p className="text-center text-xs text-muted-foreground mt-6">{t('lib_cap')}</p>
        </div>
      </section>
    </ExperiencePage>
  );
}
