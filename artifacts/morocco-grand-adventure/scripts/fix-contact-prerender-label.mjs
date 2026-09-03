import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(new URL('../dist', import.meta.url).pathname);
const labels = {
  en: 'Official Social Profiles',
  fr: 'Profils sociaux officiels',
  es: 'Perfiles sociales oficiales',
  it: 'Profili social ufficiali',
  de: 'Offizielle soziale Profile',
  nl: 'Officiële sociale profielen',
  pt: 'Perfis sociais oficiais',
  zh: '官方社交资料',
  ja: '公式ソーシャルプロフィール',
  ko: '공식 소셜 프로필',
  ar: 'الملفات الاجتماعية الرسمية',
};

for (const [lang, label] of Object.entries(labels)) {
  const file = path.join(dist, lang, 'contact', 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const fixed = html.replace(/<h2>contact_socials_label<\/h2>/g, `<h2>${label}</h2>`);
  if (fixed !== html) fs.writeFileSync(file, fixed);
}
