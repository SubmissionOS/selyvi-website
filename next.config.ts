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

  /**
   * Sprache und Adresse dieses Builds – zur BAUZEIT eingesetzt.
   *
   * Der `env`-Block schreibt beide Werte als Literale in den Server- UND in
   * den Browser-Code. Ohne ihn waere `process.env.SITE_LOCALE` in jeder
   * Client-Komponente `undefined`, und alle Szenen und der Einblick blieben
   * deutsch – Next.js setzt dort sonst nur `NEXT_PUBLIC_`-Variablen ein.
   *
   * KEIN WIDERSPRUCH ZUR SICHERHEITSREGEL: Verboten ist `NEXT_PUBLIC_` fuer
   * GEHEIMNISSE. Die Sprache steht in jedem ausgelieferten Satz und die
   * Adresse in jedem Canonical-Link. Der Brevo-Schluessel und der
   * CRM-Schluessel stehen hier NICHT und bleiben serverseitig.
   */
  env: {
    SITE_LOCALE: process.env.SITE_LOCALE === "en" ? "en" : "de",
    SITE_URL: process.env.SITE_URL ?? "",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  /**
   * Umleitungen für umbenannte Routen.
   *
   * `/produkt` hiess so, solange die Seite nach dem Produkt benannt war. Sie
   * heisst jetzt nach den Menschen, für die sie geschrieben ist.
   *
   * PERMANENT (308), nicht temporär: Die alte Adresse kommt nicht zurück.
   * Suchmaschinen übertragen damit die Bewertung der alten Adresse auf die
   * neue, und Links aus Mails, Präsentationen oder einem Pitchdeck laufen
   * weiter – eine Marketing-Adresse ist nach dem Versenden nicht mehr in
   * unserer Hand.
   */
  async redirects() {
    return [
      {
        source: "/produkt",
        destination: "/fuer-lehrkraefte",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
