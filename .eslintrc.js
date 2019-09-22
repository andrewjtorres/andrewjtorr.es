'use strict'

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
const jestPlugin = require('eslint-plugin-jest')
const { resolve } = require('path')

module.exports = {
  plugins: [
    'import',
    'jsx-a11y',
    'prettier',
    'promise',
    'react',
    'react-hooks',
    'standard',
    'unicorn',
  ],
  env: { browser: true },
  globals: { __IS_DEV__: false },
  extends: [
    'standard',
    'standard-react',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/unicorn',
  ],
  rules: {
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-param-reassign': ['error', { props: true }],
    'import/order': [
      'error',
      { groups: [['builtin', 'external']], 'newlines-between': 'always' },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'unicorn/prevent-abbreviations': 'off',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/.*/**/*.ts?(x)'],
      parser: typescriptPlugin.configs.base.parser,
      parserOptions: { project: resolve(__dirname, 'tsconfig.json') },
      plugins: typescriptPlugin.configs.base.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-requiring-type-checking']
          .rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        ...prettierTypescriptConfig.rules,
      },
    },
    {
      files: ['config/jest/**/*.?(js|ts)', 'src/**/?(*.)test.ts?(x)'],
      globals: jestPlugin.environments.globals.globals,
      plugins: jestPlugin.configs.recommended.plugins,
      rules: jestPlugin.configs.recommended.rules,
    },
  ],
  settings: { 'import/resolver': { typescript: true } },
}
