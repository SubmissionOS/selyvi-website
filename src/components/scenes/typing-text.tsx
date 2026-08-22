"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Text, der zeichenweise erscheint – mit unregelmäßigem Rhythmus.
 *
 * WARUM KEIN Math.random: Der Rhythmus wird deterministisch aus dem Text
 * abgeleitet. Zufall während des Renderns wäre unrein (React würde das mit
 * `react-hooks/purity` anmerken) und würde ausserdem dazu führen, dass Server
 * und Client verschiedene Werte berechnen.
 *
 * Ein gleichmässiger Takt sieht sofort nach Maschine aus. Die drei Zutaten,
 * die den Unterschied machen:
 *   - Grundstreuung je Zeichen
 *   - eine kurze Pause nach Leerzeichen
 *   - eine deutliche Pause nach Satzzeichen
 *
 * LEISTUNG: Neu gerendert wird nur dieser eine Textknoten, und nur dann, wenn
 * tatsächlich ein Zeichen dazukommt – nicht bei jedem Bild.
 */
type Props = {
  text: string;
  /** Gesamtdauer bis zum vollständigen Text. */
  durationMs: number;
  /**
   * false = Text sofort vollständig, ohne Animation und ohne blinkende
   * Schreibmarke. Der Fall für prefers-reduced-motion.
   */
  animate?: boolean;
  /**
   * Anhalten, ohne den Fortschritt zu verlieren.
   *
   * Gedacht für den Fall, dass die Szene den Sichtbereich verlässt: Die
   * Zeitleiste hält dann an, aber diese Komponente hat eine EIGENE Schleife
   * und tippte sonst ausserhalb des Bildes weiter. Beim Zurückscrollen läuft
   * sie da weiter, wo sie stehen geblieben ist.
   */
  paused?: boolean;
  /** Schreibmarke auch nach dem Ende weiter anzeigen. */
  keepCaret?: boolean;
  className?: string;
};

/**
 * Zeitpunkt, zu dem Zeichen i sichtbar wird – aufsummiert und auf die
 * Gesamtdauer normiert. Dadurch ist der Text am Ende der Schrittdauer
 * garantiert fertig, egal wie die Gewichte ausfallen.
 */
function buildOffsets(text: string, durationMs: number): number[] {
  // FNV-artiger Startwert aus dem Text: gleicher Text, gleicher Rhythmus.
  let seed = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    seed ^= text.charCodeAt(i);
    seed = Math.imul(seed, 16777619) >>> 0;
  }

  const weights: number[] = [];

  for (let i = 0; i < text.length; i += 1) {
    // Linearer Kongruenzgenerator – reicht für Tippgefühl vollkommen aus.
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const random = seed / 4294967296;

    let weight = 0.65 + random * 0.8;
    const character = text[i];

    if (character === " ") weight += 0.3;
    if (character === "," || character === "–" || character === "-") weight += 1.6;
    if (character === "." || character === "!" || character === "?") weight += 2.6;

    weights.push(weight);
  }

  const total = weights.reduce((sum, weight) => sum + weight, 0) || 1;
  const offsets: number[] = [];
  let accumulated = 0;

  for (const weight of weights) {
    accumulated += weight;
    offsets.push((accumulated / total) * durationMs);
  }

  return offsets;
}

/** Ein Frame darf höchstens so viel Zeit vorspulen – wie in der Zeitleiste. */
const MAX_FRAME_DELTA_MS = 100;

export function TypingText({
  text,
  durationMs,
  animate = true,
  paused = false,
  keepCaret = false,
  className,
}: Props) {
  const offsets = useMemo(() => buildOffsets(text, durationMs), [text, durationMs]);

  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  /** Verstrichene Tippzeit. Überlebt eine Pause, deshalb ein Ref. */
  const elapsedRef = useRef(0);

  /**
   * Der statische Fall steht im RENDER, nicht im Zustand.
   *
   * Dadurch braucht der Effekt keinen synchronen setState-Aufruf, um beim
   * Umschalten zurückzusetzen – React rät davon ab, weil daraus
   * Kaskadenrenders entstehen. Serverrender und `animate === false` zeigen so
   * ohne Umweg den vollständigen Text.
   */
  const shown = animate ? count : text.length;

  useEffect(() => {
    // Kein Timer, wenn nicht animiert wird – und keiner, solange die Szene
    // ausserhalb des Sichtbereichs liegt.
    if (!animate || paused) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      // Aufsummiert statt aus einem festen Startpunkt gerechnet: Nur so führt
      // eine Pause nicht dazu, dass der Text nach dem Zurückscrollen
      // schlagartig fertig ist.
      elapsedRef.current += Math.min(now - previous, MAX_FRAME_DELTA_MS);
      previous = now;

      // Die Zahl wird in JEDEM Bild neu aus den Offsets bestimmt, nicht aus
      // dem letzten Wert fortgeschrieben. Das kostet bei gut 150 Zeichen
      // nichts und macht den Ablauf selbstkorrigierend.
      let next = 0;
      while (next < offsets.length && offsets[next] <= elapsedRef.current) next += 1;

      if (next !== countRef.current) {
        countRef.current = next;
        setCount(next);
      }

      if (next < offsets.length) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, paused, offsets]);

  const done = shown >= text.length;
  const showCaret = animate && (!done || keepCaret);

  return (
    <span className={cn("break-words", className)}>
      {text.slice(0, shown)}
      {showCaret ? (
        <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-brand-600 animate-caret-blink" />
      ) : null}
    </span>
  );
}
