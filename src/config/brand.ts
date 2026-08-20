/**
 * Zentrale Marken-Konfiguration.
 *
 * Der Produktname wird an genau EINER Stelle gepflegt (hier) und von
 * <Wordmark /> sowie den Metadaten gelesen.
 */

/**
 * Produktname.
 *
 * Wird an JEDER Stelle verwendet, an der der Name auftaucht: Wortmarke,
 * Seitentitel und Metadaten, Fliesstext in den Sektionen, FAQ. Der finale Name
 * Eine Namensaenderung ist damit eine Aenderung in dieser einen Zeile –
 * nirgends im Projekt steht der Name als Literal.
 */
export const PRODUCT_NAME = "Selyvi";

/**
 * Kanonische Praxis-Aussage.
 *
 * DIESE FORMULIERUNG STEHT NUR HIER. Sie erscheint auf der Startseite, auf
 * /produkt, /schulen und /ueber-uns – ueberall aus dieser Konstante, nach dem
 * Muster von <DpaBand />. Eine Kopie waere genau die Stelle, an der eine Schule
 * spaeter zwei leicht verschiedene Versionen derselben Aussage findet.
 *
 * Sie ist eine Tatsachenbehauptung ueber die Entstehung des Produkts. Wer sie
 * aendert, aendert sie fuer die ganze Website.
 *
 * EINE AUSNAHME: Der Erzaehltext in
 * src/components/sections/ueber-uns/why-it-exists.tsx enthaelt dieselbe Aussage
 * als Nebensatz im Fliesstext. Dort laesst sie sich nicht einsetzen, ohne den
 * Satzbau zu zerstoeren – dieser Absatz muss bei einer Aenderung von Hand
 * nachgezogen werden.
 */
export const PRACTICE_CLAIM =
  "Entwickelt in Zusammenarbeit mit Lehrkräften aus ganz Baden-Württemberg – von der Grundschule bis zum Abitur.";

/**
 * Kurzform fuer die Trust-Zeile, wo nur eine Zeile Platz ist.
 *
 * Bewusst hier und nicht dort formuliert: So bleibt die BW-Aussage auch in der
 * gekuerzten Fassung an eine Datei gebunden. Wer PRACTICE_CLAIM anpasst, sieht
 * die Kurzform direkt daneben und vergisst sie nicht.
 */
export const PRACTICE_CLAIM_SHORT =
  "Mit Lehrkräften aus ganz BW entwickelt – Grundschule bis Abitur";

/**
 * Offener Punkt zur Praxis-Aussage.
 *
 * Der sichtbare [PRÜFEN]-Marker wird GENAU EINMAL gerendert, in der Sektion
 * „Aus der Praxis“ auf der Startseite. Grund: Es ist ein einziger offener
 * Punkt, keine fuenf. Wuerde jede Fundstelle einen Marker tragen, zaehlte die
 * Uebersicht im README fuenf offene Punkte, wo es einen gibt – und die
 * Aufloesung erledigt ohnehin alle Fundstellen auf einmal, weil sie sich die
 * Konstante teilen.
 */
export const PRACTICE_CLAIM_REVIEW =
  "Sobald Zahlen freigegeben: durch konkrete Angabe (X Lehrkräfte, Schularten) ersetzen";

/**
 * Offener Punkt zur Nennung der Person, mit der alles angefangen hat.
 *
 * Betrifft zwei Stellen: die Zeile im Hero der Startseite und den [PERSON]-
 * Platzhalter im Abschnitt „Warum es … gibt“ auf /ueber-uns.
 *
 * Es geht um eine reale, nicht oeffentliche Person. Ohne ausdrueckliches
 * Einverstaendnis darf dort weder ein Name noch eine identifizierende
 * Umschreibung stehen. Die Entscheidung, WIE genannt wird, trifft die Person
 * selbst – nicht das Team.
 */
export const PERSON_CONSENT_REVIEW =
  "Einverständnis der genannten Person für jede Erwähnung einholen (Nennung: Name / 'Christians Partnerin' / anonym)";

/**
 * CTA-Farbvariante.
 *
 * "a" = #2c40ff (kontrastierendes Blau-Violett)
 * "b" = #0074bd (markeneigenes Blau, identisch mit brand-600)
 *
 * Diese Konstante ist der einzige Schalter. Sie wird in src/app/layout.tsx als
 * `data-cta`-Attribut auf <html> gesetzt; globals.css bindet daraufhin die
 * passende Farbe an die Variable --cta.
 *
 * Zum Umschalten: den Wert unten auf "b" aendern – sonst nichts.
 */
export type CtaVariant = "a" | "b";

export const CTA_VARIANT: CtaVariant = "a";
