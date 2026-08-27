/**
 * Felddefinition und Validierung des Demo-Formulars.
 *
 * Bewusst OHNE Validierungs-Bibliothek: Pflichtfelder, E-Mail-Format und
 * Laengen-Limits lassen sich mit Bordmitteln pruefen. Eine zusaetzliche
 * Abhaengigkeit waere hier reine Angriffsflaeche ohne Gegenwert.
 *
 * Diese Datei enthaelt KEINE Geheimnisse und wird von Client und Server
 * genutzt (die Rollenliste braucht das <select>).
 */

export const DEMO_FIELDS = ["name", "school", "email", "role", "message"] as const;
export type DemoField = (typeof DEMO_FIELDS)[number];

/** Name des Honeypot-Felds. Unauffaellig, damit Bots es ausfuellen. */
export const HONEYPOT_FIELD = "website";

/** Feld mit der auf dem Client gemessenen Ausfuelldauer in Millisekunden. */
export const ELAPSED_FIELD = "elapsedMs";

/**
 * Feld mit der Herkunft der Anfrage: von welcher Seite wurde abgeschickt?
 *
 * Es steht als verstecktes Feld im Formular und landet in der Betreffzeile
 * und im Mailtext. Zweck ist ausschliesslich, dass beim Lesen der Mail klar
 * ist, worauf jemand geantwortet hat – eine Demo-Anfrage und eine Anfrage zum
 * Mitgestalten brauchen unterschiedliche Antworten.
 *
 * Der Wert ist CLIENT-EINGABE und wird deshalb nie uebernommen, sondern gegen
 * die Liste unten geprueft. Ein unbekannter Wert faellt still auf „demo"
 * zurueck, statt eine Fehlermeldung zu erzeugen: Wer hier manipuliert, soll
 * keine Rueckmeldung darueber bekommen, was das Formular akzeptiert.
 */
export const SOURCE_FIELD = "source";

export const SOURCE_VALUES = ["demo", "mitgestalten"] as const;
export type SourceValue = (typeof SOURCE_VALUES)[number];

/** Beschriftung fuer die Mail. Keine Rohwerte in der Betreffzeile. */
export const SOURCE_LABELS: Record<SourceValue, string> = {
  demo: "Demo-Anfrage",
  mitgestalten: "Mitgestalten",
};

export function normalizeSource(raw: string): SourceValue {
  return (SOURCE_VALUES as readonly string[]).includes(raw)
    ? (raw as SourceValue)
    : "demo";
}

/** Mindestdauer zwischen Formular-Anzeige und Absenden. */
export const MIN_FILL_MS = 3000;

export const ROLE_OPTIONS = [
  "Lehrkraft",
  "Schulleitung",
  "Schulträger",
  "IT",
  "Sonstiges",
] as const;
export type Role = (typeof ROLE_OPTIONS)[number];

export type DemoFormValues = Record<DemoField, string>;

export const EMPTY_VALUES: DemoFormValues = {
  name: "",
  school: "",
  email: "",
  role: "",
  message: "",
};

/** Obergrenzen. Schuetzen die Weiterverarbeitung vor uebergrossen Eingaben. */
const LIMITS = {
  name: 100,
  school: 150,
  email: 254,
  message: 2000,
} as const;

/**
 * Pragmatische E-Mail-Pruefung: genau ein @, kein Leerraum, Punkt in der
 * Domain. Eine vollstaendige RFC-5322-Pruefung ist weder moeglich noch
 * sinnvoll – ob die Adresse existiert, zeigt erst die Zustellung.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationResult =
  | { ok: true; values: DemoFormValues }
  | { ok: false; fieldErrors: Partial<Record<DemoField | "consent", string>> };

export function validateDemoRequest(form: {
  name: string;
  school: string;
  email: string;
  role: string;
  message: string;
  consent: boolean;
}): ValidationResult {
  const fieldErrors: Partial<Record<DemoField | "consent", string>> = {};

  const name = form.name.trim();
  const school = form.school.trim();
  const email = form.email.trim();
  const role = form.role.trim();
  const message = form.message.trim();

  if (name.length < 2) {
    fieldErrors.name = "Bitte geben Sie Ihren Namen an.";
  } else if (name.length > LIMITS.name) {
    fieldErrors.name = `Der Name darf höchstens ${LIMITS.name} Zeichen lang sein.`;
  }

  if (school.length < 2) {
    fieldErrors.school = "Bitte geben Sie Ihre Schule an.";
  } else if (school.length > LIMITS.school) {
    fieldErrors.school = `Der Schulname darf höchstens ${LIMITS.school} Zeichen lang sein.`;
  }

  if (email.length === 0) {
    fieldErrors.email = "Bitte geben Sie Ihre dienstliche E-Mail-Adresse an.";
  } else if (email.length > LIMITS.email) {
    fieldErrors.email = "Die E-Mail-Adresse ist zu lang.";
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Diese E-Mail-Adresse scheint nicht vollständig zu sein.";
  }

  // Rolle ist optional; wenn gesetzt, muss sie aus der Liste stammen.
  if (role.length > 0 && !ROLE_OPTIONS.includes(role as Role)) {
    fieldErrors.role = "Bitte wählen Sie eine der angebotenen Rollen.";
  }

  if (message.length > LIMITS.message) {
    fieldErrors.message = `Die Nachricht darf höchstens ${LIMITS.message} Zeichen lang sein.`;
  }

  if (!form.consent) {
    fieldErrors.consent =
      "Ohne diese Einwilligung können wir Ihre Anfrage nicht bearbeiten.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, values: { name, school, email, role, message } };
}
