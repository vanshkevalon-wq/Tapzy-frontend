/**
 * Format a number as a price string
 * @param {number} value
 * @param {string} currency
 */
export function formatPrice(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

/**
 * Truncate text to a given length
 */
export function truncate(text = '', maxLength = 100) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text
}

/**
 * Debounce a function
 */
export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
