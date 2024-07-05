/**
 * 1. Every time we look to visit a node, we pick the node with the smallest distance to visit first
 * 2. Once we've moved to the node we are visiting, we look at all its neighbors
 * 3. For each neighboring node, we calculate the distance by summing the total edges that lead to the node we are checking from the starting node
 * 4. If the new total distance to a node is less than the previous total, we store the new shorter distance for that node
 */

class QueueNode {
  constructor(val, priority) {
    this.val = val
    this.priority = priority
  }
}

// Priority queue is a min binary heap because priority of 1 takes precedence of priority of 3, therefore lower numbers would be dequeued first
class PriorityQueue {
  constructor() {
    this.values = []
  }
  getParent(idx) {
    let parentIdx = Math.floor((idx - 1) / 2)
    return {
      idx: parentIdx,
      val: this.values[parentIdx],
    }
  }
  getLeftChild(idx) {
    let leftChildIdx = idx * 2 + 1
    return {
      idx: leftChildIdx,
      val: this.values[leftChildIdx],
    }
  }
  getRightChild(idx) {
    let rightChildIdx = idx * 2 + 2
    return {
      idx: rightChildIdx,
      val: this.values[rightChildIdx],
    }
  }
  // O(logn)
  enqueue(val, priority) {
    let newNode = new QueueNode(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
    return this.values
  }
  // O(logn)
  bubbleUp() {
    let idx = this.values.length - 1
    while (idx > 0) {
      let parent = this.getParent(idx)
      let el = this.values[idx]
      if (parent.val.priority < el.priority) break
      this.values[parent.idx] = el
      this.values[idx] = parent.val
      idx = parent.idx
    }
  }
  // O(logn)
  dequeue() {
    let min = this.values[0]
    let end = this.values[this.values.length - 1]
    this.values[0] = end
    this.values.pop()
    this.sinkDown()
    return min
  }
  // O(logn)
  sinkDown() {
    let idx = 0
    while (true) {
      let swap = null
      let el = this.values[idx]
      let leftChild = this.getLeftChild(idx)
      let rightChild = this.getRightChild(idx)

      if (leftChild.val && leftChild.val.priority <= el.priority) {
        swap = leftChild.idx
      }
      if (
        rightChild.val &&
        rightChild.val.priority <= el.priority &&
        rightChild.val.priority < leftChild.val.priority
      ) {
        swap = rightChild.idx
      }
      if (!swap) break
      let temp = this.values[swap]
      this.values[swap] = el
      this.values[idx] = temp
      idx = swap
    }
    return this.values
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
  findShortestPath(start, end) {
    let queue = new PriorityQueue()
    let distances = {}
    let previous = {}

    // init
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0
        queue.enqueue(vertex, 0)
      } else {
        distances[vertex] = Infinity
        queue.enqueue(vertex, Infinity)
      }
      previous[vertex] = null
    }

    let path = []

    while (queue.values.length) {
      let smallest = queue.dequeue().val
      if (smallest === end) {
        path.unshift(end)
        while (previous[smallest]) {
          path.unshift(previous[smallest])
          smallest = previous[smallest]
        }
        return path
      } else {
        this.adjacencyList[smallest].forEach(({ vertex, weight }) => {
          let totalDistance = weight + distances[smallest]
          if (totalDistance < distances[vertex]) {
            previous[vertex] = smallest
            distances[vertex] = totalDistance
            queue.enqueue(vertex, totalDistance)
          }
        })
      }
    }
  }
}

const graph = new WeightedGraph()
graph.addVertex('a')
graph.addVertex('b')
graph.addVertex('c')
graph.addVertex('d')
graph.addVertex('e')
graph.addVertex('f')
graph.addEdge('a', 'b', 4)
graph.addEdge('b', 'e', 3)
graph.addEdge('a', 'c', 2)
graph.addEdge('c', 'd', 2)
graph.addEdge('d', 'e', 3)
graph.addEdge('c', 'f', 4)
graph.addEdge('d', 'f', 1)
graph.addEdge('e', 'f', 1)
console.log(graph.findShortestPath('a', 'e'))
