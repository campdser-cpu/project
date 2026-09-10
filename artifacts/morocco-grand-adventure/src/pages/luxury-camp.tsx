import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';
import LibraryPhotoGrid from '@/components/LibraryPhotoGrid';
import { publishablePhotosForContexts } from '@/data/photoLibrary';

export default function LuxuryCamp() {
  const { t } = useLanguage();
  const features = [
    { title: t('lc_f1_title'), description: t('lc_f1_desc'), image: "/images/personal/luxury-camp-dusk.webp" },
    { title: t('lc_f2_title'), description: t('lc_f2_desc') },
    { title: t('lc_f3_title'), description: t('lc_f3_desc') },
    { title: t('lc_f4_title'), description: t('lc_f4_desc') },
    { title: t('lc_f5_title'), description: t('lc_f5_desc') },
    { title: t('lc_f6_title'), description: t('lc_f6_desc') },
  ];

  return (
    <ExperiencePage
      id="luxury-camp"
      heroImage="/images/personal/luxury-camp-dusk.webp"
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
    >
      {/* Official photo library — actual PDF photographs (luxury-camp context) */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">{t('lib_h2')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">{t('lib_sub')}</p>
          </div>
          <LibraryPhotoGrid photos={publishablePhotosForContexts(['luxury-camp'])} aspect="h-60 md:h-72" />
          <p className="text-center text-xs text-muted-foreground mt-6">{t('lib_cap')}</p>
        </div>
      </section>
    </ExperiencePage>
  );
}
