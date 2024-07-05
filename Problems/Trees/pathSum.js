/**
 * Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false

  function traverse(node, sum = 0) {
    sum += node.val
    if (node.left) {
      let foundBranchLeft = traverse(node.left, sum)
      if (foundBranchLeft) return true
    }
    if (node.right) {
      let foundBranchRight = traverse(node.right, sum)
      if (foundBranchRight) return true
    }
    if (!node.left && !node.right) {
      if (sum === targetSum) return true
    }
    return false
  }
  return traverse(root)
}

let t9 = new TreeNode(7)
let t8 = new TreeNode(2)
let t7 = new TreeNode(1)
let t6 = new TreeNode(11, t9, t8)
let t5 = new TreeNode(4, t6)
let t4 = new TreeNode(4, undefined, t7)
let t3 = new TreeNode(13)
let t2 = new TreeNode(8, t3, t4)
let t1 = new TreeNode(5, t5, t2)

console.log(hasPathSum(t1, 22)) // true

// let t3 = new TreeNode(3)
// let t2 = new TreeNode(2)
// let t1 = new TreeNode(1, t2, t3)
// console.log(hasPathSum(t1, 5)) // false
