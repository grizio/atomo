/**
 * Accept:
 * - 1
 * - 1.2
 * - 1,3
 *
 * Refuse:
 * - 1.1.
 * - 1..
 * - 1,.
 */
export function normalizePartialNumber(value: string): string {
  let result = value
    .replace(/,/gi, '.')
    .replace(/[^0-9.]/gi, '')
  if (result.indexOf('.') !== -1) {
    while (result.indexOf('.') !== result.lastIndexOf('.')) {
      const lastIndexOfDot =result.lastIndexOf('.')
      result = result.substring(0, lastIndexOfDot) + result.substring(lastIndexOfDot + 1)
    }
  }
  return result
}