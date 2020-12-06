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
  background-color: ${({ theme }) => theme.colors.schemeMain};
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
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 1.5;
  padding: ${rem(8)} ${rem(12)};
  position: relative;
`

const LogoIcon = styled(BaseLogoIcon)`
  fill: ${({ theme }) => theme.colors.primary};
  height: ${rem(32)};
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
