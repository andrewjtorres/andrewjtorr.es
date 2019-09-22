import '@babel/core'
import { ReactIntlMetadata } from 'babel-plugin-react-intl'

declare module '@babel/core' {
  export interface BabelFileMetadata {
    'react-intl'?: ReactIntlMetadata
  }
}
