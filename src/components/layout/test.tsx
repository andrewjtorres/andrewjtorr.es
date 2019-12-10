import { fireEvent } from '@testing-library/react'
import React from 'react'

import { renderWithContext } from 'utils/spec'
import Layout from '.'

test('should render correctly', () => {
  const { getByTestId } = renderWithContext(
    <Layout>
      <div data-testid="test-child" />
    </Layout>
  )

  expect(getByTestId('test-child')).toBeInTheDocument()
})

test('clicking the logo icon should navigate to the root path', () => {
  const { getByTestId, history } = renderWithContext(<Layout>child</Layout>, {
    initialPath: '/not-root',
  })
  const icon = getByTestId('logo')

  expect(icon).toBeInTheDocument()
  expect(history.location.pathname).toBe('/not-root')

  fireEvent.click(icon)

  expect(history.location.pathname).toBe('/')
})
