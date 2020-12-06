import { screen } from '@testing-library/react'

import { renderWithContext } from './spec'

describe('renderWithContext', () => {
  test('should return render metadata containing a history object', () => {
    const { history } = renderWithContext(<div data-testid="test-child" />)

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(history.location.pathname).toBe('/')
  })

  test('should return render metadata containing a modified history object', () => {
    const { history } = renderWithContext(<div data-testid="test-child" />, {
      route: '/not-root',
    })

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(history.location.pathname).toBe('/not-root')
  })
})
