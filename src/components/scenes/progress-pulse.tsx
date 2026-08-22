import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Ruhig pulsierender Zustand – etwa ein Mikrofon, das mithört.
 *
 * Reine CSS-Animation, kein JavaScript, keine Client-Komponente. Der Puls
 * liegt auf einem eigenen Ring HINTER dem Inhalt: So skaliert nur der Ring,
 * und das Icon darin bleibt gestochen scharf. Würde das Icon selbst skaliert,
 * wäre es während des Pulses unscharf.
 *
 * LEISTUNG: nur transform und opacity, siehe `soft-pulse` in globals.css.
 */
type Props = {
  children: ReactNode;
  /** false = ruhiger Endzustand ohne Puls. */
  active?: boolean;
  className?: string;
};

export function ProgressPulse({ children, active = true, className }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center",
        className,
      )}
    >
      {active ? (
        <span className="absolute inset-0 rounded-full bg-brand-400 animate-soft-pulse" />
      ) : null}

      <span className="relative flex items-center justify-center text-brand-600">
        {children}
      </span>
    </span>
  );
}
