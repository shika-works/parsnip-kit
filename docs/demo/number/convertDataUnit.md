[[[demo
```ts
import { convertDataUnit } from 'parsnip-kit'

convertDataUnit(1, 'B', 'bit', 'binary') // 8
convertDataUnit(1, 'B', 'bit', 'decimal') // 8

convertDataUnit(1024, 'B', 'KB', 'binary') // 1
convertDataUnit(1000, 'B', 'KB', 'decimal') // 1

```
]]]