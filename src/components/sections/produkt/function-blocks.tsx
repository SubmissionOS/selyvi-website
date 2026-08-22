import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/config/brand";
import {
  TRANSLATION_LANGUAGE_COUNT,
  TRANSLATION_LANGUAGES_SENTENCE,
} from "@/config/product";
import { Button } from "@/components/ui/button";
import { DocumentationScene } from "@/components/scenes/produkt/documentation-scene";
import { CommunicationScene } from "@/components/scenes/produkt/communication-scene";
import { TeachingScene } from "@/components/scenes/produkt/teaching-scene";
import { SteeringScene } from "@/components/scenes/produkt/steering-scene";

type FunctionBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  scene: ReactNode;
  action?: { label: string; href: string };
};

/**
 * Die vier Bereiche aus docs/produktstand-2026-08.md, in dessen Reihenfolge:
 * Dokumentation, Kommunikation, Unterricht, Steuerung.
 *
 * ==========================================================================
 * NUR „LIVE"-FUNKTIONEN. Was im Dokument „Rollout offen", „Teilweise" oder
 * „Nicht gebaut" traegt, steht hier NICHT – auch nicht abgeschwaecht.
 * ==========================================================================
 *
 * Konkret nicht auf dieser Seite, obwohl es naheliegend waere:
 *   - Uebernahme von Original-Arbeitsblaettern aus dem Korpus („Rollout offen")
 *   - Stilprofil per Upload eigener Texte („Teilweise" – Backend steht, die
 *     Oberflaeche fehlt). Es steht stattdessen in <Roadmap />.
 *   - Der KI-Vorschlag zum Sitzplan – der Sitzplan selbst ist live, der
 *     Vorschlag ist Prototyp. Der Stichpunkt nennt deshalb nur den Sitzplan.
 *
 * Zwei Stichpunkte benennen ausdruecklich eine GRENZE statt eine Faehigkeit:
 * der Versand ueber das eigene Mailprogramm und die nie automatische Zuordnung
 * im Massenupload. Beides faellt in einer Demo ohnehin auf; wer es vorher
 * gelesen hat, erlebt es als Haltung statt als Luecke.
 */
const blocks: FunctionBlock[] = [
  {
    id: "dokumentation",
    title: "Dokumentation",
    paragraphs: [
      "Was Ihnen im Unterricht auffällt, halten Sie sofort fest – getippt oder diktiert. Aus dem Freitext wird eine strukturierte Beobachtung mit Fach, Kategorie, Priorität und Förderhinweis.",
      "Für die Stunde selbst gibt es einen Live-Unterricht-Modus, in dem Sie für mehrere Kinder gleichzeitig erfassen. Für zwischendurch eine Kurzform.",
      `Kompetenzen schätzt ${PRODUCT_NAME} bewusst nicht automatisch aus Noten ab: Aus einer Deutschnote folgt nicht, ob ein Kind flüssig liest.`,
    ],
    bullets: [
      "Beobachtungen per Tastatur oder Diktat",
      "Kompetenzen entlang von 43 Fächern, mit Jahrgangsbezug",
      "Je Kind eine chronologische Timeline mit Förderempfehlungen",
      "Freie Fragen an die eigenen Daten – der Kontext bleibt serverseitig auf sie begrenzt",
    ],
    scene: <DocumentationScene />,
  },
  {
    id: "kommunikation",
    title: "Kommunikation",
    paragraphs: [
      "Zeugnisbemerkungen entstehen aus Ihren eigenen Beobachtungen, Noten und Kompetenzeinschätzungen – in dem Schreibstil, den die Anwendung aus Ihren Texten gelernt hat. Beobachtungen von Kolleginnen und Kollegen fließen bewusst nicht ein.",
      `Elternmails entstehen auf Deutsch und werden in einem zweiten Schritt übersetzt: ${TRANSLATION_LANGUAGES_SENTENCE}. Namen und Signatur bleiben dabei unangetastet.`,
      `Versendet wird die Mail über Ihr eigenes Mailprogramm. ${PRODUCT_NAME} schreibt sie – verschickt sie aber nicht.`,
    ],
    bullets: [
      "Zeugnisbemerkungen aus den eigenen Beobachtungen",
      `${TRANSLATION_LANGUAGE_COUNT} Zielsprachen für Elternmails, ohne Aufpreis`,
      "Kein Eltern- oder Schülerportal – der Versand bleibt bei Ihnen",
    ],
    scene: <CommunicationScene />,
  },
  {
    id: "unterricht",
    title: "Unterricht",
    paragraphs: [
      "Material entsteht nicht aus dem Gedächtnis eines Sprachmodells, sondern aus einem durchsuchbaren Fachkorpus – kombiniert mit dem, was Sie über Ihre Klasse dokumentiert haben. Jedes erzeugte Material weist seine Quellen aus.",
      "Welche Fundstellen einfließen, können Sie auch selbst auswählen, statt sie automatisch ziehen zu lassen.",
      "Beim Massenupload von Scans schlägt die Anwendung eine Zuordnung anhand des Dateinamens vor. Zugeordnet wird nie automatisch: Bei zwei Kindern gleichen Vornamens gibt es bewusst gar keinen Vorschlag.",
    ],
    bullets: [
      "Stundenentwürfe samt Differenzierungsvarianten derselben Stunde",
      "Sitzplan mit gesperrten Plätzen, per Drag-and-drop",
      "Klassenstundenplan ohne Redaktionsschritt und ohne Freigabe",
      "Auslesen von Scans als Häkchen mit Voreinstellung Aus",
    ],
    scene: <TeachingScene />,
  },
  {
    id: "steuerung",
    title: "Steuerung",
    paragraphs: [
      "Die Schulleitung schaltet im Kopf der Anwendung in den Leitungsmodus. Der Einstieg dort ist der Entlastungsbericht: eingesparte Stunden, Automatisierungsquoten und Vorgänge je Prozess, für den letzten abgeschlossenen Monat im Vergleich zum Vormonat.",
      "Der Bericht nennt bewusst keinen Euro-Betrag. Grundlage sind hinterlegte Minutenannahmen, und die sind als Schätzwerte gekennzeichnet.",
    ],
    bullets: [
      "Entlastungsbericht als PDF, Monat für Monat",
      "Nutzung im Kollegium als Verteilung – bewusst keine namentliche Rangliste",
      "Einzelne Beobachtungen und Bewertungen bleiben bei der Lehrkraft",
    ],
    scene: <SteeringScene />,
    action: {
      label: "Für Schulleitungen",
      href: "/schulen",
    },
  },
];

/**
 * Sektion 3 – Vier Funktionsblöcke, abwechselnd Text links und rechts.
 */
export function FunctionBlocks() {
  return (
    <section aria-label="Funktionen im Detail">
      {blocks.map((block, index) => {
        // Ungerade Bloecke spiegeln: Text rechts, Szene links.
        const reversed = index % 2 === 1;

        return (
          <div
            key={block.id}
            className={cn(
              "border-b border-gray-200",
              reversed ? "bg-surface-alt" : "bg-surface",
            )}
          >
            <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
              <div className={reversed ? "lg:order-2" : undefined}>
                <h2
                  id={block.id}
                  className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
                >
                  {block.title}
                </h2>

                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-5 max-w-xl text-lg text-gray-500">
                    {paragraph}
                  </p>
                ))}

                <ul className="mt-8 space-y-3">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-600"
                      />
                      <span className="text-ink">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {block.action ? (
                  <div className="mt-10">
                    <Button asChild variant="outline" size="lg">
                      <Link href={block.action.href}>{block.action.label}</Link>
                    </Button>
                  </div>
                ) : null}
              </div>

              <div className={reversed ? "lg:order-1" : undefined}>{block.scene}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
