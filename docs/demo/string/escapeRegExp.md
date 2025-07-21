[[[demo
```ts
import { escapeRegExp } from 'parsnip-kit'

escapeRegExp('hello world')
// 'hello world'

escapeRegExp('${name}')
// '\\$\\{name\\}'

```
]]]