import { rem } from 'polished'
import { FunctionComponent } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled from 'styled-components'

const rootId = 'routes.notFound'

const translations = defineMessages({
  title: {
    id: `${rootId}.title`,
    defaultMessage: 'Page Not Found',
    description: 'The title of the Not Found page',
  },
  description: {
    id: `${rootId}.description`,
    defaultMessage:
      'Sorry, but the page you were trying to view does not exist.',
    description: 'The description of the Not Found page',
  },
})

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.grayDark};
  font-weight: 400;
  font-size: ${rem(32)};
  line-height: 1.2;
`

const Content = styled.p`
  width: ${rem(280)};
`

const NotFound: FunctionComponent = (props) => {
  const { formatMessage } = useIntl()

  return (
    <Root {...props}>
      <Title>{formatMessage(translations.title)}</Title>
      <Content>{formatMessage(translations.description)}</Content>
    </Root>
  )
}

export default NotFound
