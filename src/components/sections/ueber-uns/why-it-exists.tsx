import { PRODUCT_NAME } from "@/config/brand";

/**
 * Sektion „Warum es … gibt“ – zwischen Intro und Mission.
 *
 * Sprungziel des Herkunfts-Links im Hero der Startseite (id="warum").
 *
 * Bewusst ruhiger Lesetext, keine Karten: Das hier ist der einzige Abschnitt
 * der Website, der erzaehlt statt aufzuzaehlen. `max-w-[34rem]` haelt die
 * Zeilenlaenge bei rund 65 Zeichen – die Spanne, in der laengerer Fliesstext
 * noch gut lesbar bleibt.
 *
 * ACHTUNG, KOPPLUNG ZU PRACTICE_CLAIM:
 * Der zweite Absatz enthaelt die BW-Aussage ein zweites Mal – als Nebensatz im
 * Fliesstext ("gemeinsam mit Lehrkraeften aus ganz Baden-Wuerttemberg […] von
 * der Grundschule bis zum Abitur"). Sie laesst sich hier nicht durch die
 * Konstante ersetzen, weil PRACTICE_CLAIM ein eigenstaendiger Satz ist und der
 * Erzaehlfluss sonst bricht.
 *
 * Wer PRACTICE_CLAIM in src/config/brand.ts aendert – etwa auf konkrete Zahlen –
 * MUSS diesen Absatz mit anpassen. Es ist die einzige Stelle der Website, an
 * der die Aussage nicht aus der Konstante kommt.
 *
 * NENNUNG VON PERSONEN:
 *
 * Die angehende Grundschullehrerin bleibt anonym – der Text nennt sie nur als
 * Person im engsten Umfeld des Teams. Das war ihre Entscheidung; ein Name
 * gehoert nur auf diese Seite, wenn die Person ihn selbst freigibt.
 *
 * Christian, Tobi und Rafael werden beim Vornamen genannt. Alle drei stehen in
 * src/config/team.ts auf `approved: true`, und die Zustimmung schliesst diesen
 * Text ein.
 */
export function WhyItExists() {
  return (
    <section
      id="warum"
      aria-labelledby="warum-titel"
      className="border-b border-gray-200"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <h2
          id="warum-titel"
          className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Warum es {PRODUCT_NAME} gibt
        </h2>

        <div className="mt-8 max-w-[34rem] space-y-6 text-lg text-gray-500">
          <p>
            Angefangen hat das hier nicht mit einem Businessplan, sondern am Küchentisch.
            Im engsten Umfeld unseres Teams ist eine angehende Grundschullehrerin – und
            wir haben aus nächster Nähe gesehen, wie viele Abende nicht in Unterricht
            fließen, sondern in Dokumentation, Zeugnistexte und Elternpost. Also haben wir
            angefangen, ihr Werkzeuge zu bauen. Erst kleine, dann bessere. Irgendwann war
            klar: Das Problem hat nicht eine Person – das Problem hat ein ganzes
            Berufsfeld.
          </p>

          <p>
            Aus den Abenden wurde ein System. Wir haben es gemeinsam mit Lehrkräften aus
            ganz Baden-Württemberg weiterentwickelt – von der Grundschule bis zum Abitur –
            und dabei mehr gelernt, als jedes Lehrbuch hergibt: Was im Alltag wirklich
            hilft, entscheidet sich im Alltag. Aus uns dreien – Christian, Tobi und Rafael
            – wurde ein Team mit einem einfachen Maßstab: Würde das einer Lehrerin, die
            wir kennen, wirklich einen Abend zurückgeben? Wenn nein, bauen wir es nicht.
          </p>
        </div>
      </div>
    </section>
  );
}
