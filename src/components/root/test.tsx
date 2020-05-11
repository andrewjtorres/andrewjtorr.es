import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { RouteComponentProps } from '@reach/router'
import { act, screen } from '@testing-library/react'
import React from 'react'

import { resolvers } from 'store'
import { renderWithContext } from 'utils/spec'
import { InitializationQueryData, initializationQuery } from './graphql'
import { Root } from '.'

interface MockRouteProps extends RouteComponentProps {
  'data-testid'?: string
}

const data: InitializationQueryData = {
  currentLocale: 'en',
  translations: [
    {
      __typename: 'Translation',
      id: 'path.to.file.a',
      message: 'message a',
      defaultMessage: 'default message a',
      description: 'description a',
    },
  ],
}

const mocks: MockedResponse[] = [
  { request: { query: initializationQuery }, result: { data } },
]

const MockRoute: React.FunctionComponent<MockRouteProps> = ({
  'data-testid': dataTestid,
}: MockRouteProps) => <div data-testid={dataTestid} />

jest.mock('routes/home', () => ({ __esModule: true, default: MockRoute }))
jest.mock('routes/not-found', () => ({ __esModule: true, default: MockRoute }))

test('should render correctly', async () => {
  const { history } = renderWithContext(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root />
    </MockedProvider>
  )

  expect(screen.queryByTestId('home')).not.toBeInTheDocument()

  await act(async () => {
    await history.navigate('/')
  })

  expect(await screen.findByTestId('home')).toBeInTheDocument()
})

test('should render the default route correctly', async () => {
  const { history } = renderWithContext(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore TS2322
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <Root />
    </MockedProvider>
  )

  expect(screen.queryByTestId('not-found')).not.toBeInTheDocument()

  await act(async () => {
    await history.navigate('/not-found')
  })

  expect(await screen.findByTestId('not-found')).toBeInTheDocument()
})
