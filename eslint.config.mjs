import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Additional code quality rules
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-nested-ternary": "error",
      "no-unsafe-optional-chaining": "error",

      // Additional rules from mentoring setup
      "arrow-body-style": "off",
      "no-unneeded-ternary": ["error", { defaultAssignment: false }],
      "newline-before-return": "error",
      "no-useless-return": "error",
      "dot-notation": "error",
      yoda: "error",
      "object-shorthand": "error",
      "prefer-const": "error",
      "no-var": "error",
      "spaced-comment": "error",
      "react/jsx-boolean-value": "error",
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": "error",
    },
  },

  // Ignore generated files
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
