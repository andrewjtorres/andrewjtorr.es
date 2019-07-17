import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { gray } from 'styles/variables'

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const Title = styled.h1`
  color: ${gray};
  font-size: ${rem(32)};
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
`

const Content = styled.p`
  width: ${rem(280)};
`

const NotFound: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => (
  <Root {...rest}>
    <Title>Page Not Found</Title>
    <Content>
      Sorry, but the page you were trying to view does not exist.
    </Content>
  </Root>
)

export default NotFound
