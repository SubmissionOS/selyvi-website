import { PRODUCT_NAME } from "@/config/brand";
import { SceneGroup } from "@/components/scenes/scene-group";
import {
  GenerateScene,
  ObserveScene,
  ReportScene,
} from "@/components/scenes/how-it-works-scenes";

/**
 * Sektion 4 – So funktioniert’s.
 * Sprungziel des Sekundaer-Buttons im Hero (id="so-funktionierts").
 *
 * Die drei statischen Mini-Skelette sind durch kleine Szenen ersetzt. Die
 * Kartengroesse ist unveraendert – die Buehne der Szenen ist genau so hoch wie
 * die frueheren Skelette (h-28).
 *
 * EIN <SceneGroup /> umschliesst alle drei: ein IntersectionObserver fuer die
 * ganze Sektion statt drei einzelne. Die Szenen starten dadurch gemeinsam,
 * sobald die Sektion zu sehen ist – gestaffelt ueber `startDelayMs`, damit
 * sich nicht drei Dinge gleichzeitig bewegen.
 */

/**
 * Die drei Schritte sind der Kreislauf aus docs/produktstand-2026-08.md:
 * Was nebenbei erfasst wird, wird zum Text und zum Material – und was das an
 * Zeit zurueckgibt, sieht die Schulleitung im Entlastungsbericht.
 *
 * 300 ms Versatz je Szene: genug, damit der Blick der Reihe nach folgt, und
 * kurz genug, dass die Sektion nicht traege wirkt.
 */
const CASCADE_MS = 300;

const steps = [
  {
    title: "Beobachten – nebenbei, auch per Diktat",
    scene: <ObserveScene startDelayMs={0} />,
  },
  {
    title: `${PRODUCT_NAME} macht Texte und Material daraus`,
    scene: <GenerateScene startDelayMs={CASCADE_MS} />,
  },
  {
    title: "Die Schulleitung sieht die gewonnene Zeit",
    scene: <ReportScene startDelayMs={CASCADE_MS * 2} />,
  },
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

        <SceneGroup>
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

                <div className="mt-6">{step.scene}</div>
              </li>
            ))}
          </ol>
        </SceneGroup>
      </div>
    </section>
  );
}
