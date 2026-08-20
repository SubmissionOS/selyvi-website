import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * ESLint Flat Config.
 *
 * Bewusst OHNE eslint-config-prettier: ESLint 10 hat keine Formatierungsregeln
 * mehr im Core und eslint-config-next aktiviert ebenfalls keine – es gibt
 * nichts abzuschalten. Das Paket hatte zudem eine Kompromittierungs-Historie
 * (CVE-2025-54313, Windows-Payload via postinstall). Formatierung macht
 * ausschliesslich Prettier (npm run format), Regelpruefung ausschliesslich
 * ESLint. Die Zustaendigkeiten ueberschneiden sich nicht.
 *
 * eslint-config-next bringt bereits mit: @next/eslint-plugin-next,
 * eslint-plugin-react, react-hooks, jsx-a11y und typescript-eslint.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "screenshots/**",
      "package-lock.json",
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      // Barrierefreiheit ist Projektanforderung, keine Empfehlung.
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/role-has-required-aria-props": "error",

      // Ungenutzter Code faellt auf, blockiert aber nicht bei bewusst
      // vorangestelltem Unterstrich (z. B. _unused).
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
