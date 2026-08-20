/**
 * Feature-Flags.
 *
 * Sichtbarkeitsschalter fuer Sektionen, deren Inhalt noch nicht belastbar ist.
 * Der Code steht bereits, nur die Ausgabe ist abgeschaltet.
 */

/**
 * Testimonial-Sektion.
 *
 * Bleibt auf false, bis mindestens eine ECHTE Pilotstimme vorliegt – Name,
 * Funktion und Schule freigegeben. Erfundene Zitate kommen nicht ins Projekt:
 * Die Datenliste in testimonials.tsx ist deshalb bewusst leer, das Flag allein
 * schaltet die Sektion nicht sichtbar.
 *
 * Der explizite `boolean`-Typ verhindert, dass TypeScript den Wert auf das
 * Literal `false` verengt – sonst gaelte der restliche Komponentencode als
 * toter Code und Aenderungen daran wuerden nicht mehr typgeprueft.
 */
export const SHOW_TESTIMONIALS: boolean = false;
