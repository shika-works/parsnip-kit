# pick
[[[desc pick
]]]
[[[desc pick zh
返回从对象或数组中，提取指定的键或索引的新对象或者数组，返回值是普通对象或数组，不会修改入参。
]]]
[[[desc pick ja
入力されたオブジェクトまたは配列から指定されたキーまたはインデックスを抽出し、新しいオブジェクトまたは配列を返します。戻り値はプレーンオブジェクトまたは配列であり、元の入力は変更されません。
]]]

[[[version pick
  
]]]
### Usage

```typescript
import { pick } from 'parsnip-kit'

const obj = { a: 1, b: 2, c: 3 }
const keys0 = ['a', 'c'] as const
const result0 = pick(obj, keys0)
// Pick<{ a: number; b: number; c: number; }, "a" | "c">
// { a: 1, c: 3 }

const arr = [1, 2, 3, 4]
const keys1 = ['1', '[3]'] as const
const result1 = pick(obj, keys1)
// Pick<number[], 1 | 3>
// [2, 4]
```


### API

#### Type Parameter
[[[template pick

]]]
[[[template pick zh
T:待处理对象的类型
R:字段路径数组类型
]]]
[[[template pick ja
T:処理するオブジェクトの型
R:フィールドパスの配列型
]]]
#### Arguments
[[[params pick

]]]
[[[params pick zh
obj:待处理的对象或数组
keys:需要提取的键或数组索引
]]]
[[[params pick ja
obj:処理するオブジェクトまたは配列
keys:抽出するキーまたは配列のインデックス
]]]
#### Returns
[[[returns pick

]]]
#### Reference

[KeyOrIndex](../common/types#keyorindex) [ExtractUnion](../common/types#extractunion)