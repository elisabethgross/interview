class LinkedListNode {
  constructor(val, next) {
    this.val = val
    this.next = next
  }
}

// 1 -> 2 -> 3 -> 4 -> 5
// let ll5 = new LinkedListNode(5)
// let ll4 = new LinkedListNode(4, ll5)
// let ll3 = new LinkedListNode(3, ll4)
// let ll2 = new LinkedListNode(2, ll3)
// let ll1 = new LinkedListNode(1, ll2)

function reverse(head) {
  let prev = null
  let curr = head

  while (curr) {
    let next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}

// 1 -> 2 -> 2 -> 4
// let lla4 = new LinkedListNode(4)
// let lla3 = new LinkedListNode(2, lla4)
// let lla2 = new LinkedListNode(2, lla3)
// let lla1 = new LinkedListNode(1, lla2)

// 1 -> 2 -> 3 -> 4
// let llb4 = new LinkedListNode(4)
// let llb3 = new LinkedListNode(3, llb4)
// let llb2 = new LinkedListNode(2, llb3)
// let llb1 = new LinkedListNode(1, llb2)

function merge(l1, l2) {
  if (!l1) return l2
  if (!l2) return l1

  if (l1.val <= l2.val) {
    l1.next = merge(l1.next, l2)
    return l1
  } else {
    l2.next = merge(l1, l2.next)
    return l2
  }
}

function removeNthNodeFromEnd(head, n) {
  let slow = head
  let fast = head
  for (let i = 0; i < n; i++) {
    fast = fast.next
  }
  if (!fast) return head.next
  let prev = null
  let next = slow.next
  while (fast) {
    prev = slow
    slow = slow.next
    fast = fast.next
    next = slow.next
  }
  prev.next = next

  return head
}

let ll6 = new LinkedListNode(6)
let ll5 = new LinkedListNode(5, ll6)
let ll4 = new LinkedListNode(4, ll5)
let ll3 = new LinkedListNode(3, ll4)
let ll2 = new LinkedListNode(2, ll3)
let ll1 = new LinkedListNode(1, ll2)
ll6.next = ll2

function hasCycle(head) {
  if (!head) return false
  let slow = head
  let fast = head

  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

let t1 = new TreeNode(6)
t1.left = new TreeNode(4)
t1.right = new TreeNode(7)
t1.left.left = new TreeNode(2)
t1.left.right = new TreeNode(5)
t1.left.left.left = new TreeNode(1)

function dfsInOrder(head) {
  let path = []
  function traverse(node) {
    if (!node) return
    if (node.left) {
      traverse(node.left)
    }
    path.push(node.val)
    if (node.right) {
      traverse(node.right)
    }
  }
  traverse(head)
  return path
}

function bfs(head) {
  let path = [head.val]
  function traverse(node) {
    if (!node) return
    if (node.left) {
      path.push(node.left.val)
    }
    if (node.right) {
      path.push(node.right.val)
    }
    if (node.left) traverse(node.left)
    if (node.right) traverse(node.right)
  }
  traverse(head)
  return path
}

function balanced(head) {
  function isBalanced(node) {
    if (!node) return 0
    let leftHeight = isBalanced(node.left)
    if (leftHeight === false) return false
    let rightHeight = isBalanced(node.right)
    if (rightHeight === false) return false
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false
    } else {
      return Math.max(leftHeight, rightHeight) + 1
    }
  }
  return !!isBalanced(head)
}

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
    return this
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (edge) => edge !== v2
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

function detectCycleGraph(graph, head) {
  let visited = {}
  function helper(graph, node) {
    // if (!node) return false
    if (visited[node]) return true
    visited[node] = true
    for (let i = 0; i < graph.adjacencyList[node].length; i++) {
      let cycle = helper(graph, graph.adjacencyList[node][i])
      if (cycle) return true
    }
    return false
  }
  return helper(graph, head)
}

let graph = new Graph()
graph.addVertex('a')
graph.addVertex('b')
graph.addVertex('c')
graph.addVertex('d')
graph.addVertex('e')
graph.addVertex('f')
graph.addEdge('a', 'b')
graph.addEdge('a', 'c')
graph.addEdge('b', 'd')
graph.addEdge('c', 'e')
graph.addEdge('d', 'e')
graph.addEdge('d', 'f')
graph.addEdge('e', 'f')

console.log(detectCycleGraph(graph, 'a'))
