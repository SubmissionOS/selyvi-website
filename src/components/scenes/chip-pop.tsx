import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Tag oder Badge, das einploppt.
 *
 * Bewusst KEINE Client-Komponente: Die Animation liegt vollständig in CSS
 * (`--animate-chip-pop` in globals.css) und braucht kein JavaScript. Nur die
 * Verzögerung kommt als Inline-Wert, weil sie je Chip verschieden ist.
 *
 * LEISTUNG: Die Keyframes bewegen ausschliesslich transform und opacity.
 *
 * STAFFELUNG: `delayMs` steigt je Chip um einen festen Betrag. Erscheinen alle
 * gleichzeitig, wirkt es wie ein Umschalten; gestaffelt wirkt es, als würde
 * etwas ausgewertet.
 */
type Props = {
  children: ReactNode;
  /** Verzögerung gegenüber dem Beginn des Schritts. */
  delayMs?: number;
  /** false = Endzustand ohne Animation (prefers-reduced-motion). */
  animate?: boolean;
  className?: string;
};

export function ChipPop({ children, delayMs = 0, animate = true, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gray-200 bg-surface-alt px-3 py-1 text-xs font-medium text-brand-800",
        animate && "animate-chip-pop",
        className,
      )}
      // Inline gesetzt, weil die Kurzform `animation` aus der Utility-Klasse
      // die Verzögerung sonst auf 0 zurücksetzen würde.
      style={animate ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </span>
  );
}
