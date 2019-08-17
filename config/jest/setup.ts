import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    addListener: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeListener: jest.fn(),
  }),
  writable: true,
})
