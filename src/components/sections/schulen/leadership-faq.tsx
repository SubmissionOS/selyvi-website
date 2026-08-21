import { PRODUCT_NAME } from "@/config/brand";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

/**
 * Sektion 6 – FAQ für Schulleitungen.
 *
 * Andere Fragen als auf der Startseite, gleiche Darstellung (FaqAccordion).
 * Die Preisantwort ist wortgleich mit der Startseite – zwei unterschiedliche
 * Formulierungen zur selben Frage laden zu Missverstaendnissen ein.
 */
const faqItems: FaqItem[] = [
  {
    question: `Was kostet ${PRODUCT_NAME} für unsere Schule?`,
    answer: "Preise werden aktuell mit Pilotschulen festgelegt – sprechen Sie uns an.",
  },
  {
    question: "Müssen Personalrat und Datenschutzbeauftragte einbezogen werden?",
    answer:
      "Das empfehlen wir ausdrücklich. Die Einführung einer Software, die personenbezogene Daten von Lehrkräften sowie Schülerinnen und Schülern verarbeitet, berührt die Zuständigkeit beider Seiten.",
  },
];

export function LeadershipFaq() {
  return (
    <section
      aria-labelledby="schulleitung-faq-titel"
      className="border-b border-gray-200"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="schulleitung-faq-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Fragen aus Schulleitungen
        </h2>

        <div className="mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} idPrefix="schulleitung-faq" />
        </div>
      </div>
    </section>
  );
}
