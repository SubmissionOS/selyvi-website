"use client";

import type { Dispatch, SetStateAction } from "react";
import { Check, Lock, Mic, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DEMO_CHAT,
  DEMO_MAIL_LANGS,
  DEMO_MATERIAL_RESULT,
  DEMO_MATERIAL_SOURCES,
  DEMO_MATERIAL_TOPICS,
  DEMO_TEACHER,
  DEMO_TIMETABLE_DAYS,
  DEMO_TIMETABLE_SLOTS,
  DEMO_TIMETABLE_SUBJECTS,
  DEMO_TOUR_OBSERVATIONS,
  type DemoMailLang,
} from "@/config/demo-data";
import { Button } from "@/components/ui/button";

/**
 * Die sieben bedienbaren Bereiche des Einblicks.
 *
 * ==========================================================================
 * JEDE INTERAKTION BILDET EINE LIVE-FUNKTION AB
 * ==========================================================================
 * Die Fundstelle im Produktstand steht jeweils direkt am Bereich. Was dort
 * „Rollout offen", „Teilweise", „Nicht gebaut" oder „Prototyp" traegt, ist
 * hier nicht bedienbar – der KI-Sitzplanvorschlag zum Beispiel fehlt
 * bewusst, obwohl er die Szene aufwerten wuerde.
 *
 * ==========================================================================
 * ES WIRD NICHTS GESPEICHERT – AUCH NICHT IM WORTLAUT
 * ==========================================================================
 * Keine Bestaetigung sagt „Gespeichert". Das Banner ueber dem Fenster sagt
 * das Gegenteil, und zwei widersprechende Aussagen auf einem Bildschirm sind
 * schlimmer als gar keine Bestaetigung. Der Wortlaut ist „Übernommen ·
 * Beispiel" und steht als Konstante in workspace.tsx.
 */

export type Seat = { id: string; initials: string | null; locked: boolean };

export type TourState = {
  chosen: string | null;
  filter: string | null;
  dictated: string | null;
  chatOpen: string | null;
  reportVariant: 0 | 1 | null;
  reportText: string;
  mailCreated: boolean;
  mailLang: DemoMailLang;
  topic: string | null;
  sources: string[];
  materialCreated: boolean;
  seats: Seat[];
  picked: string | null;
  refused: string | null;
  timetable: Record<string, string | null>;
  timelineChild: string;
  openEntries: string[];
};

type Actions = {
  set: Dispatch<SetStateAction<TourState>>;
  notify: (text: string) => void;
  reduced: boolean;
};

const LABEL = "text-xs font-medium tracking-wide text-gray-500 uppercase";

/* ==========================================================================
 * 1) Beobachtungen
 * Produktstand: „Beobachtungen strukturieren — Live … Freitext oder Diktat
 * wird zu einer strukturierten Beobachtung mit Fach, Kategorie, Prioritaet
 * und Foerderhinweis. Die Spracheingabe laeuft ueber Whisper."
 * Dazu „Freie Fragen an die eigenen Daten — Live".
 * ========================================================================== */
export function AreaObservations({
  state,
  actions,
}: {
  state: TourState;
  actions: Actions;
}) {
  const { set, notify } = actions;
  const sichtbar = state.filter
    ? DEMO_TOUR_OBSERVATIONS.filter((e) => e.initials === state.filter)
    : DEMO_TOUR_OBSERVATIONS;

  return (
    <section aria-labelledby="bereich-beobachtungen">
      <h2 id="bereich-beobachtungen" className={LABEL}>
        Beobachtungen
      </h2>

      {/* Filter nach Kind. Der Produktstand fuehrt die Timeline und die
          Erfassung je Kind – die Liste danach einzugrenzen ist die
          Bedienung dieser Struktur, keine eigene Zusage. */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-gray-500">Filtern:</span>
        {DEMO_TOUR_OBSERVATIONS.map((e) => (
          <button
            key={e.initials}
            type="button"
            aria-pressed={state.filter === e.initials}
            onClick={() =>
              set((s) => ({ ...s, filter: s.filter === e.initials ? null : e.initials }))
            }
            className={cn(
              "rounded-full border px-2 py-0.5 text-[11px]",
              state.filter === e.initials
                ? "border-brand-600 bg-brand-100 text-brand-800"
                : "border-gray-200 bg-surface text-ink hover:border-brand-600",
            )}
          >
            {e.child}
          </button>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {sichtbar.map((entry) => {
          const gewaehlt = state.chosen === entry.id;
          return (
            <li key={entry.id}>
              <button
                type="button"
                aria-pressed={gewaehlt}
                onClick={() => {
                  set((s) => ({
                    ...s,
                    chosen: entry.id,
                    reportVariant: null,
                    reportText: "",
                    mailCreated: false,
                  }));
                  notify("Beobachtung ausgewählt");
                }}
                className={cn(
                  "w-full rounded-lg border p-3 text-left",
                  gewaehlt
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

                {gewaehlt ? (
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {entry.chips.map((chip) => (
                      <span
                        key={chip}
                        className={cn(
                          "rounded-full border border-brand-600 bg-brand-100 px-2 py-0.5 text-[10px] text-brand-800",
                          actions.reduced ? "" : "animate-chip-pop",
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

        {/* Die diktierte Beobachtung landet in derselben Liste – nur so
            erklaert sich der Zaehler in der Seitenleiste. */}
        {state.dictated ? (
          <li>
            <div className="rounded-lg border border-brand-600 bg-surface-alt p-3">
              <span className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-800">
                  FS
                </span>
                <span className="text-[13px] text-ink">{state.dictated}</span>
              </span>
            </div>
          </li>
        ) : null}
      </ul>

      <div className="mt-4">
        <DictationButton state={state} actions={actions} />
      </div>

      {/* Chat ueber die eigenen Daten. */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className={LABEL}>Frage an die eigenen Daten</p>

        <ul className="mt-3 flex flex-col gap-1.5">
          {DEMO_CHAT.questions.map((frage) => (
            <li key={frage.id}>
              <button
                type="button"
                aria-expanded={state.chatOpen === frage.id}
                onClick={() =>
                  set((s) => ({
                    ...s,
                    chatOpen: s.chatOpen === frage.id ? null : frage.id,
                  }))
                }
                className="w-full rounded-md border border-gray-200 bg-surface px-3 py-2 text-left text-[12px] text-ink hover:border-brand-600"
              >
                {frage.text}
              </button>

              {state.chatOpen === frage.id ? (
                <div className="mt-2 rounded-md bg-surface-alt p-3">
                  <p className="text-[12px] leading-relaxed text-ink">{frage.answer}</p>
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {frage.references.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-gray-200 bg-surface px-2 py-0.5 text-[10px] text-gray-500"
                      >
                        {r}
                      </span>
                    ))}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[11px] text-gray-500">
          Antworten nur aus Ihren eigenen Einträgen
        </p>
      </div>
    </section>
  );
}

/**
 * Das Diktat. Es laeuft Wort fuer Wort ein – und zwar ueber setTimeout, NICHT
 * ueber requestAnimationFrame: Der Text soll in Wortschritten erscheinen,
 * nicht in Frames, und im Ruhezustand darf die Seite keine Schleife halten.
 * Nach dem letzten Wort ist Schluss.
 */
function DictationButton({ state, actions }: { state: TourState; actions: Actions }) {
  const { set, notify, reduced } = actions;
  const laeuft = state.dictated !== null && !state.dictated.endsWith(".");

  return (
    <button
      type="button"
      disabled={state.dictated !== null}
      onClick={() => {
        const worte =
          "Frida hat im Sachunterricht ihren Versuch selbst aufgebaut und den Ablauf erklärt.".split(
            " ",
          );

        if (reduced) {
          set((s) => ({ ...s, dictated: worte.join(" ") }));
          notify("Übernommen · Beispiel");
          return;
        }

        let i = 0;
        const schritt = () => {
          i += 1;
          set((s) => ({ ...s, dictated: worte.slice(0, i).join(" ") }));
          if (i < worte.length) {
            window.setTimeout(schritt, 130);
          } else {
            notify("Übernommen · Beispiel");
          }
        };
        schritt();
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-gray-200 bg-surface px-3 py-2 text-[12px] text-ink",
        state.dictated === null && "hover:border-brand-600",
        state.dictated !== null && "text-gray-500",
      )}
    >
      <Mic
        aria-hidden="true"
        className={cn(
          "size-3.5 text-brand-600",
          laeuft && !reduced && "animate-soft-pulse",
        )}
      />
      {state.dictated === null ? "Beobachtung diktieren" : "Diktat übernommen"}
    </button>
  );
}

/* ==========================================================================
 * 2) Zeugnisse
 * Produktstand: „Zeugnisbemerkungen — Live … im gelernten Schreibstil der
 * Lehrkraft." Editierbar laut „Fachverlauf und Stundenprotokoll — Live":
 * „der Text bleibt danach frei editierbar."
 * ========================================================================== */
export function AreaReports({ state, actions }: { state: TourState; actions: Actions }) {
  const { set, notify } = actions;
  const beobachtung = DEMO_TOUR_OBSERVATIONS.find((e) => e.id === state.chosen);

  if (!beobachtung) {
    return (
      <section aria-labelledby="bereich-zeugnisse">
        <h2 id="bereich-zeugnisse" className={LABEL}>
          Zeugnisse
        </h2>
        <p className="mt-3 text-sm text-ink">
          Wählen Sie zuerst unter „Beobachtungen“ einen Eintrag aus.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="bereich-zeugnisse">
      <h2 id="bereich-zeugnisse" className={LABEL}>
        Zeugnisse
      </h2>

      <p className="mt-3 text-sm text-ink">
        Grundlage: Ihre Beobachtung zu {beobachtung.child}
      </p>

      <div className="mt-3 rounded-lg border border-gray-200 bg-surface-alt p-3 text-[13px] text-gray-500">
        {beobachtung.note}
      </div>

      {state.reportVariant === null ? (
        <div className="mt-5">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              set((s) => ({ ...s, reportVariant: 0, reportText: beobachtung.report }));
              notify("Entwurf erzeugt · Beispiel");
            }}
          >
            Entwurf erzeugen
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-medium text-brand-800">
            <Sparkles aria-hidden="true" className="size-3" />
            In Ihrem Schreibstil
          </span>

          {/* Frei editierbar – der Produktstand sagt das ausdruecklich. Ein
              <textarea> statt contenteditable: Es ist von Haus aus
              tastaturbedienbar und traegt ein Label. */}
          <label
            htmlFor="einblick-entwurf"
            className="mt-3 block text-[11px] text-gray-500"
          >
            Entwurf – Sie können ihn hier ändern
          </label>
          <textarea
            id="einblick-entwurf"
            value={state.reportText}
            onChange={(e) => set((s) => ({ ...s, reportText: e.target.value }))}
            rows={4}
            className="mt-1.5 w-full rounded-md border border-gray-200 bg-surface p-3 text-[13px] leading-relaxed text-ink"
          />

          <div className="mt-3 flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                const naechste = state.reportVariant === 0 ? 1 : 0;
                set((s) => ({
                  ...s,
                  reportVariant: naechste,
                  reportText: naechste === 0 ? beobachtung.report : beobachtung.report2,
                }));
                notify("Zweiter Entwurf · Beispiel");
              }}
            >
              Andere Formulierung
            </Button>
          </div>

          <p className="mt-3 text-[11px] text-gray-500">Vorbereitetes Beispiel</p>
        </div>
      )}
    </section>
  );
}

/* ==========================================================================
 * 3) Elternpost
 * Produktstand: „Elternmails, auf Wunsch uebersetzt — Live … Die Mail
 * entsteht auf Deutsch und wird in einem zweiten Schritt uebersetzt …
 * Namen und Signatur bleiben unangetastet."
 * ========================================================================== */
export function AreaMail({ state, actions }: { state: TourState; actions: Actions }) {
  const { set, notify } = actions;
  const beobachtung = DEMO_TOUR_OBSERVATIONS.find((e) => e.id === state.chosen);

  if (!beobachtung) {
    return (
      <section aria-labelledby="bereich-elternpost">
        <h2 id="bereich-elternpost" className={LABEL}>
          Elternpost
        </h2>
        <p className="mt-3 text-sm text-ink">
          Wählen Sie zuerst unter „Beobachtungen“ einen Eintrag aus.
        </p>
      </section>
    );
  }

  const sprache = DEMO_MAIL_LANGS.find((l) => l.key === state.mailLang);
  const zeilen = beobachtung.mail.lines[state.mailLang];

  return (
    <section aria-labelledby="bereich-elternpost">
      <h2 id="bereich-elternpost" className={LABEL}>
        Elternpost
      </h2>

      {!state.mailCreated ? (
        <>
          <p className="mt-3 text-sm text-ink">
            Aus Ihrer Beobachtung zu {beobachtung.child} entsteht eine Elternmail.
          </p>
          <div className="mt-5">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                set((s) => ({ ...s, mailCreated: true }));
                notify("Mail entworfen · Beispiel");
              }}
            >
              Elternmail entwerfen
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {DEMO_MAIL_LANGS.map((l) => (
              <button
                key={l.key}
                type="button"
                aria-pressed={state.mailLang === l.key}
                onClick={() => {
                  set((s) => ({ ...s, mailLang: l.key }));
                  notify("Übersetzt · Beispiel");
                }}
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[11px]",
                  state.mailLang === l.key
                    ? "border-brand-600 bg-brand-100 text-brand-800"
                    : "border-gray-200 bg-surface text-ink hover:border-brand-600",
                )}
              >
                {l.label}
              </button>
            ))}
            <span className="ml-1 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] text-brand-800">
              9 Sprachen
            </span>
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 bg-surface p-4">
            {/* Anrede und Signatur bleiben stehen – das ist die Zusage aus
                dem Produktstand, und sie ist hier sichtbar: Nur die beiden
                Inhaltszeilen wechseln die Sprache. */}
            <p className="text-[12px] text-gray-500">
              Betreff: {beobachtung.mail.subject}
            </p>
            <p className="mt-3 text-[13px] text-ink">Guten Tag,</p>

            <div
              dir={sprache?.rtl ? "rtl" : "ltr"}
              className="mt-2 flex flex-col gap-1.5"
            >
              {zeilen.map((zeile) => (
                <p key={zeile} className="text-[13px] leading-relaxed text-ink">
                  {zeile}
                </p>
              ))}
            </div>

            <p className="mt-3 text-[13px] text-ink">
              Mit freundlichen Grüßen
              <br />
              {DEMO_TEACHER}
            </p>
          </div>

          <p className="mt-3 text-[11px] text-gray-500">
            Anrede und Signatur bleiben unangetastet · Vorbereitetes Beispiel
          </p>
        </>
      )}
    </section>
  );
}

/* ==========================================================================
 * 4) Material
 * Produktstand: „Unterrichtsmaterial aus echtem Fachwissen — Live … Die
 * Lehrkraft kann die Fundstellen auch selbst auswaehlen … Jedes erzeugte
 * Material weist seine Quellen aus."
 * ========================================================================== */
export function AreaMaterial({ state, actions }: { state: TourState; actions: Actions }) {
  const { set, notify } = actions;

  return (
    <section aria-labelledby="bereich-material">
      <h2 id="bereich-material" className={LABEL}>
        Material
      </h2>

      <p className="mt-3 text-sm text-ink">Thema wählen:</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {DEMO_MATERIAL_TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={state.topic === t.id}
            onClick={() => set((s) => ({ ...s, topic: t.id, materialCreated: false }))}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px]",
              state.topic === t.id
                ? "border-brand-600 bg-brand-100 text-brand-800"
                : "border-gray-200 bg-surface text-ink hover:border-brand-600",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-ink">Fundstellen aus dem Fachkorpus:</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {DEMO_MATERIAL_SOURCES.map((q, i) => {
          const an = state.sources.includes(q.id);
          return (
            <li key={q.id}>
              <button
                type="button"
                aria-pressed={an}
                onClick={() =>
                  set((s) => ({
                    ...s,
                    sources: an
                      ? s.sources.filter((x) => x !== q.id)
                      : [...s.sources, q.id],
                  }))
                }
                className={cn(
                  "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left",
                  an ? "border-brand-600 bg-surface-alt" : "border-gray-200 bg-surface",
                )}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border",
                    an ? "border-brand-600 bg-brand-600" : "border-gray-200",
                  )}
                >
                  {an ? (
                    <Check aria-hidden="true" className="size-3 text-surface" />
                  ) : null}
                </span>
                <span className="text-[12px] text-ink">
                  [{i + 1}] {q.label}
                </span>
                <span className="ml-auto text-[10px] text-gray-500">{q.note}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5">
        <Button
          variant="outline"
          size="md"
          disabled={!state.topic || state.sources.length === 0}
          onClick={() => {
            set((s) => ({ ...s, materialCreated: true }));
            notify("Material erzeugt · Beispiel");
          }}
        >
          Material erzeugen
        </Button>
      </div>

      {state.materialCreated ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-surface p-4">
          <p className="text-[11px] text-gray-500">
            {DEMO_MATERIAL_TOPICS.find((t) => t.id === state.topic)?.label}
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {DEMO_MATERIAL_RESULT.map((zeile, i) => (
              <li key={zeile} className="text-[13px] text-ink">
                {zeile}{" "}
                {/* Ein Marker je Aufgabe, reihum aus den angehakten
                    Fundstellen. Wer eine abwaehlt, sieht die Marker sofort
                    wechseln – genau das meint „weist seine Quellen aus". */}
                <span className="text-[11px] text-brand-600">
                  [
                  {DEMO_MATERIAL_SOURCES.findIndex(
                    (q) => q.id === state.sources[i % state.sources.length],
                  ) + 1}
                  ]
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-gray-500">
            Quellen:{" "}
            {state.sources
              .map((id) => DEMO_MATERIAL_SOURCES.find((q) => q.id === id)?.label)
              .join(" · ")}
          </p>
        </div>
      ) : null}
    </section>
  );
}

/* ==========================================================================
 * 5) Sitzplan
 * Produktstand: „Sitzplaene — Live … Grafischer Sitzplan mit gesperrten
 * Plaetzen und Drag-and-drop."
 *
 * KEIN KI-Vorschlag: Derselbe Absatz nennt ihn ausdruecklich als Prototyp,
 * und Prototyp ist laut CLAUDE.md tabu.
 * ========================================================================== */
export function AreaSeating({ state, actions }: { state: TourState; actions: Actions }) {
  const { set, notify, reduced } = actions;

  function waehle(id: string) {
    const platz = state.seats.find((s) => s.id === id);
    if (!platz) return;

    if (platz.locked) {
      set((s) => ({ ...s, refused: id }));
      window.setTimeout(() => set((s) => ({ ...s, refused: null })), 400);
      return;
    }

    if (state.picked === null) {
      if (platz.initials === null) return;
      set((s) => ({ ...s, picked: id }));
      return;
    }
    if (state.picked === id) {
      set((s) => ({ ...s, picked: null }));
      return;
    }

    set((s) => {
      const von = s.seats.find((x) => x.id === s.picked);
      const nach = s.seats.find((x) => x.id === id);
      if (!von || !nach) return s;
      return {
        ...s,
        picked: null,
        seats: s.seats.map((x) =>
          x.id === s.picked
            ? { ...x, initials: nach.initials }
            : x.id === id
              ? { ...x, initials: von.initials }
              : x,
        ),
      };
    });
    notify("Übernommen · Beispiel");
  }

  return (
    <section aria-labelledby="bereich-sitzplan">
      <h2 id="bereich-sitzplan" className={LABEL}>
        Sitzplan
      </h2>

      <p className="mt-3 text-sm text-ink">
        Ein Kind antippen, dann den neuen Platz – die beiden tauschen. Das Schloss sperrt
        einen Platz.
      </p>

      <p className="mt-3 rounded-md bg-surface-alt py-1 text-center text-[10px] tracking-wide text-gray-500 uppercase">
        Tafel
      </p>

      <ul className="mt-3 grid grid-cols-3 gap-2">
        {state.seats.map((platz) => {
          const aufgenommen = state.picked === platz.id;
          const abgelehnt = state.refused === platz.id;
          const name = platz.locked
            ? "Gesperrter Platz"
            : platz.initials
              ? `Platz von ${platz.initials}`
              : "Freier Platz";

          return (
            <li key={platz.id} className="relative">
              <button
                type="button"
                aria-pressed={aufgenommen}
                aria-label={name}
                onClick={() => waehle(platz.id)}
                className={cn(
                  "flex h-16 w-full items-center justify-center rounded-lg border text-[11px] font-medium",
                  !reduced && "transition-transform",
                  platz.locked
                    ? "border-gray-200 bg-surface-alt text-gray-500"
                    : aufgenommen
                      ? "border-brand-600 bg-brand-100 text-brand-800"
                      : "border-gray-200 bg-surface text-ink hover:border-brand-600",
                  abgelehnt && !reduced && "animate-seat-refuse",
                )}
              >
                {platz.locked ? (
                  <Lock aria-hidden="true" className="size-3.5" />
                ) : platz.initials ? (
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                    {platz.initials}
                  </span>
                ) : null}
              </button>

              {/* Sperren und entsperren. Eigener Schalter, damit der Tausch
                  nicht versehentlich zur Sperre wird. */}
              <button
                type="button"
                aria-label={
                  platz.locked ? `${name} entsperren` : `Platz ${platz.id} sperren`
                }
                aria-pressed={platz.locked}
                onClick={() => {
                  set((s) => ({
                    ...s,
                    seats: s.seats.map((x) =>
                      x.id === platz.id ? { ...x, locked: !x.locked } : x,
                    ),
                  }));
                  notify(platz.locked ? "Platz freigegeben" : "Platz gesperrt");
                }}
                className="absolute top-1 right-1 rounded p-0.5 text-gray-500 hover:text-brand-600"
              >
                <Lock aria-hidden="true" className="size-3" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ==========================================================================
 * 6) Stundenplan
 * Produktstand: „Klassenstundenplan ohne Pflegeaufwand — Live … Wer bei
 * seinem Fach Zeiten hinterlegt, steht im Plan … eingetragen ueber einen
 * Wochenplaner zum Anklicken und Ziehen."
 * ========================================================================== */
export function AreaTimetable({
  state,
  actions,
}: {
  state: TourState;
  actions: Actions;
}) {
  const { set, notify } = actions;
  const [fach, setzeFach] = [
    state.timetable.__fach ?? DEMO_TIMETABLE_SUBJECTS[0],
    (f: string) => set((s) => ({ ...s, timetable: { ...s.timetable, __fach: f } })),
  ];

  return (
    <section aria-labelledby="bereich-stundenplan">
      <h2 id="bereich-stundenplan" className={LABEL}>
        Stundenplan
      </h2>

      <p className="mt-3 text-sm text-ink">
        Ihr Fach wählen, dann eine freie Stunde antippen. Nochmal antippen entfernt sie
        wieder.
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {DEMO_TIMETABLE_SUBJECTS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={fach === f}
            onClick={() => setzeFach(f)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px]",
              fach === f
                ? "border-brand-600 bg-brand-100 text-brand-800"
                : "border-gray-200 bg-surface text-ink hover:border-brand-600",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Auf schmalen Displays scrollt die Tabelle waagerecht. Der Hinweis
          steht sichtbar darueber – eine Scrollflaeche ohne Ansage ist auf
          dem Handy unsichtbar. */}
      <p className="mt-4 text-[11px] text-gray-500 sm:hidden">Seitwärts wischbar →</p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-[11px]">
          <caption className="sr-only">
            Wochenstundenplan der Klasse. Jede Zelle ist ein Schalter.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="p-1 text-left font-medium text-gray-500">
                Zeit
              </th>
              {DEMO_TIMETABLE_DAYS.map((t) => (
                <th key={t} scope="col" className="p-1 font-medium text-gray-500">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_TIMETABLE_SLOTS.map((slot) => (
              <tr key={slot}>
                <th scope="row" className="p-1 text-left font-normal text-gray-500">
                  {slot}
                </th>
                {DEMO_TIMETABLE_DAYS.map((tag) => {
                  const id = `${tag}-${slot}`;
                  const belegt = state.timetable[id] ?? null;

                  return (
                    <td key={id} className="p-1">
                      <button
                        type="button"
                        aria-label={
                          belegt ? `${tag}, ${slot}: ${belegt}` : `${tag}, ${slot}: frei`
                        }
                        onClick={() => {
                          set((s) => ({
                            ...s,
                            timetable: {
                              ...s.timetable,
                              [id]: s.timetable[id] ? null : fach,
                            },
                          }));
                          notify(belegt ? "Stunde entfernt" : "Übernommen · Beispiel");
                        }}
                        className={cn(
                          "h-9 w-full rounded border text-[10px]",
                          belegt
                            ? "border-brand-600 bg-brand-100 text-brand-800"
                            : "border-gray-200 bg-surface text-gray-500 hover:border-brand-600",
                        )}
                      >
                        {belegt ?? "+"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-gray-500">
        Kein Redaktionsschritt, keine Freigabe – wer Zeiten hinterlegt, steht im Plan.
      </p>
    </section>
  );
}

/* ==========================================================================
 * 7) Entwicklung
 * Produktstand: „Foerderempfehlungen, Timeline, Klassenanalyse — Live … Je
 * Kind eine chronologische Timeline."
 * ========================================================================== */
export function AreaDevelopment({
  state,
  actions,
}: {
  state: TourState;
  actions: Actions;
}) {
  const { set } = actions;
  const kind =
    DEMO_TOUR_OBSERVATIONS.find((e) => e.id === state.timelineChild) ??
    DEMO_TOUR_OBSERVATIONS[0];

  return (
    <section aria-labelledby="bereich-entwicklung">
      <h2 id="bereich-entwicklung" className={LABEL}>
        Entwicklung
      </h2>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {DEMO_TOUR_OBSERVATIONS.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={kind.id === e.id}
            onClick={() => set((s) => ({ ...s, timelineChild: e.id, openEntries: [] }))}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px]",
              kind.id === e.id
                ? "border-brand-600 bg-brand-100 text-brand-800"
                : "border-gray-200 bg-surface text-ink hover:border-brand-600",
            )}
          >
            {e.child}
          </button>
        ))}
      </div>

      <ol className="mt-4 flex flex-col gap-2">
        {kind.timeline.map((eintrag) => {
          const id = `${kind.id}-${eintrag.date}`;
          const offen = state.openEntries.includes(id);

          return (
            <li key={id} className="rounded-lg border border-gray-200 bg-surface">
              <button
                type="button"
                aria-expanded={offen}
                onClick={() =>
                  set((s) => ({
                    ...s,
                    openEntries: offen
                      ? s.openEntries.filter((x) => x !== id)
                      : [...s.openEntries, id],
                  }))
                }
                className="flex w-full items-center gap-3 p-3 text-left"
              >
                <span className="shrink-0 text-[11px] text-gray-500">{eintrag.date}</span>
                <span className="text-[13px] text-ink">{eintrag.title}</span>
                <span aria-hidden="true" className="ml-auto text-[11px] text-gray-500">
                  {offen ? "−" : "+"}
                </span>
              </button>

              {offen ? (
                <p className="border-t border-gray-200 p-3 text-[12px] leading-relaxed text-gray-500">
                  {eintrag.text}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-[11px] text-gray-500">
        Chronologische Timeline je Kind · Vorbereitetes Beispiel
      </p>
    </section>
  );
}
