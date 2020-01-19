'use strict'

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
const jestPlugin = require('eslint-plugin-jest')
const jestDomPlugin = require('eslint-plugin-jest-dom')

module.exports = {
  plugins: [
    'formatjs',
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
    'formatjs/enforce-description': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'unknown'],
        ],
        'newlines-between': 'always',
      },
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
      parserOptions: { project: 'tsconfig.json' },
      plugins: typescriptPlugin.configs.base.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-requiring-type-checking']
          .rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/named': 'off',
        ...prettierTypescriptConfig.rules,
      },
    },
    {
      files: [
        'config/jest/**/*.?(js|ts)',
        'src/**/__mocks__/**/*.ts',
        'src/**/?(*.)test.ts?(x)',
      ],
      globals: jestPlugin.environments.globals.globals,
      plugins: [
        ...jestPlugin.configs.recommended.plugins,
        ...jestDomPlugin.configs.recommended.plugins,
      ],
      rules: {
        ...jestPlugin.configs.recommended.rules,
        ...jestDomPlugin.configs.recommended.rules,
      },
    },
  ],
  settings: {
    'import/extensions': ['.d.ts', '.js', '.ts', '.tsx'],
    'import/parsers': { '@typescript-eslint/parser': ['.d.ts', '.ts', '.tsx'] },
    'import/resolver': {
      typescript: { alwaysTryTypes: true, directory: 'tsconfig.json' },
    },
  },
}
