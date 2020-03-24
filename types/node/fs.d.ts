import 'fs'

declare module 'fs' {
  type Files = Record<string, string>

  function resetMockFiles(): void

  function setMockFiles(files: Files): void
}
