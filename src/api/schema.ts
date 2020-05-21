import { makeExecutableSchema } from '@graphql-tools/schema'

import * as translation from './translation'

export default makeExecutableSchema({
  logger: __IS_DEV__ ? { log: (error) => console.error(error) } : undefined,
  resolvers: [translation.resolvers],
  typeDefs: [translation.typeDefs],
})
