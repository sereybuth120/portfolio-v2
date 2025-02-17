/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// Svelte imports
					['^svelte', '^@svelte'],
					// Framework and library imports (SvelteKit)
					['^\\$app', '^\\$env', '^\\$service-worker'],
					// Lib imports (group by type)
					['^\\$lib/components/'],
					['^\\$lib/assets/'],
					['^\\$lib/'],
					// Relative imports
					['^\\./'],
					['^\\.\\.'],
					// Style imports
					['^.+\\.s?css$']
				]
			}
		],
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error'
	}
};
