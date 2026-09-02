import Link from "next/link";

import { PRODUCT_NAME } from "@/config/brand";
import { primaryCta } from "@/config/site";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/scenes/hero-scene";

/**
 * Sektion 1 – Hero.
 * Traegt die einzige H1 der Seite.
 *
 * Rechts stand bis zur Einfuehrung der Szenen ein statisches
 * <InterfaceSkeleton />. Ersetzt durch <HeroScene />, die denselben Vorgang
 * zeigt, den die Subline beschreibt: Beobachtung wird Zeugnistext.
 *
 * Die Szene ist eine Client-Komponente; der Rest der Sektion bleibt eine
 * Server-Komponente. Nur die Szene selbst landet damit im Browser-Buendel.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-titel" className="border-b border-gray-200">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
        <div>
          {/* ==================================================================
              H1 – SAGT, WAS WIR TUN. NICHT, WER DER LESER IST.
              ==================================================================
              Die Vorgängerfassung („Sie sind Lehrkraft geworden, um zu
              unterrichten. Nicht, um zu verwalten.") schrieb dem Leser sein
              Berufsmotiv zu. Das ist der erste Satz der Website – und damit
              die schlechteste denkbare Stelle, um jemandem zu erklären, warum
              er tut, was er tut. Siehe CLAUDE.md, Regel A unter TON.

              Jetzt steht dort eine Tatsache über UNS: Es gibt jetzt eine
              Assistenz für den Papierkram. Frech, ohne den Leser zu
              definieren.

              KEINE block-Spans mehr. Der Satz ist ein Viertel so lang wie der
              alte; `text-wrap: balance` aus globals.css teilt ihn auf 390 px
              in zwei etwa gleich lange Zeilen, ohne dass eine davon auf einem
              Funktionswort endet. Handumbrüche wären hier nur eine Fessel.

              Der unbestimmte Artikel ist die Brücke zur Subline: „eine
              Assistenz" oben, „die mitlernende Assistenz" darunter – erst die
              Behauptung, dann ihr Name. */}
          <h1
            id="hero-titel"
            className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Der Papierkram hat jetzt eine Assistenz.
          </h1>

          {/* ==================================================================
              SUBLINE – POSITIONIERUNG „MITLERNEND"
              ==================================================================
              Jede Teilaussage ist einzeln gegen docs/produktstand-2026-08.md
              geprueft:

                „lernt Ihren Stil"        -> Zeugnisbemerkungen entstehen „im
                                             gelernten Schreibstil der
                                             Lehrkraft" (Live).
                „waechst mit Ihrer
                 Klasse mit"              -> Timeline je Kind, Fachverlauf und
                                             Klassenentwicklung ueber Monate
                                             (beides Live).
                „orientiert sich an
                 aktuellen Bildungs-
                 vorgaben"                -> Kompetenzmodell mit Jahrgangsbezug,
                                             43 Faecher (Live).

              ==================================================================
              WORTLAUT-SPERRE – NICHT AUFWEICHEN
              ==================================================================
              Niemals „greift auf Lehrpläne zu", „nutzt Teilrahmenpläne" oder
              irgendeine Formulierung, die einen ZUGRIFF behauptet. Der
              Produktstand ist da eindeutig: Die Lehrplaene aller 16
              Bundeslaender liegen erhoben vor, sind aus Lizenzgruenden aber
              BEWUSST NICHT ANGEBUNDEN. „Orientiert sich an" beschreibt, wonach
              das Kompetenzmodell gebaut ist – und behauptet keine Anbindung.
              Wer diesen Satz umformuliert, liest vorher den Abschnitt „Der
              Fachkorpus ist noch duenn" im Produktstand. */}
          <p className="mt-6 max-w-xl text-lg text-gray-500">
            {PRODUCT_NAME} ist die mitlernende Assistenz für Lehrkräfte – sie lernt Ihren
            Stil, wächst mit Ihren Klassen mit und orientiert sich an den Bildungs- und
            Rahmenplänen der Länder.
          </p>

          {/* Der Satz bleibt: Er ist das Unterscheidungsmerkmal, an dem
              generische KI im Zeugnis scheitert. */}
          <p className="mt-4 max-w-xl text-lg text-gray-500">
            In Ihrer Sprache, nicht in KI-Sprache.
          </p>

          {/* Herkunftszeile. Nennt bewusst keinen Namen – die Person bleibt
              anonym, so wie im Erzaehltext auf /ueber-uns. */}
          <p className="mt-6 max-w-xl text-sm text-gray-500">
            Entstanden am Küchentisch einer angehenden Grundschullehrerin{" "}
            <span aria-hidden="true">→</span>{" "}
            <Link
              href="/ueber-uns#warum"
              className="text-brand-600 underline underline-offset-4"
            >
              Unsere Geschichte
            </Link>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Primaerer CTA – einzige Verwendung von --cta in dieser Sektion. */}
            <Button asChild variant="cta" size="lg">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>

            {/* Fuehrt direkt in den gefuehrten Einblick. Vorher sprang der
                Knopf zu einer Sektion weiter unten, die ihrerseits dorthin
                verwies – ein Umweg ueber einen Anker. */}
            <Button asChild variant="ghost" size="lg">
              <Link href="/einblick">Selbst ausprobieren</Link>
            </Button>
          </div>
        </div>

        <HeroScene />
      </div>
    </section>
  );
}
