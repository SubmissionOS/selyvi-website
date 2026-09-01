import { imprint } from "@/config/legal";
import { t } from "@/content";

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
  { label: t.nav.items["/fuer-lehrkraefte"], href: "/fuer-lehrkraefte" },
  { label: t.nav.items["/schulen"], href: "/schulen" },
  { label: t.nav.items["/forschung"], href: "/forschung" },
  { label: t.nav.items["/datenschutz-sicherheit"], href: "/datenschutz-sicherheit" },
  { label: t.nav.items["/ueber-uns"], href: "/ueber-uns" },
];

/** Primaerer Call-to-Action – die einzige Stelle, an der --cta zum Einsatz kommt. */
export const primaryCta: NavItem = {
  /**
   * „Selyvi kennenlernen" statt „Demo buchen".
   *
   * Auf /demo wird nichts gebucht – es wird ein Erstgespraech angefragt, auf
   * das wir uns melden. „Buchen" versprach einen Kalender, den es nicht gibt,
   * und setzte die Huerde hoeher als noetig: Wer nur schauen will, bucht
   * nichts. „Kennenlernen" liegt zwischen locker und foermlich und beschreibt,
   * was tatsaechlich passiert.
   *
   * Der Knopf bleibt an allen bisherigen Stellen stehen – die staendige
   * Erreichbarkeit oben rechts ist Absicht, nicht Zufall.
   */
  label: t.nav.primaryCta,
  href: "/demo",
};

export type FooterColumn = {
  title: string;
  items: NavItem[];
};

/** Vier Footer-Spalten mit Platzhalter-Links. */
export const footerColumns: FooterColumn[] = [
  {
    title: t.nav.footer.product,
    items: [
      { label: t.nav.footer.links["/einblick"], href: "/einblick" },
      { label: t.nav.footer.links["/fuer-lehrkraefte"], href: "/fuer-lehrkraefte" },
      { label: t.nav.footer.links["/schulen"], href: "/schulen" },
      { label: t.nav.footer.links["/forschung"], href: "/forschung" },
      {
        label: t.nav.footer.links["/datenschutz-sicherheit"],
        href: "/datenschutz-sicherheit",
      },
      { label: t.nav.footer.links["/demo"], href: "/demo" },
    ],
  },
  {
    title: t.nav.footer.company,
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
      { label: t.nav.footer.links["/ueber-uns"], href: "/ueber-uns" },
      { label: t.nav.footer.links["/mitgestalten"], href: "/mitgestalten" },
      // Als gewöhnlicher Link, nicht als Button: Der primäre CTA steht bereits
      // in der Kopfzeile, und --cta bleibt genau ihm vorbehalten.
      { label: t.nav.footer.links["/demo"], href: "/demo" },
    ],
  },
  {
    title: t.nav.footer.legal,
    items: [
      { label: t.nav.footer.links["/impressum"], href: "/impressum" },
      { label: t.nav.footer.links["/datenschutz"], href: "/datenschutz" },
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
      { label: t.nav.footer.links["/demo"], href: "/demo" },
    ],
  },
];

/** Social-Profile in der Fusszeile. */
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" as const },
];
