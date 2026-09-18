// ─────────────────────────────────────────────────────────────────────────────
// Trust signals, plus the alt text used for a destination photograph whose
// location we cannot verify (it describes the picture, never the place).
//
// Every line here is checkable against this repository or a public page:
//   • the destination and itinerary counts come from src/data/content.ts and
//     are rendered from `destinations.length` / `tours.length`, so they cannot
//     drift from what the site actually offers;
//   • the base is the business address in contactInfo (Merzouga, Errachidia);
//   • the quote promise is what /book and the tour panels actually do;
//   • the reviews link points at the company's own Google listing, the source
//     of the transcribed reviews in src/data/verifiedReviews.ts.
//
// Awards, ratings, traveller counts, licences and certifications are NOT
// claimed here: no evidence for them exists in this project. Do not add one
// back without a verifiable source.
//
// Authored per language, merged into t() via gaps/index.ts.
// ─────────────────────────────────────────────────────────────────────────────

export const trustGaps: Partial<Record<string, Record<string, string>>> = {
  en: {
    dest_alt_unverified: "Oak woodland on a hillside above farmland in Morocco",
    trust_destinations: '{n} destinations across Morocco',
    trust_itineraries: '{n} private itineraries',
    trust_based: 'Based in Merzouga, Sahara',
    trust_quote: 'A written quote before you pay',
    trust_reviews: 'Reviews on Google',
  },
  fr: {
    dest_alt_unverified: "Chênaie sur un versant dominant des terres cultivées au Maroc",
    trust_destinations: '{n} destinations au Maroc',
    trust_itineraries: '{n} itinéraires privés',
    trust_based: 'Basés à Merzouga, au Sahara',
    trust_quote: 'Un devis écrit avant tout paiement',
    trust_reviews: 'Avis sur Google',
  },
  es: {
    dest_alt_unverified: "Encinar en una ladera sobre campos de cultivo en Marruecos",
    trust_destinations: '{n} destinos por Marruecos',
    trust_itineraries: '{n} itinerarios privados',
    trust_based: 'Con base en Merzouga, en el Sáhara',
    trust_quote: 'Un presupuesto por escrito antes de pagar',
    trust_reviews: 'Opiniones en Google',
  },
  it: {
    dest_alt_unverified: "Bosco di querce su un pendio sopra campi coltivati in Marocco",
    trust_destinations: '{n} destinazioni in Marocco',
    trust_itineraries: '{n} itinerari privati',
    trust_based: 'Con base a Merzouga, nel Sahara',
    trust_quote: 'Un preventivo scritto prima di pagare',
    trust_reviews: 'Recensioni su Google',
  },
  de: {
    dest_alt_unverified: "Eichenwald an einem Hang über Ackerland in Marokko",
    trust_destinations: '{n} Reiseziele in Marokko',
    trust_itineraries: '{n} private Reiserouten',
    trust_based: 'Ansässig in Merzouga, Sahara',
    trust_quote: 'Ein schriftliches Angebot vor jeder Zahlung',
    trust_reviews: 'Bewertungen auf Google',
  },
  nl: {
    dest_alt_unverified: "Eikenbos op een helling boven landbouwgrond in Marokko",
    trust_destinations: '{n} bestemmingen in Marokko',
    trust_itineraries: '{n} privéreizen',
    trust_based: 'Gevestigd in Merzouga, Sahara',
    trust_quote: 'Een schriftelijke offerte voordat je betaalt',
    trust_reviews: 'Reviews op Google',
  },
  pt: {
    dest_alt_unverified: "Carvalhal numa encosta sobre campos cultivados em Marrocos",
    trust_destinations: '{n} destinos em Marrocos',
    trust_itineraries: '{n} itinerários privados',
    trust_based: 'Sediados em Merzouga, no Sara',
    trust_quote: 'Um orçamento por escrito antes de pagar',
    trust_reviews: 'Avaliações no Google',
  },
  zh: {
    dest_alt_unverified: "摩洛哥山坡上的橡树林，下方是耕地",
    trust_destinations: '{n} 个摩洛哥目的地',
    trust_itineraries: '{n} 条私人行程',
    trust_based: '团队常驻撒哈拉的梅尔祖卡',
    trust_quote: '付款前先给您书面报价',
    trust_reviews: 'Google 上的评价',
  },
  ja: {
    dest_alt_unverified: "モロッコの丘陵に広がるオークの林と、その下に続く農地",
    trust_destinations: 'モロッコの目的地 {n} か所',
    trust_itineraries: 'プライベート行程 {n} 本',
    trust_based: 'サハラのメルズーガ在住',
    trust_quote: 'お支払い前に書面のお見積り',
    trust_reviews: 'Google のクチコミ',
  },
  ko: {
    dest_alt_unverified: "모로코의 비탈에 자란 참나무 숲과 그 아래 농지",
    trust_destinations: '모로코 여행지 {n}곳',
    trust_itineraries: '프라이빗 일정 {n}개',
    trust_based: '사하라 메르주가에 상주',
    trust_quote: '결제 전에 드리는 서면 견적',
    trust_reviews: 'Google 리뷰',
  },
  ar: {
    dest_alt_unverified: "غابة بلوط على منحدر يطل على أراضٍ زراعية في المغرب",
    trust_destinations: '{n} وجهة في المغرب',
    trust_itineraries: '{n} برنامجًا خاصًا',
    trust_based: 'مقرّنا في مرزوكة بالصحراء',
    trust_quote: 'عرض سعر مكتوب قبل الدفع',
    trust_reviews: 'التقييمات على Google',
  },
};
