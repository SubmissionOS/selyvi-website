"use client";

import { createContext, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Ein gemeinsamer Sichtbarkeitsbereich für mehrere Szenen.
 *
 * ==========================================================================
 * WARUM NICHT EINFACH DREI EIGENE OBSERVER
 * --------------------------------------------------------------------------
 * Drei nebeneinanderliegende Szenen würden mit je eigenem
 * IntersectionObserver einzeln anspringen – beim Scrollen fängt die linke
 * Karte an, während die rechte noch wartet, je nach Fensterhöhe auch mal gar
 * nicht. Das Ergebnis wirkt zufällig.
 *
 * Mit EINEM Observer auf der umschliessenden Fläche starten alle drei
 * gemeinsam, sobald die Sektion zu sehen ist. Die Staffelung übernimmt dann
 * `startDelayMs` an der jeweiligen <SceneTimeline /> – gewollt und in einer
 * festen Reihenfolge, statt vom Zufall des Scrollverlaufs abhängig.
 *
 * Nebeneffekt, der zählt: ein Observer statt drei.
 * ==========================================================================
 *
 * `null` bedeutet „keine Gruppe" – dann kümmert sich jede <SceneTimeline />
 * wie gehabt selbst um ihre Sichtbarkeit.
 */
export const SceneVisibilityContext = createContext<boolean | null>(null);

type Props = {
  children: ReactNode;
  className?: string;
};

export function SceneGroup({ children, className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Schwellwert 0 mit `isIntersecting` – aus demselben Grund wie in
    // <SceneTimeline />: Ein höherer Wert meldet beim Hinausscrollen zuletzt
    // noch `true` und die Szenen liefen unbemerkt weiter.
    const observer = new IntersectionObserver((entries) =>
      setVisible(entries[0]?.isIntersecting ?? false),
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <SceneVisibilityContext value={visible}>
      <div ref={hostRef} className={className}>
        {children}
      </div>
    </SceneVisibilityContext>
  );
}
