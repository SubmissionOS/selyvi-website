"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zahl, die hochzählt.
 *
 * Baustein für die Leitungs-Szene (Entlastungsbericht). Steht hier, weil das
 * Szenen-Fundament vollständig sein soll – die erste Szene im Hero verwendet
 * ihn noch nicht.
 *
 * LEISTUNG: requestAnimationFrame statt setInterval. Der Browser hält rAF in
 * Hintergrund-Tabs an; ein Intervall liefe dort weiter.
 *
 * Ausserdem wird der Zustand nur gesetzt, wenn sich die ANGEZEIGTE Zahl
 * ändert. Bei einer Zählung von 0 auf 142 sind das 142 Renders statt 60 pro
 * Sekunde.
 */
type Props = {
  value: number;
  durationMs?: number;
  /** false = Endwert sofort (prefers-reduced-motion). */
  animate?: boolean;
  /**
   * Anhalten, ohne den Fortschritt zu verlieren – gleiche Bedeutung wie bei
   * <TypingText />: Die Szene hat den Sichtbereich verlassen.
   */
  paused?: boolean;
  suffix?: string;
  className?: string;
};

/** Weiches Auslaufen: schnell los, sanft ankommen. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const formatter = new Intl.NumberFormat("de-DE");

/** Ein Frame darf höchstens so viel Zeit vorspulen – wie in der Zeitleiste. */
const MAX_FRAME_DELTA_MS = 100;

export function CountUp({
  value,
  durationMs = 1400,
  animate = true,
  paused = false,
  suffix,
  className,
}: Props) {
  const [counted, setCounted] = useState(0);
  const countedRef = useRef(0);
  /** Verstrichene Zählzeit. Überlebt eine Pause, deshalb ein Ref. */
  const elapsedRef = useRef(0);

  /**
   * Wie bei <TypingText />: Der statische Fall steht im Render, nicht im
   * Zustand. Der Effekt muss dadurch nichts synchron zurücksetzen.
   */
  const shown = animate ? counted : value;

  useEffect(() => {
    if (!animate || paused) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      elapsedRef.current += Math.min(now - previous, MAX_FRAME_DELTA_MS);
      previous = now;

      const progress = Math.min(elapsedRef.current / durationMs, 1);
      const next = Math.round(easeOutCubic(progress) * value);

      if (next !== countedRef.current) {
        countedRef.current = next;
        setCounted(next);
      }

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, paused, value, durationMs]);

  return (
    <span className={className}>
      {/* tabular-nums haelt die Ziffernbreite konstant. Ohne das ruckelt die
          Zahl beim Hochzaehlen seitlich – und eine wackelnde Breite waere
          zudem eine Layout-Aenderung pro Schritt. */}
      <span className="tabular-nums">{formatter.format(shown)}</span>
      {suffix}
    </span>
  );
}
