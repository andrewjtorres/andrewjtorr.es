import {
  DefaultTheme,
  FlattenInterpolation,
  ThemedStyledProps,
  ViewportBreakpoint,
  css,
} from 'styled-components'

type Styles = FlattenInterpolation<ThemedStyledProps<{}, DefaultTheme>>

type ViewportBreakpointLower = Exclude<ViewportBreakpoint, 'extraLarge'>

type ViewportBreakpointUpper = Exclude<ViewportBreakpoint, 'small'>

const viewportBreakpointScale: Record<
  ViewportBreakpointLower,
  ViewportBreakpointUpper
> = { small: 'medium', medium: 'large', large: 'extraLarge' }

const from = (breakpoint: ViewportBreakpoint) => (styles: Styles) => css`
  /* stylelint-disable-next-line media-feature-name-no-unknown */
  @media screen and (min-width: ${({ theme }) => theme[breakpoint]}px) {
    ${styles};
  }
`

const only = (breakpoint: ViewportBreakpointLower) => (styles: Styles) => css`
  /* stylelint-disable media-feature-name-no-unknown */
  @media screen and (min-width: ${({ theme }) =>
      theme[breakpoint]}px) and (max-width: ${({ theme }) =>
      theme[viewportBreakpointScale[breakpoint]] - 1}px) {
    ${styles};
  }
  /* stylelint-enable media-feature-name-no-unknown */
`

const until = (breakpoint: ViewportBreakpoint) => (styles: Styles) => css`
  /* stylelint-disable-next-line media-feature-name-no-unknown */
  @media screen and (max-width: ${({ theme }) => theme[breakpoint] - 1}px) {
    ${styles};
  }
`

export const overflowTouch = css`
  -webkit-overflow-scrolling: touch;
`

export const untilSmall = until('small')

export const small = (styles: Styles) => css`
  /* stylelint-disable-next-line media-feature-name-no-unknown */
  @media screen and (min-width: ${({ theme }) => theme.small}px), print {
    ${styles};
  }
`

export const smallOnly = only('small')

export const untilMedium = until('medium')

export const medium = from('medium')

export const mediumOnly = only('medium')

export const untilLarge = until('large')

export const large = from('large')

export const largeOnly = only('large')

export const untilExtraLarge = until('extraLarge')

export const extraLarge = from('extraLarge')

export const isHiddenUntilSmall = css`
  ${untilSmall(css`
    display: none !important;
  `)};
`

export const isHiddenSmall = css`
  ${small(css`
    display: none !important;
  `)};
`

export const container = (isFluid = false) => {
  const fluid = css`
    padding-right: ${({ theme }) => theme.gap}px;
    padding-left: ${({ theme }) => theme.gap}px;
  `

  const centered = (breakpoint: ViewportBreakpoint) => css`
    max-width: ${({ theme }) => theme[breakpoint] - 2 * theme.gap}px;
  `

  return css`
    position: relative;
    flex-grow: 1;
    width: ${isFluid ? '100%' : 'auto'};
    margin: 0 auto;

    ${isFluid
      ? fluid
      : css`
          ${extraLarge(centered('extraLarge'))};

          ${untilExtraLarge(centered('extraLarge'))};

          ${large(centered('large'))};

          ${untilLarge(centered('large'))};

          ${medium(centered('medium'))};
        `};
  `
}
