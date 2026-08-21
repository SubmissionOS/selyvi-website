import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 1 – Intro.
 *
 * Schmaler Einstieg ohne Bild und ohne CTA: Der Handlungsaufruf steht bewusst
 * erst am Seitenende, damit die Seite zuerst erklaert und dann fragt.
 *
 * Die H1 benennt den Kreislauf, um den herum das Produkt gebaut ist: Was
 * waehrend des Unterrichts erfasst wird, wird zum Zeugnistext und zum Material.
 *
 * Der zweite Absatz sagt ausdruecklich, dass hier nur Vorhandenes steht. Das
 * ist keine Floskel, sondern die Zusage, an der die Seite gemessen werden
 * darf – und der Grund, warum <Roadmap /> darunter ueberhaupt noetig ist.
 */
export function ProductIntro() {
  return (
    <section aria-labelledby="produkt-intro-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="produkt-intro-titel"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Aus Beobachtungen werden Texte und Material.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          {PRODUCT_NAME} deckt vier Bereiche ab: Dokumentation, Kommunikation, Unterricht
          und Steuerung. Was Sie nebenbei im Unterricht erfassen, ist am Zeugnistag die
          Grundlage des Textes – und bestimmt, welches Material zu Ihrer Klasse passt.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Auf dieser Seite steht, was die Anwendung heute tut. Was noch nicht fertig ist,
          finden Sie weiter unten unter „In Arbeit“ – nicht dazwischengemischt.
        </p>
      </div>
    </section>
  );
}
