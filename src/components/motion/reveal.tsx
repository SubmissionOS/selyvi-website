"use client";

import { useRef, useState, type ReactNode } from "react";

import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

import { cn } from "@/lib/utils";

/**
 * Sanftes Einblenden beim Eintritt in den Sichtbereich.
 *
 * ==========================================================================
 * FÜNF REGELN, DIE HIER EINGEBAUT SIND – NICHT OPTIONAL
 * ==========================================================================
 *
 * 1. NIEMALS ÜBER DEM FALZ. Der Hero und alles, was ohne Scrollen sichtbar
 *    ist, bleibt unangetastet. Ein verzögert erscheinendes LCP-Element ist
 *    kein Effekt, sondern eine Verschlechterung – und Lighthouse misst genau
 *    das. Diese Komponente wird deshalb erst ab der zweiten Sektion gesetzt.
 *
 * 2. KEIN LAYOUT-SHIFT. Das Element belegt seinen Platz von der ersten
 *    Sekunde an: Es bewegt sich nur über `transform` und `opacity`, nie über
 *    Höhe, Rand oder Anzeige. CLS bleibt dadurch 0 – gemessen, nicht gehofft.
 *
 * 3. EINMALIG. Der Beobachter trennt sich nach dem ersten Auslösen. Inhalte,
 *    die beim Zurückscrollen erneut aufpoppen, wirken wie ein Defekt.
 *
 * 4. FRÜH GENUG. `rootMargin: 0px 0px -12%` lässt den Inhalt starten, wenn
 *    er ins untere Achtel des Fensters kommt – also bevor jemand ihn liest.
 *    Ohne diesen Vorlauf sähe man erst eine leere Fläche und dann ein Pop.
 *
 * 5. prefers-reduced-motion: SOFORT SICHTBAR, ohne Übergang. Nicht „schneller
 *    einblenden" – gar nicht.
 *
 * ==========================================================================
 * WARUM KEIN requestAnimationFrame
 * ==========================================================================
 * Die Bewegung macht der Browser über eine CSS-Transition. Es läuft keine
 * Schleife, weder sichtbar noch weggescrollt – anders als bei den Szenen gibt
 * es hier nichts zu takten.
 *
 * Der Serverrender liefert den SICHTBAREN Zustand: Ohne JavaScript steht der
 * Inhalt da, wo er hingehört. Erst ein Layout-Effekt versteckt ihn, und zwar
 * vor dem ersten Malen – deshalb sieht niemand ein Aufblitzen.
 */
type Props = {
  children: ReactNode;
  /** Verzögerung in Millisekunden – für gestaffelte Kartenraster. */
  delayMs?: number;
  className?: string;
};

export function Reveal({ children, delayMs = 0, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  /**
   * Startwert `true`: Serverrender und der Fall ohne JavaScript zeigen den
   * Inhalt. Der Effekt unten nimmt ihn nur dann kurz zurück, wenn wirklich
   * animiert werden soll.
   */
  const [shown, setShown] = useState(true);
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const host = ref.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Steht der Inhalt beim ersten Rendern schon im Bild, bleibt er stehen:
    // Was über dem Falz liegt, wird nicht nachträglich versteckt.
    const box = host.getBoundingClientRect();
    if (box.top < window.innerHeight) return;

    setShown(false);
    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={armed ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        armed && "transition-[opacity,transform] duration-[360ms] ease-out",
        armed && !shown && "translate-y-3 opacity-0",
        armed && shown && "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
