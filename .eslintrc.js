'use strict'

const jestPlugin = require('eslint-plugin-jest')
const prettierTypescriptConfig = require('eslint-config-prettier/@typescript-eslint')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')

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
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '.*/**/*.ts?(x)'],
      parser: typescriptPlugin.configs.recommended.parser,
      plugins: typescriptPlugin.configs.recommended.plugins,
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        'no-use-before-define': 'off',
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
