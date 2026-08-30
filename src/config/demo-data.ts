/**
 * Demo-Daten für die UI-Szenen.
 *
 * ==========================================================================
 * ROTER FADEN – ALLE SZENEN ERZÄHLEN DENSELBEN SCHULTAG.
 * ÄNDERUNGEN HIER ÄNDERN DIE GESCHICHTE ÜBERALL.
 * --------------------------------------------------------------------------
 * Dieselbe Klasse (3b), dieselben sechs Kinder, dieselbe Lehrkraft
 * (A. Weber) – vom Hero über „So funktioniert's" und /produkt bis /schulen.
 * Wer hier einen Namen austauscht, tauscht ihn auf allen fünf Bühnen aus,
 * und genau das ist der Zweck: Zehn Szenen mit zehn erfundenen Klassen wären
 * zehn Beispiele, eine durchgehende Besetzung ist ein Tag.
 *
 * Die Zeit-Kicker über den Fenstern (08:15 → 16:30 → 17:10 → Monatsende)
 * stehen in den Szenen selbst, nicht hier – sie sind Erzählung, nicht Daten.
 * ==========================================================================
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

/**
 * Fiktive Lehrkraft. Sie signiert die Elternmail und ist die Person, deren
 * Bildschirm alle Szenen zeigen.
 */
export const DEMO_TEACHER = "A. Weber";

/**
 * KEINE NEGATIVEN INHALTE ÜBER KINDER – auch nicht über erfundene.
 *
 * Alle Beobachtungen unten beschreiben etwas, das gelingt. Keine schlechten
 * Noten, keine Defizitzuschreibungen, kein Förderdrama. Das ist keine
 * Beschönigung des Produkts: Es kann selbstverständlich auch Schwierigkeiten
 * dokumentieren. Aber eine öffentliche Marketingseite ist nicht der Ort, an
 * dem ein – wenn auch erfundenes – Kind vorgeführt wird, und ein Screenshot
 * mit „braucht noch Übung" wandert erfahrungsgemäß durch Präsentationen.
 *
 * Eine frühere Beobachtung mit dem Marker „Förderbedarf" ist aus diesem Grund
 * ersatzlos entfallen.
 */

/**
 * Navigation der Anwendung, wie sie in der Seitenleiste jeder Szene steht.
 *
 * Reihenfolge und Beschriftung sind überall gleich – eine Navigation, die je
 * Szene anders aussähe, wäre kein Produkt, sondern eine Sammlung Illustrationen.
 *
 * BIBLIOTHEK IST IN KEINER SZENE AKTIV. Sie existiert laut Produktstand und
 * darf deshalb in der Navigation stehen. Aber keine Szene zeigt sie, also
 * behauptet auch keine etwas über sie. Ein Eintrag in einer Seitenleiste sagt
 * „es gibt das"; eine aufgeklappte Ansicht sagt „so sieht es aus", und das
 * wäre hier ungedeckt.
 */
/* ==========================================================================
 * SEITENLEISTEN – AM ECHTEN PRODUKT ORIENTIERT
 * ==========================================================================
 * Die Liste war bis hierher auf fuenf Eintraege gekuerzt. Sie ist jetzt so
 * lang, wie der Funktionsumfang tatsaechlich ist – DAS IST DIE AUSSAGE: Wer
 * eine Szene sieht, soll erkennen, dass die erklaerte Funktion ein Ausschnitt
 * ist und nicht das Ganze.
 *
 * JEDER EINTRAG IST EINE ALS LIVE GEFUEHRTE FUNKTION aus
 * docs/produktstand-2026-08.md. Die Zuordnung im Einzelnen:
 *
 *   Beobachtungen  <- „Beobachtungen strukturieren — Live"
 *   Klassen        <- „Kompetenzen statt Notendurchschnitt — Live" und
 *                     „Förderempfehlungen, Timeline, Klassenanalyse — Live"
 *   Zeugnisse      <- „Zeugnisbemerkungen — Live"
 *   Elternpost     <- „Elternmails, auf Wunsch übersetzt — Live"
 *   Material       <- „Unterrichtsmaterial aus echtem Fachwissen — Live"
 *   Entwürfe       <- „Unterrichtsentwürfe und Varianten — Live"
 *   Sitzplan       <- „Sitzpläne — Live" (der KI-Vorschlag darin ist Prototyp
 *                     und wird nirgends gezeigt – der Sitzplan selbst nicht)
 *   Stundenplan    <- „Klassenstundenplan ohne Pflegeaufwand — Live"
 *   Dokumente      <- „Dokumentenablage für Schülerarbeiten — Live"
 *   Entwicklung    <- „Fachverlauf und Stundenprotokoll — Live"
 *                     (Klassenentwicklung ueber Monate)
 *   Bibliothek     <- „Bibliothek — Live"
 *
 * NICHT aufgenommen, obwohl Live: „Freie Fragen an die eigenen Daten" und
 * „Daten aus Scans auslesen". Beides sind Funktionen INNERHALB eines
 * Bereichs – ein Chat und ein Haekchen –, keine eigenen Navigationspunkte.
 * Eine Seitenleiste, die Schalter auffuehrt, waere kein Abbild mehr.
 * ========================================================================== */
export const DEMO_NAV_TEACHER = [
  { key: "beobachtungen", label: "Beobachtungen" },
  { key: "klassen", label: "Klassen" },
  { key: "zeugnisse", label: "Zeugnisse" },
  { key: "elternpost", label: "Elternpost" },
  { key: "material", label: "Material" },
  { key: "entwuerfe", label: "Entwürfe" },
  { key: "sitzplan", label: "Sitzplan" },
  { key: "stundenplan", label: "Stundenplan" },
  { key: "dokumente", label: "Dokumente" },
  { key: "entwicklung", label: "Entwicklung" },
  { key: "bibliothek", label: "Bibliothek" },
] as const;

/**
 * Leitungsmodus. Der Produktstand fuehrt unter „Bereich 2 – Für die
 * Schulleitung" genau diese fuenf Bereiche als Live:
 * Entlastungsbericht, Lehrer & Klassen, Nutzung im Kollegium,
 * Schulentwicklung, Aufmerksamkeit.
 *
 * Diese Liste ist VOLLSTAENDIG – deshalb traegt sie im Gegensatz zur
 * Lehrkraft-Liste KEINE „+ weitere"-Zeile. Eine Andeutung von mehr waere hier
 * eine Behauptung.
 */
export const DEMO_NAV_LEADERSHIP = [
  { key: "entlastungsbericht", label: "Entlastungsbericht" },
  { key: "lehrer-klassen", label: "Lehrer & Klassen" },
  { key: "nutzung", label: "Nutzung im Kollegium" },
  { key: "schulentwicklung", label: "Schulentwicklung" },
  { key: "aufmerksamkeit", label: "Aufmerksamkeit" },
] as const;

export type DemoNavKey =
  (typeof DEMO_NAV_TEACHER)[number]["key"] | (typeof DEMO_NAV_LEADERSHIP)[number]["key"];

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
  // Aus der Konstante, damit die Lehrkraft in allen Szenen dieselbe ist.
  signature: DEMO_TEACHER,
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
  /** Fach-Filter über den Fundstellen. Der erste Eintrag wird gewählt. */
  subjects: ["Deutsch", "Mathe", "Sachunterricht"],
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

/* ==========================================================================
 * SZENE „FRAGEN SIE IHRE EIGENE DOKUMENTATION"
 * ==========================================================================
 * Der Chat auf der Startseite. Er greift bewusst auf DEMO_READING zurueck:
 * Die Antwort schoepft aus genau der Beobachtung, die der Hero eintippt und
 * die auf /fuer-lehrkraefte zum Zeugnistext wird. Derselbe Tag, dasselbe
 * Kind – die Szene schliesst den Kreis, statt einen vierten aufzumachen.
 *
 * Die beiden Verweis-Chips tragen Daten, keine Inhalte: Sie zeigen, DASS die
 * Antwort auf Eintraege zurueckgeht, nicht welche. Erfundene Zusatz-
 * beobachtungen waeren hier ueberfluessiger Ballast.
 * ========================================================================== */
export const DEMO_CHAT = {
  question: "Wie hat sich Emma im Lesen entwickelt?",
  /**
   * Zwei Saetze, erkennbar aus DEMO_READING abgeleitet – der erste nimmt die
   * Beobachtung auf, der zweite ordnet sie ein. Keine Note, keine Prognose:
   * Die Anwendung fasst zusammen, was dokumentiert wurde.
   *
   * Und keine Defizit-Aussage: Ein „im Mai noch stockend" waere eine
   * Entwicklung VON etwas weg und damit ein negativer Satz ueber ein Kind –
   * verboten laut Kopf dieser Datei, auch ueber ein erfundenes.
   */
  answer:
    "Emma liest inzwischen flüssig und sicher vor der Klasse vor und traut sich dabei mehr zu. Seit Mai bringt sie sich im Deutschunterricht immer häufiger von sich aus ein.",
  references: ["Beobachtung 12.05.", "Beobachtung 03.07."],
} as const;

/* ==========================================================================
 * SZENE „SITZPLAN"
 * ==========================================================================
 * Sechs Plaetze, besetzt mit demselben Cast wie ueberall. Ein Platz ist
 * gesperrt und bleibt leer – das ist die Funktion, die der Produktstand
 * ausdruecklich nennt („gesperrte Plaetze").
 *
 * Bewegt wird Lotta B. – NICHT Emma K. und nicht Yusuf A.: Die beiden tragen
 * schon die Beobachtungs- und die Chat-Szene. Wenn immer dasselbe Kind
 * angefasst wird, wirkt der Cast wie eine Person mit sechs Namen.
 *
 * KEIN Grund fuer den Umzug, weder im Bild noch im Label. Ein „sitzt jetzt
 * neben ..." waere eine paedagogische Aussage ueber ein Kind, und der
 * KI-Sitzplanvorschlag ist laut Produktstand ohnehin nur Prototyp.
 * ========================================================================== */
export const DEMO_SEATING = {
  /**
   * Raster 3 x 2, von links oben nach rechts unten.
   *   s3 ist GESPERRT – bleibt leer und traegt ein Schloss.
   *   s5 ist frei – dorthin wird gezogen.
   *   s4 sitzt Lotta B., das Kind, das umzieht.
   */
  seats: [
    { id: "s1", initials: "EK", locked: false },
    { id: "s2", initials: "YA", locked: false },
    { id: "s3", initials: null, locked: true },
    { id: "s4", initials: "LB", locked: false },
    { id: "s5", initials: null, locked: false },
    { id: "s6", initials: "FS", locked: false },
  ],
  /** Wer zieht um, von wo nach wo. */
  move: { initials: "LB", from: "s4", to: "s5" },
} as const;
