import React from 'react'

import { renderWithContext } from 'utils/spec'
import { Box } from '.'

test('should render correctly', () => {
  const { firstChild } = renderWithContext(
    <Box bg="primary" color="white" fontSize={4} p={5} width={[1, 1, 0.5]}>
      Box
    </Box>
  ).container

  expect(firstChild).toMatchInlineSnapshot(`
    .c0 {
      box-sizing: border-box;
      margin: 0;
      min-width: 0;
      background-color: #f15b5b;
      color: #fff;
      font-size: 1.5rem;
      padding: 4rem;
      width: 100%;
    }

    @media screen and (min-width:769px) {
      .c0 {
        width: 100%;
      }
    }

    @media screen and (min-width:1024px) {
      .c0 {
        width: 50%;
      }
    }

    <div
      class="c0"
      color="white"
      font-size="4"
      width="1,1,0.5"
    >
      Box
    </div>
  `)
})
