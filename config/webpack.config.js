'use strict'

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { HotModuleReplacementPlugin } = require('webpack')

const ROOT_DIR = path.resolve(__dirname, '..')
const BUILD_DIR = path.join(ROOT_DIR, 'build')

const isAnalyze = process.argv.includes('--analyze')
const isRelease = process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const createConfig = (target, configFactory) =>
  configFactory({
    bail: isRelease,
    cache: !isRelease,
    context: ROOT_DIR,
    devtool: isRelease ? 'source-map' : 'eval-source-map',
    mode: isRelease ? 'production' : 'development',
    module: {
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.png$/,
              loader: require.resolve('url-loader'),
              options: { limit: 10000, name: '[name].[hash:8].[ext]' },
            },
            {
              test: /\.mjs$/,
              include: /[/\\\\]node_modules[/\\\\]/,
              type: 'javascript/auto',
            },
            {
              test: /\.svg$/,
              loader: require.resolve('@svgr/webpack'),
            },
            {
              test: /\.ts(x)?$/,
              include: path.join(ROOT_DIR, 'src'),
              loader: require.resolve('babel-loader'),
              options: {
                cacheCompression: isRelease,
                cacheDirectory: true,
                caller: { target },
                compact: isRelease,
              },
            },
            {
              exclude: /\.((e|m)?js|json|ts(x)?)$/,
              loader: require.resolve('file-loader'),
              options: {
                name: isRelease
                  ? '[hash:8].[ext]'
                  : '[path][name].[ext]?[hash:8]',
              },
            },
          ],
        },
      ],
      strictExportPresence: true,
    },
    output: { path: BUILD_DIR },
    resolve: {
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
      modules: ['node_modules', path.join(ROOT_DIR, 'src')],
    },
    stats: {
      cached: isVerbose,
      cachedAssets: isVerbose,
      chunkModules: isVerbose,
      chunks: isVerbose,
      colors: true,
      hash: isVerbose,
      modules: isVerbose,
      reasons: !isRelease,
      timings: true,
      version: isVerbose,
    },
    target,
  })

const clientConfig = createConfig('web', baseConfig => ({
  ...baseConfig,
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
    watchContentBase: true,
  },
  entry: { client: './src/client.tsx' },
  name: 'client',
  optimization: {
    minimize: isRelease,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          mangle: { safari10: true },
          output: { ascii_only: true },
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[/\\\\]node_modules[/\\\\]/,
          chunks: 'initial',
          name: 'vendors',
        },
      },
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    ...(isRelease
      ? [...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])]
      : [new HotModuleReplacementPlugin()]),
  ],
}))

module.exports = [clientConfig]
