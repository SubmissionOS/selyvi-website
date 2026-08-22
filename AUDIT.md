# Abschluss-Audit

**Datum:** 20.08.2026
**Stand:** Produktionsbuild (`npm run build`), lokal über `npm start` auf Port 3210
**Geprüfte Seiten:** die 8 Routen plus die 404-Seite

Alle Zahlen unten sind gemessen, nicht geschätzt. Die Prüfskripte liefen gegen
den laufenden Produktionsbuild.

## Werkzeuge

| Werkzeug     | Version | Cooldown | Install-Hooks | Wo installiert         |
| ------------ | ------- | -------- | ------------- | ---------------------- |
| `lighthouse` | 13.4.1  | 31 Tage  | keine         | außerhalb des Projekts |
| `axe-core`   | 4.13.0  | 15 Tage  | keine         | außerhalb des Projekts |

Beide nach dem Ablauf aus [CLAUDE.md](CLAUDE.md) geprüft: Websuche ohne Befund,
Cooldown eingehalten, keine Install-Hooks im gesamten Baum (120 Pakete),
`npm audit` 0 Vulnerabilities, kein `axios` im Baum (relevant wegen des
Vorfalls im März 2026).

**Bewusst außerhalb des Projekts installiert.** Ein einmaliges Audit-Werkzeug
gehört nicht dauerhaft in den Abhängigkeitsbaum einer Marketing-Website.
Lighthouse allein bringt über 100 Pakete mit – die Angriffsfläche des Projekts
bleibt dadurch unverändert.

## 1. Lighthouse

Lighthouse 13.4.1, Standardvoreinstellung (Mobil-Emulation, gedrosseltes Netz).
Ziel: je ≥ 95.

| Seite                     | Performance | Accessibility | Best Practices | SEO    |
| ------------------------- | ----------- | ------------- | -------------- | ------ |
| `/`                       | 99          | 100           | 100            | 100    |
| `/produkt`                | 97          | 100           | 100            | 100    |
| `/schulen`                | 97          | 100           | 100            | 100    |
| `/datenschutz-sicherheit` | 97          | 100           | 100            | 100    |
| `/ueber-uns`              | 97          | 100           | 100            | 100    |
| `/demo`                   | 97          | 100           | 100            | 100    |
| `/impressum`              | 97          | 100           | 100            | **66** |
| `/datenschutz`            | 97          | 100           | 100            | **66** |
| 404                       | –           | –             | –              | –      |

### Abweichungen mit Ursache

**SEO 66 auf `/impressum` und `/datenschutz`.** Ursache: Das Audit
`is-crawlable` schlägt fehl, weil beide Seiten `<meta name="robots"
content="noindex">` tragen. Das ist beabsichtigt und hängt an
`LEGAL_APPROVED = false`. Lighthouse kann nicht wissen, dass die Sperre gewollt
ist. **Keine Maßnahme** – der Wert steigt auf 100, sobald die Rechtstexte
freigegeben sind und `LEGAL_APPROVED` auf `true` steht.

**404-Seite nicht bewertbar.** Lighthouse bricht mit
`ERRORED_DOCUMENT_REQUEST` ab: _„Lighthouse was unable to reliably load the page
you requested […] (Status code: 404)"_. Lighthouse wertet keine
Nicht-2xx-Antworten. Status 404 ist für eine 404-Seite jedoch korrekt – die
Alternative wäre eine Seite, die fälschlich 200 meldet. **Werkzeuggrenze, kein
Seitenmangel.** Ersatzweise geprüft: axe-core (0 Verstöße), Tastaturbedienung,
Link-Crawl, Screenshots – alle bestanden.

**Performance 97 statt 100.** Die drückenden Audits sind auf allen Seiten
identisch: `largest-contentful-paint`, `interactive`, `unused-javascript`,
`render-blocking-insight`, `legacy-javascript-insight`,
`network-dependency-tree-insight`. Ursache ist das gemeinsame
JavaScript-Bündel (Abschnitt 6), nicht seitenspezifischer Code. Über dem Ziel
von 95, daher keine Maßnahme.

## 2. Link-Crawl

Alle `<a href>` aller 9 Seiten verfolgt.

| Prüfung                                | Ergebnis                                                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------- |
| Interne Ziele                          | 8 eindeutige, **alle HTTP 200**                                                     |
| Weiterleitungsketten                   | **keine** (0 Sprünge bei allen 8)                                                   |
| Externe Links                          | 18 (LinkedIn und Instagram im Footer, je 9 Seiten)                                  |
| `rel="noopener"` bei `target="_blank"` | **18 von 18** (`rel="noreferrer noopener"`)                                         |
| Sonstige                               | `mailto:kontakt@example.de`, `tel:+4900000000`, `#hauptinhalt`, `#so-funktionierts` |

**Ergebnis: bestanden.** Kein 404, keine Weiterleitungskette, kein externer Link
ohne `noopener`.

## 3. Barrierefreiheit

### Automatisiert – axe-core 4.13.0

In jede Seite injiziert und `axe.run()` ausgeführt.

| Seite                                                                                                            | Verstöße |
| ---------------------------------------------------------------------------------------------------------------- | -------- |
| `/`, `/produkt`, `/schulen`, `/datenschutz-sicherheit`, `/ueber-uns`, `/demo`, `/impressum`, `/datenschutz`, 404 | **je 0** |

**Gesamt: 0 Verstöße über 9 Seiten.**

### Tastatur-Durchlauf – Startseite

Tab-Stationen 1–12, jeweils mit geprüftem Fokusindikator:

| #    | Element                              | Fokusring              |
| ---- | ------------------------------------ | ---------------------- |
| 1    | Skip-Link „Zum Hauptinhalt springen" | 2px `rgb(0,116,189)`   |
| 2    | Wortmarke                            | 2px `rgb(0,116,189)`   |
| 3    | „Demo buchen" (Kopfzeile)            | 2px `rgb(0,116,189)`   |
| 4    | „Menü öffnen"                        | 2px `rgb(0,116,189)`   |
| 5    | „Demo buchen" (Hero)                 | 2px `rgb(0,116,189)`   |
| 6    | „So funktioniert’s"                  | 2px `rgb(0,116,189)`   |
| 7    | „Mehr zu Sicherheit & Datenschutz"   | 2px `rgb(199,236,255)` |
| 8–12 | FAQ-Trigger 1–5                      | 2px `rgb(0,116,189)`   |

Alle 12 Stationen mit sichtbarem Fokusring. Station 7 liegt auf der
brand-800-Fläche und schaltet korrekt auf brand-100 um – die `on-dark`-Regel aus
`globals.css` greift.

### Tastatur-Durchlauf – Demo-Formular

| #     | Element                         |
| ----- | ------------------------------- |
| 1–4   | Skip-Link, Wortmarke, CTA, Menü |
| 5     | `input#name`                    |
| 6     | `input#school`                  |
| 7     | `input#email`                   |
| 8     | `select#role`                   |
| 9     | `textarea#message`              |
| 10    | `input#consent`                 |
| 11    | Link „Datenschutzerklärung"     |
| 12    | „Demo anfragen"                 |
| 13–14 | Footer-Links                    |

Die Reihenfolge entspricht der visuellen Anordnung, alle 14 Stationen mit
sichtbarem Fokusring.

### FAQ-Accordion mit Tastatur

| Aktion          | `aria-expanded`                    |
| --------------- | ---------------------------------- |
| Ausgangszustand | `false`                            |
| Enter           | `true`                             |
| Leertaste       | `false`                            |
| Pfeil runter    | Fokus wandert zum nächsten Trigger |

Bedienbar mit Enter, Leertaste und Pfeiltasten.

### Skip-Link – gefunden und behoben

**Befund:** Der Skip-Link setzte zwar `location.hash = "#hauptinhalt"`, der
Fokus blieb aber auf `BODY`. Die Tastaturnavigation wäre danach wieder oben in
der Kopfzeile weitergelaufen – der Sprung wäre für genau die Gruppe wirkungslos
gewesen, für die er gedacht ist. axe-core meldet das nicht, weil der Link
technisch korrekt ist.

**Behoben:** `<main id="hauptinhalt" tabIndex={-1}>` in
[layout.tsx](src/app/layout.tsx). Ohne Fokusring, weil das Ziel kein
Bedienelement ist.

## 4. Konsistenz-Prüfungen

### (a) `--cta`

| Prüfung                        | Ergebnis                                 |
| ------------------------------ | ---------------------------------------- |
| Definition des Tokens          | 1× in `globals.css`                      |
| Nutzung von `bg-cta` im Markup | **1×**, in `button.tsx` (Variante `cta`) |
| `variant="cta"`                | 7 Stellen in 7 Dateien                   |

Gerenderte CTA-Buttons je Seite:

| Seite                                                                    | gesamt | Kopfzeile | im Inhalt            |
| ------------------------------------------------------------------------ | ------ | --------- | -------------------- |
| `/`                                                                      | 4      | 2         | 2 (Hero + Abschluss) |
| `/produkt`, `/schulen`, `/datenschutz-sicherheit`, `/ueber-uns`, `/demo` | 3      | 2         | 1                    |
| `/impressum`, `/datenschutz`, 404                                        | 2      | 2         | 0                    |

Die Kopfzeile enthält beide CTA-Varianten im HTML (Desktop und kompakt);
sichtbar ist per Media-Query immer genau eine.

**Abweichung vom Prüfkriterium „exakt 1 pro Seite":** Die Startseite hat zwei
CTA im Inhalt. Das ist so beauftragt – Sektion 1 (Hero) und Sektion 9
(Abschluss-CTA) waren beide vorgegeben. Die Token-Regel selbst ist eingehalten:
`--cta` hat genau eine Definitions- und eine Verwendungsstelle und wird für
nichts anderes als den primären CTA-Button genutzt. **Entscheidung liegt beim
Team**, ob der Abschluss-CTA auf der Startseite entfallen soll.

### (b) `PRODUCT_NAME`

Kein Literal außerhalb von [brand.ts](src/config/brand.ts). Die zwei Treffer der
Textsuche stehen in Kommentaren (`icon.tsx`, `seo.ts`) und erscheinen nicht in
der Ausgabe. **Bestanden.**

### (c) Hex-Farben außerhalb der Token-Definition

| Datei                 | Treffer | Begründung                                                                        |
| --------------------- | ------- | --------------------------------------------------------------------------------- |
| `opengraph-image.tsx` | 3       | `ImageResponse` rendert außerhalb des Dokuments und kennt die CSS-Variablen nicht |
| `icon.tsx`            | 2       | dito                                                                              |
| `apple-icon.tsx`      | 2       | dito                                                                              |
| `brand.ts`            | 2       | Kommentar, keine Ausgabe                                                          |

**Im Seiten-Markup: null Hex-Werte.** Die sieben Literale in den drei
Bildgeneratoren sind technisch unvermeidbar und im Quelltext begründet.

### (d) Marker-Zählung Code vs. README

Gemessen im gerenderten DOM, FAQ-Einträge einzeln aufgeklappt (der Accordion ist
`type="single"`, es bleibt nur einer offen).

| Seite                     | gemessen                                      | außerhalb FAQ | im FAQ |
| ------------------------- | --------------------------------------------- | ------------- | ------ |
| `/`                       | 3                                             | 0             | 3      |
| `/produkt`                | 6                                             | 6             | 0      |
| `/schulen`                | 7                                             | 4             | 3      |
| `/datenschutz-sicherheit` | 13                                            | 9             | 4      |
| `/ueber-uns`              | 5                                             | 5             | 0      |
| `/demo`                   | 0 sichtbar + 2 in Zuständen nach dem Absenden | –             | –      |
| `/impressum`              | 12                                            | 12            | 0      |
| `/datenschutz`            | 7                                             | 7             | 0      |
| 404                       | 0                                             | –             | –      |
| **Summe**                 | **55**                                        |               |        |

Gegenüberstellung:

| Kategorie                  | gemessen       | README |
| -------------------------- | -------------- | ------ |
| Launch-Blocker Sicherheit  | 13             | 13     |
| Launch-Blocker Rechtliches | 12 + 7 = 19    | 19     |
| Übrige Platzhalter         | 3+6+7+5+2 = 23 | 23     |
| **Gesamt**                 | **55**         | **55** |

**Identisch. Bestanden.**

## 5. Formular-Regression

Alle vier Pfade im Produktionsbuild wiederholt, Server im Trockenmodus
(`DEMO_DRY_RUN=true`).

| Pfad                             | Ergebnis                                                                        | Beleg im Server-Log                                |
| -------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| Leeres Formular, 6 s gewartet    | 4 Feldfehler, jeder über `aria-describedby` verknüpft, Fokus springt auf `name` | – (Versandschritt nicht erreicht)                  |
| Vollständig, sofort abgesendet   | Erfolgsansicht für den Absender                                                 | `Anfrage verworfen: zu schnell abgesendet. 2502`   |
| Honeypot ausgefüllt              | Erfolgsansicht für den Absender                                                 | `Anfrage verworfen: Honeypot ausgefüllt.`          |
| Korrekt ausgefüllt, 4 s gewartet | Erfolgsansicht mit `[PRÜFEN: Reaktionszeit zusagen]`                            | `DEMO_DRY_RUN=true – Anfrage wird NICHT versendet` |

Abgewiesene Anfragen erreichen den Versandschritt nachweislich nicht.
**4 von 4 bestanden.**

## 6. Bundle

Übertragene Bytes je Route, Cache deaktiviert, alles gzip-komprimiert.

| Route         | JS           | CSS    | Fonts   | HTML       | Summe       |
| ------------- | ------------ | ------ | ------- | ---------- | ----------- |
| alle 9 Routen | **173,4 kB** | 7,3 kB | 65,5 kB | 5,7–7,8 kB | ~252–254 kB |

Die Werte sind auf allen Routen identisch: Dieser Turbopack-Build liefert **ein
gemeinsames Client-Bündel für alle Seiten aus**, es gibt keine routenweise
Aufteilung. `/impressum` lädt damit auch den Code für Accordion und mobiles
Menü, den die Seite nie benutzt.

### Begründung für über 150 kB

| Chunk              | gzip    | Inhalt                                |
| ------------------ | ------- | ------------------------------------- |
| `08ttfj81-47mu.js` | 69,9 kB | React + React DOM (`createRoot`)      |
| `0td_q_jvg2olo.js` | 43,6 kB | Next.js Client-Runtime und App-Router |
| `2isqzhl2juzfz.js` | 10,5 kB | Radix (Dialog / Accordion)            |
| `1fg6-f1-eog10.js` | 9,6 kB  | Radix (Dialog / Accordion)            |
| `144-aki1awz72.js` | 7,9 kB  | lucide-react Icons                    |
| 7 weitere          | 27,9 kB | Anwendungscode, Turbopack-Runtime     |

**Rund 114 kB der 173 kB sind React und der Next-Runtime** – der Sockel jeder
Next.js-Anwendung, nicht beeinflussbar ohne Framework-Wechsel. Die übrigen
~59 kB verteilen sich auf Radix, Icons und eigenen Code.

**Offener Punkt:** Die fehlende routenweise Aufteilung ist verbesserungsfähig.
Radix Dialog (mobiles Menü) und Accordion (FAQ) ließen sich nachladen, was rund
20 kB auf Seiten ohne diese Elemente spart. Bei 97–99 Performance-Punkten ist
das kein dringender Punkt.

## 7. Sicherheits-Header

Gemessen auf `/`, `/produkt` und `/sitemap.xml` – auf allen drei identisch:

| Header                   | Wert                                       |
| ------------------------ | ------------------------------------------ |
| `X-Content-Type-Options` | `nosniff`                                  |
| `Referrer-Policy`        | `strict-origin-when-cross-origin`          |
| `Permissions-Policy`     | `camera=(), microphone=(), geolocation=()` |
| `X-Frame-Options`        | `DENY`                                     |

`/gibt-es-nicht` liefert korrekt HTTP 404.

**Content-Security-Policy: bewusst nicht gesetzt.** Gemessen: Das gerenderte
HTML enthält 5 (`/`) bzw. 3 (`/demo`) Inline-`<script>`-Elemente – Next.js
liefert die Hydrations-Daten so aus. Eine CSP ohne `unsafe-inline` bräuchte
deshalb Nonces, und Nonces erzwingen dynamisches Rendern; alle Routen sind
derzeit statisch vorgerendert. Eine CSP **mit** `unsafe-inline` schützt genau
gegen das nicht, wogegen eine CSP schützen soll. Statt einer Alibi-Zeile steht
der Punkt offen (siehe unten und README).

## 8. UI-Szenen: Leistung und Ruheverhalten (22.08.2026)

Nachtrag zur Einführung der animierten Hero-Szene
(`src/components/scenes/`). Gemessen jeweils gegen den Produktionsbuild auf
`localhost:3210`.

### Lighthouse Startseite, vorher gegen nachher

Fünf Läufe je Zustand, weil der Performance-Score zwischen einzelnen Läufen um
mehrere Punkte schwankt. Ein einzelner Lauf taugt nicht als Vergleich.

| Zustand                        | Performance je Lauf | Median | LCP   | TBT      | CLS |
| ------------------------------ | ------------------- | ------ | ----- | -------- | --- |
| Vorher (statisches Skelett)    | 95, 95, 95, 95, 95  | **95** | 2,9 s | 10–50 ms | 0   |
| Nachher (animierte Hero-Szene) | 94, 95, 95, 95, 95  | **95** | 2,9 s | 30–80 ms | 0   |

**Median unverändert bei 95.** Accessibility, Best Practices und SEO bleiben
bei je 100.

Ehrlich dazugesagt: Ein Lauf von fünf lag bei 94, und die Total Blocking Time
ist gestiegen – von 10–50 ms auf 30–80 ms. Das ist der Preis für gut 23 kB
zusätzliches Client-JavaScript (das Szenen-Bündel, unkomprimiert gemessen).
Beides liegt innerhalb der Streuung bzw. weit unter der Schwelle von 200 ms,
ab der Lighthouse TBT abwertet.

**CLS bleibt 0.** Das war nicht selbstverständlich: Eine Szene, die Bereiche
nachträglich einhängt, lässt das Fenster mitten im Durchlauf wachsen. Alle
Bereiche stehen deshalb von Beginn an im DOM und alle Textkästen haben eine
Mindesthöhe, die den fertigen Text fasst.

### Ruheverhalten: rAF-Aufrufe je 3 Sekunden

Gemessen über einen Zähler, der `requestAnimationFrame` umschließt, zusammen
mit `Performance.getMetrics` (`ScriptDuration`).

| Zustand               | rAF-Aufrufe | Skriptlaufzeit |
| --------------------- | ----------- | -------------- |
| Szene im Sichtbereich | 221         | 8,9 ms         |
| Szene weggescrollt    | **0**       | 0,1 ms         |
| Tab im Hintergrund    | **0**       | 0,0 ms         |

Kontrollmessung auf `/produkt` (Seite ohne Szene): 0 Aufrufe in allen drei
Zuständen.

**Ein Fehler, den erst die Messung zeigte.** Der erste Durchlauf ergab bei
weggescrollter Szene **165 Aufrufe statt 0**. Die Zeitleiste selbst pausierte
korrekt – nachgewiesen über den IntersectionObserver, der ordnungsgemäß
`[true, false]` meldete, und über den unveränderten Textinhalt der Szene. Der
Aufrufstapel führte zu `TypingText`: Der Baustein hat eine EIGENE
rAF-Schleife und tippte ausserhalb des Bildes zu Ende. Behoben über
`scene.running`, das die Zeitleiste an alle Bausteine mit eigener Schleife
weiterreicht (`paused`-Feld). Ohne die Messung wäre das nicht aufgefallen: Die
Szene sah in jedem Screenshot richtig aus.

### prefers-reduced-motion

Über die Geräteemulation erzwungen. Die Szene rendert sofort ihren
vollständigen Endzustand: kein Autoplay, keine Schreibmarke, kein Zeiger.

Belegt über einen Hash-Vergleich zweier Aufnahmen im Abstand von 6,4 Sekunden:
beide `1f44ecc9be8c1b61` – **in der gesamten Zeit hat sich kein Pixel bewegt.**
Gegenprobe ohne reduced motion: zwei Aufnahmen derselben Szene ergeben
verschiedene Hashes.

### Barrierefreiheit

axe-core über alle 9 Seiten erneut ausgeführt: **0 Verstöße**. Die Szene trägt
`role="img"` mit einem beschreibenden `aria-label`; alle Elemente darin sind
`aria-hidden` – dasselbe Muster wie bei den bisherigen statischen Skeletten.

## 9. Drei Szenen in „So funktioniert's" (22.08.2026)

Nachtrag zur Ablösung der drei statischen Mini-Skelette durch kleine Szenen
(`src/components/scenes/how-it-works-scenes.tsx`), gemeinsam beobachtet über
eine `SceneGroup`.

### Lighthouse Startseite, fünf Läufe

| Zustand                           | Performance je Lauf | Median | A11y    | LCP   | TBT       | CLS |
| --------------------------------- | ------------------- | ------ | ------- | ----- | --------- | --- |
| Vorher (nur Hero-Szene)           | 94, 95, 95, 95, 95  | **95** | 100     | 2,9 s | 30–80 ms  | 0   |
| Zwischenstand (mit 40 % Dämpfung) | 93, 95, 95, 95, 95  | 95     | **96**  | 2,9 s | 10–140 ms | 0   |
| Nachher (behoben)                 | 95, 95, 95, 97, 95  | **95** | **100** | 2,9 s | 10–60 ms  | 0   |

Performance-Median unverändert bei 95, CLS bleibt 0, Best Practices und SEO
je 100.

### Ein Kontrastfehler, den erst Lighthouse zeigte

Der Zwischenstand fiel bei Accessibility von **100 auf 96**. Ursache war nicht
eine der neuen Szenen, sondern der Nachschliff am Hero: Die Kopfzeile des
Zeugnis-Bereichs stand vor ihrem Schritt bei 40 % Opazität.

Gemessen:

| Element                      | Vordergrund | Hintergrund | Kontrast   | Nötig |
| ---------------------------- | ----------- | ----------- | ---------- | ----- |
| „Zeugnisbemerkung (Entwurf)" | `#c1c7d1`   | `#ffffff`   | **1,69:1** | 4,5:1 |
| Badge „In Ihrem Schreibstil" | `#99bdd5`   | `#e9f7ff`   | **1,81:1** | 4,5:1 |

`gray-500` (`#64748b`) erreicht auf Weiss nur rund 4,8:1. Dieser Wert lässt
keine Abdunklung zu – schon bei 90 % Opazität fällt er unter 4,5:1. Eine
gedämpfte Schrift ist an dieser Stelle also nicht umsetzbar, egal welcher
Prozentwert gewählt wird.

**Behoben** durch Verzicht auf den gedämpften Ruhezustand: Die Überschrift
steht von Anfang an bei voller Deckkraft, das Badge erscheint zusammen mit dem
Text (Einblendung von 0 auf 1, kein Ruhezustand dazwischen). Das ist auch
inhaltlich stimmiger – „In Ihrem Schreibstil" ist eine Aussage über den
Entwurf und sollte nicht dastehen, solange es keinen gibt. Danach wieder 100.

axe-core über alle 9 Seiten: **0 Verstöße**.

### Ruheverhalten, je 3 Sekunden

Diesmal von Anfang an mit dem `scene.running`-Muster gebaut.

| Zustand            | Hero-Szene | Sektion (3 Szenen) |
| ------------------ | ---------- | ------------------ |
| Im Sichtbereich    | 228 rAF    | 698 rAF            |
| Weggescrollt       | **0**      | **0**              |
| Tab im Hintergrund | **0**      | **0**              |

698 entspricht rund dem Dreifachen einer einzelnen Szene – die drei laufen
tatsächlich parallel, wenn sie zu sehen sind, und gemeinsam gar nicht, wenn
nicht.

### prefers-reduced-motion

Je zwei Aufnahmen im Abstand von 6,4 Sekunden, hashgleich:

| Bereich              | Hash               |
| -------------------- | ------------------ |
| Hero-Szene           | `c7dccccb088be035` |
| Sektion mit 3 Szenen | `3780c9b5281a6a1a` |

Gegenprobe ohne reduced motion: beide Bereiche liefern zu verschiedenen
Zeitpunkten verschiedene Hashes.

## 10. Vier Szenen auf /produkt (22.08.2026)

Die vier statischen Funktionsblock-Skelette sind durch Szenen ersetzt
(`src/components/scenes/produkt/`). Jede hat ihren eigenen
IntersectionObserver – keine `SceneGroup`, weil die Blöcke über die ganze
Seite verteilt liegen.

### Lighthouse /produkt, je fünf Läufe

| Zustand                       | Performance je Lauf | Median | A11y | LCP   | TBT      | CLS |
| ----------------------------- | ------------------- | ------ | ---- | ----- | -------- | --- |
| Baseline (statische Skelette) | 97, 97, 97, 97, 97  | **97** | 100  | 2,6 s | 10–30 ms | 0   |
| Nachher (vier Szenen)         | 96, 96, 96, 96, 96  | **96** | 100  | 2,8 s | 20–50 ms | 0   |

**Die Vorgabe ist NICHT erfüllt.** Der Median liegt einen Punkt unter der
Baseline, und zwar nicht als Streuung: Beide Messreihen sind mit 5 × 97
beziehungsweise 5 × 96 vollkommen stabil.

Ursache, gemessen: Das übertragene JavaScript der Seite steigt von **178,7 kB
auf 186,8 kB** (+8,1 kB). Vier interaktive Szenen brauchen vier hydrierte
Client-Komponenten; LCP wandert dadurch von 2,6 s auf 2,8 s und TBT steigt
leicht. Accessibility, Best Practices, SEO bleiben bei je 100, CLS bei 0.

Das ist der Preis der Funktion selbst, kein behebbarer Fehler. Wer den Punkt
zurück will, muss Szenen weglassen – zum Beispiel zwei der vier statisch
lassen.

### Ein Optimierungsversuch, der nichts brachte

`content-visibility: auto` auf den Bühnen sah vielversprechend aus: Vier grosse
Kästen liegen beim Laden ausserhalb des Bildschirms, und die Angabe lässt den
Browser deren Innenleben überspringen. Gemessen:

| Variante                  | Performance je Lauf | Median |
| ------------------------- | ------------------- | ------ |
| ohne `content-visibility` | 98, 96, 96, 96, 96  | 96     |
| mit `content-visibility`  | 95, 96, 96, 96, 96  | 96     |

Kein Gewinn, der schlechteste Lauf sogar einen Punkt tiefer. **Wieder
entfernt** – eine Optimierung ohne gemessenen Nutzen bleibt nicht im Code, nur
weil sie plausibel klingt. Der Grund steht als Kommentar in `scene-panel.tsx`,
damit es niemand ein zweites Mal versucht.

### Ruheverhalten je Szene, 3 Sekunden je Zustand

| Szene             | Im Sichtbereich | Weggescrollt | Hintergrund-Tab |
| ----------------- | --------------- | ------------ | --------------- |
| A Dokumentation   | 265 rAF         | **0**        | **0**           |
| B Kommunikation   | 447 rAF         | **0**        | **0**           |
| C Unterricht      | 402 rAF         | **0**        | **0**           |
| D Steuerung       | 520 rAF         | **0**        | **0**           |
| Startseite (Hero) | 229 rAF         | **0**        | **0**           |

Die Zahlen im Sichtbereich unterscheiden sich, weil beim Anfahren einer Szene
je nach Blockhöhe die benachbarte teilweise mit im Bild liegt und dann
ebenfalls läuft. Entscheidend sind die beiden Nullspalten.

### prefers-reduced-motion

Je zwei Aufnahmen im Abstand von 7,4 Sekunden, alle vier hashgleich:

| Szene           | Hash               |
| --------------- | ------------------ |
| A Dokumentation | `d596e53452c7b754` |
| B Kommunikation | `ffe86bd80a10bfa6` |
| C Unterricht    | `fdff707c6c1635c1` |
| D Steuerung     | `55603de51415aaa2` |

### Barrierefreiheit

axe-core über alle 9 Seiten: **0 Verstöße**. Jede Szene trägt `role="img"` mit
beschreibendem `aria-label`, alles darin ist `aria-hidden`.

Die Lehre aus Abschnitt 9 ist eingehalten: **keine abgedunkelte Schrift.** In
Szene C stand die Materialkarte zuerst komplett auf `opacity-0`; das liess die
rechte Hälfte der Bühne zwei Drittel des Durchlaufs leer. Jetzt sind Rahmen und
Titel von Beginn an bei voller Deckkraft sichtbar, und nur der Inhalt entsteht.
Unsichtbar (`opacity-0`) ist unproblematisch – abgedunkelt wäre es nicht.

## 11. Zwei Szenen auf /schulen (22.08.2026)

Der Entlastungsbericht wird von /produkt wiederverwendet (`size="large"`,
keine Kopie), dazu kommt der Leitungsmodus im Rollen-Block. Beide mit eigenem
IntersectionObserver.

### Lighthouse /schulen, je fünf Läufe

| Zustand                | Performance je Lauf | Median | A11y | LCP   | TBT      | CLS |
| ---------------------- | ------------------- | ------ | ---- | ----- | -------- | --- |
| Baseline (ohne Szenen) | 95, 96, 96, 96, 96  | **96** | 100  | 2,8 s | 20–80 ms | 0   |
| Nachher (zwei Szenen)  | 95, 95, 95, 95, 95  | **95** | 100  | 2,9 s | 20–30 ms | 0   |

Ein Punkt unter der Baseline – innerhalb der vereinbarten Toleranz und
derselbe Betrag wie auf /produkt. Die Szenen-Kosten sind damit über drei
Seiten hinweg konsistent: rund ein Lighthouse-Punkt für hydrierte
Client-Komponenten.

**Regressionsprüfung /produkt nach dem Refactor:** 96, 96, 96, 96, 96 –
Median unverändert bei 96. Das Herausziehen der Grössen-Varianten hat dort
nichts gekostet.

### Derselbe Kontrastfehler ein zweites Mal – und derselbe Befund

Der erste Messlauf ergab Accessibility **96 statt 100**. Ursache war wieder
abgedunkelte Schrift, diesmal die inaktive Seite des Umschalters
(`text-gray-500 opacity-70`):

| Element                    | Vordergrund | Hintergrund | Kontrast   | Nötig |
| -------------------------- | ----------- | ----------- | ---------- | ----- |
| Umschalter, inaktive Seite | `#909cad`   | `#f6fafd`   | **2,65:1** | 4,5:1 |

Das ist exakt die Regel, die seit Abschnitt 9 im README steht. Sie ist beim
Bauen trotzdem wieder gebrochen worden – ein Beleg dafür, dass die Messung
nicht durch eine Notiz zu ersetzen ist. **Behoben** durch Wegfall der
Deckkraft: Aktiv und inaktiv unterscheiden sich jetzt über die Fläche, nicht
über die Schrift. Danach wieder 100.

axe-core über alle 9 Seiten: **0 Verstöße**.

### Ruheverhalten, 3 Sekunden je Zustand

| Szene                | Im Sichtbereich | Weggescrollt | Hintergrund-Tab |
| -------------------- | --------------- | ------------ | --------------- |
| E Entlastungsbericht | 295 rAF         | **0**        | **0**           |
| F Leitungsmodus      | 181 rAF         | **0**        | **0**           |

### prefers-reduced-motion

Je zwei Aufnahmen im Abstand von 7,4 Sekunden, hashgleich:

| Szene                | Hash               |
| -------------------- | ------------------ |
| E Entlastungsbericht | `ca76680fecb1b56f` |
| F Leitungsmodus      | `a11395b8d65aa0e7` |

**Beim Leitungsmodus war dafür eine Erweiterung nötig.** Die Szene schaltet
um, zeigt die Leitungsansicht und schaltet zurück – ihr letzter Schritt ist
die Lehrkraft-Ansicht. Ohne Eingriff fröre sie bei reduced motion also
ausgerechnet auf dem Bild ein, das die Aussage der Szene NICHT enthält. Die
Zeitleiste kennt dafür jetzt `staticStepId`; die Szene hält auf
`"leitung"` an, samt Badge „Verteilung statt Rangliste" und den namenlosen
Balken.

### Wortlaut-Sperren

| Sperre                               | Geprüft                                         |
| ------------------------------------ | ----------------------------------------------- |
| „Wirkung" nur in der Erhebungs-Zeile | ja                                              |
| Nutzungsbalken ohne Personenbezug    | ja – weder Namen noch Initialen noch Sortierung |
| Nichts animiert, was nicht Live ist  | ja                                              |

Die Balken sind bewusst **unsortiert** hinterlegt: Eine absteigende Reihe ist
optisch bereits ein Ranking, auch ohne Beschriftung.

## Gefunden und behoben

| #   | Befund                                                  | Behebung                                      |
| --- | ------------------------------------------------------- | --------------------------------------------- |
| 1   | Skip-Link setzte nur den Hash, verschob den Fokus nicht | `tabIndex={-1}` auf `<main id="hauptinhalt">` |

## Offene Punkte mit Zuständigkeit

| #   | Punkt                                                              | Zuständigkeit                             | Blockiert Launch?           |
| --- | ------------------------------------------------------------------ | ----------------------------------------- | --------------------------- |
| 1   | 13 Launch-Blocker auf `/datenschutz-sicherheit`                    | Technik, Produkt, Recht, Vertrag, Betrieb | **ja**                      |
| 2   | 19 Launch-Blocker Rechtliches (Impressumsfelder, Datenschutztexte) | Recht                                     | **ja**                      |
| 3   | 23 übrige Platzhalter                                              | Produkt / Team                            | nein, vor Livegang auflösen |
| 4   | Content-Security-Policy nicht gesetzt                              | Technik                                   | nein, empfohlen             |
| 5   | Keine routenweise Code-Aufteilung (173 kB auf jeder Route)         | Technik                                   | nein                        |
| 6   | Kein Fehler-Monitoring – `error.tsx` loggt nur in die Konsole      | Technik / Betrieb                         | nein                        |
| 7   | Zwei CTA im Inhalt der Startseite (Hero + Abschluss)               | Produkt (Entscheidung)                    | nein                        |
| 8   | AGB- und Barrierefreiheitsseite fehlen                             | Recht                                     | zu klären                   |
| 9   | Domain kaufen, danach `SITE_URL` und `DEMO_MAIL_FROM` setzen       | Betrieb                                   | **ja**                      |

## Screenshots

Alle 9 Seiten in beiden Breiten, Ganzseite, Stand dieses Audits. Bei keiner
Seite und keiner Breite überschreitet `document.scrollWidth` die Viewport-Breite
– kein horizontaler Überlauf.

| Seite                     | Desktop 1440                             | Mobil 390                             |
| ------------------------- | ---------------------------------------- | ------------------------------------- |
| `/`                       | `startseite-desktop-1440.png` (4870 px)  | `startseite-mobil-390.png` (6921 px)  |
| `/produkt`                | `produkt-desktop-1440.png` (4408 px)     | `produkt-mobil-390.png` (7120 px)     |
| `/schulen`                | `schulen-desktop-1440.png` (4353 px)     | `schulen-mobil-390.png` (6024 px)     |
| `/datenschutz-sicherheit` | `sicherheit-desktop-1440.png` (4250 px)  | `sicherheit-mobil-390.png` (5864 px)  |
| `/ueber-uns`              | `ueber-uns-desktop-1440.png` (2781 px)   | `ueber-uns-mobil-390.png` (4097 px)   |
| `/demo`                   | `demo-desktop-1440.png` (1699 px)        | `demo-mobil-390.png` (2700 px)        |
| `/impressum`              | `impressum-desktop-1440.png` (2131 px)   | `impressum-mobil-390.png` (2813 px)   |
| `/datenschutz`            | `datenschutz-desktop-1440.png` (2214 px) | `datenschutz-mobil-390.png` (2736 px) |
| 404                       | `404-desktop-1440.png` (1020 px)         | `404-mobil-390.png` (1366 px)         |

Zusätzlich: `demo-erfolg-1440.png` (Erfolgszustand des Formulars),
`startseite-cta-a.png` / `startseite-cta-b.png` (CTA-Varianten),
`kopfzeile-mobil-390.png`, `burgermenue-mobil-390.png`.
