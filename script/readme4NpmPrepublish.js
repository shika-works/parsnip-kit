import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function safeRenameSync(src, dest) {
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest)
  }
}

function safeCopySync(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
  }
}

const rootDir = path.resolve(__dirname, '..')

safeCopySync(path.join(rootDir, 'README.md'), path.join(rootDir, '__README_TEMP__'))

safeCopySync(path.join(rootDir, 'README.npm.md'), path.join(rootDir, 'README.md'))

const files = fs.readdirSync(rootDir)
files.forEach((file) => {
  const match = file.match(/^README\.(\w+)\.md$/)
  if (match) {
    const ext = match[1].toUpperCase()
    safeRenameSync(
      path.join(rootDir, file),
      path.join(rootDir, `__README_${ext}__`)
    )
  }
})
