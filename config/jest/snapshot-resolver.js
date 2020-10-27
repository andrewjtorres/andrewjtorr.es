'use strict'

const path = require('path')

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace('__tests__', '__snapshots__') + snapshotExtension,
  resolveTestPath: (snapshotPath, snapshotExtension) =>
    snapshotPath
      .replace('__snapshots__', '__tests__')
      .slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: path.posix.join(
    'consistency-check',
    '__tests__',
    'example.test.js'
  ),
}
