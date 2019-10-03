import gql from 'graphql-tag'

export interface Translation {
  id: string
  defaultMessage: string
  description: string
  files?: string[]
  message: string
}

export interface TranslationsQueryData {
  translations: Translation[]
}

export const translationsQuery = gql`
  query TranslationsQuery {
    translations {
      id
      defaultMessage
      description
      files
      message
    }
  }
`
