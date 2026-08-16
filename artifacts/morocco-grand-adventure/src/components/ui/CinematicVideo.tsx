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
 * - The <video> element is NOT mounted until the component scrolls into view
 *   (IntersectionObserver), so below-the-fold videos never download eagerly.
 * - `preload="metadata"` keeps bandwidth low for secondary videos.
 * - `muted + autoPlay + loop + playsInline` delivers a premium silent-film feel.
 * - A poster image with a subtle gradient + play glyph is shown until playback.
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
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

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

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-black ${className}`}
    >
      {inView ? (
        <video
          src={src}
          poster={poster}
          muted
          autoPlay={autoPlay}
          loop={autoPlay}
          playsInline
          preload="metadata"
          controls
          onPlaying={() => setPlaying(true)}
          aria-label={alt}
          className={`w-full ${aspectClass} object-cover bg-black`}
        />
      ) : (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className={`w-full ${aspectClass} object-cover bg-muted`}
        />
      )}

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
