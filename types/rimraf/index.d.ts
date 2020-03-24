import 'rimraf'

declare module 'rimraf' {
  function __promisify__(path: string, options?: Options): Promise<void>
}
