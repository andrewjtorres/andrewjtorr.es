import { Context, createServer, proxy } from 'aws-serverless-express'

import app from './server'

const server = createServer(app)

const handler = (event: any, context: Context) => proxy(server, event, context)

export default handler
