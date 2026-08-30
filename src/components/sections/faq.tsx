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
    answer: `${PRODUCT_NAME} ist die KI-Assistenz für Grundschullehrkräfte. Sie nimmt Beobachtungen aus dem Unterricht auf – getippt oder diktiert – und macht daraus Zeugnisbemerkungen, Elternmails und Unterrichtsmaterial.`,
  },
  {
    // Diese Frage war eine Zeit lang entfernt, weil die Antwort nicht
    // feststand. Sie steht fest: Grundschule, Klassen 1–4.
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
    question: "Was kostet es?",
    answer: "Preise werden aktuell mit Pilotschulen festgelegt – sprechen Sie uns an.",
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
