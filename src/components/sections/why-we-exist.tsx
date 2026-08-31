import { CountUpOnView } from "@/components/motion/count-up-on-view";
import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 4 – Warum es uns gibt.
 *
 * Steht zwischen der Zielgruppen-Weiche und „Was sich im Alltag ändert“: Die
 * Seite sagt erst, wen sie meint, dann WARUM es sie gibt – und erst danach,
 * was sie tut.
 *
 * ==========================================================================
 * DIESES BAND NENNT KEINE EINZIGE PRODUKTFUNKTION. DAS IST DIE REGEL.
 * ==========================================================================
 * Es begründet, es verkauft nicht. Sobald hier ein Stichwort wie
 * „Zeugnisbemerkung“ oder „Elternmail“ auftaucht, wird aus einer Begründung
 * eine Überleitung zum Angebot – und die Zahlen unten wirken wie Verkaufs-
 * material statt wie der Grund, aus dem jemand angefangen hat zu bauen.
 *
 * ==========================================================================
 * ZU DEN ZAHLEN – WELCHE STAMMT WOHER
 * ==========================================================================
 * Alle drei sind PARAPHRASIERT, nicht woertlich zitiert, und stammen aus dem
 * Deutschen Schulbarometer der Robert Bosch Stiftung. Sie kommen aus ZWEI
 * verschiedenen Befragungen – deshalb nennt die Quellenzeile beide Jahre:
 *
 *   83 % ueben ihren Beruf gern aus          -> Befragung 2026
 *   84 % fuehlen sich stark belastet         -> 4. Befragung 2022
 *   ueber 75 % Wochenendarbeit als Regel     -> 4. Befragung 2022
 *
 * Die Jahreszahlen gehoeren in die Quellenzeile und nicht nur hierher: Ein
 * Wert ohne Welle ist bei einer Reihenuntersuchung nicht nachpruefbar.
 *
 * Offen bleibt eine Kleinigkeit, siehe README, Punkt 19a: Vor dem Livegang
 * einmal gegen die Original-Reports lesen. Die Uebersichtsseite der Stiftung
 * fuehrt die Einzelwerte nicht; sie stehen in den Berichten der jeweiligen
 * Welle.
 */
const findings = [
  {
    /** Die Saetze setzen die Zahl grammatisch fort – ein Screenreader liest
        „83 % der Lehrkraefte ueben ihren Beruf gern aus." am Stueck vor.

        Praefix und Wert stehen getrennt, weil die ZAHL hochzaehlt und das
        Wort davor stehen bleibt: „Über 75 %" soll nicht „Über 0 %" durch-
        laufen. */
    prefix: "",
    value: 83,
    statement: "der Lehrkräfte üben ihren Beruf gern aus.",
  },
  {
    prefix: "Über ",
    value: 75,
    statement: "sagen: Wochenendarbeit ist die Regel, nicht die Ausnahme.",
  },
  {
    prefix: "",
    value: 84,
    statement: "fühlen sich stark oder sehr stark belastet.",
  },
];

/**
 * Geprueft am 27.08.2026: Der im Auftrag genannte Pfad
 * bosch-stiftung.de/schulbarometer antwortet mit 404. Diese Adresse ist die
 * funktionierende – ueber drei Weiterleitungen erreichbar, Endstatus 200.
 */
const SOURCE_URL = "https://bosch-stiftung.de/projekt/das-deutsche-schulbarometer";

export function WhyWeExist() {
  return (
    <section
      aria-labelledby="warum-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h2
          id="warum-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Warum es uns gibt
        </h2>

        <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {findings.map((finding) => (
            <li key={finding.statement}>
              <p className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {finding.prefix}
                <CountUpOnView value={finding.value} suffix=" %" />
              </p>
              <p className="mt-3 text-base text-gray-500">{finding.statement}</p>
            </li>
          ))}
        </ul>

        {/* Die Pointe. Sie ist der Grund, warum die drei Zahlen nebeneinander
            stehen: Der erste Wert widerspricht den beiden anderen nur
            scheinbar. */}
        <p className="mt-14 max-w-3xl text-lg text-ink sm:text-xl">
          Es ist nicht der Unterricht, der erschöpft. Es ist alles drumherum. Genau dort
          setzt {PRODUCT_NAME} an.
        </p>

        <p className="mt-8 text-xs text-gray-500">
          Zahlen paraphrasiert nach dem{" "}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-brand-600 underline underline-offset-4"
          >
            Deutschen Schulbarometer
          </a>{" "}
          der Robert Bosch Stiftung – Lehrkräftebefragungen 2022 und 2026.
        </p>
      </div>
    </section>
  );
}
