import Link from "next/link";
import { Check } from "lucide-react";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Rechte Spalte der Demo-Seite.
 *
 * Die drei Datenschutz-Punkte sind wortgleich aus den bestehenden Komponenten
 * uebernommen (Trust-Zeile der Startseite, DSGVO-Block, /datenschutz-sicherheit).
 * Eine vierte Formulierung derselben Zusagen waere genau die Stelle, an der
 * eine Datenschutzbeauftragte Widersprueche findet.
 */
const steps = [
  {
    title: "Anfrage",
    description:
      "Sie schildern kurz, worum es geht. Wir melden uns zur Terminabstimmung.",
  },
  {
    title: "Persönliche Demo",
    description:
      "20 Minuten an der echten Oberfläche. Ihre Fragen bestimmen, was wir zeigen.",
  },
  {
    title: "Pilotgespräch",
    description:
      "Wenn es passt, sprechen wir über eine Pilotphase an Ihrer Schule. Ohne Verpflichtung.",
  },
];

const privacyPoints = [
  // „Server in der EU" stand hier bis zum Abgleich mit dem Produktstand und war
  // fuer das Produkt nicht gedeckt. An dieser Stelle – kurz vor dem Absenden
  // eines Formulars – waere eine ungedeckte Zusage besonders unglücklich.
  "Strikte Datentrennung: jede Lehrkraft sieht nur ihre eigenen Daten",
  "Kein Eltern- oder Schülerportal",
  "Keine Weitergabe von Schülerdaten",
];

export function NextSteps() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-semibold text-ink">So geht es weiter</h2>

        <ol className="mt-6 space-y-6">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-medium text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Dritter Einstieg zu /mitgestalten – die Seite hat bewusst keinen
          Navigationspunkt. Sie steht hier, weil manche gar keine Demo wollen,
          sondern mitbauen: Der Hinweis gehoert neben den Ablauf und nicht
          hinter das abgeschickte Formular. */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-ink">Lieber gleich mitbauen?</h2>

        <p className="mt-3 text-sm text-gray-500">
          Wenn Sie {PRODUCT_NAME} nicht nur sehen, sondern mitentwickeln wollen, führt
          dieser Weg direkter dorthin.
        </p>

        <Link
          href="/mitgestalten"
          className="mt-4 inline-block text-sm text-brand-600 underline underline-offset-4"
        >
          {PRODUCT_NAME} mitgestalten
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-surface-alt p-6">
        <h2 className="text-sm font-semibold text-ink">Datenschutz</h2>

        <ul className="mt-4 space-y-3">
          {privacyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand-600"
              />
              <span className="text-sm text-gray-500">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
