// eslint.config.js
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Ignore files and folders
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  // TypeScript + JavaScript linting
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'warn',

      // Useful TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },

  // Apply Prettier last
  prettierConfig,
];
