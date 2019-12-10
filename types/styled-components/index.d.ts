import 'styled-components'

declare module 'styled-components' {
  type Font = 'primary' | 'secondary' | 'code'

  type Fonts = Record<Font, string>

  type FontSize =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'

  type FontSizes = Record<FontSize, string>

  type FontWeight = 'light' | 'normal' | 'medium' | 'semiBold' | 'bold'

  type FontWeights = Record<FontWeight, number>

  type Radius = 'small' | 'medium' | 'large' | 'round'

  type Radii = Record<Radius, string>

  type Shade =
    | 'blackBis'
    | 'blackTer'
    | 'grayDarker'
    | 'grayDark'
    | 'gray'
    | 'grayLight'
    | 'grayLighter'
    | 'grayLightest'
    | 'whiteTer'
    | 'whiteBis'

  type Shades = Record<Shade, string>

  type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'block'

  type Spaces = Record<Space, string>

  type Tone = 'info' | 'neutral' | 'positive' | 'promote' | 'critical'

  type Tones = Record<Tone, string>

  type ToneContrast =
    | 'infoContrast'
    | 'neutralContrast'
    | 'positiveContrast'
    | 'promoteContrast'
    | 'criticalContrast'

  type ToneContrasts = Record<ToneContrast, string>

  export type ViewportBreakpoint = 'small' | 'medium' | 'large' | 'extraLarge'

  type ViewportBreakpoints = Record<ViewportBreakpoint, number>

  interface Colors extends Shades, Tones, ToneContrasts {
    black: string
    white: string

    orange: string
    yellow: string
    green: string
    turquoise: string
    cyan: string
    blue: string
    purple: string
    red: string

    orangeContrast: string
    yellowContrast: string
    greenContrast: string
    turquoiseContrast: string
    cyanContrast: string
    blueContrast: string
    purpleContrast: string
    redContrast: string

    primary: string

    primaryContrast: string

    schemeMain: string
    schemeMainBis: string
    schemeMainTer: string

    schemeContrast: string
    schemeContrastBis: string
    schemeContrastTer: string

    background: string

    border: string
    borderLight: string

    text: string
    textContrast: string
    textLight: string
    textStrong: string
    textSelection: string

    code: string
    codeContrast: string

    pre: string
    preContrast: string

    link: string
    linkContrast: string
  }

  export interface DefaultTheme extends ViewportBreakpoints {
    colors: Colors

    borderHoverColor: string
    borderLightHoverColor: string

    linkVisitedColor: string

    linkHoverColor: string
    linkHoverBorderColor: string

    linkFocusColor: string
    linkFocusBorderColor: string

    linkActiveColor: string
    linkActiveBorderColor: string

    fontFamilySansSerif: string
    fontFamilyMonospace: string
    textRendering: string

    fonts: Fonts

    fontSizes: FontSizes

    fontWeights: FontWeights

    space: Spaces

    breakpoints: string[]

    gap: number

    timingFunction: string

    radii: Radii

    duration: string
  }
}
