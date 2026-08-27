import { SeatingScene } from "@/components/scenes/produkt/seating-scene";

/**
 * Sektion – „Und der Alltag drumherum“.
 *
 * ==========================================================================
 * WARUM EIGENE SEKTION UND NICHT INS PRINZIP-BAND
 * ==========================================================================
 * Das Prinzip-Band ist eine Haltungsaussage in zwei Saetzen („Die KI schlägt
 * vor. Sie entscheiden.“). Eine Szene daneben wuerde dort zwei Dinge
 * gleichzeitig behaupten und die Aussage schwaechen – das Band lebt davon,
 * dass es nichts zeigt.
 *
 * Nach den vier Bloecken passt sie dagegen genau: Die vier Bereiche sind die
 * grossen Zusagen, das hier ist der Rest des Schultags. Und sie steht VOR
 * „In Arbeit“ – zuerst alles Fertige, dann der Ausblick.
 *
 * Schmal gehalten (max-w-4xl statt max-w-6xl) und ohne Stichpunktliste: Die
 * drei Funktionen sind bereits im Block „Unterricht“ aufgezaehlt. Diese
 * Sektion wiederholt sie nicht, sie ZEIGT eine davon – das ist der einzige
 * Grund, warum es sie gibt.
 */
export function EverydayExtras() {
  return (
    <section aria-labelledby="alltag-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
        <h2
          id="alltag-titel"
          className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          Und der Alltag drumherum
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-gray-500">
          Nicht jede Aufgabe im Schuljahr ist ein Text. Der Sitzplan gehört dazu, der
          Klassenstundenplan und die Ablage der Schülerarbeiten – die kleinen Dinge, die
          keine Stunde kosten sollten.
        </p>

        <div className="mt-10">
          <SeatingScene />
        </div>
      </div>
    </section>
  );
}
