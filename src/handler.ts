import { Context, createServer, proxy } from 'aws-serverless-express'

import app from './server'

const server = createServer(app, undefined, [
  'application/javascript',
  'application/json',
  'application/manifest+json',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/html',
  'text/javascript',
])

const handler = (event: any, context: Context) => proxy(server, event, context)

export default handler
