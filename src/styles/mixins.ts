import { FlattenInterpolation, ThemedStyledProps, css } from 'styled-components' // eslint-disable-line import/named
import { viewportLg, viewportMd, viewportSm, viewportXl } from './variables'

const media = (queries: string) => (
  content: FlattenInterpolation<ThemedStyledProps<{}, {}>>
) => css`
  @media ${queries} {
    ${content};
  }
`

export const untilSmall = media(`screen and (max-width: ${viewportSm - 1}px)`)

export const small = media(`screen and (min-width: ${viewportSm}px), print`)

export const untilMedium = media(`screen and (max-width: ${viewportMd - 1}px)`)

export const medium = media(`screen and (min-width: ${viewportMd}px)`)

export const large = media(`screen and (min-width: ${viewportLg}px)`)

export const extraLarge = media(`screen and (min-width: ${viewportXl}px)`)

export const isHiddenMobile = css`
  ${untilSmall(css`
    display: none !important;
  `)};
`

export const isHiddenTablet = css`
  ${small(css`
    display: none !important;
  `)};
`

export const contentContainer = css`
  margin: 0 auto;

  ${medium(css`
    max-width: 960px;
    width: 960px;
  `)};

  ${large(css`
    max-width: 1152px;
    width: 1152px;
  `)};

  ${extraLarge(css`
    max-width: 1344px;
    width: 1344px;
  `)};
`
