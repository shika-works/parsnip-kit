import { describe, it, expect } from 'vitest'
import * as main from '../main'

const excludeKeys = ['cloneNotCollectionObject']

describe('escapeRegExp', () => {
  it('main.ts exports all functions', async () => {
    // @ts-ignore
    const files = import.meta.glob('../**/*.ts')
    const varSet = new Set<string>()
    const exports = Object.keys(files)
      .map(async (filename: string) => {
        if (
          filename.includes('.test.ts') ||
          filename === '../main.ts' ||
          filename.includes('../__share__/')
        ) {
          return
        }
        return files[filename]()
      })
      .filter(Boolean)
    const exportsRes = await Promise.all(exports)
    exportsRes.forEach((exportEntry: Record<string, any>) => {
      if (exportEntry) {
        Object.keys(exportEntry).forEach((key) => {
          if (!excludeKeys.includes(key)) {
            varSet.add(key)
          }
        })
      }
    })

    const keysOfMain = Object.keys(main)

    expect(keysOfMain.length).eq(varSet.size)
    expect(keysOfMain.every((key) => varSet.has(key))).eq(true)
  })
})
