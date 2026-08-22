"use client";

import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { SceneVisibilityContext } from "@/components/scenes/scene-group";

/**
 * Deklarative Schrittfolge für eine UI-Szene.
 *
 * ==========================================================================
 * DREI ZUSTÄNDE, DIE DIESE KOMPONENTE GARANTIERT
 * --------------------------------------------------------------------------
 * 1. AUSSERHALB DES VIEWPORTS läuft nichts. Kein rAF, kein Timer, keine
 *    Zustandsänderung. Der IntersectionObserver stoppt die Schleife, und der
 *    Fortschritt bleibt stehen, statt zurückgesetzt zu werden.
 *
 * 2. BEI prefers-reduced-motion rendert die Szene STATISCH ihren Endzustand.
 *    Kein Autoplay, nichts blinkt, keine Schleife. Der Endzustand ist der
 *    letzte Schritt – deshalb muss der letzte Schritt immer der vollständige
 *    Zustand sein, nicht ein Zwischenbild.
 *
 * 3. OHNE JAVASCRIPT sieht man ebenfalls den Endzustand. Das ist kein
 *    Zufall: `isStatic` startet auf `true`, der Server rendert damit den
 *    Endzustand, und erst der Client schaltet auf Schritt 0 um. Die
 *    Umschaltung passiert in einem Layout-Effekt, also VOR dem ersten Paint –
 *    ein Aufblitzen des Endzustands gibt es dadurch nicht.
 * ==========================================================================
 */
export type SceneStep = {
  /** Kennung, über die Bausteine ihren Schritt abfragen. */
  id: string;
  /** Dauer des Schritts in Millisekunden. */
  duration: number;
  /** Wartezeit vor dem Schritt in Millisekunden. */
  delay?: number;
};

export type SceneState = {
  /** Index des aktiven Schritts. */
  index: number;
  /** Kennung des aktiven Schritts. */
  id: string;
  /** Statischer Endzustand – reduced motion, Serverrender oder ohne JS. */
  isStatic: boolean;
  /**
   * Läuft die Zeitleiste gerade wirklich?
   *
   * false, sobald die Szene den Sichtbereich verlässt – und dann MUSS jeder
   * Baustein mit eigener Schleife ebenfalls anhalten. Die Zeitleiste selbst
   * anzuhalten genügt nicht: <TypingText /> und <CountUp /> haben ihre eigene
   * requestAnimationFrame-Schleife und tippten sonst ausserhalb des Bildes zu
   * Ende. Genau das war messbar der Fall, bevor dieses Feld eingeführt wurde
   * (rund 165 rAF-Aufrufe in drei Sekunden bei weggescrollter Szene).
   *
   * In den Bausteinen entspricht das dem `paused`-Feld.
   */
  running: boolean;
  /**
   * Zählt bei jedem Schleifendurchlauf hoch.
   *
   * Gehört als `key` an jeden Baustein, der sich pro Durchlauf neu aufbauen
   * soll (TypingText, ChipPop). React montiert ihn dadurch neu, und die
   * Animation beginnt von vorn – ohne dass die Bausteine selbst etwas von der
   * Schleife wissen müssen.
   */
  cycle: number;
  /** Ist genau dieser Schritt gerade aktiv? */
  at: (id: string) => boolean;
  /** Ist dieser Schritt erreicht (aktiv oder bereits vorbei)? */
  reached: (id: string) => boolean;
};

type Props = {
  steps: SceneStep[];
  /**
   * Textalternative der gesamten Szene. Beschreibt den Ablauf in einem Satz –
   * die Szene trägt role="img", alles darin ist aria-hidden.
   */
  label: string;
  /** Atempause am Ende, bevor die Schleife neu beginnt. */
  loopPauseMs?: number;
  /**
   * Verzögerter Start, nachdem die Szene sichtbar geworden ist.
   *
   * Für Kaskaden gedacht: Liegen mehrere Szenen nebeneinander in einer
   * <SceneGroup />, starten sie sonst im selben Bild und drei Dinge bewegen
   * sich gleichzeitig. Ein Versatz von wenigen hundert Millisekunden je Szene
   * macht daraus eine Abfolge, der das Auge folgen kann.
   *
   * Wirkt nur beim ERSTEN Sichtbarwerden. Wer zurückscrollt, soll nicht jedes
   * Mal erneut warten.
   */
  startDelayMs?: number;
  className?: string;
  children: (scene: SceneState) => ReactNode;
};

/**
 * useLayoutEffect gibt es serverseitig nicht; React warnt dort. Beim Rendern
 * auf dem Server wird deshalb auf useEffect ausgewichen – der läuft dort
 * ohnehin nie.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Ein einzelner Frame darf höchstens so viel Zeit vorspulen.
 *
 * Notwendig, weil der Browser requestAnimationFrame in Hintergrund-Tabs
 * anhält. Ohne die Deckelung wäre der erste Frame nach der Rückkehr um die
 * gesamte Abwesenheit „gealtert" und die Szene spränge mitten in einen
 * späteren Schritt.
 */
const MAX_FRAME_DELTA_MS = 100;

export function SceneTimeline({
  steps,
  label,
  loopPauseMs = 2000,
  startDelayMs = 0,
  className,
  children,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const lastIndex = steps.length - 1;

  /**
   * Sichtbarkeit aus einer <SceneGroup />, falls die Szene in einer liegt.
   * `null` heisst: keine Gruppe, also eigener Beobachter weiter unten.
   */
  const groupVisible = useContext(SceneVisibilityContext);

  // Startwert bewusst der Endzustand – siehe Zustand 3 im Kopfkommentar.
  const [isStatic, setIsStatic] = useState(true);
  const [ownVisible, setOwnVisible] = useState(false);
  const [delayPassed, setDelayPassed] = useState(startDelayMs === 0);
  const [index, setIndex] = useState(lastIndex);
  const [cycle, setCycle] = useState(0);

  const visible = groupVisible ?? ownVisible;

  const elapsedRef = useRef(0);
  const indexRef = useRef(lastIndex);

  /**
   * Start- und Endzeitpunkt jedes Schritts, aufsummiert.
   *
   * Bewusst eine einfache Schleife statt `map` mit einem Zähler von aussen:
   * Eine Variable, die eine Callback-Funktion beschreibt, hält der
   * React-Compiler zu Recht für unsauber (`react-hooks/immutability`).
   */
  const bounds = useMemo(() => {
    const result: { start: number; end: number }[] = [];
    let time = 0;

    for (const step of steps) {
      const start = time + (step.delay ?? 0);
      const end = start + step.duration;
      result.push({ start, end });
      time = end;
    }

    return result;
  }, [steps]);

  const cycleMs = (bounds[bounds.length - 1]?.end ?? 0) + loopPauseMs;

  // Bewegung erlaubt? Entscheidet sich erst im Browser, vor dem ersten Paint.
  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const reduce = query.matches;
      const start = reduce ? lastIndex : 0;

      elapsedRef.current = 0;
      indexRef.current = start;
      setIsStatic(reduce);
      setIndex(start);
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [lastIndex]);

  // Sichtbarkeit. Erst im Viewport läuft überhaupt etwas.
  //
  // Ohne IntersectionObserver bleibt `visible` auf false und die Szene zeigt
  // dauerhaft ihren Endzustand. Das ist gewollt: dieselbe Abstufung wie ohne
  // JavaScript, und ein bewusster Verzicht auf eine Ersatzlösung, die im
  // Hintergrund Rechenzeit verbrauchen würde.
  useEffect(() => {
    // Liegt die Szene in einer <SceneGroup />, beobachtet die für uns mit –
    // dann braucht es hier keinen zweiten Beobachter.
    if (groupVisible !== null) return;

    const host = hostRef.current;
    if (!host) return;

    // Schwellwert 0 mit `isIntersecting` – bewusst kein höherer Wert.
    //
    // Ein Schwellwert von etwa 0,15 klingt sinnvoll („erst ab einem Sechstel
    // sichtbar starten"), führt hier aber zu einem Fehler: Der Rückruf feuert
    // nur BEIM ÜBERSCHREITEN der genannten Schwelle. Scrollt die Szene wieder
    // hinaus, meldet der letzte Rückruf `isIntersecting: true` – sie ist ja
    // noch zu 14 % zu sehen –, und danach kommt keiner mehr. Die Szene liefe
    // dann ausserhalb des Bildschirms weiter, also genau das, was hier
    // verhindert werden soll.
    const observer = new IntersectionObserver((entries) =>
      setOwnVisible(entries[0]?.isIntersecting ?? false),
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [groupVisible]);

  // Versetzter Start für Kaskaden. Der Timer läuft erst, wenn die Szene
  // sichtbar ist, und genau einmal – danach bleibt `delayPassed` true.
  useEffect(() => {
    if (delayPassed || !visible || isStatic) return;

    const timer = setTimeout(() => setDelayPassed(true), startDelayMs);
    return () => clearTimeout(timer);
  }, [delayPassed, visible, isStatic, startDelayMs]);

  // Die Schleife. Läuft ausschliesslich, wenn die Szene sichtbar ist UND
  // Bewegung erlaubt ist – sonst wird der Effekt gar nicht erst aufgesetzt.
  useEffect(() => {
    if (isStatic || !visible || !delayPassed || cycleMs <= 0) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      elapsedRef.current += Math.min(now - previous, MAX_FRAME_DELTA_MS);
      previous = now;

      if (elapsedRef.current >= cycleMs) {
        elapsedRef.current -= cycleMs;
        setCycle((value) => value + 1);
      }

      const time = elapsedRef.current;
      let next = bounds.findIndex((bound) => time < bound.end);
      // -1 heisst: in der Atempause. Der letzte Schritt bleibt stehen.
      if (next === -1) next = lastIndex;

      // Zustand nur bei echtem Schrittwechsel setzen. Ohne diesen Vergleich
      // liefe pro Bild ein React-Render durch die ganze Szene.
      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isStatic, visible, delayPassed, bounds, cycleMs, lastIndex]);

  const scene: SceneState = useMemo(() => {
    const order = new Map(steps.map((step, position) => [step.id, position]));

    return {
      index,
      id: steps[index]?.id ?? "",
      isStatic,
      running: !isStatic && visible && delayPassed,
      cycle,
      at: (id) => order.get(id) === index,
      reached: (id) => {
        const position = order.get(id);
        // Im statischen Endzustand gilt jeder Schritt als erreicht.
        if (isStatic) return position !== undefined;
        return position !== undefined && position <= index;
      },
    };
  }, [steps, index, isStatic, visible, delayPassed, cycle]);

  return (
    <div ref={hostRef} role="img" aria-label={label} className={className}>
      {/* Alles innerhalb der Szene ist für Screenreader unsichtbar – die
          Aussage steht vollständig im aria-label. Gleiches Muster wie bei den
          statischen Skeletten. */}
      <div aria-hidden="true">{children(scene)}</div>
    </div>
  );
}
