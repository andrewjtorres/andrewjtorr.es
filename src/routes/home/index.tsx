import { darken, em, hsl, rem } from 'polished'
import { useEffect, useRef, FunctionComponent } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled, { css } from 'styled-components'

import fixingTheMustacheUrl from 'assets/fixing-the-mustache.png'
import BaseGitHub from 'assets/github.svg'
import BaseGitLab from 'assets/gitlab.svg'
import BaseLinkedIn from 'assets/linkedin.svg'
import BaseTwitter from 'assets/twitter.svg'
import { Layout } from 'components/layout'
import { container, isHiddenSmall, isHiddenUntilSmall } from 'styles/mixins'

const github = hsl(0, 0.05, 0.09)
const gitlab = hsl(8, 0.76, 0.52)
const linkedin = hsl(215, 0.69, 0.45)
const twitter = hsl(206, 0.89, 0.58)

const rootId = 'routes.home'

const translations = defineMessages({
  title: {
    id: `${rootId}.title`,
    defaultMessage: 'Andrew Torres',
    description: 'The title of the Home page',
  },
  subtitle: {
    id: `${rootId}.subtitle`,
    defaultMessage: 'Software Engineer',
    description: 'The subtitle of the Home page',
  },
  description: {
    id: `${rootId}.description`,
    defaultMessage:
      'Passionate about open source and the amazing community surrounding it. {br}Lately, I have been vibing Node.js and its creative ecosystem.',
    description: 'The description of the Home page',
  },
})

const Root = styled.div`
  ${container()}
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: ${rem(48)} ${rem(24)};
`

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: ${rem(8)};
`

const TitleImage = styled.img`
  height: ${rem(250)};
  max-height: ${rem(250)};
  border-radius: ${rem(125)};
`

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: ${rem(4)};
  color: ${({ theme }) => theme.colors.grayDarker};
  font-weight: 600;
  font-size: ${rem(32)};
  line-height: 1.125;
  word-break: break-word;
`

const Subtitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${rem(24)};
  color: ${({ theme }) => theme.colors.grayDark};
  font-weight: 400;
  font-size: ${rem(20)};
  line-height: 1.25;
  word-break: break-word;
`

const Content = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
`

const Br = styled.br`
  ${isHiddenUntilSmall};
`

const LinkContainer = styled.div`
  ${isHiddenSmall};
  margin-top: ${rem(12)};
`

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${em(41)};
  height: ${em(41)};
  padding: calc(${em(6)} - 1px) ${em(16)} calc(${em(6)} - 1px);
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${rem(16)};
  border: ${rem(1)} solid ${({ theme }) => theme.colors.grayDarker};
  border-radius: ${em(20.5)};
  cursor: pointer;
  appearance: none;
  user-select: none;

  -webkit-touch-callout: none;

  ${LinkContainer} > a + & {
    margin-left: ${rem(12)};
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.grayDarker};
    border-color: ${({ theme }) => theme.colors.grayDarker};
    outline: none;
  }

  &:active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => darken(0.1, theme.colors.grayDarker)};
    border-color: ${({ theme }) => darken(0.1, theme.colors.grayDarker)};
    outline: none;
  }

  &:focus:not(:active) {
    box-shadow: 0 0 0 ${em(2)} rgba(54, 54, 54, 0.25);
  }
`

const LinkedInLink = styled(Link)`
  ${ImageContainer} > & {
    position: absolute;
    top: ${rem(32.09152)};
    left: ${rem(254.016)};
  }

  &:hover,
  &:focus {
    background-color: ${linkedin};
    border-color: ${linkedin};
  }

  &:active {
    background-color: ${darken(0.1, linkedin)};
    border-color: ${darken(0.1, linkedin)};
  }
`

const GitHubLink = styled(Link)`
  ${ImageContainer} > & {
    position: absolute;
    top: ${rem(81.18832)};
    left: ${rem(269.968)};
  }

  &:hover,
  &:focus {
    background-color: ${github};
    border-color: ${github};
  }

  &:active {
    background-color: ${darken(0.1, github)};
    border-color: ${darken(0.1, github)};
  }
`

const GitLabLink = styled(Link)`
  ${ImageContainer} > & {
    position: absolute;
    top: ${rem(132.81168)};
    left: ${rem(269.968)};
  }

  &:hover,
  &:focus {
    background-color: ${gitlab};
    border-color: ${gitlab};
  }

  &:active {
    background-color: ${darken(0.1, gitlab)};
    border-color: ${darken(0.1, gitlab)};
  }
`

const TwitterLink = styled(Link)`
  ${ImageContainer} > & {
    position: absolute;
    top: ${rem(181.9088)};
    left: ${rem(254.016)};
  }

  &:hover,
  &:focus {
    background-color: ${twitter};
    border-color: ${twitter};
  }

  &:active {
    background-color: ${darken(0.1, twitter)};
    border-color: ${darken(0.1, twitter)};
  }
`

const icon = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${rem(21)};
  max-height: ${rem(21)};

  a > & {
    fill: ${({ theme }) => theme.colors.grayDarker};

    &:only-child {
      margin-right: calc(${em(-6)} - 1px);
      margin-left: calc(${em(-6)} - 1px);
    }
  }

  a:hover > &,
  a:focus > &,
  a:active > & {
    fill: ${({ theme }) => theme.colors.white};
  }
`

const LinkedIn = styled(BaseLinkedIn)`
  ${icon};
`

const GitHub = styled(BaseGitHub)`
  ${icon};
`

const GitLab = styled(BaseGitLab)`
  ${icon};
`

const Twitter = styled(BaseTwitter)`
  ${icon};
`

const Home: FunctionComponent = (props) => {
  const { formatMessage } = useIntl()
  const links: HTMLAnchorElement[] = []
  const mediumLinkContainer = useRef<HTMLDivElement>()
  const smallLinkContainer = useRef<HTMLDivElement>()

  const smallMediumTransition = ({
    matches,
  }: MediaQueryList | MediaQueryListEvent) => {
    const { current } = matches ? mediumLinkContainer : smallLinkContainer

    return current?.append(...links)
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      'screen and (min-width: 769px), print'
    )

    mediaQueryList.addListener(smallMediumTransition)
    smallMediumTransition(mediaQueryList)
  })

  return (
    <Layout {...props}>
      <Root>
        <ImageContainer
          data-testid="image-container"
          ref={(element) =>
            element !== null && (mediumLinkContainer.current = element)
          }
        >
          <TitleImage alt="Fixing the Mustache" src={fixingTheMustacheUrl} />
        </ImageContainer>
        <Title>{formatMessage(translations.title)}</Title>
        <Subtitle>{formatMessage(translations.subtitle)}</Subtitle>
        <Content>
          {formatMessage(translations.description, { br: <Br key="br" /> })}
        </Content>
        <LinkContainer
          data-testid="link-container"
          ref={(element) =>
            element !== null && (smallLinkContainer.current = element)
          }
        >
          <LinkedInLink
            aria-label="linkedin"
            data-testid="linkedin"
            href="https://www.linkedin.com/in/andrew-torres-305a7913a"
            ref={(element) => {
              if (element !== null) {
                links.push(element)
              }
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
            ref={(element) => {
              if (element !== null) {
                links.push(element)
              }
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
            ref={(element) => {
              if (element !== null) {
                links.push(element)
              }
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
            ref={(element) => {
              if (element !== null) {
                links.push(element)
              }
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
