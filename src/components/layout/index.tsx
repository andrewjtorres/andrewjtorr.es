import { Link as BaseLink } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import BaseLogoIcon from 'assets/logo.svg'
import { container, medium, untilMedium } from 'styles/mixins'

type LayoutProps = React.HTMLAttributes<HTMLDivElement>

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Navbar = styled.nav`
  background-color: ${({ theme }) => theme.schemeMain};
  min-height: ${rem(52)};
  position: relative;

  ${medium(css`
    align-items: stretch;
    display: flex;
  `)};
`

const Container = styled.div`
  ${container()};
  align-items: stretch;
  display: flex;
  min-height: ${rem(52)};
  width: 100%;

  ${untilMedium(css`
    display: block;
  `)};
`

const Brand = styled.div`
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: ${rem(52)};

  ${medium(css`
    margin-left: ${rem(-12)};
  `)}
`

const Link = styled(BaseLink)`
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 1.5;
  padding: ${rem(8)} ${rem(12)};
  position: relative;
`

const LogoIcon = styled(BaseLogoIcon)`
  height: ${rem(32)};
`

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { children, ...props }: LayoutProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <Root ref={ref} {...props}>
      <header>
        <Navbar aria-label="main navigation">
          <Container>
            <Brand>
              <Link aria-label="home" data-testid="logo" to="/">
                <LogoIcon />
              </Link>
            </Brand>
          </Container>
        </Navbar>
      </header>
      {children}
    </Root>
  )
})

export default Layout
