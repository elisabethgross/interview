/**
 * Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.
 *
 * Example:
 *           5
 *         3    6
 *       2   4
 *     1
 *
 * k = 3
 *
 * => 3
 */

function Node(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

function dfsInOrder(root) {
  let ret = []
  function traverse(node) {
    if (node.left) traverse(node.left)
    ret.push(node.val)
    if (node.right) traverse(node.right)
  }
  traverse(root)
  return ret
}
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let inOrder = dfsInOrder(root)
  return inOrder[k - 1]
}

// let root = new Node(10)
// root.left = new Node(6)
// root.right = new Node(11)
// root.left.left = new Node(3)
// root.left.right = new Node(7)
// root.left.left.left = new Node(2)

// console.log(kthSmallest(root, 3)) // 6

// Check if binary tree is balanced
/**
 *       1
 *    2    3
 *  4    5   6
 * balanced
 *
 *        1
 *      2   3
 *    4
 *  5
 * not balanced
 */

function isBalanced(root) {
  function helper(node) {
    if (node === null) return 0
    let leftHeight = helper(node.left)
    if (leftHeight === false) return false
    let rightHeight = helper(node.right)
    if (rightHeight === false) return false

    if (Math.abs(leftHeight - rightHeight) > 1) return false
    else return Math.max(leftHeight, rightHeight) + 1
  }
  return !!helper(root)
}

// balanced
// let root = new Node(1)
// root.left = new Node(2)
// root.right = new Node(3)
// root.left.left = new Node(4)
// root.right.right = new Node(6)
// root.right.right.right = new Node(5)

// not balanced
// let root = new Node(1)
// root.left = new Node(2)
// root.right = new Node(3)
// root.left.left = new Node(4)
// root.right.left = new Node(5)
// root.right.right = new Node(6)

console.log(isBalanced(root))
