import { makeExecutableSchema } from 'graphql-tools'

import * as i18n from './i18n'

const typeDefs = `
  type Query {
    ${i18n.queries}
  }
`

export default makeExecutableSchema({
  logger: __IS_DEV__ ? { log: error => console.error(error) } : undefined,
  resolvers: [i18n.resolvers],
  typeDefs: [typeDefs, i18n.typeDefs],
})
