import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { Linter } from 'eslint';
import { ESLintPlugin } from '@typescript-eslint/eslint-plugin'; // Usamos import en lugar de require
import * as tsParser from '@typescript-eslint/parser';

/** @type {Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser, // Usamos el parser de TypeScript aquí
      parserOptions: {
        ecmaVersion: 'latest', // Usamos la última versión de ECMAScript
        sourceType: 'module',  // Para usar módulos ES6
        project: './tsconfig.json', // Asegúrate de tener este archivo
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': ESLintPlugin, // Definimos el plugin de TypeScript correctamente como objeto
      react: pluginReact, // Definimos React como objeto
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
  },
];
