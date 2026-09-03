/**
 * Schlagwort-Vergleich für /einblick – an Wortgrenzen, nicht an Teilstrings.
 *
 * ==========================================================================
 * WARUM ES DIESE DATEI GIBT
 * ==========================================================================
 * Die erste Fassung verglich mit `text.includes(wort)`. Das trifft mitten im
 * Wort. Im Englischen fällt so etwas selten auf, im Deutschen sofort:
 *
 *   „Wie geht es der Klasse?"        -> „las" steckt in „K-las-se"
 *                                       -> Antwort über Emmas Lesen
 *   „Wir lassen die Kinder wählen."  -> „las" steckt in „las-sen"
 *
 * Beides sind falsche Treffer, und der zweite ist der teurere: Wer im
 * Einblick eine Antwort bekommt, die zur Frage nicht passt, glaubt danach
 * auch der richtigen nicht mehr. Gemeldet aus dem englischen Port, wo
 * dieselbe Bauweise dieselbe Klasse von Fehlern erzeugt hat.
 *
 * ==========================================================================
 * WIE VERGLICHEN WIRD
 * ==========================================================================
 * Der Text wird in Wörter zerlegt. Ein Muster trifft entweder
 *
 *   „lotta"   GANZES WORT   – trifft „lotta", nicht „lottaspiel"
 *   „lese*"   WORTANFANG    – trifft „lese", „lesen", „leseübung"
 *
 * Der Stern ist bewusst kein Platzhalter für „irgendwo": Deutsche Komposita
 * hängen hinten an („Lese-übung", „Team-Meeting"), deshalb reicht der
 * Wortanfang. Ein Muster mitten im Wort gibt es nicht mehr.
 *
 * BEWUSSTE LÜCKE: Ein Kompositum, dessen Schlagwort am ENDE steht
 * („Hausaufgabe" für „aufgabe"), wird NICHT getroffen. Das ist die richtige
 * Seite zum Irren – ein fehlender Chip heißt „Beobachtung", ein falscher
 * Chip behauptet etwas über ein Kind.
 *
 * ==========================================================================
 * WARUM UMLAUTE UMGESCHRIEBEN WERDEN
 * ==========================================================================
 * „ä ö ü ß" werden zu „ae oe ue ss" – in der Eingabe UND im Muster. Damit
 * trifft „erklär*" auch „erklaert", wenn jemand ohne Umlaute tippt, und die
 * Wortzerlegung braucht keine Unicode-Sonderfälle.
 */

/** Kleinbuchstaben, Umlaute umgeschrieben, alles andere zu Leerzeichen. */
export function normalisiereText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/** Der Text als Wortliste – die Grundlage jedes Vergleichs. */
export function inWorte(text: string): string[] {
  const norm = normalisiereText(text);
  return norm.length === 0 ? [] : norm.split(" ");
}

/**
 * Trifft ein Muster in dieser Wortliste?
 *
 * Muster mit Stern am Ende trifft am Wortanfang, sonst nur als ganzes Wort.
 */
export function trifft(worte: string[], muster: string): boolean {
  const stamm = muster.endsWith("*");
  const kern = normalisiereText(stamm ? muster.slice(0, -1) : muster);
  if (kern.length === 0) return false;
  return stamm ? worte.some((w) => w.startsWith(kern)) : worte.includes(kern);
}

/**
 * Der erste Schlüssel, dessen Wortliste trifft – oder null.
 *
 * Die Reihenfolge der Einträge entscheidet bei mehrdeutigen Fragen. Sie ist
 * deshalb in den Daten festgelegt und nicht hier.
 */
export function findeSchluessel(
  text: string,
  listen: Record<string, string[]>,
): string | null {
  const worte = inWorte(text);
  if (worte.length === 0) return null;
  for (const [schluessel, muster] of Object.entries(listen)) {
    if (muster.some((m) => trifft(worte, m))) return schluessel;
  }
  return null;
}
