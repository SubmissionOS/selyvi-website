import { ImageResponse } from "next/og";

import { PRODUCT_NAME } from "@/config/brand";

/**
 * Apple-Touch-Icon – Platzhalter.
 *
 * 180×180, wie von iOS erwartet. Gleiche Gestaltung wie das Favicon nebenan,
 * nur ohne abgerundete Ecken: Die setzt iOS selbst.
 *
 * AUSTAUSCH: Diese Datei löschen und `apple-icon.png` (180×180) nach src/app/
 * legen.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BRAND_800 = "#015b97";
const SURFACE = "#ffffff";

export default function AppleIcon() {
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
        fontSize: 116,
        fontWeight: 600,
      }}
    >
      {PRODUCT_NAME.charAt(0).toUpperCase()}
    </div>,
    size,
  );
}
