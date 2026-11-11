// ─────────────────────────────────────────────────────────────────────────────
// Merzouga guide / comparison / travel-info pages (SeoHubPage.tsx) — one extra
// link in the shared "Conversion CTA" section, pointing to the bookable Sahara
// desert-tours hub. Added alongside the existing "build my journey" + WhatsApp
// CTA to channel link authority from the site's highest-impression informational
// pages into the commercial /desert-tours hub.
//
// guide_cta_camel_trekking / guide_cta_4x4_tours / guide_cta_desert_camps
// (Section 10, Phase 1.4): one additional, topic-scoped contextual link —
// shown only on the camel-trekking, 4x4-desert-tour and desert-camps guide
// pages specifically — to their matching commercial experience page
// (/camel-trekking, /4x4-tours, /luxury-camp). Same house style as
// guide_cta_desert_tours above: a short, direct invitation, not a sales pitch.
//
// guide_cta_luxury_camps (Section 10, Phase 2.2.1): same pattern, for the
// luxury-desert-camps guide — also links to /luxury-camp, but worded around
// "luxury" specifically (not reused from guide_cta_desert_camps) since this
// guide's own subject is the luxury tier, not desert camps in general.
// ─────────────────────────────────────────────────────────────────────────────

export const guideCtaGaps: Partial<Record<string, Record<string, string>>> = {
  en: {
    guide_cta_desert_tours: 'Browse our Sahara desert tours',
    guide_cta_camel_trekking: 'See our camel trekking options',
    guide_cta_4x4_tours: 'Explore our 4x4 desert tours',
    guide_cta_desert_camps: 'See our desert camp options',
    guide_cta_luxury_camps: 'See our luxury camp options',
  },
  fr: {
    guide_cta_desert_tours: 'Voir nos circuits dans le désert du Sahara',
    guide_cta_camel_trekking: 'Découvrir nos treks à dos de chameau',
    guide_cta_4x4_tours: 'Découvrir nos circuits en 4x4 dans le désert',
    guide_cta_desert_camps: 'Voir nos campements dans le désert',
    guide_cta_luxury_camps: 'Voir nos campements de luxe dans le désert',
  },
  es: {
    guide_cta_desert_tours: 'Ver nuestros tours por el desierto del Sahara',
    guide_cta_camel_trekking: 'Ver nuestras opciones de paseo en camello',
    guide_cta_4x4_tours: 'Descubre nuestros tours en 4x4 por el desierto',
    guide_cta_desert_camps: 'Ver nuestros campamentos en el desierto',
    guide_cta_luxury_camps: 'Ver nuestros campamentos de lujo en el desierto',
  },
  it: {
    guide_cta_desert_tours: 'Scopri i nostri tour nel deserto del Sahara',
    guide_cta_camel_trekking: 'Scopri le nostre escursioni in cammello',
    guide_cta_4x4_tours: 'Scopri i nostri tour in 4x4 nel deserto',
    guide_cta_desert_camps: 'Scopri i nostri campi tendati nel deserto',
    guide_cta_luxury_camps: 'Scopri i nostri campi tendati di lusso',
  },
  de: {
    guide_cta_desert_tours: 'Unsere Sahara-Wüstentouren entdecken',
    guide_cta_camel_trekking: 'Unsere Kamelritt-Touren entdecken',
    guide_cta_4x4_tours: 'Unsere 4x4-Wüstentouren entdecken',
    guide_cta_desert_camps: 'Unsere Wüstencamps entdecken',
    guide_cta_luxury_camps: 'Unsere Luxus-Wüstencamps entdecken',
  },
  nl: {
    guide_cta_desert_tours: 'Bekijk onze Sahara woestijnreizen',
    guide_cta_camel_trekking: 'Bekijk onze kameeltochten',
    guide_cta_4x4_tours: 'Bekijk onze 4x4 woestijntochten',
    guide_cta_desert_camps: 'Bekijk onze woestijnkampen',
    guide_cta_luxury_camps: 'Bekijk onze luxe woestijnkampen',
  },
  pt: {
    guide_cta_desert_tours: 'Veja os nossos passeios no deserto do Saara',
    guide_cta_camel_trekking: 'Veja os nossos passeios de camelo',
    guide_cta_4x4_tours: 'Veja os nossos passeios de 4x4 no deserto',
    guide_cta_desert_camps: 'Veja os nossos acampamentos no deserto',
    guide_cta_luxury_camps: 'Veja os nossos acampamentos de luxo no deserto',
  },
  zh: {
    guide_cta_desert_tours: '查看我们的撒哈拉沙漠之旅',
    guide_cta_camel_trekking: '查看我们的骑骆驼体验',
    guide_cta_4x4_tours: '查看我们的沙漠四驱车之旅',
    guide_cta_desert_camps: '查看我们的沙漠营地',
    guide_cta_luxury_camps: '查看我们的豪华沙漠营地',
  },
  ja: {
    guide_cta_desert_tours: 'サハラ砂漠ツアーを見る',
    guide_cta_camel_trekking: 'ラクダトレッキングのオプションを見る',
    guide_cta_4x4_tours: '4x4砂漠ツアーを見る',
    guide_cta_desert_camps: '砂漠キャンプのオプションを見る',
    guide_cta_luxury_camps: '豪華砂漠キャンプのオプションを見る',
  },
  ko: {
    guide_cta_desert_tours: '사하라 사막 투어 보기',
    guide_cta_camel_trekking: '낙타 트레킹 옵션 보기',
    guide_cta_4x4_tours: '4x4 사막 투어 보기',
    guide_cta_desert_camps: '사막 캠프 옵션 보기',
    guide_cta_luxury_camps: '럭셔리 사막 캠프 옵션 보기',
  },
  ar: {
    guide_cta_desert_tours: 'استعرض جولات الصحراء لدينا',
    guide_cta_camel_trekking: 'استعرض خيارات ركوب الجمال لدينا',
    guide_cta_4x4_tours: 'استعرض جولات السيارات الرباعية الدفع لدينا',
    guide_cta_desert_camps: 'استعرض خيارات المخيمات الصحراوية لدينا',
    guide_cta_luxury_camps: 'استعرض خيارات المخيمات الصحراوية الفاخرة لدينا',
  },
};
