import type { SVGProps } from "react";

/**
 * Marken-Icons fuer LinkedIn und Instagram.
 *
 * HINWEIS: lucide-react hat mit Version 1.0 saemtliche Brand-Icons entfernt
 * (kein linkedin/instagram/github/... mehr im Paket – geprueft in 1.28.0).
 * Die beiden Glyphen unten uebernehmen daher die urspruenglichen
 * Lucide-Pfade (ISC-Lizenz) und exakt dieselben Darstellungsattribute:
 * 24x24, fill none, stroke currentColor, stroke-width 2, runde Enden.
 *
 * Dadurch verhalten sie sich wie jedes andere Lucide-Icon – Groesse und Farbe
 * kommen ueber CSS (`size-*`, `text-*`), nicht ueber Props.
 *
 * Sobald die Icons wieder in lucide-react verfuegbar sind, kann diese Datei
 * entfallen und der Import im Footer auf lucide-react umgestellt werden.
 */

const baseProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
