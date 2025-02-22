import jsEslint from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default tsEslint.config({
  files: ["netlify/functions/*.mts", "src/**/*.ts"],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    "@stylistic/js": stylisticJs,
  },
  extends: [
    jsEslint.configs.recommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    eslintPluginPerfectionist.configs["recommended-natural"],
  ].map((eslintConfig) => {
    if (eslintConfig.rules === undefined) {
      return eslintConfig;
    }

    const rulesWithErrorsAsWarnings = {};

    for (const [ruleName, ruleConfig] of Object.entries(eslintConfig.rules)) {
      if (ruleConfig === "error" || ruleConfig === 2) {
        rulesWithErrorsAsWarnings[ruleName] = "warn";
      } else if (Array.isArray(ruleConfig) && ruleConfig[0] === "error") {
        rulesWithErrorsAsWarnings[ruleName] = ["warn", ...ruleConfig.slice(1)];
      } else {
        rulesWithErrorsAsWarnings[ruleName] = ruleConfig;
      }
    }

    return {
      ...eslintConfig,
      rules: rulesWithErrorsAsWarnings,
    };
  }),
  rules: {
    // Do not allow backtick strings unless they are template strings.
    "@stylistic/js/quotes": ["warn", "double", { avoidEscape: true }],

    // Use the Array<Foo> and ReadonlyArray<Foo> syntaxes to distinguish declaring types from empty arrays, and treat arrays like all other generic types.
    "@typescript-eslint/array-type": [
      "warn",
      {
        default: "generic",
      },
    ],

    // Do not allow circumventing TypeScript's type system.
    "@typescript-eslint/ban-ts-comment": "warn",

    // NSwag adds a TSLint comment in the generated API clients.
    "@typescript-eslint/ban-tslint-comment": "off",

    // Require explicit accessibility modifiers since everything is public by default.
    "@typescript-eslint/explicit-member-accessibility": "warn",

    // `foo => bar()` is a shorthand for `foo => { return bar(); }`. If bar() returns void the return doesn't make sense. We still allow the short syntax because we use it in our JSX code.
    "@typescript-eslint/no-confusing-void-expression": "off",

    // Allow empty constructors, since they are there to enforce using a factory method.
    "@typescript-eslint/no-empty-function": [
      "warn",
      {
        allow: ["private-constructors"],
      },
    ],

    // Allow classes with all static members.
    "@typescript-eslint/no-extraneous-class": "off",

    // We allow specifying promises as functions to be called by JSX events.
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        checksVoidReturn: false,
      },
    ],

    // Only allow unused variables that are prefixed with an underscore. Use an ESLint rule instead of TypeScript's noUnusedLocals and noUnusedParameters to allow unused items when developing.
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],

    // Do not prefer using the `!` operator, since we only allow it in our test code.
    "@typescript-eslint/non-nullable-type-assertion-style": "off",

    // Turned off because the fixer for this rule change the expression(!)
    "@typescript-eslint/prefer-optional-chain": "off",

    // Allow numbers as variables in template strings.
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      {
        allowNumber: true,
      },
    ],

    // Require explicit boolean expressions to avoid the ambiguities that JavaScript has, https://dorey.github.io/JavaScript-Equality-Table/#if-statement.
    "@typescript-eslint/strict-boolean-expressions": [
      "warn",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],

    // Require that switch statements handle all possible cases.
    "@typescript-eslint/switch-exhaustiveness-check": [
      "warn",
      {
        considerDefaultExhaustiveForUnions: true,
        requireDefaultForNonUnion: true,
      },
    ],

    // Prefer separate overloads because this allows for more specific JSDoc comments.
    "@typescript-eslint/unified-signatures": "off",

    // Do not allow redundant returns.
    "arrow-body-style": [
      "warn",
      "as-needed",
      {
        requireReturnForObjectLiteral: true,
      },
    ],

    // Always wrap in curly braces, even one-liners.
    curly: ["warn", "all"],

    // Always use strict equality comparison, that is === or !==, even disallowing the '== null' shorthand.
    eqeqeq: ["warn", "always"],

    // Use fat arrow style when declaring functions.
    "func-style": ["warn", "expression"],

    // Do not allow alert boxes.
    "no-alert": "warn",

    // Do not allow console.log statements to ensure that they aren't forgotten from a debug session.
    "no-console": "warn",

    // Avoid redundant else statements to keep the code un-indented.
    "no-else-return": "warn",

    // Do not allowing using shorthands to convert between types.
    "no-implicit-coercion": "warn",

    // Do not allow nested ternary operators.
    "no-nested-ternary": "warn",

    // This rule is superseded by @typescript-eslint/no-unused-vars.
    "no-unused-vars": "off",

    // Do not allow unnecessary return statements.
    "no-useless-return": "warn",

    // Require that constructors are sorted first.
    "perfectionist/sort-classes": [
      "warn",
      {
        groups: ["constructor"],
      },
    ],

    // Do not check how imports are sorted, because this is handled by VS Code and Prettier.
    "perfectionist/sort-imports": "off",

    "perfectionist/sort-intersection-types": [
      "warn",
      {
        type: "natural",
        groups: ["unknown", "object"],
      },
    ],

    // Do not check how imports are sorted, because this is handled by VS Code and Prettier.
    "perfectionist/sort-named-imports": "off",

    // null and undefined should be last.
    "perfectionist/sort-union-types": [
      "warn",
      {
        groups: ["unknown", "nullish"],
        type: "natural",
      },
    ],

    // Use fat arrow style in callbacks.
    "prefer-arrow-callback": "warn",

    // Prefer template strings over concatenating with plus.
    "prefer-template": "warn",
  },
});

// Run this command to inspect this ESLint configuration: `npx @eslint/config-inspector`.
