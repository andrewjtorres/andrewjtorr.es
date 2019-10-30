import { ExtractedMessageDescriptor } from 'babel-plugin-react-intl'

declare module 'babel-plugin-react-intl' {
  export interface ReactIntlMetadata {
    messages: ExtractedMessageDescriptor[]
  }
}
