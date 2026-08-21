/**
 * Team-Daten für /ueber-uns.
 *
 * WICHTIG – Personenfreigabe:
 * Namen, Funktionen und Fotos realer Personen auf einer oeffentlichen Website
 * duerfen erst erscheinen, wenn die jeweilige Person der Nennung zugestimmt
 * hat. Das ist keine Formalie: Es geht um personenbezogene Daten, und eine
 * Website, die auf ihrer eigenen Datenschutzseite Sorgfalt verspricht, kann
 * schlecht ungefragt Mitarbeitende auflisten.
 *
 * STAND: Alle drei Personen haben der Nennung zugestimmt (`approved: true`).
 * Die Zustimmung deckt auch die Erwaehnung beim Vornamen im Erzaehltext auf
 * /ueber-uns ab.
 *
 * Offen bleibt je Person der Beschreibungssatz: Solange `description` leer ist,
 * zeigt die Karte einen kleineren [PRÜFEN]-Hinweis. Den Satz gibt die Person
 * selbst vor – erfundene Beschreibungen kommen hier nicht hinein.
 *
 * Fotos fehlen weiterhin; darauf weist die Sektion im Fliesstext hin, dafuer
 * braucht es keinen Marker.
 *
 * Ergaenzungen sind bewusst trivial: eine weitere Zeile in diesem Array.
 */
export type TeamMember = {
  name: string;
  /** Funktion in Klartext, z. B. "Geschäftsführung (CEO)". */
  role: string;
  /** Initialen fuer den Platzhalter-Avatar, ein bis drei Zeichen. */
  initials: string;
  /**
   * Ein Satz zur Person. Bleibt leer, bis die Person ihn selbst freigegeben
   * hat – erfundene Beschreibungen kommen hier nicht hinein.
   */
  description: string;
  /** Liegt die Freigabe der Person fuer Nennung und Beschreibung vor? */
  approved: boolean;
};

/**
 * Offener Punkt je Person: der Beschreibungssatz.
 *
 * Greift automatisch, solange `description` leer ist – unabhängig von der
 * Freigabe. Wer den Satz einträgt, lässt den Marker damit verschwinden.
 */
export const TEAM_DESCRIPTION_REVIEW = "Beschreibungssatz der Person ausstehend";

export const team: TeamMember[] = [
  {
    name: "Christian Karl Lange",
    role: "Geschäftsführung (CEO)",
    initials: "CL",
    description: "",
    approved: true,
  },
  {
    name: "Tobias Haaga",
    role: "Technik (CTO)",
    initials: "TH",
    description: "",
    approved: true,
  },
  {
    name: "Rafael Gutmann",
    role: "Marketing (CMO)",
    initials: "RG",
    description: "",
    approved: true,
  },
];
