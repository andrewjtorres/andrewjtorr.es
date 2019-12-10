import { hsl, hsla, readableColor, rem } from 'polished'
import { DefaultTheme } from 'styled-components'

const contrastColor = (color: string) =>
  readableColor(color, hsla(0, 0, 0, 0.7), hsl(0, 0, 1))

const black = hsl(0, 0, 0.04)
const blackBis = hsl(0, 0, 0.07)
const blackTer = hsl(0, 0, 0.14)

const grayDarker = hsl(0, 0, 0.21)
const grayDark = hsl(0, 0, 0.29)
const gray = hsl(0, 0, 0.48)
const grayLight = hsl(0, 0, 0.71)
const grayLighter = hsl(0, 0, 0.86)
const grayLightest = hsl(0, 0, 0.93)

const whiteTer = hsl(0, 0, 0.96)
const whiteBis = hsl(0, 0, 0.98)
const white = hsl(0, 0, 1)

const orange = hsl(14, 1, 0.53)
const yellow = hsl(48, 1, 0.67)
const green = hsl(141, 0.53, 0.53)
const turquoise = hsl(171, 1, 0.41)
const cyan = hsl(204, 0.71, 0.53)
const blue = hsl(217, 0.71, 0.53)
const purple = hsl(271, 1, 0.71)
const red = hsl(348, 0.86, 0.61)

const blueContrast = contrastColor(blue)

const primary = turquoise

const info = cyan
const neutral = gray
const positive = green
const promote = purple
const critical = red

const background = whiteTer

const text = grayDark

const link = blue

const fontFamilySansSerif =
  '"Raleway", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
const fontFamilyMonospace = 'monospace'

const fontSize4 = rem(24)
const fontSize5 = rem(20)
const fontSize6 = rem(16)
const fontSize7 = rem(12)

const space3 = rem(16)

const gap = 32
const small = 769
const medium = 960 + 2 * gap
const large = 1152 + 2 * gap
const extraLarge = 1344 + 2 * gap

const radiusSmall = '2px'
const radiusMedium = '4px'
const radiusLarge = '6px'

const theme: DefaultTheme = {
  colors: {
    black,
    blackBis,
    blackTer,

    grayDarker,
    grayDark,
    gray,
    grayLight,
    grayLighter,
    grayLightest,

    whiteTer,
    whiteBis,
    white,

    orange,
    yellow,
    green,
    turquoise,
    cyan,
    blue,
    purple,
    red,

    orangeContrast: contrastColor(orange),
    yellowContrast: contrastColor(yellow),
    greenContrast: contrastColor(green),
    turquoiseContrast: contrastColor(turquoise),
    cyanContrast: contrastColor(cyan),
    blueContrast,
    purpleContrast: contrastColor(purple),
    redContrast: contrastColor(red),

    primary,

    primaryContrast: contrastColor(primary),

    info,
    neutral,
    positive,
    promote,
    critical,

    infoContrast: contrastColor(info),
    neutralContrast: contrastColor(neutral),
    positiveContrast: contrastColor(positive),
    promoteContrast: contrastColor(promote),
    criticalContrast: contrastColor(critical),

    schemeMain: white,
    schemeMainBis: whiteBis,
    schemeMainTer: whiteTer,

    schemeContrast: black,
    schemeContrastBis: blackBis,
    schemeContrastTer: blackTer,

    background,

    border: grayLighter,
    borderLight: grayLightest,

    text,
    textContrast: contrastColor(text),
    textLight: gray,
    textStrong: grayDarker,
    textSelection: hsl(213, 0.92, 0.85),

    code: red,
    codeContrast: background,

    pre: text,
    preContrast: background,

    link,
    linkContrast: contrastColor(link),
  },

  borderHoverColor: grayLight,
  borderLightHoverColor: grayLight,

  linkVisitedColor: purple,

  linkHoverColor: grayDarker,
  linkHoverBorderColor: grayLight,

  linkFocusColor: grayDarker,
  linkFocusBorderColor: link,

  linkActiveColor: grayDarker,
  linkActiveBorderColor: grayDark,

  fontFamilySansSerif,
  fontFamilyMonospace,
  textRendering: 'optimizeLegibility',

  fonts: {
    primary: fontFamilySansSerif,
    secondary: fontFamilySansSerif,
    code: fontFamilyMonospace,
  },

  fontSizes: {
    1: rem(48),
    2: rem(40),
    3: rem(32),
    4: fontSize4,
    5: fontSize5,
    6: fontSize6,
    7: fontSize7,
    small: fontSize7,
    normal: fontSize6,
    medium: fontSize5,
    large: fontSize4,
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },

  space: {
    0: rem(0),
    1: rem(4),
    2: rem(8),
    3: space3,
    4: rem(32),
    5: rem(64),
    6: rem(128),
    7: rem(256),
    8: rem(512),
    block: space3,
  },

  breakpoints: [`${small}px`, `${medium}px`, `${large}px`, `${extraLarge}px`],

  gap,
  small,
  medium,
  large,
  extraLarge,

  timingFunction: 'ease-out',

  radii: {
    small: radiusSmall,
    medium: radiusMedium,
    large: radiusLarge,
    round: '999999px',
  },

  duration: '86ms',
}

export default theme
