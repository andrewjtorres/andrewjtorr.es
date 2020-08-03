import { gql } from '@apollo/client'

export interface Translation {
  id: string
  defaultMessage: string
  description: string
  files?: string[]
  message: string
}

export const primitiveTranslationFieldsFragment = gql`
  fragment PrimitiveTranslationFields on Translation {
    id
    defaultMessage
    description
    message
  }
`
