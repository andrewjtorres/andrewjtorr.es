import { ElementType, HTMLAttributes, RefAttributes } from 'react'
import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components'
import {
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system'

import { Box } from 'components/box'

type Level = 1 | 2 | 3 | 4 | 5 | 6

interface Elements {
  1: 'h1'
  2: 'h2'
  3: 'h3'
  4: 'h4'
  5: 'h5'
  6: 'h6'
}

export interface HeadingProps
  extends RefAttributes<HTMLHeadingElement>,
    Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    SpaceProps,
    TypographyProps {
  as?: ElementType<any>
  level?: Level
}

const elements: Elements = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

export const Heading = styled(Box).attrs(
  ({
    level = 2,
    as = elements[level],
    theme,
    color = theme.colors.textStrong,
    fontSize = theme.fontSizes[level],
    fontWeight = theme.fontWeights.semiBold,
    ...restProps
  }: ThemedStyledProps<HeadingProps, DefaultTheme>) => ({
    as,
    color,
    fontSize,
    fontWeight,
    level,
    theme,
    ...restProps,
  })
)<HeadingProps>`
  line-height: 1.125;
  word-break: break-word;
`
