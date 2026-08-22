import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/layout/wordmark";

/**
 * Fensterrahmen, in dem alle Szenen leben.
 *
 * Nachfolger des Browser-Rahmens aus <InterfaceSkeleton />, jetzt mit
 * Fensterkopf: Wortmarke, drei Punkte, eine angedeutete Pfadleiste.
 *
 * ZURÜCKHALTUNG IST ABSICHT. Der Rahmen soll die Szene fassen, nicht mit ihr
 * konkurrieren – alle Chrome-Details liegen deshalb in gray-200 und
 * surface-alt, ohne Schatten und ohne Verlauf. Farbe im Fenster hat nur, was
 * gerade passiert.
 *
 * `relative` am Inhaltsbereich ist Voraussetzung für <FakeCursor />: Der
 * Zeiger positioniert sich über `inset-0` relativ zu genau diesem Kasten.
 */
type Props = {
  children: ReactNode;
  /** Pfad in der angedeuteten Leiste, z. B. „Klasse 3b". */
  path?: string;
  className?: string;
};

export function UiWindow({ children, path, className }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-gray-200 bg-surface",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-gray-200 bg-surface-alt px-4 py-3">
        <span className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-gray-200" />
          <span className="size-2.5 rounded-full bg-gray-200" />
          <span className="size-2.5 rounded-full bg-gray-200" />
        </span>

        <Wordmark className="ml-1 text-sm" />

        {path ? (
          <span className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
            <span className="text-gray-200">/</span>
            <span className="truncate rounded-md border border-gray-200 bg-surface px-2.5 py-1 text-xs text-gray-500">
              {path}
            </span>
          </span>
        ) : (
          <span className="flex-1" />
        )}

        {/* Angedeutetes Benutzerkonto rechts – reine Fläche, kein Inhalt. */}
        <span className="size-6 shrink-0 rounded-full bg-gray-200" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
