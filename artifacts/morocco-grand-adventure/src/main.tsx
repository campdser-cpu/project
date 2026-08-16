import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

import { parseLangPath, preferredLang } from './lib/i18n-routing';
import { loadLocale } from './i18n';
import { loadContent } from './i18n/content';

// Locale-based code splitting bootstrap: resolve the active language from the
// URL (falling back to the visitor's preferred language), load ONLY that
// locale's UI translations + content overlay, then render. The prerendered
// HTML stays visible while these lightweight locale chunks load, so there is
// never a blank screen or an untranslated English flash.
async function bootstrap() {
  const { lang } = parseLangPath(window.location.pathname);
  const active = lang ?? preferredLang();
  await Promise.all([loadLocale(active), loadContent(active)]);
  createRoot(document.getElementById('root')!).render(<App />);
}

bootstrap();
