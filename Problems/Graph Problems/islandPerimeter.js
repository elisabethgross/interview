/**
 * You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.
 *
 * Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).
 *
 * The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  let colLen = grid[0].length
  let rowLen = grid.length

  let beginningOfIsland
  while (true) {
    for (let row = 0; row < rowLen; row++) {
      for (let col = 0; col < colLen; col++) {
        if (grid[row][col] === 1) {
          beginningOfIsland = [row, col]
          break
        }
        if (beginningOfIsland) break
      }
      if (beginningOfIsland) break
    }
    if (beginningOfIsland) break
  }
  function dfs(start) {
    let perimeter = 0
    let visited = {}
    function traverse([row, col]) {
      // look left
      if (visited[`${row},${col}`]) return
      visited[`${row},${col}`] = true
      if (grid[row][col - 1] === undefined || grid[row][col - 1] === 0) {
        perimeter++
      } else {
        traverse([row, col - 1])
      }
      // look right
      if (grid[row][col + 1] === undefined || grid[row][col + 1] === 0) {
        perimeter++
      } else {
        traverse([row, col + 1])
      }
      // look up
      if (grid[row - 1] === undefined || grid[row - 1][col] === 0) {
        perimeter++
      } else {
        traverse([row - 1, col])
      }
      // look down
      if (grid[row + 1] === undefined || grid[row + 1][col] === 0) {
        perimeter++
      } else {
        traverse([row + 1, col])
      }
    }
    traverse(start)
    return perimeter
  }
  return dfs([beginningOfIsland[0], beginningOfIsland[1]])
}

console.log(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
  ])
) //16
console.log(islandPerimeter([[1]])) // 4
console.log(islandPerimeter([[1, 0]])) // 4
