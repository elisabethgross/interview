/**
 * Given a binary tree, find its minimum depth.
 * The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0
  let min = Infinity

  function traverse(node, branchLen = 1) {
    if (node.left) {
      traverse(node.left, branchLen + 1)
    }
    if (node.right) {
      traverse(node.right, branchLen + 1)
    }
    if (!node.left && !node.right) {
      min = Math.min(min, branchLen)
    }
  }
  traverse(root)
  return min
}

let t2 = new TreeNode(9)
let t5 = new TreeNode(7)
let t4 = new TreeNode(15)
let t3 = new TreeNode(20, t4, t5)
let t1 = new TreeNode(3, t2, t3)

console.log(minDepth(t1)) // 2

let at5 = new TreeNode(6)
let at4 = new TreeNode(5, at5)
let at3 = new TreeNode(4, undefined, at4)
let at2 = new TreeNode(3, undefined, at3)
let at1 = new TreeNode(2, undefined, at2)

console.log(minDepth(at1)) // 5
