import { ApolloProvider } from '@apollo/react-hooks'
import { loadableReady } from '@loadable/component'
import { HttpLink } from 'apollo-link-http'
import { createBrowserHistory, createPath, Action, Listener } from 'history'
import React from 'react'
import deepForceUpdate from 'react-deep-force-update'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Root } from './components/root'
import routes from './routes'
import { resolvers, typeDefs } from './store'
import { createApolloClient, createErrorLink } from './utils/apollo'

const client = createApolloClient({
  defaults: window.__APOLLO_STATE__,
  links: [
    createErrorLink(),
    ...(__IS_DEV__ ? [require('apollo-link-logger').default] : []),
    new HttpLink({ credentials: 'include', uri: process.env.API_URI }),
  ],
  preloadedCache: window.__APOLLO_CACHE__,
  resolvers,
  ssrForceFetchDelay: 100,
  typeDefs,
})
const container = document.querySelector('#root')
const history = createBrowserHistory()
let currentLocation = history.location
let isInitialRender = true
let root: React.ComponentType | void

const onLocationChange: Listener = async ({ location }) => {
  const renderOrHydrate = isInitialRender ? hydrate : render

  if (isInitialRender) {
    isInitialRender = false
  }

  currentLocation = location

  try {
    await loadableReady()

    root = renderOrHydrate(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Root routes={routes} />
        </ApolloProvider>
      </BrowserRouter>,
      container,
      () => {
        if (window.ga) {
          window.ga('send', 'pageview', createPath(location))
        }
      }
    )
  } catch (error) {
    if (__IS_DEV__) {
      throw error
    }

    console.error(error)
  }
}

history.listen(onLocationChange)
onLocationChange({ action: Action.Push, location: currentLocation })

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2339
    if (root?.updater.isMounted(root)) {
      deepForceUpdate(root)
    }

    onLocationChange({ action: Action.Push, location: currentLocation })
  })
}
