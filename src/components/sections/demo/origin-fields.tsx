"use client";

import { useState } from "react";

import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { EMPTY_ORIGIN, ORIGIN_FIELDS, type OriginValues } from "@/lib/demo/origin";

/**
 * Versteckte Felder mit der Herkunft der Anfrage.
 *
 * ==========================================================================
 * WAS HIER PASSIERT – UND WAS AUSDRÜCKLICH NICHT
 * ==========================================================================
 * Beim Anzeigen des Formulars werden fünf Werte aus der bereits geladenen
 * Seite abgelesen: drei UTM-Parameter aus der Adresszeile, die verweisende
 * Seite und der eigene Pfad. Sie gehen mit dem Formular an den Server und
 * landen dort im CRM, damit im Team beantwortbar ist, woher eine Anfrage kam.
 *
 * NICHT passiert: kein Cookie, kein localStorage, keine Kennung, kein
 * Nachladen, keine Verbindung zu irgendeinem Dritten. Der Wert existiert nur
 * als Teil dieser einen Anfrage. Ohne abgeschicktes Formular verlässt hier
 * nichts den Browser.
 *
 * ==========================================================================
 * WARUM DIE WERTE ERST NACH DEM MOUNTEN KOMMEN
 * ==========================================================================
 * `window.location` und `document.referrer` gibt es auf dem Server nicht. Die
 * Felder starten deshalb leer und füllen sich beim Anzeigen. Das ist
 * unkritisch: Sie sind versteckt, also gibt es weder ein Umspringen noch
 * Layoutverschiebung, und bis jemand das Formular abschicken kann, sind sie
 * längst gesetzt (MIN_FILL_MS erzwingt ohnehin drei Sekunden).
 *
 * Ohne JavaScript bleiben sie leer – und das Formular funktioniert weiter.
 * Die Herkunft ist eine Zugabe, keine Voraussetzung.
 *
 * `useIsomorphicLayoutEffect` statt `useEffect`: dieselbe Bauweise wie in
 * SceneTimeline und Reveal. Ein `setState` im `useEffect` beanstandet die
 * React-Compiler-Regel `set-state-in-effect`.
 */
export function OriginFields() {
  const [origin, setOrigin] = useState<OriginValues>(EMPTY_ORIGIN);

  useIsomorphicLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Roh ablesen, nicht prüfen: Die Prüfung gehört auf den Server, weil sie
    // dort nicht umgangen werden kann. Hier zu filtern würde nur die falsche
    // Sicherheit erzeugen, der Wert sei danach vertrauenswürdig.
    setOrigin({
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer,
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <>
      <input type="hidden" name={ORIGIN_FIELDS.utmSource} value={origin.utm_source} />
      <input type="hidden" name={ORIGIN_FIELDS.utmMedium} value={origin.utm_medium} />
      <input type="hidden" name={ORIGIN_FIELDS.utmCampaign} value={origin.utm_campaign} />
      <input type="hidden" name={ORIGIN_FIELDS.referrer} value={origin.referrer} />
      <input type="hidden" name={ORIGIN_FIELDS.pagePath} value={origin.page_path} />
    </>
  );
}
