import { makeExecutableSchema } from 'graphql-tools'

import * as i18n from './i18n'

export default makeExecutableSchema({
  logger: __IS_DEV__ ? { log: error => console.error(error) } : undefined,
  resolvers: [i18n.resolvers],
  typeDefs: [i18n.typeDefs],
})
