import { withA11y } from '@storybook/addon-a11y'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore TS7016
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks'
import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator, addParameters } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(story => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
))

addParameters({
  docs: { container: DocsContainer, page: DocsPage },
  options: {
    showRoots: true,
    storySort: ({ 1: a }: any, { 1: b }: any) =>
      a.kind === b.kind ? 0 : a.id.localeCompare(b.id, 'en', { numeric: true }),
  },
})
