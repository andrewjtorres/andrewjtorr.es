import React from 'react'
import styled from 'styled-components'
import {
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
  color,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from 'styled-system'

export interface BoxProps
  extends React.RefAttributes<HTMLDivElement>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    SpaceProps,
    TypographyProps {
  as?: React.ElementType<any>
}

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;

  ${compose(color, flexbox, layout, space, typography)};
`
