import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { waitForElement } from '@testing-library/react'
import React from 'react'

import { resolvers } from 'store'
import { renderWithContext } from 'utils/spec'
import { QueriedTranslation, initializationQuery } from './graphql'
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
  {
    request: { query: initializationQuery },
    result: { data: { currentLocale: 'en', translations } },
  },
]

test('should render correctly', async () => {
  const { getByTestId } = renderWithContext(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root />
    </MockedProvider>
  )
  const homeElement = await waitForElement(() => getByTestId('home'))

  expect(homeElement).toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  const { getByTestId } = renderWithContext(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root />
    </MockedProvider>,
    { initialPath: '/not-found' }
  )
  const notFoundElement = await waitForElement(() => getByTestId('not-found'))

  expect(notFoundElement).toBeInTheDocument()
})
