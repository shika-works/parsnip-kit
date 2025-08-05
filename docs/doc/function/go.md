# go
[[[desc go
  
]]]
[[[desc go zh
  模仿 Go 语言的错误处理风格，执行一个函数（异步或普通），返回一个 fulfilled 的 `Promise`，其值在成功时为 `[Awaited<result>, null]`，在失败时为 `[null, error]`。
]]]
[[[desc go ja
この関数は Go 言語のエラー処理スタイルを模倣し、同期または非同期の関数を実行し、fulfilled 状態の `Promise` を返します。成功時はその値が `[Awaited<result>, null]` で、失敗時はその値が `[null, error]` です。
]]]
[[[version go
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template go
]]]
[[[template go zh
T: 函数返回值的类型
U: 错误的类型（默认为 `any`）
]]]
[[[template go ja
T: 関数の戻り値の型
U: エラーの型（デフォルトは`any`）
]]]

#### Arguments

[[[params go
]]]
[[[params go zh
func: 要执行的函数
]]]
[[[params go ja
func: 実行する関数
]]]

#### Returns

[[[returns go

]]]
