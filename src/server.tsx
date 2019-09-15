import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { ServerLocation, isRedirect } from '@reach/router'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import { resolve } from 'path'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { port } from './config'
import Html from './components/html'
import Root from './components/root'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)

  return process.exit(1)
})

const app: Express = express()

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(compression())
  .use(cors())
  .use(express.static(resolve(__dirname, 'public')))

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  try {
    const extractor = new ChunkExtractor({
      entrypoints: 'client',
      statsFile: resolve(__dirname, 'stats.json'),
    })
    const sheet = new ServerStyleSheet()

    const root = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={sheet.instance}>
          <ServerLocation url={req.url}>
            <Root />
          </ServerLocation>
        </StyleSheetManager>
      </ChunkExtractorManager>
    )

    const html = renderToStaticMarkup(
      <Html
        links={extractor.getLinkElements()}
        scripts={extractor.getScriptElements()}
        styles={sheet.getStyleElement()}
      >
        {root}
      </Html>
    )

    res.status(200)

    return res.send(`<!doctype html>${html}`)
  } catch (error) {
    return isRedirect(error) ? res.redirect(error.uri) : next(error)
  }
})

if (module.hot) {
  app.hot = module.hot

  module.hot.accept('./components/root')
} else {
  app.listen(port, () =>
    console.info(`The server is running at http://localhost:${port}`)
  )
}

export default app
