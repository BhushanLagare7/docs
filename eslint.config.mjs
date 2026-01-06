import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// Import the plugin responsible for sorting imports and exports
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: false,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
  },

  // Custom configuration object for plugins and specific rules
  {
    // Register the simple-import-sort plugin
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // RULE: Enforce sorted imports.
      // Setting this to "error" ensures the linter fails if imports aren't sorted.
      // This allows VS Code or other editors to auto-fix (reorder) them on save.
      "simple-import-sort/imports": [
        "error",
        {
          // The 'groups' array defines the order of import blocks.
          // Each inner array represents a distinct group separated by a newline.
          groups: [
            // ------------------------------------------------------------
            // 1. Frameworks
            // ------------------------------------------------------------
            // React and Next.js packages should stay at the very top.
            ["^react", "^next"],

            // ------------------------------------------------------------
            // 2. Third-Party Libraries
            // ------------------------------------------------------------
            // Matches any import starting with a lowercase letter or @ followed by a letter.
            // e.g., "axios", "@tanstack/react-query"
            ["^[a-z]", "^@"],

            // ------------------------------------------------------------
            // 3. Internal Aliases (General)
            // ------------------------------------------------------------
            // Matches imports using the root alias (@/).
            ["^@/"],

            // ------------------------------------------------------------
            // 4 - 7. Specific Internal Feature Folders
            // ------------------------------------------------------------
            // Specific grouping to keep feature imports organized visually.

            // Lib folder (configurations, clients)
            ["^@/lib"],

            // UI elements (components, modules)
            ["^@/components", "^@/modules"],

            // Utilities and helper functions
            ["^@/utils", "^@/helpers"],

            // Custom hooks
            ["^@/hooks"],

            // ------------------------------------------------------------
            // 8. Parent Imports (Relative)
            // ------------------------------------------------------------
            // Matches imports starting with ".." (going up the tree).
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            // ------------------------------------------------------------
            // 9. Sibling Imports (Relative)
            // ------------------------------------------------------------
            // Matches imports starting with "." (in the same folder).
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // ------------------------------------------------------------
            // 10. Side Effect Imports
            // ------------------------------------------------------------
            // Matches imports intended for side effects (e.g., `import "./styles.css"`).
            // \u0000 is a special character used by the plugin to identify these.
            ["^\\u0000"],

            // ------------------------------------------------------------
            // 11. Catch-All
            // ------------------------------------------------------------
            // Anything that didn't match the regexes above goes here at the bottom.
            ["^"],
          ],
        },
      ],

      // RULE: Enforce sorted exports.
      // This ensures `export { a, b } from "x"` acts predictably.
      "simple-import-sort/exports": "error",
    },
  },
]);

export default eslintConfig;
