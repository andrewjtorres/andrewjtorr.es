import { makeExecutableSchema } from '@graphql-tools/schema'

import * as translation from './translation'

export default makeExecutableSchema({
  resolvers: [translation.resolvers],
  typeDefs: [translation.typeDefs],
})
