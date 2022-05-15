/**
 * querySelector shorthand
 * @param {string} selector
 * @param {ParentNode} [parent = document]
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector)
}

/**
 * querySelectorAll shorthand
 * @param {string} selector
 * @param {ParentNode} [parent = document]
 */
export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector))
}

/**
 * Removes all child elements from the given element
 * @param {Element} element
 */
export function removeChildren(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}

/**
 * Array reducer - sum the array
 * @param {any} [previousValue = 0]
 * @param {any} [currentValue = 0]
 */
export function sum(previousValue = 0, currentValue = 0) {
  if (Array.isArray(previousValue)) {
    previousValue = previousValue.reduce(sum)
  }
  if (Array.isArray(currentValue)) {
    currentValue = currentValue.reduce(sum)
  }
  return Number(previousValue) + Number(currentValue)
}

/**
 * Array reducer - product of the array
 * @param {number} [previousValue = 1]
 * @param {number} [currentValue = 1]
 */
export function prod(previousValue = 1, currentValue = 1) {
  if (Array.isArray(previousValue)) {
    previousValue = previousValue.reduce(prod)
  }
  if (Array.isArray(currentValue)) {
    currentValue = currentValue.reduce(prod)
  }
  return previousValue * currentValue
}

/**
 * Clamps a value between a minimum and maximum, inclusive.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

/**
 * Wrap a number between a minimum and maximum, where the maximum overflows to the minimum.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function wrap(value, min, max) {
  return max === min ? min : ((value + max) % (max - min)) + min
}

/**
 * Generate numbers in a given numerical range, inclusive.
 * @generator
 * @param {number} start
 * @param {number} end
 * @param {number} [step = 1]
 */
export function* range(start, end, step = 1) {
  step = Math.abs(step)
  if (start < end) {
    for (let i = start; i <= end; i += step) yield i
  } else if (start > end) {
    for (let i = start; i >= end; i -= step) yield i
  }
}

/**
 * Check whether a value is between minimum and maximum
 * If a step value is provided, the number must equal a step of the amount above the minimum
 * i.e. value must equal min + n * step for some step
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} [step = 0]
 */
export function withinRange(value, min, max, step = 0) {
  step = Math.abs(step)
  return (
    value >= min &&
    value <= max &&
    (step === 0 || Number.isInteger((value - min) / step))
  )
}

/**
 * `unique(array)` or `array.filter(unique)` filters duplicates from the array.
 * @param {any} value
 * @param {number} [index]
 * @param {any[]} [array]
 */
export function unique(value, index, array) {
  if (array) {
    return index === array.indexOf(value)
  } else if (Array.isArray(value)) {
    return value.filter(unique)
  } else {
    return Array.from(value).filter(unique)
  }
}

/**
 * Filter unique values from a generator function.
 * @param {any} generator
 */
export function* uniqueLazy(generator) {
  const seen = new Set()
  for (const value of generator) {
    if (!seen.has(value)) {
      seen.add(value)
      yield value
    }
  }
}

/**
 * Test if a number can be stored in an unsigned byte
 * @param {number} value
 */
export function isByte(value) {
  return withinRange(value, 0, 255, 1)
}

/**
 * @generator
 * Generates digits from least significant to most significant.
 * @param {number} number
 * @param {number} [base = 10] the base of the number to be
 */
export function* digits(number, base = 10) {
  do {
    yield number % base
    number = Math.floor(number / base)
  } while (number > 0)
}

/**
 * Iterate over all the given array arguments
 * @generator
 * @param {any[][]} arrays
 */
export function* zip(...arrays) {
  const maxLength = Math.min(...arrays.map((array) => array.length))
  for (let i = 0; i < maxLength; i++) {
    let result = []
    for (const array of arrays) {
      result.push(array[i])
    }
    yield result
  }
}

/** @type {number | null} */
let debounceRef = null
/**
 * Debounces a function so it can only be called once in the given time period
 * @param {Function} func the function to be called
 * @param {number} [time = 100] the debounce period, in milliseconds
 */
export function debounce(func, time = 100) {
  if (!debounceRef) {
    debounceRef = setTimeout(() => {
      func()
      debounceRef = null
    }, time)
  }
}

/**
 * Returns a random integer within a range.
 * @param {number} min the minimum value, inclusive
 * @param {number} max the maximum value, inclusive
 * @returns {number} a random integer
 */
export function randInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Creates a memoized version of a single parameter function
 * @param {(arg0: string | number | symbol) => any} fn
 */
export function memoize(fn) {
  const cache = {}
  /**
   * @param {string | number | symbol} value
   */
  function memoized(value) {
    if (!cache.hasOwnProperty(value)) {
      cache[value] = fn(value)
    }
    return cache[value]
  }
  return memoized
}

/**
 * An enumerator, but with symbols instead of numbers.
 */
export class Esym {
  /**
   * @param {(string | number)[]} values
   */
  constructor(...values) {
    for (const value of values) {
      this[value] = Symbol(value)
    }
  }
}

/**
 * If `predicate` is a function, counts the number of items in `iterable` which
 * return `true` when `predicate` is called with them; otherwise counts how
 * many items are strictly equal to the `predicate` value.
 * If only `iterable` is passed, counts truthy values in the iterable.
 * @param {((value: any) => boolean) | any} [predicate] or iterable
 * @param {Iterable} [iterable]
 * @returns {number} count of values
 */
export function count(predicate, iterable) {
  if (!iterable) {
    iterable = predicate
    predicate = Boolean
  } else if (typeof predicate !== 'function') {
    const pValue = predicate
    predicate = (/** @type {any} */ value) => value === pValue
  }

  let total = 0

  for (const value of iterable) {
    if (predicate(value)) {
      total++
    }
  }
  return total
}

/**
 * Count forever, from `start`, increasing by `step` each iteration.
 * @param {number | bigint} [start = 0] Defaults to `0`
 * @param {number | bigint} [step = 1] Defaults to `1`
 */
export function* countFrom(start = 0, step = 1) {
  if (typeof start === 'bigint') {
    step = BigInt(step)
  } else if (typeof start === 'number') {
    step = Number(step)
  } else {
    throw new TypeError('Expected a number or a bigint, got a ' + typeof start)
  }
  while (true) {
    yield start
    // @ts-ignore
    start += step
  }
}

/**
 * Takes no more than `amount` values from the iterable.
 * @param {IterableIterator<any>} iterable
 * @param {number} amount
 */
export function* take(iterable, amount) {
  for (const value of iterable) {
    if (amount-- === 0) return
    yield value 
  }
}

/**
 * @param {(arg0: any, arg1: any) => any} reducer
 * @param {IterableIterator<any>} iterable
 * @param {any} init
 * @yields each cumulatively reduced value
 */
export function* cumulative(reducer, iterable, init) {
  if (init === undefined) {
    init = Array.isArray(iterable) ? iterable.shift() : iterable.next().value
    yield init
  }
  for (const value of iterable) {
    yield (init = reducer(init, value))
  }
}
