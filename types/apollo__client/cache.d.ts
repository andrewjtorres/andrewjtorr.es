import { NormalizedCacheObject } from '@apollo/client/cache'

declare global {
  interface Window {
    __APOLLO_CACHE__: NormalizedCacheObject
  }
}
