import Link from "next/link";

import { PRACTICE_CLAIM, PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 3 – Für wen.
 *
 * Die Reihenfolge ist die Wahrheit aus docs/produktstand-2026-08.md: gebaut
 * fuer die Grundschule, Klassen 1–4. Andere Schulformen sind ausdruecklich
 * willkommen – aber fuer die WEITERENTWICKLUNG, nicht als heutige Zielgruppe.
 * Genau diese Unterscheidung ist der Grund, warum die Sektion existiert; ohne
 * sie liest eine Gymnasiallehrkraft die Einladung als Zusage.
 *
 * Der zweite Absatz ist durch PRACTICE_CLAIM gedeckt: An der Entwicklung
 * waren Lehrkraefte von der Grundschule bis zum Abitur beteiligt. Das ist
 * belegte Vergangenheit, keine Ankuendigung.
 *
 * Forschende bekommen keinen eigenen Absatz, sondern einen Verweis: Fuer sie
 * gibt es eine eigene Seite, und die sagt deutlich mehr, als hier hinpasst.
 */
export function WhoFor() {
  return (
    <section aria-labelledby="mitgestalten-fuer-wen-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <h2
            id="mitgestalten-fuer-wen-titel"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Für wen das gedacht ist
          </h2>

          <p className="mt-6 text-lg text-gray-500">
            Zuerst für Grundschullehrkräfte, Klassen 1 bis 4 – dafür ist {PRODUCT_NAME}{" "}
            heute gebaut. Wer dort unterrichtet, arbeitet mit dem Werkzeug in genau der
            Form, in der es gedacht ist.
          </p>

          <p className="mt-4 text-lg text-gray-500">
            Lehrkräfte anderer Schulformen sind ausdrücklich willkommen – für die
            Weiterentwicklung. {PRACTICE_CLAIM} Was die Anwendung heute kann, ist
            allerdings auf die Grundschule zugeschnitten; das gehört vorher gesagt und
            nicht nachher.
          </p>

          <p className="mt-4 text-lg text-gray-500">
            Für Forschung zu Schule und Unterricht gibt es{" "}
            <Link
              href="/forschung"
              className="text-brand-600 underline underline-offset-4"
            >
              eine eigene Seite
            </Link>{" "}
            – mit unseren Fragen und dem Erhebungsmodell dahinter.
          </p>
        </div>
      </div>
    </section>
  );
}
