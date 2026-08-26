import { PRODUCT_NAME } from "@/config/brand";
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
 */
const faqItems: FaqItem[] = [
  {
    question: `Welchen Bezug hat ${PRODUCT_NAME} zu meiner Forschung?`,
    answer: `${PRODUCT_NAME} wird im laufenden Schulalltag benutzt – nicht in einer Erhebungssituation. Wenn Sie zu Unterricht, Vorbereitungspraxis oder der Arbeitsbelastung von Lehrkräften forschen, ist das ein Feldzugang, den es sonst selten gibt. Was daraus tatsächlich erhoben werden kann, steht aber noch nicht fest – und genau darüber würden wir mit Ihnen sprechen wollen.`,
  },
  {
    question: "Wie kann eine Zusammenarbeit aussehen?",
    answer:
      "Drei Formen halten wir heute für realistisch: Sie begleiten einen Piloten wissenschaftlich; Sie gestalten die Erhebungsinstrumente mit, bevor sie festgeschrieben werden; oder wir werten nach Freigabe gemeinsam aus. Was wir nicht zusagen, weil es niemand vor dem ersten Gespräch entscheiden kann: Publikationen, Autorenschaften oder exklusive Zugänge.",
  },
  {
    question: "Ab wann gibt es Datenzugänge?",
    answer:
      "Wir nennen dafür kein Datum, und das ist keine Ausweichung. Der Zugang hängt an der juristischen Prüfung der Einwilligungstexte – bis die abgeschlossen ist, sind Forschungszwecke technisch gesperrt, und der aggregierende Export ist ohnehin noch nicht gebaut. Ein genanntes Quartal wäre geraten. Wer uns schreibt, erfährt es, sobald es feststeht.",
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
        <h2
          id="forschung-faq-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Fragen aus der Forschung
        </h2>

        <div className="mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} idPrefix="forschung-faq" />
        </div>
      </div>
    </section>
  );
}
