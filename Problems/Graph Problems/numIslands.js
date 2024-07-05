/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let numIslands = 0
  let rowLen = grid.length
  let colLen = grid[0].length

  // explore an island, converting land to water as we go so we do not traverse the same island twice
  function explore(row, col) {
    // if row is out of bounds or col is out of bounds or if the cell is water, we are done exploring, return
    if (
      row < 0 ||
      col < 0 ||
      row >= rowLen ||
      col >= colLen ||
      grid[row][col] === '0'
    )
      return

    // convert land to water
    grid[row][col] = '0'
    // explore left
    explore(row, col - 1)
    // explore right
    explore(row, col + 1)
    // explore up
    explore(row - 1, col)
    // explore down
    explore(row + 1, col)
  }

  // loop through the grid
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      // if we find land, start explore
      if (grid[row][col] === '1') {
        // we have found an island
        numIslands++
        explore(row, col)
      }
    }
  }
  return numIslands
}

// console.log(
//   numIslands([
//     ['1', '1', '1', '1', '0'],
//     ['1', '1', '0', '1', '0'],
//     ['1', '1', '0', '0', '0'],
//     ['0', '0', '0', '0', '0'],
//   ])
// ) // 1

console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ])
) // 3
