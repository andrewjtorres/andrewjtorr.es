import {
  History,
  LocationProvider,
  LocationProviderRenderFn,
  createHistory,
  createMemorySource,
} from '@reach/router'
import { render } from '@testing-library/react'
import React from 'react'
import { IntlConfig, IntlProvider } from 'react-intl'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import defaultTheme from 'styles/theme'

type AnyIfEmpty<TBase extends {}> = keyof TBase extends never ? any : TBase

type Theme =
  | AnyIfEmpty<DefaultTheme>
  | ((theme: AnyIfEmpty<DefaultTheme>) => AnyIfEmpty<DefaultTheme>)

interface Options extends Partial<IntlConfig> {
  history?: History
  initialPath?: string
  theme?: Theme
}

export const renderWithContext = (
  node: React.ReactNode | LocationProviderRenderFn,
  {
    defaultFormats,
    defaultLocale = 'en',
    formats,
    history: providedHistory,
    initialPath = '/',
    locale = 'en',
    messages,
    onError,
    textComponent,
    theme = defaultTheme,
    timeZone,
  }: Options = {}
) => {
  const history =
    providedHistory ?? createHistory(createMemorySource(initialPath))

  return {
    ...render(
      <IntlProvider
        defaultFormats={defaultFormats}
        defaultLocale={defaultLocale}
        formats={formats}
        locale={locale}
        messages={messages}
        onError={onError}
        textComponent={textComponent}
        timeZone={timeZone}
      >
        <ThemeProvider theme={theme}>
          <LocationProvider history={history}>{node}</LocationProvider>
        </ThemeProvider>
      </IntlProvider>
    ),
    history,
  }
}
