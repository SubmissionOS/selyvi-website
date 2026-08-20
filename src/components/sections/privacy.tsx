import Link from "next/link";
import { FileText, Lock, ScanLine, Server } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Sektion 6 – DSGVO-Block.
 *
 * Vollbreite Flaeche in brand-800. Die Klasse `on-dark` schaltet den
 * Fokus-Ring aus globals.css auf brand-100 um, damit er auf der dunklen
 * Flaeche sichtbar bleibt.
 *
 * ACHTUNG – die vier Erlaeuterungssaetze sind rechtliche Zusagen. Sie sind
 * bewusst knapp und ohne Zusatzversprechen formuliert und muessen vor dem
 * Livegang von Rechtsseite freigegeben werden.
 */
const facts = [
  {
    icon: Server,
    title: "EU-Hosting",
    description: "Verarbeitung und Speicherung in Rechenzentren innerhalb der EU.",
  },
  {
    icon: FileText,
    title: "Auftragsverarbeitungsvertrag (AVV)",
    description: "Nach Art. 28 DSGVO, geschlossen vor dem Einsatz an der Schule.",
  },
  {
    icon: Lock,
    title: "Keine Weitergabe von Schülerdaten",
    description: "Keine Weitergabe an Dritte, keine Nutzung für Werbezwecke.",
  },
  {
    icon: ScanLine,
    title: "Datensparsamkeit als Prinzip",
    description: "Erhoben wird, was die jeweilige Funktion benötigt – nicht mehr.",
  },
];

export function Privacy() {
  return (
    <section
      aria-labelledby="datenschutz-titel"
      className="on-dark bg-brand-800 text-surface"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="datenschutz-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-surface sm:text-4xl"
        >
          Ihre Daten bleiben Ihre Daten.
        </h2>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <li key={fact.title} className="flex gap-4">
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand-100"
                />
                <div>
                  <h3 className="text-base font-semibold text-surface">{fact.title}</h3>
                  <p className="mt-2 text-sm text-brand-100">{fact.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-14">
          <Button asChild variant="outlineInverse" size="lg">
            <Link href="/datenschutz-sicherheit">
              Mehr zu Sicherheit &amp; Datenschutz
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
