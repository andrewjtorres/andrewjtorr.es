'use strict'

module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/exec', { prepareCmd: 'yarn --silent build' }],
    [
      '@semantic-release/github',
      { labels: false, releasedLabels: false, successComment: false },
    ],
    '@semantic-release/git',
  ],
}
