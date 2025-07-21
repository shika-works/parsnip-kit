import fs from 'fs'

const regExp = /(\/\/.*?(\n|\r))|(\/\*[\s\S]*?\*\/)/g

let code = fs.readFileSync('./dist/parsnip-kit.d.ts', 'utf8')

code = code.replace(regExp, '')

fs.writeFileSync('./dist/parsnip-kit.d.ts', code, 'utf8')
