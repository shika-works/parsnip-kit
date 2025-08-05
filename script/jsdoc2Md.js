// Modify From
// Copyright (c) 2024 chouchouji
// Original Project: @binbinji/jsdoctomd
// Project URL: https://github.com/chouchouji/jsdoctomd.git
// License: MIT

import fs from 'fs'
import { parse } from 'comment-parser'
import esprima from 'esprima'

function formatType(types) {
  if (types.includes('|')) {
    return types.split('|').map((type) => type.trim())
  }
  return [types]
}

function transitParagraph(templateContent, regExp, lang, generateContent) {
  let templateFile = templateContent
  const matchDesc = [...templateFile.matchAll(regExp)]
  if (matchDesc.length) {
    let langItemArr, defaultItemArr
    matchDesc.forEach((matchItem) => {
      const matchContentArr = matchItem[1].split(/\n|\r\n/).map((e) => e.trim())
      matchContentArr.index = matchItem.index
      matchContentArr.content = matchItem[1]
      const langToken = matchContentArr.shift()
      matchContentArr.type = langToken
      if (lang && langToken === lang) {
        langItemArr = matchContentArr
      } else if (langToken === '') {
        defaultItemArr = matchContentArr
      }
    })
    const validItemArr = langItemArr || defaultItemArr
    matchDesc.forEach((matchItem) => {
      templateFile = templateFile.replace(
        matchItem[0],
        matchItem.index === validItemArr.index
          ? generateContent(validItemArr)
          : ''
      )
    })
  }
  return templateFile
}

function transitDemo(templateContent, regExp, generateContent) {
  let templateFile = templateContent
  const matchDesc = [...templateFile.matchAll(regExp)]
  if (matchDesc.length) {
    matchDesc.forEach((matchItem) => {
      const matchContentArr = matchItem[1].split(/\n|\r\n/).map((e) => e.trim())
      matchContentArr.index = matchItem.index
      matchContentArr.content = matchItem[1]
      const langToken = matchContentArr.shift()
      matchContentArr.type = langToken
      templateFile = templateFile.replace(
        matchItem[0],
        generateContent(matchContentArr)
      )
    })
  }
  return templateFile
}

function generateMD(func) {
  let { templateFile } = func
  const {
    templates,
    version,
    functionName,
    description,
    content,
    args,
    returnType,
    lang,
    path
  } = func

  const descReg = new RegExp(
    `\\[\\[\\[desc ${functionName}[ \\n]{1}([\\d\\D]*?)\\]\\]\\]`,
    'g'
  )
  templateFile = transitParagraph(
    templateFile,
    descReg,
    lang,
    (validItemArr) => validItemArr.join('\n').trim() || description
  )

  const versionReg = new RegExp(
    `\\[\\[\\[version ${functionName}[ \\n]{1}([\\d\\D]*?)\\]\\]\\]`,
    'g'
  )
  templateFile = transitParagraph(templateFile, versionReg, lang, () =>
    version ? `\n\n> Added in v${version}\n\n` : ''
  )

  const demoReg = new RegExp(`\\[\\[\\[demo([\\d\\D]*?)\\]\\]\\]`, 'g')
  templateFile = transitDemo(templateFile, demoReg, (validItemArr) => {
    const demoContent = fs.readFileSync(
      path.replace('/doc/', '/demo/'),
      'utf-8'
    )
    const match = demoContent.match(
      new RegExp(
        `\\[\\[\\[demo${validItemArr.type ? ` ${validItemArr.type}` : ''}([\\d\\D]*?)\\]\\]\\]`
      )
    )
    return match?.[1] || ''
  })

  const templateReg = new RegExp(
    `\\[\\[\\[template ${functionName}[ \\n]{1}([\\d\\D]*?)\\]\\]\\]`,
    'g'
  )
  templateFile = transitParagraph(
    templateFile,
    templateReg,
    lang,
    (validItemArr) => {
      const dict = {}
      if (validItemArr.content) {
        const rows = validItemArr.content.trim().split(/\n|\r\n/)
        rows.forEach((row) => {
          const idx = row.indexOf(':')
          if (idx === -1) {
            return
          }
          const key = row.slice(0, idx)
          const value = row.slice(idx + 1)
          dict[key.trim()] = value.trim()
        })
      }
      const text = templates?.length
        ? `\n\n| Arg | Type | Description |\n| --- | --- | --- |\n${templates
            .map(
              (item) =>
                `| \`${item.name}\` | ${
                  '`' + (formatType(item.type).join(' \\| ') || ' ') + '`'
                } | ${dict[item.name] || item.desc} |`
            )
            .join('\n')}\n\n`
        : ''

      return text
    }
  )

  const paramsReg = new RegExp(
    `\\[\\[\\[params ${functionName}[ \\n]{1}([\\d\\D]*?)\\]\\]\\]`,
    'g'
  )
  templateFile = transitParagraph(
    templateFile,
    paramsReg,
    lang,
    (validItemArr) => {
      const dict = {}
      if (validItemArr.content) {
        const rows = validItemArr.content.trim().split(/\n|\r\n/)
        rows.forEach((row) => {
          const idx = row.indexOf(':')
          if (idx === -1) {
            return
          }
          const key = row.slice(0, idx)
          const value = row.slice(idx + 1)
          dict[key.trim()] = value.trim()
        })
      }
      const text = args?.length
        ? `\n\n| Arg | Type | Optional | Default | Description |\n| --- | --- | --- | --- | --- |\n${args
            .map(
              (item) =>
                `| \`${item.name}\` | ${
                  '`' + formatType(item.type).join(' \\| ') + '`'
                } | \`${item.optional}\` | \`${item.default}\` | ${
                  dict[item.name] || item.desc
                } |`
            )
            .join('\n')}\n\n`
        : ''

      return text
    }
  )

  const returnsReg = new RegExp(
    `\\[\\[\\[returns ${functionName}[ \\n]{1}([\\d\\D]*?)\\]\\]\\]`,
    'g'
  )
  templateFile = transitParagraph(templateFile, returnsReg, lang, () => {
    return returnType
      ? `\n\n| Type |\n| ---  |\n| \`${returnType}\`  |\n\n`
      : ''
  })

  const sourceReg = new RegExp(
    `\\[\\[\\[source ${functionName}[ \\n]{1}([\\d\\D]*?)\\]\\]\\]`,
    'g'
  )
  templateFile = transitParagraph(templateFile, sourceReg, lang, () => {
    return `\n\n\`\`\`ts\n${content}\`\`\``
  })
  return templateFile
}

function getFormatJsdoc(comment) {
  if (!comment) {
    return {}
  }
  const [jsdoc] = parse(comment, { spacing: 'preserve' })
  const returns = jsdoc.tags.find((item) => item.tag === 'returns')
  const version = jsdoc.tags.find((item) => item.tag === 'version')
  const templates =
    jsdoc.tags
      .filter((item) => item.tag === 'template')
      ?.map((item) => {
        const ans = {
          name: item.name,
          type: item.type,
          optional: item.optional,
          default: item.default,
          desc: item.description
        }
        return ans
      }) || ''
  const args = jsdoc.tags
    .filter((item) => item.tag === 'param')
    .map((item) => {
      const ans = {
        name: item.name,
        type: item.type,
        optional: item.optional,
        default: item.default,
        desc: item.description
      }
      return ans
    })
  const funcDesc = jsdoc.description
  const ans = {
    description: funcDesc,
    returnType: returns
      ? returns.type
        ? returns.type.replace(/\|/g, '\\|')
        : 'void'
      : '',
    args,
    templates,
    version: version
      ? [version.name, version.description].filter(Boolean).join(' ')
      : ''
  }
  return ans
}
function getFunctionName(content) {
  const tokens = esprima.tokenize(content)
  let functionName = ''
  let lastToken = { type: '', value: '' }
  let tokenType = 'variable'
  for (let i = 0; i < tokens.length; i++) {
    if (i >= 1) {
      lastToken = tokens[i - 1]
    }
    const { type, value } = lastToken
    const isFunction2 =
      (type === 'Keyword' && ['function', 'const'].includes(value)) ||
      (type === 'Identifier' && ['interface', 'type'].includes(value))
    if (tokens[i].type === 'Identifier' && isFunction2) {
      functionName = tokens[i].value
      if (type === 'Identifier' && ['interface', 'type'].includes(value)) {
        tokenType = 'type'
      }
      break
    }
  }
  return {
    functionName,
    type: tokenType
  }
}
function parseFile(file) {
  const codes = file.split(/\r\n|\n/)
  const length = codes.length - 1
  const result = []
  let comment = ''
  let content = ''
  codes.forEach((code, idx) => {
    if (code === '/**' || idx === length) {
      if (content || comment) {
        result.push({
          comment,
          content
        })
      }
      comment = '/**\n'
      content = ''
    } else if (
      comment &&
      (code == ' *' || code.startsWith(' * ') || code.startsWith(' */'))
    ) {
      comment += `${code}
`
    } else if (
      !(code == ' *' || code.startsWith(' * ') || code.startsWith(' */'))
    ) {
      content += `${code}
`
    }
  })
  return result.filter(Boolean)
}
function jsdocToMD(options) {
  const { input, lang, template: templateFile, path } = options
  const parsedFiles = parseFile(input)
  const md = parsedFiles.reduce((pre, file) => {
    const { comment, content } = file
    const formatJsdoc = getFormatJsdoc(comment)
    const { functionName } = getFunctionName(content)
    if (!comment) {
      return pre
    }
    const ans = generateMD({
      ...formatJsdoc,
      lang,
      content,
      functionName,
      templateFile: pre,
      path
    }).trim()
    return ans
  }, templateFile)
  return md
}
export { jsdocToMD }
