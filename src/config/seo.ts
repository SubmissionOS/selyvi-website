import type { Metadata } from "next";

import { PRODUCT_NAME } from "@/config/brand";
import { IMPRINT_READY, PRIVACY_APPROVED } from "@/config/legal";

/**
 * Zentrale SEO-Konfiguration.
 *
 * Eine Quelle für Titel, Beschreibungen, Canonical-URLs, Open Graph und
 * Sitemap. Seiten holen ihre Metadaten hier ab, statt sie selbst zu
 * formulieren – so koennen Seitentitel und Sitemap nicht auseinanderlaufen.
 */

/**
 * Basis-URL der Website.
 *
 * [PRÜFEN: finale Domain nach Kauf]
 *
 * `.example` ist nach RFC 2606 dauerhaft fuer Dokumentation reserviert und
 * loest nirgends auf. Bewusst so gewaehlt: Ein Platzhalter, der versehentlich
 * live geht, zeigt damit ins Leere statt auf eine fremde Website.
 *
 * Der Platzhalter traegt den Produktnamen, damit er nicht veraltet wirkt – er
 * bleibt aber ein Platzhalter, bis der Domainkauf bestaetigt ist.
 *
 * Nach dem Domainkauf hier eintragen – siehe README, „Nach Domainkauf“.
 */
export const SITE_URL = "https://selyvi.example";

export const SITE_LOCALE = "de_DE";

/**
 * Absolute URL zu einem Pfad.
 *
 * Canonical, og:url und Sitemap gehen alle hierdurch. Sonst entstehen
 * Abweichungen, die niemand bemerkt – etwa die Startseite einmal mit und
 * einmal ohne abschliessenden Schrägstrich.
 */
export function absoluteUrl(path: string): string {
  const url = new URL(path, SITE_URL).toString();

  // Next.js gibt Canonical-URLs ohne abschliessenden Schrägstrich aus und
  // normalisiert dabei auch die Startseite. Damit Canonical, og:url und
  // Sitemap zeichengleich sind, wird hier genauso normalisiert – sonst nennt
  // die Sitemap "…example/" und das Canonical "…example".
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Vorschaubild für alle Seiten (src/app/opengraph-image.tsx).
 *
 * Wird bewusst EXPLIZIT gesetzt und nicht der Vererbung überlassen: Sobald
 * eine Seite ein eigenes `openGraph`-Objekt exportiert, ersetzt das die
 * Zuweisung aus dem Layout – samt des automatisch eingehängten Bildes. Ohne
 * diesen Eintrag hätten alle Unterseiten kein og:image.
 */
export const OG_IMAGE = {
  // Das ?v= dient dem Cache-Busting: Soziale Netzwerke merken sich
  // Vorschaubilder lange. Nach einem Austausch des Motivs die Zahl erhoehen,
  // dann holen die Plattformen es neu. Die Startseite traegt zusaetzlich Next
  // eigenen Hash, weil dort die Dateikonvention direkt greift.
  // v=3 seit der Neuausrichtung auf die Grundschule: Der Untertitel im Motiv
  // hat sich geaendert, und soziale Netzwerke wuerden sonst das alte Bild
  // weiterzeigen.
  url: "/opengraph-image?v=3",
  width: 1200,
  height: 630,
  alt: `${PRODUCT_NAME} – Die KI-Assistenz für Grundschullehrkräfte`,
};

/** Titel der Startseite. Alle anderen Seiten: "Seitentitel – <Produktname>". */
export const HOME_TITLE = `${PRODUCT_NAME} – Die KI-Assistenz für Grundschullehrkräfte`;

export type RouteMeta = {
  path: string;
  /** Ohne Namenszusatz. Leer bei der Startseite, die HOME_TITLE traegt. */
  title: string;
  /**
   * Ein bis zwei Saetze, abgeleitet aus den Intro-Texten der jeweiligen Seite.
   * Bewusst nichts Neues: Was in der Suchergebnisliste steht, muss die Seite
   * auch einloesen.
   */
  description: string;
  /**
   * Rechtsseite mit eigenem Freigabeschalter.
   * "imprint"  -> IMPRINT_READY
   * "privacy"  -> PRIVACY_APPROVED
   * Nicht freigegeben bedeutet: noindex und kein Sitemap-Eintrag.
   */
  legalGate?: "imprint" | "privacy";
  priority: number;
};

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: "",
    // Beginnt wortgleich mit der H1: Wer den Teilen-Vorschau-Text liest und
    // danach die Seite oeffnet, findet denselben Satz wieder.
    description: `Der Papierkram hat jetzt eine Assistenz. ${PRODUCT_NAME} ist die mitlernende KI-Assistenz für Grundschullehrkräfte – aus Beobachtungen im Unterricht entstehen Zeugnisbemerkungen, Elternmails und passendes Material. In Ihrer Sprache, nicht in KI-Sprache.`,
    priority: 1,
  },
  {
    path: "/fuer-lehrkraefte",
    title: "Für Lehrkräfte",
    description:
      "Vier Bereiche: Dokumentation, Kommunikation, Unterricht und Steuerung. Was Sie nebenbei im Unterricht erfassen, wird am Zeugnistag zur Grundlage des Textes – und bestimmt, welches Material zur Klasse passt.",
    priority: 0.9,
  },
  {
    path: "/schulen",
    title: "Für Schulleitungen",
    description: `${PRODUCT_NAME} nimmt Ihrem Kollegium die Schreibarbeit am Zeugnistag und an den Elternabenden ab. Der Entlastungsbericht weist eingesparte Stunden je Monat aus – als PDF für Ihren Schulträger.`,
    priority: 0.9,
  },
  {
    path: "/forschung",
    title: "Forschung & Wirkung",
    description:
      "Wirkung wollen wir belegen, nicht behaupten: Erhebungsmodell entlang der PHINEO-Wirkungstreppe, drei Befragungswellen, zweckgranulare Einwilligung. Wir suchen Forschungspartner, die genauer hinschauen wollen.",
    priority: 0.7,
  },
  {
    path: "/datenschutz-sicherheit",
    title: "Datenschutz & Sicherheit",
    description:
      "Strikte Datentrennung im Kollegium, kein Eltern- oder Schülerportal, keine Weitergabe von Schülerdaten. Grundsätze, Auftragsverarbeitung und offene Punkte im Überblick.",
    priority: 0.8,
  },
  {
    path: "/ueber-uns",
    title: "Unsere Geschichte",
    description: `Angefangen am Küchentisch einer angehenden Grundschullehrerin: Hinter ${PRODUCT_NAME} steht ein Team aus Produkt, Technik und Bildungspraxis. Wir wollen Lehrkräften Verwaltungsarbeit abnehmen – nicht die Verantwortung.`,
    priority: 0.6,
  },
  {
    path: "/einblick",
    title: "Einblick",
    description:
      "Ein geführter Einblick mit Beispieldaten: eine Beobachtung festhalten, daraus einen Zeugnistext entstehen lassen, den Sitzplan umstellen. Vier von acht Bereichen sind offen.",
    priority: 0.8,
  },
  {
    path: "/mitgestalten",
    // Nicht „Selyvi mitgestalten": fullTitle() haengt den Produktnamen an,
    // und „Selyvi mitgestalten – Selyvi" nennt ihn zweimal.
    title: "Mitgestalten",
    description:
      "Selyvi ist mit Lehrkräften entstanden und wächst nur so weiter. Wer früh dabei ist, prägt, was gebaut wird – ohne Vertrag, ohne Kaufdruck.",
    priority: 0.7,
  },
  {
    path: "/demo",
    // Nicht „Selyvi kennenlernen": fullTitle() haengt den Produktnamen an,
    // und „Selyvi kennenlernen – Selyvi" nennt ihn zweimal.
    title: "Kennenlernen",
    description:
      "In 20 Minuten zeigen wir Ihnen die echte Oberfläche – kein Video, keine Folien. Ihre Fragen kommen zuerst.",
    priority: 0.9,
  },
  {
    path: "/impressum",
    title: "Impressum",
    description: `Angaben gemäß § 5 DDG zu ${PRODUCT_NAME}.`,
    legalGate: "imprint",
    priority: 0.1,
  },
  {
    path: "/datenschutz",
    title: "Datenschutzerklärung",
    description: `Datenschutzerklärung zu ${PRODUCT_NAME} nach Art. 13 DSGVO.`,
    legalGate: "privacy",
    priority: 0.1,
  },
];

export function routeFor(path: string): RouteMeta {
  const route = routes.find((entry) => entry.path === path);
  if (!route) {
    // Faellt beim Build auf, nicht erst im Betrieb.
    throw new Error(`Keine SEO-Konfiguration für die Route "${path}" hinterlegt.`);
  }
  return route;
}

/** Vollstaendiger Seitentitel inklusive Namenszusatz. */
export function fullTitle(route: RouteMeta): string {
  return route.path === "/" ? HOME_TITLE : `${route.title} – ${PRODUCT_NAME}`;
}

/**
 * Ist eine Route indexierbar?
 *
 * Rechtsseiten haengen an ihrem eigenen Schalter. Genau diese Funktion steuert
 * sowohl das noindex im HTML als auch den Sitemap-Eintrag – beide koennen
 * dadurch nicht auseinanderlaufen.
 */
export function isIndexable(route: RouteMeta): boolean {
  if (route.legalGate === "imprint") return IMPRINT_READY;
  if (route.legalGate === "privacy") return PRIVACY_APPROVED;
  return true;
}

/** Routen, die in die Sitemap gehoeren. */
export function indexableRoutes(): RouteMeta[] {
  return routes.filter(isIndexable);
}

/**
 * Metadaten für eine Seite.
 *
 * Setzt Titel, Beschreibung, Canonical und Open Graph aus einer Quelle.
 * Rechtsseiten bekommen automatisch noindex, solange ihr Freigabeschalter
 * false ist. isIndexable() steuert noindex und Sitemap gemeinsam.
 */
export function pageMetadata(path: string): Metadata {
  const route = routeFor(path);
  const title = fullTitle(route);
  const noindex = !isIndexable(route);

  return {
    // absolute: umgeht die Titel-Vorlage aus dem Root-Layout, damit der
    // Namenszusatz nicht doppelt erscheint.
    title: { absolute: title },
    description: route.description,
    alternates: { canonical: absoluteUrl(route.path) },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: PRODUCT_NAME,
      url: absoluteUrl(route.path),
      title,
      description: route.description,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: "noindex" } : {}),
  };
}
