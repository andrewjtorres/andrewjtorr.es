import { RouteComponentProps } from '@reach/router'
import { darken, em, rem } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import fixingTheMustacheUrl from 'assets/fixing-the-mustache.png'
import BaseGitHub from 'assets/github.svg'
import BaseGitLab from 'assets/gitlab.svg'
import BaseLinkedIn from 'assets/linkedin.svg'
import BaseTwitter from 'assets/twitter.svg'
import Layout from 'components/layout'
import { contentContainer, isHiddenMobile, isHiddenTablet } from 'styles/mixins'
import {
  baseBlack,
  darkGray,
  githubBlack,
  gitlabOrange,
  linkedinBlue,
  twitterBlue,
  white,
} from 'styles/variables'

const Root = styled.div`
  ${contentContainer};
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: ${rem(48)} ${rem(24)};
`

const ImageContainer = styled.div`
  display: inline-block;
  margin-bottom: ${rem(8)};
  position: relative;
`

const TitleImage = styled.img`
  border-radius: ${rem(125)};
  height: ${rem(250)};
  max-height: ${rem(250)};
`

const Title = styled.h1`
  color: ${baseBlack};
  font-size: ${rem(32)};
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: ${rem(4)};
  margin-top: 0;
  word-break: break-word;
`

const Subtitle = styled.h2`
  color: ${darkGray};
  font-size: ${rem(20)};
  font-weight: 400;
  line-height: 1.25;
  margin-bottom: ${rem(24)};
  margin-top: 0;
  word-break: break-word;
`

const Content = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
`

const Break = styled.br`
  ${isHiddenMobile};
`

const LinkContainer = styled.div`
  ${isHiddenTablet};
  margin-top: ${rem(12)};
`

const Link = styled.a`
  -webkit-touch-callout: none;
  align-items: center;
  appearance: none;
  border-radius: ${em(20.5)};
  border: ${rem(1)} solid ${baseBlack};
  color: ${baseBlack};
  cursor: pointer;
  display: inline-flex;
  font-size: ${rem(16)};
  height: ${em(41)};
  justify-content: center;
  padding: calc(${em(6)} - 1px) ${em(16)} calc(${em(6)} - 1px);
  user-select: none;
  width: ${em(41)};

  ${LinkContainer} > a + & {
    margin-left: ${rem(12)};
  }

  &:hover,
  &:focus {
    background-color: ${baseBlack};
    border-color: ${baseBlack};
    color: ${white};
    outline: none;
  }

  &:active {
    background-color: ${darken(0.1, baseBlack)};
    border-color: ${darken(0.1, baseBlack)};
    color: ${white};
    outline: none;
  }

  &:focus:not(:active) {
    box-shadow: 0 0 0 ${em(2)} rgba(54, 54, 54, 0.25);
  }
`

const LinkedInLink = styled(Link)`
  ${ImageContainer} > & {
    left: ${rem(254.016)};
    position: absolute;
    top: ${rem(32.09152)};
  }

  &:hover,
  &:focus {
    background-color: ${linkedinBlue};
    border-color: ${linkedinBlue};
  }

  &:active {
    background-color: ${darken(0.1, linkedinBlue)};
    border-color: ${darken(0.1, linkedinBlue)};
  }
`

const GitHubLink = styled(Link)`
  ${ImageContainer} > & {
    left: ${rem(269.968)};
    position: absolute;
    top: ${rem(81.18832)};
  }

  &:hover,
  &:focus {
    background-color: ${githubBlack};
    border-color: ${githubBlack};
  }

  &:active {
    background-color: ${darken(0.1, githubBlack)};
    border-color: ${darken(0.1, githubBlack)};
  }
`

const GitLabLink = styled(Link)`
  ${ImageContainer} > & {
    left: ${rem(269.968)};
    position: absolute;
    top: ${rem(132.81168)};
  }

  &:hover,
  &:focus {
    background-color: ${gitlabOrange};
    border-color: ${gitlabOrange};
  }

  &:active {
    background-color: ${darken(0.1, gitlabOrange)};
    border-color: ${darken(0.1, gitlabOrange)};
  }
`

const TwitterLink = styled(Link)`
  ${ImageContainer} > & {
    left: ${rem(254.016)};
    position: absolute;
    top: ${rem(181.9088)};
  }

  &:hover,
  &:focus {
    background-color: ${twitterBlue};
    border-color: ${twitterBlue};
  }

  &:active {
    background-color: ${darken(0.1, twitterBlue)};
    border-color: ${darken(0.1, twitterBlue)};
  }
`

const icon = css`
  align-items: center;
  display: inline-flex;
  height: ${rem(21)};
  justify-content: center;
  max-height: ${rem(21)};

  a > & {
    fill: ${baseBlack};

    &:only-child {
      margin-left: calc(${em(-6)} - 1px);
      margin-right: calc(${em(-6)} - 1px);
    }
  }

  a:hover > &,
  a:focus > &,
  a:active > & {
    fill: ${white};
  }
`

const LinkedIn = styled(BaseLinkedIn)`
  ${icon}
`

const GitHub = styled(BaseGitHub)`
  ${icon}
`

const GitLab = styled(BaseGitLab)`
  ${icon}
`

const Twitter = styled(BaseTwitter)`
  ${icon}
`

const Home: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const links: (HTMLAnchorElement | null)[] = []
  const mediumLinkContainer = React.useRef<HTMLDivElement>(null)
  const smallLinkContainer = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(
      'screen and (min-width: 769px), print'
    )

    const smallMediumTransition = ({
      matches,
    }: MediaQueryList | MediaQueryListEvent) => {
      const { current } = matches ? mediumLinkContainer : smallLinkContainer

      return current
        ? current.append(...(links as HTMLAnchorElement[]))
        : undefined
    }

    mediaQueryList.addListener(smallMediumTransition)
    smallMediumTransition(mediaQueryList)
  })

  return (
    <Layout {...rest}>
      <Root>
        <ImageContainer data-testid="image-container" ref={mediumLinkContainer}>
          <TitleImage alt="Fixing the Mustache" src={fixingTheMustacheUrl} />
        </ImageContainer>
        <Title>Andrew Torres</Title>
        <Subtitle>Software Engineer</Subtitle>
        <Content>
          Passionate about open source and the amazing community surrounding it.{' '}
          <Break />
          Lately, I have been vibing Node.js and it&apos;s creative ecosystem.
        </Content>
        <LinkContainer data-testid="link-container" ref={smallLinkContainer}>
          <LinkedInLink
            aria-label="linkedin"
            data-testid="linkedin"
            href="https://www.linkedin.com/in/andrew-torres-305a7913a"
            ref={element => {
              links.push(element)
            }}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedIn />
          </LinkedInLink>
          <GitHubLink
            aria-label="github"
            data-testid="github"
            href="https://github.com/ajtorres9"
            ref={element => {
              links.push(element)
            }}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHub />
          </GitHubLink>
          <GitLabLink
            aria-label="gitlab"
            data-testid="gitlab"
            href="https://gitlab.com/ajtorres9"
            ref={element => {
              links.push(element)
            }}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitLab />
          </GitLabLink>
          <TwitterLink
            aria-label="twitter"
            data-testid="twitter"
            href="https://twitter.com/ajtorres333"
            ref={element => {
              links.push(element)
            }}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Twitter />
          </TwitterLink>
        </LinkContainer>
      </Root>
    </Layout>
  )
}

export default Home
