import {
  gql,
  ApolloClient,
  ApolloClientOptions,
  ApolloLink,
} from '@apollo/client'
import {
  InMemoryCache,
  InMemoryCacheConfig as InMemoryCacheOptions,
  NormalizedCacheObject,
} from '@apollo/client/cache'
import { ErrorLink } from '@apollo/client/link/error'
import { DocumentNode } from 'graphql'

interface Options extends Partial<ApolloClientOptions<NormalizedCacheObject>> {
  defaults?: Record<string, any>
  links?: ApolloLink[]
  preloadedCache?: NormalizedCacheObject
  query?: DocumentNode
}

const storeQuery = gql`
  query StoreQuery {
    currentLocale
    locales
  }
`

export const createErrorLink = () =>
  new ErrorLink(({ graphQLErrors = [], networkError }) => {
    for (const { locations = [], message, path = [] } of graphQLErrors) {
      console.warn(
        `[GraphQL Error]: ${message}${
          locations.length > 0
            ? ` Location: ${locations
                .map(({ column, line }) => `${line}:${column}`)
                .join(' > ')}`
            : ''
        }${path.length > 0 ? ` Path: ${path.join(' > ')}` : ''}`
      )
    }

    if (networkError) {
      console.warn(`[Network Error]: ${networkError.message}`)
    }
  })

const createInMemoryCache = (options: InMemoryCacheOptions = {}) =>
  new InMemoryCache(options)

export const createApolloClient = ({
  cache: providedCache,
  defaults,
  links = [],
  preloadedCache,
  query = storeQuery,
  ...restOptions
}: Options = {}) => {
  let cache = providedCache ?? createInMemoryCache()

  if (preloadedCache) {
    cache = cache.restore(preloadedCache)
  }

  if (defaults) {
    cache.writeQuery({ data: defaults, query })
  }

  const client = new ApolloClient({
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from(links),
    ...restOptions,
  })

  if (defaults) {
    client.onResetStore(() =>
      Promise.resolve(cache.writeQuery({ data: defaults, query }))
    )
  }

  return client
}
