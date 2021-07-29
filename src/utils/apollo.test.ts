import {
  execute,
  gql,
  ApolloClient,
  ApolloLink,
  Observable,
} from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { ErrorLink } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'

import { createApolloClient, createErrorLink } from './apollo'

interface LocalesQueryData {
  locales: string[]
}

describe('createApolloClient', () => {
  const query = gql`
    query LocalesQuery {
      locales
    }
  `

  test('should create an apollo client object', () => {
    expect(createApolloClient()).toBeInstanceOf(ApolloClient)
  })

  test("should set the apollo client's cache to the provided cache", () => {
    const cache = new InMemoryCache()
    const client = createApolloClient({ cache })

    expect(client.cache).toStrictEqual(cache)
    expect(client.cache).not.toStrictEqual(new InMemoryCache())
  })

  test("should initialize the apollo client's cache to the provided preloaded cache", () => {
    const data = { locales: ['en'] }
    const cache = new InMemoryCache()

    cache.writeQuery<LocalesQueryData>({ data, query })

    const client = createApolloClient({ preloadedCache: cache.extract() })

    expect(client.readQuery<LocalesQueryData>({ query })).toMatchObject(data)
  })

  test("should write the provided defaults to the apollo client's cache", () => {
    const defaults = { locales: ['en'] }
    const client = createApolloClient({ defaults })

    expect(client.readQuery<LocalesQueryData>({ query })).toMatchObject(
      defaults
    )
  })

  test("should reinitialize the apollo client's cache to the provided defaults when the store is reset", async () => {
    const defaults = { locales: ['en'] }
    const client = createApolloClient({ defaults })

    client.writeQuery<LocalesQueryData>({ data: { locales: ['es'] }, query })

    expect(client.readQuery<LocalesQueryData>({ query })).toMatchObject({
      locales: ['es'],
    })

    await client.resetStore()

    expect(client.readQuery<LocalesQueryData>({ query })).toMatchObject(
      defaults
    )
  })
})

describe('createErrorLink', () => {
  const query = gql`
    query TranslationsQuery {
      translations {
        id
        defaultMessage
        description
        files
        message
      }
    }
  `

  test('should create an apollo error link object', () => {
    expect(createErrorLink()).toBeInstanceOf(ErrorLink)
  })

  test('should output the message of the graphql error to the web console', () =>
    new Promise<void>((resolve) => {
      const warn = jest.spyOn(console, 'warn').mockImplementation()
      const error = new GraphQLError("Locale 'es' not supported")

      const link = ApolloLink.from([
        createErrorLink(),
        new ApolloLink(() => Observable.of({ errors: [error] })),
      ])

      execute(link, { query }).subscribe(() => {
        expect(warn).toHaveBeenCalledTimes(1)
        expect(warn).toHaveBeenCalledWith(
          "[GraphQL Error]: Locale 'es' not supported"
        )

        warn.mockRestore()

        resolve()
      })
    }))

  test('should output the locations, message, and path of the graphql error to the web console', () =>
    new Promise<void>((resolve) => {
      const warn = jest.spyOn(console, 'warn').mockImplementation()

      const node = gql`
        type Query {
          translations: [Translation]!
        }

        type Translation {
          id: String!
          defaultMessage: String!
          description: String!
          files: [String]
          message: String!
        }
      `

      const error = new GraphQLError(
        "Locale 'es' not supported",
        node,
        undefined,
        undefined,
        ['translations']
      )

      const link = ApolloLink.from([
        createErrorLink(),
        new ApolloLink(() => Observable.of({ errors: [error] })),
      ])

      execute(link, { query }).subscribe(() => {
        expect(warn).toHaveBeenCalledTimes(1)
        expect(warn).toHaveBeenCalledWith(
          "[GraphQL Error]: Locale 'es' not supported Location: 1:1 Path: translations"
        )

        warn.mockRestore()

        resolve()
      })
    }))

  test('should output the message of the network error to the web console', () =>
    new Promise<void>((resolve) => {
      const warn = jest.spyOn(console, 'warn').mockImplementation()
      const error = new Error('Internal Server Error')

      Object.defineProperties(error, {
        name: { value: 'ServerError' },
        response: { value: { status: 500, ok: false } },
        result: { value: 'ServerError' },
        statusCode: { value: 500 },
      })

      const link = ApolloLink.from([
        createErrorLink(),
        new ApolloLink(
          () =>
            new Observable(() => {
              throw error
            })
        ),
      ])

      execute(link, { query }).subscribe({
        error: () => {
          expect(warn).toHaveBeenCalledTimes(1)
          expect(warn).toHaveBeenCalledWith(
            '[Network Error]: Internal Server Error'
          )

          warn.mockRestore()

          resolve()
        },
      })
    }))
})
