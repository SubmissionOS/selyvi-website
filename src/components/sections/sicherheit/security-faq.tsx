import {
  DATA_SEPARATION_NOTE,
  PRODUCT_HOSTING_NOTE,
  WEBSITE_HOSTING_NOTE,
} from "@/config/product";
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
    // Die Antwort trennt Website und Anwendung ausdruecklich. Eine gemeinsame
    // Antwort („in der EU, Frankfurt") stand hier bis zum Abgleich mit dem
    // Produktstand und war fuer die Anwendung nicht gedeckt.
    question: "Wo werden die Daten gespeichert?",
    answer: `Für diese Website und für die Anwendung gelten unterschiedliche Antworten. ${WEBSITE_HOSTING_NOTE} Für die Anwendung gilt: ${PRODUCT_HOSTING_NOTE} Die Übertragung erfolgt in beiden Fällen ausschließlich verschlüsselt (TLS).`,
  },
  {
    question: "Wer hat Zugriff?",
    answer: `${DATA_SEPARATION_NOTE} Eine Rolle mit Gesamtsicht auf die Daten mehrerer Lehrkräfte gibt es nicht – auch nicht für die Schulleitung. Sie sieht im Leitungsmodus ausgewertete Kennzahlen zur Nutzung, keine einzelnen Beobachtungen.`,
  },
  {
    question: "Was passiert bei Vertragsende mit den Daten?",
    answer:
      "Die Daten Ihrer Schule gehören Ihrer Schule. Aufbewahrungs- und Löschfristen – einschließlich der Frist nach Vertragsende – veröffentlichen wir vor dem Produktstart an dieser Stelle.",
  },
];

export function SecurityFaq() {
  return (
    <section
      aria-labelledby="sicherheit-faq-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
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
                id="sicherheit-faq-titel"
                className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Häufige Fragen aus der Prüfung
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={faqItems} idPrefix="sicherheit-faq" />
          </div>
        </div>
      </div>
    </section>
  );
}
