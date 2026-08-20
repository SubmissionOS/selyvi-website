import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";
import { ImprintDetails } from "@/components/sections/legal/imprint-details";

/**
 * Impressum.
 *
 * Die Angaben in src/config/legal.ts sind echt. `IMPRINT_READY` steht deshalb
 * auf true: kein noindex, kein Entwurfs-Balken, wieder in der Sitemap.
 *
 * Offen bleibt allein die Vorläufigkeit der Betreiberangabe – Selyvi wird
 * derzeit als Angebot eines Einzelunternehmens geführt. Der Hinweis dazu steht
 * als Transparenz-Zeile oben auf der Seite, nicht als Balken über allem: Er
 * stellt die Richtigkeit der Angaben nicht infrage, sondern nur ihre Dauer.
 *
 * KEIN Registereintrag – Einzelunternehmen ohne Kaufmannseigenschaft sind
 * nicht eingetragen. Die Rubrik fehlt ganz, statt leer dazustehen.
 */
export const metadata: Metadata = pageMetadata("/impressum");

export default function ImpressumPage() {
  return (
    <section aria-labelledby="impressum-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="impressum-titel"
          className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Impressum
        </h1>

        <ImprintDetails />
      </div>
    </section>
  );
}
