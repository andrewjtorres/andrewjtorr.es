import { ApolloProvider, HttpLink } from '@apollo/client'
import { loadableReady } from '@loadable/component'
import { createBrowserHistory, createPath, Action, Listener } from 'history'
import { ComponentType } from 'react'
import deepForceUpdate from 'react-deep-force-update'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Root } from './components/root'
import routes from './routes'
import { resolvers, typeDefs } from './store'
import { createApolloClient, createErrorLink } from './utils/apollo'

const client = createApolloClient({
  // @ts-expect-error TS2551
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
let root: ComponentType | void

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
        // @ts-expect-error TS2339
        if (window.ga) {
          // @ts-expect-error TS2339
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
    // @ts-expect-error TS2339
    if (root?.updater.isMounted(root)) {
      deepForceUpdate(root)
    }

    onLocationChange({ action: Action.Push, location: currentLocation })
  })
}
