import '@babel/core'
import { ExtractionResult } from 'babel-plugin-formatjs'

declare module '@babel/core' {
  interface BabelFileMetadata {
    formatjs?: ExtractionResult
  }
}
