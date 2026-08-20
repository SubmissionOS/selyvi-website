import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 1 – Intro.
 *
 * Schmaler Einstieg ohne Bild und ohne CTA: Der Handlungsaufruf steht bewusst
 * erst am Seitenende, damit die Seite zuerst erklaert und dann fragt.
 *
 * Die beiden Saetze sind aus der Hero-Subline der Startseite abgeleitet und
 * enthalten keine darueber hinausgehende Zusage.
 */
export function ProductIntro() {
  return (
    <section aria-labelledby="produkt-intro-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="produkt-intro-titel"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Ein Arbeitsplatz für den ganzen Schulalltag.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          {PRODUCT_NAME} ist die KI-Assistenz für Lehrkräfte: Sie korrigiert Abgaben,
          dokumentiert Leistungen und organisiert den Schulalltag. Die Anwendung ist
          DSGVO-konform und wird in der EU entwickelt.
        </p>
      </div>
    </section>
  );
}
