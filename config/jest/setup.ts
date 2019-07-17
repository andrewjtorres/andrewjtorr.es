import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import 'jest-styled-components'

window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  addListener: jest.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeListener: jest.fn(),
}))
