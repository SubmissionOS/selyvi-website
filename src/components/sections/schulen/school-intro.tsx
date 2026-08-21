import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 1 – Intro.
 *
 * Gleiche Bauweise wie das Intro auf /produkt: schmal, ohne Bild, ohne CTA.
 * Der Ton wechselt hier von „mein Alltag“ zu „meine Organisation“ – adressiert
 * werden Schulleitung und Schulträger, nicht die einzelne Lehrkraft.
 */
export function SchoolIntro() {
  return (
    <section aria-labelledby="schulen-intro-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="schulen-intro-titel"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          {PRODUCT_NAME} an Ihrer Schule einführen.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          {PRODUCT_NAME} nimmt Ihrem Kollegium die Schreibarbeit ab, die sich am
          Zeugnistag und an den Elternabenden stapelt – und zeigt Ihnen am Monatsende, wie
          viele Stunden das war.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Auf dieser Seite steht auch, was heute noch nicht geht: der Serverstandort, die
          fehlende Schnittstelle zu Ihrer Schulverwaltungssoftware, der Startaufwand beim
          Anlegen der Klassen. Diese Punkte gehören ins Angebot, nicht in die
          Überraschung.
        </p>
      </div>
    </section>
  );
}
