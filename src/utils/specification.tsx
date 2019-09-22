import {
  LocationProvider,
  LocationProviderRenderFn,
  createHistory,
  createMemorySource,
} from '@reach/router'
import { render } from '@testing-library/react'
import React from 'react'
import { IntlConfig, IntlProvider } from 'react-intl'

type IntlOptions = Partial<IntlConfig>

interface RouterOptions {
  initialPath?: string
}

export const renderWithRouter = (
  node: React.ReactNode | LocationProviderRenderFn,
  { initialPath = '/' }: RouterOptions = {}
) => {
  const history = createHistory(createMemorySource(initialPath))

  return {
    ...render(<LocationProvider history={history}>{node}</LocationProvider>),
    history,
  }
}

export const renderWithIntl = (node: React.ReactNode, opts: IntlOptions = {}) =>
  render(
    <IntlProvider defaultLocale="en" locale="en" {...opts}>
      {node}
    </IntlProvider>
  )
