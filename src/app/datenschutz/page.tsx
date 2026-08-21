import type { Metadata } from "next";

import { PRODUCT_NAME } from "@/config/brand";
import { PRIVACY_APPROVED, imprint } from "@/config/legal";
import { pageMetadata } from "@/config/seo";

/**
 * Datenschutzerklärung.
 *
 * ==========================================================================
 * STRENGER SCOPE: Hier steht ausschliesslich, was DIESE WEBSITE tut.
 * ==========================================================================
 *
 * Jede Aussage ist im Repository belegbar:
 *   - Formularfelder: src/lib/demo/schema.ts (DEMO_FIELDS)
 *   - Versand ueber Brevo: src/lib/demo/brevo.ts
 *   - Schriften lokal: src/app/layout.tsx (next/font)
 *   - keine Cookies/Analyse: kein entsprechender Code im Projekt
 *
 * NICHTS ueber das Produkt Selyvi, nichts ueber KI-Verarbeitung, nichts ueber
 * Schuelerdaten, nichts ueber kuenftige Funktionen. Diese Website verarbeitet
 * davon nichts – eine Datenschutzerklaerung, die mehr beschreibt als
 * stattfindet, dokumentiert einen Verstoss statt ihn zu vermeiden. Was das
 * Produkt spaeter verarbeitet, gehoert in eine eigene Erklaerung fuer die
 * Anwendung, nicht in die der Website.
 *
 * Der Verantwortliche wird aus src/config/legal.ts gelesen – eine Quelle mit
 * dem Impressum, damit beide nicht auseinanderlaufen koennen.
 *
 * PRIVACY_APPROVED steuert noindex, Sitemap-Ausschluss und die Pruefungs-Zeile.
 */
export const metadata: Metadata = pageMetadata("/datenschutz");

/** Stand der Erklärung. Bei jeder inhaltlichen Änderung mitziehen. */
const LAST_UPDATED = "20. August 2026";

export default function DatenschutzPage() {
  return (
    <section aria-labelledby="datenschutz-titel">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="datenschutz-titel"
          className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Datenschutzerklärung
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Diese Erklärung beschreibt, welche Daten beim Besuch dieser Website verarbeitet
          werden. Sie gilt für die Website – nicht für die Anwendung {PRODUCT_NAME}, die
          sich in Entwicklung befindet.
        </p>

        {!PRIVACY_APPROVED ? (
          <p className="mt-6 max-w-2xl border-l-2 border-brand-600 pl-4 text-sm text-gray-500">
            Diese Erklärung befindet sich in laufender juristischer Prüfung.
          </p>
        ) : null}

        <div className="mt-14 max-w-3xl space-y-12">
          {/* 1 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">1. Verantwortlicher</h2>
            <p className="mt-4 text-gray-500">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-4 text-ink">
              {imprint.companyName}
              <br />
              {imprint.street}
              <br />
              {imprint.zipCity}
              <br />
              {imprint.country}
            </p>
            <p className="mt-4 text-gray-500">
              Telefon: {imprint.phone}
              <br />
              E-Mail: {imprint.email}
            </p>
          </div>

          {/* 2 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">2. Hosting</h2>
            <p className="mt-4 text-gray-500">
              Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
              91789, USA gehostet. Als Serverregion ist Frankfurt am Main (fra1) gewählt;
              die Auslieferung der Seiteninhalte erfolgt aus dieser Region.
            </p>
            <p className="mt-4 text-gray-500">
              Vercel ist ein Anbieter mit Sitz in den USA. Auch bei europäischer
              Serverregion ist ein Zugriff aus einem Drittland nicht in jedem Fall
              ausgeschlossen. Die Verarbeitung erfolgt auf Grundlage der
              EU-Standardvertragsklauseln im Rahmen des Vercel-Datenschutzvertrags.
            </p>
          </div>

          {/* 3 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">3. Server-Logfiles</h2>
            <p className="mt-4 text-gray-500">
              Beim Aufruf dieser Website werden automatisch Zugriffsdaten verarbeitet, die
              Ihr Browser übermittelt. Dazu gehören insbesondere die aufgerufene Adresse,
              Datum und Uhrzeit des Zugriffs, der Browsertyp mit Version, das
              Betriebssystem, die übertragene Datenmenge und die IP-Adresse.
            </p>
            <p className="mt-4 text-gray-500">
              Diese Verarbeitung ist technisch erforderlich, um die Website auszuliefern
              und ihren Betrieb sicherzustellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO; unser berechtigtes Interesse liegt im stabilen und sicheren Betrieb
              der Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen
              findet nicht statt.
            </p>
          </div>

          {/* 4 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">
              4. Demo- und Kontaktformular
            </h2>
            <p className="mt-4 text-gray-500">
              Wenn Sie das Formular auf der Seite „Demo buchen“ absenden, verarbeiten wir
              die von Ihnen eingegebenen Daten, um Ihre Anfrage zu bearbeiten und mit
              Ihnen Kontakt aufzunehmen.
            </p>
            <p className="mt-4 text-gray-500">Verarbeitet werden dabei:</p>
            <ul className="mt-3 space-y-2 text-gray-500">
              <li>Name (Pflichtangabe)</li>
              <li>Schule (Pflichtangabe)</li>
              <li>Dienstliche E-Mail-Adresse (Pflichtangabe)</li>
              <li>Rolle (freiwillige Angabe)</li>
              <li>Nachricht (freiwillige Angabe)</li>
              <li>Ihre Einwilligung zur Verarbeitung dieser Angaben</li>
            </ul>
            <p className="mt-4 text-gray-500">
              Der Versand der Formularnachricht an uns erfolgt über die Sendinblue GmbH
              (Marke Brevo), Köpenicker Straße 126, 10179 Berlin, Deutschland, als
              Auftragsverarbeiter auf Grundlage eines Auftragsverarbeitungsvertrags nach
              Art. 28 DSGVO.
            </p>
            <p className="mt-4 text-gray-500">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den
              Abschluss oder die Durchführung eines Vertrags gerichtet ist, im Übrigen
              Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der
              Beantwortung von Anfragen.
            </p>
            <p className="mt-4 text-gray-500">
              Wir speichern Ihre Anfrage, solange es für die Bearbeitung erforderlich ist,
              und löschen sie anschließend.
            </p>
          </div>

          {/* 5 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">
              5. Keine Cookies, kein Tracking
            </h2>
            <p className="mt-4 text-gray-500">
              Diese Website setzt keine Cookies. Es findet keine Reichweitenmessung, keine
              Webanalyse und kein Tracking statt. Es sind keine Analyse-, Werbe- oder
              Social-Media-Dienste eingebunden.
            </p>
            <p className="mt-4 text-gray-500">
              Die verwendeten Schriften werden mit der Website ausgeliefert und lokal
              geladen. Beim Aufruf der Seite entsteht dadurch keine Verbindung zu
              Google-Servern oder anderen Schriftanbietern.
            </p>
            <p className="mt-4 text-gray-500">
              Deshalb erscheint auf dieser Website auch kein Cookie-Banner: Es gibt
              nichts, wozu wir Ihre Einwilligung einholen müssten.
            </p>
          </div>

          {/* 6 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">
              6. Ihre Rechte als betroffene Person
            </h2>
            <p className="mt-4 text-gray-500">
              Ihnen stehen gegenüber dem Verantwortlichen folgende Rechte zu:
            </p>
            <ul className="mt-3 space-y-2 text-gray-500">
              <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-4 text-gray-500">
              Zur Ausübung genügt eine Nachricht an {imprint.email}. Haben Sie eine
              Einwilligung erteilt, können Sie diese jederzeit mit Wirkung für die Zukunft
              widerrufen.
            </p>
          </div>

          {/* 7 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">
              7. Beschwerderecht bei der Aufsichtsbehörde
            </h2>
            <p className="mt-4 text-gray-500">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig für den
              Sitz des Verantwortlichen ist:
            </p>
            <p className="mt-4 text-ink">
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
              Baden-Württemberg
              <br />
              Lautenschlagerstraße 20
              <br />
              70173 Stuttgart
            </p>
          </div>

          {/* 8 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-ink">8. Stand dieser Erklärung</h2>
            <p className="mt-4 text-gray-500">Stand: {LAST_UPDATED}</p>
            <p className="mt-4 text-gray-500">
              Diese Erklärung befindet sich in laufender juristischer Prüfung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
