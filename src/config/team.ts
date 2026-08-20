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
 * Solange `approved` auf false steht, zeigt die Karte einen sichtbaren
 * [PRÜFEN]-Hinweis. Beim Umstellen auf true bitte gleichzeitig:
 *   - `description` mit dem von der Person freigegebenen Satz fuellen
 *   - Foto ergaenzen (bis dahin steht der Initialen-Avatar)
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

export const team: TeamMember[] = [
  {
    name: "Christian Karl Lange",
    role: "Geschäftsführung (CEO)",
    initials: "CL",
    description: "",
    approved: false,
  },
  {
    name: "Tobias Haaga",
    role: "Technik (CTO)",
    initials: "TH",
    description: "",
    approved: false,
  },
  {
    name: "Rafael Gutmann",
    role: "Marketing (CMO)",
    initials: "RG",
    description: "",
    approved: false,
  },
];
