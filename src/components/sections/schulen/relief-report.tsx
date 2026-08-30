import { FileDown } from "lucide-react";

import { IMPACT_LINE_PRINCIPLE } from "@/config/product";

import { SteeringScene } from "@/components/scenes/produkt/steering-scene";
import { SampleDataNote } from "@/components/scenes/sample-data-note";

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
 *      belegte Wirkung. Der Grundsatz dazu kommt aus IMPACT_LINE_PRINCIPLE
 *      und steht wortgleich auf /forschung. Er wird hier NICHT eingeleitet:
 *      Die Konstante sagt selbst, wo der Satz im Produkt steht.
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

          {/* Dieselbe Komponente wie der Steuerungs-Block auf /produkt, nur in
              der grossen Ausführung. KEINE Kopie: Zahl, Schätzwert-Hinweis und
              Erhebungs-Zeile dürfen zwischen den beiden Seiten nicht
              auseinanderlaufen. */}
          <div className="lg:pt-4">
            <SteeringScene size="large" />
            <SampleDataNote excerpt />

            {/* Der Bruchteil-Hinweis. Die Seitenleiste der Szene zeigt fuenf
                Leitungsbereiche, erklaert wird hier einer – das gehoert
                gesagt, und zwar als Feststellung, nicht als Anreisser. */}
            <p className="mt-2 text-xs text-gray-500">
              Der Entlastungsbericht ist eine von mehreren Auswertungen im Leitungsmodus.
            </p>
          </div>
        </div>

        {/* Die beiden Einschränkungen standen bis zur Einführung der Szene als
            eigene Karten rechts. Sie bleiben als Fliesstext erhalten, weil die
            Szene aria-hidden ist und ihren Inhalt nur als Bildbeschreibung
            trägt – wer sie hier streicht, streicht sie aus der Seite. */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <p className="text-gray-500">
            <span className="font-medium text-ink">Bewusst ohne Euro-Betrag.</span>{" "}
            Grundlage der Berechnung sind hinterlegte Minutenannahmen. Die sind als
            Schätzwerte gekennzeichnet und werden nicht zu einer Summe hochgerechnet, die
            einer Nachfrage nicht standhält.
          </p>

          <p className="text-gray-500">
            <span className="font-medium text-ink">Die Wirkungszeile.</span>{" "}
            {IMPACT_LINE_PRINCIPLE} Denn eingesparte Stunden sind eine Prozesskennzahl,
            kein Wirkungsnachweis.
          </p>
        </div>
      </div>
    </section>
  );
}
