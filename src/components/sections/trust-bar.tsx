import { Check } from "lucide-react";

import { PRACTICE_CLAIM_SHORT } from "@/config/brand";

/**
 * Sektion 2 – Trust-Zeile.
 *
 * Schmale Leiste ohne eigene Ueberschrift: aria-label haelt die Sektion fuer
 * Screenreader benannt, ohne eine ueberfluessige Ebene in die
 * Ueberschriften-Hierarchie einzuziehen.
 */
const trustPoints = [
  "DSGVO-konform",
  "Server in der EU",
  // Kurzform der kanonischen Praxis-Aussage – Quelle ist src/config/brand.ts.
  PRACTICE_CLAIM_SHORT,
];

export function TrustBar() {
  return (
    <section
      aria-label="Vertrauensmerkmale"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-5 lg:px-8">
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-2">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2.5">
              <Check aria-hidden="true" className="size-4 shrink-0 text-brand-600" />
              <span className="text-sm text-ink">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
