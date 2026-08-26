import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 4 – Forschungsfelder als PERSPEKTIVEN, nicht als Angebot.
 *
 * ==========================================================================
 * KEINE DIESER FRAGEN LAESST SICH HEUTE AUS DEM PRODUKT BEANTWORTEN.
 * ==========================================================================
 * Der Forschungsdaten-Export ist laut docs/produktstand-2026-08.md „Nicht
 * gebaut“, und die Forschungszwecke sind zusaetzlich technisch gesperrt,
 * solange die Einwilligungstexte nicht juristisch geprueft sind.
 *
 * Deshalb drei Vorkehrungen in dieser Sektion, die niemand wegkuerzen sollte:
 *   1. Der Vorspann sagt AUSDRUECKLICH, dass heute nichts davon abrufbar ist.
 *      Er steht vor den Karten, nicht darunter.
 *   2. Jede Karte ist im Wir-Modus und im Futur/Konjunktiv formuliert
 *      („gemeinsam untersuchen“, „liesse sich“, „waere“). Kein Satz behauptet
 *      einen vorhandenen Datenbestand.
 *   3. Kein Feld nennt eine Fallzahl, eine Schule oder ein Ergebnis.
 *
 * Die Themen stammen aus dem Zielbild-Dokument docs/selyvi-kompakt.md. Dort
 * stehen sie als Potenzial – hier duerfen sie deshalb nur als Vorhaben stehen.
 */
type ResearchField = {
  title: string;
  description: string;
};

const fields: ResearchField[] = [
  {
    title: "Unterrichtsvorbereitung im Alltag",
    description:
      "Wie Vorbereitung tatsächlich abläuft – zwischen Tür und Angel, am Abend, am Wochenende – statt so, wie sie in Studienplänen beschrieben wird. Das ließe sich gemeinsam untersuchen, sobald die Instrumente dafür stehen.",
  },
  {
    title: "Organisatorische Belastung von Lehrkräften",
    description:
      "Welcher Anteil der Arbeitszeit auf Dokumentation, Kommunikation und Verwaltung entfällt – und welche dieser Tätigkeiten als belastend erlebt wird und welche nicht.",
  },
  {
    title: "Wirkung digitaler Entlastung",
    description: `Ob eingesparte Zeit tatsächlich als Entlastung ankommt oder nur an anderer Stelle wieder gebunden wird. Für uns die unbequemste Frage – und der Grund, warum ${PRODUCT_NAME} sie nicht allein beantworten sollte.`,
  },
  {
    title: "Entwicklung von Fördermaterial",
    description:
      "Wie sich Material verändert, wenn es auf dokumentierten Beobachtungen einer konkreten Klasse aufbaut statt auf einem allgemeinen Jahrgangsbild. Ein Feld, in dem wir uns fachliche Gegenrede wünschen.",
  },
  {
    title: "Regionale Unterschiede",
    description:
      "Ob sich Belastung und Vorbereitungspraxis zwischen Bundesländern, Schulgrößen und Einzugsgebieten systematisch unterscheiden. Dafür bräuchte es mehr Schulen, als heute mit uns arbeiten.",
  },
];

export function ResearchFields() {
  return (
    <section
      aria-labelledby="forschungsfelder-titel"
      className="border-b border-gray-200"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="forschungsfelder-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Woran sich mit {PRODUCT_NAME} forschen lässt
        </h2>

        {/* Diese beiden Saetze sind die Absicherung der ganzen Sektion. Ohne sie
            liest sich die Kartenliste wie ein Datenkatalog. */}
        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Fünf Fragen, die uns beschäftigen. Keine davon lässt sich heute aus{" "}
          {PRODUCT_NAME} beantworten – die Erhebungsinstrumente dafür gibt es noch nicht.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Wir stellen sie hier trotzdem, weil wir sie nicht allein entwerfen wollen. Wer
          in einem dieser Felder arbeitet, soll mitentscheiden, was überhaupt erhoben
          wird.
        </p>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <li
              key={field.title}
              className="rounded-xl border border-gray-200 bg-surface p-6"
            >
              <h3 className="text-base font-semibold text-ink">{field.title}</h3>
              <p className="mt-3 text-sm text-gray-500">{field.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
