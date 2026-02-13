import fs from 'fs'

const newItems = ['shuffle', 'shuffleInPlace', 'isSubset', 'wait']

const dfs = (
  files: any,
  prefix: string[],
  container: any[],
  titleMap: Record<string, string>,
  additionMap?: Record<string, string>
) => {
  files.forEach((file: string) => {
    if (file === '.vitepress' || file === 'index.md') {
      return
    }
    const fullPath = prefix.join('/') + `/${file}`
    if (fs.statSync(fullPath).isDirectory()) {
      const curFiles = fs.readdirSync(fullPath)
      prefix.push(file)
      const curContainer: any[] = []
      const add = additionMap?.[file]

      container.push({
        key: file,
        text:
          titleMap[file] ||
          file.charAt(0).toUpperCase() + file.slice(1) + (add ? `  ${add}` : ''),
        items: curContainer,
        collapsible: true,
        collapsed: false
      })
      dfs(curFiles, prefix, curContainer, titleMap)
      prefix.pop()
    } else {
      const [fileName, ext] = file.split('.')
      if (ext !== 'md') {
        return
      }
      const add = additionMap?.[fileName]
      container.push({
        text:
          (titleMap[fileName] || fileName + (add ? `  ${add}` : '')) +
          (newItems.includes(fileName)
            ? `<span class="VPBadge tip" style="color: rgb(0, 174, 236)">NEW!</span>`
            : ''),
        link: '/' + prefix.slice(1).join('/') + `/${fileName}`,
        key: fileName
      })
    }
  })
}

const order = [
  'guide',
  'object',
  'array',
  'statistic',
  'number',
  'function',
  'async',
  'string',
  'validator',
  'typed',
  'random',
  'common'
]

const guideOrder = ['intro', 'starting', 'changelog']

export const dfs4Md = (
  lang: string,
  titleMap: Record<string, string>,
  additionMap?: Record<string, string>
) => {
  const ans: any[] = []
  const files = fs.readdirSync('wiki/' + lang)
  dfs(files, ['wiki', lang], ans, titleMap, additionMap)
  const orderedAns: any[] = []
  order.forEach((e) => {
    const entity = ans.find((item) => item.key?.toLowerCase() === e)
    if (entity) {
      orderedAns.push(entity)
    }
  })
  const guidePages = orderedAns.find((e) => e.key?.toLowerCase() === 'guide')
  const cloned = [...guidePages.items]
  guidePages.items = []

  guideOrder.forEach((e) => {
    const entity = cloned.find((item) => item.key?.toLowerCase() === e)
    if (entity) {
      guidePages.items.push(entity)
    }
  })

  return orderedAns
}
