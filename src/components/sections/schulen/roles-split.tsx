import { Check } from "lucide-react";

/**
 * Sektion 4 – Rollen-Block.
 *
 * Links steht, was bereits auf /produkt beschrieben ist – nichts darueber
 * hinaus. Rechts steht bewusst KEINE Funktionsliste: Solange das Rollen- und
 * Rechtemodell nicht abgestimmt ist, waere jede Angabe dazu, was eine
 * Schulleitung sieht, geraten. Gerade bei Einsicht in Daten von Lehrkräften
 * und Schülerinnen und Schülern ist das die Aussage, die am wenigsten geraten
 * werden darf – auch nicht mit naheliegenden Vermutungen.
 */
const teacherCapabilities = [
  "Abgaben einsammeln und Korrekturvorschläge prüfen",
  "Leistungsstände pro Klasse und Fach festhalten",
  "Aufgaben, Termine und Unterlagen einer Klasse verwalten",
];

export function RolesSplit() {
  return (
    <section aria-labelledby="rollen-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="rollen-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Wer was nutzt
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-surface p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-ink">Was Lehrkräfte nutzen</h3>

            <ul className="mt-6 space-y-3">
              {teacherCapabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-brand-600"
                  />
                  <span className="text-ink">{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-surface-alt p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-ink">Was die Schulleitung sieht</h3>

            <p className="mt-6 text-gray-500">
              Welche Übersichten und Verwaltungsfunktionen der Schulleitung zur Verfügung
              stehen, ist noch nicht entschieden.
            </p>

            <p className="mt-4 text-gray-500">
              Wir tragen hier bewusst nichts ein, solange das Rollen- und Rechtemodell
              nicht abgestimmt ist – auch keine naheliegenden Vermutungen. Sobald es
              steht, finden Sie an dieser Stelle, wer welche Daten einsehen kann und wer
              nicht.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
