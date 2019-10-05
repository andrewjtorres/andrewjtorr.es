import gql from 'graphql-tag'

import {
  Queried,
  Translation,
  primitiveTranslationFieldsFragment,
} from 'common'

export type QueriedTranslation = Queried<Translation>

export interface TranslationsQueryData {
  translations: QueriedTranslation[]
}

export const translationsQuery = gql`
  query TranslationsQuery {
    translations {
      ...PrimitiveTranslationFields
    }
  }

  ${primitiveTranslationFieldsFragment}
`
