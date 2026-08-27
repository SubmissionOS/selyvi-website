"use client";

import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { DEMO_CHAT, DEMO_CLASS } from "@/config/demo-data";
import { ChipPop } from "@/components/scenes/chip-pop";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { TypingText } from "@/components/scenes/typing-text";
import { SceneLabel } from "@/components/scenes/produkt/scene-panel";
import { UiWindow } from "@/components/scenes/ui-window";

/**
 * Szene „Fragen Sie Ihre eigene Dokumentation".
 *
 * Zeigt die Funktion „Freie Fragen an die eigenen Daten" – laut
 * docs/produktstand-2026-08.md **Live**, und bis jetzt auf der ganzen Website
 * nirgends gezeigt. Das ist der Grund, warum sie hier steht: Sie ist die
 * einzige Stelle, an der sichtbar wird, dass die Dokumentation nicht nur
 * hineingeht, sondern auch wieder herauskommt.
 *
 * ==========================================================================
 * DER BADGE IST DIE AUSSAGE, NICHT DIE DEKORATION
 * ==========================================================================
 * „Antworten nur aus Ihren eigenen Einträgen" ist woertlich die Live-Wahrheit
 * aus dem Produktstand: „der Kontext wird serverseitig auf die eigenen Daten
 * begrenzt". Ohne diesen Satz sieht die Szene aus wie ein Chatbot, der
 * irgendwoher weiss, wie ein Kind liest – und genau das ist die Sorge, die
 * eine Lehrkraft bei diesem Bild als Erstes hat.
 *
 * Er erscheint deshalb ZUSAMMEN mit der Antwort und bleibt danach stehen.
 *
 * KEIN Filter-Moment, kein Zeiger: Die Szene hat nur eine Bewegung – tippen,
 * antworten, belegen. Ein Cursor waere die vierte Sache, die passiert.
 */
const STEPS: SceneStep[] = [
  { id: "frage", duration: 1600 },
  { id: "denkt", duration: 700 },
  { id: "antwort", duration: 1800, delay: 200 },
  { id: "belege", duration: 700 },
  { id: "ruhe", duration: 900 },
];

export function ChatScene() {
  return (
    <SceneTimeline
      steps={STEPS}
      loopPauseMs={2400}
      kicker="16:45 · Vor dem Elterngespräch"
      label={`Animierte Darstellung einer freien Frage an die eigene Dokumentation: In ein Eingabefeld wird „${DEMO_CHAT.question}" getippt. Darunter entsteht eine Antwort aus zwei Sätzen, die auf zwei zuvor erfasste Beobachtungen verweist. Ein Hinweis nennt, dass die Antwort ausschliesslich aus den eigenen Einträgen der Lehrkraft stammt. Alle Daten sind erfunden.`}
    >
      {(scene) => {
        const moving = !scene.isStatic;
        const paused = !scene.running;

        const answering = scene.reached("antwort");
        const showReferences = scene.reached("belege");

        return (
          <UiWindow
            variant="app"
            active="beobachtungen"
            chips={[`Klasse ${DEMO_CLASS}`]}
            className="h-[24rem] sm:h-[21rem]"
          >
            <SceneLabel>Frage an die eigenen Daten</SceneLabel>

            {/* ---------- Eingabezeile ---------- */}
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-gray-200 bg-surface-alt px-3 py-2.5">
              <MessageSquare
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-brand-600"
              />
              <p className="min-w-0 text-[13px] leading-relaxed text-ink">
                <TypingText
                  text={DEMO_CHAT.question}
                  durationMs={1500}
                  animate={moving}
                  paused={paused}
                  keepCaret={!answering}
                />
              </p>
            </div>

            {/* ---------- Antwortbereich ----------
                Feste Hoehe, damit das Erscheinen der Antwort nichts
                verschiebt. Die Szene traegt damit wie alle anderen CLS 0. */}
            <div className="mt-4 h-[11.5rem] sm:h-[9.5rem]">
              {answering ? (
                <div>
                  <p className="text-[13px] leading-relaxed text-ink">
                    <TypingText
                      text={DEMO_CHAT.answer}
                      durationMs={1700}
                      animate={moving}
                      paused={paused}
                    />
                  </p>

                  {/* Verweis-Chips. Sie zeigen, DASS die Antwort auf Eintraege
                      zurueckgeht – der Beleg ist der Punkt, nicht der Inhalt. */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {DEMO_CHAT.references.map((reference, position) => (
                      <ChipPop
                        key={reference}
                        animate={moving && showReferences}
                        delayMs={position * 140}
                        className={cn(
                          "rounded-full border border-gray-200 bg-surface px-2 py-0.5 text-[10px] text-gray-500",
                          showReferences ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {reference}
                      </ChipPop>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ---------- Die Zusage, die diese Szene braucht ---------- */}
            <p
              className={cn(
                "mt-1 border-t border-gray-200 pt-3 text-[11px] text-gray-500 transition-opacity",
                answering ? "opacity-100" : "opacity-0",
              )}
            >
              Antworten nur aus Ihren eigenen Einträgen
            </p>
          </UiWindow>
        );
      }}
    </SceneTimeline>
  );
}
