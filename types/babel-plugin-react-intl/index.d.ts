import 'babel-plugin-react-intl'

declare module 'babel-plugin-react-intl' {
  interface ReactIntlMetadata {
    messages: ExtractedMessageDescriptor[]
  }
}
