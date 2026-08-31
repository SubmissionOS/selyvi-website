import Link from "next/link";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion – Unterrichtsqualität.
 *
 * Steht direkt nach dem Entlastungsbericht und beantwortet die Frage, die er
 * aufwirft: Wofür eigentlich? Eingesparte Stunden sind kein Zweck, sie sind
 * ein Mittel.
 *
 * ==========================================================================
 * DREI WORTLAUT-SPERREN – NICHT AUFWEICHEN
 * ==========================================================================
 *   1. Kein „nachweislich" oder „messbar gestiegen". Gemessene
 *      Qualitaetssteigerungen gibt es NICHT. Der Produktstand fuehrt die
 *      Wirkungsmessung als Erhebungsmodell, nicht als Ergebnis – und die
 *      Wirkungszeile im Produkt weist jede Zahl als Messwert oder als
 *      Schaetzwert aus.
 *   2. Kein „die Schulqualität steigt" als Tatsachenbehauptung. Der Text sagt,
 *      dass wir MESSEN – er nennt kein Ergebnis. Frueher stand hier „behaupten
 *      wir nicht"; das war eine Selbstauskunft ueber Unwissen und faellt unter
 *      CLAUDE.md, Regel B.
 *   3. Kein „greift auf Lehrpläne zu". Die Lehrplaene liegen erhoben vor,
 *      sind aus Lizenzgruenden aber bewusst nicht angebunden. „Orientiert
 *      sich an" ist das staerkste zulaessige Verb – dieselbe Sperre wie im
 *      Hero und in „Selyvi lernt mit."
 *
 * BEWUSST OHNE SZENE UND OHNE KENNZAHL. Die Seite sollte in derselben Runde
 * kuerzer werden; eine Sektion, die genau das unterlaeuft, waere ein
 * Eigentor. Der Abschluss ist ein Textlink, kein Knopf: Wer wissen will, wie
 * gemessen wird, liest weiter – wer nicht, scrollt.
 */
export function TeachingQuality() {
  return (
    <section
      aria-labelledby="unterrichtsqualitaet-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <h2
            id="unterrichtsqualitaet-titel"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Entlastung ist kein Selbstzweck: Es geht um Unterricht.
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Wer weniger Abende mit Verwaltung verbringt, hat am nächsten Morgen mehr Kraft
            für die Stunde. Und {PRODUCT_NAME} orientiert sich dabei an aktuellen
            Bildungsvorgaben, damit Entlastung und heutige Anforderungen zusammenkommen.
          </p>

          <p className="mt-4 text-lg text-ink">
            Ob das im Unterricht ankommt, messen wir – von Anfang an, mit unserem
            Wirkungsmodell.
          </p>

          <p className="mt-6">
            <Link
              href="/forschung"
              className="text-base text-brand-600 underline underline-offset-4"
            >
              Wie wir Wirkung messen
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
