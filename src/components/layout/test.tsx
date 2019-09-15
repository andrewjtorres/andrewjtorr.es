import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { renderWithRouter } from 'utils/specification'
import Layout from '.'

test('should render correctly', () => {
  const { getByTestId } = render(
    <Layout>
      <div data-testid="test-child" />
    </Layout>
  )

  expect(getByTestId('test-child')).toBeInTheDocument()
})

test('clicking the logo icon should navigate to the root path', () => {
  const { getByTestId, history } = renderWithRouter(<Layout>child</Layout>, {
    initialPath: '/not-root',
  })
  const icon = getByTestId('logo')

  expect(icon).toBeInTheDocument()
  expect(history.location.pathname).toBe('/not-root')

  fireEvent.click(icon)

  expect(history.location.pathname).toBe('/')
})
