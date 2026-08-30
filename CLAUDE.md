# CLAUDE.md – produkt-website

## Projekt
Marketing-Website für eine B2B-SaaS-Plattform für Schulen (Zielgruppen: Lehrkräfte, Schulleitungen & Forschende, Sprache: Deutsch). Produktname und Logo sind PLATZHALTER (<Wordmark/>-Komponente), bis der finale Name feststeht. Seiten: /, /fuer-lehrkraefte, /schulen, /forschung, /datenschutz-sicherheit, /ueber-uns, /einblick, /mitgestalten, /demo, /impressum, /datenschutz. (/produkt leitet permanent auf /fuer-lehrkraefte um.)

## SICHERHEIT – PFLICHT VOR JEDER PAKET-INSTALLATION (keine Ausnahme)
1. WEBSUCHE nach "<paketname> compromised / supply chain / malware" – npm-Lieferketten-Angriffe (TanStack-Hack, Shai-Hulud, keyv/cacheable, node-gyp) sind Standard-Bedrohung, nicht Ausnahme. Bei irgendeinem Treffer: STOPP und nachfragen.
2. PAKET-INSPEKTION vor der Installation: Tarball prüfen (npm pack --dry-run bzw. Registry-Ansicht) auf install-Hooks (pre/postinstall), obfuskierten Code, unerwartete Netzwerk-Calls.
3. COOLDOWN: Keine Version installieren, die jünger als ~14 Tage ist – nimm die letzte ältere Stable.
4. Installation NUR mit npm install --ignore-scripts, exakt gepinnt (die .npmrc erzwingt das – niemals aushebeln). Kein --force. Kein npx mit Remote-Download (nur npx --no-install).
5. Nach jeder Installation: npm audit dokumentieren.

## DESIGN-TOKENS (einzige erlaubte Farbquelle)
brand-100 #c7ecff · brand-400 #1e9cd7 (NIE für Text <24px, Kontrast nur 3,0:1) · brand-600 #0074bd · brand-800 #015b97 · ink #0e1b26 (Fließtext) · surface #ffffff · surface-alt #f6fafd · --cta (Variante A #2c40ff / B #0074bd via Config).
REGELN: --cta ausschließlich für den primären CTA-Button. Keine Farben außerhalb der Tokens. Alle Kontraste WCAG 2.1 AA.

## DSGVO (nicht verhandelbar)
Zur Laufzeit KEINE Requests an Drittserver (Fonts lokal via next/font – nach jedem Font-Change im Network-Log verifizieren). Kein Google Analytics, keine externen Embeds ohne Zwei-Klick-Lösung. Formulare nur über EU-Dienste (Brevo).

## TON
Jede Sektion beantwortet zuerst, welche Last sie nimmt oder was sie zurückgibt — dann erst, wie. Verkaufssprache ("Jetzt sichern", "Vorteile nutzen", "Tester") ist verboten. Wir sprechen mit Menschen in einem sozialen Beruf, nicht mit Käufern.

### Zukunfts-Szenen
Funktionen mit Status "Rollout offen" oder "Teilweise" dürfen als Szene gezeigt werden — ausschließlich mit einem dauerhaft sichtbaren Badge "In Entwicklung" IM UiWindow-Fensterkopf, das in JEDEM Frame steht, auch im reduced-motion-Endbild (staticStepId entsprechend wählen). Status "Nicht gebaut" und "Prototyp" bleiben tabu. Eine Szene ohne Badge ist eine Verfügbarkeitszusage — auch wenn der Text daneben etwas anderes sagt.

## STIL (Anti-KI-Slop)
Deutsch, präzise, keine Emojis im UI, keine Gradients, keine Superlative im Copy, viel Weißraum. Messlatte: behördentauglich. Icons: lucide-react (Brand-Icons: lokale SVGs in brand-icons.tsx).

## ARBEITSWEISE
Ein Prompt = ein abgeschlossener Schritt. Jeder Schritt endet mit fehlerfreiem npm run build. UI-Änderungen enden mit Screenshot. Bestehende Tokens/Komponenten wiederverwenden statt neu erfinden. Nichts bauen, was nicht beauftragt wurde.
