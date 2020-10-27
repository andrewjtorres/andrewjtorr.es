import path from 'path'
import { ApolloProvider } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { renderToStringWithData } from '@apollo/client/react/ssr'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { ApolloServer } from 'apollo-server-express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import requestLanguage from 'express-request-language'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import schema from './api/schema'
import { Context } from './common'
import { Html } from './components/html'
import { Root } from './components/root'
import routes from './routes'
import { Defaults, defaults as baseDefaults, resolvers } from './store'
import { createApolloClient, createErrorLink } from './utils/apollo'
import { locales, port } from './config'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)

  return process.exit(1)
})

const app: Express = express()
const server = new ApolloServer({
  context: ({ req, res }): Context => ({ locale: req.language, res }),
  debug: __IS_DEV__,
  playground: __IS_DEV__,
  schema,
})

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(compression())
  .use(cookieParser())
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .use(
    requestLanguage({
      cookie: { name: 'lang', url: '/lang/{language}' },
      languages: locales,
      queryName: 'lang',
    })
  )
  .use(server.getMiddleware({ cors: false, path: '/api' }))

app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  const defaults: Defaults = {
    ...baseDefaults,
    currentLocale: locales.includes(req.language) ? req.language : 'en',
    locales,
  }

  const alternateLocales = locales.filter((locale) => locale !== req.language)
  const client = createApolloClient({
    defaults,
    links: [
      createErrorLink(),
      new SchemaLink({ context: { locale: req.language, res }, schema }),
    ],
    resolvers,
    ssrMode: true,
  })
  const extractor = new ChunkExtractor({
    entrypoints: 'client',
    statsFile: path.join(__dirname, 'stats.json'),
  })
  const sheet = new ServerStyleSheet()

  try {
    const root = await renderToStringWithData(
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={sheet.instance}>
          <StaticRouter location={req.url}>
            <ApolloProvider client={client}>
              <Root routes={routes} />
            </ApolloProvider>
          </StaticRouter>
        </StyleSheetManager>
      </ChunkExtractorManager>
    )

    const html = renderToStaticMarkup(
      <Html
        alternateLocales={alternateLocales}
        lang={req.language}
        links={extractor.getLinkElements()}
        scripts={extractor.getScriptElements()}
        state={{
          __APOLLO_CACHE__: client.extract(),
          __APOLLO_STATE__: defaults,
        }}
        styles={sheet.getStyleElement()}
      >
        {root}
      </Html>
    )

    return res.status(200).send(`<!doctype html>${html}`)
  } catch (error) {
    return next(error)
  }
})

if (module.hot) {
  app.hot = module.hot

  module.hot.accept('./routes')
} else {
  app.listen(port, () =>
    console.info(`The server is running at http://localhost:${port}`)
  )
}

export default app
