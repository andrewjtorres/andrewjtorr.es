import { LocalContext, Resolvers } from 'common'

export interface Defaults {
  currentLocale: string
  locales: string[]
}

export const typeDefs = ``

export const defaults: Defaults = { currentLocale: 'en', locales: [] }

export const resolvers: Resolvers<undefined, LocalContext> = {}
