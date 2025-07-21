# retry

[[[desc retry

]]]
[[[desc retry zh
接受一个返回`Promise`的函数`func`和重试次数`maxRetries`（默认为 3），返回一个调用该函数失败时重试的函数。

可选参数`options`设置重试的配置，具体看[这里](#retryoptions)。
]]]

[[[version retry
  
]]]

### Usage

[[[demo]]]


### API

#### Type Parameter

[[[template retry

]]]
[[[template retry zh
T:函数`func`返回的`Promise`的`value`类型
]]]

#### Arguments

[[[params retry

]]]
[[[params retry zh
func: 要重试的异步任务函数，必须返回一个`Promise`
maxRetries: 最大重试次数
options: 配置选项
options.delay: 重试的初始延迟时间（毫秒）
options.delayFactor:延迟时间的递增因子（每次重试时延迟时间乘以该值）
options.shouldRetry:决定是否重试的回调函数
options.onSuccess:任务成功时的回调函数
options.onFailure:任务失败时的回调函数
]]]

#### Returns

[[[returns retry

]]]

# RetryOptions
      
[[[desc RetryOptions

]]]
[[[desc RetryOptions zh
`retry`函数的参数`options`的类型。
]]]

[[[version RetryOptions
  
]]]

### Source

[[[source RetryOptions
  
]]]