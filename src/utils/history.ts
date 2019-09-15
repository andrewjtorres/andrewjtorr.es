import { HistoryLocation } from '@reach/router'

export const createPath = (location: HistoryLocation) => {
  const { pathname, search, hash } = location
  let path = pathname || '/'

  if (search && search !== '?') {
    path += search.startsWith('?') ? search : `?${search}`
  }

  if (hash && hash !== '#') {
    path += hash.startsWith('#') ? hash : `#${hash}`
  }

  return path
}
