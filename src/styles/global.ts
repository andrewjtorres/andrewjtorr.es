import { em, hsl, rem } from 'polished'
import { createGlobalStyle, css } from 'styled-components'

import { overflowTouch } from './mixins'

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${theme.colors.white};
    box-sizing: border-box;
    font-size: 16px;
    margin: 0;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
  }

  body {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary};
    font-size: ${em(16)};
    font-weight: ${theme.fontWeights.normal};
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  article,
  aside,
  figure,
  footer,
  header,
  hgroup,
  section {
    display: block;
  }

  a {
    color: ${theme.colors.link};
    cursor: pointer;
    text-decoration: none;

    strong & {
      color: currentColor;
    }

    &:hover {
      color: ${theme.linkHoverColor};
    }
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  blockquote,
  dd,
  dl,
  dt,
  figure,
  legend,
  li,
  ol,
  p {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  select,
  textarea {
    font-family: ${theme.fonts.primary};
    margin: 0;
  }

  code,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    font-family: ${theme.fonts.code};
  }

  code {
    background-color: ${theme.colors.codeContrast};
    color: ${theme.colors.code};
    font-size: ${em(14)};
    font-weight: 400;
    padding: ${em(4)} ${em(8)};
  }

  fieldset,
  iframe {
    border: none;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  hr {
    background-color: ${theme.colors.background};
    border: none;
    display: block;
    height: 2px;
    margin: ${rem(24)} 0;
    padding: 0;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  input[type='checkbox'],
  input[type='radio'] {
    vertical-align: baseline;
  }

  pre {
    ${overflowTouch}
    background-color: ${theme.colors.preContrast};
    color: ${theme.colors.pre};
    font-size: ${em(14)};
    margin: 0;
    overflow-x: auto;
    padding: ${rem(20)} ${rem(24)};
    white-space: pre;
    word-wrap: normal;

    code {
      background-color: transparent;
      color: currentColor;
      font-size: ${em(16)};
      padding: 0;
    }
  }

  small {
    font-size: ${em(14)};
  }

  span {
    font-style: inherit;
    font-weight: inherit;
  }

  strong {
    color: ${theme.colors.textStrong};
    font-weight: ${theme.fontWeights.bold};
  }

  td,
  th {
    padding: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;

    td,
    th {
      vertical-align: top;
    }

    th {
      color: ${theme.colors.textStrong};
    }
  }

  td:not([align]),
  th:not([align]) {
    text-align: left;
  }

  textarea {
    padding: 0;
    resize: vertical;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ::selection {
    background-color: ${theme.colors.textSelection};
    text-shadow: none;
  }

  @media print {
    *,
    *::before,
    *::after {
      background-color: transparent !important;
      box-shadow: none !important;
      color: ${hsl(0, 0, 0)} !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]::after {
      content: " (" attr(href) ")";
    }

    abbr[title]::after {
      content: " (" attr(title) ")";
    }

    a[href^="#"]::after,
    a[href^="javascript:"]::after {
      content: "";
    }

    h2,
    h3 {
      page-break-after: avoid;
    }

    h2,
    h3,
    p {
      orphans: 3;
      widows: 3;
    }

    pre,
    blockquote {
      border: 1px solid ${hsl(0, 0, 0.6)};
      page-break-inside: avoid;
    }

    pre {
      white-space: pre-wrap !important;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }
  }
`
)

export default GlobalStyle
