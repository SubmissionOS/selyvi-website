"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { DEMO_MATERIAL } from "@/config/demo-data";
import { ChipPop } from "@/components/scenes/chip-pop";
import { FakeCursor } from "@/components/scenes/fake-cursor";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { TypingText } from "@/components/scenes/typing-text";
import { ScenePanel, SceneLabel } from "@/components/scenes/produkt/scene-panel";

/**
 * Szene C – Unterricht, „Material mit Quellen".
 *
 * ZWEI AUSSAGEN, EINE DAVON DURCH WEGLASSEN:
 *
 *   1. Das Material entsteht aus benannten Fundstellen, und die stehen am
 *      Ende im Dokument – die Marker [1] und [2] und die Quellenzeile unten.
 *   2. Die dritte Fundstelle bleibt ABSICHTLICH ungehakt. Der Produktstand
 *      sagt, dass die Lehrkraft die Fundstellen auch selbst auswählen kann,
 *      statt sie automatisch ziehen zu lassen. Würden alle drei anspringen,
 *      zeigte die Szene das Gegenteil.
 *
 * Das Raster bleibt auf allen Breiten zweispaltig. Ein Umbruch auf eine Spalte
 * würde die Fundstellen auf Mobilgeräten weit nach oben schieben – und die
 * Zeigerpositionen sind Prozentwerte der Bühne, die dann nicht mehr passen.
 */
const STEPS: SceneStep[] = [
  { id: "thema", duration: 1600 },
  { id: "fundstellen", duration: 900, delay: 200 },
  { id: "zeiger-1", duration: 600 },
  { id: "haken-1", duration: 400 },
  { id: "zeiger-2", duration: 600 },
  { id: "haken-2", duration: 400 },
  { id: "material", duration: 1600, delay: 250 },
  { id: "ruhe", duration: 1000 },
];

/** Zeigerpositionen in Prozent der Bühne, am Bildschirm ausgemessen. */
const CURSOR_REST = { x: 10, y: 22 };
const CURSOR_SOURCES = [
  { x: 8, y: 45 },
  { x: 8, y: 56 },
];

export function TeachingScene() {
  return (
    <SceneTimeline
      steps={STEPS}
      loopPauseMs={2000}
      label="Animierte Darstellung der Materialerzeugung: Ein Thema wird eingegeben, aus dem Fachkorpus erscheinen drei Fundstellen, von denen zwei ausgewählt werden. Rechts entsteht daraus ein Arbeitsblatt, in dem die verwendeten Quellen als Marker und in einer Quellenzeile ausgewiesen sind. Alle Daten sind erfunden."
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const paused = !scene.running;

        const listed = scene.reached("fundstellen");
        const checked = [scene.reached("haken-1"), scene.reached("haken-2"), false];
        const building = scene.reached("material");

        const cursor = scene.reached("zeiger-2")
          ? CURSOR_SOURCES[1]
          : scene.reached("zeiger-1")
            ? CURSOR_SOURCES[0]
            : CURSOR_REST;

        return (
          <ScenePanel className="h-[23rem] sm:h-[20.5rem]">
            <div className="flex h-full flex-col">
              <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_1fr] gap-3">
                {/* ---------- links: Thema und Fundstellen ---------- */}
                <div className="flex min-w-0 flex-col">
                  <SceneLabel>Thema</SceneLabel>

                  <div className="mt-1.5 min-h-9 rounded-md border border-gray-200 bg-surface-alt px-2.5 py-2 text-[11px] leading-relaxed text-ink">
                    <TypingText
                      key={`thema-${scene.cycle}`}
                      text={DEMO_MATERIAL.topic}
                      durationMs={STEPS[0].duration}
                      animate={moving}
                      paused={paused}
                    />
                  </div>

                  <div className="mt-4">
                    <SceneLabel>Fundstellen im Fachkorpus</SceneLabel>
                  </div>

                  <ul className="mt-2 space-y-1.5">
                    {DEMO_MATERIAL.sources.map((source, position) => (
                      <li
                        key={source}
                        className={cn(
                          "flex items-start gap-2 rounded-md border bg-surface p-1.5",
                          checked[position] ? "border-brand-600" : "border-gray-200",
                          moving && listed && "animate-panel-rise",
                          !listed && "opacity-0",
                        )}
                        style={
                          moving && listed
                            ? { animationDelay: `${position * 120}ms` }
                            : undefined
                        }
                      >
                        <span
                          className={cn(
                            "mt-px flex size-3.5 shrink-0 items-center justify-center rounded-sm border",
                            checked[position]
                              ? "border-brand-600 bg-brand-600 text-surface"
                              : "border-gray-200",
                          )}
                        >
                          {checked[position] ? <Check className="size-2.5" /> : null}
                        </span>

                        <span className="min-w-0 text-[10px] leading-snug text-gray-500">
                          {source}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ---------- rechts: erzeugtes Material ---------- */}
                {/* Der Rahmen des Dokuments und sein Titel stehen von Anfang
                    an da – nur der INHALT entsteht.

                    Vorher war die ganze Karte durchsichtig. Sie belegte damit
                    zwar korrekt ihren Platz, aber die rechte Hälfte der Bühne
                    blieb zwei Drittel des Durchlaufs leer, auf Mobilgeräten
                    besonders auffällig. Dieselbe Lehre wie im Hero.

                    Der Titel steht bei VOLLER Deckkraft. Abgedunkelte Schrift
                    ist im Szenen-Fundament gesperrt: gray-500 und ink haben auf
                    hellem Grund keinen Kontrast-Spielraum nach unten. */}
                <div className="flex min-w-0 flex-col rounded-lg border border-gray-200 bg-surface-alt p-2.5">
                  <span className="truncate text-[10px] font-medium text-ink">
                    {DEMO_MATERIAL.documentTitle}
                  </span>

                  <div
                    key={`dokument-${scene.cycle}`}
                    className={cn(
                      "mt-2.5 space-y-2",
                      moving && building && "animate-panel-rise",
                      !building && "opacity-0",
                    )}
                  >
                    <div className="h-1.5 w-full rounded bg-gray-200" />

                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 flex-1 rounded bg-gray-200" />
                      {building ? (
                        <ChipPop
                          key={`marker-1-${scene.cycle}`}
                          delayMs={500}
                          animate={moving}
                          className="rounded px-1 py-0 text-[8px] leading-4"
                        >
                          [1]
                        </ChipPop>
                      ) : null}
                    </div>

                    <div className="h-1.5 w-5/6 rounded bg-gray-200" />

                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 flex-1 rounded bg-gray-200" />
                      {building ? (
                        <ChipPop
                          key={`marker-2-${scene.cycle}`}
                          delayMs={900}
                          animate={moving}
                          className="rounded px-1 py-0 text-[8px] leading-4"
                        >
                          [2]
                        </ChipPop>
                      ) : null}
                    </div>

                    <div className="h-1.5 w-2/3 rounded bg-gray-200" />
                  </div>

                  {/* Die Quellenzeile gehört zum Inhalt und erscheint mit ihm.
                      Unsichtbar (opacity-0) ist unproblematisch – anders als
                      eine abgedunkelte Schrift, die den Kontrast verletzt. */}
                  <div
                    className={cn(
                      "mt-auto border-t border-gray-200 pt-2 text-[9px] text-gray-500",
                      !building && "opacity-0",
                    )}
                  >
                    {DEMO_MATERIAL.sourceNote}
                  </div>
                </div>
              </div>

              <div className="mt-3 shrink-0">
                <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-medium text-brand-800">
                  Quellen ausgewiesen
                </span>
              </div>
            </div>

            <FakeCursor
              key={`zeiger-${scene.cycle}`}
              x={cursor.x}
              y={cursor.y}
              visible={moving}
              clicking={scene.at("haken-1") || scene.at("haken-2")}
              animate={moving}
            />
          </ScenePanel>
        );
      }}
    </SceneTimeline>
  );
}
