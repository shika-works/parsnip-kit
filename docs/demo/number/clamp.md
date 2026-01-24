[[[demo
```ts
import { clamp } from 'parsnip-kit'

clamp(5, 0, 10) // 5
clamp(-5, 0, 10) // 0
clamp(15, 0, 10) // 10

clamp(100) // 100
```
]]]