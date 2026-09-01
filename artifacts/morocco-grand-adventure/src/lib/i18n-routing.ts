// ─────────────────────────────────────────────────────────────────────────────
// Localized URL routing helpers
// Language is the first path segment. Static route slugs are translated per
// language so users and search engines see meaningful localized URLs.
// Dynamic IDs/slugs remain canonical content identifiers unless a dedicated
// localized identifier exists.
// ─────────────────────────────────────────────────────────────────────────────
import { languages, type Lang } from '@/i18n/index';

export const RAW_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const CODES = languages.map((l) => l.code) as string[];
const STORAGE_KEY = 'mga_lang';

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && CODES.includes(value);
}

export function parseLangPath(pathname: string): { lang: Lang | null; rest: string } {
  let p = pathname || '/';
  if (RAW_BASE && p.startsWith(RAW_BASE)) p = p.slice(RAW_BASE.length);
  if (!p.startsWith('/')) p = '/' + p;
  const seg = p.split('/')[1] ?? '';
  if (isLang(seg)) {
    const rest = p.slice(seg.length + 1);
    return { lang: seg, rest: rest.startsWith('/') ? rest : '/' + rest };
  }
  return { lang: null, rest: p };
}

export function preferredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}
  try {
    const prefs = navigator.languages ?? [navigator.language];
    for (const pref of prefs) {
      const code = pref.split('-')[0];
      if (isLang(code)) return code;
    }
  } catch {}
  return 'en';
}

const ROUTES: Record<string, Partial<Record<Lang, string>>> = {
  destinations: { fr:'destinations', es:'destinos', it:'destinazioni', de:'reiseziele', nl:'bestemmingen', pt:'destinos', zh:'目的地', ja:'目的地', ko:'목적지', ar:'الوجهات' },
  tours: { fr:'circuits', es:'circuitos', it:'tour', de:'rundreisen', nl:'rondreizen', pt:'tours', zh:'旅游线路', ja:'ツアー', ko:'투어', ar:'الجولات' },
  gallery: { fr:'galerie', es:'galeria', it:'galleria', de:'galerie', nl:'galerij', pt:'galeria', zh:'图库', ja:'ギャラリー', ko:'갤러리', ar:'المعرض' },
  about: { fr:'a-propos', es:'sobre-nosotros', it:'chi-siamo', de:'ueber-uns', nl:'over-ons', pt:'sobre-nos', zh:'关于我们', ja:'私たちについて', ko:'회사소개', ar:'من-نحن' },
  contact: { fr:'contact', es:'contacto', it:'contatti', de:'kontakt', nl:'contact', pt:'contacto', zh:'联系', ja:'お問い合わせ', ko:'연락처', ar:'اتصل-بنا' },
  'trip-builder': { fr:'planifier-voyage', es:'planificar-viaje', it:'pianifica-viaggio', de:'reise-planen', nl:'reis-plannen', pt:'planejar-viagem', zh:'定制旅行', ja:'旅行を計画', ko:'여행계획', ar:'خطط-رحلتك' },
  'build-your-day-trip': { fr:'creer-excursion', es:'crear-excursion', it:'crea-escursione', de:'tagesausflug-planen', nl:'dagtocht-maken', pt:'criar-excursao', zh:'定制一日游', ja:'日帰り旅行を作る', ko:'당일여행만들기', ar:'أنشئ-رحلة-يوم' },
  'desert-tours': { fr:'circuits-sahara', es:'tours-sahara', it:'tour-sahara', de:'sahara-touren', nl:'sahara-rondreizen', pt:'tours-sahara', zh:'撒哈拉之旅', ja:'サハラツアー', ko:'사하라투어', ar:'جولات-الصحراء' },
  'luxury-camp': { fr:'camp-desert-luxe', es:'campamento-desierto-lujo', it:'campo-deserto-lusso', de:'luxus-wuestencamp', nl:'luxe-woestijnkamp', pt:'acampamento-deserto-luxo', zh:'豪华沙漠营地', ja:'砂漠ラグジュアリーキャンプ', ko:'럭셔리사막캠프', ar:'مخيم-صحراوي-فاخر' },
  'camel-trekking': { fr:'randonnee-chameau', es:'trekking-camellos', it:'trekking-cammello', de:'kamel-trekking', nl:'kamelen-trekking', pt:'trekking-camelo', zh:'骑骆驼', ja:'ラクダトレッキング', ko:'낙타트레킹', ar:'رحلة-الجمال' },
  '4x4-tours': { fr:'excursions-4x4', es:'tours-4x4', it:'tour-4x4', de:'4x4-touren', nl:'4x4-rondritten', pt:'tours-4x4', zh:'四驱沙漠之旅', ja:'4x4ツアー', ko:'4x4투어', ar:'جولات-4x4' },
  'marrakech-tours': { fr:'circuits-marrakech', es:'tours-marrakech', it:'tour-marrakech', de:'marrakesch-rundreisen', nl:'marrakech-rondreizen', pt:'tours-marrakech', zh:'马拉喀什旅游', ja:'マラケシュツアー', ko:'마라케시투어', ar:'جولات-مراكش' },
  'fes-tours': { fr:'circuits-fes', es:'tours-fez', it:'tour-fes', de:'fes-rundreisen', nl:'fes-rondreizen', pt:'tours-fes', zh:'非斯旅游', ja:'フェズツアー', ko:'페즈투어', ar:'جولات-فاس' },
  'agadir-tours': { fr:'circuits-agadir', es:'tours-agadir', it:'tour-agadir', de:'agadir-rundreisen', nl:'agadir-rondreizen', pt:'tours-agadir', zh:'阿加迪尔旅游', ja:'アガディールツアー', ko:'아가디르투어', ar:'جولات-أكادير' },
  'casablanca-tours': { fr:'circuits-casablanca', es:'tours-casablanca', it:'tour-casablanca', de:'casablanca-rundreisen', nl:'casablanca-rondreizen', pt:'tours-casablanca', zh:'卡萨布兰卡旅游', ja:'カサブランカツアー', ko:'카사블랑카투어', ar:'جولات-الدار-البيضاء' },
  'day-trips': { fr:'excursions', es:'excursiones', it:'escursioni', de:'tagesausfluege', nl:'dagtochten', pt:'passeios', zh:'一日游', ja:'日帰り旅行', ko:'당일여행', ar:'رحلات-يوم' },
  'merzouga-guide': { fr:'guide-merzouga', es:'guia-merzouga', it:'guida-merzouga', de:'merzouga-reisefuehrer', nl:'merzouga-gids', pt:'guia-merzouga', zh:'梅尔祖卡指南', ja:'メルズーガガイド', ko:'메르주가가이드', ar:'دليل-مرزوكة' },
  faq: { fr:'faq', es:'preguntas-frecuentes', it:'faq', de:'faq', nl:'veelgestelde-vragen', pt:'perguntas-frequentes', zh:'常见问题', ja:'よくある質問', ko:'자주묻는질문', ar:'الاسئلة-الشائعة' },
  blog: { fr:'blog-voyage', es:'blog-viajes', it:'blog-viaggi', de:'reiseblog', nl:'reisblog', pt:'blog-de-viagem', zh:'旅行博客', ja:'旅行ブログ', ko:'여행블로그', ar:'مدونة-السفر' },
};

const reverseRoute = new Map<string, string>();
for (const [canonical, variants] of Object.entries(ROUTES)) {
  for (const [lang, slug] of Object.entries(variants)) reverseRoute.set(`${lang}:${slug}`, canonical);
}

export function canonicalizeRoute(rest: string, lang: Lang): string {
  const parts = rest.replace(/^\//, '').split('/');
  if (!parts[0]) return '/';
  const canonical = reverseRoute.get(`${lang}:${parts[0]}`);
  if (canonical) parts[0] = canonical;
  return '/' + parts.join('/');
}

export function langHref(lang: Lang, rest: string, search = '', hash = ''): string {
  const clean = rest === '/' ? '' : rest;
  const parts = clean.replace(/^\//, '').split('/');
  if (parts[0] && ROUTES[parts[0]]?.[lang]) parts[0] = ROUTES[parts[0]][lang]!;
  const localized = parts.filter(Boolean).join('/');
  return `${RAW_BASE}/${lang}${localized ? '/' + localized : ''}${search}${hash}`;
}

export function localizeInternalHref(href: string, lang: Lang): string {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return href;
  let url: URL;
  try { url = new URL(href, window.location.origin); } catch { return href; }
  if (url.origin !== window.location.origin) return href;
  const parsed = parseLangPath(url.pathname);
  const sourceRest = parsed.lang ? parsed.rest : url.pathname;
  return langHref(lang, sourceRest, url.search, url.hash);
}
