import path from 'path'

type Callback = (error: NodeJS.ErrnoException | undefined, data: string) => void

type Files = Record<string, string>

type MockFiles = Record<string, Record<string, string>>

const fs: typeof import('fs') = jest.createMockFromModule('fs')
let mockFiles: MockFiles = Object.freeze(Object.create(null))

const readFile = (filePath: string, _options: any, callback: Callback) => {
  const directory: Record<string, string> | undefined =
    mockFiles[path.dirname(filePath)]
  const error = new Error(
    `ENOENT: no such file or directory, open '${filePath}'`
  )

  Object.defineProperties(error, {
    code: { value: 'ENOENT' },
    errno: { value: -4058 },
    path: { value: filePath },
    syscall: { value: 'open' },
  })

  if (directory) {
    const data = directory[path.basename(filePath)]

    return data ? callback(undefined, data) : callback(error, '')
  }

  return callback(error, '')
}

const resetMockFiles = () => {
  mockFiles = Object.freeze(Object.create(null))
}

const setMockFiles = (files: Files) => {
  mockFiles = Object.create(null)

  for (const file in files) {
    const directory = path.dirname(file)

    if (!mockFiles[directory]) {
      mockFiles[directory] = {}
    }

    mockFiles[directory][path.basename(file)] = files[file]
  }

  Object.freeze(mockFiles)
}

Object.defineProperties(fs, {
  readFile: { value: readFile },
  resetMockFiles: { value: resetMockFiles },
  setMockFiles: { value: setMockFiles },
})

export default fs
