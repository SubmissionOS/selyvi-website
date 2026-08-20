import { ReviewMarker } from "@/components/ui/review-marker";

/**
 * Hinweis zur Auftragsverarbeitung – GETEILTE Sektion.
 *
 * Wird auf /schulen und /datenschutz-sicherheit eingesetzt. Bewusst EINE
 * Komponente statt zweimal derselbe Text: Die Aussage zum AVV muss auf beiden
 * Seiten wortgleich sein, und zwar auch noch, nachdem jemand sie einmal
 * ueberarbeitet hat. Eine Kopie waere genau die Stelle, an der eine Schule
 * spaeter zwei verschiedene Zusagen nebeneinander findet.
 *
 * Die Markierung bleibt stehen, bis der Vertragsentwurf tatsaechlich
 * existiert. Ein AVV ist fuer eine Schule ein Beschaffungs-Kriterium – die
 * Zusage „stellen wir bereit“ ohne fertiges Dokument waere genau die Art von
 * Aussage, die im Erstgespraech auffliegt.
 */
export function DpaBand() {
  return (
    <section
      aria-labelledby="avv-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <h2 id="avv-titel" className="text-2xl font-semibold tracking-tight text-ink">
            Auftragsverarbeitung nach Art. 28 DSGVO
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Den Vertragsentwurf stellen wir im Erstgespräch bereit.{" "}
            <ReviewMarker note="AVV-Dokument in Erstellung" />
          </p>
        </div>
      </div>
    </section>
  );
}
