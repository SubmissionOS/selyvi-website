"use client";

import type { ReactNode } from "react";
import { Mic } from "lucide-react";

import { cn } from "@/lib/utils";
import { DEMO_QUICK_NOTE, DEMO_RELIEF_MONTH } from "@/config/demo-data";
import { TRANSLATION_LANGUAGE_COUNT } from "@/config/product";
import { ChipPop } from "@/components/scenes/chip-pop";
import { CountUp } from "@/components/scenes/count-up";
import { FakeCursor } from "@/components/scenes/fake-cursor";
import { MorphLine } from "@/components/scenes/morph-line";
import { ProgressPulse } from "@/components/scenes/progress-pulse";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { TypingText } from "@/components/scenes/typing-text";

/**
 * Die drei kleinen Szenen der Sektion „So funktioniert's".
 *
 * ==========================================================================
 * BEWUSST SPARSAMER ALS DIE HERO-SZENE
 * --------------------------------------------------------------------------
 * Sie stehen zu dritt nebeneinander unter einer Überschrift. Was im Hero
 * angemessen ist – ein Fensterrahmen, mehrere Bereiche, ein langer Ablauf –
 * ergäbe hier drei konkurrierende Blickfänge.
 *
 * Deshalb je Szene: EIN Gedanke, eine 112 px hohe Bühne ohne Fensterchrome,
 * ein Durchlauf von rund sechs bis sieben Sekunden. Und ein versetzter Start,
 * damit sich nicht drei Dinge gleichzeitig bewegen.
 *
 * Die Bühnenhöhe entspricht exakt der der bisherigen statischen Skelette
 * (`h-28`) – die Kartengrösse der Sektion ändert sich dadurch nicht.
 * ==========================================================================
 *
 * Alle drei liegen in einer <SceneGroup /> (siehe how-it-works.tsx): EIN
 * IntersectionObserver für die ganze Sektion, Staffelung über `startDelayMs`.
 *
 * Leistungsregeln wie im Hero: nur transform und opacity, `paused` an jeden
 * Baustein mit eigener Schleife, damit ausserhalb des Sichtbereichs nichts
 * läuft.
 */

/** Gemeinsame Bühne. `relative` ist Voraussetzung für <FakeCursor />. */
function MiniStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-28 overflow-hidden rounded-lg border border-gray-200 bg-surface-alt p-3">
      {children}
    </div>
  );
}

/* ==========================================================================
   Szene 1 – Beobachten, nebenbei
   ========================================================================== */

const OBSERVE_STEPS: SceneStep[] = [
  { id: "tippen", duration: 2200 },
  { id: "chip", duration: 900, delay: 250 },
  { id: "ruhe", duration: 1200 },
];

export function ObserveScene({ startDelayMs = 0 }: { startDelayMs?: number }) {
  return (
    <SceneTimeline
      steps={OBSERVE_STEPS}
      startDelayMs={startDelayMs}
      loopPauseMs={2000}
      kicker="08:15"
      label="Kleine Animation: Eine kurze Unterrichtsbeobachtung wird ins Eingabefeld getippt oder diktiert und anschliessend automatisch dem Fach Mathematik zugeordnet. Die gezeigten Daten sind erfunden."
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const paused = !scene.running;

        return (
          <MiniStage>
            <div className="flex items-start gap-2.5">
              <ProgressPulse
                active={scene.running && scene.at("tippen")}
                className="size-7"
              >
                <Mic className="size-3.5" />
              </ProgressPulse>

              <div className="min-h-10 min-w-0 flex-1 rounded-md border border-gray-200 bg-surface px-2.5 py-1.5 text-[11px] leading-relaxed text-ink">
                <TypingText
                  key={`notiz-${scene.cycle}`}
                  text={DEMO_QUICK_NOTE.input}
                  durationMs={OBSERVE_STEPS[0].duration}
                  animate={moving}
                  paused={paused}
                />
              </div>
            </div>

            {/* Feste Mindesthöhe, damit der Chip beim Erscheinen nichts
                verschiebt. */}
            <div className="mt-2.5 flex min-h-6 items-center">
              {scene.reached("chip") ? (
                <ChipPop
                  key={`fach-${scene.cycle}`}
                  animate={moving}
                  className="px-2 py-0.5 text-[10px]"
                >
                  {DEMO_QUICK_NOTE.chip}
                </ChipPop>
              ) : null}
            </div>
          </MiniStage>
        );
      }}
    </SceneTimeline>
  );
}

/* ==========================================================================
   Szene 2 – Daraus entstehen Texte
   ========================================================================== */

const GENERATE_STEPS: SceneStep[] = [
  { id: "karten", duration: 1100 },
  { id: "zeiger", duration: 700, delay: 200 },
  { id: "klick", duration: 500 },
  { id: "uebersetzen", duration: 1300 },
  { id: "ruhe", duration: 900 },
];

/**
 * Ruheposition und Klickziel des Zeigers, in Prozent der Bühne.
 * Am Bildschirm ausgemessen – das Ziel ist der Umschalter „DE → TR" in der
 * Kopfzeile der Elternmail-Karte.
 */
const TOGGLE_REST = { x: 14, y: 20 };
const TOGGLE_TARGET = { x: 84, y: 62 };

export function GenerateScene({ startDelayMs = 0 }: { startDelayMs?: number }) {
  return (
    <SceneTimeline
      steps={GENERATE_STEPS}
      startDelayMs={startDelayMs}
      loopPauseMs={2000}
      kicker="17:10 · Nach dem Unterricht"
      label={`Kleine Animation: Aus der Beobachtung entstehen zwei Entwürfe – eine Zeugnisbemerkung und eine Elternmail. In der Elternmail wird die Sprache von Deutsch auf Türkisch umgeschaltet; insgesamt stehen ${TRANSLATION_LANGUAGE_COUNT} Zielsprachen zur Verfügung.`}
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const built = scene.reached("karten");
        const translated = scene.reached("uebersetzen");
        const cursor = scene.reached("zeiger") ? TOGGLE_TARGET : TOGGLE_REST;

        return (
          <MiniStage>
            <div className="space-y-1.5">
              {/* Karte 1 – Zeugnisbemerkung */}
              <div
                key={`zeugnis-${scene.cycle}`}
                className={cn(
                  "rounded border border-gray-200 bg-surface px-2 py-1",
                  moving && built && "animate-panel-rise",
                  !built && "opacity-0",
                )}
              >
                <div className="text-[9px] font-medium tracking-wide text-gray-500 uppercase">
                  Zeugnisbemerkung
                </div>
                <div className="mt-1 h-1.5 w-4/5 rounded bg-gray-200" />
              </div>

              {/* Karte 2 – Elternmail mit Sprachumschalter */}
              <div
                key={`mail-${scene.cycle}`}
                className={cn(
                  "rounded border border-gray-200 bg-surface px-2 py-1",
                  moving && built && "animate-panel-rise",
                  !built && "opacity-0",
                )}
                // Die zweite Karte kommt knapp nach der ersten.
                style={moving && built ? { animationDelay: "160ms" } : undefined}
              >
                {/* Badge und Umschalter stehen BEIDE in der Kopfzeile.
                    Der Umschalter hatte zuerst eine eigene Zeile darunter –
                    damit war die Karte höher als die 112 px der Bühne und
                    wurde unten abgeschnitten. */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="truncate text-[9px] font-medium tracking-wide text-gray-500 uppercase">
                    Elternmail
                  </span>

                  <div className="flex shrink-0 items-center gap-1">
                    <span className="rounded-full bg-brand-100 px-1.5 py-px text-[9px] font-medium text-brand-800">
                      {TRANSLATION_LANGUAGE_COUNT} Sprachen
                    </span>

                    {/* Klickziel des Zeigers. */}
                    <span
                      className={cn(
                        "rounded border px-1.5 py-px text-[9px] font-medium",
                        translated
                          ? "border-brand-600 bg-brand-600 text-surface"
                          : "border-gray-200 text-gray-500",
                      )}
                    >
                      DE → TR
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <MorphLine
                    before={[1, 0.8, 0.55]}
                    after={[0.65, 1, 0.85]}
                    translated={translated}
                    animate={moving}
                  />
                  <MorphLine
                    before={[0.7, 1, 0.4]}
                    after={[1, 0.55, 0.75]}
                    translated={translated}
                    animate={moving}
                  />
                </div>
              </div>
            </div>

            <FakeCursor
              key={`zeiger-${scene.cycle}`}
              x={cursor.x}
              y={cursor.y}
              visible={moving}
              clicking={scene.at("klick")}
              animate={moving}
              compact
            />
          </MiniStage>
        );
      }}
    </SceneTimeline>
  );
}

/* ==========================================================================
   Szene 3 – Die Schulleitung sieht die gewonnene Zeit
   ========================================================================== */

const REPORT_STEPS: SceneStep[] = [
  { id: "zahl", duration: 1600 },
  { id: "balken", duration: 1000, delay: 150 },
  { id: "ruhe", duration: 1300 },
];

/** Endhöhen der beiden Balken, als Faktor für scaleY. */
const BAR_HEIGHTS = [0.55, 1];

export function ReportScene({ startDelayMs = 0 }: { startDelayMs?: number }) {
  return (
    <SceneTimeline
      steps={REPORT_STEPS}
      startDelayMs={startDelayMs}
      loopPauseMs={2000}
      kicker="Monatsende"
      label={`Kleine Animation: Der Entlastungsbericht der Schulleitung zählt auf ${DEMO_RELIEF_MONTH.hours} Stunden gewonnene Zeit im Monat hoch, ausdrücklich als Schätzwert gekennzeichnet.`}
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const grown = scene.reached("balken");

        return (
          <MiniStage>
            <div className="flex h-full flex-col justify-between">
              <span className="text-[9px] font-medium tracking-wide text-gray-500 uppercase">
                Entlastungsbericht
              </span>

              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xl leading-none font-semibold text-ink">
                    <CountUp
                      key={`stunden-${scene.cycle}`}
                      value={DEMO_RELIEF_MONTH.hours}
                      decimals={1}
                      durationMs={REPORT_STEPS[0].duration}
                      animate={moving}
                      paused={!scene.running}
                      suffix={` ${DEMO_RELIEF_MONTH.unit}`}
                    />
                  </div>

                  {/* „Gewonnene Zeit", nicht „Wirkung" – und der Schätzwert
                      steht dauerhaft dabei, nicht als Fussnote. Beides folgt
                      docs/produktstand-2026-08.md. */}
                  <div className="mt-1 truncate text-[9px] text-gray-500">
                    gewonnene Zeit · {DEMO_RELIEF_MONTH.note}
                  </div>
                </div>

                {/* Balken wachsen über scaleY mit Ursprung unten – keine
                    Höhenanimation, die Layout auslösen würde. */}
                <div className="flex h-14 shrink-0 items-end gap-1.5">
                  {BAR_HEIGHTS.map((height, position) => (
                    <span
                      key={position}
                      className={cn(
                        "h-full w-3.5 origin-bottom rounded-t",
                        position === BAR_HEIGHTS.length - 1
                          ? "bg-brand-100"
                          : "bg-gray-200",
                        moving && "transition-transform duration-700 ease-out",
                      )}
                      style={{
                        transform: `scaleY(${grown ? height : 0.08})`,
                        transitionDelay: moving ? `${position * 120}ms` : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </MiniStage>
        );
      }}
    </SceneTimeline>
  );
}
