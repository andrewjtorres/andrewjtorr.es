import chokidar from 'chokidar'
import { dirname, join, relative } from 'path'

import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs'
import { format } from './run'
import { dependencies, engines } from '../package.json'

const config = JSON.stringify(
  {
    scripts: { start: 'node server.js' },
    dependencies,
    engines,
    private: true,
  },
  null,
  2
)

const copy = async () => {
  await makeDir('build')

  await Promise.all([
    copyDir('public', 'build/public'),
    copyFile('license', 'build/license'),
    copyFile('yarn.lock', 'build/yarn.lock'),
    writeFile('build/package.json', config),
  ])

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch(['public/**/*'], { ignoreInitial: true })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    watcher.on('all', async (eventName, path) => {
      const start = new Date()
      const src = relative('./', path)
      const dist = join(
        'build/',
        src.startsWith('src') ? relative('src', src) : src
      )

      if (eventName === 'add' || eventName === 'change') {
        await makeDir(dirname(dist))
        await copyFile(path, dist)
      } else if (eventName === 'unlink' || eventName === 'unlinkDir') {
        cleanDir(dist, { dot: true, nosort: true })
      } else {
        return
      }

      const end = new Date()
      const time = end.getTime() - start.getTime()

      console.info(`[${format(end)}] ${eventName} '${dist}' after ${time} ms`)
    })
  }
}

export default copy
