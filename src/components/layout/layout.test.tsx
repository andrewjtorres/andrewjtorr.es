import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { renderWithRouter } from 'utilities/specification'
import Layout from '.'

test('The Layout component should render correctly', () => {
  const { getByTestId } = render(
    <Layout>
      <div data-testid="test-child" />
    </Layout>
  )

  expect(getByTestId('test-child')).toBeInTheDocument()
})

test('Clicking the logo icon should navigate to the root path', () => {
  const { getByTestId, history } = renderWithRouter(<Layout>child</Layout>, {
    initialPath: '/not-root',
  })
  const icon = getByTestId('logo')

  expect(icon).toBeInTheDocument()
  expect(history.location.pathname).toStrictEqual('/not-root')

  fireEvent.click(icon)

  expect(history.location.pathname).toStrictEqual('/')
})
