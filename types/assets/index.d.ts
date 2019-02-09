declare module '*.png' {
  const src: string

  export default src // eslint-disable-line import/export
}

declare module '*.svg' {
  import * as React from 'react'

  const src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  export default src // eslint-disable-line import/export
}
