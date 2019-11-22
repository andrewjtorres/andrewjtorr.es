import { ApolloProvider } from '@apollo/react-hooks'
import { loadableReady } from '@loadable/component'
import {
  HistoryActionType,
  HistoryLocation,
  HistorySource,
  createHistory,
} from '@reach/router'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import deepForceUpdate from 'react-deep-force-update'
import { hydrate, render } from 'react-dom'

import Root from './components/root'
import { resolvers, typeDefs } from './store'
import { createApolloClient, createErrorLink } from './utils/apollo'
import { createPath } from './utils/history'

interface HistoryMetadata {
  location: HistoryLocation
  action?: HistoryActionType
}

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
const history = createHistory((window as unknown) as HistorySource)
let currentLocation = history.location
let root: React.ComponentType | void

const onLocationChange = async ({ action, location }: HistoryMetadata) => {
  const renderOrHydrate = action ? render : hydrate

  currentLocation = location

  try {
    await loadableReady()

    root = renderOrHydrate(
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>,
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

history.listen(onLocationChange) // eslint-disable-line @typescript-eslint/no-misused-promises
onLocationChange({ location: currentLocation })

if (module.hot) {
  module.hot.accept('./components/root', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2339
    if (root?.updater.isMounted(root)) {
      deepForceUpdate(root)
    }

    onLocationChange({ location: currentLocation })
  })
}
