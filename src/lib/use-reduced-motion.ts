"use client";

import { useEffect, useState } from "react";

/**
 * Respektiert der Besucher gerade „prefers-reduced-motion: reduce"?
 *
 * Die Szenen brauchen diesen Hook nicht – <SceneTimeline /> fragt die
 * Medienabfrage selbst ab und schaltet auf den Endzustand. Der geführte
 * Einblick hat aber keine Zeitleiste: Dort passiert nichts von allein,
 * sondern nur auf Klick. Trotzdem sollen die ÜBERGÄNGE (Tausch im Sitzplan,
 * Tippen des Entwurfs) sofort statt animiert laufen, wenn jemand das so
 * eingestellt hat.
 *
 * Startwert bewusst `false`, nicht `true`: Anders als bei den Szenen gibt es
 * hier keinen „Endzustand", der serverseitig gerendert werden könnte – die
 * Seite startet leer und wartet auf eine Eingabe. `false` heisst also nur
 * „noch nichts bekannt"; die Medienabfrage korrigiert das vor der ersten
 * möglichen Interaktion.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return reduced;
}
