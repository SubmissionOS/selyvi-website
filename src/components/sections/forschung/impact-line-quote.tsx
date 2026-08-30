import { IMPACT_LINE_PRINCIPLE } from "@/config/product";

/**
 * Sektion 3 – Der Grundsatz hinter der Wirkungszeile, als Zitat-Band.
 *
 * Die Wirkungszeile ist laut docs/produktstand-2026-08.md Live: Direkt unter
 * dem Entlastungsbericht steht ein Satz, der entweder gemessene
 * Befragungswerte nennt oder in Klartext sagt, warum sich noch nichts sagen
 * laesst – und er verschwindet nie.
 *
 * Warum dieser Satz auf der FORSCHUNGSSEITE steht und nicht nur auf /schulen:
 * Er ist der einzige Beleg auf dieser Website dafuer, dass die
 * Wirkungsmessung nicht nur als Absicht existiert, sondern im laufenden
 * Produkt eine Aussage BLOCKIEREN kann. Genau das ist die Frage, die eine
 * Forscherin stellt.
 *
 * <blockquote> statt eines gestylten <p>: Der Satz ist ein Zitat aus dem
 * eigenen Produktgrundsatz, und Screenreader kuendigen ihn als solches an.
 */
export function ImpactLineQuote() {
  return (
    <section aria-label="Grundsatz der Wirkungszeile" className="bg-surface-alt">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <blockquote className="max-w-3xl border-l-2 border-brand-600 pl-6">
          <p className="text-xl leading-snug font-medium tracking-tight text-ink sm:text-2xl">
            „{IMPACT_LINE_PRINCIPLE}“
          </p>
        </blockquote>

        <p className="mt-6 max-w-2xl text-base text-gray-500">
          Sie ist das Gegengewicht dazu, dass „140 Stunden gespart“ sonst als belegte
          Wirkung gelesen wird.
        </p>
      </div>
    </section>
  );
}
