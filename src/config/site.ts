import { imprint } from "@/config/legal";

/**
 * Navigations- und Footer-Struktur.
 *
 * Kontaktangaben kommen aus src/config/legal.ts, damit Footer, Impressum und
 * Datenschutzerklaerung nicht auseinanderlaufen.
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Hauptnavigation im Header (Desktop und Burger-Menue nutzen dieselbe Liste). */
export const mainNav: NavItem[] = [
  { label: "Für Lehrkräfte", href: "/fuer-lehrkraefte" },
  { label: "Für Schulleitungen", href: "/schulen" },
  { label: "Forschung", href: "/forschung" },
  { label: "Sicherheit", href: "/datenschutz-sicherheit" },
  { label: "Unsere Geschichte", href: "/ueber-uns" },
];

/** Primaerer Call-to-Action – die einzige Stelle, an der --cta zum Einsatz kommt. */
export const primaryCta: NavItem = {
  label: "Demo buchen",
  href: "/demo",
};

export type FooterColumn = {
  title: string;
  items: NavItem[];
};

/** Vier Footer-Spalten mit Platzhalter-Links. */
export const footerColumns: FooterColumn[] = [
  {
    title: "Selyvi",
    items: [
      { label: "Für Lehrkräfte", href: "/fuer-lehrkraefte" },
      { label: "Für Schulleitungen", href: "/schulen" },
      { label: "Forschung & Wirkung", href: "/forschung" },
      { label: "Datenschutz & Sicherheit", href: "/datenschutz-sicherheit" },
      { label: "Demo buchen", href: "/demo" },
    ],
  },
  {
    title: "Unternehmen",
    /**
     * „Karriere", „Presse" und „Blog" standen hier als Platzhalter und zeigten
     * alle auf /ueber-uns. Ein Link, der etwas anderes verspricht als das Ziel
     * liefert, kostet mehr Vertrauen, als eine kurze Spalte kostet – deshalb
     * ersatzlos entfernt.
     *
     * Sie kommen zurück, sobald die Seiten wirklich existieren: dann je einen
     * Eintrag mit eigener Route ergänzen.
     */
    items: [
      { label: "Unsere Geschichte", href: "/ueber-uns" },
      { label: "Mitgestalten", href: "/mitgestalten" },
      // Als gewöhnlicher Link, nicht als Button: Der primäre CTA steht bereits
      // in der Kopfzeile, und --cta bleibt genau ihm vorbehalten.
      { label: "Demo buchen", href: "/demo" },
    ],
  },
  {
    title: "Rechtliches",
    items: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutzerklärung", href: "/datenschutz" },
      // "AGB" und "Barrierefreiheit" standen hier als Platzhalter und zeigten
      // beide auf /impressum. Ein Link, der etwas anderes verspricht als das
      // Ziel liefert, ist auf einer Seite mit Rechtsbezug besonders unguenstig
      // – deshalb entfernt, bis die Seiten existieren. Siehe README,
      // "Rechtliches – Launch-Blocker".
    ],
  },
  {
    title: "Kontakt",
    /**
     * Bewusst reduziert: nur die E-Mail-Adresse, kein Telefon, keine Anschrift.
     *
     * Die vollständigen Angaben stehen im Impressum – dort gehören sie hin, und
     * dorthin führt der Link in der Spalte „Rechtliches". Eine private
     * Mobilnummer auf jeder einzelnen Seite auszugeben, ist etwas anderes als
     * sie im Impressum bereitzuhalten.
     *
     * Die Adresse kommt aus src/config/legal.ts – eine Quelle mit Impressum und
     * Datenschutzerklärung. Sonst stehen auf derselben Website zwei
     * verschiedene Kontaktadressen.
     */
    items: [
      { label: imprint.email, href: `mailto:${imprint.email}` },
      { label: "Demo buchen", href: "/demo" },
    ],
  },
];

/** Social-Profile in der Fusszeile. */
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" as const },
];
