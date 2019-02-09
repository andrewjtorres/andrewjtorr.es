import React from 'react'
import { render } from 'react-testing-library'
import Home from '.'

test('The Home component should render correctly', () => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    addListener: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeListener: jest.fn(),
  }))

  const { getByTestId } = render(<Home />)
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
})

test('The Home component should render correctly on medium to extra large screens', () => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    addListener: jest.fn(),
    matches: true,
    media: query,
    onchange: null,
    removeListener: jest.fn(),
  }))

  const { getByTestId } = render(<Home />)
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
})

test("Clicking the LinkedIn icon should navigate to Andrew Torres' LinkedIn profile", () => {
  const { getByTestId } = render(<Home />)
  const icon = getByTestId('linkedin')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/andrew-torres-305a7913a'
  )
})

test("Clicking the GitHub icon should navigate to Andrew Torres' GitHub profile", () => {
  const { getByTestId } = render(<Home />)
  const icon = getByTestId('github')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://github.com/ajtorres9')
})

test("Clicking the GitLab icon should navigate to Andrew Torres' GitLab profile", () => {
  const { getByTestId } = render(<Home />)
  const icon = getByTestId('gitlab')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://gitlab.com/ajtorres9')
})

test("Clicking the Twitter icon should navigate to Andrew Torres' Twitter profile", () => {
  const { getByTestId } = render(<Home />)
  const icon = getByTestId('twitter')

  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('href', 'https://twitter.com/ajtorres333')
})
