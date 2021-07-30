import { cleanDir } from './utils/file-system'

const clean = () =>
  Promise.all([
    cleanDir('.artifact', { dot: true }),
    cleanDir('build'),
    cleanDir('coverage'),
    cleanDir('*.log*', { dot: true }),
  ])

export default clean
