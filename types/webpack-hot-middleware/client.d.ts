declare module 'webpack-hot-middleware/client' {
  interface AnsiColors {
    black?: string
    blue?: string
    cyan?: string
    darkgrey?: string
    green?: string
    lightgrey?: string
    magenta?: string
    red?: string
    reset?: string[]
    yellow?: string
  }

  interface CustomOverlay {
    clear: () => void
    showProblems: (type: string, lines: string[]) => void
  }

  interface Config {
    ansiColors?: AnsiColors
    autoConnect?: boolean
    dynamicPublicPath?: boolean
    name?: string
    noInfo?: boolean
    overlay?: boolean
    overlayStyles?: { [key: string]: string }
    overlayWarnings?: boolean
    path?: string
    quiet?: boolean
    reload?: boolean
    timeout?: number
  }

  function useCustomOverlay(customOverlay: CustomOverlay): void

  function setOptionsAndConnect(overrides: Config): void
}
