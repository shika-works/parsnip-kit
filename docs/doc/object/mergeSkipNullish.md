# mergeSkipNullish
[[[desc mergeSkipNullish
  
]]]
[[[desc mergeSkipNullish zh
  从左到右合并多个对象，形成一个新的对象。

  前面对象中非 `null` 或 `undefined` 的字段不会被后面的 `null` 或 `undefined` 的字段覆盖。
]]]
[[[desc mergeSkipNullish ja
  左から右に複数のオブジェクトをマージして新しいオブジェクトを形成します。

  先のオブジェクトの `null` または `undefined` でないフィールドは、後のオブジェクトの `null` または `undefined` のフィールドによって上書きされません。
]]]
[[[version mergeSkipNullish
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template mergeSkipNullish

]]]
[[[template mergeSkipNullish zh
T: 要合并的对象的类型
]]]
[[[template mergeSkipNullish ja
T: マージするオブジェクトの型
]]]

#### Arguments

[[[params mergeSkipNullish

]]]
[[[params mergeSkipNullish zh
objs: 要合并的对象
]]]
[[[params mergeSkipNullish ja
objs: マージするオブジェクト
]]]

#### Returns

[[[returns mergeSkipNullish

]]]

#### Type Definition 
```ts
{
  <T extends object, U extends object>(
    a: T | Nullish, b: U | Nullish
  ): SpreadSkipNullish<T, U>
  <T extends object, U extends object, V extends object>(
    a: T | Nullish, b: U | Nullish, c: V | Nullish
  ): SpreadSkipNullish<SpreadSkipNullish<T, U>, V>
  <T extends object, U extends object, V extends object, W extends object>(
    a: T | Nullish, b: U | Nullish, c: V | Nullish, d: W | Nullish
  ): SpreadSkipNullish<SpreadSkipNullish<SpreadSkipNullish<T, U>, V>, W>
  (...objs: any[]): any
}
```


#### Reference
[Nullish](../common/types#nullish) [SpreadSkipNullish](../common/types#spreadskipnullish)