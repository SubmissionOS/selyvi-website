import { PRODUCT_NAME, SCHOOL_TYPE_ANSWER } from "@/config/brand";
import { DATA_SEPARATION_NOTE } from "@/config/product";
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
    answer: `${PRODUCT_NAME} ist die KI-Assistenz für Lehrkräfte. Sie nimmt Beobachtungen aus dem Unterricht auf – getippt oder diktiert – und macht daraus Zeugnisbemerkungen, Elternmails und Unterrichtsmaterial.`,
  },
  {
    // Diese Frage war eine Zeit lang entfernt, weil die Antwort nicht
    // feststand. Sie steht fest – und seit dem 02.09.2026 weiter als vorher:
    // alle Schularten, Klasse 1 bis Abitur.
    question: "Für welche Schulformen ist es gedacht?",
    // Geteilte Formulierung – Quelle ist src/config/brand.ts.
    answer: SCHOOL_TYPE_ANSWER,
  },
  {
    // Fruehere Antwort: „Über das Rollen- und Rechtekonzept entscheiden wir
    // gerade." Das Modell steht – und zwar restriktiver, als Interessierte
    // erwarten. Genau deshalb gehoert es hierher und nicht ins Kleingedruckte.
    question: "Wer sieht die Daten meiner Klasse?",
    answer: `${DATA_SEPARATION_NOTE} Eine Rolle mit Gesamtsicht auf die Daten mehrerer Lehrkräfte gibt es nicht. Die Schulleitung sieht ausgewertete Kennzahlen zur Nutzung – keine einzelnen Beobachtungen.`,
  },
  {
    question: "Brauchen Eltern oder Kinder einen Zugang?",
    answer: `Nein. ${PRODUCT_NAME} ist ein reines Werkzeug für Lehrkräfte und Schulleitung – es gibt bewusst kein Eltern- oder Schülerportal.`,
  },
  {
    // Regel C: „Preise werden aktuell mit Pilotschulen festgelegt" sagt in
    // sieben Wörtern, dass es weder Preisliste noch Kundschaft gibt. Der Satz
    // beschreibt jetzt, WIE der Preis zustande kommt.
    // Weiterhin gedeckt: Der Produktstand nennt keinen Preis, und dieser Satz
    // nennt auch keinen – er nennt den Weg zu ihm.
    question: "Was kostet es?",
    answer:
      "Den Preis besprechen wir im Erstgespräch – zusammen mit dem Umfang, den Ihre Schule braucht.",
  },
  {
    question: `Ersetzt ${PRODUCT_NAME} meine Bewertung?`,
    answer: `Nein. Jeder Vorschlag ist ein Vorschlag – jede Entscheidung bleibt bei der Lehrkraft. Kompetenzeinschätzungen leitet ${PRODUCT_NAME} bewusst nicht automatisch aus Noten ab: Aus einer Deutschnote folgt nicht, ob ein Kind flüssig liest.`,
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
        {/* Zweispaltig ab lg: Überschrift links, Antworten rechts.
            Vorher stand hier ein 672 px breiter Fragenstapel in einem
            1088 px breiten Container – die halbe Bildschirmbreite blieb
            leer. Die Überschrift klebt beim Scrollen, damit auch weit
            unten in der Liste noch dasteht, welche Fragen das sind. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2
                id="faq-titel"
                className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Häufige Fragen
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={faqItems} idPrefix="faq" />
          </div>
        </div>
      </div>
    </section>
  );
}
