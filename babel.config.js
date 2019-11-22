'use strict'

const { node } = require('./package.json').engines

const createConfig = ({ caller, env }) => {
  const isDev = env('development')
  const isProd = env('production')
  const isTest = env('test')

  return {
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/syntax-dynamic-import',
      ...(isProd
        ? [
            '@babel/transform-react-constant-elements',
            '@babel/transform-react-inline-elements',
          ]
        : []),
      ['@babel/transform-runtime', { corejs: 3, helpers: false }],
      '@loadable/babel-plugin',
      ...(isTest ? ['dynamic-import-node'] : ['polished']),
      'graphql-tag',
      ['styled-components', { displayName: isDev, pure: isProd }],
    ],
    presets: [
      [
        '@babel/preset-env',
        caller(({ target = 'node' } = {}) => target === 'node')
          ? { targets: { node: node.match(/(\d+\.?)+/)[0] } }
          : { corejs: 3, modules: false, useBuiltIns: 'entry' },
      ],
      [
        '@babel/preset-react',
        { development: isDev || isTest, useBuiltIns: true },
      ],
      '@babel/preset-typescript',
    ],
    ignore: ['build', 'node_modules'],
  }
}

module.exports = createConfig
