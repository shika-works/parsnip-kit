# PrimitiveType
[[[desc PrimitiveType

]]]
[[[desc PrimitiveType zh
基本类型，由`number`、`string`、`boolean`、`undefined`、`null`、`bigint`、`symbol`组成。
]]]

[[[version PrimitiveType
  
]]]

### Source
[[[source PrimitiveType
  
]]]
# NumberString
[[[desc NumberString

]]]
[[[desc NumberString zh
由数字组成的字符串。
]]]

[[[version NumberString
  
]]]

### Source
[[[source NumberString
  
]]]

# PseudoArray
[[[desc PseudoArray
]]]
[[[desc PseudoArray zh
伪数组（Pseudo-array），也被称为类数组对象（Array-like Object），即具有数值型 `length` 属性的对象。
]]]
[[[desc PseudoArray ja
疑似配列（Pseudo-array）とは、数値型の `length` プロパティを持つオブジェクトであり、配列のようなオブジェクト（Array-like Object）とも呼ばれます。
]]]

[[[version PseudoArray
  
]]]

### Source
[[[source PseudoArray
  
]]]

# ObjectLike
[[[desc ObjectLike

]]]
[[[desc ObjectLike zh
非函数对象。
]]]

[[[version ObjectLike
  
]]]

### Source
[[[source ObjectLike
  
]]]
# ExtractUnion
[[[desc ExtractUnion

]]]
[[[desc ExtractUnion zh
从元组中提取联合类型。
]]]

[[[version ExtractUnion
  
]]]

### Source
[[[source ExtractUnion
  
]]]
# KeyOrIndex
[[[desc KeyOrIndex

]]]
[[[desc KeyOrIndex zh
从形如 [${number}] 或 ${number} 的字符串中提取数字。其他情况则返回原始字符串。
]]]

[[[version KeyOrIndex
  
]]]

### Source
[[[source KeyOrIndex
  
]]]
# Tail
[[[desc Tail

]]]
[[[desc Tail zh
获取元组类型最后一个元素。
]]]

[[[version Tail
  
]]]

### Source
[[[source Tail
  
]]]
# Head
[[[desc Head

]]]
[[[desc Head zh
获取元组类型第一个元素。
]]]

[[[version Head
  
]]]

### Source
[[[source Head
  
]]]
# Edge
[[[desc Edge

]]]
[[[desc Edge zh
获取元组`T`首端或者末端的元素，由类型`D`决定。
]]]

[[[version Edge
  
]]]

### Source
[[[source Edge
  
]]]
# EdgeReverse
[[[desc EdgeReverse

]]]
[[[desc EdgeReverse zh
和`Edge`类似，但是`D`取值`'left'`或者`'right'`时效果反过来。
]]]

[[[version EdgeReverse
  
]]]

### Source
[[[source EdgeReverse
  
]]]
# EmptyOrParameters
[[[desc EmptyOrParameters

]]]
[[[desc EmptyOrParameters zh
返回函数的参数值类型，若非函数返回`never[]`类型。
]]]

[[[version EmptyOrParameters
  
]]]

### Source
[[[source EmptyOrParameters
  
]]]
# EmptyOrReturnType
[[[desc EmptyOrReturnType

]]]
[[[desc EmptyOrReturnType zh
返回函数的返回值类型，若非函数返回`void`类型。
]]]

[[[version EmptyOrReturnType
  
]]]

### Source
[[[source EmptyOrReturnType
  
]]]
# WithFallback
[[[desc WithFallback

]]]
[[[desc WithFallback zh
返回函数 `T` 的返回值类型，如果是 `null` 或者 `undefined` 则返回默认值类型 `R`。
]]]
[[[desc WithFallback ja
型 `T` の結果を返すか、結果が `null` または `undefined` の場合にデフォルト値の型 `R` を返します。
]]]

[[[version WithFallback
  
]]]

### Source
[[[source WithFallback
  
]]]
# LiteralStringWithFallback
[[[desc LiteralStringWithFallback

]]]
[[[desc LiteralStringWithFallback zh
当字符串类型 `T` 太宽泛（例如 `string`）时，此类型会提供一个默认字符串值 `R`。

它可以确保类型安全，在给配置对象或者可选参数设置默认值时非常有用。
]]]
[[[desc LiteralStringWithFallback ja
文字列型 `T` が広範囲（例えば `string`）の場合、この型はデフォルトの文字列値 `R` を提供します。

これは、構成オブジェクトやオプションのパラメータなどのシナリオで型の安全性を確保しながら、柔軟性も確保します。
]]]

[[[version LiteralStringWithFallback
  
]]]

### Source
[[[source LiteralStringWithFallback
  
]]]
# MappedTypeByKeyOrIndex
[[[desc MappedTypeByKeyOrIndex
]]]
[[[desc MappedTypeByKeyOrIndex zh
根据输入的字符串或数字索引 `T` 来生成普通对象或数组类型，该索引指向类型 `V`，类型 `O` 控制值是否可选。
]]]
[[[desc MappedTypeByKeyOrIndex ja
入力文字列/数値インデックス `T` に基づいて、平たく単純なオブジェクトまたは配列の型を生成し、そのインデックスが型 `V` を指し、型 `O` が値のオプション性を制御します。
]]]

[[[version MappedTypeByKeyOrIndex
  
]]]

### Source
[[[source MappedTypeByKeyOrIndex
  
]]]
# DeepMappedTypeByKeyOrIndex
[[[desc DeepMappedTypeByKeyOrIndex

]]]
[[[desc DeepMappedTypeByKeyOrIndex zh
递归地解析字段路径 `T` 并创建嵌套普通对象或数组，它可以解析类似 `"data.[0].name"` 这样的嵌套路径字符串，路径末端的字段指向值 `V`。`O` 控制值是否可选。

在基于字符串模板创建复杂的嵌套类型时非常有用。
]]]
[[[desc DeepMappedTypeByKeyOrIndex ja
フィールドパス `T` を再帰的に解析し、ネストされた平たく単純なオブジェクトまたは配列を作成します。`"data.[0].name"` のようなネストされたパス文字列を解釈し、パスの末端フィールドが値 `V` を指します。`O` が値がオプションかどうかを決定します。

これは、文字列テンプレートに基づいて複雑なネストされた型を作成するのに非常に役立ちます。
]]]

[[[version DeepMappedTypeByKeyOrIndex
  
]]]

### Source
[[[source DeepMappedTypeByKeyOrIndex
  
]]]

# DataUnit
[[[desc DataUnit
]]]
[[[desc DataUnit zh
`DataUnit` 类型表示数据大小的不同单位。
]]]
[[[desc DataUnit ja
`DataUnit` 型は、デジタルデータの異なる単位を表します。
]]]

[[[version DataUnit
  
]]]

### Source
[[[source DataUnit
  
]]]

# Nullish
[[[desc Nullish
]]]
[[[desc Nullish zh
`Nullish` 类型表示值为 `null` 或 `undefined` 的类型。
]]]
[[[desc Nullish ja
`Nullish` 型は、値が `null` または `undefined` の場合を表します。
]]]

[[[version Nullish
  
]]]

### Source
[[[source Nullish
  
]]]

# SpreadSkipNullish
[[[desc SpreadSkipNullish
]]]
[[[desc SpreadSkipNullish zh
  从左到右合并多个类型，形成一个新的对象类型。

  前面对象中非 `null` 或 `undefined` 的字段不会被后面的 `null` 或 `undefined` 的字段覆盖。
]]]
[[[desc SpreadSkipNullish ja
  左から右に複数の型をマージして新しいオブジェクトの型を形成します。

  先のオブジェクトの `null` または `undefined` でないフィールドは、後のオブジェクトの `null` または `undefined` のフィールドによって上書きされません。
]]]

[[[version SpreadSkipNullish
  
]]]

### Source
[[[source SpreadSkipNullish
  
]]]