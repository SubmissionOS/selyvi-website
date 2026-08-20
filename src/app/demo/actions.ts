"use server";

import { headers } from "next/headers";

import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  validateDemoRequest,
} from "@/lib/demo/schema";
import type { DemoFormState } from "@/lib/demo/state";
import { checkRateLimit } from "@/lib/demo/rate-limit";
import { sendDemoRequest } from "@/lib/demo/brevo";

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

  // 5. Versand.
  const sent = await sendDemoRequest(result.values);

  if (!sent.ok) {
    return {
      status: "error",
      message:
        sent.reason === "not-configured"
          ? "Der Versand ist derzeit nicht eingerichtet. Ihre Anfrage wurde nicht übermittelt."
          : "Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es erneut.",
    };
  }

  return { status: "success" };
}
