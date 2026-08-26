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
          {/* DREI block-Spans, nicht zwei – und das ist gemessen, nicht
              Geschmack.

              Mit zwei Spans (Umbruch nur an der Satzgrenze) verteilt
              `text-wrap: balance` aus globals.css den ersten Satz selbst, und
              auf 390 px endete die zweite Zeile dann mitten in der Wendung:
              „Sie sind Lehrkraft / geworden, um / zu unterrichten." Ein
              Zeilenende auf „um" liest sich wie ein Stolpern.

              Jetzt bricht die Zeile an den beiden natürlichen Grenzen des
              Satzes – nach dem Komma und nach dem Punkt. Die Schriftgröße ist
              so gewählt, dass jeder der drei Teile auf 390 px wie auf 1440 px
              in EINE Zeile passt; damit hat `balance` nichts mehr zu tun. */}
          <h1
            id="hero-titel"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            <span className="block">Sie sind Lehrkraft geworden,</span>
            <span className="block">um zu unterrichten.</span>
            <span className="block">Nicht, um zu verwalten.</span>
          </h1>

          {/* Subline nach docs/produktstand-2026-08.md: benennt die drei
              Ergebnisse, die das Produkt heute wirklich erzeugt. Der frueher hier
              stehende Satz („korrigiert Abgaben … entwickelt in der EU") sagte
              zwei Dinge zu, die es so nicht gibt – eine Korrekturfunktion und
              EU-Hosting des Produkts. */}
          <p className="mt-6 max-w-xl text-lg text-gray-500">
            {PRODUCT_NAME} nimmt Ihre Beobachtungen aus dem Unterricht auf – getippt oder
            gesprochen – und macht daraus, was Sie ohnehin schreiben müssen:
            Zeugnisbemerkungen, Elternmails, passendes Material. In Ihrer Sprache, nicht
            in KI-Sprache.
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

            {/* Sprungmarke zu Sektion 4. Das weiche Scrollen kommt aus
                globals.css und wird bei prefers-reduced-motion abgeschaltet. */}
            <Button asChild variant="ghost" size="lg">
              <a href="#so-funktionierts">So funktioniert’s</a>
            </Button>
          </div>
        </div>

        <HeroScene />
      </div>
    </section>
  );
}
