import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ErrorLink } from 'apollo-link-error'
import { Response } from 'express'
import { GraphQLResolveInfo } from 'graphql'

type FieldResolver<S = any, C = any, A = Record<string, any>> = (
  source: S,
  args: A,
  context: C,
  info: GraphQLResolveInfo
) => any

export type Resolvers<S = any, C = any> = Record<
  string,
  Record<string, FieldResolver<S, C>>
>

export interface Context {
  locale: string
  res: Response
}

interface Options extends Partial<ApolloClientOptions<NormalizedCacheObject>> {
  defaults?: Record<string, any>
  links: ApolloLink[]
  preloadedCache?: NormalizedCacheObject
}

export const createErrorLink = () =>
  new ErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ locations, message, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) {
      console.warn(`[Network error]: ${networkError}`)
    }
  })

const createInMemoryCache = (options: InMemoryCacheOptions = {}) =>
  new InMemoryCache({
    dataIdFromObject: value => {
      switch (value.__typename) {
        default:
          return defaultDataIdFromObject(value)
      }
    },
    freezeResults: true,
    ...options,
  })

export const createApolloClient = ({
  cache: providedCache,
  defaults,
  links,
  preloadedCache,
  ...options
}: Options) => {
  let cache = providedCache || createInMemoryCache()

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  if (defaults) {
    cache.writeData({ data: defaults })
  }

  const client = new ApolloClient({
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from(links),
    ssrForceFetchDelay: process.env.BROWSER_ENV ? 100 : undefined,
    ssrMode: !process.env.BROWSER_ENV,
    ...options,
  })

  if (defaults) {
    client.onResetStore(() =>
      Promise.resolve(cache.writeData({ data: defaults }))
    )
  }

  return client
}
