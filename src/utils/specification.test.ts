import { renderWithRouter } from './specification'

describe('renderWithRouter', () => {
  test('should return render metadata containing a history object', () => {
    const node = jest.fn()
    const { history } = renderWithRouter(node)

    expect(node).toHaveBeenCalledTimes(1)
    expect(node).toHaveBeenCalledWith({
      location: expect.objectContaining({ pathname: '/' }),
      navigate: expect.any(Function),
    })
    expect(history.location.pathname).toBe('/')
  })

  test('should return render metadata containing a modified history object', () => {
    const node = jest.fn()
    const { history } = renderWithRouter(node, { initialPath: '/not-root' })

    expect(node).toHaveBeenCalledTimes(1)
    expect(node).toHaveBeenCalledWith({
      location: expect.objectContaining({ pathname: '/not-root' }),
      navigate: expect.any(Function),
    })
    expect(history.location.pathname).toBe('/not-root')
  })
})
