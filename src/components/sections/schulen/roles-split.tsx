import { Check } from "lucide-react";

import { DATA_SEPARATION_NOTE } from "@/config/product";
import { LeadershipModeScene } from "@/components/scenes/schulen/leadership-mode-scene";

/**
 * Sektion – Rollen-Block.
 *
 * Beide Spalten sind jetzt gefuellt. Die rechte stand lange leer, weil das
 * Rollen- und Rechtemodell nicht abgestimmt war; inzwischen steht es (siehe
 * docs/produktstand-2026-08.md, Bereich 2) und ist konkret genug, um es
 * hinzuschreiben.
 *
 * DER SCHLUSSSATZ IST KEIN NACHKLAPP. Die Schulleitung sieht ausgewertete
 * Kennzahlen, keine einzelnen Beobachtungen – und es gibt keine Rolle mit
 * Gesamtsicht auf die Daten mehrerer Lehrkraefte. Genau diese Grenze ist die
 * Frage, die in einer Personalratssitzung gestellt wird, und sie gehoert
 * deshalb in dieselbe Sektion wie die Aufzaehlung, nicht in eine Fussnote.
 */
const teacherCapabilities = [
  "Beobachtungen im Unterricht festhalten – getippt oder diktiert",
  "Zeugnisbemerkungen aus den eigenen Beobachtungen erzeugen",
  "Elternmails schreiben und übersetzen lassen",
  "Unterrichtsmaterial und Stundenentwürfe aus dem Fachkorpus erzeugen",
  "Sitzplan, Klassenstundenplan und Dokumentenablage führen",
];

const leadershipCapabilities = [
  "Entlastungsbericht: eingesparte Stunden und Automatisierungsquoten je Monat, als PDF",
  "Nutzung im Kollegium als Verteilung – bewusst keine namentliche Rangliste",
  "Schulentwicklung: Trends über abgeschlossene Monate",
  "Aufmerksamkeit: Klassen mit Beobachtungsbedarf, gemessen am Schnitt der eigenen Schule",
  "Klassen und Konten anlegen, Passwörter zurücksetzen",
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
            <h3 className="text-lg font-semibold text-ink">
              Was die Schulleitung sieht (Leitungsmodus)
            </h3>

            <ul className="mt-6 space-y-3">
              {leadershipCapabilities.map((capability) => (
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
        </div>

        {/* Der Umschalter als Szene. Sie zeigt, was die Aufzählungen darüber
            nur behaupten können: dass es zwei getrennte Ansichten sind – und
            dass die Nutzungsbalken im Leitungsmodus keine Namen tragen. */}
        <div className="mx-auto mt-10 max-w-4xl">
          <LeadershipModeScene />
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-gray-200 pl-6 text-gray-500">
          Was die Schulleitung ausdrücklich nicht sieht: einzelne Beobachtungen und
          Bewertungen. {DATA_SEPARATION_NOTE} Eine Rolle mit Gesamtsicht auf die Daten
          mehrerer Lehrkräfte gibt es nicht – auch nicht für die Schulleitung.
        </p>
      </div>
    </section>
  );
}
