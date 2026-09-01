/**
 * Die Sprache dieses Deployments.
 *
 * ==========================================================================
 * SPRACHE IST EINE BAU-ENTSCHEIDUNG, KEINE LAUFZEIT-ENTSCHEIDUNG
 * ==========================================================================
 * Ein Repository, zwei Vercel-Projekte, zwei Domains. selyvi.de baut mit
 * SITE_LOCALE=de, selyvi.com mit SITE_LOCALE=en. Beide Deployments enthalten
 * genau eine Sprache – es gibt keinen Umschalter, keine Aushandlung über
 * Accept-Language und kein /en-Präfix in den Adressen.
 *
 * Das ist der Grund, warum hier kein i18n-Paket steht. Ein solches Paket löst
 * Probleme, die wir nicht haben: Sprachwechsel zur Laufzeit, Pluralformen aus
 * Nutzerdaten, verzögertes Nachladen von Katalogen. Was wir brauchen, ist ein
 * Objekt und ein Typ.
 *
 * ==========================================================================
 * WARUM DER WERT ÜBER next.config.ts LÄUFT
 * ==========================================================================
 * `process.env.SITE_LOCALE` steht im Server-Code zur Verfügung, im
 * Browser-Bündel aber NICHT – Next.js setzt dort nur `NEXT_PUBLIC_`-Variablen
 * ein. Die Szenen und der Einblick sind Client-Komponenten und brauchen ihre
 * Texte trotzdem.
 *
 * Der `env`-Block in next.config.ts setzt den Wert deshalb zur Bauzeit in
 * BEIDE Bündel ein. Das ist der dokumentierte Weg für Bau-Konstanten ohne
 * `NEXT_PUBLIC_`-Präfix.
 *
 * KEIN WIDERSPRUCH ZUR SICHERHEITSREGEL: CLAUDE.md verbietet `NEXT_PUBLIC_`
 * für GEHEIMNISSE. Die Sprache ist kein Geheimnis – sie steht in jedem
 * ausgelieferten Satz. Der Brevo-Schlüssel und der CRM-Schlüssel bleiben
 * unverändert serverseitig.
 */

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

function readLocale(): Locale {
  const raw = process.env.SITE_LOCALE;
  return raw === "en" ? "en" : "de";
}

/** Die Sprache dieses Builds. Default „de" – ein Tippfehler baut Deutsch. */
export const LOCALE: Locale = readLocale();

/**
 * Die beiden Domains.
 *
 * Sie stehen hier als Paar und nicht je Deployment einzeln, weil JEDE Seite
 * einen hreflang-Verweis auf ihre Schwester braucht: Die deutsche Seite muss
 * die englische Adresse kennen und umgekehrt. Ein Deployment, das nur seine
 * eigene Adresse kennt, kann diesen Verweis nicht setzen.
 *
 * SITE_URL überschreibt die eigene Adresse – für Vorschau-Deployments, deren
 * Adresse Vercel erst beim Bauen vergibt.
 */
export const SITE_URLS: Record<Locale, string> = {
  de: "https://selyvi.de",
  en: "https://selyvi.com",
};

export const SITE_URL = process.env.SITE_URL || SITE_URLS[LOCALE];

/** Die Adresse der jeweils anderen Sprache – Basis für hreflang. */
export const ALTERNATE_URL = SITE_URLS[LOCALE === "de" ? "en" : "de"];
export const ALTERNATE_LOCALE: Locale = LOCALE === "de" ? "en" : "de";

/** `<html lang>`. */
export const HTML_LANG: Record<Locale, string> = {
  de: "de",
  en: "en",
};

/** `og:locale`. */
export const OG_LOCALE: Record<Locale, string> = {
  de: "de_DE",
  en: "en",
};
