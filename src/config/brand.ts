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
 *
 * KEIN SCHULARTEN-ZUSATZ: Dieser Satz endete einmal auf „von der Grundschule
 * bis zum Abitur". Er ist ohne den Zusatz geblieben, und das bleibt richtig –
 * jetzt aus dem umgekehrten Grund: Seit dem 02.09.2026 ist Selyvi fuer alle
 * Schularten gebaut, und die Aufzaehlung waere eine Einschraenkung, wo keine
 * mehr ist. Wer sie erzaehlt haben will, findet sie im Fliesstext auf
 * /ueber-uns – dort als Entstehung.
 */
export const PRACTICE_CLAIM =
  "Entwickelt in Zusammenarbeit mit Lehrkräften aus ganz Deutschland.";

/**
 * Kurzform fuer die Trust-Zeile, wo nur eine Zeile Platz ist.
 *
 * Bewusst hier und nicht dort formuliert: So bleibt die BW-Aussage auch in der
 * gekuerzten Fassung an eine Datei gebunden. Wer PRACTICE_CLAIM anpasst, sieht
 * die Kurzform direkt daneben und vergisst sie nicht.
 */
export const PRACTICE_CLAIM_SHORT = "Mit Lehrkräften aus ganz Deutschland entwickelt";

/**
 * Antwort auf die Schulform-Frage – EINE Formulierung für die ganze Website.
 *
 * Sie steht in der FAQ der Startseite und auf /fuer-lehrkraefte. Dieselbe
 * Bauweise wie PRACTICE_CLAIM und <DpaBand />: Die Frage „für welche
 * Schulform?" ist die erste, die eine Lehrkraft stellt, und zwei leicht
 * verschiedene Antworten darauf wären genau die Art Widerspruch, die im
 * Erstgespräch auffällt.
 *
 * ==========================================================================
 * AKTUALISIERT 02.09.2026 – ALLE SCHULARTEN
 * ==========================================================================
 * Der Satz nannte bis dahin „die Grundschule, Klassen 1 bis 4" und endete auf
 * „Weitere Schulformen folgen." Beides ist weg, und zwar aus demselben Grund:
 * Es folgt nichts mehr – es ist da. Der Produktstand fuehrt die Zielgruppe
 * seit dem 02.09.2026 als „alle Schularten und Schulformen, Klasse 1 bis
 * Abitur" (siehe den Kopf von docs/produktstand-2026-08.md, dort mit dem
 * Vermerk, dass die Ursprungsfassung Grundschule 1–4 nannte).
 *
 * Damit entfaellt auch die letzte Ausnahme von Regel D auf dieser Seite,
 * die nicht der Serverstandort ist: „Weitere Schulformen folgen." war eine
 * Ankuendigung. Ohne sie steht der Satz vollstaendig im Praesens.
 *
 * ZWEITER TEIL, ANDERER GELTUNGSBEREICH: „Wir orientieren uns an den
 * Bildungs- und Rahmenplaenen der Laender" sagt, WONACH gebaut ist – nicht,
 * dass etwas angebunden waere. Die Wortlaut-Sperre gilt unveraendert und
 * strenger denn je: NIEMALS „greift auf … zu", „nutzt", „liest aus". Die
 * Lehrplaene aller 16 Bundeslaender liegen erhoben vor, sind aus
 * Lizenzgruenden aber BEWUSST NICHT ANGEBUNDEN. „Orientiert sich an" ist das
 * staerkste zulaessige Verb – siehe auch hero.tsx und teaching-quality.tsx.
 */
export const SCHOOL_TYPE_ANSWER =
  "Selyvi ist für alle Schularten und Schulformen gebaut – von Klasse 1 bis zum Abitur. Wir orientieren uns an den Bildungs- und Rahmenplänen der Länder.";

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
