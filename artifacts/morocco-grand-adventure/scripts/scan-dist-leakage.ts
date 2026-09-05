// English-leakage scan over the PRERENDERED localized HTML in dist/.
// This is the real "rendered page" test: it inspects the visible text of the
// static HTML that a tourist (or Googlebot) actually receives for each locale.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
const LOCALES = ['en', 'fr', 'es', 'it', 'de', 'nl', 'pt', 'zh', 'ja', 'ko', 'ar'];

// Tourist-facing English UI strings that must never appear on a localized page.
const LEAK_PATTERNS: { re: RegExp; label: string }[] = [
  { re: />\s*Book Now\s*</i, label: 'Book Now' },
  { re: />\s*Pay Later\s*</i, label: 'Pay Later' },
  { re: />\s*Learn More\s*</i, label: 'Learn More' },
  { re: />\s*Read More\s*</i, label: 'Read More' },
  { re: />\s*Explore Tours\s*</i, label: 'Explore Tours' },
  { re: />\s*Discover the Soul of Morocco\s*</i, label: 'hero heading' },
  { re: />\s*About Us\s*</i, label: 'About Us' },
  { re: />\s*Contact Us\s*</i, label: 'Contact Us' },
  { re: />\s*View All Destinations\s*/i, label: 'View All Destinations' },
  { re: />\s*Featured Tours\s*</i, label: 'Featured Tours' },
  { re: />\s*Top Destinations\s*</i, label: 'Top Destinations' },
  { re: />\s*Build Your Journey\s*</i, label: 'Build Your Journey' },
  { re: />\s*Book via WhatsApp\s*</i, label: 'Book via WhatsApp' },
  { re: />\s*Our Roots\s*</i, label: 'About: Our Roots' },
  { re: />\s*Our Promise\s*</i, label: 'About: Our Promise' },
  { re: />\s*Traveler Stories\s*</i, label: 'Traveler Stories' },
  { re: />\s*Loading\.\.\.\s*</i, label: 'Loading...' },
  // every-page chrome: nav dropdown, sticky booking bar, footer, skip link
  { re: />\s*Experiences\s*</i, label: 'nav: Experiences' },
  { re: />\s*Sahara Desert Tours\s*</i, label: 'nav/footer: Sahara Desert Tours' },
  { re: />\s*Luxury Desert Camp\s*</i, label: 'nav/footer: Luxury Desert Camp' },
  { re: />\s*Camel Trekking\s*</i, label: 'nav/footer: Camel Trekking' },
  { re: />\s*4x4 Desert Tours\s*</i, label: 'nav: 4x4 Desert Tours' },
  { re: />\s*Day Trips\s*</i, label: 'nav: Day Trips' },
  { re: />\s*Travel Blog\s*</i, label: 'nav/footer: Travel Blog' },
  { re: />\s*Custom Trip\s*</i, label: 'sticky: Custom Trip' },
  { re: />\s*Call Now\s*</i, label: 'sticky: Call Now' },
  { re: />\s*Merzouga Guide\s*</i, label: 'footer: Merzouga Guide' },
  { re: />\s*Merzouga, Sahara Desert, Morocco\s*</i, label: 'footer/contact address' },
  { re: />\s*Skip to content\s*</i, label: 'skip link' },
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = ['/', '/tours/', '/about/', '/gallery/', '/faq/', '/destinations/', '/contact/'];
const summary: Record<string, string[]> = {};
for (const locale of LOCALES) {
  if (locale === 'en') continue;
  const hits: string[] = [];
  const metaHits: string[] = [];
  const base = join(DIST, locale);
  if (!existsSync(base)) { summary[locale] = ['<no prerendered dir>']; continue; }
  const all = walk(base);
  const targets = all.filter((f) => pages.some((p) => f.replace(/\\/g, '/').includes(`/${locale}${p === '/' ? '/' : p}`)));
  const scoped = targets.length ? targets : all;
  for (const file of scoped) {
    const html = readFileSync(file, 'utf8');
    // Only the <body> is "visible content" — head metadata (title/description)
    // is audited separately by the SEO checks.
    const bodyMatch = html.match(/<body[\s\S]*<\/body>/i);
    const visible = (bodyMatch ? bodyMatch[0] : html)
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '');
    for (const { re, label } of LEAK_PATTERNS) {
      if (re.test(visible)) hits.push(`${file.replace(base, '')} :: ${label}`);
    }
    // English <title> metadata (separate concern from visible content)
    const t = html.match(/<title>([^<]*)<\/title>/i);
    if (t && /Sahara Desert Tours|Morocco Tours|Travel Guide|Desert Tours/.test(t[1]) && !/<html[^>]*lang="en"/.test(html)) {
      metaHits.push(`${file.replace(base, '')} :: <title>${t[1]}</title>`);
    }
  }
  summary[locale] = hits;
  console.log(`${locale}: scanned ${scoped.length} prerendered pages | visible-body leakage: ${hits.length}${hits.length ? '  e.g. ' + hits.slice(0, 3).join(' | ') : ''} | English <title> metadata: ${metaHits.length}${metaHits.length ? '  e.g. ' + metaHits.slice(0, 2).join(' | ') : ''}`);
}
