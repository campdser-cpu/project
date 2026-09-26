/**
 * TripadvisorWidget — mounts Tripadvisor's official "Your Rating" widget for
 * this business (location id 34678153 — see the listing URL in
 * src/data/content.ts's contactInfo.tripadvisor).
 *
 * The markup and script below are reproduced verbatim from Tripadvisor's own
 * generated embed code — nothing here recreates, approximates, or scrapes
 * Tripadvisor's rating/review content. This component only loads and mounts
 * their official snippet.
 *
 * Client-side only by construction: the script does its work by reading and
 * enhancing the DOM, so it must never run outside a real browser. It is not a
 * risk during the Node-side prerender pass (scripts/prerender.ts builds HTML
 * with plain string templates and never renders React components at all), and
 * within React this component does nothing until its effect runs post-mount.
 *
 * Completely separate from the Google review pipeline (verifiedReviews.ts /
 * ReviewCard.tsx / buildReviewSchema): no data or markup is shared, and no
 * Review or AggregateRating JSON-LD is emitted here — the widget itself is
 * the only presentation of the Tripadvisor rating.
 */
import { useEffect } from 'react';

const WIDGET_SCRIPT_ID = 'tripadvisor-widget-script';
const WIDGET_SCRIPT_SRC =
  'https://www.jscache.com/wejs?wtype=cdsratingsonlywide&uniq=961&locationId=34678153&lang=en_US&border=true&display_version=2';

declare global {
  interface Window {
    /** Installed by Tripadvisor's own widget response — see the comment below. */
    taValidate?: () => void;
    /** Defined by Tripadvisor's own asset bundle — see the no-op stub below. */
    resizeRatingsOnlyWidget?: (...args: unknown[]) => void;
  }
}

export function TripadvisorWidget() {
  useEffect(() => {
    // Their injected markup includes a hidden <img onload="resizeRatingsOnly
    // Widget(...)"> that fires once the logo image finishes loading. In
    // testing, that image can finish loading before their own asset bundle
    // has defined this helper, throwing an uncaught ReferenceError from
    // their inline handler (harmless — the widget still renders correctly —
    // but a real console error). A no-op placeholder avoids that: their
    // bundle assigns over `window.resizeRatingsOnlyWidget` unconditionally
    // once it loads, so the moment their real implementation is ready it
    // simply replaces this stub for every future call.
    if (typeof window.resizeRatingsOnlyWidget !== 'function') {
      window.resizeRatingsOnlyWidget = () => {};
    }

    // Dedupe by a stable script id. If it's already present — a previous
    // mount, or a React development/StrictMode double-invoke of this effect —
    // do nothing rather than inject a second copy. The script is
    // intentionally never removed on unmount: like the GA4/Ahrefs loaders in
    // index.html, it's meant to load once per page lifetime, not reload every
    // time this section scrolls in or the route changes.
    if (!document.getElementById(WIDGET_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = WIDGET_SCRIPT_ID;
      script.async = true;
      script.src = WIDGET_SCRIPT_SRC;
      script.setAttribute('data-loadtrk', '');
      script.onload = function onWidgetLoad(this: HTMLScriptElement & { loadtrk?: boolean }) {
        this.loadtrk = true;
      };
      document.body.appendChild(script);
    }

    // Tripadvisor's own response installs `window.onload = window.taValidate`
    // so the browser's native load event runs its DOM-enhancement logic
    // (confirmed by reading the actual response body). Because the widget
    // loads client-side — asynchronously, via a further script it injects
    // itself, which typically isn't ready for several seconds — the page's
    // real `load` event has, in practice, always already fired by the time
    // `taValidate` becomes available, so that handler is registered but the
    // event that was supposed to call it never comes again, and the widget
    // never progresses past its static logo fallback (verified with a real
    // browser test: without this, the DOM never changes; calling their own
    // `window.taValidate()` once it exists reliably produces the real rating
    // bubble and review count).
    //
    // This calls nothing but the entry point Tripadvisor's own script asked
    // to be called — it does not alter what they serve. If the real page
    // load hasn't happened yet when this runs, their own mechanism still
    // fires normally and this poll simply finds nothing to do.
    let attempts = 0;
    const maxAttempts = 40; // ~12s at 300ms — generous for a slow connection
    const poll = window.setInterval(() => {
      attempts += 1;
      if (document.readyState === 'complete' && typeof window.taValidate === 'function') {
        window.taValidate();
        window.clearInterval(poll);
      } else if (attempts >= maxAttempts) {
        window.clearInterval(poll);
      }
    }, 300);
    return () => window.clearInterval(poll);
  }, []);

  // Official Tripadvisor widget markup, unmodified (class -> className and
  // quote style are the only JSX-mechanical changes; ids, structure, the
  // target/href, and the alt text are reproduced exactly as supplied).
  return (
    <div id="TA_cdsratingsonlywide961" className="TA_cdsratingsonlywide">
      <ul id="h14Oaf" className="TA_links SIIiqXEY7m">
        <li id="ycxcEXKd6Q" className="c0NNps">
          <a
            target="_blank"
            href="https://www.tripadvisor.com/Attraction_Review-g304017-d34678153-Reviews-Morocco_Grand_Adventure-Merzouga_Draa_Tafilalet.html"
          >
            <img
              src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg"
              alt="TripAdvisor"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
