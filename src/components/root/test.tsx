import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { screen, waitForElement } from '@testing-library/react'
import React from 'react'

import { resolvers } from 'store'
import { renderWithContext } from 'utils/spec'
import { QueriedTranslation, initializationQuery } from './graphql'
import Root from '.'

const queriedTranslations: QueriedTranslation[] = [
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
    result: {
      data: { currentLocale: 'en', translations: queriedTranslations },
    },
  },
]

test('should render correctly', async () => {
  renderWithContext(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root />
    </MockedProvider>
  )

  expect(
    await waitForElement(() => screen.getByTestId('home'))
  ).toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  renderWithContext(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root />
    </MockedProvider>,
    { initialPath: '/not-found' }
  )

  expect(
    await waitForElement(() => screen.getByTestId('not-found'))
  ).toBeInTheDocument()
})
