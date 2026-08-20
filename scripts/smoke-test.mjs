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
 *
 * Die vier Formular-Pfade lassen sich so nicht prüfen – Server Actions
 * brauchen einen Browser. Anleitung dazu im README, Abschnitt „Smoke-Test“.
 */

const base = (process.argv[2] || "").replace(/\/$/, "");
if (!base) {
  console.error("Aufruf: node scripts/smoke-test.mjs <basis-url>");
  process.exit(1);
}

const PAGES = [
  "/",
  "/produkt",
  "/schulen",
  "/datenschutz-sicherheit",
  "/ueber-uns",
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

console.log(
  "\n" + (problems === 0 ? "SMOKE-TEST BESTANDEN" : problems + " PROBLEM(E) GEFUNDEN"),
);
console.log(
  "Nicht abgedeckt: die vier Formular-Pfade – siehe README, Abschnitt „Smoke-Test“.",
);
process.exit(problems === 0 ? 0 : 1);
