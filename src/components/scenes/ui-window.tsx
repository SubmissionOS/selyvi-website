import type { ReactNode } from "react";
import {
  Bell,
  BookMarked,
  CalendarDays,
  ClipboardList,
  FileBarChart,
  Files,
  FolderOpen,
  LayoutGrid,
  Mail,
  NotebookPen,
  ScrollText,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DEMO_NAV_LEADERSHIP,
  DEMO_NAV_TEACHER,
  type DemoNavKey,
} from "@/config/demo-data";
import { Wordmark } from "@/components/layout/wordmark";

/**
 * Fensterrahmen, in dem die Szenen leben.
 *
 * ZWEI VARIANTEN:
 *   "browser" – Browser-Rahmen mit Punkten und Pfadleiste. Der ursprüngliche
 *               Rahmen; heute von keiner Szene mehr genutzt, bleibt aber als
 *               Möglichkeit erhalten.
 *   "app"     – Anwendungsrahmen mit Seitenleiste und Kontext-Chips. Er ist
 *               der Grund, warum die Szenen wie EIN Produkt wirken und nicht
 *               wie fünf Illustrationen.
 *
 * ==========================================================================
 * DIE SEITENLEISTE IST STATISCHES DOM
 * --------------------------------------------------------------------------
 * Kein Zustand, kein Effekt, kein requestAnimationFrame – nur Markup. Sie
 * kostet damit exakt nichts an Laufzeit, egal in wie vielen Szenen sie steht.
 * Der aktive Eintrag kommt als Prop von aussen; die Szene entscheidet ihn
 * einmal beim Rendern.
 *
 * Sie ist ausserdem NICHT bedienbar: keine Buttons, keine Links, kein
 * tabIndex. Was aussieht wie Navigation, aber auf einer Marketingseite nicht
 * navigiert, ist für Tastatur- und Screenreader-Nutzende eine Falle. Der
 * einzige, der hier „klickt", ist der gezeichnete Szenen-Zeiger.
 * ==========================================================================
 *
 * `relative` liegt auf dem ÄUSSEREN Kasten, nicht auf dem Inhaltsbereich:
 * <FakeCursor /> spannt sich über `inset-0` darüber und erreicht dadurch auch
 * die Kontext-Chips in der Kopfzeile – Szene A klickt genau dorthin.
 */
type Props = {
  children: ReactNode;
  variant?: "browser" | "app";
  /** Pfad in der Browser-Variante, z. B. „Klasse 3b". */
  path?: string;
  /** Aktiver Eintrag der Seitenleiste (nur Variante „app"). */
  active?: DemoNavKey;
  /**
   * Kontext-Chips in der Kopfzeile, z. B. ["Klasse 3b", "Deutsch"].
   * Der erste Chip kann von einer Szene hervorgehoben werden – siehe
   * `highlightChip`.
   */
  chips?: string[];
  /**
   * Index eines Chips, der gerade gesetzt wurde und kurz aufleuchtet.
   * -1 = keiner. Nur Szene A nutzt das.
   */
  highlightChip?: number;
  /**
   * Zeigt die Szene eine Funktion, die laut docs/produktstand-2026-08.md noch
   * NICHT ausgeliefert ist („Rollout offen" oder „Teilweise")?
   *
   * Dann steht dauerhaft „In Entwicklung" im Fensterkopf – in jedem Frame und
   * auch im Endbild bei prefers-reduced-motion. Genau das ist die Bedingung,
   * unter der CLAUDE.md solche Szenen ueberhaupt erlaubt: Eine Szene ohne
   * Badge ist eine Verfuegbarkeitszusage, auch wenn der Text daneben etwas
   * anderes sagt.
   *
   * Bewusst ein BOOLEAN und kein freier Text: Der Wortlaut darf nicht je
   * Aufrufstelle abweichen, und „bald verfuegbar" waere schon wieder eine
   * Zusage.
   *
   * Der Badge liegt im aria-hidden-Bereich wie der ganze Fensterinhalt. Die
   * Szene MUSS den Hinweis deshalb zusaetzlich in ihr aria-label schreiben –
   * sonst erfahren Screenreader-Nutzende ihn nicht.
   */
  inDevelopment?: boolean;
  /**
   * Welche Seitenleiste? „lehrkraft" ist der Arbeitsbereich einer Lehrkraft,
   * „leitung" der Leitungsmodus.
   *
   * Die Lehrkraft-Liste ist bewusst LANG und traegt am Ende eine
   * ausgegraute „+ weitere"-Zeile: Wer eine Szene sieht, soll erkennen, dass
   * die erklaerte Funktion ein Ausschnitt ist. Die Leitungs-Liste ist
   * vollstaendig und traegt die Zeile deshalb NICHT.
   */
  navSet?: "lehrkraft" | "leitung";
  className?: string;
};

/** Icons der Navigation. Gehören zur Darstellung, nicht zu den Demo-Daten. */
const NAV_ICONS: Record<DemoNavKey, LucideIcon> = {
  beobachtungen: ClipboardList,
  klassen: Users,
  zeugnisse: ScrollText,
  elternpost: Mail,
  material: FolderOpen,
  entwuerfe: NotebookPen,
  sitzplan: LayoutGrid,
  stundenplan: CalendarDays,
  dokumente: Files,
  entwicklung: TrendingUp,
  bibliothek: BookMarked,
  entlastungsbericht: FileBarChart,
  "lehrer-klassen": Users,
  nutzung: TrendingUp,
  schulentwicklung: TrendingUp,
  aufmerksamkeit: Bell,
};

export function UiWindow({
  children,
  variant = "browser",
  path,
  active,
  chips,
  highlightChip = -1,
  inDevelopment = false,
  navSet = "lehrkraft",
  className,
}: Props) {
  if (variant === "app") {
    const entries = navSet === "leitung" ? DEMO_NAV_LEADERSHIP : DEMO_NAV_TEACHER;

    return (
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-surface",
          className,
        )}
      >
        {/* ---------- Kopfzeile: Wortmarke und Kontext ---------- */}
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-surface-alt px-3 py-2 sm:gap-3 sm:px-4">
          <Wordmark className="shrink-0 text-sm" />

          {chips && chips.length > 0 ? (
            <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
              {chips.map((chip, position) => (
                <span
                  key={chip}
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap",
                    position === highlightChip
                      ? "border-brand-600 bg-brand-100 text-brand-800"
                      : "border-gray-200 bg-surface text-gray-500",
                  )}
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          {inDevelopment ? (
            <span className="ml-auto shrink-0 rounded-full border border-gray-200 bg-surface px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-ink">
              In Entwicklung
            </span>
          ) : null}

          <span
            className={cn(
              "size-5 shrink-0 rounded-full bg-gray-200",
              inDevelopment ? "ml-2" : "ml-auto",
            )}
          />
        </div>

        <div className="flex min-h-0 flex-1">
          {/* ---------- Seitenleiste ----------
              Unter 640 px schrumpft sie auf eine reine Icon-Spalte: Die
              Beschriftungen verschwinden, die Struktur bleibt. Genau das ist
              der Grund, warum die lange Liste auf 390 px kein Problem wird.

              Die Liste laeuft in einem `overflow-hidden`-Bereich: In hohen
              Fenstern steht sie vollstaendig, in niedrigen bricht sie unten ab
              – wie eine echte Seitenleiste, die weitergeht. Die „+ weitere"-
              Zeile ist deshalb am Fuss ANGEHEFTET und nicht das letzte
              Listenelement: Sie muss auch dann sichtbar sein, wenn abgeschnitten
              wird, denn sie traegt die Aussage. */}
          <div
            aria-hidden="true"
            className={cn(
              "flex w-11 shrink-0 flex-col border-r border-gray-200 bg-surface-alt p-1.5 sm:p-2",
              // Der Leitungsmodus braucht 16 px mehr: „Nutzung im Kollegium"
              // wird bei w-40 abgeschnitten, und ein halber Bereichsname sieht
              // aus wie ein Fehler statt wie eine lange Liste.
              navSet === "leitung" ? "sm:w-44" : "sm:w-40",
            )}
          >
            <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden">
              {entries.map((entry) => {
                const Icon = NAV_ICONS[entry.key];
                const isActive = entry.key === active;

                return (
                  <span
                    key={entry.key}
                    className={cn(
                      "flex shrink-0 items-center justify-center gap-2 rounded-md px-2 py-1.5 sm:justify-start",
                      isActive ? "bg-brand-100 text-brand-800" : "text-gray-500",
                    )}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="hidden truncate text-[11px] sm:inline">
                      {entry.label}
                    </span>
                  </span>
                );
              })}
            </div>

            {/* Ausgegraut und ohne Symbol – sie ist kein Bereich, sondern der
                Hinweis, dass die Liste weitergeht. Auf der Icon-Spalte steht
                dafuer nur ein Auslassungszeichen. */}
            {navSet === "lehrkraft" ? (
              <span className="mt-1 flex shrink-0 items-center justify-center px-2 py-1 text-[11px] text-gray-500 sm:justify-start">
                <span className="sm:hidden">…</span>
                <span className="hidden sm:inline">+ weitere</span>
              </span>
            ) : null}
          </div>

          {/* ---------- Inhaltsbereich: hier lebt die Szene ----------
              BEWUSST OHNE `overflow-hidden`: Der Szenen-Zeiger liegt als
              Kind hier drin, spannt sich aber über den ganzen Rahmen – er
              muss auch die Kontext-Chips in der Kopfzeile erreichen können.
              Abgeschnitten wird ohnehin, nämlich vom äusseren Kasten. */}
          <div className="min-w-0 flex-1 p-3 sm:p-4">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-surface",
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

        <span className="size-6 shrink-0 rounded-full bg-gray-200" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
