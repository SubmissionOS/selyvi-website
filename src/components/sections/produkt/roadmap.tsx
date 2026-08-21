/**
 * Sektion 4 – Ausblick „In Arbeit“.
 *
 * Diese Punkte sind NICHT verfuegbar. Sie stehen hier bewusst mit Badge und
 * zurueckhaltender Formulierung, statt sie zu den fertigen Funktionen zu
 * mischen – eine Schule, die auf eine Anbindung wartet, muss das vor dem
 * Gespraech erkennen koennen, nicht danach.
 *
 * Erst wenn ein Punkt tatsaechlich verfuegbar ist, wandert er nach oben zu den
 * Funktionsblöcken und verliert das Badge.
 */
/**
 * Die drei Punkte sind die echten offenen Baustellen aus
 * docs/produktstand-2026-08.md – nicht drei plausible Roadmap-Themen.
 *
 * Der Status steht im Badge statt im Titel: „in Vorbereitung", „geplant" und
 * „in Arbeit" sind drei verschiedene Entfernungen, und wer wartet, will genau
 * diesen Unterschied lesen koennen.
 *
 * Der erste Punkt ist der wichtigste auf der ganzen Seite. Er nennt eine
 * Einschraenkung, nach der eine Datenschutzbeauftragte ohnehin fragt – und
 * beantwortet sie, bevor gefragt wird.
 */
const upcoming = [
  {
    title: "Serverumzug nach Deutschland",
    status: "In Vorbereitung",
    description:
      "Vor dem Betrieb mit echten Schülerdaten ziehen die Produktserver nach Deutschland um. Parallel entsteht der Auftragsverarbeitungsvertrag, der jeder Schule vorliegt.",
  },
  {
    title: "Anbindung an Schulverwaltungssoftware",
    status: "Geplant",
    description:
      "Klassen und Kinder werden heute angelegt, nicht importiert. Eine Schnittstelle zu vorhandener Schulverwaltungssoftware gibt es noch nicht – für große Schulen ist das ein spürbarer Startaufwand.",
  },
  {
    title: "Stilprofil per Upload",
    status: "In Arbeit",
    description:
      "Den Schreibstil lernt die Anwendung heute aus den Texten, die Sie in ihr schreiben. Eigene Texte hochzuladen ist vorbereitet, die Oberfläche dafür fehlt noch.",
  },
];

export function Roadmap() {
  return (
    <section aria-labelledby="in-arbeit-titel" className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <h2
          id="in-arbeit-titel"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          In Arbeit
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Diese Punkte sind noch nicht verfügbar. Wir führen sie hier auf, damit Sie
          einschätzen können, was bereits geht und worauf Sie warten würden.
        </p>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {upcoming.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-gray-200 bg-surface p-6"
            >
              <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
                {item.status}
              </span>

              <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>

              <p className="mt-3 text-sm text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
