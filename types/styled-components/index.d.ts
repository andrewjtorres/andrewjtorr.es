import 'styled-components'

declare module 'styled-components' {
  export type Color =
    | 'white'
    | 'black'
    | 'light'
    | 'dark'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'

  export type ColorContrast =
    | 'lightContrast'
    | 'darkContrast'
    | 'primaryContrast'
    | 'infoContrast'
    | 'successContrast'
    | 'warningContrast'
    | 'dangerContrast'

  export type FontSize =
    | 'fontSize1'
    | 'fontSize2'
    | 'fontSize3'
    | 'fontSize4'
    | 'fontSize5'
    | 'fontSize6'
    | 'fontSize7'

  export type Shade =
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

  export type ViewportBreakpoint = 'small' | 'medium' | 'large' | 'extraLarge'

  export interface DefaultTheme
    extends Record<Color, string>,
      Record<ColorContrast, string>,
      Record<FontSize, string>,
      Record<Shade, string>,
      Record<ViewportBreakpoint, number> {
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
    backgroundColor: string
    borderColor: string
    borderHoverColor: string
    borderLightColor: string
    borderLightHoverColor: string
    textColor: string
    textColorContrast: string
    textLightColor: string
    textStrongColor: string
    textSelectionBackgroundColor: string
    codeColor: string
    codeBackgroundColor: string
    preColor: string
    preBackgroundColor: string
    linkColor: string
    linkColorContrast: string
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
    fontFamilyPrimary: string
    fontFamilySecondary: string
    fontFamilyCode: string
    fontSizeSmall: string
    fontSizeNormal: string
    fontSizeMedium: string
    fontSizeLarge: string
    fontWeightLight: number
    fontWeightNormal: number
    fontWeightMedium: number
    fontWeightSemiBold: number
    fontWeightBold: number
    blockSpacing: string
    gap: number
    small: number
    medium: number
    large: number
    extraLarge: number
    timingFunction: string
    borderRadiusSmall: string
    borderRadius: string
    borderRadiusLarge: string
    borderRadiusRounded: string
    duration: string
  }
}
