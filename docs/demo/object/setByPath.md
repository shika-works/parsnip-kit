[[[demo
```ts
import { setByPath } from 'parsnip-kit'

const test0 = {}
setByPath(test0, 'a', 1) // { a: 1 }

const test1 = []
setByPath(test1, '[0]', 1) // [1]

const test2 = {}
setByPath(test2, '[0]', 1) // { 0: 1 }

const test3 = {}
setByPath(test3, 'b[2]', 2) // { b: [<empty>, <empty>, 2] }

const test4 = { a: 1 }
setByPath(test4, 'a[0]', 'test') // { a: ['test'] }

const test5 = { a: 1 }
setByPath(test5, 'b', 2) // { a: 1, b: 2 }
```
]]]