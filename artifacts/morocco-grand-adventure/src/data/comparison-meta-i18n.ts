// ── Localized comparison metadata (authored, natural search wording) ──────────
// Single localized source for the six /comparisons/:slug pages, consumed by
// BOTH the runtime SeoHubPage/LocalizedHead and scripts/prerender.ts, mirroring
// the LOCALIZED_ROUTE_META pattern in src/components/seo/route-metadata.ts.
// Only title (H1), pageTitle (<title>) and description (meta description) are
// localized; body copy intentionally stays canonical English for now.
// Wording: INFERRED — linguistically natural SEO wording, not validated by
// search-volume data. No search-demand figures are invented anywhere.
// Facts mirror the English source copy in src/data/seoHub.ts.
// Fallback: locales without an entry keep the canonical English copy.
import type { Lang } from '@/i18n/index';

export type LocalizedComparisonMeta = { title: string; pageTitle: string; description: string };

export const COMPARISON_META_I18N: Record<string, Partial<Record<Lang, LocalizedComparisonMeta>>> = {
  'merzouga-vs-zagora': {
    fr: { title: 'Merzouga ou Zagora — quelle base saharienne choisir ?', pageTitle: 'Merzouga vs Zagora — choisir sa base dans le désert marocain', description: 'Hésitez entre Merzouga et Zagora pour votre séjour dans le Sahara ? Dunes, accès, fréquentation et itinéraires : ce comparatif vous aide à trancher.' },
    es: { title: 'Merzouga o Zagora — ¿qué base del Sáhara elegir?', pageTitle: 'Merzouga vs Zagora — elige tu base en el desierto', description: '¿Dudas entre Merzouga y Zagora para tu viaje al Sáhara? Dunas, accesos, afluencia y el itinerario adecuado para cada caso.' },
    it: { title: 'Merzouga o Zagora — quale base nel Sahara scegliere', pageTitle: 'Merzouga vs Zagora — la base ideale nel deserto', description: "Esitare tra Merzouga e Zagora per il viaggio nel Sahara? Dune, accessi, affollamento e l'itinerario giusto per ogni esigenza." },
    de: { title: 'Merzouga oder Zagora — welche Saharabasis passt zu Ihnen?', pageTitle: 'Merzouga vs. Zagora — die richtige Wüstenbasis wählen', description: 'Schwierigkeiten bei der Wahl zwischen Merzouga und Zagora? Dünen, Anreise, Besucherzahlen und die passende Route im direkten Vergleich.' },
    nl: { title: 'Merzouga of Zagora — welke Saharabasis kies je?', pageTitle: 'Merzouga vs Zagora — je basis in de Sahara kiezen', description: 'Twijfel je tussen Merzouga en Zagora voor je Sahara-reis? Duinen, bereikbaarheid, drukte en de route die bij jou past, eerlijk vergeleken.' },
    pt: { title: 'Merzouga ou Zagora — qual base no Saara escolher?', pageTitle: 'Merzouga vs Zagora — escolha a sua base no deserto', description: 'Em dúvida entre Merzouga e Zagora para a viagem ao Saara? Dunas, acessos, movimento e o itinerário certo para cada perfil.' },
    zh: { title: '梅尔祖卡还是扎古拉 — 撒哈拉大本营怎么选？', pageTitle: '梅尔祖卡 vs 扎古拉 — 摩洛哥沙漠营地选择指南', description: '正在纠结撒哈拉行程选梅尔祖卡还是扎古拉？本文从沙丘规模、交通可达性、游客密度与行程搭配逐项对比。' },
    ja: { title: 'メルズーガかザゴラか — サハラの拠点選び', pageTitle: 'メルズーガ vs ザゴラ — モロッコ砂漠ツアーの拠点比較', description: 'モロッコのサハラ旅行、メルズーガとザゴラどちらの拠点がよいか迷っていませんか。砂丘の規模、アクセス、混雑度、行程の相性を比較します。' },
    ko: { title: '메르주가 vs 자고라 — 사하라 거점 선택 가이드', pageTitle: '메르주가 vs 자고라 — 어떤 사하라 거점이 맞을까?', description: '모로코 사하라 여행에서 메르주가와 자고라 중 어디를 선택할지 고민이라면? 모래언덕, 접근성, 혼잡도, 일정 궁합을 비교했습니다.' },
    ar: { title: 'مرزوكة أم زاكورة — أي قاعدة لرحلتك الصحراوية؟', pageTitle: 'مرزوكة أم زاكورة — دليل اختيار قاعدة الصحراء', description: 'تحتار بين مرزوكة وزاكورة لرحلتك إلى الصحراء؟ نقارن الكثبان، سهولة الوصول، الازدحام والرحلة الأنسب لكل حالة.' },
  },
  'erg-chebbi-vs-erg-chigaga': {
    fr: { title: 'Erg Chebbi ou Erg Chigaga — deux déserts, deux expériences', pageTitle: 'Erg Chebbi vs Erg Chigaga — quelles dunes sahariennes ?', description: 'Erg Chebbi près de Merzouga face à Erg Chigaga près de Zagora : taille des dunes, accès, campements et ambiance de chaque erg.' },
    es: { title: 'Erg Chebbi o Erg Chigaga — dos desiertos marroquíes', pageTitle: 'Erg Chebbi vs Erg Chigaga — ¿qué dunas del Sáhara?', description: 'Erg Chebbi, junto a Merzouga, frente a Erg Chigaga, cerca de Zagora: tamaño de las dunas, accesos, campamentos y el tipo de desierto de cada uno.' },
    it: { title: 'Erg Chebbi o Erg Chigaga — due deserti a confronto', pageTitle: 'Erg Chebbi vs Erg Chigaga — quali dune del Sahara?', description: 'Erg Chebbi vicino a Merzouga contro Erg Chigaga presso Zagora: dimensioni delle dune, accessi, camp e carattere di ogni deserto.' },
    de: { title: 'Erg Chebbi oder Erg Chigaga — zwei marokkanische Wüsten', pageTitle: 'Erg Chebbi vs. Erg Chigaga — welche Saharadünen?', description: 'Erg Chebbi bei Merzouga im Vergleich mit Erg Chigaga bei Zagora: Dünengröße, Anreise, Camps und der jeweilige Wüstencharakter.' },
    nl: { title: 'Erg Chebbi of Erg Chigaga — twee Sahara-woestijnen', pageTitle: 'Erg Chebbi vs Erg Chigaga — welke duinen in de Sahara?', description: 'Erg Chebbi bij Merzouga vergeleken met Erg Chigaga bij Zagora: duinomvang, bereikbaarheid, kampen en het karakter van elke woestijn.' },
    pt: { title: 'Erg Chebbi ou Erg Chigaga — dois desertos de Marrocos', pageTitle: 'Erg Chebbi vs Erg Chigaga — quais dunas do Saara?', description: 'Erg Chebbi, junto a Merzouga, contra Erg Chigaga, perto de Zagora: dimensão das dunas, acessos, campamentos e o tipo de deserto de cada um.' },
    zh: { title: '艾尔格切比 vs 艾尔格齐加加 — 两种撒哈拉沙漠体验', pageTitle: '艾尔格切比 vs 艾尔格齐加加 — 撒哈拉沙丘怎么选？', description: '梅尔祖卡附近的艾尔格切比对阵扎古拉附近的艾尔格齐加加：沙丘规模、交通、营地与沙漠氛围逐项对比。' },
    ja: { title: 'エルグ・チェビかエルグ・チガガか — 2つのサハラ砂漠', pageTitle: 'エルグ・チェビ vs エルグ・チガガ — どちらの砂丘へ？', description: 'メルズーガ近郊のエルグ・チェビとザゴラ近郊のエルグ・チガガを比較。砂丘の規模、アクセス、キャンプ、それぞれの砂漠の雰囲気。' },
    ko: { title: '에르그 셰비 vs 에르그 시가가 — 두 개의 모로코 사막', pageTitle: '에르그 셰비 vs 에르그 시가가 — 어떤 사하라 모래언덕?', description: '메르주가 인근 에르그 셰비와 자고라 인근 에르그 시가가 비교: 모래언덕 규모, 접근성, 캠프와 각 사막의 분위기.' },
    ar: { title: 'إيرج شبي أم إيرج شقاقة — صحراءان مغربيتان', pageTitle: 'إيرج شبي أم إيرج شقاقة — أي كثبان تختار؟', description: 'مقارنة بين إيرج شبي قرب مرزوكة وإيرج شقاقة قرب زاكورة: حجم الكثبان، سهولة الوصول، المخيمات وطابع كل صحراء.' },
  },
  '2-day-vs-3-day-sahara-tour': {
    fr: { title: 'Séjour Sahara de 2 ou 3 jours — lequel vous convient ?', pageTitle: 'Tour du Sahara de 2 jours ou 3 jours — guide de durée', description: 'Séjour de 2 jours ou 3 jours dans le Sahara au départ de Marrakech : programme, rythme réaliste et type de voyageur pour chaque formule.' },
    es: { title: 'Tour al Sáhara de 2 o 3 días — ¿cuál te encaja?', pageTitle: 'Sáhara de 2 días vs 3 días — guía de duración', description: 'Excursión de 2 o 3 días al Sáhara desde Marrakech: qué incluye cada una, tiempos realistas y qué formato encaja mejor con tu ritmo.' },
    it: { title: 'Tour del Sahara di 2 o 3 giorni — quale fa per te?', pageTitle: 'Sahara di 2 giorni vs 3 giorni — guida alla durata', description: 'Tour di 2 o 3 giorni nel Sahara da Marrakech: programmi, tempi realistici e quale formula conviene a un viaggio serrato o rilassato.' },
    de: { title: 'Sahara-Tour für 2 oder 3 Tage — was passt zu Ihrer Reise?', pageTitle: '2-Tage vs. 3-Tage Sahara-Tour — Reisedauer im Vergleich', description: 'Sahara-Tour ab Marrakesch mit 2 oder 3 Tagen: Programm, realistische Fahrzeiten und welche Variante zu knappem oder entspanntem Zeitplan passt.' },
    nl: { title: 'Sahara-tour van 2 of 3 dagen — wat past bij jouw reis?', pageTitle: '2-daagse vs 3-daagse Sahara-tour — reisduur vergeleken', description: 'Sahara-tour vanaf Marrakech met 2 of 3 dagen: programma, realistische tijden en welke variant past bij haast of rustig tempo.' },
    pt: { title: 'Tour no Saara de 2 ou 3 dias — qual combina com você?', pageTitle: 'Saara de 2 dias vs 3 dias — guia de duração', description: 'Tour de 2 ou 3 dias no Saara saindo de Marraquexe: o que cada um inclui, tempos realistas e qual formato convém a um ritmo apressado ou tranquilo.' },
    zh: { title: '撒哈拉 2 天还是 3 天 — 哪种行程适合你？', pageTitle: '撒哈拉 2 日游 vs 3 日游 — 行程天数指南', description: '从马拉喀什出发的撒哈拉 2 日与 3 日沙漠团对比：各自覆盖的景点、真实时间安排，以及快节奏与悠闲行程的取舍。' },
    ja: { title: 'サハラ 2日か3日か — 旅に合う滞在日数', pageTitle: 'サハラ 2日 vs 3日 — 滞在日数の目安', description: 'マラケシ発サハラツアー、2日と3日の違い。それぞれの行程、現実的な移動時間、慌ただしい旅とゆったり旅どちらに合うかを解説します。' },
    ko: { title: '사하라 2일 vs 3일 — 내 여행에는 어느 쪽?', pageTitle: '사하라 2일 vs 3일 투어 — 일정 길이 가이드', description: '마라케시 출발 사하라 투어, 2일과 3일의 차이: 각 일정의 구성, 현실적인 이동 시간, 바쁜 여행과 여유로운 여행에 어울리는 선택.' },
    ar: { title: 'جولة صحراوية ليومين أم ثلاثة — أيّها يناسبك؟', pageTitle: 'جولة 2 أيام أم 3 أيام في الصحراء — دليل المدة', description: 'جولة صحراوية من مراكش ليومين أو ثلاثة: ما تشمله كل منها، توقيتات واقعية، وأيّها أنسب لجدول ضيق أو مريح.' },
  },
  'private-vs-shared-tour': {
    fr: { title: 'Voyage privé ou en groupe au Maroc — les vrais compromis', pageTitle: 'Circuit privé vs circuit partagé au Maroc — comparatif', description: 'Circuit privé ou partagé au Maroc : prix, horaires, ambiance de groupe, flexibilité et profil de voyageur pour chaque formule.' },
    es: { title: 'Tour privado o compartido en Marruecos — qué elegir', pageTitle: 'Tour privado vs compartido en Marruecos — comparativa', description: 'Tours privados o compartidos por Marruecos: precio, horarios, dinámica del grupo, flexibilidad y a quién conviene cada opción.' },
    it: { title: 'Tour privato o di gruppo in Marocco — i veri compromessi', pageTitle: 'Tour privato vs condiviso in Marocco — a confronto', description: 'Tour privati o condivisi in Marocco: prezzo, orari, dinamica del gruppo, flessibilità e a chi conviene ciascuna formula.' },
    de: { title: 'Private oder Gruppenreise in Marokko — die echten Kompromisse', pageTitle: 'Private vs. geteilte Marokko-Reise — im Vergleich', description: 'Private Marokko-Reisen oder geteilte Touren: Preis, Zeitplan, Gruppendynamik, Flexibilität und für wen sich welche Variante eignet.' },
    nl: { title: 'Privéreis of groepsreis Marokko — de echte afwegingen', pageTitle: 'Privéreis vs gedeelde tour Marokko — vergeleken', description: 'Privéreizen of gedeelde tours door Marokko: prijs, schema, groepssfeer, flexibiliteit en wie het beste past bij welke vorm.' },
    pt: { title: 'Tour privado ou partilhado em Marrocos — as trocas reais', pageTitle: 'Tour privado vs partilhado em Marrocos — comparado', description: 'Tours privados ou partilhados em Marrocos: preço, horários, dinâmica do grupo, flexibilidade e a quem convém cada formato.' },
    zh: { title: '摩洛哥私人包团还是拼团游 — 真实的取舍', pageTitle: '摩洛哥私人游 vs 拼团游 — 全面对比', description: '摩洛哥私人定制团与拼团游对比：价格、时间安排、团队氛围、灵活度，以及哪类旅行者更适合哪种方式。' },
    ja: { title: 'モロッコ旅行、専用車か混載か — 実際の違い', pageTitle: 'モロッコ 専用ツアー vs 混載ツアー — 徹底比較', description: 'モロッコの専用ツアーと混載（シェア）ツアーを比較：料金、スケジュール、グループの雰囲気、柔軟性、それぞれが向く旅のスタイル。' },
    ko: { title: '모로코 여행, 프라이빗 vs 공유 투어 — 현실적인 선택 기준', pageTitle: '모로코 프라이빗 투어 vs 공유 투어 — 비교', description: '모로코 프라이빗 투어와 공유 투어 비교: 가격, 일정, 그룹 분위기, 유연성, 그리고 어떤 여행자에게 어느 쪽이 맞는지.' },
    ar: { title: 'جولة خاصة أم مشتركة في المغرب — المقايضات الحقيقية', pageTitle: 'جولة خاصة أم مشتركة — مقارنة عملية', description: 'مقارنة بين الجولات الخاصة والمشتركة في المغرب: السعر، الجدول الزمني، جو المجموعة، المرونة، ومن يناسب كل خيار.' },
  },
  'luxury-camp-vs-standard-camp': {
    fr: { title: 'Bivouac de luxe ou camp standard — votre nuit dans le désert', pageTitle: 'Camp de luxe vs camp standard — nuit à Merzouga', description: 'Campement de luxe ou standard près de Merzouga : tentes, lits, sanitaires, repas et budget pour choisir la bonne nuit dans le désert.' },
    es: { title: 'Campamento de lujo o estándar — tu noche en el desierto', pageTitle: 'Campamento de lujo vs estándar — noche en Merzouga', description: 'Campamento de lujo o estándar cerca de Merzouga: tiendas, camas, baños, comidas y precio para elegir bien tu noche en el desierto.' },
    it: { title: 'Campo di lusso o standard — la tua notte nel deserto', pageTitle: 'Campo di lusso vs standard — notte a Merzouga', description: 'Camp di lusso o standard vicino a Merzouga: tende, letti, bagni, pasti e prezzo per scegliere la notte nel deserto giusta per il tuo budget.' },
    de: { title: 'Luxuscamp oder Standardcamp — Ihre Nacht in der Wüste', pageTitle: 'Luxuscamp vs. Standardcamp — Wüstennacht Merzouga', description: 'Luxuscamp oder Standardcamp bei Merzouga: Zelte, Betten, Bäder, Mahlzeiten und Preis für die passende Wüstennacht.' },
    nl: { title: 'Luxe kamp of standaard kamp — jouw nacht in de woestijn', pageTitle: 'Luxe kamp vs standaard kamp — woestijnnacht Merzouga', description: 'Luxe of standaard woestijnkamp bij Merzouga: tenten, bedden, badkamers, maaltijden en prijs voor de woestijnnacht die bij je budget past.' },
    pt: { title: 'Acampamento de luxo ou padrão — a sua noite no deserto', pageTitle: 'Acampamento de luxo vs padrão — noite em Merzouga', description: 'Acampamento de luxo ou padrão perto de Merzouga: tendas, camas, casas de banho, refeições e preço para escolher bem a noite no deserto.' },
    zh: { title: '豪华营地还是普通营地 — 沙漠之夜怎么选', pageTitle: '豪华帐篷营地 vs 普通营地 — 梅尔祖卡沙漠之夜', description: '梅尔祖卡附近的豪华营地与普通营地对比：帐篷、床位、卫浴、餐饮与价格，帮你按预算选对沙漠之夜。' },
    ja: { title: '高級キャンプかスタンダードか — 砂漠の一夜の選び方', pageTitle: '高級キャンプ vs スタンダード — メルズーガの夜', description: 'メルズーガ近郊の高級キャンプとスタンダードキャンプを比較：テント、ベッド、シャワー、食事、価格、予算に合う砂漠の一夜を。' },
    ko: { title: '럭셔리 캠프 vs 일반 캠프 — 사막의 밤 고르기', pageTitle: '럭셔리 캠프 vs 일반 캠프 — 메르주가 사막의 밤', description: '메르주가 근처 럭셔리 캠프와 일반 캠프 비교: 텐트, 침대, 욕실, 식사, 가격까지 예산에 맞는 사막의 밤을 고르세요.' },
    ar: { title: 'مخيم فاخر أم عادي — اختيار ليلتك الصحراوية', pageTitle: 'مخيم فاخر أم عادي — ليلة صحراوية في مرزوكة', description: 'مقارنة بين المخيمات الفاخرة والعادية قرب مرزوكة: الخيام، الأسرّة، الحمّامات، الوجبات والسعر لاختيار ليلة تناسب ميزانيتك.' },
  },
  'marrakech-vs-fes': {
    fr: { title: 'Marrakech ou Fès — de quelle ville partir pour le Sahara ?', pageTitle: 'Marrakech vs Fès — le meilleur départ pour un tour du désert', description: "Marrakech ou Fès pour votre tour du désert ? Caractère des routes, paysages, grandes étapes et formes d'itinéraire comparés honnêtement pour choisir votre départ." },
    es: { title: 'Marrakech o Fez — ¿desde qué ciudad ir al Sáhara?', pageTitle: 'Marrakech vs Fez — ¿cuál es mejor para un tour al desierto?', description: '¿Marrakech o Fez para tu tour al Sáhara? Carácter de la ruta, paisajes, paradas principales y formatos de itinerario comparados con honestidad.' },
    it: { title: 'Marrakech o Fès — da quale città partire per il Sahara?', pageTitle: 'Marrakech vs Fès — migliore partenza per il tour nel deserto', description: 'Marrakech o Fès per il tuo tour nel deserto? Carattere delle rotte, paesaggi, tappe principali e forme di itinerario a confronto con onestà.' },
    de: { title: 'Marrakesch oder Fès — ab welcher Stadt in die Sahara?', pageTitle: 'Marrakesch vs. Fès — besser für eine Sahara-Reise?', description: 'Marrakesch oder Fès für die Sahara-Tour? Streckencharakter, Landschaften, wichtige Stopps und Reiserouten ehrlich verglichen — für den passenden Startpunkt.' },
    nl: { title: 'Marrakech of Fez — vanaf welke stad naar de Sahara?', pageTitle: 'Marrakech vs Fez — beste startpunt voor een Sahara-tour', description: 'Marrakech of Fez voor je Sahara-tour? Routes, landschappen, belangrijke stops en reisvormen eerlijk vergeleken, zodat je de juiste vertrekstad kiest.' },
    pt: { title: 'Marraquexe ou Fez — de que cidade partir para o Saara?', pageTitle: 'Marraquexe vs Fez — melhor partida para um tour no deserto', description: 'Marraquexe ou Fez para o seu tour no deserto? Carácter das rotas, paisagens, paragens principais e formatos de itinerário comparados com honestidade.' },
    zh: { title: '马拉喀什还是非斯 — 撒哈拉行程从哪座城市出发？', pageTitle: '马拉喀什 vs 非斯 — 沙漠之旅选哪个出发点更好？', description: '撒哈拉沙漠团从马拉喀什还是非斯出发？路线风格、沿途景观、主要停留点与行程结构逐一对比，帮你选对出发城市。' },
    ja: { title: 'マラケシュかフェズか — サハラツアーの出発都市', pageTitle: 'マラケシュ vs フェズ — 砂漠ツアーに適した出発地は？', description: 'モロッコの砂漠ツアー、マラケシュ発とフェズ発どちらにする？ルートの特徴、沿道の風景、主要な立ち寄り地、旅程の形を率直に比較します。' },
    ko: { title: '마라케시 vs 페스 — 사하라 여행은 어느 도시에서 시작?', pageTitle: '마라케시 vs 페스 — 사막 투어 출발 도시 비교', description: '사하라 사막 투어, 마라케시와 페스 중 어디서 출발할까요? 루트의 특성, 풍경, 주요 경유지, 일정 구성을 솔직하게 비교합니다.' },
    ar: { title: 'مراكش أم فاس — من أين تبدأ رحلتك إلى الصحراء؟', pageTitle: 'مراكش أم فاس — الأفضل لجولة صحراوية؟', description: 'مراكش أم فاس لجولتك الصحراوية؟ مقارنة صريحة لطابع الطرق، المناظر، المحطات الرئيسية وأشكال البرامج لتختار نقطة الانطلاق المناسبة.' },
  },
};

export function localizedComparisonMeta(slug: string, lang: Lang): LocalizedComparisonMeta | undefined {
  return COMPARISON_META_I18N[slug]?.[lang];
}
