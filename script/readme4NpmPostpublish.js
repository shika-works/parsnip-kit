import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function safeRename(src, dest) {
  await fs.rename(src, dest)
}

async function main() {
  const rootDir = path.resolve(__dirname, '..')

  await safeRename(
    path.join(rootDir, '__README_TEMP__'),
    path.join(rootDir, 'README.md')
  )

  const files = await fs.readdir(rootDir)
  for (const file of files) {
    const match = file.match(/^__README_(\w+)__$/)
    if (match) {
      const ext = match[1].toLowerCase()
      await safeRename(
        path.join(rootDir, file),
        path.join(rootDir, `README.${ext}.md`)
      )
    }
  }
}

main()
