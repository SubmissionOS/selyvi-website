import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";
import { SchoolIntro } from "@/components/sections/schulen/school-intro";
import { OrganisationBenefits } from "@/components/sections/schulen/organisation-benefits";
import { ReliefReport } from "@/components/sections/schulen/relief-report";
import { RolloutTimeline } from "@/components/sections/schulen/rollout-timeline";
import { RolesSplit } from "@/components/sections/schulen/roles-split";
import { DpaBand } from "@/components/sections/dpa-band";
import { LeadershipFaq } from "@/components/sections/schulen/leadership-faq";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = pageMetadata("/schulen");

/**
 * Seite für Schulleitung und Schulträger.
 *
 * Reine Komposition. <FinalCta /> ist unveraendert dieselbe Komponente wie auf
 * Startseite und /produkt.
 */
export default function SchulenPage() {
  return (
    <>
      <SchoolIntro />
      <OrganisationBenefits />
      <ReliefReport />
      <RolloutTimeline />
      <RolesSplit />
      <DpaBand />
      <LeadershipFaq />
      <FinalCta />
    </>
  );
}
