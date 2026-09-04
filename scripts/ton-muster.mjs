/**
 * Die Ton-Muster aus CLAUDE.md, Abschnitt TON – an EINER Stelle.
 *
 * ==========================================================================
 * WARUM DIE MUSTER AUS DEM SMOKE-TEST AUSGEZOGEN SIND
 * ==========================================================================
 * Sie galten bisher nur für ausgelieferte SEITEN. Die Formulare haben aber
 * Zustände, die in keinem HTML stehen: Validierungsfehler, Rate-Limit-Hinweis,
 * Erfolgsmeldung, die Meldung bei totem Versand. Genau dort steht Text, den
 * ein Mensch in einem schlechten Moment liest – und genau dort wurde er nie
 * gegen die Ton-Regeln geprüft.
 *
 * Jetzt lesen zwei Prüfungen dieselbe Liste:
 *   scripts/smoke-test.mjs     – die ausgelieferten Seiten
 *   scripts/formular-test.mjs  – die erzwungenen Formular-Zustände
 *
 * Erzwungen heißt: mit Mock-Endpunkten in den Fehlerpfad getrieben, nicht
 * gehofft, dass er irgendwann auftritt.
 */

export const TON_MUSTER = [
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
  [/\bgeplant(e|er|es)? (Funktion|Schnittstelle|Anbindung|Ausbau)/i, "D", "„geplante …“"],
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
  [/\bfolg(t|en) (bald|sp(ä|ae)ter|danach|noch|zu einem sp)/i, "D", "temporales „folgt“"],
  [/\b(steht|stehen) noch aus\b/i, "D", "„steht noch aus“"],
  [/\bgibt es (bald|demn)/i, "D", "„gibt es bald“"],
];

/**
 * Ausnahme von Regel D – nur noch EINE, seit dem 02.09.2026.
 *
 * PRODUCT_HOSTING_NOTE, der Serverstandort. Sie wird vor der Pruefung aus
 * dem Text geschnitten; wer den Wortlaut in product.ts aendert, aendert ihn
 * hier mit.
 *
 * Die zweite Ausnahme war SCHOOL_TYPE_ANSWER mit „Weitere Schulformen
 * folgen." Der Satz ist ersatzlos weg: Selyvi ist fuer alle Schularten von
 * Klasse 1 bis Abitur gebaut, es folgt nichts mehr. Damit ist Regel D um
 * eine Ausnahme strenger – und diese Zeile beweist es, weil ein
 * Wiederauftauchen des Satzes den Smoke-Test jetzt fehlschlagen liesse.
 */
export const TON_AUSNAHMEN = [
  "Vor dem Betrieb mit echten Schülerdaten ziehen die Produktserver nach Deutschland um und jeder Schule liegt ein Auftragsverarbeitungsvertrag vor – beides ist in Vorbereitung.",
];

/**
 * Prüft einen Text gegen alle Muster.
 *
 * Die Ausnahmen werden vorher herausgeschnitten – ein erlaubter Satz darf
 * kein Muster auslösen.
 */
export function pruefeTon(text) {
  let rest = text;
  for (const satz of TON_AUSNAHMEN) rest = rest.split(satz).join(" ");
  const treffer = [];
  for (const [muster, regel, name] of TON_MUSTER) {
    if (muster.test(rest)) treffer.push({ regel, name });
  }
  return treffer;
}
