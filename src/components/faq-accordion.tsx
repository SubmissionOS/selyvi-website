import { ReviewMarker } from "@/components/ui/review-marker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Gemeinsames FAQ-Rendering.
 *
 * Wird von mehreren Seiten mit unterschiedlichen Fragen genutzt (Startseite,
 * /schulen). Die Darstellung liegt deshalb hier, die Inhalte bleiben in der
 * jeweiligen Sektion – so weichen die FAQ-Bloecke optisch nicht auseinander.
 */
export type FaqItem = {
  question: string;
  answer: string;
  /**
   * Markiert die Antwort als Platzhalter.
   *   true     → [PRÜFEN]
   *   "Text"   → [PRÜFEN: Text]
   */
  review?: boolean | string;
};

export function FaqAccordion({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix: string;
}) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`${idPrefix}-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            {item.review ? (
              <ReviewMarker
                note={typeof item.review === "string" ? item.review : undefined}
                className="mr-2"
              />
            ) : null}
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
