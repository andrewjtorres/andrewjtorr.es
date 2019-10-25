import fs from 'fs'
import { basename, join, resolve } from 'path'
import { S3 } from 'aws-sdk'

import { name } from '../package.json'
import { execFile } from './utils/child-process'
import { zipDir } from './utils/file-system'
import build from './build'

const rootDir = resolve(__dirname, '..')
const buildDir = join(rootDir, 'build')

const artifact = join(rootDir, `.artifact/${name}.zip`)

const deploy = async () => {
  const s3 = new S3()

  await build()

  await execFile('yarn', ['install', '--frozen-lockfile'], {
    cwd: buildDir,
    env: process.env,
  })

  await zipDir(buildDir, artifact)

  await s3
    .upload({
      Body: fs.createReadStream(artifact),
      Bucket: name,
      Key: basename(artifact),
    })
    .promise()
}

export default deploy
