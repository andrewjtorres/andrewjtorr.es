import fs from 'fs'
import { IResolvers } from 'graphql-tools'
import { join } from 'path'
import { promisify } from 'util'

import { locales, translationsDir } from '../config'
import { Context } from '../server'

interface Translation {
  id: string
  defaultMessage: string
  description: string
  files?: string[]
  message: string
}

const readFile = (path: string) => promisify(fs.readFile)(path, 'utf-8')

export const queries = `
  translations: [Translation]!
`

export const resolvers: IResolvers<undefined, Context> = {
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

export const typeDefs = `
  type Translation {
    id: String!
    defaultMessage: String!
    description: String!
    files: [String]
    message: String!
  }
`
