'use strict'

const path = require('path')
const camelCase = require('camelcase')
const serialize = require('serialize-javascript')

module.exports = {
  process: (_sourceText, sourcePath) => {
    const { base, name } = path.parse(sourcePath)
    const fileBase = serialize(base)
    const fileName = camelCase(name, { pascalCase: true })

    return /\.svg$/.test(sourcePath)
      ? `const React=require('react');module.exports={__esModule:true,default:React.forwardRef(function Svg${fileName}(props,ref){return {$$typeof:Symbol.for('react.element'),key:null,props:Object.assign({},props,{children:${fileBase}}),ref,type:'svg'}})};`
      : `module.exports=${fileBase};`
  },
}
