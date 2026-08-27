import { ArrowRight } from "lucide-react";

import { ChatScene } from "@/components/scenes/chat-scene";

import { TRANSLATION_LANGUAGE_COUNT } from "@/config/product";

/**
 * Sektion 3 – Problem → Lösung.
 * Drei Gegenüberstellungen, links der Schmerz, rechts die Antwort.
 *
 * Die drei Schmerzen sind die aus dem Grundschulalltag, nicht die generischen
 * einer weiterfuehrenden Schule: Der Zeugnistag, die Elternmail am Abend und
 * das Material, das nicht zur eigenen Klasse passt. Jede Antwort rechts
 * beschreibt eine Funktion, die laut docs/produktstand-2026-08.md live ist.
 */
const pairs = [
  {
    problem:
      "Am Zeugnistag fehlt genau die Doku, die man das ganze Jahr nebenbei gemacht hat",
    solution:
      "Beobachtungen aus dem Unterricht – getippt oder diktiert – werden am Zeugnistag zur Grundlage des Textes.",
  },
  {
    // „in Ihrem Stil“ stand bis zur Straffung in diesem Satz. Die Stil-Aussage
    // ist eines der drei Alleinstellungsmerkmale und gehoert seither genau
    // einmal auf die Startseite – in die Spalte „Fuer Lehrkraefte“ der Sektion
    // „Was Selyvi zurueckgibt“. Hier stand sie nur nebenbei und hat die Aussage
    // dort entwertet. Der Satz nennt jetzt, was der Produktstand woertlich
    // sagt: Die Mail entsteht auf Deutsch und wird in einem zweiten Schritt
    // uebersetzt.
    problem: "Elternmails kosten Abende, in mehreren Sprachen erst recht",
    solution: `Die Mail entsteht auf Deutsch und wird auf Wunsch übersetzt – in ${TRANSLATION_LANGUAGE_COUNT} Sprachen.`,
  },
  {
    problem: "Material von der Stange passt nie zur eigenen Klasse",
    solution:
      "Material entsteht aus dem, was Sie über Ihre Klasse dokumentiert haben – mit ausgewiesenen Quellen.",
  },
];

export function ProblemSolution() {
  return (
    <section aria-labelledby="problem-loesung-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Zweispaltig ab lg: Text links, Szene rechts. Darunter steht die
            Szene unter dem Text.

            Die frueher hier stehende Kopfzeile „Heute | Mit Selyvi" ist
            entfallen. Sie war die Beschriftung einer zweispaltigen Tabelle –
            und die passt nicht mehr, seit die Paare selbst in einer halben
            Spalte stehen: Bei rund 250 px je Zelle bricht „Am Zeugnistag
            fehlt genau die Doku, die man das ganze Jahr nebenbei gemacht
            hat" in sechs Zeilen um.

            Die Paare stehen deshalb jetzt ueberall so, wie sie auf dem Handy
            schon immer standen: Last oben, Antwort darunter, dazwischen der
            Pfeil. Grau gegen Ink traegt denselben Unterschied wie vorher die
            Spaltenkoepfe. */}
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2
              id="problem-loesung-titel"
              className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              Was sich im Alltag ändert
            </h2>

            <ul className="mt-10 divide-y divide-gray-200 border-t border-gray-200">
              {pairs.map((pair) => (
                <li key={pair.problem} className="py-7">
                  <p className="text-lg text-gray-500">{pair.problem}</p>

                  <div className="mt-3 flex items-start gap-3">
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1.5 size-5 shrink-0 text-brand-600"
                    />
                    <p className="text-lg text-ink">{pair.solution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Die Szene ist der vierte Fall: Sie zeigt nicht, was die
              Anwendung schreibt, sondern was sie auf Nachfrage aus dem
              bereits Dokumentierten herausholt. */}
          <ChatScene />
        </div>
      </div>
    </section>
  );
}
