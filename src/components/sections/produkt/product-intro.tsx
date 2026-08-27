import { PRODUCT_NAME, SCHOOL_TYPE_ANSWER } from "@/config/brand";

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
          Die Abende gehören wieder Ihnen.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Zeugniszeit heißt Wochenenden am Schreibtisch. Elternpost heißt Abende. Und die
          Dokumentation, die man das ganze Jahr nebenbei machen sollte, fehlt genau dann,
          wenn man sie braucht.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Genau diese Arbeit nimmt {PRODUCT_NAME} Ihnen ab – nicht die Entscheidungen. Was
          Sie im Unterricht nebenbei festhalten, wird am Zeugnistag zur Grundlage des
          Textes und bestimmt, welches Material zu Ihrer Klasse passt.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Entstanden ist all das nicht am Reißbrett, sondern aus Rückmeldungen von
          Lehrkräften – zuerst von einer, dann von vielen.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">{SCHOOL_TYPE_ANSWER}</p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Auf dieser Seite steht, was die Anwendung heute tut. Was noch nicht fertig ist,
          finden Sie weiter unten unter „In Arbeit“ – nicht dazwischengemischt.
        </p>
      </div>
    </section>
  );
}
