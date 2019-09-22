import 'babel-plugin-react-intl'
import { SourceLocation } from '@babel/types'

declare module 'babel-plugin-react-intl' {
  interface ExtractedMessageDescriptor
    extends MessageDescriptor,
      Partial<SourceLocation> {
    file?: string
  }

  interface MessageDescriptor {
    id: string
    defaultMessage?: string
    description?: string
  }

  export interface ReactIntlMetadata {
    messages: ExtractedMessageDescriptor[]
  }
}
