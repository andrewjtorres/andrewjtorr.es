import gql from 'graphql-tag'

import {
  Queried,
  Translation,
  primitiveTranslationFieldsFragment,
} from 'common'

export type QueriedTranslation = Queried<Translation>

export interface InitializationQueryData {
  currentLocale: string
  translations: QueriedTranslation[]
}

export const initializationQuery = gql`
  query InitializationQuery {
    currentLocale @client
    translations {
      ...PrimitiveTranslationFields
    }
  }

  ${primitiveTranslationFieldsFragment}
`
