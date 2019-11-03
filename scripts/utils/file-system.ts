import fs from 'fs'
import { dirname, resolve } from 'path'
import { promisify } from 'util'
import { ZlibOptions } from 'zlib'
import archiver from 'archiver'
import glob, { IOptions as GlobOptions } from 'glob'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

type CopyDirOptions = Omit<GlobOptions, 'cwd'>

type ZipDirOptions = Omit<GlobOptions, 'cwd'> & ZlibOptions

export const cleanDir = (path: string, options: GlobOptions) =>
  promisify(rimraf)(path, { glob: options })

export const copyFile = (source: string, target: string) =>
  new Promise((resolve, reject) => {
    const read = fs.createReadStream(source)
    const write = fs.createWriteStream(target)
    let callbackCalled = false

    const done = (error: any) => {
      if (!callbackCalled) {
        callbackCalled = true

        return error ? reject(error) : resolve()
      }
    }

    read.on('error', done)
    write.on('close', done)
    write.on('error', done)
    read.pipe(write)
  })

export const makeDir = (path: string) => promisify(mkdirp)(path)

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
