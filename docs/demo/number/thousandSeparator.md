[[[demo
```ts
import { thousandSeparator } from 'parsnip-kit'

thousandSeparator(100) // '100'
thousandSeparator(1000) // '1,000'
thousandSeparator(10000) // '10,000'
thousandSeparator(1234567) // '1,234,567'
thousandSeparator(-1234567) // '-1,234,567'
thousandSeparator(1234.567) // '1,234.567'
thousandSeparator(1234.5678) // '1,234.567,8'
```
]]]