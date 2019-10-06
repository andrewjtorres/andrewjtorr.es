import * as locale from './locale'

export type Defaults = locale.Defaults

export const defaults: Defaults = { ...locale.defaults }

export const resolvers = [locale.resolvers]

export const typeDefs = [locale.typeDefs]
