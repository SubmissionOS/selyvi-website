import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 4 – So funktioniert’s.
 * Sprungziel des Sekundaer-Buttons im Hero (id="so-funktionierts").
 *
 * Die drei Skelett-Illustrationen sind rein dekorativ und mit aria-hidden
 * ausgezeichnet: Ihre Aussage steht bereits in der zugehoerigen Ueberschrift –
 * eine zusaetzliche Textalternative wuerde Screenreader-Nutzende nur den
 * gleichen Inhalt doppelt hoeren lassen.
 */

/** 1) Beobachten: kurze Notizzeilen, daneben die Andeutung einer Aufnahme. */
function StepObserve() {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-center gap-4 rounded-lg border border-gray-200 bg-surface-alt p-5"
    >
      <div className="size-9 shrink-0 rounded-full bg-brand-100" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="h-2.5 w-full rounded bg-gray-200" />
        <div className="h-2.5 w-4/5 rounded bg-gray-200" />
        <div className="h-2.5 w-3/5 rounded bg-brand-100" />
      </div>
    </div>
  );
}

/** 2) Daraus entstehen Texte und Material: zwei Dokumentflaechen. */
function StepGenerate() {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-stretch gap-3 rounded-lg border border-gray-200 bg-surface-alt p-5"
    >
      <div className="flex flex-1 flex-col gap-2 rounded border border-gray-200 bg-surface p-3">
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-5/6 rounded bg-gray-200" />
        <div className="h-2 w-2/3 rounded bg-brand-100" />
      </div>
      <div className="flex flex-1 flex-col gap-2 rounded border border-gray-200 bg-surface p-3">
        <div className="h-2 w-3/4 rounded bg-brand-100" />
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}

/** 3) Gewonnene Zeit: aufsteigende Balken, ohne Zahlen. */
function StepReport() {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-end justify-center gap-2.5 rounded-lg border border-gray-200 bg-surface-alt p-5"
    >
      <div className="h-6 w-7 rounded-t bg-gray-200" />
      <div className="h-10 w-7 rounded-t bg-gray-200" />
      <div className="h-8 w-7 rounded-t bg-gray-200" />
      <div className="h-14 w-7 rounded-t bg-brand-100" />
    </div>
  );
}

/**
 * Die drei Schritte sind der Kreislauf aus docs/produktstand-2026-08.md:
 * Was nebenbei erfasst wird, wird zum Text und zum Material – und was das an
 * Zeit zurueckgibt, sieht die Schulleitung im Entlastungsbericht.
 */
const steps = [
  { title: "Beobachten – nebenbei, auch per Diktat", illustration: <StepObserve /> },
  {
    title: `${PRODUCT_NAME} macht Texte und Material daraus`,
    illustration: <StepGenerate />,
  },
  { title: "Die Schulleitung sieht die gewonnene Zeit", illustration: <StepReport /> },
];

export function HowItWorks() {
  return (
    <section
      id="so-funktionierts"
      aria-labelledby="so-funktionierts-titel"
      className="border-y border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="so-funktionierts-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          So funktioniert’s
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-gray-200 bg-surface p-6"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                {index + 1}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>

              <div className="mt-6">{step.illustration}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
