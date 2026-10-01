[[[slice
# Changelog
]]]
[[[slice zh
# 变更日志
]]]
[[[slice ja
# 変更履歴
]]]

[[[slice
## v0.1.1
Fix the `concurrent` function so that the number of functions running at the same time never exceeds `limit`, and make it always resolve with the settled results instead of rejecting when a function fails.
]]]
[[[slice zh
## v0.1.1
修复 `concurrent` 函数，同时运行的函数数量不再超过 `limit`，并且当函数失败时始终以 settled 结果 resolve，而不是抛出异常。
]]]
[[[slice ja
## v0.1.1
`concurrent` 関数を修正し、同時に実行される関数の数が `limit` を超えないようにするとともに、関数が失敗した場合でも reject せずに settled な結果で resolve するようにしました。
]]]

[[[slice
## v0.1.0
Add functions isSubset, wait, shuffle and shuffleInPlace.
]]]
[[[slice zh
## v0.1.0
新增函数 isSubset、wait、shuffle、shuffleInPlace。
]]]
[[[slice ja
## v0.1.0
関数 isSubset、wait、shuffle、shuffleInPlace を追加しました。
]]]

[[[slice zh
## v0.0.7
修复 debounce 函数的 `options.immediate` 为 `true` 时，在重复调用时防抖处理后的函数时，没有立即触发的问题。
]]]
[[[slice ja
## v0.0.7
`options.immediate` が `true` の時にデバウンス処理された関数を繰り返し呼び出しても元の関数が再度即時実行されない debounce 関数の問題を修正する。
]]]
[[[slice
## v0.0.7
Fix the debounce function where the original function is not immediately executed again when the debounced function is repeatedly invoked while `options.immediate` is `true`.
]]]

[[[slice
## v0.0.6
Add functions isEmpty, isEmail, clamp, mapFields.
]]]
[[[slice zh
## v0.0.6
新增函数 isEmpty、isEmail、clamp、mapFields。
]]]
[[[slice ja
## v0.0.6
関数 isEmpty、isEmail、clamp、mapFields を追加。
]]]