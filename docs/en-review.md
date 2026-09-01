# Freigabe der englischen Fassung

**An Rafael und Christian.** Diese Liste enthält die Sätze, bei denen die
Übersetzung eine **inhaltliche Entscheidung** getroffen hat — nicht die, die
sich von selbst ergeben. Bitte je Zeile: übernehmen, ändern oder streichen.

**selyvi.com geht erst live, wenn diese Liste abgehakt ist.** Solange bleibt
das zweite Vercel-Projekt ohne Domain.

Stand: die Sprachschicht steht und trägt Navigation, Kopf- und Fußzeile,
Meta-/OG-Texte, die geteilten Konstanten, den Hero und das Formular. Die
übrigen Sektionen sind noch deutsch verdrahtet — siehe „Was noch fehlt" am
Ende.

---

## 1 · Die H1 der Startseite

**Deutsch:** „Der Papierkram hat jetzt eine Assistenz."

|                 | Vorschlag                            | Charakter                                                                                                                    |
| --------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **A (gesetzt)** | **Paperwork just got an assistant.** | Behält Frechheit und Grammatik: Der Papierkram ist Subjekt, nicht die Leserin. „just got" trägt dasselbe beiläufige „jetzt". |
| B               | Paperwork now has an assistant.      | Wörtlicher, dafür flacher. „now has" klingt nach Produktdatenblatt.                                                          |
| C               | The paperwork finally has help.      | Wärmer, aber „finally" schiebt der Leserin ein Gefühl unter — Regel A grenzwertig.                                           |

Empfehlung: **A**.

## 2 · Der primäre Handlungsaufruf

**Deutsch:** „Selyvi kennenlernen" · **Englisch:** „Meet Selyvi"

„Book a demo" wäre die übliche Wendung — und genau die Verkaufssprache, die
die deutsche Seite bewusst vermeidet (auf /demo wird nichts gebucht, es wird
angefragt). „Meet Selyvi" hält die Einladung. **Alternative:** „Get to know
Selyvi" — korrekter, aber sperrig für einen Knopf.

## 3 · Die Wirkungszeile

**Deutsch:** „Jeder Entlastungsbericht trägt direkt unter den Zahlen eine
Einordnung: Gemessenes steht als Messwert, Geschätztes als Schätzwert – und
keine dieser Kennzeichnungen lässt sich ausblenden, auch von uns nicht."

**Englisch:** „Every workload relief report carries a note directly beneath
the figures: measured values are labelled as measured, estimates as
estimates — and neither label can be switched off, not even by us."

Die deutsche Fassung spielt mit „Messwert / Schätzwert" als **Substantiven**.
Im Englischen gibt es dieses Paar nicht so knapp; „labelled as measured" löst
es über das Verb. **Entscheidung:** Ist das für eine Forscherin präzise
genug, oder soll dort „as a measured value / as an estimate" stehen?

## 4 · Das Versprechen

**Deutsch:** „Selyvi schlägt vor. Sie entscheiden."
**Englisch:** „Selyvi suggests. You decide."

Kurz und gleich gebaut. **Zu prüfen:** „You decide" ist im Englischen etwas
schärfer als „Sie entscheiden" — es kann als Zurückweisung von Verantwortung
gelesen werden („dein Problem"). Alternative: „Selyvi suggests. The decision
is yours."

## 5 · Die Mission

**Deutsch:** „Wir bauen die Assistenz, die Routinearbeit übernimmt. Die
pädagogische Entscheidung bleibt beim Menschen."

**Englisch:** „We build the assistant that takes on the routine work. The
teaching judgement stays with the person."

„pädagogisch" ist im Englischen ein Problem: „pedagogical" klingt akademisch,
„educational" zu weit. „Teaching judgement" beschreibt, was gemeint ist.
**Alternative:** „The professional judgement stays with the teacher."

## 6 · Die Praxis-Aussage

**Deutsch:** „Entwickelt in Zusammenarbeit mit Lehrkräften aus ganz
Deutschland."
**Englisch:** „Built together with teachers across Germany."

**Wichtig:** „across Germany" muss stehen bleiben. Ohne die Länderangabe liest
eine internationale Leserin es als „mit Lehrkräften weltweit" — das wäre eine
ungedeckte Behauptung.

## 7 · Die Schulform-Antwort

**Deutsch:** „… von der Grundschule bis zum Abitur. Weitere Schulformen
folgen."
**Englisch:** „… from primary through to upper secondary. More school types
follow."

„Abitur" hat kein Gegenstück. „Upper secondary" ist der Begriff aus der
OECD-Statistik. **Alternative:** „from primary school to the German Abitur" —
präziser, verlangt aber Vorwissen.

## 8 · Der Serverstandort

**Deutsch/Englisch:** die einzige Einschränkung der ganzen Website.

„Before we work with real pupil data, the product servers move to Germany and
every school has a data processing agreement in place — both are in
preparation."

**Zu prüfen:** Im Deutschen steht „Vor dem Betrieb mit echten Schülerdaten".
„Before we work with" ist etwas weicher als „before operating with".
Rechtlich relevante Zeile — bitte genau lesen.

## 9 · Die Navigation der nachgebauten Anwendung

Heute → Today · Meine Klassen → My classes · Live-Unterricht → Live lesson ·
Timeline → Timeline · Überprüfung → Review · Förderpläne → Support plans ·
Material → Materials · Klassenanalyse → Class analysis

**Das ist eine Entscheidung, keine Übersetzung:** Die echte Anwendung ist
**heute deutsch**. Auf selyvi.com zeigen wir eine englische Oberfläche, die es
so noch nicht gibt.

Drei Wege:

1. **Übersetzen (gesetzt).** Die gezeigte Oberfläche passt zur Sprache der
   Seite. Wer danach eine Demo sieht, sieht Deutsch — das gehört im Gespräch
   gesagt.
2. Deutsche Beschriftungen stehen lassen. Ehrlicher, aber eine englische
   Seite mit deutscher Oberfläche wirkt unfertig.
3. Kein englisches Deployment, bis die Anwendung englisch ist.

**Entscheidung nötig.** Bei 1 gehört ein Satz ins Verkaufsgespräch.

## 10 · Das Schulbarometer-Band

Die drei Prozentwerte stammen aus einer Befragung **deutscher** Lehrkräfte.
Im englischen Text muss „German teachers" ausdrücklich stehen, sonst liest man
sie als internationale Zahlen. Quelle und Jahreszahlen bleiben unverändert.

**Noch nicht übersetzt** — die Sektion ist Teil der offenen Migration.

## 11 · Rechtstexte

- **Impressum → „Legal notice".** Die Pflichtangaben nach § 5 DDG und § 18
  MStV gelten unverändert; nur die Beschriftungen sind englisch. Inhalt
  identisch.
- **Datenschutzerklärung → „Privacy policy".** Übersetzung, `noindex` wie im
  Deutschen, Kopfzeile „Anwaltsprüfung ausstehend".

**Beides noch nicht gebaut.** Neuer Punkt in der NACH-LAUNCH-LISTE der README:
EN-Rechtstexte vom Anwalt prüfen lassen. Ohne diese Prüfung geht selyvi.com
nicht live.

---

## Was noch fehlt

Die Sprachschicht steht und ist bewiesen: `SITE_LOCALE=en` baut, `<html
lang="en">`, englische Navigation, englische H1, Canonical auf selyvi.com,
hreflang zwischen beiden Domains, und der ungenutzte Katalog fällt aus dem
Bündel.

Was noch **nicht** über die Sprachschicht läuft, misst
`node scripts/sprach-check.mjs`: aktuell **290 Fundstellen in 54 Dateien**.
Das sind die Sektionstexte, die Szenen, die Beispieldaten und die
Rechtsseiten. Bis diese Zahl 0 ist, zeigt ein englischer Build an diesen
Stellen Deutsch.

Reihenfolge nach Nutzen:

1. Startseite (Sektionen unter dem Hero) — die meistgelesene Seite
2. /fuer-lehrkraefte und /schulen — die beiden Verkaufsseiten
3. /datenschutz-sicherheit — die Seite, auf der eine DSB landet
4. Rechtstexte (mit Anwalt)
5. /forschung, /ueber-uns, /mitgestalten, /demo
6. Szenen, Beispieldaten und /einblick — der größte Block, der zuletzt
   sichtbar wird
