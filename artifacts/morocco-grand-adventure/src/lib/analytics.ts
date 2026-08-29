import type { Lang } from '@/i18n/index';

type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

const GA_MEASUREMENT_ID = 'G-8FQ5M7DD37';

function getAttribution(): AnalyticsParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const stored = (() => {
    try {
      return window.localStorage.getItem('mga_attribution');
    } catch {
      return null;
    }
  })();

  let previous: AnalyticsParams = {};
  if (stored) {
    try {
      previous = JSON.parse(stored) as AnalyticsParams;
    } catch {
      previous = {};
    }
  }

  const current: AnalyticsParams = {
    source: params.get('utm_source') ?? undefined,
    medium: params.get('utm_medium') ?? undefined,
    campaign: params.get('utm_campaign') ?? undefined,
    term: params.get('utm_term') ?? undefined,
    content: params.get('utm_content') ?? undefined,
    landing_page: previous.landing_page ?? window.location.pathname,
  };

  const merged = { ...previous, ...current };
  const hasCurrentCampaign = Object.values(current).some((value) => value != null);
  if (hasCurrentCampaign) {
    try {
      window.localStorage.setItem('mga_attribution', JSON.stringify(merged));
    } catch {
      // Analytics must never break the booking experience.
    }
  }

  return merged;
}

export function trackEvent(
  name: string,
  params: AnalyticsParams = {},
): void {
  if (typeof window === 'undefined') return;

  const eventParams: AnalyticsParams = {
    ...getAttribution(),
    page_location: window.location.href,
    ...params,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, eventParams);
    return;
  }

  // Queue events until the deferred GA4 loader in index.html initializes gtag.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(['event', name, eventParams]);
}

export function trackPageView(lang: Lang): void {
  trackEvent('page_view', { language: lang });
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export { GA_MEASUREMENT_ID };
