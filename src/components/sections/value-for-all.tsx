import { PRODUCT_NAME } from "@/config/brand";
import { TRANSLATION_LANGUAGE_COUNT } from "@/config/product";

/**
 * Sektion 8 – Was Selyvi zurueckgibt.
 *
 * Steht zwischen „Was Ihnen abgenommen wird“ und dem DSGVO-Block. Die
 * Reihenfolge ist Absicht: erst die Funktionen, dann – fuer wen sich das
 * lohnt. Vorher gelesen waere die Spalte „Schultraeger“ eine Behauptung ohne
 * Grundlage.
 *
 * ==========================================================================
 * JEDER EINZELNE STICHPUNKT IST DURCH docs/produktstand-2026-08.md GEDECKT.
 * ==========================================================================
 * Die Gliederung nach Zielgruppen stammt aus docs/selyvi-kompakt.md – aber
 * jenes Dokument ist Zielbild, keine Quelle fuer Aussagen. Die dort genannten
 * Mehrwerte („bessere Planbarkeit“, „evidenzbasierte Entscheidungen“,
 * „langfristige Qualitaetsentwicklung“) sind Absichtserklaerungen und stehen
 * deshalb hier NICHT. Was steht, ist je Punkt eine als Live gefuehrte Funktion.
 *
 * Zwei Praezisierungen gegenueber dem Zielbild-Dokument:
 *   - Der Schultraeger hat KEINEN eigenen Zugang. Der Produktstand sagt: Der
 *     Entlastungsbericht ist das Dokument, das eine SCHULLEITUNG ihrem
 *     Traeger vorlegen kann. Die Spalte ist entsprechend formuliert – sonst
 *     erwartet ein Traeger im Erstgespraech einen Login, den es nicht gibt.
 *   - Die CRM-Schnittstelle (GET /export/school-usage) taucht nirgends auf.
 *     Der Produktstand fuehrt sie unter „Fuer den Vertrieb – nichts davon
 *     gehoert auf die oeffentliche Website“.
 *
 * Und es gibt bewusst KEINE vierte Spalte fuer Schuelerinnen und Schueler.
 * Es gibt kein Schuelerportal; eine eigene Spalte wuerde einen Zugang
 * suggerieren, den das Produkt nicht hat und nicht haben will. Der eine
 * Abschlusssatz sagt das Wesentliche, ohne etwas zu versprechen.
 */
type ValueColumn = {
  audience: string;
  headline: string;
  points: string[];
};

const columns: ValueColumn[] = [
  {
    audience: "Für Lehrkräfte",
    headline: "Die Schreibarbeit, nicht das Urteil.",
    points: [
      "Zeugnistexte entstehen aus der eigenen Dokumentation – im eigenen Schreibstil",
      `Elternpost in Minuten, auf Wunsch in ${TRANSLATION_LANGUAGE_COUNT} Sprachen`,
      "Material, das zur eigenen Klasse passt – mit ausgewiesenen Quellen",
    ],
  },
  {
    audience: "Für Schulleitungen",
    headline: "Überblick, der niemanden vorführt.",
    points: [
      "Der Entlastungsbericht zeigt die gewonnene Zeit, Monat für Monat",
      "Nutzung im Kollegium als Verteilung – nie als namentliche Rangliste",
      "Trends über echte Monate; der laufende Monat ist als „läuft“ markiert",
    ],
  },
  {
    audience: "Für Schulträger",
    headline: "Etwas Vorlegbares statt Bauchgefühl.",
    points: [
      "Die Schulleitung kann den Entlastungsbericht als PDF vorlegen",
      "Geschätzte Zahlen sind als Schätzwerte gekennzeichnet, nicht als Messwerte",
      "Die Wirkungsmessung ist im Aufbau – der Stand steht im Klartext dabei",
    ],
  },
];

export function ValueForAll() {
  return (
    <section
      aria-labelledby="zurueckgibt-titel"
      className="border-t border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="zurueckgibt-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Was {PRODUCT_NAME} zurückgibt
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {columns.map((column) => (
            <div key={column.audience}>
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {column.audience}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-ink">{column.headline}</h3>

              <ul className="mt-5 space-y-3">
                {column.points.map((point) => (
                  <li
                    key={point}
                    className="border-l-2 border-gray-200 pl-4 text-base text-gray-500"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Abschlusszeile ueber die volle Breite – bewusst KEINE vierte Spalte.
            Siehe Kopfkommentar: ein Schuelerportal gibt es nicht. */}
        <p className="mt-14 border-t border-gray-200 pt-10 text-lg text-ink">
          Und die Kinder? Profitieren indirekt – von einer Lehrkraft, die wieder Zeit für
          sie hat.
        </p>
      </div>
    </section>
  );
}
