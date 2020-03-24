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

  function dismissBuildError(): void

  function reportBuildError(error: string): void

  function setEditorHandler(handler: EditorHandler | null): void

  function startReportingRuntimeErrors(options: RuntimeReportingOptions): void

  function stopReportingRuntimeErrors(): void
}
