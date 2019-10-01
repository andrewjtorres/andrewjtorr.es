import fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { Context, Resolvers } from 'utils/apollo'
import { locales, translationsDir } from '../config'

export interface Translation {
  id: string
  defaultMessage: string
  description: string
  files?: string[]
  message: string
}

export const typeDefs = `
  type Query {
    translations: [Translation]!
  }

  type Translation {
    id: String!
    defaultMessage: String!
    description: String!
    files: [String]
    message: String!
  }
`

const readFile = (path: string) => promisify(fs.readFile)(path, 'utf-8')

export const resolvers: Resolvers<undefined, Context> = {
  Query: {
    translations: async (_source, _args, { locale }) => {
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

      return JSON.parse(data)
    },
  },
}
