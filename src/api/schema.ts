import { makeExecutableSchema } from 'graphql-tools'

import * as i18n from './i18n'

const typeDefs = `
  schema {
    query: Query
  }

  type Query {
    ${i18n.queryTypeDefs}
  }
`

export default makeExecutableSchema({
  logger: __IS_DEV__ ? { log: error => console.error(error) } : undefined,
  resolvers: [i18n.resolvers],
  typeDefs: [typeDefs, i18n.typeDefs],
})
