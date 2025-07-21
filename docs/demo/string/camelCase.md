[[[demo
```ts
import { camelCase } from 'parsnip-kit'

camelCase('HelloWorld') // 'helloWorld'
camelCase('helloWorld') // 'helloWorld'
camelCase('hello-world') // 'helloWorld'
camelCase('hello_world') // 'helloWorld'
camelCase('HELLO_WORLD') // 'helloWorld'
camelCase('Hello World') // 'helloWorld'
camelCase('-_HELLO World -_') // 'helloWorld'
```
]]]