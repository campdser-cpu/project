import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n';

export default function PremiumAboutSection() {
  const { lang } = useLanguage();

  return (
    <section className="premium-about-section">
      {/* Hero - Full Width with Overlay */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero/sahara-sunset.jpg)' }} />
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t(lang, 'about_hero_title')}
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            {t(lang, 'about_hero_subtitle')}
          </p>
        </div>
      </div>

      {/* Story Section - Editorial Layout */}
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
              {t(lang, 'about_story_label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {t(lang, 'diff_story_heading')}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{t(lang, 'diff_story_p1')}</p>
              <p>{t(lang, 'diff_story_p2')}</p>
            </div>
          </div>
          <div className="lg:pt-16">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t(lang, 'diff_roots_heading')}
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {t(lang, 'diff_roots_desc')}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t(lang, 'diff_passion_heading')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t(lang, 'diff_passion_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 py-24 mb-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            {t(lang, 'diff_journey_heading')}
          </h2>
          <div className="space-y-12">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-amber-600 font-bold text-lg">
                    {t(lang, `diff_timeline_${item}_year`)}
                  </span>
                </div>
                <div className="flex-shrink-0 w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item}
                </div>
                <div className="flex-grow pt-2">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {t(lang, `diff_timeline_${item}_text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Makes Us Different - Minimal Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20">
          {t(lang, 'diff_different_heading')}
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t(lang, 'diff_different_1_title')}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t(lang, 'diff_different_1_desc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t(lang, 'diff_different_2_title')}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t(lang, 'diff_different_2_desc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t(lang, 'diff_different_3_title')}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t(lang, 'diff_different_3_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Meet Your Guides - Large Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t(lang, 'diff_guides_heading')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(lang, 'diff_guides_sub')}
          </p>
        </div>

        <div className="space-y-24">
          {/* Guide 1 - Mohamed */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                  <p className="text-gray-600 font-medium">Mohamed Boughrara</p>
                  <p className="text-gray-500 text-sm">Founder & Desert Guide</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t(lang, 'diff_guide_1_name')}
              </h3>
              <p className="text-amber-600 font-semibold text-lg mb-6">
                {t(lang, 'diff_guide_1_role')}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t(lang, 'diff_guide_1_teaser')}
              </p>
              <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                <p>{t(lang, 'diff_guide_1_story_p1')}</p>
                <p>{t(lang, 'diff_guide_1_story_p2')}</p>
                <p>{t(lang, 'diff_guide_1_story_p3')}</p>
                <p>{t(lang, 'diff_guide_1_story_p4')}</p>
              </div>
            </div>
          </div>

          {/* Guide 2 - Mostapha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t(lang, 'diff_guide_2_name')}
              </h3>
              <p className="text-amber-600 font-semibold text-lg mb-6">
                {t(lang, 'diff_guide_2_role')}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t(lang, 'diff_guide_2_teaser')}
              </p>
              <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                <p>{t(lang, 'diff_guide_2_story_p1')}</p>
                <p>{t(lang, 'diff_guide_2_story_p2')}</p>
                <p>{t(lang, 'diff_guide_2_story_p3')}</p>
                <p>{t(lang, 'diff_guide_2_story_p4')}</p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden order-1 lg:order-2">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                  <p className="text-gray-600 font-medium">Mostapha Wargaga</p>
                  <p className="text-gray-500 text-sm">Senior Desert Guide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guide 3 - Moha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                  <p className="text-gray-600 font-medium">Moha Amroui</p>
                  <p className="text-gray-500 text-sm">Desert Guide</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t(lang, 'diff_guide_3_name')}
              </h3>
              <p className="text-amber-600 font-semibold text-lg mb-6">
                {t(lang, 'diff_guide_3_role')}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t(lang, 'diff_guide_3_teaser')}
              </p>
              <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                <p>{t(lang, 'diff_guide_3_story_p1')}</p>
                <p>{t(lang, 'diff_guide_3_story_p2')}</p>
                <p>{t(lang, 'diff_guide_3_story_p3')}</p>
                <p>{t(lang, 'diff_guide_3_story_p4')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-900 text-white py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t(lang, 'diff_trust_heading')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <h3 className="text-xl font-bold mb-3">
                  {t(lang, `diff_trust_${item}_heading`)}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t(lang, `diff_trust_${item}_text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Minimal */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t(lang, 'diff_cta_heading')}
        </h2>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          {t(lang, 'diff_cta_sub')}
        </p>
        <a
          href="https://wa.me/212612345678"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-amber-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
        >
          {t(lang, 'diff_cta_button')}
        </a>
      </div>
    </section>
  );
}