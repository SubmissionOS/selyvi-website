import Link from "next/link";

import { PRODUCT_NAME } from "@/config/brand";
import { ReportScene } from "@/components/scenes/how-it-works-scenes";
import { SampleDataNote } from "@/components/scenes/sample-data-note";
import { Button } from "@/components/ui/button";

/**
 * Sektion – „Riskieren Sie einen Blick."
 *
 * Ersetzt „So funktioniert's". Dort erklärten drei Mini-Szenen den Kreislauf;
 * jetzt führt ein Knopf in den geführten Einblick, wo man ihn selbst anklickt.
 * Erklären war der Umweg.
 *
 * Sie trägt weiterhin die Sprungmarke `so-funktionierts`: Der Sekundär-Button
 * im Hero zeigt seit jeher dorthin, und ein ins Leere laufender Anker wäre ein
 * kaputter Link auf der eigenen Startseite.
 *
 * ==========================================================================
 * WARUM EINE DER DREI MINI-SZENEN ÜBERLEBT
 * ==========================================================================
 * <ReportScene /> zeigt, was die Schulleitung am Monatsende sieht. Ohne sie
 * verlöre die Startseite die Leitungs-Perspektive vollständig – die anderen
 * beiden Minis (Beobachten, Texte erzeugen) sagen dagegen dasselbe wie der
 * Hero und „Was Ihnen abgenommen wird". Sie sind deshalb entfallen, diese
 * nicht.
 *
 * Der Knopf ist bewusst NICHT --cta: Die Farbe gehört dem Kennenlernen. Zwei
 * gleich starke Aufrufe auf einer Seite heben sich gegenseitig auf.
 */
export function TakeALook() {
  return (
    <section
      id="so-funktionierts"
      aria-labelledby="einen-blick-titel"
      className="border-y border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <h2
            id="einen-blick-titel"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Riskieren Sie einen Blick.
          </h2>

          <p className="mt-6 max-w-xl text-lg text-gray-500">
            Am schnellsten versteht man {PRODUCT_NAME}, wenn man kurz selbst klickt. Drei
            Bereiche sind offen – den Rest zeigen wir Ihnen persönlich.
          </p>

          <div className="mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/einblick">Einblick öffnen</Link>
            </Button>
          </div>
        </div>

        <div>
          <ReportScene />
          <SampleDataNote />
        </div>
      </div>
    </section>
  );
}
