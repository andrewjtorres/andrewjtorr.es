import loadable from '@loadable/component'
import { Router } from '@reach/router'
import React from 'react'
import { IntlProvider } from 'react-intl'

import GlobalStyle from 'styles/global'

const Home = loadable(() =>
  import(/* webpackChunkName: 'home' */ 'routes/home')
)

const NotFound = loadable(() =>
  import(/* webpackChunkName: 'not-found' */ 'routes/not-found')
)

const Root: React.FunctionComponent = () => (
  <IntlProvider defaultLocale="en" locale="en">
    <GlobalStyle />
    <Router>
      <Home data-testid="home" path="/" />
      <NotFound data-testid="not-found" default />
    </Router>
  </IntlProvider>
)

export default Root
