// ─────────────────────────────────────────────────────────────────────────────
// Language configuration and UI translation helper.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'fr' | 'es' | 'it' | 'de' | 'nl' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar';

export type LanguageDef = {
  code: Lang;
  flag: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
};

export const languages: LanguageDef[] = [
  { code: 'en', flag: '🇬🇧', nativeLabel: 'English', dir: 'ltr' },
  { code: 'fr', flag: '🇫🇷', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'es', flag: '🇪🇸', nativeLabel: 'Español', dir: 'ltr' },
  { code: 'it', flag: '🇮🇹', nativeLabel: 'Italiano', dir: 'ltr' },
  { code: 'de', flag: '🇩🇪', nativeLabel: 'Deutsch', dir: 'ltr' },
  { code: 'nl', flag: '🇳🇱', nativeLabel: 'Nederlands', dir: 'ltr' },
  { code: 'pt', flag: '🇵🇹', nativeLabel: 'Português', dir: 'ltr' },
  { code: 'zh', flag: '🇨🇳', nativeLabel: '中文', dir: 'ltr' },
  { code: 'ja', flag: '🇯🇵', nativeLabel: '日本語', dir: 'ltr' },
  { code: 'ko', flag: '🇰🇷', nativeLabel: '한국어', dir: 'ltr' },
  { code: 'ar', flag: '🇸🇦', nativeLabel: 'العربية', dir: 'rtl' },
];

// UI string dictionaries (nav labels, CTA, about page, etc.)
type Dict = Record<string, string>;

const en: Dict = {
  nav_home: 'Home',
  nav_destinations: 'Destinations',
  nav_tours: 'Tours',
  nav_sahara_desert_tours: 'Sahara Desert Tours',
  nav_luxury_desert_camp: 'Luxury Desert Camp',
  nav_camel_trekking: 'Camel Trekking',
  nav_4x4_desert_tours: '4x4 Desert Tours',
  nav_day_trips: 'Day Trips',
  nav_gallery: 'Gallery',
  nav_blog: 'Blog',
  nav_faq: 'FAQ',
  nav_build_journey: 'Build Your Journey',
  nav_about: 'About',
  nav_contact: 'Contact',
  nav_book_whatsapp: 'Book on WhatsApp',
  nav_open_menu: 'Open menu',
  nav_close_menu: 'Close menu',
  about_hero_title: 'About Morocco Grand Adventure',
  about_hero_subtitle: 'Crafting authentic journeys through the Kingdom of Morocco since 2010.',
  about_story_label: 'Our Story',
  diff_story_heading: 'Born from a love of the desert',
  diff_story_p1: 'Morocco Grand Adventure was founded by a family of Berber guides from Merzouga.',
  diff_story_p2: 'We blend deep local knowledge with modern comfort to create unforgettable journeys.',
  diff_roots_heading: 'Our Roots',
  diff_roots_desc: 'We are local. Every guide, driver and host in our network is Moroccan.',
  diff_passion_heading: 'Our Passion',
  diff_passion_desc: 'We share the Morocco we love — the dunes, the medinas, the mountains and the people.',
  diff_journey_heading: 'A Journey Built Around You',
  diff_different_heading: 'What Makes Us Different',
  diff_different_1_title: 'Local Experts',
  diff_different_1_desc: 'Berber guides with decades of experience.',
  diff_different_2_title: 'Small Groups',
  diff_different_2_desc: 'Maximum 8 travelers per journey.',
  diff_different_3_title: 'Fair Travel',
  diff_different_3_desc: 'We pay guides fairly and support local communities.',
  diff_guides_heading: 'Meet Your Guides',
  diff_guides_sub: 'The people who make your journey unforgettable.',
  diff_guide_1_name: 'Hassan',
  diff_guide_1_role: 'Lead Guide & Founder',
  diff_guide_1_teaser: 'Born in the dunes of Merzouga.',
  diff_guide_1_story_p1: 'Hassan grew up in Merzouga.',
  diff_guide_1_story_p2: 'He has guided travelers for 15 years.',
  diff_guide_1_story_p3: 'He is passionate about the desert.',
  diff_guide_1_story_p4: 'He will make you feel at home.',
  diff_guide_2_name: 'Youssef',
  diff_guide_2_role: 'Cultural Guide',
  diff_guide_2_teaser: 'Historian from Fes.',
  diff_guide_2_story_p1: 'Youssef is a historian from Fes.',
  diff_guide_2_story_p2: 'He knows every corner of the medina.',
  diff_guide_2_story_p3: 'He loves sharing stories.',
  diff_guide_2_story_p4: 'He is a great storyteller.',
  diff_guide_3_name: 'Fatima',
  diff_guide_3_role: 'Hospitality Lead',
  diff_guide_3_teaser: 'From the Atlas Mountains.',
  diff_guide_3_story_p1: 'Fatima is from the Atlas Mountains.',
  diff_guide_3_story_p2: 'She is a wonderful cook.',
  diff_guide_3_story_p3: 'She shares Berber traditions.',
  diff_guide_3_story_p4: 'She will welcome you warmly.',
  diff_trust_heading: 'Trusted by Travelers Worldwide',
  diff_cta_heading: 'Ready for Your Moroccan Adventure?',
  diff_cta_sub: 'Let us craft a journey you will never forget.',
  diff_cta_button: 'Start Planning',
};

// Other language dictionaries fall back to English for missing keys.
const fr: Partial<Dict> = {
  nav_home: 'Accueil',
  nav_destinations: 'Destinations',
  nav_tours: 'Circuits',
  nav_sahara_desert_tours: 'Circuits Sahara',
  nav_luxury_desert_camp: 'Camp de luxe',
  nav_camel_trekking: 'Randonnée à dos de chameau',
  nav_4x4_desert_tours: 'Circuits 4x4',
  nav_day_trips: 'Excursions d\'une journée',
  nav_gallery: 'Galerie',
  nav_blog: 'Blog',
  nav_faq: 'FAQ',
  nav_build_journey: 'Créez votre voyage',
  nav_about: 'À propos',
  nav_contact: 'Contact',
  nav_book_whatsapp: 'Réserver sur WhatsApp',
  nav_open_menu: 'Ouvrir le menu',
  nav_close_menu: 'Fermer le menu',
};

const dicts: Record<Lang, Partial<Dict>> = {
  en,
  fr,
  es: {},
  it: {},
  de: {},
  nl: {},
  pt: {},
  zh: {},
  ja: {},
  ko: {},
  ar: {},
};

/** Translate a UI string key for the given language (falls back to English). */
export function t(lang: Lang, key: string): string {
  return dicts[lang]?.[key] ?? en[key] ?? key;
}