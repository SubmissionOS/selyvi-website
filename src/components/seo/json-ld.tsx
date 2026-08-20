import { PRODUCT_NAME } from "@/config/brand";
import { SITE_URL, routeFor } from "@/config/seo";

/**
 * Strukturierte Daten für die Startseite (JSON-LD).
 *
 * ENTHALTEN: Organization und SoftwareApplication mit genau den Angaben, die
 * wir belegen können – Name, URL, Kategorie, Plattform.
 *
 * BEWUSST NICHT ENTHALTEN: aggregateRating, review, offers/Preise, Zahl der
 * Nutzenden, Auszeichnungen. Solche Angaben ohne Grundlage sind
 * Schema.org-Spam. Google straft das ab, und bei einer Website, die Schulen
 * Vertrauen abverlangt, wäre es zusätzlich das falsche Signal. Erst eintragen,
 * wenn es echte, nachweisbare Daten gibt – Bewertungen etwa erst, wenn sie
 * auch auf der Seite selbst sichtbar sind.
 *
 * Der Name ist ein Platzhalter (PRODUCT_NAME), die URL ebenfalls
 * ([PRÜFEN: finale Domain nach Kauf], siehe src/config/seo.ts).
 */
const organizationId = `${SITE_URL}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: PRODUCT_NAME,
      url: SITE_URL,
    },
    {
      "@type": "SoftwareApplication",
      name: PRODUCT_NAME,
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description: routeFor("/").description,
      publisher: { "@id": organizationId },
    },
  ],
};

export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Die Daten stammen ausschliesslich aus eigenen Konstanten. Das
      // maskierte "<" verhindert, dass ein spaeter eingefuegter Wert das
      // script-Element vorzeitig schliessen koennte.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
