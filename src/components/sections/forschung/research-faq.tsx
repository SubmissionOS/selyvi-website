import Link from "next/link";

import { PRODUCT_NAME } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

/**
 * Sektion 6 – FAQ für Forschende.
 *
 * Dieselbe Darstellung wie auf Startseite und /schulen (FaqAccordion), andere
 * Fragen: Es sind die vier, die in Anfragen aus Hochschulen tatsaechlich
 * kommen – und die dritte ist die, an der eine unehrliche Antwort die ganze
 * Seite entwerten wuerde.
 *
 * Zwei Dinge werden hier bewusst NICHT zugesagt, obwohl beide naheliegen und
 * beide gefragt werden:
 *   - kein Datum fuer den Forschungszugang. Die juristische Pruefung laeuft;
 *     ein genanntes Quartal waere geraten.
 *   - keine Zusage zu Ko-Autorenschaft, Publikationsrechten oder exklusivem
 *     Datenzugang. Darueber entscheidet niemand vor dem ersten Gespraech.
 *
 * Die zweite Antwort nennt bewusst KEINE feste Liste von drei Formen mehr.
 * Drei Kaestchen laden dazu ein, sich in keinem wiederzufinden – und die
 * Formen haengen ohnehin an der Fragestellung. Statt der Aufzaehlung steht
 * dort jetzt der naechste Schritt.
 */
const faqItems: FaqItem[] = [
  {
    question: `Welchen Bezug hat ${PRODUCT_NAME} zu meiner Forschung?`,
    answer: `${PRODUCT_NAME} wird im laufenden Schulalltag benutzt – nicht in einer Erhebungssituation. Wenn Sie zu Unterricht, Vorbereitungspraxis oder der Arbeitsbelastung von Lehrkräften forschen, ist das ein Feldzugang, den es sonst selten gibt. Was sich daraus erheben lässt, legen wir gemeinsam fest – und genau darüber würden wir mit Ihnen sprechen wollen.`,
  },
  {
    question: "Wie kann eine Zusammenarbeit aussehen?",
    answer:
      "Von Pilotbegleitung über die Mitgestaltung der Erhebungsinstrumente bis zu gemeinsamen Auswertungen nach Freigabe – die Formen sind so unterschiedlich wie die Fragestellungen. Am schnellsten klärt das ein kurzes Kennenlernen. Publikationen, Autorenschaften und Zugänge legen wir dort gemeinsam fest – schriftlich, bevor Daten fließen.",
  },
  {
    question: "Mit welchem Wirkungsmodell arbeitet ihr?",
    answer:
      "Mit einem Erhebungsmodell entlang der PHINEO-Wirkungstreppe: Input, Output, Outcome, Impact. Erhoben wird über drei Befragungswellen, die Einwilligung ist zweckgranular, die Auswertung folgt einem vorab festgelegten Codebuch, und Werte werden erst ab einer Mindestfallzahl ausgewiesen. Modellversion, Annahmeketten und offene Methodenlücken sind dokumentiert – auch die Lücken.",
  },
];

export function ResearchFaq() {
  return (
    <section aria-labelledby="forschung-faq-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Zweispaltig ab lg: Überschrift links, Antworten rechts.
            Vorher stand hier ein 672 px breiter Fragenstapel in einem
            1088 px breiten Container – die halbe Bildschirmbreite blieb
            leer. Die Überschrift klebt beim Scrollen, damit auch weit
            unten in der Liste noch dasteht, welche Fragen das sind. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2
                id="forschung-faq-titel"
                className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Fragen aus der Forschung
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={faqItems} idPrefix="forschung-faq" />
          </div>
        </div>

        {/* Der naechste Schritt steht ausserhalb des Accordions: Wer die
            Antwort zur Zusammenarbeit gelesen hat, hat sie wieder zugeklappt,
            bevor er handelt. Als Link und nicht als --cta-Knopf – die Farbe
            gehoert dem Kopfzeilen-Aufruf. */}
        <div className="mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/demo">Kennenlernen vereinbaren</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
