import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();
  const posts = [
    { slug: "merzouga-luxury-desert-camp-guide", title: t('blog_post_1_title'), excerpt: t('blog_post_1_excerpt'), image: "/images/personal/luxury-camp-dusk.jpg", date: t('blog_post_1_date'), readTime: t('blog_post_1_read'), category: t('blog_post_1_cat') },
    { slug: "best-time-to-visit-morocco-sahara", title: t('blog_post_2_title'), excerpt: t('blog_post_2_excerpt'), image: "/images/dest/merzouga.jpg", date: t('blog_post_2_date'), readTime: t('blog_post_2_read'), category: t('blog_post_2_cat') },
    { slug: "camel-trekking-etiquette-morocco", title: t('blog_post_3_title'), excerpt: t('blog_post_3_excerpt'), image: "/images/personal/dunes-camels-poster.jpg", date: t('blog_post_3_date'), readTime: t('blog_post_3_read'), category: t('blog_post_3_cat') },
    { slug: "marrakech-to-merzouga-roadtrip", title: t('blog_post_4_title'), excerpt: t('blog_post_4_excerpt'), image: "/images/dest/ait-ben-haddou.jpg", date: t('blog_post_4_date'), readTime: t('blog_post_4_read'), category: t('blog_post_4_cat') },
    { slug: "morocco-packing-list-desert", title: t('blog_post_5_title'), excerpt: t('blog_post_5_excerpt'), image: "/images/hero/desert-pano.jpg", date: t('blog_post_5_date'), readTime: t('blog_post_5_read'), category: t('blog_post_5_cat') },
    { slug: "fes-chefchaouen-blue-city-guide", title: t('blog_post_6_title'), excerpt: t('blog_post_6_excerpt'), image: "/images/dest/chefchaouen.jpg", date: t('blog_post_6_date'), readTime: t('blog_post_6_read'), category: t('blog_post_6_cat') },
  ];

  return (
    <ExperiencePage
      id="blog"
      heroImage="/images/hero/desert-pano.jpg"
      heroAlt={t('blog_hero_alt')}
      breadcrumbName={t('blog_breadcrumb')}
      title={t('blog_title')}
      subtitle={t('blog_subtitle')}
      trustBadges={defaultTrustBadges()}
    >
      {/* Blog grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-3">
                    <span className="text-primary font-bold uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                    {t('blog_read_article')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </ExperiencePage>
  );
}