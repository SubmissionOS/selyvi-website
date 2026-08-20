import type { ReactNode } from "react";
import Link from "next/link";
import { Check, MessageSquareQuote } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { ReviewMarker } from "@/components/ui/review-marker";
import {
  CorrectionSkeleton,
  DocumentationSkeleton,
  OrganisationSkeleton,
  PrivacySkeleton,
} from "@/components/sections/produkt/function-skeletons";

/**
 * Text des offenen Punktes fuer die vier Mikrozeilen „Aus der Zusammenarbeit“.
 *
 * Hier steht ABSICHTLICH kein Beispiel. Ein erfundener Lehrkraft-Hinweis waere
 * genau die Sorte Beleg, die im Gespraech auseinanderfaellt – und diese vier
 * Zeilen sollen spaeter die staerksten der Seite sein: echte Verbesserungen mit
 * echter Herkunft. Bis dahin bleiben sie leer und markiert.
 */
const PRACTICE_EXAMPLE_REVIEW =
  "Konkretes Praxis-Beispiel vom Team: welcher Lehrkraft-Hinweis hat diese Funktion geprägt?";

type Bullet = {
  text: string;
  needsReview?: boolean;
};

type FunctionBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: Bullet[];
  skeleton: ReactNode;
  action?: { label: string; href: string };
};

const blocks: FunctionBlock[] = [
  {
    id: "korrektur-assistenz",
    title: "Korrektur-Assistenz",
    paragraphs: [
      `Abgaben sammeln Sie in ${PRODUCT_NAME} ein – hochgeladen oder aus einer bestehenden Ablage verbunden.`,
      "Zu jeder Abgabe entsteht ein Korrekturvorschlag, den Sie prüfen, ändern oder verwerfen. Wirksam wird eine Bewertung erst, wenn Sie sie bestätigt haben.",
    ],
    bullets: [
      { text: "Vorschläge mit Begründung" },
      { text: "Eigene Bewertungsmaßstäbe hinterlegen", needsReview: true },
      { text: "Jede Änderung nachvollziehbar" },
    ],
    skeleton: <CorrectionSkeleton />,
  },
  {
    id: "leistungsdokumentation",
    title: "Leistungsdokumentation",
    paragraphs: [
      "Bewertungen und Beobachtungen entstehen dort, wo Sie ohnehin arbeiten: beim Korrigieren und im Unterricht.",
      "Abgelegt wird pro Klasse und Fach, sodass der Leistungsstand über das Schuljahr nachvollziehbar bleibt.",
    ],
    bullets: [
      { text: "Erfassung im Arbeitsfluss statt am Schuljahresende" },
      { text: "Ablage pro Klasse und Fach" },
      { text: "Verlauf über das Schuljahr einsehbar" },
    ],
    skeleton: <DocumentationSkeleton />,
  },
  {
    id: "unterrichtsorganisation",
    title: "Unterrichtsorganisation",
    paragraphs: [
      "Aufgaben, Termine und Unterlagen einer Klasse liegen an einem Ort statt verteilt auf Mail, Cloud und Zettelwirtschaft.",
      "Was zu einer Stunde gehört, bleibt beieinander – und ist dort auffindbar, wo Sie es brauchen.",
    ],
    bullets: [
      { text: "Aufgaben und Fristen je Klasse" },
      { text: "Unterlagen bei der Stunde statt im Mailanhang" },
      { text: "Gemeinsame Ablage im Kollegium", needsReview: true },
    ],
    skeleton: <OrganisationSkeleton />,
  },
  {
    id: "datenschutz-by-design",
    title: "Datenschutz by Design",
    paragraphs: [
      "Verarbeitet wird nur, was die jeweilige Funktion benötigt – auf Servern innerhalb der EU, auf Grundlage eines Auftragsverarbeitungsvertrags mit der Schule.",
      "Wer innerhalb der Schule welche Daten sieht, regelt ein Rollen- und Rechtekonzept.",
    ],
    bullets: [
      { text: "Verarbeitung und Speicherung in der EU" },
      { text: "Auftragsverarbeitungsvertrag nach Art. 28 DSGVO" },
      { text: "Rollen- und Rechtekonzept", needsReview: true },
    ],
    skeleton: <PrivacySkeleton />,
    action: {
      label: "Mehr zu Sicherheit & Datenschutz",
      href: "/datenschutz-sicherheit",
    },
  },
];

/**
 * Sektion 3 – Vier Funktionsblöcke, abwechselnd Text links und rechts.
 *
 * Die Beschreibungen bleiben bewusst nah an dem, was die Startseite bereits
 * zusagt. Wo eine konkretere Behauptung noetig waere, steht ein
 * <ReviewMarker /> statt einer erfundenen Angabe.
 *
 * Unter den Stichpunkten steht je Block eine Mikrozeile „Aus der
 * Zusammenarbeit“ – vier bewusst leere, markierte Slots.
 */
export function FunctionBlocks() {
  return (
    <section aria-label="Funktionen im Detail">
      {blocks.map((block, index) => {
        // Ungerade Bloecke spiegeln: Text rechts, Skelett links.
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
                    <li key={bullet.text} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-600"
                      />
                      <span className="text-ink">
                        {bullet.text}
                        {bullet.needsReview ? <ReviewMarker className="ml-2" /> : null}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Mikrozeile: hier kommt spaeter ein echter Hinweis aus der
                    Zusammenarbeit hin. Bis dahin nur der offene Punkt. */}
                <p className="mt-6 flex items-start gap-3 text-sm">
                  <MessageSquareQuote
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand-600"
                  />
                  <span className="text-gray-500">
                    <span className="font-medium text-ink">Aus der Zusammenarbeit:</span>{" "}
                    <ReviewMarker note={PRACTICE_EXAMPLE_REVIEW} />
                  </span>
                </p>

                {block.action ? (
                  <div className="mt-10">
                    <Button asChild variant="outline" size="lg">
                      <Link href={block.action.href}>{block.action.label}</Link>
                    </Button>
                  </div>
                ) : null}
              </div>

              <div className={reversed ? "lg:order-1" : undefined}>{block.skeleton}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
