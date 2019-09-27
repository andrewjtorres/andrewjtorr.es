import { join, resolve } from 'path'

if (process.env.BROWSER_ENV) {
  throw new Error("Do not import 'config.ts' from inside the client-side code.")
}

export const locales = ['en']

export const rootDir = resolve(__dirname)
export const publicDir = join(rootDir, 'public')
export const translationsDir =
  process.env.TRANSLATIONS_DIR || join(rootDir, 'translations')

export const port = Number(process.env.PORT) || 3000
