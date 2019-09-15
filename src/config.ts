if (__IS_BROWSER__) {
  throw new Error('Do not import "config.ts" from inside the client-side code.')
}

export const port = process.env.PORT || 3000
