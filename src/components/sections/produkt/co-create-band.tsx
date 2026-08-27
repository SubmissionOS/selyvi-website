import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Einladungs-Band am Ende von /fuer-lehrkraefte.
 *
 * Es steht zwischen „In Arbeit" und dem Final-CTA – und zwar genau dort aus
 * einem Grund: Wer die Liste der offenen Baustellen gelesen hat und trotzdem
 * weiterliest, ist die Person, die gemeint ist. Vor der Liste waere die
 * Einladung eine Werbung, danach ist sie eine Konsequenz.
 *
 * Der Knopf traegt NICHT die --cta-Farbe. Die gehoert dem Demo-Button, und
 * zwei gleich starke Aufrufe direkt untereinander heben sich gegenseitig auf.
 */
export function CoCreateBand() {
  return (
    <section
      aria-labelledby="mitgestalten-band-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2
            id="mitgestalten-band-titel"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Ihnen fehlt etwas auf dieser Seite?
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Dann ist das der interessanteste Satz, den wir heute hören können. Ein Teil
            von dem, was oben steht, gibt es, weil eine Lehrkraft genau das gesagt hat.
          </p>

          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/mitgestalten">Mitgestalten</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
