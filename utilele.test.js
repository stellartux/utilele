import { assertEquals } from 'https://deno.land/std@0.68.0/testing/asserts.ts'
import * as Utilele from './utilele.js'

Deno.test({
  name: 'Utilele.clamp()',
  fn: function() {
    assertEquals(Utilele.clamp(-1.5, -1, 1), -1)
    assertEquals(Utilele.clamp(0.5, -1, 1), 0.5)
    assertEquals(Utilele.clamp(1.5, -1, 1), 1)
    assertEquals(Utilele.clamp(3, 4, 6), 4)
    assertEquals(Utilele.clamp(-27.86, -30, 30), -27.86)
    assertEquals(Utilele.clamp(-39.3213, -25, -20), -25)
  },
})
Deno.test({
  name: 'Utilele.sum()',
  fn: function() {
    assertEquals([1, 2, 3, 4].reduce(Utilele.sum), 10)
    assertEquals([5, 6, 7, 8, 9].reduce(Utilele.sum), 35)
    assertEquals([1, '1', 1].reduce(Utilele.sum), 3)
    assertEquals([1, undefined, , 1].reduce(Utilele.sum), 2)
  },
})
Deno.test({
  name: 'Utilele.prod()',
  fn: function() {
    assertEquals([1, 2, 3, 4].reduce(Utilele.prod), 24)
    assertEquals([5, 6, 7, 8, 9].reduce(Utilele.prod), 15120)
  },
})
Deno.test({
  name: 'Utilele.range()',
  fn: function() {
    assertEquals(Array.from(Utilele.range(-1, 1)), [-1, 0, 1])
    assertEquals(Array.from(Utilele.range(1, 7, 2)), [1, 3, 5, 7])
    assertEquals(Array.from(Utilele.range(1, -1, -1)), [1, 0, -1])
  },
})
Deno.test({
  name: 'Utilele.withinRange()',
  fn: function() {
    assertEquals(Utilele.withinRange(5, 1, 10), true)
    assertEquals(Utilele.withinRange(5, 1, 10, 1), true)
    assertEquals(Utilele.withinRange(5.5, 1, 10), true)
    assertEquals(Utilele.withinRange(5.5, 1, 10, 1), false)
    assertEquals(Utilele.withinRange(1, 2, 3), false)
  },
})
Deno.test({
  name: 'Utilele.digits()',
  fn: function() {
    assertEquals(Array.from(Utilele.digits(135)), ['1', '3', '5'])
    assertEquals(Array.from(Utilele.digits(39, 2)), [
      '1',
      '0',
      '0',
      '1',
      '1',
      '1',
    ])
  },
})
Deno.test({
  name: 'Utilele.wrap()',
  fn: function() {
    assertEquals(Utilele.wrap(3, 0, 4), 3)
    assertEquals(Utilele.wrap(-1, 0, 4), 3)
    assertEquals(Utilele.wrap(7, 0, 4), 3)
    assertEquals(Utilele.wrap(10, 2, 4), 2)
    assertEquals(Utilele.wrap(11, 3, 6), 5)
    assertEquals(Utilele.wrap(2, 3, 6), 5)
    assertEquals(Utilele.wrap(0, 0, 0), 0)
    assertEquals(Utilele.wrap(4, 10, 10), 10)
  },
})
Deno.test({
  name: 'Utilele.zip()',
  fn: function() {
    assertEquals([...Utilele.zip([1, 2, 3], [4, 5, 6])], [
      [1, 4],
      [2, 5],
      [3, 6],
    ])
    assertEquals([...Utilele.zip([1, 2, 3], [4, 5, 6], [7, 8, 9, 10])], [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ])
  },
})
Deno.test({
  name: 'Utilele.count()',
  fn: function() {
    assertEquals(Utilele.count(x => x === 1, [1,2,3,1]), 2)
    assertEquals(Utilele.count(1, [1,2,3,1]), 2)
    assertEquals(Utilele.count('t', 'testing'), 2)
  }
})

//@ts-ignore
if (import.meta.main) Deno.runTests()
