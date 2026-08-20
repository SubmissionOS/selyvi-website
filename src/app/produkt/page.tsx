import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";
import { ProductIntro } from "@/components/sections/produkt/product-intro";
import { PrincipleBand } from "@/components/sections/produkt/principle-band";
import { FunctionBlocks } from "@/components/sections/produkt/function-blocks";
import { Roadmap } from "@/components/sections/produkt/roadmap";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata("/produkt");

/**
 * Produktseite.
 *
 * Reine Komposition. <FinalCta /> ist dieselbe Komponente wie auf der
 * Startseite – Text und CTA-Farbe bleiben damit automatisch synchron.
 */
export default function ProduktPage() {
  return (
    <>
      <ProductIntro />
      <PrincipleBand />
      <FunctionBlocks />
      <Roadmap />
      <FinalCta />
    </>
  );
}
