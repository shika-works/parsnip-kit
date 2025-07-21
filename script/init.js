import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'

const rootDir = path.resolve('.')
console.log(rootDir)
const packagesDir = path.join(rootDir, 'packages')
const docsDir = path.join(rootDir, 'docs')

if (!fs.existsSync(packagesDir)) {
  fs.mkdirSync(packagesDir)
}
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir)
}

const getPackageModules = () => {
  return fs.readdirSync(packagesDir).filter((file) => {
    return fs.statSync(path.join(packagesDir, file)).isDirectory()
  })
}

const getDocsSubDirs = () => {
  return fs.readdirSync(docsDir).filter((file) => {
    return fs.statSync(path.join(docsDir, file)).isDirectory()
  })
}

const getSelectedModule = async () => {
  const modules = getPackageModules()

  const choices = modules.map((module) => ({
    name: module,
    value: module
  }))

  choices.push({
    name: 'Create a new module',
    value: 'new'
  })

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'module',
      message: 'Please select or create a module:',
      choices: choices
    }
  ])

  if (answers.module === 'new') {
    const newModuleAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'newModuleName',
        message: 'Please enter the name of the new module:',
        validate: (input) => {
          if (/^[a-zA-Z]+$/.test(input)) {
            return true
          }
          return 'Module name must be in English'
        }
      }
    ])

    return newModuleAnswer.newModuleName
  }

  return answers.module
}

const getFunctionName = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'functionName',
      message: 'Please enter the function name:',
      validate: (input) => {
        if (/^[a-zA-Z]+$/.test(input)) {
          return true
        }
        return 'Function name must be in English'
      }
    }
  ])

  return answers.functionName
}

const createFunctionTemplate = (moduleName, functionName) => {
  const modulePath = path.join(packagesDir, moduleName)

  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath)
  }

  const filePath = path.join(modulePath, `${functionName}.ts`)

  const templateContent = fs
    .readFileSync('./script/template/func.txt', 'utf-8')
    .replaceAll('[[[function]]]', functionName)

  fs.writeFileSync(filePath, templateContent)

  console.log(`Function was created: ${filePath}`)
}

const createDocsTemplate = (moduleName, functionName) => {
  const subDirs = getDocsSubDirs()

  subDirs.forEach((dirName) => {
    const subDirPath = path.join(docsDir, dirName)
    const moduleDocsPath = path.join(subDirPath, moduleName)

    if (!fs.existsSync(moduleDocsPath)) {
      fs.mkdirSync(moduleDocsPath, { recursive: true })
    }

    const docPath = path.join(moduleDocsPath, `${functionName}.md`)
    switch (dirName) {
      case 'doc': {
        const templateContent = fs
          .readFileSync('./script/template/doc.txt', 'utf-8')
          .replaceAll('[[[function]]]', functionName)
        fs.writeFileSync(docPath, templateContent)

        console.log(`Document was created: ${docPath}`)
        break
      }
      case 'demo': {
        const templateContent = fs
          .readFileSync('./script/template/demo.txt', 'utf-8')
          .replaceAll('[[[function]]]', functionName)
        fs.writeFileSync(docPath, templateContent)

        console.log(`Document was created: ${docPath}`)
        break
      }
      default:
        break
    }
  })
}

;(async () => {
  try {
    console.log(`\n\n✨Start creating a function for parsnip-kit`)
    const moduleName = await getSelectedModule()
    const functionName = await getFunctionName()

    createFunctionTemplate(moduleName, functionName)
    createDocsTemplate(moduleName, functionName)

    console.log(
      `🎉Successfully created the function template and documentation template for ${moduleName}/${functionName}`
    )
  } catch (error) {
    console.error('Error was happened:', error)
  }
})()
