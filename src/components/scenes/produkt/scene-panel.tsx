import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Bühne der vier Szenen auf /produkt.
 *
 * Übernimmt Rahmen und Innenabstand der früheren statischen Skelette, damit
 * sich die Anmutung der Funktionsblöcke nicht ändert.
 *
 * FESTE HÖHE IST PFLICHT, nicht Geschmack: In diesen Szenen erscheinen
 * Bereiche nach und nach. Ohne feste Höhe wüchse der Kasten mitten im
 * Durchlauf und schöbe alles darunter nach unten – auf einer Seite mit vier
 * solchen Blöcken wäre der Cumulative Layout Shift sofort sichtbar. Die Höhe
 * wird deshalb je Szene gesetzt und ist auf den Endzustand ausgelegt.
 *
 * `relative` ist Voraussetzung für <FakeCursor />: Der Zeiger positioniert
 * sich über `inset-0` relativ zu diesem Kasten.
 */
export function ScenePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--app-radius-card)] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 sm:p-6",
        className,
      )}
      /*
       * KEIN `content-visibility: auto` hier.
       *
       * Naheliegend wäre es: Vier Bühnen liegen untereinander, beim Laden ist
       * keine davon zu sehen, und die Angabe würde deren Innenleben
       * überspringen. Gemessen bringt sie auf dieser Seite aber nichts – der
       * Lighthouse-Median blieb bei 96, der schlechteste Lauf rutschte sogar
       * von 96 auf 95. Der Engpass liegt nicht beim Malen ausserhalb des
       * Bildschirms, sondern beim JavaScript.
       *
       * Wieder entfernt, statt sie „sicherheitshalber" stehen zu lassen.
       */
    >
      {children}
    </div>
  );
}

/** Kleine Überschrift innerhalb einer Bühne. */
export function SceneLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-medium tracking-wide text-[var(--app-text-muted)] uppercase">
      {children}
    </span>
  );
}
