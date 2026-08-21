import { PRODUCT_NAME } from "@/config/brand";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

/**
 * Sektion 8 – FAQ (Startseite, Zielgruppe Lehrkraft).
 *
 * Jede Antwort sagt nur, was heute stimmt. Keine erfundenen Zahlen,
 * Schulformen, Preise oder Fristen – und keine Frage, deren Antwort nur eine
 * Ankuendigung waere.
 */
const faqItems: FaqItem[] = [
  {
    question: `Was ist ${PRODUCT_NAME}?`,
    answer: `${PRODUCT_NAME} ist eine KI-Assistenz für Lehrkräfte. Sie unterstützt beim Korrigieren von Abgaben, hält Leistungsstände fest und bündelt die Organisation einer Klasse an einem Ort.`,
  },
  {
    question: "Wer sieht die Daten meiner Klasse?",
    answer:
      "Über das Rollen- und Rechtekonzept entscheiden wir gerade. Sobald es steht, finden Sie hier, welche Rolle innerhalb der Schule auf welche Daten zugreifen kann.",
  },
  {
    question: "Was kostet es?",
    answer: "Preise werden aktuell mit Pilotschulen festgelegt – sprechen Sie uns an.",
  },
  {
    question: "Ersetzt die KI meine Bewertung?",
    answer:
      "Nein. Jeder Vorschlag ist ein Vorschlag – jede Entscheidung bleibt bei der Lehrkraft.",
  },
  {
    question: "Wie starte ich?",
    answer:
      "Der Einstieg beginnt mit einer Demo. Alles Weitere – Pilotphase, Auftragsverarbeitungsvertrag, Einführung im Kollegium – besprechen wir dort mit Ihnen.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-titel" className="border-t border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="faq-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Häufige Fragen
        </h2>

        <div className="mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} idPrefix="faq" />
        </div>
      </div>
    </section>
  );
}
