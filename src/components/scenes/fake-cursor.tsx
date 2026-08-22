import { cn } from "@/lib/utils";

/**
 * Weicher Zeiger, der sich zu Elementen bewegt und „klickt".
 *
 * ==========================================================================
 * WARUM PROZENTE IN translate() UND NICHT left/top
 * --------------------------------------------------------------------------
 * `left`/`top` zu animieren löst pro Bild einen Layout-Durchlauf aus. Nur
 * `transform` gehört dem Compositor.
 *
 * Prozente in `translate()` beziehen sich aber auf die EIGENE Grösse des
 * Elements, nicht auf die des Elternteils. Deshalb der Kniff hier: Der äussere
 * Rahmen liegt auf `inset-0`, ist also exakt so gross wie die Szene. Damit
 * entspricht `translate3d(40%, 60%, 0)` genau 40 % der Szenenbreite und 60 %
 * ihrer Höhe. Der eigentliche Punkt sitzt in dessen linker oberer Ecke.
 *
 * Die Bewegung selbst macht eine CSS-Transition: Sie startet beim
 * Schrittwechsel und braucht kein JavaScript pro Bild.
 * ==========================================================================
 *
 * Die Szene, in der dieser Zeiger liegt, muss `relative` sein.
 */
type Props = {
  /** Zielposition in Prozent der Szenenbreite. */
  x: number;
  /** Zielposition in Prozent der Szenenhöhe. */
  y: number;
  visible?: boolean;
  /**
   * Klick-Ring auslösen. Die Komponente muss dafür neu montiert werden –
   * in der Szene über einen `key`, der den Durchlauf enthält.
   */
  clicking?: boolean;
  /** false = kein Gleiten, kein Ring (prefers-reduced-motion). */
  animate?: boolean;
  /**
   * Kleinere Ausführung für kleine Bühnen.
   *
   * Auf einer 112 px hohen Fläche füllt der normale Klick-Ring beim Aufblitzen
   * fast das ganze Bild – aus einem Hinweis wird dann ein Blitzen, das vom
   * eigentlichen Vorgang ablenkt.
   */
  compact?: boolean;
  className?: string;
};

export function FakeCursor({
  x,
  y,
  visible = true,
  clicking = false,
  animate = true,
  compact = false,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-0 z-20",
        animate && "transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
        className,
      )}
      style={{
        transform: `translate3d(${x}%, ${y}%, 0)`,
        // will-change bekommt AUSSCHLIESSLICH dieses eine Element: Es ist das
        // einzige, das sich über die ganze Szene hinweg bewegt. Flächendeckend
        // gesetzt kostet die Angabe Speicher für jede vorsorglich angelegte
        // Ebene.
        willChange: animate ? "transform" : undefined,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Klick-Ring. Läuft genau einmal und verschwindet. */}
      {clicking && animate ? (
        <span
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-600 animate-click-ring",
            compact ? "size-6" : "size-10",
          )}
        />
      ) : null}

      {/* Der Zeiger selbst: ein weicher Punkt, kein Mauspfeil. Ein Pfeil sähe
          nach Betriebssystem aus und würde die Szene zum Bildschirmvideo
          machen. */}
      <span
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600 opacity-70",
          compact ? "size-2.5" : "size-3.5",
        )}
      />
    </span>
  );
}
