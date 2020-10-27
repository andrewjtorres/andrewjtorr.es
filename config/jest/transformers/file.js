'use strict'

const path = require('path')

module.exports = {
  process: (_sourceText, sourcePath) => {
    const filename = JSON.stringify(path.basename(sourcePath))

    return /\.svg$/.test(sourcePath)
      ? `module.exports = { __esModule: true, default: (props) => ({ $$typeof: Symbol.for('react.element'), key: null, props: Object.assign({}, props, { children: ${filename} }), ref: null, type: 'svg' }) };`
      : `module.exports = ${filename};`
  },
}
