/**
 * Sektion 2 – Das Erhebungsmodell.
 *
 * ==========================================================================
 * ALLES HIER IST DURCH docs/produktstand-2026-08.md GEDECKT.
 * ==========================================================================
 * Der Produktstand fuehrt unter „Positionierung“ ein vollstaendiges
 * Erhebungsmodell nach PHINEO-Wirkungstreppe auf: Befragung ueber drei Wellen,
 * zweckgranulare Einwilligung, Codebuch, Mindestfallzahlen. Der
 * „Wirkungsbericht je Schule“ ist als Live gefuehrt.
 *
 * Was hier NICHT steht, obwohl es naheliegen wuerde: irgendein Ergebnis. Die
 * Seite beschreibt, WIE gemessen wird, nicht WAS herauskam – Zahlen gibt es
 * erst, wenn die Wellen durch sind.
 *
 * Die Treppe ist bewusst keine Grafik-Datei und keine Animation:
 *   - Sie besteht aus echtem Text in einer geordneten Liste. Eine SVG-Treppe
 *     mit Beschriftung waere fuer Screenreader eine einzige alt-Zeile; hier
 *     liest jede Stufe sich einzeln vor, in der richtigen Reihenfolge.
 *   - Die Staffelung entsteht ueber feste Hoehen ab sm. Auf schmalen Displays
 *     stehen die vier Stufen schlicht untereinander – eine 2x2-Anordnung
 *     zerstoert die Aussage „aufsteigend“, und vier gequetschte Saeulen
 *     nebeneinander sind auf 390 px unlesbar.
 *   - Feste Hoehen statt inhaltsabhaengiger: haelt CLS bei 0.
 */
const stages = [
  {
    name: "Input",
    description:
      "Was hineingeht: Entwicklungsarbeit, Fachkorpus, die Einführung an einer Schule.",
    /** Aufsteigende Hoehen ab sm – die Treppe entsteht hier und nirgends sonst. */
    height: "sm:h-44",
  },
  {
    name: "Output",
    description:
      "Was messbar entsteht: Beobachtungen, Zeugnisbemerkungen, Elternmails, Material.",
    height: "sm:h-52",
  },
  {
    name: "Outcome",
    description:
      "Was sich bei den Beteiligten ändert: Zeitaufwand, erlebte Belastung, Rückmeldung an Eltern.",
    height: "sm:h-60",
  },
  {
    name: "Impact",
    description:
      "Was darüber hinaus bleibt. Die Stufe, für die drei Befragungswellen allein nicht reichen – hier brauchen wir Forschungspartner.",
    height: "sm:h-68",
  },
];

export function ImpactModel() {
  return (
    <section aria-labelledby="wirkungsmodell-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="wirkungsmodell-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Wie wir messen
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Das Erhebungsmodell orientiert sich an der Wirkungstreppe von PHINEO und
          unterscheidet Input, Output, Outcome und Impact. Erhoben wird über drei
          Befragungswellen – nicht einmalig, weil eine einzelne Momentaufnahme
          Gewöhnungseffekte nicht von Entlastung trennen kann.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Wer teilnimmt, willigt zweckgranular ein: nicht pauschal in „Forschung“, sondern
          je Zweck einzeln. Wie ausgewertet wird, steht vorab in einem Codebuch. Und
          ausgewiesen wird ein Wert erst ab einer festgelegten Mindestfallzahl – darunter
          bleibt das Feld leer, statt eine Zahl zu zeigen, die niemanden trägt.
        </p>

        <ol className="mt-14 grid gap-4 sm:grid-cols-4 sm:items-end">
          {stages.map((stage, index) => (
            <li
              key={stage.name}
              className={`flex flex-col justify-end rounded-lg border border-gray-200 bg-surface-alt p-5 ${stage.height}`}
            >
              <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
                Stufe {index + 1}
              </p>
              <p className="mt-2 text-base font-semibold text-ink">{stage.name}</p>
              <p className="mt-2 text-sm text-gray-500">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
