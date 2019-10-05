import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { waitForElement } from '@testing-library/react'
import React from 'react'

import { renderWithContext } from 'utils/spec'
import { QueriedTranslation, translationsQuery } from './graphql'
import Root from '.'

const translations: QueriedTranslation[] = [
  {
    __typename: 'Translation',
    id: 'path.to.file.a',
    message: 'message a',
    defaultMessage: 'default message a',
    description: 'description a',
  },
]

const mocks: MockedResponse[] = [
  { request: { query: translationsQuery }, result: { data: { translations } } },
]

test('should render correctly', async () => {
  const { getByTestId } = renderWithContext(
    <MockedProvider mocks={mocks}>
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  const { getByTestId } = renderWithContext(
    <MockedProvider mocks={mocks}>
      <Root />
    </MockedProvider>,
    { initialPath: '/not-found' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})
