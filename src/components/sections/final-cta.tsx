import Link from "next/link";

import { PRODUCT_NAME } from "@/config/brand";
import { primaryCta } from "@/config/site";
import { Button } from "@/components/ui/button";

/**
 * Sektion 9 – Abschluss-CTA.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-titel"
      className="border-t border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h2
          id="final-cta-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Zwanzig Minuten, dann wissen Sie, ob {PRODUCT_NAME} Ihnen hilft.
        </h2>

        <div className="mt-10">
          {/* Primaerer CTA – einzige Verwendung von --cta in dieser Sektion. */}
          <Button asChild variant="cta" size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
