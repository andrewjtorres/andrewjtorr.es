declare namespace NodeJS {
  interface ProcessEnv {
    API_URI: string
    AWS_ACCESS_KEY_ID: string
    AWS_REGION: string
    AWS_SECRET_ACCESS_KEY: string
    BROWSER_ENV?: string
    NODE_ENV?: string
    TRANSLATIONS_DIR: string
  }
}
