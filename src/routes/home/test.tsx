import { screen } from '@testing-library/react'

import { renderWithContext } from 'utils/spec'
import Home from '.'

test('should render correctly', () => {
  const { matchMedia: originalMatchMedia } = window

  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      addListener: jest.fn(),
      matches: false,
      media: query,
      onchange: undefined,
      removeListener: jest.fn(),
    }),
  })

  renderWithContext(<Home />)

  const github = screen.getByTestId('github')
  const gitlab = screen.getByTestId('gitlab')
  const imageContainer = screen.getByTestId('image-container')
  const linkContainer = screen.getByTestId('link-container')
  const linkedin = screen.getByTestId('linkedin')
  const twitter = screen.getByTestId('twitter')

  expect(imageContainer).not.toContainElement(github)
  expect(imageContainer).not.toContainElement(gitlab)
  expect(imageContainer).not.toContainElement(linkedin)
  expect(imageContainer).not.toContainElement(twitter)
  expect(linkContainer).toContainElement(github)
  expect(linkContainer).toContainElement(gitlab)
  expect(linkContainer).toContainElement(linkedin)
  expect(linkContainer).toContainElement(twitter)

  Object.defineProperty(window, 'matchMedia', { value: originalMatchMedia })
})

test('should render correctly on medium to extra large screens', () => {
  const { matchMedia: originalMatchMedia } = window

  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      addListener: jest.fn(),
      matches: true,
      media: query,
      onchange: undefined,
      removeListener: jest.fn(),
    }),
  })

  renderWithContext(<Home />)

  const github = screen.getByTestId('github')
  const gitlab = screen.getByTestId('gitlab')
  const imageContainer = screen.getByTestId('image-container')
  const linkContainer = screen.getByTestId('link-container')
  const linkedin = screen.getByTestId('linkedin')
  const twitter = screen.getByTestId('twitter')

  expect(imageContainer).toContainElement(github)
  expect(imageContainer).toContainElement(gitlab)
  expect(imageContainer).toContainElement(linkedin)
  expect(imageContainer).toContainElement(twitter)
  expect(linkContainer).not.toContainElement(github)
  expect(linkContainer).not.toContainElement(gitlab)
  expect(linkContainer).not.toContainElement(linkedin)
  expect(linkContainer).not.toContainElement(twitter)

  Object.defineProperty(window, 'matchMedia', { value: originalMatchMedia })
})

test("clicking the linkedin icon should navigate to andrew torres' linkedin profile", () => {
  renderWithContext(<Home />)

  const icon = screen.getByTestId('linkedin')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/andrew-torres-305a7913a'
  )
})

test("clicking the github icon should navigate to andrew torres' github profile", () => {
  renderWithContext(<Home />)

  const icon = screen.getByTestId('github')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://github.com/ajtorres9')
})

test("clicking the gitlab icon should navigate to andrew torres' gitlab profile", () => {
  renderWithContext(<Home />)

  const icon = screen.getByTestId('gitlab')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://gitlab.com/ajtorres9')
})

test("clicking the twitter icon should navigate to andrew torres' twitter profile", () => {
  renderWithContext(<Home />)

  const icon = screen.getByTestId('twitter')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://twitter.com/ajtorres333')
})
