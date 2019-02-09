import 'jest-dom/extend-expect'
import 'jest-styled-components'
import 'react-testing-library/cleanup-after-each'

window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  addListener: jest.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeListener: jest.fn(),
}))
