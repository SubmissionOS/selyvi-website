import { FileDown } from "lucide-react";

/**
 * Sektion – Der Entlastungsbericht.
 *
 * Das stärkste Argument dieser Seite, und zwar aus einem bestimmten Grund:
 * Er ist das Dokument, das eine Schulleitung ihrem Schulträger vorlegen kann.
 * Damit haengt eine Verlaengerung nicht allein an der Zufriedenheit einzelner
 * Lehrkraefte.
 *
 * ZWEI EINSCHRAENKUNGEN STEHEN BEWUSST MIT DRIN, obwohl sie das Argument
 * schwaechen:
 *
 *   1. Kein Euro-Betrag. Die Grundlage sind hinterlegte Minutenannahmen; die
 *      sind im Produkt als Schaetzwerte gekennzeichnet. Eine hochgerechnete
 *      Summe waere die Zahl, die in einer Vorlage an den Schultraeger landet –
 *      und dort haelt sie keiner Nachfrage stand.
 *   2. Die Wirkungszeile. „Eingesparte Stunden" ist eine Prozesskennzahl, keine
 *      belegte Wirkung. Im Produkt steht direkt darunter ein Satz, der
 *      entweder gemessene Befragungswerte nennt oder in Klartext sagt, warum
 *      sich noch nichts sagen laesst – und er verschwindet nie.
 *
 * Beides gehoert auf die Website, weil eine Schulleitung genau hier nachfragt.
 */
const details = [
  "Eingesparte Stunden, Automatisierungsquoten und Vorgänge je Prozess",
  "Letzter abgeschlossener Monat im Vergleich zum Vormonat, der laufende Monat separat als Zwischenstand",
  "Nutzung im Kollegium als Verteilung – bewusst keine namentliche Rangliste",
];

export function ReliefReport() {
  return (
    <section
      aria-labelledby="entlastungsbericht-titel"
      className="border-b border-gray-200"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="entlastungsbericht-titel"
              className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              Der Entlastungsbericht
            </h2>

            <p className="mt-6 max-w-xl text-lg text-gray-500">
              Am Monatsende steht im Leitungsmodus, was die Anwendung dem Kollegium
              zurückgegeben hat. Als PDF exportierbar – das Dokument, das Sie Ihrem
              Schulträger vorlegen.
            </p>

            <ul className="mt-8 space-y-3">
              {details.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <FileDown
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-brand-600"
                  />
                  <span className="text-ink">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:pt-4">
            <div className="rounded-xl border border-gray-200 bg-surface-alt p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-ink">Bewusst ohne Euro-Betrag</h3>

              <p className="mt-4 text-gray-500">
                Grundlage der Berechnung sind hinterlegte Minutenannahmen. Die sind als
                Schätzwerte gekennzeichnet und werden nicht zu einer Summe hochgerechnet,
                die einer Nachfrage nicht standhält.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-surface-alt p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-ink">Die Wirkungszeile</h3>

              <p className="mt-4 text-gray-500">
                Direkt unter dem Bericht steht ein Satz zur gemessenen Wirkung. Wir zeigen
                gemessene Wirkung – oder sagen ehrlich, warum sich noch nichts sagen
                lässt. Eingesparte Stunden sind eine Prozesskennzahl, kein
                Wirkungsnachweis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
