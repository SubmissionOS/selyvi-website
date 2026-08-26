import { HomeJsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { AudienceSwitch } from "@/components/sections/audience-switch";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FromPractice } from "@/components/sections/from-practice";
import { Features } from "@/components/sections/features";
import { ValueForAll } from "@/components/sections/value-for-all";
import { Privacy } from "@/components/sections/privacy";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Startseite.
 *
 * Reine Komposition – jede Sektion liegt als eigene Komponente unter
 * src/components/sections/. Die H1 traegt ausschliesslich der Hero, alle
 * weiteren Sektionen beginnen mit einer H2.
 *
 * <Testimonials /> steht bewusst in der Reihenfolge, rendert aber `null`,
 * solange das Flag SHOW_TESTIMONIALS aus ist. So bleibt die Position der
 * Sektion sichtbar, ohne dass Platzhalter-Zitate entstehen.
 */
export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <TrustBar />
      <AudienceSwitch />
      <ProblemSolution />
      <HowItWorks />
      <FromPractice />
      <Features />
      <ValueForAll />
      <Privacy />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
