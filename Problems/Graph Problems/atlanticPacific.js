/**
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
 *
 * The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
 *
 * The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
 *
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
 */

class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(v) {
    this.adjacencyList[v] = this.adjacencyList[v] || { neighbors: [] }
  }
  addEdge(v, e) {
    this.adjacencyList[v].neighbors.push(e)
  }
  dfs(start, ocean) {
    let visited = {}
    function traverse(node, graph) {
      if (!visited[node]) {
        visited[node] = true
        if (graph.adjacencyList[node][ocean] === true) {
          return true
        }
        if (graph.adjacencyList[node].neighbors.length === 0) {
          return false
        }
        for (let i = 0; i < graph.adjacencyList[node].neighbors.length; i++) {
          let edge = graph.adjacencyList[node].neighbors[i]
          let reachedOcean = traverse(edge, graph)
          if (reachedOcean) return true
        }
      }
    }
    let dfsReachedOcean = traverse(start, this)
    if (dfsReachedOcean) return true
    return false
  }
}

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  let graph = new Graph()
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      graph.addVertex([row, col])
    }
  }
  // construct graph
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      // pacific ocean borders
      if (row === 0) {
        graph.adjacencyList[[row, col]].pacific = true
      } else if (col === 0) {
        graph.adjacencyList[[row, col]].pacific = true
      }
      // atlantic ocean borders
      if (row === heights.length - 1) {
        graph.adjacencyList[[row, col]].atlantic = true
      } else if (col === heights[0].length - 1) {
        graph.adjacencyList[[row, col]].atlantic = true
      }
      // non borders
      // look north
      if (
        heights[row - 1] !== undefined &&
        heights[row][col] >= heights[row - 1][col]
      ) {
        graph.addEdge([row, col], `${row - 1},${col}`)
      }
      // look east
      if (
        heights[row][col + 1] !== undefined &&
        heights[row][col] >= heights[row][col + 1]
      ) {
        graph.addEdge([row, col], `${row},${col + 1}`)
      }
      // look south
      if (
        heights[row + 1] !== undefined &&
        heights[row][col] >= heights[row + 1][col]
      ) {
        graph.addEdge([row, col], `${row + 1},${col}`)
      }
      // look west
      if (
        heights[row][col - 1] !== undefined &&
        heights[row][col] >= heights[row][col - 1]
      ) {
        graph.addEdge([row, col], `${row},${col - 1}`)
      }
    }
    // pacific nodes
  }
  let pacificCells = []
  let atlanticCells = []
  console.log(graph.adjacencyList)
  console.log(graph.dfs('2,1', 'pacific'))
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      let reachedPacific = graph.dfs(`${row},${col}`, 'pacific')
      let reachedAtlantic = graph.dfs(`${row},${col}`, 'atlantic')
      if (reachedPacific) pacificCells.push(`${row},${col}`)
      if (reachedAtlantic) atlanticCells.push(`${row},${col}`)
    }
  }
  // console.log('pacificCells', pacificCells)
  // console.log('atlanticCells', atlanticCells)

  return pacificCells
    .filter((cell) => atlanticCells.includes(cell))
    .map((cellStr) => {
      let cell = []
      let [row, col] = cellStr.split(',')
      cell.push(parseInt(row))
      cell.push(parseInt(col))
      return cell
    })
}

var pacificAtlanticOptimized = function (heights) {
  if (!heights.length) return heights
  let rowLen = heights.length,
    colLen = heights[0].length,
    coords = []
  const peaks = new Array(rowLen * colLen).fill(0)

  const findPeak = (row, col, ocean, prevHeight) => {
    // find idx in 1 dimensional array
    let peakIdx = row * colLen + col
    if (
      // if we know the peak we're at can already reach the ocean
      // (this will be true of all edge peaks)
      // (also functions as "visited")
      peaks[peakIdx] === ocean ||
      // if we know the peak we're at can reach both oceans
      peaks[peakIdx] === 3 ||
      // if the peak we're at is lower than the previous peak we looked at
      heights[row][col] < prevHeight
    ) {
      // stop traversing
      return
    }

    // if we are here, this peak can reach the ocean
    peaks[peakIdx] += ocean
    // this peak becomes the new prevHeight
    prevHeight = heights[row][col]

    // if this peak can reach both oceans, save the coords
    if (peaks[peakIdx] === 3) coords.push([row, col])
    // if we have a peak to the south, traverse to it
    if (row + 1 < rowLen) findPeak(row + 1, col, ocean, prevHeight)
    // if there is peak to the north, traverse to it
    if (row > 0) findPeak(row - 1, col, ocean, prevHeight)
    // if there is a peak to the east, traverse to it
    if (col + 1 < colLen) findPeak(row, col + 1, ocean, prevHeight)
    // if there is a peak to the west, traverse to it
    if (col > 0) findPeak(row, col - 1, ocean, prevHeight)
  }

  // find peaks that can reach the pacific
  for (let rowCell = 0; rowCell < rowLen; rowCell++) {
    // findPeak on each rowCell on west most column
    findPeak(rowCell, 0, 1, heights[rowCell][0])
    // findPeak on each rowCell on eastMost column
    findPeak(rowCell, colLen - 1, 2, heights[rowCell][colLen - 1])
  }
  // find peaks that can reach the atlantic
  for (let colCell = 0; colCell < colLen; colCell++) {
    // findPeak on each colCell north most row
    findPeak(0, colCell, 1, heights[0][colCell])
    // findPeak on each collCell south most row
    findPeak(rowLen - 1, colCell, 2, heights[rowLen - 1][colCell])
  }

  return coords
}
// console.log(
//   pacificAtlantic([
//     [1, 2, 2, 3, 5],
//     [3, 2, 3, 4, 4],
//     [2, 4, 5, 3, 1],
//     [6, 7, 1, 4, 5],
//     [5, 1, 1, 2, 4],
//   ])
// ) // [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[3,3],[3,4],[4,0]]

console.log(
  pacificAtlantic1([
    [3, 3, 3],
    [3, 1, 3],
    [0, 2, 4],
  ])
) // [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]
