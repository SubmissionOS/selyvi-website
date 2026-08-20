import { ReviewMarker } from "@/components/ui/review-marker";

/**
 * Sektion 3 – Transparenz-Tabelle der Auftragsverarbeiter.
 *
 * LAUNCH-BLOCKER. Die Tabelle steht hier mit Kopfzeile, aber ohne Zeilen:
 * Struktur und Zusage sind sichtbar, es steht nur noch kein Firmenname darin.
 *
 * KEINE Namen eintragen, bevor die Liste bestaetigt ist – auch keine
 * „wahrscheinlichen“. Eine Subprozessoren-Liste ist eine Rechtsauskunft nach
 * Art. 28 Abs. 2 DSGVO; ein falscher Eintrag ist schlimmer als ein fehlender,
 * weil Schulen ihre eigenen Verzeichnisse darauf aufbauen.
 */
export function SubprocessorsTable() {
  return (
    <section
      aria-labelledby="dienstleister-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="dienstleister-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Unsere Dienstleister (Auftragsverarbeiter)
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Wir setzen Dienstleister ein, die in unserem Auftrag personenbezogene Daten
          verarbeiten. Die vollständige Liste veröffentlichen wir hier, bevor der Dienst
          startet – mit Name, Zweck und Verarbeitungsort.
        </p>

        {/* Breite Tabellen scrollen in ihrem eigenen Container, damit die Seite
            auf schmalen Viewports nicht horizontal scrollt. */}
        <div className="mt-12 overflow-x-auto rounded-xl border border-gray-200 bg-surface">
          <table className="w-full min-w-lg border-collapse text-left">
            <caption className="sr-only">
              Auftragsverarbeiter mit Zweck und Verarbeitungsort. Die Liste wird derzeit
              zusammengestellt.
            </caption>

            <thead>
              <tr className="border-b border-gray-200">
                <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink">
                  Dienst
                </th>
                <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink">
                  Zweck
                </th>
                <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink">
                  Standort
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={3} className="px-6 py-8 text-sm text-gray-500">
                  <ReviewMarker note="vollständige Subprozessoren-Liste vor Launch – erwartet werden mindestens Hosting, E-Mail-Versand, KI-Anbieter" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
