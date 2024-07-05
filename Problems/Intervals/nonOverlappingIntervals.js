/**
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  let remove = 0
  let currEnd = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < currEnd) {
      remove++
      currEnd = Math.min(intervals[i][1], currEnd)
    } else {
      currEnd = intervals[i][1]
    }
  }

  return remove
}

console.log(
  eraseOverlapIntervals([
    [11, 22],
    [15, 35],
    [36, 38],
    [16, 18],
    [50, 100],
  ])
)

// console.log(
//   eraseOverlapIntervals([
//     [1, 100],
//     [11, 22],
//     [1, 11],
//     [2, 12],
//   ])
// ) // 2

// console.log(
//   eraseOverlapIntervals([
//     [1, 2],
//     [2, 3],
//     [3, 4],
//     [1, 3],
//   ])
// ) // 1

// console.log(
//   eraseOverlapIntervals([
//     [1, 2],
//     [1, 2],
//     [1, 2],
//   ])
// ) // 2

// console.log(
//   eraseOverlapIntervals([
//     [1, 2],
//     [2, 3],
//   ])
// ) // 0
