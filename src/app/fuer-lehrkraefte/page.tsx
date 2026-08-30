import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";
import { ProductIntro } from "@/components/sections/produkt/product-intro";
import { LearnsWithYou } from "@/components/sections/produkt/learns-with-you";
import { PrincipleBand } from "@/components/sections/produkt/principle-band";
import { FunctionBlocks } from "@/components/sections/produkt/function-blocks";
import { EverydayExtras } from "@/components/sections/produkt/everyday-extras";
import { Roadmap } from "@/components/sections/produkt/roadmap";
import { CoCreateBand } from "@/components/sections/produkt/co-create-band";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata("/fuer-lehrkraefte");

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
      <LearnsWithYou />
      <PrincipleBand />
      <FunctionBlocks />
      <EverydayExtras />
      <Roadmap />
      <CoCreateBand />
      <FinalCta />
    </>
  );
}
