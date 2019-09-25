'use strict'

const { basename } = require('path')

module.exports = {
  process: (_, relativePath) => {
    const filename = JSON.stringify(basename(relativePath))

    return /\.svg$/.test(relativePath)
      ? `module.exports = { __esModule: true, default: (props) => ({ $$typeof: Symbol.for('react.element'), key: null, props: Object.assign({}, props, { children: ${filename} }), ref: null, type: 'svg' }) };`
      : `module.exports = ${filename};`
  },
}
