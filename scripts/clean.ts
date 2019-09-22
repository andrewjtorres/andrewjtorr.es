import { cleanDir } from './lib/fs'

const clean = () =>
  Promise.all([
    cleanDir('?(build|coverage)', { dot: true, nosort: true }),
    cleanDir('.?(eslint|stylelint)cache', { nosort: true }),
    cleanDir('*.log*', { dot: true, nosort: true }),
  ])

export default clean
