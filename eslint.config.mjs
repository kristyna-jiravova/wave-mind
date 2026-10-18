import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jest from "eslint-plugin-jest";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Additional code quality rules
  {
    rules: {
      "no-console": "error",
      "no-irregular-whitespace": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "react/no-unused-prop-types": "error",
      strict: ["error", "never"],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "@/**", group: "internal" },
            { pattern: "./**/*.{scss,css}", group: "sibling", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react", "scss"],
          distinctGroup: false,
        },
      ],
      "import/newline-after-import": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-nested-ternary": "error",
      "no-unsafe-optional-chaining": "error",

      // Additional rules from mentoring setup
      // Keep explicit returns for readability while learning.
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

  // Type-aware checks only apply to TypeScript files in this project.
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      // This version reports suggestions rather than applying automatic fixes.
      "@typescript-eslint/no-unnecessary-condition": "error",
    },
  },

  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    plugins: { jest },
    rules: {
      "jest/no-focused-tests": "error",
    },
  },

  // Ignore generated files
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
