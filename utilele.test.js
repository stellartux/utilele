import { assertEquals } from 'https://deno.land/std@0.139.0/testing/asserts.ts'
import { clamp, sum, prod, range, withinRange, digits, wrap, zip, count, countFrom, take, unique, cumulative } from './utilele.js'

Deno.test({
  name: 'Utilele.clamp()',
  fn: function () {
    assertEquals(clamp(-1.5, -1, 1), -1)
    assertEquals(clamp(0.5, -1, 1), 0.5)
    assertEquals(clamp(1.5, -1, 1), 1)
    assertEquals(clamp(3, 4, 6), 4)
    assertEquals(clamp(-27.86, -30, 30), -27.86)
    assertEquals(clamp(-39.3213, -25, -20), -25)
  },
})
Deno.test({
  name: 'Utilele.sum()',
  fn: function () {
    assertEquals([1, 2, 3, 4].reduce(sum), 10)
    assertEquals([5, 6, 7, 8, 9].reduce(sum), 35)
    assertEquals([1, '1', 1].reduce(sum), 3)
    assertEquals([1, undefined, , 1].reduce(sum), 2)
    assertEquals(sum([1, 2, 3, 4]), 10)
    assertEquals(sum([0, [2, 3], [4], [5, [6], 7]]), 27)
  },
})
Deno.test({
  name: 'Utilele.prod()',
  fn: function () {
    assertEquals([1, 2, 3, 4].reduce(prod), 24)
    assertEquals([5, 6, 7, 8, 9].reduce(prod), 15120)
    assertEquals(prod([1, 2, 3, 4]), 24)
    assertEquals(prod([5, 6, 7, 8, 9]), 15120)
    assertEquals(prod([1, [2, [3, [4]]]]), 24)
  },
})
Deno.test({
  name: 'Utilele.range()',
  fn: function () {
    assertEquals(Array.from(range(-1, 1)), [-1, 0, 1])
    assertEquals(Array.from(range(1, 7, 2)), [1, 3, 5, 7])
    assertEquals(Array.from(range(1, -1, -1)), [1, 0, -1])
  },
})
Deno.test({
  name: 'Utilele.withinRange()',
  fn: function () {
    assertEquals(withinRange(5, 1, 10), true)
    assertEquals(withinRange(5, 1, 10, 1), true)
    assertEquals(withinRange(5.5, 1, 10), true)
    assertEquals(withinRange(5.5, 1, 10, 1), false)
    assertEquals(withinRange(1, 2, 3), false)
  },
})
Deno.test({
  name: 'Utilele.digits()',
  fn: function () {
    assertEquals([...digits(135)], [5, 3, 1])
    assertEquals([...digits(39, 2)], [1, 1, 1, 0, 0, 1])
  },
})
Deno.test({
  name: 'Utilele.wrap()',
  fn: function () {
    assertEquals(wrap(3, 0, 4), 3)
    assertEquals(wrap(-1, 0, 4), 3)
    assertEquals(wrap(7, 0, 4), 3)
    assertEquals(wrap(10, 2, 4), 2)
    assertEquals(wrap(11, 3, 6), 5)
    assertEquals(wrap(2, 3, 6), 5)
    assertEquals(wrap(0, 0, 0), 0)
    assertEquals(wrap(4, 10, 10), 10)
  },
})
Deno.test({
  name: 'Utilele.zip()',
  fn: function () {
    assertEquals([...zip([1, 2, 3], [4, 5, 6])], [
      [1, 4],
      [2, 5],
      [3, 6],
    ])
    assertEquals([...zip([1, 2, 3], [4, 5, 6], [7, 8, 9, 10])], [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ])
  },
})
Deno.test({
  name: 'Utilele.count()',
  fn: function () {
    assertEquals(count(x => x === 1, [1, 2, 3, 1]), 2)
    assertEquals(count(1, [1, 2, 3, 1]), 2)
    assertEquals(count('t', 'testing'), 2)
    assertEquals(count([true, false, true, false, false]), 2)
  }
})


Deno.test({
  name: "Utilele.countFrom",
  fn: function () {
    let iter = countFrom()
    assertEquals(iter.next().value, 0)
    assertEquals(iter.next().value, 1)
    assertEquals(iter.next().value, 2)
    assertEquals(iter.next().value, 3)
    assertEquals(iter.next().value, 4)
    iter = countFrom(100)
    assertEquals(iter.next().value, 100)
    assertEquals(iter.next().value, 101)
    assertEquals(iter.next().value, 102)
    assertEquals(iter.next().value, 103)
  }
})

Deno.test({
  name: "Utilele.take",
  fn: function () {
    assertEquals([...take(countFrom(), 10)], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  }
})

Deno.test({
  name: "Utilele.unique",
  fn: function () {
    assertEquals([1, 2, 1, 3, 1, 4, 1, 5].filter(unique), [1, 2, 3, 4, 5])
    assertEquals(unique([1, 2, 1, 3, 1, 4, 1, 5]), [1, 2, 3, 4, 5])
  }
})

Deno.test({
  name: "Utilele.cumulative",
  fn: function () {
    assertEquals([...cumulative(sum, [1, 2, 3, 4, 5])], [1, 3, 6, 10, 15])
    assertEquals([...cumulative(sum, range(1, 5))], [1, 3, 6, 10, 15])
    assertEquals([...cumulative(prod, range(1, 5))], [1, 2, 6, 24, 120])
  }
})
