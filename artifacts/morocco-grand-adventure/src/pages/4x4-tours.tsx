import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';
import { CinematicVideo } from '../components/ui/CinematicVideo';

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
    >
      {/* Sahara Dunes Quad Biking — Cinematic Video */}
      <section className="py-16 md:py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">Desert Thrills</span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Quad Biking Across the Dunes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Words can't fully capture it — golden dunes, desert thrills, and centuries-old Berber traditions, all in one place: Morocco.
            </p>
          </div>
          <CinematicVideo
            src="/videos/sahara-desert-dunes-quad-biking-morocco.mp4"
            poster="/images/dest/erg-chebbi.jpg"
            alt="Quad biking and 4x4 adventures across Erg Chebbi desert dunes in Morocco"
            title="Quad Adventure"
            subtitle="Golden dunes, desert thrills, and centuries-old Berber traditions — all in one place."
          />
        </div>
      </section>
    </ExperiencePage>
  );
}