import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ExperiencePage, defaultTrustBadges } from '../components/ExperiencePage';

const posts = [
  {
    slug: "merzouga-luxury-desert-camp-guide",
    title: "The Ultimate Guide to Luxury Desert Camps in Merzouga",
    excerpt: "From private tents with en-suite bathrooms to gourmet dinners under the Milky Way — discover everything you need to know about luxury glamping in the Sahara.",
    image: "/images/personal/luxury-camp-dusk.jpg",
    date: "August 2026",
    readTime: "8 min read",
    category: "Sahara Desert",
  },
  {
    slug: "best-time-to-visit-morocco-sahara",
    title: "Best Time to Visit the Sahara Desert: A Complete Month-by-Month Guide",
    excerpt: "When should you plan your Merzouga desert trip? Our local experts break down temperatures, crowds, and conditions month by month.",
    image: "/images/dest/merzouga.jpg",
    date: "July 2026",
    readTime: "6 min read",
    category: "Travel Planning",
  },
  {
    slug: "camel-trekking-etiquette-morocco",
    title: "Camel Trekking in Morocco: What to Expect and How to Prepare",
    excerpt: "Everything first-time riders need to know — what to wear, how to mount, what to bring, and the traditions behind this age-old Saharan journey.",
    image: "/images/personal/dunes-camels-poster.jpg",
    date: "June 2026",
    readTime: "7 min read",
    category: "Camel Trekking",
  },
  {
    slug: "marrakech-to-merzouga-roadtrip",
    title: "Marrakech to Merzouga: The Ultimate Sahara Road Trip Itinerary",
    excerpt: "Cross the High Atlas, explore Aït Ben Haddou, wind through the Dades Valley, and arrive at the golden dunes of Erg Chebbi — the complete route guide.",
    image: "/images/dest/ait-ben-haddou.jpg",
    date: "May 2026",
    readTime: "10 min read",
    category: "Road Trips",
  },
  {
    slug: "morocco-packing-list-desert",
    title: "The Perfect Morocco Packing List for Desert Tours (2026)",
    excerpt: "What to pack for the Sahara — from breathable layers and sun protection to the little luxuries that make a desert night unforgettable.",
    image: "/images/hero/desert-pano.jpg",
    date: "April 2026",
    readTime: "5 min read",
    category: "Packing",
  },
  {
    slug: "fes-chefchaouen-blue-city-guide",
    title: "Fes to Chefchaouen: Exploring Morocco's Blue Pearl",
    excerpt: "The journey from Morocco's cultural heart to the Instagram-famous blue medina — what to see, where to stay, and how to make the most of it.",
    image: "/images/dest/chefchaouen.jpg",
    date: "March 2026",
    readTime: "9 min read",
    category: "Imperial Cities",
  },
];

export default function Blog() {
  return (
    <ExperiencePage
      id="blog"
      heroImage="/images/hero/desert-pano.jpg"
      heroAlt="Morocco travel blog - golden Sahara desert dunes at sunset"
      breadcrumbName="Travel Blog"
      title="Morocco Travel Blog"
      subtitle="Expert guides, insider tips, and inspiration from our local Sahara team — discover the very best of Morocco."
      trustBadges={defaultTrustBadges}
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
                    Read Article <ArrowRight className="w-4 h-4" />
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