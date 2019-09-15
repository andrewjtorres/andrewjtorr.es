import { createHistory, createMemorySource } from '@reach/router'

import { createPath } from './history'

describe('createPath', () => {
  test('should return a string consisting of the path information', () => {
    const { location } = createHistory(createMemorySource(''))

    expect(createPath(location)).toBe('/')
  })

  test('should return a string consisting of the path and search information', () => {
    const { location } = createHistory(createMemorySource(''))

    location.search = 'a=1&b=2'

    expect(createPath(location)).toBe('/?a=1&b=2')

    location.search = '?a=1&b=2'

    expect(createPath(location)).toBe('/?a=1&b=2')
  })

  test('should return a string consisting of the path and hash information', () => {
    const { location } = createHistory(createMemorySource(''))

    location.hash = 'a'

    expect(createPath(location)).toBe('/#a')

    location.hash = '#a'

    expect(createPath(location)).toBe('/#a')
  })
})
