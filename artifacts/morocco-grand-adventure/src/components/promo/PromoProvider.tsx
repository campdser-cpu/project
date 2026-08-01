import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { isPromoActive, PROMO_DEADLINE } from '@/lib/promo';

const PromoActiveContext = createContext<boolean>(isPromoActive());

/**
 * Provides a single, reactive "is the promo still running?" flag to the whole app.
 * A self-rearming timer flips it to `false` the moment the deadline passes, so
 * every promo element (badges, prices, banners, CTAs) hides automatically without
 * needing a page reload or navigation.
 */
export function PromoProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(() => isPromoActive());

  useEffect(() => {
    if (!active) return;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const remaining = PROMO_DEADLINE.getTime() - Date.now();
      if (remaining <= 0) {
        setActive(false);
        return;
      }
      // setTimeout maxes out at ~24.8 days; re-arm in ≤6h chunks until the deadline.
      id = setTimeout(tick, Math.min(remaining, 21_600_000));
    };
    tick();
    return () => clearTimeout(id);
  }, [active]);

  return <PromoActiveContext.Provider value={active}>{children}</PromoActiveContext.Provider>;
}

/** Reactive promo-active flag — flips to false at the deadline without a reload. */
export function usePromoActive(): boolean {
  return useContext(PromoActiveContext);
}
