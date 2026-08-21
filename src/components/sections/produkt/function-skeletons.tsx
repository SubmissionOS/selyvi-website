import type { ReactNode } from "react";

/**
 * Abstrakte Interface-Skelette zu den vier Funktionsblöcken.
 *
 * Gleiche Regel wie beim Hero-Mockup der Startseite: NUR Flächen. Keine
 * erfundenen Texte, Namen, Noten, Zahlen oder Diagramme – auch nicht als
 * „Beispiel“. Gezeigt wird ausschliesslich, wie eine Ansicht aufgebaut ist.
 *
 * Das gilt hier besonders fuer das Steuerungs-Skelett: Der Entlastungsbericht
 * nennt eingesparte Stunden, und eine erfundene Zahl in einer Illustration
 * waere genau die Zahl, die jemand zitiert.
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

/** a) Dokumentation: erfasste Notiz oben, darunter die Timeline eines Kindes. */
export function ObservationSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Beobachtungsansicht: ein Eingabefeld mit Aufnahmeschaltfläche, darunter eine chronologische Liste von Einträgen. Ohne echte Inhalte.">
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-surface-alt p-3">
        <div className="size-8 shrink-0 rounded-full bg-brand-100" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-2.5 w-full rounded bg-gray-200" />
          <div className="h-2.5 w-2/3 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="size-3 shrink-0 rounded-full bg-brand-100" />
              {row < 3 ? <div className="mt-1 w-px flex-1 bg-gray-200" /> : null}
            </div>
            <div className="min-w-0 flex-1 space-y-2 pb-1">
              <div className="h-2.5 w-1/3 rounded bg-gray-200" />
              <div className="h-2 w-3/4 rounded bg-surface-alt" />
            </div>
            <div className="h-5 w-12 shrink-0 rounded-full bg-surface-alt" />
          </div>
        ))}
      </div>
    </SkeletonPanel>
  );
}

/** b) Kommunikation: Textentwurf, darunter die Zeile der Zielsprachen. */
export function CommunicationSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Textansicht: ein zusammenhängender Textentwurf, darunter eine Reihe auswählbarer Sprachen. Ohne echte Inhalte.">
      <div className="space-y-2.5">
        <div className="h-2.5 w-1/3 rounded bg-brand-100" />
        <div className="mt-4 h-2.5 w-full rounded bg-gray-200" />
        <div className="h-2.5 w-11/12 rounded bg-gray-200" />
        <div className="h-2.5 w-full rounded bg-gray-200" />
        <div className="h-2.5 w-4/5 rounded bg-gray-200" />
        <div className="h-2.5 w-2/3 rounded bg-gray-200" />
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 rounded-full bg-brand-100" />
          <div className="h-6 w-14 rounded-full bg-surface-alt" />
          <div className="h-6 w-20 rounded-full bg-surface-alt" />
          <div className="h-6 w-16 rounded-full bg-surface-alt" />
          <div className="h-6 w-12 rounded-full bg-surface-alt" />
        </div>
      </div>
    </SkeletonPanel>
  );
}

/** c) Unterricht: erzeugtes Material links, ausgewiesene Fundstellen rechts. */
export function MaterialSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung der Materialansicht: links ein erzeugtes Arbeitsblatt, rechts eine Liste der Fundstellen, aus denen es entstanden ist. Ohne echte Inhalte.">
      <div className="grid gap-5 sm:grid-cols-5">
        <div className="space-y-2.5 sm:col-span-3">
          <div className="h-2.5 w-2/3 rounded bg-gray-200" />
          <div className="mt-4 h-2 w-full rounded bg-surface-alt" />
          <div className="h-2 w-full rounded bg-surface-alt" />
          <div className="h-2 w-3/4 rounded bg-surface-alt" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="h-10 rounded border border-gray-200" />
            <div className="h-10 rounded border border-gray-200" />
            <div className="h-10 rounded border border-gray-200" />
            <div className="h-10 rounded border border-gray-200" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="h-2.5 w-20 rounded bg-gray-200" />
          <div className="mt-4 space-y-2.5">
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="flex items-center gap-2 rounded border border-gray-200 p-2"
              >
                <div className="size-3 shrink-0 rounded-sm bg-brand-100" />
                <div className="h-2 flex-1 rounded bg-surface-alt" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonPanel>
  );
}

/** d) Steuerung: Kennzahlfelder oben, Monatsverlauf darunter – ohne Zahlen. */
export function LeadershipSkeleton() {
  return (
    <SkeletonPanel label="Schematische Darstellung des Entlastungsberichts: drei Kennzahlfelder, darunter ein Balkenverlauf über mehrere Monate. Ohne echte Inhalte und ohne Zahlen.">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((tile) => (
          <div key={tile} className="rounded-lg border border-gray-200 p-3">
            <div className="h-2 w-10 rounded bg-surface-alt" />
            <div className="mt-3 h-4 w-12 rounded bg-brand-100" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex h-32 items-end gap-2.5 border-b border-gray-200 pb-px">
        <div className="h-12 flex-1 rounded-t bg-gray-200" />
        <div className="h-16 flex-1 rounded-t bg-gray-200" />
        <div className="h-10 flex-1 rounded-t bg-gray-200" />
        <div className="h-20 flex-1 rounded-t bg-gray-200" />
        <div className="h-24 flex-1 rounded-t bg-brand-100" />
        {/* Letzter Balken heller: der laufende Monat ist im Produkt als
            unvollstaendig markiert, nicht als Trend lesbar. */}
        <div className="h-8 flex-1 rounded-t bg-surface-alt" />
      </div>
    </SkeletonPanel>
  );
}
