import { LOCALE } from "@/config/locale";
import { de, type Content } from "@/content/de";
import { en } from "@/content/en";

/**
 * Der Zugriff auf die Texte dieses Builds.
 *
 * ==========================================================================
 * EINE ZEILE, KEIN FRAMEWORK
 * ==========================================================================
 * `t.home.hero.headline` – mehr braucht es nicht. Kein Provider, kein Hook,
 * kein Kontext, keine Ladezustände. Das funktioniert, weil die Sprache eine
 * BAU-Entscheidung ist: Zur Laufzeit steht sie fest, und der Bundler kennt
 * sie ebenfalls.
 *
 * ==========================================================================
 * WARUM DER UNGENUTZTE ZWEIG NICHT IM BÜNDEL LANDET
 * ==========================================================================
 * `LOCALE` ist zur Bauzeit ein Literal ("de" oder "en", eingesetzt über den
 * `env`-Block in next.config.ts). Der Ausdruck unten wird damit zu
 * `"de" === "en" ? en : de` – eine Konstante, die jeder Minifier auflöst.
 * Danach ist `en` unreferenziert und fällt beim Tree-Shaking heraus.
 *
 * Das ist gemessen, nicht gehofft: Der englische Text darf im deutschen
 * Bündel nicht auftauchen, sonst tragen alle Besucherinnen die doppelte
 * Textmenge mit. Prüfen mit
 *
 *   grep -rl "Paperwork just got" .next/static
 *
 * Keine Ausgabe = der englische Katalog ist nicht im deutschen Build.
 */
export const t: Content = LOCALE === "en" ? en : de;

export { LOCALE };
export type { Content };
