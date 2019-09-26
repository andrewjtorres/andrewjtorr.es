import { hsl, hsla, readableColor, rem } from 'polished'
import { DefaultTheme } from 'styled-components' // eslint-disable-line import/named

const contrastColor = (color: string) =>
  readableColor(color, hsla(0, 0, 0, 0.7), hsl(0, 0, 1))

const grayDarker = hsl(0, 0, 0.21)
const grayDark = hsl(0, 0, 0.29)
const gray = hsl(0, 0, 0.48)
const grayLight = hsl(0, 0, 0.71)
const grayLighter = hsl(0, 0, 0.86)
const grayLightest = hsl(0, 0, 0.93)

const whiteTer = hsl(0, 0, 0.96)

const light = whiteTer
const dark = grayDarker

const orange = hsl(14, 1, 0.53)
const yellow = hsl(48, 1, 0.67)
const green = hsl(141, 0.71, 0.48)
const turquoise = hsl(171, 1, 0.41)
const cyan = hsl(204, 0.86, 0.53)
const blue = hsl(217, 0.71, 0.53)
const purple = hsl(271, 1, 0.71)
const red = hsl(348, 1, 0.61)

const blueContrast = contrastColor(blue)

const primary = turquoise
const info = cyan
const success = green
const warning = yellow
const danger = red

const backgroundColor = whiteTer

const textColor = grayDark

const fontFamilySansSerif =
  '"Raleway", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
const fontFamilyMonospace = 'monospace'

const fontSize4 = rem(24)
const fontSize5 = rem(20)
const fontSize6 = rem(16)
const fontSize7 = rem(12)

const gap = 32

const theme: DefaultTheme = {
  black: hsl(0, 0, 0.04),
  blackBis: hsl(0, 0, 0.07),
  blackTer: hsl(0, 0, 0.14),

  grayDarker,
  grayDark,
  gray,
  grayLight,
  grayLighter,
  grayLightest,

  whiteTer,
  whiteBis: hsl(0, 0, 0.98),
  white: hsl(0, 0, 1),

  light,
  dark,

  lightContrast: dark,
  darkContrast: light,

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
  info,
  success,
  warning,
  danger,

  primaryContrast: contrastColor(primary),
  infoContrast: contrastColor(info),
  successContrast: contrastColor(success),
  warningContrast: contrastColor(warning),
  dangerContrast: contrastColor(danger),

  backgroundColor,

  borderColor: grayLighter,
  borderHoverColor: grayLight,
  borderLightColor: grayLightest,
  borderLightHoverColor: grayLight,

  textColor,
  textColorContrast: contrastColor(textColor),
  textLightColor: gray,
  textStrongColor: grayDarker,
  textSelectionBackgroundColor: hsl(213, 0.92, 0.85),

  codeColor: red,
  codeBackgroundColor: backgroundColor,

  preColor: textColor,
  preBackgroundColor: backgroundColor,

  linkColor: blue,
  linkColorContrast: blueContrast,
  linkVisitedColor: purple,

  linkHoverColor: grayDarker,
  linkHoverBorderColor: grayLight,

  linkFocusColor: grayDarker,
  linkFocusBorderColor: blue,

  linkActiveColor: grayDarker,
  linkActiveBorderColor: grayDark,

  fontFamilySansSerif,
  fontFamilyMonospace,
  textRendering: 'optimizeLegibility',

  fontFamilyPrimary: fontFamilySansSerif,
  fontFamilySecondary: fontFamilySansSerif,
  fontFamilyCode: fontFamilyMonospace,

  fontSize1: rem(48),
  fontSize2: rem(40),
  fontSize3: rem(32),
  fontSize4,
  fontSize5,
  fontSize6,
  fontSize7,

  fontSizeSmall: fontSize7,
  fontSizeNormal: fontSize6,
  fontSizeMedium: fontSize5,
  fontSizeLarge: fontSize4,

  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  blockSpacing: rem(24),

  gap,
  small: 769,
  medium: 960 + 2 * gap,
  large: 1152 + 2 * gap,
  extraLarge: 1344 + 2 * gap,

  timingFunction: 'ease-out',
  borderRadiusSmall: '2px',
  borderRadius: '4px',
  borderRadiusLarge: '6px',
  borderRadiusRounded: '999999px',
  duration: '86ms',
}

export default theme
