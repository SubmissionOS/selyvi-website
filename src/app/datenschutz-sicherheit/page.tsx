import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";
import { SecurityIntro } from "@/components/sections/sicherheit/security-intro";
import { PrinciplesGrid } from "@/components/sections/sicherheit/principles-grid";
import { SubprocessorsTable } from "@/components/sections/sicherheit/subprocessors-table";
import { DpaBand } from "@/components/sections/dpa-band";
import { ForDpos } from "@/components/sections/sicherheit/for-dpos";
import { SecurityFaq } from "@/components/sections/sicherheit/security-faq";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata("/datenschutz-sicherheit");

/**
 * Seite für Schulleitungen und Datenschutzbeauftragte.
 *
 * DIESE SEITE DARF NICHT MIT OFFENEN [PRÜFEN]-MARKERN LIVE GEHEN.
 * Jeder Marker hier ist ein Launch-Blocker; die Liste steht im README unter
 * „LAUNCH-BLOCKER“. Vor dem Livegang pruefen:
 *
 *   grep -rn "ReviewMarker\|review:" src/components/sections/sicherheit/
 *
 * <DpaBand /> ist dieselbe Komponente wie auf /schulen – die AVV-Aussage
 * bleibt dadurch auf beiden Seiten zwingend wortgleich.
 */
export default function DatenschutzSicherheitPage() {
  return (
    <>
      <SecurityIntro />
      <PrinciplesGrid />
      <SubprocessorsTable />
      <DpaBand />
      <ForDpos />
      <SecurityFaq />
      <FinalCta />
    </>
  );
}
