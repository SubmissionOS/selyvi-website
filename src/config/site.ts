/**
 * Navigations- und Footer-Struktur.
 * Alle Ziele sind bereits als Routen angelegt (leere Seiten mit H1-Platzhalter).
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Hauptnavigation im Header (Desktop und Burger-Menue nutzen dieselbe Liste). */
export const mainNav: NavItem[] = [
  { label: "Produkt", href: "/produkt" },
  { label: "Für Schulen", href: "/schulen" },
  { label: "Sicherheit", href: "/datenschutz-sicherheit" },
  { label: "Über uns", href: "/ueber-uns" },
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
    title: "Produkt",
    items: [
      { label: "Überblick", href: "/produkt" },
      { label: "Für Schulen", href: "/schulen" },
      { label: "Datenschutz & Sicherheit", href: "/datenschutz-sicherheit" },
      { label: "Demo buchen", href: "/demo" },
    ],
  },
  {
    title: "Unternehmen",
    items: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Karriere", href: "/ueber-uns" },
      { label: "Presse", href: "/ueber-uns" },
      { label: "Blog", href: "/ueber-uns" },
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
    items: [
      { label: "kontakt@example.de", href: "mailto:kontakt@example.de" },
      { label: "+49 000 000000", href: "tel:+4900000000" },
      { label: "Support", href: "/demo" },
      { label: "Musterstraße 1, 10000 Musterstadt", href: "/impressum" },
    ],
  },
];

/** Social-Profile in der Fusszeile. */
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" as const },
];
