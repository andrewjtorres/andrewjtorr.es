if (process.env.BROWSER_ENV) {
  throw new Error("Do not import 'config.ts' from inside the client-side code.")
}

export const locales = ['en']

export const port = Number(process.env.PORT) || 3000
