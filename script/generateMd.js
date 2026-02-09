import fs from 'fs'
import { fileURLToPath } from 'url'
import { jsdocToMD } from './jsdoc2Md.js'

function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  const merged = []
  for (const interval of intervals) {
    if (merged[merged.length - 1] && merged[merged.length - 1][1] >= interval[0]) {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1]
      )
    } else {
      merged.push(interval)
    }
  }
  return merged
}

function calculateLineCoverage(coverageMap) {
  const statementMap = coverageMap.statementMap || {}
  const s = coverageMap.s || {}

  const interval = []
  const totalInterval = []

  Object.keys(statementMap).forEach((statementId) => {
    const statement = statementMap[statementId]
    const startLine = statement.start.line
    const endLine = statement.end.line

    const executionCount = s[statementId] || 0

    totalInterval.push([startLine, endLine])
    if (executionCount > 0) {
      interval.push([startLine, endLine])
    }
  })

  const intervalMerged = mergeIntervals(interval)
  const totalIntervalMerged = mergeIntervals(totalInterval)

  const coveredLines = intervalMerged.reduce(
    (pre, cur) => pre + cur[1] - cur[0] + 1,
    0
  )
  const totalLines = totalIntervalMerged.reduce(
    (pre, cur) => pre + cur[1] - cur[0] + 1,
    0
  )

  const lineCoverage = (coveredLines / totalLines) * 100 || 0

  return lineCoverage
}

function insertCoverage(output, fileData) {
  const idx = output.indexOf('\n')
  const statement =
    (Object.keys(fileData.s).filter((key) => fileData.s[key] > 0).length /
      Object.keys(fileData.statementMap).length) *
    100
  const branch =
    (Object.keys(fileData.b).filter((key) => fileData.b[key][0] > 0).length /
      Object.keys(fileData.branchMap).length) *
    100
  const fn =
    (Object.keys(fileData.f).filter((key) => fileData.f[key] > 0).length /
      Object.keys(fileData.fnMap).length) *
    100
  const line = calculateLineCoverage(fileData)

  return (
    output.replace('\r\n', '\n').slice(0, idx) +
    `\n\n![Static Badge](https://img.shields.io/badge/Coverage-${
      ((statement + branch + fn + line) / 4).toFixed(2) + '%'
    }-FF8C00)\n\n` +
    output.slice(idx)
  )
}

function generateMD(lang, testReport) {
  const codePath = fileURLToPath(new URL('../packages', import.meta.url))
  const docsPath = fileURLToPath(
    new URL('../wiki' + (!lang ? '' : '/' + lang), import.meta.url)
  )
  const templatePath = fileURLToPath(new URL('../docs/doc', import.meta.url))
  const docFiles = fs.readdirSync(templatePath)

  const dfs = (fileNames, prefixPath = []) => {
    fileNames.forEach((file) => {
      const [fileName, extname] = file.split('.')

      const fullCodePath = `${codePath}/${prefixPath.join('/')}${
        prefixPath.length ? '/' : ''
      }${fileName}.ts`

      const fullTemplatePath = `${templatePath}/${prefixPath.join('/')}${prefixPath.length ? '/' : ''}/${file}`

      if (fs.statSync(fullTemplatePath).isDirectory()) {
        const nextFileNames = fs.readdirSync(fullTemplatePath)
        prefixPath.push(file)
        dfs(nextFileNames, prefixPath)
        prefixPath.pop()
      } else {
        if (file.endsWith('.test.ts')) {
          return
        }

        let template = fs.readFileSync(fullTemplatePath, 'utf-8')
        template =
          jsdocToMD({
            input: fs.existsSync(fullCodePath)
              ? fs.readFileSync(fullCodePath, 'utf-8')
              : '',
            extname,
            lang,
            needContent: fullCodePath.includes('/common/'),
            template,
            path: fullTemplatePath.replace(/\\/g, '/')
          }) || template

        const linuxPath = fullCodePath.replace(/\\/g, '/')
        const windowsPath = fullCodePath.replace(/\//g, '\\')
        const fileData =
          testReport.coverageMap[linuxPath] || testReport.coverageMap[windowsPath]

        if (fileData && !linuxPath.includes('/packages/common/')) {
          template = insertCoverage(template, fileData)
        }
        const dirPath = `${docsPath}/${prefixPath.join('/')}`
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath)
        }
        fs.writeFileSync(`${dirPath}/${fileName}.md`, template)
      }
    })
  }

  dfs(docFiles)
}

const data = JSON.parse(fs.readFileSync('coverage/coverage.json'))

;['en', 'zh', 'ja'].forEach((item) => {
  generateMD(item, data)
})
