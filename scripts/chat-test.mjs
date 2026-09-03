/**
 * Die 13 Pflicht-Fragen für den Chat in /einblick.
 *
 * Aufruf (setzt einen vorhandenen Build voraus):
 *   npm run build
 *   npm run test:chat
 *
 * ==========================================================================
 * WOHER DIESE METHODIK KOMMT
 * ==========================================================================
 * Aus dem englischen Port. Dort ist aufgefallen, dass ein Schlagwort-Vergleich
 * mit `includes()` MITTEN IM WORT trifft. Im Deutschen ist das schlimmer als
 * im Englischen, weil die Sprache Wörter zusammensetzt und flektiert:
 *
 *     „las"  steckt in „K-las-se"  und in „las-sen"
 *     „tier" steckt in „medi-tier-en"
 *
 * Ein falscher Treffer ist hier teurer als gar keiner: Der Einblick verspricht
 * Antworten AUS DEN EIGENEN EINTRÄGEN. Wer eine Antwort bekommt, die zur Frage
 * nicht passt, glaubt danach auch der richtigen nicht mehr.
 *
 * Die Methodik ist deshalb: eine feste, kleine Liste von Fragen, die JEDE
 * Änderung an den Wortlisten überleben muss — mit Pflicht-Treffern UND
 * Pflicht-Rückfällen. Ein Test, der nur Treffer prüft, geht immer grün, wenn
 * man die Listen weit genug macht.
 *
 * ==========================================================================
 * WAS HIER GEPRÜFT WIRD
 * ==========================================================================
 * Zwei Blöcke, beide an der echten Seite, nicht an einer Kopie der Logik:
 *
 *   A  13 Fragen -> erwartete Antwort oder Rückfall
 *   B   6 Beobachtungen -> erwartete Chips (dieselbe Wortgrenzen-Frage,
 *                          anderer Ort: die Chip-Erkennung)
 *
 * Der Test startet seinen eigenen `next start` auf einem eigenen Port und
 * räumt ihn wieder ab. Keine zusätzlichen Pakete: CDP über die eingebauten
 * `fetch` und `WebSocket`.
 */
import { spawn } from "node:child_process";

const EDGE =
  process.env.EDGE_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const APP_PORT = 3313;
const CDP_PORT = 9394;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ========================================================================= */
/* Die Erwartungen                                                           */
/* ========================================================================= */

/**
 * Wie eine Antwort erkannt wird. Jeder Schlüssel steht für genau eine der
 * drei vorbereiteten Antworten oder für den Rückfall; die Erkennung greift
 * einen Wortlaut heraus, der nur dort vorkommt.
 */
const ANTWORT_MERKMAL = {
  lesen: "Emma liest inzwischen",
  mathe: "Yusuf erklärt seinen Rechenweg",
  gruppen: "Lotta verteilt in Gruppenarbeiten",
  rueckfall: "Im Einblick kenne ich nur die Beispieldaten",
};

/**
 * DIE 13 PFLICHT-FÄLLE.
 *
 * Vier davon MÜSSEN im Rückfall landen. Sie sind der eigentliche Test:
 * Fall 4 und 5 sind der gemeldete Fehler („las" in „Klasse", in „lassen"),
 * Fall 12 und 13 sind Fragen, auf die der Einblick schlicht keine Antwort
 * hat und auch keine erfinden darf.
 *
 * Fall 10 ist die Gegenprobe zur Regel: Ein Schlagwort am WORTANFANG eines
 * Kompositums SOLL treffen („Team-Meeting"). Wer die Regel zu streng macht,
 * bricht diesen Fall.
 */
const FRAGEN = [
  { frage: "Wie hat sich Emma im Lesen entwickelt?", erwartet: "lesen" },
  { frage: "Wie liest Emma inzwischen?", erwartet: "lesen" },
  { frage: "Wie läuft die Leseübung in der 3b?", erwartet: "lesen" },
  { frage: "Wie geht es der Klasse?", erwartet: "rueckfall" },
  { frage: "Wir lassen die Kinder selbst wählen.", erwartet: "rueckfall" },
  { frage: "Wer erklärt in Mathe gern anderen Kindern etwas?", erwartet: "mathe" },
  { frage: "Macht Mathematik ihm Spaß?", erwartet: "mathe" },
  { frage: "Was macht Yusuf im Zahlenraum bis 100?", erwartet: "mathe" },
  { frage: "Wer übernimmt in Gruppenarbeiten Verantwortung?", erwartet: "gruppen" },
  { frage: "Wie war das Team-Meeting?", erwartet: "gruppen" },
  { frage: "Hat Lotta heute etwas geleitet?", erwartet: "gruppen" },
  { frage: "Wie viele Kinder tragen eine Brille?", erwartet: "rueckfall" },
  { frage: "Wie ist der Klassendurchschnitt?", erwartet: "rueckfall" },
];

/**
 * Chip-Erkennung. Dieselbe Wortgrenzen-Frage an einem zweiten Ort.
 *
 * Fall 4 („meditieren") war mit `includes()` ein Sachunterricht-Chip, weil
 * „tier" darin steckt. Ein falscher Fach-Chip behauptet etwas über ein Kind –
 * die Regel „keine negativen oder falschen Inhalte über Kinder" gilt auch
 * für stillschweigend falsche Zuordnungen.
 */
const BEOBACHTUNGEN = [
  {
    text: "Lotta hat heute die Gruppenarbeit geleitet und alle beteiligt.",
    erwartet: ["Lotta B."],
  },
  { text: "Emma liest inzwischen sehr flüssig vor.", erwartet: ["Emma K.", "Deutsch"] },
  {
    text: "Yusuf rechnet sicher im Zahlenraum bis 100.",
    erwartet: ["Yusuf A.", "Mathe"],
  },
  {
    text: "Die Kinder meditieren zum Stundenbeginn eine Minute.",
    erwartet: ["Beobachtung"],
  },
  { text: "Die Klasse hat heute ruhig gearbeitet.", erwartet: ["Beobachtung"] },
  {
    text: "Beim Versuch mit der Pflanze hat die Gruppe genau beobachtet.",
    erwartet: ["Sachunterricht"],
  },
];

/* ========================================================================= */
/* Werkzeug                                                                  */
/* ========================================================================= */
let probleme = 0;
const pruefe = (bedingung, text) => {
  console.log(`  ${bedingung ? "ok    " : "FEHLER"}  ${text}`);
  if (!bedingung) probleme++;
};

/**
 * Prozess samt Kindern beenden.
 *
 * Unter Windows startet `spawn(..., { shell: true })` erst eine Shell, die
 * dann `node` startet. `kill()` beendet nur die Shell – der Server liefe
 * weiter und der nächste Lauf würde den ALTEN Build messen. Genau dieser
 * Fehler hat den Formular-Test einmal grün gemacht, obwohl er nichts prüfte.
 */
async function beende(kind) {
  if (!kind) return;
  if (process.platform === "win32") {
    await new Promise((r) => {
      spawn("taskkill", ["/pid", String(kind.pid), "/T", "/F"], { stdio: "ignore" }).on(
        "close",
        r,
      );
    });
  } else {
    kind.kill("SIGTERM");
  }
}

async function starteApp() {
  const kind = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["--no-install", "next", "start", "-p", String(APP_PORT)],
    { stdio: ["ignore", "pipe", "pipe"], shell: process.platform === "win32" },
  );
  const logs = [];
  kind.stdout.on("data", (d) => logs.push(String(d)));
  kind.stderr.on("data", (d) => logs.push(String(d)));

  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${APP_PORT}/einblick`);
      if (res.status === 200) return kind;
    } catch {}
    await sleep(500);
  }
  throw new Error("Anwendung startet nicht:\n" + logs.join(""));
}

async function starteBrowser() {
  const kind = spawn(EDGE, [
    "--headless",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${(process.env.TEMP || "/tmp").split("\\").join("/")}/claude/edge-chat-test`,
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
  return { kind, send };
}

/* ========================================================================= */
/* Lauf                                                                      */
/* ========================================================================= */
let app = null;
let browser = null;

try {
  console.log("\n  Anwendung starten …");
  app = await starteApp();
  browser = await starteBrowser();
  const { send } = browser;

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const lies = async (ausdruck) =>
    (await send("Runtime.evaluate", { expression: ausdruck, returnByValue: true })).result
      ?.value;

  await send("Page.navigate", { url: `http://127.0.0.1:${APP_PORT}/einblick` });
  await sleep(2600);

  // LADE-WACHE: Auf einer leeren Seite geht jede Behauptung durch.
  const laenge = await lies("(document.querySelector('main')?.innerText || '').length");
  if (!laenge || laenge < 200) {
    throw new Error(`Seite nicht geladen (main hat ${laenge} Zeichen)`);
  }

  const klick = (suche) =>
    lies(
      "(() => { const b = [...document.querySelectorAll('button')]" +
        ".find(x => new RegExp(" +
        JSON.stringify(suche) +
        ").test((x.getAttribute('aria-label') || x.innerText || '').trim()));" +
        " if (!b) return 'WEG'; b.click(); return 'ok'; })()",
    );
  const tippe = (selektor, text) =>
    lies(
      "(() => { const el = document.querySelector(" +
        JSON.stringify(selektor) +
        "); if (!el) return 'WEG';" +
        " const proto = el.tagName === 'TEXTAREA'" +
        "   ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;" +
        " Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, " +
        JSON.stringify(text) +
        ");" +
        " el.dispatchEvent(new Event('input', { bubbles: true })); return 'ok'; })()",
    );

  const inLiveUnterricht = await klick("^Live-Unterricht$");
  if (inLiveUnterricht !== "ok")
    throw new Error("Bereich Live-Unterricht nicht gefunden");
  await sleep(400);

  /* ------------------------------------------------------------------ A */
  console.log("\n  === A · 13 Pflicht-Fragen ===");
  for (const fall of FRAGEN) {
    const getippt = await tippe("#einblick-frage", fall.frage);
    if (getippt !== "ok") throw new Error("Eingabefeld nicht gefunden");
    await sleep(120);
    const gesendet = await klick("^Frage senden$");
    if (gesendet !== "ok") throw new Error("Sende-Schalter nicht gefunden");
    await sleep(320);

    const antwort =
      (await lies(
        "(document.querySelector('[role=\"status\"]')?.innerText || '').replace(/\\s+/g,' ')",
      )) || "";

    const gefunden =
      Object.entries(ANTWORT_MERKMAL).find(([, merkmal]) =>
        antwort.includes(merkmal),
      )?.[0] ?? "NICHTS";

    pruefe(
      gefunden === fall.erwartet,
      `„${fall.frage}" -> ${gefunden}` +
        (gefunden === fall.erwartet ? "" : `  (erwartet: ${fall.erwartet})`),
    );
  }

  /* ------------------------------------------------------------------ B */
  console.log("\n  === B · Chip-Erkennung ===");
  for (const fall of BEOBACHTUNGEN) {
    const getippt = await tippe("#einblick-eigene-beobachtung", fall.text);
    if (getippt !== "ok") throw new Error("Beobachtungsfeld nicht gefunden");
    await sleep(120);
    const uebernommen = await klick("^Übernehmen$");
    if (uebernommen !== "ok") throw new Error("Übernehmen nicht gefunden");
    await sleep(320);

    /* Der eigene Eintrag wird am Stift-Zeichen erkannt, NICHT am Text.
       Erste Fassung suchte den Eintrag ueber die ersten 30 Zeichen – und
       fand damit die vorbereitete Beobachtung, deren Anfang gleich lautete.
       Der Test meldete einen Fehler, den es nicht gab. Das Stift-Zeichen
       tragen nur selbst getippte Eintraege. */
    const chips = JSON.parse(
      (await lies(`(() => {
        const knopf = [...document.querySelectorAll('button')]
          .find(b => b.getAttribute('aria-pressed') !== null && b.innerText.trim().startsWith('✎'));
        if (!knopf) return '[]';
        return JSON.stringify([...knopf.querySelectorAll('span span')]
          .map(s => s.innerText.trim())
          .filter(t => t.length > 0 && t.length < 24 && t !== '✎'));
      })()`)) || "[]",
    );

    const stimmt =
      fall.erwartet.every((c) => chips.includes(c)) &&
      chips.length === fall.erwartet.length;

    pruefe(
      stimmt,
      `„${fall.text.slice(0, 40)}…" -> ${JSON.stringify(chips)}` +
        (stimmt ? "" : `  (erwartet genau: ${JSON.stringify(fall.erwartet)})`),
    );
  }

  console.log(
    "\n" +
      (probleme === 0
        ? "  CHAT-TEST BESTANDEN – 13 Fragen, 6 Beobachtungen\n"
        : `  CHAT-TEST FEHLGESCHLAGEN – ${probleme} Abweichung(en)\n`),
  );
} catch (fehler) {
  console.error("\n  ABBRUCH: " + fehler.message + "\n");
  probleme += 1;
} finally {
  if (browser) await beende(browser.kind);
  await beende(app);
}

process.exit(probleme === 0 ? 0 : 1);
