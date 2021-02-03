import crypto, { BinaryToTextEncoding, HashOptions } from 'crypto'
import fs, { WriteFileOptions } from 'fs'
import path from 'path'
import { promisify } from 'util'
import { ZlibOptions } from 'zlib'
import archiver from 'archiver'
import glob, { IOptions as GlobOptions } from 'glob'
import rimraf from 'rimraf'

type CopyDirOptions = Omit<GlobOptions, 'cwd'>

type MakeDirOptions =
  | null
  | number
  | string
  | {
      mode?: number
      recursive?: boolean
    }

type ReadFileOptions =
  | null
  | string
  | {
      encoding?: BufferEncoding | null
      flag?: string
    }

type ZipDirOptions = Omit<GlobOptions, 'cwd'> & ZlibOptions

interface HashFileOptions extends HashOptions {
  algorithm?: string
  digestEncoding?: BinaryToTextEncoding
}

export const checksumFile = (
  source: string,
  target: string,
  { algorithm = 'sha256', digestEncoding, ...restOptions }: HashFileOptions = {}
) =>
  new Promise<void>((resolve, reject) => {
    const hash = crypto.createHash(algorithm, { ...restOptions })
    const readStream = fs.createReadStream(source)
    const writeStream = fs.createWriteStream(target)
    let callbackCalled = false

    const done = (error: any) => {
      if (!callbackCalled) {
        callbackCalled = true

        return error ? reject(error) : resolve()
      }
    }

    readStream.on('end', () => {
      // @ts-expect-error TS2345
      writeStream.write(hash.digest(digestEncoding))

      return writeStream.close()
    })
    readStream.on('error', done)
    writeStream.on('close', done)
    writeStream.on('error', done)
    readStream.pipe(hash)
  })

export const cleanDir = (
  path: string,
  { nosort = true, silent = true, ...restOptions }: GlobOptions = {}
) => promisify(rimraf)(path, { glob: { nosort, silent, ...restOptions } })

export const copyFile = (source: string, target: string) =>
  new Promise<void>((resolve, reject) => {
    const readStream = fs.createReadStream(source)
    const writeStream = fs.createWriteStream(target)
    let callbackCalled = false

    const done = (error: any) => {
      if (!callbackCalled) {
        callbackCalled = true

        return error ? reject(error) : resolve()
      }
    }

    readStream.on('error', done)
    writeStream.on('close', done)
    writeStream.on('error', done)
    readStream.pipe(writeStream)
  })

export const makeDir = (
  path: string,
  options: MakeDirOptions = { recursive: true } // eslint-disable-line unicorn/no-object-as-default-parameter
) => promisify(fs.mkdir)(path, options)

export const readDir = (path: string, options?: GlobOptions) =>
  promisify(glob)(path, options)

export const copyDir = async (
  source: string,
  target: string,
  { dot = true, nosort = true, ...restOptions }: CopyDirOptions = {}
) => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    dot,
    nosort,
    ...restOptions,
  })

  await Promise.all(
    dirs.map(async (dir) => {
      const from = path.resolve(source, dir)
      const to = path.resolve(target, dir)

      await makeDir(path.dirname(to))
      await copyFile(from, to)
    })
  )
}

export const readFile = (path: string, options: ReadFileOptions = 'utf-8') =>
  promisify(fs.readFile)(path, options)

export const writeFile = (
  path: string,
  data: any,
  options: WriteFileOptions = 'utf-8'
) => promisify(fs.writeFile)(path, data, options)

export const zipDir = async (
  source: string,
  target: string,
  {
    chunkSize,
    dictionary,
    dot = true,
    finishFlush,
    flush,
    level = 9,
    memLevel,
    nosort = true,
    strategy,
    windowBits,
    ...restOptions
  }: ZipDirOptions = {}
) => {
  const archive = archiver('zip', {
    zlib: {
      chunkSize,
      dictionary,
      finishFlush,
      flush,
      level,
      memLevel,
      strategy,
      windowBits,
    },
  })

  await makeDir(path.dirname(target))

  archive.pipe(fs.createWriteStream(target))

  await archive
    .glob('**/*.*', { cwd: source, dot, nosort, ...restOptions })
    .finalize()
}
