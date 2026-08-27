"use client";

import { FileText, UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChipPop } from "@/components/scenes/chip-pop";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { SceneLabel } from "@/components/scenes/produkt/scene-panel";
import { UiWindow } from "@/components/scenes/ui-window";

/**
 * ZWEI AUSBLICKS-SZENEN auf den Karten von „In Arbeit“.
 *
 * ==========================================================================
 * BEIDE ZEIGEN FUNKTIONEN, DIE ES NOCH NICHT GIBT. DAS IST ERLAUBT – ABER
 * NUR UNTER EINER BEDINGUNG.
 * ==========================================================================
 * CLAUDE.md, Abschnitt TON: Was in docs/produktstand-2026-08.md „Rollout
 * offen“ oder „Teilweise“ traegt, darf als Szene laufen – ausschliesslich mit
 * dauerhaft sichtbarem Badge „In Entwicklung“ im Fensterkopf. Beide Szenen
 * setzen dafuer `inDevelopment` am <UiWindow />.
 *
 * Warum der Badge im FENSTERKOPF sitzt und nicht als Bildunterschrift: Er
 * gehoert zur Oberflaeche, die man sieht, und wandert damit durch jeden
 * einzelnen Frame – auch durch den Endzustand bei prefers-reduced-motion und
 * durch den Serverrender. Eine Zeile unter dem Fenster koennte man
 * wegscrollen, wegkuerzen oder beim Umbauen verlieren.
 *
 * Beide sind ausserdem bewusst KLEIN und kurz (rund fuenf Sekunden, der
 * kuerzeste Loop der Website): Es sind Ausblicke. Wenn ein Ausblick so gross
 * inszeniert wird wie eine fertige Funktion, ist das Badge nur noch
 * Kleingedrucktes.
 *
 * Was hier NICHT steht: der KI-Sitzplanvorschlag. Der ist laut Produktstand
 * Prototyp – und Prototyp bleibt tabu, auch mit Badge.
 */

/* ==========================================================================
 * a) Originalarbeitsblaetter uebernehmen — Status „Rollout offen“
 * ========================================================================== */
const SHEET_STEPS: SceneStep[] = [
  { id: "original", duration: 900 },
  { id: "rahmung", duration: 900, delay: 150 },
  { id: "aufgabe", duration: 800 },
  { id: "ruhe", duration: 700 },
];

export function OriginalSheetScene({ startDelayMs = 0 }: { startDelayMs?: number }) {
  return (
    <SceneTimeline
      steps={SHEET_STEPS}
      loopPauseMs={1500}
      startDelayMs={startDelayMs}
      staticStepId="ruhe"
      label="Kleine Animation, durchgehend mit dem Hinweis „In Entwicklung“ beschriftet: Ein vorhandenes Arbeitsblatt erscheint formatgetreu als stilisierte Seite. Darum herum entsteht eine vorangestellte Rahmungsseite mit einer Aufgabenzeile. Die Funktion ist noch nicht verfügbar."
    >
      {(scene) => {
        const framed = scene.reached("rahmung");
        const task = scene.reached("aufgabe");

        return (
          <UiWindow variant="app" active="bibliothek" inDevelopment className="h-[16rem]">
            <SceneLabel>Aus dem Fachkorpus</SceneLabel>

            <div className="mt-3 flex items-start gap-3">
              {/* Rahmungsseite – erscheint UM das Original herum. */}
              <div
                className={cn(
                  "flex h-[7.5rem] w-[5.5rem] shrink-0 flex-col gap-1.5 rounded-md border p-2 transition-opacity",
                  framed
                    ? "border-brand-600 bg-surface-alt opacity-100"
                    : "border-transparent opacity-0",
                )}
              >
                <span className="text-[9px] font-medium text-brand-800">Rahmung</span>
                <span
                  className={cn(
                    "h-1.5 origin-left rounded-full bg-brand-600 transition-transform duration-500",
                    task ? "scale-x-100" : "scale-x-0",
                  )}
                />
                <span className="h-1.5 w-3/4 rounded-full bg-brand-100" />
              </div>

              {/* Das Original – stilisierte Flaechen. Es veraendert sich
                  NICHT: genau das ist die Aussage der Funktion. */}
              <div className="flex h-[7.5rem] w-[5.5rem] shrink-0 flex-col gap-1.5 rounded-md border border-gray-200 bg-surface p-2">
                <FileText aria-hidden="true" className="size-3 text-gray-500" />
                <span className="h-1.5 rounded-full bg-gray-200" />
                <span className="h-1.5 w-4/5 rounded-full bg-gray-200" />
                <span className="mt-1 h-6 rounded-sm bg-gray-200" />
                <span className="h-1.5 w-2/3 rounded-full bg-gray-200" />
              </div>
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              Das Original bleibt, wie es ist.
            </p>
          </UiWindow>
        );
      }}
    </SceneTimeline>
  );
}

/* ==========================================================================
 * b) Stilprofil per Upload — Status „Teilweise“
 * ========================================================================== */
const STYLE_STEPS: SceneStep[] = [
  { id: "datei-eins", duration: 700 },
  { id: "datei-zwei", duration: 700 },
  { id: "profil", duration: 1200, delay: 150 },
  { id: "ruhe", duration: 700 },
];

/** Erfundene Dateinamen – bewusst ohne Kindernamen. */
const FILES = ["Zeugnis_Vorjahr.docx", "Elternbrief_Herbst.docx"];

export function StyleProfileScene({ startDelayMs = 0 }: { startDelayMs?: number }) {
  return (
    <SceneTimeline
      steps={STYLE_STEPS}
      loopPauseMs={1500}
      startDelayMs={startDelayMs}
      staticStepId="ruhe"
      label="Kleine Animation, durchgehend mit dem Hinweis „In Entwicklung“ beschriftet: Zwei eigene Textdateien erscheinen als Dateikärtchen, danach füllt sich ein Balken für das daraus gelernte Stilprofil. Die Oberfläche dafür ist noch nicht verfügbar."
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const shown = [scene.reached("datei-eins"), scene.reached("datei-zwei")];
        const profile = scene.reached("profil");

        return (
          <UiWindow variant="app" active="berichte" inDevelopment className="h-[16rem]">
            <SceneLabel>Eigene Texte</SceneLabel>

            <div className="mt-3 flex flex-col gap-1.5">
              {FILES.map((file, position) => (
                <ChipPop
                  key={file}
                  animate={moving && shown[position]}
                  delayMs={position * 120}
                  className={cn(
                    "flex items-center gap-2 rounded-md border border-gray-200 bg-surface px-2 py-1.5 text-[11px] text-ink",
                    shown[position] ? "opacity-100" : "opacity-0",
                  )}
                >
                  <UploadCloud
                    aria-hidden="true"
                    className="size-3 shrink-0 text-brand-600"
                  />
                  <span className="truncate">{file}</span>
                </ChipPop>
              ))}
            </div>

            {/* Balken ueber scaleX statt Breite: Eine Breitenaenderung waere
                ein Layout-Durchgang je Frame. */}
            <p className="mt-4 text-[10px] tracking-wide text-gray-500 uppercase">
              Stilprofil
            </p>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className={cn(
                  "h-full origin-left rounded-full bg-brand-600",
                  moving ? "transition-transform duration-1000 ease-out" : "",
                  profile ? "scale-x-100" : "scale-x-0",
                )}
              />
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              Heute lernt der Stil aus dem, was Sie in der Anwendung schreiben.
            </p>
          </UiWindow>
        );
      }}
    </SceneTimeline>
  );
}
