/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 *
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return true if you can finish all courses. Otherwise, return false.
 */

var canFinish1 = function (numCourses, prerequisites) {
  if (!prerequisites.length) return true
  let adjacencyList = {}
  for (let [course, prereq] of prerequisites) {
    adjacencyList[prereq] = adjacencyList[prereq] || []
    adjacencyList[prereq].push(course)
  }

  console.log(adjacencyList)
  let availableClasses = {}
  for (let preReq of Object.keys(adjacencyList)) {
    let visited = {}
    function cycle(node) {
      // reached the end of the path, no cycles found
      if (!adjacencyList[node]) {
        availableClasses[node] = true
        return false
      }
      // cycle
      if (visited[node]) {
        delete availableClasses[node]
        return true
      }
      visited[node] = true
      availableClasses[node] = true
      let adjacencyCycles = adjacencyList[node].reduce((acc, adjacency) => {
        acc.push(cycle(adjacency))
        return acc
      }, [])
      if (adjacencyCycles.every((hasCycle) => hasCycle)) {
        return true
      }
      return false
    }
    availableClasses[preReq] = true
    adjacencyList[preReq].forEach((course) => cycle(course))
  }
  let totalClasses = Object.keys(availableClasses).length
  if (totalClasses >= numCourses) return true
  return false
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

var canFinish = function (numCourses, prerequisites) {
  let graph = new Map()
  let visiting = new Set()
  let visited = new Set()

  for (let [v, e] of prerequisites) {
    if (graph.has(v)) {
      let edges = graph.get(v)
      edges.push(e)
      graph.set(v, edges)
    } else {
      graph.set(v, [e])
    }
  }

  for (const [v, e] of graph) {
    if (DFS(v, visited, visiting, graph)) {
      return false // if cyclic it will not finish so it is false
    }
  }

  return true
}

var DFS = function (v, visited, visiting, graph) {
  visiting.add(v)
  let edges = graph.get(v) // get all the edges to explore

  if (edges) {
    //console.log(edges)
    for (let e of edges) {
      if (visited.has(e)) {
        //skip if it is explored already
        continue
      }

      if (visiting.has(e)) {
        //found e is being explored
        return true
      }

      if (DFS(e, visited, visiting, graph)) {
        // DFS deeper if this e is cyclic
        return true
      }
    }
  }

  visiting.delete(v) // remove from visiting set when all decedant v are visited
  visited.add(v)
  return false
}
// console.log(
//   canFinish(20, [
//     [0, 10],
//     [10, 13],
//     [20, 13],
//     [3, 18],
//     [5, 5],
//     [6, 11],
//     [6, 14],
//     [13, 1],
//     [15, 1],
//     [17, 4],
//   ])
// ) // false

console.log(
  canFinish(2, [
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [3, 4],
  ])
) // true
// console.log(
//   canFinish(3, [
//     [1, 0],
//     [1, 2],
//     [0, 1],
//   ])
// ) // false
// console.log(canFinish(2, [[1, 0]])) // true
// console.log(
//   canFinish(2, [
//     [1, 0],
//     [0, 1],
//   ])
// ) // false
// console.log(
//   canFinish(3, [
//     [1, 0],
//     [0, 2],
//     [2, 1],
//   ])
// ) // false
