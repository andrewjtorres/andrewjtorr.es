import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import { createApolloClient } from './apollo'

interface LocalesQueryData {
  locales: string[]
}

describe('createApolloClient', () => {
  const query = gql`
    query LocalesQuery {
      locales
    }
  `

  test("should set the client's cache to the provided cache", () => {
    const cache = new InMemoryCache()
    const client = createApolloClient({ cache })

    expect(client.cache).toStrictEqual(cache)
    expect(client.cache).not.toStrictEqual(new InMemoryCache())
  })

  test("should initialize the client's cache to the provided preloaded cache", () => {
    const data = { locales: ['en'] }
    const cache = new InMemoryCache()

    cache.writeQuery<LocalesQueryData>({ data, query })

    const client = createApolloClient({ preloadedCache: cache.extract() })

    expect(client.readQuery<LocalesQueryData>({ query })).toMatchObject(data)
  })

  test("should write the provided defaults to the client's cache", () => {
    const defaults = { locales: ['en'] }
    const client = createApolloClient({ defaults })

    expect(client.readQuery<LocalesQueryData>({ query })).toMatchObject(
      defaults
    )
  })

  test("should reinitialize the client's cache to the provided defaults when the store is reset", async () => {
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
