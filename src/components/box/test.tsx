import { renderWithContext } from 'utils/spec'
import { Box } from '.'

test('should render correctly', () => {
  const { firstChild } = renderWithContext(<Box>Box</Box>).container

  expect(firstChild).toMatchInlineSnapshot(`
    .c0 {
      box-sizing: border-box;
      min-width: 0;
      margin: 0;
    }

    <div
      class="c0"
    >
      Box
    </div>
  `)
})
