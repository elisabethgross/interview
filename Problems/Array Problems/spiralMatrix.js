/** Given an m x n matrix, return all elements of the matrix in spiral order.
 *
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [1,2,3,6,9,8,7,4,5]
 *
 */

function spiralOrder(matrix) {
  let left = 0
  let right = matrix[0].length - 1
  let bottom = matrix.length - 1
  let top = 0

  let output = []

  while (true) {
    // move right
    for (let i = left; i <= right; i++) {
      output.push(matrix[top][i])
    }
    top++
    if (top > bottom) break
    // move down
    for (i = top; i <= bottom; i++) {
      output.push(matrix[i][right])
    }
    right--
    if (right < left) break
    // move left
    for (i = right; i >= left; i--) {
      output.push(matrix[bottom][i])
    }
    bottom--
    if (bottom < top) break
    // move up
    for (i = bottom; i >= top; i--) {
      output.push(matrix[i][left])
    }
    left++
    if (left > right) break
  }
  return output
}

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
) // [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
// console.log(
//   spiralOrder([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// ) // [1, 2, 3, 6, 9, 8, 7, 4, 5]
// console.log(
//   spiralOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//     [17, 18, 19, 20],
//   ])
// ) // [1, 2, 3, 4, 8, 12, 16, 20, 19, 18, 17, 13, 9, 5, 6, 7, 11, 15, 14, 10]
