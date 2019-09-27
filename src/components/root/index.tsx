import loadable from '@loadable/component'
import { Router } from '@reach/router'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

const Home = loadable(() =>
  import(/* webpackChunkName: 'home' */ 'routes/home')
)

const NotFound = loadable(() =>
  import(/* webpackChunkName: 'not-found' */ 'routes/not-found')
)

const Root: React.FunctionComponent = () => (
  <React.StrictMode>
    <IntlProvider defaultLocale="en" locale="en">
      {/*
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore TS2322 */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Home data-testid="home" path="/" />
          <NotFound data-testid="not-found" default />
        </Router>
      </ThemeProvider>
    </IntlProvider>
  </React.StrictMode>
)

export default Root
