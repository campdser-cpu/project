import { languages, t } from '../src/i18n/index';
import { registerAllTranslations } from '../src/i18n/locales';
import { registerAllContentOverlays } from '../src/i18n/content/overlays';

registerAllTranslations();
registerAllContentOverlays();

const keys = ['nav_sahara_desert_tours', 'nav_luxury_desert_camp', 'nav_experiences', 'footer_sahara_desert_tours'];
for (const { code } of languages) {
  if (code === 'en') continue;
  console.log(code, '=>', keys.map((k) => `${k}="${t(code, k)}"`).join(' | '));
}
