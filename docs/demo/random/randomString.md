[[[demo
```ts
import { randomString } from 'parsnip-kit'

randomString(10)
// a string including uppercase letters, lowercase letters, numbers, for example 'Dij1mzPzyW'

randomString(10, { number: false })
// a string only including letters, for example 'iYyyWSReNw'

randomString(10, { uppercase: false, lowercase: false })
// a string only including numbers, for example '2398543147'

randomString(10, { symbol: true })
// a string including uppercase letters, lowercase letters, numbers and symbols
// for example 'gI(CThCMK%'

randomString(
  10,
  {
    uppercase: false, lowercase: false, number: false,
    customized: 'αβγδεζηθικλμνξοπρστυφχψω'
  }
)
// a string only including lowercase Greek letters, for example 'γμχβωζπθοχ'
```
]]]