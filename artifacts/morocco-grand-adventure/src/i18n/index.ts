// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Professional i18n Translations
// Languages: en, fr, es, it, de, ar, nl, pt, zh, ja, ko
// ─────────────────────────────────────────────────────────────────────────────

import { i18nGaps } from './gaps';

export type Lang = "en" | "fr" | "es" | "it" | "de" | "ar" | "nl" | "pt" | "zh" | "ja" | "ko";

export const languages: { code: Lang; label: string; nativeLabel: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English",    nativeLabel: "English",    flag: "🇬🇧", dir: "ltr" },
  { code: "fr", label: "French",     nativeLabel: "Français",   flag: "🇫🇷", dir: "ltr" },
  { code: "es", label: "Spanish",    nativeLabel: "Español",    flag: "🇪🇸", dir: "ltr" },
  { code: "it", label: "Italian",    nativeLabel: "Italiano",   flag: "🇮🇹", dir: "ltr" },
  { code: "de", label: "German",     nativeLabel: "Deutsch",    flag: "🇩🇪", dir: "ltr" },
  { code: "nl", label: "Dutch",      nativeLabel: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português",  flag: "🇵🇹", dir: "ltr" },
  { code: "zh", label: "Chinese",    nativeLabel: "中文",        flag: "🇨🇳", dir: "ltr" },
  { code: "ja", label: "Japanese",   nativeLabel: "日本語",       flag: "🇯🇵", dir: "ltr" },
  { code: "ko", label: "Korean",     nativeLabel: "한국어",       flag: "🇰🇷", dir: "ltr" },
  { code: "ar", label: "Arabic",     nativeLabel: "العربية",    flag: "🇸🇦", dir: "rtl" },
];

export type TranslationSet = {
  // ── 2026 limited-time promotion ──
  promo_badge: string;
  promo_save10: string;
  promo_headline: string;
  promo_book_before: string;
  promo_cta: string;
  promo_wa_message: string;
  promo_fineprint: string;
  promo_ends_in: string;
  promo_days: string;
  promo_hours: string;
  promo_minutes: string;
  promo_seconds: string;
  // ── Navigation ────────────────────────────────────────────────────────────
  nav_home: string;
  nav_destinations: string;
  nav_tours: string;
  nav_gallery: string;
  nav_build_journey: string;
  nav_about: string;
  nav_contact: string;
  nav_book_whatsapp: string;
  nav_all_destinations: string;
  nav_open_menu: string;
  nav_close_menu: string;
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero_tagline: string;
  hero_heading1: string;
  hero_heading2: string;
  hero_subtext: string;
  hero_cta_tours: string;
  hero_cta_plan: string;
  hero_scroll: string;
  // ── Search bar ────────────────────────────────────────────────────────────
  search_starting_point: string;
  search_any_city: string;
  search_duration: string;
  search_any_duration: string;
  search_style: string;
  search_any_style: string;
  search_find_tour: string;
  // ── Trust / Awards ────────────────────────────────────────────────────────
  trust_travelers: string;
  trust_expertise: string;
  trust_specialists: string;
  trust_licensed: string;
  trust_eco: string;
  award_best_operator: string;
  award_tripadvisor: string;
  award_trusted: string;
  award_licensed: string;
  award_eco: string;
  // ── Home sections ─────────────────────────────────────────────────────────
  section_destinations: string;
  section_destinations_sub: string;
  section_tours: string;
  section_tours_sub: string;
  section_map: string;
  section_map_sub: string;
  section_reviews: string;
  section_reviews_sub: string;
  section_luxury_camp: string;
  section_luxury_camp_sub: string;
  section_planner: string;
  section_planner_sub: string;
  section_planner_cta: string;
  section_instagram: string;
  section_why_us: string;
  section_why_sub: string;
  // ── General actions ───────────────────────────────────────────────────────
  view_all: string;
  view_all_destinations: string;
  explore_tours: string;
  learn_more: string;
  contact_us: string;
  book_now: string;
  book_experience: string;
  read_more: string;
  back: string;
  next: string;
  explore: string;
  // ── Booking panel ─────────────────────────────────────────────────────────
  book_from: string;
  book_per_person: string;
  book_select_date: string;
  book_travelers: string;
  book_total: string;
  book_whatsapp: string;
  book_customize: string;
  book_paypal: string;
  book_group_quote: string;
  book_free_cancel: string;
  book_no_fees: string;
  book_secure_payment: string;
  // ── Tour page ─────────────────────────────────────────────────────────────
  tours_heading: string;
  tours_sub: string;
  tours_view: string;
  tour_day: string;
  tour_itinerary: string;
  tour_included: string;
  tour_not_included: string;
  tour_gallery: string;
  tour_reviews: string;
  tour_related: string;
  tour_private: string;
  tour_why_love: string;
  // ── Destination page ──────────────────────────────────────────────────────
  dest_discover: string;
  dest_find: string;
  dest_explore: string;
  dest_about: string;
  dest_best_time: string;
  dest_local_food: string;
  dest_culinary: string;
  dest_luxury_stays: string;
  dest_travel_info: string;
  dest_climate: string;
  dest_view_map: string;
  dest_plan_visit: string;
  dest_start_planning: string;
  dest_nearby: string;
  dest_tours: string;
  dest_campfire: string;
  dest_campfire_sub: string;
  dest_riad_name: string;
  dest_riad_sub: string;
  dest_riad_price: string;
  // ── About page ────────────────────────────────────────────────────────────
  about_heading: string;
  about_sub: string;
  about_story: string;
  about_story_sub: string;
  about_philosophy: string;
  about_local: string;
  about_local_desc: string;
  about_quality: string;
  about_quality_desc: string;
  about_sustainable: string;
  about_sustainable_desc: string;
  about_meet_team: string;
  // ── Contact page ──────────────────────────────────────────────────────────
  contact_heading: string;
  contact_sub: string;
  contact_fastest: string;
  contact_office: string;
  contact_send: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  contact_phone: string;
  contact_message: string;
  contact_send_btn: string;
  contact_sent: string;
  // ── Trip Builder ──────────────────────────────────────────────────────────
  tb_badge: string;
  tb_heading: string;
  tb_sub: string;
  tb_basics: string;
  tb_interests: string;
  tb_places: string;
  tb_itinerary_label: string;
  tb_basics_heading: string;
  tb_basics_sub: string;
  tb_arrival: string;
  tb_departure: string;
  tb_duration_label: string;
  tb_travelers: string;
  tb_budget: string;
  tb_budget_budget: string;
  tb_budget_comfort: string;
  tb_budget_luxury: string;
  tb_budget_ultra: string;
  tb_interests_heading: string;
  tb_interests_sub: string;
  tb_selected: string;
  tb_places_heading: string;
  tb_places_sub: string;
  tb_next_interests: string;
  tb_next_destinations: string;
  tb_generate: string;
  tb_itinerary_heading: string;
  tb_itinerary_sub: string;
  tb_summary_days: string;
  tb_summary_destinations: string;
  tb_summary_travelers: string;
  tb_summary_driving: string;
  tb_request: string;
  tb_deposit: string;
  tb_quote_note: string;
  tb_edit: string;
  // ── Footer ────────────────────────────────────────────────────────────────
  footer_tagline: string;
  footer_quick_links: string;
  footer_top_destinations: string;
  footer_contact: string;
  footer_rights: string;
  footer_whatsapp: string;
  // ── AI Assistant ──────────────────────────────────────────────────────────
  ai_title: string;
  ai_subtitle: string;
  ai_open: string;
  ai_send: string;
  ai_online: string;
  ai_placeholder: string;
  ai_quick_plan: string;
  ai_quick_sahara: string;
  ai_quick_honeymoon: string;
  ai_quick_family: string;
  ai_greeting: string;
  // ── Error page ────────────────────────────────────────────────────────────
  error_not_found: string;
  error_not_found_sub: string;
  error_go_home: string;
  // ── Units ─────────────────────────────────────────────────────────────────
  days: string;
  nights: string;
  from: string;
  person: string;
  persons: string;
  group_6_plus: string;
  km_drive: string;
  // ── Home content ──────────────────────────────────────────────────────────
  home_welcome_heading: string;
  home_welcome_text: string;
  why_local_experts: string;
  why_private_tours: string;
  why_multilingual: string;
  why_luxury_riads: string;
  why_pricing: string;
  why_support: string;
  search_style_desert: string;
  search_style_imperial: string;
  search_style_mountains: string;
  search_style_coastal: string;
  // ── Tour inclusions/exclusions ────────────────────────────────────────────
  tour_inc_vehicle: string;
  tour_inc_guide: string;
  tour_inc_riads: string;
  tour_inc_desert_camp: string;
  tour_inc_camel: string;
  tour_inc_meals: string;
  tour_exc_flights: string;
  tour_exc_lunches: string;
  tour_exc_entrance: string;
  tour_exc_tips: string;
  tour_exc_insurance: string;
  tour_sample_day1_title: string;
  tour_sample_day1_desc: string;
  tour_sample_day2_title: string;
  tour_sample_day2_desc: string;
  tour_sample_day3_title: string;
  tour_sample_day3_desc: string;
  // ── Contact ───────────────────────────────────────────────────────────────
  contact_whatsapp_label: string;
  contact_email_label: string;
  contact_address: string;
  contact_ph_firstname: string;
  contact_ph_lastname: string;
  contact_ph_email: string;
  contact_ph_phone: string;
  contact_ph_message: string;
  // ── Destination detail content ────────────────────────────────────────────
  dest_about_text: string;
  dest_food_tagine: string;
  dest_food_tagine_desc: string;
  dest_food_mint_tea: string;
  dest_food_mint_tea_desc: string;
  dest_merzouga_caption: string;
  dest_riad_alt: string;
  // ── Trip builder interests / budget ───────────────────────────────────────
  tb_interest_sahara: string;
  tb_interest_camel: string;
  tb_interest_imperial: string;
  tb_interest_atlas: string;
  tb_interest_surf: string;
  tb_interest_photo: string;
  tb_interest_food: string;
  tb_interest_romance: string;
  tb_interest_family: string;
  tb_interest_culture: string;
  tb_interest_yoga: string;
  tb_interest_nature: string;
  tb_interest_music: string;
  tb_budget_budget_desc: string;
  tb_budget_comfort_desc: string;
  tb_budget_luxury_desc: string;
  tb_budget_ultra_desc: string;
  tb_itinerary_arrival: string;
  tb_itinerary_journey: string;
  tb_itinerary_exploring: string;
  tb_itinerary_departure: string;
  tb_error_min_dest: string;
  tb_error_min_dest_sub: string;
  // ── About ─────────────────────────────────────────────────────────────────
  about_story_p1: string;
  about_story_p2: string;
  about_philosophy_quote: string;
  // ── Tours listing ─────────────────────────────────────────────────────────
  tours_experience: string;
  tours_and_more: string;
  // ── AI responses ──────────────────────────────────────────────────────────
  ai_resp_7day: string;
  ai_resp_sahara_time: string;
  ai_resp_honeymoon: string;
  ai_resp_family: string;
  ai_resp_default: string;
  per_night: string;
  // ── ExperiencePage ────────────────────────────────────────────────────────
  exp_book_experience: string;
  exp_whatsapp_us: string;
  exp_highlights: string;
  exp_highlights_title: string;
  exp_faq: string;
  exp_faq_title: string;
  exp_ready: string;
  exp_ready_sub: string;
  exp_build_journey: string;
  exp_chat_whatsapp: string;
  exp_rating: string;
  exp_travelers: string;
  exp_licensed: string;
  exp_support: string;
  exp_local_experts: string;
  // ── Navbar ────────────────────────────────────────────────────────────────
  nav_experiences: string;
  nav_sahara_desert_tours: string;
  nav_luxury_desert_camp: string;
  nav_camel_trekking: string;
  nav_4x4_desert_tours: string;
  nav_day_trips: string;
  nav_travel_blog: string;
  nav_blog: string;
  nav_faq: string;
  // ── Footer ────────────────────────────────────────────────────────────────
  footer_sahara_desert_tours: string;
  footer_luxury_desert_camp: string;
  footer_camel_trekking: string;
  footer_merzouga_guide: string;
  footer_travel_blog: string;
  footer_faq: string;
  footer_address: string;
  // ── Sticky CTA / WhatsApp / Layout / App ──────────────────────────────────
  sticky_custom_trip: string;
  sticky_whatsapp: string;
  sticky_call_now: string;
  wa_book_now: string;
  layout_skip_content: string;
  app_loading: string;
  // ── FAQ page ──────────────────────────────────────────────────────────────
  faq_hero_alt: string;
  faq_breadcrumb: string;
  faq_title: string;
  faq_subtitle: string;
  faq_cta: string;
  faq_q1: string; faq_a1: string;
  faq_q2: string; faq_a2: string;
  faq_q3: string; faq_a3: string;
  faq_q4: string; faq_a4: string;
  faq_q5: string; faq_a5: string;
  faq_q6: string; faq_a6: string;
  faq_q7: string; faq_a7: string;
  faq_q8: string; faq_a8: string;
  faq_q9: string; faq_a9: string;
  faq_q10: string; faq_a10: string;
  // ── Blog page ─────────────────────────────────────────────────────────────
  blog_hero_alt: string;
  blog_breadcrumb: string;
  blog_title: string;
  blog_subtitle: string;
  blog_read_article: string;
  blog_category: string;
  read_time: string;
  related_articles: string;
  related_tours: string;
  related_tours_hint: string;
  related_destinations: string;
  related_destinations_hint: string;
  blog_post_1_title: string; blog_post_1_excerpt: string; blog_post_1_date: string; blog_post_1_read: string; blog_post_1_cat: string;
  blog_post_2_title: string; blog_post_2_excerpt: string; blog_post_2_date: string; blog_post_2_read: string; blog_post_2_cat: string;
  blog_post_3_title: string; blog_post_3_excerpt: string; blog_post_3_date: string; blog_post_3_read: string; blog_post_3_cat: string;
  blog_post_4_title: string; blog_post_4_excerpt: string; blog_post_4_date: string; blog_post_4_read: string; blog_post_4_cat: string;
  blog_post_5_title: string; blog_post_5_excerpt: string; blog_post_5_date: string; blog_post_5_read: string; blog_post_5_cat: string;
  blog_post_6_title: string; blog_post_6_excerpt: string; blog_post_6_date: string; blog_post_6_read: string; blog_post_6_cat: string;
  // ── Luxury Camp page ──────────────────────────────────────────────────────
  lc_hero_alt: string; lc_breadcrumb: string; lc_title: string; lc_subtitle: string;
  lc_f1_title: string; lc_f1_desc: string;
  lc_f2_title: string; lc_f2_desc: string;
  lc_f3_title: string; lc_f3_desc: string;
  lc_f4_title: string; lc_f4_desc: string;
  lc_f5_title: string; lc_f5_desc: string;
  lc_f6_title: string; lc_f6_desc: string;
  lc_faq1_q: string; lc_faq1_a: string;
  lc_faq2_q: string; lc_faq2_a: string;
  lc_faq3_q: string; lc_faq3_a: string;
  lc_faq4_q: string; lc_faq4_a: string;
  // ── Camel Trekking page ───────────────────────────────────────────────────
  ct_hero_alt: string; ct_breadcrumb: string; ct_title: string; ct_subtitle: string; ct_cta: string;
  ct_f1_title: string; ct_f1_desc: string;
  ct_f2_title: string; ct_f2_desc: string;
  ct_f3_title: string; ct_f3_desc: string;
  ct_f4_title: string; ct_f4_desc: string;
  ct_f5_title: string; ct_f5_desc: string;
  ct_f6_title: string; ct_f6_desc: string;
  ct_faq1_q: string; ct_faq1_a: string;
  ct_faq2_q: string; ct_faq2_a: string;
  ct_faq3_q: string; ct_faq3_a: string;
  ct_faq4_q: string; ct_faq4_a: string;
  ct_faq5_q: string; ct_faq5_a: string;
  // ── 4x4 Tours page ────────────────────────────────────────────────────────
  f4_hero_alt: string; f4_breadcrumb: string; f4_title: string; f4_subtitle: string; f4_cta: string;
  f4_f1_title: string; f4_f1_desc: string;
  f4_f2_title: string; f4_f2_desc: string;
  f4_f3_title: string; f4_f3_desc: string;
  f4_f4_title: string; f4_f4_desc: string;
  f4_f5_title: string; f4_f5_desc: string;
  f4_f6_title: string; f4_f6_desc: string;
  f4_faq1_q: string; f4_faq1_a: string;
  f4_faq2_q: string; f4_faq2_a: string;
  f4_faq3_q: string; f4_faq3_a: string;
  f4_faq4_q: string; f4_faq4_a: string;
  f4_faq5_q: string; f4_faq5_a: string;
  // ── Fes/Marrakech Tours page ──────────────────────────────────────────────
  mt_hero_alt: string; mt_breadcrumb: string; mt_title: string; mt_subtitle: string; mt_cta: string;
  mt_f1_title: string; mt_f1_desc: string;
  mt_f2_title: string; mt_f2_desc: string;
  mt_f3_title: string; mt_f3_desc: string;
  mt_f4_title: string; mt_f4_desc: string;
  mt_f5_title: string; mt_f5_desc: string;
  mt_f6_title: string; mt_f6_desc: string;
  mt_faq1_q: string; mt_faq1_a: string;
  mt_faq2_q: string; mt_faq2_a: string;
  mt_faq3_q: string; mt_faq3_a: string;
  mt_faq4_q: string; mt_faq4_a: string;
  // ── Marrakech Tours page ────────────────────────────────────────────────────
  mk_hero_alt: string; mk_breadcrumb: string; mk_title: string; mk_subtitle: string; mk_cta: string;
  mk_f1_title: string; mk_f1_desc: string;
  mk_f2_title: string; mk_f2_desc: string;
  mk_f3_title: string; mk_f3_desc: string;
  mk_f4_title: string; mk_f4_desc: string;
  mk_f5_title: string; mk_f5_desc: string;
  mk_f6_title: string; mk_f6_desc: string;
  mk_faq1_q: string; mk_faq1_a: string;
  mk_faq2_q: string; mk_faq2_a: string;
  mk_faq3_q: string; mk_faq3_a: string;
  mk_faq4_q: string; mk_faq4_a: string;
  // ── Day Trips page ────────────────────────────────────────────────────────
  dt_hero_alt: string; dt_breadcrumb: string; dt_title: string; dt_subtitle: string; dt_cta: string;
  dt_f1_title: string; dt_f1_desc: string;
  dt_f2_title: string; dt_f2_desc: string;
  dt_f3_title: string; dt_f3_desc: string;
  dt_f4_title: string; dt_f4_desc: string;
  dt_f5_title: string; dt_f5_desc: string;
  dt_f6_title: string; dt_f6_desc: string;
  dt_faq1_q: string; dt_faq1_a: string;
  dt_faq2_q: string; dt_faq2_a: string;
  dt_faq3_q: string; dt_faq3_a: string;
  dt_faq4_q: string; dt_faq4_a: string;
  // ── Merzouga Guide page ───────────────────────────────────────────────────
  mg_hero_alt: string; mg_breadcrumb: string; mg_title: string; mg_subtitle: string; mg_cta: string;
  mg_f1_title: string; mg_f1_desc: string;
  mg_f2_title: string; mg_f2_desc: string;
  mg_f3_title: string; mg_f3_desc: string;
  mg_f4_title: string; mg_f4_desc: string;
  mg_f5_title: string; mg_f5_desc: string;
  mg_f6_title: string; mg_f6_desc: string;
  mg_faq1_q: string; mg_faq1_a: string;
  mg_faq2_q: string; mg_faq2_a: string;
  mg_faq3_q: string; mg_faq3_a: string;
  mg_faq4_q: string; mg_faq4_a: string;
  // ── Desert Tours page ─────────────────────────────────────────────────────
  dt2_hero_alt: string; dt2_title: string; dt2_subtitle: string; dt2_cta_explore: string; dt2_whatsapp: string;
  dt2_intro_heading: string; dt2_intro_p1: string; dt2_intro_p2: string;
  dt2_featured: string; dt2_featured_title: string; dt2_view_details: string; dt2_view_all: string;
  dt2_why_title: string;
  dt2_why1_title: string; dt2_why1_desc: string;
  dt2_why2_title: string; dt2_why2_desc: string;
  dt2_why3_title: string; dt2_why3_desc: string;
  dt2_ready: string; dt2_ready_sub: string; dt2_build: string; dt2_chat: string;
  // ── Home page ─────────────────────────────────────────────────────────────
  home_signature: string; home_signature_title: string; home_signature_sub: string; home_morocco_badge: string;
  home_place1_name: string; home_place1_desc: string;
  home_place2_name: string; home_place2_desc: string;
  home_place3_name: string; home_place3_desc: string;
  home_place4_name: string; home_place4_desc: string;
  home_place5_name: string; home_place5_desc: string;
  home_place6_name: string; home_place6_desc: string;
  home_exp_sahara: string; home_exp_title: string; home_exp_sub: string;
  home_rev1_name: string; home_rev1_quote: string; home_rev1_tour: string;
  home_rev2_name: string; home_rev2_quote: string; home_rev2_tour: string;
  home_rev3_name: string; home_rev3_quote: string; home_rev3_tour: string;
  home_rev4_name: string; home_rev4_quote: string; home_rev4_tour: string;
  home_rev5_name: string; home_rev5_quote: string; home_rev5_tour: string;
  home_rev6_name: string; home_rev6_quote: string; home_rev6_tour: string;
  home_ig_alt1: string; home_ig_alt2: string; home_ig_alt3: string; home_ig_alt4: string;
  // ── About page ────────────────────────────────────────────────────────────
  about_meet_guide: string; about_guide_heading: string; about_guide_p1: string; about_guide_p2: string;
  about_founder: string; about_guide_name: string;
  about_stat1_value: string; about_stat1_label: string;
  about_stat2_value: string; about_stat2_label: string;
  about_stat3_value: string; about_stat3_label: string;
  about_stat4_value: string; about_stat4_label: string;
  about_languages: string; about_chat: string;
  about_experiences: string; about_memories: string; about_memories_sub: string;
  about_moment1: string; about_moment2: string; about_moment3: string;
  about_moment4: string; about_moment5: string; about_moment6: string;
  about_hero_alt: string; about_guide_alt: string;
  // ── Gallery page ──────────────────────────────────────────────────────────
  gallery_hero_alt: string; gallery_close: string; gallery_prev: string; gallery_next: string; gallery_all: string;
  gallery_cat_desert: string; gallery_cat_luxury_camp: string; gallery_cat_camel_trekking: string;
  gallery_cat_quad: string; gallery_cat_happy_travelers: string; gallery_cat_landscapes: string;
  gallery_cat_culture: string; gallery_cat_food: string; gallery_cat_guide_journey: string; gallery_cat_authenticity: string;
  gallery_cap1: string; gallery_cap2: string; gallery_cap3: string; gallery_cap4: string;
  gallery_cap5: string; gallery_cap6: string; gallery_cap7: string; gallery_cap8: string;
  gallery_cap9: string; gallery_cap10: string; gallery_cap11: string; gallery_cap12: string;
  gallery_cap13: string; gallery_cap14: string; gallery_cap15: string; gallery_cap16: string;
  gallery_cap17: string; gallery_cap18: string; gallery_cap19: string; gallery_cap20: string;
  gallery_cap21: string; gallery_cap22: string; gallery_cap23: string; gallery_cap24: string;
  gallery_cap25: string; gallery_cap26: string; gallery_cap27: string; gallery_cap28: string;
  gallery_cap29: string; gallery_cap30: string; gallery_cap31: string; gallery_cap32: string;
  gallery_cap33: string; gallery_cap34: string; gallery_cap35: string; gallery_cap36: string;
  gallery_cap37: string; gallery_cap38: string; gallery_cap39: string; gallery_cap40: string;
  gallery_cap41: string; gallery_cap42: string; gallery_cap43: string; gallery_cap44: string;
  gallery_cap45: string; gallery_cap46: string; gallery_cap47: string; gallery_cap48: string;
  gallery_cap49: string; gallery_cap50: string; gallery_cap51: string; gallery_cap52: string;
  gallery_cap53: string; gallery_cap54: string; gallery_cap55: string; gallery_cap56: string;
  gallery_cap57: string; gallery_cap58: string; gallery_cap59: string; gallery_cap60: string;
  gallery_cap61: string; gallery_cap62: string; gallery_cap63: string; gallery_cap64: string;
  gallery_cap65: string; gallery_cap66: string; gallery_cap67: string; gallery_cap68: string;
  gallery_cap69: string; gallery_cap70: string; gallery_cap71: string; gallery_cap72: string;
  gallery_cap73: string; gallery_cap74: string; gallery_cap75: string; gallery_cap76: string;
  gallery_cap77: string; gallery_cap78: string; gallery_cap79: string; gallery_cap80: string;
  gallery_cap81: string; gallery_cap82: string; gallery_cap83: string; gallery_cap84: string;
  gallery_cap85: string; gallery_cap86: string; gallery_cap87: string; gallery_cap88: string;
  gallery_cap89: string; gallery_cap90: string; gallery_cap91: string; gallery_cap92: string;
  gallery_cap93: string; gallery_cap94: string; gallery_cap95: string; gallery_cap96: string;
  gallery_cap97: string; gallery_cap98: string; gallery_cap99: string; gallery_cap100: string;
  gallery_vid1_title: string; gallery_vid2_title: string; gallery_vid3_title: string; gallery_vid4_title: string;
  // ── Tour Detail page ──────────────────────────────────────────────────────
  td_watch_journey: string; td_cinematic: string; td_overview: string; td_your_route: string;
  td_route_caption: string; td_faq_title: string; td_google_reviews: string; td_loved: string;
  td_or: string; td_decrease: string; td_increase: string;
  td_rev1_name: string; td_rev1_country: string; td_rev1_text: string;
  td_rev2_name: string; td_rev2_country: string; td_rev2_text: string;
  td_rev3_name: string; td_rev3_country: string; td_rev3_text: string;
  td_rev4_name: string; td_rev4_country: string; td_rev4_text: string;
  td_group_quote_msg: string;
  // ── Destination Detail page ───────────────────────────────────────────────
  dd_style: string; dd_sunny: string; dd_mon: string; dd_tue: string; dd_wed: string; dd_thu: string;
  dd_dunes_day_night: string; dd_dunes_sub: string; dd_sunrise: string; dd_stargazing: string;
  dd_plan_sub: string;
  // ── Tours page ────────────────────────────────────────────────────────────
  tours_matching: string; tours_clear: string; tours_no_match: string; tours_view_all: string;
  tours_tour: string; tours_tours: string;
  // ── Trip Builder ──────────────────────────────────────────────────────────
  tb_city_casablanca: string; tb_city_marrakech: string; tb_city_tangier: string; tb_city_fes: string; tb_city_agadir: string;
  tb_travel_to: string; tb_discover: string; tb_onward: string;
  // ── Premium About page ────────────────────────────────────────────────────
  about_hero_title: string; about_hero_subtitle: string; about_story_label: string;
  diff_story_heading: string; diff_story_p1: string; diff_story_p2: string;
  diff_roots_heading: string; diff_roots_desc: string;
  diff_passion_heading: string; diff_passion_desc: string;
  diff_journey_heading: string;
  diff_timeline_1_year: string; diff_timeline_1_text: string;
  diff_timeline_2_year: string; diff_timeline_2_text: string;
  diff_timeline_3_year: string; diff_timeline_3_text: string;
  diff_timeline_4_year: string; diff_timeline_4_text: string;
  diff_timeline_5_year: string; diff_timeline_5_text: string;
  diff_different_heading: string;
  diff_different_1_title: string; diff_different_1_desc: string;
  diff_different_2_title: string; diff_different_2_desc: string;
  diff_different_3_title: string; diff_different_3_desc: string;
  diff_guides_heading: string; diff_guides_sub: string;
  diff_guide_1_name: string; diff_guide_1_role: string; diff_guide_1_teaser: string;
  diff_guide_1_story_p1: string; diff_guide_1_story_p2: string; diff_guide_1_story_p3: string; diff_guide_1_story_p4: string;
  diff_guide_2_name: string; diff_guide_2_role: string; diff_guide_2_teaser: string;
  diff_guide_2_story_p1: string; diff_guide_2_story_p2: string; diff_guide_2_story_p3: string; diff_guide_2_story_p4: string;
  diff_guide_3_name: string; diff_guide_3_role: string; diff_guide_3_teaser: string;
  diff_guide_3_story_p1: string; diff_guide_3_story_p2: string; diff_guide_3_story_p3: string; diff_guide_3_story_p4: string;
  diff_trust_heading: string;
  diff_trust_1_heading: string; diff_trust_1_text: string;
  diff_trust_2_heading: string; diff_trust_2_text: string;
  diff_trust_3_heading: string; diff_trust_3_text: string;
  diff_trust_4_heading: string; diff_trust_4_text: string;
  diff_cta_heading: string; diff_cta_sub: string; diff_cta_button: string;
  // ── About / Map UI (previously hard-coded) ─────────────────────────────────
  about_scroll_hint: string; about_roots_heading: string; about_roots_text: string;
  about_promise_heading: string; about_promise_text: string; about_cta_sub: string;
  map_directions: string;
};
// ─────────────────────────────────────────────────────────────────────────────
// Locale registry + lazy loader (locale-based code splitting)
// -----------------------------------------------------------------------------
// The per-language UI dictionaries previously lived inline here (all 11 locales
// in one module), so every locale shipped the entire multilingual payload. The
// heavy data now lives in `./locales/*.ts`, one module per locale. English is
// the base dictionary and is bundled eagerly; every other locale is split into
// its own chunk and `loadLocale(lang)` fetches only the active locale on demand.
//
// `t()` reads from an in-memory registry. The registry is populated before the
// app first renders (see main.tsx bootstrap) and before any language switch
// commits (see contexts/LanguageContext.tsx), so there is never an unwrapped
// or English-only flash. Build-time tooling (prerender, audits) populates every
// locale via `locales/index.ts` → `registerAllTranslations()`.
//
// This keeps prerendering / static HTML generation intact: prerender runs in
// Node and imports the aggregate, while Vite splits the runtime dynamic imports
// into per-locale chunks that are fetched only when needed.
// ─────────────────────────────────────────────────────────────────────────────

type TranslationDict = Partial<TranslationSet>;

const registry: Partial<Record<Lang, TranslationDict>> = {};



export function isLocaleLoaded(lang: Lang): boolean {
  return lang === 'en' || Boolean(registry[lang]);
}

/**
 * Load (and register) a single locale's UI translations.
 * English is always available; the remaining locales are code-split chunks that
 * are fetched on demand (direct URL access, language switching, browser refresh).
 */
export async function loadLocale(lang: Lang): Promise<void> {
  if (registry[lang]) return;
  const loader = LOADERS[lang];
  if (!loader) return;
  const mod = await loader();
  registerTranslations(lang, mod.default);
}

/**
 * Static import map for English (bundled base) + dynamic import loaders for the
 * other locales. Vite/Rollup splits each dynamic import into its own chunk, so
 * the initial bundle never contains non-active language data.
 */
import enDict from './locales/en';

registry.en = enDict;

const LOADERS: Record<Lang, () => Promise<{ default: TranslationDict }>> = {
  en: () => import('./locales/en'),
  fr: () => import('./locales/fr'),
  es: () => import('./locales/es'),
  it: () => import('./locales/it'),
  de: () => import('./locales/de'),
  nl: () => import('./locales/nl'),
  pt: () => import('./locales/pt'),
  zh: () => import('./locales/zh'),
  ja: () => import('./locales/ja'),
  ko: () => import('./locales/ko'),
  ar: () => import('./locales/ar'),
};

/**
 * Translate a key for a locale. Falls back to English, then to the key itself
 * if a translation is genuinely absent — the same behaviour as before splitting.
 */
export function t(lang: Lang, key: string): string {
  return (
    registry[lang]?.[key as keyof TranslationDict] ??
    registry.en?.[key as keyof TranslationDict] ??
    key
  );
}

/**
 * Merge a locale's gap-completion keys (see ./gaps) into its registry entry.
 * English is the canonical source and has no gaps.
 */
function applyGaps(lang: Lang, data: TranslationDict): TranslationDict {
  const gaps = i18nGaps[lang];
  if (!gaps) return data;
  return { ...gaps, ...data };
}

/** Register a locale's dictionary (used by the lazy loader and build tooling). */
export function registerTranslations(lang: Lang, data: TranslationDict): void {
  registry[lang] = applyGaps(lang, data);
}
