import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";

/**
 * Sektion – FAQ zu Datenschutz und Sicherheit.
 *
 * Die Antworten sind deckungsgleich mit den Karten im Prinzipien-Grid und
 * sagen nur, was heute stimmt.
 *
 * Die erste Frage ist die, die in jeder Pruefung zuerst gestellt wird. Die
 * Antwort verweigert die Zusage ausdruecklich, statt sie zu geben – solange
 * die Vertraege mit den Modell-Anbietern nicht geprueft sind, waere jede
 * andere Formulierung eine Behauptung ins Blaue. Genau diese Zurueckhaltung
 * ist die belastbare Antwort, nicht eine Luecke.
 */
const faqItems: FaqItem[] = [
  {
    question: "Werden Daten meiner Schülerinnen und Schüler für KI-Training verwendet?",
    answer:
      "Diese Frage beantworten wir erst, wenn die Verträge mit unseren Modell-Anbietern geprüft sind. Eine Zusicherung ohne vertragliche Grundlage wäre an dieser Stelle wertlos – gerade hier. Den aktuellen Stand finden Sie oben im Abschnitt „KI-Verarbeitung“.",
  },
  {
    question: "Wo werden die Daten gespeichert?",
    answer:
      "In Rechenzentren innerhalb der EU, Serverstandort Frankfurt. Die Übertragung erfolgt ausschließlich verschlüsselt (TLS).",
  },
  {
    question: "Wer hat Zugriff?",
    answer:
      "Innerhalb Ihrer Schule regelt das ein Rollen- und Rechtemodell, über das wir gerade entscheiden. Sobald es steht, finden Sie hier, welche Rolle welche Daten einsehen kann und welche nicht.",
  },
  {
    question: "Was passiert bei Vertragsende mit den Daten?",
    answer:
      "Aufbewahrungs- und Löschfristen veröffentlichen wir vor dem Produktstart – einschließlich der Frist, in der Daten nach Vertragsende gelöscht werden.",
  },
];

export function SecurityFaq() {
  return (
    <section
      aria-labelledby="sicherheit-faq-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="sicherheit-faq-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Häufige Fragen aus der Prüfung
        </h2>

        <div className="mt-12 max-w-3xl">
          <FaqAccordion items={faqItems} idPrefix="sicherheit-faq" />
        </div>
      </div>
    </section>
  );
}
