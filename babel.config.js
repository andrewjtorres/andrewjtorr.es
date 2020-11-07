'use strict'

const packageConfig = require('./package.json')

const createConfig = ({ caller, env }) => {
  const { 0: node = '14.15' } =
    /(\d+\.?)+/.exec(packageConfig.engines.node) || []
  const isDev = env('development')
  const isProd = env('production')
  const isTest = env('test')

  return {
    plugins: [
      ...(isProd
        ? [
            '@babel/transform-react-constant-elements',
            '@babel/transform-react-inline-elements',
          ]
        : []),
      ['@babel/transform-runtime', { corejs: 3, helpers: false }],
      '@loadable/babel-plugin',
      ...(isTest ? [] : ['polished']),
      'graphql-tag',
      ['styled-components', { displayName: isDev, pure: isProd }],
    ],
    presets: [
      [
        '@babel/preset-env',
        caller(({ target = 'node' } = {}) => target === 'node')
          ? { targets: { node } }
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
