import Link from "next/link";

import { PRODUCT_NAME } from "@/config/brand";
import { primaryCta } from "@/config/site";
import { Button } from "@/components/ui/button";
import { InterfaceSkeleton } from "@/components/sections/interface-skeleton";

/**
 * Sektion 1 – Hero.
 * Traegt die einzige H1 der Seite.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-titel" className="border-b border-gray-200">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
        <div>
          {/* Zwei Saetze, zwei Zeilen: die block-spans erzwingen den Umbruch an
              der Satzgrenze. Ohne sie verteilt text-wrap: balance (globals.css)
              die Woerter gleichmaessig und bricht mitten im ersten Satz um. */}
          <h1
            id="hero-titel"
            className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            <span className="block">Weniger Verwaltung.</span>
            <span className="block">Mehr Unterricht.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-500">
            {PRODUCT_NAME} ist die KI-Assistenz für Lehrkräfte – korrigiert Abgaben,
            dokumentiert Leistungen und organisiert den Schulalltag. DSGVO-konform,
            entwickelt in der EU.
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

        <InterfaceSkeleton />
      </div>
    </section>
  );
}
