import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import ApolloClient, { ApolloClientOptions } from 'apollo-client'
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
  links?: ApolloLink[]
  preloadedCache?: NormalizedCacheObject
}

export const createErrorLink = () =>
  new ErrorLink(({ graphQLErrors = [], networkError }) => {
    graphQLErrors.forEach(({ locations = [], message, path = [] }) =>
      console.warn(
        `[GraphQL Error]: ${message}${
          locations.length > 0
            ? ` Location: ${locations
                .map(({ column, line }) => `${line}:${column}`)
                .join(', ')}`
            : ''
        }${path.length > 0 ? ` Path: ${path.join(', ')}` : ''}`
      )
    )

    if (networkError) {
      console.warn(`[Network Error]: ${networkError.message}`)
    }
  })

export const createInMemoryCache = (options: InMemoryCacheOptions = {}) =>
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
  links = [],
  preloadedCache,
  ...options
}: Options = {}) => {
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
    ...options,
  })

  if (defaults) {
    client.onResetStore(() =>
      Promise.resolve(cache.writeData({ data: defaults }))
    )
  }

  return client
}
