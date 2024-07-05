/**
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
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
var maxDepth = function (root) {
  let max = 0
  function getLevelHeights(node) {
    if (!node) return 0
    let leftLevel = getLevelHeights(node.left) + 1
    let rightLevel = getLevelHeights(node.right) + 1
    max = Math.max(leftLevel, rightLevel)
    return max
  }
  return getLevelHeights(root)
}

/**
 *         1
 *       2   3
 *     4
 *   5
 * 6
 */
let t6 = new TreeNode(6)
let t5 = new TreeNode(5, t6)
let t4 = new TreeNode(4, t5)
let t2 = new TreeNode(2, t4)
let t3 = new TreeNode(3)
let t1 = new TreeNode(1, t2, t3)

console.log(maxDepth(t1))
