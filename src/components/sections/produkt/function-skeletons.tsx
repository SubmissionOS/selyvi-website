import type { ReactNode } from "react";

/**
 * Abstrakte Interface-Skelette zu den vier Funktionsblöcken.
 *
 * Gleiche Regel wie beim Hero-Mockup der Startseite: NUR Flächen. Keine
 * erfundenen Texte, Namen, Noten, Zahlen oder Diagramme – auch nicht als
 * „Beispiel“. Gezeigt wird ausschliesslich, wie eine Ansicht aufgebaut ist.
 *
 * Jedes Skelett ist als Ganzes ein Bild (role="img" + aria-label nach dem
 * Muster der Startseite); die Einzelflächen bleiben fuer Screenreader
 * unsichtbar. Die aria-labels beschreiben die Anordnung und sagen ausdruecklich
 * dazu, dass keine echten Inhalte zu sehen sind.
 */
function SkeletonPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="rounded-xl border border-gray-200 bg-surface p-6"
    >
      {children}
    </div>
  );
}

/** a) Korrektur-Assistenz: Abgabe links, Vorschlag mit Aktionen darunter. */
export function CorrectionSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Korrekturansicht: Text einer Abgabe mit einer hervorgehobenen Stelle, darunter ein Vorschlagsfeld mit zwei Schaltflächen. Ohne echte Inhalte.">
      <div className="space-y-2.5">
        <div className="h-2.5 w-full rounded bg-gray-200" />
        <div className="h-2.5 w-11/12 rounded bg-gray-200" />
        <div className="h-2.5 w-3/4 rounded bg-brand-100" />
        <div className="h-2.5 w-full rounded bg-gray-200" />
        <div className="h-2.5 w-5/6 rounded bg-gray-200" />
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-surface-alt p-4">
        <div className="h-2.5 w-24 rounded bg-brand-100" />
        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-2/3 rounded bg-gray-200" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-20 rounded-md bg-brand-100" />
          <div className="h-7 w-20 rounded-md border border-gray-200 bg-surface" />
        </div>
      </div>
    </SkeletonPanel>
  );
}

/** b) Leistungsdokumentation: Tabelle aus Zeilen je Kind und Spalten je Erfassung. */
export function DocumentationSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Leistungsübersicht: eine Tabelle mit einer Zeile je Eintrag und mehreren Spalten. Ohne echte Inhalte.">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-3">
        <div className="h-2.5 w-28 rounded bg-gray-200" />
        <div className="ml-auto flex gap-2">
          <div className="h-2.5 w-8 rounded bg-gray-200" />
          <div className="h-2.5 w-8 rounded bg-gray-200" />
          <div className="h-2.5 w-8 rounded bg-gray-200" />
          <div className="h-2.5 w-8 rounded bg-gray-200" />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="flex items-center gap-4 py-3">
            <div className="size-6 shrink-0 rounded-full bg-surface-alt" />
            <div className="h-2.5 w-24 rounded bg-gray-200" />
            <div className="ml-auto flex gap-2">
              <div className="size-6 rounded bg-brand-100" />
              <div className="size-6 rounded bg-surface-alt" />
              <div className="size-6 rounded bg-brand-100" />
              <div className="size-6 rounded bg-surface-alt" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonPanel>
  );
}

/** c) Unterrichtsorganisation: Monatsraster links, Aufgabenliste rechts. */
export function OrganisationSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Organisationsansicht: ein Kalenderraster und daneben eine Liste von Einträgen mit Fristen. Ohne echte Inhalte.">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="h-2.5 w-20 rounded bg-gray-200" />
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }, (_, cell) => (
              <div
                key={cell}
                className={
                  cell === 9 || cell === 16 || cell === 23
                    ? "aspect-square rounded bg-brand-100"
                    : "aspect-square rounded bg-surface-alt"
                }
              />
            ))}
          </div>
        </div>

        <div>
          <div className="h-2.5 w-24 rounded bg-gray-200" />
          <div className="mt-4 space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-2.5"
              >
                <div className="size-4 shrink-0 rounded bg-brand-100" />
                <div className="h-2 flex-1 rounded bg-gray-200" />
                <div className="h-2 w-8 shrink-0 rounded bg-surface-alt" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonPanel>
  );
}

/** d) Datenschutz: Rollenzeilen mit Berechtigungsschaltern. */
export function PrivacySkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Rechteverwaltung: eine Liste von Rollen, je Rolle mehrere Berechtigungsschalter. Ohne echte Inhalte.">
      <div className="h-2.5 w-28 rounded bg-gray-200" />

      <div className="mt-5 space-y-3">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-3"
          >
            <div className="size-7 shrink-0 rounded-md bg-surface-alt" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-2.5 w-1/2 rounded bg-gray-200" />
              <div className="h-2 w-1/3 rounded bg-surface-alt" />
            </div>
            <div className="flex shrink-0 gap-1.5">
              <div className="h-5 w-9 rounded-full bg-brand-100" />
              <div className="h-5 w-9 rounded-full bg-surface-alt" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonPanel>
  );
}
