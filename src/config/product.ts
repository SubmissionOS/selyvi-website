/**
 * Produktaussagen, die an mehreren Stellen wortgleich stehen müssen.
 *
 * ==========================================================================
 * QUELLE: docs/produktstand-2026-08.md – und ausschliesslich die.
 * ==========================================================================
 *
 * Regeln aus dem Dokument, die fuer JEDE Aenderung hier gelten:
 *
 *   1. Nur als „Live" markierte Funktionen duerfen als verfuegbar beschrieben
 *      werden.
 *   2. „Rollout offen", „Teilweise" und „Nicht gebaut" duerfen nicht als
 *      verfuegbar erscheinen.
 *   3. Nichts aus dem Abschnitt „Was du im Gespraech nicht versprechen darfst"
 *      darf auf der Website als Zusage stehen.
 *
 * Wer hier etwas aendert, aendert es fuer die ganze Website – das ist der
 * Zweck der Datei. Gleiche Bauweise wie <DpaBand /> und PRACTICE_CLAIM: Eine
 * Kopie waere genau die Stelle, an der eine Schule spaeter zwei leicht
 * verschiedene Fassungen derselben Zusage findet.
 */

/**
 * Zielgruppe in Kurzform, fuer die Trust-Zeile.
 *
 * Selyvi ist fuer die Grundschule gebaut – Kompetenzen, Faecher und
 * Zeugnistexte sind darauf zugeschnitten. Weiter gefasste Formulierungen
 * ("fuer Lehrkraefte") waren vor dem Abgleich mit dem Produktstand im Umlauf
 * und sind bewusst verschwunden.
 */
export const AUDIENCE_SHORT = "Für Grundschullehrkräfte, Klassen 1–4";

/**
 * Serverstandort und Auftragsverarbeitung – DIE heikelste Aussage der Website.
 *
 * Erscheint auf der Startseite (DSGVO-Block), auf /datenschutz-sicherheit
 * (Prinzipien-Grid und FAQ) und in <DpaBand /> auf /schulen.
 *
 * WARUM SO VORSICHTIG: Gehostet wird das Produkt heute bei Railway und Vercel,
 * nicht in Deutschland. Eine pauschale „Server in der EU"-Zusage fuer das
 * Produkt waere die erste Angabe, die eine Datenschutzbeauftragte prueft – und
 * die erste, die faellt. Das Dokument sagt dazu ausdruecklich: „in
 * Vorbereitung", nicht „erledigt".
 *
 * Davon strikt getrennt: das Hosting DIESER WEBSITE in Frankfurt. Das ist
 * belegt (Region fra1 in vercel.json) und darf so stehen – aber nur als
 * Aussage ueber die Website, nie als Aussage ueber das Produkt.
 */
export const PRODUCT_HOSTING_NOTE =
  "Vor dem Betrieb mit echten Schülerdaten ziehen die Produktserver nach Deutschland um und jeder Schule liegt ein Auftragsverarbeitungsvertrag vor – beides ist in Vorbereitung.";

/** Hosting DIESER WEBSITE. Belegt durch die Serverregion fra1 in vercel.json. */
export const WEBSITE_HOSTING_NOTE =
  "Diese Website wird in Frankfurt am Main gehostet, auf Servern innerhalb der EU.";

/**
 * Datentrennung – eine Positiv-Aussage aus dem echten Produkt.
 *
 * Im internen Dokument steht sie unter „Was du im Gespraech nicht versprechen
 * darfst", weil sie dort als Einschraenkung wirkt: In geteilten Klassen sieht
 * eine Lehrkraft weniger, als sie erwartet, denn eine Klassenlehrer-Rolle mit
 * Gesamtsicht gibt es nicht.
 *
 * Als Datenschutz-Aussage ist derselbe Sachverhalt eine Staerke, und genau so
 * steht er hier. Das ist keine Beschoenigung: Der Satz behauptet nichts, was
 * das Produkt nicht taete – er beschreibt exakt dieselbe Tatsache.
 */
export const DATA_SEPARATION_NOTE =
  "Jede Lehrkraft sieht ausschließlich ihre eigenen Beobachtungen und Bewertungen.";

/**
 * Zielsprachen der Elternmail-Uebersetzung.
 *
 * Die Zahl 9 steht an mehreren Stellen im Fliesstext und kommt ueberall aus
 * `TRANSLATION_LANGUAGES.length` – so kann sie nicht von der Liste abweichen,
 * wenn eine Sprache dazukommt.
 */
export const TRANSLATION_LANGUAGES = [
  "Englisch",
  "Türkisch",
  "Arabisch",
  "Ukrainisch",
  "Russisch",
  "Französisch",
  "Polnisch",
  "Italienisch",
  "Spanisch",
] as const;

export const TRANSLATION_LANGUAGE_COUNT = TRANSLATION_LANGUAGES.length;

/**
 * Die Sprachen als Aufzaehlung fuer den Fliesstext: „A, B und C".
 *
 * Aus der Liste erzeugt statt daneben getippt – sonst weicht die Aufzaehlung
 * beim naechsten Zuwachs von der Zahl ab, und beides steht auf derselben Seite.
 */
export const TRANSLATION_LANGUAGES_SENTENCE = `${TRANSLATION_LANGUAGES.slice(0, -1).join(", ")} und ${TRANSLATION_LANGUAGES[TRANSLATION_LANGUAGES.length - 1]}`;
