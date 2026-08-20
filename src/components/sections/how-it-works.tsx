/**
 * Sektion 4 – So funktioniert’s.
 * Sprungziel des Sekundaer-Buttons im Hero (id="so-funktionierts").
 *
 * Die drei Skelett-Illustrationen sind rein dekorativ und mit aria-hidden
 * ausgezeichnet: Ihre Aussage steht bereits in der zugehoerigen Ueberschrift –
 * eine zusaetzliche Textalternative wuerde Screenreader-Nutzende nur den
 * gleichen Inhalt doppelt hoeren lassen.
 */

function StepUpload() {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 items-end justify-center gap-2 rounded-lg border border-gray-200 bg-surface-alt p-5"
    >
      <div className="h-10 w-8 rounded bg-gray-200" />
      <div className="h-16 w-8 rounded bg-brand-100" />
      <div className="h-12 w-8 rounded bg-gray-200" />
    </div>
  );
}

function StepSuggest() {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 flex-col justify-center gap-2.5 rounded-lg border border-gray-200 bg-surface-alt p-5"
    >
      <div className="h-2.5 w-3/4 rounded bg-gray-200" />
      <div className="h-2.5 w-1/2 rounded bg-brand-100" />
      <div className="mt-1 flex gap-2">
        <div className="h-6 w-14 rounded bg-brand-100" />
        <div className="h-6 w-14 rounded border border-gray-200 bg-surface" />
      </div>
    </div>
  );
}

function StepArchive() {
  return (
    <div
      aria-hidden="true"
      className="grid h-28 grid-cols-3 grid-rows-2 gap-2 rounded-lg border border-gray-200 bg-surface-alt p-5"
    >
      <div className="rounded bg-gray-200" />
      <div className="rounded bg-brand-100" />
      <div className="rounded bg-gray-200" />
      <div className="rounded bg-brand-100" />
      <div className="rounded bg-gray-200" />
      <div className="rounded bg-gray-200" />
    </div>
  );
}

const steps = [
  { title: "Abgaben hochladen oder verbinden", illustration: <StepUpload /> },
  { title: "KI schlägt vor, Sie entscheiden", illustration: <StepSuggest /> },
  { title: "Alles dokumentiert an einem Ort", illustration: <StepArchive /> },
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
