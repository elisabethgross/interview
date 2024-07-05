class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
    return this
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2)
    this.adjacencyList[v2].push(v1)
    return this
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (edge) => edge !== v2
    )
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (edge) => edge !== v1
    )
    return this
  }
  removeVertex(v) {
    while (this.adjacencyList[v].length) {
      let edge = this.adjacencyList[v].pop()
      this.removeEdge(v, edge)
    }
    delete this.adjacencyList[v]
    return this
  }
  dfsRecursive(start) {
    let results = []
    let visited = {}
    let adjacencyList = this.adjacencyList
    function traverse(v) {
      if (!v) return null
      results.push(v)
      visited[v] = true
      for (let edge of adjacencyList[v]) {
        if (!visited[edge]) {
          traverse(edge)
        }
      }
    }
    traverse(start)
    return results
  }
  dfsIterative(start) {
    let stack = [start]
    let visited = {}
    let result = []
    visited[start] = true
    while (stack.length) {
      let vertex = stack.pop()
      result.push(vertex)
      for (let edge of this.adjacencyList[vertex]) {
        if (!visited[edge]) {
          visited[edge] = true
          stack.push(edge)
        }
      }
    }
    return result
  }
  bfs(start) {
    let queue = [start]
    let results = []
    let visited = {}
    visited[start] = true
    while (queue.length) {
      let vertex = queue.shift()
      results.push(vertex)
      for (let edge of this.adjacencyList[vertex]) {
        if (!visited[edge]) {
          visited[edge] = true
          queue.push(edge)
        }
      }
    }
    return results
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
    return this
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ vertex: v2, weight })
    this.adjacencyList[v2].push({ vertex: v1, weight })
    return this
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (edge) => edge.vertex !== v2
    )
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (edge) => edge.vertex !== v1
    )
    return this
  }
  removeVertex(v) {
    while (this.adjacencyList[v].length) {
      let edge = this.adjacencyList[v].pop()
      this.removeEdge(v, edge)
    }
    delete this.adjacencyList[v]
    return this
  }
}

let graph = new WeightedGraph()
graph.addVertex('a')
graph.addVertex('b')
graph.addVertex('c')
graph.addVertex('d')
graph.addVertex('e')
graph.addVertex('f')
graph.addEdge('a', 'b', 1)
graph.addEdge('a', 'c', 2)
graph.addEdge('b', 'd', 3)
graph.addEdge('c', 'e', 4)
graph.addEdge('d', 'e', 5)
graph.addEdge('d', 'f', 6)
graph.addEdge('e', 'f', 7)
graph.addVertex('g')
graph.addEdge('g', 'a', 10)
console.log(graph)

module.exports = WeightedGraph
