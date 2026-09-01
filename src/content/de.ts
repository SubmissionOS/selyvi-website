/**
 * Alle sichtbaren Texte der deutschen Fassung.
 *
 * ==========================================================================
 * DIESE DATEI IST DIE QUELLE, en.ts IST IHRE ÜBERSETZUNG
 * ==========================================================================
 * `en.ts` trägt `satisfies Content` – der Typ kommt aus genau diesem Objekt.
 * Ein Schlüssel, der dort fehlt, bricht den Build; ein Schlüssel, den es hier
 * nicht gibt, ebenfalls. Das ist der ganze Mechanismus, und er braucht kein
 * Paket: TypeScript prüft Vollständigkeit besser als jede Laufzeit-Warnung.
 *
 * WER HIER ETWAS ÄNDERT, ändert es in en.ts mit. Der Build sagt es sofort,
 * wenn ein Schlüssel neu ist – aber nicht, wenn ein bestehender Text sich
 * inhaltlich verschoben hat. Dafür gibt es docs/en-review.md.
 *
 * ==========================================================================
 * DIE GETEILTEN KONSTANTEN LIEGEN JETZT HIER
 * ==========================================================================
 * PRACTICE_CLAIM, PRODUCT_HOSTING_NOTE, SCHOOL_TYPE_ANSWER,
 * IMPACT_LINE_PRINCIPLE, DECISION_PROMISE und MISSION_PROMISE standen in
 * brand.ts und product.ts. Sie bleiben Einzelquelle – nur eben je Sprache.
 * Die Begründungen, warum jeder dieser Sätze genau so lautet, stehen
 * weiterhin an ihrer alten Stelle im Kommentar; sie gelten für beide
 * Sprachen und sollen nicht doppelt gepflegt werden.
 *
 * ==========================================================================
 * DIE TON-REGELN GELTEN HIER GENAUSO
 * ==========================================================================
 * A (niemandem sagen, wer er ist), B (kein Selbstzweifel), C (kein
 * Reifegrad-Geständnis), D (keine Zukunftsform über die Produktreife).
 * Der Smoke-Test prüft das ausgelieferte HTML – also das Ergebnis dieser
 * Datei.
 */

export const de = {
  /* ====================================================================== */
  /* Geteilte Aussagen                                                      */
  /* ====================================================================== */
  shared: {
    /**
     * Praxis-Aussage. Steht auf mehreren Seiten wortgleich – siehe den
     * Kommentar in src/config/brand.ts.
     */
    practiceClaim: "Entwickelt in Zusammenarbeit mit Lehrkräften aus ganz Deutschland.",
    practiceClaimShort: "Mit Lehrkräften aus ganz Deutschland entwickelt",

    /** Antwort auf die Schulform-Frage. Enthält die Regel-D-Ausnahme. */
    schoolTypeAnswer:
      "Selyvi ist heute für die Grundschule gebaut, Klassen 1 bis 4 – entwickelt gemeinsam mit Lehrkräften von der Grundschule bis zum Abitur. Weitere Schulformen folgen.",

    audienceShort: "Für Grundschullehrkräfte, Klassen 1–4",

    /**
     * Serverstandort. DIE einzige erlaubte Einschränkung der ganzen Website
     * (CLAUDE.md, Regel D). Wortlaut nicht abschwächen, nicht verschärfen.
     */
    productHostingNote:
      "Vor dem Betrieb mit echten Schülerdaten ziehen die Produktserver nach Deutschland um und jeder Schule liegt ein Auftragsverarbeitungsvertrag vor – beides ist in Vorbereitung.",

    websiteHostingNote:
      "Diese Website wird in Frankfurt am Main gehostet, auf Servern innerhalb der EU.",

    dataSeparationNote:
      "Jede Lehrkraft sieht ausschließlich ihre eigenen Beobachtungen und Bewertungen.",

    impactLinePrinciple:
      "Jeder Entlastungsbericht trägt direkt unter den Zahlen eine Einordnung: Gemessenes steht als Messwert, Geschätztes als Schätzwert – und keine dieser Kennzeichnungen lässt sich ausblenden, auch von uns nicht.",

    decisionPromise: "Selyvi schlägt vor. Sie entscheiden.",

    missionPromise:
      "Wir bauen die Assistenz, die Routinearbeit übernimmt. Die pädagogische Entscheidung bleibt beim Menschen.",

    /**
     * Zielsprachen der Elternmail-Übersetzung.
     *
     * Die Liste ist in beiden Sprachfassungen GLEICH LANG – die Zahl 9 steht
     * im Fließtext und kommt aus `.length`. Übersetzt werden die Namen der
     * Sprachen, nicht ihre Anzahl.
     */
    translationLanguages: [
      "Englisch",
      "Türkisch",
      "Arabisch",
      "Ukrainisch",
      "Russisch",
      "Französisch",
      "Polnisch",
      "Italienisch",
      "Spanisch",
    ],
  },

  /* ====================================================================== */
  /* Kopfzeile, Fußzeile, Navigation                                        */
  /* ====================================================================== */
  nav: {
    ariaMain: "Hauptnavigation",
    ariaFooter: "Fußzeile",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    skipToContent: "Zum Inhalt springen",

    /** Reihenfolge und Ziele stehen in site.ts – hier nur die Beschriftung. */
    items: {
      "/fuer-lehrkraefte": "Für Lehrkräfte",
      "/schulen": "Für Schulleitungen",
      "/forschung": "Forschung",
      "/datenschutz-sicherheit": "Sicherheit",
      "/ueber-uns": "Unsere Geschichte",
    },

    primaryCta: "Selyvi kennenlernen",

    footer: {
      product: "Selyvi",
      company: "Unternehmen",
      legal: "Rechtliches",
      links: {
        "/einblick": "Einblick",
        "/fuer-lehrkraefte": "Für Lehrkräfte",
        "/schulen": "Für Schulleitungen",
        "/forschung": "Forschung & Wirkung",
        "/datenschutz-sicherheit": "Datenschutz & Sicherheit",
        "/demo": "Selyvi kennenlernen",
        "/ueber-uns": "Unsere Geschichte",
        "/mitgestalten": "Mitgestalten",
        "/impressum": "Impressum",
        "/datenschutz": "Datenschutzerklärung",
      },
    },
  },

  /* ====================================================================== */
  /* Navigation der nachgebauten Anwendung                                  */
  /* ====================================================================== */
  /**
   * ACHTUNG – DIE ECHTE ANWENDUNG IST HEUTE DEUTSCH.
   *
   * Die Beschriftungen kommen aus docs/app-referenz/ und sind dort deutsch.
   * In der englischen Fassung stehen sie übersetzt, damit die gezeigte
   * Oberfläche zur Sprache der Seite passt – das ist eine bewusste
   * Abweichung von der Referenz und in docs/en-review.md als Entscheidung
   * aufgeführt. Wer eine englische Produktoberfläche gesehen hat, erwartet
   * sie später auch; das gehört im Gespräch gesagt.
   */
  appNav: {
    heute: "Heute",
    "meine-klassen": "Meine Klassen",
    "live-unterricht": "Live-Unterricht",
    timeline: "Timeline",
    ueberpruefung: "Überprüfung",
    foerderplaene: "Förderpläne",
    material: "Material",
    klassenanalyse: "Klassenanalyse",
    entlastungsbericht: "Entlastungsbericht",
    "lehrer-klassen": "Lehrer & Klassen",
    nutzung: "Nutzung im Kollegium",
    schulentwicklung: "Schulentwicklung",
    aufmerksamkeit: "Aufmerksamkeit",
  },

  /* ====================================================================== */
  /* Startseite                                                             */
  /* ====================================================================== */
  home: {
    hero: {
      headline: "Der Papierkram hat jetzt eine Assistenz.",
      subline:
        "Selyvi ist die mitlernende Assistenz für Grundschullehrkräfte: Sie lernt Ihren Stil, wächst mit Ihrer Klasse mit und orientiert sich an aktuellen Bildungsvorgaben – von der Beobachtung im Unterricht bis zur Zeugnisbemerkung.",
      language: "In Ihrer Sprache, nicht in KI-Sprache.",
      origin: "Entstanden am Küchentisch einer angehenden Grundschullehrerin",
      originLink: "Unsere Geschichte",
      secondaryCta: "Selbst ausprobieren",
    },
  },

  /* ====================================================================== */
  /* Meta und OpenGraph                                                     */
  /* ====================================================================== */
  meta: {
    homeTitle: "Selyvi – Die KI-Assistenz für Grundschullehrkräfte",
    titleSuffix: "Selyvi",
    routes: {
      "/": {
        title: "",
        description:
          "Der Papierkram hat jetzt eine Assistenz. Selyvi ist die mitlernende KI-Assistenz für Grundschullehrkräfte – aus Beobachtungen im Unterricht entstehen Zeugnisbemerkungen, Elternmails und passendes Material. In Ihrer Sprache, nicht in KI-Sprache.",
      },
      "/fuer-lehrkraefte": {
        title: "Für Lehrkräfte",
        description:
          "Vier Bereiche: Dokumentation, Kommunikation, Unterricht und Steuerung. Was Sie nebenbei im Unterricht erfassen, wird am Zeugnistag zur Grundlage des Textes – und bestimmt, welches Material zur Klasse passt.",
      },
      "/schulen": {
        title: "Für Schulleitungen",
        description:
          "Selyvi nimmt Ihrem Kollegium die Schreibarbeit am Zeugnistag und an den Elternabenden ab. Der Entlastungsbericht weist eingesparte Stunden je Monat aus – als PDF für Ihren Schulträger.",
      },
      "/forschung": {
        title: "Forschung & Wirkung",
        description:
          "Wirkung wollen wir belegen, nicht behaupten: Erhebungsmodell entlang der PHINEO-Wirkungstreppe, drei Befragungswellen, zweckgranulare Einwilligung. Wir suchen Forschungspartner, die genauer hinschauen wollen.",
      },
      "/datenschutz-sicherheit": {
        title: "Datenschutz & Sicherheit",
        description:
          "Strikte Datentrennung im Kollegium, kein Eltern- oder Schülerportal, keine Weitergabe von Schülerdaten. Grundsätze, Auftragsverarbeitung und offene Punkte im Überblick.",
      },
      "/ueber-uns": {
        title: "Unsere Geschichte",
        description:
          "Angefangen am Küchentisch einer angehenden Grundschullehrerin: Hinter Selyvi steht ein Team aus Produkt, Technik und Bildungspraxis. Wir wollen Lehrkräften Verwaltungsarbeit abnehmen – nicht die Verantwortung.",
      },
      "/einblick": {
        title: "Einblick",
        description:
          "Ein geführter Einblick mit Beispieldaten: eine Beobachtung festhalten, daraus einen Zeugnistext entstehen lassen, den Sitzplan umstellen. Vier von acht Bereichen sind offen.",
      },
      "/mitgestalten": {
        title: "Mitgestalten",
        description:
          "Selyvi ist mit Lehrkräften entstanden und wächst nur so weiter. Wer früh dabei ist, prägt, was gebaut wird – ohne Vertrag, ohne Kaufdruck.",
      },
      "/demo": {
        title: "Kennenlernen",
        description:
          "In 20 Minuten zeigen wir Ihnen die echte Oberfläche – kein Video, keine Folien. Ihre Fragen kommen zuerst.",
      },
      "/impressum": {
        title: "Impressum",
        description: "Angaben gemäß § 5 DDG zu Selyvi.",
      },
      "/datenschutz": {
        title: "Datenschutzerklärung",
        description: "Datenschutzerklärung zu Selyvi nach Art. 13 DSGVO.",
      },
    },
  },

  /* ====================================================================== */
  /* Formular (/demo und /mitgestalten)                                     */
  /* ====================================================================== */
  form: {
    labels: {
      name: "Name",
      school: "Schule",
      email: "Dienstliche E-Mail",
      role: "Rolle",
      message: "Nachricht",
      messageOptional: "(optional)",
      rolePlaceholder: "Bitte wählen",
      honeypot: "Website (bitte frei lassen)",
    },
    roles: ["Lehrkraft", "Schulleitung", "Schulträger", "IT", "Sonstiges"],
    submit: {
      demo: "Termin anfragen",
      mitgestalten: "Mitgestalten",
      pending: "Wird gesendet …",
    },
    required: "Pflichtfeld.",
    privacyNote:
      "Ihre Angaben verwenden wir ausschließlich zur Bearbeitung dieser Anfrage – kein Newsletter, keine Werbung. Ihre Anfrage speichern wir in unserem eigenen Kundensystem (Server in der EU) zur Bearbeitung.",
    success: {
      title: "Danke für Ihre Anfrage.",
      body: "Wir melden uns werktags bei Ihnen.",
      live: "Ihre Anfrage wurde übermittelt.",
    },
    errors: {
      generic: "Bitte prüfen Sie die markierten Felder.",
      live: "Die Anfrage konnte nicht übermittelt werden.",
      name: "Bitte geben Sie Ihren Namen an.",
      nameLong: "Der Name darf höchstens 100 Zeichen lang sein.",
      school: "Bitte geben Sie Ihre Schule an.",
      schoolLong: "Der Schulname darf höchstens 150 Zeichen lang sein.",
      email: "Bitte geben Sie Ihre dienstliche E-Mail-Adresse an.",
      emailLong: "Die E-Mail-Adresse ist zu lang.",
      emailInvalid: "Diese E-Mail-Adresse scheint nicht vollständig zu sein.",
      role: "Bitte wählen Sie eine der angebotenen Rollen.",
      messageLong: "Die Nachricht darf höchstens 2000 Zeichen lang sein.",
      consent: "Ohne diese Einwilligung können wir Ihre Anfrage nicht bearbeiten.",
      rateLimit:
        "Es sind bereits mehrere Anfragen von diesem Anschluss eingegangen. Bitte versuchen Sie es in {minutes} Minuten erneut.",
      notConfigured:
        "Der Versand ist derzeit nicht eingerichtet. Ihre Anfrage wurde nicht übermittelt.",
      sendFailed:
        "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut.",
    },
    /** Betreffzeilen und Beschriftungen der Benachrichtigungsmail. */
    mail: {
      sourceLabels: {
        demo: "Demo-Anfrage",
        mitgestalten: "Mitgestalten",
      },
      senderName: "Website-Formular",
      rows: {
        source: "Herkunft",
        name: "Name",
        school: "Schule",
        email: "E-Mail",
        role: "Rolle",
        message: "Nachricht",
        empty: "– keine Angabe –",
        noMessage: "– keine Nachricht –",
      },
    },
  },
};

/**
 * Der Typ, an dem sich en.ts messen lassen muss.
 *
 * BEWUSST OHNE `as const`: Mit `as const` waeren die Werte Literaltypen –
 * `en.ts` muesste dann WORTGLEICH dasselbe enthalten wie `de.ts`, was den
 * Zweck der Datei zerstoert. Ohne `as const` sind die Werte `string`, die
 * SCHLUESSEL aber weiterhin exakt: Ein fehlender oder falsch geschriebener
 * Schluessel bricht den Build, ein anderer Text nicht.
 */
export type Content = typeof de;
