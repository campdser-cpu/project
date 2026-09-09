import { useEffect, useRef, useState, type ReactNode } from 'react';

type LazyMountProps = {
  /** Heavy subtree (e.g. Leaflet map) mounted only when scrolled near the viewport */
  children: ReactNode;
  /** Placeholder height (px) before mounting, matching the real content height to avoid CLS */
  minHeight: number;
  className?: string;
};

/**
 * LazyMount — defers mounting an expensive subtree (map vendor chunk, canvas work)
 * until the placeholder scrolls within 600px of the viewport. Nothing is rendered
 * (and nothing heavy is downloaded/parsed) until then. SEO-neutral: used only for
 * interactive widgets with no indexable content.
 */
export function LazyMount({ children, minHeight, className = '' }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={ref} className={className} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}