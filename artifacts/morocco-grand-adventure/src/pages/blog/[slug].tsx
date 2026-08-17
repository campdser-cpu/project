import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { Layout } from '../../components/layout/Layout';
import { getLocalizedBlogPost, blogPosts } from '@/i18n/content';
import { StructuredData, buildBlogPostSchema } from '@/components/seo/StructuredData';
import { BLOG_META } from '@/components/seo/route-metadata';
import NotFound from '../not-found';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function BlogPost() {
  const { t, lang } = useLanguage();
  const [match, params] = useRoute('/blog/:slug');

  if (!match || !params?.slug) return <NotFound />;

  const post = useMemo(() => {
    // Try to get localized version first, fall back to English
    const localized = getLocalizedBlogPost(params.slug, lang);
    return localized ?? blogPosts.find((p) => p.slug === params.slug);
  }, [lang, params.slug]);

  if (!post) return <NotFound />;

  return (
    <Layout>
      {/* Schema.org structured data: BlogPosting */}
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
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card rounded-3xl overflow-hidden border border-border p-8 md:p-12 max-w-prose mx-auto"
            >
              <div className="mb-6">
                <span className="text-primary font-bold uppercase tracking-wider text-xs mb-2 block">
                  {t('blog_category')}
                </span>
                <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span>
                    <i className="calendar-icon" aria-hidden="true" /> {post.date}
                  </span>
                  <span>
                    <i className="clock-icon" aria-hidden="true" /> {t('read_time')}
                  </span>
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

                <div className="mt-12 pt-12 border-t border-border">
                  <h2 className="font-serif text-2xl text-foreground mb-6">{t('related_articles')}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {blogPosts
                      .filter((p) => p.slug !== post.slug)
                      .slice(0, 5)
                      .map((related) => (
                        <Link
                          key={related.slug}
                          href={`/blog/${related.slug}`}
                          className="group block hover:text-primary transition-colors"
                        >
                          <div className="h-40 overflow-hidden rounded-md mb-3">
                            <img
                              src={related.image}
                              alt={related.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-serif text-lg text-foreground mb-1">{related.title}</h3>
                            <p className="text-xs text-muted-foreground">{related.excerpt}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}