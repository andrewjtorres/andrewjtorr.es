import { useQuery } from '@apollo/client'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { useRoutes, PartialRouteObject } from 'react-router'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'
import { InitializationQueryData, initializationQuery } from './graphql'

type Messages = Record<string, string>

interface RootProps {
  routes: PartialRouteObject[]
}

const defaultLocale = 'en'

export const Root: React.FunctionComponent<RootProps> = ({
  routes,
}: RootProps) => {
  const [messages, setMessages] = React.useState<Messages>()
  const route = useRoutes(routes)

  const { data } = useQuery<InitializationQueryData>(initializationQuery, {
    onCompleted: ({ translations }) => {
      const messages: Messages = {}

      for (const { id, message } of translations) {
        messages[id] = message
      }

      setMessages(messages)
    },
  })

  return (
    <React.StrictMode>
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={data?.currentLocale || defaultLocale}
        messages={messages}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {route}
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>
  )
}
