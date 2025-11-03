import { isString } from '../typed/isString'

const emailReg =
  /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([a-zA-Z0-9-]*[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([a-zA-Z0-9-]*[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,}$/

/**
 * Check if the input parameter is an email.
 * @param {any} arg The argument to check
 * @returns {boolean}
 * @version 0.0.6
 */
export const isEmail = (arg: any) => {
  return isString(arg) && emailReg.test(arg)
}
