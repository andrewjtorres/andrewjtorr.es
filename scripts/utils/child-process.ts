import childProcess from 'child_process'
import { promisify } from 'util'

export const execFile = promisify(childProcess.execFile)
