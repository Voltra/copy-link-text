

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import eslint from "@eslint/js";
import eslintPrettier from "eslint-config-prettier";
import vitest from "@vitest/eslint-plugin";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import tseslint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
	{
		files: [
			"src/**/*.ts",
			"tests/**/*.ts",
			"*.config.js",
			"*.config.mjs",
			"*.config.ts",
			"*.config.mts",
		],
		plugins: {
			"@stylistic/ts": stylisticTs,
		},
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			eslintPrettier,
		],
		languageOptions: {
			parserOptions: {
				// debugLevel: ['eslint', 'typescript-eslint', 'typescript'],
				project: "./tsconfig.eslint.json",
				tsconfigRootDir: __dirname,
				EXPERIMENTAL_useProjectService: false,
			},
		},
		rules: {
			"lines-around-comment": [
				"error",
				{
					beforeBlockComment: true,
					allowObjectStart: true,
					allowArrayStart: true,
				},
			],
			"lines-between-class-members": ["error", "always"],
			"no-trailing-spaces": "error",
			quotes: "error",
			"@typescript-eslint/no-unnecessary-qualifier": "error",
			"@typescript-eslint/prefer-as-const": "error",
			"@typescript-eslint/unbound-method": "warn",
		},
	},
	{
		files: ["src/**/*.js"],
		extends: [tseslint.configs.disableTypeChecked],
		rules: {
			"@typescript-eslint/no-var-requires": "off",
		},
	},
	{
		files: ["tests/**/*.test.ts"],
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules,

			/*"vitest/assertion-type": ["error", {
				type: "jest",
			}],*/
			"vitest/consistent-test-it": [
				"error",
				{
					fn: "it",
				},
			],
			"vitest/expect-expect": [
				"error",
				{
					assertFunctionNames: ["expect*", "*Tests"],
					additionalTestBlockFunctions: ["describe", "*Tests"],
				},
			],
			"vitest/no-alias-methods": "error",
			"vitest/no-commented-out-tests": "off",
			"vitest/no-conditional-expect": "error",
			"vitest/no-conditional-in-test": "error",
			"vitest/no-conditional-tests": "error",
			"vitest/no-duplicate-hooks": "error",
			"vitest/no-focused-tests": "error",
			"vitest/no-identical-title": "error",
			"vitest/no-test-prefixes": "error",
			"vitest/prefer-each": "error",
			"vitest/prefer-expect-resolves": "error",
			"vitest/prefer-hooks-in-order": "error",
			"vitest/prefer-hooks-on-top": "error",
			"vitest/prefer-lowercase-title": "error",
			"vitest/prefer-mock-promise-shorthand": "error",
			"vitest/prefer-strict-equal": "error",
			"vitest/prefer-to-be-falsy": "error",
			"vitest/prefer-to-be-truthy": "error",
			"vitest/prefer-to-be": "error",
			"vitest/prefer-to-contain": "error",
			"vitest/prefer-to-have-length": "error",
			"vitest/prefer-todo": "error",
			"vitest/valid-describe-callback": "error",
			"vitest/valid-expect": [
				"error",
				{
					alwaysAwait: true,
				},
			],
		},
		settings: {
			vitest: {
				typecheck: true,
			},
		},
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},
	},
);


