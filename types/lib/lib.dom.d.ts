interface Window {
  __APOLLO_STATE__: Record<string, any>
  ga?: (command: string, type: string, page: string) => void
}
