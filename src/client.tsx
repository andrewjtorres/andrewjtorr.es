import { ApolloProvider } from '@apollo/react-hooks'
import { loadableReady } from '@loadable/component'
import {
  HistoryActionType,
  HistoryLocation,
  HistorySource,
  createHistory,
} from '@reach/router'
import React from 'react'
import deepForceUpdate from 'react-deep-force-update'
import { hydrate, render } from 'react-dom'

import Root from './components/root'
import { createPath } from './utils/history'
import { createApolloClient } from './apollo'

interface HistoryMetadata {
  location: HistoryLocation
  action?: HistoryActionType
}

const client = createApolloClient({ preloadedCache: window.__APOLLO_CACHE__ })
const container = document.querySelector('#root')
const history = createHistory((window as unknown) as HistorySource)
let currentLocation = history.location
let root: any

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
    if (root && root.updater.isMounted(root)) {
      deepForceUpdate(root)
    }

    onLocationChange({ location: currentLocation })
  })
}
