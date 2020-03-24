import 'express'

declare module 'express' {
  interface Express {
    hot?: __WebpackModuleApi.Hot
  }
}
