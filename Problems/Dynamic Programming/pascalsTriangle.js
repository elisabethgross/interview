/**
 * Given an integer numRows, return the first numRows of Pascal's triangle.
 * In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
 *
 *           1
 *         1   1
 *       1   2  1
 *     1   3   3  1
 *   1   4   6   4  1
 */

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (numRows === 0) {
    return []
  }
  if (numRows === 1) {
    return [[1]]
  }

  let prevRows = generate(numRows - 1)
  let prevRow = prevRows[prevRows.length - 1]
  let currentRow = [1]

  for (let i = 1; i < numRows - 1; i++) {
    currentRow.push(prevRow[i - 1] + prevRow[i])
  }

  currentRow.push(1)
  prevRows.push(currentRow)

  return prevRows
}

console.log(generate(5)) // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)) // [[1]]
