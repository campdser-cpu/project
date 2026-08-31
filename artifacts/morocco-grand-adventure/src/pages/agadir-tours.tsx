import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { MapPin } from 'lucide-react';
import { getLocalizedDestinations } from '@/i18n/content';

export default function AgadirTours() {
  const { t, lang } = useLanguage();
  const features = [
    { title: t('ag_f1_title'), description: t('ag_f1_desc'), image: "/images/dest/agadir.webp" },
    { title: t('ag_f2_title'), description: t('ag_f2_desc'), image: "/images/dest/taghazout.webp" },
    { title: t('ag_f3_title'), description: t('ag_f3_desc'), image: "/images/dest/essaouira.webp" },
    { title: t('ag_f4_title'), description: t('ag_f4_desc'), image: "/images/dest/agadir.webp" },
    { title: t('ag_f5_title'), description: t('ag_f5_desc'), image: "/images/dest/merzouga.webp" },
    { title: t('ag_f6_title'), description: t('ag_f6_desc'), image: "/images/dest/marrakech.webp" },
  ];

  const relatedStops = ['agadir', 'taghazout', 'essaouira', 'marrakech', 'ait-ben-haddou', 'merzouga'];
  const region = getLocalizedDestinations(lang).filter((d) => relatedStops.includes(d.id));

  return (
    <ExperiencePage
      id="agadir-tours"
      heroImage="/images/dest/agadir.webp"
      heroAlt={t('ag_hero_alt')}
      breadcrumbName={t('ag_breadcrumb')}
      title={t('ag_title')}
      subtitle={t('ag_subtitle')}
      ctaText={t('ag_cta')}
      ctaLink="/trip-builder"
      trustBadges={defaultTrustBadges()}
      highlights={features}
      faqs={[
        { question: t('ag_faq1_q'), answer: t('ag_faq1_a') },
        { question: t('ag_faq2_q'), answer: t('ag_faq2_a') },
        { question: t('ag_faq3_q'), answer: t('ag_faq3_a') },
        { question: t('ag_faq4_q'), answer: t('ag_faq4_a') },
      ]}
    >
      {/* Explore the region — contextual internal links to real destinations */}
      {region.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {t('hub_explore_region').replace('{city}', t('hub_agadir_name'))}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t('hub_explore_region_sub').replace('{city}', t('hub_agadir_name'))}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {region.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className="bg-primary/15 p-2.5 rounded-full text-primary shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                      {dest.name}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{dest.shortDesc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </ExperiencePage>
  );
}