import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { verifiedGoogleReviews } from '@/data/verifiedReviews';

const GUIDES = [
  { name: 'Mohamed Boughrara', image: '/images/guide/mohamed-boughrara-founder-desert-guide-merzouga.webp', role: 'about_local', desc: 'about_local_desc' },
  { name: 'Mostapha Wargaga', image: '/images/guide/mostapha-wargaga-senior-desert-guide-sahara-sunset.webp', role: 'about_quality', desc: 'about_quality_desc' },
  { name: 'Moha Amroui', image: '/images/guide/moha-amroui-desert-guide-camels-merzouga.webp', role: 'about_sustainable', desc: 'about_sustainable_desc' },
] as const;

function MohamedReviewQuote({ t }: { t: (key: any) => string }) {
  const reviews = verifiedGoogleReviews.filter((review) => ['google-nina-branderhorst', 'google-natalia-cuadrado', 'google-kresimir-mikic'].includes(review.id));
  if (!reviews.length) return null;
  return <aside className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 md:p-8" aria-label={t('reviews_google')}><div className="mb-5 flex items-center justify-between gap-4"><h4 className="text-xl font-bold text-gray-900">{t('reviews_about_mohamed')}</h4><span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-amber-700">{t('reviews_google')}</span></div><div className="space-y-6">{reviews.map((review) => <figure key={review.id} className="border-l-2 border-amber-500 pl-4"><blockquote className="text-gray-700 leading-relaxed">“{review.text}”</blockquote><figcaption className="mt-2 text-sm font-semibold text-gray-900">{review.name} · {review.rating}/5</figcaption></figure>)}</div></aside>;
}

export default function PremiumAboutSection() {
  const { t } = useLanguage();
  const stats = [1, 2, 3, 4].map((n) => ({ value: t(`about_stat${n}_value` as any), label: t(`about_stat${n}_label` as any) }));
  const timeline = [
    { title: t('about_local'), text: t('about_local_desc') },
    { title: t('about_quality'), text: t('about_quality_desc') },
    { title: t('about_sustainable'), text: t('about_sustainable_desc') },
    { title: t('about_roots_heading'), text: t('about_roots_text') },
    { title: t('about_promise_heading'), text: t('about_promise_text') },
  ];

  return <section className="premium-about-section">
    <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-24"><img src="/images/hero/medina-pano.webp" width={794} height={712} alt={t('about_heading')} aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" decoding="async" /><div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70 z-10" /><div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto"><h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{t('about_heading')}</h1><p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">{t('about_story_sub')}</p><div className="mt-12 flex justify-center"><span className="text-sm uppercase tracking-[0.25em] text-white/80">{t('about_scroll_hint')}</span></div></div></div>

    <div className="max-w-7xl mx-auto px-4 mb-32"><div className="grid lg:grid-cols-2 gap-16 items-start"><div><span className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4 block">{t('about_story')}</span><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">{t('about_heading')}</h2><p className="text-gray-700 text-lg leading-relaxed">{t('about_story_sub')}</p><p className="text-gray-700 text-lg leading-relaxed mt-6">{t('about_local_desc')}</p></div><div className="lg:pt-8"><div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-2xl shadow-xl shadow-amber-200/20"><h3 className="text-2xl font-bold text-gray-900 mb-6">{t('about_roots_heading')}</h3><p className="text-gray-700 mb-8 leading-relaxed text-lg">{t('about_roots_text')}</p><h3 className="text-2xl font-bold text-gray-900 mb-6">{t('about_promise_heading')}</h3><p className="text-gray-700 leading-relaxed text-lg">{t('about_promise_text')}</p></div></div></div></div>

    <div className="bg-gray-50 py-24 mb-24"><div className="max-w-5xl mx-auto px-4"><h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">{t('about_philosophy')}</h2><div className="space-y-8">{timeline.map((item, i) => <article key={i} className="flex gap-8 items-start"><div className="flex-shrink-0 w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">{i + 1}</div><div><h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3><p className="text-gray-700 text-lg leading-relaxed">{item.text}</p></div></article>)}</div></div></div>

    <div className="max-w-7xl mx-auto px-4 mb-32"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{stats.map((stat, i) => <div key={i} className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm"><p className="text-5xl font-bold text-gray-900 mb-4">{stat.value}</p><p className="text-lg text-gray-600">{stat.label}</p></div>)}</div></div>

    <div className="max-w-7xl mx-auto px-4 mb-32"><h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20">{t('about_meet_team')}</h2><div className="space-y-24">{GUIDES.map((guide, index) => <div key={guide.name} className="grid lg:grid-cols-2 gap-12 items-center"><div className={`aspect-[4/5] rounded-2xl overflow-hidden ${index % 2 ? 'lg:order-2' : ''}`}><img src={guide.image} alt={guide.name} loading="lazy" decoding="async" className="w-full h-full object-cover" /></div><div className={index % 2 ? 'lg:order-1' : ''}><h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{guide.name}</h3><p className="text-amber-600 font-semibold text-lg mb-6">{t(guide.role as any)}</p><p className="text-gray-700 text-lg leading-relaxed">{t(guide.desc as any)}</p>{index === 0 ? <MohamedReviewQuote t={t} /> : null}</div></div>)}</div></div>

    <div className="bg-gray-900 text-white py-24 mb-24"><div className="max-w-7xl mx-auto px-4"><h2 className="text-4xl md:text-5xl font-bold text-center mb-16">{t('about_philosophy')}</h2><div className="grid md:grid-cols-3 gap-8"><div className="text-center"><h3 className="text-xl font-bold mb-3">{t('about_local')}</h3><p className="text-gray-300 leading-relaxed">{t('about_local_desc')}</p></div><div className="text-center"><h3 className="text-xl font-bold mb-3">{t('about_quality')}</h3><p className="text-gray-300 leading-relaxed">{t('about_quality_desc')}</p></div><div className="text-center"><h3 className="text-xl font-bold mb-3">{t('about_sustainable')}</h3><p className="text-gray-300 leading-relaxed">{t('about_sustainable_desc')}</p></div></div></div></div>

    <div className="max-w-4xl mx-auto px-4 text-center mb-24"><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('about_heading')}</h2><p className="text-xl text-gray-600 mb-10 leading-relaxed">{t('about_cta_sub')}</p><Link to="/tours" className="inline-block bg-amber-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl">{t('book_now')}</Link></div>
  </section>;
}
