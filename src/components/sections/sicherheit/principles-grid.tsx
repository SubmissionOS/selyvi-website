import { Ban, Cpu, KeyRound, Lock, Server, Trash2 } from "lucide-react";

import { PRODUCT_NAME } from "@/config/brand";
import { ReviewMarker } from "@/components/ui/review-marker";

/**
 * Sektion 2 – Prinzipien-Grid.
 *
 * Alle Marker hier sind LAUNCH-BLOCKER (siehe security-intro.tsx).
 *
 * Besonders die Karte „KI-Verarbeitung“: Dort steht ABSICHTLICH keine Zusage,
 * dass Daten nicht fuer Training verwendet werden. Solche Zusicherungen haengen
 * an den Vertraegen mit den Modell-Anbietern und an deren Verarbeitungsorten.
 * Eine Aussage dazu darf hier erst stehen, wenn sie vertraglich belegt ist –
 * genau danach fragt jede Datenschutzbeauftragte zuerst, und eine ungedeckte
 * Zusage an dieser Stelle beendet die Pruefung.
 */
const principles = [
  {
    icon: Server,
    title: "EU-Hosting",
    description:
      "Verarbeitung und Speicherung in Rechenzentren innerhalb der EU, Serverstandort Frankfurt.",
    review: "finale Hosting-Architektur bestätigen",
  },
  {
    icon: Lock,
    title: "Verschlüsselung",
    description:
      "Die Übertragung erfolgt ausschließlich über TLS. Für ruhende Daten ist Verschlüsselung vorgesehen.",
    review: "Umfang bestätigen",
  },
  {
    icon: KeyRound,
    title: "Rollen & Rechte",
    description:
      "Welche Rolle innerhalb der Schule auf welche Daten zugreifen kann, ist noch nicht entschieden. Wir tragen hier nichts ein, solange das Modell nicht abgestimmt ist.",
    review: "Rechtemodell in Abstimmung",
  },
  {
    icon: Ban,
    title: "Keine Datenweitergabe",
    description:
      "Schülerdaten werden nicht verkauft und nicht zu Werbezwecken verarbeitet.",
  },
  {
    icon: Cpu,
    title: "KI-Verarbeitung",
    description: `${PRODUCT_NAME} setzt KI-Modelle ein, um Korrekturvorschläge zu erzeugen. Die genauen Verarbeitungsdetails unserer KI-Komponenten veröffentlichen wir hier vor dem Start.`,
    review:
      "Modell-Anbieter, Verarbeitungsort und Zusicherung zur Nicht-Nutzung für Trainingszwecke – muss vor Launch mit den echten Verträgen abgeglichen werden",
  },
  {
    icon: Trash2,
    title: "Löschkonzept",
    description:
      "Aufbewahrungs- und Löschfristen werden derzeit festgelegt, einschließlich der Fristen nach Vertragsende.",
    review: "Aufbewahrungs- und Löschfristen definieren",
  },
];

export function PrinciplesGrid() {
  return (
    <section aria-labelledby="prinzipien-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="prinzipien-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Unsere Grundsätze
        </h2>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <li
                key={principle.title}
                className="rounded-xl border border-gray-200 bg-surface p-6"
              >
                <Icon aria-hidden="true" className="size-6 text-brand-600" />

                <h3 className="mt-5 text-base font-semibold text-ink">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500">{principle.description}</p>

                {principle.review ? (
                  <p className="mt-4 text-sm">
                    <ReviewMarker note={principle.review} />
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
