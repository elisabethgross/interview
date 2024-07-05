/**
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  let merged = [intervals[0]]
  let p = 1
  while (p < intervals.length) {
    let [lastStart, lastEnd] = merged.pop()
    let [nextStart, nextEnd] = intervals[p]
    if (nextStart <= lastEnd) {
      merged.push([lastStart, Math.max(lastEnd, nextEnd)])
    } else {
      merged.push([lastStart, lastEnd])
      merged.push([nextStart, nextEnd])
    }
    p++
  }
  return merged
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
) //[[1,6],[8,10],[15,18]]

console.log(
  merge([
    [1, 4],
    [4, 5],
  ])
) // [[1,5]]

console.log(
  merge([
    [1, 4],
    [0, 4],
  ])
) // [0, 4]

console.log(
  merge([
    [1, 4],
    [0, 0],
  ])
) // [[0, 0], [1, 4]]
