import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  CalendarClock,
  ClipboardList,
  Compass,
  FileStack,
  Map,
  Microscope,
  Sprout,
  Timer,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
 * Der Vorspann sagt das weiterhin – aber als EINLADUNG statt als Defizit.
 * Die frueheren Saetze („Keine davon lässt sich heute aus Selyvi beantworten
 * – die Erhebungsinstrumente dafür gibt es noch nicht.“) waren wahr und
 * trotzdem falsch platziert: Sie erklaerten einer Leserin als Erstes, was
 * nicht geht. Der Inhalt ist unveraendert – es gibt heute nichts abzurufen –,
 * die Blickrichtung ist neu: Die Instrumente entstehen gerade, und wer jetzt
 * einsteigt, gestaltet sie mit. Das ist kein Schoenreden, sondern der
 * tatsaechliche Grund, warum diese Seite existiert.
 *
 * Zwei Vorkehrungen bleiben:
 *   1. Der Vorspann steht VOR den Karten, nicht darunter.
 *   2. Jede Karte ist im Wir-Modus und im Futur/Konjunktiv formuliert. Kein
 *      Satz behauptet einen vorhandenen Datenbestand.
 *
 * ==========================================================================
 * TEXTLAENGE: ALLE KARTEN AUF EIN MASS
 * ==========================================================================
 * Richtwert ist „Regionale Unterschiede“ mit 185 Zeichen – die Karte, die im
 * Layout am besten sass. Toleranz rund 165 bis 200 Zeichen. Zwei Saetze je
 * Karte: Der erste nennt die Frage, der zweite sagt, warum wir sie nicht
 * allein beantworten koennen.
 *
 * Wer eine Karte ergaenzt, prueft die Laenge mit – ungleich lange Texte
 * lassen ein Raster aus neun Karten unruhig wirken, und genau daran ist die
 * Vorgaenger-Fassung aufgefallen.
 *
 * Die Themen stammen aus docs/selyvi-kompakt.md, Abschnitt
 * „Wissenschaftliches Potenzial“. Dort stehen sie als Potenzial – hier
 * duerfen sie deshalb nur als Vorhaben stehen.
 */
type ResearchField = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const fields: ResearchField[] = [
  {
    icon: Compass,
    title: "Evidenzbasierte Unterrichtskonzepte",
    description:
      "Welche Unterrichtskonzepte im Alltag tatsächlich tragen und welche nur auf dem Papier funktionieren. Eine Frage, die sich gemeinsam prüfen ließe, statt sie weiter zu vermuten.",
  },
  {
    icon: Microscope,
    title: "Tatsächliche Unterrichtsprozesse",
    description:
      "Wie eine Stunde wirklich verläuft – zwischen Plan, Zwischenfall und Improvisation. Diesen Abstand zwischen Entwurf und Wirklichkeit würden wir gern mit Ihnen vermessen.",
  },
  {
    icon: Blocks,
    title: "Unterschiedliche Lehrstile",
    description:
      "Woran sich Lehrstile im Alltag unterscheiden und was das im Unterricht bewirkt. Ein Feld, in dem wir uns Forschung wünschen, die mehr sieht als eine einzelne Schule.",
  },
  {
    icon: FileStack,
    title: "Neue Lehr- und Lernmaterialien",
    description:
      "Wie Material aussehen müsste, das auf den dokumentierten Beobachtungen einer konkreten Klasse aufbaut. Wir würden es gern gemeinsam entwerfen und danach prüfen lassen.",
  },
  {
    icon: ClipboardList,
    title: "Evaluation digitaler Unterstützung",
    description: `Ob digitale Werkzeuge im Schulalltag wirklich halten, was sie versprechen. Für uns die unbequemste Frage – und der Grund, warum ${PRODUCT_NAME} sie nicht allein beantworten sollte.`,
  },
  {
    icon: Timer,
    title: "Organisatorische Belastung von Lehrkräften",
    description:
      "Welcher Anteil der Arbeitszeit auf Dokumentation, Kommunikation und Verwaltung entfällt – und welche dieser Tätigkeiten überhaupt als belastend erlebt wird und welche nicht.",
  },
  {
    icon: Map,
    title: "Regionale Unterschiede",
    /** Die Referenzkarte fuer die Textlaenge – 185 Zeichen. */
    description:
      "Ob sich Belastung und Vorbereitungspraxis zwischen Bundesländern, Schulgrößen und Einzugsgebieten systematisch unterscheiden. Eine Frage, die nur ein Verbund über Ländergrenzen hinweg beantwortet.",
  },
  {
    icon: Sprout,
    title: "Neue Förderkonzepte",
    description:
      "Wie Förderung aussieht, wenn sie auf laufender Beobachtung aufbaut statt auf einer einzelnen Momentaufnahme. Dafür braucht es fachliche Gegenrede, nicht nur Software.",
  },
  {
    icon: CalendarClock,
    title: "Langfristige Wirkungsanalysen",
    description:
      "Was von schulischen Maßnahmen nach Jahren tatsächlich übrig bleibt. Eine Frage, für die drei Befragungswellen nicht reichen – hier brauchen wir Partner mit langem Atem.",
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

        {/* Diese beiden Saetze sind die Absicherung der ganzen Sektion – und
            zugleich die Einladung. Ohne sie liest sich die Kartenliste wie ein
            Datenkatalog. */}
        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Neun Fragen, die uns beschäftigen. Unser Wirkungsmodell läuft bereits in
          Befragungswellen; die Instrumente für diese Fragen entwerfen wir gemeinsam mit
          denen, die sie später nutzen.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Wir entwerfen sie nicht gern allein. Wer in einem dieser Felder arbeitet, soll
          mitentscheiden, was überhaupt erhoben wird – und was besser nicht.
        </p>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field, position) => (
            <li
              key={field.title}
              /* Neun Karten in ZWEI Spalten ergeben 2+2+2+2+1 – die letzte
                 steht allein und liest sich wie vergessen. Sie nimmt dort
                 deshalb beide Spalten ein. Bei drei Spalten (ab lg) geht die
                 Rechnung ohnehin auf, da gilt wieder eine Spalte. */
              className={cn(
                "rounded-xl border border-gray-200 bg-surface p-6",
                position === fields.length - 1 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <field.icon
                aria-hidden="true"
                className="size-6 text-brand-600"
                strokeWidth={1.75}
              />
              <h3 className="mt-4 text-base font-semibold text-ink">{field.title}</h3>
              <p className="mt-3 text-sm text-gray-500">{field.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
