/**
 * Sichtbarer Hinweis unter Szenen, die KENNZAHLEN zeigen.
 *
 * Warum es ihn gibt: Jede Szene traegt „Alle Daten sind erfunden“ in ihrem
 * aria-label – das hoert aber nur, wer einen Screenreader benutzt. Sehende
 * Besucher sehen einen realistisch nachgebauten Bericht mit einer konkreten
 * Stundenzahl. „Schaetzwert“ steht daneben, das betrifft aber die
 * Rechenmethode und nicht die Herkunft der Zahl.
 *
 * Deshalb NUR unter Szenen mit Kennzahlen und nicht unter allen: Eine Szene,
 * die zeigt, wie eine Beobachtung getippt wird, behauptet kein Ergebnis. Eine
 * Szene mit „138 Std.“ tut es.
 *
 * Die Zeile steht bewusst AUSSERHALB der Szenen-Komponenten. Die Szenen sind
 * gemessen stabil (Hash-Vergleich bei prefers-reduced-motion); ein Eingriff in
 * ihren Code haette diesen Nachweis entwertet.
 *
 * aria-hidden bewusst NICHT: Der Hinweis ist redundant zum aria-label, aber
 * eine doppelte Kennzeichnung schadet niemandem – eine fehlende schon.
 */
export function SampleDataNote() {
  return <p className="mt-3 text-xs text-gray-500">Beispieldaten</p>;
}
