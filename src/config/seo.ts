import { LOCALE, OG_LOCALE, SITE_URL, SITE_URLS } from "@/config/locale";
import { t } from "@/content";
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
/**
 * Die Adresse dieses Deployments. Kommt aus der Sprachschicht: selyvi.de baut
 * mit SITE_LOCALE=de, selyvi.com mit SITE_LOCALE=en – und jedes Deployment
 * kennt dank locale.ts auch die Adresse der jeweils anderen Sprache, weil
 * hreflang sie braucht.
 */
export { SITE_URL, ALTERNATE_URL, ALTERNATE_LOCALE } from "@/config/locale";

export const SITE_LOCALE = OG_LOCALE[LOCALE];

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
export const HOME_TITLE = t.meta.homeTitle;

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

/**
 * Reihenfolge, Prioritaet und Freigabeschalter stehen HIER – Titel und
 * Beschreibung in der Sprachschicht. Eine neue Route ist eine
 * Struktur-Entscheidung und gilt fuer beide Sprachen; ihr Wortlaut nicht.
 *
 * Die frueheren Kommentare zu einzelnen Beschreibungen (etwa: die Startseite
 * beginnt wortgleich mit der H1, „Selyvi kennenlernen – Selyvi" nennt den
 * Namen zweimal) stehen jetzt bei den Texten selbst, in src/content/de.ts.
 */
export const routes: RouteMeta[] = [
  {
    path: "/",
    title: t.meta.routes["/"].title,
    description: t.meta.routes["/"].description,
    priority: 1,
  },
  {
    path: "/fuer-lehrkraefte",
    title: t.meta.routes["/fuer-lehrkraefte"].title,
    description: t.meta.routes["/fuer-lehrkraefte"].description,
    priority: 0.9,
  },
  {
    path: "/schulen",
    title: t.meta.routes["/schulen"].title,
    description: t.meta.routes["/schulen"].description,
    priority: 0.9,
  },
  {
    path: "/forschung",
    title: t.meta.routes["/forschung"].title,
    description: t.meta.routes["/forschung"].description,
    priority: 0.7,
  },
  {
    path: "/datenschutz-sicherheit",
    title: t.meta.routes["/datenschutz-sicherheit"].title,
    description: t.meta.routes["/datenschutz-sicherheit"].description,
    priority: 0.8,
  },
  {
    path: "/ueber-uns",
    title: t.meta.routes["/ueber-uns"].title,
    description: t.meta.routes["/ueber-uns"].description,
    priority: 0.6,
  },
  {
    path: "/einblick",
    title: t.meta.routes["/einblick"].title,
    description: t.meta.routes["/einblick"].description,
    priority: 0.8,
  },
  {
    path: "/mitgestalten",
    title: t.meta.routes["/mitgestalten"].title,
    description: t.meta.routes["/mitgestalten"].description,
    priority: 0.7,
  },
  {
    path: "/demo",
    title: t.meta.routes["/demo"].title,
    description: t.meta.routes["/demo"].description,
    priority: 0.9,
  },
  {
    path: "/impressum",
    title: t.meta.routes["/impressum"].title,
    description: t.meta.routes["/impressum"].description,
    legalGate: "imprint",
    priority: 0.3,
  },
  {
    path: "/datenschutz",
    title: t.meta.routes["/datenschutz"].title,
    description: t.meta.routes["/datenschutz"].description,
    legalGate: "privacy",
    priority: 0.3,
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
    /**
     * Canonical UND hreflang.
     *
     * Jede Seite existiert zweimal – einmal je Domain, unter demselben Pfad.
     * Ohne hreflang halten Suchmaschinen die beiden fuer konkurrierende
     * Fassungen derselben Seite; mit hreflang sind sie zwei Sprachen einer
     * Sache. „x-default" zeigt auf die deutsche Fassung: Das Produkt ist fuer
     * deutsche Schulen gebaut, und wer keine Sprachpraeferenz mitbringt,
     * gehoert dorthin.
     */
    alternates: {
      canonical: absoluteUrl(route.path),
      languages: {
        de: new URL(route.path, SITE_URLS.de).toString(),
        en: new URL(route.path, SITE_URLS.en).toString(),
        "x-default": new URL(route.path, SITE_URLS.de).toString(),
      },
    },
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
