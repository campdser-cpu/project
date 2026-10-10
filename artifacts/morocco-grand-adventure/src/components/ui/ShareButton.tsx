// ─────────────────────────────────────────────────────────────────────────────
// ShareButton — one reusable sharing control for tour/destination cards and
// their detail pages.
//
// Behavior:
//  - Tries the native Web Share API first (navigator.share) when available —
//    the natural, immediate mobile interaction.
//  - If the user cancels the native sheet, nothing happens (that's their
//    choice, not an error) and the button stays usable.
//  - If native sharing is unavailable, or fails for a reason other than the
//    user cancelling, a small accessible fallback menu opens with WhatsApp,
//    Facebook, Email and Copy link — the same four options everywhere.
//  - Copy link gives honest feedback: a real confirmation on success, and a
//    manual, selectable fallback if clipboard access fails rather than
//    silently doing nothing.
//
// Always stops propagation/prevents default on its own click — safe whether
// or not this button happens to be nested inside a card's <Link>.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Share2, Mail, Link2, Check } from 'lucide-react';
import { SiWhatsapp, SiFacebook } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';
import { absoluteUrl } from '@/lib/shareUrl';
import { buildMailtoHref } from '@/lib/inquiryChannels';
import { cn } from '@/lib/utils';

type ShareButtonProps = {
  /** The real title of the thing being shared (tour name, destination name). */
  title: string;
  /** Canonical route path, no lang prefix, e.g. `/tours/3-day-sahara-marrakech`. */
  path: string;
  /** Matches the surface this button sits on: a light card thumbnail, or a dark full-bleed hero photo. */
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
};

type CopyState = 'idle' | 'copied' | 'manual';

const TONE_CLASSES: Record<'light' | 'dark', string> = {
  light:
    'bg-background/90 backdrop-blur border border-border/50 text-foreground hover:bg-background hover:border-primary/50',
  dark:
    'bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/45 hover:border-white/40',
};

const SIZE_CLASSES: Record<'sm' | 'md', { button: string; icon: string }> = {
  sm: { button: 'w-8 h-8', icon: 'w-4 h-4' },
  md: { button: 'w-10 h-10', icon: 'w-[18px] h-[18px]' },
};

export function ShareButton({ title, path, tone = 'light', size = 'sm', className }: ShareButtonProps) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const manualInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    if (copyState === 'manual') manualInputRef.current?.select();
  }, [copyState]);

  // Reset transient copy feedback whenever the menu closes.
  useEffect(() => {
    if (!open) setCopyState('idle');
  }, [open]);

  const url = absoluteUrl(lang, path);

  async function handleTriggerClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return; // native sheet handled everything
      } catch (err) {
        // AbortError: the visitor cancelled on purpose — respect that, do
        // nothing further. Any other failure falls through to the menu.
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }
    setOpen(true);
  }

  function closeAfter(ms: number) {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), ms);
  }

  async function handleCopyLink() {
    try {
      if (!navigator.clipboard) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setCopyState('copied');
      closeAfter(1400);
      return;
    } catch {
      // fall through to the legacy/manual paths below
    }
    try {
      // Appended inside the popover's own content (never document.body):
      // focusing an element outside the popover's DOM subtree reads to Radix
      // as focus leaving the popover and auto-dismisses it, which would
      // destroy this whole flow before the manual fallback could ever show.
      const container = contentRef.current ?? document.body;
      const temp = document.createElement('textarea');
      temp.value = url;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      container.appendChild(temp);
      temp.focus();
      temp.select();
      const ok = document.execCommand('copy');
      container.removeChild(temp);
      if (ok) {
        setCopyState('copied');
        closeAfter(1400);
        return;
      }
    } catch {
      // fall through to manual fallback
    }
    setCopyState('manual');
  }

  function openExternal(href: string) {
    window.open(href, '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  function openEmail() {
    const subject = t('share_email_subject').replace('{title}', title);
    const body = `${title}\n\n${url}`;
    window.location.href = buildMailtoHref(subject, body, '');
    setOpen(false);
  }

  const sizing = SIZE_CLASSES[size];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <button
          type="button"
          onClick={handleTriggerClick}
          aria-label={t('share_label')}
          title={t('share_label')}
          className={cn(
            'inline-flex items-center justify-center rounded-full transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            sizing.button,
            TONE_CLASSES[tone],
            className,
          )}
        >
          <Share2 className={sizing.icon} aria-hidden="true" />
        </button>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          ref={contentRef}
          align="center"
          sideOffset={8}
          onOpenAutoFocus={(e) => {
            // Keep focus on the first real action, not the invisible anchor.
            e.preventDefault();
            (e.currentTarget as HTMLElement).querySelector<HTMLElement>('button')?.focus();
          }}
          className="z-50 w-60 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuRow
            icon={<SiWhatsapp className="w-4 h-4" aria-hidden="true" />}
            label={t('share_whatsapp')}
            onClick={() => openExternal(`https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`)}
          />
          <MenuRow
            icon={<SiFacebook className="w-4 h-4" aria-hidden="true" />}
            label={t('share_facebook')}
            onClick={() => openExternal(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}
          />
          <MenuRow
            icon={<Mail className="w-4 h-4" aria-hidden="true" />}
            label={t('share_email')}
            onClick={openEmail}
          />
          <MenuRow
            icon={copyState === 'copied' ? <Check className="w-4 h-4" aria-hidden="true" /> : <Link2 className="w-4 h-4" aria-hidden="true" />}
            label={copyState === 'copied' ? t('share_copied') : t('share_copy_link')}
            onClick={handleCopyLink}
          />
          {copyState === 'manual' && (
            <div className="px-2.5 pt-1 pb-1.5">
              <p className="text-xs text-muted-foreground mb-1.5">{t('share_manual_copy_hint')}</p>
              <input
                ref={manualInputRef}
                type="text"
                readOnly
                value={url}
                aria-label={t('share_manual_copy_hint')}
                onFocus={(e) => e.currentTarget.select()}
                className="w-full rounded-md border border-border bg-muted px-2.5 py-1.5 text-xs text-foreground"
              />
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function MenuRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex w-5 items-center justify-center text-muted-foreground">{icon}</span>
      {label}
    </button>
  );
}
