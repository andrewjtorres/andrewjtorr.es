import {
  LocationProvider,
  LocationProviderRenderFn,
  createHistory,
  createMemorySource,
} from '@reach/router'
import { render } from '@testing-library/react'
import React from 'react'

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
