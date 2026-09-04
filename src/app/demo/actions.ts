"use server";

import { headers } from "next/headers";

import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  normalizeSource,
  SOURCE_FIELD,
  validateDemoRequest,
} from "@/lib/demo/schema";
import type { DemoFormState } from "@/lib/demo/state";
import { checkRateLimit } from "@/lib/demo/rate-limit";
import { sendDemoRequest } from "@/lib/demo/brevo";
import { sendLeadToCrm } from "@/lib/demo/crm";
import { ORIGIN_FIELDS, sanitizeOrigin } from "@/lib/demo/origin";

/**
 * Server Action für das Demo-Formular.
 *
 * Läuft ausschliesslich auf dem Server. Alles, was mit Zugangsdaten zu tun hat,
 * bleibt hinter dieser Grenze – der Client sieht nur den Rueckgabewert.
 *
 * Reihenfolge der Pruefungen ist Absicht: Erst die billigen Abwehrmassnahmen
 * (Honeypot, Zeit, Rate-Limit), dann die Validierung, dann der Versand.
 *
 * WICHTIG: Diese Datei darf ausser async-Funktionen NICHTS exportieren – weder
 * Konstanten noch Objekte. Typ und Startwert des Zustands liegen deshalb in
 * src/lib/demo/state.ts.
 */

/**
 * Bots, die das Formular blind absenden, bekommen dieselbe Antwort wie eine
 * erfolgreiche Anfrage. Ein ehrliches „abgelehnt“ waere eine Rueckmeldung, mit
 * der sich die Erkennung austesten laesst.
 */
const SILENT_SUCCESS: DemoFormState = {
  status: "success",
};

function clientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    // Erster Eintrag ist die urspruengliche Client-IP.
    return forwarded.split(",")[0]!.trim();
  }
  return headerList.get("x-real-ip")?.trim() || "unknown";
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitDemoRequest(
  _previousState: DemoFormState,
  formData: FormData,
): Promise<DemoFormState> {
  // 1. Honeypot – fuer Menschen unsichtbar, fuer Formular-Bots verlockend.
  if (readString(formData, HONEYPOT_FIELD).trim().length > 0) {
    console.warn("[demo] Anfrage verworfen: Honeypot ausgefüllt.");
    return SILENT_SUCCESS;
  }

  // 2. Zeitcheck. Die Dauer wird auf dem Client zwischen Anzeige und Absenden
  //    gemessen; dadurch entstehen keine Probleme durch abweichende Uhren.
  //    Der Wert ist manipulierbar – das ist eine Huerde gegen einfache
  //    Skripte, keine Sicherheitsmassnahme.
  const elapsed = Number.parseInt(readString(formData, ELAPSED_FIELD), 10);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.warn("[demo] Anfrage verworfen: zu schnell abgesendet.", elapsed);
    return SILENT_SUCCESS;
  }

  // 3. Rate-Limit pro IP.
  const headerList = await headers();
  const limit = checkRateLimit(clientIp(headerList));
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60000));
    return {
      status: "error",
      message: `Es sind bereits mehrere Anfragen von diesem Anschluss eingegangen. Bitte versuchen Sie es in ${minutes} Minuten erneut.`,
    };
  }

  // 4. Inhaltliche Validierung.
  const result = validateDemoRequest({
    name: readString(formData, "name"),
    school: readString(formData, "school"),
    email: readString(formData, "email"),
    role: readString(formData, "role"),
    message: readString(formData, "message"),
    consent: formData.get("consent") === "on",
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Bitte prüfen Sie die markierten Felder.",
      fieldErrors: result.fieldErrors,
    };
  }

  // 5. Herkunft der Anfrage. Alles hier ist Client-Eingabe aus versteckten
  //    Feldern: normalizeSource() laesst nur bekannte Werte durch und faellt
  //    sonst still auf „demo" zurueck, sanitizeOrigin() prueft Laengen und
  //    Zeichen jedes Feldes einzeln und verwirft, was nicht passt.
  const source = normalizeSource(readString(formData, SOURCE_FIELD));
  const origin = sanitizeOrigin({
    utm_source: readString(formData, ORIGIN_FIELDS.utmSource),
    utm_medium: readString(formData, ORIGIN_FIELDS.utmMedium),
    utm_campaign: readString(formData, ORIGIN_FIELDS.utmCampaign),
    referrer: readString(formData, ORIGIN_FIELDS.referrer),
    page_path: readString(formData, ORIGIN_FIELDS.pagePath),
  });

  // 6. Zwei Wege, gleichzeitig.
  //
  //    ==================================================================
  //    EIN KANAL GENÜGT
  //    ==================================================================
  //    Die Anfrage gilt als angekommen, sobald MINDESTENS EINER der beiden
  //    Wege sie bestaetigt hat. Erst wenn BEIDE fehlschlagen, sieht die
  //    anfragende Person eine Fehlermeldung.
  //
  //    VORHER ENTSCHIED ALLEIN DIE MAIL, und das war der gemeldete Fehler:
  //    Der Brevo-Schluessel war nicht mehr gueltig, das CRM hatte die
  //    Anfrage laengst angenommen – und der Besucher las trotzdem „konnte
  //    nicht uebermittelt werden" und schickte ein zweites Mal. Wir hatten
  //    die Anfrage doppelt, er hatte das Gefuehl, ins Leere zu schreiben.
  //
  //    Die Umkehrung ist nicht Grosszuegigkeit, sondern Genauigkeit: Die
  //    Meldung soll sagen, ob die Anfrage bei UNS ist. Welcher unserer
  //    beiden Wege sie getragen hat, ist unser Problem, nicht seins.
  //
  //    DAMIT DAS KEIN STILLES LOCH WIRD: Jeder gescheiterte Kanal wird
  //    geloggt – Kanal, Fehlerart, Dauer, secret-frei –, und zwar auch dann,
  //    wenn der andere getragen hat. Ein Teil-Ausfall, den niemand sieht,
  //    waere in einer Woche ein Total-Ausfall, den alle sehen.
  //
  //    `allSettled` statt `all`: `all` bricht beim ERSTEN abgelehnten
  //    Versprechen ab und liesse den anderen Weg unbeachtet weiterlaufen.
  //    sendLeadToCrm() faengt zwar selbst alles ab – aber diese Zusage darf
  //    nicht die einzige Absicherung sein.
  const [mailErgebnis, crmErgebnis] = await Promise.allSettled([
    sendDemoRequest(result.values, source),
    sendLeadToCrm({ values: result.values, source, origin }),
  ]);

  if (mailErgebnis.status === "rejected") {
    console.error("[mail] Versand warf unerwartet.");
  }
  if (crmErgebnis.status === "rejected") {
    // Sollte unerreichbar sein – sendLeadToCrm() wirft nicht. Wenn diese
    // Zeile doch einmal laeuft, ist die Zusage dort gebrochen.
    console.error("[crm] Übergabe warf unerwartet.");
  }

  const mail =
    mailErgebnis.status === "fulfilled"
      ? mailErgebnis.value
      : ({ ok: false, reason: "send-failed" } as const);
  const crm =
    crmErgebnis.status === "fulfilled"
      ? crmErgebnis.value
      : ({ ok: false, reason: "failed" } as const);

  // Eine Zeile, die den Gesamtzustand traegt. Sie enthaelt nichts aus dem
  // Formular – kein Name, keine Adresse, keine Zieladresse, keinen
  // Schluessel. Nur, welcher Weg getragen hat.
  const zustand = (ergebnis: { ok: boolean; reason?: string }) =>
    ergebnis.ok
      ? "ok"
      : ergebnis.reason === "not-configured"
        ? "nicht-eingerichtet"
        : "fehlgeschlagen";

  if (mail.ok || crm.ok) {
    // Nur ECHTE Ausfaelle melden. Ein nicht eingerichteter Kanal ist der
    // dokumentierte Normalfall in Vorschau-Deployments und lokal; ihn hier
    // zu melden hiesse, das Log bei jeder Anfrage mit einer Nicht-Meldung zu
    // fuellen – und genau daran stirbt die Aufmerksamkeit fuer echte.
    if (zustand(mail) === "fehlgeschlagen" || zustand(crm) === "fehlgeschlagen") {
      console.warn(
        `[formular] Teil-Ausfall: mail=${zustand(mail)}, crm=${zustand(crm)} – Anfrage trotzdem angekommen.`,
      );
    }
    return { status: "success" };
  }

  console.error(
    `[formular] Beide Kanäle gescheitert: mail=${zustand(mail)}, crm=${zustand(crm)}.`,
  );

  // Der Wortlaut unterscheidet zwei Faelle, die verschiedene Menschen
  // betreffen: „nicht eingerichtet" ist unser Konfigurationsfehler und darf
  // niemanden zum Wiederholen einladen; alles andere kann ein Aussetzer
  // sein, bei dem ein zweiter Versuch sinnvoll ist.
  const beideNichtEingerichtet =
    !mail.ok &&
    mail.reason === "not-configured" &&
    !crm.ok &&
    crm.reason === "not-configured";

  return {
    status: "error",
    message: beideNichtEingerichtet
      ? "Der Versand ist derzeit nicht eingerichtet. Ihre Anfrage wurde nicht übermittelt."
      : "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut.",
  };
}
