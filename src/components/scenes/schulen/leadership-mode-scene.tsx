"use client";

import { cn } from "@/lib/utils";
import {
  DEMO_COLLEGIUM_USAGE,
  DEMO_LIVE_NOTES,
  DEMO_RELIEF_REPORT,
} from "@/config/demo-data";
import { Wordmark } from "@/components/layout/wordmark";
import { FakeCursor } from "@/components/scenes/fake-cursor";
import { SceneTimeline, type SceneStep } from "@/components/scenes/scene-timeline";
import { ScenePanel, SceneLabel } from "@/components/scenes/produkt/scene-panel";

/**
 * Szene F – Leitungsmodus.
 *
 * ==========================================================================
 * DIE STÄRKSTE VERTRAUENS-AUSSAGE DIESER SEITE, UND SIE BESTEHT AUS EINER
 * LEERSTELLE
 * --------------------------------------------------------------------------
 * Die Schulleitung schaltet um und sieht: gewonnene Zeit, Automatisierung,
 * Nutzung im Kollegium. Was sie NICHT sieht, ist der eigentliche Inhalt – die
 * Balken zur Nutzung tragen keine Namen.
 *
 * Der Produktstand begründet das als Produktpolitik: „Eine namentliche
 * Rangliste des Kollegiums wäre in einer Schule ein Personalinstrument." Ein
 * Kollegium, das eine Software eingeführt bekommt, fragt genau das als Erstes.
 * Als Animation lässt sich die Antwort zeigen, statt sie zu behaupten.
 *
 * Der Umschalter ist deshalb auch keine Spielerei: Er macht sichtbar, dass es
 * zwei getrennte Ansichten sind und nicht eine Oberfläche, in der die Leitung
 * mehr sieht als die Lehrkraft.
 * ==========================================================================
 *
 * WORTLAUT-SPERRE wie in Szene D: „Wirkung" kommt nicht vor. Die Kachel heisst
 * „gewonnene Zeit" und trägt den Schätzwert-Hinweis.
 */
const STEPS: SceneStep[] = [
  { id: "lehrkraft", duration: 1800 },
  { id: "zeiger-hin", duration: 700, delay: 200 },
  { id: "klick-hin", duration: 400 },
  { id: "leitung", duration: 2000 },
  { id: "zeiger-zurueck", duration: 700, delay: 300 },
  { id: "klick-zurueck", duration: 400 },
  { id: "ruhe", duration: 900 },
];

/** Zeigerpositionen in Prozent der Bühne, am Bildschirm ausgemessen. */
const CURSOR_REST = { x: 18, y: 58 };
const CURSOR_TOGGLE = { x: 84, y: 9 };
const CURSOR_BROWSE = { x: 24, y: 74 };

export function LeadershipModeScene() {
  return (
    <SceneTimeline
      steps={STEPS}
      loopPauseMs={2000}
      /*
       * Der letzte Schritt ist die Lehrkraft-Ansicht – die Szene schaltet ja
       * zurück. Für den statischen Fall wäre das das falsche Bild: Es zeigte
       * gerade nicht, was die Szene sagen will. Deshalb friert sie bei
       * prefers-reduced-motion auf der Leitungs-Ansicht ein.
       */
      staticStepId="leitung"
      label={`Animierte Darstellung des Leitungsmodus: Ein Umschalter wechselt von der Ansicht der Lehrkraft mit ihren Beobachtungen zur Ansicht der Schulleitung mit gewonnener Zeit, Automatisierungsquote und der Nutzung im Kollegium. Die Balken zur Nutzung tragen bewusst keine Namen – sie zeigen eine Verteilung, keine Rangliste. Alle Daten sind erfunden.`}
    >
      {(scene) => {
        const moving = !scene.isStatic;

        /** Leitungs-Ansicht: ab dem ersten Klick bis zum Rückklick. */
        const leadership = scene.reached("klick-hin") && !scene.reached("klick-zurueck");

        const cursor = scene.reached("zeiger-zurueck")
          ? CURSOR_TOGGLE
          : scene.reached("leitung")
            ? CURSOR_BROWSE
            : scene.reached("zeiger-hin")
              ? CURSOR_TOGGLE
              : CURSOR_REST;

        return (
          <ScenePanel className="h-[21rem] sm:h-[18rem]">
            <div className="flex h-full flex-col">
              {/* ---------- App-Kopf mit Umschalter ---------- */}
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 pb-3">
                <Wordmark className="text-sm" />

                <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-surface-alt p-0.5">
                  {["Lehrkraft", "Leitung"].map((mode, position) => {
                    const isActive = position === (leadership ? 1 : 0);

                    return (
                      <span
                        key={mode}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-[10px] font-medium",
                          // KEIN `opacity-70` auf der inaktiven Schaltfläche.
                          // Genau das stand hier zuerst und ergab 2,65:1
                          // Kontrast statt der geforderten 4,5:1 – Lighthouse
                          // fiel dadurch von 100 auf 96 Accessibility-Punkte.
                          // Die Regel steht im README: Schrift wird nie
                          // abgedunkelt. Der Unterschied zwischen aktiv und
                          // inaktiv trägt die Fläche, nicht die Deckkraft.
                          isActive ? "bg-brand-600 text-surface" : "text-gray-500",
                        )}
                      >
                        {mode}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* ---------- Zwei Ansichten, übereinandergelegt ----------
                  Beide liegen auf `inset-0` im selben Kasten. Dadurch kann die
                  Kreuzblende nur `opacity` bewegen und das Umschalten löst
                  keinen Layout-Durchlauf und keinen Sprung aus. */}
              <div className="relative mt-4 min-h-0 flex-1">
                {/* Ansicht 1 – Lehrkraft */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    leadership ? "opacity-0" : "opacity-100",
                  )}
                >
                  <SceneLabel>Meine Beobachtungen</SceneLabel>

                  <ul className="mt-2 space-y-2">
                    {DEMO_LIVE_NOTES.map((note) => (
                      <li
                        key={note.child}
                        className="flex items-center gap-2 rounded-md border border-gray-200 bg-surface p-2"
                      >
                        <span className="shrink-0 text-[11px] font-medium text-ink">
                          {note.child}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[11px] text-gray-500">
                          {note.note}
                        </span>
                        <span className="shrink-0 rounded-full border border-gray-200 bg-surface-alt px-2 py-0.5 text-[9px] font-medium text-brand-800">
                          {note.chip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ansicht 2 – Leitung */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    leadership ? "opacity-100" : "opacity-0",
                  )}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-gray-200 bg-surface p-2.5">
                      <div className="text-lg leading-none font-semibold text-ink">
                        {DEMO_RELIEF_REPORT.hours} Std.
                      </div>
                      <div className="mt-1 text-[9px] text-gray-500">
                        gewonnene Zeit · {DEMO_RELIEF_REPORT.note}
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-200 bg-surface p-2.5">
                      <div className="text-lg leading-none font-semibold text-ink">
                        {DEMO_RELIEF_REPORT.automationRate} %
                      </div>
                      <div className="mt-1 text-[9px] text-gray-500">
                        Automatisierungsquote
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 rounded-md border border-gray-200 bg-surface p-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <SceneLabel>Nutzung im Kollegium</SceneLabel>
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[9px] font-medium text-brand-800">
                        {DEMO_COLLEGIUM_USAGE.badge}
                      </span>
                    </div>

                    {/* KEINE Beschriftung unter den Balken. Siehe
                        DEMO_COLLEGIUM_USAGE in demo-data.ts – die fehlenden
                        Namen sind die Aussage, nicht eine Auslassung.

                        Feste Balkenbreite statt `flex-1`: In der vollen Breite
                        der Sektion wurden aus den Balken sonst liegende
                        Bänder, die niemand mehr als Diagramm liest. */}
                    <div className="mt-2.5 flex h-14 items-end gap-2">
                      {DEMO_COLLEGIUM_USAGE.bars.map((height, position) => (
                        <span
                          key={position}
                          className={cn(
                            "h-full w-5 origin-bottom rounded-t bg-brand-100",
                            moving && "transition-transform duration-700 ease-out",
                          )}
                          style={{
                            transform: `scaleY(${leadership ? height : 0.06})`,
                            transitionDelay: moving ? `${position * 60}ms` : undefined,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FakeCursor
              key={`zeiger-${scene.cycle}`}
              x={cursor.x}
              y={cursor.y}
              visible={moving}
              clicking={scene.at("klick-hin") || scene.at("klick-zurueck")}
              animate={moving}
            />
          </ScenePanel>
        );
      }}
    </SceneTimeline>
  );
}
