import '@testing-library/jest-dom'
import 'jest-styled-components'

Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    addListener: jest.fn(),
    matches: false,
    media: query,
    onchange: undefined,
    removeListener: jest.fn(),
  }),
  writable: true,
})
