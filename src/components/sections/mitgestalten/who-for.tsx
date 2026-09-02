import Link from "next/link";

import { PRACTICE_CLAIM, PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 3 – Für wen.
 *
 * AKTUALISIERT 02.09.2026. Diese Sektion existierte, um eine Unterscheidung
 * zu treffen: gebaut fuer die Grundschule, andere Schulformen willkommen –
 * aber nur fuer die Weiterentwicklung. Ohne sie haette eine Gymnasiallehrkraft
 * die Einladung als Zusage gelesen.
 *
 * Diese Unterscheidung gibt es nicht mehr. Der Produktstand fuehrt seit dem
 * 02.09.2026 alle Schularten von Klasse 1 bis Abitur, und damit ist die
 * Einladung fuer alle dieselbe. Die Sektion bleibt – die Frage „fuer wen?"
 * stellt sich weiterhin –, aber sie beantwortet sie jetzt in einem Satz.
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

          {/* AKTUALISIERT 02.09.2026. Hier standen zwei Absaetze: einer, der
              die Grundschule als Zielgruppe nannte, und einer, der Lehrkraefte
              anderer Schulformen „fuer die Weiterentwicklung" willkommen hiess
              – eine Einladung zweiter Klasse. Beides ist mit der neuen
              Zielgruppe hinfaellig. */}
          <p className="mt-6 text-lg text-gray-500">
            {PRODUCT_NAME} ist für Lehrkräfte aller Schularten und Schulformen gebaut, von
            Klasse 1 bis zum Abitur. {PRACTICE_CLAIM}
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
