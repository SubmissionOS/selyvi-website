import { ImageResponse } from "next/og";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Favicon – Platzhalter.
 *
 * Schlichtes Quadrat in brand-800 mit der Initiale aus PRODUCT_NAME. Sie
 * aendert sich automatisch mit, wenn der Name sich aendert.
 *
 * AUSTAUSCH gegen ein gestaltetes Icon:
 *   1. Diese Datei löschen.
 *   2. `icon.png` (oder `favicon.ico`) nach src/app/ legen.
 * Next erkennt beide Konventionen; es ist kein Code nötig. Dasselbe gilt für
 * apple-icon.tsx nebenan.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const BRAND_800 = "#015b97";
const SURFACE = "#ffffff";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BRAND_800,
        color: SURFACE,
        fontSize: 42,
        fontWeight: 600,
      }}
    >
      {PRODUCT_NAME.charAt(0).toUpperCase()}
    </div>,
    size,
  );
}
