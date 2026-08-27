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
 * ZU DEN ZAHLEN – BITTE VOR DEM LIVEGANG PRÜFEN
 * ==========================================================================
 * Die drei Werte stammen aus dem Deutschen Schulbarometer der Robert Bosch
 * Stiftung und sind PARAPHRASIERT, nicht wörtlich zitiert. Das Schulbarometer
 * erscheint in mehreren Befragungswellen mit unterschiedlichen Werten.
 *
 * Ich konnte die Werte hier nicht selbst gegen die Veröffentlichung prüfen.
 * Vor dem Livegang gehört deshalb geklärt: Aus WELCHER Welle stammen sie?
 * Anschliessend hier die Jahreszahl ergänzen – „Deutsches Schulbarometer 2024“
 * ist überprüfbar, „Deutsches Schulbarometer“ allein nicht. Siehe README,
 * NACH-LAUNCH-LISTE.
 */
const findings = [
  {
    /** Die Saetze setzen die Zahl grammatisch fort – ein Screenreader liest
        „83 % der Lehrkraefte ueben ihren Beruf gern aus." am Stueck vor. */
    figure: "83 %",
    statement: "der Lehrkräfte üben ihren Beruf gern aus.",
  },
  {
    figure: "Über 75 %",
    statement: "sagen: Wochenendarbeit ist die Regel, nicht die Ausnahme.",
  },
  {
    figure: "84 %",
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
            <li key={finding.figure}>
              <p className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {finding.figure}
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
          der Robert Bosch Stiftung – Lehrkräftebefragungen.
        </p>
      </div>
    </section>
  );
}
