import loadable from '@loadable/component'
import { Router } from '@reach/router'
import React from 'react'

import GlobalStyle from 'styles/global'

const Home = loadable(() =>
  import(/* webpackChunkName: 'home' */ 'routes/home')
)

const NotFound = loadable(() =>
  import(/* webpackChunkName: 'not-found' */ 'routes/not-found')
)

const Root: React.FunctionComponent = () => (
  <React.Fragment>
    <GlobalStyle />
    <Router>
      <Home data-testid="home" path="/" />
      <NotFound data-testid="not-found" default />
    </Router>
  </React.Fragment>
)

export default Root
