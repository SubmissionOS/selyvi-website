"use client";

import { Check, FileDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { DEMO_RELIEF_REPORT } from "@/config/demo-data";
import { CountUp } from "@/components/scenes/count-up";
import { FakeCursor } from "@/components/scenes/fake-cursor";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { TypingText } from "@/components/scenes/typing-text";
import { ScenePanel, SceneLabel } from "@/components/scenes/produkt/scene-panel";

/**
 * Szene D – Steuerung, „Entlastungsbericht".
 *
 * ==========================================================================
 * WORTLAUT-SPERRE
 * --------------------------------------------------------------------------
 * Das Wort „Wirkung" kommt in dieser Szene NICHT als Behauptung vor. Was hier
 * gezählt wird, sind eingesparte Stunden – eine Prozesskennzahl. Sie heisst
 * deshalb überall „gewonnene Zeit" beziehungsweise „Entlastung".
 *
 * Über Wirkung spricht nur die Erhebungs-Zeile unten, und die sagt
 * ausdrücklich, dass sich noch nichts sagen lässt. Genau so steht sie im
 * Produkt: Sie verschwindet nie, weil „138 Stunden gespart" sonst als belegte
 * Wirkung gelesen wird.
 *
 * Aus demselben Grund steht „Schätzwert" dauerhaft neben der Zahl und nicht
 * als Fussnote: Grundlage sind hinterlegte Minutenannahmen.
 * ==========================================================================
 *
 * Grösser angelegt als die Mini-Szene der Startseite: Hier ist Platz für den
 * Vergleich mit dem Vormonat, die Erhebungs-Zeile und den PDF-Export.
 */
const STEPS: SceneStep[] = [
  { id: "kopf", duration: 500 },
  { id: "zahl", duration: 1500 },
  { id: "balken", duration: 900, delay: 200 },
  { id: "erhebung", duration: 1900, delay: 200 },
  { id: "zeiger", duration: 600, delay: 200 },
  { id: "klick", duration: 350 },
  { id: "haken", duration: 700 },
  { id: "ruhe", duration: 600 },
];

/** Zeigerpositionen in Prozent der Bühne, am Bildschirm ausgemessen. */
const CURSOR_REST = { x: 16, y: 30 };
const CURSOR_EXPORT = { x: 18, y: 68 };

/** Eine Balkengruppe: drei Balken plus Monatsbeschriftung darunter. */
function BarGroup({
  heights,
  grown,
  animate,
  label,
  muted,
}: {
  heights: readonly number[];
  grown: boolean;
  animate: boolean;
  label: string;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-16 items-end gap-1">
        {heights.map((height, position) => (
          <span
            key={position}
            className={cn(
              "h-full w-3 origin-bottom rounded-t",
              muted ? "bg-gray-200" : "bg-brand-100",
              animate && "transition-transform duration-700 ease-out",
            )}
            style={{
              // Wachsen über scaleY mit Ursprung unten – keine Höhenanimation,
              // die Layout auslösen würde.
              transform: `scaleY(${grown ? height : 0.06})`,
              transitionDelay: animate ? `${position * 110}ms` : undefined,
            }}
          />
        ))}
      </div>
      <span className="text-[9px] text-gray-500">{label}</span>
    </div>
  );
}

export function SteeringScene() {
  return (
    <SceneTimeline
      steps={STEPS}
      loopPauseMs={2000}
      label={`Animierte Darstellung des Entlastungsberichts: Für ${DEMO_RELIEF_REPORT.month} zählt die Anzeige auf ${DEMO_RELIEF_REPORT.hours} Stunden gewonnene Zeit hoch, ausdrücklich als Schätzwert gekennzeichnet, daneben der Vergleich mit dem Vormonat. Darunter steht, dass die Befragung zur Wirkung noch läuft und sich dazu nichts Belastbares sagen lässt. Zuletzt wird der Bericht als PDF exportiert. Alle Daten sind erfunden.`}
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const paused = !scene.running;

        const counting = scene.reached("zahl");
        const grown = scene.reached("balken");
        const surveying = scene.reached("erhebung");
        const exported = scene.reached("haken");
        const cursor = scene.reached("zeiger") ? CURSOR_EXPORT : CURSOR_REST;

        return (
          <ScenePanel className="h-[22rem] sm:h-[18rem]">
            <div className="flex items-center justify-between gap-3">
              <SceneLabel>Entlastungsbericht</SceneLabel>
              <span className="text-[10px] text-gray-500">
                {DEMO_RELIEF_REPORT.month}
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="text-3xl leading-none font-semibold text-ink">
                  {counting ? (
                    <CountUp
                      key={`stunden-${scene.cycle}`}
                      value={DEMO_RELIEF_REPORT.hours}
                      durationMs={STEPS[1].duration}
                      animate={moving}
                      paused={paused}
                      suffix=" Std."
                    />
                  ) : (
                    <span className="tabular-nums">0 Std.</span>
                  )}
                </div>

                <div className="mt-1.5 text-[10px] text-gray-500">
                  gewonnene Zeit · {DEMO_RELIEF_REPORT.note}
                </div>
              </div>

              <div className="flex shrink-0 items-end gap-3">
                <BarGroup
                  heights={DEMO_RELIEF_REPORT.currentBars}
                  grown={grown}
                  animate={moving}
                  label={DEMO_RELIEF_REPORT.month.split(" ")[0]}
                />
                <BarGroup
                  heights={DEMO_RELIEF_REPORT.previousBars}
                  grown={grown}
                  animate={moving}
                  label={DEMO_RELIEF_REPORT.previousMonth}
                  muted
                />
              </div>
            </div>

            {/* Erhebungs-Zeile. Feste Mindesthöhe für den fertigen Satz,
                damit der Export-Knopf darunter beim Tippen nicht wandert. */}
            <p className="mt-5 min-h-12 border-l-2 border-gray-200 pl-3 text-[11px] leading-relaxed text-gray-500 sm:min-h-9">
              {surveying ? (
                <TypingText
                  key={`erhebung-${scene.cycle}`}
                  text={DEMO_RELIEF_REPORT.surveyLine}
                  durationMs={STEPS[3].duration}
                  animate={moving}
                  paused={paused}
                />
              ) : null}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium text-ink">
                <FileDown className="size-3" />
                Als PDF exportieren
              </span>

              {/* Feste Breite, damit das Häkchen nichts verschiebt. */}
              <span className="flex size-4 items-center justify-center">
                {exported ? (
                  <Check
                    key={`haken-${scene.cycle}`}
                    className={cn("size-4 text-brand-600", moving && "animate-chip-pop")}
                  />
                ) : null}
              </span>
            </div>

            <FakeCursor
              key={`zeiger-${scene.cycle}`}
              x={cursor.x}
              y={cursor.y}
              visible={moving}
              clicking={scene.at("klick")}
              animate={moving}
            />
          </ScenePanel>
        );
      }}
    </SceneTimeline>
  );
}
