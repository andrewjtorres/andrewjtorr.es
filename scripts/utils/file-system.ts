import fs from 'fs'
import { dirname, resolve } from 'path'
import { promisify } from 'util'
import archiver, { ArchiverOptions } from 'archiver'
import glob, { IOptions } from 'glob'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

export const cleanDir = (path: string, options: IOptions) =>
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

export const readDir = (path: string, options: IOptions) =>
  promisify(glob)(path, options)

export const copyDir = async (source: string, target: string) => {
  const dirs = await readDir('**/*.*', { cwd: source, dot: true, nosort: true })

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
  { zlib = {}, ...options }: ArchiverOptions = {}
) => {
  const archive = archiver('zip', { ...options, zlib: { level: 9, ...zlib } })

  await makeDir(dirname(target))

  archive.pipe(fs.createWriteStream(target))

  await archive
    .glob('**/*.*', { cwd: source, dot: true, nosort: true })
    .finalize()
}
