import { join, resolve } from 'path'
import { config } from 'dotenv-safe'

const rootDir = resolve(__dirname, '..')

const env = process.env.NODE_ENV ?? 'development'
const isProd = /^prod(uction)?$/i.test(env)

const isRelease = isProd || process.argv.includes('--release')

const envFile = isRelease ? '.env.prod' : '.env.dev'

config({ example: join(rootDir, '.env.example'), path: join(rootDir, envFile) })
