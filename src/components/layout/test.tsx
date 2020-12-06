import { fireEvent, screen } from '@testing-library/react'

import { renderWithContext } from 'utils/spec'
import { Layout } from '.'

test('should render correctly', () => {
  renderWithContext(
    <Layout>
      <div data-testid="test-child" />
    </Layout>
  )

  expect(screen.getByTestId('test-child')).toBeInTheDocument()
})

test('clicking the logo icon should navigate to the root path', () => {
  const { history } = renderWithContext(<Layout>child</Layout>, {
    route: '/not-root',
  })
  const icon = screen.getByTestId('logo')

  expect(icon).toBeInTheDocument()
  expect(history.location.pathname).toBe('/not-root')

  fireEvent.click(icon)

  expect(history.location.pathname).toBe('/')
})
