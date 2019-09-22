import bundle from './bundle'
import clean from './clean'
import copy from './copy'
import extractTranslations from './extract-translations'
import run from './run'

const build = async () => {
  await run(clean)
  await run(extractTranslations)
  await run(copy)
  await run(bundle)
}

export default build
