import bundle from './bundle'
import clean from './clean'
import copy from './copy'
import run from './run'

const build = async () => {
  await run(clean)
  await run(copy)
  await run(bundle)
}

export default build
