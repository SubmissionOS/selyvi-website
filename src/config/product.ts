import { t } from "@/content";

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
export const AUDIENCE_SHORT = t.shared.audienceShort;

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
export const PRODUCT_HOSTING_NOTE = t.shared.productHostingNote;

/** Hosting DIESER WEBSITE. Belegt durch die Serverregion fra1 in vercel.json. */
export const WEBSITE_HOSTING_NOTE = t.shared.websiteHostingNote;

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
export const DATA_SEPARATION_NOTE = t.shared.dataSeparationNote;

/**
 * Zielsprachen der Elternmail-Uebersetzung.
 *
 * Die Zahl 9 steht an mehreren Stellen im Fliesstext und kommt ueberall aus
 * `TRANSLATION_LANGUAGES.length` – so kann sie nicht von der Liste abweichen,
 * wenn eine Sprache dazukommt.
 */
export const TRANSLATION_LANGUAGES = t.shared.translationLanguages;

export const TRANSLATION_LANGUAGE_COUNT = TRANSLATION_LANGUAGES.length;

/**
 * Die Sprachen als Aufzaehlung fuer den Fliesstext: „A, B und C".
 *
 * Aus der Liste erzeugt statt daneben getippt – sonst weicht die Aufzaehlung
 * beim naechsten Zuwachs von der Zahl ab, und beides steht auf derselben Seite.
 */
export const TRANSLATION_LANGUAGES_SENTENCE = `${TRANSLATION_LANGUAGES.slice(0, -1).join(", ")} und ${TRANSLATION_LANGUAGES[TRANSLATION_LANGUAGES.length - 1]}`;

/**
 * Der Grundsatz hinter der Wirkungszeile – inhaltlich so, wie ihn
 * docs/produktstand-2026-08.md beschreibt („Wirkungszeile — Live").
 *
 * Warum das eine geteilte Konstante ist und keine zwei Formulierungen:
 * Der Satz stand auf /forschung und auf /schulen in zwei Fassungen, und die
 * /schulen-Fassung war ungenauer als die Quelle. Dort hiess es „Wir zeigen
 * gemessene Wirkung" – das Produkt zeigt aber gemessene BEFRAGUNGSWERTE.
 * Der Unterschied ist nicht spitzfindig, er ist der ganze Punkt: Genau weil
 * eingesparte Stunden eben KEIN Wirkungsnachweis sind, darf die Zeile, die
 * das klarstellt, nicht selbst Wirkung versprechen.
 *
 * ==========================================================================
 * ZWEIMAL UMFORMULIERT – DIE ZWEITE FASSUNG WAR EHRLICH UND TROTZDEM SCHWACH
 * ==========================================================================
 * Fassung 1 endete auf „Diese Zeile verschwindet nie." – ein Satz, der nur
 * traegt, wenn man vorher weiss, wovon er handelt.
 *
 * Fassung 2 lieferte den Kontext mit, sagte aber „oder im Klartext, warum
 * sich noch nichts sagen laesst". Das ist eine Selbstauskunft ueber
 * Unwissen – ausgerechnet in dem Satz, der unsere Methodenstrenge belegen
 * soll. Er las sich damit wie eine Entschuldigung. Verboten nach CLAUDE.md,
 * Regel B unter TON.
 *
 * Fassung 3 sagt dieselbe Tatsache als Handwerk: Es gibt zwei Sorten Zahlen,
 * beide sind benannt, und die Kennzeichnung ist nicht abschaltbar. Wer
 * „Schaetzwert" liest, weiss ohne weiteres Zutun, dass keine Messung
 * dahintersteht – das ist genau die Auskunft, die Fassung 2 umstaendlich
 * herbeigeredet hat.
 *
 * Der Produktstand ist unveraendert gedeckt: Der Entlastungsbericht weist
 * gewonnene Zeit als Schaetzwert aus (hinterlegte Minutenannahmen), die
 * Wirkungszeile weist Befragungswerte als Messwerte aus, sobald sie
 * vorliegen. Nichts davon behauptet ein Ergebnis.
 *
 * VERBOTEN in jeder kuenftigen Fassung: „warum sich noch nichts sagen
 * laesst" und jede Variante davon.
 *
 * Wer den Wortlaut aendert, aendert ihn auf beiden Seiten gleichzeitig – und
 * sollte vorher im Produktstand nachlesen, was die Zeile wirklich anzeigt.
 */
export const IMPACT_LINE_PRINCIPLE = t.shared.impactLinePrinciple;

/**
 * Versprechen 1 aus dem Manifest auf /ueber-uns – und zugleich die Ueberschrift
 * des Prinzip-Bands auf /fuer-lehrkraefte.
 *
 * Geteilte Konstante, weil derselbe Satz an zwei Stellen steht und beide
 * gemeint sind: einmal als Produktprinzip ueber den Funktionen, einmal als
 * Selbstverpflichtung im Manifest. Zwei Fassungen desselben Versprechens
 * waeren genau das, was das Manifest bestreitet.
 *
 * „Die KI" ist hier bewusst zu „Selyvi" geworden: Als handelnder Akteur in
 * einer Vertrauensformel loest „die KI" Misstrauen aus, der Produktname nicht.
 * Die Technologie-Kategorie („KI-Assistenz fuer Grundschullehrkraefte") bleibt
 * davon unberuehrt – sie sagt, WAS das Produkt ist, und nicht, wer entscheidet.
 *
 * Das „Immer." gehoert NUR ins Manifest: Dort ist der Satz ein Schwur, ueber
 * den Funktionsbloecken ist er eine Ueberschrift. Deshalb steht die Konstante
 * ohne das Wort, und das Manifest haengt es an.
 */
export const DECISION_PROMISE = t.shared.decisionPromise;

/**
 * Der Satz aus „Warum wir das bauen" auf /ueber-uns – steht zusaetzlich ueber
 * dem Kennenlernen-Aufruf am Ende der Startseite.
 *
 * Geteilte Konstante, weil er an beiden Stellen dasselbe leisten soll: die
 * Arbeitsteilung benennen, bevor jemand auf einen Knopf drueckt. Zwei
 * Fassungen desselben Satzes waeren an genau der Stelle unglaubwuerdig, an
 * der es um Vertrauen geht.
 */
export const MISSION_PROMISE = t.shared.missionPromise;
