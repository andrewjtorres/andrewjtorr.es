import { join, resolve } from 'path'

if (process.env.BROWSER_ENV) {
  throw new Error("Do not import 'config.ts' from inside the client-side code.")
}

export const locales = ['en']

export const rootDir = resolve(__dirname)
export const localesDir = process.env.LOCALES_DIR || join(rootDir, 'locales')
export const publicDir = join(rootDir, 'public')

export const port = Number(process.env.PORT) || 3000
