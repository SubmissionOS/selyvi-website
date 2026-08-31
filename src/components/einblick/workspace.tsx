"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { DEMO_CLASS, DEMO_TIMETABLE_PRESET } from "@/config/demo-data";
import { UiWindow } from "@/components/scenes/ui-window";
import {
  AreaDevelopment,
  AreaMail,
  AreaMaterial,
  AreaObservations,
  AreaReports,
  AreaSeating,
  AreaTimetable,
  type Seat,
  type TourState,
} from "@/components/einblick/areas";
import {
  LOCKED_HINT,
  TourSidebar,
  type TourArea,
} from "@/components/einblick/tour-sidebar";

/**
 * Die Arbeitsfläche des Einblicks.
 *
 * ==========================================================================
 * FREIES NAVIGIEREN, KEINE TOUR
 * ==========================================================================
 * Die Seitenleiste ist der Hauptweg: Bereiche lassen sich in beliebiger
 * Reihenfolge anklicken, und der Zustand bleibt beim Wechsel erhalten – wer
 * eine Beobachtung waehlt, findet sie in Zeugnissen und Elternpost wieder.
 * Genau daran erkennt man Werkzeug-Software: Sie merkt sich, was man getan
 * hat, statt jeden Schritt neu abzufragen.
 *
 * Ein Vorschlag bleibt: Der naechste sinnvolle Bereich leuchtet in der Leiste
 * kurz auf. Er erzwingt nichts – wer woanders hinklickt, kommt dorthin.
 *
 * ==========================================================================
 * ES GIBT KEIN BACKEND. NICHTS WIRD GESENDET, NICHTS GESPEICHERT.
 * ==========================================================================
 * Alle Texte stehen fertig in demo-data.ts; ein Klick waehlt aus. Das Banner
 * ueber dem Fenster sagt das, und deshalb sagt KEINE Bestaetigung
 * „Gespeichert" – zwei widersprechende Aussagen auf einem Bildschirm sind
 * schlimmer als gar keine Bestaetigung.
 *
 * ==========================================================================
 * KEIN role="img", KEIN requestAnimationFrame
 * ==========================================================================
 * Die Szenen der anderen Seiten sind Bilder, denen man zusieht. Hier ist das
 * Gegenteil richtig: echte Buttons mit Namen, benannte Regionen, logische
 * Tab-Reihenfolge. Und es laeuft keine Schleife – das Diktat tickt ueber
 * setTimeout und hoert nach dem letzten Wort auf.
 */
const BANNER =
  "Einblick mit Beispieldaten – keine echte Anwendung, nichts wird gespeichert.";

const SEATS: Seat[] = [
  { id: "s1", initials: "EK", locked: false },
  { id: "s2", initials: "YA", locked: false },
  { id: "s3", initials: null, locked: true },
  { id: "s4", initials: "LB", locked: false },
  { id: "s5", initials: null, locked: false },
  { id: "s6", initials: "FS", locked: false },
];

const START: TourState = {
  chosen: null,
  filter: null,
  dictated: null,
  chatOpen: null,
  reportVariant: null,
  reportText: "",
  mailCreated: false,
  mailLang: "de",
  topic: null,
  sources: [],
  materialCreated: false,
  seats: SEATS,
  picked: null,
  refused: null,
  timetable: { ...DEMO_TIMETABLE_PRESET },
  timelineChild: "emma",
  openEntries: [],
};

/** Der sanfte Vorschlag: Was liegt als Nächstes nahe? */
function naechsterBereich(area: TourArea, state: TourState): TourArea | null {
  if (area === "beobachtungen") return state.chosen ? "zeugnisse" : null;
  if (area === "zeugnisse") return state.reportVariant !== null ? "elternpost" : null;
  if (area === "elternpost") return state.mailCreated ? "material" : null;
  if (area === "material") return state.materialCreated ? "sitzplan" : null;
  if (area === "sitzplan") return "stundenplan";
  if (area === "stundenplan") return "entwicklung";
  return null;
}

export function Workspace() {
  const reduced = useReducedMotion();

  const [area, setArea] = useState<TourArea>("beobachtungen");
  const [openLock, setOpenLock] = useState<string | null>(null);
  const [modeHint, setModeHint] = useState(false);
  const [state, set] = useState<TourState>(START);
  const [toast, setToast] = useState<string | null>(null);

  /**
   * Kurze Bestaetigung. Sie wird ueber aria-live angesagt – wer nicht
   * hinsieht, erfaehrt sonst nicht, dass die Aktion etwas bewirkt hat.
   */
  function notify(text: string) {
    setToast(text);
    window.setTimeout(() => setToast((t) => (t === text ? null : t)), 2200);
  }

  const actions = { set, notify, reduced };

  /** Drei Startbeobachtungen plus die diktierte. */
  const observationCount = 3 + (state.dictated ? 1 : 0);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm text-gray-500">{BANNER}</p>

        <button
          type="button"
          onClick={() => {
            set(START);
            setArea("beobachtungen");
            notify("Zurückgesetzt");
          }}
          className="text-sm text-brand-600 underline underline-offset-4"
        >
          Zurücksetzen
        </button>
      </div>

      <div className="relative mt-4">
        <UiWindow
          variant="app"
          chips={[`Klasse ${DEMO_CLASS}`]}
          className="min-h-[34rem]"
          navSlot={
            <TourSidebar
              current={area}
              onSelect={(next) => {
                setArea(next);
                setOpenLock(null);
                setModeHint(false);
              }}
              openLock={openLock}
              onLock={setOpenLock}
              observationCount={observationCount}
              suggested={naechsterBereich(area, state)}
            />
          }
        >
          {/* Der Modus-Umschalter. Er sieht aus wie im Produkt und ist auch
              dort einer – hier fuehrt er zum Schloss-Hinweis. Der
              Leitungsmodus bleibt dem Gespraech vorbehalten. */}
          <div className="relative mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
            <span className="rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-medium text-brand-800">
              Lehrkraft
            </span>
            <button
              type="button"
              aria-describedby={modeHint ? "einblick-modus-hinweis" : undefined}
              /* Nur oeffnen, nicht umschalten: Der Fokus oeffnet den Hinweis
                 bereits, und ein Toggle danach haette ihn beim Klick sofort
                 wieder geschlossen. */
              onClick={() => setModeHint(true)}
              onFocus={() => setModeHint(true)}
              onBlur={() => setModeHint(false)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] text-gray-500 hover:text-brand-600"
            >
              Leitung
              <Lock aria-hidden="true" className="size-3" />
            </button>

            {modeHint ? (
              <p
                id="einblick-modus-hinweis"
                role="status"
                className="absolute top-full left-0 z-10 mt-1 w-64 rounded-md border border-gray-200 bg-surface p-3 text-[11px] text-ink shadow-sm"
              >
                Den Leitungsmodus zeigen wir Ihnen persönlich – im{" "}
                <Link
                  href="/demo"
                  className="text-brand-600 underline underline-offset-4"
                >
                  Kennenlernen
                </Link>
                .
              </p>
            ) : null}
          </div>

          {area === "beobachtungen" ? (
            <AreaObservations state={state} actions={actions} />
          ) : null}
          {area === "zeugnisse" ? <AreaReports state={state} actions={actions} /> : null}
          {area === "elternpost" ? <AreaMail state={state} actions={actions} /> : null}
          {area === "material" ? <AreaMaterial state={state} actions={actions} /> : null}
          {area === "sitzplan" ? <AreaSeating state={state} actions={actions} /> : null}
          {area === "stundenplan" ? (
            <AreaTimetable state={state} actions={actions} />
          ) : null}
          {area === "entwicklung" ? (
            <AreaDevelopment state={state} actions={actions} />
          ) : null}
        </UiWindow>

        {/* Die Bestaetigung. Der Bereich existiert IMMER im DOM, damit
            aria-live ihn beobachten kann – ein Element, das erst mit dem
            Text erscheint, wird von Screenreadern haeufig verschluckt. */}
        <div
          aria-live="polite"
          className="pointer-events-none absolute right-3 bottom-3 z-20"
        >
          {toast ? (
            <span
              className={cn(
                "rounded-md border border-gray-200 bg-surface px-3 py-1.5 text-[11px] text-ink shadow-sm",
                reduced ? "" : "animate-chip-pop",
              )}
            >
              {toast}
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Vier Bereiche und der Leitungsmodus sind gesperrt. {LOCKED_HINT}
      </p>
    </div>
  );
}
