# curry
[[[desc curry

]]]

[[[version curry
  
]]]
### Usage

```typescript
import { curry } from 'parsnip-kit'

function add(a, b) { return a + b }

const curriedAdd = curry(add)
curriedAdd(2)(3) // 5
curriedAdd(2, 3) // 5

function greet(name, greeting = 'Hello') { return `${greeting}, ${name}!` }

const curriedGreet = curry(greet)
curriedGreet('Alice', 'Hi') // 'Hi, Alice!'
curriedGreet('Bob') // 'Hello, Bob!'
```



### API

#### Arguments

[[[params curry

]]]

#### Returns

[[[returns curry

]]]