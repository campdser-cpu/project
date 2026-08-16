import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n';
import aboutPageContent from '@/data/about-page-content.json';

const placeholderPattern = /\[[^\]]+\]/g;

function sanitizeText(text: string) {
  return text
    .replace(placeholderPattern, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    .trim();
}

function renderParagraphs(text: string) {
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className="text-gray-700 text-lg leading-relaxed">
      {sanitizeText(paragraph)}
    </p>
  ));
}

export default function PremiumAboutSection() {
  const { lang } = useLanguage();
  const content = aboutPageContent.about;

  const timelineItems = content.timeline.items
    .map((item) => ({
      year: sanitizeText(item.year),
      text: sanitizeText(item.text),
    }))
    .filter((item) => item.text.length > 0);

  const team = content.team as {
    sectionTitle: string;
    mohamed: { name: string; role: string; teaser: string; story: string };
    mostapha: { name: string; role: string; teaser: string; story: string };
    moha: { name: string; role: string; teaser: string; story: string };
  };

  const guideOrder = ['mohamed', 'mostapha', 'moha'] as const;
  const guideImages: Record<string, string> = {
    mohamed: '/images/guide/mohamed-boughrara.jpg',
    mostapha: '/images/guide/mostapha-wargaga-senior-desert-guide-sahara-sunset.webp',
    moha: '/images/guide/moha-amroui-desert-guide-camels-merzouga.jpg',
  };

  const stats = [
    { value: t(lang, 'about_stat1_value'), label: t(lang, 'about_stat1_label') },
    { value: t(lang, 'about_stat2_value'), label: t(lang, 'about_stat2_label') },
    { value: t(lang, 'about_stat3_value'), label: t(lang, 'about_stat3_label') },
    { value: t(lang, 'about_stat4_value'), label: t(lang, 'about_stat4_label') },
  ];

  return (
    <section className="premium-about-section">
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-24">
        <img
          src="/images/hero/medina-pano.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/80">
              <span>Scroll to learn more</span>
              <div className="w-8 h-8 border-b-2 border-r-2 border-white/80 rotate-45 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
              {content.story.title}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {content.story.title}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{content.story.body}</p>
            </div>
          </div>
          <div className="lg:pt-16">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-2xl shadow-xl shadow-amber-200/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Roots</h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                We are from Merzouga, and every part of our work is rooted in the Sahara we grew up in.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Promise</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Every tour is guided by people who live here, not by a booking platform sending a guide from somewhere else.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 mb-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            {content.timeline.title}
          </h2>
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <div className="flex-grow pt-1">
                  {item.year ? <span className="text-amber-600 font-semibold text-lg block mb-2">{item.year}</span> : null}
                  <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
              <p className="text-5xl font-bold text-gray-900 mb-4">{stat.value}</p>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-32">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20">
          {content.team.sectionTitle}
        </h2>
        <div className="space-y-24">
          {guideOrder.map((guideKey, index) => {
            const guide = team[guideKey];
            const imageSrc = guideImages[guideKey];
            const imageFirst = index % 2 === 0;
            const isMohamed = guideKey === 'mohamed';
            const mohamedImageCropStyle = isMohamed ? { objectPosition: '50% 10%' } : undefined;
            return (
              <div key={guide.name} className="grid lg:grid-cols-2 gap-12 items-center">
                {imageFirst ? (
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <img src={imageSrc} alt={guide.name} loading="lazy" decoding="async" className="w-full h-full object-cover" style={mohamedImageCropStyle} />
                  </div>
                ) : null}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{guide.name}</h3>
                  <p className="text-amber-600 font-semibold text-lg mb-6">{guide.role}</p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{sanitizeText(guide.teaser)}</p>
                  <div className="text-gray-600 text-lg leading-relaxed space-y-4">{renderParagraphs(guide.story)}</div>
                </div>
                {!imageFirst ? (
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <img src={imageSrc} alt={guide.name} loading="lazy" decoding="async" className="w-full h-full object-cover" style={mohamedImageCropStyle} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-900 text-white py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">{content.trust.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.trust.items.map((item) => (
              <div key={item.heading} className="text-center">
                <h3 className="text-xl font-bold mb-3">{item.heading}</h3>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{content.cta.title}</h2>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Choose an itinerary with the team who knows Merzouga best.
        </p>
        <Link
          to="/tours"
          className="inline-block bg-amber-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
        >
          {content.cta.buttonText}
        </Link>
      </div>
    </section>
  );
}
