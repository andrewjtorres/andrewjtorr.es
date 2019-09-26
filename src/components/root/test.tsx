import { waitForElement } from '@testing-library/react'
import React from 'react'

import { renderWithContext } from 'utils/specification'
import Root from '.'

test('should render correctly', async () => {
  const { getByTestId } = renderWithContext(<Root />)
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  const { getByTestId } = renderWithContext(<Root />, {
    initialPath: '/not-found',
  })
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})
