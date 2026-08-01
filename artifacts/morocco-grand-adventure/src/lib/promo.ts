import { useEffect, useState } from 'react';
import { contactInfo } from '@/data/content';

// ── Limited-time 2026 promotion ──────────────────────────────────────────────
// Single source of truth for the site-wide "2026 Special Offer – Save 10%".
// Toggling the deadline (or letting it pass) automatically hides every promo
// element across the site, since all promo UI is gated on isPromoActive().
export const PROMO_DISCOUNT = 0.1; // 10% off
// Local-time end of Dec 31, 2026 (deliberately no trailing "Z"): "book before
// Dec 31" should mean end-of-day in each visitor's own timezone, not a single
// global UTC instant (which would expire early for western-hemisphere users).
export const PROMO_DEADLINE = new Date('2026-12-31T23:59:59');

/** Whether the promotion is still running (before the deadline). */
export function isPromoActive(now: number = Date.now()): boolean {
  return now <= PROMO_DEADLINE.getTime();
}

/** Discounted price (rounded), from a number or numeric string like "450". */
export function discountedPrice(price: number | string): number {
  const n = typeof price === 'string' ? parseInt(price.replace(/[^\d.]/g, ''), 10) : price;
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * (1 - PROMO_DISCOUNT));
}

/** WhatsApp deep link with a pre-filled message. */
export function waPromoLink(message: string): string {
  return `${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function computeTimeLeft(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    expired: false,
  };
}

/** Live countdown to the promo deadline, ticking every second. */
export function useCountdown(target: Date = PROMO_DEADLINE): TimeLeft {
  const targetMs = target.getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(targetMs));
  useEffect(() => {
    setTimeLeft(computeTimeLeft(targetMs));
    const id = setInterval(() => setTimeLeft(computeTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  return timeLeft;
}
