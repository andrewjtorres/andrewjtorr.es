import fs from 'fs'
import glob, { IOptions } from 'glob'
import mkdirp from 'mkdirp'
import { dirname, resolve } from 'path'
import rimraf from 'rimraf'
import { promisify } from 'util'

export const cleanDir = (path: string, options: IOptions) =>
  promisify(rimraf)(path, { glob: options })

export const copyFile = (source: string, target: string) =>
  new Promise((resolve, reject) => {
    let callbackCalled = false

    const done = (error: any) => {
      if (!callbackCalled) {
        callbackCalled = true

        return error ? reject(error) : resolve()
      }
    }

    const read = fs.createReadStream(source, 'utf-8')
    const write = fs.createWriteStream(target, 'utf-8')

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

export const writeFile = (path: string, data: any) =>
  promisify(fs.writeFile)(path, data, 'utf-8')
