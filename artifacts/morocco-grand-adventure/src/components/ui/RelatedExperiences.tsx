import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * RelatedExperiences — a compact internal-linking strip used across the
 * experience / destination pages. Links only to routes that already exist in
 * the app, using the site's own localized navigation labels. Introduces real
 * topical connections (desert hub, activities, tours, contact) without
 * creating keyword-stuffed paragraphs.
 */
export function RelatedExperiences() {
  const { t } = useLanguage();
  const links = [
    { href: '/merzouga-guide', label: t('footer_merzouga_guide') },
    { href: '/camel-trekking', label: t('nav_camel_trekking') },
    { href: '/luxury-camp', label: t('nav_luxury_desert_camp') },
    { href: '/4x4-tours', label: t('nav_4x4_desert_tours') },
    { href: '/desert-tours', label: t('nav_sahara_desert_tours') },
    { href: '/day-trips', label: t('nav_day_trips') },
    { href: '/tours', label: t('nav_tours') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <section className="py-14 md:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">{t('rel_title')}</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t('rel_sub')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-card border border-border hover:border-primary/60 hover:text-primary transition-colors px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
