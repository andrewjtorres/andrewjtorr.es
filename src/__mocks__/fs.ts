import { basename, dirname } from 'path'

type Callback = (error: NodeJS.ErrnoException | undefined, data: string) => void

type Files = Record<string, string>

type MockFiles = Record<string, Record<string, string>>

const fs: typeof import('fs') = jest.genMockFromModule('fs')
let mockFiles: MockFiles = Object.freeze(Object.create(null))

const readFile = (path: string, _options: any, callback: Callback) => {
  const directory: Record<string, string> | undefined = mockFiles[dirname(path)]
  const error = new Error(`ENOENT: no such file or directory, open '${path}'`)

  Object.defineProperties(error, {
    code: { value: 'ENOENT' },
    errno: { value: -4058 },
    path: { value: path },
    syscall: { value: 'open' },
  })

  if (directory) {
    const data = directory[basename(path)]

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
    const directory = dirname(file)

    if (!mockFiles[directory]) {
      mockFiles[directory] = {}
    }

    mockFiles[directory][basename(file)] = files[file]
  }

  Object.freeze(mockFiles)
}

Object.defineProperties(fs, {
  readFile: { value: readFile },
  resetMockFiles: { value: resetMockFiles },
  setMockFiles: { value: setMockFiles },
})

export default fs
