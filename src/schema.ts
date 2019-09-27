import fs from 'fs'
import { IResolvers, makeExecutableSchema } from 'graphql-tools'
import { join } from 'path'
import { promisify } from 'util'

import { locales, translationsDir } from './config'
import { Context } from './server'

interface Translation {
  id: string
  defaultMessage: string
  description: string
  files: string[]
  message: string
}

const readFile = (path: string) => promisify(fs.readFile)(path, 'utf-8')

const resolvers: IResolvers<undefined, Context> = {
  Query: {
    translations: async (_a, _b, { locale }) => {
      if (!locales.includes(locale)) {
        throw new Error(`Locale '${locale}' not supported`)
      }

      let data = '[]'

      try {
        data = await readFile(join(translationsDir, `${locale}.json`))
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new Error(`Locale '${locale}' not found`)
        }
      }

      return JSON.parse(data) as Translation[]
    },
  },
}

const typeDefs = `
  schema {
    query: Query
  }

  type Query {
    translations: [Translation]!
  }

  type Translation {
    id: String!
    defaultMessage: String!
    description: String!
    files: [String]!
    message: String!
  }
`

export default makeExecutableSchema({
  logger: __IS_DEV__ ? { log: error => console.error(error) } : undefined,
  resolvers,
  typeDefs,
})
