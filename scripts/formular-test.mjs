/**
 * Formular-Pfad im Browser – der Test, den scripts/smoke-test.mjs nicht
 * leisten kann.
 *
 * Aufruf (setzt einen vorhandenen Build voraus):
 *   npm run build
 *   npm run test:formular
 *
 * ==========================================================================
 * WAS HIER BEWIESEN WIRD
 * ==========================================================================
 * Vier Kanal-Kombinationen. Die Anfrage gilt als angekommen, sobald EINER
 * der beiden Wege sie bestätigt hat:
 *
 *   A  beide in Ordnung   -> Bestätigung, CRM hat Header und Felder,
 *                            Mail ist raus, KEIN Teil-Ausfall im Log.
 *   B  nur CRM trägt      -> Bestätigung. DER GEMELDETE FEHLER: Vorher stand
 *                            hier „konnte nicht übermittelt werden",
 *                            obwohl die Anfrage im CRM lag.
 *   C  nur Mail trägt     -> Bestätigung, CRM-Fehler im Log.
 *   D  beide tot          -> Fehlermeldung. Nur dann.
 *
 * Dazu die Zustände, die kein Kanal erzeugt (E): Validierungsfehler,
 * stille Bestätigung nach Honeypot, Zeitüberschreitung des CRM,
 * Rate-Limit-Hinweis.
 *
 * Jeder sichtbare Text aus diesen Zuständen läuft am Ende durch dieselben
 * Ton-Muster wie die ausgelieferten Seiten (scripts/ton-muster.mjs). Diese
 * Sätze stehen in keinem HTML – sie entstehen erst, wenn etwas schiefgeht,
 * und wurden deshalb nie geprüft.
 *
 * ==========================================================================
 * KEIN DEMO_DRY_RUN MEHR
 * ==========================================================================
 * Der Trockenlauf ließ den Mailversand IMMER gelingen. Damit war der Fall,
 * um den es hier geht – eingerichteter Versand, der fehlschlägt –, gar nicht
 * erreichbar. Stattdessen läuft ein Schein-Brevo auf 127.0.0.1, dessen
 * Antwort der Test setzt (202 oder 401). Nach außen geht dabei nichts:
 * brevo.ts nimmt einen Ersatz-Endpunkt nur an, wenn er auf dem eigenen
 * Rechner liegt.
 *
 * Der Test startet seinen eigenen `next start` auf einem eigenen Port und
 * räumt ihn wieder ab. Ein laufender Entwicklungsserver stört nicht.
 *
 * Keine zusätzlichen Pakete: CDP über die eingebauten `fetch` und `WebSocket`,
 * der Schein-Endpunkt über `node:http`.
 */
import { spawn } from "node:child_process";
import http from "node:http";

import { pruefeTon } from "./ton-muster.mjs";

const EDGE =
  process.env.EDGE_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const APP_PORT = 3311;
const CRM_PORT = 3312;
const MAIL_PORT = 3314;
const CDP_PORT = 9393;

/** Adresse, an der garantiert nichts lauscht – Port 1 auf dem Loopback. */
const TOTE_ADRESSE = "http://127.0.0.1:1/inbound";

const TEST_KEY = "test-schluessel-nur-lokal";
/** Erfundener Mail-Schlüssel. Er geht nur an den Schein-Endpunkt auf 127.0.0.1. */
const TEST_MAIL_KEY = "test-mailschluessel-nur-lokal";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Prozess samt Kindern beenden – und warten, bis der Port wirklich frei ist.
 *
 * WARUM DAS NICHT `kind.kill()` SEIN DARF:
 * Unter Windows startet `spawn(..., { shell: true })` erst eine Shell, die
 * dann `node` startet. `kill()` beendet die Shell; der Server läuft weiter.
 * Beim zweiten Durchlauf hat die Bereitschaftsprüfung dann den ALTEN Server
 * gefunden, der noch auf das erreichbare Schein-CRM zeigte – Durchlauf B hat
 * damit nicht geprüft, was er zu prüfen behauptet. Der Test hat das selbst
 * gemeldet („der Schein-Endpunkt bekam nichts" schlug fehl), und genau dafür
 * ist die Zusatzprüfung da.
 */
async function beende(kind) {
  if (!kind) return;
  if (process.platform === "win32") {
    await new Promise((r) => {
      spawn("taskkill", ["/pid", String(kind.pid), "/T", "/F"], {
        stdio: "ignore",
      }).on("close", r);
    });
  } else {
    kind.kill("SIGTERM");
  }
}

/** Wartet, bis auf dem Port niemand mehr antwortet. */
async function portFrei(port) {
  for (let i = 0; i < 40; i++) {
    try {
      await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(400) });
    } catch {
      return true;
    }
    await sleep(300);
  }
  return false;
}

let probleme = 0;
const pruefe = (bedingung, text) => {
  console.log(`  ${bedingung ? "ok    " : "FEHLER"}  ${text}`);
  if (!bedingung) probleme++;
};

/* ========================================================================= */
/* Schein-CRM                                                                */
/* ========================================================================= */
function starteScheinCrm() {
  const empfangen = [];
  const server = http.createServer((req, res) => {
    // Ein Pfad, der NIE antwortet. Damit lässt sich die Fünf-Sekunden-Grenze
    // aus crm.ts erzwingen – ein Ausfall, der nicht als Verbindungsfehler
    // ankommt, sondern als Zeitüberschreitung. Beides führt zum selben
    // Ergebnis für den Besucher, aber zu verschiedenen Zeilen im Log, und
    // nur die zweite beweist, dass die Grenze überhaupt greift.
    if (req.url && req.url.startsWith("/haengt")) return;

    let body = "";
    req.on("data", (teil) => (body += teil));
    req.on("end", () => {
      empfangen.push({
        method: req.method,
        key: req.headers["x-website-key"],
        contentType: req.headers["content-type"],
        body: (() => {
          try {
            return JSON.parse(body);
          } catch {
            return null;
          }
        })(),
      });
      res.writeHead(202, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    });
  });
  return new Promise((resolve) => {
    server.listen(CRM_PORT, "127.0.0.1", () => resolve({ server, empfangen }));
  });
}

/* ========================================================================= */
/* Schein-Brevo                                                              */
/* ========================================================================= */
/**
 * Ein Mailversand, dessen Antwort der Test bestimmt.
 *
 * 202 = angenommen, 401 = Schlüssel abgelehnt. Der zweite Fall ist der
 * gemeldete Fehler: ein EINGERICHTETER Versand, der scheitert. Ohne diesen
 * Mock ließe er sich nur nachstellen, indem man Brevo wirklich anruft.
 *
 * brevo.ts nimmt diesen Endpunkt nur an, weil er auf 127.0.0.1 liegt.
 */
function starteScheinMail() {
  const empfangen = [];
  let status = 202;
  const server = http.createServer((req, res) => {
    let body = "";
    req.on("data", (teil) => (body += teil));
    req.on("end", () => {
      empfangen.push({
        method: req.method,
        key: req.headers["api-key"],
        body: (() => {
          try {
            return JSON.parse(body);
          } catch {
            return null;
          }
        })(),
      });
      if (status >= 400) {
        res.writeHead(status, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Key not found", code: "unauthorized" }));
        return;
      }
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify({ messageId: "<test@example.org>" }));
    });
  });
  return new Promise((resolve) => {
    server.listen(MAIL_PORT, "127.0.0.1", () =>
      resolve({
        server,
        empfangen,
        setzeStatus: (neu) => {
          status = neu;
        },
      }),
    );
  });
}

/* ========================================================================= */
/* Anwendung                                                                 */
/* ========================================================================= */
/**
 * Startet die Anwendung mit einer bestimmten Kanal-Lage.
 *
 * `crmUrl` und `mailUrl` bestimmen, welcher Weg trägt und welcher scheitert.
 * DEMO_DRY_RUN ist bewusst NICHT gesetzt: Der Trockenlauf hätte den
 * Mailversand immer gelingen lassen, und genau der Fall, um den es geht –
 * eingerichteter Versand, der fehlschlägt – wäre unerreichbar geblieben.
 */
async function starteApp({ crmUrl, mailUrl }) {
  const kind = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["--no-install", "next", "start", "-p", String(APP_PORT)],
    {
      env: {
        ...process.env,
        CRM_INBOUND_URL: crmUrl,
        WEBSITE_INBOUND_KEY: TEST_KEY,
        // Der Ersatz-Endpunkt wird von brevo.ts nur angenommen, weil er auf
        // 127.0.0.1 zeigt – siehe die Schranke dort.
        BREVO_ENDPOINT_LOCAL: mailUrl,
        BREVO_API_KEY: TEST_MAIL_KEY,
        DEMO_MAIL_FROM: "test-absender@example.org",
        DEMO_MAIL_TO: "test-empfaenger@example.org",
      },
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
    },
  );

  const logs = [];
  kind.stdout.on("data", (d) => logs.push(String(d)));
  kind.stderr.on("data", (d) => logs.push(String(d)));

  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${APP_PORT}/demo`);
      if (res.status === 200) return { kind, logs };
    } catch {}
    await sleep(500);
  }
  throw new Error("Anwendung startet nicht:\n" + logs.join(""));
}
/* ========================================================================= */
/* Browser                                                                   */
/* ========================================================================= */
async function starteBrowser() {
  const kind = spawn(EDGE, [
    "--headless",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${(process.env.TEMP || "/tmp").split("\\").join("/")}/claude/edge-formular`,
    "about:blank",
  ]);

  let ziel = null;
  for (let i = 0; i < 60; i++) {
    try {
      const liste = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
      ziel = liste.find((x) => x.type === "page");
      if (ziel) break;
    } catch {}
    await sleep(300);
  }
  if (!ziel) throw new Error("Browser startet nicht");

  const ws = new WebSocket(ziel.webSocketDebuggerUrl);
  let id = 0;
  const offen = new Map();
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && offen.has(m.id)) {
      offen.get(m.id)(m.result);
      offen.delete(m.id);
    }
  };
  const send = (methode, params) =>
    new Promise((r) => {
      const i = ++id;
      offen.set(i, r);
      ws.send(JSON.stringify({ id: i, method: methode, params: params || {} }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  const lies = async (ausdruck) =>
    (await send("Runtime.evaluate", { expression: ausdruck, returnByValue: true })).result
      ?.value;

  return { kind, send, lies };
}
const AUSFUELLEN = `(() => {
  const setzeText = (el, wert) => {
    const proto = el.tagName === 'TEXTAREA'
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, wert);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };
  const feld = (name) => document.querySelector('[name="' + name + '"]');

  setzeText(feld('name'), 'Testerin Formularpfad');
  setzeText(feld('school'), 'Musterschule Formularpfad');
  setzeText(feld('email'), 'formularpfad@example.org');
  setzeText(feld('message'), 'Automatischer Test der CRM-Übergabe.');

  const rolle = feld('role');
  Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value')
    .set.call(rolle, 'Schulleitung');
  rolle.dispatchEvent(new Event('change', { bubbles: true }));

  const zustimmung = feld('consent');
  if (!zustimmung.checked) zustimmung.click();
  return true;
})()`;

const ABSENDEN = `(() => {
  const knopf = [...document.querySelectorAll('button[type="submit"]')][0];
  if (!knopf) return 'kein Absende-Knopf';
  knopf.click();
  return 'geklickt';
})()`;
/** Setzt das Honeypot-Feld – für Menschen unsichtbar, für Bots verlockend. */
const HONEYPOT_FUELLEN = `(() => {
  const el = document.querySelector('[name="website"]');
  if (!el) return 'kein Honeypot-Feld';
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
    .set.call(el, 'http://bot.example');
  el.dispatchEvent(new Event('input', { bubbles: true }));
  return 'gesetzt';
})()`;

/**
 * Schickt das Formular ab und gibt zurück, WAS die Person danach liest.
 *
 * Der Rückgabewert unterscheidet drei Ausgänge, nicht zwei: „erfolg",
 * „fehler" und „nichts" (die Seite steht noch da). Ein Test, der nur auf
 * „Danke" prüft, kann einen Fehlerzustand nicht von einem Hänger trennen.
 */
async function absenden(browser, url, optionen = {}) {
  const { lies, send } = browser;
  const { fuellen = true, honeypot = false, warten = 3600 } = optionen;

  await send("Page.navigate", {
    url: `http://127.0.0.1:${APP_PORT}${url}?utm_source=newsletter&utm_medium=email&utm_campaign=schulleitung-2026`,
  });
  await sleep(2500);

  if (fuellen) await lies(AUSFUELLEN);
  if (honeypot) await lies(HONEYPOT_FUELLEN);

  // MIN_FILL_MS ist 3000 ms. Wer schneller abschickt, wird als Skript
  // behandelt und bekommt eine stille Erfolgsmeldung OHNE Versand – der Test
  // würde dann grün leuchten, ohne irgendetwas bewiesen zu haben.
  await sleep(warten);

  await lies(ABSENDEN);

  let sichtbar = "";
  let meldung = "";
  for (let i = 0; i < 30; i++) {
    await sleep(400);
    sichtbar = (await lies("document.querySelector('main').innerText")) || "";
    meldung =
      (await lies("document.querySelector('[role=\"alert\"]')?.innerText || ''")) || "";
    if (/Danke für Ihre Anfrage/.test(sichtbar) || meldung.length > 0) break;
  }

  const art = /Danke für Ihre Anfrage/.test(sichtbar)
    ? "erfolg"
    : meldung.length > 0
      ? "fehler"
      : "nichts";

  return { art, meldung: meldung.replace(/\s+/g, " ").trim(), sichtbar };
}

/* ========================================================================= */
/* Ton-Prüfung der Formular-Zustände                                         */
/* ========================================================================= */
/**
 * Jeder Text, den ein Mensch in einem Formular-Zustand liest, wird gesammelt
 * und am Ende gegen dieselben Muster geprüft wie die ausgelieferten Seiten.
 *
 * WARUM DAS HIERHIN GEHÖRT UND NICHT IN DEN SMOKE-TEST: Diese Sätze stehen
 * in keinem HTML. Sie entstehen erst, wenn etwas schiefgeht – und wurden
 * deshalb nie geprüft. Erzwungen werden sie mit Mock-Endpunkten, nicht
 * erhofft.
 */
const ZUSTAENDE = [];
const merkeZustand = (name, text) => {
  if (text && text.trim().length > 0) ZUSTAENDE.push({ name, text: text.trim() });
};

/* ========================================================================= */
/* Ablauf                                                                    */
/* ========================================================================= */
/**
 * Belegte Ports sind ein ABBRUCH, kein Hinweis.
 *
 * Ohne diese Prüfung hängt sich der Test an einen fremden Prozess: Die
 * Bereitschaftsprüfung sieht eine 200 auf dem Port, der eigene `next start`
 * stirbt still an EADDRINUSE, und gemessen wird ein Server mit einer ganz
 * anderen Konfiguration. Genau so ist ein Durchlauf einmal grün geworden, der
 * nichts geprüft hat. Lieber laut abbrechen.
 */
for (const port of [APP_PORT, CRM_PORT, MAIL_PORT, CDP_PORT]) {
  try {
    await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(500) });
    console.error(
      `Port ${port} ist belegt. Der Test würde einen fremden Prozess messen.\n` +
        "Bitte den Prozess auf diesem Port beenden und erneut starten.",
    );
    process.exit(1);
  } catch {
    // Keine Antwort = frei. Genau so soll es sein.
  }
}

console.log("Formular: vier Kanal-Kombinationen und die erzwungenen Zustände\n");

const crmMock = await starteScheinCrm();
const mailMock = await starteScheinMail();
const { empfangen } = crmMock;

let app = null;
let browser = null;

const CRM_LEBT = `http://127.0.0.1:${CRM_PORT}/api/inbound/website-lead`;
const MAIL_LEBT = `http://127.0.0.1:${MAIL_PORT}/v3/smtp/email`;

try {
  /* ================================================================== A */
  console.log("=== A · beide Kanäle in Ordnung ===");
  mailMock.setzeStatus(202);
  app = await starteApp({ crmUrl: CRM_LEBT, mailUrl: MAIL_LEBT });
  browser = await starteBrowser();

  let lauf = await absenden(browser, "/demo");
  pruefe(lauf.art === "erfolg", `A: Bestätigung sichtbar (${lauf.art})`);
  merkeZustand("A · Erfolgsmeldung", lauf.sichtbar);
  await sleep(500);

  pruefe(empfangen.length === 1, `A: genau eine CRM-Anfrage (${empfangen.length})`);
  pruefe(
    mailMock.empfangen.length === 1,
    `A: genau eine Mail (${mailMock.empfangen.length})`,
  );

  const anfrage = empfangen[0];
  if (anfrage) {
    pruefe(anfrage.method === "POST", "A: Methode POST");
    pruefe(anfrage.key === TEST_KEY, "A: Header X-Website-Key gesetzt");
    pruefe(
      (anfrage.contentType || "").startsWith("application/json"),
      "A: content-type application/json",
    );
    const b = anfrage.body || {};
    pruefe(b.source === "demo", `A: source = demo (${b.source})`);
    pruefe(b.name === "Testerin Formularpfad", "A: name übergeben");
    pruefe(b.email === "formularpfad@example.org", "A: email übergeben");
    pruefe(b.organisation === "Musterschule Formularpfad", "A: organisation übergeben");
    pruefe(b.role === "Schulleitung", `A: role übergeben (${b.role})`);
    pruefe(typeof b.message === "string" && b.message.length > 0, "A: message übergeben");
    pruefe(b.page_path === "/demo", `A: page_path (${b.page_path})`);
    pruefe(b.utm_source === "newsletter", `A: utm_source (${b.utm_source})`);
    pruefe(b.utm_medium === "email", `A: utm_medium (${b.utm_medium})`);
    pruefe(b.utm_campaign === "schulleitung-2026", `A: utm_campaign (${b.utm_campaign})`);
    pruefe("referrer" in b, "A: Feld referrer vorhanden");
  }

  // Zweite Quelle: /mitgestalten schickt dasselbe Formular mit anderem source.
  lauf = await absenden(browser, "/mitgestalten");
  pruefe(lauf.art === "erfolg", `A: /mitgestalten bestätigt (${lauf.art})`);
  await sleep(500);
  const zweite = empfangen[1];
  pruefe(zweite?.body?.source === "mitgestalten", "A: source = mitgestalten");
  pruefe(zweite?.body?.page_path === "/mitgestalten", "A: page_path = /mitgestalten");

  let log = app.logs.join("");
  pruefe(
    !log.includes("[formular] Teil-Ausfall"),
    "A: kein Teil-Ausfall im Log – beide Wege trugen",
  );

  await beende(browser.kind);
  await beende(app.kind);
  pruefe(await portFrei(APP_PORT), "A: Server wirklich beendet, Port frei");

  /* ================================================================== B */
  /* DER GEMELDETE FEHLER. Die Mail scheitert, das CRM nimmt an – und der
     Besucher muss trotzdem eine Bestätigung sehen. Vorher stand hier
     „konnte nicht übermittelt werden", obwohl die Anfrage längst da war. */
  console.log("\n=== B · nur das CRM trägt (Mail antwortet 401) ===");
  mailMock.setzeStatus(401);
  const vorherB = empfangen.length;
  app = await starteApp({ crmUrl: CRM_LEBT, mailUrl: MAIL_LEBT });
  browser = await starteBrowser();

  lauf = await absenden(browser, "/demo");
  pruefe(lauf.art === "erfolg", `B: Bestätigung trotz totem Mailversand (${lauf.art})`);
  merkeZustand("B · Erfolgsmeldung bei totem Mailversand", lauf.sichtbar);
  await sleep(500);

  pruefe(empfangen.length === vorherB + 1, "B: das CRM hat die Anfrage bekommen");
  log = app.logs.join("");
  pruefe(
    /\[mail\] Versand abgelehnt: Status 401, \d+ ms/.test(log),
    "B: Mailfehler mit Status und Dauer geloggt",
  );
  pruefe(
    log.includes("[formular] Teil-Ausfall: mail=fehlgeschlagen, crm=ok"),
    "B: Teil-Ausfall benannt",
  );
  pruefe(!log.includes(TEST_MAIL_KEY), "B: der Mail-Schlüssel steht NICHT im Log");
  pruefe(!log.includes(TEST_KEY), "B: der CRM-Schlüssel steht NICHT im Log");

  await beende(browser.kind);
  await beende(app.kind);
  pruefe(await portFrei(APP_PORT), "B: Server wirklich beendet, Port frei");

  /* ================================================================== C */
  console.log("\n=== C · nur die Mail trägt (CRM nicht erreichbar) ===");
  mailMock.setzeStatus(202);
  const vorherC = empfangen.length;
  const mailVorherC = mailMock.empfangen.length;
  app = await starteApp({ crmUrl: TOTE_ADRESSE, mailUrl: MAIL_LEBT });
  browser = await starteBrowser();

  lauf = await absenden(browser, "/demo");
  pruefe(lauf.art === "erfolg", `C: Bestätigung trotz totem CRM (${lauf.art})`);
  await sleep(500);

  pruefe(empfangen.length === vorherC, "C: der Schein-Endpunkt bekam nichts");
  pruefe(mailMock.empfangen.length === mailVorherC + 1, "C: die Mail ging raus");
  log = app.logs.join("");
  pruefe(log.includes("[crm] Übergabe fehlgeschlagen"), "C: CRM-Fehler geloggt");
  pruefe(
    log.includes("[formular] Teil-Ausfall: mail=ok, crm=fehlgeschlagen"),
    "C: Teil-Ausfall benannt",
  );
  pruefe(!log.includes(TEST_KEY), "C: der Schlüssel steht NICHT im Log");

  await beende(browser.kind);
  await beende(app.kind);
  pruefe(await portFrei(APP_PORT), "C: Server wirklich beendet, Port frei");

  /* ================================================================== D */
  console.log("\n=== D · beide Kanäle tot ===");
  mailMock.setzeStatus(401);
  const vorherD = empfangen.length;
  app = await starteApp({ crmUrl: TOTE_ADRESSE, mailUrl: MAIL_LEBT });
  browser = await starteBrowser();

  lauf = await absenden(browser, "/demo");
  pruefe(lauf.art === "fehler", `D: Fehlermeldung sichtbar (${lauf.art})`);
  pruefe(
    lauf.meldung.includes("konnte gerade nicht übermittelt werden"),
    `D: Wortlaut der Fehlermeldung („${lauf.meldung.slice(0, 60)}…")`,
  );
  merkeZustand("D · Fehlermeldung, beide Kanäle tot", lauf.meldung);
  await sleep(500);

  pruefe(empfangen.length === vorherD, "D: das CRM bekam nichts");
  log = app.logs.join("");
  pruefe(
    log.includes("[formular] Beide Kanäle gescheitert"),
    "D: beide Ausfälle in einer Zeile benannt",
  );

  await beende(browser.kind);
  await beende(app.kind);
  pruefe(await portFrei(APP_PORT), "D: Server wirklich beendet, Port frei");

  /* ================================================================== E */
  /* Die Zustände, die kein Kanal erzeugt: Validierung, Honeypot, Zeitgrenze
     des CRM, Rate-Limit. Eigener Serverstart, damit der Zähler des
     Rate-Limits bei null beginnt. */
  console.log("\n=== E · erzwungene Formular-Zustände ===");
  mailMock.setzeStatus(202);
  app = await starteApp({
    crmUrl: `http://127.0.0.1:${CRM_PORT}/haengt`,
    mailUrl: MAIL_LEBT,
  });
  browser = await starteBrowser();

  // E1 Validierungsfehler: leeres Formular, aber langsam genug abgeschickt.
  lauf = await absenden(browser, "/demo", { fuellen: false });
  pruefe(lauf.art === "fehler", `E1: Validierungsfehler sichtbar (${lauf.art})`);
  pruefe(
    lauf.meldung.includes("Bitte prüfen Sie die markierten Felder"),
    "E1: Wortlaut der Feldprüfung",
  );
  merkeZustand("E1 · Validierungsfehler", lauf.meldung);

  // E2 Honeypot: ausgefüllt UND Honeypot gesetzt -> stille Bestätigung,
  //    aber KEIN Versand auf irgendeinem Kanal.
  const vorherE2 = empfangen.length;
  const mailVorherE2 = mailMock.empfangen.length;
  lauf = await absenden(browser, "/demo", { honeypot: true });
  pruefe(lauf.art === "erfolg", `E2: Honeypot bekommt stille Bestätigung (${lauf.art})`);
  await sleep(500);
  pruefe(empfangen.length === vorherE2, "E2: kein CRM-Eintrag");
  pruefe(mailMock.empfangen.length === mailVorherE2, "E2: keine Mail");
  merkeZustand("E2 · stille Bestätigung nach Honeypot", lauf.sichtbar);

  // E3 Zeitgrenze: der CRM-Mock antwortet auf /haengt nie. Nach fünf
  //    Sekunden bricht die Übergabe ab – die Mail trägt, der Besucher
  //    bekommt seine Bestätigung, und im Log steht der Abbruchgrund.
  lauf = await absenden(browser, "/demo");
  pruefe(lauf.art === "erfolg", `E3: Bestätigung trotz hängendem CRM (${lauf.art})`);
  log = app.logs.join("");
  pruefe(
    /\[crm\] Übergabe fehlgeschlagen: TimeoutError nach \d+ ms/.test(log),
    "E3: Zeitgrenze als TimeoutError geloggt",
  );

  // E4 Rate-Limit: MAX_REQUESTS ist 5 pro IP und zehn Minuten. Bisher sind
  //    in diesem Serverstart drei gezählte Anfragen durch (E1, E3 und der
  //    Honeypot NICHT – der wird vor dem Zähler abgefangen).
  let limitMeldung = "";
  for (let i = 0; i < 5; i++) {
    lauf = await absenden(browser, "/demo");
    if (lauf.art === "fehler" && /Anschluss/.test(lauf.meldung)) {
      limitMeldung = lauf.meldung;
      break;
    }
  }
  pruefe(limitMeldung.length > 0, "E4: Rate-Limit-Meldung erreicht");
  merkeZustand("E4 · Rate-Limit-Hinweis", limitMeldung);
} finally {
  await beende(browser?.kind);
  await beende(app?.kind);
  crmMock.server.close();
  mailMock.server.close();
}

/* ========================================================================= */
/* Ton-Regeln auf den gesammelten Zuständen                                  */
/* ========================================================================= */
console.log("\n=== Ton-Regeln A bis D in den Formular-Zuständen ===");
pruefe(ZUSTAENDE.length >= 5, `mindestens fünf Zustände erfasst (${ZUSTAENDE.length})`);
for (const zustand of ZUSTAENDE) {
  const treffer = pruefeTon(zustand.text);
  pruefe(
    treffer.length === 0,
    `${zustand.name}: ${treffer.length === 0 ? "sauber" : treffer.map((t) => `Regel ${t.regel} – ${t.name}`).join(", ")}`,
  );
}

console.log(
  "\n" + (probleme === 0 ? "FORMULAR-TEST BESTANDEN" : probleme + " PROBLEM(E) GEFUNDEN"),
);
process.exit(probleme === 0 ? 0 : 1);
