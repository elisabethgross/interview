class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }
  // O(logn)
  insert(val) {
    const node = new Node(val)
    if (!this.root) {
      this.root = node
      return this
    }
    let curr = this.root
    while (true) {
      if (val < curr.value) {
        if (!curr.left) {
          curr.left = node
          return this
        }
        curr = curr.left
      } else {
        if (!curr.right) {
          curr.right = node
          return this
        }
        curr = curr.right
      }
    }
  }
  // O(logn)
  find(val) {
    if (!this.root) return false
    let curr = this.root
    let found = false
    while (curr && !found) {
      if (val < curr.value) {
        curr = curr.left
      } else if (val > curr.value) {
        curr = curr.right
      } else {
        found = true
      }
    }
    if (!found) return false
    return curr
  }
  findRecursive(node, val) {
    if (!node) return false
    if (node.value === val) return node
    if (val < node.value) return this.findRecursive(node.left, val)
    if (val > node.value) return this.findRecursive(node.right, val)
  }
  /**
   *     10
   *   6    15
   * 3  8     20
   */
  // [10, 6, 15, 3, 8, 20]
  bfs() {
    let ret = []
    if (!this.root) return ret
    let queue = []
    queue.push(this.root)
    while (queue.length) {
      let node = queue.shift()
      ret.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return ret
  }
  /**
   *     10
   *   6    15
   * 3  8     20
   */
  // [10, 6, 3, 8, 15, 20]
  dfsPreOrder() {
    let ret = []
    function traverse(node) {
      ret.push(node.value)
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
    }
    traverse(this.root)
    return ret
  }
  /**
   *     10
   *   6    15
   * 3  8     20
   */
  // [3, 8, 6, 20, 15, 10]
  dfsPostOrder() {
    let ret = []
    function traverse(node) {
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
      ret.push(node.value)
    }
    traverse(this.root)
    return ret
  }
  /**
   *     10
   *   6    15
   * 3  8     20
   */
  // [3, 6, 8, 10, 15, 20]
  dfsInOrder() {
    let ret = []
    function traverse(node) {
      if (node.left) traverse(node.left)
      ret.push(node.value)
      if (node.right) traverse(node.right)
    }
    traverse(this.root)
    return ret
  }
  findNodeParent(val) {
    if (!this.root) return false
    let curr = this.root
    let parent = null
    let found = false
    while (curr && !found) {
      if (val < curr.value) {
        parent = curr
        curr = curr.left
      } else if (val > curr.value) {
        parent = curr
        curr = curr.right
      } else {
        found = true
      }
    }
    if (!found) return false
    return parent
  }
  remove(root, val) {
    if (root === null) return null

    // traverse tree until you find the node to remove
    if (root.value > val) {
      // move down left tree
      root.left = this.remove(root.left, val)
      return root
    } else if (root.value < val) {
      // move down right tree
      root.right = this.remove(root.right, val)
      return root
    }

    // if one child is empty
    if (root.left === null) {
      // if left is empty
      let rootParent = this.findNodeParent(root.value)

      // removing the root node which has just one child
      if (!rootParent) {
        return root.right
      }
      // remove right child
      rootParent.right = null
      // return right child to replace removed node
      return root.right
    } else if (root.right === null) {
      // if right is empty
      let rootParent = this.findNodeParent(root.value)

      // removing the root node which has just one child
      if (!rootParent) {
        return root.left
      }
      // remove left child
      rootParent.left = null
      // return left child to replace removed node
      return root.left
    } // both children exist
    else {
      // successor will always be the leftmost leaf node of the root's right branch
      // find successor and successorParent
      let successorParent = root
      let successor = root.right
      while (successor.left) {
        successorParent = successor
        successor = successor.left
      }

      // disconnect successor from successorParent, rewrite root node to successor value (to retain connections)
      if (successorParent !== root) {
        successorParent.left = successor.right
      } else {
        successorParent.right = successor.right
      }

      // move the successor to the root spot
      root.value = successor.value

      return root
    }
  }
}

let tree = new BinarySearchTree()
tree.insert(10)
tree.insert(12)
tree.insert(11)
tree.insert(6)
tree.insert(7)
// tree.insert(6)
// tree.insert(1)
// tree.insert(3)
// tree.insert(8)
// tree.insert(7)
// tree.insert(2)
// tree.insert(9)

console.log(tree.remove(tree.root, 10))
console.log('tree.root', tree.root)
