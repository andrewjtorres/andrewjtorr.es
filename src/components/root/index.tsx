import { useQuery } from '@apollo/react-hooks'
import loadable from '@loadable/component'
import { Router } from '@reach/router'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'
import { InitializationQueryData, initializationQuery } from './graphql'

const Home = loadable(() => import('routes/home'))
const NotFound = loadable(() => import('routes/not-found'))

export const Root: React.FunctionComponent = () => {
  const { currentLocale = 'en', translations = [] } =
    useQuery<InitializationQueryData>(initializationQuery)?.data ?? {}

  const messages = translations.reduce<Record<string, string>>(
    (acc, { id, message }) => {
      acc[id] = message // eslint-disable-line no-param-reassign

      return acc
    },
    {}
  )

  return (
    <React.StrictMode>
      <IntlProvider
        defaultLocale="en"
        locale={currentLocale}
        messages={messages}
      >
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
}
