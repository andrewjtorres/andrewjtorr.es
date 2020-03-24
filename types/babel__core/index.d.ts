import '@babel/core'
import { ReactIntlMetadata } from 'babel-plugin-react-intl'

declare module '@babel/core' {
  interface BabelFileMetadata {
    'react-intl'?: ReactIntlMetadata
  }
}
