/**
 * Demo-Daten für die UI-Szenen.
 *
 * ==========================================================================
 * ALLE DATEN SIND FREI ERFUNDEN.
 *
 * Keine realen Personen, keine reale Klasse, keine reale Schule. Die
 * Kindernamen sind erfunden und stehen mit abgekürztem Nachnamen, damit sie
 * auch als Erfindung erkennbar bleiben. Die Beobachtungs- und Zeugnistexte
 * sind fachlich plausibel formuliert, aber ebenfalls erfunden.
 *
 * WER HIER ETWAS ÄNDERT: niemals echte Daten einsetzen – auch nicht
 * „anonymisierte". Eine Marketingseite, die echte Schülerbeobachtungen zeigt,
 * ist ein Datenschutzvorfall, kein Screenshot.
 * ==========================================================================
 *
 * Die Inhalte müssen zum Produktstand passen (docs/produktstand-2026-08.md):
 * Grundschule, Klassen 1–4, Kompetenzen statt Notendurchschnitt.
 */

/** Fiktive Klasse, auf die sich alle Szenen beziehen. */
export const DEMO_CLASS = "3b";

/** Fiktive Kinder. Vorname plus abgekürzter Nachname. */
export const DEMO_CHILDREN = [
  "Emma K.",
  "Yusuf A.",
  "Lotta B.",
  "Milan P.",
  "Frida S.",
] as const;

export type DemoObservation = {
  /** Kind, auf das sich die Beobachtung bezieht. */
  child: string;
  /** Freitext, wie ihn eine Lehrkraft tippt oder diktiert. */
  input: string;
  /**
   * Struktur, die die Anwendung daraus ableitet: Fach, Art, Bewertung.
   * Entspricht dem, was der Produktstand als „Fach, Kategorie, Priorität und
   * Förderhinweis" beschreibt – hier auf drei sichtbare Marker gekürzt.
   */
  chips: string[];
  /** Zwei Sätze im Zeugnis-Register, erkennbar aus dem Freitext abgeleitet. */
  reportDraft: string;
};

/**
 * Szene 1 (Hero): Leseflüssigkeit.
 *
 * Der Zeugnistext greift beide Aussagen der Beobachtung auf – das flüssige
 * Vorlesen und das gewachsene Zutrauen. Das ist der Punkt der Szene: Der
 * Entwurf kommt aus der eigenen Beobachtung, nicht aus dem Modellgedächtnis.
 */
export const DEMO_READING: DemoObservation = {
  child: "Emma K.",
  input: "Emma liest heute zum ersten Mal flüssig vor der Klasse – traut sich mehr zu.",
  chips: ["Deutsch · Lesen", "Beobachtung", "Stärke"],
  reportDraft:
    "Emma liest zunehmend flüssig und sicher vor der Klasse vor. Sie traut sich dabei mehr zu und bringt sich im Deutschunterricht immer häufiger von sich aus ein.",
};

/**
 * Szene 2 (vorgesehen für /produkt): Kopfrechnen im Zahlenraum bis 100.
 *
 * Noch von keiner Szene verwendet. Steht hier, weil Demo-Daten an einem Ort
 * gehören – nicht verstreut in den Szenen, wo niemand sie auf Plausibilität
 * gegenlesen kann.
 */
export const DEMO_ARITHMETIC: DemoObservation = {
  child: "Yusuf A.",
  input:
    "Yusuf rechnet im Zahlenraum bis 100 sicher, verrechnet sich beim Zehnerübergang aber noch.",
  chips: ["Mathematik · Kopfrechnen", "Beobachtung", "Förderbedarf"],
  reportDraft:
    "Yusuf löst Aufgaben im Zahlenraum bis 100 überwiegend sicher. Beim Übergang über den Zehner braucht er noch Übung, arbeitet aber konzentriert an eigenen Strategien.",
};

/**
 * Kennzahlen für eine spätere Leitungs-Szene (Entlastungsbericht).
 *
 * Bewusst ohne Euro-Betrag – der Entlastungsbericht im Produkt nennt keinen,
 * und eine Szene darf nicht mehr behaupten als das Produkt.
 */
export const DEMO_RELIEF_REPORT = {
  savedHours: 142,
  automationRate: 68,
  processes: 9,
} as const;

/* ==========================================================================
   Kurzfassungen für die kleinen Szenen in „So funktioniert's".
   --------------------------------------------------------------------------
   Dort ist die Bühne nur gut 110 px hoch. Die Texte sind deshalb deutlich
   kürzer als in der Hero-Szene – ein Gedanke je Szene, mehr passt nicht und
   mehr soll auch nicht.
   ========================================================================== */

/** Szene 1: eine Beobachtung, wie sie zwischen Tür und Angel entsteht. */
export const DEMO_QUICK_NOTE = {
  input: "Yusuf rechnet heute sicher im ZR 100.",
  chip: "Mathe",
} as const;

/**
 * Szene 3: gewonnene Zeit im Entlastungsbericht.
 *
 * WORTWAHL IST HIER KEINE GESCHMACKSFRAGE. „Gewonnene Zeit" und „Entlastung"
 * sind zulässig, „Wirkung" NICHT: Eingesparte Stunden sind eine
 * Prozesskennzahl, kein Wirkungsnachweis. Die Trennung stammt aus
 * docs/produktstand-2026-08.md und gilt auch in Grafiken – gerade dort, weil
 * eine Zahl in einem Diagramm schneller als Beleg gelesen wird als ein Satz.
 *
 * `note` steht in der Szene dauerhaft neben der Zahl, nicht als Fussnote:
 * Die Grundlage sind hinterlegte Minutenannahmen, und die sind Schätzwerte.
 */
export const DEMO_RELIEF_MONTH = {
  hours: 14.5,
  unit: "Std.",
  note: "Schätzwert",
} as const;
