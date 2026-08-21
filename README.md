# produkt-website

Fundament der Marketing-Website (B2B-SaaS für Schulen).
Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · shadcn/ui · IBM Plex Sans.

Der Produktname steht an genau einer Stelle: `PRODUCT_NAME` in
[src/config/brand.ts](src/config/brand.ts).

## Befehle

```bash
npm run dev           # Entwicklungsserver
npm run build         # Produktionsbuild
npm start             # Produktionsserver
npm run typecheck     # nur Typprüfung
npm run lint          # ESLint
npm run lint:fix      # ESLint mit Autofix
npm run format        # Prettier schreibt
npm run format:check  # Prettier prüft nur
npm run check         # lint + build (Torwächter vor jedem Commit)
npm run smoke <url>   # Smoke-Test gegen ein Deployment
```

Verbindliche Arbeitsregeln stehen in [CLAUDE.md](CLAUDE.md).

## Wo was geändert wird

| Aufgabe                          | Datei                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------- |
| Produktname / Wortmarke ersetzen | `src/config/brand.ts` (Text) bzw. `src/components/layout/wordmark.tsx` (Logo) |
| CTA-Farbvariante umschalten      | `src/config/brand.ts` → `CTA_VARIANT`                                         |
| Navigation & Footer-Links        | `src/config/site.ts`                                                          |
| Farben / Design-Tokens           | `src/app/globals.css`                                                         |

## CTA-Variante umschalten

In `src/config/brand.ts`:

```ts
export const CTA_VARIANT: CtaVariant = "a"; // "a" = #2c40ff | "b" = #0074bd
```

Der Wert wird in `src/app/layout.tsx` als `data-cta` auf `<html>` gesetzt;
`globals.css` bindet daraufhin die passende Farbe an `--cta`. Es ist der
einzige Schalter – sonst muss nichts angepasst werden.

## Design-Tokens

Alle Farben liegen als CSS-Variablen in `src/app/globals.css` und sind über
`@theme inline` als Tailwind-Utilities verfügbar (`bg-brand-800`, `text-ink`,
`border-gray-200`, …).

| Token           | Wert         | Verwendung                             |
| --------------- | ------------ | -------------------------------------- |
| `--brand-100`   | `#c7ecff`    | Flächen, Footer-Links                  |
| `--brand-400`   | `#1e9cd7`    | Akzente, **kein Text unter 24 px**     |
| `--brand-600`   | `#0074bd`    | interaktive Elemente, Fokus-Ring       |
| `--brand-800`   | `#015b97`    | Wortmarke, Footer-Fläche               |
| `--ink`         | `#0e1b26`    | Fließtext                              |
| `--surface`     | `#ffffff`    | Basis-Hintergrund                      |
| `--surface-alt` | `#f6fafd`    | abgesetzte Sektionen                   |
| `--gray-200`    | `#e2e8ef`    | Rahmen, Trennlinien                    |
| `--gray-500`    | `#64748b`    | Sekundärtext                           |
| `--cta`         | Variante A/B | **ausschließlich** primärer CTA-Button |

### Verbindliche Regeln

1. **`brand-400` nie für Text unter 24 px.** Der Kontrast auf Weiß liegt bei
   ca. 3,0:1 und reicht nur für großen Text (WCAG „large text“). Für Fließ-
   und UI-Text: `--ink`, `--gray-500` oder `brand-600`.
2. **`--cta` ausschließlich für den primären Call-to-Action-Button.** Nicht für
   Links, Überschriften, Icons, Badges, Rahmen oder sekundäre Buttons.
   Umgesetzt über `<Button variant="cta">` – die einzige Stelle im Projekt,
   die `bg-cta` verwendet.
3. **Keine Farbverläufe**, keine Hex-Werte im Markup, keine Tailwind-
   Standardfarben. Farbe kommt immer über die Tokens.

## Schriften

IBM Plex Sans (400/500/600) wird über `next/font/google` eingebunden. Die
Schriftdateien werden einmalig während `next build` heruntergeladen und unter
`/_next/static/media` mit ausgeliefert – **zur Laufzeit besteht keine
Verbindung zu Google-Servern**.

Nachprüfen:

```bash
npm run build
grep -rIl "fonts.gstatic.com\|fonts.googleapis.com" .next/static .next/server/app
# keine Ausgabe = keine Referenz in ausgelieferten Dateien
```

## Sicherheitsvorgaben

`.npmrc` erzwingt projektweit:

- `ignore-scripts=true` – keine `pre-/postinstall`-Hooks aus Abhängigkeiten.
  Praktisch alle aktuellen npm-Supply-Chain-Angriffe liefern ihre Payload über
  genau diese Hooks aus.
- `save-exact=true` – Versionen werden exakt gepinnt, keine `^`/`~`-Ranges.

Für neue Pakete gilt der Ablauf in [CLAUDE.md](CLAUDE.md): Websuche nach
Kompromittierungen, Tarball-Inspektion, Cooldown von ~14 Tagen, Installation nur
mit `npm install --ignore-scripts` und exaktem Pin, danach `npm audit`.
Kein `--force`, kein `npx` mit Remote-Download.

### Prüfprotokoll Linting-Werkzeuge (20.08.2026)

| Paket                    | Version | Alter   | Install-Hooks | Ergebnis                      |
| ------------------------ | ------- | ------- | ------------- | ----------------------------- |
| `eslint`                 | 9.39.5  | 40 Tage | keine         | installiert                   |
| `prettier`               | 3.9.6   | 30 Tage | keine         | installiert                   |
| `eslint-config-next`     | 16.3.0  | 16 Tage | keine         | installiert                   |
| `eslint-config-prettier` | –       | –       | keine         | **bewusst nicht aufgenommen** |

`npm audit` nach der Installation: 0 Vulnerabilities (688 Pakete im Lockfile).

**`eslint-config-prettier` wurde ausgeschlossen.** Das Paket wurde im Juli 2025
kompromittiert (CVE-2025-54313): Nach einem Phishing-Angriff auf den Maintainer
enthielten die Versionen 8.10.1, 9.1.1, 10.1.6 und 10.1.7 ein `postinstall`,
das per `rundll32` eine mitgelieferte `node-gyp.dll` (Scavenger-RAT) nachlud –
gezielt gegen Windows. Es wird nicht benötigt: ESLint 9 hat keine
Formatierungsregeln mehr aktiv und `eslint-config-next` aktiviert ebenfalls
keine, es gibt also keine Konflikte abzuschalten. Prettier formatiert, ESLint
prüft Regeln – die Zuständigkeiten überschneiden sich nicht.

**ESLint bleibt auf 9.x.** ESLint 10 ist installierbar, aber
`eslint-plugin-react` (Abhängigkeit von `eslint-config-next`) nutzt eine dort
entfernte API und bricht sofort ab
(`contextOrFilename.getFilename is not a function`).
`eslint-config-next@16.3.0` deklariert `eslint: ">=9.0.0"`; getestet wird gegen
9.x. Upgrade erst, wenn `eslint-plugin-react` ESLint 10 unterstützt.

### Offener Restpunkt: `unrs-resolver`

Der Abhängigkeitsbaum enthält genau ein Paket mit `postinstall`-Hook:

```
eslint-config-next → eslint-import-resolver-typescript → unrs-resolver@1.12.2
```

Alleiniger Maintainer ist `jounqin` – dasselbe Konto, das im Vorfall oben
gephisht wurde; seine Abhängigkeit `napi-postinstall` war damals eines der fünf
kompromittierten Pakete. Die installierten Versionen sind sauber (nach dem
Vorfall veröffentlicht, nicht deprecated, 93 bzw. 320 Tage alt), und der Hook
**läuft durch `ignore-scripts=true` ohnehin nicht** – ESLint funktioniert ohne
ihn nachweislich. Der Punkt steht hier, weil er zeigt, warum
`ignore-scripts` nicht verhandelbar ist: Der Ausschluss eines Pakets per Hand
hält verwandten Code nicht aus dem Baum, wenn er transitiv nachkommt.

## Sicherheits-Header

Gesetzt in [next.config.ts](next.config.ts) fuer alle Antworten:

| Header                   | Wert                                       |
| ------------------------ | ------------------------------------------ |
| `X-Content-Type-Options` | `nosniff`                                  |
| `Referrer-Policy`        | `strict-origin-when-cross-origin`          |
| `Permissions-Policy`     | `camera=(), microphone=(), geolocation=()` |
| `X-Frame-Options`        | `DENY`                                     |

Nachpruefen:

```bash
curl -s -D - -o /dev/null http://localhost:3000/ | grep -iE "x-content-type|referrer-policy|permissions-policy|x-frame"
```

### Offener Punkt: Content-Security-Policy

**Es ist bewusst keine CSP gesetzt.** Begruendung, gemessen statt vermutet:
Das gerenderte HTML enthaelt 5 (`/`) bzw. 3 (`/demo`) Inline-`<script>`-
Elemente – Next.js liefert die Hydrations-Daten so aus.

- Eine CSP **ohne** `unsafe-inline` braucht deshalb Nonces.
- Nonces erzwingen dynamisches Rendern. Alle Routen sind derzeit statisch
  vorgerendert; das waere ein spuerbarer Preis.
- Eine CSP **mit** `unsafe-inline` schuetzt genau gegen das nicht, wogegen eine
  CSP schuetzen soll – sie waere eine Alibi-Zeile im Header.

Empfohlener Weg, wenn die CSP kommen soll: Middleware mit Nonce-Vergabe, dann
gezielt entscheiden, welche Routen dynamisch werden duerfen. Bis dahin steht
der Punkt offen in [AUDIT.md](AUDIT.md).

## Fehlerseiten

| Datei                                          | Zweck                                |
| ---------------------------------------------- | ------------------------------------ |
| [src/app/not-found.tsx](src/app/not-found.tsx) | 404, liefert korrekt HTTP 404        |
| [src/app/error.tsx](src/app/error.tsx)         | unerwartete Ausnahmen, mit `reset()` |

Die Fehlerseite zeigt **keine technischen Details** – kein Stacktrace, keine
Fehler-ID. Der Fehler geht in die Konsole. Ein echtes Fehler-Monitoring fehlt
noch und steht als offener Punkt in [AUDIT.md](AUDIT.md).

## Audit

Der vollstaendige Abschluss-Bericht mit allen Messwerten steht in
[AUDIT.md](AUDIT.md): Lighthouse je Seite, axe-core, Link-Crawl,
Tastatur-Durchlauf, Konsistenz-Pruefungen, Formular-Regression, Bundle-Groessen
sowie die offenen Punkte mit Zustaendigkeit.

## Bekannte Abweichung

`lucide-react` hat mit Version 1.0 **alle Brand-Icons entfernt** (kein
`Linkedin`, `Instagram`, `Github`, … mehr). Die beiden Social-Icons im Footer
liegen deshalb als lokale SVG-Komponenten in
`src/components/icons/brand-icons.tsx` – mit den ursprünglichen Lucide-Pfaden
und identischen Darstellungsattributen. Alle übrigen Icons kommen weiterhin
aus `lucide-react`.

## shadcn/ui

`components.json` ist eingerichtet, `shadcn` ist als gepinnte devDependency
installiert. Weitere Komponenten hinzufügen:

```bash
npx --no-install shadcn add <komponente>
```

`--no-install` stellt sicher, dass die lokal gepinnte CLI läuft und nicht
ungeprüft eine Version aus dem Netz nachgeladen wird. Neu hinzugefügte
Komponenten bringen shadcn-Standardfarben mit (`bg-primary`, `bg-background`, …)
und müssen auf die Projekt-Tokens umgestellt werden.

## Startseite

Neun Sektionen, jede als eigene Komponente unter `src/components/sections/`.
[page.tsx](src/app/page.tsx) ist reine Komposition.

| #   | Sektion                                 | Komponente                            |
| --- | --------------------------------------- | ------------------------------------- |
| 1   | Hero (einzige H1)                       | `hero.tsx` + `interface-skeleton.tsx` |
| 2   | Trust-Zeile                             | `trust-bar.tsx`                       |
| 3   | Problem → Lösung                        | `problem-solution.tsx`                |
| 4   | So funktioniert’s (`#so-funktionierts`) | `how-it-works.tsx`                    |
| 5   | Kernfunktionen                          | `features.tsx`                        |
| 6   | DSGVO-Block                             | `privacy.tsx`                         |
| 7   | Testimonials (abgeschaltet)             | `testimonials.tsx`                    |
| 8   | FAQ                                     | `faq.tsx`                             |
| 9   | Abschluss-CTA                           | `final-cta.tsx`                       |

## Produktseite (/produkt)

Fünf Sektionen unter `src/components/sections/produkt/`; der Abschluss-CTA ist
dieselbe Komponente wie auf der Startseite.

| #   | Sektion                          | Komponente                                       |
| --- | -------------------------------- | ------------------------------------------------ |
| 1   | Intro (einzige H1, kein CTA)     | `product-intro.tsx`                              |
| 2   | Prinzip-Band                     | `principle-band.tsx`                             |
| 3   | Vier Funktionsblöcke (wechselnd) | `function-blocks.tsx` + `function-skeletons.tsx` |
| 4   | Ausblick „In Arbeit“             | `roadmap.tsx`                                    |
| 5   | Abschluss-CTA (wiederverwendet)  | `../final-cta.tsx`                               |

## Für Schulen (/schulen)

Zielgruppe sind Schulleitung und Schulträger, nicht die einzelne Lehrkraft.
Sieben Sektionen unter `src/components/sections/schulen/`.

| #   | Sektion                       | Komponente                  |
| --- | ----------------------------- | --------------------------- |
| 1   | Intro (einzige H1, kein CTA)  | `school-intro.tsx`          |
| 2   | Drei Organisations-Argumente  | `organisation-benefits.tsx` |
| 3   | Einführungs-Ablauf (Timeline) | `rollout-timeline.tsx`      |
| 4   | Rollen-Block                  | `roles-split.tsx`           |
| 5   | AVV-Hinweis-Band              | `../dpa-band.tsx` (geteilt) |
| 6   | FAQ Schulleitung              | `leadership-faq.tsx`        |
| 7   | Abschluss-CTA (unverändert)   | `../final-cta.tsx`          |

Die Seite enthält bewusst keine Zeitangaben zum Einführungsprozess – weder
Wochen noch Monate noch „typischerweise“. Der Ablauf wird gerade erst mit den
ersten Pilotschulen gestaltet; die betroffenen Schritte sind markiert.

## Datenschutz & Sicherheit (/datenschutz-sicherheit)

Diese Seite lesen Schulleitungen und Datenschutzbeauftragte **vor** der
Beschaffung. Sieben Sektionen unter `src/components/sections/sicherheit/`.

| #   | Sektion                                 | Komponente                  |
| --- | --------------------------------------- | --------------------------- |
| 1   | Intro (einzige H1)                      | `security-intro.tsx`        |
| 2   | Prinzipien-Grid (6 Karten)              | `principles-grid.tsx`       |
| 3   | Transparenz-Tabelle Auftragsverarbeiter | `subprocessors-table.tsx`   |
| 4   | AVV-Sektion                             | `../dpa-band.tsx` (geteilt) |
| 5   | Für Datenschutzbeauftragte              | `for-dpos.tsx`              |
| 6   | FAQ aus der Prüfung                     | `security-faq.tsx`          |
| 7   | Abschluss-CTA (unverändert)             | `../final-cta.tsx`          |

> **Diese Seite darf nicht mit offenen `[PRÜFEN]`-Markern live gehen.**
> Jeder Marker hier ist ein Launch-Blocker – siehe Tabelle unten. Entweder die
> Angabe ist belegt, oder die Seite geht nicht live.

Zwei Stellen verdienen besondere Aufmerksamkeit:

- **KI-Verarbeitung.** Die Karte sagt ausdrücklich **nicht** zu, dass Daten
  nicht für Training verwendet werden. Diese Zusicherung hängt an den Verträgen
  mit den Modell-Anbietern. Sie darf erst hier stehen, wenn sie vertraglich
  belegt ist – es ist die Frage, die in jeder Prüfung zuerst gestellt wird.
- **Subprozessoren-Liste.** Kopfzeile ja, Firmennamen nein. Eine Liste nach
  Art. 28 Abs. 2 DSGVO ist eine Rechtsauskunft; Schulen bauen ihre eigenen
  Verzeichnisse darauf auf. Ein falscher Eintrag ist schlimmer als ein
  fehlender.

## Über uns (/ueber-uns)

Fünf Sektionen unter `src/components/sections/ueber-uns/`. Personendaten liegen
in [src/config/team.ts](src/config/team.ts).

| #   | Sektion                     | Komponente         |
| --- | --------------------------- | ------------------ |
| 1   | Intro (einzige H1)          | `about-intro.tsx`  |
| 2   | Mission                     | `mission.tsx`      |
| 3   | Team (Initialen-Avatare)    | `team-grid.tsx`    |
| 4   | Arbeitsweise                | `how-we-work.tsx`  |
| 5   | Kontakt-Band (primärer CTA) | `contact-band.tsx` |

Diese Seite nutzt bewusst **keine** `FinalCta` – das Kontakt-Band übernimmt die
Rolle des Abschluss-CTA. Zwei CTA-Sektionen untereinander wären eine Dopplung.

**Personenfreigabe – erledigt.** Alle drei Personen haben der Nennung
zugestimmt (`approved: true` in [team.ts](src/config/team.ts)). Die Zustimmung
deckt auch die Erwähnung beim Vornamen im Erzähltext des Abschnitts „Warum es …
gibt“ ab.

**Offen je Person: der Beschreibungssatz.** Solange `description` leer ist,
zeigt die Karte einen kleineren Marker. Den Satz gibt die Person selbst vor –
erfundene Beschreibungen kommen nicht hinein. Beide Marker hängen an je einem
Feld und verschwinden von allein, sobald es gefüllt ist.

Avatare sind Initialen auf brand-100 – **keine Stockfotos**: ein Stockfoto an
der Stelle einer realen Person ist eine kleine Lüge, und das ausgerechnet auf
der Seite, die Vertrauen herstellen soll. Dass Fotos noch fehlen, steht als
Fließtext in der Sektion; dafür braucht es keinen Marker.

**Weiterhin offen** ist die Nennung einer weiteren, nicht öffentlichen Person:
Der Platzhalter `[PERSON]` im Erzähltext und die Herkunftszeile im Hero der
Startseite tragen dazu je einen Marker.

## Demo (/demo)

Die einzige Conversion-Seite. Kein `FinalCta` – die Seite **ist** der CTA. Im
Header ist kein Navigationspunkt aktiv, weil /demo der Button ist.

| Baustein              | Datei                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------ |
| Seite                 | [src/app/demo/page.tsx](src/app/demo/page.tsx)                                             |
| Formular (Client)     | [src/components/sections/demo/demo-form.tsx](src/components/sections/demo/demo-form.tsx)   |
| Rechte Spalte         | [src/components/sections/demo/next-steps.tsx](src/components/sections/demo/next-steps.tsx) |
| Server Action         | [src/app/demo/actions.ts](src/app/demo/actions.ts)                                         |
| Validierung           | [src/lib/demo/schema.ts](src/lib/demo/schema.ts)                                           |
| Rate-Limit            | [src/lib/demo/rate-limit.ts](src/lib/demo/rate-limit.ts)                                   |
| Versand (Brevo)       | [src/lib/demo/brevo.ts](src/lib/demo/brevo.ts)                                             |
| Zustand (Typ + Start) | [src/lib/demo/state.ts](src/lib/demo/state.ts)                                             |

### ENV-Variablen

Vorlage: [.env.example](.env.example) nach `.env.local` kopieren und ausfüllen.
`.env.local` ist über `.gitignore` ausgeschlossen.

| Variable         | Zweck                                      | Pflicht               |
| ---------------- | ------------------------------------------ | --------------------- |
| `BREVO_API_KEY`  | API-Schlüssel für den Versand              | ja                    |
| `DEMO_MAIL_TO`   | Zieladresse der Anfragen                   | ja                    |
| `DEMO_MAIL_FROM` | Absender, muss in Brevo verifiziert sein   | ja                    |
| `DEMO_DRY_RUN`   | überspringt den Versand, loggt stattdessen | nein, nur Entwicklung |

**Keine dieser Variablen trägt ein `NEXT_PUBLIC_`-Präfix.** Next.js setzt nur
so präfixierte Werte in das Browser-Bundle ein. `BREVO_API_KEY` wird
ausschließlich in `src/lib/demo/brevo.ts` gelesen, und diese Datei wird nur aus
einer `"use server"`-Datei importiert.

Nach jedem Build gegenprüfen:

```bash
npm run build
grep -rl "BREVO_API_KEY\|DEMO_MAIL_TO\|api.brevo.com" .next/static/
# keine Ausgabe = nichts davon im ausgelieferten JavaScript
```

**`DEMO_DRY_RUN=true` niemals in Produktion.** Das Formular meldet dann Erfolg,
obwohl keine E-Mail verschickt wurde. Ohne vollständige Konfiguration
verweigert der Versand bewusst den Dienst („fail closed“), statt einen Erfolg
vorzutäuschen.

### Spamschutz ohne Captcha

Drei Stufen, alle ohne Drittanbieter und ohne zusätzliche Datenverarbeitung:

1. **Honeypot** – ein für Menschen unsichtbares, nicht fokussierbares Feld.
   Ausgefüllt → Anfrage verworfen.
2. **Zeitcheck** – zwischen Anzeige und Absenden müssen mindestens 3 Sekunden
   liegen. Gemessen wird die _Dauer_ auf dem Client, nicht ein Zeitstempel, damit
   abweichende Uhren keine Rolle spielen.
3. **Rate-Limit** – höchstens 5 Anfragen pro IP in 10 Minuten.

Abgewiesene Anfragen aus Stufe 1 und 2 bekommen dieselbe Erfolgsmeldung wie
echte. Ein sichtbares „abgelehnt“ wäre eine Rückmeldung, mit der sich die
Erkennung austesten ließe.

Zwei ehrliche Grenzen: Der gemessene Zeitwert kommt vom Client und ist
fälschbar – das ist eine Hürde gegen einfache Skripte, keine
Sicherheitsmaßnahme. Und das Rate-Limit liegt im Arbeitsspeicher des Prozesses:
Bei mehreren Instanzen oder in serverlosen Umgebungen zählt jede für sich.
Für mehr bräuchte es geteilten Speicher oder das Rate-Limit der Plattform.

## Rechtliches

Zentrale Ablage: [src/config/legal.ts](src/config/legal.ts). Die Freigabe ist
**getrennt**, weil Impressum und Datenschutzerklärung unterschiedlich weit sind:

| Schalter           | Wert    | Wirkung                                                     |
| ------------------ | ------- | ----------------------------------------------------------- |
| `IMPRINT_READY`    | `true`  | /impressum: kein noindex, kein Balken, in der Sitemap       |
| `PRIVACY_APPROVED` | `false` | /datenschutz: noindex, nicht in der Sitemap, Prüfungs-Zeile |

`isIndexable()` in [seo.ts](src/config/seo.ts) steuert noindex und
Sitemap-Eintrag gemeinsam – beide können nicht auseinanderlaufen.

### Impressum

Die Angaben sind echt (Rafael Gutmann, Einzelunternehmen). **Kein
Registereintrag**: Einzelunternehmen ohne Kaufmannseigenschaft sind nicht
eingetragen; die Rubrik fehlt ganz, statt leer dazustehen.

Fünf offene Punkte:

| Punkt                                                                                        | Zuständigkeit |
| -------------------------------------------------------------------------------------------- | ------------- |
| Betreiberangabe ist vorläufig – nach Gründung auf die Selyvi-Betreibergesellschaft umstellen | Recht         |
| Wortlaut „Haftung für Inhalte“                                                               | Vorlage fehlt |
| Wortlaut „Haftung für Links“                                                                 | Vorlage fehlt |
| Wortlaut „Urheberrecht“                                                                      | Vorlage fehlt |
| Wortlaut „Verbraucherstreitbeilegung / Universalschlichtungsstelle“                          | Vorlage fehlt |

Die vier Textabschnitte sind **strukturell angelegt, aber leer**. Der
Vorlagentext lag der Anweisung nicht bei. Es sind juristische Standardtexte,
deren Wortlaut Bedeutung hat – eine selbst formulierte Fassung wäre genau die
Sorte Text, die im Streitfall nicht trägt. Zum Ausfüllen: `body` je Abschnitt in
`imprintTextSections` füllen, dann verschwindet der Marker automatisch.

### Datenschutzerklärung

Inhaltlich vollständig für das, was die **Website** tut – jede Aussage ist im
Repository belegbar:

| Aussage                      | Beleg                                                          |
| ---------------------------- | -------------------------------------------------------------- |
| Formularfelder               | [schema.ts](src/lib/demo/schema.ts)                            |
| Versand über Brevo           | [brevo.ts](src/lib/demo/brevo.ts)                              |
| Schriften lokal              | [layout.tsx](src/app/layout.tsx), `next/font`                  |
| keine Cookies, kein Tracking | kein entsprechender Code im Projekt                            |
| Verantwortlicher             | [legal.ts](src/config/legal.ts), eine Quelle mit dem Impressum |

**Strenger Scope.** Nichts über das Produkt Selyvi, nichts über KI-Verarbeitung,
nichts über Schülerdaten, nichts über künftige Funktionen. Die Website
verarbeitet davon nichts. Was die Anwendung später verarbeitet, gehört in eine
eigene Erklärung für die Anwendung.

Zwei offene Punkte:

| Punkt                                                         | Zuständigkeit |
| ------------------------------------------------------------- | ------------- |
| AVV und Standardvertragsklauseln mit Vercel bestätigen lassen | Anwalt        |
| Konkrete Löschfrist für Formularanfragen festlegen            | Recht         |

Danach `PRIVACY_APPROVED` auf `true` – das entfernt noindex, die Prüfungs-Zeile
und den Sitemap-Ausschluss in einem Schritt.

### Zwei fehlende Seiten

Im Footer standen unter „Rechtliches“ die Einträge **AGB** und
**Barrierefreiheit** – beide verlinkten auf `/impressum` und sind deshalb
entfernt. Vor dem Launch klären, ob die Seiten gebraucht werden (AGB je nach
Vertragsmodell, Barrierefreiheitserklärung je nach Anwendbarkeit des BFSG).

### Footer-Kontaktdaten

Die Kontaktspalte im Footer speist sich aus [legal.ts](src/config/legal.ts) und
ist bewusst reduziert: **nur die E-Mail-Adresse**, kein Telefon, keine
Anschrift. Die vollständigen Angaben stehen im Impressum – eine private
Mobilnummer auf jeder einzelnen Seite auszugeben, ist etwas anderes, als sie im
Impressum bereitzuhalten.

Damit nennt die Website an keiner Stelle zwei verschiedene Kontaktadressen.

## SEO-Grundausstattung

Eine Quelle für Titel, Beschreibungen, Canonical-URLs, Open Graph und Sitemap:
[src/config/seo.ts](src/config/seo.ts). Seiten holen ihre Metadaten über
`pageMetadata("/pfad")` ab, statt sie selbst zu formulieren – so können
Seitentitel und Sitemap nicht auseinanderlaufen.

| Baustein             | Datei                                                            |
| -------------------- | ---------------------------------------------------------------- |
| Zentrale Config      | [src/config/seo.ts](src/config/seo.ts)                           |
| Basis-Metadaten      | [src/app/layout.tsx](src/app/layout.tsx)                         |
| OG-Bild (1200×630)   | [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)       |
| Favicon              | [src/app/icon.tsx](src/app/icon.tsx)                             |
| Apple-Touch-Icon     | [src/app/apple-icon.tsx](src/app/apple-icon.tsx)                 |
| Sitemap              | [src/app/sitemap.ts](src/app/sitemap.ts)                         |
| robots.txt           | [src/app/robots.ts](src/app/robots.ts)                           |
| JSON-LD (Startseite) | [src/components/seo/json-ld.tsx](src/components/seo/json-ld.tsx) |

**Titelmuster:** `Seitentitel – Produktname`, Startseite
`Produktname – Die KI-Assistenz für Lehrkräfte`. Alle Beschreibungen sind aus
den Intro-Texten der jeweiligen Seite abgeleitet – was in der Trefferliste
steht, muss die Seite auch einlösen.

**Sitemap und robots.txt.** Die Sitemap speist sich aus derselben Routenliste
wie die Seitentitel. `/impressum` und `/datenschutz` fehlen darin, solange
`LEGAL_APPROVED` false ist. In der robots.txt sind sie trotzdem **erlaubt**:
Nur wenn Crawler die Seiten abrufen dürfen, sehen sie das `noindex` im HTML.
Ein `Disallow` würde das Gegenteil bewirken.

**JSON-LD.** `Organization` und `SoftwareApplication` mit genau den Angaben,
die belegbar sind. Bewusst **ohne** `aggregateRating`, `review`, `offers` oder
Preise – das wäre Schema.org-Spam, ein Abstrafungsrisiko und bei einer Website,
die Schulen Vertrauen abverlangt, das falsche Signal. Der Verifikationslauf
prüft aktiv, dass diese Felder nicht auftauchen.

**OG-Bild und Icons austauschen.** Alle drei sind Platzhalter aus Code. Zum
Ersetzen die jeweilige `.tsx`-Datei löschen und eine Bilddatei mit demselben
Namen nach `src/app/` legen (`opengraph-image.png`, `icon.png` oder
`favicon.ico`, `apple-icon.png` in 180×180). Next erkennt beide Konventionen,
es ist kein Code nötig. Nach einem Austausch des OG-Motivs die Zahl in
`OG_IMAGE.url` (`?v=1`) erhöhen, damit soziale Netzwerke das Bild neu holen.

Hinweis: Das OG-Bild rendert mit einer System-Sans, nicht mit IBM Plex –
`ImageResponse` läuft außerhalb des Dokuments und kennt die Webfont-Einbindung
nicht. Für ein Platzhalter-Motiv vertretbar; beim Austausch gegen ein
gestaltetes Bild erübrigt sich der Punkt.

## Deployment

### Repository

Das Repository ist **privat** und enthält den Next.js-Projektordner als Wurzel –
in Vercel ist deshalb **kein** „Root Directory" zu setzen.

Nicht im Repository: `node_modules/`, `.next/`, jede `.env*` außer
[.env.example](.env.example) (reine Platzhalter). Versioniert bleibt
`screenshots/`, weil [AUDIT.md](AUDIT.md) darauf verweist.

### Region: fra1

Die Function-Region steht in [vercel.json](vercel.json):

```json
{ "regions": ["fra1"] }
```

**Bewusst als Datei statt nur als UI-Einstellung.** Eine reine UI-Einstellung
ist nirgends nachlesbar und fällt bei einem Reimport des Projekts still auf die
Standardregion `iad1` (USA) zurück. Für die Datenschutzerklärung ist Frankfurt
aber eine zugesagte Tatsache – die Server Action des Demo-Formulars verarbeitet
dort personenbezogene Daten. Nach dem ersten Deploy in der Vercel-UI unter
Settings → Functions gegenprüfen, dass `fra1` aktiv ist.

### ENV-Variablen in Vercel (Production)

| Variable         | Wert                                          |
| ---------------- | --------------------------------------------- |
| `BREVO_API_KEY`  | direkt in der Vercel-UI eintragen             |
| `DEMO_MAIL_TO`   | Zieladresse für Anfragen                      |
| `DEMO_MAIL_FROM` | in Brevo bereits verifizierte Absenderadresse |
| `DEMO_DRY_RUN`   | **nicht setzen**                              |

Der Schlüssel gehört ausschließlich in die Vercel-UI – nie in Code, nie in
einen Chat, nie in ein Log. `DEMO_DRY_RUN` in Produktion nicht setzen: Das
Formular meldete sonst Erfolg, ohne eine Mail zu verschicken.

`DEMO_MAIL_FROM` ist vorerst die bestehende verifizierte Adresse.
**[PRÜFEN]** Nach dem Domainkauf auf einen `@selyvi.de`-Absender umstellen.

Ohne vollständige Konfiguration verweigert der Versand den Dienst und meldet
das ehrlich, statt einen Erfolg vorzutäuschen („fail closed").

### Smoke-Test

Gegen jede Deployment-URL ausführbar:

```bash
npm run smoke https://selyvi-website-xxxx.vercel.app
```

Geprüft werden: alle 8 Seiten mit Status 200, die 404-Seite mit Status 404, die
vier Sicherheits-Header auf jeder Antwort, keine Verweise auf Google-Font-Server,
`noindex` ausschließlich auf `/datenschutz`, Sitemap und robots.txt, sowie das
Fehlen von altem Produktnamen und Secret-Mustern in der Ausgabe.

**Nicht abgedeckt: die vier Formular-Pfade.** Server Actions brauchen einen
Browser. Diese vier von Hand auf der Preview-URL prüfen:

| Pfad                          | Erwartung                                                   |
| ----------------------------- | ----------------------------------------------------------- |
| Formular leer absenden        | vier Feldfehler, Fokus springt auf „Name"                   |
| Sofort absenden (unter 3 s)   | Erfolgsansicht, aber **keine** Mail – Zeitcheck greift      |
| Honeypot füllen               | Erfolgsansicht, aber **keine** Mail (Feld nur via DevTools) |
| Korrekt ausfüllen, 4 s warten | Erfolgsansicht **und** Mail an `DEMO_MAIL_TO`               |

Die beiden Abwehr-Pfade sind absichtlich nicht von einer echten Anfrage zu
unterscheiden – sichtbar wird der Unterschied nur im Function-Log von Vercel
(`Anfrage verworfen: …`) und daran, dass keine Mail ankommt.

## Launch-Restschritte

Erst **nach** dem Domainkauf. Vorher bleibt die Website auf der
Vercel-Preview-URL, und `SITE_URL` bleibt auf dem `.example`-Platzhalter.

| #   | Schritt                                                              | Wo                                                 |
| --- | -------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | `selyvi.de` als Primary Domain verbinden                             | Vercel → Settings → Domains                        |
| 2   | `selyvi.com` und `www.selyvi.de` als Redirect auf die Primary Domain | Vercel → Settings → Domains                        |
| 3   | `SITE_URL` auf `https://selyvi.de` umstellen                         | [src/config/seo.ts](src/config/seo.ts)             |
| 4   | Brevo-Absender-Domain verifizieren (SPF, DKIM, DMARC)                | Brevo                                              |
| 5   | `DEMO_MAIL_FROM` auf die neue `@selyvi.de`-Adresse umstellen         | Vercel → Environment Variables                     |
| 6   | OG-Vorschau prüfen und Cache leeren lassen                           | LinkedIn Post Inspector, Facebook Sharing Debugger |
| 7   | Property anlegen, Sitemap einreichen                                 | Google Search Console, Bing Webmaster Tools        |
| 8   | `npm run smoke https://selyvi.de` erneut ausführen                   | lokal                                              |

Zu Schritt 3: Canonical, `og:url`, Sitemap und robots.txt leiten sich alle aus
`SITE_URL` ab – es ist genau **eine** Zeile.

Zu Schritt 6: Das OG-Bild trägt `?v=2`. Falls das Motiv später ausgetauscht
wird, die Zahl in `OG_IMAGE.url` erhöhen, damit die Netzwerke es neu holen.

**Nicht vergessen, unabhängig vom Domainkauf:** `PRIVACY_APPROVED` steht auf
`false`. Solange trägt `/datenschutz` ein `noindex` und fehlt in der Sitemap.
Nach der anwaltlichen Prüfung auf `true` setzen.

## Geteilte Bausteine

- [`components/faq-accordion.tsx`](src/components/faq-accordion.tsx) – FAQ-Darstellung
  für Startseite, /schulen und /datenschutz-sicherheit. Inhalte bleiben in der
  jeweiligen Sektion, damit die Blöcke optisch nicht auseinanderlaufen.
- [`components/ui/review-marker.tsx`](src/components/ui/review-marker.tsx) –
  `[PRÜFEN]` bzw. `[PRÜFEN: <Notiz>]`.
- [`components/sections/dpa-band.tsx`](src/components/sections/dpa-band.tsx) –
  AVV-Aussage für /schulen und /datenschutz-sicherheit. Bewusst eine Komponente
  statt zweimal derselbe Text: Die Aussage muss auf beiden Seiten wortgleich
  bleiben, auch nachdem jemand sie überarbeitet hat.
- [`components/sections/final-cta.tsx`](src/components/sections/final-cta.tsx) –
  unverändert auf allen vier Seiten.

### Offene Platzhalter vor dem Livegang

- **Produktname**: `PRODUCT_NAME` in [src/config/brand.ts](src/config/brand.ts).
  Eine Zeile, wirkt auf Wortmarke, Metadaten, Fließtext und FAQ.
- **Alle `[PRÜFEN]`-Stellen** finden:

  ```bash
  grep -rn "ReviewMarker\|review:" src/
  ```

  Aktuell 50 Stellen, in drei Kategorien. Zwei davon (`DEMO_MAIL_TO`,
  `DEMO_MAIL_FROM`) stehen nicht im Quelltext, sondern in
  [.env.example](.env.example) – der Grep unten findet sie nicht.

  | Kategorie                  | Anzahl | Wo                                   |
  | -------------------------- | ------ | ------------------------------------ |
  | Launch-Blocker Sicherheit  | 13     | `/datenschutz-sicherheit`            |
  | Launch-Blocker Rechtliches | 7      | `/impressum` (5), `/datenschutz` (2) |
  | Übrige Platzhalter         | 30     | alle anderen Seiten                  |

#### LAUNCH-BLOCKER

Die Seite `/datenschutz-sicherheit` darf **nicht** live gehen, solange auch nur
einer dieser Punkte offen ist. Sie ist die Grundlage, auf der Schulen ihre
Beschaffungs- und Datenschutzprüfung aufsetzen – eine ungedeckte Zusage hier
kostet nicht nur den Abschluss, sondern die Prüfung insgesamt.

| Ort                        | Offener Punkt                                                                  | Wer entscheidet |
| -------------------------- | ------------------------------------------------------------------------------ | --------------- |
| Prinzip „EU-Hosting“       | finale Hosting-Architektur bestätigen                                          | Technik         |
| Prinzip „Verschlüsselung“  | Umfang der Verschlüsselung ruhender Daten bestätigen                           | Technik         |
| Prinzip „Rollen & Rechte“  | Rechtemodell in Abstimmung                                                     | Produkt         |
| Prinzip „KI-Verarbeitung“  | Modell-Anbieter, Verarbeitungsort, Zusicherung zur Nicht-Nutzung für Training  | Vertrag + Recht |
| Prinzip „Löschkonzept“     | Aufbewahrungs- und Löschfristen definieren                                     | Recht           |
| Dienstleister-Tabelle      | vollständige Subprozessoren-Liste (mind. Hosting, E-Mail-Versand, KI-Anbieter) | Vertrag + Recht |
| AVV-Sektion                | AVV-Dokument in Erstellung                                                     | Recht           |
| Für Datenschutzbeauftragte | Unterlagen-Paket                                                               | Produkt + Recht |
| Für Datenschutzbeauftragte | dedizierte Kontaktadresse für Datenschutzanfragen                              | Betrieb         |
| FAQ, 4 Antworten           | jeweils abhängig von den Punkten darüber                                       | –               |

Prüfen mit:

```bash
grep -rn "ReviewMarker\|review:" src/components/sections/sicherheit/
```

#### Übrige Platzhalter

Blockieren den Launch nicht, müssen aber vor dem Livegang aufgelöst oder
gestrichen werden.

| Seite        | Offen                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | 3 FAQ-Antworten (Schulformen, Datenzugriff, Einstiegsprozess), Einverständnis Person (Hero), Zahlen zur Praxis-Aussage                                            |
| `/produkt`   | 3 Stichpunkte (Bewertungsmaßstäbe, gemeinsame Ablage, Rollen- und Rechtekonzept), 3 „In Arbeit“-Karten, 4 Praxis-Beispiele in den Mikrozeilen                     |
| `/schulen`   | 2 Timeline-Schritte (Pilotphase, Schulung), Rollen-Block rechte Spalte, AVV-Dokument, 3 FAQ-Antworten                                                             |
| `/ueber-uns` | Formulierung Teamherkunft, 3 Beschreibungssätze der Personen, Karte „Mit Lehrkräften entwickelt“, Einverständnis Person ([PERSON] im Abschnitt „Warum es … gibt“) |
| `/demo`      | Reaktionszeit (Erfolgsansicht), Kontaktadresse (Fehlerfall), `DEMO_MAIL_TO`, `DEMO_MAIL_FROM` in `.env.example`                                                   |

Mehrere Punkte hängen zusammen: Rollen- und Rechtemodell sowie der AVV-Entwurf
tauchen auf drei Seiten auf. Wer sie auflöst, erledigt jeweils mehrere Marker –
und muss alle Fundstellen anfassen, nicht nur die auffälligste.

Die drei Beschreibungssätze auf `/ueber-uns` hängen an keinem anderen Punkt,
brauchen aber jeweils einen Satz der genannten Person – das lässt sich weder
sammeln noch delegieren. Die Freigaben zur Nennung selbst liegen inzwischen vor.

- **DSGVO-Block**: Die vier Erläuterungssätze sind rechtliche Zusagen und
  brauchen eine Freigabe von Rechtsseite.
- **Testimonials**: `SHOW_TESTIMONIALS` in
  [src/config/features.ts](src/config/features.ts) bleibt auf `false`, bis eine
  echte, schriftlich freigegebene Pilotstimme vorliegt. Die Datenliste in
  `testimonials.tsx` ist bewusst leer – das Flag allein schaltet nichts sichtbar.
- **Hero-Mockup**: `interface-skeleton.tsx` zeigt nur Flächen, keine erfundenen
  Texte oder Zahlen. Ersetzen, sobald echte Screenshots existieren.

## Screenshots erzeugen

Unter Windows erzwingt das Betriebssystem eine Mindestfensterbreite von rund
500 px. `msedge --headless --window-size=390,844 --screenshot` rendert deshalb
ein breiteres Layout und schneidet das Bild anschließend auf 390 px zu – das
sieht aus wie ein horizontaler Überlauf, ist aber ein Artefakt des Werkzeugs.

Für Viewports unter ~500 px daher echte Geräte-Emulation über das
DevTools-Protokoll verwenden (`Emulation.setDeviceMetricsOverride` +
`Page.captureScreenshot`) statt `--window-size`.
