import path from 'path'
import browserSync from 'browser-sync'
import express, { Express } from 'express'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import webpack, {
  Compiler,
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  Options,
} from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../config/webpack.config'
import clean from './clean'
import run, { format } from './run'

const watchOptions: Options.WatchOptions = {}

const rootDir = path.resolve(__dirname, '..')
const publicDir = path.join(rootDir, 'public')
const translationsDir = path.join(rootDir, 'src/i18n/translations')

const env = process.env.NODE_ENV ?? 'development'
const isProd = /^prod(uction)?$/i.test(env)

const isRelease = isProd || process.argv.includes('--release')
const isSilent = process.argv.includes('--silent')
let server: Express

const createCompilationPromise = (
  name: string,
  compiler: Compiler,
  config: Configuration
) =>
  new Promise((resolve, reject) => {
    let start = new Date()

    compiler.hooks.compile.tap(name, () => {
      start = new Date()

      console.info(`[${format(start)}] Compiling '${name}'`)
    })

    compiler.hooks.done.tap(name, (stats) => {
      console.info(stats.toString(config.stats))

      const end = new Date()
      const time = end.getTime() - start.getTime()

      if (stats.hasErrors()) {
        console.info(
          `[${format(end)}] Failed to compile '${name}' after ${time} ms`
        )

        reject(new Error('Compilation failed'))
      } else {
        console.info(
          `[${format(end)}] Finished '${name}' compilation after ${time} ms`
        )

        resolve(stats)
      }
    })
  })

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

const start = async () => {
  if (server) {
    return server
  }

  const clientConfig: Configuration =
    webpackConfig.find(({ name }) => name === 'client') ?? {}
  const serverConfig: Configuration =
    webpackConfig.find(({ name }) => name === 'server') ?? {}

  const { chunkFilename = '', filename = '', publicPath = '' } =
    clientConfig.output ?? {}
  let entry = clientConfig.entry ?? {}
  let plugins = clientConfig.plugins ?? []
  let rules = clientConfig.module?.rules ?? []

  if (typeof entry === 'function') {
    throw new TypeError("Unable to set 'client' entry point")
  }

  if (Array.isArray(entry) || typeof entry === 'string') {
    entry = clientConfig.entry = { client: entry }
  }

  entry.client = ['./scripts/lib/webpack-hot-dev-client']
    .concat(entry.client)
    .sort(
      (a, b) => Number(b.includes('polyfill')) - Number(a.includes('polyfill'))
    )

  clientConfig.module = {
    ...clientConfig.module,
    rules: rules.filter(({ loader }) => loader !== 'null-loader'),
  }

  if (typeof filename === 'function') {
    throw new TypeError('Unable to properly update output filename')
  }

  clientConfig.output = {
    ...clientConfig.output,
    chunkFilename: chunkFilename.replace('chunkhash', 'hash'),
    filename: filename.replace('chunkhash', 'hash'),
  }

  plugins.unshift(
    new DefinePlugin({ 'process.env.TRANSLATIONS_DIR': `'${translationsDir}'` })
  )
  plugins.push(new HotModuleReplacementPlugin())

  plugins = serverConfig.plugins ?? []
  rules = serverConfig.module?.rules ?? []

  serverConfig.module = {
    ...serverConfig.module,
    rules: rules.filter(({ loader }) => loader !== 'null-loader'),
  }

  serverConfig.output = {
    ...serverConfig.output,
    hotUpdateChunkFilename: 'updates/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'updates/[hash].hot-update.json',
  }

  plugins.unshift(
    new DefinePlugin({ 'process.env.TRANSLATIONS_DIR': `'${translationsDir}'` })
  )
  plugins.push(new HotModuleReplacementPlugin())

  server = express()

  server.use(errorOverlayMiddleware()).use(express.static(publicDir))

  await run(clean)

  const multiCompiler = webpack(webpackConfig)
  const clientCompiler: Compiler =
    multiCompiler.compilers.find(({ name }) => name === 'client') ?? webpack()
  const serverCompiler: Compiler =
    multiCompiler.compilers.find(({ name }) => name === 'server') ?? webpack()

  const clientPromise = createCompilationPromise(
    'client',
    clientCompiler,
    clientConfig
  )
  const serverPromise = createCompilationPromise(
    'server',
    serverCompiler,
    serverConfig
  )

  server
    .use(
      webpackDevMiddleware(clientCompiler, {
        logLevel: 'silent',
        publicPath,
        watchOptions,
      })
    )
    .use(webpackHotMiddleware(clientCompiler, { log: false }))

  let app: Express
  let appPromise: Promise<any>
  let appPromiseIsResolved = true
  let appPromiseResolve = noop

  serverCompiler.hooks.compile.tap('server', () => {
    if (!appPromiseIsResolved) {
      return
    }

    appPromiseIsResolved = false
    appPromise = new Promise<void>((resolve) => (appPromiseResolve = resolve))
  })

  server.use((req, res) =>
    appPromise
      // @ts-expect-error TS2339
      .then(() => app.handle(req, res))
      .catch((error) => console.error(error))
  )

  const checkForUpdate = (fromUpdate = false) => {
    const hmrPrefix = '[\u001B[35mHMR\u001B[0m] '

    if (!app.hot) {
      throw new Error(`${hmrPrefix}Hot Module Replacement is disabled`)
    }

    if (app.hot.status() !== 'idle') {
      return Promise.resolve()
    }

    return (
      app.hot
        // @ts-expect-error TS2345
        .check(true)
        // @ts-expect-error TS2339
        .then((outdatedModules: __WebpackModuleApi.ModuleId[]) => {
          if (!outdatedModules) {
            return fromUpdate && console.info(`${hmrPrefix}Update applied`)
          }

          if (outdatedModules.length === 0) {
            return console.info(`${hmrPrefix}Nothing hot updated`)
          } else {
            console.info(`${hmrPrefix}Updated modules:`)

            outdatedModules.forEach((moduleId) =>
              console.info(`${hmrPrefix} - ${moduleId}`)
            )

            return checkForUpdate(true)
          }
        })
        .catch((error: any) => {
          if (['abort', 'fail'].includes(app.hot?.status() ?? '')) {
            console.warn(`${hmrPrefix}Cannot apply update`)

            delete require.cache[require.resolve('../build/server')]

            app = require('../build/server').default

            return console.warn(`${hmrPrefix}App has been reloaded`)
          }

          return console.warn(
            `${hmrPrefix}Update failed: ${error.stack ?? error.message}`
          )
        })
    )
  }

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      return checkForUpdate().then(() => {
        appPromiseIsResolved = true

        return appPromiseResolve()
      })
    }
  })

  await clientPromise
  await serverPromise

  const start = new Date()

  console.info(`[${format(start)}] Launching server`)

  app = require('../build/server').default
  appPromiseIsResolved = true

  appPromiseResolve()

  await new Promise((resolve, reject) =>
    browserSync.create().init(
      {
        middleware: [server],
        open: !isSilent && 'local',
        server: { baseDir: '../public' },
        ...(isRelease ? { notify: false, ui: {} } : {}),
      },
      (error, bs) => (error ? reject(error) : resolve(bs))
    )
  )

  const end = new Date()
  const time = end.getTime() - start.getTime()

  console.info(`[${format(end)}] Server launched after ${time} ms`)

  return server
}

export default start
