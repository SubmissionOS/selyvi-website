import type { ReactNode } from "react";
import {
  Bell,
  BookOpen,
  Clipboard,
  Clock,
  FileBarChart,
  Heart,
  Home,
  Mic,
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
import { PRODUCT_NAME } from "@/config/brand";
import { APP_CSS_VARS } from "@/config/app-reference";
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
 * ==========================================================================
 * DIE OPTIK FOLGT DER ECHTEN ANWENDUNG
 * --------------------------------------------------------------------------
 * Farben, Navigation und Aufbau kommen aus docs/app-referenz/*.png. Die
 * Werte stehen gemessen in src/config/app-reference.ts und werden hier als
 * CSS-Variablen auf das Fenster gelegt – ausserhalb des Fensters gibt es sie
 * nicht, die Website behaelt ihre eigenen Tokens.
 *
 * Das Fenster-Chrome (Punkte, Pfadleiste) bleibt bewusst das der Website: Es
 * sagt „hier wird etwas GEZEIGT". Darin steht dann die Anwendung, so nah am
 * Original wie moeglich.
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
   * Die Lehrkraft-Liste ist seit dem Abgleich mit docs/app-referenz/ die
   * ECHTE Navigation der Anwendung – acht Punkte, in ihrer Reihenfolge. Die
   * frueher angehaengte Zeile „+ weitere" ist damit entfallen: Diese acht
   * sind die Navigation und nicht ihr Ausschnitt.
   *
   * Die Leitungs-Liste ist weiterhin aus dem Produktstand hergeleitet – von
   * dieser Ansicht liegt kein Screenshot vor.
   */
  navSet?: "lehrkraft" | "leitung";
  /**
   * Ersetzt die statische Seitenleiste vollstaendig.
   *
   * Nur der gefuehrte Einblick nutzt das: Dort ist die Leiste BEDIENBAR –
   * drei Bereiche sind Schalter, acht tragen ein Schloss. Die eingebaute
   * Leiste ist bewusst tote Dekoration (aria-hidden, keine Buttons, kein
   * tabIndex); sie nachtraeglich bedienbar zu machen haette diese Zusage in
   * allen Szenen aufgeweicht. Ein Ersatz-Slot laesst beide Welten getrennt.
   */
  navSlot?: ReactNode;
  className?: string;
};

/**
 * Symbole der Navigation.
 *
 * Abgelesen aus docs/app-referenz/Material-generator.png – dort steht neben
 * jedem Eintrag eines. Die lucide-Entsprechungen sind die naechstliegenden;
 * exakt dieselbe Zeichnung ist es nicht, weil das Original einen anderen Satz
 * benutzt. Fuer den Wiedererkennungswert zaehlt die Form: Haus, Personen,
 * Mikrofon, Uhr, Klemmbrett, Herz, aufgeschlagenes Buch, steigende Linie.
 */
const NAV_ICONS: Record<DemoNavKey, LucideIcon> = {
  heute: Home,
  "meine-klassen": Users,
  "live-unterricht": Mic,
  timeline: Clock,
  ueberpruefung: Clipboard,
  foerderplaene: Heart,
  material: BookOpen,
  klassenanalyse: TrendingUp,
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
  navSlot,
  className,
}: Props) {
  if (variant === "app") {
    const entries = navSet === "leitung" ? DEMO_NAV_LEADERSHIP : DEMO_NAV_TEACHER;

    return (
      <div
        style={APP_CSS_VARS}
        className={cn(
          "relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-[var(--app-canvas)]",
          className,
        )}
      >
        {/* ---------- Fenster-Chrome der WEBSITE ----------
            Punkte und Pfadleiste sind kein Teil der Anwendung – sie sind der
            Rahmen, in dem wir sie zeigen. Deshalb tragen sie weiter die
            Website-Tokens und nicht die Referenz-Werte. */}
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-surface-alt px-3 py-2 sm:gap-3 sm:px-4">
          <span className="flex shrink-0 gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-gray-200" />
            <span className="size-2 rounded-full bg-gray-200" />
            <span className="size-2 rounded-full bg-gray-200" />
          </span>

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
          {/* ---------- Seitenleiste, nach dem Original ----------
              Wortmarke oben, darunter die acht Eintraege. Aktiv heisst im
              Original: hellblaue Flaeche, 4 px blauer Balken links, blaue
              Schrift.

              ZWEI ABWEICHUNGEN, BEIDE GEMESSEN UND BEIDE GEWOLLT:

              1. BREITE. Im Original sind es 270 von 1897 px, also 14,2 %.
                 Unsere Szenenfenster sind rund 600 px breit – 14,2 % waeren
                 85 px, und darin steht „Live-Unterricht" nicht mehr. Die
                 Leiste ist deshalb absolut bemessen (144 px ab sm) und
                 unterhalb von sm eine reine Symbolspalte. APP_SIDEBAR_RATIO
                 haelt den Originalwert fest, damit die Abweichung sichtbar
                 bleibt und nicht vergessen wird.

              2. SCHRIFTFARBE des aktiven Eintrags. Siehe app-reference.ts:
                 das Blau des Originals erreicht auf dem hellblauen Grund nur
                 3,99:1. */}
          {navSlot ?? (
            <div
              aria-hidden="true"
              className={cn(
                "flex w-11 shrink-0 flex-col gap-0.5 overflow-hidden border-r bg-[var(--app-surface)] p-1.5 sm:p-2",
                "border-[var(--app-border)]",
                navSet === "leitung" ? "sm:w-44" : "sm:w-36",
              )}
            >
              <span className="mb-1 hidden shrink-0 px-2 text-sm font-bold text-[var(--app-blue)] sm:block">
                {PRODUCT_NAME}
              </span>

              {entries.map((entry) => {
                const Icon = NAV_ICONS[entry.key];
                const isActive = entry.key === active;

                return (
                  <span
                    key={entry.key}
                    className={cn(
                      "relative flex shrink-0 items-center justify-center gap-2 rounded-[var(--app-radius-nav)] px-2 py-1.5 sm:justify-start",
                      isActive
                        ? "bg-[var(--app-blue-soft)] font-semibold text-[var(--app-blue-on-soft)]"
                        : "text-[var(--app-text-muted)]",
                    )}
                  >
                    {isActive ? (
                      <span className="absolute inset-y-0 left-0 w-[3px] rounded-r bg-[var(--app-blue)]" />
                    ) : null}
                    <Icon
                      className={cn(
                        "size-3.5 shrink-0",
                        isActive && "text-[var(--app-blue)]",
                      )}
                    />
                    <span className="hidden truncate text-[11px] sm:inline">
                      {entry.label}
                    </span>
                  </span>
                );
              })}
            </div>
          )}

          {/* ---------- Inhaltsbereich: hier lebt die Szene ----------
              BEWUSST OHNE `overflow-hidden`: Der Szenen-Zeiger liegt als
              Kind hier drin, spannt sich aber über den ganzen Rahmen – er
              muss auch die Kontext-Chips in der Kopfzeile erreichen können.
              Abgeschnitten wird ohnehin, nämlich vom äusseren Kasten. */}
          <div className="min-w-0 flex-1 p-3 text-[var(--app-text)] sm:p-4">
            {children}
          </div>
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
