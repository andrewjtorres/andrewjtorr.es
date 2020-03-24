declare const __IS_DEV__: boolean

declare module '*.png' {
  const src: string

  export default src
}

declare module '*.svg' {
  import {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    SVGAttributes,
  } from 'react'

  const src: ForwardRefExoticComponent<
    PropsWithoutRef<SVGAttributes<SVGSVGElement>> & RefAttributes<SVGSVGElement>
  >

  export default src
}
