import { CalendarDays, ClipboardList, PenLine, ShieldCheck } from "lucide-react";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 5 – Kernfunktionen.
 * Je Karte genau ein Nutzensatz. Keine Adjektivketten, keine Superlative.
 */
const features = [
  {
    icon: PenLine,
    title: "Korrektur-Assistenz",
    description: `Sie laden Abgaben hoch, ${PRODUCT_NAME} schlägt Korrekturen und Kommentare vor – Sie bestätigen oder ändern sie.`,
  },
  {
    icon: ClipboardList,
    title: "Leistungsdokumentation",
    description:
      "Bewertungen und Beobachtungen werden beim Arbeiten erfasst und bleiben über das Schuljahr nachvollziehbar.",
  },
  {
    icon: CalendarDays,
    title: "Unterrichtsorganisation",
    description:
      "Aufgaben, Fristen und Materialien einer Klasse liegen an einem Ort statt in Mail, Cloud und Zettelwirtschaft.",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutz by Design",
    description:
      "Verarbeitet wird nur, was die jeweilige Funktion benötigt – auf Servern innerhalb der EU.",
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
