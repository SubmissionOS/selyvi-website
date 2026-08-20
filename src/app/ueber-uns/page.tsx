import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";
import { AboutIntro } from "@/components/sections/ueber-uns/about-intro";
import { WhyItExists } from "@/components/sections/ueber-uns/why-it-exists";
import { Mission } from "@/components/sections/ueber-uns/mission";
import { TeamGrid } from "@/components/sections/ueber-uns/team-grid";
import { HowWeWork } from "@/components/sections/ueber-uns/how-we-work";
import { ContactBand } from "@/components/sections/ueber-uns/contact-band";

export const metadata: Metadata = pageMetadata("/ueber-uns");

/**
 * Über-uns-Seite.
 *
 * Bewusst OHNE <FinalCta />: Das Kontakt-Band uebernimmt hier die Rolle des
 * Abschluss-CTA. Zwei CTA-Sektionen direkt untereinander waeren eine Dopplung.
 *
 * Die Personendaten stehen in src/config/team.ts – dort auch der Hinweis zur
 * erforderlichen Freigabe jeder genannten Person.
 */
export default function UeberUnsPage() {
  return (
    <>
      <AboutIntro />
      <WhyItExists />
      <Mission />
      <TeamGrid />
      <HowWeWork />
      <ContactBand />
    </>
  );
}
