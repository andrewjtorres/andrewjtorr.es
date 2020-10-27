import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { gql } from '@apollo/client'

import { locales } from '../config'
import { Context, Resolvers } from 'common'

export const typeDefs = gql`
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
    translations: async (_source, _args, context) => {
      const { locale = 'en' } = context ?? {}

      if (!locales.includes(locale)) {
        throw new Error(`Locale '${locale}' not supported`)
      }

      let data = '[]'

      try {
        data = await readFile(
          path.join(process.env.TRANSLATIONS_DIR, `${locale}.json`)
        )
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new Error(`Locale '${locale}' not found`)
        }
      }

      return JSON.parse(data)
    },
  },
}
