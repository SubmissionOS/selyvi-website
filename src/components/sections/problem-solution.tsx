import { ArrowRight } from "lucide-react";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 3 – Problem → Lösung.
 * Drei Gegenüberstellungen, links der Schmerz, rechts die Antwort.
 */
const pairs = [
  {
    problem: "Korrekturstapel fressen das Wochenende",
    solution:
      "Korrekturvorschläge in Minuten statt Stunden – die Entscheidung bleibt bei Ihnen.",
  },
  {
    problem: "Dokumentationspflichten wachsen jedes Jahr",
    solution: "Leistungsstände und Notizen entstehen nebenbei, sauber abgelegt.",
  },
  {
    problem: "Zehn Tools, kein System",
    solution: "Ein Ort für Aufgaben, Bewertungen und Unterlagen.",
  },
];

export function ProblemSolution() {
  return (
    <section aria-labelledby="problem-loesung-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="problem-loesung-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Was sich im Alltag ändert
        </h2>

        {/* Spaltenbeschriftung nur ab md sichtbar; darunter steht ohnehin
            jedes Paar untereinander. */}
        <div className="mt-14 hidden gap-8 border-b border-gray-200 pb-4 md:grid md:grid-cols-2">
          <p className="text-sm font-medium text-gray-500">Heute</p>
          <p className="text-sm font-medium text-gray-500">Mit {PRODUCT_NAME}</p>
        </div>

        <ul className="divide-y divide-gray-200">
          {pairs.map((pair) => (
            <li key={pair.problem} className="grid gap-4 py-8 md:grid-cols-2 md:gap-8">
              <p className="text-lg text-gray-500">{pair.problem}</p>

              <div className="flex items-start gap-3">
                <ArrowRight
                  aria-hidden="true"
                  className="mt-1.5 size-5 shrink-0 text-brand-600 md:hidden"
                />
                <p className="text-lg text-ink">{pair.solution}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
