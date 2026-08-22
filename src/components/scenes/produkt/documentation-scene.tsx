"use client";

import { Mic } from "lucide-react";

import { cn } from "@/lib/utils";
import { DEMO_CHILDREN, DEMO_CLASS, DEMO_LIVE_NOTES } from "@/config/demo-data";
import { ChipPop } from "@/components/scenes/chip-pop";
import { FakeCursor } from "@/components/scenes/fake-cursor";
import { ProgressPulse } from "@/components/scenes/progress-pulse";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { TypingText } from "@/components/scenes/typing-text";
import { SceneLabel } from "@/components/scenes/produkt/scene-panel";
import { UiWindow } from "@/components/scenes/ui-window";

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
/*
 * DER EINE FILTER-MOMENT DIESER SZENE steht ganz am Anfang: Der Zeiger setzt
 * den Kontext-Chip „Klasse 3b" in der Kopfzeile, und ERST DANN erscheinen die
 * Kacheln. Damit ist ohne ein Wort erklärt, worauf sich das Raster bezieht.
 *
 * Genau einer je Szene – mehr, und aus dem Ablauf würde ein Jahrmarkt.
 */
const STEPS: SceneStep[] = [
  { id: "filter-zeiger", duration: 600 },
  { id: "filter-klick", duration: 500 },
  { id: "raster", duration: 600, delay: 150 },
  { id: "emma-zeiger", duration: 550 },
  { id: "emma-klick", duration: 350 },
  { id: "emma-tippen", duration: 1300 },
  { id: "emma-chip", duration: 550 },
  { id: "yusuf-zeiger", duration: 550, delay: 250 },
  { id: "yusuf-klick", duration: 350 },
  { id: "yusuf-tippen", duration: 1300 },
  { id: "yusuf-chip", duration: 550 },
  { id: "ruhe", duration: 700 },
];

/**
 * Zeigerpositionen in Prozent der Bühne, am Bildschirm ausgemessen.
 * Das Raster ist 3 × 2; angetippt werden die erste und die zweite Kachel der
 * oberen Reihe.
 */
const CURSOR_CHIP = { x: 19, y: 6 };
const CURSOR_TILES = [
  { x: 42, y: 37 },
  { x: 64, y: 37 },
];

export function DocumentationScene() {
  return (
    <SceneTimeline
      steps={STEPS}
      loopPauseMs={2000}
      kicker="08:15 · Live im Unterricht"
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

        const filtered = scene.reached("filter-klick");
        const tiles = scene.reached("raster");

        const cursor = scene.reached("yusuf-zeiger")
          ? CURSOR_TILES[1]
          : scene.reached("emma-zeiger")
            ? CURSOR_TILES[0]
            : CURSOR_CHIP;

        return (
          <UiWindow
            variant="app"
            active="beobachtungen"
            chips={[`Klasse ${DEMO_CLASS}`]}
            highlightChip={filtered ? 0 : -1}
            className="h-[27rem] sm:h-[22rem]"
          >
            <div className="flex items-center justify-between gap-3">
              <SceneLabel>Live-Unterricht-Modus</SceneLabel>

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

            {/* Die Kacheln erscheinen erst, nachdem der Chip gesetzt ist.
                Sie stehen trotzdem von Anfang an im DOM und belegen ihren
                Platz – sonst wüchse das Fenster mitten im Durchlauf. */}
            <div
              key={`raster-${scene.cycle}`}
              className={cn(
                // Zwei Spalten auf Mobilgeraeten: Bei drei brachen die Namen
                // nach drei Zeichen ab („Emm…“), und ein abgeschnittener Name
                // sieht nach Fehler aus statt nach Klassenliste.
                "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
                moving && tiles && "animate-panel-rise",
                !tiles && "opacity-0",
              )}
            >
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
              clicking={
                scene.at("filter-klick") ||
                scene.at("emma-klick") ||
                scene.at("yusuf-klick")
              }
              animate={moving}
            />
          </UiWindow>
        );
      }}
    </SceneTimeline>
  );
}
