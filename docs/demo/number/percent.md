[[[demo
```ts
import { percent } from 'parsnip-kit'

percent(50) // '50.00%'
percent(25, 100) // '25.00%'
percent(75, 200) // '37.50%'
percent(75, 200, 0) // '38%'
percent(0) // '0.00%'
```
]]]