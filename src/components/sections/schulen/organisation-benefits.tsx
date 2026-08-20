import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Users } from "lucide-react";

import { PRACTICE_CLAIM } from "@/config/brand";
import { Button } from "@/components/ui/button";

/**
 * Sektion 2 – Drei Organisations-Argumente.
 *
 * Argumentiert wird auf Ebene der Schule, nicht der einzelnen Lehrkraft:
 * Belastung im Kollegium, Zahl der einzuführenden Werkzeuge, Verantwortung
 * fuer die Datenverarbeitung. Alle drei Aussagen bleiben innerhalb dessen,
 * was Startseite und /produkt bereits zusagen.
 */
const benefits = [
  {
    icon: Users,
    title: "Entlastung, die ankommt",
    description:
      "Korrektur- und Dokumentationsaufwand sinken dort, wo er im Kollegium tatsächlich anfällt: beim Durchsehen von Abgaben und beim Festhalten von Leistungsständen.",
    // Beleg-Satz: dieselbe kanonische Aussage wie auf Startseite und /produkt.
    evidence: PRACTICE_CLAIM,
  },
  {
    icon: Layers,
    title: "Einheitlich statt zersplittert",
    description:
      "Aufgaben, Bewertung und Unterlagen liegen in einer Umgebung. Das senkt die Zahl der Werkzeuge, die Ihre Schule einführen, schulen und verantworten muss.",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutz, den Sie vertreten können",
    description:
      "Verarbeitung und Speicherung innerhalb der EU, Auftragsverarbeitungsvertrag nach Art. 28 DSGVO, klar zugeordnete Verantwortlichkeiten.",
    action: { label: "Sicherheit & Datenschutz", href: "/datenschutz-sicherheit" },
  },
];

export function OrganisationBenefits() {
  return (
    <section aria-labelledby="argumente-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="argumente-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Was die Einführung Ihrer Schule bringt
        </h2>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <li
                key={benefit.title}
                className="flex flex-col rounded-xl border border-gray-200 bg-surface p-6"
              >
                <Icon aria-hidden="true" className="size-6 text-brand-600" />

                <h3 className="mt-5 text-base font-semibold text-ink">{benefit.title}</h3>

                <p className="mt-3 text-sm text-gray-500">{benefit.description}</p>

                {benefit.evidence ? (
                  <p className="mt-4 border-l-2 border-gray-200 pl-4 text-sm text-gray-500">
                    {benefit.evidence}
                  </p>
                ) : null}

                {benefit.action ? (
                  <div className="mt-6">
                    <Button asChild variant="link" size="sm" className="h-auto px-0">
                      <Link href={benefit.action.href}>
                        {benefit.action.label}
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
