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

export type DemoChild = {
  /** Vorname plus abgekürzter Nachname. */
  name: string;
  /** Initialen für die Kachel – bewusst hinterlegt statt aus dem Namen
      geparst, damit ein Name mit Bindestrich nichts kaputt macht. */
  initials: string;
};

/** Fiktive Kinder der Klasse 3b. Sechs, weil das Kachelraster 3 × 2 ist. */
export const DEMO_CHILDREN: DemoChild[] = [
  { name: "Emma K.", initials: "EK" },
  { name: "Yusuf A.", initials: "YA" },
  { name: "Lotta B.", initials: "LB" },
  { name: "Milan P.", initials: "MP" },
  { name: "Frida S.", initials: "FS" },
  { name: "Jonas T.", initials: "JT" },
];

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

/* ==========================================================================
   Daten der vier Szenen auf /produkt.
   ========================================================================== */

/**
 * Szene A – Live-Unterricht-Modus: zwei Kinder in einer Stunde.
 *
 * Bewusst sehr kurze Notizen. Der Punkt der Szene ist nicht, was dasteht,
 * sondern dass es NEBENBEI entsteht – ein ausformulierter Satz würde das
 * Gegenteil suggerieren.
 */
export const DEMO_LIVE_NOTES = [
  { child: "Emma K.", note: "liest flüssig vor", chip: "Deutsch" },
  { child: "Yusuf A.", note: "sicher im ZR 100", chip: "Mathe" },
] as const;

/**
 * Szene B – Elternmail.
 *
 * Anrede und Signatur sind ECHTER TEXT und bleiben beim Sprachwechsel
 * unverändert stehen; nur die Inhaltszeilen bauen sich um. Genau das ist die
 * Aussage der Szene, und sie entspricht dem Produktstand: „Namen und Signatur
 * bleiben unangetastet."
 *
 * Die Inhaltszeilen selbst sind stilisierte Balken, kein türkischer Text –
 * eine Übersetzung auf der Website müsste jemand gegenlesen, und ein Fehler
 * darin fiele ausgerechnet der Zielgruppe auf.
 */
export const DEMO_PARENT_MAIL = {
  greeting: "Liebe Frau Kaya,",
  closing: "Mit freundlichen Grüßen",
  signature: "A. Weber",
  stableNote: "Namen & Signatur bleiben unangetastet",
  /** Angedeutete Sprachliste im Auswahlfeld. */
  dropdown: ["Deutsch", "Türkisch", "Arabisch", "Ukrainisch"],
} as const;

/**
 * Szene C – Material aus dem Fachkorpus.
 *
 * Drei Fundstellen, von denen die Lehrkraft ZWEI auswählt. Die dritte bleibt
 * bewusst leer: Der Produktstand sagt ausdrücklich, dass die Fundstellen auch
 * selbst gewählt werden können, statt sie automatisch ziehen zu lassen.
 */
export const DEMO_MATERIAL = {
  topic: "Wortarten, Klasse 3",
  sources: [
    "Wortarten bestimmen – Übungsblatt",
    "Nomen, Verben, Adjektive (Kl. 3)",
    "Wortarten-Werkstatt, Teil 2",
  ],
  documentTitle: "Arbeitsblatt: Wortarten",
  sourceNote: "Quellen: [1], [2]",
} as const;

/**
 * Szene D – Entlastungsbericht der Schulleitung.
 *
 * WORTWAHL: „gewonnene Zeit" und „Entlastung" sind zulässig. Das Wort
 * „Wirkung" kommt in der ganzen Szene NICHT als Behauptung vor – nur die
 * ehrliche Erhebungs-Zeile spricht über Befragungswerte, und die sagt
 * ausdrücklich, dass sich noch nichts sagen lässt. Eingesparte Stunden sind
 * eine Prozesskennzahl, kein Wirkungsnachweis (docs/produktstand-2026-08.md).
 *
 * Kein Euro-Betrag: Die Grundlage sind hinterlegte Minutenannahmen, deshalb
 * steht `note` dauerhaft neben der Zahl.
 */
export const DEMO_RELIEF_REPORT = {
  month: "Juli 2026",
  previousMonth: "Juni",
  hours: 138,
  /** Automatisierungsquote in Prozent – laut Produktstand Teil des Berichts. */
  automationRate: 68,
  note: "Schätzwert",
  surveyLine: "Befragungswerte: Erhebung läuft – noch keine belastbare Aussage.",
  /** Balkenhöhen als Faktor für scaleY: laufender Monat und Vormonat. */
  currentBars: [0.68, 1, 0.44],
  previousBars: [0.5, 0.74, 0.3],
} as const;

/**
 * Szene F – Nutzung im Kollegium (Leitungsmodus auf /schulen).
 *
 * ==========================================================================
 * DIE BALKEN TRAGEN KEINE NAMEN. DAS IST DER PUNKT.
 * --------------------------------------------------------------------------
 * Der Produktstand nennt es Produktpolitik, und zwar begründet: „Eine
 * namentliche Rangliste des Kollegiums wäre in einer Schule ein
 * Personalinstrument."
 *
 * Deshalb stehen hier ausschliesslich Höhen – keine Namen, keine Initialen,
 * keine Reihenfolge, die sich als Rangliste lesen liesse. Wer hier Namen
 * ergänzt, dreht die Aussage der Szene ins Gegenteil: Aus „die Schulleitung
 * sieht Nutzung" würde „die Schulleitung sieht, wer wenig tut".
 *
 * Die Höhen sind bewusst NICHT absteigend sortiert – eine sortierte Reihe ist
 * optisch bereits ein Ranking, auch ohne Beschriftung.
 * ==========================================================================
 */
export const DEMO_COLLEGIUM_USAGE = {
  bars: [0.55, 0.92, 0.68, 0.4, 1, 0.62, 0.78],
  badge: "Verteilung statt Rangliste",
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
