"use client";

import { Mic } from "lucide-react";

import { cn } from "@/lib/utils";
import { DEMO_CHILDREN, DEMO_CLASS, DEMO_LIVE_NOTES } from "@/config/demo-data";
import { ChipPop } from "@/components/scenes/chip-pop";
import { FakeCursor } from "@/components/scenes/fake-cursor";
import { ProgressPulse } from "@/components/scenes/progress-pulse";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { TypingText } from "@/components/scenes/typing-text";
import { ScenePanel, SceneLabel } from "@/components/scenes/produkt/scene-panel";

/**
 * Szene A – Dokumentation, „Live-Unterricht-Modus".
 *
 * Die Aussage ist nicht „man kann eine Beobachtung erfassen", sondern
 * MEHRERE KINDER IN EINER STUNDE, nebenbei. Deshalb das Kachelraster statt
 * eines einzelnen Eingabefelds, deshalb zwei Durchgänge hintereinander, und
 * deshalb der mitzählende Zähler oben rechts: Er ist das eigentliche Argument
 * der Szene.
 *
 * Jede Szene auf /produkt hat ihren EIGENEN IntersectionObserver – die vier
 * Blöcke liegen weit auseinander, eine gemeinsame <SceneGroup /> würde alle
 * vier starten, sobald der erste zu sehen ist.
 */
const STEPS: SceneStep[] = [
  { id: "raster", duration: 600 },
  { id: "emma-zeiger", duration: 600 },
  { id: "emma-klick", duration: 350 },
  { id: "emma-tippen", duration: 1400 },
  { id: "emma-chip", duration: 600 },
  { id: "yusuf-zeiger", duration: 600, delay: 300 },
  { id: "yusuf-klick", duration: 350 },
  { id: "yusuf-tippen", duration: 1400 },
  { id: "yusuf-chip", duration: 600 },
  { id: "ruhe", duration: 800 },
];

/**
 * Zeigerpositionen in Prozent der Bühne, am Bildschirm ausgemessen.
 * Das Raster ist 3 × 2; angetippt werden die erste und die zweite Kachel der
 * oberen Reihe.
 */
const CURSOR_REST = { x: 12, y: 86 };
const CURSOR_TILES = [
  { x: 19, y: 33 },
  { x: 50, y: 33 },
];

export function DocumentationScene() {
  return (
    <SceneTimeline
      steps={STEPS}
      loopPauseMs={2000}
      label={`Animierte Darstellung des Live-Unterricht-Modus: In einer Raster-Ansicht der Klasse ${DEMO_CLASS} werden nacheinander zwei Kinder angetippt und je eine kurze Beobachtung erfasst, die automatisch einem Fach zugeordnet wird. Ein Zähler zeigt die Zahl der erfassten Beobachtungen. Alle Daten sind erfunden.`}
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const paused = !scene.running;

        /*
         * Beide Indizes sind ausdrücklich als `number` annotiert.
         * Ohne die Annotation verengt TypeScript sie auf die Literale
         * `0 | 1 | -1` und lehnt den Zugriff auf das `as const`-Tupel ab
         * („A tuple type cannot be indexed with a negative value").
         */

        /** Welches Kind ist gerade ausgewählt? -1 = keines. */
        const active: number = scene.reached("yusuf-klick")
          ? 1
          : scene.reached("emma-klick")
            ? 0
            : -1;

        /** Für welches Kind läuft oder lief die Eingabe? */
        const typing: number = scene.reached("yusuf-tippen")
          ? 1
          : scene.reached("emma-tippen")
            ? 0
            : -1;

        const done = [scene.reached("emma-chip"), scene.reached("yusuf-chip")];
        const counted = done.filter(Boolean).length;

        const cursor = scene.reached("yusuf-zeiger")
          ? CURSOR_TILES[1]
          : scene.reached("emma-zeiger")
            ? CURSOR_TILES[0]
            : CURSOR_REST;

        return (
          <ScenePanel className="h-[21rem] sm:h-[19.5rem]">
            <div className="flex items-center justify-between gap-3">
              <SceneLabel>Live-Unterricht-Modus · Klasse {DEMO_CLASS}</SceneLabel>

              {/* Der Zähler poppt bei jeder Änderung kurz auf – der `key`
                  sorgt dafür, dass die Animation neu startet. */}
              <span
                key={`zaehler-${scene.cycle}-${counted}`}
                className={cn(
                  "inline-flex items-center rounded-full border border-gray-200 bg-surface-alt px-2.5 py-1 text-[10px] font-medium text-brand-800",
                  moving && "animate-chip-pop",
                )}
              >
                {counted} {counted === 1 ? "Beobachtung" : "Beobachtungen"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {DEMO_CHILDREN.map((child, position) => {
                const isActive = active === position;
                const isDone = position < done.length && done[position];

                return (
                  <div
                    key={child.name}
                    className={cn(
                      "rounded-lg border bg-surface p-2",
                      isActive || isDone ? "border-brand-600" : "border-gray-200",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[9px] font-semibold text-brand-800">
                        {child.initials}
                      </span>
                      <span className="truncate text-[11px] text-ink">{child.name}</span>
                    </div>

                    {/* Feste Mindesthöhe, damit ein erscheinender Chip die
                        Kachel nicht wachsen lässt. */}
                    <div className="mt-1.5 flex min-h-5 items-center">
                      {isDone ? (
                        <ChipPop
                          key={`fach-${scene.cycle}-${position}`}
                          animate={moving}
                          className="px-1.5 py-0 text-[9px]"
                        >
                          {DEMO_LIVE_NOTES[position].chip}
                        </ChipPop>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 bg-surface-alt p-3">
              <div className="flex items-center justify-between gap-3">
                <SceneLabel>
                  {active >= 0 ? DEMO_LIVE_NOTES[active].child : "Kind antippen"}
                </SceneLabel>

                <ProgressPulse
                  active={
                    scene.running && (scene.at("emma-tippen") || scene.at("yusuf-tippen"))
                  }
                  className="size-6"
                >
                  <Mic className="size-3" />
                </ProgressPulse>
              </div>

              <div className="mt-1.5 min-h-6 text-sm leading-relaxed text-ink">
                {typing >= 0 ? (
                  <TypingText
                    key={`notiz-${scene.cycle}-${typing}`}
                    text={DEMO_LIVE_NOTES[typing].note}
                    durationMs={1400}
                    animate={moving}
                    paused={paused}
                  />
                ) : null}
              </div>
            </div>

            <FakeCursor
              key={`zeiger-${scene.cycle}`}
              x={cursor.x}
              y={cursor.y}
              visible={moving}
              clicking={scene.at("emma-klick") || scene.at("yusuf-klick")}
              animate={moving}
            />
          </ScenePanel>
        );
      }}
    </SceneTimeline>
  );
}
