import 'express'

declare module 'express' {
  export interface Express {
    hot?: __WebpackModuleApi.Hot
  }
}
