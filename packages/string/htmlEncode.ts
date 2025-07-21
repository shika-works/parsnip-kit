const escapeMap: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

/**
 * Encode the string into HTML entities, converting special characters (such as <, >, &) to their corresponding HTML entities (e.g., `&lt;`, `&gt;`, `&amp;`). This prevents these characters from being mistakenly interpreted as part of HTML tags by the browser.
 * @param {any} arg The string to be converted.
 * @returns {string}
 * @version 0.0.1
 */

export function htmlEncode(arg: string): string {
  let result = ''
  for (let i = 0; i < arg.length; i++) {
    const char = arg[i]
    result += escapeMap[char] || char
  }
  return result
}
