import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // Базовые правила ESLint
  js.configs.recommended,

  // React правила
  pluginReact.configs.flat.recommended,

  // TypeScript правила
  ...tseslint.configs.recommended,

  // Ваши кастомные настройки
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      'no-console': "warn",
      'eqeqeq': "warn",
      'curly': "warn",
      'no-else-return': "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    },
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
      }
    }
  }
];