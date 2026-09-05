// Multilingual Tours live-audit: for every supported locale, check the main
// tours hub, all four departure-city hubs, representative duration hubs and an
// individual tour page against the LIVE production site. Verifies HTTP 200,
// localized H1/title/description, canonical correctness and hreflang validity.
import { LANGS, PATHS, SITE } from './tours-audit-config.mjs';

function meta(html, urlPath) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || '';
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] || '';
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const hreflang = [...html.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi)].map(m => ({ lang: m[1], href: m[2] }));
  return { title, description, canonical, h1, hreflang };
}

const problems = [];
const untranslatedH1s = [];
const untranslatedDesc = [];
const enH1 = new Map();
const enDesc = new Map();
let checked = 0;


for (const lang of LANGS) {
  for (const path of PATHS) {
    const url = `${SITE}/${lang}${path}`;
    let html;
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
      html = await res.text();
      checked++;
      if (res.status !== 200) {
        problems.push({ url, issue: `HTTP ${res.status}` });
        continue;
      }
      const m = meta(html, path);
      if (m.h1.length === 0) problems.push({ url, issue: 'no H1' });
            if (lang === 'en') enH1.set(path, m.h1[0]);
      if (lang === 'en') enDesc.set(path, m.description);

      if (!m.canonical) problems.push({ url, issue: 'no canonical' });
      else if (!m.canonical.includes(`${SITE}/${lang}${path.replace(/\/$/, '')}`)) problems.push({ url, issue: `canonical mismatch: ${m.canonical}` });
      if (!m.title) problems.push({ url, issue: 'no title' });
      if (!m.description) problems.push({ url, issue: 'no meta description' });
      const expected = LANGS.length + 1; // all langs + x-default
      if (m.hreflang.length < expected) problems.push({ url, issue: `hreflang count ${m.hreflang.length} < ${expected}` });
      for (const h of m.hreflang) {
        if (!h.href.startsWith(SITE)) problems.push({ url, issue: `hreflang ${h.lang} off-site: ${h.href}` });
      }
      const xDefault = m.hreflang.find(h => h.lang === 'x-default');
      if (!xDefault) problems.push({ url, issue: 'no x-default hreflang' });
      // RTL: Arabic pages must render dir="rtl"
      if (lang === 'ar' && !/dir=["']rtl["']/i.test(html)) problems.push({ url, issue: 'Arabic page missing dir=rtl' });
      // Hub pages must link to individual tours (absolute or relative hrefs)
      if (/\/tours(\/from-[a-z]+(\/\d+-days)?)?\/?$/.test(path)) {
        const innerTourLinks = (html.match(new RegExp(`href="[^"]*/${lang}/tours/[a-z0-9-]+"`, 'g')) || []).length;
        if (innerTourLinks === 0) problems.push({ url, issue: 'no links to individual tours' });
      }
            // Report (do not fail) when a non-English page's H1 is still English
      if (lang !== 'en' && enH1.get(path) && m.h1[0] === enH1.get(path)) untranslatedH1s.push(`${url} — H1 still English: "${m.h1[0]}"`);
      // Report untranslated meta description (non-fatal) — compare first 40 chars to English
      if (lang !== 'en' && enDesc.get(path) && m.description.slice(0, 40) === enDesc.get(path).slice(0, 40)) untranslatedDesc.push(`${url} — description still English: "${m.description.slice(0, 80)}"`);

    } catch (e) {
      checked++;
      problems.push({ url, issue: `fetch error: ${String(e).slice(0, 120)}` });
    }
  }
}

console.log(`Checked ${checked} multilingual Tours URLs on ${SITE}`);
if (problems.length === 0) {
  console.log('ALL PASS');
} else {
  for (const p of problems) console.log(`FAIL ${p.url} — ${p.issue}`);
}
console.log(`\n--- Untranslated H1 report (${untranslatedH1s.length}) ---`);
for (const s of untranslatedH1s) console.log(s);
console.log(`\n--- Untranslated meta-description report (${untranslatedDesc.length}) ---`);
for (const s of untranslatedDesc) console.log(s);

