import { SOURCE_LABELS, type DemoFormValues, type SourceValue } from "@/lib/demo/schema";

/**
 * Versand der Demo-Anfrage über die Brevo-API (EU-Anbieter).
 *
 * SICHERHEIT – BREVO_API_KEY:
 * Der Schlüssel wird ausschliesslich hier gelesen. Diese Datei wird nur aus
 * einer "use server"-Datei importiert und landet damit nie im Client-Bundle.
 * Der Name traegt bewusst KEIN NEXT_PUBLIC_-Praefix – Next.js inlined nur so
 * praefixierte Variablen in den Browser-Code. Nach jedem Build gegenpruefen:
 *
 *   grep -r "BREVO_API_KEY" .next/static
 *
 * Keine Ausgabe = der Schluessel ist nicht im ausgelieferten JavaScript.
 *
 * Der Schluessel darf ausserdem niemals in eine Fehlermeldung geraten, die den
 * Client erreicht. Fehler werden hier geloggt und nach aussen nur als
 * generischer Status zurueckgegeben.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/**
 * Ersatz-Endpunkt für den Formular-Test – NUR auf dem eigenen Rechner.
 *
 * Der Test muss einen Mailversand erzeugen können, der FEHLSCHLÄGT, obwohl er
 * eingerichtet ist. Genau dieser Fall war der gemeldete Fehler, und er ließ
 * sich vorher nicht nachstellen, ohne Brevo wirklich anzurufen.
 *
 * DIE ADRESSE WIRD GEPRÜFT, NICHT GEGLAUBT: Angenommen wird sie nur, wenn sie
 * auf 127.0.0.1 oder localhost zeigt. Eine Umgebungsvariable, die den
 * Mailversand irgendwohin umlenken könnte, wäre ein Weg, Formulardaten
 * abfließen zu lassen – mit dieser Schranke geht das nicht, auch nicht
 * versehentlich in einem Deployment.
 */
function endpunkt(): string {
  const ersatz = process.env.BREVO_ENDPOINT_LOCAL;
  if (!ersatz) return BREVO_ENDPOINT;
  try {
    const adresse = new URL(ersatz);
    if (adresse.hostname === "127.0.0.1" || adresse.hostname === "localhost") {
      return ersatz;
    }
    console.error("[mail] Ersatz-Endpunkt ignoriert: liegt nicht auf diesem Rechner.");
  } catch {
    console.error("[mail] Ersatz-Endpunkt ignoriert: keine gültige Adresse.");
  }
  return BREVO_ENDPOINT;
}

export type SendResult =
  { ok: true; dryRun: boolean } | { ok: false; reason: "not-configured" | "send-failed" };

/** Schuetzt vor HTML-Injection in der Benachrichtigungs-Mail. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(values: DemoFormValues, source: SourceValue) {
  const rows: [string, string][] = [
    ["Herkunft", SOURCE_LABELS[source]],
    ["Name", values.name],
    ["Schule", values.school],
    ["E-Mail", values.email],
    ["Rolle", values.role || "– keine Angabe –"],
    ["Nachricht", values.message || "– keine Nachricht –"],
  ];

  return [
    `<h1>Neue Anfrage: ${escapeHtml(SOURCE_LABELS[source])}</h1>`,
    "<table>",
    ...rows.map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    ),
    "</table>",
  ].join("");
}

export async function sendDemoRequest(
  values: DemoFormValues,
  source: SourceValue = "demo",
): Promise<SendResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const mailTo = process.env.DEMO_MAIL_TO;
  const senderEmail = process.env.DEMO_MAIL_FROM;
  // Nur fuer die lokale Entwicklung: ueberspringt den echten Versand.
  const dryRun = process.env.DEMO_DRY_RUN === "true";

  if (dryRun) {
    console.info(
      "[demo] DEMO_DRY_RUN=true – Anfrage wird NICHT versendet:",
      JSON.stringify({ ...values, source, email: "<gekürzt>" }),
    );
    return { ok: true, dryRun: true };
  }

  // Fail closed: ohne vollstaendige Konfiguration wird nichts versendet und
  // der Nutzerin auch kein Erfolg vorgetaeuscht.
  if (!apiKey || !mailTo || !senderEmail) {
    console.error(
      "[demo] Versand nicht konfiguriert. Fehlend:",
      [
        !apiKey && "BREVO_API_KEY",
        !mailTo && "DEMO_MAIL_TO",
        !senderEmail && "DEMO_MAIL_FROM",
      ]
        .filter(Boolean)
        .join(", "),
    );
    return { ok: false, reason: "not-configured" };
  }

  const begonnen = Date.now();

  try {
    const response = await fetch(endpunkt(), {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: "Website-Formular" },
        to: [{ email: mailTo }],
        // Antworten gehen direkt an die anfragende Person.
        replyTo: { email: values.email, name: values.name },
        subject: `${SOURCE_LABELS[source]}: ${values.school}`,
        htmlContent: buildHtml(values, source),
      }),
    });

    const dauer = Date.now() - begonnen;

    if (!response.ok) {
      // Bewusst ohne Antwortkoerper im Log-Text: Brevo spiegelt in
      // Fehlerfaellen Teile der Anfrage, und der Schluessel steht im Header.
      //
      // Status UND Dauer, weil beides die Diagnose traegt: 401 heisst
      // Schluessel, 400 heisst meist unbestaetigter Absender, eine lange
      // Dauer ohne Status heisst Netz. Wer den Grund im Vercel-Log ablesen
      // kann, muss ihn nicht erraten.
      console.error(`[mail] Versand abgelehnt: Status ${response.status}, ${dauer} ms`);
      return { ok: false, reason: "send-failed" };
    }

    console.info(`[mail] Versand angenommen: Status ${response.status}, ${dauer} ms`);
    return { ok: true, dryRun: false };
  } catch (error) {
    const dauer = Date.now() - begonnen;
    // Nur der Fehlertyp, nicht die Meldung: Netzwerkfehler von fetch nennen
    // im Text die Zieladresse, und in der Adresse steckt der Anbieter.
    const art = error instanceof Error ? error.name : "unbekannt";
    console.error(`[mail] Versand fehlgeschlagen: ${art} nach ${dauer} ms`);
    return { ok: false, reason: "send-failed" };
  }
}
