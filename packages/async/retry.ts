/**
 * Accepts a function `func` that returns a `Promise` and a `maxRetries` parameter (defaulting to 3), returning a function that retries the invocation of the given function upon failure.
 *
 * The optional parameter `options` sets up the retry configuration, details of which can be found [here](#retryoptions).
 *
 * @template {} T  Type of the `value` returned by the `Promise` of function `func`.
 * @param {(...args: any[]) => Promise<T>} func The asynchronous task function to be retried must return a Promise.
 * @param {number} [maxRetries=3] Maximum number of retries
 * @param {RetryOptions} [options] Configuration options
 * @param {number} [options.delay=300]  Initial delay for retries (in milliseconds)
 * @param {number} [options.delayFactor=2]  Delay increment factor (the delay is multiplied by this value for each retry)
 * @param {(error: any, attempts: number) => boolean} [options.shouldRetry]  Callback function to determine whether to retry
 * @param {(result: any, attempts: number) => any} [options.onSuccess] Callback function when the task is successful
 * @param {(result: any, attempts: number) => any} [options.onFailure] Callback function when the task fails
 * @returns {(...args: Parameters<typeof func>) => Promise<PromiseSettledResult<Awaited<T>>>}
 * @version 0.0.1
 */
export function retry<T>(
  func: (...args: any[]) => Promise<T>,
  maxRetries: number = 3,
  options?: RetryOptions
) {
  const defaultOptions: Required<RetryOptions> = {
    delay: 300,
    delayFactor: 2,
    shouldRetry: (error: any, attempts: number) => true, // eslint-disable-line
    onSuccess: () => {},
    onFailure: () => {}
  }

  const config = { ...defaultOptions, ...options }

  async function executeWithRetry(
    this: ThisParameterType<T>,
    ...args: Parameters<typeof func>
  ): Promise<PromiseSettledResult<Awaited<T>>> {
    let attempts = 0

    const executeTask = async () => {
      try {
        const result = await Promise.resolve().then(() =>
          Promise.resolve(func.apply(this, args))
        )
        config.onSuccess(result, attempts + 1)
        return {
          value: result,
          status: 'fulfilled' as const
        }
      } catch (error) {
        attempts += 1
        if (attempts > maxRetries) {
          config.onFailure(error, attempts)
          return {
            reason: [error, new Error('Max retries exceeded')],
            status: 'rejected' as const
          }
        }

        if (config.shouldRetry(error, attempts)) {
          const delay = config.delay * Math.pow(config.delayFactor, attempts)
          await new Promise((resolve) => setTimeout(resolve, delay))
          return executeTask()
        } else {
          config.onFailure(error, attempts)
          return {
            reason: [error, new Error('Retry canceled by options.shouldRetry')],
            status: 'rejected' as const
          }
        }
      }
    }

    return executeTask()
  }

  return function (
    this: ThisParameterType<T>,
    ...args: Parameters<typeof func>
  ): Promise<PromiseSettledResult<Awaited<T>>> {
    return executeWithRetry.apply(this, args)
  }
}

/**
 * The `options` parameter of the `retry` function.
 * @version 0.0.1
 */
export interface RetryOptions {
  delay?: number
  delayFactor?: number
  shouldRetry?: (error: any, attempts: number) => boolean
  onSuccess?: (result: any, attempts: number) => any
  onFailure?: (error: any, attempts: number) => any
}
