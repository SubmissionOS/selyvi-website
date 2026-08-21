/**
 * Sektion – Einführungs-Ablauf als Timeline.
 *
 * KEINE Zeitangaben. Weder Wochen noch Monate noch „typischerweise“ – der
 * Prozess wird gerade erst mit den ersten Pilotschulen gestaltet.
 *
 * Der Ablauf ist so konkret, wie er heute wirklich ist, und das heisst an drei
 * Stellen: unbequemer, als eine Marketingseite ihn beschreiben wuerde.
 *
 *   - Schritt 2: Es gibt keine Selbstregistrierung. Konten legt ausschliesslich
 *     die Schulleitung an.
 *   - Schritt 3: Klassen und Kinder werden ANGELEGT, nicht importiert. Fuer
 *     eine grosse Schule ist das ein spuerbarer Startaufwand. Wer das erst in
 *     der Einfuehrungswoche erfaehrt, erlebt es als Wortbruch.
 *   - Schritt 4: Es gibt keine Einfuehrungstour im Produkt. Den Einstieg
 *     begleiten wir persoenlich – nicht als Serviceversprechen, sondern weil
 *     es ohne nicht ginge.
 */
const steps = [
  {
    title: "Erstgespräch und Demo",
    description:
      "Wir zeigen den aktuellen Stand an der echten Oberfläche und klären, was Ihre Schule braucht. Danach entscheiden Sie, ob eine Pilotphase sinnvoll ist.",
  },
  {
    title: "Konten legt die Schulleitung an",
    description:
      "Eine Selbstregistrierung gibt es bewusst nicht: Zugänge für Ihr Kollegium richtet die Schulleitung ein und kann Passwörter jederzeit zurücksetzen. Ein Pilot beginnt damit immer mit einem Gespräch, nicht mit einem Anmeldelink.",
  },
  {
    title: "Gemeinsame Ersteinrichtung der Klassen",
    description:
      "Klassen und Kinder legen wir zusammen mit Ihnen an – angelegt, nicht importiert. Eine Schnittstelle zu Schulverwaltungssoftware gibt es noch nicht. Für eine große Schule ist das ein spürbarer Startaufwand, den wir von Anfang an einplanen statt ihn zu übergehen.",
  },
  {
    title: "Persönliche Einweisung",
    description:
      "Eine Einführungstour im Produkt gibt es nicht. Den Einstieg begleiten wir deshalb persönlich, gemeinsam mit den Lehrkräften, die anfangen.",
  },
  {
    title: "Rollout im Kollegium",
    description:
      "Die Einführung im gesamten Kollegium folgt, wenn die Pilotphase abgeschlossen ist.",
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
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>

                <p className="mt-3 text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
