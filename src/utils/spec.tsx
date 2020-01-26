import {
  History,
  LocationProvider,
  createHistory,
  createMemorySource,
} from '@reach/router'
import { Queries, queries } from '@testing-library/dom'
import { RenderOptions, render } from '@testing-library/react'
import React from 'react'
import { IntlConfig, IntlProvider } from 'react-intl'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import defaultTheme from 'styles/theme'

type AnyIfEmpty<TBase extends {}> = keyof TBase extends never ? any : TBase

type Theme =
  | AnyIfEmpty<DefaultTheme>
  | ((theme: AnyIfEmpty<DefaultTheme>) => AnyIfEmpty<DefaultTheme>)

interface Options<TQueries extends Queries = typeof queries>
  extends Partial<IntlConfig>,
    RenderOptions<TQueries> {
  history?: History
  initialPath?: string
  theme?: Theme
}

export const renderWithContext = <TQueries extends Queries>(
  ui: React.ReactElement,
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
    ...restOptions
  }: Options<TQueries> = {}
) => {
  const history =
    providedHistory ?? createHistory(createMemorySource(initialPath))

  return {
    ...render<TQueries>(
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
          <LocationProvider history={history}>{ui}</LocationProvider>
        </ThemeProvider>
      </IntlProvider>,
      restOptions
    ),
    history,
  }
}
