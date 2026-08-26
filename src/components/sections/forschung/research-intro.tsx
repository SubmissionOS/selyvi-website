import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 1 – Intro der Forschungsseite.
 *
 * Gleiche Bauweise wie die Intros auf /fuer-lehrkraefte und /schulen: schmal,
 * ohne Bild, ohne CTA. Der Handlungsaufruf steht am Seitenende.
 *
 * Der Ton unterscheidet sich bewusst von beiden: Diese Seite wirbt niemanden
 * an. Sie richtet sich an Menschen, die beruflich pruefen, bevor sie glauben –
 * und fuer die eine Marketingseite mit Wirkungsversprechen ein Ausschlusskri-
 * terium waere. Deshalb steht in der H1 die Grenze und nicht das Versprechen.
 */
export function ResearchIntro() {
  return (
    <section aria-labelledby="forschung-intro-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="forschung-intro-titel"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Wirkung wollen wir belegen – nicht behaupten.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          {PRODUCT_NAME} entsteht mitten im Schulalltag und erzeugt dabei die Frage, die
          uns selbst am meisten interessiert: Was entlastet wirklich?
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Deshalb bauen wir die Wirkungsmessung von Anfang an ein – und suchen
          Forschungspartner, die genauer hinschauen wollen.
        </p>
      </div>
    </section>
  );
}
