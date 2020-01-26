import crypto, { HashOptions, HexBase64Latin1Encoding } from 'crypto'
import fs from 'fs'
import { dirname, resolve } from 'path'
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

type ZipDirOptions = Omit<GlobOptions, 'cwd'> & ZlibOptions

interface HashFileOptions extends HashOptions {
  algorithm?: string
  digestEncoding?: HexBase64Latin1Encoding
}

export const checksumFile = (
  source: string,
  target: string,
  { algorithm = 'sha256', digestEncoding, ...options }: HashFileOptions = {}
) =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm, { ...options })
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore TS2345
      writeStream.write(hash.digest(digestEncoding))

      return writeStream.close()
    })
    readStream.on('error', done)
    writeStream.on('close', done)
    writeStream.on('error', done)
    readStream.pipe(hash)
  })

export const cleanDir = (path: string, options: GlobOptions) =>
  promisify(rimraf)(path, { glob: options })

export const copyFile = (source: string, target: string) =>
  new Promise((resolve, reject) => {
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
  options: MakeDirOptions = { recursive: true }
) => promisify(fs.mkdir)(path, options)

export const readDir = (path: string, options: GlobOptions) =>
  promisify(glob)(path, options)

export const copyDir = async (
  source: string,
  target: string,
  { dot = true, nosort = true, ...options }: CopyDirOptions = {}
) => {
  const dirs = await readDir('**/*.*', { cwd: source, dot, nosort, ...options })

  await Promise.all(
    dirs.map(async dir => {
      const from = resolve(source, dir)
      const to = resolve(target, dir)

      await makeDir(dirname(to))
      await copyFile(from, to)
    })
  )
}

export const readFile = (path: string) => promisify(fs.readFile)(path, 'utf-8')

export const writeFile = (path: string, data: any) =>
  promisify(fs.writeFile)(path, data, 'utf-8')

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
    ...options
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

  await makeDir(dirname(target))

  archive.pipe(fs.createWriteStream(target))

  await archive
    .glob('**/*.*', { cwd: source, dot, nosort, ...options })
    .finalize()
}
