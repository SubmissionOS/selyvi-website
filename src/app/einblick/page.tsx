import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/config/seo";
import { primaryCta } from "@/config/site";
import { Button } from "@/components/ui/button";
import { GuidedTour } from "@/components/einblick/guided-tour";

export const metadata: Metadata = pageMetadata("/einblick");

/**
 * Geführter Einblick – die einzige bedienbare Seite der Website.
 *
 * Sie ersetzt die frühere Sektion „So funktioniert's" auf der Startseite:
 * Erklären war der Umweg, klicken ist der kurze Weg.
 *
 * Drei von elf Bereichen sind offen. Die Sperren sind kein Mangel, sondern
 * die Botschaft – wer alles sieht, hat keinen Grund mehr für ein Gespräch.
 *
 * KEIN Navigationspunkt: Die Kopfzeile bleibt bei fünf. Erreichbar über die
 * Sektion „Riskieren Sie einen Blick." auf der Startseite und über die
 * Fusszeile.
 */
export default function EinblickPage() {
  return (
    <>
      <section aria-labelledby="einblick-titel" className="border-b border-gray-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <h1
            id="einblick-titel"
            className="max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Klicken Sie sich einmal durch.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-gray-500">
            Drei Bereiche sind offen: eine Beobachtung festhalten, daraus einen
            Zeugnistext entstehen lassen, den Sitzplan umstellen. Länger als zwei Minuten
            dauert das nicht.
          </p>

          <div className="mt-10">
            <GuidedTour />
          </div>
        </div>
      </section>

      {/* Abschluss. Bewusst ruhig: Wer bis hierher geklickt hat, braucht keinen
          Anschub mehr, sondern nur den nächsten Schritt. */}
      <section aria-labelledby="einblick-abschluss" className="bg-surface-alt">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2
              id="einblick-abschluss"
              className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              Das war ein Ausschnitt aus drei von elf Bereichen.
            </h2>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild variant="cta" size="lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>

              <Link
                href="/mitgestalten"
                className="text-base text-brand-600 underline underline-offset-4"
              >
                Oder gleich mitgestalten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
