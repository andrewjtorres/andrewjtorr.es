import path from 'path'
import { watch } from 'chokidar'

import packageConfig from '../package.json'
import {
  cleanDir,
  copyDir,
  copyFile,
  makeDir,
  writeFile,
} from './utils/file-system'
import { format } from './run'

const config = JSON.stringify(
  {
    name: packageConfig.name,
    version: packageConfig.version,
    scripts: { start: 'node server.js' },
    dependencies: packageConfig.dependencies,
    engines: packageConfig.engines,
    private: true,
  },
  undefined,
  2
)

const isWatch = process.argv.includes('--watch')

const copy = async () => {
  await makeDir('build')

  await Promise.all([
    copyDir('public', 'build/public'),
    copyDir('src/i18n/translations', 'build/translations'),
    copyFile('license', 'build/license'),
    copyFile('yarn.lock', 'build/yarn.lock'),
    writeFile('build/package.json', config),
  ])

  if (isWatch) {
    const watcher = watch(['public/**/*', 'src/i18n/translations/**/*'], {
      ignoreInitial: true,
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    watcher.on('all', async (eventName, filePath) => {
      const start = new Date()
      const src = path.relative('./', filePath)
      const dist = path.join(
        'build/',
        src.startsWith('src') ? path.relative('src', src) : src
      )

      if (/^(add|change)$/.test(eventName)) {
        await makeDir(path.dirname(dist))
        await copyFile(filePath, dist)
      } else if (/^unlink(Dir)?$/.test(eventName)) {
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
