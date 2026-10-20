import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

type CinematicVideoProps = {
  /** Path to the .mp4 file (e.g. /videos/foo.mp4) */
  src: string;
  /** Poster image shown before the video loads */
  poster: string;
  /** Accessible label for the video */
  alt: string;
  /** Caption / title text overlaid at the bottom */
  title?: string;
  /** Optional subtitle text under the title */
  subtitle?: string;
  /** Whether to autoplay + loop once in view (default true) */
  autoPlay?: boolean;
  /** Aspect ratio class for the video container */
  aspectClass?: string;
  /** Additional className for the wrapper */
  className?: string;
};

/**
 * CinematicVideo — a lazy, muted, autoplaying video card used across the site.
 *
 * - The <video> element is always in the DOM (src/poster visible to a crawler
 *   from first render) — only *playback* is deferred until the component
 *   scrolls into view. Google's own JS SEO guidance states Googlebot "does
 *   not interact with your page" (no scrolling), so a previous version that
 *   only mounted <video> on IntersectionObserver left every instance of this
 *   component absent from Googlebot's rendered DOM. `preload="none"` is what
 *   actually keeps bandwidth low now — no bytes fetch until playback starts.
 * - `muted + loop + playsInline` delivers a premium silent-film feel once
 *   playback begins; autoplay is triggered imperatively (see effect below)
 *   rather than via the native attribute, so preload="none" isn't raced by
 *   the browser's own autoplay-driven prefetch.
 */
export function CinematicVideo({
  src,
  poster,
  alt,
  title,
  subtitle,
  autoPlay = true,
  aspectClass = 'aspect-video',
  className = '',
}: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Data- and motion-respect: don't autoplay for users who prefer reduced motion
  // or have Data Saver enabled — the poster + controls stay fully functional.
  const [gentleMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    return conn?.saveData === true;
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Start loading 400px before the video scrolls fully into view.
      { rootMargin: '400px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView || !autoPlay || gentleMode) return;
    videoRef.current?.play().catch(() => {});
  }, [inView, autoPlay, gentleMode]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-black ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop={autoPlay && !gentleMode}
        playsInline
        preload="none"
        controls
        onPlaying={() => setPlaying(true)}
        aria-label={alt}
        className={`w-full ${aspectClass} object-cover bg-black`}
      />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/10" />

      {/* Play glyph until the video starts */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Title / caption overlay */}
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 pointer-events-none">
          {title && (
            <span className="inline-block bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              {title}
            </span>
          )}
          {subtitle && (
            <p className="text-white/90 font-serif text-lg md:text-2xl drop-shadow-lg leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
