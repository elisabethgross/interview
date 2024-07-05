/**
 * You are given an array of non overlapping intervals in ascending order. Insert interval in the correct place, merging intervals if necessary.
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let n = intervals.length
  let i = 0
  let res = []
  // case 1: no overlapping intervals before the new interval
  // while existing interval end is less than newInterval start
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i])
    i++
  }
  // case 2: overlapping intervals
  // while the new interval end is greater than the interval start
  while (i < n && newInterval[1] >= intervals[i][0]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0])
    newInterval[1] = Math.max(newInterval[1], intervals[i][1])
    i++
  }
  res.push(newInterval)
  // case 3: no overlapping of intervals after new interval was merged
  while (i < n) {
    res.push(intervals[i])
    i++
  }
  return res
}

console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
) // [[1, 5], 6, 9]
console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8]
  )
) // [([1, 2], [3, 10], [12, 16])]

console.log(insert([[1, 5]], [6, 8])) // [[1, 5], [6, 8]]
console.log(insert([[1, 5]], [0, 3])) // [[0, 5]]
