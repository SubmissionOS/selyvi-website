/**
 * Smoke-Test gegen ein Deployment.
 *
 * Aufruf:
 *   node scripts/smoke-test.mjs https://selyvi-website-xxxx.vercel.app
 *
 * Prüft ohne Browser und ohne zusätzliche Pakete:
 *   1. Alle Seiten antworten mit 200 (404-Seite mit 404)
 *   2. Sicherheits-Header auf jeder Antwort
 *   3. Keine Verweise auf Google-Font-Server im ausgelieferten HTML/CSS
 *   4. noindex ausschließlich auf /datenschutz
 *   5. Sitemap und robots.txt erreichbar und konsistent
 *   6. Kein alter Produktname, keine Secret-Muster in der Ausgabe
 *   7. Ton-Regeln A bis D aus CLAUDE.md im sichtbaren Text und in aria-labels
 *
 * Die Formular-Pfade lassen sich so nicht prüfen – Server Actions brauchen
 * einen Browser. Dafür gibt es scripts/formular-test.mjs (npm run
 * test:formular), das die Formulare mit erreichbarem und mit totem CRM
 * abschickt. Siehe README, Abschnitt „Formular-Pfad testen“.
 */

const base = (process.argv[2] || "").replace(/\/$/, "");
if (!base) {
  console.error("Aufruf: node scripts/smoke-test.mjs <basis-url>");
  process.exit(1);
}

const PAGES = [
  "/",
  "/fuer-lehrkraefte",
  "/schulen",
  "/forschung",
  "/datenschutz-sicherheit",
  "/ueber-uns",
  "/einblick",
  "/mitgestalten",
  "/demo",
  "/impressum",
  "/datenschutz",
];

const REQUIRED_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "x-frame-options": "DENY",
};

let problems = 0;
const fail = (msg) => {
  problems++;
  console.log("   FEHLER: " + msg);
};

const get = async (path) => {
  const res = await fetch(base + path, { redirect: "manual" });
  return { res, body: await res.text() };
};

console.log("Smoke-Test gegen " + base + "\n");

// --- 1 + 2 + 4: Seiten, Header, noindex ---
console.log("=== Seiten, Header, noindex ===");
for (const path of PAGES) {
  const { res, body } = await get(path);

  if (res.status !== 200) fail(`${path} antwortet mit ${res.status}`);

  const missing = Object.entries(REQUIRED_HEADERS).filter(
    ([key, value]) => res.headers.get(key) !== value,
  );
  if (missing.length) {
    fail(`${path}: Header falsch oder fehlend – ${missing.map(([k]) => k).join(", ")}`);
  }

  const robots = body.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? null;
  const shouldNoindex = path === "/datenschutz";
  if (shouldNoindex && robots !== "noindex") {
    fail(`${path} sollte noindex tragen, hat aber: ${robots ?? "kein robots-Meta"}`);
  }
  if (!shouldNoindex && robots !== null) {
    fail(`${path} trägt unerwartet robots="${robots}"`);
  }

  console.log(`  ${path.padEnd(26)} ${res.status}  Header ok  robots=${robots ?? "–"}`);
}

// --- 404 ---
console.log("\n=== 404-Seite ===");
{
  const { res } = await get("/gibt-es-diese-seite-nicht");
  if (res.status !== 404) fail(`404-Seite antwortet mit ${res.status} statt 404`);
  console.log(`  /gibt-es-diese-seite-nicht  ${res.status}`);
}

// --- 3: keine Google-Fonts ---
console.log("\n=== Schriften ===");
{
  const { body } = await get("/");
  const cssHrefs = [...body.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1]);
  let googleHits = 0;
  const sources = [body];
  for (const href of cssHrefs) {
    const { body: css } = await get(href.startsWith("http") ? href : href);
    sources.push(css);
  }
  for (const src of sources) {
    googleHits += (src.match(/fonts\.(gstatic|googleapis)\.com/g) ?? []).length;
  }
  if (googleHits > 0) fail(`${googleHits} Verweise auf Google-Font-Server gefunden`);
  const local = (sources.join("").match(/\/_next\/static\/media\/[^"')]+\.woff2/g) ?? [])
    .length;
  console.log(`  Google-Font-Verweise: ${googleHits}`);
  console.log(`  Lokale woff2-Verweise: ${local}`);
  if (local === 0) fail("keine lokal ausgelieferten Schriftdateien gefunden");
}

// --- 5: Sitemap und robots.txt ---
console.log("\n=== Sitemap und robots.txt ===");
{
  const { res: sRes, body: sitemap } = await get("/sitemap.xml");
  if (sRes.status !== 200) fail(`sitemap.xml antwortet mit ${sRes.status}`);
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((u) => new URL(u).pathname);
  console.log("  Sitemap: " + paths.join(", "));
  if (paths.includes("/datenschutz")) fail("/datenschutz steht in der Sitemap");
  if (!paths.includes("/impressum")) fail("/impressum fehlt in der Sitemap");

  const { res: rRes, body: robots } = await get("/robots.txt");
  if (rRes.status !== 200) fail(`robots.txt antwortet mit ${rRes.status}`);
  if (!robots.includes("Sitemap:")) fail("robots.txt ohne Sitemap-Verweis");
  if (/Disallow:\s*\//.test(robots)) fail("robots.txt enthält ein Disallow");
  console.log("  robots.txt: Sitemap-Verweis vorhanden, kein Disallow");
}

// --- 6: keine Altlasten, keine Secrets in der Ausgabe ---
console.log("\n=== Ausgabe-Hygiene ===");
{
  let stale = 0;
  let secrets = 0;
  for (const path of PAGES) {
    const { body } = await get(path);
    stale += (body.match(/Produktname|PRODUKTNAME/g) ?? []).length;
    secrets += (body.match(/xkeysib-|BREVO_API_KEY/g) ?? []).length;
  }
  if (stale > 0) fail(`alter Produktname erscheint ${stale}× im HTML`);
  if (secrets > 0) fail(`Secret-Muster erscheint ${secrets}× im HTML`);
  console.log(`  Alter Produktname: ${stale}`);
  console.log(`  Secret-Muster:     ${secrets}`);
}

// --- 7: Ton-Regeln A bis D (CLAUDE.md, Abschnitt TON) ---
//
// Geprüft wird der SICHTBARE TEXT plus alle aria-labels und der
// Meta-Description – also genau das, was ein Mensch liest oder vorgelesen
// bekommt. Skripte, Style-Blöcke und Klassennamen fallen vorher weg, sonst
// meldet ein Tailwind-Utility wie „not-sr-only“ falschen Alarm.
//
// Die Muster sind bewusst eng. Eine definitive Aussage über eine gewollte
// Produktgrenze („Ein Elternportal gibt es nicht") ist erlaubt und darf hier
// nicht hängenbleiben; verboten ist die Selbstauskunft über Unwissen.
console.log("\n=== Ton-Regeln A bis D ===");
{
  const RULES = [
    // A – dem Leser zuschreiben, wer er ist, was er tut oder warum
    [/Sie sind [A-ZÄÖÜa-zäöüß]+ geworden/, "A", "„Sie sind … geworden“"],
    [
      /Als (Lehrkraft|Schulleitung|Lehrer|Lehrerin|Forschende)[nr]? (wissen|kennen)/,
      "A",
      "„Als Lehrkraft wissen Sie …“",
    ],
    [/Sie wollen doch/, "A", "„Sie wollen doch …“"],
    [/Sie wollen [^.?!]{0,40}\?/, "A", "„Sie wollen …?“"],
    [/Ihnen fehlt/, "A", "„Ihnen fehlt …“"],
    [
      /Sie (prüfen|forschen|suchen|brauchen|kennen) [^.?!]{0,60}\?/,
      "A",
      "Frage, die dem Leser sein Tun zuschreibt",
    ],

    // B – klingen, als wüssten wir nicht, was das Produkt kann
    [/noch nicht/, "B", "„noch nicht“"],
    [/noch nichts/, "B", "„noch nichts“"],
    [/noch keine/, "B", "„noch keine“"],
    [/behaupten wir nicht/, "B", "„behaupten wir nicht“"],
    [/wissen wir nicht/, "B", "„wissen wir nicht“"],
    [/können wir (noch )?nicht sagen/, "B", "„können wir nicht sagen“"],
    [/sagen lässt/, "B", "„… sagen lässt“"],
    [/steht (noch )?nicht fest/, "B", "„steht nicht fest“"],
    [/fehlt noch/, "B", "„fehlt noch“"],

    // C – Reifegrad-Defizite, die niemand von uns verlangt hat
    [
      /noch keine? (Pilot|Referenz|Schule|Kunde)/i,
      "C",
      "„noch keine Pilot-/Referenzschule“",
    ],
    [/bisher keine?\b/i, "C", "„bisher keine …“"],
    [/(sind|existieren) wir erst seit/i, "C", "„wir sind erst seit …“"],
    [/erst seit (Kurzem|kurzem|wenigen|einigen|\d)/, "C", "„erst seit …“"],
    [/kleines Team/i, "C", "„kleines Team“"],
    [/(junges|neues) (Unternehmen|Start-?up)/i, "C", "„junges Unternehmen“"],
    [/(noch )?keine Referenz/i, "C", "„keine Referenzen“"],
    // Nur die VERNEINUNG faengt das Muster. „ISO 27001 zertifiziert" waere
    // eine Zusage und gehoert nicht hierher – sie faellt unter die
    // Wahrheitsquelle, nicht unter den Ton.
    // Die Zeichenklasse war anfangs auf Kleinbuchstaben begrenzt und hat
    // „nicht nach ISO 27001 zertifiziert" durchgelassen – gefunden in der
    // Gegenprobe, nicht auf der Website.
    [/(nicht|ohne|kein[e]?)\s[^.!?]{0,30}zertifiz/i, "C", "Zertifikats-Geständnis"],
    [/mit Pilotschulen festgelegt/i, "C", "„Preise werden mit Pilotschulen festgelegt“"],
    [/mehr Schulen, als/i, "C", "Anzahl der Schulen als Mangel"],

    // D – Zukunftsform ueber die Produktreife
    //
    // Zwei Muster sind bewusst ENG gefasst, weil das Wort auch harmlos
    // vorkommt:
    //   „folgt"  – temporal verboten, logisch erlaubt („aus einer Deutschnote
    //              folgt nicht, ob ein Kind fluessig liest", „die Auswertung
    //              folgt einem Codebuch"). Gefangen wird nur das temporale
    //              „folgt/folgen" am Satzende oder vor einem Zeitbezug.
    //   „noch"   – kommt in „noch nicht" (Regel B) schon vor; hier faengt es
    //              die Ankuendigungsform „gibt es noch"/„steht noch aus".
    [/\b(ist|sind|war|waren) geplant\b/i, "D", "„ist geplant“"],
    [
      /\bgeplant(e|er|es)? (Funktion|Schnittstelle|Anbindung|Ausbau)/i,
      "D",
      "„geplante …“",
    ],
    [/\bin Arbeit\b/i, "D", "„in Arbeit“"],
    [/\bin Entwicklung\b/i, "D", "„in Entwicklung“"],
    [/\bentsteht gerade\b|\bentstehen gerade\b/i, "D", "„entsteht gerade“"],
    [/\bim Aufbau\b/i, "D", "„im Aufbau“"],
    [/\b(bald|demn(ä|ae)chst|in K(ü|ue)rze)\b/i, "D", "„bald / demnächst“"],
    [/\bin Vorbereitung\b/i, "D", "„in Vorbereitung“"],
    [/\b(vor dem|zum) Produktstart\b/i, "D", "„vor dem Produktstart“"],
    [/\bvor dem Start\b/i, "D", "„vor dem Start“"],
    [/\bRollout (steht aus|offen)\b/i, "D", "„Rollout steht aus“"],
    [/\bPrototyp\b/i, "D", "„Prototyp“"],
    [
      /\bfolg(t|en) (bald|sp(ä|ae)ter|danach|noch|zu einem sp)/i,
      "D",
      "temporales „folgt“",
    ],
    [/\b(steht|stehen) noch aus\b/i, "D", "„steht noch aus“"],
    [/\bgibt es (bald|demn)/i, "D", "„gibt es bald“"],
  ];

  /**
   * Ausnahmen von Regel D, abschliessend (CLAUDE.md):
   *   - PRODUCT_HOSTING_NOTE: der Serverstandort, die einzige erlaubte
   *     Einschraenkung. Enthaelt „in Vorbereitung".
   *   - SCHOOL_TYPE_ANSWER: „Weitere Schulformen folgen." Ausbau, keine
   *     Reife – von CEO und CMO so gewollt.
   * Beide werden vor der Pruefung aus dem Text geschnitten. Wer den Wortlaut
   * in product.ts bzw. brand.ts aendert, aendert ihn hier mit.
   */
  const AUSNAHMEN = [
    "Vor dem Betrieb mit echten Schülerdaten ziehen die Produktserver nach Deutschland um und jeder Schule liegt ein Auftragsverarbeitungsvertrag vor – beides ist in Vorbereitung.",
    "Weitere Schulformen folgen.",
  ];

  // Der Datenschutztext ist Rechtstext nach Art. 13 DSGVO und wird nicht
  // nach Marketing-Ton umgeschrieben.
  const TON_PAGES = PAGES.filter((p) => p !== "/datenschutz" && p !== "/impressum");

  let hits = 0;
  for (const path of TON_PAGES) {
    const { body } = await get(path);

    const labels = [...body.matchAll(/aria-label="([^"]*)"/g)].map((m) => m[1]);
    const description =
      body.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    const visible = body
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ");

    let text = [visible, ...labels, description]
      .join(" ")
      .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, " ");

    // Die beiden erlaubten Saetze herausschneiden, bevor die Muster laufen.
    for (const satz of AUSNAHMEN) text = text.split(satz).join(" ");

    for (const [pattern, rule, name] of RULES) {
      if (pattern.test(text)) {
        hits++;
        fail(`${path}: Regel ${rule} verletzt – ${name}`);
      }
    }
  }
  console.log(`  ${TON_PAGES.length} Seiten geprüft, ${RULES.length} Muster je Seite`);
  console.log(`  Treffer: ${hits}`);
}

console.log(
  "\n" + (problems === 0 ? "SMOKE-TEST BESTANDEN" : problems + " PROBLEM(E) GEFUNDEN"),
);
console.log(
  "Nicht abgedeckt: die Formular-Pfade – dafür `npm run test:formular` (Browser).",
);
process.exit(problems === 0 ? 0 : 1);
