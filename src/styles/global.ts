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
      box-sizing: border-box;
      min-width: 300px;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      font-size: 16px;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      background-color: ${theme.colors.white};

      text-rendering: optimizeLegibility;
      text-size-adjust: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      color: ${theme.colors.text};
      font-weight: ${theme.fontWeights.normal};
      font-size: ${em(16)};
      font-family: ${theme.fonts.primary};
      line-height: 1.5;
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
      text-decoration: none;
      cursor: pointer;

      strong & {
        color: currentColor;
      }

      &:hover,
      &:focus {
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
      margin: 0;
      font-family: ${theme.fonts.primary};
    }

    code,
    pre {
      font-family: ${theme.fonts.code};
      -moz-osx-font-smoothing: auto;
      -webkit-font-smoothing: auto;
    }

    code {
      padding: ${em(4)} ${em(8)};
      color: ${theme.colors.code};
      font-weight: 400;
      font-size: ${em(14)};
      background-color: ${theme.colors.codeContrast};
    }

    fieldset,
    iframe {
      margin: 0;
      padding: 0;
      border: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
      font-weight: 400;
      font-size: 100%;
    }

    hr {
      display: block;
      height: 2px;
      margin: ${rem(24)} 0;
      padding: 0;
      background-color: ${theme.colors.background};
      border: none;
    }

    img,
    video {
      max-width: 100%;
      height: auto;
    }

    input[type='checkbox'],
    input[type='radio'] {
      vertical-align: baseline;
    }

    pre {
      ${overflowTouch};
      margin: 0;
      padding: ${rem(20)} ${rem(24)};
      overflow-x: auto;
      color: ${theme.colors.pre};
      font-size: ${em(14)};
      white-space: pre;
      word-wrap: normal;
      background-color: ${theme.colors.preContrast};

      code {
        padding: 0;
        color: currentColor;
        font-size: ${em(16)};
        background-color: transparent;
      }
    }

    small {
      font-size: ${em(14)};
    }

    span {
      font-weight: inherit;
      font-style: inherit;
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
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ::selection {
      text-shadow: none;
      background-color: ${theme.colors.textSelection};
    }

    @media print {
      *,
      *::before,
      *::after {
        color: ${hsl(0, 0, 0)} !important;
        text-shadow: none !important;
        background-color: transparent !important;
        box-shadow: none !important;
      }

      a,
      a:visited {
        text-decoration: underline;
      }

      a[href]::after {
        content: ' (' attr(href) ')';
      }

      abbr[title]::after {
        content: ' (' attr(title) ')';
      }

      a[href^='#']::after,
      a[href^='javascript:']::after {
        content: '';
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
        page-break-inside: avoid;
        border: 1px solid ${hsl(0, 0, 0.6)};
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
