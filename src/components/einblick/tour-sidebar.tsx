"use client";

import {
  BookMarked,
  CalendarDays,
  ClipboardList,
  Files,
  FolderOpen,
  LayoutGrid,
  Lock,
  Mail,
  NotebookPen,
  ScrollText,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Die BEDIENBARE Seitenleiste des Einblicks – und der Hauptweg durch ihn.
 *
 * Sie sieht aus wie die Leiste in den Szenen, ist aber das Gegenteil: dort
 * tote Dekoration (aria-hidden, keine Schalter), hier echte Buttons. Deshalb
 * eine eigene Komponente und kein Umbau der Szenen-Leiste – siehe `navSlot`
 * in ui-window.tsx.
 *
 * ==========================================================================
 * SIEBEN OFFEN, VIER GESPERRT
 * ==========================================================================
 * Offen sind die Bereiche, in denen es etwas zu TUN gibt. Gesperrt bleiben
 * Klassen, Entwürfe, Dokumente und Bibliothek – und der Leitungsmodus im
 * Fensterkopf. Eine Umgebung, die alles zeigt, hätte keinen Grund mehr für
 * ein Gespräch; eine, die die Sperren versteckt, wäre unehrlich.
 *
 * Die gesperrten Einträge sind trotzdem BUTTONS und keine toten <span>: Sie
 * tun etwas (sie erklären sich), und damit gehören sie in die Tab-Reihenfolge.
 * Ein Hinweis, den nur die Maus erreicht, ist kein Hinweis.
 *
 * ==========================================================================
 * DER ZÄHLER
 * ==========================================================================
 * Neben „Beobachtungen" steht, wie viele Einträge die Klasse hat. Er tickt
 * mit, sobald der Besucher eine per Diktat ergänzt. Das ist der stillste
 * Entdeckungsmoment der Seite – und der Grund, warum sich das Ganze nach
 * Werkzeug anfühlt und nicht nach Prospekt.
 */
export type TourArea =
  | "beobachtungen"
  | "zeugnisse"
  | "elternpost"
  | "material"
  | "sitzplan"
  | "stundenplan"
  | "entwicklung";

type Entry = {
  key: string;
  label: string;
  icon: LucideIcon;
  /** Offen? Sonst gesperrt mit Schloss und Hinweis. */
  area?: TourArea;
};

const ENTRIES: Entry[] = [
  {
    key: "beobachtungen",
    label: "Beobachtungen",
    icon: ClipboardList,
    area: "beobachtungen",
  },
  { key: "klassen", label: "Klassen", icon: Users },
  { key: "zeugnisse", label: "Zeugnisse", icon: ScrollText, area: "zeugnisse" },
  { key: "elternpost", label: "Elternpost", icon: Mail, area: "elternpost" },
  { key: "material", label: "Material", icon: FolderOpen, area: "material" },
  { key: "entwuerfe", label: "Entwürfe", icon: NotebookPen },
  { key: "sitzplan", label: "Sitzplan", icon: LayoutGrid, area: "sitzplan" },
  {
    key: "stundenplan",
    label: "Stundenplan",
    icon: CalendarDays,
    area: "stundenplan",
  },
  { key: "dokumente", label: "Dokumente", icon: Files },
  {
    key: "entwicklung",
    label: "Entwicklung",
    icon: TrendingUp,
    area: "entwicklung",
  },
  { key: "bibliothek", label: "Bibliothek", icon: BookMarked },
];

export const LOCKED_HINT =
  "Diesen Bereich zeigen wir Ihnen persönlich – im Kennenlernen.";

type Props = {
  current: TourArea;
  onSelect: (area: TourArea) => void;
  /** Welcher gesperrte Eintrag erklärt sich gerade? */
  openLock: string | null;
  onLock: (key: string | null) => void;
  /** Zahl neben „Beobachtungen". */
  observationCount: number;
  /** Der Bereich, der als nächster vorgeschlagen wird – leuchtet kurz auf. */
  suggested: TourArea | null;
};

export function TourSidebar({
  current,
  onSelect,
  openLock,
  onLock,
  observationCount,
  suggested,
}: Props) {
  return (
    <div className="flex w-14 shrink-0 flex-col border-r border-gray-200 bg-surface-alt p-1.5 sm:w-44 sm:p-2">
      <ul className="flex flex-col gap-0.5">
        {ENTRIES.map((entry) => {
          const Icon = entry.icon;
          const isActive = entry.area === current;
          const isLocked = !entry.area;
          const isSuggested = !isActive && entry.area != null && entry.area === suggested;
          const hintId = `einblick-schloss-${entry.key}`;

          return (
            <li key={entry.key} className="relative">
              <button
                type="button"
                onClick={() => (entry.area ? onSelect(entry.area) : onLock(entry.key))}
                onFocus={() => (isLocked ? onLock(entry.key) : onLock(null))}
                onBlur={() => isLocked && onLock(null)}
                aria-current={isActive ? "true" : undefined}
                aria-describedby={isLocked ? hintId : undefined}
                /* Der Name steht IMMER hier und nicht nur im sichtbaren
                   <span>: Unter 640 px ist der ausgeblendet, und das Symbol
                   ist aria-hidden – ohne dieses Attribut waere der Schalter
                   dort namenlos. Gemessen, nicht vermutet: Lighthouse prueft
                   in Mobilbreite und hat genau das gemeldet. */
                aria-label={isLocked ? `${entry.label}, gesperrt` : entry.label}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-md px-2 py-1.5 text-left sm:justify-start",
                  isActive && "bg-brand-100 text-brand-800",
                  !isActive && !isLocked && "text-ink hover:bg-brand-100",
                  isLocked && "text-gray-500",
                  // Der Vorschlag leuchtet nur auf – er erzwingt nichts.
                  isSuggested && "ring-1 ring-brand-600 ring-inset",
                )}
              >
                <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                <span className="hidden truncate text-[11px] sm:inline">
                  {entry.label}
                </span>

                {entry.key === "beobachtungen" ? (
                  <span className="ml-auto hidden rounded-full bg-surface px-1.5 text-[10px] text-gray-500 sm:inline">
                    {observationCount}
                  </span>
                ) : null}

                {isLocked ? (
                  <Lock
                    aria-hidden="true"
                    className="ml-auto hidden size-3 shrink-0 sm:block"
                  />
                ) : null}
              </button>

              {/* Der Hinweis steht IMMER im DOM, wenn er offen ist – nicht nur
                  optisch: aria-describedby verweist darauf, und der Fokus
                  oeffnet ihn genauso wie der Klick. */}
              {isLocked && openLock === entry.key ? (
                <p
                  id={hintId}
                  role="status"
                  className="absolute top-full left-0 z-10 mt-1 w-52 rounded-md border border-gray-200 bg-surface p-2.5 text-[11px] text-ink shadow-sm"
                >
                  {LOCKED_HINT}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
