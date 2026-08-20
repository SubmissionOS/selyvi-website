import Link from "next/link";
import { ArrowRight, Eye, ShieldCheck, Users } from "lucide-react";

import { PRACTICE_CLAIM } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { ReviewMarker } from "@/components/ui/review-marker";

/**
 * Sektion 4 – Arbeitsweise.
 *
 * Alle drei Aussagen sind durch die Website selbst belegbar – besonders die
 * dritte: „Wir kennzeichnen offene Punkte“ ist keine Behauptung, sondern auf
 * /datenschutz-sicherheit und auf dieser Seite nachpruefbar. Genau deshalb
 * darf sie hier ohne Marker stehen.
 *
 * Die erste Karte dagegen greift vor: Pilotschulen gibt es noch nicht.
 */
const practices = [
  {
    icon: Users,
    title: "Mit Lehrkräften entwickelt",
    description: PRACTICE_CLAIM,
    review: "sobald Pilotschulen feststehen, hier konkret werden",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutz by Design",
    description:
      "Verarbeitet wird nur, was die jeweilige Funktion benötigt – auf Servern innerhalb der EU.",
    action: { label: "Sicherheit & Datenschutz", href: "/datenschutz-sicherheit" },
  },
  {
    icon: Eye,
    title: "Ehrlich über den Stand",
    description:
      "Was noch nicht feststeht, kennzeichnen wir sichtbar, statt es zu überspielen. Auch auf dieser Seite.",
  },
];

export function HowWeWork() {
  return (
    <section
      aria-labelledby="arbeitsweise-titel"
      className="border-b border-gray-200 bg-surface-alt"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="arbeitsweise-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Wie wir arbeiten
        </h2>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {practices.map((practice) => {
            const Icon = practice.icon;

            return (
              <li
                key={practice.title}
                className="flex flex-col rounded-xl border border-gray-200 bg-surface p-6"
              >
                <Icon aria-hidden="true" className="size-6 text-brand-600" />

                <h3 className="mt-5 text-base font-semibold text-ink">
                  {practice.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500">{practice.description}</p>

                {practice.review ? (
                  <p className="mt-4 text-sm">
                    <ReviewMarker note={practice.review} />
                  </p>
                ) : null}

                {practice.action ? (
                  <div className="mt-6">
                    <Button asChild variant="link" size="sm" className="h-auto px-0">
                      <Link href={practice.action.href}>
                        {practice.action.label}
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
