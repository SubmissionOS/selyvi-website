import type { ReactNode } from "react";

import { PRODUCT_NAME } from "@/config/brand";
import {
  IMPRINT_TEXT_REVIEW,
  OPERATOR_REVIEW,
  imprint,
  imprintTextSections,
} from "@/config/legal";
import { ReviewMarker } from "@/components/ui/review-marker";

/**
 * Strukturierte Darstellung der Impressumsangaben.
 *
 * Die Werte kommen aus src/config/legal.ts und sind echt. Der einzige offene
 * Punkt ist die Vorläufigkeit der Betreiberangabe – sie steht als
 * Transparenz-Zeile ganz oben, nicht versteckt zwischen den Feldern.
 *
 * Auszeichnung als <dl>: Bezeichnung und Wert gehoeren zusammen, und
 * Screenreader koennen die Paare als solche ausgeben.
 *
 * KEIN Registereintrag: Einzelunternehmen ohne Kaufmannseigenschaft sind nicht
 * eingetragen. Die Rubrik fehlt deshalb ganz, statt leer dazustehen.
 */
function Row({ label, value }: { label: string; value: string }) {
  if (value.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-6">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-ink sm:col-span-2">{value}</dd>
    </div>
  );
}

/**
 * Bewusst ein <div> und keine <section>: Zusaetzliche Landmarks auf einer
 * Seite dieser Laenge wuerden die Landmark-Navigation eher verstopfen als
 * helfen. Die Gliederung traegt die Ueberschriften-Hierarchie.
 */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function ImprintDetails() {
  return (
    <div className="mt-12 max-w-3xl space-y-12">
      {/* Transparenz-Zeile: wer hinter dem Angebot steht, bevor die Felder
          kommen. Der Marker macht die Vorlaeufigkeit sichtbar, ohne die
          Richtigkeit der Angaben infrage zu stellen. */}
      <div className="rounded-xl border border-gray-200 bg-surface-alt p-6">
        <p className="text-ink">
          {PRODUCT_NAME} ist ein Angebot von Rafael Gutmann (GuddiWeb).
        </p>
        <p className="mt-3 text-sm">
          <ReviewMarker note={OPERATOR_REVIEW} />
        </p>
      </div>

      <Block title="Angaben gemäß § 5 DDG">
        <dl className="divide-y divide-gray-200">
          <Row label="Anbieter" value={imprint.companyName} />
          <Row label="Straße" value={imprint.street} />
          <Row label="PLZ und Ort" value={imprint.zipCity} />
          <Row label="Land" value={imprint.country} />
        </dl>
      </Block>

      <Block title="Kontakt">
        <dl className="divide-y divide-gray-200">
          <Row label="Telefon" value={imprint.phone} />
          <Row label="E-Mail" value={imprint.email} />
        </dl>
      </Block>

      <Block title="Umsatzsteuer-ID">
        <p className="text-gray-500">
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        </p>
        <p className="mt-2 text-ink">{imprint.vatId}</p>
      </Block>

      <Block title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p className="text-ink">{imprint.contentResponsible}</p>
      </Block>

      {imprintTextSections.map((section) => (
        <Block key={section.title} title={section.title}>
          {section.body.length > 0 ? (
            <div className="space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-gray-500">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm">
              <ReviewMarker note={IMPRINT_TEXT_REVIEW} />
            </p>
          )}
        </Block>
      ))}
    </div>
  );
}
