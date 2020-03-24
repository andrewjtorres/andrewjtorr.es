import 'aws-serverless-express'

declare module 'aws-serverless-express' {
  interface ClientContext {
    Custom?: any
    client: ClientContextClient
    env: ClientContextEnv
  }

  interface ClientContextClient {
    appPackageName: string
    appTitle: string
    appVersionCode: string
    appVersionName: string
    installationId: string
  }

  interface ClientContextEnv {
    locale: string
    make: string
    model: string
    platform: string
    platformVersion: string
  }

  interface CognitoIdentity {
    cognitoIdentityId: string
    cognitoIdentityPoolId: string
  }

  interface Context {
    awsRequestId: string
    callbackWaitsForEmptyEventLoop: boolean
    clientContext?: ClientContext
    done(error?: Error, result?: any): void
    fail(error: Error | string): void
    functionName: string
    functionVersion: string
    getRemainingTimeInMillis(): number
    identity?: CognitoIdentity
    invokedFunctionArn: string
    logGroupName: string
    logStreamName: string
    memoryLimitInMB: string
    succeed(message: string, object: any): void
    succeed(messageOrObject: any): void
  }
}
