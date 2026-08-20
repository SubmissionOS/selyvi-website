import Link from "next/link";

import { primaryCta } from "@/config/site";
import { Button } from "@/components/ui/button";

/**
 * 404-Seite.
 *
 * Rendert innerhalb des Root-Layouts, hat also Kopf- und Fusszeile. Kein
 * Wortspiel, kein Maskottchen: Wer hier landet, sucht etwas und will weiter –
 * ein Scherz kostet an dieser Stelle nur Zeit.
 *
 * Zwei Wege hinaus: Startseite fuer Orientierung, Demo als die Handlung, die
 * ohnehin das Ziel der Website ist.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="nicht-gefunden-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <p className="text-sm font-medium text-brand-600">Fehler 404</p>

        <h1
          id="nicht-gefunden-titel"
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Diese Seite gibt es nicht.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Möglicherweise wurde die Adresse geändert oder der Link ist veraltet.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/">Zur Startseite</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
