import { ApolloClient, ApolloClientOptions } from 'apollo-client'
import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { ErrorLink } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { SchemaLink } from 'apollo-link-schema'

interface Options
  extends Partial<ApolloClientOptions<NormalizedCacheObject>>,
    Partial<SchemaLink.Options> {
  defaults?: {}
  preloadedCache?: NormalizedCacheObject
}

const createErrorLink = () =>
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

const createSchemaLink = (options: SchemaLink.Options) =>
  new SchemaLink(options)

export const createApolloClient = ({
  context,
  defaults,
  preloadedCache,
  rootValue,
  schema,
  ...options
}: Options = {}) => {
  const links: ApolloLink[] = [createErrorLink()]
  let cache = createInMemoryCache()

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  if (defaults) {
    cache.writeData({ data: defaults })
  }

  if (process.env.BROWSER_ENV) {
    links.push(
      ...(__IS_DEV__ ? [require('apollo-link-logger').default] : []),
      createHttpLink({ credentials: 'include', uri: process.env.API_URI })
    )
  } else if (schema) {
    links.push(createSchemaLink({ context, rootValue, schema }))
  }

  return new ApolloClient({
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from(links),
    ssrForceFetchDelay: process.env.BROWSER_ENV ? 100 : undefined,
    ssrMode: !process.env.BROWSER_ENV,
    ...options,
  })
}
