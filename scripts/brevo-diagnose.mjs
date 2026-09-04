/**
 * Diagnose des Mailversands – ein Anruf bei Brevo, ohne Deployment.
 *
 * Aufruf:
 *   npm run diagnose:brevo
 *
 * Liest BREVO_API_KEY, DEMO_MAIL_FROM und DEMO_MAIL_TO aus .env.local und
 * schickt EINE Testmail über dieselbe API, die die Website benutzt. Gemeldet
 * werden Status und Fehlerkörper – und daraus die Handlungsanweisung.
 *
 * ==========================================================================
 * DER SCHLÜSSEL TAUCHT IN KEINER AUSGABE AUF
 * ==========================================================================
 * Nicht gekürzt, nicht maskiert, nicht als „endet auf …". Vor jeder Ausgabe
 * läuft `ohneGeheimnis()` über den Text und ersetzt den Schlüssel, falls
 * Brevo ihn in einer Fehlermeldung zurückspiegelt. Gemeldet wird nur seine
 * Länge – die reicht, um „leer", „abgeschnitten" und „gesetzt" zu trennen.
 *
 * ==========================================================================
 * DAS HIER VERSCHICKT WIRKLICH EINE MAIL
 * ==========================================================================
 * Wenn der Schlüssel gültig ist, liegt danach eine Testmail in DEMO_MAIL_TO.
 * Das ist der Zweck: Ein Versand, der nicht wirklich versendet, beweist
 * nichts über einen Versand, der nicht funktioniert.
 */
import fs from "node:fs";

const ENDPUNKT = "https://api.brevo.com/v3/smtp/email";
const DATEI = ".env.local";

/* ========================================================================= */
/* .env.local lesen – ohne Zusatzpaket                                       */
/* ========================================================================= */
function leseUmgebung(pfad) {
  if (!fs.existsSync(pfad)) return null;
  const werte = {};
  for (const zeile of fs.readFileSync(pfad, "utf8").split(/\r?\n/)) {
    const roh = zeile.trim();
    if (roh.length === 0 || roh.startsWith("#")) continue;
    const teiler = roh.indexOf("=");
    if (teiler < 1) continue;
    const name = roh.slice(0, teiler).trim();
    let wert = roh.slice(teiler + 1).trim();
    if (
      (wert.startsWith('"') && wert.endsWith('"')) ||
      (wert.startsWith("'") && wert.endsWith("'"))
    ) {
      wert = wert.slice(1, -1);
    }
    werte[name] = wert;
  }
  return werte;
}

const umgebung = leseUmgebung(DATEI);

if (!umgebung) {
  console.error(`\n  ${DATEI} existiert nicht.`);
  console.error("  Erwartet werden dort drei Zeilen:\n");
  console.error("    BREVO_API_KEY=…");
  console.error("    DEMO_MAIL_FROM=absender@ihre-domain.de");
  console.error("    DEMO_MAIL_TO=empfaenger@ihre-domain.de\n");
  process.exit(2);
}

const schluessel = umgebung.BREVO_API_KEY || process.env.BREVO_API_KEY || "";
const absender = umgebung.DEMO_MAIL_FROM || process.env.DEMO_MAIL_FROM || "";
const empfaenger = umgebung.DEMO_MAIL_TO || process.env.DEMO_MAIL_TO || "";

/** Ersetzt den Schlüssel in beliebigem Text, falls er zurückgespiegelt wird. */
const ohneGeheimnis = (text) =>
  schluessel.length > 0
    ? String(text).split(schluessel).join("<SCHLÜSSEL>")
    : String(text);

console.log("\n  === Konfiguration ===");
console.log(
  `  BREVO_API_KEY    ${schluessel ? `gesetzt (${schluessel.length} Zeichen)` : "FEHLT"}`,
);
console.log(`  DEMO_MAIL_FROM   ${absender || "FEHLT"}`);
console.log(`  DEMO_MAIL_TO     ${empfaenger || "FEHLT"}`);

const fehlend = [
  !schluessel && "BREVO_API_KEY",
  !absender && "DEMO_MAIL_FROM",
  !empfaenger && "DEMO_MAIL_TO",
].filter(Boolean);

if (fehlend.length > 0) {
  console.error(`\n  ERGEBNIS: unvollständig – es fehlt ${fehlend.join(", ")}.`);
  console.error("  Ohne diese Werte kann die Website keine Mail verschicken.\n");
  process.exit(2);
}

/* ========================================================================= */
/* Der Anruf                                                                 */
/* ========================================================================= */
console.log("\n  === Testversand ===");
const begonnen = Date.now();

let antwort;
let koerper = "";
try {
  antwort = await fetch(ENDPUNKT, {
    method: "POST",
    headers: {
      "api-key": schluessel,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: absender, name: "Website-Diagnose" },
      to: [{ email: empfaenger }],
      subject: "Selyvi – Diagnose des Mailversands",
      htmlContent:
        "<p>Diese Mail stammt aus <code>npm run diagnose:brevo</code>. " +
        "Wenn sie ankommt, ist der Versandweg der Website in Ordnung.</p>",
    }),
  });
  koerper = await antwort.text();
} catch (fehler) {
  const dauer = Date.now() - begonnen;
  console.error(`  Kein Kontakt zur API nach ${dauer} ms: ${fehler.name}`);
  console.error("\n  ERGEBNIS: Netzwerk oder DNS – nicht der Schlüssel.");
  console.error("  Handlungsanweisung: Verbindung prüfen, danach erneut.\n");
  process.exit(1);
}

const dauer = Date.now() - begonnen;
console.log(`  Status:  ${antwort.status} ${antwort.statusText}`);
console.log(`  Dauer:   ${dauer} ms`);
console.log(`  Körper:  ${ohneGeheimnis(koerper).slice(0, 600) || "(leer)"}`);

/* ========================================================================= */
/* Die Deutung – das ist der eigentliche Zweck                               */
/* ========================================================================= */
const kleinKoerper = koerper.toLowerCase();

console.log("\n  === Ergebnis ===");

if (antwort.ok) {
  console.log("  Der Versandweg funktioniert. Eine Testmail liegt in DEMO_MAIL_TO.");
  console.log("  Handlungsanweisung: keine. Wenn das Formular trotzdem meldete,");
  console.log("  lag es an einem anderen Kanal – siehe [formular]-Zeilen im Log.\n");
  process.exit(0);
}

if (antwort.status === 401) {
  console.error("  401 – der Schlüssel wird abgelehnt: ungültig, rotiert oder gelöscht.");
  console.error("  HANDLUNGSANWEISUNG FÜR DEN BREVO-ACCOUNT:");
  console.error("    Brevo → SMTP & API → API-Schlüssel: neuen v3-Schlüssel erzeugen,");
  console.error("    in Vercel unter BREVO_API_KEY eintragen (nur dort, nie im Code),");
  console.error("    Deployment neu ausrollen.\n");
  process.exit(1);
}

if (antwort.status === 400 && kleinKoerper.includes("sender")) {
  console.error(
    "  400 mit Absender-Bezug – DEMO_MAIL_FROM ist nicht (mehr) verifiziert.",
  );
  console.error("  HANDLUNGSANWEISUNG FÜR DEN BREVO-ACCOUNT:");
  console.error(`    Brevo → Senders, Domains & Dedicated IPs: ${absender} als Absender`);
  console.error("    verifizieren (oder die Domain authentifizieren), dann erneut.\n");
  process.exit(1);
}

if (
  antwort.status === 402 ||
  kleinKoerper.includes("limit") ||
  kleinKoerper.includes("credit")
) {
  console.error("  Konto- oder Kontingentgrenze erreicht.");
  console.error("  HANDLUNGSANWEISUNG FÜR DEN BREVO-ACCOUNT:");
  console.error("    Brevo → Plan/Guthaben prüfen: Tageslimit ausgeschöpft oder");
  console.error(
    "    Guthaben aufgebraucht. Bis dahin trägt der CRM-Kanal die Anfragen.\n",
  );
  process.exit(1);
}

console.error(`  ${antwort.status} – nicht eindeutig zuzuordnen.`);
console.error("  HANDLUNGSANWEISUNG: den Körper oben an Brevo-Support geben.");
console.error("  Er enthält keinen Schlüssel.\n");
process.exit(1);
