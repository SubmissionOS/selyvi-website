# Nachgebaute Oberflächen: was belegt ist und was nicht

Dieses Dokument gehört zu den Screenshots in diesem Ordner. Es hält fest,
welche Ansicht der echten Anwendung belegt ist, wo die Website davon abweicht
und **warum** — getrennt nach „bewusst anders" und „unbekannt, Screenshot
fehlt".

Regel: Keine Vermutung darf wie eine Ablesung aussehen. Wer eine Zeile aus
der Spalte „unbekannt" auflöst, legt den Screenshot hier ab, baut die Ansicht
nach und streicht die Zeile.

## Vorhandene Referenzen

| Datei                     | Ansicht                                            | Zeigt                                                                                          |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `meine-klassen.png`       | Meine Klassen → Übersicht (gescrollt)              | Klassenauswahl, Namenssuche, Schülerliste, Klassenansicht, Notenschnitt, Klassenübersicht, Klassen-Puls |
| `Stundenplan.png`         | Meine Klassen → Stundenplan (101 px nach unten versetzt) | Seitenleiste vollständig mit Aktiv-Zustand, beide Tab-Ebenen, Stundenplan-Raster                |
| `Material-generator.png`  | Material → Material erstellen                      | Wortmarke, Seitenleiste vollständig, Formularaufbau, Primary- und Outline-Knopf, Feedback-Fuß  |

Alle drei zeigen den **Lehrkraft-Modus**. Vom Leitungsmodus liegt kein Bild
vor.

## Erledigt

| Was                     | Beleg                                       | Stand                                                                     |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------- |
| Navigation (8 Einträge) | `Material-generator.png`, `Stundenplan.png` | abgeschrieben, Reihenfolge und Beschriftungen wörtlich                    |
| Aktiv-Zustand           | `Stundenplan.png`                           | hellblaue Fläche, 4 px Balken links, blaue Schrift — Balken gemessen      |
| Farben                  | alle drei                                   | ausgezählt, siehe `src/config/app-reference.ts`                          |
| Zwei Tab-Ebenen         | `Stundenplan.png`, `Material-generator.png` | oben gefüllter Reiter im Rahmen, rechts Text mit blauem Unterstrich       |
| Klassenansicht          | `meine-klassen.png`                         | Karten, Förderblick-Chips, Klassen-Puls-Donut                            |
| **Seitentitel**         | Vollbild-Aufnahme vom 01.09.2026, 09:45     | „Meine Klassen"; „Klassen" ist die **Karten**überschrift eine Zeile tiefer |

### Zur letzten Zeile — ein Lesefehler, gemessen widerlegt

`Stundenplan.png` ist gegenüber dem Vollbild um **101 px nach unten versetzt**
(der aktive Navigationseintrag sitzt dort bei y=80 statt bei y=181). Der
Seitentitel fällt in diesem Ausschnitt oben heraus. Sichtbar blieb die
Kartenüberschrift — und die wurde für den Titel gehalten. Der Nachbau zeigte
deshalb „Klassen" als Seitentitel. Korrigiert.

**Die Vollbild-Aufnahme liegt nicht in diesem Ordner** (siehe Wunschliste,
Punkt 0).

## Bewusst anders — keine Screenshot-Frage

| Was                                 | Warum                                                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Seitenleiste 144 px statt 14,2 %    | 14,2 % von rund 600 px Fensterbreite wären 85 px; darin steht „Live-Unterricht" nicht mehr. Originalwert als `APP_SIDEBAR_RATIO` festgehalten. |
| Schrift des aktiven Eintrags dunkler | Original 3,99:1 auf hellblau, WCAG AA verlangt 4,5:1. Jetzt brand-800, 5,73:1.                                                            |
| Donut-Bogen dunkler                  | Original 2,09:1 gegen seine Spur, WCAG 1.4.11 verlangt 3:1. Jetzt 3,30:1, gleiche Farbfamilie.                                            |
| Fenster-Chrome (Punkte, Chips)       | Gehört der Website, nicht der Anwendung. Es sagt: hier wird etwas gezeigt.                                                                |
| Modus-Umschalter Lehrkraft/Leitung   | Gehört uns. Er trägt den Schloss-Hinweis auf das Kennenlernen.                                                                            |
| Icons aus lucide                     | Formen stimmen (Haus, Personen, Mikrofon, Uhr, Klemmbrett, Herz, Buch, steigende Linie), die Zeichnung nicht — anderer Symbolsatz.        |
| Namen, Klasse, Zahlen                | Unser Cast: Klasse 3b, Emma K. und die anderen. Aus den Screenshots ist **kein Name übernommen**.                                          |
| Klassen-Puls 42 % statt 30 %         | Damit die Zahl niemand für eine Messung hält. Beispieldaten, wie alles im Fenster.                                                        |
| Zeile zu „Sozialverhalten" fehlt     | Steht wörtlich in `meine-klassen.png`, ist aber eine Funktionsaussage, die `docs/produktstand-2026-08.md` nicht führt. Beschriftungen ja, Behauptungen nein. |

## Unbekannt — hier fehlt ein Screenshot

| Was                       | Derzeit im Nachbau                                              | Kennzeichnung im Code               |
| ------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| **Zeugnisbemerkung**      | Aktion im Schüler-Detail (Klick auf ein Kind)                    | „Mapping folgt nach Screenshot"      |
| **Elternpost**            | Aktion im Schüler-Detail                                         | „Mapping folgt nach Screenshot"      |
| **Sitzplan**              | Tab „Unterricht planen" in Meine Klassen                        | „Ort im Original unbestätigt"        |
| **Live-Unterricht**       | Beobachtungen, Diktat, freie Fragen — Layout ist unser Entwurf   | Navigationspunkt belegt, Inhalt nicht |
| **Timeline**              | Entwicklungsverlauf je Kind — Layout ist unser Entwurf           | Navigationspunkt belegt, Inhalt nicht |
| **Heute**                 | gesperrt                                                          | Schloss                               |
| **Überprüfung**           | gesperrt                                                          | Schloss                               |
| **Förderpläne**           | gesperrt                                                          | Schloss                               |
| **Klassenanalyse**        | gesperrt                                                          | Schloss                               |
| **Tab „Dokumente"**       | gesperrt                                                          | Schloss                               |
| **Tab „[Fach]"**          | gesperrt                                                          | Schloss                               |
| **Tab „Alle Klassen"**    | gesperrt                                                          | Schloss                               |
| **Leitungsmodus**         | Seitenleiste aus dem Produktstand hergeleitet, nicht abgeschrieben | Kommentar in `demo-data.ts`           |

## Wunschliste — was als Screenshot fehlt

Nach Nutzen sortiert. Jeweils **eine** Aufnahme, Fenster ganz oben (nicht
gescrollt), volle Breite, mit Beispieldaten statt echter Kinder.

0. **Meine Klassen, ungescrollt.** Liegt vor (01.09.2026, 09:45), nur nicht in
   diesem Ordner. Sie belegt den Seitentitel und ist der Beleg für die
   Korrektur oben — sie gehört hier abgelegt.
1. **Live-Unterricht.** Der Bereich, auf den vier Szenen der Website zeigen.
   Solange sein Inhalt unser Entwurf ist, ist die meistgezeigte Ansicht die am
   wenigsten belegte.
2. **Wo Zeugnisbemerkungen entstehen.** Zeugnisse sind das stärkste Argument
   der Website. Sie hängen im Nachbau an einer Stelle, die geraten ist.
3. **Wo Elternmails entstehen.** Dieselbe Lage.
4. **Leitungsmodus, Startansicht.** Die einzige Seitenleiste, die noch
   hergeleitet statt abgeschrieben ist — und die, die eine Schulleitung im
   Gespräch als Erstes sieht.
5. **Timeline.**
6. **Sitzplan** — oder die Auskunft, unter welchem Navigationspunkt er sitzt.
7. **Heute.** Der Einstiegsbildschirm; im Einblick derzeit gesperrt.
8. Später: Überprüfung, Förderpläne, Klassenanalyse, Dokumente, Alle Klassen.
