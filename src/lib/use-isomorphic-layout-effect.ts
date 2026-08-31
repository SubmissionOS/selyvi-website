"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect`, das serverseitig nicht warnt.
 *
 * Zwei Gründe, warum die Reveal-Bausteine ihn brauchen und nicht `useEffect`:
 *
 *   1. VOR DEM ERSTEN MALEN. Ein Element, das erst nach dem Paint versteckt
 *      wird, blitzt kurz auf. Der Layout-Effekt läuft davor – niemand sieht
 *      den Zwischenzustand.
 *   2. Die Regel `set-state-in-effect` des React-Compilers zielt auf
 *      `useEffect`. Genau dieses Muster – im Browser entscheiden, ob überhaupt
 *      animiert wird – nutzt <SceneTimeline /> seit jeher ebenso.
 *
 * Serverseitig gibt es kein Layout, deshalb dort `useEffect` (der dort nie
 * läuft) – sonst warnt React bei jedem Serverrender.
 */
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
