import { createGlobalStyle } from 'styled-components'
import { darken, em, normalize, rem } from 'polished'
import {
  aBlue,
  black,
  codeRed,
  darkGray,
  preGray,
  selectionBlue,
  white,
} from './variables'

const GlobalStyle = createGlobalStyle`
  ${normalize()};

  @import url('https://fonts.googleapis.com/css?family=Raleway:400,600,700');

  @media print {
    *,
    *::before,
    *::after {
      background-color: transparent !important;
      box-shadow: none !important;
      color: ${black} !important;
      text-shadow: none !important;
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
    h3,
    p {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }

    pre {
      white-space: pre-wrap !important;
    }

    pre,
    blockquote {
      border: ${rem(1)} solid ${preGray};
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${white};
    box-sizing: border-box;
    font-size: 16px;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
  }

  body {
    color: ${darkGray};
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    line-height: 1.4;
  }

  a {
    color: ${aBlue};
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: ${darken(0.08, darkGray)};
    }
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

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  audio,
  img,
  video {
    height: auto;
    max-width: 100%;
  }

  code,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    font-family: monospace;
  }

  code {
    background-color: ${darken(0.04, white)};
    color: ${codeRed};
    font-size: ${em(14)};
    font-weight: 400;
    padding: ${em(4)} ${em(8)};

    pre & {
      background-color: transparent;
      color: currentColor;
      font-size: ${em(16)};
      padding: 0;
    }
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  hr {
    background-color: ${darken(0.04, white)};
    border: 0;
    display: block;
    height: ${rem(2)};
    margin: ${rem(24)} 0;
  }

  iframe {
    border: 0;
  }

  input[type='checkbox'],
  input[type='radio'] {
    vertical-align: baseline;
  }

  pre {
    -webkit-overflow-scrolling: touch;
    background-color: ${darken(0.04, white)};
    color: ${darkGray};
    font-size: ${em(14)};
    overflow-x: auto;
    padding: ${rem(20)} ${rem(24)};
    white-space: pre;
    word-wrap: normal;
  }

  small {
    font-size: ${em(14)};
  }

  span {
    font-style: inherit;
    font-weight: inherit;
  }

  strong {
    color: ${darken(0.08, darkGray)};
    font-weight: 700;

    a & {
      color: currentColor;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td {
    padding: 0;
    text-align: left;

    table & {
      text-align: left;
      vertical-align: top;
    }
  }

  th {
    padding: 0;
    text-align: left;

    table & {
      color: ${darken(0.08, darkGray)};
      text-align: left;
      vertical-align: top;
    }
  }

  textarea {
    resize: vertical;
  }

  ul {
    list-style: none;
  }

  ::selection {
    background-color: ${selectionBlue};
    text-shadow: none;
  }
`

export default GlobalStyle
