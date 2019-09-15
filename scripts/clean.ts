import { cleanDir } from './lib/fs'

const clean = () =>
  Promise.all([
    cleanDir('build/*', { dot: true, ignore: ['build/.git'], nosort: true }),
  ])

export default clean
