import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import pluginPromise from "eslint-plugin-promise";
import estlintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginRegexp from "eslint-plugin-regexp";
import sort from "eslint-plugin-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

// Base config — used by ALL apps (back, front, studio)
export function createBaseConfig({ ignores, tsconfigRootDir }) {
  return defineConfig(
    { ignores },

    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    eslintPluginRegexp.configs["flat/recommended"],
    pluginPromise.configs["flat/recommended"],
    sort.configs["flat/recommended"],

    {
      languageOptions: {
        globals: { ...globals.node },
        parserOptions: {
          ecmaVersion: 2024,
          project: ["./tsconfig.eslint.json"],
          tsconfigRootDir,
        },
      },
    },

    {
      files: ["**/*.ts"],
      rules: {
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-redundant-type-constituents": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/no-unsafe-enum-comparison": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            ignoreRestSiblings: true,
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/prefer-for-of": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
      },
    },

    {
      rules: {
        "no-constant-binary-expression": "off",
        "promise/always-return": "off",
      },
    },

    {
      extends: [tseslint.configs.disableTypeChecked],
      files: ["**/*.cjs", "**/*.js", "**/*.mjs"],
    },

    prettierRecommended,
  );
}

// React layer — used ONLY by front and studio
export function createReactConfig() {
  return [
    {
      files: ["**/*.{tsx,jsx}"],
      languageOptions: {
        globals: { ...globals.browser },
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: { jsx: true },
        },
      },
      plugins: {
        ...estlintPluginReact.configs.flat["jsx-runtime"]?.plugins,
        react: estlintPluginReact,
        "react-hooks": eslintPluginReactHooks,
        "react-refresh": eslintPluginReactRefresh,
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/switch-exhaustiveness-check": [
          "error",
          { considerDefaultExhaustiveForUnions: true },
        ],
        "react/jsx-key": "error",
        "react/jsx-no-leaked-render": "error",
        "react-hooks/exhaustive-deps": "error",
        "react-hooks/rules-of-hooks": "error",
      },
      settings: {
        react: { version: "detect" },
      },
    },
  ];
}
