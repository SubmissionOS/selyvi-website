import { cn } from "@/lib/utils";

/**
 * Eine „Textzeile", die sich beim Sprachwechsel sichtbar umbaut.
 *
 * ==========================================================================
 * KEIN ECHTER ÜBERSETZTER TEXT
 * --------------------------------------------------------------------------
 * Eine Übersetzung auf einer Marketingseite müsste jemand gegenlesen, der die
 * Sprache spricht – und ein Fehler darin fiele ausgerechnet der Zielgruppe
 * auf, für die die Funktion gedacht ist. Stilisierte Segmente sagen dasselbe
 * ohne dieses Risiko.
 * ==========================================================================
 *
 * LEISTUNG: Umgebaut wird über `scaleX` mit linkem Ursprung, nicht über
 * `width`. Breite zu animieren löst Layout aus, `transform` nicht. Der leichte
 * Versatz je Segment lässt die Zeile von links nach rechts umspringen statt
 * auf einen Schlag.
 *
 * Der Farbwechsel läuft bewusst OHNE Übergang: Eine Farbanimation gehört nicht
 * zu transform/opacity und würde die Regel des Szenen-Fundaments verletzen.
 * Die Bewegung trägt die Wahrnehmung ohnehin.
 */
type Props = {
  /** Segmentbreiten vor dem Wechsel, als Faktor. */
  before: number[];
  /** Segmentbreiten nach dem Wechsel, als Faktor. */
  after: number[];
  translated: boolean;
  animate: boolean;
  /** Höhe der Segmente. Kleine Bühnen brauchen dünnere Zeilen. */
  className?: string;
};

export function MorphLine({ before, after, translated, animate, className }: Props) {
  return (
    <div className="flex items-center gap-1">
      {before.map((width, position) => (
        <span
          key={position}
          className={cn(
            "h-1.5 flex-1 origin-left rounded",
            animate && "transition-transform duration-500",
            translated ? "bg-brand-100" : "bg-gray-200",
            className,
          )}
          style={{
            transform: `scaleX(${translated ? after[position] : width})`,
            transitionDelay: animate ? `${position * 90}ms` : undefined,
          }}
        />
      ))}
    </div>
  );
}
