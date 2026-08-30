"use client";

import { useState } from "react";
import { Lock, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { DEMO_CLASS, DEMO_TOUR_OBSERVATIONS } from "@/config/demo-data";
import { TypingText } from "@/components/scenes/typing-text";
import { UiWindow } from "@/components/scenes/ui-window";
import { Button } from "@/components/ui/button";
import { TourSidebar, type TourArea } from "@/components/einblick/tour-sidebar";

/**
 * Der geführte Einblick – drei Stationen in einer nachgebauten Oberfläche.
 *
 * ==========================================================================
 * ES GIBT KEIN BACKEND. NICHTS WIRD GESENDET, NICHTS GESPEICHERT.
 * ==========================================================================
 * Beobachtungen und Zeugnistexte stehen fertig in demo-data.ts. Der Klick
 * waehlt aus, er erzeugt nicht. Genau das steht dauerhaft ueber dem Fenster –
 * nicht im Kleingedruckten, sondern als erste Zeile, die man liest.
 *
 * ==========================================================================
 * WARUM DAS HIER KEIN role="img" IST
 * ==========================================================================
 * Die Szenen auf den anderen Seiten sind Bilder: Man sieht ihnen zu, deshalb
 * role="img" mit einer Beschreibung und aria-hidden fuer alles darin. Hier
 * ist das Gegenteil richtig – das Fenster ist BEDIENBAR. Es besteht aus
 * echten Buttons mit Beschriftungen, jede Station ist eine benannte Region,
 * und die Tab-Reihenfolge folgt dem Ablauf. Ein role="img" wuerde den ganzen
 * Inhalt vor Screenreadern verstecken und die Tour damit unbedienbar machen.
 *
 * ==========================================================================
 * BEWEGUNG
 * ==========================================================================
 * Kein requestAnimationFrame, kein Autoplay, keine Zeitleiste: Es passiert
 * nichts, solange niemand klickt. Im Ruhezustand kostet die Seite null.
 *
 * Bei prefers-reduced-motion laufen die UEBERGAENGE sofort statt animiert –
 * der Entwurf steht auf einen Schlag da, der Sitzplatz-Tausch ohne Gleiten.
 * Die Interaktivitaet selbst bleibt: Sie ist nutzergesteuert und damit genau
 * das, was die Einstellung erlaubt.
 */
const HONESTY_LINE =
  "Geführter Einblick mit Beispieldaten – keine echte Anwendung, nichts wird gespeichert.";

/**
 * Sitzplan: Raster 3 x 2. s3 ist gesperrt und bleibt es.
 *
 * Der Typ steht ausdruecklich da: Ohne ihn leitet TypeScript aus den
 * Startwerten ab, dass belegte Plaetze IMMER belegt und freie IMMER frei
 * sind – und lehnt den Tausch dann ab.
 */
type Seat = { id: string; initials: string | null; locked?: boolean };

const SEATS: Seat[] = [
  { id: "s1", initials: "EK" },
  { id: "s2", initials: "YA" },
  { id: "s3", initials: null, locked: true },
  { id: "s4", initials: "LB" },
  { id: "s5", initials: null },
  { id: "s6", initials: "FS" },
];

export function GuidedTour() {
  const reduced = useReducedMotion();

  const [area, setArea] = useState<TourArea>("beobachtungen");
  const [openLock, setOpenLock] = useState<string | null>(null);

  /** Station 1: gewaehlte Beobachtung. */
  const [chosen, setChosen] = useState<string | null>(null);
  /** Station 2: Entwurf angefordert? */
  const [drafted, setDrafted] = useState(false);
  /** Station 3: Sitzplan-Zustand und aufgenommene Kachel. */
  const [seats, setSeats] = useState(SEATS);
  const [picked, setPicked] = useState<string | null>(null);
  const [refused, setRefused] = useState<string | null>(null);

  const observation = DEMO_TOUR_OBSERVATIONS.find((entry) => entry.id === chosen);

  function chooseSeat(id: string) {
    const seat = seats.find((entry) => entry.id === id);
    if (!seat) return;

    // Gesperrt: kurz verweigern statt still nichts zu tun.
    if (seat.locked) {
      setRefused(id);
      window.setTimeout(() => setRefused(null), 400);
      return;
    }

    if (picked === null) {
      if (seat.initials === null) return;
      setPicked(id);
      return;
    }

    if (picked === id) {
      setPicked(null);
      return;
    }

    setSeats((current) => {
      const from = current.find((entry) => entry.id === picked);
      const to = current.find((entry) => entry.id === id);
      if (!from || !to) return current;

      return current.map((entry) => {
        if (entry.id === picked) return { ...entry, initials: to.initials };
        if (entry.id === id) return { ...entry, initials: from.initials };
        return entry;
      });
    });
    setPicked(null);
  }

  return (
    <div>
      {/* Die Ehrlichkeitszeile steht ÜBER dem Fenster und bleibt immer
          sichtbar – sie scrollt nicht mit der Station weg. */}
      <p className="text-sm text-gray-500">{HONESTY_LINE}</p>

      <UiWindow
        variant="app"
        chips={[`Klasse ${DEMO_CLASS}`]}
        className="mt-4 min-h-[30rem]"
        navSlot={
          <TourSidebar
            current={area}
            onSelect={(next) => {
              setArea(next);
              setOpenLock(null);
            }}
            openLock={openLock}
            onLock={setOpenLock}
          />
        }
      >
        {/* ---------- Station 1 ---------- */}
        {area === "beobachtungen" ? (
          <section aria-labelledby="station-beobachtungen">
            <h2
              id="station-beobachtungen"
              className="text-xs font-medium tracking-wide text-gray-500 uppercase"
            >
              Beobachtungen
            </h2>

            <p className="mt-3 text-sm text-ink">
              Wählen Sie eine Beobachtung aus dem Unterricht.
            </p>

            <ul className="mt-4 flex flex-col gap-2">
              {DEMO_TOUR_OBSERVATIONS.map((entry) => {
                const isChosen = chosen === entry.id;

                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setChosen(entry.id);
                        setDrafted(false);
                      }}
                      aria-pressed={isChosen}
                      className={cn(
                        "w-full rounded-lg border p-3 text-left",
                        isChosen
                          ? "border-brand-600 bg-surface-alt"
                          : "border-gray-200 bg-surface hover:border-brand-600",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-800">
                          {entry.initials}
                        </span>
                        <span className="text-[13px] text-ink">{entry.note}</span>
                      </span>

                      {/* Die Struktur-Chips erscheinen erst nach der Wahl –
                          das ist der sichtbare Vorgang „Freitext wird
                          strukturierte Beobachtung". */}
                      {isChosen ? (
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          {entry.chips.map((chip) => (
                            <span
                              key={chip}
                              className={cn(
                                "rounded-full border border-brand-600 bg-brand-100 px-2 py-0.5 text-[10px] text-brand-800",
                                reduced ? "" : "animate-chip-pop",
                              )}
                            >
                              {chip}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5">
              <Button
                variant="outline"
                size="md"
                disabled={!chosen}
                onClick={() => setArea("zeugnisse")}
              >
                Weiter zu Zeugnissen
              </Button>
            </div>
          </section>
        ) : null}

        {/* ---------- Station 2 ---------- */}
        {area === "zeugnisse" ? (
          <section aria-labelledby="station-zeugnisse">
            <h2
              id="station-zeugnisse"
              className="text-xs font-medium tracking-wide text-gray-500 uppercase"
            >
              Zeugnisse
            </h2>

            {observation ? (
              <>
                <p className="mt-3 text-sm text-ink">
                  {/* Ohne Schlusspunkt: Der abgekuerzte Nachname traegt
                      bereits einen, sonst steht dort „Emma K..". */}
                  Grundlage: Ihre Beobachtung zu {observation.child}
                </p>

                <div className="mt-4 rounded-lg border border-gray-200 bg-surface-alt p-3 text-[13px] text-gray-500">
                  {observation.note}
                </div>

                {drafted ? (
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-medium text-brand-800">
                      <Sparkles aria-hidden="true" className="size-3" />
                      In Ihrem Schreibstil
                    </span>

                    <p className="mt-3 text-[13px] leading-relaxed text-ink">
                      <TypingText
                        text={observation.report}
                        durationMs={1600}
                        animate={!reduced}
                      />
                    </p>

                    <p className="mt-3 text-[11px] text-gray-500">
                      Vorbereitetes Beispiel
                    </p>

                    <div className="mt-5">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => setArea("sitzplan")}
                      >
                        Weiter zum Sitzplan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <Button variant="outline" size="md" onClick={() => setDrafted(true)}>
                      Entwurf erzeugen
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <p className="mt-3 text-sm text-ink">
                Wählen Sie zuerst unter „Beobachtungen“ einen Eintrag aus.
              </p>
            )}
          </section>
        ) : null}

        {/* ---------- Station 3 ---------- */}
        {area === "sitzplan" ? (
          <section aria-labelledby="station-sitzplan">
            <h2
              id="station-sitzplan"
              className="text-xs font-medium tracking-wide text-gray-500 uppercase"
            >
              Sitzplan
            </h2>

            <p className="mt-3 text-sm text-ink">
              Ein Kind antippen, dann den neuen Platz – die beiden tauschen.
            </p>

            <p className="mt-3 rounded-md bg-surface-alt py-1 text-center text-[10px] tracking-wide text-gray-500 uppercase">
              Tafel
            </p>

            <ul className="mt-3 grid grid-cols-3 gap-2">
              {seats.map((seat) => {
                const isPicked = picked === seat.id;
                const isRefused = refused === seat.id;
                const beschriftung = seat.locked
                  ? "Gesperrter Platz"
                  : seat.initials
                    ? `Platz von ${seat.initials}`
                    : "Freier Platz";

                return (
                  <li key={seat.id}>
                    <button
                      type="button"
                      onClick={() => chooseSeat(seat.id)}
                      aria-pressed={isPicked}
                      aria-label={beschriftung}
                      className={cn(
                        "flex h-14 w-full items-center justify-center rounded-lg border text-[11px] font-medium",
                        !reduced && "transition-transform",
                        seat.locked
                          ? "border-gray-200 bg-surface-alt text-gray-500"
                          : isPicked
                            ? "border-brand-600 bg-brand-100 text-brand-800"
                            : "border-gray-200 bg-surface text-ink hover:border-brand-600",
                        isRefused && !reduced && "animate-seat-refuse",
                      )}
                    >
                      {seat.locked ? (
                        <Lock aria-hidden="true" className="size-3.5" />
                      ) : seat.initials ? (
                        <span className="flex size-7 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                          {seat.initials}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 text-[11px] text-gray-500">
              Der gesperrte Platz bleibt gesperrt – auch hier.
            </p>
          </section>
        ) : null}
      </UiWindow>
    </div>
  );
}
