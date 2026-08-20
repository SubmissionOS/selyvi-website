import type { NextConfig } from "next";

/**
 * Sicherheits-Header für alle Antworten.
 *
 * ZUR CONTENT-SECURITY-POLICY: bewusst NICHT gesetzt, siehe README,
 * „Offener Punkt: Content-Security-Policy“. Next.js liefert Hydrations-Daten
 * über inline <script>-Elemente aus. Eine CSP ohne 'unsafe-inline' braucht
 * deshalb Nonces, und Nonces erzwingen dynamisches Rendern – alle neun Routen
 * dieser Website sind derzeit statisch vorgerendert. Eine CSP MIT
 * 'unsafe-inline' wiederum schuetzt gegen genau das nicht, wogegen eine CSP
 * schuetzen soll. Statt einer Alibi-Zeile steht der Punkt offen im README.
 */
const securityHeaders = [
  {
    // Verhindert, dass Browser den Content-Type erraten und eine Datei als
    // etwas anderes ausfuehren, als der Server angibt.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Beim Wechsel auf fremde Domains nur die Herkunft senden, nicht den
    // vollen Pfad – auf einer Website mit Formular ist der Pfad eine Spur.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Die Website braucht keine dieser Schnittstellen. Leere Liste = niemand
    // darf, auch eingebettete Inhalte nicht.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Kein Einbetten in fremde Frames – schuetzt vor Clickjacking.
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
