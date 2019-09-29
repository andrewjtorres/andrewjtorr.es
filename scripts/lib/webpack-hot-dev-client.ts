import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint'
import {
  dismissBuildError,
  reportBuildError,
  setEditorHandler,
  startReportingRuntimeErrors,
  stopReportingRuntimeErrors,
} from 'react-error-overlay'
import client from 'webpack-hot-middleware/client'

setEditorHandler(({ fileName, lineNumber }) => {
  fetch(
    `${launchEditorEndpoint}?fileName=${encodeURIComponent(
      fileName
    )}&lineNumber=${encodeURIComponent(lineNumber || 1)}`
  )
})

client.setOptionsAndConnect({ name: 'client', reload: true })
client.useCustomOverlay({
  clear: () => dismissBuildError(),
  showProblems: (_type, errors) => {
    const messages = formatWebpackMessages({
      _showErrors: true,
      _showWarnings: true,
      errors,
      warnings: [],
    })

    return reportBuildError(messages.errors[0])
  },
})

startReportingRuntimeErrors({ filename: '/assets/client.js' })

if (module.hot) {
  module.hot.dispose(stopReportingRuntimeErrors)
}
