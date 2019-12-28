import 'fs'

declare module 'fs' {
  type Files = Record<string, string>

  export function resetMockFiles(): void

  export function setMockFiles(files: Files): void
}
