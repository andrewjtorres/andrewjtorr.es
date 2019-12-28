import fs from 'fs'
import { basename, join, resolve } from 'path'
import { Lambda, S3 } from 'aws-sdk'

import packageConfig from '../package.json'
import { execFile } from './utils/child-process'
import { checksumFile, zipDir } from './utils/file-system'
import build from './build'

const rootDir = resolve(__dirname, '..')
const artifactDir = join(rootDir, '.artifact')
const buildDir = join(rootDir, 'build')

const shasum256 = join(artifactDir, 'shasum256.txt')
const sourceCode = join(artifactDir, `${packageConfig.name}.zip`)

const deploy = async () => {
  const lambda = new Lambda()
  const s3 = new S3()

  await build()

  await execFile('yarn', ['install', '--frozen-lockfile'], {
    cwd: buildDir,
    env: process.env,
  })

  await zipDir(buildDir, sourceCode, { ignore: 'server.js?(.*)' })
  await checksumFile(sourceCode, shasum256, { digestEncoding: 'base64' })

  await Promise.all([
    s3
      .upload({
        Body: fs.createReadStream(shasum256),
        Bucket: packageConfig.name,
        Key: basename(shasum256),
      })
      .promise(),
    s3
      .upload({
        Body: fs.createReadStream(sourceCode),
        Bucket: packageConfig.name,
        Key: basename(sourceCode),
      })
      .promise(),
  ])

  await lambda
    .updateFunctionCode({
      FunctionName: packageConfig.name.replace('.', '_'),
      S3Bucket: packageConfig.name,
      S3Key: basename(sourceCode),
    })
    .promise()
}

export default deploy
