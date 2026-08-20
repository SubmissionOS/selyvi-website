import { cn } from "@/lib/utils";

/**
 * Sichtbare Markierung fuer Aussagen, die noch nicht belastbar sind.
 *
 * Steht ueberall dort, wo eine konkrete Produktbehauptung noetig waere, die
 * das Team noch nicht bestaetigt hat. Vor dem Livegang muss jede Fundstelle
 * entweder durch eine belegte Angabe ersetzt oder gestrichen werden:
 *
 *   grep -rn "ReviewMarker\|review:" src/
 *
 * Bewusst sichtbar und nicht nur ein Kommentar im Code – so faellt beim
 * Durchklicken auf, was noch offen ist.
 *
 * Ohne `note`:  [PRÜFEN]
 * Mit `note`:   [PRÜFEN: Rollen- und Rechtemodell in Abstimmung]
 *
 * Die Notiz benennt, WAS offen ist. Sie ist der Unterschied zwischen „hier
 * fehlt etwas“ und „hier fehlt genau diese Entscheidung“ – und damit die
 * Arbeitsanweisung fuer die Person, die den Platzhalter aufloest.
 */
export function ReviewMarker({ note, className }: { note?: string; className?: string }) {
  return (
    <span className={cn("font-medium text-brand-600", className)}>
      {note ? `[PRÜFEN: ${note}]` : "[PRÜFEN]"}
    </span>
  );
}
