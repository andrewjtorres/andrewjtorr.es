import { IResolvers, makeExecutableSchema } from 'graphql-tools'

import { Context } from './server'

const resolvers: IResolvers<undefined, Context> = { Query: {} }

const typeDefs = `
  schema {
    query: Query
  }

  type Query {
    removeMe: String
  }
`

export default makeExecutableSchema({
  logger: __IS_DEV__ ? { log: error => console.error(error) } : undefined,
  resolvers,
  typeDefs,
})
