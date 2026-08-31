"use client";

import { useEffect, useRef, useState } from "react";

import { CountUp } from "@/components/scenes/count-up";

/**
 * Zählt eine Zahl hoch, sobald sie ins Bild kommt – genau einmal.
 *
 * <CountUp /> selbst hat keinen Beobachter: In den Szenen übernimmt das die
 * Zeitleiste. Hier gibt es keine Szene, deshalb dieser dünne Mantel.
 *
 * Der Wert steht von Anfang an im DOM (`animate=false` bis zum Auslösen).
 * Das ist wichtig für zwei Dinge: Der Serverrender liefert die fertige Zahl,
 * und die Breite des Elements ändert sich nicht – eine von 0 hochzählende
 * Zahl würde sonst beim Erreichen der Hunderter springen und Layout schieben.
 *
 * prefers-reduced-motion: gar kein Zählen, der Endwert steht sofort.
 */
export function CountUpOnView({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setLaeuft(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      <CountUp value={value} durationMs={1100} animate={laeuft} suffix={suffix} />
    </span>
  );
}
