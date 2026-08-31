import { BookOpenCheck, PenLine, Users } from "lucide-react";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion – „Selyvi lernt mit.“
 *
 * Steht direkt nach dem Intro von /fuer-lehrkraefte und beantwortet die
 * Frage, die sonst erst nach vier Funktionsbloecken beantwortet waere:
 * Warum ist das kein Materialgenerator?
 *
 * ==========================================================================
 * DREI KARTEN, DREI LIVE-FUNKTIONEN
 * ==========================================================================
 *   Ihr Stil           -> „Zeugnisbemerkungen — Live … im gelernten
 *                         Schreibstil der Lehrkraft."
 *   Ihre Klasse        -> „Förderempfehlungen, Timeline, Klassenanalyse — Live"
 *                         und „Fachverlauf und Stundenprotokoll — Live"
 *                         (Klassenentwicklung ueber Monate).
 *   Der aktuelle Stand -> „Kompetenzen statt Notendurchschnitt — Live … 43
 *                         Fächer … mit Jahrgangsbezug."
 *
 * ==========================================================================
 * WORTLAUT-SPERRE FÜR KARTE 3 – NICHT AUFWEICHEN
 * ==========================================================================
 * „Orientiert sich an" ist das staerkste zulaessige Verb. Niemals „greift
 * zu", „nutzt", „liest ein" oder „ist angebunden an": Die Lehrplaene aller 16
 * Bundeslaender liegen laut Produktstand erhoben vor, sind aus Lizenzgruenden
 * aber BEWUSST NICHT ANGEBUNDEN. Rahmen- und Teilrahmenplaene werden hier als
 * Beispiel dessen genannt, WORAN sich das Kompetenzmodell orientiert – nicht
 * als Datenquelle, auf die zugegriffen wird.
 *
 * ==========================================================================
 * TON-WÄCHTER FÜR KARTE 3
 * ==========================================================================
 * Der Satz darf langjaehrige Lehrkraefte nicht als veraltet vorfuehren. Das
 * Manifest auf /ueber-uns verspricht ausdruecklich: niemand wird vorgefuehrt.
 * Die Karte sagt deshalb, dass BEWAEHRTER Unterricht und heutige Anforderungen
 * zusammenfinden – Erfahrung ist hier das Wertvolle, nicht das Problem.
 * Formulierungen wie „endlich auf dem neuesten Stand" oder „ohne veraltete
 * Methoden" sind gesperrt.
 *
 * ==========================================================================
 * WARUM DIE ERSTE KARTE NICHT „STIL" HEISST
 * ==========================================================================
 * Die Stil-Aussage hat auf der Startseite genau EINE Heimat: die Spalte „Für
 * Lehrkräfte" in „Was Selyvi zurückgibt". Diese Sektion liegt auf einer
 * anderen Seite und zaehlt dort nicht mit – die Redundanz-Zaehlung laeuft je
 * Seite. Trotzdem ist der Wortlaut hier bewusst ein anderer: Dort geht es um
 * das ERGEBNIS („Texte, die nach Ihnen klingen"), hier um die FÄHIGKEIT
 * („lernt, wie Sie schreiben"). Zwei Mal derselbe Satz waere Fuellmaterial.
 */
const traits = [
  {
    icon: PenLine,
    title: "Ihr Stil",
    description:
      "Lernt, wie Sie schreiben und arbeiten. Was entsteht, klingt nach Ihnen – nicht nach einem Sprachmodell.",
  },
  {
    icon: Users,
    title: "Ihre Klasse",
    description:
      "Begleitet die Entwicklung über Monate. Beobachtungen, Fachverlauf und Kompetenzen wachsen zusammen statt nebeneinander.",
  },
  {
    icon: BookOpenCheck,
    title: "Der aktuelle Stand",
    description:
      "Orientiert sich an aktuellen Bildungsvorgaben wie Rahmen- und Teilrahmenplänen – damit bewährter Unterricht und heutige Anforderungen zusammenfinden, ganz ohne Fortbildungsmarathon.",
  },
];

export function LearnsWithYou() {
  return (
    <section
      aria-labelledby="lernt-mit-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <h2
          id="lernt-mit-titel"
          className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          {PRODUCT_NAME} lernt mit.
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {traits.map((trait) => (
            <li
              key={trait.title}
              className="rounded-xl border border-gray-200 bg-surface p-6"
            >
              <trait.icon
                aria-hidden="true"
                className="size-6 text-brand-600"
                strokeWidth={1.75}
              />
              <h3 className="mt-4 text-base font-semibold text-ink">{trait.title}</h3>
              <p className="mt-3 text-sm text-gray-500">{trait.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
