import { GraphQLSchema, graphql } from 'graphql'

jest.mock('./translation', () => ({
  __esModule: true,
  resolvers: {
    Query: {
      translations: () => {
        throw new Error("Locale 'es' not supported")
      },
    },
  },
  typeDefs: `
    type Query {
      translations: [Translation]!
    }

    type Translation {
      id: String!
      defaultMessage: String!
      description: String!
      files: [String]
      message: String!
    }
  `,
}))

const source = `
  query TranslationsQuery {
    translations {
      id
      defaultMessage
      description
      files
      message
    }
  }
`

test('should output the graphql error to the web console when in a development environment', async () => {
  const error = jest.spyOn(console, 'error').mockImplementation()
  const originalIsDev = Object.getOwnPropertyDescriptor(global, '__IS_DEV__')
  let devSchema: GraphQLSchema | undefined

  Object.defineProperty(global, '__IS_DEV__', { value: true })

  jest.isolateModules(() => {
    devSchema = require('./schema').default
  })

  await graphql({ schema: devSchema as GraphQLSchema, source })

  expect(error).toHaveBeenCalledTimes(1)
  expect(error).toHaveBeenCalledWith(
    new Error("Error in resolver Query.translations\nLocale 'es' not supported")
  )

  error.mockRestore()

  Object.defineProperty(global, '__IS_DEV__', { value: originalIsDev })
})

test('should not output the graphql error to the web console when not in a development environment', async () => {
  const error = jest.spyOn(console, 'error').mockImplementation()
  const originalIsDev = Object.getOwnPropertyDescriptor(global, '__IS_DEV__')

  Object.defineProperty(global, '__IS_DEV__', { value: false })

  const schema = require('./schema').default

  await graphql({ schema, source })

  expect(error).not.toHaveBeenCalled()

  error.mockRestore()

  Object.defineProperty(global, '__IS_DEV__', { value: originalIsDev })
})
