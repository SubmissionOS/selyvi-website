import { ReviewMarker } from "@/components/ui/review-marker";

/**
 * Sektion 3 – Einführungs-Ablauf als Timeline.
 *
 * KEINE Zeitangaben. Weder Wochen noch Monate noch „typischerweise“ – der
 * Prozess wird gerade erst mit den ersten Pilotschulen gestaltet. Wo eine
 * Angabe erwartet wird, steht deshalb ausdruecklich, dass sie noch nicht
 * feststeht, statt eine plausible Zahl zu erfinden.
 */
const steps = [
  {
    title: "Erstgespräch & Demo",
    description:
      "Wir zeigen den aktuellen Stand der Anwendung und klären, was Ihre Schule braucht. Danach entscheiden Sie, ob eine Pilotphase sinnvoll ist.",
  },
  {
    title: "Pilotphase mit ausgewählten Lehrkräften",
    description:
      "Die Pilotpraxis ist aus der bisherigen Zusammenarbeit mit Lehrkräften gewachsen. Dauer und Umfang der Pilotphase stehen noch nicht fest – das Team gestaltet den Ablauf gerade gemeinsam mit den ersten Pilotschulen und ergänzt belastbare Angaben hier, sobald sie feststehen.",
    review: "Dauer und Umfang offen",
  },
  {
    title: "Schulung & Onboarding",
    description:
      "In welchem Format Schulungen stattfinden – vor Ort, online oder als Material zum Selbststudium – wird derzeit mit den Pilotschulen festgelegt.",
    review: "Format offen",
  },
  {
    title: "Rollout im Kollegium",
    description:
      "Die Einführung im gesamten Kollegium folgt, wenn Pilotphase und Schulung abgeschlossen sind.",
  },
];

export function RolloutTimeline() {
  return (
    <section
      aria-labelledby="ablauf-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="ablauf-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          So läuft die Einführung ab
        </h2>

        <ol className="mt-14 max-w-3xl">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Verbindungslinie zwischen den Schritten, rein dekorativ. */}
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-9 bottom-0 left-[1.125rem] w-px -translate-x-1/2 bg-gray-200"
                />
              ) : null}

              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                {index + 1}
              </span>

              <div className="pt-1">
                <h3 className="text-lg font-semibold text-ink">
                  {step.title}
                  {step.review ? (
                    <ReviewMarker note={step.review} className="ml-2" />
                  ) : null}
                </h3>

                <p className="mt-3 text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
