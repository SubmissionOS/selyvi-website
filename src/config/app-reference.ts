/**
 * Design-Werte der ECHTEN Anwendung.
 *
 * ==========================================================================
 * HERKUNFT: docs/app-referenz/*.png – jeder Wert ist gemessen, nicht geschätzt
 * ==========================================================================
 * Die Farben stammen aus einer Pipette auf den drei Referenz-Screenshots:
 * Das PNG wird in ein <canvas> gezeichnet und ein Bereich ausgezählt; der
 * häufigste Wert einer Linie durch einen Knopf ist dessen Füllung. Bei jedem
 * Wert steht, wo er herkommt und mit welchem Anteil er dort auftrat.
 *
 * Wer einen Wert ändert, misst ihn neu. Ein „sieht ähnlich aus" hat hier
 * nichts verloren – der Sinn der Datei ist, dass die nachgebauten Oberflächen
 * nachweislich wie das Produkt aussehen.
 *
 * ==========================================================================
 * WARUM DAS KEINE VERLETZUNG DER TOKEN-REGEL IST
 * ==========================================================================
 * CLAUDE.md erlaubt für die WEBSITE ausschliesslich die Marken-Tokens. Diese
 * Werte hier gelten NUR INNERHALB der nachgebauten Anwendungsfenster
 * (<UiWindow>) und im Einblick – also dort, wo nicht die Website spricht,
 * sondern das Produkt gezeigt wird. Sie werden deshalb auch nicht in die
 * Tailwind-Theme-Ebene gehoben, sondern als CSS-Variablen auf dem Fenster
 * gesetzt: Ausserhalb des Fensters existieren sie schlicht nicht.
 *
 * Zwei Werte sind ABSICHTLICH nicht die der Referenz. Beide Male aus
 * Kontrastgründen, beide Male hier benannt:
 *   - Schrift des aktiven Navigationseintrags
 *   - Bogen des Klassen-Puls-Donuts
 * Siehe die Kommentare an Ort und Stelle.
 */

/**
 * Das Blau der Anwendung. Wortmarke, Primary-Button, aktive Navigationsmarke,
 * gefüllter Tab, Unterstrich des aktiven Untertabs – überall derselbe Wert.
 *
 * Gemessen: 92 % einer Linie durch „Material generieren" (Material-generator),
 * 86 % durch „Schüler hinzufügen" (meine-klassen), 81 % durch den gefüllten Tab
 * „Meine Klassen" (Stundenplan).
 *
 * Es ist auf den Punkt unser brand-600 aus CLAUDE.md. Das ist keine
 * Annäherung, sondern derselbe Wert – Website und Produkt tragen dasselbe
 * Blau.
 */
export const APP_BLUE = "#0074bd";

/**
 * Hellblau für Flächen: Hintergrund des aktiven Navigationseintrags und
 * Füllung der Stundenblöcke im Stundenplan.
 *
 * Gemessen: 88 % im aktiven Eintrag „Meine Klassen", 90 % in einem
 * Mathe-Block. Identisch mit brand-100.
 */
export const APP_BLUE_SOFT = "#c7ecff";

/**
 * ABWEICHUNG VON DER REFERENZ – bewusst.
 *
 * Im Original steht die Beschriftung des aktiven Eintrags in APP_BLUE auf
 * APP_BLUE_SOFT. Gemessen sind das 3,99:1 – unter den 4,5:1, die WCAG 2.1 AA
 * für Fliesstext verlangt, und CLAUDE.md lässt davon keine Ausnahme zu.
 *
 * Die Schrift steht deshalb in brand-800: 5,73:1 auf demselben Hintergrund.
 * Balken und Symbol bleiben APP_BLUE – als grafische Elemente brauchen sie
 * 3:1, und die haben sie (3,99:1).
 */
export const APP_BLUE_ON_SOFT = "#015b97";

/**
 * Rahmen und Trennlinien: Kartenrahmen, Eingabefeld-Rahmen, Linie rechts der
 * Seitenleiste, Trennlinien der Schülerliste, Spur des Donuts.
 *
 * Gemessen: 100 % einer senkrechten Linie durch die Seitenleisten-Trennlinie.
 * Strichstärke dort 1 px.
 */
export const APP_BORDER = "#e1dfdd";

/**
 * Dunkle Schrift: Seitentitel, Kartentitel, Namen in der Schülerliste,
 * Beschriftungen.
 *
 * Gemessen: 32 % des Titelbereichs „Material", 18 % von „Klassen",
 * 14 % von „Klassenansicht 1b". 12,98:1 auf Weiss.
 */
export const APP_TEXT = "#323130";

/**
 * Graue Schrift: Beschreibungstexte, inaktive Navigationseinträge,
 * Statuszeilen („Neu"), Platzhalter.
 *
 * Gemessen: 4 % im Beschreibungstext des Materialgenerators, 2 % im
 * Navigationseintrag „Heute". 6,46:1 auf Weiss.
 */
export const APP_TEXT_MUTED = "#605e5c";

/**
 * Hintergrund der Seitenleiste und der Karten: reines Weiss.
 * Gemessen: 100 % einer Linie durch die Seitenleiste.
 */
export const APP_SURFACE = "#ffffff";

/**
 * Hintergrund des Inhaltsbereichs – ein sehr leicht grünliches Weiss.
 * Gemessen: 47 % im Titelbereich, 30 px durchgehend zwischen Seitenleiste und
 * Karte.
 */
export const APP_CANVAS = "#fcfff8";

/**
 * Ruhige Fläche innerhalb einer Karte: die Fachzeile „Mathe · Mo 2. · Mi 2."
 * in der Klassenansicht.
 *
 * Gemessen: 88 % der Fachzeile.
 */
export const APP_SURFACE_MUTED = "#f3f2f1";

/** Wechselzeile im Stundenplan-Raster. Gemessen im Rasterbereich. */
export const APP_ROW_ALT = "#f9f8f8";

/**
 * Förderblick-Chips in der Klassenübersicht: hellgrüne Fläche, dunkelgrüne
 * Schrift.
 *
 * Gemessen: 93 % der Chipfläche, 2 % (die Schrift) im selben Bereich.
 * 4,67:1 – reicht für Fliesstext.
 */
export const APP_CHIP_GREEN_BG = "#e7f2e7";
export const APP_CHIP_GREEN_TEXT = "#107c10";

/**
 * ABWEICHUNG VON DER REFERENZ – bewusst.
 *
 * Der Bogen des Klassen-Puls-Donuts ist im Original #9fa106. Gegen seine
 * eigene Spur (APP_BORDER) sind das 2,09:1; WCAG 2.1 verlangt für bedeutungs-
 * tragende Grafik 3:1 (1.4.11). Der Bogen steht deshalb hier dunkler:
 * 3,30:1 gegen dieselbe Spur, gleiche Farbfamilie.
 */
export const APP_DONUT_ARC = "#7c7d05";
export const APP_DONUT_TRACK = APP_BORDER;

/**
 * Schrift INNERHALB der Anwendungsfenster.
 *
 * Die Anwendung nutzt eine system-ui/Segoe-artige Schrift. Der Stack unten
 * nimmt genau die, die auf dem jeweiligen Gerät ohnehin liegt – kein
 * Nachladen, keine Verbindung nach draussen, keine Lizenzfrage.
 *
 * Der Website-Text bleibt IBM Plex. Der Unterschied ist gewollt: Er trennt
 * sichtbar, was wir SAGEN, von dem, was wir ZEIGEN.
 */
export const APP_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/**
 * Geometrie.
 *
 * Die Farben sind ausgezählt, diese Werte sind aus Kantenpositionen
 * abgelesen: Ein Scan entlang einer Linie meldet, wo eine Farbe in die
 * nächste übergeht.
 *
 *   Seitenleiste       Weiss von x=1 bis 269, Trennlinie bei 270
 *                      -> 270 von 1897 px Fensterbreite = 14,2 %
 *   Aktiver Eintrag    Balken #0074bd x=15–18 (4 px), Fläche bis x=251,
 *                      Höhe y=420–459 (40 px)
 *   Primary-Button     y=880–919 -> 40 px hoch
 *   Rahmen             1 px
 *
 * Die RADIEN sind als einzige Werte hier geschätzt: Ein Eckradius lässt sich
 * aus einem Screenshot nur über die Antialiasing-Treppe ablesen, und die ist
 * bei 1 px Rahmen zwei Pixel lang. Karten wirken bei rund 8 px, Knöpfe und
 * Chips bei rund 4 px, der aktive Navigationseintrag bei rund 6 px. Das ist
 * eine Ablesung mit dem Auge und als solche gekennzeichnet.
 */
export const APP_SIDEBAR_RATIO = 0.142;
export const APP_RADIUS_CARD = "8px";
export const APP_RADIUS_CONTROL = "4px";
export const APP_RADIUS_NAV = "6px";
export const APP_BORDER_WIDTH = "1px";

/**
 * Als CSS-Variablen für das Fenster. Alles darin greift über
 * `var(--app-...)` darauf zu; ausserhalb des Fensters gibt es diese Werte
 * nicht.
 */
export const APP_CSS_VARS = {
  "--app-blue": APP_BLUE,
  "--app-blue-soft": APP_BLUE_SOFT,
  "--app-blue-on-soft": APP_BLUE_ON_SOFT,
  "--app-border": APP_BORDER,
  "--app-text": APP_TEXT,
  "--app-text-muted": APP_TEXT_MUTED,
  "--app-surface": APP_SURFACE,
  "--app-canvas": APP_CANVAS,
  "--app-surface-muted": APP_SURFACE_MUTED,
  "--app-row-alt": APP_ROW_ALT,
  "--app-chip-green-bg": APP_CHIP_GREEN_BG,
  "--app-chip-green-text": APP_CHIP_GREEN_TEXT,
  "--app-donut-arc": APP_DONUT_ARC,
  "--app-donut-track": APP_DONUT_TRACK,
  "--app-radius-card": APP_RADIUS_CARD,
  "--app-radius-control": APP_RADIUS_CONTROL,
  "--app-radius-nav": APP_RADIUS_NAV,
  fontFamily: APP_FONT_STACK,
} as React.CSSProperties;
