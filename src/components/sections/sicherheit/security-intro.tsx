import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion 1 – Intro.
 *
 * ACHTUNG, GILT FUER DIE GANZE SEITE: Jede <ReviewMarker />-Stelle auf
 * /datenschutz-sicherheit ist ein LAUNCH-BLOCKER. Diese Seite lesen
 * Schulleitungen und Datenschutzbeauftragte vor der Beschaffung. Sie darf
 * nicht mit offenen Markern live gehen – entweder die Angabe ist belegt, oder
 * die Seite geht nicht live. Die vollstaendige Liste steht im README unter
 * „LAUNCH-BLOCKER“.
 *
 * Der zweite Absatz benennt den Zustand der Seite ausdruecklich. Das ist
 * Absicht: Eine offen ausgewiesene Luecke kostet weniger Vertrauen als eine
 * Zusage, die im Pruefgespraech nicht haelt.
 */
export function SecurityIntro() {
  return (
    <section
      aria-labelledby="sicherheit-intro-titel"
      className="border-b border-gray-200"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h1
          id="sicherheit-intro-titel"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Sicherheit und Datenschutz bei {PRODUCT_NAME}.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Wir verarbeiten personenbezogene Daten nur, soweit die jeweilige Funktion es
          erfordert, und nur zu dem Zweck, zu dem Ihre Schule sie uns anvertraut: der
          Erbringung des Dienstes. Keine Verarbeitung darüber hinaus – keine Auswertung
          für eigene Zwecke, keine Weitergabe zu Werbezwecken.
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Diese Seite beschreibt den Stand der Umsetzung. Wo eine Angabe noch nicht
          vertraglich oder technisch abgesichert ist, steht sie hier als offener Punkt und
          nicht als Zusage.
        </p>
      </div>
    </section>
  );
}
