import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { act, screen } from '@testing-library/react'
import { FormattedMessage } from 'react-intl'

import { resolvers } from 'store'
import { renderWithContext } from 'utils/spec'
import { InitializationQueryData, initializationQuery } from './graphql'
import { Root } from '.'

const data: InitializationQueryData = {
  currentLocale: 'en',
  translations: [
    {
      __typename: 'Translation',
      id: 'root',
      message: 'Root message',
      defaultMessage: 'Root default message',
      description: 'Root description',
    },
    {
      __typename: 'Translation',
      id: 'default',
      message: 'Default message',
      defaultMessage: 'Default default message',
      description: 'Default description',
    },
  ],
}

const mocks: MockedResponse[] = [
  { request: { query: initializationQuery }, result: { data } },
]

test('should render correctly', async () => {
  const { history } = renderWithContext(
    // @ts-expect-error TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root
        routes={[
          {
            element: <FormattedMessage {...data.translations[0]} />,
            path: '/',
          },
          {
            element: <FormattedMessage {...data.translations[1]} />,
            path: '*',
          },
        ]}
      />
    </MockedProvider>,
    { route: '/not-root' }
  )

  expect(screen.queryByText('Root message')).not.toBeInTheDocument()
  expect(await screen.findByText('Default message')).toBeInTheDocument()

  act(() => {
    history.push('/')
  })

  expect(await screen.findByText('Root message')).toBeInTheDocument()
  expect(screen.queryByText('Default message')).not.toBeInTheDocument()
})
