import { Link as BaseLink } from 'react-router-dom'
import { rem } from 'polished'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import styled, { css } from 'styled-components'

import BaseLogoIcon from 'assets/logo.svg'
import { container, medium, untilMedium } from 'styles/mixins'

export type LayoutProps = HTMLAttributes<HTMLDivElement>

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Navbar = styled.nav`
  position: relative;
  min-height: ${rem(52)};
  background-color: ${({ theme }) => theme.colors.schemeMain};

  ${medium(css`
    display: flex;
    align-items: stretch;
  `)};
`

const Container = styled.div`
  ${container()};
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: ${rem(52)};

  ${untilMedium(css`
    display: block;
  `)};
`

const Brand = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: stretch;
  min-height: ${rem(52)};

  ${medium(css`
    margin-left: ${rem(-12)};
  `)}
`

const Link = styled(BaseLink)`
  position: relative;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  padding: ${rem(8)} ${rem(12)};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  cursor: pointer;
`

const LogoIcon = styled(BaseLogoIcon)`
  height: ${rem(32)};
  fill: ${({ theme }) => theme.colors.primary};
`

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { children, ...restProps }: LayoutProps,
  ref?: Ref<HTMLDivElement>
) {
  return (
    <Root ref={ref} {...restProps}>
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
