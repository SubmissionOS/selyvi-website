import { BarChart3, BookOpen, ClipboardList, Mail } from "lucide-react";

import { TRANSLATION_LANGUAGE_COUNT } from "@/config/product";

/**
 * Sektion 5 – Kernfunktionen.
 * Je Karte genau ein Nutzensatz. Keine Adjektivketten, keine Superlative.
 *
 * Die vier Karten sind die vier Bereiche, in die docs/produktstand-2026-08.md
 * den Funktionsumfang gliedert – nicht vier frei gewaehlte Verkaufsargumente.
 * Wer die Reihenfolge aendert, sollte sie dort mitaendern.
 */
const features = [
  {
    icon: ClipboardList,
    title: "Dokumentation",
    description:
      "Beobachtungen entstehen im Unterricht – getippt oder diktiert – und ergeben je Kind eine Timeline mit Kompetenzen und Förderhinweisen.",
  },
  {
    icon: Mail,
    title: "Kommunikation",
    description: `Zeugnisbemerkungen und Elternmails entstehen aus den eigenen Beobachtungen, im gelernten Schreibstil – Elternmails auf Wunsch in ${TRANSLATION_LANGUAGE_COUNT} Sprachen.`,
  },
  {
    icon: BookOpen,
    title: "Unterricht",
    description:
      "Material und Stundenentwürfe entstehen aus einem durchsuchbaren Fachkorpus. Jedes erzeugte Material weist seine Quellen aus.",
  },
  {
    icon: BarChart3,
    title: "Steuerung",
    description:
      "Die Schulleitung sieht im Entlastungsbericht, wie viele Stunden das dem Kollegium zurückgegeben hat – Monat für Monat, als PDF.",
  },
];

export function Features() {
  return (
    <section aria-labelledby="kernfunktionen-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="kernfunktionen-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Kernfunktionen
        </h2>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <li
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-surface p-6"
              >
                <Icon aria-hidden="true" className="size-6 text-brand-600" />
                <h3 className="mt-5 text-base font-semibold text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm text-gray-500">{feature.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
