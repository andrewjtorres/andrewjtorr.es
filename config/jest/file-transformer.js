'use strict'

const path = require('path')

module.exports = {
  process: (src, relativePath) => {
    const filename = JSON.stringify(path.basename(relativePath))

    return /\.svg$/.test(relativePath)
      ? `module.exports = { __esModule: true, default: (props) => ({ $$typeof: Symbol.for('react.element'), key: null, props: Object.assign({}, props, { children: ${filename} }), ref: null, type: 'svg' }) };`
      : `module.exports = ${filename};`
  },
}
