import React from 'react'

import { renderWithContext } from 'utils/specification'
import Home from '.'

test('should render correctly', () => {
  const { matchMedia } = window

  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      addListener: jest.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeListener: jest.fn(),
    }),
  })

  const { getByTestId } = renderWithContext(<Home />)
  const github = getByTestId('github')
  const gitlab = getByTestId('gitlab')
  const imageContainer = getByTestId('image-container')
  const linkContainer = getByTestId('link-container')
  const linkedin = getByTestId('linkedin')
  const twitter = getByTestId('twitter')

  expect(imageContainer).not.toContainElement(github)
  expect(imageContainer).not.toContainElement(gitlab)
  expect(imageContainer).not.toContainElement(linkedin)
  expect(imageContainer).not.toContainElement(twitter)
  expect(linkContainer).toContainElement(github)
  expect(linkContainer).toContainElement(gitlab)
  expect(linkContainer).toContainElement(linkedin)
  expect(linkContainer).toContainElement(twitter)

  Object.defineProperty(window, 'matchMedia', { value: matchMedia })
})

test('should render correctly on medium to extra large screens', () => {
  const { matchMedia } = window

  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      addListener: jest.fn(),
      matches: true,
      media: query,
      onchange: null,
      removeListener: jest.fn(),
    }),
  })

  const { getByTestId } = renderWithContext(<Home />)
  const github = getByTestId('github')
  const gitlab = getByTestId('gitlab')
  const imageContainer = getByTestId('image-container')
  const linkContainer = getByTestId('link-container')
  const linkedin = getByTestId('linkedin')
  const twitter = getByTestId('twitter')

  expect(imageContainer).toContainElement(github)
  expect(imageContainer).toContainElement(gitlab)
  expect(imageContainer).toContainElement(linkedin)
  expect(imageContainer).toContainElement(twitter)
  expect(linkContainer).not.toContainElement(github)
  expect(linkContainer).not.toContainElement(gitlab)
  expect(linkContainer).not.toContainElement(linkedin)
  expect(linkContainer).not.toContainElement(twitter)

  Object.defineProperty(window, 'matchMedia', { value: matchMedia })
})

test("clicking the linkedin icon should navigate to andrew torres' linkedin profile", () => {
  const { getByTestId } = renderWithContext(<Home />)
  const icon = getByTestId('linkedin')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/andrew-torres-305a7913a'
  )
})

test("clicking the github icon should navigate to andrew torres' github profile", () => {
  const { getByTestId } = renderWithContext(<Home />)
  const icon = getByTestId('github')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://github.com/ajtorres9')
})

test("clicking the gitlab icon should navigate to andrew torres' gitlab profile", () => {
  const { getByTestId } = renderWithContext(<Home />)
  const icon = getByTestId('gitlab')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://gitlab.com/ajtorres9')
})

test("clicking the twitter icon should navigate to andrew torres' twitter profile", () => {
  const { getByTestId } = renderWithContext(<Home />)
  const icon = getByTestId('twitter')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://twitter.com/ajtorres333')
})
