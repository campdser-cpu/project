import { useEffect, useState } from 'react';

/**
 * Backs a controlled `<input type="number">` with its own string draft, so
 * the field can be freely cleared and retyped while focused.
 *
 * The bug this replaces: binding the input directly to a numeric state with
 * `onChange={(e) => setN(Number(e.target.value) || fallback)}` snaps back to
 * `fallback` on every keystroke that passes through an empty string —
 * `Number('')` is `0`, and `0 || fallback` is truthy-coerced to `fallback`
 * immediately. React re-renders the controlled input with that fallback
 * before the visitor's next keystroke lands, so the field visually never
 * empties: pressing Backspace on "1" appears to do nothing, and a
 * replacement digit is inserted next to the stuck "1" instead of replacing
 * it (e.g. typing "4" can end up as "14").
 *
 * Here the draft is free text while the field is being edited — digits only,
 * including empty — and only commits to the real numeric value (via
 * `onChange`) once it parses to a number inside `[min, max]`. Out-of-range or
 * incomplete drafts (typing "9" toward "90" when max is 50, or a momentarily
 * empty field) are shown as typed but left uncommitted. `onBlur` then clamps
 * and restores a valid number, so the field never stays empty or invalid
 * once the visitor moves on.
 */
export function useNumberField(
  value: number,
  onChange: (n: number) => void,
  min: number,
  max: number = Infinity,
) {
  const [draft, setDraft] = useState(String(value));

  // Resync the draft when the committed value changes from outside this
  // field (a stepper elsewhere, a form reset) rather than from the visitor's
  // own typing here.
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return {
    value: draft,
    onChange: (raw: string) => {
      if (!/^\d*$/.test(raw)) return;
      setDraft(raw);
      if (raw === '') return;
      const n = Number(raw);
      if (n >= min && n <= max) onChange(n);
    },
    onBlur: () => {
      const n = Number(draft);
      const clamped = draft === '' || Number.isNaN(n) ? min : Math.max(min, Math.min(max, n));
      setDraft(String(clamped));
      if (clamped !== value) onChange(clamped);
    },
  };
}
