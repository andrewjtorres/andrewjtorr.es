import { renderWithRouter } from './specification'

test('The renderWithRouter function should return an object containing a history object', () => {
  const node = jest.fn()
  const { history } = renderWithRouter(node)

  expect(node).toHaveBeenCalledTimes(1)
  expect(node).toHaveBeenCalledWith({
    location: expect.objectContaining({ pathname: '/' }),
    navigate: expect.any(Function),
  })
  expect(history.location.pathname).toStrictEqual('/')
})

test('The renderWithRouter function should return an object containing a modified history object', () => {
  const node = jest.fn()
  const { history } = renderWithRouter(node, { initialPath: '/not-root' })

  expect(node).toHaveBeenCalledTimes(1)
  expect(node).toHaveBeenCalledWith({
    location: expect.objectContaining({ pathname: '/not-root' }),
    navigate: expect.any(Function),
  })
  expect(history.location.pathname).toStrictEqual('/not-root')
})
