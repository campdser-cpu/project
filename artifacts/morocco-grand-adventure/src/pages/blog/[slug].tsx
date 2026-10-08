import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { Layout } from '../../components/layout/Layout';
import { useMemo } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/breadcrumb';
import {
  getLocalizedBlogPost,
  getLocalizedBlogSections,
  getLocalizedBlogCta,
  getLocalizedTours,
  getLocalizedDestinations,
  blogPosts,
} from '@/i18n/content';
import { destinationImageAlt } from '@/data/content';
import { StructuredData, buildBlogPostSchema } from '@/components/seo/StructuredData';
import { BLOG_META } from '@/components/seo/route-metadata';
import NotFound from '../not-found';
import { motion } from 'framer-motion';

/**
 * Related-content map: for each blog slug, the real tours and destinations
 * that genuinely relate to the article. IDs are real entities from the
 * site's own data (src/data/content.ts) — nothing invented.
 */
const ARTICLE_RELATIONS: Record<
  string,
  { tours: string[]; destinations: string[] }
> = {
  'merzouga-luxury-desert-camp-guide': {
    tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
  },
  'best-time-to-visit-morocco-sahara': {
    tours: ['3-day-sahara-marrakech', '5-day-imperial-cities'],
    destinations: ['merzouga', 'erg-chebbi'],
  },
  'camel-trekking-etiquette-morocco': {
    tours: ['3-day-sahara-marrakech'],
    destinations: ['merzouga', 'erg-chebbi'],
  },
  'marrakech-to-merzouga-roadtrip': {
    tours: ['3-day-sahara-marrakech', '8-day-marrakech-essaouira-agadir-sahara'],
    destinations: ['marrakech', 'ait-ben-haddou', 'dades-valley', 'merzouga'],
  },
  'morocco-packing-list-desert': {
    tours: ['3-day-sahara-marrakech', '7-day-imperial-cities-sahara-escape'],
    destinations: ['merzouga', 'erg-chebbi'],
  },
  'fes-chefchaouen-blue-city-guide': {
    tours: ['5-day-imperial-cities'],
    destinations: ['fes', 'chefchaouen'],
  },
  'marrakech-to-merzouga-3-day-sahara-tour': {
    tours: ['3-day-sahara-marrakech', '4-day-marrakech-merzouga-sahara'],
    destinations: ['ait-ben-haddou', 'dades-valley', 'todra-gorge', 'merzouga'],
  },
  'fes-to-merzouga-sahara-desert-tour': {
    tours: ['3-day-fes-merzouga-sahara', '4-day-fes-marrakech-via-merzouga'],
    destinations: ['fes', 'ifrane', 'merzouga'],
  },
  'marrakech-ouarzazate-merzouga-great-south-morocco': {
    tours: ['5-day-great-south-morocco', '3-day-sahara-marrakech'],
    destinations: ['ait-ben-haddou', 'draa-valley', 'nkob', 'merzouga'],
  },
};

export default function BlogPost() {
  const { t, lang } = useLanguage();
  const [match, params] = useRoute('/blog/:slug');

  const post = useMemo(() => {
    if (!match || !params?.slug) return undefined;
    return getLocalizedBlogPost(params.slug, lang) ?? blogPosts.find((p) => p.slug === params.slug);
  }, [lang, params?.slug, match]);

  if (!post) return <NotFound />;

  const relations = ARTICLE_RELATIONS[post.slug] ?? { tours: [], destinations: [] };
  const sections = getLocalizedBlogSections(post.slug, lang);
  const cta = getLocalizedBlogCta(post.slug, lang);
  const relatedTours = relations.tours
    .map((id) => getLocalizedTours(lang).find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relatedDests = relations.destinations
    .map((id) => getLocalizedDestinations(lang).find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const postIndex = blogPosts.findIndex((p) => p.slug === post.slug) + 1;
  const localizedPosts = blogPosts.map((p) => getLocalizedBlogPost(p.slug, lang) ?? p);
  const sameCategory = localizedPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(localizedPosts.filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, 5);

  return (
    <Layout>
      {/* Schema.org structured data: BlogPosting + BreadcrumbList */}
      <StructuredData
        id="blog-post"
        data={buildBlogPostSchema(
          {
            slug: post.slug,
            title: BLOG_META[post.slug]?.title ?? post.title,
            description: BLOG_META[post.slug]?.description ?? post.excerpt,
            date: post.date,
            image: post.image,
          },
          lang,
        )}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <nav aria-label="breadcrumb" className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">{t('nav_home')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/blog">{t('nav_blog')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card rounded-3xl overflow-hidden border border-border p-8 md:p-12 max-w-prose mx-auto"
            >
              <div className="mb-6">
                <span className="text-primary font-bold uppercase tracking-wider text-xs mb-2 block">
                  {t(`blog_post_${postIndex}_cat`)}
                </span>
                <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span>{t(`blog_post_${postIndex}_date`)}</span>
                  <span>{t(`blog_post_${postIndex}_read`)}</span>
                </div>
              </div>

              <img
                src={post.image}
                alt={post.alt || post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 md:h-64 object-cover mb-8 rounded-md"
              />

              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
                {sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="font-serif text-2xl text-foreground mt-10 mb-4">{section.heading}</h2>
                    {section.image && (
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 md:h-64 object-cover mb-4 rounded-md"
                      />
                    )}
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="leading-relaxed text-muted-foreground mb-4">{p}</p>
                    ))}
                  </div>
                ))}
                {cta && (
                  <>
                    <p className="leading-relaxed text-muted-foreground mt-10 mb-4 font-medium">{cta.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {cta.links.map((l) => (
                        <Link
                          key={l.to}
                          href={l.to}
                          className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
                {relatedTours.length > 0 && (
                <div className="mt-12 pt-12 border-t border-border">
                  <h2 className="font-serif text-2xl text-foreground mb-2">{t('related_tours')}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{t('related_tours_hint')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedTours.map((tour) => (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.id}`}
                        className="group block bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all"
                      >
                        <div className="h-40 overflow-hidden">
                          <img
                            src={tour.image}
                            alt={tour.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-serif text-lg text-foreground mb-1">{tour.name}</h3>
                          <p className="text-xs text-muted-foreground">{tour.duration}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedDests.length > 0 && (
                <div className="mt-12 pt-12 border-t border-border">
                  <h2 className="font-serif text-2xl text-foreground mb-2">{t('related_destinations')}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{t('related_destinations_hint')}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedDests.map((dest) => (
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.id}`}
                        className="group block hover:text-primary transition-colors"
                      >
                        <div className="h-28 overflow-hidden rounded-md mb-3">
                          <img
                            src={dest.image}
                            alt={destinationImageAlt(dest, dest.name, t('dest_alt_unverified'))}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <h3 className="font-serif text-base text-foreground mb-1">{dest.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{dest.shortDesc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-12 border-t border-border">
                <h2 className="font-serif text-2xl text-foreground mb-6">{t('related_articles')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sameCategory.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block hover:text-primary transition-colors"
                    >
                      <div className="h-36 overflow-hidden rounded-md mb-3">
                        <img
                          src={related.image}
                          alt={related.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <span className="text-primary font-bold uppercase tracking-wider text-xs mb-1 block">
                          {t(`blog_post_${blogPosts.findIndex((p) => p.slug === related.slug) + 1}_cat`)}
                        </span>
                        <h3 className="font-serif text-lg text-foreground mb-1">{related.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}