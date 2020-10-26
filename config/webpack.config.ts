import { join, resolve } from 'path'
import LoadablePlugin from '@loadable/webpack-plugin'
import DotenvPlugin from 'dotenv-webpack'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, BannerPlugin, DefinePlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import nodeExternals from 'webpack-node-externals'

type ConfigFactory = (config: Configuration) => Configuration

type Target =
  | 'async-node'
  | 'electron-main'
  | 'electron-preload'
  | 'electron-renderer'
  | 'node'
  | 'node-webkit'
  | 'web'
  | 'webworker'
  | ((compiler?: any) => void)

const rootDir = resolve(__dirname, '..')
const buildDir = join(rootDir, 'build')
const srcDir = join(rootDir, 'src')

const env = process.env.NODE_ENV ?? 'development'
const isProd = /^prod(uction)?$/i.test(env)

const isAnalyze = process.argv.includes('--analyze')
const isRelease = isProd || process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const envFile = isRelease ? '.env.prod' : '.env.dev'

const createConfig = (target: Target, configFactory: ConfigFactory) =>
  configFactory({
    bail: isRelease,
    cache: !isRelease,
    context: rootDir,
    devtool: isRelease ? 'source-map' : 'eval-source-map',
    mode: isRelease ? 'production' : 'development',
    module: {
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.(bmp|gif|jp(e)?g|png|webp)$/,
              loader: require.resolve('url-loader'),
              options: { limit: 10000, name: '[name].[hash:8].[ext]' },
            },
            {
              test: /\.mjs$/,
              include: /[/\\]node_modules[/\\]/,
              type: 'javascript/auto',
            },
            {
              test: /\.svg$/,
              loader: require.resolve('@svgr/webpack'),
              options: { ref: true },
            },
            {
              test: /\.ts(x)?$/,
              include: srcDir,
              loader: require.resolve('babel-loader'),
              options: {
                cacheCompression: isRelease,
                cacheDirectory: true,
                caller: { target },
                compact: isRelease,
              },
            },
            ...(isRelease
              ? [
                  {
                    test: require.resolve('react-deep-force-update'),
                    loader: require.resolve('null-loader'),
                  },
                ]
              : []),
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
    output: {
      chunkFilename: isRelease
        ? '[name].[chunkhash:8].chunk.js'
        : '[name].chunk.js',
      devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) =>
        resolve(absoluteResourcePath).replace(/\\/g, '/'),
      filename: isRelease ? '[name].[chunkhash:8].js' : '[name].js',
      path: join(buildDir, 'public/assets'),
      pathinfo: isVerbose,
      publicPath: '/assets/',
    },
    plugins: [
      new DefinePlugin({
        __IS_DEV__: !isRelease,
        ...(target === 'web' ? { 'process.env.BROWSER_ENV': `'${env}'` } : {}),
      }),
      new DotenvPlugin({
        path: join(rootDir, envFile),
        safe: join(rootDir, '.env.example'),
        systemvars: true,
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.mjs', '.ts', '.tsx', '.wasm'],
      modules: ['node_modules', srcDir],
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

const clientConfig = createConfig('web', ({ plugins = [], ...baseConfig }) => ({
  ...baseConfig,
  entry: { client: resolve('./src/client.tsx') },
  name: 'client',
  optimization: {
    minimize: isRelease,
    minimizer: [
      new TerserPlugin({
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
          test: /[/\\]node_modules[/\\]/,
          chunks: 'initial',
          name: 'vendors',
        },
      },
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    ...plugins,
    new LoadablePlugin({
      filename: 'stats.json',
      writeToDisk: { filename: 'build' },
    }),
    ...(isAnalyze && isRelease ? [new BundleAnalyzerPlugin()] : []),
  ],
}))

const handlerConfig = createConfig(
  'node',
  ({ output = {}, plugins = [], ...baseConfig }) => ({
    ...baseConfig,
    entry: { handler: resolve('./src/handler.ts') },
    externals: [
      nodeExternals({ allowlist: [/\.(bmp|gif|jp(e)?g|png|webp)$/] }),
    ],
    name: 'handler',
    node: false,
    output: {
      ...output,
      chunkFilename: 'chunks/[name].js',
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: buildDir,
    },
    plugins: [
      ...plugins,
      new BannerPlugin({
        banner: 'require("source-map-support").install();',
        entryOnly: false,
        raw: true,
      }),
    ],
  })
)

const serverConfig = createConfig(
  'node',
  ({ output = {}, plugins = [], ...baseConfig }) => ({
    ...baseConfig,
    entry: { server: resolve('./src/server.tsx') },
    externals: [
      nodeExternals({ allowlist: [/\.(bmp|gif|jp(e)?g|png|webp)$/] }),
    ],
    name: 'server',
    node: false,
    output: {
      ...output,
      chunkFilename: 'chunks/[name].js',
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: buildDir,
    },
    plugins: [
      ...plugins,
      new BannerPlugin({
        banner: 'require("source-map-support").install();',
        entryOnly: false,
        raw: true,
      }),
    ],
  })
)

export default [clientConfig, handlerConfig, serverConfig]
