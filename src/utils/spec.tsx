import { Queries, queries } from '@testing-library/dom'
import { RenderOptions, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { FunctionComponent, ReactElement, ReactNode } from 'react'
import { IntlConfig, IntlProvider } from 'react-intl'
import { Router, RouterProps } from 'react-router'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import defaultTheme from 'styles/theme'

type AnyIfEmpty<TBase extends {}> = keyof TBase extends never ? any : TBase

type Theme =
  | AnyIfEmpty<DefaultTheme>
  | ((theme: AnyIfEmpty<DefaultTheme>) => AnyIfEmpty<DefaultTheme>)

interface Options<TQueries extends Queries = typeof queries>
  extends Partial<IntlConfig>,
    Omit<RenderOptions<TQueries>, 'wrapper'>,
    Omit<Partial<RouterProps>, 'children' | 'static'> {
  isStatic?: boolean
  route?: string
  theme?: Theme
}

interface WrapperProps {
  children?: ReactNode
}

export const renderWithContext = <TQueries extends Queries>(
  ui: ReactElement,
  {
    defaultFormats,
    defaultLocale = 'en',
    formats,
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    isStatic,
    locale = 'en',
    messages,
    onError,
    textComponent,
    theme = defaultTheme,
    timeout,
    timeZone,
    ...restOptions
  }: Options<TQueries> = {}
) => {
  const Wrapper: FunctionComponent<WrapperProps> = ({
    children,
  }: WrapperProps) => (
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
        <Router history={history} static={isStatic} timeout={timeout}>
          {children}
        </Router>
      </ThemeProvider>
    </IntlProvider>
  )

  return {
    ...render<TQueries>(ui, { wrapper: Wrapper, ...restOptions }),
    history,
  }
}
