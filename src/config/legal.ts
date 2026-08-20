/**
 * Zentrale Ablage der rechtlichen Angaben.
 *
 * ==========================================================================
 * FREIGABE IST GETEILT: Impressum und Datenschutzerklärung haben getrennte
 * Schalter, weil sie unterschiedlich weit sind.
 * ==========================================================================
 */

/** Erzeugt einen Platzhalter-Wert mit Hinweis, was fehlt. */
export function pending(note: string): string {
  return `[PRÜFEN: ${note}]`;
}

/** Erkennt, ob ein Wert noch ein Platzhalter ist. */
export function isPending(value: string): boolean {
  return value.startsWith("[PRÜFEN:");
}

/**
 * Impressum freigegeben.
 *
 * true, seit die Angaben echt sind: Entwurfs-Balken und noindex entfallen auf
 * /impressum, die Seite steht wieder in der Sitemap.
 *
 * Offen bleibt der Betreiber-Hinweis (siehe OPERATOR_REVIEW) – der betrifft
 * aber nicht die Richtigkeit der Angaben, sondern ihre Vorläufigkeit.
 */
export const IMPRINT_READY = true;

/**
 * Datenschutzerklärung freigegeben.
 *
 * false: Die Erklärung ist inhaltlich vollständig für das, was diese Website
 * tut, aber noch nicht anwaltlich geprüft. Solange false:
 *   - /datenschutz zeigt eine dezente Prüfungs-Zeile (keinen Entwurfs-Balken,
 *     weil der Text kein Gerüst mehr ist, sondern belastbar formuliert)
 *   - /datenschutz trägt weiterhin noindex
 *   - /datenschutz bleibt aus der Sitemap
 *
 * Auf true erst nach anwaltlicher Prüfung.
 */
export const PRIVACY_APPROVED = false;

/**
 * Offener Punkt zur Betreiberangabe.
 *
 * Selyvi wird derzeit als Angebot eines Einzelunternehmens geführt. Sobald eine
 * Betreibergesellschaft gegründet ist, ändern sich Firmierung, Rechtsform,
 * Vertretung und Registereintrag – und damit sowohl das Impressum als auch der
 * Verantwortliche in der Datenschutzerklärung.
 */
export const OPERATOR_REVIEW =
  "Vorläufige Betreiberangabe – nach Gründung auf die Selyvi-Betreibergesellschaft umstellen und anwaltlich prüfen";

export type Imprint = {
  /** Firmierung bzw. Name des Einzelunternehmers. */
  companyName: string;
  street: string;
  zipCity: string;
  country: string;
  email: string;
  phone: string;
  /**
   * Umsatzsteuer-Identifikationsnummer nach § 27 a UStG.
   * Leerer String blendet die Zeile aus.
   */
  vatId: string;
  /** Verantwortlich nach § 18 Abs. 2 MStV: Name UND ladungsfähige Anschrift. */
  contentResponsible: string;
};

/**
 * ANGABEN NACH § 5 DDG.
 *
 * KEIN REGISTEREINTRAG: Rafael Gutmann betreibt Selyvi als Einzelunternehmen.
 * Einzelunternehmen ohne Kaufmannseigenschaft sind nicht im Handelsregister
 * eingetragen; `registerCourt` und `registerNumber` gibt es hier deshalb nicht
 * als Felder. Die Sektion „Registereintrag" wird auf der Seite ausgeblendet
 * statt leer angezeigt – eine leere Rubrik sieht nach einer fehlenden Angabe
 * aus, obwohl schlicht keine existiert.
 *
 * Nach Gründung einer Gesellschaft (siehe OPERATOR_REVIEW) kommen Rechtsform,
 * Vertretung und Registereintrag hinzu.
 */
export const imprint: Imprint = {
  companyName: "Rafael Gutmann",
  street: "Hauptstraße 33",
  zipCity: "73550 Waldstetten",
  country: "Deutschland",
  email: "kontakt@guddiweb.com",
  phone: "+49 (0)176 30136988",
  vatId: "DE455168590",
  contentResponsible: "Rafael Gutmann, Hauptstraße 33, 73550 Waldstetten, Deutschland",
};

/**
 * Rechtstexte des Impressums.
 *
 * ==========================================================================
 * DIESE VIER ABSCHNITTE SIND LEER – DER VORLAGENTEXT FEHLT.
 * ==========================================================================
 *
 * Vorgesehen war, den Wortlaut wortgleich aus einer Vorlage zu übernehmen. Die
 * Vorlage lag der Anweisung nicht bei (der Platzhalter „[Text aus dieser
 * Nachricht]" blieb unausgefüllt).
 *
 * Hier steht deshalb nichts. Diese Abschnitte sind juristische Standardtexte,
 * deren Wortlaut Bedeutung hat – eine selbst formulierte Fassung wäre genau
 * die Sorte Text, die im Streitfall nicht trägt. Sobald die Vorlage vorliegt:
 * `body` je Abschnitt füllen, `pending` entfernen.
 */
export type LegalTextSection = {
  title: string;
  /** Wortlaut aus der Vorlage. Leer = noch nicht übernommen. */
  body: string[];
};

export const IMPRINT_TEXT_REVIEW =
  "Wortlaut aus der Vorlage übernehmen – der Text lag der Anweisung nicht bei";

export const imprintTextSections: LegalTextSection[] = [
  { title: "Haftung für Inhalte", body: [] },
  { title: "Haftung für Links", body: [] },
  { title: "Urheberrecht", body: [] },
  { title: "Verbraucherstreitbeilegung / Universalschlichtungsstelle", body: [] },
];
