declare module 'react-error-overlay' {
  type EditorHandler = (errorLoc: ErrorLocation) => void

  interface ErrorLocation {
    colNumber?: number
    fileName: string
    lineNumber: number
  }

  interface RuntimeReportingOptions {
    filename?: string
    onError?: () => void
  }

  export function dismissBuildError(): void

  export function reportBuildError(error: string): void

  export function setEditorHandler(handler: EditorHandler | null): void

  export function startReportingRuntimeErrors(
    options: RuntimeReportingOptions
  ): void

  export function stopReportingRuntimeErrors(): void
}
