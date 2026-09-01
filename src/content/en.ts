import type { Content } from "@/content/de";

/**
 * The English wording for selyvi.com.
 *
 * ==========================================================================
 * `satisfies Content` IS THE WHOLE MECHANISM
 * ==========================================================================
 * The type comes from `de.ts`. A missing key breaks the build; a key that
 * does not exist there breaks it too. No package needed — TypeScript checks
 * completeness better than any runtime warning ever will.
 *
 * What it cannot check is whether a translation still says the same thing.
 * That is what `docs/en-review.md` is for: every sentence where the
 * translation made a judgement call is listed there for sign-off.
 *
 * ==========================================================================
 * TERMINOLOGY
 * ==========================================================================
 * Fixed in `docs/glossar-en.md`, with the reasoning. The short version:
 * primary school · years 1–4 (grades 1–4) · teacher · school leadership ·
 * school authority · report comment · parent email · workload relief report ·
 * impact line · observation · support note · competencies · data protection /
 * GDPR · data processing agreement (DPA) · co-create.
 *
 * ==========================================================================
 * THE TONE RULES APPLY HERE TOO — IN ENGLISH
 * ==========================================================================
 * A: never tell readers who they are ("you became a teacher to…").
 * B: no self-doubt ("not yet", "still missing", "we can't say").
 * C: no maturity confessions ("no reference schools yet", "small team").
 * D: no future tense about product maturity ("planned", "coming soon",
 *    "in development") — except the hosting note and "More school types
 *    follow."
 * No sales language: no "unlock", "supercharge", "game-changer",
 * "free trial", "revolutionise".
 */
export const en = {
  shared: {
    practiceClaim: "Built together with teachers across Germany.",
    practiceClaimShort: "Built with teachers across Germany",

    /**
     * „bis zum Abitur" has no clean equivalent. „A-levels" is British and
     * wrong for a German qualification; „high school" is American and wrong
     * for the school system. „Upper secondary" is the neutral term the OECD
     * and Eurydice use, and it is what a researcher or a school authority
     * abroad will recognise.
     *
     * „More school types follow." carries the Rule D exception — it is
     * expansion, not maturity, and it is listed as an exception in the
     * smoke test.
     */
    schoolTypeAnswer:
      "Selyvi is built for primary school, years 1–4 (grades 1–4) — developed together with teachers from primary through to upper secondary. More school types follow.",

    audienceShort: "For primary school teachers, years 1–4",

    /**
     * The one permitted limitation on the whole site. Same content as the
     * German sentence, same weight: both halves are in preparation, and the
     * sentence says so.
     */
    productHostingNote:
      "Before we work with real pupil data, the product servers move to Germany and every school has a data processing agreement in place — both are in preparation.",

    websiteHostingNote:
      "This website is hosted in Frankfurt am Main, on servers inside the EU.",

    dataSeparationNote: "Every teacher sees only their own observations and assessments.",

    impactLinePrinciple:
      "Every workload relief report carries a note directly beneath the figures: measured values are labelled as measured, estimates as estimates — and neither label can be switched off, not even by us.",

    decisionPromise: "Selyvi suggests. You decide.",

    missionPromise:
      "We build the assistant that takes on the routine work. The teaching judgement stays with the person.",

    /** Same length as the German list — the figure 9 comes from `.length`. */
    translationLanguages: [
      "English",
      "Turkish",
      "Arabic",
      "Ukrainian",
      "Russian",
      "French",
      "Polish",
      "Italian",
      "Spanish",
    ],
  },

  nav: {
    ariaMain: "Main navigation",
    ariaFooter: "Footer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",

    items: {
      "/fuer-lehrkraefte": "For teachers",
      "/schulen": "For school leadership",
      "/forschung": "Research",
      "/datenschutz-sicherheit": "Security",
      "/ueber-uns": "Our story",
    },

    /**
     * „kennenlernen" is an invitation to get to know each other, not a
     * booking. „Book a demo" would be the sales phrase the German side
     * deliberately avoids. „Meet Selyvi" keeps the invitation.
     */
    primaryCta: "Meet Selyvi",

    footer: {
      product: "Selyvi",
      company: "Company",
      legal: "Legal",
      links: {
        "/einblick": "Take a look",
        "/fuer-lehrkraefte": "For teachers",
        "/schulen": "For school leadership",
        "/forschung": "Research & impact",
        "/datenschutz-sicherheit": "Data protection & security",
        "/demo": "Meet Selyvi",
        "/ueber-uns": "Our story",
        "/mitgestalten": "Co-create",
        "/impressum": "Legal notice",
        "/datenschutz": "Privacy policy",
      },
    },
  },

  /**
   * THE REAL APPLICATION IS GERMAN TODAY.
   *
   * These labels are translated so the interface shown matches the language
   * of the page. That is a deliberate departure from the reference
   * screenshots and is listed in `docs/en-review.md`. Anyone who has seen an
   * English interface here will expect one later — that belongs in the
   * conversation, not in a footnote.
   */
  appNav: {
    heute: "Today",
    "meine-klassen": "My classes",
    "live-unterricht": "Live lesson",
    timeline: "Timeline",
    ueberpruefung: "Review",
    foerderplaene: "Support plans",
    material: "Materials",
    klassenanalyse: "Class analysis",
    entlastungsbericht: "Workload relief report",
    "lehrer-klassen": "Teachers & classes",
    nutzung: "Use across the staff",
    schulentwicklung: "School development",
    aufmerksamkeit: "Attention",
  },

  home: {
    hero: {
      /**
       * DECISION — see docs/en-review.md.
       * German: „Der Papierkram hat jetzt eine Assistenz."
       * Two alternatives are listed there; this one keeps the cheek and the
       * grammar of the original: the paperwork is the subject, not the
       * reader.
       */
      headline: "Paperwork just got an assistant.",
      subline:
        "Selyvi is the assistant that learns as you go — built for primary school teachers. It learns your style, grows with your class and follows current curriculum requirements, from an observation in the lesson to the report comment.",
      language: "In your voice, not in AI-speak.",
      origin: "It started at the kitchen table of a trainee primary school teacher",
      originLink: "Our story",
      secondaryCta: "Try it yourself",
    },
  },

  meta: {
    homeTitle: "Selyvi – The AI assistant for primary school teachers",
    titleSuffix: "Selyvi",
    routes: {
      "/": {
        title: "",
        description:
          "Paperwork just got an assistant. Selyvi is the AI assistant that learns as you go, built for primary school teachers — observations from the lesson become report comments, parent emails and matching teaching materials. In your voice, not in AI-speak.",
      },
      "/fuer-lehrkraefte": {
        title: "For teachers",
        description:
          "Four areas: documentation, communication, teaching and oversight. What you capture in passing during a lesson becomes the basis of the report text — and decides which materials fit the class.",
      },
      "/schulen": {
        title: "For school leadership",
        description:
          "Selyvi takes the writing off your staff at report time and on parents' evenings. The workload relief report shows hours gained per month — as a PDF for your school authority.",
      },
      "/forschung": {
        title: "Research & impact",
        description:
          "We want impact evidenced, not asserted: a measurement model along the PHINEO impact staircase, three survey waves, purpose-specific consent. We are looking for research partners who want to look closer.",
      },
      "/datenschutz-sicherheit": {
        title: "Data protection & security",
        description:
          "Strict data separation across the staff, no parent or pupil portal, no sharing of pupil data. Principles, data processing and open points at a glance.",
      },
      "/ueber-uns": {
        title: "Our story",
        description:
          "It started at the kitchen table of a trainee primary school teacher: behind Selyvi is a team from product, engineering and classroom practice. We want to take administrative work off teachers — not the responsibility.",
      },
      "/einblick": {
        title: "Take a look",
        description:
          "A guided look with sample data: capture an observation, turn it into a report text, rearrange the seating plan. Four of eight areas are open.",
      },
      "/mitgestalten": {
        title: "Co-create",
        description:
          "Selyvi grew out of work with teachers and only grows that way. Anyone who joins early shapes what gets built — no contract, no pressure to buy.",
      },
      "/demo": {
        title: "Meet Selyvi",
        description:
          "In 20 minutes we show you the real interface — no video, no slides. Your questions come first.",
      },
      "/impressum": {
        title: "Legal notice",
        description: "Information pursuant to § 5 DDG about Selyvi.",
      },
      "/datenschutz": {
        title: "Privacy policy",
        description: "Privacy policy for Selyvi under Art. 13 GDPR.",
      },
    },
  },

  form: {
    labels: {
      name: "Name",
      school: "School",
      email: "Work email",
      role: "Role",
      message: "Message",
      messageOptional: "(optional)",
      rolePlaceholder: "Please choose",
      honeypot: "Website (please leave empty)",
    },
    roles: ["Teacher", "School leadership", "School authority", "IT", "Something else"],
    submit: {
      demo: "Request a time",
      mitgestalten: "Co-create",
      pending: "Sending …",
    },
    required: "Required field.",
    privacyNote:
      "We use your details solely to handle this enquiry — no newsletter, no advertising. We store your enquiry in our own customer system (servers inside the EU) in order to handle it.",
    success: {
      title: "Thank you for your enquiry.",
      body: "We will get back to you on a working day.",
      live: "Your enquiry has been sent.",
    },
    errors: {
      generic: "Please check the highlighted fields.",
      live: "The enquiry could not be sent.",
      name: "Please enter your name.",
      nameLong: "The name may be at most 100 characters long.",
      school: "Please enter your school.",
      schoolLong: "The school name may be at most 150 characters long.",
      email: "Please enter your work email address.",
      emailLong: "The email address is too long.",
      emailInvalid: "This email address does not look complete.",
      role: "Please choose one of the roles offered.",
      messageLong: "The message may be at most 2000 characters long.",
      consent: "Without this consent we cannot handle your enquiry.",
      rateLimit:
        "Several enquiries have already come in from this connection. Please try again in {minutes} minutes.",
      notConfigured: "Sending is not set up here. Your enquiry was not submitted.",
      sendFailed: "Your enquiry could not be sent just now. Please try again.",
    },
    mail: {
      sourceLabels: {
        demo: "Demo enquiry",
        mitgestalten: "Co-create",
      },
      senderName: "Website form",
      rows: {
        source: "Source",
        name: "Name",
        school: "School",
        email: "Email",
        role: "Role",
        message: "Message",
        empty: "– not given –",
        noMessage: "– no message –",
      },
    },
  },
} satisfies Content;
