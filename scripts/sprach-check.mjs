/**
 * Wie viel Text steckt noch fest im Code?
 *
 * Aufruf:
 *   node scripts/sprach-check.mjs          Zusammenfassung je Datei
 *   node scripts/sprach-check.mjs --details  jede Fundstelle einzeln
 *
 * ==========================================================================
 * WOZU
 * ==========================================================================
 * Die Sprachschicht (src/content/) erzwingt Vollständigkeit nur für das, was
 * schon drin ist: Ein Schlüssel, der in de.ts steht und in en.ts fehlt,
 * bricht den Build. Ein deutscher Satz, der noch in einer Komponente
 * festgeschrieben ist, bricht nichts — er erscheint einfach auch auf
 * selyvi.com.
 *
 * Genau diese Lücke misst dieses Skript. Es sucht deutschsprachige
 * Zeichenketten und JSX-Text in Dateien, die Oberfläche erzeugen, und zählt
 * sie. Die Zahl ist der ehrliche Fortschrittsbalken der Übersetzung: Sie muss
 * auf 0, bevor selyvi.com live geht.
 *
 * ==========================================================================
 * WAS ES NICHT KANN
 * ==========================================================================
 * Es erkennt Sprache an Umlauten, ß und einer Liste häufiger deutscher
 * Wörter. Ein deutscher Satz ohne Umlaut und ohne diese Wörter rutscht
 * durch. Es ist ein Fortschrittsmaß, kein Beweis — der Beweis ist der Blick
 * auf die gebaute englische Seite.
 *
 * Kommentare zählen NICHT. Sie sind Dokumentation für das Team und bleiben
 * bewusst deutsch: Wer hier arbeitet, arbeitet auf Deutsch.
 */
import fs from "node:fs";
import path from "node:path";

const WURZEL = "src";
const DETAILS = process.argv.includes("--details");

/**
 * Dateien, die keine Oberfläche erzeugen oder deren Text bewusst deutsch
 * bleibt.
 */
const AUSGENOMMEN = [
  /^src[\\/]content[\\/]/, // die Sprachdateien selbst
  /^src[\\/]lib[\\/]/, // Hilfsfunktionen ohne Text
  /^src[\\/]config[\\/]locale\.ts$/,
  /\.d\.ts$/,
];

/** Wörter, an denen sich Deutsch erkennen lässt. */
const DEUTSCH =
  /\b(und|oder|nicht|eine|einen|einem|einer|der|die|das|den|dem|des|für|mit|von|zum|zur|auf|aus|bei|nach|über|unter|wir|Sie|Ihre|Ihren|Ihrem|ist|sind|wird|werden|haben|hat|kann|können|wenn|dass|auch|noch|schon|hier|dort|jede|jeder|jedes|alle|kein|keine|mehr|sehr|nur|statt)\b/;

const UMLAUT = /[äöüÄÖÜß]/;

const dateien = [];
(function sammle(ordner) {
  for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
    const p = path.join(ordner, eintrag.name);
    if (eintrag.isDirectory()) sammle(p);
    else if (/\.tsx?$/.test(eintrag.name)) dateien.push(p);
  }
})(WURZEL);

/** Markiert Kommentarzeilen, damit sie nicht mitgezählt werden. */
function kommentarZeilen(quelle) {
  const zeilen = quelle.split("\n");
  const flags = [];
  let imBlock = false;
  for (const zeile of zeilen) {
    const startet = /\/\*/.test(zeile);
    const endet = /\*\//.test(zeile);
    flags.push(imBlock || startet || /^\s*(\/\/|\*)/.test(zeile.trimStart()));
    if (startet && !endet) imBlock = true;
    if (endet) imBlock = false;
  }
  return flags;
}

let gesamt = 0;
const proDatei = [];

for (const datei of dateien) {
  if (AUSGENOMMEN.some((r) => r.test(datei))) continue;

  const quelle = fs.readFileSync(datei, "utf8");
  const zeilen = quelle.split("\n");
  const kommentar = kommentarZeilen(quelle);
  const funde = [];

  zeilen.forEach((zeile, i) => {
    if (kommentar[i]) return;

    // Import-Pfade, Klassennamen und Attributwerte ohne Text ausschliessen.
    const ohneKlassen = zeile
      .replace(/className=\{?["'`][^"'`]*["'`]\}?/g, " ")
      .replace(/from\s+["'][^"']+["']/g, " ")
      .replace(/\b(id|href|key|name|src|type|role|htmlFor)=["'][^"']*["']/g, " ");

    const kandidaten = [
      ...ohneKlassen.matchAll(/["'`]([^"'`]{12,})["'`]/g),
      ...ohneKlassen.matchAll(/>\s*([A-ZÄÖÜ][^<>{}]{11,})\s*</g),
    ];

    for (const m of kandidaten) {
      const text = m[1].trim();
      if (!UMLAUT.test(text) && !DEUTSCH.test(text)) continue;
      // Tailwind-Ketten und Pfade fallen heraus.
      if (/^[a-z0-9:\-\/\[\]. ]+$/.test(text)) continue;
      funde.push([i + 1, text.slice(0, 90)]);
    }
  });

  if (funde.length) {
    gesamt += funde.length;
    proDatei.push([datei.split("\\").join("/"), funde]);
  }
}

proDatei.sort((a, b) => b[1].length - a[1].length);

console.log("SPRACH-CHECK – deutscher Text ausserhalb von src/content/\n");
for (const [datei, funde] of proDatei) {
  console.log("  " + String(funde.length).padStart(3) + "  " + datei);
  if (DETAILS) {
    for (const [zeile, text] of funde) {
      console.log("        :" + String(zeile).padEnd(5) + text);
    }
  }
}

console.log(
  "\n  " +
    proDatei.length +
    " Dateien, " +
    gesamt +
    " Fundstellen.\n" +
    "  Ziel vor dem Livegang von selyvi.com: 0.",
);
