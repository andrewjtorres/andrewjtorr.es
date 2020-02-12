'use strict'

module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: [
          'asyncGenerators',
          'classProperties',
          ['decorators', { decoratorsBeforeExport: true }],
          'dynamicImport',
          'exportExtensions',
          'functionBind',
          'functionSent',
          'jsx',
          'nullishCoalescingOperator',
          'objectRestSpread',
          'optionalCatchBinding',
          'optionalChaining',
        ],
      },
    ],
  ],
  rules: {
    'declaration-empty-line-before': [
      'never',
      { ignore: ['after-declaration'] },
    ],
    'value-keyword-case': null,
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
  },
}
