/**
 * Provide a function `func` that returns a `Promise` and a wait interval `wait`, and return a function that polls the asynchronous task at a fixed interval, supporting configurable retries and runtime control.
 *
 * Optional parameter options configures retry behavior; see [here](#polloptions).
 *
 * The function returns an object to control polling; see [here](#pollresult).
 *
 * @template T Type of the `value` returned by the `Promise` of function `func`
 * @param {(...args: any[]) => Promise<T>} func The async function to poll
 * @param {number} wait Interval in milliseconds between polls
 * @param {PollOptions<T>} [options] Polling configuration
 * @param {number} [options.maxRetries=3] Max retry count on failure; Reset counter on success
 * @param {number} [options.maxCalls=Infinity] Maximum number of calls of `func`
 * @param {boolean} [options.sequential=false] Wait for previous run before next poll
 * @param {boolean} [options.leading=true] Execute once immediately
 * @param {(result: T, retries: number) => void} [options.onSuccess] Callback on success
 * @param {(error: any, retries: number) => void} [options.onFailure] Callback on failure
 * @returns {(...args: Parameters<typeof func>) => PollResult}
 * @version 0.0.4
 */

import { logWarn } from '../__share__/console'

export function poll<T>(
  func: (...args: any[]) => Promise<T>,
  wait: number,
  options?: PollOptions<T>
) {
  const {
    maxRetries = 3,
    maxCalls = Infinity,
    sequential = false,
    leading = true,
    onSuccess = () => {},
    onFailure = () => {}
  } = options || {}

  function executeWithPoll(this: unknown, ...args: Parameters<typeof func>) {
    let timer: number | undefined | NodeJS.Timeout
    let retries = 0
    let calls = 0
    let stopped = false

    const executeTask = async () => {
      calls++
      try {
        const result = await func.apply(this, args)
        onSuccess(result, retries + 1)
        retries = 0 // Reset retries on success
      } catch (error) {
        retries++
        onFailure(error, retries)
        if (retries > maxRetries) {
          stop()
          logWarn(`Max retries exceeded: ${maxRetries}. Last error:`, error)
        }
      }

      if (calls >= maxCalls) {
        stop()
        logWarn(`Max calls exceeded: ${maxCalls}. Stopping polling.`)
      }
    }

    const runPoll = async () => {
      timer = setTimeout(async () => {
        if (!stopped) {
          if (sequential) {
            await executeTask()
            runPoll()
          } else {
            runPoll()
            executeTask()
          }
        }
      }, wait)
    }

    const init = async () => {
      if (leading) {
        if (sequential) {
          await executeTask()
        } else {
          executeTask()
        }
      }
      runPoll()
    }

    const stop = () => {
      stopped = true
      if (timer) {
        clearTimeout(timer)
        timer = undefined
      }
    }

    init()

    return {
      stop,
      isRunning: () => !stopped,
      start: () => {
        if (stopped) {
          retries = 0
          calls = 0
          stopped = false
          init()
        }
      }
    }
  }

  return function (this: unknown, ...args: Parameters<typeof func>): PollResult {
    return executeWithPoll.apply(this, args)
  }
}

/**
 * The type of `options` parameter of the `poll` function.
 * @version 0.0.4
 */
export interface PollOptions<T> {
  maxRetries?: number
  sequential?: boolean
  leading?: boolean
  maxCalls?: number
  onSuccess?: (result: T, retries: number) => void
  onFailure?: (error: any, retries: number) => void
}

/**
 * The return of the `poll` function.
 * @version 0.0.4
 */
export interface PollResult {
  stop: () => void
  start: () => void
  isRunning: () => boolean
}
