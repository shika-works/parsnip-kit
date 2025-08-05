# poll
[[[desc poll
  
]]]
[[[desc poll zh
  传入返回 `Promise` 的函数 `func` 和等待间隔 `wait` ，返回一个函数，它以固定间隔轮询异步任务，支持可配置的重试和运行时控制。

  可选参数 `options` 设置重试的配置，具体看[这里](#polloptions)。

  函数返回一个控制轮询的对象，具体看[这里](#pollresult)。
]]]
[[[desc poll ja
  `Promise` を返す関数 `func` と待機間隔 `wait` を渡し、固定間隔で非同期タスクをポーリングし、設定可能なリトライと実行時制御を提供する関数を返します。

  オプション引数 `options` でリトライ設定を行います。詳細は[こちら](#polloptions)。

  関数はポーリングを制御するオブジェクトを返します。詳細は[こちら](#pollresult)。
]]]
[[[version poll
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template poll

]]]
[[[template poll zh
T:函数 `func` 返回的 `Promise` 的`value` 类型
]]]
[[[template poll ja
T：関数 `func` が返す `Promise` の `value` の型
]]]
#### Arguments

[[[params poll

]]]
[[[params poll zh
func: 要轮询的异步函数
wait: 轮询间隔（毫秒）
options: 轮询配置
options.maxRetries: 失败时最大重试次数，轮询成功时内部重试次数计数就会被重置
options.sequential: 等待上一次执行完成后再开始下一次轮询
options.leading: 立即执行一次
options.onSuccess: 成功时的回调
options.onFailure: 失败时的回调
]]]
[[[params poll ja
func: ポーリング対象の非同期関数
wait: ポーリング間隔（ミリ秒）
options: ポーリング設定
options.maxRetries: 失敗時の最大リトライ回数。成功時にカウンターをリセット
options.sequential: 前回の実行が完了するまで次回を待機
options.leading: 直ちに 1 回実行
options.onSuccess: 成功時のコールバック
options.onFailure: 失敗時のコールバック
]]]

#### Returns

[[[returns poll

]]]

# PollOptions
      
[[[desc PollOptions

]]]
[[[desc PollOptions zh
`poll` 函数的参数 `options` 的类型。
]]]
[[[desc PollOptions ja
`poll` 関数の `options` パラメーターの型。
]]]

[[[version PollOptions
  
]]]

### Source

[[[source PollOptions
  
]]]

# PollResult
      
[[[desc PollResult

]]]
[[[desc PollResult zh
`poll` 函数的返回值类型。
]]]
[[[desc PollResult ja
`poll` 関数の戻り値の型。
]]]

[[[version PollResult
  
]]]

### Source

[[[source PollResult
  
]]]