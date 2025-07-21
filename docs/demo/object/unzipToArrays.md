[[[demo
```ts
import { unzipToArrays } from 'parsnip-kit'

const obj = {
 Alex: 16,
 Bob: 659,
 Carter: 155,
 Daniel: 825
}
unzipToArrays(obj)
// [['Alex', 'Bob', 'Carter', 'Daniel'], [16, 659, 155, 825]]

unzipToArrays(obj, (_, key) => key.toUpperCase(), (value) => value + '')
// [['ALEX', 'BOB', 'CARTER', 'DANIEL'], ['16', '659', '155', '825']]

```
]]]