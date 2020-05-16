import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { act, screen } from '@testing-library/react'
import React from 'react'

import { resolvers } from 'store'
import { renderWithContext } from 'utils/spec'
import { InitializationQueryData, initializationQuery } from './graphql'
import { Root } from '.'

const data: InitializationQueryData = {
  currentLocale: 'en',
  translations: [
    {
      __typename: 'Translation',
      id: 'test.translation',
      message: 'Test message',
      defaultMessage: 'Test default message',
      description: 'Test description',
    },
  ],
}

const mocks: MockedResponse[] = [
  { request: { query: initializationQuery }, result: { data } },
]

test('should render correctly', () => {
  const { history } = renderWithContext(
    // @ts-expect-error TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root
        routes={[
          { element: <div data-testid="test-root" />, path: '/' },
          { element: <div data-testid="test-default" />, path: '*' },
        ]}
      />
    </MockedProvider>,
    { route: '/not-root' }
  )

  expect(screen.queryByTestId('test-root')).not.toBeInTheDocument()
  expect(screen.getByTestId('test-default')).toBeInTheDocument()

  act(() => {
    history.push('/')
  })

  expect(screen.getByTestId('test-root')).toBeInTheDocument()
  expect(screen.queryByTestId('test-default')).not.toBeInTheDocument()
})
