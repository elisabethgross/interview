// Given an m x n matrix, return all elements of the matrix in spiral order.

function spiralMatrix(matrix) {
  let left = 0
  let top = 0
  let right = matrix[0].length - 1
  let bottom = matrix.length - 1

  let path = []

  while (true) {
    // get top
    for (i = left; i <= right; i++) {
      path.push(matrix[top][i])
    }
    top++
    if (top > bottom) break
    // get right
    for (i = top; i <= bottom; i++) {
      path.push(matrix[i][right])
    }
    right--
    if (left > right) break
    // get bottom
    for (i = right; i >= left; i--) {
      path.push(matrix[bottom][i])
    }
    bottom--
    if (top > bottom) break
    // get left
    for (i = bottom; i >= top; i--) {
      path.push(matrix[i][left])
    }
    left++
    if (left > right) break
  }
  return path
}

console.log(
  spiralMatrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
) // [1, 2, 3, 6, 9, 8, 7, 4, 5]
