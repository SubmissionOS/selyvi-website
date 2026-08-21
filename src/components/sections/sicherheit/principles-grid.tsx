import { Ban, Cpu, FileText, KeyRound, Lock, Server, Trash2, UserX } from "lucide-react";

import { PRODUCT_NAME } from "@/config/brand";
import {
  DATA_SEPARATION_NOTE,
  PRODUCT_HOSTING_NOTE,
  WEBSITE_HOSTING_NOTE,
} from "@/config/product";

/**
 * Sektion 2 – Prinzipien-Grid.
 *
 * Jede Karte sagt nur, was HEUTE stimmt. Wo eine Zusage noch nicht gedeckt war,
 * steht jetzt entweder die abgeschwächte Tatsache oder eine Ankündigung mit
 * Zeitpunkt – keine Zusicherung ohne Grundlage.
 *
 * Besonders die Karte „KI-Verarbeitung“: Dort steht ABSICHTLICH keine Zusage,
 * dass Daten nicht fuer Training verwendet werden. Solche Zusicherungen haengen
 * an den Vertraegen mit den Modell-Anbietern. Eine Aussage dazu darf hier erst
 * stehen, wenn sie vertraglich belegt ist – genau danach fragt jede
 * Datenschutzbeauftragte zuerst, und eine ungedeckte Zusage an dieser Stelle
 * beendet die Pruefung.
 *
 * Was noch aussteht, steht im README unter NACH-LAUNCH-LISTE, nicht auf der
 * Seite.
 */
const principles = [
  {
    icon: Server,
    title: "Hosting dieser Website",
    // Belegt: die Serverregion fra1 steht in vercel.json.
    description: WEBSITE_HOSTING_NOTE,
  },
  {
    icon: FileText,
    title: "Hosting der Anwendung",
    // GETRENNT von der Karte darueber, und das ist der Punkt: Die Anwendung
    // laeuft heute NICHT in Deutschland. Eine gemeinsame Karte „EU-Hosting"
    // stand hier bis zum Abgleich mit dem Produktstand und gab damit fuer das
    // Produkt eine Zusage, die es nicht gibt.
    description: PRODUCT_HOSTING_NOTE,
  },
  {
    icon: Lock,
    title: "Verschlüsselung",
    // Auf die belegbare Aussage gekuerzt: TLS ist gesetzt. Zur Verschluesselung
    // ruhender Daten wird bewusst nichts behauptet.
    description: "Die Übertragung erfolgt ausschließlich verschlüsselt (TLS).",
  },
  {
    icon: KeyRound,
    title: "Strikte Datentrennung",
    // Ersetzt die fruehere Ankuendigungs-Karte „Rollen & Rechte". Das Modell
    // steht – und zwar restriktiver, als eine Schule erwartet.
    description: `${DATA_SEPARATION_NOTE} Eine Rolle mit Gesamtsicht auf die Daten mehrerer Lehrkräfte gibt es nicht.`,
  },
  {
    icon: Ban,
    title: "Keine Datenweitergabe",
    description:
      "Schülerdaten werden nicht verkauft und nicht zu Werbezwecken verarbeitet.",
  },
  {
    icon: UserX,
    title: "Kein Eltern- oder Schülerzugang",
    description: `${PRODUCT_NAME} ist ein Werkzeug für Lehrkräfte und Schulleitung. Konten für Eltern oder Kinder gibt es bewusst nicht.`,
  },
  {
    icon: Cpu,
    title: "KI-Verarbeitung",
    description: `${PRODUCT_NAME} setzt KI-Modelle ein, um aus den Beobachtungen einer Lehrkraft Texte und Unterrichtsmaterial zu erzeugen. Die genauen Verarbeitungsdetails unserer KI-Komponenten veröffentlichen wir hier vor dem Start.`,
  },
  {
    icon: Trash2,
    title: "Löschkonzept",
    description:
      "Aufbewahrungs- und Löschfristen veröffentlichen wir vor dem Produktstart.",
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
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
