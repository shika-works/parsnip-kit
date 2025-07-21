[[[demo
```ts
import { pascalCase } from 'parsnip-kit'

pascalCase('HelloWorld') // 'HelloWorld'
pascalCase('helloWorld') // 'HelloWorld'
pascalCase('hello-world') // 'HelloWorld'
pascalCase('hello_world') // 'HelloWorld'
pascalCase('HELLO_WORLD') // 'HelloWorld'
pascalCase('Hello World') // 'HelloWorld'
pascalCase('-_HELLO World -_') // 'HelloWorld'
```
]]]